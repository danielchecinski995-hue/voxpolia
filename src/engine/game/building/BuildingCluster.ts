import * as THREE from 'three';
import { debrisScratch } from '../boss/FlyingChunks';
import type { DestroyedBlock } from '../boss/VoxelCluster';
import type { BuildingGridParams } from '../boss/debrisSim';
import { sharedUint8, sharedInt32 } from '../utils/sharedAlloc';

/** Bit 24 of a block's color marks GLASS: rendered through the chunk's
 *  transparent material group, shattering into fine shards (3 pieces at
 *  ~45% size) instead of one full cube. Strip with & 0xffffff before any
 *  color use. */
export const GLASS_FLAG = 1 << 24;

export interface BuildingBlock {
  gx: number;
  gy: number;
  gz: number;
  /** 24-bit RGB, optionally | GLASS_FLAG. */
  color: number;
}

/**
 * Voxel chunk rendered as a GREEDY-MESHED surface: only faces adjacent to
 * empty space are emitted, and coplanar same-color faces merge into large
 * quads. Per-cube instancing rasterized ~8 hidden surfaces per pixel on a
 * wall close-up (every interior cube boundary) — face meshing cuts both
 * the fill cost and the vertex count by orders of magnitude. Per-block
 * color jitter moved into the material shader (cell-hash tint), because
 * per-block colors would forbid merging.
 */
class FaceChunk {
  mesh: THREE.Mesh;
  readonly geometry: THREE.BufferGeometry;
  /** Grow-only CPU-side buffers backing the geometry attributes. */
  positions = new Float32Array(0);
  normals = new Float32Array(0);
  colors = new Uint8Array(0);
  indices = new Uint32Array(0);
  capQuads = 0;

  constructor(
    readonly chunkX: number,
    readonly chunkY: number,
    readonly chunkZ: number,
    materials: THREE.Material[],
  ) {
    this.geometry = new THREE.BufferGeometry();
    this.mesh = new THREE.Mesh(this.geometry, materials);
    this.mesh.castShadow = false; // see Building — global shadow blob instead
    this.mesh.receiveShadow = false;
    this.mesh.frustumCulled = true;
  }

  /** Make room for `quads` quads; (re)creates attributes when growing.
   *  Quads already emitted in the current remesh MUST survive the grow —
   *  losing them blanked every wall bigger than the initial capacity. */
  ensureCapacity(quads: number): boolean {
    if (quads <= this.capQuads) return false;
    this.capQuads = Math.ceil(quads * 1.25);
    const positions = new Float32Array(this.capQuads * 12);
    const normals = new Float32Array(this.capQuads * 12);
    const colors = new Uint8Array(this.capQuads * 12);
    const indices = new Uint32Array(this.capQuads * 6);
    positions.set(this.positions);
    normals.set(this.normals);
    colors.set(this.colors);
    indices.set(this.indices);
    this.positions = positions;
    this.normals = normals;
    this.colors = colors;
    this.indices = indices;
    this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
    this.geometry.setAttribute('normal', new THREE.BufferAttribute(this.normals, 3));
    this.geometry.setAttribute('color', new THREE.BufferAttribute(this.colors, 3, true));
    this.geometry.setIndex(new THREE.BufferAttribute(this.indices, 1));
    return true;
  }
}

// 32³ chunks — at the 0.13m grid a 16³ chunking produced ~2600 draw calls.
const CHUNK_SIZE = 32;

/** Scratch shared by every remesh call (single-threaded main loop): the
 *  chunk-local occupancy cache (chunk + 1-cell shell of neighbors) and the
 *  per-slice greedy mask. Color value, or -1 for empty/hidden. */
const LOCAL = CHUNK_SIZE + 2;
const localCache = new Int32Array(LOCAL * LOCAL * LOCAL);
const greedyMask = new Int32Array(CHUNK_SIZE * CHUNK_SIZE);

/** Scratch for GLASS quads during a remesh — they're collected separately
 *  and appended AFTER the opaque quads so the geometry splits into two
 *  contiguous material groups (opaque Lambert / transparent glass). */
let glassPos = new Float32Array(0);
let glassNrm = new Float32Array(0);
let glassCol = new Uint8Array(0);
let glassCap = 0;
function ensureGlassCapacity(quads: number): void {
  if (quads <= glassCap) return;
  glassCap = Math.ceil(quads * 1.5) + 16;
  const np = new Float32Array(glassCap * 12);
  const nn = new Float32Array(glassCap * 12);
  const nc = new Uint8Array(glassCap * 12);
  np.set(glassPos);
  nn.set(glassNrm);
  nc.set(glassCol);
  glassPos = np;
  glassNrm = nn;
  glassCol = nc;
}

/** Cheap per-piece tint jitter for debris/section payloads — the surface
 *  jitter lives in the shader now; flying pieces need their own variation
 *  or a shattered wall reads as uniform confetti of ONE color. */
export function jitterDebrisColor(c: number): number {
  c &= 0xffffff; // strip GLASS_FLAG — debris colors are plain RGB
  const f = 0.93 + Math.random() * 0.14;
  const r = Math.min(255, (((c >> 16) & 255) * f) | 0);
  const g = Math.min(255, (((c >> 8) & 255) * f) | 0);
  const b = Math.min(255, ((c & 255) * f) | 0);
  return (r << 16) | (g << 8) | b;
}

/**
 * Cantilever limit for the structural sweep, in grid steps (~7.3m at
 * 0.13125m blocks): how far concrete may hang past the nearest vertically
 * grounded support before it cracks off. Calibrated so that:
 *   - the intact building (column grid + walls) has zero failures,
 *   - losing one support punches a LOCAL hole, not a whole floor plate,
 *   - a wall strip whose base is shot out re-anchors through the slabs
 *     (ring-beam action) onto neighboring walls instead of tearing off as
 *     a full-height sliver — only cutting several bays wide drops the
 *     facade above, Murrah-building style.
 */
export const MAX_SPAN = 56;

/**
 * Max reach (grid steps) of a ONE-SIDED cantilever — a hanging cell anchored
 * to vertical support on only one lateral side. Beyond this it overturns and
 * drops, so a wide "cap"/slab left on a central spine erodes from the edges
 * inward instead of floating. A SPAN (bracketed by support on opposing sides)
 * keeps the full MAX_SPAN reach, so real two-sided floors stay put. Tuned to
 * clear the longest LEGAL cantilever in any intact generator — the apartment
 * balcony (APT_D 99 − APT_BODY_D 83 = 16 cells) — with a small margin.
 */
export const MAX_CANTILEVER = 18;

/** How far the cantilever scan walks before calling a side FAR (supported by
 *  continuing material). Must exceed the widest gap to a support inside any
 *  intact building so wide floors read as spans, not cantilevers. */
export const CANT_SCAN = 96;

/**
 * Chunked voxel cluster — splits the voxel grid into 16³ subvolumes, each
 * its own InstancedMesh. Per-chunk frustum culling makes 500k blocks
 * renderable; per-chunk dirty tracking enables `instanceMatrix.updateRanges`
 * partial uploads (only the modified chunks re-send to GPU).
 */
export class BuildingCluster {
  readonly pivot: THREE.Group;
  readonly material: THREE.MeshLambertMaterial;
  /** Transparent material for GLASS-flagged faces (group 1). */
  readonly glassMaterial: THREE.MeshLambertMaterial;

  readonly blocks: BuildingBlock[];
  readonly gridSizeX: number;
  readonly gridSizeY: number;
  readonly gridSizeZ: number;

  private readonly aliveFlags: Uint8Array;
  private currentAlive: number;
  /** Dense grid: cellIdx → globalBlockIdx, -1 if empty. */
  private readonly gridIdx: Int32Array;
  /** globalBlockIdx → chunk index in `chunks`. */
  private readonly globalToChunk: Int32Array;
  /** 1 = rendered (alive, or killed-but-ghosting until its section
   *  spawns). The face mesher culls against this, not aliveFlags. */
  private readonly drawnFlags: Uint8Array;
  private readonly chunks: (FaceChunk | undefined)[];
  private readonly chunksW: number;
  private readonly chunksH: number;
  /** Set of chunk indices needing a remesh (budgeted in flushUploads). */
  private readonly dirtyChunks: Set<number> = new Set();
  private readonly blockSize: number;
  /** World-space center of the footprint (city placement). */
  private readonly originX: number;
  private readonly originZ: number;
  /** World→grid offsets: gx = (wx + offX) / blockSize. Fold the half-extent
   *  centering and the city origin into one constant per axis. */
  private readonly offX: number;
  private readonly offZ: number;
  /** Steel/masonry grounding: a cell also counts as vertically grounded
   *  when supported by a below-DIAGONAL grounded cell (±1 on one axis) —
   *  slanted lattice legs (Eiffel) and spires/steep roofs carry load along
   *  the slope; the strict same-column rule would crack them off intact. */
  private readonly diagonalGrounding: boolean;
  /** Cantilever limit for THIS structure (defaults to concrete MAX_SPAN).
   *  Steel truss (Eiffel) spans much further — its platform decks sit
   *  ~60+ grid steps from the nearest leg and must not crack off intact.
   *  Capped at 255 (spanOf is a Uint8Array). */
  private readonly maxSpan: number;
  /** Material crush capacity: how many cells of load a single cell may
   *  carry before it CRUSHES (load-flow pass of the sweep). Infinity =
   *  pure connectivity (old behavior). This is what makes a tower fall
   *  when its base is shot down to slivers — an unbroken column is no
   *  longer infinitely strong. */
  private readonly crushLoad: number;

  /** Scratch for structural sweeps — allocated on first use. */
  private floodVisited: Uint8Array | null = null;
  private floodQueue: Int32Array | null = null;
  private groundedFlags: Uint8Array | null = null;
  private spanOf: Uint8Array | null = null;
  private sweepHead = 0;
  private sweepTail = 0;
  /** Phase-0 cursor of the structural sweep (grounding pass over blocks). */
  private groundCursor = 0;
  /** Load-flow pass: load carried BY each cell (cells of mass funneled
   *  through it). Allocated only when crushLoad is finite. */
  private loadOf: Float32Array | null = null;
  /** Phase-2 cursor (walks blocks gy-DESCENDING); -1 = phase done/off. */
  private loadCursor = -1;
  /** Phase-3 cursor (cantilever cull, walks blocks ascending). */
  private cantileverCursor = 0;
  private crushedInSweep = false;

  constructor(
    blocks: BuildingBlock[],
    blockSize: number,
    gridSize: { x: number; y: number; z: number },
    opts?: {
      originX?: number | undefined;
      originZ?: number | undefined;
      diagonalGrounding?: boolean | undefined;
      maxSpan?: number | undefined;
      crushLoad?: number | undefined;
    },
  ) {
    this.blocks = blocks;
    this.blockSize = blockSize;
    this.gridSizeX = gridSize.x;
    this.gridSizeY = gridSize.y;
    this.gridSizeZ = gridSize.z;
    this.originX = opts?.originX ?? 0;
    this.originZ = opts?.originZ ?? 0;
    this.offX = (gridSize.x * blockSize) / 2 - this.originX;
    this.offZ = (gridSize.z * blockSize) / 2 - this.originZ;
    this.diagonalGrounding = opts?.diagonalGrounding ?? false;
    this.maxSpan = Math.min(255, opts?.maxSpan ?? MAX_SPAN);
    this.crushLoad = opts?.crushLoad ?? Infinity;
    // SAB-backed (when available) so the debris worker reads occupancy
    // with zero copying — see sharedGrid().
    this.aliveFlags = sharedUint8(blocks.length);
    this.aliveFlags.fill(1);
    this.currentAlive = blocks.length;

    this.gridIdx = sharedInt32(gridSize.x * gridSize.y * gridSize.z);
    this.gridIdx.fill(-1);
    this.globalToChunk = new Int32Array(blocks.length);
    this.drawnFlags = new Uint8Array(blocks.length);
    this.drawnFlags.fill(1);

    // Each block already knows its grid coord → wire grid index lookup.
    for (let i = 0; i < blocks.length; i++) {
      const b = blocks[i]!;
      const cell = b.gx + b.gy * gridSize.x + b.gz * gridSize.x * gridSize.y;
      this.gridIdx[cell] = i;
    }

    this.pivot = new THREE.Group();
    // Chunk meshes keep grid-centered LOCAL coordinates; the pivot carries
    // the city placement (frustum culling picks the offset up through the
    // world matrix).
    this.pivot.position.set(this.originX, 0, this.originZ);
    // Lambert instead of Standard — 4–5× cheaper fragment shader for voxel
    // art that doesn't need PBR roughness/metalness anyway. Per-cell tint
    // jitter lives HERE (hash of the world-space cell behind the surface):
    // blocks carry flat palette colors so coplanar faces can greedy-merge,
    // and the shader restores the hand-laid-blocks look per fragment.
    this.material = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      vertexColors: true,
    });
    const jitterBlockSize = blockSize;
    this.material.onBeforeCompile = (shader) => {
      shader.uniforms.uBlockSize = { value: jitterBlockSize };
      shader.vertexShader = shader.vertexShader
        .replace(
          '#include <common>',
          '#include <common>\nvarying vec3 vCellPos;\nvarying vec3 vCellNormal;',
        )
        .replace(
          '#include <begin_vertex>',
          '#include <begin_vertex>\n'
          + 'vCellPos = (modelMatrix * vec4(position, 1.0)).xyz;\n'
          + 'vCellNormal = normalize(mat3(modelMatrix) * normal);',
        );
      shader.fragmentShader = shader.fragmentShader
        .replace(
          '#include <common>',
          '#include <common>\nuniform float uBlockSize;\n'
          + 'varying vec3 vCellPos;\nvarying vec3 vCellNormal;\n'
          + 'float cellHash(vec3 c) {\n'
          + '  return fract(sin(dot(c, vec3(127.1, 311.7, 74.7))) * 43758.5453);\n'
          + '}',
        )
        .replace(
          '#include <color_fragment>',
          '#include <color_fragment>\n{\n'
          + '  vec3 cell = floor((vCellPos - vCellNormal * uBlockSize * 0.5) / uBlockSize);\n'
          + '  diffuseColor.rgb *= 0.93 + 0.14 * cellHash(cell);\n'
          + '}',
        );
    };

    // Glass: same vertex-colored Lambert, but transparent — panes read
    // as glass while still being plain destructible voxels. No cell-hash
    // jitter here; glass should look uniform.
    this.glassMaterial = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
    });

    // Bucket blocks into chunks and build the initial surface meshes.
    this.chunksW = Math.ceil(gridSize.x / CHUNK_SIZE);
    this.chunksH = Math.ceil(gridSize.y / CHUNK_SIZE);
    const chunksD = Math.ceil(gridSize.z / CHUNK_SIZE);
    const chunkTotal = this.chunksW * this.chunksH * chunksD;
    const hasBlocks = new Uint8Array(chunkTotal);
    for (let i = 0; i < blocks.length; i++) {
      const b = blocks[i]!;
      const ci = (b.gx >> 5) + (b.gy >> 5) * this.chunksW
        + (b.gz >> 5) * this.chunksW * this.chunksH;
      this.globalToChunk[i] = ci;
      hasBlocks[ci] = 1;
    }
    this.chunks = new Array<FaceChunk | undefined>(chunkTotal);
    const blockSizeExt = CHUNK_SIZE * blockSize;
    const halfX = (gridSize.x * blockSize) / 2;
    const halfZ = (gridSize.z * blockSize) / 2;
    for (let ci = 0; ci < chunkTotal; ci++) {
      if (hasBlocks[ci] !== 1) continue;
      const cx = ci % this.chunksW;
      const cy = Math.floor(ci / this.chunksW) % this.chunksH;
      const cz = Math.floor(ci / (this.chunksW * this.chunksH));
      const chunk = new FaceChunk(cx, cy, cz, [this.material, this.glassMaterial]);
      this.chunks[ci] = chunk;
      this.pivot.add(chunk.mesh);
      // Fixed chunk-extent bounds instead of computeBoundingSphere() — the
      // surface changes every shot and recomputing per remesh would be
      // wasteful; the chunk's spatial extent never changes.
      const minX = cx * blockSizeExt - halfX;
      const minY = cy * blockSizeExt;
      const minZ = cz * blockSizeExt - halfZ;
      const box = new THREE.Box3(
        new THREE.Vector3(minX, minY, minZ),
        new THREE.Vector3(minX + blockSizeExt, minY + blockSizeExt, minZ + blockSizeExt),
      );
      chunk.geometry.boundingBox = box;
      const sphere = new THREE.Sphere();
      box.getBoundingSphere(sphere);
      chunk.geometry.boundingSphere = sphere;
      this.remeshChunk(ci);
    }
  }

  /** Clear a block from the render set and queue the affected chunk
   *  remeshes (its own, plus neighbors when the block sat on a chunk
   *  boundary — their cells just gained a visible face). */
  private eraseDrawn(idx: number): void {
    if (this.drawnFlags[idx] !== 1) return;
    this.drawnFlags[idx] = 0;
    const b = this.blocks[idx]!;
    this.dirtyChunks.add(this.globalToChunk[idx]!);
    const lx = b.gx & (CHUNK_SIZE - 1);
    const ly = b.gy & (CHUNK_SIZE - 1);
    const lz = b.gz & (CHUNK_SIZE - 1);
    if (lx === 0) this.dirtyChunkAt(b.gx - 1, b.gy, b.gz);
    else if (lx === CHUNK_SIZE - 1) this.dirtyChunkAt(b.gx + 1, b.gy, b.gz);
    if (ly === 0) this.dirtyChunkAt(b.gx, b.gy - 1, b.gz);
    else if (ly === CHUNK_SIZE - 1) this.dirtyChunkAt(b.gx, b.gy + 1, b.gz);
    if (lz === 0) this.dirtyChunkAt(b.gx, b.gy, b.gz - 1);
    else if (lz === CHUNK_SIZE - 1) this.dirtyChunkAt(b.gx, b.gy, b.gz + 1);
  }

  private dirtyChunkAt(gx: number, gy: number, gz: number): void {
    if (gx < 0 || gy < 0 || gz < 0
      || gx >= this.gridSizeX || gy >= this.gridSizeY || gz >= this.gridSizeZ) return;
    const ci = (gx >> 5) + (gy >> 5) * this.chunksW + (gz >> 5) * this.chunksW * this.chunksH;
    if (this.chunks[ci]) this.dirtyChunks.add(ci);
  }

  /**
   * Rebuild one chunk's surface mesh: load the chunk (+1-cell shell) into
   * the local cache, then greedy-mesh each axis/direction — a face is
   * emitted when a drawn cell borders a non-drawn cell, and coplanar
   * same-color faces merge into maximal rectangles.
   */
  private remeshChunk(ci: number): void {
    const chunk = this.chunks[ci];
    if (!chunk) return;
    const x0 = chunk.chunkX * CHUNK_SIZE;
    const y0 = chunk.chunkY * CHUNK_SIZE;
    const z0 = chunk.chunkZ * CHUNK_SIZE;
    const sx = Math.min(CHUNK_SIZE, this.gridSizeX - x0);
    const sy = Math.min(CHUNK_SIZE, this.gridSizeY - y0);
    const sz = Math.min(CHUNK_SIZE, this.gridSizeZ - z0);

    // Local occupancy/color cache incl. the neighbor shell — the greedy
    // sweeps below would otherwise hit indexAtFast ~200k times per chunk.
    localCache.fill(-1);
    const drawn = this.drawnFlags;
    for (let lz = -1; lz <= sz; lz++) {
      for (let ly = -1; ly <= sy; ly++) {
        for (let lx = -1; lx <= sx; lx++) {
          const idx = this.indexAtFast(x0 + lx, y0 + ly, z0 + lz);
          if (idx < 0 || drawn[idx] !== 1) continue;
          localCache[(lx + 1) + (ly + 1) * LOCAL + (lz + 1) * LOCAL * LOCAL]
            = this.blocks[idx]!.color;
        }
      }
    }

    const bs = this.blockSize;
    const halfXl = (this.gridSizeX * bs) / 2;
    const halfZl = (this.gridSizeZ * bs) / 2;
    const offs: readonly [number, number, number] = [halfXl, 0, halfZl];
    const size: readonly [number, number, number] = [sx, sy, sz];
    const lstep: readonly [number, number, number] = [1, LOCAL, LOCAL * LOCAL];

    let quads = 0;
    let glassQuads = 0;
    // Counting pass is wasteful — emit optimistically into the chunk's
    // grow-only buffers, growing when the running count needs it. Glass
    // quads go to a module scratch and are appended AFTER the opaque ones
    // (contiguous material groups).
    chunk.ensureCapacity(Math.max(64, chunk.capQuads));
    let pos = chunk.positions;
    let nrm = chunk.normals;
    let col = chunk.colors;
    let ind = chunk.indices;

    for (let d = 0; d < 3; d++) {
      const u = (d + 1) % 3;
      const v = (d + 2) % 3;
      const su = size[u]!;
      const sv = size[v]!;
      for (let s = 0; s < 2; s++) {
        const off = s === 0 ? 1 : -1;
        for (let a = 0; a < size[d]!; a++) {
          // Mask of visible faces in this slice.
          const baseL = 1 + LOCAL + LOCAL * LOCAL; // cell (0,0,0) of cache
          for (let j = 0; j < sv; j++) {
            for (let i = 0; i < su; i++) {
              const li = baseL + a * lstep[d]! + i * lstep[u]! + j * lstep[v]!;
              const c = localCache[li]!;
              greedyMask[j * su + i]
                = c >= 0 && localCache[li + off * lstep[d]!]! < 0 ? c : -1;
            }
          }
          // Greedy rectangle merge + quad emission.
          for (let j = 0; j < sv; j++) {
            for (let i = 0; i < su;) {
              const c = greedyMask[j * su + i]!;
              if (c < 0) {
                i++;
                continue;
              }
              let w = 1;
              while (i + w < su && greedyMask[j * su + i + w] === c) w++;
              let h = 1;
              let grow = true;
              while (grow && j + h < sv) {
                for (let k = 0; k < w; k++) {
                  if (greedyMask[(j + h) * su + i + k] !== c) {
                    grow = false;
                    break;
                  }
                }
                if (grow) h++;
              }
              for (let jj = 0; jj < h; jj++) {
                for (let k = 0; k < w; k++) greedyMask[(j + jj) * su + i + k] = -1;
              }

              // Quad corners in cluster-local space. Plane sits on the +d
              // side of the cell layer for off=+1, on the -d side for -1.
              const base: [number, number, number] = [x0, y0, z0];
              const p = (base[d]! + a + (off > 0 ? 1 : 0)) * bs - offs[d]!;
              const uA = (base[u]! + i) * bs - offs[u]!;
              const uB = (base[u]! + i + w) * bs - offs[u]!;
              const vA = (base[v]! + j) * bs - offs[v]!;
              const vB = (base[v]! + j + h) * bs - offs[v]!;
              // CCW in the (u, v) plane faces +d (cyclic basis); reverse
              // the strip order for the -d side.
              const corners: ReadonlyArray<readonly [number, number]> = off > 0
                ? [[uA, vA], [uB, vA], [uB, vB], [uA, vB]]
                : [[uA, vA], [uA, vB], [uB, vB], [uB, vA]];
              const rgb = c & 0xffffff;
              const r = (rgb >> 16) & 255;
              const g = (rgb >> 8) & 255;
              const bcol = rgb & 255;
              const isGlass = (c & GLASS_FLAG) !== 0;
              let tPos: Float32Array;
              let tNrm: Float32Array;
              let tCol: Uint8Array;
              let o: number;
              if (isGlass) {
                ensureGlassCapacity(glassQuads + 1);
                tPos = glassPos;
                tNrm = glassNrm;
                tCol = glassCol;
                o = glassQuads * 12;
                glassQuads++;
              } else {
                if (chunk.ensureCapacity(quads + 1)) {
                  pos = chunk.positions;
                  nrm = chunk.normals;
                  col = chunk.colors;
                  ind = chunk.indices;
                }
                tPos = pos;
                tNrm = nrm;
                tCol = col;
                o = quads * 12;
                const vi = quads * 4;
                const ii = quads * 6;
                ind[ii] = vi;
                ind[ii + 1] = vi + 1;
                ind[ii + 2] = vi + 2;
                ind[ii + 3] = vi;
                ind[ii + 4] = vi + 2;
                ind[ii + 5] = vi + 3;
                quads++;
              }
              for (let k = 0; k < 4; k++) {
                const ck = corners[k]!;
                tPos[o + k * 3 + d] = p;
                tPos[o + k * 3 + u] = ck[0];
                tPos[o + k * 3 + v] = ck[1];
                tNrm[o + k * 3 + d] = off;
                tNrm[o + k * 3 + u] = 0;
                tNrm[o + k * 3 + v] = 0;
                tCol[o + k * 3] = r;
                tCol[o + k * 3 + 1] = g;
                tCol[o + k * 3 + 2] = bcol;
              }
              i += w;
            }
          }
        }
      }
    }

    // Append glass quads after the opaque ones → two contiguous material
    // groups on one geometry (opaque Lambert / transparent glass).
    if (chunk.ensureCapacity(quads + glassQuads)) {
      pos = chunk.positions;
      nrm = chunk.normals;
      col = chunk.colors;
      ind = chunk.indices;
    }
    if (glassQuads > 0) {
      pos.set(glassPos.subarray(0, glassQuads * 12), quads * 12);
      nrm.set(glassNrm.subarray(0, glassQuads * 12), quads * 12);
      col.set(glassCol.subarray(0, glassQuads * 12), quads * 12);
      for (let q = 0; q < glassQuads; q++) {
        const vi = (quads + q) * 4;
        const ii = (quads + q) * 6;
        ind[ii] = vi;
        ind[ii + 1] = vi + 1;
        ind[ii + 2] = vi + 2;
        ind[ii + 3] = vi;
        ind[ii + 4] = vi + 2;
        ind[ii + 5] = vi + 3;
      }
    }
    const opaqueIdx = quads * 6;
    quads += glassQuads;

    const geo = chunk.geometry;
    geo.clearGroups();
    geo.addGroup(0, opaqueIdx, 0);
    if (glassQuads > 0) geo.addGroup(opaqueIdx, glassQuads * 6, 1);
    const posAttr = geo.getAttribute('position') as THREE.BufferAttribute;
    const nrmAttr = geo.getAttribute('normal') as THREE.BufferAttribute;
    const colAttr = geo.getAttribute('color') as THREE.BufferAttribute;
    const idxAttr = geo.getIndex()!;
    posAttr.clearUpdateRanges();
    posAttr.addUpdateRange(0, quads * 12);
    posAttr.needsUpdate = true;
    nrmAttr.clearUpdateRanges();
    nrmAttr.addUpdateRange(0, quads * 12);
    nrmAttr.needsUpdate = true;
    colAttr.clearUpdateRanges();
    colAttr.addUpdateRange(0, quads * 12);
    colAttr.needsUpdate = true;
    idxAttr.clearUpdateRanges();
    idxAttr.addUpdateRange(0, quads * 6);
    idxAttr.needsUpdate = true;
    geo.setDrawRange(0, quads * 6);
    chunk.mesh.visible = quads > 0;
  }

  /** Surface meshes of every chunk (tests, debugging). */
  surfaceMeshes(): THREE.Mesh[] {
    const out: THREE.Mesh[] = [];
    for (const c of this.chunks) {
      if (c) out.push(c.mesh);
    }
    return out;
  }

  aliveCount(): number {
    return this.currentAlive;
  }

  totalCount(): number {
    return this.blocks.length;
  }

  isAlive(idx: number): boolean {
    return this.aliveFlags[idx] === 1;
  }

  /** O(1) lookup: grid coord → block index, or -1. */
  indexAt(gx: number, gy: number, gz: number): number {
    if (gx < 0 || gy < 0 || gz < 0 || gx >= this.gridSizeX || gy >= this.gridSizeY || gz >= this.gridSizeZ) {
      return -1;
    }
    return this.gridIdx[gx + gy * this.gridSizeX + gz * this.gridSizeX * this.gridSizeY]!;
  }

  /** No-bounds-check variant used in hot inner loops. */
  indexAtFast(gx: number, gy: number, gz: number): number {
    if (gx < 0 || gy < 0 || gz < 0 || gx >= this.gridSizeX || gy >= this.gridSizeY || gz >= this.gridSizeZ) {
      return -1;
    }
    return this.gridIdx[gx + gy * this.gridSizeX + gz * this.gridSizeX * this.gridSizeY]!;
  }

  /** O(1) voxel-occupancy test in world coordinates. Used by debris systems
   * to bounce / shatter against the still-standing part of the building. */
  isOccupied(wx: number, wy: number, wz: number): boolean {
    const gx = Math.floor((wx + this.offX) / this.blockSize);
    const gy = Math.floor(wy / this.blockSize);
    const gz = Math.floor((wz + this.offZ) / this.blockSize);
    if (gx < 0 || gy < 0 || gz < 0
      || gx >= this.gridSizeX || gy >= this.gridSizeY || gz >= this.gridSizeZ) return false;
    const idx = this.gridIdx[gx + gy * this.gridSizeX + gz * this.gridSizeX * this.gridSizeY]!;
    return idx >= 0 && this.aliveFlags[idx] === 1;
  }

  /** Black-hole orbit grind: remove the single alive voxel at each world point
   *  (same world→grid map as isOccupied). One batched kill+hide, NO cascade/sweep
   *  — minor "sandpaper" damage. `pointsXYZ` = flat x,y,z triples. Returns how
   *  many voxels were removed. */
  removeBlocksAtWorld(pointsXYZ: number[]): number {
    const buf = this.scratchRemoveBuf;
    buf.length = 0;
    for (let k = 0; k + 2 < pointsXYZ.length; k += 3) {
      const gx = Math.floor((pointsXYZ[k]! + this.offX) / this.blockSize);
      const gy = Math.floor(pointsXYZ[k + 1]! / this.blockSize);
      const gz = Math.floor((pointsXYZ[k + 2]! + this.offZ) / this.blockSize);
      if (gx < 0 || gy < 0 || gz < 0
        || gx >= this.gridSizeX || gy >= this.gridSizeY || gz >= this.gridSizeZ) continue;
      const idx = this.gridIdx[gx + gy * this.gridSizeX + gz * this.gridSizeX * this.gridSizeY]!;
      if (idx >= 0 && this.aliveFlags[idx] === 1) buf.push(idx);
    }
    if (buf.length > 0) {
      this.killBlocks(buf);
      this.hideBlocks(buf);
    }
    return buf.length;
  }
  private readonly scratchRemoveBuf: number[] = [];

  /** Occupancy state for the debris worker. The views are SAB-backed, so
   *  the worker sees destruction as it happens (at most a frame stale —
   *  benign for debris collision). gridIdx is immutable after construction;
   *  only aliveFlags flips, and only on this thread. */
  sharedGrid(): BuildingGridParams {
    return {
      aliveFlags: this.aliveFlags,
      gridIdx: this.gridIdx,
      sizeX: this.gridSizeX,
      sizeY: this.gridSizeY,
      sizeZ: this.gridSizeZ,
      blockSize: this.blockSize,
      originX: this.originX,
      originZ: this.originZ,
    };
  }

  /** Block coords packed for the sweep worker: gx | gy<<10 | gz<<20, in
   *  blocks order (gy-ascending — the grounding pass depends on it). Grid
   *  extents are far below 1024 on every axis. Built on demand and meant
   *  to be TRANSFERRED to the worker (one-time copy at startup). */
  packedCoords(): Int32Array {
    const out = new Int32Array(this.blocks.length);
    for (let i = 0; i < this.blocks.length; i++) {
      const b = this.blocks[i]!;
      out[i] = b.gx | (b.gy << 10) | (b.gz << 20);
    }
    return out;
  }

  /** Structural-rule parameters for the sweep worker — must match what
   *  this cluster's own sweep uses (a parity test guards the two ports). */
  structuralParams(): { maxSpan: number; diagonalGrounding: boolean; crushLoad: number } {
    return {
      maxSpan: this.maxSpan,
      diagonalGrounding: this.diagonalGrounding,
      crushLoad: this.crushLoad,
    };
  }

  /** World-space position of block by global idx — computed on demand
   * (no Vector3 stored per block, saves ~10 MB heap at 500k). */
  getWorldPosition(idx: number, out: THREE.Vector3): THREE.Vector3 {
    const b = this.blocks[idx]!;
    const halfX = this.offX;
    const halfZ = this.offZ;
    out.set(
      b.gx * this.blockSize - halfX + this.blockSize / 2,
      b.gy * this.blockSize + this.blockSize / 2,
      b.gz * this.blockSize - halfZ + this.blockSize / 2,
    );
    return out;
  }

  /**
   * Voxel-grid raycast (3D DDA / Amanatides–Woo). Walks one grid cell at a
   * time along the ray; returns the first alive block it enters along with
   * the exact world-space entry point. ~50 iterations max — no per-instance
   * matrix tests, no chance of pass-through through alive blocks.
   *
   * @param origin Ray origin in world space.
   * @param dir    Unit-length ray direction.
   * @param maxDist Distance limit (any further is treated as miss).
   * @returns Hit info or null on miss.
   */
  raycastVoxel(
    origin: THREE.Vector3,
    dir: THREE.Vector3,
    maxDist: number,
    out: { point: THREE.Vector3; blockIdx: number; normal: THREE.Vector3 },
  ): { point: THREE.Vector3; blockIdx: number; normal: THREE.Vector3 } | null {
    const blockSize = this.blockSize;
    const halfX = this.offX;
    const halfZ = this.offZ;

    // Clamp the ray to this cluster's world AABB first (slab test): the
    // DDA below then walks ONLY the overlapping span. Without this an
    // "infinite"-range hitscan would walk thousands of empty cells per
    // cluster — and the old fixed 256-iteration ceiling silently capped
    // the effective range at ~33 m.
    const EPS = 1e-9;
    const boxMinX = -halfX;
    const boxMaxX = this.gridSizeX * blockSize - halfX;
    const boxMinY = 0;
    const boxMaxY = this.gridSizeY * blockSize;
    const boxMinZ = -halfZ;
    const boxMaxZ = this.gridSizeZ * blockSize - halfZ;
    let tEnter = 0;
    let tExit = maxDist;
    if (Math.abs(dir.x) < EPS) {
      if (origin.x < boxMinX || origin.x > boxMaxX) return null;
    } else {
      const inv = 1 / dir.x;
      const t1 = (boxMinX - origin.x) * inv;
      const t2 = (boxMaxX - origin.x) * inv;
      tEnter = Math.max(tEnter, Math.min(t1, t2));
      tExit = Math.min(tExit, Math.max(t1, t2));
    }
    if (Math.abs(dir.y) < EPS) {
      if (origin.y < boxMinY || origin.y > boxMaxY) return null;
    } else {
      const inv = 1 / dir.y;
      const t1 = (boxMinY - origin.y) * inv;
      const t2 = (boxMaxY - origin.y) * inv;
      tEnter = Math.max(tEnter, Math.min(t1, t2));
      tExit = Math.min(tExit, Math.max(t1, t2));
    }
    if (Math.abs(dir.z) < EPS) {
      if (origin.z < boxMinZ || origin.z > boxMaxZ) return null;
    } else {
      const inv = 1 / dir.z;
      const t1 = (boxMinZ - origin.z) * inv;
      const t2 = (boxMaxZ - origin.z) * inv;
      tEnter = Math.max(tEnter, Math.min(t1, t2));
      tExit = Math.min(tExit, Math.max(t1, t2));
    }
    if (tEnter > tExit) return null;
    // One-cell margin on both ends; t is measured from the shifted start.
    const tStart = Math.max(0, tEnter - blockSize);
    const tLimit = Math.min(maxDist, tExit + blockSize) - tStart;
    const ox = origin.x + dir.x * tStart;
    const oy = origin.y + dir.y * tStart;
    const oz = origin.z + dir.z * tStart;

    // Origin in continuous grid-space (cell coords as floats; cell N spans [N, N+1]).
    const gxF = (ox + halfX) / blockSize;
    const gyF = oy / blockSize;
    const gzF = (oz + halfZ) / blockSize;

    let gx = Math.floor(gxF);
    let gy = Math.floor(gyF);
    let gz = Math.floor(gzF);

    const stepX = dir.x > 0 ? 1 : dir.x < 0 ? -1 : 0;
    const stepY = dir.y > 0 ? 1 : dir.y < 0 ? -1 : 0;
    const stepZ = dir.z > 0 ? 1 : dir.z < 0 ? -1 : 0;

    const adx = Math.abs(dir.x);
    const ady = Math.abs(dir.y);
    const adz = Math.abs(dir.z);
    // tDelta = world distance to traverse exactly one cell along this axis.
    const tDeltaX = adx < EPS ? Infinity : blockSize / adx;
    const tDeltaY = ady < EPS ? Infinity : blockSize / ady;
    const tDeltaZ = adz < EPS ? Infinity : blockSize / adz;
    // tMax = world distance to next axis-aligned cell boundary.
    let tMaxX: number;
    if (stepX > 0) tMaxX = ((gx + 1) - gxF) * blockSize / Math.max(adx, EPS);
    else if (stepX < 0) tMaxX = (gxF - gx) * blockSize / Math.max(adx, EPS);
    else tMaxX = Infinity;
    let tMaxY: number;
    if (stepY > 0) tMaxY = ((gy + 1) - gyF) * blockSize / Math.max(ady, EPS);
    else if (stepY < 0) tMaxY = (gyF - gy) * blockSize / Math.max(ady, EPS);
    else tMaxY = Infinity;
    let tMaxZ: number;
    if (stepZ > 0) tMaxZ = ((gz + 1) - gzF) * blockSize / Math.max(adz, EPS);
    else if (stepZ < 0) tMaxZ = (gzF - gz) * blockSize / Math.max(adz, EPS);
    else tMaxZ = Infinity;

    let t = 0;
    let hitNormalAxis = 0;
    let hitNormalSign = 0;

    // Edge case: ray starts (or enters the box) inside an alive cell.
    if (this.cellInBounds(gx, gy, gz)) {
      const idx = this.indexAtFast(gx, gy, gz);
      if (idx >= 0 && this.aliveFlags[idx] === 1) {
        out.point.set(ox, oy, oz);
        out.blockIdx = idx;
        out.normal.set(-dir.x, -dir.y, -dir.z).normalize();
        return out;
      }
    }

    // Iteration bound derived from the CLAMPED span (axis crossings can't
    // exceed ~3 cells of travel per cell of distance) — no silent range cap.
    const maxIter = Math.ceil(tLimit / blockSize) * 3 + 8;
    for (let iter = 0; iter < maxIter; iter++) {
      // Advance to nearest axis crossing.
      if (tMaxX < tMaxY && tMaxX < tMaxZ) {
        gx += stepX;
        t = tMaxX;
        tMaxX += tDeltaX;
        hitNormalAxis = 0;
        hitNormalSign = -stepX;
      } else if (tMaxY < tMaxZ) {
        gy += stepY;
        t = tMaxY;
        tMaxY += tDeltaY;
        hitNormalAxis = 1;
        hitNormalSign = -stepY;
      } else {
        gz += stepZ;
        t = tMaxZ;
        tMaxZ += tDeltaZ;
        hitNormalAxis = 2;
        hitNormalSign = -stepZ;
      }

      if (t > tLimit) return null;

      // No early-exit on out-of-bounds — rocket fired from outside the grid
      // (player walks the city, building grid is small slice of the world)
      // must still walk into the grid. indexAtFast returns -1 if out of
      // bounds, the alive check below handles it cleanly.
      const idx = this.indexAtFast(gx, gy, gz);
      if (idx < 0 || this.aliveFlags[idx] !== 1) continue;

      out.point.set(
        origin.x + dir.x * (tStart + t),
        origin.y + dir.y * (tStart + t),
        origin.z + dir.z * (tStart + t),
      );
      out.blockIdx = idx;
      out.normal.set(0, 0, 0);
      if (hitNormalAxis === 0) out.normal.x = hitNormalSign;
      else if (hitNormalAxis === 1) out.normal.y = hitNormalSign;
      else out.normal.z = hitNormalSign;
      return out;
    }
    return null;
  }

  /**
   * Piercing-ray collection (disintegrator): walk the grid along the ray
   * (same DDA as raycastVoxel) and gather EVERY alive cell the line passes
   * through, up to maxDist — the beam drills clean through walls, slabs
   * and anything behind them.
   */
  collectAliveAlongRay(
    origin: THREE.Vector3,
    dir: THREE.Vector3,
    maxDist: number,
    out: number[],
  ): number[] {
    out.length = 0;
    const blockSize = this.blockSize;
    const halfX = this.offX;
    const halfZ = this.offZ;
    const gxF = (origin.x + halfX) / blockSize;
    const gyF = origin.y / blockSize;
    const gzF = (origin.z + halfZ) / blockSize;
    let gx = Math.floor(gxF);
    let gy = Math.floor(gyF);
    let gz = Math.floor(gzF);
    const stepX = dir.x > 0 ? 1 : dir.x < 0 ? -1 : 0;
    const stepY = dir.y > 0 ? 1 : dir.y < 0 ? -1 : 0;
    const stepZ = dir.z > 0 ? 1 : dir.z < 0 ? -1 : 0;
    const EPS = 1e-9;
    const adx = Math.abs(dir.x);
    const ady = Math.abs(dir.y);
    const adz = Math.abs(dir.z);
    const tDeltaX = adx < EPS ? Infinity : blockSize / adx;
    const tDeltaY = ady < EPS ? Infinity : blockSize / ady;
    const tDeltaZ = adz < EPS ? Infinity : blockSize / adz;
    let tMaxX = stepX > 0 ? ((gx + 1) - gxF) * blockSize / Math.max(adx, EPS)
      : stepX < 0 ? (gxF - gx) * blockSize / Math.max(adx, EPS) : Infinity;
    let tMaxY = stepY > 0 ? ((gy + 1) - gyF) * blockSize / Math.max(ady, EPS)
      : stepY < 0 ? (gyF - gy) * blockSize / Math.max(ady, EPS) : Infinity;
    let tMaxZ = stepZ > 0 ? ((gz + 1) - gzF) * blockSize / Math.max(adz, EPS)
      : stepZ < 0 ? (gzF - gz) * blockSize / Math.max(adz, EPS) : Infinity;

    const startIdx = this.indexAtFast(gx, gy, gz);
    if (startIdx >= 0 && this.aliveFlags[startIdx] === 1) out.push(startIdx);

    let t = 0;
    for (let iter = 0; iter < 4096; iter++) {
      if (tMaxX < tMaxY && tMaxX < tMaxZ) {
        gx += stepX;
        t = tMaxX;
        tMaxX += tDeltaX;
      } else if (tMaxY < tMaxZ) {
        gy += stepY;
        t = tMaxY;
        tMaxY += tDeltaY;
      } else {
        gz += stepZ;
        t = tMaxZ;
        tMaxZ += tDeltaZ;
      }
      if (t > maxDist) break;
      const idx = this.indexAtFast(gx, gy, gz);
      if (idx >= 0 && this.aliveFlags[idx] === 1) out.push(idx);
    }
    return out;
  }

  private cellInBounds(gx: number, gy: number, gz: number): boolean {
    return gx >= 0 && gy >= 0 && gz >= 0 &&
      gx < this.gridSizeX && gy < this.gridSizeY && gz < this.gridSizeZ;
  }

  /** Find alive blocks within `radius` of `worldPoint`. */
  findIndicesInRadius(worldPoint: THREE.Vector3, radius: number, out: number[]): number[] {
    out.length = 0;
    const r2 = radius * radius;
    const halfX = this.offX;
    const halfZ = this.offZ;
    const gxCenter = (worldPoint.x + halfX) / this.blockSize;
    const gyCenter = (worldPoint.y - this.blockSize / 2) / this.blockSize;
    const gzCenter = (worldPoint.z + halfZ) / this.blockSize;
    const gridRadius = Math.ceil(radius / this.blockSize) + 1;
    const gxMin = Math.max(0, Math.floor(gxCenter - gridRadius));
    const gxMax = Math.min(this.gridSizeX - 1, Math.ceil(gxCenter + gridRadius));
    const gyMin = Math.max(0, Math.floor(gyCenter - gridRadius));
    const gyMax = Math.min(this.gridSizeY - 1, Math.ceil(gyCenter + gridRadius));
    const gzMin = Math.max(0, Math.floor(gzCenter - gridRadius));
    const gzMax = Math.min(this.gridSizeZ - 1, Math.ceil(gzCenter + gridRadius));
    const halfBlock = this.blockSize / 2;
    for (let gx = gxMin; gx <= gxMax; gx++) {
      const px = gx * this.blockSize - halfX + halfBlock;
      const dx = px - worldPoint.x;
      const dx2 = dx * dx;
      for (let gy = gyMin; gy <= gyMax; gy++) {
        const py = gy * this.blockSize + halfBlock;
        const dy = py - worldPoint.y;
        const dy2 = dy * dy;
        if (dx2 + dy2 > r2) continue;
        for (let gz = gzMin; gz <= gzMax; gz++) {
          const pz = gz * this.blockSize - halfZ + halfBlock;
          const dz = pz - worldPoint.z;
          const distSq = dx2 + dy2 + dz * dz;
          if (distSq > r2) continue;
          const idx = this.indexAtFast(gx, gy, gz);
          if (idx < 0 || this.aliveFlags[idx] !== 1) continue;
          out.push(idx);
        }
      }
    }
    return out;
  }

  /**
   * Structural authority sweep — yield-line/cantilever approximation from
   * real RC engineering instead of pure connectivity ("magic glue"):
   *
   *   1. A cell is VERTICALLY GROUNDED when an unbroken column of alive
   *      cells runs from it down to the ground (walls, columns, and the
   *      slab cells sandwiched on top of them).
   *   2. Every other alive cell survives only within MAX_SPAN grid steps
   *      (multi-source BFS) of a grounded cell — concrete can cantilever a
   *      few meters past a support, then it cracks and drops LOCALLY.
   *
   * Result: a rocket near a column punches a ragged HOLE in the slab
   * around the lost support; the rest of the plate stays anchored. Whole
   * floating islands have no grounded cells at all, so this subsumes the
   * old ground-connectivity sweep. Incremental (begin / step / finish) to
   * spread the cost across frames.
   */
  beginDisconnectSweep(): void {
    const total = this.blocks.length;
    if (!this.floodVisited) {
      this.floodVisited = new Uint8Array(total);
      this.floodQueue = new Int32Array(total);
      this.groundedFlags = new Uint8Array(total);
      this.spanOf = new Uint8Array(total);
    }
    this.floodVisited.fill(0);
    this.groundedFlags!.fill(0);
    this.sweepTail = 0;
    this.sweepHead = 0;
    // Phase 0 (grounding) runs inside stepDisconnectSweep so its ~2M block
    // walk is time-sliced like the BFS instead of hitching one frame.
    this.groundCursor = 0;
    // Phase 2 (load flow) only for materials with finite crush capacity.
    if (Number.isFinite(this.crushLoad)) {
      this.loadOf ??= new Float32Array(this.blocks.length);
      this.loadOf.fill(0);
      this.loadCursor = this.blocks.length - 1;
    } else {
      this.loadCursor = -1;
    }
    this.cantileverCursor = 0;
    this.crushedInSweep = false;
  }

  /**
   * Phase 0: vertical grounding over the blocks array — it is generated in
   * gy-ascending order, so a block's below-cell flag is final by the time
   * we reach it. Every grounded cell seeds the BFS at full span.
   */
  private stepGrounding(budget: number): boolean {
    const blocks = this.blocks;
    const visited = this.floodVisited!;
    const queue = this.floodQueue!;
    const grounded = this.groundedFlags!;
    const spanOf = this.spanOf!;
    const stop = Math.min(this.groundCursor + budget, blocks.length);
    for (let idx = this.groundCursor; idx < stop; idx++) {
      if (this.aliveFlags[idx] !== 1) continue;
      const b = blocks[idx]!;
      if (b.gy === 0) {
        grounded[idx] = 1;
      } else {
        const below = this.indexAtFast(b.gx, b.gy - 1, b.gz);
        if (below >= 0 && this.aliveFlags[below] === 1 && grounded[below] === 1) {
          grounded[idx] = 1;
        } else if (this.diagonalGrounding) {
          // Slope-following grounding: a grounded cell one step below AND
          // one to the side carries the load down a slanted member (Eiffel
          // legs, spires). The blocks array is gy-ascending, so all gy-1
          // flags are final here.
          const isG = (gx: number, gz: number): boolean => {
            const n = this.indexAtFast(gx, b.gy - 1, gz);
            return n >= 0 && this.aliveFlags[n] === 1 && grounded[n] === 1;
          };
          if (
            isG(b.gx - 1, b.gz) || isG(b.gx + 1, b.gz)
            || isG(b.gx, b.gz - 1) || isG(b.gx, b.gz + 1)
          ) {
            grounded[idx] = 1;
          } else {
            continue;
          }
        } else {
          continue;
        }
      }
      visited[idx] = 1;
      spanOf[idx] = this.maxSpan;
      queue[this.sweepTail++] = idx;
    }
    this.groundCursor = stop;
    return stop >= blocks.length;
  }

  /**
   * Phase 2: load flow, walked layer-by-layer gy-DESCENDING (the blocks
   * array is gy-sorted, so layers are contiguous ranges). Per layer:
   *
   *   A. SUPPORTED cells (any alive below-fan: straight below + the four
   *      below-diagonals) seed a lateral multi-source BFS at distance 0.
   *   B. ORPHAN cells (mass hanging over a void) hand their accumulated
   *      load down the BFS gradient — along alive same-layer material, up
   *      to maxSpan steps — to the nearest supported cells. This is the
   *      beam/arch action that funnels a tower ring above a blown-out base
   *      into the surviving pier; without it the load would just vanish
   *      into the hole.
   *   C. Supported cells split (1 + funneled load) equally across their
   *      below-fan supporters.
   *
   * A cell asked to carry more than `crushLoad` CRUSHES (collected by
   * finishDisconnectSweep) — a sliver pier under a tower fails instead of
   * holding it forever. Scratch reuse: spanOf (BFS distances) and
   * floodQueue (BFS queue) are free once phase 1 is done.
   */
  private stepLoad(budget: number): boolean {
    const blocks = this.blocks;
    const lo = this.loadOf!;
    const dist = this.spanOf!;
    const queue = this.floodQueue!;
    const lateralCap = this.maxSpan;
    let cursor = this.loadCursor;
    let spent = 0;
    while (cursor >= 0 && spent < budget) {
      const gy = blocks[cursor]!.gy;
      let start = cursor;
      while (start >= 0 && blocks[start]!.gy === gy) start--;
      if (gy === 0) {
        cursor = start; // ground layer absorbs everything
        break;
      }
      // Pass A: classify support, seed the lateral BFS.
      let tail = 0;
      for (let i = start + 1; i <= cursor; i++) {
        if (this.aliveFlags[i] !== 1) continue;
        const b = blocks[i]!;
        if (
          this.aliveAt(b.gx, b.gy - 1, b.gz) >= 0
          || this.aliveAt(b.gx - 1, b.gy - 1, b.gz) >= 0
          || this.aliveAt(b.gx + 1, b.gy - 1, b.gz) >= 0
          || this.aliveAt(b.gx, b.gy - 1, b.gz - 1) >= 0
          || this.aliveAt(b.gx, b.gy - 1, b.gz + 1) >= 0
        ) {
          dist[i] = 0;
          queue[tail++] = i;
        } else {
          dist[i] = 255;
        }
      }
      // Pass B: lateral BFS outward from supported cells…
      let head = 0;
      while (head < tail) {
        const i = queue[head++]!;
        const d = dist[i]!;
        if (d >= lateralCap || d >= 254) continue;
        const b = blocks[i]!;
        let n = this.aliveAt(b.gx + 1, b.gy, b.gz);
        if (n >= 0 && dist[n] === 255) { dist[n] = d + 1; queue[tail++] = n; }
        n = this.aliveAt(b.gx - 1, b.gy, b.gz);
        if (n >= 0 && dist[n] === 255) { dist[n] = d + 1; queue[tail++] = n; }
        n = this.aliveAt(b.gx, b.gy, b.gz + 1);
        if (n >= 0 && dist[n] === 255) { dist[n] = d + 1; queue[tail++] = n; }
        n = this.aliveAt(b.gx, b.gy, b.gz - 1);
        if (n >= 0 && dist[n] === 255) { dist[n] = d + 1; queue[tail++] = n; }
      }
      // …then push orphan loads down the gradient, farthest first (each
      // cell forwards its own mass plus everything already pushed into it).
      for (let q = tail - 1; q >= 0; q--) {
        const i = queue[q]!;
        const d = dist[i]!;
        if (d === 0) continue;
        const b = blocks[i]!;
        const total = 1 + lo[i]!;
        let n = this.aliveAt(b.gx + 1, b.gy, b.gz);
        if (n >= 0 && dist[n]! < d) { lo[n]! += total; continue; }
        n = this.aliveAt(b.gx - 1, b.gy, b.gz);
        if (n >= 0 && dist[n]! < d) { lo[n]! += total; continue; }
        n = this.aliveAt(b.gx, b.gy, b.gz + 1);
        if (n >= 0 && dist[n]! < d) { lo[n]! += total; continue; }
        n = this.aliveAt(b.gx, b.gy, b.gz - 1);
        if (n >= 0 && dist[n]! < d) { lo[n]! += total; }
      }
      // Pass C: supported cells split their total across the below-fan.
      for (let i = start + 1; i <= cursor; i++) {
        if (this.aliveFlags[i] !== 1 || dist[i] !== 0) continue;
        const b = blocks[i]!;
        const total = 1 + lo[i]!;
        const n0 = this.aliveAt(b.gx, b.gy - 1, b.gz);
        const n1 = this.aliveAt(b.gx - 1, b.gy - 1, b.gz);
        const n2 = this.aliveAt(b.gx + 1, b.gy - 1, b.gz);
        const n3 = this.aliveAt(b.gx, b.gy - 1, b.gz - 1);
        const n4 = this.aliveAt(b.gx, b.gy - 1, b.gz + 1);
        const count = (n0 >= 0 ? 1 : 0) + (n1 >= 0 ? 1 : 0) + (n2 >= 0 ? 1 : 0)
          + (n3 >= 0 ? 1 : 0) + (n4 >= 0 ? 1 : 0);
        const share = total / count;
        if (n0 >= 0) lo[n0]! += share;
        if (n1 >= 0) lo[n1]! += share;
        if (n2 >= 0) lo[n2]! += share;
        if (n3 >= 0) lo[n3]! += share;
        if (n4 >= 0) lo[n4]! += share;
      }
      // Pass D: STRANDED cells (alive, dist still 255 — no support below and
      // no lateral path to one within maxSpan) have no downward load route.
      // Previously their weight silently vanished into the void and the
      // structure "floated" on whatever sparse piers stayed grounded. Force
      // an overload so finishDisconnectSweep detaches them; the follow-up
      // sweep cascades the mass they were holding. Intact buildings have no
      // stranded cells (every member rests on its below-fan), so this only
      // fires after damage.
      for (let i = start + 1; i <= cursor; i++) {
        if (this.aliveFlags[i] === 1 && dist[i] === 255) lo[i] = this.crushLoad + 1;
      }
      spent += (cursor - start) * 3;
      cursor = start;
    }
    this.loadCursor = cursor;
    return cursor < 0;
  }

  /** Alive-cell index at grid coords, or -1. */
  private aliveAt(gx: number, gy: number, gz: number): number {
    const n = this.indexAtFast(gx, gy, gz);
    return n >= 0 && this.aliveFlags[n] === 1 ? n : -1;
  }

  /** True when the last finished sweep crushed overloaded cells — the
   *  controller re-arms a follow-up sweep, because removing supports
   *  invalidates everything above them (pure-connectivity removals never
   *  needed that). */
  lastSweepHadCrush(): boolean {
    return this.crushedInSweep;
  }

  /** Highest per-cell load after the last sweep's load pass (0 when the
   *  pass is disabled) — used by tests to calibrate crushLoad with a real
   *  safety margin over the intact structure. */
  peakLoad(): number {
    if (!this.loadOf) return 0;
    let max = 0;
    for (let i = 0; i < this.loadOf.length; i++) {
      if (this.aliveFlags[i] === 1 && this.loadOf[i]! > max) max = this.loadOf[i]!;
    }
    return max;
  }

  /** Process up to `budget` cells (grounding first, then BFS pops, then
   *  the load-flow pass). Returns true when the sweep is done. Neighbor
   *  visits are unrolled — an array literal per visited cell would be ~1M
   *  allocations per sweep. */
  stepDisconnectSweep(budget: number): boolean {
    if (this.groundCursor < this.blocks.length) {
      if (!this.stepGrounding(budget)) return false;
    }
    const visited = this.floodVisited!;
    const queue = this.floodQueue!;
    const spanOf = this.spanOf!;
    let tail = this.sweepTail;
    let head = this.sweepHead;
    const stop = Math.min(head + budget, this.blocks.length);
    let n: number;
    while (head < tail) {
      if (head >= stop) break;
      const idx = queue[head++]!;
      const span = spanOf[idx]! - 1;
      if (span < 0) continue;
      const b = this.blocks[idx]!;
      n = this.indexAtFast(b.gx + 1, b.gy, b.gz);
      if (n >= 0 && visited[n] === 0 && this.aliveFlags[n] === 1) { visited[n] = 1; spanOf[n] = span; if (span > 0) queue[tail++] = n; }
      n = this.indexAtFast(b.gx - 1, b.gy, b.gz);
      if (n >= 0 && visited[n] === 0 && this.aliveFlags[n] === 1) { visited[n] = 1; spanOf[n] = span; if (span > 0) queue[tail++] = n; }
      n = this.indexAtFast(b.gx, b.gy + 1, b.gz);
      if (n >= 0 && visited[n] === 0 && this.aliveFlags[n] === 1) { visited[n] = 1; spanOf[n] = span; if (span > 0) queue[tail++] = n; }
      n = this.indexAtFast(b.gx, b.gy - 1, b.gz);
      if (n >= 0 && visited[n] === 0 && this.aliveFlags[n] === 1) { visited[n] = 1; spanOf[n] = span; if (span > 0) queue[tail++] = n; }
      n = this.indexAtFast(b.gx, b.gy, b.gz + 1);
      if (n >= 0 && visited[n] === 0 && this.aliveFlags[n] === 1) { visited[n] = 1; spanOf[n] = span; if (span > 0) queue[tail++] = n; }
      n = this.indexAtFast(b.gx, b.gy, b.gz - 1);
      if (n >= 0 && visited[n] === 0 && this.aliveFlags[n] === 1) { visited[n] = 1; spanOf[n] = span; if (span > 0) queue[tail++] = n; }
    }
    this.sweepHead = head;
    this.sweepTail = tail;
    if (head < tail) return false;
    // Cantilever cull BEFORE load — it reads spanOf (distance-from-grounded
    // from the BFS), which the load pass then reuses as scratch.
    if (this.cantileverCursor < this.blocks.length
      && !this.stepCantilever(budget)) return false;
    if (this.loadCursor >= 0 && !this.stepLoad(budget)) return false;
    return true;
  }

  /**
   * Phase 3: cantilever cull. Grounding+span keep any cell within MAX_SPAN of
   * a grounded cell — which can't tell a stable SPAN (a floor bracketed by
   * support on opposing sides) from an unstable CANTILEVER (a slab jutting off
   * one central spine). This pass detaches the long one-sided overhangs so a
   * wide cap left on a core erodes from the edges and the collapse finishes,
   * while two-sided floors and short cantilevers (balconies) stay.
   *
   * Read-only on the current alive set + grounded flags: marks cells (visited
   * → 0) for collection; the cascade inward happens on re-armed follow-up
   * sweeps (like crush), so the result is order-independent and converges.
   */
  private stepCantilever(budget: number): boolean {
    const blocks = this.blocks;
    const visited = this.floodVisited!;
    const spanOf = this.spanOf!;
    const cant = MAX_CANTILEVER;
    // Distance-from-grounded above which a one-sided overhang overturns. Cells
    // CLOSER than this to real vertical support (spanOf high) are decorative
    // cantilevers (cornices, eaves, tower ledges) and stay.
    const minSpan = this.maxSpan - MAX_CANTILEVER;
    const stop = Math.min(this.cantileverCursor + budget, blocks.length);
    for (let i = this.cantileverCursor; i < stop; i++) {
      // Only HANGING survivors are candidates: a cell that rests on structure
      // (alive cell directly below, or sits on the ground) is an anchor and
      // always stays. The rest must earn their keep via lateral support.
      if (this.aliveFlags[i] !== 1 || visited[i] !== 1) continue;
      if (spanOf[i]! >= minSpan) continue; // near grounded support → keep
      const b = blocks[i]!;
      if (this.isAnchor(b.gx, b.gy, b.gz)) continue;
      // Per lateral direction: distance to nearest anchor (1..SCAN), or OPEN
      // (0 = run hit a void/edge with no support), or FAR (SCAN+1 = material
      // continues, supported but no near anchor).
      const dxp = this.anchorDist(b.gx, b.gy, b.gz, 1, 0);
      const dxn = this.anchorDist(b.gx, b.gy, b.gz, -1, 0);
      const dzp = this.anchorDist(b.gx, b.gy, b.gz, 0, 1);
      const dzn = this.anchorDist(b.gx, b.gy, b.gz, 0, -1);
      // SPAN: supported on BOTH opposing sides (anchor OR continuing material)
      // in X or Z — a real floor between two supports, however wide → keep.
      const spanX = dxp !== 0 && dxn !== 0;
      const spanZ = dzp !== 0 && dzn !== 0;
      if (spanX || spanZ) continue;
      // CANTILEVER (open on a side in both axes): keep only if a CONCRETE near
      // anchor (balcony root) is within MAX_CANTILEVER; else it overturns.
      let near = 1e9;
      if (dxp >= 1 && dxp <= CANT_SCAN && dxp < near) near = dxp;
      if (dxn >= 1 && dxn <= CANT_SCAN && dxn < near) near = dxn;
      if (dzp >= 1 && dzp <= CANT_SCAN && dzp < near) near = dzp;
      if (dzn >= 1 && dzn <= CANT_SCAN && dzn < near) near = dzn;
      if (near <= cant) continue;
      visited[i] = 0; // overturns → detach; follow-up sweep cascades inward
      this.crushedInSweep = true;
    }
    this.cantileverCursor = stop;
    return stop >= blocks.length;
  }

  /** A cell is supported (anchored) when it rests on the ground or on an alive
   *  cell directly below OR on an alive below-DIAGONAL (a tread on a stair, a
   *  spire/gable cell stepping up a slope — these carry weight down a slanted
   *  member). A true overhang's edge has void below AND below-diagonal, so it
   *  is still flagged. Checked always (not gated on diagonalGrounding) so the
   *  cantilever cull never mistakes a stair/slope for a floating cantilever. */
  private isAnchor(gx: number, gy: number, gz: number): boolean {
    if (gy === 0) return true;
    const a = this.aliveFlags;
    let n = this.indexAtFast(gx, gy - 1, gz);
    if (n >= 0 && a[n] === 1) return true;
    n = this.indexAtFast(gx - 1, gy - 1, gz);
    if (n >= 0 && a[n] === 1) return true;
    n = this.indexAtFast(gx + 1, gy - 1, gz);
    if (n >= 0 && a[n] === 1) return true;
    n = this.indexAtFast(gx, gy - 1, gz - 1);
    if (n >= 0 && a[n] === 1) return true;
    n = this.indexAtFast(gx, gy - 1, gz + 1);
    if (n >= 0 && a[n] === 1) return true;
    // Corner diagonals — a roof-eave corner rests on the cell below-inward.
    n = this.indexAtFast(gx - 1, gy - 1, gz - 1);
    if (n >= 0 && a[n] === 1) return true;
    n = this.indexAtFast(gx - 1, gy - 1, gz + 1);
    if (n >= 0 && a[n] === 1) return true;
    n = this.indexAtFast(gx + 1, gy - 1, gz - 1);
    if (n >= 0 && a[n] === 1) return true;
    n = this.indexAtFast(gx + 1, gy - 1, gz + 1);
    return n >= 0 && a[n] === 1;
  }

  /** Classify lateral support going (dx,dz) along a continuous alive run:
   *  returns the step to the nearest ANCHOR (1..CANT_SCAN), 0 when the run
   *  hits a void/edge first (OPEN — unsupported that side), or CANT_SCAN+1
   *  (FAR) when material keeps going with no near anchor (still supported). */
  private anchorDist(gx: number, gy: number, gz: number, dx: number, dz: number): number {
    for (let s = 1; s <= CANT_SCAN; s++) {
      const cx = gx + dx * s;
      const cz = gz + dz * s;
      const n = this.indexAtFast(cx, gy, cz);
      if (n < 0 || this.aliveFlags[n] !== 1) return 0; // OPEN: void/edge
      if (this.isAnchor(cx, gy, cz)) return s;
    }
    return CANT_SCAN + 1; // FAR: continuous material, supported
  }

  /** Collect every alive block the finished sweep did not reach, plus
   *  every cell the load-flow pass found crushed by overload. */
  finishDisconnectSweep(out: number[]): number[] {
    out.length = 0;
    const visited = this.floodVisited!;
    const lo = this.loadOf;
    const crush = this.crushLoad;
    const useLoad = lo !== null && Number.isFinite(crush);
    for (let i = 0; i < this.blocks.length; i++) {
      if (this.aliveFlags[i] !== 1) continue;
      if (visited[i] === 0) {
        out.push(i);
      } else if (useLoad && lo[i]! > crush) {
        out.push(i);
        this.crushedInSweep = true;
      }
    }
    return out;
  }

  /** One-shot convenience (tests, small grids): full sweep in one call. */
  collectDisconnectedFromGround(out: number[]): number[] {
    this.beginDisconnectSweep();
    while (!this.stepDisconnectSweep(this.blocks.length)) { /* drain */ }
    return this.finishDisconnectSweep(out);
  }

  /**
   * Kill blocks + update rendering. With `collect = false` no DestroyedBlock
   * payloads are built — full-collapse cascades destroy hundreds of
   * thousands of blocks whose payloads the section path never reads; use
   * makeDestroyedBlocks() afterwards for the subsets that become debris.
   */
  destroyByIndices(indices: number[], collect = true): DestroyedBlock[] {
    // Scratch-backed payloads (see DebrisScratch contract) — the caller
    // consumes them synchronously via FlyingChunks.spawn.
    const destroyed = debrisScratch.begin();
    const blockSize = this.blockSize;
    const innerSize = blockSize * 0.98;
    const halfX = this.offX;
    const halfZ = this.offZ;
    const halfBlock = blockSize / 2;
    for (const idx of indices) {
      if (this.aliveFlags[idx] !== 1) continue;
      this.aliveFlags[idx] = 0;
      this.currentAlive--;
      const b = this.blocks[idx]!;
      if (collect) {
        const wx = b.gx * blockSize - halfX + halfBlock;
        const wy = b.gy * blockSize + halfBlock;
        const wz = b.gz * blockSize - halfZ + halfBlock;
        if ((b.color & GLASS_FLAG) !== 0) {
          // Szkło pęka na DROBNE kafelki — 3 odłamki ~45% rozmiaru,
          // rozrzucone w obrębie komórki (sypie się gęściej niż beton).
          const shard = innerSize * 0.45;
          for (let k = 0; k < 3; k++) {
            debrisScratch.add(
              wx + (Math.random() - 0.5) * blockSize * 0.6,
              wy + (Math.random() - 0.5) * blockSize * 0.6,
              wz + (Math.random() - 0.5) * blockSize * 0.6,
              jitterDebrisColor(b.color),
              shard,
            );
          }
        } else {
          debrisScratch.add(wx, wy, wz, jitterDebrisColor(b.color), innerSize);
        }
      }
      // The remesh culls faces against drawnFlags — uncovered neighbors
      // get their faces back automatically.
      this.eraseDrawn(idx);
    }
    return destroyed;
  }

  /**
   * Indices of up to `budget` still-alive blocks whose world XZ passes `test`.
   * Used by the post-collapse cleanup to vacuum the leftover STANDING skeleton
   * (columns + floor slabs) once a building is counted destroyed — feed these to
   * destroyByIndices() to harvest them as debris for the lift field.
   */
  collectAliveIndicesWhere(test: (x: number, z: number) => boolean, budget: number): number[] {
    const out: number[] = [];
    const blockSize = this.blockSize;
    const halfX = this.offX;
    const halfZ = this.offZ;
    const halfBlock = blockSize / 2;
    const n = this.blocks.length;
    for (let idx = 0; idx < n; idx++) {
      if (this.aliveFlags[idx] !== 1) continue;
      const b = this.blocks[idx]!;
      const wx = b.gx * blockSize - halfX + halfBlock;
      const wz = b.gz * blockSize - halfZ + halfBlock;
      if (!test(wx, wz)) continue;
      out.push(idx);
      if (out.length >= budget) break;
    }
    return out;
  }

  /**
   * Remesh dirty chunks, at most `maxChunks` per call — a remesh costs
   * ~0.1–0.3 ms plus its GPU upload, and a collapse storm dirties hundreds
   * of chunks at once. Deferred chunks keep last frame's surface: hidden
   * blocks linger a frame or two longer, which is exactly the ghost
   * behavior the section pipeline already relies on. Call once per frame.
   */
  flushUploads(maxChunks: number): number {
    if (this.dirtyChunks.size === 0) return 0;
    let n = 0;
    for (const ci of this.dirtyChunks) {
      if (n >= maxChunks) break;
      this.remeshChunk(ci);
      this.dirtyChunks.delete(ci);
      n++;
    }
    return n;
  }

  /**
   * Kill flags only — no rendering change. The blocks keep drawing as
   * "ghosts" until hideBlocks() runs. Used by the section pipeline so a
   * queued section's blocks stay visibly in place on the tower until the
   * frame its rigid piece actually spawns — hiding them at detach time
   * made collapsing towers vanish from the top and "rebuild from the
   * bottom" as the spawn queue drained.
   */
  killBlocks(indices: number[]): void {
    for (const idx of indices) {
      if (this.aliveFlags[idx] !== 1) continue;
      this.aliveFlags[idx] = 0;
      this.currentAlive--;
    }
  }

  /** Visual reveal of earlier killBlocks(): drop the ghosts from the
   *  render set (their chunks remesh in flushUploads, budgeted). */
  hideBlocks(indices: number[]): void {
    for (const idx of indices) {
      this.eraseDrawn(idx);
    }
  }

  /** Build debris payloads for already-destroyed indices (quiet path).
   *  Scratch-backed — consume synchronously (DebrisScratch contract). */
  makeDestroyedBlocks(indices: number[]): DestroyedBlock[] {
    const blockSize = this.blockSize;
    const innerSize = blockSize * 0.98;
    const halfX = this.offX;
    const halfZ = this.offZ;
    const halfBlock = blockSize / 2;
    const out = debrisScratch.begin();
    for (let i = 0; i < indices.length; i++) {
      const b = this.blocks[indices[i]!]!;
      const wx = b.gx * blockSize - halfX + halfBlock;
      const wy = b.gy * blockSize + halfBlock;
      const wz = b.gz * blockSize - halfZ + halfBlock;
      if ((b.color & GLASS_FLAG) !== 0) {
        const shard = innerSize * 0.45;
        for (let k = 0; k < 3; k++) {
          debrisScratch.add(
            wx + (Math.random() - 0.5) * blockSize * 0.6,
            wy + (Math.random() - 0.5) * blockSize * 0.6,
            wz + (Math.random() - 0.5) * blockSize * 0.6,
            jitterDebrisColor(b.color),
            shard,
          );
        }
      } else {
        debrisScratch.add(wx, wy, wz, jitterDebrisColor(b.color), innerSize);
      }
    }
    return out;
  }

  dispose(): void {
    for (const c of this.chunks) {
      if (!c) continue;
      this.pivot.remove(c.mesh);
      c.geometry.dispose();
    }
    this.material.dispose();
    this.glassMaterial.dispose();
  }
}

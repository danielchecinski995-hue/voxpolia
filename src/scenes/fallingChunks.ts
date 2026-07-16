/**
 * FallingChunks — the piece that makes a collapse look like the GAME instead
 * of a puff of dust. A lightweight port of the game's BigChunks: when the
 * sweep detaches a mass, we don't atomise it — we split it into connected
 * rigid sections that free-fall and topple as one body, then SHATTER into
 * voxel debris on impact, and the impact carves whatever they land on so the
 * collapse cascades (pancake), exactly like Building.ts describes.
 *
 * Detached voxels keep their slot in the city InstancedMesh; while they belong
 * to a chunk we drive their matrices from the chunk's rigid transform, and the
 * city rebuild skips them. On shatter they hand off to the Debris pool.
 */
import * as THREE from 'three';
import type { VoxelSim } from '../engine/VoxelSim';
import type { Debris } from './debris';

const GRAVITY = -34;
const SHATTER_SPEED = 6; // impact speed above which a landing pulverises
const REST_Y = 0.5; // ground contact for a unit voxel
const HARD_LIFE = 5.5; // seconds before a chunk is force-flushed
const MIN_CHUNK = 4; // smaller detached blobs just become debris

const _m = new THREE.Matrix4();
const _q = new THREE.Quaternion();
const _qid = new THREE.Quaternion();
const _e = new THREE.Euler();
const _s = new THREE.Vector3();
const _p = new THREE.Vector3();
const _l = new THREE.Vector3();
const _c = new THREE.Color();

interface Chunk {
  voxels: Int32Array;
  /** Per-voxel offset from the pivot, in the body frame (world units). */
  lx: Float32Array;
  ly: Float32Array;
  lz: Float32Array;
  px: number; py: number; pz: number; // pivot world position
  vx: number; vy: number; vz: number; // linear velocity
  ex: number; ey: number; ez: number; // current euler orientation
  ax: number; ay: number; az: number; // angular velocity
  age: number;
}

export interface ChunkDeps {
  sim: VoxelSim;
  mesh: THREE.InstancedMesh;
  debris: Debris;
  voxelSize: number;
  /** grid coords → world position. */
  voxelWorld: (gx: number, gy: number, gz: number, out: THREE.Vector3) => void;
  /** world → grid (for the secondary impact site). */
  worldToGrid: (w: THREE.Vector3, out: [number, number, number]) => void;
  /** Carve the structure a shattering chunk lands on → cascade. */
  onImpact: (gx: number, gy: number, gz: number, radius: number) => void;
}

export class FallingChunks {
  private readonly chunks: Chunk[] = [];
  private readonly inChunk: Uint8Array;
  private readonly d: ChunkDeps;

  constructor(deps: ChunkDeps) {
    this.d = deps;
    this.inChunk = new Uint8Array(deps.sim.voxelCount);
  }

  get active(): boolean {
    return this.chunks.length > 0;
  }

  isInChunk(i: number): boolean {
    return this.inChunk[i] === 1;
  }

  /**
   * Turn a freshly-detached voxel set into falling sections. Connected
   * components become rigid chunks; stray bits go straight to debris.
   * `kick` biases the sections away from the impact for a bit of throw.
   */
  spawn(indices: number[], kick: number): void {
    if (indices.length === 0) return;
    const sim = this.d.sim;
    const set = new Set(indices);
    const seen = new Set<number>();
    const g: [number, number, number] = [0, 0, 0];
    const sxy = sim.sizeX * sim.sizeY;

    for (const start of indices) {
      if (seen.has(start)) continue;
      // BFS the connected component within the detached set.
      const comp: number[] = [];
      const stack = [start];
      seen.add(start);
      while (stack.length) {
        const vi = stack.pop()!;
        comp.push(vi);
        sim.gridCoords(vi, g);
        const gx = g[0], gy = g[1], gz = g[2];
        const nbrs = [
          [gx + 1, gy, gz], [gx - 1, gy, gz],
          [gx, gy + 1, gz], [gx, gy - 1, gz],
          [gx, gy, gz + 1], [gx, gy, gz - 1],
        ];
        for (const [nx, ny, nz] of nbrs) {
          if (nx! < 0 || ny! < 0 || nz! < 0 || nx! >= sim.sizeX || ny! >= sim.sizeY || nz! >= sim.sizeZ) continue;
          const ni = sim.gridIdx[nx! + ny! * sim.sizeX + nz! * sxy]!;
          if (ni >= 0 && set.has(ni) && !seen.has(ni)) {
            seen.add(ni);
            stack.push(ni);
          }
        }
      }
      if (comp.length < MIN_CHUNK) {
        for (const vi of comp) this.toDebris(vi, kick);
      } else {
        this.makeChunk(comp, kick);
      }
    }
  }

  private makeChunk(comp: number[], kick: number): void {
    const n = comp.length;
    const voxels = Int32Array.from(comp);
    const lx = new Float32Array(n);
    const ly = new Float32Array(n);
    const lz = new Float32Array(n);
    const out: [number, number, number] = [0, 0, 0];
    let cx = 0, cy = 0, cz = 0;
    for (let k = 0; k < n; k++) {
      this.d.sim.gridCoords(voxels[k]!, out);
      this.d.voxelWorld(out[0], out[1], out[2], _p);
      lx[k] = _p.x; ly[k] = _p.y; lz[k] = _p.z;
      cx += _p.x; cy += _p.y; cz += _p.z;
    }
    cx /= n; cy /= n; cz /= n;
    for (let k = 0; k < n; k++) { lx[k]! -= cx; ly[k]! -= cy; lz[k]! -= cz; }

    // Topple bias: lean about the horizontal axis, stronger for slender
    // sections (tall relative to footprint) so towers hinge like felled trees.
    let minY = 1e9, maxY = -1e9, spanXZ = 1;
    for (let k = 0; k < n; k++) {
      minY = Math.min(minY, ly[k]!);
      maxY = Math.max(maxY, ly[k]!);
      spanXZ = Math.max(spanXZ, Math.abs(lx[k]!), Math.abs(lz[k]!));
    }
    const slender = (maxY - minY) / (spanXZ * 2 + 1);
    const lean = Math.min(0.4 + slender * 0.5, 1.6);

    for (const vi of voxels) this.inChunk[vi] = 1;
    this.chunks.push({
      voxels, lx, ly, lz,
      px: cx, py: cy, pz: cz,
      vx: (Math.random() - 0.5) * kick,
      vy: 1 + Math.random() * 2,
      vz: (Math.random() - 0.5) * kick,
      ex: 0, ey: 0, ez: 0,
      ax: (Math.random() - 0.5) * lean,
      ay: (Math.random() - 0.5) * 0.4,
      az: (Math.random() - 0.5) * lean,
      age: 0,
    });
  }

  update(dt: number): void {
    if (this.chunks.length === 0) return;
    let meshDirty = false;
    for (let ci = this.chunks.length - 1; ci >= 0; ci--) {
      const c = this.chunks[ci]!;
      c.age += dt;
      c.vy += GRAVITY * dt;
      c.px += c.vx * dt;
      c.py += c.vy * dt;
      c.pz += c.vz * dt;
      c.ex += c.ax * dt;
      c.ey += c.ay * dt;
      c.ez += c.az * dt;
      _e.set(c.ex, c.ey, c.ez);
      _q.setFromEuler(_e);
      _s.setScalar(this.d.voxelSize);

      // Write every voxel's rigid-transformed matrix; track the lowest point.
      let minY = 1e9;
      let minK = 0;
      const n = c.voxels.length;
      for (let k = 0; k < n; k++) {
        _l.set(c.lx[k]!, c.ly[k]!, c.lz[k]!).applyQuaternion(_q);
        const wy = c.py + _l.y;
        if (wy < minY) { minY = wy; minK = k; }
        _p.set(c.px + _l.x, wy, c.pz + _l.z);
        _m.compose(_p, _q, _s);
        this.d.mesh.setMatrixAt(c.voxels[k]!, _m);
      }
      meshDirty = true;

      if (minY <= REST_Y || c.age > HARD_LIFE) {
        this.shatter(c, minK, minY);
        this.chunks.splice(ci, 1);
      }
    }
    if (meshDirty) this.d.mesh.instanceMatrix.needsUpdate = true;
  }

  private shatter(c: Chunk, minK: number, minY: number): void {
    _e.set(c.ex, c.ey, c.ez);
    _q.setFromEuler(_e);
    const speed = Math.abs(c.vy);
    const spread = speed >= SHATTER_SPEED ? 10 : 4;
    // Burst every voxel into debris carrying the section's momentum.
    for (let k = 0; k < c.voxels.length; k++) {
      const vi = c.voxels[k]!;
      this.inChunk[vi] = 0;
      _l.set(c.lx[k]!, c.ly[k]!, c.lz[k]!).applyQuaternion(_q);
      this.d.mesh.getColorAt(vi, _c);
      this.d.debris.spawn(c.px + _l.x, Math.max(c.py + _l.y, REST_Y), c.pz + _l.z, this.d.voxelSize, _c, spread);
      // Hide the city-mesh slot — it's now a debris cube, not a chunk voxel.
      _m.compose(_p.set(0, -9999, 0), _qid, _s.setScalar(0));
      this.d.mesh.setMatrixAt(vi, _m);
    }
    this.d.mesh.instanceMatrix.needsUpdate = true;

    // Secondary impact: a hard landing punches whatever is under the contact
    // point, so falling sections knock out the floors below → pancake cascade.
    if (speed >= SHATTER_SPEED && minY <= REST_Y + 1.5) {
      _l.set(c.lx[minK]!, c.ly[minK]!, c.lz[minK]!).applyQuaternion(_q);
      _p.set(c.px + _l.x, Math.max(minY, REST_Y), c.pz + _l.z);
      const g: [number, number, number] = [0, 0, 0];
      this.d.worldToGrid(_p, g);
      this.d.onImpact(g[0], g[1], g[2], 3.4);
    }
  }

  private toDebris(vi: number, kick: number): void {
    const out: [number, number, number] = [0, 0, 0];
    this.d.sim.gridCoords(vi, out);
    this.d.voxelWorld(out[0], out[1], out[2], _p);
    this.d.mesh.getColorAt(vi, _c);
    this.d.debris.spawn(_p.x, _p.y, _p.z, this.d.voxelSize, _c, kick);
  }
}

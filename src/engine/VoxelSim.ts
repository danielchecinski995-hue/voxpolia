/**
 * VoxelSim — the site's standalone destruction simulation (WEBSITE_PLAN §3).
 *
 * Wraps the vendored {@link SweepCore} with everything it needs to be driven
 * without the game: a voxel grid built from a small city descriptor, sphere
 * impacts that carve voxels, and a cascading step() that detaches whatever the
 * structural sweep says can no longer stand.
 *
 * Deliberately THREE-free and DOM-free. Rendering (InstancedMesh, debris) lives
 * in the scene layer — the plan's `getInstancedMesh()` is intentionally NOT here
 * so the sim stays a pure module. The scene reads {@link coords}/{@link alive}
 * and maps grid space → world space itself.
 *
 * Runs synchronously on the main thread (no workers, no SharedArrayBuffer) — a
 * handful of towers sweep in well under a millisecond, so the site needs no
 * COOP/COEP headers (plan §3).
 */
import { SweepCore } from './sweepCore';

/** Material id per voxel — the scene maps these to colours. Matches the
 *  categories in the game's Building.ts (foundation/body/window/roof/slab/
 *  column/glass). */
export const enum Mat {
  Foundation = 0,
  Body = 1,
  Window = 2,
  Roof = 3,
  Slab = 4,
  Column = 5,
  Glass = 6,
}

/** One building footprint, all in voxel units. x/z = min corner on the grid. */
export interface BuildingSpec {
  x: number;
  z: number;
  w: number;
  d: number;
  h: number;
  /** Hollow shell (walls + periodic floors) vs. fully solid block. */
  hollow?: boolean;
  /** Full architectural predicate (walls/slabs/columns/windows). Returns a
   *  {@link Mat} for solid cells, or <0 for air. Overrides hollow/solid. */
  cell?: (lx: number, gy: number, lz: number) => number;
}

export interface CityDescriptor {
  sizeX: number;
  sizeY: number;
  sizeZ: number;
  buildings: BuildingSpec[];
  /** Cantilever reach budget fed to the sweep (grid cells). */
  maxSpan: number;
  /** Load a cell can carry before it crushes; Infinity disables crush. */
  crushLoad: number;
  diagonalGrounding: boolean;
}

const PACK = (gx: number, gy: number, gz: number) => gx | (gy << 10) | (gz << 20);

export class VoxelSim {
  readonly sizeX: number;
  readonly sizeY: number;
  readonly sizeZ: number;

  /** Packed grid coords per voxel, gy-ascending (SweepCore requires this order). */
  readonly coords: Int32Array;
  /** 1 = standing, 0 = carved/collapsed. Indexed by voxel index. */
  readonly alive: Uint8Array;
  /** Building index (0..n-1) each voxel belongs to — for per-building regen. */
  readonly buildingOf: Int32Array;
  /** Material id per voxel ({@link Mat}) — for scene colouring. */
  readonly matOf: Uint8Array;
  /** grid cell → voxel index, or -1. Sized sizeX*sizeY*sizeZ. */
  readonly gridIdx: Int32Array;
  readonly voxelCount: number;
  readonly buildings: readonly BuildingSpec[];

  private readonly sweep: SweepCore;

  constructor(desc: CityDescriptor) {
    this.sizeX = desc.sizeX;
    this.sizeY = desc.sizeY;
    this.sizeZ = desc.sizeZ;
    this.buildings = desc.buildings;

    const gridIdx = new Int32Array(desc.sizeX * desc.sizeY * desc.sizeZ).fill(-1);

    // Collect solid cells building-by-building, gy-ascending overall so the
    // sweep's phase-0 grounding sees each cell's support already resolved.
    const packed: number[] = [];
    const bldg: number[] = [];
    const mats: number[] = [];
    for (let gy = 0; gy < desc.sizeY; gy++) {
      for (let bi = 0; bi < desc.buildings.length; bi++) {
        const b = desc.buildings[bi]!;
        if (gy >= b.h) continue;
        for (let lx = 0; lx < b.w; lx++) {
          for (let lz = 0; lz < b.d; lz++) {
            let mat: number;
            if (b.cell) {
              mat = b.cell(lx, gy, lz);
              if (mat < 0) continue;
            } else {
              if (b.hollow && !isShellCell(lx, gy, lz, b)) continue;
              mat = 1; // Mat.Body
            }
            packed.push(PACK(b.x + lx, gy, b.z + lz));
            bldg.push(bi);
            mats.push(mat);
          }
        }
      }
    }

    const n = packed.length;
    this.coords = Int32Array.from(packed);
    this.buildingOf = Int32Array.from(bldg);
    this.matOf = Uint8Array.from(mats);
    this.alive = new Uint8Array(n).fill(1);
    this.voxelCount = n;

    for (let i = 0; i < n; i++) {
      const c = this.coords[i]!;
      const gx = c & 1023;
      const gy = (c >> 10) & 1023;
      const gz = (c >> 20) & 1023;
      gridIdx[gx + gy * this.sizeX + gz * this.sizeX * this.sizeY] = i;
    }
    this.gridIdx = gridIdx;

    this.sweep = new SweepCore({
      coords: this.coords,
      aliveFlags: this.alive,
      gridIdx: this.gridIdx,
      sizeX: this.sizeX,
      sizeY: this.sizeY,
      sizeZ: this.sizeZ,
      maxSpan: desc.maxSpan,
      diagonalGrounding: desc.diagonalGrounding,
      crushLoad: desc.crushLoad,
    });
  }

  /** Decode a voxel index to grid coords (scene maps these to world space). */
  gridCoords(i: number, out: [number, number, number]): void {
    const c = this.coords[i]!;
    out[0] = c & 1023;
    out[1] = (c >> 10) & 1023;
    out[2] = (c >> 20) & 1023;
  }

  /**
   * Carve a sphere of voxels at grid-space centre (cx,cy,cz). Returns the
   * indices removed this call (the scene turns them into debris). Iterates only
   * the sphere's bounding box via {@link gridIdx}, not the whole city.
   */
  applyImpact(cx: number, cy: number, cz: number, radius: number, out: number[]): void {
    out.length = 0;
    const r = Math.ceil(radius);
    const r2 = radius * radius;
    const x0 = Math.max(0, Math.floor(cx - r));
    const x1 = Math.min(this.sizeX - 1, Math.ceil(cx + r));
    const y0 = Math.max(0, Math.floor(cy - r));
    const y1 = Math.min(this.sizeY - 1, Math.ceil(cy + r));
    const z0 = Math.max(0, Math.floor(cz - r));
    const z1 = Math.min(this.sizeZ - 1, Math.ceil(cz + r));
    const sxy = this.sizeX * this.sizeY;
    for (let gz = z0; gz <= z1; gz++) {
      const dz = gz - cz;
      for (let gy = y0; gy <= y1; gy++) {
        const dy = gy - cy;
        for (let gx = x0; gx <= x1; gx++) {
          const dx = gx - cx;
          if (dx * dx + dy * dy + dz * dz > r2) continue;
          const idx = this.gridIdx[gx + gy * this.sizeX + gz * sxy]!;
          if (idx >= 0 && this.alive[idx] === 1) {
            this.alive[idx] = 0;
            out.push(idx);
          }
        }
      }
    }
  }

  /**
   * Run ONE structural sweep. Detached/crushed voxels are marked dead and
   * returned. `settling` is true while cascades are still resolving — the
   * caller keeps stepping until it goes false (bounded by the loop that drives
   * it, to avoid a runaway frame).
   */
  step(out: number[]): { settling: boolean } {
    out.length = 0;
    const res = this.sweep.run();
    const det = res.detached;
    for (let i = 0; i < det.length; i++) {
      const vi = det[i]!;
      if (this.alive[vi] === 1) {
        this.alive[vi] = 0;
        out.push(vi);
      }
    }
    return { settling: det.length > 0 || res.crushed };
  }

  /** Count of voxels still standing for a building — used to decide regen. */
  aliveCountOf(buildingIndex: number): number {
    let c = 0;
    for (let i = 0; i < this.voxelCount; i++) {
      if (this.buildingOf[i] === buildingIndex && this.alive[i] === 1) c++;
    }
    return c;
  }

  originalCountOf(buildingIndex: number): number {
    let c = 0;
    for (let i = 0; i < this.voxelCount; i++) if (this.buildingOf[i] === buildingIndex) c++;
    return c;
  }

  /** Restore a whole building to standing (for the seamless regen loop). */
  reviveBuilding(buildingIndex: number): void {
    for (let i = 0; i < this.voxelCount; i++) {
      if (this.buildingOf[i] === buildingIndex) this.alive[i] = 1;
    }
  }
}

/** Shell test: outer walls, floor slab every 4 levels, plus the roof. */
function isShellCell(lx: number, gy: number, lz: number, b: BuildingSpec): boolean {
  const onWall = lx === 0 || lz === 0 || lx === b.w - 1 || lz === b.d - 1;
  const onFloor = gy % 4 === 0 || gy === b.h - 1;
  return onWall || onFloor;
}

import * as THREE from 'three';
import { BuildingCluster, GLASS_FLAG, type BuildingBlock } from './BuildingCluster';

/**
 * Procedural voxel-grid tower built for FUN (Quake-style movement), not
 * architectural realism: open floor plates with thick perimeter walls, a
 * sparse grid of fat columns, BIG jump-through windows, a wide street
 * entrance and an open switchback staircase to the roof. The player walks
 * it with voxel collision (PlayerController).
 *
 * Layout (grid 214×334×134, block 0.13125m):
 *   - floor module = 28 layers (~3.7m): 4-layer slab + 24 of air
 *   - 11 floors, roof slab at gy=308..311, parapet above
 *   - stairwell along the north wall; runs rise 2 blocks per 4
 *     (riser 0.26m / tread 0.52m — comfortable at autostep 0.32)
 *   - entrance ~2.1m × 2.6m in the south face (player spawn side)
 *
 * Cast shadow is OFF on the InstancedMeshes; a flat ground-shadow blob
 * approximates the shadow visually.
 */
export interface BuildingConfig {
  width: number;
  depth: number;
  height: number;
  blockSize: number;
  /** World-space center of the footprint — city placement (default 0,0). */
  originX?: number;
  originZ?: number;
  /** Structural overrides for non-concrete structures (see
   *  BuildingCluster): slope-following grounding for lattice/spires and a
   *  longer cantilever limit for steel truss. */
  diagonalGrounding?: boolean;
  maxSpan?: number;
  /** Material crush capacity (cells of load one cell can carry) — finite
   *  values enable the load-flow pass; see BuildingCluster.crushLoad. */
  crushLoad?: number;
}

export const DEFAULT_BUILDING_CONFIG: BuildingConfig = {
  width: 214,
  depth: 134,
  height: 334,
  blockSize: 0.13125,
  // Beton wieżowca: zmierzony szczyt nietkniętej konstrukcji ~12050
  // (koncentracja w narożach poszerzonego wejścia) — margines ~2.2×.
  crushLoad: 26000,
};
// ⇒ ~2M blocks (hollow architecture), world bounds ~28m × 17.6m × 43.8m —
// same silhouette as the 0.2625m grid, blocks halved for fine destruction.

// Tall, airy floors — Quake-style movement needs vertical room to jump.
export const FLOOR_H = 28;
export const FLOORS = 11;
export const ROOF_Y = FLOORS * FLOOR_H; // 308 (roof slab = layers 308..311)
const PARAPET_H = 8;
/** Slab thickness in layers (~0.5m of concrete per floor plate). */
const SLAB_T = 4;

// HEAVY structure — realism rule: one rocket makes a local hole, it must
// NOT fell the tower. Redundant load paths (thick walls + slabs + a dense
// grid of fat columns) mean a real collapse needs a whole storey's
// supports cut, like an actual demolition.
// Spacing keeps every slab cell within MAX_SPAN (grid steps) of a support.
const COLUMN_XS = [28, 64, 100, 136, 172];
const COLUMN_ZS = [28, 64, 100];
const COLUMN_SIZE = 6; // 6×6 blocks ≈ 0.8m — structural pillar

// Perimeter wall thickness in blocks (~0.8m — solid, survives hits).
const WALL_T = 6;

// Stairwell shaft (inclusive) along the north wall, open to the floor.
export const SHAFT_X0 = 172;
export const SHAFT_X1 = 207;
const SHAFT_Z0 = 4;
const SHAFT_Z1 = 25;
// West landing columns of the shaft stay solid in every slab (stair entry).
const LANDING_X1 = 175;
// Entrance opening in the south face — wide and tall, no squeezing.
export const ENTRANCE_X0 = 95;
export const ENTRANCE_X1 = 116;
const ENTRANCE_H = 24;

const COLOR_FOUNDATION = 0x383838;
const COLOR_BODY = 0xb8b8b8;
const COLOR_WINDOW = 0x4a8eaf;
const COLOR_ROOF = 0x5a4030;
const COLOR_SLAB = 0x9a9a9a;
const COLOR_COLUMN = 0x8f8c84;
const COLOR_STAIRS = 0x6e6e6e;
/** Szyba — przezroczysty materiał + drobne odłamki przy rozbiciu. */
const COLOR_GLASS = 0x9fd4ef | GLASS_FLAG;

export class Building {
  readonly cluster: BuildingCluster;
  readonly config: BuildingConfig;

  private readonly shadowBlob: THREE.Mesh;
  private readonly shadowMaterial: THREE.MeshBasicMaterial;
  private readonly shadowGeometry: THREE.PlaneGeometry;

  constructor(config: BuildingConfig = DEFAULT_BUILDING_CONFIG, blocks?: BuildingBlock[]) {
    this.config = config;

    // City buildings hand in pre-generated blocks (cityBlocks.ts); the
    // default tower keeps its own generator below.
    blocks ??= generateBuildingBlocks(config);
    this.cluster = new BuildingCluster(blocks, config.blockSize, {
      x: config.width,
      y: config.height,
      z: config.depth,
    }, {
      originX: config.originX,
      originZ: config.originZ,
      diagonalGrounding: config.diagonalGrounding,
      maxSpan: config.maxSpan,
      crushLoad: config.crushLoad,
    });

    const halfW = (config.width * config.blockSize) / 2;
    const halfD = (config.depth * config.blockSize) / 2;

    // Ground shadow blob — substitutes for the directional-light shadow we
    // can't afford to render across instanced boxes.
    this.shadowGeometry = new THREE.PlaneGeometry(halfW * 2 + 6, halfD * 2 + 6);
    this.shadowMaterial = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
    });
    this.shadowBlob = new THREE.Mesh(this.shadowGeometry, this.shadowMaterial);
    this.shadowBlob.rotation.x = -Math.PI / 2;
    this.shadowBlob.position.y = 0.02;
    this.cluster.pivot.add(this.shadowBlob);
  }

  get group(): THREE.Group {
    return this.cluster.pivot;
  }

  isDestroyed(): boolean {
    return this.cluster.aliveCount() === 0;
  }

  damageRatio(): number {
    return 1 - this.cluster.aliveCount() / this.cluster.totalCount();
  }

  /** Fades the shadow blob proportionally to destruction. */
  updateShadow(): void {
    const alive = this.cluster.aliveCount();
    const total = this.cluster.totalCount();
    this.shadowMaterial.opacity = 0.45 * (alive / total);
  }

  dispose(): void {
    this.cluster.dispose();
    this.shadowGeometry.dispose();
    this.shadowMaterial.dispose();
  }
}

/**
 * Stair-step top layer (above the floor base) for shaft cell (gx, gz), or
 * -1 when the cell is open shaft air. Risers are 2 layers (0.26m) per 4
 * cells of run (0.52m tread) — same world geometry as the coarser grid.
 * Run A (south rail, gz 6..11) ascends EAST x176→203 to base+17; the east
 * landing (x204..207, full width) sits at base+17; run B (north rail,
 * gz 14..19) ascends WEST x203→176 reaching base+31 = the next slab's top
 * layer.
 */
function stairTopAt(gx: number, gz: number): number {
  if (gx >= SHAFT_X1 - 3) return 17; // east landing (x 204..207)
  if (gx >= 176 && gx <= 203) {
    if (gz >= 4 && gz <= 13) return (((gx - 176) >> 2) + 1) * 2 + 3; // run A: 5..17
    if (gz >= 16 && gz <= 25) return 17 + (((203 - gx) >> 2) + 1) * 2; // run B: 19..31
  }
  return -1;
}

function inShaft(gx: number, gz: number): boolean {
  return gx >= SHAFT_X0 && gx <= SHAFT_X1 && gz >= SHAFT_Z0 && gz <= SHAFT_Z1;
}

/** Color (or null = air) for a cell — the whole architecture in one rule. */
function cellColorAt(gx: number, gy: number, gz: number, cfg: BuildingConfig): number | null {
  const W = cfg.width;
  const D = cfg.depth;
  const floorIdx = Math.floor(gy / FLOOR_H);
  const yin = gy - floorIdx * FLOOR_H;

  const isPerimeter = gx < WALL_T || gx >= W - WALL_T || gz < WALL_T || gz >= D - WALL_T;
  const isSlabLayer = yin < SLAB_T;
  const isRoofFloor = floorIdx >= FLOORS;

  // Above the roof slab: only the perimeter parapet.
  if (gy > ROOF_Y + SLAB_T - 1) {
    if (gy <= ROOF_Y + SLAB_T - 1 + PARAPET_H && isPerimeter) return COLOR_ROOF;
    return null;
  }

  // Stairwell shaft: thin flights (2-block-thick treads, like a real stair
  // slab — a solid under-stair mass would eat the headroom under the next
  // floor's flight), open slab holes above the runs, central spine strip.
  if (inShaft(gx, gz)) {
    // Newel post in the gap between the runs — a real stairwell detail and
    // the vertical grounding for the spine strip (its east tip would be
    // far past the span limit otherwise and the rule would crack it off on
    // the intact building).
    if (gx >= 192 && gx <= 193 && gz >= 14 && gz <= 15) return COLOR_STAIRS;
    // West landing columns: solid in every slab (stair entry platform,
    // including the roof exit), air above.
    if (gx <= LANDING_X1) {
      return isSlabLayer ? (isRoofFloor ? COLOR_ROOF : COLOR_SLAB) : null;
    }
    // Slab-layer cells belong to the floor BELOW's stairs (run B tops out
    // exactly at the next slab's upper layer).
    const effFloor = isSlabLayer && gy >= FLOOR_H ? floorIdx - 1 : floorIdx;
    const rel = gy - effFloor * FLOOR_H;
    const top = stairTopAt(gx, gz);
    if (top >= 5 && rel <= top && rel >= top - 3) return COLOR_STAIRS; // 4-thick flight
    if (gy < SLAB_T) return COLOR_SLAB; // ground slab under the shaft
    // Central spine (between the two runs) stays solid in slabs so the
    // floor doesn't end at a full-width drop; landings stay open above.
    if (isSlabLayer && gz >= 14 && gz <= 15 && gx <= 203) {
      return isRoofFloor ? COLOR_ROOF : COLOR_SLAB;
    }
    return null; // open shaft: slab holes + air above the flights
  }

  // Floor slabs — SLAB_T layers of concrete per plate (incl. the roof).
  if (isSlabLayer) {
    return isRoofFloor ? COLOR_ROOF : COLOR_SLAB;
  }

  // Walls exist only below the roof.
  if (isRoofFloor) return null;

  if (isPerimeter) {
    // Entrance opening, ground floor, south face — wide and tall.
    if (floorIdx === 0 && gz >= D - WALL_T
      && gx >= ENTRANCE_X0 && gx <= ENTRANCE_X1 && yin < SLAB_T + ENTRANCE_H) {
      return null;
    }
    // BIG window openings (~1.6m wide × 1.8m high, sill ~0.5m above the
    // floor) — jump-through-able and they keep the interior bright.
    const onZFace = gz < WALL_T || gz >= D - WALL_T;
    const u = onZFace ? gx : gz;
    const len = onZFace ? W : D;
    const inBay = u > 7 && u < len - 8 && (u % 20) >= 4 && (u % 20) <= 15;
    if (inBay && yin >= 8 && yin <= 21) {
      // Tafla szkła w środku grubości muru — reszta otworu zostaje pusta.
      const depth = onZFace
        ? (gz < WALL_T ? gz : D - 1 - gz)
        : (gx < WALL_T ? gx : W - 1 - gx);
      return depth === 2 ? COLOR_GLASS : null;
    }
    // Blue frame around the opening (the facade's signature stripes).
    if (inBay && ((yin >= 6 && yin <= 7) || (yin >= 22 && yin <= 23))) return COLOR_WINDOW;
    const um = u % 20;
    if (u > 7 && u < len - 8 && (um === 2 || um === 3 || um === 16 || um === 17)
      && yin >= 8 && yin <= 21) {
      return COLOR_WINDOW;
    }
    return floorIdx === 0 ? COLOR_FOUNDATION : COLOR_BODY;
  }

  // Sparse fat columns — cover for the shooter, real vertical support for
  // the slabs (blow them out and the floor above comes down properly).
  for (const cx of COLUMN_XS) {
    if (gx < cx || gx >= cx + COLUMN_SIZE) continue;
    for (const cz of COLUMN_ZS) {
      if (gz >= cz && gz < cz + COLUMN_SIZE) return COLOR_COLUMN;
    }
  }

  return null;
}

function generateBuildingBlocks(cfg: BuildingConfig): BuildingBlock[] {
  const blocks: BuildingBlock[] = [];
  for (let gy = 0; gy < cfg.height; gy++) {
    for (let gx = 0; gx < cfg.width; gx++) {
      for (let gz = 0; gz < cfg.depth; gz++) {
        const baseColor = cellColorAt(gx, gy, gz, cfg);
        if (baseColor === null) continue;
        blocks.push({ gx, gy, gz, color: baseColor });
      }
    }
  }
  return blocks;
}

// Per-block color jitter happens in the cluster shader now (cell-hash
// tint) — blocks carry FLAT palette colors so the greedy mesher can merge
// coplanar faces; debris payloads re-jitter at spawn.

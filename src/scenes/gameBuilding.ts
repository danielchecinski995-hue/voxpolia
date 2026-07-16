/**
 * One faithful game building for the hero — same structural DNA as the game's
 * `Building.ts` (perimeter walls, a concrete slab per floor, a sparse grid of
 * fat load-bearing columns, recessed windows, a ground entrance), just at a
 * web-friendly voxel resolution instead of the game's ~2M-block tower.
 *
 * The point is the PHYSICS: exactly like the game (see Building.ts comment),
 * a single rocket only punches a local hole — the tower falls only once a
 * whole storey's columns are cut, and then the floors above pancake down
 * through the same {@link SweepCore} load-flow the game ships.
 */
import { Mat, type CityDescriptor } from '../engine/VoxelSim';

const W = 34;
const D = 26;
const FLOOR_H = 9; // slab (2) + 7 of air — room for the columns to read
const FLOORS = 8;
const SLAB_T = 2;
const WALL_T = 2;
const PARAPET_H = 3;
const ROOF_Y = FLOORS * FLOOR_H; // 72; roof slab = layers 72..73
const HEIGHT = ROOF_Y + SLAB_T + PARAPET_H; // 77

// Fat columns (2×2) on a sparse grid — the redundant vertical support. Cut a
// whole storey's worth and the load-flow pass crushes what's left.
const COLUMN_XS = [8, 16, 24];
const COLUMN_ZS = [8, 16];
const COLUMN_SIZE = 2;

// Wide ground entrance in the +Z face.
const ENT_X0 = 14;
const ENT_X1 = 19;
const ENT_H = 6;

/** The whole facade in one rule — a {@link Mat} for solid cells, -1 = air. */
function cell(lx: number, gy: number, lz: number): number {
  const floorIdx = Math.floor(gy / FLOOR_H);
  const yin = gy - floorIdx * FLOOR_H;
  const isPerim = lx < WALL_T || lx >= W - WALL_T || lz < WALL_T || lz >= D - WALL_T;
  const isSlab = yin < SLAB_T;
  const isRoofFloor = floorIdx >= FLOORS;

  // Parapet above the roof slab.
  if (gy > ROOF_Y + SLAB_T - 1) {
    if (gy <= ROOF_Y + SLAB_T - 1 + PARAPET_H && isPerim) return Mat.Roof;
    return -1;
  }

  // Floor slabs (incl. the roof plate).
  if (isSlab) {
    if (isRoofFloor) return Mat.Roof;
    return gy < SLAB_T ? Mat.Foundation : Mat.Slab; // ground slab = foundation
  }
  if (isRoofFloor) return -1; // above the top floor there are no walls

  if (isPerim) {
    // Entrance opening: ground floor, +Z face, wide and tall.
    if (floorIdx === 0 && lz >= D - WALL_T && lx >= ENT_X0 && lx <= ENT_X1 && yin < ENT_H) {
      return -1;
    }
    const onZFace = lz < WALL_T || lz >= D - WALL_T;
    const u = onZFace ? lx : lz;
    const len = onZFace ? W : D;
    const um = u % 6;
    const inBay = u > 3 && u < len - 3 && um >= 2 && um <= 4;
    if (inBay && yin >= 3 && yin <= 6) {
      // Recessed opening with a glass pane on the inner wall layer.
      const depth = onZFace ? (lz < WALL_T ? lz : D - 1 - lz) : (lx < WALL_T ? lx : W - 1 - lx);
      return depth === 1 ? Mat.Glass : -1;
    }
    if (inBay && (yin === 2 || yin === 7)) return Mat.Window; // blue frame band
    return floorIdx === 0 ? Mat.Foundation : Mat.Body;
  }

  // Interior fat columns — full height between the slabs.
  for (const cx of COLUMN_XS) {
    if (lx < cx || lx >= cx + COLUMN_SIZE) continue;
    for (const cz of COLUMN_ZS) {
      if (lz >= cz && lz < cz + COLUMN_SIZE) return Mat.Column;
    }
  }
  return -1;
}

export interface BuildingPlacement {
  /** Grid centre of the footprint (for aiming rockets). */
  cx: number;
  cz: number;
  w: number;
  d: number;
  h: number;
  floorH: number;
}

export function makeGameBuilding(): { desc: CityDescriptor; place: BuildingPlacement } {
  const sizeX = 66;
  const sizeZ = 58;
  const sizeY = HEIGHT + 3;
  const x = Math.floor((sizeX - W) / 2);
  const z = Math.floor((sizeZ - D) / 2);
  return {
    desc: {
      sizeX,
      sizeY,
      sizeZ,
      buildings: [{ x, z, w: W, d: D, h: HEIGHT, cell }],
      // Concrete: finite crush so a cut storey pancakes the floors above,
      // but a single hit is only a local hole. Tuned for this voxel budget.
      maxSpan: 22,
      crushLoad: 34,
      diagonalGrounding: false,
    },
    place: { cx: x + W / 2, cz: z + D / 2, w: W, d: D, h: HEIGHT, floorH: FLOOR_H },
  };
}

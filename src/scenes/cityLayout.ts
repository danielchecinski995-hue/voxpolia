/**
 * A small, deterministic voxel skyline for the hero (WEBSITE_PLAN §4.1:
 * "3–4 wieżowce"). Kept tiny on purpose — the sim runs synchronously, so the
 * voxel budget is what the main thread can sweep in a frame.
 */
import type { CityDescriptor, BuildingSpec } from '../engine/VoxelSim';

const SIZE_X = 96;
const SIZE_Z = 96;
const SIZE_Y = 46;

// Hand-placed so the towers frame nicely under a slow orbit and cast onto
// each other when they topple. All units are voxels; x/z are min corners.
const BUILDINGS: BuildingSpec[] = [
  { x: 30, z: 34, w: 12, d: 12, h: 38, hollow: true }, // centre spire
  { x: 48, z: 30, w: 10, d: 14, h: 28, hollow: true },
  { x: 16, z: 42, w: 11, d: 11, h: 24, hollow: true },
  { x: 50, z: 50, w: 13, d: 10, h: 20, hollow: true },
  { x: 32, z: 16, w: 9, d: 9, h: 16, hollow: false }, // squat solid block up front
];

export function makeCity(): CityDescriptor {
  return {
    sizeX: SIZE_X,
    sizeY: SIZE_Y,
    sizeZ: SIZE_Z,
    buildings: BUILDINGS,
    maxSpan: 20,
    crushLoad: 26,
    diagonalGrounding: true,
  };
}

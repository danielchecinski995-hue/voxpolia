import * as THREE from 'three';
import { debrisScratch } from '../boss/FlyingChunks';
import type { VoxelCollider, DebrisSink } from '../boss/FlyingChunks';
import type { DestroyedBlock } from '../boss/VoxelCluster';
import type { RubbleGridParams } from '../boss/debrisSim';
import { sharedUint8 } from '../utils/sharedAlloc';

/**
 * Persistent settled-debris store — the rubble pile.
 *
 * FlyingChunks hands over chunks that have come to rest (see DebrisSink).
 * Each one settles into a world-aligned occupancy grid (cell = building
 * block size) and is drawn by a static InstancedMesh batch, so a resting
 * block costs nothing per frame. The grid doubles as a VoxelCollider:
 * in-flight debris bounces off settled cells and the pile stacks up like a
 * real demolition instead of despawning.
 *
 * `blast()` lets rockets re-eject settled rubble back into flight.
 */

const BATCH_CAPACITY = 8192;
const HIDDEN_MATRIX = new THREE.Matrix4().makeScale(0, 0, 0);
/** Shared empty result for skipped gravity sweeps — callers only read it. */
const EMPTY_BLOCKS: DestroyedBlock[] = [];
/** 4-neighborhood probe order for the angle-of-repose roll. */
const ROLL_DIRS: ReadonlyArray<readonly [number, number]> = [[1, 0], [-1, 0], [0, 1], [0, -1]];
/** Settled rubble is cleaned up DESPAWN_AGE seconds after it comes to rest:
 *  ≈70% vanishes, ≈30% stays as a thin trace. Cuts the permanent render cost of
 *  the accumulated piles (every instance is drawn every frame). */
const DESPAWN_AGE = 12; // fallback clear for the rubble that stays (square sweep usually clears first)
const QUICK_DESPAWN_AGE = 1.0; // ≈50% of cubes vanish ~1 s after hitting the ground — masked by
//                                the ongoing avalanche so you never see them pop out
/** Records examined per pile per frame — bounds the decay cost; the cursor
 *  walks the array across frames so a whole aged wave clears over ~1s. */
const DECAY_SCAN_BUDGET = 800;
/** Concrete-dust tint mixed into settled rubble colors. */
const DUST_COLOR = new THREE.Color(0x99918a);

interface SettledRecord {
  batch: number;
  slot: number;
  cx: number;
  cy: number;
  cz: number;
  color: number;
  size: number;
  /** Internal clock time (s) when this block came to rest. */
  settledAt: number;
  /** Seconds after settling before this block despawns. ≈50% get a ~1 s age
   *  (vanish in the avalanche), the rest DESPAWN_AGE (cleared by the square sweep). */
  despawnAge: number;
}

interface Batch {
  mesh: THREE.InstancedMesh;
  /** Recycled slots (freed by blast / gravity). */
  freeSlots: number[];
  /** High-water mark — slots beyond it were never used; mesh.count tracks
   *  it so the GPU never draws the unused tail of the batch. */
  cursor: number;
  /** Dirty instance-slot span since last flush; -1 = clean. Range uploads
   *  instead of whole-buffer ones — settling waves touch thousands of
   *  slots/frame and full 512KB-per-batch uploads stall the GPU. */
  dirtyMin: number;
  dirtyMax: number;
  colorDirty: boolean;
}

export class Rubble implements VoxelCollider, DebrisSink {
  private readonly grid: Uint8Array;
  private readonly sizeX: number;
  private readonly sizeY: number;
  private readonly sizeZ: number;
  private readonly cell: number;
  private readonly originX: number;
  private readonly originZ: number;
  private readonly batches: Batch[] = [];
  private readonly records: SettledRecord[] = [];
  private readonly geom: THREE.BoxGeometry;
  private readonly material: THREE.MeshLambertMaterial;
  private readonly tmpMatrix = new THREE.Matrix4();
  private readonly tmpQuat = new THREE.Quaternion();
  private readonly tmpEuler = new THREE.Euler();
  private readonly tmpScale = new THREE.Vector3();
  private readonly tmpPos = new THREE.Vector3();
  private readonly tmpColor = new THREE.Color();
  private external: VoxelCollider | null = null;
  /** Gravity sweeps walk every record's support column — skip them entirely
   *  while nothing has changed since the last one. */
  private gravityDirty = false;
  /** Decay clock + scan cursor + settle counter for the timed despawn. */
  private clock = 0;
  private decayCursor = 0;
  private settleCount = 0;
  /** Columns touched since the last sweep (key = cx + cz·sizeX). A normal
   *  sweep walks chains ONLY in these columns — support is purely vertical,
   *  so untouched columns cannot have changed. The 2s forced pass still
   *  walks everything (catches building-cell changes under ledges). */
  private dirtyColumns = new Set<number>();
  /** Set when support could have changed OUTSIDE the tracked columns
   *  (external collider swap) — the next sweep walks everything. */
  private forceNextSweep = false;

  /**
   * @param halfExtentXZ Grid covers [-halfExtentXZ, +halfExtentXZ] meters
   *   around (centerX, centerZ) on both horizontal axes.
   * @param heightMeters Vertical grid coverage starting at ground level.
   * @param centerX World-space center X — each city building carries its
   *   own pile grid around its footprint.
   * @param centerZ World-space center Z.
   */
  constructor(
    private readonly scene: THREE.Scene,
    cellSize: number,
    halfExtentXZ: number,
    heightMeters: number,
    centerX = 0,
    centerZ = 0,
  ) {
    this.cell = cellSize;
    this.sizeX = Math.ceil((halfExtentXZ * 2) / cellSize);
    this.sizeY = Math.ceil(heightMeters / cellSize);
    this.sizeZ = this.sizeX;
    this.originX = centerX - halfExtentXZ;
    this.originZ = centerZ - halfExtentXZ;
    // SAB-backed (when available) — the debris worker collides against the
    // pile through this view; see sharedGrid().
    this.grid = sharedUint8(this.sizeX * this.sizeY * this.sizeZ);
    this.geom = new THREE.BoxGeometry(1, 1, 1);
    this.material = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      flatShading: true,
    });
  }

  /** Building cluster (or other static voxels) that settling rubble can
   *  rest on — keeps blocks on ledges instead of dropping through them. */
  setExternalCollider(c: VoxelCollider | null): void {
    this.external = c;
    // Support source changed — re-evaluate the WHOLE pile on the next tick.
    this.gravityDirty = true;
    this.forceNextSweep = true;
  }

  /** Settled-rubble meshes for external raycasting (rocket impacts). */
  getMeshes(): THREE.InstancedMesh[] {
    return this.batches.map((b) => b.mesh);
  }

  count(): number {
    return this.records.length;
  }

  /** Occupancy state for the debris worker (SAB-backed view + grid
   *  mapping). Settle/blast mutations stay on this thread; the worker only
   *  reads, at most a frame stale. */
  sharedGrid(): RubbleGridParams {
    return {
      grid: this.grid,
      sizeX: this.sizeX,
      sizeY: this.sizeY,
      sizeZ: this.sizeZ,
      cell: this.cell,
      originX: this.originX,
      originZ: this.originZ,
    };
  }

  isOccupied(wx: number, wy: number, wz: number): boolean {
    const cx = Math.floor((wx - this.originX) / this.cell);
    const cy = Math.floor(wy / this.cell);
    const cz = Math.floor((wz - this.originZ) / this.cell);
    if (cx < 0 || cy < 0 || cz < 0
      || cx >= this.sizeX || cy >= this.sizeY || cz >= this.sizeZ) return false;
    return this.grid[this.cellIdx(cx, cy, cz)] === 1;
  }

  /**
   * Claim a grid cell for a rested chunk and draw it as a static instance.
   * The chunk first bumps up out of any already-claimed cell, then drops
   * down its column until supported by rubble, the external collider, or
   * the ground. Returns false when the position is outside the grid (the
   * caller falls back to its timed-despawn path).
   */
  settle(position: THREE.Vector3, size: number, color: number): boolean {
    // Debris grain — wide size variation (0.7–1.25× cell) so the heap reads
    // as mixed rubble (some lumps overlap neighbors) rather than a uniform
    // grid of identical cubes.
    size = Math.min(size, this.cell) * (0.7 + Math.random() * 0.55);
    let cx = Math.floor((position.x - this.originX) / this.cell);
    let cz = Math.floor((position.z - this.originZ) / this.cell);
    let cy = Math.floor(position.y / this.cell);
    if (cx < 0 || cz < 0 || cx >= this.sizeX || cz >= this.sizeZ || cy >= this.sizeY) {
      return false;
    }
    if (cy < 0) cy = 0;

    while (cy < this.sizeY && this.grid[this.cellIdx(cx, cy, cz)] === 1) cy++;
    if (cy >= this.sizeY) return false;

    cy = this.dropInColumn(cx, cy, cz);

    // Angle of repose (sandpile rule): roll downhill into any 4-neighbor
    // column whose rest level is ≥2 lower, until the local slope is ≤1.
    // Without this, debris raining under a falling section stacks 1×1
    // needle towers — granular material can't hold that.
    // Deterministic ≥2 rolling alone produces mathematically perfect
    // pyramids — so ~30% of blocks are "loose" and roll already at a
    // 1-step drop, keeping slopes ragged and runouts varied.
    const rollAt = Math.random() < 0.3 ? 1 : 2;
    let guard = 24;
    while (guard-- > 0) {
      let bestX = cx;
      let bestZ = cz;
      let bestY = cy;
      const rot = (cx + cz) & 3; // rotate probe order — avoids pile skew
      for (let k = 0; k < 4; k++) {
        const d = ROLL_DIRS[(k + rot) & 3]!;
        const nx = cx + d[0];
        const nz = cz + d[1];
        if (nx < 0 || nz < 0 || nx >= this.sizeX || nz >= this.sizeZ) continue;
        if (this.grid[this.cellIdx(nx, cy, nz)] === 1) continue; // lip blocked
        const ny = this.dropInColumn(nx, cy, nz);
        if (ny <= cy - rollAt && ny < bestY) {
          bestY = ny;
          bestX = nx;
          bestZ = nz;
        }
      }
      if (bestY === cy) break;
      cx = bestX;
      cz = bestZ;
      cy = bestY;
    }

    this.grid[this.cellIdx(cx, cy, cz)] = 1;
    const { batch, slot } = this.allocSlot();
    this.tmpScale.set(size, size, size);
    // Organic scatter: random yaw + slight tumble + sub-cell offset —
    // axis-aligned cell-centered cubes read as a tiled bathroom floor.
    this.tmpEuler.set(
      (Math.random() - 0.5) * 0.35,
      Math.random() * Math.PI,
      (Math.random() - 0.5) * 0.35,
    );
    this.tmpQuat.setFromEuler(this.tmpEuler);
    this.tmpPos.set(
      this.originX + (cx + 0.5 + (Math.random() - 0.5) * 0.4) * this.cell,
      (cy + 0.45) * this.cell,
      this.originZ + (cz + 0.5 + (Math.random() - 0.5) * 0.4) * this.cell,
    );
    this.tmpMatrix.compose(this.tmpPos, this.tmpQuat, this.tmpScale);
    const b = this.batches[batch]!;
    b.mesh.setMatrixAt(slot, this.tmpMatrix);
    // Dust the color toward concrete grey — settled rubble shouldn't look
    // like confetti of pristine facade paint.
    this.tmpColor.setHex(color).lerp(DUST_COLOR, 0.35);
    b.mesh.setColorAt(slot, this.tmpColor);
    b.colorDirty = true;
    this.markDirty(b, slot);
    // ≈50% of cubes vanish ~1 s after landing (hidden in the avalanche), the rest
    // linger as the rubble pile until the square sweep / DESPAWN_AGE fallback.
    const despawnAge = (this.settleCount++ % 10) < 5 ? QUICK_DESPAWN_AGE : DESPAWN_AGE;
    this.records.push({ batch, slot, cx, cy, cz, color, size, settledAt: this.clock, despawnAge });
    this.gravityDirty = true;
    this.dirtyColumns.add(cx + cz * this.sizeX);
    return true;
  }

  /**
   * Remove all settled blocks within `radius` of `point` and return them as
   * DestroyedBlocks so the caller can re-eject them through FlyingChunks —
   * a rocket into the pile flings the rubble again.
   */
  blast(point: THREE.Vector3, radius: number): DestroyedBlock[] {
    const r2 = radius * radius;
    const out = debrisScratch.begin();
    // Explosions also carve the building under ledge lumps — re-check
    // support next gravity tick regardless of whether rubble was hit.
    this.gravityDirty = true;
    for (let i = this.records.length - 1; i >= 0; i--) {
      const rec = this.records[i]!;
      const wx = this.originX + (rec.cx + 0.5) * this.cell;
      const wy = (rec.cy + 0.5) * this.cell;
      const wz = this.originZ + (rec.cz + 0.5) * this.cell;
      const dx = wx - point.x;
      const dy = wy - point.y;
      const dz = wz - point.z;
      if (dx * dx + dy * dy + dz * dz > r2) continue;

      this.grid[this.cellIdx(rec.cx, rec.cy, rec.cz)] = 0;
      const batch = this.batches[rec.batch]!;
      batch.mesh.setMatrixAt(rec.slot, HIDDEN_MATRIX);
      this.markDirty(batch, rec.slot);
      batch.freeSlots.push(rec.slot);
      this.dirtyColumns.add(rec.cx + rec.cz * this.sizeX);
      this.records[i] = this.records[this.records.length - 1]!;
      this.records.pop();

      debrisScratch.add(wx, wy, wz, rec.color, rec.size);
    }
    return out;
  }

  /** Pull settled rubble whose world XZ passes `test` (up to `budget` blocks)
   *  out of the pile and return them — the green gravity field vacuums debris
   *  off the grass. Consume synchronously (shared scratch, like blast()). */
  liftWhere(test: (x: number, z: number) => boolean, budget: number): DestroyedBlock[] {
    const out = debrisScratch.begin();
    let taken = 0;
    for (let i = this.records.length - 1; i >= 0 && taken < budget; i--) {
      const rec = this.records[i]!;
      const wx = this.originX + (rec.cx + 0.5) * this.cell;
      const wz = this.originZ + (rec.cz + 0.5) * this.cell;
      if (!test(wx, wz)) continue;
      const wy = (rec.cy + 0.5) * this.cell;
      this.grid[this.cellIdx(rec.cx, rec.cy, rec.cz)] = 0;
      const batch = this.batches[rec.batch]!;
      batch.mesh.setMatrixAt(rec.slot, HIDDEN_MATRIX);
      this.markDirty(batch, rec.slot);
      batch.freeSlots.push(rec.slot);
      this.dirtyColumns.add(rec.cx + rec.cz * this.sizeX);
      this.records[i] = this.records[this.records.length - 1]!;
      this.records.pop();
      debrisScratch.add(wx, wy, wz, rec.color, rec.size);
      taken++;
    }
    return out;
  }

  /**
   * Timed cleanup: ≈70% of settled rubble vanishes DESPAWN_AGE seconds after it
   * came to rest (≈30% kept as a thin trace), reclaiming the permanent render
   * cost of accumulated piles. A bounded window of records is scanned per call;
   * the cursor walks the array across frames so an aged wave clears over ~1s
   * (gradual, not a pop). Removal mirrors blast() — hide instance, free slot,
   * clear the grid cell.
   */
  decayTick(dt: number): void {
    this.clock += dt;
    if (this.records.length === 0) return;
    let scans = Math.min(DECAY_SCAN_BUDGET, this.records.length);
    let i = this.decayCursor;
    let removed = false;
    while (scans-- > 0) {
      if (i >= this.records.length) { i = 0; if (this.records.length === 0) break; }
      const rec = this.records[i]!;
      if (this.clock - rec.settledAt > rec.despawnAge) {
        this.grid[this.cellIdx(rec.cx, rec.cy, rec.cz)] = 0;
        const batch = this.batches[rec.batch]!;
        batch.mesh.setMatrixAt(rec.slot, HIDDEN_MATRIX);
        this.markDirty(batch, rec.slot);
        batch.freeSlots.push(rec.slot);
        this.dirtyColumns.add(rec.cx + rec.cz * this.sizeX);
        this.records[i] = this.records[this.records.length - 1]!;
        this.records.pop();
        removed = true;
        // Don't advance i — the swapped-in record must be checked too.
      } else {
        i++;
      }
    }
    this.decayCursor = i >= this.records.length ? 0 : i;
    if (removed) this.gravityDirty = true;
  }

  /**
   * Rubble gravity: collect and remove EVERY settled block whose column
   * chain to the ground is broken — the whole floating lump drops in one
   * tick (removing only the exposed bottom layer per tick lets debris
   * re-settle on the lump meanwhile and the floater never drains).
   * Support = an unbroken column of rubble below, down to the ground or to
   * an alive building cell. Returned blocks re-enter flight as debris and
   * settle again lower down; past `spawnLimit` the rest is removed silently
   * (vanishing interior mass over the debris-pool budget).
   */
  collectUnsupported(spawnLimit: number, force = false): DestroyedBlock[] {
    if (!this.gravityDirty && !force) return EMPTY_BLOCKS;
    this.gravityDirty = false;
    // Snapshot the touched columns; removals below mark the fresh set so
    // chain breakage cascades into the next tick.
    const fullPass = force || this.forceNextSweep;
    this.forceNextSweep = false;
    const checkColumns = fullPass ? null : this.dirtyColumns;
    this.dirtyColumns = new Set<number>();
    let removedAny = false;
    const out = debrisScratch.begin();
    for (let i = this.records.length - 1; i >= 0; i--) {
      const rec = this.records[i]!;
      if (checkColumns && !checkColumns.has(rec.cx + rec.cz * this.sizeX)) continue;
      if (this.isColumnGrounded(rec)) continue;
      removedAny = true;

      this.grid[this.cellIdx(rec.cx, rec.cy, rec.cz)] = 0;
      const batch = this.batches[rec.batch]!;
      batch.mesh.setMatrixAt(rec.slot, HIDDEN_MATRIX);
      this.markDirty(batch, rec.slot);
      batch.freeSlots.push(rec.slot);
      this.dirtyColumns.add(rec.cx + rec.cz * this.sizeX);
      this.records[i] = this.records[this.records.length - 1]!;
      this.records.pop();

      if (out.length < spawnLimit) {
        debrisScratch.add(
          this.originX + (rec.cx + 0.5) * this.cell,
          (rec.cy + 0.5) * this.cell,
          this.originZ + (rec.cz + 0.5) * this.cell,
          rec.color,
          rec.size,
        );
      }
    }
    // Removals can break chains that re-settle onto each other — re-check
    // on the next tick until the pile is quiet.
    if (removedAny) this.gravityDirty = true;
    return out;
  }

  /** Fall down column (cx, ·, cz) starting at cy; returns the rest level —
   *  stops on rubble, the external collider, or the ground. */
  private dropInColumn(cx: number, cy: number, cz: number): number {
    while (cy > 0) {
      const below = cy - 1;
      if (this.grid[this.cellIdx(cx, below, cz)] === 1) break;
      if (this.external?.isOccupied(
        this.originX + (cx + 0.5) * this.cell,
        (below + 0.5) * this.cell,
        this.originZ + (cz + 0.5) * this.cell,
      )) break;
      cy = below;
    }
    return cy;
  }

  /** Walk down the column: supported iff the rubble below is continuous all
   *  the way to the ground, or the chain bottoms out on an alive building
   *  cell. Typical ground piles exit within a few steps. */
  private isColumnGrounded(rec: SettledRecord): boolean {
    if (rec.cy === 0) return true;
    let d = rec.cy - 1;
    while (d >= 0 && this.grid[this.cellIdx(rec.cx, d, rec.cz)] === 1) d--;
    if (d < 0) return true; // unbroken chain to the ground
    if (!this.external) return false;
    return this.external.isOccupied(
      this.originX + (rec.cx + 0.5) * this.cell,
      (d + 0.5) * this.cell,
      this.originZ + (rec.cz + 0.5) * this.cell,
    );
  }

  clear(): void {
    this.grid.fill(0);
    this.records.length = 0;
    this.dirtyColumns.clear();
    for (const b of this.batches) {
      this.scene.remove(b.mesh);
      b.mesh.dispose();
    }
    this.batches.length = 0;
  }

  dispose(): void {
    this.clear();
    this.geom.dispose();
    this.material.dispose();
  }

  private markDirty(batch: Batch, slot: number): void {
    if (batch.dirtyMin === -1) {
      batch.dirtyMin = slot;
      batch.dirtyMax = slot;
    } else {
      if (slot < batch.dirtyMin) batch.dirtyMin = slot;
      if (slot > batch.dirtyMax) batch.dirtyMax = slot;
    }
  }

  /** Upload the dirty instance ranges to the GPU — call once per frame. */
  flushDirty(): void {
    for (const b of this.batches) {
      if (b.dirtyMin === -1) continue;
      const attr = b.mesh.instanceMatrix;
      attr.clearUpdateRanges();
      attr.addUpdateRange(b.dirtyMin * 16, (b.dirtyMax - b.dirtyMin + 1) * 16);
      attr.needsUpdate = true;
      if (b.colorDirty && b.mesh.instanceColor) {
        const cattr = b.mesh.instanceColor;
        cattr.clearUpdateRanges();
        cattr.addUpdateRange(b.dirtyMin * 3, (b.dirtyMax - b.dirtyMin + 1) * 3);
        cattr.needsUpdate = true;
        b.colorDirty = false;
      }
      b.dirtyMin = -1;
      b.dirtyMax = -1;
    }
  }

  private cellIdx(cx: number, cy: number, cz: number): number {
    return cx + cy * this.sizeX + cz * this.sizeX * this.sizeY;
  }

  private allocSlot(): { batch: number; slot: number } {
    for (let i = 0; i < this.batches.length; i++) {
      const b = this.batches[i]!;
      if (b.freeSlots.length > 0) return { batch: i, slot: b.freeSlots.pop()! };
      if (b.cursor < BATCH_CAPACITY) {
        const slot = b.cursor++;
        b.mesh.count = b.cursor;
        return { batch: i, slot };
      }
    }
    const mesh = new THREE.InstancedMesh(this.geom, this.material, BATCH_CAPACITY);
    mesh.castShadow = false;
    mesh.frustumCulled = false;
    mesh.count = 1;
    this.scene.add(mesh);
    this.batches.push({
      mesh,
      freeSlots: [],
      cursor: 1,
      dirtyMin: -1,
      dirtyMax: -1,
      colorDirty: false,
    });
    return { batch: this.batches.length - 1, slot: 0 };
  }
}

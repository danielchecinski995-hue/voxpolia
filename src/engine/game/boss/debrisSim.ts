/**
 * Debris physics core on flat typed arrays (structure-of-arrays) — the
 * exact FlyingChunks simulation (integration, voxel collision, pair
 * collisions, rest/settle lifecycle) with no THREE and no DOM, so it runs
 * inside the debris worker (and in Node for tests/benchmarks). The layout
 * is also WASM-ready if plain JS ever stops being enough.
 *
 * Inputs are zero-copy views over SharedArrayBuffers owned by the main
 * thread: the building's gridIdx/aliveFlags and the rubble grid. Reading
 * them while the main thread mutates is a benign race — debris colliding
 * against occupancy a frame stale is invisible.
 *
 * Outputs: instance matrices + colors written into shared buffers (main
 * memcpy's the dirty range into the InstancedMesh), and settle events for
 * the rubble pile returned per step.
 */

export const GRAVITY = -18; // heavier than real (≈9.8) so debris falls snappy, not floaty
export const MAX_CHUNKS = 16000;
export const REST_TIME_BEFORE_DESPAWN = 3.0;
export const REST_VELOCITY_THRESHOLD_SQ = 0.25;
export const REST_ANGVEL_THRESHOLD_SQ = 0.5;
export const HARD_LIFE_CAP = 30.0;
export const STUCK_TIMEOUT = 0.5;

export const PAIR_RADIUS_RATIO = 0.45;
export const PAIR_RESTITUTION = 0.15;
export const PAIR_HASH_CELL = 0.6;
export const PAIR_HASH_CAP = 32768;
const PAIR_HASH_MASK = PAIR_HASH_CAP - 1;

/** Floats per block in a spawn batch: x, y, z, size, color. */
export const SPAWN_BLOCK_STRIDE = 5;
/** Header floats in a spawn batch: count, impact xyz, baseSpeed,
 *  hasBlastDir, blastDir xyz, hasInheritVel, inheritVel xyz,
 *  collisionDelay. */
export const SPAWN_HEADER = 14;
/** Default free-flight grace: crater debris spawns surrounded by alive
 *  cells and needs time to escape. Section debris passes a much shorter
 *  one (it spawns in open air / fresh holes — a long grace let it sail
 *  through intact floors below). */
export const DEFAULT_COLLISION_DELAY = 0.25;
/** Max travel per collision probe — slabs are ~0.52 m thick and a chunk
 *  at 30+ m/s covers more than that per frame; without substepping it
 *  TUNNELS straight through. */
export const COLLISION_SUBSTEP = 0.26;
/** Pile spill: a chunk coming to rest ON TOP of debris (not on flat
 *  ground) first tries to ROLL downhill — a physical nudge toward a free
 *  lower neighbor, up to this many times — so heaps visibly shed material
 *  down their slopes instead of teleport-stacking into instant cones. */
export const SPILL_ROLLS = 5;
export const SPILL_SPEED = 1.1;
/** Floats per settle event: x, y, z, size, color. */
export const SETTLE_STRIDE = 5;

export interface BuildingGridParams {
  aliveFlags: Uint8Array;
  gridIdx: Int32Array;
  sizeX: number;
  sizeY: number;
  sizeZ: number;
  blockSize: number;
  /** World-space center of the footprint (city placement). */
  originX: number;
  originZ: number;
}

export interface RubbleGridParams {
  grid: Uint8Array;
  sizeX: number;
  sizeY: number;
  sizeZ: number;
  cell: number;
  originX: number;
  originZ: number;
}

/** Building collider with precomputed world↔grid constants and an AABB for
 *  the early reject — the city loop touches ~11 of these per probe. */
interface BuildingView {
  aliveFlags: Uint8Array;
  gridIdx: Int32Array;
  sizeX: number;
  sizeY: number;
  sizeZ: number;
  invBlock: number;
  offX: number;
  offZ: number;
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
  maxY: number;
}

/** Rubble pile view with world AABB for the early reject. */
interface RubbleView {
  grid: Uint8Array;
  sizeX: number;
  sizeY: number;
  sizeZ: number;
  invCell: number;
  originX: number;
  originZ: number;
  maxXW: number;
  maxZW: number;
  maxYW: number;
}

export interface StepResult {
  count: number;
  dirtyMin: number;
  dirtyMax: number;
  /** Settle events written into `settleOut`, SETTLE_STRIDE floats each. */
  settleCount: number;
  colorDirty: boolean;
}

export class DebrisSim {
  private readonly posX = new Float32Array(MAX_CHUNKS);
  private readonly posY = new Float32Array(MAX_CHUNKS);
  private readonly posZ = new Float32Array(MAX_CHUNKS);
  private readonly velX = new Float32Array(MAX_CHUNKS);
  private readonly velY = new Float32Array(MAX_CHUNKS);
  private readonly velZ = new Float32Array(MAX_CHUNKS);
  private readonly quatX = new Float32Array(MAX_CHUNKS);
  private readonly quatY = new Float32Array(MAX_CHUNKS);
  private readonly quatZ = new Float32Array(MAX_CHUNKS);
  private readonly quatW = new Float32Array(MAX_CHUNKS);
  private readonly angX = new Float32Array(MAX_CHUNKS);
  private readonly angY = new Float32Array(MAX_CHUNKS);
  private readonly angZ = new Float32Array(MAX_CHUNKS);
  private readonly scale = new Float32Array(MAX_CHUNKS);
  private readonly color = new Float32Array(MAX_CHUNKS);
  private readonly groundedTime = new Float32Array(MAX_CHUNKS);
  private readonly totalLife = new Float32Array(MAX_CHUNKS);
  private readonly collisionDelay = new Float32Array(MAX_CHUNKS);
  private readonly stuckTime = new Float32Array(MAX_CHUNKS);
  private readonly rollsLeft = new Uint8Array(MAX_CHUNKS);
  private readonly atRest = new Uint8Array(MAX_CHUNKS);
  private count = 0;

  private readonly hashHeads = new Int32Array(PAIR_HASH_CAP);
  private readonly hashKeys = new Int32Array(PAIR_HASH_CAP);
  private readonly nextInCell = new Int32Array(MAX_CHUNKS);

  /** Settle events for the current step (reused; copy out per step). */
  readonly settleOut = new Float32Array(MAX_CHUNKS * SETTLE_STRIDE);

  private dirtyMin = -1;
  private dirtyMax = -1;
  private colorDirty = false;
  private spawnDensity = 1.0;
  private collisionHalfRate = false;
  private collisionPhase = 0;

  private readonly buildings: BuildingView[];
  private readonly rubbles: RubbleView[];

  constructor(
    /** Shared output: MAX_CHUNKS×16 floats, column-major like THREE. */
    private readonly matrices: Float32Array,
    /** Shared output: MAX_CHUNKS×3 floats, linear-ish RGB from hex. */
    private readonly colors: Float32Array,
    /** Shared output: MAX_CHUNKS×3 floats, per-instance velocity (for the main
     *  thread to extrapolate positions smoothly between worker ticks). */
    private readonly vels: Float32Array,
    buildings: BuildingGridParams[],
    rubbles: RubbleGridParams[],
  ) {
    this.buildings = buildings.map((b) => {
      const halfX = (b.sizeX * b.blockSize) / 2;
      const halfZ = (b.sizeZ * b.blockSize) / 2;
      return {
        aliveFlags: b.aliveFlags,
        gridIdx: b.gridIdx,
        sizeX: b.sizeX,
        sizeY: b.sizeY,
        sizeZ: b.sizeZ,
        invBlock: 1 / b.blockSize,
        offX: halfX - b.originX,
        offZ: halfZ - b.originZ,
        minX: b.originX - halfX,
        maxX: b.originX + halfX,
        minZ: b.originZ - halfZ,
        maxZ: b.originZ + halfZ,
        maxY: b.sizeY * b.blockSize,
      };
    });
    this.rubbles = rubbles.map((r) => ({
      grid: r.grid,
      sizeX: r.sizeX,
      sizeY: r.sizeY,
      sizeZ: r.sizeZ,
      invCell: 1 / r.cell,
      originX: r.originX,
      originZ: r.originZ,
      maxXW: r.originX + r.sizeX * r.cell,
      maxZW: r.originZ + r.sizeZ * r.cell,
      maxYW: r.sizeY * r.cell,
    }));
  }

  setSpawnDensity(d: number): void {
    this.spawnDensity = d;
  }

  setCollisionHalfRate(on: boolean): void {
    this.collisionHalfRate = on;
  }

  activeCount(): number {
    return this.count;
  }

  /** Combined world collider: any still-standing building OR any settled
   *  rubble pile — same composition as the main thread's city collider.
   *  AABB rejects keep the city loop cheap (one fits, the rest bail on the
   *  first comparison). */
  private isOccupied(wx: number, wy: number, wz: number): boolean {
    if (wy < 0) return false;
    const bs = this.buildings;
    for (let i = 0; i < bs.length; i++) {
      const b = bs[i]!;
      if (wx < b.minX || wx >= b.maxX || wz < b.minZ || wz >= b.maxZ || wy >= b.maxY) continue;
      const gx = Math.floor((wx + b.offX) * b.invBlock);
      const gy = Math.floor(wy * b.invBlock);
      const gz = Math.floor((wz + b.offZ) * b.invBlock);
      if (gx < 0 || gy < 0 || gz < 0 || gx >= b.sizeX || gy >= b.sizeY || gz >= b.sizeZ) continue;
      const idx = b.gridIdx[gx + gy * b.sizeX + gz * b.sizeX * b.sizeY]!;
      if (idx >= 0 && b.aliveFlags[idx] === 1) return true;
    }
    const rs = this.rubbles;
    for (let i = 0; i < rs.length; i++) {
      const r = rs[i]!;
      if (wx < r.originX || wx >= r.maxXW || wz < r.originZ || wz >= r.maxZW || wy >= r.maxYW) {
        continue;
      }
      const cx = Math.floor((wx - r.originX) * r.invCell);
      const cy = Math.floor(wy * r.invCell);
      const cz = Math.floor((wz - r.originZ) * r.invCell);
      if (cx < 0 || cy < 0 || cz < 0 || cx >= r.sizeX || cy >= r.sizeY || cz >= r.sizeZ) continue;
      if (r.grid[cx + cy * r.sizeX + cz * r.sizeX * r.sizeY] === 1) return true;
    }
    return false;
  }

  /** Mirrors Rubble.settle's early bounds rejection — chunks resting
   *  outside every pile's grid use the timed-despawn path locally instead
   *  of emitting a settle event the main thread would refuse anyway. */
  private inRubbleCoverage(wx: number, wy: number, wz: number): boolean {
    const rs = this.rubbles;
    for (let i = 0; i < rs.length; i++) {
      const r = rs[i]!;
      if (wx >= r.originX && wx < r.maxXW && wz >= r.originZ && wz < r.maxZW && wy < r.maxYW) {
        return true;
      }
    }
    return false;
  }

  /** Spawn a serialized batch (see SPAWN_HEADER / SPAWN_BLOCK_STRIDE) —
   *  same kinematics as FlyingChunks.spawn. */
  spawnBatch(data: Float32Array): void {
    const blockCount = data[0]!;
    const ix = data[1]!;
    const iy = data[2]!;
    const iz = data[3]!;
    const baseSpeed = data[4]!;
    const hasBlast = data[5]! !== 0;
    const bdx = data[6]!;
    const bdy = data[7]!;
    const bdz = data[8]!;
    const hasInherit = data[9]! !== 0;
    const ivx = data[10]!;
    const ivy = data[11]!;
    const ivz = data[12]!;
    const collisionDelay = data[13]!;

    for (let n = 0; n < blockCount; n++) {
      if (this.count >= MAX_CHUNKS) break;
      if (this.spawnDensity < 1 && Math.random() > this.spawnDensity) continue;
      const o = SPAWN_HEADER + n * SPAWN_BLOCK_STRIDE;
      const bx = data[o]!;
      const by = data[o + 1]!;
      const bz = data[o + 2]!;
      const size = data[o + 3]!;
      const colorHex = data[o + 4]!;
      const i = this.count;

      let dx = bx - ix;
      let dy = by - iy;
      let dz = bz - iz;
      if (dx * dx + dy * dy + dz * dz < 0.01) {
        dx = (Math.random() - 0.5) * 2;
        dy = 0.6 + Math.random() * 0.4;
        dz = (Math.random() - 0.5) * 2;
      }
      let inv = 1 / Math.sqrt(dx * dx + dy * dy + dz * dz);
      dx *= inv;
      // Mild up-bias: enough that debris clears the hole and heaps near the
      // footprint, low enough that gravity dominates immediately — 0.8 read
      // as a geyser erupting from every crater (and diverged from the
      // main-thread FlyingChunks.spawn value; both are 0.35 now).
      dy = dy * inv + 0.35;
      dz *= inv;
      inv = 1 / Math.sqrt(dx * dx + dy * dy + dz * dz);
      dx *= inv;
      dy *= inv;
      dz *= inv;

      const distSq = (bx - ix) * (bx - ix) + (by - iy) * (by - iy) + (bz - iz) * (bz - iz);
      const proximityBoost = 0.8 / (1 + distSq * 0.3);
      const speed = baseSpeed * (0.75 + Math.random() * 0.5) * (1 + proximityBoost);
      // Less lateral chaos (was ±1.6) — keeps the spread tighter so rubble
      // settles into a heap rather than scattering evenly far and wide.
      let vx = dx * speed + (Math.random() - 0.5) * 1.4;
      let vy = dy * speed + Math.random() * 1.0;
      let vz = dz * speed + (Math.random() - 0.5) * 1.4;

      if (hasBlast) {
        const inward = vx * bdx + vy * bdy + vz * bdz;
        if (inward > 0) {
          vx -= inward * bdx * 1.5;
          vy -= inward * bdy * 1.5;
          vz -= inward * bdz * 1.5;
        }
      }
      if (hasInherit) {
        vx += ivx;
        vy += ivy;
        vz += ivz;
      }

      this.posX[i] = bx;
      this.posY[i] = by;
      this.posZ[i] = bz;
      this.velX[i] = vx;
      this.velY[i] = vy;
      this.velZ[i] = vz;
      this.quatX[i] = 0;
      this.quatY[i] = 0;
      this.quatZ[i] = 0;
      this.quatW[i] = 1;
      this.angX[i] = (Math.random() - 0.5) * 14;
      this.angY[i] = (Math.random() - 0.5) * 14;
      this.angZ[i] = (Math.random() - 0.5) * 14;
      this.scale[i] = size;
      this.color[i] = colorHex;
      this.groundedTime[i] = 0;
      this.totalLife[i] = 0;
      this.collisionDelay[i] = collisionDelay;
      this.stuckTime[i] = 0;
      this.rollsLeft[i] = SPILL_ROLLS;
      this.atRest[i] = 0;
      this.count++;

      this.writeColor(i);
      this.writeMatrix(i);
    }
  }

  /** One fixed step. Settle events land in `settleOut` (overwritten next
   *  step) — consume them before stepping again. */
  step(delta: number): StepResult {
    this.collisionPhase ^= 1;
    if (!this.collisionHalfRate || this.collisionPhase === 1) {
      this.collidePairs();
    }
    let settleCount = 0;

    for (let i = this.count - 1; i >= 0; i--) {
      this.totalLife[i]! += delta;

      if (this.atRest[i] === 1) {
        this.groundedTime[i]! += delta;
        if (
          this.groundedTime[i]! >= REST_TIME_BEFORE_DESPAWN
          || this.totalLife[i]! >= HARD_LIFE_CAP
        ) {
          this.removeAt(i);
        }
        continue;
      }

      this.velY[i]! += GRAVITY * delta;
      if (this.collisionDelay[i]! > 0) this.collisionDelay[i]! -= delta;

      const stepX = this.velX[i]! * delta;
      const stepY = this.velY[i]! * delta;
      const stepZ = this.velZ[i]! * delta;
      let blockedAxes = 0;
      if (this.collisionDelay[i]! <= 0) {
        // Substepped axis moves: a probe every <= COLLISION_SUBSTEP of
        // travel, or fast debris tunnels through slabs thinner than its
        // per-frame step. K is 1 for anything slower than ~16 m/s.
        let k = stepX > COLLISION_SUBSTEP || stepX < -COLLISION_SUBSTEP
          ? Math.ceil(Math.abs(stepX) / COLLISION_SUBSTEP) : 1;
        let inc = stepX / k;
        for (; k > 0; k--) {
          const trial = this.posX[i]! + inc;
          if (this.isOccupied(trial, this.posY[i]!, this.posZ[i]!)) {
            this.velX[i]! *= -0.35;
            blockedAxes++;
            break;
          }
          this.posX[i] = trial;
        }
        k = stepY > COLLISION_SUBSTEP || stepY < -COLLISION_SUBSTEP
          ? Math.ceil(Math.abs(stepY) / COLLISION_SUBSTEP) : 1;
        inc = stepY / k;
        for (; k > 0; k--) {
          const trial = this.posY[i]! + inc;
          if (this.isOccupied(this.posX[i]!, trial, this.posZ[i]!)) {
            this.velY[i]! *= -0.35;
            blockedAxes++;
            break;
          }
          this.posY[i] = trial;
        }
        k = stepZ > COLLISION_SUBSTEP || stepZ < -COLLISION_SUBSTEP
          ? Math.ceil(Math.abs(stepZ) / COLLISION_SUBSTEP) : 1;
        inc = stepZ / k;
        for (; k > 0; k--) {
          const trial = this.posZ[i]! + inc;
          if (this.isOccupied(this.posX[i]!, this.posY[i]!, trial)) {
            this.velZ[i]! *= -0.35;
            blockedAxes++;
            break;
          }
          this.posZ[i] = trial;
        }
      } else {
        this.posX[i]! += stepX;
        this.posY[i]! += stepY;
        this.posZ[i]! += stepZ;
      }

      if (blockedAxes >= 3) {
        this.stuckTime[i]! += delta;
        if (this.stuckTime[i]! >= STUCK_TIMEOUT) {
          this.removeAt(i);
          continue;
        }
      } else {
        this.stuckTime[i] = 0;
      }

      // q ← normalize(q + ½·dt·(ω ⊗ q)) — same trig-free integration.
      {
        const wx = this.angX[i]! * 0.5 * delta;
        const wy = this.angY[i]! * 0.5 * delta;
        const wz = this.angZ[i]! * 0.5 * delta;
        const qx = this.quatX[i]!;
        const qy = this.quatY[i]!;
        const qz = this.quatZ[i]!;
        const qw = this.quatW[i]!;
        let nx = qx + (wx * qw + wy * qz - wz * qy);
        let ny = qy + (wy * qw - wx * qz + wz * qx);
        let nz = qz + (wz * qw + wx * qy - wy * qx);
        let nw = qw + (-wx * qx - wy * qy - wz * qz);
        const qinv = 1 / Math.sqrt(nx * nx + ny * ny + nz * nz + nw * nw);
        nx *= qinv;
        ny *= qinv;
        nz *= qinv;
        nw *= qinv;
        this.quatX[i] = nx;
        this.quatY[i] = ny;
        this.quatZ[i] = nz;
        this.quatW[i] = nw;
      }

      const restY = 0.15 + this.scale[i]! * 0.5;
      if (this.posY[i]! < restY) {
        this.posY[i] = restY;
        this.velY[i]! *= -0.15;
        this.velX[i]! *= 0.62;
        this.velZ[i]! *= 0.62;
        this.angX[i]! *= 0.6;
        this.angY[i]! *= 0.6;
        this.angZ[i]! *= 0.6;
      }

      const onGround = this.posY[i]! <= restY + 0.05;
      const onPile = !onGround
        && this.collisionDelay[i]! <= 0
        && this.isOccupied(this.posX[i]!, this.posY[i]! - this.scale[i]! * 0.6, this.posZ[i]!);
      const velSq = this.velX[i]! ** 2 + this.velY[i]! ** 2 + this.velZ[i]! ** 2;
      const angSq = this.angX[i]! ** 2 + this.angY[i]! ** 2 + this.angZ[i]! ** 2;
      const slow = velSq < REST_VELOCITY_THRESHOLD_SQ && angSq < REST_ANGVEL_THRESHOLD_SQ;

      if ((onGround || onPile) && slow) {
        // Pile spill: perched on debris (not flat ground) — roll downhill
        // toward a free lower neighbor instead of settling, while the
        // roll budget lasts. Heaps shed material down their slopes
        // visibly instead of teleport-stacking into instant cones.
        if (onPile && !onGround && this.rollsLeft[i]! > 0) {
          const s = Math.max(0.18, this.scale[i]! * 1.2);
          const start = (Math.random() * 4) | 0;
          let rolled = false;
          for (let d = 0; d < 4 && !rolled; d++) {
            const dir = (start + d) & 3;
            const dx = dir === 0 ? 1 : dir === 1 ? -1 : 0;
            const dz = dir === 2 ? 1 : dir === 3 ? -1 : 0;
            const nx = this.posX[i]! + dx * s;
            const nz = this.posZ[i]! + dz * s;
            if (
              !this.isOccupied(nx, this.posY[i]!, nz)
              && !this.isOccupied(nx, this.posY[i]! - s, nz)
            ) {
              const speed = SPILL_SPEED * (0.8 + Math.random() * 0.5);
              this.velX[i] = dx * speed;
              this.velZ[i] = dz * speed;
              this.velY[i] = 0.4;
              this.angX[i] = (Math.random() - 0.5) * 6;
              this.angZ[i] = (Math.random() - 0.5) * 6;
              this.rollsLeft[i]!--;
              rolled = true;
            }
          }
          if (rolled) continue;
        }
        if (this.inRubbleCoverage(this.posX[i]!, this.posY[i]!, this.posZ[i]!)) {
          settleCount = this.emitSettle(i, settleCount);
          this.removeAt(i);
          continue;
        }
        this.atRest[i] = 1;
        this.velX[i] = 0;
        this.velY[i] = 0;
        this.velZ[i] = 0;
        this.angX[i] = 0;
        this.angY[i] = 0;
        this.angZ[i] = 0;
        this.groundedTime[i] = delta;
      } else {
        this.groundedTime[i] = 0;
      }

      if (this.totalLife[i]! >= HARD_LIFE_CAP) {
        if (this.inRubbleCoverage(this.posX[i]!, this.posY[i]!, this.posZ[i]!)) {
          settleCount = this.emitSettle(i, settleCount);
        }
        this.removeAt(i);
        continue;
      }

      this.writeMatrix(i);
    }

    const result: StepResult = {
      count: this.count,
      dirtyMin: this.dirtyMin,
      dirtyMax: this.dirtyMax,
      settleCount,
      colorDirty: this.colorDirty,
    };
    this.dirtyMin = -1;
    this.dirtyMax = -1;
    this.colorDirty = false;
    return result;
  }

  clear(): void {
    this.count = 0;
    this.dirtyMin = -1;
    this.dirtyMax = -1;
  }

  private emitSettle(i: number, settleCount: number): number {
    const o = settleCount * SETTLE_STRIDE;
    this.settleOut[o] = this.posX[i]!;
    this.settleOut[o + 1] = this.posY[i]!;
    this.settleOut[o + 2] = this.posZ[i]!;
    this.settleOut[o + 3] = this.scale[i]!;
    this.settleOut[o + 4] = this.color[i]!;
    return settleCount + 1;
  }

  /** Swap-pop keeping slot ≡ index — the moved chunk's matrix and color
   *  are rewritten at its new slot, mirroring FlyingChunks.removeAt. */
  /** Black-hole orb suction: vanish every chunk within `radius` of (px,py,pz).
   *  removeAt writes the moved chunk's matrix + marks it dirty, so the next
   *  tick reply carries the change to the main thread. */
  cullWithinRadius(px: number, py: number, pz: number, radius: number): void {
    const r2 = radius * radius;
    for (let i = this.count - 1; i >= 0; i--) {
      const dx = this.posX[i]! - px;
      const dy = this.posY[i]! - py;
      const dz = this.posZ[i]! - pz;
      if (dx * dx + dy * dy + dz * dz <= r2) this.removeAt(i);
    }
  }

  /** Vanish every in-flight chunk inside the XZ rectangle (any height) — the
   *  block cleanup vortex eats airborne debris over its block so nothing escapes
   *  to litter the ground after the sweep. Mirrors cullWithinRadius. */
  cullWithinBoxXZ(minX: number, maxX: number, minZ: number, maxZ: number): void {
    for (let i = this.count - 1; i >= 0; i--) {
      const x = this.posX[i]!;
      const z = this.posZ[i]!;
      if (x >= minX && x <= maxX && z >= minZ && z <= maxZ) this.removeAt(i);
    }
  }

  /** Drop debris whose horizontal distance from (px,pz) exceeds `radius` —
   *  far-off settled chunks the viewer can't see (one instanced draw call, but
   *  pointless to keep around once you've driven away). */
  cullBeyondRadiusXZ(px: number, pz: number, radius: number): void {
    const r2 = radius * radius;
    for (let i = this.count - 1; i >= 0; i--) {
      const dx = this.posX[i]! - px;
      const dz = this.posZ[i]! - pz;
      if (dx * dx + dz * dz > r2) this.removeAt(i);
    }
  }

  private removeAt(i: number): void {
    const last = this.count - 1;
    if (i !== last) {
      this.posX[i] = this.posX[last]!;
      this.posY[i] = this.posY[last]!;
      this.posZ[i] = this.posZ[last]!;
      this.velX[i] = this.velX[last]!;
      this.velY[i] = this.velY[last]!;
      this.velZ[i] = this.velZ[last]!;
      this.quatX[i] = this.quatX[last]!;
      this.quatY[i] = this.quatY[last]!;
      this.quatZ[i] = this.quatZ[last]!;
      this.quatW[i] = this.quatW[last]!;
      this.angX[i] = this.angX[last]!;
      this.angY[i] = this.angY[last]!;
      this.angZ[i] = this.angZ[last]!;
      this.scale[i] = this.scale[last]!;
      this.color[i] = this.color[last]!;
      this.groundedTime[i] = this.groundedTime[last]!;
      this.totalLife[i] = this.totalLife[last]!;
      this.collisionDelay[i] = this.collisionDelay[last]!;
      this.stuckTime[i] = this.stuckTime[last]!;
      this.rollsLeft[i] = this.rollsLeft[last]!;
      this.atRest[i] = this.atRest[last]!;
      this.writeColor(i);
      this.writeMatrix(i);
    }
    this.count--;
  }

  private writeColor(i: number): void {
    const c = this.color[i]!;
    const o = i * 3;
    this.colors[o] = ((c >> 16) & 255) / 255;
    this.colors[o + 1] = ((c >> 8) & 255) / 255;
    this.colors[o + 2] = (c & 255) / 255;
    this.colorDirty = true;
    this.markDirty(i);
  }

  /** compose(position, quaternion, uniform scale) — THREE column-major. */
  private writeMatrix(i: number): void {
    const x = this.quatX[i]!;
    const y = this.quatY[i]!;
    const z = this.quatZ[i]!;
    const w = this.quatW[i]!;
    const s = this.scale[i]!;
    const x2 = x + x;
    const y2 = y + y;
    const z2 = z + z;
    const xx = x * x2;
    const xy = x * y2;
    const xz = x * z2;
    const yy = y * y2;
    const yz = y * z2;
    const zz = z * z2;
    const wx = w * x2;
    const wy = w * y2;
    const wz = w * z2;
    const m = this.matrices;
    const o = i * 16;
    m[o] = (1 - (yy + zz)) * s;
    m[o + 1] = (xy + wz) * s;
    m[o + 2] = (xz - wy) * s;
    m[o + 3] = 0;
    m[o + 4] = (xy - wz) * s;
    m[o + 5] = (1 - (xx + zz)) * s;
    m[o + 6] = (yz + wx) * s;
    m[o + 7] = 0;
    m[o + 8] = (xz + wy) * s;
    m[o + 9] = (yz - wx) * s;
    m[o + 10] = (1 - (xx + yy)) * s;
    m[o + 11] = 0;
    m[o + 12] = this.posX[i]!;
    m[o + 13] = this.posY[i]!;
    m[o + 14] = this.posZ[i]!;
    m[o + 15] = 1;
    // Share velocity (0 for at-rest, since vel is zeroed before this is called)
    // so the main thread can extrapolate position between worker ticks.
    const vo = i * 3;
    this.vels[vo] = this.velX[i]!;
    this.vels[vo + 1] = this.velY[i]!;
    this.vels[vo + 2] = this.velZ[i]!;
    this.markDirty(i);
  }

  private markDirty(slot: number): void {
    if (this.dirtyMin === -1) {
      this.dirtyMin = slot;
      this.dirtyMax = slot;
    } else {
      if (slot < this.dirtyMin) this.dirtyMin = slot;
      if (slot > this.dirtyMax) this.dirtyMax = slot;
    }
  }

  /** Same open-addressed spatial hash + sphere pair resolve as
   *  FlyingChunks.collidePairs, on SoA fields. */
  private collidePairs(): void {
    const n = this.count;
    if (n < 2) return;
    const heads = this.hashHeads;
    const keys = this.hashKeys;
    const next = this.nextInCell;
    heads.fill(-1);
    const inv = 1 / PAIR_HASH_CELL;

    for (let i = 0; i < n; i++) {
      if (this.atRest[i] === 1 || this.collisionDelay[i]! > 0) continue;
      const key = hashCell(
        Math.floor(this.posX[i]! * inv),
        Math.floor(this.posY[i]! * inv),
        Math.floor(this.posZ[i]! * inv),
      );
      let slot = key & PAIR_HASH_MASK;
      for (;;) {
        if (heads[slot] === -1) {
          keys[slot] = key;
          next[i] = -1;
          heads[slot] = i;
          break;
        }
        if (keys[slot] === key) {
          next[i] = heads[slot]!;
          heads[slot] = i;
          break;
        }
        slot = (slot + 1) & PAIR_HASH_MASK;
      }
    }

    for (let i = 0; i < n; i++) {
      if (this.atRest[i] === 1 || this.collisionDelay[i]! > 0) continue;
      const cx = Math.floor(this.posX[i]! * inv);
      const cy = Math.floor(this.posY[i]! * inv);
      const cz = Math.floor(this.posZ[i]! * inv);
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          for (let dz = -1; dz <= 1; dz++) {
            const key = hashCell(cx + dx, cy + dy, cz + dz);
            let slot = key & PAIR_HASH_MASK;
            for (;;) {
              const head = heads[slot]!;
              if (head === -1) break;
              if (keys[slot] === key) {
                for (let j = head; j !== -1; j = next[j]!) {
                  if (j > i) this.resolvePair(i, j);
                }
                break;
              }
              slot = (slot + 1) & PAIR_HASH_MASK;
            }
          }
        }
      }
    }
  }

  private resolvePair(a: number, b: number): void {
    const minDist = (this.scale[a]! + this.scale[b]!) * PAIR_RADIUS_RATIO;
    const dx = this.posX[b]! - this.posX[a]!;
    const dy = this.posY[b]! - this.posY[a]!;
    const dz = this.posZ[b]! - this.posZ[a]!;
    const distSq = dx * dx + dy * dy + dz * dz;
    if (distSq >= minDist * minDist || distSq < 1e-8) return;
    const dist = Math.sqrt(distSq);
    const nx = dx / dist;
    const ny = dy / dist;
    const nz = dz / dist;

    const half = (minDist - dist) * 0.5;
    this.posX[a]! -= nx * half;
    this.posY[a]! -= ny * half;
    this.posZ[a]! -= nz * half;
    this.posX[b]! += nx * half;
    this.posY[b]! += ny * half;
    this.posZ[b]! += nz * half;

    const vn = (this.velX[b]! - this.velX[a]!) * nx
      + (this.velY[b]! - this.velY[a]!) * ny
      + (this.velZ[b]! - this.velZ[a]!) * nz;
    if (vn >= 0) return;
    const imp = -(1 + PAIR_RESTITUTION) * vn * 0.5;
    this.velX[a]! -= nx * imp;
    this.velY[a]! -= ny * imp;
    this.velZ[a]! -= nz * imp;
    this.velX[b]! += nx * imp;
    this.velY[b]! += ny * imp;
    this.velZ[b]! += nz * imp;
  }
}

function hashCell(x: number, y: number, z: number): number {
  return ((x * 73856093) ^ (y * 19349663) ^ (z * 83492791)) | 0;
}

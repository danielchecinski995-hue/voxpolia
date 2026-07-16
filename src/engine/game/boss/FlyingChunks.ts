import * as THREE from 'three';
import type { DestroyedBlock } from './VoxelCluster';
import {
  GRAVITY,
  MAX_CHUNKS,
  DEFAULT_COLLISION_DELAY,
  COLLISION_SUBSTEP,
  SPILL_ROLLS,
  SPILL_SPEED,
  REST_TIME_BEFORE_DESPAWN,
  REST_VELOCITY_THRESHOLD_SQ,
  REST_ANGVEL_THRESHOLD_SQ,
  HARD_LIFE_CAP,
  STUCK_TIMEOUT,
  PAIR_RADIUS_RATIO,
  PAIR_RESTITUTION,
  PAIR_HASH_CELL,
  PAIR_HASH_CAP,
} from './debrisSim';

/** Voxel collider — debris uses this to bounce off the still-standing
 *  building. Cluster implements via a single grid lookup. */
export interface VoxelCollider {
  isOccupied(wx: number, wy: number, wz: number): boolean;
}

/**
 * Apply a packed RGB to a Color in LINEAR space, byte-for-byte the same way
 * the standing building's normalized Uint8 vertex colors are interpreted.
 *
 * Color.setHex() decodes sRGB→linear, which darkens a mid-tone ~35% — so a
 * block rendered via setHex on a falling section/debris looked abruptly
 * darker than the identical block in the wall (whose vertex colors skip the
 * decode). setRGB() defaults to the linear working space, restoring parity.
 */
export function setDebrisColor(out: THREE.Color, packed: number): THREE.Color {
  return out.setRGB(
    ((packed >> 16) & 255) / 255,
    ((packed >> 8) & 255) / 255,
    (packed & 255) / 255,
  );
}

/** Receiver for chunks that have come to rest. When bound, rested debris is
 *  handed over (and persists as a rubble pile) instead of despawning.
 *  Returns false when the chunk is outside the sink's coverage — the chunk
 *  then falls back to the timed-despawn path. */
export interface DebrisSink {
  settle(position: THREE.Vector3, size: number, color: number): boolean;
}

/** Debris system surface shared by the synchronous FlyingChunks and the
 *  worker-backed FlyingChunksWorker — consumers (BigChunks, controller,
 *  main loop) depend on this, not on a concrete backend. */
export interface DebrisField {
  spawn(
    blocks: DestroyedBlock[],
    impactPoint: THREE.Vector3,
    baseSpeed: number,
    blastDirection?: THREE.Vector3,
    inheritVelocity?: THREE.Vector3,
    collisionDelay?: number,
  ): void;
  update(delta: number): void;
  setWorldCollider(c: VoxelCollider | null): void;
  setDebrisSink(s: DebrisSink | null): void;
  setSpawnDensity(d: number): void;
  setCollisionHalfRate(on: boolean): void;
  getMesh(): THREE.InstancedMesh;
  /** Black-hole orb suction: any in-flight chunk within `radius` of (x,y,z)
   *  vanishes (no rest, no rubble) — it was sucked into the orb. */
  cullSphere(x: number, y: number, z: number, radius: number): void;
  /** Drop debris beyond `radius` (horizontal) of (x,z) — far settled chunks
   *  the viewer has driven away from. */
  cullFar(x: number, z: number, radius: number): void;
  /** Vanish in-flight debris inside the XZ rectangle (any height) — the block
   *  cleanup vortex eats airborne voxels over its block so none escape to litter
   *  the ground after the sweep. */
  cullBox(minX: number, maxX: number, minZ: number, maxZ: number): void;
  clear(): void;
  dispose(): void;
}

/**
 * Flying-chunk debris system backed by a single InstancedMesh + free-list
 * slot allocation.
 *
 * Lifecycle (golden rule): chunks NEVER despawn while in motion. They live
 * until they have rested on the ground for 3 seconds. Hard 30-second cap
 * is a safety net against absurd states (e.g. chunk launched far above
 * world bounds by a bug).
 */
// Physics constants (gravity tuning, rest thresholds, pair-collision
// parameters) live in debrisSim.ts — shared with the worker-backed SoA
// core so the two debris backends can never drift apart.
const PAIR_HASH_MASK = PAIR_HASH_CAP - 1;

interface ActiveChunk {
  slot: number;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  /** Orientation integrated directly as a quaternion (dq = ½·ω⊗q·dt) —
   * Euler + setFromEuler at compose time costs 6 trig calls per chunk per
   * frame, ~48k/frame with a full pool. */
  quaternion: THREE.Quaternion;
  angularVelocity: THREE.Vector3;
  scale: number;
  color: number;
  groundedTime: number;
  totalLife: number;
  /** Seconds remaining of free flight (no world collision). Chunks spawn
   * inside the crater with neighbors that are still alive — without this
   * grace period blocks behind the impact point would trap on their first
   * step into the deeper interior and never visibly escape. */
  collisionDelay: number;
  /** Time spent fully blocked on all 3 axes — when a chunk becomes wedged
   * between alive cells, it can't slide and bouncing damps to zero. We
   * despawn after STUCK_TIMEOUT to avoid visible "frozen-in-wall" debris. */
  stuckTime: number;
  /** Remaining downhill-roll nudges before the chunk may settle on a pile
   *  (see SPILL_ROLLS in debrisSim — heaps shed material visibly). */
  rollsLeft: number;
  /** Once true, chunk is parked — skip all per-frame physics and GPU
   * updates until despawn timer fires. */
  atRest: boolean;
}

export class FlyingChunks implements DebrisField {
  private readonly geom: THREE.BoxGeometry;
  private readonly material: THREE.MeshLambertMaterial;
  private readonly instances: THREE.InstancedMesh;
  private readonly active: ActiveChunk[] = [];
  private readonly tmpMatrix = new THREE.Matrix4();
  private readonly tmpScaleVec = new THREE.Vector3();
  private readonly tmpColor = new THREE.Color();
  private dirtyMin = -1;
  private dirtyMax = -1;
  private colorDirty = false;
  private worldCollider: VoxelCollider | null = null;
  private sink: DebrisSink | null = null;
  /** Open-addressed spatial hash on flat typed arrays. A Map<number,
   *  number[]> broadphase costs ~200k Map.get calls per frame at a full
   *  pool — about 10ms in Safari by itself. heads[slot] → first chunk
   *  index for that cell key, nextInCell chains the rest. */
  private readonly hashHeads = new Int32Array(PAIR_HASH_CAP);
  private readonly hashKeys = new Int32Array(PAIR_HASH_CAP);
  private readonly nextInCell = new Int32Array(MAX_CHUNKS);
  /** Recycled ActiveChunk records (with their vectors) — one rocket spawns
   *  ~8k chunks; allocating 6 objects per chunk per shot is a GC hitch. */
  private readonly chunkPool: ActiveChunk[] = [];
  private readonly tmpDir = new THREE.Vector3();
  /** Adaptive-quality lever: fraction of spawned blocks to keep. Set per
   *  frame by the load governor; 1.0 = full density (no change). */
  private spawnDensity = 1.0;
  /** Emergency lever (governor L3): pair collisions at half frame rate. */
  private collisionHalfRate = false;
  private collisionPhase = 0;

  constructor(private readonly scene: THREE.Scene) {
    this.geom = new THREE.BoxGeometry(1, 1, 1);
    this.material = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      flatShading: true,
    });
    this.instances = new THREE.InstancedMesh(this.geom, this.material, MAX_CHUNKS);
    this.instances.castShadow = false;
    this.instances.frustumCulled = false;
    // Slot ≡ index in `active` (kept compact via swap-pop removal), so the
    // GPU only ever draws live chunks — a fixed count of 8000 ran the
    // vertex shader for the whole pool even when a handful were alive.
    this.instances.count = 0;
    this.scene.add(this.instances);
  }

  /** Black-hole orb suction — vanish every chunk within `radius` of (x,y,z). */
  cullSphere(x: number, y: number, z: number, radius: number): void {
    const r2 = radius * radius;
    for (let i = this.active.length - 1; i >= 0; i--) {
      const p = this.active[i]!.position;
      const dx = p.x - x;
      const dy = p.y - y;
      const dz = p.z - z;
      if (dx * dx + dy * dy + dz * dz <= r2) this.removeAt(i);
    }
  }

  /** Drop debris beyond `radius` (horizontal) of (x,z) — far settled chunks. */
  cullFar(x: number, z: number, radius: number): void {
    const r2 = radius * radius;
    for (let i = this.active.length - 1; i >= 0; i--) {
      const p = this.active[i]!.position;
      const dx = p.x - x;
      const dz = p.z - z;
      if (dx * dx + dz * dz > r2) this.removeAt(i);
    }
  }

  /** Vanish in-flight debris inside the XZ rectangle (any height). */
  cullBox(minX: number, maxX: number, minZ: number, maxZ: number): void {
    for (let i = this.active.length - 1; i >= 0; i--) {
      const p = this.active[i]!.position;
      if (p.x >= minX && p.x <= maxX && p.z >= minZ && p.z <= maxZ) this.removeAt(i);
    }
  }

  /** Swap-pop removal keeping slots ≡ indices; recycles the record. */
  private removeAt(i: number): void {
    const c = this.active[i]!;
    this.chunkPool.push(c);
    const last = this.active.length - 1;
    if (i !== last) {
      const moved = this.active[last]!;
      this.active[i] = moved;
      moved.slot = i;
      this.tmpScaleVec.set(moved.scale, moved.scale, moved.scale);
      this.tmpMatrix.compose(moved.position, moved.quaternion, this.tmpScaleVec);
      this.instances.setMatrixAt(i, this.tmpMatrix);
      setDebrisColor(this.tmpColor, moved.color);
      this.instances.setColorAt(i, this.tmpColor);
      this.colorDirty = true;
      this.markSlotDirty(i);
    }
    this.active.pop();
    this.instances.count = this.active.length;
  }

  /** Bind a voxel collider (e.g. building cluster) so chunks bounce off
   *  alive cells instead of phasing through. Pass null to clear. */
  setWorldCollider(c: VoxelCollider | null): void {
    this.worldCollider = c;
  }

  /** Bind a settled-debris sink (rubble pile). Rested chunks are handed
   *  over and persist instead of despawning. Pass null to clear. */
  setDebrisSink(s: DebrisSink | null): void {
    this.sink = s;
  }

  /** Adaptive quality: keep only this fraction of newly spawned debris
   *  (driven by the load governor during collapse peaks). */
  setSpawnDensity(d: number): void {
    this.spawnDensity = d;
  }

  /** Emergency adaptive lever: run debris-vs-debris collisions every other
   *  frame (30Hz) while the governor is at its highest level. */
  setCollisionHalfRate(on: boolean): void {
    this.collisionHalfRate = on;
  }

  /** Underlying InstancedMesh — exposed so external systems (rocket
   *  fallback raycaster) can target debris with Three.js raycasting. */
  getMesh(): THREE.InstancedMesh {
    return this.instances;
  }

  spawn(
    blocks: DestroyedBlock[],
    impactPoint: THREE.Vector3,
    baseSpeed: number,
    blastDirection?: THREE.Vector3,
    inheritVelocity?: THREE.Vector3,
    collisionDelay = DEFAULT_COLLISION_DELAY,
  ): void {
    for (const b of blocks) {
      if (this.active.length >= MAX_CHUNKS) break;
      if (this.spawnDensity < 1 && Math.random() > this.spawnDensity) continue;
      const slot = this.active.length;

      // Pooled chunk record — all vectors are reused across lifetimes.
      const c = this.chunkPool.pop() ?? makeChunkRecord();

      const dir = this.tmpDir.subVectors(b.worldPosition, impactPoint);
      if (dir.lengthSq() < 0.01) {
        dir.set((Math.random() - 0.5) * 2, 0.6 + Math.random() * 0.4, (Math.random() - 0.5) * 2);
      }
      dir.normalize();
      // Mild up-bias — matches debrisSim.spawnBatch (worker parity); higher
      // values made every crater erupt like a fountain.
      dir.y += 0.35;
      dir.normalize();

      const distSq = b.worldPosition.distanceToSquared(impactPoint);
      const proximityBoost = 0.8 / (1 + distSq * 0.3);
      const speed = baseSpeed * (0.75 + Math.random() * 0.5) * (1 + proximityBoost);
      const velocity = c.velocity.copy(dir).multiplyScalar(speed);
      velocity.x += (Math.random() - 0.5) * 3.2;
      velocity.z += (Math.random() - 0.5) * 3.2;
      velocity.y += Math.random() * 1.0;

      // Strip any velocity component pointing INTO the building (along the
      // rocket's flight direction). Without this, blocks behind the impact
      // get a "deeper into building" velocity and tunnel into still-alive
      // walls — they'd appear stuck inside solid material once the
      // collision delay expires.
      if (blastDirection) {
        const inward = velocity.x * blastDirection.x
          + velocity.y * blastDirection.y
          + velocity.z * blastDirection.z;
        if (inward > 0) {
          velocity.x -= inward * blastDirection.x * 1.5;
          velocity.y -= inward * blastDirection.y * 1.5;
          velocity.z -= inward * blastDirection.z * 1.5;
        }
      }

      // Momentum inheritance — debris from a moving parent body (falling
      // wall section) keeps the parent's velocity on top of the burst.
      // Dead pieces spawned from a fast body are the #1 "looks fake" tell.
      if (inheritVelocity) {
        velocity.x += inheritVelocity.x;
        velocity.y += inheritVelocity.y;
        velocity.z += inheritVelocity.z;
      }

      c.angularVelocity.set(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 14,
      );

      c.slot = slot;
      c.position.copy(b.worldPosition);
      c.quaternion.identity();
      c.scale = b.size;
      c.color = b.color;
      c.groundedTime = 0;
      c.totalLife = 0;
      c.collisionDelay = collisionDelay;
      c.stuckTime = 0;
      c.rollsLeft = SPILL_ROLLS;
      c.atRest = false;
      this.active.push(c);

      setDebrisColor(this.tmpColor, b.color);
      this.instances.setColorAt(slot, this.tmpColor);
      this.colorDirty = true;
      this.markSlotDirty(slot);
    }
    this.instances.count = this.active.length;
  }

  update(delta: number): void {
    this.collisionPhase ^= 1;
    if (!this.collisionHalfRate || this.collisionPhase === 1) {
      this.collidePairs();
    }
    for (let i = this.active.length - 1; i >= 0; i--) {
      const c = this.active[i]!;
      c.totalLife += delta;

      // Fast path for resting chunks: skip physics, skip matrix recompute,
      // skip GPU upload for this slot. With hundreds of chunks lying on the
      // ground after multiple rocket shots this drops per-frame cost from
      // ~1.5 ms (1000 setMatrixAt + ~512 KB updateRange) to ~0.05 ms.
      if (c.atRest) {
        c.groundedTime += delta;
        if (c.groundedTime >= REST_TIME_BEFORE_DESPAWN || c.totalLife >= HARD_LIFE_CAP) {
          this.removeAt(i);
        }
        continue;
      }

      c.velocity.y += GRAVITY * delta;
      if (c.collisionDelay > 0) c.collisionDelay -= delta;

      const collider = this.worldCollider;
      const stepX = c.velocity.x * delta;
      const stepY = c.velocity.y * delta;
      const stepZ = c.velocity.z * delta;
      let blockedAxes = 0;
      if (collider && c.collisionDelay <= 0) {
        // Substepped probes (parity with DebrisSim) — fast debris must not
        // tunnel through slabs thinner than its per-frame step.
        let k = stepX > COLLISION_SUBSTEP || stepX < -COLLISION_SUBSTEP
          ? Math.ceil(Math.abs(stepX) / COLLISION_SUBSTEP) : 1;
        let inc = stepX / k;
        for (; k > 0; k--) {
          const trial = c.position.x + inc;
          if (collider.isOccupied(trial, c.position.y, c.position.z)) {
            c.velocity.x *= -0.35;
            blockedAxes++;
            break;
          }
          c.position.x = trial;
        }
        k = stepY > COLLISION_SUBSTEP || stepY < -COLLISION_SUBSTEP
          ? Math.ceil(Math.abs(stepY) / COLLISION_SUBSTEP) : 1;
        inc = stepY / k;
        for (; k > 0; k--) {
          const trial = c.position.y + inc;
          if (collider.isOccupied(c.position.x, trial, c.position.z)) {
            c.velocity.y *= -0.35;
            blockedAxes++;
            break;
          }
          c.position.y = trial;
        }
        k = stepZ > COLLISION_SUBSTEP || stepZ < -COLLISION_SUBSTEP
          ? Math.ceil(Math.abs(stepZ) / COLLISION_SUBSTEP) : 1;
        inc = stepZ / k;
        for (; k > 0; k--) {
          const trial = c.position.z + inc;
          if (collider.isOccupied(c.position.x, c.position.y, trial)) {
            c.velocity.z *= -0.35;
            blockedAxes++;
            break;
          }
          c.position.z = trial;
        }
      } else {
        c.position.x += stepX;
        c.position.y += stepY;
        c.position.z += stepZ;
      }

      // Wedged-in-walls detection — fully blocked frame by frame for
      // STUCK_TIMEOUT seconds means the chunk can't slide out and damping
      // has killed its velocity. Despawn so it doesn't sit visually
      // overlapping an alive cell forever.
      if (blockedAxes >= 3) {
        c.stuckTime += delta;
        if (c.stuckTime >= STUCK_TIMEOUT) {
          this.removeAt(i);
          continue;
        }
      } else {
        c.stuckTime = 0;
      }
      // Quaternion integration: q ← normalize(q + ½·dt·(ω ⊗ q)), ω in
      // world frame — no trigonometry, unlike Euler + setFromEuler.
      {
        const q = c.quaternion;
        const wx = c.angularVelocity.x * 0.5 * delta;
        const wy = c.angularVelocity.y * 0.5 * delta;
        const wz = c.angularVelocity.z * 0.5 * delta;
        const dx = wx * q.w + wy * q.z - wz * q.y;
        const dy = wy * q.w - wx * q.z + wz * q.x;
        const dz = wz * q.w + wx * q.y - wy * q.x;
        const dw = -wx * q.x - wy * q.y - wz * q.z;
        q.set(q.x + dx, q.y + dy, q.z + dz, q.w + dw).normalize();
      }

      // Masonry ground response: near-dead restitution (one small skip,
      // then slide) with strong friction — concrete debris doesn't bounce.
      const restY = 0.15 + c.scale * 0.5;
      if (c.position.y < restY) {
        c.position.y = restY;
        c.velocity.y *= -0.15;
        c.velocity.x *= 0.62;
        c.velocity.z *= 0.62;
        c.angularVelocity.multiplyScalar(0.6);
      }

      // Supported = lying on the ground OR sitting on top of an occupied
      // cell (building ledge / rubble pile) — piles need chunks to rest
      // mid-air on other settled debris, not only at ground level.
      const onGround = c.position.y <= restY + 0.05;
      const onPile = !onGround
        && collider !== null
        && c.collisionDelay <= 0
        && collider.isOccupied(c.position.x, c.position.y - c.scale * 0.6, c.position.z);
      const slow = c.velocity.lengthSq() < REST_VELOCITY_THRESHOLD_SQ
        && c.angularVelocity.lengthSq() < REST_ANGVEL_THRESHOLD_SQ;

      if ((onGround || onPile) && slow) {
        // Pile spill (parity with DebrisSim): perched on debris — roll
        // downhill toward a free lower neighbor before settling.
        if (onPile && !onGround && c.rollsLeft > 0 && collider) {
          const s = Math.max(0.18, c.scale * 1.2);
          const start = (Math.random() * 4) | 0;
          let rolled = false;
          for (let d = 0; d < 4 && !rolled; d++) {
            const dir = (start + d) & 3;
            const dx = dir === 0 ? 1 : dir === 1 ? -1 : 0;
            const dz = dir === 2 ? 1 : dir === 3 ? -1 : 0;
            const nx = c.position.x + dx * s;
            const nz = c.position.z + dz * s;
            if (
              !collider.isOccupied(nx, c.position.y, nz)
              && !collider.isOccupied(nx, c.position.y - s, nz)
            ) {
              const speed = SPILL_SPEED * (0.8 + Math.random() * 0.5);
              c.velocity.x = dx * speed;
              c.velocity.z = dz * speed;
              c.velocity.y = 0.4;
              c.angularVelocity.x = (Math.random() - 0.5) * 6;
              c.angularVelocity.z = (Math.random() - 0.5) * 6;
              c.rollsLeft--;
              rolled = true;
            }
          }
          if (rolled) {
            this.tmpScaleVec.set(c.scale, c.scale, c.scale);
            this.tmpMatrix.compose(c.position, c.quaternion, this.tmpScaleVec);
            this.instances.setMatrixAt(c.slot, this.tmpMatrix);
            this.markSlotDirty(c.slot);
            continue;
          }
        }
        if (this.sink && this.sink.settle(c.position, c.scale, c.color)) {
          // Handed over to the rubble pile — free the slot immediately so
          // the pool stays available for the next explosion.
          this.removeAt(i);
          continue;
        }
        // No sink (boss mode) or outside its grid — old timed-despawn rest.
        c.atRest = true;
        c.velocity.set(0, 0, 0);
        c.angularVelocity.set(0, 0, 0);
        c.groundedTime = delta;
      } else {
        c.groundedTime = 0;
      }

      if (c.totalLife >= HARD_LIFE_CAP) {
        // Safety net against absurd states. With a sink bound the chunk is
        // parked into the pile (settle drops it down its own column);
        // without one it vanishes as before.
        this.sink?.settle(c.position, c.scale, c.color);
        this.removeAt(i);
        continue;
      }

      this.tmpScaleVec.set(c.scale, c.scale, c.scale);
      this.tmpMatrix.compose(c.position, c.quaternion, this.tmpScaleVec);
      this.instances.setMatrixAt(c.slot, this.tmpMatrix);
      this.markSlotDirty(c.slot);
    }

    this.flushDirty();
  }

  /**
   * Chunk-vs-chunk collision pass (sphere approximation, equal masses).
   * Runs on previous-frame positions just before integration: a spatial
   * hash buckets the in-flight chunks, each pair within contact distance
   * gets positional separation plus a restitution impulse along the
   * contact normal. Chunks still inside their spawn grace period are
   * skipped — the initial crater cloud overlaps heavily by construction
   * and resolving it would detonate like popcorn.
   */
  private collidePairs(): void {
    const n = this.active.length;
    if (n < 2) return;
    const heads = this.hashHeads;
    const keys = this.hashKeys;
    const next = this.nextInCell;
    heads.fill(-1);
    const inv = 1 / PAIR_HASH_CELL;

    // Insert phase — open addressing with linear probing, chunks in the
    // same cell chained through nextInCell.
    for (let i = 0; i < n; i++) {
      const c = this.active[i]!;
      if (c.atRest || c.collisionDelay > 0) continue;
      const key = hashCell(
        Math.floor(c.position.x * inv),
        Math.floor(c.position.y * inv),
        Math.floor(c.position.z * inv),
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

    // Query phase — 27 neighbor cells, resolve each pair once (j > i).
    for (let i = 0; i < n; i++) {
      const a = this.active[i]!;
      if (a.atRest || a.collisionDelay > 0) continue;
      const cx = Math.floor(a.position.x * inv);
      const cy = Math.floor(a.position.y * inv);
      const cz = Math.floor(a.position.z * inv);
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          for (let dz = -1; dz <= 1; dz++) {
            const key = hashCell(cx + dx, cy + dy, cz + dz);
            let slot = key & PAIR_HASH_MASK;
            for (;;) {
              const head = heads[slot]!;
              if (head === -1) break; // empty slot → cell absent
              if (keys[slot] === key) {
                for (let j = head; j !== -1; j = next[j]!) {
                  if (j > i) this.resolvePair(a, this.active[j]!);
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

  private resolvePair(a: ActiveChunk, b: ActiveChunk): void {
    const minDist = (a.scale + b.scale) * PAIR_RADIUS_RATIO;
    const dx = b.position.x - a.position.x;
    const dy = b.position.y - a.position.y;
    const dz = b.position.z - a.position.z;
    const distSq = dx * dx + dy * dy + dz * dz;
    if (distSq >= minDist * minDist || distSq < 1e-8) return;
    const dist = Math.sqrt(distSq);
    const nx = dx / dist;
    const ny = dy / dist;
    const nz = dz / dist;

    const half = (minDist - dist) * 0.5;
    a.position.x -= nx * half;
    a.position.y -= ny * half;
    a.position.z -= nz * half;
    b.position.x += nx * half;
    b.position.y += ny * half;
    b.position.z += nz * half;

    const vn = (b.velocity.x - a.velocity.x) * nx
      + (b.velocity.y - a.velocity.y) * ny
      + (b.velocity.z - a.velocity.z) * nz;
    if (vn >= 0) return; // already separating
    const imp = -(1 + PAIR_RESTITUTION) * vn * 0.5;
    a.velocity.x -= nx * imp;
    a.velocity.y -= ny * imp;
    a.velocity.z -= nz * imp;
    b.velocity.x += nx * imp;
    b.velocity.y += ny * imp;
    b.velocity.z += nz * imp;
  }

  clear(): void {
    for (const c of this.active) {
      this.chunkPool.push(c);
    }
    this.active.length = 0;
    this.instances.count = 0;
    this.flushDirty();
  }

  dispose(): void {
    this.clear();
    this.scene.remove(this.instances);
    this.instances.dispose();
    this.geom.dispose();
    this.material.dispose();
  }

  private markSlotDirty(slot: number): void {
    if (this.dirtyMin === -1) {
      this.dirtyMin = slot;
      this.dirtyMax = slot;
    } else {
      if (slot < this.dirtyMin) this.dirtyMin = slot;
      if (slot > this.dirtyMax) this.dirtyMax = slot;
    }
  }

  private flushDirty(): void {
    if (this.dirtyMin === -1) return;
    const attr = this.instances.instanceMatrix;
    attr.clearUpdateRanges();
    attr.addUpdateRange(this.dirtyMin * 16, (this.dirtyMax - this.dirtyMin + 1) * 16);
    attr.needsUpdate = true;
    if (this.colorDirty && this.instances.instanceColor) {
      const cattr = this.instances.instanceColor;
      cattr.clearUpdateRanges();
      cattr.addUpdateRange(this.dirtyMin * 3, (this.dirtyMax - this.dirtyMin + 1) * 3);
      cattr.needsUpdate = true;
      this.colorDirty = false;
    }
    this.dirtyMin = -1;
    this.dirtyMax = -1;
  }
}

/** Integer-lattice hash for the pair-collision broadphase. Collisions just
 *  produce false-positive pairs that the narrow distance check rejects. */
function hashCell(x: number, y: number, z: number): number {
  return ((x * 73856093) ^ (y * 19349663) ^ (z * 83492791)) | 0;
}

/**
 * Shared scratch for debris payload arrays. Every consumer of
 * DestroyedBlock[] (FlyingChunks.spawn, assertions in tests) reads the data
 * synchronously, so the pooled objects can be reused as soon as the
 * consuming call returns. Producers call begin() (resets the view), add()
 * per block, and hand the returned array straight to the consumer.
 *
 * CONTRACT: the returned array and its blocks are INVALIDATED by the next
 * begin() — never store them across frames or interleave two producers.
 */
export class DebrisScratch {
  private readonly pool: DestroyedBlock[] = [];
  private readonly view: DestroyedBlock[] = [];
  private used = 0;

  begin(): DestroyedBlock[] {
    this.view.length = 0;
    this.used = 0;
    return this.view;
  }

  add(x: number, y: number, z: number, color: number, size: number): void {
    let b = this.pool[this.used];
    if (!b) {
      b = { worldPosition: new THREE.Vector3(), color: 0, size: 0 };
      this.pool[this.used] = b;
    }
    this.used++;
    b.worldPosition.set(x, y, z);
    b.color = color;
    b.size = size;
    this.view.push(b);
  }
}

/** Module-wide scratch — safe because producers never nest (spawn() and
 *  settle() don't call back into producers). */
export const debrisScratch = new DebrisScratch();

/** Fresh pooled chunk record — fields are overwritten on every (re)spawn. */
function makeChunkRecord(): ActiveChunk {
  return {
    slot: 0,
    position: new THREE.Vector3(),
    velocity: new THREE.Vector3(),
    quaternion: new THREE.Quaternion(),
    angularVelocity: new THREE.Vector3(),
    scale: 1,
    color: 0xffffff,
    groundedTime: 0,
    totalLife: 0,
    collisionDelay: 0,
    stuckTime: 0,
    rollsLeft: 0,
    atRest: false,
  };
}

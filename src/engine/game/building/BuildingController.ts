import * as THREE from 'three';
import type { Building } from './Building';
import type { DebrisField } from '../boss/FlyingChunks';
import type { HitEffects } from '../vfx/HitEffects';
import type { BigChunks, BigChunkBlock } from './BigChunks';
import { Integrity } from './Integrity';
import { jitterDebrisColor, GLASS_FLAG } from './BuildingCluster';

/**
 * Orchestrates building destruction:
 *   rocket impact → blocks within radius → FlyingChunks (debris)
 *               → integrity propagation
 *               → connected components of orphaned blocks
 *                  → small components → FlyingChunks
 *                  → big components → BigChunks (rigid sections that
 *                                     fall as one piece, shatter on
 *                                     ground impact)
 */

/** Components at or above this size become BigChunks (single rigid piece).
 *  Scaled to the 0.2625m block (×2.37 block count per volume vs 0.35m).
 *  560 sent almost every torn-off wall/roof patch down the FlyingChunks
 *  path — a detached piece DISSOLVED into confetti instead of falling as
 *  a slab; 180 keeps anything bigger than ~a door panel rigid (must stay
 *  ≥ MIN_VIABLE_CHUNK in BigChunks or the section flushes right back). */
const BIG_CHUNK_THRESHOLD = 180;
/** Fraction of blast-destroyed blocks that spawn visible debris. Interior
 *  blocks of a fine-grained crater just vanish (Teardown's trick) — at
 *  0.2625m blocks a rocket crater is 10–20k voxels while the debris pool
 *  holds 8k, so spawning all of them only churns the pool. */
const BLAST_DEBRIS_DENSITY = 0.55;
/** Minimum spacing between ground-connectivity sweeps (they're O(alive)). */
const SWEEP_INTERVAL = 0.2;
/** BFS cell budget per frame for the time-sliced connectivity sweep. */
const SWEEP_CELLS_PER_FRAME = 150_000;
/** Max rigid sections created per frame (each is an InstancedMesh). */
const SECTION_SPAWNS_PER_FRAME = 8;
/** Upper bound on a single rigid section. A whole detached tower top as
 *  ONE BigChunk falls like a monolith and reads as fake — masses above
 *  this split spatially into several segments that separate in the air.
 *  6000 was so permissive that whole multi-floor slabs (with windows)
 *  tumbled as one plate; 1200 makes a big collapse break into ~5 pieces
 *  that visibly come apart mid-air. */
const MAX_SECTION_BLOCKS = 1200;
/** Max grid-space extent (cells) of a rigid section on ANY axis. Block count
 *  alone let a tall thin facade strip spawn as one vertical sliver; this caps
 *  shape too, so elongated pieces get split into ~cubic chunks. */
const MAX_SECTION_DIM = 28;
/** Shockwave shatters GLASS well past the crater — panes rain down in a
 *  radius this multiple of the blast radius (demolition-footage classic). */
const GLASS_SHOCK_MULT = 2.1;

export class BuildingController {
  readonly integrity: Integrity;
  private readonly idxBuf: number[] = [];
  private readonly glassBuf: number[] = [];
  private readonly sweepBuf: number[] = [];
  private sweepPending = false;
  private sweepActive = false;
  private sweepCooldown = 0;
  private sweepBudget = SWEEP_CELLS_PER_FRAME;
  private sectionCap = Infinity;
  /** When bound, sweeps run on the sweep worker (full burst off-thread)
   *  instead of the time-sliced main-thread path. */
  private sweepRequest: (() => void) | null = null;
  private workerSweepInFlight = false;
  /** Last explosion point — sweep-detached sections topple TOWARD it,
   *  like a trunk falling into the axe notch. */
  private lastBlast: THREE.Vector3 | null = null;
  private compMark: Uint8Array | null = null;
  private readonly compQueue: number[] = [];
  /** Sections waiting to spawn — creating hundreds of InstancedMeshes in
   *  one frame is a guaranteed hitch, so a per-frame budget drains this. */
  private readonly pendingSections: { component: number[]; point: THREE.Vector3 }[] = [];
  private readonly tmpVec = new THREE.Vector3();
  private readonly tmpVec2 = new THREE.Vector3();

  constructor(
    private readonly building: Building,
    private readonly flyingChunks: DebrisField,
    private readonly bigChunks: BigChunks,
    private readonly hitFx: HitEffects,
  ) {
    this.integrity = new Integrity(building.cluster);
  }

  /**
   * Lightweight carve for the drivable car boring through a building. Removes
   * the voxels in the radius and throws them as cheap worker debris, then ARMS
   * the deferred ground-connectivity sweep — but skips the synchronous
   * integrity cascade and glass shockwave. That cascade (run every frame, ×N
   * carve samples) spawned a BigChunks storm + full re-solve each frame, which
   * was the "driving through a building" FPS hitch. The car punches a clean
   * tunnel; the unsupported mass above sheds a beat later through the budgeted
   * sweep (cooldown-gated, off-thread when the worker is up) instead. */
  carveBore(point: THREE.Vector3, radius: number, blastDir?: THREE.Vector3, debrisSpeed = 8): number {
    (this.lastBlast ??= new THREE.Vector3()).copy(point);
    const cluster = this.building.cluster;
    cluster.findIndicesInRadius(point, radius, this.idxBuf);
    const destroyed = cluster.destroyByIndices(this.idxBuf);
    if (destroyed.length === 0) return 0;
    this.flyingChunks.spawn(destroyed, point, debrisSpeed, blastDir);
    this.integrity.markDestroyed(this.idxBuf); // cheap flag sync, no cascade
    this.sweepPending = true; // deferred sweep collapses the rest, budgeted
    return destroyed.length;
  }

  /** Gravity-orb suck: the cells themselves vanish into the vortex (no debris of
   *  their own — that's the orb's VFX), but the building must still COLLAPSE.
   *  Flag the cells in the integrity solver + arm the deferred ground sweep, so
   *  the undermined mass above sheds like every other weapon (carveBore-style:
   *  no per-frame synchronous cascade, so a continuously-sucking orb won't hitch). */
  suckCells(idx: number[]): void {
    if (idx.length === 0) return;
    const cluster = this.building.cluster;
    cluster.killBlocks(idx);
    cluster.hideBlocks(idx);
    this.integrity.markDestroyed(idx);
    this.sweepPending = true;
    this.building.updateShadow();
  }

  /** Arm the deferred connectivity sweep without an index list (orbit-grind
   *  punches remove voxels by world point) — the sweep still detaches floaters. */
  armSweep(): void { this.sweepPending = true; }

  /** Returns the number of blocks DIRECTLY destroyed by the blast radius
   *  (cascade losses excluded — falling sections brake against the mass
   *  they smash, not against the secondary collapses they trigger). */
  applyExplosion(point: THREE.Vector3, radius: number, blastDir?: THREE.Vector3): number {
    (this.lastBlast ??= new THREE.Vector3()).copy(point);
    const cluster = this.building.cluster;
    cluster.findIndicesInRadius(point, radius, this.idxBuf);
    const destroyed = cluster.destroyByIndices(this.idxBuf);
    if (destroyed.length === 0) return 0;
    const smashed = destroyed.length;

    const debris = BLAST_DEBRIS_DENSITY < 1 && destroyed.length > 4000
      ? destroyed.filter(() => Math.random() < BLAST_DEBRIS_DENSITY)
      : destroyed;
    // 8 (was 10): blast debris was leaving the crater like a fountain —
    // gravity should dominate right after the burst, not the launch speed.
    this.flyingChunks.spawn(debris, point, 8, blastDir);
    this.hitFx.burst(point, 0xffaa44, 20);

    this.cascadeFrom(this.idxBuf, point);

    // Shockwave: glass panes shatter well past the crater — fine shards
    // raining off the facade after every blast. Glass carries no load, so
    // no extra cascade; the scheduled sweep catches any stragglers.
    cluster.findIndicesInRadius(point, radius * GLASS_SHOCK_MULT, this.glassBuf);
    let g = 0;
    for (let i = 0; i < this.glassBuf.length; i++) {
      const idx = this.glassBuf[i]!;
      if ((cluster.blocks[idx]!.color & GLASS_FLAG) !== 0) {
        this.glassBuf[g++] = idx;
      }
    }
    if (g > 0) {
      this.glassBuf.length = g;
      const shards = cluster.destroyByIndices(this.glassBuf);
      this.flyingChunks.spawn(shards, point, 5, blastDir);
    }

    // Schedule the ground-connectivity authority sweep — the incremental
    // solver is fast but can miss; the sweep guarantees nothing floats.
    this.sweepPending = true;
    this.building.updateShadow();
    return smashed;
  }

  /**
   * Cascade waves: destroying one wave of orphans can invalidate the
   * lateral slab tie (alive-neighbor based) of the next, so feed each
   * wave's deaths back into the integrity solver until it runs dry.
   * `justDestroyed` must already be dead in the cluster.
   */
  private cascadeFrom(justDestroyed: number[], point: THREE.Vector3): void {
    const cluster = this.building.cluster;
    let wave = this.integrity.applyDestruction(justDestroyed);
    while (wave.length > 0) {
      // Flags-only kill — sections keep drawing as ghosts on the tower
      // until their rigid piece spawns from the queue (hiding at detach
      // made the tower top vanish and "rebuild from the bottom"). Debris
      // components hide immediately since their chunks fly the same frame.
      cluster.killBlocks(wave);
      const components = this.findConnectedComponents(wave);
      for (const component of components) {
        if (component.length >= BIG_CHUNK_THRESHOLD) {
          this.spawnBigChunk(component, point);
        } else {
          cluster.hideBlocks(component);
          // Cascade debris doesn't have a clean blast direction; let it
          // scatter naturally without the inward-component clip.
          this.flyingChunks.spawn(cluster.makeDestroyedBlocks(component), point, 6);
        }
      }
      wave = this.integrity.applyDestruction(wave);
    }
  }

  /**
   * Deferred per-frame tick. Runs the ground-connectivity sweep (Teardown
   * pattern: anything not flood-fill-reachable from the ground detaches)
   * at most every SWEEP_INTERVAL after a destruction event — this is the
   * authority that guarantees no floating islands survive, whatever the
   * incremental solver missed.
   */
  /** Adaptive quality: per-frame cell budget for the connectivity sweep. */
  setSweepBudget(n: number): void {
    this.sweepBudget = n;
  }

  /** Cap on BigChunk section spawns per frame (Infinity = no cap). Lowered
   *  while driving so car-triggered collapses spread over more frames. */
  setSectionCap(n: number): void {
    this.sectionCap = n;
  }

  /** True while a structural sweep is queued or in flight — the city
   *  splits the global sweep budget across busy buildings only. */
  sweepBusy(): boolean {
    return this.sweepActive || this.sweepPending || this.workerSweepInFlight;
  }

  /** Bind the sweep worker: update() requests full off-thread sweeps and
   *  results come back through applySweepResult(). */
  attachSweepWorker(request: () => void): void {
    this.sweepRequest = request;
  }

  /** Worker sweep result. The snapshot may be a beat stale against
   *  ongoing destruction — filter to still-alive cells; missed floaters
   *  get caught by the next sweep (destruction events re-arm it). */
  applySweepResult(detached: ArrayLike<number>, crushed: boolean): void {
    this.workerSweepInFlight = false;
    if (crushed) this.sweepPending = true;
    const cluster = this.building.cluster;
    this.sweepBuf.length = 0;
    for (let i = 0; i < detached.length; i++) {
      const idx = detached[i]!;
      if (cluster.isAlive(idx)) this.sweepBuf.push(idx);
    }
    this.processDetached(this.sweepBuf);
  }

  update(delta: number): void {
    const cluster = this.building.cluster;
    // Drain queued sections — ghosts may wait a few FRAMES, never seconds:
    // a long-waiting ghost mass reads as a frozen tower shedding pieces
    // from nowhere. The ramp under pressure stays MODEST so a whole-tower
    // collapse spreads its section spawns over a handful more frames (flatter
    // FPS spike) instead of dumping 30+ BigChunks in a single frame.
    const queued = this.pendingSections.length;
    let budget = queued > 240 ? 18 : queued > 100 ? 12 : SECTION_SPAWNS_PER_FRAME;
    // While driving, dribble sections out a few per frame so a building the car
    // undermined sheds gradually (flatter upload/sim cost) instead of dumping a
    // whole collapse in one frame right behind the chase camera.
    if (this.sectionCap < budget) budget = this.sectionCap;
    let spawned = 0;
    while (this.pendingSections.length > 0 && spawned < budget) {
      const s = this.pendingSections.shift()!;
      this.spawnSection(s.component, s.point);
      spawned++;
    }
    // Worker path: request a full off-thread sweep; the result lands via
    // applySweepResult() whenever the worker finishes.
    if (this.sweepRequest) {
      if (this.sweepCooldown > 0) this.sweepCooldown -= delta;
      if (!this.sweepPending || this.sweepCooldown > 0 || this.workerSweepInFlight) return;
      this.sweepPending = false;
      this.sweepCooldown = SWEEP_INTERVAL;
      this.workerSweepInFlight = true;
      this.sweepRequest();
      return;
    }
    // Main-thread fallback: a sweep in progress advances by a fixed cell
    // budget per frame — ~1M-cell worst case spreads over a handful of
    // frames instead of one long hitch. Result is identical, just later.
    if (this.sweepActive) {
      if (cluster.stepDisconnectSweep(this.sweepBudget)) {
        this.sweepActive = false;
        this.sweepFloaters();
      }
      return;
    }
    if (this.sweepCooldown > 0) this.sweepCooldown -= delta;
    if (!this.sweepPending || this.sweepCooldown > 0) return;
    this.sweepPending = false;
    this.sweepCooldown = SWEEP_INTERVAL;
    this.sweepActive = true;
    cluster.beginDisconnectSweep();
  }

  private sweepFloaters(): void {
    const cluster = this.building.cluster;
    const disconnected = cluster.finishDisconnectSweep(this.sweepBuf);
    // Crushed supports invalidate everything they carried — re-arm a
    // follow-up sweep (the mass above only becomes unreachable AFTER these
    // cells are gone). Pier crumbles this beat, tower topples the next.
    if (cluster.lastSweepHadCrush()) this.sweepPending = true;
    this.processDetached(disconnected);
  }

  /** Shared tail of both sweep paths: kill the detached set and hand its
   *  connected components to sections/debris. */
  private processDetached(disconnected: number[]): void {
    const cluster = this.building.cluster;
    if (disconnected.length === 0) return;
    cluster.killBlocks(disconnected);
    const components = this.findConnectedComponents(disconnected);
    for (const component of components) {
      cluster.getWorldPosition(component[0]!, this.tmpVec);
      if (component.length >= BIG_CHUNK_THRESHOLD) {
        // Sections detached by the structural sweep hinge over toward the
        // cut that severed them (tree-fall) — the last blast point is the
        // notch; without one they fall from their own centroid (random
        // drift, no topple).
        this.spawnBigChunk(component, this.lastBlast ?? this.tmpVec.clone());
      } else {
        cluster.hideBlocks(component);
        this.flyingChunks.spawn(cluster.makeDestroyedBlocks(component), this.tmpVec, 2);
      }
    }
    // Keep the incremental solver's flags in sync with the removals and
    // let any follow-up cantilever failures cascade normally.
    this.cascadeFrom(disconnected, this.tmpVec);
    this.building.updateShadow();
  }

  /**
   * Disintegrator beam: VAPORIZE the given voxels — no debris (the matter
   * is gone), but the structural model still reacts: cohesionless crumbs
   * drop instantly and the deferred span sweep re-checks grounding, so
   * drilling through columns/walls with the beam fells what they carried.
   */
  disintegrateBlocks(indices: number[], point: THREE.Vector3): void {
    if (indices.length === 0) return;
    // The beam cut is the "axe notch" — sweep-detached masses topple here.
    (this.lastBlast ??= new THREE.Vector3()).copy(point);
    const cluster = this.building.cluster;
    cluster.killBlocks(indices);
    cluster.hideBlocks(indices);
    this.cascadeFrom(indices, point);
    this.sweepPending = true;
    this.building.updateShadow();
  }

  isDestroyed(): boolean {
    return this.building.isDestroyed();
  }

  damageRatio(): number {
    return this.building.damageRatio();
  }

  /**
   * Group orphan indices into connected components via BFS using 6-neighbor
   * adjacency, restricted to the orphan set. Component order in the result
   * is unspecified. Typed-array marks instead of Sets — a full-building
   * collapse hands over hundreds of thousands of orphans and Set hashing
   * was the single hottest spot in the collapse frame.
   */
  private findConnectedComponents(orphans: number[]): number[][] {
    const cluster = this.building.cluster;
    const total = cluster.totalCount();
    if (!this.compMark || this.compMark.length !== total) {
      this.compMark = new Uint8Array(total);
    }
    const mark = this.compMark; // 0 = outside wave, 1 = unvisited, 2 = visited
    for (const idx of orphans) mark[idx] = 1;
    const components: number[][] = [];
    const queue = this.compQueue;
    for (const startIdx of orphans) {
      if (mark[startIdx] !== 1) continue;
      const component: number[] = [];
      queue.length = 0;
      queue.push(startIdx);
      mark[startIdx] = 2;
      while (queue.length > 0) {
        const idx = queue.pop()!;
        component.push(idx);
        const b = cluster.blocks[idx]!;
        let n = cluster.indexAtFast(b.gx + 1, b.gy, b.gz);
        if (n >= 0 && mark[n] === 1) { mark[n] = 2; queue.push(n); }
        n = cluster.indexAtFast(b.gx - 1, b.gy, b.gz);
        if (n >= 0 && mark[n] === 1) { mark[n] = 2; queue.push(n); }
        n = cluster.indexAtFast(b.gx, b.gy + 1, b.gz);
        if (n >= 0 && mark[n] === 1) { mark[n] = 2; queue.push(n); }
        n = cluster.indexAtFast(b.gx, b.gy - 1, b.gz);
        if (n >= 0 && mark[n] === 1) { mark[n] = 2; queue.push(n); }
        n = cluster.indexAtFast(b.gx, b.gy, b.gz + 1);
        if (n >= 0 && mark[n] === 1) { mark[n] = 2; queue.push(n); }
        n = cluster.indexAtFast(b.gx, b.gy, b.gz - 1);
        if (n >= 0 && mark[n] === 1) { mark[n] = 2; queue.push(n); }
      }
      components.push(component);
    }
    for (const idx of orphans) mark[idx] = 0;
    return components;
  }

  /**
   * Spawn a detached component as rigid section(s). Oversized components
   * are split spatially first — several segments separating mid-air is the
   * "rozsypywanie się" silhouette a giant single slab can't produce.
   */
  private spawnBigChunk(component: number[], impactPoint: THREE.Vector3): void {
    const cluster = this.building.cluster;
    const parts: number[][] = [];
    const stack: number[][] = [component];
    while (stack.length > 0) {
      const part = stack.pop()!;
      // Grid-space extent of the part.
      let minX = Infinity;
      let maxX = -Infinity;
      let minY = Infinity;
      let maxY = -Infinity;
      let minZ = Infinity;
      let maxZ = -Infinity;
      for (const idx of part) {
        const b = cluster.blocks[idx]!;
        if (b.gx < minX) minX = b.gx;
        if (b.gx > maxX) maxX = b.gx;
        if (b.gy < minY) minY = b.gy;
        if (b.gy > maxY) maxY = b.gy;
        if (b.gz < minZ) minZ = b.gz;
        if (b.gz > maxZ) maxZ = b.gz;
      }
      const ex = maxX - minX;
      const ey = maxY - minY;
      const ez = maxZ - minZ;
      // Keep when both small enough in COUNT and in SHAPE. The extent cap
      // stops a tall thin facade strip (<1200 blocks but 200 cells tall) from
      // spawning as one vertical sliver — it gets halved down the long axis
      // into ~cubic chunks that visibly separate mid-air.
      if (part.length <= MAX_SECTION_BLOCKS
        && Math.max(ex, ey, ez) <= MAX_SECTION_DIM) {
        parts.push(part);
        continue;
      }
      // Halve along the longest grid-space extent.
      const axis: 'gx' | 'gy' | 'gz' = ex >= ey && ex >= ez ? 'gx' : ey >= ez ? 'gy' : 'gz';
      part.sort((a, b) => cluster.blocks[a]![axis] - cluster.blocks[b]![axis]);
      const mid = part.length >> 1;
      stack.push(part.slice(0, mid), part.slice(mid));
    }
    // Lowest parts first — a mega-collapse drains the queue over several
    // frames and bottom-up ordering reads as the structure giving way.
    parts.sort((a, b) => cluster.blocks[a[0]!]!.gy - cluster.blocks[b[0]!]!.gy);
    const point = impactPoint.clone();
    for (const p of parts) this.pendingSections.push({ component: p, point });
  }

  /**
   * Build the centroid-relative block list for a component and hand it to
   * the BigChunks system as a single rigid piece.
   */
  private spawnSection(component: number[], impactPoint: THREE.Vector3): void {
    const cluster = this.building.cluster;
    // Seamless hand-off: the ghost blocks disappear from the tower on the
    // exact frame the rigid section appears in their place.
    cluster.hideBlocks(component);
    const blockSize = this.building.config.blockSize;
    const innerSize = blockSize * 0.98;

    // Compute centroid of all blocks in component.
    let sumX = 0;
    let sumY = 0;
    let sumZ = 0;
    for (const idx of component) {
      cluster.getWorldPosition(idx, this.tmpVec);
      sumX += this.tmpVec.x;
      sumY += this.tmpVec.y;
      sumZ += this.tmpVec.z;
    }
    const inv = 1 / component.length;
    const centroid = new THREE.Vector3(sumX * inv, sumY * inv, sumZ * inv);

    // Build per-block local-space positions relative to centroid.
    const blocks: BigChunkBlock[] = component.map((idx) => {
      cluster.getWorldPosition(idx, this.tmpVec2);
      const localPos = new THREE.Vector3(
        this.tmpVec2.x - centroid.x,
        this.tmpVec2.y - centroid.y,
        this.tmpVec2.z - centroid.z,
      );
      const b = cluster.blocks[idx]!;
      return { localPos, color: jitterDebrisColor(b.color), size: innerSize };
    });

    this.bigChunks.spawn(blocks, centroid, impactPoint);
  }

  /**
   * Harpoon tear: rip a coherent chunk of wall (a sphere of alive blocks) off
   * the building. When `spawnFalling` is true (the default, and what the remote
   * peer replays) it becomes a rigid falling BigChunk that settles/shatters into
   * rubble on the ground. When false the caller keeps the returned block data to
   * build a DRAGGABLE chunk instead (durable, towed by the car). Either way the
   * void it leaves lets the mass above cascade. Returns the torn blocks (local to
   * `centroid`) so the car code can spawn a DragChunk, or null if nothing tore.
   */
  tearChunk(
    point: THREE.Vector3,
    radius: number,
    pullDir: THREE.Vector3,
    speed: number,
    spawnFalling = true,
  ): { count: number; blocks: BigChunkBlock[]; centroid: THREE.Vector3 } | null {
    const cluster = this.building.cluster;
    const all = cluster.findIndicesInRadius(point, radius, []);
    if (all.length === 0) return null;
    // RAGGED, IRREGULAR edge: keep the core, but near the sphere boundary drop
    // blocks by a deterministic per-block hash. The result isn't a clean ball —
    // it follows the building's own material (hit a corner → the corner tears
    // off), and the same hash on both peers keeps co-op consistent.
    const r2 = radius * radius;
    const idx: number[] = [];
    for (const i of all) {
      cluster.getWorldPosition(i, this.tmpVec);
      const t = this.tmpVec.distanceToSquared(point) / r2; // 0 core .. 1 rim
      if (t > 0.45) {
        const h = ((Math.imul(i, 2654435761) >>> 8) & 1023) / 1023; // deterministic 0..1
        if (h < (t - 0.45) / 0.55) continue; // more likely dropped toward the rim
      }
      idx.push(i);
    }
    if (idx.length === 0) return null;
    const count = idx.length;
    cluster.killBlocks(idx);
    cluster.hideBlocks(idx);
    const innerSize = this.building.config.blockSize * 0.98;
    let sumX = 0; let sumY = 0; let sumZ = 0;
    for (const i of idx) {
      cluster.getWorldPosition(i, this.tmpVec);
      sumX += this.tmpVec.x; sumY += this.tmpVec.y; sumZ += this.tmpVec.z;
    }
    const inv = 1 / count;
    const centroid = new THREE.Vector3(sumX * inv, sumY * inv, sumZ * inv);
    const blocks: BigChunkBlock[] = idx.map((i) => {
      cluster.getWorldPosition(i, this.tmpVec2);
      const b = cluster.blocks[i]!;
      return {
        localPos: new THREE.Vector3(this.tmpVec2.x - centroid.x, this.tmpVec2.y - centroid.y, this.tmpVec2.z - centroid.z),
        color: jitterDebrisColor(b.color),
        size: innerSize,
      };
    });
    if (spawnFalling) {
      const velocity = new THREE.Vector3(pullDir.x * speed, 2 + speed * 0.25, pullDir.z * speed);
      this.bigChunks.spawnPulled(blocks, centroid, velocity);
    }
    this.cascadeFrom(idx, point);
    this.building.updateShadow();
    return { count, blocks, centroid };
  }
}

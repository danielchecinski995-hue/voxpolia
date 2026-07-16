import * as THREE from 'three';
import { debrisScratch, setDebrisColor } from '../boss/FlyingChunks';
import type { DebrisField, VoxelCollider, DebrisSink } from '../boss/FlyingChunks';
import type { DestroyedBlock } from '../boss/VoxelCluster';

/**
 * Large detached building sections that fall as a single rigid body and
 * SHATTER INSTANTLY on hard impact — fracture is an impulse-thresholded,
 * single-frame event (the pattern every shipped destruction system uses:
 * Smash Hit, Teardown, three.js ammo_break). Debris inherits the parent's
 * velocity so the burst carries the section's momentum outward.
 *
 * Per-frame:
 *   - integrate gravity + rotation (full free-fall, no damping in flight)
 *   - find rotated world-Y of every still-attached block (cheap: ≤300 ops)
 *   - on ground / alive-cell contact:
 *       impact speed ≥ SHATTER_SPEED → shatter the whole section this
 *         frame (debris = burst from contact + inherited momentum)
 *       slower → gentle crumble: shed the contact layer and settle
 *   - when remaining < MIN_VIABLE_CHUNK or HARD_LIFE_CAP, flush the rest
 *
 * Each block keeps its own slot in the InstancedMesh. Detached blocks are
 * hidden via HIDDEN_MATRIX so the visible chunk shrinks frame-by-frame.
 */

// Slightly over-real gravity — full free-fall, never damped. A section
// that falls slowly reads as miniature; pacing comes from gravity alone.
const GRAVITY = -12;
const HARD_LIFE_CAP = 12.0;
/** Impact speed (m/s) above which a landing is a FRACTURE event instead of
 *  a soft crumble. Universal pattern in shipped destruction systems
 *  (Smash Hit, Teardown, three.js ammo_break): fracture is an instant,
 *  impulse-thresholded event — never a gradual erosion. ~1 m of free
 *  fall already exceeds this. */
const SHATTER_SPEED = 4.0;
/** Impact speed at which the WHOLE section pulverizes in one frame
 *  (≈ free fall from 7+ m). Between SHATTER_SPEED and this, the section
 *  fractures partially: the contact band crushes to debris and the
 *  survivors split into independent pieces that keep falling and re-break
 *  on their next impact (recursive fracture, ConvexObjectBreaker-style) —
 *  a 2–3 m drop snaps off the snagged part instead of exploding like
 *  glass. */
const FULL_SHATTER_SPEED = 12.0;
/** Crush-band depth above the contact point for partial fractures. */
const CRUSH_DEPTH_BASE = 0.3;
const CRUSH_DEPTH_PER_MS = 0.12;
/** Minimum age before a softly-contacting section may rest into the rubble
 *  pile — freshly detached sections still overlap their spawn cavity and
 *  would otherwise freeze in place mid-wall. */
const REST_MIN_AGE = 0.35;

// Tree-fall toppling: a SLENDER detached section (wall strip, tower top)
// hinges over toward the cut like an axed trunk — seeded lean plus
// gravity-style angular acceleration while airborne, capped so it doesn't
// helicopter. Wide slabs drop flat as before.
// 400 (was 960): with the lower BIG_CHUNK_THRESHOLD medium wall strips are
// common — they should hinge over into the cut too, not just tower tops.
const TOPPLE_MIN_BLOCKS = 400;
const TOPPLE_SLENDERNESS = 1.3; // height vs widest horizontal extent
const TOPPLE_START = 0.5; // rad/s initial lean
const TOPPLE_ACCEL = 1.4; // rad/s² while airborne
const TOPPLE_MAX_W = 2.4; // stop accelerating past this spin
/** Max destructive contact resolutions (shatter/fracture/rest) per frame. */
const CONTACT_BUDGET_PER_FRAME = 8;
/** Burst speed handed to debris scales with impact speed beyond the
 *  threshold; capped so skyscraper-top drops don't turn into popcorn. */
const SHATTER_BURST_BASE = 2.0;
const SHATTER_BURST_PER_MS = 0.45;
const SHATTER_BURST_MAX = 9.0;
/** Layer thickness as multiple of block size — ~one and a half blocks. */
const LAYER_HEIGHT_RATIO = 1.5;
/** Below this many remaining blocks, flush to FlyingChunks (a rigid body
 *  of a few blocks reads as a glitch, not a chunk). Scaled to the 0.2625m
 *  block (×2.37 block count per volume vs 0.35m). Must sit BELOW
 *  BIG_CHUNK_THRESHOLD (BuildingController) or every fresh small section
 *  flushes to confetti on its first update. */
const MIN_VIABLE_CHUNK = 80;
/** Hard cap on detachments per frame in the slow-contact crumble path —
 *  keeps FlyingChunks pool from saturating in one tick. */
const MAX_SHED_PER_FRAME = 180;
const HIDDEN_MATRIX = new THREE.Matrix4().makeScale(0, 0, 0);

// --- Two-way destruction on floor punch-through (the Newton pair) ---
// A falling section that smashes through slabs must slow DOWN in
// proportion to the mass it destroys AND crumble itself — without this it
// cookie-cuts through the whole building and lands intact ("kinetic
// excavating").
/** Inelastic-collision mass factor: how much resistance one smashed
 *  building block offers relative to one section block. Concrete resists
 *  beyond its mass (shear + compression). Tuning range 2–4. */
const IMPACT_MASS_K = 3.0;
/** Velocity-scale clamps for one punch-through: the section never stops
 *  dead mid-air, and even a graze costs some momentum. */
const PUNCH_MIN_SCALE = 0.15;
const PUNCH_MAX_SCALE = 0.9;
/** Contact crush band on a slab = this fraction of the ground-impact
 *  crush depth (slabs are weaker than packed ground). */
const CONTACT_CRUSH_FRACTION = 0.5;
/** Cumulative self-damage fraction past which the section fractures
 *  mid-air into components instead of soaking more floors. Lowered so a
 *  plate punching through floors breaks up sooner in the air. */
const MIDAIR_FRACTURE_FRACTION = 0.15;
/** Min crushed blocks per contact to fire the shatter listener — keeps
 *  floor-by-floor punching from spamming dust/rumble/shake. */
const PUNCH_LISTENER_MIN = 24;
/** Contact-coverage threshold: fraction of bottom-hull probes in contact
 *  below which a hit counts as a SNAG (corner/edge graze) — the section
 *  shears off material around the contact point and keeps flying, instead
 *  of band-crushing or fracturing the WHOLE body ("rozsypuje sie jak
 *  szklo" on a graze). Broad, flat contacts keep the full treatment. */
const BROAD_CONTACT_COVERAGE = 0.35;
/** Sphere radius torn off the section around a snag contact. */
const SNAG_RADIUS_BASE = 0.45;
const SNAG_RADIUS_PER_MS = 0.05;
const SNAG_RADIUS_MAX = 1.3;
/** Angular kick from an off-center snag (torque approximation). */
const SNAG_TORQUE = 0.9;

/** Swept-motion substep for sections: contact is probed every <= this
 *  much travel. A section at 30+ m/s moves more than a slab's thickness
 *  per frame — single-probe integration let big pieces GHOST through
 *  intact floors (no hole, no debris, no momentum loss). */
const SECTION_SUBSTEP = 0.25;
const MAX_SECTION_SUBSTEPS = 8;
/** Collision grace for SECTION-origin debris: it spawns in open air or
 *  fresh holes, so it only needs to clear its own spawn volume — the
 *  default crater grace (0.25 s) let it sail through 1-2 intact floors. */
const SECTION_DEBRIS_DELAY = 0.08;

export interface BigChunkBlock {
  /** Position relative to the chunk's centroid (frozen at spawn). */
  localPos: THREE.Vector3;
  color: number;
  size: number;
}

interface ChunkBlockState {
  localPos: THREE.Vector3;
  color: number;
  size: number;
  /** Slot in the chunk's InstancedMesh. */
  slot: number;
  detached: boolean;
}

interface ActiveBigChunk {
  group: THREE.Group;
  mesh: THREE.InstancedMesh;
  blocks: ChunkBlockState[];
  velocity: THREE.Vector3;
  angularVelocity: THREE.Vector3;
  /** Local-space AABB over all blocks (± half block) — frozen at spawn,
   *  used for the free-flight early-out in update(). */
  localMin: THREE.Vector3;
  localMax: THREE.Vector3;
  /** Tree-fall hinge axis (slender sections only) — angular acceleration
   *  is applied along it while airborne; cleared on first contact. */
  toppleAxis: THREE.Vector3 | null;
  /** Number of blocks still attached. */
  remaining: number;
  /** Block count at spawn — the mid-air fracture threshold is a fraction
   *  of THIS, not of `remaining` (which shrinks with every crush band). */
  initialCount: number;
  /** Blocks lost to floor punch-through so far (crush bands). */
  structuralDamage: number;
  /** Contact probes: indices of the LOWEST attached block per coarse XZ
   *  footprint cell (<= 5x5 + global lowest). Two-point sampling (lowest
   *  corner + center) let a tilted 24 m roof plate descend through a
   *  gutted shell with both probes in voids while its EDGES clipped
   *  through walls. Recomputed after crush bands / rocket carving. */
  probes: number[];
  age: number;
}

/** Fired when a section shatters on impact — lets the game layer add the
 *  perception cues (dust burst, camera shake, impact sound). */
export type ShatterListener = (
  point: THREE.Vector3,
  blockCount: number,
  impactSpeed: number,
) => void;

export class BigChunks {
  private active: ActiveBigChunk[] = [];
  private worldCollider: VoxelCollider | null = null;
  private shatterListener: ShatterListener | null = null;
  private detachListener: ((point: THREE.Vector3, blockCount: number) => void) | null = null;
  private rubbleSink: DebrisSink | null = null;
  /** Carves the building at an impact point; returns the number of blocks
   *  DIRECTLY destroyed by the radius (no integrity cascade — secondary
   *  collapses must not brake the section that triggered them). */
  private impactDamager: ((point: THREE.Vector3, radius: number, speed: number) => number) | null = null;
  /** Per-frame budget for building impact damage — caps the recursion when
   *  a collapse rains many sections onto the building in one tick. The
   *  load governor lowers the cap under heavy load. */
  private impactDamageBudget = 0;
  private impactDamageBudgetPerFrame = 3;
  /** Destructive-contact budget for the CURRENT frame (see update()). */
  private frameContactBudget = 0;
  /** Per-frame destructive-contact cap, lowered by the load governor under
   *  load to spread simultaneous fractures over more frames. */
  private contactBudgetPerFrame = CONTACT_BUDGET_PER_FRAME;
  private readonly tmpInherit = new THREE.Vector3();
  private readonly tmpContact = new THREE.Vector3();
  private readonly tmpDamage = new THREE.Vector3();
  private readonly tmpRayHit = new THREE.Vector3();
  private readonly geom: THREE.BoxGeometry;
  private readonly material: THREE.MeshLambertMaterial;
  private readonly tmpQuat = new THREE.Quaternion();
  private readonly tmpScale = new THREE.Vector3();
  private readonly tmpMatrix = new THREE.Matrix4();
  private readonly tmpColor = new THREE.Color();
  private readonly tmpEuler = new THREE.Euler();
  /** Per-chunk rotation as a matrix — applyEuler per block costs 6 trig
   *  calls per call; with hundreds of falling sections × up to 1000 blocks
   *  each per frame that's millions of sin/cos. One makeRotationFromEuler
   *  per chunk + 9 multiplies per block instead. */
  private readonly tmpRotM = new THREE.Matrix4();
  private readonly tmpVec = new THREE.Vector3();
  private readonly tmpVec2 = new THREE.Vector3();
  /** Viewer (camera) XZ + the squared distance past which an off-screen
   *  section is finalized into rubble instead of simulated frame-by-frame.
   *  0 = disabled. See update(). */
  private viewerX = 0;
  private viewerZ = 0;
  private farSettleSq = 0;

  /** Recycled InstancedMeshes in power-of-two capacity buckets — creating
   *  and disposing GPU buffers for every section is a large per-frame cost
   *  during a collapse (8 spawns/frame × buffer alloc + first upload). */
  private readonly meshPool = new Map<number, THREE.InstancedMesh[]>();

  constructor(private readonly scene: THREE.Scene) {
    this.geom = new THREE.BoxGeometry(1, 1, 1);
    this.material = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      flatShading: true,
    });
  }

  activeCount(): number {
    return this.active.length;
  }

  /** Green gravity field: push falling sections UP while they're over green
   *  terrain and below the field's ceiling. */
  applyUpdraft(test: (x: number, z: number) => boolean, topY: number, accel: number, delta: number): void {
    for (const c of this.active) {
      const p = c.group.position;
      if (p.y < topY && test(p.x, p.z)) c.velocity.y += accel * delta;
    }
  }

  /** Current viewer XZ — sections falling far off-screen are finalized
   *  instantly (see setFarSettleDistance / update). Call once per frame. */
  setViewerPosition(x: number, z: number): void {
    this.viewerX = x;
    this.viewerZ = z;
  }

  /** Beyond this distance from the viewer, a still-falling section is dropped
   *  straight into the rubble instead of simulated every frame — you can't see
   *  it (it's past the render cull), so there's no point paying for its
   *  physics. 0 disables. Set a bit BEYOND the building cull distance so
   *  nothing finalizes on-screen. */
  setFarSettleDistance(d: number): void {
    this.farSettleSq = d > 0 ? d * d : 0;
  }

  private acquireMesh(count: number): THREE.InstancedMesh {
    let cap = 64;
    while (cap < count) cap <<= 1;
    const bucket = this.meshPool.get(cap);
    const recycled = bucket?.pop();
    if (recycled) {
      recycled.count = count;
      return recycled;
    }
    const mesh = new THREE.InstancedMesh(this.geom, this.material, cap);
    mesh.castShadow = false;
    // Each section has a valid local-space bounding sphere (computeBounding-
    // Sphere at spawn) that rides the group transform, so frustum culling is
    // correct — a section that falls off-screen stops drawing.
    mesh.frustumCulled = true;
    mesh.count = count;
    mesh.userData.poolCap = cap;
    return mesh;
  }

  private releaseMesh(mesh: THREE.InstancedMesh): void {
    const cap = mesh.userData.poolCap as number;
    let bucket = this.meshPool.get(cap);
    if (!bucket) {
      bucket = [];
      this.meshPool.set(cap, bucket);
    }
    bucket.push(mesh);
  }

  setWorldCollider(c: VoxelCollider | null): void {
    this.worldCollider = c;
  }

  setShatterListener(l: ShatterListener | null): void {
    this.shatterListener = l;
  }

  /** Fired when a fresh section DETACHES from the building (not on the
   *  respawns of fracture survivors) — real collapses read as dust puffing
   *  out of the breaking joint, not just at ground impact. */
  setDetachListener(l: ((point: THREE.Vector3, blockCount: number) => void) | null): void {
    this.detachListener = l;
  }

  /** Bind the building-damage hook: a falling section striking the standing
   *  building carves it locally (and triggers the integrity cascade →
   *  secondary collapses). Wired to BuildingController.applyExplosion. */
  setImpactDamager(
    d: ((point: THREE.Vector3, radius: number, speed: number) => number) | null,
  ): void {
    this.impactDamager = d;
  }

  /** Bind the rubble pile: softly-landing sections fuse into it as a
   *  coherent lump instead of melting away layer by layer. */
  setRubbleSink(s: DebrisSink | null): void {
    this.rubbleSink = s;
  }

  /** Three.js mesh handles for external raycasting (rocket fallback). */
  getMeshes(): THREE.InstancedMesh[] {
    const out: THREE.InstancedMesh[] = [];
    for (const c of this.active) out.push(c.mesh);
    return out;
  }

  /**
   * Cheap rocket raycast: ray-vs-bounding-sphere per section (~60 spheres),
   * closest hit wins. Replaces THREE.Raycaster.intersectObjects, which
   * tests EVERY instance of every InstancedMesh — tens of thousands of
   * matrix ops per rocket per frame. Sections are built around their
   * centroid, so the group position approximates the sphere center.
   */
  raycastSections(
    origin: THREE.Vector3,
    dir: THREE.Vector3,
    maxDist: number,
  ): { point: THREE.Vector3; distance: number; target: THREE.Object3D } | null {
    let best = Infinity;
    let bestMesh: THREE.InstancedMesh | null = null;
    for (const c of this.active) {
      const r = c.mesh.boundingSphere?.radius ?? 1;
      const ox = c.group.position.x - origin.x;
      const oy = c.group.position.y - origin.y;
      const oz = c.group.position.z - origin.z;
      const tCa = ox * dir.x + oy * dir.y + oz * dir.z;
      if (tCa + r < 0) continue; // sphere behind the ray
      const d2 = ox * ox + oy * oy + oz * oz - tCa * tCa;
      if (d2 > r * r) continue;
      const thc = Math.sqrt(r * r - d2);
      const t = Math.max(0, tCa - thc);
      if (t > maxDist || t >= best) continue;
      best = t;
      bestMesh = c.mesh;
    }
    if (!bestMesh) return null;
    this.tmpRayHit.copy(dir).multiplyScalar(best).add(origin);
    return { point: this.tmpRayHit, distance: best, target: bestMesh };
  }

  spawn(blocks: BigChunkBlock[], centroid: THREE.Vector3, impactPoint: THREE.Vector3): void {
    this.detachListener?.(centroid, blocks.length);
    // Initial motion: small downward bias, drift away from blast.
    const blastDir = this.tmpVec.subVectors(centroid, impactPoint);
    blastDir.y = 0;
    if (blastDir.lengthSq() < 0.0001) blastDir.set(Math.random() - 0.5, 0, Math.random() - 0.5);
    blastDir.normalize().multiplyScalar(1.2 + Math.random() * 0.8);

    const velocity = new THREE.Vector3(blastDir.x, -0.5 - Math.random() * 1.0, blastDir.z);
    // Tumble biased to the horizontal axes — a slab slowly rotating over
    // as it falls reads as massive; yaw spin reads as a toy top.
    const angularVelocity = new THREE.Vector3(
      (Math.random() - 0.5) * 2.0,
      (Math.random() - 0.5) * 0.8,
      (Math.random() - 0.5) * 2.0,
    );
    this.spawnBody(blocks, centroid, velocity, angularVelocity, impactPoint);
  }

  /** Public spawn with EXPLICIT initial velocity — used by the harpoon tear,
   *  which yanks a coherent wall chunk off toward the car. It then falls and
   *  settles/shatters into rubble on ground impact like any other section. */
  spawnPulled(blocks: BigChunkBlock[], centroid: THREE.Vector3, velocity: THREE.Vector3): void {
    const angularVelocity = new THREE.Vector3(
      (Math.random() - 0.5) * 1.6,
      (Math.random() - 0.5) * 0.8,
      (Math.random() - 0.5) * 1.6,
    );
    this.spawnBody(blocks, centroid, velocity, angularVelocity);
  }

  /** Create the rigid piece with explicit initial motion — used by spawn()
   *  and by partial fractures re-spawning survivor components. When
   *  `toppleToward` is given and the piece is slender, it hinges over
   *  toward that point like a felled tree. */
  private spawnBody(
    blocks: BigChunkBlock[],
    centroid: THREE.Vector3,
    velocity: THREE.Vector3,
    angularVelocity: THREE.Vector3,
    toppleToward?: THREE.Vector3,
  ): void {
    const group = new THREE.Group();
    group.position.copy(centroid);
    const mesh = this.acquireMesh(blocks.length);

    const blockStates: ChunkBlockState[] = new Array(blocks.length);
    const localMin = new THREE.Vector3(Infinity, Infinity, Infinity);
    const localMax = new THREE.Vector3(-Infinity, -Infinity, -Infinity);
    for (let i = 0; i < blocks.length; i++) {
      const b = blocks[i]!;
      this.tmpScale.set(b.size, b.size, b.size);
      this.tmpMatrix.compose(b.localPos, this.tmpQuat.identity(), this.tmpScale);
      mesh.setMatrixAt(i, this.tmpMatrix);
      setDebrisColor(this.tmpColor, b.color);
      mesh.setColorAt(i, this.tmpColor);
      const h = b.size * 0.5;
      if (b.localPos.x - h < localMin.x) localMin.x = b.localPos.x - h;
      if (b.localPos.y - h < localMin.y) localMin.y = b.localPos.y - h;
      if (b.localPos.z - h < localMin.z) localMin.z = b.localPos.z - h;
      if (b.localPos.x + h > localMax.x) localMax.x = b.localPos.x + h;
      if (b.localPos.y + h > localMax.y) localMax.y = b.localPos.y + h;
      if (b.localPos.z + h > localMax.z) localMax.z = b.localPos.z + h;
      blockStates[i] = {
        localPos: b.localPos,
        color: b.color,
        size: b.size,
        slot: i,
        detached: false,
      };
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.computeBoundingSphere();

    group.add(mesh);
    this.scene.add(group);

    // Tree-fall check: slender + heavy + a meaningful horizontal direction
    // to the cut → hinge over toward it instead of dropping straight.
    let toppleAxis: THREE.Vector3 | null = null;
    if (toppleToward && blocks.length >= TOPPLE_MIN_BLOCKS) {
      const height = localMax.y - localMin.y;
      const widest = Math.max(localMax.x - localMin.x, localMax.z - localMin.z);
      if (height > widest * TOPPLE_SLENDERNESS) {
        const tip = this.tmpVec2.subVectors(toppleToward, centroid);
        tip.y = 0;
        if (tip.lengthSq() > 0.01) {
          tip.normalize();
          // axis = up × tipDir → the top of the piece swings toward the cut.
          toppleAxis = new THREE.Vector3(0, 1, 0).cross(tip).normalize();
          angularVelocity.multiplyScalar(0.25).addScaledVector(toppleAxis, TOPPLE_START);
          velocity.set(tip.x * 0.6, Math.min(velocity.y, -0.2), tip.z * 0.6);
        }
      }
    }

    const chunk: ActiveBigChunk = {
      group,
      mesh,
      blocks: blockStates,
      velocity,
      angularVelocity,
      localMin,
      localMax,
      toppleAxis,
      remaining: blocks.length,
      initialCount: blocks.length,
      structuralDamage: 0,
      probes: [],
      age: 0,
    };
    this.computeContactProbes(chunk);
    this.active.push(chunk);
  }

  /** Rebuild the bottom-hull probe set: the lowest attached block in each
   *  cell of a coarse 5x5 grid over the local XZ footprint (plus the
   *  global lowest). ~25 probes cover a tilted plate's whole underside
   *  for the price of a handful of transforms per substep. */
  private computeContactProbes(c: ActiveBigChunk): void {
    c.probes.length = 0;
    const ext = Math.max(
      c.localMax.x - c.localMin.x,
      c.localMax.z - c.localMin.z,
      0.001,
    );
    const grid = Math.min(5, Math.max(1, Math.ceil(ext / 0.9)));
    const invX = grid / Math.max(0.001, c.localMax.x - c.localMin.x);
    const invZ = grid / Math.max(0.001, c.localMax.z - c.localMin.z);
    const bestIdx = new Int32Array(grid * grid).fill(-1);
    const bestY = new Float32Array(grid * grid).fill(Infinity);
    let lowestIdx = -1;
    let lowestY = Infinity;
    for (let i = 0; i < c.blocks.length; i++) {
      const b = c.blocks[i]!;
      if (b.detached) continue;
      const gx = Math.min(grid - 1, Math.max(0, Math.floor((b.localPos.x - c.localMin.x) * invX)));
      const gz = Math.min(grid - 1, Math.max(0, Math.floor((b.localPos.z - c.localMin.z) * invZ)));
      const cell = gx + gz * grid;
      if (b.localPos.y < bestY[cell]!) {
        bestY[cell] = b.localPos.y;
        bestIdx[cell] = i;
      }
      if (b.localPos.y < lowestY) {
        lowestY = b.localPos.y;
        lowestIdx = i;
      }
    }
    for (let cell = 0; cell < bestIdx.length; cell++) {
      if (bestIdx[cell]! >= 0) c.probes.push(bestIdx[cell]!);
    }
    if (lowestIdx >= 0 && !c.probes.includes(lowestIdx)) c.probes.push(lowestIdx);
  }

  /** Test/debug introspection of live sections (position, mass, speed). */
  debugSections(): { remaining: number; initialCount: number; y: number; vy: number }[] {
    return this.active.map((c) => ({
      remaining: c.remaining,
      initialCount: c.initialCount,
      y: c.group.position.y,
      vy: c.velocity.y,
    }));
  }

  /** Adaptive quality: secondary-explosion cap per frame (load governor). */
  setContactBudgetPerFrame(n: number): void {
    this.contactBudgetPerFrame = n;
  }

  setImpactDamageBudgetPerFrame(n: number): void {
    this.impactDamageBudgetPerFrame = n;
  }

  update(delta: number, flyingChunks: DebrisField): void {
    this.impactDamageBudget = this.impactDamageBudgetPerFrame;
    // Destructive contacts (shatter / fracture / rest-into-rubble) each
    // settle or transform up to ~1000 blocks; with dozens of sections
    // landing in the same frame this was 30ms of "sek" at the peak. Past
    // the budget a section holds for one frame and retries — invisible at
    // collapse pace.
    this.frameContactBudget = this.contactBudgetPerFrame;
    this.collideSections();
    outer:
    for (let i = this.active.length - 1; i >= 0; i--) {
      const c = this.active[i]!;
      // Off-screen finalize: a section collapsing far past the render cull
      // (e.g. a building you bored through, now far behind) is invisible —
      // drop it straight into the rubble instead of paying for its gravity +
      // contact probing every frame. This is what kept "sek" high after you
      // drove away from the buildings you wrecked.
      if (this.farSettleSq > 0) {
        const dx = c.group.position.x - this.viewerX;
        const dz = c.group.position.z - this.viewerZ;
        if (dx * dx + dz * dz > this.farSettleSq) {
          this.flushRemaining(c, flyingChunks);
          this.dispose_chunk(c);
          this.active.splice(i, 1);
          continue;
        }
      }
      c.age += delta;
      c.velocity.y += GRAVITY * delta;
      // Tree-fall: gravity torque approximation — the lean accelerates
      // while airborne, like a trunk going past its tipping point.
      if (c.toppleAxis) {
        c.angularVelocity.addScaledVector(c.toppleAxis, TOPPLE_ACCEL * delta);
        if (c.angularVelocity.lengthSq() > TOPPLE_MAX_W * TOPPLE_MAX_W) {
          c.toppleAxis = null;
        }
      }

      // SWEPT integration: the frame's motion advances in substeps short
      // enough that a slab can't fit between two consecutive contact
      // probes. Slow sections pay exactly one step (status quo); a
      // free-falling tower top at 30+ m/s pays a few extra bbox checks.
      const travel = c.velocity.length() * delta;
      const steps = travel > SECTION_SUBSTEP
        ? Math.min(MAX_SECTION_SUBSTEPS, Math.ceil(travel / SECTION_SUBSTEP))
        : 1;
      const subDt = delta / steps;
      for (let k = 0; k < steps; k++) {
        c.group.position.addScaledVector(c.velocity, subDt);
        c.group.rotation.x += c.angularVelocity.x * subDt;
        c.group.rotation.y += c.angularVelocity.y * subDt;
        c.group.rotation.z += c.angularVelocity.z * subDt;
        this.tmpRotM.makeRotationFromEuler(c.group.rotation);

        // No occupancy early-out here: probing a SINGLE point under the
        // frozen bbox closed the gate the moment that point passed below
        // a slab while the real underside was still above it — sections
        // then crossed whole floors untested. The bottom-hull probe scan
        // in resolveContact is ~10–25 lookups, cheap enough to just run
        // every substep (it was the 1000-block scan that needed gating).
        const outcome = this.resolveContact(c, flyingChunks);
        if (outcome === 'removed') {
          this.active.splice(i, 1);
          continue outer;
        }
        if (outcome === 'stop') break; // velocity damped — done this frame
        // 'through' / 'none' — keep sweeping the rest of the frame's motion.
      }

      if (c.age > HARD_LIFE_CAP) {
        this.flushRemaining(c, flyingChunks);
        this.dispose_chunk(c);
        this.active.splice(i, 1);
      }
    }
  }

  /** True when no bottom-hull probe (nor the center column) sits inside
   *  an occupied cell at the current pose — the punched slab is really
   *  cleared and the section may continue falling. */
  private probesAllClear(c: ActiveBigChunk): boolean {
    if (!this.worldCollider) return true;
    let lowestWorldY = Infinity;
    for (let j = 0; j < c.probes.length; j++) {
      const b = c.blocks[c.probes[j]!]!;
      if (b.detached) continue;
      this.tmpVec.copy(b.localPos).applyMatrix4(this.tmpRotM);
      const wy = c.group.position.y + this.tmpVec.y - b.size * 0.5;
      if (wy < lowestWorldY) lowestWorldY = wy;
      if (this.worldCollider.isOccupied(
        c.group.position.x + this.tmpVec.x,
        wy - 0.02,
        c.group.position.z + this.tmpVec.z,
      )) {
        return false;
      }
    }
    return lowestWorldY === Infinity
      || !this.worldCollider.isOccupied(c.group.position.x, lowestWorldY, c.group.position.z);
  }

  /**
   * Resolve a potential contact at the section's CURRENT pose (tmpRotM
   * must already match the rotation). Outcomes:
   *  - 'removed': section consumed (shattered / fractured / rested /
   *    flushed) and disposed — the caller splices it out of `active`.
   *  - 'stop': velocity damped (budget hold / fresh bounce) — stop
   *    sweeping this frame.
   *  - 'through': punched through a slab — keep sweeping.
   *  - 'none': the exact block scan found no contact after all.
   */
  private resolveContact(
    c: ActiveBigChunk,
    flyingChunks: DebrisField,
  ): 'removed' | 'stop' | 'through' | 'none' {
    // Sweep the bottom-hull probes (lowest block per coarse footprint
    // cell): track the lowest point AND test occupancy under EVERY probe —
    // a tilted plate must collide with a wall under any part of its
    // underside, not just under its lowest corner.
    let lowestWorldY = Infinity;
    let lowX = c.group.position.x;
    let lowZ = c.group.position.z;
    let hitX = 0;
    let hitY = 0;
    let hitZ = 0;
    let hitBuilding = false;
    let probesAlive = 0;
    let probesTouching = 0;
    for (let j = 0; j < c.probes.length; j++) {
      const b = c.blocks[c.probes[j]!]!;
      if (b.detached) continue;
      probesAlive++;
      this.tmpVec.copy(b.localPos).applyMatrix4(this.tmpRotM);
      const wx = c.group.position.x + this.tmpVec.x;
      const wz = c.group.position.z + this.tmpVec.z;
      const wy = c.group.position.y + this.tmpVec.y - b.size * 0.5;
      if (wy < lowestWorldY) {
        lowestWorldY = wy;
        lowX = wx;
        lowZ = wz;
      }
      if (this.worldCollider && this.worldCollider.isOccupied(wx, wy - 0.02, wz)) {
        probesTouching++;
        if (!hitBuilding) {
          hitBuilding = true;
          hitX = wx;
          hitY = wy;
          hitZ = wz;
        }
      }
    }
    // Center column stays as an extra probe (hollow-bottom sections).
    if (!hitBuilding && this.worldCollider && lowestWorldY < Infinity
      && this.worldCollider.isOccupied(c.group.position.x, lowestWorldY, c.group.position.z)) {
      hitBuilding = true;
      hitX = c.group.position.x;
      hitY = lowestWorldY;
      hitZ = c.group.position.z;
    }
    const hitGround = lowestWorldY < 0.15;
    if (!hitGround && !hitBuilding) return 'none';
    // Contact coverage: what fraction of the underside actually touches.
    // A tilted plate clipping a wall with one corner reads ~0.1; a flat
    // landing on a slab reads ~1.0.
    const coverage = probesAlive > 0 ? probesTouching / probesAlive : 1;
    if (hitBuilding) {
      lowX = hitX;
      lowZ = hitZ;
      lowestWorldY = Math.min(lowestWorldY, hitY);
    }

    c.toppleAxis = null; // contact ends the hinge phase
    const impactSpeed = -c.velocity.y;
    // SNAG: a big body catching an edge with a SMALL part of its underside
    // tears off material around the contact (plus an angular kick from the
    // off-center force) instead of crushing/fracturing the whole thing —
    // a grazed 24m plate must NOT burst like glass.
    if (hitBuilding && !hitGround
      && coverage < BROAD_CONTACT_COVERAGE
      && impactSpeed >= SHATTER_SPEED
      && this.frameContactBudget > 0) {
      this.frameContactBudget--;
      this.tmpDamage.set(hitX, Math.max(hitY, 0.15), hitZ);
      const smashed = this.damageBuildingAt(c, this.tmpDamage, impactSpeed);
      const sheared = this.shearOffAt(c, flyingChunks, hitX, hitY, hitZ, impactSpeed);
      c.structuralDamage += sheared;
      this.computeContactProbes(c);
      // Momentum: pay for what BOTH sides lost in the graze.
      const lost = IMPACT_MASS_K * smashed + sheared;
      const vScale = Math.min(PUNCH_MAX_SCALE, Math.max(
        PUNCH_MIN_SCALE,
        c.remaining / (c.remaining + lost),
      ));
      c.velocity.y *= vScale;
      c.velocity.x *= 0.8 + 0.2 * vScale;
      c.velocity.z *= 0.8 + 0.2 * vScale;
      // Torque from the off-center contact: r x v tips the body away
      // from the snag, like a plate clipping a parapet corner.
      this.tmpVec2.set(
        hitX - c.group.position.x,
        hitY - c.group.position.y,
        hitZ - c.group.position.z,
      ).cross(c.velocity);
      if (this.tmpVec2.lengthSq() > 1e-6) {
        this.tmpVec2.normalize().multiplyScalar(SNAG_TORQUE);
        c.angularVelocity.add(this.tmpVec2);
      }
      if (c.remaining < MIN_VIABLE_CHUNK) {
        this.flushRemaining(c, flyingChunks);
        this.dispose_chunk(c);
        return 'removed';
      }
      if (c.structuralDamage >= MIDAIR_FRACTURE_FRACTION * c.initialCount) {
        this.partialFracture(c, flyingChunks, lowestWorldY, impactSpeed, true);
        this.dispose_chunk(c);
        return 'removed';
      }
      return 'through';
    }
    if (hitBuilding && !hitGround) {
      this.tmpDamage.set(lowX, Math.max(lowestWorldY, 0.15), lowZ);
      const smashed = this.damageBuildingAt(c, this.tmpDamage, impactSpeed);
      // FLOOR CAVE-IN: if the smash cleared the cells in the way, the
      // section crashes THROUGH the slab and keeps falling — but the
      // slab fights back (two-way destruction, the Newton pair):
      if (this.probesAllClear(c)) {
        // 1. Inelastic momentum balance — the section slows in
        //    proportion to the building mass it just destroyed. A big
        //    slab sails through one floor barely slowed; a small piece
        //    bogs down. Fallback to the old flat damping when the
        //    damage budget produced no count this frame.
        const vScale = smashed > 0
          ? Math.min(PUNCH_MAX_SCALE, Math.max(
            PUNCH_MIN_SCALE,
            c.remaining / (c.remaining + IMPACT_MASS_K * smashed),
          ))
          : 0.55;
        c.velocity.y *= vScale;
        c.velocity.x *= 0.7 + 0.3 * vScale;
        c.velocity.z *= 0.7 + 0.3 * vScale;
        c.angularVelocity.multiplyScalar(0.6 + 0.4 * vScale);
        // 2. Self-destruction — concrete is not infinitely hard. The
        //    section's bottom crush band shears off as debris, and
        //    once cumulative damage crosses the fracture threshold
        //    (or the hit is violent) it breaks apart MID-AIR instead
        //    of cookie-cutting the whole building.
        if (impactSpeed >= SHATTER_SPEED && this.frameContactBudget > 0) {
          this.frameContactBudget--;
          if (
            impactSpeed >= FULL_SHATTER_SPEED
            || c.structuralDamage >= MIDAIR_FRACTURE_FRACTION * c.initialCount
          ) {
            // partialFracture (not full shatter) keeps the collapse
            // readable: 2–4 pieces that keep falling, not a debris
            // cloud detonating 20 m above ground.
            this.partialFracture(c, flyingChunks, lowestWorldY, impactSpeed, true);
            this.dispose_chunk(c);
            return 'removed';
          }
          c.structuralDamage += this.crushContactBand(c, flyingChunks, lowestWorldY, impactSpeed);
          // The crush band just consumed the bottom hull — rebuild probes.
          this.computeContactProbes(c);
          if (c.remaining < MIN_VIABLE_CHUNK) {
            this.flushRemaining(c, flyingChunks);
            this.dispose_chunk(c);
            return 'removed';
          }
        }
        return 'through';
      }
    }
    const destructive = impactSpeed >= SHATTER_SPEED
      || (c.age >= REST_MIN_AGE && this.rubbleSink !== null);
    if (destructive && this.frameContactBudget <= 0) {
      // Too many contacts resolved this frame — hold and retry next.
      c.velocity.y = Math.abs(c.velocity.y) * 0.05;
      c.velocity.x *= 0.8;
      c.velocity.z *= 0.8;
      return 'stop';
    }
    if (destructive) this.frameContactBudget--;
    if (impactSpeed >= FULL_SHATTER_SPEED) {
      // Violent landing (free fall from 7+ m) — the whole section
      // bursts THIS frame. Staging this over multiple frames is what
      // reads as slow and mushy.
      this.shatterOnImpact(c, flyingChunks, lowestWorldY, impactSpeed);
      this.dispose_chunk(c);
      return 'removed';
    }
    if (impactSpeed >= SHATTER_SPEED) {
      // Moderate landing — crush the contact band, split the survivors
      // into pieces that keep falling and re-break on later impacts.
      // New pieces are pushed to the end of `active`; the backward
      // iteration won't revisit them this frame.
      this.partialFracture(c, flyingChunks, lowestWorldY, impactSpeed);
      this.dispose_chunk(c);
      return 'removed';
    }
    // Soft contact — the piece comes to rest and fuses into the rubble
    // pile as a coherent lump. (The old progressive layer-melt lives on
    // as meltLayer() — kept for a future lava mode, not used here.)
    if (c.age >= REST_MIN_AGE && this.rubbleSink) {
      this.restIntoRubble(c, flyingChunks);
      this.dispose_chunk(c);
      return 'removed';
    }
    // Too fresh to rest (likely still inside its spawn cavity) — damp
    // the bounce and keep falling; it will rest or fracture later.
    c.velocity.y = Math.abs(c.velocity.y) * 0.1;
    c.velocity.x *= 0.7;
    c.velocity.z *= 0.7;
    c.angularVelocity.multiplyScalar(0.7);
    return 'stop';
  }

  /**
   * Rest a softly-landed section: every remaining block fuses into the
   * rubble pile at its current spot (settled bottom-up so lower blocks
   * claim their cells first and the lump keeps its silhouette). Blocks the
   * grid can't take (outside coverage / full column) become gentle debris.
   */
  private restIntoRubble(chunk: ActiveBigChunk, flyingChunks: DebrisField): void {
    const sink = this.rubbleSink;
    this.tmpRotM.makeRotationFromEuler(chunk.group.rotation);
    const items: { pos: THREE.Vector3; color: number; size: number }[] = [];
    for (const b of chunk.blocks) {
      if (b.detached) continue;
      b.detached = true;
      const pos = b.localPos.clone().applyMatrix4(this.tmpRotM).add(chunk.group.position);
      items.push({ pos, color: b.color, size: b.size });
    }
    chunk.remaining = 0;
    items.sort((a, b) => a.pos.y - b.pos.y);
    const leftovers = debrisScratch.begin();
    for (const it of items) {
      if (sink?.settle(it.pos, it.size, it.color)) continue;
      debrisScratch.add(it.pos.x, it.pos.y, it.pos.z, it.color, it.size);
    }
    if (leftovers.length > 0) {
      const contact = this.tmpContact.copy(chunk.group.position).setY(0.15);
      flyingChunks.spawn(leftovers, contact, 1.5, undefined, undefined, SECTION_DEBRIS_DELAY);
    }
  }

  /** LAVA ARCHIVE — progressive layer-melt: detach all blocks whose rotated
   *  world-Y sits within LAYER_HEIGHT of the chunk's current lowestWorldY
   *  and hand them to FlyingChunks while the rest keeps settling. No longer
   *  used by demolition (sections now rest or fracture); kept for a future
   *  lava/melting mode. */
  meltLayer(
    chunk: ActiveBigChunk,
    flyingChunks: DebrisField,
    lowestWorldY: number,
    blockSize: number,
  ): void {
    const layerHeight = blockSize * LAYER_HEIGHT_RATIO;
    const threshold = lowestWorldY + layerHeight;
    this.tmpEuler.copy(chunk.group.rotation);

    const detached: DestroyedBlock[] = [];
    let shedCount = 0;
    let dirty = false;

    for (let i = 0; i < chunk.blocks.length; i++) {
      if (shedCount >= MAX_SHED_PER_FRAME) break;
      const b = chunk.blocks[i]!;
      if (b.detached) continue;
      this.tmpVec.copy(b.localPos).applyEuler(this.tmpEuler);
      const wx = chunk.group.position.x + this.tmpVec.x;
      const wy = chunk.group.position.y + this.tmpVec.y;
      const wz = chunk.group.position.z + this.tmpVec.z;
      const blockBottom = wy - b.size * 0.5;
      if (blockBottom > threshold) continue;

      b.detached = true;
      chunk.remaining--;
      chunk.mesh.setMatrixAt(b.slot, HIDDEN_MATRIX);
      dirty = true;

      detached.push({
        worldPosition: new THREE.Vector3(wx, Math.max(wy, 0.2), wz),

        color: b.color,
        size: b.size,
      });
      shedCount++;
    }

    if (dirty) {
      chunk.mesh.instanceMatrix.needsUpdate = true;
    }

    if (detached.length > 0) {
      const impactPoint = this.tmpVec2.set(
        chunk.group.position.x,
        Math.max(lowestWorldY, 0.15),
        chunk.group.position.z,
      );
      // Low burst speed + chunk-velocity inheritance comes from FlyingChunks
      // jitter; we just want the layer to crumble outward, not fly off.
      flyingChunks.spawn(detached, impactPoint, 2.5, undefined, undefined, SECTION_DEBRIS_DELAY);
    }

    // Velocity damping after impact — chunk loses momentum, gentle bounce.
    chunk.velocity.y = Math.max(0, -chunk.velocity.y) * 0.15;
    chunk.velocity.x *= 0.6;
    chunk.velocity.z *= 0.6;
    chunk.angularVelocity.multiplyScalar(0.7);
  }

  /** Carve the standing building where a falling section struck it. Radius
   *  grows with impact speed and section mass. Mutating the cluster (and
   *  spawning new sections) from inside update() is safe: new chunks are
   *  appended past the backward iteration cursor. */
  private damageBuildingAt(chunk: ActiveBigChunk, point: THREE.Vector3, impactSpeed: number): number {
    // Falling concrete smashes what it lands on — radius grows with speed
    // and section mass. The structural span model (not these numbers) is
    // what prevents a full chain reaction.
    if (!this.impactDamager || impactSpeed < 3 || this.impactDamageBudget <= 0) return 0;
    this.impactDamageBudget--;
    const blockSize = (chunk.blocks[0]?.size ?? 0.129) / 0.98;
    const radius = Math.min(
      3.0,
      0.4 + 0.07 * impactSpeed + 0.42 * Math.cbrt(chunk.remaining) * blockSize,
    );
    return this.impactDamager(point, radius, impactSpeed);
  }

  /**
   * Section-vs-section collision (bounding spheres): falling pieces must
   * never sail through each other. Cheap O(n²) over ≤~100 live sections;
   * gentle separation + impulse so mid-air pieces shoulder each other
   * aside instead of merging. Fresh siblings from the same split overlap
   * by construction and are skipped for their first instants.
   */
  private collideSections(): void {
    const n = this.active.length;
    for (let i = 0; i < n; i++) {
      const a = this.active[i]!;
      const ra = (a.mesh.boundingSphere?.radius ?? 1) * 0.7;
      for (let j = i + 1; j < n; j++) {
        const b = this.active[j]!;
        if (a.age < 0.3 && b.age < 0.3) continue; // spawn siblings overlap
        const rb = (b.mesh.boundingSphere?.radius ?? 1) * 0.7;
        const minD = ra + rb;
        const dx = b.group.position.x - a.group.position.x;
        const dy = b.group.position.y - a.group.position.y;
        const dz = b.group.position.z - a.group.position.z;
        const d2 = dx * dx + dy * dy + dz * dz;
        if (d2 >= minD * minD || d2 < 1e-6) continue;
        const dist = Math.sqrt(d2);
        const nx = dx / dist;
        const ny = dy / dist;
        const nz = dz / dist;
        const push = Math.min(0.06, (minD - dist) * 0.25);
        a.group.position.x -= nx * push;
        a.group.position.y -= ny * push;
        a.group.position.z -= nz * push;
        b.group.position.x += nx * push;
        b.group.position.y += ny * push;
        b.group.position.z += nz * push;
        const vn = (b.velocity.x - a.velocity.x) * nx
          + (b.velocity.y - a.velocity.y) * ny
          + (b.velocity.z - a.velocity.z) * nz;
        if (vn < 0) {
          const imp = -0.55 * vn;
          a.velocity.x -= nx * imp;
          a.velocity.y -= ny * imp;
          a.velocity.z -= nz * imp;
          b.velocity.x += nx * imp;
          b.velocity.y += ny * imp;
          b.velocity.z += nz * imp;
        }
      }
    }
  }

  /**
   * Partial fracture for moderate impacts (2–7 m drops): blocks inside the
   * crush band above the contact become debris (with momentum inheritance),
   * and the survivors split into 6-connected components that respawn as
   * independent rigid pieces — they keep falling and re-break on their next
   * impact. Recursive fracture is what shapes a collapse silhouette; a
   * one-shot full burst at these energies reads as glass.
   */
  /**
   * Snag shear: tear off the section's blocks within a sphere around the
   * contact point — the local bite a grazed edge takes out of a passing
   * body. Pooled debris with momentum inheritance; the body flies on.
   * Returns the number of sheared blocks.
   */
  private shearOffAt(
    chunk: ActiveBigChunk,
    flyingChunks: DebrisField,
    cx: number,
    cy: number,
    cz: number,
    impactSpeed: number,
  ): number {
    const radius = Math.min(
      SNAG_RADIUS_MAX,
      SNAG_RADIUS_BASE + SNAG_RADIUS_PER_MS * impactSpeed,
    );
    const r2 = radius * radius;
    const crushed = debrisScratch.begin();
    for (const b of chunk.blocks) {
      if (b.detached) continue;
      this.tmpVec.copy(b.localPos).applyMatrix4(this.tmpRotM);
      const wx = chunk.group.position.x + this.tmpVec.x;
      const wy = chunk.group.position.y + this.tmpVec.y;
      const wz = chunk.group.position.z + this.tmpVec.z;
      const dx = wx - cx;
      const dy = wy - cy;
      const dz = wz - cz;
      if (dx * dx + dy * dy + dz * dz > r2) continue;
      b.detached = true;
      chunk.remaining--;
      chunk.mesh.setMatrixAt(b.slot, HIDDEN_MATRIX);
      debrisScratch.add(wx, Math.max(wy, 0.2), wz, b.color, b.size);
    }
    if (crushed.length === 0) return 0;
    chunk.mesh.instanceMatrix.needsUpdate = true;
    const contact = this.tmpContact.set(cx, Math.max(cy, 0.15), cz);
    const burst = Math.min(5, 1.2 + 0.35 * impactSpeed);
    const inherit = this.tmpInherit.set(chunk.velocity.x, chunk.velocity.y * 0.3, chunk.velocity.z);
    flyingChunks.spawn(crushed, contact, burst, undefined, inherit, SECTION_DEBRIS_DELAY);
    if (crushed.length >= PUNCH_LISTENER_MIN) {
      this.shatterListener?.(contact, crushed.length, impactSpeed);
    }
    return crushed.length;
  }

  /**
   * Newton pair, part 2 (in place): the slab the section just smashed
   * shears a shallow crush band off the SECTION's bottom — debris with
   * momentum inheritance, the body keeps flying smaller and slower.
   * Returns the number of crushed blocks (accumulated as structural
   * damage toward the mid-air fracture threshold).
   */
  private crushContactBand(
    chunk: ActiveBigChunk,
    flyingChunks: DebrisField,
    lowestWorldY: number,
    impactSpeed: number,
  ): number {
    this.tmpRotM.makeRotationFromEuler(chunk.group.rotation);
    const crushDepth = CONTACT_CRUSH_FRACTION
      * (CRUSH_DEPTH_BASE + CRUSH_DEPTH_PER_MS * (impactSpeed - SHATTER_SPEED));
    const threshold = lowestWorldY + crushDepth;
    const crushed = debrisScratch.begin();
    for (const b of chunk.blocks) {
      if (b.detached) continue;
      this.tmpVec.copy(b.localPos).applyMatrix4(this.tmpRotM);
      const wy = chunk.group.position.y + this.tmpVec.y;
      if (wy - b.size * 0.5 > threshold) continue;
      b.detached = true;
      chunk.remaining--;
      chunk.mesh.setMatrixAt(b.slot, HIDDEN_MATRIX);
      debrisScratch.add(
        chunk.group.position.x + this.tmpVec.x,
        Math.max(wy, 0.2),
        chunk.group.position.z + this.tmpVec.z,
        b.color,
        b.size,
      );
    }
    if (crushed.length === 0) return 0;
    chunk.mesh.instanceMatrix.needsUpdate = true;
    const contact = this.tmpContact.set(
      chunk.group.position.x,
      Math.max(lowestWorldY, 0.15),
      chunk.group.position.z,
    );
    const burst = Math.min(5, 1.0 + 0.4 * (impactSpeed - SHATTER_SPEED));
    const inherit = this.tmpInherit.set(chunk.velocity.x, chunk.velocity.y * 0.2, chunk.velocity.z);
    flyingChunks.spawn(crushed, contact, burst, undefined, inherit, SECTION_DEBRIS_DELAY);
    // Threshold keeps floor-by-floor punching from spamming dust/rumble —
    // main.ts scales the cues with blockCount anyway.
    if (crushed.length >= PUNCH_LISTENER_MIN) {
      this.shatterListener?.(contact, crushed.length, impactSpeed);
    }
    return crushed.length;
  }

  private partialFracture(
    chunk: ActiveBigChunk,
    flyingChunks: DebrisField,
    lowestWorldY: number,
    impactSpeed: number,
    midAir = false,
  ): void {
    this.tmpRotM.makeRotationFromEuler(chunk.group.rotation);
    const crushDepth = CRUSH_DEPTH_BASE + CRUSH_DEPTH_PER_MS * (impactSpeed - SHATTER_SPEED);
    const threshold = lowestWorldY + crushDepth;
    const crushed = debrisScratch.begin();
    const survivors: ChunkBlockState[] = [];
    for (const b of chunk.blocks) {
      if (b.detached) continue;
      b.detached = true; // original body is disposed either way
      this.tmpVec.copy(b.localPos).applyMatrix4(this.tmpRotM);
      const wy = chunk.group.position.y + this.tmpVec.y;
      if (wy - b.size * 0.5 <= threshold) {
        debrisScratch.add(
          chunk.group.position.x + this.tmpVec.x,
          Math.max(wy, 0.2),
          chunk.group.position.z + this.tmpVec.z,
          b.color,
          b.size,
        );
      } else {
        survivors.push(b);
      }
    }
    chunk.remaining = 0;

    const contact = this.tmpContact.set(
      chunk.group.position.x,
      Math.max(lowestWorldY, 0.15),
      chunk.group.position.z,
    );
    if (crushed.length > 0) {
      const burst = Math.min(7, 1.5 + (impactSpeed - SHATTER_SPEED) * 0.5);
      const inherit = this.tmpInherit.set(chunk.velocity.x, chunk.velocity.y * 0.2, chunk.velocity.z);
      flyingChunks.spawn(crushed, contact, burst, undefined, inherit, SECTION_DEBRIS_DELAY);
      this.shatterListener?.(contact, crushed.length, impactSpeed);
    }
    if (survivors.length === 0) return;

    // Adjacency lives on the ORIGINAL (unrotated) local lattice — rotation
    // doesn't change which blocks touch. innerSize = blockSize * 0.98.
    const step = survivors[0]!.size / 0.98;
    const components = splitConnectedComponents(survivors, step);
    for (const comp of components) {
      if (comp.length >= MIN_VIABLE_CHUNK) {
        // Ground fracture: vertical momentum is spent in the crush (tiny
        // rebound). Mid-air fracture: the pieces KEEP FALLING at half
        // speed — a rebound 20 m up would read as bouncy rubber.
        this.respawnComponent(chunk, comp, midAir ? 0.5 : -0.1);
      } else {
        // Slivers too small to be a believable rigid piece → gentle debris.
        this.tmpRotM.makeRotationFromEuler(chunk.group.rotation);
        const blocks = debrisScratch.begin();
        for (const b of comp) {
          this.tmpVec.copy(b.localPos).applyMatrix4(this.tmpRotM);
          debrisScratch.add(
            chunk.group.position.x + this.tmpVec.x,
            Math.max(chunk.group.position.y + this.tmpVec.y, 0.2),
            chunk.group.position.z + this.tmpVec.z,
            b.color,
            b.size,
          );
        }
        this.tmpInherit.set(chunk.velocity.x * 0.8, 0, chunk.velocity.z * 0.8);
        flyingChunks.spawn(blocks, contact, 2.0, undefined, this.tmpInherit, SECTION_DEBRIS_DELAY);
      }
    }
  }

  /** Respawn a survivor component as its own rigid piece. The parent's
   *  rotation is baked into the local positions, so the new body starts
   *  unrotated at the component's own centroid — visually seamless. */
  private respawnComponent(parent: ActiveBigChunk, comp: ChunkBlockState[], vyMul = -0.1): void {
    this.tmpEuler.copy(parent.group.rotation);
    const worldPositions = comp.map((b) =>
      b.localPos.clone().applyEuler(this.tmpEuler).add(parent.group.position),
    );
    let sx = 0;
    let sy = 0;
    let sz = 0;
    for (const p of worldPositions) {
      sx += p.x;
      sy += p.y;
      sz += p.z;
    }
    const inv = 1 / worldPositions.length;
    const centroid = new THREE.Vector3(sx * inv, sy * inv, sz * inv);
    const blocks: BigChunkBlock[] = comp.map((b, i) => ({
      localPos: worldPositions[i]!.sub(centroid),
      color: b.color,
      size: b.size,
    }));
    // Vertical momentum scaled by vyMul: ground fracture rebounds slightly
    // (-0.1 of the downward speed), mid-air fracture keeps falling (+0.5).
    const velocity = new THREE.Vector3(
      parent.velocity.x * 0.8,
      parent.velocity.y * vyMul,
      parent.velocity.z * 0.8,
    );
    const angularVelocity = new THREE.Vector3(
      (Math.random() - 0.5) * 1.2,
      (Math.random() - 0.5) * 0.4,
      (Math.random() - 0.5) * 1.2,
    );
    this.spawnBody(blocks, centroid, velocity, angularVelocity);
  }

  /**
   * Single-frame full shatter on hard impact. Every remaining block becomes
   * debris bursting radially from the contact point at a speed scaled by
   * the impact energy, ON TOP of the section's own velocity at the moment
   * of impact (momentum inheritance) — the burst then sprays outward along
   * the ground, which is the signature look of a wall pancaking.
   */
  private shatterOnImpact(
    chunk: ActiveBigChunk,
    flyingChunks: DebrisField,
    lowestWorldY: number,
    impactSpeed: number,
  ): void {
    this.tmpRotM.makeRotationFromEuler(chunk.group.rotation);
    const transfer = debrisScratch.begin();
    for (const b of chunk.blocks) {
      if (b.detached) continue;
      this.tmpVec.copy(b.localPos).applyMatrix4(this.tmpRotM).add(chunk.group.position);
      debrisScratch.add(
        this.tmpVec.x,
        Math.max(this.tmpVec.y, 0.2),
        this.tmpVec.z,
        b.color,
        b.size,
      );
      b.detached = true;
    }
    chunk.remaining = 0;
    if (transfer.length === 0) return;

    const contact = this.tmpContact.set(
      chunk.group.position.x,
      Math.max(lowestWorldY, 0.15),
      chunk.group.position.z,
    );
    const burst = Math.min(
      SHATTER_BURST_MAX,
      SHATTER_BURST_BASE + (impactSpeed - SHATTER_SPEED) * SHATTER_BURST_PER_MS,
    );
    // Full horizontal momentum, only a sliver of the vertical — debris
    // slamming straight down dies instantly; spraying sideways reads big.
    const inherit = this.tmpInherit.set(
      chunk.velocity.x,
      chunk.velocity.y * 0.2,
      chunk.velocity.z,
    );
    flyingChunks.spawn(transfer, contact, burst, undefined, inherit, SECTION_DEBRIS_DELAY);
    this.shatterListener?.(contact, transfer.length, impactSpeed);
  }

  /** Final cleanup — remaining blocks dump into FlyingChunks. Used when the
   *  chunk shrinks below MIN_VIABLE_CHUNK or hits the hard life cap. */
  private flushRemaining(chunk: ActiveBigChunk, flyingChunks: DebrisField): void {
    if (chunk.remaining === 0) return;
    this.tmpEuler.copy(chunk.group.rotation);
    const transfer: DestroyedBlock[] = [];
    for (const b of chunk.blocks) {
      if (b.detached) continue;
      const worldPos = b.localPos.clone().applyEuler(this.tmpEuler).add(chunk.group.position);
      worldPos.y = Math.max(worldPos.y, 0.2);
      transfer.push({
        worldPosition: worldPos,

        color: b.color,
        size: b.size,
      });
      b.detached = true;
    }
    chunk.remaining = 0;
    const impactPoint = chunk.group.position.clone();
    impactPoint.y = 0.15;
    flyingChunks.spawn(transfer, impactPoint, 3.0, undefined, undefined, SECTION_DEBRIS_DELAY);
  }

  private dispose_chunk(chunk: ActiveBigChunk): void {
    // GPU buffers go back to the pool — never disposed mid-game.
    this.releaseMesh(chunk.mesh);
    this.scene.remove(chunk.group);
  }

  /**
   * External impact API: rocket hit a BigChunk via mesh raycast. Detach
   * blocks within `radius` of `point`; if too few remain, dispose the
   * chunk. Building cluster is NOT touched by this path — falling/standing
   * fragments break apart in place.
   */
  shatterAt(point: THREE.Vector3, radius: number, flyingChunks: DebrisField): boolean {
    const r2 = radius * radius;
    let anyHit = false;
    for (let i = this.active.length - 1; i >= 0; i--) {
      const c = this.active[i]!;
      // Bounding-sphere reject: if the chunk's bounding sphere is far from
      // the impact point, skip the per-block test.
      const sphere = c.mesh.boundingSphere;
      if (sphere) {
        const cx = c.group.position.x + sphere.center.x;
        const cy = c.group.position.y + sphere.center.y;
        const cz = c.group.position.z + sphere.center.z;
        const dx = cx - point.x;
        const dy = cy - point.y;
        const dz = cz - point.z;
        const reach = sphere.radius + radius;
        if (dx * dx + dy * dy + dz * dz > reach * reach) continue;
      }

      this.tmpEuler.copy(c.group.rotation);
      const detached: DestroyedBlock[] = [];
      let dirty = false;
      for (const b of c.blocks) {
        if (b.detached) continue;
        this.tmpVec.copy(b.localPos).applyEuler(this.tmpEuler);
        const wx = c.group.position.x + this.tmpVec.x;
        const wy = c.group.position.y + this.tmpVec.y;
        const wz = c.group.position.z + this.tmpVec.z;
        const bdx = wx - point.x;
        const bdy = wy - point.y;
        const bdz = wz - point.z;
        if (bdx * bdx + bdy * bdy + bdz * bdz > r2) continue;
        b.detached = true;
        c.remaining--;
        c.mesh.setMatrixAt(b.slot, HIDDEN_MATRIX);
        dirty = true;
        detached.push({
          worldPosition: new THREE.Vector3(wx, Math.max(wy, 0.2), wz),

          color: b.color,
          size: b.size,
        });
      }
      if (dirty) {
        c.mesh.instanceMatrix.needsUpdate = true;
        anyHit = true;
        flyingChunks.spawn(detached, point, 8.0, undefined, undefined, SECTION_DEBRIS_DELAY);
        // Rocket carving may have eaten probe blocks — rebuild the hull.
        this.computeContactProbes(c);
      }
      if (c.remaining < MIN_VIABLE_CHUNK) {
        this.flushRemaining(c, flyingChunks);
        this.dispose_chunk(c);
        this.active.splice(i, 1);
      }
    }
    return anyHit;
  }

  /**
   * Black-hole orb suction: any falling-section block within `radius` of
   * `center` simply VANISHES (sucked into the orb) — no debris re-ejection,
   * unlike shatterAt. Fully-consumed sections are disposed; partially-eaten
   * ones keep falling and are left to normal physics.
   */
  vanishWithinRadius(center: THREE.Vector3, radius: number): void {
    const r2 = radius * radius;
    for (let i = this.active.length - 1; i >= 0; i--) {
      const c = this.active[i]!;
      const sphere = c.mesh.boundingSphere;
      if (sphere) {
        const cx = c.group.position.x + sphere.center.x;
        const cy = c.group.position.y + sphere.center.y;
        const cz = c.group.position.z + sphere.center.z;
        const dx = cx - center.x;
        const dy = cy - center.y;
        const dz = cz - center.z;
        const reach = sphere.radius + radius;
        if (dx * dx + dy * dy + dz * dz > reach * reach) continue;
      }

      this.tmpEuler.copy(c.group.rotation);
      let dirty = false;
      for (const b of c.blocks) {
        if (b.detached) continue;
        this.tmpVec.copy(b.localPos).applyEuler(this.tmpEuler);
        const wx = c.group.position.x + this.tmpVec.x;
        const wy = c.group.position.y + this.tmpVec.y;
        const wz = c.group.position.z + this.tmpVec.z;
        const bdx = wx - center.x;
        const bdy = wy - center.y;
        const bdz = wz - center.z;
        if (bdx * bdx + bdy * bdy + bdz * bdz > r2) continue;
        b.detached = true;
        c.remaining--;
        c.mesh.setMatrixAt(b.slot, HIDDEN_MATRIX);
        dirty = true;
      }
      if (dirty) {
        c.mesh.instanceMatrix.needsUpdate = true;
        this.computeContactProbes(c);
      }
      if (c.remaining <= 0) {
        this.dispose_chunk(c);
        this.active.splice(i, 1);
      }
    }
  }

  clear(): void {
    for (const c of this.active) {
      this.dispose_chunk(c);
    }
    this.active = [];
  }

  dispose(): void {
    this.clear();
    for (const bucket of this.meshPool.values()) {
      for (const mesh of bucket) mesh.dispose();
    }
    this.meshPool.clear();
    this.geom.dispose();
    this.material.dispose();
  }
}

/**
 * Group blocks into 6-connected components by quantizing their original
 * local positions to the voxel lattice (spacing = `step`). All scratch
 * state is module-level typed arrays — during a collapse dozens of
 * fractures run per frame and a Map-based version was hot.
 */
const SPLIT_CAP = 16384; // power of two, > max section size with low load
const SPLIT_MASK = SPLIT_CAP - 1;
const splitSlotToBlock = new Int32Array(SPLIT_CAP);
const splitKeys = new Int32Array(SPLIT_CAP);
let splitQx = new Int32Array(2048);
let splitQy = new Int32Array(2048);
let splitQz = new Int32Array(2048);
let splitVisited = new Uint8Array(2048);
const splitStack: number[] = [];

function splitCellKey(x: number, y: number, z: number): number {
  return (x + 512) + (y + 512) * 1024 + (z + 512) * 1024 * 1024;
}

/** Probe the open-addressed table for a cell key; -1 = absent. */
function splitLookup(key: number): number {
  let slot = key & SPLIT_MASK;
  for (;;) {
    const b = splitSlotToBlock[slot]!;
    if (b === -1) return -1;
    if (splitKeys[slot] === key) return b;
    slot = (slot + 1) & SPLIT_MASK;
  }
}

/** Generic over the block type (only reads `localPos`) — DragChunk reuses it
 *  for its partial-fracture split. Shared module scratch: callers must not
 *  interleave calls (single-threaded main loop only). */
export function splitConnectedComponents<T extends { localPos: THREE.Vector3 }>(
  blocks: T[],
  step: number,
): T[][] {
  const n = blocks.length;
  if (splitQx.length < n) {
    splitQx = new Int32Array(n * 2);
    splitQy = new Int32Array(n * 2);
    splitQz = new Int32Array(n * 2);
    splitVisited = new Uint8Array(n * 2);
  }
  splitSlotToBlock.fill(-1);
  splitVisited.fill(0, 0, n);
  const inv = 1 / step;
  // Quantize RELATIVE to the first block: neighbor offsets are exact step
  // multiples, so the rounded values sit near integers. Quantizing absolute
  // localPos put a centroid-centred even-sized body exactly on .5 boundaries,
  // where float noise split one rigid slab into disconnected slices.
  const p0 = blocks[0]!.localPos;
  for (let i = 0; i < n; i++) {
    const p = blocks[i]!.localPos;
    const x = Math.round((p.x - p0.x) * inv);
    const y = Math.round((p.y - p0.y) * inv);
    const z = Math.round((p.z - p0.z) * inv);
    splitQx[i] = x;
    splitQy[i] = y;
    splitQz[i] = z;
    const key = splitCellKey(x, y, z);
    let slot = key & SPLIT_MASK;
    while (splitSlotToBlock[slot] !== -1) slot = (slot + 1) & SPLIT_MASK;
    splitSlotToBlock[slot] = i;
    splitKeys[slot] = key;
  }
  const components: T[][] = [];
  for (let start = 0; start < n; start++) {
    if (splitVisited[start] === 1) continue;
    splitVisited[start] = 1;
    splitStack.length = 0;
    splitStack.push(start);
    const comp: T[] = [];
    while (splitStack.length > 0) {
      const i = splitStack.pop()!;
      comp.push(blocks[i]!);
      const x = splitQx[i]!;
      const y = splitQy[i]!;
      const z = splitQz[i]!;
      let j = splitLookup(splitCellKey(x + 1, y, z));
      if (j >= 0 && splitVisited[j] === 0) { splitVisited[j] = 1; splitStack.push(j); }
      j = splitLookup(splitCellKey(x - 1, y, z));
      if (j >= 0 && splitVisited[j] === 0) { splitVisited[j] = 1; splitStack.push(j); }
      j = splitLookup(splitCellKey(x, y + 1, z));
      if (j >= 0 && splitVisited[j] === 0) { splitVisited[j] = 1; splitStack.push(j); }
      j = splitLookup(splitCellKey(x, y - 1, z));
      if (j >= 0 && splitVisited[j] === 0) { splitVisited[j] = 1; splitStack.push(j); }
      j = splitLookup(splitCellKey(x, y, z + 1));
      if (j >= 0 && splitVisited[j] === 0) { splitVisited[j] = 1; splitStack.push(j); }
      j = splitLookup(splitCellKey(x, y, z - 1));
      if (j >= 0 && splitVisited[j] === 0) { splitVisited[j] = 1; splitStack.push(j); }
    }
    components.push(comp);
  }
  return components;
}

/**
 * Collapse showcase — the "same tower, three weapons" panel in the O GRZE
 * section. A second, self-contained mini-scene (its own canvas/renderer, like
 * the arsenal viewers) running the game's REAL destruction engine, so the page
 * literally proves that different weapons bring a building down different ways:
 *
 *   • Bazooka — one arcing rocket → a big crater low on the tower → the top
 *     shears off and topples.
 *   • Działko (gatling) — a rapid burst walks across a support band → the tower
 *     is drilled through and buckles.
 *   • C4 — one heavy blast at the base → the whole thing pancakes straight down.
 *
 * It loops build → fire → watch → rebuild, and you can click a chip to jump to a
 * weapon. Runs only while on screen (IntersectionObserver); the hero tower is
 * paused whenever this is in view, so just one physics sim runs at a time.
 */
import * as THREE from 'three';
import { Building } from '../engine/game/building/Building';
import { generateSkyscraper, SKY_GLASS_TINTS } from '../engine/game/building/cityBlocks';
import { BuildingController } from '../engine/game/building/BuildingController';
import { BigChunks } from '../engine/game/building/BigChunks';
import { Rubble } from '../engine/game/building/Rubble';
import { FlyingChunks } from '../engine/game/boss/FlyingChunks';
import type { VoxelCollider, DebrisSink } from '../engine/game/boss/FlyingChunks';
import { HitEffects } from '../engine/game/vfx/HitEffects';
import { ArcRocket } from './arcRocket';

/** A DIFFERENT-looking building than the hero's TALL BLUE tower: a shorter,
 *  warm AMBER/gold office block. Same light COARSE grid as the hero (~130k
 *  blocks at 8 floors) so it stays smooth — the FINE concrete slab was ~482k
 *  blocks and stuttered. */
const FLOORS = 8;
const ACCENT = 0xd8632a;                 // warm orange (hero accent is blue 0x2980b9)
const GLASS = SKY_GLASS_TINTS[7]!;        // gold glass tint (hero is blue glass)
const SWEEP_BUDGET = 4_000_000;   // one-shot sweep
const REMESH_BUDGET = 24;
const RUBBLE_DOWN_KICK = new THREE.Vector3(0, -4.5, 0);

/** Per-weapon carve radii (world metres). */
const R_BAZOOKA = 6.05;
const R_GATLING = 2.05;
const R_C4 = 9.2;

/** Weapon accent colours — match the demo's XP families (bazooka/gatling/c4). */
const WEAPON_COLORS = [0xff7a3c, 0x3fc4ec, 0x8ad63a];
const WEAPON_COUNT = 3;

/** Scripted timeline (seconds). Long, thorough teardowns so you actually SEE the
 *  whole thing come down each way — not one poke then a rebuild. */
const HOLD_INTACT = 0.9;    // beauty shot before firing
const MIN_SETTLE = 2.2;     // never reset before the collapse has visibly settled
const REBUILD_GAP = 0.6;    // blank beat before the next building
/** Orbit speed (rad/s). One FULL turn (2π) ≈ 14 s, so each weapon shows the
 *  collapse from every side before the building resets. */
const ORBIT_SPEED = 0.45;
const GATLING_INTERVAL = 0.07;

type Phase = 'intact' | 'firing' | 'watch' | 'gap';
type Shot = { at: number; kind: 'rocket' | 'c4'; x: number; y: number; z: number; r: number };

const _v = new THREE.Vector3();
const _toCam = new THREE.Vector3();
const _lat = new THREE.Vector3();
const _up = new THREE.Vector3(0, 1, 0);
const _tv = new THREE.Vector3();
const _dir = new THREE.Vector3();
const _yAxis = new THREE.Vector3(0, 1, 0);
const _origin = new THREE.Vector3();

/**
 * Muzzle tracers + explosion flashes for the showcase — the collapse engine
 * carves silently, so without these you can't SEE the gatling firing or the C4
 * going off. Cheap additive pools (no shadow maps, no per-frame allocation).
 */
class ShowcaseFx {
  private readonly tracers: THREE.Mesh[] = [];
  private readonly tLife: number[] = [];
  private tCur = 0;
  private readonly blasts: THREE.Mesh[] = [];
  private readonly bLife: number[] = [];
  private readonly bMax: number[] = [];
  private readonly bSize: number[] = [];
  private bCur = 0;

  constructor(scene: THREE.Scene) {
    const tgeo = new THREE.CylinderGeometry(0.16, 0.16, 1, 6);
    for (let i = 0; i < 18; i++) {
      const m = new THREE.Mesh(tgeo, new THREE.MeshBasicMaterial({
        color: 0x9ff0ff, transparent: true, opacity: 0,
        blending: THREE.AdditiveBlending, depthWrite: false,
      }));
      m.visible = false; this.tracers.push(m); this.tLife.push(0); scene.add(m);
    }
    const bgeo = new THREE.SphereGeometry(1, 16, 12);
    for (let i = 0; i < 6; i++) {
      const m = new THREE.Mesh(bgeo, new THREE.MeshBasicMaterial({
        color: 0xffc266, transparent: true, opacity: 0,
        blending: THREE.AdditiveBlending, depthWrite: false,
      }));
      m.visible = false; this.blasts.push(m); this.bLife.push(0); this.bMax.push(1); this.bSize.push(1); scene.add(m);
    }
  }

  tracer(from: THREE.Vector3, to: THREE.Vector3, color = 0x9ff0ff): void {
    const i = this.tCur; this.tCur = (this.tCur + 1) % this.tracers.length;
    const m = this.tracers[i]!;
    _tv.subVectors(to, from);
    const len = _tv.length() || 0.01;
    m.position.copy(from).addScaledVector(_tv, 0.5);
    m.quaternion.setFromUnitVectors(_yAxis, _tv.normalize());
    m.scale.set(1, len, 1);
    (m.material as THREE.MeshBasicMaterial).color.setHex(color);
    (m.material as THREE.MeshBasicMaterial).opacity = 0.95;
    m.visible = true;
    this.tLife[i] = 0.09;
  }

  blast(point: THREE.Vector3, size: number, color = 0xffb04a): void {
    const i = this.bCur; this.bCur = (this.bCur + 1) % this.blasts.length;
    const m = this.blasts[i]!;
    m.position.copy(point);
    m.scale.setScalar(size * 0.3);
    (m.material as THREE.MeshBasicMaterial).color.setHex(color);
    (m.material as THREE.MeshBasicMaterial).opacity = 0.9;
    m.visible = true;
    this.bLife[i] = 0.45; this.bMax[i] = 0.45; this.bSize[i] = size;
  }

  update(dt: number): void {
    for (let i = 0; i < this.tracers.length; i++) {
      if (this.tLife[i]! <= 0) continue;
      this.tLife[i]! -= dt;
      const m = this.tracers[i]!;
      if (this.tLife[i]! <= 0) { m.visible = false; continue; }
      (m.material as THREE.MeshBasicMaterial).opacity = (this.tLife[i]! / 0.09) * 0.95;
    }
    for (let i = 0; i < this.blasts.length; i++) {
      if (this.bLife[i]! <= 0) continue;
      this.bLife[i]! -= dt;
      const m = this.blasts[i]!;
      if (this.bLife[i]! <= 0) { m.visible = false; continue; }
      const t = 1 - this.bLife[i]! / this.bMax[i]!; // 0→1
      m.scale.setScalar(this.bSize[i]! * (0.3 + t * 0.95));
      (m.material as THREE.MeshBasicMaterial).opacity = (1 - t) * 0.9;
    }
  }
}

export class CollapseShowcase {
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene = new THREE.Scene();
  private readonly camera: THREE.PerspectiveCamera;
  private readonly flyingChunks: FlyingChunks;
  private readonly bigChunks: BigChunks;
  private readonly rubble: Rubble;
  private readonly hitFx: HitEffects;
  private readonly rockets: ArcRocket;
  private readonly fx: ShowcaseFx;
  private readonly gatRay = new THREE.Raycaster();

  private building!: Building;
  private controller!: BuildingController;
  private readonly gen0 = generateSkyscraper(0, 0, FLOORS, ACCENT, GLASS);
  private readonly cfg = this.gen0.config;
  private firstSpawn = true;
  private readonly center = new THREE.Vector3();
  private readonly heightM: number;
  private readonly halfW: number;
  private readonly halfD: number;
  private readonly framingDist: number;

  private weapon = 0;
  private nextWeapon = 0;
  private level = 2; // fixed at LVL 2 (no in-page level switch on the showcase)
  private phase: Phase = 'intact';
  private phaseT = 0;
  private orbit = 0.6;
  private turnAccum = 0; // radians orbited since this weapon's showcase began
  private shake = 0;
  // firing schedule (bazooka rockets / C4 blasts fired over several seconds)
  private shots: Shot[] = [];
  private shotIdx = 0;
  private fireT = 0;
  private fireEnd = 0;
  // gatling sustained burst (multi-pass drilling)
  private burstT = 0;
  private gatIdx = 0;
  private gatTotal = 0;

  private rubbleTimer = 0;
  private rubbleForceTimer = 0;
  private running = false;
  private prevT = 0;
  private readonly reduced: boolean;

  constructor(private readonly canvas: HTMLCanvasElement, private readonly onWeapon?: (i: number) => void) {
    this.reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.scene.background = null; // CSS paints the light stage behind it

    const cfg = this.cfg;
    this.heightM = cfg.height * cfg.blockSize;
    this.halfW = (cfg.width * cfg.blockSize) / 2;
    this.halfD = (cfg.depth * cfg.blockSize) / 2;
    // Wide slab: frame by whichever dimension is bigger (width usually wins).
    this.framingDist = Math.max(this.heightM, this.halfW * 2) * 1.75;
    this.center.set(0, this.heightM * 0.5, 0);

    this.hitFx = new HitEffects(this.scene);
    this.flyingChunks = new FlyingChunks(this.scene);
    this.bigChunks = new BigChunks(this.scene);
    this.rockets = new ArcRocket(this.scene);
    this.fx = new ShowcaseFx(this.scene);
    this.rubble = new Rubble(
      this.scene, cfg.blockSize, Math.max(this.halfW, this.halfD) + 10, this.heightM + 2, 0, 0,
    );

    const buildingCollider: VoxelCollider = {
      isOccupied: (x, y, z) => this.building.cluster.isOccupied(x, y, z),
    };
    const worldCollider: VoxelCollider = {
      isOccupied: (x, y, z) =>
        this.building.cluster.isOccupied(x, y, z) || this.rubble.isOccupied(x, y, z),
    };
    const debrisSink: DebrisSink = { settle: (p, s, c) => this.rubble.settle(p, s, c) };
    this.rubble.setExternalCollider(buildingCollider);
    this.flyingChunks.setWorldCollider(worldCollider);
    this.flyingChunks.setDebrisSink(debrisSink);
    this.bigChunks.setWorldCollider(worldCollider);
    this.bigChunks.setRubbleSink(debrisSink);
    this.bigChunks.setImpactDamager((p, r) => this.controller.applyExplosion(p, r));

    this.spawnBuilding();
    this.buildLights();
    this.scene.add(this.makeGround());
    this.camera = new THREE.PerspectiveCamera(42, 1, 0.5, 2000);

    this.resize();
    new ResizeObserver(() => this.resize()).observe(canvas);
    new IntersectionObserver((es) => {
      if (es[0]!.isIntersecting) this.start(); else this.stop();
    }, { threshold: 0.12 }).observe(canvas);

    this.announce();
  }

  /** Jump to a weapon immediately (from the legend chips): fresh building, that
   *  weapon's teardown starts right away — no waiting for the current cycle. */
  pick(i: number): void {
    this.weapon = ((i % WEAPON_COUNT) + WEAPON_COUNT) % WEAPON_COUNT;
    this.nextWeapon = (this.weapon + 1) % WEAPON_COUNT;
    this.restart();
  }

  /** Set the weapon level (1–3) and replay the current weapon at that power. */
  setLevel(n: number): void {
    this.level = Math.max(1, Math.min(3, n));
    this.restart();
  }

  private restart(): void {
    this.shots = []; this.shotIdx = 0; this.fireT = 0; this.gatIdx = 0; this.gatTotal = 0;
    this.turnAccum = 0; // start a fresh full turn for the picked weapon
    this.announce();
    this.rebuild();
    this.setPhase('intact');
  }

  /** Radius/shot multiplier for the current level (L1 1.0 → L3 ~1.56). */
  private lvlMul(): number { return 1 + (this.level - 1) * 0.28; }

  // ── build ──────────────────────────────────────────────────────────────────
  private spawnBuilding(): void {
    // Reuse the block list generated at construction for the first spawn; regen
    // afterwards (deterministic → identical building each cycle).
    const gen = this.firstSpawn ? this.gen0 : generateSkyscraper(0, 0, FLOORS, ACCENT, GLASS);
    this.firstSpawn = false;
    this.building = new Building(gen.config, gen.blocks);
    this.scene.add(this.building.group);
    this.controller = new BuildingController(this.building, this.flyingChunks, this.bigChunks, this.hitFx);
    this.controller.setSweepBudget(SWEEP_BUDGET);
  }

  private rebuild(): void {
    this.flyingChunks.clear();
    this.bigChunks.clear();
    this.rubble.clear();
    this.scene.remove(this.building.group);
    this.building.dispose();
    this.spawnBuilding();
  }

  private buildLights(): void {
    const hemi = new THREE.HemisphereLight(0xdfeaff, 0xb7b0a4, 1.05);
    const key = new THREE.DirectionalLight(0xfff4e2, 1.25);
    key.position.set(-24, 48, 34);
    const rim = new THREE.DirectionalLight(0xce5a30, 0.3);
    rim.position.set(34, 14, -22);
    this.scene.add(hemi, key, rim);
  }

  private makeGround(): THREE.Mesh {
    const g = new THREE.Mesh(
      new THREE.PlaneGeometry(600, 600),
      new THREE.MeshLambertMaterial({ color: 0xd8d2c6 }),
    );
    g.rotation.x = -Math.PI / 2;
    return g;
  }

  // ── run loop ─────────────────────────────────────────────────────────────
  private start(): void {
    if (this.running) return;
    this.running = true;
    this.prevT = performance.now();
    this.renderer.setAnimationLoop(() => this.frame());
  }

  private stop(): void {
    this.running = false;
    this.renderer.setAnimationLoop(null);
  }

  private frame(): void {
    const now = performance.now();
    const dt = Math.min((now - this.prevT) / 1000, 0.05);
    this.prevT = now;

    this.controller.update(dt);
    this.bigChunks.update(dt, this.flyingChunks);
    this.flyingChunks.update(dt);
    this.rubble.decayTick(dt);
    this.driveRubbleGravity(dt);
    this.rubble.flushDirty();
    this.hitFx.update(dt);
    this.rockets.update(dt);
    this.fx.update(dt);
    this.building.cluster.flushUploads(REMESH_BUDGET);

    if (!this.reduced) this.driveScript(dt);
    this.driveGatling(dt);
    this.driveCamera(dt);
    this.renderer.render(this.scene, this.camera);
  }

  private driveRubbleGravity(dt: number): void {
    this.rubbleTimer += dt;
    this.rubbleForceTimer += dt;
    if (this.rubbleTimer < 0.1) return;
    this.rubbleTimer = 0;
    const force = this.rubbleForceTimer >= 0.5;
    if (force) this.rubbleForceTimer = 0;
    const falling = this.rubble.collectUnsupported(3000, force);
    if (falling.length > 0) {
      this.flyingChunks.spawn(falling, falling[0]!.worldPosition, 0.8, undefined, RUBBLE_DOWN_KICK);
    }
  }

  // ── weapon script ──────────────────────────────────────────────────────────
  private driveScript(dt: number): void {
    this.phaseT += dt;
    switch (this.phase) {
      case 'intact':
        if (this.phaseT >= HOLD_INTACT) { this.planFire(); this.setPhase('firing'); }
        break;
      case 'firing':
        this.fireT += dt;
        // Fire scheduled rockets/C4 charges as their time comes.
        while (this.shotIdx < this.shots.length && this.fireT >= this.shots[this.shotIdx]!.at) {
          this.execShot(this.shots[this.shotIdx]!);
          this.shotIdx++;
        }
        // Done firing (all shots away + gatling burst spent + a short tail) →
        // let the collapse finish before rebuilding.
        if (this.fireT >= this.fireEnd && this.gatIdx >= this.gatTotal) this.setPhase('watch');
        break;
      case 'watch':
        // Reset only after a FULL 360° orbit of the (collapsed) building, so the
        // rubble is shown from every side — and never before it has settled.
        if (this.turnAccum >= Math.PI * 2 && this.phaseT >= MIN_SETTLE) {
          this.rebuild(); this.setPhase('gap');
        }
        break;
      case 'gap':
        if (this.phaseT >= REBUILD_GAP) {
          this.weapon = this.nextWeapon;
          this.nextWeapon = (this.weapon + 1) % WEAPON_COUNT;
          this.announce();
          this.turnAccum = 0; // fresh full turn for the next weapon
          this.setPhase('intact');
        }
        break;
    }
  }

  private setPhase(p: Phase): void { this.phase = p; this.phaseT = 0; }

  private announce(): void { this.onWeapon?.(this.weapon); }

  /** Aim point on the camera-facing side: inset just behind the near face, then
   *  spread `lat` metres along screen-horizontal and set the height `y`. */
  private aim(lat: number, y: number): THREE.Vector3 {
    _toCam.set(this.camera.position.x - this.center.x, 0, this.camera.position.z - this.center.z).normalize();
    _lat.crossVectors(_up, _toCam).normalize(); // world dir that reads as screen-horizontal
    const inset = Math.min(this.halfW, this.halfD) * 0.55;
    return new THREE.Vector3(
      this.center.x + _toCam.x * inset + _lat.x * lat,
      y,
      this.center.z + _toCam.z * inset + _lat.z * lat,
    );
  }

  /** Build the (long) firing plan for the current weapon. */
  private planFire(): void {
    this.shots = [];
    this.shotIdx = 0;
    this.fireT = 0;
    this.gatIdx = 0;
    this.gatTotal = 0;
    const H = this.heightM;
    const w = this.halfW;
    const m = this.lvlMul(); // higher level → bigger craters + more shots

    if (this.weapon === 0) {
      // Bazooka: six rockets walk low→mid across the slab and bring it down.
      const plan: [number, number, number][] = [
        [0.0, -0.62 * w, H * 0.26], [0.85, 0.62 * w, H * 0.26], [1.7, 0.0, H * 0.30],
        [2.55, -0.42 * w, H * 0.52], [3.4, 0.42 * w, H * 0.52], [4.25, 0.0, H * 0.24],
      ];
      for (const [at, lat, y] of plan) {
        const t = this.aim(lat, y);
        this.shots.push({ at, kind: 'rocket', x: t.x, y: t.y, z: t.z, r: R_BAZOOKA * m });
      }
      this.fireEnd = 5.4;
    } else if (this.weapon === 1) {
      // Gatling: a sustained burst that drills passes down the slab.
      this.gatTotal = 40 + this.level * 8; // more rounds at higher level
      this.burstT = 0;
      this.fireEnd = this.gatTotal * GATLING_INTERVAL + 0.6;
    } else {
      // C4: charges around the base + mid → a straight-down pancake.
      const plan: [number, number, number][] = [
        [0.0, -0.55 * w, 3], [0.75, 0.55 * w, 3], [1.5, 0.0, 3],
        [2.25, -0.32 * w, H * 0.42], [3.0, 0.32 * w, H * 0.42],
      ];
      for (const [at, lat, y] of plan) {
        const t = this.aim(lat, y);
        this.shots.push({ at, kind: 'c4', x: t.x, y: t.y, z: t.z, r: R_C4 * m });
      }
      this.fireEnd = 4.2;
    }
  }

  private execShot(s: Shot): void {
    _v.set(s.x, s.y, s.z);
    if (s.kind === 'rocket') {
      // Fresh camera-facing direction so the rocket arcs in from the visible side.
      _toCam.set(this.camera.position.x - this.center.x, 0, this.camera.position.z - this.center.z).normalize();
      const from = _v.clone().addScaledVector(_toCam, 22).setY(this.heightM * 0.95 + 6);
      this.rockets.launch(from, _v.clone(), (p) => {
        this.controller.applyExplosion(p, s.r);
        this.fx.blast(p, s.r * 1.15, 0xffb046);
        this.shake = Math.min(this.shake + 1.3, 1.9);
      });
    } else {
      // C4: a big bright fireball so the blast is unmistakable.
      this.controller.applyExplosion(_v.clone(), s.r);
      this.fx.blast(_v.clone(), s.r * 1.25, 0xffcf5a);
      this.hitFx.burst(_v.clone(), WEAPON_COLORS[2]!, 28);
      this.shake = Math.min(this.shake + 1.4, 2.0);
    }
  }

  /** Consume the gatling burst over several frames: three passes drill down the
   *  slab (high → low), sawing it through so it buckles and drops. */
  private driveGatling(dt: number): void {
    if (this.gatIdx >= this.gatTotal) return;
    this.burstT -= dt;
    if (this.burstT > 0) return;
    this.burstT = GATLING_INTERVAL;
    const perPass = this.gatTotal / 3;
    const pass = Math.min(2, Math.floor(this.gatIdx / perPass));
    const yFrac = [0.52, 0.36, 0.2][pass]!;
    const within = (this.gatIdx % perPass) / (perPass - 1); // 0..1 across the slab
    const dir = pass % 2 === 0 ? 1 : -1;
    const lat = (within * 2 - 1) * dir * this.halfW * 0.82;
    const ty = this.heightM * yFrac + (Math.random() - 0.5) * 2;
    const aimPt = this.aim(lat, ty);
    // Shooter out front at the SAME height → horizontal shot. Then RAYCAST to the
    // building surface so the tracer STOPS at the wall and carves the facade —
    // no more beam flying through the walls.
    _origin.copy(this.center).addScaledVector(_toCam, this.framingDist * 0.5);
    _origin.y = ty;
    _dir.subVectors(aimPt, _origin).normalize();
    this.gatRay.set(_origin, _dir);
    this.gatRay.far = this.framingDist * 2;
    const hit = this.gatRay.intersectObjects(this.building.cluster.surfaceMeshes(), false)[0];
    const impact = hit ? hit.point : aimPt;
    this.controller.applyExplosion(impact, R_GATLING * this.lvlMul());
    this.fx.tracer(_origin, impact, 0xa8f4ff);
    this.hitFx.burst(impact, WEAPON_COLORS[1]!, 10);
    this.shake = Math.min(this.shake + 0.18, 1.0);
    this.gatIdx++;
  }

  // ── view ─────────────────────────────────────────────────────────────────
  private driveCamera(dt: number): void {
    const d = dt * ORBIT_SPEED;
    this.orbit += d;
    this.turnAccum += d; // count toward the full-turn-before-reset
    const dist = this.framingDist;
    let sx = 0; let sy = 0;
    if (this.shake > 0) {
      this.shake = Math.max(0, this.shake - dt * 2.4);
      const a = this.shake * this.shake;
      sx = Math.sin(performance.now() * 0.06) * a * 1.1;
      sy = Math.cos(performance.now() * 0.071) * a * 0.9;
    }
    this.camera.position.set(
      this.center.x + Math.sin(this.orbit) * dist + sx,
      this.heightM * 0.6 + sy,
      this.center.z + Math.cos(this.orbit) * dist,
    );
    _v.set(this.center.x, this.heightM * 0.42, this.center.z);
    this.camera.lookAt(_v);
  }

  private resize(): void {
    const w = this.canvas.clientWidth || 1;
    const h = this.canvas.clientHeight || 1;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }
}

/** Boot the O GRZE collapse showcase (canvas + weapon chips). */
export function mountCollapseShowcase(): void {
  const canvas = document.querySelector<HTMLCanvasElement>('canvas.collapse-canvas');
  if (!canvas) return;
  const chips = [...document.querySelectorAll<HTMLButtonElement>('.cs-chip')];
  const show = new CollapseShowcase(canvas, (i) => {
    chips.forEach((c, ci) => c.classList.toggle('is-on', ci === i));
  });
  chips.forEach((chip, i) => chip.addEventListener('click', () => show.pick(i)));
}

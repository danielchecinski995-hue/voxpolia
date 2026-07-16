/**
 * LiveBuilding hero — the EXACT game tower under interactive fire.
 *
 * Runs the game's real destruction engine (vendored under engine/game): the
 * building is the game's `Building` (greedy-meshed `BuildingCluster`, ~2.3M
 * blocks), and impacts go through `BuildingController.applyExplosion`, so the
 * collapse is the game's — Integrity cascade → connected components → BigChunks
 * rigid sections → FlyingChunks debris → Rubble, with falling sections carving
 * what they land on (pancake). No worker/SAB: the sweep runs time-sliced on the
 * main thread (the game's own fallback path).
 *
 * Interaction: the camera orbits the tower; aim with the mouse; left-click fires
 * a LVL-2 rocket that arcs in from a random up-left/up-right and detonates where
 * you aimed. No weapon is shown.
 */
import * as THREE from 'three';
import type { App, UpdateCtx } from '../core/app';
import { Building } from '../engine/game/building/Building';
import { generateSkyscraper } from '../engine/game/building/cityBlocks';
import { BuildingController } from '../engine/game/building/BuildingController';
import { BigChunks } from '../engine/game/building/BigChunks';
import { Rubble } from '../engine/game/building/Rubble';
import { FlyingChunks } from '../engine/game/boss/FlyingChunks';
import type { VoxelCollider, DebrisSink } from '../engine/game/boss/FlyingChunks';
import { HitEffects } from '../engine/game/vfx/HitEffects';
import { ArcRocket } from './arcRocket';

/** LVL-2 bazooka carve radius in world metres (game: base 4.32 × craterMul 1.4). */
const ROCKET_RADIUS = 6.05;
/** Dirty-chunk remeshes budgeted per frame (collapse storms spread over frames). */
const REMESH_BUDGET = 24;
const REGEN_DELAY = 4.5;
/** The demo's tall office tower (COARSE 0.2625m grid — ~200k blocks, so it runs
 *  fast and the collapse is snappy, unlike the 2.3M fine tower). */
const FLOORS = 11;
const ACCENT = 0x2980b9; // demo VIVID_ACCENTS blue
/** Single lightweight building → finish the structural sweep in ONE frame
 *  instead of time-slicing it, so the collapse fires without the delay. */
const SWEEP_BUDGET = 4_000_000;
/** Manual orbit speed while a rotate button is held. */
const ROTATE_SPEED = 0.8;
/** Small downward kick when unsupported rubble is re-dropped (game value). */
const RUBBLE_DOWN_KICK = new THREE.Vector3(0, -4.5, 0);

const _fwd = new THREE.Vector3();
const _right = new THREE.Vector3();
const _up = new THREE.Vector3(0, 1, 0);
const _look = new THREE.Vector3();

export class LiveBuilding {
  private building!: Building;
  private controller!: BuildingController;
  private readonly flyingChunks: FlyingChunks;
  private readonly bigChunks: BigChunks;
  private readonly rubble: Rubble;
  private readonly hitFx: HitEffects;
  private readonly rockets: ArcRocket;
  private readonly gen0 = generateSkyscraper(0, 0, FLOORS, ACCENT);
  private readonly cfg = this.gen0.config;
  private firstSpawn = true;
  private readonly center = new THREE.Vector3();
  private readonly reduced: boolean;

  private orbit = 0.5;
  private rotDir = 0; // -1/0/+1 while a rotate button is held (no auto-spin)
  private shake = 0;
  private emptyTimer = -1;
  private rebuilding = false;
  private rubbleTimer = 0;
  private rubbleForceTimer = 0;

  private readonly ray = new THREE.Raycaster();
  private readonly ndc = new THREE.Vector2();
  private downX = 0; private downY = 0; private downT = 0;

  constructor(private readonly app: App) {
    this.reduced = app.prefersReducedMotion;
    this.hitFx = new HitEffects(app.scene);
    this.flyingChunks = new FlyingChunks(app.scene);
    this.bigChunks = new BigChunks(app.scene);

    const cfg = this.cfg;
    const heightM = cfg.height * cfg.blockSize;
    const halfW = (cfg.width * cfg.blockSize) / 2;
    const halfD = (cfg.depth * cfg.blockSize) / 2;
    const rubbleHalf = Math.max(halfW, halfD) + 10;
    this.rubble = new Rubble(
      app.scene, cfg.blockSize, rubbleHalf, heightM + 2, cfg.originX ?? 0, cfg.originZ ?? 0,
    );

    // Colliders/sinks read the LIVE building so they survive a rebuild.
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
    // Falling sections punch what they land on → the game's pancake cascade.
    this.bigChunks.setImpactDamager((point, radius) =>
      this.controller.applyExplosion(point, radius));

    this.spawnBuilding(); // heavy synchronous greedy-mesh construction
    this.center.set(cfg.originX ?? 0, heightM * 0.5, cfg.originZ ?? 0);

    this.rockets = new ArcRocket(app.scene);
    this.buildLights();
    app.scene.add(this.makeGround());

    // Listen on window, NOT the canvas: the canvas sits behind the DOM overlay
    // (z-index), so clicks in the hero area land on <main>, never the canvas.
    window.addEventListener('pointerdown', this.onDown);
    window.addEventListener('pointerup', this.onUp);
    this.bindRotateButton('rot-left', 1);
    this.bindRotateButton('rot-right', -1);
    const resetBtn = document.getElementById('btn-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => { if (!this.rebuilding) this.rebuild(); });
    }
    app.onUpdate(this.update);
  }

  // ── build / rebuild ───────────────────────────────────────────────────────

  private spawnBuilding(): void {
    // Reuse the block list built at construction for the first tower; on regen
    // regenerate (the generator is deterministic, so it comes back identical).
    const gen = this.firstSpawn ? this.gen0 : generateSkyscraper(0, 0, FLOORS, ACCENT);
    this.firstSpawn = false;
    this.building = new Building(gen.config, gen.blocks);
    this.app.scene.add(this.building.group);
    this.controller = new BuildingController(
      this.building, this.flyingChunks, this.bigChunks, this.hitFx,
    );
    this.controller.setSweepBudget(SWEEP_BUDGET); // one-shot sweep, no delay
  }

  /** Wipe debris + the gutted tower and build a fresh one (brief hitch, so we
   *  flash the loader). Keeps the site replayable. */
  private rebuild(): void {
    this.rebuilding = true;
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('show');
    // Two frames so the loader actually paints before the blocking construct.
    requestAnimationFrame(() => requestAnimationFrame(() => {
      this.flyingChunks.clear();
      this.bigChunks.clear();
      this.rubble.clear();
      this.app.scene.remove(this.building.group);
      this.building.dispose();
      this.spawnBuilding();
      if (loader) loader.classList.remove('show');
      this.emptyTimer = -1;
      this.rebuilding = false;
    }));
  }

  // ── setup ─────────────────────────────────────────────────────────────────

  private buildLights(): void {
    // Bright day: strong sky fill so the light backdrop reads as daylight.
    const hemi = new THREE.HemisphereLight(0xdfeaff, 0xb7b0a4, 1.0);
    const key = new THREE.DirectionalLight(0xfff4e2, 1.2);
    key.position.set(-30, 55, 40);
    const rim = new THREE.DirectionalLight(0xce5a30, 0.28);
    rim.position.set(40, 16, -25);
    this.app.scene.add(hemi, key, rim);
  }

  private makeGround(): THREE.Mesh {
    const g = new THREE.Mesh(
      new THREE.PlaneGeometry(800, 800),
      new THREE.MeshLambertMaterial({ color: 0xc8c2b8 }),
    );
    g.rotation.x = -Math.PI / 2;
    return g;
  }

  // ── interaction ─────────────────────────────────────────────────────────────

  private bindRotateButton(id: string, dir: number): void {
    const btn = document.getElementById(id);
    if (!btn) return;
    const start = (e: Event): void => { e.preventDefault(); this.rotDir = dir; };
    const stop = (): void => { if (this.rotDir === dir) this.rotDir = 0; };
    btn.addEventListener('pointerdown', start);
    btn.addEventListener('pointerup', stop);
    btn.addEventListener('pointerleave', stop);
    btn.addEventListener('pointercancel', stop);
  }

  private onDown = (e: PointerEvent): void => {
    this.downX = e.clientX; this.downY = e.clientY; this.downT = performance.now();
  };

  private onUp = (e: PointerEvent): void => {
    if (e.button !== 0 || this.rebuilding) return;
    // Ignore clicks on real UI (nav links, CTA buttons) and clicks made once
    // the page has scrolled past the hero — those aren't "aim at the tower".
    const el = e.target as HTMLElement | null;
    if (el && el.closest('a, button')) return;
    if (window.scrollY > window.innerHeight * 0.6) return;
    if (Math.hypot(e.clientX - this.downX, e.clientY - this.downY) > 12) return;
    if (performance.now() - this.downT > 500) return;
    this.ndc.set(
      (e.clientX / window.innerWidth) * 2 - 1,
      -(e.clientY / window.innerHeight) * 2 + 1,
    );
    this.ray.setFromCamera(this.ndc, this.app.camera);
    const hit = this.ray.intersectObjects(this.building.cluster.surfaceMeshes(), false)[0];
    if (!hit) return;
    const target = hit.point.clone();
    // Invisible left/right split: a shot at the LEFT half of the tower launches
    // from the left, a shot at the RIGHT half from the right. Origin is a random
    // spot on that side, in front (toward the camera) at street→mid-building
    // height, so the rocket rises from below into the target.
    const cam = this.app.camera.position;
    _fwd.subVectors(this.center, cam).normalize();      // into the screen
    _right.crossVectors(_fwd, _up).normalize();          // world dir that reads as screen-LEFT
    const rel = new THREE.Vector3().subVectors(target, this.center);
    const side = -_right.dot(rel) >= 0 ? 1 : -1;         // +1 = clicked the right half
    const toCam = _fwd.clone().multiplyScalar(-1);        // horizontal toward the viewer
    const halfH = this.center.y;                          // half the building height
    const from = new THREE.Vector3().copy(target)
      .addScaledVector(_right, -side * (16 + Math.random() * 14)) // push to the hit side
      .addScaledVector(toCam, 14 + Math.random() * 10);           // in front of the tower
    from.y = 2 + Math.random() * Math.max(halfH - 2, 4);          // ground → max half height
    this.rockets.launch(from, target, (p) => {
      this.controller.applyExplosion(p, ROCKET_RADIUS);
      this.shake = Math.min(this.shake + 1.1, 1.7);
    });
  };

  // ── loop ──────────────────────────────────────────────────────────────────

  private update = ({ dt, elapsed, camera }: UpdateCtx): void => {
    this.controller.update(dt);
    this.bigChunks.update(dt, this.flyingChunks);
    this.flyingChunks.update(dt);
    this.rubble.decayTick(dt);
    if (!this.rebuilding) this.driveRubbleGravity(dt);
    // Upload the pile's dirty instances to the GPU — WITHOUT this, blocks that
    // rubble gravity just removed stay drawn (floating), and freshly settled
    // rubble never appears at its real spot (the game's City.flushRubble does
    // this every frame; FlyingChunks self-flushes, Rubble does not).
    this.rubble.flushDirty();
    this.hitFx.update(dt);
    this.rockets.update(dt);
    this.building.cluster.flushUploads(REMESH_BUDGET);

    if (!this.reduced && !this.rebuilding) this.driveRegen(dt);
    this.driveCamera(dt, elapsed, camera);
  };

  /** Rubble gravity: settled cubes whose support was just destroyed fall
   *  instead of floating (the game's per-frame `collectUnsupported`). */
  private driveRubbleGravity(dt: number): void {
    this.rubbleTimer += dt;
    this.rubbleForceTimer += dt;
    if (this.rubbleTimer < 0.1) return;
    this.rubbleTimer = 0;
    const force = this.rubbleForceTimer >= 0.5; // periodic full re-check
    if (force) this.rubbleForceTimer = 0;
    const falling = this.rubble.collectUnsupported(3000, force);
    if (falling.length > 0) {
      this.flyingChunks.spawn(falling, falling[0]!.worldPosition, 0.8, undefined, RUBBLE_DOWN_KICK);
    }
  }

  private driveRegen(dt: number): void {
    if (this.emptyTimer >= 0) {
      this.emptyTimer -= dt;
      if (this.emptyTimer <= 0) this.rebuild();
      return;
    }
    if (this.building.isDestroyed()) this.emptyTimer = REGEN_DELAY;
  }

  private driveCamera(dt: number, elapsed: number, camera: THREE.PerspectiveCamera): void {
    // No auto-spin: the building only turns while a rotate button is held.
    this.orbit += this.rotDir * ROTATE_SPEED * dt;
    // Phone portrait: stack the tower UNDER the hero copy (centered, in the
    // lower half) instead of beside it — pull back and aim high so the whole
    // building drops into the bottom of the frame. Landscape keeps it on the
    // right, clear of the text.
    const portrait = window.innerWidth <= 720;
    // Portrait: pull back so the WHOLE tower is small enough to leave margins
    // above (hero copy) and below (controls) — nothing overlaps it.
    const dist = portrait ? 150 : 66;
    const camY = portrait ? this.center.y + 6 : this.center.y + 4;
    let sx = 0; let sy = 0;
    if (this.shake > 0) {
      this.shake = Math.max(0, this.shake - dt * 2.2);
      const a = this.shake * this.shake;
      sx = Math.sin(elapsed * 60) * a * 1.4;
      sy = Math.cos(elapsed * 71) * a * 1.1;
    }
    camera.position.set(
      this.center.x + Math.sin(this.orbit) * dist + sx,
      camY + sy,
      this.center.z + Math.cos(this.orbit) * dist,
    );
    if (portrait) {
      // Horizontally centered; aim above center so the tower sits in the lower
      // band with a gap under the hero copy and footroom above the controls.
      _look.set(this.center.x, this.center.y * 1.7, this.center.z);
    } else {
      // Pan the tower further RIGHT so it clears the hero copy.
      _fwd.subVectors(this.center, camera.position).normalize();
      _right.crossVectors(_fwd, _up).normalize();
      _look.copy(this.center).addScaledVector(_right, -24);
    }
    camera.lookAt(_look);
  }
}

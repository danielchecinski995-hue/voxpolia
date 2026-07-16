/**
 * HERO scene — one real game building under fire. A volley of three LVL-2
 * rockets streaks in and hits the ground storey; each is a genuine
 * {@link VoxelSim.applyImpact} + structural sweep, so — exactly like the game
 * — a single rocket is only a local hole, and the tower comes down only once
 * the storey's columns are cut and the floors above pancake. Then it rebuilds
 * and the loop repeats. Tap anywhere to fire your own impact.
 *
 * Reduced-motion users get a still building, no rockets.
 */
import * as THREE from 'three';
import type { App, UpdateCtx } from '../core/app';
import { VoxelSim } from '../engine/VoxelSim';
import { makeGameBuilding, type BuildingPlacement } from './gameBuilding';
import { Debris } from './debris';
import { RocketFX } from './rockets';
import { FallingChunks } from './fallingChunks';

const VS = 1;
const IDLE_TIME = 2.2; // stand intact before the next volley
const WAIT_TIME = 3.0; // rubble sits before rebuild
const RISE_TIME = 1.7;
const ROCKET_GAP = 0.85; // seconds between rockets in a volley

// Material → colour, straight from the game's Building.ts palette (warmed a
// touch to sit on the dark page): foundation/body/window/roof/slab/column/glass.
const MAT_COLORS = [0x45403a, 0xbcb3a3, 0x4a8eaf, 0x6a4a34, 0x9c9488, 0x8a8378, 0x9fd4ef];

type Phase = 'idle' | 'volley' | 'wait' | 'regen';

const _c = new THREE.Color();
const _m = new THREE.Matrix4();
const _q = new THREE.Quaternion();
const _s = new THREE.Vector3();
const _p = new THREE.Vector3();
const _ray = new THREE.Raycaster();
const _ndc = new THREE.Vector2();

export class Hero {
  private readonly sim: VoxelSim;
  private readonly place: BuildingPlacement;
  private readonly mesh: THREE.InstancedMesh;
  private readonly debris: Debris;
  private readonly rockets: RocketFX;
  private readonly chunks: FallingChunks;
  private readonly origin: THREE.Vector3;
  private readonly center: THREE.Vector3;
  private readonly reduced: boolean;

  private dirty = true;
  private settling = false;
  private readonly detached: number[] = [];
  private readonly carved: number[] = [];

  private riseOffset = 0;

  private phase: Phase = 'idle';
  private phaseT = IDLE_TIME;
  private volleyT = 0;
  private volleyFired = 0;

  private shake = 0;
  private sway = 0;

  constructor(private readonly app: App) {
    this.reduced = app.prefersReducedMotion;
    const built = makeGameBuilding();
    this.sim = new VoxelSim(built.desc);
    this.place = built.place;
    this.origin = new THREE.Vector3((-this.sim.sizeX / 2) * VS, 0, (-this.sim.sizeZ / 2) * VS);
    this.center = new THREE.Vector3(
      this.origin.x + this.place.cx * VS,
      0,
      this.origin.z + this.place.cz * VS,
    );

    const geo = new THREE.BoxGeometry(VS, VS, VS);
    const mat = new THREE.MeshLambertMaterial();
    this.mesh = new THREE.InstancedMesh(geo, mat, this.sim.voxelCount);
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.mesh.instanceColor = new THREE.InstancedBufferAttribute(
      new Float32Array(this.sim.voxelCount * 3),
      3,
    );
    this.mesh.frustumCulled = false;
    this.paintColors();

    this.debris = new Debris(12000, VS);
    this.rockets = new RocketFX(app.scene);
    this.chunks = new FallingChunks({
      sim: this.sim,
      mesh: this.mesh,
      debris: this.debris,
      voxelSize: VS,
      voxelWorld: (gx, gy, gz, out) => this.voxelWorld(gx, gy, gz, out),
      worldToGrid: (w, out) => this.worldToGrid(w, out),
      onImpact: (gx, gy, gz, r) => this.secondaryImpact(gx, gy, gz, r),
    });

    this.buildLights();
    app.scene.add(this.mesh, this.debris.mesh, this.makeGround());
    this.rebuild();

    const canvas = app.renderer.domElement;
    canvas.addEventListener('pointerdown', this.onPointerDown);
    canvas.addEventListener('pointerup', this.onPointerUp);
    app.onUpdate(this.update);
  }

  // ── setup ────────────────────────────────────────────────────────────────

  private paintColors(): void {
    const out: [number, number, number] = [0, 0, 0];
    for (let i = 0; i < this.sim.voxelCount; i++) {
      this.sim.gridCoords(i, out);
      const matId = this.sim.matOf[i]!;
      _c.setHex(MAT_COLORS[matId] ?? 0xbcb3a3);
      const t = out[1] / Math.max(this.place.h - 1, 1);
      const shade = 0.72 + t * 0.34; // subtle vertical lift
      const jitter = 0.93 + ((i * 2654435761) % 1000) / 1000 * 0.14;
      _c.multiplyScalar(shade * jitter);
      this.mesh.setColorAt(i, _c);
    }
    if (this.mesh.instanceColor) this.mesh.instanceColor.needsUpdate = true;
  }

  private buildLights(): void {
    const hemi = new THREE.HemisphereLight(0xbcd0ff, 0x1a1410, 0.8);
    const key = new THREE.DirectionalLight(0xfff1d8, 1.2);
    key.position.set(-35, 60, 45);
    const rim = new THREE.DirectionalLight(0xce5a30, 0.35);
    rim.position.set(45, 18, -25);
    this.app.scene.add(hemi, key, rim);
  }

  private makeGround(): THREE.Mesh {
    const g = new THREE.Mesh(
      new THREE.PlaneGeometry(600, 600),
      new THREE.MeshLambertMaterial({ color: 0x161210 }),
    );
    g.rotation.x = -Math.PI / 2;
    return g;
  }

  // ── transforms ─────────────────────────────────────────────────────────────

  private voxelWorld(gx: number, gy: number, gz: number, out: THREE.Vector3): void {
    out.set(
      this.origin.x + (gx + 0.5) * VS,
      (gy + 0.5) * VS + this.riseOffset,
      this.origin.z + (gz + 0.5) * VS,
    );
  }

  private worldToGrid(w: THREE.Vector3, out: [number, number, number]): void {
    out[0] = (w.x - this.origin.x) / VS;
    out[1] = (w.y - this.riseOffset) / VS;
    out[2] = (w.z - this.origin.z) / VS;
  }

  // ── rendering ───────────────────────────────────────────────────────────────

  private rebuild(): void {
    const out: [number, number, number] = [0, 0, 0];
    for (let i = 0; i < this.sim.voxelCount; i++) {
      if (this.chunks.isInChunk(i)) continue; // matrix driven by its chunk
      if (this.sim.alive[i] === 0) {
        _m.compose(_p.set(0, -9999, 0), _q.identity(), _s.setScalar(0));
        this.mesh.setMatrixAt(i, _m);
        continue;
      }
      this.sim.gridCoords(i, out);
      this.voxelWorld(out[0], out[1], out[2], _p);
      _m.compose(_p, _q.identity(), _s.setScalar(VS));
      this.mesh.setMatrixAt(i, _m);
    }
    this.mesh.instanceMatrix.needsUpdate = true;
  }

  // ── interaction ─────────────────────────────────────────────────────────────

  private downX = 0;
  private downY = 0;
  private downT = 0;

  private onPointerDown = (e: PointerEvent): void => {
    this.downX = e.clientX;
    this.downY = e.clientY;
    this.downT = performance.now();
  };

  private onPointerUp = (e: PointerEvent): void => {
    const moved = Math.hypot(e.clientX - this.downX, e.clientY - this.downY);
    if (moved > 12 || performance.now() - this.downT > 500) return;
    _ndc.set(
      (e.clientX / window.innerWidth) * 2 - 1,
      -(e.clientY / window.innerHeight) * 2 + 1,
    );
    _ray.setFromCamera(_ndc, this.app.camera);
    const hit = _ray.intersectObject(this.mesh, false)[0];
    if (!hit) return;
    const g: [number, number, number] = [0, 0, 0];
    this.worldToGrid(hit.point, g);
    this.strike(g[0], g[1], g[2], 4.5, 16);
  };

  /** Carve a sphere, throw its debris, arm the cascade. */
  private strike(gx: number, gy: number, gz: number, radius: number, spread: number): void {
    this.sim.applyImpact(gx, gy, gz, radius, this.carved);
    this.spawnDebris(this.carved, spread);
    this.settling = true;
    this.dirty = true;
    this.shake = Math.min(this.shake + 0.5 + this.carved.length * 0.004, 1.5);
  }

  private spawnDebris(indices: number[], spread: number): void {
    const out: [number, number, number] = [0, 0, 0];
    for (const vi of indices) {
      this.sim.gridCoords(vi, out);
      this.voxelWorld(out[0], out[1], out[2], _p);
      this.mesh.getColorAt(vi, _c);
      this.debris.spawn(_p.x, _p.y, _p.z, VS, _c, spread);
    }
  }

  // ── the loop ────────────────────────────────────────────────────────────────

  private update = ({ dt, elapsed, camera }: UpdateCtx): void => {
    if (!this.reduced) {
      this.driveScript(dt);
      this.driveCascade();
    }
    this.rockets.update(dt);
    this.chunks.update(dt);
    if (this.dirty) {
      this.rebuild();
      this.dirty = false;
    }
    this.debris.update(dt);
    this.driveCamera(dt, elapsed, camera);
  };

  private driveScript(dt: number): void {
    switch (this.phase) {
      case 'idle':
        this.phaseT -= dt;
        if (this.phaseT <= 0) {
          this.phase = 'volley';
          this.volleyT = 0;
          this.volleyFired = 0;
        }
        break;
      case 'volley':
        this.volleyT += dt;
        if (this.volleyFired < 3 && this.volleyT >= this.volleyFired * ROCKET_GAP) {
          this.fireRocket(this.volleyFired);
          this.volleyFired++;
        }
        if (this.volleyFired >= 3 && !this.rockets.anyActive && !this.settling && !this.chunks.active) {
          this.phase = 'wait';
          this.phaseT = WAIT_TIME;
        }
        break;
      case 'wait':
        this.phaseT -= dt;
        if (this.phaseT <= 0) {
          this.sim.reviveBuilding(0);
          this.riseOffset = -this.place.h * VS - 2;
          this.dirty = true;
          this.phase = 'regen';
        }
        break;
      case 'regen': {
        const span = this.place.h * VS + 2;
        this.riseOffset = Math.min(this.riseOffset + (span / RISE_TIME) * dt, 0);
        this.dirty = true;
        if (this.riseOffset >= 0) {
          this.riseOffset = 0;
          this.phase = 'idle';
          this.phaseT = IDLE_TIME;
        }
        break;
      }
    }
  }

  /** Aim rocket i at the ground storey, spread across the front columns. */
  private fireRocket(i: number): void {
    const p = this.place;
    // Front face = +Z (entrance side). Column centres ~ x 9 / 17 / 25.
    const colLocalX = [9, 17, 25][i] ?? 17;
    const tx = this.origin.x + (p.cx - p.w / 2 + colLocalX) * VS;
    const ty = (2 + p.floorH * 0.4) * VS; // low ground storey
    const tz = this.origin.z + (p.cz + p.d / 2 - 1) * VS; // just inside the front wall
    const target = new THREE.Vector3(tx, ty, tz);
    const from = new THREE.Vector3(tx + (i - 1) * 4, 40, tz + 46);
    this.rockets.launch(from, target, () => {
      const g: [number, number, number] = [0, 0, 0];
      this.worldToGrid(target, g);
      this.strike(g[0], g[1], g[2], 4.6, 18);
    });
  }

  private driveCascade(): void {
    if (!this.settling) return;
    // One sweep per frame: detached mass becomes falling rigid sections (not
    // an instant cloud), and we let them fall a frame before re-sweeping so
    // the collapse reads as progressive rather than all-at-once.
    const res = this.sim.step(this.detached);
    if (this.detached.length) {
      this.chunks.spawn(this.detached, 8);
      this.dirty = true;
      this.shake = Math.min(this.shake + this.detached.length * 0.0012, 1.6);
    }
    if (!res.settling) this.settling = false;
  }

  /** A falling section's hard landing carves the structure below it → the
   *  floors keep coming down (pancake). Re-arms the sweep. */
  private secondaryImpact(gx: number, gy: number, gz: number, radius: number): void {
    this.sim.applyImpact(gx, gy, gz, radius, this.carved);
    if (this.carved.length) {
      this.spawnDebris(this.carved, 7);
      this.settling = true;
      this.dirty = true;
    }
  }

  private driveCamera(dt: number, elapsed: number, camera: THREE.PerspectiveCamera): void {
    if (!this.reduced) this.sway += dt * 0.3;
    const midY = this.place.h * VS * 0.46;
    // Straight-ahead framing (no yaw): the camera sits PAN to the left of the
    // building and looks parallel down -Z, which throws the whole tower onto
    // the RIGHT of the frame, clear of the hero copy on the left.
    const PAN = 22;
    const dist = 118;
    const drift = Math.sin(this.sway) * 4; // gentle parallax
    let sx = 0;
    let sy = 0;
    if (this.shake > 0) {
      this.shake = Math.max(0, this.shake - dt * 2.2);
      const a = this.shake * this.shake;
      sx = Math.sin(elapsed * 60) * a * 1.4;
      sy = Math.cos(elapsed * 71) * a * 1.1;
    }
    const camX = this.center.x - PAN + drift + sx;
    const camY = midY + 6 + sy;
    camera.position.set(camX, camY, this.center.z + dist);
    camera.lookAt(camX, midY, this.center.z);
  }
}

/**
 * ArcRocket — the ordnance for the live-building hero. Unlike the game's
 * straight-line rocket, these come in from a random up-left / up-right point
 * and follow a real ballistic arc (gravity) down to the aimed target, then
 * fire `onImpact(worldPoint)` which drives the game's `applyExplosion`.
 * No weapon is shown — just the incoming rocket, its smoke trail and a flash.
 */
import * as THREE from 'three';

const GRAVITY = -30;
const FLIGHT = 0.7; // seconds start→target (arc height falls out of gravity)
const _fwd = new THREE.Vector3(0, 0, 1);
const _dir = new THREE.Vector3();
const _m = new THREE.Matrix4();
const _q = new THREE.Quaternion();
const _qid = new THREE.Quaternion();
const _s = new THREE.Vector3();
const _p = new THREE.Vector3();

interface R {
  mesh: THREE.Group;
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  t: number;
  active: boolean;
  onImpact: ((p: THREE.Vector3) => void) | null;
  target: THREE.Vector3;
  trailAcc: number;
}

export class ArcRocket {
  readonly group = new THREE.Group();
  private readonly rockets: R[] = [];
  private readonly trail: THREE.InstancedMesh;
  private readonly cap = 300;
  private readonly tx: Float32Array;
  private readonly ty: Float32Array;
  private readonly tz: Float32Array;
  private readonly tl: Float32Array;
  private cursor = 0;
  private readonly flashes: THREE.Mesh[] = [];
  private readonly flashLife: number[] = [];

  constructor(scene: THREE.Scene) {
    for (let i = 0; i < 4; i++) this.rockets.push(this.makeRocket());
    this.group.add(...this.rockets.map((r) => r.mesh));

    const tgeo = new THREE.BoxGeometry(1, 1, 1);
    const tmat = new THREE.MeshBasicMaterial({ color: 0x9a8f80, transparent: true, opacity: 0.5 });
    this.trail = new THREE.InstancedMesh(tgeo, tmat, this.cap);
    this.trail.frustumCulled = false;
    this.trail.count = this.cap;
    this.tx = new Float32Array(this.cap);
    this.ty = new Float32Array(this.cap);
    this.tz = new Float32Array(this.cap);
    this.tl = new Float32Array(this.cap);
    for (let i = 0; i < this.cap; i++) {
      _m.compose(_p.set(0, -9999, 0), _qid, _s.setScalar(0));
      this.trail.setMatrixAt(i, _m);
    }
    this.group.add(this.trail);

    const fgeo = new THREE.SphereGeometry(1, 12, 8);
    for (let i = 0; i < 3; i++) {
      const fmat = new THREE.MeshBasicMaterial({ color: 0xffcf7a, transparent: true, opacity: 0 });
      const f = new THREE.Mesh(fgeo, fmat);
      f.visible = false;
      this.flashes.push(f);
      this.flashLife.push(0);
      this.group.add(f);
    }
    scene.add(this.group);
  }

  private makeRocket(): R {
    const g = new THREE.Group();
    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(0.28, 0.28, 2.0, 10),
      new THREE.MeshLambertMaterial({ color: 0x3a3d42 }),
    );
    body.rotation.x = Math.PI / 2;
    const nose = new THREE.Mesh(
      new THREE.ConeGeometry(0.28, 0.8, 10),
      new THREE.MeshLambertMaterial({ color: 0xb03a22 }),
    );
    nose.rotation.x = Math.PI / 2;
    nose.position.z = 1.4;
    const flame = new THREE.Mesh(
      new THREE.ConeGeometry(0.24, 1.0, 8),
      new THREE.MeshBasicMaterial({ color: 0xffb347 }),
    );
    flame.rotation.x = -Math.PI / 2;
    flame.position.z = -1.35;
    g.add(body, nose, flame);
    g.visible = false;
    return {
      mesh: g, pos: new THREE.Vector3(), vel: new THREE.Vector3(), t: 0,
      active: false, onImpact: null, target: new THREE.Vector3(), trailAcc: 0,
    };
  }

  get anyActive(): boolean {
    return this.rockets.some((r) => r.active);
  }

  /** Fire a rocket that flies (ballistically, with gravity) from `from` UP to
   *  `target`, calling `onImpact(target)` on arrival. The shooter is at street
   *  level in front of the tower, so the shot rises from below. */
  launch(from: THREE.Vector3, target: THREE.Vector3, onImpact: (p: THREE.Vector3) => void): void {
    const r = this.rockets.find((x) => !x.active);
    if (!r) return;
    r.pos.copy(from);
    r.target.copy(target);
    // Ballistic solve: P(T)=S+v·T+½·a·T² = target  →  v = (T−S−½aT²)/T.
    r.vel.set(
      (target.x - from.x) / FLIGHT,
      (target.y - from.y - 0.5 * GRAVITY * FLIGHT * FLIGHT) / FLIGHT,
      (target.z - from.z) / FLIGHT,
    );
    r.t = 0;
    r.active = true;
    r.onImpact = onImpact;
    r.trailAcc = 0;
    r.mesh.visible = true;
  }

  private spawnTrail(x: number, y: number, z: number): void {
    const i = this.cursor;
    this.cursor = (this.cursor + 1) % this.cap;
    this.tx[i] = x; this.ty[i] = y; this.tz[i] = z; this.tl[i] = 0.5;
  }

  private flash(p: THREE.Vector3): void {
    for (let i = 0; i < this.flashes.length; i++) {
      if (this.flashLife[i]! > 0) continue;
      this.flashes[i]!.position.copy(p);
      this.flashes[i]!.visible = true;
      this.flashLife[i] = 0.35;
      return;
    }
  }

  update(dt: number): void {
    for (const r of this.rockets) {
      if (!r.active) continue;
      r.t += dt;
      r.vel.y += GRAVITY * dt;
      r.pos.addScaledVector(r.vel, dt);
      if (r.t >= FLIGHT) {
        r.active = false;
        r.mesh.visible = false;
        this.flash(r.target);
        const cb = r.onImpact;
        r.onImpact = null;
        if (cb) cb(r.target);
        continue;
      }
      r.mesh.position.copy(r.pos);
      _dir.copy(r.vel).normalize();
      _q.setFromUnitVectors(_fwd, _dir);
      r.mesh.quaternion.copy(_q);
      r.trailAcc += dt;
      while (r.trailAcc > 0.02) {
        r.trailAcc -= 0.02;
        this.spawnTrail(r.pos.x - _dir.x * 1.3, r.pos.y - _dir.y * 1.3, r.pos.z - _dir.z * 1.3);
      }
    }

    let touched = false;
    for (let i = 0; i < this.cap; i++) {
      const l = this.tl[i]!;
      if (l <= 0) continue;
      touched = true;
      const nl = l - dt;
      this.tl[i] = nl;
      if (nl <= 0) {
        _m.compose(_p.set(0, -9999, 0), _qid, _s.setScalar(0));
      } else {
        const age = 1 - nl / 0.5;
        _s.setScalar(0.5 + age * 1.8);
        _m.compose(_p.set(this.tx[i]!, this.ty[i]!, this.tz[i]!), _qid, _s);
      }
      this.trail.setMatrixAt(i, _m);
    }
    if (touched) this.trail.instanceMatrix.needsUpdate = true;

    for (let i = 0; i < this.flashes.length; i++) {
      const l = this.flashLife[i]!;
      if (l <= 0) continue;
      const nl = l - dt;
      this.flashLife[i] = nl;
      const f = this.flashes[i]!;
      const age = 1 - Math.max(nl, 0) / 0.35;
      f.scale.setScalar(1.5 + age * 7);
      (f.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 1 - age) * 0.9;
      if (nl <= 0) f.visible = false;
    }
  }
}

/**
 * RocketFX — the incoming ordnance for the hero. A tiny pool of rocket meshes
 * that fly in from off-frame toward a target on the building, trailing smoke,
 * and fire an onImpact callback (which carves the voxels) plus a flash on
 * arrival. Deliberately light: at most a few rockets in flight, a pooled
 * instanced smoke trail, one reused flash sprite per hit.
 */
import * as THREE from 'three';

const _fwd = new THREE.Vector3(0, 0, 1);
const _dir = new THREE.Vector3();
const _m = new THREE.Matrix4();
const _q = new THREE.Quaternion();
const _s = new THREE.Vector3();
const _p = new THREE.Vector3();

interface Rocket {
  mesh: THREE.Group;
  from: THREE.Vector3;
  to: THREE.Vector3;
  t: number;
  dur: number;
  active: boolean;
  onImpact: (() => void) | null;
  trailAcc: number;
}

export class RocketFX {
  readonly group = new THREE.Group();
  private readonly rockets: Rocket[] = [];
  private readonly trail: THREE.InstancedMesh;
  private readonly trailCap = 240;
  private readonly tx: Float32Array;
  private readonly ty: Float32Array;
  private readonly tz: Float32Array;
  private readonly tlife: Float32Array;
  private trailCursor = 0;
  private readonly flashes: THREE.Mesh[] = [];
  private readonly flashLife: number[] = [];

  constructor(scene: THREE.Scene) {
    // Rocket pool.
    for (let i = 0; i < 4; i++) this.rockets.push(this.makeRocket());
    this.group.add(...this.rockets.map((r) => r.mesh));

    // Smoke trail — pooled instanced cubes, grow + fade, no gravity.
    const tgeo = new THREE.BoxGeometry(1, 1, 1);
    const tmat = new THREE.MeshBasicMaterial({ color: 0x8a8074, transparent: true, opacity: 0.5 });
    this.trail = new THREE.InstancedMesh(tgeo, tmat, this.trailCap);
    this.trail.frustumCulled = false;
    this.trail.count = this.trailCap;
    this.tx = new Float32Array(this.trailCap);
    this.ty = new Float32Array(this.trailCap);
    this.tz = new Float32Array(this.trailCap);
    this.tlife = new Float32Array(this.trailCap);
    for (let i = 0; i < this.trailCap; i++) {
      _m.compose(_p.set(0, -9999, 0), _q.identity(), _s.setScalar(0));
      this.trail.setMatrixAt(i, _m);
    }
    this.group.add(this.trail);

    // Impact flashes.
    const fgeo = new THREE.SphereGeometry(1, 12, 8);
    for (let i = 0; i < 3; i++) {
      const fmat = new THREE.MeshBasicMaterial({ color: 0xffd27a, transparent: true, opacity: 0 });
      const f = new THREE.Mesh(fgeo, fmat);
      f.visible = false;
      this.flashes.push(f);
      this.flashLife.push(0);
      this.group.add(f);
    }

    scene.add(this.group);
  }

  private makeRocket(): Rocket {
    const g = new THREE.Group();
    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(0.32, 0.32, 2.2, 10),
      new THREE.MeshLambertMaterial({ color: 0x3a3d42 }),
    );
    body.rotation.x = Math.PI / 2; // lie along +Z
    const nose = new THREE.Mesh(
      new THREE.ConeGeometry(0.32, 0.9, 10),
      new THREE.MeshLambertMaterial({ color: 0xb03a22 }),
    );
    nose.rotation.x = Math.PI / 2;
    nose.position.z = 1.5;
    const flame = new THREE.Mesh(
      new THREE.ConeGeometry(0.28, 1.1, 8),
      new THREE.MeshBasicMaterial({ color: 0xffb347 }),
    );
    flame.rotation.x = -Math.PI / 2;
    flame.position.z = -1.5;
    g.add(body, nose, flame);
    g.visible = false;
    return { mesh: g, from: new THREE.Vector3(), to: new THREE.Vector3(), t: 0, dur: 1, active: false, onImpact: null, trailAcc: 0 };
  }

  get anyActive(): boolean {
    return this.rockets.some((r) => r.active);
  }

  /** Fire a rocket from `from` to `to`; `onImpact` runs when it lands. */
  launch(from: THREE.Vector3, to: THREE.Vector3, onImpact: () => void, speed = 55): void {
    const r = this.rockets.find((x) => !x.active);
    if (!r) return;
    r.from.copy(from);
    r.to.copy(to);
    r.dur = Math.max(from.distanceTo(to) / speed, 0.25);
    r.t = 0;
    r.active = true;
    r.onImpact = onImpact;
    r.trailAcc = 0;
    r.mesh.visible = true;
  }

  private spawnTrail(x: number, y: number, z: number): void {
    const i = this.trailCursor;
    this.trailCursor = (this.trailCursor + 1) % this.trailCap;
    this.tx[i] = x;
    this.ty[i] = y;
    this.tz[i] = z;
    this.tlife[i] = 0.5;
  }

  private flash(pos: THREE.Vector3): void {
    for (let i = 0; i < this.flashes.length; i++) {
      if (this.flashLife[i]! > 0) continue;
      this.flashes[i]!.position.copy(pos);
      this.flashes[i]!.visible = true;
      this.flashLife[i] = 0.35;
      return;
    }
  }

  update(dt: number): void {
    // Rockets.
    for (const r of this.rockets) {
      if (!r.active) continue;
      r.t += dt / r.dur;
      if (r.t >= 1) {
        _p.copy(r.to);
        r.active = false;
        r.mesh.visible = false;
        this.flash(_p);
        const cb = r.onImpact;
        r.onImpact = null;
        if (cb) cb();
        continue;
      }
      // Arc: lerp with a slight upward bow so it reads as a lob, not a laser.
      _p.lerpVectors(r.from, r.to, r.t);
      _p.y += Math.sin(r.t * Math.PI) * 4;
      r.mesh.position.copy(_p);
      _dir.subVectors(r.to, r.from).normalize();
      _q.setFromUnitVectors(_fwd, _dir);
      r.mesh.quaternion.copy(_q);
      r.trailAcc += dt;
      while (r.trailAcc > 0.02) {
        r.trailAcc -= 0.02;
        this.spawnTrail(_p.x, _p.y - 1.5 * _dir.y, _p.z);
      }
    }

    // Trail: grow + fade.
    let touched = false;
    for (let i = 0; i < this.trailCap; i++) {
      const l = this.tlife[i]!;
      if (l <= 0) continue;
      touched = true;
      const nl = l - dt;
      this.tlife[i] = nl;
      if (nl <= 0) {
        _m.compose(_p.set(0, -9999, 0), _q.identity(), _s.setScalar(0));
      } else {
        const age = 1 - nl / 0.5;
        _s.setScalar(0.6 + age * 2.2);
        _m.compose(_p.set(this.tx[i]!, this.ty[i]!, this.tz[i]!), _q.identity(), _s);
      }
      this.trail.setMatrixAt(i, _m);
    }
    if (touched) this.trail.instanceMatrix.needsUpdate = true;

    // Flashes.
    for (let i = 0; i < this.flashes.length; i++) {
      const l = this.flashLife[i]!;
      if (l <= 0) continue;
      const nl = l - dt;
      this.flashLife[i] = nl;
      const f = this.flashes[i]!;
      const age = 1 - Math.max(nl, 0) / 0.35;
      f.scale.setScalar(2 + age * 9);
      (f.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 1 - age) * 0.9;
      if (nl <= 0) f.visible = false;
    }
  }
}

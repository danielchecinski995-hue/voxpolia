/**
 * Debris — a fixed pool of falling voxel cubes (WEBSITE_PLAN §6: object
 * pooling, one InstancedMesh, zero allocation in the loop). Detached voxels
 * hand their world position + colour here; physics is a cheap gravity + floor
 * bounce with a fade-out. Oldest slot is recycled when the pool is full.
 */
import * as THREE from 'three';

const GRAVITY = 42;
const FLOOR = 0; // ground plane sits at y = 0
const LIFE = 3.2; // seconds before a cube fades out
const _m = new THREE.Matrix4();
const _q = new THREE.Quaternion();
const _e = new THREE.Euler();
const _s = new THREE.Vector3();
const _p = new THREE.Vector3();

export class Debris {
  readonly mesh: THREE.InstancedMesh;
  private readonly cap: number;
  private readonly px: Float32Array;
  private readonly py: Float32Array;
  private readonly pz: Float32Array;
  private readonly vx: Float32Array;
  private readonly vy: Float32Array;
  private readonly vz: Float32Array;
  private readonly rx: Float32Array;
  private readonly ry: Float32Array;
  private readonly life: Float32Array;
  private readonly size: Float32Array;
  private cursor = 0;

  constructor(cap: number, voxelSize: number) {
    this.cap = cap;
    const geo = new THREE.BoxGeometry(voxelSize, voxelSize, voxelSize);
    const mat = new THREE.MeshLambertMaterial({ vertexColors: false });
    this.mesh = new THREE.InstancedMesh(geo, mat, cap);
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.mesh.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(cap * 3), 3);
    this.mesh.frustumCulled = false;
    this.mesh.count = cap;

    this.px = new Float32Array(cap);
    this.py = new Float32Array(cap);
    this.pz = new Float32Array(cap);
    this.vx = new Float32Array(cap);
    this.vy = new Float32Array(cap);
    this.vz = new Float32Array(cap);
    this.rx = new Float32Array(cap);
    this.ry = new Float32Array(cap);
    this.life = new Float32Array(cap); // 0 = free
    this.size = new Float32Array(cap);

    // Park every instance offscreen-small until spawned.
    _s.setScalar(0);
    for (let i = 0; i < cap; i++) {
      _m.compose(_p.set(0, -9999, 0), _q.identity(), _s);
      this.mesh.setMatrixAt(i, _m);
    }
    this.mesh.instanceMatrix.needsUpdate = true;
  }

  spawn(x: number, y: number, z: number, size: number, color: THREE.Color, spread: number): void {
    const i = this.cursor;
    this.cursor = (this.cursor + 1) % this.cap;
    this.px[i] = x;
    this.py[i] = y;
    this.pz[i] = z;
    // Outward+upward kick; `spread` scales the sideways scatter of a collapse.
    this.vx[i] = (Math.random() - 0.5) * spread;
    this.vy[i] = 2 + Math.random() * 6;
    this.vz[i] = (Math.random() - 0.5) * spread;
    this.rx[i] = (Math.random() - 0.5) * 6;
    this.ry[i] = (Math.random() - 0.5) * 6;
    this.life[i] = LIFE;
    this.size[i] = size;
    this.mesh.setColorAt(i, color);
    if (this.mesh.instanceColor) this.mesh.instanceColor.needsUpdate = true;
  }

  update(dt: number): void {
    let touched = false;
    for (let i = 0; i < this.cap; i++) {
      const l = this.life[i]!;
      if (l <= 0) continue;
      touched = true;
      let vy = this.vy[i]! - GRAVITY * dt;
      let y = this.py[i]! + vy * dt;
      const sz = this.size[i]!;
      const rest = FLOOR + sz * 0.5;
      if (y < rest) {
        y = rest;
        vy = -vy * 0.28; // bounce, quickly damped
        if (Math.abs(vy) < 1.5) vy = 0;
        this.vx[i]! *= 0.6;
        this.vz[i]! *= 0.6;
      }
      this.vy[i] = vy;
      this.py[i] = y;
      this.px[i]! += this.vx[i]! * dt;
      this.pz[i]! += this.vz[i]! * dt;

      const nl = l - dt;
      this.life[i] = nl;
      const fade = nl < 0.6 ? Math.max(nl / 0.6, 0) : 1;
      _e.set(this.rx[i]! * (LIFE - nl), this.ry[i]! * (LIFE - nl), 0);
      _q.setFromEuler(_e);
      _s.setScalar(sz * fade);
      _m.compose(_p.set(this.px[i]!, y, this.pz[i]!), _q, _s);
      this.mesh.setMatrixAt(i, _m);
      if (nl <= 0) {
        _m.compose(_p.set(0, -9999, 0), _q.identity(), _s.setScalar(0));
        this.mesh.setMatrixAt(i, _m);
      }
    }
    if (touched) this.mesh.instanceMatrix.needsUpdate = true;
  }
}

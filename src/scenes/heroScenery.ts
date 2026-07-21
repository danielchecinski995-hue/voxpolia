/**
 * Minimal hero scenery — the split-screen concept: just the one destructible
 * tower on a patch of grass with a bit of road (a ring the cars loop) and some
 * trees. Purely decorative (no physics/colliders), so only the tower is
 * destructible.
 */
import * as THREE from 'three';

interface Car { group: THREE.Group; t: number; speed: number; }
interface Foot { cx: number; cz: number; hw: number; hd: number; }
interface Rect { x0: number; z0: number; x1: number; z1: number; }

const RING = 19;        // ring-road half-extent around the tower
const ROAD_W = 3.6;
const _v = new THREE.Vector3();

export class HeroScenery {
  private readonly cars: Car[] = [];
  private readonly loop: THREE.Vector3[];
  private readonly foots: Foot[] = [];
  private readonly roads: Rect[] = [];

  constructor(scene: THREE.Scene, mobile: boolean, mainHW: number, mainHD: number) {
    this.foots.push({ cx: 0, cz: 0, hw: mainHW, hd: mainHD });

    // A ring road around the tower (the "bit of road").
    this.roads.push(
      { x0: -RING - ROAD_W / 2, z0: -RING - ROAD_W / 2, x1: RING + ROAD_W / 2, z1: -RING + ROAD_W / 2 },
      { x0: -RING - ROAD_W / 2, z0: RING - ROAD_W / 2, x1: RING + ROAD_W / 2, z1: RING + ROAD_W / 2 },
      { x0: -RING - ROAD_W / 2, z0: -RING, x1: -RING + ROAD_W / 2, z1: RING },
      { x0: RING - ROAD_W / 2, z0: -RING, x1: RING + ROAD_W / 2, z1: RING },
    );
    this.addGround(scene);
    this.addTrees(scene, mobile ? 26 : 54);
    this.addBenches(scene);

    // Cars looping the ring.
    this.loop = [
      new THREE.Vector3(-RING, 0, -RING), new THREE.Vector3(RING, 0, -RING),
      new THREE.Vector3(RING, 0, RING), new THREE.Vector3(-RING, 0, RING),
    ];
    const carColors = [0xd23b2f, 0x2f6fd2, 0xe0a52a, 0x2fa564];
    const nCars = mobile ? 2 : 3;
    for (let i = 0; i < nCars; i++) {
      const g = this.makeCar(carColors[i % carColors.length]!);
      scene.add(g);
      this.cars.push({ group: g, t: i / nCars, speed: 0.05 + Math.random() * 0.02 });
    }
  }

  // ── roads + sidewalks ──────────────────────────────────────────────────────
  private addGround(scene: THREE.Scene): void {
    const asphalt = new THREE.MeshLambertMaterial({ color: 0x3a3a3e });
    const walk = new THREE.MeshLambertMaterial({ color: 0xb9b3a6 });
    const line = new THREE.MeshBasicMaterial({ color: 0xd8c86a });
    const pad = (r: Rect, mat: THREE.Material, y: number): void => {
      const w = r.x1 - r.x0; const d = r.z1 - r.z0;
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), mat);
      m.rotation.x = -Math.PI / 2;
      m.position.set((r.x0 + r.x1) / 2, y, (r.z0 + r.z1) / 2);
      scene.add(m);
    };
    for (const f of this.foots) {
      pad({ x0: f.cx - f.hw - 3, z0: f.cz - f.hd - 3, x1: f.cx + f.hw + 3, z1: f.cz + f.hd + 3 }, walk, 0.02);
    }
    for (const r of this.roads) {
      pad({ x0: r.x0 - 1.4, z0: r.z0 - 1.4, x1: r.x1 + 1.4, z1: r.z1 + 1.4 }, walk, 0.025);
      pad(r, asphalt, 0.04);
    }
    for (let i = -RING + 3; i < RING; i += 5) {
      for (const sz of [-RING, RING]) {
        const d = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 0.3), line);
        d.rotation.x = -Math.PI / 2; d.position.set(i, 0.06, sz);
        scene.add(d);
      }
    }
  }

  // ── trees ──────────────────────────────────────────────────────────────────
  private addTrees(scene: THREE.Scene, n: number): void {
    const trunkGeo = new THREE.BoxGeometry(0.5, 2.4, 0.5);
    const trunkMat = new THREE.MeshLambertMaterial({ color: 0x6b4a2f });
    const leafGeo = new THREE.IcosahedronGeometry(1.9, 0);
    const leafMat = new THREE.MeshLambertMaterial({ color: 0x4e8f3c, flatShading: true });
    const trunks = new THREE.InstancedMesh(trunkGeo, trunkMat, n);
    const leaves = new THREE.InstancedMesh(leafGeo, leafMat, n);
    trunks.frustumCulled = false; leaves.frustumCulled = false;
    const leafTints = [0x4e8f3c, 0x5a9a44, 0x437f36, 0x6aa64e];
    const m = new THREE.Matrix4(); const q = new THREE.Quaternion();
    const s = new THREE.Vector3(); const yA = new THREE.Vector3(0, 1, 0);
    let placed = 0; let attempts = 0;
    while (placed < n && attempts < n * 12) {
      attempts++;
      const r = 24 + Math.pow(Math.random(), 0.7) * 70;
      const a = Math.random() * Math.PI * 2;
      const x = Math.cos(a) * r; const z = Math.sin(a) * r;
      if (this.nearBuilding(x, z, 3) || this.onRoad(x, z, 2)) continue;
      const sc = 0.8 + Math.random() * 1.0 + Math.min(1, r / 70) * 0.5;
      q.setFromAxisAngle(yA, Math.random() * Math.PI);
      s.set(sc, sc, sc);
      m.compose(_v.set(x, 1.2 * sc, z), q, s);
      trunks.setMatrixAt(placed, m);
      m.compose(_v.set(x, (2.4 + 1.5) * sc, z), q, s);
      leaves.setMatrixAt(placed, m);
      leaves.setColorAt(placed, new THREE.Color(leafTints[placed % leafTints.length]!));
      placed++;
    }
    trunks.count = placed; leaves.count = placed;
    if (leaves.instanceColor) leaves.instanceColor.needsUpdate = true;
    scene.add(trunks, leaves);
  }

  private addBenches(scene: THREE.Scene): void {
    const wood = new THREE.MeshLambertMaterial({ color: 0x9a6b3f });
    const spots: Array<[number, number, number]> = [
      [13, 13, 0.6], [-13, 14, -0.5], [14, -12, 2.2],
    ];
    for (const [x, z, rot] of spots) {
      if (this.nearBuilding(x, z, 1) || this.onRoad(x, z, 1)) continue;
      const g = new THREE.Group();
      const box = (w: number, h: number, d: number, px: number, py: number, pz: number): void => {
        const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), wood);
        b.position.set(px, py, pz); g.add(b);
      };
      box(2.4, 0.12, 0.7, 0, 0.5, 0);
      box(2.4, 0.5, 0.12, 0, 0.8, -0.3);
      for (const sx of [-1, 1]) box(0.12, 0.5, 0.6, sx * 1.0, 0.25, 0);
      g.position.set(x, 0.05, z); g.rotation.y = rot;
      scene.add(g);
    }
  }

  private nearBuilding(x: number, z: number, pad: number): boolean {
    for (const f of this.foots) {
      if (Math.abs(x - f.cx) < f.hw + 3 + pad && Math.abs(z - f.cz) < f.hd + 3 + pad) return true;
    }
    return false;
  }

  private onRoad(x: number, z: number, pad: number): boolean {
    for (const r of this.roads) {
      if (x > r.x0 - pad && x < r.x1 + pad && z > r.z0 - pad && z < r.z1 + pad) return true;
    }
    return false;
  }

  private makeCar(color: number): THREE.Group {
    const g = new THREE.Group();
    const body = new THREE.MeshLambertMaterial({ color });
    const glass = new THREE.MeshLambertMaterial({ color: 0x1e2a33 });
    const tyre = new THREE.MeshLambertMaterial({ color: 0x1a1a1c });
    const box = (w: number, h: number, d: number, mat: THREE.Material, x: number, y: number, z: number): void => {
      const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
      b.position.set(x, y, z); g.add(b);
    };
    box(2.0, 0.7, 4.4, body, 0, 0.75, 0);
    box(1.8, 0.7, 2.2, body, 0, 1.35, -0.1);
    box(1.72, 0.5, 2.0, glass, 0, 1.4, -0.1);
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) box(0.35, 0.7, 0.7, tyre, sx * 0.95, 0.45, sz * 1.5);
    return g;
  }

  update(dt: number): void {
    const n = this.loop.length; const per = 1 / n;
    for (const car of this.cars) {
      car.t = (car.t + car.speed * dt) % 1;
      const seg = Math.min(n - 1, Math.floor(car.t / per));
      const f = (car.t - seg * per) / per;
      const a = this.loop[seg]!; const b = this.loop[(seg + 1) % n]!;
      _v.lerpVectors(a, b, f);
      car.group.position.set(_v.x, 0, _v.z);
      car.group.rotation.y = Math.atan2(b.x - a.x, b.z - a.z);
    }
  }
}

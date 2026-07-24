/**
 * Hero scenery — the split-screen neighbourhood around the one destructible
 * tower. A real street CORNER (two crossing streets running off into the city),
 * with the game's own GLB props: trees, streetlights and cars. The cars drive
 * the front street in two lanes and keep a following gap (IDM-lite), so they
 * never pile up or drive in a circle. Purely decorative — no physics/colliders,
 * only the main tower is destructible.
 */
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface Foot { cx: number; cz: number; hw: number; hd: number; }
interface Rect { x0: number; z0: number; x1: number; z1: number; }
/** A car following its lane on the front street. */
interface CarAgent { obj: THREE.Object3D; dir: 1 | -1; half: number; x: number; speed: number; }

const STREET_Z = 16;     // front street centre-line (z)
const STREET_X = 36;     // side street centre-line (x)
const ROAD_HALF = 4.2;   // half road width (fits two lanes)
const LANE = 2.0;        // lane offset from the street centre
const EXT = 180;         // how far the streets run toward the city (into fog)
const CRUISE = 7;        // car cruise speed (m/s)
const CAR_END = 110;     // wrap point — deep in the fog, so the reset is unseen

export class HeroScenery {
  private readonly cars: CarAgent[] = [];
  private readonly foots: Foot[] = [];
  private readonly roads: Rect[] = [];
  private readonly parkSpots: Array<{ x: number; z: number }> = [];
  private mainCX = 0; private mainCZ = 0; private mainHD = 0;
  private loaded = false;

  constructor(
    scene: THREE.Scene, mobile: boolean, mainHW: number, mainHD: number,
    neighbours: Foot[] = [], mainCX = 0, mainCZ = 0,
  ) {
    this.mainCX = mainCX; this.mainCZ = mainCZ; this.mainHD = mainHD;
    this.foots.push({ cx: mainCX, cz: mainCZ, hw: mainHW, hd: mainHD });
    for (const f of neighbours) this.foots.push(f);

    // A street corner: a front street (along X) crossing a side street (along
    // Z), both running off toward the city — reads as a real block, not an
    // island ring.
    this.roads.push(
      { x0: -EXT, z0: STREET_Z - ROAD_HALF, x1: EXT, z1: STREET_Z + ROAD_HALF },
      { x0: STREET_X - ROAD_HALF, z0: -EXT, x1: STREET_X + ROAD_HALF, z1: EXT },
    );
    this.addGround(scene);
    void this.loadProps(scene, mobile);
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
    // Sidewalk aprons around each building footprint.
    for (const f of this.foots) {
      pad({ x0: f.cx - f.hw - 3, z0: f.cz - f.hd - 3, x1: f.cx + f.hw + 3, z1: f.cz + f.hd + 3 }, walk, 0.02);
    }
    // Streets: a sidewalk band then the asphalt on top.
    for (const r of this.roads) {
      pad({ x0: r.x0 - 1.6, z0: r.z0 - 1.6, x1: r.x1 + 1.6, z1: r.z1 + 1.6 }, walk, 0.025);
      pad(r, asphalt, 0.04);
    }
    // Dashed centre lines (only over the visible/near-fog stretch — past that
    // the fog hides them anyway).
    const DASH = 130;
    for (let x = -DASH; x < DASH; x += 5) {
      if (Math.abs(x - STREET_X) < ROAD_HALF) continue; // gap at the intersection
      const d = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 0.3), line);
      d.rotation.x = -Math.PI / 2; d.position.set(x, 0.06, STREET_Z);
      scene.add(d);
    }
    for (let z = -DASH; z < DASH; z += 5) {
      if (Math.abs(z - STREET_Z) < ROAD_HALF) continue;
      const d = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 1.8), line);
      d.rotation.x = -Math.PI / 2; d.position.set(STREET_X, 0.06, z);
      scene.add(d);
    }

    // Driveway from the front street up to the tower + a small parking lot in
    // the grass beside it.
    const stall = new THREE.MeshBasicMaterial({ color: 0xe6e0d2 });
    const frontZ = this.mainCZ + this.mainHD + 1;           // just in front of the tower
    pad({ x0: this.mainCX - 2.4, z0: frontZ, x1: this.mainCX + 2.4, z1: STREET_Z }, asphalt, 0.045);
    const lot: Rect = {
      x0: this.mainCX - 20, z0: frontZ + 1.5,
      x1: this.mainCX - 6, z1: Math.min(STREET_Z - 4.5, frontZ + 11),
    };
    pad({ x0: lot.x0 - 0.6, z0: lot.z0 - 0.6, x1: lot.x1 + 0.6, z1: lot.z1 + 0.6 }, walk, 0.03);
    pad(lot, asphalt, 0.045);
    // Stall divider lines + remember two spots for parked cars.
    const stallW = (lot.x1 - lot.x0) / 4;
    for (let k = 1; k < 4; k++) {
      const lx = lot.x0 + k * stallW;
      const s = new THREE.Mesh(new THREE.PlaneGeometry(0.18, lot.z1 - lot.z0 - 1), stall);
      s.rotation.x = -Math.PI / 2; s.position.set(lx, 0.06, (lot.z0 + lot.z1) / 2);
      scene.add(s);
    }
    this.parkSpots.push(
      { x: lot.x0 + stallW * 0.5, z: (lot.z0 + lot.z1) / 2 },
      { x: lot.x0 + stallW * 2.5, z: (lot.z0 + lot.z1) / 2 },
    );
  }

  // ── game GLB props (trees / streetlights / cars) ────────────────────────────
  private async loadProps(scene: THREE.Scene, mobile: boolean): Promise<void> {
    const loader = new GLTFLoader();
    const load = (f: string): Promise<THREE.Object3D> =>
      loader.loadAsync(`models/${f}`).then((g) => g.scene);
    try {
      const [tree, pine, small, car, suv, van, lamp] = await Promise.all([
        load('tree.glb'), load('tree_pine.glb'), load('tree_small.glb'),
        load('car.glb'), load('car_suv.glb'), load('car_van.glb'), load('streetlight.glb'),
      ]);
      this.scatterTrees(scene, [tree, pine, small], mobile ? 16 : 30);
      this.placeStreetlights(scene, lamp);
      this.spawnCars(scene, [car, suv, van], mobile ? 5 : 9);
      this.placeParkedCars(scene, [suv, car]);
      this.loaded = true;
    } catch (err) {
      console.error('[hero] prop models failed to load', err);
    }
  }

  private scatterTrees(scene: THREE.Scene, variants: THREE.Object3D[], n: number): void {
    let placed = 0; let attempts = 0;
    while (placed < n && attempts < n * 14) {
      attempts++;
      const r = 12 + Math.pow(Math.random(), 0.7) * 34;
      const a = Math.random() * Math.PI * 2;
      const x = Math.cos(a) * r; const z = Math.sin(a) * r;
      if (this.nearBuilding(x, z, 2) || this.onRoad(x, z, 1.5)) continue;
      const src = variants[placed % variants.length]!;
      const t = src.clone(true);
      const sc = 0.85 + Math.random() * 0.5;
      t.scale.setScalar(sc);
      t.rotation.y = Math.random() * Math.PI * 2;
      t.position.set(x, 0, z);
      scene.add(t);
      placed++;
    }
  }

  private placeStreetlights(scene: THREE.Scene, lamp: THREE.Object3D): void {
    const put = (x: number, z: number): void => {
      if (this.nearBuilding(x, z, 1)) return;
      const l = lamp.clone(true);
      l.position.set(x, 0, z);
      l.rotation.y = Math.random() * Math.PI * 2;
      scene.add(l);
    };
    // Along the front street's inner sidewalk.
    for (let x = -24; x <= 30; x += 13) put(x, STREET_Z - ROAD_HALF - 1.4);
    // Along the side street's inner sidewalk.
    for (let z = -20; z <= 8; z += 13) put(STREET_X - ROAD_HALF - 1.4, z);
  }

  // ── cars: two lanes on the front street, following gap kept ─────────────────
  private spawnCars(scene: THREE.Scene, variants: THREE.Object3D[], n: number): void {
    const tints = [0xd23b2f, 0x2f6fd2, 0xe0a52a, 0x2fa564, 0xbfc3c8, 0x8a5cc4];
    for (let i = 0; i < n; i++) {
      const dir: 1 | -1 = i % 2 === 0 ? 1 : -1;
      const src = variants[i % variants.length]!;
      const obj = src.clone(true);
      // Tint the body (material name 'carbody') per instance, like the game.
      const color = tints[i % tints.length]!;
      obj.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.isMesh && (m.material as THREE.Material)?.name === 'carbody') {
          const mat = (m.material as THREE.MeshStandardMaterial).clone();
          mat.color.setHex(color);
          m.material = mat;
        }
      });
      // Model forward is +Z → face it along its travel direction (±X).
      obj.rotation.y = dir > 0 ? Math.PI / 2 : -Math.PI / 2;
      const z = STREET_Z + dir * LANE; // drive on the right
      // Spread cars along the lane so they never start overlapping.
      const x = -CAR_END + ((i * 47) % (2 * CAR_END));
      obj.position.set(x, 0, z);
      scene.add(obj);
      this.cars.push({ obj, dir, half: 2.4, x, speed: CRUISE });
    }
  }

  /** Static cars nosed into the parking-lot stalls. */
  private placeParkedCars(scene: THREE.Scene, variants: THREE.Object3D[]): void {
    const tints = [0x445569, 0xc7cad0];
    this.parkSpots.forEach((spot, i) => {
      const obj = variants[i % variants.length]!.clone(true);
      obj.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.isMesh && (m.material as THREE.Material)?.name === 'carbody') {
          const mat = (m.material as THREE.MeshStandardMaterial).clone();
          mat.color.setHex(tints[i % tints.length]!);
          m.material = mat;
        }
      });
      obj.rotation.y = 0; // nose toward the street (+Z)
      obj.position.set(spot.x, 0, spot.z);
      scene.add(obj);
    });
  }

  private driveCars(dt: number): void {
    const SAFE = 11; const MIN = 5.5;
    for (const car of this.cars) {
      // Nearest car ahead in the SAME lane (same direction) → keep a gap.
      let gap = Infinity;
      for (const o of this.cars) {
        if (o === car || o.dir !== car.dir) continue;
        const ahead = (o.x - car.x) * car.dir;
        if (ahead > 0) gap = Math.min(gap, ahead - (car.half + o.half));
      }
      let target = CRUISE;
      if (gap < MIN) target = 0;
      else if (gap < SAFE) target = CRUISE * (gap - MIN) / (SAFE - MIN);
      car.speed += (target - car.speed) * Math.min(1, dt * 3);
      car.x += car.dir * car.speed * dt;
      // Wrap to the far end only when that end is clear, else hold at the edge.
      if (car.dir > 0 && car.x > CAR_END) {
        if (this.laneStartClear(car, -CAR_END)) car.x = -CAR_END;
        else { car.x = CAR_END; car.speed = 0; }
      } else if (car.dir < 0 && car.x < -CAR_END) {
        if (this.laneStartClear(car, CAR_END)) car.x = CAR_END;
        else { car.x = -CAR_END; car.speed = 0; }
      }
      car.obj.position.x = car.x;
    }
  }

  private laneStartClear(car: CarAgent, startX: number): boolean {
    for (const o of this.cars) {
      if (o === car || o.dir !== car.dir) continue;
      if (Math.abs(o.x - startX) < car.half + o.half + 8) return false;
    }
    return true;
  }

  // ── placement helpers ───────────────────────────────────────────────────────
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

  update(dt: number): void {
    if (this.loaded) this.driveCars(dt);
  }
}

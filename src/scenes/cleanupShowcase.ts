/**
 * Cleanup showcase — karta „gra sama wie, kiedy budynek jest skończony".
 *
 * Reklamujemy REGUŁĘ, nie efekt: budynek zostaje ZALICZONY jako zniszczony w
 * chwili, gdy 80% jego voxeli zniknie ze stojącej konstrukcji
 * (BUILDING_DESTROYED_RATIO w grze). Wtedy przestaje być celem — a to, co po nim
 * zostało, wciąga wir sprzątający i wypluwa w powietrze, aż zostaje goła ziemia.
 *
 * Dlatego bohaterem pętli NIE jest tornado, tylko sekunda, w której licznik
 * przebija próg. Rytm: wyburzanie z rosnącym odczytem → ZATRZASK na 80% →
 * chwila bezruchu (w grze to FIELD_DELAY) → wir → czysty grunt (trzymany).
 *
 * Silnik jest prawdziwy — ten sam Building/BuildingController/Rubble co w grze,
 * więc odczyt procentu to autentyczne `building.damageRatio()`, nie animacja.
 * Skrócone są tylko czasy: w grze zasysanie trwa 16 s, tu ~4, bo pętla na
 * stronie musi się zamknąć w kilku sekundach.
 *
 * Chodzi wyłącznie na ekranie (IntersectionObserver) — hero jest w tym czasie
 * dawno zapauzowane przez scroll handler w main.ts, więc liczy się jedna scena.
 */
import * as THREE from 'three';
import { Building } from '../engine/game/building/Building';
import { generateSkyscraper, SKY_GLASS_TINTS } from '../engine/game/building/cityBlocks';
import { BuildingController } from '../engine/game/building/BuildingController';
import { BigChunks } from '../engine/game/building/BigChunks';
import { Rubble } from '../engine/game/building/Rubble';
import { FlyingChunks } from '../engine/game/boss/FlyingChunks';
import type { VoxelCollider, DebrisSink } from '../engine/game/boss/FlyingChunks';
import type { DestroyedBlock } from '../engine/game/boss/VoxelCluster';
import { HitEffects } from '../engine/game/vfx/HitEffects';

/** TA SAMA liczba co w grze (City.ts BUILDING_DESTROYED_RATIO) — cała karta jest
 *  o tym progu, więc nie wolno jej tu rozjechać. */
const DESTROYED_RATIO = 0.8;

const FLOORS = 7;
const ACCENT = 0x4a7fb5;
const GLASS = SKY_GLASS_TINTS[3]!;
const SWEEP_BUDGET = 4_000_000;
const REMESH_BUDGET = 24;
const RUBBLE_DOWN_KICK = new THREE.Vector3(0, -4.5, 0);

/** Oś czasu (s). Pełny obieg ≈ 26 s — świadomie wolno: budynek ma się ZAWALIĆ
 *  do końca, poleżeć w gruzach, dopiero potem znika. */
const CARVE_STEP = 0.38;   // odstęp między kolejnymi wyrwami
const CARVE_MAX = 7;       // po tylu s wyrwy przenoszą się na podstawę (patrz stepCarve)
const FLATTEN_RATIO = 0.96; // wal, aż praktycznie nic nie stoi (werdykt pada wcześniej, przy 0.8)
const CARVE_HARD_CAP = 14; // bezwzględny limit fazy wyburzania (silnik strony NIE ma
//                            structuralFatigue, więc kikut potrafi się opierać)
const SETTLE_HOLD = 4.5;   // gruzowisko LEŻY — najdłuższa pauza w pętli
const LIFT_TIME = 6.5;     // zasysanie (w grze GATHER_TIME = 16)
const CLEAN_HOLD = 2.5;    // puenta: goła ziemia (dopiero PO wygaśnięciu cząstek)
const GAP = 0.8;

/** Wir: te same zachowania co LiftField w grze, przeskalowane pod mniejszą
 *  bryłę i krótszą pętlę. */
const POOL = 9000;
const LIFT_BUDGET = 260;   // voxeli/klatkę wciąganych z ziemi (w grze 150 przy 16 s)
const INWARD = 14;         // ciągnięcie do osi → ciasna kolumna, nie dysk
const SWIRL = 16.5;        // obrót — to od niego wygląda jak tornado
const RISE_UP = 17;        // pewne wznoszenie do gardzieli (bez wiecznej orbity)
const VMAX = 15;           // limit prędkości pionowej (> HMAX, żeby wspinaczka wygrywała)
const HMAX = 12;
const THROW_UP = 28;       // erupcja przy gardzieli — jak w grze (LiftField ma 36),
//                            lekko ściągnięte pod mniejszą bryłę i kadr karty
const THROW_OUT = 24;
const FALL_GRAVITY = 22;  // jak w grze — dłuższy łuk = deszcz sypie się przez kilka sekund
const REST_MIN = 0.25;     // ile leży, zanim zacznie gasnąć…
const REST_SPAN = 0.9;     // …plus losowo tyle (rozjazd → brak zbiorowego pyknięcia)
const FADE_TIME = 0.5;

const RISE = 1; const THROWN = 2; const LANDED = 3; const DEAD = 0;

type Phase = 'carve' | 'settle' | 'lift' | 'clean' | 'gap';

const _v = new THREE.Vector3();

class CleanupShowcase {
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene = new THREE.Scene();
  private readonly camera: THREE.PerspectiveCamera;

  private readonly gen0 = generateSkyscraper(0, 0, FLOORS, ACCENT, GLASS);
  private readonly cfg = this.gen0.config;
  private building!: Building;
  private controller!: BuildingController;
  private firstSpawn = true;

  private readonly rubble: Rubble;
  private readonly flyingChunks: FlyingChunks;
  private readonly bigChunks: BigChunks;
  private readonly hitFx: HitEffects;

  private readonly heightM: number;
  private readonly halfW: number;
  private readonly halfD: number;
  private readonly focalY: number;

  // ── pula cząstek wiru (SoA) ───────────────────────────────────────────────
  private readonly mesh: THREE.InstancedMesh;
  private readonly px = new Float32Array(POOL);
  private readonly py = new Float32Array(POOL);
  private readonly pz = new Float32Array(POOL);
  private readonly vx = new Float32Array(POOL);
  private readonly vy = new Float32Array(POOL);
  private readonly vz = new Float32Array(POOL);
  private readonly pSize = new Float32Array(POOL);
  private readonly pRest = new Float32Array(POOL);
  private readonly pState = new Uint8Array(POOL);
  private cursor = 0;
  private aliveParts = 0;

  private phase: Phase = 'carve';
  private phaseT = 0;
  private carveT = 0;
  private carveIdx = 0;
  private latched = false;
  private rubbleTimer = 0;
  private rubbleForceTimer = 0;
  private running = false;
  private prevT = 0;
  private readonly reduced: boolean;

  private readonly tmpMat = new THREE.Matrix4();
  private readonly tmpQ = new THREE.Quaternion();
  private readonly tmpP = new THREE.Vector3();
  private readonly tmpS = new THREE.Vector3();
  private readonly tmpColor = new THREE.Color();

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly onVerdict: (destroyed: boolean) => void,
  ) {
    this.reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.scene.background = null;

    const cfg = this.cfg;
    this.heightM = cfg.height * cfg.blockSize;
    this.halfW = (cfg.width * cfg.blockSize) / 2;
    this.halfD = (cfg.depth * cfg.blockSize) / 2;
    // Gardziel wysoko nad bryłą — kolumna ma się zakorzenić na ziemi i sięgać
    // nieba, bo to jej sylwetka jest tu do pokazania.
    this.focalY = this.heightM * 1.15;

    this.hitFx = new HitEffects(this.scene);
    this.flyingChunks = new FlyingChunks(this.scene);
    this.bigChunks = new BigChunks(this.scene);
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

    this.mesh = new THREE.InstancedMesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshLambertMaterial({ color: 0xffffff, flatShading: true }),
      POOL,
    );
    this.mesh.frustumCulled = false;
    this.mesh.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(POOL * 3), 3);
    this.tmpMat.makeScale(0, 0, 0);
    for (let i = 0; i < POOL; i++) this.mesh.setMatrixAt(i, this.tmpMat);
    this.scene.add(this.mesh);

    this.spawnBuilding();
    this.buildLights();
    this.scene.add(this.makeGround());

    // Kadr 4:3 — budynek w dolnej części, góra kadru zostaje dla kolumny.
    this.camera = new THREE.PerspectiveCamera(44, 1, 0.5, 2000);
    const d = Math.max(this.heightM, this.halfW * 2) * 2.1;
    this.camera.position.set(d * 0.62, this.heightM * 1.05, d * 0.78);
    this.camera.lookAt(0, this.heightM * 0.62, 0);

    this.resize();
    new ResizeObserver(() => this.resize()).observe(canvas);
    new IntersectionObserver((es) => {
      if (es[0]!.isIntersecting) this.start(); else this.stop();
    }, { threshold: 0.12 }).observe(canvas);
  }

  // ── budowa ────────────────────────────────────────────────────────────────
  private spawnBuilding(): void {
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
    this.carveIdx = 0; this.carveT = 0; this.latched = false;
    this.onVerdict(false);
  }

  private buildLights(): void {
    const hemi = new THREE.HemisphereLight(0xdfeaff, 0xb7b0a4, 1.05);
    const key = new THREE.DirectionalLight(0xfff4e2, 1.25);
    key.position.set(-24, 48, 34);
    const rim = new THREE.DirectionalLight(0x3f7fce, 0.32);
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

  // ── pętla ─────────────────────────────────────────────────────────────────
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

  private setPhase(p: Phase): void { this.phase = p; this.phaseT = 0; }

  private frame(): void {
    const now = performance.now();
    const dt = Math.min((now - this.prevT) / 1000, 0.05);
    this.prevT = now;
    this.phaseT += dt;

    switch (this.phase) {
      case 'carve': if (!this.reduced) this.stepCarve(dt); break;
      // Gruzowisko leży. Czekamy też, aż fizyka ucichnie — inaczej wir startuje
      // w trakcie zawalania i zjada sekcje jeszcze w locie.
      case 'settle':
        if (this.phaseT >= SETTLE_HOLD
          && this.bigChunks.activeCount() === 0 && !this.controller.sweepBusy()) this.setPhase('lift');
        break;
      case 'lift': this.stepLift(); break;
      // NOWY budynek dopiero, gdy NIC już nie leci z nieba (user 2026-07-23) —
      // wcześniej odradzał się w chmurze spadających kostek.
      case 'clean':
        if (this.phaseT >= CLEAN_HOLD && this.aliveParts === 0) this.setPhase('gap');
        break;
      case 'gap': if (this.phaseT >= GAP) { this.rebuild(); this.setPhase('carve'); } break;
    }

    this.controller.update(dt);
    this.bigChunks.update(dt, this.flyingChunks);
    this.flyingChunks.update(dt);
    this.rubble.decayTick(dt);
    this.driveRubbleGravity(dt);
    this.rubble.flushDirty();
    this.hitFx.update(dt);
    this.building.cluster.flushUploads(REMESH_BUDGET);
    this.stepParticles(dt);
    this.checkVerdict();
    this.renderer.render(this.scene, this.camera);
  }

  /** Osiadanie rumowiska — bez tego gruz wisi na starych podporach (jak w grze). */
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

  /** Wyburzanie: wyrwy co CARVE_STEP, coraz wyżej, aż damageRatio przebije próg. */
  private stepCarve(dt: number): void {
    // Koniec wyburzania dopiero, gdy budynek PRAKTYCZNIE LEŻY (user 2026-07-23) —
    // werdykt zapadł już przy 0.8, ale widz ma zobaczyć pełny upadek.
    if (this.building.damageRatio() >= FLATTEN_RATIO) { this.setPhase('settle'); return; }
    if (this.phaseT >= CARVE_HARD_CAP) { this.topple(); this.setPhase('settle'); return; }
    this.carveT += dt;
    if (this.carveT < CARVE_STEP) return;
    this.carveT = 0;
    const n = this.carveIdx++;

    // Pierwsze wyrwy idą spiralą od podstawy w górę — ładnie widać kaskadę.
    // Potem CELUJEMY W TO, CO REALNIE ZOSTAŁO: ślepa spirala omijała kikuty,
    // bo silnik strony to snapshot BEZ structuralFatigue, więc grzyb na słupkach
    // stoi w nieskończoność (user 2026-07-23: „zostaje się kawałek budynku").
    const late = this.phaseT >= CARVE_MAX;
    if (late && this.aimAtSurvivor(_v)) {
      // Na przemian: PODCIĘCIE podstawy (ładne zawalenie) i trafienie PROSTO
      // w ocalały voxel (gwarancja, że ratio zawsze rośnie i nic nie utknie).
      if ((n & 1) === 0) _v.y = Math.min(_v.y, this.heightM * 0.12);
      this.controller.applyExplosion(_v, 9.5);
      return;
    }
    const a = n * 2.4;
    _v.set(
      Math.cos(a) * this.halfW * 0.55,
      this.heightM * Math.min(0.82, 0.06 + n * 0.1),
      Math.sin(a) * this.halfD * 0.55,
    );
    this.controller.applyExplosion(_v, 6.4);
  }

  /** Pozycja losowego voxela, który WCIĄŻ STOI (false = nic nie zostało). */
  private aimAtSurvivor(out: THREE.Vector3): boolean {
    const idx = this.building.cluster.collectAliveIndicesWhere(() => true, 96);
    if (idx.length === 0) return false;
    const pick = idx[Math.floor(Math.random() * idx.length)]!;
    this.building.cluster.getWorldPosition(pick, out);
    return true;
  }

  /** Ostatnia deska ratunku: cokolwiek jeszcze stoi po CARVE_HARD_CAP, odrywamy
   *  i puszczamy w dół jako gruz. Budynek ma LEŻEĆ W CAŁOŚCI — nie znikać, więc
   *  bloki idą przez FlyingChunks i osiadają w rumowisku jak każdy inny gruz. */
  private topple(): void {
    const idx = this.building.cluster.collectAliveIndicesWhere(() => true, 1e6);
    if (idx.length === 0) return;
    const blocks = this.building.cluster.destroyByIndices(idx);
    if (blocks.length > 0) {
      this.flyingChunks.spawn(blocks, blocks[0]!.worldPosition, 0.8, undefined, RUBBLE_DOWN_KICK);
    }
  }

  /** Zasysanie: rumowisko z ziemi + resztki stojącej bryły lecą do wiru. */
  private stepLift(): void {
    if (this.phaseT >= LIFT_TIME) {
      this.hardClear();          // gwarantowany finisz — jak finalClearBlock w grze
      this.setPhase('clean');
      return;
    }
    const all = (): boolean => true;
    for (const b of this.rubble.liftWhere(all, LIFT_BUDGET)) this.emit(b);
    // Resztki stojącej bryły odrywane porcjami → rozpuszczają się w górę przez
    // kilka sekund zamiast zniknąć w jednej klatce.
    const idx = this.building.cluster.collectAliveIndicesWhere(all, 90);
    if (idx.length > 0) for (const b of this.building.cluster.destroyByIndices(idx)) this.emit(b);
  }

  /** Twarde domknięcie: cokolwiek zostało, znika — grunt ma być GOŁY, nie „prawie".
   *  CICHO, bez dosypywania do wiru (jak finalClearBlock w grze, które dostaje
   *  noop) — inaczej na końcu leciałaby druga fala kostek i nowy budynek
   *  wstawałby w jej trakcie. */
  private hardClear(): void {
    const all = (): boolean => true;
    this.rubble.liftWhere(all, 1e6);
    const idx = this.building.cluster.collectAliveIndicesWhere(all, 1e6);
    if (idx.length > 0) this.building.cluster.destroyByIndices(idx, false);
    this.flyingChunks.clear();
    this.bigChunks.clear();
  }

  private emit(b: DestroyedBlock): void {
    const i = this.cursor;
    this.cursor = (this.cursor + 1) % POOL;
    if (this.pState[i] === DEAD) this.aliveParts++;
    this.px[i] = b.worldPosition.x; this.py[i] = b.worldPosition.y; this.pz[i] = b.worldPosition.z;
    this.vx[i] = 0; this.vy[i] = 0; this.vz[i] = 0;
    this.pSize[i] = b.size;
    this.pRest[i] = 0;
    this.pState[i] = RISE;
    this.tmpColor.setHex(b.color & 0xffffff);
    this.mesh.setColorAt(i, this.tmpColor);
  }

  private stepParticles(dt: number): void {
    if (this.aliveParts === 0) { this.mesh.instanceMatrix.needsUpdate = true; return; }
    for (let i = 0; i < POOL; i++) {
      const st = this.pState[i];
      if (st === DEAD) continue;
      let vx = this.vx[i]!; let vy = this.vy[i]!; let vz = this.vz[i]!;

      if (st === RISE) {
        // Do osi + w górę + obrót — ciasna wirująca kolumna.
        const dx = -this.px[i]!; const dz = -this.pz[i]!;
        const r = Math.hypot(dx, dz) || 1e-3;
        vx += (dx / r) * INWARD * dt;
        vz += (dz / r) * INWARD * dt;
        vx += (-dz / r) * SWIRL * dt;
        vz += (dx / r) * SWIRL * dt;
        vy += RISE_UP * dt;
        const h = Math.hypot(vx, vz);
        if (h > HMAX) { const k = HMAX / h; vx *= k; vz *= k; }
        if (vy > VMAX) vy = VMAX;
        if (this.py[i]! >= this.focalY) {
          // Gardziel: erupcja W KAŻDĄ STRONĘ — jak w grze, gdzie po wybuchu
          // robi się szeroki deszcz sypiący się z całego nieba (user 2026-07-23).
          // Azymut LOSOWY, nie promieniowy: w ciasnej kolumnie kierunek „na
          // zewnątrz" jest zdegenerowany, więc promieniowy wyrzut dawał wąski
          // wachlarz zamiast kopuły.
          const ang = Math.random() * Math.PI * 2;
          // Szeroki rozrzut prędkości (0.35–1.35) → jedne kostki lecą daleko,
          // inne blisko; to od tego deszcz jest rzadki i pokrywa całe tło.
          const s = 0.35 + Math.random() * 1.0;
          vx = Math.cos(ang) * THROW_OUT * s;
          vz = Math.sin(ang) * THROW_OUT * s;
          vy = THROW_UP * (0.55 + Math.random() * 0.85);
          this.pState[i] = THROWN;
        }
      } else if (st === THROWN) {
        vy -= FALL_GRAVITY * dt;
        if (this.py[i]! <= this.pSize[i]! * 0.5 && vy < 0) {
          this.py[i] = this.pSize[i]! * 0.5;
          vx = 0; vy = 0; vz = 0;
          this.pRest[i] = REST_MIN + Math.random() * REST_SPAN;
          this.pState[i] = LANDED;
        }
      } else { // LANDED — leży, potem gaśnie
        this.pRest[i]! -= dt;
        if (this.pRest[i]! <= -FADE_TIME) {
          this.pState[i] = DEAD; this.aliveParts--;
          this.tmpMat.makeScale(0, 0, 0);
          this.mesh.setMatrixAt(i, this.tmpMat);
          continue;
        }
      }

      this.vx[i] = vx; this.vy[i] = vy; this.vz[i] = vz;
      if (st !== LANDED) {
        this.px[i]! += vx * dt; this.py[i]! += vy * dt; this.pz[i]! += vz * dt;
      }
      const rest = this.pRest[i]!;
      const shrink = st === LANDED && rest < 0 ? Math.max(0, 1 + rest / FADE_TIME) : 1;
      this.tmpP.set(this.px[i]!, this.py[i]!, this.pz[i]!);
      this.tmpS.setScalar(this.pSize[i]! * shrink);
      this.tmpMat.compose(this.tmpP, this.tmpQ, this.tmpS);
      this.mesh.setMatrixAt(i, this.tmpMat);
    }
    this.mesh.instanceMatrix.needsUpdate = true;
    if (this.mesh.instanceColor) this.mesh.instanceColor.needsUpdate = true;
  }

  /** Werdykt: budynek przekroczył próg zaliczenia. Sam PROCENT nie jest już
   *  pokazywany (user 2026-07-23) — copy karty mówi o korzyści dla gracza, nie
   *  o liczbie, więc licznik nad bryłą stał się zbędny. Zostaje sama plakietka.
   *  Detekcja siedzi TUTAJ, a nie w rysowaniu, żeby nie zależała od DOM. */
  private checkVerdict(): void {
    if (this.latched || this.phase !== 'carve') return;
    if (this.building.damageRatio() >= DESTROYED_RATIO) {
      this.latched = true;
      this.onVerdict(true);
    }
  }

  private resize(): void {
    const w = this.canvas.clientWidth || 1;
    const h = this.canvas.clientHeight || 1;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }
}

/** Boot karty „system zaliczania i sprzątania" (canvas + odczyt procentu). */
export function mountCleanupShowcase(): void {
  const canvas = document.querySelector<HTMLCanvasElement>('canvas.cleanup-canvas');
  if (!canvas) return;
  const verdict = document.querySelector<HTMLElement>('.cu-verdict');
  new CleanupShowcase(canvas, (done) => {
    if (verdict) verdict.classList.toggle('is-on', done);
  });
}

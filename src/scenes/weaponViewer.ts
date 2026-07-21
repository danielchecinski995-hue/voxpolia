/**
 * Little product-shot viewers for the arsenal — one per weapon card, the same
 * idea as the models-workshop inspector but trimmed for the marketing page:
 * a white studio backdrop, PBR lighting, drag to rotate, a slow idle spin, and
 * a soft contact shadow so the weapon sits on the surface instead of floating.
 *
 * Each `<canvas class="weapon-canvas" data-model="/models/x.glb">` gets its own
 * tiny renderer. They only run while on screen (IntersectionObserver), so three
 * idle GL contexts don't tax the machine alongside the hero tower.
 */
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

/** Vertical drag limits so you can't flip the weapon under the floor. */
const POLAR_MIN = 0.35;
const POLAR_MAX = Math.PI / 2 + 0.15;
const DRAG_SENS = 0.01;
const IDLE_SPEED = 0.35; // rad/s auto-spin when not dragging
const RESUME_IDLE_AFTER = 2.5; // s after the last drag before the spin resumes

class WeaponViewer {
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene = new THREE.Scene();
  private readonly camera: THREE.PerspectiveCamera;
  private readonly target = new THREE.Vector3();
  private radius = 4;
  private az = Math.PI * 0.15;
  private pol = Math.PI * 0.42;
  private dragging = false;
  private idleTimer = 0;
  private lastPX = 0;
  private lastPY = 0;
  private visible = false;
  private running = false;
  private prevT = 0;
  private currentModel: THREE.Object3D | null = null;
  private currentShadow: THREE.Mesh | null = null;
  private currentUrl = '';
  /** When set, the viewer uses a FIXED frame (never auto-scales to the model),
   *  so different-sized models of one family show their TRUE relative size —
   *  e.g. the C4 charge growing L1→L2→L3. */
  private readonly fixedRadius: number | null;
  private readonly fixedY: number;

  /** Render the model as a flat black silhouette (mystery/locked weapon). */
  private readonly silhouette: boolean;

  constructor(private readonly canvas: HTMLCanvasElement, url: string,
    opts?: { fixedRadius?: number; fixedY?: number; silhouette?: boolean }) {
    this.fixedRadius = opts?.fixedRadius ?? null;
    this.fixedY = opts?.fixedY ?? 0.09;
    this.silhouette = opts?.silhouette ?? false;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.scene.background = null; // CSS paints the white card behind the canvas

    // Image-based lighting → metal/paint on the weapons has something to reflect.
    const pmrem = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    this.scene.add(new THREE.HemisphereLight(0xffffff, 0xcfd2d6, 0.7));
    const key = new THREE.DirectionalLight(0xffffff, 2.4);
    key.position.set(4, 6, 5);
    const fill = new THREE.DirectionalLight(0xaaccff, 0.5);
    fill.position.set(-5, 2, -3);
    const rim = new THREE.DirectionalLight(0xffffff, 1.0);
    rim.position.set(-3, 4, -6);
    this.scene.add(key, fill, rim);

    this.camera = new THREE.PerspectiveCamera(38, 1, 0.01, 100);

    this.bindPointer();
    this.resize();
    new ResizeObserver(() => this.resize()).observe(canvas);
    new IntersectionObserver((es) => {
      this.visible = es[0]!.isIntersecting;
      if (this.visible) this.start(); else this.stop();
    }, { threshold: 0.05 }).observe(canvas);

    void this.load(url);
  }

  /** Load (or swap to) a weapon model, disposing the previous one. Public so the
   *  level switch can change the shown weapon per tier. No-op if already showing
   *  `url`. */
  async load(url: string): Promise<void> {
    if (url === this.currentUrl) return;
    this.currentUrl = url;
    try {
      const gltf = await new GLTFLoader().loadAsync(url);
      if (url !== this.currentUrl) return; // a newer switch superseded this load
      this.clearModel();
      const model = gltf.scene;
      // Frame: center the model, sit it on y=0, set orbit radius from its size.
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center); // recenter to origin
      model.position.y += size.y / 2; // sit base on the floor (y=0)
      if (this.silhouette) {
        // Mystery weapon: paint every surface flat near-black so only the
        // shape reads — a teasing black silhouette.
        const black = new THREE.MeshBasicMaterial({ color: 0x141210 });
        model.traverse((o) => { const m = o as THREE.Mesh; if (m.isMesh) m.material = black; });
      }
      this.scene.add(model);
      this.currentModel = model;
      if (this.fixedRadius != null) {
        // Fixed frame: same camera for every model, so a bigger model looks
        // bigger (the whole point for the C4 charge size progression).
        this.target.set(0, this.fixedY, 0);
        this.radius = this.fixedRadius;
      } else {
        this.target.set(0, size.y * 0.5, 0);
        this.radius = Math.max(size.x, size.y, size.z) * 2.1 || 4;
      }
      this.currentShadow = this.makeContactShadow(Math.max(size.x, size.z) * 0.9);
      this.scene.add(this.currentShadow);
      this.renderOnce();
    } catch (err) {
      console.error('[weaponViewer] load failed', url, err);
    }
  }

  private clearModel(): void {
    if (this.currentModel) {
      this.scene.remove(this.currentModel);
      this.currentModel.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
        else mat?.dispose();
      });
      this.currentModel = null;
    }
    if (this.currentShadow) {
      this.scene.remove(this.currentShadow);
      this.currentShadow.geometry.dispose();
      (this.currentShadow.material as THREE.Material).dispose();
      this.currentShadow = null;
    }
  }

  /** Cheap fake ground shadow: a radial-gradient sprite laid flat under the
   *  model — grounds it without shadow maps (3 extra contexts stay light). */
  private makeContactShadow(r: number): THREE.Mesh {
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const ctx = c.getContext('2d')!;
    const g = ctx.createRadialGradient(64, 64, 4, 64, 64, 64);
    g.addColorStop(0, 'rgba(20,15,10,0.32)');
    g.addColorStop(1, 'rgba(20,15,10,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 128, 128);
    const tex = new THREE.CanvasTexture(c);
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(r * 3.2, r * 3.2),
      new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false }),
    );
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = 0.002;
    return mesh;
  }

  private bindPointer(): void {
    this.canvas.addEventListener('pointerdown', (e) => {
      this.dragging = true;
      this.idleTimer = 0;
      this.lastPX = e.clientX;
      this.lastPY = e.clientY;
      this.canvas.setPointerCapture(e.pointerId);
    });
    this.canvas.addEventListener('pointermove', (e) => {
      if (!this.dragging) return;
      this.az -= (e.clientX - this.lastPX) * DRAG_SENS;
      this.pol = Math.min(POLAR_MAX, Math.max(POLAR_MIN, this.pol - (e.clientY - this.lastPY) * DRAG_SENS));
      this.lastPX = e.clientX;
      this.lastPY = e.clientY;
    });
    const end = (e: PointerEvent): void => {
      if (!this.dragging) return;
      this.dragging = false;
      this.idleTimer = 0;
      try { this.canvas.releasePointerCapture(e.pointerId); } catch { /* ignore */ }
    };
    this.canvas.addEventListener('pointerup', end);
    this.canvas.addEventListener('pointercancel', end);
  }

  private resize(): void {
    const w = this.canvas.clientWidth || 1;
    const h = this.canvas.clientHeight || 1;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderOnce();
  }

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
    const dt = Math.min((now - this.prevT) / 1000, 0.1);
    this.prevT = now;
    if (!this.dragging) {
      this.idleTimer += dt;
      if (this.idleTimer >= RESUME_IDLE_AFTER) this.az += IDLE_SPEED * dt;
    }
    this.renderOnce();
  }

  private renderOnce(): void {
    const sp = Math.sin(this.pol);
    this.camera.position.set(
      this.target.x + this.radius * sp * Math.sin(this.az),
      this.target.y + this.radius * Math.cos(this.pol),
      this.target.z + this.radius * sp * Math.cos(this.az),
    );
    this.camera.lookAt(this.target);
    this.renderer.render(this.scene, this.camera);
  }
}

/** Render a 5-pip stat bar to `fill` (0–5). */
function paintBar(bar: HTMLElement, fill: number): void {
  const n = Math.max(0, Math.min(5, fill));
  bar.replaceChildren();
  for (let i = 0; i < 5; i++) {
    const pip = document.createElement('span');
    if (i < n) pip.className = 'on';
    bar.appendChild(pip);
  }
}

/** Resolve a stored-relative model path against the document so it survives a
 *  hosting subpath (GitHub Pages serves at /<repo>/). */
function resolveModel(rel: string): string { return new URL(rel, document.baseURI).href; }

/**
 * Boot every arsenal card: a 3D viewer + a LEVEL switch that changes BOTH the
 * stats (they grow with level — never a single maxed-out bar) AND the shown
 * weapon model (`data-models` per tier). One-level weapons get no buttons.
 */
export function mountArsenal(): void {
  for (const card of document.querySelectorAll<HTMLElement>('.weapon')) {
    let stats: Record<string, number[]> = {};
    try { stats = JSON.parse(card.dataset.stats ?? '{}'); } catch { /* leave empty */ }
    let models: Record<string, string> | null = null;
    try { models = card.dataset.models ? JSON.parse(card.dataset.models) : null; } catch { models = null; }

    const levels = Object.keys(stats).sort();
    const bars = [...card.querySelectorAll<HTMLElement>('.wstat-bar')];
    const box = card.querySelector<HTMLElement>('.wlevels');
    const canvas = card.querySelector<HTMLCanvasElement>('canvas.weapon-canvas');
    const base = levels[0] ?? '1';

    const firstModel = models?.[base] ?? canvas?.dataset.model;
    // Optional fixed frame (e.g. C4): show TRUE relative sizes across levels.
    const fr = card.dataset.frameRadius ? Number(card.dataset.frameRadius) : undefined;
    const sil = card.dataset.silhouette === '1';
    const viewer = canvas && firstModel
      ? new WeaponViewer(canvas, resolveModel(firstModel), (fr || sil) ? { fixedRadius: fr, silhouette: sil } : undefined)
      : null;

    const show = (lvl: string): void => {
      const vals = stats[lvl] ?? [];
      bars.forEach((bar, i) => paintBar(bar, vals[i] ?? 0));
      box?.querySelectorAll('.wlvl-btn').forEach((b) => {
        b.classList.toggle('is-on', (b as HTMLElement).dataset.lvl === lvl);
      });
      if (viewer && models?.[lvl]) void viewer.load(resolveModel(models[lvl]!));
    };

    if (box && levels.length > 1) {
      box.replaceChildren();
      for (const lvl of levels) {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'wlvl-btn';
        b.dataset.lvl = lvl;
        b.textContent = `LVL ${lvl}`;
        b.addEventListener('click', () => show(lvl));
        box.appendChild(b);
      }
    }
    show(base); // default to the base level (lowest stats, base model already loaded)
  }
}

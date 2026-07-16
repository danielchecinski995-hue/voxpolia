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

  constructor(private readonly canvas: HTMLCanvasElement, url: string) {
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

  private async load(url: string): Promise<void> {
    try {
      const gltf = await new GLTFLoader().loadAsync(url);
      const model = gltf.scene;
      // Frame: center the model, sit it on y=0, set orbit radius from its size.
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center); // recenter to origin
      model.position.y += size.y / 2; // sit base on the floor (y=0)
      this.scene.add(model);
      this.target.set(0, size.y * 0.5, 0);
      this.radius = Math.max(size.x, size.y, size.z) * 2.1 || 4;
      this.scene.add(this.makeContactShadow(Math.max(size.x, size.z) * 0.9));
      this.renderOnce();
    } catch (err) {
      console.error('[weaponViewer] load failed', url, err);
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

/** Fill the 5-pip stat bars from each bar's `data-fill` (0–5). */
function mountWeaponStats(): void {
  for (const bar of document.querySelectorAll<HTMLElement>('.wstat-bar[data-fill]')) {
    const fill = Math.max(0, Math.min(5, Number(bar.dataset.fill) || 0));
    bar.replaceChildren();
    for (let i = 0; i < 5; i++) {
      const pip = document.createElement('span');
      if (i < fill) pip.className = 'on';
      bar.appendChild(pip);
    }
  }
}

/** Boot every arsenal weapon canvas + its stat bars. Call after DOM is ready. */
export function mountArsenal(): void {
  mountWeaponStats();
  for (const canvas of document.querySelectorAll<HTMLCanvasElement>('canvas.weapon-canvas')) {
    const rel = canvas.dataset.model;
    // Resolve against the document so the GLB path survives a hosting subpath
    // (GitHub Pages serves at /<repo>/); data-model is stored relative.
    if (rel) new WeaponViewer(canvas, new URL(rel, document.baseURI).href);
  }
}

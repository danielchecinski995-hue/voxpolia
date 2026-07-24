/**
 * App shell — one renderer, one scene, one camera, one RAF loop
 * (WEBSITE_PLAN §2). Scenes register an update callback; the loop owns time.
 */
import * as THREE from 'three';

export interface UpdateCtx {
  dt: number;
  elapsed: number;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
}

export type UpdateFn = (ctx: UpdateCtx) => void;

export class App {
  readonly renderer: THREE.WebGLRenderer;
  readonly scene: THREE.Scene;
  readonly camera: THREE.PerspectiveCamera;
  private readonly clock = new THREE.Clock();
  private readonly updates: UpdateFn[] = [];
  private raf = 0;
  private readonly reduced: boolean;
  /** When true the loop keeps spinning but skips updates + render — set while
   *  the hero is scrolled off-screen so a covered canvas costs no GPU. */
  paused = false;

  constructor(canvas: HTMLCanvasElement) {
    this.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true, // transparent — the tower/grass sit over the page's cream bg
      powerPreference: 'high-performance',
    });
    // Cap DPR at 2 — retina past that is wasted fill rate (plan §6).
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    // Transparent clear: no sky rectangle, so the right panel blends seamlessly
    // into the cream page (no grey haze at the split seam).
    this.renderer.setClearColor(0x000000, 0);

    this.scene = new THREE.Scene();
    // Fade distant scenery into the page cream (matches --bg). Pulled in close
    // so the long streets recede into fog and cars vanish into / emerge from it,
    // while the hero tower (~72–90m from camera) stays crisp.
    this.scene.fog = new THREE.Fog(0xf5f1ea, 80, 150);

    this.camera = new THREE.PerspectiveCamera(50, 1, 0.1, 500);
    this.camera.position.set(0, 34, 82);

    this.onResize();
    window.addEventListener('resize', this.onResize);
  }

  get prefersReducedMotion(): boolean {
    return this.reduced;
  }

  onUpdate(fn: UpdateFn): void {
    this.updates.push(fn);
  }

  start(): void {
    const tick = () => {
      const dt = Math.min(this.clock.getDelta(), 0.1); // clamp tab-away spikes
      if (this.paused) {
        this.raf = requestAnimationFrame(tick);
        return;
      }
      const elapsed = this.clock.elapsedTime;
      const ctx: UpdateCtx = {
        dt,
        elapsed,
        renderer: this.renderer,
        scene: this.scene,
        camera: this.camera,
      };
      for (const u of this.updates) u(ctx);
      this.renderer.render(this.scene, this.camera);
      this.raf = requestAnimationFrame(tick);
    };
    this.raf = requestAnimationFrame(tick);
  }

  stop(): void {
    cancelAnimationFrame(this.raf);
  }

  private onResize = (): void => {
    // Size to the canvas's own CSS box, not the window — the hero canvas is
    // only the right half on desktop (split layout), so window size would
    // stretch the render horizontally.
    const canvas = this.renderer.domElement;
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  };
}

/** True when WebGL2 is usable; the site shows a static fallback otherwise. */
export function hasWebGL(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

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
      powerPreference: 'high-performance',
    });
    // Cap DPR at 2 — retina past that is wasted fill rate (plan §6).
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    // Bright daylight backdrop (site is a light theme).
    this.renderer.setClearColor(0xe8ecf1, 1);

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0xe8ecf1, 60, 185);

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
    const w = window.innerWidth;
    const h = window.innerHeight;
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

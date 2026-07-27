/**
 * Bootstrap + page chrome. The hero runs the game's real ~2.3M-block tower, so
 * its construction is a heavy synchronous step — we paint the loader first
 * (double rAF) before building. If WebGL is missing we leave the static site
 * standing (WEBSITE_PLAN §6/§10: "strona ma działać zawsze").
 */
import { App, hasWebGL } from './core/app';
import { LiveBuilding } from './scenes/liveBuilding';
import { initI18n } from './i18n';
import { mountArsenal } from './scenes/weaponViewer';
import { mountCollapseShowcase } from './scenes/collapseShowcase';
import { mountCleanupShowcase } from './scenes/cleanupShowcase';

const canvas = document.getElementById('stage') as HTMLCanvasElement | null;
const topbar = document.getElementById('topbar');
const loader = document.getElementById('loader');
const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());

// Language toggle (PL/EN) + initial content.
initI18n();

// Notka „najlepsza wydajność w Chrome/Edge" — TYLKO poza Chromium
// (user 2026-07-27): Chrome'owi nie robimy szumu przy CTA.
interface UAData { brands?: Array<{ brand: string }> }
const uaBrands = (navigator as Navigator & { userAgentData?: UAData }).userAgentData?.brands;
const isChromium = uaBrands?.some((b) => /Chromium/i.test(b.brand))
  ?? /Chrome\/|Chromium\/|Edg\//.test(navigator.userAgent);
if (!isChromium) document.querySelector('.browser-note')?.classList.add('show');

// Interactive 3D weapon previews + stat bars in the arsenal section.
if (hasWebGL()) mountArsenal();

// Live "same tower, three weapons" collapse loop in the O GRZE section.
if (hasWebGL()) mountCollapseShowcase();

// Live "80% masy w dół → zaliczony → sprzątnięty" loop in the ZASADA section.
if (hasWebGL()) mountCleanupShowcase();

// Scroll-reveal: elements marked `.reveal` fade/slide in as they enter view.
// Reduced-motion users get them shown immediately (no transition).
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealables = document.querySelectorAll<HTMLElement>('.reveal');
if (reduced || !('IntersectionObserver' in window)) {
  revealables.forEach((el) => el.classList.add('in'));
} else {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
  revealables.forEach((el) => io.observe(el));
}

let app: App | null = null;

if (canvas && hasWebGL()) {
  if (loader) loader.classList.add('show');
  // Two frames so the loader is on screen before the blocking mesh build.
  requestAnimationFrame(() => requestAnimationFrame(() => {
    try {
      app = new App(canvas);
      new LiveBuilding(app);
      app.start();
    } catch (err) {
      console.error('[endstreet] 3D init failed, staying on static site', err);
      canvas.style.display = 'none';
      app = null;
    }
    if (loader) loader.classList.remove('show');
  }));
} else if (canvas) {
  canvas.style.display = 'none';
}

// Scroll chrome: fade the hero canvas out as content scrolls over it, pause
// its render loop once it's fully covered, and frost the topbar.
let ticking = false;
function onScroll(): void {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const y = window.scrollY;
    const vh = window.innerHeight;
    if (topbar) topbar.classList.toggle('scrolled', y > 24);
    if (canvas && app) {
      const fade = Math.max(0, 1 - y / (vh * 0.85));
      canvas.style.opacity = String(fade);
      app.paused = fade <= 0.01;
    }
    ticking = false;
  });
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

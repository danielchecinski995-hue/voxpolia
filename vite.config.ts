import { defineConfig } from 'vite';

// Port 5177 reserved for endstreet-web (5173 = Demolition-Town, 5174 Racer,
// 5175 Bijatyka, 5176 Demo, 5180 models). strictPort so we never collide.
export default defineConfig({
  // Relative base so the build works under any path — including a GitHub Pages
  // project subpath (user.github.io/<repo>/) as well as a root domain.
  base: './',
  server: { port: 5177, strictPort: true },
  // No COOP/COEP here on purpose: the sweep runs synchronously on the main
  // thread (a few towers, sub-millisecond), so the site works without
  // SharedArrayBuffer — see WEBSITE_PLAN §3.
  build: {
    target: 'es2022',
    // GLTFLoader pulls WebGPU.js (top-level await) — same gotcha as the game.
    rollupOptions: {},
  },
  optimizeDeps: {
    esbuildOptions: { target: 'es2022' },
  },
});

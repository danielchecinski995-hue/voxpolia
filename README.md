# endstreet-web

Strona studia **Endstreet Eleven** + landing gry **Voxpolia**. Współdzieli silnik
wokselowej destrukcji z gry Demolition-Town / Voxpolia (patrz `WEBSITE_PLAN.md`).

```bash
npm install
npm run dev      # http://localhost:5177
npm run build    # → dist/
```

## Stan (etapy z WEBSITE_PLAN.md)

- ✅ **E0** — ekstrakcja silnika: `src/engine/sweepCore.ts` (vendored z gry, bez zmian)
  + `src/engine/VoxelSim.ts` (czysty wrapper: voxelizacja miasta, impact, kaskadowy sweep). Zero THREE/DOM w symulacji, zero SharedArrayBuffer (sync na main threadzie).
- ✅ **E1** — szkielet: jeden canvas, jedna pętla RAF (`src/core/app.ts`), nakładka DOM z brandingiem, fallback bez WebGL/JS.
- ✅ **E2** — HERO: wokselowe miasto, auto-demolish co ~7 s, klik/tap → uderzenie (raycast), pooled debris, bezszwowa regeneracja (wieża wznosi się spod podłogi), orbit + camera shake, respekt `prefers-reduced-motion`.

## Dalej (nie zrobione)

- E3 post-processing (bloom/dust shader/impact), E4 sekcje WORK/ABOUT/CONTACT + przejścia shaderowe, **E5 embed grywalnego dema (priorytet wg planu)**, E6 audio (reużyj `bus.ts` z gry), E7 adaptive quality, E8 a11y/SEO, E9 deploy.

## Architektura

```
src/engine/   sweepCore.ts (z gry), VoxelSim.ts    ← pure sim
src/core/     app.ts (renderer + RAF)
src/scenes/   cityLayout.ts, hero.ts, debris.ts
src/          main.ts, styles.css
```

Silnik: **nie kopiuj na stałe.** Docelowo `sweepCore.ts` ma jechać z jednego źródła
(monorepo/submoduł) — na razie vendored, żeby strona ruszyła (plan §3).

# Voxpolia / endstreet-web — TODO

Stan na 2026-07-21. Strona LIVE: **https://endstreet.games** (+ www), demo: **https://grasz.endstreet.games**.

## 1. Hero „pół na pół" (W TOKU — koncepcja zmieniona, niedokończone)
Nowy układ hero: **lewa połowa = tekst** (nazwa gry VOXPOLIA, opis, przyciski) na solidnym tle,
**prawa połowa = scena 3D** z JEDNYM budynkiem + kawałkiem drogi + drzewami.

- [x] Sceneria uproszczona do minimalnej (`src/scenes/heroScenery.ts`): 1 niszczalna wieża + ring
      road (cars loop) + ~54 drzewa + 3 auta. Usunięte: osiedle/skyline/siatka kwartałów.
- [ ] **CSS split** (`src/styles.css`, desktop min-width ~861px): lewa ~50% = solidne tło `--bg`
      (np. `.hero::before` inset:0 right:48%, z-index 1), tekst z-index 2 max-width ~46%; feather na
      styku. Canvas `#stage` (fixed fullscreen z-index 0) widoczny tylko po prawej.
- [ ] **Kamera**: wyśrodkować budynek w PRAWEJ połowie (`liveBuilding.driveCamera`, landscape pan
      `_right * -24` → zwiększyć ok. -28/-32; ew. dist). Zweryfikować, że budynek siedzi ~72–75% szer.
- [ ] **Kontrolki** `.rotate-controls` (reset/obróć) przenieść do prawej połowy (teraz left:50%).
- [ ] **Mobile**: zdecydować — zostać przy stacku (tekst góra / budynek dół) czy split góra-dół.
      Half/half tylko desktop.
- [ ] Zweryfikować oba (desktop+mobile) screenshotami, wdrożyć (Cloudflare `endstreet` + gh-pages).

## 2. E-mail hello@endstreet.games (czeka na usera w panelu Cloudflare)
- [ ] Usunąć 4 rekordy MX `eforward1-4.registrar-servers.com` (Cloudflare DNS) — blokują Email Routing.
- [ ] Kliknąć link weryfikacyjny w mailu „[Cloudflare]: Verify Email Routing" na `endstreet.games.pl@gmail.com`.
- [ ] Cloudflare → Email → Email Routing → **Enable** (doda swoje MX).
- [ ] Add route: `hello@endstreet.games` → `endstreet.games.pl@gmail.com` (panel lub API z tokenem
      wranglera — scope email_routing:write).
- Adres kontaktowy na stronie już = `hello@endstreet.games` (zadziała po włączeniu routingu).

## 3. Pomysły na później (opcjonalne)
- [ ] Osobista historia w sekcji Studio (imię, skąd, iskra, marzenie) — user poda, przetłumaczyć na 10 języków.
- [ ] Auto-deploy (push main → gh-pages Actions) — wymaga `gh auth refresh -s workflow`.
- [ ] Analityka Cloudflare Web Analytics (odwiedziny) — włączyć w panelu.
- [ ] Ew. detale osiedla: latarnie, fontanna, ścieżki w parku (jeśli wrócimy do pełnej scenerii).

## Deploy (przypomnienie)
```bash
cd ~/projekty-github/endstreet-web
npm run build
npx wrangler pages deploy dist --project-name endstreet --commit-dirty=true   # → endstreet.games
npm run deploy                                                                 # → gh-pages (backup)
```

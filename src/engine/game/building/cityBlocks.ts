import { GLASS_FLAG } from './BuildingCluster';
import type { BuildingBlock } from './BuildingCluster';
import type { BuildingConfig } from './Building';

/**
 * Voxel generators for the city buildings. Each returns a config + the
 * block list for `new Building(config, blocks)`.
 *
 * INVARIANT: blocks are emitted in gy-ASCENDING order — the structural
 * sweep's grounding pass (and its diagonal variant) assumes a cell's
 * below-layer flags are final when the cell is reached.
 *
 * Sizes are chosen for gameplay, not 1:1 realism: interiors are walkable,
 * openings are jump-through, and every structure obeys the demolition
 * rule — one rocket makes a local hole; felling needs real support cuts.
 */

export interface GeneratedBuilding {
  config: BuildingConfig;
  blocks: BuildingBlock[];
}

const FINE = 0.13125; // concrete/brick city grid
const COARSE = 0.2625; // wysokie biurowce — grubszy moduł (pamięć/koszt)
/** Zwykła szyba (apartamentowce, domki). */
const COLOR_GLASS = 0x9fd4ef | GLASS_FLAG;
/** Witraże katedry — nasycone barwy w poziomych pasach / sektorach. */
const STAINED: readonly number[] = [
  0x355fae | GLASS_FLAG,
  0x9c2730 | GLASS_FLAG,
  0xc78f2c | GLASS_FLAG,
  0x2f7d4f | GLASS_FLAG,
];

/** Shared cell-rule driver: walks the grid gy-ascending and collects every
 *  non-null cell. */
function generate(
  cfg: BuildingConfig,
  cellColor: (gx: number, gy: number, gz: number) => number | null,
): BuildingBlock[] {
  const blocks: BuildingBlock[] = [];
  for (let gy = 0; gy < cfg.height; gy++) {
    for (let gx = 0; gx < cfg.width; gx++) {
      for (let gz = 0; gz < cfg.depth; gz++) {
        const color = cellColor(gx, gy, gz);
        if (color === null) continue;
        blocks.push({ gx, gy, gz, color });
      }
    }
  }
  return blocks;
}

// ---------------------------------------------------------------------------
// KATEDRA (wzór: katedra gnieźnieńska) — ceglany gotyk: dwie wieże z
// zielonymi (miedź) iglicami od frontu, długa nawa z dwuspadowym miedzianym
// dachem, ostrołukowe okna między przyporami, portal i rozeta w fasadzie.
// ---------------------------------------------------------------------------

const CATH_W = 274; // 36 m wzdłuż nawy (X), wieże na wschodnim końcu
const CATH_D = 122; // 16 m
const CATH_H = 300; // ~39 m — wyższe, smuklejsze iglice (większa katedra)
const CATH_WALL = 4;
const CATH_WALL_TOP = 99; // 13 m — korona murów nawy
const CATH_RIDGE_Z = 61;
const CATH_TOWER_X0 = 228; // strefa wież: gx ∈ [228, 274)
const CATH_TOWER_TOP = 183; // 24 m — korpusy wież
const COLOR_BRICK = 0x9c4a32;
const COLOR_BRICK_DARK = 0x7a3424;
const COLOR_COPPER = 0x5f8a6e; // patyna
const COLOR_STONE_TRIM = 0xd8cdb4;
const COLOR_CATH_FLOOR = 0xb0a890;

/** Wysokość połaci dachu dla danego gz (kalenica w środku rozpiętości).
 *  Nachylenie DOKŁADNIE 1 komórka na warstwę i obie okapowe kolumny
 *  startują na koronie muru (gy 99) — ułamkowe nachylenia albo asymetria
 *  przerywają łańcuch ugruntowania po skosie i sweep ścinał połać
 *  nietkniętej katedry. */
function cathRoofY(gz: number): number {
  return CATH_WALL_TOP + Math.min(gz - CATH_WALL, CATH_D - 1 - CATH_WALL - gz);
}

function cathedralCell(gx: number, gy: number, gz: number): number | null {
  // Posadzka — gruba płyta pod całością.
  if (gy < 3) return COLOR_CATH_FLOOR;

  // --- Strefa wież (wschodni koniec) ---
  if (gx >= CATH_TOWER_X0) {
    const inTowerA = gz <= 45;
    const inTowerB = gz >= 76;
    if (inTowerA || inTowerB) {
      const lz = inTowerA ? gz : gz - 76;
      const lx = gx - CATH_TOWER_X0;
      const hx = Math.abs(lx - 22.5);
      const hz = Math.abs(lz - 22.5);
      const hmax = Math.max(hx, hz);
      if (gy < CATH_TOWER_TOP) {
        // Korpus: pusty kwadrat, mur 4 bloki, wąskie okna na osi ścian.
        if (hmax < 19) return null; // wnętrze wieży
        if (hmax > 23) return null;
        const slit = (gy % 56) >= 18 && (gy % 56) <= 41 && Math.min(hx, hz) < 4;
        if (slit) return null;
        return gy < 16 ? COLOR_BRICK_DARK : COLOR_BRICK;
      }
      // Iglica: zbiegająca się piramidalna skorupa (miedź).
      const t = (gy - CATH_TOWER_TOP) / (CATH_H - CATH_TOWER_TOP);
      const h = Math.max(1.5, 23 * (1 - t));
      if (hmax <= h && hmax >= h - 2.5) return COLOR_COPPER;
      return null;
    }
    // Ściana poprzeczna przedsionka (od posadzki po łącznik) z ostrołukowym
    // przejściem. Bez niej płaski strop nad wejściem wisi wspornikowo ~42
    // komórki na samej fasadzie i statyka słusznie go zrywa; ściana czyni go
    // stropem rozpiętym między nią a fasadą (podparty z dwóch stron).
    if (gx <= CATH_TOWER_X0 + 2 && gz >= 48 && gz <= 73
      && gy < CATH_WALL_TOP + 4) {
      const pw = gy < 30 ? 9 : Math.max(0, 9 - (gy - 30) * 0.8);
      if (Math.abs(gz - CATH_RIDGE_Z) <= pw) return null; // przejście do nawy
      return COLOR_STONE_TRIM;
    }
    // Fasada między wieżami (portal + rozeta) — pełna ściana na wschodzie.
    // Dylatacja 2 komórek przy każdej wieży: wieże są strukturalnie
    // NIEZALEŻNE — ścinasz podstawę wieży, wieża pada; bez szczeliny
    // "niewidoczny zrost" z fasadą/nawą trzymał ją wbrew intuicji gracza.
    if (gx >= CATH_W - CATH_WALL) {
      if (gz <= 47 || gz >= 74) return null; // dylatacja przy wieżach
      if (gy >= 110) return null; // szczyt fasady między wieżami
      // Portal — szerokie wejście z ostrołukiem.
      const pw = gy < 28 ? 9 : Math.max(0, 9 - (gy - 28) * 0.75);
      if (gy < 40 && Math.abs(gz - CATH_RIDGE_Z) <= pw) return null;
      // Rozeta — okrągłe okno: witraż sektorami wokół środka.
      const rd = (gz - CATH_RIDGE_Z) ** 2 + (gy - 72) ** 2;
      if (rd <= 100) {
        if (gx === CATH_W - 3) {
          const sector = Math.floor(
            ((Math.atan2(gy - 72, gz - CATH_RIDGE_Z) + Math.PI) / (Math.PI * 2)) * 8,
          );
          return STAINED[sector % 4]!;
        }
        return null;
      }
      if (rd <= 169) return COLOR_STONE_TRIM;
      return COLOR_BRICK;
    }
    // Łącznik nad przedsionkiem między wieżami: płaski strop (z tą samą
    // dylatacją — wisi wspornikowo na fasadzie, nie na wieżach).
    if (gz >= 48 && gz <= 73 && gy >= CATH_WALL_TOP && gy < CATH_WALL_TOP + 4) {
      return COLOR_COPPER;
    }
    return null;
  }

  // --- Nawa ---
  // Dylatacja oddzielająca nawę od strefy wież (patrz fasada wyżej).
  if (gx >= CATH_TOWER_X0 - 2) return null;
  const roofY = cathRoofY(gz);
  const isSideWall = gz < CATH_WALL || gz >= CATH_D - CATH_WALL;
  const isWestWall = gx < CATH_WALL;
  // Przypory: pogrubienie muru co przęsło (rytm gotyckiej elewacji).
  const bay = gx % 24;
  const isButtress = (gz < 8 || gz >= CATH_D - 8) && bay <= 3 && gx < CATH_TOWER_X0;

  if (gy < CATH_WALL_TOP) {
    if (isSideWall || isWestWall || isButtress) {
      // Ostrołukowe okna w przęsłach ścian bocznych.
      if (isSideWall && !isButtress && gx > 8 && gx < CATH_TOWER_X0 - 4) {
        const c = Math.abs(bay - 11.5);
        const half = gy <= 64 ? 5.5 : Math.max(0, 5.5 - (gy - 64) * 0.3);
        if (gy >= 24 && c <= half) {
          // Witraż: tafla w głębi ościeża, kolory pasami co ~1.8 m.
          const depth = gz < CATH_WALL ? gz : CATH_D - 1 - gz;
          return depth === 1 ? STAINED[Math.floor(gy / 14) % 4]! : null;
        }
        if (gy >= 22 && c <= half + 1.5 && gy <= 84) return COLOR_STONE_TRIM;
      }
      return gy < 16 ? COLOR_BRICK_DARK : COLOR_BRICK;
    }
    // Pusta nawa — wewnętrzne filary usunięte (dach niesie się po skosie na
    // ściany i więźbę, więc wnętrze może być puste). „Bardziej pusta katedra".
    return null;
  }

  // Szczyt zachodni pod dachem.
  if (isWestWall && gy < roofY + 1) return COLOR_BRICK;

  // Dach dwuspadowy — miedziana skorupa 3 bloki W GÓRĘ od linii połaci:
  // najniższy kurs siedzi na koronie muru (gy 99 przy gz=4) i każda
  // kolumna gruntuje się po skosie o dokładnie 1 niżej.
  if (gz >= 4 && gz < CATH_D - 4 && gy >= roofY && gy < roofY + 3) return COLOR_COPPER;

  return null;
}

export function generateCathedral(originX: number, originZ: number): GeneratedBuilding {
  const config: BuildingConfig = {
    width: CATH_W,
    depth: CATH_D,
    height: CATH_H,
    blockSize: FINE,
    originX,
    originZ,
    // Połacie dachu, iglice — nośność idzie po skosie (mur + więźba).
    diagonalGrounding: true,
    // Cegła: zmierzony szczyt nietkniętej katedry to ~1100 (koncentracja
    // w nasadach łuku portalu) — margines 1.6×. Filar ścięty do paska
    // przekracza to dziesięciokrotnie.
    crushLoad: 1750,
  };
  return { config, blocks: generate(config, cathedralCell) };
}

// ---------------------------------------------------------------------------
// APARTAMENTOWIEC — płytowiec z balkonami od południa, rytmiczna siatka
// okien, wejście od północy, attyka na dachu.
// ---------------------------------------------------------------------------

const APT_W = 183; // 24 m
const APT_BODY_D = 83; // 10.9 m — korpus; za nim strefa balkonów
const APT_D = 99; // 13 m razem z balkonami
const APT_FLOOR_H = 21; // 2.75 m
const APT_WALL = 3;
const APT_SLAB = 3;
const COLOR_APT_SLAB = 0x9a9a9a;
const COLOR_APT_FRAME = 0x4a6580;
const COLOR_APT_RAIL = 0x5a6068;

function apartmentCell(
  gx: number,
  gy: number,
  gz: number,
  floors: number,
  wallColor: number,
): number | null {
  const roofBase = floors * APT_FLOOR_H;
  const floorIdx = Math.floor(gy / APT_FLOOR_H);
  const yin = gy - floorIdx * APT_FLOOR_H;
  const bay = gx % 14;
  const isWindowBay = bay >= 4 && bay <= 11 && gx > 6 && gx < APT_W - 7;

  // Attyka nad dachem — tylko obwód korpusu.
  if (gy > roofBase + APT_SLAB - 1) {
    if (gy <= roofBase + APT_SLAB + 7
      && (gx < APT_WALL || gx >= APT_W - APT_WALL || gz < APT_WALL || gz >= APT_BODY_D - APT_WALL)
      && gz < APT_BODY_D) {
      return COLOR_APT_SLAB;
    }
    return null;
  }

  // --- Strefa balkonów (południe, gz za korpusem) ---
  if (gz >= APT_BODY_D) {
    if (floorIdx === 0 || floorIdx >= floors) return null;
    const onBalconyBay = (Math.floor(gx / 28) % 2) === 0 && gx > 6 && gx < APT_W - 7;
    if (!onBalconyBay) return null;
    if (yin < 2 && gz < APT_D - 1) return COLOR_APT_SLAB; // płyta balkonu
    // Balustrada: przednia krawędź + boki, do ~1.2 m.
    const isRailEdge = gz === APT_D - 2 || (gx % 28 === 0) || (gx % 28 === 27);
    if (yin >= 2 && yin <= 9 && isRailEdge && gz < APT_D - 1) return COLOR_APT_RAIL;
    return null;
  }

  // --- Korpus ---
  if (floorIdx >= floors) {
    return gy < roofBase + APT_SLAB ? COLOR_APT_SLAB : null; // płyta dachu
  }
  if (yin < APT_SLAB) return COLOR_APT_SLAB; // strop

  const isPerimeter = gx < APT_WALL || gx >= APT_W - APT_WALL
    || gz < APT_WALL || gz >= APT_BODY_D - APT_WALL;
  if (!isPerimeter) return null; // otwarte plany pięter

  // Wejście od północy (gz=0), parter — szerokie na luźne przemieszczanie.
  if (floorIdx === 0 && gz < APT_WALL
    && Math.abs(gx - APT_W / 2) <= 11 && yin < APT_SLAB + 19) {
    return null;
  }
  // Drzwi balkonowe od południa — przeszklone (tafla w środku muru).
  if (gz >= APT_BODY_D - APT_WALL && floorIdx >= 1
    && (Math.floor(gx / 28) % 2) === 0 && (gx % 28) >= 10 && (gx % 28) <= 17
    && yin >= APT_SLAB && yin <= 17) {
    return APT_BODY_D - 1 - gz === 1 ? COLOR_GLASS : null;
  }
  // Okna na elewacjach X/Z (z taflą w środku grubości muru).
  const onZFace = gz < APT_WALL || gz >= APT_BODY_D - APT_WALL;
  const aptDepth = onZFace
    ? (gz < APT_WALL ? gz : APT_BODY_D - 1 - gz)
    : (gx < APT_WALL ? gx : APT_W - 1 - gx);
  const u = onZFace ? gx : gz;
  const ub = u % 14;
  const inBay = onZFace ? isWindowBay : ub >= 4 && ub <= 11 && u > 6 && u < APT_BODY_D - 7;
  if (inBay && yin >= 7 && yin <= 16) {
    return aptDepth === 1 ? COLOR_GLASS : null;
  }
  if (inBay && (yin === 6 || yin === 17)) return COLOR_APT_FRAME;
  return floorIdx === 0 ? COLOR_APT_FRAME : wallColor;
}

export function generateApartment(
  originX: number,
  originZ: number,
  floors: number,
  wallColor: number,
): GeneratedBuilding {
  const config: BuildingConfig = {
    width: APT_W,
    depth: APT_D,
    height: floors * APT_FLOOR_H + APT_SLAB + 8,
    blockSize: FINE,
    originX,
    originZ,
    // Żelbet płytowca: zmierzony szczyt nietknięty ~6930 (płyty i balkony
    // oddają masę do ścian), margines ~2×.
    crushLoad: 14000,
  };
  return {
    config,
    blocks: generate(config, (gx, gy, gz) => apartmentCell(gx, gy, gz, floors, wallColor)),
  };
}

// ---------------------------------------------------------------------------
// DOM JEDNORODZINNY — parterowy z poddaszem, dach dwuspadowy z okapem,
// komin, drzwi od frontu i okna dookoła.
// ---------------------------------------------------------------------------

const HOUSE_W = 69; // 9 m
const HOUSE_D = 57; // 7.5 m (z okapem)
const HOUSE_H = 54; // 7 m z kominem
const HOUSE_WALL_TOP = 23; // 3 m
const HOUSE_RIDGE_Z = 28;
const COLOR_HOUSE_TRIM = 0xefe8da;

function houseRoofY(gz: number): number {
  return HOUSE_WALL_TOP + (26 - Math.abs(gz - HOUSE_RIDGE_Z));
}

function houseCell(
  gx: number,
  gy: number,
  gz: number,
  wallColor: number,
  roofColor: number,
): number | null {
  if (gy < 2) return 0x8a8478; // płyta fundamentowa

  const inBody = gx >= 2 && gx <= HOUSE_W - 3 && gz >= 4 && gz <= HOUSE_D - 5;
  const roofY = houseRoofY(gz);

  if (gy < HOUSE_WALL_TOP) {
    if (!inBody) return null;
    const isWall = gx < 4 || gx > HOUSE_W - 5 || gz < 6 || gz > HOUSE_D - 7;
    if (!isWall) return null;
    // Drzwi od frontu (wysokie gz) — poszerzone (1.6 m).
    if (gz > HOUSE_D - 7 && gx >= 10 && gx <= 21 && gy < 20) return null;
    // Okna: dwa od frontu, dwa z tyłu, po jednym na bokach.
    const onFront = gz > HOUSE_D - 7;
    const onBack = gz < 6;
    const onSide = gx < 4 || gx > HOUSE_W - 5;
    const winY = gy >= 9 && gy <= 17;
    if (winY) {
      // Tafla w wewnętrznej z dwóch warstw muru.
      const hDepth = onFront ? HOUSE_D - 5 - gz
        : onBack ? gz - 4
          : gx < 4 ? gx - 2 : HOUSE_W - 3 - gx;
      if ((onFront || onBack) && ((gx >= 30 && gx <= 39) || (gx >= 50 && gx <= 59))) {
        return hDepth === 1 ? COLOR_GLASS : null;
      }
      if (onSide && gz >= 24 && gz <= 33) {
        return hDepth === 1 ? COLOR_GLASS : null;
      }
      if ((onFront || onBack) && ((gx >= 28 && gx <= 41) || (gx >= 48 && gx <= 61))
        && (gy === 9 || gy === 17)) {
        return COLOR_HOUSE_TRIM;
      }
    }
    return wallColor;
  }

  // Komin — przebija dach przy kalenicy.
  if (gx >= 14 && gx <= 19 && gz >= 26 && gz <= 31 && gy < HOUSE_H - 1) {
    if (gy >= roofY - 2) return 0x6e5648;
  }

  // Szczyty (gable) pod połaciami.
  if ((gx >= 2 && gx <= 3) || (gx >= HOUSE_W - 4 && gx <= HOUSE_W - 3)) {
    if (gz >= 6 && gz <= HOUSE_D - 7 && gy < roofY - 1) return wallColor;
  }

  // Połacie dachu — 2 bloki grubości, z okapem poza obrysem ścian.
  if (gy <= roofY && gy > roofY - 2 && gy >= HOUSE_WALL_TOP - 2) return roofColor;

  return null;
}

export function generateHouse(
  originX: number,
  originZ: number,
  wallColor: number,
  roofColor: number,
): GeneratedBuilding {
  const config: BuildingConfig = {
    width: HOUSE_W,
    depth: HOUSE_D,
    height: HOUSE_H,
    blockSize: FINE,
    originX,
    originZ,
    // Połacie 45° niosą się po skosie na ściany szczytowe.
    diagonalGrounding: true,
    // Mur domku: zmierzony szczyt nietknięty ~200; margines obniżony do ~1.5×
    // (300) — jedna rakieta podcinająca ścianę ma walić CAŁY domek (1-strzał).
    crushLoad: 300,
  };
  return {
    config,
    blocks: generate(config, (gx, gy, gz) => houseCell(gx, gy, gz, wallColor, roofColor)),
  };
}

// ---------------------------------------------------------------------------
// DUŻY DOM JEDNORODZINNY — PIĘTROWY (2 kondygnacje), dach dwuspadowy z kominem.
// Większy i wyższy od zwykłego domku — wypełnia gęste przedmieścia kampanii.
// ---------------------------------------------------------------------------

const HL_W = 96;           // 12.6 m
const HL_D = 80;           // 10.5 m (z okapem)
const HL_FLOOR_H = 26;     // ~3.4 m na kondygnację
const HL_FLOORS = 2;       // piętrowy
const HL_SLAB = 3;
const HL_WALL_TOP = HL_FLOOR_H * HL_FLOORS; // 52
const HL_RIDGE_Z = 40;
const HL_ROOF_PEAK = 24;
const HL_H = HL_WALL_TOP + HL_ROOF_PEAK + 4; // 80 (zapas na komin)

function houseLargeRoofY(gz: number): number {
  const half = (HL_D - 8) / 2;
  return HL_WALL_TOP + Math.max(0, HL_ROOF_PEAK - Math.round((Math.abs(gz - HL_RIDGE_Z) * HL_ROOF_PEAK) / half));
}

function houseLargeCell(
  gx: number,
  gy: number,
  gz: number,
  wallColor: number,
  roofColor: number,
): number | null {
  if (gy < 2) return 0x8a8478; // płyta fundamentowa
  const inBody = gx >= 2 && gx <= HL_W - 3 && gz >= 4 && gz <= HL_D - 5;
  const roofY = houseLargeRoofY(gz);

  if (gy < HL_WALL_TOP) {
    if (!inBody) return null;
    const isWall = gx < 4 || gx > HL_W - 5 || gz < 6 || gz > HL_D - 7;
    const floorIdx = Math.floor(gy / HL_FLOOR_H);
    const yin = gy - floorIdx * HL_FLOOR_H;
    if (!isWall) {
      if (yin < HL_SLAB) return 0x9a9488; // strop/podłoga każdej kondygnacji
      return null;                        // wnętrze pokoju puste
    }
    // Drzwi wejściowe — parter, front.
    if (gz > HL_D - 7 && gy < 20 && gx >= HL_W / 2 - 7 && gx <= HL_W / 2 + 6) return null;
    // Okna — rząd na każdej kondygnacji, front/tył/boki.
    const onFront = gz > HL_D - 7;
    const onBack = gz < 6;
    const onSide = gx < 4 || gx > HL_W - 5;
    if (yin >= 9 && yin <= 18) {
      const depth = onFront ? HL_D - 5 - gz : onBack ? gz - 4 : gx < 4 ? gx - 2 : HL_W - 3 - gx;
      if (onFront || onBack) {
        const m = gx % 24;
        if (m >= 5 && m <= 14 && gx >= 8 && gx <= HL_W - 9) return depth === 1 ? COLOR_GLASS : null;
      }
      if (onSide) {
        const m = gz % 24;
        if (m >= 6 && m <= 15 && gz >= 12 && gz <= HL_D - 13) return depth === 1 ? COLOR_GLASS : null;
      }
    }
    return wallColor;
  }

  // Komin przy kalenicy.
  if (gx >= HL_W / 2 - 3 && gx <= HL_W / 2 + 2 && gz >= HL_RIDGE_Z - 2 && gz <= HL_RIDGE_Z + 3 && gy < HL_H - 1) {
    if (gy >= roofY - 2) return 0x6e5648;
  }
  // Szczyty pod połaciami.
  if ((gx >= 2 && gx <= 3) || (gx >= HL_W - 4 && gx <= HL_W - 3)) {
    if (gz >= 6 && gz <= HL_D - 7 && gy < roofY - 1) return wallColor;
  }
  // Połacie dachu (2 bloki grubości).
  if (gy <= roofY && gy > roofY - 2 && gy >= HL_WALL_TOP - 2) return roofColor;
  return null;
}

/** Większy, PIĘTROWY dom jednorodzinny (2 kondygnacje) — do gęstych przedmieść. */
export function generateHouseLarge(
  originX: number,
  originZ: number,
  wallColor: number,
  roofColor: number,
): GeneratedBuilding {
  const config: BuildingConfig = {
    width: HL_W,
    depth: HL_D,
    height: HL_H,
    blockSize: FINE,
    originX,
    originZ,
    diagonalGrounding: true,
    crushLoad: 600,
  };
  return {
    config,
    blocks: generate(config, (gx, gy, gz) => houseLargeCell(gx, gy, gz, wallColor, roofColor)),
  };
}

// ---------------------------------------------------------------------------
// BIUROWIEC (downtown) — szklana ściana kurtynowa na grubszym module,
// otwarte piętra ze słupami i biurkami, SZEROKA klatka schodowa w rdzeniu,
// lobby z wejściami z dwóch stron, na dachu billboard z pikselową reklamą.
// ---------------------------------------------------------------------------

const SKY_W = 72; // 18.9 m
const SKY_D = 56; // 14.7 m
const SKY_FLOOR_H = 14; // 3.67 m
const SKY_SLAB = 2;
const SKY_CORE = { x0: 20, x1: 41, z0: 20, z1: 35 } as const;
const COLOR_SKY_GLASS = 0x8fc8e8 | GLASS_FLAG;
const COLOR_SKY_SLAB = 0x8e9298;
const COLOR_SKY_COL = 0x7a7e86;
const COLOR_DESK = 0x7a5a3c;
const COLOR_CHAIR = 0x37404e;
const COLOR_AD_A = 0xf2efe6;

/** Schody rdzenia: dwa biegi po 7 stopni (riser 1 komórka / tread 2) +
 *  podesty; rel zwraca górną warstwę stopnia albo -1 (powietrze). */
function skyStairTop(gx: number, gz: number): number {
  if (gx >= 36 && gx <= SKY_CORE.x1) return 7; // wschodni podest
  if (gx >= 22 && gx <= 35) {
    if (gz >= 21 && gz <= 27) return ((gx - 22) >> 1) + 1; // bieg A: 1..7
    if (gz >= 28 && gz <= 34) return 7 + ((35 - gx) >> 1) + 1; // bieg B: 8..14
  }
  return -1;
}

function skyscraperCell(
  gx: number,
  gy: number,
  gz: number,
  floors: number,
  accent: number,
  glass: number,
): number | null {
  const roofBase = floors * SKY_FLOOR_H;
  const floorIdx = Math.floor(gy / SKY_FLOOR_H);
  const yin = gy - floorIdx * SKY_FLOOR_H;
  const inCore = gx >= SKY_CORE.x0 && gx <= SKY_CORE.x1
    && gz >= SKY_CORE.z0 && gz <= SKY_CORE.z1;

  // --- Dach: attyka, klimatyzatory, billboard ---
  if (gy >= roofBase + SKY_SLAB) {
    const rel = gy - (roofBase + SKY_SLAB);
    const isPerim = gx < 2 || gx >= SKY_W - 2 || gz < 2 || gz >= SKY_D - 2;
    if (rel < 4 && isPerim) return accent; // attyka
    // Klimatyzatory.
    if (rel < 5 && gx >= 8 && gx <= 14 && gz >= 8 && gz <= 12) return 0x9aa0a6;
    if (rel < 4 && gx >= 58 && gx <= 63 && gz >= 42 && gz <= 46) return 0x9aa0a6;
    // Billboard: dwa słupy na PEŁNĄ wysokość po bokach panelu (rel 0..17) —
    // panel rozpięty MIĘDZY nimi, więc każda jego komórka dosięga słupa
    // bocznie (inaczej środek panelu to wisząca masa i load-flow ją zrywa).
    if (rel < 18 && gz >= 26 && gz <= 27
      && ((gx >= 22 && gx <= 23) || (gx >= 48 && gx <= 49))) return 0x2c2e34;
    if (rel >= 8 && rel < 18 && gz === 26 && gx >= 24 && gx <= 47) {
      // Pikselowy wzór reklamy — pasy i kropki w kolorze akcentu.
      const px = ((gx >> 2) + (rel >> 2)) % 3;
      return px === 0 ? accent : px === 1 ? COLOR_AD_A : 0x1c1e24;
    }
    return null;
  }

  // --- Schody w rdzeniu (otwartym przez wszystkie piętra) ---
  if (inCore) {
    // Zachodni podest wejściowy: pełny strop.
    if (gx <= 21) return yin < SKY_SLAB ? COLOR_SKY_SLAB : null;
    const isSlabLayer = yin < SKY_SLAB;
    const effFloor = isSlabLayer && gy >= SKY_FLOOR_H ? floorIdx - 1 : floorIdx;
    const rel = gy - effFloor * SKY_FLOOR_H;
    const top = skyStairTop(gx, gz);
    // Lity klin schodów (wypełnienie pod stopniami aż do podestu) — każda
    // komórka opiera się o tę poniżej, łańcuch nośny do gruntu. Pływające
    // płyty stopni w otwartym świetliku load-flow słusznie zrywał jako masę
    // wiszącą.
    if (top >= 1 && rel <= top) return COLOR_SKY_COL; // stopnie
    if (gy < SKY_SLAB) return COLOR_SKY_SLAB; // płyta parteru pod rdzeniem
    return null; // otwarty świetlik klatki
  }

  // --- Stropy ---
  if (floorIdx >= floors) {
    return gy < roofBase + SKY_SLAB ? COLOR_SKY_SLAB : null;
  }
  if (yin < SKY_SLAB) return COLOR_SKY_SLAB;

  // Fasada 3 komórki (0.79 m — przepis starego wieżowca w module COARSE):
  // cienka 2-komórkowa skorupa rozpadała się przy zawale na płaskie arkusze
  // kurtynowe, które wirowały na boki zamiast walić się w dół.
  const isPerimeter = gx < 3 || gx >= SKY_W - 3 || gz < 3 || gz >= SKY_D - 3;
  if (isPerimeter) {
    // Narożniki i mulliony (słupki) — konstrukcja ściany kurtynowej.
    const corner = (gx < 5 || gx >= SKY_W - 5) && (gz < 5 || gz >= SKY_D - 5);
    if (corner) return accent;
    const onZFace = gz < 3 || gz >= SKY_D - 3;
    const u = onZFace ? gx : gz;
    if (u % 8 < 2) return accent; // mullion co 2.1 m
    // Lobby: szerokie wejścia z południa i północy (5.2 m).
    if (floorIdx === 0 && onZFace && gx >= 26 && gx <= 45 && yin < 13) return null;
    // Pas nadprożowy (spandrel) + tafla w środku grubości muru.
    if (yin <= 3 || yin === SKY_FLOOR_H - 1) return accent;
    const depth = onZFace ? Math.min(gz, SKY_D - 1 - gz) : Math.min(gx, SKY_W - 1 - gx);
    return depth === 1 ? glass : null;
  }

  // Siatka grubych słupów 3×3 przez całą wysokość (jak w starym wieżowcu —
  // odcięte sekcje są zwartymi bryłami strop+słupy, nie pustymi pudłami).
  const onColX = (gx - 11) % 16 < 3 && gx >= 11 && gx < SKY_W - 8;
  const onColZ = (gz - 11) % 16 < 3 && gz >= 11 && gz < SKY_D - 8;
  if (onColX && onColZ && !inCore) return COLOR_SKY_COL;

  // Biura: biurka z krzesłami na piętrach (poza parterem-lobby).
  if (floorIdx >= 1 && yin >= SKY_SLAB && yin <= SKY_SLAB + 2) {
    const dx = gx % 16;
    const dz = gz % 14;
    const deskRow = gx > 6 && gx < SKY_W - 7 && gz > 6 && gz < SKY_D - 7;
    if (deskRow && dx >= 4 && dx <= 8 && dz >= 4 && dz <= 5 && yin <= SKY_SLAB + 1) {
      return COLOR_DESK;
    }
    if (deskRow && dx === 6 && dz === 7) return COLOR_CHAIR;
  }
  return null;
}

export function generateSkyscraper(
  originX: number,
  originZ: number,
  floors: number,
  accent: number,
  glass: number = COLOR_SKY_GLASS,
): GeneratedBuilding {
  const config: BuildingConfig = {
    width: SKY_W,
    depth: SKY_D,
    height: floors * SKY_FLOOR_H + SKY_SLAB + 18,
    blockSize: COARSE,
    originX,
    originZ,
    // Lity rdzeń schodów dźwiga najwięcej: zmierzony szczyt ~2956,
    // margines ~2.0×.
    crushLoad: 6000,
  };
  return {
    config,
    blocks: generate(config, (gx, gy, gz) => skyscraperCell(gx, gy, gz, floors, accent, glass)),
  };
}

/** Glass tints for colourful skyscrapers (paired with vivid accents). */
export const SKY_GLASS_TINTS: readonly number[] = [
  0x8fc8e8 | GLASS_FLAG, 0x7fb0d8 | GLASS_FLAG, 0xa0d0b0 | GLASS_FLAG,
  0xd0b890 | GLASS_FLAG, 0xc89ab0 | GLASS_FLAG, 0x9ab0d8 | GLASS_FLAG,
  0xb8c8a0 | GLASS_FLAG, 0xd8c070 | GLASS_FLAG, 0x90c0c0 | GLASS_FLAG,
];

// ---------------------------------------------------------------------------
// SKLEP — parterowy pawilon: witryna na całą szerokość, szeroka brama
// wejściowa, kolorowy szyld z pikselowym "napisem", lada i regały w środku.
// ---------------------------------------------------------------------------

const SHOP_W = 92; // 12 m
const SHOP_D = 61; // 8 m
const SHOP_H = 46; // 6 m

function shopCell(
  gx: number,
  gy: number,
  gz: number,
  wallColor: number,
  signColor: number,
): number | null {
  if (gy < 2) return 0x8a8478; // płyta

  // Szyld nad witryną (od frontu, pełna szerokość).
  if (gy >= 29 && gy <= 37 && gz >= SHOP_D - 4) {
    if (gx < 2 || gx >= SHOP_W - 2) return wallColor;
    const px = (gx >> 2) % 3;
    return px === 0 ? COLOR_AD_A : signColor;
  }
  // Dach płaski + attyka.
  if (gy >= 38 && gy <= 41) {
    return gx >= 0 && gx < SHOP_W && gz >= 2 && gz < SHOP_D - 1 ? 0x55504a : null;
  }
  if (gy > 41) {
    const perim = gx < 2 || gx >= SHOP_W - 2 || gz < 4 || gz >= SHOP_D - 2;
    return gy <= 45 && perim ? wallColor : null;
  }

  const isWall = gx < 3 || gx >= SHOP_W - 3 || gz < 3 || gz >= SHOP_D - 3;
  if (isWall && gy < 38) {
    // Witryna od frontu: wielkie tafle + szeroka brama (2.1 m).
    if (gz >= SHOP_D - 3) {
      if (gx >= 38 && gx <= 53 && gy < 26) return null; // wejście
      if (gx >= 6 && gx <= SHOP_W - 7 && gy >= 6 && gy <= 28) {
        return SHOP_D - 1 - gz === 1 ? (0x9fd4ef | GLASS_FLAG) : null;
      }
    }
    // Okno boczne na zapleczu.
    if (gz < 3 && gx >= 30 && gx <= 60 && gy >= 10 && gy <= 24) {
      return gz === 1 ? (0x9fd4ef | GLASS_FLAG) : null;
    }
    return wallColor;
  }

  // Lada + regały.
  if (gy >= 2 && gy <= 9 && gx >= 12 && gx <= 34 && gz >= 14 && gz <= 18) return COLOR_DESK;
  if (gy >= 2 && gy <= 16 && (gz === 30 || gz === 44)
    && ((gx >= 8 && gx <= 38) || (gx >= 52 && gx <= 84))
    && ((gy - 2) % 5 < 2 || gx % 12 < 2)) return 0x6e6258; // półki + słupki nośne
  return null;
}

export function generateShop(
  originX: number,
  originZ: number,
  wallColor: number,
  signColor: number,
): GeneratedBuilding {
  const config: BuildingConfig = {
    width: SHOP_W,
    depth: SHOP_D,
    height: SHOP_H,
    blockSize: FINE,
    originX,
    originZ,
    // Mur pawilonu: zmierzony szczyt nietknięty ~1480, margines 2×.
    crushLoad: 3000,
  };
  return {
    config,
    blocks: generate(config, (gx, gy, gz) => shopCell(gx, gy, gz, wallColor, signColor)),
  };
}

// ---------------------------------------------------------------------------
// RATUSZ — reprezentacyjny gmach: portyk na sześciu kolumnach, monumentalne
// wejście, trzy wysokie kondygnacje, centralna wieża zegarowa z piramidalnym
// hełmem. Front od południa (wysokie gz).
// ---------------------------------------------------------------------------

const TH_W = 240; // 31.5 m
const TH_D = 120; // 15.7 m
const TH_H = 350; // ~46 m — wyższy, dominująca wieża (landmark)
const TH_HELM_BASE = 308; // start hełmu wieży
const TH_FLOOR_H = 46;
const TH_SLAB = 4;
const TH_WALL = 4;
const TH_BODY_TOP = 3 * TH_FLOOR_H; // 138 — korona murów korpusu
const COLOR_TH_WALL = 0xcfc3a8;
const COLOR_TH_TRIM = 0xa89878;
const COLOR_TH_ROOF = 0x6e4a3a;
const COLOR_CLOCK = 0xf2efe6;

function townHallCell(gx: number, gy: number, gz: number): number | null {
  if (gy < TH_SLAB) return COLOR_TH_TRIM; // cokół/płyta

  const inTower = gx >= 96 && gx <= 143 && gz >= 36 && gz <= 83;

  // --- Wieża zegarowa nad korpusem ---
  if (gy >= TH_BODY_TOP + TH_SLAB) {
    if (!inTower) {
      // Dach korpusu: płaski + attyka.
      const rel = gy - (TH_BODY_TOP + TH_SLAB);
      const perim = gx < TH_WALL || gx >= TH_W - TH_WALL || gz < TH_WALL || gz >= TH_D - TH_WALL;
      return rel < 6 && perim ? COLOR_TH_ROOF : null;
    }
    const lx = gx - 96;
    const lz = gz - 36;
    const hx = Math.abs(lx - 23.5);
    const hz = Math.abs(lz - 23.5);
    const hmax = Math.max(hx, hz);
    if (gy < TH_HELM_BASE) {
      // Trzon wieży: mur 4, tarcze zegara na osiach ścian (gy 180..210).
      if (hmax < 20 || hmax > 23.5) return null;
      const cy = 196;
      const face = Math.min(hx, hz); // odległość od osi ściany
      const rr = (face * face) * 4 + (gy - cy) * (gy - cy);
      if (gy >= 178 && gy <= 214 && rr <= 13 * 13 * 0.8) {
        return rr <= 10 * 10 * 0.8 ? COLOR_CLOCK : COLOR_TH_TRIM;
      }
      return COLOR_TH_WALL;
    }
    // Piramidalny hełm na szczycie.
    const t = (gy - TH_HELM_BASE) / (TH_H - TH_HELM_BASE);
    const h = Math.max(1.5, 23.5 * (1 - t));
    if (hmax <= h && hmax >= h - 2.5) return COLOR_TH_ROOF;
    return null;
  }

  const floorIdx = Math.floor(gy / TH_FLOOR_H);
  const yin = gy - floorIdx * TH_FLOOR_H;
  if (yin < TH_SLAB) return COLOR_TH_TRIM; // stropy

  // Portyk: kolumny przed frontem + belkowanie (w obrysie footprintu).
  const inPortico = gz >= 104 && gz <= 119;
  if (inPortico) {
    if (gy >= 84 && gy <= 95 && gx >= 16 && gx <= 223) return COLOR_TH_TRIM; // belkowanie
    for (const cx of [24, 60, 96, 132, 168, 204]) {
      if (gx >= cx && gx < cx + 8 && gz >= 106 && gz <= 113 && gy < 84) return COLOR_TH_WALL;
    }
    return null;
  }

  const isWall = gx < TH_WALL || gx >= TH_W - TH_WALL || gz < TH_WALL || gz >= TH_D - TH_WALL - 16;
  if (!isWall) {
    // Wewnętrzne filary wielkiej sali.
    if ((gx - 40) % 56 < 6 && gx >= 40 && gx < 210 && gz >= 56 && gz <= 61) return COLOR_TH_TRIM;
    return null;
  }

  // Monumentalne wejście (4.2 m szerokie, przez całą grubość, z łukiem).
  const southWall = gz >= TH_D - TH_WALL - 16 && gz < TH_D;
  if (southWall && floorIdx === 0) {
    const pw = gy < 36 ? 16 : Math.max(0, 16 - (gy - 36) * 0.9);
    if (Math.abs(gx - 119.5) <= pw && gy < 52) return null;
  }
  // Wysokie okna z szybami w rytmie pilastrów.
  const u = (gz < TH_WALL || southWall) ? gx : gz;
  const bay = u % 28;
  if (bay >= 8 && bay <= 19 && u > 12 && u < (((gz < TH_WALL || southWall)) ? TH_W - 13 : TH_D - 13)
    && yin >= 10 && yin <= 36) {
    const depth = gz < TH_WALL ? gz
      : southWall ? TH_D - 1 - gz
        : gx < TH_WALL ? gx : TH_W - 1 - gx;
    return depth === 1 ? (0x9fd4ef | GLASS_FLAG) : null;
  }
  return COLOR_TH_WALL;
}

export function generateTownHall(originX: number, originZ: number): GeneratedBuilding {
  const config: BuildingConfig = {
    width: TH_W,
    depth: TH_D,
    height: TH_H,
    blockSize: FINE,
    originX,
    originZ,
    diagonalGrounding: true, // hełm wieży
    // Zmierzony szczyt nietknięty ~10900 (belkowanie portyku na kolumnach),
    // margines 2×.
    crushLoad: 22000,
  };
  return { config, blocks: generate(config, townHallCell) };
}

// ---------------------------------------------------------------------------
// BLIŹNIAK DWUPIĘTROWY — dwa lustrzane segmenty ze wspólną ścianą działową,
// dach płaski z attyką, okna i drzwi z przodu, OGRODZENIE z bramą wokół działki
// i PEŁNE WYPOSAŻENIE (łóżka, stoły, sofy na obu piętrach). ~2 rakiety.
// ---------------------------------------------------------------------------

const SD_W = 144; // 18.9 m działka z ogrodzeniem
const SD_D = 104; // 13.7 m
const SD_H = 64; // 8.4 m (2 piętra + attyka)
const SD_HX0 = 16; // dom wcięty od ogrodzenia (ogród)
const SD_HX1 = 128;
const SD_HZ0 = 16;
const SD_HZ1 = 88;
const SD_FH = 26; // wysokość piętra
const SD_WALL = 3;
const SD_SLAB = 3;
const SD_FLOORS = 2;
const SD_ROOFBASE = SD_FLOORS * SD_FH; // 52
const COLOR_SD_TRIM = 0xeae0d0;
const COLOR_SD_ROOF = 0x53433a;
const COLOR_SD_FENCE = 0x8a6a44;
const COLOR_SD_POST = 0x6e5236;
const COLOR_SD_FOUND = 0x8a8478;
const COLOR_SD_TABLE = 0x7a5a3c;
const COLOR_SD_SOFA = 0x436b8a;

/** Mebel w danej jednostce (lokalne hx∈[0,unit), hz, yin nad stropem). */
function sdFurniture(ux: number, hz: number, yin: number, bedColor: number): number | null {
  const HD = SD_HZ1 - SD_HZ0;
  // Łóżko w tylnym rogu (niskie).
  if (ux >= 6 && ux <= 24 && hz >= 6 && hz <= 22 && yin >= SD_SLAB && yin <= SD_SLAB + 4) {
    return bedColor;
  }
  // Stół na środku.
  if (ux >= 22 && ux <= 34 && hz >= 34 && hz <= 46 && yin >= SD_SLAB && yin <= SD_SLAB + 3) {
    return COLOR_SD_TABLE;
  }
  // Sofa przy froncie.
  if (ux >= 8 && ux <= 30 && hz >= HD - 16 && hz <= HD - 10 && yin >= SD_SLAB && yin <= SD_SLAB + 3) {
    return COLOR_SD_SOFA;
  }
  return null;
}

function semiDetachedCell(
  gx: number,
  gy: number,
  gz: number,
  wallColor: number,
  bedColor: number,
): number | null {
  // --- Ogrodzenie wokół działki (ażurowe sztachety + słupki + brama) ---
  const onFenceRing = gx < 2 || gx >= SD_W - 2 || gz < 2 || gz >= SD_D - 2;
  if (onFenceRing) {
    if (gy < 2) return COLOR_SD_FOUND; // cokolik ogrodzenia
    if (gy <= 13) {
      // Brama od frontu (wysokie gz), środek działki — przejście.
      if (gz >= SD_D - 2 && gx >= 60 && gx <= 84) return null;
      const post = gx % 20 < 2 || gz % 20 < 2; // słupki
      if (post) return COLOR_SD_POST;
      return gy % 3 === 0 ? COLOR_SD_FENCE : null; // poziome deski co 3
    }
    return null;
  }

  // Ogród między ogrodzeniem a domem — pusto.
  const inHouse = gx >= SD_HX0 && gx < SD_HX1 && gz >= SD_HZ0 && gz < SD_HZ1;
  if (!inHouse) return null;

  const hx = gx - SD_HX0;
  const hz = gz - SD_HZ0;
  const HW = SD_HX1 - SD_HX0; // 112
  const HD = SD_HZ1 - SD_HZ0; // 72
  const half = HW / 2;

  if (gy < 2) return COLOR_SD_FOUND; // fundament domu

  const floorIdx = Math.floor(gy / SD_FH);
  const yin = gy - floorIdx * SD_FH;

  // Dach płaski + attyka.
  if (gy >= SD_ROOFBASE) {
    if (gy < SD_ROOFBASE + SD_SLAB) return COLOR_SD_ROOF;
    const perim = hx < SD_WALL || hx >= HW - SD_WALL || hz < SD_WALL || hz >= HD - SD_WALL;
    return gy < SD_ROOFBASE + SD_SLAB + 4 && perim ? COLOR_SD_ROOF : null;
  }
  if (floorIdx >= SD_FLOORS) return gy < SD_ROOFBASE + SD_SLAB ? COLOR_SD_ROOF : null;
  if (yin < SD_SLAB) return COLOR_SD_TRIM; // strop

  const perimeter = hx < SD_WALL || hx >= HW - SD_WALL || hz < SD_WALL || hz >= HD - SD_WALL;
  const partyWall = hx >= half - 1 && hx <= half; // wspólna ściana bliźniaka

  if (!perimeter) {
    if (partyWall) return wallColor;
    // Wnętrze — meble (lustrzane w obu segmentach).
    const ux = hx < half ? hx : HW - 1 - hx; // lokalne w segmencie
    return sdFurniture(ux, hz, yin, bedColor);
  }

  // Drzwi frontowe — po jednych na segment (parter).
  const nearDoor = hz >= HD - SD_WALL && floorIdx === 0
    && (Math.abs(hx - HW * 0.28) < 10 || Math.abs(hx - HW * 0.72) < 10);
  if (nearDoor) {
    if ((Math.abs(hx - HW * 0.28) <= 5 || Math.abs(hx - HW * 0.72) <= 5)
      && yin < SD_SLAB + 13) {
      return null; // otwór drzwi (z litym nadprożem nad nim)
    }
    return wallColor; // lity mur wokół drzwi (boki + nadproże) — bez okna
  }
  // Okna w rytmie — szyba (depth 1) ZAMKNIĘTA w ramce TRIM dookoła (góra/dół/
  // boki), żeby tafla nie wisiała osierocona (była połączona ze ścianą).
  const onZFace = hz < SD_WALL || hz >= HD - SD_WALL;
  const u = onZFace ? hx : hz;
  const ub = u % 20;
  const span = onZFace ? HW : HD;
  const inBay = ub >= 6 && ub <= 13 && u > 8 && u < span - 9 && yin >= 7 && yin <= 18;
  if (inBay) {
    if (yin === 7 || yin === 18 || ub === 6 || ub === 13) return COLOR_SD_TRIM;
    const depth = onZFace ? (hz < SD_WALL ? hz : HD - 1 - hz) : (hx < SD_WALL ? hx : HW - 1 - hx);
    return depth === 1 ? COLOR_GLASS : null;
  }
  return wallColor;
}

export function generateSemiDetached(
  originX: number,
  originZ: number,
  wallColor: number,
  bedColor: number,
): GeneratedBuilding {
  const config: BuildingConfig = {
    width: SD_W,
    depth: SD_D,
    height: SD_H,
    blockSize: FINE,
    originX,
    originZ,
    // Szerszy i dwupiętrowy (więcej redundancji niż domek) — pada od ~2 rakiet.
    crushLoad: 650,
  };
  return {
    config,
    blocks: generate(config, (gx, gy, gz) => semiDetachedCell(gx, gy, gz, wallColor, bedColor)),
  };
}

// ===========================================================================
// DEMO METROPOLIS — dodatkowe budynki (galeria, służby, restauracja).
// Wszystkie używają wspólnego sterownika `generate` (bloki gy-rosnąco), mają
// ciągłe ściany/kolumny od gy=0 (ugruntowanie) i płaskie dachy z attyką.
// ===========================================================================

/** Wspólny generator „pudełkowego" budynku wielokondygnacyjnego: grube ściany
 *  obwodowe z oknami, płyty stropowe, rzadkie kolumny nośne, płaski dach z
 *  attyką, pasek szyldu w akcencie. `extra` (sprawdzane najpierw) dokłada
 *  cechy: bramy garażowe, krzyż szpitala, markizę itp. */
interface BoxSpec {
  W: number; D: number; H: number;
  floorH: number; slabT: number; wallT: number;
  wall: number; accent: number; roof: number; floor: number;
  glass: number;
  /** Pionowy zakres pasa szyldu na froncie (+z), w gy. */
  signBand?: [number, number];
  /** Funkcja cechy: kolor (wstawia) / 0 (pusto/otwór) / null (brak — leć dalej). */
  extra?: (gx: number, gy: number, gz: number) => number | 0 | null;
}

function boxCell(gx: number, gy: number, gz: number, s: BoxSpec): number | null {
  const { W, D, H, floorH, slabT, wallT } = s;
  if (gy < 2) return s.floor; // płyta fundamentowa

  if (s.extra) {
    const e = s.extra(gx, gy, gz);
    if (e !== null) return e === 0 ? null : e;
  }

  const roofBase = H - 10;
  const perim = gx < wallT || gx >= W - wallT || gz < wallT || gz >= D - wallT;
  const outerSkin = gx === 0 || gx === W - 1 || gz === 0 || gz === D - 1;

  // --- Dach + attyka ---
  if (gy >= roofBase) {
    const yr = gy - roofBase;
    if (yr < slabT) return s.roof;                 // płyta dachu (pełna)
    if (yr < 8 && perim) return s.wall;            // attyka
    return null;
  }

  // --- Korpus ---
  const yin = (gy - 2) % floorH;
  const floorBase = gy - 2 - yin;
  if (yin < slabT && floorBase > 0) {              // strop (parter bez stropu w środku)
    return s.floor;
  }
  if (perim) {
    // Pas szyldu na froncie.
    if (s.signBand && gz >= D - wallT && gy >= s.signBand[0] && gy <= s.signBand[1]) {
      if (gx < 3 || gx >= W - 3) return s.wall;
      return ((gx >> 2) % 3 === 0) ? COLOR_AD_A : s.accent;
    }
    // Okna w paśmie kondygnacji (na zewnętrznej warstwie), z mullionami.
    if (outerSkin && yin >= 5 && yin <= floorH - 4) {
      const along = (gx === 0 || gx === W - 1) ? gz : gx;
      if (along % 9 < 7 && along > 3 && along < (gx === 0 || gx === W - 1 ? D - 4 : W - 4)) return s.glass;
    }
    return s.wall;
  }
  // Kolumny nośne wewnątrz (siatka) — redundancja → lokalne zawalenia.
  const colStep = 26;
  if (gx % colStep < 3 && gz % colStep < 3) return s.accent;
  // Wnętrza: rzędy biurek/regałów na każdej kondygnacji + kolorowe „plakaty"
  // na ścianach wewnętrznych — żeby budynki nie były puste.
  if (yin >= slabT && yin <= slabT + 1) {
    if (gx % 12 >= 4 && gx % 12 <= 8 && gz % 9 >= 4 && gz % 9 <= 5) return 0x7a5a3c; // biurka/regały
  }
  // Plakaty: kolorowe panele tuż przy ścianie wewnętrznej (akcent), rytmicznie.
  if ((gx === wallT || gx === W - 1 - wallT || gz === wallT || gz === D - 1 - wallT)
    && yin >= slabT + 3 && yin <= slabT + 6 && ((gx + gz) % 7 < 2)) return s.accent;
  return null;
}

function genBox(originX: number, originZ: number, s: BoxSpec, crush: number): GeneratedBuilding {
  const config: BuildingConfig = {
    width: s.W, depth: s.D, height: s.H, blockSize: FINE, originX, originZ, crushLoad: crush,
  };
  return { config, blocks: generate(config, (gx, gy, gz) => boxCell(gx, gy, gz, s)) };
}

// --- RESTAURACJA — mały lokal: duże witryny, markiza i szyld na dachu. ------
export function generateRestaurant(originX: number, originZ: number, accent: number): GeneratedBuilding {
  const W = 96; const D = 72; const H = 64;
  return genBox(originX, originZ, {
    W, D, H, floorH: 28, slabT: 3, wallT: 3,
    wall: 0xe6ddcc, accent, roof: 0x55504a, floor: 0x8a8478, glass: COLOR_GLASS,
    signBand: [44, 56],
    extra: (gx, gy, gz) => {
      // Markiza w akcencie nad witryną od frontu (+z).
      if (gy >= 22 && gy <= 24 && gz >= D - 6 && gz < D + 0 && gx >= 6 && gx < W - 6) return accent;
      // Szerokie wejście (otwór) od frontu na parterze.
      if (gz >= D - 3 && gx >= W / 2 - 8 && gx <= W / 2 + 8 && gy >= 2 && gy < 20) return 0;
      return null;
    },
  }, 1500);
}

// --- REMIZA — niska, szerokie bramy garażowe (czerwone), wieżyczka. --------
export function generateFireStation(originX: number, originZ: number): GeneratedBuilding {
  const W = 150; const D = 96; const H = 72;
  const RED = 0xb12a22;
  return genBox(originX, originZ, {
    W, D, H, floorH: 30, slabT: 3, wallT: 4,
    wall: 0xc9433a, accent: RED, roof: 0x4a4640, floor: 0x8a8478, glass: COLOR_GLASS,
    signBand: [52, 62],
    extra: (gx, gy, gz) => {
      // Trzy bramy garażowe (otwory ~2.6m) od frontu na parterze.
      if (gz >= D - 4 && gy >= 2 && gy < 24) {
        for (const bx of [W * 0.22, W * 0.5, W * 0.78]) {
          if (Math.abs(gx - bx) <= 11) return 0;
        }
      }
      // Wieżyczka do suszenia węży (NW róg) — ponad dach.
      if (gx >= 6 && gx < 22 && gz >= 6 && gz < 22 && gy < 110) {
        const wallT = gx < 9 || gx >= 19 || gz < 9 || gz >= 19;
        if (gy >= H - 10) return wallT ? RED : (gy < H ? 0x8a8478 : null);
      }
      return null;
    },
  }, 2400);
}

// --- KOMISARIAT — granatowo-szary gmach, trzy kondygnacje, niebieski szyld. -
export function generatePolice(originX: number, originZ: number): GeneratedBuilding {
  const W = 138; const D = 104; const H = 112;
  return genBox(originX, originZ, {
    W, D, H, floorH: 30, slabT: 4, wallT: 4,
    wall: 0x9aa3ad, accent: 0x1f3a6e, roof: 0x444a52, floor: 0x8a8478, glass: COLOR_GLASS,
    signBand: [92, 102],
    extra: (gx, gy, gz) => {
      // Wejście z podjazdem od frontu.
      if (gz >= D - 3 && gx >= W / 2 - 10 && gx <= W / 2 + 10 && gy >= 2 && gy < 24) return 0;
      return null;
    },
  }, 4200);
}

// --- SZPITAL — wysoki, jasny blok, mnóstwo okien, zielony krzyż na froncie. -
export function generateHospital(originX: number, originZ: number): GeneratedBuilding {
  const W = 156; const D = 112; const H = 168;
  const GREEN = 0x2e8b57;
  return genBox(originX, originZ, {
    W, D, H, floorH: 30, slabT: 4, wallT: 4,
    wall: 0xeef0ee, accent: GREEN, roof: 0xcdd2cf, floor: 0x9aa0a0, glass: COLOR_GLASS,
    extra: (gx, gy, gz) => {
      // Zielony krzyż na froncie (+z), wysoko.
      if (gz >= D - 2 && gy >= 120 && gy <= 150) {
        const cx = W / 2; const cy = 135;
        const inV = Math.abs(gx - cx) <= 4 && Math.abs(gy - cy) <= 14;
        const inH = Math.abs(gx - cx) <= 14 && Math.abs(gy - cy) <= 4;
        if (inV || inH) return GREEN;
      }
      // Zadaszone wejście główne.
      if (gz >= D - 3 && gx >= W / 2 - 12 && gx <= W / 2 + 12 && gy >= 2 && gy < 26) return 0;
      return null;
    },
  }, 9000);
}

// ===========================================================================
// GALERIA HANDLOWA — OGROMNA, ale TANIA (COARSE) i odporna na progresywne
// zawalenie: wielki obrys, grube ściany obwodowe, gęsta siatka kolumn i bardzo
// wysoki crushLoad → trafienie wybija LOKALNĄ wyrwę / spadają sekcje, reszta
// stoi. Pusty środek = przeszklone atrium przez wszystkie kondygnacje, sklepy
// na piętrach po bokach, parking na dachu.
// ===========================================================================

const MALL_W = 240; // ~63 m
const MALL_D = 168; // ~44 m
const MALL_FLOOR_H = 24; // ~6.3 m — wysokie kondygnacje z atrium
const MALL_FLOORS = 3;
const MALL_ROOF_Y = MALL_FLOORS * MALL_FLOOR_H; // 72
const MALL_H = MALL_ROOF_Y + 30; // dach + parking + attyka
const MALL_SLAB = 3;
const MALL_WALL = 4; // ~1 m — pochłania lokalny wybuch
const MALL_GLASS = 0x9fd4ef | GLASS_FLAG;
const COLOR_MALL_WALL = 0xd2cabc;
const COLOR_MALL_SLAB = 0x9a948c;
const COLOR_MALL_COL = 0xb0a89a;
const COLOR_MALL_DECK = 0x6f7479; // beton parkingu
const COLOR_MALL_STRIPE = 0xe8e4d8; // linie miejsc
const MALL_CARS: readonly number[] = [0xb23b3b, 0x35506a, 0x3a6a44, 0xcab018, 0xdadada, 0x5a3a6a];
/** Żywe barwy witryn/regałów sklepów w galeriach. */
const MALL_SHOP_HUES: readonly number[] = [0xd83b3b, 0x2e8b57, 0xe0b020, 0x3a7bd5, 0xc84bb0, 0xe07b20, 0x20b0b0];

/** Atrium: centralny prostokątny szyb (pusty środek). */
function mallAtrium(gx: number, gz: number): boolean {
  return gx >= 76 && gx < MALL_W - 76 && gz >= 48 && gz < MALL_D - 48;
}

function mallCell(gx: number, gy: number, gz: number): number | null {
  if (gy < MALL_SLAB) return COLOR_MALL_SLAB; // wielka płyta parteru

  const perim = gx < MALL_WALL || gx >= MALL_W - MALL_WALL || gz < MALL_WALL || gz >= MALL_D - MALL_WALL;
  const outerSkin = gx === 0 || gx === MALL_W - 1 || gz === 0 || gz === MALL_D - 1;
  const atrium = mallAtrium(gx, gz);

  // --- Dach + parking na dachu ---
  if (gy >= MALL_ROOF_Y) {
    const yr = gy - MALL_ROOF_Y;
    if (yr < MALL_SLAB) return atrium ? null : COLOR_MALL_DECK; // płyta dachu (świetlik nad atrium)
    if (yr < 9 && perim) return COLOR_MALL_WALL;                // attyka parkingu
    // Pasy miejsc parkingowych (cienka warstwa) + kilka zaparkowanych aut.
    if (yr === MALL_SLAB && !atrium && !perim) {
      if (gx % 22 < 1) return COLOR_MALL_STRIPE;                // linie miejsc
      if ((gx % 22) >= 6 && (gx % 22) <= 16 && (gz % 30) >= 6 && (gz % 30) <= 22 && ((gx / 22 | 0) + (gz / 30 | 0)) % 3 === 0) {
        // bryła zaparkowanego auta na dachu
        if (yr <= MALL_SLAB + 3) return MALL_CARS[((gx / 22 | 0) * 3 + (gz / 30 | 0)) % MALL_CARS.length]!;
      }
    }
    return null;
  }

  // --- Korpus (kondygnacje handlowe) ---
  const yin = gy % MALL_FLOOR_H;
  const isSlab = yin < MALL_SLAB;
  if (isSlab && gy >= MALL_FLOOR_H) {        // stropy pięter (parter ma już płytę)
    return atrium ? null : COLOR_MALL_SLAB;  // atrium otwarte przez stropy
  }
  if (perim) {
    // Wielkie witryny (szklana fasada) na zewnętrznej warstwie.
    if (outerSkin && yin >= 4 && yin <= MALL_FLOOR_H - 3) {
      const along = (gx === 0 || gx === MALL_W - 1) ? gz : gx;
      const lim = (gx === 0 || gx === MALL_W - 1) ? MALL_D : MALL_W;
      if (along % 12 < 9 && along > 5 && along < lim - 5) return MALL_GLASS;
    }
    // Wejścia: szerokie otwory na parterze (po jednym na każdej elewacji).
    if (gy < 20) {
      if ((gz >= MALL_D - MALL_WALL && Math.abs(gx - MALL_W / 2) <= 16)
        || (gz < MALL_WALL && Math.abs(gx - MALL_W / 2) <= 16)
        || (gx >= MALL_W - MALL_WALL && Math.abs(gz - MALL_D / 2) <= 14)
        || (gx < MALL_WALL && Math.abs(gz - MALL_D / 2) <= 14)) return null;
    }
    return COLOR_MALL_WALL;
  }
  // Kolumny nośne — gęsta siatka (rozpiętość < maxSpan → strop trzyma się
  // lokalnie); galeryjki sklepowe między atrium a ścianą zostają otwarte.
  const COL = 24;
  if (gx % COL < 3 && gz % COL < 3 && !atrium) return COLOR_MALL_COL;
  const ax0 = 76; const ax1 = MALL_W - 76; const az0 = 48; const az1 = MALL_D - 48;
  // Balustrady wokół atrium (na każdym piętrze) — lekka cecha sklepowa.
  if (!atrium && yin >= MALL_SLAB && yin <= MALL_SLAB + 2) {
    const ring = (gx >= ax0 - 2 && gx < ax1 + 2 && gz >= az0 - 2 && gz < az1 + 2)
      && (gx < ax0 || gx >= ax1 || gz < az0 || gz >= az1);
    if (ring) return COLOR_MALL_COL;
  }
  // WNĘTRZE galeryjek (pierścień między atrium a ścianą): kolorowe witryny
  // sklepów (panele w żywych barwach) + niskie regały/wyspy handlowe — żeby
  // środek nie był pusty.
  if (!atrium) {
    // Kolorowe szyldy/witryny sklepów wzdłuż wewnętrznej strony ściany.
    if (yin >= 4 && yin <= MALL_FLOOR_H - 5) {
      const nearWall = gx === MALL_WALL || gx === MALL_W - 1 - MALL_WALL
        || gz === MALL_WALL || gz === MALL_D - 1 - MALL_WALL;
      if (nearWall && ((gx + gz) >> 2) % 2 === 0) return MALL_SHOP_HUES[((gx + gz) >> 2) % MALL_SHOP_HUES.length]!;
    }
    // Niskie regały/wyspy handlowe na posadzce galerii.
    if (yin >= MALL_SLAB && yin <= MALL_SLAB + 1) {
      const inGallery = (gx < ax0 - 4 || gx >= ax1 + 4 || gz < az0 - 4 || gz >= az1 + 4);
      if (inGallery && gx % 10 >= 3 && gx % 10 <= 7 && gz % 12 >= 4 && gz % 12 <= 6) {
        return MALL_SHOP_HUES[(gx + gz) % MALL_SHOP_HUES.length]!;
      }
    }
  }
  return null;
}

export function generateMall(originX: number, originZ: number): GeneratedBuilding {
  const config: BuildingConfig = {
    width: MALL_W, depth: MALL_D, height: MALL_H, blockSize: COARSE, originX, originZ,
    // Skalibrowane pomiarem (src/bench/mallCollapse.test.ts): nietknięta
    // galeria szczytowo ~3978/komórkę (zapas 2×), po wydrążeniu parteru do
    // 1/3 kolumn ~8935 → przeciążone słupy pękają i stropy PANCZERUJĄ
    // zamiast wisieć na kilku podporach. 60000 dawało ~26× zapasu — galeria
    // wisiała na czymkolwiek. maxSpan 34 (~9 m) dodatkowo ścina długie
    // nawisy płyt, które przy domyślnych 56 (~15 m) "pływały" w powietrzu.
    crushLoad: 8000,
    maxSpan: 34,
  };
  return { config, blocks: generate(config, mallCell) };
}

// ===========================================================================
// DZIELNICE SPECJALNE — most, baza wojskowa (wieże, hangary, pojazdy),
// elektrownia (chłodnie, słupy WN). Wszystko LEKKIE (mało bloków) i niszczalne;
// fresh budynek nie jest zamiatany aż do trafienia, więc cienkie elementy
// stoją do pierwszego strzału, a potem rozpadają się efektownie.
// ===========================================================================

// --- MOST WISZĄCY (wzdłuż osi Z) — POMOST PRZY GRUNCIE (łączy się z jezdnią),
// pylony i cięgna NAD nim. -------------------------------------------------
const BR_W = 24;          // ~6.3 m jezdnia
const BR_DECK_T = 3;      // płyta jezdni tuż nad gruntem
const BR_TOWER_H = 50;    // pylony nad pomostem
function bridgeCell(gx: number, gy: number, gz: number, L: number): number | null {
  const W = BR_W;
  const railX = gx < 2 || gx >= W - 2;
  if (gy < BR_DECK_T) return 0x55585e;                              // płyta jezdni (przy gruncie)
  if (gy < BR_DECK_T + 3 && railX) return 0x9a9da2;                 // barierki
  const t0 = Math.round(L * 0.28); const t1 = Math.round(L * 0.72);
  const towerZ = Math.abs(gz - t0) <= 2 || Math.abs(gz - t1) <= 2;
  const topY = BR_TOWER_H;
  if (towerZ && railX && gy < topY) return 0x9c3a32;                // pylony, z pomostu w górę
  if (gy >= topY - 2 && gy <= topY - 1 && railX && gz >= t0 && gz <= t1) return 0x9c3a32; // cięgno górne
  if (railX && gz >= t0 && gz <= t1 && gz % 12 < 1 && gy >= BR_DECK_T && gy < topY - 1) return 0x3a3a3e; // wieszaki
  return null;
}
export function generateBridge(originX: number, originZ: number, spanZ: number): GeneratedBuilding {
  const config: BuildingConfig = {
    width: BR_W, depth: spanZ, height: BR_TOWER_H, blockSize: COARSE,
    originX, originZ, crushLoad: 40000, // sztywny: lokalne wyrwy, nie pełny upadek
  };
  return { config, blocks: generate(config, (x, y, z) => bridgeCell(x, y, z, spanZ)) };
}

// --- MUR OBRONNY (ogrodzenie bazy) — GRUBY i WYSOKI, z blankami -----------
export function generateWall(originX: number, originZ: number, len: number, alongX: boolean): GeneratedBuilding {
  const T = 9; const H = 54; // ~2.4 m grubości, ~14 m wysokości (3× grubszy/wyższy)
  const W = alongX ? len : T;
  const D = alongX ? T : len;
  const config: BuildingConfig = { width: W, depth: D, height: H, blockSize: COARSE, originX, originZ, crushLoad: 5000 };
  return {
    config,
    blocks: generate(config, (gx, gy, gz) => {
      const along = alongX ? gx : gz;
      if (gy >= H - 8) return (along % 10 < 6) ? 0x8f8a7e : null; // blanki
      return 0x8f8a7e;
    }),
  };
}

// --- WIEŻA STRAŻNICZA (gruba, postawna: 4 grube nogi + duża kabina) -------
const WT_W = 28; const WT_H = 80;
function watchtowerCell(gx: number, gy: number, gz: number): number | null {
  const W = WT_W;
  const cabin0 = WT_H - 30;
  const leg = (gx <= 4 || gx >= W - 5) && (gz <= 4 || gz >= W - 5); // grube nogi (4 komórki)
  if (gy < cabin0) {
    if (leg) return 0x5a5346;
    if (gy % 14 < 3 && (gx <= 4 || gx >= W - 5 || gz <= 4 || gz >= W - 5)) return 0x5a5346; // grube stężenia
    return null;
  }
  if (gy < WT_H - 4) {
    const wall = gx <= 1 || gx >= W - 2 || gz <= 1 || gz >= W - 2;
    if (gy <= cabin0 + 1) return 0x4a4438;                          // gruba podłoga kabiny
    if (wall) return (gy >= cabin0 + 6 && gy <= WT_H - 9 && (gx + gz) % 6 < 4) ? COLOR_GLASS : 0x6e5f44;
    return null;
  }
  return 0x40362c;                                                  // daszek
}
export function generateWatchtower(originX: number, originZ: number): GeneratedBuilding {
  const config: BuildingConfig = {
    width: WT_W, depth: WT_W, height: WT_H, blockSize: COARSE, originX, originZ, crushLoad: 700,
  };
  return { config, blocks: generate(config, watchtowerCell) };
}

// --- HANGAR (OGROMNY, łukowy „Quonset") — GRUBA, NIEPRZEZROCZYSTA powłoka
// (bez szkła, nie widać środka); wejście tylko przez wielką bramę od frontu,
// w środku pusto (można wejść). Gruba powłoka = porządne, „masywne" zawalenie.
const HG_W = 160; // ~42 m rozpiętości
const HG_D = 138; // ~36 m głębokości
const HG_SHELL = 3; // grubość powłoki (2× grubsza, więcej masy)
function hangarArchCell(gx: number, gy: number, gz: number): number | null {
  const W = HG_W; const D = HG_D;
  if (gy < 2) return 0x6a6256;                                  // płyta posadzki
  const c = (W - 1) / 2; const rad = c - 0.5;
  const rc = Math.hypot(gx - c, gy);                            // odległość od środka łuku (ziemia)
  const onShell = rc >= rad - HG_SHELL && rc <= rad;            // GRUBA, lita powłoka
  const inside = rc < rad - HG_SHELL;                           // wnętrze (puste)
  const backWall = gz < HG_SHELL;                               // tył: pełna ściana
  const frontWall = gz >= D - HG_SHELL;                         // przód: brama
  if (backWall) return rc <= rad ? 0x6f7355 : null;             // lita tylna ściana (bez okien)
  if (frontWall) {
    const doorHalf = Math.min(rad - 5, 30);
    if (Math.abs(gx - c) <= doorHalf && gy < rad - 5) return null; // otwór bramy
    return rc <= rad ? 0x57603f : null;                         // czoło wokół bramy
  }
  return onShell ? 0x8a8d84 : (inside ? null : null);           // tylko gruba powłoka, środek pusty
}
export function generateHangar(originX: number, originZ: number): GeneratedBuilding {
  const config: BuildingConfig = {
    width: HG_W, depth: HG_D, height: Math.ceil(HG_W / 2) + 4, blockSize: COARSE,
    originX, originZ, crushLoad: 3200,
  };
  return { config, blocks: generate(config, hangarArchCell) };
}

// --- KOSZARY (duży, „ratuszowy" gmach wielokondygnacyjny, można wejść) -----
export function generateBarracks(originX: number, originZ: number): GeneratedBuilding {
  const W = 230; const D = 116; const H = 150; // ~30 × 15 × 20 m (FINE) — skala ratusza
  return genBox(originX, originZ, {
    W, D, H, floorH: 30, slabT: 4, wallT: 4,
    wall: 0xbcab86, accent: 0x6a6e44, roof: 0x6a6052, floor: 0x8a8478, glass: COLOR_GLASS,
    signBand: [H - 16, H - 6],
    extra: (gx, gy, gz) => {
      if (gz >= D - 3 && gy >= 2 && gy < 26 && Math.abs(gx - W / 2) <= 14) return 0; // wejście główne
      return null;
    },
  }, 9000);
}

// --- STACJA / WIEŻA RADIOWA — okrągły maszt w barwach wojskowych z WIELKĄ
// KULĄ (radom) na szczycie. Rozmiar parametryczny (jedna wielkości wieżowca).
const COLOR_MIL = 0x55603f; const COLOR_MIL_DK = 0x3f4a30; const COLOR_RADOME = 0xc6ccc0;
function radioTowerCell(gx: number, gy: number, gz: number, W: number, H: number, ballR: number): number | null {
  const c = (W - 1) / 2;
  const ballCy = H - ballR - 1;
  const d3 = Math.hypot(gx - c, gy - ballCy, gz - c);
  if (d3 <= ballR) return COLOR_RADOME;                         // wielka kula (radom)
  const dr = Math.hypot(gx - c, gz - c);
  const shaftR = Math.max(2.2, ballR * 0.34);
  if (gy < ballCy && dr <= shaftR) {                            // okrągły trzon, pasy wojskowe
    return (Math.floor(gy / 10) % 2 === 0) ? COLOR_MIL : COLOR_MIL_DK;
  }
  if (gy >= ballCy - 3 && gy < ballCy && dr <= ballR * 0.6) return COLOR_MIL_DK; // platforma pod kulą
  if (gy % 13 < 1 && gy < ballCy && dr <= shaftR + 1.5) return 0x9a9da2;         // wsporniki
  return null;
}
export function generateRadioTower(originX: number, originZ: number, height: number, ballR: number): GeneratedBuilding {
  const W = ballR * 2 + 4;
  const config: BuildingConfig = {
    width: W, depth: W, height, blockSize: COARSE, originX, originZ, crushLoad: 1200,
  };
  return { config, blocks: generate(config, (gx, gy, gz) => radioTowerCell(gx, gy, gz, W, height, ballR)) };
}

// --- POJAZDY (małe modele voxelowe, jakość ~aut) --------------------------
const MIL = 0x5b6440; const MIL_DK = 0x44492f; const TIRE = 0x1a1a1a; const GLASSV = COLOR_GLASS;

function planeCell(gx: number, gy: number, gz: number, W: number, L: number): number | null {
  const cx = (W - 1) / 2; const fr = Math.abs(gx - cx);
  // Skrzydła nisko przy ziemi (ugruntowane), skos do tyłu.
  if (gy <= 3) {
    const sweep = Math.round((gz - L * 0.4) * 0.0); // proste skrzydło
    void sweep;
    if (gz >= L * 0.42 && gz <= L * 0.6) return 0x9aa0a6;
  }
  // Kadłub.
  if (fr <= 3 && gz >= 3 && gz < L - 2 && gy >= 2 && gy <= 9) return 0xb7bcc2;
  if (fr <= 1 && gz >= 4 && gz <= 7 && gy >= 7 && gy <= 9) return GLASSV; // kokpit
  // Statecznik pionowy + poziomy z tyłu.
  if (fr <= 1 && gz >= L - 9 && gz < L - 2 && gy >= 8 && gy <= 18) return 0x9aa0a6;
  if (gy >= 8 && gy <= 9 && gz >= L - 9 && gz <= L - 4 && fr <= 9) return 0x9aa0a6;
  // Podwozie do ziemi.
  if (fr <= 1 && gy < 2 && (gz < 7 || (gz > L * 0.5 && gz < L * 0.5 + 3))) return MIL_DK;
  return null;
}
export function generatePlane(originX: number, originZ: number): GeneratedBuilding {
  const W = 72; const L = 70; const H = 20;
  const config: BuildingConfig = { width: W, depth: L, height: H, blockSize: FINE, originX, originZ, crushLoad: 500 };
  return { config, blocks: generate(config, (x, y, z) => planeCell(x, y, z, W, L)) };
}

function tankCell(gx: number, gy: number, gz: number, W: number, L: number): number | null {
  // Gąsienice.
  if (gy < 4 && (gx < 5 || gx >= W - 5) && gz >= 2 && gz < L - 2) return TIRE;
  // Kadłub.
  if (gy >= 3 && gy <= 9 && gx >= 3 && gx < W - 3 && gz >= 2 && gz < L - 2) return MIL;
  // Wieża.
  const cx = (W - 1) / 2; const cz = (L - 1) / 2;
  if (gy >= 10 && gy <= 15 && Math.abs(gx - cx) <= 7 && Math.abs(gz - cz) <= 8) return MIL_DK;
  // Lufa do przodu.
  if (gy >= 12 && gy <= 13 && Math.abs(gx - cx) <= 1 && gz >= cz + 8 && gz < L) return 0x33352c;
  return null;
}
export function generateTank(originX: number, originZ: number): GeneratedBuilding {
  const W = 26; const L = 44; const H = 18;
  const config: BuildingConfig = { width: W, depth: L, height: H, blockSize: FINE, originX, originZ, crushLoad: 1600 };
  return { config, blocks: generate(config, (x, y, z) => tankCell(x, y, z, W, L)) };
}

function jeepCell(gx: number, gy: number, gz: number, W: number, L: number): number | null {
  if (gy < 3 && (gx < 4 || gx >= W - 4) && (gz < 6 || gz >= L - 6)) return TIRE; // koła
  if (gy >= 2 && gy <= 6 && gx >= 2 && gx < W - 2 && gz >= 2 && gz < L - 2) return MIL; // nadwozie
  if (gy >= 7 && gy <= 9 && gx >= 3 && gx < W - 3 && gz >= 3 && gz <= L * 0.5) return MIL_DK; // kabina
  return null;
}
export function generateJeep(originX: number, originZ: number): GeneratedBuilding {
  const W = 16; const L = 28; const H = 12;
  const config: BuildingConfig = { width: W, depth: L, height: H, blockSize: FINE, originX, originZ, crushLoad: 250 };
  return { config, blocks: generate(config, (x, y, z) => jeepCell(x, y, z, W, L)) };
}

// --- SŁUP WYSOKIEGO NAPIĘCIA (krata) --------------------------------------
const PY_W = 22; const PY_H = 116;
function pylonCell(gx: number, gy: number, gz: number): number | null {
  const W = PY_W; const c = (W - 1) / 2;
  // Cztery nogi zbiegające się ku górze.
  const taper = Math.round((gy / PY_H) * (c - 2));
  const legX = Math.abs(gx - c) >= (c - 2 - taper) && Math.abs(gx - c) <= (c - taper);
  const legZ = Math.abs(gz - c) >= (c - 2 - taper) && Math.abs(gz - c) <= (c - taper);
  if (gy < PY_H - 30) {
    if (legX && legZ) return 0x6e7174;                       // nogi
    if (gy % 14 < 1 && (legX || legZ)) return 0x6e7174;      // poprzeczki
    return null;
  }
  // Trzon górny + ramiona (crossarms).
  if (Math.abs(gx - c) <= 2 && Math.abs(gz - c) <= 2) return 0x6e7174;
  for (const ay of [PY_H - 26, PY_H - 14, PY_H - 4]) {
    if (gy >= ay && gy <= ay + 1 && Math.abs(gz - c) <= 1 && Math.abs(gx - c) <= c) return 0x6e7174;
    // izolatory na końcach ramion
    if (gy >= ay - 2 && gy < ay && (Math.abs(gx - c) === c - 1) && Math.abs(gz - c) <= 1) return 0x9a9da2;
  }
  return null;
}
export function generatePylon(originX: number, originZ: number): GeneratedBuilding {
  const config: BuildingConfig = { width: PY_W, depth: PY_W, height: PY_H, blockSize: COARSE, originX, originZ, crushLoad: 600 };
  return { config, blocks: generate(config, pylonCell) };
}

// --- ELEKTROWNIA (hala + chłodnie kominowe) -------------------------------
const CT_W = 80; const CT_H = 96; // chłodnia: hiperboloida (zwężenie w środku)
function coolingTowerCell(gx: number, gy: number, gz: number): number | null {
  const c = (CT_W - 1) / 2;
  const baseR = c - 1; const waistR = c * 0.62; const topR = c * 0.78;
  const t = gy / CT_H;
  // hiperboloida: promień min w ~0.55 wysokości
  const k = (t - 0.55);
  const r = waistR + (k < 0 ? (-k / 0.55) * (baseR - waistR) : (k / 0.45) * (topR - waistR));
  const d = Math.hypot(gx - c, gz - c);
  if (Math.abs(d - r) <= 1.0) return 0xb6b2a8;               // cienka powłoka
  if (gy < 4 && d <= baseR) return 0x8a8478;                 // podstawa
  return null;
}
export function generateCoolingTower(originX: number, originZ: number): GeneratedBuilding {
  const config: BuildingConfig = { width: CT_W, depth: CT_W, height: CT_H, blockSize: COARSE, originX, originZ, crushLoad: 8000 };
  return { config, blocks: generate(config, coolingTowerCell) };
}
export function generatePowerHall(originX: number, originZ: number): GeneratedBuilding {
  const W = 150; const D = 96; const H = 66;
  return genBox(originX, originZ, {
    W, D, H, floorH: 60, slabT: 3, wallT: 4,
    wall: 0x9a8e6e, accent: 0xb8742a, roof: 0x5a5446, floor: 0x6a6256, glass: COLOR_GLASS,
    extra: (gx, gy, gz) => {
      // dwa kominy na dachu
      for (const sx of [W * 0.32, W * 0.68]) {
        if (Math.hypot(gx - sx, gz - D * 0.5) <= 5 && gy >= H - 6 && gy < H + 28) return 0xb8742a;
      }
      return null;
    },
  }, 5000);
}

// --- WIELKI KOMPLEKS DOWODZENIA (wielkości galerii, 4 wieże w narożach) ----
// COARSE, wnętrze chodne (wejście od frontu), 4 narożne wieże ponad korpusem.
const BC_W = 220; const BC_D = 150; const BC_BODY = 64; const BC_TOWER = 132;
const BC_FLOOR = 22; const BC_SLAB = 3; const BC_WALL = 4; const BC_TW = 36;
function baseComplexCell(gx: number, gy: number, gz: number): number | null {
  const W = BC_W; const D = BC_D;
  if (gy < 2) return COLOR_MIL_DK;                               // fundament
  const cornerX = gx < BC_TW || gx >= W - BC_TW;
  const cornerZ = gz < BC_TW || gz >= D - BC_TW;
  const corner = cornerX && cornerZ;
  const h = corner ? BC_TOWER : BC_BODY;
  if (gy >= h + BC_SLAB) return null;
  if (gy >= h) return 0x6a6052;                                  // płyta dachu / parapet
  const yin = (gy - 2) % BC_FLOOR;
  if (yin < BC_SLAB && gy > 2) return 0x8a8478;                  // stropy
  let perim: boolean;
  if (gy >= BC_BODY) {
    const lx = gx < BC_TW ? gx : W - 1 - gx;
    const lz = gz < BC_TW ? gz : D - 1 - gz;
    perim = lx < BC_WALL || lz < BC_WALL || lx >= BC_TW - BC_WALL || lz >= BC_TW - BC_WALL;
  } else {
    perim = gx < BC_WALL || gx >= W - BC_WALL || gz < BC_WALL || gz >= D - BC_WALL;
  }
  if (perim) {
    // wejście główne od frontu (parter)
    if (gy < 20 && gz >= D - BC_WALL && Math.abs(gx - W / 2) <= 14) return null;
    // okna w paśmie kondygnacji (zewnętrzna warstwa)
    const outer = gx === 0 || gx === W - 1 || gz === 0 || gz === D - 1;
    if (outer && yin >= 4 && yin <= BC_FLOOR - 3) {
      const along = (gx === 0 || gx === W - 1) ? gz : gx;
      if (along % 8 < 6) return COLOR_GLASS;
    }
    return COLOR_MIL;
  }
  // kolumny nośne wewnątrz (chodne piętra)
  if (gx % 28 < 3 && gz % 28 < 3) return COLOR_MIL_DK;
  return null;
}
export function generateBaseComplex(originX: number, originZ: number): GeneratedBuilding {
  const config: BuildingConfig = {
    width: BC_W, depth: BC_D, height: BC_TOWER + BC_SLAB, blockSize: COARSE,
    originX, originZ, crushLoad: 40000, // wielki → częściowe, lokalne zawały
  };
  return { config, blocks: generate(config, baseComplexCell) };
}

// --- WIEŻA KONTROLI LOTÓW (pochylona, przeszklona kabina na szczycie + niski
// terminal u podstawy) — jak na zdjęciu lotniska. COARSE, chodna, niszczalna. -
const CTL_W = 152; const CTL_D = 92;
const CTL_TERM_H = 30;   // niski terminal/hala u podstawy
const CTL_TOWER_H = 132; // trzon wieży
const CTL_CAB_H = 20;    // przeszklona kabina kontrolera
const CTL_GLASS = 0x9fd4ef | GLASS_FLAG;
const CTL_STEEL = 0x8a8d92; const CTL_FRAME = 0x55585e; const CTL_ROOF = 0x4a4e52;
function ctLean(gy: number): number { return (gy / CTL_TOWER_H) * 16; } // pochylenie trzonu w +x
function controlTowerCell(gx: number, gy: number, gz: number): number | null {
  const txc = CTL_W * 0.7; const tzc = CTL_D * 0.5;
  if (gy < 3) return 0x8a8478; // płyta
  // --- Terminal / hala u podstawy ---
  if (gy < CTL_TERM_H) {
    const perim = gx < 3 || gx >= CTL_W - 3 || gz < 3 || gz >= CTL_D - 3;
    if (gy >= CTL_TERM_H - 3) return 0x6a6e72; // płyta dachu terminalu
    if (perim) {
      if (gz >= CTL_D - 3 && Math.abs(gx - CTL_W * 0.28) <= 10 && gy < 22) return null; // wejście
      const outer = gx === 0 || gx === CTL_W - 1 || gz === 0 || gz === CTL_D - 1;
      if (outer && gy >= 6 && gy <= CTL_TERM_H - 5 && (gx + gz) % 6 < 4) return CTL_GLASS;
      return CTL_STEEL;
    }
    if (gx % 26 < 3 && gz % 26 < 3) return CTL_FRAME; // kolumny (chodne wnętrze)
    return null;
  }
  // --- Trzon wieży (pochylony, lekko zwężany) ---
  const cxs = txc + ctLean(gy);
  if (gy < CTL_TOWER_H) {
    const half = 13 - (gy / CTL_TOWER_H) * 5; // 13 → 8
    const dx = Math.abs(gx - cxs); const dz = Math.abs(gz - tzc);
    if (dx <= half && dz <= half) {
      const onWall = dx >= half - 2 || dz >= half - 2;
      if (!onWall) return null; // pusty środek (szyb)
      // przeszklony pas wzdłuż frontu (+z)
      if (gz > tzc && dz >= half - 2 && gy % 6 < 4) return CTL_GLASS;
      return CTL_STEEL;
    }
    return null;
  }
  // --- Przeszklona kabina kontrolera (wystaje poza trzon) ---
  const cxc = txc + ctLean(CTL_TOWER_H);
  const ch = gy - CTL_TOWER_H;
  const cabHalf = 17;
  const dx = Math.abs(gx - cxc); const dz = Math.abs(gz - tzc);
  if (ch < CTL_CAB_H) {
    if (dx <= cabHalf && dz <= cabHalf) {
      if (ch < 2) return CTL_FRAME; // wystający strop kabiny
      const onWall = dx >= cabHalf - 1 || dz >= cabHalf - 1;
      if (onWall) return (ch >= 3 && ch <= CTL_CAB_H - 3) ? CTL_GLASS : CTL_FRAME; // obserwacyjne szyby
      return null;
    }
    return null;
  }
  if (ch < CTL_CAB_H + 3 && dx <= cabHalf && dz <= cabHalf) return CTL_ROOF; // dach kabiny
  if (dx <= 1 && dz <= 1 && ch < CTL_CAB_H + 12) return 0x9a9da2;            // antena
  return null;
}
export function generateControlTower(originX: number, originZ: number): GeneratedBuilding {
  const config: BuildingConfig = {
    width: CTL_W, depth: CTL_D, height: CTL_TOWER_H + CTL_CAB_H + 14, blockSize: COARSE,
    originX, originZ, crushLoad: 4500,
  };
  return { config, blocks: generate(config, controlTowerCell) };
}

/**
 * Tiny two-language (PL/EN) content layer. No framework: every translatable
 * node carries `data-i18n="key"` and its text is swapped from the dictionary
 * below. `data-i18n-html` keys may contain inline markup (set via innerHTML);
 * plain keys go through textContent. `data-i18n-aria` swaps the aria-label.
 *
 * The choice persists in localStorage and drives <html lang>. Default follows
 * the browser, falling back to Polish (the studio's home language).
 */

export type Lang = 'pl' | 'en';

type Entry = Record<Lang, string>;

const DICT: Record<string, Entry> = {
  // ── nav ──────────────────────────────────────────────────────────────────
  'nav.game': { pl: 'Gra', en: 'Game' },
  'nav.arsenal': { pl: 'Arsenał', en: 'Arsenal' },
  'nav.full': { pl: 'Pełna gra', en: 'Full game' },
  'nav.studio': { pl: 'Studio', en: 'Studio' },
  'nav.contact': { pl: 'Kontakt', en: 'Contact' },

  // ── hero ─────────────────────────────────────────────────────────────────
  'hero.eyebrow': { pl: 'Voxpolia · Voxel Destruction', en: 'Voxpolia · Voxel Destruction' },
  'hero.title': {
    pl: 'Zrównaj miasto<br /><span class="accent">z ziemią.</span>',
    en: 'Bring the city<br /><span class="accent">down.</span>',
  },
  'hero.sub': {
    pl: 'To nie animacja — to prawdziwa fizyka zawaleń. <strong>Wyceluj myszką i kliknij — poleci rakieta.</strong>',
    en: "It isn't scripted — it's real collapse physics. <strong>Aim with the mouse and click — a rocket flies.</strong>",
  },
  'hero.cta1': { pl: 'Zagraj w demo', en: 'Play the demo' },
  'hero.cta2': { pl: 'Zobacz arsenał', en: 'See the arsenal' },
  'hero.reset': { pl: '⟳ Reset budynku', en: '⟳ Reset building' },
  'hero.rotate': { pl: 'obróć', en: 'rotate' },
  'hero.scroll': { pl: 'przewiń ↓', en: 'scroll ↓' },

  // ── game / features ──────────────────────────────────────────────────────
  'game.kicker': { pl: 'O grze', en: 'The game' },
  'game.h2': { pl: 'Każdy budynek naprawdę się wali', en: 'Every building truly falls' },
  'game.lead': {
    pl: 'Voxpolia to wokselowa strzelanka o burzeniu miasta. Wybij ścianę nośną, a wszystko nad nią runie kaskadą — sekcja po sekcji, aż na ziemię. Żadnych skryptowanych animacji: liczy się to, gdzie strzelisz.',
    en: 'Voxpolia is a voxel demolition shooter. Knock out a load-bearing wall and everything above cascades down — section by section, all the way to the ground. No scripted animations: where you shoot is what matters.',
  },
  'game.f1': { pl: 'Zawalenia oparte na realnym modelu konstrukcji', en: 'Collapses driven by a real structural model' },
  'game.f2': { pl: 'Całe miasto do zrównania z ziemią', en: 'A whole city to level' },
  'game.f3': { pl: 'Arsenał, który zmienia sposób burzenia', en: 'An arsenal that changes how you demolish' },
  'game.f4': { pl: 'Graj w przeglądarce — bez instalacji', en: 'Play in the browser — no install' },

  // ── arsenal ──────────────────────────────────────────────────────────────
  'arsenal.kicker': { pl: 'Arsenał', en: 'Arsenal' },
  'arsenal.h2': { pl: 'Czym burzysz w demie', en: 'What you demolish with in the demo' },
  'arsenal.lead': {
    pl: 'Trzy narzędzia zniszczenia, każde z własnym stylem. Ulepszaj je w trakcie gry i patrz, jak rośnie skala zawaleń.',
    en: 'Three tools of destruction, each with its own style. Upgrade them mid-run and watch the scale of the collapse grow.',
  },
  'wpn.bazooka.name': { pl: 'Bazooka', en: 'Bazooka' },
  'wpn.bazooka.tier': { pl: 'Poziomy 1–3', en: 'Tiers 1–3' },
  'wpn.bazooka.desc': {
    pl: 'Pojedynczy pocisk, ogromny krater. Wyższe poziomy = większy promień i mocniejsza fala uderzeniowa. Podstawa każdego wyburzenia.',
    en: 'One shell, one huge crater. Higher tiers mean a wider radius and a stronger shockwave. The backbone of every demolition.',
  },
  'wpn.gatling.name': { pl: 'Gatling', en: 'Gatling' },
  'wpn.gatling.tier': { pl: 'Poziomy 1–2', en: 'Tiers 1–2' },
  'wpn.gatling.desc': {
    pl: 'Grad pocisków, który wygryza konstrukcję metr po metrze. Utrzymaj ogień na jednej kondygnacji, a wieża złoży się jak domek z kart.',
    en: 'A hail of rounds that chews through structure metre by metre. Hold fire on a single floor and the tower folds like a house of cards.',
  },
  'wpn.c4.name': { pl: 'C4', en: 'C4' },
  'wpn.c4.tier': { pl: 'Ładunek kierowany', en: 'Placed charge' },
  'wpn.c4.desc': {
    pl: 'Podłóż ładunek dokładnie tam, gdzie chcesz, i odpal w idealnym momencie. Kontrolowana rozbiórka dla tych, którzy lubią precyzję.',
    en: 'Plant the charge exactly where you want and blow it at the perfect moment. Controlled demolition for those who like precision.',
  },
  'wpn.drag': { pl: 'przeciągnij, aby obrócić', en: 'drag to rotate' },
  'stat.power': { pl: 'Siła', en: 'Power' },
  'stat.radius': { pl: 'Promień', en: 'Radius' },
  'stat.rate': { pl: 'Tempo ognia', en: 'Fire rate' },
  'stat.precision': { pl: 'Precyzja', en: 'Precision' },

  // ── full game ────────────────────────────────────────────────────────────
  'full.kicker': { pl: 'W pełnej grze', en: 'In the full game' },
  'full.h2': { pl: 'Demo to dopiero pierwsza dzielnica', en: 'The demo is just the first district' },
  'full.lead': {
    pl: 'To, co burzysz teraz, to wycinek świata Voxpolii. Oto, co szykujemy na premierę.',
    en: 'What you demolish now is a slice of the Voxpolia world. Here is what we are building toward launch.',
  },
  'full.i1.t': { pl: 'Całe miasto', en: 'A whole city' },
  'full.i1.d': {
    pl: 'Kolejne dzielnice: wieżowce, osiedla, fabryki i ratusz — każda z własną sylwetką i sposobem na zawalenie.',
    en: 'More districts: skyscrapers, housing, factories and a town hall — each with its own silhouette and way to fall.',
  },
  'full.i2.t': { pl: 'Więcej broni', en: 'More weapons' },
  'full.i2.d': {
    pl: 'Nowe narzędzia zniszczenia i cięższy arsenał, wykraczający daleko poza to, co znasz z dema.',
    en: 'New tools of destruction and a heavier arsenal, going well beyond what the demo shows.',
  },
  'full.i3.t': { pl: 'Co-op i multiplayer', en: 'Co-op & multiplayer' },
  'full.i3.d': {
    pl: 'Burz miasto z ekipą. Wspólne wyburzenia i tryby dla wielu graczy są na mapie drogowej.',
    en: 'Demolish the city with a crew. Shared teardowns and multiplayer modes are on the road map.',
  },
  'full.i4.t': { pl: 'Wyzwania i cele', en: 'Challenges & goals' },
  'full.i4.d': {
    pl: 'Rundy na czas, cele wyburzeń i wynik za styl — powód, by wracać i burzyć lepiej.',
    en: 'Timed rounds, demolition objectives and a score for style — a reason to come back and demolish better.',
  },

  // ── studio ───────────────────────────────────────────────────────────────
  'studio.kicker': { pl: 'Studio', en: 'Studio' },
  'studio.h2': { pl: 'Kto to robi', en: 'Who makes it' },
  'studio.body': {
    pl: '<strong>Endstreet Eleven</strong> to jednoosobowe studio. Voxpolia powstaje w całości tutaj — od kodu, przez fizykę, po każdy model. Jedna gra, robiona z obsesją na punkcie tego, jak dobrze wygląda zawalenie.',
    en: '<strong>Endstreet Eleven</strong> is a one-person studio. Voxpolia is built entirely here — from code, through physics, to every model. One game, made with an obsession over how good a collapse looks.',
  },
  'studio.sign': { pl: '— solo dev, ES11', en: '— solo dev, ES11' },

  // ── contact ──────────────────────────────────────────────────────────────
  'contact.kicker': { pl: 'Kontakt', en: 'Contact' },
  'contact.h2': { pl: 'Śledź Voxpolię', en: 'Follow Voxpolia' },
  'contact.note': {
    pl: 'Demo grasz teraz w przeglądarce. Linki do sklepów podłączymy przy premierze.',
    en: 'The demo is playable in the browser now. Store links go live at launch.',
  },

  // ── aria ─────────────────────────────────────────────────────────────────
  'aria.rotLeft': { pl: 'Obróć budynek w lewo', en: 'Rotate building left' },
  'aria.rotRight': { pl: 'Obróć budynek w prawo', en: 'Rotate building right' },
};

const STORAGE_KEY = 'es11-lang';

function pickInitial(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'pl' || saved === 'en') return saved;
  } catch { /* private mode — fall through */ }
  return navigator.language?.toLowerCase().startsWith('pl') ? 'pl' : 'en';
}

let current: Lang = 'pl';

export function applyLang(lang: Lang): void {
  current = lang;
  document.documentElement.lang = lang;
  for (const el of document.querySelectorAll<HTMLElement>('[data-i18n]')) {
    const key = el.dataset.i18n!;
    const entry = DICT[key];
    if (!entry) continue;
    if (el.hasAttribute('data-i18n-html')) el.innerHTML = entry[lang];
    else el.textContent = entry[lang];
  }
  for (const el of document.querySelectorAll<HTMLElement>('[data-i18n-aria]')) {
    const entry = DICT[el.dataset.i18nAria!];
    if (entry) el.setAttribute('aria-label', entry[lang]);
  }
  for (const btn of document.querySelectorAll<HTMLElement>('[data-lang]')) {
    btn.classList.toggle('is-active', btn.dataset.lang === lang);
  }
  try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* ignore */ }
}

/** Wire the PL/EN toggle buttons and apply the initial language. */
export function initI18n(): void {
  for (const btn of document.querySelectorAll<HTMLElement>('[data-lang]')) {
    btn.addEventListener('click', () => applyLang(btn.dataset.lang as Lang));
  }
  applyLang(pickInitial());
}

export function currentLang(): Lang {
  return current;
}

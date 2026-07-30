/**
 * Content localisation layer — the same 10 languages the game ships with.
 * Every translatable node carries `data-i18n="key"`; `data-i18n-html` keys may
 * hold inline markup (innerHTML), plain keys go through textContent, and
 * `data-i18n-aria` swaps the aria-label. The choice persists in localStorage,
 * drives <html lang> (and dir for Arabic). Default follows the browser.
 */

export type Lang = 'en' | 'pl' | 'zh' | 'es' | 'hi' | 'ar' | 'fr' | 'pt' | 'ko' | 'ja';

/** Language menu (order + native names + flags), mirroring the game. */
export const LANGS: ReadonlyArray<{ code: Lang; native: string; flag: string; dir?: 'rtl' }> = [
  { code: 'en', native: 'English', flag: '🇬🇧' },
  { code: 'pl', native: 'Polski', flag: '🇵🇱' },
  { code: 'zh', native: '中文', flag: '🇨🇳' },
  { code: 'es', native: 'Español', flag: '🇪🇸' },
  { code: 'hi', native: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ar', native: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  { code: 'fr', native: 'Français', flag: '🇫🇷' },
  { code: 'pt', native: 'Português', flag: '🇧🇷' },
  { code: 'ko', native: '한국어', flag: '🇰🇷' },
  { code: 'ja', native: '日本語', flag: '🇯🇵' },
];

type Entry = Partial<Record<Lang, string>> & { en: string };

const DICT: Record<string, Entry> = {
  // ── nav ──────────────────────────────────────────────────────────────────
  'nav.game': { en: 'Game', pl: 'Gra', zh: '游戏', es: 'Juego', hi: 'गेम', ar: 'اللعبة', fr: 'Jeu', pt: 'Jogo', ko: '게임', ja: 'ゲーム' },
  'nav.arsenal': { en: 'Arsenal', pl: 'Arsenał', zh: '武器库', es: 'Arsenal', hi: 'शस्त्रागार', ar: 'الترسانة', fr: 'Arsenal', pt: 'Arsenal', ko: '무기고', ja: '武器庫' },
  'nav.full': { en: 'Full game', pl: 'Pełna gra', zh: '完整版', es: 'Juego completo', hi: 'पूरा गेम', ar: 'اللعبة الكاملة', fr: 'Jeu complet', pt: 'Jogo completo', ko: '정식 버전', ja: '製品版' },
  'nav.studio': { en: 'Studio', pl: 'Studio', zh: '工作室', es: 'Estudio', hi: 'स्टूडियो', ar: 'الاستوديو', fr: 'Studio', pt: 'Estúdio', ko: '스튜디오', ja: 'スタジオ' },
  'nav.contact': { en: 'Contact', pl: 'Kontakt', zh: '联系', es: 'Contacto', hi: 'संपर्क', ar: 'اتصل', fr: 'Contact', pt: 'Contato', ko: '연락처', ja: 'お問い合わせ' },

  // ── hero ─────────────────────────────────────────────────────────────────
  'hero.eyebrow': {
    en: 'Voxel Destruction · Endstreet Studio', pl: 'Voxel Destruction · Endstreet Studio',
    zh: '体素破坏 · Endstreet Studio', es: 'Destrucción vóxel · Endstreet Studio',
    hi: 'वॉक्सेल विध्वंस · Endstreet Studio', ar: 'تدمير فوكسل · Endstreet Studio',
    fr: 'Destruction voxel · Endstreet Studio', pt: 'Destruição voxel · Endstreet Studio',
    ko: '복셀 파괴 · Endstreet Studio', ja: 'ボクセル破壊 · Endstreet Studio',
  },
  'hero.title': {
    en: 'Bring the city <span class="accent">down.</span>',
    pl: 'Zrównaj miasto <span class="accent">z ziemią.</span>',
    zh: '把城市 <span class="accent">夷为平地。</span>',
    es: 'Arrasa la ciudad <span class="accent">por completo.</span>',
    hi: 'शहर को <span class="accent">ज़मीन पर ला दो।</span>',
    ar: 'اهدم <span class="accent">المدينة بالكامل.</span>',
    fr: 'Rasez la ville <span class="accent">entière.</span>',
    pt: 'Ponha a cidade <span class="accent">abaixo.</span>',
    ko: '도시를 <span class="accent">무너뜨려라.</span>',
    ja: '街を <span class="accent">崩し尽くせ。</span>',
  },
  'hero.sub': {
    en: 'No staged animations. Just pure physics, a living building and <strong>a rocket ready to fire.</strong>',
    pl: 'Zero wyreżyserowanych animacji. Czysta fizyka, żywy budynek i <strong>rakieta gotowa do strzału.</strong>',
    zh: '没有摆拍动画。只有纯粹的物理、真实的楼体，以及<strong>一发随时待命的火箭。</strong>',
    es: 'Nada de animaciones prefabricadas. Física pura, un edificio vivo y <strong>un cohete listo para disparar.</strong>',
    hi: 'कोई बनी-बनाई एनिमेशन नहीं। असली फ़िज़िक्स, ज़िंदा इमारत और <strong>दागने को तैयार रॉकेट।</strong>',
    ar: 'لا رسوم متحركة معدّة سلفاً. فيزياء خالصة ومبنى حي و<strong>صاروخ جاهز للإطلاق.</strong>',
    fr: 'Aucune animation mise en scène. De la physique pure, un bâtiment vivant et <strong>une roquette prête à partir.</strong>',
    pt: 'Nada de animações encenadas. Física pura, um prédio vivo e <strong>um foguete pronto para disparar.</strong>',
    ko: '연출된 애니메이션은 없습니다. 순수한 물리, 살아 있는 건물, 그리고 <strong>발사 준비를 마친 로켓.</strong>',
    ja: '演出用のアニメはなし。あるのは純粋な物理と生きたビル、そして<strong>発射を待つロケット。</strong>',
  },
  'hero.cta1': {
    en: 'Play free in your browser',
    pl: 'Zagraj za darmo w przeglądarce',
    zh: '在浏览器里免费玩',
    es: 'Juega gratis en el navegador',
    hi: 'ब्राउज़र में मुफ़्त खेलें',
    ar: 'العب مجاناً في المتصفح',
    fr: 'Jouer gratuitement dans le navigateur',
    pt: 'Jogue grátis no navegador',
    ko: '브라우저에서 무료로 플레이',
    ja: 'ブラウザで無料プレイ',
  },
  'hero.cta2': { en: 'See the arsenal', pl: 'Zobacz arsenał', zh: '查看武器库', es: 'Ver el arsenal', hi: 'शस्त्रागार देखें', ar: 'شاهد الترسانة', fr: "Voir l'arsenal", pt: 'Ver o arsenal', ko: '무기고 보기', ja: '武器庫を見る' },
  'hero.itch': { en: 'Play on itch.io', pl: 'Zagraj na itch.io', zh: '在 itch.io 上玩', es: 'Juega en itch.io', hi: 'itch.io पर खेलें', ar: 'العب على itch.io', fr: 'Jouer sur itch.io', pt: 'Jogue no itch.io', ko: 'itch.io에서 플레이', ja: 'itch.ioでプレイ' },
  'hero.scroll': { en: 'scroll ↓', pl: 'przewiń ↓', zh: '向下滚动 ↓', es: 'desplaza ↓', hi: 'स्क्रॉल ↓', ar: 'مرّر ↓', fr: 'faites défiler ↓', pt: 'role ↓', ko: '스크롤 ↓', ja: 'スクロール ↓' },

  // ── game / features ──────────────────────────────────────────────────────
  'game.kicker': { en: 'The game', pl: 'O grze', zh: '关于游戏', es: 'El juego', hi: 'गेम के बारे में', ar: 'عن اللعبة', fr: 'Le jeu', pt: 'O jogo', ko: '게임 소개', ja: 'ゲームについて' },
  'game.h2': {
    en: 'No more bulletproof walls. Bring it down to the last brick.',
    pl: 'Koniec z pancernymi ścianami. Zburz wszystko do ostatniej cegły.',
    zh: '再没有打不穿的墙。把它拆到最后一块砖。',
    es: 'Se acabaron los muros a prueba de balas. Derríbalo hasta el último ladrillo.',
    hi: 'अब कोई अभेद्य दीवार नहीं। आख़िरी ईंट तक सब गिरा दो।',
    ar: 'وداعاً للجدران التي لا تُخترق. اهدمها حتى آخر طوبة.',
    fr: 'Fini les murs blindés. Rasez tout jusqu’à la dernière brique.',
    pt: 'Chega de paredes blindadas. Derrube tudo até o último tijolo.',
    ko: '뚫리지 않는 벽은 없습니다. 마지막 벽돌까지 무너뜨리세요.',
    ja: '撃ち抜けない壁はもうない。最後のレンガまで崩そう。',
  },
  'game.lead': {
    en: 'Voxpolia is a shooter built for the pure satisfaction of demolition. Pick a load-bearing pillar and watch the tower fold like a house of cards. Every shot permanently rewrites the city skyline.',
    pl: 'Voxpolia to strzelanka stworzona dla czystej satysfakcji z demolki. Wybierz filar nośny i obserwuj, jak wieżowiec składa się jak domek z kart. Poznaj pełną swobodę, w której każdy strzał trwale zmienia architekturę miasta.',
    zh: 'Voxpolia 是一款为纯粹拆楼快感而生的射击游戏。挑一根承重柱，看整栋高楼像纸牌屋一样塌下去。每一发子弹都会永久改写这座城市的天际线。',
    es: 'Voxpolia es un shooter hecho para el placer puro de demoler. Elige un pilar maestro y mira cómo la torre se pliega como un castillo de naipes. Cada disparo reescribe para siempre el perfil de la ciudad.',
    hi: 'Voxpolia एक ऐसा शूटर है जो सिर्फ़ तोड़-फोड़ के मज़े के लिए बना है। कोई भार उठाने वाला खंभा चुनो और देखो कि इमारत ताश के महल की तरह कैसे बैठ जाती है। हर गोली शहर की शक्ल हमेशा के लिए बदल देती है।',
    ar: 'Voxpolia لعبة تصويب صُنعت لمتعة الهدم الخالصة. اختر عموداً حاملاً وشاهد البرج ينطوي كبيت من ورق. كل طلقة تعيد رسم أفق المدينة إلى الأبد.',
    fr: 'Voxpolia est un jeu de tir conçu pour le plaisir brut de la démolition. Choisissez un pilier porteur et regardez la tour se replier comme un château de cartes. Chaque tir redessine définitivement la silhouette de la ville.',
    pt: 'Voxpolia é um shooter feito para o prazer puro de demolir. Escolha um pilar de sustentação e veja a torre se dobrar como um castelo de cartas. Cada tiro reescreve para sempre o perfil da cidade.',
    ko: 'Voxpolia는 오직 파괴의 쾌감을 위해 만들어진 슈터입니다. 기둥 하나를 골라 무너뜨리면 건물이 카드탑처럼 접힙니다. 한 발 한 발이 도시의 스카이라인을 영구히 바꿉니다.',
    ja: 'Voxpolia は、ただ壊す快感のために作られたシューターです。耐力柱を選んで撃てば、高層ビルはトランプの城のように折れていく。一発ごとに街の輪郭が永久に書き換わります。',
  },
  'game.f1': {
    en: 'Real physics. Hit a weak point and the whole structure gives way.',
    pl: 'Fizyka bez ściemy. Gdy uderzasz w słaby punkt, sypie się cała konstrukcja.',
    zh: '货真价实的物理。打中薄弱处，整栋结构就垮。',
    es: 'Física de verdad. Golpea un punto débil y toda la estructura cede.',
    hi: 'असली फ़िज़िक्स। कमज़ोर जगह पर मारो, पूरा ढाँचा बैठ जाता है।',
    ar: 'فيزياء حقيقية. اضرب نقطة ضعف فتنهار البنية كلها.',
    fr: 'De la vraie physique. Touchez un point faible et toute la structure cède.',
    pt: 'Física de verdade. Acerte um ponto fraco e a estrutura inteira cede.',
    ko: '진짜 물리. 약한 지점을 때리면 구조 전체가 무너집니다.',
    ja: '本物の物理。弱点を撃てば構造ごと崩れる。',
  },
  'game.f2': {
    en: 'A whole city, all yours to flatten.',
    pl: 'Całe miasto na Twoją własność i do Twojej dyspozycji.',
    zh: '整座城市，任你处置。',
    es: 'Una ciudad entera, toda para ti.',
    hi: 'पूरा शहर, पूरी तरह तुम्हारा।',
    ar: 'مدينة كاملة تحت تصرفك.',
    fr: 'Une ville entière, rien que pour vous.',
    pt: 'Uma cidade inteira, toda sua.',
    ko: '도시 하나가 통째로 당신 것.',
    ja: '街まるごと、あなたの好きに。',
  },
  'game.f3': {
    en: 'An arsenal with character, from precise cuts to mass demolition.',
    pl: 'Arsenał z charakterem, oferujący szeroki wybór od precyzyjnych cięć po masową demolkę.',
    zh: '风格各异的武器库，从精准切割到大规模拆除。',
    es: 'Un arsenal con carácter, del corte preciso a la demolición masiva.',
    hi: 'अपने अंदाज़ वाला शस्त्रागार, बारीक कटाई से लेकर बड़े पैमाने की तबाही तक।',
    ar: 'ترسانة لها طابعها، من القطع الدقيق إلى الهدم الشامل.',
    fr: 'Un arsenal qui a du caractère, de la découpe précise à la démolition massive.',
    pt: 'Um arsenal com personalidade, do corte preciso à demolição em massa.',
    ko: '정밀한 절단부터 대규모 철거까지, 개성 있는 무기고.',
    ja: '精密な切断から大規模解体まで、個性のある武器庫。',
  },
  'game.f4': {
    en: 'No downloads, no waiting. Click and play.',
    pl: 'Zero pobierania i zero czekania. Klikasz i grasz od razu.',
    zh: '无需下载，无需等待。点开就玩。',
    es: 'Sin descargas ni esperas. Haz clic y juega.',
    hi: 'न डाउनलोड, न इंतज़ार। क्लिक करो और खेलो।',
    ar: 'بلا تنزيل وبلا انتظار. انقر والعب.',
    fr: 'Aucun téléchargement, aucune attente. Cliquez et jouez.',
    pt: 'Sem downloads, sem espera. Clique e jogue.',
    ko: '다운로드도 기다림도 없이. 클릭하면 바로 플레이.',
    ja: 'ダウンロードも待ち時間もなし。クリックすればすぐ遊べる。',
  },
  'game.play': { en: '▶ Play now — free', pl: '▶ Zagraj za darmo', zh: '▶ 立即免费游玩', es: '▶ Juega gratis', hi: '▶ मुफ़्त खेलें', ar: '▶ العب مجاناً', fr: '▶ Jouer gratuitement', pt: '▶ Jogar de graça', ko: '▶ 무료로 플레이', ja: '▶ 無料でプレイ' },
  'game.playnote': { en: 'In the browser, no install', pl: 'W przeglądarce, bez instalacji', zh: '浏览器内运行，无需安装', es: 'En el navegador, sin instalar', hi: 'ब्राउज़र में, बिना इंस्टॉल', ar: 'في المتصفح، بلا تثبيت', fr: 'Dans le navigateur, sans installation', pt: 'No navegador, sem instalar', ko: '브라우저에서, 설치 없이', ja: 'ブラウザで、インストール不要' },
  'cs.live': { en: 'live', pl: 'na żywo', zh: '实时', es: 'en vivo', hi: 'लाइव', ar: 'مباشر', fr: 'en direct', pt: 'ao vivo', ko: '실시간', ja: 'ライブ' },
  'cs.bazooka': { en: 'Bazooka', pl: 'Bazooka', zh: 'Bazooka', es: 'Bazooka', hi: 'Bazooka', ar: 'Bazooka', fr: 'Bazooka', pt: 'Bazooka', ko: 'Bazooka', ja: 'Bazooka' },
  'cs.gatling': { en: 'Minigun', pl: 'Minigun', zh: 'Minigun', es: 'Minigun', hi: 'Minigun', ar: 'Minigun', fr: 'Minigun', pt: 'Minigun', ko: 'Minigun', ja: 'Minigun' },
  'cs.c4': { en: 'C4', pl: 'C4', zh: 'C4', es: 'C4', hi: 'C4', ar: 'C4', fr: 'C4', pt: 'C4', ko: 'C4', ja: 'C4' },
  'cs.caption': {
    en: 'Same tower, three weapons — three different ways down.',
    pl: 'Ten sam budynek, trzy bronie — trzy różne efekty destrukcji.',
    zh: '同一座楼，三种武器——三种不同的崩塌。',
    es: 'La misma torre, tres armas: tres formas distintas de caer.',
    hi: 'वही इमारत, तीन हथियार — गिरने के तीन अलग तरीके।',
    ar: 'نفس البرج، ثلاثة أسلحة — ثلاث طرق مختلفة للانهيار.',
    fr: 'La même tour, trois armes — trois effondrements différents.',
    pt: 'A mesma torre, três armas — três quedas diferentes.',
    ko: '같은 건물, 세 가지 무기 — 세 가지 붕괴 방식.',
    ja: '同じビル、3つの武器——3通りの崩れ方。',
  },

  // ── zasada: werdykt „zaliczony" + sprzątanie ─────────────────────────────
  'cu.kicker': { en: 'The rule', pl: 'Zasada', zh: '规则', es: 'La regla', hi: 'नियम', ar: 'القاعدة', fr: 'La règle', pt: 'A regra', ko: '규칙', ja: 'ルール' },
  'cu.h2': {
    en: 'Fast action, no hunting for leftovers',
    pl: 'Szybka akcja bez szukania niedobitków',
    zh: '节奏不停，不必再找残楼',
    es: 'Acción rápida, sin buscar restos',
    hi: 'तेज़ रफ़्तार, बचे-खुचे ढाँचे ढूँढ़ने की ज़रूरत नहीं',
    ar: 'إيقاع سريع بلا مطاردة للبقايا',
    fr: 'De l’action rapide, sans traquer les restes',
    pt: 'Ação rápida, sem caçar sobras',
    ko: '잔해를 찾아다닐 필요 없는 빠른 진행',
    ja: '残骸探しのいらない、テンポの良い攻略',
  },
  'cu.lead': {
    en: 'No wasting time picking off single bricks. Level most of a building and the game clears the site for you, so you move straight to the next target.',
    pl: 'Nie trać czasu na celowanie do pojedynczych cegieł. Gdy zrównasz z ziemią większość budynku, gra automatycznie sprząta teren, a Ty przechodzisz do kolejnego celu.',
    zh: '不必再一块块地抠砖。只要把一栋楼拆得差不多，游戏就会自动清空场地，你直接奔向下一个目标。',
    es: 'No pierdas tiempo cazando ladrillos sueltos. Arrasa la mayor parte de un edificio y el juego limpia el solar por ti, listo para el siguiente objetivo.',
    hi: 'अलग-अलग ईंटों पर निशाना लगाकर समय मत गँवाओ। इमारत का बड़ा हिस्सा गिरा दो, गेम ख़ुद ज़मीन साफ़ कर देता है और तुम अगले निशाने पर बढ़ जाते हो।',
    ar: 'لا تضيّع وقتك في قنص الطوبات المتفرقة. اهدم معظم المبنى وستنظّف اللعبة الأرض نيابةً عنك لتنتقل مباشرة إلى الهدف التالي.',
    fr: 'Ne perdez pas de temps à viser les briques isolées. Rasez l’essentiel d’un bâtiment et le jeu nettoie le terrain pour vous. Vous filez droit vers la cible suivante.',
    pt: 'Não perca tempo mirando tijolos soltos. Derrube a maior parte do prédio e o jogo limpa o terreno por você, já rumo ao próximo alvo.',
    ko: '벽돌 하나하나를 노리느라 시간을 쓰지 마세요. 건물 대부분을 무너뜨리면 게임이 알아서 부지를 정리하고, 당신은 다음 목표로 넘어갑니다.',
    ja: '一つひとつのレンガを狙って時間を使う必要はありません。建物の大半を崩せばゲームが自動で跡地を片付け、すぐ次の標的へ進めます。',
  },
  'cu.f1': {
    en: 'No mopping up the last few bricks',
    pl: 'Żadnego dobijania ostatnich cegieł',
    zh: '不必再补最后几块砖',
    es: 'Sin rematar los últimos ladrillos',
    hi: 'आख़िरी ईंटें गिराने की मशक़्क़त नहीं',
    ar: 'لا حاجة للإجهاز على آخر الطوبات',
    fr: 'Plus besoin d’achever les dernières briques',
    pt: 'Sem rematar os últimos tijolos',
    ko: '마지막 벽돌까지 정리할 필요 없음',
    ja: '最後のレンガを片付ける手間なし',
  },
  'cu.f2': {
    en: 'Rubble and leftovers clear themselves',
    pl: 'Gruz i resztki znikają same',
    zh: '废墟和残骸自动清空',
    es: 'Escombros y restos se limpian solos',
    hi: 'मलबा और बचा ढाँचा ख़ुद साफ़',
    ar: 'الركام والبقايا تُزال وحدها',
    fr: 'Gravats et restes s’effacent tout seuls',
    pt: 'Escombros e sobras somem sozinhos',
    ko: '잔해와 잔재는 알아서 사라짐',
    ja: '瓦礫も残骸も勝手に消える',
  },
  'cu.f3': {
    en: 'The site always ends up empty, ready for the next target',
    pl: 'Teren zawsze zostaje pusty, gotowy na kolejny cel',
    zh: '场地总是彻底空出，随时迎接下一个目标',
    es: 'El solar siempre queda vacío, listo para el siguiente objetivo',
    hi: 'ज़मीन हमेशा खाली, अगले निशाने के लिए तैयार',
    ar: 'الأرض تبقى فارغة دائماً وجاهزة للهدف التالي',
    fr: 'Le terrain finit toujours vide, prêt pour la cible suivante',
    pt: 'O terreno sempre fica vazio, pronto para o próximo alvo',
    ko: '부지는 언제나 비워져 다음 목표 준비 완료',
    ja: '跡地は必ず更地になり、次の標的へ',
  },
  'cu.verdict': { en: 'Destroyed', pl: 'Zaliczony', zh: '已判定摧毁', es: 'Destruido', hi: 'ध्वस्त', ar: 'مُدمَّر', fr: 'Détruit', pt: 'Destruído', ko: '파괴 판정', ja: '破壊判定' },
  'cu.caption': {
    en: 'Threshold reached. The site is cleared and ready for the next run.',
    pl: 'Próg osiągnięty! Teren został oczyszczony pod kolejną akcję.',
    zh: '达标！场地已清空，等待下一轮。',
    es: '¡Umbral alcanzado! El solar queda limpio para la siguiente acción.',
    hi: 'सीमा पार! ज़मीन साफ़, अगली कार्रवाई के लिए तैयार।',
    ar: 'تم بلوغ العتبة! الأرض نظيفة وجاهزة للجولة التالية.',
    fr: 'Seuil atteint ! Le terrain est nettoyé pour la suite.',
    pt: 'Limite atingido! O terreno está limpo para a próxima ação.',
    ko: '기준 도달! 부지가 정리되어 다음 작전 준비 완료.',
    ja: '基準達成！跡地は片付き、次の一手へ。',
  },

  'hero.mobileNote': {
    en: 'Mobile support is experimental (tested on iPhone 13). If it stutters, lower the quality in the game\u2019s pause menu.',
    pl: 'Wsparcie mobilne jest eksperymentalne (testowane na iPhone 13). Jeśli tnie, obniż jakość w pauzie gry.',
    zh: '移动端支持仍在实验阶段（在 iPhone 13 上测试过）。如果卡顿，请在游戏暂停菜单里调低画质。',
    es: 'El soporte móvil es experimental (probado en iPhone 13). Si va lento, baja la calidad en el menú de pausa.',
    hi: 'मोबाइल सपोर्ट प्रयोगात्मक है (iPhone 13 पर परखा गया)। अगर अटके, तो पॉज़ मेनू में क्वालिटी घटाओ।',
    ar: 'دعم الجوال تجريبي (مُختبَر على iPhone 13). إذا تقطّع الأداء، اخفض الجودة من قائمة الإيقاف.',
    fr: 'La prise en charge mobile est expérimentale (testée sur iPhone 13). Si ça rame, baissez la qualité dans le menu pause.',
    pt: 'O suporte móvel é experimental (testado no iPhone 13). Se travar, diminua a qualidade no menu de pausa.',
    ko: '모바일 지원은 실험 단계입니다(iPhone 13에서 테스트). 끊기면 일시정지 메뉴에서 품질을 낮추세요.',
    ja: 'モバイル対応は実験的です（iPhone 13 で検証）。カクつく場合はポーズメニューで画質を下げてください。',
  },
  'hero.browserNote': {
    en: 'Best performance in Chrome or Edge.',
    pl: 'Najlepsza wydajno\u015b\u0107 w Chrome lub Edge.',
    zh: '\u5728 Chrome \u6216 Edge \u4e2d\u6027\u80fd\u6700\u4f73\u3002',
    es: 'Mejor rendimiento en Chrome o Edge.',
    hi: 'Chrome \u092f\u093e Edge \u092e\u0947\u0902 \u0938\u092c\u0938\u0947 \u0905\u091a\u094d\u091b\u093e \u092a\u094d\u0930\u0926\u0930\u094d\u0936\u0928\u0964',
    ar: '\u0623\u0641\u0636\u0644 \u0623\u062f\u0627\u0621 \u0641\u064a Chrome \u0623\u0648 Edge.',
    fr: 'Performances optimales sur Chrome ou Edge.',
    pt: 'Melhor desempenho no Chrome ou Edge.',
    ko: 'Chrome \ub610\ub294 Edge\uc5d0\uc11c \uac00\uc7a5 \uc798 \uc791\ub3d9\ud569\ub2c8\ub2e4.',
    ja: 'Chrome \u307e\u305f\u306f Edge \u3067\u6700\u9ad8\u306e\u30d1\u30d5\u30a9\u30fc\u30de\u30f3\u30b9\u3092\u767a\u63ee\u3057\u307e\u3059\u3002',
  },
  'contact.perf': {
    en: 'Performance issues? Tell us your phone model. The demo collects anonymous technical data (GPU model, FPS) \u2014 no identifiers, no cookies.',
    pl: 'Problem z wydajnością? Napisz, jaki masz telefon. Demo zbiera anonimowe dane techniczne (model GPU, FPS) \u2014 bez identyfikatorów i ciasteczek.',
    zh: '遇到性能问题？告诉我们你的手机型号。演示会收集匿名技术数据（GPU 型号、FPS）——无标识符、无 Cookie。',
    es: '\u00bfProblemas de rendimiento? Dinos qu\u00e9 m\u00f3vil tienes. La demo recoge datos t\u00e9cnicos an\u00f3nimos (GPU, FPS), sin identificadores ni cookies.',
    hi: 'परफ़ॉर्मेंस में दिक़्क़त? हमें अपना फ़ोन मॉडल बताओ। डेमो अनाम तकनीकी डेटा (GPU, FPS) जुटाता है \u2014 बिना पहचानकर्ता, बिना कुकीज़।',
    ar: 'مشاكل في الأداء؟ أخبرنا بطراز هاتفك. تجمع التجربة بيانات تقنية مجهولة (طراز GPU، FPS) \u2014 بلا معرّفات ولا كوكيز.',
    fr: 'Des soucis de performance ? Dites-nous votre mod\u00e8le de t\u00e9l\u00e9phone. La d\u00e9mo collecte des donn\u00e9es techniques anonymes (GPU, FPS), sans identifiants ni cookies.',
    pt: 'Problemas de desempenho? Conte qual \u00e9 o seu celular. A demo coleta dados t\u00e9cnicos an\u00f4nimos (GPU, FPS) \u2014 sem identificadores e sem cookies.',
    ko: '\uc131\ub2a5 \ubb38\uc81c\uac00 \uc788\ub098\uc694? \ud734\ub300\ud3f0 \uae30\uc885\uc744 \uc54c\ub824\uc8fc\uc138\uc694. \ub370\ubaa8\ub294 \uc775\uba85 \uae30\uc220 \ub370\uc774\ud130(GPU, FPS)\ub97c \uc218\uc9d1\ud569\ub2c8\ub2e4 \u2014 \uc2dd\ubcc4\uc790\u00b7\ucfe0\ud0a4 \uc5c6\uc74c.',
    ja: '\u30d1\u30d5\u30a9\u30fc\u30de\u30f3\u30b9\u306e\u554f\u984c\uff1f\u304a\u4f7f\u3044\u306e\u6a5f\u7a2e\u3092\u6559\u3048\u3066\u304f\u3060\u3055\u3044\u3002\u30c7\u30e2\u306f\u533f\u540d\u306e\u6280\u8853\u30c7\u30fc\u30bf\uff08GPU\u30fbFPS\uff09\u3092\u53ce\u96c6\u3057\u307e\u3059\u2014\u2014\u8b58\u5225\u5b50\u30fbCookie\u306a\u3057\u3002',
  },
  // ── arsenal ──────────────────────────────────────────────────────────────
  'arsenal.kicker': { en: 'Arsenal', pl: 'Arsenał', zh: '武器库', es: 'Arsenal', hi: 'शस्त्रागार', ar: 'الترسانة', fr: 'Arsenal', pt: 'Arsenal', ko: '무기고', ja: '武器庫' },
  'arsenal.h2': { en: 'Tools of destruction', pl: 'Narzędzia destrukcji', zh: '破坏工具', es: 'Herramientas de destrucción', hi: 'विध्वंस के औज़ार', ar: 'أدوات التدمير', fr: 'Outils de destruction', pt: 'Ferramentas de destruição', ko: '파괴의 도구', ja: '破壊の道具' },
  'arsenal.lead': {
    en: 'Three tools, each with its own style. Upgrade them mid-run and watch the scale of destruction grow.',
    pl: 'Trzy narzędzia, każde z własnym stylem. Ulepszaj je w trakcie gry i patrz, jak rośnie skala destrukcji.',
    zh: '三种工具，各有风格。在游戏中升级它们，见证破坏规模不断升级。',
    es: 'Tres herramientas, cada una con su estilo. Mejóralas durante la partida y ve cómo crece la destrucción.',
    hi: 'तीन औज़ार, हर एक का अपना अंदाज़। खेल के दौरान इन्हें अपग्रेड करो और विध्वंस का पैमाना बढ़ते देखो।',
    ar: 'ثلاث أدوات، لكلٍّ أسلوبها. طوّرها أثناء اللعب وشاهد حجم التدمير يتضاعف.',
    fr: 'Trois outils, chacun avec son style. Améliorez-les en cours de partie et voyez la destruction monter en puissance.',
    pt: 'Três ferramentas, cada uma com seu estilo. Melhore-as durante a partida e veja a escala da destruição crescer.',
    ko: '세 가지 도구, 각각의 스타일. 플레이 중에 업그레이드하며 파괴 규모가 커지는 것을 지켜보세요.',
    ja: '3つの道具、それぞれのスタイル。プレイ中に強化して、破壊の規模が増していくのを見届けよう。',
  },
  'wpn.bazooka.name': { en: 'Bazooka', pl: 'Bazooka', zh: 'Bazooka', es: 'Bazooka', hi: 'Bazooka', ar: 'Bazooka', fr: 'Bazooka', pt: 'Bazooka', ko: 'Bazooka', ja: 'Bazooka' },
  'wpn.bazooka.tier': { en: 'Tiers 1–3', pl: 'Poziomy 1–3', zh: '等级 1–3', es: 'Niveles 1–3', hi: 'स्तर 1–3', ar: 'المستويات ١–٣', fr: 'Niveaux 1–3', pt: 'Níveis 1–3', ko: '등급 1–3', ja: 'ティア 1–3' },
  'wpn.bazooka.desc': {
    en: 'Classic punch. Fire a shell, tear a wide hole in the facade and break the structure with a single hit.',
    pl: 'Klasyczna moc uderzeniowa. Wystrzel pocisk, zrób dużą wyrwę w elewacji i przełam strukturę budynku jednym trafieniem.',
    zh: '最经典的冲击力。一发炮弹在外墙轰出大洞，一击就把结构打断。',
    es: 'Pegada clásica. Dispara un proyectil, abre un boquete enorme en la fachada y parte la estructura de un solo golpe.',
    hi: 'क्लासिक मार। एक गोला दागो, अगले हिस्से में बड़ा छेद बनाओ और एक ही वार में ढाँचा तोड़ दो।',
    ar: 'قوة ضرب كلاسيكية. أطلق قذيفة، افتح فجوة واسعة في الواجهة، واكسر البنية بضربة واحدة.',
    fr: 'La frappe classique. Tirez un obus, ouvrez une large brèche dans la façade et brisez la structure d’un seul coup.',
    pt: 'Pancada clássica. Dispare um projétil, abra um rombo enorme na fachada e quebre a estrutura com um só acerto.',
    ko: '정통 한 방. 포탄을 쏘아 외벽에 큰 구멍을 뚫고 한 번에 구조를 부러뜨리세요.',
    ja: '王道の一撃。砲弾を撃ち込み、外壁に大穴を開けて、一発で構造を折る。',
  },
  'wpn.gatling.name': { en: 'Minigun', pl: 'Minigun', zh: 'Minigun', es: 'Minigun', hi: 'Minigun', ar: 'Minigun', fr: 'Minigun', pt: 'Minigun', ko: 'Minigun', ja: 'Minigun' },
  'wpn.gatling.tier': { en: 'Tiers 1–3', pl: 'Poziomy 1–3', zh: '等级 1–3', es: 'Niveles 1–3', hi: 'स्तर 1–3', ar: 'المستويات ١–٣', fr: 'Niveaux 1–3', pt: 'Níveis 1–3', ko: '등급 1–3', ja: 'ティア 1–3' },
  'wpn.gatling.desc': {
    en: 'An unbroken stream of lead. Chew through walls with precision and cut away whole floors until the structure loses its balance.',
    pl: 'Nieprzerwany strumień ołowiu. Precyzyjnie wygryzaj ściany i odcinaj całe piętra, dopóki konstrukcja nie straci równowagi.',
    zh: '不间断的弹流。精准啃穿墙体、切掉整层楼，直到结构失去平衡。',
    es: 'Un torrente continuo de plomo. Devora paredes con precisión y corta plantas enteras hasta que la estructura pierde el equilibrio.',
    hi: 'गोलियों की लगातार धार। दीवारों को बारीकी से चबाओ और पूरी मंज़िलें काट दो, जब तक ढाँचा संतुलन न खो दे।',
    ar: 'سيل متواصل من الرصاص. اقضم الجدران بدقة واقطع طوابق كاملة حتى تفقد البنية توازنها.',
    fr: 'Un flot ininterrompu de plomb. Rongez les murs avec précision et découpez des étages entiers jusqu’à ce que la structure perde l’équilibre.',
    pt: 'Um fluxo ininterrupto de chumbo. Corroa paredes com precisão e corte andares inteiros até a estrutura perder o equilíbrio.',
    ko: '끊이지 않는 탄환의 흐름. 벽을 정밀하게 갉아내고 층 전체를 잘라내 구조의 균형을 무너뜨리세요.',
    ja: '途切れない鉛の奔流。壁を正確に削り、フロアごと切り落として、構造の均衡を奪う。',
  },
  'wpn.c4.name': { en: 'C4', pl: 'C4', zh: 'C4', es: 'C4', hi: 'C4', ar: 'C4', fr: 'C4', pt: 'C4', ko: 'C4', ja: 'C4' },
  'wpn.c4.tier': { en: 'Tiers 1–3', pl: 'Poziomy 1–3', zh: '等级 1–3', es: 'Niveles 1–3', hi: 'स्तर 1–3', ar: 'المستويات ١–٣', fr: 'Niveaux 1–3', pt: 'Níveis 1–3', ko: '등급 1–3', ja: 'ティア 1–3' },
  'wpn.c4.desc': {
    en: 'The art of controlled demolition. Place charges at the critical points, pull back and set off a spectacular detonation.',
    pl: 'Sztuka kontrolowanej rozbiórki. Rozmieść ładunki w punktach krytycznych, wycofaj się i wykonaj widowiskową detonację.',
    zh: '定向爆破的艺术。把炸药布在关键节点，退到安全处，然后来一场壮观的引爆。',
    es: 'El arte de la demolición controlada. Coloca las cargas en los puntos críticos, retírate y ejecuta una detonación espectacular.',
    hi: 'नियंत्रित विध्वंस की कला। अहम जगहों पर चार्ज लगाओ, पीछे हटो और शानदार धमाका करो।',
    ar: 'فن الهدم الموجّه. وزّع الشحنات على النقاط الحرجة، تراجع، ثم نفّذ تفجيراً مذهلاً.',
    fr: 'L’art de la démolition contrôlée. Placez les charges aux points critiques, reculez et déclenchez une détonation spectaculaire.',
    pt: 'A arte da demolição controlada. Posicione as cargas nos pontos críticos, recue e execute uma detonação espetacular.',
    ko: '계획 폭파의 기술. 급소마다 폭약을 설치하고 물러선 뒤, 화려한 폭발을 터뜨리세요.',
    ja: '制御解体の技。急所に爆薬を仕掛け、距離を取り、豪快に起爆する。',
  },
  'wpn.mystery.tier': { en: '🔒 Hidden weapon', pl: '🔒 Broń ukryta', zh: '🔒 隐藏武器', es: '🔒 Arma oculta', hi: '🔒 छिपा हथियार', ar: '🔒 سلاح مخفي', fr: '🔒 Arme cachée', pt: '🔒 Arma secreta', ko: '🔒 히든 무기', ja: '🔒 隠し武器' },
  'wpn.mystery.name': { en: '???', pl: '???', zh: '???', es: '???', hi: '???', ar: '؟؟؟', fr: '???', pt: '???', ko: '???', ja: '???' },
  'wpn.mystery.desc': {
    en: 'A secret defence project. Reach the required level of destruction across the city to unlock a tool of ultimate force.',
    pl: 'Tajny projekt obronny. Osiągnij odpowiedni poziom zniszczeń miasta, aby odblokować narzędzie o ostatecznej sile rażenia.',
    zh: '机密防务项目。把城市破坏到指定程度，即可解锁威力终极的装备。',
    es: 'Un proyecto de defensa secreto. Alcanza el nivel de destrucción requerido en la ciudad para desbloquear un arma de fuerza definitiva.',
    hi: 'एक गुप्त रक्षा परियोजना। शहर में तय स्तर की तबाही तक पहुँचो और परम शक्ति वाला हथियार खोलो।',
    ar: 'مشروع دفاعي سري. ابلغ المستوى المطلوب من التدمير في المدينة لتفتح أداة ذات قوة قصوى.',
    fr: 'Un projet de défense secret. Atteignez le niveau de destruction requis dans la ville pour débloquer un outil à la puissance ultime.',
    pt: 'Um projeto de defesa secreto. Alcance o nível de destruição exigido na cidade para desbloquear uma ferramenta de força definitiva.',
    ko: '비밀 방위 프로젝트. 도시 파괴도가 일정 수준에 이르면 궁극의 위력을 지닌 장비가 해금됩니다.',
    ja: '極秘の防衛計画。街の破壊が規定の水準に達したとき、究極の威力を持つ装備が解放される。',
  },
  'wpn.drag': { en: 'drag to rotate', pl: 'przeciągnij, aby obrócić', zh: '拖动以旋转', es: 'arrastra para girar', hi: 'घुमाने के लिए खींचें', ar: 'اسحب للتدوير', fr: 'faites glisser pour tourner', pt: 'arraste para girar', ko: '드래그하여 회전', ja: 'ドラッグで回転' },
  'stat.power': { en: 'Power', pl: 'Siła', zh: '威力', es: 'Potencia', hi: 'शक्ति', ar: 'القوة', fr: 'Puissance', pt: 'Potência', ko: '위력', ja: '威力' },
  'stat.radius': { en: 'Radius', pl: 'Promień', zh: '范围', es: 'Radio', hi: 'दायरा', ar: 'النطاق', fr: 'Rayon', pt: 'Raio', ko: '반경', ja: '範囲' },
  'stat.rate': { en: 'Fire rate', pl: 'Tempo ognia', zh: '射速', es: 'Cadencia', hi: 'फ़ायर दर', ar: 'معدل الإطلاق', fr: 'Cadence', pt: 'Cadência', ko: '연사력', ja: '連射速度' },
  'stat.precision': { en: 'Precision', pl: 'Precyzja', zh: '精度', es: 'Precisión', hi: 'सटीकता', ar: 'الدقة', fr: 'Précision', pt: 'Precisão', ko: '정밀도', ja: '精度' },

  // ── full game ────────────────────────────────────────────────────────────
  'full.kicker': { en: 'In the full game', pl: 'W pełnej grze', zh: '完整版中', es: 'En el juego completo', hi: 'पूरे गेम में', ar: 'في اللعبة الكاملة', fr: 'Dans le jeu complet', pt: 'No jogo completo', ko: '정식 버전에서는', ja: '製品版では' },
  'full.h2': {
    en: 'The first district is only the beginning',
    pl: 'Pierwsza dzielnica to dopiero początek',
    zh: '第一个街区只是开始',
    es: 'El primer distrito es solo el comienzo',
    hi: 'पहला इलाक़ा तो बस शुरुआत है',
    ar: 'الحيّ الأول ليس سوى البداية',
    fr: 'Le premier quartier n’est qu’un début',
    pt: 'O primeiro bairro é só o começo',
    ko: '첫 번째 구역은 시작에 불과합니다',
    ja: '最初の地区は始まりにすぎない',
  },
  'full.lead': {
    en: 'What you see today is just the proving ground. Here is where Voxpolia is headed.',
    pl: 'To, co widzisz dzisiaj, jest zaledwie poligonem doświadczalnym. Sprawdź, dokąd zmierza Voxpolia.',
    zh: '你今天看到的只是试验场。来看看 Voxpolia 要去往何方。',
    es: 'Lo que ves hoy es apenas el campo de pruebas. Mira hacia dónde va Voxpolia.',
    hi: 'आज तुम जो देख रहे हो, वह सिर्फ़ परीक्षण मैदान है। देखो Voxpolia किस ओर बढ़ रही है।',
    ar: 'ما تراه اليوم مجرد ميدان تجارب. تعرّف إلى وجهة Voxpolia.',
    fr: 'Ce que vous voyez aujourd’hui n’est qu’un terrain d’essai. Voici où va Voxpolia.',
    pt: 'O que você vê hoje é apenas o campo de provas. Veja para onde Voxpolia está indo.',
    ko: '지금 보이는 것은 시험장일 뿐입니다. Voxpolia가 향하는 곳을 확인하세요.',
    ja: '今見えているのは試験場にすぎません。Voxpolia が向かう先をご覧ください。',
  },
  'full.i1.t': { en: 'A whole city', pl: 'Całe miasto', zh: '整座城市', es: 'Una ciudad entera', hi: 'पूरा शहर', ar: 'مدينة كاملة', fr: 'Une ville entière', pt: 'Uma cidade inteira', ko: '도시 전체', ja: '街まるごと' },
  'full.i1.d': {
    en: 'More districts, each with its own silhouette and way to fall — and so much more.',
    pl: 'Kolejne dzielnice, każda z własną sylwetką i sposobem na destrukcję — i o wiele, wiele więcej.',
    zh: '更多街区，每个都有独特的轮廓和坍塌方式——以及远不止于此。',
    es: 'Más distritos, cada uno con su silueta y su forma de caer, y mucho, mucho más.',
    hi: 'और भी इलाक़े, हर एक की अपनी बनावट और गिरने का अंदाज़ — और भी बहुत कुछ।',
    ar: 'أحياء أخرى، لكلٍّ ملامحه وطريقته في الانهيار — وأكثر من ذلك بكثير.',
    fr: 'Davantage de quartiers, chacun avec sa silhouette et sa façon de tomber — et bien plus encore.',
    pt: 'Mais bairros, cada um com sua silhueta e seu jeito de cair — e muito, muito mais.',
    ko: '더 많은 구역, 각기 다른 실루엣과 붕괴 방식 — 그리고 훨씬 더 많은 것들.',
    ja: 'さらなる地区、それぞれ独自のシルエットと崩れ方——そしてもっとたくさん。',
  },
  'full.i2.t': { en: 'More weapons', pl: 'Więcej broni', zh: '更多武器', es: 'Más armas', hi: 'और हथियार', ar: 'أسلحة أكثر', fr: "Plus d'armes", pt: 'Mais armas', ko: '더 많은 무기', ja: 'さらなる武器' },
  'full.i2.d': {
    en: 'New tools of destruction and a heavier arsenal, going well beyond what you play now.',
    pl: 'Nowe narzędzia zniszczenia i cięższy arsenał, wykraczający daleko poza to, co grasz teraz.',
    zh: '全新的破坏工具与更重型的武器库，远超你现在所玩的内容。',
    es: 'Nuevas herramientas de destrucción y un arsenal más pesado, mucho más allá de lo que juegas ahora.',
    hi: 'विध्वंस के नए औज़ार और भारी शस्त्रागार, जो अभी तुम जो खेल रहे हो उससे कहीं आगे है।',
    ar: 'أدوات تدمير جديدة وترسانة أثقل، تتجاوز بكثير ما تلعبه الآن.',
    fr: "De nouveaux outils de destruction et un arsenal plus lourd, bien au-delà de ce que vous jouez aujourd'hui.",
    pt: 'Novas ferramentas de destruição e um arsenal mais pesado, muito além do que você joga agora.',
    ko: '새로운 파괴 도구와 더 강력한 무기고 — 지금 플레이하는 것을 훨씬 뛰어넘습니다.',
    ja: '新たな破壊の道具と、より重厚な武器庫。いま遊べる範囲をはるかに超えて。',
  },
  'full.i3.t': { en: 'Vehicles', pl: 'Pojazdy', zh: '载具', es: 'Vehículos', hi: 'वाहन', ar: 'المركبات', fr: 'Véhicules', pt: 'Veículos', ko: '차량', ja: '乗り物' },
  'full.i3.d': {
    en: 'Ram and crush. Take the wheel of heavy machinery and drive into the buildings at full speed.',
    pl: 'Taranuj i miażdż. Wsiądź za kierownicę ciężkiego sprzętu i wjeżdżaj w budynki z pełną prędkością.',
    zh: '横冲直撞。开上重型机械，全速撞进楼里。',
    es: 'Embiste y aplasta. Toma el volante de maquinaria pesada y entra en los edificios a toda velocidad.',
    hi: 'टक्कर मारो और कुचलो। भारी मशीन का स्टीयरिंग थामो और पूरी रफ़्तार से इमारतों में घुस जाओ।',
    ar: 'اصدم واسحق. تولَّ قيادة آليات ثقيلة وادخل المباني بأقصى سرعة.',
    fr: 'Percutez et écrasez. Prenez le volant d’un engin lourd et foncez dans les bâtiments à pleine vitesse.',
    pt: 'Atropele e esmague. Assuma o volante de maquinário pesado e entre nos prédios em alta velocidade.',
    ko: '들이받고 짓뭉개세요. 중장비 운전석에 앉아 전속력으로 건물로 돌진합니다.',
    ja: '突っ込んで、押し潰す。重機のハンドルを握り、全速力でビルへ。',
  },
  'full.i4.t': { en: 'Challenges & goals', pl: 'Wyzwania i cele', zh: '挑战与目标', es: 'Retos y objetivos', hi: 'चुनौतियाँ और लक्ष्य', ar: 'تحديات وأهداف', fr: 'Défis et objectifs', pt: 'Desafios e metas', ko: '도전과 목표', ja: 'チャレンジと目標' },
  'full.i4.d': {
    en: 'Timed rounds, destruction objectives and a score for style — a reason to come back and destroy better.',
    pl: 'Rundy na czas, cele do zniszczenia i wynik za styl — powód, by wracać i niszczyć lepiej.',
    zh: '限时回合、破坏目标，以及为风格打分——让你不断回来、破坏得更漂亮的理由。',
    es: 'Rondas contrarreloj, objetivos de destrucción y puntos por estilo: un motivo para volver y destruir mejor.',
    hi: 'समयबद्ध राउंड, विध्वंस के लक्ष्य और स्टाइल के लिए स्कोर — बार-बार लौटकर और बेहतर तबाही मचाने की वजह।',
    ar: 'جولات موقوتة، وأهداف تدمير، ونقاط على الأسلوب — سبب للعودة والتدمير بشكل أفضل.',
    fr: 'Manches chronométrées, objectifs de destruction et score de style — une raison de revenir et de mieux détruire.',
    pt: 'Rodadas cronometradas, objetivos de destruição e pontos por estilo — um motivo para voltar e destruir melhor.',
    ko: '제한 시간 라운드, 파괴 목표, 그리고 스타일 점수 — 다시 돌아와 더 멋지게 부술 이유.',
    ja: 'タイム制ラウンド、破壊目標、そしてスタイルによるスコア——また戻ってもっと上手く壊したくなる。',
  },

  // ── studio ───────────────────────────────────────────────────────────────
  'studio.kicker': { en: 'Studio', pl: 'Studio', zh: '工作室', es: 'Estudio', hi: 'स्टूडियो', ar: 'الاستوديو', fr: 'Studio', pt: 'Estúdio', ko: '스튜디오', ja: 'スタジオ' },
  'studio.h2': {
    en: 'Who is behind this?',
    pl: 'Kto za tym stoi?',
    zh: '这是谁做的？',
    es: '¿Quién está detrás de esto?',
    hi: 'इसके पीछे कौन है?',
    ar: 'من وراء هذا؟',
    fr: 'Qui est derrière tout ça ?',
    pt: 'Quem está por trás disso?',
    ko: '누가 만들었나요?',
    ja: '誰が作っているのか',
  },
  'studio.body': {
    en: 'Behind Voxpolia is one person and a deep love for games where destruction means total freedom.',
    pl: 'Za Voxpolią stoi jedna osoba i wielka pasja do tworzenia gier, w których destrukcja daje pełną swobodę.',
    zh: 'Voxpolia 背后是一个人，以及对「破坏即自由」这类游戏的热爱。',
    es: 'Detrás de Voxpolia hay una sola persona y una gran pasión por los juegos donde destruir significa libertad total.',
    hi: 'Voxpolia के पीछे एक ही इंसान है और ऐसे खेलों का जुनून जिनमें तोड़-फोड़ का मतलब पूरी आज़ादी हो।',
    ar: 'خلف Voxpolia شخص واحد وشغف كبير بالألعاب التي يعني فيها التدمير حرية كاملة.',
    fr: 'Derrière Voxpolia, il y a une seule personne et une vraie passion pour les jeux où détruire rime avec liberté totale.',
    pt: 'Por trás de Voxpolia há uma só pessoa e uma grande paixão por jogos em que destruir significa liberdade total.',
    ko: 'Voxpolia 뒤에는 한 사람과, 파괴가 곧 자유가 되는 게임에 대한 애정이 있습니다.',
    ja: 'Voxpolia の裏側にいるのは一人と、破壊がそのまま自由になるゲームへの強い思いです。',
  },
  'studio.body2': {
    en: 'A custom engine, custom physics and every building raised from scratch, with no shortcuts and no off-the-shelf templates. All of it exists to give you instant demolition fun straight in the browser. Today I am handing you the first district, and the rest of the city is already on its way.',
    pl: 'Autorski silnik, własna fizyka i każdy budynek wzniesiony od zera, bez skrótów czy gotowych szablonów. Wszystko powstało po to, aby dać Ci natychmiastową frajdę z demolki bezpośrednio w przeglądarce. Dzisiaj oddaję w Twoje ręce pierwszą dzielnicę, a całe miasto jest już w drodze.',
    zh: '自研引擎、自研物理，每一栋楼都从零搭起，不走捷径，不用现成模板。这一切只为让你在浏览器里立刻获得拆楼的快感。今天先交给你第一个街区，整座城市已经在路上。',
    es: 'Motor propio, física propia y cada edificio levantado desde cero, sin atajos ni plantillas de catálogo. Todo existe para darte diversión demoledora al instante, directamente en el navegador. Hoy te entrego el primer distrito, y el resto de la ciudad ya viene en camino.',
    hi: 'अपना इंजन, अपनी फ़िज़िक्स और हर इमारत शून्य से खड़ी की गई, बिना किसी शॉर्टकट या तैयार टेम्पलेट के। यह सब इसलिए है कि तुम्हें ब्राउज़र में ही तुरंत तोड़-फोड़ का मज़ा मिले। आज पहला इलाक़ा तुम्हारे हाथ में है, और बाक़ी शहर रास्ते में।',
    ar: 'محرك خاص وفيزياء خاصة وكل مبنى شُيّد من الصفر بلا اختصارات ولا قوالب جاهزة. كل ذلك ليمنحك متعة الهدم فوراً داخل المتصفح. اليوم أضع بين يديك الحيّ الأول، وبقية المدينة في الطريق.',
    fr: 'Un moteur maison, une physique maison et chaque bâtiment monté de zéro, sans raccourcis ni gabarits tout faits. Tout cela existe pour vous offrir le plaisir immédiat de la démolition, directement dans le navigateur. Aujourd’hui je vous confie le premier quartier, et le reste de la ville arrive déjà.',
    pt: 'Motor próprio, física própria e cada prédio erguido do zero, sem atalhos nem modelos prontos. Tudo isso existe para dar a você diversão imediata com demolição, direto no navegador. Hoje entrego o primeiro bairro, e o resto da cidade já está a caminho.',
    ko: '자체 엔진, 자체 물리, 그리고 지름길이나 기성 템플릿 없이 처음부터 세운 모든 건물. 이 모든 것은 브라우저에서 곧바로 파괴의 즐거움을 드리기 위한 것입니다. 오늘은 첫 번째 구역을 건네드리고, 나머지 도시도 이미 오고 있습니다.',
    ja: '自作エンジン、自作の物理、そして一棟ずつゼロから建てたビル。近道も既製のテンプレートも使っていません。すべては、ブラウザで今すぐ壊す楽しさを届けるためです。今日はまず最初の地区をお渡しします。街の続きも、もう向かっています。',
  },
  'studio.sign': { en: '— Endstreet Studio', pl: '— Endstreet Studio', zh: '— Endstreet Studio', es: '— Endstreet Studio', hi: '— Endstreet Studio', ar: '— Endstreet Studio', fr: '— Endstreet Studio', pt: '— Endstreet Studio', ko: '— Endstreet Studio', ja: '— Endstreet Studio' },

  // ── contact ──────────────────────────────────────────────────────────────
  'contact.kicker': { en: 'Contact', pl: 'Kontakt', zh: '联系', es: 'Contacto', hi: 'संपर्क', ar: 'اتصل', fr: 'Contact', pt: 'Contato', ko: '연락처', ja: 'お問い合わせ' },
  'contact.h2': { en: 'Follow Voxpolia', pl: 'Śledź Voxpolię', zh: '关注 Voxpolia', es: 'Sigue a Voxpolia', hi: 'Voxpolia को फ़ॉलो करें', ar: 'تابع Voxpolia', fr: 'Suivez Voxpolia', pt: 'Siga a Voxpolia', ko: 'Voxpolia 팔로우', ja: 'Voxpolia をフォロー' },
  'contact.note': {
    en: 'Playable in the browser now. Store links go live at launch.',
    pl: 'Grasz teraz w przeglądarce. Linki do sklepów podłączymy przy premierze.',
    zh: '现在即可在浏览器中游玩。商店链接将在正式版上线时开放。',
    es: 'Ya se puede jugar en el navegador. Los enlaces a las tiendas se activarán en el lanzamiento.',
    hi: 'अभी ब्राउज़र में खेल सकते हो। स्टोर लिंक लॉन्च पर लाइव होंगे।',
    ar: 'يمكن اللعب في المتصفح الآن. روابط المتاجر ستُفعّل عند الإطلاق.',
    fr: 'Jouable dans le navigateur dès maintenant. Les liens vers les boutiques arriveront à la sortie.',
    pt: 'Já dá para jogar no navegador. Os links das lojas entram no ar no lançamento.',
    ko: '지금 브라우저에서 플레이할 수 있습니다. 스토어 링크는 출시와 함께 공개됩니다.',
    ja: '今すぐブラウザでプレイ可能。ストアリンクはローンチ時に公開します。',
  },

  // ── aria ─────────────────────────────────────────────────────────────────
  'aria.reset': { en: 'Reset the building', pl: 'Reset budynku', zh: '重置建筑', es: 'Reiniciar el edificio', hi: 'इमारत रीसेट करें', ar: 'إعادة المبنى', fr: 'Réinitialiser le bâtiment', pt: 'Reiniciar o prédio', ko: '건물 초기화', ja: 'ビルをリセット' },
  'aria.rotLeft': { en: 'Rotate building left', pl: 'Obróć budynek w lewo', zh: '向左旋转建筑', es: 'Girar edificio a la izquierda', hi: 'इमारत बाएँ घुमाएँ', ar: 'أدر المبنى يساراً', fr: 'Pivoter le bâtiment à gauche', pt: 'Girar prédio à esquerda', ko: '건물 왼쪽으로 회전', ja: 'ビルを左に回転' },
  'aria.rotRight': { en: 'Rotate building right', pl: 'Obróć budynek w prawo', zh: '向右旋转建筑', es: 'Girar edificio a la derecha', hi: 'इमारत दाएँ घुमाएँ', ar: 'أدر المبنى يميناً', fr: 'Pivoter le bâtiment à droite', pt: 'Girar prédio à direita', ko: '건물 오른쪽으로 회전', ja: 'ビルを右に回転' },
};

const STORAGE_KEY = 'es11-lang';
const CODES = LANGS.map((l) => l.code);

function isLang(v: string | null): v is Lang { return v != null && (CODES as string[]).includes(v); }

function pickInitial(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isLang(saved)) return saved;
  } catch { /* private mode — fall through */ }
  const nav = navigator.language?.toLowerCase().slice(0, 2) ?? '';
  return isLang(nav) ? nav : 'en';
}

let current: Lang = 'en';

function t(entry: Entry, lang: Lang): string { return entry[lang] ?? entry.en; }

export function applyLang(lang: Lang): void {
  current = lang;
  const meta = LANGS.find((l) => l.code === lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = meta?.dir ?? 'ltr';
  for (const el of document.querySelectorAll<HTMLElement>('[data-i18n]')) {
    const entry = DICT[el.dataset.i18n!];
    if (!entry) continue;
    if (el.hasAttribute('data-i18n-html')) el.innerHTML = t(entry, lang);
    else el.textContent = t(entry, lang);
  }
  for (const el of document.querySelectorAll<HTMLElement>('[data-i18n-aria]')) {
    const entry = DICT[el.dataset.i18nAria!];
    if (entry) el.setAttribute('aria-label', t(entry, lang));
  }
  updateSwitchLabel();
  try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* ignore */ }
}

// ── language switch (dropdown built from LANGS) ──────────────────────────────
let switchBtn: HTMLButtonElement | null = null;

function updateSwitchLabel(): void {
  const meta = LANGS.find((l) => l.code === current);
  if (switchBtn && meta) switchBtn.querySelector('.lang-cur')!.textContent = `${meta.flag} ${current.toUpperCase()}`;
  for (const item of document.querySelectorAll<HTMLElement>('.lang-item')) {
    item.setAttribute('aria-current', item.dataset.lang === current ? 'true' : 'false');
  }
}

function buildSwitch(): void {
  const host = document.getElementById('lang-switch');
  if (!host) return;
  host.replaceChildren();
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'lang-btn';
  btn.setAttribute('aria-haspopup', 'true');
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = '<span class="lang-cur"></span><span class="lang-caret">▾</span>';
  const menu = document.createElement('div');
  menu.className = 'lang-menu';
  menu.setAttribute('role', 'menu');
  for (const l of LANGS) {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'lang-item';
    item.dataset.lang = l.code;
    item.setAttribute('role', 'menuitem');
    item.innerHTML = `<span class="lang-flag">${l.flag}</span> ${l.native}`;
    item.addEventListener('click', () => { applyLang(l.code); close(); });
    menu.appendChild(item);
  }
  const open = (): void => { host.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); };
  const close = (): void => { host.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); };
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    host.classList.contains('open') ? close() : open();
  });
  document.addEventListener('click', (e) => { if (!host.contains(e.target as Node)) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  host.append(btn, menu);
  switchBtn = btn;
}

/** Build the language switch and apply the initial language. */
export function initI18n(): void {
  buildSwitch();
  applyLang(pickInitial());
}

export function currentLang(): Lang { return current; }

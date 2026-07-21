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
    en: "It isn't scripted — it's real destruction physics. <strong>Aim with the mouse and click — a rocket flies.</strong>",
    pl: 'To nie animacja — to prawdziwa fizyka destrukcji. <strong>Wyceluj myszką i kliknij — poleci rakieta.</strong>',
    zh: '这不是脚本动画，而是真实的破坏物理。<strong>用鼠标瞄准并点击——火箭就会射出。</strong>',
    es: 'No es una animación: es física de destrucción real. <strong>Apunta con el ratón y haz clic: sale un cohete.</strong>',
    hi: 'यह स्क्रिप्टेड नहीं है — यह असली विध्वंस भौतिकी है। <strong>माउस से निशाना लगाओ और क्लिक करो — रॉकेट छूटेगा।</strong>',
    ar: 'ليست حركة مبرمجة — إنها فيزياء تدمير حقيقية. <strong>صوّب بالفأرة وانقر — ينطلق صاروخ.</strong>',
    fr: "Ce n'est pas scripté — c'est de la vraie physique de destruction. <strong>Visez à la souris et cliquez — une roquette part.</strong>",
    pt: 'Não é animação — é física de destruição real. <strong>Mire com o mouse e clique — um foguete dispara.</strong>',
    ko: '스크립트가 아닙니다 — 진짜 파괴 물리입니다. <strong>마우스로 조준하고 클릭하면 로켓이 날아갑니다.</strong>',
    ja: 'スクリプトではなく、本物の破壊物理です。<strong>マウスで狙ってクリック — ロケットが飛びます。</strong>',
  },
  'hero.cta1': { en: 'Play now', pl: 'Zagraj teraz', zh: '立即游玩', es: 'Jugar ahora', hi: 'अभी खेलें', ar: 'العب الآن', fr: 'Jouer', pt: 'Jogar agora', ko: '지금 플레이', ja: '今すぐプレイ' },
  'hero.cta2': { en: 'See the arsenal', pl: 'Zobacz arsenał', zh: '查看武器库', es: 'Ver el arsenal', hi: 'शस्त्रागार देखें', ar: 'شاهد الترسانة', fr: "Voir l'arsenal", pt: 'Ver o arsenal', ko: '무기고 보기', ja: '武器庫を見る' },
  'hero.install': { en: '📲 Install on your phone', pl: '📲 Zainstaluj na telefonie', zh: '📲 安装到手机', es: '📲 Instalar en el móvil', hi: '📲 फ़ोन पर इंस्टॉल करें', ar: '📲 ثبّته على هاتفك', fr: '📲 Installer sur mobile', pt: '📲 Instalar no celular', ko: '📲 휴대폰에 설치', ja: '📲 スマホにインストール' },
  'hero.reset': { en: '⟳ Reset building', pl: '⟳ Reset budynku', zh: '⟳ 重置建筑', es: '⟳ Reiniciar edificio', hi: '⟳ इमारत रीसेट', ar: '⟳ إعادة المبنى', fr: '⟳ Réinitialiser', pt: '⟳ Reiniciar prédio', ko: '⟳ 건물 초기화', ja: '⟳ ビルをリセット' },
  'hero.rotate': { en: 'rotate', pl: 'obróć', zh: '旋转', es: 'girar', hi: 'घुमाएँ', ar: 'دوران', fr: 'pivoter', pt: 'girar', ko: '회전', ja: '回転' },
  'hero.scroll': { en: 'scroll ↓', pl: 'przewiń ↓', zh: '向下滚动 ↓', es: 'desplaza ↓', hi: 'स्क्रॉल ↓', ar: 'مرّر ↓', fr: 'faites défiler ↓', pt: 'role ↓', ko: '스크롤 ↓', ja: 'スクロール ↓' },

  // ── game / features ──────────────────────────────────────────────────────
  'game.kicker': { en: 'The game', pl: 'O grze', zh: '关于游戏', es: 'El juego', hi: 'गेम के बारे में', ar: 'عن اللعبة', fr: 'Le jeu', pt: 'O jogo', ko: '게임 소개', ja: 'ゲームについて' },
  'game.h2': { en: 'Every building truly comes apart', pl: 'Każdy budynek naprawdę leci w gruzy', zh: '每座建筑都真实地崩塌', es: 'Cada edificio se desmorona de verdad', hi: 'हर इमारत सचमुच टूट कर बिखरती है', ar: 'كل مبنى ينهار فعلاً', fr: "Chaque bâtiment s'effondre pour de vrai", pt: 'Cada prédio se despedaça de verdade', ko: '모든 건물이 진짜로 무너집니다', ja: 'すべてのビルが本当に崩れる' },
  'game.lead': {
    en: 'Voxpolia is a voxel destruction shooter. Knock out a load-bearing wall and everything above cascades down — section by section, all the way to the ground. No scripted animations: where you shoot is what matters.',
    pl: 'Voxpolia to wokselowa strzelanka o destrukcji miasta. Wybij ścianę nośną, a wszystko nad nią runie kaskadą — sekcja po sekcji, aż na ziemię. Żadnych skryptowanych animacji: liczy się to, gdzie strzelisz.',
    zh: 'Voxpolia 是一款体素破坏射击游戏。打掉一面承重墙，上方的一切就会层层坍塌，一直塌到地面。没有脚本动画：关键在于你打哪里。',
    es: 'Voxpolia es un shooter de destrucción vóxel. Derriba un muro de carga y todo lo de encima cae en cascada, sección tras sección, hasta el suelo. Sin animaciones scriptadas: lo que importa es dónde disparas.',
    hi: 'Voxpolia एक वॉक्सेल विध्वंस शूटर है। किसी भार वहन करने वाली दीवार को गिराओ और उसके ऊपर का सब कुछ खंड-दर-खंड ज़मीन तक ढह जाता है। कोई स्क्रिप्टेड एनिमेशन नहीं: मायने यह रखता है कि तुम कहाँ गोली मारते हो।',
    ar: 'Voxpolia لعبة تصويب بتدمير فوكسل. أسقِط جداراً حاملاً وينهار كل ما فوقه تدريجياً — قسماً بعد قسم حتى الأرض. لا حركات مبرمجة: المهم أين تطلق النار.',
    fr: "Voxpolia est un shooter de destruction voxel. Détruisez un mur porteur et tout ce qui est au-dessus s'effondre en cascade, section par section, jusqu'au sol. Aucune animation scriptée : ce qui compte, c'est où vous tirez.",
    pt: 'Voxpolia é um shooter de destruição voxel. Derrube uma parede de sustentação e tudo acima desaba em cascata — seção por seção, até o chão. Sem animações roteirizadas: o que importa é onde você atira.',
    ko: 'Voxpolia는 복셀 파괴 슈터입니다. 내력벽을 무너뜨리면 그 위의 모든 것이 한 층씩 지면까지 붕괴합니다. 스크립트 애니메이션은 없습니다: 어디를 쏘느냐가 전부입니다.',
    ja: 'Voxpolia はボクセル破壊シューターです。耐力壁を撃ち抜けば、その上のすべてが層ごとに地面まで崩れ落ちます。スクリプト演出はなし——どこを撃つかがすべてです。',
  },
  'game.f1': { en: 'Destruction driven by a real structural model', pl: 'Destrukcja oparta na realnym modelu konstrukcji', zh: '基于真实结构模型的破坏', es: 'Destrucción basada en un modelo estructural real', hi: 'असली संरचनात्मक मॉडल पर आधारित विध्वंस', ar: 'تدمير مبني على نموذج إنشائي حقيقي', fr: 'Destruction régie par un vrai modèle structurel', pt: 'Destruição baseada em um modelo estrutural real', ko: '실제 구조 모델 기반 파괴', ja: '本物の構造モデルに基づく破壊' },
  'game.f2': { en: 'A whole city to level', pl: 'Całe miasto do zrównania z ziemią', zh: '整座城市任你夷平', es: 'Una ciudad entera por arrasar', hi: 'ढहाने के लिए पूरा शहर', ar: 'مدينة كاملة لتسويتها بالأرض', fr: 'Une ville entière à raser', pt: 'Uma cidade inteira para arrasar', ko: '통째로 밀어버릴 도시', ja: '丸ごと更地にできる街' },
  'game.f3': { en: 'An arsenal that changes how you destroy', pl: 'Arsenał, który zmienia styl destrukcji', zh: '改变破坏方式的武器库', es: 'Un arsenal que cambia tu forma de destruir', hi: 'एक शस्त्रागार जो विध्वंस का अंदाज़ बदल दे', ar: 'ترسانة تغيّر أسلوب تدميرك', fr: 'Un arsenal qui change votre façon de détruire', pt: 'Um arsenal que muda o seu jeito de destruir', ko: '파괴 방식을 바꾸는 무기고', ja: '破壊のスタイルを変える武器庫' },
  'game.f4': { en: 'Play in the browser — no install', pl: 'Graj w przeglądarce — bez instalacji', zh: '浏览器直玩，无需安装', es: 'Juega en el navegador, sin instalar', hi: 'ब्राउज़र में खेलो — कोई इंस्टॉल नहीं', ar: 'العب في المتصفح — بلا تثبيت', fr: 'Jouez dans le navigateur, sans installation', pt: 'Jogue no navegador — sem instalar', ko: '브라우저에서 바로 — 설치 불필요', ja: 'ブラウザで即プレイ——インストール不要' },
  'game.play': { en: '▶ Play now — free', pl: '▶ Zagraj za darmo', zh: '▶ 立即免费游玩', es: '▶ Juega gratis', hi: '▶ मुफ़्त खेलें', ar: '▶ العب مجاناً', fr: '▶ Jouer gratuitement', pt: '▶ Jogar de graça', ko: '▶ 무료로 플레이', ja: '▶ 無料でプレイ' },
  'game.playnote': { en: 'In the browser, no install', pl: 'W przeglądarce, bez instalacji', zh: '浏览器内运行，无需安装', es: 'En el navegador, sin instalar', hi: 'ब्राउज़र में, बिना इंस्टॉल', ar: 'في المتصفح، بلا تثبيت', fr: 'Dans le navigateur, sans installation', pt: 'No navegador, sem instalar', ko: '브라우저에서, 설치 없이', ja: 'ブラウザで、インストール不要' },
  'cs.live': { en: 'live', pl: 'na żywo', zh: '实时', es: 'en vivo', hi: 'लाइव', ar: 'مباشر', fr: 'en direct', pt: 'ao vivo', ko: '실시간', ja: 'ライブ' },
  'cs.bazooka': { en: 'Bazooka', pl: 'Bazooka', zh: 'Bazooka', es: 'Bazooka', hi: 'Bazooka', ar: 'Bazooka', fr: 'Bazooka', pt: 'Bazooka', ko: 'Bazooka', ja: 'Bazooka' },
  'cs.gatling': { en: 'Gatling', pl: 'Działko', zh: 'Gatling', es: 'Gatling', hi: 'Gatling', ar: 'Gatling', fr: 'Gatling', pt: 'Gatling', ko: 'Gatling', ja: 'Gatling' },
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
    en: 'One shell, one huge crater. Higher tiers mean a wider radius and a stronger shockwave. The backbone of every teardown.',
    pl: 'Pojedynczy pocisk, ogromny krater. Wyższe poziomy = większy promień i mocniejsza fala uderzeniowa. Podstawa każdej destrukcji.',
    zh: '一发炮弹，一个巨坑。等级越高，范围越大、冲击波越强。每次拆楼的中坚力量。',
    es: 'Un proyectil, un cráter enorme. Los niveles altos amplían el radio y refuerzan la onda expansiva. La base de toda demolición.',
    hi: 'एक गोला, एक विशाल गड्ढा। ऊँचे स्तर यानी बड़ा दायरा और तेज़ शॉकवेव। हर विध्वंस की रीढ़।',
    ar: 'قذيفة واحدة، حفرة هائلة. المستويات الأعلى تعني نطاقاً أوسع وموجة صدمة أقوى. عماد كل عملية هدم.',
    fr: 'Un obus, un cratère énorme. Les niveaux supérieurs élargissent le rayon et renforcent le souffle. La base de toute démolition.',
    pt: 'Um projétil, uma cratera enorme. Níveis maiores ampliam o raio e reforçam a onda de choque. A base de toda demolição.',
    ko: '한 발, 거대한 크레이터. 등급이 높을수록 반경이 넓고 충격파가 강해집니다. 모든 파괴의 기본기.',
    ja: '一発で巨大なクレーター。ティアが上がるほど範囲は広く、衝撃波は強く。あらゆる解体の基本。',
  },
  'wpn.gatling.name': { en: 'Gatling', pl: 'Gatling', zh: 'Gatling', es: 'Gatling', hi: 'Gatling', ar: 'Gatling', fr: 'Gatling', pt: 'Gatling', ko: 'Gatling', ja: 'Gatling' },
  'wpn.gatling.tier': { en: 'Tiers 1–3', pl: 'Poziomy 1–3', zh: '等级 1–3', es: 'Niveles 1–3', hi: 'स्तर 1–3', ar: 'المستويات ١–٣', fr: 'Niveaux 1–3', pt: 'Níveis 1–3', ko: '등급 1–3', ja: 'ティア 1–3' },
  'wpn.gatling.desc': {
    en: 'A hail of rounds that chews through structure metre by metre. Hold fire on a single floor and the tower folds like a house of cards.',
    pl: 'Grad pocisków, który wygryza konstrukcję metr po metrze. Utrzymaj ogień na jednej kondygnacji, a wieża złoży się jak domek z kart.',
    zh: '弹雨逐米啃穿结构。对准一层持续开火，整座楼便像纸牌屋一样坍塌。',
    es: 'Una lluvia de balas que devora la estructura metro a metro. Mantén el fuego en una planta y la torre se derrumba como un castillo de naipes.',
    hi: 'गोलियों की बौछार जो ढाँचे को मीटर-दर-मीटर चबा जाती है। एक ही मंज़िल पर फ़ायर बनाए रखो और इमारत ताश के महल की तरह ढह जाती है।',
    ar: 'وابل من الطلقات يقضم البنية متراً بمتر. ثبّت النار على طابق واحد فينهار البرج كبيت من ورق.',
    fr: "Une pluie de balles qui ronge la structure mètre par mètre. Concentrez le tir sur un étage et la tour s'écroule comme un château de cartes.",
    pt: 'Uma saraivada de balas que corrói a estrutura metro a metro. Mantenha o fogo em um andar e a torre desaba como um castelo de cartas.',
    ko: '구조물을 미터 단위로 갉아먹는 총알 세례. 한 층에 집중 사격하면 건물이 카드탑처럼 무너집니다.',
    ja: '構造を1メートルずつ削り取る弾幕。1つの階に撃ち続ければ、ビルはトランプの城のように崩れる。',
  },
  'wpn.c4.name': { en: 'C4', pl: 'C4', zh: 'C4', es: 'C4', hi: 'C4', ar: 'C4', fr: 'C4', pt: 'C4', ko: 'C4', ja: 'C4' },
  'wpn.c4.tier': { en: 'Tiers 1–3', pl: 'Poziomy 1–3', zh: '等级 1–3', es: 'Niveles 1–3', hi: 'स्तर 1–3', ar: 'المستويات ١–٣', fr: 'Niveaux 1–3', pt: 'Níveis 1–3', ko: '등급 1–3', ja: 'ティア 1–3' },
  'wpn.c4.desc': {
    en: 'Plant the charge exactly where you want and blow it at the perfect moment. Controlled demolition for those who like precision.',
    pl: 'Podłóż ładunek dokładnie tam, gdzie chcesz, i odpal w idealnym momencie. Kontrolowana rozbiórka dla tych, którzy lubią precyzję.',
    zh: '把炸药精确布置在你想要的位置，在完美时机引爆。为追求精准的人准备的定向爆破。',
    es: 'Coloca la carga justo donde quieras y detónala en el momento perfecto. Demolición controlada para los que aman la precisión.',
    hi: 'चार्ज को ठीक वहीं लगाओ जहाँ चाहो और सही पल पर उड़ा दो। सटीकता पसंद करने वालों के लिए नियंत्रित विध्वंस।',
    ar: 'ازرع الشحنة في المكان الذي تريده تماماً وفجّرها في اللحظة المثالية. هدم موجّه لمن يحبون الدقة.',
    fr: 'Placez la charge exactement où vous voulez et déclenchez-la au moment parfait. Démolition contrôlée pour les amateurs de précision.',
    pt: 'Posicione a carga exatamente onde quiser e detone no momento perfeito. Demolição controlada para quem gosta de precisão.',
    ko: '원하는 위치에 정확히 설치하고 완벽한 순간에 터뜨리세요. 정밀함을 즐기는 이를 위한 계획 폭파.',
    ja: '狙った場所に正確に仕掛け、絶妙なタイミングで起爆。精密さを好む人のための制御解体。',
  },
  'wpn.mystery.tier': { en: '🔒 Hidden weapon', pl: '🔒 Broń ukryta', zh: '🔒 隐藏武器', es: '🔒 Arma oculta', hi: '🔒 छिपा हथियार', ar: '🔒 سلاح مخفي', fr: '🔒 Arme cachée', pt: '🔒 Arma secreta', ko: '🔒 히든 무기', ja: '🔒 隠し武器' },
  'wpn.mystery.name': { en: '???', pl: '???', zh: '???', es: '???', hi: '???', ar: '؟؟؟', fr: '???', pt: '???', ko: '???', ja: '???' },
  'wpn.mystery.desc': {
    en: 'A hidden reward — its power is a surprise. Unlock it by destroying 60% of the city. With the bazooka, gatling and C4 maxed out, 40% is enough.',
    pl: 'Ukryta nagroda — jej moc to niespodzianka. Odblokujesz ją, gdy zniszczysz 60% miasta. A z bazooką, działkiem i C4 na maksymalnym poziomie wystarczy 40%.',
    zh: '隐藏奖励——它的威力是个惊喜。摧毁全城的 60% 即可解锁。若 Bazooka、Gatling 与 C4 都已满级，40% 就够了。',
    es: 'Una recompensa oculta: su poder es una sorpresa. Desbloquéala destruyendo el 60% de la ciudad. Con la bazooka, la gatling y el C4 al máximo, basta con el 40%.',
    hi: 'एक छिपा इनाम — इसकी ताक़त एक सरप्राइज़ है। शहर का 60% नष्ट करके इसे अनलॉक करो। Bazooka, Gatling और C4 पूरे स्तर पर हों तो 40% ही काफ़ी है।',
    ar: 'مكافأة مخفية — قوّتها مفاجأة. افتحها بتدمير ٦٠٪ من المدينة. وإذا كانت Bazooka وGatling وC4 بأقصى مستوى، يكفي ٤٠٪.',
    fr: "Une récompense cachée — sa puissance est une surprise. Débloquez-la en détruisant 60 % de la ville. Avec la bazooka, la gatling et le C4 au max, 40 % suffisent.",
    pt: 'Uma recompensa secreta — o poder dela é surpresa. Desbloqueie destruindo 60% da cidade. Com bazooka, gatling e C4 no máximo, 40% já bastam.',
    ko: '숨겨진 보상 — 그 위력은 비밀입니다. 도시의 60%를 파괴하면 해금됩니다. 바주카·개틀링·C4를 모두 최대로 올리면 40%면 충분합니다.',
    ja: '隠された報酬——その威力はお楽しみ。街の60%を破壊で解放。Bazooka・Gatling・C4 をすべて最大にすれば40%で十分。',
  },
  'wpn.drag': { en: 'drag to rotate', pl: 'przeciągnij, aby obrócić', zh: '拖动以旋转', es: 'arrastra para girar', hi: 'घुमाने के लिए खींचें', ar: 'اسحب للتدوير', fr: 'faites glisser pour tourner', pt: 'arraste para girar', ko: '드래그하여 회전', ja: 'ドラッグで回転' },
  'stat.power': { en: 'Power', pl: 'Siła', zh: '威力', es: 'Potencia', hi: 'शक्ति', ar: 'القوة', fr: 'Puissance', pt: 'Potência', ko: '위력', ja: '威力' },
  'stat.radius': { en: 'Radius', pl: 'Promień', zh: '范围', es: 'Radio', hi: 'दायरा', ar: 'النطاق', fr: 'Rayon', pt: 'Raio', ko: '반경', ja: '範囲' },
  'stat.rate': { en: 'Fire rate', pl: 'Tempo ognia', zh: '射速', es: 'Cadencia', hi: 'फ़ायर दर', ar: 'معدل الإطلاق', fr: 'Cadence', pt: 'Cadência', ko: '연사력', ja: '連射速度' },
  'stat.precision': { en: 'Precision', pl: 'Precyzja', zh: '精度', es: 'Precisión', hi: 'सटीकता', ar: 'الدقة', fr: 'Précision', pt: 'Precisão', ko: '정밀도', ja: '精度' },

  // ── full game ────────────────────────────────────────────────────────────
  'full.kicker': { en: 'In the full game', pl: 'W pełnej grze', zh: '完整版中', es: 'En el juego completo', hi: 'पूरे गेम में', ar: 'في اللعبة الكاملة', fr: 'Dans le jeu complet', pt: 'No jogo completo', ko: '정식 버전에서는', ja: '製品版では' },
  'full.h2': { en: 'Just the first district', pl: 'To dopiero pierwsza dzielnica', zh: '这只是第一个街区', es: 'Solo el primer distrito', hi: 'यह तो बस पहला इलाक़ा है', ar: 'مجرد الحيّ الأول', fr: "Ce n'est que le premier quartier", pt: 'Apenas o primeiro bairro', ko: '이건 첫 번째 구역일 뿐', ja: 'これはまだ最初の地区' },
  'full.lead': {
    en: 'What you destroy now is a slice of the Voxpolia world. Here is what we are building toward launch.',
    pl: 'To, co niszczysz teraz, to wycinek świata Voxpolii. Oto, co szykujemy na premierę.',
    zh: '你现在破坏的只是 Voxpolia 世界的一角。这是我们正为正式版打造的内容。',
    es: 'Lo que destruyes ahora es una parte del mundo de Voxpolia. Esto es lo que preparamos para el lanzamiento.',
    hi: 'तुम अभी जो नष्ट कर रहे हो, वह Voxpolia की दुनिया का एक हिस्सा है। लॉन्च के लिए हम यह तैयार कर रहे हैं।',
    ar: 'ما تدمّره الآن هو جزء من عالم Voxpolia. وهذا ما نجهّزه للإطلاق.',
    fr: 'Ce que vous détruisez ici est un fragment du monde de Voxpolia. Voici ce que nous préparons pour la sortie.',
    pt: 'O que você destrói agora é uma fatia do mundo de Voxpolia. Veja o que estamos preparando para o lançamento.',
    ko: '지금 파괴하는 건 Voxpolia 세계의 일부일 뿐입니다. 정식 출시를 위해 준비 중인 것들을 소개합니다.',
    ja: '今あなたが壊しているのは Voxpolia の世界のほんの一部。ローンチに向けて用意しているものを紹介します。',
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
    en: 'Get behind the wheel of destructible cars and drive into the city — ramming is a demolition tool too.',
    pl: 'Wsiądź za kierownicę niszczalnych aut i wjedź w miasto — taran to też narzędzie destrukcji.',
    zh: '坐上可破坏的汽车，直接冲进城市——撞击也是一种破坏手段。',
    es: 'Ponte al volante de coches destructibles y embiste la ciudad: chocar también es una herramienta de demolición.',
    hi: 'नष्ट होने वाली गाड़ियों का स्टीयरिंग थामो और शहर में घुस जाओ — टक्कर मारना भी विध्वंस का ज़रिया है।',
    ar: 'اجلس خلف مقود سيارات قابلة للتدمير واقتحم المدينة — الاصطدام أيضاً أداة هدم.',
    fr: 'Prenez le volant de voitures destructibles et foncez dans la ville — le bélier est aussi un outil de démolition.',
    pt: 'Assuma o volante de carros destrutíveis e avance pela cidade — atropelar também é ferramenta de demolição.',
    ko: '부서지는 차량의 운전대를 잡고 도시로 돌진하세요 — 들이받는 것도 훌륭한 파괴 수단입니다.',
    ja: '壊せる車のハンドルを握り、街へ突っ込め——体当たりも立派な破壊手段。',
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
  'studio.h2': { en: 'Who makes it', pl: 'Kto to robi', zh: '幕后团队', es: 'Quién lo hace', hi: 'इसे कौन बनाता है', ar: 'من يصنعها', fr: 'Qui le fait', pt: 'Quem faz', ko: '만드는 사람', ja: '制作者' },
  'studio.body': {
    en: '<strong>Endstreet Studio</strong> is a one-person studio — one person, one game. Voxpolia is built entirely here: the code, the physics, every weapon and building model. No team, no off-the-shelf engine — all of it written from scratch.',
    pl: '<strong>Endstreet Studio</strong> to jednoosobowe studio — jedna osoba, jedna gra. Voxpolia powstaje w całości tutaj: kod, fizyka, każdy model broni i budynku. Bez zespołu, bez gotowego silnika — wszystko napisane od zera.',
    zh: '<strong>Endstreet Studio</strong> 是一家一人工作室——一个人，一款游戏。Voxpolia 的一切都在这里完成：代码、物理，以及每一件武器和建筑模型。没有团队，没有现成引擎——全部从零写起。',
    es: '<strong>Endstreet Studio</strong> es un estudio de una sola persona: una persona, un juego. Voxpolia se construye por completo aquí: el código, la física y cada modelo de arma y edificio. Sin equipo, sin motor prefabricado; todo escrito desde cero.',
    hi: '<strong>Endstreet Studio</strong> एक अकेले व्यक्ति का स्टूडियो है — एक इंसान, एक गेम। Voxpolia पूरी तरह यहीं बनता है: कोड, भौतिकी और हर हथियार व इमारत का मॉडल। कोई टीम नहीं, कोई तैयार इंजन नहीं — सब कुछ शुरू से लिखा गया।',
    ar: '<strong>Endstreet Studio</strong> استوديو من شخص واحد — شخص واحد، لعبة واحدة. تُصنع Voxpolia بالكامل هنا: الكود، والفيزياء، وكل نموذج سلاح ومبنى. لا فريق، ولا محرّك جاهز — كل شيء مكتوب من الصفر.',
    fr: "<strong>Endstreet Studio</strong> est un studio d'une seule personne — une personne, un jeu. Voxpolia est entièrement conçu ici : le code, la physique et chaque modèle d'arme et de bâtiment. Sans équipe, sans moteur tout fait — tout est écrit à partir de zéro.",
    pt: '<strong>Endstreet Studio</strong> é um estúdio de uma pessoa só — uma pessoa, um jogo. Voxpolia é feito inteiramente aqui: o código, a física e cada modelo de arma e prédio. Sem equipe, sem motor pronto — tudo escrito do zero.',
    ko: '<strong>Endstreet Studio</strong>는 1인 스튜디오입니다 — 한 사람, 하나의 게임. Voxpolia는 코드, 물리, 모든 무기와 건물 모델까지 여기서 전부 만들어집니다. 팀도, 기성 엔진도 없이 — 전부 처음부터 직접 작성했습니다.',
    ja: '<strong>Endstreet Studio</strong> は一人スタジオです——一人、そして一つのゲーム。Voxpolia はコードも物理も、あらゆる武器とビルのモデルも、すべてここで作られています。チームも既製エンジンもなし——すべて一から書きました。',
  },
  'studio.body2': {
    en: "It started with one obsession: destruction had to be real, not a canned animation. That's where the custom physics comes from — load-bearing walls, chain reactions, rubble counted voxel by voxel — and a game you launch straight in the browser. This is only the first district; a whole city lies ahead.",
    pl: 'Wszystko zaczęło się od jednej obsesji: destrukcja ma być prawdziwa, a nie gotową animacją. Stąd autorska fizyka — ściany nośne, reakcje łańcuchowe, gruz liczony woksel po wokselu — i gra, którą odpalasz wprost w przeglądarce. To dopiero pierwsza dzielnica; przede mną całe miasto.',
    zh: '一切始于一个执念：破坏必须是真实的，而不是预设动画。于是有了自研物理——承重墙、连锁反应、逐个体素计算的瓦砾——以及一款可直接在浏览器里运行的游戏。这只是第一个街区，前方是一整座城市。',
    es: 'Todo empezó con una obsesión: la destrucción tenía que ser real, no una animación enlatada. De ahí viene la física propia —muros de carga, reacciones en cadena, escombros calculados vóxel a vóxel— y un juego que abres directamente en el navegador. Esto es solo el primer distrito; por delante queda una ciudad entera.',
    hi: 'सब कुछ एक जुनून से शुरू हुआ: विध्वंस असली होना चाहिए, कोई बनी-बनाई एनिमेशन नहीं। इसीलिए यह अपनी भौतिकी है — भार वहन करने वाली दीवारें, श्रृंखला प्रतिक्रियाएँ, वॉक्सेल-दर-वॉक्सेल गिना गया मलबा — और एक गेम जिसे तुम सीधे ब्राउज़र में चलाते हो। यह तो बस पहला इलाक़ा है; आगे पूरा शहर बाक़ी है।',
    ar: 'بدأ كل شيء بهوسٍ واحد: أن يكون التدمير حقيقياً لا مجرد حركة معلّبة. من هنا جاءت الفيزياء الخاصة — جدران حاملة، وتفاعلات متسلسلة، وركام يُحسب فوكسل تلو الآخر — ولعبة تشغّلها مباشرة في المتصفح. هذا مجرد الحيّ الأول؛ وأمامي مدينة كاملة.',
    fr: "Tout a commencé par une obsession : la destruction devait être réelle, pas une animation préfabriquée. D'où une physique maison — murs porteurs, réactions en chaîne, gravats comptés voxel par voxel — et un jeu que l'on lance directement dans le navigateur. Ce n'est que le premier quartier ; une ville entière m'attend.",
    pt: 'Tudo começou com uma obsessão: a destruição tinha que ser real, não uma animação enlatada. Daí vem a física própria — paredes de sustentação, reações em cadeia, escombros calculados voxel a voxel — e um jogo que você abre direto no navegador. Este é só o primeiro bairro; uma cidade inteira está por vir.',
    ko: '모든 것은 하나의 집착에서 시작됐습니다: 파괴는 미리 만든 애니메이션이 아니라 진짜여야 한다. 그래서 직접 만든 물리 — 내력벽, 연쇄 반응, 복셀 단위로 계산되는 잔해 — 그리고 브라우저에서 바로 실행하는 게임이 탄생했습니다. 이건 첫 번째 구역일 뿐, 앞으로 도시 전체가 남아 있습니다.',
    ja: 'すべては一つの執念から始まりました。破壊は作り物のアニメではなく、本物でなければならない。だから独自の物理——耐力壁、連鎖反応、ボクセル単位で計算される瓦礫——そしてブラウザで直接動くゲームが生まれました。これはまだ最初の地区。この先には街まるごとが待っています。',
  },
  'studio.sign': { en: '— solo dev, Endstreet', pl: '— solo dev, Endstreet', zh: '— 独立开发者，Endstreet', es: '— dev en solitario, Endstreet', hi: '— सोलो डेव, Endstreet', ar: '— مطوّر منفرد، Endstreet', fr: '— dev solo, Endstreet', pt: '— dev solo, Endstreet', ko: '— 1인 개발, Endstreet', ja: '— ソロ開発, Endstreet' },

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

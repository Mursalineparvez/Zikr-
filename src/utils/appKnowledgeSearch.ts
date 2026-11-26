import { NavModule, ZikrLanguage } from '../types';

export interface KnowledgeMatch {
  id: string;
  moduleId: NavModule;
  moduleLabel: string;
  title: string;
  reference?: string;
  snippet: string;
  score: number;
}

export interface ActivePageContext {
  moduleId: NavModule;
  pageTitle: string;
  visibleText: string;
}

interface IndexedEntry {
  id: string;
  moduleId: NavModule;
  moduleLabel: string;
  title: string;
  reference?: string;
  snippet: string;
  searchTitle: string;
  searchBody: string;
}

const MODULE_LABELS_BN: Record<string, string> = {
  zikir_counter: 'জিকির কাউন্টার',
  quran: 'আল-কুরআন ও বিষয়ভিত্তিক আয়াত',
  salat_time: 'নামাজের সময়সূচি',
  namaj: 'নামাজ শিক্ষা ও নিয়ম',
  aamal_tracker: 'আমল ট্র্যাকার',
  other: 'ইসলামিক লাইব্রেরি',
  dua: 'মাসনুন দোয়া ও হিসনুল মুসলিম',
  hadith: 'সহিহ হাদিস সংকলন',
  kitab: 'ইসলামিক কিতাব',
  tablig: 'দাওয়াত ও তাবলিগ (৬ সিফত)',
  prophets_25: 'নবী ও রাসূল (জীবনী ও বংশলতিকা)',
  allah_names: 'আল্লাহর ৯৯ নাম',
  hajj_checklist: 'হজ ও ওমরাহ পূর্ণাঙ্গ গাইড',
  umrah_guide: 'ওমরাহ গাইড',
  hajj_route_map: 'হজের রুট ম্যাপ',
  hajj_essentials: 'হজের প্রয়োজনীয় আমল',
  history_timeline: 'ইসলামের ইতিহাসের পাতা',
  hayatus_sahaba: 'হায়াতুস সাহাবা (২৬৬+ সাহাবি)',
  islamic_history_wars: 'ইসলামের ইতিহাসের যুদ্ধসমূহ',
  seerat_un_nabi: 'সীরাতুন নবী ﷺ (১–৬৩ বছর ও ইন্তেকাল)',
  araber_gotro: 'আরবের গোত্র ও ব্যক্তিত্ব',
  nobi_24_hours: 'নবীজির ২৪ ঘণ্টা সুন্নাহ রুটিন',
  daily_sunnah: 'দৈনন্দিন সুন্নাহ (৩৮ অধ্যায় ও ৩৪২ সুন্নাহ)',
};

const MODULE_LABELS_EN: Record<string, string> = {
  zikir_counter: 'Zikr Counter',
  quran: 'Al-Quran & Quran Topics',
  salat_time: 'Salat Times',
  namaj: 'Namaz Guide & Rules',
  aamal_tracker: 'Aamal Tracker',
  other: 'Islamic Library Hub',
  dua: 'Authentic Duas & Hisnul Muslim',
  hadith: 'Authentic Hadith Collection',
  kitab: 'Islamic Kitabs',
  tablig: 'Dawat & Tablig (6 Sifat)',
  prophets_25: 'Prophets & Messengers (Biographies & Tree)',
  allah_names: '99 Names of Allah',
  hajj_checklist: 'Hajj & Umrah Complete Guide',
  umrah_guide: 'Umrah Guide',
  hajj_route_map: 'Hajj Route Map',
  hajj_essentials: 'Hajj Essentials',
  history_timeline: 'Islamic History Timeline',
  hayatus_sahaba: 'Hayatus Sahaba (266+ Companions)',
  islamic_history_wars: 'Islamic History Battles',
  seerat_un_nabi: 'Seerat-un-Nabi ﷺ',
  araber_gotro: 'Arab Tribes & Personalities',
  nobi_24_hours: "Prophet's 24 Hours Sunnah Routine",
  daily_sunnah: 'Daily Sunnah (38 Categories & 342 Sunnahs)',
};

export function getModuleDisplayLabel(moduleId: string, lang: ZikrLanguage = 'bn'): string {
  if (lang === 'bn') {
    return MODULE_LABELS_BN[moduleId] || MODULE_LABELS_EN[moduleId] || 'Zikr+ ইসলামিক অ্যাপ';
  }
  return MODULE_LABELS_EN[moduleId] || MODULE_LABELS_BN[moduleId] || 'Zikr+ App';
}

const PHONETIC_EXPANSIONS: Array<[RegExp, string[]]> = [
  [/\b(namaz|namaj|salat|salah|prayer|pray)\b|নামাজ|সালাত/gi, ['নামাজ', 'সালাত', 'ওয়াক্ত', 'রাকাত', 'ফজর', 'যোহর', 'আসর', 'মাগরিব', 'এশা', 'namaz', 'salat']],
  [/(নিষিদ্ধ|মাকরূহ|মাকরুহ|হারাম|যাওয়াল|সূর্যোদয়|সূর্যাস্ত|দ্বিপ্রহর)|\b(prohibited|forbidden|makruh|zawal)\b/gi, ['নিষিদ্ধ', 'মাকরূহ', 'মাকরূহে তাহরীমী', 'হারাম', 'সূর্যোদয়', 'সূর্যাস্ত', 'যাওয়াল', 'দ্বিপ্রহর', 'prohibited', 'makruh']],
  [/\b(tahajjud|ishraq|duha|chast|witr|qaza)\b|তাহাজ্জুদ|ইশরাক|চাশত|দুহা|বিতর|কাজা/gi, ['তাহাজ্জুদ', 'ইশরাক', 'চাশত', 'দুহা', 'বিতর', 'কাজা', 'নফল', 'tahajjud']],
  [/\b(wudu|wuzu|oju|ghusl|tayammum)\b|ওযু|অজু|গোসল|তায়াম্মুম/gi, ['ওযু', 'অজু', 'পবিত্রতা', 'গোসল', 'তায়াম্মুম', 'wudu']],
  [/\b(dua|doya|doaa|supplication)\b/gi, ['দোয়া', 'দোয়া', 'মুনাজাত', 'হিসনুল', 'dua']],
  [/\b(hadith|hadis|bukhari|muslim|tirmidhi)\b/gi, ['হাদিস', 'হাদীস', 'বুখারী', 'মুসলিম', 'তিরমিযী', 'hadith']],
  [/\b(quran|koran|surah|sura|ayat|ayah)\b/gi, ['কুরআন', 'সূরা', 'আয়াত', 'আয়াত', 'surah', 'quran']],
  [/\b(nobi|nabi|prophet|rasul|rasool)\b/gi, ['নবী', 'রাসূল', 'রাসুল', 'আলাইহিস সালাম', 'prophet']],
  [/\b(muhammad|mohammad|rasulullah|nabiji|nobiji)\b/gi, ['মুহাম্মদ', 'মুহাম্মাদ', 'রাসূলুল্লাহ', 'নবীজি', 'সীরাত', 'muhammad']],
  [/\b(adam)\b/gi, ['আদম', 'adam']],
  [/\b(ibrahim|ibraheem|abraham)\b/gi, ['ইবরাহীম', 'ইব্রাহিম', 'ibrahim']],
  [/\b(musa|mosa|moses)\b/gi, ['মুসা', 'মূসা', 'musa']],
  [/\b(isa|eesa|jesus)\b/gi, ['ঈসা', 'isa']],
  [/\b(nuh|nooh|noah)\b/gi, ['নূহ', 'নুহ', 'nuh']],
  [/\b(yusuf|yousuf|joseph)\b/gi, ['ইউসুফ', 'yusuf']],
  [/\b(yunus|younus|jonah)\b/gi, ['ইউনুস', 'yunus']],
  [/\b(ayyub|ayub|job)\b/gi, ['আইয়ুব', 'আইয়ুব', 'ayyub']],
  [/\b(sulaiman|sulayman|solomon)\b/gi, ['সুলাইমান', 'সুলায়মান', 'sulaiman']],
  [/\b(dawud|daud|david)\b/gi, ['দাউদ', 'dawud']],
  [/\b(ismail|ismael|ishmael)\b/gi, ['ইসমাঈল', 'ইসমাইল', 'ismail']],
  [/\b(yaqub|yakub|jacob)\b/gi, ['ইয়াকুব', 'ইয়াকুব', 'yaqub']],
  [/\b(zakariya|zakaria)\b/gi, ['যাকারিয়া', 'জাকারিয়া', 'zakariya']],
  [/\b(yahya)\b/gi, ['ইয়াহইয়া', 'ইয়াহিয়া', 'yahya']],
  [/\b(sahaba|sahabi|ashab)\b/gi, ['সাহাবি', 'সাহাবা', 'রাযিয়াল্লাহু', 'sahaba']],
  [/\b(abu\s*bakr|abubokor|abubakar|siddiq)\b/gi, ['আবু বকর', 'সিদ্দিক', 'abu bakr']],
  [/\b(omar|umar|faruq)\b/gi, ['উমর', 'ওমর', 'ফারুক', 'umar']],
  [/\b(usman|uthman|othman)\b/gi, ['উসমান', 'ওসমান', 'উছমান', 'uthman']],
  [/\b(ali)\b/gi, ['আলী', 'আলি', 'ali']],
  [/\b(khadija|khadijah)\b/gi, ['খাদিজা', 'খাদীজা', 'khadijah']],
  [/\b(aisha|ayesha)\b/gi, ['আয়েশা', 'আয়েশা', 'aisha']],
  [/\b(fatima|fatema)\b/gi, ['ফাতিমা', 'ফাতেমা', 'fatima']],
  [/\b(bilal|belal)\b/gi, ['বিলাল', 'বেলাল', 'bilal']],
  [/\b(khalid)\b/gi, ['খালিদ', 'খালিদ বিন ওয়ালিদ', 'khalid']],
  [/\b(seerat|sirat|seerah|wafat|intekal)\b/gi, ['সীরাত', 'সিরাত', 'ইন্তেকাল', 'হিজরত', 'বিলাদত', 'seerat']],
  [/\b(badr|badar|uhud|ohud|khandaq|khaybar|tabuk|hunayn|karbala)\b/gi, ['বদর', 'উহুদ', 'খন্দক', 'খায়বার', 'তাবুক', 'হুনাইন', 'কারবালা', 'যুদ্ধ']],
  [/\b(tablig|tabligh|dawat|dawah|sifat)\b/gi, ['তাবলিগ', 'দাওয়াত', 'সিফত', 'কালেমা', 'ইকরাম', 'ইখলাস', 'চিল্লা', 'গাশত']],
  [/\b(hajj|haj|umrah|omrah|tawaf|sai|miqat|ihram|arafat|mina|muzdalifah)\b/gi, ['হজ', 'হজ্জ', 'ওমরাহ', 'তাওয়াফ', 'সাঈ', 'মিকাত', 'ইহরাম', 'আরাফাত', 'মিনা', 'মুজদালিফা']],
  [/\b(allah|asmaul|husna|99)\b/gi, ['আল্লাহ', '৯৯ নাম', 'আসমাউল হুসনা', 'রহমান', 'রাহীম', 'allah']],
  [/\b(gotro|tribe|clan|quraish|kuraish|hashim|umayya)\b/gi, ['গোত্র', 'কুরাইশ', 'হাশিম', 'উমাইয়া', 'আনসার', 'আওস', 'খাজরাজ']],
  [/\b(ayatul\s*kursi|kursi)\b/gi, ['আয়াতুল কুরসি', 'আয়াতুল কুরসী', 'কুরসি']],
  [/\b(roja|roza|fasting|ramadan|ramzan)\b/gi, ['রোজা', 'রোযা', 'রমজান', 'সিয়াম', 'সিয়াম']],
  [/\b(zakat|jakat|sadakah|sadaqah)\b/gi, ['যাকাত', 'সদকা', 'দান']],
  [/\b(zikir|zikr|dhikr|tasbih)\b/gi, ['জিকির', 'তাসবিহ', 'সুবহানাল্লাহ', 'আলহামদুলিল্লাহ', 'আল্লাহু আকবার', 'ইস্তিগফার']],
];

const STOP_WORDS = new Set([
  'the', 'is', 'are', 'was', 'were', 'in', 'on', 'at', 'of', 'for', 'to', 'a', 'an', 'and', 'or', 'what', 'who', 'where', 'when', 'how', 'why', 'about', 'tell', 'me', 'find', 'search', 'please', 'this', 'page', 'app',
  'কি', 'কী', 'কে', 'কোথায়', 'কোথায়', 'কবে', 'কেন', 'কিভাবে', 'কীভাবে', 'সম্পর্কে', 'বিষয়ে', 'বিষয়ে', 'নিয়ে', 'নিয়ে', 'এই', 'পেজ', 'পেজে', 'অ্যাপ', 'অ্যাপে', 'থেকে', 'খুঁজে', 'দাও', 'দিন', 'বলো', 'বলুন', 'জানতে', 'চাই', 'কোন', 'কোনো', 'কোনগুলো', 'কোনগুলা', 'কোনটি', 'কোনটা', 'কারা', 'কাদের', 'কাকে', 'কয়টি', 'কয়টি', 'কত', 'কতগুলো', 'দেখাও', 'বিস্তারিত', 'সংক্ষেপে', 'হলো', 'হয়', 'হয়', 'হবে', 'পারে', 'যায়', 'যায়', 'করা', 'করে', 'আছে', 'নাকি', 'আর', 'এবং', 'বা', 'ও', 'এর', 'তে',
  'ki', 'ke', 'kothay', 'kobe', 'keno', 'kivabe', 'somporke', 'niye', 'ei', 'page', 'theke', 'khuje', 'dao', 'den', 'bolo', 'bolun', 'ase', 'ache', 'ar', 'er', 'konti', 'kongulo',
]);

const BENGALI_SUFFIXES = [
  'গুলোর', 'গুলাের', 'গুলো', 'গুলা', 'সমূহের', 'সমূহ', 'দেরকে', 'দের', 'গণের', 'গণ', 'ভাবে', 'ভাবেই', 'য়ের', 'ের', 'তেও', 'তে', 'কে', 'রা', 'য়', 'ে', 'র',
];

function stemBanglaToken(tok: string): string {
  if (!/[\u0980-\u09FF]/.test(tok) || tok.length < 4) return tok;
  for (const suffix of BENGALI_SUFFIXES) {
    if (tok.endsWith(suffix) && tok.length - suffix.length >= 3) {
      return tok.slice(0, tok.length - suffix.length);
    }
  }
  return tok;
}

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .replace(/[\u064B-\u065F\u0670]/g, '') // strip Arabic diacritics for easier match
    .replace(/[.,!?;:'"()[\]{}<>|/\\~`@#$%^&*_+=।—–-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function buildSearchTokens(query: string): { rawNormalized: string; tokens: string[]; expandedTokens: string[] } {
  const rawNormalized = normalizeText(query);
  const rawTokens = rawNormalized
    .split(' ')
    .map((t) => t.trim())
    .filter((t) => t.length >= 2 && !STOP_WORDS.has(t));

  const primaryTokenSet = new Set<string>();
  for (const tok of rawTokens) {
    primaryTokenSet.add(tok);
    const stem = stemBanglaToken(tok);
    if (stem && stem.length >= 2 && !STOP_WORDS.has(stem)) {
      primaryTokenSet.add(stem);
    }
  }

  const expandedSet = new Set<string>(primaryTokenSet);

  for (const [regex, synonyms] of PHONETIC_EXPANSIONS) {
    regex.lastIndex = 0;
    if (regex.test(query)) {
      for (const syn of synonyms) {
        const normSyn = normalizeText(syn);
        if (normSyn) expandedSet.add(normSyn);
      }
    }
  }

  // If all tokens were stopwords (very short query), keep raw tokens
  if (expandedSet.size === 0 && rawNormalized.length >= 2) {
    rawNormalized.split(' ').forEach((t) => {
      if (t.length >= 2) expandedSet.add(t);
    });
  }

  const primaryTokens = Array.from(primaryTokenSet);
  return {
    rawNormalized,
    tokens: primaryTokens.length > 0 ? primaryTokens : [rawNormalized].filter(Boolean),
    expandedTokens: Array.from(expandedSet),
  };
}

function clampSnippet(text: string, maxLen = 780): string {
  const cleaned = text.replace(/\s+/g, ' ').trim();
  if (cleaned.length <= maxLen) return cleaned;
  return cleaned.slice(0, maxLen - 1).trimEnd() + '…';
}

function joinNonEmpty(parts: Array<string | undefined | null>, sep = ' | '): string {
  return parts
    .map((p) => (typeof p === 'string' ? p.trim() : ''))
    .filter(Boolean)
    .join(sep);
}

/**
 * Extracts currently rendered text from either an active sub-page modal overlay or <main>.
 * Explicitly skips the AI Assistant modal itself, header, nav, SVGs, scripts, and styles.
 */
export function extractActivePageContext(
  activeModule: NavModule,
  selectedLanguage: ZikrLanguage = 'bn'
): ActivePageContext {
  if (typeof document === 'undefined') {
    return {
      moduleId: activeModule,
      pageTitle: getModuleDisplayLabel(activeModule, selectedLanguage),
      visibleText: '',
    };
  }

  const fastExtractText = (root: Element): string => {
    try {
      const raw = (root.textContent || '').replace(/\s+/g, ' ').trim();
      return raw.slice(0, 3000);
    } catch {
      return '';
    }
  };

  const chunks: string[] = [];
  let detectedHeading = '';

  // Check foreground modal quickly without layout-forcing getBoundingClientRect loops unless needed
  const possibleModals = document.querySelectorAll('div.fixed.inset-0');
  for (let i = possibleModals.length - 1; i >= 0; i--) {
    const modal = possibleModals[i];
    if (modal.closest('[data-assistant-modal="true"]') || modal.hasAttribute('data-assistant-modal')) {
      continue;
    }
    const text = fastExtractText(modal);
    if (text.length > 40) {
      chunks.push(text.slice(0, 2200));
      const h = modal.querySelector('h1, h2, h3');
      if (h?.textContent) detectedHeading = h.textContent.trim().slice(0, 120);
      break;
    }
  }

  // Extract main workspace content
  const mainEl = document.querySelector('main');
  if (mainEl) {
    const mainText = fastExtractText(mainEl);
    if (mainText) {
      chunks.push(mainText.slice(0, chunks.length > 0 ? 1200 : 2400));
      if (!detectedHeading) {
        const h = mainEl.querySelector('h1, h2');
        if (h?.textContent) detectedHeading = h.textContent.trim().slice(0, 120);
      }
    }
  }

  const baseLabel = getModuleDisplayLabel(activeModule, selectedLanguage);
  const pageTitle =
    detectedHeading && !detectedHeading.toLowerCase().includes('zikr+')
      ? `${baseLabel} — ${detectedHeading}`
      : baseLabel;

  return {
    moduleId: activeModule,
    pageTitle: pageTitle.slice(0, 200),
    visibleText: chunks.join('\n\n---\n\n').slice(0, 2600),
  };
}

let cachedIndexPromise: Promise<IndexedEntry[]> | null = null;

async function buildKnowledgeIndex(): Promise<IndexedEntry[]> {
  const entries: IndexedEntry[] = [];

  const pushEntry = (
    id: string,
    moduleId: NavModule,
    title: string,
    snippet: string,
    reference?: string,
    extraKeywords?: string
  ) => {
    const cleanTitle = title.replace(/\s+/g, ' ').trim();
    const cleanSnippet = clampSnippet(snippet, 900);
    if (!cleanTitle || !cleanSnippet) return;
    entries.push({
      id,
      moduleId,
      moduleLabel: getModuleDisplayLabel(moduleId, 'bn'),
      title: cleanTitle,
      reference: reference ? reference.trim().slice(0, 200) : undefined,
      snippet: cleanSnippet,
      searchTitle: normalizeText(`${cleanTitle} ${reference || ''} ${extraKeywords || ''}`),
      searchBody: normalizeText(`${cleanTitle} ${cleanSnippet} ${reference || ''} ${extraKeywords || ''}`),
    });
  };

  // Live saved localStorage user items (counters, highlights, notes)
  try {
    const rawZikrs = localStorage.getItem('noor_zikr_items');
    if (rawZikrs) {
      const parsed = JSON.parse(rawZikrs);
      if (Array.isArray(parsed)) {
        parsed.forEach((z: any, idx: number) => {
          pushEntry(
            `zikr_${z.id || idx}`,
            'zikir_counter',
            `${z.name || ''} ${z.pronunciationBn || ''}`,
            joinNonEmpty([
              z.arabic,
              z.transliteration,
              z.meaningBn || z.meaning,
              `লক্ষ্যমাত্রা: ${z.target || 33}, বর্তমান গণনা: ${z.count || 0}`,
            ]),
            'Zikr+ কাউন্টার'
          );
        });
      }
    }
  } catch {}

  const tasks = await Promise.allSettled([
    // 1. 25 Prophets & Messengers
    import('../data/prophets25Data').then((m) => {
      if (m.PROPHETS_25_INTRO_OVERVIEW) {
        pushEntry(
          'prophets25_overview',
          'prophets_25',
          m.PROPHETS_25_INTRO_OVERVIEW.titleBn || 'কুরআনে বর্ণিত ২৫ জন নবী ও রাসূল',
          joinNonEmpty([
            m.PROPHETS_25_INTRO_OVERVIEW.subtitleBn,
            m.PROPHETS_25_INTRO_OVERVIEW.verseAr,
            m.PROPHETS_25_INTRO_OVERVIEW.verseTransBn,
          ])
        );
      }
      if (Array.isArray(m.PROPHETS_25_INTRO_FACTS)) {
        m.PROPHETS_25_INTRO_FACTS.forEach((f, idx) => {
          pushEntry(
            `prophets25_fact_${idx}`,
            'prophets_25',
            `${f.titleBn} (${f.valueBn})`,
            joinNonEmpty([f.detailBn, f.detailEn]),
            f.refBn
          );
        });
      }
      (m.PROPHETS_25_DATABASE || []).forEach((p) => {
        pushEntry(
          `prophet_${p.id}`,
          'prophets_25',
          `${p.rank}. ${p.nameBn} (${p.nameEn}) — ${p.titleBn}`,
          joinNonEmpty([
            p.summaryBn,
            p.biographyBn?.slice(0, 420),
            p.scriptureBn ? `কিতাব/সহীফা: ${p.scriptureBn}` : '',
            p.nationRegionBn ? `জাতি ও অঞ্চল: ${p.nationRegionBn}` : '',
            p.miraclesBn?.length ? `মুজিযা: ${p.miraclesBn.slice(0, 3).join('; ')}` : '',
            p.dua ? `দোয়া: ${p.dua.arabic} — ${p.dua.translationBn}` : '',
            p.lessonsBn?.length ? `শিক্ষা: ${p.lessonsBn.slice(0, 2).join('; ')}` : '',
          ]),
          joinNonEmpty(p.referencesBn?.slice(0, 2) || [p.quranMentionsNoteBn]),
          `${p.lineageBn} ${p.keySurahsBn?.join(' ') || ''}`
        );
      });
    }),

    // 2. Allah 99 Names
    import('../data/allahNamesData').then((m) => {
      (m.ALLAH_99_NAMES || []).forEach((n) => {
        pushEntry(
          `allah_name_${n.id}`,
          'allah_names',
          `${n.id}. ${n.nameBn} (${n.transliteration}) — ${n.arabic}`,
          joinNonEmpty([
            `অর্থ: ${n.meaningBn} (${n.meaningEn})`,
            `ফজিলত ও আমল: ${n.benefitBn}`,
          ]),
          'আসমাউল হুসনা'
        );
      });
    }),

    // 3. Authentic Duas (limit very gracefully across all 200+ duas)
    import('../utils/duasData').then((m) => {
      (m.AUTHENTIC_DUAS || []).forEach((d) => {
        const bnTitle = d.translations?.bn?.title || d.title;
        const bnTrans = d.translations?.bn?.translation || d.translation;
        const bnVirtue = d.translations?.bn?.virtue || d.virtue;
        const bnTiming = d.translations?.bn?.timing || d.timing;
        const bnBenefits = d.translations?.bn?.benefits || d.benefits;
        pushEntry(
          `dua_${d.id}`,
          'dua',
          bnTitle,
          joinNonEmpty([
            bnTiming ? `সময়/অবস্থা: ${bnTiming}` : '',
            d.arabic,
            d.transliteration,
            bnTrans,
            bnVirtue ? `ফজিলত: ${bnVirtue}` : '',
            bnBenefits?.length ? `উপকারিতা: ${bnBenefits.slice(0, 2).join('; ')}` : '',
          ]),
          d.referenceBn || d.reference,
          `${d.title} ${d.category}`
        );
      });
    }),

    // 4. Hadith Books & Collection (All 17 Canonical Books + Curated Selections)
    import('../data/hadisCatalog').then((cat) => {
      (cat.HADIS_LIBRARY_BOOKS || []).forEach((b) => {
        pushEntry(
          `hadis_book_${b.id}`,
          'hadith',
          `${b.bnName} (${b.enName})`,
          `${b.compilerBn} — ${b.shortDescBn}। মোট অধ্যায়: ${b.chaptersCount}, মোট হাদিস: ${b.hadithCount}`,
          `${b.arabicName} · ${b.compilerEn}`
        );
      });
    }),
    import('../utils/hadithData').then((m) => {
      (m.HADITH_BOOKS_DATA || []).forEach((b) => {
        pushEntry(
          `hadith_book_${b.id}`,
          'hadith',
          `${b.titles.bn} (${b.titles.en})`,
          `লেখক: ${b.author}, মোট অধ্যায়: ${b.chaptersCount}, হাদিস সংখ্যা: ${b.hadithCount}`,
          b.arabicName
        );
      });
      (m.AUTHENTIC_HADITHS || []).forEach((h) => {
        const bnTrans = h.translations?.bn?.translation || h.englishTranslation;
        const bnChapter = h.translations?.bn?.chapter || h.chapter;
        const bnTopic = h.translations?.bn?.topic || h.topic;
        const bnRefl = h.translations?.bn?.reflection || h.reflection;
        pushEntry(
          `hadith_${h.id}`,
          'hadith',
          `${bnTopic} — ${bnChapter} (${h.book} #${h.hadithNumber})`,
          joinNonEmpty([h.arabicText, bnTrans, h.englishTranslation, bnRefl]),
          `${h.book} #${h.hadithNumber} (${h.grade}) — বর্ণনাকারী: ${h.translations?.bn?.narrator || h.narrator}`
        );
      });
    }),

    // 5. Kitab Collection
    import('../utils/kitabData').then((m) => {
      (m.ISLAMIC_KITABS || []).forEach((k) => {
        pushEntry(
          `kitab_${k.id}`,
          'kitab',
          `${k.title} — ${k.author}`,
          k.description,
          k.category
        );
        (k.chapters || []).forEach((ch) => {
          pushEntry(
            `kitab_${k.id}_${ch.id}`,
            'kitab',
            `${k.title}: ${ch.title}`,
            joinNonEmpty([ch.content, ...(ch.keyTakeaways || [])]),
            ch.arabicTitle || k.title
          );
        });
      });
    }),

    // 6. Seerat-un-Nabi (Ages 1-63 + Last 10 Days + Final 40 Hours + Badr 77)
    import('../data/seeratData').then((m) => {
      (m.SEERAT_PHASES || []).forEach((ph) => {
        pushEntry(
          `seerat_phase_${ph.key}`,
          'seerat_un_nabi',
          `সীরাত পর্ব: ${ph.titleBn} (${ph.ageRangeBn || ph.ageRange})`,
          joinNonEmpty([ph.descBn, ph.descEn])
        );
      });
      (m.SEERAT_DATABASE || []).forEach((item) => {
        const qRefStr = item.quranRef
          ? `${item.quranRef.surah} ${item.quranRef.ayah}`
          : '';
        const hRefStr = item.hadithRef
          ? `${item.hadithRef.source}${item.hadithRef.hadithNo ? ` #${item.hadithRef.hadithNo}` : ''}`
          : '';
        pushEntry(
          `seerat_age_${item.age}`,
          'seerat_un_nabi',
          `বয়স ${item.age} বছর (${item.yearCE} খ্রি. / ${item.yearHijri}): ${item.titleBn}`,
          joinNonEmpty([
            `স্থান: ${item.locationBn}`,
            item.highlightsBn?.join('; '),
            item.historicalNarrativeBn?.slice(0, 320),
            item.quranRef?.meaningBn,
            item.hadithRef?.textBn,
            item.lessonsBn?.slice(0, 2).join('; '),
          ]),
          joinNonEmpty([qRefStr, hRefStr]),
          item.titleEn
        );
      });
    }),

    import('../data/prophet40HoursData').then((m) => {
      (m.PASSING_40_EVENTS || []).forEach((ev) => {
        pushEntry(
          `seerat_40h_${ev.no}`,
          'seerat_un_nabi',
          `নবীজির ﷺ ইন্তেকালের ৪০ ঘণ্টা (ঘটনা ${ev.no}): ${ev.titleBn}`,
          joinNonEmpty([ev.timeContextBn, ev.pointsBn?.join('; '), ev.detailedNarrativeBn?.slice(0, 380), ev.reflectionBn]),
          ev.sourceBn,
          ev.titleEn
        );
      });
    }),

    import('../data/prophetLast10DaysData').then((m) => {
      (m.LAST_10_DAYS_EVENTS || []).forEach((ev) => {
        pushEntry(
          `seerat_10d_${ev.no}`,
          'seerat_un_nabi',
          `নবীজির ﷺ জীবনের শেষ ১০ দিন (ঘটনা ${ev.no}): ${ev.titleBn}`,
          joinNonEmpty([ev.timeContextBn, ev.locationBn, ev.pointsBn?.join('; '), ev.detailedNarrativeBn?.slice(0, 380)]),
          ev.sourceBn,
          ev.titleEn
        );
      });
    }),

    import('../data/badr77EventsData').then((m) => {
      (m.BADR_77_EVENTS || []).forEach((ev) => {
        pushEntry(
          `badr_77_${ev.eventNo}`,
          'seerat_un_nabi',
          `বদরের প্রান্তরে ৭৭টি গুরুত্বপূর্ণ ঘটনা (#${ev.eventNo}): ${ev.titleBn}`,
          joinNonEmpty([ev.phaseTagBn, ev.subtitleBn, ev.pointsBn?.join('; ')]),
          ev.sourceBn,
          ev.titleEn
        );
      });
    }),

    // 7. Hayatus Sahaba (266+ Companions)
    import('../data/sahabaData').then((m) => {
      (m.SAHABA_DATABASE || []).forEach((s) => {
        pushEntry(
          `sahaba_${s.id}`,
          'hayatus_sahaba',
          `${s.nameBn}${s.nameEn ? ` (${s.nameEn})` : ''} — ${s.titleBn}`,
          joinNonEmpty([
            s.categoryBn,
            s.birthAndDeathBn,
            s.summaryBn,
            s.islamAcceptanceBn?.slice(0, 260),
            s.keyVirtuesBn?.slice(0, 3).join('; '),
            s.deathOrMartyrdomBn?.slice(0, 220),
          ]),
          joinNonEmpty([
            s.hadithPraiseBn?.[0]?.source,
            ...(s.referencesBn?.slice(0, 2) || []),
          ]),
          `${s.nameAr} ${s.detailedBiographyBn?.slice(0, 260) || ''}`
        );
      });
    }),

    // 8. Nobi 24 Hours Routine
    import('../data/nobi24HoursData').then((m) => {
      (m.NOBI_24_TIME_SLOTS || []).forEach((slot) => {
        pushEntry(
          `nobi24_slot_${slot.id}`,
          'nobi_24_hours',
          `${slot.timeSpanBn}: ${slot.titleBn}`,
          joinNonEmpty([slot.summaryBn, slot.actionsBn?.slice(0, 4).join('; '), slot.hadithBn]),
          slot.hadithRef,
          slot.titleEn
        );
      });
      (m.NOBI_24_CHAPTERS || []).forEach((ch) => {
        pushEntry(
          `nobi24_ch_${ch.id}`,
          'nobi_24_hours',
          `নবীজির ২৪ ঘণ্টা অধ্যায়: ${ch.titleBn}`,
          joinNonEmpty([ch.subtitleBn, ch.contentBn?.slice(0, 3).join(' ')]),
          ch.quranAyat?.surah || ch.hadiths?.[0]?.reference,
          ch.titleEn
        );
      });
      (m.NOBI_24_DUAS || []).forEach((d) => {
        pushEntry(
          `nobi24_dua_${d.id}`,
          'nobi_24_hours',
          `নবীজির ২৪ ঘণ্টার দোয়া: ${d.titleBn}`,
          joinNonEmpty([d.timingBn, d.arabic, d.pronunciationBn, d.meaningBn, d.benefitBn]),
          d.reference,
          d.titleEn
        );
      });
    }),

    // 8.1 Nobi 12-Month Prophetic Calendar & Weekly/Monthly Sunnahs
    import('../data/nobi12MonthsData').then((m) => {
      (m.PROPHETIC_12_MONTHS || []).forEach((mo) => {
        pushEntry(
          `nobi12_month_${mo.id}`,
          'nobi_24_hours',
          `নবীজির ১২ মাসের আমল (${mo.order}/১২): ${mo.nameBn} (${mo.approxStartBn})`,
          joinNonEmpty([
            mo.coreAmalBn,
            mo.headlineBn,
            mo.narratorsBn ? `বর্ণনাকারী: ${mo.narratorsBn}` : '',
            mo.ayyamulBeedhBn ? `আইয়ামে বীয: ${mo.ayyamulBeedhBn}` : '',
            mo.quranRef ? `${mo.quranRef.surahBn}: ${mo.quranRef.meaningBn}` : '',
            mo.topics
              .map((t) =>
                t.referencedPoints?.length
                  ? `${t.titleBn}: ${t.referencedPoints.map((rp) => `${rp.textBn} (${rp.reference})`).join(' ')}`
                  : `${t.titleBn}: ${t.pointsBn.join(' ')} (${t.reference})`
              )
              .join(' | '),
            mo.authenticityCautionBn ? `${mo.authenticityCautionBn.title}: ${mo.authenticityCautionBn.points.join(' ')}` : '',
          ]),
          mo.primarySourcesBn || mo.topics[0]?.reference || 'সহিহ বুখারি ও মুসলিম',
          `${mo.nameEn} ${mo.coreAmalEn} ${mo.narratorsEn}`
        );
      });
      (m.WEEKLY_PROPHETIC_AMAL || []).forEach((w) => {
        pushEntry(
          `nobi12_week_${w.id}`,
          'nobi_24_hours',
          `সাপ্তাহিক সুন্নাহ (${w.dayBn}): ${w.shortTagBn}`,
          joinNonEmpty([
            w.summaryBn,
            w.narratorsBn ? `বর্ণনাকারী: ${w.narratorsBn}` : '',
            w.sections.map((s) => `${s.titleBn}: ${s.pointsBn.join(' ')} (${s.reference})`).join(' | '),
          ]),
          w.sections[0]?.reference || 'সহিহ বুখারি ও মুসলিম',
          `${w.dayEn} ${w.shortTagEn}`
        );
      });
      (m.MONTHLY_GENERAL_RULES || []).forEach((r) => {
        pushEntry(
          `nobi12_rule_${r.id}`,
          'nobi_24_hours',
          `মাসিক সুন্নাহ: ${r.titleBn}`,
          joinNonEmpty([r.timingBn, r.pointsBn.join(' '), r.dua?.arabic, r.dua?.pronunciationBn, r.dua?.meaningBn]),
          r.reference,
          r.titleEn
        );
      });
      (m.HADITH_BOOK_REFERENCE_LEDGER || []).forEach((refEntry, idx) => {
        pushEntry(
          `nobi12_ledger_${idx}`,
          'nobi_24_hours',
          `নবীজির ১২ মাসের আমল — রেফারেন্স সূচি (${refEntry.bookBn})`,
          joinNonEmpty([refEntry.scopeBn, `হাদিস/আয়াত নম্বর: ${refEntry.numbersBn}`]),
          refEntry.bookBn,
          `${refEntry.bookEn} ${refEntry.numbersEn}`
        );
      });
    }),

    // 9. Tablig Chapters
    import('../data/tabligData').then((m) => {
      (m.TABLIG_COMPLETE_CHAPTERS || []).forEach((ch) => {
        pushEntry(
          `tablig_ch_${ch.id}`,
          'tablig',
          `${ch.numberBn}. ${ch.title}`,
          joinNonEmpty([ch.subtitle, ch.sections?.map((s) => s.heading).slice(0, 6).join(', ')]),
          'দাওয়াত ও তাবলিগ'
        );
        (ch.sections || []).forEach((sec, sIdx) => {
          pushEntry(
            `tablig_${ch.id}_${sIdx}`,
            'tablig',
            `${ch.title} — ${sec.heading}`,
            sec.content?.slice(0, 780) || '',
            ch.title
          );
        });
      });
    }),

    // 10. Prayer / Namaz Details + Prohibited / Makruh Times
    import('../data/prayerDetailsData').then((m) => {
      // Dedicated consolidated entry for Prohibited & Makruh Prayer Times (shown in SalatTimeView & Namaz Details)
      pushEntry(
        'prayer_prohibited_times_summary',
        'salat_time',
        'নামাজের নিষিদ্ধ ও মাকরূহ সময়সমূহ (Prohibited Prayer Times)',
        joinNonEmpty([
          'ইসলামী শরীয়তে ৩টি সময়ে যেকোনো ফরজ, ওয়াজিব, সুন্নত, নফল নামাজ ও তিলাওয়াতের সিজদা করা সম্পূর্ণ নিষিদ্ধ (হারাম / মাকরূহে তাহরীমী):',
          '১. সূর্যোদয়ের সময়: সূর্য উদিত হওয়া শুরু থেকে আকাশে সম্পূর্ণ উঠে উজ্জ্বল হওয়া পর্যন্ত (প্রায় ১৫–২০ মিনিট)।',
          '২. ঠিক দ্বিপ্রহর বা যাওয়ালের সময়: সূর্য ঠিক মাথার ওপর খাড়া অবস্থান করার সময় (জোহরের ওয়াক্ত শুরুর পূর্বের প্রায় ১০–১৫ মিনিট)।',
          '৩. সূর্যাস্তের সময়: সূর্য হলুদ বা ম্লান বর্ণ ধারণ করা থেকে সম্পূর্ণ অস্ত যাওয়া পর্যন্ত (সূর্যাস্তের পূর্বের প্রায় ১৫–২০ মিনিট; তবে ঐ দিনের আসরের ফরজ বাকি থাকলে তা পড়া যাবে)।',
          'এছাড়া ২টি সময়ে কেবল নফল নামাজ পড়া মাকরূহ/নিষিদ্ধ: ফজরের ফরজ নামাজের পর থেকে সূর্যোদয় পর্যন্ত এবং আসরের ফরজ নামাজের পর থেকে সূর্যাস্ত পর্যন্ত।',
        ]),
        'সহীহ মুসলিম, হাদিস নং ৮২৫ ও ৮৩১; Zikr+ সালাত টাইম ও নামাজ গাইড',
        'নামাজ পড়া নিষিদ্ধ সময় হারাম ওয়াক্ত মাকরুহ সূর্যোদয় যাওয়াল সূর্যাস্ত makruh prohibited time'
      );

      Object.values(m.ALL_PRAYER_DETAILS || {}).forEach((pr) => {
        pushEntry(
          `prayer_${pr.id}`,
          'namaj',
          `${pr.nameBn} নামাজ (${pr.nameEn}) — ${pr.summaryRakatsBn}`,
          joinNonEmpty([
            pr.subTitleBn,
            `সময়: ${pr.celestialSignBn}`,
            pr.timingConditions?.mustahabTimeBn ? `মুস্তাহাব সময়: ${pr.timingConditions.mustahabTimeBn}` : '',
            pr.timingConditions?.makruhTimeBn ? `মাকরূহ/নিষিদ্ধ সময়: ${pr.timingConditions.makruhTimeBn}` : '',
            pr.timingConditions?.fiqhDetailsBn,
            pr.virtues?.descriptionBn,
            pr.rakatsBreakdown?.map((r) => `${r.typeBn}: ${r.rakats} রাকাত (${r.rulingBn})`).join('; '),
          ]),
          pr.hadiths?.[0] ? `${pr.hadiths[0].bookBn} #${pr.hadiths[0].hadithNumber}` : 'কুরআন ও সহিহ হাদিস',
          `${pr.nameAr} নিষিদ্ধ সময়`
        );
      });
    }),

    // 10b. Namaj Guide Steps, Prayer Duas & Nafl Prayers
    import('../utils/namajTranslations').then((m) => {
      (m.getLocalizedPrayers('bn') || []).forEach((p) => {
        pushEntry(
          `namaj_item_${p.id}`,
          'namaj',
          `${p.name} — মোট ${p.totalRakats} রাকাত (${p.breakdown})`,
          joinNonEmpty([p.timeRange, p.virtue, p.hadithText]),
          p.hadithRef || 'নামাজ শিক্ষা গাইড',
          'নামাজ রাকাত নিয়ম সময়'
        );
      });
      (m.getLocalizedPrayerSteps('bn') || []).forEach((st) => {
        pushEntry(
          `namaj_step_${st.stepNumber}`,
          'namaj',
          `নামাজ পড়ার ধাপ ${st.stepNumber}: ${st.title}`,
          joinNonEmpty([st.action, st.recitation, st.tip]),
          'নামাজ শিক্ষা গাইড'
        );
      });
      (m.getLocalizedEssentialDuas('bn') || []).forEach((d) => {
        pushEntry(
          `namaj_dua_${d.id}`,
          'namaj',
          `নামাজের দোয়া: ${d.title}`,
          joinNonEmpty([d.context, d.arabic, d.transliteration, d.meaning]),
          d.reference
        );
      });
      (m.getLocalizedNaflPrayers('bn') || []).forEach((n, idx) => {
        pushEntry(
          `namaj_nafl_${idx}`,
          'namaj',
          `${n.title} (${n.rakats})`,
          joinNonEmpty([`সময়: ${n.time}`, n.benefit, n.steps]),
          'নফল নামাজ গাইড'
        );
      });
    }),

    // 11. Hajj & Umrah
    import('../data/hajjUmrahData').then((m) => {
      (m.HAJJ_TYPES_INFO || []).forEach((ht: any, idx: number) => {
        pushEntry(
          `hajj_type_${idx}`,
          'hajj_checklist',
          `${ht.nameBn || ht.titleBn || ht.name || 'হজের প্রকার'}`,
          joinNonEmpty([ht.descBn || ht.descriptionBn || ht.summaryBn, ht.howToBn, ht.benefitsBn]),
          'হজ ও ওমরাহ গাইড'
        );
      });
      (m.UMRAH_STEPS || []).forEach((st) => {
        pushEntry(
          `umrah_${st.id}`,
          'hajj_checklist',
          `ওমরাহ ধাপ (${st.dayOrStageBn}): ${st.titleBn}`,
          joinNonEmpty([st.summaryBn, st.actionItems?.slice(0, 4).join('; ')]),
          'ওমরাহ গাইড',
          st.titleEn
        );
      });
      (m.HAJJ_DAYS_GUIDE || []).forEach((st) => {
        pushEntry(
          `hajj_day_${st.id}`,
          'hajj_checklist',
          `হজ (${st.dayOrStageBn}): ${st.titleBn}`,
          joinNonEmpty([st.summaryBn, st.actionItems?.slice(0, 4).join('; ')]),
          'হজ ৫ দিনের গাইড',
          st.titleEn
        );
      });
      (m.MIQAT_LOCATIONS || []).forEach((mq) => {
        pushEntry(
          `miqat_${mq.id}`,
          'hajj_checklist',
          `মিকাত: ${mq.name} (${mq.arabic})`,
          joinNonEmpty([`মক্কা থেকে দূরত্ব: ${mq.distanceFromMakkah}`, mq.designatedForBn, mq.airTravelNoteBn]),
          'মিকাত গাইড'
        );
      });
      (m.MADINAH_ZIYARAH_PLACES || []).forEach((zp) => {
        pushEntry(
          `ziyarah_${zp.id}`,
          'hajj_checklist',
          `মদিনা যিয়ারাহ: ${zp.name} (${zp.arabic})`,
          joinNonEmpty([zp.location, zp.virtueBn, zp.etiquettesBn?.slice(0, 3).join('; ')]),
          'মদিনা যিয়ারাহ'
        );
      });
      (m.IHRAM_PROHIBITIONS || []).forEach((pr: any, idx: number) => {
        pushEntry(
          `ihram_proh_${idx}`,
          'hajj_checklist',
          `ইহরামের নিষেধাজ্ঞা: ${pr.titleBn || pr.ruleBn || pr.nameBn || 'নিয়ম'}`,
          joinNonEmpty([pr.descBn || pr.detailBn || pr.penaltyBn || pr.fidyahBn]),
          'ইহরাম বিধি'
        );
      });
    }),

    // 12. Islamic History Wars
    import('../data/islamicWarsData').then((m) => {
      (m.ISLAMIC_WARS_DATA || []).forEach((w) => {
        pushEntry(
          `war_${w.id}`,
          'islamic_history_wars',
          `${w.orderNumber}. ${w.nameBn} (${w.nameEn}) — ${w.eraBn}`,
          joinNonEmpty([
            `তারিখ: ${w.dateBn}`,
            `স্থান: ${w.locationBn}`,
            `কারণ: ${w.causeBn}`,
            `মুসলিম সেনাপতি: ${w.commanderMuslimsBn}`,
            `বিস্তারিত: ${w.detailedHistoryBn?.slice(0, 360)}`,
          ]),
          joinNonEmpty(w.references?.slice(0, 2) || []),
          w.keyPersonalitiesBn?.join(' ')
        );
      });
    }),

    // 13. Islamic History Timeline
    import('../data/islamicHistoryData').then((m) => {
      (m.ISLAMIC_HISTORY_ERAS || []).forEach((era) => {
        pushEntry(
          `hist_era_${era.id}`,
          'history_timeline',
          `ইসলামের ইতিহাস যুগ: ${era.name.bn} (${era.from}–${era.to} খ্রি.)`,
          joinNonEmpty([era.sum.bn, `প্রধান ব্যক্তিত্ব: ${era.who.bn}`]),
          `${era.from}–${era.to} CE`
        );
      });
      (m.ISLAMIC_HISTORY_EVENTS || []).forEach((ev, idx) => {
        pushEntry(
          `hist_ev_${idx}`,
          'history_timeline',
          `${ev.y} খ্রি.${ev.ah ? ` (${ev.ah} হি.)` : ''}: ${ev.t.bn}`,
          joinNonEmpty([`স্থান: ${ev.p.bn} (${ev.n.bn})`, ev.d.bn, ev.l?.bn]),
          `${ev.y} CE — ${ev.t.en}`
        );
      });
    }),

    // 14. Araber Gotro & Makkah Responsibilities
    import('../data/araberGotroData').then((m) => {
      (m.ARABER_GOTRO_DATABASE || []).forEach((g) => {
        pushEntry(
          `gotro_${g.id}`,
          'araber_gotro',
          `গোত্র: ${g.tribeNameBn} (${g.chapterTitleBn})`,
          joinNonEmpty([
            g.locationOrContextBn,
            g.responsibilityOrRoleBn,
            g.introductionBn?.slice(0, 320),
            g.personalities?.slice(0, 5).map((p) => `${p.nameBn} (${p.roleBn})`).join(', '),
          ]),
          g.referencesBn?.slice(0, 2).join('; '),
          g.tribeNameEn
        );
      });
      (m.MAKKAH_RESPONSIBILITIES || []).forEach((r, idx) => {
        pushEntry(
          `makkah_resp_${idx}`,
          'araber_gotro',
          `পবিত্র কাবার দায়িত্ব (${r.responsibilityBn}): ${r.clanBn}`,
          joinNonEmpty([r.detailsBn, r.islamicHolder ? `ইসলামী যুগে: ${r.islamicHolder}` : '']),
          r.sectionCode
        );
      });
      (m.ALL_40_APPENDIX_TRIBES || []).forEach((t) => {
        pushEntry(
          `app_tribe_${t.id}`,
          'araber_gotro',
          `${t.index}. ${t.nameBn} (${t.categoryBn})`,
          joinNonEmpty([
            `অঞ্চল: ${t.regionBn}`,
            t.historicalSignificanceBn,
            t.sahabaListBn?.length ? `বিশিষ্ট সাহাবা: ${t.sahabaListBn.slice(0, 6).join(', ')}` : '',
          ]),
          t.referenceBn,
          t.nameEn
        );
      });
    }),

    // 15. Quran 114 Surahs, Surah Insights, & Quran Topics (322 topics)
    import('../utils/quran114List').then((m) => {
      import('../utils/surahInsights').then((insMod) => {
        const insightsMap = insMod.SURAH_INSIGHTS_MAP || {};
        (m.ALL_114_SURAHS || []).forEach((s) => {
          const ins = insightsMap[s.number];
          pushEntry(
            `surah_${s.number}`,
            'quran',
            `সূরা ${s.number}: ${s.englishName} (${s.fullNameArabic}) — ${s.englishNameTranslation}`,
            joinNonEmpty([
              `আয়াত সংখ্যা: ${s.numberOfAyahs}, অবতীর্ণ: ${s.revelationType === 'Meccan' ? 'মক্কী' : 'মাদানী'}, পারা: ${s.startJuz}`,
              ins?.coreMessageBn,
              ins?.fojilotBn?.slice(0, 260),
              ins?.sabunNuzulBn?.slice(0, 220),
              ins?.importantTopicsBn?.slice(0, 4).join(', '),
            ]),
            ins?.referenceBn || `Al-Quran Surah ${s.number}`,
            `${s.name} ${s.englishName}`
          );
        });
      });
    }),

    import('../data/quranTopicsData').then((m) => {
      (m.QURAN_TOPICS_DATABASE || []).forEach((topic) => {
        const firstAyah = topic.ayahs?.[0] || topic.sections?.[0]?.ayahs?.[0];
        const secondAyah = topic.ayahs?.[1] || topic.sections?.[0]?.ayahs?.[1];
        const firstHadith = topic.hadiths?.[0];
        const subHeads = topic.sections?.map((sec) => sec.subHeadingBn).filter(Boolean).slice(0, 4) || [];
        pushEntry(
          `qtopic_${topic.id}`,
          'quran',
          `কুরআনের বিষয়: ${topic.nameBn} (${topic.categoryBn || ''})`,
          joinNonEmpty([
            topic.descriptionBn,
            subHeads.length ? `উপ-বিষয়: ${subHeads.join(', ')}` : '',
            firstAyah ? `আয়াত (${firstAyah.surahNameBn} ${firstAyah.surahNumber}:${firstAyah.ayahNumber}): ${firstAyah.translationBn}` : '',
            secondAyah ? `আয়াত (${secondAyah.surahNameBn} ${secondAyah.surahNumber}:${secondAyah.ayahNumber}): ${secondAyah.translationBn}` : '',
            firstHadith ? `হাদিস (${firstHadith.referenceBn}): ${firstHadith.translationBn}` : '',
            topic.practicalTakeawaysBn?.slice(0, 2).join('; '),
          ]),
          firstAyah ? `সূরা ${firstAyah.surahNameBn} ${firstAyah.surahNumber}:${firstAyah.ayahNumber}` : topic.categoryBn,
          `${topic.nameEn} ${topic.nameAr}`
        );
      });
    }),
  ]);

  void tasks;
  return entries;
}

async function getKnowledgeIndex(): Promise<IndexedEntry[]> {
  if (!cachedIndexPromise) {
    cachedIndexPromise = buildKnowledgeIndex().catch((err) => {
      cachedIndexPromise = null;
      throw err;
    });
  }
  return cachedIndexPromise;
}

export function warmupKnowledgeIndex(): void {
  void getKnowledgeIndex();
}

export async function searchAppKnowledge(
  query: string,
  activeModule: NavModule,
  _language: ZikrLanguage = 'bn',
  limit = 10
): Promise<KnowledgeMatch[]> {
  const cleanQuery = query.trim();
  if (!cleanQuery) return [];

  const index = await getKnowledgeIndex();
  const { rawNormalized, tokens, expandedTokens } = buildSearchTokens(cleanQuery);

  const scored: KnowledgeMatch[] = [];

  for (const entry of index) {
    let score = 0;

    // 1. Direct full-phrase match
    if (rawNormalized.length >= 3) {
      if (entry.searchTitle.includes(rawNormalized)) {
        score += 40;
      } else if (entry.searchBody.includes(rawNormalized)) {
        score += 22;
      }
    }

    // 2. Original non-stopword token matches (counted uniquely per base stem)
    let directHits = 0;
    for (const tok of tokens) {
      if (tok.length < 2) continue;
      if (entry.searchTitle.includes(tok)) {
        score += 18;
        directHits += 1;
      } else if (entry.searchBody.includes(tok)) {
        score += 8;
        directHits += 1;
      }
    }

    // Strong multi-token relevance bonus when multiple query terms appear together
    if (directHits >= 2) {
      score += (directHits - 1) * 16;
    }

    // 3. Expanded Banglish/Bangla/English phonetic alias matches
    let aliasHits = 0;
    for (const exp of expandedTokens) {
      if (exp.length < 2 || tokens.includes(exp)) continue;
      if (entry.searchTitle.includes(exp)) {
        score += 10;
        aliasHits += 1;
      } else if (entry.searchBody.includes(exp)) {
        score += 4;
        aliasHits += 1;
      }
    }

    // Require at least one meaningful match
    if (score <= 0 || (directHits === 0 && aliasHits < 2 && rawNormalized.length >= 4 && !entry.searchBody.includes(rawNormalized))) {
      // Allow single alias hit if query only had 1 token
      if (!(tokens.length <= 1 && aliasHits >= 1)) {
        continue;
      }
    }

    // Slight boost for active module only when entry genuinely matched
    if (entry.moduleId === activeModule) {
      score += 4;
    }

    scored.push({
      id: entry.id,
      moduleId: entry.moduleId,
      moduleLabel: entry.moduleLabel,
      title: entry.title,
      reference: entry.reference,
      snippet: entry.snippet,
      score,
    });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit);
}

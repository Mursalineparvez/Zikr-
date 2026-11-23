/**
 * Persistent storage and topic-organized aggregation utilities for the Saved Library:
 * Universal Vault (Notes, Quotes/Ayahs/Hadith, Web Links, Checklists, Images),
 * Bookmarks (Al-Quran, Hadith, Seerat, Sahaba, Arab Tribes, Custom),
 * and Text Highlights — organized cleanly by Built-in and Custom Topics.
 */

export type HighlightColor = 'amber' | 'emerald' | 'rose' | 'teal';
export type TopicAccentColor = 'emerald' | 'amber' | 'teal' | 'rose' | 'indigo' | 'violet';

export interface SavedHighlight {
  id: string;
  text: string;
  source: string;
  color: HighlightColor;
  createdAt: number;
  section?: string;
  itemKey?: string;
  note?: string;
  topicId?: string;
}

export const HIGHLIGHT_COLOR_STYLES: Record<
  HighlightColor,
  {
    id: HighlightColor;
    labelEn: string;
    labelBn: string;
    labelAr: string;
    dotHex: string;
    dotClass: string;
    markDayClass: string;
    markNightClass: string;
    cardDayClass: string;
    cardNightClass: string;
    badgeDayClass: string;
    badgeNightClass: string;
  }
> = {
  amber: {
    id: 'amber',
    labelEn: 'Gold',
    labelBn: 'সোনালি',
    labelAr: 'ذهبي',
    dotHex: '#f59e0b',
    dotClass: 'bg-amber-400',
    markDayClass: 'bg-amber-200/80 text-slate-950 decoration-amber-400/70',
    markNightClass: 'bg-amber-400/25 text-amber-100 decoration-amber-400/60',
    cardDayClass: 'bg-amber-50/75 border-amber-300 ring-1 ring-amber-300/40',
    cardNightClass: 'bg-amber-950/25 border-amber-500/45 ring-1 ring-amber-500/20',
    badgeDayClass: 'bg-amber-100 text-amber-900 border-amber-300',
    badgeNightClass: 'bg-amber-500/20 text-amber-200 border-amber-500/40',
  },
  emerald: {
    id: 'emerald',
    labelEn: 'Emerald',
    labelBn: 'সবুজ',
    labelAr: 'زمردي',
    dotHex: '#10b981',
    dotClass: 'bg-emerald-500',
    markDayClass: 'bg-emerald-200/80 text-emerald-950 decoration-emerald-500/60',
    markNightClass: 'bg-emerald-500/25 text-emerald-100 decoration-emerald-400/60',
    cardDayClass: 'bg-emerald-50/75 border-emerald-300 ring-1 ring-emerald-300/40',
    cardNightClass: 'bg-emerald-950/25 border-emerald-500/45 ring-1 ring-emerald-500/20',
    badgeDayClass: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    badgeNightClass: 'bg-emerald-500/20 text-emerald-200 border-emerald-500/40',
  },
  rose: {
    id: 'rose',
    labelEn: 'Crimson',
    labelBn: 'গোলাপি',
    labelAr: 'وردي',
    dotHex: '#f43f5e',
    dotClass: 'bg-rose-500',
    markDayClass: 'bg-rose-200/80 text-rose-950 decoration-rose-400/70',
    markNightClass: 'bg-rose-500/25 text-rose-100 decoration-rose-400/60',
    cardDayClass: 'bg-rose-50/75 border-rose-300 ring-1 ring-rose-300/40',
    cardNightClass: 'bg-rose-950/25 border-rose-500/45 ring-1 ring-rose-500/20',
    badgeDayClass: 'bg-rose-100 text-rose-900 border-rose-300',
    badgeNightClass: 'bg-rose-500/20 text-rose-200 border-rose-500/40',
  },
  teal: {
    id: 'teal',
    labelEn: 'Teal',
    labelBn: 'আকাশি',
    labelAr: 'فيروزي',
    dotHex: '#06b6d4',
    dotClass: 'bg-cyan-500',
    markDayClass: 'bg-cyan-200/80 text-cyan-950 decoration-cyan-500/70',
    markNightClass: 'bg-cyan-500/25 text-cyan-100 decoration-cyan-400/60',
    cardDayClass: 'bg-cyan-50/75 border-cyan-300 ring-1 ring-cyan-300/40',
    cardNightClass: 'bg-cyan-950/25 border-cyan-500/45 ring-1 ring-cyan-500/20',
    badgeDayClass: 'bg-cyan-100 text-cyan-900 border-cyan-300',
    badgeNightClass: 'bg-cyan-500/20 text-cyan-200 border-cyan-500/40',
  },
};

export interface SavedTopic {
  id: string;
  nameBn: string;
  nameEn: string;
  arabicLabel?: string;
  descBn?: string;
  descEn?: string;
  accent: TopicAccentColor;
  emoji: string;
  isCustom?: boolean;
  createdAt?: number;
}

export const BUILTIN_SAVED_TOPICS: SavedTopic[] = [
  {
    id: 'quran',
    nameBn: 'আল-কুরআন ও তাফসীর',
    nameEn: 'Al-Quran & Tafsir',
    arabicLabel: 'القرآن والتفسير',
    descBn: 'সংরক্ষিত আয়াত, সূরা বুকমার্ক ও তাফসীরের শিক্ষা',
    descEn: 'Saved verses, surah bookmarks & tafsir notes',
    accent: 'emerald',
    emoji: '📖',
  },
  {
    id: 'hadith',
    nameBn: 'হাদীস ও সুন্নাহ',
    nameEn: 'Hadith & Sunnah',
    arabicLabel: 'الحديث والسنة',
    descBn: 'সহীহ হাদীস, রাসূল ﷺ-এর ২৪ ঘণ্টার সুন্নাহ ও আমল',
    descEn: 'Authentic hadiths and Prophetic Sunnah',
    accent: 'teal',
    emoji: '📜',
  },
  {
    id: 'dua_amal',
    nameBn: 'দোয়া, যিকির ও আমল',
    nameEn: 'Dua, Zikr & Amal',
    arabicLabel: 'الدعاء والذكر',
    descBn: 'মাসনুন দোয়া, দৈনন্দিন আমল ও তাসবীহ রুটিন',
    descEn: 'Daily supplications, zikr checklists & routines',
    accent: 'amber',
    emoji: '🤲',
  },
  {
    id: 'seerat',
    nameBn: 'সীরাত ও নবীগণ (আ.)',
    nameEn: 'Seerat & Prophets',
    arabicLabel: 'السيرة والأنبياء',
    descBn: 'সীরাতুন নবী ﷺ ও কুরআনে বর্ণিত ২৫ নবী-রাসূলের জীবনী',
    descEn: 'Life of Prophet Muhammad ﷺ & 25 Prophets',
    accent: 'indigo',
    emoji: '🕌',
  },
  {
    id: 'sahaba_history',
    nameBn: 'সাহাবা, ইতিহাস ও গোত্র',
    nameEn: 'Sahaba & History',
    arabicLabel: 'الصحابة والتاريخ',
    descBn: 'হায়াতুস সাহাবা, ইসলামের যুদ্ধ, ইতিহাস ও আরবের গোত্র',
    descEn: 'Companions, Islamic battles, timeline & tribes',
    accent: 'rose',
    emoji: '⚔️',
  },
  {
    id: 'study_notes',
    nameBn: 'বয়ান, কিতাব ও ব্যক্তিগত নোট',
    nameEn: 'Lectures, Books & Notes',
    arabicLabel: 'الدروس والملاحظات',
    descBn: 'দ্বীনি শিক্ষা, বয়ানের পয়েন্ট, কিতাব ও নিজের নোট',
    descEn: 'Study notes, lectures, books & personal reflections',
    accent: 'violet',
    emoji: '📝',
  },
  {
    id: 'links_media',
    nameBn: 'লিংক, ছবি ও অন্যান্য রিসোর্স',
    nameEn: 'Links, Images & Files',
    arabicLabel: 'الروابط والملفات',
    descBn: 'ওয়েব লিংক, স্ক্রিনশট, ছবি, চেকলিস্ট ও গুরুত্বপূর্ণ তথ্য',
    descEn: 'Web resources, snapshots, checklists & files',
    accent: 'teal',
    emoji: '🗂️',
  },
];

export const TOPIC_ACCENT_STYLES: Record<
  TopicAccentColor,
  {
    id: TopicAccentColor;
    labelBn: string;
    labelEn: string;
    dotBg: string;
    headerDayBg: string;
    headerNightBg: string;
    iconDayBg: string;
    iconNightBg: string;
    textDay: string;
    textNight: string;
    ringDay: string;
    ringNight: string;
  }
> = {
  emerald: {
    id: 'emerald',
    labelBn: 'সবুজ',
    labelEn: 'Emerald',
    dotBg: 'bg-emerald-500',
    headerDayBg: 'bg-emerald-50/70 border-emerald-200/80',
    headerNightBg: 'bg-emerald-950/35 border-emerald-800/50',
    iconDayBg: 'bg-emerald-100 text-[#006A4E]',
    iconNightBg: 'bg-emerald-900/60 text-emerald-300',
    textDay: 'text-[#006A4E]',
    textNight: 'text-emerald-300',
    ringDay: 'ring-emerald-300/60',
    ringNight: 'ring-emerald-500/40',
  },
  teal: {
    id: 'teal',
    labelBn: 'টিল',
    labelEn: 'Teal',
    dotBg: 'bg-teal-500',
    headerDayBg: 'bg-teal-50/70 border-teal-200/80',
    headerNightBg: 'bg-teal-950/35 border-teal-800/50',
    iconDayBg: 'bg-teal-100 text-teal-800',
    iconNightBg: 'bg-teal-900/60 text-teal-300',
    textDay: 'text-teal-700',
    textNight: 'text-teal-300',
    ringDay: 'ring-teal-300/60',
    ringNight: 'ring-teal-500/40',
  },
  amber: {
    id: 'amber',
    labelBn: 'সোনালি',
    labelEn: 'Gold',
    dotBg: 'bg-amber-500',
    headerDayBg: 'bg-amber-50/75 border-amber-200/80',
    headerNightBg: 'bg-amber-950/30 border-amber-800/50',
    iconDayBg: 'bg-amber-100 text-amber-800',
    iconNightBg: 'bg-amber-900/50 text-amber-300',
    textDay: 'text-amber-700',
    textNight: 'text-amber-300',
    ringDay: 'ring-amber-300/60',
    ringNight: 'ring-amber-500/40',
  },
  rose: {
    id: 'rose',
    labelBn: 'ক্রিমসন',
    labelEn: 'Rose',
    dotBg: 'bg-rose-500',
    headerDayBg: 'bg-rose-50/70 border-rose-200/80',
    headerNightBg: 'bg-rose-950/30 border-rose-800/50',
    iconDayBg: 'bg-rose-100 text-rose-800',
    iconNightBg: 'bg-rose-900/50 text-rose-300',
    textDay: 'text-rose-700',
    textNight: 'text-rose-300',
    ringDay: 'ring-rose-300/60',
    ringNight: 'ring-rose-500/40',
  },
  indigo: {
    id: 'indigo',
    labelBn: 'নীল',
    labelEn: 'Indigo',
    dotBg: 'bg-indigo-500',
    headerDayBg: 'bg-indigo-50/70 border-indigo-200/80',
    headerNightBg: 'bg-indigo-950/30 border-indigo-800/50',
    iconDayBg: 'bg-indigo-100 text-indigo-800',
    iconNightBg: 'bg-indigo-900/50 text-indigo-300',
    textDay: 'text-indigo-700',
    textNight: 'text-indigo-300',
    ringDay: 'ring-indigo-300/60',
    ringNight: 'ring-indigo-500/40',
  },
  violet: {
    id: 'violet',
    labelBn: 'বেগুনি',
    labelEn: 'Violet',
    dotBg: 'bg-violet-500',
    headerDayBg: 'bg-violet-50/70 border-violet-200/80',
    headerNightBg: 'bg-violet-950/30 border-violet-800/50',
    iconDayBg: 'bg-violet-100 text-violet-800',
    iconNightBg: 'bg-violet-900/50 text-violet-300',
    textDay: 'text-violet-700',
    textNight: 'text-violet-300',
    ringDay: 'ring-violet-300/60',
    ringNight: 'ring-violet-500/40',
  },
};

export interface SavedChecklistEntry {
  id: string;
  text: string;
  done: boolean;
}

export type VaultItemKind = 'note' | 'quote' | 'link' | 'checklist' | 'image' | 'bookmark';

export interface SavedVaultItem {
  id: string;
  kind: VaultItemKind;
  topicId: string;
  title: string;
  content?: string;
  arabic?: string;
  reference?: string;
  url?: string;
  imageDataUrl?: string;
  checklist?: SavedChecklistEntry[];
  accent?: TopicAccentColor;
  pinned?: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface SavedNote {
  id: string;
  title: string;
  content: string;
  source?: string;
  topicId?: string;
  createdAt: number;
  updatedAt: number;
}

export interface SavedCustomBookmark {
  id: string;
  title: string;
  subtitle?: string;
  source: string;
  topicId?: string;
  createdAt: number;
}

export interface UnifiedBookmarkItem {
  id: string;
  kind: 'quran' | 'hadith' | 'seerat' | 'sahaba' | 'gotro' | 'custom';
  title: string;
  arabic?: string;
  subtitle: string;
  sourceLabel: string;
  timestamp: number;
  rawId?: string | number;
  surahNumber?: number;
  ayahNumber?: number;
  topicId?: string;
}

/**
 * Normalized view model used by SavedView so every item across Vault, Bookmarks,
 * Highlights, and Notes can be grouped cleanly by Topic, searched, pinned, and moved.
 */
export type SavedEntryOrigin = 'vault' | 'bookmark' | 'highlight' | 'note';

export interface NormalizedSavedEntry {
  id: string;
  origin: SavedEntryOrigin;
  displayKind: VaultItemKind | 'highlight';
  topicId: string;
  title: string;
  body?: string;
  arabic?: string;
  reference?: string;
  url?: string;
  imageDataUrl?: string;
  checklist?: SavedChecklistEntry[];
  highlightColor?: HighlightColor;
  highlightNote?: string;
  accent?: TopicAccentColor;
  pinned: boolean;
  createdAt: number;
  updatedAt: number;
  rawBookmark?: UnifiedBookmarkItem;
  rawHighlight?: SavedHighlight;
  rawNote?: SavedNote;
  rawVault?: SavedVaultItem;
}

const HIGHLIGHTS_KEY = 'zikrplus_saved_highlights';
const NOTES_KEY = 'zikrplus_saved_notes';
const CUSTOM_BOOKMARKS_KEY = 'zikrplus_saved_bookmarks';
const VAULT_ITEMS_KEY = 'zikrplus_saved_vault_v1';
const CUSTOM_TOPICS_KEY = 'zikrplus_saved_topics_v1';
const TOPIC_OVERRIDES_KEY = 'zikrplus_saved_topic_overrides_v1';
const PINNED_IDS_KEY = 'zikrplus_saved_pinned_ids_v1';

const HADITH_BOOK_TITLES: Record<string, string> = {
  bukhari: 'সহীহ বুখারী',
  muslim: 'সহীহ মুসলিম',
  nasai: 'সুনানে নাসাঈ',
  abudawud: 'সুনানে আবূ দাউদ',
  tirmidhi: 'জামে তিরমিযী',
  ibnmajah: 'সুনানে ইবনে মাজাহ',
  riyadussalihin: 'রিয়াদুস সালেহীন',
  mishkat: 'মিশকাতুল মাসাবীহ',
  muwatta: 'মুয়াত্তা মালিক',
  musnadahmad: 'মুসনাদে আহমাদ',
  adabulmufrad: 'আল-আদাবুল মুফরাদ',
  shamaile: 'শামায়েলে তিরমিযী',
  bulughulmaram: 'বুলুগুল মারাম',
  nawawi40: 'চল্লিশ হাদীস (নববী)',
  qudsi40: 'হাদীসে কুদসী',
};

function notifySavedUpdated() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('zikrplus-saved-updated'));
  }
}

function safeWriteStorage(key: string, value: string): { ok: boolean; quotaExceeded?: boolean } {
  try {
    localStorage.setItem(key, value);
    notifySavedUpdated();
    return { ok: true };
  } catch (err: any) {
    const isQuota =
      err?.name === 'QuotaExceededError' ||
      err?.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
      err?.code === 22;
    return { ok: false, quotaExceeded: isQuota };
  }
}

// ---------- Topic Inference & Overrides ----------

export function inferTopicId(params: {
  section?: string;
  source?: string;
  kind?: string;
  title?: string;
  text?: string;
}): string {
  const sec = (params.section || '').toLowerCase();
  const src = (params.source || '').toLowerCase();
  const kind = (params.kind || '').toLowerCase();
  const combined = `${sec} ${src} ${params.title || ''} ${params.text || ''}`.toLowerCase();

  if (
    kind === 'quran' ||
    sec === 'quran' ||
    sec === 'tafsir' ||
    /কুরআন|কোরআন|সূরা|আয়াত|তাফসীর|quran|surah|ayah|tafsir/.test(combined)
  ) {
    return 'quran';
  }
  if (
    kind === 'hadith' ||
    sec === 'hadith' ||
    sec === 'nobi_24_hours' ||
    /হাদীস|হাদিস|বুখারী|মুসলিম|তিরমিযী|আবূ দাউদ|নাসাঈ|মিশকাত|সুন্নাহ|২৪ ঘণ্টা|hadith|bukhari|muslim|sunnah/.test(
      combined
    )
  ) {
    return 'hadith';
  }
  if (
    sec === 'dua' ||
    sec === 'zikr' ||
    sec === 'allah_names' ||
    /দোয়া|দুআ|জিকির|যিকির|আমল|ইস্তেগফার|তাসবীহ|dua|azkar|zikr|amal/.test(combined)
  ) {
    return 'dua_amal';
  }
  if (
    kind === 'seerat' ||
    sec === 'seerat' ||
    sec === 'prophets_25' ||
    /সীরাত|সিরাত|নবী|রাসূল|রাসুল|নবুওয়াত|হিজরত|মক্কা|মদিনা|seerat|prophet|nabi/.test(combined)
  ) {
    return 'seerat';
  }
  if (
    kind === 'sahaba' ||
    kind === 'gotro' ||
    sec === 'hayatus_sahaba' ||
    sec === 'islamic_history_wars' ||
    sec === 'history_timeline' ||
    sec === 'arober_gotro' ||
    /সাহাবা|সাহাবি|গোত্র|যুদ্ধ|বদর|উহুদ|খন্দক|ইতিহাস|খেলাফত|sahaba|gotro|tribe|battle|war/.test(combined)
  ) {
    return 'sahaba_history';
  }
  if (kind === 'link' || kind === 'image' || kind === 'checklist') {
    return 'links_media';
  }
  if (sec === 'kitab' || /কিতাব|বয়ান|তা’লীম|মাসআলা|নোট|kitab|bayan|note/.test(combined)) {
    return 'study_notes';
  }
  return 'study_notes';
}

export function getCustomTopics(): SavedTopic[] {
  try {
    const raw = localStorage.getItem(CUSTOM_TOPICS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((t): t is SavedTopic => Boolean(t && typeof t === 'object' && t.id && (t.nameBn || t.nameEn)))
      .map((t) => ({
        ...t,
        isCustom: true,
        accent: TOPIC_ACCENT_STYLES[t.accent] ? t.accent : 'emerald',
        emoji: t.emoji || '📁',
      }));
  } catch {
    return [];
  }
}

export function getAllSavedTopics(): SavedTopic[] {
  return [...BUILTIN_SAVED_TOPICS, ...getCustomTopics()];
}

export function createCustomTopic(input: {
  name: string;
  desc?: string;
  accent?: TopicAccentColor;
  emoji?: string;
}): SavedTopic {
  const cleanName = input.name.trim() || 'নতুন টপিক';
  const topic: SavedTopic = {
    id: `topic_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    nameBn: cleanName,
    nameEn: cleanName,
    descBn: input.desc?.trim() || undefined,
    descEn: input.desc?.trim() || undefined,
    accent: input.accent || 'emerald',
    emoji: input.emoji?.trim() || '📁',
    isCustom: true,
    createdAt: Date.now(),
  };
  const next = [...getCustomTopics(), topic];
  safeWriteStorage(CUSTOM_TOPICS_KEY, JSON.stringify(next));
  return topic;
}

export function updateCustomTopic(
  topicId: string,
  updates: { name?: string; desc?: string; accent?: TopicAccentColor; emoji?: string }
): void {
  const list = getCustomTopics();
  const next = list.map((t) =>
    t.id === topicId
      ? {
          ...t,
          ...(updates.name?.trim()
            ? { nameBn: updates.name.trim(), nameEn: updates.name.trim() }
            : {}),
          ...(updates.desc !== undefined
            ? { descBn: updates.desc.trim() || undefined, descEn: updates.desc.trim() || undefined }
            : {}),
          ...(updates.accent ? { accent: updates.accent } : {}),
          ...(updates.emoji?.trim() ? { emoji: updates.emoji.trim() } : {}),
        }
      : t
  );
  safeWriteStorage(CUSTOM_TOPICS_KEY, JSON.stringify(next));
}

export function deleteCustomTopic(topicId: string, fallbackTopicId = 'study_notes'): void {
  const nextTopics = getCustomTopics().filter((t) => t.id !== topicId);
  safeWriteStorage(CUSTOM_TOPICS_KEY, JSON.stringify(nextTopics));

  // Reassign any vault items / notes / highlights / overrides belonging to deleted topic
  const vault = getVaultItems();
  let vaultChanged = false;
  const nextVault = vault.map((item) => {
    if (item.topicId === topicId) {
      vaultChanged = true;
      return { ...item, topicId: fallbackTopicId, updatedAt: Date.now() };
    }
    return item;
  });
  if (vaultChanged) {
    safeWriteStorage(VAULT_ITEMS_KEY, JSON.stringify(nextVault));
  }

  const overrides = getTopicOverrides();
  let ovChanged = false;
  Object.keys(overrides).forEach((entryId) => {
    if (overrides[entryId] === topicId) {
      overrides[entryId] = fallbackTopicId;
      ovChanged = true;
    }
  });
  if (ovChanged) {
    safeWriteStorage(TOPIC_OVERRIDES_KEY, JSON.stringify(overrides));
  }
}

function getTopicOverrides(): Record<string, string> {
  try {
    const raw = localStorage.getItem(TOPIC_OVERRIDES_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function getPinnedIdsMap(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(PINNED_IDS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

export function reassignSavedEntryTopic(
  origin: SavedEntryOrigin,
  id: string,
  newTopicId: string
): void {
  if (origin === 'vault') {
    const list = getVaultItems();
    const next = list.map((item) =>
      item.id === id ? { ...item, topicId: newTopicId, updatedAt: Date.now() } : item
    );
    safeWriteStorage(VAULT_ITEMS_KEY, JSON.stringify(next));
    return;
  }

  if (origin === 'note') {
    const list = getSavedNotes();
    const next = list.map((n) =>
      n.id === id ? { ...n, topicId: newTopicId, updatedAt: Date.now() } : n
    );
    safeWriteStorage(NOTES_KEY, JSON.stringify(next));
    return;
  }

  if (origin === 'highlight') {
    const list = getSavedHighlights();
    const next = list.map((h) => (h.id === id ? { ...h, topicId: newTopicId } : h));
    writeHighlights(next);
    return;
  }

  // Bookmark (Quran, Hadith, Seerat, Sahaba, Gotro, or Custom)
  if (origin === 'bookmark') {
    const customList = getCustomBookmarks();
    const customIdx = customList.findIndex((b) => b.id === id);
    if (customIdx >= 0) {
      customList[customIdx] = { ...customList[customIdx], topicId: newTopicId };
      safeWriteStorage(CUSTOM_BOOKMARKS_KEY, JSON.stringify(customList));
      return;
    }
    const overrides = getTopicOverrides();
    overrides[id] = newTopicId;
    safeWriteStorage(TOPIC_OVERRIDES_KEY, JSON.stringify(overrides));
  }
}

export function togglePinSavedEntry(origin: SavedEntryOrigin, id: string): boolean {
  if (origin === 'vault') {
    const list = getVaultItems();
    let nextState = false;
    const next = list.map((item) => {
      if (item.id === id) {
        nextState = !item.pinned;
        return { ...item, pinned: nextState, updatedAt: Date.now() };
      }
      return item;
    });
    safeWriteStorage(VAULT_ITEMS_KEY, JSON.stringify(next));
    return nextState;
  }
  const map = getPinnedIdsMap();
  const nextVal = !map[id];
  if (nextVal) map[id] = true;
  else delete map[id];
  safeWriteStorage(PINNED_IDS_KEY, JSON.stringify(map));
  return nextVal;
}

// ---------- Universal Vault CRUD (Save Anything) ----------

export function getVaultItems(): SavedVaultItem[] {
  try {
    const raw = localStorage.getItem(VAULT_ITEMS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item): item is SavedVaultItem => Boolean(item && typeof item === 'object' && item.id))
      .map((item) => ({
        ...item,
        kind: item.kind || 'note',
        topicId: item.topicId || 'study_notes',
        title: String(item.title || ''),
        createdAt: typeof item.createdAt === 'number' ? item.createdAt : Date.now(),
        updatedAt: typeof item.updatedAt === 'number' ? item.updatedAt : Date.now(),
      }));
  } catch {
    return [];
  }
}

export interface SaveVaultInput {
  id?: string;
  kind: VaultItemKind;
  topicId: string;
  title: string;
  content?: string;
  arabic?: string;
  reference?: string;
  url?: string;
  imageDataUrl?: string;
  checklist?: SavedChecklistEntry[];
  accent?: TopicAccentColor;
  pinned?: boolean;
}

export function saveOrUpdateVaultItem(input: SaveVaultInput): {
  item?: SavedVaultItem;
  ok: boolean;
  quotaExceeded?: boolean;
} {
  const now = Date.now();
  const list = getVaultItems();
  const cleanTitle = input.title.trim() || 'সংরক্ষিত তথ্য';
  const cleanUrl = input.url?.trim() || undefined;
  const cleanChecklist =
    input.checklist && input.checklist.length > 0
      ? input.checklist.filter((c) => c.text.trim()).map((c) => ({ ...c, text: c.text.trim() }))
      : undefined;

  let item: SavedVaultItem;
  let nextList: SavedVaultItem[];

  if (input.id) {
    const idx = list.findIndex((x) => x.id === input.id);
    if (idx >= 0) {
      item = {
        ...list[idx],
        kind: input.kind,
        topicId: input.topicId || list[idx].topicId || 'study_notes',
        title: cleanTitle,
        content: input.content?.trim() || undefined,
        arabic: input.arabic?.trim() || undefined,
        reference: input.reference?.trim() || undefined,
        url: cleanUrl,
        imageDataUrl: input.imageDataUrl !== undefined ? input.imageDataUrl : list[idx].imageDataUrl,
        checklist: cleanChecklist,
        accent: input.accent || list[idx].accent,
        pinned: input.pinned !== undefined ? input.pinned : list[idx].pinned,
        updatedAt: now,
      };
      nextList = [...list];
      nextList[idx] = item;
    } else {
      item = {
        id: input.id,
        kind: input.kind,
        topicId: input.topicId || 'study_notes',
        title: cleanTitle,
        content: input.content?.trim() || undefined,
        arabic: input.arabic?.trim() || undefined,
        reference: input.reference?.trim() || undefined,
        url: cleanUrl,
        imageDataUrl: input.imageDataUrl,
        checklist: cleanChecklist,
        accent: input.accent,
        pinned: Boolean(input.pinned),
        createdAt: now,
        updatedAt: now,
      };
      nextList = [item, ...list];
    }
  } else {
    item = {
      id: `vault_${now}_${Math.random().toString(36).slice(2, 7)}`,
      kind: input.kind,
      topicId: input.topicId || 'study_notes',
      title: cleanTitle,
      content: input.content?.trim() || undefined,
      arabic: input.arabic?.trim() || undefined,
      reference: input.reference?.trim() || undefined,
      url: cleanUrl,
      imageDataUrl: input.imageDataUrl,
      checklist: cleanChecklist,
      accent: input.accent,
      pinned: Boolean(input.pinned),
      createdAt: now,
      updatedAt: now,
    };
    nextList = [item, ...list];
  }

  const res = safeWriteStorage(VAULT_ITEMS_KEY, JSON.stringify(nextList));
  if (!res.ok) {
    return { ok: false, quotaExceeded: res.quotaExceeded };
  }
  return { ok: true, item };
}

export function removeVaultItem(id: string): void {
  const next = getVaultItems().filter((item) => item.id !== id);
  safeWriteStorage(VAULT_ITEMS_KEY, JSON.stringify(next));
}

export function toggleVaultChecklistRow(vaultId: string, rowId: string): void {
  const list = getVaultItems();
  const next = list.map((item) => {
    if (item.id !== vaultId || !item.checklist) return item;
    return {
      ...item,
      checklist: item.checklist.map((row) =>
        row.id === rowId ? { ...row, done: !row.done } : row
      ),
      updatedAt: Date.now(),
    };
  });
  safeWriteStorage(VAULT_ITEMS_KEY, JSON.stringify(next));
}

/**
 * Client-side canvas compression for saving images reliably inside localStorage
 * without blowing past storage quotas.
 */
export async function compressImageForStorage(
  file: File,
  maxDim = 720,
  quality = 0.72
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Invalid image file'));
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          let { width, height } = img;
          if (width > maxDim || height > maxDim) {
            if (width >= height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          canvas.width = Math.max(1, width);
          canvas.height = Math.max(1, height);
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(String(reader.result));
            return;
          }
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(dataUrl);
        } catch (err) {
          reject(err);
        }
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

// ---------- Highlights (Existing + Topic Aware) ----------

export function getSavedHighlights(): SavedHighlight[] {
  try {
    const raw = localStorage.getItem(HIGHLIGHTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((h): h is Record<string, any> => Boolean(h && typeof h === 'object'))
      .map((h) => {
        const rawColor = String(h.color || 'amber');
        const safeColor: HighlightColor =
          rawColor === 'amber' || rawColor === 'emerald' || rawColor === 'rose' || rawColor === 'teal'
            ? rawColor
            : 'amber';
        return {
          id: String(h.id || `hl_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`),
          text: typeof h.text === 'string' ? h.text : String(h.text ?? ''),
          source: typeof h.source === 'string' ? h.source : String(h.source ?? 'Saved'),
          color: safeColor,
          createdAt: typeof h.createdAt === 'number' && Number.isFinite(h.createdAt) ? h.createdAt : Date.now(),
          ...(typeof h.section === 'string' && h.section ? { section: h.section } : {}),
          ...(typeof h.itemKey === 'string' && h.itemKey ? { itemKey: h.itemKey } : {}),
          ...(typeof h.note === 'string' && h.note.trim() ? { note: h.note.trim() } : {}),
          ...(typeof h.topicId === 'string' && h.topicId ? { topicId: h.topicId } : {}),
        };
      });
  } catch {
    return [];
  }
}

function writeHighlights(next: SavedHighlight[]) {
  try {
    localStorage.setItem(HIGHLIGHTS_KEY, JSON.stringify(next));
    notifySavedUpdated();
  } catch {}
}

export interface AddHighlightOptions {
  section?: string;
  itemKey?: string;
  note?: string;
  topicId?: string;
}

export function addSavedHighlight(
  text: string,
  source = 'Commentary',
  color: HighlightColor = 'amber',
  options?: AddHighlightOptions
): SavedHighlight {
  const trimmedText = (typeof text === 'string' ? text : String(text ?? '')).trim();
  const trimmedSource = (typeof source === 'string' ? source : String(source ?? '')).trim() || 'Commentary';
  const existingList = getSavedHighlights();

  const existingIdx = existingList.findIndex((h) =>
    options?.itemKey
      ? h.itemKey === options.itemKey
      : !h.itemKey && h.text === trimmedText && h.source === trimmedSource
  );

  if (existingIdx >= 0) {
    const updated: SavedHighlight = {
      ...existingList[existingIdx],
      text: trimmedText || existingList[existingIdx].text,
      source: trimmedSource,
      color,
      section: options?.section ?? existingList[existingIdx].section,
      itemKey: options?.itemKey ?? existingList[existingIdx].itemKey,
      note: options?.note !== undefined ? (options.note.trim() || undefined) : existingList[existingIdx].note,
      topicId: options?.topicId ?? existingList[existingIdx].topicId,
    };
    const next = [...existingList];
    next[existingIdx] = updated;
    writeHighlights(next);
    return updated;
  }

  const resolvedTopic =
    options?.topicId || inferTopicId({ section: options?.section, source: trimmedSource, text: trimmedText });

  const item: SavedHighlight = {
    id: `hl_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    text: trimmedText,
    source: trimmedSource,
    color,
    createdAt: Date.now(),
    ...(options?.section ? { section: options.section } : {}),
    ...(options?.itemKey ? { itemKey: options.itemKey } : {}),
    ...(options?.note?.trim() ? { note: options.note.trim() } : {}),
    topicId: resolvedTopic,
  };
  writeHighlights([item, ...existingList]);
  return item;
}

export function updateSavedHighlightColor(id: string, color: HighlightColor): void {
  const list = getSavedHighlights();
  const next = list.map((h) => (h.id === id ? { ...h, color } : h));
  writeHighlights(next);
}

export function updateSavedHighlightNote(id: string, note: string): void {
  const list = getSavedHighlights();
  const cleanNote = note.trim();
  const next = list.map((h) => (h.id === id ? { ...h, note: cleanNote || undefined } : h));
  writeHighlights(next);
}

export function getHighlightByItemKey(itemKey: string): SavedHighlight | undefined {
  if (!itemKey) return undefined;
  return getSavedHighlights().find((h) => h.itemKey === itemKey);
}

export function setItemHighlight(
  itemKey: string,
  text: string,
  source: string,
  section: string,
  color: HighlightColor = 'amber',
  note?: string
): SavedHighlight {
  return addSavedHighlight(text, source, color, { section, itemKey, note });
}

export function removeItemHighlight(itemKey: string): void {
  if (!itemKey) return;
  const next = getSavedHighlights().filter((h) => h.itemKey !== itemKey);
  writeHighlights(next);
}

export function removeSavedHighlight(id: string): void {
  const next = getSavedHighlights().filter((h) => h.id !== id);
  writeHighlights(next);
}

export function mergeSavedHighlights(remoteHighlights: SavedHighlight[]): SavedHighlight[] {
  if (!Array.isArray(remoteHighlights) || remoteHighlights.length === 0) {
    return getSavedHighlights();
  }
  const local = getSavedHighlights();
  const map = new Map<string, SavedHighlight>();
  [...remoteHighlights, ...local].forEach((h) => {
    if (!h || typeof h !== 'object' || !h.id) return;
    const rawColor = String(h.color || 'amber');
    const safeColor: HighlightColor =
      rawColor === 'amber' || rawColor === 'emerald' || rawColor === 'rose' || rawColor === 'teal'
        ? rawColor
        : 'amber';
    const clean: SavedHighlight = {
      id: String(h.id),
      text: typeof h.text === 'string' ? h.text : String(h.text ?? ''),
      source: typeof h.source === 'string' ? h.source : String(h.source ?? 'Saved'),
      color: safeColor,
      createdAt: typeof h.createdAt === 'number' && Number.isFinite(h.createdAt) ? h.createdAt : Date.now(),
      ...(typeof h.section === 'string' && h.section ? { section: h.section } : {}),
      ...(typeof h.itemKey === 'string' && h.itemKey ? { itemKey: h.itemKey } : {}),
      ...(typeof h.note === 'string' && h.note.trim() ? { note: h.note.trim() } : {}),
      ...(typeof h.topicId === 'string' && h.topicId ? { topicId: h.topicId } : {}),
    };
    const dedupKey = clean.itemKey ? `key:${clean.itemKey}` : `id:${clean.id}`;
    const existing = map.get(dedupKey);
    if (!existing || clean.createdAt >= existing.createdAt) {
      map.set(dedupKey, clean);
    }
  });
  const merged = Array.from(map.values()).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  if (JSON.stringify(merged) !== JSON.stringify(local)) {
    writeHighlights(merged);
  }
  return merged;
}

// ---------- Notes ----------

export function getSavedNotes(): SavedNote[] {
  try {
    const raw = localStorage.getItem(NOTES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveOrUpdateNote(
  title: string,
  content: string,
  source = '',
  existingId?: string,
  topicId?: string
): SavedNote {
  const now = Date.now();
  const notes = getSavedNotes();
  let saved: SavedNote;

  const resolvedTopic =
    topicId || inferTopicId({ source, title, text: content });

  if (existingId) {
    const idx = notes.findIndex((n) => n.id === existingId);
    if (idx >= 0) {
      saved = {
        ...notes[idx],
        title: title.trim() || 'Untitled Note',
        content: content.trim(),
        source: source.trim() || undefined,
        topicId: topicId || notes[idx].topicId || resolvedTopic,
        updatedAt: now,
      };
      notes[idx] = saved;
    } else {
      saved = {
        id: existingId,
        title: title.trim() || 'Untitled Note',
        content: content.trim(),
        source: source.trim() || undefined,
        topicId: resolvedTopic,
        createdAt: now,
        updatedAt: now,
      };
      notes.unshift(saved);
    }
  } else {
    saved = {
      id: `note_${now}_${Math.random().toString(36).slice(2, 7)}`,
      title: title.trim() || 'Untitled Note',
      content: content.trim(),
      source: source.trim() || undefined,
      topicId: resolvedTopic,
      createdAt: now,
      updatedAt: now,
    };
    notes.unshift(saved);
  }

  safeWriteStorage(NOTES_KEY, JSON.stringify(notes));
  return saved;
}

export function removeSavedNote(id: string): void {
  const next = getSavedNotes().filter((n) => n.id !== id);
  safeWriteStorage(NOTES_KEY, JSON.stringify(next));
}

// ---------- Unified Bookmarks (Quran, Hadith, Seerat, Sahaba, Gotro, Custom) ----------

export function getCustomBookmarks(): SavedCustomBookmark[] {
  try {
    const raw = localStorage.getItem(CUSTOM_BOOKMARKS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function addCustomBookmark(
  title: string,
  subtitle = '',
  source = 'Saved',
  topicId?: string
): SavedCustomBookmark {
  const resolvedTopic = topicId || inferTopicId({ source, title, text: subtitle });
  const item: SavedCustomBookmark = {
    id: `bm_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    title: title.trim(),
    subtitle: subtitle.trim() || undefined,
    source: source.trim() || 'Saved',
    topicId: resolvedTopic,
    createdAt: Date.now(),
  };
  const next = [item, ...getCustomBookmarks()];
  safeWriteStorage(CUSTOM_BOOKMARKS_KEY, JSON.stringify(next));
  return item;
}

export function getAllUnifiedBookmarks(): UnifiedBookmarkItem[] {
  const list: UnifiedBookmarkItem[] = [];
  const overrides = getTopicOverrides();

  // 1. Quran bookmarks
  try {
    const rawQuran = localStorage.getItem('noor_quran_bookmarks');
    if (rawQuran) {
      const parsed = JSON.parse(rawQuran);
      if (Array.isArray(parsed)) {
        parsed.forEach((b: any) => {
          const id = `quran_${b.surahNumber}_${b.ayahNumber}`;
          list.push({
            id,
            kind: 'quran',
            title: `${b.surahName || `Surah ${b.surahNumber}`} • Ayah ${b.ayahNumber}`,
            arabic: b.arabic,
            subtitle: b.translation || '',
            sourceLabel: 'Al-Quran',
            timestamp: b.timestamp || Date.now(),
            surahNumber: b.surahNumber,
            ayahNumber: b.ayahNumber,
            topicId: overrides[id] || 'quran',
          });
        });
      }
    }
  } catch {}

  // 2. Full Hadith Library bookmarks
  try {
    const rawHadith = localStorage.getItem('zikrmate_hadis_saved_full_v1');
    if (rawHadith) {
      const parsed = JSON.parse(rawHadith);
      if (Array.isArray(parsed)) {
        parsed.forEach((h: any) => {
          if (!h || !h.uid) return;
          const id = `hadith_${h.uid}`;
          const bookLabel = HADITH_BOOK_TITLES[h.bookId] || h.bookId || 'হাদীস শরীফ';
          list.push({
            id,
            kind: 'hadith',
            title: `${bookLabel} • হাদীস #${h.hadithNumber || ''}`.trim(),
            arabic: h.arabicText || undefined,
            subtitle: h.translationText || h.englishText || '',
            sourceLabel: `${bookLabel}${h.gradeLabel ? ` · ${h.gradeLabel}` : ''}`,
            timestamp: 0,
            rawId: h.uid,
            topicId: overrides[id] || 'hadith',
          });
        });
      }
    }
  } catch {}

  // 3. Seerat-un-Nabi bookmarks
  try {
    const rawSeerat = localStorage.getItem('zikr_seerat_bookmarks');
    if (rawSeerat) {
      const parsed = JSON.parse(rawSeerat);
      if (Array.isArray(parsed)) {
        parsed.forEach((age: number | string) => {
          const id = `seerat_age_${age}`;
          list.push({
            id,
            kind: 'seerat',
            title: `সীরাতুন নবী ﷺ · বয়স ${age} বছর`,
            subtitle: 'রাসূলুল্লাহ ﷺ-এর জীবনের ধারাবাহিক অধ্যায়',
            sourceLabel: 'Seerat-un-Nabi',
            timestamp: 0,
            rawId: age,
            topicId: overrides[id] || 'seerat',
          });
        });
      }
    }
  } catch {}

  // 4. Sahaba bookmarks
  try {
    const rawSahaba = localStorage.getItem('zikr_sahaba_bookmarks');
    if (rawSahaba) {
      const parsed = JSON.parse(rawSahaba);
      if (Array.isArray(parsed)) {
        parsed.forEach((rawId: string) => {
          const id = `sahaba_${rawId}`;
          list.push({
            id,
            kind: 'sahaba',
            title: String(rawId).replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
            subtitle: 'হায়াতুস সাহাবা জীবনী',
            sourceLabel: 'Hayatus Sahaba',
            timestamp: 0,
            rawId,
            topicId: overrides[id] || 'sahaba_history',
          });
        });
      }
    }
  } catch {}

  // 5. Arab Tribes bookmarks
  try {
    const rawGotro = localStorage.getItem('zikrmate_araber_gotro_bookmarks');
    if (rawGotro) {
      const parsed = JSON.parse(rawGotro);
      if (parsed && typeof parsed === 'object') {
        Object.entries(parsed).forEach(([rawId, active]) => {
          if (active) {
            const id = `gotro_${rawId}`;
            list.push({
              id,
              kind: 'gotro',
              title: rawId.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
              subtitle: 'আরবের গোত্র ও ব্যক্তিত্ব',
              sourceLabel: 'Arab Tribes',
              timestamp: 0,
              rawId,
              topicId: overrides[id] || 'sahaba_history',
            });
          }
        });
      }
    }
  } catch {}

  // 6. Custom saved bookmarks
  getCustomBookmarks().forEach((b) => {
    list.push({
      id: b.id,
      kind: 'custom',
      title: b.title,
      subtitle: b.subtitle || b.source,
      sourceLabel: b.source || 'Saved',
      timestamp: b.createdAt,
      rawId: b.id,
      topicId: b.topicId || overrides[b.id] || inferTopicId({ source: b.source, title: b.title, text: b.subtitle }),
    });
  });

  return list.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
}

export function removeUnifiedBookmark(item: UnifiedBookmarkItem): void {
  try {
    if (item.kind === 'quran') {
      const raw = localStorage.getItem('noor_quran_bookmarks');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          const filtered = parsed.filter(
            (b: any) => !(b.surahNumber === item.surahNumber && b.ayahNumber === item.ayahNumber)
          );
          localStorage.setItem('noor_quran_bookmarks', JSON.stringify(filtered));
        }
      }
    } else if (item.kind === 'hadith') {
      const raw = localStorage.getItem('zikrmate_hadis_saved_full_v1');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          localStorage.setItem(
            'zikrmate_hadis_saved_full_v1',
            JSON.stringify(parsed.filter((h: any) => h?.uid !== item.rawId))
          );
        }
      }
    } else if (item.kind === 'seerat') {
      const raw = localStorage.getItem('zikr_seerat_bookmarks');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          localStorage.setItem(
            'zikr_seerat_bookmarks',
            JSON.stringify(parsed.filter((age: any) => String(age) !== String(item.rawId)))
          );
        }
      }
    } else if (item.kind === 'sahaba') {
      const raw = localStorage.getItem('zikr_sahaba_bookmarks');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          localStorage.setItem(
            'zikr_sahaba_bookmarks',
            JSON.stringify(parsed.filter((id: string) => id !== item.rawId))
          );
        }
      }
    } else if (item.kind === 'gotro') {
      const raw = localStorage.getItem('zikrmate_araber_gotro_bookmarks');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object' && item.rawId) {
          delete parsed[String(item.rawId)];
          localStorage.setItem('zikrmate_araber_gotro_bookmarks', JSON.stringify(parsed));
        }
      }
    } else if (item.kind === 'custom') {
      const filtered = getCustomBookmarks().filter((b) => b.id !== item.id);
      localStorage.setItem(CUSTOM_BOOKMARKS_KEY, JSON.stringify(filtered));
    }
    notifySavedUpdated();
  } catch {}
}

// ---------- Unified Topic-Aware View Aggregation ----------

export function getAllSavedNormalizedEntries(): NormalizedSavedEntry[] {
  const pinnedMap = getPinnedIdsMap();
  const overrides = getTopicOverrides();
  const validTopicIds = new Set(getAllSavedTopics().map((t) => t.id));
  const normalizeTopic = (candidate?: string, fallbackParams?: Parameters<typeof inferTopicId>[0]) => {
    if (candidate && validTopicIds.has(candidate)) return candidate;
    return inferTopicId(fallbackParams || {});
  };

  const entries: NormalizedSavedEntry[] = [];

  // 1. Universal Vault Items (Notes, Quotes, Links, Checklists, Images, Bookmarks)
  getVaultItems().forEach((v) => {
    entries.push({
      id: v.id,
      origin: 'vault',
      displayKind: v.kind,
      topicId: normalizeTopic(v.topicId, { kind: v.kind, title: v.title, source: v.reference, text: v.content }),
      title: v.title,
      body: v.content,
      arabic: v.arabic,
      reference: v.reference,
      url: v.url,
      imageDataUrl: v.imageDataUrl,
      checklist: v.checklist,
      accent: v.accent,
      pinned: Boolean(v.pinned),
      createdAt: v.createdAt,
      updatedAt: v.updatedAt,
      rawVault: v,
    });
  });

  // 2. Legacy / Standalone Notes
  getSavedNotes().forEach((n) => {
    entries.push({
      id: n.id,
      origin: 'note',
      displayKind: 'note',
      topicId: normalizeTopic(n.topicId || overrides[n.id], {
        title: n.title,
        source: n.source,
        text: n.content,
      }),
      title: n.title || 'Untitled Note',
      body: n.content,
      reference: n.source,
      pinned: Boolean(pinnedMap[n.id]),
      createdAt: n.createdAt || 0,
      updatedAt: n.updatedAt || n.createdAt || 0,
      rawNote: n,
    });
  });

  // 3. Highlights
  getSavedHighlights().forEach((hl) => {
    entries.push({
      id: hl.id,
      origin: 'highlight',
      displayKind: 'highlight',
      topicId: normalizeTopic(hl.topicId || overrides[hl.id], {
        section: hl.section,
        source: hl.source,
        text: hl.text,
      }),
      title: hl.source || 'হাইলাইট',
      body: hl.text,
      reference: hl.source,
      highlightColor: hl.color,
      highlightNote: hl.note,
      pinned: Boolean(pinnedMap[hl.id]),
      createdAt: hl.createdAt || 0,
      updatedAt: hl.createdAt || 0,
      rawHighlight: hl,
    });
  });

  // 4. Unified Bookmarks (Quran, Hadith, Seerat, Sahaba, Gotro, Custom)
  getAllUnifiedBookmarks().forEach((bm) => {
    entries.push({
      id: bm.id,
      origin: 'bookmark',
      displayKind: 'bookmark',
      topicId: normalizeTopic(bm.topicId, {
        kind: bm.kind,
        source: bm.sourceLabel,
        title: bm.title,
        text: bm.subtitle,
      }),
      title: bm.title,
      body: bm.subtitle,
      arabic: bm.arabic,
      reference: bm.sourceLabel,
      pinned: Boolean(pinnedMap[bm.id]),
      createdAt: bm.timestamp || 0,
      updatedAt: bm.timestamp || 0,
      rawBookmark: bm,
    });
  });

  return entries.sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return (b.updatedAt || b.createdAt || 0) - (a.updatedAt || a.createdAt || 0);
  });
}

export interface SavedLibrarySummary {
  totalItems: number;
  activeTopicCount: number;
  bookmarksCount: number;
  highlightsCount: number;
  notesAndVaultCount: number;
}

export function getSavedLibrarySummary(): SavedLibrarySummary {
  const entries = getAllSavedNormalizedEntries();
  const activeTopics = new Set(entries.map((e) => e.topicId));
  let bookmarksCount = 0;
  let highlightsCount = 0;
  let notesAndVaultCount = 0;

  entries.forEach((e) => {
    if (e.origin === 'bookmark') bookmarksCount += 1;
    else if (e.origin === 'highlight') highlightsCount += 1;
    else notesAndVaultCount += 1;
  });

  return {
    totalItems: entries.length,
    activeTopicCount: activeTopics.size,
    bookmarksCount,
    highlightsCount,
    notesAndVaultCount,
  };
}

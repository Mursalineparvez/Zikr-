/**
 * Persistent storage and aggregation utilities for Saved Items:
 * Bookmarks, Highlights, and Notes.
 */

export type HighlightColor = 'amber' | 'emerald' | 'rose' | 'teal';

export interface SavedHighlight {
  id: string;
  text: string;
  source: string;
  color: HighlightColor;
  createdAt: number;
  section?: string;
  itemKey?: string;
  note?: string;
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

export interface SavedNote {
  id: string;
  title: string;
  content: string;
  source?: string;
  createdAt: number;
  updatedAt: number;
}

export interface SavedCustomBookmark {
  id: string;
  title: string;
  subtitle?: string;
  source: string;
  createdAt: number;
}

export interface UnifiedBookmarkItem {
  id: string;
  kind: 'quran' | 'sahaba' | 'gotro' | 'custom';
  title: string;
  arabic?: string;
  subtitle: string;
  sourceLabel: string;
  timestamp: number;
  rawId?: string | number;
  surahNumber?: number;
  ayahNumber?: number;
}

const HIGHLIGHTS_KEY = 'zikrplus_saved_highlights';
const NOTES_KEY = 'zikrplus_saved_notes';
const CUSTOM_BOOKMARKS_KEY = 'zikrplus_saved_bookmarks';

function notifySavedUpdated() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('zikrplus-saved-updated'));
  }
}

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

  // If itemKey matches or exact same text+source exists, update in-place instead of creating duplicates
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
    };
    const next = [...existingList];
    next[existingIdx] = updated;
    writeHighlights(next);
    return updated;
  }

  const item: SavedHighlight = {
    id: `hl_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    text: trimmedText,
    source: trimmedSource,
    color,
    createdAt: Date.now(),
    ...(options?.section ? { section: options.section } : {}),
    ...(options?.itemKey ? { itemKey: options.itemKey } : {}),
    ...(options?.note?.trim() ? { note: options.note.trim() } : {}),
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
  existingId?: string
): SavedNote {
  const now = Date.now();
  const notes = getSavedNotes();
  let saved: SavedNote;

  if (existingId) {
    const idx = notes.findIndex((n) => n.id === existingId);
    if (idx >= 0) {
      saved = {
        ...notes[idx],
        title: title.trim() || 'Untitled Note',
        content: content.trim(),
        source: source.trim() || undefined,
        updatedAt: now,
      };
      notes[idx] = saved;
    } else {
      saved = {
        id: existingId,
        title: title.trim() || 'Untitled Note',
        content: content.trim(),
        source: source.trim() || undefined,
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
      createdAt: now,
      updatedAt: now,
    };
    notes.unshift(saved);
  }

  try {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    notifySavedUpdated();
  } catch {}
  return saved;
}

export function removeSavedNote(id: string): void {
  const next = getSavedNotes().filter((n) => n.id !== id);
  try {
    localStorage.setItem(NOTES_KEY, JSON.stringify(next));
    notifySavedUpdated();
  } catch {}
}

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
  source = 'Saved'
): SavedCustomBookmark {
  const item: SavedCustomBookmark = {
    id: `bm_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    title: title.trim(),
    subtitle: subtitle.trim() || undefined,
    source: source.trim() || 'Saved',
    createdAt: Date.now(),
  };
  const next = [item, ...getCustomBookmarks()];
  try {
    localStorage.setItem(CUSTOM_BOOKMARKS_KEY, JSON.stringify(next));
    notifySavedUpdated();
  } catch {}
  return item;
}

export function getAllUnifiedBookmarks(): UnifiedBookmarkItem[] {
  const list: UnifiedBookmarkItem[] = [];

  // 1. Quran bookmarks
  try {
    const rawQuran = localStorage.getItem('noor_quran_bookmarks');
    if (rawQuran) {
      const parsed = JSON.parse(rawQuran);
      if (Array.isArray(parsed)) {
        parsed.forEach((b: any) => {
          list.push({
            id: `quran_${b.surahNumber}_${b.ayahNumber}`,
            kind: 'quran',
            title: `${b.surahName || `Surah ${b.surahNumber}`} • Ayah ${b.ayahNumber}`,
            arabic: b.arabic,
            subtitle: b.translation || '',
            sourceLabel: 'Al-Quran',
            timestamp: b.timestamp || Date.now(),
            surahNumber: b.surahNumber,
            ayahNumber: b.ayahNumber,
          });
        });
      }
    }
  } catch {}

  // 2. Sahaba bookmarks
  try {
    const rawSahaba = localStorage.getItem('zikr_sahaba_bookmarks');
    if (rawSahaba) {
      const parsed = JSON.parse(rawSahaba);
      if (Array.isArray(parsed)) {
        parsed.forEach((id: string) => {
          list.push({
            id: `sahaba_${id}`,
            kind: 'sahaba',
            title: id.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
            subtitle: 'Hayatus Sahaba Biography',
            sourceLabel: 'Hayatus Sahaba',
            timestamp: 0,
            rawId: id,
          });
        });
      }
    }
  } catch {}

  // 3. Arab Tribes bookmarks
  try {
    const rawGotro = localStorage.getItem('zikrmate_araber_gotro_bookmarks');
    if (rawGotro) {
      const parsed = JSON.parse(rawGotro);
      if (parsed && typeof parsed === 'object') {
        Object.entries(parsed).forEach(([id, active]) => {
          if (active) {
            list.push({
              id: `gotro_${id}`,
              kind: 'gotro',
              title: id.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
              subtitle: 'Arab Tribes & Personalities',
              sourceLabel: 'Arab Tribes',
              timestamp: 0,
              rawId: id,
            });
          }
        });
      }
    }
  } catch {}

  // 4. Custom saved bookmarks
  getCustomBookmarks().forEach((b) => {
    list.push({
      id: b.id,
      kind: 'custom',
      title: b.title,
      subtitle: b.subtitle || b.source,
      sourceLabel: b.source || 'Saved',
      timestamp: b.createdAt,
      rawId: b.id,
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

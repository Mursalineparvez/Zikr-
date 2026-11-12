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
}

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
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function addSavedHighlight(
  text: string,
  source = 'Commentary',
  color: HighlightColor = 'amber'
): SavedHighlight {
  const item: SavedHighlight = {
    id: `hl_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    text: text.trim(),
    source: source.trim() || 'Commentary',
    color,
    createdAt: Date.now(),
  };
  const next = [item, ...getSavedHighlights()];
  try {
    localStorage.setItem(HIGHLIGHTS_KEY, JSON.stringify(next));
    notifySavedUpdated();
  } catch {}
  return item;
}

export function removeSavedHighlight(id: string): void {
  const next = getSavedHighlights().filter((h) => h.id !== id);
  try {
    localStorage.setItem(HIGHLIGHTS_KEY, JSON.stringify(next));
    notifySavedUpdated();
  } catch {}
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

import React, { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check, Highlighter, MessageSquarePlus, Trash2, X } from 'lucide-react';
import { ThemeMode, ZikrLanguage } from '../types';
import { soundHaptics } from '../utils/audioHaptics';
import {
  getSavedHighlights,
  HIGHLIGHT_COLOR_STYLES,
  HighlightColor,
  removeSavedHighlight,
  SavedHighlight,
  updateSavedHighlightColor,
  updateSavedHighlightNote,
} from '../utils/savedItems';

// Shared module-level cache so 200+ cards read highlights in O(1) without repeated JSON.parse
let cachedHighlights: SavedHighlight[] | null = null;
let cachedByItemKey: Record<string, SavedHighlight> = {};
const listeners = new Set<() => void>();
let globalBound = false;

function rebuildCache() {
  const list = getSavedHighlights();
  cachedHighlights = list;
  const map: Record<string, SavedHighlight> = {};
  for (const h of list) {
    if (h.itemKey) {
      map[h.itemKey] = h;
    }
  }
  cachedByItemKey = map;
}

function ensureGlobalListeners() {
  if (globalBound || typeof window === 'undefined') return;
  globalBound = true;
  const onUpdate = () => {
    rebuildCache();
    listeners.forEach((cb) => cb());
  };
  window.addEventListener('zikrplus-saved-updated', onUpdate);
  window.addEventListener('storage', onUpdate);
}

export function useSavedHighlightsStore() {
  const [, setTick] = useState(0);

  useEffect(() => {
    ensureGlobalListeners();
    if (cachedHighlights === null) rebuildCache();
    const cb = () => setTick((t) => t + 1);
    listeners.add(cb);
    return () => {
      listeners.delete(cb);
    };
  }, []);

  if (cachedHighlights === null) {
    rebuildCache();
  }

  return {
    highlights: cachedHighlights || [],
    byItemKey: cachedByItemKey,
  };
}

interface MatchSegment {
  text: string;
  highlight?: SavedHighlight;
}

function splitTextWithHighlights(rawText: string, candidates: SavedHighlight[]): MatchSegment[] {
  const text = typeof rawText === 'string' ? rawText : String(rawText ?? '');
  if (!text || candidates.length === 0) return [{ text }];

  // Sort longest snippet first so longer phrases win cleanly
  const sorted = [...candidates]
    .filter((h) => h && typeof h.text === 'string' && h.text.length >= 2 && h.text.length <= text.length + 10)
    .sort((a, b) => b.text.length - a.text.length);

  if (sorted.length === 0) return [{ text }];

  type Span = { start: number; end: number; highlight: SavedHighlight };
  const spans: Span[] = [];

  for (const hl of sorted) {
    const snippet = hl.text;
    if (!snippet) continue;
    let searchFrom = 0;
    while (searchFrom < text.length) {
      const idx = text.indexOf(snippet, searchFrom);
      if (idx === -1) break;
      const end = idx + snippet.length;
      const overlaps = spans.some((s) => !(end <= s.start || idx >= s.end));
      if (!overlaps) {
        spans.push({ start: idx, end, highlight: hl });
      }
      searchFrom = end;
      if (spans.length >= 40) break;
    }
    if (spans.length >= 40) break;
  }

  if (spans.length === 0) return [{ text }];

  spans.sort((a, b) => a.start - b.start);
  const result: MatchSegment[] = [];
  let cursor = 0;
  for (const span of spans) {
    if (span.start > cursor) {
      result.push({ text: text.slice(cursor, span.start) });
    }
    result.push({ text: text.slice(span.start, span.end), highlight: span.highlight });
    cursor = span.end;
  }
  if (cursor < text.length) {
    result.push({ text: text.slice(cursor) });
  }
  return result;
}

interface HighlightableTextProps {
  text: string;
  section?: string;
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
  soundEnabled?: boolean;
  className?: string;
  dir?: 'rtl' | 'ltr' | 'auto';
}

export const HighlightableText: React.FC<HighlightableTextProps> = ({
  text,
  section,
  themeMode = 'day',
  selectedLanguage = 'bn',
  soundEnabled = true,
  className,
  dir,
}) => {
  const isDay = themeMode === 'day';
  const isBn = selectedLanguage === 'bn';
  const isAr = selectedLanguage === 'ar';
  const { highlights } = useSavedHighlightsStore();

  const [activePopover, setActivePopover] = useState<{
    highlight: SavedHighlight;
    rect: DOMRect;
  } | null>(null);
  const [noteDraft, setNoteDraft] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);

  const safeText = typeof text === 'string' ? text : String(text ?? '');

  const sectionSnippets = useMemo(() => {
    if (!highlights.length || !safeText) return [];
    return highlights.filter((h) => {
      if (!h || h.itemKey) return false; // Card-level marks tint the card directly
      if (typeof h.text !== 'string' || h.text.length < 2) return false;
      if (!section || !h.section) return true;
      return h.section === section;
    });
  }, [highlights, safeText, section]);

  const segments = useMemo(
    () => splitTextWithHighlights(safeText, sectionSnippets),
    [safeText, sectionSnippets]
  );

  useEffect(() => {
    if (!activePopover) return;
    const close = () => {
      setActivePopover(null);
      setShowNoteInput(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('scroll', close, { passive: true });
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('scroll', close);
      window.removeEventListener('keydown', onKey);
    };
  }, [activePopover]);

  const handleMarkClick = (e: React.MouseEvent, hl: SavedHighlight) => {
    e.stopPropagation();
    const sel = window.getSelection()?.toString().trim();
    if (sel && sel.length >= 2) return; // Let user finish selecting text if dragging
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setNoteDraft(hl.note || '');
    setShowNoteInput(Boolean(hl.note));
    setActivePopover({ highlight: hl, rect });
    if (soundEnabled) soundHaptics.playTap();
  };

  const renderPopover = () => {
    if (!activePopover || typeof document === 'undefined') return null;
    const { highlight, rect } = activePopover;
    const winW = window.innerWidth;
    const width = Math.min(280, winW - 24);
    const left = Math.max(12, Math.min(winW - width - 12, rect.left + rect.width / 2 - width / 2));
    const placeAbove = rect.top > 180;

    return createPortal(
      <div data-no-highlight="true">
        <div
          className="fixed inset-0 z-[9990] bg-transparent"
          onClick={(e) => {
            e.stopPropagation();
            setActivePopover(null);
            setShowNoteInput(false);
          }}
        />
        <div
          style={{
            position: 'fixed',
            left: `${left}px`,
            width: `${width}px`,
            ...(placeAbove
              ? { top: `${rect.top - 8}px`, transform: 'translateY(-100%)' }
              : { top: `${rect.bottom + 8}px` }),
          }}
          onClick={(e) => e.stopPropagation()}
          className={`z-[9995] rounded-2xl border p-3 shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-150 ${
            isDay
              ? 'bg-white/98 border-slate-200 text-slate-900 shadow-slate-900/15'
              : 'bg-[#092028]/98 border-[#1d5461] text-white shadow-black/70'
          }`}
        >
          <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-black/10 dark:border-white/10">
            <div className="flex items-center gap-1.5 text-[11px] font-bold">
              <Highlighter className="w-3.5 h-3.5 text-amber-500" />
              <span>{isBn ? 'হাইলাইট এডিট' : isAr ? 'تعديل التمييز' : 'Edit Highlight'}</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setActivePopover(null);
                setShowNoteInput(false);
              }}
              className="p-1 rounded-lg opacity-60 hover:opacity-100 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {(['amber', 'emerald', 'rose', 'teal'] as HighlightColor[]).map((c) => {
                const st = HIGHLIGHT_COLOR_STYLES[c];
                const active = highlight.color === c;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      updateSavedHighlightColor(highlight.id, c);
                      setActivePopover({ ...activePopover, highlight: { ...highlight, color: c } });
                      if (soundEnabled) soundHaptics.playTap();
                    }}
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition cursor-pointer active:scale-90 border-2 ${
                      st.dotClass
                    } ${active ? 'border-slate-900 dark:border-white scale-110 shadow-md' : 'border-transparent opacity-80 hover:opacity-100'}`}
                    title={isBn ? st.labelBn : isAr ? st.labelAr : st.labelEn}
                  >
                    {active && <Check className="w-3.5 h-3.5 text-white drop-shadow" />}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setShowNoteInput((v) => !v)}
                className={`p-1.5 rounded-xl border text-xs cursor-pointer transition ${
                  showNoteInput || highlight.note
                    ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-600 dark:text-emerald-300'
                    : 'border-black/10 dark:border-white/10 opacity-75 hover:opacity-100'
                }`}
                title={isBn ? 'নোট যোগ করুন' : 'Add Note'}
              >
                <MessageSquarePlus className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => {
                  removeSavedHighlight(highlight.id);
                  setActivePopover(null);
                  setShowNoteInput(false);
                  if (soundEnabled) soundHaptics.playTap();
                }}
                className="p-1.5 rounded-xl border border-rose-500/25 bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 cursor-pointer transition"
                title={isBn ? 'হাইলাইট মুছুন' : 'Remove Highlight'}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {showNoteInput && (
            <div className="mt-2.5 pt-2 border-t border-black/10 dark:border-white/10 flex items-center gap-1.5">
              <input
                type="text"
                value={noteDraft}
                onChange={(e) => setNoteDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    updateSavedHighlightNote(highlight.id, noteDraft);
                    setActivePopover(null);
                  }
                }}
                placeholder={isBn ? 'ছোট নোট লিখুন...' : 'Write a short note...'}
                className={`flex-1 min-w-0 px-2.5 py-1.5 rounded-xl border text-xs focus:outline-none ${
                  isDay ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-[#05151b] border-[#1d5461] text-white'
                }`}
              />
              <button
                type="button"
                onClick={() => {
                  updateSavedHighlightNote(highlight.id, noteDraft);
                  setActivePopover(null);
                  if (soundEnabled) soundHaptics.playMilestone();
                }}
                className="px-2.5 py-1.5 rounded-xl bg-[#006747] text-white text-xs font-bold cursor-pointer active:scale-95"
              >
                {isBn ? 'সেভ' : 'Save'}
              </button>
            </div>
          )}
        </div>
      </div>,
      document.body
    );
  };

  if (segments.length === 1 && !segments[0].highlight) {
    return (
      <span className={className} dir={dir}>
        {safeText}
      </span>
    );
  }

  return (
    <span className={className} dir={dir}>
      {segments.map((seg, idx) => {
        if (!seg.highlight) {
          return <React.Fragment key={idx}>{seg.text}</React.Fragment>;
        }
        const style = HIGHLIGHT_COLOR_STYLES[seg.highlight.color] || HIGHLIGHT_COLOR_STYLES.amber;
        return (
          <mark
            key={`${seg.highlight.id}_${idx}`}
            onClick={(e) => handleMarkClick(e, seg.highlight!)}
            title={
              seg.highlight.note
                ? `📝 ${seg.highlight.note}`
                : isBn
                ? 'ট্যাপ করে রঙ পরিবর্তন বা মুছুন'
                : 'Tap to change color or remove highlight'
            }
            className={`rounded px-1 py-0.5 cursor-pointer underline decoration-2 underline-offset-4 transition hover:brightness-95 ${
              isDay ? style.markDayClass : style.markNightClass
            }`}
          >
            {seg.text}
          </mark>
        );
      })}
      {renderPopover()}
    </span>
  );
};

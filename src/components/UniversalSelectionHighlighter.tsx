import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check, Copy, Highlighter, MessageSquarePlus, X } from 'lucide-react';
import { NavModule, ThemeMode, ZikrLanguage } from '../types';
import { soundHaptics } from '../utils/audioHaptics';
import { addSavedHighlight, HIGHLIGHT_COLOR_STYLES, HighlightColor } from '../utils/savedItems';
import { copyToClipboard } from '../utils/clipboard';

interface UniversalSelectionHighlighterProps {
  activeModule: NavModule;
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
  soundEnabled?: boolean;
  onHighlightSaved?: (message: string) => void;
}

const MODULE_LABELS: Record<string, { bn: string; en: string; ar: string }> = {
  quran: { bn: 'আল-কুরআন', en: 'Al-Quran', ar: 'القرآن الكريم' },
  hadith: { bn: 'হাদীস শরীফ', en: 'Hadith', ar: 'الحديث الشريف' },
  dua: { bn: 'দোয়া ও যিকির', en: 'Dua & Adhkar', ar: 'الدعاء والأذكار' },
  tafsir: { bn: 'তাফসীর ও ব্যাখ্যা', en: 'Tafsir', ar: 'التفسير' },
  kitab: { bn: 'ইসলামিক কিতাব', en: 'Islamic Books', ar: 'الكتب الإسلامية' },
  seerat_un_nabi: { bn: 'সিরাতুন নবী (সা.)', en: 'Seerat-un-Nabi', ar: 'السيرة النبوية' },
  hayatus_sahaba: { bn: 'হায়াতুস সাহাবা', en: 'Hayatus Sahaba', ar: 'حياة الصحابة' },
  history_timeline: { bn: 'ইতিহাসের পাতা', en: 'History Timeline', ar: 'التاريخ الإسلامي' },
  islamic_history_wars: { bn: 'ইসলামের ইতিহাসের যুদ্ধ', en: 'Islamic Battles', ar: 'غزوات الإسلام' },
  araber_gotro: { bn: 'আরবের গোত্র ও ব্যক্তিত্ব', en: 'Arab Tribes & Personalities', ar: 'القبائل والشخصيات' },
  nobi_24_hours: { bn: 'নবীজির ২৪ ঘণ্টা', en: 'Prophet 24 Hours', ar: '٢٤ ساعة في حياة الرسول' },
  prophets_25: { bn: 'নবী ও রাসূল', en: 'Prophets & Messengers', ar: 'الأنبياء والرسل' },
  allah_names: { bn: 'আল্লাহর ৯৯ নাম', en: '99 Names of Allah', ar: 'أسماء الله الحسنى' },
  tablig: { bn: 'দাওয়াত ও তাবলীগ', en: 'Dawat & Tabligh', ar: 'الدعوة والتبليغ' },
  namaj: { bn: 'নামাজ শিক্ষা', en: 'Prayer Guide', ar: 'تعليم الصلاة' },
  hajj_checklist: { bn: 'হজ্জ ও ওমরাহ', en: 'Hajj & Umrah', ar: 'الحج والعمرة' },
  umrah_guide: { bn: 'হজ্জ ও ওমরাহ', en: 'Hajj & Umrah', ar: 'الحج والعمرة' },
  other_hub: { bn: 'ইসলামিক হাব', en: 'Islamic Hub', ar: 'المكتبة الإسلامية' },
};

function detectContextFromNode(node: Node | null, fallbackModule: string, lang: ZikrLanguage) {
  let el: HTMLElement | null =
    node instanceof HTMLElement ? node : node?.parentElement || null;

  let detectedSection = '';
  let detectedSource = '';

  while (el) {
    if (!detectedSection && el.dataset?.highlightSection) {
      detectedSection = el.dataset.highlightSection;
    }
    if (!detectedSource && el.dataset?.highlightSource) {
      detectedSource = el.dataset.highlightSource;
    }
    if (detectedSection && detectedSource) break;
    el = el.parentElement;
  }

  const section = detectedSection || fallbackModule || 'other';
  if (detectedSource) {
    return { section, source: detectedSource };
  }

  const meta = MODULE_LABELS[section] || MODULE_LABELS[fallbackModule];
  const fallbackSource = meta
    ? lang === 'bn'
      ? meta.bn
      : lang === 'ar'
      ? meta.ar
      : meta.en
    : lang === 'bn'
    ? 'ইসলামিক পাঠ'
    : 'Islamic Reading';

  return { section, source: fallbackSource };
}

export const UniversalSelectionHighlighter: React.FC<UniversalSelectionHighlighterProps> = ({
  activeModule,
  themeMode = 'day',
  selectedLanguage = 'bn',
  soundEnabled = true,
  onHighlightSaved,
}) => {
  const isDay = themeMode === 'day';
  const isBn = selectedLanguage === 'bn';
  const isAr = selectedLanguage === 'ar';

  const [selectionState, setSelectionState] = useState<{
    text: string;
    section: string;
    source: string;
    rect: { top: number; bottom: number; left: number; width: number };
  } | null>(null);
  const [showNoteBox, setShowNoteBox] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [copied, setCopied] = useState(false);

  const debounceRef = useRef<number | null>(null);

  useEffect(() => {
    const inspectSelection = () => {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed || sel.rangeCount === 0) {
        setSelectionState(null);
        setShowNoteBox(false);
        return;
      }

      const rawText = sel.toString().trim();
      if (rawText.length < 2 || rawText.length > 2500) {
        setSelectionState(null);
        return;
      }

      // Ignore selections inside inputs, textareas, buttons, or [data-no-highlight="true"]
      const anchorEl =
        sel.anchorNode instanceof Element ? sel.anchorNode : sel.anchorNode?.parentElement;
      if (!anchorEl || typeof anchorEl.closest !== 'function') return;
      if (
        anchorEl.closest(
          'input, textarea, [contenteditable="true"], [data-no-highlight="true"]'
        )
      ) {
        return;
      }

      let rect: DOMRect;
      try {
        const range = sel.getRangeAt(0);
        rect = range.getBoundingClientRect();
      } catch {
        return;
      }
      if (!rect || (rect.width === 0 && rect.height === 0)) {
        return;
      }

      const { section, source } = detectContextFromNode(
        sel.anchorNode,
        activeModule,
        selectedLanguage
      );

      setSelectionState({
        text: rawText,
        section,
        source,
        rect: {
          top: rect.top,
          bottom: rect.bottom,
          left: rect.left,
          width: rect.width,
        },
      });
      setCopied(false);
    };

    const scheduleInspect = () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
      debounceRef.current = window.setTimeout(inspectSelection, 160);
    };

    const handleScroll = () => {
      // Keep selection cleanly aligned or dismiss when user scrolls away
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
      debounceRef.current = window.setTimeout(() => {
        const sel = window.getSelection();
        if (!sel || sel.isCollapsed) {
          setSelectionState(null);
        } else {
          inspectSelection();
        }
      }, 120);
    };

    document.addEventListener('mouseup', scheduleInspect);
    document.addEventListener('touchend', scheduleInspect);
    document.addEventListener('selectionchange', scheduleInspect);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
      document.removeEventListener('mouseup', scheduleInspect);
      document.removeEventListener('touchend', scheduleInspect);
      document.removeEventListener('selectionchange', scheduleInspect);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeModule, selectedLanguage]);

  if (!selectionState || typeof document === 'undefined') return null;

  const winW = window.innerWidth;
  const barWidth = Math.min(showNoteBox ? 320 : 295, winW - 24);
  const centerX = selectionState.rect.left + selectionState.rect.width / 2;
  const left = Math.max(12, Math.min(winW - barWidth - 12, centerX - barWidth / 2));
  const placeAbove = selectionState.rect.top > 130;

  const handleApplyHighlight = (color: HighlightColor) => {
    addSavedHighlight(selectionState.text, selectionState.source, color, {
      section: selectionState.section,
      note: showNoteBox ? noteText : undefined,
    });
    if (soundEnabled) soundHaptics.playMilestone();
    window.getSelection()?.removeAllRanges();
    setSelectionState(null);
    setShowNoteBox(false);
    setNoteText('');
    onHighlightSaved?.(
      isBn
        ? '✨ নির্বাচিত অংশ হাইলাইট ও সংরক্ষিত হয়েছে!'
        : isAr
        ? '✨ تم تمييز النص وحفظه!'
        : '✨ Highlight saved!'
    );
  };

  const handleCopy = () => {
    void copyToClipboard(selectionState.text);
    setCopied(true);
    if (soundEnabled) soundHaptics.playTap();
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return createPortal(
    <div
      data-no-highlight="true"
      style={{
        position: 'fixed',
        left: `${left}px`,
        width: `${barWidth}px`,
        ...(placeAbove
          ? { top: `${Math.max(70, selectionState.rect.top - 10)}px`, transform: 'translateY(-100%)' }
          : { top: `${Math.min(window.innerHeight - 90, selectionState.rect.bottom + 12)}px` }),
      }}
      onMouseDown={(e) => e.preventDefault()}
      onClick={(e) => e.stopPropagation()}
      className={`z-[9998] rounded-2xl border p-2.5 shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-150 ${
        isDay
          ? 'bg-white/98 border-emerald-500/30 text-slate-900 shadow-slate-900/20'
          : 'bg-[#071f26]/98 border-emerald-500/40 text-white shadow-black/80'
      }`}
    >
      <div className="flex items-center justify-between gap-2 pb-1.5 mb-2 border-b border-black/10 dark:border-white/10">
        <div className="flex items-center gap-1.5 min-w-0">
          <Highlighter className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span className="text-[11px] font-extrabold truncate">
            {isBn ? 'হাইলাইট / মার্ক' : isAr ? 'تمييز النص' : 'Highlight'} · {selectionState.source}
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            window.getSelection()?.removeAllRanges();
            setSelectionState(null);
            setShowNoteBox(false);
          }}
          className="p-0.5 rounded-lg opacity-60 hover:opacity-100 cursor-pointer shrink-0"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex items-center justify-between gap-2">
        {/* 4 Marker Color Pills */}
        <div className="flex items-center gap-2">
          {(['amber', 'emerald', 'rose', 'teal'] as HighlightColor[]).map((color) => {
            const st = HIGHLIGHT_COLOR_STYLES[color];
            return (
              <button
                key={color}
                type="button"
                onClick={() => handleApplyHighlight(color)}
                className={`w-7 h-7 rounded-full ${st.dotClass} border-2 border-white dark:border-slate-900 shadow-md transition hover:scale-115 active:scale-90 cursor-pointer`}
                title={isBn ? `${st.labelBn} রঙে হাইলাইট করুন` : `Highlight in ${st.labelEn}`}
              />
            );
          })}
        </div>

        {/* Note & Copy Quick Actions */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setShowNoteBox((v) => !v)}
            className={`px-2 py-1 rounded-xl border text-[11px] font-bold flex items-center gap-1 cursor-pointer transition ${
              showNoteBox
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-600 dark:text-emerald-300'
                : isDay
                ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                : 'bg-[#0d2d36] border-[#1b505d] text-slate-200 hover:bg-[#123c47]'
            }`}
            title={isBn ? 'নোটসহ হাইলাইট' : 'Highlight with Note'}
          >
            <MessageSquarePlus className="w-3.5 h-3.5" />
            <span>{isBn ? 'নোট' : 'Note'}</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className={`p-1.5 rounded-xl border cursor-pointer transition ${
              isDay
                ? 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                : 'bg-[#0d2d36] border-[#1b505d] text-slate-200 hover:bg-[#123c47]'
            }`}
            title={isBn ? 'কপি' : 'Copy'}
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {showNoteBox && (
        <div className="mt-2.5 pt-2 border-t border-black/10 dark:border-white/10 flex items-center gap-1.5">
          <input
            type="text"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleApplyHighlight('amber');
            }}
            placeholder={isBn ? 'নোট লিখে এন্টার বা রঙ চাপুন...' : 'Write a note & pick color...'}
            className={`flex-1 min-w-0 px-2.5 py-1.5 rounded-xl border text-xs focus:outline-none ${
              isDay ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-[#05161c] border-[#1d5461] text-white'
            }`}
          />
          <button
            type="button"
            onClick={() => handleApplyHighlight('amber')}
            className="px-2.5 py-1.5 rounded-xl bg-[#006747] text-white text-xs font-bold cursor-pointer active:scale-95 shrink-0"
          >
            {isBn ? 'সেভ' : 'Save'}
          </button>
        </div>
      )}
    </div>,
    document.body
  );
};

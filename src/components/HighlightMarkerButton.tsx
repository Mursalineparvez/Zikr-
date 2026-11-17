import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check, Highlighter, MessageSquarePlus, Trash2, X } from 'lucide-react';
import { ThemeMode, ZikrLanguage } from '../types';
import { soundHaptics } from '../utils/audioHaptics';
import {
  HIGHLIGHT_COLOR_STYLES,
  HighlightColor,
  removeItemHighlight,
  setItemHighlight,
} from '../utils/savedItems';
import { useSavedHighlightsStore } from './HighlightableText';

interface HighlightMarkerButtonProps {
  itemKey: string;
  text: string;
  source: string;
  section: string;
  selectedLanguage?: ZikrLanguage;
  themeMode?: ThemeMode;
  soundEnabled?: boolean;
  variant?: 'icon' | 'pill' | 'menu-item';
  onCloseParentMenu?: () => void;
}

export const HighlightMarkerButton: React.FC<HighlightMarkerButtonProps> = ({
  itemKey,
  text,
  source,
  section,
  selectedLanguage = 'bn',
  themeMode = 'day',
  soundEnabled = true,
  variant = 'icon',
  onCloseParentMenu,
}) => {
  const isDay = themeMode === 'day';
  const isBn = selectedLanguage === 'bn';
  const isAr = selectedLanguage === 'ar';

  const { byItemKey } = useSavedHighlightsStore();
  const existing = byItemKey[itemKey];
  const colorStyle = existing ? HIGHLIGHT_COLOR_STYLES[existing.color] : null;

  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [popoverRect, setPopoverRect] = useState<DOMRect | null>(null);
  const [noteDraft, setNoteDraft] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);

  useEffect(() => {
    if (!popoverRect) return;
    const handleScrollOrEsc = (e: Event) => {
      if (e.type === 'keydown' && (e as KeyboardEvent).key !== 'Escape') return;
      setPopoverRect(null);
      setShowNoteInput(false);
    };
    window.addEventListener('scroll', handleScrollOrEsc, { passive: true });
    window.addEventListener('keydown', handleScrollOrEsc);
    return () => {
      window.removeEventListener('scroll', handleScrollOrEsc);
      window.removeEventListener('keydown', handleScrollOrEsc);
    };
  }, [popoverRect]);

  const handleOpenPalette = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (popoverRect) {
      setPopoverRect(null);
      return;
    }
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setNoteDraft(existing?.note || '');
    setShowNoteInput(Boolean(existing?.note));
    setPopoverRect(rect);
    if (soundEnabled) soundHaptics.playTap();
  };

  const applyColor = (color: HighlightColor) => {
    setItemHighlight(itemKey, text, source, section, color, showNoteInput ? noteDraft : existing?.note);
    if (soundEnabled) soundHaptics.playMilestone();
    if (!showNoteInput) {
      setPopoverRect(null);
      onCloseParentMenu?.();
    }
  };

  const handleRemove = () => {
    removeItemHighlight(itemKey);
    if (soundEnabled) soundHaptics.playTap();
    setPopoverRect(null);
    setShowNoteInput(false);
    onCloseParentMenu?.();
  };

  const handleSaveNote = () => {
    const activeColor: HighlightColor = existing?.color || 'amber';
    setItemHighlight(itemKey, text, source, section, activeColor, noteDraft);
    if (soundEnabled) soundHaptics.playMilestone();
    setPopoverRect(null);
    setShowNoteInput(false);
    onCloseParentMenu?.();
  };

  const renderPalettePopover = () => {
    if (!popoverRect || typeof document === 'undefined') return null;
    const winW = window.innerWidth;
    const winH = window.innerHeight;
    const width = Math.min(285, winW - 24);
    const left = Math.max(12, Math.min(winW - width - 12, popoverRect.right - width));
    const placeAbove = popoverRect.top > 200 || popoverRect.bottom + 170 > winH;

    return createPortal(
      <div data-no-highlight="true">
        <div
          className="fixed inset-0 z-[9990] bg-transparent"
          onClick={(e) => {
            e.stopPropagation();
            setPopoverRect(null);
            setShowNoteInput(false);
          }}
        />
        <div
          style={{
            position: 'fixed',
            left: `${left}px`,
            width: `${width}px`,
            ...(placeAbove
              ? { top: `${popoverRect.top - 8}px`, transform: 'translateY(-100%)' }
              : { top: `${popoverRect.bottom + 8}px` }),
          }}
          onClick={(e) => e.stopPropagation()}
          className={`z-[9995] rounded-2xl border p-3 shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-150 ${
            isDay
              ? 'bg-white/98 border-slate-200 text-slate-900 shadow-slate-900/15'
              : 'bg-[#092028]/98 border-[#1d5461] text-white shadow-black/75'
          }`}
        >
          <div className="flex items-center justify-between gap-2 pb-2 mb-2.5 border-b border-black/10 dark:border-white/10">
            <div className="flex items-center gap-1.5 text-xs font-bold">
              <Highlighter className="w-3.5 h-3.5 text-amber-500" />
              <span>
                {existing
                  ? isBn ? 'হাইলাইট রঙ বদলান' : isAr ? 'تغيير لون التمييز' : 'Change Marker'
                  : isBn ? 'হাইলাইট / মার্ক করুন' : isAr ? 'تمييز وتحديد' : 'Highlight / Mark'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                setPopoverRect(null);
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
                const isSelected = existing?.color === c;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => applyColor(c)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition cursor-pointer active:scale-90 border-2 ${
                      st.dotClass
                    } ${
                      isSelected
                        ? 'border-slate-900 dark:border-white scale-110 shadow-md'
                        : 'border-transparent opacity-85 hover:opacity-100 hover:scale-105'
                    }`}
                    title={isBn ? st.labelBn : isAr ? st.labelAr : st.labelEn}
                  >
                    {isSelected && <Check className="w-4 h-4 text-white drop-shadow" />}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setShowNoteInput((v) => !v)}
                className={`p-1.5 rounded-xl border text-xs cursor-pointer transition ${
                  showNoteInput || existing?.note
                    ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-600 dark:text-emerald-300'
                    : isDay
                    ? 'border-slate-200 text-slate-600 hover:bg-slate-100'
                    : 'border-[#1d5461] text-slate-300 hover:bg-[#11333f]'
                }`}
                title={isBn ? 'নোট লিখুন' : 'Add Note'}
              >
                <MessageSquarePlus className="w-4 h-4" />
              </button>

              {existing && (
                <button
                  type="button"
                  onClick={handleRemove}
                  className="p-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 cursor-pointer transition"
                  title={isBn ? 'হাইলাইট মুছুন' : 'Remove Highlight'}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {showNoteInput && (
            <div className="mt-2.5 pt-2.5 border-t border-black/10 dark:border-white/10 flex items-center gap-1.5">
              <input
                type="text"
                value={noteDraft}
                onChange={(e) => setNoteDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveNote();
                }}
                placeholder={isBn ? 'নিজের নোট লিখুন...' : 'Write personal note...'}
                className={`flex-1 min-w-0 px-2.5 py-1.5 rounded-xl border text-xs focus:outline-none ${
                  isDay
                    ? 'bg-slate-50 border-slate-200 text-slate-900'
                    : 'bg-[#05151b] border-[#1d5461] text-white'
                }`}
              />
              <button
                type="button"
                onClick={handleSaveNote}
                className="px-3 py-1.5 rounded-xl bg-[#006747] hover:bg-[#005740] text-white text-xs font-bold cursor-pointer active:scale-95 shrink-0"
              >
                {isBn ? 'সেভ' : 'Save'}
              </button>
            </div>
          )}

          {!existing && (
            <p className="text-[10px] opacity-65 mt-2 leading-snug">
              {isBn
                ? 'টিপস: যেকোনো লাইন বা শব্দ আঙুল দিয়ে সিলেক্ট করেও হাইলাইট করতে পারবেন।'
                : 'Tip: You can also select any specific line or phrase to highlight it.'}
            </p>
          )}
        </div>
      </div>,
      document.body
    );
  };

  if (variant === 'menu-item') {
    return (
      <>
        <button
          ref={btnRef}
          type="button"
          onClick={handleOpenPalette}
          className={`w-full px-4 py-2.5 text-left flex items-center justify-between gap-2.5 cursor-pointer font-medium ${
            isDay ? 'hover:bg-slate-100' : 'hover:bg-[#152e3c]'
          }`}
        >
          <span className="flex items-center gap-2.5">
            <Highlighter className={`w-4 h-4 ${existing ? 'text-amber-500' : 'text-slate-400'}`} />
            <span>
              {existing
                ? isBn ? 'হাইলাইট / রঙ বদলান' : 'Highlighted (Edit)'
                : isBn ? 'হাইলাইট / মার্ক করুন' : 'Highlight / Mark'}
            </span>
          </span>
          {colorStyle && <span className={`w-2.5 h-2.5 rounded-full ${colorStyle.dotClass}`} />}
        </button>
        {renderPalettePopover()}
      </>
    );
  }

  if (variant === 'pill') {
    return (
      <>
        <button
          ref={btnRef}
          type="button"
          onClick={handleOpenPalette}
          className={`px-2.5 py-1.5 rounded-xl border text-[11px] font-bold flex items-center gap-1.5 transition cursor-pointer active:scale-95 shadow-sm ${
            colorStyle
              ? isDay
                ? colorStyle.badgeDayClass
                : colorStyle.badgeNightClass
              : isDay
              ? 'bg-amber-50/70 border-amber-200 text-amber-900 hover:bg-amber-100'
              : 'bg-amber-500/10 border-amber-500/30 text-amber-200 hover:bg-amber-500/20'
          }`}
          title={isBn ? 'হাইলাইট বা মার্ক করুন' : 'Highlight or Mark'}
        >
          {colorStyle ? (
            <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${colorStyle.dotClass}`} />
          ) : (
            <Highlighter className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          )}
          <span>
            {existing
              ? isBn ? 'মার্ক করা' : isAr ? 'مميز' : 'Marked'
              : isBn ? 'হাইলাইট' : isAr ? 'تمييز' : 'Highlight'}
          </span>
        </button>
        {renderPalettePopover()}
      </>
    );
  }

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={handleOpenPalette}
        className={`p-1.5 sm:p-2 rounded-xl border transition active:scale-90 cursor-pointer flex items-center justify-center relative ${
          colorStyle
            ? isDay
              ? colorStyle.badgeDayClass
              : colorStyle.badgeNightClass
            : isDay
            ? 'bg-[#f0f7f6] hover:bg-amber-50 text-[#507579] hover:text-amber-700 border-[#d2ece9]'
            : 'bg-[#0a262c] hover:bg-[#123e47] text-teal-300 hover:text-amber-300 border-[#184850]'
        }`}
        title={
          existing
            ? isBn ? 'হাইলাইট সম্পাদনা / মুছুন' : 'Edit / Remove Highlight'
            : isBn ? 'হাইলাইট / মার্ক করুন' : 'Highlight / Mark'
        }
      >
        <Highlighter className="w-4 h-4" />
        {colorStyle && (
          <span
            className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border border-white dark:border-slate-900 ${colorStyle.dotClass}`}
          />
        )}
      </button>
      {renderPalettePopover()}
    </>
  );
};

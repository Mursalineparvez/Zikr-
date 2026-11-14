import React from 'react';
import { ChevronLeft, ChevronRight, ArrowLeftRight } from 'lucide-react';
import { ThemeMode, ZikrLanguage } from '../types';

interface SwipeFloatingFeedbackProps {
  swipeDirection: 'left' | 'right' | null;
  isReadyToTrigger: boolean;
  canSwipeLeft: boolean;
  canSwipeRight: boolean;
  nextLabel?: string;
  prevLabel?: string;
  selectedLanguage?: ZikrLanguage;
}

export const SwipeFloatingFeedback: React.FC<SwipeFloatingFeedbackProps> = ({
  swipeDirection,
  isReadyToTrigger,
  canSwipeLeft,
  canSwipeRight,
  nextLabel,
  prevLabel,
  selectedLanguage = 'bn',
}) => {
  if (!swipeDirection) return null;

  const isNext = swipeDirection === 'left';
  const canNavigate = isNext ? canSwipeLeft : canSwipeRight;
  const label = isNext ? nextLabel : prevLabel;
  const fallbackEnd =
    selectedLanguage === 'bn'
      ? isNext
        ? 'শেষ অধ্যায়'
        : 'প্রথম অধ্যায়'
      : selectedLanguage === 'ar'
      ? isNext
        ? 'النهاية'
        : 'البداية'
      : isNext
      ? 'Last item'
      : 'First item';

  return (
    <div
      className={`fixed top-1/2 -translate-y-1/2 z-50 pointer-events-none transition-all duration-150 ${
        isNext ? 'right-3' : 'left-3'
      }`}
    >
      <div
        className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl shadow-2xl border backdrop-blur-md text-xs font-extrabold transition-transform ${
          !canNavigate
            ? 'bg-slate-800/85 text-slate-300 border-slate-600/40 scale-95'
            : isReadyToTrigger
            ? 'bg-emerald-600 text-white border-emerald-300 scale-105'
            : 'bg-slate-900/90 text-emerald-200 border-emerald-500/40 scale-95'
        }`}
      >
        {!isNext && <ChevronLeft className="w-4 h-4 shrink-0" />}
        <div className="max-w-[170px] truncate">
          {canNavigate
            ? label || (isNext ? (selectedLanguage === 'bn' ? 'পরবর্তী' : 'Next') : (selectedLanguage === 'bn' ? 'পূর্ববর্তী' : 'Previous'))
            : fallbackEnd}
        </div>
        {isNext && <ChevronRight className="w-4 h-4 shrink-0" />}
      </div>
    </div>
  );
};

interface QuickReaderSwitcherStripProps {
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
  prevLabel?: string | null;
  nextLabel?: string | null;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export const QuickReaderSwitcherStrip: React.FC<QuickReaderSwitcherStripProps> = ({
  themeMode = 'night',
  selectedLanguage = 'bn',
  prevLabel,
  nextLabel,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}) => {
  const isDay = themeMode === 'day';

  return (
    <div
      className={`px-2.5 py-1.5 rounded-xl border flex items-center justify-between gap-2 text-[11px] font-bold transition-colors ${
        isDay
          ? 'bg-emerald-50/80 border-emerald-200/80 text-emerald-900'
          : 'bg-[#082228]/80 border-teal-900/50 text-emerald-200'
      }`}
    >
      <button
        type="button"
        disabled={!hasPrev}
        onClick={onPrev}
        className={`flex items-center gap-1 px-2 py-1 rounded-lg transition max-w-[36%] cursor-pointer ${
          hasPrev
            ? isDay
              ? 'hover:bg-emerald-100 active:scale-95 text-emerald-800'
              : 'hover:bg-teal-900/50 active:scale-95 text-emerald-300'
            : 'opacity-35 cursor-not-allowed'
        }`}
      >
        <ChevronLeft className="w-3.5 h-3.5 shrink-0" />
        <span className="truncate">
          {prevLabel || (selectedLanguage === 'bn' ? 'পূর্ববর্তী' : 'Prev')}
        </span>
      </button>

      <div className="flex items-center gap-1 opacity-65 shrink-0 select-none text-[10px]">
        <ArrowLeftRight className="w-3 h-3" />
        <span className="hidden xs:inline sm:inline">
          {selectedLanguage === 'bn'
            ? 'বাম/ডান সোয়াইপ করুন'
            : selectedLanguage === 'ar'
            ? 'اسحب يميناً أو يساراً'
            : 'Swipe Left / Right'}
        </span>
      </div>

      <button
        type="button"
        disabled={!hasNext}
        onClick={onNext}
        className={`flex items-center gap-1 px-2 py-1 rounded-lg transition max-w-[36%] cursor-pointer ${
          hasNext
            ? isDay
              ? 'hover:bg-emerald-100 active:scale-95 text-emerald-800'
              : 'hover:bg-teal-900/50 active:scale-95 text-emerald-300'
            : 'opacity-35 cursor-not-allowed'
        }`}
      >
        <span className="truncate">
          {nextLabel || (selectedLanguage === 'bn' ? 'পরবর্তী' : 'Next')}
        </span>
        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
      </button>
    </div>
  );
};

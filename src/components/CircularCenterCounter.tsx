import React from 'react';
import { RotateCcw, BookmarkPlus, Sparkles, CheckCircle2 } from 'lucide-react';
import { ThemeMode } from '../types';

interface CircularCenterCounterProps {
  totalCount: number;
  dailyCount?: number;
  totalZikrs: number;
  completedGoals: number;
  onGlobalReset: () => void;
  onSaveSession: () => void;
  themeMode?: ThemeMode;
}

export const CircularCenterCounter: React.FC<CircularCenterCounterProps> = ({
  totalCount,
  dailyCount,
  totalZikrs,
  completedGoals,
  onGlobalReset,
  onSaveSession,
  themeMode = 'day',
}) => {
  const isDay = themeMode === 'day';
  const effectiveDaily = typeof dailyCount === 'number' ? dailyCount : totalCount;

  return (
    <section
      className={`relative overflow-hidden rounded-[28px] transition-colors duration-300 p-6 sm:p-8 flex flex-col items-center justify-center text-center shadow-xl ${
        isDay
          ? 'bg-white border border-[#d6e8e5] shadow-[#135d66]/5'
          : 'bg-[#0e2f36] border border-[#1a515c] shadow-[#082024]/60'
      }`}
    >
      {/* Decorative ambient flares */}
      <div
        className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none ${
          isDay ? 'bg-teal-500/10' : 'bg-teal-400/15'
        }`}
      />
      <div
        className={`absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl pointer-events-none ${
          isDay ? 'bg-amber-400/10' : 'bg-amber-400/10'
        }`}
      />

      {/* Top Quranic Bismillah & Subtitle */}
      <div className="relative z-10 mb-2 space-y-1">
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-1 ${
            isDay
              ? 'bg-[#e6f3f2] text-[#1c6469] border border-[#cbe4e1]'
              : 'bg-[#0a262c] text-[#2dd4bf] border border-[#184850]'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full animate-pulse ${
              isDay ? 'bg-[#1c6469]' : 'bg-[#2dd4bf]'
            }`}
          />
          <span>Central Master Counter • সর্বমোট তাসবীহ</span>
        </div>

        <div
          dir="rtl"
          className={`font-arabic text-2xl sm:text-3xl font-bold tracking-wide select-none ${
            isDay ? 'text-[#164e52]' : 'text-[#2dd4bf]'
          }`}
        >
          بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </div>
        <p className={`text-xs ${isDay ? 'text-[#4e7478]' : 'text-[#90b8be]'}`}>
          সকল সক্রিয় যিকিরের তাৎক্ষণিক সর্বমোট সমষ্টি (Real-time aggregate total)
        </p>
      </div>

      {/* Large Circular Center Dial */}
      <div className="relative z-10 my-3 flex items-center justify-center">
        {/* Outer Halo with Teal/Emerald Gradient */}
        <div
          className={`relative w-56 h-56 sm:w-64 sm:h-64 rounded-full p-2.5 transition-all shadow-2xl flex items-center justify-center ${
            isDay
              ? 'bg-gradient-to-tr from-[#164e52] via-[#247b82] to-[#3aa2aa] shadow-[#135d66]/20'
              : 'bg-gradient-to-tr from-[#144d52] via-[#1c6469] to-[#2dd4bf] shadow-[#082024]/80'
          }`}
        >
          {/* Inner Circular Face */}
          <div
            className={`w-full h-full rounded-full flex flex-col items-center justify-center p-4 relative shadow-inner ${
              isDay
                ? 'bg-[#edf5f4] border-2 border-white'
                : 'bg-gradient-to-b from-[#092226] via-[#0d2d33] to-[#092226] border border-[#1a4a52]'
            }`}
          >
            {/* Decorative dashed bead orbit */}
            <div
              className={`absolute inset-2 border border-dashed rounded-full pointer-events-none ${
                isDay ? 'border-teal-400/40' : 'border-[#2dd4bf]/30'
              }`}
            />

            <span
              className={`text-[11px] font-bold uppercase tracking-widest mb-1 flex items-center gap-1 ${
                isDay ? 'text-[#1c6469]' : 'text-[#2dd4bf]'
              }`}
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>সর্বমোট তাসবীহ গণনা</span>
            </span>

            {/* Giant Digits */}
            <div
              className={`text-5xl sm:text-6xl font-black tracking-tight font-sans drop-shadow-md select-none transition-transform duration-150 ${
                isDay ? 'text-[#103e42]' : 'text-white'
              }`}
            >
              {totalCount.toLocaleString()}
            </div>

            <span
              className={`text-[11px] font-medium mt-1 ${
                isDay ? 'text-[#4e7478]' : 'text-[#90b8be]'
              }`}
            >
              Master Tasbeeh Count
            </span>

            {/* Inset Sub-metrics pill */}
            <div className="mt-2 flex flex-col items-center gap-1">
              <div
                className={`flex items-center gap-2 text-[10px] px-3 py-1 rounded-full font-semibold border ${
                  isDay
                    ? 'bg-white text-[#1c6469] border-[#d2ece9] shadow-sm'
                    : 'bg-[#0a262c] text-[#86b5bc] border-[#184850]'
                }`}
              >
                <span>আজকের জিকির: <strong className="text-emerald-500 font-mono">{effectiveDaily.toLocaleString()}</strong></span>
                <span>•</span>
                <span className={isDay ? 'text-amber-600 font-bold' : 'text-amber-300 font-bold'}>
                  {completedGoals} Goals Met
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Controls beneath Circular Counter */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 mt-3">
        {/* Save Current Session to History */}
        <button
          type="button"
          onClick={onSaveSession}
          title="Save this count snapshot into History log"
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold shadow-md transition active:scale-95 cursor-pointer bg-[#1c6469] hover:bg-[#154f53] text-white shadow-[#135d66]/20 border border-teal-400/30"
        >
          <BookmarkPlus className="w-4 h-4 text-teal-200" />
          <span>Save Session to History</span>
        </button>

        {/* Global Reset */}
        <button
          type="button"
          onClick={onGlobalReset}
          title="Reset all counters to 0"
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-semibold transition active:scale-95 cursor-pointer border ${
            isDay
              ? 'bg-white hover:bg-red-50 text-red-600 border-red-200 shadow-sm'
              : 'bg-[#221215] hover:bg-red-950/60 text-red-300 border-red-900/50'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset All</span>
        </button>
      </div>
    </section>
  );
};

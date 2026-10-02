import React from 'react';
import { RotateCcw, CheckCircle2 } from 'lucide-react';
import { ZikrLanguage } from '../types';
import { ZIKIR_UI } from '../utils/appTranslations';

interface MasterCounterProps {
  totalCount: number;
  totalZikrs: number;
  completedGoals: number;
  onGlobalReset: () => void;
  selectedLanguage?: ZikrLanguage;
}

export const MasterCounter: React.FC<MasterCounterProps> = ({
  totalCount,
  totalZikrs,
  completedGoals,
  onGlobalReset,
  selectedLanguage = 'bn',
}) => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 border border-emerald-600/30 p-6 sm:p-8 shadow-2xl shadow-emerald-950/60">
      {/* Decorative ambient background flares */}
      <div className="absolute -right-16 -top-16 w-56 h-56 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-16 -bottom-16 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Left Side: Calligraphy & Description */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{ZIKIR_UI.centralMasterCounter[selectedLanguage] || 'Central Master Counter'}</span>
          </div>

          <div className="font-arabic text-2xl sm:text-3xl text-amber-200/90 font-bold tracking-wide">
            بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </div>

          <p className="text-xs sm:text-sm text-slate-300 max-w-lg leading-relaxed">
            {ZIKIR_UI.realtimeSubtitle[selectedLanguage] ||
              'Real-time aggregate total across all your active individual Zikr beads. All counts persist safely in your browser storage.'}
          </p>

          <div className="flex items-center gap-4 pt-1 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>
                {selectedLanguage === 'bn' ? 'কাউন্টার:' : 'Counters:'}{' '}
                <strong className="text-white">{totalZikrs}</strong>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                {ZIKIR_UI.goalsMet[selectedLanguage] || 'Goals Met'}:{' '}
                <strong className="text-amber-300">{completedGoals}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Giant Master Digits & Global Reset Action */}
        <div className="flex items-center justify-between sm:justify-end gap-5 bg-slate-950/70 p-4 sm:p-5 rounded-2xl border border-emerald-800/40 backdrop-blur-md">
          <div className="text-right">
            <div className="text-4xl sm:text-6xl font-black text-amber-300 tracking-tight font-sans">
              {totalCount.toLocaleString()}
            </div>
            <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest mt-1">
              {ZIKIR_UI.masterTasbeehCount[selectedLanguage] || 'Grand Total'}
            </div>
          </div>

          <div className="h-12 w-px bg-slate-800" />

          {/* Global Reset Button with Confirmation Prompt */}
          <button
            onClick={onGlobalReset}
            title={ZIKIR_UI.resetAll[selectedLanguage] || 'Reset All'}
            className="group flex flex-col items-center justify-center p-3 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-800/40 text-red-300 hover:text-red-100 transition active:scale-95 cursor-pointer"
            aria-label="Global Reset All Counters"
          >
            <RotateCcw className="w-5 h-5 mb-1 group-hover:-rotate-45 transition-transform duration-200" />
            <span className="text-[10px] font-bold uppercase tracking-wider">
              {ZIKIR_UI.resetAll[selectedLanguage] || 'Reset All'}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

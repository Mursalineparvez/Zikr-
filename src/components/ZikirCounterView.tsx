import React, { useState, useEffect, useRef } from 'react';
import { ZikrItem, ThemeMode, ZikrLanguage } from '../types';
import { CircularCenterCounter } from './CircularCenterCounter';
import { ZikrCard } from './ZikrCard';
import { Plus, FileText, CheckCircle2, Target, RotateCcw, ChevronUp, Sparkles } from 'lucide-react';
import { ZIKIR_UI } from '../utils/appTranslations';

interface ZikirCounterViewProps {
  masterTotal: number;
  dailyTotal?: number;
  zikrs: ZikrItem[];
  completedGoals: number;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onReset: (zikr: ZikrItem) => void;
  onDelete: (zikr: ZikrItem) => void;
  onEdit: (zikr: ZikrItem) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onGlobalReset: () => void;
  onSaveSession: () => void;
  onOpenAddModal: () => void;
  onRestoreDefaults: () => void;
  onExportPdf: () => void;
  isExportingPdf: boolean;
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
}

export const ZikirCounterView: React.FC<ZikirCounterViewProps> = ({
  masterTotal,
  dailyTotal,
  zikrs,
  completedGoals,
  onIncrement,
  onDecrement,
  onReset,
  onDelete,
  onEdit,
  onMoveUp,
  onMoveDown,
  onGlobalReset,
  onSaveSession,
  onOpenAddModal,
  onRestoreDefaults,
  onExportPdf,
  isExportingPdf,
  themeMode = 'night',
  selectedLanguage = 'bn',
}) => {
  const isDay = themeMode === 'day';
  const [filterMode, setFilterMode] = useState<'all' | 'targets' | 'completed'>('all');
  const [showFloatingCounter, setShowFloatingCounter] = useState(false);
  const [isFloatingPopping, setIsFloatingPopping] = useState(false);
  const [floatingParticles, setFloatingParticles] = useState<{ id: number; text: string }[]>([]);
  const prevMasterRef = useRef(masterTotal);

  // Monitor scroll position to show/hide floating circular popup
  useEffect(() => {
    const handleScroll = () => {
      const topDial = document.getElementById('main-circular-center-counter');
      if (topDial) {
        const rect = topDial.getBoundingClientRect();
        // If bottom of top dial is scrolled past the top of the viewport
        setShowFloatingCounter(rect.bottom < 120);
      } else {
        setShowFloatingCounter(window.scrollY > 250);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Pop-up bounce effect on floating dial when masterTotal increments
  useEffect(() => {
    if (masterTotal > prevMasterRef.current) {
      setIsFloatingPopping(true);
      const newId = Date.now();
      setFloatingParticles((prev) => [...prev.slice(-3), { id: newId, text: '+1' }]);

      const timer = setTimeout(() => {
        setIsFloatingPopping(false);
      }, 350);

      const partTimer = setTimeout(() => {
        setFloatingParticles((prev) => prev.filter((p) => p.id !== newId));
      }, 700);

      prevMasterRef.current = masterTotal;
      return () => {
        clearTimeout(timer);
        clearTimeout(partTimer);
      };
    }
    prevMasterRef.current = masterTotal;
  }, [masterTotal]);

  const scrollToTopDial = () => {
    const topDial = document.getElementById('main-circular-center-counter');
    if (topDial) {
      topDial.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const filteredZikrs = zikrs.filter((z) => {
    if (filterMode === 'targets') return z.target && z.target > 0;
    if (filterMode === 'completed') return z.target && z.count >= z.target;
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300 relative">
      {/* Center: Dedicated Circular Master Total Counter */}
      <CircularCenterCounter
        totalCount={masterTotal}
        dailyCount={dailyTotal}
        totalZikrs={zikrs.length}
        completedGoals={completedGoals}
        onGlobalReset={onGlobalReset}
        onSaveSession={onSaveSession}
        themeMode={themeMode}
        selectedLanguage={selectedLanguage}
      />

      {/* Category Pills & Action Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <h2
              className={`text-base font-bold tracking-tight flex items-center gap-2 ${
                isDay ? 'text-[#103e42]' : 'text-white'
              }`}
            >
              <span>{ZIKIR_UI.commonZikr[selectedLanguage]}</span>
              <span className="text-xs font-normal opacity-70 hidden sm:inline">
                {ZIKIR_UI.commonZikr12[selectedLanguage]}
              </span>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${
                  isDay
                    ? 'bg-[#e6f3f2] text-[#1c6469] border-[#cce5e2]'
                    : 'bg-[#0a262c] text-[#2dd4bf] border-[#184850]'
                }`}
              >
                {zikrs.length}
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Restore Defaults button */}
            <button
              onClick={onRestoreDefaults}
              className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-2xl border transition active:scale-95 cursor-pointer ${
                isDay
                  ? 'bg-white hover:bg-[#eef7f6] text-[#1c6469] border-[#d2ece9] shadow-sm'
                  : 'bg-[#0e2f36] hover:bg-[#123e47] text-[#8ebac0] border-[#1a515c]'
              }`}
              title={ZIKIR_UI.resetDefaults[selectedLanguage]}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{ZIKIR_UI.resetDefaults[selectedLanguage]}</span>
              <span className="sm:hidden">Reset</span>
            </button>

            {/* Export PDF Button */}
            <button
              onClick={onExportPdf}
              disabled={isExportingPdf}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-2xl border transition active:scale-95 disabled:opacity-50 cursor-pointer ${
                isDay
                  ? 'bg-white hover:bg-[#eef7f6] text-[#1c6469] border-[#d2ece9] shadow-sm'
                  : 'bg-[#0e2f36] hover:bg-[#123e47] text-[#8ebac0] border-[#1a515c]'
              }`}
              title={ZIKIR_UI.exportPdf[selectedLanguage]}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{ZIKIR_UI.exportPdf[selectedLanguage]}</span>
            </button>

            {/* Add Zikr Button */}
            <button
              onClick={onOpenAddModal}
              className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-2xl shadow-md transition active:scale-95 cursor-pointer bg-[#1c6469] hover:bg-[#154f53] text-white shadow-[#135d66]/20 border border-teal-400/30"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>
                +{' '}
                {selectedLanguage === 'bn'
                  ? 'যিকির যোগ'
                  : selectedLanguage === 'ur'
                  ? 'نیا ذکر'
                  : selectedLanguage === 'hi'
                  ? 'नया ज़िक्र'
                  : 'Add Zikr'}
              </span>
            </button>
          </div>
        </div>

        {/* Filter Pills row */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3.5 py-1.5 rounded-2xl text-xs font-bold transition active:scale-95 cursor-pointer whitespace-nowrap border ${
              filterMode === 'all'
                ? isDay
                  ? 'bg-[#1c6469] text-white border-[#1c6469] shadow-md shadow-[#135d66]/20'
                  : 'bg-[#1c6469] text-white border-teal-400/50 shadow-md'
                : isDay
                ? 'bg-[#e6f3f2] hover:bg-[#d8ece9] text-[#2d6a70] border-[#d2ece9]'
                : 'bg-[#0a262c] hover:bg-[#10343c] text-[#8ebac0] border-[#184850]'
            }`}
          >
            {ZIKIR_UI.all[selectedLanguage]} ({zikrs.length})
          </button>

          <button
            onClick={() => setFilterMode('targets')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl text-xs font-bold transition active:scale-95 cursor-pointer whitespace-nowrap border ${
              filterMode === 'targets'
                ? isDay
                  ? 'bg-[#1c6469] text-white border-[#1c6469] shadow-md shadow-[#135d66]/20'
                  : 'bg-[#1c6469] text-white border-teal-400/50 shadow-md'
                : isDay
                ? 'bg-[#e6f3f2] hover:bg-[#d8ece9] text-[#2d6a70] border-[#d2ece9]'
                : 'bg-[#0a262c] hover:bg-[#10343c] text-[#8ebac0] border-[#184850]'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>{ZIKIR_UI.withTarget[selectedLanguage]}</span>
          </button>

          <button
            onClick={() => setFilterMode('completed')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl text-xs font-bold transition active:scale-95 cursor-pointer whitespace-nowrap border ${
              filterMode === 'completed'
                ? isDay
                  ? 'bg-[#1c6469] text-white border-[#1c6469] shadow-md shadow-[#135d66]/20'
                  : 'bg-[#1c6469] text-white border-teal-400/50 shadow-md'
                : isDay
                ? 'bg-[#e6f3f2] hover:bg-[#d8ece9] text-[#2d6a70] border-[#d2ece9]'
                : 'bg-[#0a262c] hover:bg-[#10343c] text-[#8ebac0] border-[#184850]'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>
              {ZIKIR_UI.completedFilter[selectedLanguage]} ({completedGoals})
            </span>
          </button>
        </div>
      </div>

      {/* Grid of Individual 12 Zikr Cards */}
      {filteredZikrs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pb-16">
          {filteredZikrs.map((zikr, index) => (
            <ZikrCard
              key={zikr.id}
              zikr={zikr}
              index={index}
              totalCards={zikrs.length}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
              onReset={onReset}
              onDelete={onDelete}
              onEdit={onEdit}
              onMoveUp={onMoveUp}
              onMoveDown={onMoveDown}
              themeMode={themeMode}
              selectedLanguage={selectedLanguage}
            />
          ))}
        </div>
      ) : (
        <div
          className={`p-10 text-center rounded-[28px] border ${
            isDay ? 'bg-white border-[#dcebe8] shadow-sm' : 'bg-[#0e2f36] border-[#1a515c]'
          }`}
        >
          <p className={`text-sm font-semibold ${isDay ? 'text-[#103e42]' : 'text-teal-100'}`}>
            {selectedLanguage === 'bn' ? 'কোনো যিকির পাওয়া যায়নি।' : 'No zikrs found.'}
          </p>
          <button
            onClick={() => setFilterMode('all')}
            className="mt-3 px-4 py-2 rounded-xl bg-[#1c6469] text-white text-xs font-bold transition active:scale-95 cursor-pointer shadow-sm"
          >
            {selectedLanguage === 'bn' ? 'সব যিকির দেখান' : 'Show All Zikrs'}
          </button>
        </div>
      )}

      {/* ================= STICKY FLOATING POP-UP CIRCULAR COUNTER ================= */}
      {/* Pops up when scrolling down through the lower zikr cards */}
      <div
        className={`fixed bottom-24 right-4 sm:right-6 z-40 transition-all duration-300 pointer-events-auto ${
          showFloatingCounter
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-8 scale-75 pointer-events-none'
        }`}
      >
        {/* Floating Particles from Mini Circle */}
        {floatingParticles.map((p) => (
          <span
            key={p.id}
            className="absolute -top-3 left-1/2 -translate-x-1/2 font-black text-sm text-emerald-400 dark:text-emerald-300 drop-shadow-lg pointer-events-none z-50 animate-out fade-out slide-out-to-top duration-700"
          >
            {p.text}
          </span>
        ))}

        <button
          onClick={scrollToTopDial}
          className={`group relative rounded-full p-1.5 transition-all duration-200 active:scale-90 shadow-2xl flex items-center justify-center cursor-pointer border ${
            isFloatingPopping
              ? 'scale-115 ring-4 ring-emerald-400/60 shadow-emerald-500/40'
              : 'scale-100 hover:scale-105'
          } ${
            isDay
              ? 'bg-gradient-to-tr from-[#164e52] via-[#247b82] to-[#3aa2aa] border-white text-white shadow-teal-900/30'
              : 'bg-gradient-to-tr from-[#092226] via-[#12414a] to-[#2dd4bf] border-[#2dd4bf]/40 text-white shadow-black/80'
          }`}
          title="Scroll to Central Master Counter"
        >
          {/* Inner Circle Dial */}
          <div
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex flex-col items-center justify-center p-1 relative shadow-inner ${
              isDay
                ? 'bg-[#edf5f4] text-[#103e42] border border-white'
                : 'bg-gradient-to-b from-[#092226] via-[#0d2d33] to-[#092226] text-white border border-[#1a4a52]'
            }`}
          >
            <div className="flex items-center gap-0.5 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              <Sparkles className="w-2.5 h-2.5 text-amber-400" />
              <span>TOTAL</span>
            </div>

            {/* Live Pop-Up Count Digits */}
            <div
              className={`font-black font-mono text-sm sm:text-base tracking-tight leading-tight transition-transform duration-150 ${
                isFloatingPopping ? 'scale-125 text-emerald-500' : ''
              }`}
            >
              {masterTotal.toLocaleString()}
            </div>

            <div className="text-[8px] opacity-70 flex items-center gap-0.5 text-teal-600 dark:text-teal-300">
              <ChevronUp className="w-2.5 h-2.5 group-hover:-translate-y-0.5 transition-transform" />
              <span>Top</span>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { ZikrItem, ThemeMode, ZikrLanguage } from '../types';
import { CircularCenterCounter } from './CircularCenterCounter';
import { ZikrCard } from './ZikrCard';
import { PortableFloatingCounter } from './PortableFloatingCounter';
import { Plus, FileText, CheckCircle2, Target, RotateCcw } from 'lucide-react';
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

  // Monitor scroll position to show/hide portable floating popup
  useEffect(() => {
    const handleScroll = () => {
      const topDial = document.getElementById('main-circular-center-counter');
      if (topDial) {
        const rect = topDial.getBoundingClientRect();
        // Show portable counter whenever user scrolls past top circular counter
        setShowFloatingCounter(rect.bottom < 140);
      } else {
        setShowFloatingCounter(window.scrollY > 200);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pb-20">
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

      {/* ================= PORTABLE & DRAGGABLE LARGE FLOATING POP-UP COUNTER ================= */}
      <PortableFloatingCounter
        masterTotal={masterTotal}
        dailyTotal={dailyTotal}
        completedGoals={completedGoals}
        isVisible={showFloatingCounter}
        themeMode={themeMode}
        selectedLanguage={selectedLanguage}
        onScrollToTop={scrollToTopDial}
      />
    </div>
  );
};

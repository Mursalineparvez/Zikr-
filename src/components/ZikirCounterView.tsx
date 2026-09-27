import React, { useState } from 'react';
import { ZikrItem, ThemeMode, ZikrLanguage } from '../types';
import { CircularCenterCounter } from './CircularCenterCounter';
import { ZikrCard } from './ZikrCard';
import { Plus, FileText, CheckCircle2, Target, RotateCcw } from 'lucide-react';

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

  const filteredZikrs = zikrs.filter((z) => {
    if (filterMode === 'targets') return z.target && z.target > 0;
    if (filterMode === 'completed') return z.target && z.count >= z.target;
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Center: Dedicated Circular Master Total Counter */}
      <CircularCenterCounter
        totalCount={masterTotal}
        dailyCount={dailyTotal}
        totalZikrs={zikrs.length}
        completedGoals={completedGoals}
        onGlobalReset={onGlobalReset}
        onSaveSession={onSaveSession}
        themeMode={themeMode}
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
              <span>সাধারণ যিকির</span>
              <span className="text-xs font-normal opacity-70 hidden sm:inline">(Common Zikr — 12 Items)</span>
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
              title="১২টি ডিফল্ট যিকির পুনরুদ্ধার করুন"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">১২টি যিকির রিসেট</span>
              <span className="sm:hidden">ডিফল্ট</span>
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
              title="Export PDF Report"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Export PDF</span>
            </button>

            {/* Add Zikr Button */}
            <button
              onClick={onOpenAddModal}
              className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-2xl shadow-md transition active:scale-95 cursor-pointer bg-[#1c6469] hover:bg-[#154f53] text-white shadow-[#135d66]/20 border border-teal-400/30"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>যিকির যোগ</span>
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
            সকল ({zikrs.length})
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
            <span>লক্ষ্যসহ</span>
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
            <span>সম্পন্ন ({completedGoals})</span>
          </button>
        </div>
      </div>

      {/* Grid of Individual 12 Zikr Cards (2-column layout matching screenshot, responsive) */}
      {filteredZikrs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
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
            isDay
              ? 'bg-white border-[#dcebe8] shadow-sm'
              : 'bg-[#0e2f36] border-[#1a515c]'
          }`}
        >
          <p className={`text-sm font-semibold ${isDay ? 'text-[#103e42]' : 'text-teal-100'}`}>
            কোনো যিকির পাওয়া যায়নি।
          </p>
          <button
            onClick={() => setFilterMode('all')}
            className="mt-3 px-4 py-2 rounded-xl bg-[#1c6469] text-white text-xs font-bold transition active:scale-95 cursor-pointer shadow-sm"
          >
            সব যিকির দেখান
          </button>
        </div>
      )}
    </div>
  );
};

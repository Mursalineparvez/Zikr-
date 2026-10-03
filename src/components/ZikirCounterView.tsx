import React, { useState, useEffect } from 'react';
import { ZikrItem, ThemeMode, ZikrLanguage, ZikrRefreshMode } from '../types';
import { CircularCenterCounter } from './CircularCenterCounter';
import { ZikrCard } from './ZikrCard';
import { PortableFloatingCounter } from './PortableFloatingCounter';
import { Plus, FileText, CheckCircle2, Target, RotateCcw, RotateCw, Clock, Sparkles } from 'lucide-react';
import { ZIKIR_UI } from '../utils/appTranslations';
import { PrayerSegmentDetails } from '../utils/prayerTimes';

interface ZikirCounterViewProps {
  masterTotal: number;
  dailyTotal?: number;
  zikrs: ZikrItem[];
  completedGoals: number;
  refreshMode?: ZikrRefreshMode;
  currentPrayerSegment?: PrayerSegmentDetails;
  onRefreshModeChange?: (mode: ZikrRefreshMode) => void;
  onManualCounterRefresh?: () => void;
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
  refreshMode = 'fard',
  currentPrayerSegment,
  onRefreshModeChange,
  onManualCounterRefresh,
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

      {/* ================= REFRESH SYSTEM CARD ================= */}
      <div
        className={`p-4 sm:p-5 rounded-3xl border shadow-lg transition-all duration-300 ${
          isDay
            ? 'bg-gradient-to-br from-white via-[#f4faf8] to-[#e8f6f3] border-[#cbe4e0]'
            : 'bg-gradient-to-br from-[#0c2f35] via-[#0f3b43] to-[#12454e] border-[#1b5864]'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3.5">
          <div className="flex items-center gap-2.5">
            <div
              className={`p-2 rounded-2xl ${
                isDay ? 'bg-emerald-100 text-emerald-800' : 'bg-teal-500/20 text-emerald-300'
              }`}
            >
              <RotateCw className="w-4 h-4" />
            </div>
            <div>
              <h3 className={`text-sm sm:text-base font-black tracking-tight ${isDay ? 'text-[#063b33]' : 'text-white'}`}>
                {selectedLanguage === 'bn' ? 'রিফ্রেশ সিস্টেম (Refresh System)' : 'Counter Refresh System'}
              </h3>
              <p className={`text-xs ${isDay ? 'text-[#2e6259]' : 'text-emerald-200/80'}`}>
                {selectedLanguage === 'bn'
                  ? '৩টি অপশন থেকে যেকোনো একটি বেছে নিন (ফরজ নামাজ / মাগরিব / ম্যানুয়ালি)'
                  : 'Choose auto-reset frequency & automatic target presets'}
              </p>
            </div>
          </div>

          {/* Manual Instant Refresh button */}
          {onManualCounterRefresh && (
            <button
              onClick={onManualCounterRefresh}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-bold border shadow-sm transition active:scale-95 cursor-pointer self-start sm:self-auto ${
                isDay
                  ? 'bg-white hover:bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-[#144f59] hover:bg-[#1a5f6b] text-teal-100 border-teal-400/40'
              }`}
              title={selectedLanguage === 'bn' ? 'সব কাউন্টার ০ করুন' : 'Reset all counters to 0'}
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span>{selectedLanguage === 'bn' ? 'কাউন্টার ০ করুন' : 'Reset Counters'}</span>
            </button>
          )}
        </div>

        {/* 3 Interactive Mode Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          {/* Mode 1: Every Fard Salah */}
          <button
            type="button"
            onClick={() => onRefreshModeChange && onRefreshModeChange('fard')}
            className={`p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer active:scale-[0.98] relative overflow-hidden ${
              refreshMode === 'fard'
                ? isDay
                  ? 'bg-emerald-700 text-white border-emerald-600 shadow-md shadow-emerald-800/20 ring-2 ring-emerald-500/40'
                  : 'bg-gradient-to-r from-teal-700 to-emerald-700 text-white border-teal-400/60 shadow-lg ring-2 ring-teal-400/50'
                : isDay
                ? 'bg-white hover:bg-emerald-50/70 text-[#143d35] border-[#d2ece7]'
                : 'bg-[#0a262c] hover:bg-[#103840] text-teal-100 border-[#184850]'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-black tracking-wide flex items-center gap-1.5">
                <span>🕌</span>
                <span>Every Fard Salah</span>
              </span>
              {refreshMode === 'fard' && (
                <span className="w-2 h-2 rounded-full bg-amber-300 animate-pulse" />
              )}
            </div>
            <p
              className={`text-[11px] font-medium leading-relaxed ${
                refreshMode === 'fard' ? 'text-teal-100' : isDay ? 'text-gray-600' : 'text-emerald-300/70'
              }`}
            >
              {selectedLanguage === 'bn'
                ? 'প্রত্যেক ফরজ নামাজের পর কাউন্টার ০ হবে • টার্গেট ১-৩৩ বার'
                : 'Resets to 0 after every Fard prayer • Target 1-33'}
            </p>
          </button>

          {/* Mode 2: Daily After Maghrib */}
          <button
            type="button"
            onClick={() => onRefreshModeChange && onRefreshModeChange('maghrib')}
            className={`p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer active:scale-[0.98] relative overflow-hidden ${
              refreshMode === 'maghrib'
                ? isDay
                  ? 'bg-emerald-700 text-white border-emerald-600 shadow-md shadow-emerald-800/20 ring-2 ring-emerald-500/40'
                  : 'bg-gradient-to-r from-teal-700 to-emerald-700 text-white border-teal-400/60 shadow-lg ring-2 ring-teal-400/50'
                : isDay
                ? 'bg-white hover:bg-emerald-50/70 text-[#143d35] border-[#d2ece7]'
                : 'bg-[#0a262c] hover:bg-[#103840] text-teal-100 border-[#184850]'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-black tracking-wide flex items-center gap-1.5">
                <span>🌅</span>
                <span>Daily After Maghrib</span>
              </span>
              {refreshMode === 'maghrib' && (
                <span className="w-2 h-2 rounded-full bg-amber-300 animate-pulse" />
              )}
            </div>
            <p
              className={`text-[11px] font-medium leading-relaxed ${
                refreshMode === 'maghrib' ? 'text-teal-100' : isDay ? 'text-gray-600' : 'text-emerald-300/70'
              }`}
            >
              {selectedLanguage === 'bn'
                ? 'মাগরিবের ওয়াক্ত শুরু হওয়ার সঙ্গে সঙ্গে প্রতিদিন ০ হবে • টার্গেট ৫-১৬৫ বার'
                : 'Resets daily at Maghrib prayer • Daily target 5-165'}
            </p>
          </button>

          {/* Mode 3: Manually */}
          <button
            type="button"
            onClick={() => onRefreshModeChange && onRefreshModeChange('manual')}
            className={`p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer active:scale-[0.98] relative overflow-hidden ${
              refreshMode === 'manual'
                ? isDay
                  ? 'bg-emerald-700 text-white border-emerald-600 shadow-md shadow-emerald-800/20 ring-2 ring-emerald-500/40'
                  : 'bg-gradient-to-r from-teal-700 to-emerald-700 text-white border-teal-400/60 shadow-lg ring-2 ring-teal-400/50'
                : isDay
                ? 'bg-white hover:bg-emerald-50/70 text-[#143d35] border-[#d2ece7]'
                : 'bg-[#0a262c] hover:bg-[#103840] text-teal-100 border-[#184850]'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-black tracking-wide flex items-center gap-1.5">
                <span>🖐️</span>
                <span>Manually</span>
              </span>
              {refreshMode === 'manual' && (
                <span className="w-2 h-2 rounded-full bg-amber-300 animate-pulse" />
              )}
            </div>
            <p
              className={`text-[11px] font-medium leading-relaxed ${
                refreshMode === 'manual' ? 'text-teal-100' : isDay ? 'text-gray-600' : 'text-emerald-300/70'
              }`}
            >
              {selectedLanguage === 'bn'
                ? 'ব্যবহারকারী নিজে যখন Refresh করবেন তখন ০ হবে • টার্গেট ৫০-২০০ বার'
                : 'User resets manually • Manual target 50-200'}
            </p>
          </button>
        </div>

        {/* Live Auto-Refresh Status Pill */}
        <div
          className={`mt-3 pt-2.5 border-t flex flex-wrap items-center justify-between gap-2 text-xs ${
            isDay ? 'border-[#cbe4e0] text-[#006747]' : 'border-[#1b5864] text-emerald-200/90'
          }`}
        >
          <div className="flex items-center gap-1.5 font-medium">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {refreshMode === 'fard' ? (
                selectedLanguage === 'bn' ? (
                  currentPrayerSegment ? (
                    <>
                      বর্তমান পর্যায়: <strong className="text-amber-400">{currentPrayerSegment.prayerNameBn}</strong> • {currentPrayerSegment.nextTransitionNameBn} পর স্বয়ংক্রিয়ভাবে কাউন্টার ০ হবে
                    </>
                  ) : (
                    'প্রতিটি ফরজ নামাজের ওয়াক্ত শেষ হওয়ার সাথে সাথে কাউন্টার স্বয়ংক্রিয়ভাবে ০ হবে'
                  )
                ) : (
                  currentPrayerSegment ? (
                    <>
                      Current Window: <strong className="text-amber-400">{currentPrayerSegment.prayerNameEn}</strong> • Auto resets to 0 at {currentPrayerSegment.nextTransitionNameEn}
                    </>
                  ) : (
                    'Counters reset to 0 automatically after each fard prayer window'
                  )
                )
              ) : refreshMode === 'maghrib' ? (
                selectedLanguage === 'bn' ? (
                  'মাগরিবের ওয়াক্ত হওয়ার সাথে সাথে প্রতিদিন সমস্ত কাউন্টার স্বয়ংক্রিয়ভাবে ০ হবে'
                ) : (
                  'All counters automatically reset to 0 daily at Maghrib sunset'
                )
              ) : (
                selectedLanguage === 'bn' ? (
                  'ম্যানুয়াল মোড সক্রিয়: উপরের "কাউন্টার ০ করুন" বাটনে চাপলে ০ হবে'
                ) : (
                  'Manual mode active: Click "Reset Counters" to zero'
                )
              )}
            </span>
          </div>

          <span
            className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
              refreshMode === 'fard'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : refreshMode === 'maghrib'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
            }`}
          >
            {refreshMode === 'fard' ? '✓ Auto Fard Sync' : refreshMode === 'maghrib' ? '✓ Maghrib Sync' : '✓ Manual'}
          </span>
        </div>
      </div>

      {/* Category Pills & Action Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <h2
              className={`text-base font-bold tracking-tight flex items-center gap-2 ${
                isDay ? 'text-[#0a3328]' : 'text-white'
              }`}
            >
              <span>{ZIKIR_UI.commonZikr[selectedLanguage]}</span>
              <span className="text-xs font-normal opacity-70 hidden sm:inline">
                {selectedLanguage === 'bn' ? '(২৩টি প্রামাণিক যিকির)' : '(23 Authentic Zikrs)'}
              </span>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${
                  isDay
                    ? 'bg-[#e6f7f2] text-[#00875a] border-[#c3edd9]'
                    : 'bg-[#061f24] text-emerald-400 border-[#144349]'
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
                  ? 'bg-white hover:bg-[#eefbf6] text-[#006747] border-[#d2ece9] shadow-sm'
                  : 'bg-[#061f24] hover:bg-[#092a30] text-emerald-300 border-[#144349]'
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
                  ? 'bg-white hover:bg-[#eefbf6] text-[#006747] border-[#d2ece9] shadow-sm'
                  : 'bg-[#061f24] hover:bg-[#092a30] text-emerald-300 border-[#144349]'
              }`}
              title={ZIKIR_UI.exportPdf[selectedLanguage]}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{ZIKIR_UI.exportPdf[selectedLanguage]}</span>
            </button>

            {/* Add Zikr Button */}
            <button
              onClick={onOpenAddModal}
              className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-2xl shadow-md transition active:scale-95 cursor-pointer bg-[#006747] hover:bg-[#005a3e] text-white shadow-[#006747]/20 border border-emerald-400/30"
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
                  ? 'bg-[#006747] text-white border-[#006747] shadow-md shadow-[#006747]/20'
                  : 'bg-[#006747] text-white border-emerald-400/50 shadow-md'
                : isDay
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                : 'bg-[#061f24] hover:bg-[#0a2e36] text-slate-300 border-[#144349]'
            }`}
          >
            {ZIKIR_UI.all[selectedLanguage]} ({zikrs.length})
          </button>

          <button
            onClick={() => setFilterMode('targets')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl text-xs font-bold transition active:scale-95 cursor-pointer whitespace-nowrap border ${
              filterMode === 'targets'
                ? isDay
                  ? 'bg-[#006747] text-white border-[#006747] shadow-md shadow-[#006747]/20'
                  : 'bg-[#006747] text-white border-emerald-400/50 shadow-md'
                : isDay
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                : 'bg-[#061f24] hover:bg-[#0a2e36] text-slate-300 border-[#144349]'
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
                  ? 'bg-[#006747] text-white border-[#006747] shadow-md shadow-[#006747]/20'
                  : 'bg-[#006747] text-white border-emerald-400/50 shadow-md'
                : isDay
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                : 'bg-[#061f24] hover:bg-[#0a2e36] text-slate-300 border-[#144349]'
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
            className="mt-3 px-4 py-2 rounded-xl bg-[#006747] text-white text-xs font-bold transition active:scale-95 cursor-pointer shadow-sm"
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

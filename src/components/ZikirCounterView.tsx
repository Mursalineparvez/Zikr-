import React, { useState, useEffect } from 'react';
import { ZikrItem, ThemeMode, ZikrLanguage, ZikrRefreshMode } from '../types';
import { CircularCenterCounter } from './CircularCenterCounter';
import { ZikrCard } from './ZikrCard';
import { PortableFloatingCounter } from './PortableFloatingCounter';
import { Plus, FileText, CheckCircle2, Target, RotateCcw, RotateCw, Clock, Sparkles, ChevronDown, ChevronUp, Eye, ChevronLeft, ChevronRight, LayoutGrid, Smartphone } from 'lucide-react';
import { ZIKIR_UI } from '../utils/appTranslations';
import { PrayerSegmentDetails } from '../utils/prayerTimes';
import { soundHaptics } from '../utils/audioHaptics';
import { ZikrFocusMode } from './ZikrFocusMode';

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
  soundEnabled?: boolean;
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
  soundEnabled = true,
}) => {
  const isDay = themeMode === 'day';
  const [filterMode, setFilterMode] = useState<'all' | 'targets' | 'completed'>('all');
  const [showFloatingCounter, setShowFloatingCounter] = useState(false);
  const [showFocusMode, setShowFocusMode] = useState<number | null>(null);
  const [isRefreshSystemExpanded, setIsRefreshSystemExpanded] = useState<boolean>(false);

  // Monitor scroll position to show/hide portable floating popup
  useEffect(() => {
    const handleScroll = () => {
      const topDial = document.getElementById('main-circular-center-counter');
      const scrollY =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;

      if (topDial) {
        const rect = topDial.getBoundingClientRect();
        // Show as soon as user scrolls down even slightly (> 40px or top dial moves up)
        if (rect.top < 120 || rect.bottom < 450 || scrollY > 40) {
          setShowFloatingCounter(true);
        } else if (scrollY < 15 && rect.top >= 130) {
          // Only hide when user scrolls all the way back to the very top
          setShowFloatingCounter(false);
        }
      } else {
        setShowFloatingCounter(scrollY > 40);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true, capture: true });
    document.addEventListener('scroll', handleScroll, { passive: true, capture: true });

    // Initial check
    handleScroll();

    // Check periodically during the first few seconds for layout stabilization
    const interval = setInterval(handleScroll, 400);
    const timeout = setTimeout(() => clearInterval(interval), 3000);

    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      document.removeEventListener('scroll', handleScroll, true);
      clearInterval(interval);
      clearTimeout(timeout);
    };
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

  // When in Focus Mode, exclusively render Focus Mode so nothing else is mounted or visible
  if (showFocusMode !== null) {
    return (
      <ZikrFocusMode
        zikrs={zikrs}
        initialIndex={showFocusMode}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onReset={onReset}
        onClose={() => setShowFocusMode(null)}
        themeMode={themeMode}
        selectedLanguage={selectedLanguage}
        soundEnabled={soundEnabled}
      />
    );
  }

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

      {/* ================= REFRESH SYSTEM CARD (Styled matching reference image) ================= */}
      <div
        className={`p-4 sm:p-5 rounded-[28px] border shadow-xs transition-all duration-300 ${
          isDay
            ? 'bg-[#F0FDF8] border-[#CDECE0]'
            : 'bg-[#042026] border-teal-800/40 shadow-black/60'
        }`}
      >
        {/* Upper Header Part (Always Visible) */}
        <div
          onClick={() => {
            setIsRefreshSystemExpanded(!isRefreshSystemExpanded);
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`flex items-center justify-between gap-3 cursor-pointer select-none ${
            isRefreshSystemExpanded ? 'mb-3.5 pb-3 border-b border-[#CDECE0]' : ''
          }`}
        >
          <div className="flex items-center gap-3 min-w-0">
            {/* Green Refresh Ring Icon */}
            <div
              className={`p-2.5 rounded-2xl shrink-0 ${
                isDay ? 'bg-[#D0F2E3] text-[#006A4E] border border-[#B5E9D2]' : 'bg-teal-950/70 text-teal-300 border border-teal-800/60'
              }`}
            >
              <RotateCw className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="min-w-0">
              <h3 className={`text-sm sm:text-base font-bold tracking-tight truncate ${isDay ? 'text-[#004D38]' : 'text-white'}`}>
                {selectedLanguage === 'bn' ? 'রিফ্রেশ সিস্টেম (Refresh System)' : 'Refresh System'}
              </h3>
              <p className={`text-xs truncate ${isDay ? 'text-slate-600 font-medium' : 'text-teal-200/80'}`}>
                {selectedLanguage === 'bn'
                  ? '৩টি অপশন থেকে যেকোনো একটি বেছে নিন (ফরজ নামাজ / মাগরিব...)'
                  : 'Choose auto-reset frequency'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Percentage Widget Indicator [ ˄ 0% ˅ ] from screenshot */}
            <div className="hidden sm:flex flex-col items-center justify-center bg-white/80 border border-slate-200/80 rounded-xl px-2 py-1 text-[10px] font-bold text-slate-500 shadow-xs">
              <ChevronUp className="w-3 h-3 text-slate-400 -mb-1" />
              <span className="font-mono text-slate-700">0%</span>
              <ChevronDown className="w-3 h-3 text-slate-400 -mt-1" />
            </div>

            {/* Dropdown Toggle Button: [ অপশনসমূহ দেখুন ˅ ] */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsRefreshSystemExpanded(!isRefreshSystemExpanded);
                if (soundEnabled) soundHaptics.playTap();
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all active:scale-95 cursor-pointer shadow-xs ${
                isRefreshSystemExpanded
                  ? 'bg-[#006A4E] text-white border-[#006A4E]'
                  : isDay
                  ? 'bg-white border-[#BDE5D5] text-[#006A4E] hover:bg-emerald-50'
                  : 'bg-teal-950/50 border-teal-800/40 text-teal-100 hover:bg-teal-900/50'
              }`}
            >
              <span>
                {isRefreshSystemExpanded
                  ? selectedLanguage === 'bn'
                    ? 'সংক্ষিপ্ত করুন'
                    : 'Hide'
                  : selectedLanguage === 'bn'
                  ? 'অপশনসমূহ দেখুন'
                  : 'Show Options'}
              </span>
              {isRefreshSystemExpanded ? (
                <ChevronUp className="w-3.5 h-3.5 stroke-[2.5]" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 stroke-[2.5]" />
              )}
            </button>
          </div>
        </div>

        {/* Lower Content Part (Only Visible when Expanded) */}
        {isRefreshSystemExpanded && (
          <div className="space-y-3 animate-in fade-in zoom-in-95 duration-200">
            {/* 3 Interactive Mode Selection Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
              {/* Mode 1: Every Fard Salah */}
              <button
                type="button"
                onClick={() => onRefreshModeChange && onRefreshModeChange('fard')}
                className={`p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer active:scale-[0.98] relative overflow-hidden ${
                  refreshMode === 'fard'
                    ? 'bg-[#006A4E] text-white border-[#005740] shadow-md ring-2 ring-emerald-500/40'
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
                    refreshMode === 'fard' ? 'text-emerald-100' : isDay ? 'text-gray-600' : 'text-emerald-300/70'
                  }`}
                >
                  {selectedLanguage === 'bn'
                    ? 'প্রত্যেক ফরজ নামাজের পর কাউন্টার ০ হবে • টার্গেট: ১-১০ নং ১০০ বার, ১১-১২ নং ২০ বার'
                    : 'Resets after every Fard prayer • Target: 1-10 (100x), 11-12 (20x)'}
                </p>
              </button>

              {/* Mode 2: Daily After Maghrib */}
              <button
                type="button"
                onClick={() => onRefreshModeChange && onRefreshModeChange('maghrib')}
                className={`p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer active:scale-[0.98] relative overflow-hidden ${
                  refreshMode === 'maghrib'
                    ? 'bg-[#006A4E] text-white border-[#005740] shadow-md ring-2 ring-emerald-500/40'
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
                    refreshMode === 'maghrib' ? 'text-emerald-100' : isDay ? 'text-gray-600' : 'text-emerald-300/70'
                  }`}
                >
                  {selectedLanguage === 'bn'
                    ? 'প্রতিদিন মাগরিবের ওয়াক্তে কাউন্টার ০ হবে • টার্গেট: ১-১০ নং ৫০০ বার, ১১-১২ নং ১০০ বার'
                    : 'Resets daily after Maghrib • Target: 1-10 (500x), 11-12 (100x)'}
                </p>
              </button>

              {/* Mode 3: Manually */}
              <button
                type="button"
                onClick={() => onRefreshModeChange && onRefreshModeChange('manual')}
                className={`p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer active:scale-[0.98] relative overflow-hidden ${
                  refreshMode === 'manual'
                    ? 'bg-[#006A4E] text-white border-[#005740] shadow-md ring-2 ring-emerald-500/40'
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
                    refreshMode === 'manual' ? 'text-emerald-100' : isDay ? 'text-gray-600' : 'text-emerald-300/70'
                  }`}
                >
                  {selectedLanguage === 'bn'
                    ? 'ব্যবহারকারী নিজে যখন Refresh করবেন তখন ০ হবে • টার্গেট: ১-১০ নং ১০০০ বার, ১১-১২ নং ২০০ বার'
                    : 'User resets manually • Target: 1-10 (1000x), 11-12 (200x)'}
                </p>
              </button>
            </div>

            {/* Live Auto-Refresh Status Pill */}
            <div
              className={`mt-3 pt-2.5 border-t flex flex-wrap items-center justify-between gap-2 text-xs ${
                isDay ? 'border-[#CDECE0] text-[#006A4E]' : 'border-[#1b5864] text-emerald-200/90'
              }`}
            >
              <div className="flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>
                  {refreshMode === 'fard' ? (
                    selectedLanguage === 'bn' ? (
                      currentPrayerSegment ? (
                        <>
                          বর্তমান পর্যায়: <strong className="text-amber-600">{currentPrayerSegment.prayerNameBn}</strong> • {currentPrayerSegment.nextTransitionNameBn} পর স্বয়ংক্রিয়ভাবে কাউন্টার ০ হবে
                        </>
                      ) : (
                        'প্রতিটি ফরজ নামাজের ওয়াক্ত শেষ হওয়ার সাথে সাথে কাউন্টার স্বয়ংক্রিয়ভাবে ০ হবে'
                      )
                    ) : (
                      currentPrayerSegment ? (
                        <>
                          Current Window: <strong className="text-amber-600">{currentPrayerSegment.prayerNameEn}</strong> • Auto resets to 0 at {currentPrayerSegment.nextTransitionNameEn}
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
                      'ম্যানুয়াল মোড সক্রিয়: রিসেট বাটনে চাপলে ০ হবে'
                    ) : (
                      'Manual mode active'
                    )
                  )}
                </span>
              </div>

              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  refreshMode === 'fard'
                    ? 'bg-emerald-500/20 text-emerald-700 border border-emerald-500/30'
                    : refreshMode === 'maghrib'
                    ? 'bg-amber-500/20 text-amber-700 border border-amber-500/30'
                    : 'bg-blue-500/20 text-blue-700 border border-blue-500/30'
                }`}
              >
                {refreshMode === 'fard' ? '✓ Auto Fard Sync' : refreshMode === 'maghrib' ? '✓ Maghrib Sync' : '✓ Manual'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Section Header: [ সাধারণ যিকির  12 ] & Actions */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <h2
              className={`text-base sm:text-lg font-extrabold tracking-tight flex items-center gap-2 ${
                isDay ? 'text-[#004D38]' : 'text-white'
              }`}
            >
              <span>{ZIKIR_UI.commonZikr[selectedLanguage]}</span>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${
                  isDay
                    ? 'bg-[#D0F2E3] text-[#006A4E] border-[#B5E9D2]'
                    : 'bg-[#061f24] text-emerald-400 border-[#144349]'
                }`}
              >
                {zikrs.length}
              </span>
            </h2>
          </div>

          {/* Action Bar Buttons matching reference screenshot: Reset, PDF Report, + Zikr Add */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Reset button */}
            <button
              onClick={onRestoreDefaults}
              className={`flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl border transition active:scale-95 cursor-pointer shadow-xs ${
                isDay
                  ? 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                  : 'bg-[#061f24] hover:bg-[#092a30] text-emerald-300 border-[#144349]'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>Reset</span>
            </button>

            {/* Export PDF Button */}
            <button
              onClick={onExportPdf}
              disabled={isExportingPdf}
              className={`flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl border transition active:scale-95 disabled:opacity-50 cursor-pointer shadow-xs ${
                isDay
                  ? 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                  : 'bg-teal-950/60 hover:bg-teal-900 text-teal-200 border-teal-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              <span>PDF রিপোর্ট</span>
            </button>

            {/* Focus Mode Button */}
            <button
              onClick={() => setShowFocusMode(0)}
              className={`flex items-center gap-1.5 text-xs font-extrabold px-3.5 py-2 rounded-xl border transition active:scale-95 cursor-pointer shadow-xs ${
                isDay
                  ? 'bg-gradient-to-r from-emerald-50 to-teal-50 hover:bg-emerald-100 text-[#006747] border-emerald-300'
                  : 'bg-gradient-to-r from-[#072d2f] to-[#0a383d] hover:bg-[#0c4248] text-emerald-300 border-teal-700/60 shadow-teal-950/40'
              }`}
            >
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>{selectedLanguage === 'bn' ? 'ফোকাস মোড' : 'Focus Mode'}</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full font-bold bg-amber-400 text-slate-950 leading-none">
                NEW
              </span>
            </button>

            {/* + Zikr Add Button: [ + + জিকির যোগ ] */}
            <button
              onClick={onOpenAddModal}
              className="flex items-center gap-1.5 text-xs font-extrabold px-4 py-2 rounded-xl shadow-sm transition active:scale-95 cursor-pointer bg-[#006A4E] hover:bg-[#005439] text-white"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>+ জিকির যোগ</span>
            </button>
          </div>
        </div>
      </div>

        {/* Filter Pills row matching category pill design */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition active:scale-95 cursor-pointer whitespace-nowrap border ${
              filterMode === 'all'
                ? 'bg-[#007e8a] text-white border-[#007e8a] shadow-sm'
                : isDay
                ? 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-xs'
                : 'bg-teal-950/40 hover:bg-teal-900/40 text-teal-200 border-teal-800/40'
            }`}
          >
            {ZIKIR_UI.all[selectedLanguage]} ({zikrs.length})
          </button>

          <button
            onClick={() => setFilterMode('targets')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition active:scale-95 cursor-pointer whitespace-nowrap border ${
              filterMode === 'targets'
                ? 'bg-[#007e8a] text-white border-[#007e8a] shadow-sm'
                : isDay
                ? 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-xs'
                : 'bg-teal-950/40 hover:bg-teal-900/40 text-teal-200 border-teal-800/40'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>{ZIKIR_UI.withTarget[selectedLanguage]}</span>
          </button>

          <button
            onClick={() => setFilterMode('completed')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition active:scale-95 cursor-pointer whitespace-nowrap border ${
              filterMode === 'completed'
                ? 'bg-[#007e8a] text-white border-[#007e8a] shadow-sm'
                : isDay
                ? 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-xs'
                : 'bg-teal-950/40 hover:bg-teal-900/40 text-teal-200 border-teal-800/40'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>
              {ZIKIR_UI.completedFilter[selectedLanguage]} ({completedGoals})
            </span>
          </button>
        </div>

      {/* Grid of Individual 12 Zikr Cards - সব জিকির আগের মতো একসাথে */}
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
              onOpenFocusMode={(idx) => {
                const targetZikr = filteredZikrs[idx];
                if (targetZikr) {
                  const realIndex = zikrs.findIndex((z) => z.id === targetZikr.id);
                  setShowFocusMode(realIndex >= 0 ? realIndex : idx);
                } else {
                  setShowFocusMode(idx);
                }
              }}
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

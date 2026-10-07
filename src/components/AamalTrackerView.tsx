import React, { useState, useEffect, useMemo } from 'react';
import { AamalCheckItem, AamalDayLog, ThemeMode, ZikrLanguage, UserProfile, ZikrItem } from '../types';
import {
  DEFAULT_AAMAL_ITEMS,
  WAQT_SALAH_PLANS,
  WaqtSalahPlan,
  WaqtRakatDetail,
  getTodayDateKey,
  createInitialDayLog,
  getAamalLogForDate,
  saveAamalLogForDate,
  getAllAamalLogs,
} from '../utils/aamalTrackerData';
import {
  CheckCircle2,
  Circle,
  Sparkles,
  Flame,
  Award,
  Calendar as CalendarIcon,
  BookOpen,
  Heart,
  Clock,
  Download,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  FileSpreadsheet,
  FileCode,
  Printer,
  X,
  Plus,
  Minus,
  Moon,
  Sun,
  ShieldCheck,
  Compass,
  Users,
  Smile,
  Check,
  BookmarkCheck,
  TrendingUp,
  SlidersHorizontal,
  Star,
  Droplets,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundHaptics } from '../utils/audioHaptics';
import { HistoryReportModal } from './HistoryReportModal';
import { AAMAL_ITEM_TRANSLATIONS, AAMAL_UI, PRAYER_NAMES } from '../utils/appTranslations';

interface AamalTrackerViewProps {
  soundEnabled: boolean;
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
  userProfile?: UserProfile;
  liveZikrs?: ZikrItem[];
}

const LOCALE_MAP: Record<ZikrLanguage, string> = {
  bn: 'bn-BD',
  en: 'en-US',
  ur: 'ur-PK',
  ar: 'ar-SA',
  hi: 'hi-IN',
  id: 'id-ID',
  tr: 'tr-TR',
  ms: 'ms-MY',
  fr: 'fr-FR',
  es: 'es-ES',
  ru: 'ru-RU',
  fa: 'fa-IR',
  de: 'de-DE',
  sw: 'sw-KE',
};

const MONTH_NAMES_BN = [
  'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
  'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
];

const WEEKDAYS_BN = ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহঃ', 'শুক্র', 'শনি'];

export const AamalTrackerView: React.FC<AamalTrackerViewProps> = ({
  soundEnabled,
  themeMode = 'night',
  selectedLanguage = 'bn',
  userProfile,
  liveZikrs,
}) => {
  const isDay = themeMode === 'day';
  const todayKey = getTodayDateKey();

  // Active view subtab: 'checklist' (Daily Amal), 'calendar' (Record), 'trends' (Trends & Stats)
  const [activeSubTab, setActiveSubTab] = useState<'checklist' | 'calendar' | 'trends'>('checklist');

  // Auto-scroll to top when switching between Daily Checklist, Calendar, and Trends
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [activeSubTab]);

  // Selected date in the calendar / daily navigator
  const [selectedDateKey, setSelectedDateKey] = useState<string>(todayKey);

  // Calendar year and month navigation
  const [calYear, setCalYear] = useState<number>(() => new Date().getFullYear());
  const [calMonth, setCalMonth] = useState<number>(() => new Date().getMonth());

  // Current day's log state
  const [dayLog, setDayLog] = useState<AamalDayLog>(() => getAamalLogForDate(todayKey));

  // Collapsible accordion states for the 8 sections
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    prayer: false,
    sunnah: false,
    quran: false,
    morning_evening: false,
    bedtime: false,
    character: false,
    knowledge: false,
    social: false,
  });

  // Selected date Friday check (5 = Friday)
  const isSelectedDayFriday = useMemo(() => {
    try {
      const [y, m, d] = selectedDateKey.split('-').map(Number);
      return new Date(y, m - 1, d).getDay() === 5;
    } catch {
      return false;
    }
  }, [selectedDateKey]);

  // Friday Jummah vs Dhuhr mode (defaults to true if Friday)
  const [showJummahMode, setShowJummahMode] = useState<boolean>(() => {
    try {
      const [y, m, d] = todayKey.split('-').map(Number);
      return new Date(y, m - 1, d).getDay() === 5;
    } catch {
      return false;
    }
  });

  // Keep Jummah mode in sync with selected date
  useEffect(() => {
    try {
      const [y, m, d] = selectedDateKey.split('-').map(Number);
      const isFri = new Date(y, m - 1, d).getDay() === 5;
      setShowJummahMode(isFri);
    } catch {
      setShowJummahMode(false);
    }
  }, [selectedDateKey]);

  // Active Waqt tab: 'all' | 'fajr' | 'dhuhr' | 'jummah' | 'asr' | 'maghrib' | 'isha'
  const [selectedWaqtTab, setSelectedWaqtTab] = useState<string>('all');

  // Report Modal state
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // When selected date changes, load that date's log
  useEffect(() => {
    const loaded = getAamalLogForDate(selectedDateKey);
    setDayLog(loaded);
  }, [selectedDateKey]);

  // Persist dayLog changes
  const updateAndSaveLog = (updatedLog: AamalDayLog) => {
    setDayLog(updatedLog);
    saveAamalLogForDate(selectedDateKey, updatedLog);
  };

  // Toggle single aamal item
  const handleToggleItem = (itemId: string) => {
    const nextItems = dayLog.items.map((item) =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    );

    const completedCount = nextItems.filter((i) => i.completed).length;
    const completedRatio = nextItems.length > 0 ? completedCount / nextItems.length : 0;

    const toggledItem = nextItems.find((i) => i.id === itemId);
    const wasCompleted = toggledItem?.completed;

    if (wasCompleted) {
      if (soundEnabled) soundHaptics.playMilestone();
      if (completedCount === nextItems.length) {
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#059669', '#10b981', '#34d399', '#f59e0b'],
        });
      }
    } else {
      if (soundEnabled) soundHaptics.playTap();
    }

    const updated: AamalDayLog = {
      ...dayLog,
      items: nextItems,
      completedRatio,
    };
    updateAndSaveLog(updated);
  };

  // Toggle all rakats of a specific waqt (e.g. mark all Fajr or all Jummah items)
  const handleToggleAllWaqtItems = (plan: WaqtSalahPlan) => {
    const planItemIds = plan.items.map((i) => i.id);
    const allCompleted = planItemIds.every((id) =>
      dayLog.items.find((item) => item.id === id)?.completed
    );
    const nextTarget = !allCompleted;

    const nextItems = dayLog.items.map((item) =>
      planItemIds.includes(item.id) ? { ...item, completed: nextTarget } : item
    );

    const completedCount = nextItems.filter((i) => i.completed).length;
    const completedRatio = nextItems.length > 0 ? completedCount / nextItems.length : 0;

    if (nextTarget) {
      if (soundEnabled) soundHaptics.playMilestone();
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#059669', '#10b981', '#34d399', '#f59e0b'],
      });
    } else {
      if (soundEnabled) soundHaptics.playTap();
    }

    updateAndSaveLog({
      ...dayLog,
      items: nextItems,
      completedRatio,
    });
  };

  // Update Quran pages read
  const handleUpdateQuranPages = (delta: number) => {
    const nextVal = Math.max(0, (dayLog.quranPagesRead || 0) + delta);
    const updated = { ...dayLog, quranPagesRead: nextVal };
    updateAndSaveLog(updated);
    if (soundEnabled) soundHaptics.playTap();
  };

  // Toggle accordion section
  const toggleSectionCollapse = (secId: string) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [secId]: !prev[secId],
    }));
    if (soundEnabled) soundHaptics.playTap();
  };

  // Date Navigation Helpers
  const handlePrevDay = () => {
    const [y, m, d] = selectedDateKey.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    date.setDate(date.getDate() - 1);
    const newKey = date.toISOString().split('T')[0];
    setSelectedDateKey(newKey);
    setCalYear(date.getFullYear());
    setCalMonth(date.getMonth());
    if (soundEnabled) soundHaptics.playTap();
  };

  const handleNextDay = () => {
    const [y, m, d] = selectedDateKey.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    date.setDate(date.getDate() + 1);
    const newKey = date.toISOString().split('T')[0];
    setSelectedDateKey(newKey);
    setCalYear(date.getFullYear());
    setCalMonth(date.getMonth());
    if (soundEnabled) soundHaptics.playTap();
  };

  const handleJumpToToday = () => {
    setSelectedDateKey(todayKey);
    const now = new Date();
    setCalYear(now.getFullYear());
    setCalMonth(now.getMonth());
    if (soundEnabled) soundHaptics.playTap();
  };

  // Category aggregations for the current selected day
  const prayerItems = dayLog.items.filter((i) => i.category === 'prayer');
  const sunnahItems = dayLog.items.filter((i) => i.category === 'sunnah');
  const quranItems = dayLog.items.filter((i) => i.category === 'quran');
  const morningEveningItems = dayLog.items.filter((i) => i.category === 'morning_evening');
  const bedtimeItems = dayLog.items.filter((i) => i.category === 'bedtime');
  const characterItems = dayLog.items.filter((i) => i.category === 'character');
  const knowledgeItems = dayLog.items.filter((i) => i.category === 'knowledge');
  const socialItems = dayLog.items.filter((i) => i.category === 'social');

  // 5 Fardh Prayers specific count (incorporating Friday Jumu'ah)
  const fardhCompletedCount = dayLog.items.filter(
    (i) => (['fajr', 'asr', 'maghrib', 'isha'].includes(i.id) || i.id === 'dhuhr' || i.id === 'jummah_fardh') && i.completed
  ).length;

  // Visible Waqt plans based on Friday and user tab selection
  const visibleWaqtPlans = useMemo(() => {
    return WAQT_SALAH_PLANS.filter((plan) => {
      if (selectedWaqtTab !== 'all') {
        return plan.waqtId === selectedWaqtTab;
      }
      if (isSelectedDayFriday || showJummahMode) {
        if (plan.isRegularDayOnly) return false;
        return true;
      } else {
        if (plan.isFridayOnly) return false;
        return true;
      }
    });
  }, [isSelectedDayFriday, showJummahMode, selectedWaqtTab]);

  const totalAmalCount = dayLog.items.length;
  const completedAmalCount = dayLog.items.filter((i) => i.completed).length;
  const percentCompleted = Math.round((completedAmalCount / (totalAmalCount || 1)) * 100);

  const getAamalItemLabel = (item: { id: string; label: string }) => {
    return AAMAL_ITEM_TRANSLATIONS[item.id]?.[selectedLanguage]?.label || item.label;
  };

  const getAamalItemDetails = (item: { id: string; details?: string }) => {
    return AAMAL_ITEM_TRANSLATIONS[item.id]?.[selectedLanguage]?.details || item.details;
  };

  // Formatted display date
  const selectedDateFormatted = useMemo(() => {
    const [y, m, d] = selectedDateKey.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    if (selectedLanguage === 'bn') {
      const bnMonth = MONTH_NAMES_BN[m - 1];
      const bnDigits = (n: number) =>
        String(n).replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[parseInt(d, 10)]);
      return `${bnDigits(d)} ${bnMonth} ${bnDigits(y)}`;
    }
    const locale = LOCALE_MAP[selectedLanguage] || 'en-US';
    return dateObj.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }, [selectedDateKey, selectedLanguage]);

  // Calendar month header
  const calendarMonthHeader = useMemo(() => {
    const dateObj = new Date(calYear, calMonth, 1);
    if (selectedLanguage === 'bn') {
      const bnMonth = MONTH_NAMES_BN[calMonth];
      const bnDigits = (n: number) =>
        String(n).replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[parseInt(d, 10)]);
      return `${bnMonth} ${bnDigits(calYear)}`;
    }
    const locale = LOCALE_MAP[selectedLanguage] || 'en-US';
    return dateObj.toLocaleDateString(locale, {
      month: 'long',
      year: 'numeric',
    });
  }, [calYear, calMonth, selectedLanguage]);

  // Localized weekdays
  const weekdaysList = useMemo(() => {
    if (selectedLanguage === 'bn') return WEEKDAYS_BN;
    const locale = LOCALE_MAP[selectedLanguage] || 'en-US';
    const list: string[] = [];
    // 2026-10-04 is a Sunday
    for (let day = 4; day <= 10; day++) {
      const d = new Date(2026, 9, day);
      list.push(d.toLocaleDateString(locale, { weekday: 'short' }));
    }
    return list;
  }, [selectedLanguage]);

  // Streak & all logs calculation for calendar & trends
  const allLogs = useMemo(() => getAllAamalLogs(), [selectedDateKey, dayLog]);

  const streakDays = useMemo(() => {
    let count = 0;
    const now = new Date();
    for (let i = 0; i < 365; i++) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      const log = allLogs[key];
      if (log && log.items && log.items.filter((it) => it.completed).length >= 5) {
        count++;
      } else if (i === 0) {
        continue;
      } else {
        break;
      }
    }
    return count;
  }, [allLogs]);

  // Calendar Day Generation
  const calendarDays = useMemo(() => {
    const firstDayIndex = new Date(calYear, calMonth, 1).getDay();
    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
    const days = [];

    for (let i = 0; i < firstDayIndex; i++) {
      days.push({ dayNumber: null, dateKey: '' });
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const mStr = String(calMonth + 1).padStart(2, '0');
      const dStr = String(d).padStart(2, '0');
      const key = `${calYear}-${mStr}-${dStr}`;
      days.push({ dayNumber: d, dateKey: key });
    }

    return days;
  }, [calYear, calMonth]);

  const isSelectedToday = selectedDateKey === todayKey;

  // The Fardh waqts array (with Friday Jumu'ah dynamic display)
  const waqtsList = useMemo(() => {
    return [
      { id: 'fajr', nameEn: 'Fajr', nameBn: 'ফজর', icon: '🌅' },
      isSelectedDayFriday || showJummahMode
        ? { id: 'jummah_fardh', nameEn: "Jumu'ah", nameBn: 'জুমুআহ', icon: '🕌' }
        : { id: 'dhuhr', nameEn: 'Dhuhr', nameBn: 'যোহর', icon: '☀️' },
      { id: 'asr', nameEn: 'Asr', nameBn: 'আছর', icon: '🌤️' },
      { id: 'maghrib', nameEn: 'Maghrib', nameBn: 'মাগরিব', icon: '🌇' },
      { id: 'isha', nameEn: 'Isha', nameBn: 'ইশা', icon: '🌙' },
    ];
  }, [isSelectedDayFriday, showJummahMode]);

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* ===================== MUHASABAH TOP APP HEADER ===================== */}
      <div
        className={`p-4 sm:p-5 rounded-3xl border shadow-xl ${
          isDay
            ? 'bg-[#006747] text-white border-emerald-600/40 shadow-[#006747]/20'
            : 'bg-gradient-to-r from-[#0b292e] via-[#103a42] to-[#154b55] text-white border-[#1c5a66]'
        }`}
      >
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-white/15">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-inner">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
                <span>{AAMAL_UI.bannerTitle[selectedLanguage]}</span>
                <span className="text-xs font-normal text-emerald-100 opacity-90 hidden sm:inline">
                  {AAMAL_UI.bannerTag[selectedLanguage]}
                </span>
              </h1>
              <p className="text-[11px] text-emerald-100/90 font-medium">
                {AAMAL_UI.bannerHadith[selectedLanguage]}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsExportModalOpen(true);
                if (soundEnabled) soundHaptics.playTap();
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#009b68] hover:bg-[#00ab73] text-white text-xs font-bold shadow-md transition active:scale-95 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">{AAMAL_UI.downloadReport[selectedLanguage]}</span>
              <span className="sm:hidden">{AAMAL_UI.reportShort[selectedLanguage]}</span>
            </button>
          </div>
        </div>

        {/* Date Selector Row with < Date > Arrows */}
        <div className="flex items-center justify-between gap-2 pt-3">
          <button
            onClick={handlePrevDay}
            className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white transition active:scale-95 cursor-pointer"
            title={AAMAL_UI.prevDay?.[selectedLanguage] || 'Previous Day'}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="text-center flex-1">
            <div className="text-base sm:text-lg font-black tracking-wide text-[#facc15] font-sans">
              {selectedDateFormatted}
            </div>
            {isSelectedToday ? (
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold border border-white/25">
                {AAMAL_UI.today[selectedLanguage]}
              </span>
            ) : (
              <button
                onClick={handleJumpToToday}
                className="text-[10px] text-emerald-100 underline hover:text-white"
              >
                {AAMAL_UI.goToToday[selectedLanguage]}
              </button>
            )}
          </div>

          <button
            onClick={handleNextDay}
            className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white transition active:scale-95 cursor-pointer"
            title={AAMAL_UI.nextDay?.[selectedLanguage] || 'Next Day'}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* 2 Quick Summary Indicator Pills */}
        <div className="grid grid-cols-2 gap-2.5 pt-3">
          <div className="p-2.5 rounded-2xl bg-black/25 backdrop-blur-md border border-white/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">🕌</span>
              <span className="text-xs font-bold text-emerald-100">
                {AAMAL_UI.prayersBadge[selectedLanguage]}
              </span>
            </div>
            <div className="text-sm sm:text-base font-black font-mono text-emerald-300">
              {selectedLanguage === 'bn'
                ? `${String(fardhCompletedCount).replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[parseInt(d, 10)])}/৫`
                : `${fardhCompletedCount}/5`}
            </div>
          </div>

          <div className="p-2.5 rounded-2xl bg-black/25 backdrop-blur-md border border-white/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">✅</span>
              <span className="text-xs font-bold text-emerald-100">
                {AAMAL_UI.aamalBadge[selectedLanguage]}
              </span>
            </div>
            <div className="text-sm sm:text-base font-black font-mono text-[#facc15]">
              {selectedLanguage === 'bn'
                ? `${String(completedAmalCount).replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[parseInt(d, 10)])}/${String(totalAmalCount).replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[parseInt(d, 10)])}`
                : `${completedAmalCount}/${totalAmalCount}`}
            </div>
          </div>
        </div>
      </div>

      {/* ===================== 3 MAIN SUBTABS ===================== */}
      <div
        className={`flex items-center gap-1.5 p-1 rounded-2xl border ${
          isDay ? 'bg-[#f1f5f9] border-[#d2e2e6]' : 'bg-[#092226] border-[#14424a]'
        }`}
      >
        <button
          onClick={() => {
            setActiveSubTab('checklist');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
            activeSubTab === 'checklist'
              ? isDay
                ? 'bg-[#006747] text-white shadow-md'
                : 'bg-emerald-600 text-white shadow-md'
              : isDay
              ? 'text-[#3b6269] hover:text-[#006747]'
              : 'text-emerald-300 hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>{AAMAL_UI.tabChecklist[selectedLanguage]}</span>
        </button>

        <button
          onClick={() => {
            setActiveSubTab('calendar');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
            activeSubTab === 'calendar'
              ? isDay
                ? 'bg-[#006747] text-white shadow-md'
                : 'bg-emerald-600 text-white shadow-md'
              : isDay
              ? 'text-[#3b6269] hover:text-[#006747]'
              : 'text-emerald-300 hover:text-white'
          }`}
        >
          <CalendarIcon className="w-4 h-4" />
          <span>{AAMAL_UI.tabCalendar[selectedLanguage]}</span>
        </button>

        <button
          onClick={() => {
            setActiveSubTab('trends');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
            activeSubTab === 'trends'
              ? isDay
                ? 'bg-[#006747] text-white shadow-md'
                : 'bg-emerald-600 text-white shadow-md'
              : isDay
              ? 'text-[#3b6269] hover:text-[#006747]'
              : 'text-emerald-300 hover:text-white'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>{AAMAL_UI.tabTrends[selectedLanguage]}</span>
        </button>
      </div>

      {/* ===================== TAB 1: CHECKLIST ===================== */}
      {activeSubTab === 'checklist' && (
        <div className="space-y-4">
          {/* 1. Daily Fardh Prayers & Nawafil Tracker - Ultra Sondor & Attractive Design */}
          <div
            className={`rounded-3xl border shadow-xl overflow-hidden transition-all ${
              isDay
                ? 'bg-gradient-to-b from-white to-slate-50 border-emerald-600/20 shadow-emerald-950/5'
                : 'bg-gradient-to-b from-[#0c2a30] to-[#081e22] border-[#1b5561] shadow-2xl shadow-black/60'
            }`}
          >
            {/* Grand Header Bar */}
            <button
              onClick={() => toggleSectionCollapse('prayer')}
              className={`w-full p-4 sm:p-5 flex items-center justify-between text-left transition cursor-pointer select-none ${
                isDay ? 'hover:bg-emerald-50/50' : 'hover:bg-teal-950/50'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30">
                  <Clock className="w-6 h-6 stroke-[2.3]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className={`text-base sm:text-lg font-black tracking-tight ${isDay ? 'text-slate-900' : 'text-white'}`}>
                      {AAMAL_UI.secPrayer[selectedLanguage]}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/30 flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>{selectedLanguage === 'bn' ? 'নফলসহ ওয়াক্ত' : 'With Nawafil'}</span>
                    </span>
                  </div>
                  <p className={`text-[11px] sm:text-xs mt-0.5 font-medium ${isDay ? 'text-slate-600' : 'text-emerald-300/80'}`}>
                    {selectedLanguage === 'bn'
                      ? 'তাহিয়্যাতুল অজু (নফল), তাহিয়্যাতুল মসজিদ (নফল), সুন্নত, ফরজ ও বিতর ট্র্যাকার'
                      : 'Tahiyyatul Wudu (Nafl), Tahiyyatul Masjid (Nafl), Sunnah, Fardh & Witr Tracker'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-black font-mono shadow-sm">
                    {prayerItems.filter((i) => i.completed).length} / {prayerItems.length}
                  </span>
                  <span className="text-[10px] text-stone-500 dark:text-emerald-400/60 font-medium mt-0.5">
                    {Math.round(((prayerItems.filter((i) => i.completed).length) / (prayerItems.length || 1)) * 100)}% সম্পন্ন
                  </span>
                </div>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                  isDay ? 'bg-slate-100 text-slate-600' : 'bg-teal-900/40 text-emerald-300'
                }`}>
                  {collapsedSections.prayer ? (
                    <ChevronDown className="w-5 h-5" />
                  ) : (
                    <ChevronUp className="w-5 h-5" />
                  )}
                </div>
              </div>
            </button>

            {!collapsedSections.prayer && (
              <div className="p-4 sm:p-6 pt-0 space-y-5 border-t border-slate-100 dark:border-teal-900/40">
                {/* 1. TOP STATS & 5 FARDH PRAYER PROGRESS BEADS */}
                <div
                  className={`p-4 rounded-2xl border transition-all ${
                    isDay
                      ? 'bg-emerald-50/60 border-emerald-200/80'
                      : 'bg-gradient-to-r from-[#072429]/90 to-[#0c333a]/90 border-emerald-500/30'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🕌</span>
                      <div>
                        <h4 className={`text-xs sm:text-sm font-black ${isDay ? 'text-emerald-950' : 'text-emerald-100'}`}>
                          {selectedLanguage === 'bn' ? 'দৈনন্দিন ফরজ সালাত ট্র্যাকার' : 'Daily 5 Fardh Prayers Status'}
                        </h4>
                        <p className="text-[11px] text-stone-500 dark:text-emerald-300/70 font-medium">
                          {selectedLanguage === 'bn'
                            ? `আজ ${fardhCompletedCount}/৫ টি ওয়াক্তের ফরজ আদায় হয়েছে`
                            : `${fardhCompletedCount}/5 Fardh prayers completed today`}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <span className="px-2.5 py-1 rounded-xl text-xs font-bold font-mono bg-emerald-600 text-white shadow-sm">
                        {fardhCompletedCount === 5
                          ? (selectedLanguage === 'bn' ? '🌟 সব ফরজ সম্পন্ন!' : 'All 5 Done!')
                          : `${fardhCompletedCount}/৫ ফরজ`}
                      </span>
                    </div>
                  </div>

                  {/* 5 Fardh Waqt Quick Buttons / Spheres */}
                  <div className="grid grid-cols-5 gap-2 sm:gap-3">
                    {waqtsList.map((w) => {
                      const isFardhDone = Boolean(dayLog.items.find((i) => i.id === w.id)?.completed);
                      const targetTab = w.id === 'jummah_fardh' ? 'jummah' : w.id;
                      const isActiveTab = selectedWaqtTab === targetTab;

                      return (
                        <button
                          key={w.id}
                          onClick={() => {
                            setSelectedWaqtTab(targetTab);
                            if (soundEnabled) soundHaptics.playTap();
                          }}
                          className={`p-2 sm:p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer group active:scale-95 ${
                            isActiveTab
                              ? isDay
                                ? 'bg-white border-emerald-600 shadow-md ring-2 ring-emerald-500/30'
                                : 'bg-[#0f3d47] border-emerald-400 shadow-lg ring-2 ring-emerald-400/40 text-white'
                              : isFardhDone
                              ? isDay
                                ? 'bg-emerald-100/70 border-emerald-300 text-emerald-900'
                                : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                              : isDay
                              ? 'bg-white/80 border-slate-200 text-slate-700 hover:border-emerald-300'
                              : 'bg-black/20 border-white/5 text-stone-300 hover:border-teal-500/40'
                          }`}
                        >
                          <span className="text-xl sm:text-2xl group-hover:scale-110 transition-transform">
                            {w.icon}
                          </span>
                          <span className="text-[11px] sm:text-xs font-bold mt-1 truncate max-w-full">
                            {selectedLanguage === 'bn' ? w.nameBn : w.nameEn}
                          </span>
                          <span
                            className={`text-[9px] sm:text-[10px] font-bold mt-0.5 font-mono ${
                              isFardhDone
                                ? 'text-emerald-600 dark:text-emerald-400'
                                : 'text-stone-400 dark:text-stone-500'
                            }`}
                          >
                            {isFardhDone ? '✓ আদায়' : 'বাকি'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. WAQT SELECTOR TABS BAR (With Arabic Calligraphy & Count) */}
                <div>
                  <div className="flex items-center justify-between pb-2 px-0.5">
                    <span className="text-xs font-bold text-slate-700 dark:text-emerald-200 flex items-center gap-1.5">
                      <span>🧭</span>
                      <span>{selectedLanguage === 'bn' ? 'ওয়াক্ত নির্বাচন করুন:' : 'Select Prayer Waqt:'}</span>
                    </span>
                    <span className="text-[11px] text-stone-500 dark:text-emerald-400/70 font-medium">
                      {selectedWaqtTab === 'all'
                        ? (selectedLanguage === 'bn' ? 'সব ওয়াক্তের পূর্ণ দৃশ্য' : 'Full Day View')
                        : (selectedLanguage === 'bn' ? 'একক ওয়াক্তের দৃশ্য' : 'Single Waqt View')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none">
                    {/* All Prayers Tab */}
                    <button
                      onClick={() => {
                        setSelectedWaqtTab('all');
                        if (soundEnabled) soundHaptics.playTap();
                      }}
                      className={`px-3.5 py-2.5 rounded-2xl text-xs font-black shrink-0 transition-all flex items-center gap-2 cursor-pointer active:scale-95 ${
                        selectedWaqtTab === 'all'
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-700/30 ring-2 ring-emerald-400/50 scale-[1.02]'
                          : isDay
                          ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          : 'bg-[#081e22] text-emerald-300 hover:bg-[#123940] border border-[#17464f]'
                      }`}
                    >
                      <span className="text-base">🌟</span>
                      <span>{selectedLanguage === 'bn' ? 'সব নামাজ' : 'All Prayers'}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-white/20 font-mono">
                        {prayerItems.filter((i) => i.completed).length}/{prayerItems.length}
                      </span>
                    </button>

                    {/* Individual Waqt Tabs */}
                    {WAQT_SALAH_PLANS.map((plan) => {
                      if (plan.isFridayOnly && !(isSelectedDayFriday || showJummahMode)) return null;
                      if (plan.isRegularDayOnly && (isSelectedDayFriday || showJummahMode)) return null;

                      const planCompleted = plan.items.filter((i) =>
                        dayLog.items.find((item) => item.id === i.id)?.completed
                      ).length;
                      const isAllPlanDone = planCompleted === plan.items.length;
                      const isTabActive = selectedWaqtTab === plan.waqtId;

                      const arabicShort = (() => {
                        switch (plan.waqtId) {
                          case 'fajr': return 'الفجر';
                          case 'dhuhr': return 'الظهر';
                          case 'jummah': return 'الجمعة';
                          case 'asr': return 'العصر';
                          case 'maghrib': return 'المغرب';
                          case 'isha': return 'العشاء';
                          default: return '';
                        }
                      })();

                      return (
                        <button
                          key={plan.waqtId}
                          onClick={() => {
                            setSelectedWaqtTab(plan.waqtId);
                            if (soundEnabled) soundHaptics.playTap();
                          }}
                          className={`px-3.5 py-2.5 rounded-2xl text-xs font-bold shrink-0 transition-all flex items-center gap-2 cursor-pointer active:scale-95 ${
                            isTabActive
                              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-700/30 ring-2 ring-emerald-400/50 scale-[1.02]'
                              : isDay
                              ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              : 'bg-[#081e22] text-emerald-300 hover:bg-[#123940] border border-[#17464f]'
                          }`}
                        >
                          <span className="text-base">{plan.icon}</span>
                          <span className="font-black">
                            {plan.waqtId === 'jummah'
                              ? selectedLanguage === 'bn' ? 'জুমুআহ' : "Jumu'ah"
                              : selectedLanguage === 'bn'
                              ? plan.nameBn.replace(' নামাজ', '')
                              : plan.nameEn.replace(' Prayer', '')}
                          </span>
                          <span className="text-[10px] font-arabic opacity-80 hidden sm:inline">
                            {arabicShort}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                              isAllPlanDone
                                ? 'bg-emerald-500 text-white'
                                : isDay
                                ? 'bg-slate-200 text-slate-700'
                                : 'bg-teal-900/60 text-emerald-300'
                            }`}
                          >
                            {planCompleted}/{plan.items.length} {isAllPlanDone && '✓'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. FRIDAY (জুমুআহ বার) SPECIAL EXPERIENCE CARD */}
                {isSelectedDayFriday ? (
                  <div
                    className={`p-4 sm:p-5 rounded-3xl border shadow-lg transition-all ${
                      isDay
                        ? 'bg-gradient-to-r from-amber-50 via-emerald-50/50 to-teal-50 border-amber-300/80 text-amber-950'
                        : 'bg-gradient-to-r from-[#173a2a] via-[#103028] to-[#0c2b33] border-emerald-500/50 text-emerald-100 shadow-emerald-950/40'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start sm:items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-300 flex items-center justify-center shrink-0 text-2xl shadow-inner">
                          🕌
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-sm sm:text-base font-black tracking-tight">
                              {selectedLanguage === 'bn'
                                ? 'আজ পবিত্র জুমুআহর দিন (জুমুআহ বার)'
                                : "Today is Blessed Friday (Jumu'ah Day)"}
                            </h4>
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/25 text-amber-800 dark:text-amber-300 border border-amber-500/40 font-mono">
                              {selectedLanguage === 'bn' ? 'সাইয়্যিদুল আইয়্যাম (দিনসমূহের সর্দার)' : "Sayyidul Ayyam"}
                            </span>
                          </div>
                          <p className="text-xs mt-1 opacity-90 leading-relaxed">
                            {selectedLanguage === 'bn'
                              ? 'খুতবা শ্রবণ, তাহিয়্যাতুল অজু ও মসজিদ (২+২ রাকাত), কাবলাল জুমুআহ ৪ রাকাত, ২ রাকাত ফরজ ও ৪ রাকাত বাদাল জুমুআহ আদায় করুন।'
                              : "Attend early for Khutbah, Tahiyyatul Wudu/Masjid (2+2), Qablal Jumu'ah (4), Fardh (2) & Ba'dal Jumu'ah (4)."}
                          </p>
                        </div>
                      </div>

                      {/* Mode Switcher */}
                      <div className="flex items-center gap-1.5 bg-black/15 dark:bg-black/40 p-1.5 rounded-2xl shrink-0 self-start sm:self-auto border border-white/10">
                        <button
                          onClick={() => {
                            setShowJummahMode(true);
                            if (soundEnabled) soundHaptics.playTap();
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                            showJummahMode
                              ? 'bg-emerald-600 text-white shadow-md ring-1 ring-emerald-400'
                              : 'text-stone-600 dark:text-stone-300 hover:text-emerald-500'
                          }`}
                        >
                          {selectedLanguage === 'bn' ? '🕌 পবিত্র জুমুআহ' : "🕌 Jumu'ah"}
                        </button>
                        <button
                          onClick={() => {
                            setShowJummahMode(false);
                            if (soundEnabled) soundHaptics.playTap();
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                            !showJummahMode
                              ? 'bg-emerald-600 text-white shadow-md ring-1 ring-emerald-400'
                              : 'text-stone-600 dark:text-stone-300 hover:text-emerald-500'
                          }`}
                        >
                          {selectedLanguage === 'bn' ? '☀️ সাধারণ যোহর' : '☀️ Regular Dhuhr'}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between px-1">
                    <span className="text-xs text-stone-600 dark:text-emerald-300/80 font-medium flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                      <span>
                        {selectedLanguage === 'bn'
                          ? 'তাহিয়্যাতুল অজু, তাহিয়্যাতুল মসজিদ, সুন্নত, ফরজ ও নফল সালাতের পূর্ণ তালিকা:'
                          : 'Complete breakdown of Tahiyyatul Wudu/Masjid, Sunnah, Fardh & Nafl:'}
                      </span>
                    </span>
                    <button
                      onClick={() => {
                        setShowJummahMode((prev) => !prev);
                        if (soundEnabled) soundHaptics.playTap();
                      }}
                      className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>🕌</span>
                      <span>
                        {showJummahMode
                          ? (selectedLanguage === 'bn' ? 'যোহরে ফিরুন' : 'Switch to Dhuhr')
                          : (selectedLanguage === 'bn' ? 'জুমুআহর আমল দেখুন' : "View Jumu'ah Plan")}
                      </span>
                    </button>
                  </div>
                )}

                {/* 4. RENDER WAQT SALAH PLANS WITH ARTISAN RAKAT CARDS */}
                <div className="space-y-5">
                  {visibleWaqtPlans.map((plan) => {
                    const planItems = plan.items;
                    const completedInPlan = planItems.filter((i) =>
                      dayLog.items.find((item) => item.id === i.id)?.completed
                    ).length;
                    const isAllDone = completedInPlan === planItems.length;
                    const completionRatio = planItems.length > 0 ? (completedInPlan / planItems.length) * 100 : 0;

                    return (
                      <div
                        key={plan.waqtId}
                        className={`rounded-3xl border overflow-hidden transition-all duration-200 shadow-md ${
                          isAllDone
                            ? isDay
                              ? 'bg-white border-emerald-500/40 ring-1 ring-emerald-500/20'
                              : 'bg-gradient-to-b from-[#092d33] to-[#071f23] border-emerald-500/50 ring-1 ring-emerald-500/30'
                            : isDay
                            ? 'bg-white border-slate-200/90'
                            : 'bg-[#081e22]/95 border-[#17464f]'
                        }`}
                      >
                        {/* Waqt Hero Banner */}
                        <div
                          className={`p-4 sm:p-5 border-b transition-colors ${
                            isAllDone
                              ? isDay
                                ? 'bg-gradient-to-r from-emerald-50 via-teal-50 to-white border-emerald-200'
                                : 'bg-gradient-to-r from-emerald-950/70 via-teal-950/40 to-[#081e22] border-emerald-800/40'
                              : isDay
                              ? 'bg-slate-50/80 border-slate-100'
                              : 'bg-black/20 border-teal-900/40'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <span className="text-3xl sm:text-4xl filter drop-shadow-sm">{plan.icon}</span>
                              <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h4 className={`text-base sm:text-lg font-black tracking-tight ${
                                    isDay ? 'text-slate-900' : 'text-white'
                                  }`}>
                                    {selectedLanguage === 'bn' ? plan.nameBn : plan.nameEn}
                                  </h4>
                                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                                    {plan.totalRakats}
                                  </span>
                                </div>
                                <p className="text-xs text-stone-500 dark:text-emerald-300/80 font-medium mt-0.5">
                                  {selectedLanguage === 'bn'
                                    ? `${completedInPlan}/${planItems.length} টি সালাত সম্পন্ন হয়েছে (${Math.round(completionRatio)}%)`
                                    : `${completedInPlan}/${planItems.length} prayers completed (${Math.round(completionRatio)}%)`}
                                </p>
                              </div>
                            </div>

                            {/* Quick Mark All Button */}
                            <button
                              onClick={() => handleToggleAllWaqtItems(plan)}
                              className={`px-4 py-2 rounded-2xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer active:scale-95 self-start sm:self-auto shadow-sm ${
                                isAllDone
                                  ? 'bg-emerald-600 text-white shadow-emerald-700/30 ring-2 ring-emerald-400/40'
                                  : isDay
                                  ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-300'
                                  : 'bg-[#0f343c] text-emerald-200 hover:bg-[#15444e] border border-teal-600/40'
                              }`}
                            >
                              <Check className="w-4 h-4 stroke-[3]" />
                              <span>
                                {isAllDone
                                  ? (selectedLanguage === 'bn' ? 'সব আদায় সম্পন্ন ✓' : 'All Completed ✓')
                                  : (selectedLanguage === 'bn' ? 'ওয়াক্তের সব টিক দিন' : 'Mark All Waqt')}
                              </span>
                            </button>
                          </div>

                          {/* Progress Line */}
                          <div className="w-full bg-slate-200/60 dark:bg-teal-950/80 h-2 rounded-full mt-3 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-300"
                              style={{ width: `${completionRatio}%` }}
                            />
                          </div>
                        </div>

                        {/* Rakat Items List for this Salah - Step-by-Step Artisan Cards */}
                        <div className="p-3 sm:p-5 space-y-2.5">
                          {planItems.map((rakat, rakatIndex) => {
                            const isChecked =
                              dayLog.items.find((item) => item.id === rakat.id)?.completed || false;

                            // Badge type coloring & icons
                            const typeBadge = (() => {
                              switch (rakat.type) {
                                case 'fardh':
                                  return {
                                    bg: 'bg-emerald-500/25 text-emerald-700 dark:text-emerald-200 border-emerald-500/50 font-black ring-1 ring-emerald-500/20',
                                    label: selectedLanguage === 'bn' ? '⭐ অপরিহার্য ফরজ' : '⭐ Obligatory Fardh',
                                    icon: <Star className="w-3.5 h-3.5 fill-current" />,
                                  };
                                case 'sunnah':
                                  return {
                                    bg: 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/40 font-bold',
                                    label: selectedLanguage === 'bn' ? '☀️ সুন্নাতে মুয়াক্কাদা' : '☀️ Sunnah',
                                    icon: <Sun className="w-3.5 h-3.5" />,
                                  };
                                case 'wajib':
                                  return {
                                    bg: 'bg-sky-500/20 text-sky-700 dark:text-sky-300 border-sky-500/40 font-bold',
                                    label: selectedLanguage === 'bn' ? '🌙 ওয়াজিব বিতর' : '🌙 Wajib Witr',
                                    icon: <Moon className="w-3.5 h-3.5" />,
                                  };
                                case 'nafl':
                                default:
                                  if (rakat.id.includes('tahiyyatul_wudu')) {
                                    return {
                                      bg: 'bg-violet-500/20 text-violet-700 dark:text-violet-300 border-violet-500/40 font-bold',
                                      label: selectedLanguage === 'bn' ? '💧 নফল • তাহিয়্যাতুল অজু' : '💧 Nafl • Tahiyyatul Wudu',
                                      icon: <Droplets className="w-3.5 h-3.5" />,
                                    };
                                  }
                                  if (rakat.id.includes('tahiyyatul_masjid')) {
                                    return {
                                      bg: 'bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border-indigo-500/40 font-bold',
                                      label: selectedLanguage === 'bn' ? '🕌 নফল • তাহিয়্যাতুল মসজিদ' : '🕌 Nafl • Tahiyyatul Masjid',
                                      icon: <span>🕌</span>,
                                    };
                                  }
                                  return {
                                    bg: 'bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-500/40 font-bold',
                                    label: selectedLanguage === 'bn' ? '🌸 নফল সালাত' : '🌸 Nafl',
                                    icon: <Sparkles className="w-3.5 h-3.5" />,
                                  };
                              }
                            })();

                            const itemTitle =
                              getAamalItemLabel({ id: rakat.id, label: rakat.labelBn }) ||
                              (selectedLanguage === 'bn' ? rakat.labelBn : rakat.labelEn);

                            const itemDetails =
                              getAamalItemDetails({ id: rakat.id, details: rakat.detailsBn }) ||
                              (selectedLanguage === 'bn' ? rakat.detailsBn : rakat.detailsEn);

                            return (
                              <div
                                key={rakat.id}
                                onClick={() => handleToggleItem(rakat.id)}
                                className={`p-3.5 sm:p-4 rounded-2xl border transition-all flex items-center justify-between gap-3.5 cursor-pointer select-none active:scale-[0.99] group ${
                                  isChecked
                                    ? isDay
                                      ? 'bg-emerald-50/90 border-emerald-400 text-emerald-950 shadow-sm'
                                      : 'bg-gradient-to-r from-[#092e34] to-[#07252a] border-emerald-500/70 text-emerald-50 shadow-md ring-1 ring-emerald-500/30'
                                    : isDay
                                    ? 'bg-slate-50/70 border-slate-200 text-slate-800 hover:bg-white hover:border-emerald-300 hover:shadow-sm'
                                    : 'bg-[#092226] border-[#153e46] text-emerald-200 hover:bg-[#0e2c31] hover:border-teal-500/40'
                                }`}
                              >
                                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                                  {/* Step Sequence Badge */}
                                  <span className={`w-6 h-6 rounded-lg text-[10px] font-mono font-bold flex items-center justify-center shrink-0 ${
                                    isChecked
                                      ? 'bg-emerald-600 text-white'
                                      : isDay
                                      ? 'bg-slate-200 text-slate-700'
                                      : 'bg-teal-900/60 text-emerald-300'
                                  }`}>
                                    {rakatIndex + 1}
                                  </span>

                                  {/* Big Circular Tactile Checkbox */}
                                  <div
                                    className={`w-6 h-6 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${
                                      isChecked
                                        ? 'bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-600/40 scale-105'
                                        : 'border-slate-400 dark:border-teal-600 group-hover:border-emerald-500'
                                    }`}
                                  >
                                    {isChecked && <Check className="w-4 h-4 stroke-[3.5]" />}
                                  </div>

                                  {/* Info Body */}
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center flex-wrap gap-2">
                                      <span
                                        className={`text-xs sm:text-sm font-black ${
                                          isChecked
                                            ? 'text-emerald-900 dark:text-emerald-100 line-through decoration-emerald-500/50'
                                            : isDay
                                            ? 'text-slate-900'
                                            : 'text-white'
                                        }`}
                                      >
                                        {itemTitle}
                                      </span>

                                      {/* Rakat count badge */}
                                      <span className="px-2 py-0.5 rounded-lg text-[10px] sm:text-xs font-mono font-black bg-slate-200/80 dark:bg-teal-950 text-slate-800 dark:text-emerald-300 border border-slate-300/40 dark:border-teal-800/40">
                                        {rakat.rakats}
                                      </span>

                                      {/* Type badge */}
                                      <span
                                        className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border flex items-center gap-1 ${typeBadge.bg}`}
                                      >
                                        {typeBadge.label}
                                      </span>
                                    </div>

                                    {/* Spiritual Fadilat / Guidance note */}
                                    {itemDetails && (
                                      <div className="text-[11px] sm:text-xs text-stone-600 dark:text-stone-300 font-medium pt-1 line-clamp-2">
                                        {itemDetails}
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Right: Arabic Calligraphy & Points */}
                                <div className="flex flex-col items-end shrink-0 pl-2">
                                  {rakat.arabicLabel && (
                                    <span className="text-xs sm:text-sm font-arabic font-bold text-amber-600 dark:text-amber-300 leading-tight">
                                      {rakat.arabicLabel}
                                    </span>
                                  )}
                                  <span className="text-[10px] sm:text-[11px] font-mono font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                                    +{rakat.points} {AAMAL_UI.pts[selectedLanguage]}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* 5. JAMAT / CONGREGATIONAL PRAYER CARD (২৭ গুণ বেশি সওয়াব) */}
                {(() => {
                  const jamatItem = dayLog.items.find((i) => i.id === 'jamat_fardh');
                  if (!jamatItem) return null;
                  return (
                    <div
                      onClick={() => handleToggleItem('jamat_fardh')}
                      className={`p-4 sm:p-5 rounded-3xl border transition-all flex items-center justify-between cursor-pointer select-none active:scale-[0.99] group shadow-md ${
                        jamatItem.completed
                          ? isDay
                            ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-400 text-emerald-950 shadow-emerald-900/5'
                            : 'bg-gradient-to-r from-[#0a2e34] to-[#072429] border-emerald-500/60 text-emerald-50 shadow-lg'
                          : isDay
                          ? 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-white hover:border-emerald-300'
                          : 'bg-[#081e22] border-[#16444d] text-emerald-300 hover:bg-[#0f343c]'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                            jamatItem.completed
                              ? 'bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-600/40'
                              : 'border-slate-400 dark:border-teal-700 group-hover:border-emerald-500'
                          }`}
                        >
                          {jamatItem.completed && <Check className="w-4 h-4 stroke-[3.5]" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm sm:text-base font-black">
                              {AAMAL_UI.jamatLabel[selectedLanguage]}
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/40">
                              ⭐ ২৭ গুণ বেশি সওয়াব
                            </span>
                          </div>
                          <div className="text-xs text-stone-600 dark:text-stone-300 font-medium mt-0.5">
                            {AAMAL_UI.jamatSub[selectedLanguage]}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs sm:text-sm font-black text-emerald-500 font-mono shrink-0 pl-2">
                        +25 {AAMAL_UI.pts[selectedLanguage]}
                      </span>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>

          {/* 2. Sunnah & Nafl Prayers */}
          <div
            className={`rounded-3xl border shadow-lg overflow-hidden transition-all ${
              isDay ? 'bg-white border-slate-200' : 'bg-[#0c2a30] border-[#184a54]'
            }`}
          >
            <button
              onClick={() => toggleSectionCollapse('sunnah')}
              className={`w-full p-4 sm:p-5 flex items-center justify-between text-left transition ${
                isDay ? 'hover:bg-slate-50' : 'hover:bg-teal-950/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`text-base font-bold ${isDay ? 'text-slate-900' : 'text-white'}`}>
                    {AAMAL_UI.secSunnah[selectedLanguage]}
                  </h3>
                  <p className={`text-[11px] ${isDay ? 'text-slate-500' : 'text-emerald-300/80'}`}>
                    {AAMAL_UI.secSunnahSub[selectedLanguage]}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-300 text-xs font-black font-mono">
                  {sunnahItems.filter((i) => i.completed).length}/{sunnahItems.length}
                </span>
                {collapsedSections.sunnah ? (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                )}
              </div>
            </button>

            {!collapsedSections.sunnah && (
              <div className="p-4 sm:p-6 pt-0 space-y-2.5 border-t border-slate-100 dark:border-teal-900/30">
                {sunnahItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleToggleItem(item.id)}
                    className={`p-3.5 sm:p-4 rounded-2xl border transition-all flex items-center justify-between gap-3.5 cursor-pointer select-none active:scale-[0.99] group ${
                      item.completed
                        ? isDay
                          ? 'bg-emerald-50/90 border-emerald-400 text-emerald-950 shadow-sm'
                          : 'bg-gradient-to-r from-[#092e34] to-[#07252a] border-emerald-500/70 text-emerald-50 shadow-md ring-1 ring-emerald-500/30'
                        : isDay
                        ? 'bg-slate-50/70 border-slate-200 text-slate-800 hover:bg-white hover:border-emerald-300'
                        : 'bg-[#092226] border-[#153e46] text-emerald-200 hover:bg-[#0e2c31] hover:border-teal-500/40'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0 flex-1">
                      <div
                        className={`w-6 h-6 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${
                          item.completed
                            ? 'bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-600/40 scale-105'
                            : 'border-slate-400 dark:border-teal-600 group-hover:border-emerald-500'
                        }`}
                      >
                        {item.completed && <Check className="w-4 h-4 stroke-[3.5]" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-xs sm:text-sm font-black ${
                            item.completed
                              ? 'text-emerald-900 dark:text-emerald-100 line-through decoration-emerald-500/50'
                              : isDay
                              ? 'text-slate-900'
                              : 'text-white'
                          }`}>
                            {getAamalItemLabel(item)}
                          </span>
                          <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                            নফল আমল
                          </span>
                        </div>
                        {getAamalItemDetails(item) && (
                          <div className="text-[11px] sm:text-xs text-stone-600 dark:text-stone-300 font-medium pt-0.5">
                            {getAamalItemDetails(item)}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end shrink-0 pl-2">
                      {item.arabicLabel && (
                        <span className="text-xs sm:text-sm font-arabic font-bold text-amber-600 dark:text-amber-300">
                          {item.arabicLabel}
                        </span>
                      )}
                      <span className="text-[10px] sm:text-[11px] font-mono font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                        +{item.points || 15} {AAMAL_UI.pts[selectedLanguage]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 3. Quran & Dhikr */}
          <div
            className={`rounded-3xl border shadow-lg overflow-hidden transition-all ${
              isDay ? 'bg-white border-slate-200' : 'bg-[#0c2a30] border-[#184a54]'
            }`}
          >
            <button
              onClick={() => toggleSectionCollapse('quran')}
              className={`w-full p-4 sm:p-5 flex items-center justify-between text-left transition ${
                isDay ? 'hover:bg-slate-50' : 'hover:bg-teal-950/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-teal-500/15 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`text-base font-bold ${isDay ? 'text-slate-900' : 'text-white'}`}>
                    {AAMAL_UI.secQuran[selectedLanguage]}
                  </h3>
                  <p className={`text-[11px] ${isDay ? 'text-slate-500' : 'text-emerald-300/80'}`}>
                    {AAMAL_UI.secQuranSub[selectedLanguage]}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-full bg-teal-500/15 text-teal-600 dark:text-emerald-300 text-xs font-black font-mono">
                  {quranItems.filter((i) => i.completed).length}/{quranItems.length}
                </span>
                {collapsedSections.quran ? (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                )}
              </div>
            </button>

            {!collapsedSections.quran && (
              <div className="p-4 sm:p-5 pt-0 space-y-3 border-t border-slate-100 dark:border-teal-900/30">
                {/* Quran Page Counter Card */}
                <div
                  className={`p-3.5 rounded-2xl border flex items-center justify-between ${
                    isDay ? 'bg-blue-50/70 border-blue-200' : 'bg-[#09222c] border-blue-500/30'
                  }`}
                >
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-blue-800 dark:text-blue-300">
                      {AAMAL_UI.quranPageCountTitle[selectedLanguage]}
                    </div>
                    <div className="text-[11px] text-blue-600 dark:text-blue-400/80">
                      {AAMAL_UI.quranPageCountSub[selectedLanguage]}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleUpdateQuranPages(-1)}
                      className="w-7 h-7 rounded-xl bg-blue-500/20 hover:bg-blue-500/40 text-blue-700 dark:text-blue-300 font-bold flex items-center justify-center active:scale-95"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-mono font-black text-base px-1.5 text-blue-700 dark:text-blue-200">
                      {dayLog.quranPagesRead || 0}
                    </span>
                    <button
                      onClick={() => handleUpdateQuranPages(1)}
                      className="w-7 h-7 rounded-xl bg-blue-500/20 hover:bg-blue-500/40 text-blue-700 dark:text-blue-300 font-bold flex items-center justify-center active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {quranItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleToggleItem(item.id)}
                    className={`p-3 rounded-2xl border transition flex items-center justify-between cursor-pointer ${
                      item.completed
                        ? isDay
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                          : 'bg-[#092b30] border-emerald-500/50 text-emerald-100'
                        : isDay
                        ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        : 'bg-[#081e22] border-[#16444d] text-emerald-300 hover:bg-[#0f343c]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          item.completed
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'border-slate-400 dark:border-teal-700'
                        }`}
                      >
                        {item.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold">{getAamalItemLabel(item)}</div>
                        {getAamalItemDetails(item) && (
                          <div className="text-[11px] text-stone-600 dark:text-stone-300 font-medium">
                            {getAamalItemDetails(item)}
                          </div>
                        )}
                      </div>
                    </div>
                    {item.arabicLabel && (
                      <span className="text-xs font-arabic text-amber-600 dark:text-amber-400 font-bold shrink-0">
                        {item.arabicLabel}
                      </span>
                    )}
                  </div>
                ))}

                {/* Zikr Count Breakdown Integration */}
                {dayLog.zikrBreakdown && dayLog.zikrBreakdown.length > 0 && (
                  <div
                    className={`p-3.5 rounded-2xl border space-y-2 ${
                      isDay ? 'bg-slate-50 border-slate-200' : 'bg-[#071d21] border-[#123a41]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-emerald-300">
                      <span>{AAMAL_UI.dhikrBreakdownTitle[selectedLanguage]}</span>
                      <span className="font-mono text-emerald-500">
                        {AAMAL_UI.dhikrTotal[selectedLanguage]} {dayLog.dhikrCount} {AAMAL_UI.times[selectedLanguage]}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                      {dayLog.zikrBreakdown
                        .filter((z) => z.count > 0)
                        .map((z, zIdx) => (
                          <div
                            key={zIdx}
                            className={`p-2 rounded-xl border text-xs ${
                              isDay
                                ? 'bg-white border-slate-200'
                                : 'bg-[#0a2327] border-[#15434a]'
                            }`}
                          >
                            <div className="font-bold truncate text-[11px]">{z.name}</div>
                            <div className="text-amber-600 dark:text-amber-400 font-mono font-bold text-xs mt-0.5">
                              {z.count} {AAMAL_UI.times[selectedLanguage]}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 4. Morning & Evening Adhkar */}
          <div
            className={`rounded-3xl border shadow-lg overflow-hidden transition-all ${
              isDay ? 'bg-white border-slate-200' : 'bg-[#0c2a30] border-[#184a54]'
            }`}
          >
            <button
              onClick={() => toggleSectionCollapse('morning_evening')}
              className={`w-full p-4 sm:p-5 flex items-center justify-between text-left transition ${
                isDay ? 'hover:bg-slate-50' : 'hover:bg-teal-950/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-orange-500/15 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`text-base font-bold ${isDay ? 'text-slate-900' : 'text-white'}`}>
                    {AAMAL_UI.secMorningEvening[selectedLanguage]}
                  </h3>
                  <p className={`text-[11px] ${isDay ? 'text-slate-500' : 'text-emerald-300/80'}`}>
                    {AAMAL_UI.secMorningEveningSub[selectedLanguage]}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-full bg-orange-500/15 text-orange-600 dark:text-orange-300 text-xs font-black font-mono">
                  {morningEveningItems.filter((i) => i.completed).length}/
                  {morningEveningItems.length}
                </span>
                {collapsedSections.morning_evening ? (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                )}
              </div>
            </button>

            {!collapsedSections.morning_evening && (
              <div className="p-4 sm:p-5 pt-0 space-y-2 border-t border-slate-100 dark:border-teal-900/30">
                {morningEveningItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleToggleItem(item.id)}
                    className={`p-3 rounded-2xl border transition flex items-center justify-between cursor-pointer ${
                      item.completed
                        ? isDay
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                          : 'bg-[#092b30] border-emerald-500/50 text-emerald-100'
                        : isDay
                        ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        : 'bg-[#081e22] border-[#16444d] text-emerald-300 hover:bg-[#0f343c]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          item.completed
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'border-slate-400 dark:border-teal-700'
                        }`}
                      >
                        {item.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold">{getAamalItemLabel(item)}</div>
                        {getAamalItemDetails(item) && (
                          <div className="text-[11px] text-stone-600 dark:text-stone-300 font-medium">
                            {getAamalItemDetails(item)}
                          </div>
                        )}
                      </div>
                    </div>
                    {item.arabicLabel && (
                      <span className="text-xs font-arabic text-amber-600 dark:text-amber-400 font-bold shrink-0">
                        {item.arabicLabel}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 5. Bedtime Sunnah & Adhkar */}
          <div
            className={`rounded-3xl border shadow-lg overflow-hidden transition-all ${
              isDay ? 'bg-white border-slate-200' : 'bg-[#0c2a30] border-[#184a54]'
            }`}
          >
            <button
              onClick={() => toggleSectionCollapse('bedtime')}
              className={`w-full p-4 sm:p-5 flex items-center justify-between text-left transition ${
                isDay ? 'hover:bg-slate-50' : 'hover:bg-teal-950/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <Moon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`text-base font-bold ${isDay ? 'text-slate-900' : 'text-white'}`}>
                    {AAMAL_UI.secBedtime[selectedLanguage]}
                  </h3>
                  <p className={`text-[11px] ${isDay ? 'text-slate-500' : 'text-emerald-300/80'}`}>
                    {AAMAL_UI.secBedtimeSub[selectedLanguage]}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-full bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 text-xs font-black font-mono">
                  {bedtimeItems.filter((i) => i.completed).length}/{bedtimeItems.length}
                </span>
                {collapsedSections.bedtime ? (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                )}
              </div>
            </button>

            {!collapsedSections.bedtime && (
              <div className="p-4 sm:p-5 pt-0 space-y-2 border-t border-slate-100 dark:border-teal-900/30">
                {bedtimeItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleToggleItem(item.id)}
                    className={`p-3 rounded-2xl border transition flex items-center justify-between cursor-pointer ${
                      item.completed
                        ? isDay
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                          : 'bg-[#092b30] border-emerald-500/50 text-emerald-100'
                        : isDay
                        ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        : 'bg-[#081e22] border-[#16444d] text-emerald-300 hover:bg-[#0f343c]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          item.completed
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'border-slate-400 dark:border-teal-700'
                        }`}
                      >
                        {item.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold">{getAamalItemLabel(item)}</div>
                        {getAamalItemDetails(item) && (
                          <div className="text-[11px] text-stone-600 dark:text-stone-300 font-medium">
                            {getAamalItemDetails(item)}
                          </div>
                        )}
                      </div>
                    </div>
                    {item.arabicLabel && (
                      <span className="text-xs font-arabic text-amber-600 dark:text-amber-400 font-bold shrink-0">
                        {item.arabicLabel}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 6. Character & Akhlaq */}
          <div
            className={`rounded-3xl border shadow-lg overflow-hidden transition-all ${
              isDay ? 'bg-white border-slate-200' : 'bg-[#0c2a30] border-[#184a54]'
            }`}
          >
            <button
              onClick={() => toggleSectionCollapse('character')}
              className={`w-full p-4 sm:p-5 flex items-center justify-between text-left transition ${
                isDay ? 'hover:bg-slate-50' : 'hover:bg-teal-950/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`text-base font-bold ${isDay ? 'text-slate-900' : 'text-white'}`}>
                    {AAMAL_UI.secCharacter[selectedLanguage]}
                  </h3>
                  <p className={`text-[11px] ${isDay ? 'text-slate-500' : 'text-emerald-300/80'}`}>
                    {AAMAL_UI.secCharacterSub[selectedLanguage]}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-300 text-xs font-black font-mono">
                  {characterItems.filter((i) => i.completed).length}/{characterItems.length}
                </span>
                {collapsedSections.character ? (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                )}
              </div>
            </button>

            {!collapsedSections.character && (
              <div className="p-4 sm:p-5 pt-0 space-y-2 border-t border-slate-100 dark:border-teal-900/30">
                {characterItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleToggleItem(item.id)}
                    className={`p-3 rounded-2xl border transition flex items-center justify-between cursor-pointer ${
                      item.completed
                        ? isDay
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                          : 'bg-[#092b30] border-emerald-500/50 text-emerald-100'
                        : isDay
                        ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        : 'bg-[#081e22] border-[#16444d] text-emerald-300 hover:bg-[#0f343c]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          item.completed
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'border-slate-400 dark:border-teal-700'
                        }`}
                      >
                        {item.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold">{getAamalItemLabel(item)}</div>
                        {getAamalItemDetails(item) && (
                          <div className="text-[11px] text-stone-600 dark:text-stone-300 font-medium">
                            {getAamalItemDetails(item)}
                          </div>
                        )}
                      </div>
                    </div>
                    {item.arabicLabel && (
                      <span className="text-xs font-arabic text-amber-600 dark:text-amber-400 font-bold shrink-0">
                        {item.arabicLabel}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 7. Knowledge & Dawah */}
          <div
            className={`rounded-3xl border shadow-lg overflow-hidden transition-all ${
              isDay ? 'bg-white border-slate-200' : 'bg-[#0c2a30] border-[#184a54]'
            }`}
          >
            <button
              onClick={() => toggleSectionCollapse('knowledge')}
              className={`w-full p-4 sm:p-5 flex items-center justify-between text-left transition ${
                isDay ? 'hover:bg-slate-50' : 'hover:bg-teal-950/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-cyan-500/15 text-cyan-600 dark:text-emerald-400 flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`text-base font-bold ${isDay ? 'text-slate-900' : 'text-white'}`}>
                    {AAMAL_UI.secKnowledge[selectedLanguage]}
                  </h3>
                  <p className={`text-[11px] ${isDay ? 'text-slate-500' : 'text-emerald-300/80'}`}>
                    {AAMAL_UI.secKnowledgeSub[selectedLanguage]}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-full bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 text-xs font-black font-mono">
                  {knowledgeItems.filter((i) => i.completed).length}/{knowledgeItems.length}
                </span>
                {collapsedSections.knowledge ? (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                )}
              </div>
            </button>

            {!collapsedSections.knowledge && (
              <div className="p-4 sm:p-5 pt-0 space-y-2 border-t border-slate-100 dark:border-teal-900/30">
                {knowledgeItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleToggleItem(item.id)}
                    className={`p-3 rounded-2xl border transition flex items-center justify-between cursor-pointer ${
                      item.completed
                        ? isDay
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                          : 'bg-[#092b30] border-emerald-500/50 text-emerald-100'
                        : isDay
                        ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        : 'bg-[#081e22] border-[#16444d] text-emerald-300 hover:bg-[#0f343c]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          item.completed
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'border-slate-400 dark:border-teal-700'
                        }`}
                      >
                        {item.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold">{getAamalItemLabel(item)}</div>
                        {getAamalItemDetails(item) && (
                          <div className="text-[11px] text-stone-600 dark:text-stone-300 font-medium">
                            {getAamalItemDetails(item)}
                          </div>
                        )}
                      </div>
                    </div>
                    {item.arabicLabel && (
                      <span className="text-xs font-arabic text-amber-600 dark:text-amber-400 font-bold shrink-0">
                        {item.arabicLabel}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 8. Social & Family Duties */}
          <div
            className={`rounded-3xl border shadow-lg overflow-hidden transition-all ${
              isDay ? 'bg-white border-slate-200' : 'bg-[#0c2a30] border-[#184a54]'
            }`}
          >
            <button
              onClick={() => toggleSectionCollapse('social')}
              className={`w-full p-4 sm:p-5 flex items-center justify-between text-left transition ${
                isDay ? 'hover:bg-slate-50' : 'hover:bg-teal-950/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`text-base font-bold ${isDay ? 'text-slate-900' : 'text-white'}`}>
                    {AAMAL_UI.secSocial[selectedLanguage]}
                  </h3>
                  <p className={`text-[11px] ${isDay ? 'text-slate-500' : 'text-emerald-300/80'}`}>
                    {AAMAL_UI.secSocialSub[selectedLanguage]}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-300 text-xs font-black font-mono">
                  {socialItems.filter((i) => i.completed).length}/{socialItems.length}
                </span>
                {collapsedSections.social ? (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                )}
              </div>
            </button>

            {!collapsedSections.social && (
              <div className="p-4 sm:p-5 pt-0 space-y-2 border-t border-slate-100 dark:border-teal-900/30">
                {socialItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleToggleItem(item.id)}
                    className={`p-3 rounded-2xl border transition flex items-center justify-between cursor-pointer ${
                      item.completed
                        ? isDay
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                          : 'bg-[#092b30] border-emerald-500/50 text-emerald-100'
                        : isDay
                        ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        : 'bg-[#081e22] border-[#16444d] text-emerald-300 hover:bg-[#0f343c]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          item.completed
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'border-slate-400 dark:border-teal-700'
                        }`}
                      >
                        {item.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold">{getAamalItemLabel(item)}</div>
                        {getAamalItemDetails(item) && (
                          <div className="text-[11px] text-stone-600 dark:text-stone-300 font-medium">
                            {getAamalItemDetails(item)}
                          </div>
                        )}
                      </div>
                    </div>
                    {item.arabicLabel && (
                      <span className="text-xs font-arabic text-amber-600 dark:text-amber-400 font-bold shrink-0">
                        {item.arabicLabel}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Daily Reflection / Thoughts Note */}
          <div
            className={`p-4 sm:p-5 rounded-3xl border shadow-lg space-y-2 ${
              isDay ? 'bg-white border-slate-200' : 'bg-[#0c2a30] border-[#184a54]'
            }`}
          >
            <label className="text-xs font-bold text-slate-600 dark:text-emerald-300 flex items-center gap-2">
              <span>{AAMAL_UI.reflectionTitle[selectedLanguage]}</span>
            </label>
            <textarea
              rows={2}
              value={dayLog.reflectionNotes || ''}
              onChange={(e) => updateAndSaveLog({ ...dayLog, reflectionNotes: e.target.value })}
              placeholder={AAMAL_UI.reflectionPlaceholder[selectedLanguage]}
              className={`w-full p-3 rounded-2xl border text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none ${
                isDay
                  ? 'bg-slate-50 border-slate-200 text-slate-800'
                  : 'bg-[#081e22] border-[#16444d] text-teal-100 placeholder-teal-300/40'
              }`}
            />
          </div>
        </div>
      )}

      {/* ===================== TAB 2: RECORD (CALENDAR) ===================== */}
      {activeSubTab === 'calendar' && (
        <div
          className={`p-5 sm:p-6 rounded-3xl border shadow-xl space-y-4 ${
            isDay ? 'bg-white border-[#dcebe8]' : 'bg-[#0e2f36] border-[#1a515c]'
          }`}
        >
          <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100 dark:border-teal-900/40">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-emerald-500" />
              <div>
                <h3 className={`text-base font-bold ${isDay ? 'text-[#103e42]' : 'text-white'}`}>
                  {calendarMonthHeader}
                </h3>
                <p className={`text-[11px] ${isDay ? 'text-[#507579]' : 'text-emerald-300/80'}`}>
                  {AAMAL_UI.calClickInfo[selectedLanguage]}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleJumpToToday}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition active:scale-95 cursor-pointer ${
                  isSelectedToday
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                    : isDay
                    ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                    : 'bg-[#092226] hover:bg-[#133c44] border-[#1a515c] text-emerald-300'
                }`}
              >
                {AAMAL_UI.today[selectedLanguage].replace(/^●\s*/, '')}
              </button>

              <button
                onClick={() => {
                  if (calMonth === 0) {
                    setCalMonth(11);
                    setCalYear((y) => y - 1);
                  } else {
                    setCalMonth((m) => m - 1);
                  }
                }}
                className={`p-1.5 rounded-xl border transition active:scale-95 cursor-pointer ${
                  isDay
                    ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                    : 'bg-[#092226] hover:bg-[#133c44] border-[#1a515c] text-emerald-300'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  if (calMonth === 11) {
                    setCalMonth(0);
                    setCalYear((y) => y + 1);
                  } else {
                    setCalMonth((m) => m + 1);
                  }
                }}
                className={`p-1.5 rounded-xl border transition active:scale-95 cursor-pointer ${
                  isDay
                    ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                    : 'bg-[#092226] hover:bg-[#133c44] border-[#1a515c] text-emerald-300'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Weekday Labels */}
          <div className="grid grid-cols-7 gap-1.5 text-center text-xs font-bold py-1">
            {weekdaysList.map((w, idx) => (
              <div
                key={idx}
                className={idx === 5 ? 'text-emerald-500 font-extrabold' : 'text-slate-400'}
              >
                {w}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
            {calendarDays.map((cell, idx) => {
              if (!cell.dayNumber) {
                return <div key={`empty-${idx}`} className="h-12 sm:h-14 opacity-0" />;
              }

              const isCurrentSelected = cell.dateKey === selectedDateKey;
              const isTodayCell = cell.dateKey === todayKey;
              const cellLog = allLogs[cell.dateKey];
              const cellRate = cellLog ? Math.round((cellLog.completedRatio || 0) * 100) : 0;
              const hasActivity = cellRate > 0 || (cellLog && (cellLog.dhikrCount > 0 || cellLog.quranPagesRead > 0));

              return (
                <button
                  key={cell.dateKey}
                  onClick={() => {
                    setSelectedDateKey(cell.dateKey);
                    setActiveSubTab('checklist');
                    if (soundEnabled) soundHaptics.playTap();
                  }}
                  className={`relative h-12 sm:h-14 rounded-2xl border p-1 sm:p-1.5 flex flex-col items-center justify-between transition-all active:scale-95 cursor-pointer ${
                    isCurrentSelected
                      ? 'bg-emerald-600 text-white border-emerald-400 shadow-md ring-2 ring-emerald-400/40 z-10'
                      : isTodayCell
                      ? isDay
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-extrabold'
                        : 'bg-[#103a42] border-emerald-500/40 text-emerald-200 font-extrabold'
                      : isDay
                      ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                      : 'bg-[#092226] hover:bg-[#123840] border-[#153e46] text-teal-100'
                  }`}
                >
                  <span className="text-xs sm:text-sm font-bold">{cell.dayNumber}</span>
                  {hasActivity ? (
                    <span
                      className={`text-[9px] font-mono font-bold px-1 rounded-full ${
                        isCurrentSelected
                          ? 'bg-white/30 text-white'
                          : cellRate >= 70
                          ? 'bg-emerald-500/20 text-emerald-500'
                          : 'bg-amber-500/20 text-amber-500'
                      }`}
                    >
                      {cellRate}%
                    </span>
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-teal-900/60" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ===================== TAB 3: TRENDS & PROGRESS ===================== */}
      {activeSubTab === 'trends' && (
        <div className="space-y-4">
          <div
            className={`p-5 sm:p-6 rounded-3xl border shadow-xl space-y-4 ${
              isDay ? 'bg-white border-[#dcebe8]' : 'bg-[#0e2f36] border-[#1a515c]'
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-teal-900/40">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
                <div>
                  <h3 className={`text-base font-bold ${isDay ? 'text-[#103e42]' : 'text-white'}`}>
                    {AAMAL_UI.streakTitle[selectedLanguage]}
                  </h3>
                  <p className={`text-[11px] ${isDay ? 'text-[#507579]' : 'text-emerald-300/80'}`}>
                    {AAMAL_UI.streakSub[selectedLanguage]}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400">
                  {AAMAL_UI.currentStreak[selectedLanguage]}
                </span>
                <div className="text-xl font-black text-amber-400 font-mono">
                  {streakDays} {AAMAL_UI.days[selectedLanguage]}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div
                className={`p-3.5 rounded-2xl border text-center ${
                  isDay ? 'bg-slate-50 border-slate-200' : 'bg-[#081e22] border-[#133c44]'
                }`}
              >
                <span className="text-[10px] uppercase font-bold text-slate-400">
                  {AAMAL_UI.totalTracked[selectedLanguage]}
                </span>
                <div className="text-xl font-black text-emerald-500 font-mono mt-0.5">
                  {Object.keys(allLogs).length} {AAMAL_UI.days[selectedLanguage]}
                </div>
              </div>

              <div
                className={`p-3.5 rounded-2xl border text-center ${
                  isDay ? 'bg-slate-50 border-slate-200' : 'bg-[#081e22] border-[#133c44]'
                }`}
              >
                <span className="text-[10px] uppercase font-bold text-slate-400">
                  {AAMAL_UI.todayCompletion[selectedLanguage]}
                </span>
                <div className="text-xl font-black text-teal-500 font-mono mt-0.5">
                  {percentCompleted}%
                </div>
              </div>

              <div
                className={`p-3.5 rounded-2xl border text-center ${
                  isDay ? 'bg-slate-50 border-slate-200' : 'bg-[#081e22] border-[#133c44]'
                }`}
              >
                <span className="text-[10px] uppercase font-bold text-slate-400">
                  {AAMAL_UI.fardhSalahToday[selectedLanguage]}
                </span>
                <div className="text-xl font-black text-blue-500 font-mono mt-0.5">
                  {fardhCompletedCount}/5
                </div>
              </div>

              <div
                className={`p-3.5 rounded-2xl border text-center ${
                  isDay ? 'bg-slate-50 border-slate-200' : 'bg-[#081e22] border-[#133c44]'
                }`}
              >
                <span className="text-[10px] uppercase font-bold text-slate-400">
                  {AAMAL_UI.quranPages[selectedLanguage]}
                </span>
                <div className="text-xl font-black text-amber-500 font-mono mt-0.5">
                  {dayLog.quranPagesRead || 0} p.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================== COMPREHENSIVE MULTI-PERIOD HISTORY & PDF MODAL ===================== */}
      <HistoryReportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        soundEnabled={soundEnabled}
        themeMode={themeMode}
        selectedLanguage={selectedLanguage}
        userProfile={userProfile}
        selectedDayKey={selectedDateKey}
        liveZikrs={liveZikrs}
      />
    </div>
  );
};

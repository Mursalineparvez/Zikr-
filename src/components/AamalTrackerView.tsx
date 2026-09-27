import React, { useState, useEffect, useMemo } from 'react';
import {
  AamalCheckItem,
  AamalDayLog,
  ThemeMode,
  ZikrLanguage,
} from '../types';
import {
  DEFAULT_AAMAL_ITEMS,
  getTodayDateKey,
  createInitialDayLog,
  getAamalLogForDate,
  saveAamalLogForDate,
  getAllAamalLogs,
  exportAamalHistoryToCsv,
  exportAamalHistoryToJson,
} from '../utils/aamalTrackerData';
import { AAMAL_ITEM_TRANSLATIONS, AAMAL_UI } from '../utils/appTranslations';
import {
  CheckCircle,
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
  FileSpreadsheet,
  FileCode,
  Printer,
  CheckCircle2,
  X,
  Plus,
  Minus,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundHaptics } from '../utils/audioHaptics';
import { HistoryReportModal } from './HistoryReportModal';
import { UserProfile, ZikrItem } from '../types';

interface AamalTrackerViewProps {
  soundEnabled: boolean;
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
  userProfile?: UserProfile;
  liveZikrs?: ZikrItem[];
}

const MONTH_NAMES_BN = [
  'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
  'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
];

const MONTH_NAMES_EN = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEKDAYS_BN = ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহঃ', 'শুক্র', 'শনি'];
const WEEKDAYS_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const AamalTrackerView: React.FC<AamalTrackerViewProps> = ({
  soundEnabled,
  themeMode = 'night',
  selectedLanguage = 'bn',
  userProfile,
  liveZikrs,
}) => {
  const isDay = themeMode === 'day';
  const todayKey = getTodayDateKey();

  // Selected date in the calendar (defaults to today)
  const [selectedDateKey, setSelectedDateKey] = useState<string>(todayKey);

  // Calendar year and month navigation
  const [calYear, setCalYear] = useState<number>(() => new Date().getFullYear());
  const [calMonth, setCalMonth] = useState<number>(() => new Date().getMonth()); // 0-indexed

  // Active day's log state
  const [dayLog, setDayLog] = useState<AamalDayLog>(() => getAamalLogForDate(todayKey));

  // Map of all logs in local storage for calendar indicators
  const [allLogsMap, setAllLogsMap] = useState<Record<string, AamalDayLog>>(() => getAllAamalLogs());

  // Export Modal state
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [downloadSuccessMsg, setDownloadSuccessMsg] = useState<string | null>(null);

  // Sync dayLog whenever selectedDateKey changes
  useEffect(() => {
    const loaded = getAamalLogForDate(selectedDateKey);
    setDayLog(loaded);
  }, [selectedDateKey]);

  // Save current dayLog and update allLogsMap
  useEffect(() => {
    saveAamalLogForDate(selectedDateKey, dayLog);
    setAllLogsMap((prev) => ({ ...prev, [selectedDateKey]: dayLog }));
  }, [dayLog, selectedDateKey]);

  // Calculate streak
  const streakDays = useMemo(() => {
    try {
      let streak = 0;
      const today = new Date();
      for (let i = 0; i <= 60; i++) {
        const past = new Date(today);
        past.setDate(past.getDate() - i);
        const y = past.getFullYear();
        const m = String(past.getMonth() + 1).padStart(2, '0');
        const d = String(past.getDate()).padStart(2, '0');
        const key = `${y}-${m}-${d}`;
        const log = allLogsMap[key];
        if (log) {
          const done = log.items.filter((item: AamalCheckItem) => item.completed).length;
          if (done >= 5) {
            streak++;
          } else if (i > 0) {
            break;
          }
        } else if (i > 0) {
          break;
        }
      }
      return streak;
    } catch {
      return 0;
    }
  }, [allLogsMap]);

  // Calendar Grid builder
  const calendarDays = useMemo(() => {
    const firstDayIndex = new Date(calYear, calMonth, 1).getDay();
    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(calYear, calMonth, 0).getDate();

    const days: Array<{
      dateKey: string;
      dayNumber: number;
      isCurrentMonth: boolean;
      isToday: boolean;
      isSelected: boolean;
      log?: AamalDayLog;
    }> = [];

    // Previous month trailing days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const dayNum = daysInPrevMonth - i;
      const prevM = calMonth === 0 ? 11 : calMonth - 1;
      const prevY = calMonth === 0 ? calYear - 1 : calYear;
      const key = `${prevY}-${String(prevM + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
      days.push({
        dateKey: key,
        dayNumber: dayNum,
        isCurrentMonth: false,
        isToday: key === todayKey,
        isSelected: key === selectedDateKey,
        log: allLogsMap[key],
      });
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const key = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      days.push({
        dateKey: key,
        dayNumber: day,
        isCurrentMonth: true,
        isToday: key === todayKey,
        isSelected: key === selectedDateKey,
        log: allLogsMap[key],
      });
    }

    // Next month leading days to fill 35 or 42 grid cells
    const remaining = (7 - (days.length % 7)) % 7;
    for (let day = 1; day <= remaining; day++) {
      const nextM = calMonth === 11 ? 0 : calMonth + 1;
      const nextY = calMonth === 11 ? calYear + 1 : calYear;
      const key = `${nextY}-${String(nextM + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      days.push({
        dateKey: key,
        dayNumber: day,
        isCurrentMonth: false,
        isToday: key === todayKey,
        isSelected: key === selectedDateKey,
        log: allLogsMap[key],
      });
    }

    return days;
  }, [calYear, calMonth, selectedDateKey, todayKey, allLogsMap]);

  // Calendar navigation handlers
  const handlePrevMonth = () => {
    if (calMonth === 0) {
      setCalMonth(11);
      setCalYear((y) => y - 1);
    } else {
      setCalMonth((m) => m - 1);
    }
    if (soundEnabled) soundHaptics.playTap();
  };

  const handleNextMonth = () => {
    if (calMonth === 11) {
      setCalMonth(0);
      setCalYear((y) => y + 1);
    } else {
      setCalMonth((m) => m + 1);
    }
    if (soundEnabled) soundHaptics.playTap();
  };

  const handleJumpToToday = () => {
    const now = new Date();
    setCalYear(now.getFullYear());
    setCalMonth(now.getMonth());
    setSelectedDateKey(todayKey);
    if (soundEnabled) soundHaptics.playMilestone();
  };

  const toggleItem = (id: string) => {
    setDayLog((prev) => {
      const updated = prev.items.map((item) => {
        if (item.id === id) {
          const nextState = !item.completed;
          if (nextState) {
            if (soundEnabled) soundHaptics.playMilestone();
            soundHaptics.vibrate(30);
          } else {
            if (soundEnabled) soundHaptics.playTap();
          }
          return { ...item, completed: nextState };
        }
        return item;
      });

      const completedCount = updated.filter((i) => i.completed).length;
      const ratio = completedCount / updated.length;

      // Celebrate full completion
      if (completedCount === updated.length && soundEnabled) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
      }

      return {
        ...prev,
        items: updated,
        completedRatio: ratio,
      };
    });
  };

  const handleUpdateNotes = (notes: string) => {
    setDayLog((prev) => ({ ...prev, reflectionNotes: notes }));
  };

  const handleUpdateQuranPages = (delta: number) => {
    setDayLog((prev) => ({
      ...prev,
      quranPagesRead: Math.max(0, (prev.quranPagesRead || 0) + delta),
    }));
    if (soundEnabled) soundHaptics.playTap();
  };

  const completedCount = dayLog.items.filter((i) => i.completed).length;
  const totalCount = dayLog.items.length;
  const percentCompleted = Math.round((completedCount / totalCount) * 100);

  // Group items by category
  const prayers = dayLog.items.filter((i) => i.category === 'prayer');
  const sunnahs = dayLog.items.filter((i) => i.category === 'sunnah');
  const spiritual = dayLog.items.filter((i) => ['quran', 'dhikr'].includes(i.category));
  const character = dayLog.items.filter((i) => ['charity', 'character'].includes(i.category));

  const currentMonthName = selectedLanguage === 'bn' ? MONTH_NAMES_BN[calMonth] : MONTH_NAMES_EN[calMonth];
  const weekdays = selectedLanguage === 'bn' ? WEEKDAYS_BN : WEEKDAYS_EN;

  const isSelectedToday = selectedDateKey === todayKey;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#144d52] via-[#1a5e64] to-[#257277] border border-teal-400/30 p-5 sm:p-6 shadow-xl text-white">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-teal-100 text-xs font-semibold mb-2 backdrop-blur-md">
              <Award className="w-3.5 h-3.5" />
              <span>محاسبة النفس • Daily Islamic Deeds &amp; Habits</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight drop-shadow-sm">
              {AAMAL_UI.bannerTitle[selectedLanguage]}
            </h2>
            <p className="text-xs sm:text-sm text-teal-100 mt-1 max-w-xl">
              {AAMAL_UI.bannerSub[selectedLanguage]}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            {/* Download Report Button */}
            <button
              onClick={() => {
                setIsExportModalOpen(true);
                if (soundEnabled) soundHaptics.playTap();
              }}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-bold shadow-lg transition active:scale-95 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Report (ডাউনলোড)</span>
            </button>

            {/* Streak Badge */}
            <div
              className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl border shadow-lg ${
                isDay
                  ? 'bg-white border-[#d2ece9] text-[#103e42]'
                  : 'bg-[#092226] border-amber-500/40 text-amber-300'
              }`}
            >
              <Flame className="w-5 h-5 text-amber-400 fill-amber-400" />
              <div>
                <div className={`text-[10px] ${isDay ? 'text-[#507579]' : 'text-slate-400'}`}>
                  {AAMAL_UI.streak[selectedLanguage]}
                </div>
                <div className="text-xs sm:text-sm font-bold text-amber-400">
                  {streakDays} Days
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== INTERACTIVE CALENDAR SECTION ===================== */}
      <div
        className={`p-5 sm:p-6 rounded-3xl border shadow-xl space-y-4 ${
          isDay ? 'bg-white border-[#dcebe8]' : 'bg-[#0e2f36] border-[#1a515c]'
        }`}
      >
        {/* Calendar Header: Month Navigation & Today jump */}
        <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100 dark:border-teal-900/40">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-emerald-500" />
            <div>
              <h3 className={`text-base sm:text-lg font-black ${isDay ? 'text-[#103e42]' : 'text-white'}`}>
                {currentMonthName} {calYear}
              </h3>
              <p className={`text-[11px] ${isDay ? 'text-[#507579]' : 'text-teal-300/80'}`}>
                যেকোনো তারিখে ক্লিক করে পূর্বের আমল ও জিকির হিস্ট্রি দেখুন
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
                  : 'bg-[#092226] hover:bg-[#133c44] border-[#1a515c] text-teal-200'
              }`}
            >
              Today (আজ)
            </button>

            <button
              onClick={handlePrevMonth}
              aria-label="Previous Month"
              className={`p-1.5 rounded-xl border transition active:scale-95 cursor-pointer ${
                isDay
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                  : 'bg-[#092226] hover:bg-[#133c44] border-[#1a515c] text-teal-200'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={handleNextMonth}
              aria-label="Next Month"
              className={`p-1.5 rounded-xl border transition active:scale-95 cursor-pointer ${
                isDay
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                  : 'bg-[#092226] hover:bg-[#133c44] border-[#1a515c] text-teal-200'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Weekday Labels */}
        <div className="grid grid-cols-7 gap-1 text-center font-bold text-[11px] text-slate-400 dark:text-teal-300/70 py-1">
          {weekdays.map((wd, i) => (
            <div key={i} className="uppercase tracking-wider">
              {wd}
            </div>
          ))}
        </div>

        {/* Calendar Grid Cells */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {calendarDays.map((dayItem) => {
            const completedInDay = dayItem.log?.items?.filter((i) => i.completed).length || 0;
            const totalInDay = dayItem.log?.items?.length || DEFAULT_AAMAL_ITEMS.length;
            const dayPercent = Math.round((completedInDay / totalInDay) * 100);
            const hasDhikr = (dayItem.log?.dhikrCount || 0) > 0;

            return (
              <button
                key={dayItem.dateKey}
                onClick={() => {
                  setSelectedDateKey(dayItem.dateKey);
                  if (soundEnabled) soundHaptics.playTap();
                }}
                className={`relative min-h-[58px] sm:min-h-[66px] p-1.5 rounded-2xl border transition-all flex flex-col items-center justify-between text-center cursor-pointer group active:scale-95 ${
                  dayItem.isSelected
                    ? isDay
                      ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-500/50 shadow-md scale-[1.02]'
                      : 'bg-[#15464f] border-emerald-400 ring-2 ring-emerald-400/50 shadow-md scale-[1.02]'
                    : dayItem.isCurrentMonth
                    ? isDay
                      ? 'bg-slate-50 hover:bg-emerald-50/50 border-slate-200/80 text-slate-800'
                      : 'bg-[#092226] hover:bg-[#0d343c] border-[#15464f] text-slate-200'
                    : isDay
                    ? 'bg-slate-100/40 border-slate-100 text-slate-400 opacity-40'
                    : 'bg-[#071a1d] border-[#0e2a30] text-slate-600 opacity-40'
                }`}
              >
                {/* Date number and Today indicator */}
                <div className="flex items-center justify-between w-full px-1">
                  <span
                    className={`text-xs font-bold ${
                      dayItem.isToday
                        ? 'text-emerald-500 dark:text-emerald-400 underline underline-offset-2'
                        : dayItem.isSelected
                        ? 'text-emerald-700 dark:text-white font-extrabold'
                        : ''
                    }`}
                  >
                    {dayItem.dayNumber}
                  </span>

                  {dayItem.isToday && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Today" />
                  )}
                </div>

                {/* Progress Indicator badge in day cell */}
                {completedInDay > 0 ? (
                  <div className="w-full flex items-center justify-center gap-1 py-0.5">
                    <span
                      className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${
                        dayPercent === 100
                          ? 'bg-amber-400/20 text-amber-500 dark:text-amber-300 border border-amber-400/40'
                          : dayPercent >= 50
                          ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                          : 'bg-teal-500/10 text-teal-600 dark:text-teal-300'
                      }`}
                    >
                      {dayPercent}%
                    </span>
                  </div>
                ) : (
                  <div className="h-4" />
                )}

                {/* Dhikr Count Pill */}
                {hasDhikr && (
                  <div className="text-[9px] font-mono font-bold text-teal-600 dark:text-teal-400 truncate max-w-full">
                    📿 {dayItem.log?.dhikrCount}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ===================== SELECTED DATE PROGRESS CARD ===================== */}
      <div
        className={`p-6 rounded-3xl border shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 ${
          isDay ? 'bg-white border-[#dcebe8]' : 'bg-[#0e2f36] border-[#1a515c]'
        }`}
      >
        <div className="space-y-2 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
            <span
              className={`text-xs font-bold uppercase tracking-wider ${
                isDay ? 'text-[#1c6469]' : 'text-emerald-400'
              }`}
            >
              📅 {selectedDateKey}
            </span>
            {isSelectedToday ? (
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 text-[11px] font-bold">
                (আজকের লাইভ আমল)
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-teal-900/60 text-slate-600 dark:text-teal-300 text-[11px] font-bold">
                (হিস্ট্রি রেকর্ড)
              </span>
            )}
          </div>

          <h3 className={`text-2xl font-extrabold ${isDay ? 'text-[#103e42]' : 'text-white'}`}>
            {completedCount} / {totalCount} {AAMAL_UI.completed[selectedLanguage]}
          </h3>

          <p className={`text-xs max-w-md ${isDay ? 'text-[#507579]' : 'text-[#8ebac0]'}`}>
            {isSelectedToday
              ? 'Check off each prescribed prayer, remembrance, and act of goodness throughout your day.'
              : `Viewing & updating saved spiritual records for ${selectedDateKey}.`}
          </p>

          {/* Quick Stats on Selected Date */}
          <div className="flex items-center gap-3 pt-2 text-xs">
            <div className="flex items-center gap-1.5 p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300">
              <span>Quran Pages:</span>
              <button
                onClick={() => handleUpdateQuranPages(-1)}
                className="w-5 h-5 rounded-md bg-emerald-500/20 hover:bg-emerald-500/40 font-bold flex items-center justify-center"
              >
                <Minus className="w-3 h-3" />
              </button>
              <strong className="font-mono text-sm px-1">{dayLog.quranPagesRead || 0}</strong>
              <button
                onClick={() => handleUpdateQuranPages(1)}
                className="w-5 h-5 rounded-md bg-emerald-500/20 hover:bg-emerald-500/40 font-bold flex items-center justify-center"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>

            {dayLog.dhikrCount > 0 && (
              <div className="p-2 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-700 dark:text-teal-300 font-bold">
                📿 Zikrs: {dayLog.dhikrCount}
              </div>
            )}
          </div>
        </div>

        {/* Circular Progress Ring */}
        <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="56"
              cy="56"
              r="46"
              className={isDay ? 'text-[#d8ece9]' : 'text-[#092226]'}
              strokeWidth="9"
              stroke="currentColor"
              fill="transparent"
            />
            <circle
              cx="56"
              cy="56"
              r="46"
              className="text-emerald-500 transition-all duration-700 ease-out"
              strokeWidth="9"
              strokeDasharray={289}
              strokeDashoffset={289 - (289 * percentCompleted) / 100}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className={`text-2xl font-black ${isDay ? 'text-[#103e42]' : 'text-white'}`}>
              {percentCompleted}%
            </span>
            <span
              className={`text-[10px] font-bold uppercase ${
                isDay ? 'text-[#507579]' : 'text-[#8ebac0]'
              }`}
            >
              {AAMAL_UI.completed[selectedLanguage]}
            </span>
          </div>
        </div>
      </div>

      {/* ===================== DETAILED DHIKR BREAKDOWN FOR SELECTED DATE ===================== */}
      <div
        className={`p-5 sm:p-6 rounded-3xl border shadow-xl space-y-4 ${
          isDay ? 'bg-white border-[#dcebe8]' : 'bg-[#0e2f36] border-[#1a515c]'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100 dark:border-teal-900/40">
          <div className="flex items-center gap-2">
            <span className="text-xl">📿</span>
            <div>
              <h3 className={`text-sm sm:text-base font-bold ${isDay ? 'text-[#103e42]' : 'text-white'}`}>
                {selectedLanguage === 'bn'
                  ? 'দৈনিক জিকির হিস্ট্রি ও বিস্তারিত সংখ্যা'
                  : 'Daily Dhikr History & Detailed Counts'}
              </h3>
              <p className={`text-[11px] ${isDay ? 'text-[#507579]' : 'text-teal-300/80'}`}>
                {selectedLanguage === 'bn'
                  ? `তারিখ: ${selectedDateKey} • কোন জিকির কতবার পাঠ করা হয়েছে`
                  : `Date: ${selectedDateKey} • Specific counts for each remembrance`}
              </p>
            </div>
          </div>

          <div
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-2 self-start sm:self-auto ${
              isDay
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-[#092226] text-emerald-300 border-emerald-500/30'
            }`}
          >
            <span>সর্বমোট তাসবীহ:</span>
            <span className="text-sm font-black font-mono text-emerald-500">
              {dayLog.dhikrCount || 0}
            </span>
          </div>
        </div>

        {dayLog.zikrBreakdown && dayLog.zikrBreakdown.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {dayLog.zikrBreakdown.map((z, idx) => {
              const count = z.count || 0;
              const hasCount = count > 0;
              const isTargetReached = z.target ? count >= z.target : false;

              return (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl border transition flex items-center justify-between gap-3 ${
                    hasCount
                      ? isDay
                        ? 'bg-emerald-50/70 border-emerald-300 shadow-xs'
                        : 'bg-[#092226] border-emerald-500/40 shadow-xs'
                      : isDay
                      ? 'bg-slate-50/70 border-slate-200/80 opacity-70'
                      : 'bg-[#081e22]/60 border-[#123940] opacity-60'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-xs font-bold truncate ${
                          isDay ? 'text-slate-800' : 'text-slate-100'
                        }`}
                      >
                        {z.name}
                      </span>
                      {isTargetReached && (
                        <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 text-[9px] font-bold shrink-0">
                          ✓ Goal
                        </span>
                      )}
                    </div>
                    {z.arabic && (
                      <div className="text-xs font-arabic text-emerald-600 dark:text-emerald-400 truncate mt-0.5">
                        {z.arabic}
                      </div>
                    )}
                    {z.transliteration && (
                      <div className="text-[10px] text-slate-400 truncate">
                        {z.transliteration}
                      </div>
                    )}
                  </div>

                  <div className="text-right shrink-0">
                    <div
                      className={`text-base font-black font-mono leading-none ${
                        hasCount
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : isDay
                          ? 'text-slate-400'
                          : 'text-slate-500'
                      }`}
                    >
                      {count}
                    </div>
                    <span className="text-[10px] font-semibold text-slate-400">
                      {selectedLanguage === 'bn' ? 'বার' : 'times'}
                      {z.target ? ` / ${z.target}` : ''}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : dayLog.dhikrCount > 0 ? (
          <div
            className={`p-4 rounded-2xl border text-center ${
              isDay ? 'bg-slate-50 border-slate-200' : 'bg-[#092226] border-[#184850]'
            }`}
          >
            <div className="text-sm font-bold text-emerald-500 font-mono">
              {dayLog.dhikrCount} Total Zikrs Recited on this day
            </div>
          </div>
        ) : (
          <div
            className={`p-4 rounded-2xl border border-dashed text-center ${
              isDay ? 'bg-slate-50/50 border-slate-200 text-slate-400' : 'bg-[#092226]/40 border-[#184850] text-teal-300/60'
            }`}
          >
            <p className="text-xs">
              {selectedLanguage === 'bn'
                ? 'এই তারিখে এখনো কোনো জিকির রেকর্ড পাওয়া যায়নি।'
                : 'No zikr count recorded for this date yet.'}
            </p>
          </div>
        )}
      </div>

      {/* Section 1: Prescribed Fardh Prayers */}
      <div className="space-y-3">
        <h3 className={`text-sm font-bold flex items-center gap-2 ${isDay ? 'text-[#103e42]' : 'text-white'}`}>
          <Clock className="w-4 h-4 text-emerald-400" />
          <span>The Five Prescribed Prayers (الصلوات الخمس)</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {prayers.map((item) => {
            const t = AAMAL_ITEM_TRANSLATIONS[item.id]?.[selectedLanguage];
            const itemLabel = t?.label || item.label;
            const itemDetails = t?.details || item.details;
            return (
              <div
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
                  item.completed
                    ? isDay
                      ? 'bg-[#eef7f6] border-[#1c6469]/50 shadow-sm'
                      : 'bg-[#092226] border-emerald-500/60 shadow-md'
                    : isDay
                    ? 'bg-white border-[#dcebe8] hover:border-[#b5dcd6]'
                    : 'bg-[#0e2f36] border-[#1a515c] hover:border-[#266e7c]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <button className="text-emerald-400">
                    {item.completed ? (
                      <CheckCircle className="w-5 h-5 fill-emerald-500 text-white" />
                    ) : (
                      <Circle className={`w-5 h-5 ${isDay ? 'text-[#a2c8c4]' : 'text-slate-600'}`} />
                    )}
                  </button>
                  <div>
                    <h4
                      className={`text-xs sm:text-sm font-bold ${
                        item.completed
                          ? isDay
                            ? 'text-[#1c6469] line-through'
                            : 'text-emerald-300 line-through'
                          : isDay
                          ? 'text-[#103e42]'
                          : 'text-white'
                      }`}
                    >
                      {itemLabel}
                    </h4>
                    {itemDetails && (
                      <p className={`text-[11px] mt-0.5 ${isDay ? 'text-[#6c8f93]' : 'text-slate-400'}`}>
                        {itemDetails}
                      </p>
                    )}
                  </div>
                </div>

                {item.arabicLabel && (
                  <span
                    className={`font-arabic text-sm font-bold shrink-0 ${
                      isDay ? 'text-[#165a60]' : 'text-emerald-400'
                    }`}
                  >
                    {item.arabicLabel}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 2: Sunnah & Voluntary Prayers */}
      <div className="space-y-3">
        <h3 className={`text-sm font-bold flex items-center gap-2 ${isDay ? 'text-[#103e42]' : 'text-white'}`}>
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Sunnah &amp; Voluntary Prayers (النوافل والسنن)</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {sunnahs.map((item) => {
            const t = AAMAL_ITEM_TRANSLATIONS[item.id]?.[selectedLanguage];
            const itemLabel = t?.label || item.label;
            const itemDetails = t?.details || item.details;
            return (
              <div
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
                  item.completed
                    ? isDay
                      ? 'bg-[#eef7f6] border-[#1c6469]/50 shadow-sm'
                      : 'bg-[#092226] border-emerald-500/60 shadow-md'
                    : isDay
                    ? 'bg-white border-[#dcebe8] hover:border-[#b5dcd6]'
                    : 'bg-[#0e2f36] border-[#1a515c] hover:border-[#266e7c]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <button className="text-emerald-400">
                    {item.completed ? (
                      <CheckCircle className="w-5 h-5 fill-emerald-500 text-white" />
                    ) : (
                      <Circle className={`w-5 h-5 ${isDay ? 'text-[#a2c8c4]' : 'text-slate-600'}`} />
                    )}
                  </button>
                  <div>
                    <h4
                      className={`text-xs sm:text-sm font-bold ${
                        item.completed
                          ? isDay
                            ? 'text-[#1c6469] line-through'
                            : 'text-emerald-300 line-through'
                          : isDay
                          ? 'text-[#103e42]'
                          : 'text-white'
                      }`}
                    >
                      {itemLabel}
                    </h4>
                    {itemDetails && (
                      <p className={`text-[11px] mt-0.5 ${isDay ? 'text-[#6c8f93]' : 'text-slate-400'}`}>
                        {itemDetails}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 3: Quran, Dhikr & Character */}
      <div className="space-y-3">
        <h3 className={`text-sm font-bold flex items-center gap-2 ${isDay ? 'text-[#103e42]' : 'text-white'}`}>
          <BookOpen className="w-4 h-4 text-teal-400" />
          <span>Quran, Dhikr &amp; Acts of Goodness (القرآن والذكر والإحسان)</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[...spiritual, ...character].map((item) => {
            const t = AAMAL_ITEM_TRANSLATIONS[item.id]?.[selectedLanguage];
            const itemLabel = t?.label || item.label;
            const itemDetails = t?.details || item.details;
            return (
              <div
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
                  item.completed
                    ? isDay
                      ? 'bg-[#eef7f6] border-[#1c6469]/50 shadow-sm'
                      : 'bg-[#092226] border-emerald-500/60 shadow-md'
                    : isDay
                    ? 'bg-white border-[#dcebe8] hover:border-[#b5dcd6]'
                    : 'bg-[#0e2f36] border-[#1a515c] hover:border-[#266e7c]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <button className="text-emerald-400">
                    {item.completed ? (
                      <CheckCircle className="w-5 h-5 fill-emerald-500 text-white" />
                    ) : (
                      <Circle className={`w-5 h-5 ${isDay ? 'text-[#a2c8c4]' : 'text-slate-600'}`} />
                    )}
                  </button>
                  <div>
                    <h4
                      className={`text-xs sm:text-sm font-bold ${
                        item.completed
                          ? isDay
                            ? 'text-[#1c6469] line-through'
                            : 'text-emerald-300 line-through'
                          : isDay
                          ? 'text-[#103e42]'
                          : 'text-white'
                      }`}
                    >
                      {itemLabel}
                    </h4>
                    {itemDetails && (
                      <p className={`text-[11px] mt-0.5 ${isDay ? 'text-[#6c8f93]' : 'text-slate-400'}`}>
                        {itemDetails}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Daily Gratitude & Reflection Box */}
      <div
        className={`p-5 rounded-3xl border space-y-3 ${
          isDay ? 'bg-white border-[#dcebe8]' : 'bg-[#0e2f36] border-[#1a515c]'
        }`}
      >
        <label className={`text-xs font-bold flex items-center gap-2 ${isDay ? 'text-[#103e42]' : 'text-white'}`}>
          <Heart className="w-4 h-4 text-rose-400" />
          <span>Daily Gratitude &amp; Soul Reflection for {selectedDateKey} (محاسبة النفس)</span>
        </label>
        <textarea
          value={dayLog.reflectionNotes || ''}
          onChange={(e) => handleUpdateNotes(e.target.value)}
          placeholder="Write down 3 blessings you are grateful for today, or spiritual lessons learned..."
          className={`w-full h-24 rounded-2xl p-3 text-xs sm:text-sm focus:outline-none transition border ${
            isDay
              ? 'bg-[#f0f7f6] border-[#d2ece9] text-[#103e42] placeholder-[#709598] focus:border-[#1c6469]'
              : 'bg-[#092226] border-[#133c44] text-white placeholder-slate-400 focus:border-[#2dd4bf]'
          }`}
        />
      </div>

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

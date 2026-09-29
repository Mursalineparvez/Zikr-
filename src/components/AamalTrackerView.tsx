import React, { useState, useEffect, useMemo } from 'react';
import { AamalCheckItem, AamalDayLog, ThemeMode, ZikrLanguage, UserProfile, ZikrItem } from '../types';
import {
  DEFAULT_AAMAL_ITEMS,
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
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundHaptics } from '../utils/audioHaptics';
import { HistoryReportModal } from './HistoryReportModal';

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

  // Active view subtab: 'checklist' (লিখুন), 'calendar' (রেকর্ড), 'trends' (তুলনা)
  const [activeSubTab, setActiveSubTab] = useState<'checklist' | 'calendar' | 'trends'>('checklist');

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

  // 5 Fardh Prayers specific count
  const fardh5 = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
  const fardhCompletedCount = dayLog.items.filter(
    (i) => fardh5.includes(i.id) && i.completed
  ).length;

  const totalAmalCount = dayLog.items.length;
  const completedAmalCount = dayLog.items.filter((i) => i.completed).length;
  const percentCompleted = Math.round((completedAmalCount / (totalAmalCount || 1)) * 100);

  // Formatted display date in Bengali / English
  const selectedDateFormatted = useMemo(() => {
    const [y, m, d] = selectedDateKey.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    if (selectedLanguage === 'bn') {
      const bnMonth = MONTH_NAMES_BN[m - 1];
      const bnDigits = (n: number) =>
        String(n).replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[parseInt(d, 10)]);
      return `${bnDigits(d)} ${bnMonth} ${bnDigits(y)}`;
    }
    return dateObj.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }, [selectedDateKey, selectedLanguage]);

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

  // The 5 Fardh waqts array for horizontal waqt selector
  const waqtsList = [
    { id: 'fajr', nameBn: 'ফজর', nameEn: 'Fajr', icon: '🌅' },
    { id: 'dhuhr', nameBn: 'যোহর', nameEn: 'Dhuhr', icon: '☀️' },
    { id: 'asr', nameBn: 'আছর', nameEn: 'Asr', icon: '🌤️' },
    { id: 'maghrib', nameBn: 'মাগরিব', nameEn: 'Maghrib', icon: '🌇' },
    { id: 'isha', nameBn: 'ইশা', nameEn: 'Isha', icon: '🌙' },
  ];

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
                <span>মুহাসাবাহ</span>
                <span className="text-xs font-normal text-emerald-100 opacity-90 hidden sm:inline">
                  (দৈনিক আত্মশুদ্ধি ও আমল ট্র্যাকার)
                </span>
              </h1>
              <p className="text-[11px] text-emerald-100/90 font-medium">
                حاسبوا أنفسكم قبل أن تحاسبوا • প্রতিদিনের নেক আমলের হিসাব
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
              <span className="hidden sm:inline">পিডিএফ / রিপোর্ট ডাউনলোড</span>
              <span className="sm:hidden">রিপোর্ট</span>
            </button>
          </div>
        </div>

        {/* Date Selector Row with < Date > Arrows */}
        <div className="flex items-center justify-between gap-2 pt-3">
          <button
            onClick={handlePrevDay}
            className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white transition active:scale-95 cursor-pointer"
            title="পূর্ববর্তী দিন"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="text-center flex-1">
            <div className="text-base sm:text-lg font-black tracking-wide text-[#facc15] font-sans">
              {selectedDateFormatted}
            </div>
            {isSelectedToday ? (
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold border border-white/25">
                ● আজকের দিন (Today)
              </span>
            ) : (
              <button
                onClick={handleJumpToToday}
                className="text-[10px] text-emerald-100 underline hover:text-white"
              >
                আজকের তারিখে ফিরুন (Go to Today)
              </button>
            )}
          </div>

          <button
            onClick={handleNextDay}
            className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white transition active:scale-95 cursor-pointer"
            title="পরবর্তী দিন"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* 2 Quick Summary Indicator Pills (০/৫ নামাজ ও ০/৩৯ আমল) */}
        <div className="grid grid-cols-2 gap-2.5 pt-3">
          <div className="p-2.5 rounded-2xl bg-black/25 backdrop-blur-md border border-white/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">🕌</span>
              <span className="text-xs font-bold text-emerald-100">নামাজ</span>
            </div>
            <div className="text-sm sm:text-base font-black font-mono text-emerald-300">
              {selectedLanguage === 'bn'
                ? `${fardhCompletedCount}/৫`
                : `${fardhCompletedCount}/5`}
            </div>
          </div>

          <div className="p-2.5 rounded-2xl bg-black/25 backdrop-blur-md border border-white/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">✅</span>
              <span className="text-xs font-bold text-emerald-100">আমল</span>
            </div>
            <div className="text-sm sm:text-base font-black font-mono text-[#facc15]">
              {selectedLanguage === 'bn'
                ? `${completedAmalCount}/${totalAmalCount}`
                : `${completedAmalCount}/${totalAmalCount}`}
            </div>
          </div>
        </div>
      </div>

      {/* ===================== 3 MAIN SUBTABS: লিখুন / রেকর্ড / তুলনা ===================== */}
      <div className={`flex items-center gap-1.5 p-1 rounded-2xl border ${
        isDay
          ? 'bg-[#e2edf0] border-[#d2e2e6]'
          : 'bg-[#092226] border-[#14424a]'
      }`}>
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
              : 'text-teal-200 hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>
            {selectedLanguage === 'bn'
              ? 'লিখুন (আমল তালিকা)'
              : selectedLanguage === 'ur'
              ? 'اعمال فہرست'
              : selectedLanguage === 'hi'
              ? 'आमाल सूची'
              : selectedLanguage === 'id'
              ? 'Daftar Amal'
              : selectedLanguage === 'tr'
              ? 'Amel Listesi'
              : 'Daily Checklist'}
          </span>
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
              : 'text-teal-200 hover:text-white'
          }`}
        >
          <CalendarIcon className="w-4 h-4" />
          <span>
            {selectedLanguage === 'bn'
              ? 'রেকর্ড (ক্যালেন্ডার)'
              : selectedLanguage === 'ur'
              ? 'کیلنڈر ریکارڈ'
              : selectedLanguage === 'hi'
              ? 'कैलेंडर रिकॉर्ड'
              : selectedLanguage === 'id'
              ? 'Kalender Riwayat'
              : selectedLanguage === 'tr'
              ? 'Takvim Geçmişi'
              : 'Calendar Record'}
          </span>
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
              : 'text-teal-200 hover:text-white'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>
            {selectedLanguage === 'bn'
              ? 'তুলনা ও অগ্রগতি'
              : selectedLanguage === 'ur'
              ? 'پیشرفت'
              : selectedLanguage === 'hi'
              ? 'प्रगति'
              : selectedLanguage === 'id'
              ? 'Kemajuan'
              : selectedLanguage === 'tr'
              ? 'İlerleme'
              : 'Trends & Stats'}
          </span>
        </button>
      </div>

      {/* ===================== TAB 1: লিখুন (THE 8 SECTIONS CHECKLIST) ===================== */}
      {activeSubTab === 'checklist' && (
        <div className="space-y-4">
          {/* 1. আজকের নামাজ (The 5 Fardh Prayers) */}
          <div
            className={`rounded-3xl border shadow-lg overflow-hidden transition-all ${
              isDay ? 'bg-white border-slate-200' : 'bg-[#0c2a30] border-[#184a54]'
            }`}
          >
            <button
              onClick={() => toggleSectionCollapse('prayer')}
              className={`w-full p-4 sm:p-5 flex items-center justify-between text-left transition ${
                isDay ? 'hover:bg-slate-50' : 'hover:bg-teal-950/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`text-base font-bold ${isDay ? 'text-slate-900' : 'text-white'}`}>
                    আজকের নামাজ
                  </h3>
                  <p className={`text-[11px] ${isDay ? 'text-slate-500' : 'text-teal-300/80'}`}>
                    আজ কোন কোন ওয়াক্তের ফরজ নামাজ আদায় করেছেন, তা এখানে চিহ্নিত করুন
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 text-xs font-black font-mono">
                  {prayerItems.filter((i) => i.completed).length}/{prayerItems.length}
                </span>
                {collapsedSections.prayer ? (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                )}
              </div>
            </button>

            {!collapsedSections.prayer && (
              <div className="p-4 sm:p-5 pt-0 space-y-3 border-t border-slate-100 dark:border-teal-900/30">
                {/* 5 Circular Waqt Buttons */}
                <div className="grid grid-cols-5 gap-2 pt-2">
                  {waqtsList.map((w) => {
                    const item = dayLog.items.find((i) => i.id === w.id);
                    const isCompleted = item?.completed || false;
                    return (
                      <button
                        key={w.id}
                        onClick={() => handleToggleItem(w.id)}
                        className={`p-2.5 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer ${
                          isCompleted
                            ? 'bg-[#00875a] text-white border-emerald-500 shadow-md ring-2 ring-emerald-400/40'
                            : isDay
                            ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                            : 'bg-[#081e22] hover:bg-[#123940] border-[#17464f] text-teal-200'
                        }`}
                      >
                        <span className="text-xl">{w.icon}</span>
                        <span className="text-xs font-bold">{w.nameBn}</span>
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center ${
                            isCompleted ? 'bg-white text-emerald-600' : 'border border-slate-300 dark:border-teal-700'
                          }`}
                        >
                          {isCompleted && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Jamat / Congregation Card */}
                {(() => {
                  const jamatItem = dayLog.items.find((i) => i.id === 'jamat_fardh');
                  if (!jamatItem) return null;
                  return (
                    <div
                      onClick={() => handleToggleItem('jamat_fardh')}
                      className={`p-3.5 rounded-2xl border transition flex items-center justify-between cursor-pointer ${
                        jamatItem.completed
                          ? isDay
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                            : 'bg-[#092b30] border-emerald-500/50 text-emerald-100'
                          : isDay
                          ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                          : 'bg-[#081e22] border-[#16444d] text-teal-200 hover:bg-[#0f343c]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            jamatItem.completed
                              ? 'bg-emerald-600 border-emerald-600 text-white'
                              : 'border-slate-400 dark:border-teal-700'
                          }`}
                        >
                          {jamatItem.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm font-bold">
                            জামাতে ফরজ নামাজ আদায় করেছি
                          </div>
                          <div className="text-[11px] text-slate-400 dark:text-teal-300/70">
                            মসজিদে জামাতের সাথে সালাত সম্পন্ন করা (২৭ গুণ সওয়াব)
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-emerald-500 font-mono">+25 pts</span>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>

          {/* 2. সুন্নত ও নফল নামাজ (Sunnah & Nafl Prayers) */}
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
                    সুন্নত ও নফল নামাজ
                  </h3>
                  <p className={`text-[11px] ${isDay ? 'text-slate-500' : 'text-teal-300/80'}`}>
                    ফরজ নামাজের বাইরে অতিরিক্ত যে সুন্নত ও নফল নামাজগুলো আদায় করেছেন
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
              <div className="p-4 sm:p-5 pt-0 space-y-2 border-t border-slate-100 dark:border-teal-900/30">
                {sunnahItems.map((item) => (
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
                        : 'bg-[#081e22] border-[#16444d] text-teal-200 hover:bg-[#0f343c]'
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
                        <div className="text-xs sm:text-sm font-bold">{item.label}</div>
                        {item.details && (
                          <div className="text-[11px] text-slate-400 dark:text-teal-300/70">
                            {item.details}
                          </div>
                        )}
                      </div>
                    </div>
                    {item.arabicLabel && (
                      <span className="text-xs font-arabic text-emerald-600 dark:text-emerald-400 font-bold shrink-0">
                        {item.arabicLabel}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 3. কুরআন ও জিকির (Quran & Dhikr) */}
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
                    কুরআন ও জিকির
                  </h3>
                  <p className={`text-[11px] ${isDay ? 'text-slate-500' : 'text-teal-300/80'}`}>
                    কুরআন তিলাওয়াত, হিফজ এবং দৈনিক জিকির-ইস্তেগফারের হিসাব রাখুন
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-full bg-teal-500/15 text-teal-600 dark:text-teal-300 text-xs font-black font-mono">
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
                      📖 কুরআন তিলাওয়াত পৃষ্ঠা সংখ্যা
                    </div>
                    <div className="text-[11px] text-blue-600 dark:text-blue-400/80">
                      আজকের দিনে মোট কত পৃষ্ঠা তিলাওয়াত করেছেন
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
                        : 'bg-[#081e22] border-[#16444d] text-teal-200 hover:bg-[#0f343c]'
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
                        <div className="text-xs sm:text-sm font-bold">{item.label}</div>
                        {item.details && (
                          <div className="text-[11px] text-slate-400 dark:text-teal-300/70">
                            {item.details}
                          </div>
                        )}
                      </div>
                    </div>
                    {item.arabicLabel && (
                      <span className="text-xs font-arabic text-emerald-600 dark:text-emerald-400 font-bold shrink-0">
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
                    <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-teal-300">
                      <span>📿 আজকের জিকির বিবরণ (Dhikr Count)</span>
                      <span className="font-mono text-emerald-500">
                        সর্বমোট: {dayLog.dhikrCount} বার
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
                            <div className="text-emerald-600 dark:text-emerald-400 font-mono font-bold text-xs mt-0.5">
                              {z.count} বার
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 4. সকাল-সন্ধ্যা আমল (Morning & Evening Adhkar) */}
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
                    সকাল-সন্ধ্যা আমল
                  </h3>
                  <p className={`text-[11px] ${isDay ? 'text-slate-500' : 'text-teal-300/80'}`}>
                    সকাল ও সন্ধ্যায় নিয়মিত পড়ার মতো দোয়া ও আমলগুলো সম্পন্ন হয়েছে কি না দেখুন
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
                        : 'bg-[#081e22] border-[#16444d] text-teal-200 hover:bg-[#0f343c]'
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
                        <div className="text-xs sm:text-sm font-bold">{item.label}</div>
                        {item.details && (
                          <div className="text-[11px] text-slate-400 dark:text-teal-300/70">
                            {item.details}
                          </div>
                        )}
                      </div>
                    </div>
                    {item.arabicLabel && (
                      <span className="text-xs font-arabic text-emerald-600 dark:text-emerald-400 font-bold shrink-0">
                        {item.arabicLabel}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 5. ঘুমানোর আগের আমল (Bedtime Sunnah & Adhkar) */}
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
                    ঘুমানোর আগের আমল
                  </h3>
                  <p className={`text-[11px] ${isDay ? 'text-slate-500' : 'text-teal-300/80'}`}>
                    রাতে ঘুমানোর আগে যে সূরা ও আয়াতগুলো পড়া সুন্নত, সেগুলো পড়েছেন কি না লিখুন
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
                        : 'bg-[#081e22] border-[#16444d] text-teal-200 hover:bg-[#0f343c]'
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
                        <div className="text-xs sm:text-sm font-bold">{item.label}</div>
                        {item.details && (
                          <div className="text-[11px] text-slate-400 dark:text-teal-300/70">
                            {item.details}
                          </div>
                        )}
                      </div>
                    </div>
                    {item.arabicLabel && (
                      <span className="text-xs font-arabic text-emerald-600 dark:text-emerald-400 font-bold shrink-0">
                        {item.arabicLabel}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 6. চরিত্র ও নৈতিকতা (Character & Akhlaq) */}
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
                    চরিত্র ও নৈতিকতা
                  </h3>
                  <p className={`text-[11px] ${isDay ? 'text-slate-500' : 'text-teal-300/80'}`}>
                    আজকের দিনে নিজের ব্যবহার, কথা ও অভ্যাস কেমন ছিল তা সৎভাবে মূল্যায়ন করুন
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
                        : 'bg-[#081e22] border-[#16444d] text-teal-200 hover:bg-[#0f343c]'
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
                        <div className="text-xs sm:text-sm font-bold">{item.label}</div>
                        {item.details && (
                          <div className="text-[11px] text-slate-400 dark:text-teal-300/70">
                            {item.details}
                          </div>
                        )}
                      </div>
                    </div>
                    {item.arabicLabel && (
                      <span className="text-xs font-arabic text-emerald-600 dark:text-emerald-400 font-bold shrink-0">
                        {item.arabicLabel}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 7. ইলম ও দাওয়াহ (Knowledge & Dawah) */}
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
                <div className="w-9 h-9 rounded-2xl bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`text-base font-bold ${isDay ? 'text-slate-900' : 'text-white'}`}>
                    ইলম ও দাওয়াহ
                  </h3>
                  <p className={`text-[11px] ${isDay ? 'text-slate-500' : 'text-teal-300/80'}`}>
                    দ্বীনি জ্ঞান অর্জন এবং অন্যদের কাছে দ্বীনের দাওয়াহ পৌঁছে দেওয়ার হিসাব রাখুন
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
                        : 'bg-[#081e22] border-[#16444d] text-teal-200 hover:bg-[#0f343c]'
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
                        <div className="text-xs sm:text-sm font-bold">{item.label}</div>
                        {item.details && (
                          <div className="text-[11px] text-slate-400 dark:text-teal-300/70">
                            {item.details}
                          </div>
                        )}
                      </div>
                    </div>
                    {item.arabicLabel && (
                      <span className="text-xs font-arabic text-emerald-600 dark:text-emerald-400 font-bold shrink-0">
                        {item.arabicLabel}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 8. সামাজিক ও পারিবারিক (Social & Family Duties) */}
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
                    সামাজিক ও পারিবারিক
                  </h3>
                  <p className={`text-[11px] ${isDay ? 'text-slate-500' : 'text-teal-300/80'}`}>
                    পরিবার, আত্মীয়স্বজন ও সমাজের মানুষদের সাথে আজকের সম্পর্ক ও আচরণ কেমন ছিল
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
                        : 'bg-[#081e22] border-[#16444d] text-teal-200 hover:bg-[#0f343c]'
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
                        <div className="text-xs sm:text-sm font-bold">{item.label}</div>
                        {item.details && (
                          <div className="text-[11px] text-slate-400 dark:text-teal-300/70">
                            {item.details}
                          </div>
                        )}
                      </div>
                    </div>
                    {item.arabicLabel && (
                      <span className="text-xs font-arabic text-emerald-600 dark:text-emerald-400 font-bold shrink-0">
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
            <label className="text-xs font-bold text-slate-600 dark:text-teal-200 flex items-center gap-2">
              <span>✍️ আজকের আত্মচিন্তা ও মুহাসাবাহ নোট (Reflection Notes)</span>
            </label>
            <textarea
              rows={2}
              value={dayLog.reflectionNotes || ''}
              onChange={(e) => updateAndSaveLog({ ...dayLog, reflectionNotes: e.target.value })}
              placeholder="আজকের কোনো বিশেষ তওবা, নেক সংকল্প বা শিক্ষা এখানে লিখে রাখুন..."
              className={`w-full p-3 rounded-2xl border text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none ${
                isDay
                  ? 'bg-slate-50 border-slate-200 text-slate-800'
                  : 'bg-[#081e22] border-[#16444d] text-teal-100 placeholder-teal-300/40'
              }`}
            />
          </div>
        </div>
      )}

      {/* ===================== TAB 2: রেকর্ড (CALENDAR & RECORD SNAPSHOTS) ===================== */}
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
                  {selectedLanguage === 'bn' ? MONTH_NAMES_BN[calMonth] : MONTH_NAMES_EN[calMonth]}{' '}
                  {calYear}
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
                    : 'bg-[#092226] hover:bg-[#133c44] border-[#1a515c] text-teal-200'
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
                    : 'bg-[#092226] hover:bg-[#133c44] border-[#1a515c] text-teal-200'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Weekday Labels */}
          <div className="grid grid-cols-7 gap-1.5 text-center text-xs font-bold py-1">
            {(selectedLanguage === 'bn' ? WEEKDAYS_BN : WEEKDAYS_EN).map((w, idx) => (
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

      {/* ===================== TAB 3: তুলনা ও অগ্রগতি (TRENDS & STREAK) ===================== */}
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
                    ধারাবাহিকতা ও নিয়মিত আমল স্কোর
                  </h3>
                  <p className={`text-[11px] ${isDay ? 'text-[#507579]' : 'text-teal-300/80'}`}>
                    প্রতিদিন নেক আমল চালিয়ে যাওয়ার আধ্যাত্মিক অগ্রগতি
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400">Current Streak</span>
                <div className="text-xl font-black text-amber-400 font-mono">{streakDays} Days</div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div
                className={`p-3.5 rounded-2xl border text-center ${
                  isDay ? 'bg-slate-50 border-slate-200' : 'bg-[#081e22] border-[#133c44]'
                }`}
              >
                <span className="text-[10px] uppercase font-bold text-slate-400">Total Tracked</span>
                <div className="text-xl font-black text-emerald-500 font-mono mt-0.5">
                  {Object.keys(allLogs).length} Days
                </div>
              </div>

              <div
                className={`p-3.5 rounded-2xl border text-center ${
                  isDay ? 'bg-slate-50 border-slate-200' : 'bg-[#081e22] border-[#133c44]'
                }`}
              >
                <span className="text-[10px] uppercase font-bold text-slate-400">Today Completion</span>
                <div className="text-xl font-black text-teal-500 font-mono mt-0.5">
                  {percentCompleted}%
                </div>
              </div>

              <div
                className={`p-3.5 rounded-2xl border text-center ${
                  isDay ? 'bg-slate-50 border-slate-200' : 'bg-[#081e22] border-[#133c44]'
                }`}
              >
                <span className="text-[10px] uppercase font-bold text-slate-400">Fardh Salah Today</span>
                <div className="text-xl font-black text-blue-500 font-mono mt-0.5">
                  {fardhCompletedCount}/5
                </div>
              </div>

              <div
                className={`p-3.5 rounded-2xl border text-center ${
                  isDay ? 'bg-slate-50 border-slate-200' : 'bg-[#081e22] border-[#133c44]'
                }`}
              >
                <span className="text-[10px] uppercase font-bold text-slate-400">Quran Pages</span>
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

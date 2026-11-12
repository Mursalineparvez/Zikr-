import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Clock,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Copy,
  Check,
  Search,
  Heart,
  Volume2,
  VolumeX,
  ArrowRight,
  Calendar,
  BookMarked,
  RotateCcw,
  Sun,
  Moon,
  Flame,
  Compass,
  Play,
} from 'lucide-react';
import { ThemeMode, ZikrLanguage } from '../types';
import { soundHaptics } from '../utils/audioHaptics';
import {
  NOBI_24_TIME_SLOTS,
  NOBI_24_CHAPTERS,
  NOBI_24_DUAS,
  NOBI_DAILY_CHECKLIST,
  NobiTimeSlot,
} from '../data/nobi24HoursData';
import {
  NOBI_24_UI_I18N,
  getLocalizedSlot,
  getLocalizedChapter,
  getLocalizedDua,
  getLocalizedCheckItem,
} from '../utils/nobi24Translations';

interface Nobi24HoursViewProps {
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
  soundEnabled?: boolean;
  onBackToHub?: () => void;
}

const formatDurationLabel = (startHour: number, endHour: number, isBn: boolean): string => {
  const diff = endHour >= startHour ? endHour - startHour : 24 - startHour + endHour;
  const hrs = Math.floor(diff);
  const mins = Math.round((diff - hrs) * 60);
  if (isBn) {
    const toBn = (n: number) => String(n).replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]);
    if (hrs > 0 && mins > 0) return `${toBn(hrs)} ঘ. ${toBn(mins)} মি.`;
    if (hrs > 0) return `${toBn(hrs)} ঘণ্টা`;
    return `${toBn(mins)} মিনিট`;
  }
  if (hrs > 0 && mins > 0) return `${hrs}h ${mins}m`;
  if (hrs > 0) return `${hrs}h`;
  return `${mins}m`;
};

const formatHourClock = (hourVal: number, isBn: boolean): string => {
  const normalized = ((hourVal % 24) + 24) % 24;
  const h24 = Math.floor(normalized);
  const m = Math.round((normalized - h24) * 60);
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  const pad = (n: number) => String(n).padStart(2, '0');
  const raw = `${pad(h12)}:${pad(m)}`;
  if (!isBn) {
    return `${raw} ${h24 >= 12 ? 'PM' : 'AM'}`;
  }
  const bnTime = raw.replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]);
  const period = h24 < 5 ? 'রাত' : h24 < 12 ? 'সকাল' : h24 < 16 ? 'দুপুর' : h24 < 19 ? 'বিকাল' : 'রাত';
  return `${period} ${bnTime}`;
};

const toBnDigits = (val: string | number): string =>
  String(val).replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]);

export const Nobi24HoursView: React.FC<Nobi24HoursViewProps> = ({
  themeMode = 'night',
  selectedLanguage = 'bn',
  soundEnabled = true,
  onBackToHub,
}) => {
  const isDay = themeMode === 'day';
  const lang = selectedLanguage || 'bn';
  const isBn = lang === 'bn';
  const strings = NOBI_24_UI_I18N[lang] || NOBI_24_UI_I18N.en;

  // Sub-tabs: 'wheel' | 'timeline' | 'articles' | 'duas' | 'tracker'
  const [activeTab, setActiveTab] = useState<'wheel' | 'timeline' | 'articles' | 'duas' | 'tracker'>('wheel');

  // Currently selected slot in Wheel view
  const [selectedSlotId, setSelectedSlotId] = useState<string>('subh_sadiq_fajr');

  // Filters in Timeline view
  const [timelineFilter, setTimelineFilter] = useState<'all' | 'dawn' | 'midday' | 'night'>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'spiritual' | 'social' | 'physical' | 'family'>('all');

  // Search & Category queries
  const [chapterSearch, setChapterSearch] = useState<string>('');
  const [duaSearch, setDuaSearch] = useState<string>('');
  const [duaCategory, setDuaCategory] = useState<'all' | 'sleep_wake' | 'home_mosque' | 'food' | 'zikr'>('all');

  // Expanded chapter IDs & Reading Tracker
  const [expandedChapterId, setExpandedChapterId] = useState<string | null>(NOBI_24_CHAPTERS[0]?.id || null);
  const [readChapters, setReadChapters] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('nobi_24_chapters_read');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {};
  });

  const toggleChapterRead = (id: string) => {
    setReadChapters((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('nobi_24_chapters_read', JSON.stringify(updated));
      } catch {}
      if (soundEnabled) soundHaptics.playTap();
      return updated;
    });
  };

  // Non-blocking inline feedback notice (avoids window.alert)
  const [noticeText, setNoticeText] = useState<string | null>(null);
  const showNotice = (msg: string) => {
    setNoticeText(msg);
    setTimeout(() => {
      setNoticeText((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  // Copy feedback state
  const [copiedItemId, setCopiedItemId] = useState<string | null>(null);

  // Audio speech synthesis state
  const [isPlayingAudio, setIsPlayingAudio] = useState<string | null>(null);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Daily tracker state from localStorage
  const todayKey = useMemo(() => {
    return `nobi_sunnah_checklist_${new Date().toISOString().slice(0, 10)}`;
  }, []);

  const [trackedItems, setTrackedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(todayKey);
      if (saved) return JSON.parse(saved);
    } catch {}
    return {};
  });

  const toggleCheckItem = (id: string) => {
    setTrackedItems((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(todayKey, JSON.stringify(updated));
      } catch {}
      if (soundEnabled) soundHaptics.playMilestone();
      return updated;
    });
  };

  const handleMarkAllChecklist = (complete: boolean) => {
    const updated: Record<string, boolean> = {};
    if (complete) {
      NOBI_DAILY_CHECKLIST.forEach((item) => {
        updated[item.id] = true;
      });
    }
    setTrackedItems(updated);
    try {
      localStorage.setItem(todayKey, JSON.stringify(updated));
    } catch {}
    if (soundEnabled) soundHaptics.playMilestone();
  };

  // Last 7 days consistency snapshot
  const last7DaysStats = useMemo(() => {
    const days: Array<{ label: string; count: number; total: number; isToday: boolean }> = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = `nobi_sunnah_checklist_${d.toISOString().slice(0, 10)}`;
      let count = 0;
      if (i === 0) {
        count = Object.values(trackedItems).filter(Boolean).length;
      } else {
        try {
          const raw = localStorage.getItem(key);
          if (raw) count = Object.values(JSON.parse(raw)).filter(Boolean).length;
        } catch {}
      }
      const label = d.toLocaleDateString(isBn ? 'bn-BD' : 'en-US', { weekday: 'short' });
      days.push({ label, count, total: NOBI_DAILY_CHECKLIST.length, isToday: i === 0 });
    }
    return days;
  }, [trackedItems, isBn]);

  // Live hour detection
  const [nowDate, setNowDate] = useState<Date>(new Date());
  const [currentHourVal, setCurrentHourVal] = useState<number>(() => {
    const now = new Date();
    return now.getHours() + now.getMinutes() / 60;
  });

  useEffect(() => {
    const t = setInterval(() => {
      const now = new Date();
      setNowDate(now);
      setCurrentHourVal(now.getHours() + now.getMinutes() / 60);
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const currentLiveSlotIndex = useMemo(() => {
    const idx = NOBI_24_TIME_SLOTS.findIndex((s) => {
      if (s.startHour < s.endHour) {
        return currentHourVal >= s.startHour && currentHourVal < s.endHour;
      }
      return currentHourVal >= s.startHour || currentHourVal < s.endHour;
    });
    return idx >= 0 ? idx : 0;
  }, [currentHourVal]);

  const currentLiveSlot = NOBI_24_TIME_SLOTS[currentLiveSlotIndex];
  const nextLiveSlot = NOBI_24_TIME_SLOTS[(currentLiveSlotIndex + 1) % NOBI_24_TIME_SLOTS.length];

  // Progress & remaining time within current live slot
  const liveSlotTiming = useMemo(() => {
    const start = currentLiveSlot.startHour;
    const end = currentLiveSlot.endHour;
    const duration = end >= start ? end - start : 24 - start + end;
    const elapsed =
      end >= start
        ? Math.max(0, currentHourVal - start)
        : currentHourVal >= start
        ? currentHourVal - start
        : 24 - start + currentHourVal;
    const remaining = Math.max(0, duration - elapsed);
    const remH = Math.floor(remaining);
    const remM = Math.round((remaining - remH) * 60);
    const pct = Math.min(100, Math.max(0, Math.round((elapsed / Math.max(0.1, duration)) * 100)));
    return {
      pct,
      remainingText: isBn
        ? `${remH > 0 ? `${toBnDigits(remH)} ঘ. ` : ''}${toBnDigits(remM)} মি. বাকি`
        : `${remH > 0 ? `${remH}h ` : ''}${remM}m left`,
    };
  }, [currentLiveSlot, currentHourVal, isBn]);

  const activeSlotIndex = useMemo(() => {
    const idx = NOBI_24_TIME_SLOTS.findIndex((s) => s.id === selectedSlotId);
    return idx >= 0 ? idx : currentLiveSlotIndex;
  }, [selectedSlotId, currentLiveSlotIndex]);

  const activeSlot = NOBI_24_TIME_SLOTS[activeSlotIndex];

  const handleStepSlot = (dir: -1 | 1) => {
    const nextIdx = (activeSlotIndex + dir + NOBI_24_TIME_SLOTS.length) % NOBI_24_TIME_SLOTS.length;
    setSelectedSlotId(NOBI_24_TIME_SLOTS[nextIdx].id);
    if (soundEnabled) soundHaptics.playTap();
  };

  // Life Balance distribution calculated directly from the 14 slots
  const categoryBreakdown = useMemo(() => {
    const totals: Record<NobiTimeSlot['category'], number> = {
      spiritual: 0,
      social: 0,
      physical: 0,
      family: 0,
    };
    NOBI_24_TIME_SLOTS.forEach((s) => {
      const dur = s.endHour >= s.startHour ? s.endHour - s.startHour : 24 - s.startHour + s.endHour;
      totals[s.category] += dur;
    });
    return [
      { key: 'spiritual' as const, label: strings.categories.spiritual, hours: totals.spiritual, color: '#0d9488' },
      { key: 'social' as const, label: strings.categories.social, hours: totals.social, color: '#0284c7' },
      { key: 'physical' as const, label: strings.categories.physical, hours: totals.physical, color: '#ea580c' },
      { key: 'family' as const, label: strings.categories.family, hours: totals.family, color: '#8b5cf6' },
    ];
  }, [strings.categories]);

  // Audio reader using Web Speech API
  const handlePlaySpeech = (text: string, id: string, isArabic = false) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      showNotice(strings.common.audioNotSupported);
      return;
    }

    if (isPlayingAudio === id) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    if (isArabic) {
      utterance.lang = 'ar-SA';
      utterance.rate = 0.85;
    } else {
      utterance.lang = lang === 'bn' ? 'bn-BD' : lang === 'ar' ? 'ar-SA' : lang === 'ur' ? 'ur-PK' : 'en-US';
      utterance.rate = 0.95;
    }

    utterance.onend = () => setIsPlayingAudio(null);
    utterance.onerror = () => setIsPlayingAudio(null);

    synthRef.current = utterance;
    setIsPlayingAudio(id);
    window.speechSynthesis.speak(utterance);
    if (soundEnabled) soundHaptics.playTap();
  };

  const handleCopyText = (text: string, id: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedItemId(id);
      if (soundEnabled) soundHaptics.playTap();
      showNotice(strings.duas.copied);
      setTimeout(() => setCopiedItemId(null), 2000);
    }
  };

  const completedChecklistCount = Object.values(trackedItems).filter(Boolean).length;
  const checklistProgressPercent = Math.round((completedChecklistCount / NOBI_DAILY_CHECKLIST.length) * 100);
  const readChaptersCount = Object.values(readChapters).filter(Boolean).length;

  // Filtered timeline slots
  const filteredTimelineSlots = useMemo(() => {
    return NOBI_24_TIME_SLOTS.filter((slot) => {
      const timeOk =
        timelineFilter === 'dawn'
          ? slot.startHour >= 3 && slot.startHour < 10
          : timelineFilter === 'midday'
          ? slot.startHour >= 10 && slot.startHour < 17
          : timelineFilter === 'night'
          ? slot.startHour >= 17 || slot.startHour < 3
          : true;
      const catOk = categoryFilter === 'all' || slot.category === categoryFilter;
      return timeOk && catOk;
    });
  }, [timelineFilter, categoryFilter]);

  // Filtered chapters
  const filteredChapters = useMemo(() => {
    if (!chapterSearch.trim()) return NOBI_24_CHAPTERS;
    const q = chapterSearch.toLowerCase();
    return NOBI_24_CHAPTERS.filter(
      (c) =>
        c.titleBn.toLowerCase().includes(q) ||
        c.titleEn.toLowerCase().includes(q) ||
        c.subtitleBn.toLowerCase().includes(q) ||
        c.contentBn.some((p) => p.toLowerCase().includes(q))
    );
  }, [chapterSearch]);

  // Filtered Duas with category chips
  const filteredDuas = useMemo(() => {
    return NOBI_24_DUAS.filter((d) => {
      const catOk =
        duaCategory === 'all'
          ? true
          : duaCategory === 'sleep_wake'
          ? ['dua_waking', 'dua_sleep_tasbih'].includes(d.id)
          : duaCategory === 'home_mosque'
          ? ['dua_toilet_enter', 'dua_toilet_exit', 'dua_exit_home', 'dua_enter_home'].includes(d.id)
          : duaCategory === 'food'
          ? ['dua_eating_start', 'dua_drinking_milk'].includes(d.id)
          : ['dua_sayyidul_istighfar', 'dua_protection_hell', 'dua_protection_illness', 'dua_raditu_billah'].includes(d.id);

      if (!catOk) return false;
      if (!duaSearch.trim()) return true;
      const q = duaSearch.toLowerCase();
      return (
        d.titleBn.toLowerCase().includes(q) ||
        d.titleEn.toLowerCase().includes(q) ||
        d.meaningBn.toLowerCase().includes(q) ||
        d.meaningEn.toLowerCase().includes(q) ||
        d.arabic.includes(q)
      );
    });
  }, [duaSearch, duaCategory]);

  const locLiveSlot = getLocalizedSlot(currentLiveSlot, lang);
  const locNextSlot = getLocalizedSlot(nextLiveSlot, lang);
  const locActiveSlot = getLocalizedSlot(activeSlot, lang);

  const formattedLiveClock = useMemo(() => {
    return nowDate.toLocaleTimeString(lang === 'bn' ? 'bn-BD' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  }, [nowDate, lang]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Inline Non-Blocking Toast Feedback */}
      {noticeText && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-[#006A4E] text-white text-xs font-bold shadow-lg border border-emerald-400/40 flex items-center gap-1.5 animate-in fade-in slide-in-from-top-2">
          <Check className="w-3.5 h-3.5 text-emerald-300" />
          <span>{noticeText}</span>
        </div>
      )}

      {/* 1. EDITORIAL HERO & LIVE SUNNAH COMMAND BANNER */}
      <div
        className={`relative overflow-hidden rounded-[28px] p-5 sm:p-7 border shadow-lg transition-all duration-300 ${
          isDay
            ? 'bg-gradient-to-br from-[#005941] via-[#006A4E] to-[#024735] text-white border-emerald-700/40'
            : 'bg-gradient-to-br from-[#061c21] via-[#0a2a31] to-[#041418] text-white border-[#154550]'
        }`}
      >
        {/* Subtle geometric Islamic lattice watermark (clean, no blurred AI blobs) */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 h-full w-64 opacity-[0.06] text-white"
          viewBox="0 0 200 200"
          fill="none"
        >
          <circle cx="150" cy="50" r="78" stroke="currentColor" strokeWidth="1" />
          <circle cx="150" cy="50" r="56" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <polygon points="150,2 184,36 184,84 150,118 116,84 116,36" stroke="currentColor" strokeWidth="0.9" />
          <circle cx="150" cy="170" r="44" stroke="currentColor" strokeWidth="0.8" />
        </svg>

        <div className="relative z-10 space-y-5">
          {/* Top Bar: Back + Arabic Header */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            {onBackToHub ? (
              <button
                type="button"
                onClick={onBackToHub}
                className="min-h-[40px] inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/10 hover:bg-white/20 border border-white/20 text-emerald-50 transition active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{strings.backToHub}</span>
              </button>
            ) : (
              <span />
            )}

            <span className="font-arabic text-sm sm:text-base font-bold text-amber-200/95 tracking-wide">
              {strings.arabicTitle}
            </span>
          </div>

          {/* Main Grid: Title + Live Phase Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                  {strings.title}
                </h1>
                <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl leading-relaxed">
                  {strings.subtitle}
                </p>
              </div>

              {/* 4-Metric Informative Summary Strip (Tabular Numbers) */}
              <div className="grid grid-cols-4 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('timeline')}
                  className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-left transition cursor-pointer"
                >
                  <div className="text-base sm:text-lg font-black tabular-nums">
                    {isBn ? toBnDigits(NOBI_24_TIME_SLOTS.length) : NOBI_24_TIME_SLOTS.length}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-emerald-100/80 font-medium truncate">
                    {isBn ? 'সময় পর্ব' : 'Phases'}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('articles')}
                  className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-left transition cursor-pointer"
                >
                  <div className="text-base sm:text-lg font-black tabular-nums">
                    {isBn ? toBnDigits(NOBI_24_CHAPTERS.length) : NOBI_24_CHAPTERS.length}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-emerald-100/80 font-medium truncate">
                    {isBn ? 'অধ্যায়' : 'Chapters'}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('duas')}
                  className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-left transition cursor-pointer"
                >
                  <div className="text-base sm:text-lg font-black tabular-nums">
                    {isBn ? toBnDigits(NOBI_24_DUAS.length) : NOBI_24_DUAS.length}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-emerald-100/80 font-medium truncate">
                    {isBn ? 'মাসনুন দোয়া' : 'Duas'}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('tracker')}
                  className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-left transition cursor-pointer"
                >
                  <div className="text-base sm:text-lg font-black tabular-nums text-amber-300">
                    {isBn
                      ? `${toBnDigits(completedChecklistCount)}/${toBnDigits(NOBI_DAILY_CHECKLIST.length)}`
                      : `${completedChecklistCount}/${NOBI_DAILY_CHECKLIST.length}`}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-emerald-100/80 font-medium truncate">
                    {isBn ? 'আজকের সুন্নাহ' : 'Checked'}
                  </div>
                </button>
              </div>
            </div>

            {/* Live Clock & Active Phase Progress Card */}
            <div className="lg:col-span-5 p-4 sm:p-5 rounded-2xl bg-black/25 border border-white/15 flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-200">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <span>{strings.liveBanner.nowInRoutine}</span>
                </div>
                <span className="text-xs font-mono font-bold tabular-nums text-white/90">
                  {formattedLiveClock}
                </span>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-2xl p-2 rounded-xl bg-white/10 shrink-0">
                  {currentLiveSlot.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-semibold text-amber-300 truncate">
                    {locLiveSlot.timeSpan}
                  </div>
                  <h2 className="text-sm sm:text-base font-black text-white leading-snug line-clamp-1">
                    {locLiveSlot.title}
                  </h2>
                  <p className="text-[11px] text-emerald-100/80 line-clamp-2 mt-0.5 leading-relaxed">
                    {locLiveSlot.summary}
                  </p>
                </div>
              </div>

              {/* Phase Progress Bar & Next Up */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-[11px] font-semibold text-emerald-100/85 tabular-nums">
                  <span>{liveSlotTiming.remainingText}</span>
                  <span>
                    {isBn ? `পরবর্তী: ${locNextSlot.title}` : `Next: ${locNextSlot.title}`}
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/15 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-amber-400 transition-all duration-500"
                    style={{ width: `${liveSlotTiming.pct}%` }}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedSlotId(currentLiveSlot.id);
                  setActiveTab('wheel');
                  if (soundEnabled) soundHaptics.playTap();
                }}
                className="w-full min-h-[40px] py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black flex items-center justify-center gap-1.5 transition active:scale-[0.98] cursor-pointer"
              >
                <span>{strings.liveBanner.viewDetails}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. NAVIGATION SUB-TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          type="button"
          onClick={() => {
            setActiveTab('wheel');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`min-h-[44px] flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition active:scale-95 cursor-pointer shrink-0 border ${
            activeTab === 'wheel'
              ? 'bg-[#006A4E] text-white border-emerald-500 shadow-md'
              : isDay
              ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
              : 'bg-[#092226] hover:bg-[#123840] border-[#153e46] text-emerald-300'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>{strings.tabs.wheel}</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab('timeline');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`min-h-[44px] flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition active:scale-95 cursor-pointer shrink-0 border ${
            activeTab === 'timeline'
              ? 'bg-[#006A4E] text-white border-emerald-500 shadow-md'
              : isDay
              ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
              : 'bg-[#092226] hover:bg-[#123840] border-[#153e46] text-emerald-300'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>{strings.tabs.timeline}</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab('articles');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`min-h-[44px] flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition active:scale-95 cursor-pointer shrink-0 border ${
            activeTab === 'articles'
              ? 'bg-amber-600 text-white border-amber-500 shadow-md'
              : isDay
              ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
              : 'bg-[#092226] hover:bg-[#123840] border-[#153e46] text-emerald-300'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>{strings.tabs.articles}</span>
          <span className="text-[11px] font-mono tabular-nums opacity-85">
            ({isBn ? toBnDigits(NOBI_24_CHAPTERS.length) : NOBI_24_CHAPTERS.length})
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab('duas');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`min-h-[44px] flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition active:scale-95 cursor-pointer shrink-0 border ${
            activeTab === 'duas'
              ? 'bg-rose-600 text-white border-rose-500 shadow-md'
              : isDay
              ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
              : 'bg-[#092226] hover:bg-[#123840] border-[#153e46] text-emerald-300'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>{strings.tabs.duas}</span>
          <span className="text-[11px] font-mono tabular-nums opacity-85">
            ({isBn ? toBnDigits(NOBI_24_DUAS.length) : NOBI_24_DUAS.length})
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab('tracker');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`min-h-[44px] flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition active:scale-95 cursor-pointer shrink-0 border ${
            activeTab === 'tracker'
              ? 'bg-teal-600 text-white border-teal-500 shadow-md'
              : isDay
              ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
              : 'bg-[#092226] hover:bg-[#123840] border-[#153e46] text-emerald-300'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{strings.tabs.tracker}</span>
          <span className="text-[11px] font-mono tabular-nums opacity-85">
            {completedChecklistCount}/{NOBI_DAILY_CHECKLIST.length}
          </span>
        </button>
      </div>

      {/* 3. TAB 1: 24-HOUR SUNNAH WHEEL + LIFE BALANCE + SLOT INSPECTOR */}
      {activeTab === 'wheel' && (
        <div className="space-y-6">
          {/* 24-Hour Life Balance Distribution Bar */}
          <div
            className={`p-4 sm:p-5 rounded-3xl border shadow-2xs space-y-3 ${
              isDay ? 'bg-white border-slate-200/90' : 'bg-[#0a2026] border-[#153c45]'
            }`}
          >
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <Compass className={`w-4 h-4 ${isDay ? 'text-[#006A4E]' : 'text-emerald-400'}`} />
                <h2 className={`text-xs sm:text-sm font-black ${isDay ? 'text-slate-900' : 'text-white'}`}>
                  {isBn ? '২৪ ঘণ্টার ভারসাম্যপূর্ণ জীবনবণ্টন (Life Balance)' : '24-Hour Prophetic Life Balance'}
                </h2>
              </div>
              <span className={`text-[11px] font-mono font-semibold tabular-nums ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                {isBn ? 'মোট: ২৪ ঘণ্টা · ১৪ পর্ব' : 'Total: 24.0 Hours · 14 Phases'}
              </span>
            </div>

            {/* Stacked Progress Bar */}
            <div className="h-3 w-full rounded-full overflow-hidden flex gap-0.5 bg-slate-200/60 dark:bg-slate-800/60">
              {categoryBreakdown.map((cat) => (
                <div
                  key={cat.key}
                  style={{
                    width: `${(cat.hours / 24) * 100}%`,
                    backgroundColor: cat.color,
                  }}
                  title={`${cat.label}: ${cat.hours}h`}
                  className="h-full transition-all duration-300"
                />
              ))}
            </div>

            {/* Clean Legend Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-0.5">
              {categoryBreakdown.map((cat) => {
                const pct = Math.round((cat.hours / 24) * 100);
                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => {
                      setCategoryFilter(cat.key);
                      setTimelineFilter('all');
                      setActiveTab('timeline');
                    }}
                    className={`flex items-center justify-between gap-2 px-3 py-2 rounded-xl border text-left transition cursor-pointer ${
                      isDay
                        ? 'bg-slate-50/80 hover:bg-slate-100 border-slate-200/80'
                        : 'bg-[#07191e] hover:bg-[#0d2b33] border-[#133841]'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: cat.color }}
                      />
                      <span className={`text-[11px] font-bold truncate ${isDay ? 'text-slate-700' : 'text-slate-200'}`}>
                        {cat.label}
                      </span>
                    </div>
                    <span className={`text-[11px] font-mono font-black tabular-nums shrink-0 ${isDay ? 'text-slate-900' : 'text-emerald-300'}`}>
                      {isBn ? `${toBnDigits(cat.hours)}ঘ (${toBnDigits(pct)}%)` : `${cat.hours}h`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Wheel Dial Column */}
            <div
              className={`lg:col-span-6 p-5 sm:p-7 rounded-[28px] border shadow-sm flex flex-col items-center justify-between text-center transition-colors space-y-4 ${
                isDay ? 'bg-white border-slate-200/90' : 'bg-[#0a2026] border-[#153c45]'
              }`}
            >
              <div className="w-full flex items-center justify-between gap-2">
                <div className="text-left">
                  <h2 className={`text-base sm:text-lg font-black ${isDay ? 'text-slate-900' : 'text-white'}`}>
                    {strings.wheel.title}
                  </h2>
                  <p className={`text-xs ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                    {strings.wheel.subtitle}
                  </p>
                </div>

                {selectedSlotId !== currentLiveSlot.id && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSlotId(currentLiveSlot.id);
                      if (soundEnabled) soundHaptics.playTap();
                    }}
                    className="px-3 py-1.5 rounded-full text-[11px] font-bold bg-amber-400/20 text-amber-700 dark:text-amber-300 border border-amber-400/40 hover:bg-amber-400/30 transition cursor-pointer shrink-0"
                  >
                    {isBn ? 'এখনকার সময়' : 'Jump to Live'}
                  </button>
                )}
              </div>

              {/* Circular SVG 24-Hour Wheel with 24h Dial Ticks */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 my-1 flex items-center justify-center">
                <svg viewBox="0 0 420 420" className="w-full h-full">
                  {/* 24-Hour Radial Tick Marks & Cardinal Hour Labels */}
                  {Array.from({ length: 24 }).map((_, hr) => {
                    const angleDeg = (hr / 24) * 360 - 90;
                    const rad = (angleDeg * Math.PI) / 180;
                    const isMajor = hr % 3 === 0;
                    const r1 = 192;
                    const r2 = isMajor ? 200 : 196;
                    const x1 = 210 + r1 * Math.cos(rad);
                    const y1 = 210 + r1 * Math.sin(rad);
                    const x2 = 210 + r2 * Math.cos(rad);
                    const y2 = 210 + r2 * Math.sin(rad);
                    const labelR = 207;
                    const lx = 210 + labelR * Math.cos(rad);
                    const ly = 210 + labelR * Math.sin(rad);

                    return (
                      <g key={hr}>
                        <line
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke={isDay ? (isMajor ? '#64748b' : '#cbd5e1') : isMajor ? '#5eead4' : '#1e4e59'}
                          strokeWidth={isMajor ? 2 : 1}
                          strokeLinecap="round"
                        />
                        {hr % 6 === 0 && (
                          <text
                            x={lx}
                            y={ly}
                            textAnchor="middle"
                            dominantBaseline="central"
                            fontSize="10"
                            fontWeight="700"
                            fill={isDay ? '#475569' : '#94a3b8'}
                          >
                            {hr === 0 ? '12AM' : hr === 6 ? '6AM' : hr === 12 ? '12PM' : '6PM'}
                          </text>
                        )}
                      </g>
                    );
                  })}

                  <g transform="rotate(-90 210 210)">
                    {/* Background Outer Ring */}
                    <circle
                      cx="210"
                      cy="210"
                      r="164"
                      fill="none"
                      stroke={isDay ? '#e2e8f0' : '#143840'}
                      strokeWidth="28"
                    />

                    {/* 14 Slices */}
                    {NOBI_24_TIME_SLOTS.map((slot) => {
                      const totalHoursInSlot =
                        slot.endHour >= slot.startHour
                          ? slot.endHour - slot.startHour
                          : 24 - slot.startHour + slot.endHour;

                      const startAngle = (slot.startHour / 24) * 360;
                      const sliceAngle = (totalHoursInSlot / 24) * 360;
                      const isSelected = slot.id === activeSlot.id;
                      const isLive = slot.id === currentLiveSlot.id;

                      const radius = 164;
                      const strokeW = isSelected ? 34 : 25;
                      const circumference = 2 * Math.PI * radius;
                      const strokeDasharray = `${Math.max(2, (sliceAngle / 360) * circumference - 2)} ${circumference}`;
                      const strokeDashoffset = -((startAngle / 360) * circumference);

                      return (
                        <circle
                          key={slot.id}
                          cx="210"
                          cy="210"
                          r={radius}
                          fill="none"
                          stroke={slot.color}
                          strokeWidth={strokeW}
                          strokeDasharray={strokeDasharray}
                          strokeDashoffset={strokeDashoffset}
                          opacity={isSelected ? 1 : isLive ? 0.92 : 0.62}
                          className="cursor-pointer transition-all duration-300 hover:opacity-100"
                          onClick={() => {
                            setSelectedSlotId(slot.id);
                            if (soundEnabled) soundHaptics.playTap();
                          }}
                        />
                      );
                    })}

                    {/* Current Live Hour Needle */}
                    {(() => {
                      const angleRad = ((currentHourVal / 24) * 360 * Math.PI) / 180;
                      const handX = 210 + 138 * Math.cos(angleRad);
                      const handY = 210 + 138 * Math.sin(angleRad);
                      return (
                        <g>
                          <line
                            x1="210"
                            y1="210"
                            x2={handX}
                            y2={handY}
                            stroke="#f59e0b"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                          />
                          <circle cx={handX} cy={handY} r="6.5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
                        </g>
                      );
                    })()}

                    {/* Center Hub */}
                    <circle cx="210" cy="210" r="114" fill={isDay ? '#ffffff' : '#07181c'} />
                    <circle
                      cx="210"
                      cy="210"
                      r="114"
                      fill="none"
                      stroke={isDay ? '#e2e8f0' : '#143840'}
                      strokeWidth="2"
                    />
                  </g>
                </svg>

                {/* Center Content Inside Wheel */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-10 pointer-events-none text-center">
                  <span className="text-3xl mb-1">{activeSlot.icon}</span>
                  <span className="text-[10px] font-black font-mono uppercase tracking-wider text-amber-500">
                    {isBn
                      ? `পর্ব ${toBnDigits(activeSlotIndex + 1)}/${toBnDigits(NOBI_24_TIME_SLOTS.length)} · ${formatDurationLabel(activeSlot.startHour, activeSlot.endHour, true)}`
                      : `Step ${activeSlotIndex + 1}/${NOBI_24_TIME_SLOTS.length} · ${formatDurationLabel(activeSlot.startHour, activeSlot.endHour, false)}`}
                  </span>
                  <h3
                    className={`text-sm sm:text-base font-black line-clamp-2 mt-1 leading-snug ${
                      isDay ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {locActiveSlot.title}
                  </h3>
                  <span className={`text-[11px] font-semibold mt-1 ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                    {formatHourClock(activeSlot.startHour, isBn)}
                  </span>
                </div>
              </div>

              {/* Prev / Next Stepper & Quick 14-Slot Selector Strip */}
              <div className="w-full space-y-2.5 pt-1">
                <div className="flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => handleStepSlot(-1)}
                    className={`min-h-[40px] px-3.5 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1 transition active:scale-95 cursor-pointer ${
                      isDay
                        ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                        : 'bg-[#07191e] hover:bg-[#0e2d35] border-[#153e46] text-emerald-300'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>{isBn ? 'পূর্ববর্তী' : 'Prev'}</span>
                  </button>

                  <span className={`text-xs font-mono font-bold tabular-nums ${isDay ? 'text-slate-600' : 'text-slate-300'}`}>
                    {isBn
                      ? `${toBnDigits(activeSlotIndex + 1)} / ${toBnDigits(NOBI_24_TIME_SLOTS.length)}`
                      : `${activeSlotIndex + 1} / ${NOBI_24_TIME_SLOTS.length}`}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleStepSlot(1)}
                    className={`min-h-[40px] px-3.5 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1 transition active:scale-95 cursor-pointer ${
                      isDay
                        ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                        : 'bg-[#07191e] hover:bg-[#0e2d35] border-[#153e46] text-emerald-300'
                    }`}
                  >
                    <span>{isBn ? 'পরবর্তী' : 'Next'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Horizontal Quick 14-Slot Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {NOBI_24_TIME_SLOTS.map((slot, idx) => {
                    const isSelected = slot.id === activeSlot.id;
                    const isLive = slot.id === currentLiveSlot.id;
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => {
                          setSelectedSlotId(slot.id);
                          if (soundEnabled) soundHaptics.playTap();
                        }}
                        className={`px-2.5 py-1.5 rounded-xl border text-[11px] font-bold whitespace-nowrap flex items-center gap-1.5 transition shrink-0 cursor-pointer ${
                          isSelected
                            ? 'bg-[#006A4E] text-white border-emerald-500 shadow-sm'
                            : isDay
                            ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                            : 'bg-[#07181d] hover:bg-[#103038] border-[#143a43] text-slate-300'
                        }`}
                      >
                        <span>{slot.icon}</span>
                        <span className="font-mono tabular-nums">{isBn ? toBnDigits(idx + 1) : idx + 1}</span>
                        {isLive && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Active Slot Detailed Inspection Column */}
            <div
              className={`lg:col-span-6 p-5 sm:p-7 rounded-[28px] border shadow-sm space-y-5 transition-colors ${
                isDay ? 'bg-white border-slate-200/90' : 'bg-[#0a2026] border-[#153c45]'
              }`}
            >
              {/* Header with Title and Actions */}
              <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-200/70 dark:border-[#153c45]">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xl">{activeSlot.icon}</span>
                    <span
                      className="px-2.5 py-0.5 rounded-md text-[11px] font-bold text-white"
                      style={{ backgroundColor: activeSlot.color }}
                    >
                      {locActiveSlot.categoryLabel}
                    </span>
                    <span className={`text-[11px] font-mono font-bold tabular-nums ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                      {formatDurationLabel(activeSlot.startHour, activeSlot.endHour, isBn)}
                    </span>
                    {activeSlot.id === currentLiveSlot.id && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-amber-400 text-slate-950">
                        LIVE NOW
                      </span>
                    )}
                  </div>
                  <h3 className={`text-xl sm:text-2xl font-black tracking-tight ${isDay ? 'text-slate-900' : 'text-white'}`}>
                    {locActiveSlot.title}
                  </h3>
                  <p className="text-xs font-bold text-amber-600 dark:text-amber-400">
                    {locActiveSlot.timeSpan}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      handleCopyText(
                        `${locActiveSlot.title} (${locActiveSlot.timeSpan})\n${locActiveSlot.summary}\n\n${locActiveSlot.actions.map((a, i) => `${i + 1}. ${a}`).join('\n')}`,
                        `slot_${activeSlot.id}`
                      )
                    }
                    className={`min-w-[40px] min-h-[40px] p-2 rounded-xl border transition active:scale-95 cursor-pointer flex items-center justify-center ${
                      copiedItemId === `slot_${activeSlot.id}`
                        ? 'bg-emerald-600 text-white border-emerald-500'
                        : isDay
                        ? 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                        : 'bg-[#123138] hover:bg-[#18444e] text-emerald-300 border-[#1c4d57]'
                    }`}
                    title={strings.common.copy}
                  >
                    {copiedItemId === `slot_${activeSlot.id}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => handlePlaySpeech(`${locActiveSlot.title}. ${locActiveSlot.summary}`, activeSlot.id)}
                    className={`min-w-[40px] min-h-[40px] p-2 rounded-xl border transition active:scale-95 cursor-pointer flex items-center justify-center ${
                      isPlayingAudio === activeSlot.id
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                        : isDay
                        ? 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                        : 'bg-[#123138] hover:bg-[#18444e] text-emerald-300 border-[#1c4d57]'
                    }`}
                    title={isPlayingAudio === activeSlot.id ? strings.duas.stopAudio : strings.duas.listenDua}
                  >
                    {isPlayingAudio === activeSlot.id ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Summary Callout */}
              <div
                className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed font-medium ${
                  isDay
                    ? 'bg-[#f4faf7] border-emerald-200/80 text-emerald-950'
                    : 'bg-emerald-950/30 border-emerald-800/40 text-emerald-100'
                }`}
              >
                {locActiveSlot.summary}
              </div>

              {/* Numbered Action Points */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className={`text-xs font-black uppercase tracking-wider ${isDay ? 'text-slate-700' : 'text-slate-300'}`}>
                    {strings.wheel.sunnahActions}
                  </h4>
                  <span className={`text-[11px] font-mono font-bold tabular-nums ${isDay ? 'text-emerald-700' : 'text-emerald-400'}`}>
                    {isBn ? `${toBnDigits(locActiveSlot.actions.length)}টি আমল` : `${locActiveSlot.actions.length} steps`}
                  </span>
                </div>
                <div className="space-y-2">
                  {locActiveSlot.actions.map((act, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-2xl border flex items-start gap-3 text-xs sm:text-sm leading-relaxed ${
                        isDay ? 'bg-slate-50/70 border-slate-200/70 text-slate-700' : 'bg-[#07191e] border-[#133841] text-slate-200'
                      }`}
                    >
                      <span
                        className={`w-6 h-6 rounded-lg font-mono text-[11px] font-black flex items-center justify-center shrink-0 mt-0.5 tabular-nums ${
                          isDay ? 'bg-emerald-100 text-[#006A4E]' : 'bg-emerald-900/50 text-emerald-300'
                        }`}
                      >
                        {isBn ? toBnDigits(String(idx + 1).padStart(2, '0')) : String(idx + 1).padStart(2, '0')}
                      </span>
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hadith Citation */}
              {locActiveSlot.hadith && (
                <div
                  className={`p-4 rounded-2xl border text-xs sm:text-sm space-y-1.5 ${
                    isDay
                      ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                      : 'bg-amber-950/20 border-amber-800/40 text-amber-200'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400">
                    <BookMarked className="w-3.5 h-3.5" />
                    <span>{strings.wheel.hadithQuote}</span>
                  </div>
                  <p className="italic leading-relaxed font-serif">"{locActiveSlot.hadith}"</p>
                  {activeSlot.hadithRef && (
                    <div className="text-[11px] font-semibold text-right opacity-80">
                      — {activeSlot.hadithRef}
                    </div>
                  )}
                </div>
              )}

              {/* Masnun Dua If Applicable */}
              {activeSlot.dua && (
                <div
                  className={`p-4 rounded-2xl border space-y-2.5 ${
                    isDay
                      ? 'bg-teal-50/70 border-teal-200 text-teal-950'
                      : 'bg-[#0e2c33] border-[#184954] text-teal-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-teal-800 dark:text-teal-300">
                      {strings.wheel.duaOfSlot}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handlePlaySpeech(activeSlot.dua!.arabic, `dua_${activeSlot.id}`, true)}
                        className="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition cursor-pointer"
                        title={strings.duas.listenDua}
                      >
                        <Volume2 className="w-4 h-4 text-teal-700 dark:text-teal-300" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCopyText(activeSlot.dua!.arabic, `dua_${activeSlot.id}`)}
                        className="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition cursor-pointer"
                        title={strings.common.copy}
                      >
                        {copiedItemId === `dua_${activeSlot.id}` ? (
                          <Check className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Copy className="w-4 h-4 text-teal-700 dark:text-teal-300" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div dir="rtl" className="text-lg sm:text-xl font-arabic font-bold text-right leading-[2.1] tracking-wide">
                    {activeSlot.dua.arabic}
                  </div>
                  <div className="text-xs italic opacity-85">
                    {activeSlot.dua.transliteration}
                  </div>
                  <div className="text-xs font-medium border-t border-teal-300/40 dark:border-teal-700/40 pt-2">
                    {locActiveSlot.duaTranslation}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 4. TAB 2: CHRONOLOGICAL TIMELINE ROUTINE (14 SEQUENTIAL STEPS) */}
      {activeTab === 'timeline' && (
        <div className="space-y-6">
          {/* Header & Filter Bar */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h2 className={`text-xl sm:text-2xl font-black ${isDay ? 'text-slate-900' : 'text-white'}`}>
                  {strings.timeline.title}
                </h2>
                <p className={`text-xs sm:text-sm ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                  {strings.timeline.subtitle}
                </p>
              </div>

              {/* Time-of-Day Filter buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { id: 'all' as const, label: strings.filters.all, icon: null },
                  { id: 'dawn' as const, label: strings.filters.dawnMorning, icon: <Sun className="w-3.5 h-3.5" /> },
                  { id: 'midday' as const, label: strings.filters.middayAfternoon, icon: <Clock className="w-3.5 h-3.5" /> },
                  { id: 'night' as const, label: strings.filters.eveningNight, icon: <Moon className="w-3.5 h-3.5" /> },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setTimelineFilter(f.id)}
                    className={`min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-bold transition active:scale-95 cursor-pointer shrink-0 border flex items-center gap-1.5 ${
                      timelineFilter === f.id
                        ? 'bg-[#006A4E] text-white border-emerald-500 shadow-sm'
                        : isDay
                        ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        : 'bg-[#092226] border-[#153e46] text-emerald-300'
                    }`}
                  >
                    {f.icon}
                    <span>{f.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <button
                type="button"
                onClick={() => setCategoryFilter('all')}
                className={`px-3 py-1 rounded-full text-[11px] font-bold border transition cursor-pointer shrink-0 ${
                  categoryFilter === 'all'
                    ? 'bg-slate-900 text-white dark:bg-emerald-500 dark:text-slate-950 border-transparent'
                    : isDay
                    ? 'bg-slate-100 border-slate-200 text-slate-600'
                    : 'bg-[#081d22] border-[#153e46] text-slate-300'
                }`}
              >
                {isBn ? 'সকল ক্যাটাগরি' : 'All Categories'}
              </button>
              {categoryBreakdown.map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setCategoryFilter(cat.key)}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold border transition cursor-pointer shrink-0 flex items-center gap-1.5 ${
                    categoryFilter === cat.key
                      ? 'text-white border-transparent shadow-xs'
                      : isDay
                      ? 'bg-white border-slate-200 text-slate-700'
                      : 'bg-[#081d22] border-[#153e46] text-slate-300'
                  }`}
                  style={categoryFilter === cat.key ? { backgroundColor: cat.color } : undefined}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: categoryFilter === cat.key ? '#ffffff' : cat.color }} />
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Connected Vertical Chronological Timeline */}
          <div className="relative pl-5 sm:pl-7 space-y-5 before:content-[''] before:absolute before:left-[9px] sm:before:left-[13px] before:top-4 before:bottom-4 before:w-0.5 before:bg-emerald-200 dark:before:bg-[#174650]">
            {filteredTimelineSlots.map((slot) => {
              const globalIdx = NOBI_24_TIME_SLOTS.findIndex((s) => s.id === slot.id);
              const loc = getLocalizedSlot(slot, lang);
              const isLive = slot.id === currentLiveSlot.id;

              return (
                <div key={slot.id} className="relative">
                  {/* Timeline Node Dot */}
                  <div
                    className={`absolute -left-5 sm:-left-7 top-6 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-black font-mono z-10 ${
                      isLive
                        ? 'bg-amber-400 border-white text-slate-950 shadow-md ring-4 ring-amber-400/25'
                        : isDay
                        ? 'bg-white border-[#006A4E] text-[#006A4E]'
                        : 'bg-[#07181c] border-emerald-400 text-emerald-300'
                    }`}
                  >
                    {isBn ? toBnDigits(globalIdx + 1) : globalIdx + 1}
                  </div>

                  <div
                    className={`p-5 sm:p-6 rounded-[26px] border shadow-xs transition-all duration-200 space-y-4 ${
                      isLive
                        ? isDay
                          ? 'bg-[#f4faf7] border-emerald-400 shadow-md'
                          : 'bg-[#0c2f35] border-emerald-500/60 shadow-md'
                        : isDay
                        ? 'bg-white border-slate-200/90 hover:border-slate-300'
                        : 'bg-[#0a2026] border-[#143b44] hover:border-[#1a4a55]'
                    }`}
                  >
                    {/* Top Bar of Card */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-11 h-11 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                          style={{ backgroundColor: `${slot.color}18`, color: slot.color }}
                        >
                          {slot.icon}
                        </div>

                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[11px] font-black font-mono text-amber-600 dark:text-amber-400">
                              {loc.timeSpan}
                            </span>
                            <span
                              className="text-[10px] font-bold px-2 py-0.5 rounded-md text-white"
                              style={{ backgroundColor: slot.color }}
                            >
                              {loc.categoryLabel}
                            </span>
                            {isLive && (
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-amber-400 text-slate-950">
                                LIVE NOW
                              </span>
                            )}
                          </div>
                          <h3 className={`text-base sm:text-lg font-black ${isDay ? 'text-slate-900' : 'text-white'}`}>
                            {loc.title}
                          </h3>
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedSlotId(slot.id);
                            setActiveTab('wheel');
                            if (soundEnabled) soundHaptics.playTap();
                          }}
                          className={`min-h-[36px] px-3 py-1 rounded-xl border text-[11px] font-bold transition cursor-pointer ${
                            isDay
                              ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                              : 'bg-[#102d34] hover:bg-[#17404a] border-[#1c4d57] text-emerald-300'
                          }`}
                        >
                          {isBn ? 'ঘড়িতে দেখুন' : 'Inspect'}
                        </button>
                        <button
                          type="button"
                          onClick={() => handlePlaySpeech(`${loc.title}. ${loc.summary}`, slot.id)}
                          className={`min-w-[36px] min-h-[36px] p-2 rounded-xl border transition active:scale-95 cursor-pointer flex items-center justify-center ${
                            isPlayingAudio === slot.id
                              ? 'bg-amber-500 text-slate-950 border-amber-400'
                              : isDay
                              ? 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                              : 'bg-[#123138] hover:bg-[#18444e] text-emerald-300 border-[#1c4d57]'
                          }`}
                          title={isPlayingAudio === slot.id ? strings.duas.stopAudio : strings.duas.listenDua}
                        >
                          {isPlayingAudio === slot.id ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Summary */}
                    <p className={`text-xs sm:text-sm leading-relaxed ${isDay ? 'text-slate-600' : 'text-slate-300'}`}>
                      {loc.summary}
                    </p>

                    {/* Action Checklist */}
                    <div className="space-y-1.5 pt-1">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                        {isBn ? toBnDigits(loc.actions.length) : loc.actions.length} {strings.timeline.actionsCount}:
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {loc.actions.map((act, i) => (
                          <div
                            key={i}
                            className={`p-2.5 rounded-xl border flex items-start gap-2 text-xs leading-snug ${
                              isDay
                                ? 'bg-slate-50/80 border-slate-200/80 text-slate-700'
                                : 'bg-[#081a1f] border-[#133740] text-slate-300'
                            }`}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{act}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Hadith Quote */}
                    {loc.hadith && (
                      <div
                        className={`p-3.5 rounded-2xl border text-xs italic ${
                          isDay
                            ? 'bg-amber-50/60 border-amber-200/70 text-amber-900'
                            : 'bg-amber-950/20 border-amber-800/30 text-amber-200'
                        }`}
                      >
                        <span className="font-bold not-italic text-amber-700 dark:text-amber-400 mr-1">
                          {strings.timeline.hadithProof}:
                        </span>
                        "{loc.hadith}"
                        {slot.hadithRef && (
                          <span className="font-semibold not-italic ml-2 opacity-80">
                            ({slot.hadithRef})
                          </span>
                        )}
                      </div>
                    )}

                    {/* Dua Box */}
                    {slot.dua && (
                      <div
                        className={`p-4 rounded-2xl border space-y-2 ${
                          isDay
                            ? 'bg-teal-50/70 border-teal-200 text-teal-950'
                            : 'bg-[#071d22] border-[#153f47] text-teal-100'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-bold text-teal-700 dark:text-teal-300">
                          <span>{strings.timeline.masnunDua}</span>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handlePlaySpeech(slot.dua!.arabic, `dua_time_${slot.id}`, true)}
                              className="p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition cursor-pointer"
                              title={strings.duas.listenDua}
                            >
                              <Volume2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-300" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleCopyText(slot.dua!.arabic, `dua_time_${slot.id}`)}
                              className="p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition cursor-pointer"
                              title={strings.common.copy}
                            >
                              {copiedItemId === `dua_time_${slot.id}` ? (
                                <Check className="w-3.5 h-3.5 text-emerald-500" />
                              ) : (
                                <Copy className="w-3.5 h-3.5 text-teal-600 dark:text-teal-300" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div dir="rtl" className="text-base sm:text-lg font-arabic font-bold text-right leading-[2]">
                          {slot.dua.arabic}
                        </div>
                        <div className="text-[11px] font-medium border-t border-teal-300/40 dark:border-teal-700/40 pt-1.5 opacity-90">
                          {loc.duaTranslation}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. TAB 3: BOOK GUIDELINES (COMPREHENSIVE CHAPTERS + READING PROGRESS) */}
      {activeTab === 'articles' && (
        <div className="space-y-6">
          {/* Header & Search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className={`text-xl sm:text-2xl font-black ${isDay ? 'text-slate-900' : 'text-white'}`}>
                {strings.articles.title}
              </h2>
              <p className={`text-xs sm:text-sm ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                {strings.articles.subtitle}
              </p>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={chapterSearch}
                onChange={(e) => setChapterSearch(e.target.value)}
                placeholder={strings.articles.searchPlaceholder}
                className={`w-full pl-9 pr-4 py-2.5 rounded-2xl text-xs border transition-all ${
                  isDay
                    ? 'bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-amber-500'
                    : 'bg-[#071b20] border-[#153e46] text-white placeholder-slate-500 focus:border-amber-400'
                }`}
              />
            </div>
          </div>

          {/* Book Attribution & Reading Progress */}
          <div
            className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
              isDay ? 'bg-amber-50/70 border-amber-200 text-amber-900' : 'bg-amber-950/20 border-amber-800/40 text-amber-200'
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-semibold">
              <BookMarked className="w-4 h-4 text-amber-500 shrink-0" />
              <span>{strings.common.sourceBook}</span>
            </div>
            <div className="flex items-center gap-2.5 shrink-0">
              <span className="text-xs font-bold font-mono tabular-nums">
                {isBn
                  ? `পঠিত: ${toBnDigits(readChaptersCount)} / ${toBnDigits(NOBI_24_CHAPTERS.length)}`
                  : `Read: ${readChaptersCount} / ${NOBI_24_CHAPTERS.length}`}
              </span>
              <div className="w-24 h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-amber-500 transition-all"
                  style={{ width: `${Math.round((readChaptersCount / Math.max(1, NOBI_24_CHAPTERS.length)) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Chapters Accordion Cards */}
          <div className="space-y-3.5">
            {filteredChapters.map((chapter, idx) => {
              const loc = getLocalizedChapter(chapter, lang);
              const isExpanded = expandedChapterId === chapter.id;
              const isRead = Boolean(readChapters[chapter.id]);

              return (
                <div
                  key={chapter.id}
                  className={`rounded-[26px] border shadow-2xs transition-all overflow-hidden ${
                    isExpanded
                      ? isDay
                        ? 'bg-white border-amber-400 shadow-md'
                        : 'bg-[#0a2026] border-amber-500/50 shadow-md'
                      : isDay
                      ? 'bg-white border-slate-200 hover:border-slate-300'
                      : 'bg-[#0a2026] border-[#143b44] hover:border-[#1a4a55]'
                  }`}
                >
                  {/* Header Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setExpandedChapterId(isExpanded ? null : chapter.id);
                      if (soundEnabled) soundHaptics.playTap();
                    }}
                    className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0 ${
                          isDay ? 'bg-amber-50 text-amber-700' : 'bg-[#153138] text-amber-300'
                        }`}
                      >
                        {chapter.icon}
                      </div>

                      <div className="space-y-0.5 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-700 dark:text-amber-300">
                            {strings.articles.chapterNumber} {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                          </span>
                          <span className="text-[10px] font-semibold opacity-75">
                            3 {strings.articles.readingTime}
                          </span>
                          {isRead && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                              <CheckCircle2 className="w-3 h-3" />
                              {isBn ? 'পঠিত' : 'Read'}
                            </span>
                          )}
                        </div>
                        <h3 className={`text-sm sm:text-base font-black ${isDay ? 'text-slate-900' : 'text-white'}`}>
                          {loc.title}
                        </h3>
                        <p className={`text-xs line-clamp-1 ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                          {loc.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0">
                      <ChevronRight
                        className={`w-5 h-5 transition-transform duration-200 text-slate-400 ${
                          isExpanded ? 'rotate-90 text-amber-500' : ''
                        }`}
                      />
                    </div>
                  </button>

                  {/* Expanded Body */}
                  {isExpanded && (
                    <div className="px-4 sm:px-6 pb-6 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-4">
                      {/* Chapter Action Bar */}
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <button
                          type="button"
                          onClick={() => toggleChapterRead(chapter.id)}
                          className={`min-h-[36px] px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                            isRead
                              ? 'bg-emerald-600 text-white border-emerald-500'
                              : isDay
                              ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                              : 'bg-[#07191e] hover:bg-[#11333c] border-[#1a4b56] text-emerald-300'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>
                            {isRead
                              ? isBn
                                ? 'পঠিত হিসেবে চিহ্নিত'
                                : 'Marked as Read'
                              : isBn
                              ? 'পড়া সম্পন্ন করুন'
                              : 'Mark as Read'}
                          </span>
                        </button>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() =>
                              handlePlaySpeech(`${loc.title}. ${loc.content.join(' ')}`, `chap_${chapter.id}`)
                            }
                            className={`min-h-[36px] px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                              isPlayingAudio === `chap_${chapter.id}`
                                ? 'bg-amber-500 text-slate-950 border-amber-400'
                                : isDay
                                ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                                : 'bg-[#07191e] hover:bg-[#11333c] border-[#1a4b56] text-emerald-300'
                            }`}
                          >
                            {isPlayingAudio === `chap_${chapter.id}` ? (
                              <VolumeX className="w-3.5 h-3.5" />
                            ) : (
                              <Play className="w-3.5 h-3.5" />
                            )}
                            <span>{strings.common.listen}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleCopyText(`${loc.title}\n\n${loc.content.join('\n\n')}`, `chap_copy_${chapter.id}`)
                            }
                            className={`min-h-[36px] px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                              isDay
                                ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                                : 'bg-[#07191e] hover:bg-[#11333c] border-[#1a4b56] text-emerald-300'
                            }`}
                          >
                            {copiedItemId === `chap_copy_${chapter.id}` ? (
                              <Check className="w-3.5 h-3.5 text-emerald-500" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                            <span>{strings.common.copy}</span>
                          </button>
                        </div>
                      </div>

                      {/* Paragraph Content */}
                      <div className="space-y-3 max-w-3xl">
                        {loc.content.map((para, pIdx) => (
                          <p
                            key={pIdx}
                            className={`text-xs sm:text-sm leading-[1.85] ${
                              isDay ? 'text-slate-700' : 'text-slate-200'
                            }`}
                          >
                            {para}
                          </p>
                        ))}
                      </div>

                      {/* Hadiths In Chapter */}
                      {loc.hadithList && loc.hadithList.length > 0 && (
                        <div className="space-y-2 pt-2">
                          {loc.hadithList.map((h, hIdx) => (
                            <div
                              key={hIdx}
                              className={`p-3.5 rounded-2xl border text-xs italic ${
                                isDay
                                  ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                                  : 'bg-amber-950/20 border-amber-800/40 text-amber-200'
                              }`}
                            >
                              <div className="font-bold not-italic text-amber-700 dark:text-amber-400 mb-1 flex items-center gap-1.5">
                                <BookMarked className="w-3.5 h-3.5" />
                                <span>{strings.articles.hadithRef}</span>
                              </div>
                              <p className="font-serif">"{h.text}"</p>
                              <div className="text-[11px] font-semibold text-right not-italic opacity-80 mt-1">
                                — {h.reference}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Quran Ayat In Chapter */}
                      {chapter.quranAyat && (
                        <div
                          className={`p-4 rounded-2xl border space-y-2 ${
                            isDay
                              ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                              : 'bg-emerald-950/20 border-emerald-800/40 text-emerald-200'
                          }`}
                        >
                          <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                            {strings.articles.quranRef} ({chapter.quranAyat.surah})
                          </div>
                          <div dir="rtl" className="text-lg sm:text-xl font-arabic font-bold text-right leading-[2.1]">
                            {chapter.quranAyat.arabic}
                          </div>
                          <div className="text-xs font-medium border-t border-emerald-200/50 dark:border-emerald-800/50 pt-2 opacity-90">
                            {loc.quranTranslation}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 6. TAB 4: ESSENTIAL MASNUN DUAS */}
      {activeTab === 'duas' && (
        <div className="space-y-5">
          {/* Header & Search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className={`text-xl sm:text-2xl font-black ${isDay ? 'text-slate-900' : 'text-white'}`}>
                {strings.duas.title}
              </h2>
              <p className={`text-xs sm:text-sm ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                {strings.duas.subtitle}
              </p>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={duaSearch}
                onChange={(e) => setDuaSearch(e.target.value)}
                placeholder={strings.duas.searchPlaceholder}
                className={`w-full pl-9 pr-4 py-2.5 rounded-2xl text-xs border transition-all ${
                  isDay
                    ? 'bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-rose-500'
                    : 'bg-[#071b20] border-[#153e46] text-white placeholder-slate-500 focus:border-rose-400'
                }`}
              />
            </div>
          </div>

          {/* Timing Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'all' as const, label: isBn ? 'সকল দোয়া' : 'All Duas' },
              { id: 'sleep_wake' as const, label: isBn ? 'ঘুম ও জাগরণ' : 'Sleep & Wake' },
              { id: 'home_mosque' as const, label: isBn ? 'ঘর ও পবিত্রতা' : 'Home & Purity' },
              { id: 'food' as const, label: isBn ? 'আহার ও পানীয়' : 'Food & Drink' },
              { id: 'zikr' as const, label: isBn ? 'সকাল-সন্ধ্যা ও জিকির' : 'Morning & Protection' },
            ].map((chip) => (
              <button
                key={chip.id}
                type="button"
                onClick={() => setDuaCategory(chip.id)}
                className={`min-h-[38px] px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border transition cursor-pointer shrink-0 ${
                  duaCategory === chip.id
                    ? 'bg-rose-600 text-white border-rose-500 shadow-sm'
                    : isDay
                    ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    : 'bg-[#092226] border-[#153e46] text-slate-300'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Duas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDuas.map((dua) => {
              const loc = getLocalizedDua(dua, lang);
              const isPlaying = isPlayingAudio === dua.id;
              const isCopied = copiedItemId === dua.id;

              return (
                <div
                  key={dua.id}
                  className={`p-5 rounded-[26px] border shadow-2xs space-y-3.5 flex flex-col justify-between transition-all ${
                    isDay
                      ? 'bg-white border-slate-200/90 hover:border-rose-300'
                      : 'bg-[#0a2026] border-[#143b44] hover:border-rose-500/40'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                          {loc.timing}
                        </span>
                        <h3 className={`text-base font-black ${isDay ? 'text-slate-900' : 'text-white'}`}>
                          {loc.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => handlePlaySpeech(dua.arabic, dua.id, true)}
                          className={`min-w-[38px] min-h-[38px] p-2 rounded-xl border transition active:scale-95 cursor-pointer flex items-center justify-center ${
                            isPlaying
                              ? 'bg-rose-500 text-white border-rose-400'
                              : isDay
                              ? 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                              : 'bg-[#123138] hover:bg-[#18444e] text-rose-300 border-[#1c4d57]'
                          }`}
                          title={isPlaying ? strings.duas.stopAudio : strings.duas.listenDua}
                        >
                          {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleCopyText(`${dua.arabic}\n${loc.pronunciation}\n${loc.meaning}`, dua.id)}
                          className={`min-w-[38px] min-h-[38px] p-2 rounded-xl border transition active:scale-95 cursor-pointer flex items-center justify-center ${
                            isCopied
                              ? 'bg-emerald-600 text-white border-emerald-500'
                              : isDay
                              ? 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                              : 'bg-[#123138] hover:bg-[#18444e] text-emerald-300 border-[#1c4d57]'
                          }`}
                          title={strings.duas.copyDua}
                        >
                          {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Arabic Text */}
                    <div
                      dir="rtl"
                      className={`p-4 rounded-2xl border text-right font-arabic font-bold text-lg sm:text-xl leading-[2.1] ${
                        isDay
                          ? 'bg-slate-50 border-slate-200 text-slate-900'
                          : 'bg-[#07181c] border-[#133740] text-emerald-100'
                      }`}
                    >
                      {dua.arabic}
                    </div>

                    <p className="text-xs italic opacity-85 leading-relaxed">
                      {loc.pronunciation}
                    </p>

                    <p className={`text-xs sm:text-sm font-medium leading-relaxed ${isDay ? 'text-slate-700' : 'text-slate-200'}`}>
                      {loc.meaning}
                    </p>
                  </div>

                  {/* Benefit & Reference Footer */}
                  <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 space-y-1 text-[11px]">
                    <div className="text-amber-700 dark:text-amber-400 font-medium">
                      {loc.benefit}
                    </div>
                    <div className="text-right opacity-70 font-semibold">
                      — {dua.reference}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 7. TAB 5: DAILY SUNNAH TRACKER + 7-DAY CONSISTENCY */}
      {activeTab === 'tracker' && (
        <div className="space-y-6">
          {/* Header & Overview Card */}
          <div
            className={`p-6 sm:p-7 rounded-[28px] border shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 ${
              isDay
                ? 'bg-gradient-to-br from-[#f3faf7] via-white to-[#eef7f3] border-emerald-200'
                : 'bg-gradient-to-br from-[#082025] via-[#0c2a30] to-[#06171b] border-[#15414b]'
            }`}
          >
            <div className="space-y-3 text-center md:text-left flex-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#006A4E] dark:text-emerald-400">
                <Flame className="w-4 h-4 text-amber-500" />
                <span>{strings.tracker.title}</span>
              </div>
              <h2 className={`text-xl sm:text-2xl font-black ${isDay ? 'text-slate-900' : 'text-white'}`}>
                {strings.tracker.progressLabel}: {isBn ? toBnDigits(checklistProgressPercent) : checklistProgressPercent}%
              </h2>
              <p className={`text-xs sm:text-sm max-w-xl ${isDay ? 'text-slate-600' : 'text-slate-300'}`}>
                {checklistProgressPercent >= 80
                  ? strings.tracker.excellentPraise
                  : checklistProgressPercent >= 40
                  ? strings.tracker.goodPraise
                  : strings.tracker.startPraise}
              </p>

              {/* 7-Day Consistency Bar */}
              <div className="pt-2">
                <div className={`text-[11px] font-bold mb-2 ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                  {isBn ? 'গত ৭ দিনের সুন্নাহ ধারাবাহিকতা' : 'Last 7 Days Consistency'}
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2.5">
                  {last7DaysStats.map((d, i) => {
                    const pct = Math.round((d.count / Math.max(1, d.total)) * 100);
                    return (
                      <div key={i} className="flex flex-col items-center gap-1">
                        <div
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl border flex items-center justify-center text-[10px] font-mono font-black tabular-nums ${
                            pct >= 70
                              ? 'bg-[#006A4E] text-white border-emerald-500'
                              : pct > 0
                              ? 'bg-emerald-500/20 text-[#006A4E] dark:text-emerald-300 border-emerald-400/50'
                              : isDay
                              ? 'bg-white border-slate-200 text-slate-400'
                              : 'bg-[#07181d] border-[#153e46] text-slate-500'
                          } ${d.isToday ? 'ring-2 ring-amber-400/70' : ''}`}
                          title={`${d.label}: ${d.count}/${d.total}`}
                        >
                          {isBn ? toBnDigits(d.count) : d.count}
                        </div>
                        <span className={`text-[10px] font-semibold ${d.isToday ? 'text-amber-600 dark:text-amber-400 font-bold' : 'opacity-70'}`}>
                          {d.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Circular Progress Meter */}
            <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="52"
                  fill="none"
                  stroke={isDay ? '#e2e8f0' : '#143840'}
                  strokeWidth="10"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="52"
                  fill="none"
                  stroke="#006A4E"
                  strokeWidth="10"
                  strokeDasharray={`${(checklistProgressPercent / 100) * (2 * Math.PI * 52)} ${2 * Math.PI * 52}`}
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-2xl font-black font-mono tabular-nums ${isDay ? 'text-slate-900' : 'text-white'}`}>
                  {isBn ? `${toBnDigits(checklistProgressPercent)}%` : `${checklistProgressPercent}%`}
                </span>
                <span className="text-[11px] font-bold font-mono tabular-nums text-[#006A4E] dark:text-emerald-400">
                  {isBn
                    ? `${toBnDigits(completedChecklistCount)}/${toBnDigits(NOBI_DAILY_CHECKLIST.length)}`
                    : `${completedChecklistCount}/${NOBI_DAILY_CHECKLIST.length}`}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="text-xs font-bold text-slate-500 font-mono tabular-nums">
              {completedChecklistCount} / {NOBI_DAILY_CHECKLIST.length} {strings.tracker.completed}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleMarkAllChecklist(true)}
                className={`min-h-[38px] px-3.5 py-1.5 rounded-xl text-xs font-bold transition active:scale-95 cursor-pointer border ${
                  isDay
                    ? 'bg-emerald-50 hover:bg-emerald-100 text-[#006A4E] border-emerald-200'
                    : 'bg-[#10343c] hover:bg-[#16424c] text-emerald-200 border-[#1c4f5a]'
                }`}
              >
                {strings.tracker.markAll}
              </button>
              <button
                type="button"
                onClick={() => handleMarkAllChecklist(false)}
                className={`min-h-[38px] px-3.5 py-1.5 rounded-xl text-xs font-bold transition active:scale-95 cursor-pointer border flex items-center gap-1 ${
                  isDay
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                    : 'bg-[#091a1e] hover:bg-[#102a30] text-slate-400 border-[#14343c]'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{strings.tracker.reset}</span>
              </button>
            </div>
          </div>

          {/* Checklist Items */}
          <div className="space-y-3">
            {NOBI_DAILY_CHECKLIST.map((item, idx) => {
              const loc = getLocalizedCheckItem(item, lang);
              const isChecked = Boolean(trackedItems[item.id]);

              return (
                <div
                  key={item.id}
                  onClick={() => toggleCheckItem(item.id)}
                  className={`p-4 sm:p-5 rounded-2xl border shadow-2xs cursor-pointer transition-all flex items-center justify-between gap-4 select-none ${
                    isChecked
                      ? isDay
                        ? 'bg-[#f4faf7] border-emerald-300'
                        : 'bg-[#0b2b31] border-emerald-500/40'
                      : isDay
                      ? 'bg-white border-slate-200 hover:border-slate-300'
                      : 'bg-[#0a2026] border-[#143b44] hover:border-[#1a4a55]'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
                        isChecked
                          ? 'bg-[#006A4E] text-white border-emerald-500 shadow-sm'
                          : isDay
                          ? 'bg-slate-100 border-slate-300 text-transparent'
                          : 'bg-[#06181d] border-[#19454f] text-transparent'
                      }`}
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-[10px] font-black uppercase text-amber-600 dark:text-amber-400 block">
                        {loc.timeSpan}
                      </span>
                      <h3
                        className={`text-sm sm:text-base font-bold transition-colors ${
                          isChecked
                            ? 'line-through opacity-70'
                            : isDay
                            ? 'text-slate-900'
                            : 'text-white'
                        }`}
                      >
                        {loc.title}
                      </h3>
                      <p
                        className={`text-xs ${
                          isChecked
                            ? 'line-through opacity-50'
                            : isDay
                            ? 'text-slate-500'
                            : 'text-slate-400'
                        }`}
                      >
                        {loc.sunnahPoint}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold text-slate-400 shrink-0 tabular-nums">
                    #{isBn ? toBnDigits(idx + 1) : idx + 1}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

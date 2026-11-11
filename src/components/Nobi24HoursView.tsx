import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Clock,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Share2,
  Copy,
  Check,
  Search,
  Heart,
  Sun,
  Moon,
  Sunrise,
  Sunset,
  Volume2,
  VolumeX,
  Compass,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Layers,
  Award,
  BookMarked,
  RotateCcw,
  ExternalLink,
  Flame,
  Info,
  CheckCheck,
} from 'lucide-react';
import { ThemeMode, ZikrLanguage } from '../types';
import { soundHaptics } from '../utils/audioHaptics';
import {
  NOBI_24_TIME_SLOTS,
  NOBI_24_CHAPTERS,
  NOBI_24_DUAS,
  NOBI_DAILY_CHECKLIST,
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

export const Nobi24HoursView: React.FC<Nobi24HoursViewProps> = ({
  themeMode = 'night',
  selectedLanguage = 'bn',
  soundEnabled = true,
  onBackToHub,
}) => {
  const isDay = themeMode === 'day';
  const lang = selectedLanguage || 'bn';
  const strings = NOBI_24_UI_I18N[lang] || NOBI_24_UI_I18N.en;

  // Sub-tabs: 'wheel' | 'timeline' | 'articles' | 'duas' | 'tracker'
  const [activeTab, setActiveTab] = useState<'wheel' | 'timeline' | 'articles' | 'duas' | 'tracker'>('wheel');

  // Currently selected slot in Wheel view
  const [selectedSlotId, setSelectedSlotId] = useState<string>('subh_sadiq_fajr');

  // Filter in Timeline view
  const [timelineFilter, setTimelineFilter] = useState<'all' | 'dawn' | 'midday' | 'night'>('all');

  // Search queries
  const [chapterSearch, setChapterSearch] = useState<string>('');
  const [duaSearch, setDuaSearch] = useState<string>('');

  // Expanded chapter IDs
  const [expandedChapterId, setExpandedChapterId] = useState<string | null>('ch1_barakah_life');

  // Copy feedback state
  const [copiedItemId, setCopiedItemId] = useState<string | null>(null);

  // Audio speech synthesis state
  const [isPlayingAudio, setIsPlayingAudio] = useState<string | null>(null);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Stop any active speech on unmount
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

  // Live hour detection to find what the Prophet ﷺ was doing right now
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

  // Determine current active slot based on live hour
  const currentLiveSlot = useMemo(() => {
    return (
      NOBI_24_TIME_SLOTS.find((s) => {
        if (s.startHour < s.endHour) {
          return currentHourVal >= s.startHour && currentHourVal < s.endHour;
        } else {
          // Crosses midnight
          return currentHourVal >= s.startHour || currentHourVal < s.endHour;
        }
      }) || NOBI_24_TIME_SLOTS[0]
    );
  }, [currentHourVal]);

  const activeSlot = useMemo(() => {
    return NOBI_24_TIME_SLOTS.find((s) => s.id === selectedSlotId) || currentLiveSlot;
  }, [selectedSlotId, currentLiveSlot]);

  // Audio reader function using Web Speech API
  const handlePlaySpeech = (text: string, id: string, isArabic = false) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert(strings.common.audioNotSupported);
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
      setTimeout(() => setCopiedItemId(null), 2000);
    }
  };

  const completedChecklistCount = Object.values(trackedItems).filter(Boolean).length;
  const checklistProgressPercent = Math.round((completedChecklistCount / NOBI_DAILY_CHECKLIST.length) * 100);

  // Filtered timeline slots
  const filteredTimelineSlots = useMemo(() => {
    return NOBI_24_TIME_SLOTS.filter((slot) => {
      if (timelineFilter === 'dawn') return slot.startHour >= 3 && slot.startHour < 10;
      if (timelineFilter === 'midday') return slot.startHour >= 10 && slot.startHour < 17;
      if (timelineFilter === 'night') return slot.startHour >= 17 || slot.startHour < 3;
      return true;
    });
  }, [timelineFilter]);

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

  // Filtered Duas
  const filteredDuas = useMemo(() => {
    if (!duaSearch.trim()) return NOBI_24_DUAS;
    const q = duaSearch.toLowerCase();
    return NOBI_24_DUAS.filter(
      (d) =>
        d.titleBn.toLowerCase().includes(q) ||
        d.titleEn.toLowerCase().includes(q) ||
        d.meaningBn.toLowerCase().includes(q) ||
        d.meaningEn.toLowerCase().includes(q) ||
        d.arabic.includes(q)
    );
  }, [duaSearch]);

  // Live localized slot representation
  const locLiveSlot = getLocalizedSlot(currentLiveSlot, lang);
  const locActiveSlot = getLocalizedSlot(activeSlot, lang);

  // Time formatter
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
      {/* 1. TOP HEADER & HERO BANNER */}
      <div
        className={`relative overflow-hidden rounded-[32px] p-6 sm:p-8 border shadow-xl transition-all duration-300 ${
          isDay
            ? 'bg-gradient-to-br from-emerald-800 via-teal-800 to-emerald-950 text-white border-emerald-700/50'
            : 'bg-gradient-to-br from-[#061d21] via-[#0b2f36] to-[#041518] text-white border-[#12424b]'
        }`}
      >
        {/* Subtle decorative islamic geometry circles */}
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              {onBackToHub && (
                <button
                  onClick={onBackToHub}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-white/10 hover:bg-white/20 border border-white/20 text-emerald-100 transition active:scale-95 cursor-pointer backdrop-blur-md"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>{strings.backToHub}</span>
                </button>
              )}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 border border-amber-300/40 text-amber-200 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{strings.arabicTitle}</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight drop-shadow-sm">
              {strings.title}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-2xl leading-relaxed">
              {strings.subtitle}
            </p>
          </div>

          {/* Live Clock & Right Now Pill */}
          <div
            className={`shrink-0 p-4 sm:p-5 rounded-2xl border backdrop-blur-md flex flex-col items-center justify-center text-center space-y-1.5 ${
              isDay ? 'bg-white/10 border-white/20 text-white' : 'bg-black/30 border-white/10 text-emerald-200'
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>{strings.liveBanner.nowInRoutine}</span>
            </div>
            <div className="text-xl sm:text-2xl font-black font-mono tracking-wider text-white">
              {formattedLiveClock}
            </div>
            <div className="text-xs font-bold text-amber-300 max-w-[200px] truncate">
              {locLiveSlot.title}
            </div>
          </div>
        </div>

        {/* Live Slot Action Banner */}
        <div
          onClick={() => {
            setSelectedSlotId(currentLiveSlot.id);
            setActiveTab('wheel');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`mt-6 p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
            isDay
              ? 'bg-emerald-900/40 hover:bg-emerald-900/60 border-emerald-500/40'
              : 'bg-emerald-950/50 hover:bg-emerald-950/80 border-emerald-500/30'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl shrink-0 p-2 rounded-xl bg-white/10 backdrop-blur-sm">
              {currentLiveSlot.icon}
            </span>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                  {locLiveSlot.timeSpan}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/30 border border-emerald-400/40 font-semibold text-emerald-200">
                  {locLiveSlot.categoryLabel}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                {locLiveSlot.summary}
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 text-slate-950 text-xs font-black shadow-md hover:bg-amber-300 transition">
            <span>{strings.liveBanner.viewDetails}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* 2. NAVIGATION SUB-TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => {
            setActiveTab('wheel');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition active:scale-95 cursor-pointer shrink-0 border ${
            activeTab === 'wheel'
              ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-900/30'
              : isDay
              ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
              : 'bg-[#092226] hover:bg-[#123840] border-[#153e46] text-emerald-300'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>{strings.tabs.wheel}</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('timeline');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition active:scale-95 cursor-pointer shrink-0 border ${
            activeTab === 'timeline'
              ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-900/30'
              : isDay
              ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
              : 'bg-[#092226] hover:bg-[#123840] border-[#153e46] text-emerald-300'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>{strings.tabs.timeline}</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('articles');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition active:scale-95 cursor-pointer shrink-0 border ${
            activeTab === 'articles'
              ? 'bg-amber-600 text-white border-amber-500 shadow-lg shadow-amber-900/30'
              : isDay
              ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
              : 'bg-[#092226] hover:bg-[#123840] border-[#153e46] text-emerald-300'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>{strings.tabs.articles}</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-400 text-slate-950 font-black">
            12
          </span>
        </button>

        <button
          onClick={() => {
            setActiveTab('duas');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition active:scale-95 cursor-pointer shrink-0 border ${
            activeTab === 'duas'
              ? 'bg-rose-600 text-white border-rose-500 shadow-lg shadow-rose-900/30'
              : isDay
              ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
              : 'bg-[#092226] hover:bg-[#123840] border-[#153e46] text-emerald-300'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>{strings.tabs.duas}</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-rose-400 text-white font-black">
            12
          </span>
        </button>

        <button
          onClick={() => {
            setActiveTab('tracker');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition active:scale-95 cursor-pointer shrink-0 border ${
            activeTab === 'tracker'
              ? 'bg-teal-600 text-white border-teal-500 shadow-lg shadow-teal-900/30'
              : isDay
              ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
              : 'bg-[#092226] hover:bg-[#123840] border-[#153e46] text-emerald-300'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{strings.tabs.tracker}</span>
          {completedChecklistCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-400 text-slate-950 font-black">
              {completedChecklistCount}/{NOBI_DAILY_CHECKLIST.length}
            </span>
          )}
        </button>
      </div>

      {/* 3. TAB 1: 24-HOUR SUNNAH WHEEL */}
      {activeTab === 'wheel' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Wheel Dial Column */}
          <div
            className={`lg:col-span-6 p-6 sm:p-8 rounded-[32px] border shadow-md flex flex-col items-center justify-between text-center transition-colors ${
              isDay ? 'bg-white border-slate-200/90' : 'bg-[#0a2026] border-[#153c45]'
            }`}
          >
            <div className="space-y-1 mb-4">
              <h2 className={`text-lg sm:text-xl font-black ${isDay ? 'text-slate-900' : 'text-white'}`}>
                {strings.wheel.title}
              </h2>
              <p className={`text-xs ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                {strings.wheel.subtitle}
              </p>
            </div>

            {/* Circular SVG 24-Hour Wheel */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 my-2 flex items-center justify-center">
              <svg viewBox="0 0 400 400" className="w-full h-full transform -rotate-90">
                {/* Background Outer Ring */}
                <circle
                  cx="200"
                  cy="200"
                  r="170"
                  fill="none"
                  stroke={isDay ? '#e2e8f0' : '#143840'}
                  strokeWidth="28"
                />

                {/* Draw 14 Slices for 14 slots */}
                {NOBI_24_TIME_SLOTS.map((slot) => {
                  const totalHoursInSlot =
                    slot.endHour >= slot.startHour
                      ? slot.endHour - slot.startHour
                      : 24 - slot.startHour + slot.endHour;

                  const startAngle = (slot.startHour / 24) * 360;
                  const sliceAngle = (totalHoursInSlot / 24) * 360;
                  const isSelected = slot.id === selectedSlotId;
                  const isLive = slot.id === currentLiveSlot.id;

                  // SVG path for annular sector
                  const radius = 170;
                  const strokeW = isSelected ? 34 : 26;
                  const circumference = 2 * Math.PI * radius;
                  const strokeDasharray = `${(sliceAngle / 360) * circumference} ${circumference}`;
                  const strokeDashoffset = -((startAngle / 360) * circumference);

                  return (
                    <circle
                      key={slot.id}
                      cx="200"
                      cy="200"
                      r={radius}
                      fill="none"
                      stroke={slot.color}
                      strokeWidth={strokeW}
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                      opacity={isSelected ? 1 : isLive ? 0.9 : 0.65}
                      className="cursor-pointer transition-all duration-300 hover:opacity-100"
                      onClick={() => {
                        setSelectedSlotId(slot.id);
                        if (soundEnabled) soundHaptics.playTap();
                      }}
                    />
                  );
                })}

                {/* Hand pointing to Current Live Hour */}
                {(() => {
                  const angleRad = ((currentHourVal / 24) * 360 * Math.PI) / 180;
                  const handX = 200 + 130 * Math.cos(angleRad);
                  const handY = 200 + 130 * Math.sin(angleRad);
                  return (
                    <g>
                      <line
                        x1="200"
                        y1="200"
                        x2={handX}
                        y2={handY}
                        stroke="#f59e0b"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                      <circle cx={handX} cy={handY} r="6" fill="#f59e0b" />
                    </g>
                  );
                })()}

                {/* Center Hub */}
                <circle cx="200" cy="200" r="115" fill={isDay ? '#ffffff' : '#07181c'} />
                <circle
                  cx="200"
                  cy="200"
                  r="115"
                  fill="none"
                  stroke={isDay ? '#e2e8f0' : '#143840'}
                  strokeWidth="2"
                />
              </svg>

              {/* Center Content Inside Wheel */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 pointer-events-none text-center">
                <span className="text-3xl mb-1">{activeSlot.icon}</span>
                <span className="text-xs font-black text-amber-500 uppercase tracking-wider">
                  {locActiveSlot.timeSpan}
                </span>
                <h3
                  className={`text-sm sm:text-base font-black line-clamp-2 mt-0.5 ${
                    isDay ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {locActiveSlot.title}
                </h3>
                <span
                  className="mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white shadow-2xs"
                  style={{ backgroundColor: activeSlot.color }}
                >
                  {locActiveSlot.categoryLabel}
                </span>
              </div>
            </div>

            {/* Category Legend */}
            <div className="flex items-center justify-center gap-3 flex-wrap mt-3 text-[11px] font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0d9488]" />
                <span className={isDay ? 'text-slate-600' : 'text-slate-300'}>
                  {strings.categories.spiritual}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7]" />
                <span className={isDay ? 'text-slate-600' : 'text-slate-300'}>
                  {strings.categories.social}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ea580c]" />
                <span className={isDay ? 'text-slate-600' : 'text-slate-300'}>
                  {strings.categories.physical}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8b5cf6]" />
                <span className={isDay ? 'text-slate-600' : 'text-slate-300'}>
                  {strings.categories.family}
                </span>
              </div>
            </div>
          </div>

          {/* Active Slot Detailed Inspection Column */}
          <div
            className={`lg:col-span-6 p-6 sm:p-7 rounded-[32px] border shadow-md space-y-5 transition-colors ${
              isDay ? 'bg-white border-slate-200/90' : 'bg-[#0a2026] border-[#153c45]'
            }`}
          >
            {/* Header with Title and Speech Audio button */}
            <div className="flex items-start justify-between gap-4 pb-3 border-b border-slate-200/50 dark:border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{activeSlot.icon}</span>
                  <span
                    className="px-2.5 py-0.5 rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: activeSlot.color }}
                  >
                    {locActiveSlot.categoryLabel}
                  </span>
                  {activeSlot.id === currentLiveSlot.id && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-slate-950 animate-pulse">
                      LIVE
                    </span>
                  )}
                </div>
                <h3 className={`text-xl sm:text-2xl font-black ${isDay ? 'text-slate-900' : 'text-white'}`}>
                  {locActiveSlot.title}
                </h3>
                <p className="text-xs font-bold text-amber-500">
                  {locActiveSlot.timeSpan}
                </p>
              </div>

              <button
                onClick={() => handlePlaySpeech(`${locActiveSlot.title}. ${locActiveSlot.summary}`, activeSlot.id)}
                className={`p-2.5 rounded-2xl border transition active:scale-95 cursor-pointer shrink-0 ${
                  isPlayingAudio === activeSlot.id
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md animate-pulse'
                    : isDay
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                    : 'bg-[#123138] hover:bg-[#18444e] text-emerald-300 border-[#1c4d57]'
                }`}
                title={isPlayingAudio === activeSlot.id ? strings.duas.stopAudio : strings.duas.listenDua}
              >
                {isPlayingAudio === activeSlot.id ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Summary */}
            <div
              className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed font-medium ${
                isDay
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                  : 'bg-emerald-950/30 border-emerald-800/40 text-emerald-200'
              }`}
            >
              {locActiveSlot.summary}
            </div>

            {/* Action Points */}
            <div className="space-y-2">
              <h4 className={`text-xs font-black uppercase tracking-wider ${isDay ? 'text-slate-700' : 'text-slate-300'}`}>
                {strings.wheel.sunnahActions}
              </h4>
              <div className="space-y-2">
                {locActiveSlot.actions.map((act, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className={isDay ? 'text-slate-700' : 'text-slate-300'}>{act}</span>
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
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400">
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
                    ? 'bg-teal-50/80 border-teal-200 text-teal-950'
                    : 'bg-[#0e2c33] border-[#184954] text-teal-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-teal-700 dark:text-teal-300">
                    {strings.wheel.duaOfSlot}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handlePlaySpeech(activeSlot.dua!.arabic, `dua_${activeSlot.id}`, true)}
                      className="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition cursor-pointer"
                      title={strings.duas.listenDua}
                    >
                      <Volume2 className="w-4 h-4 text-teal-600 dark:text-teal-300" />
                    </button>
                    <button
                      onClick={() => handleCopyText(activeSlot.dua!.arabic, `dua_${activeSlot.id}`)}
                      className="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition cursor-pointer"
                      title={strings.common.copy}
                    >
                      {copiedItemId === `dua_${activeSlot.id}` ? (
                        <Check className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Copy className="w-4 h-4 text-teal-600 dark:text-teal-300" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="text-base sm:text-lg font-arabic font-bold text-right leading-loose tracking-wide">
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
      )}

      {/* 4. TAB 2: TIMELINE ROUTINE (14 SEQUENTIAL STEPS) */}
      {activeTab === 'timeline' && (
        <div className="space-y-6">
          {/* Header & Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className={`text-xl sm:text-2xl font-black ${isDay ? 'text-slate-900' : 'text-white'}`}>
                {strings.timeline.title}
              </h2>
              <p className={`text-xs sm:text-sm ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                {strings.timeline.subtitle}
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <button
                onClick={() => setTimelineFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition active:scale-95 cursor-pointer shrink-0 border ${
                  timelineFilter === 'all'
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                    : isDay
                    ? 'bg-slate-100 border-slate-200 text-slate-700'
                    : 'bg-[#092226] border-[#153e46] text-emerald-300'
                }`}
              >
                {strings.filters.all}
              </button>
              <button
                onClick={() => setTimelineFilter('dawn')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition active:scale-95 cursor-pointer shrink-0 border ${
                  timelineFilter === 'dawn'
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                    : isDay
                    ? 'bg-slate-100 border-slate-200 text-slate-700'
                    : 'bg-[#092226] border-[#153e46] text-emerald-300'
                }`}
              >
                {strings.filters.dawnMorning}
              </button>
              <button
                onClick={() => setTimelineFilter('midday')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition active:scale-95 cursor-pointer shrink-0 border ${
                  timelineFilter === 'midday'
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                    : isDay
                    ? 'bg-slate-100 border-slate-200 text-slate-700'
                    : 'bg-[#092226] border-[#153e46] text-emerald-300'
                }`}
              >
                {strings.filters.middayAfternoon}
              </button>
              <button
                onClick={() => setTimelineFilter('night')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition active:scale-95 cursor-pointer shrink-0 border ${
                  timelineFilter === 'night'
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                    : isDay
                    ? 'bg-slate-100 border-slate-200 text-slate-700'
                    : 'bg-[#092226] border-[#153e46] text-emerald-300'
                }`}
              >
                {strings.filters.eveningNight}
              </button>
            </div>
          </div>

          {/* Sequential 14 Timeline Cards */}
          <div className="space-y-4">
            {filteredTimelineSlots.map((slot, index) => {
              const loc = getLocalizedSlot(slot, lang);
              const isLive = slot.id === currentLiveSlot.id;

              return (
                <div
                  key={slot.id}
                  className={`p-5 sm:p-6 rounded-[28px] border shadow-sm transition-all duration-200 space-y-4 ${
                    isLive
                      ? isDay
                        ? 'bg-emerald-50/90 border-emerald-400 shadow-emerald-500/10'
                        : 'bg-[#0c2f35] border-emerald-500/50 shadow-emerald-950/50'
                      : isDay
                      ? 'bg-white border-slate-200/90 hover:border-slate-300'
                      : 'bg-[#0a2026] border-[#143b44] hover:border-[#1a4a55]'
                  }`}
                >
                  {/* Top Bar of Card */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-2xs"
                        style={{ backgroundColor: `${slot.color}20`, color: slot.color }}
                      >
                        {slot.icon}
                      </div>

                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-black/10 dark:bg-white/10">
                            {strings.timeline.step} {index + 1}
                          </span>
                          <span
                            className="text-[10px] font-bold px-2.5 py-0.5 rounded-full text-white"
                            style={{ backgroundColor: slot.color }}
                          >
                            {loc.categoryLabel}
                          </span>
                          {isLive && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-slate-950 animate-pulse">
                              LIVE NOW
                            </span>
                          )}
                        </div>
                        <h3 className={`text-base sm:text-lg font-black ${isDay ? 'text-slate-900' : 'text-white'}`}>
                          {loc.title}
                        </h3>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      <span className="text-xs font-bold text-amber-500 font-mono">
                        {loc.timeSpan}
                      </span>
                      <button
                        onClick={() => handlePlaySpeech(`${loc.title}. ${loc.summary}`, slot.id)}
                        className={`p-2 rounded-xl border transition active:scale-95 cursor-pointer ${
                          isPlayingAudio === slot.id
                            ? 'bg-amber-500 text-slate-950 border-amber-400'
                            : isDay
                            ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                            : 'bg-[#123138] hover:bg-[#18444e] text-emerald-300 border-[#1c4d57]'
                        }`}
                        title={isPlayingAudio === slot.id ? strings.duas.stopAudio : strings.duas.listenDua}
                      >
                        {isPlayingAudio === slot.id ? (
                          <VolumeX className="w-4 h-4" />
                        ) : (
                          <Volume2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className={`text-xs sm:text-sm leading-relaxed ${isDay ? 'text-slate-600' : 'text-slate-300'}`}>
                    {loc.summary}
                  </p>

                  {/* Action Checklist */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      {loc.actions.length} {strings.timeline.actionsCount}:
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {loc.actions.map((act, i) => (
                        <div
                          key={i}
                          className={`p-2.5 rounded-xl border flex items-start gap-2 text-xs leading-snug ${
                            isDay
                              ? 'bg-slate-50 border-slate-200/80 text-slate-700'
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
                            onClick={() => handlePlaySpeech(slot.dua!.arabic, `dua_time_${slot.id}`, true)}
                            className="p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition cursor-pointer"
                            title={strings.duas.listenDua}
                          >
                            <Volume2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-300" />
                          </button>
                          <button
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

                      <div className="text-base sm:text-lg font-arabic font-bold text-right leading-relaxed">
                        {slot.dua.arabic}
                      </div>
                      <div className="text-[11px] font-medium border-t border-teal-300/40 dark:border-teal-700/40 pt-1.5 opacity-90">
                        {loc.duaTranslation}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. TAB 3: BOOK GUIDELINES (12 COMPREHENSIVE CHAPTERS) */}
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

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={chapterSearch}
                onChange={(e) => setChapterSearch(e.target.value)}
                placeholder={strings.articles.searchPlaceholder}
                className={`w-full pl-9 pr-4 py-2 rounded-2xl text-xs border transition-all ${
                  isDay
                    ? 'bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-amber-500'
                    : 'bg-[#071b20] border-[#153e46] text-white placeholder-slate-500 focus:border-amber-400'
                }`}
              />
            </div>
          </div>

          {/* Book Attribution Banner */}
          <div
            className={`p-3.5 rounded-2xl border text-xs font-semibold flex items-center gap-2 ${
              isDay ? 'bg-amber-50/70 border-amber-200 text-amber-900' : 'bg-amber-950/20 border-amber-800/40 text-amber-200'
            }`}
          >
            <BookMarked className="w-4 h-4 text-amber-500 shrink-0" />
            <span>{strings.common.sourceBook}</span>
          </div>

          {/* Chapters Accordion Cards */}
          <div className="space-y-3.5">
            {filteredChapters.map((chapter, idx) => {
              const loc = getLocalizedChapter(chapter, lang);
              const isExpanded = expandedChapterId === chapter.id;

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
                    onClick={() => {
                      setExpandedChapterId(isExpanded ? null : chapter.id);
                      if (soundEnabled) soundHaptics.playTap();
                    }}
                    className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0 ${
                          isDay ? 'bg-amber-50 text-amber-700' : 'bg-[#153138] text-amber-300'
                        }`}
                      >
                        {chapter.icon}
                      </div>

                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-600 dark:text-amber-400">
                            {strings.articles.chapterNumber} {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                          </span>
                          <span className="text-[10px] font-semibold opacity-75">
                            3 {strings.articles.readingTime}
                          </span>
                        </div>
                        <h3 className={`text-sm sm:text-base font-black ${isDay ? 'text-slate-900' : 'text-white'}`}>
                          {loc.title}
                        </h3>
                        <p className={`text-xs ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
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
                    <div className="px-4 sm:px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800 space-y-4">
                      {/* Paragraph Content */}
                      <div className="space-y-3">
                        {loc.content.map((para, pIdx) => (
                          <p
                            key={pIdx}
                            className={`text-xs sm:text-sm leading-relaxed ${
                              isDay ? 'text-slate-700' : 'text-slate-300'
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
                          <div className="text-base sm:text-lg font-arabic font-bold text-right leading-loose">
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

      {/* 6. TAB 4: 12 ESSENTIAL MASNUN DUAS */}
      {activeTab === 'duas' && (
        <div className="space-y-6">
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

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={duaSearch}
                onChange={(e) => setDuaSearch(e.target.value)}
                placeholder={strings.duas.searchPlaceholder}
                className={`w-full pl-9 pr-4 py-2 rounded-2xl text-xs border transition-all ${
                  isDay
                    ? 'bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-rose-500'
                    : 'bg-[#071b20] border-[#153e46] text-white placeholder-slate-500 focus:border-rose-400'
                }`}
              />
            </div>
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
                  className={`p-5 rounded-[28px] border shadow-2xs space-y-3.5 flex flex-col justify-between transition-all ${
                    isDay
                      ? 'bg-white border-slate-200/90 hover:border-rose-300'
                      : 'bg-[#0a2026] border-[#143b44] hover:border-rose-500/40'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500">
                          {loc.timing}
                        </span>
                        <h3 className={`text-base font-black ${isDay ? 'text-slate-900' : 'text-white'}`}>
                          {loc.title}
                        </h3>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => handlePlaySpeech(dua.arabic, dua.id, true)}
                          className={`p-2 rounded-xl border transition active:scale-95 cursor-pointer ${
                            isPlaying
                              ? 'bg-rose-500 text-white border-rose-400'
                              : isDay
                              ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                              : 'bg-[#123138] hover:bg-[#18444e] text-rose-300 border-[#1c4d57]'
                          }`}
                          title={isPlaying ? strings.duas.stopAudio : strings.duas.listenDua}
                        >
                          {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </button>

                        <button
                          onClick={() => handleCopyText(`${dua.arabic}\n${loc.pronunciation}\n${loc.meaning}`, dua.id)}
                          className={`p-2 rounded-xl border transition active:scale-95 cursor-pointer ${
                            isCopied
                              ? 'bg-emerald-500 text-white border-emerald-400'
                              : isDay
                              ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
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
                      className={`p-3.5 rounded-2xl border text-right font-arabic font-bold text-base sm:text-lg leading-loose ${
                        isDay
                          ? 'bg-slate-50 border-slate-200 text-slate-900'
                          : 'bg-[#07181c] border-[#133740] text-emerald-100'
                      }`}
                    >
                      {dua.arabic}
                    </div>

                    {/* Pronunciation */}
                    <p className="text-xs italic opacity-85 leading-relaxed">
                      {loc.pronunciation}
                    </p>

                    {/* Meaning */}
                    <p className={`text-xs sm:text-sm font-medium leading-relaxed ${isDay ? 'text-slate-700' : 'text-slate-200'}`}>
                      {loc.meaning}
                    </p>
                  </div>

                  {/* Benefit & Reference Footer */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1 text-[11px]">
                    <div className="text-amber-600 dark:text-amber-400 font-medium">
                      ✨ {loc.benefit}
                    </div>
                    <div className="text-right opacity-70 font-semibold">
                      {dua.reference}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 7. TAB 5: DAILY SUNNAH TRACKER */}
      {activeTab === 'tracker' && (
        <div className="space-y-6">
          {/* Header & Overview Card */}
          <div
            className={`p-6 sm:p-8 rounded-[32px] border shadow-md flex flex-col md:flex-row items-center justify-between gap-6 ${
              isDay
                ? 'bg-gradient-to-br from-teal-50 via-emerald-50 to-white border-teal-200'
                : 'bg-gradient-to-br from-[#082025] via-[#0c2a30] to-[#06171b] border-[#15414b]'
            }`}
          >
            <div className="space-y-2 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-500/20 text-teal-700 dark:text-teal-300">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{strings.tracker.title}</span>
              </span>
              <h2 className={`text-xl sm:text-2xl font-black ${isDay ? 'text-slate-900' : 'text-white'}`}>
                {strings.tracker.progressLabel}: {checklistProgressPercent}%
              </h2>
              <p className={`text-xs sm:text-sm max-w-xl ${isDay ? 'text-slate-600' : 'text-slate-300'}`}>
                {checklistProgressPercent >= 80
                  ? strings.tracker.excellentPraise
                  : checklistProgressPercent >= 40
                  ? strings.tracker.goodPraise
                  : strings.tracker.startPraise}
              </p>
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
                  stroke="#0d9488"
                  strokeWidth="10"
                  strokeDasharray={`${(checklistProgressPercent / 100) * (2 * Math.PI * 52)} ${2 * Math.PI * 52}`}
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-2xl font-black ${isDay ? 'text-slate-900' : 'text-white'}`}>
                  {checklistProgressPercent}%
                </span>
                <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400">
                  {completedChecklistCount}/{NOBI_DAILY_CHECKLIST.length}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="text-xs font-bold text-slate-500">
              {completedChecklistCount} / {NOBI_DAILY_CHECKLIST.length} {strings.tracker.completed}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleMarkAllChecklist(true)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition active:scale-95 cursor-pointer border ${
                  isDay
                    ? 'bg-teal-100 hover:bg-teal-200 text-teal-900 border-teal-300'
                    : 'bg-[#10343c] hover:bg-[#16424c] text-teal-200 border-[#1c4f5a]'
                }`}
              >
                {strings.tracker.markAll}
              </button>
              <button
                onClick={() => handleMarkAllChecklist(false)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition active:scale-95 cursor-pointer border ${
                  isDay
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                    : 'bg-[#091a1e] hover:bg-[#102a30] text-slate-400 border-[#14343c]'
                }`}
              >
                {strings.tracker.reset}
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
                        ? 'bg-emerald-50/90 border-emerald-300'
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
                          ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                          : isDay
                          ? 'bg-slate-100 border-slate-300 text-transparent'
                          : 'bg-[#06181d] border-[#19454f] text-transparent'
                      }`}
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase text-amber-500">
                          {loc.timeSpan}
                        </span>
                      </div>
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

                  <span className="text-xs font-bold text-slate-400 shrink-0">
                    #{idx + 1}
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

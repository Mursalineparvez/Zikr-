import React, { useState, useEffect, useMemo, useRef } from 'react';
import { copyToClipboard } from '../utils/clipboard';
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
  ArrowLeft,
  ArrowRight,
  Calendar,
  BookMarked,
  RotateCcw,
  Sun,
  Sunrise,
  Moon,
  Flame,
  Compass,
  Play,
  Share2,
  Download,
} from 'lucide-react';
import { ThemeMode, ZikrLanguage } from '../types';
import { useBackLayer } from '../utils/backNavigation';
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
import { ContentShareModal, ShareDownloadButtons } from './ContentShareModal';
import { ShareableContent } from '../utils/shareDownload';

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

  // Currently selected slot in Hero Watch Dial
  const [selectedSlotId, setSelectedSlotId] = useState<string>('subh_sadiq_fajr');
  // Opened phase ID in the 14-phase gallery (null = show 14 creative cards; string = show full details)
  const [openedSlotId, setOpenedSlotId] = useState<string | null>(null);
  // Celestial period filter in the 14-phase gallery
  const [dialPeriodFilter, setDialPeriodFilter] = useState<'all' | 'morning' | 'midday' | 'night'>('all');

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

  // Share & Download modal state
  const [shareModalContent, setShareModalContent] = useState<ShareableContent | null>(null);
  const [shareModalFocus, setShareModalFocus] = useState<'share' | 'download'>('share');
  const openShareModal = (content: ShareableContent, focus: 'share' | 'download') => {
    setShareModalContent(content);
    setShareModalFocus(focus);
  };

  // Register opened phase detail & share modal for step-by-step reverse back navigation
  useBackLayer(openedSlotId !== null, () => setOpenedSlotId(null), 'nobi24-phase-detail');
  useBackLayer(Boolean(shareModalContent), () => setShareModalContent(null), 'nobi24-share');

  const buildSlotShareContent = (slot: NobiTimeSlot, index: number): ShareableContent => {
    const loc = getLocalizedSlot(slot, lang);
    const dur = formatDurationLabel(slot.startHour, slot.endHour, isBn);
    const docLines: string[] = [
      `${loc.timeSpan} (${dur}) • ${loc.categoryLabel}`,
      '',
      loc.summary,
      '',
      `${strings.wheel.sunnahActions}:`,
      ...loc.actions.map((a, i) => `${i + 1}. ${a}`),
    ];
    if (loc.hadith) {
      docLines.push('', `${strings.wheel.hadithQuote}:`, `"${loc.hadith}"`, slot.hadithRef ? `— ${slot.hadithRef}` : '');
    }
    if (slot.dua) {
      docLines.push(
        '',
        `${strings.wheel.duaOfSlot}:`,
        slot.dua.arabic,
        slot.dua.transliteration,
        loc.duaTranslation || ''
      );
    }

    return {
      id: `nobi24-slot-${slot.id}`,
      badge: isBn
        ? `নবীজির ২৪ ঘণ্টা • পর্ব ${toBnDigits(index + 1)}`
        : `Prophet's 24 Hours • Phase ${index + 1}`,
      title: `${slot.icon} ${loc.title}`,
      subtitle: `${loc.timeSpan} (${dur})`,
      arabic: slot.dua?.arabic,
      transliteration: slot.dua?.transliteration,
      body: loc.summary,
      highlights: loc.actions.slice(0, 4),
      meta: [
        { label: isBn ? 'সময়কাল' : 'Time', value: loc.timeSpan },
        { label: isBn ? 'স্থিতিকাল' : 'Duration', value: dur },
        { label: isBn ? 'ক্যাটাগরি' : 'Category', value: loc.categoryLabel },
      ],
      reference: slot.hadithRef || undefined,
      fullDocumentText: docLines.filter(Boolean).join('\n'),
      fileNamePrefix: `Nobi24Hours-Phase-${index + 1}`,
    };
  };

  const buildChapterShareContent = (chapter: (typeof NOBI_24_CHAPTERS)[number], idx: number): ShareableContent => {
    const loc = getLocalizedChapter(chapter, lang);
    const docLines: string[] = [
      `${loc.subtitle}`,
      '',
      ...loc.content,
    ];
    if (loc.hadithList && loc.hadithList.length > 0) {
      docLines.push('', `${strings.articles.hadithRef}:`);
      loc.hadithList.forEach((h) => {
        docLines.push(`"${h.text}" — ${h.reference}`);
      });
    }
    if (chapter.quranAyat) {
      docLines.push(
        '',
        `${strings.articles.quranRef} (${chapter.quranAyat.surah}):`,
        chapter.quranAyat.arabic,
        loc.quranTranslation || ''
      );
    }

    return {
      id: `nobi24-chapter-${chapter.id}`,
      badge: isBn
        ? `নবীজির ২৪ ঘণ্টা • অধ্যায় ${toBnDigits(idx + 1)}`
        : `Prophet's 24 Hours • Chapter ${idx + 1}`,
      title: `${chapter.icon} ${loc.title}`,
      subtitle: loc.subtitle,
      arabic: chapter.quranAyat?.arabic,
      body: loc.content.join('\n\n'),
      highlights: loc.hadithList?.slice(0, 3).map((h) => `${h.text} (${h.reference})`),
      meta: [
        { label: isBn ? 'অধ্যায়' : 'Chapter', value: isBn ? `${toBnDigits(idx + 1)}` : `${idx + 1}` },
        { label: isBn ? 'পাঠ সময়' : 'Read Time', value: `3 ${strings.articles.readingTime}` },
      ],
      reference: chapter.quranAyat?.surah || loc.hadithList?.[0]?.reference,
      fullDocumentText: docLines.filter(Boolean).join('\n\n'),
      fileNamePrefix: `Nobi24Hours-Chapter-${idx + 1}`,
    };
  };

  const buildDuaShareContent = (dua: (typeof NOBI_24_DUAS)[number]): ShareableContent => {
    const loc = getLocalizedDua(dua, lang);
    const fullDoc = [
      `${loc.timing}`,
      '',
      dua.arabic,
      '',
      `${isBn ? 'উচ্চারণ' : 'Pronunciation'}: ${loc.pronunciation}`,
      `${isBn ? 'অর্থ' : 'Meaning'}: ${loc.meaning}`,
      `${isBn ? 'ফজিলত' : 'Benefit'}: ${loc.benefit}`,
      `${isBn ? 'সূত্র' : 'Reference'}: ${dua.reference}`,
    ].join('\n');

    return {
      id: `nobi24-dua-${dua.id}`,
      badge: isBn ? 'নবীজির ২৪ ঘণ্টা • মাসনুন দোয়া' : "Prophet's 24 Hours • Sunnah Dua",
      title: loc.title,
      subtitle: loc.timing,
      arabic: dua.arabic,
      transliteration: loc.pronunciation,
      body: `${loc.meaning}\n\n${loc.benefit}`,
      meta: [
        { label: isBn ? 'সময়' : 'Timing', value: loc.timing },
        { label: isBn ? 'সূত্র' : 'Source', value: dua.reference },
      ],
      reference: dua.reference,
      fullDocumentText: fullDoc,
      fileNamePrefix: `Nobi24Hours-Dua-${dua.id}`,
    };
  };

  const openFullRoutineShare = (focus: 'share' | 'download') => {
    const slotsDoc = NOBI_24_TIME_SLOTS.map((slot, idx) => {
      const loc = getLocalizedSlot(slot, lang);
      return [
        `${idx + 1}. ${slot.icon} ${loc.title} [${loc.timeSpan}] (${loc.categoryLabel})`,
        loc.summary,
        ...loc.actions.map((a) => `   • ${a}`),
        loc.hadith ? `   Hadith: "${loc.hadith}" (${slot.hadithRef || ''})` : '',
      ]
        .filter(Boolean)
        .join('\n');
    }).join('\n\n');

    const chaptersDoc = NOBI_24_CHAPTERS.map((chap, idx) => {
      const loc = getLocalizedChapter(chap, lang);
      return `--- ${isBn ? 'অধ্যায়' : 'Chapter'} ${idx + 1}: ${loc.title} ---\n${loc.content.join('\n\n')}`;
    }).join('\n\n');

    const duasDoc = NOBI_24_DUAS.map((d, idx) => {
      const loc = getLocalizedDua(d, lang);
      return `${idx + 1}. ${loc.title} (${loc.timing})\n${d.arabic}\n${loc.pronunciation}\n${loc.meaning} (${d.reference})`;
    }).join('\n\n');

    const fullDoc = `${strings.title}\n${strings.subtitle}\n\n=== ${strings.timeline.title} ===\n\n${slotsDoc}\n\n=== ${strings.articles.title} ===\n\n${chaptersDoc}\n\n=== ${strings.duas.title} ===\n\n${duasDoc}`;

    openShareModal(
      {
        id: 'nobi24-full-guide',
        badge: isBn ? 'নবী করিম (সা.)-এর ২৪ ঘণ্টা' : "Prophet's 24-Hour Routine",
        title: strings.title,
        subtitle: strings.subtitle,
        arabic: strings.arabicTitle,
        body: isBn
          ? `রাসূলুল্লাহ (সা.)-এর ভোর থেকে গভীর রাত পর্যন্ত ১৪টি সময় পর্বের সুন্নাহ রুটিন, ৮টি অধ্যায় এবং ১২টি মাসনুন দোয়ার পূর্ণাঙ্গ গাইড।`
          : `Complete 24-hour Prophetic daily routine featuring 14 chronological phases, 8 detailed chapters, and 12 Masnun duas.`,
        highlights: NOBI_24_TIME_SLOTS.slice(0, 5).map((s) => {
          const l = getLocalizedSlot(s, lang);
          return `${s.icon} ${l.title} (${l.timeSpan})`;
        }),
        meta: [
          { label: isBn ? 'সময় পর্ব' : 'Phases', value: `${NOBI_24_TIME_SLOTS.length}` },
          { label: isBn ? 'অধ্যায়' : 'Chapters', value: `${NOBI_24_CHAPTERS.length}` },
          { label: isBn ? 'মাসনুন দোয়া' : 'Duas', value: `${NOBI_24_DUAS.length}` },
        ],
        reference: isBn ? 'সহিহ বুখারি, সহিহ মুসলিম ও শামায়েলে তিরমিযি' : 'Sahih Bukhari, Sahih Muslim & Shama’il Tirmidhi',
        fullDocumentText: fullDoc,
        fileNamePrefix: 'Nobi-24-Hours-Complete-Guide',
      },
      focus
    );
  };

  // Audio speech synthesis state
  const [isPlayingAudio, setIsPlayingAudio] = useState<string | null>(null);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);
  const detailSectionRef = useRef<HTMLDivElement | null>(null);

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
    const nextId = NOBI_24_TIME_SLOTS[nextIdx].id;
    setSelectedSlotId(nextId);
    if (openedSlotId !== null) {
      setOpenedSlotId(nextId);
    }
    if (soundEnabled) soundHaptics.playTap();
  };

  const openPhaseDetail = (slotId: string, shouldScroll = true) => {
    setSelectedSlotId(slotId);
    setOpenedSlotId(slotId);
    setActiveTab('wheel');
    if (soundEnabled) soundHaptics.playTap();
    if (shouldScroll) {
      window.requestAnimationFrame(() => {
        detailSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  };

  const celestialGroups = useMemo(
    () => [
      {
        key: 'morning' as const,
        label: isBn ? 'ভোর ও সকাল' : lang === 'ar' ? 'الفجر والصباح' : 'Dawn & Morning',
        subLabel: isBn ? 'সুবহে সাদিক থেকে বেলা ১১:৩০ · ৪টি পর্ব' : '04:30 AM – 11:30 AM · 4 Phases',
        arabic: 'الفجر والضحى',
        indices: [0, 1, 2, 3],
        icon: Sunrise,
        accentHex: '#d97706',
        dayHeaderTint: 'text-amber-700',
        nightHeaderTint: 'text-amber-300',
        dayIconBg: 'from-amber-50 via-orange-50/80 to-white border-amber-200/80',
        nightIconBg: 'from-amber-500/20 via-amber-500/10 to-[#0a2127] border-amber-400/30',
        cardTintDay: 'from-amber-50/45 via-white to-[#fcfdfb]',
        cardTintNight: 'from-[#142a2f] via-[#0a2127] to-[#081a20]',
      },
      {
        key: 'midday' as const,
        label: isBn ? 'দুপুর ও বিকাল' : lang === 'ar' ? 'الظهر والعصر' : 'Midday & Afternoon',
        subLabel: isBn ? 'বেলা ১১:৩০ থেকে মাগরিব (সন্ধ্যা ৬:০০) · ৫টি পর্ব' : '11:30 AM – 06:00 PM · 5 Phases',
        arabic: 'الظهر والعصر',
        indices: [4, 5, 6, 7, 8],
        icon: Sun,
        accentHex: '#059669',
        dayHeaderTint: 'text-emerald-700',
        nightHeaderTint: 'text-emerald-300',
        dayIconBg: 'from-emerald-50 via-teal-50/80 to-white border-emerald-200/80',
        nightIconBg: 'from-emerald-500/20 via-teal-500/10 to-[#0a2127] border-emerald-400/30',
        cardTintDay: 'from-emerald-50/45 via-white to-[#fafdfb]',
        cardTintNight: 'from-[#0d2d34] via-[#092027] to-[#07191f]',
      },
      {
        key: 'night' as const,
        label: isBn ? 'সন্ধ্যা ও গভীর রাত' : lang === 'ar' ? 'المساء والليل' : 'Evening & Night',
        subLabel: isBn ? 'মাগরিব থেকে শেষ রাত ও তাহাজ্জুদ · ৫টি পর্ব' : '06:00 PM – 04:30 AM · 5 Phases',
        arabic: 'المساء والتهجد',
        indices: [9, 10, 11, 12, 13],
        icon: Moon,
        accentHex: '#4f46e5',
        dayHeaderTint: 'text-indigo-700',
        nightHeaderTint: 'text-indigo-300',
        dayIconBg: 'from-indigo-50 via-violet-50/80 to-white border-indigo-200/80',
        nightIconBg: 'from-indigo-500/25 via-indigo-500/10 to-[#0a2127] border-indigo-400/30',
        cardTintDay: 'from-indigo-50/40 via-white to-[#fbfbfe]',
        cardTintNight: 'from-[#11233a] via-[#0a1e29] to-[#071721]',
      },
    ],
    [isBn, lang]
  );

  // Normalized 0..100 position along the Prophet's day starting at 04:30 (Subh Sadiq)
  const liveDayHorizonPercent = useMemo(() => {
    const shifted = (currentHourVal - 4.5 + 24) % 24;
    return Math.min(98, Math.max(2, (shifted / 24) * 100));
  }, [currentHourVal]);

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
    void copyToClipboard(text);
    setCopiedItemId(id);
    if (soundEnabled) soundHaptics.playTap();
    showNotice(strings.duas.copied);
    setTimeout(() => setCopiedItemId(null), 2000);
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

  const locNextSlot = getLocalizedSlot(nextLiveSlot, lang);
  const locActiveSlot = getLocalizedSlot(activeSlot, lang);
  const activeNextSlot = NOBI_24_TIME_SLOTS[(activeSlotIndex + 1) % NOBI_24_TIME_SLOTS.length];
  const locActiveNextSlot = getLocalizedSlot(activeNextSlot, lang);

  const formattedLiveClock = useMemo(() => {
    return nowDate.toLocaleTimeString(lang === 'bn' ? 'bn-BD' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  }, [nowDate, lang]);

  const formattedShortClock = useMemo(() => {
    return nowDate.toLocaleTimeString(lang === 'bn' ? 'bn-BD' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }, [nowDate, lang]);

  return (
    <div className="space-y-4 sm:space-y-5 animate-in fade-in duration-300">
      {/* Inline Non-Blocking Toast Feedback */}
      {noticeText && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-[#006A4E] text-white text-xs font-bold shadow-lg border border-emerald-400/40 flex items-center gap-1.5 animate-in fade-in slide-in-from-top-2">
          <Check className="w-3.5 h-3.5 text-emerald-300" />
          <span>{noticeText}</span>
        </div>
      )}

      {/* 1. ULTRA-SLIM CELESTIAL EMERALD-GOLD TIMEPIECE HERO CARD */}
      <div
        className={`relative overflow-hidden rounded-2xl sm:rounded-3xl px-3.5 py-2.5 sm:px-5 sm:py-3.5 border shadow-lg transition-all duration-300 ${
          isDay
            ? 'bg-gradient-to-br from-[#014734] via-[#025b42] to-[#012c20] text-white border-emerald-400/25'
            : 'bg-gradient-to-br from-[#04171c] via-[#07242c] to-[#030f13] text-white border-teal-500/25'
        }`}
      >
        {/* Subtle luminous top gold hairline & ambient depth */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-300/80 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-10 w-44 h-44 rounded-full bg-amber-400/[0.09] blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-14 -bottom-14 w-40 h-40 rounded-full bg-emerald-300/[0.08] blur-3xl"
        />

        {/* Subtle Islamic geometric star ornament */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute right-0 -top-4 h-36 w-36 sm:h-44 sm:w-44 opacity-[0.06] text-amber-200"
          viewBox="0 0 200 200"
          fill="none"
        >
          <circle cx="110" cy="95" r="72" stroke="currentColor" strokeWidth="1" />
          <circle cx="110" cy="95" r="52" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 4" />
          <polygon points="110,23 160,59 160,131 110,167 60,131 60,59" stroke="currentColor" strokeWidth="0.8" />
        </svg>

        <div className="relative z-10 space-y-2 sm:space-y-2.5">
          {/* Row 1: Zero-Collision Ultra-Slim Top Utility Strip */}
          <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-white/10">
            <div className="flex items-center gap-2 min-w-0">
              {onBackToHub && (
                <button
                  type="button"
                  onClick={onBackToHub}
                  className="inline-flex items-center justify-center gap-1 h-7 px-2 sm:px-2.5 rounded-lg text-[11px] font-bold bg-white/10 hover:bg-white/20 border border-white/15 text-emerald-50 transition active:scale-95 cursor-pointer shrink-0"
                  title={strings.backToHub}
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline whitespace-nowrap">{strings.backToHub}</span>
                </button>
              )}

              {/* Mobile: crisp live clock safely on left-center; Desktop: Arabic calligraphy */}
              <div className="flex sm:hidden items-center gap-1 text-[11px] font-mono font-extrabold tabular-nums text-amber-200/95 truncate">
                <Clock className="w-3 h-3 text-amber-300 shrink-0" />
                <span>{formattedShortClock}</span>
              </div>
              <span className="hidden sm:inline font-arabic text-sm font-bold text-amber-300/95 tracking-wide truncate">
                {strings.arabicTitle}
              </span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {/* Mobile: compact icon-only Share & Download (zero crowding or clipping) */}
              <div className="flex sm:hidden items-center gap-1">
                <button
                  type="button"
                  onClick={() => openFullRoutineShare('share')}
                  className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-emerald-50 flex items-center justify-center transition active:scale-95 cursor-pointer"
                  aria-label={isBn ? 'শেয়ার' : 'Share'}
                  title={isBn ? 'শেয়ার' : 'Share'}
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => openFullRoutineShare('download')}
                  className="w-7 h-7 rounded-lg bg-amber-400/15 hover:bg-amber-400/25 border border-amber-300/25 text-amber-200 flex items-center justify-center transition active:scale-95 cursor-pointer"
                  aria-label={isBn ? 'ডাউনলোড' : 'Download'}
                  title={isBn ? 'ডাউনলোড' : 'Download'}
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Desktop/Tablet: full Share & Download buttons + live clock */}
              <div className="hidden sm:flex items-center gap-2">
                <ShareDownloadButtons
                  variant="hero"
                  selectedLanguage={lang}
                  themeMode={themeMode}
                  onShare={() => openFullRoutineShare('share')}
                  onDownload={() => openFullRoutineShare('download')}
                />
                <div className="flex items-center gap-1.5 pl-2 border-l border-white/15">
                  <Clock className="w-3.5 h-3.5 text-amber-300" />
                  <span className="text-xs font-mono font-black tabular-nums tracking-tight text-amber-200">
                    {formattedLiveClock}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Compact Side-by-Side Stage (Editorial + Live Phase Left, Jewel 24H Dial Right) */}
          <div className="flex items-center justify-between gap-2.5 sm:gap-5">
            {/* Left: Crisp Title + Unboxed Active Phase + Compact Actions */}
            <div className="flex-1 min-w-0 space-y-1 sm:space-y-1.5">
              <div>
                <h1 className="text-[15px] sm:text-[21px] font-black tracking-tight leading-tight text-white truncate">
                  {strings.title}
                </h1>
                <p className="hidden sm:block text-xs text-emerald-100/75 leading-relaxed mt-0.5 truncate">
                  {strings.subtitle}
                </p>
              </div>

              {/* Clean Unboxed Active Phase Metadata & Title (No nested box-in-box clutter) */}
              <div className="space-y-0.5 pt-0.5">
                <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-amber-300/95 tabular-nums truncate">
                  <span className="truncate">{locActiveSlot.timeSpan}</span>
                  <span aria-hidden="true" className="text-white/30 shrink-0">·</span>
                  <span className="text-emerald-200/90 shrink-0">
                    {formatDurationLabel(activeSlot.startHour, activeSlot.endHour, isBn)}
                  </span>
                  {activeSlot.id === currentLiveSlot.id && (
                    <>
                      <span aria-hidden="true" className="text-white/30 shrink-0">·</span>
                      <span className="text-emerald-300 font-black shrink-0">
                        {isBn ? 'এখন' : 'Live'}
                      </span>
                    </>
                  )}
                </div>

                <h2 className="text-[12.5px] sm:text-[15px] font-extrabold text-white/95 leading-snug truncate flex items-center gap-1.5">
                  <span className="text-sm sm:text-base leading-none shrink-0" aria-hidden="true">
                    {activeSlot.icon}
                  </span>
                  <span className="truncate">{locActiveSlot.title}</span>
                </h2>
              </div>

              {/* Slim Primary Action + Inline Stepper */}
              <div className="flex items-center gap-1.5 pt-1 flex-wrap">
                <button
                  type="button"
                  onClick={() => openPhaseDetail(activeSlot.id, true)}
                  className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-gradient-to-r from-amber-300 to-amber-400 hover:from-amber-200 hover:to-amber-300 text-slate-950 text-[11px] font-black inline-flex items-center gap-1 transition active:scale-95 cursor-pointer shadow-xs whitespace-nowrap"
                >
                  <span className="sm:hidden">{isBn ? 'বিস্তারিত' : 'Details'}</span>
                  <span className="hidden sm:inline">{strings.liveBanner.viewDetails}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>

                {selectedSlotId !== currentLiveSlot.id && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSlotId(currentLiveSlot.id);
                      if (soundEnabled) soundHaptics.playTap();
                    }}
                    className="px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg text-[10.5px] sm:text-[11px] font-bold bg-white/10 hover:bg-white/20 text-amber-200 border border-white/15 transition active:scale-95 cursor-pointer whitespace-nowrap"
                  >
                    <span className="sm:hidden">{isBn ? 'এখন' : 'Now'}</span>
                    <span className="hidden sm:inline">{isBn ? 'এখনকার সময়' : 'Live Now'}</span>
                  </button>
                )}

                {/* Mobile Inline Phase Stepper (saves an entire vertical row!) */}
                <div className="flex sm:hidden items-center gap-0.5 ml-auto bg-black/20 rounded-lg p-0.5 border border-white/10">
                  <button
                    type="button"
                    onClick={() => handleStepSlot(-1)}
                    className="w-6 h-6 rounded-md hover:bg-white/15 text-emerald-100 flex items-center justify-center transition active:scale-90 cursor-pointer"
                    aria-label={isBn ? 'পূর্ববর্তী পর্ব' : 'Previous phase'}
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[10px] font-mono font-bold tabular-nums text-amber-200 px-1">
                    {isBn
                      ? `${toBnDigits(activeSlotIndex + 1)}/${toBnDigits(NOBI_24_TIME_SLOTS.length)}`
                      : `${activeSlotIndex + 1}/${NOBI_24_TIME_SLOTS.length}`}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleStepSlot(1)}
                    className="w-6 h-6 rounded-md hover:bg-white/15 text-emerald-100 flex items-center justify-center transition active:scale-90 cursor-pointer"
                    aria-label={isBn ? 'পরবর্তী পর্ব' : 'Next phase'}
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Desktop subtle next phase hint */}
                <span className="hidden lg:inline text-[11px] text-emerald-100/70 truncate ml-1">
                  {activeSlot.id === currentLiveSlot.id
                    ? `${liveSlotTiming.remainingText} · ${isBn ? `পরবর্তী: ${locNextSlot.title}` : `Next: ${locNextSlot.title}`}`
                    : isBn
                    ? `পরবর্তী: ${locActiveNextSlot.title}`
                    : `Next: ${locActiveNextSlot.title}`}
                </span>
              </div>
            </div>

            {/* Right: Jewel-Sized Precision 24-Hour Sunnah Watch Dial */}
            <div className="shrink-0 flex flex-col items-center gap-1">
              <div className="relative w-[84px] h-[84px] sm:w-[114px] sm:h-[114px] flex items-center justify-center shrink-0">
                <svg viewBox="0 0 320 320" className="w-full h-full drop-shadow-[0_4px_14px_rgba(0,0,0,0.45)]">
                  <defs>
                    <linearGradient id="watchBezelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fde68a" stopOpacity="0.7" />
                      <stop offset="50%" stopColor="#34d399" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.7" />
                    </linearGradient>
                  </defs>

                  {/* Outer Brushed-Gold Watch Bezel */}
                  <circle cx="160" cy="160" r="154" fill="rgba(0,0,0,0.28)" stroke="url(#watchBezelGrad)" strokeWidth="2.5" />
                  <circle cx="160" cy="160" r="145" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

                  {/* 24-Hour Precision Tick Marks */}
                  {Array.from({ length: 24 }).map((_, hr) => {
                    const angleDeg = (hr / 24) * 360 - 90;
                    const rad = (angleDeg * Math.PI) / 180;
                    const isMajor = hr % 3 === 0;
                    const r1 = 135;
                    const r2 = isMajor ? 144 : 140;
                    const x1 = 160 + r1 * Math.cos(rad);
                    const y1 = 160 + r1 * Math.sin(rad);
                    const x2 = 160 + r2 * Math.cos(rad);
                    const y2 = 160 + r2 * Math.sin(rad);

                    return (
                      <line
                        key={hr}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={isMajor ? '#fcd34d' : 'rgba(255,255,255,0.28)'}
                        strokeWidth={isMajor ? 2.2 : 1.1}
                        strokeLinecap="round"
                      />
                    );
                  })}

                  <g transform="rotate(-90 160 160)">
                    {/* Track Ring */}
                    <circle cx="160" cy="160" r="116" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="22" />

                    {/* 14 Clickable Sunnah Phase Arcs */}
                    {NOBI_24_TIME_SLOTS.map((slot) => {
                      const totalHoursInSlot =
                        slot.endHour >= slot.startHour
                          ? slot.endHour - slot.startHour
                          : 24 - slot.startHour + slot.endHour;

                      const startAngle = (slot.startHour / 24) * 360;
                      const sliceAngle = (totalHoursInSlot / 24) * 360;
                      const isSelected = slot.id === activeSlot.id;
                      const isLive = slot.id === currentLiveSlot.id;

                      const radius = 116;
                      const strokeW = isSelected ? 26 : 18;
                      const circumference = 2 * Math.PI * radius;
                      const strokeDasharray = `${Math.max(2, (sliceAngle / 360) * circumference - 2)} ${circumference}`;
                      const strokeDashoffset = -((startAngle / 360) * circumference);

                      return (
                        <circle
                          key={slot.id}
                          cx="160"
                          cy="160"
                          r={radius}
                          fill="none"
                          stroke={slot.color}
                          strokeWidth={strokeW}
                          strokeDasharray={strokeDasharray}
                          strokeDashoffset={strokeDashoffset}
                          opacity={isSelected ? 1 : isLive ? 0.92 : 0.65}
                          className="cursor-pointer transition-all duration-200 hover:opacity-100"
                          onClick={() => {
                            setSelectedSlotId(slot.id);
                            if (openedSlotId !== null) setOpenedSlotId(slot.id);
                            setActiveTab('wheel');
                            if (soundEnabled) soundHaptics.playTap();
                          }}
                        />
                      );
                    })}

                    {/* Live Precision Gold Watch Hand */}
                    {(() => {
                      const angleRad = ((currentHourVal / 24) * 360 * Math.PI) / 180;
                      const handX = 160 + 100 * Math.cos(angleRad);
                      const handY = 160 + 100 * Math.sin(angleRad);
                      return (
                        <g>
                          <line
                            x1="160"
                            y1="160"
                            x2={handX}
                            y2={handY}
                            stroke="#fbbf24"
                            strokeWidth="3.2"
                            strokeLinecap="round"
                          />
                          <circle cx={handX} cy={handY} r="5" fill="#fbbf24" stroke="#ffffff" strokeWidth="1.4" />
                        </g>
                      );
                    })()}

                    {/* Inner Watch Dial Face */}
                    <circle cx="160" cy="160" r="82" fill={isDay ? '#013426' : '#031217'} />
                    <circle cx="160" cy="160" r="82" fill="none" stroke="rgba(253,230,138,0.3)" strokeWidth="1.6" />
                  </g>
                </svg>

                {/* Center Watch Face Readout */}
                <button
                  type="button"
                  onClick={() => openPhaseDetail(activeSlot.id, true)}
                  className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center cursor-pointer rounded-full"
                  title={locActiveSlot.title}
                >
                  <span className="text-sm sm:text-base leading-none">{activeSlot.icon}</span>
                  <span className="text-[9px] sm:text-[10px] font-mono font-black tabular-nums text-amber-300 mt-0.5 leading-tight">
                    {formatHourClock(activeSlot.startHour, isBn)}
                  </span>
                  <span className="hidden sm:block text-[8.5px] font-bold text-white/90 line-clamp-1 mt-0.5 max-w-[68px]">
                    {locActiveSlot.title}
                  </span>
                </button>
              </div>

              {/* Desktop/Tablet Compact Stepper Below Dial */}
              <div className="hidden sm:flex items-center justify-center gap-1">
                <button
                  type="button"
                  onClick={() => handleStepSlot(-1)}
                  className="p-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-emerald-100 transition active:scale-95 cursor-pointer"
                  title={isBn ? 'পূর্ববর্তী পর্ব' : 'Previous phase'}
                >
                  <ChevronLeft className="w-3 h-3" />
                </button>
                <span className="text-[10px] font-mono font-bold tabular-nums text-amber-200/95 px-1">
                  {isBn
                    ? `${toBnDigits(activeSlotIndex + 1)} / ${toBnDigits(NOBI_24_TIME_SLOTS.length)}`
                    : `${activeSlotIndex + 1} / ${NOBI_24_TIME_SLOTS.length}`}
                </span>
                <button
                  type="button"
                  onClick={() => handleStepSlot(1)}
                  className="p-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-emerald-100 transition active:scale-95 cursor-pointer"
                  title={isBn ? 'পরবর্তী পর্ব' : 'Next phase'}
                >
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Row 3: Razor-Slim 24H Celestial Horizon Ribbon */}
          <div className="space-y-1 pt-0.5">
            <div className="relative h-1.5 w-full rounded-full overflow-hidden bg-black/25">
              <div
                className="absolute inset-0 opacity-95"
                style={{
                  background:
                    'linear-gradient(90deg, #f59e0b 0%, #eab308 18%, #14b8a6 38%, #38bdf8 52%, #fb923c 64%, #818cf8 78%, #312e81 92%, #10b981 100%)',
                }}
              />
              <div
                style={{ left: `${liveDayHorizonPercent}%` }}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-white border-2 border-[#013426] shadow-[0_0_8px_rgba(255,255,255,0.95)]"
                title={formattedLiveClock}
              />
            </div>
            <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono font-semibold tabular-nums text-emerald-100/70">
              <span>{isBn ? 'ফজর ৪:৩০' : '04:30 Fajr'}</span>
              <span className="hidden sm:inline">{isBn ? 'সকাল ৮:০০' : '08:00 AM'}</span>
              <span>{isBn ? 'যোহর ১:০০' : '01:00 PM'}</span>
              <span className="hidden md:inline">{isBn ? 'মাগরিব ৬:০০' : '06:00 PM'}</span>
              <span>{isBn ? 'তাহাজ্জুদ ৩:০০' : '03:00 AM'}</span>
            </div>
          </div>

          {/* Row 4: Single-Line Segmented Period Filter + Desktop Life Balance */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pt-0.5">
            <div className="grid grid-cols-4 sm:inline-flex items-center gap-1 p-0.5 rounded-xl bg-black/20 border border-white/10">
              {[
                {
                  id: 'all' as const,
                  mobileLabel: isBn ? `সব ${toBnDigits(14)}` : 'All 14',
                  fullLabel: isBn ? `সব (${toBnDigits(14)})` : 'All (14)',
                },
                {
                  id: 'morning' as const,
                  mobileLabel: isBn ? `ভোর ${toBnDigits(4)}` : 'Dawn 4',
                  fullLabel: isBn ? `ভোর ও সকাল (${toBnDigits(4)})` : 'Morning (4)',
                },
                {
                  id: 'midday' as const,
                  mobileLabel: isBn ? `দুপুর ${toBnDigits(5)}` : 'Day 5',
                  fullLabel: isBn ? `দুপুর ও বিকাল (${toBnDigits(5)})` : 'Midday (5)',
                },
                {
                  id: 'night' as const,
                  mobileLabel: isBn ? `রাত ${toBnDigits(5)}` : 'Night 5',
                  fullLabel: isBn ? `সন্ধ্যা ও রাত (${toBnDigits(5)})` : 'Night (5)',
                },
              ].map((pf) => {
                const active = activeTab === 'wheel' && dialPeriodFilter === pf.id;
                return (
                  <button
                    key={pf.id}
                    type="button"
                    onClick={() => {
                      setDialPeriodFilter(pf.id);
                      setActiveTab('wheel');
                      setOpenedSlotId(null);
                      if (soundEnabled) soundHaptics.playTap();
                    }}
                    className={`px-1.5 sm:px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold whitespace-nowrap text-center transition cursor-pointer ${
                      active
                        ? 'bg-amber-300 text-slate-950 shadow-xs'
                        : 'text-emerald-50/85 hover:bg-white/10'
                    }`}
                  >
                    <span className="sm:hidden">{pf.mobileLabel}</span>
                    <span className="hidden sm:inline">{pf.fullLabel}</span>
                  </button>
                );
              })}
            </div>

            {/* Life Balance breakdown shown cleanly on tablet/desktop */}
            <div className="hidden md:flex items-center gap-2.5 text-[11px] text-emerald-100/80">
              {categoryBreakdown.map((cat) => {
                const shortLabel =
                  cat.key === 'spiritual'
                    ? isBn ? 'আধ্যাত্মিক' : 'Spiritual'
                    : cat.key === 'social'
                    ? isBn ? 'সামাজিক' : 'Social'
                    : cat.key === 'physical'
                    ? isBn ? 'বিশ্রাম' : 'Rest'
                    : isBn ? 'পরিবার' : 'Family';
                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => {
                      setCategoryFilter(cat.key);
                      setTimelineFilter('all');
                      setActiveTab('timeline');
                      if (soundEnabled) soundHaptics.playTap();
                    }}
                    className="inline-flex items-center gap-1 hover:text-amber-200 transition cursor-pointer whitespace-nowrap"
                    title={cat.label}
                  >
                    <span className="w-2 h-2 rounded-xs shrink-0" style={{ backgroundColor: cat.color }} />
                    <span>{shortLabel}</span>
                    <strong className="font-mono font-bold tabular-nums text-white">
                      {isBn ? `${toBnDigits(cat.hours)}ঘ` : `${cat.hours}h`}
                    </strong>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 5: Quiet Single-Line Quick-Metrics Strip */}
          <div className="flex items-center justify-between sm:justify-start sm:gap-3 pt-1.5 border-t border-white/10 text-[10px] sm:text-[11px] text-emerald-100/80">
            <button
              type="button"
              onClick={() => setActiveTab('timeline')}
              className="inline-flex items-baseline gap-1 hover:text-amber-300 transition cursor-pointer whitespace-nowrap"
            >
              <strong className="font-mono font-black tabular-nums text-white">
                {isBn ? toBnDigits(NOBI_24_TIME_SLOTS.length) : NOBI_24_TIME_SLOTS.length}
              </strong>
              <span>{isBn ? 'পর্ব' : 'Phases'}</span>
            </button>
            <span aria-hidden="true" className="text-white/25">·</span>
            <button
              type="button"
              onClick={() => setActiveTab('articles')}
              className="inline-flex items-baseline gap-1 hover:text-amber-300 transition cursor-pointer whitespace-nowrap"
            >
              <strong className="font-mono font-black tabular-nums text-white">
                {isBn ? toBnDigits(NOBI_24_CHAPTERS.length) : NOBI_24_CHAPTERS.length}
              </strong>
              <span>{isBn ? 'অধ্যায়' : 'Chapters'}</span>
            </button>
            <span aria-hidden="true" className="text-white/25">·</span>
            <button
              type="button"
              onClick={() => setActiveTab('duas')}
              className="inline-flex items-baseline gap-1 hover:text-amber-300 transition cursor-pointer whitespace-nowrap"
            >
              <strong className="font-mono font-black tabular-nums text-white">
                {isBn ? toBnDigits(NOBI_24_DUAS.length) : NOBI_24_DUAS.length}
              </strong>
              <span>{isBn ? 'দোয়া' : 'Duas'}</span>
            </button>
            <span aria-hidden="true" className="text-white/25">·</span>
            <button
              type="button"
              onClick={() => setActiveTab('tracker')}
              className="inline-flex items-baseline gap-1 hover:text-amber-200 transition cursor-pointer whitespace-nowrap"
            >
              <strong className="font-mono font-black tabular-nums text-amber-300">
                {isBn
                  ? `${toBnDigits(completedChecklistCount)}/${toBnDigits(NOBI_DAILY_CHECKLIST.length)}`
                  : `${completedChecklistCount}/${NOBI_DAILY_CHECKLIST.length}`}
              </strong>
              <span>{isBn ? 'সুন্নাহ' : 'Sunnah'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. COHESIVE SEGMENTED NAVIGATION TABS */}
      <div
        className={`flex items-center gap-1.5 overflow-x-auto p-1.5 rounded-2xl border scrollbar-none ${
          isDay ? 'bg-slate-100/90 border-slate-200/80' : 'bg-[#07181d] border-[#143942]'
        }`}
      >
        {[
          {
            id: 'wheel' as const,
            label: strings.tabs.wheel,
            count: isBn ? toBnDigits(NOBI_24_TIME_SLOTS.length) : String(NOBI_24_TIME_SLOTS.length),
            icon: Clock,
          },
          {
            id: 'timeline' as const,
            label: strings.tabs.timeline,
            count: null,
            icon: Calendar,
          },
          {
            id: 'articles' as const,
            label: strings.tabs.articles,
            count: isBn ? toBnDigits(NOBI_24_CHAPTERS.length) : String(NOBI_24_CHAPTERS.length),
            icon: BookOpen,
          },
          {
            id: 'duas' as const,
            label: strings.tabs.duas,
            count: isBn ? toBnDigits(NOBI_24_DUAS.length) : String(NOBI_24_DUAS.length),
            icon: Heart,
          },
          {
            id: 'tracker' as const,
            label: strings.tabs.tracker,
            count: isBn
              ? `${toBnDigits(completedChecklistCount)}/${toBnDigits(NOBI_DAILY_CHECKLIST.length)}`
              : `${completedChecklistCount}/${NOBI_DAILY_CHECKLIST.length}`,
            icon: CheckCircle2,
          },
        ].map((tab) => {
          const IconComp = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTab(tab.id);
                if (tab.id === 'wheel') setOpenedSlotId(null);
                if (soundEnabled) soundHaptics.playTap();
              }}
              className={`min-h-[42px] flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all active:scale-[0.98] cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-[#006A4E] text-white shadow-sm'
                  : isDay
                  ? 'text-slate-600 hover:text-slate-900 hover:bg-white/70'
                  : 'text-teal-200/80 hover:text-white hover:bg-[#0e2d35]'
              }`}
            >
              <IconComp className="w-4 h-4 shrink-0" />
              <span>{tab.label}</span>
              {tab.count && (
                <span
                  className={`text-[11px] font-mono tabular-nums ${
                    isActive ? 'text-amber-200' : 'opacity-65'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 3. TAB 1: CREATIVE 14-PHASE CELESTIAL GALLERY + CLICK-TO-OPEN DETAIL READER */}
      {activeTab === 'wheel' && (
        <div ref={detailSectionRef} className="space-y-5">
          {/* OVERVIEW MODE: 14 Beautiful Sunnah Phase Cards directly below navigation */}
          {openedSlotId === null ? (
            <div className="space-y-6">
              {/* 14 CHRONOLOGICAL PHASE CARDS — GROUPED BY CELESTIAL DAY PERIOD */}
              <div className="space-y-5">
                {celestialGroups
                  .filter((grp) => dialPeriodFilter === 'all' || dialPeriodFilter === grp.key)
                  .map((grp) => {
                    const GrpIcon = grp.icon;
                    return (
                      <section key={grp.key} className="space-y-2.5">
                        {/* Slim Illuminated Celestial Period Section Header */}
                        <div className="flex items-center justify-between gap-2.5 px-0.5">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div
                              className={`relative w-8 h-8 rounded-xl border bg-gradient-to-br flex items-center justify-center shrink-0 ${
                                isDay ? grp.dayIconBg : grp.nightIconBg
                              }`}
                              style={{
                                boxShadow: isDay
                                  ? `0 4px 12px -4px ${grp.accentHex}38, inset 0 1px 0 rgba(255,255,255,0.9)`
                                  : `0 4px 14px -4px ${grp.accentHex}45, inset 0 1px 0 rgba(255,255,255,0.08)`,
                              }}
                            >
                              <GrpIcon className={`w-4 h-4 ${isDay ? grp.dayHeaderTint : grp.nightHeaderTint}`} />
                            </div>
                            <div className="min-w-0 flex flex-wrap items-baseline gap-x-2">
                              <h3 className={`text-[13.5px] sm:text-[14.5px] font-black tracking-tight leading-tight ${isDay ? 'text-slate-900' : 'text-white'}`}>
                                {grp.label}
                              </h3>
                              <p className={`text-[10.5px] font-medium truncate ${isDay ? 'text-slate-500' : 'text-teal-200/65'}`}>
                                {grp.subLabel}
                              </p>
                            </div>
                          </div>

                          {/* Delicate Hairline Connector */}
                          <div className="hidden sm:flex items-center flex-1 gap-1.5 px-1.5">
                            <div
                              className="h-px flex-1"
                              style={{
                                background: isDay
                                  ? `linear-gradient(90deg, ${grp.accentHex}35, ${grp.accentHex}12 60%, transparent)`
                                  : `linear-gradient(90deg, ${grp.accentHex}50, ${grp.accentHex}18 60%, transparent)`,
                              }}
                            />
                            <span
                              aria-hidden="true"
                              className="w-1 h-1 rotate-45 rounded-[1px] shrink-0 opacity-60"
                              style={{ backgroundColor: grp.accentHex }}
                            />
                            <div
                              className="h-px w-6"
                              style={{
                                background: isDay
                                  ? `linear-gradient(270deg, ${grp.accentHex}35, transparent)`
                                  : `linear-gradient(270deg, ${grp.accentHex}50, transparent)`,
                              }}
                            />
                          </div>

                          <span
                            className={`font-arabic text-[13.5px] sm:text-[14.5px] font-bold shrink-0 tracking-wide ${
                              isDay ? grp.dayHeaderTint : grp.nightHeaderTint
                            }`}
                            style={{ opacity: isDay ? 0.85 : 0.9 }}
                          >
                            {grp.arabic}
                          </span>
                        </div>

                        {/* Compact Jewel-Box Phase Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-3">
                          {grp.indices.map((slotIdx) => {
                            const slot = NOBI_24_TIME_SLOTS[slotIdx];
                            if (!slot) return null;
                            const locSlot = getLocalizedSlot(slot, lang);
                            const isLive = slot.id === currentLiveSlot.id;
                            const durLabel = formatDurationLabel(slot.startHour, slot.endHour, isBn);
                            const phaseNum = isBn
                              ? toBnDigits(String(slotIdx + 1).padStart(2, '0'))
                              : String(slotIdx + 1).padStart(2, '0');

                            return (
                              <button
                                key={slot.id}
                                type="button"
                                onClick={() => openPhaseDetail(slot.id, true)}
                                className={`group relative overflow-hidden rounded-2xl p-3 sm:p-3.5 border text-left transition-all duration-250 cursor-pointer flex flex-col justify-between gap-2.5 active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 bg-gradient-to-br ${
                                  isLive
                                    ? isDay
                                      ? 'from-emerald-50/95 via-white to-amber-50/50 border-emerald-500/85 ring-1 ring-emerald-500/20 shadow-[0_8px_22px_-8px_rgba(16,185,129,0.28)] hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-10px_rgba(16,185,129,0.34)]'
                                      : 'from-[#0e3942] via-[#09242c] to-[#0b2a31] border-emerald-400/80 ring-1 ring-emerald-400/25 shadow-[0_10px_26px_-8px_rgba(16,185,129,0.32)] hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-10px_rgba(16,185,129,0.4)]'
                                    : isDay
                                    ? `${grp.cardTintDay} border-slate-200/85 shadow-[0_3px_14px_-6px_rgba(15,23,42,0.07),0_1px_2px_rgba(15,23,42,0.03)] hover:border-emerald-500/55 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_-10px_rgba(0,106,78,0.16)]`
                                    : `${grp.cardTintNight} border-[#18434e] ring-1 ring-inset ring-white/[0.04] shadow-[0_4px_16px_-6px_rgba(0,0,0,0.42)] hover:border-emerald-400/55 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-10px_rgba(16,185,129,0.22)]`
                                }`}
                              >
                                {/* Luminous Tapered Gradient Top Ribbon */}
                                <div
                                  aria-hidden="true"
                                  className="pointer-events-none absolute inset-x-0 top-0 h-[2.5px] opacity-85 group-hover:opacity-100 transition-opacity duration-250"
                                  style={{
                                    background: isLive
                                      ? 'linear-gradient(90deg, #059669 0%, #10b981 50%, #f59e0b 85%, transparent 100%)'
                                      : `linear-gradient(90deg, ${slot.color} 0%, ${slot.color}bb 48%, #d4af3766 82%, transparent 100%)`,
                                  }}
                                />

                                {/* Subtle Atmospheric Radial Corner Aura */}
                                <div
                                  aria-hidden="true"
                                  className="pointer-events-none absolute inset-0 opacity-65 group-hover:opacity-100 transition-opacity duration-250"
                                  style={{
                                    background: isDay
                                      ? `radial-gradient(170px circle at 0% 0%, ${slot.color}16 0%, transparent 72%)`
                                      : `radial-gradient(185px circle at 0% 0%, ${slot.color}24 0%, transparent 74%)`,
                                  }}
                                />

                                {/* Subtle Editorial Phase Numeral Watermark (Top-Right) */}
                                {!isLive && (
                                  <span
                                    aria-hidden="true"
                                    className={`pointer-events-none select-none absolute top-2 right-3 font-mono text-[28px] font-black leading-none tracking-tighter transition-all duration-300 group-hover:scale-105 ${
                                      isDay
                                        ? 'text-slate-900/[0.045] group-hover:text-emerald-900/[0.08]'
                                        : 'text-white/[0.045] group-hover:text-emerald-300/[0.09]'
                                    }`}
                                  >
                                    {phaseNum}
                                  </span>
                                )}

                                {/* Delicate 8-Point Rub el Hizb Star Filigree (Bottom-Right) */}
                                <svg
                                  aria-hidden="true"
                                  viewBox="0 0 80 80"
                                  className={`pointer-events-none absolute -right-3 -bottom-3 w-16 h-16 transition-all duration-500 group-hover:rotate-12 ${
                                    isDay
                                      ? 'text-emerald-800 opacity-[0.035] group-hover:opacity-[0.09]'
                                      : 'text-emerald-300 opacity-[0.045] group-hover:opacity-[0.12]'
                                  }`}
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.2"
                                >
                                  <rect x="18" y="18" width="44" height="44" rx="2.5" />
                                  <rect x="18" y="18" width="44" height="44" rx="2.5" transform="rotate(45 40 40)" />
                                  <circle cx="40" cy="40" r="10" />
                                  <circle cx="40" cy="40" r="3" fill="currentColor" />
                                </svg>

                                {/* Compact Header: Mini Jewel Icon + Phase/Time + Live Dot */}
                                <div className="relative z-10 flex items-start justify-between gap-2">
                                  <div className="flex items-center gap-2.5 min-w-0">
                                    <div
                                      className="relative w-9 h-9 rounded-xl flex items-center justify-center text-[17px] shrink-0 transition-transform duration-250 group-hover:scale-105 group-hover:-rotate-3"
                                      style={{
                                        background: isDay
                                          ? `linear-gradient(145deg, #ffffff 0%, ${slot.color}1e 100%)`
                                          : `linear-gradient(145deg, ${slot.color}32 0%, rgba(7,25,31,0.85) 100%)`,
                                        border: `1px solid ${slot.color}${isDay ? '42' : '55'}`,
                                        boxShadow: isDay
                                          ? `0 5px 12px -4px ${slot.color}38, inset 0 1px 0 rgba(255,255,255,0.95)`
                                          : `0 5px 14px -4px ${slot.color}48, inset 0 1px 0 rgba(255,255,255,0.12)`,
                                      }}
                                    >
                                      <span>{slot.icon}</span>
                                    </div>

                                    <div className="min-w-0">
                                      <div className="flex items-center gap-1.5 text-[10.5px] font-bold font-mono tabular-nums">
                                        <span
                                          className="inline-flex items-center gap-1 tracking-tight shrink-0"
                                          style={{ color: isDay ? slot.color : undefined }}
                                        >
                                          <span
                                            aria-hidden="true"
                                            className="w-1.5 h-1.5 rounded-full shrink-0"
                                            style={{ backgroundColor: slot.color }}
                                          />
                                          <span className={isDay ? '' : 'text-amber-300'}>
                                            {isBn ? `পর্ব ${phaseNum}` : `Phase ${phaseNum}`}
                                          </span>
                                        </span>
                                        <span aria-hidden="true" className="opacity-30">·</span>
                                        <span className={`truncate ${isDay ? 'text-slate-500' : 'text-teal-200/70'}`}>
                                          {durLabel}
                                        </span>
                                      </div>

                                      <div className={`text-[10.5px] font-bold mt-0.5 truncate ${isDay ? 'text-amber-800/90' : 'text-amber-300/95'}`}>
                                        {locSlot.timeSpan}
                                      </div>
                                    </div>
                                  </div>

                                  {isLive && (
                                    <span
                                      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[9.5px] font-black tracking-wide shrink-0 border ${
                                        isDay
                                          ? 'bg-emerald-600 text-white border-emerald-700/20'
                                          : 'bg-emerald-400/20 text-emerald-200 border-emerald-400/40'
                                      }`}
                                    >
                                      <span className="relative flex h-1.5 w-1.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-80" />
                                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-300" />
                                      </span>
                                      {isBn ? 'এখন' : 'LIVE'}
                                    </span>
                                  )}
                                </div>

                                {/* Crisp Compact Title + 2-Line Preview */}
                                <div className="relative z-10 space-y-1">
                                  <h4
                                    className={`text-[13.5px] font-black leading-snug tracking-tight line-clamp-2 transition-colors duration-200 ${
                                      isDay
                                        ? 'text-slate-900 group-hover:text-[#006A4E]'
                                        : 'text-white group-hover:text-emerald-300'
                                    }`}
                                  >
                                    {locSlot.title}
                                  </h4>
                                  <p className={`text-[11px] leading-[1.45] line-clamp-2 ${isDay ? 'text-slate-600' : 'text-slate-300/80'}`}>
                                    {locSlot.summary}
                                  </p>
                                </div>

                                {/* Slim Luxury Footer Strip */}
                                <div
                                  className={`relative z-10 pt-2 border-t flex items-center justify-between gap-1.5 text-[10px] font-semibold ${
                                    isDay ? 'border-slate-200/75 text-slate-500' : 'border-white/[0.08] text-teal-200/70'
                                  }`}
                                >
                                  <div className="flex items-center gap-2 truncate font-mono tabular-nums">
                                    <span className="inline-flex items-center gap-0.5">
                                      <Sparkles className={`w-3 h-3 ${isDay ? 'text-amber-600/80' : 'text-amber-300/80'}`} />
                                      <span>
                                        {isBn
                                          ? `${toBnDigits(locSlot.actions.length)}টি`
                                          : `${locSlot.actions.length}`}
                                      </span>
                                    </span>

                                    {slot.dua && (
                                      <span className={`inline-flex items-center gap-0.5 ${isDay ? 'text-emerald-700' : 'text-emerald-300'}`}>
                                        <Heart className="w-2.5 h-2.5" />
                                        <span>{isBn ? 'দোয়া' : 'Dua'}</span>
                                      </span>
                                    )}

                                    {locSlot.hadith && (
                                      <span className="inline-flex items-center gap-0.5">
                                        <BookOpen className="w-2.5 h-2.5 opacity-75" />
                                        <span>{isBn ? 'হাদিস' : 'Hadith'}</span>
                                      </span>
                                    )}
                                  </div>

                                  <span
                                    className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-lg text-[10px] font-extrabold shrink-0 border transition-all duration-200 ${
                                      isDay
                                        ? 'bg-emerald-50/90 text-[#006A4E] border-emerald-200/80 group-hover:bg-[#006A4E] group-hover:text-white group-hover:border-[#006A4E]'
                                        : 'bg-emerald-400/10 text-emerald-300 border-emerald-400/30 group-hover:bg-emerald-400 group-hover:text-[#04211a] group-hover:border-emerald-300'
                                    }`}
                                  >
                                    <span>{isBn ? 'বিস্তারিত' : 'Open'}</span>
                                    <ArrowRight className="w-2.5 h-2.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </section>
                    );
                  })}
              </div>
            </div>
          ) : (
            /* DETAIL READER MODE: Full-Width Immersive View Opened on Clicking Any Phase Card */
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Top Reader Back & Stepper Navigation Bar */}
              <div
                className={`p-3.5 sm:p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-3 ${
                  isDay ? 'bg-emerald-50/75 border-emerald-200/90 text-slate-900' : 'bg-[#0b272e] border-[#184853] text-white'
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    setOpenedSlotId(null);
                    if (soundEnabled) soundHaptics.playTap();
                  }}
                  className="min-h-[40px] flex items-center gap-1.5 text-xs font-extrabold px-3.5 py-2 rounded-xl bg-[#006A4E] text-white hover:bg-[#00553e] cursor-pointer transition active:scale-95 shadow-xs"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{isBn ? 'সকল ১৪টি সময় পর্ব' : 'All 14 Phases'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleStepSlot(-1)}
                    className={`min-h-[40px] flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer border active:scale-95 ${
                      isDay
                        ? 'bg-white border-teal-200 text-teal-900 hover:bg-teal-50'
                        : 'bg-[#071b20] border-[#194b57] text-teal-200 hover:bg-[#10343d]'
                    }`}
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>{isBn ? 'আগের পর্ব' : 'Prev'}</span>
                  </button>
                  <span className={`text-xs font-mono font-bold tabular-nums px-1.5 ${isDay ? 'text-emerald-900' : 'text-amber-300'}`}>
                    {isBn
                      ? `${toBnDigits(activeSlotIndex + 1)} / ${toBnDigits(NOBI_24_TIME_SLOTS.length)}`
                      : `${activeSlotIndex + 1} / ${NOBI_24_TIME_SLOTS.length}`}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleStepSlot(1)}
                    className={`min-h-[40px] flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer border active:scale-95 ${
                      isDay
                        ? 'bg-white border-teal-200 text-teal-900 hover:bg-teal-50'
                        : 'bg-[#071b20] border-[#194b57] text-teal-200 hover:bg-[#10343d]'
                    }`}
                  >
                    <span>{isBn ? 'পরের পর্ব' : 'Next'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Full-Width Active Slot Detailed Inspection Card */}
              <div
                className={`relative overflow-hidden p-5 sm:p-7 rounded-3xl border shadow-sm space-y-6 transition-colors ${
                  isDay ? 'bg-white border-slate-200/90' : 'bg-[#0a2026] border-[#153c45]'
                }`}
              >
                {/* Top Phase Accent Hairline */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-[3px]"
                  style={{ backgroundColor: activeSlot.color }}
                />

                {/* Header with Title and Actions */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-slate-200/70 dark:border-[#153c45]">
                  <div className="flex items-start gap-3.5">
                    <div
                      className="w-13 h-13 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                      style={{
                        backgroundColor: `${activeSlot.color}1a`,
                        border: `1px solid ${activeSlot.color}44`,
                      }}
                    >
                      {activeSlot.icon}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap text-xs font-semibold">
                        <span className="font-mono font-bold tabular-nums" style={{ color: isDay ? activeSlot.color : '#fcd34d' }}>
                          {isBn ? `পর্ব ${toBnDigits(activeSlotIndex + 1)}` : `Phase ${activeSlotIndex + 1}`}
                        </span>
                        <span aria-hidden="true" className="opacity-35">·</span>
                        <span className={isDay ? 'text-slate-600' : 'text-teal-200/85'}>
                          {locActiveSlot.categoryLabel}
                        </span>
                        <span aria-hidden="true" className="opacity-35">·</span>
                        <span className={`font-mono tabular-nums ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                          {formatDurationLabel(activeSlot.startHour, activeSlot.endHour, isBn)}
                        </span>
                        {activeSlot.id === currentLiveSlot.id && (
                          <>
                            <span aria-hidden="true" className="opacity-35">·</span>
                            <span className="font-black text-emerald-600 dark:text-emerald-400">
                              {isBn ? 'এখন চলছে' : 'LIVE NOW'}
                            </span>
                          </>
                        )}
                      </div>
                      <h3 className={`text-xl sm:text-2xl font-black tracking-tight leading-snug ${isDay ? 'text-slate-900' : 'text-white'}`}>
                        {locActiveSlot.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-bold text-amber-600 dark:text-amber-400">
                        {locActiveSlot.timeSpan}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 flex-wrap justify-start sm:justify-end">
                    <ShareDownloadButtons
                      variant="compact"
                      selectedLanguage={lang}
                      themeMode={themeMode}
                      onShare={() => openShareModal(buildSlotShareContent(activeSlot, activeSlotIndex), 'share')}
                      onDownload={() => openShareModal(buildSlotShareContent(activeSlot, activeSlotIndex), 'download')}
                    />
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
                  className={`p-4 sm:p-5 rounded-2xl border text-sm leading-relaxed font-medium ${
                    isDay
                      ? 'bg-[#f4faf7] border-emerald-200/80 text-emerald-950'
                      : 'bg-emerald-950/30 border-emerald-800/40 text-emerald-100'
                  }`}
                >
                  {locActiveSlot.summary}
                </div>

                {/* Numbered Action Points (2-column manuscript grid on desktop) */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className={`text-sm font-black tracking-tight ${isDay ? 'text-slate-900' : 'text-white'}`}>
                      {strings.wheel.sunnahActions}
                    </h4>
                    <span className={`text-xs font-mono font-bold tabular-nums ${isDay ? 'text-emerald-700' : 'text-emerald-400'}`}>
                      {isBn ? `${toBnDigits(locActiveSlot.actions.length)}টি আমল` : `${locActiveSlot.actions.length} steps`}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {locActiveSlot.actions.map((act, idx) => (
                      <div
                        key={idx}
                        className={`p-3.5 rounded-2xl border flex items-start gap-3 text-xs sm:text-sm leading-relaxed ${
                          isDay ? 'bg-slate-50/75 border-slate-200/80 text-slate-700' : 'bg-[#07191e] border-[#133841] text-slate-200'
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
                    className={`p-4 sm:p-5 rounded-2xl border text-xs sm:text-sm space-y-2 ${
                      isDay
                        ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                        : 'bg-amber-950/20 border-amber-800/40 text-amber-200'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400">
                      <BookMarked className="w-4 h-4" />
                      <span>{strings.wheel.hadithQuote}</span>
                    </div>
                    <p className="italic leading-relaxed font-serif text-sm sm:text-[15px]">"{locActiveSlot.hadith}"</p>
                    {activeSlot.hadithRef && (
                      <div className="text-xs font-semibold text-right opacity-80">
                        — {activeSlot.hadithRef}
                      </div>
                    )}
                  </div>
                )}

                {/* Masnun Dua If Applicable */}
                {activeSlot.dua && (
                  <div
                    className={`p-4 sm:p-5 rounded-2xl border space-y-3 ${
                      isDay
                        ? 'bg-teal-50/70 border-teal-200 text-teal-950'
                        : 'bg-[#0e2c33] border-[#184954] text-teal-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-bold text-teal-800 dark:text-teal-300">
                        {strings.wheel.duaOfSlot}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handlePlaySpeech(activeSlot.dua!.arabic, `dua_${activeSlot.id}`, true)}
                          className="p-2 rounded-xl hover:bg-black/10 dark:hover:bg-white/10 transition cursor-pointer"
                          title={strings.duas.listenDua}
                        >
                          <Volume2 className="w-4 h-4 text-teal-700 dark:text-teal-300" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCopyText(activeSlot.dua!.arabic, `dua_${activeSlot.id}`)}
                          className="p-2 rounded-xl hover:bg-black/10 dark:hover:bg-white/10 transition cursor-pointer"
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

                    <div dir="rtl" className="text-xl sm:text-2xl font-arabic font-bold text-right leading-[2.2] tracking-wide">
                      {activeSlot.dua.arabic}
                    </div>
                    <div className="text-xs sm:text-sm italic opacity-85">
                      {activeSlot.dua.transliteration}
                    </div>
                    <div className="text-xs sm:text-sm font-medium border-t border-teal-300/40 dark:border-teal-700/40 pt-2.5">
                      {locActiveSlot.duaTranslation}
                    </div>
                  </div>
                )}

                {/* Bottom Book-Like Prev / Next Phase Switcher Cards */}
                <div className={`pt-4 border-t grid grid-cols-1 sm:grid-cols-2 gap-3 ${isDay ? 'border-slate-100' : 'border-[#153c45]'}`}>
                  {(() => {
                    const prevIdx = (activeSlotIndex - 1 + NOBI_24_TIME_SLOTS.length) % NOBI_24_TIME_SLOTS.length;
                    const nextIdx = (activeSlotIndex + 1) % NOBI_24_TIME_SLOTS.length;
                    const prevSlot = NOBI_24_TIME_SLOTS[prevIdx];
                    const nextSlot = NOBI_24_TIME_SLOTS[nextIdx];
                    const locPrev = getLocalizedSlot(prevSlot, lang);
                    const locNext = getLocalizedSlot(nextSlot, lang);
                    return (
                      <>
                        <button
                          type="button"
                          onClick={() => openPhaseDetail(prevSlot.id, true)}
                          className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition cursor-pointer group ${
                            isDay
                              ? 'bg-slate-50/70 hover:bg-emerald-50/70 border-slate-200 hover:border-emerald-300'
                              : 'bg-[#07191e] hover:bg-[#0d2c34] border-[#133841] hover:border-emerald-500/40'
                          }`}
                        >
                          <ChevronLeft className="w-4 h-4 shrink-0 opacity-60 group-hover:-translate-x-0.5 transition-transform" />
                          <div className="min-w-0">
                            <div className="text-[10px] font-bold opacity-65">
                              {isBn ? `আগের পর্ব (${toBnDigits(prevIdx + 1)})` : `Previous (${prevIdx + 1})`}
                            </div>
                            <div className="text-xs sm:text-sm font-bold truncate">
                              {prevSlot.icon} {locPrev.title}
                            </div>
                          </div>
                        </button>
                        <button
                          type="button"
                          onClick={() => openPhaseDetail(nextSlot.id, true)}
                          className={`p-3.5 rounded-2xl border text-right flex items-center justify-end gap-3 transition cursor-pointer group ${
                            isDay
                              ? 'bg-slate-50/70 hover:bg-emerald-50/70 border-slate-200 hover:border-emerald-300'
                              : 'bg-[#07191e] hover:bg-[#0d2c34] border-[#133841] hover:border-emerald-500/40'
                          }`}
                        >
                          <div className="min-w-0">
                            <div className="text-[10px] font-bold opacity-65">
                              {isBn ? `পরের পর্ব (${toBnDigits(nextIdx + 1)})` : `Next (${nextIdx + 1})`}
                            </div>
                            <div className="text-xs sm:text-sm font-bold truncate">
                              {nextSlot.icon} {locNext.title}
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 shrink-0 opacity-60 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          )}
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

                      <div className="shrink-0 flex items-center gap-1.5 flex-wrap">
                        <ShareDownloadButtons
                          variant="compact"
                          selectedLanguage={lang}
                          themeMode={themeMode}
                          onShare={() => openShareModal(buildSlotShareContent(slot, globalIdx), 'share')}
                          onDownload={() => openShareModal(buildSlotShareContent(slot, globalIdx), 'download')}
                        />
                        <button
                          type="button"
                          onClick={() => openPhaseDetail(slot.id, true)}
                          className={`min-h-[36px] px-3 py-1 rounded-xl border text-[11px] font-bold transition cursor-pointer ${
                            isDay
                              ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                              : 'bg-[#102d34] hover:bg-[#17404a] border-[#1c4d57] text-emerald-300'
                          }`}
                        >
                          {isBn ? 'বিস্তারিত দেখুন' : 'Inspect'}
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

                    <div className="shrink-0 flex items-center gap-2">
                      <ShareDownloadButtons
                        variant="compact"
                        selectedLanguage={lang}
                        themeMode={themeMode}
                        onShare={() => openShareModal(buildChapterShareContent(chapter, idx), 'share')}
                        onDownload={() => openShareModal(buildChapterShareContent(chapter, idx), 'download')}
                      />
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

                        <div className="flex items-center gap-1.5 flex-wrap">
                          <ShareDownloadButtons
                            variant="card"
                            selectedLanguage={lang}
                            themeMode={themeMode}
                            onShare={() => openShareModal(buildChapterShareContent(chapter, idx), 'share')}
                            onDownload={() => openShareModal(buildChapterShareContent(chapter, idx), 'download')}
                          />
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

                      <div className="flex items-center gap-1.5 shrink-0 flex-wrap justify-end">
                        <ShareDownloadButtons
                          variant="compact"
                          selectedLanguage={lang}
                          themeMode={themeMode}
                          onShare={() => openShareModal(buildDuaShareContent(dua), 'share')}
                          onDownload={() => openShareModal(buildDuaShareContent(dua), 'download')}
                        />
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
              <div className="flex items-center justify-center md:justify-between gap-2 flex-wrap">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#006A4E] dark:text-emerald-400">
                  <Flame className="w-4 h-4 text-amber-500" />
                  <span>{strings.tracker.title}</span>
                </div>
                <ShareDownloadButtons
                  variant="card"
                  selectedLanguage={lang}
                  themeMode={themeMode}
                  onShare={() => openFullRoutineShare('share')}
                  onDownload={() => openFullRoutineShare('download')}
                />
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

      <ContentShareModal
        isOpen={Boolean(shareModalContent)}
        onClose={() => setShareModalContent(null)}
        content={shareModalContent}
        selectedLanguage={lang}
        soundEnabled={soundEnabled}
        initialFocus={shareModalFocus}
      />
    </div>
  );
};

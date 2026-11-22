import React, { useState, useMemo, useRef } from 'react';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  Volume2,
  VolumeX,
  BookMarked,
  Moon,
  Sun,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  Compass,
  Clock,
  Search,
} from 'lucide-react';
import { ThemeMode, ZikrLanguage } from '../types';
import { soundHaptics } from '../utils/audioHaptics';
import { ShareableContent } from '../utils/shareDownload';
import { ShareDownloadButtons } from './ContentShareModal';
import {
  CORE_PRINCIPLE_PDF,
  SACRED_MONTHS_INTRO_PDF,
  REGULAR_SUNNAH_COMMITMENTS,
  WEEKLY_PROPHETIC_AMAL,
  MONTHLY_GENERAL_RULES,
  DAILY_PDF_SUMMARY_SNAPSHOT,
  PROPHETIC_12_MONTHS,
  PropheticMonthItem,
} from '../data/nobi12MonthsData';

interface PropheticYearCalendarSectionProps {
  themeMode: ThemeMode;
  selectedLanguage: ZikrLanguage;
  soundEnabled: boolean;
  onPlaySpeech: (text: string, id: string, isArabic?: boolean) => void;
  isPlayingAudio: string | null;
  onCopyText: (text: string, id: string) => void;
  copiedItemId: string | null;
  onOpenShareModal: (content: ShareableContent, focus: 'share' | 'download') => void;
}

const toBnDigits = (val: string | number): string =>
  String(val).replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]);

const MONTH_DATE_WINDOWS: Array<{ id: string; start: string; end: string }> = [
  { id: 'jumadal_ukhra', start: '2026-11-11', end: '2026-12-09' },
  { id: 'rajab', start: '2026-12-10', end: '2027-01-08' },
  { id: 'shaban', start: '2027-01-09', end: '2027-02-07' },
  { id: 'ramadan', start: '2027-02-08', end: '2027-03-08' },
  { id: 'shawwal', start: '2027-03-09', end: '2027-04-07' },
  { id: 'dhul_qidah', start: '2027-04-08', end: '2027-05-06' },
  { id: 'dhul_hijjah', start: '2027-05-07', end: '2027-06-05' },
  { id: 'muharram', start: '2027-06-06', end: '2027-07-04' },
  { id: 'safar', start: '2027-07-05', end: '2027-08-02' },
  { id: 'rabiul_awwal', start: '2027-08-03', end: '2027-09-01' },
  { id: 'rabius_sani', start: '2027-09-02', end: '2027-09-30' },
  { id: 'jumadal_ula', start: '2027-10-01', end: '2027-10-31' },
];

function detectCurrentCalendarMonthId(): string {
  const todayIso = new Date().toISOString().slice(0, 10);
  const found = MONTH_DATE_WINDOWS.find((w) => todayIso >= w.start && todayIso <= w.end);
  return found ? found.id : 'jumadal_ukhra';
}

export const PropheticYearCalendarSection: React.FC<PropheticYearCalendarSectionProps> = ({
  themeMode,
  selectedLanguage,
  soundEnabled,
  onPlaySpeech,
  isPlayingAudio,
  onCopyText,
  copiedItemId,
  onOpenShareModal,
}) => {
  const isDay = themeMode === 'day';
  const lang = selectedLanguage || 'bn';
  const isBn = lang === 'bn';

  const currentOngoingMonthId = useMemo(() => detectCurrentCalendarMonthId(), []);

  const [subView, setSubView] = useState<'months' | 'weekly' | 'monthly_rules' | 'daily_pdf'>('months');
  const [selectedMonthId, setSelectedMonthId] = useState<string>(currentOngoingMonthId);
  const [monthFilter, setMonthFilter] = useState<'all' | 'sacred' | 'fasting' | 'caution'>('all');
  const [monthSearch, setMonthSearch] = useState<string>('');
  const [selectedWeekDayId, setSelectedWeekDayId] = useState<string>(() => {
    const dayIdx = new Date().getDay(); // 0=Sun..6=Sat
    const map = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    return map[dayIdx] || 'fri';
  });
  const [expandedDailyId, setExpandedDailyId] = useState<string>('pdf_late_night');
  const [showPrinciplePanel, setShowPrinciplePanel] = useState<boolean>(false);

  // Interactive "Pick 2-3 regular Sunnahs" saved in localStorage
  const [chosenCommitments, setChosenCommitments] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('nobi_yearly_commitments');
      if (saved) return JSON.parse(saved);
    } catch {}
    return { commit_12_sunnah: true, commit_ayyamul_beedh: true };
  });

  const detailCardRef = useRef<HTMLDivElement | null>(null);

  const toggleCommitment = (id: string) => {
    setChosenCommitments((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('nobi_yearly_commitments', JSON.stringify(next));
      } catch {}
      if (soundEnabled) soundHaptics.playTap();
      return next;
    });
  };

  const chosenCount = useMemo(
    () => Object.values(chosenCommitments).filter(Boolean).length,
    [chosenCommitments]
  );

  const filteredMonths = useMemo(() => {
    return PROPHETIC_12_MONTHS.filter((m) => {
      if (monthFilter === 'sacred' && !m.isSacredMonth) return false;
      if (monthFilter === 'fasting' && !m.hasSpecialFasting) return false;
      if (monthFilter === 'caution' && !m.authenticityCautionBn) return false;

      if (!monthSearch.trim()) return true;
      const q = monthSearch.toLowerCase();
      return (
        m.nameBn.toLowerCase().includes(q) ||
        m.nameEn.toLowerCase().includes(q) ||
        m.coreAmalBn.toLowerCase().includes(q) ||
        m.coreAmalEn.toLowerCase().includes(q) ||
        m.topics.some(
          (t) =>
            t.titleBn.toLowerCase().includes(q) ||
            t.pointsBn.some((p) => p.toLowerCase().includes(q)) ||
            t.reference.toLowerCase().includes(q)
        )
      );
    });
  }, [monthFilter, monthSearch]);

  const activeMonthIndex = useMemo(() => {
    const idx = PROPHETIC_12_MONTHS.findIndex((m) => m.id === selectedMonthId);
    return idx >= 0 ? idx : 0;
  }, [selectedMonthId]);

  const activeMonth = PROPHETIC_12_MONTHS[activeMonthIndex];

  const selectAndScrollMonth = (monthId: string, scrollToCard = true) => {
    setSelectedMonthId(monthId);
    setSubView('months');
    if (soundEnabled) soundHaptics.playTap();
    if (scrollToCard) {
      window.requestAnimationFrame(() => {
        detailCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    }
  };

  const stepMonth = (dir: -1 | 1) => {
    const nextIdx = (activeMonthIndex + dir + PROPHETIC_12_MONTHS.length) % PROPHETIC_12_MONTHS.length;
    setSelectedMonthId(PROPHETIC_12_MONTHS[nextIdx].id);
    if (soundEnabled) soundHaptics.playTap();
  };

  const selectedWeekDay = useMemo(
    () => WEEKLY_PROPHETIC_AMAL.find((d) => d.id === selectedWeekDayId) || WEEKLY_PROPHETIC_AMAL[6],
    [selectedWeekDayId]
  );

  const buildMonthShareContent = (m: PropheticMonthItem): ShareableContent => {
    const monthTitle = isBn ? m.nameBn : m.nameEn;
    const topicsText = m.topics
      .map((t) => {
        const pts = (isBn ? t.pointsBn : t.pointsEn).map((p, i) => `${i + 1}. ${p}`).join('\n');
        return `${isBn ? t.titleBn : t.titleEn}\n${pts}\n(${t.reference})`;
      })
      .join('\n\n');

    const caution = isBn ? m.authenticityCautionBn : m.authenticityCautionEn;
    const cautionText = caution ? `\n\n${caution.title}:\n${caution.points.join('\n')}\n(${caution.reference})` : '';

    return {
      id: `nobi12-month-${m.id}`,
      badge: isBn
        ? `নবীজির ১২ মাসের আমল · মাস ${toBnDigits(m.order)}/১২`
        : `Prophet's 12 Months · Month ${m.order}/12`,
      title: `${monthTitle} (${isBn ? m.hijriYearBn : m.hijriYearEn})`,
      subtitle: `${isBn ? m.approxStartBn : m.approxStartEn} · ${isBn ? m.coreAmalBn : m.coreAmalEn}`,
      arabic: m.specialDua?.arabic || m.nameAr,
      transliteration: m.specialDua ? (isBn ? m.specialDua.pronunciationBn : m.specialDua.pronunciationEn) : undefined,
      body: isBn ? m.headlineBn : m.headlineEn,
      highlights: m.topics.flatMap((t) => (isBn ? t.pointsBn : t.pointsEn)).slice(0, 4),
      meta: [
        { label: isBn ? 'শুরু' : 'Starts', value: isBn ? m.approxStartBn : m.approxStartEn },
        ...(m.ayyamulBeedhBn
          ? [{ label: isBn ? 'আইয়ামে বীয' : 'Ayyamul Beedh', value: isBn ? m.ayyamulBeedhBn : m.ayyamulBeedhEn || '' }]
          : []),
      ],
      reference: m.topics[0]?.reference,
      fullDocumentText: `${monthTitle} (${isBn ? m.hijriYearBn : m.hijriYearEn})\n${isBn ? m.approxStartBn : m.approxStartEn}\n\n${topicsText}${cautionText}`,
      fileNamePrefix: `Nobi-12-Months-${m.order}-${m.nameEn}`,
    };
  };

  const openFull12MonthShare = (focus: 'share' | 'download') => {
    const monthsText = PROPHETIC_12_MONTHS.map((m) => {
      const head = `${m.order}. ${isBn ? m.nameBn : m.nameEn} (${isBn ? m.approxStartBn : m.approxStartEn}) — ${isBn ? m.coreAmalBn : m.coreAmalEn}`;
      const body = m.topics
        .map((t) => `  • ${isBn ? t.titleBn : t.titleEn}: ${(isBn ? t.pointsBn : t.pointsEn).join(' ')} [${t.reference}]`)
        .join('\n');
      return `${head}\n${body}`;
    }).join('\n\n');

    onOpenShareModal(
      {
        id: 'nobi12-full-calendar',
        badge: isBn ? 'নবীজির ১২ মাসের সুন্নাহ ক্যালেন্ডার' : "Prophet's 12-Month Sunnah Calendar",
        title: isBn ? 'রাসূলুল্লাহ ﷺ-এর ১২ মাসের আমল (১৪৪৮–১৪৪৯ হি.)' : "12 Months of the Prophet's ﷺ Deeds (1448–1449 AH)",
        subtitle: isBn ? CORE_PRINCIPLE_PDF.titleBn : CORE_PRINCIPLE_PDF.titleEn,
        body: isBn
          ? 'দিনের রুটিন, সপ্তাহের আমল, প্রতি মাসের নিয়ম এবং ১২ হিজরি মাসের পূর্ণাঙ্গ সুন্নাহ ক্যালেন্ডার সহিহ হাদিস নম্বরসহ।'
          : 'Complete Prophetic calendar covering daily routine, weekly Sunnah, monthly rules & all 12 Hijri months with Sahih Hadith citations.',
        highlights: PROPHETIC_12_MONTHS.slice(0, 5).map(
          (m) => `${isBn ? m.nameBn : m.nameEn}: ${isBn ? m.coreAmalBn : m.coreAmalEn}`
        ),
        meta: [
          { label: isBn ? 'হিজরি বছর' : 'Hijri Year', value: isBn ? '১৪৪৮–১৪৪৯ হি.' : '1448–1449 AH' },
          { label: isBn ? 'মাস' : 'Months', value: isBn ? '১২টি' : '12 Months' },
        ],
        reference: isBn ? 'সহিহ বুখারি, সহিহ মুসলিম ও সুনান (সীরাহ পড়ি সিরিজ)' : 'Sahih Bukhari, Sahih Muslim & Sunan',
        fullDocumentText: `${CORE_PRINCIPLE_PDF.titleBn}\n${CORE_PRINCIPLE_PDF.pointsBn.join('\n')}\n\n${monthsText}`,
        fileNamePrefix: 'Rasulullah-12-Months-Calendar',
      },
      focus
    );
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      {/* 1. EDITORIAL HEADER & CONSISTENCY PRINCIPLE BANNER */}
      <div
        className={`relative overflow-hidden rounded-3xl p-5 sm:p-6 border shadow-sm ${
          isDay
            ? 'bg-gradient-to-br from-[#f2faf6] via-white to-[#fffbeb] border-emerald-200/90 text-slate-900'
            : 'bg-gradient-to-br from-[#072126] via-[#0a2930] to-[#081c22] border-[#174651] text-white'
        }`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#006A4E] via-amber-400 to-emerald-500 opacity-80"
        />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className={`flex flex-wrap items-center gap-2 text-xs font-bold ${isDay ? 'text-emerald-800' : 'text-amber-300'}`}>
              <span>{isBn ? 'হিজরি ১৪৪৮–১৪৪৯ ক্যালেন্ডার' : 'Hijri 1448–1449 Calendar'}</span>
              <span aria-hidden="true" className="opacity-35">·</span>
              <span>{isBn ? '১২ মাসের আমল' : '12-Month Sunnah'}</span>
              <span aria-hidden="true" className="opacity-35">·</span>
              <span>{isBn ? 'সহিহ হাদিস নম্বরসহ' : 'With Sahih Hadith Citations'}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-balance">
              {isBn ? 'রাসূলুল্লাহ ﷺ-এর ১২ মাসের আমল ও সুন্নাহ ক্যালেন্ডার' : "Prophet Muhammad's ﷺ 12-Month Calendar & Sunnah Cycle"}
            </h2>

            <p className={`text-xs sm:text-sm leading-relaxed ${isDay ? 'text-slate-600' : 'text-slate-300'}`}>
              {isBn
                ? 'দিনের কোন সময়, সপ্তাহের কোন দিন, মাসের কোন তারিখে ও বছরের কোন মাসে নবীজি ﷺ কী আমল করতেন — সহিহ হাদিসের আলোকে।'
                : 'Authentic prophetic practices organized by hour of the day, day of the week, monthly lunar milestones, and all 12 Hijri months.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                setShowPrinciplePanel((v) => !v);
                if (soundEnabled) soundHaptics.playTap();
              }}
              className={`min-h-[42px] px-3.5 py-2 rounded-xl text-xs font-bold border transition cursor-pointer inline-flex items-center gap-1.5 active:scale-95 ${
                showPrinciplePanel
                  ? 'bg-[#006A4E] text-white border-emerald-500'
                  : isDay
                  ? 'bg-white border-emerald-200 text-emerald-900 hover:bg-emerald-50'
                  : 'bg-[#0d3038] border-[#1d5460] text-amber-200 hover:bg-[#133e48]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>
                {isBn
                  ? `নিয়মিত আমল বাছুন (${toBnDigits(chosenCount)}/৩)`
                  : `Pick 2–3 Deeds (${chosenCount}/3)`}
              </span>
            </button>

            <ShareDownloadButtons
              variant="card"
              selectedLanguage={lang}
              themeMode={themeMode}
              onShare={() => openFull12MonthShare('share')}
              onDownload={() => openFull12MonthShare('download')}
            />
          </div>
        </div>

        {/* Core Principle Strip (Always concise & readable) */}
        <div
          className={`mt-4 pt-3.5 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs ${
            isDay ? 'border-emerald-200/70 text-emerald-950' : 'border-white/10 text-emerald-100'
          }`}
        >
          <p className="font-medium leading-relaxed">
            <strong className={isDay ? 'text-[#006A4E]' : 'text-amber-300'}>
              {isBn ? `${CORE_PRINCIPLE_PDF.titleBn}: ` : `${CORE_PRINCIPLE_PDF.titleEn}: `}
            </strong>
            {isBn
              ? '“আল্লাহর কাছে সবচেয়ে প্রিয় আমল সেটাই, যা নিয়মিত করা হয়, যদিও তা অল্প হয়।” একসাথে সব নয়, ২–৩টি আমল বেছে নিয়মিত শুরু করুন।'
              : '“The most beloved deeds to Allah are those done consistently, even if small.” Start with 2–3 deeds regularly.'}
          </p>
          <span className={`font-mono text-[11px] font-bold shrink-0 ${isDay ? 'text-slate-500' : 'text-teal-200/75'}`}>
            {CORE_PRINCIPLE_PDF.reference.split('·')[0].trim()}
          </span>
        </div>

        {/* Expandable Interactive 2-3 Regular Sunnah Commitment Picker */}
        {showPrinciplePanel && (
          <div
            className={`mt-4 pt-4 border-t space-y-3 animate-in fade-in duration-200 ${
              isDay ? 'border-emerald-200/70' : 'border-white/10'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-black">
                {isBn
                  ? 'ক্যালেন্ডার থেকে আপনার নিয়মিত ২–৩টি আমল নির্বাচন করুন (স্বয়ংক্রিয়ভাবে সংরক্ষিত)'
                  : 'Select 2–3 Regular Sunnah Commitments (Saved Automatically)'}
              </h3>
              <span className={`text-xs font-mono font-bold tabular-nums ${isDay ? 'text-emerald-700' : 'text-amber-300'}`}>
                {isBn ? `নির্বাচিত: ${toBnDigits(chosenCount)}টি` : `Selected: ${chosenCount}`}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {REGULAR_SUNNAH_COMMITMENTS.map((item) => {
                const checked = Boolean(chosenCommitments[item.id]);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleCommitment(item.id)}
                    className={`min-h-[48px] p-3 rounded-2xl border text-left flex items-start gap-2.5 transition cursor-pointer ${
                      checked
                        ? isDay
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                          : 'bg-[#0e3942] border-emerald-400/70 text-white'
                        : isDay
                        ? 'bg-white border-slate-200 text-slate-700 hover:border-emerald-300'
                        : 'bg-[#06181d] border-[#153e47] text-slate-300 hover:border-[#225d6a]'
                    }`}
                  >
                    <CheckCircle2
                      className={`w-4 h-4 mt-0.5 shrink-0 ${
                        checked ? (isDay ? 'text-[#006A4E]' : 'text-emerald-400') : 'opacity-35'
                      }`}
                    />
                    <div className="min-w-0 space-y-0.5">
                      <div className="text-xs font-bold leading-snug">
                        {isBn ? item.titleBn : item.titleEn}
                      </div>
                      <div className="text-[11px] opacity-70 font-mono">
                        {isBn ? item.cadenceBn : item.cadenceEn} · {item.reference}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 2. SUB-VIEW SEGMENTED SWITCHER */}
      <div
        className={`grid grid-cols-2 sm:flex sm:items-center gap-1.5 p-1.5 rounded-2xl border ${
          isDay ? 'bg-slate-100/90 border-slate-200' : 'bg-[#07181d] border-[#143942]'
        }`}
      >
        {[
          {
            id: 'months' as const,
            label: isBn ? '১২ মাসের ক্যালেন্ডার' : '12-Month Calendar',
            count: isBn ? '১২' : '12',
            icon: Calendar,
          },
          {
            id: 'weekly' as const,
            label: isBn ? 'সপ্তাহের আমল (শনি–শুক্র)' : 'Weekly Sunnah',
            count: isBn ? '৭' : '7',
            icon: Compass,
          },
          {
            id: 'monthly_rules' as const,
            label: isBn ? 'মাসিক আমল ও চাঁদ' : 'Monthly & Crescent',
            count: isBn ? '৩' : '3',
            icon: Moon,
          },
          {
            id: 'daily_pdf' as const,
            label: isBn ? 'দিনের রুটিন সংক্ষেপ' : 'Daily Snapshot',
            count: isBn ? '৯' : '9',
            icon: Clock,
          },
        ].map((item) => {
          const IconComp = item.icon;
          const active = subView === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setSubView(item.id);
                if (soundEnabled) soundHaptics.playTap();
              }}
              className={`min-h-[42px] px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-center sm:justify-start gap-1.5 transition cursor-pointer whitespace-nowrap ${
                active
                  ? 'bg-[#006A4E] text-white shadow-xs'
                  : isDay
                  ? 'text-slate-600 hover:bg-white/80 hover:text-slate-900'
                  : 'text-teal-200/80 hover:bg-[#0e2d35] hover:text-white'
              }`}
            >
              <IconComp className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{item.label}</span>
              <span className={`font-mono text-[11px] tabular-nums ${active ? 'text-amber-200' : 'opacity-65'}`}>
                {item.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* SUB-VIEW 1: 12-MONTH HIJRI CALENDAR EXPLORER + DETAIL + TABLE             */}
      {/* ========================================================================= */}
      {subView === 'months' && (
        <div className="space-y-6">
          {/* Sacred Months Educational Ribbon + Filter & Search */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {[
                { id: 'all' as const, label: isBn ? 'সকল ১২ মাস' : 'All 12 Months' },
                { id: 'sacred' as const, label: isBn ? '৪টি সম্মানিত মাস' : '4 Sacred Months' },
                { id: 'fasting' as const, label: isBn ? 'বিশেষ রোজা ও আমল' : 'Special Fasting' },
                { id: 'caution' as const, label: isBn ? 'সহিহ যাচাই সতর্কতা' : 'Authenticity Notes' },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => {
                    setMonthFilter(f.id);
                    if (soundEnabled) soundHaptics.playTap();
                  }}
                  className={`min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer shrink-0 whitespace-nowrap ${
                    monthFilter === f.id
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-xs'
                      : isDay
                      ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      : 'bg-[#092226] border-[#153e46] text-emerald-200 hover:bg-[#0e3036]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:w-72 shrink-0">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
              <input
                type="text"
                value={monthSearch}
                onChange={(e) => setMonthSearch(e.target.value)}
                placeholder={isBn ? 'মাস বা আমল খুঁজুন (যেমন: রজব, আশুরা)...' : 'Search month or amal...'}
                className={`w-full pl-9 pr-3 py-2 rounded-xl border text-xs font-medium outline-none transition ${
                  isDay
                    ? 'bg-white border-slate-200 focus:border-emerald-500 text-slate-800'
                    : 'bg-[#07181d] border-[#163f48] focus:border-emerald-400 text-white'
                }`}
              />
            </div>
          </div>

          {/* Interactive 12-Month Hijri Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
            {filteredMonths.map((m) => {
              const isSelected = m.id === activeMonth.id;
              const isOngoing = m.id === currentOngoingMonthId;
              const numLabel = isBn ? toBnDigits(String(m.order).padStart(2, '0')) : String(m.order).padStart(2, '0');

              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => selectAndScrollMonth(m.id, true)}
                  className={`group relative overflow-hidden rounded-2xl p-3.5 border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 active:scale-[0.985] ${
                    isSelected
                      ? isDay
                        ? 'bg-gradient-to-br from-[#006A4E] to-[#044e39] text-white border-emerald-600 shadow-md'
                        : 'bg-gradient-to-br from-[#0d3b43] to-[#062228] text-white border-emerald-400 shadow-md ring-1 ring-emerald-400/30'
                      : isDay
                      ? 'bg-white border-slate-200/90 hover:border-emerald-400 text-slate-900 shadow-2xs hover:-translate-y-0.5'
                      : 'bg-[#0a2026] border-[#153c45] hover:border-emerald-400/50 text-white hover:-translate-y-0.5'
                  }`}
                >
                  {/* Top Accent Line */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-[2.5px]"
                    style={{
                      background: isSelected ? '#fcd34d' : m.accentColor,
                      opacity: isSelected ? 1 : 0.75,
                    }}
                  />

                  <div className="flex items-center justify-between gap-1.5 text-[11px] font-mono tabular-nums">
                    <span className={`font-black ${isSelected ? 'text-amber-300' : isDay ? 'text-[#006A4E]' : 'text-emerald-400'}`}>
                      {isBn ? `মাস ${numLabel}` : `M-${numLabel}`}
                    </span>
                    <span className={`truncate ${isSelected ? 'text-emerald-100' : isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                      {isOngoing ? (isBn ? 'চলমান মাস' : 'Current') : isBn ? m.hijriYearBn.replace(' হিজরি', '') : m.hijriYearEn}
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex items-baseline justify-between gap-1">
                      <h3 className="text-sm sm:text-base font-black tracking-tight leading-snug truncate">
                        {isBn ? m.nameBn : m.nameEn}
                      </h3>
                      <span className={`font-arabic text-xs shrink-0 ${isSelected ? 'text-amber-200/90' : 'opacity-60'}`}>
                        {m.nameAr}
                      </span>
                    </div>
                    <div className={`text-[11px] font-medium truncate ${isSelected ? 'text-emerald-100/90' : isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                      {isBn ? m.approxStartBn : m.approxStartEn}
                    </div>
                  </div>

                  <div
                    className={`pt-2 border-t text-[11px] leading-snug line-clamp-2 ${
                      isSelected
                        ? 'border-white/15 text-amber-100'
                        : isDay
                        ? 'border-slate-100 text-slate-600'
                        : 'border-white/[0.08] text-slate-300'
                    }`}
                  >
                    {m.isSacredMonth && (
                      <span className={`font-bold ${isSelected ? 'text-amber-300' : isDay ? 'text-amber-700' : 'text-amber-400'}`}>
                        {isBn ? 'সম্মানিত মাস · ' : 'Sacred · '}
                      </span>
                    )}
                    {isBn ? m.coreAmalBn : m.coreAmalEn}
                  </div>
                </button>
              );
            })}
          </div>

          {filteredMonths.length === 0 && (
            <div
              className={`p-8 rounded-2xl border text-center text-sm ${
                isDay ? 'bg-white border-slate-200 text-slate-500' : 'bg-[#0a2026] border-[#153c45] text-slate-400'
              }`}
            >
              {isBn ? 'এই অনুসন্ধানে কোনো মাস পাওয়া যায়নি।' : 'No months matched your filter.'}
            </div>
          )}

          {/* DETAILED ACTIVE MONTH INSPECTOR */}
          <div
            ref={detailCardRef}
            className={`relative overflow-hidden rounded-3xl p-5 sm:p-7 border shadow-sm space-y-6 ${
              isDay ? 'bg-white border-slate-200/90' : 'bg-[#0a2026] border-[#153c45]'
            }`}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-[3px]"
              style={{ backgroundColor: activeMonth.accentColor }}
            />

            {/* Month Header + Prev/Next Stepper + Share */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-5 border-b border-slate-200/70 dark:border-[#153c45]">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                  <span className="font-mono font-bold tabular-nums" style={{ color: isDay ? activeMonth.accentColor : '#fcd34d' }}>
                    {isBn ? `মাস ${toBnDigits(activeMonth.order)}/১২` : `Month ${activeMonth.order}/12`}
                  </span>
                  <span aria-hidden="true" className="opacity-35">·</span>
                  <span className={isDay ? 'text-slate-600' : 'text-teal-200/80'}>
                    {isBn ? activeMonth.hijriYearBn : activeMonth.hijriYearEn}
                  </span>
                  <span aria-hidden="true" className="opacity-35">·</span>
                  <span className={`font-bold ${isDay ? 'text-amber-700' : 'text-amber-300'}`}>
                    {isBn ? activeMonth.approxStartBn : activeMonth.approxStartEn}
                  </span>
                  {activeMonth.isSacredMonth && (
                    <>
                      <span aria-hidden="true" className="opacity-35">·</span>
                      <span className="font-bold text-emerald-700 dark:text-emerald-300">
                        {isBn ? 'আশহুরে হুরুম (৪ সম্মানিত মাসের একটি)' : 'Sacred Month'}
                      </span>
                    </>
                  )}
                </div>

                <div className="flex flex-wrap items-baseline gap-3">
                  <h3 className={`text-2xl sm:text-3xl font-black tracking-tight ${isDay ? 'text-slate-900' : 'text-white'}`}>
                    {isBn ? activeMonth.nameBn : activeMonth.nameEn}
                  </h3>
                  <span className={`font-arabic text-xl sm:text-2xl font-bold ${isDay ? 'text-emerald-800/80' : 'text-amber-300/90'}`}>
                    {activeMonth.nameAr}
                  </span>
                </div>

                <p className={`text-sm font-medium ${isDay ? 'text-slate-600' : 'text-slate-300'}`}>
                  {isBn ? activeMonth.headlineBn : activeMonth.headlineEn}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <ShareDownloadButtons
                  variant="compact"
                  selectedLanguage={lang}
                  themeMode={themeMode}
                  onShare={() => onOpenShareModal(buildMonthShareContent(activeMonth), 'share')}
                  onDownload={() => onOpenShareModal(buildMonthShareContent(activeMonth), 'download')}
                />
                <button
                  type="button"
                  onClick={() => stepMonth(-1)}
                  className={`min-h-[38px] px-2.5 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1 cursor-pointer transition ${
                    isDay
                      ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      : 'bg-[#07191e] border-[#184550] text-teal-200 hover:bg-[#0e2d35]'
                  }`}
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>{isBn ? 'আগের মাস' : 'Prev'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => stepMonth(1)}
                  className={`min-h-[38px] px-2.5 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1 cursor-pointer transition ${
                    isDay
                      ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      : 'bg-[#07191e] border-[#184550] text-teal-200 hover:bg-[#0e2d35]'
                  }`}
                >
                  <span>{isBn ? 'পরের মাস' : 'Next'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Key Dates & Ayyamul Beedh Strip */}
            {(activeMonth.ayyamulBeedhBn || (activeMonth.keyDatesBn && activeMonth.keyDatesBn.length > 0)) && (
              <div
                className={`p-4 rounded-2xl border space-y-2 ${
                  isDay ? 'bg-emerald-50/70 border-emerald-200/80 text-emerald-950' : 'bg-[#071b20] border-[#16414b] text-emerald-100'
                }`}
              >
                <div className="text-xs font-black text-[#006A4E] dark:text-amber-300">
                  {isBn ? 'এই মাসের গুরুত্বপূর্ণ তারিখসমূহ' : 'Important Dates This Month'}
                </div>
                <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs sm:text-sm font-semibold">
                  {activeMonth.ayyamulBeedhBn && (
                    <div>
                      <span className="opacity-75">{isBn ? 'আইয়ামে বীয (১৩–১৫ হিজরি): ' : 'Ayyamul Beedh: '}</span>
                      <span className="font-mono font-bold tabular-nums">
                        {isBn ? activeMonth.ayyamulBeedhBn : activeMonth.ayyamulBeedhEn}
                      </span>
                    </div>
                  )}
                  {(isBn ? activeMonth.keyDatesBn : activeMonth.keyDatesEn)?.map((kd, i) => (
                    <div key={i} className="font-mono font-bold tabular-nums">
                      • {kd}
                    </div>
                  ))}
                </div>
                <div className="text-[11px] opacity-70">
                  {isBn ? SACRED_MONTHS_INTRO_PDF.calendarNoteBn : SACRED_MONTHS_INTRO_PDF.calendarNoteEn}
                </div>
              </div>
            )}

            {/* Topics & Hadith Citations */}
            <div className="space-y-5">
              {activeMonth.topics.map((topic, idx) => (
                <div
                  key={idx}
                  className={`p-4 sm:p-5 rounded-2xl border space-y-3 ${
                    isDay ? 'bg-slate-50/70 border-slate-200/80' : 'bg-[#07191e] border-[#133841]'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className={`text-sm sm:text-base font-black ${isDay ? 'text-slate-900' : 'text-white'}`}>
                      {isBn ? topic.titleBn : topic.titleEn}
                    </h4>
                    <span className={`text-[11px] font-mono font-semibold ${isDay ? 'text-slate-500' : 'text-teal-200/70'}`}>
                      {isBn ? topic.slideTagBn : topic.slideTagEn}
                    </span>
                  </div>

                  <ul className="space-y-2.5">
                    {(isBn ? topic.pointsBn : topic.pointsEn).map((pt, pIdx) => (
                      <li key={pIdx} className={`flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed ${isDay ? 'text-slate-700' : 'text-slate-200'}`}>
                        <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${isDay ? 'text-[#006A4E]' : 'text-emerald-400'}`} />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  <div className={`pt-2 border-t flex items-center gap-1.5 text-xs font-semibold ${isDay ? 'border-slate-200/80 text-amber-800' : 'border-white/[0.08] text-amber-300'}`}>
                    <BookMarked className="w-3.5 h-3.5 shrink-0" />
                    <span>{isBn ? 'সূত্র: ' : 'Source: '}{topic.reference}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Special Month Dua (e.g. Laylatul Qadr in Ramadan) */}
            {activeMonth.specialDua && (
              <div
                className={`p-4 sm:p-5 rounded-2xl border space-y-3 ${
                  isDay ? 'bg-teal-50/75 border-teal-200 text-teal-950' : 'bg-[#0e2c33] border-[#184954] text-teal-100'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs sm:text-sm font-black text-teal-800 dark:text-amber-300">
                    {isBn ? activeMonth.specialDua.titleBn : activeMonth.specialDua.titleEn}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() =>
                        onPlaySpeech(activeMonth.specialDua!.arabic, `month_dua_${activeMonth.id}`, true)
                      }
                      className="p-2 rounded-xl hover:bg-black/10 dark:hover:bg-white/10 transition cursor-pointer"
                      title={isBn ? 'শুনুন' : 'Listen'}
                    >
                      {isPlayingAudio === `month_dua_${activeMonth.id}` ? (
                        <VolumeX className="w-4 h-4 text-amber-500" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-teal-700 dark:text-teal-300" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        onCopyText(
                          `${activeMonth.specialDua!.arabic}\n${isBn ? activeMonth.specialDua!.pronunciationBn : activeMonth.specialDua!.pronunciationEn}\n${isBn ? activeMonth.specialDua!.meaningBn : activeMonth.specialDua!.meaningEn}`,
                          `month_dua_${activeMonth.id}`
                        )
                      }
                      className="p-2 rounded-xl hover:bg-black/10 dark:hover:bg-white/10 transition cursor-pointer"
                      title={isBn ? 'কপি করুন' : 'Copy'}
                    >
                      {copiedItemId === `month_dua_${activeMonth.id}` ? (
                        <Check className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Copy className="w-4 h-4 text-teal-700 dark:text-teal-300" />
                      )}
                    </button>
                  </div>
                </div>

                <div dir="rtl" className="text-xl sm:text-2xl font-arabic font-bold text-right leading-[2.1]">
                  {activeMonth.specialDua.arabic}
                </div>
                <div className="text-xs sm:text-sm italic opacity-85">
                  {isBn ? activeMonth.specialDua.pronunciationBn : activeMonth.specialDua.pronunciationEn}
                </div>
                <div className="text-xs sm:text-sm font-medium pt-2 border-t border-teal-300/40 dark:border-teal-700/40">
                  {isBn ? activeMonth.specialDua.meaningBn : activeMonth.specialDua.meaningEn}
                </div>
                <div className="text-[11px] font-semibold opacity-75 text-right">
                  — {activeMonth.specialDua.reference}
                </div>
              </div>
            )}

            {/* Authenticity Caution Card (if any: Rajab, Sha'ban, Safar) */}
            {(isBn ? activeMonth.authenticityCautionBn : activeMonth.authenticityCautionEn) && (() => {
              const c = (isBn ? activeMonth.authenticityCautionBn : activeMonth.authenticityCautionEn)!;
              return (
                <div
                  className={`p-4 sm:p-5 rounded-2xl border space-y-2.5 ${
                    isDay
                      ? 'bg-amber-50/80 border-amber-300/80 text-amber-950'
                      : 'bg-amber-950/25 border-amber-700/40 text-amber-100'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-amber-800 dark:text-amber-300">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span>{c.title}</span>
                  </div>
                  <ul className="space-y-1.5 text-xs sm:text-sm leading-relaxed">
                    {c.points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="font-bold opacity-65">•</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="text-[11px] font-semibold opacity-80 pt-1">
                    {isBn ? 'সূত্র: ' : 'Reference: '}{c.reference}
                  </div>
                </div>
              );
            })()}
          </div>

          {/* COMPLETE 12-MONTH AT-A-GLANCE CALENDAR TABLE (Slides 34-35) */}
          <div
            className={`rounded-3xl p-5 sm:p-6 border space-y-4 ${
              isDay ? 'bg-white border-slate-200/90' : 'bg-[#0a2026] border-[#153c45]'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className={`text-base sm:text-lg font-black ${isDay ? 'text-slate-900' : 'text-white'}`}>
                  {isBn ? 'এক নজরে ১২ মাসের হিজরি ক্যালেন্ডার (১৪৪৮–১৪৪৯ হিজরি)' : 'Complete 12-Month Hijri Calendar at a Glance'}
                </h3>
                <p className={`text-xs ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                  {isBn ? 'যেকোনো মাসের সারিতে ক্লিক করে বিস্তারিত আমল ও হাদিস দেখুন' : 'Click any month row to inspect its detailed Sunnah deeds & Hadith references'}
                </p>
              </div>
              <span className={`text-[11px] font-medium ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                {isBn ? 'মোট ১২টি মাস' : '12 Lunar Months'}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr
                    className={`border-b text-[11px] font-black ${
                      isDay ? 'border-slate-200 text-slate-600' : 'border-[#16404a] text-teal-200/80'
                    }`}
                  >
                    <th className="py-2.5 px-2.5">{isBn ? 'হিজরি মাস' : 'Hijri Month'}</th>
                    <th className="py-2.5 px-2.5 whitespace-nowrap">{isBn ? 'শুরু (আনুমানিক)' : 'Start (Est.)'}</th>
                    <th className="py-2.5 px-2.5">{isBn ? 'মূল আমল' : 'Core Sunnah Focus'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-[#133841]">
                  {PROPHETIC_12_MONTHS.map((m) => {
                    const isRowSelected = m.id === activeMonth.id;
                    const rowNum = isBn ? toBnDigits(String(m.order).padStart(2, '0')) : String(m.order).padStart(2, '0');
                    return (
                      <tr
                        key={m.id}
                        onClick={() => selectAndScrollMonth(m.id, true)}
                        className={`cursor-pointer transition-colors ${
                          isRowSelected
                            ? isDay
                              ? 'bg-emerald-50/90 text-emerald-950 font-bold'
                              : 'bg-[#0e353d] text-white font-bold'
                            : isDay
                            ? 'hover:bg-slate-50 text-slate-800'
                            : 'hover:bg-[#071b20] text-slate-200'
                        }`}
                      >
                        <td className="py-2.5 px-2.5 whitespace-nowrap">
                          <span className="font-mono font-bold tabular-nums mr-1.5 text-[#006A4E] dark:text-amber-300">
                            {rowNum}
                          </span>
                          <span>{isBn ? m.nameBn : m.nameEn}</span>
                          {m.isSacredMonth && (
                            <span className="ml-1.5 text-[10px] font-bold text-amber-700 dark:text-amber-400">
                              ({isBn ? 'সম্মানিত' : 'Sacred'})
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 px-2.5 font-mono tabular-nums whitespace-nowrap opacity-85">
                          {(isBn ? m.approxStartBn : m.approxStartEn).replace(' থেকে', '').replace('From ', '')}
                        </td>
                        <td className="py-2.5 px-2.5">
                          {isBn ? m.coreAmalBn : m.coreAmalEn}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className={`text-[11px] pt-1 ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
              {isBn ? SACRED_MONTHS_INTRO_PDF.calendarNoteBn : SACRED_MONTHS_INTRO_PDF.calendarNoteEn}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-VIEW 2: WEEKLY PROPHETIC SUNNAH (SATURDAY – FRIDAY)                   */}
      {/* ========================================================================= */}
      {subView === 'weekly' && (
        <div className="space-y-5">
          {/* Day Selector Strip */}
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
            {WEEKLY_PROPHETIC_AMAL.map((d) => {
              const active = d.id === selectedWeekDay.id;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => {
                    setSelectedWeekDayId(d.id);
                    if (soundEnabled) soundHaptics.playTap();
                  }}
                  className={`min-h-[54px] p-2.5 rounded-2xl border text-center flex flex-col items-center justify-center gap-0.5 transition cursor-pointer ${
                    active
                      ? 'bg-[#006A4E] text-white border-emerald-500 shadow-sm'
                      : isDay
                      ? 'bg-white border-slate-200 text-slate-800 hover:border-emerald-400'
                      : 'bg-[#0a2026] border-[#153c45] text-slate-200 hover:border-emerald-400/50'
                  }`}
                >
                  <span className="text-xs sm:text-sm font-black">{isBn ? d.dayBn : d.dayEn}</span>
                  <span className={`font-arabic text-[11px] ${active ? 'text-amber-200' : 'opacity-60'}`}>{d.dayAr}</span>
                </button>
              );
            })}
          </div>

          {/* Active Day Detailed Card */}
          <div
            className={`rounded-3xl p-5 sm:p-7 border shadow-sm space-y-5 ${
              isDay ? 'bg-white border-slate-200/90' : 'bg-[#0a2026] border-[#153c45]'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200/70 dark:border-[#153c45]">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-[#006A4E] dark:text-amber-300">
                  <span>{isBn ? 'সাপ্তাহিক আমল' : 'Weekly Sunnah'}</span>
                  <span aria-hidden="true" className="opacity-35">·</span>
                  <span>{isBn ? selectedWeekDay.shortTagBn : selectedWeekDay.shortTagEn}</span>
                </div>
                <h3 className={`text-2xl font-black ${isDay ? 'text-slate-900' : 'text-white'}`}>
                  {isBn ? selectedWeekDay.dayBn : selectedWeekDay.dayEn}{' '}
                  <span className="font-arabic text-lg opacity-75 ml-1">{selectedWeekDay.dayAr}</span>
                </h3>
                <p className={`text-xs sm:text-sm ${isDay ? 'text-slate-600' : 'text-slate-300'}`}>
                  {isBn ? selectedWeekDay.summaryBn : selectedWeekDay.summaryEn}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {selectedWeekDay.sections.map((sec, idx) => (
                <div
                  key={idx}
                  className={`p-4 sm:p-5 rounded-2xl border space-y-3 ${
                    isDay ? 'bg-slate-50/75 border-slate-200/80' : 'bg-[#07191e] border-[#133841]'
                  }`}
                >
                  <h4 className={`text-sm sm:text-base font-black ${isDay ? 'text-slate-900' : 'text-white'}`}>
                    {isBn ? sec.titleBn : sec.titleEn}
                  </h4>
                  <ul className="space-y-2">
                    {(isBn ? sec.pointsBn : sec.pointsEn).map((pt, i) => (
                      <li key={i} className={`flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed ${isDay ? 'text-slate-700' : 'text-slate-200'}`}>
                        <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${isDay ? 'text-[#006A4E]' : 'text-emerald-400'}`} />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                  <div className={`pt-2 border-t flex items-center gap-1.5 text-xs font-semibold ${isDay ? 'border-slate-200/80 text-amber-800' : 'border-white/[0.08] text-amber-300'}`}>
                    <BookMarked className="w-3.5 h-3.5 shrink-0" />
                    <span>{isBn ? 'সূত্র: ' : 'Source: '}{sec.reference}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Summary Table (Slide 29) */}
          <div
            className={`rounded-3xl p-5 sm:p-6 border space-y-3 ${
              isDay ? 'bg-white border-slate-200/90' : 'bg-[#0a2026] border-[#153c45]'
            }`}
          >
            <h3 className={`text-base sm:text-lg font-black ${isDay ? 'text-slate-900' : 'text-white'}`}>
              {isBn ? 'সপ্তাহের আমল এক নজরে (শনিবার থেকে শুক্রবার)' : 'Weekly Sunnah Summary Table'}
            </h3>
            <div className="divide-y divide-slate-100 dark:divide-[#133841] text-xs sm:text-sm">
              {WEEKLY_PROPHETIC_AMAL.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => {
                    setSelectedWeekDayId(d.id);
                    if (soundEnabled) soundHaptics.playTap();
                  }}
                  className={`w-full py-3 px-2.5 rounded-xl flex items-center justify-between gap-4 text-left transition cursor-pointer ${
                    d.id === selectedWeekDay.id
                      ? isDay
                        ? 'bg-emerald-50/90 text-emerald-950 font-bold'
                        : 'bg-[#0e353d] text-white font-bold'
                      : isDay
                      ? 'hover:bg-slate-50 text-slate-800'
                      : 'hover:bg-[#071b20] text-slate-200'
                  }`}
                >
                  <span className="font-black text-[#006A4E] dark:text-amber-300 w-28 shrink-0">
                    {isBn ? d.dayBn : d.dayEn}
                  </span>
                  <span className="flex-1">{isBn ? d.shortTagBn : d.shortTagEn}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-VIEW 3: MONTHLY GENERAL RULES, SACRED MONTHS & NEW CRESCENT DUA       */}
      {/* ========================================================================= */}
      {subView === 'monthly_rules' && (
        <div className="space-y-5">
          {/* 4 Sacred Months Card (Slide 33) */}
          <div
            className={`rounded-3xl p-5 sm:p-6 border space-y-4 ${
              isDay
                ? 'bg-gradient-to-br from-amber-50/70 via-white to-emerald-50/50 border-amber-200/80'
                : 'bg-[#0a2026] border-[#153c45]'
            }`}
          >
            <div className="space-y-1.5">
              <h3 className={`text-lg sm:text-xl font-black ${isDay ? 'text-slate-900' : 'text-white'}`}>
                {isBn ? SACRED_MONTHS_INTRO_PDF.titleBn : SACRED_MONTHS_INTRO_PDF.titleEn}
              </h3>
              <ul className="space-y-2 pt-1">
                {(isBn ? SACRED_MONTHS_INTRO_PDF.pointsBn : SACRED_MONTHS_INTRO_PDF.pointsEn).map((p, idx) => (
                  <li key={idx} className={`flex items-start gap-2 text-xs sm:text-sm leading-relaxed ${isDay ? 'text-slate-700' : 'text-slate-200'}`}>
                    <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${isDay ? 'text-[#006A4E]' : 'text-emerald-400'}`} />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <div className="text-xs font-semibold text-amber-700 dark:text-amber-300 pt-1">
                {isBn ? 'সূত্র: ' : 'Source: '}{SACRED_MONTHS_INTRO_PDF.reference}
              </div>
            </div>

            {/* Interactive jump buttons to the 4 sacred months */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              {PROPHETIC_12_MONTHS.filter((m) => m.isSacredMonth).map((sm) => (
                <button
                  key={sm.id}
                  type="button"
                  onClick={() => selectAndScrollMonth(sm.id, true)}
                  className={`min-h-[44px] p-2.5 rounded-xl border text-left transition cursor-pointer ${
                    isDay
                      ? 'bg-white border-emerald-200 hover:border-emerald-500 text-slate-900'
                      : 'bg-[#07191e] border-[#184752] hover:border-emerald-400 text-white'
                  }`}
                >
                  <div className="text-[10px] font-mono font-bold text-[#006A4E] dark:text-amber-300">
                    {isBn ? `মাস ${toBnDigits(sm.order)}/১২` : `Month ${sm.order}/12`}
                  </div>
                  <div className="text-xs sm:text-sm font-black">{isBn ? sm.nameBn : sm.nameEn}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Monthly Rules (Slides 30-32) */}
          <div className="space-y-4">
            {MONTHLY_GENERAL_RULES.map((rule) => (
              <div
                key={rule.id}
                className={`rounded-3xl p-5 sm:p-6 border space-y-3.5 ${
                  isDay ? 'bg-white border-slate-200/90' : 'bg-[#0a2026] border-[#153c45]'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-amber-700 dark:text-amber-300">
                    {isBn ? rule.timingBn : rule.timingEn}
                  </div>
                  <h3 className={`text-lg font-black mt-0.5 ${isDay ? 'text-slate-900' : 'text-white'}`}>
                    {isBn ? rule.titleBn : rule.titleEn}
                  </h3>
                </div>

                <ul className="space-y-2">
                  {(isBn ? rule.pointsBn : rule.pointsEn).map((pt, i) => (
                    <li key={i} className={`flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed ${isDay ? 'text-slate-700' : 'text-slate-200'}`}>
                      <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${isDay ? 'text-[#006A4E]' : 'text-emerald-400'}`} />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                {rule.dua && (
                  <div
                    className={`p-4 rounded-2xl border space-y-2.5 ${
                      isDay ? 'bg-teal-50/75 border-teal-200 text-teal-950' : 'bg-[#0e2c33] border-[#184954] text-teal-100'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-black text-teal-800 dark:text-amber-300">
                        {isBn ? rule.dua.titleBn : rule.dua.titleEn}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => onPlaySpeech(rule.dua!.arabic, `rule_dua_${rule.id}`, true)}
                          className="p-2 rounded-xl hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"
                          title={isBn ? 'শুনুন' : 'Listen'}
                        >
                          {isPlayingAudio === `rule_dua_${rule.id}` ? (
                            <VolumeX className="w-4 h-4 text-amber-500" />
                          ) : (
                            <Volume2 className="w-4 h-4 text-teal-700 dark:text-teal-300" />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            onCopyText(
                              `${rule.dua!.arabic}\n${isBn ? rule.dua!.pronunciationBn : rule.dua!.pronunciationEn}\n${isBn ? rule.dua!.meaningBn : rule.dua!.meaningEn}`,
                              `rule_dua_${rule.id}`
                            )
                          }
                          className="p-2 rounded-xl hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"
                          title={isBn ? 'কপি' : 'Copy'}
                        >
                          {copiedItemId === `rule_dua_${rule.id}` ? (
                            <Check className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <Copy className="w-4 h-4 text-teal-700 dark:text-teal-300" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div dir="rtl" className="text-lg sm:text-xl font-arabic font-bold text-right leading-[2.1]">
                      {rule.dua.arabic}
                    </div>
                    <div className="text-xs italic opacity-85">
                      {isBn ? rule.dua.pronunciationBn : rule.dua.pronunciationEn}
                    </div>
                    <div className="text-xs sm:text-sm font-medium">
                      {isBn ? rule.dua.meaningBn : rule.dua.meaningEn}
                    </div>
                  </div>
                )}

                <div className={`pt-2 border-t flex items-center gap-1.5 text-xs font-semibold ${isDay ? 'border-slate-100 text-amber-800' : 'border-white/[0.08] text-amber-300'}`}>
                  <BookMarked className="w-3.5 h-3.5 shrink-0" />
                  <span>{isBn ? 'সূত্র: ' : 'Source: '}{rule.reference}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-VIEW 4: DAILY ROUTINE PDF SNAPSHOT (SLIDES 4–19)                      */}
      {/* ========================================================================= */}
      {subView === 'daily_pdf' && (
        <div
          className={`rounded-3xl p-5 sm:p-6 border space-y-4 ${
            isDay ? 'bg-white border-slate-200/90' : 'bg-[#0a2026] border-[#153c45]'
          }`}
        >
          <div>
            <h3 className={`text-lg sm:text-xl font-black ${isDay ? 'text-slate-900' : 'text-white'}`}>
              {isBn ? 'দিনের রুটিন এক নজরে (সহিহ হাদিস নম্বরসহ সংযোজন)' : 'Daily Prophetic Snapshot with Sahih Hadith References'}
            </h3>
            <p className={`text-xs sm:text-sm ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
              {isBn
                ? 'যেকোনো সময়-পর্বে ক্লিক করে বিস্তারিত হাদিস ও তাসবিহ-দোয়া পড়ুন'
                : 'Click any row to view its exact Hadith points & bedtime/prayer remembrances'}
            </p>
          </div>

          <div className="space-y-2.5">
            {DAILY_PDF_SUMMARY_SNAPSHOT.map((item) => {
              const isExpanded = expandedDailyId === item.id;
              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border overflow-hidden transition-colors ${
                    isExpanded
                      ? isDay
                        ? 'bg-emerald-50/55 border-emerald-300'
                        : 'bg-[#0d2d35] border-emerald-500/45'
                      : isDay
                      ? 'bg-slate-50/60 border-slate-200/90'
                      : 'bg-[#07191e] border-[#133841]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setExpandedDailyId(isExpanded ? '' : item.id);
                      if (soundEnabled) soundHaptics.playTap();
                    }}
                    className="w-full p-3.5 sm:p-4 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-2 cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="px-2.5 py-1 rounded-lg bg-[#006A4E] text-white text-xs font-black shrink-0">
                        {isBn ? item.timeBn : item.timeEn}
                      </span>
                      <span className={`text-xs sm:text-sm font-bold truncate ${isDay ? 'text-slate-900' : 'text-white'}`}>
                        {isBn ? item.summaryBn : item.summaryEn}
                      </span>
                    </div>
                    <span className={`text-[11px] font-mono shrink-0 ${isDay ? 'text-slate-500' : 'text-teal-200/75'}`}>
                      {isExpanded ? (isBn ? 'সংক্ষিপ্ত করুন' : 'Hide') : isBn ? 'বিস্তারিত দেখুন' : 'Expand'}
                    </span>
                  </button>

                  {isExpanded && (
                    <div className={`px-4 pb-4 pt-2 border-t space-y-2.5 ${isDay ? 'border-emerald-200/60' : 'border-white/10'}`}>
                      <ul className="space-y-2">
                        {(isBn ? item.slideDetailsBn : item.slideDetailsEn).map((d, i) => (
                          <li key={i} className={`flex items-start gap-2 text-xs sm:text-sm leading-relaxed ${isDay ? 'text-slate-700' : 'text-slate-200'}`}>
                            <Sun className="w-3.5 h-3.5 mt-1 text-amber-500 shrink-0" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                      <div className={`text-xs font-semibold pt-1 ${isDay ? 'text-amber-800' : 'text-amber-300'}`}>
                        {item.reference}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

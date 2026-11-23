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
  BookOpen,
  UserCheck,
  ArrowDownCircle,
  X,
} from 'lucide-react';
import { ThemeMode, ZikrLanguage } from '../types';
import { soundHaptics } from '../utils/audioHaptics';
import { ShareableContent } from '../utils/shareDownload';
import { ShareDownloadButtons } from './ContentShareModal';
import {
  CORE_PRINCIPLE_PDF,
  SACRED_MONTHS_INTRO_PDF,
  HADITH_BOOK_REFERENCE_LEDGER,
  REGULAR_SUNNAH_COMMITMENTS,
  WEEKLY_PROPHETIC_AMAL,
  MONTHLY_GENERAL_RULES,
  DAILY_PDF_SUMMARY_SNAPSHOT,
  PROPHETIC_12_MONTHS,
  PropheticMonthItem,
  PropheticDatedPoint,
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

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

function describeAnnularSector(
  cx: number,
  cy: number,
  rInner: number,
  rOuter: number,
  startDeg: number,
  endDeg: number
): string {
  const outerStart = polarToCartesian(cx, cy, rOuter, startDeg);
  const outerEnd = polarToCartesian(cx, cy, rOuter, endDeg);
  const innerEnd = polarToCartesian(cx, cy, rInner, endDeg);
  const innerStart = polarToCartesian(cx, cy, rInner, startDeg);
  const largeArc = endDeg - startDeg <= 180 ? '0' : '1';
  return [
    `M ${outerStart.x.toFixed(2)} ${outerStart.y.toFixed(2)}`,
    `A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${outerEnd.x.toFixed(2)} ${outerEnd.y.toFixed(2)}`,
    `L ${innerEnd.x.toFixed(2)} ${innerEnd.y.toFixed(2)}`,
    `A ${rInner} ${rInner} 0 ${largeArc} 0 ${innerStart.x.toFixed(2)} ${innerStart.y.toFixed(2)}`,
    'Z',
  ].join(' ');
}

function describeArc(cx: number, cy: number, r: number, startDeg: number, endDeg: number): string {
  const start = polarToCartesian(cx, cy, r, startDeg);
  const end = polarToCartesian(cx, cy, r, endDeg);
  const largeArc = endDeg - startDeg <= 180 ? '0' : '1';
  return `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} A ${r} ${r} 0 ${largeArc} 1 ${end.x.toFixed(2)} ${end.y.toFixed(2)}`;
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
  const [isMonthSearchOpen, setIsMonthSearchOpen] = useState<boolean>(false);
  const [selectedWeekDayId, setSelectedWeekDayId] = useState<string>(() => {
    const dayIdx = new Date().getDay();
    const map = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    return map[dayIdx] || 'fri';
  });
  const [expandedDailyId, setExpandedDailyId] = useState<string>('pdf_late_night');
  const [showPrinciplePanel, setShowPrinciplePanel] = useState<boolean>(false);

  const [chosenCommitments, setChosenCommitments] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('nobi_yearly_commitments');
      if (saved) return JSON.parse(saved);
    } catch {}
    return { commit_12_sunnah: true, commit_ayyamul_beedh: true };
  });

  const detailCardRef = useRef<HTMLDivElement | null>(null);
  const ledgerRef = useRef<HTMLDivElement | null>(null);

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
        m.narratorsBn.toLowerCase().includes(q) ||
        m.primarySourcesBn.toLowerCase().includes(q) ||
        m.topics.some(
          (t) =>
            t.titleBn.toLowerCase().includes(q) ||
            t.pointsBn.some((p) => p.toLowerCase().includes(q)) ||
            t.reference.toLowerCase().includes(q) ||
            Boolean(
              t.referencedPoints?.some(
                (rp) =>
                  rp.textBn.toLowerCase().includes(q) ||
                  rp.reference.toLowerCase().includes(q) ||
                  (rp.narratorBn && rp.narratorBn.toLowerCase().includes(q))
              )
            )
        )
      );
    });
  }, [monthFilter, monthSearch]);

  const activeMonthIndex = useMemo(() => {
    const idx = PROPHETIC_12_MONTHS.findIndex((m) => m.id === selectedMonthId);
    return idx >= 0 ? idx : 0;
  }, [selectedMonthId]);

  const activeMonth = PROPHETIC_12_MONTHS[activeMonthIndex];
  const ongoingMonthObj = useMemo(
    () => PROPHETIC_12_MONTHS.find((m) => m.id === currentOngoingMonthId) || PROPHETIC_12_MONTHS[0],
    [currentOngoingMonthId]
  );

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

  const renderReferencedPointsList = (
    pointsBn: string[],
    pointsEn: string[],
    referencedPoints?: PropheticDatedPoint[],
    accent: 'emerald' | 'amber' = 'emerald'
  ) => {
    if (referencedPoints && referencedPoints.length > 0) {
      return (
        <ol className="space-y-2.5">
          {referencedPoints.map((rp, idx) => {
            const num = isBn ? toBnDigits(String(idx + 1).padStart(2, '0')) : String(idx + 1).padStart(2, '0');
            const narrator = isBn ? rp.narratorBn : rp.narratorEn || rp.narratorBn;
            return (
              <li
                key={idx}
                className={`p-3 sm:p-3.5 rounded-xl border transition-colors ${
                  isDay
                    ? 'bg-white/95 border-slate-200/80 text-slate-800'
                    : 'bg-[#06181d] border-[#153e48] text-slate-100'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <span
                    className={`font-mono text-xs font-black tabular-nums mt-0.5 shrink-0 ${
                      accent === 'amber'
                        ? isDay
                          ? 'text-amber-700'
                          : 'text-amber-300'
                        : isDay
                        ? 'text-[#006A4E]'
                        : 'text-emerald-400'
                    }`}
                  >
                    {num}.
                  </span>
                  <div className="min-w-0 flex-1 space-y-1.5">
                    <p className="text-xs sm:text-sm leading-relaxed font-medium">
                      {isBn ? rp.textBn : rp.textEn}
                    </p>
                    <div
                      className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-semibold ${
                        isDay ? 'text-slate-500' : 'text-teal-200/75'
                      }`}
                    >
                      {narrator && (
                        <>
                          <span>
                            {isBn ? 'বর্ণনায়: ' : 'Narrated by: '}
                            <strong className={isDay ? 'text-slate-700' : 'text-slate-200'}>{narrator}</strong>
                          </span>
                          <span aria-hidden="true" className="opacity-40">
                            ·
                          </span>
                        </>
                      )}
                      <span className={`font-mono ${isDay ? 'text-amber-800' : 'text-amber-300'}`}>
                        {isBn ? 'সূত্র: ' : 'Ref: '}
                        {rp.reference}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      );
    }

    return (
      <ul className="space-y-2.5">
        {(isBn ? pointsBn : pointsEn).map((pt, pIdx) => (
          <li
            key={pIdx}
            className={`flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed ${
              isDay ? 'text-slate-700' : 'text-slate-200'
            }`}
          >
            <CheckCircle2
              className={`w-4 h-4 mt-0.5 shrink-0 ${isDay ? 'text-[#006A4E]' : 'text-emerald-400'}`}
            />
            <span>{pt}</span>
          </li>
        ))}
      </ul>
    );
  };

  const buildMonthShareContent = (m: PropheticMonthItem): ShareableContent => {
    const monthTitle = isBn ? m.nameBn : m.nameEn;
    const topicsText = m.topics
      .map((t) => {
        const pts = t.referencedPoints?.length
          ? t.referencedPoints
              .map(
                (rp, i) =>
                  `${i + 1}. ${isBn ? rp.textBn : rp.textEn} [${rp.narratorBn ? `${rp.narratorBn} · ` : ''}${rp.reference}]`
              )
              .join('\n')
          : (isBn ? t.pointsBn : t.pointsEn).map((p, i) => `${i + 1}. ${p}`).join('\n');
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
      arabic: m.specialDua?.arabic || m.quranRef?.arabic || m.nameAr,
      transliteration: m.specialDua ? (isBn ? m.specialDua.pronunciationBn : m.specialDua.pronunciationEn) : undefined,
      body: isBn ? m.headlineBn : m.headlineEn,
      highlights: m.topics.flatMap((t) => (isBn ? t.pointsBn : t.pointsEn)).slice(0, 4),
      meta: [
        { label: isBn ? 'শুরু' : 'Starts', value: isBn ? m.approxStartBn : m.approxStartEn },
        { label: isBn ? 'প্রধান সূত্র' : 'Sources', value: isBn ? m.primarySourcesBn : m.primarySourcesEn },
        ...(m.ayyamulBeedhBn
          ? [{ label: isBn ? 'আইয়ামে বীয' : 'Ayyamul Beedh', value: isBn ? m.ayyamulBeedhBn : m.ayyamulBeedhEn || '' }]
          : []),
      ],
      reference: isBn ? m.primarySourcesBn : m.primarySourcesEn,
      fullDocumentText: `${monthTitle} (${isBn ? m.hijriYearBn : m.hijriYearEn})\n${isBn ? m.approxStartBn : m.approxStartEn}\nবর্ণনাকারী: ${m.narratorsBn}\n\n${topicsText}${cautionText}`,
      fileNamePrefix: `Nobi-12-Months-${m.order}-${m.nameEn}`,
    };
  };

  const openFull12MonthShare = (focus: 'share' | 'download') => {
    const monthsText = PROPHETIC_12_MONTHS.map((m) => {
      const head = `${m.order}. ${isBn ? m.nameBn : m.nameEn} (${isBn ? m.approxStartBn : m.approxStartEn}) — ${isBn ? m.coreAmalBn : m.coreAmalEn}\n  বর্ণনাকারী: ${m.narratorsBn} | সূত্র: ${m.primarySourcesBn}`;
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
          ? 'দিনের রুটিন, সপ্তাহের আমল, প্রতি মাসের নিয়ম এবং ১২ হিজরি মাসের পূর্ণাঙ্গ সুন্নাহ ক্যালেন্ডার বর্ণনাকারী সাহাবি ও সহিহ হাদিস নম্বরসহ।'
          : 'Complete Prophetic calendar covering daily routine, weekly Sunnah, monthly rules & all 12 Hijri months with Sahih Hadith citations.',
        highlights: PROPHETIC_12_MONTHS.slice(0, 5).map(
          (m) => `${isBn ? m.nameBn : m.nameEn}: ${isBn ? m.coreAmalBn : m.coreAmalEn} (${m.primarySourcesBn})`
        ),
        meta: [
          { label: isBn ? 'হিজরি বছর' : 'Hijri Year', value: isBn ? '১৪৪৮–১৪৪৯ হি.' : '1448–1449 AH' },
          { label: isBn ? 'মাস ও সূত্র' : 'Scope', value: isBn ? '১২ মাস · সহিহ দলিল' : '12 Months · Sahih Citations' },
        ],
        reference: isBn ? 'সহিহ বুখারি, সহিহ মুসলিম, জামে তিরমিযি ও সুনান (সীরাহ পড়ি সিরিজ)' : 'Sahih Bukhari, Sahih Muslim & Sunan',
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
              <span>{isBn ? 'বর্ণনাকারী ও হাদিস নম্বরসহ' : 'Narrators & Sahih Citations'}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-balance">
              {isBn ? 'রাসূলুল্লাহ ﷺ-এর ১২ মাসের আমল ও দলিলভিত্তিক ক্যালেন্ডার' : "Prophet Muhammad's ﷺ 12-Month Referenced Calendar"}
            </h2>

            <p className={`text-xs sm:text-sm leading-relaxed ${isDay ? 'text-slate-600' : 'text-slate-300'}`}>
              {isBn
                ? 'দিনের কোন সময়, সপ্তাহের কোন দিন, মাসের কোন তারিখে ও বছরের কোন মাসে নবীজি ﷺ কী আমল করতেন — প্রতিটি আমলের সাথে বর্ণনাকারী সাহাবি, হাদিস গ্রন্থ ও নম্বরসহ।'
                : 'Authentic prophetic practices organized by day, week, lunar milestones, and all 12 Hijri months — with exact Hadith numbers & companions.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                setShowPrinciplePanel((v) => !v);
                if (soundEnabled) soundHaptics.playTap();
              }}
              className={`min-h-[42px] px-3.5 py-2 rounded-xl text-xs font-bold border transition cursor-pointer inline-flex items-center gap-1.5 active:scale-95 whitespace-nowrap shrink-0 ${
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

            <button
              type="button"
              onClick={() => {
                ledgerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                if (soundEnabled) soundHaptics.playTap();
              }}
              className={`min-h-[42px] px-3.5 py-2 rounded-xl text-xs font-bold border transition cursor-pointer inline-flex items-center gap-1.5 active:scale-95 whitespace-nowrap shrink-0 ${
                isDay
                  ? 'bg-white border-amber-200 text-amber-900 hover:bg-amber-50'
                  : 'bg-[#0d3038] border-[#1d5460] text-amber-300 hover:bg-[#133e48]'
              }`}
            >
              <ArrowDownCircle className="w-3.5 h-3.5" />
              <span>{isBn ? 'হাদিস রেফারেন্স সূচি' : 'Hadith Index'}</span>
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

        {/* Core Principle Strip */}
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
          <span className={`font-mono text-[11px] font-bold shrink-0 ${isDay ? 'text-slate-600' : 'text-teal-200/85'}`}>
            {isBn ? `${CORE_PRINCIPLE_PDF.narratorBn} · ` : `${CORE_PRINCIPLE_PDF.narratorEn} · `}
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
                      <div className="text-[11px] opacity-75 font-mono">
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
      {/* SUB-VIEW 1: 12-MONTH HIJRI LUNAR DIAL + GRID + DETAIL INSPECTOR + TABLE   */}
      {/* ========================================================================= */}
      {subView === 'months' && (
        <div className="space-y-6">
          {/* CREATIVE INTERACTIVE 12-MONTH HIJRI LUNAR DIAL + COMMAND BRIEF */}
          <div
            className={`rounded-3xl p-5 sm:p-6 border grid grid-cols-1 lg:grid-cols-12 gap-6 items-center ${
              isDay
                ? 'bg-gradient-to-br from-white via-[#f7fbf9] to-[#fffdf5] border-slate-200/90'
                : 'bg-gradient-to-br from-[#091f25] via-[#0a242b] to-[#07191f] border-[#153c45]'
            }`}
          >
            {/* Left: Interactive 12-Month Hijri Sunnah Wheel SVG */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="relative w-full max-w-[300px] sm:max-w-[320px] aspect-square">
                <svg
                  viewBox="0 0 340 340"
                  className="w-full h-full select-none"
                  role="img"
                  aria-label={isBn ? '১২ মাসের হিজরি সুন্নাহ চক্র' : '12-Month Hijri Sunnah Wheel'}
                >
                  {/* Subtle outer guide circle */}
                  <circle
                    cx="170"
                    cy="170"
                    r="156"
                    fill="none"
                    stroke={isDay ? '#e2e8f0' : '#163f4a'}
                    strokeWidth="1"
                    strokeDasharray="3 4"
                  />

                  {/* 12 Lunar Sectors */}
                  {PROPHETIC_12_MONTHS.map((m, idx) => {
                    const startDeg = -90 + idx * 30 + 1.4;
                    const endDeg = -90 + (idx + 1) * 30 - 1.4;
                    const midDeg = -90 + idx * 30 + 15;
                    const isSel = m.id === activeMonth.id;
                    const isLive = m.id === currentOngoingMonthId;

                    const sectorPath = describeAnnularSector(170, 170, 74, 142, startDeg, endDeg);
                    const sacredArc = m.isSacredMonth ? describeArc(170, 170, 150, startDeg, endDeg) : null;
                    const labelPos = polarToCartesian(170, 170, 108, midDeg);
                    const tickPosOuter = polarToCartesian(170, 170, 144, midDeg);
                    const numText = isBn
                      ? toBnDigits(String(m.order).padStart(2, '0'))
                      : String(m.order).padStart(2, '0');

                    return (
                      <g
                        key={m.id}
                        onClick={() => selectAndScrollMonth(m.id, false)}
                        className="cursor-pointer group"
                      >
                        {sacredArc && (
                          <path
                            d={sacredArc}
                            fill="none"
                            stroke={isSel ? '#f59e0b' : isDay ? '#d97706' : '#fbbf24'}
                            strokeWidth={isSel ? '4.5' : '3'}
                            strokeLinecap="round"
                            opacity={isSel ? 1 : 0.72}
                          />
                        )}

                        <path
                          d={sectorPath}
                          fill={
                            isSel
                              ? '#006A4E'
                              : isLive
                              ? isDay
                                ? '#e6f4ef'
                                : '#0e373f'
                              : isDay
                              ? '#f8fafc'
                              : '#081d23'
                          }
                          stroke={
                            isSel
                              ? '#fcd34d'
                              : isLive
                              ? '#10b981'
                              : isDay
                              ? '#cbd5e1'
                              : '#184550'
                          }
                          strokeWidth={isSel ? '2' : '1'}
                          className="transition-colors duration-150"
                        />

                        {m.hasSpecialFasting && (
                          <circle
                            cx={tickPosOuter.x}
                            cy={tickPosOuter.y}
                            r="2.4"
                            fill={isSel ? '#fcd34d' : m.accentColor}
                          />
                        )}

                        <text
                          x={labelPos.x}
                          y={labelPos.y}
                          textAnchor="middle"
                          dominantBaseline="central"
                          fontSize="13"
                          fontWeight="800"
                          className="font-mono tabular-nums pointer-events-none"
                          fill={
                            isSel
                              ? '#ffffff'
                              : m.isSacredMonth
                              ? isDay
                                ? '#b45309'
                                : '#fcd34d'
                              : isDay
                              ? '#0f172a'
                              : '#cbd5e1'
                          }
                        >
                          {numText}
                        </text>
                      </g>
                    );
                  })}

                  {/* Inner Core Dial */}
                  <circle
                    cx="170"
                    cy="170"
                    r="66"
                    fill={isDay ? '#ffffff' : '#06171c'}
                    stroke={isDay ? '#006A4E' : '#10b981'}
                    strokeWidth="1.5"
                    strokeOpacity="0.45"
                  />
                  <text
                    x="170"
                    y="142"
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="700"
                    className="font-mono tabular-nums"
                    fill={isDay ? '#006A4E' : '#fbbf24'}
                  >
                    {isBn
                      ? `মাস ${toBnDigits(activeMonth.order)}/১২`
                      : `MONTH ${activeMonth.order}/12`}
                  </text>
                  <text
                    x="170"
                    y="168"
                    textAnchor="middle"
                    fontSize="18"
                    fontWeight="700"
                    className="font-arabic"
                    fill={isDay ? '#0f172a' : '#f8fafc'}
                  >
                    {activeMonth.nameAr}
                  </text>
                  <text
                    x="170"
                    y="192"
                    textAnchor="middle"
                    fontSize="11.5"
                    fontWeight="800"
                    fill={isDay ? '#334155' : '#99f6e4'}
                  >
                    {isBn ? activeMonth.nameBn : activeMonth.nameEn}
                  </text>
                  <text
                    x="170"
                    y="209"
                    textAnchor="middle"
                    fontSize="9.5"
                    fontWeight="600"
                    className="font-mono tabular-nums"
                    fill={isDay ? '#64748b' : '#94a3b8'}
                  >
                    {isBn ? activeMonth.hijriYearBn : activeMonth.hijriYearEn}
                  </text>
                </svg>
              </div>

              {/* Wheel Legend */}
              <div className={`flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] font-semibold mt-1 ${isDay ? 'text-slate-600' : 'text-slate-400'}`}>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3 h-1 rounded-full bg-amber-500 inline-block" />
                  <span>{isBn ? '৪ সম্মানিত মাস (সোনালি আর্ক)' : '4 Sacred Months (Gold Arc)'}</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
                  <span>{isBn ? 'নির্বাচিত মাস' : 'Selected'}</span>
                </span>
              </div>
            </div>

            {/* Right: Active Month Command & Reference Summary */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                  <span className={isDay ? 'text-[#006A4E]' : 'text-emerald-400'}>
                    {activeMonth.id === currentOngoingMonthId
                      ? isBn
                        ? 'বর্তমান চলমান হিজরি মাস'
                        : 'Current Ongoing Month'
                      : isBn
                      ? 'নির্বাচিত হিজরি মাস'
                      : 'Selected Hijri Month'}
                  </span>
                  {activeMonth.isSacredMonth && (
                    <>
                      <span aria-hidden="true" className="opacity-35">·</span>
                      <span className={isDay ? 'text-amber-700' : 'text-amber-300'}>
                        {isBn ? 'আশহুরে হুরুম (সম্মানিত মাস)' : 'Sacred Month'}
                      </span>
                    </>
                  )}
                </div>

                {activeMonth.id !== currentOngoingMonthId && (
                  <button
                    type="button"
                    onClick={() => selectAndScrollMonth(currentOngoingMonthId, false)}
                    className={`min-h-[34px] px-2.5 py-1 rounded-lg border text-[11px] font-bold cursor-pointer transition whitespace-nowrap ${
                      isDay
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-900 hover:bg-emerald-100'
                        : 'bg-[#0e343c] border-emerald-500/40 text-emerald-200 hover:bg-[#134650]'
                    }`}
                  >
                    {isBn
                      ? `চলমান মাসে ফিরুন (${ongoingMonthObj.nameBn})`
                      : `Jump to Current (${ongoingMonthObj.nameEn})`}
                  </button>
                )}
              </div>

              <div>
                <div className="flex flex-wrap items-baseline gap-2.5">
                  <h3 className={`text-2xl sm:text-3xl font-black tracking-tight ${isDay ? 'text-slate-900' : 'text-white'}`}>
                    {isBn ? activeMonth.nameBn : activeMonth.nameEn}
                  </h3>
                  <span className={`font-arabic text-xl font-bold ${isDay ? 'text-emerald-800/80' : 'text-amber-300'}`}>
                    {activeMonth.nameAr}
                  </span>
                </div>
                <p className={`text-xs sm:text-sm mt-1 leading-relaxed ${isDay ? 'text-slate-600' : 'text-slate-300'}`}>
                  {isBn ? activeMonth.headlineBn : activeMonth.headlineEn}
                </p>
              </div>

              {/* 4-Cell Reference & Schedule Summary Grid */}
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-2xl border ${
                  isDay ? 'bg-slate-50/90 border-slate-200/80' : 'bg-[#06181d] border-[#153c45]'
                }`}
              >
                <div className="space-y-0.5">
                  <div className={`text-[11px] font-bold ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                    {isBn ? 'শুরু (উম্মুল কুরা)' : 'Estimated Start'}
                  </div>
                  <div className={`text-xs sm:text-sm font-black font-mono tabular-nums ${isDay ? 'text-slate-900' : 'text-white'}`}>
                    {isBn ? activeMonth.approxStartBn : activeMonth.approxStartEn}
                  </div>
                </div>

                <div className="space-y-0.5">
                  <div className={`text-[11px] font-bold ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                    {activeMonth.ayyamulBeedhBn
                      ? isBn
                        ? 'আইয়ামে বীয (১৩–১৫ তারিখ)'
                        : 'Ayyamul Beedh (13–15)'
                      : isBn
                      ? 'বিশেষ তারিখ'
                      : 'Key Dates'}
                  </div>
                  <div className={`text-xs sm:text-sm font-bold font-mono tabular-nums ${isDay ? 'text-emerald-800' : 'text-emerald-300'}`}>
                    {activeMonth.ayyamulBeedhBn
                      ? isBn
                        ? activeMonth.ayyamulBeedhBn
                        : activeMonth.ayyamulBeedhEn
                      : (isBn ? activeMonth.keyDatesBn?.[0] : activeMonth.keyDatesEn?.[0]) || '—'}
                  </div>
                </div>

                <div className="space-y-0.5">
                  <div className={`text-[11px] font-bold ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                    {isBn ? 'বর্ণনাকারী সাহাবি / ইমাম' : 'Primary Narrators'}
                  </div>
                  <div className={`text-xs font-bold leading-snug ${isDay ? 'text-slate-800' : 'text-slate-200'}`}>
                    {isBn ? activeMonth.narratorsBn : activeMonth.narratorsEn}
                  </div>
                </div>

                <div className="space-y-0.5">
                  <div className={`text-[11px] font-bold ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                    {isBn ? 'মূল কুরআন ও হাদিস সূত্র' : 'Primary Hadith Sources'}
                  </div>
                  <div className={`text-xs font-mono font-bold leading-snug ${isDay ? 'text-amber-800' : 'text-amber-300'}`}>
                    {isBn ? activeMonth.primarySourcesBn : activeMonth.primarySourcesEn}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => stepMonth(-1)}
                    className={`min-h-[40px] px-3 py-2 rounded-xl border text-xs font-bold inline-flex items-center gap-1 cursor-pointer transition whitespace-nowrap ${
                      isDay
                        ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        : 'bg-[#07191e] border-[#184550] text-teal-200 hover:bg-[#0e2d35]'
                    }`}
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>{isBn ? 'আগের মাস' : 'Previous'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => stepMonth(1)}
                    className={`min-h-[40px] px-3 py-2 rounded-xl border text-xs font-bold inline-flex items-center gap-1 cursor-pointer transition whitespace-nowrap ${
                      isDay
                        ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        : 'bg-[#07191e] border-[#184550] text-teal-200 hover:bg-[#0e2d35]'
                    }`}
                  >
                    <span>{isBn ? 'পরের মাস' : 'Next'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => selectAndScrollMonth(activeMonth.id, true)}
                  className="min-h-[40px] px-4 py-2 rounded-xl bg-[#006A4E] hover:bg-[#055842] text-white text-xs font-bold cursor-pointer transition whitespace-nowrap"
                >
                  {isBn ? 'নিচে পূর্ণাঙ্গ দলিল ও তথ্য দেখুন' : 'View Full References Below'}
                </button>
              </div>
            </div>
          </div>

          {/* Filter Bar & Compact Search Icon */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none flex-1 min-w-0">
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
                    className={`min-h-[40px] px-3.5 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer shrink-0 whitespace-nowrap ${
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

              <button
                type="button"
                onClick={() => {
                  if (soundEnabled) soundHaptics.playTap();
                  setIsMonthSearchOpen((prev) => {
                    if (prev && monthSearch) setMonthSearch('');
                    return !prev;
                  });
                }}
                className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 transition cursor-pointer active:scale-95 ${
                  isMonthSearchOpen || monthSearch
                    ? isDay
                      ? 'bg-[#006A4E] border-[#006A4E] text-white'
                      : 'bg-emerald-600 border-emerald-500 text-white'
                    : isDay
                    ? 'bg-white border-slate-200 text-slate-700 hover:border-emerald-400 hover:text-[#006A4E]'
                    : 'bg-[#092226] border-[#153e46] text-emerald-300 hover:border-emerald-500'
                }`}
                title={isBn ? 'মাস বা হাদিস খুঁজুন' : 'Search month or Hadith'}
                aria-label={isBn ? 'মাস বা হাদিস খুঁজুন' : 'Search month or Hadith'}
              >
                {isMonthSearchOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
              </button>
            </div>

            {(isMonthSearchOpen || monthSearch.trim().length > 0) && (
              <div className="relative animate-in fade-in duration-150">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
                <input
                  type="text"
                  autoFocus={isMonthSearchOpen}
                  value={monthSearch}
                  onChange={(e) => setMonthSearch(e.target.value)}
                  placeholder={isBn ? 'মাস, সাহাবি বা হাদিস নম্বর (যেমন: রজব, ১৯৫০)...' : 'Search month, narrator or Hadith #...'}
                  className={`w-full min-h-[40px] pl-9 pr-10 py-2 rounded-xl border text-xs font-medium outline-none transition ${
                    isDay
                      ? 'bg-white border-slate-200 focus:border-emerald-500 text-slate-800'
                      : 'bg-[#07181d] border-[#163f48] focus:border-emerald-400 text-white'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => {
                    setMonthSearch('');
                    setIsMonthSearchOpen(false);
                  }}
                  aria-label={isBn ? 'বন্ধ করুন' : 'Close search'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Interactive 12-Month Hijri Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {filteredMonths.map((m) => {
              const isSelected = m.id === activeMonth.id;
              const isOngoing = m.id === currentOngoingMonthId;
              const numLabel = isBn ? toBnDigits(String(m.order).padStart(2, '0')) : String(m.order).padStart(2, '0');

              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => selectAndScrollMonth(m.id, true)}
                  className={`group relative overflow-hidden rounded-2xl p-4 border text-left transition-all cursor-pointer flex flex-col justify-between gap-2.5 active:scale-[0.985] ${
                    isSelected
                      ? isDay
                        ? 'bg-gradient-to-br from-[#006A4E] to-[#044e39] text-white border-emerald-600 shadow-md'
                        : 'bg-gradient-to-br from-[#0d3b43] to-[#062228] text-white border-emerald-400 shadow-md ring-1 ring-emerald-400/30'
                      : isDay
                      ? 'bg-white border-slate-200/90 hover:border-emerald-400 text-slate-900 shadow-2xs hover:-translate-y-0.5'
                      : 'bg-[#0a2026] border-[#153c45] hover:border-emerald-400/50 text-white hover:-translate-y-0.5'
                  }`}
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-[2.5px]"
                    style={{
                      background: isSelected ? '#fcd34d' : m.accentColor,
                      opacity: isSelected ? 1 : 0.8,
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
                    <div className="flex items-baseline justify-between gap-1.5">
                      <h3 className="text-base font-black tracking-tight leading-snug truncate">
                        {isBn ? m.nameBn : m.nameEn}
                      </h3>
                      <span className={`font-arabic text-sm shrink-0 ${isSelected ? 'text-amber-200/90' : 'opacity-65'}`}>
                        {m.nameAr}
                      </span>
                    </div>
                    <div className={`text-[11px] font-medium truncate ${isSelected ? 'text-emerald-100/90' : isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                      {isBn ? m.approxStartBn : m.approxStartEn}
                    </div>
                  </div>

                  <div
                    className={`pt-2 border-t space-y-1 text-[11px] leading-snug ${
                      isSelected
                        ? 'border-white/15 text-amber-50'
                        : isDay
                        ? 'border-slate-100 text-slate-700'
                        : 'border-white/[0.08] text-slate-300'
                    }`}
                  >
                    <p className="line-clamp-2 font-medium">
                      {m.isSacredMonth && (
                        <span className={`font-bold ${isSelected ? 'text-amber-300' : isDay ? 'text-amber-700' : 'text-amber-400'}`}>
                          {isBn ? 'সম্মানিত মাস · ' : 'Sacred · '}
                        </span>
                      )}
                      {isBn ? m.coreAmalBn : m.coreAmalEn}
                    </p>
                    <div className={`font-mono text-[10px] truncate ${isSelected ? 'text-amber-200/90' : isDay ? 'text-amber-800' : 'text-amber-300/90'}`}>
                      {isBn ? 'সূত্র: ' : 'Ref: '}
                      {isBn ? m.primarySourcesBn : m.primarySourcesEn}
                    </div>
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
              {isBn ? 'এই অনুসন্ধানে কোনো মাস বা হাদিস পাওয়া যায়নি।' : 'No months matched your filter.'}
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
                  className={`min-h-[40px] px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1 cursor-pointer transition whitespace-nowrap ${
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
                  className={`min-h-[40px] px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1 cursor-pointer transition whitespace-nowrap ${
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

            {/* 3-Column Info & Citation Strip */}
            <div
              className={`grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-2xl border ${
                isDay ? 'bg-emerald-50/55 border-emerald-200/80 text-emerald-950' : 'bg-[#071b20] border-[#16414b] text-emerald-100'
              }`}
            >
              <div className="space-y-1">
                <div className="text-[11px] font-black text-[#006A4E] dark:text-amber-300">
                  {isBn ? '১. সময়কাল ও চাঁদ' : '1. Lunar Schedule'}
                </div>
                <div className="text-xs sm:text-sm font-bold font-mono tabular-nums">
                  {isBn ? activeMonth.approxStartBn : activeMonth.approxStartEn}
                </div>
                <p className="text-[11px] opacity-75 leading-snug">
                  {isBn ? SACRED_MONTHS_INTRO_PDF.calendarNoteBn : SACRED_MONTHS_INTRO_PDF.calendarNoteEn}
                </p>
              </div>

              <div className="space-y-1">
                <div className="text-[11px] font-black text-[#006A4E] dark:text-amber-300">
                  {isBn ? '২. গুরুত্বপূর্ণ তারিখ ও আইয়ামে বীয' : '2. Key Lunar Dates'}
                </div>
                {activeMonth.ayyamulBeedhBn && (
                  <div className="text-xs font-semibold font-mono tabular-nums">
                    {isBn ? 'আইয়ামে বীয: ' : 'Ayyamul Beedh: '}
                    {isBn ? activeMonth.ayyamulBeedhBn : activeMonth.ayyamulBeedhEn}
                  </div>
                )}
                {(isBn ? activeMonth.keyDatesBn : activeMonth.keyDatesEn)?.map((kd, i) => (
                  <div key={i} className="text-xs font-semibold font-mono tabular-nums">
                    • {kd}
                  </div>
                ))}
              </div>

              <div className="space-y-1">
                <div className="text-[11px] font-black text-[#006A4E] dark:text-amber-300 flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>{isBn ? '৩. বর্ণনাকারী ও মূল দলিল' : '3. Narrators & Sources'}</span>
                </div>
                <div className="text-xs font-bold leading-snug">
                  {isBn ? activeMonth.narratorsBn : activeMonth.narratorsEn}
                </div>
                <div className={`text-[11px] font-mono font-bold ${isDay ? 'text-amber-800' : 'text-amber-300'}`}>
                  {isBn ? activeMonth.primarySourcesBn : activeMonth.primarySourcesEn}
                </div>
              </div>
            </div>

            {/* Quranic Reference Card (Rajab, Dhul-Qi'dah, Rabi' al-Awwal) */}
            {activeMonth.quranRef && (
              <div
                className={`p-4 sm:p-5 rounded-2xl border space-y-2.5 ${
                  isDay ? 'bg-amber-50/55 border-amber-200/80 text-slate-900' : 'bg-[#092128] border-amber-500/30 text-amber-50'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs font-black text-amber-800 dark:text-amber-300">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{isBn ? activeMonth.quranRef.surahBn : activeMonth.quranRef.surahEn}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => onPlaySpeech(activeMonth.quranRef!.arabic, `month_quran_${activeMonth.id}`, true)}
                      className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-xl hover:bg-black/10 dark:hover:bg-white/10 transition cursor-pointer"
                      title={isBn ? 'শুনুন' : 'Listen'}
                    >
                      {isPlayingAudio === `month_quran_${activeMonth.id}` ? (
                        <VolumeX className="w-4 h-4 text-amber-500" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-amber-700 dark:text-amber-300" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        onCopyText(
                          `${activeMonth.quranRef!.arabic}\n${isBn ? activeMonth.quranRef!.meaningBn : activeMonth.quranRef!.meaningEn}\n(${isBn ? activeMonth.quranRef!.surahBn : activeMonth.quranRef!.surahEn})`,
                          `month_quran_${activeMonth.id}`
                        )
                      }
                      className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-xl hover:bg-black/10 dark:hover:bg-white/10 transition cursor-pointer"
                      title={isBn ? 'কপি করুন' : 'Copy'}
                    >
                      {copiedItemId === `month_quran_${activeMonth.id}` ? (
                        <Check className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Copy className="w-4 h-4 text-amber-700 dark:text-amber-300" />
                      )}
                    </button>
                  </div>
                </div>
                <div dir="rtl" className="text-lg sm:text-xl font-arabic font-bold text-right leading-[2.05]">
                  {activeMonth.quranRef.arabic}
                </div>
                <p className={`text-xs sm:text-sm font-medium leading-relaxed ${isDay ? 'text-slate-700' : 'text-amber-100/90'}`}>
                  {isBn ? activeMonth.quranRef.meaningBn : activeMonth.quranRef.meaningEn}
                </p>
              </div>
            )}

            {/* Topics & Per-Point Hadith Citations */}
            <div className="space-y-5">
              {activeMonth.topics.map((topic, idx) => {
                const topicCopyId = `topic_${activeMonth.id}_${idx}`;
                const topicText = `${isBn ? topic.titleBn : topic.titleEn}\n${
                  topic.referencedPoints
                    ? topic.referencedPoints
                        .map((rp, i) => `${i + 1}. ${isBn ? rp.textBn : rp.textEn} (${rp.reference})`)
                        .join('\n')
                    : (isBn ? topic.pointsBn : topic.pointsEn).join('\n')
                }\nসূত্র: ${topic.reference}`;

                return (
                  <div
                    key={idx}
                    className={`p-4 sm:p-5 rounded-2xl border space-y-3.5 ${
                      isDay ? 'bg-slate-50/75 border-slate-200/80' : 'bg-[#07191e] border-[#133841]'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className={`text-sm sm:text-base font-black ${isDay ? 'text-slate-900' : 'text-white'}`}>
                        {isBn ? topic.titleBn : topic.titleEn}
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className={`text-[11px] font-mono font-semibold ${isDay ? 'text-slate-500' : 'text-teal-200/75'}`}>
                          {isBn ? topic.slideTagBn : topic.slideTagEn}
                        </span>
                        <button
                          type="button"
                          onClick={() => onCopyText(topicText, topicCopyId)}
                          className="min-h-[34px] min-w-[34px] flex items-center justify-center rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition cursor-pointer"
                          title={isBn ? 'এই অংশটি কপি করুন' : 'Copy section'}
                        >
                          {copiedItemId === topicCopyId ? (
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                          ) : (
                            <Copy className="w-3.5 h-3.5 opacity-60" />
                          )}
                        </button>
                      </div>
                    </div>

                    {renderReferencedPointsList(topic.pointsBn, topic.pointsEn, topic.referencedPoints)}

                    <div
                      className={`pt-2.5 border-t flex flex-wrap items-center gap-1.5 text-xs font-semibold ${
                        isDay ? 'border-slate-200/80 text-amber-800' : 'border-white/[0.08] text-amber-300'
                      }`}
                    >
                      <BookMarked className="w-3.5 h-3.5 shrink-0" />
                      <span>
                        {isBn ? 'সামগ্রিক সূত্র: ' : 'Combined Source: '}
                        {topic.reference}
                      </span>
                    </div>
                  </div>
                );
              })}
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
                      className="min-h-[38px] min-w-[38px] flex items-center justify-center rounded-xl hover:bg-black/10 dark:hover:bg-white/10 transition cursor-pointer"
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
                      className="min-h-[38px] min-w-[38px] flex items-center justify-center rounded-xl hover:bg-black/10 dark:hover:bg-white/10 transition cursor-pointer"
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
                <div className="text-[11px] font-mono font-semibold opacity-80 text-right">
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
                  <div className="text-[11px] font-mono font-semibold opacity-85 pt-1">
                    {isBn ? 'তাহকীক সূত্র: ' : 'Verification Reference: '}
                    {c.reference}
                  </div>
                </div>
              );
            })()}
          </div>

          {/* COMPLETE 12-MONTH AT-A-GLANCE CALENDAR TABLE */}
          <div
            className={`rounded-3xl p-5 sm:p-6 border space-y-4 ${
              isDay ? 'bg-white border-slate-200/90' : 'bg-[#0a2026] border-[#153c45]'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className={`text-base sm:text-lg font-black ${isDay ? 'text-slate-900' : 'text-white'}`}>
                  {isBn ? 'এক নজরে ১২ মাসের হিজরি ক্যালেন্ডার ও মূল দলিল (১৪৪৮–১৪৪৯ হিজরি)' : 'Complete 12-Month Hijri Calendar & Primary Citations'}
                </h3>
                <p className={`text-xs ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                  {isBn ? 'যেকোনো মাসের সারিতে ক্লিক করে বিস্তারিত আমল, বর্ণনাকারী ও হাদিস দেখুন' : 'Click any month row to inspect detailed deeds, narrators & Hadith references'}
                </p>
              </div>
              <span className={`text-[11px] font-mono font-bold tabular-nums ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
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
                    <th className="py-2.5 px-2.5 hidden md:table-cell">{isBn ? 'প্রধান সূত্র' : 'Primary Sources'}</th>
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
                        <td className={`py-2.5 px-2.5 hidden md:table-cell font-mono text-[11px] ${isDay ? 'text-amber-800' : 'text-amber-300'}`}>
                          {isBn ? m.primarySourcesBn : m.primarySourcesEn}
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
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-slate-200/70 dark:border-[#153c45]">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-[#006A4E] dark:text-amber-300">
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
              <div className={`text-xs font-semibold shrink-0 max-w-xs sm:text-right ${isDay ? 'text-slate-600' : 'text-teal-200/80'}`}>
                <span className="opacity-70">{isBn ? 'বর্ণনাকারী সাহাবি: ' : 'Narrators: '}</span>
                <span className={isDay ? 'text-slate-900 font-bold' : 'text-white font-bold'}>
                  {isBn ? selectedWeekDay.narratorsBn : selectedWeekDay.narratorsEn}
                </span>
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
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className={`text-sm sm:text-base font-black ${isDay ? 'text-slate-900' : 'text-white'}`}>
                      {isBn ? sec.titleBn : sec.titleEn}
                    </h4>
                    <span className={`text-[11px] font-mono font-semibold ${isDay ? 'text-slate-500' : 'text-teal-200/75'}`}>
                      {sec.slideRefBn}
                    </span>
                  </div>

                  {renderReferencedPointsList(sec.pointsBn, sec.pointsEn, sec.referencedPoints)}

                  <div className={`pt-2 border-t flex items-center gap-1.5 text-xs font-semibold ${isDay ? 'border-slate-200/80 text-amber-800' : 'border-white/[0.08] text-amber-300'}`}>
                    <BookMarked className="w-3.5 h-3.5 shrink-0" />
                    <span>{isBn ? 'সূত্র: ' : 'Source: '}{sec.reference}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Summary Table */}
          <div
            className={`rounded-3xl p-5 sm:p-6 border space-y-3 ${
              isDay ? 'bg-white border-slate-200/90' : 'bg-[#0a2026] border-[#153c45]'
            }`}
          >
            <h3 className={`text-base sm:text-lg font-black ${isDay ? 'text-slate-900' : 'text-white'}`}>
              {isBn ? 'সপ্তাহের আমল ও হাদিস সূত্র এক নজরে (শনিবার থেকে শুক্রবার)' : 'Weekly Sunnah & Sources Summary'}
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
                  className={`w-full py-3 px-2.5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4 text-left transition cursor-pointer ${
                    d.id === selectedWeekDay.id
                      ? isDay
                        ? 'bg-emerald-50/90 text-emerald-950 font-bold'
                        : 'bg-[#0e353d] text-white font-bold'
                      : isDay
                      ? 'hover:bg-slate-50 text-slate-800'
                      : 'hover:bg-[#071b20] text-slate-200'
                  }`}
                >
                  <span className="font-black text-[#006A4E] dark:text-amber-300 sm:w-28 shrink-0">
                    {isBn ? d.dayBn : d.dayEn}
                  </span>
                  <span className="flex-1">{isBn ? d.shortTagBn : d.shortTagEn}</span>
                  <span className={`font-mono text-[11px] shrink-0 ${isDay ? 'text-amber-800' : 'text-amber-300'}`}>
                    {d.sections[0]?.reference}
                  </span>
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
            <div className="space-y-2">
              <h3 className={`text-lg sm:text-xl font-black ${isDay ? 'text-slate-900' : 'text-white'}`}>
                {isBn ? SACRED_MONTHS_INTRO_PDF.titleBn : SACRED_MONTHS_INTRO_PDF.titleEn}
              </h3>

              {/* Quranic Ayah Surah At-Tawbah 9:36 */}
              <div
                className={`p-3.5 sm:p-4 rounded-2xl border space-y-2 ${
                  isDay ? 'bg-white/85 border-amber-200/75 text-slate-900' : 'bg-[#07191e] border-[#184550] text-amber-50'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-black text-amber-800 dark:text-amber-300">
                    {SACRED_MONTHS_INTRO_PDF.quranRef}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => onPlaySpeech(SACRED_MONTHS_INTRO_PDF.quranArabic, 'sacred_quran_9_36', true)}
                      className="min-h-[34px] min-w-[34px] flex items-center justify-center rounded-lg hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"
                      title={isBn ? 'শুনুন' : 'Listen'}
                    >
                      {isPlayingAudio === 'sacred_quran_9_36' ? (
                        <VolumeX className="w-4 h-4 text-amber-500" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-amber-700 dark:text-amber-300" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        onCopyText(
                          `${SACRED_MONTHS_INTRO_PDF.quranArabic}\n${SACRED_MONTHS_INTRO_PDF.reference}`,
                          'sacred_quran_9_36'
                        )
                      }
                      className="min-h-[34px] min-w-[34px] flex items-center justify-center rounded-lg hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"
                      title={isBn ? 'কপি' : 'Copy'}
                    >
                      {copiedItemId === 'sacred_quran_9_36' ? (
                        <Check className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Copy className="w-4 h-4 text-amber-700 dark:text-amber-300" />
                      )}
                    </button>
                  </div>
                </div>
                <div dir="rtl" className="text-lg sm:text-xl font-arabic font-bold text-right leading-[2.05]">
                  {SACRED_MONTHS_INTRO_PDF.quranArabic}
                </div>
              </div>

              <ul className="space-y-2 pt-1">
                {(isBn ? SACRED_MONTHS_INTRO_PDF.pointsBn : SACRED_MONTHS_INTRO_PDF.pointsEn).map((p, idx) => (
                  <li key={idx} className={`flex items-start gap-2 text-xs sm:text-sm leading-relaxed ${isDay ? 'text-slate-700' : 'text-slate-200'}`}>
                    <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${isDay ? 'text-[#006A4E]' : 'text-emerald-400'}`} />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <div className="text-xs font-mono font-semibold text-amber-700 dark:text-amber-300 pt-1">
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
                  className={`min-h-[48px] p-3 rounded-xl border text-left transition cursor-pointer ${
                    isDay
                      ? 'bg-white border-emerald-200 hover:border-emerald-500 text-slate-900'
                      : 'bg-[#07191e] border-[#184752] hover:border-emerald-400 text-white'
                  }`}
                >
                  <div className="text-[10px] font-mono font-bold tabular-nums text-[#006A4E] dark:text-amber-300">
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
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <div className="text-xs font-bold text-amber-700 dark:text-amber-300">
                      {isBn ? rule.timingBn : rule.timingEn}
                    </div>
                    <h3 className={`text-lg font-black mt-0.5 ${isDay ? 'text-slate-900' : 'text-white'}`}>
                      {isBn ? rule.titleBn : rule.titleEn}
                    </h3>
                  </div>
                  <span className={`text-[11px] font-mono font-semibold ${isDay ? 'text-slate-500' : 'text-teal-200/75'}`}>
                    {rule.slideRefBn}
                  </span>
                </div>

                {renderReferencedPointsList(rule.pointsBn, rule.pointsEn, rule.referencedPoints)}

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
                          className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-xl hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"
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
                          className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-xl hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"
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
              {isBn ? 'দিনের রুটিন এক নজরে (সহিহ হাদিস নম্বর ও বর্ণনাকারীসহ)' : 'Daily Prophetic Snapshot with Narrators & Hadith Citations'}
            </h3>
            <p className={`text-xs sm:text-sm ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
              {isBn
                ? 'যেকোনো সময়-পর্বে ক্লিক করে বিস্তারিত হাদিস, বর্ণনাকারী সাহাবি ও মাসনুন দোয়া পড়ুন'
                : 'Click any row to view detailed narrations, companions & bedtime/prayer duas'}
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
                    className="w-full min-h-[52px] p-3.5 sm:p-4 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-2 cursor-pointer"
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
                    <div className={`px-4 pb-4 pt-3 border-t space-y-3 ${isDay ? 'border-emerald-200/60' : 'border-white/10'}`}>
                      {renderReferencedPointsList(item.slideDetailsBn, item.slideDetailsEn, item.referencedPoints, 'amber')}

                      {item.duaArabic && (
                        <div
                          className={`p-3.5 rounded-xl border space-y-2 ${
                            isDay ? 'bg-teal-50/75 border-teal-200 text-teal-950' : 'bg-[#0a2329] border-[#184954] text-teal-100'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[11px] font-black text-teal-800 dark:text-amber-300">
                              {isBn ? 'নির্বাচিত মাসনুন দোয়া / জিকির' : 'Authentic Sunnah Dua'}
                            </span>
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => onPlaySpeech(item.duaArabic!, `daily_pdf_dua_${item.id}`, true)}
                                className="min-h-[34px] min-w-[34px] flex items-center justify-center rounded-lg hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"
                                title={isBn ? 'শুনুন' : 'Listen'}
                              >
                                {isPlayingAudio === `daily_pdf_dua_${item.id}` ? (
                                  <VolumeX className="w-4 h-4 text-amber-500" />
                                ) : (
                                  <Volume2 className="w-4 h-4 text-teal-700 dark:text-teal-300" />
                                )}
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  onCopyText(
                                    `${item.duaArabic}\n${item.duaPronunciationBn || ''}\n${item.duaMeaningBn || ''}`,
                                    `daily_pdf_dua_${item.id}`
                                  )
                                }
                                className="min-h-[34px] min-w-[34px] flex items-center justify-center rounded-lg hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"
                                title={isBn ? 'কপি' : 'Copy'}
                              >
                                {copiedItemId === `daily_pdf_dua_${item.id}` ? (
                                  <Check className="w-4 h-4 text-emerald-500" />
                                ) : (
                                  <Copy className="w-4 h-4 text-teal-700 dark:text-teal-300" />
                                )}
                              </button>
                            </div>
                          </div>
                          <div dir="rtl" className="text-lg font-arabic font-bold text-right leading-[2.0]">
                            {item.duaArabic}
                          </div>
                          {item.duaPronunciationBn && (
                            <div className="text-xs italic opacity-85">{item.duaPronunciationBn}</div>
                          )}
                          {item.duaMeaningBn && (
                            <div className="text-xs font-medium">{item.duaMeaningBn}</div>
                          )}
                        </div>
                      )}

                      <div className={`text-xs font-mono font-semibold pt-1 flex items-center gap-1.5 ${isDay ? 'text-amber-800' : 'text-amber-300'}`}>
                        <BookMarked className="w-3.5 h-3.5 shrink-0" />
                        <span>{item.reference}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. VERIFIED HADITH & QURAN REFERENCE VAULT (HADITH_BOOK_REFERENCE_LEDGER) */}
      {/* ========================================================================= */}
      <div
        ref={ledgerRef}
        className={`rounded-3xl p-5 sm:p-6 border space-y-4 ${
          isDay ? 'bg-white border-slate-200/90' : 'bg-[#0a2026] border-[#153c45]'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200/70 dark:border-[#153c45]">
          <div className="space-y-0.5">
            <div className={`text-[11px] font-bold ${isDay ? 'text-[#006A4E]' : 'text-amber-300'}`}>
              {isBn ? 'সীরাহ পড়ি · ৬০ স্লাইড ভিত্তিক সম্পূর্ণ দলিল' : 'Complete Citation Audit · 60-Slide Source Ledger'}
            </div>
            <h3 className={`text-base sm:text-lg font-black ${isDay ? 'text-slate-900' : 'text-white'}`}>
              {isBn ? 'হাদিস ও কুরআন রেফারেন্স ইনডেক্স (গ্রন্থ ও নম্বর অনুযায়ী)' : 'Verified Hadith & Quran Reference Vault'}
            </h3>
          </div>
          <span className={`text-xs font-mono font-bold tabular-nums shrink-0 ${isDay ? 'text-slate-500' : 'text-teal-200/80'}`}>
            {isBn ? '৫টি মূল উৎস গ্রন্থ ও তাহকীক' : '5 Core Source Collections'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {HADITH_BOOK_REFERENCE_LEDGER.map((entry, idx) => {
            const copyKey = `ledger_${idx}`;
            const bookName = isBn ? entry.bookBn : entry.bookEn;
            const numbers = isBn ? entry.numbersBn : entry.numbersEn;
            const scope = isBn ? entry.scopeBn : entry.scopeEn;

            return (
              <div
                key={idx}
                className={`p-4 rounded-2xl border space-y-2 ${
                  idx === HADITH_BOOK_REFERENCE_LEDGER.length - 1 ? 'md:col-span-2' : ''
                } ${
                  isDay ? 'bg-slate-50/80 border-slate-200/80' : 'bg-[#07191e] border-[#133841]'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className={`text-sm font-black ${isDay ? 'text-slate-900' : 'text-white'}`}>
                      {bookName}
                    </h4>
                    <p className={`text-[11px] font-medium ${isDay ? 'text-slate-600' : 'text-slate-400'}`}>
                      {scope}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onCopyText(`${bookName}: ${numbers}\n(${scope})`, copyKey)}
                    className="min-h-[34px] min-w-[34px] flex items-center justify-center rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition cursor-pointer shrink-0"
                    title={isBn ? 'নম্বরগুলো কপি করুন' : 'Copy reference numbers'}
                  >
                    {copiedItemId === copyKey ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 opacity-60" />
                    )}
                  </button>
                </div>

                <div
                  className={`text-xs font-mono leading-relaxed tabular-nums break-words ${
                    isDay ? 'text-amber-800' : 'text-amber-300/95'
                  }`}
                >
                  <span className={`font-sans font-bold ${isDay ? 'text-slate-600' : 'text-teal-200/75'}`}>
                    {isBn ? 'হাদিস / আয়াত নম্বর: ' : 'Numbers: '}
                  </span>
                  {numbers}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

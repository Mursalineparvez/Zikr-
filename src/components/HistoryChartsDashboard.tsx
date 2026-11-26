import React, { useMemo, useState } from 'react';
import {
  AamalDayLog,
  HistorySession,
  ThemeMode,
  ZikrItem,
  ZikrLanguage,
} from '../types';
import { AggregatedReportData, HistoryPeriodRange } from '../utils/exportPdf';
import {
  BarChart3,
  TrendingUp,
  HeartHandshake,
  Flame,
  Compass,
  CalendarDays,
  PieChart,
} from 'lucide-react';

interface HistoryChartsDashboardProps {
  reportData: AggregatedReportData;
  allLogs: Record<string, AamalDayLog>;
  selectedRange: HistoryPeriodRange;
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
  liveZikrs?: ZikrItem[];
  historySessions?: HistorySession[];
  masterTotal?: number;
}

const BN_DIGITS = '০১২৩৪৫৬৭৮৯';
const toBn = (val: string | number): string =>
  String(val).replace(/\d/g, (d) => BN_DIGITS[Number(d)]);

const MONTH_SHORT_BN = [
  'জানু', 'ফেব', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
  'জুলাই', 'আগস্ট', 'সেপ্ট', 'অক্টো', 'নভে', 'ডিসে',
];
const MONTH_SHORT_EN = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];
const WEEKDAY_SHORT_BN = ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহঃ', 'শুক্র', 'শনি'];
const WEEKDAY_SHORT_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/** Build a smooth Catmull-Rom cubic Bezier SVG path through (x, y) points */
function buildSmoothAreaPaths(
  pts: Array<{ x: number; y: number }>,
  baselineY: number
): { linePath: string; areaPath: string } {
  if (pts.length === 0) return { linePath: '', areaPath: '' };
  if (pts.length === 1) {
    const p = pts[0];
    return {
      linePath: `M ${p.x} ${p.y}`,
      areaPath: `M ${p.x} ${baselineY} L ${p.x} ${p.y} L ${p.x} ${baselineY} Z`,
    };
  }
  let line = `M ${pts[0].x.toFixed(2)} ${pts[0].y.toFixed(2)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const tension = 0.2;
    const cp1x = p1.x + (p2.x - p0.x) * tension;
    const cp1y = p1.y + (p2.y - p0.y) * tension;
    const cp2x = p2.x - (p3.x - p1.x) * tension;
    const cp2y = p2.y - (p3.y - p1.y) * tension;
    line += ` C ${cp1x.toFixed(2)} ${Math.min(baselineY, Math.max(4, cp1y)).toFixed(2)}, ${cp2x.toFixed(2)} ${Math.min(baselineY, Math.max(4, cp2y)).toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }
  const last = pts[pts.length - 1];
  const area = `${line} L ${last.x.toFixed(2)} ${baselineY.toFixed(2)} L ${pts[0].x.toFixed(2)} ${baselineY.toFixed(2)} Z`;
  return { linePath: line, areaPath: area };
}

export const HistoryChartsDashboard: React.FC<HistoryChartsDashboardProps> = ({
  reportData,
  allLogs,
  selectedRange,
  themeMode = 'day',
  selectedLanguage = 'bn',
  liveZikrs = [],
  historySessions = [],
  masterTotal,
}) => {
  const isDay = themeMode === 'day';
  const isBn = selectedLanguage === 'bn';
  const fmt = (n: number) => {
    const formatted = n.toLocaleString('en-US');
    return isBn ? toBn(formatted) : formatted;
  };

  // Interactive filter states matching screenshot segmented controls
  const [waqtFilter, setWaqtFilter] = useState<'all' | 'fardh' | 'nafl'>('all');
  const [breakdownFilter, setBreakdownFilter] = useState<'all' | 'zikr' | 'aamal'>('all');
  const [trendMetric, setTrendMetric] = useState<'score' | 'dhikr' | 'quran' | 'salah'>('dhikr');
  const [creativeMode, setCreativeMode] = useState<'radar' | 'donut'>('radar');
  const [hoveredBarIdx, setHoveredBarIdx] = useState<number | null>(null);
  const [hoveredTrendIdx, setHoveredTrendIdx] = useState<number | null>(null);
  const [selectedHeatmapKey, setSelectedHeatmapKey] = useState<string | null>(null);

  // Surface tokens aligned with app theme + clean reference card styling
  const cardCls = isDay
    ? 'bg-white border border-slate-200/90 shadow-xs text-slate-900'
    : 'bg-[#082024] border border-[#184850] text-slate-100';
  const segWrapCls = isDay
    ? 'bg-slate-100/90 border border-slate-200/80 p-0.5 rounded-xl flex items-center gap-0.5 shrink-0'
    : 'bg-[#041518] border border-[#184850] p-0.5 rounded-xl flex items-center gap-0.5 shrink-0';
  const segActiveCls = isDay
    ? 'bg-white text-[var(--app-primary,#006A4E)] shadow-xs font-extrabold'
    : 'bg-[var(--app-primary,#006A4E)] text-white shadow-xs font-extrabold';
  const segIdleCls = isDay
    ? 'text-slate-600 hover:text-slate-900 font-semibold'
    : 'text-slate-300 hover:text-white font-semibold';
  const iconBadgeCls = isDay
    ? 'w-9 h-9 rounded-xl bg-[var(--app-surface-soft,#e9f6ef)] text-[var(--app-primary,#006A4E)] flex items-center justify-center shrink-0'
    : 'w-9 h-9 rounded-xl bg-[var(--app-dark-surface-soft,#0c3138)] text-[var(--app-primary-light,#6ee7b7)] flex items-center justify-center shrink-0';

  // ==================== 1. VERTICAL BAR CHART DATA (Waqt & Prayers) ====================
  const barChartItems = useMemo(() => {
    const denom = Math.max(1, reportData.totalDays);
    const logs = reportData.dailyLogs;

    // Count Sunnah / Nafl items from raw allLogs in current date window
    let fajrSunnah = 0;
    let dhuhrSunnah = 0;
    let maghribSunnah = 0;
    let ishaSunnah = 0;
    let witrCount = 0;
    let jamatCount = 0;

    logs.forEach((dl) => {
      const raw = allLogs[dl.dateKey];
      if (!raw?.items) return;
      const map = new Map(raw.items.map((i) => [i.id, i.completed]));
      if (map.get('fajr_sunnah')) fajrSunnah++;
      if (map.get('dhuhr_sunnah_before') || map.get('dhuhr_sunnah_after') || map.get('jummah_kabla')) dhuhrSunnah++;
      if (map.get('maghrib_sunnah')) maghribSunnah++;
      if (map.get('isha_sunnah_after') || map.get('isha_sunnah_before')) ishaSunnah++;
      if (map.get('witr')) witrCount++;
      if (map.get('jamat_fardh')) jamatCount++;
    });

    const fardhBars = [
      { label: isBn ? 'ফজর' : 'Fajr', count: reportData.prayerStats.fajr },
      { label: isBn ? 'যোহর' : 'Dhuhr', count: reportData.prayerStats.dhuhr },
      { label: isBn ? 'আছর' : 'Asr', count: reportData.prayerStats.asr },
      { label: isBn ? 'মাগরিব' : 'Maghrib', count: reportData.prayerStats.maghrib },
      { label: isBn ? 'ইশা' : 'Isha', count: reportData.prayerStats.isha },
      { label: isBn ? 'জামাত' : 'Jamat', count: jamatCount },
    ];

    const naflBars = [
      { label: isBn ? 'ফ. সুন্নত' : 'Fajr Sun.', count: fajrSunnah },
      { label: isBn ? 'য. সুন্নত' : 'Dhuhr Sun.', count: dhuhrSunnah },
      { label: isBn ? 'বিতর' : 'Witr', count: witrCount },
      { label: isBn ? 'তাহাজ্জুদ' : 'Tahajjud', count: reportData.prayerStats.tahajjud },
      { label: isBn ? 'চাশত' : 'Duha', count: reportData.prayerStats.duha },
      { label: isBn ? 'মা. সুন্নত' : 'Magh. Sun.', count: maghribSunnah + ishaSunnah > 0 ? Math.round((maghribSunnah + ishaSunnah) / 2) : 0 },
    ];

    const allBars = [
      { label: isBn ? 'ফজর' : 'Fajr', count: reportData.prayerStats.fajr },
      { label: isBn ? 'যোহর' : 'Dhuhr', count: reportData.prayerStats.dhuhr },
      { label: isBn ? 'আছর' : 'Asr', count: reportData.prayerStats.asr },
      { label: isBn ? 'মাগরিব' : 'Maghrib', count: reportData.prayerStats.maghrib },
      { label: isBn ? 'ইশা' : 'Isha', count: reportData.prayerStats.isha },
      { label: isBn ? 'তাহাজ্জুদ' : 'Tahajjud', count: reportData.prayerStats.tahajjud },
    ];

    const chosen = waqtFilter === 'fardh' ? fardhBars : waqtFilter === 'nafl' ? naflBars : allBars;
    return chosen.map((b) => ({
      ...b,
      pct: Math.min(100, Math.round((b.count / denom) * 100)),
    }));
  }, [reportData, allLogs, waqtFilter, isBn]);

  const maxBarValue = useMemo(() => {
    const m = Math.max(...barChartItems.map((b) => b.count), 1);
    return Math.max(4, Math.ceil(m / 4) * 4);
  }, [barChartItems]);

  // ==================== 2. HORIZONTAL PROGRESS BARS (Daily Aamal & Zikr Breakdown) ====================
  const horizontalItems = useMemo(() => {
    const denom = Math.max(1, reportData.totalDays);

    // Aggregate richer Aamal categories across daily logs in range
    const catTotals: Record<string, { labelBn: string; labelEn: string; done: number; total: number }> = {
      prayer: { labelBn: 'দৈনিক নামাজ (ফরজ ও সুন্নত)', labelEn: 'Daily Prayers', done: 0, total: 0 },
      quran: { labelBn: 'কুরআন ও জিকির', labelEn: 'Quran & Dhikr', done: 0, total: 0 },
      morning_evening: { labelBn: 'সকাল-সন্ধ্যার আজকার', labelEn: 'Morning & Evening Adhkar', done: 0, total: 0 },
      sunnah: { labelBn: 'অতিরিক্ত নফল ও তাহাজ্জুদ', labelEn: 'Extra Sunnah & Nafl', done: 0, total: 0 },
      character: { labelBn: 'আখলাক, সদকা ও ঘুমানোর আমল', labelEn: 'Akhlaq, Charity & Bedtime', done: 0, total: 0 },
    };

    reportData.dailyLogs.forEach((dl) => {
      const raw = allLogs[dl.dateKey];
      if (!raw?.items) return;
      raw.items.forEach((item) => {
        const key =
          item.category === 'prayer'
            ? 'prayer'
            : item.category === 'quran' || item.category === 'dhikr'
            ? 'quran'
            : item.category === 'morning_evening'
            ? 'morning_evening'
            : item.category === 'sunnah'
            ? 'sunnah'
            : 'character';
        catTotals[key].total += 1;
        if (item.completed) catTotals[key].done += 1;
      });
    });

    const aamalRows = Object.values(catTotals).map((c) => ({
      label: isBn ? c.labelBn : c.labelEn,
      countText: isBn ? `${fmt(c.done)}টি আমল` : `${fmt(c.done)} deeds`,
      pct: c.total > 0 ? Math.round((c.done / c.total) * 100) : 0,
    }));

    // Individual Zikrs from reportData + liveZikrs + historySessions
    const mergedZikr: Record<string, { name: string; count: number }> = {};
    Object.values(reportData.zikrBreakdownMap).forEach((z) => {
      mergedZikr[z.name] = { name: z.name, count: z.totalCount };
    });
    // Fallback / supplement from liveZikrs if daily breakdown wasn't recorded yet
    if (Object.values(mergedZikr).every((z) => z.count === 0)) {
      liveZikrs.forEach((z) => {
        if (z.count > 0) {
          mergedZikr[z.name] = { name: z.name, count: z.count };
        }
      });
    }
    const zikrSum = Object.values(mergedZikr).reduce((s, z) => s + z.count, 0);
    const zikrRows = Object.values(mergedZikr)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
      .map((z) => ({
        label: z.name,
        countText: isBn ? `${fmt(z.count)} বার` : `${fmt(z.count)}x`,
        pct: zikrSum > 0 ? Math.round((z.count / zikrSum) * 100) : 0,
      }));

    if (breakdownFilter === 'zikr') {
      return zikrRows.length > 0
        ? zikrRows
        : [
            {
              label: isBn ? 'এখনো কোনো জিকির রেকর্ড হয়নি' : 'No dhikr recorded yet',
              countText: isBn ? '০ বার' : '0x',
              pct: 0,
            },
          ];
    }

    if (breakdownFilter === 'aamal') {
      return aamalRows;
    }

    // 'all': blended top Aamal habits across the period
    const blended = [
      {
        label: isBn ? '৫ ওয়াক্ত ফরজ সালাত' : '5 Daily Fardh Salah',
        countText: isBn ? `${fmt(reportData.prayerStats.fardhTotal)} ওয়াক্ত` : `${fmt(reportData.prayerStats.fardhTotal)} waqts`,
        pct: Math.min(100, Math.round((reportData.prayerStats.fardhTotal / (denom * 5)) * 100)),
      },
      {
        label: isBn ? 'কুরআন তিলাওয়াত' : 'Quran Recitation',
        countText: isBn ? `${fmt(reportData.totalQuranPagesSum)} পৃষ্ঠা` : `${fmt(reportData.totalQuranPagesSum)} pages`,
        pct: Math.min(100, Math.round((reportData.otherDeedsStats.quranDays / denom) * 100)),
      },
      {
        label: isBn ? 'দরুদ ও ইস্তিগফার' : 'Salawat & Istighfar',
        countText: isBn
          ? `${fmt(reportData.otherDeedsStats.salawatDays + reportData.otherDeedsStats.istighfarDays)} বার/দিন`
          : `${fmt(reportData.otherDeedsStats.salawatDays + reportData.otherDeedsStats.istighfarDays)} days`,
        pct: Math.min(
          100,
          Math.round(((reportData.otherDeedsStats.salawatDays + reportData.otherDeedsStats.istighfarDays) / (denom * 2)) * 100)
        ),
      },
      {
        label: isBn ? 'সকাল-সন্ধ্যার আজকার' : 'Morning/Evening Adhkar',
        countText: isBn ? `${fmt(reportData.otherDeedsStats.adhkarDays)} দিন` : `${fmt(reportData.otherDeedsStats.adhkarDays)} days`,
        pct: Math.min(100, Math.round((reportData.otherDeedsStats.adhkarDays / denom) * 100)),
      },
      {
        label: isBn ? 'সদকা ও আত্মশুদ্ধি' : 'Charity & Gratitude',
        countText: isBn
          ? `${fmt(reportData.otherDeedsStats.sadaqahDays + reportData.otherDeedsStats.gratitudeDays)} দিন`
          : `${fmt(reportData.otherDeedsStats.sadaqahDays + reportData.otherDeedsStats.gratitudeDays)} days`,
        pct: Math.min(
          100,
          Math.round(((reportData.otherDeedsStats.sadaqahDays + reportData.otherDeedsStats.gratitudeDays) / (denom * 2)) * 100)
        ),
      },
    ];
    return blended;
  }, [reportData, allLogs, liveZikrs, breakdownFilter, isBn]);

  // ==================== 3. SMOOTH AREA / LINE CHART TIMELINE ====================
  const trendSeries = useMemo(() => {
    const today = new Date();
    const pts: Array<{
      label: string;
      fullDate: string;
      score: number;
      dhikr: number;
      quran: number;
      salah: number;
    }> = [];

    const readDay = (dateKey: string) => {
      const l = allLogs[dateKey];
      if (!l) return { score: 0, dhikr: 0, quran: 0, salah: 0 };
      const map = new Map((l.items || []).map((i) => [i.id, i.completed]));
      const salah = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'].filter((id) => map.get(id)).length;
      return {
        score: Math.round((l.completedRatio || 0) * 100),
        dhikr: l.dhikrCount || 0,
        quran: l.quranPagesRead || 0,
        salah,
      };
    };

    if (selectedRange === '1day' || selectedRange === '1month') {
      // Build continuous daily points (12 days for 1day context or 30 days for 1month)
      const span = selectedRange === '1day' ? 10 : 30;
      for (let i = span - 1; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const key = d.toISOString().split('T')[0];
        const stats = readDay(key);
        const dayNum = d.getDate();
        const mon = isBn ? MONTH_SHORT_BN[d.getMonth()] : MONTH_SHORT_EN[d.getMonth()];
        pts.push({
          label: isBn ? `${toBn(dayNum)} ${mon}` : `${dayNum} ${mon}`,
          fullDate: key,
          ...stats,
        });
      }
    } else if (selectedRange === '4months') {
      // 16 weekly buckets
      for (let w = 15; w >= 0; w--) {
        let sumScore = 0;
        let sumDhikr = 0;
        let sumQuran = 0;
        let sumSalah = 0;
        let endLabel = '';
        for (let dOffset = 6; dOffset >= 0; dOffset--) {
          const d = new Date(today);
          d.setDate(d.getDate() - (w * 7 + dOffset));
          const key = d.toISOString().split('T')[0];
          const s = readDay(key);
          sumScore += s.score;
          sumDhikr += s.dhikr;
          sumQuran += s.quran;
          sumSalah += s.salah;
          if (dOffset === 0) {
            const mon = isBn ? MONTH_SHORT_BN[d.getMonth()] : MONTH_SHORT_EN[d.getMonth()];
            endLabel = isBn ? `${toBn(d.getDate())} ${mon}` : `${d.getDate()} ${mon}`;
          }
        }
        pts.push({
          label: endLabel,
          fullDate: isBn ? `সপ্তাহ ${toBn(16 - w)}` : `Week ${16 - w}`,
          score: Math.round(sumScore / 7),
          dhikr: sumDhikr,
          quran: sumQuran,
          salah: sumSalah,
        });
      }
    } else {
      // 12 monthly buckets (1year / 10years)
      const months = 12;
      for (let mOffset = months - 1; mOffset >= 0; mOffset--) {
        const refDate = new Date(today.getFullYear(), today.getMonth() - mOffset, 1);
        const ymPrefix = `${refDate.getFullYear()}-${String(refDate.getMonth() + 1).padStart(2, '0')}`;
        let sumScore = 0;
        let sumDhikr = 0;
        let sumQuran = 0;
        let sumSalah = 0;
        let daysInMonthCount = 0;
        Object.keys(allLogs).forEach((k) => {
          if (k.startsWith(ymPrefix)) {
            const s = readDay(k);
            sumScore += s.score;
            sumDhikr += s.dhikr;
            sumQuran += s.quran;
            sumSalah += s.salah;
            daysInMonthCount++;
          }
        });
        // Add matching historySessions in this month if no daily logs exist
        if (sumDhikr === 0 && historySessions.length > 0) {
          historySessions.forEach((hs) => {
            const hsDate = new Date(hs.timestamp);
            const hsYm = `${hsDate.getFullYear()}-${String(hsDate.getMonth() + 1).padStart(2, '0')}`;
            if (hsYm === ymPrefix) sumDhikr += hs.totalCount || 0;
          });
        }
        const mShort = isBn ? MONTH_SHORT_BN[refDate.getMonth()] : MONTH_SHORT_EN[refDate.getMonth()];
        const yrShort = String(refDate.getFullYear()).slice(-2);
        pts.push({
          label: isBn ? `${mShort} ${toBn(yrShort)}` : `${mShort} ${yrShort}`,
          fullDate: isBn ? `${mShort} ${toBn(refDate.getFullYear())}` : `${mShort} ${refDate.getFullYear()}`,
          score: daysInMonthCount > 0 ? Math.round(sumScore / daysInMonthCount) : 0,
          dhikr: sumDhikr,
          quran: sumQuran,
          salah: sumSalah,
        });
      }
    }

    return pts;
  }, [allLogs, historySessions, selectedRange, isBn]);

  const trendValues = useMemo(
    () =>
      trendSeries.map((p) =>
        trendMetric === 'score'
          ? p.score
          : trendMetric === 'dhikr'
          ? p.dhikr
          : trendMetric === 'quran'
          ? p.quran
          : p.salah
      ),
    [trendSeries, trendMetric]
  );

  const trendMax = useMemo(() => {
    if (trendMetric === 'score') return 100;
    const peak = Math.max(...trendValues, 1);
    return Math.ceil(peak / 4) * 4;
  }, [trendValues, trendMetric]);

  const svgWidth = 760;
  const svgHeight = 220;
  const padL = 44;
  const padR = 16;
  const padT = 16;
  const padB = 34;
  const plotW = svgWidth - padL - padR;
  const plotH = svgHeight - padT - padB;

  const trendPoints = useMemo(() => {
    const n = Math.max(1, trendValues.length - 1);
    return trendValues.map((val, idx) => ({
      x: padL + (idx / n) * plotW,
      y: padT + plotH - (Math.min(val, trendMax) / Math.max(1, trendMax)) * plotH,
      val,
    }));
  }, [trendValues, trendMax, plotW, plotH]);

  const { linePath, areaPath } = useMemo(
    () => buildSmoothAreaPaths(trendPoints, padT + plotH),
    [trendPoints, plotH]
  );

  // ==================== 4. CREATIVE RADAR + DONUT DATA ====================
  const radarMetrics = useMemo(() => {
    const denom = Math.max(1, reportData.totalDays);
    const salahPct = Math.min(100, Math.round((reportData.prayerStats.fardhTotal / (denom * 5)) * 100));
    const dhikrPct = Math.min(
      100,
      reportData.totalDhikrSum > 0
        ? Math.round((reportData.totalDhikrSum / (denom * 100)) * 100)
        : 0
    );
    const quranPct = Math.min(
      100,
      Math.round((reportData.otherDeedsStats.quranDays / denom) * 100)
    );
    const sunnahPct = Math.min(
      100,
      Math.round(((reportData.prayerStats.tahajjud + reportData.prayerStats.duha + reportData.otherDeedsStats.adhkarDays) / (denom * 2)) * 100)
    );
    const deedsPct = Math.min(
      100,
      Math.round(((reportData.otherDeedsStats.istighfarDays + reportData.otherDeedsStats.salawatDays + reportData.otherDeedsStats.sadaqahDays) / (denom * 3)) * 100)
    );
    return [
      { label: isBn ? 'নামাজ' : 'Salah', value: salahPct },
      { label: isBn ? 'জিকির' : 'Dhikr', value: dhikrPct },
      { label: isBn ? 'কুরআন' : 'Quran', value: quranPct },
      { label: isBn ? 'সুন্নত/নফল' : 'Sunnah', value: sunnahPct },
      { label: isBn ? 'আত্মশুদ্ধি' : 'Deeds', value: deedsPct },
    ];
  }, [reportData, isBn]);

  // ==================== 5. 12-WEEK (84-DAY) CONSISTENCY HEATMAP ====================
  const heatmapGrid = useMemo(() => {
    const today = new Date();
    const cells: Array<{
      dateKey: string;
      score: number;
      dhikr: number;
      quran: number;
      salah: number;
      level: 0 | 1 | 2 | 3 | 4;
    }> = [];
    // Align to 12 full weeks (84 days) ending today
    for (let i = 83; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      const l = allLogs[key];
      const score = l ? Math.round((l.completedRatio || 0) * 100) : 0;
      const dhikr = l?.dhikrCount || 0;
      const quran = l?.quranPagesRead || 0;
      const map = new Map((l?.items || []).map((it) => [it.id, it.completed]));
      const salah = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'].filter((id) => map.get(id)).length;
      const activeSignal = score > 0 ? score : dhikr > 0 || quran > 0 || salah > 0 ? 25 : 0;
      const level: 0 | 1 | 2 | 3 | 4 =
        activeSignal === 0 ? 0 : activeSignal < 30 ? 1 : activeSignal < 60 ? 2 : activeSignal < 85 ? 3 : 4;
      cells.push({ dateKey: key, score, dhikr, quran, salah, level });
    }
    return cells;
  }, [allLogs]);

  const streakStats = useMemo(() => {
    let current = 0;
    let best = 0;
    let running = 0;
    const now = new Date();
    for (let i = 0; i < 365; i++) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      const l = allLogs[key];
      const hasDone = Boolean(l && ((l.completedRatio || 0) >= 0.15 || l.dhikrCount > 0 || l.quranPagesRead > 0));
      if (hasDone) {
        running++;
        best = Math.max(best, running);
      } else {
        if (i === 0) continue;
        if (current === 0) current = running;
        running = 0;
      }
    }
    if (current === 0) current = running;
    return { current, best };
  }, [allLogs]);

  // ==================== 6. DAY-OF-WEEK PERFORMANCE PATTERN ====================
  const weekdayPattern = useMemo(() => {
    const buckets = Array.from({ length: 7 }, (_, idx) => ({
      dayIndex: idx,
      label: isBn ? WEEKDAY_SHORT_BN[idx] : WEEKDAY_SHORT_EN[idx],
      scoreSum: 0,
      dhikrSum: 0,
      count: 0,
    }));
    reportData.dailyLogs.forEach((dl) => {
      const [y, m, d] = dl.dateKey.split('-').map(Number);
      const dow = new Date(y, m - 1, d).getDay();
      buckets[dow].scoreSum += Math.round((dl.completedRatio || 0) * 100);
      buckets[dow].dhikrSum += dl.dhikrCount || 0;
      buckets[dow].count += 1;
    });
    return buckets.map((b) => ({
      ...b,
      avgScore: b.count > 0 ? Math.round(b.scoreSum / b.count) : 0,
      avgDhikr: b.count > 0 ? Math.round(b.dhikrSum / b.count) : 0,
    }));
  }, [reportData.dailyLogs, isBn]);

  const bestWeekday = useMemo(() => {
    const sorted = [...weekdayPattern].sort((a, b) => b.avgScore - a.avgScore || b.avgDhikr - a.avgDhikr);
    return sorted[0]?.avgScore > 0 || sorted[0]?.avgDhikr > 0 ? sorted[0].label : null;
  }, [weekdayPattern]);

  const activeTrendPoint =
    hoveredTrendIdx !== null && trendSeries[hoveredTrendIdx]
      ? trendSeries[hoveredTrendIdx]
      : null;

  const selectedHeatmapCell = useMemo(() => {
    if (!selectedHeatmapKey) return heatmapGrid[heatmapGrid.length - 1];
    return heatmapGrid.find((c) => c.dateKey === selectedHeatmapKey) || heatmapGrid[heatmapGrid.length - 1];
  }, [selectedHeatmapKey, heatmapGrid]);

  const totalTrendSum = useMemo(() => {
    if (trendMetric === 'score') return reportData.avgCompletionRate;
    if (trendMetric === 'dhikr') {
      const s = trendValues.reduce((a, b) => a + b, 0);
      return masterTotal && masterTotal > s ? masterTotal : s;
    }
    return trendValues.reduce((a, b) => a + b, 0);
  }, [trendMetric, trendValues, reportData.avgCompletionRate, masterTotal]);

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* ==================== ROW 1: REFERENCE 2-COLUMN CHARTS ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* CHART 1: VERTICAL ROUNDED-TOP BAR CHART (Matching Top-Left Reference Card) */}
        <div className={`rounded-2xl p-4 sm:p-5 ${cardCls}`}>
          <div className="flex items-start justify-between gap-2 mb-4 flex-wrap">
            <div className="flex items-center gap-3 min-w-0">
              <div className={iconBadgeCls}>
                <BarChart3 className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm sm:text-base font-extrabold tracking-tight truncate">
                  {isBn ? 'নামাজ ও ওয়াক্ত অনুযায়ী গ্রাফ' : 'Salah & Waqt Breakdown'}
                </h3>
                <p className={`text-[11px] truncate ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                  {isBn ? 'কোন ওয়াক্তে কত শতাংশ আমল আদায় হয়েছে' : 'Completion ratio across prayers & nawafil'}
                </p>
              </div>
            </div>

            <div className={segWrapCls}>
              {(
                [
                  { id: 'all', bn: 'সবাই', en: 'All' },
                  { id: 'fardh', bn: 'ফরজ', en: 'Fardh' },
                  { id: 'nafl', bn: 'সুন্নত/নফল', en: 'Sunnah' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setWaqtFilter(tab.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] whitespace-nowrap shrink-0 transition cursor-pointer ${
                    waqtFilter === tab.id ? segActiveCls : segIdleCls
                  }`}
                >
                  {isBn ? tab.bn : tab.en}
                </button>
              ))}
            </div>
          </div>

          {/* Vertical Bar Chart Canvas */}
          <div className="relative pt-5 pb-1">
            <div className="flex">
              {/* Y-Axis Labels */}
              <div
                className={`flex flex-col justify-between text-right pr-2.5 text-[10px] font-semibold tabular-nums h-44 pb-6 ${
                  isDay ? 'text-slate-400' : 'text-slate-400'
                }`}
              >
                <span>{fmt(maxBarValue)}</span>
                <span>{fmt(Math.round(maxBarValue * 0.75))}</span>
                <span>{fmt(Math.round(maxBarValue * 0.5))}</span>
                <span>{fmt(Math.round(maxBarValue * 0.25))}</span>
                <span>{fmt(0)}</span>
              </div>

              {/* Gridlines & Bars */}
              <div className="flex-1 relative h-44 pb-6 flex flex-col justify-between">
                {[0, 1, 2, 3, 4].map((lineIdx) => (
                  <div
                    key={lineIdx}
                    className={`w-full border-t ${
                      isDay ? 'border-slate-100' : 'border-[#153e46]/80'
                    }`}
                  />
                ))}

                {/* Bars Layer */}
                <div className="absolute inset-x-0 top-0 bottom-6 flex items-end justify-around gap-2 px-2">
                  {barChartItems.map((item, idx) => {
                    const heightPct = Math.max(
                      item.count > 0 ? 8 : 3,
                      Math.round((item.count / maxBarValue) * 100)
                    );
                    const isHovered = hoveredBarIdx === idx;
                    return (
                      <div
                        key={item.label}
                        onMouseEnter={() => setHoveredBarIdx(idx)}
                        onMouseLeave={() => setHoveredBarIdx(null)}
                        onClick={() => setHoveredBarIdx(isHovered ? null : idx)}
                        className="flex-1 flex flex-col items-center justify-end h-full group cursor-pointer relative max-w-[44px]"
                      >
                        {/* Value % Label directly above bar (matches reference screenshot!) */}
                        <span
                          className={`text-[10px] font-bold tabular-nums mb-1 transition-transform ${
                            isHovered
                              ? 'text-[var(--app-primary,#006A4E)] dark:text-amber-300 scale-110'
                              : isDay
                              ? 'text-slate-600'
                              : 'text-slate-300'
                          }`}
                        >
                          {isBn ? `${toBn(item.pct)}%` : `${item.pct}%`}
                        </span>

                        {/* Rounded-Top Bar */}
                        <div
                          style={{ height: `${heightPct}%` }}
                          className={`w-full max-w-[30px] rounded-t-md transition-all duration-500 ${
                            item.count === 0
                              ? isDay
                                ? 'bg-slate-200/80'
                                : 'bg-[#133b42]'
                              : isHovered
                              ? 'bg-[var(--app-primary,#006A4E)] brightness-110 shadow-sm'
                              : 'bg-[var(--app-primary-mid,#059669)]'
                          }`}
                        />

                        {/* Hover Readout Tooltip */}
                        {isHovered && (
                          <div
                            className={`absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-lg text-[10px] font-bold whitespace-nowrap shadow-md z-20 pointer-events-none ${
                              isDay ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'
                            }`}
                          >
                            {item.label}: {fmt(item.count)} {isBn ? 'দিন' : 'days'}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* X-Axis Labels */}
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-around gap-1 px-2">
                  {barChartItems.map((item) => (
                    <span
                      key={item.label}
                      className={`flex-1 text-center text-[10px] sm:text-[11px] font-semibold truncate ${
                        isDay ? 'text-slate-500' : 'text-slate-300'
                      }`}
                    >
                      {item.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CHART 2: HORIZONTAL PROGRESS BARS (Matching Top-Right Reference Card) */}
        <div className={`rounded-2xl p-4 sm:p-5 ${cardCls}`}>
          <div className="flex items-start justify-between gap-2 mb-4 flex-wrap">
            <div className="flex items-center gap-3 min-w-0">
              <div className={iconBadgeCls}>
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm sm:text-base font-extrabold tracking-tight truncate">
                  {isBn ? 'দৈনিক আমল ও জিকির বিভাজন' : 'Aamal & Dhikr Distribution'}
                </h3>
                <p className={`text-[11px] truncate ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                  {isBn ? 'কোন ইবাদত কতবার সম্পন্ন ও মোট অংশ' : 'Counts and percentage share per category'}
                </p>
              </div>
            </div>

            <div className={segWrapCls}>
              {(
                [
                  { id: 'all', bn: 'সবাই', en: 'All' },
                  { id: 'zikr', bn: 'জিকির', en: 'Dhikr' },
                  { id: 'aamal', bn: 'আমল', en: 'Deeds' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setBreakdownFilter(tab.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] whitespace-nowrap shrink-0 transition cursor-pointer ${
                    breakdownFilter === tab.id ? segActiveCls : segIdleCls
                  }`}
                >
                  {isBn ? tab.bn : tab.en}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3.5 pt-1">
            {horizontalItems.map((row, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-baseline justify-between gap-3 text-xs">
                  <span className={`font-bold truncate ${isDay ? 'text-slate-800' : 'text-slate-100'}`}>
                    {row.label}
                  </span>
                  <span className={`text-[11px] font-bold tabular-nums shrink-0 ${isDay ? 'text-slate-500' : 'text-slate-300'}`}>
                    {row.countText} · {isBn ? `${toBn(row.pct)}%` : `${row.pct}%`}
                  </span>
                </div>
                <div
                  className={`w-full h-2.5 rounded-full overflow-hidden ${
                    isDay ? 'bg-slate-100' : 'bg-[#041518]'
                  }`}
                >
                  <div
                    style={{ width: `${Math.max(row.pct > 0 ? 3 : 0, row.pct)}%` }}
                    className="h-full rounded-full bg-[var(--app-primary-mid,#059669)] transition-all duration-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ==================== ROW 2: SMOOTH CUBIC-BEZIER AREA CHART (Matching Bottom Reference Card) ==================== */}
      <div className={`rounded-2xl p-4 sm:p-5 ${cardCls}`}>
        <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
          <div className="flex items-center gap-3 min-w-0">
            <div className={iconBadgeCls}>
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-extrabold tracking-tight">
                {trendMetric === 'dhikr'
                  ? isBn
                    ? 'ধারাবাহিক জিকির ও তাসবীহ গ্রাফ'
                    : 'Continuous Dhikr Activity Curve'
                  : trendMetric === 'score'
                  ? isBn
                    ? 'দৈনিক আমল স্কোর অগ্রগতি (%)'
                    : 'Daily Aamal Completion Score (%)'
                  : trendMetric === 'quran'
                  ? isBn
                    ? 'কুরআন তিলাওয়াত (পৃষ্ঠা) গ্রাফ'
                    : 'Quran Reading Trend (Pages)'
                  : isBn
                  ? 'দৈনিক নামাজের ধারাবাহিকতা'
                  : 'Daily Salah Consistency Curve'}
              </h3>
              <p className={`text-[11px] tabular-nums ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                {trendMetric === 'score'
                  ? isBn
                    ? `নির্বাচিত সময়কালে গড় আমল স্কোর: ${toBn(totalTrendSum)}% · ${toBn(reportData.activeDaysCount)} দিন সক্রিয়`
                    : `Average score: ${totalTrendSum}% · ${reportData.activeDaysCount} active days`
                  : trendMetric === 'dhikr'
                  ? isBn
                    ? `মোট ${fmt(totalTrendSum)} বার জিকির • আজকের গ্রাফ ও চলমান প্রবণতা`
                    : `Total ${fmt(totalTrendSum)} dhikr recorded across timeline`
                  : trendMetric === 'quran'
                  ? isBn
                    ? `মোট ${fmt(totalTrendSum)} পৃষ্ঠা কুরআন তিলাওয়াত সম্পন্ন`
                    : `Total ${fmt(totalTrendSum)} Quran pages recited`
                  : isBn
                  ? `মোট ${fmt(totalTrendSum)} ওয়াক্ত ফরজ নামাজ আদায়`
                  : `Total ${fmt(totalTrendSum)} Fardh prayers completed`}
              </p>
            </div>
          </div>

          <div className={segWrapCls}>
            {(
              [
                { id: 'dhikr', bn: 'জিকির', en: 'Dhikr' },
                { id: 'score', bn: 'আমল %', en: 'Score %' },
                { id: 'quran', bn: 'কুরআন', en: 'Quran' },
                { id: 'salah', bn: 'নামাজ', en: 'Salah' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setTrendMetric(tab.id);
                  setHoveredTrendIdx(null);
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] whitespace-nowrap shrink-0 transition cursor-pointer ${
                  trendMetric === tab.id ? segActiveCls : segIdleCls
                }`}
              >
                {isBn ? tab.bn : tab.en}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Tooltip Readout Bar */}
        <div className="flex items-center justify-between text-[11px] mb-2 px-1">
          <span className={isDay ? 'text-slate-500 font-medium' : 'text-slate-400 font-medium'}>
            {activeTrendPoint
              ? `${activeTrendPoint.fullDate}: ${fmt(
                  trendMetric === 'score'
                    ? activeTrendPoint.score
                    : trendMetric === 'dhikr'
                    ? activeTrendPoint.dhikr
                    : trendMetric === 'quran'
                    ? activeTrendPoint.quran
                    : activeTrendPoint.salah
                )}${trendMetric === 'score' ? '%' : ''}`
              : isBn
              ? 'যেকোনো বিন্দুতে ট্যাপ/মাউস রাখলে বিস্তারিত দেখা যাবে'
              : 'Hover or tap points along the curve for daily values'}
          </span>
          <span className="font-bold tabular-nums text-[var(--app-primary,#006A4E)] dark:text-[var(--app-primary-light,#6ee7b7)]">
            {isBn ? `সর্বোচ্চ: ${fmt(Math.max(...trendValues, 0))}` : `Peak: ${fmt(Math.max(...trendValues, 0))}`}
            {trendMetric === 'score' ? '%' : ''}
          </span>
        </div>

        {/* Responsive SVG Smooth Area Chart */}
        <div className="w-full overflow-hidden">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full h-48 sm:h-56 select-none overflow-visible"
            role="img"
            aria-label="Smooth Aamal Trend Area Chart"
          >
            <defs>
              <linearGradient id="historyAreaFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--app-primary-mid, #059669)" stopOpacity="0.28" />
                <stop offset="100%" stopColor="var(--app-primary-mid, #059669)" stopOpacity="0.02" />
              </linearGradient>
            </defs>

            {/* Horizontal Gridlines + Y-axis labels */}
            {[0, 0.25, 0.5, 0.75, 1].map((frac, idx) => {
              const yPos = padT + plotH * (1 - frac);
              const labelVal = Math.round(trendMax * frac);
              return (
                <g key={idx}>
                  <line
                    x1={padL}
                    x2={svgWidth - padR}
                    y1={yPos}
                    y2={yPos}
                    stroke={isDay ? '#e2e8f0' : '#184850'}
                    strokeWidth="1"
                  />
                  <text
                    x={padL - 8}
                    y={yPos + 3.5}
                    textAnchor="end"
                    fontSize="10"
                    fontWeight="600"
                    fill={isDay ? '#64748b' : '#94a3b8'}
                  >
                    {fmt(labelVal)}{trendMetric === 'score' ? '%' : ''}
                  </text>
                </g>
              );
            })}

            {/* Translucent Gradient Area Fill */}
            {areaPath && <path d={areaPath} fill="url(#historyAreaFill)" />}

            {/* Crisp Curve Stroke */}
            {linePath && (
              <path
                d={linePath}
                fill="none"
                stroke="var(--app-primary-mid, #059669)"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Vertical Hover Crosshair & Active Dot */}
            {hoveredTrendIdx !== null && trendPoints[hoveredTrendIdx] && (
              <g>
                <line
                  x1={trendPoints[hoveredTrendIdx].x}
                  x2={trendPoints[hoveredTrendIdx].x}
                  y1={padT}
                  y2={padT + plotH}
                  stroke="var(--app-primary, #006A4E)"
                  strokeWidth="1.2"
                  strokeDasharray="3 3"
                />
                <circle
                  cx={trendPoints[hoveredTrendIdx].x}
                  cy={trendPoints[hoveredTrendIdx].y}
                  r="6"
                  fill="var(--app-primary, #006A4E)"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                />
              </g>
            )}

            {/* Interactive Hit Targets & Visible Subtle Dots */}
            {trendPoints.map((pt, idx) => {
              const hitW = Math.max(18, plotW / Math.max(1, trendPoints.length));
              return (
                <g
                  key={idx}
                  onMouseEnter={() => setHoveredTrendIdx(idx)}
                  onMouseLeave={() => setHoveredTrendIdx(null)}
                  onClick={() => setHoveredTrendIdx(idx)}
                  className="cursor-pointer"
                >
                  <rect
                    x={pt.x - hitW / 2}
                    y={padT}
                    width={hitW}
                    height={plotH}
                    fill="transparent"
                  />
                  {pt.val > 0 && hoveredTrendIdx !== idx && (
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="3"
                      fill="var(--app-primary-mid, #059669)"
                      stroke={isDay ? '#ffffff' : '#082024'}
                      strokeWidth="1.5"
                    />
                  )}
                </g>
              );
            })}

            {/* X-Axis Timeline Labels (spaced cleanly so labels never overlap) */}
            {trendSeries.map((pt, idx) => {
              const step = trendSeries.length > 14 ? Math.ceil(trendSeries.length / 8) : trendSeries.length > 10 ? 2 : 1;
              if (idx % step !== 0 && idx !== trendSeries.length - 1) return null;
              const xPos = trendPoints[idx]?.x ?? padL;
              return (
                <text
                  key={idx}
                  x={xPos}
                  y={svgHeight - 8}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="600"
                  fill={isDay ? '#64748b' : '#94a3b8'}
                >
                  {pt.label}
                </text>
              );
            })}
          </svg>
        </div>
      </div>

      {/* ==================== ROW 3: CREATIVE ANALYTICS (RADAR / DONUT + HEATMAP + WEEKLY RHYTHM) ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* CREATIVE CHART A: 5-AXIS SPIRITUAL BALANCE RADAR / MULTI-RING DONUT */}
        <div className={`rounded-2xl p-4 sm:p-5 ${cardCls}`}>
          <div className="flex items-start justify-between gap-2 mb-3 flex-wrap">
            <div className="flex items-center gap-3 min-w-0">
              <div className={iconBadgeCls}>
                {creativeMode === 'radar' ? <Compass className="w-5 h-5" /> : <PieChart className="w-5 h-5" />}
              </div>
              <div className="min-w-0">
                <h3 className="text-sm sm:text-base font-extrabold tracking-tight truncate">
                  {isBn ? 'ইবাদতের বহুমাত্রিক ভারসাম্য' : 'Spiritual Balance Overview'}
                </h3>
                <p className={`text-[11px] truncate ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                  {isBn ? '৫টি মূল আমল শাখার তুলনামূলক চিত্র' : '5-dimension balance across key daily worship'}
                </p>
              </div>
            </div>

            <div className={segWrapCls}>
              <button
                type="button"
                onClick={() => setCreativeMode('radar')}
                className={`px-2.5 py-1 rounded-lg text-[11px] whitespace-nowrap shrink-0 transition cursor-pointer ${
                  creativeMode === 'radar' ? segActiveCls : segIdleCls
                }`}
              >
                {isBn ? 'রাডার গ্রাফ' : 'Radar'}
              </button>
              <button
                type="button"
                onClick={() => setCreativeMode('donut')}
                className={`px-2.5 py-1 rounded-lg text-[11px] whitespace-nowrap shrink-0 transition cursor-pointer ${
                  creativeMode === 'donut' ? segActiveCls : segIdleCls
                }`}
              >
                {isBn ? 'রিং চার্ট' : 'Rings'}
              </button>
            </div>
          </div>

          {creativeMode === 'radar' ? (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-1">
              {/* 5-Axis Pentagon SVG Radar */}
              <svg viewBox="0 0 240 220" className="w-52 h-48 shrink-0 overflow-visible">
                {(() => {
                  const cx = 120;
                  const cy = 112;
                  const radius = 74;
                  const axes = radarMetrics;
                  const angleAt = (i: number) => -Math.PI / 2 + (i * 2 * Math.PI) / axes.length;

                  const ringPolys = [0.25, 0.5, 0.75, 1].map((scale) =>
                    axes
                      .map((_, i) => {
                        const a = angleAt(i);
                        return `${(cx + Math.cos(a) * radius * scale).toFixed(1)},${(cy + Math.sin(a) * radius * scale).toFixed(1)}`;
                      })
                      .join(' ')
                  );

                  const dataPoly = axes
                    .map((ax, i) => {
                      const a = angleAt(i);
                      const r = radius * Math.max(0.06, ax.value / 100);
                      return `${(cx + Math.cos(a) * r).toFixed(1)},${(cy + Math.sin(a) * r).toFixed(1)}`;
                    })
                    .join(' ');

                  return (
                    <>
                      {ringPolys.map((poly, rIdx) => (
                        <polygon
                          key={rIdx}
                          points={poly}
                          fill="none"
                          stroke={isDay ? '#e2e8f0' : '#184850'}
                          strokeWidth="1"
                        />
                      ))}

                      {axes.map((ax, i) => {
                        const a = angleAt(i);
                        const x2 = cx + Math.cos(a) * radius;
                        const y2 = cy + Math.sin(a) * radius;
                        const lx = cx + Math.cos(a) * (radius + 20);
                        const ly = cy + Math.sin(a) * (radius + 17);
                        return (
                          <g key={i}>
                            <line
                              x1={cx}
                              y1={cy}
                              x2={x2}
                              y2={y2}
                              stroke={isDay ? '#e2e8f0' : '#184850'}
                              strokeWidth="1"
                            />
                            <text
                              x={lx}
                              y={ly + 3}
                              textAnchor="middle"
                              fontSize="10.5"
                              fontWeight="700"
                              fill={isDay ? '#334155' : '#cbd5e1'}
                            >
                              {ax.label}
                            </text>
                          </g>
                        );
                      })}

                      <polygon
                        points={dataPoly}
                        fill="var(--app-primary-mid, #059669)"
                        fillOpacity="0.24"
                        stroke="var(--app-primary, #006A4E)"
                        strokeWidth="2.2"
                      />

                      {axes.map((ax, i) => {
                        const a = angleAt(i);
                        const r = radius * Math.max(0.06, ax.value / 100);
                        const px = cx + Math.cos(a) * r;
                        const py = cy + Math.sin(a) * r;
                        return (
                          <circle
                            key={i}
                            cx={px}
                            cy={py}
                            r="3.8"
                            fill="var(--app-primary, #006A4E)"
                            stroke="#ffffff"
                            strokeWidth="1.5"
                          />
                        );
                      })}
                    </>
                  );
                })()}
              </svg>

              {/* Axis Legend Table */}
              <div className="flex-1 w-full space-y-2">
                {radarMetrics.map((m) => (
                  <div
                    key={m.label}
                    className={`flex items-center justify-between px-3 py-1.5 rounded-xl border text-xs ${
                      isDay ? 'bg-slate-50/70 border-slate-200/80' : 'bg-[#041518] border-[#153e46]'
                    }`}
                  >
                    <span className="font-bold">{m.label}</span>
                    <span className="font-extrabold tabular-nums text-[var(--app-primary,#006A4E)] dark:text-[var(--app-primary-light,#6ee7b7)]">
                      {isBn ? `${toBn(m.value)}%` : `${m.value}%`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Concentric Multi-Ring Donut View */
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-2">
              <div className="relative w-44 h-44 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 180 180" className="w-full h-full -rotate-90">
                  {[
                    { r: 74, pct: radarMetrics[0].value, color: 'var(--app-primary, #006A4E)' },
                    { r: 58, pct: radarMetrics[1].value, color: 'var(--app-primary-mid, #059669)' },
                    { r: 42, pct: radarMetrics[2].value, color: '#0284c7' },
                  ].map((ring, idx) => {
                    const circ = 2 * Math.PI * ring.r;
                    const offset = circ * (1 - Math.min(100, Math.max(0, ring.pct)) / 100);
                    return (
                      <g key={idx}>
                        <circle
                          cx="90"
                          cy="90"
                          r={ring.r}
                          fill="none"
                          stroke={isDay ? '#e2e8f0' : '#143c44'}
                          strokeWidth="10"
                        />
                        <circle
                          cx="90"
                          cy="90"
                          r={ring.r}
                          fill="none"
                          stroke={ring.color}
                          strokeWidth="10"
                          strokeDasharray={circ}
                          strokeDashoffset={offset}
                          strokeLinecap="round"
                        />
                      </g>
                    );
                  })}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                  <span className="text-xl font-black tabular-nums">
                    {isBn ? `${toBn(reportData.avgCompletionRate)}%` : `${reportData.avgCompletionRate}%`}
                  </span>
                  <span className={`text-[10px] font-bold ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                    {isBn ? 'গড় আমল' : 'Avg Score'}
                  </span>
                </div>
              </div>

              <div className="flex-1 w-full space-y-2.5">
                {[
                  {
                    label: isBn ? 'ফরজ নামাজ (বাইরের রিং)' : 'Fardh Salah (Outer)',
                    val: radarMetrics[0].value,
                    dot: 'bg-[var(--app-primary,#006A4E)]',
                  },
                  {
                    label: isBn ? 'জিকির লক্ষ্য (মধ্যম রিং)' : 'Dhikr Goal (Middle)',
                    val: radarMetrics[1].value,
                    dot: 'bg-[var(--app-primary-mid,#059669)]',
                  },
                  {
                    label: isBn ? 'কুরআন তিলাওয়াত (ভিতরের রিং)' : 'Quran Reading (Inner)',
                    val: radarMetrics[2].value,
                    dot: 'bg-sky-600',
                  },
                ].map((r) => (
                  <div key={r.label} className="flex items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${r.dot}`} />
                      <span className="font-bold truncate">{r.label}</span>
                    </div>
                    <span className="font-extrabold tabular-nums shrink-0">
                      {isBn ? `${toBn(r.val)}%` : `${r.val}%`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CREATIVE CHART B: 12-WEEK (84-DAY) CONSISTENCY HEATMAP GRID */}
        <div className={`rounded-2xl p-4 sm:p-5 ${cardCls}`}>
          <div className="flex items-start justify-between gap-2 mb-3 flex-wrap">
            <div className="flex items-center gap-3 min-w-0">
              <div className={iconBadgeCls}>
                <Flame className="w-5 h-5 text-amber-500" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm sm:text-base font-extrabold tracking-tight truncate">
                  {isBn ? '৮৪ দিনের ইবাদত ধারাবাহিকতা হিটম্যাপ' : '84-Day Consistency Heatmap'}
                </h3>
                <p className={`text-[11px] truncate ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                  {isBn ? 'বিগত ১২ সপ্তাহের প্রতিদিনের আমল ও সক্রিয়তা' : 'Daily intensity over the past 12 weeks'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-right shrink-0">
              <div>
                <div className={`text-[10px] font-bold ${isDay ? 'text-slate-400' : 'text-slate-400'}`}>
                  {isBn ? 'চলমান স্ট্রিক' : 'Streak'}
                </div>
                <div className="text-sm font-black tabular-nums text-[var(--app-primary,#006A4E)] dark:text-amber-300">
                  {fmt(streakStats.current)} {isBn ? 'দিন' : 'd'}
                </div>
              </div>
              <div className={`w-px h-6 ${isDay ? 'bg-slate-200' : 'bg-[#184850]'}`} />
              <div>
                <div className={`text-[10px] font-bold ${isDay ? 'text-slate-400' : 'text-slate-400'}`}>
                  {isBn ? 'সর্বোচ্চ' : 'Best'}
                </div>
                <div className="text-sm font-black tabular-nums">
                  {fmt(streakStats.best)} {isBn ? 'দিন' : 'd'}
                </div>
              </div>
            </div>
          </div>

          {/* 12 columns x 7 rows Heatmap Matrix */}
          <div className="overflow-x-auto pb-1">
            <div className="grid grid-flow-col grid-rows-7 gap-1.5 min-w-[290px]">
              {heatmapGrid.map((cell) => {
                const isSel = selectedHeatmapCell?.dateKey === cell.dateKey;
                const levelCls =
                  cell.level === 0
                    ? isDay
                      ? 'bg-slate-100 hover:bg-slate-200'
                      : 'bg-[#041518] border border-[#12353c]'
                    : cell.level === 1
                    ? 'bg-[var(--app-primary-mid,#059669)]/25'
                    : cell.level === 2
                    ? 'bg-[var(--app-primary-mid,#059669)]/50'
                    : cell.level === 3
                    ? 'bg-[var(--app-primary-mid,#059669)]/75'
                    : 'bg-[var(--app-primary,#006A4E)]';

                return (
                  <button
                    key={cell.dateKey}
                    type="button"
                    onClick={() => setSelectedHeatmapKey(cell.dateKey)}
                    title={`${cell.dateKey} • ${cell.score}%`}
                    className={`w-full aspect-square min-w-[14px] max-w-[22px] rounded-[4px] transition cursor-pointer ${levelCls} ${
                      isSel ? 'ring-2 ring-amber-400 scale-110 z-10' : ''
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* Selected Day Readout + Intensity Legend */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-3 mt-2 border-t border-slate-100 dark:border-[#143a42] text-[11px]">
            {selectedHeatmapCell && (
              <div className={`font-semibold tabular-nums ${isDay ? 'text-slate-700' : 'text-slate-200'}`}>
                <span className="font-extrabold">{selectedHeatmapCell.dateKey}</span>
                {' · '}
                {isBn ? `নামাজ ${toBn(selectedHeatmapCell.salah)}/৫` : `Salah ${selectedHeatmapCell.salah}/5`}
                {' · '}
                {isBn ? `জিকির ${fmt(selectedHeatmapCell.dhikr)}` : `Dhikr ${fmt(selectedHeatmapCell.dhikr)}`}
                {' · '}
                <span className="font-bold text-[var(--app-primary,#006A4E)] dark:text-[var(--app-primary-light,#6ee7b7)]">
                  {isBn ? `${toBn(selectedHeatmapCell.score)}%` : `${selectedHeatmapCell.score}%`}
                </span>
              </div>
            )}

            <div className="flex items-center gap-1 text-[10px] text-slate-400">
              <span>{isBn ? 'কম' : 'Less'}</span>
              <span className={`w-2.5 h-2.5 rounded-[2px] ${isDay ? 'bg-slate-100' : 'bg-[#041518] border border-[#12353c]'}`} />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-[var(--app-primary-mid,#059669)]/25" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-[var(--app-primary-mid,#059669)]/50" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-[var(--app-primary-mid,#059669)]/75" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-[var(--app-primary,#006A4E)]" />
              <span>{isBn ? 'বেশি' : 'More'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== ROW 4: WEEKDAY SPIRITUAL RHYTHM ==================== */}
      <div className={`rounded-2xl p-4 sm:p-5 ${cardCls}`}>
        <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className={iconBadgeCls}>
              <CalendarDays className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold tracking-tight">
                {isBn ? 'সপ্তাহের বার-ভিত্তিক আমলের ছন্দ' : 'Day-of-Week Ibadah Rhythm'}
              </h3>
              <p className={`text-[11px] ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                {bestWeekday
                  ? isBn
                    ? `আপনার সবচেয়ে প্রাণবন্ত ইবাদতের দিন: ${bestWeekday}বার`
                    : `Your strongest day of the week: ${bestWeekday}`
                  : isBn
                  ? 'প্রতিদিন আমল চিহ্নিত করলে সাপ্তাহিক বার-ভিত্তিক গড় দেখা যাবে'
                  : 'Track daily deeds to reveal your weekly pattern'}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 items-end h-28 pt-2">
          {weekdayPattern.map((day) => {
            const isFriday = day.dayIndex === 5;
            const barH = Math.max(day.avgScore > 0 ? 12 : 4, day.avgScore);
            return (
              <div key={day.dayIndex} className="flex flex-col items-center justify-end h-full gap-1.5">
                <span className={`text-[10px] font-bold tabular-nums ${isDay ? 'text-slate-500' : 'text-slate-300'}`}>
                  {isBn ? `${toBn(day.avgScore)}%` : `${day.avgScore}%`}
                </span>
                <div className="w-full max-w-[34px] flex-1 flex items-end justify-center">
                  <div
                    style={{ height: `${barH}%` }}
                    className={`w-full rounded-t-md transition-all duration-500 ${
                      day.avgScore === 0
                        ? isDay
                          ? 'bg-slate-200/80'
                          : 'bg-[#133b42]'
                        : isFriday
                        ? 'bg-amber-500'
                        : 'bg-[var(--app-primary-mid,#059669)]'
                    }`}
                  />
                </div>
                <span
                  className={`text-[10px] sm:text-xs font-bold ${
                    isFriday
                      ? 'text-amber-600 dark:text-amber-400'
                      : isDay
                      ? 'text-slate-600'
                      : 'text-slate-300'
                  }`}
                >
                  {day.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

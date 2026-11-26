import React, { useState, useMemo, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import html2canvas from 'html2canvas';
import {
  HistoryPeriodRange,
  AggregatedReportData,
  compileAggregatedReport,
  generateComprehensiveHistoryPdfReport,
} from '../utils/exportPdf';
import { getAllAamalLogs, exportAamalHistoryToCsv } from '../utils/aamalTrackerData';
import { sanitizeClonedDocForHtml2Canvas } from '../utils/html2canvasSanitizer';
import { UserProfile, ThemeMode, ZikrLanguage, ZikrItem, HistorySession } from '../types';
import { HistoryChartsDashboard } from './HistoryChartsDashboard';
import {
  X,
  FileText,
  Download,
  Calendar,
  Sparkles,
  CheckCircle2,
  FileSpreadsheet,
  Calculator,
  BarChart3,
  Image as ImageIcon,
} from 'lucide-react';
import { soundHaptics } from '../utils/audioHaptics';

interface HistoryReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  soundEnabled: boolean;
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
  userProfile?: UserProfile;
  initialRange?: HistoryPeriodRange;
  selectedDayKey?: string;
  liveZikrs?: ZikrItem[];
  historySessions?: HistorySession[];
  masterTotal?: number;
}

export const HistoryReportModal: React.FC<HistoryReportModalProps> = ({
  isOpen,
  onClose,
  soundEnabled,
  themeMode = 'night',
  selectedLanguage = 'bn',
  userProfile,
  initialRange = '1month',
  selectedDayKey,
  liveZikrs,
  historySessions = [],
  masterTotal,
}) => {
  const isDay = themeMode === 'day';
  const [selectedRange, setSelectedRange] = useState<HistoryPeriodRange>(initialRange);
  const [viewMode, setViewMode] = useState<'all' | 'charts' | 'tables'>('all');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [isCapturingPng, setIsCapturingPng] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const chartsCaptureRef = useRef<HTMLDivElement>(null);

  // Lock body scroll and handle escape key when modal is open
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const allLogs = useMemo(() => getAllAamalLogs(), [isOpen]);

  const reportData: AggregatedReportData = useMemo(() => {
    return compileAggregatedReport(allLogs, selectedRange, selectedDayKey, liveZikrs);
  }, [allLogs, selectedRange, selectedDayKey, liveZikrs]);

  if (!isOpen) return null;

  const rangeButtons: Array<{ id: HistoryPeriodRange; labelBn: string; labelEn: string; icon: string }> = [
    { id: '1day', labelBn: '১ দিন (1 Day)', labelEn: '1 Day', icon: '📅' },
    { id: '1month', labelBn: '১ মাস (1 Month)', labelEn: '1 Month', icon: '🌙' },
    { id: '4months', labelBn: '৪ মাস (4 Months)', labelEn: '4 Months', icon: '📆' },
    { id: '1year', labelBn: '১ বছর (1 Year)', labelEn: '1 Year', icon: '⭐' },
    { id: '10years', labelBn: '১০ বছর / আজীবন (10 Years)', labelEn: '10 Years / All-time', icon: '🏆' },
  ];

  const handleDownloadPdf = async () => {
    try {
      setIsGeneratingPdf(true);
      if (soundEnabled) soundHaptics.playMilestone();
      await generateComprehensiveHistoryPdfReport(reportData, userProfile);
      setSuccessToast(
        selectedLanguage === 'bn'
          ? 'পিডিএফ রিপোর্ট সফলভাবে প্রস্তুত ও ডাউনলোড হয়েছে!'
          : 'PDF Report successfully generated & downloaded!'
      );
      setTimeout(() => setSuccessToast(null), 4000);
    } catch (e) {
      console.error('PDF generation error', e);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleDownloadChartsPng = async () => {
    if (!chartsCaptureRef.current) return;
    try {
      setIsCapturingPng(true);
      if (soundEnabled) soundHaptics.playMilestone();
      const canvas = await html2canvas(chartsCaptureRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: isDay ? '#f4f7f6' : '#051619',
        onclone: (doc) => sanitizeClonedDocForHtml2Canvas(doc),
      });
      const link = document.createElement('a');
      link.download = `ZikrPlus_History_Charts_${selectedRange}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      setSuccessToast(
        selectedLanguage === 'bn'
          ? 'হিস্ট্রি চার্ট ও গ্রাফ ইমেজ (.png) ডাউনলোড হয়েছে!'
          : 'History Charts Snapshot (.png) downloaded!'
      );
      setTimeout(() => setSuccessToast(null), 4000);
    } catch (e) {
      console.error('Chart PNG capture error', e);
    } finally {
      setIsCapturingPng(false);
    }
  };

  const handleDownloadCsv = () => {
    exportAamalHistoryToCsv(selectedRange === '1month' ? reportData.startDate.slice(0, 7) : undefined);
    if (soundEnabled) soundHaptics.playMilestone();
    setSuccessToast(
      selectedLanguage === 'bn'
        ? 'এক্সেল স্প্রেডশিট (.csv) ডাউনলোড হয়েছে!'
        : 'Excel Spreadsheet (.csv) downloaded!'
    );
    setTimeout(() => setSuccessToast(null), 4000);
  };

  const zikrBreakdownList = Object.values(reportData.zikrBreakdownMap).filter(
    (z) => z.totalCount > 0 || reportData.totalDays <= 1
  );

  const modalNode = (
    <div
      className={`fixed inset-0 z-[9999] w-full h-[100dvh] flex flex-col overflow-hidden animate-in fade-in duration-200 ${
        isDay ? 'bg-[#f4f7f6] text-slate-800' : 'bg-[#051619] text-white'
      }`}
    >
      <div className="w-full h-full flex flex-col overflow-hidden">
        {/* Modal Top Header */}
        <div
          className={`px-4 py-3.5 sm:px-6 border-b flex items-center justify-between gap-3 shrink-0 ${
            isDay
              ? 'bg-white border-slate-200'
              : 'bg-[#082024] border-[#153e46]'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="p-2.5 rounded-2xl bg-[var(--app-surface-soft,#e9f6ef)] dark:bg-[#0d343c] text-[var(--app-primary,#006A4E)] dark:text-[var(--app-primary-light,#6ee7b7)] shrink-0">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-black leading-tight truncate">
                {selectedLanguage === 'bn'
                  ? 'হিস্ট্রি, আমল চার্ট ও পূর্ণাঙ্গ রিপোর্ট'
                  : 'History Analytics, Charts & Report'}
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-emerald-300/80 truncate">
                {selectedLanguage === 'bn'
                  ? 'দৈনিক আমল, নামাজ ও জিকিরের ভিজ্যুয়াল গ্রাফ এবং ১ দিন থেকে ১০ বছরের হিসাব'
                  : 'Interactive graphs and comprehensive period reports'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-teal-900/40 transition cursor-pointer shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 max-w-[1280px] w-full mx-auto">
          {/* Success Banner */}
          {successToast && (
            <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successToast}</span>
            </div>
          )}

          {/* Time Range Selector + View Filter Row */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label className="text-[11px] font-bold text-slate-500 dark:text-emerald-300/80 uppercase tracking-wider">
                {selectedLanguage === 'bn' ? '১. সময়কাল নির্বাচন করুন (Select Period):' : '1. Select Time Range:'}
              </label>

              {/* View Switcher Segmented Control */}
              <div
                className={`p-1 rounded-xl border flex items-center gap-1 ${
                  isDay ? 'bg-white border-slate-200' : 'bg-[#082024] border-[#153e46]'
                }`}
              >
                {(
                  [
                    { id: 'all', bn: 'চার্ট ও টেবিল', en: 'All Views' },
                    { id: 'charts', bn: 'শুধু চার্ট ও গ্রাফ', en: 'Charts Only' },
                    { id: 'tables', bn: 'হিসাব টেবিল', en: 'Tables' },
                  ] as const
                ).map((vm) => (
                  <button
                    key={vm.id}
                    type="button"
                    onClick={() => {
                      setViewMode(vm.id);
                      if (soundEnabled) soundHaptics.playTap();
                    }}
                    className={`px-3 py-1.5 rounded-lg text-[11px] whitespace-nowrap shrink-0 transition cursor-pointer ${
                      viewMode === vm.id
                        ? 'bg-[var(--app-primary,#006A4E)] text-white font-extrabold shadow-xs'
                        : isDay
                        ? 'text-slate-600 hover:text-slate-900 font-semibold'
                        : 'text-slate-300 hover:text-white font-semibold'
                    }`}
                  >
                    {selectedLanguage === 'bn' ? vm.bn : vm.en}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {rangeButtons.map((btn) => {
                const isSelected = selectedRange === btn.id;
                return (
                  <button
                    key={btn.id}
                    onClick={() => {
                      setSelectedRange(btn.id);
                      if (soundEnabled) soundHaptics.playTap();
                    }}
                    className={`py-2.5 px-3 rounded-2xl border text-xs font-bold transition flex flex-col items-center justify-center gap-1 cursor-pointer active:scale-95 ${
                      isSelected
                        ? 'bg-[var(--app-primary,#006A4E)] text-white border-[var(--app-primary,#006A4E)] shadow-md'
                        : isDay
                        ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                        : 'bg-[#082024] hover:bg-[#0e3036] border-[#153e46] text-emerald-300'
                    }`}
                  >
                    <span className="text-base">{btn.icon}</span>
                    <span className="truncate">{selectedLanguage === 'bn' ? btn.labelBn : btn.labelEn}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* New Account / 0 Counts Notice Banner */}
          {reportData.totalDhikrSum === 0 && (masterTotal || 0) === 0 && (
            <div
              className={`p-3.5 rounded-2xl border text-xs flex items-start gap-2.5 ${
                isDay
                  ? 'bg-amber-50/90 border-amber-200 text-amber-900'
                  : 'bg-amber-950/20 border-amber-500/30 text-amber-200'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">
                  {selectedLanguage === 'bn'
                    ? 'নতুন সূচনা: আপনার বর্তমান জিকির ও আমল গণনা ০ রয়েছে'
                    : 'Fresh Account: Your current count is 0'}
                </p>
                <p className="text-[11px] opacity-90 mt-0.5 leading-relaxed">
                  {selectedLanguage === 'bn'
                    ? 'হোমস্ক্রিনের তাসবীহ ও দৈনিক আমল ট্র্যাকারে টিক দিলেই স্বয়ংক্রিয়ভাবে নিচের সকল বার চার্ট, লাইন গ্রাফ ও হিটম্যাপ জীবন্ত হয়ে উঠবে।'
                    : 'Recite dhikr or check off daily deeds to populate all charts and curves dynamically.'}
                </p>
              </div>
            </div>
          )}

          {/* Aggregated Sum Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Grand Total Dhikr */}
            <div
              className={`p-3.5 rounded-2xl border text-center ${
                isDay
                  ? 'bg-white border-slate-200 shadow-xs'
                  : 'bg-[#082024] border-[#153e46]'
              }`}
            >
              <span className="text-[10px] uppercase font-bold text-[var(--app-primary,#006A4E)] dark:text-emerald-300 tracking-wider">
                {selectedLanguage === 'bn' ? 'সর্বমোট জিকির (Sum)' : 'Total Dhikr Sum'}
              </span>
              <div className="text-2xl sm:text-3xl font-black tabular-nums text-[var(--app-primary,#006A4E)] dark:text-amber-300 mt-1">
                {(masterTotal !== undefined ? masterTotal : reportData.totalDhikrSum).toLocaleString()}
              </div>
              <span className="text-[10px] text-slate-500 dark:text-emerald-400/80 font-semibold">
                {reportData.activeDaysCount} {selectedLanguage === 'bn' ? 'দিন সক্রিয়' : 'Days Active'}
              </span>
            </div>

            {/* Total Fardh Salah */}
            <div
              className={`p-3.5 rounded-2xl border text-center ${
                isDay
                  ? 'bg-white border-slate-200 shadow-xs'
                  : 'bg-[#082024] border-[#153e46]'
              }`}
            >
              <span className="text-[10px] uppercase font-bold text-teal-700 dark:text-emerald-300 tracking-wider">
                {selectedLanguage === 'bn' ? 'ফরজ নামাজ (Salah)' : 'Fardh Prayers'}
              </span>
              <div className="text-2xl sm:text-3xl font-black tabular-nums text-teal-700 dark:text-emerald-300 mt-1">
                {reportData.prayerStats.fardhTotal}
              </div>
              <span className="text-[10px] text-slate-500 dark:text-teal-400/80 font-semibold">
                {selectedLanguage === 'bn'
                  ? `ফজর ${reportData.prayerStats.fajr} • ইশা ${reportData.prayerStats.isha}`
                  : `Fajr ${reportData.prayerStats.fajr} • Isha ${reportData.prayerStats.isha}`}
              </span>
            </div>

            {/* Total Quran Pages */}
            <div
              className={`p-3.5 rounded-2xl border text-center ${
                isDay
                  ? 'bg-white border-slate-200 shadow-xs'
                  : 'bg-[#082024] border-[#153e46]'
              }`}
            >
              <span className="text-[10px] uppercase font-bold text-sky-700 dark:text-sky-300 tracking-wider">
                {selectedLanguage === 'bn' ? 'কুরআন তিলাওয়াত' : 'Quran Pages Read'}
              </span>
              <div className="text-2xl sm:text-3xl font-black tabular-nums text-sky-700 dark:text-sky-200 mt-1">
                {reportData.totalQuranPagesSum}
              </div>
              <span className="text-[10px] text-slate-500 dark:text-sky-400/80 font-semibold">
                {selectedLanguage === 'bn' ? 'মোট পৃষ্ঠা' : 'Total Pages'}
              </span>
            </div>

            {/* Average Completion */}
            <div
              className={`p-3.5 rounded-2xl border text-center ${
                isDay
                  ? 'bg-white border-slate-200 shadow-xs'
                  : 'bg-[#082024] border-[#153e46]'
              }`}
            >
              <span className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-300 tracking-wider">
                {selectedLanguage === 'bn' ? 'গড় আমল স্কোর' : 'Avg Completion'}
              </span>
              <div className="text-2xl sm:text-3xl font-black tabular-nums text-amber-700 dark:text-amber-300 mt-1">
                {reportData.avgCompletionRate}%
              </div>
              <span className="text-[10px] text-slate-500 dark:text-amber-400/80 font-semibold">
                {selectedLanguage === 'bn' ? `মোট ${reportData.totalDays} দিন` : `Across ${reportData.totalDays} Days`}
              </span>
            </div>
          </div>

          {/* ================= VISUAL CHARTS & CREATIVE GRAPHS DASHBOARD ================= */}
          {viewMode !== 'tables' && (
            <div ref={chartsCaptureRef} className="space-y-4">
              <HistoryChartsDashboard
                reportData={reportData}
                allLogs={allLogs}
                selectedRange={selectedRange}
                themeMode={themeMode}
                selectedLanguage={selectedLanguage}
                liveZikrs={liveZikrs}
                historySessions={historySessions}
                masterTotal={masterTotal}
              />
            </div>
          )}

          {/* ================= TABLES & LEDGER SECTION ================= */}
          {viewMode !== 'charts' && (
            <>
              {/* Section: Specific Zikr Breakdown Sum Table */}
              <div
                className={`p-4 sm:p-5 rounded-2xl border space-y-3 ${
                  isDay ? 'bg-white border-slate-200 shadow-xs' : 'bg-[#082024] border-[#153e46]'
                }`}
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-teal-900/40">
                  <div className="flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-[var(--app-primary,#006A4E)] dark:text-emerald-400" />
                    <h3 className="font-bold text-xs sm:text-sm">
                      {selectedLanguage === 'bn'
                        ? 'জিকিরভিত্তিক মোট যোগফল ও শতকরা হার (Zikr Sum Table)'
                        : 'Zikr Breakdown & Grand Sum'}
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono tabular-nums font-bold text-[var(--app-primary,#006A4E)] dark:text-emerald-400">
                    {selectedLanguage === 'bn'
                      ? `মোট: ${reportData.totalDhikrSum.toLocaleString()} বার`
                      : `Sum: ${reportData.totalDhikrSum.toLocaleString()} times`}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {zikrBreakdownList.map((z, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 ${
                        isDay ? 'bg-slate-50/70 border-slate-200/80' : 'bg-[#0b272d] border-[#184850]'
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-xs truncate">{z.name}</div>
                        {z.arabic && (
                          <div className="text-[11px] font-arabic text-amber-600 dark:text-amber-400 truncate">
                            {z.arabic}
                          </div>
                        )}
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-sm font-black tabular-nums text-[var(--app-primary,#006A4E)] dark:text-emerald-300">
                          {z.totalCount.toLocaleString()} {selectedLanguage === 'bn' ? 'বার' : 'times'}
                        </div>
                        <span className="text-[10px] text-slate-400 font-semibold tabular-nums">
                          {z.percentageOfTotal}% {selectedLanguage === 'bn' ? 'অংশ' : 'share'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Daily Table Preview */}
              <div
                className={`p-4 sm:p-5 rounded-2xl border space-y-3 ${
                  isDay ? 'bg-white border-slate-200 shadow-xs' : 'bg-[#082024] border-[#153e46]'
                }`}
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-teal-900/40">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[var(--app-primary,#006A4E)] dark:text-emerald-400" />
                    <h3 className="font-bold text-xs sm:text-sm">
                      {selectedLanguage === 'bn' ? 'দৈনিক হিস্ট্রি শিট প্রিভিউ' : 'Daily History Ledger Preview'}
                    </h3>
                  </div>
                  <span className="text-[11px] text-slate-400 tabular-nums">
                    {reportData.dailyLogs.length} {selectedLanguage === 'bn' ? 'দিনের হিসাব' : 'Days in range'}
                  </span>
                </div>

                <div className="overflow-x-auto max-h-56 overflow-y-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr
                        className={`border-b text-[10px] font-bold uppercase ${
                          isDay ? 'bg-slate-100 text-slate-600' : 'bg-[#0d343c] text-emerald-300'
                        }`}
                      >
                        <th className="p-2">Date</th>
                        <th className="p-2 text-center">Fajr</th>
                        <th className="p-2 text-center">Dhuhr</th>
                        <th className="p-2 text-center">Asr</th>
                        <th className="p-2 text-center">Maghrib</th>
                        <th className="p-2 text-center">Isha</th>
                        <th className="p-2 text-center">Quran</th>
                        <th className="p-2 text-right">Zikr</th>
                        <th className="p-2 text-right">Score</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-teal-900/40 text-[11px] tabular-nums">
                      {reportData.dailyLogs.slice(0, 15).map((d) => (
                        <tr key={d.dateKey} className="hover:bg-emerald-500/5">
                          <td className="p-2 font-mono font-semibold">{d.dateKey}</td>
                          <td className="p-2 text-center">{d.fajr ? '✓' : '—'}</td>
                          <td className="p-2 text-center">{d.dhuhr ? '✓' : '—'}</td>
                          <td className="p-2 text-center">{d.asr ? '✓' : '—'}</td>
                          <td className="p-2 text-center">{d.maghrib ? '✓' : '—'}</td>
                          <td className="p-2 text-center">{d.isha ? '✓' : '—'}</td>
                          <td className="p-2 text-center text-sky-600 dark:text-sky-400 font-bold">{d.quranPagesRead}</td>
                          <td className="p-2 text-right font-mono font-bold text-[var(--app-primary,#006A4E)] dark:text-emerald-400">
                            {d.dhikrCount.toLocaleString()}
                          </td>
                          <td className="p-2 text-right font-bold text-teal-600 dark:text-emerald-300">
                            {Math.round(d.completedRatio * 100)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal Bottom Action Footer */}
        <div
          className={`p-3.5 sm:px-6 border-t flex flex-col sm:flex-row items-center justify-between gap-2.5 shrink-0 ${
            isDay ? 'bg-white border-slate-200' : 'bg-[#071a1d] border-[#153e46]'
          }`}
        >
          <div className="text-[11px] text-slate-500 dark:text-emerald-300/70 text-center sm:text-left">
            {selectedLanguage === 'bn'
              ? 'চার্ট PNG ইমেজ, এক্সেল (.csv) এবং পূর্ণাঙ্গ পিডিএফ ডকুমেন্ট ডাউনলোড করুন।'
              : 'Export charts snapshot PNG, Excel CSV, or full PDF report.'}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
            {/* Save Charts PNG */}
            {viewMode !== 'tables' && (
              <button
                onClick={handleDownloadChartsPng}
                disabled={isCapturingPng}
                className={`flex-1 sm:flex-initial py-2.5 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 active:scale-95 disabled:opacity-50 cursor-pointer ${
                  isDay
                    ? 'bg-slate-50 hover:bg-slate-100 border-slate-300 text-slate-800'
                    : 'bg-[#0a2328] hover:bg-[#133c44] border-[#184850] text-white'
                }`}
              >
                <ImageIcon className="w-4 h-4 text-[var(--app-primary,#006A4E)] dark:text-emerald-400" />
                <span>{isCapturingPng ? '...' : selectedLanguage === 'bn' ? 'চার্ট PNG' : 'Charts PNG'}</span>
              </button>
            )}

            {/* Download CSV */}
            <button
              onClick={handleDownloadCsv}
              className={`flex-1 sm:flex-initial py-2.5 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer ${
                isDay
                  ? 'bg-slate-50 hover:bg-slate-100 border-slate-300 text-slate-800'
                  : 'bg-[#0a2328] hover:bg-[#133c44] border-[#184850] text-white'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4 text-[var(--app-primary,#006A4E)] dark:text-emerald-400" />
              <span>CSV</span>
            </button>

            {/* Download PDF */}
            <button
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="flex-1 sm:flex-initial py-2.5 px-4 rounded-xl bg-[var(--app-primary,#006A4E)] hover:bg-[var(--app-primary-dark,#00523c)] text-white text-xs font-bold shadow-md transition flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>
                {isGeneratingPdf
                  ? selectedLanguage === 'bn'
                    ? 'পিডিএফ তৈরি হচ্ছে...'
                    : 'Generating PDF...'
                  : selectedLanguage === 'bn'
                  ? 'পূর্ণাঙ্গ পিডিএফ'
                  : 'Download PDF'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (typeof document === 'undefined') return null;
  return createPortal(modalNode, document.body);
};

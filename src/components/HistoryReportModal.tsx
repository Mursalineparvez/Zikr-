import React, { useState, useMemo } from 'react';
import {
  HistoryPeriodRange,
  AggregatedReportData,
  compileAggregatedReport,
  generateComprehensiveHistoryPdfReport,
} from '../utils/exportPdf';
import { getAllAamalLogs, exportAamalHistoryToCsv } from '../utils/aamalTrackerData';
import { UserProfile, ThemeMode, ZikrLanguage, ZikrItem } from '../types';
import {
  X,
  FileText,
  Download,
  Calendar,
  Sparkles,
  CheckCircle2,
  Printer,
  FileSpreadsheet,
  Award,
  BookOpen,
  Clock,
  Layers,
  ChevronRight,
  Calculator,
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
  masterTotal,
}) => {
  const isDay = themeMode === 'day';
  const [selectedRange, setSelectedRange] = useState<HistoryPeriodRange>(initialRange);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`w-full max-w-3xl rounded-3xl border shadow-2xl flex flex-col max-h-[92vh] overflow-hidden ${
          isDay ? 'bg-white text-slate-800 border-slate-200' : 'bg-[#0a2328] text-white border-[#194c56]'
        }`}
      >
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-teal-900/40 flex items-center justify-between gap-3 bg-gradient-to-r from-emerald-600/10 via-teal-600/5 to-transparent">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black leading-tight">
                {selectedLanguage === 'bn'
                  ? 'হিস্ট্রি রিপোর্ট ও পূর্ণাঙ্গ পিডিএফ এক্সপোর্ট'
                  : 'History Report & Full PDF Export'}
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-teal-300/80">
                {selectedLanguage === 'bn'
                  ? '১ দিন, ১ মাস, ৪ মাস, ১ বছর বা ১০ বছরের সুবিন্যস্ত হিসাব ও যোগফল'
                  : 'Custom periods with aggregated sums, prayers, and dhikr counts'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-teal-900/40 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {/* Success Banner */}
          {successToast && (
            <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successToast}</span>
            </div>
          )}

          {/* Time Range Selector Tabs */}
          <div>
            <label className="text-[11px] font-bold text-slate-400 dark:text-teal-300/80 uppercase tracking-wider block mb-2">
              {selectedLanguage === 'bn' ? '১. সময়কাল নির্বাচন করুন (Select Period):' : '1. Select Time Range:'}
            </label>
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
                        ? isDay
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-500/30'
                          : 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md ring-2 ring-emerald-400/40'
                        : isDay
                        ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                        : 'bg-[#081b1f] hover:bg-[#113138] border-[#153e46] text-teal-200'
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
          {reportData.totalDhikrSum === 0 && (
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
                    ? 'নতুন সূচনা: আপনার বর্তমান জিকির গণনা ০ রয়েছে'
                    : 'Fresh Account: Your current Dhikr count is 0'}
                </p>
                <p className="text-[11px] opacity-90 mt-0.5 leading-relaxed">
                  {selectedLanguage === 'bn'
                    ? 'হোমস্ক্রিনের তাসবীহ ও জিকির বোতামে ট্যাপ করে পাঠ শুরু করলেই স্বয়ংক্রিয়ভাবে এখানে নির্ভুল হিস্ট্রি ও রিপোর্ট তৈরি হতে থাকবে।'
                    : 'As soon as you begin reciting dhikr on the home screen, your personal history report will be compiled here.'}
                </p>
              </div>
            </div>
          )}

          {/* Aggregated Sum Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {/* Grand Total Dhikr */}
            <div
              className={`p-3.5 rounded-2xl border text-center relative overflow-hidden ${
                isDay
                  ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200'
                  : 'bg-gradient-to-br from-[#063b2f] to-[#042820] border-emerald-500/40'
              }`}
            >
              <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-300 tracking-wider">
                {selectedLanguage === 'bn' ? 'সর্বমোট জিকির (Sum)' : 'Total Dhikr Sum'}
              </span>
              <div className="text-2xl sm:text-3xl font-black text-emerald-700 dark:text-amber-300 font-mono mt-1">
                {(masterTotal !== undefined ? masterTotal : reportData.totalDhikrSum).toLocaleString()}
              </div>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400/80 font-semibold">
                {reportData.activeDaysCount} Days Active
              </span>
            </div>

            {/* Total Fardh Salah */}
            <div
              className={`p-3.5 rounded-2xl border text-center ${
                isDay
                  ? 'bg-teal-50/70 border-teal-200'
                  : 'bg-[#082025] border-teal-500/30'
              }`}
            >
              <span className="text-[10px] uppercase font-bold text-teal-700 dark:text-teal-300 tracking-wider">
                {selectedLanguage === 'bn' ? 'ফরজ নামাজ (Salah)' : 'Fardh Prayers'}
              </span>
              <div className="text-2xl sm:text-3xl font-black text-teal-700 dark:text-teal-200 font-mono mt-1">
                {reportData.prayerStats.fardhTotal}
              </div>
              <span className="text-[10px] text-teal-600 dark:text-teal-400/80 font-semibold">
                Fajr {reportData.prayerStats.fajr} • Isha {reportData.prayerStats.isha}
              </span>
            </div>

            {/* Total Quran Pages */}
            <div
              className={`p-3.5 rounded-2xl border text-center ${
                isDay
                  ? 'bg-blue-50/70 border-blue-200'
                  : 'bg-[#09222e] border-blue-500/30'
              }`}
            >
              <span className="text-[10px] uppercase font-bold text-blue-700 dark:text-blue-300 tracking-wider">
                {selectedLanguage === 'bn' ? 'কুরআন তিলাওয়াত' : 'Quran Pages Read'}
              </span>
              <div className="text-2xl sm:text-3xl font-black text-blue-700 dark:text-blue-200 font-mono mt-1">
                {reportData.totalQuranPagesSum}
              </div>
              <span className="text-[10px] text-blue-600 dark:text-blue-400/80 font-semibold">
                {selectedLanguage === 'bn' ? 'মোট পৃষ্ঠা' : 'Total Pages'}
              </span>
            </div>

            {/* Average Completion */}
            <div
              className={`p-3.5 rounded-2xl border text-center ${
                isDay
                  ? 'bg-amber-50/70 border-amber-200'
                  : 'bg-[#292209] border-amber-500/30'
              }`}
            >
              <span className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-300 tracking-wider">
                {selectedLanguage === 'bn' ? 'গড় আমল স্কোর' : 'Avg Completion'}
              </span>
              <div className="text-2xl sm:text-3xl font-black text-amber-700 dark:text-amber-300 font-mono mt-1">
                {reportData.avgCompletionRate}%
              </div>
              <span className="text-[10px] text-amber-600 dark:text-amber-400/80 font-semibold">
                Across {reportData.totalDays} Days
              </span>
            </div>
          </div>

          {/* Section: Specific Zikr Breakdown Sum Table */}
          <div
            className={`p-4 sm:p-5 rounded-3xl border space-y-3 ${
              isDay ? 'bg-slate-50 border-slate-200' : 'bg-[#081e22] border-[#133c44]'
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-teal-900/40">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-emerald-500" />
                <h3 className="font-bold text-xs sm:text-sm">
                  {selectedLanguage === 'bn'
                    ? 'জিকিরভিত্তিক মোট যোগফল ও শতকরা হার (Zikr Sum Table)'
                    : 'Zikr Breakdown & Grand Sum'}
                </h3>
              </div>
              <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                Sum: {reportData.totalDhikrSum.toLocaleString()} বার
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {zikrBreakdownList.map((z, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-2xl border flex items-center justify-between gap-2 ${
                    isDay ? 'bg-white border-slate-200' : 'bg-[#0b272d] border-[#184850]'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-xs truncate">{z.name}</div>
                    {z.arabic && (
                      <div className="text-[11px] font-arabic text-emerald-600 dark:text-emerald-400 truncate">
                        {z.arabic}
                      </div>
                    )}
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-sm font-black font-mono text-emerald-600 dark:text-emerald-300">
                      {z.totalCount.toLocaleString()} বার
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold">{z.percentageOfTotal}% share</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Table Preview */}
          <div
            className={`p-4 sm:p-5 rounded-3xl border space-y-3 ${
              isDay ? 'bg-slate-50 border-slate-200' : 'bg-[#081e22] border-[#133c44]'
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-teal-900/40">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-500" />
                <h3 className="font-bold text-xs sm:text-sm">
                  {selectedLanguage === 'bn' ? 'দৈনিক হিস্ট্রি শিট প্রিভিউ' : 'Daily History Ledger Preview'}
                </h3>
              </div>
              <span className="text-[11px] text-slate-400">
                {reportData.dailyLogs.length} Days in range
              </span>
            </div>

            <div className="overflow-x-auto max-h-56 overflow-y-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr
                    className={`border-b text-[10px] font-bold uppercase ${
                      isDay ? 'bg-slate-200/70 text-slate-600' : 'bg-[#0d343c] text-teal-300'
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
                <tbody className="divide-y divide-slate-100 dark:divide-teal-900/40 text-[11px]">
                  {reportData.dailyLogs.slice(0, 15).map((d) => (
                    <tr key={d.dateKey} className="hover:bg-emerald-500/5">
                      <td className="p-2 font-mono font-semibold">{d.dateKey}</td>
                      <td className="p-2 text-center">{d.fajr ? '✓' : '—'}</td>
                      <td className="p-2 text-center">{d.dhuhr ? '✓' : '—'}</td>
                      <td className="p-2 text-center">{d.asr ? '✓' : '—'}</td>
                      <td className="p-2 text-center">{d.maghrib ? '✓' : '—'}</td>
                      <td className="p-2 text-center">{d.isha ? '✓' : '—'}</td>
                      <td className="p-2 text-center text-blue-500 font-bold">{d.quranPagesRead}</td>
                      <td className="p-2 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        {d.dhikrCount.toLocaleString()}
                      </td>
                      <td className="p-2 text-right font-bold text-teal-600 dark:text-teal-300">
                        {Math.round(d.completedRatio * 100)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal Bottom Action Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-teal-900/40 bg-slate-50 dark:bg-[#071a1d] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] text-slate-500 dark:text-teal-300/70 text-center sm:text-left">
            {selectedLanguage === 'bn'
              ? 'নির্বাচিত সময়কালের সকল যোগফল ও চার্টসহ সাজানো ডকুমেন্ট ডাউনলোড হবে।'
              : 'All sums, tables, and statistics will be compiled into the export.'}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Download CSV */}
            <button
              onClick={handleDownloadCsv}
              className={`flex-1 sm:flex-initial py-2.5 px-3 rounded-2xl border text-xs font-bold transition flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer ${
                isDay
                  ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800'
                  : 'bg-[#0a2328] hover:bg-[#133c44] border-[#184850] text-white'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
              <span>Excel / CSV</span>
            </button>

            {/* Download PDF */}
            <button
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="flex-1 sm:flex-initial py-2.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg transition flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{isGeneratingPdf ? 'Generating PDF...' : 'Download Full PDF (পিডিএফ ডাউনলোড)'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

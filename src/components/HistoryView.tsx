import React from 'react';
import { HistorySession, ThemeMode, ZikrLanguage, ZikrItem } from '../types';
import { Clock, Trash2, Calendar, FileText, BookmarkCheck, CheckCircle2, Sparkles } from 'lucide-react';

interface HistoryViewProps {
  sessions: HistorySession[];
  zikrs?: ZikrItem[];
  lifetimeTotalCount?: number;
  onClearHistory: () => void;
  onExportPdf: () => void;
  isExportingPdf: boolean;
  onClose?: () => void;
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  sessions,
  zikrs = [],
  lifetimeTotalCount = 0,
  onClearHistory,
  onExportPdf,
  isExportingPdf,
  themeMode = 'night',
  selectedLanguage = 'bn',
}) => {
  const isDay = themeMode === 'day';
  const dailyTotal = zikrs.reduce((acc, curr) => acc + (curr.count || 0), 0);
  const activeZikrs = zikrs.filter((z) => (z.count || 0) > 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Active Live Counter Summary Banner */}
      <div
        className={`p-5 rounded-3xl border shadow-xl relative overflow-hidden ${
          isDay
            ? 'bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-800 text-white border-emerald-500'
            : 'bg-gradient-to-br from-[#06282d] via-[#0b3840] to-[#041d21] text-white border-teal-800/80'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>{selectedLanguage === 'bn' ? 'আজকের লাইভ রানিং কাউন্টার' : 'Today\'s Active Live Counter'}</span>
            </div>
            <div className="text-3xl font-black text-white tracking-tight flex items-baseline gap-2">
              <span>{dailyTotal.toLocaleString()}</span>
              <span className="text-xs font-normal text-emerald-200">
                {selectedLanguage === 'bn' ? 'বার আজকের জিকির সম্পন্ন' : 'times today'}
              </span>
            </div>
          </div>

          <div className="sm:text-right border-t sm:border-t-0 sm:border-l border-emerald-500/30 pt-3 sm:pt-0 sm:pl-4">
            <div className="text-xs text-emerald-300 font-medium">
              {selectedLanguage === 'bn' ? 'সর্বমোট গ্র্যান্ড টোটাল (লাইফটাইম)' : 'Lifetime Grand Total'}
            </div>
            <div className="text-xl font-extrabold text-amber-300 mt-0.5">
              {lifetimeTotalCount.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Breakdown preview of today's live zikrs if any */}
        {activeZikrs.length > 0 && (
          <div className="mt-4 pt-3 border-t border-emerald-500/30 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            {activeZikrs.map((z) => (
              <div
                key={z.id}
                className="bg-black/20 backdrop-blur-sm px-2.5 py-1.5 rounded-xl border border-white/10 flex items-center justify-between"
              >
                <span className="truncate text-emerald-100 font-medium">{z.name}</span>
                <span className="font-bold text-amber-300 ml-1">{z.count}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Header Bar */}
      <div
        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl border shadow-xl ${
          isDay
            ? 'bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100/60 border-emerald-200 text-slate-800'
            : 'bg-slate-900/80 border-emerald-900/40 text-white'
        }`}
      >
        <div>
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-1.5 ${
              isDay
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300/60'
                : 'bg-emerald-950 text-emerald-300 border border-emerald-700/40'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>
              {selectedLanguage === 'bn'
                ? 'তাসবীহ ও জিকির সেশন হিস্ট্রি'
                : 'Session Logs & Records'}
            </span>
          </div>
          <h2 className={`text-xl font-bold ${isDay ? 'text-slate-900' : 'text-white'}`}>
            {selectedLanguage === 'bn'
              ? 'দৈনিক জিকির হিস্ট্রি ও বিস্তারিত সংখ্যা'
              : 'Tasbeeh History Summary'}
          </h2>
          <p className={`text-xs mt-0.5 ${isDay ? 'text-slate-600' : 'text-slate-300'}`}>
            {selectedLanguage === 'bn'
              ? 'প্রতিটি সেশনে কোন জিকির কতবার পাঠ করা হয়েছে তা সংরক্ষিত থাকে।'
              : 'Past saved sessions showing individual zikr breakdown and total count.'}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          <button
            onClick={onExportPdf}
            disabled={isExportingPdf}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border text-xs font-semibold shadow-md transition active:scale-95 disabled:opacity-50 cursor-pointer ${
              isDay
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500'
                : 'bg-emerald-900/70 hover:bg-emerald-800 border-emerald-600/50 text-emerald-200'
            }`}
          >
            <FileText className="w-4 h-4 text-amber-300" />
            <span>{isExportingPdf ? 'Exporting...' : 'Export PDF'}</span>
          </button>

          {sessions.length > 0 && (
            <button
              onClick={onClearHistory}
              title="Clear all archived sessions"
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-800/40 text-red-300 text-xs font-semibold transition active:scale-95 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{selectedLanguage === 'bn' ? 'হিস্ট্রি মুছুন' : 'Clear History'}</span>
            </button>
          )}
        </div>
      </div>

      {/* History Log List */}
      {sessions.length > 0 ? (
        <div className="space-y-4">
          {sessions.map((session, idx) => (
            <div
              key={session.id}
              className={`rounded-3xl border p-5 shadow-lg transition ${
                isDay
                  ? 'bg-white border-slate-200/90 hover:border-emerald-500/50 text-slate-800'
                  : 'bg-slate-900/80 border-slate-800 hover:border-emerald-700/40 text-white'
              }`}
            >
              {/* Session Header */}
              <div
                className={`flex items-center justify-between gap-3 border-b pb-3 mb-3 ${
                  isDay ? 'border-slate-100' : 'border-slate-800/80'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      isDay
                        ? 'bg-emerald-100 border border-emerald-300 text-emerald-700'
                        : 'bg-emerald-950 border border-emerald-700/40 text-emerald-300'
                    }`}
                  >
                    <BookmarkCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className={`text-xs font-bold ${isDay ? 'text-slate-900' : 'text-white'}`}>
                      {selectedLanguage === 'bn' ? `সেশন রেকর্ড #${sessions.length - idx}` : `Session #${sessions.length - idx}`}
                    </span>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{session.dateStr}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {selectedLanguage === 'bn' ? 'সর্বমোট জিকির' : 'Total Count'}
                  </span>
                  <div className="text-xl sm:text-2xl font-black text-amber-500 dark:text-amber-300 font-mono">
                    {session.totalCount.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Breakdown List: Showing which zikr was recited how many times */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-bold text-slate-400 dark:text-emerald-300/70 uppercase tracking-wider mb-2">
                  {selectedLanguage === 'bn'
                    ? 'কোন জিকির কত বার পাঠ করা হয়েছে:'
                    : 'Detailed Dhikr Breakdown:'}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {session.breakdown.map((item, bIdx) => {
                    const count = item.count || 0;
                    const hasCount = count > 0;
                    return (
                      <div
                        key={bIdx}
                        className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 ${
                          hasCount
                            ? isDay
                              ? 'bg-emerald-50/70 border-emerald-200 text-slate-800'
                              : 'bg-slate-950/70 border-emerald-900/40 text-slate-100'
                            : isDay
                            ? 'bg-slate-50/50 border-slate-100 text-slate-400 opacity-60'
                            : 'bg-slate-950/30 border-slate-900 text-slate-500 opacity-60'
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-bold truncate">
                            {item.name}
                          </div>
                          {item.arabic && (
                            <div className="text-[11px] font-arabic text-amber-600 dark:text-amber-400 truncate">
                              {item.arabic}
                            </div>
                          )}
                        </div>

                        <div className="text-right shrink-0">
                          <div
                            className={`text-sm sm:text-base font-black font-mono leading-none ${
                              hasCount
                                ? 'text-emerald-600 dark:text-emerald-400'
                                : 'text-slate-400'
                            }`}
                          >
                            {count.toLocaleString()}
                          </div>
                          <span className="text-[9px] font-bold text-slate-400">
                            {selectedLanguage === 'bn' ? 'বার' : 'times'}
                            {item.target ? ` / ${item.target}` : ''}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className={`text-center py-16 px-4 rounded-3xl border border-dashed ${
            isDay
              ? 'bg-slate-50 border-slate-300 text-slate-700'
              : 'bg-slate-900/40 border-slate-800 text-slate-300'
          }`}
        >
          <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-emerald-950/80 flex items-center justify-center text-emerald-400 text-xl border border-emerald-800/50">
            📜
          </div>
          <h3 className="text-base font-bold mb-1">
            {selectedLanguage === 'bn' ? 'কোনো সংরক্ষিত হিস্ট্রি সেশন নেই' : 'No Saved Sessions Yet'}
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
            {selectedLanguage === 'bn'
              ? 'হোমপেজের সেন্ট্রাল কাউন্টারে "Save Session" চাপুন অথবা প্রতিদিন স্বয়ংক্রিয়ভাবে হিস্ট্রি সংরক্ষিত হবে!'
              : 'Tap "Save Session to History" on the center counter anytime to snapshot your count milestones!'}
          </p>
        </div>
      )}
    </div>
  );
};

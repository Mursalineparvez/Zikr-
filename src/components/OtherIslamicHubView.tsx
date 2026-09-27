import React, { useState } from 'react';
import { ThemeMode, ZikrLanguage, ZikrItem, DuaItem } from '../types';
import {
  Heart,
  BookMarked,
  BookOpen,
  Users,
  Sparkles,
  Compass,
  Layers,
  ChevronRight,
  ArrowLeft,
  Award,
} from 'lucide-react';
import { DuaView } from './DuaView';
import { HadithView } from './HadithView';
import { KitabView } from './KitabView';
import { DailyTabligView } from './DailyTabligView';
import { AllahNamesView } from './AllahNamesView';
import { HajjUmrahView } from './HajjUmrahView';
import { soundHaptics } from '../utils/audioHaptics';

export type OtherSubSection =
  | 'hub'
  | 'dua'
  | 'hadith'
  | 'kitab'
  | 'tablig'
  | 'allah_names'
  | 'hajj_umrah';

interface OtherIslamicHubViewProps {
  onAddDuaToCounters: (dua: DuaItem) => void;
  activeCounters: ZikrItem[];
  soundEnabled: boolean;
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
  initialSubSection?: OtherSubSection;
}

export const OtherIslamicHubView: React.FC<OtherIslamicHubViewProps> = ({
  onAddDuaToCounters,
  activeCounters,
  soundEnabled,
  themeMode = 'night',
  selectedLanguage = 'bn',
  initialSubSection = 'hub',
}) => {
  const isDay = themeMode === 'day';
  const [activeSub, setActiveSub] = useState<OtherSubSection>(initialSubSection);

  const hubItems = [
    {
      id: 'dua' as OtherSubSection,
      titleBn: 'দু’আ ও মুনাজাত',
      titleEn: 'Dua & Supplications',
      arabic: 'الأدعية المأثورة',
      descBn: 'কুরআন ও সুন্নাহর সহিহ মাসনুন দোয়াসমূহ, অর্থ ও উচ্চারণসহ',
      icon: <Heart className="w-6 h-6 text-rose-500" />,
      color: 'from-rose-500/15 to-pink-500/10 border-rose-500/30',
      badge: 'সহিহ দু’আ',
    },
    {
      id: 'hadith' as OtherSubSection,
      titleBn: 'হাদিস সম্ভার',
      titleEn: 'Hadith Collection',
      arabic: 'الحديث النبوي',
      descBn: 'বুখারি, মুসলিম, তিরমিজি ও রিয়াদুস সলেহীনের নির্বাচিত হাদিস',
      icon: <span className="text-2xl">📜</span>,
      color: 'from-amber-500/15 to-yellow-500/10 border-amber-500/30',
      badge: 'নবীজির বাণী',
    },
    {
      id: 'kitab' as OtherSubSection,
      titleBn: 'কিতাব লাইব্রেরি',
      titleEn: 'Kitab Library',
      arabic: 'المكتبة الإسلامية',
      descBn: 'ক্লাসিক্যাল ইসলামিক বই, তাফসির ও জরুরি ফেকাহ গ্রন্থমালা',
      icon: <BookMarked className="w-6 h-6 text-blue-500" />,
      color: 'from-blue-500/15 to-cyan-500/10 border-blue-500/30',
      badge: 'অনলাইন লাইব্রেরি',
    },
    {
      id: 'tablig' as OtherSubSection,
      titleBn: 'দৈনিক তাবলিগ ও বয়ান',
      titleEn: 'Daily Tablig & Bayan',
      arabic: 'الدعوة والتبليغ',
      descBn: 'দাওয়াতের ৬ সিফাত, ফাজায়েল, মসজিদওয়ারী ৫ আমল ও গাশতের আদব',
      icon: <Users className="w-6 h-6 text-emerald-500" />,
      color: 'from-emerald-500/15 to-teal-500/10 border-emerald-500/30',
      badge: '৬ সিফাত ও মেহনত',
    },
    {
      id: 'allah_names' as OtherSubSection,
      titleBn: 'আল্লাহর ৯৯টি নাম (আসমাউল হুসনা)',
      titleEn: 'Allah 99 Names',
      arabic: 'أسماء الله الحسنى',
      descBn: 'আল্লাহর ৯৯টি গুণবাচক নাম, অর্থ, ফজিলত ও অডিও উচ্চারণ',
      icon: <Sparkles className="w-6 h-6 text-amber-400" />,
      color: 'from-amber-500/15 to-orange-500/10 border-amber-500/30',
      badge: '৯৯ নাম ও ফজিলত',
    },
    {
      id: 'hajj_umrah' as OtherSubSection,
      titleBn: 'হজ ও ওমরাহ পূর্ণাঙ্গ গাইড',
      titleEn: 'Hajj & Umrah Guide',
      arabic: 'الحج والعمرة',
      descBn: 'ওমরাহ ও হজের ৫ দিনের ধারাবাহিক নিয়মাবলী, তালবিয়াহ ও মাসনুন দোয়া',
      icon: <span className="text-2xl">🕋</span>,
      color: 'from-teal-500/15 to-emerald-500/10 border-teal-500/30',
      badge: 'সচিত্র নিয়মাবলী',
    },
  ];

  const handleSelectSub = (sub: OtherSubSection) => {
    setActiveSub(sub);
    if (soundEnabled) soundHaptics.playTap();
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Top Category Switcher Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => handleSelectSub('hub')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition active:scale-95 cursor-pointer shrink-0 border ${
            activeSub === 'hub'
              ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
              : isDay
              ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
              : 'bg-[#092226] hover:bg-[#123840] border-[#153e46] text-teal-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>অন্যান্য হাব (All Features)</span>
        </button>

        <button
          onClick={() => handleSelectSub('dua')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition active:scale-95 cursor-pointer shrink-0 border ${
            activeSub === 'dua'
              ? 'bg-rose-600 text-white border-rose-500 shadow-md'
              : isDay
              ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
              : 'bg-[#092226] hover:bg-[#123840] border-[#153e46] text-teal-200'
          }`}
        >
          <Heart className="w-3.5 h-3.5" />
          <span>দু’আ ও মুনাজাত</span>
        </button>

        <button
          onClick={() => handleSelectSub('hadith')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition active:scale-95 cursor-pointer shrink-0 border ${
            activeSub === 'hadith'
              ? 'bg-amber-600 text-white border-amber-500 shadow-md'
              : isDay
              ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
              : 'bg-[#092226] hover:bg-[#123840] border-[#153e46] text-teal-200'
          }`}
        >
          <span>📜</span>
          <span>হাদিস সম্ভার</span>
        </button>

        <button
          onClick={() => handleSelectSub('kitab')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition active:scale-95 cursor-pointer shrink-0 border ${
            activeSub === 'kitab'
              ? 'bg-blue-600 text-white border-blue-500 shadow-md'
              : isDay
              ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
              : 'bg-[#092226] hover:bg-[#123840] border-[#153e46] text-teal-200'
          }`}
        >
          <BookMarked className="w-3.5 h-3.5" />
          <span>কিতাব লাইব্রেরি</span>
        </button>

        <button
          onClick={() => handleSelectSub('tablig')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition active:scale-95 cursor-pointer shrink-0 border ${
            activeSub === 'tablig'
              ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
              : isDay
              ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
              : 'bg-[#092226] hover:bg-[#123840] border-[#153e46] text-teal-200'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>দৈনিক তাবলিগ</span>
        </button>

        <button
          onClick={() => handleSelectSub('allah_names')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition active:scale-95 cursor-pointer shrink-0 border ${
            activeSub === 'allah_names'
              ? 'bg-amber-600 text-white border-amber-500 shadow-md'
              : isDay
              ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
              : 'bg-[#092226] hover:bg-[#123840] border-[#153e46] text-teal-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>আল্লাহর ৯৯ নাম</span>
        </button>

        <button
          onClick={() => handleSelectSub('hajj_umrah')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition active:scale-95 cursor-pointer shrink-0 border ${
            activeSub === 'hajj_umrah'
              ? 'bg-teal-600 text-white border-teal-500 shadow-md'
              : isDay
              ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
              : 'bg-[#092226] hover:bg-[#123840] border-[#153e46] text-teal-200'
          }`}
        >
          <span>🕋</span>
          <span>হজ ও ওমরাহ</span>
        </button>
      </div>

      {/* Main Content Area */}
      {activeSub === 'hub' && (
        <div className="space-y-5">
          {/* Header Banner */}
          <div
            className={`p-5 sm:p-6 rounded-3xl border shadow-xl ${
              isDay
                ? 'bg-gradient-to-r from-teal-700 via-emerald-700 to-teal-800 text-white border-teal-600/40'
                : 'bg-gradient-to-r from-[#0c2f35] via-[#12414a] to-[#1a5560] text-white border-[#1a535e]'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-teal-100 text-xs font-semibold mb-2 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>ইসলামিক ফিচার সম্ভার • Comprehensive Islamic Suite</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              অন্যান্য ইসলামিক ফিচারসমূহ (Other Features)
            </h2>
            <p className="text-xs sm:text-sm text-teal-100/90 mt-1 max-w-xl">
              দু’আ, হাদিস, কিতাব লাইব্রেরি, দৈনিক তাবলিগ, আসমাউল হুসনা এবং হজ-ওমরাহর পূর্ণাঙ্গ গাইড একসাথে।
            </p>
          </div>

          {/* 6 Feature Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {hubItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelectSub(item.id)}
                className={`p-5 rounded-3xl border shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer flex flex-col justify-between gap-4 ${
                  isDay
                    ? 'bg-white border-slate-200 hover:border-emerald-400 hover:shadow-xl'
                    : 'bg-[#0a242a] border-[#16444e] hover:border-teal-500/50 hover:shadow-teal-950/50'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br border ${item.color}`}>
                    {item.icon}
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 text-[10px] font-bold">
                    {item.badge}
                  </span>
                </div>

                <div>
                  <div className="font-arabic text-xs text-emerald-600 dark:text-emerald-400 font-bold mb-1">
                    {item.arabic}
                  </div>
                  <h3 className={`text-base font-bold ${isDay ? 'text-slate-900' : 'text-white'}`}>
                    {item.titleBn}
                  </h3>
                  <p className={`text-xs mt-1 leading-relaxed ${isDay ? 'text-slate-500' : 'text-teal-200/80'}`}>
                    {item.descBn}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-teal-900/30 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <span>ওপেন করুন (Open)</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-view: Dua */}
      {activeSub === 'dua' && (
        <DuaView
          onAddDuaToCounters={onAddDuaToCounters}
          activeCounters={activeCounters}
          soundEnabled={soundEnabled}
          themeMode={themeMode}
          selectedLanguage={selectedLanguage}
        />
      )}

      {/* Sub-view: Hadith */}
      {activeSub === 'hadith' && (
        <HadithView
          soundEnabled={soundEnabled}
          themeMode={themeMode}
          selectedLanguage={selectedLanguage}
        />
      )}

      {/* Sub-view: Kitab */}
      {activeSub === 'kitab' && <KitabView themeMode={themeMode} />}

      {/* Sub-view: Tablig */}
      {activeSub === 'tablig' && (
        <DailyTabligView
          soundEnabled={soundEnabled}
          themeMode={themeMode}
          selectedLanguage={selectedLanguage}
        />
      )}

      {/* Sub-view: Allah Names */}
      {activeSub === 'allah_names' && (
        <AllahNamesView
          soundEnabled={soundEnabled}
          themeMode={themeMode}
          selectedLanguage={selectedLanguage}
        />
      )}

      {/* Sub-view: Hajj & Umrah */}
      {activeSub === 'hajj_umrah' && (
        <HajjUmrahView
          soundEnabled={soundEnabled}
          themeMode={themeMode}
          selectedLanguage={selectedLanguage}
        />
      )}
    </div>
  );
};

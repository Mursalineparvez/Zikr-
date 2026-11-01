import React, { useState, useMemo } from 'react';
import {
  GENEALOGY_BRANCHES,
  INTERMARRIAGE_HIGHLIGHTS,
  GenealogyPerson,
  PersonRole,
} from '../data/genealogyData';
import { ThemeMode, ZikrLanguage } from '../types';
import {
  Sparkles,
  Search,
  BookOpen,
  ChevronDown,
  ChevronUp,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Copy,
  Check,
  Info,
  Award,
  Flame,
  Layers,
  Heart,
  X,
  Share2,
} from 'lucide-react';
import { soundHaptics } from '../utils/audioHaptics';

interface GenealogyChartViewProps {
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
  soundEnabled?: boolean;
  onSelectSahabaBio?: (sahabaId: string) => void;
}

export const GenealogyChartView: React.FC<GenealogyChartViewProps> = ({
  themeMode = 'night',
  selectedLanguage = 'bn',
  soundEnabled = true,
  onSelectSahabaBio,
}) => {
  const isDay = themeMode === 'day';
  const isBn = selectedLanguage === 'bn';

  const [activeViewMode, setActiveViewMode] = useState<'chart' | 'tree' | 'marriages'>('chart');
  const [chartScale, setChartScale] = useState<number>(1);
  const [selectedPersonModal, setSelectedPersonModal] = useState<GenealogyPerson | null>(null);
  const [copiedNote, setCopiedNote] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedNodeIds, setExpandedNodeIds] = useState<Record<string, boolean>>({
    prophet_muhammad: true,
    fatima_al_zahra: true,
    abu_bakr_as_siddiq: true,
    umar_bin_khattab: true,
    uthman_bin_affan: true,
    ali_bin_abi_talib: true,
    imams_root: true,
  });

  const toggleNodeExpand = (id: string) => {
    setExpandedNodeIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    if (soundEnabled) soundHaptics.playTap();
  };

  // Zoom handlers for flowchart diagram
  const handleZoomIn = () => {
    setChartScale((prev) => Math.min(1.4, prev + 0.1));
    if (soundEnabled) soundHaptics.playTap();
  };

  const handleZoomOut = () => {
    setChartScale((prev) => Math.max(0.7, prev - 0.1));
    if (soundEnabled) soundHaptics.playTap();
  };

  const handleResetZoom = () => {
    setChartScale(1);
    if (soundEnabled) soundHaptics.playTap();
  };

  const handleCopyGenealogySummary = () => {
    const summaryText = isBn
      ? `🌳 প্রামাণিক শাজারা শরীফ — আহলে বাইত ও সাহাবিগণের বংশলতিকা চার্ট\n\nরঙের নির্দেশিকা:\n🔴 লাল ওভাল: আহলে বাইত (Ahl al-Bayt)\n🟢 সবুজ ওভাল: সাহাবায়ে কেরাম (Sahabi RA)\n🔵 নীল ওভাল: তাবেয়ী ও পরবর্তী সন্তানগণ (Tabi'i)\n\nউৎস: সহিহ হাদিস, সীরাতে ইবনে হিশাম ও হায়াতুস সাহাবাহ সংকলন।`
      : `🌳 Authentic Lineage & Genealogy Chart of Ahl al-Bayt & Sahaba\n\nColor Legend:\n🔴 Red Oval: Ahl al-Bayt\n🟢 Green Oval: Sahaba (RA)\n🔵 Blue Oval: Tabi'in & Descendants\n\nSource: Sahih Hadith, Sirah Ibn Hisham & Hayatus Sahaba.`;

    navigator.clipboard.writeText(summaryText);
    setCopiedNote(true);
    if (soundEnabled) soundHaptics.playTargetChime();
    setTimeout(() => setCopiedNote(false), 2000);
  };

  // Helper function for pill style matching the chart legend
  const getPillStyle = (role: PersonRole) => {
    switch (role) {
      case 'ahl_al_bayt':
        return {
          bg: 'bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white border-red-400 shadow-red-900/50',
          indicator: 'bg-red-500',
          label: isBn ? 'আহলে বাইত' : 'Ahl al-Bayt',
          badgeBg: isDay ? 'bg-red-100 text-red-900 border-red-300' : 'bg-red-500/20 text-red-200 border-red-500/35',
        };
      case 'sahabi':
        return {
          bg: 'bg-gradient-to-r from-emerald-600 via-green-600 to-teal-700 text-white border-emerald-400 shadow-emerald-900/50',
          indicator: 'bg-emerald-500',
          label: isBn ? 'সাহাবি (রা.)' : 'Sahabi (RA)',
          badgeBg: isDay ? 'bg-emerald-100 text-emerald-950 border-emerald-300' : 'bg-emerald-500/20 text-emerald-200 border-emerald-500/35',
        };
      case 'tabii':
      default:
        return {
          bg: 'bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 text-white border-cyan-400 shadow-cyan-900/50',
          indicator: 'bg-cyan-500',
          label: isBn ? 'তাবেয়ী (রহ.)' : 'Tabi\'i (RH)',
          badgeBg: isDay ? 'bg-cyan-100 text-cyan-900 border-cyan-300' : 'bg-cyan-500/20 text-cyan-200 border-cyan-500/35',
        };
    }
  };

  // Individual Oval Node component as depicted in the diagram
  const RenderChartPillNode: React.FC<{
    person: GenealogyPerson;
    subNoteBn?: string;
    subNoteEn?: string;
    onClick?: () => void;
  }> = ({ person, subNoteBn, subNoteEn, onClick }) => {
    const pill = getPillStyle(person.role);
    const displayName = isBn ? person.nameBn : person.nameEn;
    const spouseName = isBn ? person.spouseBn : person.spouseEn;
    const relationNote = isBn ? person.relationNoteBn : person.relationNoteEn;

    return (
      <div className="flex flex-col items-center justify-center text-center group cursor-pointer my-1 px-1">
        <button
          type="button"
          onClick={() => {
            if (onClick) onClick();
            else setSelectedPersonModal(person);
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`px-3.5 sm:px-4 py-1.5 rounded-full border-2 text-xs sm:text-sm font-black transition-all duration-300 transform group-hover:scale-105 shadow-lg flex items-center justify-center gap-1.5 whitespace-nowrap active:scale-95 ${pill.bg}`}
          title={`${displayName} (${person.nameAr})`}
        >
          <span className="font-arabic font-extrabold dir-rtl tracking-wide">{person.nameAr}</span>
          <span className="text-[10px] font-semibold opacity-90 hidden sm:inline">({displayName})</span>
        </button>

        {person.isMartyrKarbala && (
          <span className="mt-0.5 px-2 py-0.2 rounded-full text-[9px] font-black bg-red-800 text-red-100 border border-red-400 flex items-center gap-0.5 animate-pulse shadow-sm">
            🗡️ {isBn ? 'কারবালায় শহীদ' : 'Martyred at Karbala'}
          </span>
        )}

        {(subNoteBn || spouseName || relationNote) && (
          <span className="text-[9.5px] font-bold text-amber-600 dark:text-amber-300 max-w-[140px] leading-tight mt-0.5 truncate">
            {spouseName ? `💍 ${spouseName}` : relationNote}
          </span>
        )}
      </div>
    );
  };

  // Filtered branches for search
  const filteredBranches = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return GENEALOGY_BRANCHES;

    return GENEALOGY_BRANCHES.filter((branch) => {
      let matches = false;
      const traverse = (p: GenealogyPerson) => {
        if (
          p.nameBn.toLowerCase().includes(q) ||
          p.nameEn.toLowerCase().includes(q) ||
          p.nameAr.includes(q) ||
          (p.relationNoteBn && p.relationNoteBn.toLowerCase().includes(q)) ||
          (p.relationNoteEn && p.relationNoteEn.toLowerCase().includes(q))
        ) {
          matches = true;
        }
        if (p.children) p.children.forEach(traverse);
      };
      traverse(branch.headPerson);
      return matches;
    });
  }, [searchQuery]);

  return (
    <div className={`w-full space-y-5 animate-in fade-in duration-300 ${isBn ? 'font-bengali' : 'font-sans'}`}>
      
      {/* 1. TOP SHANDAR HERO BANNER */}
      <div
        className={`p-5 sm:p-6 rounded-3xl border shadow-2xl relative overflow-hidden ${
          isDay
            ? 'bg-gradient-to-br from-amber-100/90 via-white to-emerald-100/90 border-amber-300 text-slate-900 shadow-amber-900/5'
            : 'bg-gradient-to-br from-[#0e211b] via-[#091814] to-[#040e0c] border-amber-500/30 text-white shadow-black/80'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-400/40 text-xs font-black">
            <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>
              {isBn
                ? 'প্রামাণিক সচিত্র শাজারা শরীফ • আহলে বাইত ও সাহাবিগণের বংশলতিকা'
                : 'Authentic Lineage & Genealogy • Ahl al-Bayt & Sahaba'}
            </span>
          </div>

          <button
            type="button"
            onClick={handleCopyGenealogySummary}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 cursor-pointer active:scale-95 shadow-sm ${
              copiedNote
                ? 'bg-emerald-600 text-white border-emerald-500'
                : isDay
                ? 'bg-white hover:bg-slate-100 text-slate-800 border-amber-300'
                : 'bg-[#112d25] hover:bg-[#183e33] text-teal-200 border-teal-700/50'
            }`}
          >
            {copiedNote ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
            <span>{copiedNote ? (isBn ? 'কপি হয়েছে' : 'Copied') : (isBn ? 'সংক্ষেপ কপি' : 'Copy Summary')}</span>
          </button>
        </div>

        <h2 className="text-xl sm:text-2xl font-black leading-snug text-amber-800 dark:text-amber-400 mb-1.5">
          {isBn
            ? 'আহলে বাইত ও চার খলিফায়ে রাশেদীনের পবিত্র বংশলতিকা ও বন্ধন'
            : 'Sacred Lineage & Bonds of Ahl al-Bayt & Rashidun Caliphs'}
        </h2>
        <p className={`text-xs sm:text-sm leading-relaxed font-medium max-w-4xl ${
          isDay ? 'text-slate-800' : 'text-slate-200'
        }`}>
          {isBn
            ? 'পবিত্র সিরাত গ্রন্থাবলি অনুযায়ী নাবী করীম (ﷺ), হযরত আবু বকর, হযরত উমর, হযরত উসমান এবং হযরত আলী (রা.)-এর পরিবারগুলোর মধ্যে ছিল সর্বোচ্চ ভালোবাসা ও অসংখ্য আন্তঃবিবাহের প্রামাণিক সম্পর্ক।'
            : 'Based on authentic Sirah literature, demonstrating the deep mutual love, affection, and intermarriages between the Prophet ﷺ, Abu Bakr, Umar, Uthman, and Ali (RA).'}
        </p>

        {/* View Switcher & Zoom Toolbar */}
        <div className="pt-4 border-t border-black/10 dark:border-white/10 mt-4 flex flex-wrap items-center justify-between gap-3">
          {/* View Toggles */}
          <div className="flex items-center gap-1.5 bg-black/20 p-1 rounded-2xl border border-amber-500/30 flex-wrap">
            <button
              type="button"
              onClick={() => {
                setActiveViewMode('chart');
                if (soundEnabled) soundHaptics.playTap();
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                activeViewMode === 'chart'
                  ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-white shadow-md'
                  : 'text-amber-200/80 hover:text-white'
              }`}
            >
              <span>📊</span>
              <span>{isBn ? 'চিত্ররূপ চার্ট ডায়াগ্রাম' : 'Visual Diagram Chart'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveViewMode('tree');
                if (soundEnabled) soundHaptics.playTap();
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                activeViewMode === 'tree'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                  : 'text-teal-200/80 hover:text-white'
              }`}
            >
              <span>🌳</span>
              <span>{isBn ? 'পরিবার ফ্যামিলি ট্রি' : 'Family Tree List'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveViewMode('marriages');
                if (soundEnabled) soundHaptics.playTap();
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                activeViewMode === 'marriages'
                  ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md'
                  : 'text-rose-200/80 hover:text-white'
              }`}
            >
              <span>💍</span>
              <span>{isBn ? 'পবিত্র ৪টি বিবাহ বন্ধন' : '4 Major Intermarriages'}</span>
            </button>
          </div>

          {/* Zoom Controls for Chart View */}
          {activeViewMode === 'chart' && (
            <div className="flex items-center gap-1 bg-black/20 p-1 rounded-2xl border border-amber-500/30">
              <button
                type="button"
                onClick={handleZoomIn}
                className="p-1.5 hover:bg-white/15 rounded-xl text-amber-300 transition cursor-pointer"
                title={isBn ? 'জুম ইন (+)' : 'Zoom In (+)'}
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleZoomOut}
                className="p-1.5 hover:bg-white/15 rounded-xl text-amber-300 transition cursor-pointer"
                title={isBn ? 'জুম আউট (-)' : 'Zoom Out (-)'}
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleResetZoom}
                className="p-1.5 hover:bg-white/15 rounded-xl text-amber-300 transition cursor-pointer"
                title={isBn ? 'জুম রিসেট' : 'Reset Zoom'}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <span className="text-[10px] font-mono font-bold text-amber-300 px-2">
                {Math.round(chartScale * 100)}%
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 2. MAIN FLOWCHART DIAGRAM VIEW (EXACTLY MATCHING THE PICTURE STRUCTURE & DYNAMIC LANGUAGE) */}
      {activeViewMode === 'chart' && (
        <div className="space-y-6">
          
          {/* Scrollable Flowchart Canvas Container */}
          <div className={`w-full overflow-x-auto scrollbar-thin p-4 sm:p-6 rounded-3xl border shadow-2xl transition-all duration-300 relative ${
            isDay ? 'bg-amber-50/50 border-amber-300/80' : 'bg-[#041216] border-amber-500/30'
          }`}>
            
            <div
              className="min-w-[800px] sm:min-w-[980px] space-y-8 transition-transform duration-200 origin-top-left"
              style={{ transform: `scale(${chartScale})` }}
            >
              
              {/* ========================================================================= */}
              {/* SECTION 1: PROPHET MUHAMMAD (ﷺ) CHILDREN (أولاد الرسول العربي مُحَمَّد) */}
              {/* ========================================================================= */}
              <div className="space-y-4 text-center">
                {/* Red Master Header Banner */}
                <div className="w-full py-2.5 px-6 rounded-2xl bg-gradient-to-r from-red-800 via-rose-700 to-red-800 text-white border-2 border-red-400 shadow-xl flex items-center justify-center gap-2">
                  <span className="text-xl">🕋</span>
                  <h3 className="text-lg sm:text-xl font-black font-arabic tracking-wide">
                    أولاد الرسول العربي مُحَمَّد ﷺ
                  </h3>
                  <span className="text-xs font-bold opacity-95">
                    ({isBn ? 'আওলাদে রাসুলুল্লাহ মুহাম্মদ ﷺ' : 'Children of Prophet Muhammad ﷺ'})
                  </span>
                </div>

                {/* Connecting SVG Stem Line */}
                <div className="flex justify-center -my-2">
                  <div className="w-0.5 h-6 bg-red-500" />
                </div>

                {/* Horizontal Branching Bar */}
                <div className="w-[92%] mx-auto h-0.5 bg-red-500 relative">
                  <div className="absolute left-0 top-0 w-0.5 h-4 bg-red-500" />
                  <div className="absolute left-[16%] top-0 w-0.5 h-4 bg-red-500" />
                  <div className="absolute left-[33%] top-0 w-0.5 h-4 bg-red-500" />
                  <div className="absolute left-[50%] top-0 w-0.5 h-4 bg-red-500" />
                  <div className="absolute left-[66%] top-0 w-0.5 h-4 bg-red-500" />
                  <div className="absolute left-[83%] top-0 w-0.5 h-4 bg-red-500" />
                  <div className="absolute right-0 top-0 w-0.5 h-4 bg-red-500" />
                </div>

                {/* 7 Children Oval Pills Row */}
                <div className="grid grid-cols-7 gap-1 pt-3">
                  {/* 1. Al-Qasim */}
                  <RenderChartPillNode
                    person={{
                      id: 'al_qasim',
                      nameBn: 'আল-কাসিম (রা.)',
                      nameEn: 'Al-Qasim (RA)',
                      nameAr: 'القاسم',
                      role: 'sahabi',
                      relationNoteBn: 'প্রথম সন্তান',
                      relationNoteEn: 'Firstborn son',
                    }}
                  />

                  {/* 2. Zainab */}
                  <div className="flex flex-col items-center">
                    <RenderChartPillNode
                      person={{
                        id: 'zainab_bint_muhammad',
                        nameBn: 'জায়নাব (রা.)',
                        nameEn: 'Zainab (RA)',
                        nameAr: 'زينب',
                        role: 'ahl_al_bayt',
                        spouseBn: 'أبو العاص بن الربيع الأموي',
                        spouseEn: 'Abul-As bin Al-Rabi',
                      }}
                    />
                    <div className="w-0.5 h-3 bg-red-500/60" />
                    <div className="text-[9px] font-bold text-slate-500 dark:text-slate-400">
                      زوجها: أبو العاص بن الربيع
                    </div>
                    {/* Children of Zainab */}
                    <div className="flex gap-1 mt-1">
                      <RenderChartPillNode
                        person={{
                          id: 'ali_bin_abul_as',
                          nameBn: 'আলী',
                          nameEn: 'Ali',
                          nameAr: 'علي',
                          role: 'sahabi',
                        }}
                      />
                      <RenderChartPillNode
                        person={{
                          id: 'umamah_bint_abul_as',
                          nameBn: 'উমামাহ',
                          nameEn: 'Umamah',
                          nameAr: 'أمامة',
                          role: 'sahabi',
                          spouseBn: 'علي بن أبي طالب (بعد وفاة فاطمة)',
                          spouseEn: 'Ali bin Abi Talib (RA)',
                        }}
                      />
                    </div>
                  </div>

                  {/* 3. Abdullah */}
                  <RenderChartPillNode
                    person={{
                      id: 'abdullah_bin_muhammad',
                      nameBn: 'عبد الله',
                      nameEn: 'Abdullah',
                      nameAr: 'عبد الله',
                      role: 'sahabi',
                      relationNoteBn: 'আত-তৈয়্যিব ও আত-তহির',
                      relationNoteEn: 'At-Tayyib & At-Tahir',
                    }}
                  />

                  {/* 4. Ruqayyah */}
                  <div className="flex flex-col items-center">
                    <RenderChartPillNode
                      person={{
                        id: 'ruqayyah_bint_muhammad',
                        nameBn: 'রুকাইয়াহ (রা.)',
                        nameEn: 'Ruqayyah (RA)',
                        nameAr: 'رُقَيَّة',
                        role: 'ahl_al_bayt',
                        spouseBn: 'عثمان بن عفان',
                        spouseEn: 'Uthman bin Affan (RA)',
                      }}
                    />
                    <div className="text-[9px] font-bold text-amber-600 dark:text-amber-400 mt-1">
                      تزوّجها: عثمان بن عفان
                    </div>
                  </div>

                  {/* 5. Umay Kulthum */}
                  <div className="flex flex-col items-center">
                    <RenderChartPillNode
                      person={{
                        id: 'umay_kulthum_bint_muhammad',
                        nameBn: 'উম্মে কুলসুম (রা.)',
                        nameEn: 'Umay Kulthum (RA)',
                        nameAr: 'أم كلثوم',
                        role: 'ahl_al_bayt',
                        spouseBn: 'عثمان بن عفان (بعد وفاة رقية)',
                        spouseEn: 'Uthman bin Affan (RA)',
                      }}
                    />
                    <div className="text-[9px] font-bold text-amber-600 dark:text-amber-400 mt-1">
                      تزوّجها: عثمان بن عفان
                    </div>
                  </div>

                  {/* 6. Fatima */}
                  <div className="flex flex-col items-center">
                    <RenderChartPillNode
                      person={{
                        id: 'fatima_al_zahra',
                        nameBn: 'ফাতিমাতুজ জাহরা (রা.)',
                        nameEn: 'Fatima Al-Zahra (RA)',
                        nameAr: 'فاطمة',
                        role: 'ahl_al_bayt',
                        spouseBn: 'علي بن أبي طالب',
                        spouseEn: 'Ali bin Abi Talib (RA)',
                      }}
                    />
                    <div className="w-0.5 h-3 bg-red-500/60" />
                    <div className="text-[9px] font-bold text-amber-600 dark:text-amber-400">
                      تزوّجها: علي بن أبي طالب
                    </div>
                    {/* Fatima's Children */}
                    <div className="flex flex-wrap justify-center gap-1 mt-1 max-w-[200px]">
                      <RenderChartPillNode person={{ id: 'al_hasan', nameBn: 'হাসান', nameEn: 'Al-Hasan', nameAr: 'الحسن', role: 'ahl_al_bayt' }} />
                      <RenderChartPillNode person={{ id: 'al_hussein', nameBn: 'হুসাইন', nameEn: 'Al-Hussein', nameAr: 'الحسين', role: 'ahl_al_bayt' }} />
                      <RenderChartPillNode person={{ id: 'muhsin', nameBn: 'মহসিন', nameEn: 'Muhsin', nameAr: 'محسن', role: 'ahl_al_bayt' }} />
                      <RenderChartPillNode person={{ id: 'zainab_f', nameBn: 'জায়নাব', nameEn: 'Zainab', nameAr: 'زينب', role: 'ahl_al_bayt' }} />
                      <RenderChartPillNode person={{ id: 'umay_k_f', nameBn: 'উম্মে কুলসুম', nameEn: 'Umay Kulthum', nameAr: 'أم كلثوم', role: 'ahl_al_bayt', spouseBn: 'عمر بن الخطاب', spouseEn: 'Umar bin Al-Khattab' }} />
                    </div>
                  </div>

                  {/* 7. Ibrahim */}
                  <div className="flex flex-col items-center">
                    <RenderChartPillNode
                      person={{
                        id: 'ibrahim_bin_muhammad',
                        nameBn: 'ইব্রাহিম (রা.)',
                        nameEn: 'Ibrahim (RA)',
                        nameAr: 'إبراهيم',
                        role: 'sahabi',
                      }}
                    />
                    <span className="text-[8.5px] font-bold text-slate-500 dark:text-slate-400 mt-1">
                      أمّه: مارية القبطية
                    </span>
                  </div>
                </div>
              </div>

              <div className="w-full h-px bg-amber-500/30 my-6" />

              {/* ========================================================================= */}
              {/* SECTION 2: ABU BAKR AL-SIDDIQ (من أولاد أبو بكر الصدّيق) */}
              {/* ========================================================================= */}
              <div className="space-y-4 text-center">
                {/* Green Master Header Banner */}
                <div className="w-full py-2.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-800 via-green-700 to-emerald-800 text-white border-2 border-emerald-400 shadow-xl flex items-center justify-center gap-2">
                  <span className="text-xl">💚</span>
                  <h3 className="text-lg sm:text-xl font-black font-arabic tracking-wide">
                    من أولاد أبو بكر الصدّيق رضي الله عنه
                  </h3>
                  <span className="text-xs font-bold opacity-95">
                    ({isBn ? 'আওলাদে আবু বকর সিদ্দিক রা.' : 'Offspring of Abu Bakr Al-Siddiq RA'})
                  </span>
                </div>

                {/* Connecting Line */}
                <div className="flex justify-center -my-2">
                  <div className="w-0.5 h-6 bg-emerald-500" />
                </div>

                <div className="w-[80%] mx-auto h-0.5 bg-emerald-500 relative">
                  <div className="absolute left-0 top-0 w-0.5 h-4 bg-emerald-500" />
                  <div className="absolute left-[25%] top-0 w-0.5 h-4 bg-emerald-500" />
                  <div className="absolute left-[50%] top-0 w-0.5 h-4 bg-emerald-500" />
                  <div className="absolute left-[75%] top-0 w-0.5 h-4 bg-emerald-500" />
                  <div className="absolute right-0 top-0 w-0.5 h-4 bg-emerald-500" />
                </div>

                {/* 5 Children Row */}
                <div className="grid grid-cols-5 gap-2 pt-3">
                  {/* Umay Kulthum */}
                  <RenderChartPillNode person={{ id: 'uk_ab', nameBn: 'উম্মে কুলসুম', nameEn: 'Umay Kulthum', nameAr: 'أم كلثوم', role: 'sahabi' }} />

                  {/* Asma */}
                  <div className="flex flex-col items-center">
                    <RenderChartPillNode person={{ id: 'asma_ab', nameBn: 'আসমা (ধাতুন নিতাকাইন)', nameEn: 'Asma (RA)', nameAr: 'أسماء', role: 'sahabi', spouseBn: 'الزبير بن العوام', spouseEn: 'Al-Zubayr bin Al-Awwam' }} />
                    <span className="text-[9px] font-bold text-amber-600 dark:text-amber-400">تزوّجها: الزبير بن العوام</span>
                    <div className="flex gap-1 mt-1">
                      <RenderChartPillNode person={{ id: 'abdullah_z', nameBn: 'عبد الله', nameEn: 'Abdullah', nameAr: 'عبد الله', role: 'sahabi' }} />
                      <RenderChartPillNode person={{ id: 'musab_z', nameBn: 'مصعب', nameEn: 'Mus\'ab', nameAr: 'مصعب', role: 'tabii' }} />
                      <RenderChartPillNode person={{ id: 'hind_z', nameBn: 'هند', nameEn: 'Hind', nameAr: 'هند', role: 'tabii' }} />
                    </div>
                  </div>

                  {/* Aisha */}
                  <div className="flex flex-col items-center">
                    <RenderChartPillNode person={{ id: 'aisha_ab', nameBn: 'আম্মাজান আয়েশা (রা.)', nameEn: 'Aisha Al-Siddiqah (RA)', nameAr: 'عائشة', role: 'sahabi', spouseBn: 'الرسول مُحَمَّد ﷺ', spouseEn: 'Prophet Muhammad ﷺ' }} />
                    <span className="text-[9px] font-bold text-amber-600 dark:text-amber-400">تزوّجها: الرسول مُحَمَّد ﷺ</span>
                  </div>

                  {/* Abdur Rahman */}
                  <div className="flex flex-col items-center">
                    <RenderChartPillNode person={{ id: 'ar_ab', nameBn: 'আবদুর রহমান (রা.)', nameEn: 'Abdur Rahman (RA)', nameAr: 'عبد الرحمن', role: 'sahabi' }} />
                    <div className="flex gap-1 mt-1">
                      <RenderChartPillNode person={{ id: 'hafsa_ar', nameBn: 'حفصة', nameEn: 'Hafsa', nameAr: 'حفصة', role: 'tabii' }} />
                      <RenderChartPillNode person={{ id: 'muhammad_ar', nameBn: 'محمد', nameEn: 'Muhammad', nameAr: 'محمد', role: 'tabii' }} />
                    </div>
                  </div>

                  {/* Muhammad bin Abi Bakr */}
                  <div className="flex flex-col items-center">
                    <RenderChartPillNode person={{ id: 'm_ab', nameBn: 'মুহাম্মদ বিন আবু বকর', nameEn: 'Muhammad bin Abi Bakr', nameAr: 'مُحَمَّد', role: 'sahabi' }} />
                    <div className="flex gap-1 mt-1">
                      <RenderChartPillNode person={{ id: 'qasim_m', nameBn: 'القاسم (ফকিহ)', nameEn: 'Al-Qasim (Jurist)', nameAr: 'القاسم', role: 'tabii' }} />
                      <RenderChartPillNode person={{ id: 'asma_m', nameBn: 'أسماء', nameEn: 'Asma', nameAr: 'أسماء', role: 'tabii' }} />
                    </div>
                    <span className="text-[8.5px] font-bold text-amber-500 mt-1">
                      فاطمة (أم فروة) زوجها محمد الباقر وأنجبت جعفر الصادق
                    </span>
                  </div>
                </div>
              </div>

              <div className="w-full h-px bg-amber-500/30 my-6" />

              {/* ========================================================================= */}
              {/* SECTION 3: UTHMAN BIN AFFAN & UMAR BIN KHATTAB (SIDE-BY-SIDE 2 COLUMNS) */}
              {/* ========================================================================= */}
              <div className="grid grid-cols-2 gap-4">
                
                {/* LEFT: Uthman bin Affan */}
                <div className="space-y-3 text-center border-r border-amber-500/30 pr-3">
                  <div className="w-full py-2 px-4 rounded-2xl bg-gradient-to-r from-emerald-800 to-teal-800 text-white border border-emerald-400 shadow-md">
                    <h4 className="text-sm sm:text-base font-black font-arabic">من أولاد عُثمان بن عفّان رضي الله عنه</h4>
                  </div>

                  <div className="flex justify-around pt-2">
                    <RenderChartPillNode person={{ id: 'amr_u', nameBn: 'عمرو', nameEn: 'Amr', nameAr: 'عمرو', role: 'tabii', spouseBn: 'فاطمة بنت الحسين', spouseEn: 'Fatima bint Al-Hussein' }} />
                    <RenderChartPillNode person={{ id: 'aban_u', nameBn: 'أبان (ফকিহ)', nameEn: 'Aban (Jurist)', nameAr: 'أبان', role: 'tabii', spouseBn: 'أم كلثوم بنت جعفر الطيار', spouseEn: 'Umay Kulthum bint Ja\'far' }} />
                    <RenderChartPillNode person={{ id: 'umar_u', nameBn: 'عمر', nameEn: 'Umar', nameAr: 'عمر', role: 'tabii', spouseBn: 'سكينة بنت الحسين', spouseEn: 'Sukaynah bint Al-Hussein' }} />
                  </div>
                </div>

                {/* RIGHT: Umar bin Al-Khattab */}
                <div className="space-y-3 text-center pl-1">
                  <div className="w-full py-2 px-4 rounded-2xl bg-gradient-to-r from-emerald-800 to-teal-800 text-white border border-emerald-400 shadow-md">
                    <h4 className="text-sm sm:text-base font-black font-arabic">من أولاد عُمر بن الخطاب رضي الله عنه</h4>
                  </div>

                  <div className="flex justify-around pt-2">
                    <RenderChartPillNode person={{ id: 'hafsa_um', nameBn: 'আম্মাজান হাফসা (রা.)', nameEn: 'Hafsa (RA)', nameAr: 'حفصة', role: 'sahabi', spouseBn: 'الرسول مُحَمَّد ﷺ', spouseEn: 'Prophet Muhammad ﷺ' }} />
                    <RenderChartPillNode person={{ id: 'asim_um', nameBn: 'عاصم (দাদা উমর ইবনে আবদুল আজিজ)', nameEn: 'Asim (Grandfather of Umar bin Abdul Aziz)', nameAr: 'عاصم', role: 'sahabi' }} />
                    <RenderChartPillNode person={{ id: 'ruq_um', nameBn: 'رقية', nameEn: 'Ruqayyah', nameAr: 'رقية', role: 'tabii' }} />
                    <RenderChartPillNode person={{ id: 'zayd_um', nameBn: 'زيد (মাতা: উম্মে কুলসুম বিনতে আলী)', nameEn: 'Zayd (Mother: Umay Kulthum bint Ali)', nameAr: 'زيد', role: 'tabii' }} />
                  </div>
                </div>
              </div>

              <div className="w-full h-px bg-amber-500/30 my-6" />

              {/* ========================================================================= */}
              {/* SECTION 4: ALI BIN ABI TALIB (من أولاد علي بن أبي طالب) */}
              {/* ========================================================================= */}
              <div className="space-y-4 text-center">
                {/* Red Master Header Banner */}
                <div className="w-full py-2.5 px-6 rounded-2xl bg-gradient-to-r from-red-800 via-rose-700 to-red-800 text-white border-2 border-red-400 shadow-xl flex items-center justify-center gap-2">
                  <span className="text-xl">⚔️</span>
                  <h3 className="text-lg sm:text-xl font-black font-arabic tracking-wide">
                    من أولاد علي بن أبي طالب رضي الله عنه
                  </h3>
                  <span className="text-xs font-bold opacity-95">
                    ({isBn ? 'আওলাদে আলী বিন আবী তালিব রা.' : 'Offspring of Ali bin Abi Talib RA'})
                  </span>
                </div>

                {/* Connecting Line */}
                <div className="flex justify-center -my-2">
                  <div className="w-0.5 h-6 bg-red-500" />
                </div>

                <div className="w-[95%] mx-auto h-0.5 bg-red-500 relative">
                  <div className="absolute left-0 top-0 w-0.5 h-4 bg-red-500" />
                  <div className="absolute left-[10%] top-0 w-0.5 h-4 bg-red-500" />
                  <div className="absolute left-[20%] top-0 w-0.5 h-4 bg-red-500" />
                  <div className="absolute left-[30%] top-0 w-0.5 h-4 bg-red-500" />
                  <div className="absolute left-[40%] top-0 w-0.5 h-4 bg-red-500" />
                  <div className="absolute left-[50%] top-0 w-0.5 h-4 bg-red-500" />
                  <div className="absolute left-[60%] top-0 w-0.5 h-4 bg-red-500" />
                  <div className="absolute left-[70%] top-0 w-0.5 h-4 bg-red-500" />
                  <div className="absolute left-[80%] top-0 w-0.5 h-4 bg-red-500" />
                  <div className="absolute left-[90%] top-0 w-0.5 h-4 bg-red-500" />
                  <div className="absolute right-0 top-0 w-0.5 h-4 bg-red-500" />
                </div>

                {/* 11 Children Row */}
                <div className="grid grid-cols-11 gap-0.5 pt-3">
                  <RenderChartPillNode person={{ id: 'abbas_a', nameBn: 'العباس (শহীদ)', nameEn: 'Al-Abbas (Martyr)', nameAr: 'العباس', role: 'ahl_al_bayt', isMartyrKarbala: true }} />
                  <RenderChartPillNode person={{ id: 'umar_ak', nameBn: 'عمر الأكبر (শহীদ)', nameEn: 'Umar Al-Akbar (Martyr)', nameAr: 'عمر الأكبر', role: 'ahl_al_bayt', isMartyrKarbala: true }} />
                  <RenderChartPillNode person={{ id: 'ab_a', nameBn: 'أبو بكر (শহীদ)', nameEn: 'Abu Bakr (Martyr)', nameAr: 'أبو بكر', role: 'ahl_al_bayt', isMartyrKarbala: true }} />
                  <RenderChartPillNode person={{ id: 'umar_as', nameBn: 'عمر الأصغر', nameEn: 'Umar Al-Asghar', nameAr: 'عمر الأصغر', role: 'ahl_al_bayt' }} />
                  <RenderChartPillNode person={{ id: 'uthman_ak', nameBn: 'عثمان الأكبر (শহীদ)', nameEn: 'Uthman Al-Akbar (Martyr)', nameAr: 'عثمان الأكبر', role: 'ahl_al_bayt', isMartyrKarbala: true }} />
                  <RenderChartPillNode person={{ id: 'ramlah_a', nameBn: 'رملة', nameEn: 'Ramlah', nameAr: 'رملة', role: 'ahl_al_bayt' }} />
                  <RenderChartPillNode person={{ id: 'uk_a', nameBn: 'أم كلثوم', nameEn: 'Umay Kulthum', nameAr: 'أم كلثوم', role: 'ahl_al_bayt', spouseBn: 'عمر بن الخطاب', spouseEn: 'Umar bin Al-Khattab' }} />
                  <RenderChartPillNode person={{ id: 'uh_a', nameBn: 'أم الحسن', nameEn: 'Um Al-Hasan', nameAr: 'أم الحسن', role: 'ahl_al_bayt' }} />
                  <RenderChartPillNode person={{ id: 'hasan_a', nameBn: 'الحسن (ইমাম)', nameEn: 'Al-Hasan (Imam)', nameAr: 'الحسن', role: 'ahl_al_bayt' }} />
                  <RenderChartPillNode person={{ id: 'hussein_a', nameBn: 'الحسين (ইমাম)', nameEn: 'Al-Hussein (Imam)', nameAr: 'الحسين', role: 'ahl_al_bayt' }} />
                  <RenderChartPillNode person={{ id: 'm_hanaf', nameBn: 'محمد بن الحنفية', nameEn: 'Muhammad bin Al-Hanafiyyah', nameAr: 'محمد بن الحنفية', role: 'tabii' }} />
                </div>

                {/* Karbala Bracket Note */}
                <div className="mt-2 py-1 px-4 rounded-xl bg-red-900/40 border border-red-500/50 inline-block text-xs font-black text-red-200 animate-pulse">
                  🗡️ «قُتِلا مع الحسين في معركة كربلاء» — {isBn ? 'কারবালার ময়দানে শহীদ' : 'Martyred alongside Hussein at Karbala'}
                </div>
              </div>

              <div className="w-full h-px bg-amber-500/30 my-6" />

              {/* ========================================================================= */}
              {/* SECTION 5: AL-HUSSEIN & AL-HASAN DESCENDANTS (SIDE-BY-SIDE 2 COLUMNS) */}
              {/* ========================================================================= */}
              <div className="grid grid-cols-2 gap-4">
                
                {/* LEFT: Offspring of Al-Hussein bin Ali */}
                <div className="space-y-3 text-center border-r border-amber-500/30 pr-3">
                  <div className="w-full py-2 px-4 rounded-2xl bg-gradient-to-r from-red-800 to-rose-800 text-white border border-red-400 shadow-md">
                    <h4 className="text-sm sm:text-base font-black font-arabic">من أولاد الحسين بن علي عليه السلام</h4>
                  </div>

                  <div className="flex justify-around pt-2">
                    <RenderChartPillNode person={{ id: 'zain_abidin', nameBn: 'علي زين العابدين', nameEn: 'Ali Zain Al-Abidin', nameAr: 'علي زين العابدين', role: 'ahl_al_bayt' }} />
                    <RenderChartPillNode person={{ id: 'ab_hussein', nameBn: 'أبو بكر', nameEn: 'Abu Bakr', nameAr: 'أبو بكر', role: 'ahl_al_bayt' }} />
                    <RenderChartPillNode person={{ id: 'umar_hussein', nameBn: 'عمر', nameEn: 'Umar', nameAr: 'عمر', role: 'ahl_al_bayt' }} />
                    <RenderChartPillNode person={{ id: 'fatima_h', nameBn: 'فاطمة', nameEn: 'Fatima', nameAr: 'فاطمة', role: 'ahl_al_bayt' }} />
                    <RenderChartPillNode person={{ id: 'sukaynah_h', nameBn: 'سكينة', nameEn: 'Sukaynah', nameAr: 'سكينة', role: 'ahl_al_bayt' }} />
                  </div>
                </div>

                {/* RIGHT: Offspring of Al-Hasan bin Ali */}
                <div className="space-y-3 text-center pl-1">
                  <div className="w-full py-2 px-4 rounded-2xl bg-gradient-to-r from-red-800 to-rose-800 text-white border border-red-400 shadow-md">
                    <h4 className="text-sm sm:text-base font-black font-arabic">من أولاد الحسن بن علي عليه السلام</h4>
                  </div>

                  <div className="flex justify-around pt-2">
                    <RenderChartPillNode person={{ id: 'hasan_muthanna', nameBn: 'الحسن المثنى', nameEn: 'Al-Hasan Al-Muthanna', nameAr: 'الحسن المثنى', role: 'tabii' }} />
                    <RenderChartPillNode person={{ id: 'ab_hasan', nameBn: 'أبو بكر (شহীদ)', nameEn: 'Abu Bakr (Martyr)', nameAr: 'أبو بكر', role: 'tabii', isMartyrKarbala: true }} />
                    <RenderChartPillNode person={{ id: 'umar_hasan', nameBn: 'عمر (শহীদ)', nameEn: 'Umar (Martyr)', nameAr: 'عمر', role: 'tabii', isMartyrKarbala: true }} />
                    <RenderChartPillNode person={{ id: 'um_hasan', nameBn: 'أم الحسن', nameEn: 'Um Al-Hasan', nameAr: 'أم الحسن', role: 'tabii' }} />
                  </div>
                </div>
              </div>

              {/* ========================================================================= */}
              {/* LEGEND BOX (فهرس الألوان - EXACTLY AS IN PICTURE & MULTI-LINGUAL) */}
              {/* ========================================================================= */}
              <div className="pt-6 flex justify-center">
                <div className={`p-4 rounded-2xl border-2 shadow-2xl flex flex-col items-center space-y-2 min-w-[300px] ${
                  isDay ? 'bg-white border-amber-400 text-slate-900' : 'bg-[#091b22] border-amber-500/50 text-white'
                }`}>
                  <h5 className="text-sm font-black font-arabic text-amber-600 dark:text-amber-400 border-b pb-1 px-4">
                    فهرس الألوان ({isBn ? 'রঙের নির্দেশিকা' : 'Color Index'})
                  </h5>

                  <div className="flex flex-col gap-2 w-full pt-1 text-xs font-bold">
                    <div className="flex items-center justify-between gap-3 px-3 py-1 rounded-xl bg-red-950/40 border border-red-500/40">
                      <span className="font-arabic text-rose-300 font-extrabold text-sm">أهل البيت</span>
                      <div className="w-8 h-4 rounded-md bg-gradient-to-r from-red-600 to-rose-600 border border-red-300" />
                      <span className="text-rose-200">{isBn ? 'আহলে বাইত' : 'Ahl al-Bayt'}</span>
                    </div>

                    <div className="flex items-center justify-between gap-3 px-3 py-1 rounded-xl bg-emerald-950/40 border border-emerald-500/40">
                      <span className="font-arabic text-emerald-300 font-extrabold text-sm">صحابي</span>
                      <div className="w-8 h-4 rounded-md bg-gradient-to-r from-emerald-600 to-green-600 border border-emerald-300" />
                      <span className="text-emerald-200">{isBn ? 'সাহাবি (রা.)' : 'Sahabi (RA)'}</span>
                    </div>

                    <div className="flex items-center justify-between gap-3 px-3 py-1 rounded-xl bg-sky-950/40 border border-sky-500/40">
                      <span className="font-arabic text-sky-300 font-extrabold text-sm">تابعي</span>
                      <div className="w-8 h-4 rounded-md bg-gradient-to-r from-cyan-600 to-blue-600 border border-cyan-300" />
                      <span className="text-sky-200">{isBn ? 'তাবেয়ী (রহ.)' : 'Tabi\'i (RH)'}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 3. INTERMARRIAGES HIGHLIGHTS VIEW */}
      {activeViewMode === 'marriages' && (
        <div className={`p-5 sm:p-6 rounded-3xl border shadow-xl ${
          isDay ? 'bg-amber-50/70 border-amber-200' : 'bg-[#0a1820] border-amber-500/25'
        }`}>
          <h3 className={`text-base sm:text-lg font-black flex items-center gap-2 mb-4 ${
            isDay ? 'text-amber-900' : 'text-amber-400'
          }`}>
            <span>💍</span>
            <span>{isBn ? 'সাহাবি ও আহলে বাইতের ঐতিহাসিক ৪টি মহতী বিবাহ বন্ধন:' : '4 Major Historical Intermarriages of Sahaba & Ahl al-Bayt:'}</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {INTERMARRIAGE_HIGHLIGHTS.map((item, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border space-y-2 shadow-sm transition ${
                  isDay ? 'bg-white border-amber-200/90' : 'bg-[#081e26] border-teal-800/50'
                }`}
              >
                <h4 className={`text-sm sm:text-base font-black flex items-center gap-2 ${
                  isDay ? 'text-emerald-950' : 'text-emerald-300'
                }`}>
                  <span className="text-lg">{item.icon}</span>
                  <span>{isBn ? item.titleBn : item.titleEn}</span>
                </h4>
                <p className={`text-xs sm:text-sm leading-relaxed font-medium ${
                  isDay ? 'text-slate-800' : 'text-slate-200'
                }`}>
                  {isBn ? item.descBn : item.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. FAMILY TREE LIST VIEW WITH DYNAMIC LANGUAGE SEARCH */}
      {activeViewMode === 'tree' && (
        <div className="space-y-5">
          {/* Search Bar */}
          <div className={`p-3 rounded-2xl border shadow-md ${
            isDay ? 'bg-white border-slate-200' : 'bg-[#081c22] border-[#133f4a]'
          }`}>
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isBn ? "বংশলতিকায় খুঁজুন (যেমন: ফাতিমা, হাসান, হুসাইন, আয়েশা, উমর, আলী)..." : "Search in genealogy (e.g. Fatima, Hasan, Hussein, Aisha, Umar, Ali)..."}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-colors outline-none ${
                  isDay
                    ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-emerald-500'
                    : 'bg-[#041216] border-teal-800/60 text-white placeholder-slate-400 focus:border-teal-400'
                }`}
              />
            </div>
          </div>

          <div className="space-y-6">
            {filteredBranches.map((branch) => {
              const branchTitle = isBn ? branch.titleBn : branch.titleEn;
              const branchDesc = isBn ? branch.descriptionBn : branch.descriptionEn;

              return (
                <div
                  key={branch.id}
                  className={`p-4 sm:p-6 rounded-3xl border shadow-xl relative overflow-hidden ${
                    isDay
                      ? 'bg-white border-slate-200 text-slate-900 shadow-slate-200/60'
                      : 'bg-[#06191f] border-[#133d48] text-white shadow-black/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5 pb-3 mb-4 border-b border-black/10 dark:border-white/10">
                    <span className="text-2xl sm:text-3xl shrink-0 p-2 rounded-2xl bg-amber-500/15 border border-amber-500/30">
                      {branch.icon}
                    </span>
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-amber-700 dark:text-amber-400 tracking-tight">
                        {branchTitle}
                      </h3>
                      <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                        {branchDesc}
                      </p>
                    </div>
                  </div>

                  {/* Head Person Render */}
                  <div className="p-4 rounded-2xl border bg-amber-500/10 border-amber-500/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-black text-amber-800 dark:text-amber-300">
                        {isBn ? branch.headPerson.nameBn : branch.headPerson.nameEn} ({branch.headPerson.nameAr})
                      </h4>
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300">
                        {isBn ? branch.headPerson.relationNoteBn : branch.headPerson.relationNoteEn}
                      </span>
                    </div>

                    {/* Sub Children List */}
                    {branch.headPerson.children && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-2">
                        {branch.headPerson.children.map((child) => {
                          const childName = isBn ? child.nameBn : child.nameEn;
                          const roleLabel = child.role === 'ahl_al_bayt' ? (isBn ? 'আহলে বাইত' : 'Ahl al-Bayt') : child.role === 'sahabi' ? (isBn ? 'সাহাবি' : 'Sahabi') : (isBn ? 'তাবেয়ী' : 'Tabi\'i');
                          return (
                            <div
                              key={child.id}
                              onClick={() => setSelectedPersonModal(child)}
                              className="p-2.5 rounded-xl border bg-black/20 hover:bg-black/30 cursor-pointer transition flex items-center justify-between gap-2"
                            >
                              <div>
                                <div className="text-xs font-bold text-white">{childName}</div>
                                <div className="text-[10px] font-arabic text-amber-300">{child.nameAr}</div>
                              </div>
                              <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-600 text-white font-bold shrink-0">
                                {roleLabel}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. PERSON DETAILS POPUP MODAL (100% DYNAMIC LANGUAGE) */}
      {selectedPersonModal && (
        <div 
          onClick={() => setSelectedPersonModal(null)}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-lg max-h-[92vh] sm:max-h-[88vh] overflow-y-auto p-5 sm:p-6 rounded-t-3xl sm:rounded-3xl border shadow-2xl space-y-4 relative ${
              isDay ? 'bg-white border-amber-300 text-slate-900' : 'bg-[#091f26] border-amber-500/40 text-white'
            }`}
          >
            <button
              type="button"
              onClick={() => setSelectedPersonModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition cursor-pointer"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>

            <div className="flex items-center gap-2">
              <span className="text-2xl">✨</span>
              <div>
                <h3 className="text-lg font-black text-amber-700 dark:text-amber-400">
                  {isBn ? selectedPersonModal.nameBn : selectedPersonModal.nameEn}
                </h3>
                <span className="text-sm font-arabic font-bold text-amber-500/90 dir-rtl block">
                  {selectedPersonModal.nameAr}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs font-medium pt-2 border-t border-black/10 dark:border-white/10">
              {(selectedPersonModal.relationNoteBn || selectedPersonModal.relationNoteEn) && (
                <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 font-bold">
                  🏷️ {isBn ? selectedPersonModal.relationNoteBn : selectedPersonModal.relationNoteEn}
                </div>
              )}

              {(selectedPersonModal.spouseBn || selectedPersonModal.spouseEn) && (
                <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-800 dark:text-rose-300 font-bold">
                  💍 {isBn ? 'বিবাহ:' : 'Married:'} {isBn ? selectedPersonModal.spouseBn : selectedPersonModal.spouseEn}
                </div>
              )}

              {(selectedPersonModal.detailsBn || selectedPersonModal.detailsEn) && (
                <p className="leading-relaxed italic pt-1">
                  "{isBn ? selectedPersonModal.detailsBn : selectedPersonModal.detailsEn}"
                </p>
              )}
            </div>

            {selectedPersonModal.sahabaId && onSelectSahabaBio && (
              <button
                type="button"
                onClick={() => {
                  if (onSelectSahabaBio && selectedPersonModal.sahabaId) {
                    onSelectSahabaBio(selectedPersonModal.sahabaId);
                    setSelectedPersonModal(null);
                  }
                }}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                <BookOpen className="w-4 h-4" />
                <span>{isBn ? 'হায়াতুস সাহাবাতে পূর্ণাঙ্গ জীবনী পড়ুন' : 'Read Full Biography in Hayatus Sahaba'}</span>
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

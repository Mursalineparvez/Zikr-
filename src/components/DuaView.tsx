import React, { useState, useEffect } from 'react';
import { AUTHENTIC_DUAS } from '../utils/duasData';
import { DuaCategory, DuaItem, ZikrItem, ThemeMode, ZikrLanguage } from '../types';
import { DUA_TRANSLATIONS, DUA_CATEGORIES, DUA_UI } from '../utils/appTranslations';
import { Search, Plus, Copy, Check, Sparkles, BookOpen, Volume2, Bookmark, CheckCircle2, Moon, Sun, Shield, Heart, Droplet, Home, Compass, Coffee, Users, CloudRain, AlertCircle, ArrowLeft } from 'lucide-react';
import { soundHaptics, playArabicVoice, VoiceGender } from '../utils/audioHaptics';

interface DuaViewProps {
  onAddDuaToCounters: (dua: DuaItem) => void;
  activeCounters: ZikrItem[];
  soundEnabled: boolean;
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
  voiceGender?: VoiceGender;
}

export const DuaView: React.FC<DuaViewProps> = ({
  onAddDuaToCounters,
  activeCounters,
  soundEnabled,
  themeMode = 'night',
  selectedLanguage = 'bn',
  voiceGender = 'male',
}) => {
  const isDay = themeMode === 'day';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [inlineCounts, setInlineCounts] = useState<{ [key: string]: number }>({});

  // Auto-scroll to top when category changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [selectedCategory]);

  // GTAF-style category definitions with icons & colors
  const gtafCategories = [
    {
      id: 'all',
      titleBn: 'সকল দোয়া ও জিকির',
      titleEn: 'All Supplications',
      icon: BookOpen,
      color: 'from-emerald-600 to-teal-700',
      textColor: 'text-emerald-500',
      bgLight: 'bg-emerald-50 border-emerald-200',
      bgDark: 'bg-[#0f333a] border-[#185560]',
    },
    {
      id: 'morning_evening',
      titleBn: 'সকাল - সন্ধ্যা',
      titleEn: 'Morning & Evening',
      icon: Sun,
      color: 'from-amber-500 to-orange-600',
      textColor: 'text-amber-500',
      bgLight: 'bg-amber-50 border-amber-200',
      bgDark: 'bg-[#332714] border-[#59431f]',
    },
    {
      id: 'sleep_wake',
      titleBn: 'ঘুম ও জাগরণ',
      titleEn: 'Sleep & Awakening',
      icon: Moon,
      color: 'from-indigo-600 to-purple-700',
      textColor: 'text-indigo-400',
      bgLight: 'bg-indigo-50 border-indigo-200',
      bgDark: 'bg-[#1a1f3a] border-[#2b3566]',
    },
    {
      id: 'salat',
      titleBn: 'সালাত ও পবিত্রতা',
      titleEn: 'Salat & Wudu',
      icon: Compass,
      color: 'from-teal-600 to-emerald-700',
      textColor: 'text-teal-400',
      bgLight: 'bg-teal-50 border-teal-200',
      bgDark: 'bg-[#0e3630] border-[#175c50]',
    },
    {
      id: 'protection',
      titleBn: 'আশ্রয় প্রার্থনা',
      titleEn: 'Protection & Refuge',
      icon: Shield,
      color: 'from-sky-600 to-blue-700',
      textColor: 'text-sky-400',
      bgLight: 'bg-sky-50 border-sky-200',
      bgDark: 'bg-[#112d3b] border-[#1c4b62]',
    },
    {
      id: 'forgiveness',
      titleBn: 'ক্ষমা ও তওবা',
      titleEn: 'Forgiveness & Repentance',
      icon: Sparkles,
      color: 'from-rose-600 to-pink-700',
      textColor: 'text-rose-400',
      bgLight: 'bg-rose-50 border-rose-200',
      bgDark: 'bg-[#38161d] border-[#612733]',
    },
    {
      id: 'hardship',
      titleBn: 'কষ্ট ও মুসিবত',
      titleEn: 'Hardship & Debt',
      icon: AlertCircle,
      color: 'from-orange-600 to-amber-700',
      textColor: 'text-orange-400',
      bgLight: 'bg-orange-50 border-orange-200',
      bgDark: 'bg-[#362211] border-[#5e3b1c]',
    },
    {
      id: 'daily_living',
      titleBn: 'রিজিক, পরিবার ও সফর',
      titleEn: 'Rizq, Family & Travel',
      icon: Home,
      color: 'from-emerald-700 to-green-800',
      textColor: 'text-green-400',
      bgLight: 'bg-green-50 border-green-200',
      bgDark: 'bg-[#133623] border-[#20593b]',
    },
    {
      id: 'quran',
      titleBn: 'কুরআন ও জিকির',
      titleEn: 'Quran & Zikr',
      icon: Heart,
      color: 'from-teal-700 to-cyan-800',
      textColor: 'text-cyan-400',
      bgLight: 'bg-cyan-50 border-cyan-200',
      bgDark: 'bg-[#10343f] border-[#1b586b]',
    },
  ];

  // Filter duas
  const filteredDuas = AUTHENTIC_DUAS.filter((dua) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      dua.category === selectedCategory ||
      (selectedCategory === 'morning_evening' && dua.category.includes('morning'));

    const t = DUA_TRANSLATIONS[dua.id]?.[selectedLanguage];
    const curTitle = t?.title || dua.title;
    const curTrans = t?.translation || dua.translation;
    const curVirtue = t?.virtue || dua.virtue || '';

    const matchesSearch =
      curTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      curTrans.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dua.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dua.translation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dua.transliteration.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dua.arabic.includes(searchQuery) ||
      curVirtue.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleInlineIncrement = (duaId: string, targetCount: number = 33) => {
    if (soundEnabled) soundHaptics.playTap();
    soundHaptics.vibrate(35);

    setInlineCounts((prev) => {
      const current = prev[duaId] || 0;
      const next = current + 1;
      if (next === targetCount && soundEnabled) {
        soundHaptics.playMilestone();
      }
      return { ...prev, [duaId]: next };
    });
  };

  const handleCopyDua = (dua: DuaItem) => {
    const t = DUA_TRANSLATIONS[dua.id]?.[selectedLanguage];
    const curTitle = t?.title || dua.title;
    const curTrans = t?.translation || dua.translation;
    const text = `${curTitle}\n\n${dua.arabic}\n\n${dua.transliteration}\n\n"${curTrans}"\n\nReference: ${dua.reference}`;
    navigator.clipboard.writeText(text);
    setCopiedId(dua.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const currentCatObj = gtafCategories.find((c) => c.id === selectedCategory);

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16">
      {/* GTAF Portal Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#005a3e] via-[#114b4f] to-[#1c646b] border border-teal-400/30 p-6 sm:p-8 shadow-2xl text-white">
        <div className="absolute -right-6 -bottom-6 opacity-10 pointer-events-none">
          <BookOpen className="w-64 h-64 text-white" />
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/25 text-teal-100 text-xs font-semibold mb-3 backdrop-blur-md shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>حِصْنُ الْمُسْلِمِ • Fortress of the Muslim (GTAF Portal)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-md">
            {selectedLanguage === 'bn' ? 'দোয়া ও জিকির সংগ্রহশালা (হিসনুল মুসলিম)' : 'Authentic Supplications & Azkar'}
          </h2>
          <p className="text-xs sm:text-sm text-teal-100 mt-2 max-w-2xl leading-relaxed">
            {selectedLanguage === 'bn' 
              ? 'পবিত্র কুরআন ও সহিহ হাদিস থেকে সংকলিত জীবনঘনিষ্ঠ সকল দোয়া, জিকির ও আমলসমূহ সঠিক উচ্চারণ ও অর্থসহ।' 
              : 'Authentic prophetic duas and azkar categorized step-by-step for daily spiritual protection and remembrance.'}
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${isDay ? 'text-teal-700' : 'text-teal-400'}`} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={selectedLanguage === 'bn' ? 'দোয়া বা আমল খুঁজুন (যেমন: ঘুম, সকাল, রিজিক, ক্ষমা)...' : 'Search duas by title, arabic, or translation...'}
          className={`w-full rounded-2xl pl-11 pr-4 py-3.5 text-sm font-medium focus:outline-none transition shadow-sm border ${
            isDay
              ? 'bg-white border-teal-200 text-[#0f3630] placeholder-teal-600/70 focus:border-[#006747]'
              : 'bg-[#0f2e35] border-[#184c56] text-white placeholder-slate-400 focus:border-emerald-500'
          }`}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-teal-500 hover:text-teal-400 cursor-pointer"
          >
            Clear
          </button>
        )}
      </div>

      {/* GTAF Category Grid Dashboard */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className={`text-sm sm:text-base font-bold flex items-center gap-2 ${isDay ? 'text-[#0f3630]' : 'text-emerald-100'}`}>
            <BookOpen className="w-4 h-4 text-emerald-500" />
            <span>{selectedLanguage === 'bn' ? 'দোয়ার ক্যাটাগরি ও বিষয়সমূহ (GTAF Style)' : 'Supplication Categories'}</span>
          </h3>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-xs font-bold text-emerald-500 hover:text-emerald-400 flex items-center gap-1 cursor-pointer bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{selectedLanguage === 'bn' ? 'সব ক্যাটাগরি দেখুন' : 'View All'}</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {gtafCategories.map((cat) => {
            const IconComp = cat.icon;
            const isSelected = selectedCategory === cat.id;
            const count = cat.id === 'all' 
              ? AUTHENTIC_DUAS.length 
              : AUTHENTIC_DUAS.filter(d => d.category === cat.id || (cat.id === 'morning_evening' && d.category.includes('morning'))).length;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-4 rounded-3xl border transition-all duration-200 text-left flex flex-col justify-between gap-3 cursor-pointer active:scale-95 group ${
                  isSelected
                    ? 'ring-2 ring-emerald-500 shadow-lg ' + (isDay ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-emerald-700 text-white border-emerald-500')
                    : isDay
                    ? 'bg-white hover:bg-teal-50/80 border-teal-100 shadow-sm text-[#0f3630]'
                    : 'bg-[#0e2c33] hover:bg-[#143c46] border-[#184d57] text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className={`p-2.5 rounded-2xl ${
                    isSelected 
                      ? 'bg-white/20 text-white' 
                      : isDay 
                      ? 'bg-teal-50 text-emerald-600 group-hover:bg-emerald-100' 
                      : 'bg-[#153f4a] text-emerald-400 group-hover:bg-[#1c5462]'
                  }`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : isDay ? 'bg-teal-100/60 text-emerald-800' : 'bg-[#154652] text-teal-300'
                  }`}>
                    {count}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm tracking-tight line-clamp-1">
                    {selectedLanguage === 'bn' ? cat.titleBn : cat.titleEn}
                  </h4>
                  <p className={`text-[11px] mt-0.5 opacity-80 line-clamp-1 ${isSelected ? 'text-teal-100' : isDay ? 'text-teal-800' : 'text-teal-300'}`}>
                    {selectedLanguage === 'bn' ? cat.titleEn : cat.titleBn}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Category Indicator & Duas List */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <h3 className={`text-base font-bold ${isDay ? 'text-[#0f3630]' : 'text-white'}`}>
              {currentCatObj ? (selectedLanguage === 'bn' ? currentCatObj.titleBn : currentCatObj.titleEn) : 'Duas'}
              <span className="text-xs font-semibold ml-2 text-emerald-500">({filteredDuas.length} {selectedLanguage === 'bn' ? 'টি দোয়া' : 'Duas'})</span>
            </h3>
          </div>
        </div>

        {filteredDuas.length === 0 ? (
          <div className={`p-12 text-center rounded-3xl border ${
            isDay ? 'bg-white border-teal-100 text-teal-800' : 'bg-[#0f2e35] border-[#184c56] text-slate-300'
          }`}>
            <BookOpen className="w-12 h-12 mx-auto text-emerald-500 mb-3 opacity-60" />
            <p className="text-sm font-bold">{selectedLanguage === 'bn' ? 'কোনো দোয়া পাওয়া যায়নি' : 'No supplications found'}</p>
            <p className="text-xs mt-1 text-slate-400">{selectedLanguage === 'bn' ? 'অন্য কীওয়ার্ড দিয়ে আবার চেষ্টা করুন' : 'Try searching with another keyword or category'}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredDuas.map((dua, index) => {
              const isAdded = activeCounters.some(
                (c) => c.name.toLowerCase() === dua.title.toLowerCase() || c.id === dua.id
              );
              const currentCount = inlineCounts[dua.id] || 0;
              const target = dua.suggestedCount || 33;
              const isCompleted = currentCount >= target;

              const t = DUA_TRANSLATIONS[dua.id]?.[selectedLanguage];
              const currentTitle = t?.title || dua.title;
              const currentTiming = t?.timing || dua.timing;
              const currentTranslation = t?.translation || dua.translation;
              const currentVirtue = t?.virtue || dua.virtue;

              return (
                <div
                  key={dua.id}
                  className={`p-5 sm:p-7 rounded-3xl border transition-all duration-200 shadow-md ${
                    isDay
                      ? isCompleted
                        ? 'bg-white border-amber-400/80 shadow-amber-500/10'
                        : 'bg-white border-teal-100 shadow-teal-900/5'
                      : isCompleted
                      ? 'bg-[#0f2e35] border-amber-500/70 shadow-amber-950/30'
                      : 'bg-[#0f2e35] border-[#184d57] shadow-black/40'
                  }`}
                >
                  <div className={`flex items-start justify-between gap-3 pb-3 mb-3 border-b ${
                    isDay ? 'border-teal-50' : 'border-[#174852]'
                  }`}>
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                        isDay ? 'bg-emerald-100 text-emerald-800' : 'bg-[#154852] text-emerald-300'
                      }`}>
                        {index + 1}
                      </span>
                      <div>
                        <h4 className={`text-sm sm:text-base font-bold ${isDay ? 'text-[#0f3630]' : 'text-white'}`}>
                          {currentTitle}
                        </h4>
                        {currentTiming && (
                          <span className={`text-xs font-semibold mt-0.5 block ${isDay ? 'text-emerald-600' : 'text-emerald-400'}`}>
                            {currentTiming}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-2">
                      {/* Audio Voice Button */}
                      <button
                        onClick={() => {
                          if (soundEnabled) soundHaptics.playTap();
                          playArabicVoice(dua.arabic, voiceGender);
                        }}
                        className={`p-2 rounded-xl transition active:scale-90 cursor-pointer flex items-center justify-center border shadow-sm ${
                          isDay
                            ? 'bg-[#006747] hover:bg-[#00553a] text-white border-[#006747]'
                            : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 border-emerald-400'
                        }`}
                        title={selectedLanguage === 'bn' ? 'অডিও শুনুন (Recite Audio)' : 'Play Audio Recitation'}
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>

                      {/* Copy Button */}
                      <button
                        onClick={() => handleCopyDua(dua)}
                        className={`p-2 rounded-xl transition active:scale-90 cursor-pointer border shadow-sm ${
                          isDay
                            ? 'bg-teal-50 hover:bg-teal-100 text-teal-800 border-teal-200'
                            : 'bg-[#113a44] hover:bg-[#184d57] text-teal-200 border-[#1c5563]'
                        }`}
                        title="Copy Dua"
                      >
                        {copiedId === dua.id ? (
                          <Check className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>

                      {/* Add to Counter */}
                      <button
                        onClick={() => onAddDuaToCounters(dua)}
                        disabled={isAdded}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition active:scale-95 cursor-pointer shadow-sm ${
                          isAdded
                            ? isDay
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-[#113a44] text-emerald-400 border border-[#1c5563]'
                            : 'bg-[#006747] hover:bg-[#00553a] text-white shadow-md'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{DUA_UI.inCounter[selectedLanguage]}</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                            <span>{DUA_UI.addToCounter[selectedLanguage]}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Arabic Text */}
                  <div
                    dir="rtl"
                    className={`text-right font-arabic font-bold text-xl sm:text-2xl leading-[2.2] my-4 select-none ${
                      isDay ? 'text-[#063327]' : 'text-emerald-100'
                    }`}
                  >
                    {dua.arabic}
                  </div>

                  {/* Transliteration */}
                  <div className={`text-xs sm:text-sm font-semibold mb-2 ${
                    isDay ? 'text-emerald-700' : 'text-emerald-300'
                  }`}>
                    {dua.transliteration}
                  </div>

                  {/* Translation */}
                  <p className={`text-xs sm:text-sm leading-relaxed font-sans mb-4 font-medium ${
                    isDay ? 'text-slate-800' : 'text-teal-100'
                  }`}>
                    "{currentTranslation}"
                  </p>

                  {/* Virtue & Reference footer */}
                  <div className={`pt-3 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                    isDay ? 'border-teal-50 text-teal-800' : 'border-[#174852] text-teal-300'
                  }`}>
                    <span className={`font-semibold ${isDay ? 'text-emerald-700' : 'text-emerald-400'}`}>
                      📌 {dua.reference}
                    </span>

                    {/* Inline Bead Counter */}
                    <div className="flex items-center gap-2">
                      <span className="text-[11px]">
                        {DUA_UI.recited[selectedLanguage]}: <strong className={isDay ? 'text-[#0f3630]' : 'text-white'}>{currentCount}</strong> / {target}x
                      </span>
                      <button
                        onClick={() => handleInlineIncrement(dua.id, target)}
                        className="px-3 py-1 rounded-xl bg-[#006747] hover:bg-[#00553a] text-white font-bold text-xs active:scale-95 transition cursor-pointer flex items-center gap-1 shadow-sm"
                      >
                        <span>{DUA_UI.oneBead[selectedLanguage]}</span>
                      </button>
                    </div>
                  </div>

                  {currentVirtue && (
                    <div className={`mt-3 p-3 rounded-2xl border text-xs flex items-start gap-2.5 ${
                      isDay
                        ? 'bg-teal-50/70 border-teal-200 text-teal-900'
                        : 'bg-[#113943] border-[#185360] text-teal-200'
                    }`}>
                      <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{currentVirtue}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

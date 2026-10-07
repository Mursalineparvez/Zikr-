import React, { useState, useEffect } from 'react';
import { AUTHENTIC_DUAS } from '../utils/duasData';
import { DuaCategory, DuaItem, ZikrItem, ThemeMode, ZikrLanguage } from '../types';
import { DUA_TRANSLATIONS, DUA_CATEGORIES, DUA_UI } from '../utils/appTranslations';
import { Search, Plus, Copy, Check, Sparkles, BookOpen, Volume2, Bookmark, CheckCircle2 } from 'lucide-react';
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

  // Auto-scroll to top when category changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [selectedCategory]);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [inlineCounts, setInlineCounts] = useState<{ [key: string]: number }>({});

  const categories = [
    { id: 'all', label: DUA_CATEGORIES.all[selectedLanguage] },
    { id: 'morning_evening', label: DUA_CATEGORIES.morning_evening[selectedLanguage] },
    { id: 'salat', label: DUA_CATEGORIES.salat[selectedLanguage] },
    { id: 'sleep_wake', label: DUA_CATEGORIES.sleep_wake[selectedLanguage] },
    { id: 'protection', label: DUA_CATEGORIES.protection[selectedLanguage] },
    { id: 'forgiveness', label: DUA_CATEGORIES.forgiveness[selectedLanguage] },
    { id: 'hardship', label: DUA_CATEGORIES.hardship[selectedLanguage] },
    { id: 'daily_living', label: DUA_CATEGORIES.daily_living[selectedLanguage] },
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

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Dua Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#005a3e] via-[#1a5e64] to-[#257277] border border-teal-400/30 p-5 sm:p-6 shadow-xl text-white">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-teal-100 text-xs font-semibold mb-2 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>الأدعية المأثورة • Prophetic Supplications</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight drop-shadow-sm">
            {DUA_UI.bannerTitle[selectedLanguage]}
          </h2>
          <p className="text-xs sm:text-sm text-teal-100 mt-1 max-w-xl">
            {DUA_UI.bannerSub[selectedLanguage]}
          </p>
        </div>
      </div>

      {/* Search and Category Filter */}
      <div className="space-y-3">
        <div className="relative">
          <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${isDay ? 'text-[#507579]' : 'text-slate-400'}`} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={DUA_UI.searchPlaceholder[selectedLanguage]}
            className={`w-full rounded-2xl pl-11 pr-4 py-3 text-sm focus:outline-none transition shadow-sm border ${
              isDay
                ? 'bg-white border-[#d2ece9] text-[#103e42] placeholder-[#709598] focus:border-[#006747]'
                : 'bg-[#0e2f36] border-[#1a515c] text-white placeholder-slate-400 focus:border-[#10b981]'
            }`}
          />
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-2xl text-xs font-bold whitespace-nowrap transition active:scale-95 cursor-pointer border ${
                  isActive
                    ? isDay
                      ? 'bg-[#006747] text-white border-[#006747] shadow-md shadow-[#135d66]/20'
                      : 'bg-[#006747] text-white border-teal-400/50 shadow-md'
                    : isDay
                    ? 'bg-[#e6f3f2] hover:bg-[#d8ece9] text-[#2d6a70] border-[#d2ece9]'
                    : 'bg-[#0a262c] hover:bg-[#10343c] text-[#94a3b8] border-[#184850]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Duas Cards Grid */}
      <div className="space-y-4">
        {filteredDuas.map((dua) => {
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
              className={`p-5 sm:p-6 rounded-3xl border transition-all duration-200 ${
                isDay
                  ? isCompleted
                    ? 'bg-white border-amber-400/70 shadow-amber-500/10'
                    : 'bg-white border-[#dcebe8] shadow-[#135d66]/5'
                  : isCompleted
                  ? 'bg-[#0e2f36] border-amber-500/70 shadow-amber-950/20'
                  : 'bg-[#0e2f36] border-[#1a515c] shadow-[#082024]/60'
              }`}
            >
              <div className={`flex items-start justify-between gap-3 pb-3 mb-3 border-b ${
                isDay ? 'border-[#e8f3f1]' : 'border-[#17434b]'
              }`}>
                <div>
                  <h3 className={`text-base sm:text-lg font-bold ${isDay ? 'text-[#103e42]' : 'text-white'}`}>
                    {currentTitle}
                  </h3>
                  {currentTiming && (
                    <span className={`text-xs font-semibold mt-0.5 block ${isDay ? 'text-[#006747]' : 'text-[#10b981]'}`}>
                      {currentTiming}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2">
                  {/* Audio Recitation Voice Button (Icon only with voice sign) */}
                  <button
                    onClick={() => {
                      if (soundEnabled) soundHaptics.playTap();
                      playArabicVoice(dua.arabic, voiceGender);
                    }}
                    className={`p-2 rounded-xl transition active:scale-90 cursor-pointer flex items-center justify-center border ${
                      isDay
                        ? 'bg-[#006747] hover:bg-[#00553a] text-white border-[#006747]'
                        : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 border-emerald-400'
                    }`}
                    title={voiceGender === 'female' ? 'Play Audio (নারী কণ্ঠে)' : 'Play Audio (পুরুষ কণ্ঠে)'}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>

                  {/* Copy Button */}
                  <button
                    onClick={() => handleCopyDua(dua)}
                    className={`p-2 rounded-xl transition active:scale-90 cursor-pointer border ${
                      isDay
                        ? 'bg-[#f0f7f6] hover:bg-[#e2f1f0] text-[#507579] border-[#d0e6e3]'
                        : 'bg-[#092226] hover:bg-[#10343c] text-[#94a3b8] border-[#133c44]'
                    }`}
                    title="Copy Dua"
                  >
                    {copiedId === dua.id ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>

                  {/* Add to Counters Button */}
                  <button
                    onClick={() => onAddDuaToCounters(dua)}
                    disabled={isAdded}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition active:scale-95 cursor-pointer ${
                      isAdded
                        ? isDay
                          ? 'bg-[#e2edea] text-[#006747] border border-[#cbe0dc]'
                          : 'bg-[#092226] text-[#10b981] border border-[#133c44]'
                        : 'bg-[#006747] hover:bg-[#154f53] text-white shadow-md shadow-[#135d66]/20'
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

              {/* Arabic Script */}
              <div
                dir="rtl"
                className={`text-right font-arabic font-bold text-xl sm:text-2xl leading-loose my-3 select-none ${
                  isDay ? 'text-[#063327]' : 'text-emerald-100'
                }`}
              >
                {dua.arabic}
              </div>

              {/* Transliteration */}
              <div className={`text-xs sm:text-sm font-semibold mb-2 ${
                isDay ? 'text-[#15803d]' : 'text-emerald-300'
              }`}>
                {dua.transliteration}
              </div>

              {/* Translation */}
              <p className={`text-xs sm:text-sm leading-relaxed font-sans mb-3 font-medium ${
                isDay ? 'text-[#1e293b]' : 'text-[#c0dbde]'
              }`}>
                "{currentTranslation}"
              </p>

              {/* Virtue & Reference */}
              <div className={`pt-3 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                isDay ? 'border-[#e8f3f1] text-[#507579]' : 'border-[#17434b] text-[#94a3b8]'
              }`}>
                <span className={`font-semibold ${isDay ? 'text-[#006747]' : 'text-[#10b981]'}`}>
                  {dua.reference}
                </span>

                {/* Inline Quick Repetition Bead */}
                <div className="flex items-center gap-2">
                  <span className="text-[11px]">
                    {DUA_UI.recited[selectedLanguage]}: <strong className={isDay ? 'text-[#103e42]' : 'text-white'}>{currentCount}</strong> / {target}x
                  </span>
                  <button
                    onClick={() => handleInlineIncrement(dua.id, target)}
                    className="px-3 py-1 rounded-xl bg-[#006747] hover:bg-[#154f53] text-white font-bold text-xs active:scale-95 transition cursor-pointer flex items-center gap-1 shadow-sm"
                  >
                    <span>{DUA_UI.oneBead[selectedLanguage]}</span>
                  </button>
                </div>
              </div>

              {currentVirtue && (
                <div className={`mt-3 p-3 rounded-2xl border text-xs flex items-start gap-2 ${
                  isDay
                    ? 'bg-[#eef7f6] border-[#d0e6e3] text-[#006747]'
                    : 'bg-[#092226] border-[#133c44] text-[#94a3b8]'
                }`}>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{currentVirtue}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

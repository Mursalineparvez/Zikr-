import React, { useState, useMemo } from 'react';
import { ALLAH_99_NAMES, AllahNameItem } from '../data/allahNamesData';
import { ThemeMode, ZikrLanguage } from '../types';
import {
  Search,
  Sparkles,
  Volume2,
  Check,
  Award,
} from 'lucide-react';
import { soundHaptics } from '../utils/audioHaptics';
import { ALLAH_NAMES_UI } from '../utils/appTranslations';

interface AllahNamesViewProps {
  soundEnabled: boolean;
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
}

export const AllahNamesView: React.FC<AllahNamesViewProps> = ({
  soundEnabled,
  themeMode = 'night',
  selectedLanguage = 'bn',
}) => {
  const isDay = themeMode === 'day';
  const [searchQuery, setSearchQuery] = useState('');
  const [memorizedMap, setMemorizedMap] = useState<Record<number, boolean>>(() => {
    try {
      const saved = localStorage.getItem('zikrmate_allah_names_memorized');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleMemorized = (id: number) => {
    setMemorizedMap((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('zikrmate_allah_names_memorized', JSON.stringify(next));
      } catch {}
      return next;
    });
    if (soundEnabled) soundHaptics.playMilestone();
  };

  const filteredNames = useMemo(() => {
    if (!searchQuery.trim()) return ALLAH_99_NAMES;
    const q = searchQuery.toLowerCase().trim();
    return ALLAH_99_NAMES.filter(
      (item) =>
        item.nameBn.toLowerCase().includes(q) ||
        item.transliteration.toLowerCase().includes(q) ||
        item.arabic.includes(q) ||
        item.meaningBn.toLowerCase().includes(q) ||
        item.meaningEn.toLowerCase().includes(q) ||
        String(item.id) === q
    );
  }, [searchQuery]);

  const memorizedCount = Object.values(memorizedMap).filter(Boolean).length;

  const handleSpeakName = (name: AllahNameItem) => {
    if (soundEnabled) soundHaptics.playTap();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(name.arabic);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Banner */}
      <div
        className={`p-5 sm:p-6 rounded-3xl border shadow-xl relative overflow-hidden ${
          isDay
            ? 'bg-gradient-to-r from-teal-700 via-emerald-700 to-teal-800 text-white border-teal-600/40'
            : 'bg-gradient-to-r from-[#0c2f35] via-[#12414a] to-[#1a5560] text-white border-[#1a535e]'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-teal-100 text-xs font-semibold mb-2 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>أَسْمَاءُ اللَّهِ الْحُسْنَى • 99 Beautiful Names of Allah</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              {ALLAH_NAMES_UI.bannerTitle[selectedLanguage]}
            </h2>
            <p className="text-xs sm:text-sm text-teal-100/90 mt-1 max-w-xl">
              {ALLAH_NAMES_UI.bannerSub[selectedLanguage]}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div
              className={`px-4 py-2.5 rounded-2xl border shadow-lg flex items-center gap-2.5 ${
                isDay
                  ? 'bg-white/95 text-slate-800 border-white'
                  : 'bg-[#092226] text-amber-300 border-amber-500/40'
              }`}
            >
              <Award className="w-5 h-5 text-amber-500" />
              <div>
                <div className="text-[10px] text-slate-400 font-bold uppercase">
                  {ALLAH_NAMES_UI.memorized[selectedLanguage]}
                </div>
                <div className="text-sm font-black font-mono text-emerald-600 dark:text-amber-300">
                  {memorizedCount} / 99
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Input */}
        <div className="mt-4 relative">
          <Search className="w-4 h-4 text-teal-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={ALLAH_NAMES_UI.searchPlaceholder[selectedLanguage]}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-black/25 border border-white/25 text-white placeholder-teal-200/60 text-xs focus:outline-none focus:ring-2 focus:ring-white/40"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-teal-200 hover:text-white"
            >
              {ALLAH_NAMES_UI.clear[selectedLanguage]}
            </button>
          )}
        </div>
      </div>

      {/* Grid of 99 Names */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredNames.map((name) => {
          const isMemorized = !!memorizedMap[name.id];
          return (
            <div
              key={name.id}
              className={`p-4 rounded-3xl border shadow-md transition-all relative overflow-hidden flex flex-col justify-between gap-3 ${
                isMemorized
                  ? isDay
                    ? 'bg-emerald-50/80 border-emerald-300'
                    : 'bg-[#092b30] border-emerald-500/50'
                  : isDay
                  ? 'bg-white border-slate-200 hover:border-emerald-400'
                  : 'bg-[#0a242a] border-[#16444e] hover:border-teal-500/50'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-black flex items-center justify-center">
                    {name.id}
                  </span>
                  <div>
                    <h3 className={`text-sm font-bold ${isDay ? 'text-slate-900' : 'text-white'}`}>
                      {selectedLanguage === 'en' ? name.transliteration : name.nameBn}
                    </h3>
                    <div className="text-[11px] text-slate-400 font-medium">
                      {name.transliteration}
                    </div>
                  </div>
                </div>

                {/* Arabic Calligraphy (Pure Arabic) */}
                <div className="text-right">
                  <div className="font-arabic text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400 leading-tight">
                    {name.arabic}
                  </div>
                </div>
              </div>

              {/* Meaning */}
              <div className="space-y-1 py-1">
                <div className={`text-xs font-semibold ${isDay ? 'text-slate-700' : 'text-slate-200'}`}>
                  {selectedLanguage === 'bn' ? name.meaningBn : name.meaningEn}
                </div>
                {selectedLanguage === 'bn' && (
                  <div className="text-[11px] text-slate-400 italic">
                    {name.meaningEn}
                  </div>
                )}
              </div>

              {/* Benefit / Fazilat Box */}
              <div
                className={`p-2.5 rounded-2xl text-[11px] ${
                  isDay ? 'bg-slate-50 text-slate-600' : 'bg-[#07191d] text-teal-200/90'
                }`}
              >
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {ALLAH_NAMES_UI.benefit[selectedLanguage]}
                </span>
                {name.benefitBn}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-teal-900/30">
                <button
                  onClick={() => handleSpeakName(name)}
                  className={`p-2 rounded-xl border text-xs flex items-center gap-1.5 transition active:scale-95 cursor-pointer ${
                    isDay
                      ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                      : 'bg-[#081f24] hover:bg-[#12363d] border-[#17464f] text-teal-200'
                  }`}
                  title="Arabic Audio"
                >
                  <Volume2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{ALLAH_NAMES_UI.pronunciation[selectedLanguage]}</span>
                </button>

                <button
                  onClick={() => toggleMemorized(name.id)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition active:scale-95 cursor-pointer ${
                    isMemorized
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                      : isDay
                      ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-600'
                      : 'bg-[#081f24] hover:bg-[#12363d] border-[#17464f] text-teal-300'
                  }`}
                >
                  <Check className={`w-3.5 h-3.5 ${isMemorized ? 'stroke-[3]' : ''}`} />
                  <span>
                    {isMemorized
                      ? ALLAH_NAMES_UI.memorizedBtn[selectedLanguage]
                      : ALLAH_NAMES_UI.memorizeBtn[selectedLanguage]}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

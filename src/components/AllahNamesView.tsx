import React, { useState, useMemo } from 'react';
import { ALLAH_99_NAMES, AllahNameItem } from '../data/allahNamesData';
import { ThemeMode, ZikrLanguage } from '../types';
import {
  Search,
  Sparkles,
  Volume2,
  Check,
  Award,
  X,
} from 'lucide-react';
import { soundHaptics, playArabicVoice, VoiceGender } from '../utils/audioHaptics';
import { ALLAH_NAMES_UI } from '../utils/appTranslations';
import { ContentShareModal, ShareDownloadButtons } from './ContentShareModal';
import { ShareableContent } from '../utils/shareDownload';

interface AllahNamesViewProps {
  soundEnabled: boolean;
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
  voiceGender?: VoiceGender;
}

export const AllahNamesView: React.FC<AllahNamesViewProps> = ({
  soundEnabled,
  themeMode = 'night',
  selectedLanguage = 'bn',
  voiceGender = 'male',
}) => {
  const isDay = themeMode === 'day';
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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

  const [shareState, setShareState] = useState<{
    content: ShareableContent;
    focus: 'share' | 'download';
  } | null>(null);

  const handleSpeakName = (name: AllahNameItem) => {
    if (soundEnabled) soundHaptics.playTap();
    playArabicVoice(name.arabic, voiceGender);
  };

  const openPageShare = (focus: 'share' | 'download') => {
    const isBn = selectedLanguage === 'bn';
    const fullDoc = filteredNames
      .map(
        (n) =>
          `${n.id}. ${n.arabic} — ${isBn ? n.nameBn : n.transliteration}\n` +
          `${isBn ? 'অর্থ' : 'Meaning'}: ${isBn ? n.meaningBn : n.meaningEn}\n` +
          `${isBn ? 'ফযীলত' : 'Virtue'}: ${isBn ? n.benefitBn : n.benefitEn || n.benefitBn}`
      )
      .join('\n\n');
    setShareState({
      focus,
      content: {
        badge: isBn ? 'আসমাউল হুসনা • ৯৯ নাম' : 'Asmaul Husna • 99 Names',
        title: ALLAH_NAMES_UI.bannerTitle[selectedLanguage],
        subtitle: ALLAH_NAMES_UI.bannerSub[selectedLanguage],
        arabic: 'وَلِلَّهِ الْأَسْمَاءُ الْحُسْنَىٰ فَادْعُوهُ بِهَا',
        body: isBn
          ? `মোট প্রদর্শিত নাম: ${filteredNames.length}টি | মুখস্থ সম্পন্ন: ${memorizedCount}/৯৯টি।\n\n${filteredNames
              .slice(0, 5)
              .map((n) => `${n.id}. ${n.arabic} (${n.nameBn}) — ${n.meaningBn}`)
              .join('\n')}`
          : `Displayed Names: ${filteredNames.length} | Memorized: ${memorizedCount}/99.\n\n${filteredNames
              .slice(0, 5)
              .map((n) => `${n.id}. ${n.arabic} (${n.transliteration}) — ${n.meaningEn}`)
              .join('\n')}`,
        fullDocumentText: fullDoc,
        fileNamePrefix: 'Asmaul-Husna',
      },
    });
  };

  const openNameShare = (name: AllahNameItem, focus: 'share' | 'download') => {
    const isBn = selectedLanguage === 'bn';
    const title = isBn ? name.nameBn : name.transliteration;
    const meaning = isBn ? name.meaningBn : name.meaningEn;
    const benefit = isBn ? name.benefitBn : name.benefitEn || name.benefitBn;
    setShareState({
      focus,
      content: {
        badge: `${isBn ? 'আল্লাহর নাম #' : 'Name #'}${name.id}`,
        title,
        subtitle: isBn ? `${name.transliteration} • ${name.meaningEn}` : name.meaningEn,
        arabic: name.arabic,
        body: `${isBn ? 'অর্থ:' : 'Meaning:'} ${meaning}\n\n${isBn ? 'ফযীলত ও আমল:' : 'Virtue & Practice:'} ${benefit}`,
        fileNamePrefix: `Allah-Name-${name.id}`,
      },
    });
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Simple Flat Allah Names Header */}
      <div
        className={`pb-4 border-b space-y-3 ${
          isDay ? 'border-[#dcebe8]' : 'border-[#163640]'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className={`flex items-center gap-2 text-xs font-bold ${isDay ? 'text-emerald-700' : 'text-emerald-300'}`}>
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span className="font-arabic">أَسْمَاءُ اللَّهِ الْحُسْنَى</span>
              <span className="opacity-40">•</span>
              <span>99 Beautiful Names of Allah</span>
            </div>
            <h2 className={`text-xl sm:text-2xl font-black tracking-tight ${isDay ? 'text-[#006747]' : 'text-white'}`}>
              {ALLAH_NAMES_UI.bannerTitle[selectedLanguage]}
            </h2>
            <p className={`text-xs sm:text-sm max-w-xl ${isDay ? 'text-slate-600' : 'text-slate-300'}`}>
              {ALLAH_NAMES_UI.bannerSub[selectedLanguage]}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <ShareDownloadButtons
              variant="card"
              selectedLanguage={selectedLanguage}
              themeMode={themeMode}
              onShare={() => openPageShare('share')}
              onDownload={() => openPageShare('download')}
            />
            <div
              className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 ${
                isDay
                  ? 'bg-white text-slate-800 border-slate-200'
                  : 'bg-[#0e1c26] text-amber-300 border-[#1a3342]'
              }`}
            >
              <Award className="w-4 h-4 text-amber-500" />
              <div className="flex items-center gap-1.5 text-xs">
                <span className={`font-bold ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                  {ALLAH_NAMES_UI.memorized[selectedLanguage]}:
                </span>
                <span className="font-black font-mono text-[#006747] dark:text-amber-300">
                  {memorizedCount} / 99
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                if (soundEnabled) soundHaptics.playTap();
                setIsSearchOpen((prev) => {
                  if (prev && searchQuery) setSearchQuery('');
                  return !prev;
                });
              }}
              className={`w-10 h-10 rounded-xl border flex items-center justify-center transition cursor-pointer active:scale-95 ${
                isSearchOpen || searchQuery
                  ? isDay
                    ? 'bg-[#006A4E] border-[#006A4E] text-white'
                    : 'bg-emerald-600 border-emerald-500 text-white'
                  : isDay
                  ? 'bg-white border-slate-200 text-slate-700 hover:border-emerald-400 hover:text-[#006A4E]'
                  : 'bg-[#0e1c26] border-[#1a3342] text-emerald-300 hover:border-emerald-500'
              }`}
              title={selectedLanguage === 'bn' ? 'খুঁজুন' : 'Search'}
              aria-label={selectedLanguage === 'bn' ? 'খুঁজুন' : 'Search'}
            >
              {isSearchOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Expandable Search Input */}
        {(isSearchOpen || searchQuery.trim().length > 0) && (
          <div className="relative animate-in fade-in duration-150">
            <Search className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${isDay ? 'text-slate-400' : 'text-emerald-300'}`} />
            <input
              type="text"
              autoFocus={isSearchOpen}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={ALLAH_NAMES_UI.searchPlaceholder[selectedLanguage]}
              className={`w-full pl-10 pr-10 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none ${
                isDay
                  ? 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-[#006747]'
                  : 'bg-[#0e1c26] border-[#1a3342] text-white placeholder-slate-400 focus:border-emerald-400'
              }`}
            />
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setIsSearchOpen(false);
              }}
              aria-label={ALLAH_NAMES_UI.clear[selectedLanguage]}
              className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 cursor-pointer ${
                isDay ? 'text-slate-400 hover:text-slate-700' : 'text-emerald-300 hover:text-white'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
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
                      {selectedLanguage === 'bn' ? name.nameBn : name.transliteration}
                    </h3>
                    <div className="text-[11px] text-slate-400 font-medium">
                      {selectedLanguage === 'bn' ? name.transliteration : name.meaningEn}
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
                  isDay ? 'bg-slate-50 text-slate-600' : 'bg-[#07191d] text-emerald-200/90'
                }`}
              >
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {ALLAH_NAMES_UI.benefit[selectedLanguage]}
                </span>
                {selectedLanguage === 'bn' ? name.benefitBn : (name.benefitEn || name.benefitBn)}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100 dark:border-teal-900/30">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleSpeakName(name)}
                    className={`p-2 rounded-xl border transition active:scale-95 cursor-pointer flex items-center justify-center ${
                      isDay
                        ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                        : 'bg-[#081f24] hover:bg-[#12363d] border-[#17464f] text-emerald-300'
                    }`}
                    title={selectedLanguage === 'bn' ? (voiceGender === 'female' ? 'অডিও শুনুন (নারী কণ্ঠে)' : 'অডিও শুনুন (পুরুষ কণ্ঠে)') : (voiceGender === 'female' ? 'Play Audio (Female Voice)' : 'Play Audio (Male Voice)')}
                  >
                    <Volume2 className="w-4 h-4 text-emerald-500" />
                  </button>
                  <ShareDownloadButtons
                    variant="compact"
                    selectedLanguage={selectedLanguage}
                    themeMode={themeMode}
                    onShare={() => openNameShare(name, 'share')}
                    onDownload={() => openNameShare(name, 'download')}
                  />
                </div>

                <button
                  onClick={() => toggleMemorized(name.id)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition active:scale-95 cursor-pointer ${
                    isMemorized
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                      : isDay
                      ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-600'
                      : 'bg-[#081f24] hover:bg-[#12363d] border-[#17464f] text-emerald-300'
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

      <ContentShareModal
        isOpen={!!shareState}
        onClose={() => setShareState(null)}
        content={shareState?.content || null}
        selectedLanguage={selectedLanguage}
        soundEnabled={soundEnabled}
        initialFocus={shareState?.focus}
      />
    </div>
  );
};

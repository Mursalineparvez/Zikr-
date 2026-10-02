import React, { useState, useEffect, useMemo } from 'react';
import { AUTHENTIC_HADITHS, HADITH_BOOKS_DATA } from '../utils/hadithData';
import { HadithItem, ThemeMode, ZikrLanguage, HadithBookMeta } from '../types';
import { HADITH_TRANSLATIONS, HADITH_TOPICS, HADITH_UI } from '../utils/appTranslations';
import {
  BookOpen,
  Search,
  Heart,
  Copy,
  Check,
  Sparkles,
  Layers,
  History,
  BookMarked,
  Library,
  ChevronRight,
  Filter,
  Info,
  CheckCircle2,
  ArrowLeft,
  Share2,
} from 'lucide-react';
import { soundHaptics } from '../utils/audioHaptics';

interface HadithViewProps {
  soundEnabled: boolean;
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
}

type HadithTab = 'topics' | 'books' | 'recent' | 'saved' | 'all';

export const HadithView: React.FC<HadithViewProps> = ({
  soundEnabled,
  themeMode = 'day',
  selectedLanguage = 'bn',
}) => {
  const isDay = themeMode === 'day';
  const [activeTab, setActiveTab] = useState<HadithTab>('topics');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Favorites
  const [favoriteHadiths, setFavoriteHadiths] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('zikrmate_hadith_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Recently read Hadith IDs
  const [recentHadithIds, setRecentHadithIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('zikrmate_hadith_recents');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Daily Featured Hadith
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24
  );
  const dailyHadith = AUTHENTIC_HADITHS[dayOfYear % AUTHENTIC_HADITHS.length];
  const dailyTranslation =
    HADITH_TRANSLATIONS[dailyHadith.id]?.[selectedLanguage]?.translation ||
    dailyHadith.englishTranslation;

  const topicsList = useMemo(() => {
    const set = new Set<string>();
    AUTHENTIC_HADITHS.forEach((h) => set.add(h.topic));
    return ['all', ...Array.from(set)];
  }, []);

  const addToRecents = (hadithId: string) => {
    setRecentHadithIds((prev) => {
      const filtered = prev.filter((id) => id !== hadithId);
      const updated = [hadithId, ...filtered].slice(0, 20);
      try {
        localStorage.setItem('zikrmate_hadith_recents', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const toggleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    let updated: string[];
    if (favoriteHadiths.includes(id)) {
      updated = favoriteHadiths.filter((favId) => favId !== id);
    } else {
      updated = [...favoriteHadiths, id];
      if (soundEnabled) soundHaptics.playMilestone();
    }
    setFavoriteHadiths(updated);
    try {
      localStorage.setItem('zikrmate_hadith_favorites', JSON.stringify(updated));
    } catch {}
  };

  const handleCopyHadith = (hadith: HadithItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    addToRecents(hadith.id);
    const trans =
      HADITH_TRANSLATIONS[hadith.id]?.[selectedLanguage]?.translation ||
      hadith.englishTranslation;
    const narratorText = HADITH_UI.narrator[selectedLanguage] || 'Narrator';
    const gradeText = HADITH_UI.grade[selectedLanguage] || 'Grade';

    const text = `${hadith.arabicText}\n\n"${trans}"\n\n[${hadith.book} #${hadith.hadithNumber} • ${narratorText}: ${hadith.narrator} • ${gradeText}: ${hadith.grade}]`;
    navigator.clipboard.writeText(text);
    setCopiedId(hadith.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filter Hadiths based on tab, book, topic, search
  const filteredHadiths = useMemo(() => {
    return AUTHENTIC_HADITHS.filter((h) => {
      // Search
      const trans =
        HADITH_TRANSLATIONS[h.id]?.[selectedLanguage]?.translation || h.englishTranslation;
      const matchesSearch =
        !searchQuery ||
        trans.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.englishTranslation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.narrator.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.book.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.arabicText.includes(searchQuery);

      if (!matchesSearch) return false;

      // Tab specific filtering
      if (activeTab === 'saved') {
        return favoriteHadiths.includes(h.id);
      }
      if (activeTab === 'recent') {
        return recentHadithIds.includes(h.id);
      }
      if (selectedBookId) {
        const bookMeta = HADITH_BOOKS_DATA.find((b) => b.id === selectedBookId);
        if (bookMeta) {
          const matchName = h.book.toLowerCase().includes(bookMeta.id) ||
            h.book.toLowerCase().includes(bookMeta.author.toLowerCase()) ||
            bookMeta.arabicName.includes(h.book);
          if (!matchName) return false;
        }
      }
      if (selectedTopic !== 'all') {
        if (h.topic !== selectedTopic) return false;
      }

      return true;
    });
  }, [activeTab, selectedTopic, selectedBookId, searchQuery, favoriteHadiths, recentHadithIds, selectedLanguage]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#144d52] via-[#1a5e64] to-[#257277] border border-teal-400/30 p-5 sm:p-6 shadow-xl text-white">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-teal-100 text-xs font-semibold mb-2 backdrop-blur-md">
            <BookOpen className="w-3.5 h-3.5" />
            <span>الحديث النبوي الشريف • Prophetic Traditions</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight drop-shadow-sm">
            {HADITH_UI.bannerTitle[selectedLanguage]}
          </h2>
          <p className="text-xs sm:text-sm text-teal-100 mt-1 max-w-xl">
            {HADITH_UI.bannerSub[selectedLanguage]}
          </p>
        </div>
      </div>

      {/* Sub-Navigation Tabs matching uploaded user screenshots */}
      <div
        className={`p-1.5 rounded-2xl border shadow-sm flex items-center gap-1.5 overflow-x-auto scrollbar-none ${
          isDay ? 'bg-white border-[#dcebe8]' : 'bg-[#0e2f36] border-[#1a515c]'
        }`}
      >
        <button
          onClick={() => {
            setActiveTab('recent');
            setSelectedBookId(null);
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
            activeTab === 'recent'
              ? 'bg-[#1c6469] text-white shadow-sm'
              : isDay
              ? 'text-[#2d6a70] hover:bg-[#eef7f6]'
              : 'text-teal-200 hover:bg-[#123e47]'
          }`}
        >
          <History className="w-4 h-4" />
          <span>{HADITH_UI.latestRead[selectedLanguage]}</span>
          {recentHadithIds.length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">
              {recentHadithIds.length}
            </span>
          )}
        </button>

        <button
          onClick={() => {
            setActiveTab('saved');
            setSelectedBookId(null);
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
            activeTab === 'saved'
              ? 'bg-[#1c6469] text-white shadow-sm'
              : isDay
              ? 'text-[#2d6a70] hover:bg-[#eef7f6]'
              : 'text-teal-200 hover:bg-[#123e47]'
          }`}
        >
          <Heart className="w-4 h-4 text-rose-400" />
          <span>{HADITH_UI.savedHadiths[selectedLanguage]}</span>
          {favoriteHadiths.length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-rose-500/30 text-rose-200 font-bold">
              {favoriteHadiths.length}
            </span>
          )}
        </button>

        <button
          onClick={() => {
            setActiveTab('topics');
            setSelectedBookId(null);
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
            activeTab === 'topics'
              ? 'bg-[#1c6469] text-white shadow-sm'
              : isDay
              ? 'text-[#2d6a70] hover:bg-[#eef7f6]'
              : 'text-teal-200 hover:bg-[#123e47]'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>{HADITH_UI.topicWise[selectedLanguage]}</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('books');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
            activeTab === 'books'
              ? 'bg-[#1c6469] text-white shadow-sm'
              : isDay
              ? 'text-[#2d6a70] hover:bg-[#eef7f6]'
              : 'text-teal-200 hover:bg-[#123e47]'
          }`}
        >
          <Library className="w-4 h-4" />
          <span>{HADITH_UI.hadithBooks[selectedLanguage]}</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('all');
            setSelectedBookId(null);
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
            activeTab === 'all'
              ? 'bg-[#1c6469] text-white shadow-sm'
              : isDay
              ? 'text-[#2d6a70] hover:bg-[#eef7f6]'
              : 'text-teal-200 hover:bg-[#123e47]'
          }`}
        >
          <BookMarked className="w-4 h-4" />
          <span>{HADITH_UI.allHadiths[selectedLanguage]}</span>
        </button>
      </div>

      {/* Featured: Hadith of the Day */}
      {activeTab !== 'books' && !selectedBookId && (
        <div
          onClick={() => addToRecents(dailyHadith.id)}
          className={`p-6 rounded-3xl border shadow-sm relative overflow-hidden transition hover:border-[#1c6469] cursor-pointer ${
            isDay
              ? 'bg-white border-[#dcebe8] text-[#103e42]'
              : 'bg-[#0e2f36] border-[#1a515c] text-white'
          }`}
        >
          <div
            className={`flex items-center justify-between pb-3 mb-3 border-b ${
              isDay ? 'border-[#e8f3f1]' : 'border-[#17434b]'
            }`}
          >
            <span className="flex items-center gap-2 text-xs font-bold text-teal-700 dark:text-teal-300 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{HADITH_UI.dailyHadith[selectedLanguage]}</span>
            </span>
            <span
              className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold border ${
                isDay
                  ? 'bg-[#e6f3f2] text-[#1c6469] border-[#cbe4e1]'
                  : 'bg-[#0a262c] text-[#2dd4bf] border-[#184850]'
              }`}
            >
              {dailyHadith.book} #{dailyHadith.hadithNumber}
            </span>
          </div>

          <div
            dir="rtl"
            className={`font-arabic text-xl sm:text-2xl leading-relaxed font-bold my-3 ${
              isDay ? 'text-[#0d4f54]' : 'text-teal-200'
            }`}
          >
            {dailyHadith.arabicText}
          </div>

          <p
            className={`text-sm sm:text-base font-medium leading-relaxed my-3 ${
              isDay ? 'text-[#1e3b3e]' : 'text-slate-200'
            }`}
          >
            "{dailyTranslation}"
          </p>

          <div
            className={`flex items-center justify-between pt-3 border-t text-xs ${
              isDay ? 'border-[#e8f3f1] text-[#507579]' : 'border-[#17434b] text-teal-200/80'
            }`}
          >
            <span className="font-semibold text-teal-700 dark:text-teal-300">
              {HADITH_UI.narrator[selectedLanguage]}: {dailyHadith.narrator}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => toggleFavorite(dailyHadith.id, e)}
                className={`p-1.5 rounded-lg transition active:scale-90 border ${
                  favoriteHadiths.includes(dailyHadith.id)
                    ? 'text-rose-500 bg-rose-50 border-rose-200'
                    : isDay
                    ? 'text-[#7ca2a7] bg-[#f0f7f6] border-[#d2ece9]'
                    : 'text-teal-400 bg-[#0a262c] border-[#184850]'
                }`}
              >
                <Heart className={`w-4 h-4 ${favoriteHadiths.includes(dailyHadith.id) ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={(e) => handleCopyHadith(dailyHadith, e)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition active:scale-95 cursor-pointer ${
                  isDay
                    ? 'bg-[#f0f7f6] hover:bg-[#e4f2f0] text-[#1c6469] border-[#d2ece9]'
                    : 'bg-[#0a262c] hover:bg-[#123e47] text-teal-200 border-[#184850]'
                }`}
              >
                {copiedId === dailyHadith.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-teal-600" />
                    <span className="text-teal-600">{HADITH_UI.copied[selectedLanguage]}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-teal-600" />
                    <span>{HADITH_UI.copy[selectedLanguage]}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HADITH BOOKS VIEW (Matching User Screenshot Image) */}
      {activeTab === 'books' && !selectedBookId && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold flex items-center gap-2">
              <Library className="w-5 h-5 text-teal-600" />
              <span>{HADITH_UI.hadithBooks[selectedLanguage]}</span>
            </h3>
            <span className="text-xs text-teal-600 font-semibold">
              10 {HADITH_UI.hadithBooks[selectedLanguage]}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {HADITH_BOOKS_DATA.map((book, idx) => {
              const translatedTitle = book.titles[selectedLanguage] || book.titles.en;
              return (
                <div
                  key={book.id}
                  onClick={() => {
                    setSelectedBookId(book.id);
                    if (soundEnabled) soundHaptics.playTap();
                  }}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer group flex items-start justify-between gap-3 ${
                    isDay
                      ? 'bg-white hover:bg-[#f3f9f8] border-[#dcebe8] hover:border-[#1c6469] shadow-sm'
                      : 'bg-[#0e2f36] hover:bg-[#133e47] border-[#1a515c] hover:border-teal-400'
                  }`}
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-full shrink-0 flex items-center justify-center font-bold text-xs border ${
                        isDay
                          ? 'bg-[#e6f3f2] text-[#1c6469] border-[#cbe4e1]'
                          : 'bg-[#0a262c] text-[#2dd4bf] border-[#184850]'
                      }`}
                    >
                      {idx + 1}
                    </div>

                    <div className="space-y-1 min-w-0 flex-1">
                      {/* Arabic Title (Always Arabic!) */}
                      <div dir="rtl" className="font-arabic text-base sm:text-lg font-bold text-teal-700 dark:text-teal-300 leading-snug">
                        {book.arabicName}
                      </div>

                      {/* Dynamic Title in Selected Language */}
                      <div className={`text-xs sm:text-sm font-bold truncate ${isDay ? 'text-[#103e42]' : 'text-slate-100'}`}>
                        {translatedTitle}
                      </div>

                      {/* Chapters & Hadith Count */}
                      <div className="text-[11px] text-teal-600/90 dark:text-teal-400 font-medium">
                        {book.chaptersCount} {HADITH_UI.chaptersCount[selectedLanguage]}, {book.hadithCount.toLocaleString()} {HADITH_UI.hadithsCount[selectedLanguage]}
                      </div>
                    </div>
                  </div>

                  <div
                    className={`p-1.5 rounded-full border shrink-0 transition group-hover:scale-110 ${
                      isDay
                        ? 'bg-[#f0f7f6] text-[#1c6469] border-[#d2ece9]'
                        : 'bg-[#0a262c] text-teal-300 border-[#184850]'
                    }`}
                  >
                    <Info className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Selected Book Header & Back Button */}
      {selectedBookId && (
        <div
          className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${
            isDay ? 'bg-[#e6f3f2] border-[#cbe4e1]' : 'bg-[#0a262c] border-[#184850]'
          }`}
        >
          <button
            onClick={() => setSelectedBookId(null)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/40 text-teal-800 dark:text-teal-200 text-xs font-bold transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{HADITH_UI.hadithBooks[selectedLanguage]}</span>
          </button>

          {(() => {
            const b = HADITH_BOOKS_DATA.find((item) => item.id === selectedBookId);
            if (!b) return null;
            return (
              <div className="text-right">
                <div dir="rtl" className="font-arabic font-bold text-sm text-teal-800 dark:text-teal-200">
                  {b.arabicName}
                </div>
                <div className="text-xs font-medium text-teal-700 dark:text-teal-300">
                  {b.titles[selectedLanguage] || b.titles.en}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Search Bar & Topic Pill Filters */}
      {(activeTab === 'all' || activeTab === 'topics' || selectedBookId) && (
        <div className="space-y-3">
          <div className="relative">
            <Search
              className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${
                isDay ? 'text-[#7ca2a7]' : 'text-teal-400'
              }`}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={HADITH_UI.searchPlaceholder[selectedLanguage]}
              className={`w-full rounded-2xl pl-11 pr-4 py-3 text-sm focus:outline-none transition shadow-sm border ${
                isDay
                  ? 'bg-white border-[#cde5e2] text-[#103e42] placeholder-[#7ca2a7] focus:border-[#1c6469]'
                  : 'bg-[#0e2f36] border-[#1a515c] text-white placeholder-teal-600 focus:border-teal-400'
              }`}
            />
          </div>

          {/* Topic Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {topicsList.map((topic) => {
              const label = HADITH_TOPICS[topic]?.[selectedLanguage] || (topic === 'all' ? 'All' : topic);
              return (
                <button
                  key={topic}
                  onClick={() => {
                    setSelectedTopic(topic);
                    if (soundEnabled) soundHaptics.playTap();
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition active:scale-95 cursor-pointer border ${
                    selectedTopic === topic
                      ? 'bg-[#1c6469] text-white border-[#1c6469] shadow-md shadow-[#135d66]/20'
                      : isDay
                      ? 'bg-white hover:bg-[#eef7f6] text-[#2d6a70] border-[#d2ece9]'
                      : 'bg-[#0e2f36] text-[#8ebac0] hover:text-white border-[#1a515c]'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* TOPIC-WISE ACCORDION / CARDS VIEW (When activeTab === 'topics' and no topic is filtered) */}
      {activeTab === 'topics' && selectedTopic === 'all' && !selectedBookId && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-teal-700 dark:text-teal-300 uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4" />
            <span>{HADITH_UI.topicWise[selectedLanguage]}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {topicsList
              .filter((t) => t !== 'all')
              .map((topicKey) => {
                const count = AUTHENTIC_HADITHS.filter((h) => h.topic === topicKey).length;
                const translatedTopic = HADITH_TOPICS[topicKey]?.[selectedLanguage] || topicKey;

                return (
                  <div
                    key={topicKey}
                    onClick={() => {
                      setSelectedTopic(topicKey);
                      if (soundEnabled) soundHaptics.playTap();
                    }}
                    className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between gap-3 ${
                      isDay
                        ? 'bg-white hover:bg-[#f0f7f6] border-[#dcebe8] hover:border-[#1c6469]'
                        : 'bg-[#0e2f36] hover:bg-[#133e47] border-[#1a515c] hover:border-teal-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2.5 rounded-xl border ${
                          isDay
                            ? 'bg-[#e6f3f2] text-[#1c6469] border-[#cbe4e1]'
                            : 'bg-[#0a262c] text-[#2dd4bf] border-[#184850]'
                        }`}
                      >
                        <Layers className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#103e42] dark:text-white">
                          {translatedTopic}
                        </div>
                        <div className="text-xs text-teal-600 font-medium">
                          {count} {HADITH_UI.hadithsCount[selectedLanguage]}
                        </div>
                      </div>
                    </div>

                    <ChevronRight className="w-4 h-4 text-teal-500" />
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* HADITH CARDS LISTING */}
      {activeTab !== 'books' || selectedBookId ? (
        <div className="space-y-4">
          {filteredHadiths.length === 0 ? (
            <div
              className={`p-8 rounded-3xl border text-center space-y-3 ${
                isDay ? 'bg-white border-[#dcebe8]' : 'bg-[#0e2f36] border-[#1a515c]'
              }`}
            >
              <BookOpen className="w-10 h-10 mx-auto text-teal-500/60" />
              <p className="text-sm font-medium text-teal-800 dark:text-teal-200">
                {activeTab === 'saved'
                  ? HADITH_UI.noSavedHadiths[selectedLanguage]
                  : activeTab === 'recent'
                  ? HADITH_UI.noRecentHadiths[selectedLanguage]
                  : HADITH_UI.searchPlaceholder[selectedLanguage]}
              </p>
            </div>
          ) : (
            filteredHadiths.map((hadith) => {
              const isFavorite = favoriteHadiths.includes(hadith.id);
              const isCopied = copiedId === hadith.id;
              const t = HADITH_TRANSLATIONS[hadith.id]?.[selectedLanguage];
              const translation = t?.translation || hadith.englishTranslation;
              const reflection = t?.reflection || hadith.reflection;
              const topicLabel = HADITH_TOPICS[hadith.topic]?.[selectedLanguage] || hadith.topic;

              return (
                <div
                  key={hadith.id}
                  onClick={() => addToRecents(hadith.id)}
                  className={`p-5 sm:p-6 rounded-3xl border transition-all duration-200 shadow-sm hover:shadow-md ${
                    isFavorite
                      ? isDay
                        ? 'bg-[#fffdf5] border-amber-300 shadow-sm'
                        : 'bg-[#142e2b] border-amber-500/50 shadow-sm'
                      : isDay
                      ? 'bg-white border-[#dcebe8] hover:border-[#b5dcd6]'
                      : 'bg-[#0e2f36] border-[#1a515c] hover:border-[#266e7c]'
                  }`}
                >
                  <div
                    className={`flex items-center justify-between pb-3 mb-3 border-b text-xs ${
                      isDay ? 'border-[#e8f3f1]' : 'border-[#17434b]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-1 rounded-full font-semibold border ${
                          isDay
                            ? 'bg-[#e6f3f2] text-[#1c6469] border-[#cbe4e1]'
                            : 'bg-[#0a262c] text-[#2dd4bf] border-[#184850]'
                        }`}
                      >
                        {hadith.book} #{hadith.hadithNumber}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-lg font-medium text-[11px] border ${
                          isDay
                            ? 'bg-[#f0f7f6] text-[#2d6a70] border-[#d2ece9]'
                            : 'bg-[#0a262c] text-teal-300 border-[#184850]'
                        }`}
                      >
                        {hadith.grade}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={(e) => toggleFavorite(hadith.id, e)}
                        className={`p-1.5 rounded-lg transition active:scale-90 cursor-pointer border ${
                          isFavorite
                            ? 'text-rose-500 bg-rose-50 border-rose-200'
                            : isDay
                            ? 'text-[#7ca2a7] hover:text-rose-500 bg-[#f0f7f6] border-[#d2ece9]'
                            : 'text-teal-400 hover:text-white bg-[#0a262c] border-[#184850]'
                        }`}
                        title={isFavorite ? 'Remove Favorite' : 'Save to Favorites'}
                      >
                        <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                      </button>

                      <button
                        onClick={(e) => handleCopyHadith(hadith, e)}
                        className={`p-1.5 rounded-lg transition active:scale-90 cursor-pointer border ${
                          isDay
                            ? 'text-[#507579] hover:text-[#1c6469] bg-[#f0f7f6] border-[#d2ece9]'
                            : 'text-teal-300 hover:text-white bg-[#0a262c] border-[#184850]'
                        }`}
                        title={isCopied ? HADITH_UI.copied[selectedLanguage] : HADITH_UI.copy[selectedLanguage]}
                      >
                        {isCopied ? (
                          <Check className="w-4 h-4 text-teal-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* ARABIC TEXT - ALWAYS PRESERVED IN ARABIC FONTS */}
                  <div
                    dir="rtl"
                    className={`font-arabic text-lg sm:text-xl font-bold leading-relaxed mb-3 ${
                      isDay ? 'text-[#0d4f54]' : 'text-teal-200'
                    }`}
                  >
                    {hadith.arabicText}
                  </div>

                  {/* DYNAMIC TRANSLATION IN SELECTED LANGUAGE */}
                  <p
                    className={`text-xs sm:text-sm font-sans leading-relaxed ${
                      isDay ? 'text-[#1e3b3e]' : 'text-slate-200'
                    }`}
                  >
                    "{translation}"
                  </p>

                  {/* SPIRITUAL REFLECTION */}
                  {reflection && (
                    <div
                      className={`mt-3 p-3 rounded-2xl border text-xs flex items-start gap-2 ${
                        isDay
                          ? 'bg-[#eef7f6] border-[#d0e6e3] text-[#1c6469]'
                          : 'bg-[#092226] border-[#133c44] text-[#8ebac0]'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>
                        <strong>{HADITH_UI.reflection[selectedLanguage]}:</strong> {reflection}
                      </span>
                    </div>
                  )}

                  {/* NARRATOR & TOPIC FOOTER */}
                  <div
                    className={`flex items-center justify-between pt-3 mt-3 border-t text-[11px] ${
                      isDay ? 'border-[#e8f3f1] text-[#507579]' : 'border-[#17434b] text-teal-200/80'
                    }`}
                  >
                    <span>
                      {HADITH_UI.narrator[selectedLanguage]}:{' '}
                      <strong className={isDay ? 'text-[#103e42]' : 'text-white'}>
                        {hadith.narrator}
                      </strong>
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full border ${
                        isDay
                          ? 'bg-[#f0f7f6] text-[#2d6a70] border-[#d2ece9]'
                          : 'bg-[#0a262c] text-teal-300 border-[#184850]'
                      }`}
                    >
                      {topicLabel}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      ) : null}
    </div>
  );
};

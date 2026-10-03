import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  ALL_114_SURAHS,
  SurahMeta,
} from '../utils/quran114List';
import {
  fetchSurah,
  getCachedSurah,
  QuranSurahDetail,
  QuranAyah,
  QuranWord,
  QURAN_RECITERS,
  fetchAyahTafsir,
  AVAILABLE_TAFSIRS,
  DEFAULT_TAFSIR_BY_LANG,
} from '../utils/quranService';
import { ThemeMode, ZikrLanguage } from '../types';
import { soundHaptics } from '../utils/audioHaptics';
import {
  QURAN_UI,
  SURAH_MEANINGS,
} from '../utils/appTranslations';
import { SUPPORTED_LANGUAGES } from '../utils/constants';

const POPULAR_SURAHS = [1, 18, 36, 55, 56, 67, 78, 112, 113, 114];
import {
  Search,
  BookOpen,
  Volume2,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Share2,
  Check,
  RotateCcw,
  Sparkles,
  Sliders,
  X,
  VolumeX,
  RefreshCw,
  LayoutGrid,
  ChevronDown,
  Book,
  Globe,
} from 'lucide-react';

interface QuranViewProps {
  soundEnabled: boolean;
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
  onSelectLanguage?: (lang: ZikrLanguage) => void;
}

type TabType = 'all' | 'popular' | 'meccan' | 'medinan' | 'bookmarks';
type FontSizeType = 'normal' | 'large' | 'xl' | '2xl';

interface BookmarkItem {
  surahNumber: number;
  ayahNumber: number;
  surahName: string;
  surahEnglishName: string;
  arabicSnippet: string;
  translationSnippet: string;
  timestamp: number;
}

export const QuranView: React.FC<QuranViewProps> = ({
  soundEnabled,
  themeMode = 'night',
  selectedLanguage = 'bn',
  onSelectLanguage,
}) => {
  const isDay = themeMode === 'day';

  // Navigation & Selection state
  const [selectedSurahNumber, setSelectedSurahNumber] = useState<number | null>(null);
  const [surahDetail, setSurahDetail] = useState<QuranSurahDetail | null>(null);
  const [isLoadingSurah, setIsLoadingSurah] = useState<boolean>(false);
  const [surahLoadError, setSurahLoadError] = useState<string | null>(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [selectedJuz, setSelectedJuz] = useState<number | 'all'>('all');
  const [surahSearchText, setSurahSearchText] = useState('');
  const [isSurahSearchOpen, setIsSurahSearchOpen] = useState(false);
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);

  // Reader Customization & Display Settings
  const [wordByWordMode, setWordByWordMode] = useState<boolean>(true);
  const [showTranslation, setShowTranslation] = useState<boolean>(true);
  const [showTransliteration, setShowTransliteration] = useState<boolean>(true);
  const [fontSize, setFontSize] = useState<FontSizeType>('large');
  const [selectedReciterId, setSelectedReciterId] = useState<string>('ar.alafasy');
  const [autoScroll, setAutoScroll] = useState<boolean>(true);

  // Audio Playback State
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playingMode, setPlayingMode] = useState<'surah' | 'ayah' | null>(null);
  const [currentPlayingAyahNum, setCurrentPlayingAyahNum] = useState<number | null>(null);
  const [audioProgress, setAudioProgress] = useState<number>(0);
  const [audioCurrentTime, setAudioCurrentTime] = useState<number>(0);
  const [audioDuration, setAudioDuration] = useState<number>(0);

  // Bookmarks & Last Read persistence
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(() => {
    try {
      const saved = localStorage.getItem('noor_quran_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [lastRead, setLastRead] = useState<{
    surahNumber: number;
    ayahNumber: number;
    surahName: string;
    surahEnglishName: string;
  } | null>(() => {
    try {
      const saved = localStorage.getItem('noor_quran_last_read');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      surahNumber: 1,
      ayahNumber: 1,
      surahName: 'ٱلْفَاتِحَةِ',
      surahEnglishName: 'Al-Faatiha',
    };
  });

  // Modals & Drawers
  const [showTafsirModal, setShowTafsirModal] = useState(false);
  const [activeTafsirAyah, setActiveTafsirAyah] = useState<QuranAyah | null>(null);
  const [tafsirContent, setTafsirContent] = useState<{ author: string; text: string } | null>(null);
  const [isLoadingTafsir, setIsLoadingTafsir] = useState(false);
  const [selectedTafsirId, setSelectedTafsirId] = useState<number>(165); // Default: Tafsir Ibn Kathir
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showSettingsDrawer, setShowSettingsDrawer] = useState(false);
  const [activeAyahActionMenu, setActiveAyahActionMenu] = useState<number | null>(null);

  // UI Interactive States
  const [copiedAyah, setCopiedAyah] = useState<number | null>(null);

  // Refs
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ayahRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  // Audio setup
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      if (audio.duration) {
        setAudioCurrentTime(audio.currentTime);
        setAudioDuration(audio.duration);
        setAudioProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleEnded = () => {
      if (playingMode === 'ayah' && surahDetail && currentPlayingAyahNum) {
        if (currentPlayingAyahNum < surahDetail.numberOfAyahs) {
          const nextAyah = surahDetail.ayahs[currentPlayingAyahNum];
          if (nextAyah) {
            playAyahAudio(nextAyah);
            return;
          }
        }
      }
      stopAudio();
    };

    const handleError = () => {
      stopAudio();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.pause();
    };
  }, [surahDetail, currentPlayingAyahNum, playingMode]);

  // Save Bookmarks
  useEffect(() => {
    try {
      localStorage.setItem('noor_quran_bookmarks', JSON.stringify(bookmarks));
    } catch {}
  }, [bookmarks]);

  // Save Last Read
  useEffect(() => {
    if (lastRead) {
      try {
        localStorage.setItem('noor_quran_last_read', JSON.stringify(lastRead));
      } catch {}
    }
  }, [lastRead]);

  // Load a Surah by number
  const loadSurah = async (surahNumber: number, targetAyahNumber?: number) => {
    setSelectedSurahNumber(surahNumber);
    setIsLoadingSurah(true);
    setSurahLoadError(null);
    stopAudio();

    try {
      const detail = await fetchSurah(surahNumber, selectedReciterId, selectedLanguage);
      setSurahDetail(detail);

      const targetAyah = targetAyahNumber || 1;
      setLastRead({
        surahNumber,
        ayahNumber: targetAyah,
        surahName: detail.name,
        surahEnglishName: detail.englishName,
      });

      if (targetAyahNumber) {
        setTimeout(() => {
          scrollToAyah(targetAyahNumber);
        }, 300);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (err: any) {
      setSurahLoadError(err.message || 'সূরা লোড করতে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।');
    } finally {
      setIsLoadingSurah(false);
    }
  };

  // Switch language and reload active surah if open
  const handleLanguageChange = (lang: ZikrLanguage) => {
    if (onSelectLanguage) {
      onSelectLanguage(lang);
    }
    setShowLanguagePicker(false);
  };

  // Re-fetch Surah when selectedLanguage or selectedReciterId changes
  useEffect(() => {
    setSelectedTafsirId(DEFAULT_TAFSIR_BY_LANG[selectedLanguage] || 164);
    if (selectedSurahNumber !== null) {
      loadSurah(selectedSurahNumber);
    }
  }, [selectedLanguage, selectedReciterId]);

  // Keep activeTafsirAyah updated with fresh translation when surahDetail updates
  useEffect(() => {
    if (activeTafsirAyah && surahDetail) {
      const updatedAyah = surahDetail.ayahs.find((a) => a.number === activeTafsirAyah.number);
      if (updatedAyah) {
        setActiveTafsirAyah(updatedAyah);
      }
    }
  }, [surahDetail]);

  // Re-fetch Tafsir whenever selectedLanguage, selectedTafsirId, or activeTafsirAyah changes while modal is open
  useEffect(() => {
    if (showTafsirModal && activeTafsirAyah && selectedSurahNumber !== null) {
      const refreshTafsir = async () => {
        setIsLoadingTafsir(true);
        try {
          const data = await fetchAyahTafsir(selectedSurahNumber, activeTafsirAyah.number, selectedLanguage, selectedTafsirId);
          setTafsirContent(data);
        } catch {
          setTafsirContent({
            author: selectedLanguage === 'bn' ? 'তাফসীর ইবনে কাছীর' : 'Tafsir Ibn Kathir',
            text: selectedLanguage === 'bn' ? 'তাফসীর লোড করা সম্ভব হয়নি।' : 'Could not load Tafsir.',
          });
        } finally {
          setIsLoadingTafsir(false);
        }
      };
      refreshTafsir();
    }
  }, [selectedLanguage, selectedTafsirId, showTafsirModal, activeTafsirAyah?.number, selectedSurahNumber]);

  // Scroll to Ayah
  const scrollToAyah = (ayahNum: number) => {
    const el = ayahRefs.current.get(ayahNum);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Play audio for an individual Ayah
  const playAyahAudio = (ayah: QuranAyah) => {
    if (!audioRef.current) return;
    const audioUrl = ayah.audioUrl || `https://cdn.islamic.network/quran/audio/128/${selectedReciterId}/${ayah.globalNumber}.mp3`;

    if (isPlaying && playingMode === 'ayah' && currentPlayingAyahNum === ayah.number) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    audioRef.current.src = audioUrl;
    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
        setPlayingMode('ayah');
        setCurrentPlayingAyahNum(ayah.number);
        if (autoScroll) {
          scrollToAyah(ayah.number);
        }
      })
      .catch((err) => {
        console.error('Audio play error:', err);
        setIsPlaying(false);
      });
  };

  // Play audio for entire Surah
  const playSurahAudio = () => {
    if (!audioRef.current || !surahDetail) return;

    if (isPlaying && playingMode === 'surah') {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    const firstAyah = surahDetail.ayahs[0];
    if (firstAyah) {
      playAyahAudio(firstAyah);
      setPlayingMode('ayah');
    }
  };

  // Stop audio
  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setPlayingMode(null);
    setCurrentPlayingAyahNum(null);
    setAudioProgress(0);
    setAudioCurrentTime(0);
  };

  // Toggle bookmark
  const toggleBookmark = (
    surahNum: number,
    ayahNum: number,
    arabic: string,
    translation: string
  ) => {
    const sMeta = ALL_114_SURAHS.find((s) => s.number === surahNum);
    const existingIndex = bookmarks.findIndex(
      (b) => b.surahNumber === surahNum && b.ayahNumber === ayahNum
    );

    if (existingIndex >= 0) {
      setBookmarks((prev) => prev.filter((_, i) => i !== existingIndex));
    } else {
      const newBookmark: BookmarkItem = {
        surahNumber: surahNum,
        ayahNumber: ayahNum,
        surahName: sMeta?.name || '',
        surahEnglishName: sMeta?.englishName || '',
        arabicSnippet: arabic.slice(0, 60),
        translationSnippet: translation.slice(0, 80),
        timestamp: Date.now(),
      };
      setBookmarks((prev) => [newBookmark, ...prev]);
    }

    if (soundEnabled) soundHaptics.playTap();
    setActiveAyahActionMenu(null);
  };

  const isAyahBookmarked = (surahNum: number, ayahNum: number): boolean => {
    return bookmarks.some((b) => b.surahNumber === surahNum && b.ayahNumber === ayahNum);
  };

  // Open Tafsir Modal
  const handleOpenTafsir = async (ayah: QuranAyah) => {
    if (!surahDetail) return;
    setActiveTafsirAyah(ayah);
    setShowTafsirModal(true);
    setIsLoadingTafsir(true);
    setActiveAyahActionMenu(null);

    try {
      const data = await fetchAyahTafsir(surahDetail.number, ayah.number, selectedLanguage, selectedTafsirId);
      setTafsirContent(data);
    } catch {
      setTafsirContent({
        author: selectedLanguage === 'bn' ? 'তাফসীর ইবনে কাছীর' : 'Tafsir Ibn Kathir',
        text: selectedLanguage === 'bn' ? 'তাফসীর লোড করা সম্ভব হয়নি।' : 'Could not load Tafsir.',
      });
    } finally {
      setIsLoadingTafsir(false);
    }
  };

  // Copy Ayah
  const handleCopyAyah = (ayah: QuranAyah) => {
    if (!surahDetail) return;
    const text = `${ayah.arabic}\n\n${ayah.translation}\n\n[সূরা ${surahDetail.englishName} : আয়াত ${ayah.number}]`;
    navigator.clipboard.writeText(text);
    setCopiedAyah(ayah.number);
    setTimeout(() => setCopiedAyah(null), 2000);
    setActiveAyahActionMenu(null);
  };

  // Share Ayah
  const handleShareAyah = (ayah: QuranAyah) => {
    if (!surahDetail) return;
    const text = `${ayah.arabic}\n\n${ayah.translation}\n\n- সূরা ${surahDetail.englishName} (${ayah.number})`;
    if (navigator.share) {
      navigator.share({
        title: `সূরা ${surahDetail.englishName} - আয়াত ${ayah.number}`,
        text: text,
      });
    } else {
      navigator.clipboard.writeText(text);
      setCopiedAyah(ayah.number);
      setTimeout(() => setCopiedAyah(null), 2000);
    }
    setActiveAyahActionMenu(null);
  };

  // Filtered Surahs List for the Directory
  const filteredSurahs = useMemo(() => {
    return ALL_114_SURAHS.filter((surah) => {
      // 1. Tab filter
      if (activeTab === 'popular' && !POPULAR_SURAHS.includes(surah.number)) return false;
      if (activeTab === 'meccan' && surah.revelationType !== 'Meccan') return false;
      if (activeTab === 'medinan' && surah.revelationType !== 'Medinan') return false;

      // 2. Juz filter
      if (selectedJuz !== 'all' && surah.startJuz !== selectedJuz) return false;

      // 3. Search text
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const numMatch = String(surah.number) === q;
        const nameMatch = surah.englishName.toLowerCase().includes(q);
        const transMatch = surah.englishNameTranslation.toLowerCase().includes(q);
        const arabicMatch = surah.name.includes(q);
        const localMeaning = (SURAH_MEANINGS[surah.number]?.[selectedLanguage] || '').toLowerCase().includes(q);
        return numMatch || nameMatch || transMatch || arabicMatch || localMeaning;
      }

      return true;
    });
  }, [activeTab, selectedJuz, searchQuery, selectedLanguage]);

  // Ayahs to display in Reader View with optional inner-search filter
  const displayedAyahs = useMemo(() => {
    if (!surahDetail) return [];
    if (!surahSearchText.trim()) return surahDetail.ayahs;

    const q = surahSearchText.toLowerCase().trim();
    return surahDetail.ayahs.filter(
      (a) =>
        String(a.number) === q ||
        a.arabic.includes(q) ||
        a.translation.toLowerCase().includes(q) ||
        (a.transliteration && a.transliteration.toLowerCase().includes(q))
    );
  }, [surahDetail, surahSearchText]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const remainder = Math.floor(seconds % 60);
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  const arabicFontClass = {
    normal: 'text-2xl sm:text-3xl leading-[2.2]',
    large: 'text-3xl sm:text-4xl leading-[2.4]',
    xl: 'text-3xl sm:text-4xl md:text-5xl leading-[2.6]',
    '2xl': 'text-4xl sm:text-5xl leading-[2.8]',
  }[fontSize];

  return (
    <div className="space-y-4 pb-24 animate-in fade-in duration-300">
      {/* ======================================================== */}
      {/* 1. READER VIEW (When a Surah is selected)                */}
      {/* ======================================================== */}
      {selectedSurahNumber !== null ? (
        <div className="space-y-4">
          {/* TOP ISLAMIC HEADER BAR (Cohesive Home Page Theme) */}
          <div
            className={`sticky top-0 z-40 text-white shadow-xl rounded-2xl px-4 py-3 flex items-center justify-between gap-3 border transition-colors ${
              isDay
                ? 'bg-gradient-to-r from-[#005a3e] via-[#006747] to-[#007a52] border-emerald-600/40 shadow-[#006747]/20'
                : 'bg-gradient-to-r from-[#07191e] via-[#0b262d] to-[#10363e] text-white border-[#163c46] shadow-black/60'
            }`}
          >
            {/* Left: Back Arrow */}
            <button
              onClick={() => {
                stopAudio();
                setSelectedSurahNumber(null);
                setSurahDetail(null);
              }}
              className="p-2 -ml-1 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 transition cursor-pointer flex items-center justify-center"
              title={selectedLanguage === 'bn' ? 'সূরা তালিকায় ফিরে যান' : 'Back to Surah List'}
            >
              <ChevronLeft className="w-5 h-5 text-white stroke-[2.5]" />
            </button>

            {/* Center: Surah Title */}
            <div
              className="flex-1 flex flex-col items-center justify-center text-center cursor-pointer"
              onClick={() => setShowDetailsModal(true)}
            >
              <div className="flex items-center gap-1.5">
                <h2 className="text-base sm:text-lg font-extrabold text-white tracking-wide drop-shadow-sm">
                  {surahDetail ? surahDetail.englishName : ALL_114_SURAHS[selectedSurahNumber - 1]?.englishName || 'Surah'}
                </h2>
              </div>
              <span className="text-[11px] text-[#2dd4bf] font-semibold flex items-center gap-1">
                <span>{surahDetail?.name || ''}</span>
                <span>•</span>
                <span>
                  {surahDetail
                    ? `${surahDetail.numberOfAyahs} ${QURAN_UI.ayahs[selectedLanguage]}`
                    : '...'}
                </span>
              </span>
            </div>

            {/* Right: Language Picker & Search Icons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setShowLanguagePicker(!showLanguagePicker)}
                className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 transition cursor-pointer flex items-center gap-1.5 text-xs font-bold text-teal-100 border border-white/15"
                title="Change Language"
              >
                <Globe className="w-3.5 h-3.5 text-[#2dd4bf]" />
                <span className="text-[10px] uppercase font-mono">{selectedLanguage}</span>
              </button>

              <button
                onClick={() => setIsSurahSearchOpen(!isSurahSearchOpen)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 transition cursor-pointer"
                title="Search Verses"
              >
                <Search className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Quick Language Switcher Dropdown */}
          {showLanguagePicker && (
            <div
              className={`p-3.5 rounded-2xl border shadow-xl space-y-2.5 animate-in fade-in slide-in-from-top-2 ${
                isDay
                  ? 'bg-white border-[#dcebe8] text-slate-800'
                  : 'bg-[#0e1c26] border-[#1a3342] text-white'
              }`}
            >
              <div
                className={`text-[11px] font-bold flex items-center justify-between ${
                  isDay ? 'text-[#144d52]' : 'text-[#2dd4bf]'
                }`}
              >
                <span>{selectedLanguage === 'bn' ? 'কুরআনের ভাষা বেছে নিন' : 'Select Quran Language'}</span>
                <button onClick={() => setShowLanguagePicker(false)} className="text-slate-400 hover:text-white p-1">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`p-2.5 rounded-xl text-xs font-bold flex items-center gap-2 border transition active:scale-95 cursor-pointer ${
                      selectedLanguage === lang.code
                        ? isDay
                          ? 'bg-[#1c6469] text-white border-[#1c6469] shadow-md'
                          : 'bg-[#1c6469] text-white border-[#288a91] shadow-md'
                        : isDay
                        ? 'bg-[#edf5f4] border-[#d2ece9] text-[#133e42] hover:bg-[#d8ece9]'
                        : 'bg-[#0a1620] border-[#162c3a] text-[#8ebac0] hover:text-white hover:bg-[#102330]'
                    }`}
                  >
                    <span className="text-base">{lang.flag}</span>
                    <span className="truncate">{lang.nativeName}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Search Inside Surah Pop-down */}
          {isSurahSearchOpen && (
            <div
              className={`p-3 rounded-2xl border shadow-lg flex items-center gap-2 ${
                isDay ? 'bg-white border-[#dcebe8]' : 'bg-[#0e1c26] border-[#1a3342]'
              }`}
            >
              <Search className="w-4 h-4 text-[#2dd4bf] shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder={
                  selectedLanguage === 'bn'
                    ? 'আয়াত নং বা বাংলা/আরবি শব্দ লিখুন...'
                    : 'Search verse number or text...'
                }
                value={surahSearchText}
                onChange={(e) => setSurahSearchText(e.target.value)}
                className={`flex-1 bg-transparent text-xs font-semibold focus:outline-none ${
                  isDay ? 'text-slate-800 placeholder-slate-400' : 'text-white placeholder-[#507d85]'
                }`}
              />
              {surahSearchText && (
                <button onClick={() => setSurahSearchText('')} className="p-1 text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {/* Audio Playing Floating Tracker Bar */}
          {isPlaying && (
            <div
              className={`p-3 rounded-2xl text-white shadow-xl flex items-center justify-between gap-3 text-xs border ${
                isDay
                  ? 'bg-gradient-to-r from-[#144d52] to-[#1c6469] border-teal-300/40'
                  : 'bg-gradient-to-r from-[#0d2a35] via-[#103642] to-[#154654] border-[#226371]'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-2.5 h-2.5 rounded-full bg-[#2dd4bf] animate-ping shrink-0" />
                <span className="font-bold truncate">
                  {playingMode === 'ayah'
                    ? `${selectedLanguage === 'bn' ? 'তিলাওয়াত: আয়াত' : 'Reciting: Ayah'} ${currentPlayingAyahNum}`
                    : `${selectedLanguage === 'bn' ? 'পূর্ণ সূরা তিলাওয়াত:' : 'Surah Recitation:'} ${surahDetail?.englishName}`}
                </span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[11px] font-mono text-[#2dd4bf]">
                  {formatTime(audioCurrentTime)} / {formatTime(audioDuration || 0)}
                </span>
                <button
                  onClick={stopAudio}
                  className="p-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white cursor-pointer active:scale-95"
                >
                  <Pause className="w-3.5 h-3.5 fill-current" />
                </button>
              </div>
            </div>
          )}

          {/* Bismillah Calligraphy Card (Matching Home Page Theme) */}
          {surahDetail && surahDetail.number !== 9 && surahDetail.number !== 1 && (
            <div
              className={`py-5 px-4 rounded-[26px] text-center border shadow-xl transition-colors ${
                isDay
                  ? 'bg-white border-[#dcebe8] text-[#144d52]'
                  : 'bg-[#0e1c26] border-[#1a3342] text-[#2dd4bf] shadow-black/50'
              }`}
            >
              <div className="font-arabic text-2xl sm:text-3xl font-bold leading-relaxed tracking-wide drop-shadow-sm">
                بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
              </div>
              <p
                className={`text-[11px] mt-1.5 italic font-medium ${
                  isDay ? 'text-[#507579]' : 'text-[#7ba3a9]'
                }`}
              >
                {selectedLanguage === 'bn'
                  ? 'পরম করুণাময় ও অসীম দয়ালু আল্লাহর নামে শুরু করছি'
                  : 'In the name of Allah, the Entirely Merciful, the Especially Merciful.'}
              </p>
            </div>
          )}

          {/* Loading Skeleton */}
          {isLoadingSurah && (
            <div className="space-y-4 py-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`p-6 rounded-[26px] border animate-pulse space-y-4 ${
                    isDay ? 'bg-white border-[#dcebe8]' : 'bg-[#0e1c26] border-[#1a3342]'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className={`w-8 h-8 rounded-full ${isDay ? 'bg-slate-200' : 'bg-[#152a36]'}`} />
                    <div className={`w-16 h-4 rounded-lg ${isDay ? 'bg-slate-200' : 'bg-[#152a36]'}`} />
                  </div>
                  <div className={`w-full h-16 rounded-xl ${isDay ? 'bg-slate-100' : 'bg-[#152a36]'}`} />
                  <div className={`w-full h-6 rounded-lg ${isDay ? 'bg-slate-100' : 'bg-[#152a36]'}`} />
                </div>
              ))}
            </div>
          )}

          {/* Error Message & Retry */}
          {surahLoadError && (
            <div className="p-8 rounded-[26px] bg-red-500/10 border border-red-500/30 text-center space-y-3">
              <p className="text-red-500 dark:text-red-400 font-semibold text-sm">{surahLoadError}</p>
              <button
                onClick={() => loadSurah(selectedSurahNumber)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1c6469] hover:bg-[#154f53] text-white text-xs font-bold transition active:scale-95 cursor-pointer shadow-md"
              >
                <RefreshCw className="w-4 h-4" />
                <span>{selectedLanguage === 'bn' ? 'পুনরায় চেষ্টা করুন (Retry)' : 'Retry Loading'}</span>
              </button>
            </div>
          )}

          {/* ======================================================== */}
          {/* AYAH CARDS (VIBRANT, HIGH-CONTRAST & HOME THEME COMPLIANT) */}
          {/* ======================================================== */}
          {surahDetail && !isLoadingSurah && (
            <div className="space-y-4">
              {displayedAyahs.map((ayah, index) => {
                const bookmarked = isAyahBookmarked(surahDetail.number, ayah.number);
                const isCopied = copiedAyah === ayah.number;
                const isThisAyahPlaying =
                  isPlaying && playingMode === 'ayah' && currentPlayingAyahNum === ayah.number;
                const isMenuOpen = activeAyahActionMenu === ayah.number;

                return (
                  <div
                    key={ayah.number}
                    ref={(el) => {
                      if (el) ayahRefs.current.set(ayah.number, el);
                      else ayahRefs.current.delete(ayah.number);
                    }}
                    id={`ayah-${ayah.number}`}
                    className={`rounded-[26px] border transition-all duration-300 overflow-hidden ${
                      isThisAyahPlaying
                        ? isDay
                          ? 'bg-[#eef8f7] border-2 border-[#1c6469] shadow-xl ring-2 ring-[#1c6469]/20'
                          : 'bg-[#122836] border-2 border-[#2dd4bf] shadow-xl ring-2 ring-[#2dd4bf]/25'
                        : bookmarked
                        ? isDay
                          ? 'bg-[#fffdf7] border-amber-300 shadow-md'
                          : 'bg-[#19221a] border-amber-500/50 shadow-md'
                        : isDay
                        ? 'bg-white border-[#dcebe8] hover:border-[#b4ded8] shadow-md shadow-[#135d66]/5'
                        : 'bg-[#0e1c26] border-[#1a3342] hover:border-[#274d63] shadow-xl shadow-black/40'
                    }`}
                  >
                    {/* Top Source Header */}
                    {index === 0 && (
                      <div
                        className={`px-5 pt-3.5 pb-1 text-[11px] font-bold ${
                          isDay ? 'text-[#165a60]' : 'text-[#2dd4bf]'
                        }`}
                      >
                        {selectedLanguage === 'bn' ? 'ইসলামিক ফাউন্ডেশন' : 'Verified Translation'}
                      </div>
                    )}

                    <div className="p-4 sm:p-6 space-y-4">
                      {/* Ayah Card Top Row: Ornate Number Badge (Left) & 3-Dots Menu (Right) */}
                      <div className="flex items-center justify-between">
                        {/* Left: Ornate Circular Ayah Number Badge */}
                        <div className="relative flex items-center justify-center">
                          <div
                            className={`w-9 h-9 rounded-full border-2 border-dashed flex items-center justify-center p-0.5 shadow-inner ${
                              isDay
                                ? 'border-[#1c6469]/70 bg-[#edf5f4]'
                                : 'border-[#2dd4bf]/70 bg-[#071922]'
                            }`}
                          >
                            <div
                              className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs font-bold ${
                                isDay
                                  ? 'border-[#1c6469]/40 text-[#144d52]'
                                  : 'border-[#2dd4bf]/40 text-[#2dd4bf]'
                              }`}
                            >
                              {ayah.number}
                            </div>
                          </div>
                        </div>

                        {/* Right: 3-Dots Options Menu */}
                        <div className="relative">
                          <button
                            onClick={() => setActiveAyahActionMenu(isMenuOpen ? null : ayah.number)}
                            className={`p-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 border ${
                              isDay
                                ? 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                                : 'bg-[#08151e] hover:bg-[#122836] border-[#1a3342]'
                            }`}
                            title="More Options"
                          >
                            <span className="w-2 h-2 rounded-full bg-amber-400" />
                            <span className="w-2 h-2 rounded-full bg-[#2dd4bf]" />
                            <span className="w-2 h-2 rounded-full bg-rose-400" />
                          </button>

                          {/* Ayah Popup Menu */}
                          {isMenuOpen && (
                            <div
                              className={`absolute right-0 top-10 z-30 w-52 rounded-2xl border shadow-2xl py-2 text-xs animate-in fade-in zoom-in-95 duration-150 ${
                                isDay
                                  ? 'bg-white border-slate-200 text-slate-700 shadow-slate-300'
                                  : 'bg-[#0e1c26] border-[#1a3342] text-slate-100 shadow-black'
                              }`}
                            >
                              <button
                                onClick={() => playAyahAudio(ayah)}
                                className={`w-full px-4 py-2.5 text-left flex items-center gap-2.5 cursor-pointer font-medium ${
                                  isDay ? 'hover:bg-slate-100' : 'hover:bg-[#152e3c]'
                                }`}
                              >
                                {isThisAyahPlaying ? (
                                  <Pause className="w-4 h-4 text-[#2dd4bf]" />
                                ) : (
                                  <Play className="w-4 h-4 text-[#2dd4bf]" />
                                )}
                                <span>
                                  {isThisAyahPlaying
                                    ? selectedLanguage === 'bn'
                                      ? 'অডিও থামান'
                                      : 'Pause Audio'
                                    : selectedLanguage === 'bn'
                                    ? 'আয়াত তিলাওয়াত শুনুন'
                                    : 'Play Ayah Audio'}
                                </span>
                              </button>
                              <button
                                onClick={() => handleOpenTafsir(ayah)}
                                className={`w-full px-4 py-2.5 text-left flex items-center gap-2.5 cursor-pointer font-medium ${
                                  isDay ? 'hover:bg-slate-100' : 'hover:bg-[#152e3c]'
                                }`}
                              >
                                <BookOpen className="w-4 h-4 text-amber-400" />
                                <span>{selectedLanguage === 'bn' ? 'তাফসীর ও ব্যাখ্যা দেখুন' : 'View Tafsir'}</span>
                              </button>
                              <button
                                onClick={() =>
                                  toggleBookmark(surahDetail.number, ayah.number, ayah.arabic, ayah.translation)
                                }
                                className={`w-full px-4 py-2.5 text-left flex items-center gap-2.5 cursor-pointer font-medium ${
                                  isDay ? 'hover:bg-slate-100' : 'hover:bg-[#152e3c]'
                                }`}
                              >
                                <Bookmark
                                  className={`w-4 h-4 ${
                                    bookmarked ? 'text-amber-500 fill-amber-500' : 'text-slate-400'
                                  }`}
                                />
                                <span>
                                  {bookmarked
                                    ? selectedLanguage === 'bn'
                                      ? 'বুকমার্ক মুছুন'
                                      : 'Remove Bookmark'
                                    : selectedLanguage === 'bn'
                                    ? 'বুকমার্ক করুন'
                                    : 'Bookmark Ayah'}
                                </span>
                              </button>
                              <button
                                onClick={() => handleCopyAyah(ayah)}
                                className={`w-full px-4 py-2.5 text-left flex items-center gap-2.5 cursor-pointer font-medium ${
                                  isDay ? 'hover:bg-slate-100' : 'hover:bg-[#152e3c]'
                                }`}
                              >
                                {isCopied ? (
                                  <Check className="w-4 h-4 text-[#2dd4bf]" />
                                ) : (
                                  <Book className="w-4 h-4 text-slate-400" />
                                )}
                                <span>{selectedLanguage === 'bn' ? 'আয়াত কপি করুন' : 'Copy Ayah'}</span>
                              </button>
                              <button
                                onClick={() => handleShareAyah(ayah)}
                                className={`w-full px-4 py-2.5 text-left flex items-center gap-2.5 cursor-pointer font-medium ${
                                  isDay ? 'hover:bg-slate-100' : 'hover:bg-[#152e3c]'
                                }`}
                              >
                                <Share2 className="w-4 h-4 text-slate-400" />
                                <span>{selectedLanguage === 'bn' ? 'শেয়ার করুন' : 'Share Ayah'}</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* ARABIC WORD-BY-WORD (HIGH-CONTRAST & BRILLIANT IN NIGHT MODE) */}
                      {wordByWordMode && ayah.words && ayah.words.length > 0 ? (
                        <div
                          dir="rtl"
                          className="flex flex-wrap items-start justify-center sm:justify-start gap-x-4 sm:gap-x-6 gap-y-5 py-2.5"
                        >
                          {ayah.words.map((word, wIdx) => (
                            <div
                              key={wIdx}
                              className={`flex flex-col items-center text-center group cursor-pointer p-2 rounded-2xl transition-all ${
                                isDay
                                  ? 'hover:bg-[#edf5f4] border border-transparent hover:border-[#cbe4e1]'
                                  : 'hover:bg-[#152e3c] border border-transparent hover:border-[#1e4456]'
                              }`}
                            >
                              {/* Arabic Word Script (Pure High Contrast) */}
                              <span
                                className={`font-arabic text-2xl sm:text-3xl font-bold leading-relaxed transition drop-shadow-sm ${
                                  isDay
                                    ? 'text-[#0f172a] group-hover:text-[#1c6469]'
                                    : 'text-[#f8fafc] group-hover:text-[#2dd4bf]'
                                }`}
                              >
                                {word.arabic}
                              </span>
                              {/* Word Meaning Translation */}
                              <span
                                dir="ltr"
                                className={`text-[11px] sm:text-xs font-sans mt-1 px-1 text-center max-w-[95px] leading-tight font-semibold ${
                                  isDay ? 'text-[#165a60]' : 'text-[#2dd4bf]'
                                }`}
                              >
                                {word.translation}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        /* CONTINUOUS FLOWING ARABIC CALLIGRAPHY (When 'Without word' is toggled) */
                        <div
                          dir="rtl"
                          className={`font-arabic font-bold ${
                            isDay ? 'text-[#0f172a]' : 'text-[#f8fafc]'
                          } ${arabicFontClass} text-right my-2 leading-[2.4] drop-shadow-sm`}
                        >
                          {ayah.arabic}
                          <span
                            className={`inline-flex items-center justify-center w-7 h-7 mx-1.5 rounded-full border text-xs font-mono font-bold align-middle ${
                              isDay
                                ? 'border-[#1c6469] text-[#1c6469] bg-[#edf5f4]'
                                : 'border-[#2dd4bf]/70 text-[#2dd4bf] bg-[#07131b]'
                            }`}
                          >
                            {ayah.number}
                          </span>
                        </div>
                      )}

                      {/* Transliteration (Pronunciation) */}
                      {showTransliteration && ayah.transliteration && (
                        <div
                          className={`text-xs sm:text-sm italic font-sans leading-relaxed pt-1 font-semibold ${
                            isDay ? 'text-[#165a60]' : 'text-[#2dd4bf]'
                          }`}
                        >
                          {ayah.transliteration}
                        </div>
                      )}

                      {/* MULTIPLE TRANSLATIONS BELOW ARABIC */}
                      {showTranslation && (
                        <div
                          className={`space-y-3 pt-3 border-t ${
                            isDay ? 'border-[#e8f3f1]' : 'border-[#152936]'
                          }`}
                        >
                          {ayah.translations && ayah.translations.length > 0 ? (
                            ayah.translations.map((trans, tIdx) => (
                              <div key={tIdx} className="space-y-1">
                                <div
                                  className={`text-[11px] font-bold ${
                                    isDay ? 'text-[#165a60]' : 'text-[#2dd4bf]'
                                  }`}
                                >
                                  {trans.translator}
                                </div>
                                <div
                                  className={`text-xs sm:text-sm leading-relaxed font-sans font-normal ${
                                    isDay ? 'text-[#1e293b]' : 'text-[#e2e8f0]'
                                  }`}
                                >
                                  {trans.text}
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="space-y-1">
                              <div
                                className={`text-[11px] font-bold ${
                                  isDay ? 'text-[#165a60]' : 'text-[#2dd4bf]'
                                }`}
                              >
                                {selectedLanguage === 'bn' ? 'মুফতী তাকী উসমানী' : 'Translation'}
                              </div>
                              <div
                                className={`text-xs sm:text-sm leading-relaxed font-sans font-normal ${
                                  isDay ? 'text-[#1e293b]' : 'text-[#e2e8f0]'
                                }`}
                              >
                                {ayah.translation}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ======================================================== */}
          {/* BOTTOM FIXED ACTION BAR (MATCHING HOME PAGE THEME)     */}
          {/* ======================================================== */}
          <div
            className={`fixed bottom-0 left-0 right-0 z-40 border-t shadow-2xl py-2 px-3 sm:px-6 backdrop-blur-xl transition-colors ${
              isDay
                ? 'bg-white/95 border-[#d6e8e5] text-[#133e42]'
                : 'bg-[#0a1620]/95 border-[#162c3a] text-[#7ba3a9]'
            }`}
          >
            <div className="max-w-xl mx-auto flex items-center justify-between gap-1">
              {/* 1. Tafsir Button */}
              <button
                onClick={() => {
                  const firstAyah = displayedAyahs[0] || surahDetail?.ayahs[0];
                  if (firstAyah) handleOpenTafsir(firstAyah);
                }}
                className={`flex flex-col items-center justify-center gap-1 p-1 transition cursor-pointer flex-1 ${
                  isDay ? 'hover:text-[#1c6469]' : 'hover:text-[#2dd4bf]'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    isDay ? 'bg-amber-100 text-amber-700' : 'bg-amber-500/15 text-amber-400'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold">Tafsir</span>
              </button>

              {/* 2. Without Word / Word-by-Word Toggle */}
              <button
                onClick={() => {
                  setWordByWordMode(!wordByWordMode);
                  if (soundEnabled) soundHaptics.playTap();
                }}
                className={`flex flex-col items-center justify-center gap-1 p-1 transition cursor-pointer flex-1 ${
                  !wordByWordMode
                    ? isDay
                      ? 'text-[#1c6469]'
                      : 'text-[#2dd4bf]'
                    : isDay
                    ? 'hover:text-[#1c6469]'
                    : 'hover:text-[#2dd4bf]'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    isDay ? 'bg-[#edf5f4] text-[#1c6469]' : 'bg-[#152e3c] text-[#2dd4bf]'
                  }`}
                >
                  <Book className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold whitespace-nowrap">
                  {wordByWordMode ? 'Without word' : 'Word by word'}
                </span>
              </button>

              {/* 3. Prominent Circular Play Audio Button */}
              <button
                onClick={playSurahAudio}
                className="flex flex-col items-center justify-center -mt-3 transition active:scale-95 cursor-pointer"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center shadow-xl border-2 cursor-pointer ${
                    isDay
                      ? 'bg-[#1c6469] hover:bg-[#154f53] text-white border-white shadow-[#135d66]/30'
                      : 'bg-[#1c6469] hover:bg-[#154f53] text-white border-[#2dd4bf]/40 shadow-black/80'
                  }`}
                >
                  {isPlaying && playingMode === 'surah' ? (
                    <Pause className="w-5 h-5 fill-current" />
                  ) : (
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  )}
                </div>
                <span
                  className={`text-[10px] font-bold mt-1 ${
                    isDay ? 'text-[#1c6469]' : 'text-[#2dd4bf]'
                  }`}
                >
                  {isPlaying && playingMode === 'surah' ? 'Pause' : 'Play Audio'}
                </span>
              </button>

              {/* 4. AutoScroll Toggle */}
              <button
                onClick={() => {
                  setAutoScroll(!autoScroll);
                  if (soundEnabled) soundHaptics.playTap();
                }}
                className={`flex flex-col items-center justify-center gap-1 p-1 transition cursor-pointer flex-1 ${
                  autoScroll
                    ? isDay
                      ? 'text-[#1c6469]'
                      : 'text-[#2dd4bf]'
                    : 'text-slate-400'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    isDay ? 'bg-[#edf5f4] text-[#1c6469]' : 'bg-[#152e3c] text-[#2dd4bf]'
                  }`}
                >
                  <RotateCcw className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold whitespace-nowrap">
                  AutoScroll: {autoScroll ? 'ON' : 'OFF'}
                </span>
              </button>

              {/* 5. Details / Surah Info Button */}
              <button
                onClick={() => setShowDetailsModal(true)}
                className={`flex flex-col items-center justify-center gap-1 p-1 transition cursor-pointer flex-1 ${
                  isDay ? 'hover:text-[#1c6469]' : 'hover:text-[#2dd4bf]'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    isDay ? 'bg-indigo-100 text-indigo-700' : 'bg-indigo-500/15 text-indigo-400'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold">Details</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ======================================================== */
        /* 2. SURAH INDEX DIRECTORY (MATCHING HOME PAGE THEME)       */
        /* ======================================================== */
        <div className="space-y-4">
          {/* Majestic Hero Banner */}
          <div
            className={`relative overflow-hidden rounded-[28px] border p-5 sm:p-6 shadow-xl text-white ${
              isDay
                ? 'bg-[#006747] border-emerald-600/40 shadow-[#006747]/20'
                : 'bg-gradient-to-b from-[#0e1c26] to-[#071018] border-[#1a3342] shadow-black/50'
            }`}
          >
            <div className="space-y-3">
              {/* Pill badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-[#2dd4bf] text-xs font-semibold tracking-wide backdrop-blur-md">
                <BookOpen className="w-3.5 h-3.5" />
                <span>الْقُرْآنُ الْكَرِيمُ • The Noble Qur'an</span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  The Noble Quran
                </h2>
                <p className="text-xs sm:text-sm text-[#8ebac0] leading-relaxed mt-1">
                  Complete 114 Surahs with Arabic Uthmani text, verified translations, and crystal-clear recitations
                </p>
              </div>

              {/* Stats Chips */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-white font-medium">
                  114 All Surahs (114)
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-[#2dd4bf] font-medium">
                  86 Meccan • 28 Medinan
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-[#8ebac0] font-medium">
                  30 Juz
                </span>
              </div>

              {/* Nested Continue Reading Card */}
              {lastRead && (
                <div
                  className={`mt-3 rounded-2xl border p-4 space-y-2 shadow-inner ${
                    isDay
                      ? 'bg-black/25 border-white/20'
                      : 'bg-[#060d13]/90 border-[#1a3342]'
                  }`}
                >
                  <div className="text-[10px] uppercase font-bold tracking-wider text-[#2dd4bf] flex items-center gap-1.5">
                    <RotateCcw className="w-3 h-3 text-[#2dd4bf]" />
                    <span>CONTINUE READING</span>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">
                      {lastRead.surahEnglishName}
                    </h4>
                    <p className="text-xs text-[#8ebac0] font-medium">
                      Ayah • {lastRead.ayahNumber} {lastRead.surahName}
                    </p>
                  </div>
                  <button
                    onClick={() => loadSurah(lastRead.surahNumber, lastRead.ayahNumber)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#009b68] hover:bg-[#00ab73] active:scale-98 text-white text-xs font-bold transition shadow-md flex items-center justify-center gap-1.5 cursor-pointer mt-1 border border-white/20"
                  >
                    <span>Resume Ayah {lastRead.ayahNumber}</span>
                    <ChevronRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2dd4bf]" />
            <input
              type="text"
              placeholder="Search Surah by name or number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-11 pr-10 py-3 rounded-2xl border text-xs sm:text-sm font-medium focus:outline-none transition shadow-sm ${
                isDay
                  ? 'bg-white border-[#dcebe8] text-slate-900 placeholder-[#7ca2a7] focus:border-[#006747]'
                  : 'bg-[#0e1c26] border-[#1a3342] text-white placeholder-[#507d85] focus:border-[#2dd4bf]'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Juz Dropdown Selector */}
          <div className="relative">
            <select
              value={selectedJuz}
              onChange={(e) => setSelectedJuz(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className={`w-full appearance-none px-4 py-3 rounded-2xl border text-xs sm:text-sm font-semibold focus:outline-none transition cursor-pointer pr-10 ${
                isDay
                  ? 'bg-white border-[#dcebe8] text-[#006747]'
                  : 'bg-[#0e1c26] border-[#1a3342] text-[#8ebac0] focus:border-[#2dd4bf]'
              }`}
            >
              <option value="all">All Juz (1 - 30)</option>
              {Array.from({ length: 30 }, (_, i) => i + 1).map((juzNum) => (
                <option key={juzNum} value={juzNum}>
                  Juz {juzNum}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-[#7ba3a9]" />
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {(['all', 'popular', 'meccan', 'medinan', 'bookmarks'] as TabType[]).map((tab) => {
              const label = {
                all: 'All Surahs (114)',
                popular: 'Popular (10)',
                meccan: 'Meccan (86)',
                medinan: 'Medinan (28)',
                bookmarks: `Bookmarks (${bookmarks.length})`,
              }[tab];

              const active = activeTab === tab;

              return (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    if (soundEnabled) soundHaptics.playTap();
                  }}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition active:scale-95 cursor-pointer border ${
                    active
                      ? isDay
                        ? 'bg-[#006747] text-white border-[#006747] shadow-md shadow-[#006747]/20'
                        : 'bg-[#1c6469] text-white border-[#288a91] shadow-lg shadow-black/40'
                      : isDay
                      ? 'bg-[#e2edf0] text-[#2c535a] border-[#cce0e5] hover:bg-[#d5e7eb]'
                      : 'bg-[#0a1620] text-[#7ba3a9] hover:text-white border-[#162c3a]'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Bookmarks View */}
          {activeTab === 'bookmarks' ? (
            <div className="space-y-3">
              {bookmarks.length === 0 ? (
                <div
                  className={`p-8 rounded-[28px] border text-center space-y-2 ${
                    isDay ? 'bg-white border-[#dcebe8]' : 'bg-[#0e1c26] border-[#1a3342]'
                  }`}
                >
                  <Bookmark className="w-10 h-10 mx-auto text-amber-500/40" />
                  <h4 className={`font-bold text-sm ${isDay ? 'text-slate-800' : 'text-white'}`}>
                    No bookmarks saved
                  </h4>
                  <p className="text-xs text-[#7ba3a9] max-w-sm mx-auto">
                    Tap the 3-dots menu on any verse while reading to save bookmarks.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {bookmarks.map((b) => (
                    <div
                      key={`${b.surahNumber}-${b.ayahNumber}`}
                      onClick={() => loadSurah(b.surahNumber, b.ayahNumber)}
                      className={`p-4 rounded-2xl border transition cursor-pointer hover:scale-[1.01] active:scale-98 ${
                        isDay
                          ? 'bg-white border-[#dcebe8] hover:border-[#1c6469] shadow-sm'
                          : 'bg-[#0e1c26] border-[#1a3342] hover:border-[#2dd4bf]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-xs font-bold ${
                            isDay ? 'text-[#144d52]' : 'text-[#2dd4bf]'
                          }`}
                        >
                          {b.surahEnglishName} • Ayah {b.ayahNumber}
                        </span>
                        <span className="text-[10px] text-[#7ba3a9]">
                          {new Date(b.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <p
                        className={`text-xs line-clamp-2 italic ${
                          isDay ? 'text-slate-700' : 'text-slate-200'
                        }`}
                      >
                        "{b.translationSnippet || b.arabicSnippet}"
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Surah Card Directory Grid */
            <div className="space-y-2.5 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:space-y-0 sm:gap-3">
              {filteredSurahs.map((surah) => {
                const meaning = SURAH_MEANINGS[surah.number]?.[selectedLanguage] || surah.englishNameTranslation;

                return (
                  <div
                    key={surah.number}
                    onClick={() => loadSurah(surah.number)}
                    className={`p-3.5 sm:p-4 rounded-[22px] border transition-all duration-200 cursor-pointer hover:shadow-lg hover:scale-[1.005] active:scale-98 flex items-center justify-between gap-3 ${
                      isDay
                        ? 'bg-white border-[#dcebe8] hover:border-[#006747] shadow-md shadow-[#006747]/5'
                        : 'bg-[#0e1c26] border-[#1a3342] hover:border-[#274d63] shadow-lg shadow-black/40'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Number Badge Box */}
                      <div
                        className={`w-10 h-10 rounded-xl border flex items-center justify-center font-bold text-xs shrink-0 shadow-inner ${
                          isDay
                            ? 'bg-[#e6f7f2] text-[#00875a] border-[#c3edd9]'
                            : 'bg-[#07131b] text-[#2dd4bf] border-[#162c3a]'
                        }`}
                      >
                        {surah.number}
                      </div>

                      {/* Surah Info */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4
                            className={`text-sm font-bold truncate ${
                              isDay ? 'text-[#0a3328]' : 'text-white'
                            }`}
                          >
                            {surah.englishName}
                          </h4>
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                        </div>
                        <p className={`text-xs truncate ${isDay ? 'text-slate-500' : 'text-[#7ba3a9]'}`}>
                          {meaning}
                        </p>
                        <p className={`text-[11px] font-medium mt-0.5 ${isDay ? 'text-[#4a6b72]' : 'text-[#4e828a]'}`}>
                          {surah.numberOfAyahs} Ayahs • Juz {surah.startJuz}
                        </p>
                      </div>
                    </div>

                    {/* Right: Arabic Calligraphy Name & Revelation Pill */}
                    <div className="flex flex-col items-end shrink-0">
                      <div className={`font-arabic text-xl font-bold leading-tight drop-shadow-sm ${
                        isDay ? 'text-[#006747]' : 'text-[#2dd4bf]'
                      }`}>
                        {surah.name}
                      </div>
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-md mt-1 border ${
                          surah.revelationType === 'Meccan'
                            ? 'bg-[#2b1906] border-[#4e2f0a] text-[#f59e0b]'
                            : isDay
                            ? 'bg-[#e6f7f2] border-[#c3edd9] text-[#00875a]'
                            : 'bg-[#07131b] border-[#162c3a] text-[#2dd4bf]'
                        }`}
                      >
                        {surah.revelationType}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* TAFSIR MODAL                                             */}
      {/* ======================================================== */}
      {showTafsirModal && activeTafsirAyah && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className={`w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-[28px] border shadow-2xl p-6 space-y-4 ${
              isDay
                ? 'bg-white border-[#dcebe8] text-slate-900 shadow-xl'
                : 'bg-[#0e1c26] border-[#1a3342] text-white shadow-black'
            }`}
          >
            {/* Header */}
            <div
              className={`flex items-center justify-between pb-3 border-b ${
                isDay ? 'border-[#e8f3f1]' : 'border-[#152936]'
              }`}
            >
              <div className="flex items-center gap-2 flex-wrap">
                <BookOpen className="w-5 h-5 text-[#2dd4bf]" />
                <h3 className="font-bold text-base">
                  {selectedLanguage === 'bn'
                    ? `সূরা ${surahDetail?.englishName} • আয়াত ${activeTafsirAyah.number} এর তাফসীর`
                    : `Surah ${surahDetail?.englishName} • Ayah ${activeTafsirAyah.number} Tafsir`}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl border bg-black/10 border-white/10 text-xs font-semibold">
                  <Globe className="w-3.5 h-3.5 text-[#2dd4bf]" />
                  <select
                    value={selectedLanguage}
                    onChange={(e) => handleLanguageChange(e.target.value as ZikrLanguage)}
                    className="bg-transparent text-xs font-bold focus:outline-none cursor-pointer"
                  >
                    {SUPPORTED_LANGUAGES.map((l) => (
                      <option key={l.code} value={l.code} className="bg-slate-900 text-white">
                        {l.flag} {l.label}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => setShowTafsirModal(false)}
                  className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Arabic & Translation Summary */}
            <div
              className={`p-4 rounded-2xl border space-y-2 ${
                isDay ? 'bg-[#edf5f4] border-[#d2ece9]' : 'bg-[#07131b] border-[#162c3a]'
              }`}
            >
              <div className="font-arabic text-xl text-right font-bold text-[#2dd4bf]">
                {activeTafsirAyah.arabic}
              </div>
              <div className={`text-xs italic ${isDay ? 'text-slate-700' : 'text-[#e2e8f0]'}`}>
                "{surahDetail?.ayahs.find((a) => a.number === activeTafsirAyah.number)?.translation || activeTafsirAyah.translation}"
              </div>
            </div>

            {/* Tafsir Edition Selector Bar */}
            <div
              className={`p-3 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 ${
                isDay ? 'bg-[#e8f3f1] border-[#c5e3df]' : 'bg-[#07131b] border-[#162c3a]'
              }`}
            >
              <span className="text-xs font-bold text-[#2dd4bf] flex items-center gap-1.5">
                <Book className="w-4 h-4 text-[#2dd4bf]" />
                <span>{selectedLanguage === 'bn' ? 'তাফসীর গ্রন্থ নির্বাচন করুন:' : 'Select Tafsir Edition:'}</span>
              </span>
              <select
                value={selectedTafsirId}
                onChange={(e) => setSelectedTafsirId(Number(e.target.value))}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border focus:outline-none cursor-pointer ${
                  isDay
                    ? 'bg-white border-[#c5e3df] text-[#006747]'
                    : 'bg-[#0e1c26] border-[#1a3342] text-[#2dd4bf]'
                }`}
              >
                {AVAILABLE_TAFSIRS.map((t) => (
                  <option key={t.id} value={t.id} className="bg-slate-900 text-white">
                    {selectedLanguage === 'bn' ? t.nameBn : t.nameEn}
                  </option>
                ))}
              </select>
            </div>

            {/* Tafsir Body */}
            {isLoadingTafsir ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-8 h-8 mx-auto border-3 border-[#2dd4bf] border-t-transparent rounded-full animate-spin" />
                <p className="text-xs text-[#7ba3a9]">
                  {selectedLanguage === 'bn' ? 'তাফসীর লোড হচ্ছে...' : 'Loading Tafsir...'}
                </p>
              </div>
            ) : tafsirContent ? (
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-[#2dd4bf]/10 border border-[#2dd4bf]/20 text-[#2dd4bf] text-xs font-bold">
                  <span>{tafsirContent.author}</span>
                </div>
                <div
                  className={`text-sm leading-relaxed whitespace-pre-line font-sans ${
                    isDay ? 'text-slate-800' : 'text-[#e2e8f0]'
                  }`}
                  dangerouslySetInnerHTML={{ __html: tafsirContent.text }}
                />
              </div>
            ) : (
              <div className="py-6 text-center text-xs text-slate-400">
                তাফসীর তথ্য পাওয়া যায়নি।
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SURAH DETAILS MODAL                                      */}
      {/* ======================================================== */}
      {showDetailsModal && surahDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className={`w-full max-w-md rounded-[28px] border shadow-2xl p-6 space-y-4 ${
              isDay
                ? 'bg-white border-[#dcebe8] text-slate-900'
                : 'bg-[#0e1c26] border-[#1a3342] text-white shadow-black'
            }`}
          >
            <div
              className={`flex items-center justify-between pb-3 border-b ${
                isDay ? 'border-[#e8f3f1]' : 'border-[#152936]'
              }`}
            >
              <h3 className="font-bold text-base">
                {selectedLanguage === 'bn' ? 'সূরার পরিচিতি ও বিবরণ' : 'Surah Details'}
              </h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-center py-2 space-y-1">
              <div className="font-arabic text-3xl font-bold text-[#2dd4bf]">
                {surahDetail.name}
              </div>
              <h4 className="text-lg font-bold">{surahDetail.englishName}</h4>
              <p className="text-xs text-[#7ba3a9]">
                {SURAH_MEANINGS[surahDetail.number]?.[selectedLanguage] || surahDetail.englishNameTranslation}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div
                className={`p-3 rounded-xl border ${
                  isDay ? 'bg-[#edf5f4] border-[#d2ece9]' : 'bg-[#07131b] border-[#162c3a]'
                }`}
              >
                <span className="text-[10px] text-[#7ba3a9]">
                  {selectedLanguage === 'bn' ? 'মোট আয়াত' : 'Total Ayahs'}
                </span>
                <p className="font-bold text-sm text-[#2dd4bf]">{surahDetail.numberOfAyahs}</p>
              </div>

              <div
                className={`p-3 rounded-xl border ${
                  isDay ? 'bg-[#edf5f4] border-[#d2ece9]' : 'bg-[#07131b] border-[#162c3a]'
                }`}
              >
                <span className="text-[10px] text-[#7ba3a9]">
                  {selectedLanguage === 'bn' ? 'অবতীর্ণের স্থান' : 'Revelation Place'}
                </span>
                <p className="font-bold text-sm text-[#2dd4bf]">{surahDetail.revelationType}</p>
              </div>

              <div
                className={`p-3 rounded-xl border ${
                  isDay ? 'bg-[#edf5f4] border-[#d2ece9]' : 'bg-[#07131b] border-[#162c3a]'
                }`}
              >
                <span className="text-[10px] text-[#7ba3a9]">
                  {selectedLanguage === 'bn' ? 'পারা / জুয' : 'Juz'}
                </span>
                <p className="font-bold text-sm text-[#2dd4bf]">Juz {surahDetail.startJuz}</p>
              </div>

              <div
                className={`p-3 rounded-xl border ${
                  isDay ? 'bg-[#edf5f4] border-[#d2ece9]' : 'bg-[#07131b] border-[#162c3a]'
                }`}
              >
                <span className="text-[10px] text-[#7ba3a9]">
                  {selectedLanguage === 'bn' ? 'সূরা ক্রম' : 'Surah Number'}
                </span>
                <p className="font-bold text-sm text-[#2dd4bf]">#{surahDetail.number}</p>
              </div>
            </div>

            {/* Reciter Selector inside Details */}
            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-bold text-[#7ba3a9]">
                {selectedLanguage === 'bn' ? 'ক্বারী নির্বাচন করুন' : 'Select Reciter'}
              </label>
              <select
                value={selectedReciterId}
                onChange={(e) => setSelectedReciterId(e.target.value)}
                className={`w-full p-2.5 rounded-xl border text-xs font-semibold focus:outline-none cursor-pointer ${
                  isDay
                    ? 'bg-white border-[#d2ece9] text-[#144d52]'
                    : 'bg-[#07131b] border-[#162c3a] text-[#8ebac0]'
                }`}
              >
                {QURAN_RECITERS.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name} ({r.subtext})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

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
  POPULAR_SURAHS_NUMBERS,
  fetchAyahTafsir,
} from '../utils/quranService';
import {
  Play,
  Pause,
  Search,
  Volume2,
  VolumeX,
  Bookmark,
  Check,
  BookOpen,
  Book,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ArrowLeft,
  Type,
  Share2,
  Sparkles,
  RotateCcw,
  SlidersHorizontal,
  ArrowUp,
  X,
  RefreshCw,
  LayoutGrid,
  Info,
  Globe,
} from 'lucide-react';
import { soundHaptics } from '../utils/audioHaptics';
import { ThemeMode, ZikrLanguage } from '../types';
import { QURAN_UI, SURAH_MEANINGS } from '../utils/appTranslations';
import { SUPPORTED_LANGUAGES } from '../utils/constants';

interface QuranViewProps {
  soundEnabled: boolean;
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
  onSelectLanguage?: (lang: ZikrLanguage) => void;
}

type TabType = 'all' | 'meccan' | 'medinan' | 'popular' | 'bookmarks';
type FontSize = 'normal' | 'large' | 'xl' | '2xl';

interface BookmarkItem {
  surahNumber: number;
  ayahNumber: number;
  surahName: string;
  surahEnglishName: string;
  arabicSnippet?: string;
  translationSnippet?: string;
  timestamp: number;
}

export const QuranView: React.FC<QuranViewProps> = ({
  soundEnabled,
  themeMode = 'day',
  selectedLanguage = 'bn',
  onSelectLanguage,
}) => {
  const isDay = themeMode === 'day';

  // Navigation & Surah State
  const [selectedSurahNumber, setSelectedSurahNumber] = useState<number | null>(null);
  const [surahDetail, setSurahDetail] = useState<QuranSurahDetail | null>(null);
  const [isLoadingSurah, setIsLoadingSurah] = useState(false);
  const [surahLoadError, setSurahLoadError] = useState<string | null>(null);

  // Filters & Search
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJuz, setSelectedJuz] = useState<number | 'all'>('all');
  const [isSurahSearchOpen, setIsSurahSearchOpen] = useState(false);
  const [surahSearchText, setSurahSearchText] = useState('');
  const [showLanguagePicker, setShowLanguagePicker] = useState(false);

  // Reader Customizations (Word-by-word toggle enabled by default)
  const [wordByWordMode, setWordByWordMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('noor_quran_wbw_mode');
    return saved !== null ? saved === 'true' : true;
  });
  const [selectedReciterId, setSelectedReciterId] = useState<string>(() => {
    return localStorage.getItem('noor_quran_reciter') || 'ar.alafasy';
  });
  const [fontSize, setFontSize] = useState<FontSize>(() => {
    return (localStorage.getItem('noor_quran_fontsize') as FontSize) || 'large';
  });
  const [showTranslation, setShowTranslation] = useState<boolean>(() => {
    const saved = localStorage.getItem('noor_quran_show_trans');
    return saved !== null ? saved === 'true' : true;
  });
  const [showTransliteration, setShowTransliteration] = useState<boolean>(() => {
    const saved = localStorage.getItem('noor_quran_show_pronounce');
    return saved !== null ? saved === 'true' : true;
  });
  const [autoScroll, setAutoScroll] = useState<boolean>(true);

  // Audio Playback State
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingMode, setPlayingMode] = useState<'surah' | 'ayah' | null>(null);
  const [currentPlayingAyahNum, setCurrentPlayingAyahNum] = useState<number | null>(null);
  const [audioProgress, setAudioProgress] = useState<number>(0);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const [audioCurrentTime, setAudioCurrentTime] = useState<number>(0);

  // Bookmarks & Last Read
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
    // Default fallback to Surah 1 Al-Faatiha
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
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showSettingsDrawer, setShowSettingsDrawer] = useState(false);
  const [activeAyahActionMenu, setActiveAyahActionMenu] = useState<number | null>(null);

  // UI Interactive States
  const [copiedAyah, setCopiedAyah] = useState<number | null>(null);
  const [jumpVerseInput, setJumpVerseInput] = useState('');

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
      setIsPlaying(false);
      setPlayingMode(null);
      setCurrentPlayingAyahNum(null);
      setAudioProgress(0);
    };

    const handleError = () => {
      setIsPlaying(false);
      setPlayingMode(null);
      setCurrentPlayingAyahNum(null);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.src = '';
    };
  }, [surahDetail, currentPlayingAyahNum, playingMode]);

  // Save customizations
  useEffect(() => {
    localStorage.setItem('noor_quran_wbw_mode', String(wordByWordMode));
  }, [wordByWordMode]);

  useEffect(() => {
    localStorage.setItem('noor_quran_reciter', selectedReciterId);
  }, [selectedReciterId]);

  useEffect(() => {
    localStorage.setItem('noor_quran_fontsize', fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('noor_quran_show_trans', String(showTranslation));
  }, [showTranslation]);

  useEffect(() => {
    localStorage.setItem('noor_quran_show_pronounce', String(showTransliteration));
  }, [showTransliteration]);

  useEffect(() => {
    localStorage.setItem('noor_quran_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Reload current Surah if user changes language anywhere in the app
  useEffect(() => {
    if (selectedSurahNumber !== null) {
      loadSurah(selectedSurahNumber, currentPlayingAyahNum || undefined);
    }
  }, [selectedLanguage]);

  // Language Change Handler that updates both local view & global app language
  const handleLanguageChange = (newLang: ZikrLanguage) => {
    if (onSelectLanguage) {
      onSelectLanguage(newLang);
    }
    try {
      localStorage.setItem('zikrmate_selected_language', newLang);
    } catch {}
    setShowLanguagePicker(false);
    if (soundEnabled) soundHaptics.playTap();
  };

  // Load a full Surah
  const loadSurah = async (surahNumber: number, targetAyahNumber?: number) => {
    setSelectedSurahNumber(surahNumber);
    setIsLoadingSurah(true);
    setSurahLoadError(null);
    setIsSurahSearchOpen(false);
    setSurahSearchText('');

    try {
      const detail = await fetchSurah(surahNumber, selectedReciterId, selectedLanguage);
      setSurahDetail(detail);

      const targetAyah = targetAyahNumber || 1;
      setLastRead({
        surahNumber: detail.number,
        ayahNumber: targetAyah,
        surahName: detail.name,
        surahEnglishName: detail.englishName,
      });
      localStorage.setItem(
        'noor_quran_last_read',
        JSON.stringify({
          surahNumber: detail.number,
          ayahNumber: targetAyah,
          surahName: detail.name,
          surahEnglishName: detail.englishName,
        })
      );

      if (targetAyahNumber) {
        setTimeout(() => {
          scrollToAyah(targetAyahNumber);
        }, 300);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (err: any) {
      setSurahLoadError(err.message || 'Failed to load Surah data. Please check internet connection.');
    } finally {
      setIsLoadingSurah(false);
    }
  };

  // Scroll smoothly to specific Ayah
  const scrollToAyah = (ayahNum: number) => {
    const el = ayahRefs.current.get(ayahNum);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Play Full Surah Audio
  const playSurahAudio = () => {
    if (!audioRef.current || !surahDetail) return;

    if (isPlaying && playingMode === 'surah') {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    if (soundEnabled) soundHaptics.playTap();
    const reciter = QURAN_RECITERS.find((r) => r.id === selectedReciterId);
    const surahPadded = String(surahDetail.number).padStart(3, '0');
    const audioUrl = reciter?.surahAudioBase
      ? `${reciter.surahAudioBase}/${surahPadded}.mp3`
      : surahDetail.audioUrl || `https://cdn.islamic.network/quran/audio-surah/128/${selectedReciterId}/${surahDetail.number}.mp3`;

    audioRef.current.src = audioUrl;
    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
        setPlayingMode('surah');
        setCurrentPlayingAyahNum(null);
      })
      .catch((err) => {
        console.warn('Playback error:', err);
        setIsPlaying(false);
      });
  };

  // Play Single Ayah Audio
  const playAyahAudio = (ayah: QuranAyah) => {
    if (!audioRef.current) return;

    if (isPlaying && playingMode === 'ayah' && currentPlayingAyahNum === ayah.number) {
      audioRef.current.pause();
      setIsPlaying(false);
      setCurrentPlayingAyahNum(null);
      return;
    }

    if (soundEnabled) soundHaptics.playTap();
    const url = ayah.audioUrl || `https://cdn.islamic.network/quran/audio/128/${selectedReciterId}/${ayah.globalNumber}.mp3`;
    audioRef.current.src = url;
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
        console.warn('Ayah audio playback notice:', err);
        setIsPlaying(false);
      });
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      setPlayingMode(null);
      setCurrentPlayingAyahNum(null);
    }
  };

  // Open Tafsir Modal for an Ayah
  const handleOpenTafsir = async (ayah: QuranAyah) => {
    setActiveTafsirAyah(ayah);
    setShowTafsirModal(true);
    setActiveAyahActionMenu(null);
    setIsLoadingTafsir(true);
    if (soundEnabled) soundHaptics.playTap();

    try {
      const tafsir = await fetchAyahTafsir(surahDetail?.number || 1, ayah.number, selectedLanguage);
      setTafsirContent(tafsir);
    } catch {
      setTafsirContent({
        author: selectedLanguage === 'bn' ? 'তাফসীর ও শানে নুযুল' : 'Tafsir & Commentary',
        text: selectedLanguage === 'bn' ? 'এই আয়াতের বিস্তারিত তাফসীর ও অনুবাদ লোড করা হচ্ছে...' : 'Loading detailed Tafsir & commentary...',
      });
    } finally {
      setIsLoadingTafsir(false);
    }
  };

  // Bookmark Toggle
  const toggleBookmark = (
    surahNumber: number,
    ayahNumber: number,
    arabicSnippet: string,
    translationSnippet: string
  ) => {
    const isBookmarked = bookmarks.some(
      (b) => b.surahNumber === surahNumber && b.ayahNumber === ayahNumber
    );

    if (isBookmarked) {
      setBookmarks(
        bookmarks.filter((b) => !(b.surahNumber === surahNumber && b.ayahNumber === ayahNumber))
      );
      if (soundEnabled) soundHaptics.playTap();
    } else {
      const meta = ALL_114_SURAHS.find((s) => s.number === surahNumber);
      const newBookmark: BookmarkItem = {
        surahNumber,
        ayahNumber,
        surahName: meta?.name || `Surah ${surahNumber}`,
        surahEnglishName: meta?.englishName || `Surah ${surahNumber}`,
        arabicSnippet: arabicSnippet.slice(0, 100),
        translationSnippet: translationSnippet.slice(0, 120),
        timestamp: Date.now(),
      };
      setBookmarks([newBookmark, ...bookmarks]);
      if (soundEnabled) soundHaptics.playMilestone();
    }
    setActiveAyahActionMenu(null);
  };

  const isAyahBookmarked = (surahNumber: number, ayahNumber: number): boolean => {
    return bookmarks.some((b) => b.surahNumber === surahNumber && b.ayahNumber === ayahNumber);
  };

  // Copy Ayah
  const handleCopyAyah = (ayah: QuranAyah) => {
    if (!surahDetail) return;
    const text = `${ayah.arabic}\n\n"${ayah.translation}"\n\n— Quran ${surahDetail.englishName} (${surahDetail.number}:${ayah.number})`;
    navigator.clipboard.writeText(text);
    setCopiedAyah(ayah.number);
    setActiveAyahActionMenu(null);
    if (soundEnabled) soundHaptics.playTap();
    setTimeout(() => setCopiedAyah(null), 2000);
  };

  // Share Ayah
  const handleShareAyah = async (ayah: QuranAyah) => {
    if (!surahDetail) return;
    const shareData = {
      title: `Noble Quran ${surahDetail.englishName} (${surahDetail.number}:${ayah.number})`,
      text: `${ayah.arabic}\n\n"${ayah.translation}"\n\n— Surah ${surahDetail.englishName} (${surahDetail.number}:${ayah.number})`,
      url: window.location.href,
    };
    setActiveAyahActionMenu(null);
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {}
    } else {
      handleCopyAyah(ayah);
    }
  };

  // Jump to Ayah
  const handleJumpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ayahNum = parseInt(jumpVerseInput, 10);
    if (!surahDetail || isNaN(ayahNum)) return;
    if (ayahNum >= 1 && ayahNum <= surahDetail.numberOfAyahs) {
      scrollToAyah(ayahNum);
      setJumpVerseInput('');
      setShowDetailsModal(false);
    }
  };

  // Filtered verses inside open Surah
  const displayedAyahs = useMemo(() => {
    if (!surahDetail) return [];
    if (!surahSearchText.trim()) return surahDetail.ayahs;
    const q = surahSearchText.toLowerCase().trim();
    return surahDetail.ayahs.filter(
      (a) =>
        String(a.number) === q ||
        a.arabic.includes(q) ||
        a.translation.toLowerCase().includes(q) ||
        a.transliteration.toLowerCase().includes(q) ||
        a.translations?.some((t) => t.text.toLowerCase().includes(q))
    );
  }, [surahDetail, surahSearchText]);

  // Filtered 114 Surahs
  const filteredSurahs = useMemo(() => {
    return ALL_114_SURAHS.filter((surah) => {
      const q = searchQuery.toLowerCase().trim();
      const meaning = SURAH_MEANINGS[surah.number]?.[selectedLanguage] || surah.englishNameTranslation;
      const matchesSearch =
        !q ||
        surah.englishName.toLowerCase().includes(q) ||
        surah.englishNameTranslation.toLowerCase().includes(q) ||
        meaning.toLowerCase().includes(q) ||
        surah.name.includes(q) ||
        String(surah.number) === q;

      const matchesJuz = selectedJuz === 'all' || surah.startJuz === selectedJuz;

      if (!matchesSearch || !matchesJuz) return false;

      if (activeTab === 'meccan') return surah.revelationType === 'Meccan';
      if (activeTab === 'medinan') return surah.revelationType === 'Medinan';
      if (activeTab === 'popular') return POPULAR_SURAHS_NUMBERS.includes(surah.number);

      return true;
    });
  }, [searchQuery, selectedJuz, activeTab, selectedLanguage]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
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
          {/* TOP ISLAMIC GREEN HEADER BAR */}
          <div className="sticky top-0 z-40 bg-[#1e6132] dark:bg-[#134427] text-white shadow-md rounded-2xl px-3.5 py-3 flex items-center justify-between gap-2 border border-emerald-500/20">
            {/* Left: Back Arrow */}
            <button
              onClick={() => {
                stopAudio();
                setSelectedSurahNumber(null);
                setSurahDetail(null);
              }}
              className="p-1.5 -ml-1 rounded-xl hover:bg-black/20 active:scale-95 transition cursor-pointer"
              title={selectedLanguage === 'bn' ? 'সূরা তালিকায় ফিরে যান' : 'Back to Surah List'}
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            {/* Center: Surah Title */}
            <div
              className="flex-1 flex flex-col items-center justify-center text-center cursor-pointer"
              onClick={() => setShowDetailsModal(true)}
            >
              <div className="flex items-center gap-1.5">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
                  {surahDetail ? surahDetail.englishName : ALL_114_SURAHS[selectedSurahNumber - 1]?.englishName || 'Surah'}
                </h2>
              </div>
              <span className="text-[10px] text-emerald-100/90 font-medium">
                {surahDetail ? `${surahDetail.name} • ${surahDetail.numberOfAyahs} ${QURAN_UI.ayahs[selectedLanguage]}` : '...'}
              </span>
            </div>

            {/* Right: Language Picker & Search Icons */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowLanguagePicker(!showLanguagePicker)}
                className="p-1.5 rounded-xl hover:bg-black/20 active:scale-95 transition cursor-pointer flex items-center gap-1 text-xs font-bold text-emerald-100"
                title="Change Language"
              >
                <Globe className="w-4 h-4 text-emerald-200" />
                <span className="text-[10px] uppercase font-mono">{selectedLanguage}</span>
              </button>

              <button
                onClick={() => setIsSurahSearchOpen(!isSurahSearchOpen)}
                className="p-1.5 rounded-xl hover:bg-black/20 active:scale-95 transition cursor-pointer"
                title="Search Verses"
              >
                <Search className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Quick Language Switcher Dropdown */}
          {showLanguagePicker && (
            <div className="p-3 rounded-2xl bg-white dark:bg-[#071f25] border border-emerald-500/30 shadow-xl space-y-2 animate-in fade-in slide-in-from-top-2">
              <div className="text-[11px] font-bold text-slate-500 dark:text-emerald-300 flex items-center justify-between">
                <span>{selectedLanguage === 'bn' ? 'কুরআনের ভাষা বেছে নিন' : 'Select Quran Language'}</span>
                <button onClick={() => setShowLanguagePicker(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`p-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition cursor-pointer ${
                      selectedLanguage === lang.code
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                        : isDay
                        ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        : 'bg-[#092227] border-[#184850] text-emerald-200 hover:bg-[#0d2f36]'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span className="truncate">{lang.nativeName}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Search Inside Surah Pop-down */}
          {isSurahSearchOpen && (
            <div className="p-3 rounded-2xl bg-white dark:bg-[#071f25] border border-emerald-500/30 shadow-lg flex items-center gap-2">
              <Search className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
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
                className="flex-1 bg-transparent text-xs font-semibold focus:outline-none text-slate-800 dark:text-slate-100"
              />
              {surahSearchText && (
                <button onClick={() => setSurahSearchText('')} className="p-1 text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {/* Audio Playing Floating Tracker Bar */}
          {isPlaying && (
            <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white shadow-lg flex items-center justify-between gap-3 text-xs border border-emerald-400/30">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping shrink-0" />
                <span className="font-bold truncate">
                  {playingMode === 'ayah'
                    ? `${selectedLanguage === 'bn' ? 'তিলাওয়াত: আয়াত' : 'Reciting: Ayah'} ${currentPlayingAyahNum}`
                    : `${selectedLanguage === 'bn' ? 'পূর্ণ সূরা তিলাওয়াত:' : 'Surah Recitation:'} ${surahDetail?.englishName}`}
                </span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[11px] font-mono text-emerald-200">
                  {formatTime(audioCurrentTime)} / {formatTime(audioDuration || 0)}
                </span>
                <button
                  onClick={stopAudio}
                  className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white cursor-pointer"
                >
                  <Pause className="w-3.5 h-3.5 fill-current" />
                </button>
              </div>
            </div>
          )}

          {/* Bismillah Calligraphy (For surahs other than 9 and 1) */}
          {surahDetail && surahDetail.number !== 9 && surahDetail.number !== 1 && (
            <div
              className={`py-5 px-4 rounded-2xl text-center border shadow-sm ${
                isDay
                  ? 'bg-white border-slate-200 text-[#164e52]'
                  : 'bg-[#0b2830] border-[#184850] text-[#34d399]'
              }`}
            >
              <div className="font-arabic text-2xl sm:text-3xl font-bold leading-relaxed tracking-wide">
                بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
              </div>
              <p className={`text-[11px] mt-1.5 italic ${isDay ? 'text-[#507579]' : 'text-emerald-300/80'}`}>
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
                  className={`p-6 rounded-2xl border animate-pulse space-y-4 ${
                    isDay ? 'bg-white border-slate-200' : 'bg-[#0b2830] border-[#184850]'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className={`w-8 h-8 rounded-full ${isDay ? 'bg-slate-200' : 'bg-[#06191d]'}`} />
                    <div className={`w-16 h-4 rounded-lg ${isDay ? 'bg-slate-200' : 'bg-[#06191d]'}`} />
                  </div>
                  <div className={`w-full h-16 rounded-xl ${isDay ? 'bg-slate-100' : 'bg-[#082025]'}`} />
                  <div className={`w-full h-6 rounded-lg ${isDay ? 'bg-slate-100' : 'bg-[#082025]'}`} />
                </div>
              ))}
            </div>
          )}

          {/* Error Message & Retry */}
          {surahLoadError && (
            <div className="p-8 rounded-2xl bg-red-500/10 border border-red-500/30 text-center space-y-3">
              <p className="text-red-600 dark:text-red-400 font-semibold text-sm">{surahLoadError}</p>
              <button
                onClick={() => loadSurah(selectedSurahNumber)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition active:scale-95 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>{selectedLanguage === 'bn' ? 'পুনরায় চেষ্টা করুন (Retry)' : 'Retry Loading'}</span>
              </button>
            </div>
          )}

          {/* ======================================================== */}
          {/* AYAH CARDS (WORD-BY-WORD & TRANSLATIONS AS IN IMAGE)    */}
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
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isThisAyahPlaying
                        ? isDay
                          ? 'bg-[#f4fbf8] border-2 border-emerald-600 shadow-lg ring-2 ring-emerald-500/20'
                          : 'bg-[#0e353d] border-2 border-emerald-400 shadow-lg ring-2 ring-emerald-400/20'
                        : bookmarked
                        ? isDay
                          ? 'bg-[#fffdf7] border-amber-300 shadow-sm'
                          : 'bg-[#142d2a] border-amber-500/50 shadow-sm'
                        : isDay
                        ? 'bg-white border-slate-200/80 hover:border-slate-300 shadow-sm'
                        : 'bg-[#092227] border-[#184850] hover:border-[#266e7c] shadow-sm'
                    }`}
                  >
                    {/* Top Source Header (As seen in screenshot) */}
                    {index === 0 && (
                      <div className="px-5 pt-3 pb-1 text-[11px] text-slate-400 dark:text-emerald-300/80 font-medium">
                        {selectedLanguage === 'bn' ? 'ইসলামিক ফাউন্ডেশন' : 'Verified Translation'}
                      </div>
                    )}

                    <div className="p-4 sm:p-6 space-y-4">
                      {/* Ayah Card Top Row: Ornate Number Badge (Left) & 3-Dots Menu (Right) */}
                      <div className="flex items-center justify-between">
                        {/* Left: Ornate Circular Ayah Number Badge */}
                        <div className="relative flex items-center justify-center">
                          <div className="w-9 h-9 rounded-full border-2 border-dashed border-emerald-600/70 dark:border-emerald-400/70 flex items-center justify-center p-0.5 bg-emerald-50/50 dark:bg-emerald-950/40 shadow-inner">
                            <div className="w-7 h-7 rounded-full border border-emerald-600/40 dark:border-emerald-400/40 flex items-center justify-center text-xs font-bold text-emerald-700 dark:text-emerald-300">
                              {ayah.number}
                            </div>
                          </div>
                        </div>

                        {/* Right: 3-Dots Options Menu */}
                        <div className="relative">
                          <button
                            onClick={() => setActiveAyahActionMenu(isMenuOpen ? null : ayah.number)}
                            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-[#0e353d] text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition cursor-pointer flex items-center gap-1"
                            title="More Options"
                          >
                            <span className="w-2 h-2 rounded-full bg-amber-400" />
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span className="w-2 h-2 rounded-full bg-rose-400" />
                          </button>

                          {/* Ayah Popup Menu */}
                          {isMenuOpen && (
                            <div className="absolute right-0 top-8 z-30 w-48 rounded-xl bg-white dark:bg-[#071f25] border border-slate-200 dark:border-[#184850] shadow-xl py-1.5 text-xs text-slate-700 dark:text-slate-200 animate-in fade-in zoom-in-95 duration-150">
                              <button
                                onClick={() => playAyahAudio(ayah)}
                                className="w-full px-3.5 py-2 text-left hover:bg-emerald-50 dark:hover:bg-emerald-950/40 flex items-center gap-2 cursor-pointer"
                              >
                                {isThisAyahPlaying ? <Pause className="w-3.5 h-3.5 text-emerald-600" /> : <Play className="w-3.5 h-3.5 text-emerald-600" />}
                                <span>{isThisAyahPlaying ? (selectedLanguage === 'bn' ? 'অডিও থামান' : 'Pause Audio') : (selectedLanguage === 'bn' ? 'আয়াত তিলাওয়াত শুনুন' : 'Play Ayah Audio')}</span>
                              </button>
                              <button
                                onClick={() => handleOpenTafsir(ayah)}
                                className="w-full px-3.5 py-2 text-left hover:bg-emerald-50 dark:hover:bg-emerald-950/40 flex items-center gap-2 cursor-pointer"
                              >
                                <BookOpen className="w-3.5 h-3.5 text-teal-600" />
                                <span>{selectedLanguage === 'bn' ? 'তাফসীর ও ব্যাখ্যা দেখুন' : 'View Tafsir'}</span>
                              </button>
                              <button
                                onClick={() => toggleBookmark(surahDetail.number, ayah.number, ayah.arabic, ayah.translation)}
                                className="w-full px-3.5 py-2 text-left hover:bg-emerald-50 dark:hover:bg-emerald-950/40 flex items-center gap-2 cursor-pointer"
                              >
                                <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'text-amber-500 fill-amber-500' : 'text-slate-500'}`} />
                                <span>{bookmarked ? (selectedLanguage === 'bn' ? 'বুকমার্ক মুছুন' : 'Remove Bookmark') : (selectedLanguage === 'bn' ? 'বুকমার্ক করুন' : 'Bookmark Ayah')}</span>
                              </button>
                              <button
                                onClick={() => handleCopyAyah(ayah)}
                                className="w-full px-3.5 py-2 text-left hover:bg-emerald-50 dark:hover:bg-emerald-950/40 flex items-center gap-2 cursor-pointer"
                              >
                                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Book className="w-3.5 h-3.5 text-slate-500" />}
                                <span>{selectedLanguage === 'bn' ? 'আয়াত কপি করুন' : 'Copy Ayah'}</span>
                              </button>
                              <button
                                onClick={() => handleShareAyah(ayah)}
                                className="w-full px-3.5 py-2 text-left hover:bg-emerald-50 dark:hover:bg-emerald-950/40 flex items-center gap-2 cursor-pointer"
                              >
                                <Share2 className="w-3.5 h-3.5 text-slate-500" />
                                <span>{selectedLanguage === 'bn' ? 'শেয়ার করুন' : 'Share Ayah'}</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* ARABIC WORD-BY-WORD (শব্দে শব্দে অর্থ) LAYOUT */}
                      {wordByWordMode && ayah.words && ayah.words.length > 0 ? (
                        <div
                          dir="rtl"
                          className="flex flex-wrap items-start justify-center sm:justify-start gap-x-4 sm:gap-x-6 gap-y-5 py-2"
                        >
                          {ayah.words.map((word, wIdx) => (
                            <div
                              key={wIdx}
                              className="flex flex-col items-center text-center group cursor-pointer p-1 rounded-xl hover:bg-emerald-500/10 transition"
                            >
                              {/* Arabic Word Script */}
                              <span
                                className="font-arabic text-2xl sm:text-3xl font-bold leading-relaxed text-slate-900 dark:text-white transition group-hover:text-emerald-600 dark:group-hover:text-emerald-400"
                              >
                                {word.arabic}
                              </span>
                              {/* Word Meaning Translation */}
                              <span
                                dir="ltr"
                                className="text-[11px] sm:text-xs text-slate-600 dark:text-emerald-200/90 font-sans mt-1 px-1 text-center max-w-[90px] leading-tight font-medium"
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
                            isDay ? 'text-slate-900' : 'text-white'
                          } ${arabicFontClass} text-right my-2 leading-[2.4]`}
                        >
                          {ayah.arabic}
                          <span className="inline-flex items-center justify-center w-7 h-7 mx-1.5 rounded-full border border-emerald-500/50 text-xs font-mono text-emerald-600 dark:text-emerald-400 align-middle">
                            {ayah.number}
                          </span>
                        </div>
                      )}

                      {/* Transliteration (Pronunciation) */}
                      {showTransliteration && ayah.transliteration && (
                        <div className="text-xs sm:text-sm italic font-sans text-emerald-700 dark:text-emerald-300 leading-relaxed pt-1 font-medium">
                          {ayah.transliteration}
                        </div>
                      )}

                      {/* MULTIPLE TRANSLATIONS BELOW ARABIC */}
                      {showTranslation && (
                        <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-[#143d44]">
                          {ayah.translations && ayah.translations.length > 0 ? (
                            ayah.translations.map((trans, tIdx) => (
                              <div key={tIdx} className="space-y-1">
                                <div className="text-[11px] font-bold text-slate-400 dark:text-emerald-400">
                                  {trans.translator}
                                </div>
                                <div className="text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 font-sans font-normal">
                                  {trans.text}
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="space-y-1">
                              <div className="text-[11px] font-bold text-slate-400 dark:text-emerald-400">
                                {selectedLanguage === 'bn' ? 'মুফতী তাকী উসমানী' : 'Translation'}
                              </div>
                              <div className="text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 font-sans font-normal">
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
          {/* BOTTOM FIXED ACTION BAR (EXACT 5 BUTTONS FROM IMAGE)   */}
          {/* ======================================================== */}
          <div className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-[#06191d] border-t border-slate-200 dark:border-[#143d44] shadow-2xl py-2 px-3 sm:px-6">
            <div className="max-w-xl mx-auto flex items-center justify-between gap-1 text-slate-600 dark:text-slate-300">
              {/* 1. Tafsir Button */}
              <button
                onClick={() => {
                  const firstAyah = displayedAyahs[0] || surahDetail?.ayahs[0];
                  if (firstAyah) handleOpenTafsir(firstAyah);
                }}
                className="flex flex-col items-center justify-center gap-1 p-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition cursor-pointer flex-1"
              >
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
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
                  !wordByWordMode ? 'text-emerald-600 dark:text-emerald-400' : 'hover:text-emerald-600 dark:hover:text-emerald-400'
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <Book className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold">
                  {wordByWordMode ? 'Without word' : 'Word by word'}
                </span>
              </button>

              {/* 3. Prominent Circular Play Audio Button (Center Pink/Rose) */}
              <button
                onClick={playSurahAudio}
                className="flex flex-col items-center justify-center -mt-3 transition active:scale-95 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-lg shadow-rose-500/30 border-2 border-white dark:border-[#06191d]">
                  {isPlaying && playingMode === 'surah' ? (
                    <Pause className="w-5 h-5 fill-current" />
                  ) : (
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  )}
                </div>
                <span className="text-[10px] font-bold mt-1 text-rose-600 dark:text-rose-400">
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
                  autoScroll ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-600 dark:text-teal-400">
                  <RotateCcw className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold">
                  AutoScroll: {autoScroll ? 'ON' : 'OFF'}
                </span>
              </button>

              {/* 5. Details / Surah Info Button */}
              <button
                onClick={() => setShowDetailsModal(true)}
                className="flex flex-col items-center justify-center gap-1 p-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition cursor-pointer flex-1"
              >
                <div className="w-8 h-8 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <LayoutGrid className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold">Details</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ======================================================== */
        /* 2. SURAH INDEX DIRECTORY (MATCHING IMAGE SCREENSHOT EXACTLY) */
        /* ======================================================== */
        <div className="space-y-4">
          {/* Majestic Hero Banner (Matching image.png exactly) */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#14535b] to-[#0e3b42] dark:from-[#134d54] dark:to-[#0c343b] border border-teal-500/25 p-5 sm:p-6 shadow-xl text-white">
            <div className="space-y-3">
              {/* Pill badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/25 text-teal-100 text-xs font-semibold tracking-wide backdrop-blur-md">
                <BookOpen className="w-3.5 h-3.5" />
                <span>الْقُرْآنُ الْكَرِيمُ • The Noble Qur'an</span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  The Noble Quran
                </h2>
                <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed mt-1">
                  Complete 114 Surahs with Arabic Uthmani text, verified translations, and crystal-clear recitations
                </p>
              </div>

              {/* Stats Chips */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="px-3 py-1.5 rounded-xl bg-black/30 border border-white/10 text-white font-medium">
                  114 All Surahs (114)
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-black/30 border border-white/10 text-teal-100 font-medium">
                  86 Meccan • 28 Medinan
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-black/30 border border-white/10 text-teal-100 font-medium">
                  30 Juz
                </span>
              </div>

              {/* Nested Continue Reading Card (Matching image.png) */}
              {lastRead && (
                <div className="mt-3 rounded-2xl bg-[#08282d]/90 border border-teal-500/30 p-4 space-y-2 shadow-inner">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-[#2dd4bf] flex items-center gap-1.5">
                    <RotateCcw className="w-3 h-3 text-[#2dd4bf]" />
                    <span>CONTINUE READING</span>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">
                      {lastRead.surahEnglishName}
                    </h4>
                    <p className="text-xs text-[#7da9af] font-medium">
                      Ayah • {lastRead.ayahNumber} {lastRead.surahName}
                    </p>
                  </div>
                  <button
                    onClick={() => loadSurah(lastRead.surahNumber, lastRead.ayahNumber)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#1a626a] hover:bg-[#20757f] active:scale-98 text-white text-xs font-bold transition shadow-md flex items-center justify-center gap-1.5 cursor-pointer mt-1"
                  >
                    <span>Resume Ayah {lastRead.ayahNumber}</span>
                    <ChevronRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Search Bar (Matching image.png) */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2dd4bf]" />
            <input
              type="text"
              placeholder="Search Surah by name or number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-11 pr-10 py-3 rounded-2xl border text-xs sm:text-sm font-medium focus:outline-none transition shadow-sm ${
                isDay
                  ? 'bg-white border-[#d2ece9] text-slate-900 placeholder-[#7ca2a7] focus:border-[#1c6469]'
                  : 'bg-[#092227] border-[#164048] text-white placeholder-[#457b85] focus:border-[#2dd4bf]'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-[#7ca2a7] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Juz Dropdown Selector (Matching image.png) */}
          <div className="relative">
            <select
              value={selectedJuz}
              onChange={(e) => setSelectedJuz(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className={`w-full appearance-none px-4 py-3 rounded-2xl border text-xs sm:text-sm font-semibold focus:outline-none transition cursor-pointer pr-10 ${
                isDay
                  ? 'bg-white border-[#d2ece9] text-[#1c6469]'
                  : 'bg-[#092227] border-[#164048] text-[#8ebac0] focus:border-[#2dd4bf]'
              }`}
            >
              <option value="all">All Juz (1 - 30)</option>
              {Array.from({ length: 30 }, (_, i) => i + 1).map((juzNum) => (
                <option key={juzNum} value={juzNum}>
                  Juz {juzNum}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-[#7da9af]" />
          </div>

          {/* Category Filter Tabs (Matching image.png pill row) */}
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
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition active:scale-95 cursor-pointer border ${
                    active
                      ? 'bg-[#1c6469] text-white border-[#247c83] shadow-md shadow-[#135d66]/20'
                      : isDay
                      ? 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      : 'bg-[#092227] text-[#7ea7ad] border-[#164048] hover:text-white'
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
                  className={`p-8 rounded-3xl border text-center space-y-2 ${
                    isDay ? 'bg-white border-slate-200' : 'bg-[#092227] border-[#164048]'
                  }`}
                >
                  <Bookmark className="w-10 h-10 mx-auto text-amber-500/40" />
                  <h4 className="font-bold text-sm text-slate-800 dark:text-white">
                    No bookmarks saved
                  </h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
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
                          ? 'bg-white border-slate-200 hover:border-emerald-500 shadow-sm'
                          : 'bg-[#092227] border-[#164048] hover:border-teal-400'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-teal-600 dark:text-[#2dd4bf]">
                          {b.surahEnglishName} • Ayah {b.ayahNumber}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {new Date(b.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-200 line-clamp-2 italic">
                        "{b.translationSnippet || b.arabicSnippet}"
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Surah Card Directory Grid (Matching image.png exactly) */
            <div className="space-y-2.5 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:space-y-0 sm:gap-3">
              {filteredSurahs.map((surah) => {
                const meaning = SURAH_MEANINGS[surah.number]?.[selectedLanguage] || surah.englishNameTranslation;

                return (
                  <div
                    key={surah.number}
                    onClick={() => loadSurah(surah.number)}
                    className={`p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 cursor-pointer hover:shadow-md hover:scale-[1.005] active:scale-98 flex items-center justify-between gap-3 ${
                      isDay
                        ? 'bg-white border-[#d2ece9] hover:border-[#1c6469] shadow-sm'
                        : 'bg-[#092227] border-[#143d44] hover:border-[#215f6b] shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Number Badge Box (Matching image.png square) */}
                      <div
                        className={`w-10 h-10 rounded-xl border flex items-center justify-center font-bold text-xs shrink-0 shadow-inner ${
                          isDay
                            ? 'bg-[#e6f3f2] text-[#1c6469] border-[#cbe4e1]'
                            : 'bg-[#06191f] text-[#2dd4bf] border-[#13383f]'
                        }`}
                      >
                        {surah.number}
                      </div>

                      {/* Surah Info */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4
                            className={`text-sm font-bold truncate ${
                              isDay ? 'text-[#103e42]' : 'text-white'
                            }`}
                          >
                            {surah.englishName}
                          </h4>
                          {/* Orange indicator dot as in image.png */}
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                        </div>
                        <p className={`text-xs truncate ${isDay ? 'text-slate-500' : 'text-[#7da9af]'}`}>
                          {meaning}
                        </p>
                        <p className={`text-[11px] font-medium mt-0.5 ${isDay ? 'text-[#7ca2a7]' : 'text-[#4e828a]'}`}>
                          {surah.numberOfAyahs} Ayahs • Juz {surah.startJuz}
                        </p>
                      </div>
                    </div>

                    {/* Right: Arabic Calligraphy Name & Revelation Pill (Matching image.png) */}
                    <div className="flex flex-col items-end shrink-0">
                      <div className="font-arabic text-xl font-bold text-[#2dd4bf] leading-tight">
                        {surah.name}
                      </div>
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-md mt-1 border ${
                          surah.revelationType === 'Meccan'
                            ? 'bg-[#2b1906] border-[#4e2f0a] text-[#f59e0b]'
                            : 'bg-[#07242a] border-[#144751] text-[#2dd4bf]'
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className={`w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border shadow-2xl p-6 space-y-4 ${
              isDay ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#071f25] border-[#184850] text-white'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-[#184850]">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h3 className="font-bold text-base">
                  {selectedLanguage === 'bn'
                    ? `সূরা ${surahDetail?.englishName} • আয়াত ${activeTafsirAyah.number} এর তাফসীর`
                    : `Surah ${surahDetail?.englishName} • Ayah ${activeTafsirAyah.number} Tafsir`}
                </h3>
              </div>
              <button
                onClick={() => setShowTafsirModal(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Arabic & Translation Summary */}
            <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-500/20 space-y-2">
              <div dir="rtl" className="font-arabic text-xl font-bold text-emerald-800 dark:text-emerald-300 text-right">
                {activeTafsirAyah.arabic}
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-200 italic font-medium">
                "{activeTafsirAyah.translation}"
              </p>
            </div>

            {/* Tafsir Body */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                {tafsirContent?.author}
              </div>
              {isLoadingTafsir ? (
                <div className="py-8 text-center space-y-2 text-xs text-slate-400">
                  <RefreshCw className="w-5 h-5 animate-spin mx-auto text-emerald-500" />
                  <span>{selectedLanguage === 'bn' ? 'তাফসীর লোড হচ্ছে...' : 'Loading Tafsir...'}</span>
                </div>
              ) : (
                <div className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 font-sans whitespace-pre-line max-h-80 overflow-y-auto pr-2">
                  {tafsirContent?.text}
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowTafsirModal(false)}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition active:scale-95 cursor-pointer"
              >
                {selectedLanguage === 'bn' ? 'বন্ধ করুন' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SURAH DETAILS & RECITER PICKER MODAL                     */}
      {/* ======================================================== */}
      {showDetailsModal && surahDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className={`w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-3xl border shadow-2xl p-6 space-y-5 ${
              isDay ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#071f25] border-[#184850] text-white'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-[#184850]">
              <div className="flex items-center gap-2">
                <Info className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h3 className="font-bold text-base">
                  {surahDetail.englishName} ({surahDetail.fullNameArabic})
                </h3>
              </div>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#092227] border border-slate-200 dark:border-[#184850]">
                <span className="text-[10px] text-slate-400">{QURAN_UI.ayahs[selectedLanguage]}</span>
                <p className="font-bold text-sm text-emerald-600">{surahDetail.numberOfAyahs}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#092227] border border-slate-200 dark:border-[#184850]">
                <span className="text-[10px] text-slate-400">Type</span>
                <p className="font-bold text-sm text-emerald-600">{surahDetail.revelationType}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#092227] border border-slate-200 dark:border-[#184850]">
                <span className="text-[10px] text-slate-400">{QURAN_UI.juz[selectedLanguage]}</span>
                <p className="font-bold text-sm text-emerald-600">{surahDetail.startJuz}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#092227] border border-slate-200 dark:border-[#184850]">
                <span className="text-[10px] text-slate-400">Surah #</span>
                <p className="font-bold text-sm text-emerald-600">{surahDetail.number} / 114</p>
              </div>
            </div>

            {/* Language Selector Inside Details */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 dark:text-emerald-300 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                <span>কুরআন ভাষা (Quran Translation Language):</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`p-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition cursor-pointer ${
                      selectedLanguage === lang.code
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : isDay
                        ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        : 'bg-[#092227] border-[#184850] text-emerald-200 hover:bg-[#0d2f36]'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span className="truncate">{lang.nativeName}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Reciter Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 dark:text-emerald-300">
                কুরআন কারী (Reciter):
              </label>
              <select
                value={selectedReciterId}
                onChange={(e) => {
                  setSelectedReciterId(e.target.value);
                  loadSurah(surahDetail.number);
                }}
                className="w-full p-2.5 rounded-xl border text-xs font-semibold bg-slate-50 dark:bg-[#092227] border-slate-200 dark:border-[#184850] text-slate-800 dark:text-white focus:outline-none"
              >
                {QURAN_RECITERS.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name} ({r.arabicName})
                  </option>
                ))}
              </select>
            </div>

            {/* Jump to Verse Input */}
            <form onSubmit={handleJumpSubmit} className="space-y-2">
              <label className="text-xs font-bold text-slate-600 dark:text-emerald-300">
                {selectedLanguage === 'bn' ? `নির্দিষ্ট আয়াতে যান (Jump to Ayah 1-${surahDetail.numberOfAyahs}):` : `Jump to Ayah (1-${surahDetail.numberOfAyahs}):`}
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="1"
                  max={surahDetail.numberOfAyahs}
                  placeholder={`1-${surahDetail.numberOfAyahs}`}
                  value={jumpVerseInput}
                  onChange={(e) => setJumpVerseInput(e.target.value)}
                  className="flex-1 p-2.5 rounded-xl border text-xs font-semibold bg-slate-50 dark:bg-[#092227] border-slate-200 dark:border-[#184850] text-slate-800 dark:text-white focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition active:scale-95 cursor-pointer"
                >
                  {selectedLanguage === 'bn' ? 'যান (Go)' : 'Go'}
                </button>
              </div>
            </form>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-5 py-2 rounded-xl bg-slate-200 dark:bg-[#143d44] hover:bg-slate-300 text-slate-800 dark:text-white text-xs font-bold transition active:scale-95 cursor-pointer"
              >
                {selectedLanguage === 'bn' ? 'ঠিক আছে' : 'Done'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { AUTHENTIC_HADITHS } from '../utils/hadithData';
import { HADIS_LIBRARY_BOOKS, HadisBookDefinition } from '../data/hadisCatalog';
import {
  ChapterHadithsResponse,
  FullHadithEntry,
  HadisChapterMeta,
  OfflineBookStatus,
  downloadEntireBookOffline,
  fetchBookChapters,
  fetchChapterHadiths,
  getAllOfflineBookStatuses,
  getCachedBnTranslation,
  getCuratedOfflineHadithsForBook,
  listCachedChapterIdsForBook,
  prewarmCoreHadithsOffline,
  searchBookHadiths,
  translateHadithToBn,
} from '../services/hadisRepository';
import { useOnlineStatus } from '../hooks/usePWAInstall';
import { copyToClipboard } from '../utils/clipboard';
import { HadithItem, ThemeMode, ZikrLanguage } from '../types';
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
  Library,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  ArrowLeft,
  Download,
  Loader2,
  Share2,
  Languages,
  SlidersHorizontal,
  ShieldCheck,
  BookmarkCheck,
  X,
  AlertCircle,
  WifiOff,
} from 'lucide-react';
import { soundHaptics } from '../utils/audioHaptics';
import { HIGHLIGHT_COLOR_STYLES } from '../utils/savedItems';
import { HighlightMarkerButton } from './HighlightMarkerButton';
import { HighlightableText, useSavedHighlightsStore } from './HighlightableText';
import { stepBackOr, useBackLayer } from '../utils/backNavigation';

interface HadithViewProps {
  soundEnabled: boolean;
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
}

type HadithTab = 'books' | 'topics' | 'saved' | 'recent';
type BookCategoryFilter = 'all' | 'kutub_sittah' | 'sunnah_core' | 'extended';
type ReaderDisplayMode = 'both' | 'translation' | 'arabic';

interface LastReadBookmark {
  bookId: string;
  chapterId: string;
  chapterTitleBn: string;
  chapterTitleEn: string;
  hadithNumber: string | number;
  updatedAt: number;
}

const SAVED_FULL_HADITHS_KEY = 'zikrmate_hadis_saved_full_v1';
const RECENT_FULL_HADITHS_KEY = 'zikrmate_hadis_recent_full_v1';
const LAST_READ_KEY = 'zikrmate_hadis_last_read_v1';
const PAGE_SIZE = 10;

function toBnNum(val: number | string | undefined | null): string {
  if (val === undefined || val === null) return '';
  const digits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(val).replace(/\d/g, (d) => digits[Number(d)] ?? d);
}

function formatNum(val: number | string, isBn: boolean): string {
  return isBn ? toBnNum(val) : String(val);
}

function getPaginationTokens(current: number, total: number): Array<number | 'ellipsis'> {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const tokens: Array<number | 'ellipsis'> = [1];
  const left = Math.max(2, current - 1);
  const right = Math.min(total - 1, current + 1);
  if (left > 2) tokens.push('ellipsis');
  for (let p = left; p <= right; p++) tokens.push(p);
  if (right < total - 1) tokens.push('ellipsis');
  tokens.push(total);
  return tokens;
}

export const HadithView: React.FC<HadithViewProps> = ({
  soundEnabled,
  themeMode = 'day',
  selectedLanguage = 'bn',
}) => {
  const isDay = themeMode === 'day';
  const isBn = selectedLanguage === 'bn';
  const isOnline = useOnlineStatus();
  const { byItemKey: highlightByItemKey } = useSavedHighlightsStore();

  // Top-level Navigation State
  const [activeTab, setActiveTab] = useState<HadithTab>('books');
  const [categoryFilter, setCategoryFilter] = useState<BookCategoryFilter>('all');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');

  // Book -> Chapter -> Reader Navigation
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);

  // Register Android/Browser Back Layers
  useBackLayer(selectedChapterId !== null, () => setSelectedChapterId(null), 'hadis-chapter');
  useBackLayer(selectedBookId !== null, () => {
    setSelectedChapterId(null);
    setSelectedBookId(null);
  }, 'hadis-book');
  useBackLayer(selectedTopic !== 'all', () => setSelectedTopic('all'), 'hadis-topic');

  // Global Quick Jump & Book Search
  const [globalBookId, setGlobalBookId] = useState<string>('bukhari');
  const [globalQuery, setGlobalQuery] = useState('');
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);
  const [globalSearchResults, setGlobalSearchResults] = useState<FullHadithEntry[] | null>(null);
  const [globalSearchTotal, setGlobalSearchTotal] = useState(0);
  const [isGlobalSearching, setIsGlobalSearching] = useState(false);
  const [globalSearchError, setGlobalSearchError] = useState<string | null>(null);

  // Selected Book Chapters & Search
  const [chapters, setChapters] = useState<HadisChapterMeta[]>([]);
  const [isLoadingChapters, setIsLoadingChapters] = useState(false);
  const [chaptersError, setChaptersError] = useState<string | null>(null);
  const [chapterFilterQuery, setChapterFilterQuery] = useState('');

  // Book-wide Hadith Search inside a selected book
  const [bookSearchQuery, setBookSearchQuery] = useState('');
  const [bookSearchResults, setBookSearchResults] = useState<FullHadithEntry[] | null>(null);
  const [bookSearchTotal, setBookSearchTotal] = useState(0);
  const [isSearchingBook, setIsSearchingBook] = useState(false);
  const [bookSearchError, setBookSearchError] = useState<string | null>(null);

  // Selected Chapter Hadiths Reader
  const [chapterData, setChapterData] = useState<ChapterHadithsResponse | null>(null);
  const [isLoadingHadiths, setIsLoadingHadiths] = useState(false);
  const [hadithsError, setHadithsError] = useState<string | null>(null);
  const [chapterPage, setChapterPage] = useState(1);

  // Reader Typography & View Settings
  const [displayMode, setDisplayMode] = useState<ReaderDisplayMode>('both');
  const [fontScale, setFontScale] = useState<number>(1);
  const [expandedGradesUid, setExpandedGradesUid] = useState<Record<string, boolean>>({});
  const [bnOverrides, setBnOverrides] = useState<Record<string, string>>({});
  const [translatingUids, setTranslatingUids] = useState<Record<string, boolean>>({});
  const [translationErrors, setTranslationErrors] = useState<Record<string, string>>({});

  // Offline Book Download Tracking
  const [offlineStatuses, setOfflineStatuses] = useState<Record<string, OfflineBookStatus>>({});
  const [cachedChapterIds, setCachedChapterIds] = useState<string[]>([]);
  const [downloadingBookId, setDownloadingBookId] = useState<string | null>(null);
  const [isDownloadingCorePack, setIsDownloadingCorePack] = useState(false);
  const [corePackProgress, setCorePackProgress] = useState<{ current: number; total: number; label: string } | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<{ done: number; total: number }>({ done: 0, total: 0 });
  const downloadAbortRef = useRef<AbortController | null>(null);

  // Copy feedback & Curated Search
  const [copiedUid, setCopiedUid] = useState<string | null>(null);
  const [curatedSearchQuery, setCuratedSearchQuery] = useState('');

  // Bookmarks / Favorites (both legacy curated IDs + full dynamic entries)
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('zikrmate_hadith_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [savedFullHadiths, setSavedFullHadiths] = useState<FullHadithEntry[]>(() => {
    try {
      const raw = localStorage.getItem(SAVED_FULL_HADITHS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [recentFullHadiths, setRecentFullHadiths] = useState<FullHadithEntry[]>(() => {
    try {
      const raw = localStorage.getItem(RECENT_FULL_HADITHS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [recentCuratedIds, setRecentCuratedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('zikrmate_hadith_recents');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [lastRead, setLastRead] = useState<LastReadBookmark | null>(() => {
    try {
      const raw = localStorage.getItem(LAST_READ_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  // Prewarm core offline books & load offline book statuses on mount
  useEffect(() => {
    let active = true;
    void prewarmCoreHadithsOffline(selectedLanguage).then(() => {
      if (active) {
        void getAllOfflineBookStatuses().then((statuses) => {
          if (active) setOfflineStatuses(statuses);
        });
      }
    });
    void getAllOfflineBookStatuses().then((statuses) => {
      if (active) setOfflineStatuses(statuses);
    });
    return () => {
      active = false;
    };
  }, [selectedLanguage]);

  // Scroll to top when switching views cleanly
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [activeTab, selectedBookId, selectedChapterId, selectedTopic, chapterPage]);

  const [isBookSearchOpen, setIsBookSearchOpen] = useState(false);

  // Load Chapters when a Book is selected
  useEffect(() => {
    if (!selectedBookId) {
      setChapters([]);
      setCachedChapterIds([]);
      setChapterFilterQuery('');
      setBookSearchQuery('');
      setIsBookSearchOpen(false);
      setBookSearchResults(null);
      setBookSearchError(null);
      return;
    }

    let cancelled = false;
    setIsLoadingChapters(true);
    setChaptersError(null);

    void listCachedChapterIdsForBook(selectedBookId).then((ids) => {
      if (!cancelled) setCachedChapterIds(ids);
    });

    fetchBookChapters(selectedBookId)
      .then((list) => {
        if (!cancelled) {
          setChapters(list);
          // Auto-open single-chapter books (e.g., 40 Nawawi, 40 Qudsi, 40 Dehlawi)
          if (list.length === 1 && !selectedChapterId) {
            setSelectedChapterId(list[0].chapterId);
          }
        }
      })
      .catch((err: any) => {
        if (!cancelled) {
          setChaptersError(err?.message || (isBn ? 'অধ্যায় লোড করতে সমস্যা হয়েছে।' : 'Failed to load chapters.'));
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoadingChapters(false);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedBookId]);

  // Load Hadiths when a Chapter is selected
  useEffect(() => {
    if (!selectedBookId || !selectedChapterId) {
      setChapterData(null);
      return;
    }

    let cancelled = false;
    setIsLoadingHadiths(true);
    setHadithsError(null);
    setChapterPage(1);

    fetchChapterHadiths(selectedBookId, selectedChapterId, selectedLanguage)
      .then(async (data) => {
        if (cancelled) return;
        setChapterData(data);

        // Preload any previously translated Bengali texts from IndexedDB
        if (isBn && data.hadiths.length > 0 && !data.hadiths[0].hasNativeBangla) {
          const cachedEntries: Record<string, string> = {};
          await Promise.all(
            data.hadiths.slice(0, 35).map(async (h) => {
              const t = await getCachedBnTranslation(h.uid);
              if (t) cachedEntries[h.uid] = t;
            })
          );
          if (!cancelled && Object.keys(cachedEntries).length > 0) {
            setBnOverrides((prev) => ({ ...prev, ...cachedEntries }));
          }
        }

        // Update Continue Reading bookmark
        const firstH = data.hadiths[0]?.hadithNumber ?? '1';
        const bookmark: LastReadBookmark = {
          bookId: selectedBookId,
          chapterId: selectedChapterId,
          chapterTitleBn: data.titleBn,
          chapterTitleEn: data.titleEn,
          hadithNumber: firstH,
          updatedAt: Date.now(),
        };
        setLastRead(bookmark);
        try {
          localStorage.setItem(LAST_READ_KEY, JSON.stringify(bookmark));
        } catch {}
      })
      .catch((err: any) => {
        if (!cancelled) {
          setHadithsError(err?.message || (isBn ? 'হাদিস লোড করতে সমস্যা হয়েছে।' : 'Failed to load hadiths.'));
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoadingHadiths(false);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedBookId, selectedChapterId, selectedLanguage]);

  const selectedBookDef = useMemo(
    () => HADIS_LIBRARY_BOOKS.find((b) => b.id === selectedBookId) || null,
    [selectedBookId]
  );

  const visibleBooks = useMemo(() => {
    if (categoryFilter === 'all') return HADIS_LIBRARY_BOOKS;
    return HADIS_LIBRARY_BOOKS.filter((b) => b.category === categoryFilter);
  }, [categoryFilter]);

  const filteredChapters = useMemo(() => {
    const q = chapterFilterQuery.trim().toLowerCase();
    if (!q) return chapters;
    return chapters.filter(
      (ch) =>
        ch.titleBn.toLowerCase().includes(q) ||
        ch.titleEn.toLowerCase().includes(q) ||
        (ch.titleAr && ch.titleAr.includes(chapterFilterQuery.trim())) ||
        String(ch.chapterId) === q ||
        (Number(q) >= ch.hadithFirst && Number(q) <= ch.hadithLast)
    );
  }, [chapters, chapterFilterQuery]);

  // Daily Curated Hadith
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

  const filteredCuratedHadiths = useMemo(() => {
    return AUTHENTIC_HADITHS.filter((h) => {
      const trans = HADITH_TRANSLATIONS[h.id]?.[selectedLanguage]?.translation || h.englishTranslation;
      const q = curatedSearchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        trans.toLowerCase().includes(q) ||
        h.englishTranslation.toLowerCase().includes(q) ||
        h.narrator.toLowerCase().includes(q) ||
        h.book.toLowerCase().includes(q) ||
        h.arabicText.includes(curatedSearchQuery);

      if (!matchesSearch) return false;
      if (selectedTopic !== 'all' && h.topic !== selectedTopic) return false;
      return true;
    });
  }, [curatedSearchQuery, selectedTopic, selectedLanguage]);

  const addFullHadithToRecent = (entry: FullHadithEntry) => {
    setRecentFullHadiths((prev) => {
      const next = [entry, ...prev.filter((item) => item.uid !== entry.uid)].slice(0, 40);
      try {
        localStorage.setItem(RECENT_FULL_HADITHS_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });

    const bookDef = HADIS_LIBRARY_BOOKS.find((b) => b.id === entry.bookId);
    if (bookDef) {
      const bookmark: LastReadBookmark = {
        bookId: entry.bookId,
        chapterId: entry.chapterId,
        chapterTitleBn: chapterData?.titleBn || bookDef.bnName,
        chapterTitleEn: chapterData?.titleEn || bookDef.enName,
        hadithNumber: entry.hadithNumber,
        updatedAt: Date.now(),
      };
      setLastRead(bookmark);
      try {
        localStorage.setItem(LAST_READ_KEY, JSON.stringify(bookmark));
      } catch {}
    }
  };

  const addCuratedToRecent = (hadithId: string) => {
    setRecentCuratedIds((prev) => {
      const updated = [hadithId, ...prev.filter((id) => id !== hadithId)].slice(0, 20);
      try {
        localStorage.setItem('zikrmate_hadith_recents', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const toggleSaveFullHadith = (entry: FullHadithEntry, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSavedFullHadiths((prev) => {
      const exists = prev.some((item) => item.uid === entry.uid);
      const next = exists
        ? prev.filter((item) => item.uid !== entry.uid)
        : [entry, ...prev];
      if (!exists && soundEnabled) soundHaptics.playMilestone();
      else if (soundEnabled) soundHaptics.playTap();
      try {
        localStorage.setItem(SAVED_FULL_HADITHS_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const toggleCuratedFavorite = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const exists = favoriteIds.includes(id);
    const updated = exists ? favoriteIds.filter((f) => f !== id) : [...favoriteIds, id];
    if (!exists && soundEnabled) soundHaptics.playMilestone();
    setFavoriteIds(updated);
    try {
      localStorage.setItem('zikrmate_hadith_favorites', JSON.stringify(updated));
    } catch {}
  };

  const handleCopyFullHadith = (entry: FullHadithEntry, e?: React.MouseEvent) => {
    e?.stopPropagation();
    addFullHadithToRecent(entry);
    const bookDef = HADIS_LIBRARY_BOOKS.find((b) => b.id === entry.bookId);
    const bookTitle = isBn ? bookDef?.bnName || entry.bookId : bookDef?.enName || entry.bookId;
    const translatedBody = bnOverrides[entry.uid] || entry.translationText;
    const refLine = `[${bookTitle} · ${isBn ? 'হাদিস নং' : 'Hadith'} #${entry.hadithNumber} · ${isBn ? 'মান' : 'Grade'}: ${entry.gradeLabel}]`;
    const copyStr = `${entry.arabicText ? `${entry.arabicText}\n\n` : ''}${translatedBody}\n\n${refLine}`;
    void copyToClipboard(copyStr);
    if (soundEnabled) soundHaptics.playTap();
    setCopiedUid(entry.uid);
    setTimeout(() => setCopiedUid((prev) => (prev === entry.uid ? null : prev)), 2000);
  };

  const handleShareFullHadith = async (entry: FullHadithEntry, e?: React.MouseEvent) => {
    e?.stopPropagation();
    addFullHadithToRecent(entry);
    const bookDef = HADIS_LIBRARY_BOOKS.find((b) => b.id === entry.bookId);
    const bookTitle = isBn ? bookDef?.bnName || entry.bookId : bookDef?.enName || entry.bookId;
    const translatedBody = bnOverrides[entry.uid] || entry.translationText;
    const text = `${entry.arabicText ? `${entry.arabicText}\n\n` : ''}${translatedBody}\n\n— ${bookTitle} #${entry.hadithNumber}`;

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: `${bookTitle} #${entry.hadithNumber}`, text });
        return;
      } catch {}
    }
    void copyToClipboard(text);
    setCopiedUid(entry.uid);
    setTimeout(() => setCopiedUid((prev) => (prev === entry.uid ? null : prev)), 2000);
  };

  const handleCopyCurated = (hadith: HadithItem, e?: React.MouseEvent) => {
    e?.stopPropagation();
    addCuratedToRecent(hadith.id);
    const trans = HADITH_TRANSLATIONS[hadith.id]?.[selectedLanguage]?.translation || hadith.englishTranslation;
    const text = `${hadith.arabicText}\n\n"${trans}"\n\n[${hadith.book} #${hadith.hadithNumber} · ${hadith.narrator} · ${hadith.grade}]`;
    void copyToClipboard(text);
    setCopiedUid(hadith.id);
    setTimeout(() => setCopiedUid(null), 2000);
  };

  const handleTranslateHadithBn = async (entry: FullHadithEntry) => {
    if (translatingUids[entry.uid] || bnOverrides[entry.uid]) return;
    const bookDef = HADIS_LIBRARY_BOOKS.find((b) => b.id === entry.bookId);
    const title = bookDef?.bnName || bookDef?.enName || entry.bookId;

    setTranslatingUids((prev) => ({ ...prev, [entry.uid]: true }));
    setTranslationErrors((prev) => {
      const next = { ...prev };
      delete next[entry.uid];
      return next;
    });

    try {
      const bnText = await translateHadithToBn(entry, title);
      setBnOverrides((prev) => ({ ...prev, [entry.uid]: bnText }));
      if (soundEnabled) soundHaptics.playMilestone();
    } catch (err: any) {
      setTranslationErrors((prev) => ({
        ...prev,
        [entry.uid]: err?.message || (isBn ? 'অনুবাদ করা যায়নি' : 'Translation failed'),
      }));
    } finally {
      setTranslatingUids((prev) => ({ ...prev, [entry.uid]: false }));
    }
  };

  const handleGlobalSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = globalQuery.trim();
    if (!q || isGlobalSearching) return;
    if (soundEnabled) soundHaptics.playTap();

    setIsGlobalSearching(true);
    setGlobalSearchError(null);
    try {
      const res = await searchBookHadiths(globalBookId, q, selectedLanguage);
      setGlobalSearchResults(res.results || []);
      setGlobalSearchTotal(res.totalMatches || 0);
    } catch (err: any) {
      setGlobalSearchError(err?.message || (isBn ? 'হাদিস খোঁজা যায়নি।' : 'Search failed.'));
      setGlobalSearchResults([]);
    } finally {
      setIsGlobalSearching(false);
    }
  };

  const handleBookSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBookId) return;
    const q = bookSearchQuery.trim();
    if (!q || isSearchingBook) return;
    if (soundEnabled) soundHaptics.playTap();

    setIsSearchingBook(true);
    setBookSearchError(null);
    try {
      const res = await searchBookHadiths(selectedBookId, q, selectedLanguage);
      setBookSearchResults(res.results || []);
      setBookSearchTotal(res.totalMatches || 0);
    } catch (err: any) {
      setBookSearchError(err?.message || (isBn ? 'খোঁজা সম্ভব হয়নি।' : 'Search failed.'));
      setBookSearchResults([]);
    } finally {
      setIsSearchingBook(false);
    }
  };

  const handleDownloadBookOffline = async (bookId: string) => {
    if (downloadingBookId || isDownloadingCorePack) return;
    if (soundEnabled) soundHaptics.playTap();
    const controller = new AbortController();
    downloadAbortRef.current = controller;
    setDownloadingBookId(bookId);
    setDownloadProgress({ done: 0, total: 1 });

    try {
      const status = await downloadEntireBookOffline(
        bookId,
        selectedLanguage,
        (done, total) => setDownloadProgress({ done, total }),
        controller.signal
      );
      setOfflineStatuses((prev) => ({ ...prev, [bookId]: status }));
      if (selectedBookId === bookId) {
        void listCachedChapterIdsForBook(bookId).then(setCachedChapterIds);
      }
      if (soundEnabled) soundHaptics.playMilestone();
    } catch {
      // Cancelled or failed softly
    } finally {
      setDownloadingBookId(null);
      downloadAbortRef.current = null;
    }
  };

  const handleDownloadCoreKutubOffline = async () => {
    if (isDownloadingCorePack || downloadingBookId || !isOnline) return;
    if (soundEnabled) soundHaptics.playTap();
    const coreIds = ['bukhari', 'muslim', 'tirmidhi', 'abudawud', 'nasai', 'ibnmajah'];
    const pending = coreIds.filter((id) => !offlineStatuses[id]?.completed);
    if (pending.length === 0) return;

    setIsDownloadingCorePack(true);
    try {
      for (let i = 0; i < pending.length; i++) {
        const bId = pending[i];
        const bDef = HADIS_LIBRARY_BOOKS.find((b) => b.id === bId);
        setCorePackProgress({
          current: i + 1,
          total: pending.length,
          label: isBn ? bDef?.bnName || bId : bDef?.enName || bId,
        });
        const status = await downloadEntireBookOffline(bId, selectedLanguage, () => {});
        setOfflineStatuses((prev) => ({ ...prev, [bId]: status }));
      }
      if (soundEnabled) soundHaptics.playMilestone();
    } catch {
      // Partial progress is preserved in IndexedDB
    } finally {
      setIsDownloadingCorePack(false);
      setCorePackProgress(null);
    }
  };

  // Pagination inside active chapter
  const chapterHadiths = chapterData?.hadiths || [];
  const totalPages = Math.max(1, Math.ceil(chapterHadiths.length / PAGE_SIZE));
  const paginatedHadiths = useMemo(() => {
    const start = (chapterPage - 1) * PAGE_SIZE;
    return chapterHadiths.slice(start, start + PAGE_SIZE);
  }, [chapterHadiths, chapterPage]);

  // Chapter navigation pointers
  const currentChapterIdx = useMemo(
    () => chapters.findIndex((c) => c.chapterId === selectedChapterId),
    [chapters, selectedChapterId]
  );
  const prevChapter = currentChapterIdx > 0 ? chapters[currentChapterIdx - 1] : null;
  const nextChapter =
    currentChapterIdx !== -1 && currentChapterIdx < chapters.length - 1
      ? chapters[currentChapterIdx + 1]
      : null;

  // Render helper for Full Canonical Hadith (supports both standalone 'card' and 'book-page' folio layout)
  const renderFullHadithCard = (
    entry: FullHadithEntry,
    showBookBreadcrumb = false,
    variant: 'card' | 'book-page' = 'card'
  ) => {
    const bookDef = HADIS_LIBRARY_BOOKS.find((b) => b.id === entry.bookId);
    const bookTitle = bookDef
      ? isBn
        ? bookDef.bnName
        : bookDef.titles[selectedLanguage] || bookDef.enName
      : entry.bookId;

    const isSaved = savedFullHadiths.some((s) => s.uid === entry.uid);
    const isCopied = copiedUid === entry.uid;
    const isGradesOpen = Boolean(expandedGradesUid[entry.uid]);
    const customBn = bnOverrides[entry.uid];
    const displayedTranslation = customBn || entry.translationText;
    const isTranslating = Boolean(translatingUids[entry.uid]);
    const transError = translationErrors[entry.uid];

    const hlKey = `hadith:${entry.uid}`;
    const hl = highlightByItemKey[hlKey];
    const hlStyle = hl ? HIGHLIGHT_COLOR_STYLES[hl.color] : null;
    const sourceLabel = `${bookTitle} #${entry.hadithNumber}`;

    const arabicFontPx = Math.round(21 * fontScale);
    const transFontPx = Math.round(15.5 * fontScale);

    const gradeColorClass =
      entry.gradeType === 'weak'
        ? isDay
          ? 'text-amber-800'
          : 'text-amber-300'
        : entry.gradeType === 'hasan'
        ? isDay
          ? 'text-cyan-800'
          : 'text-cyan-300'
        : isDay
        ? 'text-emerald-800'
        : 'text-emerald-300';

    const containerClass =
      variant === 'book-page'
        ? `px-4 sm:px-8 py-5 sm:py-6 transition-colors duration-200 ${
            hlStyle
              ? `${isDay ? hlStyle.cardDayClass : hlStyle.cardNightClass} rounded-2xl mx-2 sm:mx-4 my-2 border`
              : isSaved
              ? `${
                  isDay ? 'bg-amber-50/45 border border-amber-200/80' : 'bg-amber-950/20 border border-amber-500/30'
                } rounded-2xl mx-2 sm:mx-4 my-2`
              : ''
          }`
        : `rounded-3xl border p-5 sm:p-6 transition-colors duration-200 ${
            hlStyle
              ? isDay
                ? hlStyle.cardDayClass
                : hlStyle.cardNightClass
              : isSaved
              ? isDay
                ? 'bg-[#fffdf6] border-amber-300'
                : 'bg-[#0c2628] border-amber-500/45'
              : isDay
              ? 'bg-white border-slate-200 hover:border-emerald-300'
              : 'bg-[#0a2329] border-[#16444e] hover:border-emerald-500/50'
          }`;

    return (
      <article
        key={entry.uid}
        onClick={() => addFullHadithToRecent(entry)}
        data-highlight-section="hadith"
        data-highlight-source={sourceLabel}
        className={containerClass}
      >
        {/* Clean Zero-Pill Header Metadata + Action Buttons */}
        <div
          className={`flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b ${
            isDay ? 'border-slate-100' : 'border-[#153c45]'
          }`}
        >
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-bold">
            {showBookBreadcrumb && (
              <>
                <span className={isDay ? 'text-[#006A4E]' : 'text-emerald-300'}>{bookTitle}</span>
                <span aria-hidden="true" className="opacity-40">·</span>
              </>
            )}
            <span className="tabular-nums font-extrabold text-[#006A4E] dark:text-emerald-300">
              {isBn ? `হাদিস নং ${formatNum(entry.hadithNumber, true)}` : `Hadith #${entry.hadithNumber}`}
            </span>
            {entry.arabicNumber !== undefined &&
              String(entry.arabicNumber) !== String(entry.hadithNumber) && (
                <>
                  <span aria-hidden="true" className="opacity-40">·</span>
                  <span className={`tabular-nums font-medium ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                    {isBn ? `আন্তর্জাতিক #${formatNum(entry.arabicNumber, true)}` : `Intl #${entry.arabicNumber}`}
                  </span>
                </>
              )}
            <span aria-hidden="true" className="opacity-40">·</span>
            <span className={`inline-flex items-center gap-1 ${gradeColorClass}`}>
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>{entry.gradeLabel}</span>
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <HighlightMarkerButton
              itemKey={hlKey}
              text={`${entry.arabicText}\n\n${displayedTranslation}`}
              source={sourceLabel}
              section="hadith"
              selectedLanguage={selectedLanguage}
              themeMode={themeMode}
              soundEnabled={soundEnabled}
              variant="icon"
            />
            <button
              type="button"
              onClick={(e) => toggleSaveFullHadith(entry, e)}
              className={`min-h-[40px] min-w-[40px] p-2 rounded-xl transition active:scale-95 cursor-pointer flex items-center justify-center ${
                isSaved
                  ? 'text-rose-500 bg-rose-500/10'
                  : isDay
                  ? 'text-slate-400 hover:text-rose-500 hover:bg-slate-100'
                  : 'text-slate-400 hover:text-rose-400 hover:bg-white/5'
              }`}
              aria-label={isSaved ? 'Remove saved hadith' : 'Save hadith'}
              title={isBn ? 'হাদিস সংরক্ষণ করুন' : 'Save Hadith'}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
            <button
              type="button"
              onClick={(e) => handleCopyFullHadith(entry, e)}
              className={`min-h-[40px] min-w-[40px] p-2 rounded-xl transition active:scale-95 cursor-pointer flex items-center justify-center ${
                isDay
                  ? 'text-slate-500 hover:text-[#006A4E] hover:bg-slate-100'
                  : 'text-emerald-300 hover:bg-white/5'
              }`}
              aria-label={isBn ? 'কপি করুন' : 'Copy'}
              title={isBn ? 'সম্পূর্ণ হাদিস ও সূত্র কপি করুন' : 'Copy Hadith & Reference'}
            >
              {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={(e) => void handleShareFullHadith(entry, e)}
              className={`min-h-[40px] min-w-[40px] p-2 rounded-xl transition active:scale-95 cursor-pointer flex items-center justify-center ${
                isDay
                  ? 'text-slate-500 hover:text-[#006A4E] hover:bg-slate-100'
                  : 'text-emerald-300 hover:bg-white/5'
              }`}
              aria-label={isBn ? 'শেয়ার করুন' : 'Share'}
              title={isBn ? 'শেয়ার করুন' : 'Share'}
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ARABIC MATAN */}
        {(displayMode === 'both' || displayMode === 'arabic') && entry.arabicText && (
          <div
            dir="rtl"
            style={{ fontSize: `${arabicFontPx}px`, lineHeight: 2.05 }}
            className={`font-arabic font-semibold mb-4 select-text ${
              isDay ? 'text-[#0a3c35]' : 'text-emerald-200'
            }`}
          >
            <HighlightableText
              text={entry.arabicText}
              section="hadith"
              themeMode={themeMode}
              selectedLanguage={selectedLanguage}
              soundEnabled={soundEnabled}
            />
          </div>
        )}

        {/* TRANSLATION BODY */}
        {(displayMode === 'both' || displayMode === 'translation') && displayedTranslation && (
          <div
            style={{ fontSize: `${transFontPx}px`, lineHeight: 1.75 }}
            className={`select-text whitespace-pre-line ${
              isDay ? 'text-slate-800' : 'text-slate-100'
            }`}
          >
            <HighlightableText
              text={displayedTranslation}
              section="hadith"
              themeMode={themeMode}
              selectedLanguage={selectedLanguage}
              soundEnabled={soundEnabled}
            />
          </div>
        )}

        {/* Extended Book Bengali Translator Control + Scholar Grades Toggle */}
        <div
          className={`flex flex-wrap items-center justify-between gap-2 pt-3 mt-4 border-t text-xs ${
            isDay ? 'border-slate-100 text-slate-500' : 'border-[#153c45] text-slate-400'
          }`}
        >
          <div className="flex flex-wrap items-center gap-3">
            {isBn && !entry.hasNativeBangla && !customBn && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  void handleTranslateHadithBn(entry);
                }}
                disabled={isTranslating}
                className={`min-h-[38px] px-3 py-1.5 rounded-xl border font-bold text-xs flex items-center gap-1.5 transition cursor-pointer ${
                  isDay
                    ? 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-800'
                    : 'bg-emerald-950/60 hover:bg-emerald-900/60 border-emerald-700/60 text-emerald-300'
                }`}
              >
                {isTranslating ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Languages className="w-3.5 h-3.5" />
                )}
                <span>{isTranslating ? 'অনুবাদ হচ্ছে...' : 'বাংলা অনুবাদ পড়ুন'}</span>
              </button>
            )}

            {customBn && isBn && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                <Check className="w-3.5 h-3.5" />
                <span>বাংলা অনুবাদ যুক্ত হয়েছে</span>
              </span>
            )}

            {transError && (
              <span className="text-[11px] font-semibold text-rose-500">{transError}</span>
            )}

            {entry.grades && entry.grades.length > 0 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandedGradesUid((prev) => ({ ...prev, [entry.uid]: !prev[entry.uid] }));
                }}
                className={`min-h-[36px] px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                  isDay ? 'hover:bg-slate-100 text-slate-600' : 'hover:bg-white/5 text-slate-300'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>
                  {isBn
                    ? `তাহকীক ও মান (${formatNum(entry.grades.length, true)})`
                    : `Scholar Grades (${entry.grades.length})`}
                </span>
              </button>
            )}
          </div>

          <span className="text-[11px] font-medium">
            {bookTitle} · #{formatNum(entry.hadithNumber, isBn)}
          </span>
        </div>

        {/* Expanded Scholar Grades List */}
        {isGradesOpen && entry.grades && entry.grades.length > 0 && (
          <div
            className={`mt-3 pt-3 border-t grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs ${
              isDay ? 'border-slate-100 text-slate-700' : 'border-[#153c45] text-slate-300'
            }`}
          >
            {entry.grades.map((g, gIdx) => (
              <div key={gIdx} className="flex items-center justify-between gap-2 py-1">
                <span className="font-medium opacity-80">{g.name}</span>
                <span className="font-bold text-emerald-700 dark:text-emerald-300">{g.grade}</span>
              </div>
            ))}
          </div>
        )}
      </article>
    );
  };

  // Render helper for Legacy Curated Hadith Cards (Topics Tab + Hadith of the Day)
  const renderCuratedCard = (hadith: HadithItem) => {
    const isFav = favoriteIds.includes(hadith.id);
    const isCopied = copiedUid === hadith.id;
    const t = HADITH_TRANSLATIONS[hadith.id]?.[selectedLanguage];
    const translation = t?.translation || hadith.englishTranslation;
    const reflection = t?.reflection || hadith.reflection;
    const topicLabel = HADITH_TOPICS[hadith.topic]?.[selectedLanguage] || hadith.topic;
    const hadithKey = `hadith:${hadith.id}`;
    const hadithHl = highlightByItemKey[hadithKey];
    const hadithHlStyle = hadithHl ? HIGHLIGHT_COLOR_STYLES[hadithHl.color] : null;
    const hadithSource = `${hadith.book} #${hadith.hadithNumber}`;

    return (
      <article
        key={hadith.id}
        onClick={() => addCuratedToRecent(hadith.id)}
        data-highlight-section="hadith"
        data-highlight-source={hadithSource}
        className={`p-5 sm:p-6 rounded-3xl border transition-colors duration-200 ${
          hadithHlStyle
            ? isDay
              ? hadithHlStyle.cardDayClass
              : hadithHlStyle.cardNightClass
            : isFav
            ? isDay
              ? 'bg-[#fffdf5] border-amber-300'
              : 'bg-[#122b29] border-amber-500/45'
            : isDay
            ? 'bg-white border-slate-200 hover:border-emerald-300'
            : 'bg-[#0a2329] border-[#16444e] hover:border-emerald-500/50'
        }`}
      >
        <div
          className={`flex items-center justify-between gap-2 pb-3 mb-4 border-b text-xs ${
            isDay ? 'border-slate-100' : 'border-[#153c45]'
          }`}
        >
          <div className="flex flex-wrap items-center gap-2 font-bold">
            <span className="text-[#006A4E] dark:text-emerald-300">
              {hadith.book} #{hadith.hadithNumber}
            </span>
            <span aria-hidden="true" className="opacity-40">·</span>
            <span className={isDay ? 'text-slate-600' : 'text-slate-300'}>{hadith.grade}</span>
            <span aria-hidden="true" className="opacity-40">·</span>
            <span className={isDay ? 'text-slate-500' : 'text-slate-400'}>{topicLabel}</span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <HighlightMarkerButton
              itemKey={hadithKey}
              text={`${hadith.arabicText}\n\n"${translation}"`}
              source={hadithSource}
              section="hadith"
              selectedLanguage={selectedLanguage}
              themeMode={themeMode}
              soundEnabled={soundEnabled}
              variant="icon"
            />
            <button
              type="button"
              onClick={(e) => toggleCuratedFavorite(hadith.id, e)}
              className={`min-h-[40px] min-w-[40px] p-2 rounded-xl transition cursor-pointer flex items-center justify-center ${
                isFav
                  ? 'text-rose-500 bg-rose-500/10'
                  : isDay
                  ? 'text-slate-400 hover:text-rose-500 hover:bg-slate-100'
                  : 'text-slate-400 hover:text-rose-400 hover:bg-white/5'
              }`}
              aria-label="Favorite"
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
            </button>
            <button
              type="button"
              onClick={(e) => handleCopyCurated(hadith, e)}
              className={`min-h-[40px] min-w-[40px] p-2 rounded-xl transition cursor-pointer flex items-center justify-center ${
                isDay
                  ? 'text-slate-500 hover:text-[#006A4E] hover:bg-slate-100'
                  : 'text-emerald-300 hover:bg-white/5'
              }`}
              aria-label="Copy"
            >
              {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div
          dir="rtl"
          className={`font-arabic text-xl leading-[2] font-semibold mb-4 select-text ${
            isDay ? 'text-[#0a3c35]' : 'text-emerald-200'
          }`}
        >
          <HighlightableText
            text={hadith.arabicText}
            section="hadith"
            themeMode={themeMode}
            selectedLanguage={selectedLanguage}
            soundEnabled={soundEnabled}
          />
        </div>

        <p className={`text-sm sm:text-[15px] leading-relaxed select-text ${isDay ? 'text-slate-800' : 'text-slate-100'}`}>
          "<HighlightableText
            text={translation}
            section="hadith"
            themeMode={themeMode}
            selectedLanguage={selectedLanguage}
            soundEnabled={soundEnabled}
          />"
        </p>

        {reflection && (
          <div className={`mt-4 pt-3 border-t text-xs leading-relaxed ${isDay ? 'border-slate-100 text-[#006A4E]' : 'border-[#153c45] text-emerald-300'}`}>
            <strong>{HADITH_UI.reflection[selectedLanguage]}:</strong>{' '}
            <HighlightableText
              text={reflection}
              section="hadith"
              themeMode={themeMode}
              selectedLanguage={selectedLanguage}
              soundEnabled={soundEnabled}
            />
          </div>
        )}

        <div className={`mt-3 text-[11px] font-medium ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
          {HADITH_UI.narrator[selectedLanguage]}: {hadith.narrator}
        </div>
      </article>
    );
  };

  return (
    <div data-highlight-section="hadith" className="max-w-5xl mx-auto space-y-5 pb-8 animate-in fade-in duration-200">
      {/* UNIFIED HEADER (Matching QuranView style) */}
      {!selectedBookId && (
        <section
          className={`pb-3.5 border-b space-y-2.5 ${
            isDay ? 'border-[#dcebe8]' : 'border-[#163640]'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <BookOpen
                className={`w-5 h-5 shrink-0 ${
                  isDay ? 'text-[#006747]' : 'text-emerald-400'
                }`}
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1
                    className={`text-lg sm:text-xl font-black tracking-tight leading-none ${
                      isDay ? 'text-[#006747]' : 'text-white'
                    }`}
                  >
                    {isBn ? 'হাদিস গ্রন্থাগার' : 'Al-Hadith Library'}
                  </h1>
                  <span
                    className={`text-xs font-semibold font-arabic hidden xs:inline ${
                      isDay ? 'text-emerald-700/80' : 'text-emerald-300/80'
                    }`}
                  >
                    الْحَدِيثُ الشَّرِيفُ
                  </span>
                </div>
                <p
                  className={`text-[11px] leading-tight mt-0.5 ${
                    isDay ? 'text-slate-500' : 'text-slate-400'
                  }`}
                >
                  {isBn
                    ? '১৭টি কিতাব • ৫৩,০০০+ হাদিস • স্থায়ীভাবে সংরক্ষিত'
                    : '17 Books • 53,000+ Hadiths • Permanently Archived'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0 flex-wrap">
              {isOnline && (
                (() => {
                  const kutubIds = ['bukhari', 'muslim', 'tirmidhi', 'abudawud', 'nasai', 'ibnmajah'];
                  const allKutubSaved = kutubIds.every((id) => offlineStatuses[id]?.completed);
                  if (allKutubSaved) {
                    return (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-500/10">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{isBn ? 'সিহাহ সিত্তাহ অফলাইনে সেভ' : 'All 6 Books Offline'}</span>
                      </span>
                    );
                  }
                  return (
                    <button
                      type="button"
                      disabled={isDownloadingCorePack || Boolean(downloadingBookId)}
                      onClick={() => void handleDownloadCoreKutubOffline()}
                      className={`min-h-[36px] px-3 py-1.5 rounded-lg border text-[11px] font-extrabold flex items-center gap-1.5 transition cursor-pointer active:scale-95 disabled:opacity-60 ${
                        isDay
                          ? 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-800'
                          : 'bg-emerald-950/60 hover:bg-emerald-900/60 border-emerald-700/60 text-emerald-300'
                      }`}
                    >
                      {isDownloadingCorePack ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Download className="w-3.5 h-3.5" />
                      )}
                      <span>
                        {isDownloadingCorePack && corePackProgress
                          ? isBn
                            ? `${corePackProgress.label} (${formatNum(corePackProgress.current, true)}/${formatNum(corePackProgress.total, true)})`
                            : `${corePackProgress.label} (${corePackProgress.current}/${corePackProgress.total})`
                          : isBn
                          ? 'সব কিতাব অফলাইন সেভ'
                          : 'Save All Offline'}
                      </span>
                    </button>
                  );
                })()
              )}

              <button
                type="button"
                onClick={() => {
                  if (soundEnabled) soundHaptics.playTap();
                  setIsGlobalSearchOpen((prev) => {
                    if (prev) {
                      setGlobalQuery('');
                      setGlobalSearchResults(null);
                      setGlobalSearchError(null);
                    }
                    return !prev;
                  });
                }}
                className={`w-9 h-9 rounded-lg border flex items-center justify-center transition cursor-pointer active:scale-95 ${
                  isGlobalSearchOpen || globalQuery || globalSearchResults !== null
                    ? isDay
                      ? 'bg-[#006A4E] border-[#006A4E] text-white'
                      : 'bg-emerald-600 border-emerald-500 text-white'
                    : isDay
                    ? 'bg-white border-slate-200 text-slate-700 hover:border-emerald-400 hover:text-[#006A4E]'
                    : 'bg-[#0e1c26] border-[#1a3342] text-emerald-300 hover:border-emerald-500'
                }`}
                title={isBn ? 'খুঁজুন' : 'Search'}
                aria-label={isBn ? 'খুঁজুন' : 'Search'}
              >
                {isGlobalSearchOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {!isOnline && (
            <div
              className={`px-3.5 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 ${
                isDay
                  ? 'bg-amber-50 border-amber-200 text-amber-900'
                  : 'bg-amber-950/35 border-amber-700/50 text-amber-200'
              }`}
            >
              <WifiOff className="w-4 h-4 shrink-0" />
              <span>
                {isBn
                  ? 'অফলাইন মোড: চল্লিশ হাদিস, সকল কিতাবের সূচিপত্র, শুরুর অধ্যায়, বিষয়ভিত্তিক বাছাই ও সেভ করা হাদিস ইন্টারনেট ছাড়াই পড়তে পারবেন।'
                  : 'Offline Mode: 40 Hadith collections, all 17 book indexes, starter chapters, curated topics, and saved books are ready offline.'}
              </span>
            </div>
          )}

          {/* Expandable Global Hadith Number & Keyword Jump */}
          {(isGlobalSearchOpen || globalQuery.trim().length > 0 || globalSearchResults !== null) && (
            <form onSubmit={handleGlobalSearchSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-2 pt-1">
              <select
                value={globalBookId}
                onChange={(e) => setGlobalBookId(e.target.value)}
                aria-label={isBn ? 'হাদিস কিতাব নির্বাচন করুন' : 'Select Hadith book'}
                className={`sm:col-span-4 min-h-[42px] rounded-xl px-3 py-2 border text-xs sm:text-sm font-bold focus:outline-none cursor-pointer ${
                  isDay
                    ? 'bg-white border-slate-200 text-slate-800 focus:border-[#006747]'
                    : 'bg-[#0e1c26] border-[#1a3342] text-white focus:border-emerald-400'
                }`}
              >
                {HADIS_LIBRARY_BOOKS.map((b) => (
                  <option key={b.id} value={b.id} className="text-slate-900 bg-white">
                    {isBn ? `${b.bnName} (${formatNum(b.hadithCount, true)})` : `${b.enName} (${b.hadithCount})`}
                  </option>
                ))}
              </select>

              <div className="sm:col-span-6 relative">
                <Search className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${isDay ? 'text-slate-400' : 'text-emerald-300'}`} />
                <input
                  type="text"
                  autoFocus={isGlobalSearchOpen}
                  value={globalQuery}
                  onChange={(e) => setGlobalQuery(e.target.value)}
                  placeholder={
                    isBn
                      ? 'হাদিস নম্বর (যেমন: ৬৪০৭) বা শব্দ লিখে খুঁজুন...'
                      : 'Enter Hadith # (e.g. 6407) or keyword...'
                  }
                  className={`w-full min-h-[42px] rounded-xl pl-10 pr-9 py-2 border text-xs sm:text-sm focus:outline-none ${
                    isDay
                      ? 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-[#006747]'
                      : 'bg-[#0e1c26] border-[#1a3342] text-white placeholder:text-slate-400 focus:border-emerald-400'
                  }`}
                />
                {globalQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setGlobalQuery('');
                      setGlobalSearchResults(null);
                      setGlobalSearchError(null);
                    }}
                    aria-label="Clear search"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={!globalQuery.trim() || isGlobalSearching}
                className="sm:col-span-2 min-h-[42px] rounded-xl px-4 py-2 bg-[#006747] hover:bg-[#00553a] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition active:scale-95 disabled:opacity-50 cursor-pointer whitespace-nowrap"
              >
                {isGlobalSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                <span>{isBn ? 'খুঁজুন' : 'Find'}</span>
              </button>
            </form>
          )}
        </section>
      )}

      {/* Global Search Results Drawer */}
      {!selectedBookId && globalSearchResults !== null && (
        <section
          className={`rounded-3xl border p-4 sm:p-5 space-y-4 ${
            isDay ? 'bg-white border-emerald-200' : 'bg-[#071f25] border-[#174852]'
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            <div>
              <h2 className="text-sm sm:text-base font-extrabold">
                {isBn
                  ? `সার্চ ফলাফল: "${globalQuery}" (${formatNum(globalSearchTotal, true)}টি পাওয়া গেছে)`
                  : `Search Results for "${globalQuery}" (${globalSearchTotal} matches)`}
              </h2>
              <p className={`text-xs ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                {isBn
                  ? `${HADIS_LIBRARY_BOOKS.find((b) => b.id === globalBookId)?.bnName || globalBookId}`
                  : `${HADIS_LIBRARY_BOOKS.find((b) => b.id === globalBookId)?.enName || globalBookId}`}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setGlobalSearchResults(null);
                setGlobalSearchError(null);
              }}
              className={`min-h-[40px] px-3 py-1.5 rounded-xl border text-xs font-bold cursor-pointer ${
                isDay ? 'border-slate-200 text-slate-600 hover:bg-slate-50' : 'border-[#1d515c] text-slate-300 hover:bg-white/5'
              }`}
            >
              {isBn ? 'বন্ধ করুন' : 'Close'}
            </button>
          </div>

          {globalSearchError ? (
            <div className="flex items-center gap-2 text-xs text-rose-500 font-semibold">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{globalSearchError}</span>
            </div>
          ) : globalSearchResults.length === 0 ? (
            <p className={`text-xs py-4 text-center ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
              {isBn
                ? 'এই কিতাবে আপনার অনুসন্ধানের সাথে মিলে এমন হাদিস পাওয়া যায়নি। অন্য শব্দ বা সঠিক হাদিস নম্বর দিয়ে চেষ্টা করুন।'
                : 'No matching hadiths found in this book. Try another keyword or exact Hadith number.'}
            </p>
          ) : (
            <div className="space-y-4">
              {globalSearchResults.map((entry) => renderFullHadithCard(entry, true))}
            </div>
          )}
        </section>
      )}

      {/* Continue Reading Quick Bar */}
      {!selectedBookId && lastRead && activeTab === 'books' && (() => {
        const b = HADIS_LIBRARY_BOOKS.find((x) => x.id === lastRead.bookId);
        if (!b) return null;
        return (
          <button
            type="button"
            onClick={() => {
              if (soundEnabled) soundHaptics.playTap();
              setSelectedBookId(lastRead.bookId);
              setSelectedChapterId(lastRead.chapterId);
            }}
            className={`w-full text-left p-4 rounded-2xl border transition flex items-center justify-between gap-3 cursor-pointer ${
              isDay
                ? 'bg-emerald-50/70 hover:bg-emerald-100/70 border-emerald-200 text-slate-900'
                : 'bg-[#08252b] hover:bg-[#0d333b] border-emerald-700/50 text-white'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#006A4E] text-white flex items-center justify-center shrink-0">
                <BookmarkCheck className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-bold text-[#006A4E] dark:text-emerald-300">
                  {isBn ? 'যেখান থেকে পড়া শেষ করেছিলেন' : 'Continue Reading'}
                </div>
                <div className="text-sm font-extrabold truncate">
                  {isBn ? b.bnName : b.enName} · {isBn ? lastRead.chapterTitleBn : lastRead.chapterTitleEn}
                </div>
              </div>
            </div>
            <span className="text-xs font-extrabold text-[#006A4E] dark:text-emerald-300 flex items-center gap-1 whitespace-nowrap shrink-0">
              <span>{isBn ? 'পড়ুন' : 'Resume'}</span>
              <ChevronRight className="w-4 h-4" />
            </span>
          </button>
        );
      })()}

      {/* TOP PRIMARY TABS (Visible at Library Root) */}
      {!selectedBookId && (
        <div
          className={`p-1.5 rounded-2xl border flex items-center gap-1.5 overflow-x-auto scrollbar-none ${
            isDay ? 'bg-white border-slate-200' : 'bg-[#082228] border-[#16444e]'
          }`}
        >
          <button
            type="button"
            onClick={() => {
              setActiveTab('books');
              if (soundEnabled) soundHaptics.playTap();
            }}
            className={`min-h-[44px] flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap shrink-0 transition cursor-pointer ${
              activeTab === 'books'
                ? 'bg-[#006A4E] text-white shadow-xs'
                : isDay
                ? 'text-slate-600 hover:bg-slate-100'
                : 'text-emerald-200 hover:bg-white/5'
            }`}
          >
            <Library className="w-4 h-4" />
            <span>{isBn ? `হাদিস গ্রন্থসমূহ (${formatNum(HADIS_LIBRARY_BOOKS.length, true)})` : `Hadith Books (${HADIS_LIBRARY_BOOKS.length})`}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('topics');
              if (soundEnabled) soundHaptics.playTap();
            }}
            className={`min-h-[44px] flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap shrink-0 transition cursor-pointer ${
              activeTab === 'topics'
                ? 'bg-[#006A4E] text-white shadow-xs'
                : isDay
                ? 'text-slate-600 hover:bg-slate-100'
                : 'text-emerald-200 hover:bg-white/5'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{isBn ? 'বিষয়ভিত্তিক বাছাই' : 'Curated Topics'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('saved');
              if (soundEnabled) soundHaptics.playTap();
            }}
            className={`min-h-[44px] flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap shrink-0 transition cursor-pointer ${
              activeTab === 'saved'
                ? 'bg-[#006A4E] text-white shadow-xs'
                : isDay
                ? 'text-slate-600 hover:bg-slate-100'
                : 'text-emerald-200 hover:bg-white/5'
            }`}
          >
            <Heart className="w-4 h-4 text-rose-400" />
            <span>
              {isBn
                ? `সংরক্ষিত (${formatNum(savedFullHadiths.length + favoriteIds.length, true)})`
                : `Saved (${savedFullHadiths.length + favoriteIds.length})`}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('recent');
              if (soundEnabled) soundHaptics.playTap();
            }}
            className={`min-h-[44px] flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap shrink-0 transition cursor-pointer ${
              activeTab === 'recent'
                ? 'bg-[#006A4E] text-white shadow-xs'
                : isDay
                ? 'text-slate-600 hover:bg-slate-100'
                : 'text-emerald-200 hover:bg-white/5'
            }`}
          >
            <History className="w-4 h-4" />
            <span>{isBn ? 'সর্বশেষ পঠিত' : 'Recently Read'}</span>
          </button>
        </div>
      )}

      {/* =================================================================== */}
      {/* VIEW 1: ALL 17 CANONICAL BOOKS SHELF                                */}
      {/* =================================================================== */}
      {!selectedBookId && activeTab === 'books' && (
        <div className="space-y-4">
          {/* Book Category Segmented Controls */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'all' as BookCategoryFilter, labelBn: `সকল কিতাব (${toBnNum(HADIS_LIBRARY_BOOKS.length)})`, labelEn: `All Books (${HADIS_LIBRARY_BOOKS.length})` },
              { id: 'kutub_sittah' as BookCategoryFilter, labelBn: 'সিহাহ সিত্তাহ (৬ কিতাব)', labelEn: 'Kutub al-Sittah (6)' },
              { id: 'sunnah_core' as BookCategoryFilter, labelBn: 'মুয়াত্তা ও চল্লিশ হাদিস', labelEn: 'Muwatta & 40 Hadith' },
              { id: 'extended' as BookCategoryFilter, labelBn: 'অতিরিক্ত প্রসিদ্ধ কিতাব (৯টি)', labelEn: 'Extended Compendiums (9)' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setCategoryFilter(cat.id);
                  if (soundEnabled) soundHaptics.playTap();
                }}
                className={`min-h-[40px] px-3.5 py-2 rounded-xl border text-xs font-bold whitespace-nowrap shrink-0 transition cursor-pointer ${
                  categoryFilter === cat.id
                    ? 'bg-[#006A4E] text-white border-transparent shadow-xs'
                    : isDay
                    ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    : 'bg-[#0a2329] border-[#16444e] text-slate-300 hover:bg-[#0e2e36]'
                }`}
              >
                {isBn ? cat.labelBn : cat.labelEn}
              </button>
            ))}
          </div>

          {/* Responsive Book Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {visibleBooks.map((book: HadisBookDefinition) => {
              const title = isBn ? book.bnName : book.titles[selectedLanguage] || book.enName;
              const compiler = isBn ? book.compilerBn : book.compilerEn;
              const desc = isBn ? book.shortDescBn : book.shortDescEn;
              const isOfflineReady = Boolean(offlineStatuses[book.id]?.completed);

              return (
                <button
                  key={book.id}
                  type="button"
                  onClick={() => {
                    if (soundEnabled) soundHaptics.playTap();
                    setSelectedBookId(book.id);
                    setSelectedChapterId(null);
                  }}
                  className={`w-full text-left p-4 sm:p-5 rounded-3xl border transition-all cursor-pointer group flex items-start gap-3.5 ${
                    isDay
                      ? 'bg-white hover:bg-emerald-50/40 border-slate-200 hover:border-[#006A4E]'
                      : 'bg-[#0a2329] hover:bg-[#0e2f36] border-[#16444e] hover:border-emerald-400/60'
                  }`}
                >
                  {/* Calligraphic Arabic Book Spine Monogram */}
                  <div
                    className={`w-12 h-14 rounded-2xl bg-gradient-to-br ${book.accentGradient} text-white shrink-0 flex flex-col items-center justify-center shadow-sm border border-white/15`}
                  >
                    <span dir="rtl" className="font-arabic text-xl font-bold leading-none">
                      {book.monogram}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h2 className={`text-sm sm:text-base font-extrabold leading-snug ${isDay ? 'text-slate-900' : 'text-white'}`}>
                        {title}
                      </h2>
                      <span
                        dir="rtl"
                        className={`font-arabic text-sm sm:text-base font-bold shrink-0 ${
                          isDay ? 'text-[#006A4E]' : 'text-emerald-300'
                        }`}
                      >
                        {book.arabicName}
                      </span>
                    </div>

                    <p className={`text-xs truncate ${isDay ? 'text-slate-600' : 'text-slate-300'}`}>
                      {compiler}
                    </p>

                    <p className={`text-[11px] line-clamp-2 leading-relaxed ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                      {desc}
                    </p>

                    {/* Unboxed Clean Metadata Strip */}
                    <div className="pt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-bold tabular-nums">
                      <span className={isDay ? 'text-[#006A4E]' : 'text-emerald-300'}>
                        {isBn
                          ? `${formatNum(book.chaptersCount, true)} অধ্যায়`
                          : `${book.chaptersCount} Chapters`}
                      </span>
                      <span aria-hidden="true" className="opacity-40">·</span>
                      <span className={isDay ? 'text-slate-700' : 'text-slate-200'}>
                        {isBn
                          ? `${formatNum(book.hadithCount.toLocaleString('en-US'), true)} হাদিস`
                          : `${book.hadithCount.toLocaleString()} Hadiths`}
                      </span>
                      <span aria-hidden="true" className="opacity-40">·</span>
                      <span className={book.hasNativeBangla ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-300'}>
                        {book.hasNativeBangla
                          ? isBn
                            ? 'আরবি ও পূর্ণ বাংলা'
                            : 'Arabic & Multilingual'
                          : isBn
                          ? 'আরবি, ইংরেজি + বাংলা অনুবাদ'
                          : 'Arabic & English'}
                      </span>
                      {isOfflineReady && (
                        <>
                          <span aria-hidden="true" className="opacity-40">·</span>
                          <span className="text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            <span>{isBn ? 'অফলাইনে সংরক্ষিত' : 'Offline Ready'}</span>
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* VIEW 2: SELECTED BOOK — KITAB COVER & PRINTED FIHRIST (BOOK INDEX)  */}
      {/* =================================================================== */}
      {selectedBookId && selectedBookDef && !selectedChapterId && (
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Compact Top Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => {
                if (soundEnabled) soundHaptics.playTap();
                stepBackOr(() => setSelectedBookId(null));
              }}
              className={`min-h-[40px] px-3.5 py-2 rounded-xl border text-xs font-extrabold flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap shrink-0 ${
                isDay
                  ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                  : 'bg-[#0e1c26] hover:bg-[#132634] border-[#1a3342] text-emerald-200'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{isBn ? 'সকল কিতাব' : 'All Books'}</span>
            </button>

            <div className="flex items-center gap-2">
              {downloadingBookId === selectedBookId ? (
                <div className="flex items-center gap-2">
                  <div className="text-xs font-bold text-emerald-700 dark:text-emerald-300 tabular-nums">
                    {isBn
                      ? `ডাউনলোড: ${formatNum(downloadProgress.done, true)}/${formatNum(downloadProgress.total, true)} অধ্যায়`
                      : `Saving ${downloadProgress.done}/${downloadProgress.total} chapters`}
                  </div>
                  <button
                    type="button"
                    onClick={() => downloadAbortRef.current?.abort()}
                    className="min-h-[38px] px-3 py-1.5 rounded-xl bg-rose-500/15 text-rose-600 dark:text-rose-300 text-xs font-bold cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {isBn ? 'বাতিল' : 'Cancel'}
                  </button>
                </div>
              ) : offlineStatuses[selectedBookId]?.completed ? (
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="hidden sm:inline">{isBn ? 'ডিভাইসে সংরক্ষিত' : 'Saved on Device'}</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => void handleDownloadBookOffline(selectedBookId)}
                  className={`min-h-[40px] px-3 py-2 rounded-xl border text-xs font-extrabold flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap shrink-0 ${
                    isDay
                      ? 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-800'
                      : 'bg-emerald-950/60 hover:bg-emerald-900/60 border-emerald-700/60 text-emerald-300'
                  }`}
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">{isBn ? 'অফলাইন সেভ' : 'Save Offline'}</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  if (soundEnabled) soundHaptics.playTap();
                  setIsBookSearchOpen((prev) => {
                    if (prev) {
                      setBookSearchQuery('');
                      setChapterFilterQuery('');
                    }
                    return !prev;
                  });
                }}
                className={`w-10 h-10 rounded-xl border flex items-center justify-center transition cursor-pointer active:scale-95 shrink-0 ${
                  isBookSearchOpen || bookSearchQuery || chapterFilterQuery
                    ? 'bg-emerald-700 border-emerald-700 text-white'
                    : isDay
                    ? 'bg-white border-slate-200 text-slate-700 hover:border-emerald-400 hover:text-emerald-800'
                    : 'bg-[#0e1c26] border-[#1a3342] text-emerald-300 hover:border-emerald-500'
                }`}
                title={isBn ? 'কিতাবে খুঁজুন' : 'Search in book'}
                aria-label={isBn ? 'কিতাবে খুঁজুন' : 'Search in book'}
              >
                {isBookSearchOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Kitab Inner Title Cover Page (মলাট / গ্রন্থ পরিচিতি পৃষ্ঠা) */}
          <section
            className={`rounded-3xl border shadow-sm p-3 sm:p-4 ${
              isDay
                ? 'bg-[#fffdf7] border-[#dfd6be]'
                : 'bg-[#071f24] border-[#194650]'
            }`}
          >
            <div
              className={`rounded-2xl border px-4 py-6 sm:px-8 sm:py-7 text-center space-y-2.5 ${
                isDay ? 'border-[#ebe4d0]' : 'border-[#143a42]'
              }`}
            >
              <div className="flex justify-center">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${selectedBookDef.accentGradient} text-white flex items-center justify-center shadow-sm border border-white/20`}
                >
                  <span dir="rtl" className="font-arabic text-2xl font-bold leading-none">
                    {selectedBookDef.monogram}
                  </span>
                </div>
              </div>

              <div dir="rtl" className="font-arabic text-2xl sm:text-3xl font-bold text-emerald-800 dark:text-emerald-300 leading-snug pt-0.5">
                {selectedBookDef.arabicName}
              </div>

              <h2 className={`text-xl sm:text-2xl font-black tracking-tight ${isDay ? 'text-slate-900' : 'text-white'}`}>
                {isBn ? selectedBookDef.bnName : selectedBookDef.titles[selectedLanguage] || selectedBookDef.enName}
              </h2>

              <p className={`text-xs sm:text-sm font-semibold ${isDay ? 'text-slate-600' : 'text-slate-300'}`}>
                {isBn ? `সংকলক: ${selectedBookDef.compilerBn}` : `Compiled by ${selectedBookDef.compilerEn}`}
              </p>

              <div
                className={`flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-xs font-bold tabular-nums pt-1 ${
                  isDay ? 'text-emerald-800' : 'text-emerald-300'
                }`}
              >
                <span>
                  {isBn ? `${formatNum(selectedBookDef.chaptersCount, true)}টি অধ্যায়` : `${selectedBookDef.chaptersCount} Chapters`}
                </span>
                <span aria-hidden="true" className="opacity-40">·</span>
                <span>
                  {isBn
                    ? `${formatNum(selectedBookDef.hadithCount.toLocaleString('en-US'), true)}টি হাদিস`
                    : `${selectedBookDef.hadithCount.toLocaleString()} Hadiths`}
                </span>
                <span aria-hidden="true" className="opacity-40">·</span>
                <span>{isBn ? 'স্থায়ী সংরক্ষিত কিতাব' : 'Permanently Archived'}</span>
              </div>

              <p className={`max-w-2xl mx-auto text-xs leading-relaxed pt-1 ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                {isBn ? selectedBookDef.shortDescBn : selectedBookDef.shortDescEn}
              </p>
            </div>
          </section>

          {/* Expandable Book-Wide Search & Chapter Filter Controls */}
          {(isBookSearchOpen || bookSearchQuery.trim().length > 0 || chapterFilterQuery.trim().length > 0) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 animate-in fade-in duration-150">
              <form onSubmit={handleBookSearchSubmit} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    autoFocus={isBookSearchOpen}
                    value={bookSearchQuery}
                    onChange={(e) => setBookSearchQuery(e.target.value)}
                    placeholder={
                      isBn
                        ? `এই কিতাবে হাদিস নং বা শব্দ খুঁজুন...`
                        : `Search Hadith # or text in this book...`
                    }
                    className={`w-full min-h-[42px] rounded-xl pl-9 pr-3 py-2 border text-xs sm:text-sm focus:outline-none ${
                      isDay
                        ? 'bg-white border-slate-200 text-slate-900 focus:border-emerald-700'
                        : 'bg-[#0e1c26] border-[#1a3342] text-white focus:border-emerald-400'
                    }`}
                  />
                </div>
                <button
                  type="submit"
                  disabled={!bookSearchQuery.trim() || isSearchingBook}
                  className="min-h-[42px] px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-extrabold transition active:scale-95 disabled:opacity-50 cursor-pointer shrink-0 whitespace-nowrap"
                >
                  {isSearchingBook ? <Loader2 className="w-4 h-4 animate-spin" /> : isBn ? 'খুঁজুন' : 'Search'}
                </button>
              </form>

              <div className="relative">
                <SlidersHorizontal className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={chapterFilterQuery}
                  onChange={(e) => setChapterFilterQuery(e.target.value)}
                  placeholder={isBn ? 'অধ্যায়ের নাম দিয়ে সূচিপত্রে খুঁজুন...' : 'Filter table of contents by title or #...'}
                  className={`w-full min-h-[42px] rounded-xl pl-9 pr-9 py-2 border text-xs sm:text-sm focus:outline-none ${
                    isDay
                      ? 'bg-white border-slate-200 text-slate-900 focus:border-emerald-700'
                      : 'bg-[#0e1c26] border-[#1a3342] text-white focus:border-emerald-400'
                  }`}
                />
                {chapterFilterQuery && (
                  <button
                    type="button"
                    onClick={() => setChapterFilterQuery('')}
                    aria-label={isBn ? 'মুছুন' : 'Clear'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Book Search Results */}
          {bookSearchResults !== null && (
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-sm font-extrabold">
                  {isBn
                    ? `খুঁজে পাওয়া হাদিস (${formatNum(bookSearchTotal, true)}টি)`
                    : `Found Hadiths (${bookSearchTotal})`}
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setBookSearchResults(null);
                    setBookSearchError(null);
                  }}
                  className="text-xs font-bold text-emerald-700 dark:text-emerald-300 underline cursor-pointer"
                >
                  {isBn ? 'সূচিপত্রে ফিরুন' : 'Back to Table of Contents'}
                </button>
              </div>
              {bookSearchError && (
                <div className="text-xs font-semibold text-rose-500">{bookSearchError}</div>
              )}
              {bookSearchResults.length === 0 ? (
                <div className={`p-6 rounded-2xl border text-center text-xs ${isDay ? 'bg-white border-slate-200 text-slate-500' : 'bg-[#0a2329] border-[#16444e] text-slate-400'}`}>
                  {isBn ? 'কোনো হাদিস পাওয়া যায়নি।' : 'No matching hadiths found.'}
                </div>
              ) : (
                <div className="space-y-3.5">
                  {bookSearchResults.map((entry) => renderFullHadithCard(entry, false, 'card'))}
                </div>
              )}
            </div>
          )}

          {/* Printed Kitab Fihrist / Table of Contents Page (সূচিপত্র পৃষ্ঠা) */}
          {bookSearchResults === null && (
            <>
              {isLoadingChapters ? (
                <div className={`p-10 rounded-3xl border text-center space-y-2 ${isDay ? 'bg-[#fffdf7] border-[#dfd6be]' : 'bg-[#071f24] border-[#194650]'}`}>
                  <Loader2 className="w-7 h-7 animate-spin mx-auto text-emerald-700 dark:text-emerald-400" />
                  <p className="text-xs font-bold">
                    {isBn ? 'কিতাবের সূচিপত্র খোলা হচ্ছে...' : 'Opening book table of contents...'}
                  </p>
                </div>
              ) : chaptersError ? (
                <div className={`p-6 rounded-3xl border text-center space-y-3 ${isDay ? 'bg-white border-rose-200' : 'bg-[#0a2329] border-rose-500/40'}`}>
                  <AlertCircle className="w-7 h-7 text-rose-500 mx-auto" />
                  <p className="text-xs font-bold text-rose-600 dark:text-rose-300">{chaptersError}</p>
                  <button
                    type="button"
                    onClick={() => {
                      const id = selectedBookId;
                      setSelectedBookId(null);
                      setTimeout(() => setSelectedBookId(id), 10);
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold cursor-pointer"
                  >
                    {isBn ? 'আবার চেষ্টা করুন' : 'Retry'}
                  </button>
                </div>
              ) : (
                <section
                  className={`rounded-3xl border shadow-sm overflow-hidden ${
                    isDay
                      ? 'bg-[#fffdf7] border-[#dfd6be]'
                      : 'bg-[#071f24] border-[#194650]'
                  }`}
                >
                  {/* Fihrist Header Rule */}
                  <div
                    className={`px-5 sm:px-7 py-3.5 border-b-2 flex items-center justify-between gap-3 ${
                      isDay
                        ? 'bg-[#faf4e4]/70 border-[#e4dbc3] text-slate-800'
                        : 'bg-[#0b272d] border-[#1a4952] text-emerald-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-emerald-700 dark:text-emerald-300" />
                      <h3 className="text-sm font-black tracking-tight">
                        {isBn ? 'সূচিপত্র · অধ্যায়সমূহ' : 'Table of Contents · Chapters'}
                      </h3>
                    </div>
                    <span className={`text-[11px] font-bold tabular-nums ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                      {isBn
                        ? `মোট ${formatNum(filteredChapters.length, true)} অধ্যায়`
                        : `${filteredChapters.length} Chapters`}
                    </span>
                  </div>

                  {/* Quick Inline Filter when user hasn't opened top search */}
                  {chapters.length > 12 && !isBookSearchOpen && !chapterFilterQuery && (
                    <div
                      className={`px-5 sm:px-7 py-2.5 border-b ${
                        isDay ? 'border-[#efe9d8] bg-[#fffef9]' : 'border-[#12373e] bg-[#082227]'
                      }`}
                    >
                      <div className="relative">
                        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          value={chapterFilterQuery}
                          onChange={(e) => setChapterFilterQuery(e.target.value)}
                          placeholder={isBn ? 'অধ্যায়ের নাম বা হাদিস নম্বর দিয়ে সূচিপত্র ফিল্টার করুন...' : 'Filter chapters by title or hadith #...'}
                          className={`w-full min-h-[36px] rounded-xl pl-8 pr-3 py-1.5 border text-xs focus:outline-none ${
                            isDay
                              ? 'bg-white border-[#e5dec9] text-slate-800 focus:border-emerald-700'
                              : 'bg-[#06181c] border-[#18444d] text-white focus:border-emerald-400'
                          }`}
                        />
                      </div>
                    </div>
                  )}

                  {/* Book Index Ledger Rows */}
                  {filteredChapters.length === 0 ? (
                    <div className="p-8 text-center text-xs text-slate-500 dark:text-slate-400">
                      {isBn ? 'এই নামে কোনো অধ্যায় পাওয়া যায়নি।' : 'No matching chapters found.'}
                    </div>
                  ) : (
                    <div className={`divide-y divide-dashed ${isDay ? 'divide-[#e6dec8]' : 'divide-[#153f48]'}`}>
                      {filteredChapters.map((ch) => {
                        const estPages = Math.max(1, Math.ceil(ch.count / PAGE_SIZE));
                        return (
                          <button
                            key={ch.chapterId}
                            type="button"
                            onClick={() => {
                              if (soundEnabled) soundHaptics.playTap();
                              setSelectedChapterId(ch.chapterId);
                            }}
                            className={`w-full text-left px-4 sm:px-7 py-3.5 sm:py-4 transition flex items-center justify-between gap-3 cursor-pointer group ${
                              isDay
                                ? 'hover:bg-emerald-50/55'
                                : 'hover:bg-[#0d2d34]'
                            }`}
                          >
                            <div className="flex items-center gap-3.5 min-w-0 flex-1">
                              <div
                                className={`w-9 h-9 rounded-xl shrink-0 border flex items-center justify-center font-mono text-xs font-extrabold tabular-nums transition ${
                                  isDay
                                    ? 'bg-[#faf5e6] border-[#e4dbc2] text-emerald-800 group-hover:bg-emerald-700 group-hover:text-white group-hover:border-emerald-700'
                                    : 'bg-[#06181c] border-[#1a4b54] text-emerald-300 group-hover:bg-emerald-600 group-hover:text-white'
                                }`}
                              >
                                {formatNum(ch.chapterId, isBn)}
                              </div>

                              <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                                  <span className={`text-sm font-extrabold leading-snug ${isDay ? 'text-slate-900' : 'text-white'}`}>
                                    {isBn ? ch.titleBn : ch.titleEn}
                                  </span>
                                  {ch.titleAr && (
                                    <span dir="rtl" className="font-arabic text-sm font-bold text-emerald-700 dark:text-emerald-300 shrink-0">
                                      {ch.titleAr}
                                    </span>
                                  )}
                                </div>
                                {isBn && ch.titleBn !== ch.titleEn && (
                                  <div className={`text-[11px] truncate mt-0.5 ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                                    {ch.titleEn}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-3 shrink-0 text-right">
                              <div className="tabular-nums">
                                <div className={`text-[11px] sm:text-xs font-extrabold ${isDay ? 'text-emerald-800' : 'text-emerald-300'}`}>
                                  {isBn
                                    ? `হাদিস ${formatNum(ch.hadithFirst, true)}–${formatNum(ch.hadithLast, true)}`
                                    : `#${ch.hadithFirst}–${ch.hadithLast}`}
                                </div>
                                <div className={`text-[10px] font-semibold ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                                  {isBn
                                    ? `${formatNum(ch.count, true)}টি · ${formatNum(estPages, true)} পৃষ্ঠা`
                                    : `${ch.count} hadiths · ${estPages} pg`}
                                  {(offlineStatuses[selectedBookId]?.completed || cachedChapterIds.includes(String(ch.chapterId))) && (
                                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                                      {isBn ? ' · অফলাইন' : ' · Offline'}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 shrink-0 transition-transform group-hover:translate-x-0.5" />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Fihrist Bottom Folio Rule */}
                  <div
                    className={`px-6 py-3 border-t text-center text-[11px] font-semibold ${
                      isDay
                        ? 'bg-[#faf4e4]/50 border-[#ebe4d0] text-slate-500'
                        : 'bg-[#06191d] border-[#143a42] text-slate-400'
                    }`}
                  >
                    {isBn
                      ? 'যেকোনো অধ্যায়ে ক্লিক করে কিতাবের পৃষ্ঠা খুলুন'
                      : 'Select any chapter row to open its book pages'}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      )}

      {/* =================================================================== */}
      {/* VIEW 3: SELECTED CHAPTER — BOOK-PAGE HADITH READER ("কিতাবের পৃষ্ঠা") */}
      {/* =================================================================== */}
      {selectedBookId && selectedBookDef && selectedChapterId && (
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Top Reader Utility Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => {
                if (soundEnabled) soundHaptics.playTap();
                stepBackOr(() => setSelectedChapterId(null));
              }}
              className={`min-h-[40px] px-3.5 py-2 rounded-xl border text-xs font-extrabold flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap shrink-0 ${
                isDay
                  ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                  : 'bg-[#0a2329] hover:bg-[#0e3038] border-[#1a4c56] text-emerald-200'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{chapters.length <= 1 ? (isBn ? 'সকল কিতাব' : 'All Books') : (isBn ? 'সূচিপত্র' : 'Contents')}</span>
            </button>

            <div className="flex flex-wrap items-center gap-1.5">
              <div
                className={`flex items-center p-1 rounded-xl border ${
                  isDay ? 'bg-white border-slate-200' : 'bg-[#06181c] border-[#174650]'
                }`}
              >
                {[
                  { id: 'both' as ReaderDisplayMode, bn: 'আরবি + অনুবাদ', en: 'Both' },
                  { id: 'translation' as ReaderDisplayMode, bn: 'শুধু অনুবাদ', en: 'Text' },
                  { id: 'arabic' as ReaderDisplayMode, bn: 'আরবি', en: 'Arabic' },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setDisplayMode(m.id)}
                    className={`min-h-[32px] px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer whitespace-nowrap shrink-0 ${
                      displayMode === m.id
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : isDay
                        ? 'text-slate-600 hover:text-slate-900'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {isBn ? m.bn : m.en}
                  </button>
                ))}
              </div>

              <div
                className={`flex items-center gap-0.5 p-1 rounded-xl border ${
                  isDay ? 'bg-white border-slate-200' : 'bg-[#06181c] border-[#174650]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setFontScale((s) => Math.max(0.85, Number((s - 0.1).toFixed(2))))}
                  className="min-h-[32px] min-w-[32px] px-2 rounded-lg text-xs font-extrabold hover:bg-slate-100 dark:hover:bg-white/10 cursor-pointer"
                  aria-label="Decrease font size"
                >
                  A-
                </button>
                <button
                  type="button"
                  onClick={() => setFontScale((s) => Math.min(1.45, Number((s + 0.1).toFixed(2))))}
                  className="min-h-[32px] min-w-[32px] px-2 rounded-lg text-xs font-extrabold hover:bg-slate-100 dark:hover:bg-white/10 cursor-pointer"
                  aria-label="Increase font size"
                >
                  A+
                </button>
              </div>
            </div>
          </div>

          {/* Physical Kitab Page Sheet */}
          {isLoadingHadiths ? (
            <div className={`p-12 rounded-3xl border text-center space-y-2.5 shadow-sm ${isDay ? 'bg-[#fffdf7] border-[#dfd6be]' : 'bg-[#071f24] border-[#194650]'}`}>
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-emerald-700 dark:text-emerald-400" />
              <p className="text-xs font-bold">
                {isBn ? 'কিতাবের পৃষ্ঠা ও হাদিসসমূহ খোলা হচ্ছে...' : 'Opening book pages...'}
              </p>
            </div>
          ) : hadithsError ? (
            <div className="space-y-4">
              <div className={`p-6 rounded-3xl border text-center space-y-3 ${isDay ? 'bg-[#fffdf7] border-amber-200' : 'bg-[#0a2329] border-amber-500/40'}`}>
                <WifiOff className="w-8 h-8 text-amber-500 mx-auto" />
                <p className="text-sm font-extrabold">
                  {isBn
                    ? 'এই অধ্যায়টি এখনো অফলাইনে সংরক্ষিত নয়'
                    : 'This chapter is not saved offline yet'}
                </p>
                <p className={`text-xs max-w-md mx-auto ${isDay ? 'text-slate-600' : 'text-slate-300'}`}>
                  {isBn
                    ? 'ইন্টারনেট চালু হলে পুরো কিতাবটি "অফলাইন সেভ" করে নিন। নিচে এই কিতাবের সংরক্ষিত অফলাইন অধ্যায় ও বাছাইকৃত সহীহ হাদিস পড়তে পারেন:'
                    : 'Connect to the internet once to save the full book offline. Meanwhile, you can read the offline chapters and authentic hadiths from this collection below:'}
                </p>

                <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                  {cachedChapterIds.slice(0, 4).map((cid) => {
                    const chMeta = chapters.find((c) => String(c.chapterId) === String(cid));
                    return (
                      <button
                        key={cid}
                        type="button"
                        onClick={() => setSelectedChapterId(cid)}
                        className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold cursor-pointer"
                      >
                        {chMeta
                          ? isBn
                            ? `${chMeta.titleBn} (অফলাইন)`
                            : `${chMeta.titleEn} (Offline)`
                          : isBn
                          ? `অধ্যায় ${formatNum(cid, true)} (অফলাইন)`
                          : `Chapter ${cid} (Offline)`}
                      </button>
                    );
                  })}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedChapterId(null);
                      setSelectedBookId(null);
                      setActiveTab('topics');
                    }}
                    className={`px-3.5 py-2 rounded-xl border text-xs font-bold cursor-pointer ${
                      isDay ? 'bg-white border-slate-200 text-slate-800' : 'bg-[#06181c] border-[#1a4b54] text-emerald-200'
                    }`}
                  >
                    {isBn ? 'বিষয়ভিত্তিক হাদিস (অফলাইন)' : 'Curated Offline Hadiths'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const cid = selectedChapterId;
                      setSelectedChapterId(null);
                      setTimeout(() => setSelectedChapterId(cid), 10);
                    }}
                    className={`px-3.5 py-2 rounded-xl border text-xs font-bold cursor-pointer ${
                      isDay ? 'bg-white border-slate-200 text-slate-700' : 'bg-[#06181c] border-[#1a4b54] text-slate-200'
                    }`}
                  >
                    {isBn ? 'পুনরায় চেষ্টা করুন' : 'Retry'}
                  </button>
                </div>
              </div>

              <div className="space-y-3.5">
                {getCuratedOfflineHadithsForBook(selectedBookId, selectedLanguage).map((entry) =>
                  renderFullHadithCard(entry, true, 'card')
                )}
              </div>
            </div>
          ) : (
            <div
              className={`rounded-3xl border shadow-sm overflow-hidden ${
                isDay
                  ? 'bg-[#fffdf7] border-[#dfd6be]'
                  : 'bg-[#071f24] border-[#194650]'
              }`}
            >
              {/* Running Book Page Top Header (কিতাবের উপরের শিরোনাম ও পৃষ্ঠা নং) */}
              <div
                className={`px-5 sm:px-8 py-3 border-b flex flex-wrap items-center justify-between gap-2 text-xs font-bold ${
                  isDay
                    ? 'bg-[#faf4e4]/75 border-[#e6dec8] text-slate-700'
                    : 'bg-[#0b272d] border-[#184650] text-emerald-200'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-extrabold text-emerald-800 dark:text-emerald-300 truncate">
                    {isBn ? selectedBookDef.bnName : selectedBookDef.enName}
                  </span>
                  <span aria-hidden="true" className="opacity-40">·</span>
                  <span className="tabular-nums truncate">
                    {isBn ? `অধ্যায় ${formatNum(selectedChapterId, true)}` : `Chapter ${selectedChapterId}`}
                  </span>
                </div>

                <div className="tabular-nums font-extrabold text-emerald-800 dark:text-emerald-300 shrink-0">
                  {isBn
                    ? `পৃষ্ঠা ${formatNum(chapterPage, true)} / ${formatNum(totalPages, true)}`
                    : `Page ${chapterPage} of ${totalPages}`}
                </div>
              </div>

              {/* Centered Classical Chapter Title Heading */}
              <div
                className={`px-5 sm:px-8 py-5 border-b text-center space-y-1 ${
                  isDay ? 'border-[#ebe4d0]' : 'border-[#153f48]'
                }`}
              >
                {chapterData?.titleAr && (
                  <div dir="rtl" className="font-arabic text-xl font-bold text-emerald-800 dark:text-emerald-300">
                    {chapterData.titleAr}
                  </div>
                )}
                <h2 className={`text-lg sm:text-xl font-black tracking-tight ${isDay ? 'text-slate-900' : 'text-white'}`}>
                  {chapterData
                    ? isBn
                      ? chapterData.titleBn
                      : chapterData.titleEn
                    : isBn
                    ? 'অধ্যায় লোড হচ্ছে...'
                    : 'Loading chapter...'}
                </h2>
                {chapterData && isBn && chapterData.titleBn !== chapterData.titleEn && (
                  <div className={`text-xs ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                    {chapterData.titleEn}
                  </div>
                )}
                {chapterData && (
                  <div className={`text-[11px] font-bold tabular-nums pt-0.5 ${isDay ? 'text-emerald-800/80' : 'text-emerald-300/80'}`}>
                    {isBn
                      ? `মোট ${formatNum(chapterHadiths.length, true)}টি হাদিস · এই পৃষ্ঠায় ${formatNum(
                          (chapterPage - 1) * PAGE_SIZE + 1,
                          true
                        )}–${formatNum(Math.min(chapterPage * PAGE_SIZE, chapterHadiths.length), true)} নং ক্রম`
                      : `${chapterHadiths.length} hadiths total · Showing ${(chapterPage - 1) * PAGE_SIZE + 1}–${Math.min(
                          chapterPage * PAGE_SIZE,
                          chapterHadiths.length
                        )}`}
                  </div>
                )}
              </div>

              {/* Flowing Printed Book Hadith Entries with Ornamental Hairline Dividers */}
              <div className="py-1">
                {paginatedHadiths.map((entry, idx) => (
                  <React.Fragment key={entry.uid}>
                    {idx > 0 && (
                      <div className="px-6 sm:px-10 flex items-center gap-3" aria-hidden="true">
                        <div className={`h-px flex-1 ${isDay ? 'bg-[#ebe4d0]' : 'bg-[#143c44]'}`} />
                        <span className={`text-xs select-none ${isDay ? 'text-emerald-700/50' : 'text-emerald-400/50'}`}>
                          ❖
                        </span>
                        <div className={`h-px flex-1 ${isDay ? 'bg-[#ebe4d0]' : 'bg-[#143c44]'}`} />
                      </div>
                    )}
                    {renderFullHadithCard(entry, false, 'book-page')}
                  </React.Fragment>
                ))}
              </div>

              {/* Running Book Page Footer & Interactive Page-Number Flip Controls */}
              <div
                className={`px-4 sm:px-8 py-4 border-t space-y-3 ${
                  isDay
                    ? 'bg-[#faf4e4]/70 border-[#e6dec8]'
                    : 'bg-[#0b272d] border-[#184650]'
                }`}
              >
                {/* Classic Centered Folio Marker */}
                <div className="flex items-center justify-center gap-3">
                  <div className={`h-px w-12 sm:w-20 ${isDay ? 'bg-[#d8ceb2]' : 'bg-[#1d545e]'}`} />
                  <span className={`text-xs font-extrabold tabular-nums ${isDay ? 'text-slate-600' : 'text-emerald-200'}`}>
                    {isBn
                      ? `পৃষ্ঠা ${formatNum(chapterPage, true)} / ${formatNum(totalPages, true)}`
                      : `Page ${chapterPage} of ${totalPages}`}
                  </span>
                  <div className={`h-px w-12 sm:w-20 ${isDay ? 'bg-[#d8ceb2]' : 'bg-[#1d545e]'}`} />
                </div>

                {totalPages > 1 && (
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
                    <button
                      type="button"
                      disabled={chapterPage <= 1}
                      onClick={() => {
                        if (soundEnabled) soundHaptics.playTap();
                        setChapterPage((p) => Math.max(1, p - 1));
                      }}
                      className={`min-h-[40px] px-3.5 py-1.5 rounded-xl border text-xs font-extrabold disabled:opacity-40 flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0 transition ${
                        isDay
                          ? 'bg-white hover:bg-slate-50 border-[#dcd3ba] text-slate-800'
                          : 'bg-[#071f24] hover:bg-[#10363e] border-[#1d545e] text-emerald-200'
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>{isBn ? 'আগের পৃষ্ঠা' : 'Prev Page'}</span>
                    </button>

                    {/* Clickable Book Page Numbers */}
                    <div className="flex flex-wrap items-center justify-center gap-1">
                      {getPaginationTokens(chapterPage, totalPages).map((token, tIdx) =>
                        token === 'ellipsis' ? (
                          <span
                            key={`el-${tIdx}`}
                            className={`px-1.5 text-xs font-bold ${isDay ? 'text-slate-400' : 'text-slate-500'}`}
                          >
                            …
                          </span>
                        ) : (
                          <button
                            key={token}
                            type="button"
                            onClick={() => {
                              if (soundEnabled) soundHaptics.playTap();
                              setChapterPage(token);
                            }}
                            className={`min-w-[34px] h-[34px] px-2 rounded-lg text-xs font-extrabold tabular-nums transition cursor-pointer ${
                              chapterPage === token
                                ? 'bg-emerald-700 text-white shadow-xs'
                                : isDay
                                ? 'bg-white/90 hover:bg-emerald-50 border border-[#e3dac1] text-slate-700'
                                : 'bg-[#071f24] hover:bg-[#10363e] border border-[#1a4a54] text-slate-200'
                            }`}
                          >
                            {formatNum(token, isBn)}
                          </button>
                        )
                      )}
                    </div>

                    <button
                      type="button"
                      disabled={chapterPage >= totalPages}
                      onClick={() => {
                        if (soundEnabled) soundHaptics.playTap();
                        setChapterPage((p) => Math.min(totalPages, p + 1));
                      }}
                      className={`min-h-[40px] px-3.5 py-1.5 rounded-xl border text-xs font-extrabold disabled:opacity-40 flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0 transition ${
                        isDay
                          ? 'bg-white hover:bg-slate-50 border-[#dcd3ba] text-slate-800'
                          : 'bg-[#071f24] hover:bg-[#10363e] border-[#1d545e] text-emerald-200'
                      }`}
                    >
                      <span>{isBn ? 'পরের পৃষ্ঠা' : 'Next Page'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Previous / Next Chapter Navigation Bar */}
          {!isLoadingHadiths && !hadithsError && (prevChapter || nextChapter) && (
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <button
                type="button"
                disabled={!prevChapter}
                onClick={() => {
                  if (prevChapter) {
                    if (soundEnabled) soundHaptics.playTap();
                    setSelectedChapterId(prevChapter.chapterId);
                  }
                }}
                className={`min-h-[54px] p-3.5 rounded-2xl border text-left transition flex items-center gap-2 disabled:opacity-35 cursor-pointer ${
                  isDay
                    ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                    : 'bg-[#0a2329] hover:bg-[#10323a] border-[#16444e] text-white'
                }`}
              >
                <ChevronLeft className="w-4 h-4 shrink-0" />
                <div className="min-w-0">
                  <div className="text-[10px] font-semibold opacity-70">{isBn ? 'পূর্ববর্তী অধ্যায়' : 'Previous Chapter'}</div>
                  <div className="text-xs font-extrabold truncate">
                    {prevChapter ? (isBn ? prevChapter.titleBn : prevChapter.titleEn) : '—'}
                  </div>
                </div>
              </button>

              <button
                type="button"
                disabled={!nextChapter}
                onClick={() => {
                  if (nextChapter) {
                    if (soundEnabled) soundHaptics.playTap();
                    setSelectedChapterId(nextChapter.chapterId);
                  }
                }}
                className={`min-h-[54px] p-3.5 rounded-2xl border text-right transition flex items-center justify-end gap-2 disabled:opacity-35 cursor-pointer ${
                  isDay
                    ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                    : 'bg-[#0a2329] hover:bg-[#10323a] border-[#16444e] text-white'
                }`}
              >
                <div className="min-w-0">
                  <div className="text-[10px] font-semibold opacity-70">{isBn ? 'পরবর্তী অধ্যায়' : 'Next Chapter'}</div>
                  <div className="text-xs font-extrabold truncate">
                    {nextChapter ? (isBn ? nextChapter.titleBn : nextChapter.titleEn) : '—'}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* =================================================================== */}
      {/* VIEW 4: CURATED TOPICS & HADITH OF THE DAY                          */}
      {/* =================================================================== */}
      {!selectedBookId && activeTab === 'topics' && (
        <div className="space-y-4">
          {/* Hadith of the Day */}
          <div className="space-y-2">
            <div className="text-xs font-extrabold text-[#006A4E] dark:text-emerald-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{HADITH_UI.dailyHadith[selectedLanguage]}</span>
            </div>
            {renderCuratedCard({ ...dailyHadith, englishTranslation: dailyTranslation })}
          </div>

          {/* Search & Topic Pills */}
          <div className="space-y-3 pt-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={curatedSearchQuery}
                onChange={(e) => setCuratedSearchQuery(e.target.value)}
                placeholder={HADITH_UI.searchPlaceholder[selectedLanguage]}
                className={`w-full min-h-[44px] rounded-2xl pl-10 pr-4 py-2.5 border text-xs sm:text-sm focus:outline-none ${
                  isDay
                    ? 'bg-white border-slate-200 text-slate-900 focus:border-[#006A4E]'
                    : 'bg-[#0a2329] border-[#16444e] text-white focus:border-emerald-400'
                }`}
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {topicsList.map((topic) => {
                const label = HADITH_TOPICS[topic]?.[selectedLanguage] || (topic === 'all' ? (isBn ? 'সকল বিষয়' : 'All') : topic);
                return (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => {
                      setSelectedTopic(topic);
                      if (soundEnabled) soundHaptics.playTap();
                    }}
                    className={`min-h-[38px] px-3.5 py-1.5 rounded-xl border text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                      selectedTopic === topic
                        ? 'bg-[#006A4E] text-white border-transparent'
                        : isDay
                        ? 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        : 'bg-[#0a2329] border-[#16444e] text-slate-300 hover:bg-[#10323a]'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            {filteredCuratedHadiths.map((h) => renderCuratedCard(h))}
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* VIEW 5: SAVED HADITHS                                               */}
      {/* =================================================================== */}
      {!selectedBookId && activeTab === 'saved' && (
        <div className="space-y-4">
          {savedFullHadiths.length === 0 && favoriteIds.length === 0 ? (
            <div className={`p-10 rounded-3xl border text-center space-y-2 ${isDay ? 'bg-white border-slate-200' : 'bg-[#0a2329] border-[#16444e]'}`}>
              <BookOpen className="w-9 h-9 mx-auto text-emerald-500/60" />
              <p className="text-sm font-bold">{HADITH_UI.noSavedHadiths[selectedLanguage]}</p>
              <p className={`text-xs ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                {isBn ? 'যেকোনো কিতাবের হাদিস পড়ার সময় ❤️ আইকনে চাপ দিলে এখানে জমা থাকবে।' : 'Tap the heart icon on any hadith to save it here.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {savedFullHadiths.map((entry) => renderFullHadithCard(entry, true))}
              {AUTHENTIC_HADITHS.filter((h) => favoriteIds.includes(h.id)).map((h) => renderCuratedCard(h))}
            </div>
          )}
        </div>
      )}

      {/* =================================================================== */}
      {/* VIEW 6: RECENTLY READ HADITHS                                       */}
      {/* =================================================================== */}
      {!selectedBookId && activeTab === 'recent' && (
        <div className="space-y-4">
          {recentFullHadiths.length === 0 && recentCuratedIds.length === 0 ? (
            <div className={`p-10 rounded-3xl border text-center space-y-2 ${isDay ? 'bg-white border-slate-200' : 'bg-[#0a2329] border-[#16444e]'}`}>
              <History className="w-9 h-9 mx-auto text-emerald-500/60" />
              <p className="text-sm font-bold">{HADITH_UI.noRecentHadiths[selectedLanguage]}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentFullHadiths.map((entry) => renderFullHadithCard(entry, true))}
              {AUTHENTIC_HADITHS.filter((h) => recentCuratedIds.includes(h.id)).map((h) => renderCuratedCard(h))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

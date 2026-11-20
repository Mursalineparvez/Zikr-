/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { ThemeMode, ZikrLanguage } from '../types';
import {
  ArrowLeft,
  Search,
  Bookmark,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Copy,
  Check,
  Sparkles,
  BookOpen,
  ScrollText,
  MapPin,
  Users,
  Clock,
  Star,
  Shield,
  Heart,
  X,
  Share2,
  Download,
} from 'lucide-react';
import { soundHaptics } from '../utils/audioHaptics';
import { copyToClipboard } from '../utils/clipboard';
import { useHorizontalSwipe } from '../hooks/useHorizontalSwipe';
import { SwipeFloatingFeedback, QuickReaderSwitcherStrip } from './SwipeNavigationOverlay';
import { ContentShareModal, ShareDownloadButtons } from './ContentShareModal';
import { ShareableContent } from '../utils/shareDownload';
import { HighlightMarkerButton } from './HighlightMarkerButton';
import { pushAppHistoryState, stepBackOr, useBackLayer } from '../utils/backNavigation';
import {
  PROPHETS_25_DATABASE,
  PROPHETS_25_FILTERS,
  Prophet25FilterKey,
  Prophet25Item,
  ULUL_AZM_COUNT,
  SCRIPTURE_BEARERS_COUNT,
  ARAB_PROPHETS_COUNT,
} from '../data/prophets25Data';

interface Prophets25ViewProps {
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
  soundEnabled?: boolean;
  onBackToHub?: () => void;
}

const READ_STORAGE_KEY = 'zikrmate_prophets25_read_v1';
const BOOKMARK_STORAGE_KEY = 'zikrmate_prophets25_bookmarks_v1';

const toBnDigits = (val: number | string): string =>
  String(val).replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]);

const formatNum = (val: number | string, isBn: boolean): string =>
  isBn ? toBnDigits(val) : String(val);

const padRank = (rank: number, isBn: boolean): string => {
  const padded = String(rank).padStart(2, '0');
  return isBn ? toBnDigits(padded) : padded;
};

function readStoredStringArray(key: string): string[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

export const Prophets25View: React.FC<Prophets25ViewProps> = ({
  themeMode = 'night',
  selectedLanguage = 'bn',
  soundEnabled = true,
  onBackToHub,
}) => {
  const isDay = themeMode === 'day';
  const isBn = selectedLanguage === 'bn';
  const isAr = selectedLanguage === 'ar';

  const [selectedProphetId, setSelectedProphetId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<Prophet25FilterKey>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [readIds, setReadIds] = useState<string[]>(() => readStoredStringArray(READ_STORAGE_KEY));
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() =>
    readStoredStringArray(BOOKMARK_STORAGE_KEY)
  );
  const [copiedDuaId, setCopiedDuaId] = useState<string | null>(null);
  const [shareModalContent, setShareModalContent] = useState<ShareableContent | null>(null);
  const [shareModalInitialAction, setShareModalInitialAction] = useState<'share' | 'download'>('share');

  useEffect(() => {
    try {
      localStorage.setItem(READ_STORAGE_KEY, JSON.stringify(readIds));
    } catch {
      // ignore storage quota issues
    }
  }, [readIds]);

  useEffect(() => {
    try {
      localStorage.setItem(BOOKMARK_STORAGE_KEY, JSON.stringify(bookmarkedIds));
    } catch {
      // ignore storage quota issues
    }
  }, [bookmarkedIds]);

  useBackLayer(
    Boolean(selectedProphetId),
    () => setSelectedProphetId(null),
    'prophets-25-detail'
  );

  const openProphetDetail = useCallback(
    (id: string) => {
      if (soundEnabled) soundHaptics.playTap();
      if (!selectedProphetId) {
        pushAppHistoryState({ appModule: 'other', appSub: 'prophets_25', prophetId: id });
      }
      setSelectedProphetId(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [selectedProphetId, soundEnabled]
  );

  const closeProphetDetail = useCallback(() => {
    if (soundEnabled) soundHaptics.playTap();
    stepBackOr(() => setSelectedProphetId(null));
  }, [soundEnabled]);

  const toggleRead = useCallback(
    (id: string, e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      if (soundEnabled) soundHaptics.playTap();
      setReadIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    },
    [soundEnabled]
  );

  const toggleBookmark = useCallback(
    (id: string, e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      if (soundEnabled) soundHaptics.playTap();
      setBookmarkedIds((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
    },
    [soundEnabled]
  );

  const filteredProphets = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PROPHETS_25_DATABASE.filter((p) => {
      if (activeFilter === 'ulul_azm' && !p.isUlulAzm) return false;
      if (activeFilter === 'scripture' && !p.scriptureBn) return false;
      if (activeFilter === 'arab' && !p.isArabProphet) return false;
      if (activeFilter === 'bani_israil' && !p.isBaniIsrail) return false;
      if (activeFilter === 'early' && !p.isEarlyProphet) return false;
      if (activeFilter === 'bookmarked' && !bookmarkedIds.includes(p.id)) return false;
      if (activeFilter === 'read' && !readIds.includes(p.id)) return false;

      if (!q) return true;
      const haystack = [
        String(p.rank),
        toBnDigits(p.rank),
        p.nameBn,
        p.nameEn,
        p.nameAr,
        p.titleBn,
        p.titleEn,
        p.nationRegionBn,
        p.nationRegionEn,
        p.scriptureBn || '',
        p.scriptureEn || '',
        p.summaryBn,
        p.summaryEn,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [activeFilter, searchQuery, bookmarkedIds, readIds]);

  const selectedProphet = useMemo(
    () => PROPHETS_25_DATABASE.find((p) => p.id === selectedProphetId) || null,
    [selectedProphetId]
  );

  const readerPool = useMemo(() => {
    if (selectedProphet && filteredProphets.some((p) => p.id === selectedProphet.id)) {
      return filteredProphets;
    }
    return PROPHETS_25_DATABASE;
  }, [filteredProphets, selectedProphet]);

  const currentIdx = selectedProphet
    ? readerPool.findIndex((p) => p.id === selectedProphet.id)
    : -1;
  const prevProphet = currentIdx > 0 ? readerPool[currentIdx - 1] : null;
  const nextProphet =
    currentIdx >= 0 && currentIdx < readerPool.length - 1 ? readerPool[currentIdx + 1] : null;

  const goPrevProphet = useCallback(() => {
    if (!prevProphet) return;
    if (soundEnabled) soundHaptics.playTap();
    setSelectedProphetId(prevProphet.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [prevProphet, soundEnabled]);

  const goNextProphet = useCallback(() => {
    if (!nextProphet) return;
    if (soundEnabled) soundHaptics.playTap();
    setSelectedProphetId(nextProphet.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [nextProphet, soundEnabled]);

  const { touchHandlers, swipeDirection, isReadyToTrigger } = useHorizontalSwipe({
    enabled: Boolean(selectedProphet),
    canSwipeLeft: Boolean(nextProphet),
    canSwipeRight: Boolean(prevProphet),
    onSwipeLeft: goNextProphet,
    onSwipeRight: goPrevProphet,
  });

  const buildProphetShareContent = useCallback(
    (p: Prophet25Item): ShareableContent => {
      const name = isBn ? p.nameBn : p.nameEn;
      const title = isBn ? p.titleBn : p.titleEn;
      const nation = isBn ? p.nationRegionBn : p.nationRegionEn;
      const lineage = isBn ? p.lineageBn : p.lineageEn;
      const lifespan = isBn ? p.lifespanNoteBn : p.lifespanNoteEn;
      const scripture = isBn ? p.scriptureBn : p.scriptureEn;
      const miracles = isBn ? p.miraclesBn : p.miraclesEn;
      const lessons = isBn ? p.lessonsBn : p.lessonsEn;
      const refs = isBn ? p.referencesBn : p.referencesEn;
      const surahs = isBn ? p.keySurahsBn : p.keySurahsEn;

      const meta = [
        {
          label: isBn ? 'ক্রমিক নং' : 'Order',
          value: `${formatNum(p.rank, isBn)} / ${formatNum(25, isBn)}`,
        },
        {
          label: isBn ? 'উপাধি (লকব)' : 'Title',
          value: title,
        },
        {
          label: isBn ? 'কুরআনে উল্লেখ' : 'Quran Mentions',
          value: isBn
            ? `${toBnDigits(p.quranMentions)} বার${p.quranMentionsNoteBn ? ` (${p.quranMentionsNoteBn})` : ''}`
            : `${p.quranMentions} times${p.quranMentionsNoteEn ? ` (${p.quranMentionsNoteEn})` : ''}`,
        },
        {
          label: isBn ? 'জাতি ও অঞ্চল' : 'Nation & Region',
          value: nation,
        },
        {
          label: isBn ? 'বংশপরিচয়' : 'Lineage',
          value: lineage,
        },
        ...(scripture
          ? [{ label: isBn ? 'আসমানি কিতাব/সহীফা' : 'Revealed Scripture', value: scripture }]
          : []),
        {
          label: isBn ? 'জীবনকাল ও ঐতিহাসিক তথ্য' : 'Lifespan & Context',
          value: lifespan,
        },
      ];

      const fullSections: string[] = [
        `📖 ${isBn ? 'বিস্তারিত জীবনী' : 'Detailed Biography'}`,
        isBn ? p.biographyBn : p.biographyEn,
        '',
        `🗓️ ${isBn ? 'জীবনের প্রধান অধ্যায়সমূহ' : 'Key Timeline Events'}`,
        ...p.timelineEvents.map(
          (ev, i) =>
            `${formatNum(i + 1, isBn)}. ${isBn ? ev.titleBn : ev.titleEn}: ${
              isBn ? ev.detailBn : ev.detailEn
            }`
        ),
        '',
        `✨ ${isBn ? 'প্রধান মুজিযা ও নিদর্শন' : 'Major Miracles & Signs'}`,
        ...miracles.map((m) => `• ${m}`),
        '',
        `🛡️ ${isBn ? 'পরীক্ষা ও ধৈর্য' : 'Trials & Patience'}`,
        isBn ? p.trialsAndPatienceBn : p.trialsAndPatienceEn,
        '',
        ...(p.dua
          ? [
              `🤲 ${isBn ? 'প্রসিদ্ধ দোয়া' : 'Famous Supplication'} (${p.dua.reference})`,
              p.dua.arabic,
              isBn ? `${p.dua.transliterationBn}\nঅর্থ: ${p.dua.translationBn}` : p.dua.translationEn,
              '',
            ]
          : []),
        `💡 ${isBn ? 'শিক্ষণীয় বিষয়' : 'Key Lessons'}`,
        ...lessons.map((l) => `• ${l}`),
        '',
        `📚 ${isBn ? 'প্রধান সূরা ও রেফারেন্স' : 'Key Surahs & References'}`,
        `${surahs.join(' · ')}`,
        ...refs.map((r) => `• ${r}`),
      ];

      return {
        id: `prophet25-${p.id}`,
        badge: isBn
          ? `কুরআনে বর্ণিত ২৫ নবী · ক্রমিক ${toBnDigits(p.rank)}${p.isUlulAzm ? ' · উলুল আযম' : ''}`
          : `25 Quranic Prophets · #${p.rank}${p.isUlulAzm ? ' · Ulul Azm' : ''}`,
        title: name,
        subtitle: `${title} (${p.nameAr})`,
        arabic: p.dua?.arabic || p.nameAr,
        transliteration: p.dua ? (isBn ? p.dua.transliterationBn : p.dua.reference) : undefined,
        body: isBn ? p.biographyBn : p.biographyEn,
        highlights: lessons,
        meta,
        reference: refs.join(' | '),
        fullDocumentText: fullSections.join('\n'),
        fileNamePrefix: `ZikrPlus-Prophet-${String(p.rank).padStart(2, '0')}-${p.id}`,
      };
    },
    [isBn]
  );

  const buildAll25IndexShareContent = useCallback((): ShareableContent => {
    const listLines = PROPHETS_25_DATABASE.map((p) => {
      const rankStr = formatNum(p.rank, isBn);
      const mentionsStr = isBn
        ? `কুরআনে ${toBnDigits(p.quranMentions)} বার`
        : `${p.quranMentions}x in Quran`;
      const ulul = p.isUlulAzm ? (isBn ? ' [উলুল আযম]' : ' [Ulul Azm]') : '';
      const book = p.scriptureBn ? ` — ${isBn ? p.scriptureBn : p.scriptureEn}` : '';
      return `${rankStr}. ${isBn ? p.nameBn : p.nameEn} (${p.nameAr})${ulul}\n   ${
        isBn ? p.titleBn : p.titleEn
      } · ${mentionsStr}${book}\n   ${isBn ? p.summaryBn : p.summaryEn}`;
    });

    return {
      id: 'prophets25-complete-list',
      badge: isBn ? 'আল-কুরআনে বর্ণিত ২৫ নবী-রাসূল' : '25 Prophets in the Holy Quran',
      title: isBn
        ? 'কুরআনে বর্ণিত ২৫ জন নবী-রাসূলের পূর্ণাঙ্গ তালিকা ও সংক্ষিপ্ত পরিচিতি'
        : 'Complete List & Profiles of the 25 Prophets Mentioned in the Quran',
      subtitle: 'الأنبياء والرسل المذكورون في القرآن الكريم',
      arabic: 'لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِّن رُّسُلِهِ',
      body: isBn
        ? 'পবিত্র কুরআনে সর্বমোট ২৫ জন নবী ও রাসূলের নাম সরাসরি উল্লেখ রয়েছে। তাঁদের মধ্যে ৫ জন উলুল আযম (নূহ, ইবরাহীম, মূসা, ঈসা ও মুহাম্মদ সা.), ৪ জন আরব নবী এবং ৪টি প্রধান আসমানি কিতাব ও সহীফা অবতীর্ণ হয়েছে।'
        : 'The Holy Quran explicitly mentions 25 Prophets and Messengers by name, including the 5 Ulul Azm messengers (Nuh, Ibrahim, Musa, Isa, and Muhammad SAW) and the bearers of revealed scriptures.',
      meta: [
        { label: isBn ? 'মোট নবী-রাসূল' : 'Total Named in Quran', value: formatNum(25, isBn) },
        { label: isBn ? 'উলুল আযম রাসূল' : 'Ulul Azm Messengers', value: formatNum(ULUL_AZM_COUNT, isBn) },
        { label: isBn ? 'কিতাব ও সহীফাপ্রাপ্ত' : 'Scripture Bearers', value: formatNum(SCRIPTURE_BEARERS_COUNT, isBn) },
        { label: isBn ? 'আরব নবী' : 'Arab Prophets', value: formatNum(ARAB_PROPHETS_COUNT, isBn) },
      ],
      fullDocumentText: listLines.join('\n\n'),
      reference: isBn
        ? 'আল-কুরআনুল কারীম · সহীহ বুখারী ও মুসলিম · কাসাসুল আম্বিয়া (ইমাম ইবনে কাসীর রহ.)'
        : 'The Holy Quran · Sahih al-Bukhari & Muslim · Qasas al-Anbiya (Ibn Kathir)',
      fileNamePrefix: 'ZikrPlus-25-Prophets-Quran-List',
    };
  }, [isBn]);

  const openShareModal = useCallback(
    (content: ShareableContent, action: 'share' | 'download') => {
      if (soundEnabled) soundHaptics.playTap();
      setShareModalInitialAction(action);
      setShareModalContent(content);
    },
    [soundEnabled]
  );

  const handleCopyDua = async (p: Prophet25Item) => {
    if (!p.dua) return;
    const text = `${p.dua.arabic}\n\n${
      isBn
        ? `উচ্চারণ: ${p.dua.transliterationBn}\nঅর্থ: ${p.dua.translationBn}`
        : p.dua.translationEn
    }\n— ${p.dua.reference}`;
    const ok = await copyToClipboard(text);
    if (ok) {
      if (soundEnabled) soundHaptics.playTap();
      setCopiedDuaId(p.id);
      setTimeout(() => setCopiedDuaId((prev) => (prev === p.id ? null : prev)), 2200);
    }
  };

  const progressPercent = Math.round((readIds.length / PROPHETS_25_DATABASE.length) * 100);

  // =========================================================================
  // DETAIL READER VIEW
  // =========================================================================
  if (selectedProphet) {
    const isRead = readIds.includes(selectedProphet.id);
    const isBookmarked = bookmarkedIds.includes(selectedProphet.id);
    const prophetName = isBn ? selectedProphet.nameBn : selectedProphet.nameEn;
    const prophetTitle = isBn ? selectedProphet.titleBn : selectedProphet.titleEn;
    const sharePayload = buildProphetShareContent(selectedProphet);

    const identityRows = [
      {
        icon: MapPin,
        label: isBn ? 'জাতি ও অঞ্চল' : 'Nation & Region',
        value: isBn ? selectedProphet.nationRegionBn : selectedProphet.nationRegionEn,
      },
      {
        icon: Users,
        label: isBn ? 'বংশপরিচয়' : 'Lineage',
        value: isBn ? selectedProphet.lineageBn : selectedProphet.lineageEn,
      },
      {
        icon: BookOpen,
        label: isBn ? 'কুরআনে উল্লেখ ও প্রধান সূরা' : 'Quran Mentions & Key Surahs',
        value: `${
          isBn
            ? `${toBnDigits(selectedProphet.quranMentions)} বার`
            : `${selectedProphet.quranMentions} times`
        }${
          isBn && selectedProphet.quranMentionsNoteBn
            ? ` — ${selectedProphet.quranMentionsNoteBn}`
            : !isBn && selectedProphet.quranMentionsNoteEn
            ? ` — ${selectedProphet.quranMentionsNoteEn}`
            : ''
        } · ${(isBn ? selectedProphet.keySurahsBn : selectedProphet.keySurahsEn).join(' · ')}`,
      },
      {
        icon: Clock,
        label: isBn ? 'জীবনকাল ও ঐতিহাসিক নোট' : 'Lifespan & Historical Note',
        value: isBn ? selectedProphet.lifespanNoteBn : selectedProphet.lifespanNoteEn,
      },
    ];

    return (
      <div
        {...touchHandlers}
        data-highlight-section="prophets_25"
        data-highlight-source={prophetName}
        className="space-y-5 pb-10 animate-in fade-in duration-200"
      >
        <SwipeFloatingFeedback
          swipeDirection={swipeDirection}
          isReadyToTrigger={isReadyToTrigger}
          canSwipeLeft={Boolean(nextProphet)}
          canSwipeRight={Boolean(prevProphet)}
          nextLabel={nextProphet ? (isBn ? nextProphet.nameBn : nextProphet.nameEn) : undefined}
          prevLabel={prevProphet ? (isBn ? prevProphet.nameBn : prevProphet.nameEn) : undefined}
          selectedLanguage={selectedLanguage}
        />

        {/* Sticky Compact Reader Topbar */}
        <div
          className={`sticky top-[62px] z-30 rounded-2xl border backdrop-blur-xl px-3 py-2 flex items-center justify-between gap-2 shadow-sm ${
            isDay
              ? 'bg-white/95 border-emerald-200/80 text-slate-900'
              : 'bg-[#071d22]/95 border-teal-800/60 text-white'
          }`}
        >
          <button
            type="button"
            onClick={closeProphetDetail}
            className={`min-h-[44px] px-3 rounded-xl flex items-center gap-1.5 text-xs sm:text-sm font-bold transition cursor-pointer active:scale-95 ${
              isDay
                ? 'hover:bg-emerald-50 text-[#006A4E]'
                : 'hover:bg-teal-900/50 text-emerald-300'
            }`}
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span className="truncate">
              {isBn ? '২৫ নবীর তালিকা' : isAr ? 'قائمة الأنبياء' : 'All 25 Prophets'}
            </span>
          </button>

          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => toggleRead(selectedProphet.id)}
              title={isBn ? 'পঠিত চিহ্নিত করুন' : 'Mark as read'}
              className={`min-h-[44px] px-2.5 sm:px-3 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition cursor-pointer active:scale-95 ${
                isRead
                  ? 'bg-[#006A4E] text-white border-[#006A4E]'
                  : isDay
                  ? 'bg-slate-50 border-slate-200 text-slate-700 hover:border-emerald-400'
                  : 'bg-[#0d2830] border-teal-800/70 text-slate-200 hover:border-emerald-500/50'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">
                {isRead ? (isBn ? 'পঠিত' : 'Read') : isBn ? 'পঠিত করুন' : 'Mark Read'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => toggleBookmark(selectedProphet.id)}
              aria-label={isBn ? 'বুকমার্ক' : 'Bookmark'}
              className={`min-h-[44px] min-w-[44px] rounded-xl border flex items-center justify-center transition cursor-pointer active:scale-95 ${
                isBookmarked
                  ? 'bg-amber-500/15 border-amber-500/50 text-amber-500'
                  : isDay
                  ? 'bg-slate-50 border-slate-200 text-slate-600 hover:text-amber-600'
                  : 'bg-[#0d2830] border-teal-800/70 text-slate-300 hover:text-amber-400'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            <HighlightMarkerButton
              itemKey={`prophet25-${selectedProphet.id}`}
              text={`${prophetName} — ${isBn ? selectedProphet.summaryBn : selectedProphet.summaryEn}`}
              source={prophetName}
              section="prophets_25"
              selectedLanguage={selectedLanguage}
              themeMode={themeMode}
              soundEnabled={soundEnabled}
            />

            <ShareDownloadButtons
              themeMode={themeMode}
              selectedLanguage={selectedLanguage}
              variant="compact"
              onShare={() => openShareModal(sharePayload, 'share')}
              onDownload={() => openShareModal(sharePayload, 'download')}
            />
          </div>
        </div>

        {/* Swipe Quick Switcher */}
        <QuickReaderSwitcherStrip
          themeMode={themeMode}
          selectedLanguage={selectedLanguage}
          prevLabel={prevProphet ? (isBn ? prevProphet.nameBn : prevProphet.nameEn) : null}
          nextLabel={nextProphet ? (isBn ? nextProphet.nameBn : nextProphet.nameEn) : null}
          onPrev={goPrevProphet}
          onNext={goNextProphet}
          hasPrev={Boolean(prevProphet)}
          hasNext={Boolean(nextProphet)}
        />

        {/* Editorial Prophet Masthead */}
        <article
          className={`rounded-3xl border overflow-hidden ${
            isDay
              ? 'bg-white border-emerald-200/80 shadow-sm'
              : 'bg-[#082026] border-teal-900/60 shadow-xl'
          }`}
        >
          <div
            className={`px-5 py-6 sm:px-8 sm:py-8 border-b ${
              isDay
                ? 'bg-gradient-to-br from-[#005a42] via-[#006A4E] to-[#0a4b3c] text-white border-emerald-700/30'
                : 'bg-gradient-to-br from-[#0a2d34] via-[#0d3a42] to-[#082329] text-white border-teal-800/50'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-emerald-100/85 tabular-nums">
              <span>
                {isBn
                  ? `ক্রমিক ${padRank(selectedProphet.rank, true)} / ২৫`
                  : `PROPHET ${padRank(selectedProphet.rank, false)} OF 25`}
                {selectedProphet.isUlulAzm
                  ? isBn
                    ? '  ·  উলুল আযম রাসূল'
                    : '  ·  Ulul Azm Messenger'
                  : ''}
                {selectedProphet.isArabProphet
                  ? isBn
                    ? '  ·  আরব নবী'
                    : '  ·  Arab Prophet'
                  : ''}
              </span>
              <span className="text-amber-300 font-bold">
                {isBn
                  ? `কুরআনে উল্লেখ: ${toBnDigits(selectedProphet.quranMentions)} বার`
                  : `${selectedProphet.quranMentions} Mentions in Quran`}
              </span>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  {prophetName}
                </h1>
                <p className="text-sm sm:text-base font-medium text-amber-200/95">
                  {prophetTitle}
                </p>
              </div>
              <div
                dir="rtl"
                className="font-arabic text-2xl sm:text-3xl font-bold text-amber-200/95 leading-snug shrink-0"
              >
                {selectedProphet.nameAr}
              </div>
            </div>

            {selectedProphet.scriptureBn && (
              <div className="mt-4 pt-3.5 border-t border-white/15 flex items-center gap-2 text-xs sm:text-sm text-emerald-50/95">
                <ScrollText className="w-4 h-4 text-amber-300 shrink-0" />
                <span className="font-bold">
                  {isBn ? 'অবতীর্ণ আসমানি কিতাব / সহীফা:' : 'Revealed Scripture:'}
                </span>
                <span>{isBn ? selectedProphet.scriptureBn : selectedProphet.scriptureEn}</span>
              </div>
            )}
          </div>

          {/* Identity & Historical Facts Matrix (2x2 Clean Hairline Grid) */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 border-b ${
              isDay
                ? 'divide-slate-200/80 border-slate-200/80 bg-[#f8fcfa]'
                : 'divide-teal-900/50 border-teal-900/50 bg-[#06181d]'
            }`}
          >
            {identityRows.map((row, idx) => {
              const IconComp = row.icon;
              return (
                <div
                  key={row.label}
                  className={`p-4 sm:p-5 flex items-start gap-3 ${
                    idx % 2 === 1
                      ? isDay
                        ? 'sm:border-l sm:border-slate-200/80'
                        : 'sm:border-l sm:border-teal-900/50'
                      : ''
                  } ${
                    idx >= 2
                      ? isDay
                        ? 'sm:border-t sm:border-slate-200/80'
                        : 'sm:border-t sm:border-teal-900/50'
                      : ''
                  }`}
                >
                  <IconComp
                    className={`w-4 h-4 mt-0.5 shrink-0 ${
                      isDay ? 'text-[#006A4E]' : 'text-emerald-400'
                    }`}
                  />
                  <div className="min-w-0 space-y-1">
                    <div
                      className={`text-[11px] font-bold uppercase tracking-wider ${
                        isDay ? 'text-slate-500' : 'text-emerald-300/70'
                      }`}
                    >
                      {row.label}
                    </div>
                    <p
                      className={`text-xs sm:text-sm leading-relaxed font-medium ${
                        isDay ? 'text-slate-800' : 'text-slate-100'
                      }`}
                    >
                      {row.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Reading Body */}
          <div className="p-5 sm:p-8 space-y-8">
            {/* 1. Detailed Biography */}
            <section className="space-y-3">
              <div className="flex items-center gap-2">
                <BookOpen
                  className={`w-5 h-5 shrink-0 ${isDay ? 'text-[#006A4E]' : 'text-emerald-400'}`}
                />
                <h2
                  className={`text-base sm:text-lg font-black tracking-tight ${
                    isDay ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {isBn ? 'বিস্তারিত জীবনী ও দাওয়াত' : 'Detailed Biography & Prophetic Mission'}
                </h2>
              </div>
              <p
                className={`text-[15px] sm:text-base leading-[1.9] ${
                  isDay ? 'text-slate-700' : 'text-slate-200'
                }`}
              >
                {isBn ? selectedProphet.biographyBn : selectedProphet.biographyEn}
              </p>
            </section>

            {/* 2. Key Chronological Events */}
            <section
              className={`pt-6 border-t space-y-4 ${
                isDay ? 'border-slate-200/80' : 'border-teal-900/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <ScrollText
                  className={`w-5 h-5 shrink-0 ${isDay ? 'text-[#006A4E]' : 'text-emerald-400'}`}
                />
                <h2
                  className={`text-base sm:text-lg font-black tracking-tight ${
                    isDay ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {isBn ? 'জীবনের গুরুত্বপূর্ণ অধ্যায়সমূহ' : 'Key Milestones in His Life'}
                </h2>
              </div>

              <div className="space-y-3.5">
                {selectedProphet.timelineEvents.map((ev, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border flex items-start gap-3.5 ${
                      isDay
                        ? 'bg-[#f8fcfa] border-emerald-200/70'
                        : 'bg-[#0b262d] border-teal-900/60'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0 tabular-nums ${
                        isDay
                          ? 'bg-[#006A4E] text-white'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {formatNum(idx + 1, isBn)}
                    </div>
                    <div className="space-y-1 min-w-0">
                      <h3
                        className={`text-sm sm:text-base font-extrabold ${
                          isDay ? 'text-slate-900' : 'text-white'
                        }`}
                      >
                        {isBn ? ev.titleBn : ev.titleEn}
                      </h3>
                      <p
                        className={`text-xs sm:text-sm leading-relaxed ${
                          isDay ? 'text-slate-600' : 'text-slate-300'
                        }`}
                      >
                        {isBn ? ev.detailBn : ev.detailEn}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 3. Major Miracles */}
            <section
              className={`pt-6 border-t space-y-3.5 ${
                isDay ? 'border-slate-200/80' : 'border-teal-900/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <Sparkles
                  className={`w-5 h-5 shrink-0 ${isDay ? 'text-amber-600' : 'text-amber-400'}`}
                />
                <h2
                  className={`text-base sm:text-lg font-black tracking-tight ${
                    isDay ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {isBn ? 'প্রধান মুজিযা ও নিদর্শনসমূহ' : 'Major Miracles & Divine Signs'}
                </h2>
              </div>

              <ul className="space-y-2.5">
                {(isBn ? selectedProphet.miraclesBn : selectedProphet.miraclesEn).map(
                  (miracle, idx) => (
                    <li
                      key={idx}
                      className={`flex items-start gap-2.5 text-sm sm:text-[15px] leading-relaxed ${
                        isDay ? 'text-slate-700' : 'text-slate-200'
                      }`}
                    >
                      <Star
                        className={`w-4 h-4 mt-1 shrink-0 ${
                          isDay ? 'text-amber-600' : 'text-amber-400'
                        }`}
                      />
                      <span>{miracle}</span>
                    </li>
                  )
                )}
              </ul>
            </section>

            {/* 4. Famous Quranic / Prophetic Dua */}
            {selectedProphet.dua && (
              <section
                className={`rounded-2xl border p-5 sm:p-6 space-y-4 ${
                  isDay
                    ? 'bg-[#f4faf7] border-emerald-300/70'
                    : 'bg-[#0b272e] border-emerald-500/30'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <h2
                      className={`text-sm sm:text-base font-black ${
                        isDay ? 'text-[#005a42]' : 'text-emerald-300'
                      }`}
                    >
                      {isBn ? 'প্রসিদ্ধ দোয়া ও মুনাজাত' : 'Famous Quranic Supplication'}
                    </h2>
                    <p
                      className={`text-xs font-semibold ${
                        isDay ? 'text-slate-500' : 'text-slate-400'
                      }`}
                    >
                      {selectedProphet.dua.reference}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyDua(selectedProphet)}
                    className={`min-h-[44px] px-3.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition cursor-pointer active:scale-95 ${
                      copiedDuaId === selectedProphet.id
                        ? 'bg-[#006A4E] text-white border-[#006A4E]'
                        : isDay
                        ? 'bg-white border-emerald-200 text-[#006A4E] hover:bg-emerald-50'
                        : 'bg-[#071b20] border-teal-800 text-emerald-300 hover:bg-teal-900/50'
                    }`}
                  >
                    {copiedDuaId === selectedProphet.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>{isBn ? 'কপি হয়েছে' : 'Copied'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{isBn ? 'দোয়া কপি' : 'Copy Dua'}</span>
                      </>
                    )}
                  </button>
                </div>

                <p
                  dir="rtl"
                  className={`font-arabic text-xl sm:text-2xl leading-[2.1] text-right font-bold ${
                    isDay ? 'text-slate-900' : 'text-amber-100'
                  }`}
                >
                  {selectedProphet.dua.arabic}
                </p>

                {isBn && (
                  <p
                    className={`text-xs sm:text-sm font-semibold leading-relaxed ${
                      isDay ? 'text-[#006A4E]' : 'text-emerald-300/90'
                    }`}
                  >
                    উচ্চারণ: {selectedProphet.dua.transliterationBn}
                  </p>
                )}

                <p
                  className={`text-sm sm:text-[15px] leading-relaxed ${
                    isDay ? 'text-slate-700' : 'text-slate-200'
                  }`}
                >
                  {isBn
                    ? `অর্থ: ${selectedProphet.dua.translationBn}`
                    : selectedProphet.dua.translationEn}
                </p>
              </section>
            )}

            {/* 5. Trials & Patience + Lessons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              <section
                className={`p-5 rounded-2xl border space-y-2.5 ${
                  isDay
                    ? 'bg-amber-50/50 border-amber-200/80'
                    : 'bg-[#12262c] border-amber-500/20'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Shield
                    className={`w-4 h-4 shrink-0 ${isDay ? 'text-amber-700' : 'text-amber-400'}`}
                  />
                  <h2
                    className={`text-sm sm:text-base font-black ${
                      isDay ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {isBn ? 'কঠিন পরীক্ষা ও ধৈর্য' : 'Trials & Steadfastness'}
                  </h2>
                </div>
                <p
                  className={`text-xs sm:text-sm leading-relaxed ${
                    isDay ? 'text-slate-700' : 'text-slate-200'
                  }`}
                >
                  {isBn
                    ? selectedProphet.trialsAndPatienceBn
                    : selectedProphet.trialsAndPatienceEn}
                </p>
              </section>

              <section
                className={`p-5 rounded-2xl border space-y-2.5 ${
                  isDay
                    ? 'bg-emerald-50/45 border-emerald-200/80'
                    : 'bg-[#0b252b] border-emerald-500/25'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Heart
                    className={`w-4 h-4 shrink-0 ${
                      isDay ? 'text-[#006A4E]' : 'text-emerald-400'
                    }`}
                  />
                  <h2
                    className={`text-sm sm:text-base font-black ${
                      isDay ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {isBn ? 'আমাদের জন্য শিক্ষণীয়' : 'Enduring Lessons'}
                  </h2>
                </div>
                <ul className="space-y-2">
                  {(isBn ? selectedProphet.lessonsBn : selectedProphet.lessonsEn).map(
                    (lesson, idx) => (
                      <li
                        key={idx}
                        className={`text-xs sm:text-sm leading-relaxed flex items-start gap-2 ${
                          isDay ? 'text-slate-700' : 'text-slate-200'
                        }`}
                      >
                        <span
                          className={`font-black tabular-nums ${
                            isDay ? 'text-[#006A4E]' : 'text-emerald-400'
                          }`}
                        >
                          {formatNum(idx + 1, isBn)}.
                        </span>
                        <span>{lesson}</span>
                      </li>
                    )
                  )}
                </ul>
              </section>
            </div>

            {/* 6. Verified Sources */}
            <footer
              className={`pt-5 border-t space-y-2 ${
                isDay ? 'border-slate-200/80' : 'border-teal-900/50'
              }`}
            >
              <div
                className={`text-xs font-bold uppercase tracking-wider ${
                  isDay ? 'text-slate-500' : 'text-slate-400'
                }`}
              >
                {isBn ? 'নির্ভরযোগ্য উৎস ও রেফারেন্স' : 'Authentic References'}
              </div>
              <p
                className={`text-xs sm:text-sm leading-relaxed ${
                  isDay ? 'text-slate-600' : 'text-slate-300'
                }`}
              >
                {(isBn ? selectedProphet.referencesBn : selectedProphet.referencesEn).join('  ·  ')}
              </p>
            </footer>
          </div>
        </article>

        {/* Bottom Prev / Next Prophet Navigation */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            disabled={!prevProphet}
            onClick={goPrevProphet}
            className={`min-h-[64px] p-3.5 rounded-2xl border text-left transition flex items-center gap-2.5 ${
              prevProphet
                ? isDay
                  ? 'bg-white border-slate-200 hover:border-emerald-400 text-slate-900 cursor-pointer active:scale-[0.99]'
                  : 'bg-[#082026] border-teal-900/60 hover:border-emerald-500/50 text-white cursor-pointer active:scale-[0.99]'
                : 'opacity-40 cursor-not-allowed bg-transparent border-slate-300/40 dark:border-teal-900/30'
            }`}
          >
            <ChevronLeft className="w-5 h-5 shrink-0 text-emerald-500" />
            <div className="min-w-0">
              <div className="text-[11px] font-semibold opacity-65">
                {isBn ? 'পূর্ববর্তী নবী' : 'Previous'}
              </div>
              <div className="text-xs sm:text-sm font-bold truncate">
                {prevProphet ? (isBn ? prevProphet.nameBn : prevProphet.nameEn) : '—'}
              </div>
            </div>
          </button>

          <button
            type="button"
            disabled={!nextProphet}
            onClick={goNextProphet}
            className={`min-h-[64px] p-3.5 rounded-2xl border text-right transition flex items-center justify-end gap-2.5 ${
              nextProphet
                ? isDay
                  ? 'bg-white border-slate-200 hover:border-emerald-400 text-slate-900 cursor-pointer active:scale-[0.99]'
                  : 'bg-[#082026] border-teal-900/60 hover:border-emerald-500/50 text-white cursor-pointer active:scale-[0.99]'
                : 'opacity-40 cursor-not-allowed bg-transparent border-slate-300/40 dark:border-teal-900/30'
            }`}
          >
            <div className="min-w-0">
              <div className="text-[11px] font-semibold opacity-65">
                {isBn ? 'পরবর্তী নবী' : 'Next'}
              </div>
              <div className="text-xs sm:text-sm font-bold truncate">
                {nextProphet ? (isBn ? nextProphet.nameBn : nextProphet.nameEn) : '—'}
              </div>
            </div>
            <ChevronRight className="w-5 h-5 shrink-0 text-emerald-500" />
          </button>
        </div>

        <ContentShareModal
          content={shareModalContent}
          isOpen={Boolean(shareModalContent)}
          onClose={() => setShareModalContent(null)}
          selectedLanguage={selectedLanguage}
          soundEnabled={soundEnabled}
          initialFocus={shareModalInitialAction}
        />
      </div>
    );
  }

  // =========================================================================
  // OVERVIEW / INDEX VIEW (ALL 25 QURANIC PROPHETS)
  // =========================================================================
  return (
    <div
      data-highlight-section="prophets_25"
      data-highlight-source={
        isBn ? 'কুরআনে বর্ণিত ২৫ জন নবী-রাসূলের নাম' : '25 Prophets Mentioned in the Quran'
      }
      className="space-y-5 pb-10 animate-in fade-in duration-200"
    >
      {/* Editorial Hero Header */}
      <div
        className={`rounded-3xl border overflow-hidden ${
          isDay
            ? 'bg-gradient-to-br from-[#005a42] via-[#006A4E] to-[#0a4b3c] text-white border-emerald-700/30 shadow-lg'
            : 'bg-gradient-to-br from-[#08282f] via-[#0c3640] to-[#071d23] text-white border-teal-800/60 shadow-2xl'
        }`}
      >
        <div className="p-5 sm:p-7 space-y-4">
          <div className="flex items-center justify-between gap-2">
            {onBackToHub ? (
              <button
                type="button"
                onClick={onBackToHub}
                className="min-h-[44px] px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 transition cursor-pointer active:scale-95"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{isBn ? 'আরো মেনু' : isAr ? 'المزيد' : 'Back'}</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => openShareModal(buildAll25IndexShareContent(), 'share')}
                className="min-h-[44px] px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer active:scale-95"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isBn ? 'তালিকা শেয়ার' : 'Share List'}</span>
              </button>
              <button
                type="button"
                onClick={() => openShareModal(buildAll25IndexShareContent(), 'download')}
                className="min-h-[44px] px-3 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 border border-amber-300/30 text-amber-200 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isBn ? '২৫ নবী PDF' : 'PDF'}</span>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <div
              dir="rtl"
              className="font-arabic text-lg sm:text-xl text-amber-300 font-bold leading-snug"
            >
              الأنبياء والرسل المذكورون في القرآن الكريم
            </div>
            <h1 className="text-xl sm:text-3xl font-black tracking-tight text-white">
              {isBn
                ? 'কুরআনে বর্ণিত ২৫ জন নবী-রাসূলের নাম'
                : isAr
                ? 'الأنبياء والرسل الـ ٢٥ في القرآن الكريم'
                : '25 Prophets & Messengers in the Quran'}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-2xl">
              {isBn
                ? 'হযরত আদম (আ.) থেকে শেষ নবী মুহাম্মদ (সা.) পর্যন্ত পবিত্র কুরআনে নাম উল্লেখিত সকল ২৫ জন নবী-রাসূলের কালানুক্রমিক জীবনী, মুজিযা, কুরআনের উল্লেখ, প্রসিদ্ধ দোয়া ও শিক্ষণীয় অধ্যায়।'
                : 'Chronological profiles, miracles, Quranic citations, supplications, and enduring lessons of all 25 Prophets named in the Holy Quran — from Adam (AS) to Muhammad (SAW).'}
            </p>
          </div>

          {/* Unboxed Typographic Key Stats + Progress */}
          <div className="pt-3 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-xs text-emerald-100/90 font-semibold tabular-nums">
              {isBn
                ? `${toBnDigits(25)} জন নবী-রাসূল  ·  ${toBnDigits(ULUL_AZM_COUNT)} জন উলুল আযম  ·  ${toBnDigits(SCRIPTURE_BEARERS_COUNT)} জন কিতাব/সহীফাপ্রাপ্ত  ·  ${toBnDigits(ARAB_PROPHETS_COUNT)} জন আরব নবী`
                : `25 Prophets  ·  ${ULUL_AZM_COUNT} Ulul Azm  ·  ${SCRIPTURE_BEARERS_COUNT} Scripture Bearers  ·  ${ARAB_PROPHETS_COUNT} Arab Prophets`}
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <div className="w-28 h-2 rounded-full bg-white/15 overflow-hidden">
                <div
                  className="h-full bg-amber-300 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-xs font-bold text-amber-200 tabular-nums">
                {isBn
                  ? `${toBnDigits(readIds.length)}/${toBnDigits(25)} পঠিত`
                  : `${readIds.length}/25 Read`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Search + Interactive Filter Strip */}
      <div className="space-y-3">
        <div className="relative">
          <Search
            className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${
              isDay ? 'text-slate-400' : 'text-emerald-400/70'
            }`}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              isBn
                ? 'নবীর নাম, লকব, জাতি বা কিতাব খুঁজুন (যেমন: ইবরাহীম, মূসা, ইউনুস, তাওরাত)...'
                : 'Search prophet by name, title, nation, or scripture...'
            }
            className={`w-full min-h-[46px] pl-10 pr-10 rounded-2xl border text-sm font-medium outline-none transition ${
              isDay
                ? 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-[#006A4E]'
                : 'bg-[#082026] border-teal-900/70 text-white placeholder:text-slate-400 focus:border-emerald-400'
            }`}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
              className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer ${
                isDay ? 'text-slate-500 hover:bg-slate-100' : 'text-slate-400 hover:bg-teal-900/50'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Horizontal Filter Tabs */}
        <div
          data-no-swipe="true"
          className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar"
        >
          {PROPHETS_25_FILTERS.map((f) => {
            const active = activeFilter === f.key;
            const label = isBn ? f.labelBn : isAr ? f.labelAr : f.labelEn;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => {
                  if (soundEnabled) soundHaptics.playTap();
                  setActiveFilter(f.key);
                }}
                className={`min-h-[40px] px-3.5 rounded-xl border text-xs font-bold whitespace-nowrap transition cursor-pointer active:scale-95 ${
                  active
                    ? 'bg-[#006A4E] text-white border-[#006A4E] shadow-xs'
                    : isDay
                    ? 'bg-white border-slate-200 text-slate-700 hover:border-emerald-400'
                    : 'bg-[#082026] border-teal-900/60 text-slate-300 hover:border-emerald-500/50'
                }`}
              >
                {label}
                {f.key === 'bookmarked' && bookmarkedIds.length > 0
                  ? ` (${formatNum(bookmarkedIds.length, isBn)})`
                  : ''}
                {f.key === 'read' && readIds.length > 0
                  ? ` (${formatNum(readIds.length, isBn)})`
                  : ''}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between px-1">
        <span
          className={`text-xs font-bold tabular-nums ${
            isDay ? 'text-slate-500' : 'text-slate-400'
          }`}
        >
          {isBn
            ? `মোট ${toBnDigits(filteredProphets.length)} জন নবী-রাসূল প্রদর্শিত হচ্ছে`
            : `Showing ${filteredProphets.length} of 25 Prophets`}
        </span>
        {(activeFilter !== 'all' || searchQuery) && (
          <button
            type="button"
            onClick={() => {
              setActiveFilter('all');
              setSearchQuery('');
            }}
            className={`text-xs font-bold cursor-pointer hover:underline ${
              isDay ? 'text-[#006A4E]' : 'text-emerald-400'
            }`}
          >
            {isBn ? 'ফিল্টার রিসেট' : 'Reset'}
          </button>
        )}
      </div>

      {/* 25 Prophets Chronological Cards Grid */}
      {filteredProphets.length === 0 ? (
        <div
          className={`p-10 rounded-3xl border text-center space-y-2 ${
            isDay
              ? 'bg-white border-slate-200 text-slate-600'
              : 'bg-[#082026] border-teal-900/60 text-slate-300'
          }`}
        >
          <p className="text-sm font-bold">
            {isBn ? 'এই ফিল্টারে কোনো নবী-রাসূল পাওয়া যায়নি।' : 'No prophets match this filter.'}
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveFilter('all');
              setSearchQuery('');
            }}
            className="min-h-[44px] px-4 rounded-xl bg-[#006A4E] text-white text-xs font-bold cursor-pointer"
          >
            {isBn ? 'সব ২৫ জন দেখুন' : 'Show All 25'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
          {filteredProphets.map((p) => {
            const isRead = readIds.includes(p.id);
            const isBookmarked = bookmarkedIds.includes(p.id);
            const metaLineParts: string[] = [
              isBn
                ? `কুরআনে ${toBnDigits(p.quranMentions)} বার`
                : `${p.quranMentions}x in Quran`,
            ];
            if (p.isUlulAzm) metaLineParts.push(isBn ? 'উলুল আযম' : 'Ulul Azm');
            if (p.scriptureBn) {
              metaLineParts.push(
                isBn
                  ? p.scriptureBn.split('(')[0].trim()
                  : (p.scriptureEn || '').split('(')[0].trim()
              );
            } else if (p.isArabProphet) {
              metaLineParts.push(isBn ? 'আরব নবী' : 'Arab Prophet');
            }

            return (
              <div
                key={p.id}
                onClick={() => openProphetDetail(p.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openProphetDetail(p.id);
                  }
                }}
                className={`group rounded-2xl border p-4 sm:p-5 transition-all duration-200 cursor-pointer flex flex-col justify-between gap-3 ${
                  isDay
                    ? 'bg-white border-slate-200/90 hover:border-[#006A4E]/60 hover:shadow-md'
                    : 'bg-[#082026] border-teal-900/60 hover:border-emerald-500/50 hover:bg-[#0b272f]'
                }`}
              >
                <div className="space-y-2.5">
                  {/* Top Row: Sequential Rank + Name + Arabic */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black shrink-0 tabular-nums transition-colors ${
                          isRead
                            ? 'bg-[#006A4E] text-white'
                            : p.isUlulAzm
                            ? isDay
                              ? 'bg-amber-100/90 text-amber-800 border border-amber-300/70'
                              : 'bg-amber-500/15 text-amber-300 border border-amber-400/30'
                            : isDay
                            ? 'bg-[#edf7f4] text-[#006A4E]'
                            : 'bg-[#103038] text-emerald-300'
                        }`}
                      >
                        {padRank(p.rank, isBn)}
                      </div>

                      <div className="min-w-0">
                        <h2
                          className={`text-base font-black leading-snug transition-colors ${
                            isDay
                              ? 'text-slate-900 group-hover:text-[#006A4E]'
                              : 'text-white group-hover:text-emerald-300'
                          }`}
                        >
                          {isBn ? p.nameBn : p.nameEn}
                        </h2>
                        <p
                          className={`text-xs font-semibold line-clamp-1 mt-0.5 ${
                            isDay ? 'text-amber-700' : 'text-amber-300/90'
                          }`}
                        >
                          {isBn ? p.titleBn : p.titleEn}
                        </p>
                      </div>
                    </div>

                    <div
                      dir="rtl"
                      className={`font-arabic text-base sm:text-lg font-bold shrink-0 ${
                        isDay ? 'text-[#006A4E]' : 'text-emerald-300/90'
                      }`}
                    >
                      {p.nameAr.replace(' عليه السلام', '')}
                    </div>
                  </div>

                  {/* Unboxed Typographic Metadata Strip */}
                  <div
                    className={`text-[11px] font-bold tabular-nums ${
                      isDay ? 'text-slate-500' : 'text-emerald-300/75'
                    }`}
                  >
                    {metaLineParts.join('  ·  ')}
                  </div>

                  {/* Summary Preview */}
                  <p
                    className={`text-xs sm:text-[13px] leading-relaxed line-clamp-2 ${
                      isDay ? 'text-slate-600' : 'text-slate-300'
                    }`}
                  >
                    {isBn ? p.summaryBn : p.summaryEn}
                  </p>
                </div>

                {/* Bottom Action Row */}
                <div
                  className={`pt-2.5 border-t flex items-center justify-between gap-2 ${
                    isDay ? 'border-slate-100' : 'border-teal-900/50'
                  }`}
                >
                  <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={(e) => toggleBookmark(p.id, e)}
                      aria-label={isBn ? 'বুকমার্ক' : 'Bookmark'}
                      className={`w-9 h-9 rounded-lg flex items-center justify-center transition cursor-pointer ${
                        isBookmarked
                          ? 'text-amber-500 bg-amber-500/10'
                          : isDay
                          ? 'text-slate-400 hover:text-amber-600 hover:bg-slate-100'
                          : 'text-slate-400 hover:text-amber-400 hover:bg-teal-900/40'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => toggleRead(p.id, e)}
                      aria-label={isBn ? 'পঠিত' : 'Mark read'}
                      className={`w-9 h-9 rounded-lg flex items-center justify-center transition cursor-pointer ${
                        isRead
                          ? 'text-[#006A4E] dark:text-emerald-400 bg-emerald-500/10'
                          : isDay
                          ? 'text-slate-400 hover:text-[#006A4E] hover:bg-slate-100'
                          : 'text-slate-400 hover:text-emerald-400 hover:bg-teal-900/40'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>

                    <ShareDownloadButtons
                      themeMode={themeMode}
                      selectedLanguage={selectedLanguage}
                      variant="compact"
                      onShare={() => openShareModal(buildProphetShareContent(p), 'share')}
                      onDownload={() => openShareModal(buildProphetShareContent(p), 'download')}
                    />
                  </div>

                  <span
                    className={`text-xs font-extrabold flex items-center gap-0.5 ${
                      isDay ? 'text-[#006A4E]' : 'text-emerald-400'
                    }`}
                  >
                    <span>{isBn ? 'বিস্তারিত পড়ুন' : 'Read Details'}</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Quranic Note Footer */}
      <div
        className={`rounded-2xl border p-4 sm:p-5 text-xs sm:text-sm leading-relaxed space-y-1.5 ${
          isDay
            ? 'bg-white border-emerald-200/80 text-slate-600'
            : 'bg-[#082026] border-teal-900/60 text-slate-300'
        }`}
      >
        <div
          className={`font-black ${isDay ? 'text-[#006A4E]' : 'text-emerald-300'}`}
        >
          {isBn ? 'কুরআনের মৌলিক আকীদা' : 'Core Quranic Principle'}
        </div>
        <p>
          {isBn
            ? 'আল্লাহ তাআলা মানবজাতির হেদায়াতের জন্য লক্ষাধিক নবী ও তিন শতাধিক রাসূল প্রেরণ করেছেন, যাঁদের মধ্যে পবিত্র কুরআনে এই ২৫ জনের নাম সরাসরি উল্লেখ রয়েছে (সূরা নিসা ৪:১৬৪, সূরা গাফির ৪০:৭৮)। একজন মুমিনের জন্য সকল নবী-রাসূলের প্রতি বিনা পার্থক্যে ঈমান আনা ফরজ (সূরা বাকারা ২:২৮৫)।'
            : 'Allah sent prophets to every nation; 25 are explicitly named in the Holy Quran (4:164, 40:78). Believing in all of Allah’s prophets without distinction is an article of faith (2:285).'}
        </p>
      </div>

      <ContentShareModal
        content={shareModalContent}
        isOpen={Boolean(shareModalContent)}
        onClose={() => setShareModalContent(null)}
        selectedLanguage={selectedLanguage}
        soundEnabled={soundEnabled}
        initialFocus={shareModalInitialAction}
      />
    </div>
  );
};

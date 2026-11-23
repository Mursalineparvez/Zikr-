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
  ChevronDown,
  ChevronUp,
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
  ShieldAlert,
  Heart,
  X,
  Share2,
  Download,
  Compass,
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
  PROPHETS_25_INTRO_OVERVIEW,
  PROPHETS_25_INTRO_FACTS,
  Prophet25FilterKey,
  Prophet25Item,
  Prophet25Dua,
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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showIntroDrawer, setShowIntroDrawer] = useState(false);
  const [readIds, setReadIds] = useState<string[]>(() => readStoredStringArray(READ_STORAGE_KEY));
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() =>
    readStoredStringArray(BOOKMARK_STORAGE_KEY)
  );
  const [copiedDuaKey, setCopiedDuaKey] = useState<string | null>(null);
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

  const scrollToSection = useCallback(
    (sectionId: string) => {
      if (soundEnabled) soundHaptics.playTap();
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
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
        p.lineageBn,
        p.lineageEn,
        p.eraAndTimelineBn || '',
        p.eraAndTimelineEn || '',
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
      const era = isBn ? p.eraAndTimelineBn : p.eraAndTimelineEn;
      const lifespan = isBn ? p.lifespanNoteBn : p.lifespanNoteEn;
      const scripture = isBn ? p.scriptureBn : p.scriptureEn;
      const dawahThemes = isBn ? p.dawahThemesBn : p.dawahThemesEn;
      const miracles = isBn ? p.miraclesBn : p.miraclesEn;
      const lessons = isBn ? p.lessonsBn : p.lessonsEn;
      const refs = isBn ? p.referencesBn : p.referencesEn;
      const surahs = isBn ? p.keySurahsBn : p.keySurahsEn;
      const allDuas: Prophet25Dua[] = [
        ...(p.dua ? [p.dua] : []),
        ...(p.extraDuas || []),
      ];

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
        ...(era ? [{ label: isBn ? 'ঐতিহাসিক সময়কাল' : 'Historical Era', value: era }] : []),
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
        ...(p.quranStats
          ? [
              `📊 ${isBn ? 'কুরআনী পরিসংখ্যান' : 'Quranic Coverage'}`,
              isBn ? p.quranStats.summaryBn : p.quranStats.summaryEn,
              '',
            ]
          : []),
        ...(dawahThemes && dawahThemes.length > 0
          ? [
              `📣 ${isBn ? 'দাওয়াতের মূল বিষয়বস্তু' : 'Core Pillars of His Mission'}`,
              ...dawahThemes.map((t) => `• ${t}`),
              '',
            ]
          : []),
        `🗓️ ${isBn ? 'জীবনের প্রধান অধ্যায়সমূহ' : 'Key Timeline Events'}`,
        ...p.timelineEvents.map(
          (ev, i) =>
            `${formatNum(i + 1, isBn)}. ${isBn ? ev.titleBn : ev.titleEn}: ${
              isBn ? ev.detailBn : ev.detailEn
            }`
        ),
        '',
        `✨ ${isBn ? 'প্রধান মু‘জিযা ও নিদর্শন' : 'Major Miracles & Signs'}`,
        ...miracles.map((m) => `• ${m}`),
        '',
        `🛡️ ${isBn ? 'পরীক্ষা ও ধৈর্য' : 'Trials & Patience'}`,
        isBn ? p.trialsAndPatienceBn : p.trialsAndPatienceEn,
        '',
        ...(allDuas.length > 0
          ? [
              `🤲 ${isBn ? 'কুরআনী দোয়া ও মুনাজাত' : 'Quranic Supplications'}`,
              ...allDuas.flatMap((d) => [
                `(${d.reference})`,
                d.arabic,
                isBn ? `${d.transliterationBn}\nঅর্থ: ${d.translationBn}` : d.translationEn,
                '',
              ]),
            ]
          : []),
        ...(p.clarifications && p.clarifications.length > 0
          ? [
              `🔎 ${isBn ? 'সংশয় নিরসন ও তাহক্বীক্ব' : 'Scholarly Clarifications'}`,
              ...p.clarifications.map(
                (c) =>
                  `• ${isBn ? c.titleBn : c.titleEn}\n  ${
                    isBn ? c.detailBn : c.detailEn
                  }${
                    (isBn ? c.refBn : c.refEn)
                      ? `\n  [${isBn ? c.refBn : c.refEn}]`
                      : ''
                  }`
              ),
              '',
            ]
          : []),
        `💡 ${isBn ? 'শিক্ষণীয় বিষয়সমূহ' : 'Key Lessons'}`,
        ...lessons.map((l) => `• ${l}`),
        '',
        `📚 ${isBn ? 'প্রধান সূরা ও রেফারেন্স' : 'Key Surahs & References'}`,
        `${surahs.join(' · ')}`,
        ...refs.map((r) => `• ${r}`),
      ];

      return {
        id: `prophet25-${p.id}`,
        badge: isBn
          ? `কুরআনে বর্ণিত ২৫ জন নবী ও রাসূল · ক্রমিক ${toBnDigits(p.rank)}${p.isUlulAzm ? ' · উলুল আযম' : ''}`
          : `25 Prophets & Messengers in the Quran · #${p.rank}${p.isUlulAzm ? ' · Ulul Azm' : ''}`,
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
      badge: isBn ? 'কুরআনে বর্ণিত ২৫ জন নবী ও রাসূল' : '25 Prophets & Messengers in the Quran',
      title: isBn
        ? 'কুরআনে বর্ণিত ২৫ জন নবী ও রাসূলের পূর্ণাঙ্গ পরিচিতি ও তালিকা'
        : 'Complete Profiles & List of the 25 Prophets & Messengers in the Quran',
      subtitle: 'الأنبياء والرسل الـ ٢٥ في القرآن الكريم',
      arabic: 'لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِّن رُّسُلِهِ',
      body: isBn
        ? 'পবিত্র কুরআনে সর্বমোট ২৫ জন নবী ও রাসূলের নাম সরাসরি উল্লেখ রয়েছে (১,২৪,০০০ নবী ও ৩১৫ রাসূলের মধ্য থেকে)। তাঁদের মধ্যে ৫ জন উলুল আযম, ৪টি প্রধান আসমানি কিতাব ও সহীফাপ্রাপ্ত এবং ৪ জন আরব নবী রয়েছেন।'
        : 'The Holy Quran explicitly names 25 Prophets and Messengers (out of 124,000 prophets and 315 messengers), including the 5 Ulul Azm messengers and the bearers of revealed scriptures.',
      meta: [
        { label: isBn ? 'মোট নবী ও রাসূল' : 'Named in Quran', value: formatNum(25, isBn) },
        { label: isBn ? 'উলুল আযম রাসূল' : 'Ulul Azm Messengers', value: formatNum(ULUL_AZM_COUNT, isBn) },
        { label: isBn ? 'কিতাব ও সহীফাপ্রাপ্ত' : 'Scripture Bearers', value: formatNum(SCRIPTURE_BEARERS_COUNT, isBn) },
        { label: isBn ? 'আরব নবী' : 'Arab Prophets', value: formatNum(ARAB_PROPHETS_COUNT, isBn) },
      ],
      fullDocumentText: listLines.join('\n\n'),
      reference: isBn
        ? 'আল-কুরআনুল কারীম · ছহীহ বুখারী ও মুসলিম · নবীদের কাহিনী ১ম ও ২য় খণ্ড (ড. মুহাম্মাদ আসাদুল্লাহ আল-গালিব)'
        : 'The Holy Quran · Sahih al-Bukhari & Muslim · Nobider Kahini Vols. 1–2',
      fileNamePrefix: 'ZikrPlus-25-Prophets-Messengers-Quran',
    };
  }, [isBn]);

  const handleCopyDua = async (dua: Prophet25Dua, key: string) => {
    const text = `${dua.arabic}\n\n${
      isBn
        ? `উচ্চারণ: ${dua.transliterationBn}\nঅর্থ: ${dua.translationBn}`
        : dua.translationEn
    }\n— ${dua.reference}`;
    const ok = await copyToClipboard(text);
    if (ok) {
      if (soundEnabled) soundHaptics.playTap();
      setCopiedDuaKey(key);
      setTimeout(() => setCopiedDuaKey((prev) => (prev === key ? null : prev)), 2200);
    }
  };

  const openShareModal = useCallback(
    (content: ShareableContent, action: 'share' | 'download') => {
      if (soundEnabled) soundHaptics.playTap();
      setShareModalInitialAction(action);
      setShareModalContent(content);
    },
    [soundEnabled]
  );

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
    const biographyParagraphs = (
      isBn ? selectedProphet.biographyBn : selectedProphet.biographyEn
    )
      .split(/\n\s*\n/)
      .filter(Boolean);
    const dawahThemes = isBn ? selectedProphet.dawahThemesBn : selectedProphet.dawahThemesEn;
    const allDuas: Prophet25Dua[] = [
      ...(selectedProphet.dua ? [selectedProphet.dua] : []),
      ...(selectedProphet.extraDuas || []),
    ];

    const identityRows = [
      {
        icon: MapPin,
        label: isBn ? 'জাতি ও ভৌগোলিক অঞ্চল' : 'Nation & Region',
        value: isBn ? selectedProphet.nationRegionBn : selectedProphet.nationRegionEn,
      },
      {
        icon: Users,
        label: isBn ? 'বংশপরিচয় ও পরিবার' : 'Lineage & Family',
        value: `${isBn ? selectedProphet.lineageBn : selectedProphet.lineageEn}${
          (isBn ? selectedProphet.eraAndTimelineBn : selectedProphet.eraAndTimelineEn)
            ? `\n${isBn ? 'সময়কাল: ' : 'Era: '}${
                isBn ? selectedProphet.eraAndTimelineBn : selectedProphet.eraAndTimelineEn
              }`
            : ''
        }`,
      },
      {
        icon: BookOpen,
        label: isBn ? 'কুরআনে উল্লেখ ও প্রধান সূরাসমূহ' : 'Quran Mentions & Key Surahs',
        value: `${
          isBn
            ? `${toBnDigits(selectedProphet.quranMentions)} বার`
            : `${selectedProphet.quranMentions} times`
        }${
          selectedProphet.quranStats?.surahCount && selectedProphet.quranStats?.ayahCount
            ? isBn
              ? ` (${toBnDigits(selectedProphet.quranStats.surahCount)} সূরা · ${toBnDigits(
                  selectedProphet.quranStats.ayahCount
                )} আয়াত)`
              : ` (${selectedProphet.quranStats.surahCount} Surahs · ${selectedProphet.quranStats.ayahCount} verses)`
            : ''
        }\n${(isBn ? selectedProphet.keySurahsBn : selectedProphet.keySurahsEn).join('  ·  ')}`,
      },
      {
        icon: Clock,
        label: isBn ? 'জীবনকাল ও ঐতিহাসিক নোট' : 'Lifespan & Historical Note',
        value: isBn ? selectedProphet.lifespanNoteBn : selectedProphet.lifespanNoteEn,
      },
    ];

    const quickNavItems = [
      { id: 'sec-bio', label: isBn ? 'জীবনী ও দাওয়াত' : 'Biography' },
      { id: 'sec-timeline', label: isBn ? 'ঘটনাপ্রবাহ' : 'Timeline' },
      { id: 'sec-miracles', label: isBn ? 'মু‘জিযা' : 'Miracles' },
      ...(allDuas.length > 0 ? [{ id: 'sec-dua', label: isBn ? 'দোয়া' : 'Duas' }] : []),
      ...(selectedProphet.clarifications && selectedProphet.clarifications.length > 0
        ? [{ id: 'sec-tahqiq', label: isBn ? 'সংশয় নিরসন' : 'Clarifications' }]
        : []),
      { id: 'sec-lessons', label: isBn ? 'শিক্ষা ও তথ্যসূত্র' : 'Lessons & Refs' },
    ];

    return (
      <div
        {...touchHandlers}
        data-highlight-section="prophets_25"
        data-highlight-source={prophetName}
        className="space-y-4 sm:space-y-5 pb-10 animate-in fade-in duration-200"
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
            <span className="truncate whitespace-nowrap">
              {isBn ? '২৫ নবী ও রাসূল' : isAr ? 'قائمة الأنبياء' : 'All 25 Prophets'}
            </span>
          </button>

          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => toggleRead(selectedProphet.id)}
              title={isBn ? 'পঠিত চিহ্নিত করুন' : 'Mark as read'}
              className={`min-h-[44px] px-2.5 sm:px-3 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition cursor-pointer active:scale-95 whitespace-nowrap ${
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
            className={`px-5 py-5 sm:px-8 sm:py-6 border-b ${
              isDay
                ? 'border-emerald-200/80 text-slate-900'
                : 'border-teal-800/50 text-white'
            }`}
          >
            <div
              className={`flex flex-wrap items-center justify-between gap-2 text-xs font-semibold tabular-nums ${
                isDay ? 'text-[#006A4E]' : 'text-emerald-200/85'
              }`}
            >
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
                {selectedProphet.isBaniIsrail
                  ? isBn
                    ? '  ·  বনী ইসরাঈল ধারা'
                    : '  ·  Bani Israil Lineage'
                  : ''}
              </span>
              <span className={`font-bold ${isDay ? 'text-amber-700' : 'text-amber-300'}`}>
                {isBn
                  ? `কুরআনে উল্লেখ: ${toBnDigits(selectedProphet.quranMentions)} বার`
                  : `${selectedProphet.quranMentions} Mentions in Quran`}
              </span>
            </div>

            <div className="mt-3 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div className="space-y-1">
                <h1
                  className={`text-2xl sm:text-3xl font-black tracking-tight text-balance ${
                    isDay ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {prophetName}
                </h1>
                <p
                  className={`text-sm sm:text-base font-medium ${
                    isDay ? 'text-[#006A4E]' : 'text-amber-200/95'
                  }`}
                >
                  {prophetTitle}
                </p>
              </div>
              <div
                dir="rtl"
                className={`font-arabic text-2xl sm:text-3xl font-bold leading-snug shrink-0 ${
                  isDay ? 'text-[#006A4E]' : 'text-amber-200/95'
                }`}
              >
                {selectedProphet.nameAr}
              </div>
            </div>

            {selectedProphet.scriptureBn && (
              <div
                className={`mt-4 pt-3 border-t flex items-start sm:items-center gap-2 text-xs sm:text-sm ${
                  isDay ? 'border-slate-200/80 text-slate-700' : 'border-white/15 text-emerald-50/95'
                }`}
              >
                <ScrollText
                  className={`w-4 h-4 shrink-0 mt-0.5 sm:mt-0 ${
                    isDay ? 'text-amber-600' : 'text-amber-300'
                  }`}
                />
                <div>
                  <span className="font-bold mr-1.5">
                    {isBn ? 'অবতীর্ণ আসমানি কিতাব / সহীফা:' : 'Revealed Scripture:'}
                  </span>
                  <span>{isBn ? selectedProphet.scriptureBn : selectedProphet.scriptureEn}</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Section Jump Navigation Strip */}
          <div
            data-no-swipe="true"
            className={`px-4 sm:px-6 py-2.5 border-b flex items-center gap-1.5 overflow-x-auto no-scrollbar ${
              isDay
                ? 'bg-[#f4faf7] border-emerald-200/70'
                : 'bg-[#071a20] border-teal-900/50'
            }`}
          >
            {quickNavItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap shrink-0 transition cursor-pointer ${
                  isDay
                    ? 'bg-white border border-slate-200/80 text-slate-700 hover:border-[#006A4E] hover:text-[#006A4E]'
                    : 'bg-[#0c262d] border border-teal-800/60 text-slate-200 hover:border-emerald-400 hover:text-emerald-300'
                }`}
              >
                {item.label}
              </button>
            ))}
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
                      className={`text-[11px] font-bold tracking-wider ${
                        isDay ? 'text-slate-500' : 'text-emerald-300/75'
                      }`}
                    >
                      {row.label}
                    </div>
                    <p
                      className={`text-xs sm:text-sm leading-relaxed font-medium whitespace-pre-line ${
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
            {/* Quranic Coverage Note */}
            {selectedProphet.quranStats && (
              <div
                className={`rounded-2xl border p-4 sm:p-5 flex items-start gap-3 ${
                  isDay
                    ? 'bg-emerald-50/50 border-emerald-200/80'
                    : 'bg-[#0b252b] border-emerald-500/25'
                }`}
              >
                <Compass
                  className={`w-5 h-5 mt-0.5 shrink-0 ${
                    isDay ? 'text-[#006A4E]' : 'text-emerald-400'
                  }`}
                />
                <div className="space-y-1">
                  <div
                    className={`text-xs sm:text-sm font-black ${
                      isDay ? 'text-[#005a42]' : 'text-emerald-300'
                    }`}
                  >
                    {isBn ? 'কুরআনে উল্লেখ ও বিস্তৃতি' : 'Quranic Coverage Overview'}
                  </div>
                  <p
                    className={`text-xs sm:text-sm leading-relaxed ${
                      isDay ? 'text-slate-700' : 'text-slate-200'
                    }`}
                  >
                    {isBn
                      ? selectedProphet.quranStats.summaryBn
                      : selectedProphet.quranStats.summaryEn}
                  </p>
                </div>
              </div>
            )}

            {/* 1. Detailed Biography (Multi-paragraph) */}
            <section id="sec-bio" className="scroll-mt-32 space-y-3.5">
              <div className="flex items-center gap-2">
                <BookOpen
                  className={`w-5 h-5 shrink-0 ${isDay ? 'text-[#006A4E]' : 'text-emerald-400'}`}
                />
                <h2
                  className={`text-base sm:text-lg font-black tracking-tight ${
                    isDay ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {isBn ? 'বিস্তারিত জীবনী ও দাওয়াতী সংগ্রাম' : 'Detailed Biography & Prophetic Mission'}
                </h2>
              </div>

              <div className="space-y-4">
                {biographyParagraphs.map((para, pIdx) => (
                  <p
                    key={pIdx}
                    className={`text-[15px] sm:text-base leading-[1.85] ${
                      isDay ? 'text-slate-700' : 'text-slate-200'
                    }`}
                  >
                    {para}
                  </p>
                ))}
              </div>

              {dawahThemes && dawahThemes.length > 0 && (
                <div
                  className={`mt-4 rounded-2xl border p-4 sm:p-5 space-y-2.5 ${
                    isDay
                      ? 'bg-[#f8fcfa] border-emerald-200/70'
                      : 'bg-[#0a2329] border-teal-900/60'
                  }`}
                >
                  <h3
                    className={`text-xs sm:text-sm font-black ${
                      isDay ? 'text-[#006A4E]' : 'text-emerald-300'
                    }`}
                  >
                    {isBn ? 'দাওয়াতের মূল স্তম্ভ ও বৈশিষ্ট্য' : 'Core Pillars of His Da‘wah'}
                  </h3>
                  <ul className="space-y-2">
                    {dawahThemes.map((theme, idx) => (
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
                        <span>{theme}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>

            {/* 2. Key Chronological Events */}
            <section
              id="sec-timeline"
              className={`scroll-mt-32 pt-6 border-t space-y-4 ${
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
                  {isBn ? 'জীবনের গুরুত্বপূর্ণ অধ্যায় ও ঘটনাপ্রবাহ' : 'Key Chronological Milestones'}
                </h2>
              </div>

              <div className="space-y-3">
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
              id="sec-miracles"
              className={`scroll-mt-32 pt-6 border-t space-y-3.5 ${
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
                  {isBn ? 'প্রধান মু‘জিযা ও বিশেষ নিদর্শনসমূহ' : 'Major Miracles & Divine Signs'}
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

            {/* 4. Famous Quranic / Prophetic Duas */}
            {allDuas.length > 0 && (
              <section id="sec-dua" className="scroll-mt-32 space-y-4">
                {allDuas.map((duaItem, dIdx) => {
                  const duaKey = `${selectedProphet.id}-dua-${dIdx}`;
                  const copied = copiedDuaKey === duaKey;
                  return (
                    <div
                      key={duaKey}
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
                            {dIdx === 0
                              ? isBn
                                ? 'প্রসিদ্ধ কুরআনী দোয়া ও মুনাজাত'
                                : 'Famous Quranic Supplication'
                              : isBn
                              ? `অতিরিক্ত কুরআনী দোয়া (${formatNum(dIdx + 1, true)})`
                              : `Additional Supplication (${dIdx + 1})`}
                          </h2>
                          <p
                            className={`text-xs font-semibold ${
                              isDay ? 'text-slate-500' : 'text-slate-400'
                            }`}
                          >
                            {duaItem.reference}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopyDua(duaItem, duaKey)}
                          className={`min-h-[44px] px-3.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition cursor-pointer active:scale-95 whitespace-nowrap ${
                            copied
                              ? 'bg-[#006A4E] text-white border-[#006A4E]'
                              : isDay
                              ? 'bg-white border-emerald-200 text-[#006A4E] hover:bg-emerald-50'
                              : 'bg-[#071b20] border-teal-800 text-emerald-300 hover:bg-teal-900/50'
                          }`}
                        >
                          {copied ? (
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
                        {duaItem.arabic}
                      </p>

                      {isBn && (
                        <p
                          className={`text-xs sm:text-sm font-semibold leading-relaxed ${
                            isDay ? 'text-[#006A4E]' : 'text-emerald-300/90'
                          }`}
                        >
                          উচ্চারণ: {duaItem.transliterationBn}
                        </p>
                      )}

                      <p
                        className={`text-sm sm:text-[15px] leading-relaxed ${
                          isDay ? 'text-slate-700' : 'text-slate-200'
                        }`}
                      >
                        {isBn ? `অর্থ: ${duaItem.translationBn}` : duaItem.translationEn}
                      </p>
                    </div>
                  );
                })}
              </section>
            )}

            {/* 5. Scholarly Clarifications & Isra'iliyyat Refutations (সংশয় নিরসন ও তাহক্বীক্ব) */}
            {selectedProphet.clarifications && selectedProphet.clarifications.length > 0 && (
              <section
                id="sec-tahqiq"
                className={`scroll-mt-32 rounded-2xl border p-5 sm:p-6 space-y-4 ${
                  isDay
                    ? 'bg-amber-50/55 border-amber-300/70'
                    : 'bg-[#12262b] border-amber-400/25'
                }`}
              >
                <div className="flex items-center gap-2">
                  <ShieldAlert
                    className={`w-5 h-5 shrink-0 ${
                      isDay ? 'text-amber-700' : 'text-amber-400'
                    }`}
                  />
                  <div>
                    <h2
                      className={`text-sm sm:text-base font-black ${
                        isDay ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      {isBn
                        ? 'সংশয় নিরসন ও ইসরাঈলীয়াত যাচাই (তাহক্বীক্ব)'
                        : 'Scholarly Clarifications & Fact-Checking'}
                    </h2>
                    <p
                      className={`text-[11px] font-medium ${
                        isDay ? 'text-slate-500' : 'text-slate-400'
                      }`}
                    >
                      {isBn
                        ? 'কুরআন ও ছহীহ হাদীসের আলোকে প্রচলিত ভ্রান্ত ধারণা ও বানোয়াট বর্ণনার খণ্ডন'
                        : 'Distinguishing verified Quran & Sahih Hadith accounts from unauthenticated legends'}
                    </p>
                  </div>
                </div>

                <div className="space-y-3.5">
                  {selectedProphet.clarifications.map((item, cIdx) => (
                    <div
                      key={cIdx}
                      className={`p-4 rounded-xl border space-y-1.5 ${
                        isDay
                          ? 'bg-white/90 border-amber-200/80'
                          : 'bg-[#091c22] border-amber-500/20'
                      }`}
                    >
                      <h3
                        className={`text-xs sm:text-sm font-extrabold ${
                          isDay ? 'text-amber-900' : 'text-amber-300'
                        }`}
                      >
                        {isBn ? item.titleBn : item.titleEn}
                      </h3>
                      <p
                        className={`text-xs sm:text-sm leading-relaxed ${
                          isDay ? 'text-slate-700' : 'text-slate-200'
                        }`}
                      >
                        {isBn ? item.detailBn : item.detailEn}
                      </p>
                      {(isBn ? item.refBn : item.refEn) && (
                        <div
                          className={`text-[11px] font-semibold pt-1 ${
                            isDay ? 'text-slate-500' : 'text-emerald-300/75'
                          }`}
                        >
                          {isBn ? `তথ্যসূত্র: ${item.refBn}` : `Source: ${item.refEn}`}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 6. Trials & Patience + Lessons */}
            <div id="sec-lessons" className="scroll-mt-32 grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              <section
                className={`p-5 rounded-2xl border space-y-2.5 ${
                  isDay
                    ? 'bg-slate-50/80 border-slate-200/90'
                    : 'bg-[#0c2329] border-teal-800/50'
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
                    {isBn ? 'আমাদের জন্য শিক্ষণীয় বিষয়সমূহ' : 'Enduring Lessons'}
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

            {/* 7. Verified Sources */}
            <footer
              className={`pt-5 border-t space-y-2.5 ${
                isDay ? 'border-slate-200/80' : 'border-teal-900/50'
              }`}
            >
              <div
                className={`text-xs font-bold tracking-wider ${
                  isDay ? 'text-slate-500' : 'text-emerald-300/75'
                }`}
              >
                {isBn ? 'প্রামাণিক উৎস ও তথ্যসূত্র (রেফারেন্স)' : 'Authentic Sources & References'}
              </div>
              <ul className="space-y-1.5">
                {(isBn ? selectedProphet.referencesBn : selectedProphet.referencesEn).map(
                  (ref, rIdx) => (
                    <li
                      key={rIdx}
                      className={`text-xs sm:text-sm leading-relaxed flex items-start gap-2 ${
                        isDay ? 'text-slate-600' : 'text-slate-300'
                      }`}
                    >
                      <span className={isDay ? 'text-[#006A4E]' : 'text-emerald-400'}>•</span>
                      <span>{ref}</span>
                    </li>
                  )
                )}
              </ul>
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
        isBn ? 'কুরআনে বর্ণিত ২৫ জন নবী ও রাসূল' : '25 Prophets & Messengers in the Quran'
      }
      className="space-y-5 pb-10 animate-in fade-in duration-200"
    >
      {/* Clean Simple Centered Header */}
      <div
        className={`pb-3.5 border-b transition-colors ${
          isDay ? 'border-[#dcebe8] text-slate-900' : 'border-[#163640] text-white'
        }`}
      >
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2">
          <div className="flex items-center">
            {onBackToHub ? (
              <button
                type="button"
                onClick={onBackToHub}
                className={`w-10 h-10 rounded-xl border flex items-center justify-center transition cursor-pointer active:scale-95 ${
                  isDay
                    ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    : 'bg-[#0a2328] border-[#16444e] text-emerald-200 hover:bg-[#103239]'
                }`}
                aria-label={isBn ? 'ফিরে যান' : 'Back'}
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            ) : (
              <div className="w-10" />
            )}
          </div>

          <div className="text-center min-w-0 px-1">
            <h1 className="text-lg sm:text-xl font-black tracking-tight truncate">
              {isBn
                ? '২৫ জন নবী ও রাসূল'
                : isAr
                ? 'الأنبياء والرسل الـ ٢٥'
                : '25 Prophets & Messengers'}
            </h1>
            <p className={`text-[11px] font-semibold mt-0.5 tabular-nums truncate ${isDay ? 'text-[#006A4E]' : 'text-emerald-300/90'}`}>
              {isBn
                ? `${toBnDigits(25)} জন নবী · পঠিত ${toBnDigits(readIds.length)}/${toBnDigits(25)}`
                : `25 Prophets · Read ${readIds.length}/25`}
            </p>
          </div>

          <div className="flex items-center justify-end gap-1.5">
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
                  : 'bg-[#0a2328] border-[#16444e] text-emerald-200 hover:border-emerald-500'
              }`}
              title={isBn ? 'খুঁজুন' : 'Search'}
              aria-label={isBn ? 'খুঁজুন' : 'Search'}
            >
              {isSearchOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={() => openShareModal(buildAll25IndexShareContent(), 'share')}
              className={`w-10 h-10 rounded-xl border flex items-center justify-center transition cursor-pointer active:scale-95 ${
                isDay
                  ? 'bg-white border-slate-200 text-[#006A4E] hover:bg-emerald-50'
                  : 'bg-[#0a2328] border-[#16444e] text-emerald-300 hover:bg-[#11333a]'
              }`}
              title={isBn ? 'শেয়ার' : 'Share'}
              aria-label={isBn ? 'শেয়ার' : 'Share'}
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => openShareModal(buildAll25IndexShareContent(), 'download')}
              className={`w-10 h-10 rounded-xl border flex items-center justify-center transition cursor-pointer active:scale-95 ${
                isDay
                  ? 'bg-white border-slate-200 text-[#006A4E] hover:bg-emerald-50'
                  : 'bg-[#0a2328] border-[#16444e] text-emerald-300 hover:bg-[#11333a]'
              }`}
              title={isBn ? 'PDF / ডাউনলোড' : 'Download'}
              aria-label={isBn ? 'ডাউনলোড' : 'Download'}
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Collapsible Scholarly Introduction (নবীদের কাহিনী ভূমিকা) */}
      <div
        className={`rounded-2xl border overflow-hidden transition-colors ${
          isDay
            ? 'bg-white border-emerald-200/80'
            : 'bg-[#082026] border-teal-900/60'
        }`}
      >
        <button
          type="button"
          onClick={() => {
            if (soundEnabled) soundHaptics.playTap();
            setShowIntroDrawer((prev) => !prev);
          }}
          className={`w-full px-4 sm:px-5 py-3.5 flex items-center justify-between gap-3 text-left transition cursor-pointer ${
            isDay ? 'hover:bg-emerald-50/50' : 'hover:bg-teal-950/40'
          }`}
        >
          <div className="flex items-center gap-3 min-w-0">
            <BookOpen
              className={`w-5 h-5 shrink-0 ${isDay ? 'text-[#006A4E]' : 'text-emerald-400'}`}
            />
            <div className="min-w-0">
              <div
                className={`text-sm font-black truncate ${
                  isDay ? 'text-slate-900' : 'text-white'
                }`}
              >
                {isBn ? PROPHETS_25_INTRO_OVERVIEW.titleBn : PROPHETS_25_INTRO_OVERVIEW.titleEn}
              </div>
              <div
                className={`text-[11px] font-medium truncate ${
                  isDay ? 'text-slate-500' : 'text-slate-400'
                }`}
              >
                {isBn ? PROPHETS_25_INTRO_OVERVIEW.subtitleBn : PROPHETS_25_INTRO_OVERVIEW.subtitleEn}
              </div>
            </div>
          </div>
          {showIntroDrawer ? (
            <ChevronUp className="w-5 h-5 shrink-0 text-emerald-500" />
          ) : (
            <ChevronDown className="w-5 h-5 shrink-0 text-emerald-500" />
          )}
        </button>

        {showIntroDrawer && (
          <div
            className={`px-4 sm:px-5 pb-5 pt-2 border-t space-y-4 ${
              isDay ? 'border-slate-200/80' : 'border-teal-900/50'
            }`}
          >
            <div
              className={`rounded-xl p-3.5 sm:p-4 space-y-1.5 ${
                isDay ? 'bg-[#f4faf7]' : 'bg-[#06181d]'
              }`}
            >
              <p
                dir="rtl"
                className={`font-arabic text-base sm:text-lg font-bold text-right ${
                  isDay ? 'text-[#005a42]' : 'text-amber-200'
                }`}
              >
                {PROPHETS_25_INTRO_OVERVIEW.verseAr}
              </p>
              <p
                className={`text-xs sm:text-sm leading-relaxed ${
                  isDay ? 'text-slate-700' : 'text-slate-200'
                }`}
              >
                {isBn
                  ? PROPHETS_25_INTRO_OVERVIEW.verseTransBn
                  : PROPHETS_25_INTRO_OVERVIEW.verseTransEn}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {PROPHETS_25_INTRO_FACTS.map((fact, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border space-y-1.5 ${
                    isDay
                      ? 'bg-[#f8fcfa] border-slate-200/80'
                      : 'bg-[#0a2329] border-teal-900/60'
                  }`}
                >
                  <div
                    className={`text-xs font-black ${
                      isDay ? 'text-[#006A4E]' : 'text-emerald-300'
                    }`}
                  >
                    {isBn ? fact.titleBn : fact.titleEn}
                  </div>
                  <div
                    className={`text-xs sm:text-sm font-extrabold ${
                      isDay ? 'text-amber-700' : 'text-amber-300'
                    }`}
                  >
                    {isBn ? fact.valueBn : fact.valueEn}
                  </div>
                  <p
                    className={`text-xs leading-relaxed ${
                      isDay ? 'text-slate-600' : 'text-slate-300'
                    }`}
                  >
                    {isBn ? fact.detailBn : fact.detailEn}
                  </p>
                  <div
                    className={`text-[11px] font-semibold pt-0.5 ${
                      isDay ? 'text-slate-500' : 'text-slate-400'
                    }`}
                  >
                    {isBn ? `সূত্র: ${fact.refBn}` : `Ref: ${fact.refEn}`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Search (Expandable via top icon) + Interactive Filter Strip */}
      <div className="space-y-3">
        {(isSearchOpen || searchQuery.trim().length > 0) && (
          <div className="relative animate-in fade-in duration-150">
            <Search
              className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${
                isDay ? 'text-slate-400' : 'text-emerald-400/70'
              }`}
            />
            <input
              type="text"
              autoFocus={isSearchOpen}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isBn
                  ? 'নবীর নাম, লকব, অঞ্চল বা কিতাব খুঁজুন...'
                  : 'Search prophet by name, title, or scripture...'
              }
              className={`w-full min-h-[44px] pl-10 pr-10 rounded-2xl border text-xs sm:text-sm font-medium outline-none transition ${
                isDay
                  ? 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-[#006A4E]'
                  : 'bg-[#082026] border-teal-900/70 text-white placeholder:text-slate-400 focus:border-emerald-400'
              }`}
            />
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setIsSearchOpen(false);
              }}
              aria-label="Close search"
              className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer ${
                isDay ? 'text-slate-500 hover:bg-slate-100' : 'text-slate-400 hover:bg-teal-900/50'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

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
                className={`min-h-[40px] px-3.5 rounded-xl border text-xs font-bold whitespace-nowrap shrink-0 transition cursor-pointer active:scale-95 ${
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
            ? `মোট ${toBnDigits(filteredProphets.length)} জন নবী ও রাসূল প্রদর্শিত হচ্ছে`
            : `Showing ${filteredProphets.length} of 25 Prophets & Messengers`}
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
            {isBn ? 'এই ফিল্টারে কোনো নবী ও রাসূল পাওয়া যায়নি।' : 'No prophets match this filter.'}
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
            if (p.quranStats?.surahCount && p.quranStats?.ayahCount) {
              metaLineParts.push(
                isBn
                  ? `${toBnDigits(p.quranStats.surahCount)} সূরা · ${toBnDigits(
                      p.quranStats.ayahCount
                    )} আয়াত`
                  : `${p.quranStats.surahCount} Surahs · ${p.quranStats.ayahCount} ayahs`
              );
            }
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
                    className={`text-[11px] font-bold tabular-nums leading-relaxed ${
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
                    className={`text-xs font-extrabold flex items-center gap-0.5 whitespace-nowrap ${
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
          {isBn ? 'কুরআনের মৌলিক আকীদা ও প্রামাণিক সূত্র' : 'Core Quranic Principle & Attribution'}
        </div>
        <p>
          {isBn
            ? 'আল্লাহ তাআলা মানবজাতির হেদায়াতের জন্য ১,২৪,০০০ নবী ও ৩১৫ জন রাসূল প্রেরণ করেছেন, যাঁদের মধ্যে পবিত্র কুরআনে এই ২৫ জনের নাম সরাসরি উল্লেখ রয়েছে (সূরা নিসা ৪:১৬৪, সূরা গাফির ৪০:৭৮; সিলসিলা ছহীহাহ হা/২৬৬৮)। একজন মুমিনের জন্য সকল নবী-রাসূলের প্রতি বিনা পার্থক্যে ঈমান আনা ফরয (সূরা বাকারা ২:২৮৫)। সকল তথ্য প্রফেসর ড. মুহাম্মাদ আসাদুল্লাহ আল-গালিব রচিত “নবীদের কাহিনী” (১ম ও ২য় খণ্ড), তাফসীরে ইবনে কাছীর এবং ছহীহ হাদীস গ্রন্থের আলোকে সংকলিত।'
            : 'Allah sent 124,000 prophets and 315 messengers across human history, 25 of whom are explicitly named in the Holy Quran (4:164, 40:78; Silsilah Sahihah 2668). Believing in all prophets without distinction is an article of faith (2:285). Compiled from Quran, Sahih Hadith, Tafsir Ibn Kathir, and Nobider Kahini Vols. 1–2.'}
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

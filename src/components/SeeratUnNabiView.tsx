/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { ThemeMode, ZikrLanguage } from '../types';
import {
  BookOpen,
  Calendar,
  Sparkles,
  Search,
  ChevronRight,
  ChevronLeft,
  X,
  Compass,
  ArrowLeft,
  Copy,
  Heart,
  ScrollText,
  MapPin,
  Check,
  Award,
  Layers,
  Clock,
  ShieldCheck,
  Quote,
  Volume2,
  VolumeX,
  Bookmark,
  CheckCircle2,
  RotateCcw,
  Share2,
  ExternalLink,
  Sliders,
  Filter,
  BookMarked,
  Sparkle,
  Users,
  Feather,
  Info,
} from 'lucide-react';
import { soundHaptics } from '../utils/audioHaptics';
import {
  SeeratAgeItem,
  SeeratPhaseKey,
  ClassicalSourceRef,
  KeySahabiInvolved,
  SEERAT_PHASES,
  SEERAT_DATABASE,
  SEERAT_UI,
} from '../data/seeratData';
import { SEERAT_LOCATIONS, getLocationForAge } from '../data/seeratLocations';
import { SeeratHistoricMapView } from './SeeratHistoricMapView';
import { SeeratTimelineView } from './SeeratTimelineView';
import { SeeratChapterMiniMap } from './SeeratChapterMiniMap';

interface SeeratUnNabiViewProps {
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
  soundEnabled?: boolean;
  onBackToHub?: () => void;
}

type ViewMode = 'toc' | 'timeline' | 'map' | 'cards';
type ReaderTab = 'biography' | 'references' | 'companions' | 'lessons';

const STORAGE_KEYS = {
  COMPLETED_AGES: 'zikr_seerat_completed_ages',
  BOOKMARKED_AGES: 'zikr_seerat_bookmarks',
  LAST_READ_AGE: 'zikr_seerat_last_read_age',
  FONT_SIZE: 'zikr_seerat_font_size',
};

// Fallback provider for authentic classical sources across any chapter
export const getChapterClassicalSources = (item: SeeratAgeItem): ClassicalSourceRef[] => {
  if (item.classicalSources && item.classicalSources.length > 0) {
    return item.classicalSources;
  }

  const phase = item.phaseKey;
  if (phase === 'infancy_childhood') {
    return [
      {
        bookBn: 'আর-রাহীকুল মাখতূম (صفوة الرحيق المختوم)',
        bookEn: 'Ar-Raheeq Al-Makhtum (The Sealed Nectar)',
        authorBn: 'আল্লামা সফিউর রহমান মুবারকপুরী (র.)',
        volumePage: 'অধ্যায়: শুভ জন্ম ও প্রাক-নবুওয়াত কাল (পৃষ্ঠা ৪১ - ৫৮)',
        referenceDetailBn: 'সহিহ সনদে বর্ণিত শৈশব, হালিমা আস-সাদিয়ার পরিবারে বরকত ও প্রথম বক্ষ বিদারণ।',
      },
      {
        bookBn: 'সীরাতে ইবনে হিশাম (سيرة ابن هشام)',
        bookEn: 'Seerat Ibn Hisham',
        authorBn: 'আবদুল মালিক ইবনে হিশাম (র.)',
        volumePage: 'খণ্ড ১, পৃষ্ঠা ১৫৫ - ১৮০',
        referenceDetailBn: 'কুরাইশদের প্রথা, মা আমিনার কোলে আগমন ও দাদা আবদুল মুত্তালিবের অভিভাবকত্ব।',
      },
      {
        bookBn: 'সহীহ আল-বুখারী (صحيح البخاري)',
        bookEn: 'Sahih al-Bukhari',
        authorBn: 'ইমাম মুহাম্মদ ইবনে ইসমাইল আল-বুখারী (র.)',
        volumePage: 'কিতাবুম মানাকিব (হাদিস নং ৩৮৮৭, ৩৯৫২)',
        referenceDetailBn: 'রাসুল (সা.)-এর শুভ জন্ম, দুধপান ও শৈশবের পবিত্র ঘটনাবলী।',
      },
    ];
  } else if (phase === 'youth_preprophetic') {
    return [
      {
        bookBn: 'আর-রাহীকুল মাখতূম (صفوة الرحيق المختوم)',
        bookEn: 'Ar-Raheeq Al-Makhtum',
        authorBn: 'আল্লামা সফিউর রহমান মুবারকপুরী (র.)',
        volumePage: 'অধ্যায়: যৌবন ও আল-আমীন চরিত্র (পৃষ্ঠা ৫৯ - ৭২)',
        referenceDetailBn: 'হিলফুল ফুজুল চুক্তি, ব্যবসা-বাণিজ্য ও খাদিজা (রা.)-এর সাথে মোবারক বিবাহ।',
      },
      {
        bookBn: 'জাদুল মাআদ (زاد المعاد في هدي خير العباد)',
        bookEn: 'Zad al-Ma\'ad',
        authorBn: 'ইমাম ইবনুল কাইয়্যিম আল-জাওযিয়্যাহ (র.)',
        volumePage: 'খণ্ড ১, পৃষ্ঠা ৮১ - ৯৫',
        referenceDetailBn: 'হাজরে আসওয়াদ পুনর্স্থাপন ও কুরাইশদের মধ্যকার বিবাদ মীমাংসা।',
      },
      {
        bookBn: 'সহীহ আল-বুখারী (صحيح البخاري)',
        bookEn: 'Sahih al-Bukhari',
        authorBn: 'ইমাম আল-বুখারী (র.)',
        volumePage: 'কিতাবুত তিজারাহ (হাদিস নং ২২৮২, ৩৮১৫)',
        referenceDetailBn: 'সততা ও আমানতদারীর মাধ্যমে ব্যবসায়িক সাফল্য ও আল-আমীন উপাধি।',
      },
    ];
  } else if (phase === 'makki_prophetic') {
    return [
      {
        bookBn: 'সহীহ আল-বুখারী (صحيح البخاري)',
        bookEn: 'Sahih al-Bukhari',
        authorBn: 'ইমাম মুহাম্মদ ইবনে ইসমাইল আল-বুখারী (র.)',
        volumePage: 'কিতাবু বাদইল ওয়াহি (হাদিস নং ৩, ৪, ৩৮৯২)',
        referenceDetailBn: 'হেরা গুহায় জিব্রাইল (আ.)-এর আগমন, প্রথম ওহী নাজিল ও মিরাজ গমন।',
      },
      {
        bookBn: 'সহীহ মুসলিম (صحيح مسلم)',
        bookEn: 'Sahih Muslim',
        authorBn: 'ইমাম মুসলিম ইবনুল হাজ্জাজ (র.)',
        volumePage: 'কিতাবুল ঈমান (হাদিস নং ১৬২ - ১৬৪)',
        referenceDetailBn: 'ইসরা ও মিরাজের পূর্ণাঙ্গ বিবরণ এবং পাঁচ ওয়াক্ত সালাত ফরজ হওয়া।',
      },
      {
        bookBn: 'সীরাতে ইবনে হিশাম (سيرة ابن هشام)',
        bookEn: 'Seerat Ibn Hisham',
        authorBn: 'আল-হাফিজ ইবনে হিশাম (র.)',
        volumePage: 'খণ্ড ১-২ (প্রকাশ্য দাওয়াত ও মক্কার নির্যাতন)',
        referenceDetailBn: 'হাবশায় হিজরত, বয়কট ও শিয়াবে আবি তালিবে ৩ বছর বন্দিদশা।',
      },
      {
        bookBn: 'আল-বিদায়া ওয়ান নিহায়া (البداية والنهاية)',
        bookEn: 'Al-Bidayah wan-Nihayah',
        authorBn: 'আল-হাফিজ ইবনে কাছীর (র.)',
        volumePage: 'খণ্ড ৩, পৃষ্ঠা ১৫ - ১২০',
        referenceDetailBn: 'তায়েফ সফর, আসহাবে আল-আকাবা বায়আত ও হিজরতের পূর্ব প্রস্তুতি।',
      },
    ];
  } else if (phase === 'madani_early') {
    return [
      {
        bookBn: 'আর-রাহীকুল মাখতূম (صفوة الرحيق المختوم)',
        bookEn: 'Ar-Raheeq Al-Makhtum',
        authorBn: 'আল্লামা সফিউর রহমান মুবারকপুরী (র.)',
        volumePage: 'অধ্যায়: হিজরত ও মদিনা রাষ্ট্র গঠন (পৃষ্ঠা ১৫১ - ১৮০)',
        referenceDetailBn: 'সাওর গুহায় আত্মগোপন, কুবা মসজিদ ও আনসার-মুহাজির ভ্রাতৃত্ব।',
      },
      {
        bookBn: 'সহীহ আল-বুখারী (صحيح البخاري)',
        bookEn: 'Sahih al-Bukhari',
        authorBn: 'ইমাম আল-বুখারী (র.)',
        volumePage: 'কিতাবুম মানাকিবিল আনসার (হাদিস নং ৩৯০৫, ৩৯১১)',
        referenceDetailBn: 'মদিনায় শুভ আগমন ও বিশ্ব ইতিহাসের প্রথম লিখিত সংবিধান (মদিনা সনদ)।',
      },
      {
        bookBn: 'সীরাতে ইবনে হিশাম (سيرة ابن هشام)',
        bookEn: 'Seerat Ibn Hisham',
        authorBn: 'আল-হাফিজ ইবনে হিশাম (র.)',
        volumePage: 'খণ্ড ২, পৃষ্ঠা ৫০০ - ৫৫০',
        referenceDetailBn: 'মসজিদে নববী নির্মাণ ও কিবলা বায়তুল মাকদিস থেকে কাবার দিকে পরিবর্তন।',
      },
    ];
  } else if (phase === 'madani_battles') {
    return [
      {
        bookBn: 'সহীহ আল-বুখারী (صحيح البخاري)',
        bookEn: 'Sahih al-Bukhari',
        authorBn: 'ইমাম আল-বুখারী (র.)',
        volumePage: 'কিতাবুল মাগাজী (হাদিস নং ৩৯৪৭ - ৪২১২)',
        referenceDetailBn: 'ঐতিহাসিক বদর, উহুদ, খন্দক (আহজাব) ও হুদাইবিয়ার সন্ধির প্রামাণ্য বিবরণ।',
      },
      {
        bookBn: 'সহীহ মুসলিম (صحيح مسلم)',
        bookEn: 'Sahih Muslim',
        authorBn: 'ইমাম মুসলিম (র.)',
        volumePage: 'কিতাবুল জিহাদ ওয়াস সিয়ার (হাদিস নং ১৭৬৩ - ১৮০২)',
        referenceDetailBn: 'সাহাবিদের আত্মত্যাগ, আল্লাহর আসমানি সাহায্য ও সন্ধির দূরদর্শী শর্তাবলী।',
      },
      {
        bookBn: 'জাদুল মাআদ (زاد المعاد)',
        bookEn: 'Zad al-Ma\'ad',
        authorBn: 'ইমাম ইবনুল কাইয়্যিম (র.)',
        volumePage: 'খণ্ড ৩ (গাজওয়াতু বদর ও হুদাইবিয়ার ফিকহ)',
        referenceDetailBn: 'যুদ্ধনীতি, বন্দিদের প্রতি মানবিক আচরণ ও বিশ্বনেতাদের নিকট পত্র প্রেরণ।',
      },
    ];
  } else {
    // victory & farewell
    return [
      {
        bookBn: 'সহীহ আল-বুখারী (صحيح البخاري)',
        bookEn: 'Sahih al-Bukhari',
        authorBn: 'ইমাম আল-বুখারী (র.)',
        volumePage: 'কিতাবুল মাগাজী ও কিতাবুল হজ্জ (হাদিস নং ৪২৮৬, ৪৩৪০)',
        referenceDetailBn: 'রক্তপাতহীন মক্কা বিজয়, সাধারণ ক্ষমা ঘোষণা ও বিদায় হজের মহাসনদ।',
      },
      {
        bookBn: 'সহীহ মুসলিম (صحيح مسلم)',
        bookEn: 'Sahih Muslim',
        authorBn: 'ইমাম মুসলিম (র.)',
        volumePage: 'হাদিস নং ১২১৮ (জাবের রা. বর্ণিত বিদায় হজের বর্ণনা)',
        referenceDetailBn: 'বিদায় হজের আরাফাত ময়দানে প্রদত্ত ঐতিহাসিক মানবাধিকার ভাষণ।',
      },
      {
        bookBn: 'আর-রাহীকুল মাখতূম (صفوة الرحيق المختوم)',
        bookEn: 'Ar-Raheeq Al-Makhtum',
        authorBn: 'আল্লামা সফিউর রহমান মুবারকপুরী (র.)',
        volumePage: 'অধ্যায়: রফীকুল আলায় যাত্রা ও পবিত্র ওফাত (পৃষ্ঠা ৪৬৫ - ৪৮৫)',
        referenceDetailBn: 'নবীজি (সা.)-এর শেষ অসুস্থতা, উম্মাহর জন্য অসিয়ত ও পরলোকে প্রস্থান।',
      },
    ];
  }
};

// Fallback provider for Key Sahaba involved
export const getChapterKeySahaba = (item: SeeratAgeItem): KeySahabiInvolved[] => {
  if (item.keySahabaInvolved && item.keySahabaInvolved.length > 0) {
    return item.keySahabaInvolved;
  }

  const phase = item.phaseKey;
  if (phase === 'infancy_childhood') {
    return [
      { nameBn: 'আমিনা বিনতে ওয়াহাব (মা)', nameEn: 'Aminah bint Wahb', roleBn: 'রত্নগর্ভা জননী', roleEn: 'Mother' },
      { nameBn: 'হালিমা আস-সাদিয়া (ধাত্রী মা)', nameEn: 'Halima As-Sa\'diyah', roleBn: 'দুধমা ও লালনকারী', roleEn: 'Foster Mother' },
      { nameBn: 'আবদুল মুত্তালিব (দাদা)', nameEn: 'Abdul Muttalib', roleBn: 'অভিভাবক ও কাবা রক্ষণাবেক্ষণকারী', roleEn: 'Grandfather' },
      { nameBn: 'আবু তালিব (চাচ্চু)', nameEn: 'Abu Talib', roleBn: 'পিতা সমতুল্য আশ্রয়দাতা চাচা', roleEn: 'Uncle & Protector' },
    ];
  } else if (phase === 'youth_preprophetic') {
    return [
      { nameBn: 'হজরত খাদিজাতুল কুবরা (রা.)', nameEn: 'Khadijah bint Khuwaylid (R.A.)', roleBn: 'পবিত্র সহধর্মিণী ও প্রথম বিশ্বাসী', roleEn: 'Beloved Wife & 1st Believer' },
      { nameBn: 'আবু তালিব (চাচ্চু)', nameEn: 'Abu Talib', roleBn: 'বাণিজ্য কাফেলা শিক্ষক ও অভিভাবক', roleEn: 'Uncle & Guardian' },
      { nameBn: 'হজরত আবু বকর সিদ্দিক (রা.)', nameEn: 'Abu Bakr Al-Siddiq (R.A.)', roleBn: 'ঘনিষ্ঠ বাল্যবন্ধু ও সত্যনিষ্ঠ সঙ্গী', roleEn: 'Intimate Friend' },
      { nameBn: 'হজরত জায়েদ ইবনে বনি হারেসা (রা.)', nameEn: 'Zayd ibn Harithah (R.A.)', roleBn: 'পাসंदीदा পালিত পুত্র ও সঙ্গী', roleEn: 'Adopted Son & Companion' },
    ];
  } else if (phase === 'makki_prophetic') {
    return [
      { nameBn: 'হজরত আবু বকর সিদ্দিক (রা.)', nameEn: 'Abu Bakr Al-Siddiq (R.A.)', roleBn: 'প্রথম পুরুষ মুসলমান ও হিজরতের সাথী', roleEn: 'First Male Muslim & Hijrah Companion' },
      { nameBn: 'হজরত খাদিজাতুল কুবরা (রা.)', nameEn: 'Khadijah bint Khuwaylid (R.A.)', roleBn: 'ইসলামের প্রথম আশ্রয়দাত্রী ও সান্ত্বনাদাত্রী', roleEn: 'First Believer & Pillar of Support' },
      { nameBn: 'হজরত আলী ইবনে আবী তালিব (রা.)', nameEn: 'Ali ibn Abi Talib (R.A.)', roleBn: 'প্রথম বালক মুসলমান ও বীর যোদ্ধা', roleEn: 'First Child Muslim & Hero' },
      { nameBn: 'হজরত উমর ইবনুল খাত্তাব (রা.)', nameEn: 'Umar ibn Al-Khattab (R.A.)', roleBn: 'ইসলামের দ্বিতীয় খলিফা ও শক্তিমান সাহাবি', roleEn: '2nd Caliph & Pillar of Islam' },
      { nameBn: 'হজরত হামজা ইবনে আবদুল মুত্তালিব (রা.)', nameEn: 'Hamza ibn Abd al-Muttalib (R.A.)', roleBn: 'সাইয়্যিদুশ শুহাদা ও প্রিয় চাচা', roleEn: 'Leader of Martyrs & Uncle' },
      { nameBn: 'হজরত বিলাল ইবনে রবাহ (রা.)', nameEn: 'Bilal ibn Rabah (R.A.)', roleBn: 'ঈমানের অবিচল পাহাড় ও প্রথম মুয়াজ্জিন', roleEn: 'Pillar of Faith & 1st Muezzin' },
    ];
  } else if (phase === 'madani_early') {
    return [
      { nameBn: 'হজরত আবু বকর সিদ্দিক (রা.)', nameEn: 'Abu Bakr Al-Siddiq (R.A.)', roleBn: 'সাওর গুহার সাথী ও আস-সিদ্দিক', roleEn: 'Companion of Cave Thawr' },
      { nameBn: 'হজরত মুসআব ইবনে উমাইর (রা.)', nameEn: 'Mus\'ab ibn \'Umair (R.A.)', roleBn: 'মদিনার প্রথম প্রিসিপটর ও দূত', roleEn: 'First Ambassador to Madinah' },
      { nameBn: 'হজরত আসআদ ইবনে জুরারাহ (রা.)', nameEn: 'As\'ad ibn Zurarah (R.A.)', roleBn: 'মদিনার প্রথম আনসার প্রধান', roleEn: 'Ansar Leader' },
      { nameBn: 'হজরত আয়েশা সিদ্দিকা (রা.)', nameEn: 'Aisha bint Abu Bakr (R.A.)', roleBn: 'উম্মুল মুমিনীন ও এলেমের ভান্ডার', roleEn: 'Mother of Believers & Scholar' },
    ];
  } else if (phase === 'madani_battles') {
    return [
      { nameBn: 'হজরত আলী ইবনে আবী তালিব (রা.)', nameEn: 'Ali ibn Abi Talib (R.A.)', roleBn: 'খাইবার ও বদরের পতাকা বাহক বীর সেনানী', roleEn: 'Standard Bearer & Hero' },
      { nameBn: 'হজরত উমর ফারূক (রা.)', nameEn: 'Umar ibn Al-Khattab (R.A.)', roleBn: 'সাহসী উপদেষ্টা ও সেনাপতি', roleEn: 'Advisor & Commander' },
      { nameBn: 'হজরত খালিদ ইবনে আল-ওয়ালিদ (রা.)', nameEn: 'Khalid ibn al-Walid (R.A.)', roleBn: 'সাইফুল্লাহ (আল্লাহর তরবারি)', roleEn: 'Sword of Allah' },
      { nameBn: 'হজরত আবু উবায়দা ইবনুল জাররাহ (রা.)', nameEn: 'Abu Ubaidah ibn al-Jarrah (R.A.)', roleBn: 'উম্মাহর বিশ্বস্ত ব্যক্তি (আমীনুল উম্মাহ)', roleEn: 'Trustworthy of the Ummah' },
    ];
  } else {
    // victory & farewell
    return [
      { nameBn: 'হজরত আবু বকর সিদ্দিক (রা.)', nameEn: 'Abu Bakr Al-Siddiq (R.A.)', roleBn: 'সালাতের ইমাম ও প্রথম খলিফা', roleEn: 'Imam of Prayer & 1st Caliph' },
      { nameBn: 'হজরত ফাতেমাতুজ জোহরা (রা.)', nameEn: 'Fatimah al-Zahra (R.A.)', roleBn: 'কলিজার টুকরো কন্যা', roleEn: 'Beloved Daughter' },
      { nameBn: 'হজরত আল-আব্বাস (রা.)', nameEn: 'Al-Abbas ibn Abd al-Muttalib (R.A.)', roleBn: 'শ্রদ্ধেয় চাচা ও আশ্রয়দাতা', roleEn: 'Uncle of the Prophet' },
      { nameBn: 'হজরত উসামা ইবনে জায়েদ (রা.)', nameEn: 'Usama ibn Zayd (R.A.)', roleBn: 'সর্বশেষ বাহিনীর কনিষ্ঠ সেনাপতি', roleEn: 'Young General' },
    ];
  }
};

// Fallback provider for Prophetic character traits
export const getChapterCharacterTraits = (item: SeeratAgeItem): string[] => {
  if (item.characterTraitsBn && item.characterTraitsBn.length > 0) {
    return item.characterTraitsBn;
  }
  const phase = item.phaseKey;
  if (phase === 'infancy_childhood') {
    return ['সহজাত পবিত্রতা', 'আসমানি বরকত', 'নম্রতা ও গাম্ভীর্য', 'সত্যবাদিতার পূর্বাভাস'];
  } else if (phase === 'youth_preprophetic') {
    return ['আল-আমীন (বিশ্বস্ততা)', 'আস-সাদিক (সত্যবাদিতা)', 'ইনসাফ ও বিচারবুদ্ধি', 'মর্যাদা ও শালীনতা'];
  } else if (phase === 'makki_prophetic') {
    return ['অবিচল সাবর (ধৈর্য)', 'তাওয়াক্কুল (আল্লাহর উপর ভরসা)', 'শত্রুর প্রতি ক্ষমা', 'উত্তম বক্তৃতা ও দাওয়াত'];
  } else if (phase === 'madani_early') {
    return ['দূরদর্শী নেতৃত্ব', 'ভ্রাতৃত্ব ও সহমর্মিতা', 'ইনসাফপূর্ণ বিচারব্যবস্থা', 'বিনয় ও সহজ সরল জীবন'];
  } else if (phase === 'madani_battles') {
    return ['অসীম সাহসিকতা', 'যুদ্ধক্ষেত্রে ক্ষমা ও ইনসাফ', 'চুক্তির প্রতি অনুগত থাকা', 'শহীদদের প্রতি ভালোবাসা'];
  } else {
    return ['রহমাতুল্লিল আলামীন (বিশ্বের জন্য দয়া)', 'ক্ষমাশীলতা (সাধারণ ক্ষমা)', 'উম্মাহর প্রতি অপার মমতা', 'আল্লাহর নৈকট্য লাভ'];
  }
};

export const SeeratUnNabiView: React.FC<SeeratUnNabiViewProps> = ({
  themeMode = 'night',
  selectedLanguage = 'bn',
  soundEnabled = true,
  onBackToHub,
}) => {
  const isDay = themeMode === 'day';
  const lang = selectedLanguage || 'bn';
  const isBn = lang === 'bn';
  const isAr = lang === 'ar';

  const t = (key: string): string => {
    const dict = SEERAT_UI[key];
    if (!dict) return '';
    return dict[lang] || dict['en'] || dict['bn'] || '';
  };

  const [viewMode, setViewMode] = useState<ViewMode>('toc');
  const [selectedAge, setSelectedAge] = useState<number | null>(null);
  const [readerTab, setReaderTab] = useState<ReaderTab>('biography');
  const [activePhaseFilter, setActivePhaseFilter] = useState<SeeratPhaseKey | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedChapter, setCopiedChapter] = useState(false);
  const [filterOnlyBookmarked, setFilterOnlyBookmarked] = useState(false);

  // Map state
  const [selectedMapLocationId, setSelectedMapLocationId] = useState<string | null>(null);
  const [showFullMapModal, setShowFullMapModal] = useState(false);

  // Share Card Modal state
  const [showShareModal, setShowShareModal] = useState(false);
  const [showBibliographyModal, setShowBibliographyModal] = useState(false);

  // Reader Settings
  const [fontSizeLevel, setFontSizeLevel] = useState<'normal' | 'large' | 'xl'>('normal');

  // Audio Speech Synthesis state
  const [isNarrating, setIsNarrating] = useState(false);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Progress & Bookmarks (LocalStorage backed)
  const [completedAges, setCompletedAges] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMPLETED_AGES);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [bookmarkedAges, setBookmarkedAges] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKMARKED_AGES);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [lastReadAge, setLastReadAge] = useState<number | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LAST_READ_AGE);
      return saved ? Number(saved) : null;
    } catch {
      return null;
    }
  });

  const [, startTransition] = React.useTransition();

  // Save changes to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COMPLETED_AGES, JSON.stringify(completedAges));
    } catch {
      // ignore
    }
  }, [completedAges]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKMARKED_AGES, JSON.stringify(bookmarkedAges));
    } catch {
      // ignore
    }
  }, [bookmarkedAges]);

  useEffect(() => {
    if (selectedAge !== null) {
      try {
        localStorage.setItem(STORAGE_KEYS.LAST_READ_AGE, String(selectedAge));
        setLastReadAge(selectedAge);
      } catch {
        // ignore
      }
    }
  }, [selectedAge]);

  // Scroll to top on changing chapter
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsNarrating(false);
    }
    setReaderTab('biography');
  }, [selectedAge]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSelectAge = (age: number | null, skipPushState = false) => {
    if (soundEnabled) soundHaptics.playTap();
    if (age !== null && !skipPushState) {
      try {
        window.history.pushState({ appModule: 'other', appSub: 'seerat_un_nabi', seeratAge: age }, '');
      } catch {}
    }
    startTransition(() => {
      setSelectedAge(age);
    });
  };

  useEffect(() => {
    const handleSeeratPopState = (event: PopStateEvent) => {
      const state = event.state;
      if (state && typeof state.seeratAge === 'number') {
        handleSelectAge(state.seeratAge, true);
      } else {
        setSelectedAge(null);
      }
    };

    window.addEventListener('popstate', handleSeeratPopState);
    return () => {
      window.removeEventListener('popstate', handleSeeratPopState);
    };
  }, []);

  const toggleBookmark = (age: number) => {
    if (soundEnabled) soundHaptics.playTargetChime();
    setBookmarkedAges((prev) =>
      prev.includes(age) ? prev.filter((a) => a !== age) : [...prev, age]
    );
  };

  const toggleCompleted = (age: number) => {
    if (soundEnabled) soundHaptics.playTargetChime();
    setCompletedAges((prev) =>
      prev.includes(age) ? prev.filter((a) => a !== age) : [...prev, age]
    );
  };

  const activeItem = useMemo(() => {
    if (selectedAge === null) return null;
    return SEERAT_DATABASE.find((item) => item.age === selectedAge) || null;
  }, [selectedAge]);

  const agesByPhase = useMemo(() => {
    const map: Record<SeeratPhaseKey, SeeratAgeItem[]> = {
      infancy_childhood: [],
      youth_preprophetic: [],
      makki_prophetic: [],
      madani_early: [],
      madani_battles: [],
      madani_victory_farewell: [],
    };

    SEERAT_DATABASE.forEach((item) => {
      if (map[item.phaseKey]) {
        map[item.phaseKey].push(item);
      }
    });

    return map;
  }, []);

  const filteredAges = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return SEERAT_DATABASE.filter((item) => {
      if (filterOnlyBookmarked && !bookmarkedAges.includes(item.age)) {
        return false;
      }

      const matchesPhase = activePhaseFilter === 'all' || item.phaseKey === activePhaseFilter;
      if (!matchesPhase) return false;

      if (!query) return true;

      const ageStr = String(item.age);
      const yearStr = String(item.yearCE);
      const titleBn = item.titleBn.toLowerCase();
      const titleEn = item.titleEn.toLowerCase();
      const titleAr = (item.titleAr || '').toLowerCase();
      const locBn = item.locationBn.toLowerCase();
      const locEn = item.locationEn.toLowerCase();
      const highlights = [...item.highlightsBn, ...item.highlightsEn].join(' ').toLowerCase();

      return (
        ageStr.includes(query) ||
        yearStr.includes(query) ||
        titleBn.includes(query) ||
        titleEn.includes(query) ||
        titleAr.includes(query) ||
        locBn.includes(query) ||
        locEn.includes(query) ||
        highlights.includes(query)
      );
    });
  }, [activePhaseFilter, searchQuery, filterOnlyBookmarked, bookmarkedAges]);

  const handleToggleAudio = () => {
    if (!('speechSynthesis' in window) || !activeItem) return;

    if (isNarrating) {
      window.speechSynthesis.cancel();
      setIsNarrating(false);
      return;
    }

    const narrative = isBn ? activeItem.historicalNarrativeBn : activeItem.historicalNarrativeEn;
    const emotional = isBn ? activeItem.emotionalStoryBn : activeItem.emotionalStoryEn;
    const title = isAr && activeItem.titleAr ? activeItem.titleAr : isBn ? activeItem.titleBn : activeItem.titleEn;

    const fullText = `${title}. ${narrative} ${emotional ? 'হৃদয়স্পর্শী ঘটনা: ' + emotional : ''}`;

    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.rate = speechRate;
    utterance.lang = isBn ? 'bn-BD' : isAr ? 'ar-SA' : 'en-US';

    utterance.onend = () => {
      setIsNarrating(false);
    };

    utterance.onerror = () => {
      setIsNarrating(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsNarrating(true);
    if (soundEnabled) soundHaptics.playTap();
  };

  const handleCopyChapter = () => {
    if (!activeItem) return;
    const title = isAr && activeItem.titleAr ? activeItem.titleAr : isBn ? activeItem.titleBn : activeItem.titleEn;
    const loc = isBn ? activeItem.locationBn : activeItem.locationEn;
    const narrative = isBn ? activeItem.historicalNarrativeBn : activeItem.historicalNarrativeEn;
    const emotional = isBn ? activeItem.emotionalStoryBn : activeItem.emotionalStoryEn;
    const sources = getChapterClassicalSources(activeItem);

    let text = `📜 ${title}\n📅 ${isBn ? 'বয়স:' : 'Age:'} ${activeItem.age} ${isBn ? 'বছর' : 'Years'} (${activeItem.yearCE} CE | ${activeItem.yearHijri})\n📍 ${isBn ? 'স্থান:' : 'Location:'} ${loc}\n\n`;
    text += `${isBn ? 'পূর্ণাঙ্গ ইতিহাস:' : 'Historical Chronicle:'}\n${narrative}\n\n`;
    if (emotional) {
      text += `${isBn ? 'হৃদয়স্পর্শী ঘটনা:' : 'Heart-Touching Moments:'}\n"${emotional}"\n\n`;
    }

    if (activeItem.quranRef) {
      text += `📖 ${isBn ? 'কুরআনের আয়াত:' : 'Quranic Verse:'} (সূরা ${activeItem.quranRef.surah} : ${activeItem.quranRef.ayah})\n"${activeItem.quranRef.meaningBn}"\n\n`;
    }

    if (activeItem.hadithRef) {
      text += `💬 ${isBn ? 'সহিহ হাদিস:' : 'Authentic Hadith:'} (${activeItem.hadithRef.source}) - ${isBn ? activeItem.hadithRef.textBn : activeItem.hadithRef.textEn}\n\n`;
    }

    if (sources.length > 0) {
      text += `📚 ${isBn ? 'প্রামাণ্য সিরাত বইয়ের সংকেত:' : 'Seerah Source Books:'}\n- ${sources.map((s) => s.bookBn).join('\n- ')}\n\n`;
    }

    text += `— Zikr+ App (zikrplus.app)`;

    navigator.clipboard.writeText(text);
    setCopiedChapter(true);
    if (soundEnabled) soundHaptics.playTargetChime();
    setTimeout(() => setCopiedChapter(false), 2000);
  };

  const handleOpenLocationOnMap = (locationId: string) => {
    setSelectedMapLocationId(locationId);
    setShowFullMapModal(true);
  };

  // =========================================================================
  // CHAPTER READER VIEW (DETAILED BIOGRAPHY FOR A SPECIFIC AGE)
  // =========================================================================
  if (activeItem) {
    const title = isAr && activeItem.titleAr ? activeItem.titleAr : isBn ? activeItem.titleBn : activeItem.titleEn;
    const phaseName = isAr
      ? SEERAT_PHASES.find((p) => p.key === activeItem.phaseKey)?.titleAr || activeItem.phaseNameEn
      : isBn
      ? activeItem.phaseNameBn
      : activeItem.phaseNameEn;
    const location = isBn ? activeItem.locationBn : activeItem.locationEn;
    const highlights = isBn ? activeItem.highlightsBn : activeItem.highlightsEn;
    const narrative = isBn ? activeItem.historicalNarrativeBn : activeItem.historicalNarrativeEn;
    const emotional = isBn ? activeItem.emotionalStoryBn : activeItem.emotionalStoryEn;
    const lessons = isBn ? activeItem.lessonsBn : activeItem.lessonsEn;

    const sources = getChapterClassicalSources(activeItem);
    const keySahaba = getChapterKeySahaba(activeItem);
    const characterTraits = getChapterCharacterTraits(activeItem);

    const hasPrev = activeItem.age > 1;
    const hasNext = activeItem.age < 63;
    const isCompleted = completedAges.includes(activeItem.age);
    const isBookmarked = bookmarkedAges.includes(activeItem.age);
    const locGeo = getLocationForAge(activeItem.age);

    const fontClass =
      fontSizeLevel === 'xl'
        ? 'text-lg sm:text-xl leading-relaxed'
        : fontSizeLevel === 'large'
        ? 'text-base sm:text-lg leading-relaxed'
        : 'text-sm sm:text-base leading-relaxed';

    return (
      <div className="w-full space-y-4 pb-28 animate-in fade-in duration-300">
        {/* Sticky Top Header Controls */}
        <div
          className={`sticky top-0 z-40 text-white shadow-xl rounded-2xl px-3 sm:px-4 py-2.5 flex items-center justify-between gap-2 border transition-colors ${
            isDay
              ? 'bg-gradient-to-r from-emerald-800 via-teal-900 to-emerald-950 border-emerald-600/40 shadow-emerald-900/20'
              : 'bg-gradient-to-r from-[#051814] via-[#0b2b24] to-[#0f3c32] border-emerald-500/30 shadow-black/60'
          }`}
        >
          <button
            onClick={() => handleSelectAge(null)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 active:scale-95 transition text-xs font-bold shrink-0 cursor-pointer border border-white/20"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">{t('backToToc')}</span>
          </button>

          <div className="text-center min-w-0 flex-1 px-1">
            <span className="text-[10px] sm:text-xs text-emerald-200 block truncate font-medium">
              {phaseName} ({activeItem.yearCE} CE)
            </span>
            <h2 className="text-xs sm:text-sm md:text-base font-extrabold text-white truncate">
              {t('ageLabel')} {activeItem.age} {isBn ? 'বছর' : 'Years'} — {title}
            </h2>
          </div>

          {/* Controls: Audio, Speed, Font, Bookmark, Share, Copy, Close */}
          <div className="flex items-center gap-1 shrink-0">
            {/* Audio Speech Speed Toggle */}
            {isNarrating && (
              <button
                onClick={() => {
                  const nextRate = speechRate === 1.0 ? 1.25 : speechRate === 1.25 ? 1.5 : 0.8;
                  setSpeechRate(nextRate);
                  if (utteranceRef.current && window.speechSynthesis) {
                    window.speechSynthesis.cancel();
                    setIsNarrating(false);
                  }
                }}
                className="px-2 py-1 rounded-lg bg-amber-500/30 text-amber-300 border border-amber-400/40 text-[10px] font-mono font-bold"
                title="Speed Rate"
              >
                {speechRate}x
              </button>
            )}

            {/* Audio Listen Button */}
            <button
              onClick={handleToggleAudio}
              className={`p-2 rounded-xl border transition cursor-pointer flex items-center gap-1 text-xs font-bold ${
                isNarrating
                  ? 'bg-amber-500 text-white border-amber-400 animate-pulse'
                  : 'bg-white/15 hover:bg-white/25 border-white/20 text-white'
              }`}
              title={isNarrating ? t('audioStop') : t('audioListen')}
            >
              {isNarrating ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span className="hidden md:inline text-[11px]">
                {isNarrating ? t('audioPlaying') : t('audioListen')}
              </span>
            </button>

            {/* Font Size Selector */}
            <button
              onClick={() => {
                if (soundEnabled) soundHaptics.playTap();
                setFontSizeLevel((prev) =>
                  prev === 'normal' ? 'large' : prev === 'large' ? 'xl' : 'normal'
                );
              }}
              className="p-2 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 transition cursor-pointer text-xs font-bold"
              title="Font Size (A / A+ / A++)"
            >
              <span className="font-serif font-black text-xs">
                {fontSizeLevel === 'normal' ? 'A' : fontSizeLevel === 'large' ? 'A+' : 'A++'}
              </span>
            </button>

            {/* Bookmark Button */}
            <button
              onClick={() => toggleBookmark(activeItem.age)}
              className={`p-2 rounded-xl border transition cursor-pointer ${
                isBookmarked
                  ? 'bg-amber-500 text-white border-amber-400'
                  : 'bg-white/15 hover:bg-white/25 border-white/20 text-white'
              }`}
              title={t('bookmark')}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-white' : ''}`} />
            </button>

            {/* Share Card Modal Trigger */}
            <button
              onClick={() => setShowShareModal(true)}
              className="p-2 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 transition cursor-pointer text-white"
              title="Share Chapter Poster"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Copy Text */}
            <button
              onClick={handleCopyChapter}
              className="p-2 rounded-xl bg-white/15 hover:bg-white/25 active:scale-95 transition text-xs font-bold flex items-center gap-1 cursor-pointer border border-white/20"
              title={t('copySummary')}
            >
              {copiedChapter ? (
                <Check className="w-4 h-4 text-emerald-300" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={() => handleSelectAge(null)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 transition cursor-pointer"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Horizontal Age Navigator (1 to 63) */}
        <div
          className={`p-2 rounded-2xl border flex items-center gap-1.5 overflow-x-auto scrollbar-thin scrollbar-thumb-emerald-700 ${
            isDay ? 'bg-emerald-50/80 border-emerald-200' : 'bg-[#061b17] border-emerald-800/60'
          }`}
        >
          <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 whitespace-nowrap pl-2 shrink-0">
            {t('quickAgeJump')}:
          </span>
          {SEERAT_DATABASE.map((item) => {
            const isCurrent = item.age === activeItem.age;
            const isDone = completedAges.includes(item.age);
            const isMarked = bookmarkedAges.includes(item.age);

            return (
              <button
                key={item.age}
                onClick={() => handleSelectAge(item.age)}
                className={`w-7 h-7 rounded-xl flex items-center justify-center font-mono font-bold text-xs shrink-0 transition-all cursor-pointer relative ${
                  isCurrent
                    ? 'bg-amber-500 text-white shadow-md ring-2 ring-amber-300 scale-105'
                    : isDone
                    ? 'bg-emerald-600 text-white'
                    : isDay
                    ? 'bg-white text-slate-700 hover:bg-emerald-100 border border-slate-200'
                    : 'bg-[#08221d] text-emerald-200 hover:bg-[#0f342c] border border-emerald-800/40'
                }`}
                title={`Age ${item.age}: ${item.titleBn}`}
              >
                {item.age}
                {isMarked && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-400 border border-white" />
                )}
              </button>
            );
          })}
        </div>

        {/* Primary Chapter Content Article Box */}
        <article
          className={`rounded-3xl p-5 sm:p-8 border shadow-xl space-y-6 transition-all ${
            isDay ? 'bg-white border-slate-200/90 text-slate-900' : 'bg-[#061c18] border-emerald-800/40 text-emerald-50'
          }`}
        >
          {/* Islamic Decorative Bismillah Banner */}
          <div className="text-center py-2 px-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-amber-500/15 to-emerald-500/10 border border-emerald-500/20">
            <p className="font-arabic text-xl sm:text-2xl text-emerald-800 dark:text-emerald-300 font-bold tracking-wide" dir="rtl">
              بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </p>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400/80 font-medium mt-0.5">
              পরম করুণাময় অসীম দয়ালু আল্লাহর নামে শুরু করছি
            </p>
          </div>

          {/* Header Metadata Section */}
          <div className="space-y-3 pb-5 border-b border-slate-200 dark:border-emerald-800/40">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-3.5 py-1 rounded-full text-xs font-bold tracking-wide border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                  {phaseName} · {t('ageLabel')} {activeItem.age} {isBn ? 'বছর' : 'Years'}
                </span>

                {/* Mark as Completed Toggle */}
                <button
                  onClick={() => toggleCompleted(activeItem.age)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition active:scale-95 cursor-pointer border ${
                    isCompleted
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-xs'
                      : isDay
                      ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-emerald-50'
                      : 'bg-[#09221d] border-emerald-700/60 text-emerald-300 hover:bg-[#0c2e27]'
                  }`}
                >
                  <CheckCircle2 className={`w-3.5 h-3.5 ${isCompleted ? 'text-white' : ''}`} />
                  <span>{isCompleted ? (isBn ? 'পঠিত সম্পন্ন ✓' : 'Completed ✓') : (isBn ? 'পঠিত চিহ্নিত করুন' : 'Mark as Read')}</span>
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-emerald-300/80">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{activeItem.yearCE} CE ({activeItem.yearHijri})</span>
                </span>
                <span>·</span>
                <button
                  onClick={() => handleOpenLocationOnMap(locGeo.id)}
                  className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                  title="View on Map"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{location}</span>
                </button>
              </div>
            </div>

            {/* Title & Arabic Honorific */}
            <div className="space-y-1">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                {title}
              </h1>
              {activeItem.titleAr && (
                <p className="font-arabic text-lg sm:text-xl text-emerald-700 dark:text-emerald-300/90 font-bold" dir="rtl">
                  {activeItem.titleAr}
                </p>
              )}
            </div>
          </div>

          {/* Tab Navigation inside Chapter Reader */}
          <div className="flex border-b border-slate-200 dark:border-emerald-800/40 overflow-x-auto scrollbar-none gap-2 text-xs font-extrabold">
            <button
              onClick={() => {
                if (soundEnabled) soundHaptics.playTap();
                setReaderTab('biography');
              }}
              className={`pb-2.5 px-3 border-b-2 transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                readerTab === 'biography'
                  ? 'border-emerald-600 text-emerald-600 dark:border-emerald-400 dark:text-emerald-300 font-black'
                  : 'border-transparent text-slate-500 dark:text-emerald-400/60 hover:text-slate-800 dark:hover:text-emerald-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t('tabBiography')}</span>
            </button>

            <button
              onClick={() => {
                if (soundEnabled) soundHaptics.playTap();
                setReaderTab('references');
              }}
              className={`pb-2.5 px-3 border-b-2 transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                readerTab === 'references'
                  ? 'border-emerald-600 text-emerald-600 dark:border-emerald-400 dark:text-emerald-300 font-black'
                  : 'border-transparent text-slate-500 dark:text-emerald-400/60 hover:text-slate-800 dark:hover:text-emerald-200'
              }`}
            >
              <ScrollText className="w-3.5 h-3.5 text-amber-500" />
              <span>{t('tabReferences')}</span>
              <span className="px-1.5 py-0.2 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-300 text-[10px] font-mono">
                {sources.length + (activeItem.quranRef ? 1 : 0) + (activeItem.hadithRef ? 1 : 0)}
              </span>
            </button>

            <button
              onClick={() => {
                if (soundEnabled) soundHaptics.playTap();
                setReaderTab('companions');
              }}
              className={`pb-2.5 px-3 border-b-2 transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                readerTab === 'companions'
                  ? 'border-emerald-600 text-emerald-600 dark:border-emerald-400 dark:text-emerald-300 font-black'
                  : 'border-transparent text-slate-500 dark:text-emerald-400/60 hover:text-slate-800 dark:hover:text-emerald-200'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>{t('tabCompanions')}</span>
            </button>

            <button
              onClick={() => {
                if (soundEnabled) soundHaptics.playTap();
                setReaderTab('lessons');
              }}
              className={`pb-2.5 px-3 border-b-2 transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                readerTab === 'lessons'
                  ? 'border-emerald-600 text-emerald-600 dark:border-emerald-400 dark:text-emerald-300 font-black'
                  : 'border-transparent text-slate-500 dark:text-emerald-400/60 hover:text-slate-800 dark:hover:text-emerald-200'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              <span>{t('tabLessons')}</span>
            </button>
          </div>

          {/* TAB 1: FULL BIOGRAPHY & HISTORICAL CHRONICLE */}
          {readerTab === 'biography' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Key Highlights / Milestones */}
              <div
                className={`rounded-2xl p-4 sm:p-5 border transition-all ${
                  isDay
                    ? 'bg-emerald-50/70 border-emerald-200/80 text-emerald-950'
                    : 'bg-[#092620]/90 border-emerald-700/50 text-emerald-100'
                }`}
              >
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider mb-3 text-emerald-700 dark:text-emerald-300">
                  <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{t('keyHighlights')}</span>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                  {highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 mt-2 shrink-0" />
                      <span className="leading-relaxed font-medium">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Geographic Location & Mini-Map */}
              <SeeratChapterMiniMap
                location={locGeo}
                themeMode={themeMode}
                selectedLanguage={selectedLanguage}
                onOpenFullMap={handleOpenLocationOnMap}
              />

              {/* Detailed Historical Narrative Text */}
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-emerald-800/40">
                  <div className="flex items-center gap-2 text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                    <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>{t('narrativeTitle')}</span>
                  </div>

                  {isNarrating && (
                    <span className="inline-flex items-center gap-1.5 text-xs text-amber-500 font-bold animate-pulse">
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{t('audioPlaying')}</span>
                    </span>
                  )}
                </div>

                <div className="space-y-4 font-serif">
                  {narrative.split('\n\n').map((paragraph, idx) => (
                    <p
                      key={idx}
                      className={`${fontClass} ${isDay ? 'text-slate-900 font-normal' : 'text-emerald-100'} leading-relaxed font-serif ${
                        idx === 0
                          ? `first-letter:float-left first-letter:text-3xl sm:first-letter:text-4xl first-letter:font-black first-letter:mr-2.5 first-letter:mt-0.5 ${isDay ? 'first-letter:text-emerald-800' : 'first-letter:text-emerald-400'}`
                          : ''
                      }`}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DIVINE & CLASSICAL BOOK REFERENCES */}
          {readerTab === 'references' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Divine Quranic Verse Reference */}
              {activeItem.quranRef && (
                <div
                  className={`rounded-2xl p-5 border space-y-3 ${
                    isDay
                      ? 'bg-teal-50/80 border-teal-200 text-teal-950'
                      : 'bg-[#082224]/90 border-teal-700/50 text-teal-100'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold text-teal-700 dark:text-teal-300">
                    <span className="flex items-center gap-1.5 uppercase tracking-wider">
                      <ScrollText className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                      <span>{t('quranReferenceTitle')}</span>
                    </span>
                    <span className="px-3 py-1 rounded-full bg-teal-500/15 border border-teal-500/30 font-mono">
                      {isBn ? 'সূরা' : 'Surah'} {activeItem.quranRef.surah} : {activeItem.quranRef.ayah}
                    </span>
                  </div>
                  {activeItem.quranRef.arabic && (
                    <p className="font-arabic text-lg sm:text-xl text-teal-900 dark:text-teal-200 text-right leading-loose pt-1 font-bold" dir="rtl">
                      {activeItem.quranRef.arabic}
                    </p>
                  )}
                  <p className={`text-xs sm:text-sm leading-relaxed italic p-3 rounded-xl border border-teal-300/30 ${
                    isDay ? 'text-slate-900 bg-white/80 font-medium' : 'text-teal-100 bg-black/20'
                  }`}>
                    "{isBn ? activeItem.quranRef.meaningBn : activeItem.quranRef.meaningEn}"
                  </p>
                </div>
              )}

              {/* Authentic Hadith Citation */}
              {activeItem.hadithRef && (
                <div
                  className={`rounded-2xl p-5 border space-y-3 ${
                    isDay
                      ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                      : 'bg-[#0c1815] border-emerald-800/60 text-emerald-100'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-700 dark:text-emerald-400">
                    <span className="flex items-center gap-1.5 uppercase tracking-wider">
                      <Quote className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>{t('hadithReferenceTitle')}</span>
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30">
                      {activeItem.hadithRef.source}
                    </span>
                  </div>
                  <p className={`text-xs font-medium ${isDay ? 'text-slate-700' : 'text-emerald-300'}`}>
                    {isBn ? 'বর্ণনাকারী:' : 'Narrator:'} <span className={`font-bold ${isDay ? 'text-slate-900' : 'text-emerald-200'}`}>{activeItem.hadithRef.narrator}</span>
                  </p>
                  <p className={`text-xs sm:text-sm leading-relaxed italic font-serif p-3 rounded-xl border border-emerald-300/30 ${
                    isDay ? 'text-slate-900 bg-white/80 font-medium' : 'text-emerald-100 bg-black/20'
                  }`}>
                    "{isBn ? activeItem.hadithRef.textBn : activeItem.hadithRef.textEn}"
                  </p>
                </div>
              )}

              {/* Authentic Classical Seerah Books List */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm sm:text-base font-extrabold text-slate-900 dark:text-white pb-2 border-b border-slate-200 dark:border-emerald-800/40">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>{t('classicalRefTitle')}</span>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {sources.map((src, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl border transition-all space-y-1.5 ${
                        isDay
                          ? 'bg-amber-50/50 border-amber-200/90 text-slate-900 hover:bg-amber-50'
                          : 'bg-[#08221d] border-emerald-800/60 text-emerald-100 hover:bg-[#0c2e27]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs sm:text-sm font-extrabold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                          <BookOpen className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                          <span>{src.bookBn}</span>
                        </h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 font-bold">
                          {src.volumePage || 'মূল গ্রন্থ'}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-emerald-300/80 font-medium">
                        {isBn ? 'লেখক / সংকলক:' : 'Author:'} <span className="font-semibold text-slate-800 dark:text-emerald-100">{src.authorBn}</span>
                      </p>

                      {src.referenceDetailBn && (
                        <p className="text-xs text-slate-600 dark:text-emerald-200/90 leading-relaxed font-serif bg-white/50 dark:bg-black/30 p-2.5 rounded-xl border border-amber-200/40">
                          {src.referenceDetailBn}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: KEY SAHABA INVOLVED & PROPHETIC CHARACTER VIRTUES */}
          {readerTab === 'companions' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Prophetic Noble Virtues (আখলাকে হাসানা) */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm sm:text-base font-extrabold text-slate-900 dark:text-white pb-2 border-b border-slate-200 dark:border-emerald-800/40">
                  <Feather className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{t('characterTraitsTitle')}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {characterTraits.map((trait, idx) => (
                    <div
                      key={idx}
                      className={`px-3.5 py-2 rounded-2xl border text-xs font-extrabold flex items-center gap-1.5 shadow-xs ${
                        isDay
                          ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200 text-emerald-900'
                          : 'bg-[#092822] border-emerald-700/60 text-emerald-200'
                      }`}
                    >
                      <Sparkle className="w-3.5 h-3.5 text-amber-500" />
                      <span>{trait}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Noble Sahaba Involved */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm sm:text-base font-extrabold text-slate-900 dark:text-white pb-2 border-b border-slate-200 dark:border-emerald-800/40">
                  <Users className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <span>{t('keySahabaTitle')}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {keySahaba.map((sahabi, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 ${
                        isDay
                          ? 'bg-slate-50 border-slate-200 text-slate-900'
                          : 'bg-[#08221d] border-emerald-800/60 text-emerald-100'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span>{isBn ? sahabi.nameBn : sahabi.nameEn}</span>
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-emerald-300/80 font-medium pl-3.5">
                          {isBn ? sahabi.roleBn : sahabi.roleEn}
                        </p>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
                        رضي الله عنه
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: LESSONS FOR UMMAH & HEART-TOUCHING STORY */}
          {readerTab === 'lessons' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Heart-Touching Emotional Story */}
              {emotional && (
                <div
                  className={`rounded-2xl p-5 border relative overflow-hidden space-y-2 ${
                    isDay
                      ? 'bg-amber-50/90 border-amber-300 text-slate-900'
                      : 'bg-[#1a1c12]/90 border-amber-700/50 text-amber-100'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                    <Heart className="w-4 h-4 text-rose-500" />
                    <span>{t('emotionalStoryTitle')}</span>
                  </div>
                  <p className={`${fontClass} italic whitespace-pre-line font-serif leading-relaxed ${
                    isDay ? 'text-slate-900 font-medium' : 'text-amber-100'
                  }`}>
                    "{emotional}"
                  </p>
                </div>
              )}

              {/* Enduring Lessons for the Ummah */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm sm:text-base font-extrabold text-slate-900 dark:text-white pb-2 border-b border-slate-200 dark:border-emerald-800/40">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{t('lessonsTitle')}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {lessons.map((les, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl border flex items-start gap-2.5 ${
                        isDay
                          ? 'bg-slate-50/90 border-slate-200 text-slate-800'
                          : 'bg-[#09221d] border-emerald-800/50 text-emerald-100'
                      }`}
                    >
                      <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0 font-bold" />
                      <span className="text-xs sm:text-sm leading-relaxed font-medium">{les}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Bottom Prev / Next Navigation Footer */}
          <div className="pt-6 border-t border-slate-200 dark:border-emerald-800/40 flex items-center justify-between gap-2">
            <button
              disabled={!hasPrev}
              onClick={() => handleSelectAge(activeItem.age - 1)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition active:scale-95 cursor-pointer ${
                hasPrev
                  ? 'bg-slate-100 dark:bg-emerald-900/40 hover:bg-slate-200 dark:hover:bg-emerald-800/50 text-slate-800 dark:text-white border border-slate-300 dark:border-emerald-700/50'
                  : 'opacity-40 cursor-not-allowed text-slate-400'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{t('prevAge')} ({activeItem.age - 1})</span>
            </button>

            <button
              onClick={() => handleSelectAge(null)}
              className="px-4 py-2.5 rounded-2xl text-xs font-bold transition active:scale-95 cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
            >
              {t('backToToc')}
            </button>

            <button
              disabled={!hasNext}
              onClick={() => handleSelectAge(activeItem.age + 1)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition active:scale-95 cursor-pointer ${
                hasNext
                  ? 'bg-slate-100 dark:bg-emerald-900/40 hover:bg-slate-200 dark:hover:bg-emerald-800/50 text-slate-800 dark:text-white border border-slate-300 dark:border-emerald-700/50'
                  : 'opacity-40 cursor-not-allowed text-slate-400'
              }`}
            >
              <span>{t('nextAge')} ({activeItem.age + 1})</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </article>

        {/* Share Social Poster Modal */}
        {showShareModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in">
            <div
              className={`w-full max-w-lg rounded-3xl p-6 border shadow-2xl space-y-4 relative ${
                isDay ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#09241e] border-emerald-700 text-white'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-emerald-800/50">
                <div className="flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="text-base font-extrabold">{t('shareChapter')}</h3>
                </div>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-emerald-800 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Poster Preview Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-900 via-teal-950 to-emerald-950 text-white space-y-3 border border-emerald-500/30">
                <div className="flex items-center justify-between text-xs text-emerald-300 font-semibold">
                  <span>বয়স {activeItem.age} বছর ({activeItem.yearCE} CE)</span>
                  <span>{activeItem.yearHijri}</span>
                </div>

                <h4 className="text-base font-black text-amber-300 leading-snug">{title}</h4>

                <p className="text-xs text-emerald-100/90 italic font-serif leading-relaxed line-clamp-4">
                  "{narrative.slice(0, 220)}..."
                </p>

                {activeItem.quranRef && (
                  <div className="p-2.5 rounded-xl bg-white/10 text-[11px] text-teal-200">
                    📖 সূরা {activeItem.quranRef.surah} ({activeItem.quranRef.ayah}): "{activeItem.quranRef.meaningBn}"
                  </div>
                )}

                <div className="pt-2 flex items-center justify-between text-[10px] text-emerald-400 border-t border-white/10 font-mono">
                  <span>রেফারেন্স: আর-রাহীকুল মাখতূম ও সহিহ হাদিস</span>
                  <span>Zikr+ App</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={handleCopyChapter}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copiedChapter ? 'কপি করা হয়েছে ✓' : 'টেক্সট কপি করুন'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Full Historic Map Modal if triggered */}
        {showFullMapModal && (
          <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-2 sm:p-4 animate-in fade-in">
            <div className="w-full max-w-5xl h-[90vh] bg-transparent rounded-3xl overflow-hidden relative">
              <SeeratHistoricMapView
                themeMode={themeMode}
                selectedLanguage={selectedLanguage}
                soundEnabled={soundEnabled}
                selectedLocationId={selectedMapLocationId}
                isModal={true}
                onClose={() => setShowFullMapModal(false)}
                onSelectAgeChapter={(age) => {
                  setShowFullMapModal(false);
                  handleSelectAge(age);
                }}
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // MAIN SEERAT-UN-NABI OVERVIEW (TOC, TIMELINE, MAP, CARDS)
  // =========================================================================
  const completionPercentage = Math.round((completedAges.length / 63) * 100);

  return (
    <div className="w-full space-y-5 animate-in fade-in duration-300">
      {/* Top Hero Banner with Reading Progress & Quick Stats - Slim & Compact */}
      <div
        className={`rounded-2xl p-3.5 sm:p-4.5 border relative overflow-hidden transition-all shadow-sm ${
          isDay
            ? 'bg-gradient-to-br from-emerald-50 via-teal-50 to-amber-50/50 border-emerald-200/90 text-slate-900'
            : 'bg-gradient-to-br from-[#061b17] via-[#092b23] to-[#122e26] border-emerald-800/50 text-white'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>{t('headerBadge')}</span>
              <span className="w-1 h-1 rounded-full bg-emerald-500" />
              <span>{isBn ? '৬৩টি পূর্ণাঙ্গ অধ্যায় (১-৬৩ বছর)' : '63 Complete Chapters (Ages 1-63)'}</span>
            </div>

            <h1 className="text-base sm:text-lg md:text-xl font-black tracking-tight text-slate-900 dark:text-white">
              {t('mainTitle')}
            </h1>

            <p className="text-[11px] sm:text-xs text-slate-600 dark:text-emerald-200/80 max-w-2xl leading-snug line-clamp-2 md:line-clamp-none">
              {t('subTitle')}
            </p>
          </div>

          {/* Reading Progress Metric & Resume Button */}
          <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-2 shrink-0 pt-1 md:pt-0 border-t md:border-t-0 border-slate-200/60 dark:border-emerald-800/40">
            <div className="flex items-center gap-1.5 flex-wrap">
              {lastReadAge && (
                <button
                  onClick={() => handleSelectAge(lastReadAge)}
                  className="px-2.5 py-1 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-[11px] flex items-center gap-1 shadow-2xs transition active:scale-95 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{isBn ? `সর্বশেষ পঠিত (বয়স ${lastReadAge})` : `Resume (${lastReadAge})`}</span>
                </button>
              )}

              <button
                onClick={() => {
                  if (soundEnabled) soundHaptics.playTap();
                  setShowBibliographyModal(true);
                }}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border transition flex items-center gap-1 cursor-pointer active:scale-95 ${
                  isDay
                    ? 'bg-amber-100 text-amber-950 border-amber-300 hover:bg-amber-200'
                    : 'bg-emerald-950/80 text-amber-300 border-emerald-700/60 hover:bg-emerald-900'
                }`}
                title="View Classical Seerah Bibliography"
              >
                <BookOpen className="w-3 h-3 text-amber-500" />
                <span>{isBn ? 'সীরাত গ্রন্থমালা' : 'Bibliography'}</span>
              </button>

              {onBackToHub && (
                <button
                  onClick={onBackToHub}
                  className={`p-1.5 rounded-xl text-xs font-bold border transition cursor-pointer active:scale-95 ${
                    isDay
                      ? 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
                      : 'bg-[#09221d] text-emerald-300 border-emerald-800/60 hover:bg-[#0f342c]'
                  }`}
                  title="Back to Hub"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Reading Progress Bar */}
            <div className="w-32 sm:w-40 space-y-0.5">
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-600 dark:text-emerald-300">
                <span>{t('readingProgress')}</span>
                <span className="font-mono">{completedAges.length}/63 ({completionPercentage}%)</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-emerald-950/80 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500 rounded-full"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Mode Switcher: TOC / Timeline / Map / Cards */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        {/* View Mode Tabs */}
        <div
          className={`p-1 rounded-2xl border flex items-center gap-1 overflow-x-auto scrollbar-none text-xs font-bold ${
            isDay ? 'bg-slate-100 border-slate-300' : 'bg-[#061b17] border-emerald-800/60'
          }`}
        >
          <button
            onClick={() => {
              if (soundEnabled) soundHaptics.playTap();
              setViewMode('toc');
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition cursor-pointer whitespace-nowrap ${
              viewMode === 'toc'
                ? 'bg-emerald-600 text-white shadow-xs'
                : isDay
                ? 'text-slate-700 hover:text-slate-900'
                : 'text-emerald-200 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{t('viewModeToc')}</span>
          </button>

          <button
            onClick={() => {
              if (soundEnabled) soundHaptics.playTap();
              setViewMode('timeline');
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition cursor-pointer whitespace-nowrap ${
              viewMode === 'timeline'
                ? 'bg-emerald-600 text-white shadow-xs'
                : isDay
                ? 'text-slate-700 hover:text-slate-900'
                : 'text-emerald-200 hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>{t('viewModeTimeline')}</span>
          </button>

          <button
            onClick={() => {
              if (soundEnabled) soundHaptics.playTap();
              setViewMode('map');
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition cursor-pointer whitespace-nowrap ${
              viewMode === 'map'
                ? 'bg-emerald-600 text-white shadow-xs'
                : isDay
                ? 'text-slate-700 hover:text-slate-900'
                : 'text-emerald-200 hover:text-white'
            }`}
          >
            <Compass className="w-4 h-4 text-amber-400" />
            <span>{t('viewModeMap')}</span>
          </button>

          <button
            onClick={() => {
              if (soundEnabled) soundHaptics.playTap();
              setViewMode('cards');
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition cursor-pointer whitespace-nowrap ${
              viewMode === 'cards'
                ? 'bg-emerald-600 text-white shadow-xs'
                : isDay
                ? 'text-slate-700 hover:text-slate-900'
                : 'text-emerald-200 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{t('viewModeCards')}</span>
          </button>
        </div>

        {/* Bookmarks filter pill */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              if (soundEnabled) soundHaptics.playTap();
              setFilterOnlyBookmarked((prev) => !prev);
            }}
            className={`px-3 py-2 rounded-2xl text-xs font-bold border transition flex items-center gap-1.5 cursor-pointer ${
              filterOnlyBookmarked
                ? 'bg-amber-500 text-white border-amber-400 shadow-sm'
                : isDay
                ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                : 'bg-[#061b17] border-emerald-800 text-emerald-200 hover:bg-[#0a2923]'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${filterOnlyBookmarked ? 'fill-white' : ''}`} />
            <span>{t('bookmark')}</span>
            <span className="font-mono text-[10px] px-1.5 py-0.2 rounded-full bg-black/20">
              {bookmarkedAges.length}
            </span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      {viewMode !== 'map' && (
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className={`w-full pl-9 pr-8 py-2.5 rounded-2xl text-xs sm:text-sm font-medium border transition-colors outline-none ${
                isDay
                  ? 'bg-white border-slate-300 text-slate-900 focus:border-emerald-500 shadow-xs'
                  : 'bg-[#061b17] border-emerald-800/60 text-emerald-100 placeholder:text-emerald-500/60 focus:border-emerald-500 shadow-xs'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none py-1">
            <button
              onClick={() => {
                if (soundEnabled) soundHaptics.playTap();
                setActivePhaseFilter('all');
              }}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition active:scale-95 cursor-pointer border ${
                activePhaseFilter === 'all'
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                  : isDay
                  ? 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                  : 'bg-[#09221d] text-emerald-300 border-emerald-800/60 hover:bg-[#0f342c]'
              }`}
            >
              {t('allAges')}
            </button>

            {SEERAT_PHASES.map((phase) => (
              <button
                key={phase.key}
                onClick={() => {
                  if (soundEnabled) soundHaptics.playTap();
                  setActivePhaseFilter(phase.key);
                }}
                className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition active:scale-95 cursor-pointer border ${
                  activePhaseFilter === phase.key
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                    : isDay
                    ? 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    : 'bg-[#09221d] text-emerald-300 border-emerald-800/60 hover:bg-[#0f342c]'
                }`}
              >
                <span>{phase.icon}</span>{' '}
                <span>{isBn ? phase.ageRangeBn || phase.ageRange : phase.ageRangeEn || phase.ageRange}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* VIEW MODE 1: HISTORIC MAP VIEW */}
      {viewMode === 'map' && (
        <SeeratHistoricMapView
          themeMode={themeMode}
          selectedLanguage={selectedLanguage}
          soundEnabled={soundEnabled}
          selectedLocationId={selectedMapLocationId}
          onSelectAgeChapter={handleSelectAge}
        />
      )}

      {/* VIEW MODE 2: CHRONOLOGICAL TIMELINE VIEW */}
      {viewMode === 'timeline' && (
        <SeeratTimelineView
          themeMode={themeMode}
          selectedLanguage={selectedLanguage}
          soundEnabled={soundEnabled}
          items={filteredAges}
          bookmarkedAges={bookmarkedAges}
          completedAges={completedAges}
          onSelectAge={handleSelectAge}
          onOpenLocationMap={handleOpenLocationOnMap}
        />
      )}

      {/* VIEW MODE 3: BOOK TABLE OF CONTENTS (TOC) */}
      {viewMode === 'toc' && (
        <div
          className={`rounded-3xl p-5 sm:p-6 border transition-all space-y-4 shadow-sm ${
            isDay ? 'bg-amber-50/40 border-amber-200/80 text-slate-900' : 'bg-[#061b17] border-emerald-800/40 text-white'
          }`}
        >
          <div className="flex items-center justify-between pb-2 border-b border-amber-200/60 dark:border-emerald-800/40">
            <div className="flex items-center gap-2">
              <span className="text-xl">📖</span>
              <div>
                <h2 className="text-base sm:text-lg font-black text-amber-900 dark:text-amber-300">
                  {t('tocTitle')}
                </h2>
                <p className="text-xs text-slate-500 dark:text-emerald-300/70 font-medium">
                  {t('tocHint')}
                </p>
              </div>
            </div>
          </div>

          {/* 6 Era Columns of Book Table of Contents */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {SEERAT_PHASES.map((phase) => {
              const phaseAges = agesByPhase[phase.key] || [];
              const phaseTitle = isAr ? phase.titleAr : isBn ? phase.titleBn : phase.titleEn;

              return (
                <div
                  key={phase.key}
                  className={`rounded-2xl p-3.5 border flex flex-col justify-start transition-all ${
                    isDay
                      ? 'bg-white border-amber-200/90 shadow-xs'
                      : 'bg-[#08221d] border-emerald-700/50 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-emerald-800/40 mb-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="text-base">{phase.icon}</span>
                      <h3 className="text-xs sm:text-sm font-extrabold text-amber-900 dark:text-amber-300 truncate">
                        {phaseTitle}
                      </h3>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 shrink-0">
                      {isBn ? `${phaseAges.length}টি বছর` : `${phaseAges.length} Years`}
                    </span>
                  </div>

                  <div className="space-y-1 max-h-60 overflow-y-auto scrollbar-thin pr-1">
                    {phaseAges.map((item) => {
                      const itemTitle = isAr && item.titleAr ? item.titleAr : isBn ? item.titleBn : item.titleEn;
                      const isItemCompleted = completedAges.includes(item.age);
                      const isItemBookmarked = bookmarkedAges.includes(item.age);

                      return (
                        <button
                          key={item.age}
                          onClick={() => handleSelectAge(item.age)}
                          className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs transition flex items-center justify-between gap-1.5 active:scale-95 cursor-pointer ${
                            isDay
                              ? 'hover:bg-amber-50 text-slate-800'
                              : 'hover:bg-[#0c2e27] text-emerald-100'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="font-mono font-extrabold text-amber-600 dark:text-amber-400 text-xs shrink-0">
                              {item.age}.
                            </span>
                            <span className="truncate font-semibold">{itemTitle}</span>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            {isItemBookmarked && (
                              <Bookmark className="w-3 h-3 text-amber-500 fill-amber-500" />
                            )}
                            {isItemCompleted && (
                              <span className="text-emerald-500 font-bold text-xs">✓</span>
                            )}
                            <span className="text-[10px] font-mono opacity-60 text-slate-400">
                              {item.yearCE}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW MODE 4: CARD GRID */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredAges.map((item) => {
            const itemTitle = isAr && item.titleAr ? item.titleAr : isBn ? item.titleBn : item.titleEn;
            const phaseMeta = SEERAT_PHASES.find((p) => p.key === item.phaseKey);
            const location = isBn ? item.locationBn : item.locationEn;
            const isItemCompleted = completedAges.includes(item.age);
            const isItemBookmarked = bookmarkedAges.includes(item.age);
            const locGeo = getLocationForAge(item.age);

            return (
              <div
                key={item.age}
                className={`rounded-2xl p-4 border transition-all flex flex-col justify-between group ${
                  isDay
                    ? 'bg-white hover:bg-slate-50/90 border-slate-200/90 shadow-sm hover:border-emerald-500/50'
                    : 'bg-[#061b17] hover:bg-[#092621] border-emerald-800/40 hover:border-emerald-500/50 text-white shadow-sm'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 shadow-xs">
                        {item.age}
                      </span>
                      <span className="font-bold text-[11px] text-emerald-700 dark:text-emerald-300">
                        {t('ageLabel')} {item.age} {isBn ? 'বছর' : 'Years'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono font-semibold text-slate-500 dark:text-emerald-400/80">
                        {item.yearCE} CE
                      </span>
                      {isItemBookmarked && (
                        <Bookmark className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      )}
                      {isItemCompleted && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      )}
                    </div>
                  </div>

                  <h3
                    onClick={() => handleSelectAge(item.age)}
                    className="text-sm font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug cursor-pointer"
                  >
                    {itemTitle}
                  </h3>

                  <button
                    onClick={() => handleOpenLocationOnMap(locGeo.id)}
                    className="text-xs text-slate-500 dark:text-emerald-300/70 flex items-center gap-1 truncate hover:text-emerald-600 cursor-pointer text-left"
                  >
                    <MapPin className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span className="truncate">{location}</span>
                  </button>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 dark:border-emerald-800/40 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <span className="text-[11px] opacity-75 font-medium truncate max-w-[140px]">
                    {phaseMeta ? (isAr ? phaseMeta.titleAr : isBn ? phaseMeta.titleBn : phaseMeta.titleEn) : ''}
                  </span>

                  <button
                    onClick={() => handleSelectAge(item.age)}
                    className="flex items-center gap-0.5 group-hover:translate-x-1 transition-transform cursor-pointer"
                  >
                    <span>{isBn ? 'অধ্যায় পড়ুন' : 'Read Chapter'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {viewMode !== 'map' && filteredAges.length === 0 && (
        <div className="text-center py-12 space-y-2">
          <span className="text-3xl">🔍</span>
          <p className="text-sm font-bold text-slate-500 dark:text-emerald-300">
            {isBn ? 'কোনো অধ্যায় পাওয়া যায়নি।' : 'No chapters matched your search query.'}
          </p>
        </div>
      )}

      {/* Global Historic Map Modal */}
      {showFullMapModal && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-2 sm:p-4 animate-in fade-in">
          <div className="w-full max-w-5xl h-[90vh] bg-transparent rounded-3xl overflow-hidden relative">
            <SeeratHistoricMapView
              themeMode={themeMode}
              selectedLanguage={selectedLanguage}
              soundEnabled={soundEnabled}
              selectedLocationId={selectedMapLocationId}
              isModal={true}
              onClose={() => setShowFullMapModal(false)}
              onSelectAgeChapter={(age) => {
                setShowFullMapModal(false);
                handleSelectAge(age);
              }}
            />
          </div>
        </div>
      )}

      {/* Classical Seerah Bibliography Modal */}
      {showBibliographyModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in">
          <div
            className={`w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-3xl p-5 sm:p-7 border shadow-2xl space-y-5 relative scrollbar-thin ${
              isDay ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#08221d] border-emerald-700 text-white'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-emerald-800/60 sticky top-0 z-10 bg-inherit pt-1">
              <div className="flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-amber-500" />
                <div>
                  <h3 className="text-base sm:text-lg font-black text-amber-900 dark:text-amber-300">
                    {isBn ? 'প্রামাণ্য সীরাত গ্রন্থমালা (Primary Bibliography & Sources)' : 'Primary Seerah Bibliography & Sources'}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-emerald-300/80">
                    {isBn ? 'সিরাতুন নবী (সা.) বিশ্বকোষের তথ্যসূত্রে ব্যবহৃত মূল সিরাত গ্রন্থ তালিকা' : 'Primary classical reference texts used in the Seerat-un-Nabi encyclopedia.'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowBibliographyModal(false)}
                className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-emerald-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="p-4 rounded-2xl border bg-amber-50/50 dark:bg-[#0c2e27] border-amber-200 dark:border-emerald-700/60 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-extrabold text-amber-900 dark:text-amber-300">
                    {isBn ? '১. আর-রাহীকুল মাখতূম' : '1. Ar-Raheeq Al-Makhtum (The Sealed Nectar)'}
                  </h4>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300">
                    {isBn ? 'বিশ্ববিখ্যাত' : 'World Renowned'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-emerald-200/80">
                  <strong>{isBn ? 'লেখক:' : 'Author:'}</strong> {isBn ? 'আল্লামা সফিউর রহমান মুবারকপুরী (র.)' : 'Allamah Safiur Rahman Mubarakpuri (RA)'}
                </p>
                <p className="text-xs text-slate-600 dark:text-emerald-100/90 leading-relaxed font-serif">
                  {isBn
                    ? 'রবেতায়ে আলমে ইসলামী আয়োজিত বিশ্ব সীরাত প্রতিযোগিতা প্রথম স্থান অধিকারী মহাকাব্যিক গ্রন্থ। রসুলুল্লাহ (সা.)-এর শুভ জন্ম থেকে ওফাত পর্যন্ত প্রতিটি ঐতিহাসিক যুদ্ধ, সন্ধি ও দাওয়াতের প্রামাণ্য বিশ্লেষণ।'
                    : 'First prize winner in the World Seerah Competition organized by Muslim World League. A comprehensive chronological analysis from the blessed birth to the departure of Prophet Muhammad (PBUH).'}
                </p>
              </div>

              <div className="p-4 rounded-2xl border bg-amber-50/50 dark:bg-[#0c2e27] border-amber-200 dark:border-emerald-700/60 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-extrabold text-amber-900 dark:text-amber-300">
                    {isBn ? '২. সীরাতে ইবনে হিশাম' : '2. Seerat Ibn Hisham'}
                  </h4>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300">
                    {isBn ? 'প্রাচীনতম সীরাত' : 'Earliest Source'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-emerald-200/80">
                  <strong>{isBn ? 'লেখক:' : 'Author:'}</strong> {isBn ? 'আল-হাফিজ ইবনে হিশাম (র.) (মূল: ইবনে ইসহাক)' : 'Al-Hafiz Ibn Hisham (RA) (Original: Ibn Ishaq)'}
                </p>
                <p className="text-xs text-slate-600 dark:text-emerald-100/90 leading-relaxed font-serif">
                  {isBn
                    ? 'ইসলামি ইতিহাসের প্রথম ও সর্বাধিক প্রামাণ্য সীরাত সংকলন। সাহাবি ও তাবেঈদের প্রামাণ্য বিবরণী, মক্কার কুরাইশদের ঘটনাপঞ্জি ও প্রথম সারির যুদ্ধসমূহের নির্ভরযোগ্য বিবরণ।'
                    : 'The earliest surviving, highly authentic classical biographical collection detailing early Islamic history, Quraysh lineage, and early expeditions.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl border bg-amber-50/50 dark:bg-[#0c2e27] border-amber-200 dark:border-emerald-700/60 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-extrabold text-amber-900 dark:text-amber-300">
                    {isBn ? '৩. জাদুল মাআদ' : '3. Zad al-Ma\'ad'}
                  </h4>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300">
                    {isBn ? 'ফিকহুস সীরাহ' : 'Fiqh & Ethics'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-emerald-200/80">
                  <strong>{isBn ? 'লেখক:' : 'Author:'}</strong> {isBn ? 'ইমাম ইবনুল কাইয়্যিম আল-জাওযিয়্যাহ (র.)' : 'Ibn Qayyim al-Jawziyya (RA)'}
                </p>
                <p className="text-xs text-slate-600 dark:text-emerald-100/90 leading-relaxed font-serif">
                  {isBn
                    ? 'রসুলুল্লাহ (সা.)-এর ব্যক্তিগত জীবন, ইবাদত, যুদ্ধনীতি, বিচারব্যবস্থা ও দৈনন্দিন জীবনাচরণের বিস্তৃত ফিকহি ব্যাখ্যা ও আত্মিক শিক্ষা সংবলিত মাস্টারপিস গ্রন্থ।'
                    : 'Masterwork on the practical sunnah, jurisprudence, spiritual guidance, medicine, and governance extracted from the life of the Prophet (PBUH).'}
                </p>
              </div>

              <div className="p-4 rounded-2xl border bg-amber-50/50 dark:bg-[#0c2e27] border-amber-200 dark:border-emerald-700/60 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-extrabold text-amber-900 dark:text-amber-300">
                    {isBn ? '৪. আল-বিদায়া ওয়ান নিহায়া' : '4. Al-Bidayah wan-Nihayah'}
                  </h4>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300">
                    {isBn ? 'ঐতিহাসিক বিশ্বকোষ' : 'Historical Chronicle'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-emerald-200/80">
                  <strong>{isBn ? 'লেখক:' : 'Author:'}</strong> {isBn ? 'আল-হাফিজ ইবনে কাছীর (র.)' : 'Al-Hafiz Ibn Kathir (RA)'}
                </p>
                <p className="text-xs text-slate-600 dark:text-emerald-100/90 leading-relaxed font-serif">
                  {isBn
                    ? 'সৃষ্টির শুরু থেকে বিশ্ব ইতিহাসের প্রামাণ্য গ্রন্থাবলি। খণ্ড ৩ থেকে ৫ পর্যন্ত নবুওয়াত, মক্কী ও মাদানী যুগের পুঙ্খানুপুঙ্খ বিবরণ ধারণ করে।'
                    : 'Classic multi-volume historical encyclopedia. Volumes 3 to 5 contain meticulous accounts of Prophethood, Meccan, and Medinan eras.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl border bg-amber-50/50 dark:bg-[#0c2e27] border-amber-200 dark:border-emerald-700/60 space-y-2 col-span-1 md:col-span-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-extrabold text-amber-900 dark:text-amber-300">
                    {isBn ? '৫. আস-সহীহাইনি (সহীহ আল-বুখারী ও সহীহ মুসলিম)' : '5. Al-Sahihayn (Sahih al-Bukhari & Sahih Muslim)'}
                  </h4>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                    {isBn ? 'বিশুদ্ধতম হাদিস' : 'Authentic Hadith'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-emerald-200/80">
                  <strong>{isBn ? 'সংকলক:' : 'Compilers:'}</strong> {isBn ? 'ইমাম মুহাম্মদ ইবনে ইসমাইল আল-বুখারী (র.) ও ইমাম মুসলিম ইবনুল হাজ্জাজ (র.)' : 'Imam Muhammad al-Bukhari (RA) & Imam Muslim ibn al-Hajjaj (RA)'}
                </p>
                <p className="text-xs text-slate-600 dark:text-emerald-100/90 leading-relaxed font-serif">
                  {isBn
                    ? "কুরআনুল কারিমের পর পৃথিবীর সবচেয়ে বিশুদ্ধ কিতাবসমূহ। 'কিতাবুল মাগাজী' (যুদ্ধসমূহ), 'কিতাবুম মানাকিব' (মর্যাদাপূর্ণ গুণাবলী) ও 'কিতাবুল হজ্জ' থেকে প্রতিটি ঐতিহাসিক ঘটনার শতভাগ বিশুদ্ধ সনদ যাচাইকৃত।"
                    : "The most authentic sources of prophetic traditions after the Holy Qur'an. Verified narrations from Kitab al-Maghazi, Kitab al-Manaqib, and Kitab al-Hajj."}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-emerald-800/60 flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-emerald-300/80 font-medium">
                {isBn ? 'পরম শ্রদ্ধাভরে সংকলিত — Zikr+ Apps' : 'Compiled with reverence — Zikr+ Apps'}
              </span>
              <button
                onClick={() => setShowBibliographyModal(false)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold cursor-pointer"
              >
                {isBn ? 'বন্ধ করুন' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeeratUnNabiView;

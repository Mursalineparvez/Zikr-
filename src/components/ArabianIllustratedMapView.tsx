import React, { useState, useRef, useMemo } from 'react';
import { ThemeMode, ZikrLanguage } from '../types';
import {
  Compass,
  MapPin,
  Sparkles,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  Layers,
  Search,
  Volume2,
  Navigation,
  Info,
  CheckCircle2,
  Ship,
  Sun,
  Moon,
  Footprints,
  Eye,
  X,
  Share2,
} from 'lucide-react';
import { soundHaptics, playArabicVoice } from '../utils/audioHaptics';

export interface HolyPlaceHotspot {
  id: string;
  nameBn: string;
  nameEn: string;
  nameAr: string;
  category: 'holy' | 'miqat' | 'city' | 'historical' | 'sea_port';
  x: number; // percentage coordinate 0-100 on map
  y: number; // percentage coordinate 0-100 on map
  distanceToKaabaKm?: number;
  elevationMeters?: number;
  descriptionBn: string;
  descriptionEn: string;
  historicalSignificanceBn: string;
  historicalSignificanceEn: string;
  quranHadithReference?: string;
  imageUrl: string;
  badgeBn: string;
  badgeEn: string;
  talbiyahOrDua?: string;
  talbiyahOrDuaMeaningBn?: string;
}

export const HOLY_LAND_HOTSPOTS: HolyPlaceHotspot[] = [
  {
    id: 'makkah',
    nameBn: 'মক্কা আল-মুকাররামা',
    nameEn: 'Makkah Al-Mukarramah',
    nameAr: 'مَكَّةُ المُكَرَّمَةُ',
    category: 'holy',
    x: 29.5,
    y: 53.0,
    distanceToKaabaKm: 0,
    elevationMeters: 277,
    badgeBn: 'পবিত্র হারাম শরিফ ও কাবা',
    badgeEn: 'Holy Sanctuary & Kaaba',
    descriptionBn: 'পৃথিবীর পবিত্রতম স্থান ও মুসলিম উম্মাহর কেবলা। এখানে অবস্থিত পবিত্র কাবা শরিফ, মসজিদুল হারাম, জমজম কূপ, মাকামে ইবরাহিম, সাফা ও মারওয়া পাহাড়।',
    descriptionEn: 'The holiest city in Islam and the Qibla for Muslims worldwide, housing the Holy Kaaba, Masjid al-Haram, Well of Zamzam, and Maqam Ibrahim.',
    historicalSignificanceBn: 'হযরত ইবরাহিম ও ইসমাইল (আ.) কর্তৃক কাবা গৃহ নির্মাণ এবং সর্বশ্রেষ্ঠ রাসুল মুহাম্মদ (সা.)-এর পবিত্র জন্মভূমি ও ওহী অবতরণের সূচনাস্থল।',
    historicalSignificanceEn: 'Birthplace of Prophet Muhammad (PBUH) and where Ibrahim & Ismail (AS) raised the foundations of the Holy Kaaba.',
    quranHadithReference: 'إِنَّ أَوَّلَ بَيْتٍ وُضِعَ لِلنَّاسِ لَلَّذِي بِبَكَّةَ مُبَارَكًا (সূরা আলে ইমরান: ৯৬)',
    imageUrl: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1000&q=80',
    talbiyahOrDua: 'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ',
    talbiyahOrDuaMeaningBn: 'আমি হাজির হে আল্লাহ, আমি হাজির! আপনার কোনো শরিক নেই, আমি হাজির!',
  },
  {
    id: 'madinah',
    nameBn: 'মদিনা আল-মুনাওয়ারা',
    nameEn: 'Al-Madinah Al-Munawwarah',
    nameAr: 'المَدِينَةُ المُنَوَّرَةُ',
    category: 'holy',
    x: 29.0,
    y: 41.0,
    distanceToKaabaKm: 430,
    elevationMeters: 608,
    badgeBn: 'মসজিদে নববী ও রওজা মুবারক',
    badgeEn: 'Prophet’s Mosque & Rawdah',
    descriptionBn: 'আল্লাহর রাসুল (সা.)-এর হিজরতের পুণ্যভূমি এবং মসজিদে নববী ও রওজা শরিফের শহর। এখানে রয়েছে জান্নাতুল বাকি এবং ইসলামের প্রথম মসজিদ কুবা।',
    descriptionEn: 'The radiant city of the Prophet (PBUH), home to Masjid an-Nabawi, the Sacred Chamber (Rawdah), Jannat al-Baqi, and Masjid Quba.',
    historicalSignificanceBn: '৬২২ খ্রিস্টাব্দে হিজরতের পর ইসলামী সভ্যতার প্রথম রাষ্ট্র ও সোনালী যুগের কেন্দ্রবিন্দু।',
    historicalSignificanceEn: 'The cradle of Islamic civilization after the Hijrah in 622 CE and the resting place of Prophet Muhammad (PBUH).',
    quranHadithReference: 'মদিনায় এক রাকাত নামাজ মসজিদে নববীতে ১,০০০ রাকাতের চেয়ে উত্তম। (সহিহ বুখারি)',
    imageUrl: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=1000&q=80',
    talbiyahOrDua: 'اللَّهُمَّ اجْعَلْ بِالْمَدِينَةِ ضِعْفَيْ مَا جَعَلْتَ بِمَكَّةَ مِنَ الْبَرَكَةِ',
    talbiyahOrDuaMeaningBn: 'হে আল্লাহ! মক্কায় যে বরকত দিয়েছেন, মদিনায় তার দ্বিগুণ বরকত দান করুন।',
  },
  {
    id: 'jeddah',
    nameBn: 'জেদ্দা (লোহিত সাগরের প্রবেশদ্বার)',
    nameEn: 'Jeddah (Red Sea Gateway)',
    nameAr: 'جُدَّةُ - عَرُوسُ البَحْرِ الأَحْمَرِ',
    category: 'sea_port',
    x: 23.5,
    y: 50.5,
    distanceToKaabaKm: 75,
    elevationMeters: 12,
    badgeBn: 'আন্তর্জাতিক হজযাত্রী প্রবেশদ্বার',
    badgeEn: 'Global Pilgrim Gateway Port',
    descriptionBn: 'লোহিত সাগরের তীরে অবস্থিত সৌদি আরবের বাণিজ্যিক কেন্দ্র এবং আকাশ ও সমুদ্রপথে আগত বিশ্ব হজযাত্রীদের প্রধান প্রবেশদ্বার।',
    descriptionEn: 'Historic Red Sea port city and primary arrival hub for millions of international pilgrims arriving via King Abdulaziz Airport.',
    historicalSignificanceBn: 'হাজার বছর ধরে লোহিত সাগরের ঐতিহ্যবাহী পালতোলা জাহাজ (Dhow) ও সমুদ্রযাত্রী কাফেলার মিলনমেলা। ইউনেস্কো ঐতিহ্যবাহী আল-বালাদ এলাকা।',
    historicalSignificanceEn: 'Historic maritime port established in the era of Caliph Uthman (RA) as the official gateway to Makkah.',
    imageUrl: 'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'riyadh',
    nameBn: 'রিয়াদ (রাজধানী)',
    nameEn: 'Riyadh (Capital City)',
    nameAr: 'الرِّيَاضُ - العَاصِمَةُ',
    category: 'city',
    x: 60.5,
    y: 47.0,
    distanceToKaabaKm: 880,
    elevationMeters: 612,
    badgeBn: 'রাজধানী ও আধুনিক মহানগর',
    badgeEn: 'Capital & Modern Metropolis',
    descriptionBn: 'সৌদি আরবের প্রাণকেন্দ্র ও আধুনিক রাজধানী। সুউচ্চ স্কাইলাইন, কিংডম সেন্টার, ঐতিহাসিক মাসমাক দুর্গ এবং দিরিয়া হেরিটেজ অবস্থিত।',
    descriptionEn: 'The modern capital of Saudi Arabia located in the central Najd plateau, featuring iconic skyscrapers, Masmak Fortress, and historic Diriyah.',
    historicalSignificanceBn: 'নজদ উপত্যকার ঐতিহাসিক কেন্দ্র এবং আধুনিক সৌদি আরবের ঐক্যের সূতিকাগার।',
    historicalSignificanceEn: 'Historic Najdi heartland and seat of governance, connecting traditional Arabia with futuristic vision.',
    imageUrl: 'https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'taif',
    nameBn: 'তায়েফ (গোলাপের নগরী)',
    nameEn: 'Taif (City of Roses)',
    nameAr: 'الطَّائِفُ - مَدِينَةُ الوَرْدِ',
    category: 'city',
    x: 33.0,
    y: 55.0,
    distanceToKaabaKm: 85,
    elevationMeters: 1879,
    badgeBn: 'শীতল পর্বত ও ঐতিহাসিক উপত্যকা',
    badgeEn: 'Mountain Resort & Rose Valley',
    descriptionBn: 'সারাওয়াত পর্বতমালার শীতল উচ্চভূমিতে অবস্থিত সবুজ ও মনোরম শহর। সুগন্ধি তায়েফি গোলাপ ও ফলের বাগানের জন্য বিশ্বখ্যাত।',
    descriptionEn: 'Scenic high-altitude city in the Sarawat Mountains famous for fragrant roses, temperate weather, and fruit orchards.',
    historicalSignificanceBn: 'ইসলামের প্রাথমিক যুগে রাসুলুল্লাহ (সা.)-এর ঐতিহাসিক তায়েফ গমন ও ক্ষমার এক অনুপম দৃষ্টান্তের স্মৃতিবিজড়িত ভূমি।',
    historicalSignificanceEn: 'The city visited by Prophet Muhammad (PBUH) in the 10th year of Prophethood, demonstrating supreme patience and mercy.',
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'dhul_hulaifah',
    nameBn: 'মিকাত ১: যুল হুলাইফাহ (আবিয়ার আলী)',
    nameEn: 'Miqat 1: Dhul Hulaifah (Abyar Ali)',
    nameAr: 'مِيقَاتُ ذِي الحُلَيْفَةِ (آبَارُ عَلِي)',
    category: 'miqat',
    x: 27.5,
    y: 42.5,
    distanceToKaabaKm: 420,
    elevationMeters: 640,
    badgeBn: 'মদিনাবাসীদের মিকাত',
    badgeEn: 'Miqat for Madinah Route',
    descriptionBn: 'মদিনা শরিফ থেকে মক্কার উদ্দেশ্যে রওয়ানা হওয়া সকল হজযাত্রীর ইহরাম বাঁধার পবিত্র মিকাত মসজিদ (মসজিদ আশ-শাজারাহ)।',
    descriptionEn: 'The designated Miqat station for pilgrims coming from Madinah and those passing along its northern route.',
    historicalSignificanceBn: 'বিদায় হজে রাসুলুল্লাহ (সা.) এই স্থান থেকে ইহরামের নিয়ত ও তালবিয়াহ শুরু করেছিলেন।',
    historicalSignificanceEn: 'Where Prophet Muhammad (PBUH) assumed Ihram during the Farewell Pilgrimage (Hajjat al-Wida).',
    imageUrl: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1000&q=80',
    talbiyahOrDua: 'لَبَّيْكَ عُمْرَةً وَحَجًّا',
    talbiyahOrDuaMeaningBn: 'আমি উমরাহ ও হজের জন্য আপনার দরবারে হাজির।',
  },
  {
    id: 'al_juhfah',
    nameBn: 'মিকাত ২: আল-জুহফাহ (রাবেগ)',
    nameEn: 'Miqat 2: Al-Juhfah (Rabigh)',
    nameAr: 'مِيقَاتُ الجُحْفَةِ (رَابِغ)',
    category: 'miqat',
    x: 24.5,
    y: 47.5,
    distanceToKaabaKm: 187,
    elevationMeters: 30,
    badgeBn: 'সিরিয়া, মিসর ও উত্তর-পশ্চিম মিকাত',
    badgeEn: 'Miqat for Levant & Egypt Route',
    descriptionBn: 'সিরিয়া, মিশর, জর্ডান এবং উত্তর-পশ্চিম দিক থেকে আকাশ ও সমুদ্রপথে আগতদের প্রধান ইহরাম কেন্দ্র।',
    descriptionEn: 'The Miqat point for pilgrims arriving from the north-west: Levant, Egypt, Turkey, and North Africa.',
    historicalSignificanceBn: 'রাসুলুল্লাহ (সা.) কর্তৃক নির্ধারিত পাঁচটি চিরন্তন মিকাত সীমানার অন্যতম।',
    historicalSignificanceEn: 'One of the five primary boundary stations decreed by Prophet Muhammad (PBUH).',
    imageUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'qarn_manazil',
    nameBn: 'মিকাত ৩: কারনুল মানাযিল (আস-সায়লুল কাবীর)',
    nameEn: 'Miqat 3: Qarn al-Manazil (As-Sayl al-Kabir)',
    nameAr: 'مِيقَاتُ قَرْنِ المَنَازِلِ (السَّيْلُ الكَبِير)',
    category: 'miqat',
    x: 35.0,
    y: 53.0,
    distanceToKaabaKm: 94,
    elevationMeters: 1250,
    badgeBn: 'নজদ, রিয়াদ ও উপসাগরীয় মিকাত',
    badgeEn: 'Miqat for Najd & Gulf Route',
    descriptionBn: 'নজদ, রিয়াদ ও পূর্ব উপসাগরীয় অঞ্চল থেকে আগতদের এবং আকাশপথে আগত বাংলাদেশ ও আন্তর্জাতিক ফ্লাইটের প্রধান মিকাত লাইন।',
    descriptionEn: 'The Miqat location for travellers from Najd, UAE, Qatar, Oman, and Asian flight corridors fly directly over it.',
    historicalSignificanceBn: 'রাসুল (সা.) নজদবাসীদের জন্য এই পাহাড়ী গিরিপথকে মিকাত হিসেবে ঘোষণা দেন।',
    historicalSignificanceEn: 'Designated by the Prophet (PBUH) for people of Najd and eastern travelers.',
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'yalamlam',
    nameBn: 'মিকাত ৪: ইয়ালামলাম (আস-সাদিয়াহ)',
    nameEn: 'Miqat 4: Yalamlam (As-Sadiyah)',
    nameAr: 'مِيقَاتُ يَلَمْلَمَ (السَّعْدِيَّة)',
    category: 'miqat',
    x: 32.5,
    y: 60.5,
    distanceToKaabaKm: 92,
    elevationMeters: 230,
    badgeBn: 'ইয়েমেন ও দক্ষিণাঞ্চলীয় মিকাত',
    badgeEn: 'Miqat for Yemen & Southern Route',
    descriptionBn: 'ইয়েমেন, ভারত মহাসাগর ও দক্ষিণাঞ্চলের সমুদ্র ও বিমানযাত্রীদের জন্য নির্ধারিত পবিত্র মিকাত।',
    descriptionEn: 'The traditional Miqat for pilgrims coming from Yemen, Horn of Africa, and southern Indian Ocean routes.',
    historicalSignificanceBn: 'ইয়েমেনের প্রাচীন বাণিজ্য কাফেলা এই পথ দিয়ে মক্কায় আগমন করত।',
    historicalSignificanceEn: 'Historic crossing point used by ancient Yemeni camel caravans traveling north to Makkah.',
    imageUrl: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'dhat_irq',
    nameBn: 'মিকাত ৫: যাতু ইরক (আদ-দারিবাহ)',
    nameEn: 'Miqat 5: Dhat \'Irq (Ad-Daribah)',
    nameAr: 'مِيقَاتُ ذَاتِ عِرْقٍ (الضَّرِيبَة)',
    category: 'miqat',
    x: 36.5,
    y: 49.5,
    distanceToKaabaKm: 94,
    elevationMeters: 920,
    badgeBn: 'ইরাক ও প্রাচ্যের মিকাত',
    badgeEn: 'Miqat for Iraq & East Route',
    descriptionBn: 'ইরাক, ইরান ও মধ্য এশিয়ার কাফেলার জন্য নির্ধারিত ঐতিহাসিক মিকাত পাহাড়ি উপত্যকা।',
    descriptionEn: 'The northern-eastern boundary station designated for pilgrims journeying from Iraq, Persia, and Central Asia.',
    historicalSignificanceBn: 'হযরত উমর ইবনুল খাত্তাব (রা.)-এর খেলাফতকালে ইরাকবাসীদের অনুরোধে সুনির্দিষ্টভাবে চিহ্নিত হয়।',
    historicalSignificanceEn: 'Established during the Caliphate of Umar ibn al-Khattab (RA) for Iraqi and eastern Muslims.',
    imageUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'al_ula',
    nameBn: 'আল-উলা (মাদায়েন সালেহ)',
    nameEn: 'Al-Ula (Hegra / Madain Saleh)',
    nameAr: 'العُلَا - مَدَائِنُ صَالِح',
    category: 'historical',
    x: 23.0,
    y: 32.5,
    distanceToKaabaKm: 720,
    elevationMeters: 700,
    badgeBn: 'ইউনেস্কো বিশ্ব ঐতিহ্য ও প্রাচীন নিদর্শন',
    badgeEn: 'UNESCO World Heritage Oasis',
    descriptionBn: 'সৌদি আরবের সবচেয়ে দর্শনীয় ঐতিহাসিক উপত্যকা। নাবাতিয়ান পাথরে খোদাই করা স্থাপত্য এবং সামুদ জাতির ইতিহাস বহনকারী স্থান।',
    descriptionEn: 'Astonishing desert valley containing the monumental rock-cut tombs of Hegra, preserved oasis farms, and dramatic red sandstone canyons.',
    historicalSignificanceBn: 'পবিত্র কুরআনে উল্লেখিত হযরত সালেহ (আ.) ও তাঁর কওম সামুদের ঐতিহাসিক বাসস্থান।',
    historicalSignificanceEn: 'Historic dwelling of the people of Thamud and Prophet Salih (AS) recorded in the Holy Quran.',
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'tabuk',
    nameBn: 'তাবুক (উত্তর সীমান্ত নগরী)',
    nameEn: 'Tabuk (Northern Frontier)',
    nameAr: 'تَبُوكُ - الحِصْنُ الشَّمَالِي',
    category: 'city',
    x: 20.0,
    y: 24.5,
    distanceToKaabaKm: 1020,
    elevationMeters: 760,
    badgeBn: 'তাবুক যুদ্ধের ঐতিহাসিক প্রান্তর',
    badgeEn: 'Expedition of Tabuk Historic Oasis',
    descriptionBn: 'সৌদি আরবের উত্তর-পশ্চিম সীমান্ত নগরী। শীতল জলবায়ু, জলপাই ও খেজুরের বাগানে ঘেরা প্রাচীন মরূদ্যান।',
    descriptionEn: 'Major northwestern military and commercial gateway city, home to Tabuk Castle and lush desert olive groves.',
    historicalSignificanceBn: '৯ম হিজরিতে রোমানদের বিরুদ্ধে রাসুলুল্লাহ (সা.)-এর শেষ সামরিক অভিযান "গাযওয়ায়ে তাবুক"-এর পুণ্যভূমি।',
    historicalSignificanceEn: 'Location of the historic Expedition of Tabuk led by the Prophet (PBUH) in 9 AH against Byzantine forces.',
    imageUrl: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'abha',
    nameBn: 'আভা (আসির পর্বতমালা)',
    nameEn: 'Abha (Asir Mountain Highlands)',
    nameAr: 'أَبْهَا - جِبَالُ عَسِير',
    category: 'city',
    x: 43.5,
    y: 69.0,
    distanceToKaabaKm: 620,
    elevationMeters: 2270,
    badgeBn: 'সৌদির সর্বোচ্চ পর্বত ও শীতল মেঘ',
    badgeEn: 'Saudi Highest Peak & Mist Highlands',
    descriptionBn: 'সবুজ আসির পর্বতমালার চূড়ায় অবস্থিত। এখানে রয়েছে সৌদি আরবের সর্বোচ্চ শৃঙ্গ জাবাল সাওদা (৩,০০০+ মিটার) ও মেঘে ঢাকা উপত্যকা।',
    descriptionEn: 'Misty capital of Asir province, home to Saudi Arabia\'s highest mountain Jabal Sawda (3,000+ m) and terraced juniper valleys.',
    historicalSignificanceBn: 'প্রাকৃতিক জলপ্রপাত, শীতল আবহাওয়া ও প্রাচীন পাথুরে দুর্গের সমৃদ্ধ লোকসংস্কৃতি।',
    historicalSignificanceEn: 'Historic high-altitude bastion connecting Arabian highlands with the Red Sea coast.',
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'jizan',
    nameBn: 'জিজান (দক্ষিণ উপকূল)',
    nameEn: 'Jizan (Southern Red Sea)',
    nameAr: 'جِيزَانُ - لُؤْلُؤَةُ الجَنُوب',
    category: 'sea_port',
    x: 43.0,
    y: 78.5,
    distanceToKaabaKm: 710,
    elevationMeters: 40,
    badgeBn: 'ফারাসান দ্বীপ ও লোহিত সাগর বন্দর',
    badgeEn: 'Farasan Islands & Maritime Harbor',
    descriptionBn: 'দক্ষিণ লোহিত সাগরের বন্দর নগরী, গ্রীষ্মমণ্ডলীয় ফলের বাগান এবং প্রবাল দ্বীপ ফারাসানের জন্য পরিচিত।',
    descriptionEn: 'Southern coastal port city facing the pristine coral atolls of Farasan Islands Marine Sanctuary.',
    historicalSignificanceBn: 'প্রাচীন মুক্তা শিকারী ও ভারত মহাসাগরীয় নাবিকদের সমৃদ্ধ উপকূল।',
    historicalSignificanceEn: 'Maritime crossroads for pearl divers, spice ships, and African-Arabian coastal exchange.',
    imageUrl: 'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'dammam',
    nameBn: 'দাম্মাম ও আল-খোবার',
    nameEn: 'Dammam & Al Khobar',
    nameAr: 'الدَّمَّامُ وَالخُبَر - الخَلِيجُ العَرَبِي',
    category: 'city',
    x: 72.0,
    y: 39.5,
    distanceToKaabaKm: 1250,
    elevationMeters: 10,
    badgeBn: 'পারস্য উপসাগরীয় অর্থনৈতিক রাজধানী',
    badgeEn: 'Persian Gulf Industrial Hub',
    descriptionBn: 'সৌদি আরবের পূর্ব প্রদেশের বৃহত্তম বন্দর ও অর্থনৈতিক নগরী। কিং ফাহাদ আন্তর্জাতিক বিমানবন্দর ও বাহারাইনের সাথে সংযোগকারী কজওয়ে অবস্থিত।',
    descriptionEn: 'Capital of Eastern Province on the Persian Gulf, featuring King Fahd Causeway to Bahrain and scenic seaside corniche.',
    historicalSignificanceBn: 'উপসাগরীয় প্রাচীন মুক্তা বাণিজ্য ও আধুনিক বৈশ্বিক জ্বালানি অর্থনীতির ঐতিহাসিক কেন্দ্র।',
    historicalSignificanceEn: 'Historic pearl trading hub turned world-leading energy innovation center.',
    imageUrl: 'https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'hail',
    nameBn: 'হায়িল (মরুভূমির আতিথেয়তা)',
    nameEn: 'Ha\'il (Heart of the Desert)',
    nameAr: 'حَائِلُ - كَرَمُ البَادِيَة',
    category: 'city',
    x: 37.0,
    y: 31.5,
    distanceToKaabaKm: 780,
    elevationMeters: 992,
    badgeBn: 'হাতেম তাইয়ের স্মৃতিবিজড়িত ভূমি',
    badgeEn: 'Oasis Crossroads of Pilgrims',
    descriptionBn: 'নাফুদ মরুভূমির প্রান্তে অবস্থিত প্রাচীন মরূদ্যান নগরী। ইতিহাসখ্যাত হাতেম তায়ী ও প্রাচীন শিলালিপি জুব্বার জন্য বিখ্যাত।',
    descriptionEn: 'Historic oasis crossroads between Iraq, Syria, and Makkah, famous for legendary Arab hospitality and ancient rock art.',
    historicalSignificanceBn: 'শত শত বছর ধরে উত্তর ও প্রাচ্যের হজযাত্রীদের প্রধান যাত্রা বিরতির কেন্দ্রস্থল।',
    historicalSignificanceEn: 'Strategic staging post for historical pilgrim caravans crossing the Great Nafud desert.',
    imageUrl: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=1000&q=80',
  },
];

export interface ArabianIllustratedMapViewProps {
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
  soundEnabled?: boolean;
  onSelectHotspot?: (hotspot: HolyPlaceHotspot) => void;
  className?: string;
  isStandaloneModal?: boolean;
  onClose?: () => void;
}

export const ArabianIllustratedMapView: React.FC<ArabianIllustratedMapViewProps> = ({
  themeMode = 'night',
  selectedLanguage = 'bn',
  soundEnabled = true,
  onSelectHotspot,
  className = '',
  isStandaloneModal = false,
  onClose,
}) => {
  const isDay = themeMode === 'day';
  const isBn = selectedLanguage === 'bn';

  // Map state
  const [activeCategory, setActiveCategory] = useState<'all' | 'holy' | 'miqat' | 'city' | 'historical'>('all');
  const [activeRoute, setActiveRoute] = useState<'none' | 'hajj' | 'hijrah' | 'air_corridor'>('hajj');
  const [selectedHotspot, setSelectedHotspot] = useState<HolyPlaceHotspot | null>(HOLY_LAND_HOTSPOTS[0]);
  const [mapStyleMode, setMapStyleMode] = useState<'parchment' | 'nocturnal'>('parchment');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isMeasuringDistance, setIsMeasuringDistance] = useState(false);
  const [measuredTarget, setMeasuredTarget] = useState<HolyPlaceHotspot | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Filter hotspots
  const filteredHotspots = useMemo(() => {
    return HOLY_LAND_HOTSPOTS.filter((spot) => {
      const matchesCategory =
        activeCategory === 'all'
          ? true
          : activeCategory === 'holy'
          ? spot.category === 'holy'
          : activeCategory === 'miqat'
          ? spot.category === 'miqat'
          : activeCategory === 'city'
          ? spot.category === 'city' || spot.category === 'sea_port'
          : spot.category === 'historical';

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        spot.nameBn.toLowerCase().includes(q) ||
        spot.nameEn.toLowerCase().includes(q) ||
        spot.nameAr.includes(q) ||
        spot.descriptionBn.toLowerCase().includes(q)
      );
    });
  }, [activeCategory, searchQuery]);

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.min(2.5, Math.max(0.8, prev + delta)));
    if (soundEnabled) soundHaptics.playTap();
  };

  const handleResetView = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    setSelectedHotspot(HOLY_LAND_HOTSPOTS[0]);
    if (soundEnabled) soundHaptics.playReset();
  };

  const handleSelectSpot = (spot: HolyPlaceHotspot) => {
    setSelectedHotspot(spot);
    if (isMeasuringDistance) {
      setMeasuredTarget(spot);
    }
    if (onSelectHotspot) onSelectHotspot(spot);
    if (soundEnabled) soundHaptics.playTap();
  };

  const playSpotAudio = async (text?: string) => {
    if (!text) return;
    setIsPlayingAudio(true);
    try {
      await playArabicVoice(text, 'male');
    } catch {
      // Ignored
    } finally {
      setIsPlayingAudio(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-3xl overflow-hidden border shadow-2xl transition-all select-none ${
        mapStyleMode === 'parchment'
          ? 'bg-[#f7f2e5] text-[#2c1f0d] border-[#dfd5bc]'
          : 'bg-[#08151f] text-cyan-100 border-[#1a3848]'
      } ${className}`}
    >
      {/* 1. TOP HEADER & INTERACTIVE TOOLBAR */}
      <div
        className={`px-4 sm:px-6 py-3.5 border-b backdrop-blur-md flex flex-wrap items-center justify-between gap-3 z-30 relative ${
          mapStyleMode === 'parchment'
            ? 'bg-[#efe7d3]/95 border-[#dfd5bc]/80 text-[#3b2b15]'
            : 'bg-[#0a1e2b]/95 border-[#1a3848] text-white'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div
            className={`w-9 h-9 rounded-2xl flex items-center justify-center shadow-sm border ${
              mapStyleMode === 'parchment'
                ? 'bg-amber-100 text-amber-900 border-amber-300'
                : 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40'
            }`}
          >
            <Compass className="w-5 h-5 animate-[spin_12s_linear_infinite]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-black tracking-tight flex items-center gap-1.5">
                <span>{isBn ? 'পবিত্র ভূমি ও মধ্যপ্রাচ্যের সচিত্র মানচিত্র' : 'Pictorial Map of Saudi Arabia & Holy Lands'}</span>
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-400/30">
                Cartographic Edition
              </span>
            </div>
            <p className="text-[11px] opacity-75 font-arabic">
              خَرِيطَةُ المَمْلَكَةِ العَرَبِيَّةِ السُّعُودِيَّةِ وَالأَمَاكِنِ المُقَدَّسَةِ
            </p>
          </div>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          {/* Style Switcher: Vintage Parchment vs Nocturnal Arabian Night */}
          <button
            type="button"
            onClick={() => {
              setMapStyleMode((prev) => (prev === 'parchment' ? 'nocturnal' : 'parchment'));
              if (soundEnabled) soundHaptics.playTap();
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-bold transition active:scale-95 cursor-pointer shadow-xs ${
              mapStyleMode === 'parchment'
                ? 'bg-[#e2d5bd] hover:bg-[#d8c8ad] border-[#cfbea0] text-[#33240e]'
                : 'bg-[#123145] hover:bg-[#1a4058] border-cyan-700/50 text-cyan-200'
            }`}
            title="Toggle Map Style (ভিন্টেজ পার্চমেন্ট / নক্ষত্র রাত)"
          >
            {mapStyleMode === 'parchment' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-700" />
                <span className="hidden sm:inline">Parchment</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-cyan-300" />
                <span className="hidden sm:inline">Nocturnal</span>
              </>
            )}
          </button>

          {/* Zoom Controls */}
          <div className="flex items-center rounded-xl border overflow-hidden shadow-xs divide-x border-slate-300/60 dark:border-slate-700/60">
            <button
              type="button"
              onClick={() => handleZoom(0.2)}
              className="p-1.5 hover:bg-black/5 dark:hover:bg-white/10 transition cursor-pointer"
              title="Zoom In (+)"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleZoom(-0.2)}
              className="p-1.5 hover:bg-black/5 dark:hover:bg-white/10 transition cursor-pointer"
              title="Zoom Out (-)"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleResetView}
              className="p-1.5 hover:bg-black/5 dark:hover:bg-white/10 transition cursor-pointer text-amber-600 dark:text-amber-400"
              title="Reset View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Close button if shown in modal */}
          {isStandaloneModal && onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl border border-red-400/40 bg-red-500/10 hover:bg-red-500/20 text-red-500 transition cursor-pointer"
              title="Close Map"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 2. CATEGORY FILTERS & ROUTE SELECTORS */}
      <div
        className={`px-4 sm:px-6 py-2.5 border-b flex items-center justify-between gap-3 flex-wrap text-xs font-bold ${
          mapStyleMode === 'parchment'
            ? 'bg-[#f3ebe0] border-[#e2d8c3] text-[#4b3920]'
            : 'bg-[#0c2230] border-[#18394a] text-cyan-200'
        }`}
      >
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
          {[
            { id: 'all', labelBn: 'সকল স্থান', labelEn: 'All Sites' },
            { id: 'holy', labelBn: '🕋 মক্কা ও মদিনা', labelEn: 'Holy Sanctuaries' },
            { id: 'miqat', labelBn: '🚩 ৫টি মিকাত', labelEn: '5 Miqats' },
            { id: 'city', labelBn: '🏙️ প্রধান শহর', labelEn: 'Cities & Ports' },
            { id: 'historical', labelBn: '🏛️ ঐতিহাসিক প্রান্তর', labelEn: 'Heritage' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setActiveCategory(cat.id as any);
                if (soundEnabled) soundHaptics.playTap();
              }}
              className={`px-2.5 py-1 rounded-xl transition cursor-pointer whitespace-nowrap text-xs ${
                activeCategory === cat.id
                  ? 'bg-amber-600 text-white font-black shadow-xs ring-1 ring-amber-400'
                  : mapStyleMode === 'parchment'
                  ? 'bg-[#e7dcbf] hover:bg-[#ded1af] text-[#46341d]'
                  : 'bg-[#14364c] hover:bg-[#1a4460] text-cyan-200'
              }`}
            >
              {isBn ? cat.labelBn : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Route Selectors */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] opacity-70 font-semibold">{isBn ? 'রুট প্রদর্শন:' : 'Route:'}</span>
          {[
            { id: 'hajj', labelBn: 'হজ রুট', labelEn: 'Hajj Route' },
            { id: 'hijrah', labelBn: 'হিজরত রুট', labelEn: 'Hijrah' },
            { id: 'none', labelBn: 'বন্ধ', labelEn: 'Off' },
          ].map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => {
                setActiveRoute(r.id as any);
                if (soundEnabled) soundHaptics.playTap();
              }}
              className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                activeRoute === r.id
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : mapStyleMode === 'parchment'
                  ? 'bg-[#dfcfaf] hover:bg-[#d5c39e] text-[#423118]'
                  : 'bg-[#13354b] text-cyan-300'
              }`}
            >
              {isBn ? r.labelBn : r.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* 3. MAIN INTERACTIVE SVG CARTOGRAPHIC CANVAS */}
      <div className="relative w-full h-[480px] sm:h-[620px] overflow-hidden bg-gradient-to-b cursor-grab active:cursor-grabbing">
        <div
          className="absolute inset-0 transition-transform duration-300 ease-out origin-center"
          style={{
            transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`,
          }}
        >
          {/* THE SVG PICTORIAL MAP */}
          <svg
            viewBox="0 0 1000 1300"
            className="w-full h-full object-cover select-none"
            style={{ filter: mapStyleMode === 'parchment' ? 'contrast(1.03)' : 'brightness(0.95)' }}
          >
            <defs>
              {/* Gradients for Seas and Countries */}
              <linearGradient id="redSeaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={mapStyleMode === 'parchment' ? '#1a4e8a' : '#07243d'} />
                <stop offset="50%" stopColor={mapStyleMode === 'parchment' ? '#1c5aa3' : '#0a3356'} />
                <stop offset="100%" stopColor={mapStyleMode === 'parchment' ? '#124177' : '#05192c'} />
              </linearGradient>

              {/* Desert Sand Gradient for Saudi Arabia */}
              <linearGradient id="saudiDesertGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={mapStyleMode === 'parchment' ? '#f5e9ce' : '#1c312c'} />
                <stop offset="35%" stopColor={mapStyleMode === 'parchment' ? '#faedd4' : '#223d37'} />
                <stop offset="70%" stopColor={mapStyleMode === 'parchment' ? '#f2e2be' : '#1a332e'} />
                <stop offset="100%" stopColor={mapStyleMode === 'parchment' ? '#e9d6ab' : '#142723'} />
              </linearGradient>

              {/* Neighboring Country Tints */}
              <linearGradient id="jordanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={mapStyleMode === 'parchment' ? '#e3957a' : '#42241e'} />
                <stop offset="100%" stopColor={mapStyleMode === 'parchment' ? '#d78366' : '#321914'} />
              </linearGradient>

              <linearGradient id="syriaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={mapStyleMode === 'parchment' ? '#9b68b8' : '#331d42'} />
                <stop offset="100%" stopColor={mapStyleMode === 'parchment' ? '#8550a3' : '#251233'} />
              </linearGradient>

              <linearGradient id="iraqGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={mapStyleMode === 'parchment' ? '#5aa86e' : '#163b22'} />
                <stop offset="100%" stopColor={mapStyleMode === 'parchment' ? '#469359' : '#0f2918'} />
              </linearGradient>

              <linearGradient id="kuwaitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={mapStyleColor('#d94389', '#4d142e', mapStyleMode)} />
                <stop offset="100%" stopColor={mapStyleColor('#bf2971', '#3b0a21', mapStyleMode)} />
              </linearGradient>

              <linearGradient id="yemenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={mapStyleMode === 'parchment' ? '#7152ab' : '#291845'} />
                <stop offset="100%" stopColor={mapStyleMode === 'parchment' ? '#5a3d93' : '#1d0e33'} />
              </linearGradient>

              <linearGradient id="omanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={mapStyleMode === 'parchment' ? '#499f78' : '#113a29'} />
                <stop offset="100%" stopColor={mapStyleMode === 'parchment' ? '#358a64' : '#0b261a'} />
              </linearGradient>

              <linearGradient id="sudanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={mapStyleMode === 'parchment' ? '#d47b68' : '#3b1c15'} />
                <stop offset="100%" stopColor={mapStyleMode === 'parchment' ? '#c46652' : '#2b120c'} />
              </linearGradient>

              <linearGradient id="eritreaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={mapStyleMode === 'parchment' ? '#69a759' : '#173611'} />
                <stop offset="100%" stopColor={mapStyleMode === 'parchment' ? '#549045' : '#10260b'} />
              </linearGradient>

              <linearGradient id="iranGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={mapStyleMode === 'parchment' ? '#b54e7d' : '#45172b'} />
                <stop offset="100%" stopColor={mapStyleMode === 'parchment' ? '#993a65' : '#300c1c'} />
              </linearGradient>
            </defs>

            {/* BASE OCEAN: Red Sea, Persian Gulf, Arabian Sea */}
            <rect width="1000" height="1300" fill="url(#redSeaGrad)" />

            {/* Sea Texture Lines (Subtle cartographic wave ripples) */}
            <g stroke="#ffffff" strokeWidth="0.75" strokeOpacity="0.22" fill="none">
              <path d="M 30,550 Q 80,545 130,550 T 230,550" />
              <path d="M 60,670 Q 110,665 160,670 T 260,670" />
              <path d="M 40,820 Q 90,815 140,820 T 240,820" />
              <path d="M 750,380 Q 800,375 850,380 T 950,380" />
              <path d="M 800,980 Q 860,970 920,980 T 980,980" />
            </g>

            {/* 1. SURROUNDING HISTORICAL COUNTRIES */}
            {/* Turkey (North) */}
            <path
              d="M 0,0 L 520,0 L 460,80 L 100,80 L 0,110 Z"
              fill={mapStyleMode === 'parchment' ? '#5a8f67' : '#1a3b25'}
              stroke="#2c1f0d"
              strokeWidth="2"
            />
            <text x="260" y="45" fill="#ffffff" fontWeight="900" fontSize="24" textAnchor="middle" letterSpacing="3">
              TURKEY
            </text>

            {/* Syria */}
            <path
              d="M 0,80 L 320,55 L 290,220 L 110,250 L 0,220 Z"
              fill="url(#syriaGrad)"
              stroke="#2c1f0d"
              strokeWidth="2"
            />
            <text x="145" y="140" fill="#ffffff" fontWeight="900" fontSize="22" textAnchor="middle" letterSpacing="3">
              SYRIA
            </text>
            <circle cx="110" cy="165" r="4" fill="#000000" />
            <text x="175" y="170" fill="#ffffff" fontWeight="bold" fontSize="13">
              • Damascus
            </text>

            {/* Iraq */}
            <path
              d="M 315,55 L 670,45 L 630,280 L 440,320 L 290,220 Z"
              fill="url(#iraqGrad)"
              stroke="#2c1f0d"
              strokeWidth="2"
            />
            <text x="470" y="140" fill="#ffffff" fontWeight="900" fontSize="25" textAnchor="middle" letterSpacing="4">
              IRAQ
            </text>
            <circle cx="490" cy="180" r="4.5" fill="#000000" />
            <text x="500" y="184" fill="#ffffff" fontWeight="bold" fontSize="14">
              • Baghdad
            </text>

            {/* Jordan */}
            <path
              d="M 0,220 L 110,250 L 220,230 L 170,360 L 0,380 Z"
              fill="url(#jordanGrad)"
              stroke="#2c1f0d"
              strokeWidth="2"
            />
            <text x="85" y="295" fill="#ffffff" fontWeight="900" fontSize="20" textAnchor="middle" letterSpacing="2">
              JORDAN
            </text>
            <circle cx="35" cy="325" r="4" fill="#000000" />
            <text x="45" y="329" fill="#ffffff" fontWeight="bold" fontSize="13">
              • Amman
            </text>

            {/* Kuwait */}
            <path
              d="M 570,255 L 740,240 L 755,340 L 640,335 Z"
              fill="url(#kuwaitGrad)"
              stroke="#2c1f0d"
              strokeWidth="2"
            />
            <text x="660" y="290" fill="#ffffff" fontWeight="bold" fontSize="16" textAnchor="middle">
              KUWAIT
            </text>

            {/* Iran */}
            <path
              d="M 670,45 L 1000,30 L 1000,430 L 790,440 L 630,280 Z"
              fill="url(#iranGrad)"
              stroke="#2c1f0d"
              strokeWidth="2"
            />
            <text x="930" y="240" fill="#ffffff" fontWeight="900" fontSize="26" textAnchor="middle" letterSpacing="4">
              IRAN
            </text>

            {/* Qatar */}
            <path
              d="M 795,430 L 905,435 L 890,520 L 810,500 Z"
              fill="url(#kuwaitGrad)"
              stroke="#2c1f0d"
              strokeWidth="1.5"
            />
            <text x="850" y="475" fill="#ffffff" fontWeight="bold" fontSize="15" textAnchor="middle">
              QATAR
            </text>

            {/* U.A.E */}
            <path
              d="M 855,505 L 1000,480 L 1000,590 L 880,610 Z"
              fill={mapStyleMode === 'parchment' ? '#d8a76d' : '#3d2b15'}
              stroke="#2c1f0d"
              strokeWidth="2"
            />
            <text x="945" y="555" fill="#ffffff" fontWeight="bold" fontSize="17" textAnchor="middle">
              U.A.E
            </text>

            {/* Oman */}
            <path
              d="M 880,610 L 1000,590 L 1000,950 L 780,950 L 840,780 Z"
              fill="url(#omanGrad)"
              stroke="#2c1f0d"
              strokeWidth="2"
            />
            <text x="945" y="740" fill="#ffffff" fontWeight="900" fontSize="26" textAnchor="middle" letterSpacing="4">
              OMAN
            </text>

            {/* Yemen (South) */}
            <path
              d="M 430,960 L 820,940 L 900,1180 L 460,1280 L 370,1050 Z"
              fill="url(#yemenGrad)"
              stroke="#2c1f0d"
              strokeWidth="2.5"
            />
            <text x="630" y="1120" fill="#ffffff" fontWeight="900" fontSize="34" textAnchor="middle" letterSpacing="5">
              YEMEN
            </text>

            {/* Sudan (West of Red Sea) */}
            <path
              d="M 0,550 L 160,540 L 190,920 L 0,960 Z"
              fill="url(#sudanGrad)"
              stroke="#2c1f0d"
              strokeWidth="2"
            />
            <text x="70" y="780" fill="#ffffff" fontWeight="900" fontSize="24" textAnchor="middle" letterSpacing="3">
              SUDAN
            </text>

            {/* Eritrea */}
            <path
              d="M 0,960 L 220,930 L 270,1260 L 0,1300 Z"
              fill="url(#eritreaGrad)"
              stroke="#2c1f0d"
              strokeWidth="2"
            />
            <text x="110" y="1180" fill="#ffffff" fontWeight="900" fontSize="22" textAnchor="middle" letterSpacing="2">
              ERITREA
            </text>

            {/* 2. THE MAIN SAUDI ARABIA KINGDOM BORDER & DESERT BODY */}
            {/* White glowing coastal outline as seen in the user photo */}
            <path
              d="M 185,280 
                 C 220,240 260,260 300,270 
                 C 370,290 440,310 520,330 
                 C 600,340 680,330 740,380 
                 C 780,410 780,510 880,590 
                 C 940,640 950,730 890,790 
                 C 830,850 780,940 700,940 
                 C 600,930 520,950 460,1030 
                 C 440,1050 410,1010 390,970 
                 C 360,900 340,780 270,680 
                 C 220,600 180,490 100,430 
                 C 70,400 90,340 140,300 Z"
              fill="none"
              stroke="#ffffff"
              strokeWidth="9"
              strokeLinejoin="round"
              opacity="0.95"
            />

            {/* Main Saudi Land Territory */}
            <path
              id="saudiTerritory"
              d="M 185,280 
                 C 220,240 260,260 300,270 
                 C 370,290 440,310 520,330 
                 C 600,340 680,330 740,380 
                 C 780,410 780,510 880,590 
                 C 940,640 950,730 890,790 
                 C 830,850 780,940 700,940 
                 C 600,930 520,950 460,1030 
                 C 440,1050 410,1010 390,970 
                 C 360,900 340,780 270,680 
                 C 220,600 180,490 100,430 
                 C 70,400 90,340 140,300 Z"
              fill="url(#saudiDesertGrad)"
              stroke="#2c1f0d"
              strokeWidth="2.5"
            />

            {/* 3. TERRAIN DETAILS: Sarawat & Hejaz Mountain Ridges (West Coast) */}
            <g
              stroke={mapStyleMode === 'parchment' ? '#8a5c32' : '#0c201d'}
              fill={mapStyleMode === 'parchment' ? '#b8824f' : '#2d473e'}
              strokeWidth="1.2"
              opacity="0.85"
            >
              {/* Mountain Ridge Peaks along the Red Sea Coast */}
              {[
                { x: 120, y: 400, s: 1.1 },
                { x: 145, y: 420, s: 0.9 },
                { x: 130, y: 450, s: 1.3 },
                { x: 160, y: 480, s: 1.0 },
                { x: 180, y: 520, s: 1.4 },
                { x: 200, y: 560, s: 1.1 },
                { x: 230, y: 620, s: 1.5 },
                { x: 250, y: 660, s: 1.2 },
                { x: 270, y: 720, s: 1.6 },
                { x: 300, y: 780, s: 1.4 },
                { x: 330, y: 830, s: 1.7 },
                { x: 360, y: 880, s: 1.5 },
                { x: 390, y: 940, s: 1.3 },
                // Central Najd hills
                { x: 450, y: 470, s: 1.1 },
                { x: 490, y: 490, s: 1.3 },
                { x: 530, y: 480, s: 0.9 },
                { x: 620, y: 650, s: 1.2 },
                { x: 660, y: 680, s: 1.4 },
                { x: 700, y: 670, s: 1.0 },
              ].map((m, idx) => (
                <polygon
                  key={idx}
                  points={`${m.x},${m.y} ${m.x - 14 * m.s},${m.y + 22 * m.s} ${m.x + 14 * m.s},${m.y + 22 * m.s}`}
                />
              ))}
            </g>

            {/* 4. DATE PALM OASES (Illustrated Palm Trees 🌴) */}
            <g
              fill={mapStyleMode === 'parchment' ? '#2f6e43' : '#10b981'}
              stroke={mapStyleMode === 'parchment' ? '#1f4e2e' : '#047857'}
              strokeWidth="0.8"
            >
              {[
                { x: 210, y: 360 },
                { x: 235, y: 375 },
                { x: 260, y: 380 },
                { x: 280, y: 350 },
                { x: 295, y: 440 },
                { x: 310, y: 465 },
                { x: 335, y: 485 },
                { x: 260, y: 550 },
                { x: 275, y: 580 },
                { x: 305, y: 610 },
                { x: 345, y: 710 },
                { x: 380, y: 790 },
                { x: 410, y: 840 },
                { x: 435, y: 910 },
                { x: 550, y: 380 },
                { x: 580, y: 395 },
                { x: 680, y: 440 },
                { x: 710, y: 460 },
              ].map((p, idx) => (
                <g key={idx} transform={`translate(${p.x}, ${p.y})`}>
                  {/* Palm Trunk */}
                  <line x1="0" y1="0" x2="0" y2="12" stroke="#694626" strokeWidth="2.2" />
                  {/* Palm Fronds */}
                  <path d="M 0,0 Q -8,-8 -12,-3 Q -8,-2 0,0" />
                  <path d="M 0,0 Q 8,-8 12,-3 Q 8,-2 0,0" />
                  <path d="M 0,0 Q -10,-3 -14,5 Q -8,3 0,0" />
                  <path d="M 0,0 Q 10,-3 14,5 Q 8,3 0,0" />
                  <path d="M 0,0 Q 0,-12 0,-15 Q 2,-10 0,0" />
                </g>
              ))}
            </g>

            {/* 5. VINTAGE SAILING DHOWS IN THE RED SEA & PERSIAN GULF ⛵ */}
            <g fill="#ffffff" stroke="#2c1f0d" strokeWidth="1.2">
              {/* Red Sea Dhow 1 (North) */}
              <g transform="translate(70, 420) scale(1.1)">
                <path d="M -18,12 C 0,18 25,18 35,10 L 22,20 L -12,20 Z" fill="#693c1b" />
                <path d="M 0,12 L 0,-16 L 22,10 Z" fill="#ffffff" />
                <path d="M 0,12 L 0,-12 L -14,10 Z" fill="#f0ede1" />
              </g>
              {/* Red Sea Dhow 2 (Jeddah Port) */}
              <g transform="translate(145, 680) scale(1.3)">
                <path d="M -18,12 C 0,18 25,18 35,10 L 22,20 L -12,20 Z" fill="#693c1b" />
                <path d="M 0,12 L 0,-18 L 24,10 Z" fill="#ffffff" />
                <path d="M 0,12 L 0,-14 L -15,10 Z" fill="#f0ede1" />
              </g>
              {/* Red Sea Dhow 3 (Jizan / Farasan) */}
              <g transform="translate(255, 960) scale(1.0)">
                <path d="M -18,12 C 0,18 25,18 35,10 L 22,20 L -12,20 Z" fill="#693c1b" />
                <path d="M 0,12 L 0,-16 L 22,10 Z" fill="#ffffff" />
              </g>
              {/* Persian Gulf Dhow */}
              <g transform="translate(860, 360) scale(1.1)">
                <path d="M -18,12 C 0,18 25,18 35,10 L 22,20 L -12,20 Z" fill="#693c1b" />
                <path d="M 0,12 L 0,-16 L 22,10 Z" fill="#ffffff" />
              </g>
            </g>

            {/* Sea Names in Calligraphic Serif */}
            <text x="210" y="790" fill="#ffffff" fontWeight="900" fontSize="38" letterSpacing="4" opacity="0.9" transform="rotate(-65 210,790)">
              Red Sea
            </text>
            <text x="815" y="340" fill="#ffffff" fontWeight="900" fontSize="26" letterSpacing="3" opacity="0.9">
              Persian
            </text>
            <text x="825" y="370" fill="#ffffff" fontWeight="900" fontSize="26" letterSpacing="3" opacity="0.9">
              Gulf
            </text>

            {/* MAIN COUNTRY TITLE: SAUDI ARABIA */}
            <text
              x="590"
              y="680"
              fill={mapStyleMode === 'parchment' ? '#21160a' : '#ffffff'}
              fontWeight="900"
              fontSize="44"
              textAnchor="middle"
              letterSpacing="6"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              SAUDI ARABIA
            </text>
            <text
              x="590"
              y="720"
              fill={mapStyleMode === 'parchment' ? '#6e5130' : '#34d399'}
              fontWeight="bold"
              fontSize="24"
              textAnchor="middle"
              className="font-arabic"
            >
              المملكة العربية السعودية
            </text>

            {/* 6. ORNATE CARTOGRAPHER'S COMPASS ROSE (Top Right) */}
            <g transform="translate(910, 45) scale(0.9)">
              <circle cx="0" cy="0" r="42" fill="none" stroke="#2c1f0d" strokeWidth="2.5" />
              <circle cx="0" cy="0" r="36" fill="none" stroke="#2c1f0d" strokeWidth="1" strokeDasharray="3,3" />
              {/* North Pointer */}
              <polygon points="0,0 -8,-10 0,-48 8,-10" fill="#c2410c" stroke="#2c1f0d" strokeWidth="1" />
              {/* South Pointer */}
              <polygon points="0,0 -8,10 0,48 8,10" fill="#facc15" stroke="#2c1f0d" strokeWidth="1" />
              {/* East Pointer */}
              <polygon points="0,0 10,-8 48,0 10,8" fill="#facc15" stroke="#2c1f0d" strokeWidth="1" />
              {/* West Pointer */}
              <polygon points="0,0 -10,-8 -48,0 -10,8" fill="#facc15" stroke="#2c1f0d" strokeWidth="1" />
              <circle cx="0" cy="0" r="5" fill="#2c1f0d" />
              {/* Cardinal Labels */}
              <text x="0" y="-53" fill="#2c1f0d" fontWeight="900" fontSize="16" textAnchor="middle">
                N
              </text>
              <text x="56" y="5" fill="#2c1f0d" fontWeight="900" fontSize="16">
                E
              </text>
              <text x="0" y="65" fill="#2c1f0d" fontWeight="900" fontSize="16" textAnchor="middle">
                S
              </text>
              <text x="-65" y="5" fill="#2c1f0d" fontWeight="900" fontSize="16">
                W
              </text>
            </g>

            {/* 7. ANIMATED ROUTE TRAJECTORIES */}
            {activeRoute === 'hajj' && (
              <g>
                {/* Jeddah -> Makkah Highway */}
                <path
                  d="M 235,655 Q 260,670 295,690"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="4"
                  strokeDasharray="6,4"
                  className="animate-[dash_1.5s_linear_infinite]"
                />
                {/* Makkah -> Mina -> Arafat -> Muzdalifah Loop */}
                <path
                  d="M 295,690 Q 315,675 330,680 T 350,710 T 330,730 T 295,690"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="4.5"
                  strokeDasharray="8,5"
                  className="animate-[dash_2s_linear_infinite]"
                />
                {/* Makkah -> Madinah Pilgrimage Highway */}
                <path
                  d="M 295,690 Q 280,600 290,535"
                  fill="none"
                  stroke="#059669"
                  strokeWidth="4"
                  strokeDasharray="7,5"
                />
              </g>
            )}

            {activeRoute === 'hijrah' && (
              <g>
                {/* Historical Hijrah Route: Makkah (Cave Thawr) -> Coastal Route -> Quba -> Madinah */}
                <path
                  d="M 295,690 Q 255,670 240,610 Q 230,550 270,540 L 290,535"
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth="4.5"
                  strokeDasharray="8,6"
                  className="animate-[dash_2s_linear_infinite]"
                />
                <text x="220" y="590" fill="#dc2626" fontWeight="bold" fontSize="13" transform="rotate(-75 220,590)">
                  Prophetic Hijrah Route (622 CE)
                </text>
              </g>
            )}

            {/* 8. INTERACTIVE CLICKABLE HOTSPOTS */}
            {filteredHotspots.map((spot) => {
              const cx = spot.x * 10;
              const cy = spot.y * 13;
              const isSelected = selectedHotspot?.id === spot.id;

              return (
                <g
                  key={spot.id}
                  onClick={() => handleSelectSpot(spot)}
                  className="cursor-pointer group"
                >
                  {/* Ping Animation for Selected Hotspot */}
                  {isSelected && (
                    <>
                      <circle cx={cx} cy={cy} r="28" fill="#10b981" fillOpacity="0.25" className="animate-ping" />
                      <circle cx={cx} cy={cy} r="20" fill="#f59e0b" fillOpacity="0.35" />
                    </>
                  )}

                  {/* Hotspot Outer Marker Ring */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isSelected ? 16 : 11}
                    fill={
                      spot.category === 'holy'
                        ? '#000000'
                        : spot.category === 'miqat'
                        ? '#dc2626'
                        : spot.category === 'sea_port'
                        ? '#0284c7'
                        : '#d97706'
                    }
                    stroke="#ffffff"
                    strokeWidth={isSelected ? 3.5 : 2}
                    className="transition-all duration-300 drop-shadow-lg group-hover:scale-125"
                  />

                  {/* Icon Glyphs inside Hotspot */}
                  {spot.category === 'holy' && spot.id === 'makkah' && (
                    <rect x={cx - 6} y={cy - 6} width="12" height="12" fill="#f59e0b" rx="2" />
                  )}
                  {spot.category === 'holy' && spot.id === 'madinah' && (
                    <circle cx={cx} cy={cy} r="6" fill="#10b981" />
                  )}
                  {spot.category === 'miqat' && (
                    <polygon points={`${cx},${cy - 5} ${cx - 4},${cy + 4} ${cx + 4},${cy + 4}`} fill="#ffffff" />
                  )}

                  {/* Text Label next to Hotspot */}
                  <g transform={`translate(${cx + 16}, ${cy + 5})`}>
                    <rect
                      x="-4"
                      y="-15"
                      width={spot.nameEn.length * 8.5 + 24}
                      height="22"
                      rx="6"
                      fill={mapStyleMode === 'parchment' ? '#fbf8ee' : '#081721'}
                      stroke={isSelected ? '#10b981' : '#a17849'}
                      strokeWidth={isSelected ? '2' : '1'}
                      opacity="0.95"
                    />
                    <text
                      x="4"
                      y="0"
                      fill={mapStyleMode === 'parchment' ? '#2c1e0e' : '#ffffff'}
                      fontWeight={isSelected ? '900' : 'bold'}
                      fontSize="13"
                    >
                      {spot.nameEn}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>
        </div>

        {/* FLOATING QUICK COMPASS & DISTANCE BADGE */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
          {selectedHotspot && (
            <div
              className={`p-2.5 rounded-2xl border shadow-xl backdrop-blur-md max-w-xs transition-all ${
                mapStyleMode === 'parchment'
                  ? 'bg-[#fbf7ed]/95 border-[#dfd5bc] text-[#33220c]'
                  : 'bg-[#091a24]/95 border-[#1b3d52] text-white'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  {selectedHotspot.badgeEn}
                </span>
                {selectedHotspot.distanceToKaabaKm !== undefined && (
                  <span className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400">
                    🕋 {selectedHotspot.distanceToKaabaKm} km to Kaaba
                  </span>
                )}
              </div>
              <div className="text-sm font-black mt-0.5">
                {isBn ? selectedHotspot.nameBn : selectedHotspot.nameEn}
              </div>
              <div className="text-xs font-arabic text-amber-700 dark:text-amber-300">
                {selectedHotspot.nameAr}
              </div>
            </div>
          )}
        </div>

        {/* MAP LEGEND OVERLAY (Bottom Left) */}
        <div
          className={`absolute bottom-4 left-4 z-20 p-3 rounded-2xl border shadow-lg backdrop-blur-md hidden sm:block text-[11px] font-bold ${
            mapStyleMode === 'parchment'
              ? 'bg-[#fbf7ed]/90 border-[#dfd5bc] text-[#382611]'
              : 'bg-[#081721]/90 border-[#193a4d] text-cyan-100'
          }`}
        >
          <div className="text-[10px] uppercase font-black text-amber-700 dark:text-amber-400 mb-1">
            {isBn ? 'মানচিত্র নির্দেশিকা (Legend)' : 'Map Legend'}
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-black border border-white" />
              <span>{isBn ? 'পবিত্র হারামাইন' : 'Holy Haramain'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
              <span>{isBn ? '৫টি মিকাত' : '5 Miqats'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span>{isBn ? 'প্রধান নগরী' : 'Major Cities'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
              <span>{isBn ? 'বন্দর ও উপকূল' : 'Ports & Sea'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. EXPANDABLE LANDMARK DETAIL CARD (Bottom Drawer) */}
      {selectedHotspot && (
        <div
          className={`p-4 sm:p-6 border-t backdrop-blur-md space-y-4 transition-all ${
            mapStyleMode === 'parchment'
              ? 'bg-[#f7f2e5] border-[#dfd5bc] text-[#2c1f0d]'
              : 'bg-[#06151f] border-[#183a4d] text-slate-100'
          }`}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border shadow-md shrink-0 border-amber-500/30">
                <img
                  src={selectedHotspot.imageUrl}
                  alt={selectedHotspot.nameEn}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30">
                    {isBn ? selectedHotspot.badgeBn : selectedHotspot.badgeEn}
                  </span>
                  {selectedHotspot.elevationMeters && (
                    <span className="text-[11px] opacity-75">
                      ⛰️ {selectedHotspot.elevationMeters}m elevation
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-2 mt-1">
                  <h3 className="text-lg sm:text-2xl font-black">
                    {isBn ? selectedHotspot.nameBn : selectedHotspot.nameEn}
                  </h3>
                  <span className="font-arabic text-amber-600 dark:text-amber-400 font-bold text-base sm:text-lg">
                    {selectedHotspot.nameAr}
                  </span>
                </div>

                <p className="text-xs sm:text-sm opacity-85 max-w-2xl mt-1 leading-relaxed">
                  {isBn ? selectedHotspot.descriptionBn : selectedHotspot.descriptionEn}
                </p>
              </div>
            </div>

            {/* Audio Playback & Action Buttons */}
            <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
              {selectedHotspot.talbiyahOrDua && (
                <button
                  type="button"
                  onClick={() => playSpotAudio(selectedHotspot.talbiyahOrDua)}
                  disabled={isPlayingAudio}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition active:scale-95 cursor-pointer disabled:opacity-50"
                  title="Play Arabic Supplication"
                >
                  <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'animate-bounce' : ''}`} />
                  <span>{isPlayingAudio ? 'বাজছে...' : isBn ? 'দোয়া শুনুন' : 'Listen Supplication'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Significance & Talbiyah Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-slate-300/40 dark:border-slate-800">
            <div
              className={`p-3.5 rounded-2xl border text-xs sm:text-sm space-y-1.5 ${
                mapStyleMode === 'parchment'
                  ? 'bg-[#ede5d1] border-[#d8cbb0]'
                  : 'bg-[#0d2230] border-[#1c455c]'
              }`}
            >
              <div className="font-bold flex items-center gap-1.5 text-amber-700 dark:text-amber-300">
                <Info className="w-4 h-4" />
                <span>{isBn ? 'ঐতিহাসিক ও ধর্মীয় তাৎপর্য:' : 'Historical Significance:'}</span>
              </div>
              <p className="leading-relaxed opacity-90">
                {isBn ? selectedHotspot.historicalSignificanceBn : selectedHotspot.historicalSignificanceEn}
              </p>
              {selectedHotspot.quranHadithReference && (
                <div className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 mt-1">
                  📖 {selectedHotspot.quranHadithReference}
                </div>
              )}
            </div>

            {selectedHotspot.talbiyahOrDua ? (
              <div
                className={`p-3.5 rounded-2xl border text-xs sm:text-sm space-y-1.5 ${
                  mapStyleMode === 'parchment'
                    ? 'bg-[#ede5d1] border-[#d8cbb0]'
                    : 'bg-[#0d2230] border-[#1c455c]'
                }`}
              >
                <div className="font-bold flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300">
                  <Sparkles className="w-4 h-4" />
                  <span>{isBn ? 'এই স্থানের প্রধান তালবিয়াহ / দুআ:' : 'Prescribed Supplication:'}</span>
                </div>
                <div className="font-arabic text-sm sm:text-base text-right leading-loose font-bold text-amber-700 dark:text-amber-300">
                  {selectedHotspot.talbiyahOrDua}
                </div>
                {selectedHotspot.talbiyahOrDuaMeaningBn && (
                  <p className="text-xs opacity-90 italic">
                    "{selectedHotspot.talbiyahOrDuaMeaningBn}"
                  </p>
                )}
              </div>
            ) : (
              <div
                className={`p-3.5 rounded-2xl border text-xs sm:text-sm flex flex-col justify-center space-y-1 ${
                  mapStyleMode === 'parchment'
                    ? 'bg-[#ede5d1] border-[#d8cbb0]'
                    : 'bg-[#0d2230] border-[#1c455c]'
                }`}
              >
                <div className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isBn ? 'হজ ও উমরাহ রুট গাইড' : 'Pilgrim Wayfinding'}</span>
                </div>
                <p className="text-xs opacity-80 leading-relaxed">
                  {isBn
                    ? 'মক্কা শরিফের উদ্দেশ্যে আগত সকল যাত্রী এই অঞ্চল অতিক্রমের পূর্বে ইহরাম সম্পন্ন করেন।'
                    : 'Pilgrims traveling towards Makkah cross this sector maintaining ritual purity and chanting Talbiyah.'}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Helper for dynamic parchment vs nocturnal gradient stops
function mapStyleColor(dayColor: string, nightColor: string, mode: 'parchment' | 'nocturnal'): string {
  return mode === 'parchment' ? dayColor : nightColor;
}

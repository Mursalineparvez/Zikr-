import React, { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';
import { WarItem } from './IslamicHistoryWarsView';
import {
  Compass,
  MapPin,
  ExternalLink,
  Navigation,
  Layers,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  CheckCircle2,
  Shield,
  Calendar,
  X,
  Satellite,
  Map as MapIcon,
  Globe2,
} from 'lucide-react';
import { soundHaptics } from '../utils/audioHaptics';

export interface BattleGeoLocation {
  warId: string;
  nameBn: string;
  nameAr: string;
  lat: number;
  lng: number;
  zoom: number;
  countryBn: string;
  regionBn: string;
  terrainBn: string;
  elevationMeters: number;
  distanceFromMadinahKm: number;
  distanceFromMakkahKm: number;
  strategicImportanceBn: string;
  modernSiteBn: string;
}

export const BATTLE_GEO_DATA: Record<string, BattleGeoLocation> = {
  badr: {
    warId: 'badr',
    nameBn: 'বদর প্রান্তর',
    nameAr: 'وادي بدر',
    lat: 23.7781,
    lng: 38.7889,
    zoom: 14,
    countryBn: 'সৌদি আরব',
    regionBn: 'আল-মদিনা প্রদেশ (বদর গভর্নরেট)',
    terrainBn: 'মরু বালুকাময় প্রান্তর ও ঐতিহাসিক পানির কূপের অববাহিকা',
    elevationMeters: 172,
    distanceFromMadinahKm: 130,
    distanceFromMakkahKm: 310,
    strategicImportanceBn: 'মক্কা-শাম প্রাচীন বাণিজ্য কাফেলার প্রধান মিলনস্থল ও মিষ্টি পানির প্রাচুর্যময় কৌশলগত মরূদ্যান।',
    modernSiteBn: 'বর্তমান বদর শহর ও শুহাদায়ে বদর স্মৃতিসৌধ',
  },
  uhud: {
    warId: 'uhud',
    nameBn: 'উহুদ পাহাড়ের পাদদেশ',
    nameAr: 'سفوح جبل أحد',
    lat: 24.5034,
    lng: 39.6125,
    zoom: 15,
    countryBn: 'সৌদি আরব',
    regionBn: 'মদিনা মুনাওয়ারা',
    terrainBn: 'লালচে আগ্নেয় শিলা পর্বতমালা, শুষ্ক উপত্যকা ও তীরন্দাজ ঢিবি',
    elevationMeters: 625,
    distanceFromMadinahKm: 5,
    distanceFromMakkahKm: 440,
    strategicImportanceBn: 'মদিনা শহরের উত্তর প্রবেশপথের প্রাকৃতিক প্রাচীর এবং জাবালে আর-রুমাহ নামক সুরক্ষিত তীরন্দাজ চৌকি।',
    modernSiteBn: 'মদিনার উহুদ শুহাদা প্রাঙ্গণ ও জাবালুর রুমাহ',
  },
  khandaq: {
    warId: 'khandaq',
    nameBn: 'মদিনার উত্তর সীমান্ত (পরিখা)',
    nameAr: 'الخندق شمال المدينة',
    lat: 24.4756,
    lng: 39.5960,
    zoom: 15,
    countryBn: 'সৌদি আরব',
    regionBn: 'মদিনা মুনাওয়ারা (সাবা মাসাজিদ প্রাঙ্গণ)',
    terrainBn: 'দুর্গম লাভা পাথর (হাররাহ) বেষ্টিত উন্মুক্ত সমতল মাটি',
    elevationMeters: 600,
    distanceFromMadinahKm: 2,
    distanceFromMakkahKm: 435,
    strategicImportanceBn: 'মদিনার পূর্ব ও পশ্চিমে দুর্ভেদ্য আগ্নেয় পাথুরে পাহাড় থাকায় একমাত্র উত্তর দিক দিয়েই অশ্বারোহী আক্রমণ সম্ভব ছিল, সেখানেই পরিখা খনন করা হয়।',
    modernSiteBn: 'মসজিদে খন্দক ও সাবা মাসাজিদ চত্বর',
  },
  hudaibiyah: {
    warId: 'hudaibiyah',
    nameBn: 'হুদাইবিয়া প্রান্তর',
    nameAr: 'الحديبية (الشميسي)',
    lat: 21.4398,
    lng: 39.6456,
    zoom: 14,
    countryBn: 'সৌদি আরব',
    regionBn: 'মক্কা মুকাররমা পশ্চিম প্রবেশদ্বার',
    terrainBn: 'শুষ্ক পাহাড়ি প্রান্তর ও বাবলা বৃক্ষের ঐতিহাসিক প্রান্তর',
    elevationMeters: 220,
    distanceFromMadinahKm: 390,
    distanceFromMakkahKm: 22,
    strategicImportanceBn: 'হারাম শরিফের সীমানা সংলগ্ন প্রাচীন কাফেলা পথ যেখানে রক্তপাতহীন ঐতিহাসিক শান্তি চুক্তি স্বাক্ষরিত হয়।',
    modernSiteBn: 'বর্তমান আশ-শুমায়সি (Al-Shumaysi) ও মসজিদে হুদাইবিয়া',
  },
  khaibar: {
    warId: 'khaibar',
    nameBn: 'খায়বার মরূদ্যান ও দুর্গসমূহ',
    nameAr: 'واحة وحصون خيبر',
    lat: 25.6989,
    lng: 39.2933,
    zoom: 14,
    countryBn: 'সৌদি আরব',
    regionBn: 'মদিনা থেকে উত্তরে হিজাজ উচ্চভূমি',
    terrainBn: 'কালো ব্যাসাল্ট লাভা শিলা ও খেজুর বাগান বেষ্টিত উঁচু পাথুরে টিলা',
    elevationMeters: 745,
    distanceFromMadinahKm: 155,
    distanceFromMakkahKm: 580,
    strategicImportanceBn: 'আটটি দুর্ভেদ্য পাথুরে কেল্লা সমৃদ্ধ সুরক্ষিত বাণিজ্য ও কৃষি কেন্দ্র যা উত্তর আরবের নিয়ন্ত্রক ছিল।',
    modernSiteBn: 'খায়বার ঐতিহ্যবাহী দুর্গ এলাকা ও কামুস কেল্লা',
  },
  makkah_conquest: {
    warId: 'makkah_conquest',
    nameBn: 'পবিত্র মক্কা মুকাররমা',
    nameAr: 'مكة المكرمة والحرم',
    lat: 21.4225,
    lng: 39.8262,
    zoom: 15,
    countryBn: 'সৌদি আরব',
    regionBn: 'মক্কা আল-মুকাররামা',
    terrainBn: 'রুক্ষ পাহাড়ি উপত্যকা বেষ্টিত পবিত্র নগরী',
    elevationMeters: 277,
    distanceFromMadinahKm: 430,
    distanceFromMakkahKm: 0,
    strategicImportanceBn: 'আরব উপদ্বীপের আধ্যাত্মিক কেন্দ্র, কুরাইশদের রাজধানী এবং কাবার পবিত্র অবস্থান।',
    modernSiteBn: 'মসজিদুল হারাম ও চারদিকের প্রবেশদ্বার',
  },
  hunayn: {
    warId: 'hunayn',
    nameBn: 'হুনায়ুন উপত্যকা',
    nameAr: 'وادي حنين',
    lat: 21.4428,
    lng: 40.2483,
    zoom: 13,
    countryBn: 'সৌদি আরব',
    regionBn: 'মক্কা ও তায়েফের মধ্যবর্তী স্থান',
    terrainBn: 'সংকীর্ণ ও খাড়া পাহাড়ি গিরিখাত',
    elevationMeters: 550,
    distanceFromMadinahKm: 460,
    distanceFromMakkahKm: 45,
    strategicImportanceBn: 'হাওয়াজিন ও সাকিফ গোত্রের গুপ্ত তীরন্দাজদের জন্য উপযুক্ত সংকীর্ণ পাহাড়ি গিরিখাত।',
    modernSiteBn: 'আশ-শারায়ে ও তায়েফ মহাসড়ক সংলগ্ন উপত্যকা',
  },
  mutah: {
    warId: 'mutah',
    nameBn: 'মুতা প্রান্তর',
    nameAr: 'مؤتة (الأردن)',
    lat: 31.0964,
    lng: 35.6989,
    zoom: 14,
    countryBn: 'জর্ডান',
    regionBn: 'আল-কারাক গভর্নরেট',
    terrainBn: 'উঁচু মরু মালভূমি ও উন্মুক্ত বাতাসময় প্রান্তর',
    elevationMeters: 1110,
    distanceFromMadinahKm: 850,
    distanceFromMakkahKm: 1280,
    strategicImportanceBn: 'বাইজেন্টাইন রোমান সাম্রাজ্যের দক্ষিণ সীমান্তে প্রথম মুসলিম সামরিক অভিযান।',
    modernSiteBn: 'মুতা বিশ্ববিদ্যালয় ও তিন প্রধান শহীদ সেনাপতির মাজার',
  },
  tabuk: {
    warId: 'tabuk',
    nameBn: 'তাবুক মরূদ্যান',
    nameAr: 'تبوك الشمالية',
    lat: 28.3835,
    lng: 36.5662,
    zoom: 14,
    countryBn: 'সৌদি আরব',
    regionBn: 'উত্তর-পশ্চিম সীমান্ত প্রদেশ',
    terrainBn: 'বিস্তীর্ণ বালুকাময় মরুভূমি ও সুমিষ্ট ঝরনার মরূদ্যান',
    elevationMeters: 760,
    distanceFromMadinahKm: 680,
    distanceFromMakkahKm: 1100,
    strategicImportanceBn: 'রোমান সাম্রাজ্যের আক্রমণের মুখে আরবদের উত্তরাঞ্চলীয় প্রতিরক্ষা রেখা।',
    modernSiteBn: 'ঐতিহাসিক আইন আল-সুক্কাহ ঝরনা ও তাবুক দুর্গ',
  },
  yarmouk: {
    warId: 'yarmouk',
    nameBn: 'ইয়ারমুক নদী ও গিরিখাত',
    nameAr: 'حوض نهر اليرموك',
    lat: 32.8080,
    lng: 35.9520,
    zoom: 13,
    countryBn: 'সিরিয়া ও জর্ডান সীমান্ত',
    regionBn: 'দারআ / গোলান মালভূমি পাদদেশ',
    terrainBn: 'গভীর খাড়া ক্যানিয়ন ও খরস্রোতা নদীর দুই তীর',
    elevationMeters: 280,
    distanceFromMadinahKm: 980,
    distanceFromMakkahKm: 1410,
    strategicImportanceBn: 'বাইজেন্টাইনদের ভারী বাহিনীকে খাড়া গিরিখাতে অবরুদ্ধ করে খালিদ বিন ওয়ালিদের অশ্বারোহী ফাঁদ।',
    modernSiteBn: 'ইয়ারমুক নদী উপত্যকা',
  },
  qadisiyyah: {
    warId: 'qadisiyyah',
    nameBn: 'আল-কাদিসিয়া প্রান্তর',
    nameAr: 'القادسية (العراق)',
    lat: 31.5833,
    lng: 44.3833,
    zoom: 13,
    countryBn: 'ইরাক',
    regionBn: 'কুফার দক্ষিণে নাজাফ গভর্নরেট',
    terrainBn: 'ইউফ্রেটিস নদীর নিকটবর্তী পলিময় সমতল ভূমি ও খেজুর বন',
    elevationMeters: 30,
    distanceFromMadinahKm: 1100,
    distanceFromMakkahKm: 1530,
    strategicImportanceBn: 'সাসানীয় পারস্য সাম্রাজ্যের রাজধানী তিসফুনের (মাদায়েন) মূল প্রতিরক্ষা দুর্গ।',
    modernSiteBn: 'আল-কাদিসিয়া স্মৃতি প্রাঙ্গণ, ইরাক',
  },
  dhat_salasil: {
    warId: 'dhat_salasil',
    nameBn: 'কাজিমা প্রান্তর (কুয়েত উপসাগর)',
    nameAr: 'كاظمة (الكويت)',
    lat: 29.3759,
    lng: 47.9774,
    zoom: 13,
    countryBn: 'কুয়েত',
    regionBn: 'উপসাগরীয় উপকূল',
    terrainBn: 'উপকূলীয় বালিয়াড়ি ও লবণাক্ত মরুভূমি',
    elevationMeters: 15,
    distanceFromMadinahKm: 1050,
    distanceFromMakkahKm: 1480,
    strategicImportanceBn: 'পারস্য উপসাগরের প্রবেশমুখ ও পারস্য সাম্রাজ্যের সীমান্ত চৌকি।',
    modernSiteBn: 'কুয়েত উপকূলীয় কাজিমা অঞ্চল',
  },
  walaja: {
    warId: 'walaja',
    nameBn: 'ওয়ালাজা প্রান্তর',
    nameAr: 'الولجة بين الرافدين',
    lat: 31.5000,
    lng: 45.0000,
    zoom: 13,
    countryBn: 'ইরাক',
    regionBn: 'মেসোপটেমিয়া সমভূমি',
    terrainBn: 'নদীমাতৃক উন্মুক্ত সমতল ও ঝোপঝাড়যুক্ত প্রান্তর',
    elevationMeters: 25,
    distanceFromMadinahKm: 1150,
    distanceFromMakkahKm: 1580,
    strategicImportanceBn: 'খালিদ বিন ওয়ালিদের বিশ্বখ্যাত দ্বিমুখী সাঁড়াশি (Pincer) কৌশল প্রয়োগের উপযুক্ত উন্মুক্ত ময়দান।',
    modernSiteBn: 'ইরাকের ইউফ্রেটিস নদীর মধ্যবর্তী সমভূমি',
  },
  damascus_conquest: {
    warId: 'damascus_conquest',
    nameBn: 'প্রাচীন দামেস্ক নগরী',
    nameAr: 'دمشق الفيحاء',
    lat: 33.5138,
    lng: 36.2765,
    zoom: 15,
    countryBn: 'সিরিয়া',
    regionBn: 'দামেস্ক প্রদেশ',
    terrainBn: 'বারাদা নদী বিধৌত উর্বর মরূদ্যান ও প্রাচীন পাথুরে প্রাচীর',
    elevationMeters: 680,
    distanceFromMadinahKm: 1120,
    distanceFromMakkahKm: 1550,
    strategicImportanceBn: 'শাম বা লেভান্টের প্রাচীনতম সমৃদ্ধ রাজধানী ও রোমান সামরিক ক্ষমতার দুর্গ।',
    modernSiteBn: 'পুরনো দামেস্ক ও বাব শারকি প্রবেশদ্বার',
  },
  nahavand: {
    warId: 'nahavand',
    nameBn: 'নাহাওয়ান্দ উপত্যকা',
    nameAr: 'نهاوند (إيران)',
    lat: 34.1886,
    lng: 48.3758,
    zoom: 13,
    countryBn: 'ইরান',
    regionBn: 'হামাদান প্রদেশ',
    terrainBn: 'জাগরোস পর্বতমালা বেষ্টিত বরফাচ্ছন্ন উঁচু পাহাড়ি উপত্যকা',
    elevationMeters: 1680,
    distanceFromMadinahKm: 1650,
    distanceFromMakkahKm: 2080,
    strategicImportanceBn: 'পারস্য সাম্রাজ্যের অস্তিত্বের শেষ যুদ্ধ ("বিজয়ের বিজয়" বা ফাতহুল ফুতুহ)।',
    modernSiteBn: 'নাহাওয়ান্দ শহর, ইরান',
  },
  debal_sindh: {
    warId: 'debal_sindh',
    nameBn: 'দেবল ও সিন্ধু বন্দর',
    nameAr: 'ميناء الديبل السند',
    lat: 24.7500,
    lng: 67.5500,
    zoom: 13,
    countryBn: 'পাকিস্তান',
    regionBn: 'সিন্ধু প্রদেশ (করাচি ও ঠাট্টার নিকট)',
    terrainBn: 'আরব সাগরের উপকূল ও সিন্ধু নদের ব-দ্বীপ অঞ্চল',
    elevationMeters: 12,
    distanceFromMadinahKm: 2600,
    distanceFromMakkahKm: 2950,
    strategicImportanceBn: 'ভারতবর্ষে ইসলাম প্রবেশের প্রধান জল ও স্থল প্রবেশদ্বার (মুহাম্মদ বিন কাসিমের অভিযান)।',
    modernSiteBn: 'ভাভোর / দেবল প্রত্নতাত্ত্বিক বন্দর সাইট',
  },
  guadalete: {
    warId: 'guadalete',
    nameBn: 'গুয়াদালেতে নদীর তীর (ওয়াদি বারবাত)',
    nameAr: 'وادي لكة (إسبانيا)',
    lat: 36.6333,
    lng: -6.1167,
    zoom: 13,
    countryBn: 'স্পেন',
    regionBn: 'আন্দালুসিয়া (কাদিজ প্রদেশ)',
    terrainBn: 'আন্দালুসিয়ার সবুজ উর্বর উপত্যকা ও নদীর মোহনা',
    elevationMeters: 45,
    distanceFromMadinahKm: 4700,
    distanceFromMakkahKm: 4950,
    strategicImportanceBn: 'তারিক বিন জিয়াদের ইউরোপ বিজয়ের প্রবেশদ্বার ও ভিসিগোথিক রাজতন্ত্রের পতনস্থল।',
    modernSiteBn: 'রিও গুয়াদালেতে অববাহিকা, স্পেন',
  },
  tours_poitiers: {
    warId: 'tours_poitiers',
    nameBn: 'টুয়ার্স প্রান্তর (বালাত আশ-শুহাদা)',
    nameAr: 'بلاط الشهداء (فرنسا)',
    lat: 46.5802,
    lng: 0.3404,
    zoom: 13,
    countryBn: 'ফ্রান্স',
    regionBn: 'পয়টিয়ার্স ও টুয়াসের মধ্যবর্তী ভিয়েন অঞ্চল',
    terrainBn: 'পশ্চিম ইউরোপের আর্দ্র তৃণভূমি ও ঘন ওক বন',
    elevationMeters: 110,
    distanceFromMadinahKm: 4400,
    distanceFromMakkahKm: 4680,
    strategicImportanceBn: 'পশ্চিম ইউরোপে মুসলিম সাম্রাজ্যের উত্তরতম সীমানা (প্যারিসের ১৫০ কিমি দূরে)।',
    modernSiteBn: 'ভুসুই ও পয়টিয়ার্স ঐতিহাসিক ক্ষেত্র, ফ্রান্স',
  },
  talas: {
    warId: 'talas',
    nameBn: 'তালাস নদীর উপত্যকা',
    nameAr: 'نهر طلاس (آسيا الوسطى)',
    lat: 42.5200,
    lng: 71.4000,
    zoom: 12,
    countryBn: 'কাজাখস্তান ও কিরগিজস্তান সীমান্ত',
    regionBn: 'মধ্য এশিয়া',
    terrainBn: 'তিয়ান শান পর্বতমালার হিমবাহ বিধৌত উপত্যকা',
    elevationMeters: 850,
    distanceFromMadinahKm: 3800,
    distanceFromMakkahKm: 4100,
    strategicImportanceBn: 'আব্বাসি খিলাফত ও চীনা তাং সাম্রাজ্যের মধ্যকার যুদ্ধ; এর মাধ্যমেই বিশ্বে কাগজ তৈরির কৌশল ছড়িয়ে পড়ে।',
    modernSiteBn: 'তালাস নদী অববাহিকা',
  },
  manzikert: {
    warId: 'manzikert',
    nameBn: 'মানজিকার্ট সমভূমি',
    nameAr: 'ملاذكرد (تركيا)',
    lat: 39.1469,
    lng: 42.5400,
    zoom: 13,
    countryBn: 'তুরস্ক',
    regionBn: 'মুশ প্রদেশ (পূর্ব আনাতোলিয়া)',
    terrainBn: 'ভ্যান হ্রদের উত্তরের আলপাইন মালভূমি',
    elevationMeters: 1530,
    distanceFromMadinahKm: 1850,
    distanceFromMakkahKm: 2280,
    strategicImportanceBn: 'সুলতান আল্প আরসালানের রোমান সম্রাটকে বন্দি করার ঐতিহাসিক যুদ্ধ, যার মাধ্যমে আনাতোলিয়া মুসলিমদের হাতে আসে।',
    modernSiteBn: 'মালাজগির্দ ঐতিহাসিক প্রান্তর, তুরস্ক',
  },
  zallaqa: {
    warId: 'zallaqa',
    nameBn: 'যাল্লাকা প্রান্তর (সাক্রাজাস)',
    nameAr: 'الزلاقة (بطليوس)',
    lat: 38.8794,
    lng: -6.9706,
    zoom: 13,
    countryBn: 'স্পেন',
    regionBn: 'বাদাখোস, এস্ত্রেমেদুরা',
    terrainBn: 'গুয়াদিয়ানা নদীর অববাহিকার পিচ্ছিল সমতল প্রান্তর',
    elevationMeters: 180,
    distanceFromMadinahKm: 4850,
    distanceFromMakkahKm: 5100,
    strategicImportanceBn: 'ইউসুফ বিন তাশফিন কর্তৃক সম্মিলিত ক্রুসেডার বাহিনীকে পরাস্ত করে আন্দালুসকে আরও ৪০০ বছর টিকিয়ে রাখা।',
    modernSiteBn: 'সাক্রাজাস প্রান্তর, বাদাখোস, স্পেন',
  },
  alarcos: {
    warId: 'alarcos',
    nameBn: 'আর্কের দুর্গ প্রান্তর',
    nameAr: 'حصن الأرك',
    lat: 38.9558,
    lng: -3.9928,
    zoom: 14,
    countryBn: 'স্পেন',
    regionBn: 'সিউদাদ রিয়াল, লা মাঞ্চা',
    terrainBn: 'গুয়াদিয়ানা নদীর উঁচু টিলা ও পাথুরে কেল্লা',
    elevationMeters: 650,
    distanceFromMadinahKm: 4720,
    distanceFromMakkahKm: 4970,
    strategicImportanceBn: 'আলমোহাদ খলিফা আল-মনসুর কর্তৃক কাস্তিলের রাজা আলফোনসোর দম্ভ চূর্ণ করার দুর্গ।',
    modernSiteBn: 'আর্কের প্রত্নতাত্ত্বিক পার্ক, স্পেন',
  },
  las_navas: {
    warId: 'las_navas',
    nameBn: 'লাস নাভাস ডি টোলোসা গিরিপথ',
    nameAr: 'ممر العقاب (الأندلس)',
    lat: 38.3392,
    lng: -3.5483,
    zoom: 13,
    countryBn: 'স্পেন',
    regionBn: 'সিয়েরা মোরেনা পর্বতমালা, জেন',
    terrainBn: 'দুর্গম খাড়া পাহাড়ি গিরিপথ ও গভীর গিরিখাত',
    elevationMeters: 800,
    distanceFromMadinahKm: 4680,
    distanceFromMakkahKm: 4930,
    strategicImportanceBn: 'আন্দালুসের প্রবেশের প্রধান পাহাড়ি সুরঙ্গ ও ভাগ্যের মোড় ঘুরিয়ে দেওয়া যুদ্ধ।',
    modernSiteBn: 'সান্তা এলেনা, লাস নাভাস ডি টোলোসা স্মৃতিস্তম্ভ',
  },
  gaza_palestine_resistance: {
    warId: 'gaza_palestine_resistance',
    nameBn: 'পবিত্র আল-কুদস ও ফিলিস্তিন ভূখণ্ড',
    nameAr: 'القدس الشريف وغزة العزة',
    lat: 31.7767,
    lng: 35.2345,
    zoom: 15,
    countryBn: 'ফিলিস্তিন',
    regionBn: 'আল-কুদস (জেরুজালেম) ও গাজা উপত্যকা',
    terrainBn: 'পবিত্র জয়তুন পর্বত, পাথুরে উপত্যকা ও ভূমধ্যসাগরীয় উপকূল',
    elevationMeters: 754,
    distanceFromMadinahKm: 920,
    distanceFromMakkahKm: 1350,
    strategicImportanceBn: 'প্রথম কিবলা বায়তুল মুকাদ্দাস, মিরাজের পুণ্যভূমি ও সমগ্র মুসলিম উম্মাহর ঈমানি দুর্গ।',
    modernSiteBn: 'মসজিদুল আকসা চত্বর ও সমগ্র ঐতিহাসিক ফিলিস্তিন ভূমি',
  },
};

type MapLayerType = 'satellite' | 'streets' | 'topo' | 'google_embed';

interface BattleLiveMapProps {
  war: WarItem;
  allWars?: WarItem[];
  isDay?: boolean;
  soundEnabled?: boolean;
  onSelectWar?: (warId: string) => void;
  onClose?: () => void;
  compact?: boolean;
}

export const BattleLiveMap: React.FC<BattleLiveMapProps> = ({
  war,
  allWars = [],
  isDay = false,
  soundEnabled = true,
  onSelectWar,
  onClose,
  compact = false,
}) => {
  const [activeWarId, setActiveWarId] = useState<string>(war.id);
  const [layerType, setLayerType] = useState<MapLayerType>('satellite');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const currentTileLayerRef = useRef<L.TileLayer | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  // Active Geo Location
  const geoInfo = useMemo(() => {
    return (
      BATTLE_GEO_DATA[activeWarId] ||
      BATTLE_GEO_DATA[war.id] || {
        warId: war.id,
        nameBn: war.locationBn || war.location || 'ঐতিহাসিক প্রান্তর',
        nameAr: war.nameAr,
        lat: 24.4672,
        lng: 39.6111,
        zoom: 14,
        countryBn: 'ঐতিহাসিক ইসলামি ভূখণ্ড',
        regionBn: war.locationBn || war.location || 'ঐতিহাসিক প্রান্তর',
        terrainBn: 'ঐতিহাসিক প্রান্তর',
        elevationMeters: 450,
        distanceFromMadinahKm: 0,
        distanceFromMakkahKm: 430,
        strategicImportanceBn: war.causeBn.slice(0, 100),
        modernSiteBn: war.locationBn || war.location || 'ঐতিহাসিক প্রান্তর',
      }
    );
  }, [activeWarId, war]);

  useEffect(() => {
    setActiveWarId(war.id);
  }, [war.id]);

  // Leaflet Tile URLs
  const getTileConfig = (type: MapLayerType) => {
    if (type === 'satellite') {
      return {
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attribution: '&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        maxZoom: 19,
      };
    } else if (type === 'topo') {
      return {
        url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
        attribution: 'Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap (CC-BY-SA)',
        maxZoom: 17,
      };
    } else {
      return {
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      };
    }
  };

  // Initialize and update Leaflet Map
  useEffect(() => {
    if (layerType === 'google_embed') return;
    const container = mapContainerRef.current;
    if (!container) return;

    if (!leafletMapRef.current) {
      // Create new Leaflet Map instance
      const map = L.map(container, {
        center: [geoInfo.lat, geoInfo.lng],
        zoom: geoInfo.zoom,
        zoomControl: false,
        attributionControl: false,
      });

      const tileConf = getTileConfig(layerType);
      const tileLayer = L.tileLayer(tileConf.url, {
        maxZoom: tileConf.maxZoom,
      }).addTo(map);

      currentTileLayerRef.current = tileLayer;

      // Custom Glowing Pulsing Marker
      const customIcon = L.divIcon({
        className: 'custom-battle-marker',
        html: `
          <div style="position: relative; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center;">
            <div style="position: absolute; inset: 0; border-radius: 50%; background: rgba(16, 185, 129, 0.4); animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
            <div style="position: absolute; width: 26px; height: 26px; border-radius: 50%; background: #005a3e; border: 2.5px solid #fbbf24; box-shadow: 0 4px 10px rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; color: white; font-size: 13px;">
              📍
            </div>
          </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 17],
        popupAnchor: [0, -18],
      });

      const marker = L.marker([geoInfo.lat, geoInfo.lng], { icon: customIcon }).addTo(map);
      marker.bindPopup(`
        <div style="font-family: inherit; font-size: 12px; color: #0f172a; min-width: 170px;">
          <strong style="color: #047857; font-size: 13px; display: block; margin-bottom: 2px;">${geoInfo.nameBn}</strong>
          <span style="color: #64748b; font-size: 11px; display: block;">${geoInfo.regionBn}, ${geoInfo.countryBn}</span>
          <div style="margin-top: 6px; padding-top: 4px; border-top: 1px solid #e2e8f0; font-size: 10px; color: #475569;">
            📍 জিপিএস: ${geoInfo.lat.toFixed(4)}°, ${geoInfo.lng.toFixed(4)}°
          </div>
        </div>
      `);
      markerRef.current = marker;

      leafletMapRef.current = map;
    } else {
      const map = leafletMapRef.current;
      map.flyTo([geoInfo.lat, geoInfo.lng], geoInfo.zoom, {
        duration: 1.2,
      });

      if (markerRef.current) {
        markerRef.current.setLatLng([geoInfo.lat, geoInfo.lng]);
        markerRef.current.setPopupContent(`
          <div style="font-family: inherit; font-size: 12px; color: #0f172a; min-width: 170px;">
            <strong style="color: #047857; font-size: 13px; display: block; margin-bottom: 2px;">${geoInfo.nameBn}</strong>
            <span style="color: #64748b; font-size: 11px; display: block;">${geoInfo.regionBn}, ${geoInfo.countryBn}</span>
            <div style="margin-top: 6px; padding-top: 4px; border-top: 1px solid #e2e8f0; font-size: 10px; color: #475569;">
              📍 জিপিএস: ${geoInfo.lat.toFixed(4)}°, ${geoInfo.lng.toFixed(4)}°
            </div>
          </div>
        `);
      }
    }

    // Force map to re-evaluate dimensions
    const resizeTimeout = setTimeout(() => {
      if (leafletMapRef.current) {
        leafletMapRef.current.invalidateSize();
      }
    }, 150);

    return () => clearTimeout(resizeTimeout);
  }, [geoInfo, layerType]);

  // Handle tile switch
  useEffect(() => {
    if (layerType === 'google_embed' || !leafletMapRef.current) return;
    const map = leafletMapRef.current;

    if (currentTileLayerRef.current) {
      map.removeLayer(currentTileLayerRef.current);
    }

    const tileConf = getTileConfig(layerType);
    const newTile = L.tileLayer(tileConf.url, {
      maxZoom: tileConf.maxZoom,
    }).addTo(map);

    currentTileLayerRef.current = newTile;
  }, [layerType]);

  // Clean up Leaflet on unmount
  useEffect(() => {
    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, []);

  const handleZoom = (direction: 'in' | 'out') => {
    if (!leafletMapRef.current) return;
    if (soundEnabled) soundHaptics.playTap();
    if (direction === 'in') {
      leafletMapRef.current.zoomIn();
    } else {
      leafletMapRef.current.zoomOut();
    }
  };

  const handleRecenter = () => {
    if (!leafletMapRef.current) return;
    if (soundEnabled) soundHaptics.playTap();
    leafletMapRef.current.flyTo([geoInfo.lat, geoInfo.lng], geoInfo.zoom, { duration: 1 });
    if (markerRef.current) {
      markerRef.current.openPopup();
    }
  };

  // Google Maps Direct Links
  const googleMapsAppUrl = `https://www.google.com/maps/search/?api=1&query=${geoInfo.lat},${geoInfo.lng}`;
  // Google Maps Embed URL for satellite mode
  const googleEmbedUrl = `https://maps.google.com/maps?q=${geoInfo.lat},${geoInfo.lng}&hl=bn&z=${geoInfo.zoom}&t=k&output=embed`;

  return (
    <div
      className={`rounded-3xl border shadow-2xl overflow-hidden transition-all duration-300 ${
        isDay
          ? 'bg-gradient-to-br from-emerald-50 via-white to-amber-50/60 border-emerald-300 text-slate-900'
          : 'bg-gradient-to-br from-[#061b20] via-[#09262e] to-[#041217] border-emerald-500/35 text-white'
      } ${isFullscreen ? 'fixed inset-2 sm:inset-5 z-50 flex flex-col p-3 sm:p-5' : 'p-3.5 sm:p-5 space-y-4'}`}
    >
      {/* 1. Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-emerald-500/20 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-2xl bg-emerald-600 text-white shadow-md">
            <MapPin className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm sm:text-base font-black text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                <span>{war.nameBn}</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/30">
                  সরাসরি লাইভ ম্যাপ
                </span>
              </h3>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 flex items-center gap-1 mt-0.5">
              <span className="font-bold text-emerald-800 dark:text-emerald-200">{geoInfo.nameBn}</span>
              <span className="opacity-75 font-medium">({geoInfo.regionBn}, {geoInfo.countryBn})</span>
            </p>
          </div>
        </div>

        {/* Layer Mode Switcher & Controls */}
        <div className="flex items-center gap-1.5 self-end sm:self-auto flex-wrap">
          <div className="p-1 rounded-xl bg-slate-200 dark:bg-black/40 border border-slate-300 dark:border-white/10 flex items-center gap-1 text-xs">
            <button
              onClick={() => {
                setLayerType('satellite');
                if (soundEnabled) soundHaptics.playTap();
              }}
              className={`px-2.5 py-1 rounded-lg font-bold transition flex items-center gap-1 cursor-pointer ${
                layerType === 'satellite'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-emerald-600'
              }`}
              title="বাস্তব স্যাটেলাইট ছবি"
            >
              <Satellite className="w-3.5 h-3.5" />
              <span>স্যাটেলাইট</span>
            </button>

            <button
              onClick={() => {
                setLayerType('streets');
                if (soundEnabled) soundHaptics.playTap();
              }}
              className={`px-2.5 py-1 rounded-lg font-bold transition flex items-center gap-1 cursor-pointer ${
                layerType === 'streets'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-emerald-600'
              }`}
              title="রাস্তাঘাট ও স্থান"
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>স্ট্রিট</span>
            </button>

            <button
              onClick={() => {
                setLayerType('google_embed');
                if (soundEnabled) soundHaptics.playTap();
              }}
              className={`px-2.5 py-1 rounded-lg font-bold transition flex items-center gap-1 cursor-pointer ${
                layerType === 'google_embed'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-emerald-600'
              }`}
              title="গুগল ম্যাপস লাইভ ভিউ"
            >
              <Globe2 className="w-3.5 h-3.5 text-amber-400" />
              <span>গুগল ম্যাপস</span>
            </button>
          </div>

          <a
            href={googleMapsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 px-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 transition shadow-sm"
            title="গুগল ম্যাপস অ্যাপে সরাসরি খুলুন"
          >
            <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline text-[11px]">অ্যাপে খুলুন</span>
          </a>

          <button
            onClick={() => {
              setIsFullscreen(!isFullscreen);
              if (soundEnabled) soundHaptics.playTap();
            }}
            className="p-1.5 rounded-xl bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-800 dark:text-white transition cursor-pointer"
            title={isFullscreen ? 'ছোট করুন' : 'সম্পূর্ণ স্ক্রিন'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/30 text-rose-600 dark:text-rose-400 transition cursor-pointer"
              title="বন্ধ করুন"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Direct Live Map Display Viewport */}
      <div className="relative w-full rounded-2xl overflow-hidden border border-emerald-500/30 shadow-inner flex-1 min-h-[260px] sm:min-h-[340px] bg-slate-900">
        {/* Mode A: Direct Google Maps Live Satellite Embed */}
        {layerType === 'google_embed' ? (
          <iframe
            title={`${geoInfo.nameBn} Google Maps`}
            src={googleEmbedUrl}
            className="w-full h-full min-h-[320px] sm:min-h-[380px] border-0 block"
            loading="lazy"
            allowFullScreen
          />
        ) : (
          /* Mode B: Leaflet Live Satellite / OpenStreetMap View */
          <div
            ref={mapContainerRef}
            className="w-full h-full min-h-[260px] sm:min-h-[340px] z-10 block"
          />
        )}

        {/* Floating Top Coordinate Pill */}
        <div className="absolute top-3 left-3 z-20 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-[11px] font-mono text-emerald-300 flex items-center gap-2 shadow-lg">
          <Navigation className="w-3.5 h-3.5 text-amber-400 rotate-45" />
          <span>
            {geoInfo.lat.toFixed(4)}° N, {geoInfo.lng.toFixed(4)}° E
          </span>
          <span className="text-white/40">|</span>
          <span className="text-amber-300 font-sans font-bold">উচ্চতা: {geoInfo.elevationMeters} মি.</span>
        </div>

        {/* Floating Right Map Zoom & Recenter Controls (Leaflet mode) */}
        {layerType !== 'google_embed' && (
          <div className="absolute bottom-3 right-3 z-20 flex flex-col gap-1.5 bg-black/80 backdrop-blur-md p-1 rounded-2xl border border-white/20 shadow-xl">
            <button
              onClick={() => handleZoom('in')}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/25 text-white active:scale-95 transition cursor-pointer"
              title="জুম ইন (+)"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleZoom('out')}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/25 text-white active:scale-95 transition cursor-pointer"
              title="জুম আউট (-)"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleRecenter}
              className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white active:scale-95 transition cursor-pointer"
              title="যুদ্ধক্ষেত্রের পিনে ফিরে যান"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Floating Bottom Left Attribution Hint */}
        <div className="absolute bottom-3 left-3 z-20 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-[10px] text-slate-300 flex items-center gap-1.5">
          <span>🛰️</span>
          <span>সরাসরি লাইভ স্যাটেলাইট মানচিত্র • স্পর্শ করে যেকোনো দিকে সরান ও জুম করুন</span>
        </div>
      </div>

      {/* 3. Detailed Geographic Intelligence Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 text-xs">
        {/* ক. ভৌগোলিক অবস্থান ও দেশ */}
        <div
          className={`p-3 rounded-2xl border space-y-1 ${
            isDay ? 'bg-white border-emerald-200' : 'bg-white/5 border-white/10'
          }`}
        >
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block uppercase tracking-wider flex items-center gap-1">
            <MapPin className="w-3 h-3 text-emerald-500" />
            <span>অবস্থান ও দেশ:</span>
          </span>
          <p className="font-bold text-slate-900 dark:text-slate-100">{geoInfo.regionBn}</p>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-300 font-semibold">{geoInfo.countryBn}</p>
        </div>

        {/* খ. ভূ-প্রকৃতি ও অঞ্চল */}
        <div
          className={`p-3 rounded-2xl border space-y-1 ${
            isDay ? 'bg-white border-emerald-200' : 'bg-white/5 border-white/10'
          }`}
        >
          <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold block uppercase tracking-wider flex items-center gap-1">
            <Compass className="w-3 h-3 text-amber-500" />
            <span>ভূ-প্রকৃতি ও মাটির ধরন:</span>
          </span>
          <p className="font-medium text-slate-700 dark:text-slate-200 line-clamp-2 leading-tight">
            {geoInfo.terrainBn}
          </p>
        </div>

        {/* গ. মক্কা ও মদিনা থেকে দূরত্ব */}
        <div
          className={`p-3 rounded-2xl border space-y-1 ${
            isDay ? 'bg-white border-emerald-200' : 'bg-white/5 border-white/10'
          }`}
        >
          <span className="text-[10px] text-teal-600 dark:text-teal-400 font-bold block uppercase tracking-wider flex items-center gap-1">
            <Navigation className="w-3 h-3 text-teal-500" />
            <span>দূরত্ব (হারামাইন শরিফাইন):</span>
          </span>
          <div className="flex items-center justify-between text-[11px] text-slate-700 dark:text-slate-300">
            <span>মদিনা থেকে:</span>
            <strong className="text-amber-600 dark:text-amber-300 font-mono font-bold">
              {geoInfo.distanceFromMadinahKm} কিমি
            </strong>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-700 dark:text-slate-300">
            <span>মক্কা থেকে:</span>
            <strong className="text-emerald-600 dark:text-emerald-300 font-mono font-bold">
              {geoInfo.distanceFromMakkahKm} কিমি
            </strong>
          </div>
        </div>

        {/* ঘ. বর্তমান ঐতিহাসিক সাইট */}
        <div
          className={`p-3 rounded-2xl border space-y-1 ${
            isDay ? 'bg-white border-emerald-200' : 'bg-white/5 border-white/10'
          }`}
        >
          <span className="text-[10px] text-rose-600 dark:text-rose-400 font-bold block uppercase tracking-wider flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-rose-500" />
            <span>বর্তমান ঐতিহাসিক সাইট:</span>
          </span>
          <p className="font-bold text-slate-900 dark:text-slate-100 line-clamp-2 leading-tight">
            {geoInfo.modernSiteBn}
          </p>
        </div>
      </div>

      {/* 4. Strategic Military Importance */}
      <div
        className={`p-3.5 rounded-2xl border text-xs space-y-1.5 ${
          isDay
            ? 'bg-emerald-50/80 border-emerald-200 text-slate-800'
            : 'bg-emerald-500/10 border-emerald-500/20 text-slate-200'
        }`}
      >
        <strong className="text-emerald-700 dark:text-emerald-300 font-bold flex items-center gap-1.5">
          <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>এই স্থানটি নির্বাচনের ঐতিহাসিক ও সামরিক কৌশলগত গুরুত্ব:</span>
        </strong>
        <p className="leading-relaxed font-medium">{geoInfo.strategicImportanceBn}</p>
      </div>

      {/* 5. Quick Jumps: Other Historical Battle Sites */}
      {allWars.length > 0 && (
        <div className="space-y-1.5 pt-1">
          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            📍 অন্যান্য ঐতিহাসিক যুদ্ধক্ষেত্রের লাইভ মানচিত্রে জাম্প করুন:
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {allWars.slice(0, 16).map((w) => {
              const isCurr = w.id === activeWarId;
              return (
                <button
                  key={w.id}
                  onClick={() => {
                    setActiveWarId(w.id);
                    if (onSelectWar) onSelectWar(w.id);
                    if (soundEnabled) soundHaptics.playTap();
                  }}
                  className={`px-3 py-1 rounded-xl text-[11px] font-bold whitespace-nowrap border transition active:scale-95 cursor-pointer ${
                    isCurr
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-md font-black'
                      : isDay
                      ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  📍 {w.nameBn}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

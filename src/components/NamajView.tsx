import React, { useState, useMemo } from 'react';
import { ThemeMode, ZikrLanguage } from '../types';
import { soundHaptics } from '../utils/audioHaptics';
import { ALL_PRAYER_DETAILS, PrayerDetailedInfo } from '../data/prayerDetailsData';
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Heart,
  Info,
  Layers,
  Moon,
  Sparkles,
  Sun,
  Sunrise,
  Sunset,
  Volume2,
  RotateCcw,
  Plus,
  Minus,
  AlertCircle,
  HelpCircle,
  Award,
} from 'lucide-react';

interface NamajViewProps {
  soundEnabled: boolean;
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
  onNavigateToSalatTime?: () => void;
}

type NamajTab = 'five_fard' | 'rules_steps' | 'nafl_prayers' | 'prayer_duas' | 'qaza_tracker';

interface EssentialDua {
  id: string;
  titleBn: string;
  arabic: string;
  transliterationBn: string;
  meaningBn: string;
  contextBn: string;
  referenceBn: string;
}

const ESSENTIAL_DUAS: EssentialDua[] = [
  {
    id: 'sana',
    titleBn: 'ছানা (নামাজের শুরুতেই পড়ার দোয়া)',
    arabic: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَى جَدُّكَ وَلَا إِلَهَ غَيْرُكَ',
    transliterationBn: 'সুবহানাকা আল্লাহুম্মা ওয়া বিহামদিকা, ওয়া তাবারাকাসমুকা, ওয়া তা‘আলা জাদ্দুকা, ওয়া লা ইলাহা গাইরুকা।',
    meaningBn: 'হে আল্লাহ! আমি আপনার পবিত্রতা ঘোষণা করছি ও আপনার প্রশংসা করছি। আপনার নাম বরকতময়, আপনার মাহাত্ম্য সর্বোচ্চ এবং আপনি ব্যতীত কোনো সত্য মাবুদ নেই।',
    contextBn: 'তাকবীরে তাহরীমার পর হাত বেঁধে সূরা ফাতিহার পূর্বে পড়া সুন্নতে মুয়াক্কাদাহ।',
    referenceBn: 'সুনানে তিরমিজি ২৪৩, আবু দাউদ ৭৭৫',
  },
  {
    id: 'ruku_tasbeeh',
    titleBn: 'রুকুর তাসবীহ',
    arabic: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ',
    transliterationBn: 'সুবহানা রাব্বিয়াল আজীম।',
    meaningBn: 'আমার মহান প্রতিপালকের পবিত্রতা ও মহিমা ঘোষণা করছি।',
    contextBn: 'রুকু অবস্থায় ন্যূনতম ৩ বার, ৫ বার বা ৭ বার পড়া সুন্নত।',
    referenceBn: 'সহীহ মুসলিম ৭৭২',
  },
  {
    id: 'sami_allah',
    titleBn: 'রুকু থেকে সোজা হওয়ার দোয়া (কওমা)',
    arabic: 'سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ • رَبَّنَا لَكَ الْحَمْدُ حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ',
    transliterationBn: 'সামি‘আল্লাহু লিমান হামিদাহ • রাব্বানা লাকাল হামদ, হামদান কাসীরান তাইয়িবান মুবারাকান ফীহ।',
    meaningBn: 'আল্লাহ শোনেন যে তাঁর প্রশংসা করে • হে আমাদের রব! সকল প্রশংসা একমাত্র আপনারই—অঢেল, পবিত্র ও বরকতপূর্ণ প্রশংসা।',
    contextBn: 'ইমাম ও একাকী নামাজী রুকু থেকে ওঠার সময় প্রথম অংশ এবং সোজা হয়ে দাঁড়িয়ে দ্বিতীয় অংশ বলবে।',
    referenceBn: 'সহীহ বুখারী ৭৯৯',
  },
  {
    id: 'sajdah_tasbeeh',
    titleBn: 'সিজদার তাসবীহ',
    arabic: 'سُبْحَانَ رَبِّيَ الأَعْلَى',
    transliterationBn: 'সুবহানা রাব্বিয়াল আ‘লা।',
    meaningBn: 'আমার সর্বশ্রেষ্ঠ সর্বোচ্চ প্রতিপালকের পবিত্রতা ও প্রশংসা করছি।',
    contextBn: 'প্রতিটি সিজদায় ন্যূনতম ৩ বার, ৫ বার বা ৭ বার পড়া সুন্নত। বান্দা সিজদায় আল্লাহর সবচেয়ে নিকটবর্তী হয়।',
    referenceBn: 'সহীহ মুসলিম ৭৭২',
  },
  {
    id: 'between_sajdah',
    titleBn: 'দুই সিজদার মাঝখানের দোয়া',
    arabic: 'اللَّهُمَّ اغْفِرْ لِي وَارْحَمْنِي وَاهْدِنِي وَعَافِنِي وَارْزُقْنِي',
    transliterationBn: 'আল্লাহুম্মাগফির লী, ওয়ারহামনী, ওয়াহদিনী, ওয়া ‘আফিনী, ওয়ারযুক্বনী।',
    meaningBn: 'হে আল্লাহ! আমাকে ক্ষমা করুন, আমার উপর দয়া করুন, আমাকে সঠিক পথে পরিচালিত করুন, আমাকে সুস্থতা ও নিরাপত্তা দিন এবং আমাকে জীবিকা দান করুন।',
    contextBn: 'প্রথম সিজদা শেষ করে সোজা হয়ে শান্তভাবে বসে দ্বিতীয় সিজদায় যাওয়ার পূর্বে পড়া সুন্নত।',
    referenceBn: 'আবু দাউদ ৮৫০, তিরমিজি ২৮৪',
  },
  {
    id: 'tashahhud',
    titleBn: 'তাশাহহুদ (আত্তাহিয়্যাতু)',
    arabic: 'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلاَمُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلاَمُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
    transliterationBn: 'আত্তাহিয়্যাতু লিল্লাহি ওয়াস-সালাওয়াতু ওয়াত-ত্বাইয়্যিবাতু, আসসালামু আলাইকা আইয়্যুহান-নাবিয়্যু ওয়া রাহমাতুল্লাহি ওয়া বারাকাতুহু, আসসালামু আলাইনা ওয়া আলা ইবাদিল্লাহিস-সালিহীন। আশহাদু আল-লা ইলাহা ইল্লাল্লাহু ওয়া আশহাদু আন্না মুহাম্মাদান আবদুহু ওয়া রাসুলুহু।',
    meaningBn: 'সকল মৌখিক, শারীরিক ও আর্থিক ইবাদত একমাত্র আল্লাহর জন্য। হে নবী! আপনার উপর আল্লাহর শান্তি, রহমত ও বরকত বর্ষিত হোক। আমাদের উপর এবং আল্লাহর সৎ বান্দাদের উপর শান্তি বর্ষিত হোক। আমি সাক্ষ্য দিচ্ছি যে আল্লাহ ছাড়া কোনো সত্য মাবুদ নেই এবং আমি আরও সাক্ষ্য দিচ্ছি মুহাম্মদ (সা.) আল্লাহর বান্দা ও রাসুল।',
    contextBn: 'নামাজের প্রত্যেক বৈঠকেই (প্রথম ও শেষ বৈঠক) পড়া ওয়াজিব।',
    referenceBn: 'সহীহ বুখারী ১২০২, মুসলিম ৪০২',
  },
  {
    id: 'darood_ibrahim',
    titleBn: 'দরূদে ইবরাহিম',
    arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ • اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ',
    transliterationBn: 'আল্লাহুম্মা সাল্লি আলা মুহাম্মাদিঁও ওয়া আলা আলি মুহাম্মাদ, কামা সাল্লাইতা আলা ইবরাহিমা ওয়া আলা আলি ইবরাহিম, ইন্নাকা হামিদুম মাজীদ। আল্লাহুম্মা বারিক আলা মুহাম্মাদিঁও ওয়া আলা আলি মুহাম্মাদ, কামা বারাকতা আলা ইবরাহিমা ওয়া আলা আলি ইবরাহিম, ইন্নাকা হামিদুম মাজীদ।',
    meaningBn: 'হে আল্লাহ! আপনি মুহাম্মদ (সা.) এবং তাঁর বংশধরদের উপর রহমত বর্ষণ করুন, যেমন আপনি ইবরাহিম (আ.) এবং তাঁর বংশধরদের উপর রহমত বর্ষণ করেছিলেন। নিশ্চয়ই আপনি প্রশংসিত ও মহিমান্বিত। হে আল্লাহ! আপনি মুহাম্মদ (সা.) এবং তাঁর বংশধরদের উপর বরকত দান করুন, যেমন আপনি ইবরাহিম (আ.) এবং তাঁর বংশধরদের উপর বরকত দান করেছিলেন। নিশ্চয়ই আপনি প্রশংসিত ও মহিমান্বিত।',
    contextBn: 'নামাজের শেষ বৈঠকে তাশাহহুদের পর পড়া সুন্নতে মুয়াক্কাদাহ।',
    referenceBn: 'সহীহ বুখারী ৩৩৭০, মুসলিম ৪০৫',
  },
  {
    id: 'dua_masura',
    titleBn: 'দোআয়ে মাসূরা',
    arabic: 'اللَّهُمَّ إِنِّي ظَلَمْتُ نَفْسِي ظُلْمًا كَثِيرًا، وَلاَ يَغْفِرُ الذُّنُوبَ إِلاَّ أَنْتَ، فَاغْفِرْ لِي مَغْفِرَةً مِنْ عِنْدِكَ، وَارْحَمْنِي إِنَّكَ أَنْتَ الْغَفُورُ الرَّحِيمُ',
    transliterationBn: 'আল্লাহুম্মা ইন্নী যালামতু নাফসী জুলমান কাসীরাঁও, ওয়ালা ইয়াগফিরুজ-জুনুবা ইল্লা আনতা, ফাগফির লী মাগফিরাতাম-মিন ইন্দিকা, ওয়ারহামনী, ইন্নাকা আনতাল গাফুরুর রাহীম।',
    meaningBn: 'হে আল্লাহ! আমি আমার নিজের ওপর সীমাহীন জুলুম করেছি। আর আপনি ছাড়া গুনাহ মাফ করার কেউ নেই। অতএব আপনার পক্ষ থেকে বিশেষ ক্ষমার মাধ্যমে আমাকে ক্ষমা করে দিন এবং আমার প্রতি দয়া করুন। নিশ্চয় আপনি অতীব ক্ষমাশীল ও দয়াবান।',
    contextBn: 'শেষ বৈঠকে দরূদ শরিফের পর সালাম ফেরানোর পূর্বে পড়া সুন্নত।',
    referenceBn: 'সহীহ বুখারী ৮৩৪, মুসলিম ২৭০৫',
  },
  {
    id: 'dua_qunoot',
    titleBn: 'দোআয়ে কুনূত (বিতরের নামাজের দোয়া)',
    arabic: 'اللَّهُمَّ إِنَّا نَسْتَعِينُكَ وَنَسْتَغْفِرُكَ وَنُؤْمِنُ بِكَ وَنَتَوَكَّلُ عَلَيْكَ وَنُثْنِي عَلَيْكَ الْخَيْرَ وَنَشْكُرُكَ وَلا نَكْفُرُكَ وَنَخْلَعُ وَنَتْرُكُ مَنْ يَفْجُرُكَ • اللَّهُمَّ إِيَّاكَ نَعْبُدُ وَلَكَ نُصَلِّي وَنَسْجُدُ وَإِلَيْكَ نَسْعَى وَنَحْفِدُ وَنَرْجُو رَحْمَتَكَ وَنَخْشَى عَذَابَكَ إِنَّ عَذَابَكَ بِالْكُفَّارِ مُلْحِقٌ',
    transliterationBn: 'আল্লাহুম্মা ইন্না নাসতাঈনুকা ওয়া নাসতাগফিরুকা ওয়া নু’মিনু বিকা ওয়া নাতাওয়াক্কালু আলাইকা ওয়া নুছনি আলাইকাল খাইর, ওয়া নাশ কুরুকা ওয়ালা নাকফুরুকা ওয়া নাখলাউ ওয়া নাতরুকু মাইঁইয়াফজুরুক। আল্লাহুম্মা ইয়্যাকা না’বুদু ওয়া লাকা নুসল্লি ওয়া নাসজুদু ওয়া ইলাইকা নাস’আ ওয়া নাহফিদু ওয়া নারজু রাহমাতাকা ওয়া নাখশা আজাবাক, ইন্না আজাবাকা বিলকুফ্ফারি মুলহিক।',
    meaningBn: 'হে আল্লাহ! আমরা আপনারই সাহায্য চাই, আপনারই কাছে ক্ষমা প্রার্থনা করি, আপনার প্রতি বিশ্বাস স্থাপন করি, আপনার ওপর ভরসা রাখি এবং আপনার উত্তম প্রশংসা করি। আমরা আপনার কৃতজ্ঞতা স্বীকার করি, অকৃতজ্ঞ হই না। এবং যারা আপনার অবাধ্য হয় তাদেরকে পরিত্যাগ করি। হে আল্লাহ! আমরা কেবল আপনারই ইবাদত করি, আপনারই উদ্দেশ্যে সালাত আদায় করি এবং সিজদা করি। আমরা আপনার সন্তুষ্টি অর্জনে সচেষ্ট হই। আমরা আপনার রহমতের আশা করি এবং আপনার শাস্তিকে ভয় করি; নিশ্চয় আপনার শাস্তি কাফেরদের ওপর আপতিত হবে।',
    contextBn: 'এশার নামাজের পর তিন রাকাত বিতর নামাজের ৩য় রাকাতে সূরা ফাতিহা ও অন্য সূরা মিলিয়ে আল্লাহু আকবার বলে হাত কান পর্যন্ত উঠিয়ে পুনরায় হাত বেঁধে পড়া ওয়াজিব।',
    referenceBn: 'ইবনু আবি শাইবাহ ৬৯৬৫, বায়হাকী',
  },
];

interface PrayerStep {
  stepNumber: number;
  titleBn: string;
  actionBn: string;
  recitationBn: string;
  tipBn: string;
}

const PRAYER_STEPS: PrayerStep[] = [
  {
    stepNumber: 1,
    titleBn: 'কিবলামুখী হয়ে নিয়ত ও তাকবীরে তাহরীমা',
    actionBn: 'পবিত্র পোশাকে অজু অবস্থায় কিবলার দিকে সোজা হয়ে দাঁড়াবেন (কিয়াম)। দু’পায়ের মাঝে স্বাভাবিক ফাঁকা রাখবেন।',
    recitationBn: 'মনে মনে যে ওয়াক্তের নামাজ পড়ছেন তার নিয়ত করবেন। এরপর উভয় হাত কান বরাবর (মহিলারা কাঁধ বরাবর) উঠিয়ে বলবেন: "আল্লাহু আকবার"।',
    tipBn: 'তাকবীরে তাহরীমার মাধ্যমে দুনিয়ার সকল কথা ও কাজ হারাম হয়ে নামাজের ভেতরে প্রবেশ ঘটে।',
  },
  {
    stepNumber: 2,
    titleBn: 'হাত বাঁধা ও ছানা পাঠ',
    actionBn: 'নাভির ওপর (বা বুকের ওপর) ডান হাতের তালু বাম হাতের পিঠের ওপর রেখে কব্জি জড়িয়ে ধরবেন। দৃষ্টি সিজদার জায়গায় রাখবেন।',
    recitationBn: 'প্রথমে ছানা পাঠ করবেন: "সুবহানাকা আল্লাহুম্মা ওয়া বিহামদিকা..."। এরপর আউজুবিল্লাহ ও বিসমিল্লাহ পড়বেন।',
    tipBn: 'নামাজে ডানে-বামে বা আকাশের দিকে তাকানো নিষেধ; দৃষ্টি সার্বক্ষণিক সিজদার স্থানে নিবদ্ধ রাখুন।',
  },
  {
    stepNumber: 3,
    titleBn: 'সূরা ফাতিহা ও কিরাত পাঠ',
    actionBn: 'স্থিরভাবে দাঁড়িয়ে স্পষ্ট ও সুন্দর উচ্চারণে কিরাত তিলাওয়াত করবেন।',
    recitationBn: 'সূরা ফাতিহা পাঠ করবেন এবং শেষে আস্তে বা স্পষ্ট স্বরে "আমীন" বলবেন। এরপর কোরআনের যেকোনো একটি সূরা বা অন্তত ৩টি ছোট আয়াত তিলাওয়াত করবেন।',
    tipBn: 'লা সালাতা লিমান লাম ইয়াকরা’ বিফাতিহাতিল কিতাব — সূরা ফাতিহা ছাড়া নামাজ হয় না (সহীহ বুখারী)।',
  },
  {
    stepNumber: 4,
    titleBn: 'রুকু ও রুকুর তাসবীহ',
    actionBn: '"আল্লাহু আকবার" বলে রুকুতে যাবেন। পিঠ সমান্তরাল সোজা রাখবেন যাতে পিঠের ওপর পানির পাত্র রাখলে স্থির থাকে। দুই হাত দিয়ে দুই হাঁটু শক্তভাবে আঁকড়ে ধরবেন।',
    recitationBn: 'রুকু অবস্থায় শান্ত হয়ে অন্তত ৩ বার বলবেন: "সুবহানা রাব্বিয়াল আজীম" (আমার মহান রবের পবিত্রতা ঘোষণা করছি)।',
    tipBn: 'রুকুতে তাড়াহুড়া করবেন না। প্রতিটি অঙ্গ স্থির না হওয়া পর্যন্ত তাসবীহ পাঠ সম্পূর্ণ করুন।',
  },
  {
    stepNumber: 5,
    titleBn: 'কওমা (রুকু থেকে সোজা হয়ে দাঁড়ানো)',
    actionBn: '"সামিআল্লাহু লিমান হামিদাহ" বলতে বলতে রুকু থেকে একেবারে সোজা হয়ে শান্তভাবে দাঁড়াবেন।',
    recitationBn: 'সোজা হয়ে দাঁড়িয়ে বলবেন: "রাব্বানা লাকাল হামদ, হামদান কাসীরান তাইয়িবান মুবারাকান ফীহ"।',
    tipBn: 'রুকু থেকে সোজা হয়ে স্থির হয়ে দাঁড়ানো ওয়াজিব। অনেকে সোজা হওয়ার আগেই সিজদায় চলে যান, এতে নামাজ বিনষ্ট হতে পারে।',
  },
  {
    stepNumber: 6,
    titleBn: 'প্রথম সিজদা ও তাসবীহ',
    actionBn: '"আল্লাহু আকবার" বলে সিজদায় যাবেন। প্রথমে দুই হাঁটু, তারপর দুই হাত, এরপর নাক ও কপাল মাটিতে রাখবেন। হাত থাকবে কাঁধ বরাবর।',
    recitationBn: 'সিজদায় শান্ত হয়ে অন্তত ৩ বার বলবেন: "সুবহানা রাব্বিয়াল আ‘লা" (আমার সর্বোচ্চ রবের পবিত্রতা ঘোষণা করছি)।',
    tipBn: 'সিজদার সময় পায়ের উভয় পাতার আঙুলসমূহ কিবলামুখী রাখা সুন্নাত। বান্দা সিজদাতেই আল্লাহর সবচেয়ে বেশি নৈকট্য পায়।',
  },
  {
    stepNumber: 7,
    titleBn: 'দুই সিজদার মাঝখানের বৈঠক (জলসা)',
    actionBn: '"আল্লাহু আকবার" বলে সিজদা থেকে উঠে বাম পা বিছিয়ে তার ওপর বসবেন এবং ডান পা খাড়া রাখবেন (ইফতিরাশ)। দুই হাত উরুর ওপর রাখবেন।',
    recitationBn: 'সোজা হয়ে বসে শান্তভাবে দোয়া পড়বেন: "আল্লাহুম্মাগফির লী, ওয়ারহামনী, ওয়াহদিনী, ওয়া ‘আফিনী, ওয়ারযুক্বনী"।',
    tipBn: 'দুই সিজদার মাঝখানে অন্তত এক তাসবীহ পরিমাণ সোজা হয়ে স্থির বসে থাকা ওয়াজিব।',
  },
  {
    stepNumber: 8,
    titleBn: 'দ্বিতীয় সিজদা ও পরবর্তী রাকাত',
    actionBn: '"আল্লাহু আকবার" বলে দ্বিতীয় সিজদা করবেন এবং প্রথম সিজদার মতোই ৩ বার "সুবহানা রাব্বিয়াল আ‘লা" পড়বেন। এরপর দাঁড়িয়ে ২য় রাকাত শুরু করবেন।',
    recitationBn: 'দ্বিতীয় রাকাতে ছানা পড়তে হয় না; সরাসরি বিসমিল্লাহ বলে সূরা ফাতিহা ও অন্য সূরা মিলিয়ে রুকু-সিজদা সম্পন্ন করবেন।',
    tipBn: '২ রাকাত বিশিষ্ট নামাজে (যেমন ফজরের ফরজ) ২য় রাকাতের সিজদার পর শেষ বৈঠকে বসবেন।',
  },
  {
    stepNumber: 9,
    titleBn: 'বৈঠক, তাশাহহুদ ও দরূদ পাঠ',
    actionBn: '২ রাকাত পর (প্রথম বৈঠক) বা শেষ রাকাতে (শেষ বৈঠক) শান্ত হয়ে বসবেন।',
    recitationBn: 'প্রথমে "আত্তাহিয়্যাতু..." পড়বেন। "আশহাদু আল-লা ইলাহা" বলার সময় শাহাদাত আঙুল উঠিয়ে তাওহিদের সাক্ষ্য দেবেন এবং "ইল্লাল্লাহ" বলে নামাবেন। শেষ বৈঠকে দরূদে ইবরাহিম ও দোআয়ে মাসূরা পাঠ করবেন।',
    tipBn: 'শেষ বৈঠকে তাশাহহুদ পড়া ওয়াজিব এবং দরূদ ও দোআয়ে মাসূরা পড়া সুন্নতে মুয়াক্কাদাহ।',
  },
  {
    stepNumber: 10,
    titleBn: 'সালাম ফিরিয়ে নামাজ সমাপ্তকরণ',
    actionBn: 'প্রথমে মুখমণ্ডল ডানে ঘুরিয়ে দৃষ্টি কাঁধের ওপর রাখবেন এবং এরপর বামে ঘুরিয়ে দৃষ্টি কাঁধের ওপর রাখবেন।',
    recitationBn: 'ডানে ও বামে ফেরার সময় বলবেন: "আসসালামু আলাইকুম ওয়া রাহমাতুল্লাহ" (আপনাদের ওপর শান্তি ও আল্লাহর রহমত বর্ষিত হোক)।',
    tipBn: 'সালাম ফেরানোর পর ৩ বার "আস্তাগফিরুল্লাহ" এবং আয়াতুল কুরসি পাঠ করা অত্যন্ত ফজিলতপূর্ণ আমল।',
  },
];

interface DailyPrayerBreakdown {
  id: string;
  nameBn: string;
  totalRakats: number;
  breakdownBn: string;
  timeRangeBn: string;
  virtueBn: string;
}

const FIVE_PRAYERS_DATA: DailyPrayerBreakdown[] = [
  {
    id: 'Fajr',
    nameBn: 'ফজর নামাজ',
    totalRakats: 4,
    breakdownBn: '২ রাকাত সুন্নত (মুয়াক্কাদাহ) + ২ রাকাত ফরজ',
    timeRangeBn: 'সুবহে সাদিক (ভোর) হতে সূর্যোদয়ের পূর্ব পর্যন্ত',
    virtueBn: 'ফজরের দুই রাকাত সুন্নত দুনিয়া ও তার মধ্যকার সবকিছুর চেয়ে উত্তম (সহীহ মুসলিম ৭২৫)। যে ব্যক্তি ফজরের নামাজ পড়ল সে আল্লাহর জিম্মাদারিতে চলে গেল।',
  },
  {
    id: 'Dhuhr',
    nameBn: 'যোহর নামাজ',
    totalRakats: 12,
    breakdownBn: '৪ রাকাত সুন্নত (মুয়াক্কাদাহ) + ৪ রাকাত ফরজ + ২ রাকাত সুন্নত + ২ রাকাত নফল',
    timeRangeBn: 'দুপুরে সূর্য ঢলে পড়ার পর থেকে আসরের ওয়াক্ত পর্যন্ত',
    virtueBn: 'যোহরের পূর্বে ৪ রাকাত সুন্নতে আসমানের দরজাসমূহ খুলে দেওয়া হয় এবং আমল ওপরে ওঠে (তিরমিজি ৪৭৮)।',
  },
  {
    id: 'Asr',
    nameBn: 'আসর নামাজ',
    totalRakats: 8,
    breakdownBn: '৪ রাকাত সুন্নত (গায়রে মুয়াক্কাদাহ) + ৪ রাকাত ফরজ',
    timeRangeBn: 'যোহরের সময় শেষ হওয়ার পর থেকে সূর্য হলুদ বর্ণ ধারণের পূর্ব পর্যন্ত',
    virtueBn: 'যে ব্যক্তি আসরের নামাজ ইচ্ছাকৃতভাবে ছেড়ে দেয়, তার আমল বিনষ্ট হয়ে যায় (সহীহ বুখারী ৫৫৩)। আল্লাহ আসরের পূর্বে ৪ রাকাত নামাজ আদায়কারীর ওপর রহম করেন।',
  },
  {
    id: 'Maghrib',
    nameBn: 'মাগরিব নামাজ',
    totalRakats: 7,
    breakdownBn: '৩ রাকাত ফরজ + ২ রাকাত সুন্নত (মুয়াক্কাদাহ) + ২ রাকাত নফল (আউওয়াবীন)',
    timeRangeBn: 'সূর্যাস্তের পর থেকে পশ্চিমাকাশের লাল আভা মিলিয়ে যাওয়ার পূর্ব পর্যন্ত',
    virtueBn: 'মাগরিবের পর ৬ রাকাত আউওয়াবীন নামাজ আদায় করলে ১২ বছর ইবাদতের সমপরিমাণ সওয়াব পাওয়া যায় (তিরমিজি ৪৩৫)।',
  },
  {
    id: 'Isha',
    nameBn: 'এশার নামাজ ও বিতর',
    totalRakats: 17,
    breakdownBn: '৪ রাকাত সুন্নত + ৪ রাকাত ফরজ + ২ রাকাত সুন্নত + ৩ রাকাত বিতর (ওয়াজিব) + ২ রাকাত নফল',
    timeRangeBn: 'পশ্চিম আকাশের শুভ্রতা মিলিয়ে যাওয়া থেকে মধ্যরাত (বা ফজরের পূর্ব) পর্যন্ত',
    virtueBn: 'যে ব্যক্তি জামায়াতে এশার নামাজ আদায় করল, সে যেন অর্ধরাত পর্যন্ত নামাজ পড়ল; আর যে ফজরও জামায়াতে পড়ল, সে যেন সারা রাত নামাজ পড়ল (সহীহ মুসলিম ৬৫৬)।',
  },
  {
    id: 'Jummah',
    nameBn: 'জুমার নামাজ (শুক্রবার)',
    totalRakats: 14,
    breakdownBn: '৪ রাকাত কাবলাল জুমা + ২ রাকাত ফরজ (খুতবাসহ) + ৪ রাকাত বা’দাল জুমা + ২ রাকাত সুন্নত',
    timeRangeBn: 'শুক্রবারে যোহরের ওয়াক্তে খুতবার সাথে আদায় করতে হয়',
    virtueBn: 'শুক্রবার মুসলমানদের জন্য সাপ্তাহিক ঈদের দিন। সূরা কাহাফ পাঠ ও জুমার নামাজে পূর্বে গমনকারীদের প্রতিটি কদমে এক বছর নফল রোজা ও নামাজের সওয়াব অর্জিত হয়।',
  },
];

export const NamajView: React.FC<NamajViewProps> = ({
  soundEnabled,
  themeMode = 'day',
  selectedLanguage = 'bn',
  onNavigateToSalatTime,
}) => {
  const isDay = themeMode === 'day';
  const [activeTab, setActiveTab] = useState<NamajTab>('five_fard');
  const [expandedPrayerId, setExpandedPrayerId] = useState<string | null>('Fajr');
  const [expandedStep, setExpandedStep] = useState<number | null>(1);

  // Qaza Namaz Tracking State stored in localStorage
  const [qazaCounts, setQazaCounts] = useState<{
    fajr: number;
    dhuhr: number;
    asr: number;
    maghrib: number;
    isha: number;
    witr: number;
  }>(() => {
    try {
      const saved = localStorage.getItem('zikrmate_qaza_namaz_counts');
      if (saved) return JSON.parse(saved);
    } catch {}
    return { fajr: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0, witr: 0 };
  });

  const updateQaza = (prayer: keyof typeof qazaCounts, delta: number) => {
    if (soundEnabled) soundHaptics.playTap();
    setQazaCounts((prev) => {
      const nextVal = Math.max(0, (prev[prayer] || 0) + delta);
      const updated = { ...prev, [prayer]: nextVal };
      try {
        localStorage.setItem('zikrmate_qaza_namaz_counts', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const totalQaza = useMemo(() => {
    return Object.values(qazaCounts).reduce((a, b) => a + b, 0);
  }, [qazaCounts]);

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Top Banner / Hero */}
      <div
        className={`rounded-3xl p-5 sm:p-6 border shadow-sm transition-all relative overflow-hidden ${
          isDay
            ? 'bg-gradient-to-br from-emerald-800 via-[#006A4E] to-teal-900 text-white border-emerald-700/60'
            : 'bg-gradient-to-br from-[#042823] via-[#004e39] to-[#041a1c] text-white border-emerald-900/60'
        }`}
      >
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white/15 text-emerald-100 backdrop-blur-xs">
              <span>🕌</span>
              <span>নামাজ শিক্ষা ও পূর্ণাঙ্গ গাইড</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
              <span>নামাজের নিয়ম, দোয়া ও রাকাত সমূহ</span>
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-xl">
              ৫ ওয়াক্ত ফরজ ও নফল নামাজের নিয়ম, কিরাত, সহীহ হাদিস, সকল বৈঠকের দোয়া এবং কাজা নামাজের হিসাব।
            </p>
          </div>

          {onNavigateToSalatTime && (
            <button
              onClick={() => {
                if (soundEnabled) soundHaptics.playTap();
                onNavigateToSalatTime();
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white text-[#006A4E] font-bold text-xs sm:text-sm shadow-lg hover:bg-emerald-50 active:scale-95 transition cursor-pointer self-start sm:self-auto shrink-0"
            >
              <Clock className="w-4 h-4 text-[#006A4E]" />
              <span>আজকের সালাত টাইম দেখুন &gt;</span>
            </button>
          )}
        </div>
      </div>

      {/* Nav Tabs Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1 px-0.5">
        {[
          { id: 'five_fard', label: '৫ ওয়াক্ত নামাজ', icon: '🕌' },
          { id: 'rules_steps', label: 'নামাজ পড়ার নিয়ম', icon: '📖' },
          { id: 'prayer_duas', label: 'নামাজের সকল দোয়া', icon: '🤲' },
          { id: 'nafl_prayers', label: 'নফল ও সুন্নত', icon: '✨' },
          { id: 'qaza_tracker', label: 'কাজা ক্যালকুলেটর', icon: '📊' },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                if (soundEnabled) soundHaptics.playTap();
                setActiveTab(tab.id as NamajTab);
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all active:scale-95 cursor-pointer border ${
                isActive
                  ? 'bg-[#006A4E] text-white border-emerald-600 shadow-md'
                  : isDay
                  ? 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                  : 'bg-[#0a2327] hover:bg-[#12383e] text-emerald-200 border-[#153f47]'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.id === 'qaza_tracker' && totalQaza > 0 && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full font-mono bg-amber-400 text-slate-950 font-black">
                  {totalQaza}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: 5 Daily Prayers Breakdown */}
      {activeTab === 'five_fard' && (
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <h2 className={`text-sm sm:text-base font-bold ${isDay ? 'text-slate-800' : 'text-slate-100'}`}>
              দৈনন্দিন ৫ ওয়াক্ত নামাজের রাকাত ও সময়সীমা
            </h2>
            <span className="text-xs text-slate-500 font-medium">বিস্তারিত জানতে ক্লিক করুন</span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {FIVE_PRAYERS_DATA.map((prayer) => {
              const isExpanded = expandedPrayerId === prayer.id;
              const detailInfo: PrayerDetailedInfo | undefined = ALL_PRAYER_DETAILS[prayer.id];

              return (
                <div
                  key={prayer.id}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isDay
                      ? 'bg-white border-slate-200 shadow-xs hover:border-emerald-300'
                      : 'bg-[#0b2428] border-[#18454c] shadow-xs hover:border-emerald-700'
                  }`}
                >
                  <button
                    onClick={() => {
                      if (soundEnabled) soundHaptics.playTap();
                      setExpandedPrayerId(isExpanded ? null : prayer.id);
                    }}
                    className="w-full p-4 sm:p-5 flex items-start justify-between gap-3 text-left cursor-pointer transition hover:bg-emerald-50/20"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-base sm:text-lg">
                          {prayer.id === 'Fajr' ? '🌅' : prayer.id === 'Dhuhr' ? '☀️' : prayer.id === 'Asr' ? '🌤️' : prayer.id === 'Maghrib' ? '🌇' : '🌙'}
                        </span>
                        <h3 className={`text-base sm:text-lg font-black ${isDay ? 'text-slate-900' : 'text-white'}`}>
                          {prayer.nameBn}
                        </h3>
                        <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-[#006A4E]/10 text-[#006A4E] dark:bg-emerald-500/20 dark:text-emerald-300 border border-emerald-500/30">
                          মোট {prayer.totalRakats} রাকাত
                        </span>
                      </div>
                      <p className={`text-xs sm:text-sm font-semibold ${isDay ? 'text-slate-700' : 'text-emerald-100'}`}>
                        {prayer.breakdownBn}
                      </p>
                      <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                        ওয়াক্ত: {prayer.timeRangeBn}
                      </p>
                    </div>

                    <div className="p-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 shrink-0 mt-1">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div
                      className={`p-4 sm:p-5 pt-0 border-t space-y-4 animate-in fade-in duration-200 ${
                        isDay ? 'border-slate-100 bg-emerald-50/20' : 'border-[#153f47] bg-[#071d20]/50'
                      }`}
                    >
                      {/* Virtue box */}
                      <div className="rounded-xl p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs sm:text-sm leading-relaxed text-emerald-950 dark:text-emerald-200">
                        <div className="font-bold flex items-center gap-1.5 mb-1 text-[#006A4E] dark:text-emerald-400">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>ফজিলত ও গুরুত্ব:</span>
                        </div>
                        {prayer.virtueBn}
                      </div>

                      {/* Detailed rakats breakdown table */}
                      {detailInfo && detailInfo.rakatsBreakdown && (
                        <div className="space-y-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                            রাকাত সমূহের ধারাবাহিক বিন্যাস
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                            {detailInfo.rakatsBreakdown.map((r, idx) => (
                              <div
                                key={idx}
                                className={`p-2.5 rounded-xl border flex items-center justify-between ${
                                  r.type === 'Fard'
                                    ? 'bg-[#006A4E]/10 border-emerald-300 dark:border-emerald-800 font-bold text-[#006A4E] dark:text-emerald-300'
                                    : 'bg-white dark:bg-[#0a2327] border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                                }`}
                              >
                                <span>{r.typeBn}</span>
                                <span className="font-mono font-bold text-xs px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                                  {r.rakats} রাকাত
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Sahih Hadith & Quranic Ayat */}
                      {detailInfo && detailInfo.hadiths && detailInfo.hadiths[0] && (
                        <div className="p-3 rounded-xl bg-white dark:bg-[#082226] border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                          <div className="font-bold text-[#006A4E] dark:text-emerald-400 flex items-center gap-1">
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>সহীহ হাদিসের বর্ণনা:</span>
                          </div>
                          <p className="text-slate-700 dark:text-slate-200 italic leading-relaxed">
                            "{detailInfo.hadiths[0].textBn}"
                          </p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                            — {detailInfo.hadiths[0].bookBn} ({detailInfo.hadiths[0].gradeBn})
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: Step-by-Step Prayer Rules */}
      {activeTab === 'rules_steps' && (
        <div className="space-y-3.5">
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs sm:text-sm text-amber-950 dark:text-amber-200 leading-relaxed">
            <span className="font-bold">💡 রাসুলুল্লাহ (সা.) বলেছেন:</span> "তোমরা সেভাবে নামাজ আদায় করো, যেভাবে আমাকে নামাজ আদায় করতে দেখছো।" — সহীহ বুখারী ৬৩১। নিচে তাকবীরে তাহরিমা থেকে সালাম ফেরানো পর্যন্ত ধারাবাহিক ১০টি পদক্ষেপ দেওয়া হলো:
          </div>

          <div className="space-y-3">
            {PRAYER_STEPS.map((step) => {
              const isExpanded = expandedStep === step.stepNumber;
              return (
                <div
                  key={step.stepNumber}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isDay ? 'bg-white border-slate-200' : 'bg-[#0a2327] border-[#153f47]'
                  }`}
                >
                  <button
                    onClick={() => {
                      if (soundEnabled) soundHaptics.playTap();
                      setExpandedStep(isExpanded ? null : step.stepNumber);
                    }}
                    className="w-full p-4 flex items-center justify-between gap-3 text-left cursor-pointer hover:bg-emerald-50/20"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-[#006A4E] text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {step.stepNumber}
                      </span>
                      <h3 className={`text-sm sm:text-base font-bold ${isDay ? 'text-slate-900' : 'text-white'}`}>
                        {step.titleBn}
                      </h3>
                    </div>
                    <div className="text-slate-400">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div
                      className={`p-4 pt-0 border-t space-y-3 text-xs sm:text-sm leading-relaxed ${
                        isDay ? 'border-slate-100 bg-slate-50/50' : 'border-[#153f47] bg-[#071d20]/50'
                      }`}
                    >
                      <div className="space-y-1">
                        <span className="font-bold text-slate-800 dark:text-slate-200">শারীরিক পদ্ধতি:</span>
                        <p className="text-slate-600 dark:text-slate-300">{step.actionBn}</p>
                      </div>

                      <div className="p-3 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 space-y-1">
                        <span className="font-bold text-[#006A4E] dark:text-emerald-400">মুখের বাক্য ও দোয়া:</span>
                        <p className="text-slate-700 dark:text-slate-200 font-medium">{step.recitationBn}</p>
                      </div>

                      <div className="flex items-start gap-1.5 text-[11px] text-amber-700 dark:text-amber-400">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                        <span>{step.tipBn}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: Essential Prayer Duas */}
      {activeTab === 'prayer_duas' && (
        <div className="space-y-4">
          <div className="p-3 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900/60 text-xs sm:text-sm text-teal-950 dark:text-teal-200">
            নামাজে পঠিত সকল গুরুত্বপূর্ণ দোয়া ও তাসবীহ (আরবি, বিশুদ্ধ বাংলা উচ্চারণ, অর্থ ও রেফারেন্স সহ):
          </div>

          <div className="grid grid-cols-1 gap-3.5">
            {ESSENTIAL_DUAS.map((dua) => (
              <div
                key={dua.id}
                className={`rounded-2xl p-4 sm:p-5 border transition-all space-y-3 ${
                  isDay
                    ? 'bg-white border-slate-200 shadow-xs'
                    : 'bg-[#0a2327] border-[#153f47] shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between gap-2 border-b pb-2 dark:border-slate-800">
                  <h3 className={`text-sm sm:text-base font-bold ${isDay ? 'text-[#006A4E]' : 'text-emerald-300'}`}>
                    {dua.titleBn}
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {dua.referenceBn}
                  </span>
                </div>

                {/* Arabic */}
                <p className="text-right font-serif text-lg sm:text-xl leading-loose tracking-wide text-slate-900 dark:text-emerald-50 py-1" dir="rtl">
                  {dua.arabic}
                </p>

                {/* Transliteration */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">উচ্চারণ:</span>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-semibold leading-relaxed">
                    {dua.transliterationBn}
                  </p>
                </div>

                {/* Meaning */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">অর্থ:</span>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {dua.meaningBn}
                  </p>
                </div>

                {/* Context Tip */}
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900/50 text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-[#006A4E] dark:text-emerald-400 shrink-0" />
                  <span>{dua.contextBn}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Nafl & Sunnah Prayers */}
      {activeTab === 'nafl_prayers' && (
        <div className="space-y-3.5">
          {[
            {
              title: 'তাহাজ্জুদ নামাজ (সালাতুল লাইল)',
              rakats: '২ থেকে ১২ রাকাত (প্রতি দুই রাকাতে সালাম)',
              time: 'রাতের শেষ তৃতীয়াংশে (ফজরের পূর্ব পর্যন্ত)',
              benefit: 'ফরজ নামাজের পর সর্বোত্তম নামাজ। আল্লাহ এ সময়ে বান্দার দোয়া কবুল করেন।',
              steps: 'সাধারণ নামাজের মতোই দুই দুই রাকাত করে আদায় করতে হয়। দীর্ঘ কিরাত ও সিজদা উত্তম।',
            },
            {
              title: 'ইশরাক নামাজ',
              rakats: '২ থেকে ৪ রাকাত',
              time: 'সূর্যোদয়ের আনুমানিক ১৫-২০ মিনিট পর থেকে',
              benefit: 'ফজর পড়ে বসে জিকির করে ইশরাক পড়লে একটি কবুল হজ ও ওমরার সওয়াব মেলে (তিরমিজি ৫৮৬)।',
              steps: 'দুই রাকাত করে সাধারণ নফল নামাজের মতো নিয়ত করে আদায় করবেন।',
            },
            {
              title: 'চাশতের নামাজ (সালাতুদ দুহা)',
              rakats: '২, ৪, ৮ বা ১২ রাকাত',
              time: 'বেলা বাড়ার পর থেকে দ্বিপ্রহরের পূর্ব পর্যন্ত',
              benefit: 'শরীরের ৩৬০টি জোড়ার সদকাহ হিসেবে গণ্য হয়। জীবিকায় প্রাচুর্য ও বরকত লাভ হয়।',
              steps: 'দুই দুই রাকাত করে আদায় করা সুন্নাত।',
            },
            {
              title: 'সালাতুত তাসবীহ (গুনাহ মাফের নামাজ)',
              rakats: '৪ রাকাত (মোট ৩০০ বার তাসবীহ)',
              time: 'নিষিদ্ধ সময় ব্যতীত দিন বা রাতের যেকোনো সময়ে',
              benefit: 'জীবনের পূর্বাপর, ছোট-বড়, গোপন-প্রকাশ্য সকল গুনাহ মাফ হওয়ার হাদিসে বর্ণনা রয়েছে (আবু দাউদ ১২৯৭)।',
              steps: 'প্রতি রাকাতে ৭৫ বার "সুবহানাল্লাহি ওয়াল হামদুলিল্লাহি ওয়া লা ইলাহা ইল্লাল্লাহু ওয়াল্লাহু আকবার" পাঠ করতে হয়: কিরাতের পর ১৫ বার, রুকুতে ১০ বার, রুকু থেকে দাঁড়িয়ে ১০ বার, ১ম সিজদায় ১০ বার, দুই সিজদার বৈঠকে ১০ বার, ২য় সিজদায় ১০ বার, ২য় সিজদা থেকে উঠে বসার পর ১০ বার।',
            },
            {
              title: 'সালাতুল হাজত (প্রয়োজন পূরণের নামাজ)',
              rakats: '২ রাকাত',
              time: 'যেকোনো বৈধ সময়ে',
              benefit: 'আল্লাহর কাছে অথবা কোনো মানুষের কাছে কোনো প্রয়োজনীয়তা দেখা দিলে এ নামাজ পড়ে দোয়া করা হয়।',
              steps: 'উত্তমরূপে অজু করে ২ রাকাত নামাজ পড়ে আল্লাহর প্রশংসা ও দরূদ শরিফ পাঠ করে নিজের হাজত পেশ করবেন।',
            },
            {
              title: 'সালাতুল ইস্তিখারা (সিদ্ধান্ত গ্রহণের নামাজ)',
              rakats: '২ রাকাত',
              time: 'যেকোনো গুরুত্বপূর্ণ সিদ্ধান্ত গ্রহণের পূর্বে',
              benefit: 'কোন কাজটি কল্যাণকর হবে সে ব্যাপারে মহান আল্লাহর কাছে দিকনির্দেশনা ও বরকত প্রার্থনা।',
              steps: '২ রাকাত নফল নামাজ পড়ে হাদিসে বর্ণিত সুনির্দিষ্ট ইস্তিখারার দোয়া পাঠ করবেন।',
            },
          ].map((nafl, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-4 sm:p-5 border space-y-2.5 ${
                isDay ? 'bg-white border-slate-200' : 'bg-[#0a2327] border-[#153f47]'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className={`text-base font-black ${isDay ? 'text-slate-900' : 'text-white'}`}>
                  {nafl.title}
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-[#006A4E]/10 text-[#006A4E] dark:bg-emerald-500/20 dark:text-emerald-300">
                  {nafl.rakats}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                <span className="font-bold text-slate-700 dark:text-slate-300">সময়:</span> {nafl.time}
              </p>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                <span className="font-bold text-[#006A4E] dark:text-emerald-400">ফজিলত:</span> {nafl.benefit}
              </p>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border border-slate-100 dark:border-slate-800">
                <span className="font-bold text-slate-800 dark:text-slate-200">পদ্ধতি:</span> {nafl.steps}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 5: Qaza Namaz Calculator */}
      {activeTab === 'qaza_tracker' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs sm:text-sm text-amber-950 dark:text-amber-200 leading-relaxed">
            <span className="font-bold">কাজা নামাজ ট্র্যাকার:</span> কোনো ওজরে বা ভুলবশত নামাজ ছুটে গিয়ে থাকলে তা যত দ্রুত সম্ভব কাজা আদায় করা ওয়াজিব। আপনি কত ওয়াক্ত কাজা আদায় করলেন তা এখানে লিখে রাখতে পারেন।
          </div>

          <div className="rounded-2xl p-4 sm:p-5 border bg-white dark:bg-[#0a2327] border-slate-200 dark:border-[#153f47] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b dark:border-slate-800">
              <div>
                <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                  মোট অবশিষ্ট কাজা ওয়াক্ত
                </h3>
                <p className="text-xs text-slate-500">নিয়মিত এক এক ওয়াক্ত আদায় করে সংখ্যা কমান</p>
              </div>
              <span className="text-xl sm:text-2xl font-black font-mono text-[#006A4E] dark:text-emerald-400 px-3 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">
                {totalQaza}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { key: 'fajr', label: 'ফজর কাজা (২ রাকাত ফরজ)' },
                { key: 'dhuhr', label: 'যোহর কাজা (৪ রাকাত ফরজ)' },
                { key: 'asr', label: 'আসর কাজা (৪ রাকাত ফরজ)' },
                { key: 'maghrib', label: 'মাগরিব কাজা (৩ রাকাত ফরজ)' },
                { key: 'isha', label: 'এশা কাজা (৪ রাকাত ফরজ)' },
                { key: 'witr', label: 'বিতর কাজা (৩ রাকাত ওয়াজিব)' },
              ].map((item) => {
                const count = qazaCounts[item.key as keyof typeof qazaCounts] || 0;
                return (
                  <div
                    key={item.key}
                    className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/40"
                  >
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                        {item.label}
                      </p>
                      <p className="text-xs text-slate-500 font-mono">অবশিষ্ট: {count} ওয়াক্ত</p>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => updateQaza(item.key as keyof typeof qazaCounts, -1)}
                        className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center active:scale-95 transition cursor-pointer hover:bg-emerald-700"
                        title="১ ওয়াক্ত আদায় সম্পন্ন"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-mono font-bold text-sm text-slate-900 dark:text-white">
                        {count}
                      </span>
                      <button
                        onClick={() => updateQaza(item.key as keyof typeof qazaCounts, 1)}
                        className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white font-bold flex items-center justify-center active:scale-95 transition cursor-pointer hover:bg-slate-300"
                        title="১ ওয়াক্ত যুক্ত করুন"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

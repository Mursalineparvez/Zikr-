import React, { useState, useEffect } from 'react';
import {
  UMRAH_STEPS,
  HAJJ_DAYS_GUIDE,
  IHRAM_PROHIBITIONS,
  IHRAM_PROHIBITIONS_EN,
  MIQAT_LOCATIONS,
  MADINAH_ZIYARAH_PLACES,
  PILGRIM_PACKING_LIST,
  HajjStepItem,
} from '../data/hajjUmrahData';
import {
  UMRAH_HOME_JOURNEY_STEPS,
  HAJJ_HOME_JOURNEY_STEPS,
  JourneyStep,
} from '../data/homeToHomeJourneyData';
import { ThemeMode, ZikrLanguage } from '../types';
import {
  Compass,
  Volume2,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  ChevronDown,
  Award,
  Sparkles,
  RotateCcw,
  Plane,
  Luggage,
  MapPin,
  CheckSquare,
  Square,
  Footprints,
  PhoneCall,
  Languages,
  Info,
  ShieldAlert,
  Tv,
  Home,
  BookOpen,
  Camera,
} from 'lucide-react';
import { soundHaptics } from '../utils/audioHaptics';
import { HAJJ_UMRAH_UI } from '../utils/appTranslations';
import { LiveAnimationStudio } from './LiveAnimationStudio';

interface HajjUmrahViewProps {
  soundEnabled: boolean;
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
}

type HajjTab = 'umrah_hub' | 'hajj_hub' | 'home_journey_hub' | 'essentials_hub';
type JourneySubTab = 'umrah_journey' | 'hajj_journey';

interface HajjRoutePhotoItem {
  id: number;
  nameBn: string;
  nameEn: string;
  placeBn: string;
  placeEn: string;
  arabicName: string;
  imageUrl: string;
  descBn: string;
  descEn: string;
  checklistBn: string[];
  checklistEn: string[];
  duaArabic?: string;
  duaMeaningBn?: string;
}

const HAJJ_ROUTE_PHOTOS: HajjRoutePhotoItem[] = [
  {
    id: 1,
    nameBn: '৮ই জিলহজ (১ম দিন)',
    nameEn: '8th Dhul Hijjah (Day 1)',
    placeBn: 'মিনা তাঁবুর শহর',
    placeEn: 'Mina Tent City',
    arabicName: 'مِينَى - مَدِينَةُ الخِيَامِ',
    imageUrl: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=1200&q=80',
    descBn: '৮ই জিলহজ সকালে মক্কা বা হোটেল থেকে ইহরাম বেঁধে মিনার তাঁবুর শহরে পৌঁছাতে হয়। এখানে জোহর, আসর, মাগরিব, এশা ও ৯ই জিলহজ ফজর নামাজ কসর করে আদায় করা সুন্নাত।',
    descEn: 'On the 8th of Dhul Hijjah, pilgrims proceed to Mina tent city in Ihram, offering 5 daily prayers (shortened).',
    checklistBn: [
      'মক্কায় নিজ হোটেল থেকে ইহরামের পোশাক পরিধান করুন।',
      'মিনার তাঁবুতে নিজের নির্ধারিত ব্লকে অবস্থান নিন।',
      'জোহর, আসর, মাগরিব, এশা ও ফজর সালাত কসর করে আদায় করুন।',
      'বেশি বেশি তালবিয়াহ পাঠ ও আল্লাহর জিকিরে সময় কাটান।'
    ],
    checklistEn: [
      'Don Ihram garments at hotel before departing for Mina.',
      'Settle in assigned tent block in Mina.',
      'Pray 5 daily prayers shortened (Kasr).',
      'Recite Talbiyah and Dhikr continuously.'
    ],
    duaArabic: 'لَبَّيْكَ اللَّهُمَّ حَجًّا، لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ',
    duaMeaningBn: 'আমি হজের উদ্দেশ্যে হাজির হে আল্লাহ, আমি হাজির।',
  },
  {
    id: 2,
    nameBn: '৯ই জিলহজ (২য় দিন - বেলা)',
    nameEn: '9th Dhul Hijjah (Day 2 - Day)',
    placeBn: 'আরাফাতের ময়দান ও জাবালে রহমত',
    placeEn: 'Plains of Arafah & Mount Mercy',
    arabicName: 'عَرَفَةَ - جَبَلُ الرَّحْمَةِ',
    imageUrl: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1200&q=80',
    descBn: 'হজের সবচেয়ে গুরুত্বপূর্ণ ও প্রধান রোকন হলো ৯ই জিলহজ জোহর থেকে সূর্যাস্ত পর্যন্ত আরাফাতের ময়দানে অবস্থান (ওকুফ)। এখানে মসজিদে নামিরা থেকে খুতবা সম্প্রচার করা হয় এবং জোহর-আসর একসাথে পড়া হয়।',
    descEn: 'Wuquf in Arafah is the peak ritual of Hajj from Zuhr to sunset on the 9th of Dhul Hijjah.',
    checklistBn: [
      '৯ই জিলহজ সকালে মিনা থেকে আরাফাতের ময়দানে গমন করুন।',
      'জোহর ও আসর নামাজ কসর ও জমা করে একসাথে পড়ুন।',
      'সূর্যাস্ত পর্যন্ত কেবলামুখী হয়ে দু হাত তুলে অঝোর ধারায় কান্নাকাটি করে দোয়া করুন।',
      'আরাফাতের দিনে বেশি বেশি ইস্তিগফার ও লা-ইলাহা ইল্লাল্লাহু পড়ুন।'
    ],
    checklistEn: [
      'Proceed from Mina to Arafah on the 9th morning.',
      'Combine and shorten Zuhr and Asr prayers.',
      'Face Qibla and make intense supplications until sunset.',
      'Recite Istighfar and Kalimah Tayyibah abundantly.'
    ],
    duaArabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    duaMeaningBn: 'আল্লাহ ছাড়া কোনো মাবুদ নেই, তিনি একক, তাঁর কোনো শরিক নেই। রাজত্ব ও প্রশংসা তাঁরই।',
  },
  {
    id: 3,
    nameBn: '৯ই জিলহজ (২য় দিন - রাত)',
    nameEn: '9th Dhul Hijjah (Day 2 - Night)',
    placeBn: 'মুজদালিফা (খোলা আকাশ)',
    placeEn: 'Muzdalifah Night Under Open Sky',
    arabicName: 'المُزْدَلِفَةُ',
    imageUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1200&q=80',
    descBn: 'আরাফাতে সূর্যাস্তের পর মাগরিব না পড়ে মুজদালিফার দিকে রওয়ানা হতে হয়। মুজদালিফায় পৌঁছে মাগরিব ও এশা একসাথে পড়ে খোলা আকাশের নিচে পাথরের ওপর রাত্রিযাপন করা ও জামারাতের জন্য কঙ্কর সংগ্রহ করা সুন্নাত।',
    descEn: 'After sunset in Arafah, travel to Muzdalifah, combine Maghrib and Isha, rest under the stars and collect pebbles.',
    checklistBn: [
      'আরাফাতে সূর্যাস্তের সাথে সাথে মুজদালিফার উদ্দেশ্যে রওয়ানা হোন।',
      'মুজদালিফায় পৌঁছে মাগরিব ও এশা সালাত একসাথে আদায় করুন।',
      'খোলা আকাশের নিচে বিশ্রাম নিন ও ফজর পর্যন্ত রাত্রিযাপন করুন।',
      'জামারাত শয়তানকে পাথর মারার জন্য অন্তত ৭০টি ছোট কঙ্কর সংগ্রহ করুন।'
    ],
    checklistEn: [
      'Depart Arafah after sunset for Muzdalifah.',
      'Combine Maghrib and Isha prayers upon arrival.',
      'Rest under open sky until Fajr.',
      'Collect 70 small pebbles for Jamarat stoning.'
    ],
    duaArabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ المَغْفِرَةَ وَالعَافِيَةَ',
    duaMeaningBn: 'হে আল্লাহ, আমি আপনার কাছে ক্ষমা ও নিরাপত্তা প্রার্থনা করছি।',
  },
  {
    id: 4,
    nameBn: '১০ই জিলহজ (৩য় দিন - কোরবানির দিন)',
    nameEn: '10th Dhul Hijjah (Day 3 - Eid Day)',
    placeBn: 'জামারাত ও মক্কা শরিফ',
    placeEn: 'Jamarat Stoning Bridge & Makkah',
    arabicName: 'الجَمَرَاتُ وَمَكَّةُ',
    imageUrl: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1200&q=80',
    descBn: '১০ই জিলহজ সকালে মুজদালিফা থেকে মিনায় ফিরে শুধু বড় শয়তানকে (জামরাতুল আকাবা) ৭টি কঙ্কর মারা, কোরবানি সম্পন্ন করা, মাথা মুণ্ডন (হলক) করে ইহরাম খোলা এবং মক্কায় গিয়ে তাওয়াফে ইফাদা করা।',
    descEn: 'On 10th Dhul Hijjah, stone Jamrat al-Aqaba with 7 pebbles, sacrifice animal, shave head, and perform Tawaf al-Ifadah.',
    checklistBn: [
      'মুজদালিফায় ফজর পড়ে মিনায় এসে বড় শয়তানকে ৭টি কঙ্কর মারুন।',
      'হাদি বা কোরবানি সম্পন্ন করুন।',
      'মাথা মুণ্ডন (হলক) বা চুল ছেঁটে (তাকসির) ইহরামের বিধিনিষেধ থেকে মুক্ত হোন।',
      'মক্কায় মসজিদুল হারামে গিয়ে হজের ফরজ তাওয়াফ (তাওয়াফে ইফাদা) ও সাঈ করুন।'
    ],
    checklistEn: [
      'Stone Jamrat al-Aqaba with 7 pebbles.',
      'Fulfill animal sacrifice (Qurbani).',
      'Shave or trim hair to exit Ihram.',
      'Perform obligatory Tawaf al-Ifadah and Sa\'i in Makkah.'
    ],
    duaArabic: 'بِسْمِ اللَّهِ، اللَّهُ أَكْبَرُ، رَغْمًا لِلشَّيْطَانِ وَرِضًا لِلرَّحْمَنِ',
    duaMeaningBn: 'আল্লাহর নামে, আল্লাহ সর্বশ্রেষ্ঠ। শয়তানের অপমানের জন্য এবং দয়াময়ের সন্তুষ্টির জন্য।',
  },
  {
    id: 5,
    nameBn: '১১-১৩ই জিলহজ (৪র্থ ও ৫ম দিন)',
    nameEn: '11th-13th Dhul Hijjah (Days 4 & 5)',
    placeBn: 'মিনা তাঁবু ও বিদায়ী তাওয়াফ',
    placeEn: 'Mina Stoning & Farewell Tawaf',
    arabicName: 'أَيَّامُ التَّشْرِيقِ وَطَوَافُ الوَدَاعِ',
    imageUrl: 'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&w=1200&q=80',
    descBn: 'আইয়ামে তাশরিকের দিনগুলোতে মিনায় তাঁবুতে রাত্রিযাপন করে প্রতিদিন জোহরের পর ছোট, মধ্যম ও বড় ৩টি শয়তানকেই ৭টি করে মোট ২১টি কঙ্কর মারা এবং মক্কা ত্যাগের পূর্বে বিদায়ী তাওয়াফ (তাওয়াফে ওয়াদা) সম্পন্ন করা।',
    descEn: 'Stay in Mina, stone all 3 Jamarat pillars daily with 21 pebbles, then complete Farewell Tawaf in Makkah.',
    checklistBn: [
      '১১ ও ১২ই জিলহজ মিনায় তাঁবুতে রাত্রিযাপন করুন।',
      'প্রতিদিন জোহরের পর ছোট, মধ্যম ও বড় তিন শয়তানকে ৭টি করে মোট ২১টি কঙ্কর মারুন।',
      'মক্কা ত্যাগ করার পূর্বে ৭ চক্কর বিদায়ী তাওয়াফ (তাওয়াফে ওয়াদা) সম্পন্ন করুন।',
      'আল্লাহর অশেষ শুকরিয়া আদায় করে নিজ দেশে ও পরিবারে ফিরে আসুন।'
    ],
    checklistEn: [
      'Stay overnight in Mina tents on 11th & 12th Dhul Hijjah.',
      'Stone all three Jamarat pillars daily with 21 pebbles.',
      'Perform Farewell Tawaf before departing Makkah.',
      'Return home safely with deep gratitude to Allah.'
    ],
    duaArabic: 'اللَّهُمَّ لَا تَجْعَلْ هَذَا آخِرَ العَهْدِ مِنْ بَيْتِكَ الحَرَامِ',
    duaMeaningBn: 'হে আল্লাহ, আপনি আমার এই সফরকে আপনার পবিত্র ঘরের শেষ সাক্ষাত বানাবেন না।',
  },
];

export const HajjUmrahView: React.FC<HajjUmrahViewProps> = ({
  soundEnabled,
  themeMode = 'night',
  selectedLanguage = 'bn',
}) => {
  const isDay = themeMode === 'day';
  const isBn = selectedLanguage === 'bn';
  const [activeTab, setActiveTab] = useState<HajjTab>('umrah_hub');
  const [journeySubTab, setJourneySubTab] = useState<JourneySubTab>('umrah_journey');
  const [showStudioModal, setShowStudioModal] = useState<boolean>(false);
  const [activeHajjMapDay, setActiveHajjMapDay] = useState<number>(1);

  // Individual Action Checklist Item States (Persistent)
  const [actionCheckedState, setActionCheckedState] = useState<Record<string, boolean>>(() => {
    try {
      const s = localStorage.getItem('zikrmate_action_items_checked');
      return s ? JSON.parse(s) : {};
    } catch {
      return {};
    }
  });

  // Packing Checklist State (Persistent)
  const [packedItems, setPackedItems] = useState<Record<string, boolean>>(() => {
    try {
      const s = localStorage.getItem('zikrmate_hajj_packing_checked');
      return s ? JSON.parse(s) : {};
    } catch {
      return {};
    }
  });

  const toggleActionItem = (stepId: string, index: number) => {
    const key = `${stepId}_act_${index}`;
    setActionCheckedState((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem('zikrmate_action_items_checked', JSON.stringify(next));
      } catch {}
      return next;
    });
    if (soundEnabled) soundHaptics.playTap();
  };

  const togglePackedItem = (id: string) => {
    setPackedItems((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('zikrmate_hajj_packing_checked', JSON.stringify(next));
      } catch {}
      return next;
    });
    if (soundEnabled) soundHaptics.playTap();
  };

  const handleSpeakArabic = (text: string) => {
    if (soundEnabled) soundHaptics.playTap();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Selected Hajj Route Photo Item
  const activeRouteDetail = HAJJ_ROUTE_PHOTOS.find((r) => r.id === activeHajjMapDay) || HAJJ_ROUTE_PHOTOS[0];

  // If user opened the dedicated Studio Page
  if (showStudioModal) {
    return (
      <LiveAnimationStudio
        onBack={() => setShowStudioModal(false)}
        soundEnabled={soundEnabled}
        themeMode={themeMode}
        selectedLanguage={selectedLanguage}
      />
    );
  }

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Top Banner with Rich Spiritual Glow */}
      <div
        className={`p-5 sm:p-6 rounded-3xl border shadow-xl relative overflow-hidden ${
          isDay
            ? 'bg-gradient-to-r from-teal-800 via-emerald-800 to-teal-900 text-white border-teal-600/40'
            : 'bg-gradient-to-r from-[#09252a] via-[#0f3b43] to-[#154d57] text-white border-[#1a535e]'
        }`}
      >
        <div className="absolute right-0 top-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-teal-100 text-xs font-semibold mb-2 backdrop-blur-md">
              <Compass className="w-3.5 h-3.5 text-amber-300" />
              <span>الحَجُّ وَالعُمْرَةُ • All Duas, Ayats &amp; Real Location Photos</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              {HAJJ_UMRAH_UI.bannerTitle[selectedLanguage]}
            </h2>
            <p className="text-xs sm:text-sm text-teal-100/90 mt-1 max-w-2xl leading-relaxed">
              {HAJJ_UMRAH_UI.bannerSub[selectedLanguage]}
            </p>
          </div>

          <button
            onClick={() =>
              handleSpeakArabic(
                'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ'
              )
            }
            className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg transition active:scale-95 flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Volume2 className="w-4 h-4" />
            <span>{isBn ? 'তালবিয়াহ অডিও শুনুন' : 'Play Talbiyah Audio'}</span>
          </button>
        </div>
      </div>

      {/* 4 MASTER TABS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 p-1.5 rounded-2xl bg-slate-200 dark:bg-[#092226] border border-slate-300 dark:border-[#14424a]">
        <button
          onClick={() => {
            setActiveTab('umrah_hub');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-black transition flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'umrah_hub'
              ? 'bg-amber-500 text-slate-950 shadow-lg scale-[1.02]'
              : 'text-slate-600 dark:text-emerald-300 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <span>🕋</span>
          <span>{isBn ? 'ওমরাহ গাইড ও অ্যানিমেশন' : 'Umrah Hub'}</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('hajj_hub');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-black transition flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'hajj_hub'
              ? 'bg-emerald-600 text-white shadow-lg scale-[1.02]'
              : 'text-slate-600 dark:text-emerald-300 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <span>⛺</span>
          <span>{isBn ? 'হজের ৫ দিনের রুট ম্যাপ' : '5 Days Hajj'}</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('home_journey_hub');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-black transition flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'home_journey_hub'
              ? 'bg-teal-600 text-white shadow-lg scale-[1.02]'
              : 'text-slate-600 dark:text-emerald-300 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <span>🏠</span>
          <span>{isBn ? 'হজ ও ওমরাহ চেকলিস্ট' : 'Hajj & Umrah Checklist'}</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('essentials_hub');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-black transition flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'essentials_hub'
              ? 'bg-teal-700 text-white shadow-lg scale-[1.02]'
              : 'text-slate-600 dark:text-emerald-300 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <span>🎒</span>
          <span>{isBn ? 'মিকাত, মদিনা ও চেকলিস্ট' : 'Essentials'}</span>
        </button>
      </div>

      {/* ======================================================= */}
      {/* 🕋 TAB 1: COMPLETE UMRAH HUB                              */}
      {/* ======================================================= */}
      {activeTab === 'umrah_hub' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div
            className={`p-6 sm:p-8 rounded-3xl border shadow-2xl relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6 ${
              isDay
                ? 'bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white border-slate-800'
                : 'bg-gradient-to-r from-[#06181b] via-[#0b292e] to-[#06181b] text-white border-[#123942]'
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none mix-blend-luminosity filter brightness-75"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1200&q=80')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent pointer-events-none" />

            <div className="relative z-10 space-y-2 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{isBn ? 'থ্রিডি রিয়ালিস্টিক সিমুলেটর' : '3D Realistic Studio'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                {isBn ? '🎬 লাইভ রিয়ালিস্টিক অ্যানিমেশন স্টুডিও ওপেন করুন' : 'Open Live 3D Simulation Studio'}
              </h3>
            </div>

            <button
              onClick={() => {
                setShowStudioModal(true);
                if (soundEnabled) soundHaptics.playTap();
              }}
              className="px-6 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-xl transition active:scale-95 flex items-center gap-2.5 cursor-pointer shrink-0 relative z-10"
            >
              <Tv className="w-5 h-5" />
              <span>{isBn ? 'অ্যানিমেশন স্টুডিও চালু করুন ➔' : 'Launch Studio ➔'}</span>
            </button>
          </div>
        </div>
      )}

      {/* ======================================================= */}
      {/* ⛺ TAB 2: COMPLETE 5 DAYS HAJJ HUB WITH REAL LOCATION PHOTOS */}
      {/* ======================================================= */}
      {activeTab === 'hajj_hub' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div
            className={`p-5 sm:p-6 rounded-3xl border shadow-xl space-y-4 ${
              isDay ? 'bg-white border-slate-200' : 'bg-[#0a242a] border-[#16444e]'
            }`}
          >
            <div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-emerald-500" />
                <span>{isBn ? 'হজের ৫ দিনের অরিজিনাল ছবি ও রুট ম্যাপ' : 'Hajj 5 Days Real Photos & Interactive Route'}</span>
              </span>
              <h3 className={`text-base sm:text-lg font-black ${isDay ? 'text-slate-900' : 'text-white'} mt-1`}>
                {isBn ? 'নিচের যে কোনো ধাপে ক্লিক করুন - সেই স্থানের আসল ছবি ও বিস্তারিত নিয়ম নিচে ভেসে উঠবে' : 'Click any step below to view recent photo & exact guide'}
              </h3>
            </div>

            {/* 5 Step Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {HAJJ_ROUTE_PHOTOS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveHajjMapDay(item.id);
                    if (soundEnabled) soundHaptics.playTap();
                  }}
                  className={`p-3.5 rounded-2xl border text-left transition cursor-pointer active:scale-95 flex flex-col justify-between space-y-1.5 ${
                    activeHajjMapDay === item.id
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-xl font-bold ring-2 ring-emerald-400'
                      : isDay
                      ? 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                      : 'bg-[#07191d] hover:bg-teal-950/40 text-emerald-300 border-teal-900/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded-md bg-black/20">
                      Step {item.id}
                    </span>
                    {activeHajjMapDay === item.id && <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping" />}
                  </div>
                  <div>
                    <div className="text-xs font-black">{isBn ? item.nameBn : item.nameEn}</div>
                    <div className="text-[11px] font-bold text-amber-300 dark:text-amber-200 mt-0.5">{isBn ? item.placeBn : item.placeEn}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* REAL LOCATION PHOTO DISPLAY CARD BELOW BUTTONS */}
            <div className={`p-5 sm:p-6 rounded-3xl border shadow-2xl space-y-5 animate-in fade-in duration-300 ${isDay ? 'bg-slate-50 border-slate-200' : 'bg-[#071a1d] border-teal-900/50'}`}>
              <div className="relative w-full h-[260px] sm:h-[380px] rounded-2xl overflow-hidden border border-slate-700/60 shadow-xl group">
                <img
                  src={activeRouteDetail.imageUrl}
                  alt={activeRouteDetail.placeBn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2 text-white">
                  <div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500 text-slate-950 font-black text-xs">
                      {isBn ? activeRouteDetail.nameBn : activeRouteDetail.nameEn}
                    </span>
                    <h4 className="text-lg sm:text-2xl font-black text-white mt-1 drop-shadow-md">
                      {isBn ? activeRouteDetail.placeBn : activeRouteDetail.placeEn}
                    </h4>
                  </div>
                  <span className="font-arabic text-amber-300 font-bold text-base sm:text-xl drop-shadow-md">
                    {activeRouteDetail.arabicName}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-teal-100 leading-relaxed font-medium">
                {isBn ? activeRouteDetail.descBn : activeRouteDetail.descEn}
              </p>

              {/* Action Checklist */}
              <div className="space-y-2 pt-1">
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>{isBn ? 'এই ধাপের প্রধান আমল ও করণীয়:' : 'Key Rituals at this Step:'}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(isBn ? activeRouteDetail.checklistBn : activeRouteDetail.checklistEn).map((act, aIdx) => (
                    <div
                      key={aIdx}
                      className={`p-3 rounded-2xl border text-xs sm:text-sm flex items-start gap-2.5 ${
                        isDay ? 'bg-white border-slate-200 text-slate-800' : 'bg-[#0a2327] border-teal-900/40 text-teal-100'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 font-mono">
                        {aIdx + 1}
                      </span>
                      <span className="leading-relaxed">{act}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Location Dua */}
              {activeRouteDetail.duaArabic && (
                <div className={`p-4 rounded-2xl border space-y-2 ${isDay ? 'bg-amber-50 border-amber-200' : 'bg-[#0f292d] border-amber-500/30'}`}>
                  <div className="flex items-center justify-between text-xs font-bold text-amber-700 dark:text-amber-300">
                    <span>{isBn ? 'পবিত্র দোয়া:' : 'Recommended Dua:'}</span>
                    <button
                      onClick={() => handleSpeakArabic(activeRouteDetail.duaArabic!)}
                      className="px-3 py-1 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 cursor-pointer flex items-center gap-1 shadow-md"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Audio</span>
                    </button>
                  </div>
                  <p dir="rtl" className="font-arabic text-lg text-right text-amber-900 dark:text-amber-100 leading-loose">
                    {activeRouteDetail.duaArabic}
                  </p>
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                    <strong className="text-amber-600">{isBn ? 'অর্থ: ' : 'Meaning: '}</strong>
                    {activeRouteDetail.duaMeaningBn}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================= */}
      {/* 🏠 TAB 3: ALL DUAS, AYATS, HADITHS & CHECKLISTS TOGETHER */}
      {/* ======================================================= */}
      {activeTab === 'home_journey_hub' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-200 dark:bg-[#07191d] border border-slate-300 dark:border-teal-900/50">
            <button
              onClick={() => {
                setJourneySubTab('umrah_journey');
                if (soundEnabled) soundHaptics.playTap();
              }}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition flex items-center justify-center gap-2 cursor-pointer ${
                journeySubTab === 'umrah_journey'
                  ? 'bg-amber-500 text-slate-950 shadow-lg'
                  : 'text-slate-600 dark:text-emerald-300 hover:text-white'
              }`}
            >
              <span>🕋</span>
              <span>{isBn ? 'ওমরাহ রুট, সকল দোয়া ও চেকলিস্ট' : 'Umrah Duas & Checklists'}</span>
            </button>

            <button
              onClick={() => {
                setJourneySubTab('hajj_journey');
                if (soundEnabled) soundHaptics.playTap();
              }}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition flex items-center justify-center gap-2 cursor-pointer ${
                journeySubTab === 'hajj_journey'
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'text-slate-600 dark:text-emerald-300 hover:text-white'
              }`}
            >
              <span>⛺</span>
              <span>{isBn ? 'হজ রুট, সকল দোয়া ও চেকলিস্ট' : 'Hajj Duas & Checklists'}</span>
            </button>
          </div>

          {/* UMRAH HOME JOURNEY CHECKLIST WITH ALL DUAS */}
          {journeySubTab === 'umrah_journey' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className={`p-4 rounded-2xl border flex items-center justify-between ${isDay ? 'bg-amber-50 border-amber-200 text-slate-900' : 'bg-[#0a242a] border-amber-500/40 text-white'}`}>
                <h3 className="text-sm font-black">{isBn ? '🕋 ওমরাহের সকল দোয়া, আয়াত, হাদিস ও চেকলিস্ট একই সাথে' : '🕋 Umrah All Duas, Ayats & Checklists Together'}</h3>
              </div>

              {UMRAH_HOME_JOURNEY_STEPS.map((step: JourneyStep) => {
                return (
                  <div
                    key={step.id}
                    className={`p-6 rounded-3xl border shadow-xl space-y-5 ${
                      isDay ? 'bg-white border-slate-200' : 'bg-[#0a242a] border-[#16444e]'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-teal-900/40 pb-4">
                      <div>
                        <span className="text-xs font-bold text-amber-600 dark:text-amber-400 font-mono">
                          {isBn ? step.phaseBn : step.phaseEn}
                        </span>
                        <h4 className={`text-base sm:text-lg font-black ${isDay ? 'text-slate-900' : 'text-white'}`}>
                          {isBn ? step.titleBn : step.titleEn}
                        </h4>
                      </div>
                      {step.arabicTitle && (
                        <span className="font-arabic text-base text-amber-600 dark:text-amber-400 font-bold px-3 py-1 rounded-xl bg-amber-500/10">
                          {step.arabicTitle}
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-emerald-300 leading-relaxed">
                      {isBn ? step.descriptionBn : step.descriptionEn}
                    </p>

                    {/* INDIVIDUAL ACTION CHECKLIST ITEMS */}
                    <div className="space-y-2.5 pt-1">
                      <div className="text-xs font-bold text-slate-500 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-amber-500" />
                        <span>{isBn ? 'করণীয় চেকলিস্ট (প্রতিটি আলাদা টিক দিন):' : 'Action Checklist (Tick Individually):'}</span>
                      </div>
                      {(isBn ? step.actionChecklistBn : step.actionChecklistEn).map((act, aIdx) => {
                        const itemKey = `${step.id}_act_${aIdx}`;
                        const isItemChecked = !!actionCheckedState[itemKey];
                        return (
                          <div
                            key={aIdx}
                            onClick={() => toggleActionItem(step.id, aIdx)}
                            className={`p-3.5 rounded-2xl border text-xs sm:text-sm flex items-start gap-3 transition-all cursor-pointer select-none ${
                              isItemChecked
                                ? isDay ? 'bg-amber-50 border-amber-300 text-slate-900 opacity-90' : 'bg-amber-950/30 border-amber-500/40 text-amber-100 opacity-90'
                                : isDay ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800' : 'bg-[#071d22] hover:bg-teal-950/40 border-teal-900/40 text-teal-100'
                            }`}
                          >
                            <button className="shrink-0 mt-0.5 pointer-events-none">
                              {isItemChecked ? (
                                <CheckSquare className="w-5 h-5 text-amber-500" />
                              ) : (
                                <Square className="w-5 h-5 text-slate-400" />
                              )}
                            </button>
                            <span className={`leading-relaxed ${isItemChecked ? 'line-through text-slate-400 dark:text-teal-400' : ''}`}>{act}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* ESSENTIAL DUAS INCLUDED AT THE SAME TIME */}
                    {step.essentialDuas && step.essentialDuas.length > 0 && (
                      <div className="space-y-3 pt-2">
                        <div className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                          <BookOpen className="w-4 h-4 text-amber-500" />
                          <span>{isBn ? 'এই ধাপের প্রয়োজনীয় সকল দোয়া:' : 'Essential Duas for this Step:'}</span>
                        </div>
                        {step.essentialDuas.map((dua, dIdx) => (
                          <div
                            key={dIdx}
                            className={`p-4 sm:p-5 rounded-2xl border space-y-3 shadow-md ${
                              isDay ? 'bg-amber-50/80 border-amber-200' : 'bg-[#082328] border-amber-500/30'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-xs sm:text-sm text-amber-700 dark:text-amber-300">
                                {isBn ? dua.titleBn : dua.titleEn}
                              </span>
                              <button
                                onClick={() => handleSpeakArabic(dua.arabic)}
                                className="px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 bg-amber-500 text-slate-950 hover:bg-amber-400 transition active:scale-95 cursor-pointer shadow-md"
                              >
                                <Volume2 className="w-4 h-4" />
                                <span>{isBn ? 'অডিও' : 'Audio'}</span>
                              </button>
                            </div>
                            <p dir="rtl" className="font-arabic text-xl sm:text-2xl text-right text-amber-900 dark:text-amber-100 leading-loose font-bold">
                              {dua.arabic}
                            </p>
                            <p className="text-xs font-mono italic text-slate-600 dark:text-emerald-200/90">
                              {dua.transliteration}
                            </p>
                            <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100">
                              <strong className="text-amber-600">{isBn ? 'অর্থ: ' : 'Meaning: '}</strong>
                              {isBn ? dua.meaningBn : dua.meaningEn}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* HAJJ HOME JOURNEY CHECKLIST WITH ALL DUAS */}
          {journeySubTab === 'hajj_journey' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className={`p-4 rounded-2xl border flex items-center justify-between ${isDay ? 'bg-emerald-50 border-emerald-200 text-slate-900' : 'bg-[#0a242a] border-emerald-500/40 text-white'}`}>
                <h3 className="text-sm font-black">{isBn ? '⛺ হজের সকল দোয়া, আয়াত, হাদিস ও চেকলিস্ট একই সাথে' : '⛺ Hajj All Duas, Ayats & Checklists Together'}</h3>
              </div>

              {HAJJ_HOME_JOURNEY_STEPS.map((step: JourneyStep) => {
                return (
                  <div
                    key={step.id}
                    className={`p-6 rounded-3xl border shadow-xl space-y-5 ${
                      isDay ? 'bg-white border-slate-200' : 'bg-[#0a242a] border-[#16444e]'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-teal-900/40 pb-4">
                      <div>
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                          {isBn ? step.phaseBn : step.phaseEn}
                        </span>
                        <h4 className={`text-base sm:text-lg font-black ${isDay ? 'text-slate-900' : 'text-white'}`}>
                          {isBn ? step.titleBn : step.titleEn}
                        </h4>
                      </div>
                      {step.arabicTitle && (
                        <span className="font-arabic text-base text-emerald-600 dark:text-emerald-400 font-bold px-3 py-1 rounded-xl bg-emerald-500/10">
                          {step.arabicTitle}
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-emerald-300 leading-relaxed">
                      {isBn ? step.descriptionBn : step.descriptionEn}
                    </p>

                    {/* INDIVIDUAL ACTION CHECKLIST ITEMS */}
                    <div className="space-y-2.5 pt-1">
                      <div className="text-xs font-bold text-slate-500 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span>{isBn ? 'করণীয় চেকলিস্ট (প্রতিটি আলাদা টিক দিন):' : 'Action Checklist (Tick Individually):'}</span>
                      </div>
                      {(isBn ? step.actionChecklistBn : step.actionChecklistEn).map((act, aIdx) => {
                        const itemKey = `${step.id}_act_${aIdx}`;
                        const isItemChecked = !!actionCheckedState[itemKey];
                        return (
                          <div
                            key={aIdx}
                            onClick={() => toggleActionItem(step.id, aIdx)}
                            className={`p-3.5 rounded-2xl border text-xs sm:text-sm flex items-start gap-3 transition-all cursor-pointer select-none ${
                              isItemChecked
                                ? isDay ? 'bg-emerald-50 border-emerald-300 text-slate-900 opacity-90' : 'bg-emerald-950/30 border-emerald-500/40 text-emerald-100 opacity-90'
                                : isDay ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800' : 'bg-[#071d22] hover:bg-teal-950/40 border-teal-900/40 text-teal-100'
                            }`}
                          >
                            <button className="shrink-0 mt-0.5 pointer-events-none">
                              {isItemChecked ? (
                                <CheckSquare className="w-5 h-5 text-emerald-500" />
                              ) : (
                                <Square className="w-5 h-5 text-slate-400" />
                              )}
                            </button>
                            <span className={`leading-relaxed ${isItemChecked ? 'line-through text-slate-400 dark:text-teal-400' : ''}`}>{act}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* ESSENTIAL DUAS INCLUDED AT THE SAME TIME */}
                    {step.essentialDuas && step.essentialDuas.length > 0 && (
                      <div className="space-y-3 pt-2">
                        <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                          <BookOpen className="w-4 h-4 text-emerald-500" />
                          <span>{isBn ? 'এই ধাপের প্রয়োজনীয় সকল দোয়া:' : 'Essential Duas for this Step:'}</span>
                        </div>
                        {step.essentialDuas.map((dua, dIdx) => (
                          <div
                            key={dIdx}
                            className={`p-4 sm:p-5 rounded-2xl border space-y-3 shadow-md ${
                              isDay ? 'bg-emerald-50/80 border-emerald-200' : 'bg-[#082328] border-teal-500/30'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-xs sm:text-sm text-emerald-700 dark:text-emerald-300">
                                {isBn ? dua.titleBn : dua.titleEn}
                              </span>
                              <button
                                onClick={() => handleSpeakArabic(dua.arabic)}
                                className="px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 bg-emerald-600 text-white hover:bg-emerald-500 transition active:scale-95 cursor-pointer shadow-md"
                              >
                                <Volume2 className="w-4 h-4" />
                                <span>{isBn ? 'অডিও' : 'Audio'}</span>
                              </button>
                            </div>
                            <p dir="rtl" className="font-arabic text-xl sm:text-2xl text-right text-emerald-900 dark:text-emerald-100 leading-loose font-bold">
                              {dua.arabic}
                            </p>
                            <p className="text-xs font-mono italic text-slate-600 dark:text-emerald-200/90">
                              {dua.transliteration}
                            </p>
                            <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100">
                              <strong className="text-emerald-600">{isBn ? 'অর্থ: ' : 'Meaning: '}</strong>
                              {isBn ? dua.meaningBn : dua.meaningEn}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ======================================================= */}
      {/* 🎒 TAB 4: ESSENTIALS (MIQAT, MADINAH, PACKING)          */}
      {/* ======================================================= */}
      {activeTab === 'essentials_hub' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="space-y-3">
            <h3 className={`text-base font-bold px-1 ${isDay ? 'text-slate-900' : 'text-white'}`}>
              {isBn ? 'মিকাত ও বিমান যাত্রার নিয়মাবলী' : 'Miqat Locations & Air Travel Rules'}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

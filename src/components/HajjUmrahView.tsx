import React, { useState, useEffect } from 'react';
import {
  UMRAH_STEPS,
  HAJJ_DAYS_GUIDE,
  IHRAM_PROHIBITIONS,
  IHRAM_PROHIBITIONS_EN,
  MIQAT_LOCATIONS,
  MADINAH_ZIYARAH_PLACES,
  PILGRIM_PACKING_LIST,
  USEFUL_PILGRIM_PHRASES,
  HAJJ_TYPES_INFO,
  HajjStepItem,
} from '../data/hajjUmrahData';
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
  ArrowRightLeft,
  Play,
  Pause,
  Layers,
  Tv,
} from 'lucide-react';
import { soundHaptics } from '../utils/audioHaptics';
import { HAJJ_UMRAH_UI } from '../utils/appTranslations';

interface HajjUmrahViewProps {
  soundEnabled: boolean;
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
}

type HajjTab =
  | 'visual_studio'
  | 'hajj_map'
  | 'umrah'
  | 'hajj'
  | 'tracker'
  | 'hajj_types'
  | 'miqat'
  | 'madinah'
  | 'phrases'
  | 'packing'
  | 'prohibitions';

interface KaabaLandmark {
  id: string;
  nameEn: string;
  nameBn: string;
  arabic: string;
  descriptionEn: string;
  descriptionBn: string;
  ritualNoteEn: string;
  ritualNoteBn: string;
  posX: number;
  posY: number;
}

const KAABA_LANDMARKS: KaabaLandmark[] = [
  {
    id: 'hajar_aswad',
    nameEn: 'Black Stone (Hajar al-Aswad)',
    nameBn: 'হাজরে আসওয়াদ (কালো পাথর)',
    arabic: 'الحَجَرُ الأَسْوَدُ',
    descriptionEn: 'The heavenly stone sent from Jannah, set in a pure silver casing on the eastern corner of the Holy Kaaba.',
    descriptionBn: 'জান্নাত থেকে প্রেরিত পবিত্র কালো পাথর, যা কাবার পূর্ব কোণে রূপার ফ্রেমে স্থাপিত।',
    ritualNoteEn: 'Every Tawaf circuit MUST begin and conclude directly aligned with this stone. Raise your right hand toward it and say "Bismillahi Allahu Akbar" (Istilam).',
    ritualNoteBn: 'তাওয়াফের প্রতিটি চক্কর এখান থেকেই শুরু ও শেষ করতে হয়। সরাসরি চুম্বন করতে না পারলে হাত তুলে ইস্তিলাম ("বিসমিল্লাহি আল্লাহু আকবার") করতে হবে।',
    posX: 38,
    posY: 68,
  },
  {
    id: 'multazam',
    nameEn: 'Al-Multazam',
    nameBn: 'আল-মুলতাযাম (দোয়ার স্থান)',
    arabic: 'المُلْتَزَمُ',
    descriptionEn: 'The sacred 2-meter wall section of the Kaaba between the Black Stone and the Golden Door.',
    descriptionBn: 'হাজরে আসওয়াদ ও কাবার দরজার মধ্যবর্তী প্রায় ২ মিটার পবিত্র দেওয়াল।',
    ritualNoteEn: 'A prime place of answered prayers. The Prophet ﷺ pressed his chest, face, and forearms against it in humble supplication.',
    ritualNoteBn: 'এখানে দোয়া নিশ্চিত কবুল হয়। রাসুলুল্লাহ ﷺ এখানে বুক ও মুখমণ্ডল স্পর্শ করে আকুল হয়ে দোয়া করতেন।',
    posX: 34,
    posY: 80,
  },
  {
    id: 'door_kaaba',
    nameEn: 'Door of the Kaaba (Bab al-Kaaba)',
    nameBn: 'কাবার দরজা (বাব আল-কাবা)',
    arabic: 'بَابُ الكَعْبَةِ المشرَّفة',
    descriptionEn: 'The elevated pure gold door on the northeastern wall, 2.2 meters above the marble ground.',
    descriptionBn: 'কাবার উত্তর-পূর্ব দেওয়ালে অবস্থিত খাঁটি সোনার দরজা, যা মেঝে থেকে প্রায় ২.২ মিটার উঁচুতে স্থাপিত।',
    ritualNoteEn: 'Opens only for VIP state guests and official cleaning ceremonies using rose water and Zamzam.',
    ritualNoteBn: 'বিশেষ রাষ্ট্রীয় মেহমান ও বার্ষিক ধৌতকরণ অনুষ্ঠানের জন্য এটি উন্মুক্ত করা হয়।',
    posX: 49,
    posY: 52,
  },
  {
    id: 'maqam_ibrahim',
    nameEn: 'Station of Abraham (Maqam Ibrahim)',
    nameBn: 'মাকামে ইবরাহিম',
    arabic: 'مَقَامُ إِبْرَاهِيمَ',
    descriptionEn: 'The golden glass pavilion preserving the miraculous boulder with the footprints of Prophet Ibrahim (AS).',
    descriptionBn: 'হজরত ইবরাহিম (আ.)-এর পদচিহ্ন অঙ্কিত অলৌকিক পাথর সম্বলিত সোনালী গম্বুজাকৃতির মিনারেল।',
    ritualNoteEn: 'After completing 7 Tawaf circuits, pray 2 Rak\'ahs Sunnah prayer behind it (reciting Surah Al-Kafirun & Surah Al-Ikhlas).',
    ritualNoteBn: 'তাওয়াফের ৭ চক্কর শেষ করে এর পেছনে ২ রাকাত তাওয়াফের ওয়াজিব সালাত আদায় করা সুন্নাত।',
    posX: 64,
    posY: 62,
  },
  {
    id: 'hateem',
    nameEn: 'Hijr Isma\'il (Al-Hateem)',
    nameBn: 'হিজরে ইসমাইল বা হাতিম',
    arabic: 'حِجْرُ إِسْمَاعِيلَ (الحَطِيم)',
    descriptionEn: 'The semi-circular low marble wall on the northwest of the Kaaba, part of the original Kaaba foundation.',
    descriptionBn: 'কাবার উত্তর-পশ্চিম দিকের অর্ধচন্দ্রাকৃতির শ্বেতপাথরের দেওয়াল, যা মূলত কাবারই অংশ।',
    ritualNoteEn: 'Tawaf MUST be performed outside this semi-circle. Praying Nafl inside the Hateem carries the reward of praying inside the Kaaba!',
    ritualNoteBn: 'তাওয়াফের সময় অবশ্যই এর বাইরে দিয়ে ঘুরতে হবে (ভেতরে ঢোকা যাবে না)। তবে হাতিমের ভেতরে নফল নামাজ পড়া কাবার ভেতরে নামাজ পড়ার সমতুল্য!',
    posX: 70,
    posY: 38,
  },
  {
    id: 'rukn_yamani',
    nameEn: 'Yemeni Corner (Rukn Yamani)',
    nameBn: 'রুকনে ইয়ামানি (ইয়েমেনি কোণ)',
    arabic: 'الرُّكْنُ اليَمَانِي',
    descriptionEn: 'The southern corner of the Kaaba pointing toward Yemen.',
    descriptionBn: 'কাবার দক্ষিণ কোণ যা ইয়েমেনের দিকে মুখ করা।',
    ritualNoteEn: 'Touch it with the right hand if reachable without kissing or shouting. Recite "Rabbana atina fid-dunya hasanah..." from here to the Black Stone.',
    ritualNoteBn: 'সম্ভব হলে ডান হাত দিয়ে স্পর্শ করা সুন্নাত। এখান থেকে হাজরে আসওয়াদ পর্যন্ত "রাব্বানা আতিনা ফিদ্দুনিয়া..." পাঠ করতে হয়।',
    posX: 12,
    posY: 44,
  },
  {
    id: 'mizaab',
    nameEn: 'Golden Rain Gutter (Meezab-e-Rahmah)',
    nameBn: 'মিজাবে রহমত (স্বর্ণের পরনালা)',
    arabic: 'مِيزَابُ الرَّحْمَةِ',
    descriptionEn: 'The golden spout on the roof of the Kaaba directing rainwater into Hijr Isma\'il.',
    descriptionBn: 'কাবার ছাদের উপর স্থাপিত স্বর্ণের তৈরি পানির পরনালা, যার বৃষ্টির পানি হাতিমের ভেতরে পড়ে।',
    ritualNoteEn: 'Supplications made beneath this spout during rain are answered by Allah Almighty.',
    ritualNoteBn: 'বৃষ্টির সময় এই পরনালার নিচে দোয়া করা অত্যন্ত বরকতময় ও কবুলযোগ্য।',
    posX: 60,
    posY: 22,
  },
];

export const HajjUmrahView: React.FC<HajjUmrahViewProps> = ({
  soundEnabled,
  themeMode = 'night',
  selectedLanguage = 'bn',
}) => {
  const isDay = themeMode === 'day';
  const isBn = selectedLanguage === 'bn';
  const [activeTab, setActiveTab] = useState<HajjTab>('visual_studio');
  const [expandedStep, setExpandedStep] = useState<string>('umrah_1_ihram');
  const [selectedLandmark, setSelectedLandmark] = useState<KaabaLandmark>(KAABA_LANDMARKS[0]);
  const [activeHajjMapDay, setActiveHajjMapDay] = useState<number>(1);

  // Master Master Animation Engine State
  const [isMasterPlaying, setIsMasterPlaying] = useState<boolean>(true);
  const [orbitAngle, setOrbitAngle] = useState<number>(0);
  const [saiProgress, setSaiProgress] = useState<number>(0);
  const [saiDirection, setSaiDirection] = useState<'safa_to_marwah' | 'marwah_to_safa'>('safa_to_marwah');
  const [saiCurrentLap, setSaiCurrentLap] = useState<number>(1);
  const [animSpeed, setAnimSpeed] = useState<number>(1);

  // Live Tawaf & Sa'i Counter State
  const [tawafRound, setTawafRound] = useState<number>(() => {
    try {
      const s = localStorage.getItem('zikrmate_live_tawaf_round');
      return s ? parseInt(s, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [saiTrip, setSaiTrip] = useState<number>(() => {
    try {
      const s = localStorage.getItem('zikrmate_live_sai_trip');
      return s ? parseInt(s, 10) : 0;
    } catch {
      return 0;
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

  // Master Animation Loop (Kaaba Orbit & Sa'i walk together!)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isMasterPlaying) {
      interval = setInterval(() => {
        setOrbitAngle((prev) => (prev + 2 * animSpeed) % 360);
        setSaiProgress((prev) => {
          if (prev >= 100) {
            setSaiDirection((d) => (d === 'safa_to_marwah' ? 'marwah_to_safa' : 'safa_to_marwah'));
            setSaiCurrentLap((l) => (l >= 7 ? 1 : l + 1));
            return 0;
          }
          return prev + 1.2 * animSpeed;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isMasterPlaying, animSpeed]);

  useEffect(() => {
    try {
      localStorage.setItem('zikrmate_live_tawaf_round', String(tawafRound));
    } catch {}
  }, [tawafRound]);

  useEffect(() => {
    try {
      localStorage.setItem('zikrmate_live_sai_trip', String(saiTrip));
    } catch {}
  }, [saiTrip]);

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

  const prohibitionsList = isBn ? IHRAM_PROHIBITIONS : IHRAM_PROHIBITIONS_EN;

  // Realtime Tawaf Position Calculation & Zone Info
  const rad = (orbitAngle * Math.PI) / 180;
  const pilgrimX = 50 + 38 * Math.cos(rad);
  const pilgrimY = 50 + 32 * Math.sin(rad);

  const getLiveTawafZone = () => {
    if (orbitAngle >= 0 && orbitAngle < 90) {
      return {
        zoneNameBn: '১ম জোন: হাজরে আসওয়াদ ও মুলতাযাম',
        zoneNameEn: 'Zone 1: Black Stone & Multazam',
        actionBn: 'হাজরে আসওয়াদ বরাবর দাঁড়িয়ে ডান হাত তুলে ইস্তিলাম ("বিসমিল্লাহি আল্লাহু আকবার") করে চক্কর শুরু করুন।',
        actionEn: 'Align with Black Stone, raise right hand proclaiming "Bismillahi Allahu Akbar".',
        duaArabic: 'بِسْمِ اللَّهِ وَاللَّهُ أَكْبَرُ',
        badgeColor: 'bg-emerald-500 text-white',
      };
    } else if (orbitAngle >= 90 && orbitAngle < 180) {
      return {
        zoneNameBn: '২য় জোন: হিজরে ইসমাইল (হাতিম) প্রান্ত',
        zoneNameEn: 'Zone 2: Hijr Isma\'il (Hateem)',
        actionBn: 'হাতিমের অর্ধচন্দ্রাকৃতির দেওয়ালের বাইরে দিয়ে প্রদক্ষিণ করুন (ভেতরে ঢোকা যাবে না)।',
        actionEn: 'Circumambulate outside the semi-circular Hateem wall.',
        duaArabic: 'سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ',
        badgeColor: 'bg-amber-500 text-slate-950 font-bold',
      };
    } else if (orbitAngle >= 180 && orbitAngle < 270) {
      return {
        zoneNameBn: '৩য় জোন: রুকনে শামী ও ইরাকী কোণ',
        zoneNameEn: 'Zone 3: Shami & Iraqi Corners',
        actionBn: 'নীরবে জিকির, ইস্তিগফার ও কুরআন তিলাওয়াত অব্যাহত রাখুন।',
        actionEn: 'Engage in continuous silent remembrance, Istighfar, and Quran recitation.',
        duaArabic: 'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ وَأَتُوبُ إِلَيْهِ',
        badgeColor: 'bg-teal-500 text-white',
      };
    } else {
      return {
        zoneNameBn: '৪র্থ জোন: রুকনে ইয়ামানি থেকে হাজরে আসওয়াদ',
        zoneNameEn: 'Zone 4: Yemeni Corner to Black Stone',
        actionBn: 'রুকনে ইয়ামানি ডান হাতে স্পর্শ করুন। "রাব্বানা আতিনা ফিদ্দুনিয়া..." দোয়াটি পড়ুন।',
        actionEn: 'Touch Rukn Yamani. Recite the comprehensive Quranic supplication.',
        duaArabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
        badgeColor: 'bg-emerald-600 text-white',
      };
    }
  };

  const currentZone = getLiveTawafZone();
  const isSaiGreenZone = saiProgress >= 35 && saiProgress <= 65;

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
              <span>الحَجُّ وَالعُمْرَةُ • Unified Live Animation Studio</span>
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

      {/* Navigation Subtabs */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-200 dark:bg-[#092226] border border-slate-300 dark:border-[#14424a] overflow-x-auto no-scrollbar">
        <button
          onClick={() => {
            setActiveTab('visual_studio');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`py-2 px-3.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
            activeTab === 'visual_studio'
              ? 'bg-amber-500 text-slate-950 shadow-md font-black'
              : 'text-slate-600 dark:text-teal-200 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Tv className="w-4 h-4" />
          <span>{isBn ? '🎬 লাইভ অ্যানিমেশন স্টুডিও (সব এক সাথে)' : '🎬 Live Animation Studio (All-in-One)'}</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('hajj_map');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`py-2 px-3.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
            activeTab === 'hajj_map'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-600 dark:text-teal-200 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-amber-300" />
          <span>{isBn ? 'হজের ৫ দিনের রুট ম্যাপ' : '5 Days Hajj Route Map'}</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('umrah');
            setExpandedStep('umrah_1_ihram');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`py-2 px-3.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
            activeTab === 'umrah'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-600 dark:text-teal-200 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <span>📜</span>
          <span>{HAJJ_UMRAH_UI.tabUmrah[selectedLanguage]}</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('hajj');
            setExpandedStep('hajj_day_1');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`py-2 px-3.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
            activeTab === 'hajj'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-600 dark:text-teal-200 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>{HAJJ_UMRAH_UI.tabHajj[selectedLanguage]}</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('tracker');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`py-2 px-3.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
            activeTab === 'tracker'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-600 dark:text-teal-200 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Footprints className="w-3.5 h-3.5 text-amber-300" />
          <span>{HAJJ_UMRAH_UI.tabTracker[selectedLanguage]}</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('hajj_types');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`py-2 px-3.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
            activeTab === 'hajj_types'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-600 dark:text-teal-200 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <ArrowRightLeft className="w-3.5 h-3.5" />
          <span>{isBn ? 'হজের ৩ প্রকার' : '3 Types of Hajj'}</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('miqat');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`py-2 px-3.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
            activeTab === 'miqat'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-600 dark:text-teal-200 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Plane className="w-3.5 h-3.5" />
          <span>{HAJJ_UMRAH_UI.tabMiqat[selectedLanguage]}</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('madinah');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`py-2 px-3.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
            activeTab === 'madinah'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-600 dark:text-teal-200 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>{HAJJ_UMRAH_UI.tabMadinah[selectedLanguage]}</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('phrases');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`py-2 px-3.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
            activeTab === 'phrases'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-600 dark:text-teal-200 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Languages className="w-3.5 h-3.5" />
          <span>{isBn ? 'প্রয়োজনীয় আরবি ও হেল্পলাইন' : 'Arabic Phrases & Helpline'}</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('packing');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`py-2 px-3.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
            activeTab === 'packing'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-600 dark:text-teal-200 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Luggage className="w-3.5 h-3.5" />
          <span>{HAJJ_UMRAH_UI.tabPacking[selectedLanguage]}</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('prohibitions');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`py-2 px-3.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
            activeTab === 'prohibitions'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-600 dark:text-teal-200 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>{HAJJ_UMRAH_UI.tabProhibitions[selectedLanguage]}</span>
        </button>
      </div>

      {/* ========================================== */}
      {/* 🎬 MASTER ALL-IN-ONE VISUAL ANIMATION STUDIO */}
      {/* ========================================== */}
      {activeTab === 'visual_studio' && (
        <div className="space-y-6">
          {/* Master Control Bar */}
          <div
            className={`p-4 sm:p-5 rounded-3xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
              isDay ? 'bg-white border-slate-200 shadow-md' : 'bg-[#0a242a] border-[#16444e]'
            }`}
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-400 animate-ping" />
                <h3 className={`text-base sm:text-lg font-black ${isDay ? 'text-slate-900' : 'text-white'}`}>
                  {isBn ? 'হজ ও ওমরাহর লাইভ অ্যানিমেশন ড্যাশবোর্ড' : 'Unified Live Animation Studio'}
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-teal-300 mt-0.5">
                {isBn
                  ? 'তাওয়াফ ও সাঈর অ্যানিমেশন একই সাথে লাইভ প্লে হচ্ছে — কেবল স্ক্রিনটি দেখুন'
                  : 'Kaaba Tawaf orbit and Safa-Marwah Sa\'i walk playing simultaneously in real-time'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setAnimSpeed((s) => (s === 1 ? 1.5 : s === 1.5 ? 2 : 1))}
                className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-[#071d22] text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 border border-slate-200 dark:border-teal-900/40 cursor-pointer"
              >
                Speed: {animSpeed}x
              </button>

              <button
                onClick={() => {
                  setIsMasterPlaying((p) => !p);
                  if (soundEnabled) soundHaptics.playTap();
                }}
                className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-lg active:scale-95 ${
                  isMasterPlaying
                    ? 'bg-amber-500 text-slate-950 font-black'
                    : 'bg-emerald-600 text-white hover:bg-emerald-500'
                }`}
              >
                {isMasterPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isMasterPlaying ? (isBn ? 'সব অ্যানিমেশন থামান' : 'Pause All') : (isBn ? 'সব অ্যানিমেশন চালান' : 'Play All')}</span>
              </button>
            </div>
          </div>

          {/* TWO SIDE-BY-SIDE LIVE ANIMATION PANELS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* PANEL A: KAABA TAWAF LIVE ORBIT */}
            <div
              className={`p-5 rounded-3xl border shadow-xl flex flex-col justify-between space-y-4 ${
                isDay ? 'bg-slate-900 text-white border-slate-800' : 'bg-[#06181b] text-white border-[#103b42]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🕋</span>
                  <span>{isBn ? '১. কাবার তাওয়াফ অ্যানিমেশন' : '1. Kaaba Tawaf Animation'}</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">
                  {Math.round(orbitAngle)}°
                </span>
              </div>

              {/* Kaaba Canvas */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 border border-emerald-500/30 rounded-full animate-spin-slow" />
                <div className="absolute inset-6 border border-dashed border-teal-400/30 rounded-full" />

                {/* Pilgrim Icon */}
                <div
                  className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-75 pointer-events-none flex flex-col items-center"
                  style={{
                    left: `${pilgrimX}%`,
                    top: `${pilgrimY}%`,
                  }}
                >
                  <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] flex items-center justify-center shadow-lg animate-bounce">
                    🚶
                  </div>
                </div>

                {/* Kaaba Core */}
                <div className="relative z-10 w-24 h-24 bg-slate-950 border border-amber-400/80 rounded-xl shadow-xl flex flex-col items-center justify-center p-1">
                  <div className="w-full h-1.5 bg-amber-400 rounded mb-1" />
                  <span className="text-xl">🕋</span>
                  <span className="text-[8px] font-bold text-amber-200">KAABA</span>
                </div>
              </div>

              {/* Realtime Zone Commentary Card */}
              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${currentZone.badgeColor}`}>
                    {isBn ? currentZone.zoneNameBn : currentZone.zoneNameEn}
                  </span>
                  <button
                    onClick={() => handleSpeakArabic(currentZone.duaArabic)}
                    className="p-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-amber-300 cursor-pointer"
                    title="Listen Dua"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-slate-200 leading-relaxed">{isBn ? currentZone.actionBn : currentZone.actionEn}</p>
                <div dir="rtl" className="font-arabic text-right text-amber-300 text-sm font-bold pt-1 border-t border-slate-700">
                  {currentZone.duaArabic}
                </div>
              </div>
            </div>

            {/* PANEL B: SAFA-MARWAH SA'I WALK LIVE ANIMATION */}
            <div
              className={`p-5 rounded-3xl border shadow-xl flex flex-col justify-between space-y-4 ${
                isDay ? 'bg-white text-slate-900 border-slate-200' : 'bg-[#0a242a] text-white border-[#16444e]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span>⛰️</span>
                  <span>{isBn ? '২. সাফা-মারওয়া সাঈ অ্যানিমেশন' : '2. Safa-Marwah Sa\'i Animation'}</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-lg bg-teal-500/20 text-teal-700 dark:text-teal-300 font-mono text-[10px] font-bold">
                  {isBn ? `চক্কর ${saiCurrentLap} / ৭` : `Lap ${saiCurrentLap} / 7`}
                </span>
              </div>

              {/* Visual Sa'i Track */}
              <div className="space-y-3 py-4">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-emerald-600 dark:text-emerald-400">🏔️ SAFA</span>
                  <span className="text-green-600 dark:text-green-400">
                    {isSaiGreenZone ? (isBn ? '⚡ সবুজ বাতি (দৌড়ান!)' : '⚡ GREEN LIGHTS (JOG!)') : (isBn ? 'স্বাভাবিক হাঁটা' : 'Normal Walk')}
                  </span>
                  <span className="text-teal-600 dark:text-teal-400">MARWAH 🏔️</span>
                </div>

                <div className="relative my-4">
                  <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex">
                    <div className="w-[35%] bg-slate-300 dark:bg-slate-700" />
                    <div className="w-[30%] bg-green-500/40 relative">
                      <div className="absolute inset-0 bg-green-400/60 animate-pulse" />
                    </div>
                    <div className="w-[35%] bg-slate-300 dark:bg-slate-700" />
                  </div>

                  {/* Moving Pilgrim */}
                  <div
                    className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 transition-all duration-75 flex flex-col items-center pointer-events-none"
                    style={{
                      left: `${saiDirection === 'safa_to_marwah' ? saiProgress : 100 - saiProgress}%`,
                    }}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-xs shadow-lg transition-all ${
                        isSaiGreenZone
                          ? 'bg-green-500 text-white scale-125 ring-4 ring-green-400/40 animate-bounce'
                          : 'bg-amber-500 text-slate-950 scale-100'
                      }`}
                    >
                      {isSaiGreenZone ? '🏃' : '🚶'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sa'i Commentary Card */}
              <div
                className={`p-3.5 rounded-2xl border text-xs space-y-2 ${
                  isDay ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-[#07191d] border-teal-900/40 text-teal-100'
                }`}
              >
                <div className="font-bold text-teal-600 dark:text-teal-400">
                  {saiDirection === 'safa_to_marwah' ? (isBn ? 'অভিমুখ: সাফা থেকে মারওয়া' : 'Direction: Safa to Marwah') : (isBn ? 'অভিমুখ: মারওয়া থেকে সাফা' : 'Direction: Marwah to Safa')}
                </div>
                <p className="leading-relaxed">
                  {isBn
                    ? 'সাফা ও মারওয়া পাহাড়ের মাঝে মোট ৭টি ট্রিপ সম্পন্ন করতে হয়। পুরুষরা সবুজ বাতির নির্দিষ্ট জোনে দ্রুতগতিতে জগিং করবেন।'
                    : 'Complete 7 total trips between Safa and Marwah. Men jog briskly between the two green light markers.'}
                </p>
                <div dir="rtl" className="font-arabic text-right text-emerald-700 dark:text-emerald-300 font-bold">
                  إِنَّ الصَّفَا وَالْمَرْوَةَ مِن شَعَائِرِ اللَّهِ
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. FIVE DAYS HAJJ VISUAL ROUTE MAP */}
      {activeTab === 'hajj_map' && (
        <div className="space-y-4">
          <div
            className={`p-5 rounded-3xl border shadow-md space-y-4 ${
              isDay ? 'bg-white border-slate-200' : 'bg-[#0a242a] border-[#16444e]'
            }`}
          >
            <div>
              <h3 className={`text-base font-bold ${isDay ? 'text-slate-900' : 'text-white'}`}>
                {isBn ? 'হজের ৫ দিনের পবিত্র সফরপথ ও রুটম্যাপ' : 'Interactive 5 Days of Hajj Pilgrim Journey'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-teal-300">
                {isBn
                  ? 'নিচের তারিখগুলোতে ক্লিক করে প্রতিদিনের ভৌগোলিক অবস্থান ও যাত্রা দেখুন'
                  : 'Click on any day to see the exact geographical movements and encampments'}
              </p>
            </div>

            {/* Day Selector Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { day: 1, titleBn: '৮ই জিলহজ', titleEn: '8th Dhul Hijjah', locBn: 'মিনা তাঁবু', locEn: 'Mina Tents' },
                { day: 2, titleBn: '৯ই জিলহজ (দিন)', titleEn: '9th Dhul Hijjah (Day)', locBn: 'আরাফাতের ময়দান', locEn: 'Plains of Arafah' },
                { day: 3, titleBn: '৯ই জিলহজ (রাত)', titleEn: '9th Dhul Hijjah (Night)', locBn: 'মুজদালিফা', locEn: 'Muzdalifah' },
                { day: 4, titleBn: '১০ই জিলহজ', titleEn: '10th Dhul Hijjah', locBn: 'জামারাত ও মক্কা', locEn: 'Jamarat & Makkah' },
                { day: 5, titleBn: '১১-১৩ই জিলহজ', titleEn: '11-13th Tashreeq', locBn: 'মিনা ও বিদায়ী তাওয়াফ', locEn: 'Mina & Farewell' },
              ].map((item) => (
                <button
                  key={item.day}
                  onClick={() => {
                    setActiveHajjMapDay(item.day);
                    if (soundEnabled) soundHaptics.playTap();
                  }}
                  className={`p-3 rounded-2xl border text-center transition cursor-pointer active:scale-95 ${
                    activeHajjMapDay === item.day
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-md font-bold'
                      : isDay
                      ? 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                      : 'bg-[#07191d] hover:bg-teal-950/40 text-teal-200 border-teal-900/40'
                  }`}
                >
                  <div className="text-xs font-bold">{isBn ? item.titleBn : item.titleEn}</div>
                  <div className="text-[10px] opacity-80 mt-0.5">{isBn ? item.locBn : item.locEn}</div>
                </button>
              ))}
            </div>

            {/* Visual Route Flow Diagram */}
            <div
              className={`p-5 sm:p-6 rounded-3xl border ${
                isDay ? 'bg-slate-50 border-slate-200' : 'bg-[#071a1e] border-teal-900/40'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
                <div
                  className={`p-3.5 rounded-2xl border flex-1 w-full ${
                    activeHajjMapDay === 1
                      ? 'bg-emerald-600 text-white font-bold ring-4 ring-emerald-400/30'
                      : 'bg-white dark:bg-[#092226] text-slate-700 dark:text-teal-200'
                  }`}
                >
                  <span className="text-xl">⛺</span>
                  <div className="text-xs font-bold mt-1">MINA (৮ই জিলহজ)</div>
                  <div className="text-[10px] opacity-80">৫ ওয়াক্ত কসর নামাজ</div>
                </div>

                <span className="text-slate-400 font-bold hidden sm:inline">➔</span>

                <div
                  className={`p-3.5 rounded-2xl border flex-1 w-full ${
                    activeHajjMapDay === 2
                      ? 'bg-emerald-600 text-white font-bold ring-4 ring-emerald-400/30'
                      : 'bg-white dark:bg-[#092226] text-slate-700 dark:text-teal-200'
                  }`}
                >
                  <span className="text-xl">🏔️</span>
                  <div className="text-xs font-bold mt-1">ARAFAH (৯ই দিন)</div>
                  <div className="text-[10px] opacity-80">হজের মূল রুকন</div>
                </div>

                <span className="text-slate-400 font-bold hidden sm:inline">➔</span>

                <div
                  className={`p-3.5 rounded-2xl border flex-1 w-full ${
                    activeHajjMapDay === 3
                      ? 'bg-emerald-600 text-white font-bold ring-4 ring-emerald-400/30'
                      : 'bg-white dark:bg-[#092226] text-slate-700 dark:text-teal-200'
                  }`}
                >
                  <span className="text-xl">🌌</span>
                  <div className="text-xs font-bold mt-1">MUZDALIFAH (৯ই রাত)</div>
                  <div className="text-[10px] opacity-80">রাতযাপন ও কঙ্কর</div>
                </div>

                <span className="text-slate-400 font-bold hidden sm:inline">➔</span>

                <div
                  className={`p-3.5 rounded-2xl border flex-1 w-full ${
                    activeHajjMapDay === 4 || activeHajjMapDay === 5
                      ? 'bg-emerald-600 text-white font-bold ring-4 ring-emerald-400/30'
                      : 'bg-white dark:bg-[#092226] text-slate-700 dark:text-teal-200'
                  }`}
                >
                  <span className="text-xl">🕋</span>
                  <div className="text-xs font-bold mt-1">JAMARAT &amp; MAKKAH</div>
                  <div className="text-[10px] opacity-80">রমি, হলক ও তাওয়াফ</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. UMRAH or HAJJ ACCORDION LIST */}
      {(activeTab === 'umrah' || activeTab === 'hajj') && (
        <div className="space-y-3">
          {(activeTab === 'umrah' ? UMRAH_STEPS : HAJJ_DAYS_GUIDE).map((step: HajjStepItem) => {
            const isExpanded = expandedStep === step.id;
            const stageLabel = isBn ? step.dayOrStageBn : (step.dayOrStageEn || step.dayOrStageBn);
            const titleLabel = isBn ? step.titleBn : (step.titleEn || step.titleBn);
            const summaryLabel = isBn ? step.summaryBn : (step.summaryEn || step.summaryBn);
            const actions = (isBn ? step.actionItems : (step.actionItemsEn || step.actionItems)) || [];
            const mistakes = (isBn ? step.mistakesToAvoidBn : (step.mistakesToAvoidEn || step.mistakesToAvoidBn)) || [];

            return (
              <div
                key={step.id}
                className={`rounded-3xl border shadow-md overflow-hidden transition-all ${
                  isDay ? 'bg-white border-slate-200' : 'bg-[#0a242a] border-[#16444e]'
                }`}
              >
                <button
                  onClick={() => {
                    setExpandedStep(isExpanded ? '' : step.id);
                    if (soundEnabled) soundHaptics.playTap();
                  }}
                  className={`w-full p-4 sm:p-5 flex items-center justify-between text-left transition cursor-pointer ${
                    isDay ? 'hover:bg-slate-50' : 'hover:bg-teal-950/40'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span className="px-2.5 py-1 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold text-xs font-mono shrink-0 shadow-sm">
                      {stageLabel}
                    </span>
                    <div className="min-w-0">
                      <h3 className={`text-sm sm:text-base font-bold truncate ${isDay ? 'text-slate-900' : 'text-white'}`}>
                        {titleLabel}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-teal-300/80 truncate mt-0.5">
                        {summaryLabel}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {step.arabicTitle && (
                      <span className="hidden md:inline font-arabic text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                        {step.arabicTitle}
                      </span>
                    )}
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="p-4 sm:p-6 pt-0 space-y-4 border-t border-slate-100 dark:border-teal-900/30 text-xs sm:text-sm animate-in fade-in duration-150">
                    {step.arabicTitle && (
                      <div className="pt-3 text-center">
                        <span className="inline-block px-4 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 font-arabic text-sm text-emerald-600 dark:text-emerald-300 font-bold">
                          {step.arabicTitle}
                        </span>
                      </div>
                    )}

                    {/* Sequential Actions */}
                    <div className="space-y-2">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{HAJJ_UMRAH_UI.actionItemsTitle[selectedLanguage]}</span>
                      </h4>
                      <div className="space-y-2">
                        {actions.map((act, aIdx) => (
                          <div
                            key={aIdx}
                            className={`p-3 rounded-2xl border flex items-start gap-2.5 ${
                              isDay
                                ? 'bg-slate-50 border-slate-200 text-slate-800'
                                : 'bg-[#071d22] border-teal-900/40 text-teal-100'
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

                    {/* Common Mistakes to Avoid */}
                    {mistakes.length > 0 && (
                      <div className="space-y-2 pt-1">
                        <h4 className="font-bold text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4" />
                          <span>{HAJJ_UMRAH_UI.mistakesTitle[selectedLanguage]}</span>
                        </h4>
                        <div className="space-y-1.5">
                          {mistakes.map((m, mIdx) => (
                            <div
                              key={mIdx}
                              className={`p-2.5 rounded-2xl border text-xs flex items-start gap-2 ${
                                isDay
                                  ? 'bg-amber-50/60 border-amber-200 text-amber-900'
                                  : 'bg-amber-950/20 border-amber-900/40 text-amber-200'
                              }`}
                            >
                              <span className="text-amber-500 font-bold">•</span>
                              <span className="leading-relaxed">{m}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Essential Duas */}
                    {step.essentialDuas && step.essentialDuas.length > 0 && (
                      <div className="space-y-3 pt-2">
                        <h4 className="font-bold text-xs uppercase tracking-wider text-teal-600 dark:text-teal-400 flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-amber-400" />
                          <span>{isBn ? 'এই ধাপের প্রয়োজনীয় দোয়াসমূহ' : 'Essential Supplications for this Stage'}</span>
                        </h4>

                        {step.essentialDuas.map((dua, dIdx) => (
                          <div
                            key={dIdx}
                            className={`p-4 rounded-2xl border space-y-2.5 ${
                              isDay
                                ? 'bg-emerald-50/60 border-emerald-200'
                                : 'bg-[#092b30] border-teal-800/40'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-bold text-xs text-emerald-700 dark:text-emerald-300">
                                {isBn ? dua.titleBn : dua.titleEn}
                              </span>
                              <button
                                onClick={() => handleSpeakArabic(dua.arabic)}
                                className={`px-2.5 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition active:scale-95 cursor-pointer ${
                                  isDay
                                    ? 'bg-white text-emerald-800 shadow-sm hover:bg-emerald-100'
                                    : 'bg-[#071a1d] text-teal-200 hover:bg-teal-900/50'
                                }`}
                              >
                                <Volume2 className="w-3.5 h-3.5 text-emerald-500" />
                                <span>{HAJJ_UMRAH_UI.listenArabic[selectedLanguage]}</span>
                              </button>
                            </div>

                            <p
                              dir="rtl"
                              className="font-arabic text-lg sm:text-xl text-right text-emerald-900 dark:text-emerald-100 leading-loose py-1"
                            >
                              {dua.arabic}
                            </p>

                            <p className="text-xs text-slate-500 dark:text-teal-300/80 italic font-mono">
                              {dua.transliteration}
                            </p>

                            <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 pt-1 border-t border-emerald-200/50 dark:border-teal-900/40">
                              <strong className="text-emerald-600 dark:text-emerald-400">
                                {isBn ? 'অর্থ: ' : 'Meaning: '}
                              </strong>
                              {isBn ? dua.meaningBn : dua.meaningEn}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* 4. LIVE TAWAF & SA'I TRACKER */}
      {activeTab === 'tracker' && (
        <div className="space-y-5">
          {/* Tawaf Counter Box */}
          <div
            className={`p-5 sm:p-6 rounded-3xl border shadow-xl space-y-4 ${
              isDay ? 'bg-white border-slate-200' : 'bg-[#0a242a] border-[#16444e]'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🕋</span>
                <div>
                  <h3 className={`text-sm sm:text-base font-bold ${isDay ? 'text-slate-900' : 'text-white'}`}>
                    {HAJJ_UMRAH_UI.tawafCounterTitle[selectedLanguage]}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-teal-300">
                    {isBn
                      ? 'হাজরে আসওয়াদ থেকে শুরু করে ৭ চক্কর কাউন্ট করুন'
                      : 'Track your 7 counter-clockwise circuits starting from the Black Stone line'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setTawafRound(0);
                  if (soundEnabled) soundHaptics.playTap();
                }}
                className={`p-2 rounded-xl border text-xs flex items-center gap-1 transition cursor-pointer active:scale-95 ${
                  isDay ? 'bg-slate-100 hover:bg-slate-200 text-slate-600' : 'bg-[#081f24] hover:bg-teal-900/50 text-teal-300 border-teal-800/40'
                }`}
                title={HAJJ_UMRAH_UI.reset[selectedLanguage]}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{HAJJ_UMRAH_UI.reset[selectedLanguage]}</span>
              </button>
            </div>

            {/* Circuit Progress Meter */}
            <div className="flex items-center justify-center gap-2 py-3">
              {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                <div
                  key={num}
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center font-mono font-bold text-xs sm:text-sm transition-all ${
                    num <= tawafRound
                      ? 'bg-emerald-600 text-white shadow-md scale-105'
                      : isDay
                      ? 'bg-slate-100 text-slate-400 border border-slate-200'
                      : 'bg-[#071d22] text-teal-500 border border-teal-900/50'
                  }`}
                >
                  {num}
                </div>
              ))}
            </div>

            {/* Current Round Guidance */}
            <div
              className={`p-4 rounded-2xl border text-xs sm:text-sm ${
                tawafRound >= 7
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-700 dark:text-emerald-300 font-bold'
                  : isDay
                  ? 'bg-slate-50 border-slate-200 text-slate-800'
                  : 'bg-[#071d22] border-teal-900/40 text-teal-100'
              }`}
            >
              {tawafRound >= 7 ? (
                <div className="space-y-1 text-center">
                  <div className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                    🎉 {isBn ? 'আলহামদুলিল্লাহ! ৭ চক্কর তাওয়াফ সম্পন্ন হয়েছে!' : 'Alhamdulillah! All 7 circuits completed!'}
                  </div>
                  <p className="text-xs font-normal">
                    {isBn
                      ? 'এখন ডান কাঁধ ঢেকে মাকামে ইবরাহিমের পেছনে ২ রাকাত নামাজ আদায় করুন এবং প্রাণভরে জমজম পানি পান করুন।'
                      : 'Now cover your right shoulder, pray 2 Rak\'ahs behind Maqam Ibrahim, and drink Zamzam water before proceeding to Sa\'i.'}
                  </p>
                </div>
              ) : (
                <div>
                  <strong>
                    {HAJJ_UMRAH_UI.circuit[selectedLanguage]} {tawafRound + 1} / 7:{' '}
                  </strong>
                  {tawafRound < 3
                    ? isBn
                      ? 'পুরুষরা দ্রুত পদক্ষেপে (রমল) চলুন। রুকনে ইয়ামানি ও হাজরে আসওয়াদের মাঝে "রাব্বানা আতিনা..." দোয়া পড়ুন।'
                      : 'Men perform Raml (brisk walk). Recite "Rabbana atina fid-dunya hasanah..." between the Yemeni Corner and Black Stone.'
                    : isBn
                    ? 'স্বাভাবিক পদক্ষেপে চলুন। অধিক পরিমাণে জিকির, কুরআন তিলাওয়াত ও আন্তরিক দোয়া করুন।'
                    : 'Walk normally. Engage in abundant remembrance of Allah, Quran recitation, and heartfelt supplication.'}
                </div>
              )}
            </div>

            {/* Action Increment Button */}
            {tawafRound < 7 && (
              <button
                type="button"
                onClick={() => {
                  if (tawafRound < 7) {
                    const next = tawafRound + 1;
                    setTawafRound(next);
                    if (soundEnabled) {
                      if (next === 7) soundHaptics.playMilestone();
                      else soundHaptics.playTap();
                    }
                  }
                }}
                className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {HAJJ_UMRAH_UI.completeRound[selectedLanguage]} ({tawafRound + 1} / 7)
                </span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* 5. HAJJ TYPES COMPARISON MATRIX */}
      {activeTab === 'hajj_types' && (
        <div className="space-y-4">
          <div
            className={`p-4 rounded-2xl border text-xs sm:text-sm ${
              isDay ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950' : 'bg-[#092b30] border-teal-800/40 text-teal-100'
            }`}
          >
            <div className="font-bold flex items-center gap-1.5 mb-1">
              <Info className="w-4 h-4 text-emerald-500" />
              <span>{isBn ? 'হজের ৩টি প্রধান প্রকার ও পার্থক্য:' : 'The 3 Distinct Types of Hajj:'}</span>
            </div>
            <p className="leading-relaxed">
              {isBn
                ? 'ইসলামী শরিয়তে হজের ৩টি পদ্ধতি রয়েছে। বাংলাদেশ ও আন্তর্জাতিক হাজীদের জন্য হজে তামাত্তু সর্বাধিক সহজ ও গ্রহণযোগ্য। নিচে ৩টি প্রকারের পুঙ্খানুপুঙ্খ বিবরণ দেওয়া হলো:'
                : 'There are three methods of performing Hajj in Islamic jurisprudence. Hajj Tamattu\' is the most common and recommended for international pilgrims traveling from abroad.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {HAJJ_TYPES_INFO.map((ht) => (
              <div
                key={ht.id}
                className={`p-5 rounded-3xl border shadow-md flex flex-col justify-between gap-3 ${
                  isDay ? 'bg-white border-slate-200' : 'bg-[#0a242a] border-[#16444e]'
                }`}
              >
                <div>
                  <span className="inline-block px-2.5 py-1 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold text-[11px] mb-2">
                    {isBn ? ht.badgeBn : ht.badgeEn}
                  </span>
                  <h4 className={`text-base font-bold ${isDay ? 'text-slate-900' : 'text-white'}`}>
                    {isBn ? ht.nameBn : ht.nameEn}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    {isBn ? ht.descBn : ht.descEn}
                  </p>
                </div>

                <div
                  className={`p-2.5 rounded-xl border text-xs font-bold ${
                    ht.sacrificeRequired
                      ? isDay
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : 'bg-amber-950/30 text-amber-300 border-amber-800/40'
                      : isDay
                      ? 'bg-slate-100 text-slate-600 border-slate-200'
                      : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  {ht.sacrificeRequired
                    ? isBn
                      ? '🐑 দমে শোকর (কুরবানি) ওয়াজিব'
                      : '🐑 Sacrificial Animal (Hady) Required'
                    : isBn
                    ? '🚫 কুরবানি আবশ্যক নয়'
                    : '🚫 No Sacrifice Required'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. MIQAT LOCATIONS & AIR TRAVEL RULES */}
      {activeTab === 'miqat' && (
        <div className="space-y-4">
          <div
            className={`p-4 rounded-2xl border text-xs sm:text-sm ${
              isDay ? 'bg-amber-50/70 border-amber-200 text-amber-900' : 'bg-amber-950/20 border-amber-900/40 text-amber-200'
            }`}
          >
            <div className="font-bold flex items-center gap-1.5 mb-1">
              <Plane className="w-4 h-4 text-amber-500" />
              <span>{isBn ? 'বিমানে ভ্রমণের ক্ষেত্রে মিকাতের জরুরি নিয়ম:' : 'Crucial Miqat Rules for Air Travelers:'}</span>
            </div>
            <p className="leading-relaxed">
              {isBn
                ? 'ঢাকা বা নিজ দেশ থেকে সরাসরি জেদ্দা ফ্লাইটে বিমানে ওঠার পূর্বেই বিমানবন্দরে ইহরামের কাপড় পরে নেওয়া উত্তম। বিমান জেদ্দা পৌঁছানোর প্রায় ৩০ মিনিট আগে পাইলট মিকাত অতিক্রমের ঘোষণা দেন। সেই সময় বিমানে বসে ওমরাহর নিয়ত ও তালবিয়াহ পাঠ করতে হবে।'
                : 'When flying directly to Jeddah, put on your unstitched Ihram garments at your departure airport before boarding. When the pilot announces 20-30 minutes before crossing the Miqat line, make your oral Niyyah and begin reciting the Talbiyah in your seat.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {MIQAT_LOCATIONS.map((miqat) => (
              <div
                key={miqat.id}
                className={`p-5 rounded-3xl border shadow-md space-y-2.5 ${
                  isDay ? 'bg-white border-slate-200' : 'bg-[#0a242a] border-[#16444e]'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <h4 className={`text-sm sm:text-base font-bold ${isDay ? 'text-slate-900' : 'text-white'}`}>
                    {miqat.name}
                  </h4>
                  <span className="font-arabic text-sm text-emerald-600 dark:text-emerald-400 font-bold">
                    {miqat.arabic}
                  </span>
                </div>

                <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
                  📍 {miqat.distanceFromMakkah}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {isBn ? miqat.designatedForBn : miqat.designatedFor}
                </p>

                <div
                  className={`p-2.5 rounded-xl border text-[11px] leading-relaxed ${
                    isDay ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-[#07191d] border-teal-900/40 text-teal-200'
                  }`}
                >
                  <strong className="text-emerald-600 dark:text-teal-300">
                    {isBn ? 'নির্দেশনা: ' : 'Guide: '}
                  </strong>
                  {isBn ? miqat.airTravelNoteBn : miqat.airTravelNote}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. MADINAH & SACRED ZIYARAH GUIDE */}
      {activeTab === 'madinah' && (
        <div className="space-y-4">
          <div
            className={`p-4 rounded-2xl border text-xs sm:text-sm ${
              isDay ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900' : 'bg-[#072429] border-emerald-900/40 text-emerald-200'
            }`}
          >
            <div className="font-bold flex items-center gap-1.5 mb-1">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{isBn ? 'মদিনা মুনাওয়ারায় অবস্থানের আদব ও শিষ্টাচার:' : 'Virtues & Etiquettes of Madinah al-Munawwarah:'}</span>
            </div>
            <p className="leading-relaxed">
              {isBn
                ? 'মদিনা শরিফ হলো প্রিয় নবী হযরত মুহাম্মদ ﷺ-এর শহর। এখানে অবস্থানকালে অত্যন্ত বিনম্রতা, ভক্তি ও নিম্নস্বরে চলাফেরা করা বাঞ্ছনীয়। মসজিদে নববীতে এক রাকাত নামাজ সাধারণ মসজিদের চেয়ে ১,০০০ গুণ বেশি সওয়াব বহন করে।'
                : 'Madinah is the illuminated sanctuary of Prophet Muhammad ﷺ. Prayers in Masjid an-Nabawi carry 1,000 times greater reward. Walk with deep humbleness, avoid shouting, and send continuous Salawat.'}
            </p>
          </div>

          <div className="space-y-3.5">
            {MADINAH_ZIYARAH_PLACES.map((place) => (
              <div
                key={place.id}
                className={`p-5 rounded-3xl border shadow-md space-y-3 ${
                  isDay ? 'bg-white border-slate-200' : 'bg-[#0a242a] border-[#16444e]'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h4 className={`text-base font-bold ${isDay ? 'text-slate-900' : 'text-white'}`}>
                      {place.name}
                    </h4>
                    <span className="text-xs text-slate-400 font-mono">📍 {place.location}</span>
                  </div>
                  <span className="font-arabic text-base sm:text-lg text-emerald-600 dark:text-emerald-400 font-bold">
                    {place.arabic}
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                  {isBn ? place.virtueBn : place.virtue}
                </p>

                {/* Etiquettes */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[11px] font-bold uppercase text-slate-400">
                    {isBn ? 'যিয়ারতের আদব ও নিয়ম:' : 'Etiquettes & Guidelines:'}
                  </div>
                  {(isBn ? place.etiquettesBn : place.etiquettes).map((eti, eIdx) => (
                    <div key={eIdx} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span>{eti}</span>
                    </div>
                  ))}
                </div>

                {/* Salam / Recommended Dua */}
                {place.recommendedDua && (
                  <div
                    className={`p-4 rounded-2xl border space-y-2 mt-2 ${
                      isDay ? 'bg-emerald-50/60 border-emerald-200' : 'bg-[#092b30] border-teal-800/40'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                        {isBn ? 'পবিত্র সালাম পেশের বাক্য' : 'Prescribed Greeting / Salam'}
                      </span>
                      <button
                        onClick={() => handleSpeakArabic(place.recommendedDua!.arabic)}
                        className={`px-2 py-1 rounded-xl text-xs font-semibold flex items-center gap-1 transition active:scale-95 cursor-pointer ${
                          isDay ? 'bg-white text-emerald-800 shadow-sm' : 'bg-[#071a1d] text-teal-200'
                        }`}
                      >
                        <Volume2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{HAJJ_UMRAH_UI.listenArabic[selectedLanguage]}</span>
                      </button>
                    </div>

                    <p
                      dir="rtl"
                      className="font-arabic text-base sm:text-lg text-right text-emerald-900 dark:text-emerald-100 leading-relaxed"
                    >
                      {place.recommendedDua.arabic}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-teal-300/80 italic font-mono">
                      {place.recommendedDua.transliteration}
                    </p>
                    <p className="text-xs font-medium text-slate-700 dark:text-slate-200">
                      {isBn ? place.recommendedDua.meaningBn : place.recommendedDua.meaningEn}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 8. USEFUL ARABIC PHRASES & EMERGENCY HOTLINES */}
      {activeTab === 'phrases' && (
        <div className="space-y-4">
          <div
            className={`p-5 rounded-3xl border shadow-md space-y-3 ${
              isDay ? 'bg-white border-slate-200' : 'bg-[#0a242a] border-[#16444e]'
            }`}
          >
            <h4 className="font-bold text-xs uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-2">
              <PhoneCall className="w-4 h-4" />
              <span>{isBn ? 'সৌদি আরবের জরুরি হেল্পলাইন নম্বরসমূহ:' : 'Saudi Arabia Emergency Numbers:'}</span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-center">
                <div className="text-lg font-black font-mono text-rose-600 dark:text-rose-400">911</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-300 font-semibold">{isBn ? 'জরুরি সেবা' : 'Unified Emergency'}</div>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                <div className="text-lg font-black font-mono text-emerald-600 dark:text-emerald-400">997</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-300 font-semibold">{isBn ? 'অ্যাম্বুলেন্স' : 'Ambulance'}</div>
              </div>
              <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-center">
                <div className="text-lg font-black font-mono text-blue-600 dark:text-blue-400">999</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-300 font-semibold">{isBn ? 'পুলিশ' : 'Police'}</div>
              </div>
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
                <div className="text-lg font-black font-mono text-amber-600 dark:text-amber-400">937</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-300 font-semibold">{isBn ? 'স্বাস্থ্য সেবা' : 'Health Ministry'}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {USEFUL_PILGRIM_PHRASES.map((phrase) => (
              <div
                key={phrase.id}
                className={`p-4 rounded-3xl border shadow-sm space-y-2 flex flex-col justify-between ${
                  isDay ? 'bg-white border-slate-200' : 'bg-[#0a242a] border-[#16444e]'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold text-[10px]">
                    {phrase.category}
                  </span>
                  <button
                    onClick={() => handleSpeakArabic(phrase.arabic)}
                    className="p-1.5 rounded-xl bg-slate-100 dark:bg-[#07191d] hover:bg-emerald-50 text-emerald-600 dark:text-teal-300 border border-slate-200 dark:border-teal-900/40 transition cursor-pointer active:scale-95"
                    title="Speak Phrase"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div dir="rtl" className="font-arabic text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
                  {phrase.arabic}
                </div>

                <div className="text-xs text-slate-500 dark:text-teal-300/80 italic font-mono">
                  {phrase.transliteration}
                </div>

                <div className="text-xs font-semibold text-slate-700 dark:text-slate-200 pt-1 border-t border-slate-100 dark:border-teal-900/30">
                  {isBn ? phrase.meaningBn : phrase.meaningEn}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 9. INTERACTIVE PACKING CHECKLIST */}
      {activeTab === 'packing' && (
        <div className="space-y-4">
          <div
            className={`p-4 rounded-2xl border text-xs sm:text-sm flex items-center justify-between gap-3 ${
              isDay ? 'bg-white border-slate-200' : 'bg-[#0a242a] border-[#16444e]'
            }`}
          >
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white">
                {isBn ? 'হাজী ও ওমরাহযাত্রীর প্যাকিং চেকলিস্ট' : 'Smart Pilgrim Packing Checklist'}
              </h4>
              <p className="text-xs text-slate-500 dark:text-teal-300">
                {isBn
                  ? 'আপনার ব্যাগে মালামাল তোলার সাথে সাথে টিক দিয়ে রাখুন'
                  : 'Check items as you pack them into your luggage (saved automatically)'}
              </p>
            </div>
            <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 font-bold text-xs font-mono">
              {Object.values(packedItems).filter(Boolean).length} / 19
            </span>
          </div>

          <div className="space-y-4">
            {PILGRIM_PACKING_LIST.map((cat, cIdx) => (
              <div
                key={cIdx}
                className={`p-5 rounded-3xl border shadow-sm space-y-3 ${
                  isDay ? 'bg-white border-slate-200' : 'bg-[#0a242a] border-[#16444e]'
                }`}
              >
                <h4 className="font-bold text-xs sm:text-sm uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                  <Luggage className="w-4 h-4 text-emerald-500" />
                  <span>{isBn ? cat.categoryNameBn : cat.categoryNameEn}</span>
                </h4>

                <div className="space-y-2">
                  {cat.items.map((item) => {
                    const isChecked = !!packedItems[item.id];
                    return (
                      <div
                        key={item.id}
                        onClick={() => togglePackedItem(item.id)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                          isChecked
                            ? isDay
                              ? 'bg-emerald-50/80 border-emerald-300 text-slate-900 line-through opacity-80'
                              : 'bg-emerald-950/20 border-emerald-500/40 text-teal-200 opacity-80'
                            : isDay
                            ? 'bg-slate-50/80 hover:bg-slate-100 border-slate-200 text-slate-800'
                            : 'bg-[#071d22] hover:bg-teal-950/50 border-teal-900/40 text-teal-100'
                        }`}
                      >
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                        )}
                        <div className="min-w-0">
                          <div className="text-xs sm:text-sm font-semibold">
                            {isBn ? item.nameBn : item.nameEn}
                          </div>
                          {(isBn ? item.noteBn : item.noteEn) && (
                            <div className="text-[11px] text-slate-500 dark:text-teal-300/80 mt-0.5">
                              {isBn ? item.noteBn : item.noteEn}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 10. IHRAM PROHIBITIONS & PENALTY RULES */}
      {activeTab === 'prohibitions' && (
        <div className="space-y-4">
          <div
            className={`p-5 rounded-3xl border shadow-md space-y-3 ${
              isDay ? 'bg-white border-slate-200' : 'bg-[#0a242a] border-[#16444e]'
            }`}
          >
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm">
              <AlertTriangle className="w-5 h-5" />
              <span>
                {isBn
                  ? 'ইহরাম অবস্থায় যা যা সম্পূর্ণ নিষিদ্ধ (বর্জনীয় কাজসমূহ):'
                  : 'Actions Strictly Prohibited in the State of Ihram (Haram / Mahzurat):'}
              </span>
            </div>

            <div className="space-y-2 pt-1">
              {prohibitionsList.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl border text-xs sm:text-sm flex items-start gap-3 ${
                    isDay
                      ? 'bg-rose-50/50 border-rose-200/70 text-slate-800'
                      : 'bg-rose-950/20 border-rose-900/30 text-rose-100'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-rose-500/15 text-rose-600 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`p-5 rounded-3xl border shadow-md space-y-3 ${
              isDay ? 'bg-amber-50/70 border-amber-200' : 'bg-[#0a2624] border-amber-800/40'
            }`}
          >
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm">
              <ShieldAlert className="w-5 h-5" />
              <span>
                {isBn ? 'দম বা কাফফারা (ভুলত্রুটির ক্ষতিপূরণ সংক্রান্ত বিধান):' : 'Dam & Fidya Penalty Compensation Chart:'}
              </span>
            </div>
            <p className="text-xs text-slate-700 dark:text-amber-100 leading-relaxed">
              {isBn
                ? '১. বড় নিষিদ্ধ কাজ (যেমন: পুরো একদিন সেলাইযুক্ত কাপড় পরা, পুরো শরীরে সুগন্ধি লাগানো বা মাথা সম্পূর্ণ কামানো) অনিচ্ছাকৃত বা ইচ্ছাকৃতভাবে সংঘটিত হলে ১টি ছাগল/ভেড়া জবাই করে হারামের মিসকিনদের বণ্টন করা (দম) ওয়াজিব হয়।'
                : '1. Major violations (e.g. wearing stitched clothes for a full day, applying perfume over a whole limb, or cutting hair before time) necessitate offering Dam (slaughtering one goat/sheep within the Haram boundaries and distributing it to the poor).'}
            </p>
            <p className="text-xs text-slate-700 dark:text-amber-100 leading-relaxed">
              {isBn
                ? '২. ছোটখাটো ভুলের জন্য সদকায়ে ফিতরের সমপরিমাণ খাদ্য বা মূল্য সদকাহ করতে হয়।'
                : '2. Minor unintentional violations require giving Fidya/Sadaqah equivalent to Sadaqat al-Fitr to the poor of the Haram.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

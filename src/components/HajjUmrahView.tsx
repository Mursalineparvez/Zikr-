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

type HajjTab = 'umrah_hub' | 'hajj_hub' | 'essentials_hub';

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
  const [activeTab, setActiveTab] = useState<HajjTab>('umrah_hub');
  const [expandedStep, setExpandedStep] = useState<string>('umrah_1_ihram');
  const [activeHajjMapDay, setActiveHajjMapDay] = useState<number>(1);

  // Master Professional Animation Engine State
  const [isMasterPlaying, setIsMasterPlaying] = useState<boolean>(true);
  const [orbitAngle, setOrbitAngle] = useState<number>(0);
  const [saiProgress, setSaiProgress] = useState<number>(0);
  const [saiDirection, setSaiDirection] = useState<'safa_to_marwah' | 'marwah_to_safa'>('safa_to_marwah');
  const [saiCurrentLap, setSaiCurrentLap] = useState<number>(1);
  const [animSpeed, setAnimSpeed] = useState<number>(1);

  // Packing Checklist State (Persistent)
  const [packedItems, setPackedItems] = useState<Record<string, boolean>>(() => {
    try {
      const s = localStorage.getItem('zikrmate_hajj_packing_checked');
      return s ? JSON.parse(s) : {};
    } catch {
      return {};
    }
  });

  // Master Animation Loop with buttery smooth 60fps increments
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isMasterPlaying) {
      interval = setInterval(() => {
        setOrbitAngle((prev) => (prev + 1.5 * animSpeed) % 360);
        setSaiProgress((prev) => {
          if (prev >= 100) {
            setSaiDirection((d) => (d === 'safa_to_marwah' ? 'marwah_to_safa' : 'safa_to_marwah'));
            setSaiCurrentLap((l) => (l >= 7 ? 1 : l + 1));
            return 0;
          }
          return prev + 0.8 * animSpeed;
        });
      }, 30);
    }
    return () => clearInterval(interval);
  }, [isMasterPlaying, animSpeed]);

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
  const pilgrimX = 50 + 39 * Math.cos(rad);
  const pilgrimY = 50 + 33 * Math.sin(rad);

  const getLiveTawafZone = () => {
    if (orbitAngle >= 0 && orbitAngle < 90) {
      return {
        zoneNameBn: '🟢 ১ম জোন: হাজরে আসওয়াদ ও মুলতাযাম',
        zoneNameEn: '🟢 Zone 1: Black Stone & Multazam',
        actionBn: 'হাজরে আসওয়াদ বরাবর দাঁড়িয়ে ডান হাত তুলে ইস্তিলাম ("বিসমিল্লাহি আল্লাহু আকবার") করে চক্কর শুরু করুন।',
        actionEn: 'Align with Black Stone, raise right hand proclaiming "Bismillahi Allahu Akbar".',
        duaArabic: 'بِسْمِ اللَّهِ وَاللَّهُ أَكْبَرُ',
        badgeColor: 'bg-emerald-500 text-white shadow-emerald-500/50 shadow-md',
      };
    } else if (orbitAngle >= 90 && orbitAngle < 180) {
      return {
        zoneNameBn: '🟡 ২য় জোন: হিজরে ইসমাইল (হাতিম) প্রান্ত',
        zoneNameEn: '🟡 Zone 2: Hijr Isma\'il (Hateem)',
        actionBn: 'হাতিমের অর্ধচন্দ্রাকৃতির দেওয়ালের বাইরে দিয়ে প্রদক্ষিণ করুন (ভেতরে ঢোকা যাবে না)।',
        actionEn: 'Circumambulate outside the semi-circular Hateem wall.',
        duaArabic: 'سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ',
        badgeColor: 'bg-amber-500 text-slate-950 font-black shadow-amber-500/50 shadow-md',
      };
    } else if (orbitAngle >= 180 && orbitAngle < 270) {
      return {
        zoneNameBn: '🔵 ৩য় জোন: রুকনে শামী ও ইরাকী কোণ',
        zoneNameEn: '🔵 Zone 3: Shami & Iraqi Corners',
        actionBn: 'নীরবে জিকির, ইস্তিগফার ও কুরআন তিলাওয়াত অব্যাহত রাখুন।',
        actionEn: 'Engage in continuous silent remembrance, Istighfar, and Quran recitation.',
        duaArabic: 'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ وَأَتُوبُ إِلَيْهِ',
        badgeColor: 'bg-teal-500 text-white shadow-teal-500/50 shadow-md',
      };
    } else {
      return {
        zoneNameBn: '🟢 ৪র্থ জোন: রুকনে ইয়ামানি থেকে হাজরে আসওয়াদ',
        zoneNameEn: '🟢 Zone 4: Yemeni Corner to Black Stone',
        actionBn: 'রুকনে ইয়ামানি ডান হাতে স্পর্শ করুন। "রাব্বানা আতিনা ফিদ্দুনিয়া..." দোয়াটি পড়ুন।',
        actionEn: 'Touch Rukn Yamani. Recite the comprehensive Quranic supplication.',
        duaArabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
        badgeColor: 'bg-emerald-600 text-white shadow-emerald-600/50 shadow-md',
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
              <span>الحَجُّ وَالعُمْرَةُ • Professional 3D Simulated Studio</span>
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

      {/* 3 CLEAN MASTER TABS */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-200 dark:bg-[#092226] border border-slate-300 dark:border-[#14424a]">
        <button
          onClick={() => {
            setActiveTab('umrah_hub');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'umrah_hub'
              ? 'bg-amber-500 text-slate-950 shadow-lg scale-[1.02]'
              : 'text-slate-600 dark:text-teal-200 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <span>🕋</span>
          <span>{isBn ? 'ওমরাহ সম্পূর্ণ গাইড ও অ্যানিমেশন' : 'Complete Umrah Hub & Animation'}</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('hajj_hub');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'hajj_hub'
              ? 'bg-emerald-600 text-white shadow-lg scale-[1.02]'
              : 'text-slate-600 dark:text-teal-200 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <span>⛺</span>
          <span>{isBn ? 'হজের ৫ দিন সম্পূর্ণ গাইড ও রুট ম্যাপ' : 'Complete 5 Days Hajj Hub & Map'}</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('essentials_hub');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'essentials_hub'
              ? 'bg-teal-600 text-white shadow-lg scale-[1.02]'
              : 'text-slate-600 dark:text-teal-200 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <span>🎒</span>
          <span>{isBn ? 'মিকাত, মদিনা ও চেকলিস্ট' : 'Miqat, Madinah & Essentials'}</span>
        </button>
      </div>

      {/* ======================================================= */}
      {/* 🕋 TAB 1: COMPLETE UMRAH HUB (3D REALISTIC ANIMATIONS)   */}
      {/* ======================================================= */}
      {activeTab === 'umrah_hub' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Stunning Professional 3D Simulated Studio Card */}
          <div
            className={`p-5 sm:p-6 rounded-3xl border shadow-2xl space-y-5 ${
              isDay ? 'bg-white border-slate-200' : 'bg-[#0a242a] border-[#16444e]'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-teal-900/40 pb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 text-xs font-black mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isBn ? 'প্রফেশনাল ৩ডি সিমুলেশন স্টুডিও' : 'Professional 3D Simulation Studio'}</span>
                </div>
                <h3 className={`text-base sm:text-lg font-black ${isDay ? 'text-slate-900' : 'text-white'}`}>
                  {isBn ? 'পবিত্র কাবার তাওয়াফ এবং সাফা-মারওয়া সাঈর রিয়ালিস্টিক অ্যানিমেশন' : 'Realistic Tawaf & Sa\'i Simulation Engine'}
                </h3>
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
                  <span>{isMasterPlaying ? (isBn ? 'অ্যানিমেশন পজ' : 'Pause') : (isBn ? 'অ্যানিমেশন প্লে' : 'Play')}</span>
                </button>
              </div>
            </div>

            {/* Gorgeous Side-by-Side Professional Simulation Panels */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Panel A: 3D Isometric Kaaba Tawaf Simulation */}
              <div
                className={`p-5 rounded-3xl border shadow-xl flex flex-col justify-between space-y-4 relative overflow-hidden ${
                  isDay
                    ? 'bg-gradient-to-b from-slate-900 via-slate-950 to-[#0c1f24] text-white border-slate-800'
                    : 'bg-gradient-to-b from-[#051417] via-[#092226] to-[#051417] text-white border-[#123942]'
                }`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(#144d57_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

                <div className="flex items-center justify-between relative z-10">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                    <span>🕋</span>
                    <span>{isBn ? '৩ডি কাবার প্রদক্ষিণ সিমুলেশন' : '3D Kaaba Tawaf Simulation'}</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/40">
                    {Math.round(orbitAngle)}° Orbit
                  </span>
                </div>

                {/* Isometric Kaaba Canvas */}
                <div className="relative w-52 h-52 sm:w-60 sm:h-60 mx-auto my-3 flex items-center justify-center z-10">
                  <div className="absolute inset-0 border-2 border-dashed border-emerald-500/40 rounded-full animate-spin-slow" />
                  <div className="absolute inset-6 border border-teal-400/30 rounded-full" />

                  {/* Smooth Glowing Pilgrim Avatar */}
                  <div
                    className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-75 pointer-events-none flex flex-col items-center"
                    style={{ left: `${pilgrimX}%`, top: `${pilgrimY}%` }}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 text-slate-950 font-black text-xs flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.9)] animate-bounce ring-4 ring-amber-400/40">
                      🚶
                    </div>
                    <span className="text-[9px] font-black text-amber-300 bg-black/90 px-2 py-0.5 rounded-full border border-amber-400/50 shadow-md mt-1">
                      {isBn ? 'তাওয়াফরত' : 'Pilgrim'}
                    </span>
                  </div>

                  {/* 3D Isometric Kaaba Center */}
                  <div className="relative z-10 w-28 h-28 bg-slate-950 border-2 border-amber-400/90 rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.8)] flex flex-col items-center justify-center p-1">
                    <div className="w-full h-2 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 rounded mb-1.5 shadow-sm" />
                    <span className="text-2xl">🕋</span>
                    <span className="text-[9px] font-black text-amber-200 tracking-widest mt-0.5">KAABA</span>
                  </div>
                </div>

                {/* Synchronized Live Zone Commentary Card */}
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-xs space-y-2 relative z-10 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-1 rounded-xl text-xs font-bold ${currentZone.badgeColor}`}>
                      {isBn ? currentZone.zoneNameBn : currentZone.zoneNameEn}
                    </span>
                    <button
                      onClick={() => handleSpeakArabic(currentZone.duaArabic)}
                      className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 cursor-pointer border border-slate-700 active:scale-95"
                      title="Listen Dua"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-slate-200 leading-relaxed font-medium">{isBn ? currentZone.actionBn : currentZone.actionEn}</p>
                  <div dir="rtl" className="font-arabic text-right text-amber-300 text-base font-bold pt-1.5 border-t border-slate-800">
                    {currentZone.duaArabic}
                  </div>
                </div>
              </div>

              {/* Panel B: Professional Safa-Marwah Sa'i Walk Simulation */}
              <div
                className={`p-5 rounded-3xl border shadow-xl flex flex-col justify-between space-y-4 ${
                  isDay ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-[#07191d] border-teal-900/40 text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest flex items-center gap-1.5">
                    <span>🏔️</span>
                    <span>{isBn ? 'সাফা-মারওয়া সাঈ সিমুলেটর' : 'Safa-Marwah Sa\'i Simulation'}</span>
                  </span>
                  <span className="px-3 py-1 rounded-xl bg-teal-500/20 text-teal-700 dark:text-teal-300 font-mono text-xs font-bold border border-teal-500/30">
                    {isBn ? `চক্কর ${saiCurrentLap} / ৭` : `Lap ${saiCurrentLap} / 7`}
                  </span>
                </div>

                {/* Visual 3D Track */}
                <div className="space-y-4 py-6">
                  <div className="flex items-center justify-between text-xs font-black">
                    <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">🏔️ SAFA</span>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-black ${isSaiGreenZone ? 'bg-green-500 text-slate-950 animate-pulse' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                      {isSaiGreenZone ? (isBn ? '⚡ সবুজ বাতি (দৌড়ান!)' : '⚡ GREEN LIGHTS (JOG!)') : (isBn ? 'স্বাভাবিক হাঁটা' : 'Normal Walk')}
                    </span>
                    <span className="text-teal-600 dark:text-teal-400 flex items-center gap-1">MARWAH 🏔️</span>
                  </div>

                  <div className="relative my-6">
                    <div className="w-full h-4 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex shadow-inner">
                      <div className="w-[35%] bg-slate-300 dark:bg-slate-700" />
                      <div className="w-[30%] bg-gradient-to-r from-green-500/30 via-green-400/60 to-green-500/30 relative">
                        <div className="absolute inset-0 bg-green-400/50 animate-pulse" />
                      </div>
                      <div className="w-[35%] bg-slate-300 dark:bg-slate-700" />
                    </div>

                    {/* Smooth Moving Pilgrim Avatar */}
                    <div
                      className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 transition-all duration-75 flex flex-col items-center pointer-events-none"
                      style={{ left: `${saiDirection === 'safa_to_marwah' ? saiProgress : 100 - saiProgress}%` }}
                    >
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-sm shadow-xl transition-all ${
                          isSaiGreenZone ? 'bg-green-500 text-white scale-125 ring-4 ring-green-400/50 animate-bounce' : 'bg-amber-500 text-slate-950 scale-100'
                        }`}
                      >
                        {isSaiGreenZone ? '🏃' : '🚶'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Professional Sa'i Commentary Card */}
                <div
                  className={`p-4 rounded-2xl border text-xs space-y-2.5 ${
                    isDay ? 'bg-white border-slate-200 text-slate-800 shadow-sm' : 'bg-[#092b30] border-teal-800/40 text-teal-100'
                  }`}
                >
                  <div className="font-black text-teal-600 dark:text-teal-400 text-sm">
                    {saiDirection === 'safa_to_marwah' ? (isBn ? 'অভিমুখ: সাফা ➔ মারওয়া' : 'Direction: Safa to Marwah') : (isBn ? 'অভিমুখ: মারওয়া ➔ সাফা' : 'Direction: Marwah to Safa')}
                  </div>
                  <p className="leading-relaxed font-medium">
                    {isBn
                      ? 'সাফা ও মারওয়া পাহাড়ের মাঝে মোট ৭টি চক্কর সম্পন্ন করতে হয়। পুরুষরা নির্দিষ্ট সবুজ বাতি জোনে দ্রুত পায়ে দৌড়াবেন।'
                      : 'Complete 7 total trips between Safa and Marwah. Men jog briskly between the two green light markers.'}
                  </p>
                  <div dir="rtl" className="font-arabic text-right text-emerald-700 dark:text-emerald-300 font-bold text-sm pt-1 border-t border-slate-100 dark:border-teal-900/30">
                    إِنَّ الصَّفَا وَالْمَرْوَةَ مِن شَعَائِرِ اللَّهِ
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section B: Complete Step-by-Step Umrah Steps */}
          <div className="space-y-3">
            <h3 className={`text-base font-bold px-1 ${isDay ? 'text-slate-900' : 'text-white'}`}>
              {isBn ? 'ওমরাহর ধারাবাহিক ৪টি মূল ধাপ ও নিয়মাবলী' : 'Complete 4 Step-by-Step Umrah Guide'}
            </h3>

            {UMRAH_STEPS.map((step: HajjStepItem) => {
              const stageLabel = isBn ? step.dayOrStageBn : (step.dayOrStageEn || step.dayOrStageBn);
              const titleLabel = isBn ? step.titleBn : (step.titleEn || step.titleBn);
              const summaryLabel = isBn ? step.summaryBn : (step.summaryEn || step.summaryBn);
              const actions = (isBn ? step.actionItems : (step.actionItemsEn || step.actionItems)) || [];

              return (
                <div
                  key={step.id}
                  className={`p-5 rounded-3xl border shadow-md space-y-4 ${
                    isDay ? 'bg-white border-slate-200' : 'bg-[#0a242a] border-[#16444e]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold text-xs font-mono">
                        {stageLabel}
                      </span>
                      <h4 className={`text-base font-bold ${isDay ? 'text-slate-900' : 'text-white'}`}>
                        {titleLabel}
                      </h4>
                    </div>
                    {step.arabicTitle && (
                      <span className="font-arabic text-sm text-emerald-600 dark:text-emerald-400 font-bold">
                        {step.arabicTitle}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-teal-200 leading-relaxed">
                    {summaryLabel}
                  </p>

                  <div className="space-y-2 pt-1">
                    {actions.map((act, aIdx) => (
                      <div
                        key={aIdx}
                        className={`p-3 rounded-2xl border text-xs sm:text-sm flex items-start gap-2.5 ${
                          isDay ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-[#071d22] border-teal-900/40 text-teal-100'
                        }`}
                      >
                        <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 font-mono">
                          {aIdx + 1}
                        </span>
                        <span className="leading-relaxed">{act}</span>
                      </div>
                    ))}
                  </div>

                  {step.essentialDuas && step.essentialDuas.map((dua, dIdx) => (
                    <div key={dIdx} className={`p-4 rounded-2xl border space-y-2 ${isDay ? 'bg-emerald-50/60 border-emerald-200' : 'bg-[#092b30] border-teal-800/40'}`}>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-emerald-700 dark:text-emerald-300">{isBn ? dua.titleBn : dua.titleEn}</span>
                        <button onClick={() => handleSpeakArabic(dua.arabic)} className="px-2.5 py-1 rounded-xl text-xs font-semibold flex items-center gap-1 bg-white dark:bg-[#071a1d] text-emerald-800 dark:text-teal-200 border border-emerald-200 dark:border-teal-900/40 cursor-pointer">
                          <Volume2 className="w-3.5 h-3.5 text-emerald-500" />
                          <span>{HAJJ_UMRAH_UI.listenArabic[selectedLanguage]}</span>
                        </button>
                      </div>
                      <p dir="rtl" className="font-arabic text-lg text-right text-emerald-900 dark:text-emerald-100 leading-loose">{dua.arabic}</p>
                      <p className="text-xs text-slate-500 dark:text-teal-300/80 italic font-mono">{dua.transliteration}</p>
                      <p className="text-xs font-semibold text-slate-700 dark:text-slate-200"><strong className="text-emerald-600">{isBn ? 'অর্থ: ' : 'Meaning: '}</strong>{isBn ? dua.meaningBn : dua.meaningEn}</p>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ======================================================= */}
      {/* ⛺ TAB 2: COMPLETE 5 DAYS HAJJ HUB (MAP + 5 DAYS GUIDE) */}
      {/* ======================================================= */}
      {activeTab === 'hajj_hub' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Section A: 5 Days Hajj Route Map */}
          <div
            className={`p-5 sm:p-6 rounded-3xl border shadow-xl space-y-4 ${
              isDay ? 'bg-white border-slate-200' : 'bg-[#0a242a] border-[#16444e]'
            }`}
          >
            <div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                {isBn ? 'হজের ৫ দিনের পবিত্র রুট ম্যাপ' : 'Interactive 5 Days Hajj Journey Map'}
              </span>
              <h3 className={`text-base sm:text-lg font-black ${isDay ? 'text-slate-900' : 'text-white'}`}>
                {isBn ? 'মিনা থেকে আরাফাত, মুজদালিফা ও মক্কা সফরপথ' : 'Geographical Movement from Mina to Arafat & Muzdalifah'}
              </h3>
            </div>

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

            <div className={`p-5 rounded-3xl border ${isDay ? 'bg-slate-50 border-slate-200' : 'bg-[#071a1e] border-teal-900/40'}`}>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
                <div className={`p-3.5 rounded-2xl border flex-1 w-full ${activeHajjMapDay === 1 ? 'bg-emerald-600 text-white font-bold ring-4 ring-emerald-400/30' : 'bg-white dark:bg-[#092226] text-slate-700 dark:text-teal-200'}`}>
                  <span className="text-xl">⛺</span>
                  <div className="text-xs font-bold mt-1">MINA (৮ই)</div>
                </div>
                <span className="text-slate-400 font-bold hidden sm:inline">➔</span>
                <div className={`p-3.5 rounded-2xl border flex-1 w-full ${activeHajjMapDay === 2 ? 'bg-emerald-600 text-white font-bold ring-4 ring-emerald-400/30' : 'bg-white dark:bg-[#092226] text-slate-700 dark:text-teal-200'}`}>
                  <span className="text-xl">🏔️</span>
                  <div className="text-xs font-bold mt-1">ARAFAH (৯ই দিন)</div>
                </div>
                <span className="text-slate-400 font-bold hidden sm:inline">➔</span>
                <div className={`p-3.5 rounded-2xl border flex-1 w-full ${activeHajjMapDay === 3 ? 'bg-emerald-600 text-white font-bold ring-4 ring-emerald-400/30' : 'bg-white dark:bg-[#092226] text-slate-700 dark:text-teal-200'}`}>
                  <span className="text-xl">🌌</span>
                  <div className="text-xs font-bold mt-1">MUZDALIFAH (৯ই রাত)</div>
                </div>
                <span className="text-slate-400 font-bold hidden sm:inline">➔</span>
                <div className={`p-3.5 rounded-2xl border flex-1 w-full ${activeHajjMapDay >= 4 ? 'bg-emerald-600 text-white font-bold ring-4 ring-emerald-400/30' : 'bg-white dark:bg-[#092226] text-slate-700 dark:text-teal-200'}`}>
                  <span className="text-xl">🕋</span>
                  <div className="text-xs font-bold mt-1">JAMARAT (১০-১৩ই)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Section B: Complete 5 Days Hajj Step-by-Step */}
          <div className="space-y-3">
            <h3 className={`text-base font-bold px-1 ${isDay ? 'text-slate-900' : 'text-white'}`}>
              {isBn ? 'হজের ৫ দিনের ধারাবাহিক আমল ও আহকাম' : 'Complete 5 Days Hajj Journey Details'}
            </h3>

            {HAJJ_DAYS_GUIDE.map((step: HajjStepItem) => {
              const stageLabel = isBn ? step.dayOrStageBn : (step.dayOrStageEn || step.dayOrStageBn);
              const titleLabel = isBn ? step.titleBn : (step.titleEn || step.titleBn);
              const summaryLabel = isBn ? step.summaryBn : (step.summaryEn || step.summaryBn);
              const actions = (isBn ? step.actionItems : (step.actionItemsEn || step.actionItems)) || [];

              return (
                <div
                  key={step.id}
                  className={`p-5 rounded-3xl border shadow-md space-y-4 ${
                    isDay ? 'bg-white border-slate-200' : 'bg-[#0a242a] border-[#16444e]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold text-xs font-mono">
                        {stageLabel}
                      </span>
                      <h4 className={`text-base font-bold ${isDay ? 'text-slate-900' : 'text-white'}`}>
                        {titleLabel}
                      </h4>
                    </div>
                    {step.arabicTitle && (
                      <span className="font-arabic text-sm text-emerald-600 dark:text-emerald-400 font-bold">
                        {step.arabicTitle}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-teal-200 leading-relaxed">
                    {summaryLabel}
                  </p>

                  <div className="space-y-2 pt-1">
                    {actions.map((act, aIdx) => (
                      <div
                        key={aIdx}
                        className={`p-3 rounded-2xl border text-xs sm:text-sm flex items-start gap-2.5 ${
                          isDay ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-[#071d22] border-teal-900/40 text-teal-100'
                        }`}
                      >
                        <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 font-mono">
                          {aIdx + 1}
                        </span>
                        <span className="leading-relaxed">{act}</span>
                      </div>
                    ))}
                  </div>

                  {step.essentialDuas && step.essentialDuas.map((dua, dIdx) => (
                    <div key={dIdx} className={`p-4 rounded-2xl border space-y-2 ${isDay ? 'bg-emerald-50/60 border-emerald-200' : 'bg-[#092b30] border-teal-800/40'}`}>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-emerald-700 dark:text-emerald-300">{isBn ? dua.titleBn : dua.titleEn}</span>
                        <button onClick={() => handleSpeakArabic(dua.arabic)} className="px-2.5 py-1 rounded-xl text-xs font-semibold flex items-center gap-1 bg-white dark:bg-[#071a1d] text-emerald-800 dark:text-teal-200 border border-emerald-200 dark:border-teal-900/40 cursor-pointer">
                          <Volume2 className="w-3.5 h-3.5 text-emerald-500" />
                          <span>{HAJJ_UMRAH_UI.listenArabic[selectedLanguage]}</span>
                        </button>
                      </div>
                      <p dir="rtl" className="font-arabic text-lg text-right text-emerald-900 dark:text-emerald-100 leading-loose">{dua.arabic}</p>
                      <p className="text-xs text-slate-500 dark:text-teal-300/80 italic font-mono">{dua.transliteration}</p>
                      <p className="text-xs font-semibold text-slate-700 dark:text-slate-200"><strong className="text-emerald-600">{isBn ? 'অর্থ: ' : 'Meaning: '}</strong>{isBn ? dua.meaningBn : dua.meaningEn}</p>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ======================================================= */}
      {/* 🎒 TAB 3: ESSENTIALS (MIQAT, MADINAH, PHRASES, PACKING)  */}
      {/* ======================================================= */}
      {activeTab === 'essentials_hub' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Section A: Miqat Guide */}
          <div className="space-y-3">
            <h3 className={`text-base font-bold px-1 ${isDay ? 'text-slate-900' : 'text-white'}`}>
              {isBn ? 'মিকাত ও বিমান যাত্রার নিয়মাবলী' : 'Miqat Locations & Air Travel Rules'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {MIQAT_LOCATIONS.map((miqat) => (
                <div key={miqat.id} className={`p-5 rounded-3xl border shadow-md space-y-2.5 ${isDay ? 'bg-white border-slate-200' : 'bg-[#0a242a] border-[#16444e]'}`}>
                  <div className="flex items-center justify-between gap-2">
                    <h4 className={`text-sm sm:text-base font-bold ${isDay ? 'text-slate-900' : 'text-white'}`}>{miqat.name}</h4>
                    <span className="font-arabic text-sm text-emerald-600 dark:text-emerald-400 font-bold">{miqat.arabic}</span>
                  </div>
                  <div className="text-[11px] font-semibold text-emerald-600 font-mono">📍 {miqat.distanceFromMakkah}</div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{isBn ? miqat.designatedForBn : miqat.designatedFor}</p>
                  <div className={`p-2.5 rounded-xl border text-[11px] leading-relaxed ${isDay ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-[#07191d] border-teal-900/40 text-teal-200'}`}>
                    <strong className="text-emerald-600 dark:text-teal-300">{isBn ? 'নির্দেশনা: ' : 'Guide: '}</strong>
                    {isBn ? miqat.airTravelNoteBn : miqat.airTravelNote}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section B: Madinah Ziyarah */}
          <div className="space-y-3 pt-2">
            <h3 className={`text-base font-bold px-1 ${isDay ? 'text-slate-900' : 'text-white'}`}>
              {isBn ? 'মদিনা মুনাওয়ারা ও যিয়ারতসমূহ' : 'Madinah & Sacred Ziyarah Guide'}
            </h3>
            <div className="space-y-3">
              {MADINAH_ZIYARAH_PLACES.map((place) => (
                <div key={place.id} className={`p-5 rounded-3xl border shadow-md space-y-3 ${isDay ? 'bg-white border-slate-200' : 'bg-[#0a242a] border-[#16444e]'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className={`text-base font-bold ${isDay ? 'text-slate-900' : 'text-white'}`}>{place.name}</h4>
                      <span className="text-xs text-slate-400 font-mono">📍 {place.location}</span>
                    </div>
                    <span className="font-arabic text-base text-emerald-600 dark:text-emerald-400 font-bold">{place.arabic}</span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-300">{isBn ? place.virtueBn : place.virtue}</p>
                  {place.recommendedDua && (
                    <div className={`p-4 rounded-2xl border space-y-2 ${isDay ? 'bg-emerald-50/60 border-emerald-200' : 'bg-[#092b30] border-teal-800/40'}`}>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">{isBn ? 'সালাম পেশের বাক্য' : 'Prescribed Salam'}</span>
                        <button onClick={() => handleSpeakArabic(place.recommendedDua!.arabic)} className="px-2 py-1 rounded-xl text-xs font-semibold flex items-center gap-1 bg-white dark:bg-[#071a1d] text-emerald-800 dark:text-teal-200 cursor-pointer">
                          <Volume2 className="w-3.5 h-3.5 text-emerald-500" />
                          <span>{HAJJ_UMRAH_UI.listenArabic[selectedLanguage]}</span>
                        </button>
                      </div>
                      <p dir="rtl" className="font-arabic text-base text-right text-emerald-900 dark:text-emerald-100">{place.recommendedDua.arabic}</p>
                      <p className="text-xs font-medium text-slate-700 dark:text-slate-200">{isBn ? place.recommendedDua.meaningBn : place.recommendedDua.meaningEn}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Section C: Packing Checklist */}
          <div className="space-y-3 pt-2">
            <div className={`p-4 rounded-2xl border text-xs sm:text-sm flex items-center justify-between ${isDay ? 'bg-white border-slate-200' : 'bg-[#0a242a] border-[#16444e]'}`}>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">{isBn ? 'প্যাকিং চেকলিস্ট' : 'Smart Packing Checklist'}</h4>
                <p className="text-xs text-slate-500 dark:text-teal-300">{isBn ? 'ব্যাগে মালামাল তোলার সাথে সাথে টিক দিন' : 'Check items as you pack'}</p>
              </div>
              <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 font-bold text-xs font-mono">
                {Object.values(packedItems).filter(Boolean).length} / 19
              </span>
            </div>

            <div className="space-y-3">
              {PILGRIM_PACKING_LIST.map((cat, cIdx) => (
                <div key={cIdx} className={`p-5 rounded-3xl border shadow-sm space-y-3 ${isDay ? 'bg-white border-slate-200' : 'bg-[#0a242a] border-[#16444e]'}`}>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
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
                              ? isDay ? 'bg-emerald-50/80 border-emerald-300 text-slate-900 line-through opacity-80' : 'bg-emerald-950/20 border-emerald-500/40 text-teal-200 opacity-80'
                              : isDay ? 'bg-slate-50/80 hover:bg-slate-100 border-slate-200 text-slate-800' : 'bg-[#071d22] hover:bg-teal-950/50 border-teal-900/40 text-teal-100'
                          }`}
                        >
                          {isChecked ? <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> : <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />}
                          <div className="text-xs sm:text-sm font-semibold">{isBn ? item.nameBn : item.nameEn}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

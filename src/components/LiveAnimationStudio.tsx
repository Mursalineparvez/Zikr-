import React, { useState, useEffect, useRef } from 'react';
import { ThemeMode, ZikrLanguage } from '../types';
import {
  Compass,
  Volume2,
  Play,
  Pause,
  ArrowLeft,
  Sparkles,
  Tv,
  MapPin,
  CheckCircle2,
  Info,
  RotateCcw,
  FastForward,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Camera,
} from 'lucide-react';
import { soundHaptics, playArabicVoice, VoiceGender } from '../utils/audioHaptics';

interface LiveAnimationStudioProps {
  onBack: () => void;
  soundEnabled: boolean;
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
  voiceGender?: VoiceGender;
}

type StudioScene = 'infographic_scene' | 'kaaba_scene' | 'sai_scene' | 'hajj_map_scene';

interface InfographicPin {
  id: string;
  titleBn: string;
  titleEn: string;
  arabic: string;
  descBn: string;
  descEn: string;
  top: string;
  left: string;
  badgeBg: string;
}

const KAABA_INFOGRAPHIC_PINS: InfographicPin[] = [
  {
    id: 'door',
    titleBn: 'কাবার দরজা (Bab al-Kaaba)',
    titleEn: 'Door of the Kaaba',
    arabic: 'بَابُ الكَعْبَةِ',
    descBn: 'কাবার উত্তর-পূর্ব দেওয়ালে অবস্থিত খাঁটি সোনার দরজা, যা মেঝে থেকে প্রায় ২.২ মিটার উঁচুতে স্থাপিত।',
    descEn: 'Pure gold door on the northeastern wall.',
    top: '46%',
    left: '53%',
    badgeBg: 'bg-amber-500 text-slate-950',
  },
  {
    id: 'hajar',
    titleBn: 'হাজরে আসওয়াদ (Black Stone)',
    titleEn: 'Hajar al-Aswad',
    arabic: 'الحَجَرُ الأَسْوَدُ',
    descBn: 'জান্নাত থেকে প্রেরিত পবিত্র কালো পাথর, যেখান থেকে তাওয়াফ শুরু ও শেষ হয়।',
    descEn: 'Heavenly stone marking the start of Tawaf.',
    top: '72%',
    left: '37%',
    badgeBg: 'bg-emerald-500 text-white',
  },
  {
    id: 'hateem',
    titleBn: 'হাতিম (Hijr Isma\'il)',
    titleEn: 'Hijr Isma\'il (Hateem)',
    arabic: 'حِجْرُ إِسْمَاعِيلَ',
    descBn: 'কাবার উত্তর-পশ্চিম দিকের অর্ধচন্দ্রাকৃতির দেওয়াল, যা মূলত কাবারই অংশ।',
    descEn: 'Semi-circular marble wall part of original Kaaba.',
    top: '42%',
    left: '74%',
    badgeBg: 'bg-teal-500 text-white',
  },
  {
    id: 'maqam',
    titleBn: 'মাকামে ইবরাহিম',
    titleEn: 'Maqam Ibrahim',
    arabic: 'مَقَامُ إِبْرَاهِيمَ',
    descBn: 'হজরত ইবরাহিম (আ.)-এর পদচিহ্ন অঙ্কিত সোনালী গম্বুজাকৃতির মিনারেল।',
    descEn: 'Glass pavilion preserving Prophet Ibrahim\'s footprints.',
    top: '67%',
    left: '65%',
    badgeBg: 'bg-amber-400 text-slate-950',
  },
  {
    id: 'yamani',
    titleBn: 'রুকনে ইয়ামানি',
    titleEn: 'Rukn Yamani',
    arabic: 'الرُّكْنُ اليَمَانِي',
    descBn: 'কাবার দক্ষিণ কোণ যা ইয়েমেনের দিকে মুখ করা। ডান হাতে স্পর্শ করা সুন্নাত।',
    descEn: 'Southern corner of the Kaaba pointing to Yemen.',
    top: '54%',
    left: '26%',
    badgeBg: 'bg-emerald-600 text-white',
  },
  {
    id: 'mizaab',
    titleBn: 'মিজাবে রহমত (স্বর্ণের পরনালা)',
    titleEn: 'Golden Rain Gutter',
    arabic: 'مِيزَابُ الرَّحْمَةِ',
    descBn: 'কাবার ছাদের উপর স্থাপিত স্বর্ণের তৈরি পানির পরনালা।',
    descEn: 'Golden rain spout on the roof of Kaaba.',
    top: '20%',
    left: '60%',
    badgeBg: 'bg-amber-500 text-slate-950',
  },
];

interface HajjRouteDetail {
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

const HAJJ_ROUTE_PHOTOS: HajjRouteDetail[] = [
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

export const LiveAnimationStudio: React.FC<LiveAnimationStudioProps> = ({
  onBack,
  soundEnabled,
  themeMode = 'night',
  selectedLanguage = 'bn',
  voiceGender = 'male',
}) => {
  const isDay = themeMode === 'day';
  const isBn = selectedLanguage === 'bn';

  const [activeScene, setActiveScene] = useState<StudioScene>('kaaba_scene');
  const [selectedPin, setSelectedPin] = useState<InfographicPin>(KAABA_INFOGRAPHIC_PINS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [animSpeed, setAnimSpeed] = useState<number>(1);

  // Tawaf Simulation State
  const tawafCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [tawafCircuit, setTawafCircuit] = useState<number>(1);
  const tawafAngleRef = useRef<number>(0);

  // Sa'i Simulation State
  const [saiTrip, setSaiTrip] = useState<number>(1);
  const [saiPos, setSaiPos] = useState<number>(0); // 0 (Safa) to 100 (Marwah)
  const [saiDirection, setSaiDirection] = useState<'to_marwah' | 'to_safa'>('to_marwah');
  const saiDirRef = useRef<'to_marwah' | 'to_safa'>('to_marwah');

  // Hajj Route Map State
  const [hajjRouteStep, setHajjRouteStep] = useState<number>(1);

  // Speech Helper (Arabic Voice Recitation)
  const handleSpeakArabic = (text: string) => {
    if (soundEnabled) soundHaptics.playTap();
    playArabicVoice(text, voiceGender);
  };

  // Canvas Tawaf Animation Loop
  useEffect(() => {
    if (activeScene !== 'kaaba_scene') return;

    let animFrameId: number;
    const canvas = tawafCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Crowd particles
    const pilgrims: Array<{ radius: number; angle: number; speed: number; size: number; opacity: number }> = [];
    for (let i = 0; i < 120; i++) {
      pilgrims.push({
        radius: 75 + Math.random() * 110,
        angle: Math.random() * Math.PI * 2,
        speed: (0.005 + Math.random() * 0.008) * animSpeed,
        size: 2.5 + Math.random() * 2,
        opacity: 0.5 + Math.random() * 0.5,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // 1. Draw Marble Mataf Floor Gradient
      const bgGrad = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, 240);
      bgGrad.addColorStop(0, '#0d1f23');
      bgGrad.addColorStop(0.7, '#071619');
      bgGrad.addColorStop(1, '#030a0c');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Draw Orbit Track Rings
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.15)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      for (let r = 80; r <= 180; r += 25) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // 3. Draw Green Light Line (Hajar al-Aswad Start Line)
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#10b981';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX + 210, centerY);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Green Corner Marker Dot
      ctx.fillStyle = '#34d399';
      ctx.beginPath();
      ctx.arc(centerX + 80, centerY, 6, 0, Math.PI * 2);
      ctx.fill();

      // 4. Draw Kaaba Centered Isometric Box
      const kSize = 64;
      ctx.shadowColor = 'rgba(251, 191, 36, 0.4)';
      ctx.shadowBlur = 25;
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(centerX - kSize / 2, centerY - kSize / 2, kSize, kSize);
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2.5;
      ctx.strokeRect(centerX - kSize / 2, centerY - kSize / 2, kSize, kSize);
      ctx.shadowBlur = 0;

      // Gold Kiswah Band
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(centerX - kSize / 2, centerY - kSize / 2 + 10, kSize, 8);

      // Gold Kaaba Door (Bab al-Kaaba)
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(centerX + kSize / 2 - 4, centerY - 10, 4, 18);

      // Label
      ctx.fillStyle = '#fef3c7';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🕋 الكَعْبَة', centerX, centerY + 4);

      // 5. Animate & Render Crowd Pilgrims (Counter-Clockwise)
      if (isPlaying) {
        pilgrims.forEach((p) => {
          p.angle -= p.speed * animSpeed;
        });
        tawafAngleRef.current -= 0.012 * animSpeed;

        const currentLap = (Math.floor((-tawafAngleRef.current) / (Math.PI * 2)) % 7) + 1;
        setTawafCircuit((prevLap) => {
          const nextLap = Math.max(1, Math.min(7, currentLap));
          return prevLap !== nextLap ? nextLap : prevLap;
        });
      }

      // Draw Crowd Dots
      pilgrims.forEach((p) => {
        const x = centerX + Math.cos(p.angle) * p.radius;
        const y = centerY + Math.sin(p.angle) * p.radius;
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 6. Draw Main Pilgrim Avatar (Highlighted Gold Dot with Ring)
      const mainX = centerX + Math.cos(tawafAngleRef.current) * 115;
      const mainY = centerY + Math.sin(tawafAngleRef.current) * 115;

      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 15;
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(mainX, mainY, 7, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(mainX, mainY, 11, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0;

      animFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animFrameId);
  }, [activeScene, isPlaying, animSpeed]);

  // Sa'i Animation Loop (Safa & Marwah)
  useEffect(() => {
    if (activeScene !== 'sai_scene' || !isPlaying) return;

    const interval = setInterval(() => {
      setSaiPos((prev) => {
        let step = 0.8 * animSpeed;
        if (saiDirRef.current === 'to_marwah') {
          if (prev >= 30 && prev <= 70) step *= 1.8;
          if (prev >= 100) {
            saiDirRef.current = 'to_safa';
            setSaiDirection('to_safa');
            setSaiTrip((t) => (t < 7 ? t + 1 : 1));
            return 100;
          }
          return prev + step;
        } else {
          if (prev >= 30 && prev <= 70) step *= 1.8;
          if (prev <= 0) {
            saiDirRef.current = 'to_marwah';
            setSaiDirection('to_marwah');
            setSaiTrip((t) => (t < 7 ? t + 1 : 1));
            return 0;
          }
          return prev - step;
        }
      });
    }, 40);

    return () => clearInterval(interval);
  }, [activeScene, isPlaying, animSpeed]);

  const activeRouteDetail = HAJJ_ROUTE_PHOTOS.find((r) => r.id === hajjRouteStep) || HAJJ_ROUTE_PHOTOS[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16 max-w-5xl mx-auto px-2 sm:px-4">
      {/* Studio Top Header Bar with Islamic Geometric Glow */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative overflow-hidden ${
          isDay
            ? 'bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white border-slate-800'
            : 'bg-gradient-to-r from-[#06181b] via-[#0b292e] to-[#06181b] text-white border-[#123942]'
        }`}
      >
        <div className="absolute right-0 top-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-4 relative z-10">
          <button
            onClick={() => {
              onBack();
              if (soundEnabled) soundHaptics.playTap();
            }}
            className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white transition active:scale-95 cursor-pointer flex items-center gap-2 text-xs sm:text-sm font-bold shadow-lg backdrop-blur-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isBn ? 'গાઇডে ফিরে যান' : 'Back'}</span>
          </button>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black mb-1 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{isBn ? 'প্রিমিয়াম থ্রিডি সিমুলেশন ও রিয়াল ফটো স্টুডিও' : 'Real Location Photo Studio'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              {isBn ? 'পবিত্র কাবা তাওয়াফ, সাঈ ও হজ রুট অরিজিনাল ফটো স্টুডিও' : 'Real Photo Tawaf, Sa\'i & Hajj Route Studio'}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <button
            onClick={() => setAnimSpeed((s) => (s === 1 ? 1.5 : s === 1.5 ? 2.5 : 1))}
            className="px-4 py-2.5 rounded-xl bg-white/10 text-xs font-mono font-bold text-amber-300 border border-white/20 cursor-pointer shadow-md backdrop-blur-md"
          >
            Speed: {animSpeed}x
          </button>

          <button
            onClick={() => {
              setIsPlaying((p) => !p);
              if (soundEnabled) soundHaptics.playTap();
            }}
            className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-xl transition active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            <span>{isPlaying ? (isBn ? 'পজ' : 'Pause') : (isBn ? 'প্লে' : 'Play')}</span>
          </button>
        </div>
      </div>

      {/* Chapter Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-2 rounded-2xl bg-slate-900 border border-slate-800 text-white shadow-xl">
        <button
          onClick={() => {
            setActiveScene('kaaba_scene');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`py-3.5 px-3 rounded-xl text-xs sm:text-sm font-black transition flex items-center justify-center gap-2 cursor-pointer ${
            activeScene === 'kaaba_scene' ? 'bg-amber-500 text-slate-950 shadow-lg scale-105' : 'hover:bg-slate-800 text-slate-300'
          }`}
        >
          <span>🕋</span>
          <span>{isBn ? 'কাবা তাওয়াফ সিমুলেটর' : 'Kaaba Tawaf'}</span>
        </button>

        <button
          onClick={() => {
            setActiveScene('sai_scene');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`py-3.5 px-3 rounded-xl text-xs sm:text-sm font-black transition flex items-center justify-center gap-2 cursor-pointer ${
            activeScene === 'sai_scene' ? 'bg-teal-600 text-white shadow-lg scale-105' : 'hover:bg-slate-800 text-slate-300'
          }`}
        >
          <span>🏔️</span>
          <span>{isBn ? 'সাফা-মারওয়া সাঈ' : 'Safa & Marwah'}</span>
        </button>

        <button
          onClick={() => {
            setActiveScene('hajj_map_scene');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`py-3.5 px-3 rounded-xl text-xs sm:text-sm font-black transition flex items-center justify-center gap-2 cursor-pointer ${
            activeScene === 'hajj_map_scene' ? 'bg-emerald-600 text-white shadow-lg scale-105' : 'hover:bg-slate-800 text-slate-300'
          }`}
        >
          <span>📷</span>
          <span>{isBn ? 'হজের ৫ দিনের অরিজিনাল ছবি' : '5-Day Real Photos'}</span>
        </button>

        <button
          onClick={() => {
            setActiveScene('infographic_scene');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`py-3.5 px-3 rounded-xl text-xs sm:text-sm font-black transition flex items-center justify-center gap-2 cursor-pointer ${
            activeScene === 'infographic_scene' ? 'bg-amber-500 text-slate-950 shadow-lg scale-105' : 'hover:bg-slate-800 text-slate-300'
          }`}
        >
          <span>🗺️</span>
          <span>{isBn ? 'ইনফোগ্রাফিক ও পিন' : 'Blueprint Infographic'}</span>
        </button>
      </div>

      {/* ======================================================= */}
      {/* SCENE 1: REAL-TIME CANVAs TAWAF SIMULATOR                 */}
      {/* ======================================================= */}
      {activeScene === 'kaaba_scene' && (
        <div className="p-6 sm:p-8 rounded-3xl border shadow-2xl bg-slate-900 text-white border-slate-800 relative overflow-hidden space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>{isBn ? 'লাইভ তাওয়াফ সিমুলেশন ও বাতি চিহ্নিত রুট' : 'Live Interactive Tawaf Canvas'}</span>
              </span>
              <h3 className="text-lg sm:text-xl font-black text-white mt-1">
                {isBn ? 'পবিত্র কাবার চারিপাশে তাওয়াফ (চক্কর ১ হতে ৭)' : 'Real-Time Anti-Clockwise Circuit Simulation'}
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-4 py-2 rounded-2xl bg-amber-500/20 text-amber-300 font-mono text-sm font-bold border border-amber-500/40">
                {isBn ? `চক্কর নম্বর: ${tawafCircuit} / ৭` : `Circuit: ${tawafCircuit} / 7`}
              </span>
              <button
                onClick={() => { tawafAngleRef.current -= Math.PI * 2 / 7; }}
                className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition active:scale-95 cursor-pointer flex items-center gap-1"
              >
                <FastForward className="w-4 h-4" />
                <span>{isBn ? 'পরবর্তী চক্কর' : 'Next Lap'}</span>
              </button>
            </div>
          </div>

          <div className="relative w-full h-[380px] sm:h-[450px] bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex items-center justify-center">
            <canvas
              ref={tawafCanvasRef}
              width={600}
              height={450}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}

      {/* ======================================================= */}
      {/* SCENE 2: REAL-TIME SA'I WALKING / JOGGING SIMULATOR       */}
      {/* ======================================================= */}
      {activeScene === 'sai_scene' && (
        <div className="p-6 sm:p-8 rounded-3xl border shadow-2xl bg-slate-900 text-white border-slate-800 relative overflow-hidden space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-teal-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
                <span>{isBn ? 'সাফা ও মারওয়া পাহাড়ের মাঝে সাঈ' : 'Mount Safa & Marwah Sa\'i Simulation'}</span>
              </span>
              <h3 className="text-lg sm:text-xl font-black text-white mt-1">
                {isBn ? 'সাফা ➔ মারওয়া ৭টি ট্রিপ ও সবুজ বাতি অঞ্চলে দ্রুত দৌড়ানো' : '7 Trips with Green Light Fast Jogging Zone'}
              </h3>
            </div>
          </div>

          <div className="relative w-full h-[320px] bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl p-6 flex flex-col justify-between overflow-hidden">
            <div className="flex items-center justify-between relative z-10">
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-emerald-500/50 shadow-lg text-center">
                <span className="text-2xl">🏔️</span>
                <div className="text-xs font-black text-emerald-400 mt-1">সাফা পাহাড় (Safa)</div>
              </div>

              <div className="px-4 py-2 rounded-2xl bg-green-500/20 border border-green-400/60 text-green-300 text-xs font-black animate-pulse">
                <span>{isBn ? '⚡ সবুজ বাতি অঞ্চল' : 'Green Light Jogging Zone'}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900 border border-teal-500/50 shadow-lg text-center">
                <span className="text-2xl">🏔️</span>
                <div className="text-xs font-black text-teal-400 mt-1">মারওয়া পাহাড় (Marwah)</div>
              </div>
            </div>

            <div className="relative w-full h-12 bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden flex items-center px-4 my-auto shadow-inner">
              <div className="w-[30%] h-full bg-slate-800/60" />
              <div className="w-[40%] h-full bg-gradient-to-r from-green-500/30 via-green-400/70 to-green-500/30 border-x-2 border-green-400 shadow-[0_0_25px_rgba(74,222,128,0.5)] flex items-center justify-center">
                <span className="text-[11px] font-black text-green-200 tracking-wider">GREEN LIGHT ZONE</span>
              </div>
              <div className="w-[30%] h-full bg-slate-800/60" />

              <div
                className="absolute top-1/2 -translate-y-1/2 transition-all duration-75 flex flex-col items-center z-20"
                style={{ left: `calc(${saiPos}% - 16px)` }}
              >
                <div className="w-8 h-8 rounded-full bg-amber-400 border-2 border-white shadow-[0_0_15px_rgba(251,191,36,0.9)] flex items-center justify-center text-slate-950 font-bold text-xs">
                  🏃
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================= */}
      {/* SCENE 3: HAJJ 5-DAY REAL LOCATION PHOTOS & DETAILS       */}
      {/* ======================================================= */}
      {activeScene === 'hajj_map_scene' && (
        <div className="p-6 sm:p-8 rounded-3xl border shadow-2xl bg-slate-900 text-white border-slate-800 relative overflow-hidden space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                <Camera className="w-4 h-4 text-emerald-400" />
                <span>{isBn ? 'হজের ৫ দিনের অরিজিনাল ছবি ও গাইড' : 'Hajj 5-Day Real Location Photos & Guide'}</span>
              </span>
              <h3 className="text-lg sm:text-xl font-black text-white mt-1">
                {isBn ? 'নিচের প্রতিটি ধাপে ক্লিক করে সেই স্থানের অরিজিনাল ছবি ও আমল দেখুন' : 'Click any step to view recent photo & exact rituals'}
              </h3>
            </div>
          </div>

          {/* 5 Step Selector Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {HAJJ_ROUTE_PHOTOS.map((node) => {
              const isSelected = hajjRouteStep === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => {
                    setHajjRouteStep(node.id);
                    if (soundEnabled) soundHaptics.playTap();
                  }}
                  className={`p-4 rounded-3xl border transition-all text-left cursor-pointer active:scale-95 flex flex-col justify-between space-y-2 relative overflow-hidden ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-400 shadow-2xl scale-105 ring-4 ring-emerald-400/40'
                      : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-full bg-white/20">
                      Step {node.id}
                    </span>
                    {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />}
                  </div>
                  <div>
                    <div className="text-xs font-black">{node.nameBn}</div>
                    <div className="text-xs font-bold text-amber-300 mt-0.5">{node.placeBn}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* REAL PHOTO DISPLAY CARD FOR SELECTED HAJJ STEP */}
          <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl space-y-6 animate-in fade-in duration-300">
            <div className="relative w-full h-[300px] sm:h-[400px] rounded-2xl overflow-hidden border border-slate-700 shadow-2xl group">
              <img
                src={activeRouteDetail.imageUrl}
                alt={activeRouteDetail.placeBn}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div className="space-y-1">
                  <span className="px-3 py-1 rounded-full bg-emerald-500 text-slate-950 font-black text-xs">
                    {activeRouteDetail.nameBn}
                  </span>
                  <h4 className="text-xl sm:text-2xl font-black text-white drop-shadow-md">
                    {activeRouteDetail.placeBn}
                  </h4>
                </div>
                <span className="font-arabic text-amber-300 font-bold text-lg sm:text-xl drop-shadow-md">
                  {activeRouteDetail.arabicName}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              {isBn ? activeRouteDetail.descBn : activeRouteDetail.descEn}
            </p>

            <div className="space-y-2 pt-1">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{isBn ? 'এই স্থানের প্রধান করণীয় কাজসমূহ:' : 'Key Rituals at this Location:'}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(isBn ? activeRouteDetail.checklistBn : activeRouteDetail.checklistEn).map((act, aIdx) => (
                  <div
                    key={aIdx}
                    className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs sm:text-sm flex items-start gap-2.5 text-slate-200"
                  >
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 font-mono">
                      {aIdx + 1}
                    </span>
                    <span className="leading-relaxed">{act}</span>
                  </div>
                ))}
              </div>
            </div>

            {activeRouteDetail.duaArabic && (
              <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/40 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-amber-400">
                  <span>{isBn ? 'পবিত্র দোয়া:' : 'Recommended Dua:'}</span>
                  <button
                    onClick={() => handleSpeakArabic(activeRouteDetail.duaArabic!)}
                    className="p-2 rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-400 cursor-pointer flex items-center justify-center shadow-md"
                    title={voiceGender === 'female' ? 'Play Audio (নারী কণ্ঠে)' : 'Play Audio (পুরুষ কণ্ঠে)'}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p dir="rtl" className="font-arabic text-lg text-right text-amber-200 leading-loose">
                  {activeRouteDetail.duaArabic}
                </p>
                <p className="text-xs font-semibold text-slate-300">
                  <strong className="text-amber-400">{isBn ? 'অর্থ: ' : 'Meaning: '}</strong>
                  {activeRouteDetail.duaMeaningBn}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================= */}
      {/* SCENE 0: INFOGRAPHIC BLUEPRINT VIEW                     */}
      {/* ======================================================= */}
      {activeScene === 'infographic_scene' && (
        <div className="p-6 sm:p-8 rounded-3xl border shadow-2xl bg-slate-900 text-white border-slate-800 relative overflow-hidden space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-sm sm:text-base font-black text-amber-400 uppercase tracking-widest flex items-center gap-2">
              <span>📍</span>
              <span>{isBn ? 'হজ্জ রোডম্যাপ ও ইন্টারেক্টিভ ল্যান্ডমার্ক পিন' : 'Interactive Hajj Roadmap & Landmark Pins'}</span>
            </span>
          </div>

          <div className="relative w-full h-[400px] sm:h-[480px] rounded-3xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-950 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-cover bg-center filter brightness-90"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1600&q=80')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            {/* Clickable Pins */}
            {KAABA_INFOGRAPHIC_PINS.map((pin) => {
              const isSelected = selectedPin.id === pin.id;
              return (
                <button
                  key={pin.id}
                  onClick={() => {
                    setSelectedPin(pin);
                    if (soundEnabled) soundHaptics.playTap();
                  }}
                  className={`absolute z-20 px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 shadow-2xl active:scale-95 ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 ring-4 ring-amber-400/80 scale-110 shadow-[0_0_20px_rgba(251,191,36,0.9)]'
                      : 'bg-black/90 text-white hover:bg-slate-900 border border-slate-700'
                  }`}
                  style={{ top: pin.top, left: pin.left }}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                  <span>{isBn ? pin.titleBn : pin.titleEn}</span>
                </button>
              );
            })}
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-700 text-sm sm:text-base space-y-3 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-400 text-base sm:text-lg">
                {isBn ? selectedPin.titleBn : selectedPin.titleEn}
              </span>
              <span className="font-arabic text-amber-300 font-bold text-lg">
                {selectedPin.arabic}
              </span>
            </div>
            <p className="text-slate-100 leading-relaxed font-medium">
              {isBn ? selectedPin.descBn : selectedPin.descEn}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

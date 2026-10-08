import React from 'react';
import { Sparkles, MapPin, Compass } from 'lucide-react';

interface AnimatedHistoryBannerProps {
  scene: string;
  title: string;
  category: string;
  year: number;
  locationName: string;
  className?: string;
}

export const AnimatedHistoryBanner: React.FC<AnimatedHistoryBannerProps> = ({
  scene,
  title,
  category,
  year,
  locationName,
  className = '',
}) => {
  // Determine color scheme & theme based on scene
  const getSceneConfig = () => {
    switch (scene) {
      case 'kaaba':
        return {
          titleBn: 'পবিত্র কাবা ও মক্কা মুকাররমা',
          arabicText: 'مَكَّةُ الْمُكَرَّمَةُ • بَيْتُ اللَّهِ الْحَرَامِ',
          gradient: 'from-[#07090d] via-[#12151d] to-[#1c1917]',
          accentColor: '#f59e0b',
          tag: 'পবিত্র হারামাইন',
        };
      case 'mosque':
      case 'domerock':
      case 'minaret':
      case 'istanbul':
      case 'modernmosque':
        return {
          titleBn: 'পবিত্র মসজিদ ও সোনালী মিনার',
          arabicText: 'الْمَسْجِدُ الْمُبَارَكُ • نُورُ الْهِدَايَةِ',
          gradient: 'from-[#041a17] via-[#092b25] to-[#0d3b32]',
          accentColor: '#10b981',
          tag: 'ঐতিহাসিক মসজিদ',
        };
      case 'journey':
      case 'tents':
      case 'wells':
        return {
          titleBn: 'মরুভূমির রুট ও বাণিজ্য কাফেলা',
          arabicText: 'قَافِلَةُ الصَّحْرَاءِ • رِحْلَةُ الإِيمَانِ',
          gradient: 'from-[#17120c] via-[#2a1d12] to-[#1c140d]',
          accentColor: '#fbbf24',
          tag: 'মরুভূমির কাফেলা',
        };
      case 'sea':
        return {
          titleBn: 'লোহিত সাগর ও সমুদ্র অভিযান',
          arabicText: 'الْبَحْرُ وَالْأَسَاطِيلُ • فُتُوحَاتُ الْإِسْلَامِ',
          gradient: 'from-[#021324] via-[#06243f] to-[#04172a]',
          accentColor: '#38bdf8',
          tag: 'সমুদ্র অভিযান',
        };
      case 'cave':
      case 'mountain':
        return {
          titleBn: 'নিভৃত হেরা গুহা ও জাবালে নূর',
          arabicText: 'غَارُ حِرَاءَ • مَهْبِطُ الْوَحْيِ الْأَمِينِ',
          gradient: 'from-[#0f1115] via-[#1a1c22] to-[#121318]',
          accentColor: '#a78bfa',
          tag: 'ওহির সূচনাস্থল',
        };
      case 'battle':
      case 'banners':
      case 'trench':
      case 'fortress':
      case 'fort':
        return {
          titleBn: 'ঐতিহাসিক ময়দান ও সত্যের সংগ্রাম',
          arabicText: 'جِهَادٌ فِي سَبِيلِ اللَّهِ • نَصْرٌ مِنَ اللَّهِ',
          gradient: 'from-[#1a0f0d] via-[#2c1713] to-[#170e0c]',
          accentColor: '#f43f5e',
          tag: 'ঐতিহাসিক ময়দান',
        };
      case 'scroll':
      case 'books':
      case 'library':
      case 'quran':
      case 'lamp':
        return {
          titleBn: 'বাইতুল হিকমাহ ও জ্ঞানের স্বর্ণযুগ',
          arabicText: 'بَيْتُ الْحِكْمَةِ • عَصْرُ الْعِلْمِ وَالْفِكْرِ',
          gradient: 'from-[#0a1820] via-[#102735] to-[#091b24]',
          accentColor: '#2dd4bf',
          tag: 'জ্ঞানের স্বর্ণযুগ',
        };
      case 'arches':
      case 'palace':
      case 'roundcity':
      case 'gate':
      case 'taj':
        return {
          titleBn: 'রাজকীয় প্রাসাদ ও ঐতিহাসিক সালতানাত',
          arabicText: 'حَضَارَةٌ إِسْلَامِيَّةٌ • أَنْدَلُسٌ وَخِلَافَةٌ',
          gradient: 'from-[#170b1f] via-[#271333] to-[#150a1c]',
          accentColor: '#e879f9',
          tag: 'ইসলামি সভ্যতা',
        };
      case 'river':
      case 'bengal':
      case 'shrine':
      default:
        return {
          titleBn: 'সবুজ বাংলার প্রান্তর ও নদী অববাহিকা',
          arabicText: 'بِلَادُ الْبِنْغَالِ • نُورُ الْأَوْلِيَاءِ وَالصَّالِحِينَ',
          gradient: 'from-[#051c19] via-[#0a2e28] to-[#061d19]',
          accentColor: '#34d399',
          tag: 'ঐতিহাসিক রেনেসাঁ',
        };
    }
  };

  const config = getSceneConfig();

  return (
    <div
      className={`relative w-full ${className || 'h-32 sm:h-36'} rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-gradient-to-br ${config.gradient} transition-all duration-700 flex flex-col justify-between p-3.5 sm:p-4 select-none`}
    >
      {/* 1. Animated Canvas Background using Pure SVG Graphics & Keyframes */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 600 200"
      >
        <defs>
          <style>{`
            @keyframes starTwinkle {
              0%, 100% { opacity: 0.2; transform: scale(0.8); }
              50% { opacity: 1; transform: scale(1.3); }
            }
            @keyframes noorPulse {
              0%, 100% { transform: scale(1); opacity: 0.45; }
              50% { transform: scale(1.15); opacity: 0.85; }
            }
            @keyframes cloudDrift {
              0% { transform: translateX(-40px); }
              100% { transform: translateX(640px); }
            }
            @keyframes seaWave {
              0%, 100% { transform: translateY(0) scaleY(1); }
              50% { transform: translateY(4px) scaleY(1.05); }
            }
            @keyframes bannerWave {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(3deg); }
            }
            @keyframes particleFloat {
              0% { transform: translateY(0px) opacity(0); }
              50% { opacity: 0.8; }
              100% { transform: translateY(-45px) opacity(0); }
            }
            .anim-star-1 { animation: starTwinkle 2.5s infinite ease-in-out; }
            .anim-star-2 { animation: starTwinkle 3.8s infinite ease-in-out 1s; }
            .anim-star-3 { animation: starTwinkle 4.2s infinite ease-in-out 1.8s; }
            .anim-noor { transform-origin: center; animation: noorPulse 4s infinite ease-in-out; }
            .anim-cloud { animation: cloudDrift 35s linear infinite; }
            .anim-wave { animation: seaWave 3s infinite ease-in-out; }
            .anim-banner { transform-origin: bottom left; animation: bannerWave 2.5s infinite ease-in-out; }
          `}</style>

          {/* Radial Noor Glow */}
          <radialGradient id="noorGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={config.accentColor} stopOpacity="0.8" />
            <stop offset="45%" stopColor={config.accentColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor={config.accentColor} stopOpacity="0" />
          </radialGradient>

          {/* Moon Glow */}
          <radialGradient id="moonRadial" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="50%" stopColor="#e0e7ff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
          </radialGradient>

          {/* Golden Kiswa Sheen */}
          <linearGradient id="kiswaGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#b45309" />
            <stop offset="50%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
        </defs>

        {/* Ambient Starfield */}
        <g opacity="0.85">
          <circle cx="80" cy="30" r="1.5" fill="#ffffff" className="anim-star-1" />
          <circle cx="150" cy="55" r="1.2" fill="#fef08a" className="anim-star-2" />
          <circle cx="220" cy="25" r="1.8" fill="#ffffff" className="anim-star-3" />
          <circle cx="310" cy="45" r="1.4" fill="#ffffff" className="anim-star-1" />
          <circle cx="410" cy="20" r="1.6" fill="#fde68a" className="anim-star-2" />
          <circle cx="490" cy="50" r="1.3" fill="#ffffff" className="anim-star-3" />
          <circle cx="560" cy="35" r="1.5" fill="#ffffff" className="anim-star-1" />
        </g>

        {/* Dynamic Scene Visual Elements on Right Half of Banner */}

        {/* SCENE A: KAABA (Makkah) */}
        {scene === 'kaaba' && (
          <g transform="translate(480, 110)">
            {/* Pulsing Golden Noor Halo */}
            <circle cx="0" cy="0" r="85" fill="url(#noorGlow)" className="anim-noor" />

            {/* Orbiting Golden Tawaf Ring */}
            <ellipse
              cx="0"
              cy="25"
              rx="75"
              ry="24"
              fill="none"
              stroke="url(#kiswaGold)"
              strokeWidth="1.5"
              strokeDasharray="4 8"
              opacity="0.65"
            />

            {/* Kaaba Isometric Cube */}
            <g transform="scale(1.15)">
              {/* Left Face (Dark Slate) */}
              <polygon points="-30,-10 0,8 0,48 -30,30" fill="#18181b" />
              {/* Right Face (Midnight Black) */}
              <polygon points="0,8 30,-10 30,30 0,48" fill="#09090b" />
              {/* Top Roof Face */}
              <polygon points="0,-28 30,-10 0,8 -30,-10" fill="#27272a" stroke="#3f3f46" strokeWidth="0.5" />

              {/* Golden Kiswa Belt (Hizam) on Left Face */}
              <polygon points="-30,3 0,21 0,26 -30,8" fill="url(#kiswaGold)" />
              {/* Golden Kiswa Belt on Right Face */}
              <polygon points="0,21 30,3 30,8 0,26" fill="url(#kiswaGold)" />

              {/* Golden Door (Bab al-Kaaba) on Right Face */}
              <polygon points="8,26 20,19 20,38 8,45" fill="url(#kiswaGold)" stroke="#f59e0b" strokeWidth="0.5" />

              {/* Golden Spout (Meezab ar-Rahmah) on top */}
              <line x1="-12" y1="-3" x2="-22" y2="-9" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" />
            </g>
          </g>
        )}

        {/* SCENE B: MOSQUE / MINARET / DOME */}
        {(scene === 'mosque' || scene === 'domerock' || scene === 'minaret' || scene === 'istanbul' || scene === 'modernmosque') && (
          <g transform="translate(470, 95)">
            <circle cx="0" cy="0" r="75" fill="url(#noorGlow)" className="anim-noor" />
            {/* Crescent Moon in Sky */}
            <circle cx="50" cy="-45" r="16" fill="url(#moonRadial)" opacity="0.9" />
            <path d="M 45 -55 A 14 14 0 0 0 58 -35 A 16 16 0 1 1 45 -55" fill="#f8fafc" />

            {/* Grand Mosque Dome */}
            <path
              d="M -40 50 Q -40 5 -5 -15 Q 0 -25 0 -32 Q 0 -25 5 -15 Q 40 5 40 50 Z"
              fill="#064e3b"
              stroke="#10b981"
              strokeWidth="1.5"
            />
            {/* Dome Golden Finial */}
            <line x1="0" y1="-32" x2="0" y2="-45" stroke="#fef08a" strokeWidth="2" />
            <circle cx="0" cy="-47" r="3.5" fill="#fef08a" />

            {/* Left Minaret */}
            <rect x="-65" y="-15" width="10" height="65" fill="#042f2e" stroke="#10b981" strokeWidth="0.8" />
            <polygon points="-67,-15 -60,-35 -53,-15" fill="#f59e0b" />
            {/* Right Minaret */}
            <rect x="55" y="-15" width="10" height="65" fill="#042f2e" stroke="#10b981" strokeWidth="0.8" />
            <polygon points="53,-15 60,-35 67,-15" fill="#f59e0b" />

            {/* Glowing Arched Windows */}
            <rect x="-14" y="22" width="8" height="16" rx="4" fill="#fef08a" opacity="0.9" className="anim-star-1" />
            <rect x="6" y="22" width="8" height="16" rx="4" fill="#fef08a" opacity="0.9" className="anim-star-2" />
          </g>
        )}

        {/* SCENE C: DESERT JOURNEY / CARAVAN */}
        {(scene === 'journey' || scene === 'tents' || scene === 'wells') && (
          <g transform="translate(440, 110)">
            {/* Golden Desert Sun / Moon */}
            <circle cx="40" cy="-35" r="28" fill="#f59e0b" opacity="0.85" className="anim-noor" />

            {/* Waving Golden Dunes */}
            <path
              d="M -160 50 Q -80 15 0 35 Q 80 50 160 20 L 160 80 L -160 80 Z"
              fill="#78350f"
              opacity="0.8"
            />
            <path
              d="M -160 65 Q -60 35 40 55 Q 120 70 160 45 L 160 80 L -160 80 Z"
              fill="#92400e"
              opacity="0.9"
            />

            {/* Silhouette of Traveling Caravan (Camels) */}
            <g transform="scale(0.85) translate(-40, 15)">
              <text x="0" y="0" fontSize="28" fill="#fef08a" opacity="0.9">
                🐫
              </text>
              <text x="35" y="5" fontSize="24" fill="#fef08a" opacity="0.8">
                🐫
              </text>
              <text x="70" y="8" fontSize="20" fill="#fef08a" opacity="0.7">
                🐫
              </text>
            </g>
          </g>
        )}

        {/* SCENE D: SEA EXPEDITION / SHIPS */}
        {scene === 'sea' && (
          <g transform="translate(470, 115)">
            <circle cx="20" cy="-35" r="24" fill="url(#moonRadial)" opacity="0.75" />
            {/* Water Wave Layers */}
            <path
              d="M -150 25 Q -90 10 -30 25 Q 30 40 90 20 Q 140 10 180 30 L 180 80 L -150 80 Z"
              fill="#0369a1"
              opacity="0.7"
              className="anim-wave"
            />
            <path
              d="M -150 40 Q -80 25 -10 40 Q 60 55 120 35 Q 150 30 180 45 L 180 80 L -150 80 Z"
              fill="#0284c7"
              opacity="0.85"
            />

            {/* Classical Islamic Dhow Ship Silhouette */}
            <g transform="translate(-10, -5) scale(0.9)">
              <polygon points="-25,18 25,18 15,30 -20,30" fill="#1e293b" />
              <line x1="0" y1="18" x2="0" y2="-22" stroke="#475569" strokeWidth="2" />
              {/* Triangular Lateen Sail */}
              <polygon points="0,-22 22,12 0,14" fill="#f8fafc" opacity="0.9" />
              <polygon points="0,-20 -18,12 0,14" fill="#cbd5e1" opacity="0.8" />
            </g>
          </g>
        )}

        {/* SCENE E: CAVE / MOUNT HIRA */}
        {(scene === 'cave' || scene === 'mountain') && (
          <g transform="translate(470, 105)">
            {/* Divine Ray of Noor from Heaven down to Cave */}
            <polygon
              points="0,-75 35,50 -35,50"
              fill="url(#noorGlow)"
              opacity="0.9"
              className="anim-noor"
            />

            {/* Mountain Silhouette (Jabal an-Nur) */}
            <polygon points="-110,65 -15,-25 60,65" fill="#1c1917" />
            <polygon points="-40,65 30,-15 110,65" fill="#292524" />

            {/* Glowing Cave Entrance (Hira) */}
            <ellipse cx="0" cy="22" rx="14" ry="18" fill="#0c0a09" />
            <circle cx="0" cy="22" r="10" fill="#fbbf24" opacity="0.9" className="anim-star-1" />
          </g>
        )}

        {/* SCENE F: BATTLE & HEROIC STRUGGLE */}
        {(scene === 'battle' || scene === 'banners' || scene === 'trench' || scene === 'fortress' || scene === 'fort') && (
          <g transform="translate(470, 100)">
            <circle cx="0" cy="0" r="70" fill="url(#noorGlow)" className="anim-noor" />

            {/* Waving Flag Banner */}
            <g className="anim-banner" transform="translate(-25, -20)">
              <line x1="0" y1="50" x2="0" y2="-25" stroke="#f59e0b" strokeWidth="2.5" />
              {/* Green & Gold Flag */}
              <path
                d="M 0 -25 Q 25 -32 50 -25 Q 35 -10 50 5 Q 25 -2 0 5 Z"
                fill="#047857"
                stroke="#fef08a"
                strokeWidth="1.5"
              />
              <text x="18" y="-8" fontSize="14" fill="#fef08a" textAnchor="middle">
                ☪
              </text>
            </g>

            {/* Crossed Legendary Swords */}
            <g transform="translate(20, 15) scale(0.9)">
              <line x1="-25" y1="-25" x2="25" y2="25" stroke="#e2e8f0" strokeWidth="3" strokeLinecap="round" />
              <line x1="25" y1="-25" x2="-25" y2="25" stroke="#e2e8f0" strokeWidth="3" strokeLinecap="round" />
              <circle cx="0" cy="0" r="12" fill="#7f1d1d" stroke="#f59e0b" strokeWidth="2" />
              <text x="0" y="4" fontSize="10" fill="#fef08a" textAnchor="middle" fontWeight="bold">
                ⚔
              </text>
            </g>
          </g>
        )}

        {/* SCENE G: KNOWLEDGE / LIBRARY / SCROLLS */}
        {(scene === 'scroll' || scene === 'books' || scene === 'library' || scene === 'quran' || scene === 'lamp') && (
          <g transform="translate(470, 95)">
            <circle cx="0" cy="5" r="70" fill="url(#noorGlow)" className="anim-noor" />

            {/* Open Holy Book / Ancient Scroll on Rehal (Rihal Stand) */}
            <g transform="translate(0, 10)">
              {/* Wooden Rihal Stand */}
              <polygon points="-22,25 22,-5 16,-8 -28,22" fill="#78350f" />
              <polygon points="22,25 -22,-5 -16,-8 28,22" fill="#92400e" />

              {/* Glowing Open Pages */}
              <path
                d="M -30 -12 Q -15 -18 0 -12 Q 15 -18 30 -12 L 28 8 Q 14 2 0 8 Q -14 2 -28 8 Z"
                fill="#fefce8"
                stroke="#f59e0b"
                strokeWidth="1.5"
                filter="drop-shadow(0 0 10px rgba(245, 158, 11, 0.5))"
              />
              {/* Calligraphy Lines */}
              <line x1="-22" y1="-7" x2="-4" y2="-7" stroke="#b45309" strokeWidth="1" />
              <line x1="-22" y1="-1" x2="-4" y2="-1" stroke="#b45309" strokeWidth="1" />
              <line x1="4" y1="-7" x2="22" y2="-7" stroke="#b45309" strokeWidth="1" />
              <line x1="4" y1="-1" x2="22" y2="-1" stroke="#b45309" strokeWidth="1" />
            </g>

            {/* Floating Golden Wisdom Light Particles */}
            <circle cx="-15" cy="-25" r="2" fill="#fef08a" className="anim-star-1" />
            <circle cx="20" cy="-30" r="2.5" fill="#fef08a" className="anim-star-2" />
            <circle cx="0" cy="-35" r="1.8" fill="#ffffff" className="anim-star-3" />
          </g>
        )}

        {/* SCENE H: PALACE / CIVILIZATION */}
        {(scene === 'arches' || scene === 'palace' || scene === 'roundcity' || scene === 'gate' || scene === 'taj') && (
          <g transform="translate(470, 95)">
            <circle cx="0" cy="0" r="75" fill="url(#noorGlow)" className="anim-noor" />

            {/* Grand Horseshoe Arch of Andalusia / Alhambra */}
            <path
              d="M -35 50 L -35 15 C -35 -20, 35 -20, 35 15 L 35 50"
              fill="none"
              stroke="#e879f9"
              strokeWidth="3"
            />
            <path
              d="M -26 50 L -26 15 C -26 -12, 26 -12, 26 15 L 26 50"
              fill="#3b0764"
              opacity="0.8"
            />

            {/* Hanging Lantern (Fanous) */}
            <g transform="translate(0, -5)">
              <line x1="0" y1="-30" x2="0" y2="0" stroke="#fef08a" strokeWidth="1.2" />
              <polygon points="-6,0 6,0 8,14 -8,14" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
              <circle cx="0" cy="7" r="4.5" fill="#ffffff" className="anim-star-1" />
            </g>
          </g>
        )}

        {/* SCENE I: RIVERS / BENGAL / AWLIYA */}
        {(scene === 'river' || scene === 'bengal' || scene === 'shrine') && (
          <g transform="translate(470, 105)">
            {/* Luminous Green Oasis Glow */}
            <circle cx="0" cy="0" r="75" fill="url(#noorGlow)" className="anim-noor" />

            {/* Flowing Delta River Waves */}
            <path
              d="M -140 30 Q -70 10 0 35 Q 70 50 140 25 L 140 75 L -140 75 Z"
              fill="#065f46"
              opacity="0.8"
              className="anim-wave"
            />
            <path
              d="M -140 45 Q -60 30 20 48 Q 90 60 140 40 L 140 75 L -140 75 Z"
              fill="#047857"
              opacity="0.9"
            />

            {/* Bengal Palm Silhouette & Dome */}
            <g transform="translate(-30, 0)">
              <line x1="0" y1="35" x2="5" y2="-15" stroke="#78350f" strokeWidth="3" />
              <circle cx="6" cy="-20" r="16" fill="#15803d" opacity="0.9" />
            </g>
            {/* Historic Dargah / Mosque Dome */}
            <path
              d="M 5 35 Q 5 10 25 -5 Q 45 10 45 35 Z"
              fill="#fef08a"
              opacity="0.9"
            />
            <circle cx="25" cy="-8" r="3" fill="#f59e0b" />
          </g>
        )}
      </svg>

      {/* 2. Top Bar: Live Tag & Arabic Epoch Title */}
      <div className="z-10 flex items-center justify-between gap-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/40 border border-white/20 backdrop-blur-md text-[10px] font-black text-amber-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
          <span>✨ অ্যানিমেটেড দৃশ্য • {config.tag}</span>
        </div>

        <span className="text-[11px] font-arabic font-bold text-amber-200/90 dir-rtl tracking-wide drop-shadow">
          {config.arabicText}
        </span>
      </div>

      {/* 3. Bottom Hero Title & Location Meta */}
      <div className="z-10 space-y-1 text-left max-w-[85%] sm:max-w-[75%]">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-amber-300 drop-shadow">
          <span>{config.titleBn}</span>
          <span>•</span>
          <span className="text-white/80">{year} খ্রি.</span>
        </div>

        <h3 className="text-base sm:text-lg font-black tracking-tight text-white drop-shadow-md line-clamp-1">
          {title}
        </h3>

        <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-200/90 truncate">
          <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
          <span className="truncate">{locationName}</span>
        </div>
      </div>
    </div>
  );
};

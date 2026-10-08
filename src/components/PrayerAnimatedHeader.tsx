import React from 'react';
import {
  Sun,
  Moon,
  Sunrise as SunriseIcon,
  Sunset as SunsetIcon,
  Sparkles,
  Volume2,
  VolumeX,
  Clock,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';

interface PrayerAnimatedHeaderProps {
  prayerId: string;
  nameBn: string;
  nameEn: string;
  nameAr: string;
  timeRange: string;
  celestialSignBn: string;
  isActive?: boolean;
  isPrayed?: boolean;
  isPlayingAdhan?: boolean;
  onToggleAdhan?: () => void;
  isDay?: boolean;
}

export const PrayerAnimatedHeader: React.FC<PrayerAnimatedHeaderProps> = ({
  prayerId,
  nameBn,
  nameEn,
  nameAr,
  timeRange,
  celestialSignBn,
  isActive = false,
  isPrayed = false,
  isPlayingAdhan = false,
  onToggleAdhan,
  isDay = true,
}) => {
  // Theme styling based on prayer phase
  const getThemeConfig = () => {
    switch (prayerId) {
      case 'Fajr':
        return {
          gradient: 'from-[#0b1329] via-[#1d274d] to-[#4a2e58]',
          glowColor: '#f59e0b',
          accentColor: '#fbbf24',
          badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
          phaseName: 'সুবহে সাদিক • প্রভাত ও উষা',
          phaseEn: 'True Dawn & Twilight',
          sunMoonType: 'dawn',
        };
      case 'Dhuhr':
        return {
          gradient: 'from-[#0369a1] via-[#0284c7] to-[#0ea5e9]',
          glowColor: '#fbbf24',
          accentColor: '#fef08a',
          badgeBg: 'bg-emerald-400/20 text-emerald-100 border-emerald-300/40',
          phaseName: 'যাওয়াল • দ্বিপ্রহরের মধ্যাহ্ন',
          phaseEn: 'Solar Zenith & Midday',
          sunMoonType: 'zenith-sun',
        };
      case 'Asr':
        return {
          gradient: 'from-[#9a3412] via-[#c2410c] to-[#ea580c]',
          glowColor: '#f97316',
          accentColor: '#fed7aa',
          badgeBg: 'bg-amber-400/20 text-amber-100 border-amber-300/40',
          phaseName: 'তিজাহে আসর • সোনালী বিকেল',
          phaseEn: 'The Golden Hour',
          sunMoonType: 'golden-sun',
        };
      case 'Maghrib':
        return {
          gradient: 'from-[#4c0519] via-[#881337] to-[#b91c1c]',
          glowColor: '#f43f5e',
          accentColor: '#fecdd3',
          badgeBg: 'bg-rose-400/20 text-rose-100 border-rose-300/40',
          phaseName: 'সূর্যাস্ত ও শাফাক • রক্তিম সন্ধ্যা',
          phaseEn: 'Sunset & Crimson Dusk',
          sunMoonType: 'sunset-crescent',
        };
      case 'Isha':
      case 'Tahajjud':
      default:
        return {
          gradient: 'from-[#020b14] via-[#081b2d] to-[#0f2e46]',
          glowColor: '#38bdf8',
          accentColor: '#7dd3fc',
          badgeBg: 'bg-cyan-400/20 text-cyan-200 border-cyan-400/30',
          phaseName: 'নিশুতি রাত • তারকারাজি ও চাঁদ',
          phaseEn: 'Nocturnal Starlit Heavens',
          sunMoonType: 'night-crescent',
        };
    }
  };

  const theme = getThemeConfig();

  return (
    <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-white/10 select-none">
      {/* 1. ANIMATED SKY CANVAS BACKGROUND */}
      <div className={`relative h-44 sm:h-52 w-full bg-gradient-to-b ${theme.gradient} overflow-hidden`}>
        {/* Ambient atmospheric radial lights */}
        <div
          className="absolute -top-12 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full blur-3xl opacity-40 animate-pulse pointer-events-none"
          style={{ backgroundColor: theme.glowColor }}
        />

        {/* Twinkling Stars (for Fajr, Maghrib, Isha, Tahajjud) */}
        {(prayerId === 'Fajr' || prayerId === 'Maghrib' || prayerId === 'Isha' || prayerId === 'Tahajjud') && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Star 1 */}
            <div className="absolute top-4 left-[12%] w-1.5 h-1.5 rounded-full bg-white shadow-sm shadow-white animate-ping opacity-75" />
            <div className="absolute top-7 left-[28%] w-1 h-1 rounded-full bg-cyan-200 opacity-80" />
            {/* Star 2 */}
            <div className="absolute top-3 left-[48%] w-2 h-2 rounded-full bg-amber-200 shadow-md shadow-amber-200 animate-pulse" />
            <div className="absolute top-10 left-[62%] w-1.5 h-1.5 rounded-full bg-white opacity-70" />
            {/* Star 3 */}
            <div className="absolute top-5 right-[18%] w-2 h-2 rounded-full bg-sky-200 shadow-sm shadow-sky-200 animate-ping" />
            <div className="absolute top-12 right-[8%] w-1 h-1 rounded-full bg-amber-100 opacity-60" />
            {/* Star 4 */}
            <div className="absolute top-14 left-[8%] w-1.5 h-1.5 rounded-full bg-white opacity-50" />
            <div className="absolute top-16 right-[35%] w-1 h-1 rounded-full bg-emerald-200 opacity-70" />
          </div>
        )}

        {/* Drifting Clouds SVG (Daytime and Twilight) */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
            {/* Cloud Layer 1 */}
            <path
              d="M-50,65 Q20,35 90,60 Q160,85 240,55 Q320,25 400,60 Q480,95 550,60 L550,150 L-50,150 Z"
              fill="rgba(255, 255, 255, 0.12)"
            />
            {/* Cloud Layer 2 */}
            <path
              d="M-20,95 Q70,75 160,95 Q250,115 340,85 Q430,55 520,95 L520,150 L-20,150 Z"
              fill="rgba(255, 255, 255, 0.08)"
            />
          </svg>
        </div>

        {/* CELESTIAL BODY: Glowing Sun or Radiant Crescent */}
        {theme.sunMoonType === 'zenith-sun' && (
          <div className="absolute top-5 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
            {/* Sun Aura */}
            <div className="relative flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-yellow-300/30 blur-xl animate-pulse" />
              <div className="absolute w-12 h-12 rounded-full bg-yellow-200 shadow-lg shadow-yellow-300 flex items-center justify-center">
                <Sun className="w-8 h-8 text-amber-600 animate-spin" style={{ animationDuration: '24s' }} />
              </div>
            </div>
            {/* Light Beams */}
            <div className="text-[10px] font-bold text-yellow-100/90 tracking-widest uppercase mt-1 drop-shadow">
              সূর্য মধ্যাকাশে • Solar Zenith
            </div>
          </div>
        )}

        {theme.sunMoonType === 'golden-sun' && (
          <div className="absolute top-6 right-16 flex flex-col items-center pointer-events-none">
            <div className="relative flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-amber-400/40 blur-xl animate-pulse" />
              <div className="absolute w-12 h-12 rounded-full bg-gradient-to-tr from-orange-400 to-amber-200 shadow-lg shadow-orange-500/50 flex items-center justify-center">
                <Sun className="w-7 h-7 text-amber-800" />
              </div>
            </div>
          </div>
        )}

        {theme.sunMoonType === 'dawn' && (
          <div className="absolute top-5 left-14 flex items-center gap-3 pointer-events-none">
            {/* Morning Star / Venus */}
            <div className="relative flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-amber-300/30 blur-lg animate-pulse" />
              <div className="absolute w-4 h-4 rounded-full bg-white shadow-lg shadow-amber-300 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" style={{ animationDuration: '10s' }} />
              </div>
            </div>
            <span className="text-[10px] font-bold text-amber-200/90 drop-shadow">
              সুবহে সাদিক • Morning Star
            </span>
          </div>
        )}

        {(theme.sunMoonType === 'sunset-crescent' || theme.sunMoonType === 'night-crescent') && (
          <div className="absolute top-5 right-12 flex flex-col items-center pointer-events-none">
            <div className="relative flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-cyan-300/20 blur-xl animate-pulse" />
              <div className="absolute w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Moon className="w-6 h-6 text-cyan-200 fill-cyan-100" />
              </div>
            </div>
          </div>
        )}

        {/* 2. MAJESTIC ANIMATED ISLAMIC MOSQUE SILHOUETTE ARCHITECTURE */}
        <div className="absolute bottom-0 inset-x-0 pointer-events-none">
          <svg
            className="w-full h-24 sm:h-28"
            viewBox="0 0 600 130"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background Layer Silhouette (Distant minarets) */}
            <path
              d="M0,130 L0,95 L40,95 L43,55 L47,55 L47,40 L45,40 L45,28 L48,25 L50,15 L52,25 L55,28 L55,40 L53,40 L53,55 L57,55 L60,95 L140,95 L160,85 Q200,60 240,85 L260,95 L340,95 L343,55 L347,55 L347,40 L345,40 L345,28 L348,25 L350,15 L352,25 L355,28 L355,40 L353,40 L353,55 L357,55 L360,95 L440,95 Q480,70 520,95 L600,95 L600,130 Z"
              fill="rgba(4, 15, 23, 0.45)"
            />

            {/* Foreground Layer Silhouette: Grand Central Dome + Main Minarets */}
            <path
              d="
                M 0,130 
                L 0,105 
                L 70,105 
                L 72,70 L 76,70 L 76,45 L 73,45 L 73,32 L 77,28 L 80,10 L 83,28 L 87,32 L 87,45 L 84,45 L 84,70 L 88,70 L 90,105
                L 190,105
                Q 205,105 215,92
                Q 250,92 260,78
                Q 300,28 340,78
                Q 350,92 385,92
                Q 395,105 410,105
                L 510,105
                L 512,70 L 516,70 L 516,45 L 513,45 L 513,32 L 517,28 L 520,10 L 523,28 L 527,32 L 527,45 L 524,45 L 524,70 L 528,70 L 530,105
                L 600,105 
                L 600,130 
                Z
              "
              fill="#06181f"
            />

            {/* Grand Dome Crescent Finial Spire */}
            <path
              d="M 300,28 L 300,12 M 297,14 Q 300,8 303,14 Q 299,10 297,14"
              stroke="#fbbf24"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Left Minaret Crescent */}
            <path
              d="M 80,10 L 80,2 M 78,4 Q 80,0 82,4"
              stroke="#fbbf24"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Right Minaret Crescent */}
            <path
              d="M 520,10 L 520,2 M 518,4 Q 520,0 522,4"
              stroke="#fbbf24"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* Glowing Lantern Arched Windows inside Central Dome */}
            <rect x="282" y="80" width="8" height="15" rx="4" fill="#fef08a" opacity="0.85" />
            <rect x="296" y="76" width="8" height="18" rx="4" fill="#fef08a" opacity="0.95" />
            <rect x="310" y="80" width="8" height="15" rx="4" fill="#fef08a" opacity="0.85" />

            {/* Minaret Balcony Window Glows */}
            <rect x="78" y="52" width="4" height="8" rx="2" fill="#fed7aa" opacity="0.9" />
            <rect x="518" y="52" width="4" height="8" rx="2" fill="#fed7aa" opacity="0.9" />
          </svg>
        </div>

        {/* 3. FLOATING BADGE & CONTROLS OVERLAY (Header Top Bar) */}
        <div className="absolute top-3 inset-x-3 sm:inset-x-4 flex items-center justify-between z-10">
          {/* Phase Pill with Pulsing Glow */}
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black border backdrop-blur-md shadow-sm transition-all ${theme.badgeBg}`}
            >
              <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
              <span>{theme.phaseName}</span>
            </span>

            {/* Active Waqt Pill */}
            {isActive && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-500 text-white shadow-lg shadow-emerald-500/50 animate-pulse">
                <Clock className="w-3 h-3" />
                <span>চলতি ওয়াক্ত</span>
              </span>
            )}

            {isPrayed && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-600/90 text-white shadow-sm border border-emerald-400/40">
                <CheckCircle2 className="w-3 h-3" />
                <span>আদায় সম্পন্ন ✓</span>
              </span>
            )}
          </div>

          {/* Adhan Sound Player Button */}
          {onToggleAdhan && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleAdhan();
              }}
              className={`p-2 rounded-xl backdrop-blur-md border transition-all active:scale-95 cursor-pointer shadow-md flex items-center gap-1.5 ${
                isPlayingAdhan
                  ? 'bg-rose-500 text-white border-rose-400 animate-pulse'
                  : 'bg-white/20 hover:bg-white/30 text-white border-white/30'
              }`}
              title={isPlayingAdhan ? 'Stop Adhan' : `Play ${nameEn} Adhan`}
            >
              {isPlayingAdhan ? (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span className="text-[10px] font-bold hidden xs:inline">বন্ধ করুন</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4" />
                  <span className="text-[10px] font-bold hidden xs:inline">আযান শুনুন</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* 4. HERO TITLE & CALLIGRAPHY IN FOREGROUND OVERLAY */}
        <div className="absolute bottom-3.5 inset-x-3 sm:inset-x-5 flex items-end justify-between z-10 text-white">
          <div>
            <div className="flex items-baseline gap-2">
              <h3 className="text-xl sm:text-2xl font-black tracking-tight drop-shadow-md">
                {nameBn} সালাত
              </h3>
              <span className="text-sm sm:text-base font-arabic font-bold text-amber-300 drop-shadow">
                ({nameAr})
              </span>
            </div>
            <p className="text-[11px] sm:text-xs font-semibold text-emerald-100/90 flex items-center gap-1.5 drop-shadow">
              <span>{celestialSignBn}</span>
            </p>
          </div>

          {/* Time Range Pill */}
          <div className="text-right">
            <span className="inline-block px-3 py-1 rounded-xl bg-black/40 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-black font-mono tracking-tight text-white shadow-md">
              {timeRange}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

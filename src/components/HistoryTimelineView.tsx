import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  ISLAMIC_HISTORY_EVENTS,
  ISLAMIC_HISTORY_ERAS,
  CATEGORY_INFO,
  HistoryEvent,
  HistoryEra,
} from '../data/islamicHistoryData';
import { ThemeMode, ZikrLanguage } from '../types';
import { soundHaptics } from '../utils/audioHaptics';
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Compass,
  ArrowRight,
  Maximize2,
} from 'lucide-react';

interface HistoryTimelineViewProps {
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
  soundEnabled?: boolean;
}

// Convert English numbers to Bengali digits
function toBengaliDigits(num: number | string): string {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num
    .toString()
    .split('')
    .map((char) => (char >= '0' && char <= '9' ? bnDigits[parseInt(char, 10)] : char))
    .join('');
}

// Crisp Geographical X, Y coordinates mapping for Middle East, Africa, Europe, India, Bengal on our premium canvas (width 1000, height 600)
const GEOGRAPHIC_COORDS: Record<string, { x: number; y: number }> = {
  birth_of_prophet: { x: 340, y: 440 }, // Makkah
  passing_of_mother: { x: 320, y: 405 }, // Al-Abwa
  trip_to_syria: { x: 290, y: 250 }, // Busra, Syria
  first_revelation: { x: 340, y: 440 }, // Cave Hira, Makkah
  hijrah_abyssinia: { x: 230, y: 490 }, // Axum, Ethiopia
  great_hijrah: { x: 330, y: 375 }, // Al-Madinah (Yathrib)
  battle_of_badr: { x: 310, y: 395 }, // Badr
  battle_of_uhud: { x: 330, y: 368 }, // Mount Uhud
  battle_of_trench: { x: 328, y: 375 }, // Khandaq (Madinah)
  treaty_hudaybiyyah: { x: 338, y: 432 }, // Hudaybiyyah
  conquest_of_makkah: { x: 340, y: 440 }, // Makkah
  tabuk_expedition: { x: 285, y: 310 }, // Tabuk
  farewell_pilgrimage: { x: 345, y: 448 }, // Mount Arafat
  caliphate_abu_bakr: { x: 395, y: 385 }, // Yamamah
  battle_of_yarmouk: { x: 285, y: 235 }, // Yarmouk
  conquest_of_jerusalem: { x: 275, y: 248 }, // Jerusalem
  conquest_of_egypt: { x: 185, y: 275 }, // Fustat / Cairo
  quran_standardization: { x: 330, y: 375 }, // Madinah
  caliphate_ali: { x: 385, y: 250 }, // Kufa
  tragedy_of_karbala: { x: 375, y: 242 }, // Karbala
  conquest_of_sindh_spain: { x: 30, y: 140 }, // Spain (Gibraltar) / Sindh (X=590)
  abbasid_house_of_wisdom: { x: 380, y: 225 }, // Baghdad
  fatimid_al_azhar: { x: 185, y: 275 }, // Al-Azhar, Cairo
  battle_of_manzikert: { x: 440, y: 155 }, // Manzikert
  salahuddin_liberation_jerusalem: { x: 275, y: 248 }, // Jerusalem
  islam_in_bengal_bakhtiyar: { x: 810, y: 340 }, // Gaur, Bengal
  fall_of_baghdad_mongols: { x: 380, y: 225 }, // Baghdad
  battle_of_ain_jalut: { x: 285, y: 250 }, // Ain Jalut, Palestine
  foundation_ottoman_empire: { x: 335, y: 125 }, // Sogut, Turkey
  shah_jalal_sylhet: { x: 835, y: 330 }, // Sylhet, Bangladesh
  conquest_of_constantinople: { x: 315, y: 105 }, // Istanbul
  mughal_empire_foundation: { x: 720, y: 300 }, // Panipat
  mughal_dhaka_capital: { x: 825, y: 345 }, // Dhaka, Bangladesh
  battle_of_plassey: { x: 805, y: 350 }, // Palashi, Bengal
  battle_of_balakot: { x: 690, y: 230 }, // Balakot
  deoband_foundation: { x: 730, y: 295 }, // Deoband
  abolition_ottoman_caliphate: { x: 315, y: 105 }, // Istanbul
  bangladesh_independence_ummah: { x: 825, y: 345 }, // Dhaka, Bangladesh
  modern_ummah_2026: { x: 340, y: 440 }, // Makkah / Global
};

// Route paths coordinates mapping for beautiful vector flow rendering
const GEOGRAPHIC_ROUTES: Record<string, { x: number; y: number }[]> = {
  great_hijrah: [
    { x: 340, y: 440 }, // Makkah
    { x: 338, y: 432 }, // Hudaybiyyah
    { x: 320, y: 405 }, // Al-Abwa
    { x: 330, y: 375 }, // Madinah
  ],
  tabuk_expedition: [
    { x: 330, y: 375 }, // Madinah
    { x: 308, y: 345 }, // Al-Ula
    { x: 285, y: 310 }, // Tabuk
  ],
  conquest_of_sindh_spain: [
    { x: 110, y: 180 }, // North Africa
    { x: 30, y: 140 }, // Gibraltar / Spain
  ],
  salahuddin_liberation_jerusalem: [
    { x: 295, y: 220 }, // Damascus
    { x: 285, y: 235 }, // Yarmouk
    { x: 275, y: 248 }, // Jerusalem
  ],
};

export const HistoryTimelineView: React.FC<HistoryTimelineViewProps> = ({
  themeMode = 'night',
  selectedLanguage = 'bn',
  soundEnabled = true,
}) => {
  const isDay = themeMode === 'day';
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playSpeed, setPlaySpeed] = useState<number>(1); // 0.5x, 1x, 2x
  const [mapMode, setMapMode] = useState<'then' | 'now'>('then'); // Historical vs Present Names
  const [showRoutes, setShowRoutes] = useState<boolean>(true);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');

  // Interactive Zoom & Pan State for the Custom SVG Map
  const [zoom, setZoom] = useState<number>(1.1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const activeEvent = ISLAMIC_HISTORY_EVENTS[currentIndex];

  const activeEra = useMemo(() => {
    return ISLAMIC_HISTORY_ERAS.find((era) => era.id === activeEvent.eraId) || ISLAMIC_HISTORY_ERAS[0];
  }, [activeEvent]);

  const filteredEvents = useMemo(() => {
    if (selectedCategoryFilter === 'all') return ISLAMIC_HISTORY_EVENTS;
    return ISLAMIC_HISTORY_EVENTS.filter((e) => e.category === selectedCategoryFilter);
  }, [selectedCategoryFilter]);

  // Handle automatic auto-play cycle through timeline
  useEffect(() => {
    if (!isPlaying) return;
    const intervalMs = 4500 / playSpeed;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= ISLAMIC_HISTORY_EVENTS.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        if (soundEnabled) soundHaptics.playTap();
        return prev + 1;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPlaying, playSpeed, soundEnabled]);

  // Center/pan the map smoothly onto the active event X/Y coordinates
  useEffect(() => {
    if (!activeEvent) return;
    const coords = GEOGRAPHIC_COORDS[activeEvent.id] || { x: 500, y: 300 };
    const targetX = 500 - coords.x * zoom;
    const targetY = 300 - coords.y * zoom;

    setPanOffset({
      x: targetX * 0.35,
      y: targetY * 0.35,
    });
  }, [currentIndex, zoom]);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      if (soundEnabled) soundHaptics.playTap();
    }
  };

  const handleNext = () => {
    if (currentIndex < ISLAMIC_HISTORY_EVENTS.length - 1) {
      setCurrentIndex(currentIndex + 1);
      if (soundEnabled) soundHaptics.playTap();
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (soundEnabled) soundHaptics.playTap();
  };

  const cycleSpeed = () => {
    if (playSpeed === 1) setPlaySpeed(2);
    else if (playSpeed === 2) setPlaySpeed(0.5);
    else setPlaySpeed(1);
    if (soundEnabled) soundHaptics.playTap();
  };

  const handleJumpToEra = (era: HistoryEra) => {
    const targetIdx = ISLAMIC_HISTORY_EVENTS.findIndex((e) => e.eraId === era.id);
    if (targetIdx !== -1) {
      setCurrentIndex(targetIdx);
      if (soundEnabled) soundHaptics.playTap();
    }
  };

  const resetMap = () => {
    setZoom(1.1);
    setPanOffset({ x: 0, y: 0 });
    if (soundEnabled) soundHaptics.playTap();
  };

  // Drag handlers for the Custom SVG Map
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX - panOffset.x, y: e.clientY - panOffset.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Background Theme Banners
  const getBannerGraphics = (theme: HistoryEvent['bgTheme']) => {
    switch (theme) {
      case 'night_desert':
        return (
          <div className="relative w-full h-32 rounded-2xl overflow-hidden bg-gradient-to-b from-[#111c2a] via-[#1c1a2e] to-[#2d2224] flex items-center justify-between p-4 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#3b82f618,#00000000)]" />
            <div className="z-10 space-y-1">
              <span className="inline-flex items-center gap-1 text-amber-300 text-[10px] font-bold">
                🌙 মরুভূমির নিস্তব্ধ রাত
              </span>
              <h4 className="text-sm font-bold tracking-tight text-amber-100 line-clamp-2">
                {activeEvent.titleBn}
              </h4>
            </div>
            <div className="relative z-10 w-12 h-12 flex items-center justify-center shrink-0">
              <div className="w-8 h-8 rounded-full bg-amber-200/90 shadow-[0_0_15px_rgba(251,191,36,0.5)] flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-[#111c2a] translate-x-1.5 -translate-y-0.5" />
              </div>
            </div>
          </div>
        );
      case 'battle':
        return (
          <div className="relative w-full h-32 rounded-2xl overflow-hidden bg-gradient-to-b from-[#2d1111] via-[#3a1919] to-[#220f0f] flex items-center justify-between p-4 text-white">
            <div className="z-10 space-y-1">
              <span className="inline-flex items-center gap-1 text-rose-400 text-[10px] font-bold">
                ⚔️ সংগ্রাম ও বীরত্বপূর্ণ অভিযান
              </span>
              <h4 className="text-sm font-bold tracking-tight text-rose-100 line-clamp-2">
                {activeEvent.titleBn}
              </h4>
            </div>
            <div className="z-10 text-3xl opacity-80">🛡️</div>
          </div>
        );
      case 'mosque':
        return (
          <div className="relative w-full h-32 rounded-2xl overflow-hidden bg-gradient-to-b from-[#092b26] via-[#0f3d35] to-[#0a231f] flex items-center justify-between p-4 text-white">
            <div className="z-10 space-y-1">
              <span className="inline-flex items-center gap-1 text-emerald-300 text-[10px] font-bold">
                🕌 গম্বুজ ও পবিত্র কাবা শরীফ
              </span>
              <h4 className="text-sm font-bold tracking-tight text-emerald-100 line-clamp-2">
                {activeEvent.titleBn}
              </h4>
            </div>
            <div className="z-10 shrink-0 text-3xl">🕋</div>
          </div>
        );
      default:
        return (
          <div className="relative w-full h-32 rounded-2xl overflow-hidden bg-gradient-to-b from-[#0c2c34] via-[#103d46] to-[#0a2027] flex items-center justify-between p-4 text-white">
            <div className="z-10 space-y-1">
              <span className="inline-flex items-center gap-1 text-teal-300 text-[10px] font-bold">
                🌴 ইসলামী রেনেসাঁ ও ঐতিহ্য
              </span>
              <h4 className="text-sm font-bold tracking-tight text-teal-100 line-clamp-2">
                {activeEvent.titleBn}
              </h4>
            </div>
            <div className="z-10 text-3xl opacity-80">🗺️</div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-300 select-none pb-8">
      
      {/* 1. TOP PREMIUM WIDE HERO BANNER */}
      <div className="relative w-full rounded-[26px] overflow-hidden border border-[#163f47]/50 bg-gradient-to-r from-[#07191e] via-[#0b262d] to-[#10363e] p-5 sm:p-6 text-white shadow-xl min-h-[170px] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#14b8a612,#00000000)]" />
        
        <div className="z-10 space-y-2 max-w-2xl text-left">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-0.5 rounded-full uppercase">
              অধ্যায় {toBengaliDigits(activeEra.chapterNo)} • {toBengaliDigits(activeEra.startYearAD)}-{toBengaliDigits(activeEra.endYearAD)}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-amber-100 tracking-tight">
            {activeEra.titleBn}
          </h2>
          <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed font-medium">
            {activeEra.summaryBn}
          </p>
        </div>

        <div className="z-10 flex flex-col items-center md:items-end gap-3 shrink-0">
          <div className="relative w-24 h-14 bg-gradient-to-t from-slate-900 to-slate-800 border border-slate-700/60 rounded-xl p-2 hidden sm:flex flex-col justify-between overflow-hidden shadow-inner">
            <div className="absolute inset-x-0 top-3 h-1.5 bg-amber-400 opacity-80" />
            <div className="text-[10px] text-teal-300/50 uppercase tracking-widest font-black self-end">KABAH</div>
            <div className="text-xs self-start">🕋</div>
          </div>

          {/* Chapter switches */}
          <div className="flex items-center gap-1 bg-black/30 p-1 rounded-2xl border border-white/10">
            {ISLAMIC_HISTORY_ERAS.map((era) => {
              const isSelected = activeEra.id === era.id;
              return (
                <button
                  key={era.id}
                  onClick={() => handleJumpToEra(era)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full text-xs font-bold transition-all active:scale-90 flex items-center justify-center cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-500 text-white font-black shadow-md'
                      : 'bg-white/10 hover:bg-white/20 text-teal-200'
                  }`}
                  title={era.titleBn}
                >
                  {toBengaliDigits(era.chapterNo)}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Middle Grid: Crisp Custom SVG Map Section (Left) & Event Details Panel (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        
        {/* LEFT: CRISP GEOGRAPHIC HIGH-FIDELITY VECTOR MAP */}
        <div
          className={`lg:col-span-7 rounded-3xl border shadow-xl overflow-hidden relative flex flex-col justify-between ${
            isDay ? 'bg-[#dcefe0] border-teal-300 shadow-[#006747]/5' : 'bg-[#0f2422] border-[#163f45] shadow-black/60'
          }`}
          style={{ minHeight: '520px' }}
        >
          {/* Top Floating Controls */}
          <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
            {/* Map Mode Toggles ("তখন" vs "এখন" & "সফরপথ") */}
            <div className="flex items-center gap-1.5 pointer-events-auto bg-[#07191e]/90 backdrop-blur-md p-1.5 rounded-2xl border border-teal-500/30 shadow-lg">
              <button
                type="button"
                onClick={() => {
                  setMapMode('then');
                  if (soundEnabled) soundHaptics.playTap();
                }}
                className={`px-3 py-1 rounded-xl text-[11px] font-extrabold transition ${
                  mapMode === 'then'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                তখন
              </button>
              <button
                type="button"
                onClick={() => {
                  setMapMode('now');
                  if (soundEnabled) soundHaptics.playTap();
                }}
                className={`px-3 py-1 rounded-xl text-[11px] font-extrabold transition ${
                  mapMode === 'now'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                এখন
              </button>

              <div className="h-4 w-px bg-slate-700 mx-1" />

              <button
                type="button"
                onClick={() => setShowRoutes(!showRoutes)}
                className={`px-3 py-1 rounded-xl text-[11px] font-extrabold transition ${
                  showRoutes
                    ? 'bg-teal-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                সফরপথ
              </button>
            </div>

            {/* Map Zoom Controls */}
            <div className="flex items-center gap-1 pointer-events-auto bg-[#07191e]/90 backdrop-blur-md p-1 rounded-2xl border border-teal-500/30 shadow-lg">
              <button
                type="button"
                onClick={() => setZoom((z) => Math.min(z + 0.25, 2.5))}
                className="p-1.5 hover:bg-slate-800 text-teal-200 hover:text-white rounded-xl transition cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.max(z - 0.25, 0.75))}
                className="p-1.5 hover:bg-slate-800 text-teal-200 hover:text-white rounded-xl transition cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={resetMap}
                className="p-1.5 hover:bg-slate-800 text-teal-200 hover:text-white rounded-xl transition cursor-pointer"
                title="Reset View"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Premium Vector SVG Map Canvas (Draggable / Zoomable) */}
          <div
            className="w-full h-[450px] sm:h-[490px] cursor-grab active:cursor-grabbing relative overflow-hidden"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div
              className="w-full h-full origin-center transition-all duration-300 ease-out"
              style={{
                transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom})`,
              }}
            >
              <svg
                viewBox="0 0 1000 600"
                className="w-full h-full object-contain"
              >
                {/* Background Sea */}
                <rect width="1000" height="600" fill={isDay ? '#e8f3ec' : '#081719'} />

                {/* Elegant Coastlines and Countries contours (Pristine geography!) */}
                <g stroke={isDay ? '#b3d4b9' : '#143c41'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill={isDay ? '#c4dec9' : '#0e2b2e'}>
                  {/* Arabian Peninsula */}
                  <path d="M 280,310 L 310,350 L 320,380 L 310,405 L 340,440 L 345,448 L 395,385 L 430,340 L 460,330 L 440,300 L 410,260 L 380,225 L 315,220 Z" />
                  
                  {/* Levant & Egypt */}
                  <path d="M 280,310 L 250,290 L 185,275 L 140,285 L 140,330 L 190,360 L 240,380 L 280,350 Z" />
                  
                  {/* Spain & Mediterranean contours */}
                  <path d="M 30,140 L 80,130 L 130,120 L 185,150 L 240,160 L 210,200 L 160,210 Z" />
                  
                  {/* Anatolia / Turkey */}
                  <path d="M 270,160 L 315,105 L 335,125 L 440,155 L 400,195 L 320,180 Z" />
                  
                  {/* Iraq & Persia */}
                  <path d="M 380,225 L 440,190 L 510,180 L 590,220 L 590,310 L 510,320 L 430,340 Z" />
                  
                  {/* India & South Asia contours */}
                  <path d="M 590,310 L 640,320 L 690,230 L 730,295 L 720,300 L 805,350 L 825,345 L 835,330 L 810,340 Z" />
                </g>

                {/* Regional text labels on land (Non-overlapping, extremely crisp!) */}
                <g className="font-extrabold text-[12px] opacity-75 select-none pointer-events-none fill-[#2f6d53] dark:fill-emerald-300">
                  <text x="340" y="470" textAnchor="middle">মক্কা</text>
                  <text x="300" y="365" textAnchor="middle">ইয়াসরিব</text>
                  <text x="290" y="275" textAnchor="middle">শাম</text>
                  <text x="405" y="415" textAnchor="middle">নজদ</text>
                  <text x="360" y="445" textAnchor="middle">হিজাজ</text>
                  <text x="185" y="300" textAnchor="middle">মিসর</text>
                  <text x="390" y="270" textAnchor="middle">ইরাক</text>
                  <text x="510" y="240" textAnchor="middle">পারস্য</text>
                  <text x="330" y="150" textAnchor="middle">বিজান্টাইন</text>
                  <text x="825" y="375" textAnchor="middle">বাংলা</text>
                  <text x="30" y="165" textAnchor="middle">স্পেন</text>
                </g>

                {/* Show routes path with animated glowing lines */}
                {showRoutes && GEOGRAPHIC_ROUTES[activeEvent.id] && (
                  <g>
                    {(() => {
                      const pts = GEOGRAPHIC_ROUTES[activeEvent.id];
                      const ptsStr = pts.map((p) => `${p.x},${p.y}`).join(' ');
                      const color = CATEGORY_INFO[activeEvent.category].color;
                      return (
                        <>
                          <polyline
                            points={ptsStr}
                            fill="none"
                            stroke={color}
                            strokeWidth="3.5"
                            strokeDasharray="6 4"
                            className="animate-pulse"
                          />
                          {pts.map((p, idx) => (
                            <circle
                              key={idx}
                              cx={p.x}
                              cy={p.y}
                              r="4.5"
                              fill={color}
                              stroke="#ffffff"
                              strokeWidth="1.5"
                            />
                          ))}
                        </>
                      );
                    })()}
                  </g>
                )}

                {/* Render All Place Pin Markers */}
                {filteredEvents.map((evt) => {
                  const isCurrent = evt.id === activeEvent.id;
                  const coords = GEOGRAPHIC_COORDS[evt.id] || { x: 500, y: 300 };
                  const color = CATEGORY_INFO[evt.category].color;

                  return (
                    <g
                      key={evt.id}
                      className="cursor-pointer transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        const idx = ISLAMIC_HISTORY_EVENTS.findIndex((x) => x.id === evt.id);
                        if (idx !== -1) {
                          setCurrentIndex(idx);
                          if (soundEnabled) soundHaptics.playTap();
                        }
                      }}
                    >
                      {/* Active place pin outer glowing pulse halo ring */}
                      {isCurrent && (
                        <circle
                          cx={coords.x}
                          cy={coords.y}
                          r="18"
                          fill={color}
                          opacity="0.3"
                          className="animate-ping"
                        />
                      )}

                      {/* Clean marker circles */}
                      <circle
                        cx={coords.x}
                        cy={coords.y}
                        r={isCurrent ? 9 : 5.5}
                        fill={color}
                        stroke="#ffffff"
                        strokeWidth={isCurrent ? '2.5' : '1.5'}
                        className="shadow-md transition-all duration-300"
                      />

                      {isCurrent && (
                        <circle cx={coords.x} cy={coords.y} r="3" fill="#ffffff" />
                      )}

                      {/* Display city / location text beneath the marker nicely */}
                      <text
                        x={coords.x}
                        y={coords.y - (isCurrent ? 14 : 9)}
                        textAnchor="middle"
                        fill={isDay ? '#0e2b21' : '#ffffff'}
                        fontSize={isCurrent ? '11' : '9.5'}
                        fontWeight={isCurrent ? 'black' : 'bold'}
                        className="pointer-events-none drop-shadow-md select-none font-sans"
                      >
                        {mapMode === 'then' ? evt.locationThenBn : evt.locationNowBn}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Large Year Watermark Display on Map Bottom-Left */}
          <div className="absolute bottom-5 left-4 z-10 pointer-events-none space-y-0.5 bg-slate-900/60 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-teal-500/10">
            <div className="text-4xl sm:text-5xl font-black text-amber-400 tracking-tighter leading-none">
              {toBengaliDigits(activeEvent.yearAD)} <span className="text-xl font-bold text-white">খ্রি.</span>
            </div>
            <div className="text-[10px] sm:text-xs font-black text-teal-100">
              {activeEvent.yearAH < 0
                ? `হিজরতের ${toBengaliDigits(Math.abs(activeEvent.yearAH))} বছর আগে`
                : `হিজরতের ${toBengaliDigits(activeEvent.yearAH)} বছর পর`}
            </div>
          </div>

          {/* Legend indicator */}
          <div className="absolute bottom-3 right-3 z-10 bg-slate-900/90 backdrop-blur-md p-2.5 rounded-2xl border border-teal-500/30 text-[10px] text-teal-100 hidden sm:block shadow-lg max-w-[260px]">
            <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-left">
              {Object.entries(CATEGORY_INFO).map(([key, info]) => (
                <div key={key} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: info.color }} />
                  <span className="truncate">{info.labelBn}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: PREMIUM EVENT CARD DETAILS PANEL */}
        <div
          className={`lg:col-span-5 rounded-3xl border shadow-xl p-5 space-y-4 flex flex-col justify-between ${
            isDay ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#0a242a] border-[#16444e] text-white'
          }`}
          style={{ minHeight: '520px' }}
        >
          {getBannerGraphics(activeEvent.bgTheme)}

          {/* Meta Tag & Categories Bar */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-teal-900/40 pb-2.5">
            <span
              className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm flex items-center gap-1"
              style={{ backgroundColor: CATEGORY_INFO[activeEvent.category].color }}
            >
              <span>{CATEGORY_INFO[activeEvent.category].icon}</span>
              <span>{CATEGORY_INFO[activeEvent.category].labelBn}</span>
            </span>

            <div className="text-right flex flex-col items-end">
              <span className="text-sm font-black text-amber-600 dark:text-amber-400">
                {toBengaliDigits(activeEvent.yearAD)} খ্রি.
              </span>
              <span className="text-[10px] text-slate-400 font-semibold">
                {activeEvent.yearAH < 0 ? `হিজরতের ${toBengaliDigits(Math.abs(activeEvent.yearAH))} বছর আগে` : `${toBengaliDigits(activeEvent.yearAH)} হি.`}
              </span>
            </div>
          </div>

          {/* Title & Translation */}
          <div className="space-y-1 text-left">
            <h3 className="text-base sm:text-lg font-black tracking-tight leading-snug text-emerald-800 dark:text-emerald-100">
              {activeEvent.titleBn}
            </h3>
            {activeEvent.titleAr && (
              <p className="font-arabic text-xs text-amber-600/90 dark:text-amber-400/80 leading-relaxed font-bold">
                {activeEvent.titleAr}
              </p>
            )}
          </div>

          {/* Location Table Comparison */}
          <div className={`p-3 rounded-2xl border flex items-center justify-between gap-2 text-xs ${
            isDay ? 'bg-slate-50 border-slate-200' : 'bg-[#0e2f36] border-[#184c57]'
          }`}>
            <div className="space-y-0.5 text-left">
              <span className="text-[9px] text-slate-400 dark:text-emerald-300/60 font-semibold uppercase tracking-wider block">তখন</span>
              <span className="font-bold text-slate-800 dark:text-emerald-100">{activeEvent.locationThenBn}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-emerald-500 shrink-0" />
            <div className="text-right space-y-0.5">
              <span className="text-[9px] text-slate-400 dark:text-emerald-300/60 font-semibold uppercase tracking-wider block">বর্তমানে</span>
              <span className="font-bold text-emerald-700 dark:text-emerald-300">{activeEvent.locationNowBn}</span>
            </div>
          </div>

          {/* Main Story Narrative */}
          <div className="space-y-3 flex-1 overflow-y-auto max-h-[170px] pr-1 scrollbar-thin text-left">
            <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-emerald-100/90 font-medium">
              {activeEvent.fullStoryBn}
            </p>

            {/* Figures list */}
            {activeEvent.keyFiguresBn && activeEvent.keyFiguresBn.length > 0 && (
              <div className="pt-2 border-t border-slate-100 dark:border-teal-900/35">
                <span className="text-[10px] font-black text-slate-400 dark:text-emerald-300/70 block mb-1">
                  এই অধ্যায়ের সম্মানিত ব্যক্তিত্ব:
                </span>
                <div className="flex flex-wrap gap-1">
                  {activeEvent.keyFiguresBn.map((fig, idx) => (
                    <span
                      key={idx}
                      className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold border ${
                        isDay
                          ? 'bg-slate-100 border-slate-200 text-slate-600'
                          : 'bg-[#123840] border-[#194e5a] text-emerald-300'
                      }`}
                    >
                      {fig}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Prev/Next Buttons */}
          <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-teal-900/40">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`flex-1 py-2.5 px-3 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer border ${
                currentIndex === 0
                  ? 'opacity-40 cursor-not-allowed bg-slate-200 border-slate-300 dark:bg-slate-800 dark:border-slate-700 text-slate-500'
                  : isDay
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                  : 'bg-[#0f3840] hover:bg-[#164d57] border-[#18535e] text-emerald-200'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>← আগের</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={currentIndex === ISLAMIC_HISTORY_EVENTS.length - 1}
              className={`flex-1 py-2.5 px-3 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md border ${
                currentIndex === ISLAMIC_HISTORY_EVENTS.length - 1
                  ? 'opacity-40 cursor-not-allowed bg-slate-200 border-slate-300 text-slate-500'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-500'
              }`}
            >
              <span>পরের গন্তব্য →</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM CONTROLS & TIMELINE BAR WITH VISITED PROGRESS STATUS */}
      <div
        className={`p-4 rounded-3xl border shadow-xl space-y-3 ${
          isDay ? 'bg-white border-slate-200' : 'bg-[#0a242a] border-[#16444e]'
        }`}
      >
        {/* Playback Controls */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={togglePlay}
              className={`w-10 h-10 rounded-2xl flex items-center justify-center transition active:scale-95 text-white shadow-md cursor-pointer ${
                isPlaying ? 'bg-amber-600 hover:bg-amber-700' : 'bg-emerald-600 hover:bg-emerald-700'
              }`}
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
            </button>

            <button
              type="button"
              onClick={cycleSpeed}
              className={`px-3 py-2 rounded-2xl text-xs font-bold transition cursor-pointer border ${
                isDay
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                  : 'bg-[#103840] hover:bg-[#184d58] text-teal-200 border-[#1a5561]'
              }`}
            >
              {playSpeed}x গতি
            </button>
          </div>

          <div className="text-center hidden sm:block">
            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-300 truncate max-w-xs sm:max-w-md">
              {activeEvent.titleBn} ({toBengaliDigits(activeEvent.yearAD)} খ্রি.)
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-semibold">
              {toBengaliDigits(570)} খ্রি. – {toBengaliDigits(2026)} খ্রি.
            </span>
          </div>
        </div>

        {/* Chronological Era Timeline strip */}
        <div className="w-full grid grid-cols-8 gap-0.5 rounded-xl overflow-hidden text-[10px] font-bold text-white shadow-inner h-6 text-center">
          {ISLAMIC_HISTORY_ERAS.map((era) => (
            <div
              key={era.id}
              className="flex items-center justify-center px-1 truncate transition-opacity hover:opacity-90 cursor-default"
              style={{ backgroundColor: era.color }}
              title={`${era.titleBn} (${era.startYearAD} - ${era.endYearAD})`}
            >
              <span className="truncate">{era.titleBn}</span>
            </div>
          ))}
        </div>

        {/* Range Slider and Ticks */}
        <div className="relative pt-2 pb-1">
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-2 pointer-events-none">
            {ISLAMIC_HISTORY_EVENTS.map((evt, idx) => {
              const isSelected = idx === currentIndex;
              return (
                <div
                  key={evt.id}
                  className="flex flex-col items-center"
                  style={{ width: `${100 / ISLAMIC_HISTORY_EVENTS.length}%` }}
                >
                  <div
                    className={`w-1.5 rounded-full transition-all ${
                      isSelected ? 'h-4 bg-amber-400 shadow-md ring-2 ring-amber-300' : 'h-2'
                    }`}
                    style={{ backgroundColor: isSelected ? '#fbbf24' : CATEGORY_INFO[evt.category].color }}
                  />
                </div>
              );
            })}
          </div>

          <input
            type="range"
            min={0}
            max={ISLAMIC_HISTORY_EVENTS.length - 1}
            value={currentIndex}
            onChange={(e) => {
              setCurrentIndex(parseInt(e.target.value, 10));
              if (soundEnabled) soundHaptics.playTap();
            }}
            className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none focus:outline-none"
          />

          <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 mt-1">
            <span>৫৭০ খ্রি.</span>
            <span>৬২২ খ্রি.</span>
            <span>৬৬১ খ্রি.</span>
            <span>৭৫০ খ্রি.</span>
            <span>১০০০ খ্রি.</span>
            <span>১২৫৮ খ্রি.</span>
            <span>১৫০০ খ্রি.</span>
            <span>১৮০০ খ্রি.</span>
            <span>২০ ২৬ খ্রি.</span>
          </div>
        </div>

        {/* Visited places Progress Bar Status */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 text-[10px] sm:text-xs font-bold text-slate-500 dark:text-emerald-300/80">
          <span>
            {toBengaliDigits(currentIndex + 1)}টির মধ্যে {toBengaliDigits(ISLAMIC_HISTORY_EVENTS.length)}টি স্থান ঘুরে দেখা হয়েছে
          </span>
          <div className="w-full sm:w-48 bg-slate-200 dark:bg-[#123840] h-2 rounded-full overflow-hidden border border-teal-500/10">
            <div
              className="bg-emerald-500 h-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / ISLAMIC_HISTORY_EVENTS.length) * 100}%` }}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

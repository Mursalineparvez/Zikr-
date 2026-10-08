import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  ISLAMIC_HISTORY_EVENTS,
  ISLAMIC_HISTORY_ERAS,
  CATEGORY_INFO,
  HistoryEvent,
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
  MapPin,
  Calendar,
  Sparkles,
  Info,
  Compass,
  Layers,
  ArrowRight,
  Maximize2,
} from 'lucide-react';

interface HistoryTimelineViewProps {
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
  soundEnabled?: boolean;
}

// Convert latitude and longitude to SVG map X and Y coordinates (Mercator-like projection tuned for ME/N Africa/S Asia)
function projectCoordinates(lat: number, lng: number, width: number, height: number, zoom: number, offset: { x: number; y: number }) {
  // Map bounds: Lat ~ 10 to 45 N, Lng ~ -10 to 95 E
  const minLng = -12;
  const maxLng = 98;
  const minLat = 8;
  const maxLat = 48;

  const rawX = ((lng - minLng) / (maxLng - minLng)) * width;
  const rawY = (1 - (lat - minLat) / (maxLat - minLat)) * height;

  const centerX = width / 2;
  const centerY = height / 2;

  const projectedX = (rawX - centerX) * zoom + centerX + offset.x;
  const projectedY = (rawY - centerY) * zoom + centerY + offset.y;

  return { x: projectedX, y: projectedY };
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

export const HistoryTimelineView: React.FC<HistoryTimelineViewProps> = ({
  themeMode = 'night',
  selectedLanguage = 'bn',
  soundEnabled = true,
}) => {
  const isDay = themeMode === 'day';
  const [currentIndex, setCurrentIndex] = useState<number>(9); // Default to Tabuk expedition or Makkah conquest
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playSpeed, setPlaySpeed] = useState<number>(1); // 0.5x, 1x, 2x
  const [mapMode, setMapMode] = useState<'then' | 'now'>('then'); // Historical vs Present place names
  const [showRoutes, setShowRoutes] = useState<boolean>(true);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  
  // Map Zoom & Pan State
  const [zoom, setZoom] = useState<number>(1.2);
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const activeEvent = ISLAMIC_HISTORY_EVENTS[currentIndex];

  // Filtered events list if category filter is active
  const filteredEvents = useMemo(() => {
    if (selectedCategoryFilter === 'all') return ISLAMIC_HISTORY_EVENTS;
    return ISLAMIC_HISTORY_EVENTS.filter((e) => e.category === selectedCategoryFilter);
  }, [selectedCategoryFilter]);

  // Center map automatically when activeEvent changes
  useEffect(() => {
    if (!activeEvent) return;
    const mapW = 800;
    const mapH = 500;
    // Calculate raw X, Y without current offset to find target offset
    const targetPt = projectCoordinates(activeEvent.coordinates.lat, activeEvent.coordinates.lng, mapW, mapH, zoom, { x: 0, y: 0 });
    const targetOffsetX = (mapW / 2 - targetPt.x);
    const targetOffsetY = (mapH / 2 - targetPt.y);

    setOffset({
      x: targetOffsetX * 0.4,
      y: targetOffsetY * 0.4,
    });
  }, [currentIndex, zoom]);

  // Auto-play timer loop
  useEffect(() => {
    if (!isPlaying) return;
    const intervalMs = 4000 / playSpeed;
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

  const resetMap = () => {
    setZoom(1.2);
    setOffset({ x: 0, y: 0 });
    if (soundEnabled) soundHaptics.playTap();
  };

  // Drag handlers for interactive map
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setOffset({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Map rendering coordinates
  const mapWidth = 800;
  const mapHeight = 500;

  const currentCoords = projectCoordinates(
    activeEvent.coordinates.lat,
    activeEvent.coordinates.lng,
    mapWidth,
    mapHeight,
    zoom,
    offset
  );

  // Background Theme Banners for Event Card Header
  const getBannerGraphics = (theme: HistoryEvent['bgTheme']) => {
    switch (theme) {
      case 'night_desert':
        return (
          <div className="relative w-full h-36 sm:h-44 rounded-2xl overflow-hidden bg-gradient-to-b from-[#121c2c] via-[#241a2e] to-[#402a28] flex items-center justify-between p-5 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#3b82f618,#00000000)]" />
            <div className="z-10 space-y-1 max-w-[65%]">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                🌙 মরুভূমির প্রান্তর ও ঐতিহাসিক রাত
              </span>
              <h3 className="text-lg font-black tracking-tight drop-shadow-md leading-tight text-amber-100">
                {activeEvent.titleBn}
              </h3>
            </div>
            {/* Desert dune & Moon Graphic */}
            <div className="relative z-10 w-24 h-24 flex items-center justify-center shrink-0">
              <div className="w-12 h-12 rounded-full bg-amber-200/90 shadow-[0_0_25px_rgba(251,191,36,0.6)] flex items-center justify-center">
                <div className="w-9 h-9 rounded-full bg-[#1e1c2e] translate-x-2.5 -translate-y-1" />
              </div>
            </div>
          </div>
        );
      case 'battle':
        return (
          <div className="relative w-full h-36 sm:h-44 rounded-2xl overflow-hidden bg-gradient-to-b from-[#311111] via-[#4d1919] to-[#2b0f0f] flex items-center justify-between p-5 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#ef444430,#00000000)]" />
            <div className="z-10 space-y-1 max-w-[70%]">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold">
                ⚔️ ঐতিহাসিক সংগ্রাম ও অভিযান
              </span>
              <h3 className="text-lg font-black tracking-tight drop-shadow-md leading-tight text-rose-100">
                {activeEvent.titleBn}
              </h3>
            </div>
            <div className="z-10 text-4xl opacity-80 shrink-0">🛡️</div>
          </div>
        );
      case 'mosque':
        return (
          <div className="relative w-full h-36 sm:h-44 rounded-2xl overflow-hidden bg-gradient-to-b from-[#092b26] via-[#0f4039] to-[#0a231f] flex items-center justify-between p-5 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#10b98130,#00000000)]" />
            <div className="z-10 space-y-1 max-w-[70%]">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                🕌 পবিত্র গম্বুজ ও মসজিদ স্থাপত্য
              </span>
              <h3 className="text-lg font-black tracking-tight drop-shadow-md leading-tight text-emerald-100">
                {activeEvent.titleBn}
              </h3>
            </div>
            <div className="z-10 text-4xl opacity-80 shrink-0">🕋</div>
          </div>
        );
      case 'golden':
        return (
          <div className="relative w-full h-36 sm:h-44 rounded-2xl overflow-hidden bg-gradient-to-b from-[#2e230d] via-[#473614] to-[#261d0a] flex items-center justify-between p-5 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#f59e0b30,#00000000)]" />
            <div className="z-10 space-y-1 max-w-[70%]">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                📜 জ্ঞানের স্বর্ণযুগ ও বিজ্ঞান
              </span>
              <h3 className="text-lg font-black tracking-tight drop-shadow-md leading-tight text-amber-100">
                {activeEvent.titleBn}
              </h3>
            </div>
            <div className="z-10 text-4xl opacity-80 shrink-0">📖</div>
          </div>
        );
      default:
        return (
          <div className="relative w-full h-36 sm:h-44 rounded-2xl overflow-hidden bg-gradient-to-b from-[#0c2e35] via-[#12444e] to-[#0a2128] flex items-center justify-between p-5 text-white">
            <div className="z-10 space-y-1 max-w-[70%]">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[10px] font-bold">
                🌴 ইসলামী ইতিহাস ও নিদর্শন
              </span>
              <h3 className="text-lg font-black tracking-tight drop-shadow-md leading-tight text-teal-100">
                {activeEvent.titleBn}
              </h3>
            </div>
            <div className="z-10 text-4xl opacity-80 shrink-0">🗺️</div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-300 select-none pb-8">
      {/* Top Banner Header */}
      <div
        className={`p-4 sm:p-5 rounded-3xl border shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
          isDay
            ? 'bg-gradient-to-r from-teal-800 via-emerald-800 to-teal-900 text-white border-teal-700/50'
            : 'bg-gradient-to-r from-[#092226] via-[#123840] to-[#0d2e34] text-white border-[#153e46]'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shrink-0 text-emerald-300 shadow-inner">
            <Compass className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-black tracking-tight text-white">
                {selectedLanguage === 'bn' ? 'ইতিহাসের পাতা' : 'Islamic History & Map'}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-emerald-500/30">
                ৫৭০ খ্রি. – ২০২৬ খ্রি.
              </span>
            </div>
            <p className="text-xs text-teal-100/90 mt-0.5">
              {selectedLanguage === 'bn'
                ? 'পবিত্র নবুওয়াত, হিজরত, বদর, ওহুদ, কুদ্বস বিজয় থেকে আধুনিক উম্মাহর সময়কালভিত্তিক মানচিত্র ও ইতিহাস'
                : 'Interactive chronological map and complete history from 570 AD to 2026 AD.'}
            </p>
          </div>
        </div>

        {/* Category Filter Dropdown */}
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <span className="text-xs font-semibold text-teal-200 shrink-0">ফিল্টার:</span>
          <select
            value={selectedCategoryFilter}
            onChange={(e) => setSelectedCategoryFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-900/80 text-teal-100 border border-teal-500/40 focus:outline-none cursor-pointer"
          >
            <option value="all">সকল ঘটনা ({ISLAMIC_HISTORY_EVENTS.length})</option>
            <option value="seerah">🟡 সীরাত</option>
            <option value="battle">🔴 যুদ্ধ ও অভিযান</option>
            <option value="expansion">🔵 ইসলামের প্রসার</option>
            <option value="knowledge">🔷 ইলম ও বিজ্ঞান</option>
            <option value="architecture">🟢 নগর ও স্থাপত্য</option>
            <option value="saints">🟣 আউলিয়া কেরাম</option>
            <option value="empire">🟤 সালতানাত ও সাম্রাজ্য</option>
            <option value="bengal">💗 বাংলায় ইসলাম</option>
          </select>
        </div>
      </div>

      {/* Main Grid: Map Section (Left) & Event Details Panel (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* LEFT / MAIN: MAP AREA (lg:col-span-7) */}
        <div
          className={`lg:col-span-7 rounded-3xl border shadow-xl overflow-hidden relative flex flex-col justify-between ${
            isDay ? 'bg-[#d8ebd9] border-teal-300' : 'bg-[#0b1d20] border-[#133d45]'
          }`}
          style={{ minHeight: '520px' }}
        >
          {/* Top Floating Controls on Map */}
          <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
            {/* Map Mode Toggles ("তখন" vs "এখন" & "সফরপথ" vs "অঞ্চল") */}
            <div className="flex items-center gap-1.5 pointer-events-auto bg-slate-900/85 backdrop-blur-md p-1 rounded-2xl border border-teal-500/30 shadow-lg">
              <button
                type="button"
                onClick={() => {
                  setMapMode('then');
                  if (soundEnabled) soundHaptics.playTap();
                }}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
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
                className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
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
                className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                  showRoutes
                    ? 'bg-teal-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                সফরপথ
              </button>
            </div>

            {/* Map Zoom Controls */}
            <div className="flex items-center gap-1 pointer-events-auto bg-slate-900/85 backdrop-blur-md p-1 rounded-2xl border border-teal-500/30 shadow-lg">
              <button
                type="button"
                onClick={() => setZoom((z) => Math.min(z + 0.3, 3))}
                className="p-1.5 hover:bg-slate-800 text-teal-200 hover:text-white rounded-xl transition cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.max(z - 0.3, 0.8))}
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

          {/* Interactive SVG Geographic Map Canvas */}
          <div
            className="w-full h-[460px] sm:h-[500px] cursor-grab active:cursor-grabbing relative overflow-hidden"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <svg
              viewBox={`0 0 ${mapWidth} ${mapHeight}`}
              className="w-full h-full object-cover transition-transform duration-75"
            >
              {/* SVG Map Canvas Background (Sea & Land Coastlines styling) */}
              <rect width={mapWidth} height={mapHeight} fill={isDay ? '#d3e8da' : '#081719'} />

              {/* Landmass Paths (Styled Middle East, North Africa, Anatolia, Persia, India & Bengal) */}
              <g opacity={isDay ? 0.9 : 0.75}>
                {/* Arabian Peninsula & Levant */}
                <path
                  d="M 280,240 Q 320,230 360,250 Q 420,280 440,360 Q 430,420 370,440 Q 320,430 280,380 Q 240,340 260,280 Z"
                  fill={isDay ? '#b8dcb9' : '#0e2b2e'}
                  stroke={isDay ? '#9ac29d' : '#17474c'}
                  strokeWidth="1.5"
                />
                {/* North Africa & Egypt */}
                <path
                  d="M 40,240 Q 150,230 250,240 Q 260,330 210,400 Q 120,410 40,380 Z"
                  fill={isDay ? '#bcdec0' : '#0d282b'}
                  stroke={isDay ? '#9ac29d' : '#17474c'}
                  strokeWidth="1.5"
                />
                {/* Anatolia / Turkey & Balkans */}
                <path
                  d="M 220,120 Q 340,110 380,160 Q 340,210 240,200 Q 210,160 220,120 Z"
                  fill={isDay ? '#b8dcb9' : '#0e2b2e'}
                  stroke={isDay ? '#9ac29d' : '#17474c'}
                  strokeWidth="1.5"
                />
                {/* Persia / Iran & Mesopotamia */}
                <path
                  d="M 380,160 Q 480,150 540,210 Q 500,280 410,260 Q 370,220 380,160 Z"
                  fill={isDay ? '#b8dcb9' : '#0e2b2e'}
                  stroke={isDay ? '#9ac29d' : '#17474c'}
                  strokeWidth="1.5"
                />
                {/* South Asia, India & Bengal */}
                <path
                  d="M 540,210 Q 660,200 750,260 Q 720,380 620,450 Q 560,380 520,300 Z"
                  fill={isDay ? '#b8dcb9' : '#0e2b2e'}
                  stroke={isDay ? '#9ac29d' : '#17474c'}
                  strokeWidth="1.5"
                />
                {/* Iberian Peninsula (Spain/Andalusia) */}
                <path
                  d="M 20,110 Q 80,100 110,150 Q 70,190 20,160 Z"
                  fill={isDay ? '#b8dcb9' : '#0e2b2e'}
                  stroke={isDay ? '#9ac29d' : '#17474c'}
                  strokeWidth="1.5"
                />
              </g>

              {/* Geographical Region Label Overlays */}
              <g className="text-[11px] font-bold tracking-widest pointer-events-none select-none">
                {(() => {
                  const makkahPt = projectCoordinates(21.42, 39.82, mapWidth, mapHeight, zoom, offset);
                  const madinahPt = projectCoordinates(24.46, 39.61, mapWidth, mapHeight, zoom, offset);
                  const egyptPt = projectCoordinates(26.0, 30.0, mapWidth, mapHeight, zoom, offset);
                  const shamPt = projectCoordinates(33.5, 36.3, mapWidth, mapHeight, zoom, offset);
                  const iraqPt = projectCoordinates(32.5, 44.0, mapWidth, mapHeight, zoom, offset);
                  const bengalPt = projectCoordinates(24.0, 89.0, mapWidth, mapHeight, zoom, offset);

                  return (
                    <>
                      <text x={makkahPt.x} y={makkahPt.y + 18} textAnchor="middle" fill={isDay ? '#356637' : '#2dd4bf'} opacity="0.6">হিজাজ</text>
                      <text x={madinahPt.x + 35} y={madinahPt.y - 15} textAnchor="middle" fill={isDay ? '#356637' : '#2dd4bf'} opacity="0.6">নজদ</text>
                      <text x={egyptPt.x} y={egyptPt.y} textAnchor="middle" fill={isDay ? '#356637' : '#2dd4bf'} opacity="0.6">মিসর</text>
                      <text x={shamPt.x} y={shamPt.y} textAnchor="middle" fill={isDay ? '#356637' : '#2dd4bf'} opacity="0.6">শাম</text>
                      <text x={iraqPt.x} y={iraqPt.y} textAnchor="middle" fill={isDay ? '#356637' : '#2dd4bf'} opacity="0.6">ইরাক</text>
                      <text x={bengalPt.x} y={bengalPt.y} textAnchor="middle" fill={isDay ? '#356637' : '#2dd4bf'} opacity="0.6">বাংলা</text>
                    </>
                  );
                })()}
              </g>

              {/* Active Route Lines rendering (e.g. Hijrah / Tabuk expedition / Spain route) */}
              {showRoutes && activeEvent.routePoints && activeEvent.routePoints.length > 1 && (
                <g>
                  {(() => {
                    const pointsStr = activeEvent.routePoints
                      .map((p) => {
                        const pt = projectCoordinates(p.lat, p.lng, mapWidth, mapHeight, zoom, offset);
                        return `${pt.x},${pt.y}`;
                      })
                      .join(' ');

                    return (
                      <>
                        <polyline
                          points={pointsStr}
                          fill="none"
                          stroke={CATEGORY_INFO[activeEvent.category].color}
                          strokeWidth="3.5"
                          strokeDasharray="6 4"
                          className="animate-pulse"
                        />
                        {activeEvent.routePoints.map((p, idx) => {
                          const pt = projectCoordinates(p.lat, p.lng, mapWidth, mapHeight, zoom, offset);
                          return (
                            <circle
                              key={idx}
                              cx={pt.x}
                              cy={pt.y}
                              r="4"
                              fill={CATEGORY_INFO[activeEvent.category].color}
                              stroke="#ffffff"
                              strokeWidth="1.5"
                            />
                          );
                        })}
                      </>
                    );
                  })()}
                </g>
              )}

              {/* Render All Event Pin Markers */}
              {filteredEvents.map((evt) => {
                const isCurrent = evt.id === activeEvent.id;
                const pt = projectCoordinates(evt.coordinates.lat, evt.coordinates.lng, mapWidth, mapHeight, zoom, offset);
                const catColor = CATEGORY_INFO[evt.category].color;

                return (
                  <g
                    key={evt.id}
                    className="cursor-pointer transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      const realIndex = ISLAMIC_HISTORY_EVENTS.findIndex((x) => x.id === evt.id);
                      if (realIndex !== -1) {
                        setCurrentIndex(realIndex);
                        if (soundEnabled) soundHaptics.playTap();
                      }
                    }}
                  >
                    {/* Glowing pulse ring around active event */}
                    {isCurrent && (
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r="18"
                        fill={catColor}
                        opacity="0.3"
                        className="animate-ping"
                      />
                    )}

                    {/* Outer circle */}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isCurrent ? 11 : 6}
                      fill={catColor}
                      stroke="#ffffff"
                      strokeWidth={isCurrent ? '3' : '1.5'}
                      className="shadow-md transition-all"
                    />

                    {/* Inner core */}
                    {isCurrent && (
                      <circle cx={pt.x} cy={pt.y} r="4" fill="#ffffff" />
                    )}

                    {/* Marker Place Label */}
                    <text
                      x={pt.x}
                      y={pt.y - (isCurrent ? 16 : 10)}
                      textAnchor="middle"
                      fill={isDay ? '#0f291e' : '#ffffff'}
                      fontSize={isCurrent ? '12' : '10'}
                      fontWeight={isCurrent ? 'bold' : '500'}
                      className="pointer-events-none drop-shadow-md select-none"
                    >
                      {mapMode === 'then' ? evt.locationThenBn : evt.locationNowBn}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Large Year Watermark Display on Map Bottom-Left */}
          <div className="absolute bottom-12 left-4 z-10 pointer-events-none">
            <div className="text-4xl sm:text-5xl font-black text-[#1d483b] dark:text-[#2dd4bf]/80 tracking-tighter drop-shadow-sm">
              {toBengaliDigits(activeEvent.yearAD)} <span className="text-xl font-bold">খ্রি.</span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-[#2a6857] dark:text-emerald-300/80 -mt-1">
              {activeEvent.yearAH < 0
                ? `${toBengaliDigits(Math.abs(activeEvent.yearAH))} প্রাক-হিজরী`
                : `${toBengaliDigits(activeEvent.yearAH)} হি.`}
            </div>
          </div>

          {/* Map Legend Box at Bottom-Right */}
          <div className="absolute bottom-3 right-3 z-10 bg-slate-900/90 backdrop-blur-md p-2.5 rounded-2xl border border-teal-500/30 text-[10px] text-teal-100 hidden sm:block shadow-lg max-w-[260px]">
            <div className="grid grid-cols-2 gap-x-3 gap-y-1">
              {Object.entries(CATEGORY_INFO).map(([key, info]) => (
                <div key={key} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: info.color }} />
                  <span className="truncate">{info.labelBn}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: FULL EVENT DETAILS CARD (lg:col-span-5) */}
        <div
          className={`lg:col-span-5 rounded-3xl border shadow-xl p-5 space-y-4 flex flex-col justify-between ${
            isDay ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#0a242a] border-[#16444e] text-white'
          }`}
          style={{ minHeight: '520px' }}
        >
          {/* Event Graphic Banner */}
          {getBannerGraphics(activeEvent.bgTheme)}

          {/* Event Meta Info Row */}
          <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-teal-900/40 pb-3">
            <div className="flex items-center gap-2">
              <span
                className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm flex items-center gap-1"
                style={{ backgroundColor: CATEGORY_INFO[activeEvent.category].color }}
              >
                <span>{CATEGORY_INFO[activeEvent.category].icon}</span>
                <span>{CATEGORY_INFO[activeEvent.category].labelBn}</span>
              </span>
            </div>

            <div className="text-right">
              <span className="text-sm font-black text-amber-600 dark:text-amber-400">
                {toBengaliDigits(activeEvent.yearAD)} খ্রি.
              </span>
              <span className="text-xs text-slate-500 dark:text-emerald-300/80 ml-1.5">
                • {activeEvent.yearAH < 0 ? `${toBengaliDigits(Math.abs(activeEvent.yearAH))} প্রাক-হি.` : `${toBengaliDigits(activeEvent.yearAH)} হি.`}
              </span>
            </div>
          </div>

          {/* Location Comparison Table */}
          <div className={`p-3 rounded-2xl border flex items-center justify-between gap-2 text-xs ${
            isDay ? 'bg-slate-50 border-slate-200' : 'bg-[#0e2f36] border-[#184c57]'
          }`}>
            <div className="space-y-0.5">
              <span className="text-[10px] text-slate-400 dark:text-emerald-300/70 font-semibold uppercase tracking-wider block">তখন</span>
              <span className="font-bold text-slate-800 dark:text-emerald-100">{activeEvent.locationThenBn}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-emerald-500 shrink-0" />
            <div className="text-right space-y-0.5">
              <span className="text-[10px] text-slate-400 dark:text-emerald-300/70 font-semibold uppercase tracking-wider block">বর্তমানে</span>
              <span className="font-bold text-emerald-700 dark:text-emerald-300">{activeEvent.locationNowBn}</span>
            </div>
          </div>

          {/* Full Narrative Text */}
          <div className="space-y-2 flex-1 overflow-y-auto max-h-[190px] pr-1 scrollbar-thin">
            <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-emerald-100/90 font-medium">
              {activeEvent.fullStoryBn}
            </p>

            {/* Key Figures */}
            {activeEvent.keyFiguresBn && activeEvent.keyFiguresBn.length > 0 && (
              <div className="pt-2">
                <span className="text-[11px] font-bold text-slate-500 dark:text-emerald-300/80 block mb-1">
                  মূল ব্যক্তিত্ব / সাহাবায়ে কেরাম:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeEvent.keyFiguresBn.map((figure, idx) => (
                    <span
                      key={idx}
                      className={`px-2.5 py-0.5 rounded-lg text-[11px] font-semibold border ${
                        isDay
                          ? 'bg-slate-100 border-slate-200 text-slate-700'
                          : 'bg-[#123840] border-[#194e5a] text-emerald-200'
                      }`}
                    >
                      {figure}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Prev & Next Destination Navigation Buttons */}
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
              <span>আগের ঘটনা</span>
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
              <span>পরের গন্তব্য</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM CONTROLS & CHRONOLOGICAL TIMELINE BAR */}
      <div
        className={`p-4 rounded-3xl border shadow-xl space-y-3 ${
          isDay ? 'bg-white border-slate-200' : 'bg-[#0a242a] border-[#16444e]'
        }`}
      >
        {/* Playback Control Bar */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={togglePlay}
              className={`w-10 h-10 rounded-2xl flex items-center justify-center transition active:scale-95 text-white shadow-md cursor-pointer ${
                isPlaying ? 'bg-amber-600 hover:bg-amber-700' : 'bg-emerald-600 hover:bg-emerald-700'
              }`}
              title={isPlaying ? 'Pause Timeline' : 'Auto Play History'}
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

          {/* Active Event Indicator Title */}
          <div className="text-center hidden sm:block">
            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-300 truncate max-w-xs sm:max-w-md">
              {activeEvent.titleBn} ({toBengaliDigits(activeEvent.yearAD)} খ্রি.)
            </div>
            <div className="text-[10px] text-slate-400">
              {currentIndex + 1} / {ISLAMIC_HISTORY_EVENTS.length} টি ঐতিহাসিক ঘটনা
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-semibold">
              {toBengaliDigits(570)} খ্রি. – {toBengaliDigits(2026)} খ্রি.
            </span>
          </div>
        </div>

        {/* Historical Era Epoch Bar Breakdown */}
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

        {/* Interactive Event Slider with Color-Coded Ticks */}
        <div className="relative pt-2 pb-1">
          {/* Tick marks along timeline */}
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

          {/* Actual Range Slider Input */}
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

          {/* Years labels beneath slider */}
          <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 mt-1">
            <span>৫৭০ খ্রি.</span>
            <span>৬২২ খ্রি.</span>
            <span>৬৬১ খ্রি.</span>
            <span>৭৫০ খ্রি.</span>
            <span>১০০০ খ্রি.</span>
            <span>১২৫৮ খ্রি.</span>
            <span>১৫০০ খ্রি.</span>
            <span>১৮০০ খ্রি.</span>
            <span>২০২৬ খ্রি.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

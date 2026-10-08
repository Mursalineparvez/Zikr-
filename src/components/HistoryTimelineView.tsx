import React, { useState, useEffect, useMemo, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  ISLAMIC_HISTORY_EVENTS,
  ISLAMIC_HISTORY_ERAS,
  ISLAMIC_HISTORY_ROUTES,
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
  ArrowRight,
  Sparkles,
  MapPin,
  Clock,
  CheckCircle2,
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

// Type-safe language selector helper
function getLangText(field: { en: string; bn: string } | undefined, lang: ZikrLanguage): string {
  if (!field) return '';
  return lang === 'bn' ? field.bn : field.en;
}

// Format honorific suffixes like {SAW}, {RA}, etc. dynamically based on active language
function formatHonorifics(text: string | undefined, lang: ZikrLanguage): string {
  if (!text) return '';
  const isBn = lang === 'bn';
  const replacements: Record<string, string> = isBn ? {
    '\\{SAW\\}': 'সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম',
    '\\{RA\\}': 'রাদিয়াল্লাহু আনহু',
    '\\{RAHA\\}': 'রাদিয়াল্লাহু আনহা',
    '\\{RAHUM\\}': 'রাদিয়াল্লাহু আনহুম',
    '\\{AHS\\}': 'আলাইহিস সালাম',
    '\\{RH\\}': 'রহমতুল্লাহি আলাইহি',
    '\\{RHM\\}': 'রহমতুল্লাহি আলাইহিম',
    '\\{AS\\}': 'আলাইহিস সালাম',
  } : {
    '\\{SAW\\}': '(Sallallahu Alaihi Wa Sallam)',
    '\\{RA\\}': '(Radi Allahu Anhu)',
    '\\{RAHA\\}': '(Radi Allahu Anha)',
    '\\{RAHUM\\}': '(Radi Allahu Anhum)',
    '\\{AHS\\}': '(Alayhis Salam)',
    '\\{RH\\}': '(Rahmatullahi Alayhi)',
    '\\{RHM\\}': '(Rahmatullahi Alayhim)',
    '\\{AS\\}': '(Alayhis Salam)',
  };

  let formatted = text;
  Object.entries(replacements).forEach(([key, val]) => {
    formatted = formatted.replace(new RegExp(key, 'g'), val);
  });
  return formatted;
}

// Helper: Calculate Hijri year representation dynamically
function getEraYearText(evt: HistoryEvent, lang: ZikrLanguage): string {
  const isBn = lang === 'bn';
  if (evt.ah !== undefined) {
    return isBn ? `${toBengaliDigits(evt.ah)} হি.` : `${evt.ah} AH`;
  }
  if (evt.y < 622) {
    const diff = 622 - evt.y;
    return isBn 
      ? `হিজরতের ${toBengaliDigits(diff)} বছর আগে` 
      : `${diff} years before Hijrah`;
  } else {
    const diff = evt.y - 622 + 1;
    return isBn ? `${toBengaliDigits(diff)} হি.` : `${diff} AH`;
  }
}

export const HistoryTimelineView: React.FC<HistoryTimelineViewProps> = ({
  themeMode = 'night',
  selectedLanguage = 'bn',
  soundEnabled = true,
}) => {
  const isDay = themeMode === 'day';
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playSpeed, setPlaySpeed] = useState<number>(1); // 0.5x, 1x, 2x
  const [mapViewMode, setMapViewMode] = useState<'compare' | 'then' | 'now'>('compare'); // Dual Split Comparison vs Single Modes
  const [showRoutes, setShowRoutes] = useState<boolean>(true);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'story' | 'reference'>('story');
  const [nowMapStyle, setNowMapStyle] = useState<'satellite' | 'street' | 'dark'>('satellite');

  // Leaflet Refs
  const thenMapContainerRef = useRef<HTMLDivElement | null>(null);
  const nowMapContainerRef = useRef<HTMLDivElement | null>(null);
  const thenMapRef = useRef<L.Map | null>(null);
  const nowMapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const polylinesRef = useRef<L.Polyline[]>([]);

  const activeEvent = ISLAMIC_HISTORY_EVENTS[currentIndex];

  // Dynamic active era lookup based on current event's year
  const activeEra = useMemo(() => {
    return (
      ISLAMIC_HISTORY_ERAS.find((era) => activeEvent.y >= era.from && activeEvent.y <= era.to) ||
      ISLAMIC_HISTORY_ERAS[0]
    );
  }, [activeEvent]);

  const filteredEvents = useMemo(() => {
    if (selectedCategoryFilter === 'all') return ISLAMIC_HISTORY_EVENTS;
    return ISLAMIC_HISTORY_EVENTS.filter((e) => e.cat === selectedCategoryFilter);
  }, [selectedCategoryFilter]);

  // Premium control helpers for navigation under active filter context
  const hasPrev = useMemo(() => {
    if (selectedCategoryFilter === 'all') return currentIndex > 0;
    const currentFilteredIdx = filteredEvents.findIndex(
      (e) => e.y === activeEvent.y && e.lat === activeEvent.lat && e.lon === activeEvent.lon
    );
    return currentFilteredIdx > 0;
  }, [selectedCategoryFilter, filteredEvents, activeEvent, currentIndex]);

  const hasNext = useMemo(() => {
    if (selectedCategoryFilter === 'all') return currentIndex < ISLAMIC_HISTORY_EVENTS.length - 1;
    const currentFilteredIdx = filteredEvents.findIndex(
      (e) => e.y === activeEvent.y && e.lat === activeEvent.lat && e.lon === activeEvent.lon
    );
    return currentFilteredIdx !== -1 && currentFilteredIdx < filteredEvents.length - 1;
  }, [selectedCategoryFilter, filteredEvents, activeEvent, currentIndex]);

  // 1. Initialize Leaflet Linked Maps (Both Then & Now Maps with distinct styles!)
  useEffect(() => {
    if (thenMapRef.current) {
      thenMapRef.current.remove();
      thenMapRef.current = null;
    }
    if (nowMapRef.current) {
      nowMapRef.current.remove();
      nowMapRef.current = null;
    }

    // Historical (Then) map is vintage Voyager
    const thenTileUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
    const thenAttribution = '&copy; OpenStreetMap &copy; CARTO';

    // Modern (Now) map tile selection
    let nowTileUrl = 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    let nowAttribution = 'Tiles &copy; Esri &mdash; Source: Esri';

    if (nowMapStyle === 'street') {
      nowTileUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
      nowAttribution = '&copy; OpenStreetMap &copy; CARTO';
    } else if (nowMapStyle === 'dark') {
      nowTileUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
      nowAttribution = '&copy; OpenStreetMap &copy; CARTO';
    }

    // Initialize "Then" Map Container
    if (thenMapContainerRef.current && (mapViewMode === 'compare' || mapViewMode === 'then')) {
      const thenMap = L.map(thenMapContainerRef.current, {
        center: [activeEvent.lat, activeEvent.lon],
        zoom: 5,
        minZoom: 3,
        maxZoom: 10,
        zoomControl: false,
        attributionControl: false,
      });
      L.tileLayer(thenTileUrl, { attribution: thenAttribution }).addTo(thenMap);
      thenMapRef.current = thenMap;
    }

    // Initialize "Now" Map Container
    if (nowMapContainerRef.current && (mapViewMode === 'compare' || mapViewMode === 'now')) {
      const nowMap = L.map(nowMapContainerRef.current, {
        center: [activeEvent.lat, activeEvent.lon],
        zoom: 5,
        minZoom: 3,
        maxZoom: 10,
        zoomControl: false,
        attributionControl: false,
      });
      L.tileLayer(nowTileUrl, { attribution: nowAttribution }).addTo(nowMap);
      nowMapRef.current = nowMap;
    }

    // Bi-directional map center and zoom sync link
    const isSyncingRef = { current: false };

    if (thenMapRef.current && nowMapRef.current) {
      const tm = thenMapRef.current;
      const nm = nowMapRef.current;

      tm.on('move', () => {
        if (isSyncingRef.current) return;
        isSyncingRef.current = true;
        nm.setView(tm.getCenter(), tm.getZoom(), { animate: false });
        isSyncingRef.current = false;
      });

      nm.on('move', () => {
        if (isSyncingRef.current) return;
        isSyncingRef.current = true;
        tm.setView(nm.getCenter(), nm.getZoom(), { animate: false });
        isSyncingRef.current = false;
      });
    }

    // Trigger invalidateSize to prevent rendering issues in dynamic CSS grid sizing
    setTimeout(() => {
      thenMapRef.current?.invalidateSize();
      nowMapRef.current?.invalidateSize();
    }, 250);

    return () => {
      if (thenMapRef.current) {
        thenMapRef.current.remove();
        thenMapRef.current = null;
      }
      if (nowMapRef.current) {
        nowMapRef.current.remove();
        nowMapRef.current = null;
      }
    };
  }, [isDay, mapViewMode, nowMapStyle]);

  // 2. Add Pins & Custom HTML Markers on both Maps
  useEffect(() => {
    // Clean previous markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    const addMarkersToMap = (map: L.Map, isThenMap: boolean) => {
      filteredEvents.forEach((evt) => {
        const isCurrent = evt.y === activeEvent.y && evt.lat === activeEvent.lat && evt.lon === activeEvent.lon;
        const color = isThenMap ? '#d97706' : '#10b981'; // Sepia Gold for Then, Bright Emerald for Now!

        const markerHtml = `
          <div class="relative flex items-center justify-center transition-transform duration-300 hover:scale-125">
            ${isCurrent ? `
              <span class="absolute inline-flex h-9 w-9 rounded-full opacity-60 animate-ping" style="background-color: ${color}"></span>
              <span class="absolute inline-flex h-12 w-12 rounded-full opacity-25 animate-pulse" style="background-color: ${color}"></span>
            ` : ''}
            <span class="relative inline-flex rounded-full border-2 border-white dark:border-[#0a242a] shadow-lg transition-all duration-300"
                  style="background-color: ${color}; width: ${isCurrent ? '18px' : '11px'}; height: ${isCurrent ? '18px' : '11px'}">
            </span>
          </div>
        `;

        const customIcon = L.divIcon({
          html: markerHtml,
          className: 'custom-leaflet-marker',
          iconSize: isCurrent ? [32, 32] : [20, 20],
          iconAnchor: isCurrent ? [16, 16] : [10, 10],
        });

        // "Then" map gets Historical names, "Now" map gets Present names!
        const label = isThenMap ? getLangText(evt.p, selectedLanguage) : getLangText(evt.n, selectedLanguage);
        const title = formatHonorifics(getLangText(evt.t, selectedLanguage), selectedLanguage);

        const marker = L.marker([evt.lat, evt.lon], { icon: customIcon })
          .addTo(map)
          .on('click', () => {
            const idx = ISLAMIC_HISTORY_EVENTS.findIndex((x) => x.y === evt.y && x.lat === evt.lat && x.lon === evt.lon);
            if (idx !== -1) {
              setCurrentIndex(idx);
              if (soundEnabled) soundHaptics.playTap();
            }
          });

        marker.bindTooltip(`
          <div class="px-2 py-1 bg-[#07181c]/95 text-white rounded-lg border ${isThenMap ? 'border-amber-500/30' : 'border-emerald-500/30'} text-xs shadow-2xl leading-snug">
            <span class="font-bold text-amber-300 block mb-0.5">${title}</span>
            <span class="text-[10px] text-teal-200 block">${label} • ${toBengaliDigits(evt.y)} খ্রি.</span>
          </div>
        `, {
          direction: 'top',
          offset: [0, -12],
          opacity: 0.98,
          permanent: isCurrent,
        });

        markersRef.current.push(marker);
      });
    };

    if (thenMapRef.current) {
      addMarkersToMap(thenMapRef.current, true);
    }
    if (nowMapRef.current) {
      addMarkersToMap(nowMapRef.current, false);
    }
  }, [filteredEvents, activeEvent, selectedLanguage, mapViewMode, nowMapStyle]);

  // 3. Smooth Synced FlyTo Navigation on selection change
  useEffect(() => {
    const targetLatLng: L.LatLngExpression = [activeEvent.lat, activeEvent.lon];
    if (thenMapRef.current) {
      thenMapRef.current.flyTo(targetLatLng, 6, {
        animate: true,
        duration: 1.4,
        easeLinearity: 0.25,
      });
    }
    if (nowMapRef.current) {
      nowMapRef.current.flyTo(targetLatLng, 6, {
        animate: true,
        duration: 1.4,
        easeLinearity: 0.25,
      });
    }
  }, [currentIndex, activeEvent, mapViewMode]);

  // 4. Draw Travel Route / Path Line on both Maps
  useEffect(() => {
    polylinesRef.current.forEach((line) => line.remove());
    polylinesRef.current = [];

    if (showRoutes && activeEvent.route && ISLAMIC_HISTORY_ROUTES[activeEvent.route]) {
      const rawPoints = ISLAMIC_HISTORY_ROUTES[activeEvent.route];
      const latlngs = rawPoints.map((pt) => [pt[1], pt[0]]);

      const drawRouteOnMap = (map: L.Map, color: string) => {
        const polyline = L.polyline(latlngs as L.LatLngExpression[], {
          color: color,
          weight: 4,
          dashArray: '8, 8',
          opacity: 0.9,
          className: 'leaflet-animated-route',
        }).addTo(map);
        polylinesRef.current.push(polyline);
      };

      if (thenMapRef.current) {
        drawRouteOnMap(thenMapRef.current, '#d97706');
      }
      if (nowMapRef.current) {
        drawRouteOnMap(nowMapRef.current, '#10b981');
      }
    }
  }, [activeEvent, showRoutes, mapViewMode, nowMapStyle]);

  // 5. Automatic playback cycle
  useEffect(() => {
    if (!isPlaying) return;
    const intervalMs = 5000 / playSpeed;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        if (selectedCategoryFilter === 'all') {
          if (prev >= ISLAMIC_HISTORY_EVENTS.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          if (soundEnabled) soundHaptics.playTap();
          return prev + 1;
        } else {
          const currentFilteredIdx = filteredEvents.findIndex(
            (e) => e.y === activeEvent.y && e.lat === activeEvent.lat && e.lon === activeEvent.lon
          );
          if (currentFilteredIdx !== -1 && currentFilteredIdx < filteredEvents.length - 1) {
            const nextEvent = filteredEvents[currentFilteredIdx + 1];
            const globalIdx = ISLAMIC_HISTORY_EVENTS.findIndex(
              (e) => e.y === nextEvent.y && e.lat === nextEvent.lat && e.lon === nextEvent.lon
            );
            if (globalIdx !== -1) {
              if (soundEnabled) soundHaptics.playTap();
              return globalIdx;
            }
          }
          setIsPlaying(false);
          return prev;
        }
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPlaying, playSpeed, soundEnabled, selectedCategoryFilter, filteredEvents, activeEvent]);

  const handlePrev = () => {
    if (selectedCategoryFilter === 'all') {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
        if (soundEnabled) soundHaptics.playTap();
      }
    } else {
      const currentFilteredIdx = filteredEvents.findIndex(
        (e) => e.y === activeEvent.y && e.lat === activeEvent.lat && e.lon === activeEvent.lon
      );
      if (currentFilteredIdx > 0) {
        const prevEvent = filteredEvents[currentFilteredIdx - 1];
        const globalIdx = ISLAMIC_HISTORY_EVENTS.findIndex(
          (e) => e.y === prevEvent.y && e.lat === prevEvent.lat && e.lon === prevEvent.lon
        );
        if (globalIdx !== -1) {
          setCurrentIndex(globalIdx);
          if (soundEnabled) soundHaptics.playTap();
        }
      }
    }
  };

  const handleNext = () => {
    if (selectedCategoryFilter === 'all') {
      if (currentIndex < ISLAMIC_HISTORY_EVENTS.length - 1) {
        setCurrentIndex(currentIndex + 1);
        if (soundEnabled) soundHaptics.playTap();
      }
    } else {
      const currentFilteredIdx = filteredEvents.findIndex(
        (e) => e.y === activeEvent.y && e.lat === activeEvent.lat && e.lon === activeEvent.lon
      );
      if (currentFilteredIdx !== -1 && currentFilteredIdx < filteredEvents.length - 1) {
        const nextEvent = filteredEvents[currentFilteredIdx + 1];
        const globalIdx = ISLAMIC_HISTORY_EVENTS.findIndex(
          (e) => e.y === nextEvent.y && e.lat === nextEvent.lat && e.lon === nextEvent.lon
        );
        if (globalIdx !== -1) {
          setCurrentIndex(globalIdx);
          if (soundEnabled) soundHaptics.playTap();
        }
      }
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
    const targetIdx = ISLAMIC_HISTORY_EVENTS.findIndex((e) => e.y >= era.from && e.y <= era.to);
    if (targetIdx !== -1) {
      setCurrentIndex(targetIdx);
      if (soundEnabled) soundHaptics.playTap();
    }
  };

  const resetMap = () => {
    if (activeEvent) {
      thenMapRef.current?.setView([activeEvent.lat, activeEvent.lon], 5);
      nowMapRef.current?.setView([activeEvent.lat, activeEvent.lon], 5);
      if (soundEnabled) soundHaptics.playTap();
    }
  };

  const getBannerGraphics = (scene: string, title: string) => {
    let style = "from-[#0a2329] via-[#0d2d35] to-[#06171a]";
    let borderStyle = "border-teal-500/30";
    let icon = "🗺️";
    let desc = "ইসলামী রেনেসাঁ ও গৌরবময় ইতিহাস";

    switch (scene) {
      case 'kaaba':
        style = "from-[#111317] via-[#1a1c24] to-[#0a0b0d]";
        borderStyle = "border-amber-500/20";
        icon = "🕋";
        desc = "পবিত্র কাবা ও মক্কা মুকাররমা";
        break;
      case 'journey':
        style = "from-[#141518] via-[#2a1d13] to-[#0e1012]";
        borderStyle = "border-amber-600/25";
        icon = "🐫";
        desc = "মরুভূমির রুট ও বাণিজ্য কাফেলা";
        break;
      case 'sea':
        style = "from-[#041221] via-[#082036] to-[#020b14]";
        borderStyle = "border-blue-500/20";
        icon = "🌊";
        desc = "লোহিত সাগর ও সমুদ্র অভিযান";
        break;
      case 'mountain':
        style = "from-[#121314] via-[#1f1b18] to-[#0a0a0b]";
        borderStyle = "border-orange-500/15";
        icon = "⛰️";
        desc = "নিভৃত পাহাড় ও হেরা গুহার ছায়া";
        break;
      case 'mosque':
        style = "from-[#041a17] via-[#092b25] to-[#020f0d]";
        borderStyle = "border-emerald-500/30";
        icon = "🕌";
        desc = "ঐতিহাসিক মসজিদ ও মিনার";
        break;
      case 'palace':
        style = "from-[#150b1a] via-[#22102e] to-[#0b050d]";
        borderStyle = "border-fuchsia-500/20";
        icon = "🏰";
        desc = "রাজকীয় প্রাসাদ ও ঐতিহাসিক সালতানাত";
        break;
      case 'library':
        style = "from-[#0b1419] via-[#11232b] to-[#060c10]";
        borderStyle = "border-cyan-500/25";
        icon = "📚";
        desc = "বাইতুল হিকমাহ ও জ্ঞানের স্বর্ণযুগ";
        break;
      case 'river':
        style = "from-[#041b1d] via-[#092c30] to-[#020f11]";
        borderStyle = "border-teal-500/25";
        icon = "💧";
        desc = "নদীর অববাহিকা ও বাংলার সবুজ প্রান্তর";
        break;
      default:
        break;
    }

    return (
      <div className={`relative w-full h-24 rounded-2xl overflow-hidden flex items-center justify-between p-4 text-white shadow-lg border ${borderStyle} bg-gradient-to-br ${style} transition-all duration-500`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(20,184,166,0.12),transparent)] pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-white/5 to-transparent pointer-events-none transform skew-x-12 translate-x-8" />
        <div className="z-10 space-y-1 text-left max-w-[80%]">
          <span className="inline-flex items-center gap-1.5 text-amber-300 text-[10px] font-black uppercase tracking-widest">
            <span className="animate-pulse">{icon}</span>
            <span>{desc}</span>
          </span>
          <h4 className="text-sm font-black tracking-tight text-amber-50 line-clamp-1 drop-shadow font-bengali">
            {title}
          </h4>
        </div>
        <div className="z-10 text-4xl shrink-0 opacity-40 hover:opacity-80 transition-opacity duration-300 filter drop-shadow-[0_2px_8px_rgba(255,255,255,0.15)]">{icon}</div>
      </div>
    );
  };

  const formattedTitle = formatHonorifics(getLangText(activeEvent.t, selectedLanguage), selectedLanguage);
  const formattedDesc = formatHonorifics(getLangText(activeEvent.d, selectedLanguage), selectedLanguage);
  const formattedLesson = formatHonorifics(getLangText(activeEvent.l, selectedLanguage), selectedLanguage);
  const formattedEraSum = formatHonorifics(getLangText(activeEra.sum, selectedLanguage), selectedLanguage);
  const formattedEraWho = formatHonorifics(getLangText(activeEra.who, selectedLanguage), selectedLanguage);

  return (
    <div className="space-y-5 animate-in fade-in duration-500 select-none pb-8 font-bengali">
      
      {/* 1. TOP PREMIUM WIDE HERO BANNER - GOLD ACCENTED EPOCH DASHBOARD */}
      <div className="relative w-full rounded-[26px] overflow-hidden border border-[#1a4b54]/60 bg-gradient-to-r from-[#051419] via-[#0c242b] to-[#123640] p-6 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.08),transparent)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-20" />
        <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-amber-400 to-emerald-500 rounded-l-full" />
        
        <div className="z-10 space-y-3 max-w-2xl text-left pl-2 md:pl-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black tracking-widest text-amber-300 bg-amber-500/10 border border-amber-500/35 px-3 py-1 rounded-full uppercase flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{selectedLanguage === 'bn' ? 'অধ্যায়' : 'Chapter'} {toBengaliDigits(ISLAMIC_HISTORY_ERAS.indexOf(activeEra) + 1)} • {toBengaliDigits(activeEra.from)}-{toBengaliDigits(activeEra.to)} খ্রি.</span>
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-amber-50 tracking-tight flex items-center gap-2 drop-shadow">
            <span>{getLangText(activeEra.name, selectedLanguage)}</span>
          </h2>
          <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed font-medium">
            {formattedEraSum}
          </p>
        </div>

        {/* Segmented Timeline Chapter Jump buttons */}
        <div className="z-10 flex flex-col items-center md:items-end gap-3 shrink-0">
          <span className="text-[10px] font-black tracking-wider text-emerald-300/80 uppercase">
            {selectedLanguage === 'bn' ? 'অধ্যায় পরিবর্তন করুন' : 'Jump to Chapter'}
          </span>
          <div className="flex items-center gap-1.5 bg-black/45 p-1.5 rounded-2xl border border-white/10 shadow-inner">
            {ISLAMIC_HISTORY_ERAS.map((era, index) => {
              const isSelected = activeEra.id === era.id;
              return (
                <button
                  key={era.id}
                  onClick={() => handleJumpToEra(era)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full text-xs font-black transition-all active:scale-95 flex items-center justify-center cursor-pointer relative ${
                    isSelected
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black shadow-lg shadow-emerald-500/30 ring-2 ring-amber-300 scale-110'
                      : 'bg-white/5 hover:bg-white/15 text-teal-200/80 hover:text-white'
                  }`}
                  title={getLangText(era.name, selectedLanguage)}
                >
                  <span>{toBengaliDigits(index + 1)}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. CATEGORY SEGMENTED FILTER BAR - GORGEOUS INTERACTIVE DECK */}
      <div className={`p-1.5 rounded-2xl border flex items-center gap-2 overflow-x-auto scrollbar-none shadow-md ${
        isDay ? 'bg-white border-slate-200' : 'bg-[#0a2328] border-[#16444e]'
      }`}>
        <button
          onClick={() => {
            setSelectedCategoryFilter('all');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`shrink-0 px-4 py-2 rounded-xl text-xs font-black transition-all border flex items-center gap-1.5 cursor-pointer ${
            selectedCategoryFilter === 'all'
              ? 'bg-emerald-600 border-emerald-500 text-white shadow-md shadow-emerald-600/20 scale-[1.02]'
              : isDay
              ? 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
              : 'bg-[#10343a] border-transparent hover:bg-[#15444c] text-emerald-100'
          }`}
        >
          <span>✨</span>
          <span>{selectedLanguage === 'bn' ? 'সব বিষয়' : 'All Events'}</span>
        </button>
        {Object.entries(CATEGORY_INFO).map(([key, info]) => {
          const isSelected = selectedCategoryFilter === key;
          return (
            <button
              key={key}
              onClick={() => {
                setSelectedCategoryFilter(key);
                if (soundEnabled) soundHaptics.playTap();
              }}
              className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 cursor-pointer ${
                isSelected
                  ? 'text-white border-transparent scale-[1.02]'
                  : isDay
                  ? 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                  : 'bg-[#10343a] border-transparent hover:bg-[#15444c] text-emerald-100'
              }`}
              style={{
                backgroundColor: isSelected ? info.color : undefined,
                boxShadow: isSelected ? `0 4px 12px ${info.color}35` : undefined,
              }}
            >
              <span>{info.icon}</span>
              <span>{selectedLanguage === 'bn' ? info.labelBn : info.labelEn}</span>
            </button>
          );
        })}
      </div>

      {/* 3. MIDDLE GRID: CRISP COMPARATIVE ATLAS & EVENT DETAIL CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* LEFT COLUMN: CRISP GEOGRAPHIC MAP SECTION - DUAL ATLAS */}
        <div
          className={`lg:col-span-7 rounded-[26px] border shadow-2xl overflow-hidden relative flex flex-col justify-between ${
            isDay ? 'bg-[#d8edd9] border-teal-200 shadow-teal-900/5' : 'bg-[#0f2427] border-[#184852] shadow-black/70'
          }`}
          style={{ minHeight: '580px' }}
        >
          {/* Top Floating Glassmorphic Control Islands */}
          <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap gap-2 items-center justify-between pointer-events-none">
            
            {/* Split Screen Side-by-Side Control Layout */}
            <div className="flex items-center gap-1 pointer-events-auto bg-[#07191e]/95 backdrop-blur-md p-1 rounded-xl border border-teal-500/20 shadow-lg">
              <button
                type="button"
                onClick={() => {
                  setMapViewMode('compare');
                  if (soundEnabled) soundHaptics.playTap();
                }}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-black tracking-wider transition cursor-pointer uppercase flex items-center gap-1 ${
                  mapViewMode === 'compare'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <span>🗺️</span>
                <span>{selectedLanguage === 'bn' ? 'পাশাপাশি ম্যাপ (Compare)' : 'Dual Compare'}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMapViewMode('then');
                  if (soundEnabled) soundHaptics.playTap();
                }}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-black tracking-wider transition cursor-pointer uppercase flex items-center gap-1 ${
                  mapViewMode === 'then'
                    ? 'bg-amber-600 text-white shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                <span>{selectedLanguage === 'bn' ? 'তখন (Then)' : 'Then'}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMapViewMode('now');
                  if (soundEnabled) soundHaptics.playTap();
                }}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-black tracking-wider transition cursor-pointer uppercase flex items-center gap-1 ${
                  mapViewMode === 'now'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span>{selectedLanguage === 'bn' ? 'এখন (Now)' : 'Now'}</span>
              </button>
            </div>

            {/* Map Navigation Helpers */}
            <div className="flex items-center gap-1 pointer-events-auto bg-[#07191e]/95 backdrop-blur-md p-1 rounded-xl border border-teal-500/20 shadow-lg">
              <button
                type="button"
                onClick={() => setShowRoutes(!showRoutes)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-black tracking-wider transition cursor-pointer uppercase ${
                  showRoutes
                    ? 'bg-teal-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {selectedLanguage === 'bn' ? 'রুট' : 'Routes'}
              </button>
              <button
                type="button"
                onClick={() => {
                  if (thenMapRef.current) thenMapRef.current.zoomIn();
                }}
                className="p-1 hover:bg-slate-800 text-teal-200 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => {
                  if (thenMapRef.current) thenMapRef.current.zoomOut();
                }}
                className="p-1 hover:bg-slate-800 text-teal-200 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={resetMap}
                className="p-1 hover:bg-slate-800 text-teal-200 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Premium Comparative Map Canvas Grid with Side-by-Side Synced Displays */}
          <div className={`w-full h-[470px] sm:h-[500px] grid divide-x divide-teal-500/10 ${
            mapViewMode === 'compare' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'
          }`}>
            {/* 3A. THEN MAP (HISTORICAL VINTAGE MAP) */}
            {(mapViewMode === 'compare' || mapViewMode === 'then') && (
              <div className="relative h-full w-full overflow-hidden">
                {/* Beautiful custom CSS parchment-vintage filter directly over the map tiles! */}
                <div 
                  ref={thenMapContainerRef}
                  className="w-full h-full filter sepia-[0.6] saturate-[1.15] contrast-[0.9] brightness-[0.92] hue-rotate-[-12deg]"
                />
                
                {/* Vintage Title Badge */}
                <div className="absolute top-16 left-4 z-20 pointer-events-none">
                  <span className="px-3 py-1 text-[11px] font-black bg-amber-700 text-amber-50 rounded-full shadow-lg border border-amber-600/40 flex items-center gap-1.5 backdrop-blur-sm bg-opacity-90">
                    <span>⏳</span>
                    <span>{selectedLanguage === 'bn' ? 'তখন (ঐতিহাসিক মানচিত্র)' : 'Then (Historical)'}</span>
                  </span>
                </div>

                {/* Left side display tag showing historical name */}
                <div className="absolute bottom-16 right-4 z-20 bg-amber-950/95 border border-amber-500/30 px-3.5 py-1.5 rounded-xl shadow-2xl flex flex-col items-start pointer-events-none">
                  <span className="text-[9px] text-amber-400 font-bold uppercase tracking-wider">{selectedLanguage === 'bn' ? 'তৎকালীন ঐতিহাসিক নাম' : 'Historical Name'}</span>
                  <span className="text-sm font-black text-white">{getLangText(activeEvent.p, selectedLanguage)}</span>
                </div>
              </div>
            )}

            {/* 3B. NOW MAP (MODERN CRISP MAP) */}
            {(mapViewMode === 'compare' || mapViewMode === 'now') && (
              <div className="relative h-full w-full overflow-hidden">
                {/* Modern Crisp CSS color filters tailored to selected modern map style */}
                <div 
                  ref={nowMapContainerRef}
                  className={`w-full h-full filter transition-all duration-300 ${
                    nowMapStyle === 'satellite'
                      ? 'saturate-[1.15] contrast-[1.05] brightness-[0.95]'
                      : nowMapStyle === 'dark'
                      ? 'brightness-[0.92] contrast-[1.02]'
                      : 'saturate-[1.2] contrast-[1.05] hue-rotate-[10deg] brightness-[0.98]'
                  }`}
                />

                {/* Modern Title Badge */}
                <div className="absolute top-16 left-4 z-20 pointer-events-none">
                  <span className="px-3 py-1 text-[11px] font-black bg-emerald-700 text-white rounded-full shadow-lg border border-emerald-600/40 flex items-center gap-1.5 backdrop-blur-sm bg-opacity-90">
                    <span>🟢</span>
                    <span>{selectedLanguage === 'bn' ? 'এখন (বর্তমান মানচিত্র)' : 'Now (Present)'}</span>
                  </span>
                </div>

                {/* MODERN MAP STYLE SELECTOR - EXTREMELY VISUAL & ATTRACTIVE */}
                <div className="absolute top-16 right-4 z-20 bg-[#07191e]/95 backdrop-blur-md p-1 rounded-xl border border-teal-500/30 shadow-2xl flex items-center gap-1 pointer-events-auto">
                  <button
                    type="button"
                    onClick={() => {
                      setNowMapStyle('satellite');
                      if (soundEnabled) soundHaptics.playTap();
                    }}
                    className={`px-2 py-1 rounded-lg text-[9px] font-black tracking-wider transition-all duration-200 cursor-pointer uppercase flex items-center gap-1 ${
                      nowMapStyle === 'satellite'
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow font-bold'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>🛰️</span>
                    <span>{selectedLanguage === 'bn' ? 'স্যাটেলাইট' : 'Sat'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setNowMapStyle('street');
                      if (soundEnabled) soundHaptics.playTap();
                    }}
                    className={`px-2 py-1 rounded-lg text-[9px] font-black tracking-wider transition-all duration-200 cursor-pointer uppercase flex items-center gap-1 ${
                      nowMapStyle === 'street'
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow font-bold'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>🗺️</span>
                    <span>{selectedLanguage === 'bn' ? 'রাস্তা' : 'Street'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setNowMapStyle('dark');
                      if (soundEnabled) soundHaptics.playTap();
                    }}
                    className={`px-2 py-1 rounded-lg text-[9px] font-black tracking-wider transition-all duration-200 cursor-pointer uppercase flex items-center gap-1 ${
                      nowMapStyle === 'dark'
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow font-bold'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>🌑</span>
                    <span>{selectedLanguage === 'bn' ? 'ডার্ক' : 'Dark'}</span>
                  </button>
                </div>

                {/* Right side display tag showing modern country name */}
                <div className="absolute bottom-16 right-4 z-20 bg-emerald-950/95 border border-emerald-500/30 px-3.5 py-1.5 rounded-xl shadow-2xl flex flex-col items-start pointer-events-none">
                  <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider">{selectedLanguage === 'bn' ? 'বর্তমান আধুনিক ভূখণ্ড' : 'Modern Territory'}</span>
                  <span className="text-sm font-black text-white">{getLangText(activeEvent.n, selectedLanguage)}</span>
                </div>
              </div>
            )}
          </div>

          {/* Large Gold-plated Vintage Chronometer displays year at Bottom-Left */}
          <div className="absolute bottom-[60px] left-4 z-20 pointer-events-none space-y-0.5 bg-[#07181c]/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-amber-500/25 shadow-2xl">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tighter leading-none font-mono tabular-nums">
                {toBengaliDigits(activeEvent.y)}
              </span>
              <span className="text-[10px] font-black text-amber-200">
                {selectedLanguage === 'bn' ? 'খ্রি.' : 'CE'}
              </span>
            </div>
            <div className="text-[9px] sm:text-[10px] font-black text-teal-200 uppercase tracking-wide flex items-center gap-1">
              <Clock className="w-3 h-3 text-emerald-400" />
              <span>{getEraYearText(activeEvent, selectedLanguage)}</span>
            </div>
          </div>

          {/* PALESTINE DECLARATION - AS IN REFERENCE IMAGE */}
          <div className="p-3 bg-red-950/60 border-t border-red-500/25 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs z-20 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 to-transparent pointer-events-none" />
            <div className="flex items-center gap-2 text-red-200 font-black text-left">
              <span className="text-base shrink-0">🇵🇸</span>
              <span className="text-[11px] sm:text-xs">
                {selectedLanguage === 'bn' 
                  ? 'আমাদের মানচিত্রে ইসরাইলের কোনো জায়গা নেই। সম্পূর্ণ ভূখণ্ডটি ফিলিস্তিন।' 
                  : 'There is no place for Israel in our map. The entire territory is Palestine.'}
              </span>
            </div>
            <div className="text-[10px] bg-red-500/20 text-red-300 px-3 py-1 rounded-lg border border-red-500/30 font-black shrink-0 tracking-wider">
              #FreePalestine
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: EVENT DETAIL CARD INFO-PANEL */}
        <div
          className={`lg:col-span-5 rounded-[26px] border shadow-2xl p-5 space-y-4 flex flex-col justify-between ${
            isDay ? 'bg-white border-slate-200 text-slate-900 shadow-slate-200/50' : 'bg-[#061e24]/90 border-[#123e47] text-white shadow-black/85'
          }`}
          style={{ minHeight: '580px' }}
        >
          {/* Top Banner Graphic Scene Card */}
          {getBannerGraphics(activeEvent.sc, formattedTitle)}

          {/* Metadata Row */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-teal-900/40 pb-2.5">
            <span
              className="px-3 py-1 rounded-xl text-xs font-black text-white shadow-md flex items-center gap-1.5"
              style={{ backgroundColor: CATEGORY_INFO[activeEvent.cat].color }}
            >
              <span>{CATEGORY_INFO[activeEvent.cat].icon}</span>
              <span>{selectedLanguage === 'bn' ? CATEGORY_INFO[activeEvent.cat].labelBn : CATEGORY_INFO[activeEvent.cat].labelEn}</span>
            </span>

            <div className="text-right flex flex-col items-end">
              <span className="text-sm font-black text-amber-500 dark:text-amber-400">
                {toBengaliDigits(activeEvent.y)} {selectedLanguage === 'bn' ? 'খ্রি.' : 'CE'}
              </span>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-0.5">
                <span>{getEraYearText(activeEvent, selectedLanguage)}</span>
              </span>
            </div>
          </div>

          {/* Segmented sliding pill tabs */}
          <div className={`p-1 rounded-2xl flex relative ${isDay ? 'bg-slate-100' : 'bg-slate-950/60 border border-teal-500/10'}`}>
            <div 
              className="absolute top-1 bottom-1 transition-all duration-300 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 shadow-lg"
              style={{
                width: 'calc(50% - 4px)',
                left: activeTab === 'story' ? '4px' : 'calc(50%)',
              }}
            />
            <button
              onClick={() => {
                setActiveTab('story');
                if (soundEnabled) soundHaptics.playTap();
              }}
              className={`flex-1 py-2 z-10 text-xs font-black transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'story'
                  ? 'text-white'
                  : isDay ? 'text-slate-600 hover:text-slate-900' : 'text-emerald-200/60 hover:text-white'
              }`}
            >
              <span>📖</span>
              <span>{selectedLanguage === 'bn' ? 'ইতিহাস ও বিবরণ' : 'History & Story'}</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('reference');
                if (soundEnabled) soundHaptics.playTap();
              }}
              className={`flex-1 py-2 z-10 text-xs font-black transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'reference'
                  ? 'text-white'
                  : isDay ? 'text-slate-600 hover:text-slate-900' : 'text-emerald-200/60 hover:text-white'
              }`}
            >
              <span>📜</span>
              <span>{selectedLanguage === 'bn' ? 'শিক্ষা ও রেফারেন্স' : 'Lessons & Wisdom'}</span>
            </button>
          </div>

          {/* Active Tab Contents */}
          {activeTab === 'story' ? (
            <div className="space-y-4 flex-1 flex flex-col justify-between text-left">
              
              {/* Premium Route Travel Map indicator Card */}
              <div className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 text-xs shadow-inner relative overflow-hidden ${
                isDay ? 'bg-slate-50 border-slate-200' : 'bg-[#0b242a] border-[#103b44]'
              }`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_50%,rgba(16,185,129,0.03),transparent)] pointer-events-none" />
                
                <div className="space-y-1 flex-1 min-w-0">
                  <span className="text-[9px] text-slate-400 dark:text-emerald-300/60 font-black uppercase tracking-widest block">
                    {selectedLanguage === 'bn' ? 'তৎকালীন স্থান' : 'Location Then'}
                  </span>
                  <span className="font-bold text-amber-600 dark:text-amber-400 block truncate flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{getLangText(activeEvent.p, selectedLanguage)}</span>
                  </span>
                </div>
                
                <ArrowRight className="w-4 h-4 text-emerald-500 shrink-0 animate-pulse mx-1" />
                
                <div className="text-right space-y-1 flex-1 min-w-0">
                  <span className="text-[9px] text-slate-400 dark:text-emerald-300/60 font-black uppercase tracking-widest block">
                    {selectedLanguage === 'bn' ? 'বর্তমান ভূখণ্ড' : 'Location Now'}
                  </span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-300 block truncate">
                    {getLangText(activeEvent.n, selectedLanguage)}
                  </span>
                </div>
              </div>

              {/* Story narrative text */}
              <div className="space-y-3 flex-1 overflow-y-auto max-h-[165px] pr-1 scrollbar-thin relative">
                <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-emerald-100/90 font-medium whitespace-pre-line">
                  {formattedDesc}
                </p>

                {activeEra.who && (
                  <div className="pt-3 border-t border-slate-100 dark:border-teal-900/40">
                    <span className="text-[10px] font-black text-slate-400 dark:text-emerald-400/80 block mb-1 uppercase tracking-wide">
                      {selectedLanguage === 'bn' ? 'এই যুগের সম্মানিত ব্যক্তিত্বগণ:' : 'Key Personalities of this Era:'}
                    </span>
                    <p className="text-[11px] leading-relaxed font-bold text-slate-600 dark:text-emerald-300">
                      {formattedEraWho}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-3 flex-1 flex flex-col justify-start text-left overflow-y-auto max-h-[220px] pr-1 scrollbar-thin">
              {formattedLesson ? (
                <div className={`p-4 rounded-2xl border-l-4 text-xs space-y-3 relative overflow-hidden shadow-inner ${
                  isDay 
                    ? 'bg-emerald-50/70 border-emerald-600 text-slate-800' 
                    : 'bg-[#0f323a]/60 border-emerald-500 text-emerald-100'
                }`}>
                  <div className="absolute top-1 right-2 opacity-5 pointer-events-none text-6xl font-serif">”</div>
                  <div className="font-black text-sm flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>{selectedLanguage === 'bn' ? 'শিক্ষা ও আধ্যাত্মিক দিকনির্দেশনা:' : 'Key Lessons & Wisdom:'}</span>
                  </div>
                  <p className="leading-relaxed font-medium text-xs text-slate-700 dark:text-emerald-100">
                    {formattedLesson}
                  </p>
                </div>
              ) : (
                <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/10 text-center py-10">
                  <span className="text-2xl block animate-pulse mb-2">🕊️</span>
                  <p className="text-xs text-slate-400">
                    {selectedLanguage === 'bn' 
                      ? 'এই ঘটনার জন্য কোনো বিশেষ রেফারেন্স নোট যুক্ত নেই। ঈমান ও আমল সুন্দর করুন।' 
                      : 'No specific reference notes added for this event. Strengthen faith and piety.'}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Bottom navigation trigger buttons */}
          <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-teal-900/40">
            <button
              type="button"
              onClick={handlePrev}
              disabled={!hasPrev}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer border ${
                !hasPrev
                  ? 'opacity-35 cursor-not-allowed bg-slate-100 border-slate-200 text-slate-400 dark:bg-slate-800/30 dark:border-slate-800'
                  : isDay
                  ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800 active:scale-95'
                  : 'bg-[#0d343c] hover:bg-[#12444e] border-[#154d58] text-emerald-200 active:scale-95'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>← {selectedLanguage === 'bn' ? 'পূর্ববর্তী' : 'Prev'}</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={!hasNext}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md border ${
                !hasNext
                  ? 'opacity-35 cursor-not-allowed bg-slate-100 border-slate-200 text-slate-400'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white border-transparent active:scale-95 shadow-emerald-500/10'
              }`}
            >
              <span>{selectedLanguage === 'bn' ? 'পরবর্তী ঘটনা →' : 'Next Event →'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. BOTTOM TIMELINE CONTROLS & DYNAMIC SLIDER WITH PROGRESS INDICATORS */}
      <div
        className={`p-5 rounded-[26px] border shadow-2xl space-y-4 ${
          isDay ? 'bg-white border-slate-200 shadow-teal-900/5' : 'bg-[#061e24]/95 border-[#123e47] shadow-black/85'
        }`}
      >
        {/* Playback & Fast Navigation Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 dark:border-teal-900/40 pb-3">
          
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={togglePlay}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all active:scale-95 text-white shadow-lg cursor-pointer ${
                isPlaying 
                  ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/20' 
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-emerald-600/20'
              }`}
              title={isPlaying ? 'Pause' : 'Play Timeline Tour'}
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current animate-pulse" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
            </button>

            <button
              type="button"
              onClick={cycleSpeed}
              className={`px-3 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                isDay
                  ? 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  : 'bg-[#0e2f36] hover:bg-[#123c45] text-teal-200 border-[#154652]'
              }`}
            >
              {toBengaliDigits(playSpeed)}x {selectedLanguage === 'bn' ? 'গতি' : 'Speed'}
            </button>
          </div>

          <div className="text-center hidden md:block max-w-sm sm:max-w-md">
            <div className="text-xs font-black text-emerald-600 dark:text-emerald-300 truncate tracking-wide flex items-center justify-center gap-1.5">
              <span className="w-2 h-2 rounded-full animate-ping shrink-0" style={{ backgroundColor: CATEGORY_INFO[activeEvent.cat].color }} />
              <span>{formattedTitle} ({toBengaliDigits(activeEvent.y)} {selectedLanguage === 'bn' ? 'খ্রি.' : 'CE'})</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold">
            <span>৫৭০ {selectedLanguage === 'bn' ? 'খ্রি.' : 'CE'}</span>
            <span>–</span>
            <span>২০২৬ {selectedLanguage === 'bn' ? 'খ্রি.' : 'CE'}</span>
          </div>
        </div>

        {/* Chronological connected Segmented Era bar */}
        <div className="w-full grid grid-cols-8 gap-1 rounded-xl overflow-hidden text-[9px] font-black text-white h-7 text-center">
          {ISLAMIC_HISTORY_ERAS.map((era, index) => {
            const isCurrentEra = activeEra.id === era.id;
            return (
              <div
                key={era.id}
                onClick={() => handleJumpToEra(era)}
                className={`flex items-center justify-center px-1 truncate transition-all duration-300 cursor-pointer text-center relative border border-transparent hover:scale-[1.02] active:scale-95 ${
                  isCurrentEra 
                    ? 'shadow-lg ring-1 ring-amber-300 scale-[1.01]' 
                    : 'opacity-70 hover:opacity-100'
                }`}
                style={{ backgroundColor: `var(${era.col}, #059669)` }}
                title={`${getLangText(era.name, selectedLanguage)} (${era.from} - ${era.to})`}
              >
                <span className="truncate text-[9px] font-black">{getLangText(era.name, selectedLanguage)}</span>
                {isCurrentEra && (
                  <span className="absolute bottom-0 left-0 right-0 h-1 bg-amber-400" />
                )}
              </div>
            );
          })}
        </div>

        {/* Timeline Slider with glow ticks */}
        <div className="relative pt-2.5 pb-1">
          <div className="absolute top-0.5 left-0 right-0 flex items-center justify-between px-2 pointer-events-none">
            {ISLAMIC_HISTORY_EVENTS.map((evt, idx) => {
              const isSelected = idx === currentIndex;
              return (
                <div
                  key={idx}
                  className="flex flex-col items-center"
                  style={{ width: `${100 / ISLAMIC_HISTORY_EVENTS.length}%` }}
                >
                  <div
                    className={`rounded-full transition-all duration-300 ${
                      isSelected 
                        ? 'w-2 h-2 bg-amber-400 shadow-md ring-2 ring-amber-300' 
                        : 'w-1 h-1 opacity-45 hover:opacity-100 hover:scale-125'
                    }`}
                    style={{ backgroundColor: isSelected ? '#fbbf24' : CATEGORY_INFO[evt.cat].color }}
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
            className="w-full accent-emerald-500 hover:accent-emerald-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none focus:outline-none"
          />

          {/* Historical Tick Marks */}
          <div className="flex items-center justify-between text-[9px] font-black text-slate-400 mt-1.5 px-1 font-mono">
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

        {/* Progress Bar & Travel Visited Status indicator */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs font-black text-slate-500 dark:text-emerald-300/80">
          <div className="flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>
              {selectedLanguage === 'bn' 
                ? `${toBengaliDigits(currentIndex + 1)}টি স্থান ঘুরে দেখা হয়েছে (সর্বমোট ${toBengaliDigits(ISLAMIC_HISTORY_EVENTS.length)}টি ঘটনা)`
                : `${currentIndex + 1} of ${ISLAMIC_HISTORY_EVENTS.length} events explored`}
            </span>
          </div>
          <div className="w-full sm:w-56 bg-slate-200 dark:bg-[#123840] h-2.5 rounded-full overflow-hidden border border-teal-500/10 p-0.5 relative text-left">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-300 shadow"
              style={{ width: `${((currentIndex + 1) / ISLAMIC_HISTORY_EVENTS.length) * 100}%` }}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

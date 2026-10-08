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
import { soundHaptics, playArabicVoice } from '../utils/audioHaptics';
import { getEventReligiousDetails } from '../utils/historyEventDetails';
import { AnimatedHistoryBanner } from './AnimatedHistoryBanner';
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
  Volume2,
  Square,
  BookOpen,
  FileText,
  Star,
  ShieldCheck,
  Award,
  Copy,
  Check,
  Quote,
  Bookmark,
  Scroll,
  Lightbulb,
  Share2,
  ChevronUp,
  ChevronDown,
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

// Helper to render honorific expressions in golden/amber text (as shown in Pic 2)
function renderHonorificText(text: string | undefined, isDay: boolean): React.ReactNode {
  if (!text) return '';
  const regex = /(সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম|আলাইহিস সালাম|আলাইহাস সালাম|রাদিয়াল্লাহু আনহু|রাদিয়াল্লাহু আনহা|রাদিয়াল্লাহু আনহুম|রহমতুল্লাহি আলাইহি|রহমতুল্লাহি আলাইহিম|\(Sallallahu Alaihi Wa Sallam\)|\(Alayhis Salam\)|\(Radi Allahu Anhu\)|\(Radi Allahu Anha\)|\(Rahmatullahi Alayhi\))/g;
  const parts = text.split(regex);
  return parts.map((part, index) => {
    if (regex.test(part)) {
      return (
        <span
          key={index}
          className={`font-bold ${isDay ? 'text-amber-800' : 'text-amber-400'}`}
        >
          {part}
        </span>
      );
    }
    return part;
  });
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
  const [activeRefSection, setActiveRefSection] = useState<'all' | 'quran' | 'hadith' | 'books' | 'lessons'>('all');
  const [isPlayingAyatAudio, setIsPlayingAyatAudio] = useState<boolean>(false);
  const [copiedTextId, setCopiedTextId] = useState<string | null>(null);

  const handleCopyText = (text: string, id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      navigator.clipboard.writeText(text);
      setCopiedTextId(id);
      setTimeout(() => setCopiedTextId(null), 2000);
      if (soundEnabled) soundHaptics.playTap();
    } catch {}
  };
  const [nowMapStyle, setNowMapStyle] = useState<'satellite' | 'street' | 'dark'>('satellite');
  const [showBanner, setShowBanner] = useState<boolean>(false);

  // Dedicated Content Scroll & Stepper State (Matches Pic 2)
  const contentScrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollUp, setCanScrollUp] = useState<boolean>(false);
  const [canScrollDown, setCanScrollDown] = useState<boolean>(true);
  const [scrollThumbTopPct, setScrollThumbTopPct] = useState<number>(0);
  const [scrollThumbHeightPct, setScrollThumbHeightPct] = useState<number>(30);

  const updateScrollState = () => {
    if (!contentScrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = contentScrollRef.current;
    const maxScroll = scrollHeight - clientHeight;
    const thumbH = Math.max(15, Math.min(80, (clientHeight / (scrollHeight || 1)) * 100));
    setScrollThumbHeightPct(thumbH);
    if (maxScroll > 0) {
      const topPct = (scrollTop / maxScroll) * (100 - thumbH);
      setScrollThumbTopPct(topPct);
      setCanScrollUp(scrollTop > 5);
      setCanScrollDown(scrollTop < maxScroll - 5);
    } else {
      setScrollThumbTopPct(0);
      setCanScrollUp(false);
      setCanScrollDown(false);
    }
  };

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!contentScrollRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickRatio = (e.clientY - rect.top) / rect.height;
    const { scrollHeight, clientHeight } = contentScrollRef.current;
    contentScrollRef.current.scrollTo({
      top: clickRatio * (scrollHeight - clientHeight),
      behavior: 'smooth',
    });
  };

  const scrollUp = () => {
    if (contentScrollRef.current) {
      contentScrollRef.current.scrollBy({ top: -160, behavior: 'smooth' });
      if (soundEnabled) soundHaptics.playTap();
    }
  };

  const scrollDown = () => {
    if (contentScrollRef.current) {
      contentScrollRef.current.scrollBy({ top: 160, behavior: 'smooth' });
      if (soundEnabled) soundHaptics.playTap();
    }
  };

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

  // 1. Initialize Leaflet Linked Maps (Both Then & Now Maps with identical digital styles!)
  useEffect(() => {
    if (thenMapRef.current) {
      thenMapRef.current.remove();
      thenMapRef.current = null;
    }
    if (nowMapRef.current) {
      nowMapRef.current.remove();
      nowMapRef.current = null;
    }

    // Modern digital map tile selection based on nowMapStyle state
    let selectedTileUrl = 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    let selectedAttribution = 'Tiles &copy; Esri &mdash; Source: Esri';

    if (nowMapStyle === 'street') {
      selectedTileUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
      selectedAttribution = '&copy; OpenStreetMap &copy; CARTO';
    } else if (nowMapStyle === 'dark') {
      selectedTileUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
      selectedAttribution = '&copy; OpenStreetMap &copy; CARTO';
    }

    const thenTileUrl = selectedTileUrl;
    const thenAttribution = selectedAttribution;
    const nowTileUrl = selectedTileUrl;
    const nowAttribution = selectedAttribution;

    // Overlay containing clean borders and country names, especially for satellite hybrid maps
    const borderOverlayUrl = 'https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}';
    const isSatellite = nowMapStyle !== 'street' && nowMapStyle !== 'dark';

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
      if (isSatellite) {
        L.tileLayer(borderOverlayUrl, { attribution: 'Reference &copy; Esri' }).addTo(thenMap);
      }
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
      if (isSatellite) {
        L.tileLayer(borderOverlayUrl, { attribution: 'Reference &copy; Esri' }).addTo(nowMap);
      }
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
          <div class="text-center select-none pointer-events-none" style="
            font-family: inherit;
            color: ${isCurrent ? (isThenMap ? '#fbbf24' : '#34d399') : '#ffffff'};
            font-size: ${isCurrent ? '13px' : '11px'};
            line-height: 1.25;
            letter-spacing: 0.015em;
          ">
            <span class="block font-black tracking-wide" style="
              text-shadow: -1.5px -1.5px 0 #000, 1.5px -1.5px 0 #000, -1.5px 1.5px 0 #000, 1.5px 1.5px 0 #000, 0 2px 4px rgba(0,0,0,0.95);
            ">
              ${isCurrent ? title : label}
            </span>
            ${isCurrent ? `
              <span class="block font-bold text-[10px] mt-0.5" style="
                color: ${isThenMap ? '#fcd34d' : '#6ee7b7'};
                text-shadow: -1.2px -1.2px 0 #000, 1.2px -1.2px 0 #000, -1.2px 1.2px 0 #000, 1.2px 1.2px 0 #000, 0 1px 3px rgba(0,0,0,0.9);
              ">
                ${label} • ${toBengaliDigits(evt.y)} খ্রি.
              </span>
            ` : ''}
          </div>
        `, {
          direction: 'top',
          offset: [0, -12],
          opacity: 1,
          permanent: isCurrent,
          className: 'leaflet-tooltip-custom-nobg',
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
    if (playSpeed === 0.5) setPlaySpeed(1);
    else if (playSpeed === 1) setPlaySpeed(2);
    else if (playSpeed === 2) setPlaySpeed(3);
    else if (playSpeed === 3) setPlaySpeed(5);
    else setPlaySpeed(0.5);
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

  const religiousDetails = useMemo(() => {
    return getEventReligiousDetails(activeEvent, selectedLanguage);
  }, [activeEvent, selectedLanguage]);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAyatAudio(false);
  }, [currentIndex]);

  useEffect(() => {
    if (contentScrollRef.current) {
      contentScrollRef.current.scrollTop = 0;
    }
    const timer = setTimeout(() => {
      updateScrollState();
    }, 120);
    return () => clearTimeout(timer);
  }, [currentIndex, activeTab, activeRefSection, showBanner]);

  const isNameDifferent = getLangText(activeEvent.p, selectedLanguage).trim().toLowerCase() !== getLangText(activeEvent.n, selectedLanguage).trim().toLowerCase();

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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* LEFT COLUMN: CRISP GEOGRAPHIC MAP SECTION - DUAL ATLAS */}
        <div
          className={`lg:col-span-7 rounded-[26px] border shadow-2xl overflow-hidden relative flex flex-col justify-between h-[580px] sm:h-[620px] ${
            isDay ? 'bg-[#d8edd9] border-teal-200 shadow-teal-900/5' : 'bg-[#0f2427] border-[#184852] shadow-black/70'
          }`}
        >
          {/* Top Floating Glassmorphic Control Islands */}
          <div className="absolute top-4 left-4 right-4 z-[1010] flex flex-wrap gap-2 items-center justify-between pointer-events-none">
            
            {/* Split Screen Side-by-Side Control Layout */}
            <div className="flex items-center gap-1.5 pointer-events-auto bg-transparent">
              <button
                type="button"
                onClick={() => {
                  setMapViewMode('compare');
                  if (soundEnabled) soundHaptics.playTap();
                }}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-black tracking-wider transition cursor-pointer uppercase flex items-center gap-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)] ${
                  mapViewMode === 'compare'
                    ? 'text-white border border-emerald-400/80 bg-emerald-600/70 shadow'
                    : 'text-slate-200 hover:text-white border border-transparent'
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
                className={`px-2.5 py-1 rounded-lg text-[10px] font-black tracking-wider transition cursor-pointer uppercase flex items-center gap-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)] ${
                  mapViewMode === 'then'
                    ? 'text-white border border-amber-400/80 bg-amber-600/70 shadow'
                    : 'text-slate-200 hover:text-white border border-transparent'
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
                className={`px-2.5 py-1 rounded-lg text-[10px] font-black tracking-wider transition cursor-pointer uppercase flex items-center gap-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)] ${
                  mapViewMode === 'now'
                    ? 'text-white border border-emerald-400/80 bg-emerald-600/70 shadow'
                    : 'text-slate-200 hover:text-white border border-transparent'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span>{selectedLanguage === 'bn' ? 'এখন (Now)' : 'Now'}</span>
              </button>
            </div>

            {/* Map Navigation Helpers */}
            <div className="flex items-center gap-1 pointer-events-auto bg-transparent flex-wrap">
              <button
                type="button"
                onClick={() => setShowRoutes(!showRoutes)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-black tracking-wider transition cursor-pointer uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)] ${
                  showRoutes
                    ? 'text-white border border-teal-400/80 bg-teal-600/70 shadow'
                    : 'text-slate-200 hover:text-white border border-transparent'
                }`}
              >
                {selectedLanguage === 'bn' ? 'রুট' : 'Routes'}
              </button>
              
              <div className="h-4 w-[1px] bg-white/20 mx-1 hidden sm:block" />

              {/* Unified Map Style Options */}
              <button
                type="button"
                onClick={() => {
                  setNowMapStyle('satellite');
                  if (soundEnabled) soundHaptics.playTap();
                }}
                className={`px-2 py-1 rounded-lg text-[10px] font-black tracking-wider transition cursor-pointer uppercase flex items-center gap-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)] ${
                  nowMapStyle === 'satellite'
                    ? 'text-white border border-emerald-400/80 bg-emerald-600/70 shadow'
                    : 'text-slate-200 hover:text-white border border-transparent'
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
                className={`px-2 py-1 rounded-lg text-[10px] font-black tracking-wider transition cursor-pointer uppercase flex items-center gap-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)] ${
                  nowMapStyle === 'street'
                    ? 'text-white border border-emerald-400/80 bg-emerald-600/70 shadow'
                    : 'text-slate-200 hover:text-white border border-transparent'
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
                className={`px-2 py-1 rounded-lg text-[10px] font-black tracking-wider transition cursor-pointer uppercase flex items-center gap-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)] ${
                  nowMapStyle === 'dark'
                    ? 'text-white border border-emerald-400/80 bg-emerald-600/70 shadow'
                    : 'text-slate-200 hover:text-white border border-transparent'
                }`}
              >
                <span>🌑</span>
                <span>{selectedLanguage === 'bn' ? 'ডার্ক' : 'Dark'}</span>
              </button>

              <div className="h-4 w-[1px] bg-teal-500/20 mx-1" />

              <button
                type="button"
                onClick={() => {
                  const map = thenMapRef.current || nowMapRef.current;
                  if (map) {
                    map.zoomIn();
                    if (soundEnabled) soundHaptics.playTap();
                  }
                }}
                className="p-1 hover:bg-slate-800 text-teal-200 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => {
                  const map = thenMapRef.current || nowMapRef.current;
                  if (map) {
                    map.zoomOut();
                    if (soundEnabled) soundHaptics.playTap();
                  }
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
          <div className={`w-full flex-1 min-h-0 grid divide-x divide-teal-500/10 relative ${
            mapViewMode === 'compare' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'
          }`}>
            {/* 3A. THEN MAP (HISTORICAL DIGITAL SATELLITE MAP) */}
            {(mapViewMode === 'compare' || mapViewMode === 'then') && (
              <div className="relative h-full w-full overflow-hidden bg-[#031419] border border-amber-500/20">
                <div 
                  ref={thenMapContainerRef}
                  className="w-full h-full transition-all duration-300"
                />

                {/* Sleek digital golden corners to highlight historical context */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-500/40 pointer-events-none z-[12]" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-500/40 pointer-events-none z-[12]" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-500/40 pointer-events-none z-[12]" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-500/40 pointer-events-none z-[12]" />

                {/* Modern Elegant Compass Rose overlayed lightly on the digital map */}
                <div className="absolute bottom-32 left-4 z-[1010] w-12 h-12 opacity-65 hover:opacity-100 transition-all duration-300 pointer-events-auto cursor-help group" title={selectedLanguage === 'bn' ? 'উত্তর দিক নির্দেশক' : 'Compass Rose'}>
                  <svg viewBox="0 0 100 100" className="w-full h-full text-amber-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] animate-[spin_100s_linear_infinite] group-hover:scale-105 transition-transform duration-300">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3,3" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.75" />
                    <polygon points="50,10 54,46 50,50" fill="currentColor" />
                    <polygon points="50,10 46,46 50,50" fill="none" stroke="currentColor" strokeWidth="0.75" />
                    <polygon points="50,90 46,54 50,50" fill="currentColor" opacity="0.8" />
                    <polygon points="50,90 54,54 50,50" fill="none" stroke="currentColor" strokeWidth="0.75" />
                    <polygon points="90,50 54,46 50,50" fill="currentColor" opacity="0.9" />
                    <polygon points="90,50 54,54 50,50" fill="none" stroke="currentColor" strokeWidth="0.75" />
                    <polygon points="10,50 46,54 50,50" fill="currentColor" opacity="0.7" />
                    <polygon points="10,50 46,46 50,50" fill="none" stroke="currentColor" strokeWidth="0.75" />
                    <circle cx="50" cy="50" r="3" fill="#fbbf24" />
                  </svg>
                  <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-[8px] font-black text-amber-300 select-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">N</span>
                </div>

                {/* Then Era Title Badge */}
                <div className="absolute top-16 left-4 z-[1010] pointer-events-none">
                  <span className="px-1 py-0.5 text-[10px] font-black text-amber-300 flex items-center gap-1.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
                    <span>{selectedLanguage === 'bn' ? 'তৎকালীন ম্যাপ' : 'Then (Historical Map)'}</span>
                  </span>
                </div>

                {/* Top-Right Historical location tag */}
                <div className="absolute top-16 right-4 z-[1010] flex flex-col items-end pointer-events-none">
                  <div className="text-right drop-shadow-[0_1px_4px_rgba(0,0,0,0.95)]">
                    <span className="text-[9px] text-amber-400 font-black uppercase tracking-wider block">
                      {selectedLanguage === 'bn' ? 'তৎকালীন ঐতিহাসিক নাম' : 'Historical Name'}
                    </span>
                    <span className="text-xs sm:text-sm font-black text-amber-100 block">
                      {getLangText(activeEvent.p, selectedLanguage)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 3B. NOW MAP (MODERN DIGITAL SATELLITE MAP) */}
            {(mapViewMode === 'compare' || mapViewMode === 'now') && (
              <div className="relative h-full w-full overflow-hidden bg-[#031419] border border-emerald-500/20">
                <div 
                  ref={nowMapContainerRef}
                  className="w-full h-full transition-all duration-300"
                />

                {/* Sleek digital emerald corners to highlight modern context */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-emerald-500/40 pointer-events-none z-[12]" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-emerald-500/40 pointer-events-none z-[12]" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-emerald-500/40 pointer-events-none z-[12]" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-emerald-500/40 pointer-events-none z-[12]" />

                {/* Modern Title Badge */}
                <div className="absolute top-16 left-4 z-[1010] pointer-events-none">
                  <span className="px-1 py-0.5 text-[10px] font-black text-emerald-300 flex items-center gap-1.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
                    <span>{selectedLanguage === 'bn' ? 'বর্তমান ম্যাপ' : 'Now (Present Map)'}</span>
                  </span>
                </div>

                {/* Top-Right Modern country name tag */}
                <div className="absolute top-16 right-4 z-[1010] flex flex-col items-end pointer-events-none">
                  <div className="text-right drop-shadow-[0_1px_4px_rgba(0,0,0,0.95)]">
                    <span className="text-[9px] text-emerald-400 font-black uppercase tracking-wider block">
                      {selectedLanguage === 'bn' ? 'বর্তমান আধুনিক ভূখণ্ড' : 'Modern Territory'}
                    </span>
                    <span className="text-xs sm:text-sm font-black text-emerald-100 block">
                      {getLangText(activeEvent.n, selectedLanguage)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* FLOATING INTERACTIVE CENTER ERA-NAME COMPARISON HUDBOX */}
            {mapViewMode === 'compare' && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-[1010] flex items-center gap-2 max-w-[92%] sm:max-w-md pointer-events-none transition-all duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                <div className="flex flex-col text-left min-w-0">
                  <span className="text-[8.5px] font-black text-amber-400 uppercase tracking-widest">{selectedLanguage === 'bn' ? 'তৎকালীন (Then)' : 'Then'}</span>
                  <span className="text-xs font-black text-amber-100 truncate">{getLangText(activeEvent.p, selectedLanguage)}</span>
                </div>
                <div className="flex items-center justify-center p-0.5 shrink-0">
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-300 drop-shadow" />
                </div>
                <div className="flex flex-col text-left min-w-0">
                  <span className="text-[8.5px] font-black text-emerald-400 uppercase tracking-widest">{selectedLanguage === 'bn' ? 'বর্তমান (Now)' : 'Now'}</span>
                  <span className="text-xs font-black text-emerald-100 truncate">{getLangText(activeEvent.n, selectedLanguage)}</span>
                </div>
                {isNameDifferent && (
                  <span className="ml-1 text-amber-300 text-[8.5px] font-black uppercase tracking-wider px-1 py-0.2 border border-amber-400/60 rounded shrink-0 drop-shadow">
                    {selectedLanguage === 'bn' ? 'ভিন্ন' : 'Diff'}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Large Gold-plated Vintage Chronometer displays year at Bottom-Left with clean background */}
          <div className="absolute bottom-14 left-4 z-[1010] pointer-events-none space-y-0.5 flex flex-col items-start drop-shadow-[0_2px_5px_rgba(0,0,0,0.95)]">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-black text-amber-400 tracking-tighter leading-none font-mono tabular-nums">
                {toBengaliDigits(activeEvent.y)}
              </span>
              <span className="text-[10px] font-black text-amber-200">
                {selectedLanguage === 'bn' ? 'খ্রি.' : 'CE'}
              </span>
            </div>
            <div className="text-[9px] font-black text-teal-200 uppercase tracking-wide flex items-center gap-1">
              <Clock className="w-3 h-3 text-emerald-400" />
              <span>{getEraYearText(activeEvent, selectedLanguage)}</span>
            </div>
          </div>

          {/* PALESTINE DECLARATION - AS IN REFERENCE IMAGE */}
          <div className="shrink-0 p-3 bg-red-950/60 border-t border-red-500/25 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs z-20 relative">
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
          className={`lg:col-span-5 rounded-[26px] border shadow-2xl overflow-hidden flex flex-col h-[580px] sm:h-[620px] relative ${
            isDay ? 'bg-[#f4f8f5] border-slate-200/80 text-slate-900 shadow-slate-200/50' : 'bg-[#061e24] border-[#123e47] text-white shadow-black/85'
          }`}
        >
          {/* 1. FIXED TOP ANIMATED SCENE GRAPHIC BANNER (STAYS FIXED AT TOP AS REQUESTED) */}
          <div className="shrink-0 p-3 sm:p-3.5 pb-2 select-none border-b border-black/5 dark:border-teal-900/40 relative z-20 shadow-sm">
            <AnimatedHistoryBanner
              scene={activeEvent.sc}
              title={formattedTitle}
              category={activeEvent.cat}
              year={activeEvent.y}
              locationName={getLangText(activeEvent.p, selectedLanguage)}
            />
          </div>

          {/* 2. SCROLLABLE CONTENT AREA (ALL TEXT SCROLLS UNDERNEATH THE FIXED BANNER) */}
          <div className="flex-1 min-h-0 flex flex-row overflow-hidden">
            {/* Scrollable event content container */}
            <div
              ref={contentScrollRef}
              onScroll={updateScrollState}
              className="flex-1 overflow-y-auto px-3.5 sm:px-4 py-2 space-y-3 scrollbar-none select-text"
            >
              {/* Category pill with dot */}
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                    isDay ? 'bg-emerald-100/90 text-emerald-950 border border-emerald-200' : 'bg-emerald-950/80 text-emerald-200 border border-emerald-800/60'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: CATEGORY_INFO[activeEvent.cat].color }} />
                  <span>{selectedLanguage === 'bn' ? CATEGORY_INFO[activeEvent.cat].labelBn : CATEGORY_INFO[activeEvent.cat].labelEn}</span>
                </span>
              </div>

              {/* Event Title with Golden Honorifics Highlighting (as in Pic 2) */}
              <h2 className={`text-base sm:text-lg font-bold leading-snug tracking-tight select-text ${
                isDay ? 'text-slate-900' : 'text-white'
              }`}>
                {renderHonorificText(formattedTitle, isDay)}
              </h2>

              {/* Year & Hijri Era in Golden Amber Text (as in Pic 2) */}
              <div className={`text-xs font-bold flex items-center gap-1.5 ${
                isDay ? 'text-amber-800' : 'text-amber-400'
              }`}>
                <span>{toBengaliDigits(activeEvent.y)} {selectedLanguage === 'bn' ? 'খ্রি.' : 'CE'}</span>
                <span>-</span>
                <span>{getEraYearText(activeEvent, selectedLanguage)}</span>
              </div>

              {/* Clean Compact Location Pill: তখন -> বর্তমানে (as in Pic 2) */}
              <div className={`p-2.5 sm:p-3 rounded-xl border flex items-center justify-between text-xs transition-all ${
                isDay ? 'bg-[#e5ede6]/80 border-emerald-200/70 text-slate-800' : 'bg-[#0b282e]/80 border-teal-700/40 text-emerald-100'
              }`}>
                <div className="flex flex-col text-left min-w-0">
                  <span className={`text-[10px] font-medium ${isDay ? 'text-slate-500' : 'text-emerald-400/80'}`}>
                    {selectedLanguage === 'bn' ? 'তখন' : 'Then'}
                  </span>
                  <span className={`text-xs sm:text-sm font-bold truncate ${isDay ? 'text-slate-900' : 'text-white'}`}>
                    {getLangText(activeEvent.p, selectedLanguage)}
                  </span>
                </div>

                <ArrowRight className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mx-2" />

                <div className="flex flex-col text-right min-w-0">
                  <span className={`text-[10px] font-medium ${isDay ? 'text-slate-500' : 'text-emerald-400/80'}`}>
                    {selectedLanguage === 'bn' ? 'বর্তমানে' : 'Now'}
                  </span>
                  <span className={`text-xs sm:text-sm font-bold truncate ${isDay ? 'text-slate-900' : 'text-white'}`}>
                    {getLangText(activeEvent.n, selectedLanguage)}
                  </span>
                </div>
              </div>

              {/* Segmented 2-Tab Selector */}
              <div className={`p-1 rounded-xl flex relative shadow-sm border ${
                isDay ? 'bg-slate-100/90 border-slate-200' : 'bg-slate-950/80 border-teal-700/40'
              }`}>
                <div 
                  className="absolute top-1 bottom-1 transition-all duration-300 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 shadow-md"
                  style={{
                    width: 'calc(50% - 4px)',
                    left: activeTab === 'story' ? '4px' : 'calc(50%)',
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('story');
                    if (soundEnabled) soundHaptics.playTap();
                  }}
                  className={`flex-1 py-1.5 sm:py-2 z-10 text-xs font-bold transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeTab === 'story'
                      ? 'text-white drop-shadow-sm'
                      : isDay ? 'text-slate-700 hover:text-slate-900' : 'text-emerald-300/80 hover:text-white'
                  }`}
                >
                  <span>📖</span>
                  <span>{selectedLanguage === 'bn' ? '১. ইতিহাস' : '1. History'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('reference');
                    if (soundEnabled) soundHaptics.playTap();
                  }}
                  className={`flex-1 py-1.5 sm:py-2 z-10 text-xs font-bold transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeTab === 'reference'
                      ? 'text-white drop-shadow-sm'
                      : isDay ? 'text-slate-700 hover:text-slate-900' : 'text-emerald-300/80 hover:text-white'
                  }`}
                >
                  <span>📚</span>
                  <span>{selectedLanguage === 'bn' ? '২. রেফারেন্স ও শিক্ষা' : '2. References & Lessons'}</span>
                </button>
              </div>

              {/* TAB 1: HISTORY & DETAILED STORY */}
              {activeTab === 'story' && (
                <div className="space-y-3 animate-in fade-in duration-200 text-left">
                  {/* Detailed narrative with honorific highlights */}
                  <div className={`p-3.5 sm:p-4 rounded-xl border text-xs sm:text-sm leading-relaxed font-normal whitespace-pre-line shadow-sm select-text ${
                    isDay ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#04191d] border-teal-800/50 text-slate-100'
                  }`}>
                    <div className={`text-[11px] font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 pb-2 border-b ${
                      isDay ? 'text-emerald-800 border-slate-100' : 'text-emerald-400 border-teal-800/40'
                    }`}>
                      <span>📖</span>
                      <span>{selectedLanguage === 'bn' ? 'ঘটনার বিস্তারিত ঐতিহাসিক বিবরণ:' : 'Detailed Historical Narrative:'}</span>
                    </div>
                    {renderHonorificText(formattedDesc, isDay)}
                  </div>

                  {activeEra.who && (
                    <div className={`p-3 rounded-xl border shadow-sm ${
                      isDay ? 'bg-emerald-50/80 border-emerald-200' : 'bg-[#06242a] border-teal-700/50'
                    }`}>
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-current shrink-0" />
                        <span className={`text-[11px] font-bold uppercase tracking-wide ${
                          isDay ? 'text-emerald-900' : 'text-emerald-300'
                        }`}>
                          {selectedLanguage === 'bn' ? 'এই যুগের সম্মানিত ব্যক্তিত্বগণ:' : 'Key Personalities of this Era:'}
                        </span>
                      </div>
                      <p className={`text-xs leading-relaxed font-medium select-text ${
                        isDay ? 'text-slate-800' : 'text-emerald-100'
                      }`}>
                        {renderHonorificText(formattedEraWho, isDay)}
                      </p>
                    </div>
                  )}

                  {/* Switch to Tab 2 CTA */}
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('reference');
                      if (soundEnabled) soundHaptics.playTap();
                    }}
                    className="w-full py-2.5 px-3.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition active:scale-98 shadow-md bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white border-emerald-500"
                  >
                    <span>📚</span>
                    <span>{selectedLanguage === 'bn' ? '২. রেফারেন্স ও শিক্ষা দেখুন (কুরআন, হাদিস, কিতাব) →' : 'View References & Lessons →'}</span>
                  </button>
                </div>
              )}

              {/* TAB 2: REFERENCES & LESSONS */}
              {activeTab === 'reference' && (
                <div className="space-y-3 animate-in fade-in duration-200 text-left">
                  {/* Sub-Navigator Filter Pills */}
                  <div className={`p-1.5 rounded-xl border flex items-center gap-1.5 overflow-x-auto scrollbar-none shadow-sm shrink-0 ${
                    isDay ? 'bg-white border-emerald-200' : 'bg-[#041a1f] border-teal-700/50'
                  }`}>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveRefSection('all');
                        if (soundEnabled) soundHaptics.playTap();
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
                        activeRefSection === 'all'
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm scale-[1.02]'
                          : isDay ? 'text-slate-700 hover:bg-slate-100' : 'text-emerald-200/80 hover:bg-white/5'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                      <span>{selectedLanguage === 'bn' ? 'সবগুলো দলিল' : 'All Docs'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveRefSection('quran');
                        if (soundEnabled) soundHaptics.playTap();
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
                        activeRefSection === 'quran'
                          ? 'bg-emerald-600 text-white shadow-sm scale-[1.02]'
                          : isDay ? 'text-slate-700 hover:bg-slate-100' : 'text-emerald-200/80 hover:bg-white/5'
                      }`}
                    >
                      <BookOpen className="w-3.5 h-3.5 shrink-0" />
                      <span>{selectedLanguage === 'bn' ? '📖 কুরআন' : 'Quran'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveRefSection('hadith');
                        if (soundEnabled) soundHaptics.playTap();
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
                        activeRefSection === 'hadith'
                          ? 'bg-amber-600 text-white shadow-sm scale-[1.02]'
                          : isDay ? 'text-slate-700 hover:bg-slate-100' : 'text-amber-200/80 hover:bg-white/5'
                      }`}
                    >
                      <Scroll className="w-3.5 h-3.5 shrink-0" />
                      <span>{selectedLanguage === 'bn' ? '📜 হাদিস' : 'Hadith'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveRefSection('books');
                        if (soundEnabled) soundHaptics.playTap();
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
                        activeRefSection === 'books'
                          ? 'bg-teal-600 text-white shadow-sm scale-[1.02]'
                          : isDay ? 'text-slate-700 hover:bg-slate-100' : 'text-teal-200/80 hover:bg-white/5'
                      }`}
                    >
                      <Bookmark className="w-3.5 h-3.5 shrink-0" />
                      <span>{selectedLanguage === 'bn' ? `📚 কিতাবসমূহ (${religiousDetails.classicalBooks.length})` : `Books (${religiousDetails.classicalBooks.length})`}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveRefSection('lessons');
                        if (soundEnabled) soundHaptics.playTap();
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
                        activeRefSection === 'lessons'
                          ? 'bg-indigo-600 text-white shadow-sm scale-[1.02]'
                          : isDay ? 'text-slate-700 hover:bg-slate-100' : 'text-indigo-200/80 hover:bg-white/5'
                      }`}
                    >
                      <Lightbulb className="w-3.5 h-3.5 shrink-0" />
                      <span>{selectedLanguage === 'bn' ? `✨ শিক্ষা (${religiousDetails.keyLessons.length})` : `Wisdom (${religiousDetails.keyLessons.length})`}</span>
                    </button>
                  </div>

                  {/* Highlight Header Banner */}
                  <div className={`p-2.5 sm:p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-sm ${
                    isDay
                      ? 'bg-gradient-to-r from-emerald-100/90 via-teal-50 to-emerald-100/90 border-emerald-300 text-emerald-950'
                      : 'bg-gradient-to-r from-emerald-950/95 via-teal-950/85 to-[#041a1f] border-emerald-500/40 text-emerald-50'
                  }`}>
                    <div className="space-y-0.5 flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="p-1 rounded-lg bg-emerald-600 text-white text-xs shrink-0">
                          <Sparkles className="w-3 h-3 text-amber-300" />
                        </span>
                        <h3 className="text-[11px] sm:text-xs font-bold tracking-tight">
                          {selectedLanguage === 'bn' 
                            ? 'কুরআন, হাদিস, ঐতিহাসিক কিতাব ও জীবন দর্শন' 
                            : 'Quran, Hadith, Primary Books & Lessons'}
                        </h3>
                      </div>
                      <p className={`text-[10px] sm:text-[11px] font-normal leading-relaxed ${isDay ? 'text-emerald-800' : 'text-emerald-300/80'}`}>
                        {selectedLanguage === 'bn'
                          ? 'প্রতিটি ঐতিহাসিক ঘটনার পেছনে থাকা নির্ভরযোগ্য ইসলামী রেফারেন্সের পূর্ণাঙ্গ সংগ্রহ'
                          : 'Authentic Islamic references, classical historiographical sources & timeless wisdom'}
                      </p>
                    </div>

                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-emerald-600 text-white font-bold shrink-0 shadow-sm self-start sm:self-center">
                      {religiousDetails.classicalBooks.length + 2} টি দলিল
                    </span>
                  </div>

                  {/* SECTION 1: কুরআন */}
                  {(activeRefSection === 'all' || activeRefSection === 'quran') && (
                    <div
                      className={`p-3 sm:p-3.5 rounded-xl border-2 space-y-2.5 relative shadow-sm ${
                        isDay
                          ? 'bg-gradient-to-br from-emerald-50/95 via-teal-50/50 to-white border-emerald-300 text-slate-900'
                          : 'bg-gradient-to-br from-[#041d22] via-[#072a31] to-[#021418] border-emerald-500/40 text-white'
                      }`}
                    >
                      <div className={`flex flex-wrap items-center justify-between gap-2 border-b pb-1.5 ${isDay ? 'border-emerald-200' : 'border-emerald-500/25'}`}>
                        <div className="flex items-center gap-1.5 text-xs font-bold">
                          <div className="p-1 rounded-md bg-emerald-600 text-white shadow-sm shrink-0">
                            <BookOpen className="w-3 h-3" />
                          </div>
                          <span className={isDay ? 'text-emerald-950 font-bold' : 'text-emerald-200 font-bold'}>
                            {selectedLanguage === 'bn' ? '১. পবিত্র কুরআনের প্রাসঙ্গিক আয়াত' : '1. Relevant Quranic Ayah'}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              if (isPlayingAyatAudio) {
                                if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                                  window.speechSynthesis.cancel();
                                }
                                setIsPlayingAyatAudio(false);
                              } else {
                                setIsPlayingAyatAudio(true);
                                playArabicVoice(religiousDetails.quranAyat.arabic, 'male', () => {
                                  setIsPlayingAyatAudio(false);
                                });
                              }
                              if (soundEnabled) soundHaptics.playTap();
                            }}
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-1 cursor-pointer transition active:scale-95 shadow-sm ${
                              isPlayingAyatAudio
                                ? 'bg-amber-600 text-white ring-1 ring-amber-400'
                                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                            }`}
                          >
                            {isPlayingAyatAudio ? (
                              <>
                                <Square className="w-2.5 h-2.5 fill-current" />
                                <span>{selectedLanguage === 'bn' ? 'থামুন' : 'Stop'}</span>
                              </>
                            ) : (
                              <>
                                <Volume2 className="w-2.5 h-2.5" />
                                <span>{selectedLanguage === 'bn' ? 'আয়াত শুনুন' : 'Listen'}</span>
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={(e) => handleCopyText(`${religiousDetails.quranAyat.arabic}\n\n${religiousDetails.quranAyat.translationBn}\n(${religiousDetails.quranAyat.surah})`, 'quran_ref', e)}
                            className={`px-2 py-0.5 rounded-md text-[10px] font-medium border transition flex items-center gap-1 cursor-pointer ${
                              copiedTextId === 'quran_ref'
                                ? 'bg-emerald-600 text-white border-emerald-600'
                                : isDay
                                ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300'
                                : 'bg-[#0b333a] hover:bg-[#10434c] text-emerald-200 border-teal-700'
                            }`}
                          >
                            {copiedTextId === 'quran_ref' ? <Check className="w-2.5 h-2.5 text-white" /> : <Copy className="w-2.5 h-2.5" />}
                            <span>{copiedTextId === 'quran_ref' ? 'কপি হয়েছে' : 'কপি'}</span>
                          </button>
                        </div>
                      </div>

                      <div className={`p-3 rounded-lg border relative ${
                        isDay ? 'bg-white border-emerald-200 shadow-sm' : 'bg-[#011215] border-teal-600/40 shadow-inner'
                      }`}>
                        <div className="text-center pb-1 select-none">
                          <span className={`text-[9px] font-arabic tracking-wider opacity-75 ${
                            isDay ? 'text-emerald-800' : 'text-emerald-400'
                          }`}>
                            بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
                          </span>
                        </div>
                        <p dir="rtl" className={`font-arabic text-base sm:text-lg font-bold leading-[2.0] text-right select-text ${
                          isDay ? 'text-emerald-950 font-bold' : 'text-emerald-200'
                        }`}>
                          {religiousDetails.quranAyat.arabic} ۝
                        </p>
                      </div>

                      <div className={`p-2.5 rounded-lg border-l-4 border ${
                        isDay 
                          ? 'bg-emerald-50 border-emerald-200 border-l-emerald-600 shadow-sm' 
                          : 'bg-[#06242a] border-teal-700/50 border-l-emerald-400 shadow-sm'
                      }`}>
                        <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                          <span className={`text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                            isDay ? 'text-emerald-900' : 'text-emerald-300'
                          }`}>
                            <span>📖</span>
                            <span>{selectedLanguage === 'bn' ? 'পবিত্র আয়াতের ভাবানুবাদ:' : 'Meaning:'}</span>
                          </span>
                          <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border shrink-0 ${
                            isDay 
                              ? 'bg-emerald-100 text-emerald-900 border-emerald-300' 
                              : 'bg-emerald-900/60 text-emerald-200 border-emerald-500/40'
                          }`}>
                            {religiousDetails.quranAyat.surah}
                          </span>
                        </div>
                        <p className={`text-xs sm:text-[13px] leading-relaxed font-medium select-text ${
                          isDay ? 'text-slate-950' : 'text-emerald-50'
                        }`}>
                          {religiousDetails.quranAyat.translationBn}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* SECTION 2: হাদিস */}
                  {(activeRefSection === 'all' || activeRefSection === 'hadith') && (
                    <div
                      className={`p-3 sm:p-3.5 rounded-xl border-2 space-y-2.5 relative shadow-sm ${
                        isDay
                          ? 'bg-gradient-to-br from-amber-50/95 via-orange-50/40 to-white border-amber-300 text-slate-900'
                          : 'bg-gradient-to-br from-[#1d1506] via-[#291e0a] to-[#140e04] border-amber-500/40 text-white'
                      }`}
                    >
                      <div className={`flex flex-wrap items-center justify-between gap-2 border-b pb-1.5 ${isDay ? 'border-amber-200' : 'border-amber-500/25'}`}>
                        <div className="flex items-center gap-1.5 text-xs font-bold">
                          <div className="p-1 rounded-md bg-amber-600 text-white shadow-sm shrink-0">
                            <Scroll className="w-3 h-3" />
                          </div>
                          <span className={isDay ? 'text-amber-950 font-bold' : 'text-amber-200 font-bold'}>
                            {selectedLanguage === 'bn' ? '২. সহীহ হাদিসের প্রামাণ্য দলিল' : '2. Authentic Sahih Hadith'}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-600 text-white shadow-sm">
                            ✓ সহীহ
                          </span>

                          <button
                            type="button"
                            onClick={(e) => handleCopyText(`${religiousDetails.hadith.arabicSnippet ? `«${religiousDetails.hadith.arabicSnippet}»\n` : ''}${religiousDetails.hadith.textBn}\nসূত্র: ${religiousDetails.hadith.source}`, 'hadith_ref', e)}
                            className={`px-2 py-0.5 rounded-md text-[10px] font-medium border transition flex items-center gap-1 cursor-pointer ${
                              copiedTextId === 'hadith_ref'
                                ? 'bg-amber-600 text-white border-amber-600'
                                : isDay
                                ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300'
                                : 'bg-[#2b210e] hover:bg-[#382b13] text-amber-200 border-amber-700'
                            }`}
                          >
                            {copiedTextId === 'hadith_ref' ? <Check className="w-2.5 h-2.5 text-white" /> : <Copy className="w-2.5 h-2.5" />}
                            <span>{copiedTextId === 'hadith_ref' ? 'কপি হয়েছে' : 'কপি'}</span>
                          </button>
                        </div>
                      </div>

                      {religiousDetails.hadith.arabicSnippet && (
                        <div className={`p-2.5 rounded-lg border relative ${
                          isDay ? 'bg-white border-amber-200 shadow-sm' : 'bg-black/45 border-amber-700/50 shadow-inner'
                        }`}>
                          <p dir="rtl" className={`font-arabic text-sm sm:text-base font-bold text-right leading-relaxed select-text ${
                            isDay ? 'text-amber-950 font-bold' : 'text-amber-200'
                          }`}>
                            «{religiousDetails.hadith.arabicSnippet}»
                          </p>
                        </div>
                      )}

                      <div className={`p-2.5 rounded-lg border-l-4 border ${
                        isDay 
                          ? 'bg-amber-50 border-amber-200 border-l-amber-600 shadow-sm' 
                          : 'bg-[#251e0e]/90 border-amber-800/40 border-l-amber-400 shadow-sm'
                      }`}>
                        <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                          <span className={`text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                            isDay ? 'text-amber-900' : 'text-amber-300'
                          }`}>
                            <span>📜</span>
                            <span>{selectedLanguage === 'bn' ? 'হাদিসের মর্মার্থ:' : 'Meaning:'}</span>
                          </span>
                          <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border shrink-0 ${
                            isDay 
                              ? 'bg-amber-100 text-amber-950 border-amber-300' 
                              : 'bg-amber-900/60 text-amber-200 border-amber-500/40'
                          }`}>
                            {religiousDetails.hadith.source}
                          </span>
                        </div>
                        <p className={`text-xs sm:text-[13px] leading-relaxed font-medium select-text ${
                          isDay ? 'text-slate-950' : 'text-amber-50'
                        }`}>
                          {religiousDetails.hadith.textBn}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* SECTION 3: কিতাবসমূহ */}
                  {(activeRefSection === 'all' || activeRefSection === 'books') && (
                    <div
                      className={`p-3 sm:p-3.5 rounded-xl border-2 space-y-2.5 shadow-sm ${
                        isDay 
                          ? 'bg-gradient-to-br from-teal-50/95 via-sky-50/40 to-white border-teal-300 text-slate-900' 
                          : 'bg-gradient-to-br from-[#061d22] via-[#092b33] to-[#041418] border-teal-500/40 text-white'
                      }`}
                    >
                      <div className={`flex flex-wrap items-center justify-between gap-2 border-b pb-1.5 ${isDay ? 'border-teal-200' : 'border-teal-700/40'}`}>
                        <div className="flex items-center gap-1.5 text-xs font-bold">
                          <div className="p-1 rounded-md bg-teal-600 text-white shadow-sm shrink-0">
                            <Bookmark className="w-3 h-3" />
                          </div>
                          <span className={isDay ? 'text-teal-950 font-bold' : 'text-teal-200 font-bold'}>
                            {selectedLanguage === 'bn' ? '৩. মূল ঐতিহাসিক কিতাবসমূহ' : '3. Classical Historical Sources'}
                          </span>
                        </div>

                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border shadow-sm shrink-0 ${
                          isDay ? 'bg-teal-100 text-teal-950 border-teal-300' : 'bg-teal-900/60 text-teal-200 border-teal-500/40'
                        }`}>
                          {religiousDetails.classicalBooks.length} টি কিতাব
                        </span>
                      </div>

                      <div className="grid grid-cols-1 gap-2 pt-0.5">
                        {religiousDetails.classicalBooks.map((book, bIdx) => (
                          <div
                            key={bIdx}
                            className={`p-2.5 rounded-lg border flex flex-col gap-1.5 shadow-sm ${
                              isDay ? 'bg-white border-slate-200' : 'bg-[#02181d] border-teal-700/50 text-slate-100'
                            }`}
                          >
                            <div className="flex items-start gap-2">
                              <span className="w-4 h-4 rounded bg-teal-600/15 text-teal-700 dark:text-teal-300 font-bold text-[10px] flex items-center justify-center shrink-0 border border-teal-500/20 mt-0.5">
                                {toBengaliDigits(bIdx + 1)}
                              </span>
                              <h4 className={`font-bold text-xs sm:text-[13px] select-text leading-snug flex-1 ${
                                isDay ? 'text-slate-950' : 'text-emerald-200'
                              }`}>
                                {book.titleBn}
                              </h4>
                            </div>

                            <div className={`pt-1 border-t flex flex-wrap items-center justify-between gap-2 text-[10px] pl-6 ${
                              isDay ? 'border-slate-100 text-slate-700' : 'border-teal-800/40 text-emerald-300/90'
                            }`}>
                              <div className="flex items-center gap-1 min-w-0">
                                <span className="shrink-0 text-slate-500">🖋️ লেখক:</span>
                                <strong className={`font-semibold select-text ${isDay ? 'text-slate-950' : 'text-white'}`}>{book.authorBn}</strong>
                              </div>

                              <div className="flex items-center gap-1.5 shrink-0 ml-auto">
                                <span className={`font-mono px-1.5 py-0.5 rounded border ${
                                  isDay ? 'bg-slate-100 text-slate-800 border-slate-300' : 'bg-teal-900/60 text-emerald-300 border-teal-700/50'
                                }`}>
                                  ⏳ {book.era}
                                </span>

                                <button
                                  type="button"
                                  onClick={(e) => handleCopyText(`কিতাব: ${book.titleBn}\nলেখক: ${book.authorBn}\nযুগ: ${book.era}`, `book_${bIdx}`, e)}
                                  className={`p-1 rounded border transition cursor-pointer ${
                                    copiedTextId === `book_${bIdx}`
                                      ? 'bg-emerald-600 text-white border-emerald-600'
                                      : isDay ? 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200' : 'bg-white/5 hover:bg-white/10 text-teal-200 border-teal-800'
                                  }`}
                                >
                                  {copiedTextId === `book_${bIdx}` ? <Check className="w-2.5 h-2.5 text-white" /> : <Copy className="w-2.5 h-2.5" />}
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SECTION 4: শিক্ষা ও হিকমত */}
                  {(activeRefSection === 'all' || activeRefSection === 'lessons') && (
                    <div
                      className={`p-3 sm:p-3.5 rounded-xl border-2 space-y-2.5 relative shadow-sm ${
                        isDay 
                          ? 'bg-gradient-to-br from-emerald-50/95 via-teal-50/50 to-white border-emerald-300 text-slate-900' 
                          : 'bg-gradient-to-br from-[#07242a] via-[#0b333c] to-[#051a1e] border-emerald-400/40 text-emerald-50'
                      }`}
                    >
                      <div className={`flex flex-wrap items-center justify-between gap-2 border-b pb-1.5 ${isDay ? 'border-emerald-200' : 'border-teal-700/40'}`}>
                        <div className="flex items-center gap-1.5 text-xs font-bold">
                          <div className="p-1 rounded-md bg-amber-500 text-white shadow-sm shrink-0">
                            <Sparkles className="w-3 h-3" />
                          </div>
                          <span className={isDay ? 'text-emerald-950 font-bold' : 'text-emerald-200 font-bold'}>
                            {selectedLanguage === 'bn' ? '৪. মূল শিক্ষণীয় বিষয় ও হিকমত' : '4. Key Lessons & Wisdom'}
                          </span>
                        </div>

                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border shadow-sm shrink-0 ${
                          isDay ? 'bg-emerald-100 text-emerald-950 border-emerald-300' : 'bg-emerald-900/60 text-emerald-200 border-emerald-500/40'
                        }`}>
                          {religiousDetails.keyLessons.length} টি শিক্ষা
                        </span>
                      </div>

                      <div className="space-y-1.5 pt-0.5">
                        {religiousDetails.keyLessons.map((lesson, lIdx) => (
                          <div
                            key={lIdx}
                            className={`p-2.5 rounded-lg border flex items-start gap-2 shadow-sm ${
                              isDay ? 'bg-white border-slate-200' : 'bg-[#031d22] border-teal-700/40 text-emerald-100'
                            }`}
                          >
                            <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold text-[10px] flex items-center justify-center shrink-0 border border-amber-500/30 mt-0.5">
                              {toBengaliDigits(lIdx + 1)}
                            </span>
                            <p className={`text-xs sm:text-[13px] font-medium leading-relaxed select-text flex-1 ${
                              isDay ? 'text-slate-950' : 'text-emerald-50'
                            }`}>
                              {lesson}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Quote Card */}
                      <div className={`mt-2 p-3 rounded-lg border relative overflow-hidden shadow-sm ${
                        isDay 
                          ? 'border-amber-400/70 bg-gradient-to-r from-amber-50/90 via-yellow-50/50 to-amber-50/90 text-amber-950' 
                          : 'border-amber-400/50 bg-gradient-to-r from-[#1e1606] via-[#2a1e08] to-[#150f03] text-amber-100'
                      }`}>
                        <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                            <Quote className="w-3 h-3 fill-current shrink-0" />
                            <span>চিরন্তন জীবন দর্শন ও হিকমত:</span>
                          </span>

                          <button
                            type="button"
                            onClick={(e) => handleCopyText(`“${religiousDetails.spiritualTakeaway}”`, 'quote_ref', e)}
                            className={`p-1 rounded border transition cursor-pointer text-[10px] flex items-center gap-1 shrink-0 ${
                              copiedTextId === 'quote_ref'
                                ? 'bg-amber-600 text-white border-amber-600'
                                : isDay ? 'bg-white text-slate-800 border-amber-300' : 'bg-black/30 text-amber-200 border-amber-700/50'
                            }`}
                          >
                            {copiedTextId === 'quote_ref' ? <Check className="w-2.5 h-2.5 text-white" /> : <Copy className="w-2.5 h-2.5" />}
                            <span>{copiedTextId === 'quote_ref' ? 'কপি হয়েছে' : 'কপি'}</span>
                          </button>
                        </div>

                        <p className={`italic leading-relaxed select-text font-bold text-xs sm:text-[13px] ${
                          isDay ? 'text-slate-950' : 'text-amber-100'
                        }`}>
                          “{religiousDetails.spiritualTakeaway}”
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Switch back to Tab 1 CTA */}
                  <div className="pt-1 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('story');
                        if (soundEnabled) soundHaptics.playTap();
                      }}
                      className={`w-full py-2.5 px-3.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition active:scale-98 shadow-sm ${
                        isDay
                          ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                          : 'bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-200 border-emerald-700'
                      }`}
                    >
                      <span>←</span>
                      <span>{selectedLanguage === 'bn' ? '১. ইতিহাস ও মূল বিবরণে ফিরে যান' : 'Back to 1. History & Story'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* VERTICAL STEPPER SCROLLBAR (AS IN PIC 2) */}
            <div className={`w-4 sm:w-5 shrink-0 flex flex-col items-center justify-between py-1 border-l select-none ${
              isDay ? 'border-slate-200 bg-slate-100/70' : 'border-teal-900/60 bg-black/40'
            }`}>
              {/* Up Arrow Button */}
              <button
                type="button"
                onClick={scrollUp}
                className={`w-full py-1.5 flex items-center justify-center cursor-pointer transition active:scale-90 ${
                  canScrollUp
                    ? isDay ? 'text-slate-700 hover:bg-slate-200/70' : 'text-emerald-300 hover:bg-white/10'
                    : 'opacity-25 cursor-default text-slate-400'
                }`}
                title={selectedLanguage === 'bn' ? 'উপরে স্ক্রল করুন' : 'Scroll Up'}
              >
                <ChevronUp className="w-3.5 h-3.5" />
              </button>

              {/* Visual Track & Draggable Thumb */}
              <div
                onClick={handleTrackClick}
                className={`w-2 flex-1 rounded-full my-1 cursor-pointer relative overflow-hidden ${
                  isDay ? 'bg-slate-300/80 hover:bg-slate-300' : 'bg-teal-950/80 hover:bg-teal-900'
                }`}
                title={selectedLanguage === 'bn' ? 'স্ক্রল বার' : 'Scroll bar'}
              >
                <div
                  className={`w-full rounded-full absolute left-0 right-0 transition-all duration-75 ${
                    isDay ? 'bg-slate-600 hover:bg-slate-700' : 'bg-emerald-500 hover:bg-emerald-400'
                  }`}
                  style={{
                    height: `${scrollThumbHeightPct}%`,
                    top: `${scrollThumbTopPct}%`,
                  }}
                />
              </div>

              {/* Down Arrow Button */}
              <button
                type="button"
                onClick={scrollDown}
                className={`w-full py-1.5 flex items-center justify-center cursor-pointer transition active:scale-90 ${
                  canScrollDown
                    ? isDay ? 'text-slate-700 hover:bg-slate-200/70' : 'text-emerald-300 hover:bg-white/10'
                    : 'opacity-25 cursor-default text-slate-400'
                }`}
                title={selectedLanguage === 'bn' ? 'নিচে স্ক্রল করুন' : 'Scroll Down'}
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* DOCKED BOTTOM EVENT NAVIGATION BAR */}
          <div className={`shrink-0 px-3.5 py-2 border-t flex items-center justify-between gap-2 ${
            isDay ? 'border-slate-100 bg-slate-50/80' : 'border-teal-900/40 bg-[#04171c]/90'
          }`}>
            <button
              type="button"
              onClick={handlePrev}
              disabled={!hasPrev}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer border ${
                !hasPrev
                  ? 'opacity-35 cursor-not-allowed bg-slate-100 border-slate-200 text-slate-400'
                  : isDay
                  ? 'bg-white hover:bg-slate-100 border-slate-200 text-slate-800 active:scale-95'
                  : 'bg-[#0d343c] hover:bg-[#12444e] border-[#154d58] text-emerald-200 active:scale-95'
              }`}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>{selectedLanguage === 'bn' ? 'পূর্ববর্তী' : 'Prev'}</span>
            </button>

            {/* Event Counter Badge */}
            <div className={`text-[11px] font-mono font-black px-2.5 py-1 rounded-lg border ${
              isDay 
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-800' 
                : 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300'
            }`}>
              {toBengaliDigits(currentIndex + 1)} / {toBengaliDigits(ISLAMIC_HISTORY_EVENTS.length)}
            </div>

            <button
              type="button"
              onClick={handleNext}
              disabled={!hasNext}
              className={`py-2 px-3.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1 cursor-pointer shadow-md border ${
                !hasNext
                  ? 'opacity-35 cursor-not-allowed bg-slate-100 border-slate-200 text-slate-400'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white border-transparent active:scale-95 shadow-emerald-500/20'
              }`}
            >
              <span>{selectedLanguage === 'bn' ? 'পরবর্তী ঘটনা' : 'Next'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. BOTTOM TIMELINE CONTROLS & DYNAMIC SLIDER WITH PROGRESS INDICATORS */}
      <div
        className={`p-5 rounded-[26px] border shadow-2xl space-y-5 transition-all duration-300 relative overflow-hidden ${
          isDay 
            ? 'bg-white/95 border-slate-200/80 shadow-teal-900/5' 
            : 'bg-[#061e24]/95 border-[#123e47] shadow-black/85'
        }`}
      >
        {/* Subtle decorative glow accent at bottom of deck */}
        <div className="absolute -bottom-24 left-1/4 right-1/4 h-32 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />

        {/* Playback & Fast Navigation Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 dark:border-teal-900/40 pb-4">
          
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={togglePlay}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-90 hover:scale-105 text-white shadow-lg cursor-pointer ${
                isPlaying 
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 shadow-amber-500/30 hover:brightness-110 ring-4 ring-amber-500/25' 
                  : 'bg-gradient-to-r from-emerald-500 to-teal-600 shadow-emerald-600/30 hover:brightness-110 ring-4 ring-emerald-500/25'
              }`}
              title={isPlaying ? 'Pause' : 'Play Timeline Tour'}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current animate-pulse" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>

            <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 dark:bg-[#0f2e35] rounded-xl border border-slate-200/60 dark:border-teal-500/15">
              {[0.5, 1, 2, 3, 5].map((speed) => {
                const isActive = playSpeed === speed;
                return (
                  <button
                    key={speed}
                    type="button"
                    onClick={() => {
                      setPlaySpeed(speed);
                      if (soundEnabled) soundHaptics.playTap();
                    }}
                    className={`px-3 py-1 text-[11px] font-black rounded-lg transition-all cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                        : isDay
                        ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                        : 'text-teal-300 hover:text-white hover:bg-teal-950/40'
                    }`}
                  >
                    {toBengaliDigits(speed)}x
                  </button>
                );
              })}
            </div>
          </div>

          <div className="text-center max-w-sm sm:max-w-md w-full sm:w-auto">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 dark:bg-emerald-500/5 border border-emerald-500/25 dark:border-emerald-500/15 px-3.5 py-2 rounded-2xl text-xs font-black text-emerald-700 dark:text-emerald-300 shadow-sm max-w-full">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: CATEGORY_INFO[activeEvent.cat].color, boxShadow: `0 0 8px ${CATEGORY_INFO[activeEvent.cat].color}` }} />
              <span className="truncate max-w-[180px] sm:max-w-xs">{formattedTitle} ({toBengaliDigits(activeEvent.y)} {selectedLanguage === 'bn' ? 'খ্রি.' : 'CE'})</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-teal-300/40 font-black tracking-wide font-mono">
            <span>৫৭০ {selectedLanguage === 'bn' ? 'খ্রি.' : 'CE'}</span>
            <span>–</span>
            <span>২০২৬ {selectedLanguage === 'bn' ? 'খ্রি.' : 'CE'}</span>
          </div>
        </div>

        {/* Chronological connected Segmented Era bar - Double Deck on Mobile, Single on Desktop for clean layouts */}
        <div className="w-full grid grid-cols-4 sm:grid-cols-8 gap-2 rounded-2xl text-[9px] text-white">
          {ISLAMIC_HISTORY_ERAS.map((era, index) => {
            const isCurrentEra = activeEra.id === era.id;
            const eraColor = `var(${era.col}, #059669)`;
            return (
              <button
                key={era.id}
                onClick={() => {
                  handleJumpToEra(era);
                  if (soundEnabled) soundHaptics.playTap();
                }}
                type="button"
                className={`relative flex flex-col items-center justify-center py-2 px-1 rounded-xl text-[10px] font-extrabold transition-all duration-300 cursor-pointer text-center select-none ${
                  isCurrentEra
                    ? 'text-white scale-[1.03] border'
                    : isDay
                    ? 'bg-slate-100/80 hover:bg-slate-200 text-slate-700 border border-slate-200/50 hover:text-slate-900'
                    : 'bg-emerald-950/20 hover:bg-emerald-900/40 text-emerald-100/75 border border-teal-500/10 hover:text-white'
                }`}
                style={{
                  borderColor: isCurrentEra ? eraColor : 'transparent',
                  backgroundColor: isCurrentEra ? eraColor : undefined,
                  boxShadow: isCurrentEra ? `0 6px 16px ${eraColor}45` : undefined,
                }}
                title={`${getLangText(era.name, selectedLanguage)} (${era.from} - ${era.to})`}
              >
                <span className="truncate w-full font-black block tracking-tight">{getLangText(era.name, selectedLanguage)}</span>
                <span className="text-[7.5px] opacity-80 block font-mono font-normal mt-0.5 leading-none">
                  {toBengaliDigits(era.from)} - {toBengaliDigits(era.to)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Timeline Slider with Glow Ticks & Event Dot Integration */}
        <div className="relative py-4 select-none">
          {/* Underlay Track Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-slate-100 dark:bg-teal-950/30 rounded-full -translate-y-1/2 pointer-events-none" />

          {/* Glowing Progress Line */}
          <div 
            className="absolute top-1/2 left-0 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full -translate-y-1/2 pointer-events-none" 
            style={{ width: `${(currentIndex / (ISLAMIC_HISTORY_EVENTS.length - 1)) * 100}%` }}
          />

          {/* Connected Interactive Tasbih Event Beads */}
          <div className="absolute top-1/2 left-1.5 right-1.5 flex items-center justify-between -translate-y-1/2 pointer-events-none">
            {ISLAMIC_HISTORY_EVENTS.map((evt, idx) => {
              const isSelected = idx === currentIndex;
              const isPassed = idx < currentIndex;
              const catColor = CATEGORY_INFO[evt.cat].color;
              return (
                <div
                  key={idx}
                  className="flex items-center justify-center relative transition-all duration-300"
                  style={{ 
                    width: '6px', 
                    height: '6px',
                  }}
                >
                  <div
                    className={`rounded-full transition-all duration-500 cursor-pointer pointer-events-auto ${
                      isSelected 
                        ? 'w-3.5 h-3.5 bg-gradient-to-r from-amber-400 to-amber-500 shadow-[0_0_15px_#f59e0b] ring-[5px] ring-amber-500/30 scale-125 z-10 animate-spring-pop' 
                        : isPassed
                        ? 'w-1.5 h-1.5 hover:scale-150 opacity-90'
                        : 'w-1.5 h-1.5 hover:scale-150 opacity-60'
                    }`}
                    style={{ 
                      backgroundColor: isSelected ? undefined : catColor,
                      boxShadow: isSelected ? undefined : isPassed ? `0 0 6px ${catColor}a0` : undefined,
                    }}
                    onClick={() => {
                      setCurrentIndex(idx);
                      if (soundEnabled) soundHaptics.playTap();
                    }}
                    title={`${getLangText(evt.t, selectedLanguage)} (${evt.y} CE)`}
                  />
                </div>
              );
            })}
          </div>

          {/* Transparent Range Input Slider that acts as the interaction surface */}
          <input
            type="range"
            min={0}
            max={ISLAMIC_HISTORY_EVENTS.length - 1}
            value={currentIndex}
            onChange={(e) => {
              setCurrentIndex(parseInt(e.target.value, 10));
              if (soundEnabled) soundHaptics.playTap();
            }}
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-8 opacity-0 cursor-pointer z-20"
          />
        </div>

        {/* Historical Tick Marks */}
        <div className="flex items-center justify-between text-[9px] font-black text-slate-400/80 dark:text-teal-300/40 px-1 font-mono">
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

        {/* Progress Bar & Travel Visited Status Indicator */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 text-xs font-black text-slate-500 dark:text-emerald-300/80 border-t border-slate-100 dark:border-teal-900/40">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 drop-shadow-[0_0_4px_rgba(16,185,129,0.3)]" />
            <span>
              {selectedLanguage === 'bn' 
                ? `${toBengaliDigits(currentIndex + 1)}টি স্থান ঘুরে দেখা হয়েছে (সর্বমোট ${toBengaliDigits(ISLAMIC_HISTORY_EVENTS.length)}টি ঘটনা)`
                : `${currentIndex + 1} of ${ISLAMIC_HISTORY_EVENTS.length} events explored`}
            </span>
          </div>
          <div className="w-full sm:w-64 bg-slate-100 dark:bg-[#123840]/65 h-3 rounded-full overflow-hidden border border-teal-500/15 p-0.5 relative text-left">
            <div
              className="bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500 h-full rounded-full transition-all duration-300 shadow shadow-emerald-500/30 relative overflow-hidden"
              style={{ width: `${((currentIndex + 1) / ISLAMIC_HISTORY_EVENTS.length) * 100}%` }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)] animate-[shimmer_1.5s_infinite] bg-[size:100px_100%]" style={{ animationDuration: '2s' }} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ThemeMode, ZikrLanguage } from '../types';
import {
  Compass,
  MapPin,
  ExternalLink,
  Navigation,
  Layers,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Calendar,
  X,
  BookOpen,
  Sparkles,
  Search,
  Filter,
} from 'lucide-react';
import { soundHaptics } from '../utils/audioHaptics';
import { SEERAT_LOCATIONS, SeeratLocation } from '../data/seeratLocations';
import { SEERAT_DATABASE } from '../data/seeratData';

interface SeeratHistoricMapViewProps {
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
  soundEnabled?: boolean;
  selectedLocationId?: string | null;
  onSelectAgeChapter?: (age: number) => void;
  onClose?: () => void;
  isModal?: boolean;
}

export const SeeratHistoricMapView: React.FC<SeeratHistoricMapViewProps> = ({
  themeMode = 'night',
  selectedLanguage = 'bn',
  soundEnabled = true,
  selectedLocationId = null,
  onSelectAgeChapter,
  onClose,
  isModal = false,
}) => {
  const isDay = themeMode === 'day';
  const lang = selectedLanguage || 'bn';
  const isBn = lang === 'bn';
  const isAr = lang === 'ar';

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const routesLayerRef = useRef<L.LayerGroup | null>(null);

  const [activeLocationId, setActiveLocationId] = useState<string>(
    selectedLocationId || 'makkah'
  );
  const [mapStyle, setMapStyle] = useState<'osm' | 'satellite' | 'terrain'>('terrain');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'sanctuary' | 'battle' | 'journey' | 'cave'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showRoutes, setShowRoutes] = useState(true);

  const activeLoc: SeeratLocation = SEERAT_LOCATIONS[activeLocationId] || SEERAT_LOCATIONS.makkah;

  // Filtered locations
  const filteredLocations = Object.values(SEERAT_LOCATIONS).filter((loc) => {
    const matchesCategory = categoryFilter === 'all' || loc.category === categoryFilter;
    if (!matchesCategory) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      loc.nameBn.toLowerCase().includes(q) ||
      loc.nameEn.toLowerCase().includes(q) ||
      loc.nameAr.toLowerCase().includes(q) ||
      loc.modernCityBn.toLowerCase().includes(q)
    );
  });

  // Tile layers definition
  const getTileUrl = (style: 'osm' | 'satellite' | 'terrain') => {
    if (style === 'satellite') {
      return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    }
    if (style === 'terrain') {
      return 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
    }
    return 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
  };

  const getTileAttribution = (style: 'osm' | 'satellite' | 'terrain') => {
    if (style === 'satellite') return '&copy; Esri &mdash; Earthstar Geographics';
    if (style === 'terrain') return '&copy; OpenTopoMap & OpenStreetMap contributors';
    return '&copy; CARTO & OpenStreetMap contributors';
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [activeLoc.lat, activeLoc.lng],
        zoom: activeLoc.zoom,
        zoomControl: false,
        attributionControl: false,
      });

      const tileLayer = L.tileLayer(getTileUrl(mapStyle), {
        attribution: getTileAttribution(mapStyle),
        maxZoom: 18,
      }).addTo(map);

      // Attribution
      L.control.attribution({ position: 'bottomright', prefix: false }).addTo(map);

      const markersGroup = L.layerGroup().addTo(map);
      const routesGroup = L.layerGroup().addTo(map);

      mapInstanceRef.current = map;
      markersLayerRef.current = markersGroup;
      routesLayerRef.current = routesGroup;

      (map as any)._customTileLayer = tileLayer;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update tile layer when style changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !(map as any)._customTileLayer) return;

    map.removeLayer((map as any)._customTileLayer);
    const newLayer = L.tileLayer(getTileUrl(mapStyle), {
      attribution: getTileAttribution(mapStyle),
      maxZoom: 18,
    }).addTo(map);
    (map as any)._customTileLayer = newLayer;
  }, [mapStyle]);

  // Render Routes (Hijrah, Caravans, Expeditions)
  useEffect(() => {
    const routesGroup = routesLayerRef.current;
    if (!routesGroup) return;
    routesGroup.clearLayers();

    if (!showRoutes) return;

    // 1. Great Hijrah Route (Makkah -> Cave Thawr -> Quba -> Madinah)
    const hijrahCoords: [number, number][] = [
      [21.4225, 39.8262], // Makkah
      [21.3783, 39.8519], // Cave Thawr
      [22.1500, 39.1000], // Coastal desert detour
      [23.1000, 38.8000], // Rabigh passage
      [24.4394, 39.6173], // Quba
      [24.4672, 39.6111], // Madinah
    ];

    const hijrahLine = L.polyline(hijrahCoords, {
      color: '#10b981',
      weight: 3.5,
      dashArray: '8, 8',
      opacity: 0.85,
    });
    hijrahLine.bindTooltip(
      isBn ? 'ঐতিহাসিক হিজরত পথ (মক্কা থেকে মদিনা)' : 'The Great Hijrah Route (622 CE)',
      { sticky: true }
    );
    routesGroup.addLayer(hijrahLine);

    // 2. Badr March Route (Madinah -> Badr)
    const badrCoords: [number, number][] = [
      [24.4672, 39.6111], // Madinah
      [24.1000, 39.2000],
      [23.7781, 38.7889], // Badr
    ];
    const badrLine = L.polyline(badrCoords, {
      color: '#ef4444',
      weight: 3,
      dashArray: '5, 6',
      opacity: 0.8,
    });
    badrLine.bindTooltip(
      isBn ? 'বদরের সমরযাত্রা পথ' : 'Battle of Badr Expedition Route (2 AH)',
      { sticky: true }
    );
    routesGroup.addLayer(badrLine);

    // 3. Khaybar Expedition Route (Madinah -> Khaybar)
    const khaybarCoords: [number, number][] = [
      [24.4672, 39.6111],
      [25.1000, 39.4000],
      [25.7003, 39.2975],
    ];
    const khaybarLine = L.polyline(khaybarCoords, {
      color: '#f59e0b',
      weight: 3,
      dashArray: '6, 6',
      opacity: 0.8,
    });
    khaybarLine.bindTooltip(
      isBn ? 'খায়বার অভিযান পথ' : 'Khaybar Expedition Route (7 AH)',
      { sticky: true }
    );
    routesGroup.addLayer(khaybarLine);

    // 4. Tabuk Expedition (Madinah -> Tabuk)
    const tabukCoords: [number, number][] = [
      [24.4672, 39.6111],
      [26.5000, 38.0000],
      [28.3835, 36.5550],
    ];
    const tabukLine = L.polyline(tabukCoords, {
      color: '#06b6d4',
      weight: 3,
      dashArray: '6, 8',
      opacity: 0.8,
    });
    tabukLine.bindTooltip(
      isBn ? 'তাবুক চরম অভিযানের পথ (জাইশুল উসরাহ)' : 'Tabuk Expedition Route (9 AH)',
      { sticky: true }
    );
    routesGroup.addLayer(tabukLine);
  }, [showRoutes, isBn]);

  // Update Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersGroup = markersLayerRef.current;
    if (!map || !markersGroup) return;

    markersGroup.clearLayers();

    Object.values(SEERAT_LOCATIONS).forEach((loc) => {
      const isSelected = loc.id === activeLocationId;
      const locTitle = isAr ? loc.nameAr : isBn ? loc.nameBn : loc.nameEn;

      // Color coding by category
      let pinColor = '#10b981'; // green for sanctuary
      let pinIcon = '🕌';
      if (loc.category === 'battle') {
        pinColor = '#ef4444'; // red
        pinIcon = '⚔️';
      } else if (loc.category === 'cave') {
        pinColor = '#f59e0b'; // amber
        pinIcon = '⛰️';
      } else if (loc.category === 'journey') {
        pinColor = '#06b6d4'; // cyan
        pinIcon = '🐪';
      } else if (loc.category === 'farewell') {
        pinColor = '#8b5cf6'; // purple
        pinIcon = '🕊️';
      } else if (loc.category === 'birth') {
        pinColor = '#10b981';
        pinIcon = '✨';
      }

      const iconHtml = `
        <div style="
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: ${isSelected ? '44px' : '34px'};
          height: ${isSelected ? '44px' : '34px'};
          background: ${isSelected ? '#ffffff' : pinColor};
          color: ${isSelected ? pinColor : '#ffffff'};
          border: 3px solid ${isSelected ? pinColor : '#ffffff'};
          border-radius: 50%;
          box-shadow: 0 4px 14px rgba(0,0,0,0.35);
          font-size: ${isSelected ? '18px' : '14px'};
          font-weight: bold;
          cursor: pointer;
          transition: transform 0.2s ease;
          transform: ${isSelected ? 'scale(1.15)' : 'scale(1)'};
        ">
          ${pinIcon}
          ${
            isSelected
              ? `<div style="position: absolute; bottom: -8px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 8px solid ${pinColor};"></div>`
              : ''
          }
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-seerat-pin',
        html: iconHtml,
        iconSize: [isSelected ? 44 : 34, isSelected ? 44 : 34],
        iconAnchor: [isSelected ? 22 : 17, isSelected ? 44 : 34],
      });

      const marker = L.marker([loc.lat, loc.lng], { icon: customIcon });

      marker.on('click', () => {
        if (soundEnabled) soundHaptics.playTap();
        setActiveLocationId(loc.id);
        map.flyTo([loc.lat, loc.lng], Math.max(loc.zoom, 13), { duration: 1.2 });
      });

      marker.bindTooltip(`<b>${locTitle}</b><br/><span style="font-size: 11px; opacity: 0.85;">${loc.modernCityBn}</span>`, {
        direction: 'top',
        offset: [0, -32],
      });

      markersGroup.addLayer(marker);
    });
  }, [activeLocationId, isBn, isAr, soundEnabled]);

  // Center on active location
  const handleFlyTo = (loc: SeeratLocation) => {
    setActiveLocationId(loc.id);
    if (soundEnabled) soundHaptics.playTap();
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([loc.lat, loc.lng], Math.max(loc.zoom, 13), { duration: 1.2 });
    }
  };

  // Associated chapters for active location
  const associatedChapters = SEERAT_DATABASE.filter((item) =>
    activeLoc.associatedAges.includes(item.age)
  );

  return (
    <div
      className={`w-full rounded-3xl border overflow-hidden shadow-xl flex flex-col ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'relative h-[780px]'
      } ${
        isDay
          ? 'bg-white border-slate-200 text-slate-900'
          : 'bg-[#061b17] border-emerald-800/50 text-white'
      }`}
    >
      {/* Top Map Control Bar */}
      <div
        className={`px-4 py-3 border-b flex flex-wrap items-center justify-between gap-2 z-10 transition-colors ${
          isDay
            ? 'bg-slate-50/95 border-slate-200 text-slate-900'
            : 'bg-[#092620]/95 border-emerald-800/50 text-emerald-100'
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-extrabold flex items-center gap-1.5">
              <span>{isBn ? 'সিরাত ঐতিহাসিক মানচিত্র' : 'Seerat Historical Map'}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
                {Object.keys(SEERAT_LOCATIONS).length}টি স্থান
              </span>
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-emerald-300/70 font-medium">
              {isBn
                ? 'নবীজির (সা.) জীবনের ৬৩ বছরের ঐতিহাসিক পবিত্র স্থান ও যাত্রাপথ'
                : 'Sacred geographical spots & expedition routes across 63 years'}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          {/* Map Layer Switcher */}
          <div className="flex items-center bg-slate-200/80 dark:bg-emerald-950/80 p-0.5 rounded-xl border border-slate-300 dark:border-emerald-700/50 text-xs font-bold">
            <button
              onClick={() => setMapStyle('terrain')}
              className={`px-2.5 py-1 rounded-lg transition ${
                mapStyle === 'terrain'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-700 dark:text-emerald-200 hover:text-black dark:hover:text-white'
              }`}
            >
              {isBn ? 'ভূপ্রকৃতি' : 'Terrain'}
            </button>
            <button
              onClick={() => setMapStyle('satellite')}
              className={`px-2.5 py-1 rounded-lg transition ${
                mapStyle === 'satellite'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-700 dark:text-emerald-200 hover:text-black dark:hover:text-white'
              }`}
            >
              {isBn ? 'স্যাটেলাইট' : 'Satellite'}
            </button>
            <button
              onClick={() => setMapStyle('osm')}
              className={`px-2.5 py-1 rounded-lg transition ${
                mapStyle === 'osm'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-700 dark:text-emerald-200 hover:text-black dark:hover:text-white'
              }`}
            >
              {isBn ? 'রাস্তা' : 'Road'}
            </button>
          </div>

          {/* Toggle Routes Button */}
          <button
            onClick={() => setShowRoutes((prev) => !prev)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1 cursor-pointer ${
              showRoutes
                ? 'bg-emerald-600 text-white border-emerald-500'
                : isDay
                ? 'bg-white border-slate-300 text-slate-700'
                : 'bg-[#061b17] border-emerald-800 text-emerald-200'
            }`}
            title="Toggle Historical Routes"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isBn ? 'রুটলাইন' : 'Routes'}</span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen((prev) => !prev)}
            className={`p-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
              isDay
                ? 'bg-white border-slate-300 hover:bg-slate-100 text-slate-700'
                : 'bg-[#061b17] border-emerald-800 hover:bg-[#0a2f26] text-emerald-200'
            }`}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {isModal && onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 transition cursor-pointer"
              title="Close Map"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Map Body: Sidebar (Left / Drawer) + Leaflet View (Right) */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0 relative">
        {/* Left Interactive Location Drawer / Inspector */}
        <div
          className={`w-full md:w-80 lg:w-96 flex flex-col border-b md:border-b-0 md:border-r z-10 overflow-hidden shrink-0 transition-colors ${
            isDay
              ? 'bg-white/95 border-slate-200 text-slate-900'
              : 'bg-[#071d18]/95 border-emerald-800/50 text-white'
          }`}
        >
          {/* Search & Filter */}
          <div className="p-3 border-b border-slate-200 dark:border-emerald-800/40 space-y-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isBn ? 'স্থান খুঁজুন...' : 'Search location...'}
                className={`w-full pl-8 pr-7 py-1.5 rounded-xl text-xs border outline-none ${
                  isDay
                    ? 'bg-slate-50 border-slate-300 text-slate-800 focus:border-emerald-500'
                    : 'bg-[#051412] border-emerald-800/60 text-white focus:border-emerald-500'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none pb-0.5 text-[11px] font-bold">
              {(
                [
                  { key: 'all', bn: 'সকল', en: 'All' },
                  { key: 'sanctuary', bn: 'পবিত্র নগরী', en: 'Sanctuaries' },
                  { key: 'battle', bn: 'রণক্ষেত্র', en: 'Battles' },
                  { key: 'cave', bn: 'গুহা ও পাহাড়', en: 'Caves' },
                  { key: 'journey', bn: 'সফর ও হিজরত', en: 'Journeys' },
                ] as const
              ).map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => {
                    if (soundEnabled) soundHaptics.playTap();
                    setCategoryFilter(cat.key as any);
                  }}
                  className={`px-2.5 py-1 rounded-lg whitespace-nowrap transition cursor-pointer border ${
                    categoryFilter === cat.key
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-xs'
                      : isDay
                      ? 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                      : 'bg-[#0c2e26] border-emerald-800/60 text-emerald-200 hover:bg-[#103a30]'
                  }`}
                >
                  {isBn ? cat.bn : cat.en}
                </button>
              ))}
            </div>
          </div>

          {/* Active Location Card Spotlight */}
          <div className="flex-1 overflow-y-auto scrollbar-thin p-3 space-y-3">
            <div
              className={`rounded-2xl p-4 border space-y-3 ${
                isDay
                  ? 'bg-emerald-50/70 border-emerald-200/80 text-emerald-950'
                  : 'bg-[#0b2822] border-emerald-700/60 text-emerald-50 shadow-md'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                    {activeLoc.category === 'battle'
                      ? isBn ? 'ঐতিহাসিক রণক্ষেত্র' : 'Battlefield'
                      : activeLoc.category === 'cave'
                      ? isBn ? 'পবিত্র গুহা ও পর্বত' : 'Cave & Mountain'
                      : activeLoc.category === 'farewell'
                      ? isBn ? 'বিদায় হজ প্রান্তর' : 'Farewell Plain'
                      : isBn ? 'পবিত্র পুণ্যভূমি' : 'Sacred Place'}
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight">
                    {isBn ? activeLoc.nameBn : activeLoc.nameEn}
                  </h3>
                  {activeLoc.nameAr && (
                    <p className="font-arabic text-sm text-emerald-600 dark:text-emerald-400 font-bold" dir="rtl">
                      {activeLoc.nameAr}
                    </p>
                  )}
                </div>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${activeLoc.lat},${activeLoc.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-emerald-700 dark:text-emerald-200 transition shrink-0"
                  title="Open in Google Maps"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Geographic Metrics */}
              <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold pt-1 border-t border-emerald-200/60 dark:border-emerald-700/40">
                <div className="space-y-0.5">
                  <span className="text-slate-500 dark:text-emerald-300/70 text-[10px]">
                    {isBn ? 'কাবা থেকে দূরত্ব' : 'Dist. from Kaaba'}:
                  </span>
                  <p className="font-mono font-bold text-slate-800 dark:text-white">
                    {activeLoc.distanceFromKaabaKm} km
                  </p>
                </div>

                <div className="space-y-0.5">
                  <span className="text-slate-500 dark:text-emerald-300/70 text-[10px]">
                    {isBn ? 'মদিনা থেকে দূরত্ব' : 'Dist. from Madinah'}:
                  </span>
                  <p className="font-mono font-bold text-slate-800 dark:text-white">
                    {activeLoc.distanceFromMadinahKm} km
                  </p>
                </div>

                <div className="space-y-0.5">
                  <span className="text-slate-500 dark:text-emerald-300/70 text-[10px]">
                    {isBn ? 'উচ্চতা' : 'Elevation'}:
                  </span>
                  <p className="font-mono font-bold text-slate-800 dark:text-white">
                    {activeLoc.elevationMeters} m
                  </p>
                </div>

                <div className="space-y-0.5">
                  <span className="text-slate-500 dark:text-emerald-300/70 text-[10px]">
                    {isBn ? 'বর্তমান অবস্থান' : 'Modern Region'}:
                  </span>
                  <p className="text-slate-800 dark:text-white truncate">
                    {activeLoc.modernCityBn}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs leading-relaxed text-slate-700 dark:text-emerald-100/90 pt-1 border-t border-emerald-200/60 dark:border-emerald-700/40">
                {isBn ? activeLoc.descriptionBn : activeLoc.descriptionEn}
              </p>

              {/* Significance */}
              <div className="p-2.5 rounded-xl bg-white/40 dark:bg-black/20 text-xs space-y-1">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block text-[11px]">
                  📌 {isBn ? 'ঐতিহাসিক তাৎপর্য:' : 'Historical Significance:'}
                </span>
                <p className="leading-relaxed opacity-90 text-[11px]">
                  {isBn ? activeLoc.historicalSignificanceBn : activeLoc.historicalSignificanceEn}
                </p>
              </div>
            </div>

            {/* Associated Chapters from the 63 Years */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-emerald-200">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{isBn ? 'এই স্থানের ঘটনা ও অধ্যায়সমূহ' : 'Events at this Location'}</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  {associatedChapters.length}টি অধ্যায়
                </span>
              </div>

              <div className="space-y-1.5">
                {associatedChapters.map((ch) => {
                  const chTitle = isAr && ch.titleAr ? ch.titleAr : isBn ? ch.titleBn : ch.titleEn;

                  return (
                    <button
                      key={ch.age}
                      onClick={() => {
                        if (soundEnabled) soundHaptics.playTap();
                        if (onSelectAgeChapter) onSelectAgeChapter(ch.age);
                      }}
                      className={`w-full text-left p-2.5 rounded-xl border text-xs transition flex items-center justify-between gap-2 cursor-pointer active:scale-95 ${
                        isDay
                          ? 'bg-slate-50 hover:bg-emerald-50 border-slate-200 text-slate-800 hover:border-emerald-300'
                          : 'bg-[#09221d] hover:bg-[#0d342c] border-emerald-800/40 text-emerald-100 hover:border-emerald-600'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-mono font-bold text-[10px] flex items-center justify-center shrink-0">
                          {ch.age}
                        </span>
                        <div className="truncate">
                          <p className="font-bold truncate leading-tight">{chTitle}</p>
                          <span className="text-[10px] opacity-60">
                            {ch.yearCE} CE ({ch.yearHijri})
                          </span>
                        </div>
                      </div>

                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
                        {isBn ? 'পড়ুন →' : 'Read →'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick List of Other Locations */}
            <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-emerald-800/40">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-emerald-300/70 block">
                {isBn ? 'অন্যান্য পবিত্র স্থান নির্বাচন করুন' : 'Select Another Location'}
              </span>

              <div className="space-y-1 max-h-48 overflow-y-auto scrollbar-thin">
                {filteredLocations.map((loc) => {
                  const isCur = loc.id === activeLocationId;
                  const title = isAr ? loc.nameAr : isBn ? loc.nameBn : loc.nameEn;

                  return (
                    <button
                      key={loc.id}
                      onClick={() => handleFlyTo(loc)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs transition flex items-center justify-between cursor-pointer ${
                        isCur
                          ? 'bg-emerald-600 text-white font-bold shadow-xs'
                          : isDay
                          ? 'hover:bg-slate-100 text-slate-700'
                          : 'hover:bg-[#0a2923] text-emerald-200'
                      }`}
                    >
                      <span className="truncate">{title}</span>
                      <span className="text-[10px] opacity-75 shrink-0 ml-1">
                        {loc.distanceFromKaabaKm} km
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Leaflet Map Canvas */}
        <div className="flex-1 relative h-[380px] md:h-auto w-full">
          <div ref={mapContainerRef} className="w-full h-full z-0" />

          {/* Floating Map Zoom & Recenter Controls */}
          <div className="absolute right-3 top-3 z-20 flex flex-col gap-1.5 shadow-md">
            <button
              onClick={() => {
                if (soundEnabled) soundHaptics.playTap();
                mapInstanceRef.current?.zoomIn();
              }}
              className="w-8 h-8 rounded-xl bg-white/95 dark:bg-[#071d18]/95 text-slate-800 dark:text-white border border-slate-300 dark:border-emerald-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-[#0b2b24] transition cursor-pointer shadow-sm"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                if (soundEnabled) soundHaptics.playTap();
                mapInstanceRef.current?.zoomOut();
              }}
              className="w-8 h-8 rounded-xl bg-white/95 dark:bg-[#071d18]/95 text-slate-800 dark:text-white border border-slate-300 dark:border-emerald-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-[#0b2b24] transition cursor-pointer shadow-sm"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                if (soundEnabled) soundHaptics.playTap();
                mapInstanceRef.current?.flyTo([24.0, 39.0], 6.5, { duration: 1.2 });
              }}
              className="w-8 h-8 rounded-xl bg-white/95 dark:bg-[#071d18]/95 text-slate-800 dark:text-white border border-slate-300 dark:border-emerald-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-[#0b2b24] transition cursor-pointer shadow-sm"
              title="Reset Overview (Arabian Peninsula)"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Legend Overlay at bottom left of map */}
          <div className="absolute left-3 bottom-3 z-20 bg-white/95 dark:bg-[#071d18]/95 backdrop-blur-sm px-3 py-2 rounded-xl border border-slate-300 dark:border-emerald-800/60 text-[11px] shadow-md space-y-1">
            <div className="font-extrabold text-slate-700 dark:text-emerald-200">
              {isBn ? 'নির্দেশিকা (চিহ্নসমূহ):' : 'Map Legend:'}
            </div>
            <div className="flex flex-wrap items-center gap-2 text-[10px]">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                <span>{isBn ? 'পবিত্র স্থান' : 'Sanctuary'}</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
                <span>{isBn ? 'রণক্ষেত্র' : 'Battle'}</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                <span>{isBn ? 'গুহা ও পাহাড়' : 'Cave'}</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block" />
                <span>{isBn ? 'সফর ও কাফেলা' : 'Route'}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeeratHistoricMapView;

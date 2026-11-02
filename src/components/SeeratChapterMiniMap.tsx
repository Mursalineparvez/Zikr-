/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ThemeMode, ZikrLanguage } from '../types';
import { MapPin, Compass, ExternalLink, Maximize2 } from 'lucide-react';
import { SeeratLocation } from '../data/seeratLocations';

interface SeeratChapterMiniMapProps {
  location: SeeratLocation;
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
  onOpenFullMap?: (locationId: string) => void;
}

export const SeeratChapterMiniMap: React.FC<SeeratChapterMiniMapProps> = ({
  location,
  themeMode = 'night',
  selectedLanguage = 'bn',
  onOpenFullMap,
}) => {
  const isDay = themeMode === 'day';
  const isBn = selectedLanguage === 'bn';
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [location.lat, location.lng],
        zoom: Math.min(location.zoom, 14),
        zoomControl: false,
        attributionControl: false,
        dragging: true,
        scrollWheelZoom: false,
      });

      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        { maxZoom: 18 }
      ).addTo(map);

      // Marker pin
      const iconHtml = `
        <div style="
          width: 32px;
          height: 32px;
          background: #10b981;
          border: 3px solid #ffffff;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 14px;
        ">
          📍
        </div>
      `;

      const pinIcon = L.divIcon({
        className: 'mini-map-pin',
        html: iconHtml,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      });

      L.marker([location.lat, location.lng], { icon: pinIcon }).addTo(map);

      mapRef.current = map;
    } else {
      mapRef.current.setView([location.lat, location.lng], Math.min(location.zoom, 14));
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [location.id]);

  return (
    <div
      className={`rounded-2xl border overflow-hidden shadow-sm transition-all ${
        isDay
          ? 'bg-slate-50 border-slate-200 text-slate-800'
          : 'bg-[#08221d] border-emerald-800/40 text-emerald-50'
      }`}
    >
      {/* Header Bar */}
      <div className="px-4 py-2.5 flex items-center justify-between border-b border-slate-200 dark:border-emerald-800/40 text-xs">
        <div className="flex items-center gap-1.5 font-bold">
          <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>{isBn ? 'ঘটনার ঐতিহাসিক স্থান ও মানচিত্র' : 'Historical Geography & Map'}</span>
        </div>

        <div className="flex items-center gap-1.5">
          {onOpenFullMap && (
            <button
              onClick={() => onOpenFullMap(location.id)}
              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1 transition cursor-pointer text-[11px]"
            >
              <Compass className="w-3 h-3" />
              <span>{isBn ? 'বড় মানচিত্রে দেখুন' : 'Explore on Map'}</span>
            </button>
          )}

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-slate-700 dark:text-emerald-200 transition"
            title="Open in Google Maps"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Mini Leaflet Map Container */}
      <div className="relative h-44 w-full">
        <div ref={mapContainerRef} className="w-full h-full" />

        {/* Floating Location Badge */}
        <div className="absolute left-3 bottom-3 z-10 bg-white/95 dark:bg-[#071d18]/95 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-slate-200 dark:border-emerald-800/60 shadow-md text-xs">
          <p className="font-extrabold text-slate-900 dark:text-white leading-tight">
            {isBn ? location.nameBn : location.nameEn}
          </p>
          <p className="text-[10px] text-slate-500 dark:text-emerald-300/80">
            {location.modernCityBn}
          </p>
        </div>
      </div>

      {/* Location Details Footer */}
      <div className="p-3 text-xs grid grid-cols-2 sm:grid-cols-3 gap-2 bg-white/50 dark:bg-black/10">
        <div>
          <span className="text-[10px] opacity-70 block">{isBn ? 'কাবা থেকে দূরত্ব' : 'From Kaaba'}</span>
          <span className="font-mono font-bold">{location.distanceFromKaabaKm} km</span>
        </div>
        <div>
          <span className="text-[10px] opacity-70 block">{isBn ? 'মদিনা থেকে দূরত্ব' : 'From Madinah'}</span>
          <span className="font-mono font-bold">{location.distanceFromMadinahKm} km</span>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <span className="text-[10px] opacity-70 block">{isBn ? 'সমুদ্রপৃষ্ঠ থেকে উচ্চতা' : 'Elevation'}</span>
          <span className="font-mono font-bold">{location.elevationMeters} meters</span>
        </div>
      </div>
    </div>
  );
};

export default SeeratChapterMiniMap;

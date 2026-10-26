import React, { useState } from 'react';
import {
  User,
  Heart,
  Droplet,
  Activity,
  Plus,
  Minus,
  FileText,
  Shield,
  Settings,
  Sparkles,
  Smartphone,
  PhoneCall,
  Check,
  Moon,
  Sun,
} from 'lucide-react';
import { HealthVital } from '../../types/careplus';

interface CarePlusProfileProps {
  onToggleTasbeehMode?: () => void;
  isTasbeehMode?: boolean;
}

export const CarePlusProfile: React.FC<CarePlusProfileProps> = ({
  onToggleTasbeehMode,
  isTasbeehMode,
}) => {
  // Health vitals state
  const [vitals, setVitals] = useState<HealthVital>(() => {
    try {
      const saved = localStorage.getItem('careplus_vitals');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      heartRate: 72,
      bloodPressure: '120/80',
      waterIntake: 1500, // ml
      weight: 68,
      steps: 6420,
    };
  });

  const updateWater = (delta: number) => {
    setVitals((prev) => {
      const next = { ...prev, waterIntake: Math.max(0, prev.waterIntake + delta) };
      localStorage.setItem('careplus_vitals', JSON.stringify(next));
      return next;
    });
  };

  return (
    <div className="pb-28 pt-2 px-4 max-w-md mx-auto space-y-5">
      {/* Profile Header Card */}
      <div className="bg-white rounded-[28px] border border-slate-100 p-5 shadow-sm flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-teal-50 border-2 border-[#007e8a]/20 flex items-center justify-center text-[#007e8a] shrink-0 font-bold text-xl shadow-inner">
          AM
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 truncate">Ahmed Mohamed</h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-[#007e8a] border border-teal-200">
              Verified
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">+1 (555) 234-5678</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
              Blood: O+
            </span>
            <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
              Age: 29
            </span>
          </div>
        </div>
      </div>

      {/* Daily Health Vitals */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Daily Health Vitals
          </h4>
          <span className="text-xs font-semibold text-[#007e8a]">Updated Today</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Heart Rate */}
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5 fill-rose-500" />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-medium">Heart Rate</p>
              <p className="text-base font-bold text-slate-900">
                {vitals.heartRate} <span className="text-xs font-normal text-slate-500">bpm</span>
              </p>
            </div>
          </div>

          {/* Blood Pressure */}
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#007e8a] flex items-center justify-center shrink-0">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-medium">Blood Pressure</p>
              <p className="text-base font-bold text-slate-900">{vitals.bloodPressure}</p>
            </div>
          </div>
        </div>

        {/* Water Intake Tracker */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
              <Droplet className="w-5 h-5 fill-blue-500" />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-medium">Water Hydration</p>
              <p className="text-sm font-bold text-slate-900">
                {vitals.waterIntake} / 2500 <span className="text-xs font-normal text-slate-500">ml</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-xl">
            <button
              onClick={() => updateWater(-250)}
              className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-slate-100 active:scale-90 transition"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => updateWater(250)}
              className="w-7 h-7 rounded-lg bg-[#007e8a] text-white flex items-center justify-center hover:bg-[#006872] active:scale-90 transition"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Emergency & Hospital Network */}
      <div className="bg-teal-50/70 border border-teal-100 rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center">
            <PhoneCall className="w-4 h-4" />
          </div>
          <div>
            <h5 className="text-xs font-bold text-slate-900">24/7 Medical Hotline</h5>
            <p className="text-[11px] text-slate-600">Immediate emergency assistance</p>
          </div>
        </div>
        <a
          href="tel:911"
          className="px-3 py-1.5 rounded-xl bg-[#007e8a] text-white text-xs font-bold hover:bg-[#006872] transition"
        >
          Call Now
        </a>
      </div>

      {/* App Companions & Dual Mode */}
      <div className="bg-white rounded-2xl border border-slate-100 p-4 space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Preferences & Features
        </span>

        {onToggleTasbeehMode && (
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-[#007e8a]" />
              <div>
                <p className="text-xs font-bold text-slate-800">Islamic Tasbeeh & Hub</p>
                <p className="text-[10px] text-slate-400">Digital counter & spiritual companion</p>
              </div>
            </div>
            <button
              onClick={onToggleTasbeehMode}
              className="px-3 py-1.5 rounded-xl bg-teal-50 text-[#007e8a] text-xs font-bold border border-teal-200 hover:bg-teal-100 transition"
            >
              Switch Mode
            </button>
          </div>
        )}

        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-2.5">
            <Smartphone className="w-4 h-4 text-[#007e8a]" />
            <div>
              <p className="text-xs font-bold text-slate-800">Offline PWA Cache</p>
              <p className="text-[10px] text-slate-400">Full offline capability enabled</p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
            <Check className="w-3 h-3" /> Active
          </span>
        </div>
      </div>
    </div>
  );
};

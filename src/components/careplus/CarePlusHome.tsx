import React, { useState } from 'react';
import {
  Search,
  SlidersHorizontal,
  Stethoscope,
  Smile,
  Baby,
  HeartPulse,
  Brain,
  ShieldCheck,
  Star,
  Activity,
  ChevronRight,
  Heart,
  Sparkles,
  MapPin,
  Calendar,
  Clock,
} from 'lucide-react';
import { Doctor, CategoryItem } from '../../types/careplus';
import { CAREPLUS_CATEGORIES } from '../../data/careplusData';

interface CarePlusHomeProps {
  doctors: Doctor[];
  selectedCategory: string;
  onSelectCategory: (catId: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenFilter: () => void;
  onBookDoctor: (doc: Doctor) => void;
  onViewAllDoctors: () => void;
  onOpenTrustModal: () => void;
}

export const CarePlusHome: React.FC<CarePlusHomeProps> = ({
  doctors,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onOpenFilter,
  onBookDoctor,
  onViewAllDoctors,
  onOpenTrustModal,
}) => {
  // Filter doctors based on selectedCategory and searchQuery
  const filteredDoctors = doctors.filter((doc) => {
    const matchesCategory =
      selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesQuery =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.hospital.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const getCategoryIcon = (iconName: CategoryItem['iconName'], isActive: boolean) => {
    const className = `w-6 h-6 ${isActive ? 'text-white' : 'text-[#007e8a]'}`;
    switch (iconName) {
      case 'stethoscope':
        return <Stethoscope className={className} />;
      case 'tooth':
        // Custom clean tooth SVG icon
        return (
          <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 3C4.2 3 2 5.2 2 8c0 3.2 1.4 5.2 2.2 7.7.9 2.7 1.8 5.3 3.8 5.3 1.8 0 2.2-2.1 2.8-4.2.3-1 .6-1.8 1.2-1.8s.9.8 1.2 1.8c.6 2.1 1 4.2 2.8 4.2 2 0 2.9-2.6 3.8-5.3.8-2.5 2.2-4.5 2.2-7.7 0-2.8-2.2-5-5-5-2.2 0-3.3 1.2-5 1.2S9.2 3 7 3z" />
          </svg>
        );
      case 'smile':
        return <Smile className={className} />;
      case 'baby':
        return <Baby className={className} />;
      case 'heart':
        return <HeartPulse className={className} />;
      case 'brain':
        return <Brain className={className} />;
      default:
        return <Activity className={className} />;
    }
  };

  return (
    <div className="pb-28 pt-2 px-4 max-w-md mx-auto space-y-6">
      {/* 1. HERO BANNER CARD (Faithful to image_0ce0dafe.png) */}
      <section className="relative rounded-[28px] bg-gradient-to-br from-[#e7f6f5] via-[#e2f3f1] to-[#d6eeeb] p-5 pt-6 overflow-hidden shadow-sm border border-teal-100/60">
        {/* Subtle background decorative shapes matching screenshot */}
        <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-teal-200/40 blur-2xl pointer-events-none" />
        <div className="absolute right-4 top-4 w-36 h-36 rounded-full bg-white/40 pointer-events-none" />

        <div className="relative z-10 flex items-start justify-between">
          <div className="max-w-[62%] pr-2">
            <h2 className="text-[21px] font-extrabold text-[#11383b] leading-[1.2] tracking-tight">
              Book Your Doctor Appointment
            </h2>
            <p className="text-[11px] font-medium text-[#497678] mt-2 leading-relaxed">
              Find the right doctor, at the right time, for a healthier tomorrow.
            </p>
          </div>

          {/* Friendly Doctor illustration/avatar in soft aura with heart badge */}
          <div className="relative shrink-0">
            <div className="w-24 h-28 rounded-2xl bg-white/70 backdrop-blur-sm p-1 shadow-sm overflow-hidden flex items-end justify-center border border-white">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80"
                alt="Doctor"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            {/* Tiny floating outline heart badge matching screenshot */}
            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white/90 shadow-sm flex items-center justify-center text-[#007e8a] border border-teal-100">
              <Heart className="w-3.5 h-3.5 fill-[#007e8a]/20 text-[#007e8a]" />
            </div>
          </div>
        </div>

        {/* Integrated Search Bar inside Hero Banner */}
        <div className="relative mt-5">
          <div className="flex items-center bg-white rounded-full p-1.5 pl-4 shadow-sm border border-teal-100/80 focus-within:ring-2 focus-within:ring-[#007e8a]/30 transition">
            <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search for doctor, specialty, or clinic..."
              className="w-full bg-transparent text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none pr-2 font-normal"
            />
            <button
              onClick={onOpenFilter}
              aria-label="Open search filters"
              className="w-9 h-9 rounded-full bg-[#007e8a] text-white flex items-center justify-center shrink-0 hover:bg-[#006974] transition active:scale-95 shadow-sm"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES ROW (Matching screenshot: General Medicine, Dentist, Dermatology, Pediatrics, Cardiology) */}
      <section>
        <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
          {CAREPLUS_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(isActive ? 'all' : cat.id)}
                className="flex flex-col items-center gap-2 group shrink-0 min-w-[70px] transition active:scale-95"
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                    isActive
                      ? 'bg-[#007e8a] text-white shadow-md shadow-teal-700/20 scale-105'
                      : 'bg-white border border-slate-100 text-[#007e8a] hover:border-teal-200 shadow-sm'
                  }`}
                >
                  {getCategoryIcon(cat.iconName, isActive)}
                </div>
                <span
                  className={`text-[11px] text-center font-medium leading-tight max-w-[72px] line-clamp-1 ${
                    isActive ? 'font-bold text-slate-900' : 'text-slate-600'
                  }`}
                >
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. FEATURED DOCTORS SECTION */}
      <section className="space-y-3.5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            Featured Doctors
          </h3>
          <button
            onClick={onViewAllDoctors}
            className="text-xs font-semibold text-[#007e8a] hover:text-[#00606a] transition flex items-center gap-0.5"
          >
            See All
          </button>
        </div>

        {/* Horizontal Carousel of Featured Doctors Cards */}
        {filteredDoctors.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center border border-slate-100 text-slate-500 space-y-2">
            <p className="text-sm font-medium">No doctors found for this filter.</p>
            <button
              onClick={() => {
                onSelectCategory('all');
                onSearchChange('');
              }}
              className="text-xs text-[#007e8a] font-bold hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="flex gap-3.5 overflow-x-auto pb-2 scrollbar-none snap-x">
            {filteredDoctors.map((doc) => (
              <div
                key={doc.id}
                className="w-[185px] shrink-0 bg-white rounded-[26px] border border-slate-100/90 p-4 shadow-sm flex flex-col items-center text-center relative snap-start hover:shadow-md transition group"
              >
                {/* Doctor Avatar with "• Online" status pill */}
                <div className="relative mb-2">
                  <div className="w-20 h-20 rounded-full bg-teal-50/80 p-1 border border-teal-100/60 overflow-hidden shadow-inner">
                    <img
                      src={doc.imageUrl}
                      alt={doc.name}
                      className="w-full h-full object-cover rounded-full group-hover:scale-105 transition duration-300"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80';
                      }}
                    />
                  </div>

                  {/* Online Badge if active */}
                  {doc.isOnline && (
                    <div className="absolute top-0 -right-2 bg-[#e6f9f0] border border-emerald-200/80 text-[#059669] text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                      Online
                    </div>
                  )}
                </div>

                {/* Doctor Information */}
                <h4 className="text-sm font-bold text-slate-900 truncate w-full tracking-tight">
                  {doc.name}
                </h4>
                <p className="text-[11px] text-slate-500 font-normal truncate w-full mt-0.5">
                  {doc.specialty}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-2 text-xs font-semibold text-slate-800">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{doc.rating}</span>
                  <span className="text-[11px] text-slate-400 font-normal">
                    ({doc.reviewCount})
                  </span>
                </div>

                {/* Book Appointment CTA Button */}
                <button
                  onClick={() => onBookDoctor(doc)}
                  className="w-full mt-3 py-2.5 px-2 rounded-xl bg-[#007e8a] hover:bg-[#006872] active:scale-95 text-white font-medium text-xs shadow-sm transition tracking-tight"
                >
                  Book Appointment
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. "TRUSTED BY MILLIONS" BANNER (Matching bottom card in screenshot) */}
      <section
        onClick={onOpenTrustModal}
        className="rounded-2xl bg-gradient-to-r from-[#e7f6f5] to-[#def1ef] p-4 flex items-center justify-between border border-teal-100/70 shadow-sm cursor-pointer hover:shadow transition active:scale-[0.99] group"
      >
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#007e8a] text-white flex items-center justify-center shrink-0 shadow-sm shadow-teal-700/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 leading-tight">
              Trusted by millions
            </h4>
            <p className="text-[11px] text-[#4b7678] mt-0.5 leading-tight">
              Quality care, easy booking, better health.
            </p>
          </div>
        </div>

        {/* ECG pulse waveform graphic + chevron */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="w-9 h-9 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center text-[#007e8a] shadow-xs">
            <HeartPulse className="w-4 h-4 animate-pulse" />
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition" />
        </div>
      </section>

      {/* 5. QUICK HEALTH SERVICES & UPCOMING CARE */}
      <section className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Quick Health Services
          </span>
          <span className="text-xs font-bold text-[#007e8a] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> 24/7 Available
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          <div
            onClick={() => onSelectCategory('general')}
            className="p-3 rounded-2xl bg-slate-50 hover:bg-teal-50/60 border border-slate-100 text-center cursor-pointer transition"
          >
            <div className="w-8 h-8 rounded-xl bg-teal-100/70 text-[#007e8a] flex items-center justify-center mx-auto mb-1.5">
              <Stethoscope className="w-4 h-4" />
            </div>
            <p className="text-[11px] font-bold text-slate-800">Tele-Health</p>
            <p className="text-[9px] text-slate-500">Immediate video</p>
          </div>

          <div
            onClick={() => onSelectCategory('cardiology')}
            className="p-3 rounded-2xl bg-slate-50 hover:bg-teal-50/60 border border-slate-100 text-center cursor-pointer transition"
          >
            <div className="w-8 h-8 rounded-xl bg-rose-100/70 text-rose-600 flex items-center justify-center mx-auto mb-1.5">
              <Activity className="w-4 h-4" />
            </div>
            <p className="text-[11px] font-bold text-slate-800">Vital Check</p>
            <p className="text-[9px] text-slate-500">ECG & Pressure</p>
          </div>

          <div
            onClick={() => onSelectCategory('dentist')}
            className="p-3 rounded-2xl bg-slate-50 hover:bg-teal-50/60 border border-slate-100 text-center cursor-pointer transition"
          >
            <div className="w-8 h-8 rounded-xl bg-cyan-100/70 text-cyan-700 flex items-center justify-center mx-auto mb-1.5">
              <Calendar className="w-4 h-4" />
            </div>
            <p className="text-[11px] font-bold text-slate-800">Home Care</p>
            <p className="text-[9px] text-slate-500">Nurse visit</p>
          </div>
        </div>
      </section>
    </div>
  );
};

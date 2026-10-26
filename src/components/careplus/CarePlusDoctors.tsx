import React, { useState } from 'react';
import { Search, Star, ShieldCheck, MapPin, Calendar, Heart, SlidersHorizontal, Stethoscope } from 'lucide-react';
import { Doctor } from '../../types/careplus';
import { CAREPLUS_CATEGORIES } from '../../data/careplusData';

interface CarePlusDoctorsProps {
  doctors: Doctor[];
  onBookDoctor: (doc: Doctor) => void;
  onOpenFilter: () => void;
}

export const CarePlusDoctors: React.FC<CarePlusDoctorsProps> = ({
  doctors,
  onBookDoctor,
  onOpenFilter,
}) => {
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  const filtered = doctors.filter((doc) => {
    const matchCat = selectedCat === 'all' || doc.category === selectedCat;
    const matchSearch =
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(search.toLowerCase()) ||
      doc.hospital.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="pb-28 pt-2 px-4 max-w-md mx-auto space-y-4">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Find Specialists</h2>
        <p className="text-xs text-slate-500">Board-certified doctors ready to help you</p>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-2">
        <div className="flex-1 flex items-center bg-white rounded-2xl p-1.5 pl-3.5 shadow-sm border border-slate-200 focus-within:border-[#007e8a] transition">
          <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
          <input
            type="text"
            placeholder="Search doctors, specialty, clinic..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
        </div>
        <button
          onClick={onOpenFilter}
          className="w-10 h-10 rounded-2xl bg-white border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-slate-50 hover:text-[#007e8a] transition active:scale-95 shadow-xs"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setSelectedCat('all')}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 transition ${
            selectedCat === 'all'
              ? 'bg-[#007e8a] text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          All
        </button>
        {CAREPLUS_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCat(cat.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 transition ${
              selectedCat === cat.id
                ? 'bg-[#007e8a] text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Doctors List */}
      <div className="space-y-3 pt-1">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center border border-slate-100 text-slate-500">
            <p className="text-sm font-semibold">No doctors found</p>
            <p className="text-xs text-slate-400 mt-1">Try adjusting your search criteria</p>
          </div>
        ) : (
          filtered.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-[24px] border border-slate-100 p-4 shadow-sm hover:shadow-md transition space-y-3"
            >
              <div className="flex items-start gap-3.5">
                <div className="relative shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-100 overflow-hidden">
                    <img
                      src={doc.imageUrl}
                      alt={doc.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80';
                      }}
                    />
                  </div>
                  {doc.isOnline && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900 truncate">{doc.name}</h3>
                    <div className="flex items-center gap-1 text-xs font-bold text-slate-800">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{doc.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#007e8a] font-medium mt-0.5">{doc.specialty}</p>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">{doc.hospital}</p>
                  <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-500">
                    <span>{doc.experienceYears}+ yrs exp</span>
                    <span>•</span>
                    <span>{doc.patientsTreated} patients</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Consultation Fee</span>
                  <span className="text-sm font-bold text-slate-900">${doc.fee}</span>
                </div>
                <button
                  onClick={() => onBookDoctor(doc)}
                  className="px-5 py-2.5 rounded-xl bg-[#007e8a] hover:bg-[#006872] text-white text-xs font-bold shadow-sm transition active:scale-95"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

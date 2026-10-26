import React from 'react';
import { X, Check, Star, RefreshCw } from 'lucide-react';

interface CarePlusFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSpecialty: string;
  onSelectSpecialty: (specialty: string) => void;
  onlyOnline: boolean;
  onToggleOnlyOnline: (val: boolean) => void;
  minRating: number;
  onSelectMinRating: (rating: number) => void;
  consultationType: 'all' | 'video' | 'in_person';
  onSelectConsultationType: (type: 'all' | 'video' | 'in_person') => void;
  onResetFilters: () => void;
}

export const CarePlusFilterModal: React.FC<CarePlusFilterModalProps> = ({
  isOpen,
  onClose,
  selectedSpecialty,
  onSelectSpecialty,
  onlyOnline,
  onToggleOnlyOnline,
  minRating,
  onSelectMinRating,
  consultationType,
  onSelectConsultationType,
  onResetFilters,
}) => {
  if (!isOpen) return null;

  const specialties = [
    { id: 'all', label: 'All Specialties' },
    { id: 'general', label: 'General Medicine' },
    { id: 'dentist', label: 'Dentist' },
    { id: 'dermatology', label: 'Dermatology' },
    { id: 'pediatrics', label: 'Pediatrics' },
    { id: 'cardiology', label: 'Cardiology' },
    { id: 'neurology', label: 'Neurology' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col overflow-hidden animate-slideUp">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Filter Doctors</h3>
            <p className="text-xs text-slate-500">Find the right specialist for your needs</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Content */}
        <div className="p-5 overflow-y-auto space-y-5">
          {/* Online Status Toggle */}
          <div className="flex items-center justify-between p-3.5 bg-teal-50/60 rounded-2xl border border-teal-100">
            <div>
              <p className="text-sm font-semibold text-slate-900">Available Online Now</p>
              <p className="text-xs text-slate-500">Doctors ready for immediate consultation</p>
            </div>
            <button
              onClick={() => onToggleOnlyOnline(!onlyOnline)}
              className={`w-12 h-7 rounded-full p-1 transition-colors ${
                onlyOnline ? 'bg-[#007e8a]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  onlyOnline ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Specialty */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Medical Specialty
            </label>
            <div className="flex flex-wrap gap-2">
              {specialties.map((item) => {
                const isSelected = selectedSpecialty === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectSpecialty(item.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                      isSelected
                        ? 'bg-[#007e8a] text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Minimum Rating */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Minimum Rating
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[0, 4.0, 4.5, 4.8].map((rating) => {
                const isSelected = minRating === rating;
                return (
                  <button
                    key={rating}
                    onClick={() => onSelectMinRating(rating)}
                    className={`py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition ${
                      isSelected
                        ? 'bg-[#007e8a] text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {rating === 0 ? (
                      'Any'
                    ) : (
                      <>
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{rating}+</span>
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Consultation Type */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Consultation Mode
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'all', label: 'All Modes' },
                { id: 'video', label: 'Video Call' },
                { id: 'in_person', label: 'In Clinic' },
              ].map((m) => {
                const isSelected = consultationType === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => onSelectConsultationType(m.id as any)}
                    className={`py-2.5 rounded-xl text-xs font-semibold transition ${
                      isSelected
                        ? 'bg-[#007e8a] text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {m.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center gap-2">
          <button
            onClick={onResetFilters}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-100 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-[#007e8a] text-white font-semibold text-xs hover:bg-[#006872] shadow-sm transition active:scale-98 flex items-center justify-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

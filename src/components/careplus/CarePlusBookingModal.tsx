import React, { useState } from 'react';
import { X, Calendar, Clock, Video, Building2, Star, CheckCircle, Shield, AlertCircle } from 'lucide-react';
import { Doctor, Appointment } from '../../types/careplus';
import confetti from 'canvas-confetti';

interface CarePlusBookingModalProps {
  doctor: Doctor | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmBooking: (appointmentData: Omit<Appointment, 'id' | 'createdAt'>) => void;
}

export const CarePlusBookingModal: React.FC<CarePlusBookingModalProps> = ({
  doctor,
  isOpen,
  onClose,
  onConfirmBooking,
}) => {
  if (!isOpen || !doctor) return null;

  // Generate next 7 dates
  const nextDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const dateString = d.toISOString().split('T')[0];
    const dayName = i === 0 ? 'Today' : i === 1 ? 'Tmrw' : d.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNumber = d.getDate();
    const month = d.toLocaleDateString('en-US', { month: 'short' });
    return { dateString, dayName, dayNumber, month };
  });

  const [selectedDate, setSelectedDate] = useState<string>(nextDates[0].dateString);
  const [selectedSlot, setSelectedSlot] = useState<string>(
    doctor.slots.morning[0] || doctor.slots.afternoon[0] || '10:00 AM'
  );
  const [consultationType, setConsultationType] = useState<'video' | 'in_person'>('video');
  const [patientName, setPatientName] = useState<string>('Ahmed Mohamed');
  const [patientPhone, setPatientPhone] = useState<string>('+1 (555) 234-5678');
  const [notes, setNotes] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim()) return;

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#007e8a', '#14b8a6', '#06b6d4', '#10b981'],
      });
    } catch {}

    const feeAmount = consultationType === 'video' ? doctor.fee : doctor.fee + 15;

    onConfirmBooking({
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      doctorImage: doctor.imageUrl,
      fallbackColor: doctor.fallbackColor,
      hospital: doctor.hospital,
      date: selectedDate,
      timeSlot: selectedSlot,
      type: consultationType,
      status: 'upcoming',
      patientName: patientName.trim(),
      patientPhone: patientPhone.trim(),
      notes: notes.trim(),
      fee: feeAmount,
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-100 max-h-[92vh] flex flex-col overflow-hidden animate-slideUp">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-teal-50 border border-teal-100 overflow-hidden shrink-0">
              <img
                src={doctor.imageUrl}
                alt={doctor.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80';
                }}
              />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">{doctor.name}</h3>
              <p className="text-xs text-[#007e8a] font-medium">{doctor.specialty}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center flex flex-col items-center justify-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-teal-50 text-[#007e8a] flex items-center justify-center animate-bounce">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-slate-900">Appointment Confirmed!</h4>
            <p className="text-sm text-slate-600 max-w-xs">
              Your appointment with {doctor.name} has been booked for {selectedDate} at {selectedSlot}.
            </p>
            <div className="text-xs font-semibold text-teal-700 bg-teal-50 px-3 py-1.5 rounded-full">
              Added to your Appointments schedule
            </div>
          </div>
        ) : (
          <form onSubmit={handleBooking} className="p-5 overflow-y-auto space-y-5">
            {/* Consultation Mode */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Consultation Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setConsultationType('video')}
                  className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition ${
                    consultationType === 'video'
                      ? 'border-[#007e8a] bg-teal-50/60 ring-2 ring-[#007e8a]/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      consultationType === 'video'
                        ? 'bg-[#007e8a] text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <Video className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Video Call</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Online consultation</p>
                    <p className="text-xs font-bold text-[#007e8a] mt-1">${doctor.fee}</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setConsultationType('in_person')}
                  className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition ${
                    consultationType === 'in_person'
                      ? 'border-[#007e8a] bg-teal-50/60 ring-2 ring-[#007e8a]/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      consultationType === 'in_person'
                        ? 'bg-[#007e8a] text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">In-Clinic Visit</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Hospital checkup</p>
                    <p className="text-xs font-bold text-[#007e8a] mt-1">${doctor.fee + 15}</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Select Date */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Select Date
                </label>
                <span className="text-xs text-[#007e8a] font-semibold flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  Next 7 Days
                </span>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                {nextDates.map((item) => {
                  const isSelected = selectedDate === item.dateString;
                  return (
                    <button
                      key={item.dateString}
                      type="button"
                      onClick={() => setSelectedDate(item.dateString)}
                      className={`min-w-[62px] py-3 px-2 rounded-2xl border text-center transition flex flex-col items-center shrink-0 ${
                        isSelected
                          ? 'bg-[#007e8a] text-white border-[#007e8a] shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-teal-200'
                      }`}
                    >
                      <span className={`text-[10px] uppercase font-semibold ${isSelected ? 'text-teal-100' : 'text-slate-400'}`}>
                        {item.dayName}
                      </span>
                      <span className="text-base font-bold my-0.5">{item.dayNumber}</span>
                      <span className={`text-[10px] ${isSelected ? 'text-teal-100' : 'text-slate-500'}`}>
                        {item.month}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Select Time Slot */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Available Time Slots
              </label>

              <div className="space-y-3">
                {/* Morning Slots */}
                <div>
                  <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1 mb-1.5">
                    <Clock className="w-3 h-3 text-[#007e8a]" /> Morning Slots
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {doctor.slots.morning.map((slot) => {
                      const isSelected = selectedSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-2 px-2.5 rounded-xl text-xs font-semibold transition ${
                            isSelected
                              ? 'bg-[#007e8a] text-white shadow-sm'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Afternoon Slots */}
                {doctor.slots.afternoon.length > 0 && (
                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1 mb-1.5">
                      <Clock className="w-3 h-3 text-[#007e8a]" /> Afternoon Slots
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {doctor.slots.afternoon.map((slot) => {
                        const isSelected = selectedSlot === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedSlot(slot)}
                            className={`py-2 px-2.5 rounded-xl text-xs font-semibold transition ${
                              isSelected
                                ? 'bg-[#007e8a] text-white shadow-sm'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Patient Information */}
            <div className="space-y-3 pt-1 border-t border-slate-100">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Patient Contact
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#007e8a]"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#007e8a]"
                  />
                </div>
              </div>
              <textarea
                placeholder="Reason for visit / symptoms (Optional)"
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#007e8a] resize-none"
              />
            </div>

            {/* Fee Guarantee Note */}
            <div className="p-3 bg-teal-50/70 rounded-2xl flex items-center gap-2.5 border border-teal-100">
              <Shield className="w-5 h-5 text-[#007e8a] shrink-0" />
              <p className="text-[11px] text-slate-600 leading-tight">
                <strong>CarePlus Guarantee:</strong> Free cancellation up to 2 hours before the appointment. 100% verified doctors.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-[#007e8a] hover:bg-[#006872] text-white font-bold text-sm shadow-md shadow-teal-700/20 transition active:scale-98 flex items-center justify-center gap-2"
            >
              <span>Confirm & Book Appointment</span>
              <span className="text-teal-200 font-semibold">• ${consultationType === 'video' ? doctor.fee : doctor.fee + 15}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

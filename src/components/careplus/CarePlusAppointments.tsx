import React, { useState } from 'react';
import { Calendar, Clock, Video, Building2, Phone, X, Check, ArrowRight, User } from 'lucide-react';
import { Appointment } from '../../types/careplus';

interface CarePlusAppointmentsProps {
  appointments: Appointment[];
  onCancelAppointment: (id: string) => void;
  onOpenVideoCall: (appt: Appointment) => void;
  onNavigateToDoctors: () => void;
}

export const CarePlusAppointments: React.FC<CarePlusAppointmentsProps> = ({
  appointments,
  onCancelAppointment,
  onOpenVideoCall,
  onNavigateToDoctors,
}) => {
  const [tab, setTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');

  const filtered = appointments.filter((a) => a.status === tab);

  return (
    <div className="pb-28 pt-2 px-4 max-w-md mx-auto space-y-4">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">My Appointments</h2>
          <p className="text-xs text-slate-500">Manage and attend your medical visits</p>
        </div>
        <button
          onClick={onNavigateToDoctors}
          className="text-xs font-bold text-[#007e8a] hover:underline"
        >
          + Book New
        </button>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-100 p-1 rounded-2xl">
        {(['upcoming', 'completed', 'cancelled'] as const).map((t) => {
          const isActive = tab === t;
          const count = appointments.filter((a) => a.status === t).length;
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-xl text-xs font-bold capitalize transition flex items-center justify-center gap-1.5 ${
                isActive
                  ? 'bg-white text-[#007e8a] shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>{t}</span>
              {count > 0 && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-teal-50 text-[#007e8a]' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-3xl p-8 text-center border border-slate-100 text-slate-500 space-y-3 mt-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#007e8a] flex items-center justify-center mx-auto">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">No {tab} appointments</h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            {tab === 'upcoming'
              ? 'You do not have any scheduled consultations at the moment.'
              : `You have no ${tab} appointments record.`}
          </p>
          {tab === 'upcoming' && (
            <button
              onClick={onNavigateToDoctors}
              className="mt-2 px-5 py-2.5 rounded-xl bg-[#007e8a] text-white text-xs font-bold shadow-sm hover:bg-[#006872] transition"
            >
              Book an Appointment
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3 mt-2">
          {filtered.map((appt) => (
            <div
              key={appt.id}
              className="bg-white rounded-[24px] border border-slate-100 p-4 shadow-sm hover:shadow-md transition space-y-3"
            >
              <div className="flex items-start gap-3">
                <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-100 overflow-hidden shrink-0">
                  <img
                    src={appt.doctorImage}
                    alt={appt.doctorName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80';
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900 truncate">{appt.doctorName}</h4>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                        appt.status === 'upcoming'
                          ? 'bg-teal-50 text-[#007e8a] border border-teal-200/50'
                          : appt.status === 'completed'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-rose-50 text-rose-600'
                      }`}
                    >
                      {appt.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#007e8a] font-medium mt-0.5">{appt.specialty}</p>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">{appt.hospital}</p>
                </div>
              </div>

              {/* Date & Time pill info */}
              <div className="p-3 bg-slate-50 rounded-2xl flex items-center justify-between text-xs text-slate-700 border border-slate-100">
                <div className="flex items-center gap-1.5 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-[#007e8a]" />
                  <span>{appt.date}</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-[#007e8a]" />
                  <span>{appt.timeSlot}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-[#007e8a]">
                  {appt.type === 'video' ? (
                    <>
                      <Video className="w-3.5 h-3.5" /> Video Call
                    </>
                  ) : (
                    <>
                      <Building2 className="w-3.5 h-3.5" /> In-Clinic
                    </>
                  )}
                </div>
              </div>

              {/* Actions for upcoming */}
              {appt.status === 'upcoming' && (
                <div className="flex items-center gap-2 pt-1">
                  {appt.type === 'video' ? (
                    <button
                      onClick={() => onOpenVideoCall(appt)}
                      className="flex-1 py-2.5 rounded-xl bg-[#007e8a] text-white font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-[#006872] shadow-sm transition active:scale-95"
                    >
                      <Video className="w-3.5 h-3.5" />
                      Join Video Call
                    </button>
                  ) : (
                    <div className="flex-1 py-2.5 rounded-xl bg-teal-50 text-[#007e8a] font-bold text-xs flex items-center justify-center gap-1.5 border border-teal-100">
                      <Building2 className="w-3.5 h-3.5" />
                      Clinic Check-in Ready
                    </div>
                  )}

                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to cancel this appointment?')) {
                        onCancelAppointment(appt.id);
                      }
                    }}
                    className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-500 font-semibold text-xs hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

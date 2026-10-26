import React, { useState, useEffect } from 'react';
import { X, Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare, Shield, User } from 'lucide-react';
import { Appointment } from '../../types/careplus';

interface CarePlusVideoConsultModalProps {
  appointment: Appointment | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CarePlusVideoConsultModal: React.FC<CarePlusVideoConsultModalProps> = ({
  appointment,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !appointment) return null;

  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-lg h-full sm:h-[650px] bg-slate-900 sm:rounded-3xl shadow-2xl flex flex-col justify-between overflow-hidden relative">
        {/* Doctor Video Feed Simulation */}
        <div className="absolute inset-0 z-0">
          <img
            src={appointment.doctorImage}
            alt={appointment.doctorName}
            className="w-full h-full object-cover opacity-80 scale-105 filter blur-[0.5px]"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/70" />
        </div>

        {/* Top Floating Controls */}
        <div className="relative z-10 p-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2 bg-slate-900/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-semibold">{formatTime(callDuration)}</span>
          </div>

          <div className="text-center">
            <h4 className="text-sm font-bold text-white shadow-sm">{appointment.doctorName}</h4>
            <p className="text-[11px] text-teal-300 font-medium">{appointment.specialty}</p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-900/60 backdrop-blur-md text-white/80 hover:text-white flex items-center justify-center border border-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Patient Picture-in-Picture Preview */}
        <div className="relative z-10 self-end mr-4 w-28 h-36 rounded-2xl bg-slate-800/80 backdrop-blur-md border-2 border-white/20 overflow-hidden shadow-xl flex items-center justify-center">
          {isVideoOff ? (
            <div className="text-center text-slate-400">
              <User className="w-8 h-8 mx-auto opacity-50" />
              <span className="text-[10px] mt-1 block">Camera Off</span>
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-tr from-slate-700 to-slate-800 flex items-center justify-center text-white font-bold text-sm">
              Ahmed (You)
            </div>
          )}
        </div>

        {/* Bottom Call Bar */}
        <div className="relative z-10 p-5 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent flex items-center justify-center gap-4">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition active:scale-95 ${
              isMuted ? 'bg-rose-500 text-white' : 'bg-white/20 backdrop-blur-md text-white hover:bg-white/30'
            }`}
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition active:scale-95 ${
              isVideoOff ? 'bg-rose-500 text-white' : 'bg-white/20 backdrop-blur-md text-white hover:bg-white/30'
            }`}
          >
            {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
          </button>

          <button
            onClick={onClose}
            className="w-14 h-14 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-lg shadow-rose-900/40 transition active:scale-90"
          >
            <PhoneOff className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

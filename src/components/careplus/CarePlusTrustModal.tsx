import React from 'react';
import { X, ShieldCheck, Award, Lock, CheckCircle2, HeartPulse, Building2, Users } from 'lucide-react';

interface CarePlusTrustModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CarePlusTrustModal: React.FC<CarePlusTrustModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 max-h-[85vh] flex flex-col overflow-hidden animate-scaleUp">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 text-[#007e8a] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Trusted by Millions</h3>
              <p className="text-xs text-slate-500">Quality care & verified medical network</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs text-slate-600">
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-3.5 bg-teal-50/70 rounded-2xl border border-teal-100">
              <p className="text-xl font-extrabold text-[#007e8a]">2.4M+</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Consultations Done</p>
            </div>
            <div className="p-3.5 bg-teal-50/70 rounded-2xl border border-teal-100">
              <p className="text-xl font-extrabold text-[#007e8a]">1,200+</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Verified Specialists</p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-xl bg-teal-100/60 text-[#007e8a] flex items-center justify-center shrink-0 mt-0.5">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">100% Board Certified</h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                  Every doctor undergoes multi-level credential verification and medical license authentication before joining CarePlus.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-xl bg-teal-100/60 text-[#007e8a] flex items-center justify-center shrink-0 mt-0.5">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">End-to-End HIPAA Encrypted</h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                  All consultations, vital reports, and patient history are protected with 256-bit medical-grade encryption.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-xl bg-teal-100/60 text-[#007e8a] flex items-center justify-center shrink-0 mt-0.5">
                <HeartPulse className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Real-time Emergency Response</h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                  Direct referral connection to partner hospital emergency trauma wings and ambulance dispatch.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-[#007e8a] text-white font-bold text-xs hover:bg-[#006872] transition"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};

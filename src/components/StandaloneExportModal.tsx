import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Download, Copy, Check, ExternalLink, Smartphone, FileCode } from 'lucide-react';

interface StandaloneExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StandaloneExportModal: React.FC<StandaloneExportModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDownloadHtml = () => {
    const link = document.createElement('a');
    link.href = '/zikr-tasbeeh-standalone.html';
    link.download = 'zikr-tasbeeh-pwa.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyDirectLink = async () => {
    try {
      const url = window.location.origin + '/zikr-tasbeeh-standalone.html';
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const node = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-3xl bg-slate-900 border border-emerald-700/50 p-6 sm:p-7 shadow-2xl relative max-h-[90vh] overflow-y-auto my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg transition cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700/40 text-xs font-bold uppercase tracking-wider mb-2">
            <FileCode className="w-3.5 h-3.5" />
            Standalone Delivery
          </div>
          <h2 className="text-xl font-bold text-white">
            Single-File PWA &amp; Android APK Toolkit
          </h2>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            This application is engineered as a 100% self-contained single-file HTML/CSS/JS architecture with offline persistence, dynamic manifest, and CDN libraries.
          </p>
        </div>

        {/* 1-Click Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <button
            onClick={handleDownloadHtml}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-950/50 transition active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download .HTML File</span>
          </button>

          <a
            href="/zikr-tasbeeh-standalone.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-sm transition active:scale-95 cursor-pointer"
          >
            <ExternalLink className="w-4 h-4 text-emerald-400" />
            <span>Preview in New Tab</span>
          </a>
        </div>

        {/* 3-Step Guide to Compile APK */}
        <div className="bg-slate-950/70 rounded-2xl border border-emerald-900/40 p-4 sm:p-5 mb-5 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
            <Smartphone className="w-4 h-4" />
            <span>3-Step Guide: Compile into Android .APK File</span>
          </div>

          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-900/80 border border-emerald-500/50 text-emerald-300 font-bold flex items-center justify-center text-xs">
                1
              </span>
              <div>
                <strong className="text-white">Save the Standalone HTML file:</strong> Click the "Download .HTML File" button above or save the provided HTML code as <code className="text-amber-200 bg-slate-900 px-1 py-0.5 rounded">index.html</code> on your computer.
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-900/80 border border-emerald-500/50 text-emerald-300 font-bold flex items-center justify-center text-xs">
                2
              </span>
              <div>
                <strong className="text-white">Upload to Free APK Builder:</strong> Go to <a href="https://www.webintoapp.com" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline font-semibold">WebintoApp.com</a> (or PWABuilder.com). Choose the <strong className="text-white">"HTML Files"</strong> option and upload your <code className="text-amber-200 bg-slate-900 px-1 py-0.5 rounded">index.html</code> (or zip containing index.html).
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-900/80 border border-emerald-500/50 text-emerald-300 font-bold flex items-center justify-center text-xs">
                3
              </span>
              <div>
                <strong className="text-white">Generate &amp; Download APK:</strong> Enter App Name <em>"Zikr+"</em>, package name (e.g. <code className="text-amber-200 bg-slate-900 px-1 py-0.5 rounded">com.zikrplus.app</code>), click <strong className="text-white">"Build App"</strong>, and download the ready-to-install Android <code className="text-emerald-400 font-bold">.apk</code> file directly onto your phone!
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  if (typeof document === 'undefined') return null;
  return createPortal(node, document.body);
};

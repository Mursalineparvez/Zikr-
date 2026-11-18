import React from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  resetKey?: string | number;
  fallbackTitle?: string;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error?.message || 'Unexpected rendering error',
    };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.warn('[Zikr+ ErrorBoundary] Recovered from UI error:', error?.message, info?.componentStack?.slice(0, 240));
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false, errorMessage: '' });
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, errorMessage: '' });
    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full max-w-lg mx-auto my-10 p-6 rounded-2xl border border-amber-500/30 bg-white dark:bg-[#082228] text-slate-900 dark:text-slate-100 shadow-lg text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-500 mx-auto flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-base font-extrabold">
              {this.props.fallbackTitle || 'এই অংশটি লোড হতে সাময়িক সমস্যা হয়েছে'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-300 leading-relaxed">
              চিন্তার কিছু নেই — আপনার সকল জিকির, বুকমার্ক ও হাইলাইট সম্পূর্ণ সুরক্ষিত আছে। নিচের বাটনে ক্লিক করে আবার চেষ্টা করুন।
            </p>
          </div>
          <div className="flex items-center justify-center gap-2.5 pt-1">
            <button
              type="button"
              onClick={this.handleRetry}
              className="px-4 py-2 rounded-xl bg-[#006747] hover:bg-[#00553b] text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer active:scale-95 transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>আবার চেষ্টা করুন</span>
            </button>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-white/15 text-xs font-bold hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer active:scale-95 transition"
            >
              পেজ রিলোড
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

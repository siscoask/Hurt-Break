import React, { useState, useEffect } from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { WifiOff, CheckCircle2, X } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();
  const [wasOffline, setWasOffline] = useState(false);
  const [showBackOnlineToast, setShowBackOnlineToast] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      setWasOffline(true);
      setDismissed(false);
    } else if (wasOffline) {
      setShowBackOnlineToast(true);
      const timer = setTimeout(() => setShowBackOnlineToast(false), 3500);
      return () => clearTimeout(timer);
    }
  }, [isOnline, wasOffline]);

  // Back online toast
  if (showBackOnlineToast && isOnline) {
    return (
      <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#142618] border border-[#22C55E]/40 text-[#4ADE80] text-xs sm:text-sm font-medium shadow-2xl animate-fade-in backdrop-blur-md">
        <CheckCircle2 className="w-4 h-4 shrink-0 text-[#22C55E]" />
        <span>Back online. All features synced.</span>
      </div>
    );
  }

  // Currently offline indicator
  if (!isOnline && !dismissed) {
    return (
      <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#1F151B] border border-[#FF4F70]/40 text-[var(--text-primary)] text-xs sm:text-sm shadow-2xl animate-fade-in backdrop-blur-md max-w-sm sm:max-w-md w-[92%] sm:w-auto">
        <div className="w-7 h-7 rounded-lg bg-[#4A1825] flex items-center justify-center shrink-0">
          <WifiOff className="w-4 h-4 text-[#FF4F70]" />
        </div>
        <div className="flex-1 min-w-0 pr-1">
          <p className="font-semibold text-xs text-[#FF7890]">Offline Mode Active</p>
          <p className="text-[11px] text-[var(--text-secondary)] leading-tight">
            Reality checks, journal, unsent texts & lessons work 100% locally.
          </p>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="p-1 rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          aria-label="Dismiss offline notice"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return null;
};

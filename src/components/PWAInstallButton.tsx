import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Share, PlusSquare, Check, X, Smartphone, Sparkles } from 'lucide-react';

interface PWAInstallButtonProps {
  variant?: 'nav' | 'card' | 'inline';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ variant = 'nav' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);
  const [justInstalled, setJustInstalled] = useState(false);

  // If already installed and running standalone, do not show install CTA
  if (isInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      const success = await install();
      if (success) {
        setJustInstalled(true);
        setTimeout(() => setJustInstalled(false), 3000);
      }
    } else {
      // Show guided prompt modal (for iOS or browsers where prompt event hasn't fired yet)
      setShowGuide(true);
    }
  };

  return (
    <>
      {/* Variant 1: Compact Navigation / Sidebar button */}
      {variant === 'nav' && (
        <button
          onClick={handleInstallClick}
          className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium border border-[#FF4F70]/30 bg-gradient-to-r from-[#2A1119] to-[#1C1116] text-[#FF7890] hover:text-[#FFA0B2] hover:border-[#FF4F70]/60 transition-all cursor-pointer shadow-sm group"
          title="Install HurtBreak as an App"
        >
          <div className="flex items-center gap-2">
            <Download className="w-3.5 h-3.5 text-[#FF4F70] group-hover:scale-110 transition-transform" />
            <span className="font-semibold tracking-wide">Install App</span>
          </div>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#4A1825] text-[#FF4F70] font-mono uppercase">
            PWA
          </span>
        </button>
      )}

      {/* Variant 2: Prominent card for Home or settings */}
      {variant === 'card' && (
        <div className="p-4 sm:p-5 rounded-2xl border border-[#FF4F70]/30 bg-gradient-to-br from-[#1F1217] via-[#161014] to-[#120D10] text-[var(--text-primary)] shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF4F70]/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#4A1825] flex items-center justify-center shrink-0 border border-[#FF4F70]/40">
                <Smartphone className="w-5 h-5 text-[#FF4F70]" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h4 className="font-serif text-base font-medium text-[var(--text-primary)]">
                    Install HurtBreak on Your Phone
                  </h4>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#FF4F70]/20 text-[#FF7890] font-medium">
                    Offline Ready
                  </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] font-light leading-relaxed">
                  Open instantly without a browser bar. Works anywhere with 100% offline access.
                </p>
              </div>
            </div>

            <button
              onClick={handleInstallClick}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#FF4F70] hover:bg-[#FF3358] text-white text-xs font-semibold tracking-wide shadow-md transition-all cursor-pointer shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isInstallable ? 'Install Now' : 'How to Install'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Variant 3: Minimal Inline button */}
      {variant === 'inline' && (
        <button
          onClick={handleInstallClick}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#FF4F70]/30 bg-[#2A1119] text-xs font-medium text-[#FF7890] hover:border-[#FF4F70] transition-colors cursor-pointer"
        >
          <Download className="w-3 h-3 text-[#FF4F70]" />
          <span>Install App</span>
        </button>
      )}

      {/* GUIDED INSTALL MODAL (Handles iOS Safari, Chrome desktop, or manual installs) */}
      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div
            className="w-full max-w-md rounded-2xl border p-6 space-y-5 shadow-2xl relative"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            <button
              onClick={() => setShowGuide(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#4A1825] flex items-center justify-center border border-[#FF4F70]/40">
                <Sparkles className="w-5 h-5 text-[#FF4F70]" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-medium text-[var(--text-primary)]">
                  Install HurtBreak
                </h3>
                <p className="text-xs text-[var(--text-secondary)]">
                  Fast, private, and works with no internet connection
                </p>
              </div>
            </div>

            {isIOS ? (
              /* iOS Safari Instructions */
              <div className="space-y-3.5 text-xs text-[var(--text-primary)]">
                <div className="p-3.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-start gap-3">
                  <div className="p-1.5 rounded-md bg-[#4A1825] text-[#FF4F70] shrink-0 mt-0.5">
                    <Share className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-[var(--text-primary)] font-semibold mb-0.5">Step 1: Tap Share</strong>
                    <span className="text-[var(--text-secondary)]">
                      Tap the <strong className="text-[var(--text-primary)]">Share</strong> icon at the bottom of your Safari screen.
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-start gap-3">
                  <div className="p-1.5 rounded-md bg-[#4A1825] text-[#FF4F70] shrink-0 mt-0.5">
                    <PlusSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-[var(--text-primary)] font-semibold mb-0.5">Step 2: Add to Home Screen</strong>
                    <span className="text-[var(--text-secondary)]">
                      Scroll down and tap <strong className="text-[var(--text-primary)]">“Add to Home Screen”</strong>.
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-start gap-3">
                  <div className="p-1.5 rounded-md bg-[#4A1825] text-[#FF4F70] shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-[var(--text-primary)] font-semibold mb-0.5">Step 3: Tap Add</strong>
                    <span className="text-[var(--text-secondary)]">
                      Confirm by tapping <strong className="text-[var(--text-primary)]">“Add”</strong> in the top right corner.
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              /* Android / Chrome / Edge Instructions */
              <div className="space-y-3 text-xs text-[var(--text-primary)]">
                <div className="p-3.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-1.5">
                  <strong className="block text-[var(--text-primary)] font-semibold">On Android / Chrome:</strong>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    1. Tap the three dots menu (⋮) in the browser toolbar.<br />
                    2. Select <strong className="text-[var(--text-primary)]">“Install App”</strong> or <strong className="text-[var(--text-primary)]">“Add to Home screen”</strong>.<br />
                    3. HurtBreak will install directly to your device apps list.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-1.5">
                  <strong className="block text-[var(--text-primary)] font-semibold">On Desktop (Chrome, Edge, Brave):</strong>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    Look for the <strong>Install</strong> icon in the address bar (right side of the URL) and click <strong>Install</strong>.
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={() => setShowGuide(false)}
              className="w-full py-2.5 rounded-xl bg-[var(--bg-secondary)] hover:bg-[var(--border-subtle)] text-xs font-semibold text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
};

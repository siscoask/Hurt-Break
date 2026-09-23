import React from 'react';
import { ShieldAlert, Heart, Phone, ExternalLink } from 'lucide-react';

interface CrisisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CrisisModal: React.FC<CrisisModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div
        className="w-full max-w-lg p-6 sm:p-8 rounded-2xl border shadow-2xl space-y-6"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-subtle)',
          color: 'var(--text-primary)'
        }}
      >
        <div className="flex items-center gap-3 text-[#FF4F70]">
          <ShieldAlert className="w-7 h-7 shrink-0" />
          <h2 className="font-serif text-2xl font-medium tracking-tight">
            Please Stay Safe Tonight
          </h2>
        </div>

        <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
          It sounds like you are carrying overwhelming pain right now. While HurtBreak is here to help organize relationship thoughts, you deserve immediate, compassionate human support when things feel this loud.
        </p>

        <div className="space-y-3 p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-sm">
          <div className="flex items-start gap-3">
            <Phone className="w-4 h-4 text-[#FF4F70] mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-[var(--text-primary)]">Suicide & Crisis Lifeline (US & Canada)</p>
              <p className="text-[var(--text-secondary)]">Call or text <span className="font-bold text-[#FF7890]">988</span> (Free, confidential, 24/7)</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Heart className="w-4 h-4 text-[#FF4F70] mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-[var(--text-primary)]">Crisis Text Line</p>
              <p className="text-[var(--text-secondary)]">Text <span className="font-bold text-[#FF7890]">HOME</span> to <span className="font-bold text-[#FF7890]">741741</span></p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ExternalLink className="w-4 h-4 text-[#FF4F70] mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-[var(--text-primary)]">International Resources</p>
              <a
                href="https://findahelpline.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF7890] hover:underline"
              >
                findahelpline.com (Global support lines in 130+ countries)
              </a>
            </div>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[var(--border-subtle)] hover:bg-[var(--bg-secondary)] text-xs sm:text-sm font-medium transition-colors cursor-pointer"
          >
            I am safe, take me back to HurtBreak
          </button>
        </div>
      </div>
    </div>
  );
};

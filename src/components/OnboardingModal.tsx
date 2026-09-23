import React from 'react';
import { Logo } from './Logo';

interface OnboardingModalProps {
  onStart: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ onStart }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/85 backdrop-blur-md transition-opacity duration-300">
      <div
        className="w-full max-w-lg p-8 sm:p-12 rounded-2xl sm:rounded-3xl border text-center transition-all duration-300 shadow-2xl relative overflow-hidden"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-subtle)',
          color: 'var(--text-primary)'
        }}
      >
        {/* Subtle ambient rose glow behind logo */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#FF4F70]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex justify-center mb-6">
          <Logo size="lg" showWordmark={false} />
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight mb-3">
          Hurt<span className="text-[#FF4F70]">Break</span>
        </h1>

        <p className="font-serif italic text-lg sm:text-xl text-[#FF7890] dark:text-[#FF7890] mb-8">
          Know what was yours. Let go of what wasn’t.
        </p>

        <div className="my-8 py-6 border-y border-[var(--border-subtle)]">
          <p className="text-base sm:text-lg font-light text-[var(--text-secondary)] leading-relaxed">
            You don't have to figure everything out tonight.
          </p>
        </div>

        <button
          onClick={onStart}
          className="w-full sm:w-auto min-w-[200px] px-8 py-3.5 rounded-xl text-base font-medium text-white transition-all duration-200 shadow-lg hover:shadow-[#FF4F70]/25 active:scale-[0.98] cursor-pointer"
          style={{ backgroundColor: 'var(--accent-primary)' }}
        >
          Start
        </button>

        <p className="mt-6 text-xs text-[var(--text-secondary)] tracking-wide">
          Own your part. Don’t carry theirs.
        </p>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { ArrowRight, RotateCcw, Bookmark, Check } from 'lucide-react';
import { storage } from '../services/storage';

interface ButIDidToolProps {
  onGoToJournal?: (initialText?: string) => void;
}

export const ButIDidTool: React.FC<ButIDidToolProps> = ({ onGoToJournal }) => {
  const [input, setInput] = useState('');
  const [submittedText, setSubmittedText] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setSubmittedText(input.trim());
    setSaved(false);
  };

  const handleReset = () => {
    setInput('');
    setSubmittedText(null);
    setSaved(false);
  };

  const handleSaveToJournal = () => {
    if (!submittedText) return;
    storage.saveJournalEntry({
      id: 'journal-' + Date.now(),
      timestamp: new Date().toISOString(),
      title: `Owning: ${submittedText.slice(0, 30)}...`,
      happened: `I kept thinking about when I did: "${submittedText}"`,
      feeling: 'Guilt and over-responsibility',
      tellingMyself: 'That my mistake justifies everything bad that followed.',
      isActuallyTrue: 'No. I can own this one mistake without inheriting everything else.'
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div
      className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl border transition-all duration-200"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border-subtle)'
      }}
    >
      <div className="max-w-2xl mx-auto">
        <span className="text-xs font-semibold tracking-wider uppercase text-[#FF4F70] mb-2 block">
          Proportion Check
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight mb-2">
          “But I did...”
        </h2>
        <p className="text-sm text-[var(--text-secondary)] mb-6">
          Tell me the specific thing you keep kicking yourself for. The mistake you think ruined everything.
        </p>

        {!submittedText ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="e.g., I ignored their calls for two days / I yelled at dinner"
                className="w-full px-4 py-3.5 rounded-xl border bg-[var(--bg-secondary)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/50 focus:outline-none focus:border-[#FF4F70] transition-colors text-sm sm:text-base"
                style={{ borderColor: 'var(--border-subtle)' }}
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!input.trim()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                style={{ backgroundColor: 'var(--accent-primary)' }}
              >
                <span>Examine This</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6 pt-2 animate-fadeIn">
            {/* User Quote */}
            <div className="p-4 rounded-xl border bg-[var(--bg-secondary)]/70 border-[var(--border-subtle)]">
              <p className="text-xs text-[var(--text-secondary)] uppercase tracking-wide mb-1">
                You said:
              </p>
              <p className="font-serif italic text-base sm:text-lg text-[var(--text-primary)]">
                “{submittedText}”
              </p>
            </div>

            {/* The Response */}
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#FF4F70]" />
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-[var(--text-primary)]">
                  Okay. Own that.
                </h3>
              </div>

              <div className="p-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] space-y-4">
                <p className="text-sm sm:text-base text-[var(--text-primary)] leading-relaxed">
                  Does that one mistake automatically explain everything that happened afterward?
                </p>
                <p className="text-sm sm:text-base font-serif italic text-[#FF7890] dark:text-[#FF7890] leading-relaxed">
                  You can take responsibility for one thing without taking responsibility for everything.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[var(--accent-wine)]/30 border border-[#FF4F70]/20 text-center">
                <p className="font-serif text-lg font-medium text-[var(--text-primary)]">
                  Own your part. Don't inherit theirs.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[var(--border-subtle)]">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 text-xs sm:text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Try another regret</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleSaveToJournal}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[var(--border-subtle)] hover:bg-[var(--bg-secondary)] text-xs font-medium transition-colors cursor-pointer"
                >
                  {saved ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Saved to Journal</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>Save as Journal Entry</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

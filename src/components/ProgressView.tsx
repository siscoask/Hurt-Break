import React, { useState } from 'react';
import { Sparkles, Calendar, ArrowDown, ShieldAlert, PenLine, Bookmark, Trash2 } from 'lucide-react';
import { RealityCheckSession, JournalEntry, NavTab } from '../types';
import { storage } from '../services/storage';

interface ProgressViewProps {
  onNavigate: (tab: NavTab) => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({ onNavigate }) => {
  const [realitySessions, setRealitySessions] = useState<RealityCheckSession[]>(
    storage.getRealitySessions()
  );
  const [journalEntries] = useState<JournalEntry[]>(storage.getJournalEntries());
  const [savedDrops] = useState(storage.getSavedDrops());
  const [savedLessonIds] = useState(storage.getSavedLessonIds());

  // Default timeline milestones if user just started, plus their real logged sessions
  const hasUserActivity =
    realitySessions.length > 0 ||
    journalEntries.length > 0 ||
    savedDrops.length > 0 ||
    savedLessonIds.length > 0;

  const handleDeleteSession = (id: string) => {
    if (window.confirm('Delete this saved breakdown?')) {
      const updated = storage.deleteRealitySession(id);
      setRealitySessions(updated);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-4 sm:py-8 space-y-10">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#FF4F70]">
          Reflection Timeline
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-[var(--text-primary)]">
          LOOK HOW FAR YOU'VE COME
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] font-light max-w-xl leading-relaxed">
          Progress here is not a fake percentage bar. Healing is not linear arithmetic. Progress means clarity: noticing when you stop taking the blame for things you never caused.
        </p>
      </div>

      {/* PHILOSOPHICAL TIMELINE ARC */}
      <div
        className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl border shadow-xl space-y-6"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-subtle)'
        }}
      >
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
          The Clarity Shift
        </span>

        <div className="space-y-4 relative pl-6 border-l-2 border-[#FF4F70]/30 font-serif">
          <div className="relative">
            <span className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-[var(--text-secondary)]" />
            <p className="text-xs text-[var(--text-secondary)] font-mono mb-0.5">Phase 1</p>
            <p className="text-base sm:text-lg text-[var(--text-primary)] italic">
              “I think everything was my fault. If only I had done more.”
            </p>
          </div>

          <div className="relative pt-2">
            <span className="absolute -left-[31px] top-3.5 w-3 h-3 rounded-full bg-[#FF7890]" />
            <p className="text-xs text-[var(--text-secondary)] font-mono mb-0.5">Phase 2</p>
            <p className="text-base sm:text-lg text-[var(--text-primary)] italic">
              “Wait. Maybe some things actually weren't mine to carry.”
            </p>
          </div>

          <div className="relative pt-2">
            <span className="absolute -left-[31px] top-3.5 w-3 h-3 rounded-full bg-[#FF4F70]" />
            <p className="text-xs text-[var(--text-secondary)] font-mono mb-0.5">Phase 3</p>
            <p className="text-base sm:text-lg text-[var(--text-primary)] italic">
              “I know what I did wrong now. And I see where their choices began.”
            </p>
          </div>

          <div className="relative pt-2">
            <span className="absolute -left-[31px] top-3.5 w-3.5 h-3.5 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20" />
            <p className="text-xs text-emerald-400 font-mono mb-0.5">Clarity</p>
            <p className="text-base sm:text-xl text-[var(--text-primary)] font-medium italic">
              “I don't need to punish myself forever. Own my part. Don't carry theirs.”
            </p>
          </div>
        </div>
      </div>

      {/* REAL LOGGED ACTIVITY RECORD */}
      <div className="space-y-5">
        <h2 className="font-serif text-2xl font-medium text-[var(--text-primary)]">
          Your Clarity Records
        </h2>

        {/* SUMMARY STATS (GENUINE METRICS, NO FAKE PERCENTAGES) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] text-center space-y-1">
            <span className="text-2xl font-mono font-bold text-[var(--text-primary)]">
              {realitySessions.length}
            </span>
            <p className="text-[11px] text-[var(--text-secondary)] uppercase tracking-wider">
              Reality Checks
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] text-center space-y-1">
            <span className="text-2xl font-mono font-bold text-[var(--text-primary)]">
              {journalEntries.length}
            </span>
            <p className="text-[11px] text-[var(--text-secondary)] uppercase tracking-wider">
              Journal Notes
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] text-center space-y-1">
            <span className="text-2xl font-mono font-bold text-[var(--text-primary)]">
              {savedLessonIds.length}
            </span>
            <p className="text-[11px] text-[var(--text-secondary)] uppercase tracking-wider">
              Saved Lessons
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] text-center space-y-1">
            <span className="text-2xl font-mono font-bold text-[var(--text-primary)]">
              {savedDrops.length}
            </span>
            <p className="text-[11px] text-[var(--text-secondary)] uppercase tracking-wider">
              Anchors
            </p>
          </div>
        </div>

        {/* COMPLETED REALITY CHECKS LIST */}
        {realitySessions.length > 0 && (
          <div className="space-y-4 pt-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
              Saved Reality Check Sessions
            </h3>

            <div className="space-y-3">
              {realitySessions.map(session => (
                <div
                  key={session.id}
                  className="p-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-3 transition-all hover:border-[#FF4F70]/30"
                >
                  <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] border-b border-[var(--border-subtle)] pb-2">
                    <span className="font-mono">
                      {new Date(session.timestamp).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                    <button
                      onClick={() => handleDeleteSession(session.id)}
                      className="text-[var(--text-secondary)] hover:text-red-400 transition-colors p-1 cursor-pointer"
                      title="Delete record"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <blockquote className="font-serif italic text-base text-[var(--text-primary)] leading-relaxed">
                    “{session.breakdown.readThisAgain}”
                  </blockquote>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                    <div className="p-2.5 rounded-lg bg-[var(--bg-secondary)] text-[var(--text-primary)]">
                      <strong className="text-[#FF4F70] block text-[10px] uppercase">What you owned:</strong>
                      <span className="line-clamp-2">{session.answers.userAction || 'Your portion of the reaction'}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[var(--bg-secondary)] text-[var(--text-primary)]">
                      <strong className="text-[#FF7890] block text-[10px] uppercase">What was theirs:</strong>
                      <span className="line-clamp-2">{session.answers.theirAction || 'Their independent decisions'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EMPTY STATE */}
        {!hasUserActivity && (
          <div
            className="p-12 text-center rounded-2xl sm:rounded-3xl border border-dashed border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-3"
          >
            <Sparkles className="w-8 h-8 text-[var(--text-secondary)] mx-auto opacity-50" />
            <h3 className="font-serif text-xl font-medium text-[var(--text-primary)]">
              Your story starts here.
            </h3>
            <p className="text-xs text-[var(--text-secondary)] max-w-sm mx-auto">
              Run your first Reality Check or save a reflection. Every time you clarify what belongs to you, it will show here.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('reality')}
                className="px-5 py-2.5 rounded-xl text-white text-xs font-medium cursor-pointer"
                style={{ backgroundColor: 'var(--accent-primary)' }}
              >
                Start First Reality Check
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

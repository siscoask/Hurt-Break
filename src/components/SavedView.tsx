import React, { useState } from 'react';
import { Bookmark, Sparkles, BookOpen, ShieldAlert, ArrowRight, Trash2 } from 'lucide-react';
import { Lesson, DailyReminder, RealityCheckSession, NavTab } from '../types';
import { LESSONS_DATA } from '../data/lessonsData';
import { storage } from '../services/storage';

interface SavedViewProps {
  onNavigate: (tab: NavTab) => void;
}

export const SavedView: React.FC<SavedViewProps> = ({ onNavigate }) => {
  const [savedLessonIds, setSavedLessonIds] = useState<string[]>(storage.getSavedLessonIds());
  const [savedDrops, setSavedDrops] = useState<DailyReminder[]>(storage.getSavedDrops());
  const [realitySessions, setRealitySessions] = useState<RealityCheckSession[]>(storage.getRealitySessions());

  const savedLessons = LESSONS_DATA.filter(l => savedLessonIds.includes(l.id));

  const handleRemoveLesson = (id: string) => {
    storage.toggleSavedLesson(id);
    setSavedLessonIds(storage.getSavedLessonIds());
  };

  const handleRemoveDrop = (drop: DailyReminder) => {
    storage.toggleSavedDrop(drop);
    setSavedDrops(storage.getSavedDrops());
  };

  const handleRemoveSession = (id: string) => {
    if (window.confirm('Remove this saved breakdown?')) {
      const updated = storage.deleteRealitySession(id);
      setRealitySessions(updated);
    }
  };

  const hasAnySaved =
    savedLessons.length > 0 || savedDrops.length > 0 || realitySessions.length > 0;

  return (
    <div className="max-w-3xl mx-auto py-4 sm:py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#FF4F70]">
          Your Anchor Words
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-[var(--text-primary)]">
          Saved Sanctuary
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] font-light max-w-xl">
          The reflections and breakdowns you marked when you needed grounding.
        </p>
      </div>

      {/* SAVED DAILY DROPS */}
      {savedDrops.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
            <Sparkles className="w-4 h-4 text-[#FF4F70]" />
            <span>Saved Reminders ({savedDrops.length})</span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {savedDrops.map(drop => (
              <div
                key={drop.id}
                className="p-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-start justify-between gap-4"
              >
                <div>
                  <blockquote className="font-serif text-base sm:text-lg text-[var(--text-primary)] leading-snug">
                    “{drop.text}”
                  </blockquote>
                  {drop.subtext && (
                    <p className="text-xs sm:text-sm text-[#FF7890] italic mt-1">
                      {drop.subtext}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleRemoveDrop(drop)}
                  className="p-1 rounded text-[var(--text-secondary)] hover:text-red-400 cursor-pointer"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SAVED LESSONS */}
      {savedLessons.length > 0 && (
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
            <BookOpen className="w-4 h-4 text-[#FF7890]" />
            <span>Saved Lessons ({savedLessons.length})</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {savedLessons.map(lesson => (
              <div
                key={lesson.id}
                className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-3"
              >
                <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
                  <span className="uppercase tracking-wider font-semibold text-[#FF4F70]">
                    {lesson.category}
                  </span>
                  <button
                    onClick={() => handleRemoveLesson(lesson.id)}
                    className="text-[var(--text-secondary)] hover:text-red-400 p-1 cursor-pointer"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h3 className="font-serif text-lg font-medium text-[var(--text-primary)]">
                  {lesson.title}
                </h3>

                <blockquote className="font-serif italic text-base text-[#FF7890] p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
                  “{lesson.statement}”
                </blockquote>

                <p className="text-sm text-[var(--text-primary)] leading-relaxed font-light">
                  {lesson.explanation}
                </p>

                <div className="p-3 rounded-lg bg-[var(--accent-wine)]/30 text-center font-serif text-sm text-[var(--text-primary)] font-medium">
                  {lesson.finalLine}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SAVED BREAKDOWNS */}
      {realitySessions.length > 0 && (
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
            <ShieldAlert className="w-4 h-4 text-[#FF4F70]" />
            <span>Saved Reality Breakdowns ({realitySessions.length})</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {realitySessions.map(session => (
              <div
                key={session.id}
                className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-4"
              >
                <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] border-b border-[var(--border-subtle)] pb-2">
                  <span className="font-mono">
                    {new Date(session.timestamp).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => handleRemoveSession(session.id)}
                    className="text-[var(--text-secondary)] hover:text-red-400 p-1 cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <blockquote className="font-serif italic text-lg sm:text-xl text-[var(--text-primary)]">
                  “{session.breakdown.readThisAgain}”
                </blockquote>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-[var(--bg-secondary)]">
                    <span className="font-bold text-[#FF4F70] block uppercase mb-1">Your Part</span>
                    <ul className="space-y-1 list-disc list-inside text-[var(--text-primary)]">
                      {session.breakdown.yourPart.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-3 rounded-xl bg-[var(--bg-secondary)]">
                    <span className="font-bold text-[#FF7890] block uppercase mb-1">Their Part</span>
                    <ul className="space-y-1 list-disc list-inside text-[var(--text-primary)]">
                      {session.breakdown.theirPart.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EMPTY STATE */}
      {!hasAnySaved && (
        <div
          className="p-12 sm:p-16 rounded-2xl sm:rounded-3xl border border-dashed border-[var(--border-subtle)] text-center space-y-4"
          style={{ backgroundColor: 'var(--bg-card)' }}
        >
          <Bookmark className="w-8 h-8 text-[var(--text-secondary)] mx-auto opacity-50" />
          <div className="space-y-1">
            <h3 className="font-serif text-xl font-medium text-[var(--text-primary)]">
              Save the words you needed to hear.
            </h3>
            <p className="font-serif italic text-sm text-[var(--text-secondary)]">
              When a lesson or daily reminder resonates with you, bookmark it here to re-read when your head gets loud.
            </p>
          </div>
          <button
            onClick={() => onNavigate('lessons')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-xs sm:text-sm font-medium transition-all shadow-md cursor-pointer"
            style={{ backgroundColor: 'var(--accent-primary)' }}
          >
            <span>Browse Lessons</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

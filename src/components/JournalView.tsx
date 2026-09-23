import React, { useState } from 'react';
import { Plus, PenLine, Trash2, Edit3, Check, X, ShieldCheck } from 'lucide-react';
import { JournalEntry } from '../types';
import { storage } from '../services/storage';

export const JournalView: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>(storage.getJournalEntries());
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [happened, setHappened] = useState('');
  const [feeling, setFeeling] = useState('');
  const [tellingMyself, setTellingMyself] = useState('');
  const [isActuallyTrue, setIsActuallyTrue] = useState('');

  const resetForm = () => {
    setTitle('');
    setHappened('');
    setFeeling('');
    setTellingMyself('');
    setIsActuallyTrue('');
    setIsCreating(false);
    setEditingId(null);
  };

  const handleStartCreate = () => {
    resetForm();
    setIsCreating(true);
  };

  const handleStartEdit = (entry: JournalEntry) => {
    setEditingId(entry.id);
    setTitle(entry.title || '');
    setHappened(entry.happened);
    setFeeling(entry.feeling);
    setTellingMyself(entry.tellingMyself);
    setIsActuallyTrue(entry.isActuallyTrue);
    setIsCreating(true);
  };

  const handleSaveEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!happened.trim() && !feeling.trim()) return;

    const entry: JournalEntry = {
      id: editingId || 'journal-' + Date.now(),
      timestamp: new Date().toISOString(),
      title: title.trim() || undefined,
      happened: happened.trim(),
      feeling: feeling.trim(),
      tellingMyself: tellingMyself.trim(),
      isActuallyTrue: isActuallyTrue.trim()
    };

    const updated = storage.saveJournalEntry(entry);
    setEntries(updated);
    resetForm();
  };

  const handleDeleteEntry = (id: string) => {
    if (window.confirm('Delete this reflection entry?')) {
      const updated = storage.deleteJournalEntry(id);
      setEntries(updated);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-4 sm:py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#FF4F70]">
            Private Space
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-[var(--text-primary)]">
            Night Journal
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
            Write without editing yourself. You don't have to make it sound pretty.
          </p>
        </div>

        {!isCreating && (
          <button
            onClick={handleStartCreate}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-medium transition-all shadow-md hover:shadow-[#FF4F70]/25 cursor-pointer self-start sm:self-auto"
            style={{ backgroundColor: 'var(--accent-primary)' }}
          >
            <Plus className="w-4 h-4" />
            <span>New Entry</span>
          </button>
        )}
      </div>

      {/* PRIVACY NOTICE */}
      <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]/60 text-xs text-[var(--text-secondary)]">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>Your journal stays on this device in this MVP. No cloud uploads, no ads.</span>
      </div>

      {/* CREATE / EDIT FORM */}
      {isCreating && (
        <form
          onSubmit={handleSaveEntry}
          className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl border shadow-xl space-y-6 animate-fadeIn"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-accent)'
          }}
        >
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
            <h2 className="font-serif text-xl font-medium text-[var(--text-primary)]">
              {editingId ? 'Edit Reflection' : 'New Reflection'}
            </h2>
            <button
              type="button"
              onClick={resetForm}
              className="p-1 rounded-lg hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] block mb-1">
                Optional Title
              </label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. The conversation on the balcony"
                className="w-full px-3.5 py-2.5 rounded-xl border bg-[var(--bg-secondary)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/40 focus:outline-none focus:border-[#FF4F70]"
                style={{ borderColor: 'var(--border-subtle)' }}
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] block mb-1">
                1. What happened?
              </label>
              <textarea
                rows={3}
                value={happened}
                onChange={e => setHappened(e.target.value)}
                placeholder="Just the facts of what took place..."
                className="w-full p-3.5 rounded-xl border bg-[var(--bg-secondary)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/40 focus:outline-none focus:border-[#FF4F70] resize-y"
                style={{ borderColor: 'var(--border-subtle)' }}
                autoFocus
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] block mb-1">
                2. What am I feeling?
              </label>
              <textarea
                rows={2}
                value={feeling}
                onChange={e => setFeeling(e.target.value)}
                placeholder="Disappointment, numbness, rage, humiliation, longing..."
                className="w-full p-3.5 rounded-xl border bg-[var(--bg-secondary)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/40 focus:outline-none focus:border-[#FF4F70] resize-y"
                style={{ borderColor: 'var(--border-subtle)' }}
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] block mb-1">
                3. What am I telling myself?
              </label>
              <textarea
                rows={2}
                value={tellingMyself}
                onChange={e => setTellingMyself(e.target.value)}
                placeholder="The harsh story running in your mind (e.g. 'I was unlovable', 'I ruined the only good thing')..."
                className="w-full p-3.5 rounded-xl border bg-[var(--bg-secondary)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/40 focus:outline-none focus:border-[#FF4F70] resize-y"
                style={{ borderColor: 'var(--border-subtle)' }}
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[#FF7890] block mb-1">
                4. Is that actually true?
              </label>
              <textarea
                rows={3}
                value={isActuallyTrue}
                onChange={e => setIsActuallyTrue(e.target.value)}
                placeholder="Step back. What does reality say when you remove the self-blame?"
                className="w-full p-3.5 rounded-xl border bg-[var(--bg-secondary)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/40 focus:outline-none focus:border-[#FF4F70] resize-y font-serif italic"
                style={{ borderColor: 'var(--border-subtle)' }}
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[var(--border-subtle)]">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 rounded-xl text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!happened.trim() && !feeling.trim()}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-medium transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              style={{ backgroundColor: 'var(--accent-primary)' }}
            >
              <Check className="w-4 h-4" />
              <span>{editingId ? 'Save Changes' : 'Record Entry'}</span>
            </button>
          </div>
        </form>
      )}

      {/* ENTRIES LIST */}
      <div className="space-y-4">
        {entries.map(entry => (
          <div
            key={entry.id}
            className="p-6 rounded-2xl border transition-all duration-200 hover:border-[#FF4F70]/30 space-y-4"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-subtle)'
            }}
          >
            <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] border-b border-[var(--border-subtle)] pb-2.5">
              <span className="font-mono">
                {new Date(entry.timestamp).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleStartEdit(entry)}
                  className="p-1 rounded hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
                  title="Edit entry"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDeleteEntry(entry.id)}
                  className="p-1 rounded hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-red-400 cursor-pointer"
                  title="Delete entry"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {entry.title && (
              <h3 className="font-serif text-xl font-medium text-[var(--text-primary)]">
                {entry.title}
              </h3>
            )}

            {entry.happened && (
              <div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[var(--text-secondary)] block mb-1">
                  What Happened
                </span>
                <p className="text-sm text-[var(--text-primary)] leading-relaxed">
                  {entry.happened}
                </p>
              </div>
            )}

            {entry.feeling && (
              <div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[var(--text-secondary)] block mb-1">
                  Feeling
                </span>
                <p className="text-sm text-[var(--text-secondary)] italic">
                  {entry.feeling}
                </p>
              </div>
            )}

            {entry.tellingMyself && (
              <div className="p-3.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[var(--text-secondary)] block mb-1">
                  What I am telling myself
                </span>
                <p className="text-sm text-[var(--text-primary)] italic">
                  “{entry.tellingMyself}”
                </p>
              </div>
            )}

            {entry.isActuallyTrue && (
              <div className="p-4 rounded-xl bg-[var(--accent-wine)]/25 border border-[#FF4F70]/20 space-y-1">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[#FF7890] block">
                  Is That Actually True?
                </span>
                <p className="font-serif text-sm sm:text-base text-[var(--text-primary)]">
                  {entry.isActuallyTrue}
                </p>
              </div>
            )}
          </div>
        ))}

        {/* EMPTY STATE */}
        {entries.length === 0 && !isCreating && (
          <div
            className="p-12 sm:p-16 rounded-2xl sm:rounded-3xl border border-dashed border-[var(--border-subtle)] text-center space-y-4"
            style={{ backgroundColor: 'var(--bg-card)' }}
          >
            <PenLine className="w-8 h-8 text-[var(--text-secondary)] mx-auto opacity-50" />
            <div className="space-y-1">
              <h3 className="font-serif text-xl font-medium text-[var(--text-primary)]">
                Nothing here yet.
              </h3>
              <p className="font-serif italic text-sm text-[var(--text-secondary)]">
                Write something down. You don't have to make it sound pretty.
              </p>
            </div>
            <button
              onClick={handleStartCreate}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-xs sm:text-sm font-medium transition-all shadow-md cursor-pointer"
              style={{ backgroundColor: 'var(--accent-primary)' }}
            >
              <Plus className="w-4 h-4" />
              <span>Write first reflection</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

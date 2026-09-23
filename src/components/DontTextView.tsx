import React, { useState } from 'react';
import { MessageSquareOff, Shield, Check, RotateCcw, AlertTriangle } from 'lucide-react';
import { DontTextIntention, UnsentDraft } from '../types';
import { storage } from '../services/storage';

interface DontTextViewProps {
  onBack?: () => void;
}

const INTENTIONS: { id: DontTextIntention; label: string; reflection: string }[] = [
  {
    id: 'I want an answer.',
    label: 'I want an answer.',
    reflection:
      'If they had a clear, gentle answer, they likely would have given it by now. Forcing a response often leaves you with a rushed, defensive sentence that creates three new questions instead of one answer.'
  },
  {
    id: 'I want them to miss me.',
    label: 'I want them to miss me.',
    reflection:
      'You cannot text someone into missing you. People do not feel your absence when you keep showing up in their notifications. Absence is felt in silence, not reminders.'
  },
  {
    id: 'I want an apology.',
    label: 'I want an apology.',
    reflection:
      'An apology requested under pressure rarely feels like real remorse; it feels like an attempt to get you off their back. The most honest apology they have already given is their behavior.'
  },
  {
    id: 'I want them back.',
    label: 'I want them back.',
    reflection:
      'Do you want THEM back as they treated you on their worst day, or do you want back the feeling of not being alone tonight? Sending this will put you back in the waiting room.'
  },
  {
    id: "I'm lonely.",
    label: "I'm lonely.",
    reflection:
      'Loneliness is a physical ache at night. But texting them is borrowing comfort from tomorrow morning to survive tonight. Tomorrow morning you will wake up staring at the delivered checkmark.'
  },
  {
    id: 'I don\'t know.',
    label: 'I don\'t know.',
    reflection:
      'Not knowing is completely fine. When your nervous system is agitated, the hands want to do something to stop the spinning. Just breathe. The words can rest here tonight.'
  }
];

export const DontTextView: React.FC<DontTextViewProps> = () => {
  const [draft, setDraft] = useState('');
  const [selectedIntention, setSelectedIntention] = useState<DontTextIntention | null>(null);
  const [status, setStatus] = useState<'editing' | 'reflected' | 'kept' | 'proceed'>('editing');
  const [recentSaved, setRecentSaved] = useState<UnsentDraft[]>(storage.getUnsentTexts());

  const handleSelectIntention = (intention: DontTextIntention) => {
    setSelectedIntention(intention);
    setStatus('reflected');
  };

  const handleKeepItHere = () => {
    if (!draft.trim() || !selectedIntention) return;
    const item = INTENTIONS.find(i => i.id === selectedIntention);
    const newDraft: UnsentDraft = {
      id: 'unsent-' + Date.now(),
      timestamp: new Date().toISOString(),
      message: draft.trim(),
      intention: selectedIntention,
      reflection: item?.reflection || '',
      status: 'kept'
    };
    const updated = storage.saveUnsentText(newDraft);
    setRecentSaved(updated);
    setStatus('kept');
  };

  const handleStillWantToSend = () => {
    setStatus('proceed');
  };

  const handleReset = () => {
    setDraft('');
    setSelectedIntention(null);
    setStatus('editing');
  };

  return (
    <div className="max-w-3xl mx-auto py-4 sm:py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#FF4F70]">
          Impulse Pause
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-[var(--text-primary)]">
          DON'T TEXT THEM YET.
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] font-light max-w-xl">
          Tell me what you want to send first. Give the words a safe place to land before you give away your peace.
        </p>
      </div>

      {status === 'editing' && (
        <div
          className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl border shadow-xl space-y-6"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-subtle)'
          }}
        >
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
              Your Unsent Message
            </label>
            <textarea
              rows={6}
              value={draft}
              onChange={e => setDraft(e.target.value)}
              placeholder="Write the exact text you want to send. Don't edit it. Let out all the anger, longing, or confusion..."
              className="w-full p-4 rounded-xl border bg-[var(--bg-secondary)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/40 focus:outline-none focus:border-[#FF4F70] transition-colors resize-y text-base leading-relaxed"
              style={{ borderColor: 'var(--border-subtle)' }}
              autoFocus
            />
          </div>

          {draft.trim().length > 3 && (
            <div className="space-y-4 pt-4 border-t border-[var(--border-subtle)] animate-fadeIn">
              <h3 className="font-serif text-lg font-medium text-[var(--text-primary)]">
                What do you actually want from sending this?
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {INTENTIONS.map(option => (
                  <button
                    key={option.id}
                    onClick={() => handleSelectIntention(option.id)}
                    className="p-3.5 rounded-xl border text-left text-sm font-medium transition-all hover:border-[#FF4F70] hover:bg-[var(--bg-secondary)] cursor-pointer"
                    style={{
                      borderColor: 'var(--border-subtle)',
                      backgroundColor: 'var(--bg-secondary)'
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {status === 'reflected' && selectedIntention && (
        <div
          className="p-6 sm:p-10 rounded-2xl sm:rounded-3xl border shadow-xl space-y-6 animate-fadeIn"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-accent)'
          }}
        >
          {/* Draft Preview */}
          <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-[var(--text-secondary)] font-semibold">
              The Message You Wrote
            </span>
            <p className="font-serif italic text-sm sm:text-base text-[var(--text-primary)]">
              “{draft}”
            </p>
          </div>

          {/* Intention Card */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FF4F70]">
              <Shield className="w-4 h-4" />
              <span>You Want: {selectedIntention}</span>
            </div>

            {/* Reflection Prose */}
            <div className="p-6 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] space-y-3">
              <blockquote className="font-serif text-lg sm:text-xl text-[var(--text-primary)] leading-relaxed">
                {INTENTIONS.find(i => i.id === selectedIntention)?.reflection}
              </blockquote>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[var(--accent-wine)]/30 border border-[#FF4F70]/20 text-center">
            <p className="font-serif text-base text-[var(--text-primary)]">
              Do not trade tomorrow morning's dignity for tonight's five minutes of relief.
            </p>
          </div>

          {/* Core Decision Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[var(--border-subtle)]">
            <button
              onClick={handleKeepItHere}
              className="w-full sm:w-auto px-7 py-3 rounded-xl text-white font-medium text-sm transition-all shadow-md hover:shadow-[#FF4F70]/30 cursor-pointer"
              style={{ backgroundColor: 'var(--accent-primary)' }}
            >
              Keep it here in the vault
            </button>

            <button
              onClick={handleStillWantToSend}
              className="w-full sm:w-auto px-5 py-3 rounded-xl border border-[var(--border-subtle)] text-xs sm:text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer"
            >
              I still want to send it
            </button>
          </div>
        </div>
      )}

      {status === 'kept' && (
        <div
          className="p-8 sm:p-12 rounded-2xl sm:rounded-3xl border shadow-xl text-center space-y-6 animate-fadeIn"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-subtle)'
          }}
        >
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto">
            <Check className="w-6 h-6" />
          </div>

          <div className="space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[var(--text-primary)]">
              It's safe here.
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">
              You held your boundary tonight. The message is locked in your private device vault. You get to wake up tomorrow with your head high and clean hands.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-[var(--border-subtle)] hover:bg-[var(--bg-secondary)] text-sm font-medium transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Write another unsent thought</span>
          </button>
        </div>
      )}

      {status === 'proceed' && (
        <div
          className="p-8 sm:p-10 rounded-2xl sm:rounded-3xl border shadow-xl space-y-6 animate-fadeIn"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'rgba(255, 79, 112, 0.3)'
          }}
        >
          <div className="flex items-center gap-3 text-amber-500">
            <AlertTriangle className="w-6 h-6" />
            <h3 className="font-serif text-xl sm:text-2xl font-medium text-[var(--text-primary)]">
              Before you press send:
            </h3>
          </div>

          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            HurtBreak does not control your choices. If you send this, assume they won't reply the way you hope. If you are prepared for cold silence, two-word deflections, or no answer at all, go ahead.
          </p>

          <p className="font-serif italic text-base text-[var(--text-primary)]">
            Whatever happens, remember: you are not ruined if they don't answer. HurtBreak is here either way.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[var(--border-subtle)]">
            <button
              onClick={handleKeepItHere}
              className="px-6 py-2.5 rounded-xl text-white font-medium text-sm transition-all cursor-pointer"
              style={{ backgroundColor: 'var(--accent-primary)' }}
            >
              Actually, keep it here
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2.5 rounded-xl border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
            >
              Start over
            </button>
          </div>
        </div>
      )}

      {/* UNSENT VAULT HISTORY */}
      {recentSaved.length > 0 && (
        <div className="space-y-3 pt-6">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
            Saved in your private vault ({recentSaved.length})
          </h3>

          <div className="space-y-3">
            {recentSaved.slice(0, 5).map(item => (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-2 text-sm"
              >
                <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
                  <span>Intention: <strong className="text-[var(--text-primary)]">{item.intention}</strong></span>
                  <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                </div>
                <p className="font-serif italic text-[var(--text-primary)] line-clamp-2">
                  “{item.message}”
                </p>
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      const updated = storage.deleteUnsentText(item.id);
                      setRecentSaved(updated);
                    }}
                    className="text-[11px] text-[var(--text-secondary)] hover:text-red-400 transition-colors cursor-pointer"
                  >
                    Delete from vault
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

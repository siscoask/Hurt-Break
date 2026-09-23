import React, { useState } from 'react';
import { Plus, Compass, Trash2, Calendar, Check, X } from 'lucide-react';
import { MemoryEntry, MemoryReframingStage } from '../types';
import { storage } from '../services/storage';

export const MemoriesView: React.FC = () => {
  const [memories, setMemories] = useState<MemoryEntry[]>(storage.getMemories());
  const [isCreating, setIsCreating] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dateString, setDateString] = useState('');
  const [reframingStage, setReframingStage] = useState<MemoryReframingStage>('remember');

  const STAGES: { id: MemoryReframingStage; label: string; desc: string }[] = [
    {
      id: 'need',
      label: '“I need them.”',
      desc: 'Still feels raw, longing, hard to separate from present ache.'
    },
    {
      id: 'remember',
      label: '“I remember them.”',
      desc: 'Acknowledging it happened without letting it demand a reunion.'
    },
    {
      id: 'chapter',
      label: '“That was a chapter.”',
      desc: 'Honoring the season while letting the page stay turned.'
    }
  ];

  const handleSaveMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() && !description.trim()) return;

    const newMemory: MemoryEntry = {
      id: 'memory-' + Date.now(),
      timestamp: new Date().toISOString(),
      title: title.trim() || 'Untitled Memory',
      description: description.trim(),
      dateString: dateString.trim() || undefined,
      reframingStage
    };

    const updated = storage.saveMemory(newMemory);
    setMemories(updated);
    setTitle('');
    setDescription('');
    setDateString('');
    setReframingStage('remember');
    setIsCreating(false);
  };

  const handleUpdateStage = (id: string, stage: MemoryReframingStage) => {
    const memory = memories.find(m => m.id === id);
    if (!memory) return;
    const updatedMemory = { ...memory, reframingStage: stage };
    const updated = storage.saveMemory(updatedMemory);
    setMemories(updated);
  };

  const handleDeleteMemory = (id: string) => {
    if (window.confirm('Remove this memory from HurtBreak?')) {
      const updated = storage.deleteMemory(id);
      setMemories(updated);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-4 sm:py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#FF4F70]">
            Reframing The Past
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-[var(--text-primary)]">
            Memories
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
            The goal is not to erase what happened, but to change how much weight it holds over tonight.
          </p>
        </div>

        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-medium transition-all shadow-md hover:shadow-[#FF4F70]/25 cursor-pointer self-start sm:self-auto"
            style={{ backgroundColor: 'var(--accent-primary)' }}
          >
            <Plus className="w-4 h-4" />
            <span>Store Memory</span>
          </button>
        )}
      </div>

      {/* Progression Banner */}
      <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] text-xs text-[var(--text-secondary)] flex flex-wrap items-center justify-center gap-2 sm:gap-4 font-serif">
        <span className="text-[var(--text-secondary)] italic">“I need them.”</span>
        <span className="text-[#FF4F70]">→</span>
        <span className="text-[var(--text-primary)] font-medium italic">“I remember them.”</span>
        <span className="text-[#FF4F70]">→</span>
        <span className="text-[#FF7890] font-semibold italic">“That was a chapter.”</span>
      </div>

      {/* CREATE FORM */}
      {isCreating && (
        <form
          onSubmit={handleSaveMemory}
          className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl border shadow-xl space-y-6 animate-fadeIn"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-accent)'
          }}
        >
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
            <h2 className="font-serif text-xl font-medium text-[var(--text-primary)]">
              Store a Memory
            </h2>
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="p-1 rounded-lg hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] block mb-1">
                Memory Title
              </label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Walking near the river in October"
                className="w-full px-3.5 py-2.5 rounded-xl border bg-[var(--bg-secondary)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/40 focus:outline-none focus:border-[#FF4F70]"
                style={{ borderColor: 'var(--border-subtle)' }}
                autoFocus
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] block mb-1">
                Approximate Date or Season (Optional)
              </label>
              <input
                type="text"
                value={dateString}
                onChange={e => setDateString(e.target.value)}
                placeholder="e.g. Autumn 2024 / Last December"
                className="w-full px-3.5 py-2.5 rounded-xl border bg-[var(--bg-secondary)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/40 focus:outline-none focus:border-[#FF4F70]"
                style={{ borderColor: 'var(--border-subtle)' }}
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] block mb-1">
                Description
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="What happened? What detail keeps repeating in your mind?"
                className="w-full p-3.5 rounded-xl border bg-[var(--bg-secondary)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/40 focus:outline-none focus:border-[#FF4F70] resize-y"
                style={{ borderColor: 'var(--border-subtle)' }}
              />
            </div>

            {/* STAGE SELECTOR */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#FF7890] block">
                What does this memory mean to you now?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {STAGES.map(stage => (
                  <button
                    type="button"
                    key={stage.id}
                    onClick={() => setReframingStage(stage.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      reframingStage === stage.id
                        ? 'border-[#FF4F70] bg-[var(--accent-wine)] text-[var(--text-primary)]'
                        : 'border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <p className="font-serif italic font-medium text-sm mb-1">{stage.label}</p>
                    <p className="text-[11px] leading-tight opacity-80">{stage.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[var(--border-subtle)]">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 rounded-xl text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!description.trim() && !title.trim()}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-medium transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              style={{ backgroundColor: 'var(--accent-primary)' }}
            >
              <Check className="w-4 h-4" />
              <span>Save Memory</span>
            </button>
          </div>
        </form>
      )}

      {/* MEMORIES LIST */}
      <div className="space-y-4">
        {memories.map(mem => (
          <div
            key={mem.id}
            className="p-6 rounded-2xl border transition-all duration-200 hover:border-[#FF4F70]/30 space-y-4"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-subtle)'
            }}
          >
            <div className="flex items-start justify-between gap-3 border-b border-[var(--border-subtle)] pb-3">
              <div>
                <h3 className="font-serif text-xl font-medium text-[var(--text-primary)]">
                  {mem.title}
                </h3>
                {mem.dateString && (
                  <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] mt-0.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{mem.dateString}</span>
                  </div>
                )}
              </div>
              <button
                onClick={() => handleDeleteMemory(mem.id)}
                className="p-1 rounded text-[var(--text-secondary)] hover:text-red-400 cursor-pointer transition-colors"
                title="Delete memory"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <p className="text-sm text-[var(--text-primary)] leading-relaxed font-light">
              {mem.description}
            </p>

            {/* Stage indicator & selector */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-subtle)] text-xs">
              <span className="text-[var(--text-secondary)]">
                Meaning: <strong className="font-serif italic text-[#FF7890]">{STAGES.find(s => s.id === mem.reframingStage)?.label}</strong>
              </span>

              <div className="flex items-center gap-1.5">
                {STAGES.map(stage => (
                  <button
                    key={stage.id}
                    onClick={() => handleUpdateStage(mem.id, stage.id)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                      mem.reframingStage === stage.id
                        ? 'bg-[var(--accent-wine)] text-[#FF7890] border border-[#FF4F70]/30'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
                    }`}
                  >
                    {stage.id === 'need' ? 'Need' : stage.id === 'remember' ? 'Remember' : 'Chapter'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* EMPTY STATE */}
        {memories.length === 0 && !isCreating && (
          <div
            className="p-12 sm:p-16 rounded-2xl sm:rounded-3xl border border-dashed border-[var(--border-subtle)] text-center space-y-4"
            style={{ backgroundColor: 'var(--bg-card)' }}
          >
            <Compass className="w-8 h-8 text-[var(--text-secondary)] mx-auto opacity-50" />
            <div className="space-y-1">
              <h3 className="font-serif text-xl font-medium text-[var(--text-primary)]">
                Some memories are worth putting somewhere other than your head.
              </h3>
              <p className="font-serif italic text-sm text-[var(--text-secondary)]">
                Place the memory here. Watch it slowly shift from an open wound into a closed chapter.
              </p>
            </div>
            <button
              onClick={() => setIsCreating(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-xs sm:text-sm font-medium transition-all shadow-md cursor-pointer"
              style={{ backgroundColor: 'var(--accent-primary)' }}
            >
              <Plus className="w-4 h-4" />
              <span>Store a memory</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

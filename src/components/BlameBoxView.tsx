import React, { useState } from 'react';
import { Plus, ArrowRight, ArrowLeft, RotateCcw, Check, Sparkles, Trash2 } from 'lucide-react';
import { BlameItem } from '../types';
import { storage } from '../services/storage';

export const BlameBoxView: React.FC = () => {
  const [items, setItems] = useState<BlameItem[]>(storage.getBlameItems());
  const [newItemText, setNewItemText] = useState('');
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [savedNotification, setSavedNotification] = useState(false);

  const mineItems = items.filter(i => i.category === 'mine');
  const notMineItems = items.filter(i => i.category === 'not-mine');
  const unassignedItems = items.filter(i => i.category === 'unassigned');

  const moveItem = (id: string, targetCategory: 'mine' | 'not-mine' | 'unassigned') => {
    const updated = items.map(item =>
      item.id === id ? { ...item, category: targetCategory } : item
    );
    setItems(updated);
    storage.saveBlameItems(updated);
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;
    const newItem: BlameItem = {
      id: 'custom-' + Date.now(),
      text: newItemText.trim(),
      category: 'mine' // Defaults to mine for user to re-evaluate
    };
    const updated = [newItem, ...items];
    setItems(updated);
    storage.saveBlameItems(updated);
    setNewItemText('');
  };

  const handleDeleteItem = (id: string) => {
    const updated = items.filter(i => i.id !== id);
    setItems(updated);
    storage.saveBlameItems(updated);
  };

  const handleResetDefault = () => {
    const defaultItems = [
      { id: 'b-1', text: 'My mistakes', category: 'mine' as const },
      { id: 'b-2', text: 'My regrets', category: 'mine' as const },
      { id: 'b-3', text: 'Things I never said', category: 'mine' as const },
      { id: 'b-4', text: 'Their anger', category: 'not-mine' as const },
      { id: 'b-5', text: 'Their choices', category: 'not-mine' as const },
      { id: 'b-6', text: 'Their lies', category: 'not-mine' as const },
      { id: 'b-7', text: 'Their disappointment', category: 'not-mine' as const },
      { id: 'b-8', text: 'Their silence', category: 'not-mine' as const },
      { id: 'b-9', text: 'Their reaction', category: 'not-mine' as const }
    ];
    setItems(defaultItems);
    storage.saveBlameItems(defaultItems);
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2000);
  };

  // Drag and Drop handlers
  const handleDragStart = (id: string) => {
    setDraggedId(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetCategory: 'mine' | 'not-mine') => {
    if (draggedId) {
      moveItem(draggedId, targetCategory);
      setDraggedId(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-4 sm:py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#FF4F70]">
          Sorting Responsibility
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-[var(--text-primary)]">
          WHAT ARE YOU CARRYING?
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] font-light max-w-xl">
          Move things into where they actually belong. Drag items across or tap the arrow on each card.
        </p>
      </div>

      {/* Custom Item Creator */}
      <form onSubmit={handleAddItem} className="flex gap-2 max-w-md">
        <input
          type="text"
          value={newItemText}
          onChange={e => setNewItemText(e.target.value)}
          placeholder="Add custom thought or burden..."
          className="flex-1 px-4 py-2.5 rounded-xl border bg-[var(--bg-card)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/40 focus:outline-none focus:border-[#FF4F70] transition-colors"
          style={{ borderColor: 'var(--border-subtle)' }}
        />
        <button
          type="submit"
          disabled={!newItemText.trim()}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-white font-medium text-xs sm:text-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
          style={{ backgroundColor: 'var(--accent-primary)' }}
        >
          <Plus className="w-4 h-4" />
          <span>Add</span>
        </button>
      </form>

      {/* TWO COLUMNS: MINE vs NOT MINE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* COLUMN 1: MINE */}
        <div
          onDragOver={handleDragOver}
          onDrop={() => handleDrop('mine')}
          className="p-6 rounded-2xl sm:rounded-3xl border flex flex-col justify-between min-h-[380px] transition-all"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-subtle)'
          }}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
              <div>
                <h3 className="font-serif text-xl font-medium text-[var(--text-primary)]">
                  Mine
                </h3>
                <p className="text-xs text-[var(--text-secondary)]">
                  My actual choices, words, and integrity.
                </p>
              </div>
              <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-[var(--bg-secondary)] text-[var(--text-primary)]">
                {mineItems.length}
              </span>
            </div>

            <div className="space-y-2.5 min-h-[200px]">
              {mineItems.map(item => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={() => handleDragStart(item.id)}
                  className="p-3.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center justify-between gap-3 text-sm text-[var(--text-primary)] shadow-sm cursor-grab active:cursor-grabbing hover:border-[#FF4F70]/40 transition-all"
                >
                  <span className="font-medium">{item.text}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => moveItem(item.id, 'not-mine')}
                      className="p-1.5 rounded-lg hover:bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[#FF7890] transition-colors cursor-pointer"
                      title="Move to Not Mine"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    {item.id.startsWith('custom-') && (
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="p-1.5 rounded-lg hover:bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-red-400 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {mineItems.length === 0 && (
                <div className="p-8 text-center border border-dashed border-[var(--border-subtle)] rounded-xl text-xs text-[var(--text-secondary)] italic">
                  Drag or move items here that are genuinely yours to own.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* COLUMN 2: NOT MINE */}
        <div
          onDragOver={handleDragOver}
          onDrop={() => handleDrop('not-mine')}
          className="p-6 rounded-2xl sm:rounded-3xl border flex flex-col justify-between min-h-[380px] transition-all"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-subtle)'
          }}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
              <div>
                <h3 className="font-serif text-xl font-medium text-[#FF7890]">
                  Not Mine
                </h3>
                <p className="text-xs text-[var(--text-secondary)]">
                  Their reactions, silence, anger, and decisions.
                </p>
              </div>
              <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-[var(--bg-secondary)] text-[#FF7890]">
                {notMineItems.length}
              </span>
            </div>

            <div className="space-y-2.5 min-h-[200px]">
              {notMineItems.map(item => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={() => handleDragStart(item.id)}
                  className="p-3.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center justify-between gap-3 text-sm text-[var(--text-primary)] shadow-sm cursor-grab active:cursor-grabbing hover:border-[#FF7890]/40 transition-all"
                >
                  <span className="font-medium text-[var(--text-secondary)] line-through decoration-[#FF4F70]/60 decoration-2">
                    {item.text}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => moveItem(item.id, 'mine')}
                      className="p-1.5 rounded-lg hover:bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[#FF4F70] transition-colors cursor-pointer"
                      title="Move to Mine"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    {item.id.startsWith('custom-') && (
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="p-1.5 rounded-lg hover:bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-red-400 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {notMineItems.length === 0 && (
                <div className="p-8 text-center border border-dashed border-[var(--border-subtle)] rounded-xl text-xs text-[var(--text-secondary)] italic">
                  Move things here that belong to someone else.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FINAL REFLECTIVE STATEMENT */}
      <div
        className="p-8 sm:p-10 rounded-2xl sm:rounded-3xl border shadow-xl text-center space-y-3"
        style={{
          backgroundColor: 'var(--bg-elevated)',
          borderColor: 'var(--border-accent)'
        }}
      >
        <Sparkles className="w-6 h-6 text-[#FF4F70] mx-auto mb-1" />
        <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[var(--text-primary)]">
          You don't have to carry everything that happened.
        </h2>
        <p className="font-serif italic text-base text-[#FF7890]">
          Own your part. Don't carry theirs.
        </p>
      </div>

      {/* Reset to defaults */}
      <div className="flex justify-center pt-2">
        <button
          onClick={handleResetDefault}
          className="inline-flex items-center gap-2 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset to default blame items</span>
        </button>
      </div>
      {savedNotification && (
        <p className="text-center text-xs text-emerald-400">Reset to defaults.</p>
      )}
    </div>
  );
};

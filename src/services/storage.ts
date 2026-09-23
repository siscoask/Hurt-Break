import {
  ThemeMode,
  JournalEntry,
  MemoryEntry,
  RealityCheckSession,
  BlameItem,
  UnsentDraft,
  DailyReminder
} from '../types';

const KEYS = {
  THEME: 'hurtbreak_theme',
  ONBOARDED: 'hurtbreak_onboarded',
  JOURNAL: 'hurtbreak_journal',
  MEMORIES: 'hurtbreak_memories',
  SAVED_LESSONS: 'hurtbreak_saved_lessons',
  SAVED_DROPS: 'hurtbreak_saved_drops',
  REALITY_SESSIONS: 'hurtbreak_reality_sessions',
  BLAME_ITEMS: 'hurtbreak_blame_items',
  UNSENT_TEXTS: 'hurtbreak_unsent_texts'
};

export const INITIAL_BLAME_ITEMS: BlameItem[] = [
  { id: 'b-1', text: 'My mistakes', category: 'mine' },
  { id: 'b-2', text: 'My regrets', category: 'mine' },
  { id: 'b-3', text: 'Things I never said', category: 'mine' },
  { id: 'b-4', text: 'Their anger', category: 'not-mine' },
  { id: 'b-5', text: 'Their choices', category: 'not-mine' },
  { id: 'b-6', text: 'Their lies', category: 'not-mine' },
  { id: 'b-7', text: 'Their disappointment', category: 'not-mine' },
  { id: 'b-8', text: 'Their silence', category: 'not-mine' },
  { id: 'b-9', text: 'Their reaction', category: 'not-mine' }
];

export const storage = {
  // Theme
  getTheme(): ThemeMode {
    try {
      const saved = localStorage.getItem(KEYS.THEME);
      if (saved === 'light' || saved === 'dark' || saved === 'system') {
        return saved;
      }
    } catch (e) {
      console.warn('Storage read error:', e);
    }
    return 'dark';
  },

  setTheme(theme: ThemeMode) {
    try {
      localStorage.setItem(KEYS.THEME, theme);
    } catch (e) {
      console.warn('Storage write error:', e);
    }
  },

  // Onboarding
  isOnboarded(): boolean {
    try {
      return localStorage.getItem(KEYS.ONBOARDED) === 'true';
    } catch {
      return false;
    }
  },

  setOnboarded(value: boolean = true) {
    try {
      localStorage.setItem(KEYS.ONBOARDED, String(value));
    } catch (e) {
      console.warn(e);
    }
  },

  // Journal
  getJournalEntries(): JournalEntry[] {
    try {
      const data = localStorage.getItem(KEYS.JOURNAL);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveJournalEntry(entry: JournalEntry): JournalEntry[] {
    const list = this.getJournalEntries();
    const existingIndex = list.findIndex(item => item.id === entry.id);
    let updated: JournalEntry[];
    if (existingIndex >= 0) {
      updated = [...list];
      updated[existingIndex] = entry;
    } else {
      updated = [entry, ...list];
    }
    try {
      localStorage.setItem(KEYS.JOURNAL, JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
    return updated;
  },

  deleteJournalEntry(id: string): JournalEntry[] {
    const list = this.getJournalEntries().filter(item => item.id !== id);
    try {
      localStorage.setItem(KEYS.JOURNAL, JSON.stringify(list));
    } catch (e) {
      console.warn(e);
    }
    return list;
  },

  // Memories
  getMemories(): MemoryEntry[] {
    try {
      const data = localStorage.getItem(KEYS.MEMORIES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveMemory(memory: MemoryEntry): MemoryEntry[] {
    const list = this.getMemories();
    const existingIndex = list.findIndex(m => m.id === memory.id);
    let updated: MemoryEntry[];
    if (existingIndex >= 0) {
      updated = [...list];
      updated[existingIndex] = memory;
    } else {
      updated = [memory, ...list];
    }
    try {
      localStorage.setItem(KEYS.MEMORIES, JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
    return updated;
  },

  deleteMemory(id: string): MemoryEntry[] {
    const list = this.getMemories().filter(m => m.id !== id);
    try {
      localStorage.setItem(KEYS.MEMORIES, JSON.stringify(list));
    } catch (e) {
      console.warn(e);
    }
    return list;
  },

  // Saved Lessons
  getSavedLessonIds(): string[] {
    try {
      const data = localStorage.getItem(KEYS.SAVED_LESSONS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  toggleSavedLesson(lessonId: string): boolean {
    const list = this.getSavedLessonIds();
    const exists = list.includes(lessonId);
    const updated = exists ? list.filter(id => id !== lessonId) : [...list, lessonId];
    try {
      localStorage.setItem(KEYS.SAVED_LESSONS, JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
    return !exists;
  },

  isLessonSaved(lessonId: string): boolean {
    return this.getSavedLessonIds().includes(lessonId);
  },

  // Saved Daily Drops
  getSavedDrops(): DailyReminder[] {
    try {
      const data = localStorage.getItem(KEYS.SAVED_DROPS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  toggleSavedDrop(drop: DailyReminder): boolean {
    const list = this.getSavedDrops();
    const exists = list.some(d => d.id === drop.id);
    const updated = exists ? list.filter(d => d.id !== drop.id) : [drop, ...list];
    try {
      localStorage.setItem(KEYS.SAVED_DROPS, JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
    return !exists;
  },

  isDropSaved(dropId: string): boolean {
    return this.getSavedDrops().some(d => d.id === dropId);
  },

  // Reality Check Sessions
  getRealitySessions(): RealityCheckSession[] {
    try {
      const data = localStorage.getItem(KEYS.REALITY_SESSIONS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveRealitySession(session: RealityCheckSession): RealityCheckSession[] {
    const list = this.getRealitySessions();
    const existingIndex = list.findIndex(s => s.id === session.id);
    let updated: RealityCheckSession[];
    if (existingIndex >= 0) {
      updated = [...list];
      updated[existingIndex] = session;
    } else {
      updated = [session, ...list];
    }
    try {
      localStorage.setItem(KEYS.REALITY_SESSIONS, JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
    return updated;
  },

  deleteRealitySession(id: string): RealityCheckSession[] {
    const list = this.getRealitySessions().filter(s => s.id !== id);
    try {
      localStorage.setItem(KEYS.REALITY_SESSIONS, JSON.stringify(list));
    } catch (e) {
      console.warn(e);
    }
    return list;
  },

  // Blame Items
  getBlameItems(): BlameItem[] {
    try {
      const data = localStorage.getItem(KEYS.BLAME_ITEMS);
      return data ? JSON.parse(data) : INITIAL_BLAME_ITEMS;
    } catch {
      return INITIAL_BLAME_ITEMS;
    }
  },

  saveBlameItems(items: BlameItem[]) {
    try {
      localStorage.setItem(KEYS.BLAME_ITEMS, JSON.stringify(items));
    } catch (e) {
      console.warn(e);
    }
  },

  // Unsent Texts Vault
  getUnsentTexts(): UnsentDraft[] {
    try {
      const data = localStorage.getItem(KEYS.UNSENT_TEXTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveUnsentText(draft: UnsentDraft): UnsentDraft[] {
    const list = this.getUnsentTexts();
    const updated = [draft, ...list];
    try {
      localStorage.setItem(KEYS.UNSENT_TEXTS, JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
    return updated;
  },

  deleteUnsentText(id: string): UnsentDraft[] {
    const list = this.getUnsentTexts().filter(t => t.id !== id);
    try {
      localStorage.setItem(KEYS.UNSENT_TEXTS, JSON.stringify(list));
    } catch (e) {
      console.warn(e);
    }
    return list;
  }
};

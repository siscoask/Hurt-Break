export type ThemeMode = 'dark' | 'light' | 'system';

export type NavTab =
  | 'home'
  | 'reality'
  | 'lessons'
  | 'journal'
  | 'memories'
  | 'progress'
  | 'blamebox'
  | 'donttext'
  | 'saved'
  | 'talk'
  | 'about'
  | 'butidid';

export interface DailyReminder {
  id: string;
  text: string;
  subtext?: string;
  author?: string;
}

export interface RealityCheckAnswers {
  story: string;
  userAction: string;
  theirAction: string;
  theirAccusation: string;
  userSelfBlame: string;
  friendAdvice: string;
}

export interface RealityCheckBreakdown {
  yourPart: string[];
  theirPart: string[];
  both: string[];
  unclear: string[];
  readThisAgain: string;
  reminderQuote: string;
}

export interface RealityCheckSession {
  id: string;
  timestamp: string;
  answers: RealityCheckAnswers;
  breakdown: RealityCheckBreakdown;
  saved: boolean;
}

export type LessonCategory =
  | 'When they blame you'
  | 'When you miss them'
  | 'When you want to text'
  | 'When they come back'
  | 'When you feel replaceable'
  | 'When you think you ruined everything'
  | 'When you need closure';

export interface Lesson {
  id: string;
  title: string;
  category: LessonCategory;
  statement: string;
  explanation: string;
  example: string;
  reflectionQuestion: string;
  finalLine: string;
  saved?: boolean;
}

export interface JournalEntry {
  id: string;
  timestamp: string;
  title?: string;
  happened: string;
  feeling: string;
  tellingMyself: string;
  isActuallyTrue: string;
}

export type MemoryReframingStage = 'need' | 'remember' | 'chapter';

export interface MemoryEntry {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  dateString?: string;
  reframingStage: MemoryReframingStage;
}

export interface BlameItem {
  id: string;
  text: string;
  category: 'mine' | 'not-mine' | 'unassigned';
}

export type DontTextIntention =
  | 'I want an answer.'
  | 'I want them to miss me.'
  | 'I want an apology.'
  | 'I want them back.'
  | 'I\'m lonely.'
  | 'I don\'t know.';

export interface UnsentDraft {
  id: string;
  timestamp: string;
  message: string;
  intention: DontTextIntention;
  reflection: string;
  status: 'kept' | 'sent';
}

import React, { useState } from 'react';
import { Bookmark, Check, Share2, Search, ArrowRight } from 'lucide-react';
import { Lesson, LessonCategory } from '../types';
import { LESSONS_DATA } from '../data/lessonsData';
import { storage } from '../services/storage';

interface LessonsViewProps {
  initialCategory?: LessonCategory;
  onSavedChange?: () => void;
}

const CATEGORIES: ('All' | LessonCategory)[] = [
  'All',
  'When they blame you',
  'When you miss them',
  'When you want to text',
  'When they come back',
  'When you feel replaceable',
  'When you think you ruined everything',
  'When you need closure'
];

export const LessonsView: React.FC<LessonsViewProps> = ({
  initialCategory,
  onSavedChange
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | LessonCategory>(
    initialCategory || 'All'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [savedIds, setSavedIds] = useState<string[]>(storage.getSavedLessonIds());
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleToggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    storage.toggleSavedLesson(id);
    setSavedIds(storage.getSavedLessonIds());
    if (onSavedChange) onSavedChange();
  };

  const handleShareLesson = async (lesson: Lesson, e: React.MouseEvent) => {
    e.stopPropagation();
    const textToShare = `“${lesson.statement}”\n\n${lesson.finalLine}\n— HurtBreak`;
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(textToShare);
      setCopiedId(lesson.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const filteredLessons = LESSONS_DATA.filter(lesson => {
    const matchesCategory =
      selectedCategory === 'All' || lesson.category === selectedCategory;
    const matchesQuery =
      searchQuery.trim() === '' ||
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.statement.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.explanation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const activeLesson = LESSONS_DATA.find(l => l.id === activeLessonId);

  return (
    <div className="max-w-4xl mx-auto py-4 sm:py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#FF4F70]">
          Quiet Reading
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-[var(--text-primary)]">
          Lessons for 1 AM
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] font-light max-w-xl">
          Words that cut through the noise when you're caught in a spiral of self-doubt.
        </p>
      </div>

      {/* Category Pills & Search */}
      <div className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search lessons (e.g. guilt, text, apology, closure)..."
            className="w-full pl-11 pr-4 py-3 rounded-xl border bg-[var(--bg-card)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/50 focus:outline-none focus:border-[#FF4F70] transition-colors"
            style={{ borderColor: 'var(--border-subtle)' }}
          />
        </div>

        {/* Categories Horizontal Scroll / Wrap */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === category
                  ? 'bg-[var(--accent-wine)] text-[#FF4F70] dark:text-[#FF7890] border border-[#FF4F70]/30 font-semibold'
                  : 'bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Active Lesson Modal / Deep Reader */}
      {activeLesson && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
          onClick={() => setActiveLessonId(null)}
        >
          <div
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-10 rounded-2xl sm:rounded-3xl border shadow-2xl space-y-6"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-accent)',
              color: 'var(--text-primary)'
            }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
              <span className="uppercase tracking-wider font-semibold text-[#FF4F70]">
                {activeLesson.category}
              </span>
              <button
                onClick={() => setActiveLessonId(null)}
                className="p-1 rounded-lg hover:bg-[var(--bg-secondary)] text-sm cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[var(--text-primary)]">
              {activeLesson.title}
            </h2>

            {/* Large Statement */}
            <div className="p-6 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
              <blockquote className="font-serif italic text-xl sm:text-2xl text-[var(--text-primary)] leading-snug">
                “{activeLesson.statement}”
              </blockquote>
            </div>

            {/* Explanation */}
            <div className="space-y-4 text-sm sm:text-base text-[var(--text-primary)] leading-relaxed font-light">
              <p>{activeLesson.explanation}</p>
            </div>

            {/* Example */}
            <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-1">
              <span className="text-xs uppercase tracking-wider font-semibold text-[var(--text-secondary)]">
                Real Situation
              </span>
              <p className="text-sm text-[var(--text-primary)] italic">
                {activeLesson.example}
              </p>
            </div>

            {/* Reflection Question */}
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#FF7890]">
                Ask Yourself Tonight
              </span>
              <p className="text-base font-serif text-[var(--text-primary)] font-medium">
                {activeLesson.reflectionQuestion}
              </p>
            </div>

            {/* Final Hard-Hitting Line */}
            <div className="p-4 rounded-xl bg-[var(--accent-wine)]/30 border border-[#FF4F70]/20 text-center">
              <p className="font-serif text-base sm:text-lg text-[var(--text-primary)] font-medium">
                {activeLesson.finalLine}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
              <button
                onClick={e => handleShareLesson(activeLesson, e)}
                className="inline-flex items-center gap-2 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedId === activeLesson.id ? 'Copied quote!' : 'Share'}</span>
              </button>

              <button
                onClick={e => handleToggleSave(activeLesson.id, e)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                  savedIds.includes(activeLesson.id)
                    ? 'border-[#FF4F70] bg-[var(--accent-wine)] text-[#FF7890]'
                    : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>{savedIds.includes(activeLesson.id) ? 'Saved' : 'Save Lesson'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lessons List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredLessons.map(lesson => {
          const isSaved = savedIds.includes(lesson.id);
          return (
            <div
              key={lesson.id}
              onClick={() => setActiveLessonId(lesson.id)}
              className="p-6 rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 hover:border-[#FF4F70]/40 flex flex-col justify-between cursor-pointer group"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-subtle)'
              }}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
                  <span className="uppercase tracking-wider font-semibold text-[#FF4F70] text-[10px]">
                    {lesson.category}
                  </span>
                  <button
                    onClick={e => handleToggleSave(lesson.id, e)}
                    className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[#FF4F70] transition-colors"
                    title={isSaved ? 'Remove from saved' : 'Save lesson'}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'text-[#FF4F70] fill-[#FF4F70]' : ''}`} />
                  </button>
                </div>

                <h3 className="font-serif text-lg font-medium text-[var(--text-primary)] group-hover:text-[#FF7890] transition-colors leading-snug">
                  {lesson.statement}
                </h3>

                <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                  {lesson.explanation}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--text-secondary)]">
                <span className="italic truncate pr-2 text-[11px]">
                  {lesson.finalLine}
                </span>
                <span className="inline-flex items-center gap-1 text-[#FF4F70] font-medium shrink-0">
                  Read <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {filteredLessons.length === 0 && (
        <div className="p-12 text-center rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <p className="font-serif text-lg text-[var(--text-primary)]">
            No lessons match your search.
          </p>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            Try a different keyword or view all categories.
          </p>
        </div>
      )}
    </div>
  );
};

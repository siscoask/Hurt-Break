import React, { useState, useEffect } from 'react';
import { NavTab, ThemeMode, LessonCategory } from './types';
import { storage } from './services/storage';
import { Navigation } from './components/Navigation';
import { OnboardingModal } from './components/OnboardingModal';
import { CrisisModal } from './components/CrisisModal';
import { HomeView } from './components/HomeView';
import { RealityCheckView } from './components/RealityCheckView';
import { LessonsView } from './components/LessonsView';
import { JournalView } from './components/JournalView';
import { MemoriesView } from './components/MemoriesView';
import { ProgressView } from './components/ProgressView';
import { BlameBoxView } from './components/BlameBoxView';
import { DontTextView } from './components/DontTextView';
import { SavedView } from './components/SavedView';
import { TalkToUsView } from './components/TalkToUsView';
import { AboutView } from './components/AboutView';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [theme, setTheme] = useState<ThemeMode>(storage.getTheme());
  const [showOnboarding, setShowOnboarding] = useState<boolean>(!storage.isOnboarded());
  const [isCrisisOpen, setIsCrisisOpen] = useState(false);
  const [activeLessonCategory, setActiveLessonCategory] = useState<LessonCategory | undefined>(undefined);

  // Sync theme mode to html element and system preference
  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      let isDark = true;
      if (theme === 'dark') {
        isDark = true;
      } else if (theme === 'light') {
        isDark = false;
      } else if (theme === 'system') {
        isDark = mediaQuery.matches;
      }

      if (isDark) {
        root.classList.add('dark');
        document.body.style.backgroundColor = '#0B090B';
      } else {
        root.classList.remove('dark');
        document.body.style.backgroundColor = '#FAF6F5';
      }
    };

    applyTheme();
    storage.setTheme(theme);

    const listener = () => {
      if (theme === 'system') applyTheme();
    };
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, [theme]);

  const handleStartOnboarding = () => {
    storage.setOnboarded(true);
    setShowOnboarding(false);
    setCurrentTab('home');
  };

  const handleNavigate = (tab: NavTab, params?: { promptCategory?: string }) => {
    if (params?.promptCategory) {
      setActiveLessonCategory(params.promptCategory as LessonCategory);
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[var(--bg-main)] text-[var(--text-primary)] transition-colors duration-200">
      {/* Onboarding Introduction Modal for first-time visitor */}
      {showOnboarding && <OnboardingModal onStart={handleStartOnboarding} />}

      {/* Safety & Crisis Helpline Support */}
      <CrisisModal isOpen={isCrisisOpen} onClose={() => setIsCrisisOpen(false)} />

      {/* Global Navigation (Sidebar on Desktop/Tablet, Bottom Bar on Mobile) */}
      <Navigation
        currentTab={currentTab}
        onSelectTab={handleNavigate}
        theme={theme}
        onToggleTheme={setTheme}
        onOpenDontText={() => handleNavigate('donttext')}
      />

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 py-6 md:py-10 max-w-6xl mx-auto w-full pb-28 md:pb-12">
        {currentTab === 'home' && (
          <HomeView onNavigate={handleNavigate} />
        )}

        {currentTab === 'reality' && (
          <RealityCheckView
            onTriggerCrisis={() => setIsCrisisOpen(true)}
            onSavedSession={() => {}}
          />
        )}

        {currentTab === 'lessons' && (
          <LessonsView initialCategory={activeLessonCategory} />
        )}

        {currentTab === 'journal' && <JournalView />}

        {currentTab === 'memories' && <MemoriesView />}

        {currentTab === 'progress' && <ProgressView onNavigate={handleNavigate} />}

        {currentTab === 'blamebox' && <BlameBoxView />}

        {currentTab === 'donttext' && <DontTextView />}

        {currentTab === 'saved' && <SavedView onNavigate={handleNavigate} />}

        {currentTab === 'talk' && <TalkToUsView />}

        {currentTab === 'about' && <AboutView />}
      </main>
    </div>
  );
}

import React from 'react';
import {
  Home,
  ShieldAlert,
  BookOpen,
  PenLine,
  Compass,
  Sparkles,
  MessageSquareOff,
  Scale,
  Bookmark,
  MessageCircle,
  Info,
  Sun,
  Moon,
  Laptop
} from 'lucide-react';
import { NavTab, ThemeMode } from '../types';
import { Logo } from './Logo';
import { PWAInstallButton } from './PWAInstallButton';

interface NavigationProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  theme: ThemeMode;
  onToggleTheme: (theme: ThemeMode) => void;
  onOpenDontText: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  onSelectTab,
  theme,
  onToggleTheme,
  onOpenDontText
}) => {
  const primaryNavItems: { id: NavTab; label: string; icon: React.ElementType }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'reality', label: 'Reality Check', icon: ShieldAlert },
    { id: 'lessons', label: 'Lessons', icon: BookOpen },
    { id: 'journal', label: 'Journal', icon: PenLine },
    { id: 'memories', label: 'Memories', icon: Compass },
    { id: 'progress', label: 'Progress', icon: Sparkles }
  ];

  const secondaryNavItems: { id: NavTab; label: string; icon: React.ElementType }[] = [
    { id: 'donttext', label: "Don't Text", icon: MessageSquareOff },
    { id: 'blamebox', label: 'Blame Box', icon: Scale },
    { id: 'saved', label: 'Saved', icon: Bookmark },
    { id: 'talk', label: 'Talk to Us', icon: MessageCircle }
  ];

  const footerNavItems: { id: NavTab; label: string; icon: React.ElementType }[] = [
    { id: 'about', label: 'About & Philosophy', icon: Info }
  ];

  const cycleTheme = () => {
    if (theme === 'dark') onToggleTheme('light');
    else if (theme === 'light') onToggleTheme('system');
    else onToggleTheme('dark');
  };

  return (
    <>
      {/* DESKTOP & TABLET SIDEBAR */}
      <aside
        className="hidden md:flex flex-col w-64 lg:w-72 shrink-0 border-r min-h-screen sticky top-0 h-screen overflow-y-auto select-none"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderColor: 'var(--border-subtle)'
        }}
      >
        {/* Brand Header */}
        <div className="p-6 pb-5 flex items-center justify-between border-b border-[var(--border-subtle)]">
          <Logo size="md" onClick={() => onSelectTab('home')} />
        </div>

        {/* Navigation Groups */}
        <div className="flex-1 px-4 py-5 space-y-6 overflow-y-auto">
          {/* Main Group */}
          <div className="space-y-1">
            <span className="px-3 text-[11px] font-semibold tracking-wider uppercase text-[var(--text-secondary)] opacity-75">
              Reflect
            </span>
            <div className="mt-1 space-y-0.5">
              {primaryNavItems.map(item => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors text-left cursor-pointer ${
                      isActive
                        ? 'bg-[var(--accent-wine)] text-[#FF4F70] dark:text-[#FF7890] font-semibold'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#FF4F70]' : ''}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="h-px bg-[var(--border-subtle)]" />

          {/* Clarity & Support Tools */}
          <div className="space-y-1">
            <span className="px-3 text-[11px] font-semibold tracking-wider uppercase text-[var(--text-secondary)] opacity-75">
              Clarity Tools
            </span>
            <div className="mt-1 space-y-0.5">
              {secondaryNavItems.map(item => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors text-left cursor-pointer ${
                      isActive
                        ? 'bg-[var(--accent-wine)] text-[#FF4F70] dark:text-[#FF7890] font-semibold'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#FF4F70]' : ''}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="h-px bg-[var(--border-subtle)]" />

          {/* About / Philosophy */}
          <div className="space-y-1">
            {footerNavItems.map(item => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors text-left cursor-pointer ${
                    isActive
                      ? 'bg-[var(--accent-wine)] text-[#FF4F70] dark:text-[#FF7890] font-semibold'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sidebar Footer: PWA Install, Theme & Late Night Quote */}
        <div className="p-4 border-t border-[var(--border-subtle)] bg-[var(--bg-card)]/50 space-y-3">
          <PWAInstallButton variant="nav" />

          <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
            <span>Theme: <strong className="capitalize text-[var(--text-primary)]">{theme}</strong></span>
            <button
              onClick={cycleTheme}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)] hover:border-[#FF4F70]/40 transition-colors text-xs font-medium cursor-pointer"
              title="Toggle theme (Dark / Light / System)"
            >
              {theme === 'dark' && <Moon className="w-3.5 h-3.5 text-[#FF7890]" />}
              {theme === 'light' && <Sun className="w-3.5 h-3.5 text-amber-500" />}
              {theme === 'system' && <Laptop className="w-3.5 h-3.5 text-[var(--text-secondary)]" />}
              <span className="capitalize">{theme}</span>
            </button>
          </div>
          <p className="text-[11px] text-[var(--text-secondary)] italic leading-tight text-center">
            “Own your part. Don't carry theirs.”
          </p>
        </div>
      </aside>

      {/* MOBILE TOP BAR */}
      <header
        className="md:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 border-b backdrop-blur-md"
        style={{
          backgroundColor: 'rgba(11, 9, 11, 0.85)',
          borderColor: 'var(--border-subtle)'
        }}
      >
        <Logo size="sm" onClick={() => onSelectTab('home')} />
        
        <div className="flex items-center gap-2">
          <PWAInstallButton variant="inline" />

          <button
            onClick={cycleTheme}
            className="p-2 rounded-lg border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Moon className="w-4 h-4 text-[#FF7890]" />
            ) : theme === 'light' ? (
              <Sun className="w-4 h-4 text-amber-500" />
            ) : (
              <Laptop className="w-4 h-4" />
            )}
          </button>
        </div>
      </header>

      {/* MOBILE FLOATING "DON'T TEXT" ACTION BUTTON */}
      <div className="md:hidden fixed bottom-20 right-4 z-40">
        <button
          onClick={onOpenDontText}
          className="flex items-center gap-2 px-4 py-3 rounded-full text-white font-medium text-xs shadow-xl transition-all duration-200 active:scale-95 cursor-pointer"
          style={{
            backgroundColor: 'var(--accent-primary)',
            boxShadow: '0 8px 24px rgba(255, 79, 112, 0.35)'
          }}
          aria-label="Don't Text Them Yet"
        >
          <MessageSquareOff className="w-4 h-4" />
          <span>Don't Text</span>
        </button>
      </div>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 grid grid-cols-5 items-center h-16 border-t backdrop-blur-lg select-none pb-safe"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderColor: 'var(--border-subtle)'
        }}
      >
        <button
          onClick={() => onSelectTab('home')}
          className={`flex flex-col items-center justify-center h-full min-h-[44px] cursor-pointer transition-colors ${
            currentTab === 'home' ? 'text-[#FF4F70]' : 'text-[var(--text-secondary)]'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-1">Home</span>
        </button>

        <button
          onClick={() => onSelectTab('reality')}
          className={`flex flex-col items-center justify-center h-full min-h-[44px] cursor-pointer transition-colors ${
            currentTab === 'reality' ? 'text-[#FF4F70]' : 'text-[var(--text-secondary)]'
          }`}
        >
          <ShieldAlert className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-1">Reality</span>
        </button>

        <button
          onClick={() => onSelectTab('lessons')}
          className={`flex flex-col items-center justify-center h-full min-h-[44px] cursor-pointer transition-colors ${
            currentTab === 'lessons' ? 'text-[#FF4F70]' : 'text-[var(--text-secondary)]'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-1">Lessons</span>
        </button>

        <button
          onClick={() => onSelectTab('journal')}
          className={`flex flex-col items-center justify-center h-full min-h-[44px] cursor-pointer transition-colors ${
            currentTab === 'journal' ? 'text-[#FF4F70]' : 'text-[var(--text-secondary)]'
          }`}
        >
          <PenLine className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-1">Journal</span>
        </button>

        <button
          onClick={() => onSelectTab('about')}
          className={`flex flex-col items-center justify-center h-full min-h-[44px] cursor-pointer transition-colors ${
            currentTab === 'about' || currentTab === 'saved' || currentTab === 'talk'
              ? 'text-[#FF4F70]'
              : 'text-[var(--text-secondary)]'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-1">You</span>
        </button>
      </nav>
    </>
  );
};

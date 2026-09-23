import React, { useState } from 'react';
import {
  ArrowRight,
  Bookmark,
  Check,
  Share2,
  HeartCrack,
  Flame,
  MessageSquareOff,
  HelpCircle,
  PenLine,
  ShieldAlert
} from 'lucide-react';
import { NavTab, DailyReminder } from '../types';
import { getTodayDrop } from '../data/dailyDrops';
import { storage } from '../services/storage';
import { ButIDidTool } from './ButIDidTool';

interface HomeViewProps {
  onNavigate: (tab: NavTab, params?: { promptCategory?: string }) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const [todayDrop] = useState<DailyReminder>(getTodayDrop());
  const [isSavedDrop, setIsSavedDrop] = useState<boolean>(storage.isDropSaved(todayDrop.id));
  const [copiedNotification, setCopiedNotification] = useState(false);

  const handleToggleSaveDrop = () => {
    const newState = storage.toggleSavedDrop(todayDrop);
    setIsSavedDrop(newState);
  };

  const handleShareDrop = async () => {
    const textToShare = `“${todayDrop.text}” — HurtBreak`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'HurtBreak Daily Reflection',
          text: textToShare,
          url: window.location.href
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(textToShare);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2200);
    }
  };

  const quickActions = [
    {
      id: 'blame',
      label: 'I blame myself',
      sub: 'Separate genuine mistakes from carried guilt',
      icon: HeartCrack,
      action: () => onNavigate('reality')
    },
    {
      id: 'miss',
      label: 'I miss them',
      sub: 'Missing them does not mean you should return',
      icon: HelpCircle,
      action: () => onNavigate('lessons', { promptCategory: 'When you miss them' })
    },
    {
      id: 'angry',
      label: "I'm angry",
      sub: 'What is yours to carry and what was their choice',
      icon: Flame,
      action: () => onNavigate('blamebox')
    },
    {
      id: 'text',
      label: 'I want to text them',
      sub: 'Put the words here first before you press send',
      icon: MessageSquareOff,
      action: () => onNavigate('donttext')
    },
    {
      id: 'confused',
      label: "I'm confused",
      sub: 'Untangle the narrative step by step',
      icon: ShieldAlert,
      action: () => onNavigate('reality')
    },
    {
      id: 'release',
      label: 'I just need to let it out',
      sub: 'Private, encrypted on this device',
      icon: PenLine,
      action: () => onNavigate('journal')
    }
  ];

  return (
    <div className="space-y-10 sm:space-y-14 max-w-4xl mx-auto pb-12">
      {/* INTIMATE LATE NIGHT HEADER */}
      <section className="space-y-2 pt-2 sm:pt-4">
        <span className="text-xs font-medium tracking-wider uppercase text-[var(--text-secondary)]">
          Late Night Clarity
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-[var(--text-primary)]">
          Hey.
        </h1>
        <p className="font-serif italic text-2xl sm:text-3xl text-[#FF7890] dark:text-[#FF7890]">
          What's hurting tonight?
        </p>
      </section>

      {/* SIX ELEGANT QUICK ACTIONS */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {quickActions.map(action => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={action.action}
                className="group p-5 rounded-2xl border text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-[#FF4F70]/40 flex flex-col justify-between cursor-pointer"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-subtle)'
                }}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[var(--bg-secondary)] text-[#FF4F70] group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-[var(--text-secondary)] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[var(--text-primary)] group-hover:text-[#FF4F70] transition-colors mb-1">
                    {action.label}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                    {action.sub}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* HERO FEATURE: REALITY CHECK */}
      <section>
        <div
          className="relative overflow-hidden p-7 sm:p-10 rounded-2xl sm:rounded-3xl border shadow-xl transition-all duration-300"
          style={{
            backgroundColor: 'var(--bg-elevated)',
            borderColor: 'var(--border-accent)'
          }}
        >
          {/* Subtle atmospheric glow */}
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-[#FF4F70]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#FF4F70]">
              The Core Tool
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-medium tracking-tight text-[var(--text-primary)]">
              WAS IT REALLY MY FAULT?
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              Something happened and you don't know who's really at fault? Let's break it down without sugarcoating and without self-hatred.
            </p>

            <div className="pt-3">
              <button
                onClick={() => onNavigate('reality')}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm sm:text-base font-medium text-white transition-all duration-200 shadow-lg hover:shadow-[#FF4F70]/30 active:scale-[0.98] cursor-pointer"
                style={{ backgroundColor: 'var(--accent-primary)' }}
              >
                <span>Start Reality Check</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* TONIGHT'S REMINDER (DAILY DROP) */}
      <section>
        <div
          className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl border transition-all duration-200"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-subtle)'
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold tracking-wider uppercase text-[var(--text-secondary)]">
              Tonight's Reminder
            </span>
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={handleShareDrop}
                className="p-2 rounded-lg border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                title="Share this reminder"
                aria-label="Share"
              >
                {copiedNotification ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Share2 className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={handleToggleSaveDrop}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                  isSavedDrop
                    ? 'border-[#FF4F70] bg-[var(--accent-wine)] text-[#FF7890]'
                    : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
                aria-label="Save Reminder"
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>{isSavedDrop ? 'Saved' : 'Save'}</span>
              </button>
            </div>
          </div>

          <blockquote className="font-serif text-xl sm:text-2xl text-[var(--text-primary)] leading-snug my-3">
            “{todayDrop.text}”
          </blockquote>

          {todayDrop.subtext && (
            <p className="font-serif italic text-sm sm:text-base text-[#FF7890] mt-2">
              {todayDrop.subtext}
            </p>
          )}

          {copiedNotification && (
            <p className="text-xs text-emerald-400 mt-2">Copied reflection to clipboard.</p>
          )}
        </div>
      </section>

      {/* "BUT I DID..." SECTION */}
      <section>
        <ButIDidTool onGoToJournal={() => onNavigate('journal')} />
      </section>
    </div>
  );
};

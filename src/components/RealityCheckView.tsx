import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Bookmark,
  Check,
  Share2,
  ShieldAlert,
  HelpCircle,
  Users,
  User,
  HeartHandshake
} from 'lucide-react';
import { RealityCheckAnswers, RealityCheckBreakdown, RealityCheckSession } from '../types';
import { generateBreakdown } from '../services/realityCheckEngine';
import { storage } from '../services/storage';

interface RealityCheckViewProps {
  onTriggerCrisis?: () => void;
  onSavedSession?: () => void;
}

const QUESTIONS = [
  {
    id: 1,
    title: 'Okay. Tell me what happened.',
    supporting: "Don't make yourself look good. Don't make them look bad. Just tell it how you remember it.",
    field: 'story' as keyof RealityCheckAnswers,
    placeholder: 'e.g. We had plans on Friday, they canceled at the last minute, and when I asked why, things escalated quickly...'
  },
  {
    id: 2,
    title: 'What did YOU do?',
    supporting: 'Be honest. Even the part you don\'t like.',
    field: 'userAction' as keyof RealityCheckAnswers,
    placeholder: 'e.g. I got defensive, brought up something from three weeks ago, and stopped answering their calls...'
  },
  {
    id: 3,
    title: 'What did THEY do?',
    supporting: 'What were their actual actions and choices?',
    field: 'theirAction' as keyof RealityCheckAnswers,
    placeholder: 'e.g. They went cold, called me crazy for being upset, and disappeared until the next morning...'
  },
  {
    id: 4,
    title: 'What did they say was your fault?',
    supporting: 'What was the accusation or blame they put on your shoulders?',
    field: 'theirAccusation' as keyof RealityCheckAnswers,
    placeholder: 'e.g. They said I ruin every weekend, that I am too needy, and that I pushed them away...'
  },
  {
    id: 5,
    title: 'What are YOU blaming yourself for?',
    supporting: 'What thought is keeping you awake at 2 AM?',
    field: 'userSelfBlame' as keyof RealityCheckAnswers,
    placeholder: 'e.g. I keep thinking that if I had just kept quiet and said nothing, we would still be okay...'
  },
  {
    id: 6,
    title: 'If your best friend told you this exact story, what would you tell them?',
    supporting: 'Step outside your head for thirty seconds. What would you tell someone you genuinely love?',
    field: 'friendAdvice' as keyof RealityCheckAnswers,
    placeholder: 'e.g. I would tell them that while they shouldn\'t have snapped, they had a right to be hurt, and they didn\'t deserve to be ignored...'
  }
];

export const RealityCheckView: React.FC<RealityCheckViewProps> = ({
  onTriggerCrisis,
  onSavedSession
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<RealityCheckAnswers>({
    story: '',
    userAction: '',
    theirAction: '',
    theirAccusation: '',
    userSelfBlame: '',
    friendAdvice: ''
  });
  const [breakdown, setBreakdown] = useState<RealityCheckBreakdown | null>(null);
  const [savedSessionId, setSavedSessionId] = useState<string | null>(null);
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Safety trigger detection (non-punitive check)
  useEffect(() => {
    const combined = Object.values(answers).join(' ').toLowerCase();
    if (
      combined.includes('kill myself') ||
      combined.includes('end my life') ||
      combined.includes('suicide') ||
      combined.includes('want to die')
    ) {
      if (onTriggerCrisis) onTriggerCrisis();
    }
  }, [answers, onTriggerCrisis]);

  const currentQ = QUESTIONS[currentStep];

  const handleNext = () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Complete flow: Generate The Breakdown
      const result = generateBreakdown(answers);
      setBreakdown(result);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleStartAnother = () => {
    setAnswers({
      story: '',
      userAction: '',
      theirAction: '',
      theirAccusation: '',
      userSelfBlame: '',
      friendAdvice: ''
    });
    setBreakdown(null);
    setCurrentStep(0);
    setSavedSessionId(null);
  };

  const handleSaveBreakdown = () => {
    if (!breakdown) return;
    const session: RealityCheckSession = {
      id: 'session-' + Date.now(),
      timestamp: new Date().toISOString(),
      answers,
      breakdown,
      saved: true
    };
    storage.saveRealitySession(session);
    setSavedSessionId(session.id);
    if (onSavedSession) onSavedSession();
  };

  const handleShareBreakdown = async () => {
    if (!breakdown) return;
    const textToShare = `The Breakdown — HurtBreak\n\n"${breakdown.readThisAgain}"\n\nOwn what was yours. Let go of what wasn't.`;
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(textToShare);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2200);
    }
  };

  // STEPPING FLOW (QUESTIONS 1 - 6)
  if (!breakdown) {
    const currentVal = answers[currentQ.field];
    const isStepValid = currentVal.trim().length > 2;

    return (
      <div className="max-w-3xl mx-auto py-4 sm:py-8 space-y-8">
        {/* Step Header & Subtle Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
            <span className="font-semibold uppercase tracking-wider text-[#FF4F70]">
              Reality Check
            </span>
            <span>Question {currentStep + 1} of {QUESTIONS.length}</span>
          </div>

          {/* Subtle Progress Bar */}
          <div className="w-full h-1 bg-[var(--border-subtle)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#FF4F70] transition-all duration-300 rounded-full"
              style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div
          className="p-6 sm:p-10 rounded-2xl sm:rounded-3xl border shadow-xl transition-all duration-300 space-y-6"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-subtle)'
          }}
        >
          <div className="space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[var(--text-primary)] leading-snug">
              {currentQ.title}
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed font-light">
              {currentQ.supporting}
            </p>
          </div>

          {/* Large Text Area */}
          <div>
            <textarea
              rows={6}
              value={currentVal}
              onChange={e =>
                setAnswers(prev => ({ ...prev, [currentQ.field]: e.target.value }))
              }
              placeholder={currentQ.placeholder}
              className="w-full p-4 rounded-xl border bg-[var(--bg-secondary)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/40 focus:outline-none focus:border-[#FF4F70] transition-colors resize-y text-base leading-relaxed"
              style={{ borderColor: 'var(--border-subtle)' }}
              autoFocus
            />
          </div>

          {/* Nav Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--border-subtle)] text-xs sm:text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] disabled:opacity-0 disabled:pointer-events-none transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={handleNext}
              disabled={!isStepValid}
              className="inline-flex items-center gap-2.5 px-7 py-3 rounded-xl text-white text-sm sm:text-base font-medium transition-all duration-200 shadow-md hover:shadow-[#FF4F70]/25 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              style={{ backgroundColor: 'var(--accent-primary)' }}
            >
              <span>{currentStep === QUESTIONS.length - 1 ? 'Analyze Breakdown' : 'Continue'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quiet reassurance footer */}
        <p className="text-center text-xs text-[var(--text-secondary)] italic">
          Take your time. No one else is judging what you write here.
        </p>
      </div>
    );
  }

  // THE BREAKDOWN VIEW
  return (
    <div className="max-w-4xl mx-auto py-4 sm:py-8 space-y-10 animate-fadeIn pb-16">
      {/* Top Banner */}
      <div className="text-center space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#FF4F70]">
          Clear Reflection
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-[var(--text-primary)]">
          The Breakdown
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-xl mx-auto font-light">
          This is not a verdict. HurtBreak is a mirror, not a judge. Here is what belongs to you, what belongs to them, and what is beyond knowing.
        </p>
      </div>

      {/* 4 CORE SECTIONS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* 1. YOUR PART */}
        <div
          className="p-6 rounded-2xl border flex flex-col justify-between"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-subtle)'
          }}
        >
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 text-[#FF4F70]">
              <User className="w-5 h-5" />
              <h3 className="font-serif text-xl font-medium uppercase tracking-wide">
                Your Part
              </h3>
            </div>
            <p className="text-xs text-[var(--text-secondary)]">
              Things you can genuinely own without self-punishment.
            </p>
            <div className="space-y-2.5 pt-2">
              {breakdown.yourPart.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] leading-relaxed">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. THEIR PART */}
        <div
          className="p-6 rounded-2xl border flex flex-col justify-between"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-subtle)'
          }}
        >
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 text-[#FF7890]">
              <ShieldAlert className="w-5 h-5" />
              <h3 className="font-serif text-xl font-medium uppercase tracking-wide">
                Their Part
              </h3>
            </div>
            <p className="text-xs text-[var(--text-secondary)]">
              Things that belong entirely to the other person's agency.
            </p>
            <div className="space-y-2.5 pt-2">
              {breakdown.theirPart.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] leading-relaxed">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. BOTH */}
        <div
          className="p-6 rounded-2xl border flex flex-col justify-between"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-subtle)'
          }}
        >
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 text-[var(--text-primary)]">
              <Users className="w-5 h-5 text-[#FF4F70]" />
              <h3 className="font-serif text-xl font-medium uppercase tracking-wide">
                Both
              </h3>
            </div>
            <p className="text-xs text-[var(--text-secondary)]">
              Where responsibility was shared or dynamic.
            </p>
            <div className="space-y-2.5 pt-2">
              {breakdown.both.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] leading-relaxed">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. UNCLEAR */}
        <div
          className="p-6 rounded-2xl border flex flex-col justify-between"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-subtle)'
          }}
        >
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 text-[var(--text-secondary)]">
              <HelpCircle className="w-5 h-5 text-[#FF7890]" />
              <h3 className="font-serif text-xl font-medium uppercase tracking-wide">
                Unclear
              </h3>
            </div>
            <p className="text-xs text-[var(--text-secondary)]">
              Things that cannot honestly be proven from one side.
            </p>
            <div className="space-y-2.5 pt-2">
              {breakdown.unclear.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* READ THIS AGAIN (LARGE EMOTIONAL STATEMENT) */}
      <div
        className="p-8 sm:p-12 rounded-2xl sm:rounded-3xl border shadow-xl text-center space-y-4 relative overflow-hidden"
        style={{
          backgroundColor: 'var(--bg-elevated)',
          borderColor: 'var(--border-accent)'
        }}
      >
        <span className="text-xs font-semibold uppercase tracking-widest text-[#FF4F70]">
          Read This Again
        </span>
        <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[var(--text-primary)] font-medium leading-snug max-w-2xl mx-auto">
          “{breakdown.readThisAgain}”
        </blockquote>
        <p className="font-serif italic text-base sm:text-lg text-[#FF7890]">
          Own your part. Don't carry theirs.
        </p>
      </div>

      {/* ACTION BAR */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[var(--border-subtle)]">
        <button
          onClick={handleStartAnother}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--border-subtle)] hover:bg-[var(--bg-card)] text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Start Another Reality Check</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShareBreakdown}
            className="p-2.5 rounded-xl border border-[var(--border-subtle)] hover:bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            title="Copy reflection statement"
          >
            {copiedNotification ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          </button>

          <button
            onClick={handleSaveBreakdown}
            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              savedSessionId
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-white shadow-lg'
            }`}
            style={{
              backgroundColor: savedSessionId ? '#059669' : 'var(--accent-primary)'
            }}
          >
            {savedSessionId ? (
              <>
                <Check className="w-4 h-4" />
                <span>Saved to Progress</span>
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4" />
                <span>Save This Breakdown</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

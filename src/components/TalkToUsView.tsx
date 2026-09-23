import React, { useState } from 'react';
import { MessageSquare, Lightbulb, Mail, Send, ExternalLink, Shield } from 'lucide-react';

type FeedbackType = 'I need to talk' | 'Feature suggestion' | 'Bug report' | 'General feedback';

export const TalkToUsView: React.FC = () => {
  const [selectedType, setSelectedType] = useState<FeedbackType>('I need to talk');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const WHATSAPP_NUMBER = '08128197651';
  // International format for wa.me URL (often Nigeria +234 812 819 751 or direct clean digits)
  // To ensure maximum device compatibility:
  const cleanPhone = WHATSAPP_NUMBER.startsWith('0')
    ? '234' + WHATSAPP_NUMBER.substring(1)
    : WHATSAPP_NUMBER;

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const formattedMessage = [
      `*HurtBreak Message*`,
      `Type: ${selectedType}`,
      name.trim() ? `From: ${name.trim()}` : null,
      email.trim() ? `Email: ${email.trim()}` : null,
      `-----------------------`,
      message.trim()
    ]
      .filter(Boolean)
      .join('\n');

    const encoded = encodeURIComponent(formattedMessage);
    const url = `https://wa.me/${cleanPhone}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-3xl mx-auto py-4 sm:py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#FF4F70]">
          Direct Channel
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-[var(--text-primary)]">
          TALK TO US
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] font-light max-w-xl">
          Whether you need a listening ear at 2 AM or have a thought on how to make HurtBreak clearer, we are right here.
        </p>
      </div>

      {/* TWO INTENT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Card 1 */}
        <div
          onClick={() => setSelectedType('I need to talk')}
          className={`p-6 rounded-2xl border cursor-pointer transition-all ${
            selectedType === 'I need to talk'
              ? 'border-[#FF4F70] bg-[var(--accent-wine)]/40 shadow-md'
              : 'border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[#FF4F70]/40'
          }`}
        >
          <div className="flex items-center gap-2.5 text-[#FF4F70] mb-2">
            <span className="text-2xl" role="img" aria-label="hug">🫂</span>
            <h3 className="font-serif text-xl font-medium text-[var(--text-primary)]">
              I NEED TO TALK
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
            Something on your mind? Tell Sisco. No judgment, no canned advice.
          </p>
        </div>

        {/* Card 2 */}
        <div
          onClick={() => setSelectedType('Feature suggestion')}
          className={`p-6 rounded-2xl border cursor-pointer transition-all ${
            selectedType === 'Feature suggestion'
              ? 'border-[#FF4F70] bg-[var(--accent-wine)]/40 shadow-md'
              : 'border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[#FF4F70]/40'
          }`}
        >
          <div className="flex items-center gap-2.5 text-[#FF7890] mb-2">
            <span className="text-2xl" role="img" aria-label="bulb">💡</span>
            <h3 className="font-serif text-xl font-medium text-[var(--text-primary)]">
              I HAVE AN IDEA
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
            Have an idea that could make HurtBreak better? A lesson theme or a missing reflection?
          </p>
        </div>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSendWhatsApp}
        className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl border shadow-xl space-y-5"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-subtle)'
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] block mb-1">
              Name or Nickname (Optional)
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Alex"
              className="w-full px-3.5 py-2.5 rounded-xl border bg-[var(--bg-secondary)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/40 focus:outline-none focus:border-[#FF4F70]"
              style={{ borderColor: 'var(--border-subtle)' }}
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] block mb-1">
              Email (Optional)
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="e.g. alex@example.com"
              className="w-full px-3.5 py-2.5 rounded-xl border bg-[var(--bg-secondary)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/40 focus:outline-none focus:border-[#FF4F70]"
              style={{ borderColor: 'var(--border-subtle)' }}
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] block mb-1">
            Category
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(
              [
                'I need to talk',
                'Feature suggestion',
                'Bug report',
                'General feedback'
              ] as FeedbackType[]
            ).map(type => (
              <button
                type="button"
                key={type}
                onClick={() => setSelectedType(type)}
                className={`py-2 px-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer text-center truncate ${
                  selectedType === type
                    ? 'bg-[var(--accent-wine)] text-[#FF4F70] dark:text-[#FF7890] border border-[#FF4F70]/40'
                    : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:text-[var(--text-primary)]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] block mb-1">
            Your Message
          </label>
          <textarea
            rows={5}
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Write what is on your mind. Take all the space you need..."
            className="w-full p-3.5 rounded-xl border bg-[var(--bg-secondary)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/40 focus:outline-none focus:border-[#FF4F70] resize-y leading-relaxed"
            style={{ borderColor: 'var(--border-subtle)' }}
            required
          />
        </div>

        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[var(--border-subtle)]">
          <div className="text-xs text-[var(--text-secondary)] space-y-0.5">
            <p>Direct WhatsApp: <strong className="text-[var(--text-primary)]">{WHATSAPP_NUMBER}</strong></p>
            <p>
              Email: <a href="mailto:siscoask@gmail.com" className="text-[#FF7890] hover:underline">siscoask@gmail.com</a>
            </p>
          </div>

          <button
            type="submit"
            disabled={!message.trim()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-medium transition-all shadow-md hover:shadow-[#FF4F70]/30 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            style={{ backgroundColor: 'var(--accent-primary)' }}
          >
            <Send className="w-4 h-4" />
            <span>SEND VIA WHATSAPP</span>
          </button>
        </div>
      </form>
    </div>
  );
};

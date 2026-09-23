import React from 'react';
import { Logo } from './Logo';
import { ExternalLink, Mail, MessageSquare, Shield, Heart } from 'lucide-react';

export const AboutView: React.FC = () => {
  const WHATSAPP_NUMBER = '08128197651';
  const cleanPhone = WHATSAPP_NUMBER.startsWith('0')
    ? '234' + WHATSAPP_NUMBER.substring(1)
    : WHATSAPP_NUMBER;

  return (
    <div className="max-w-3xl mx-auto py-4 sm:py-8 space-y-10">
      {/* Brand Hero */}
      <div className="text-center space-y-4 pt-2">
        <div className="flex justify-center mb-2">
          <Logo size="lg" showWordmark={false} />
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-[var(--text-primary)]">
          Hurt<span className="text-[#FF4F70]">Break</span>
        </h1>
        <p className="font-serif italic text-xl sm:text-2xl text-[#FF7890]">
          Know what was yours. Let go of what wasn’t.
        </p>
      </div>

      {/* PHILOSOPHY CARD */}
      <div
        className="p-6 sm:p-10 rounded-2xl sm:rounded-3xl border shadow-xl space-y-6"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-subtle)'
        }}
      >
        <div className="space-y-4 text-sm sm:text-base text-[var(--text-primary)] leading-relaxed font-light">
          <p>
            HurtBreak was built for anyone lying awake at 1:43 AM trying to reconstruct a relationship that broke into pieces.
          </p>
          <p>
            Most heartbreak advice gives you cheap cheerleading: telling you that you did nothing wrong and your ex was a villain. Other times, your own racing thoughts tell you that everything was your fault and you ruined the only thing that mattered.
          </p>
          <p className="font-serif italic text-lg sm:text-xl text-[#FF7890] font-medium">
            Neither is the truth. The truth is: you can own where you fell short without accepting the blame for someone else’s choices.
          </p>
          <p>
            The emotional destination is not revenge. It is not numbness. It is:
          </p>
          <div className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-center font-serif text-base sm:text-lg font-medium text-[var(--text-primary)]">
            “I know what was mine. I'm not carrying the rest.”
          </div>
        </div>
      </div>

      {/* BUILT BY SISCO & CONTACT */}
      <div
        className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl border space-y-6"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-subtle)'
        }}
      >
        <div className="space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#FF4F70]">
            The Maker
          </span>
          <h2 className="font-serif text-2xl font-medium text-[var(--text-primary)]">
            Built by Sisco
          </h2>
        </div>

        {/* Contact Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <a
            href={`https://wa.me/${cleanPhone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] hover:border-[#FF4F70]/40 transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-[#FF4F70] shrink-0" />
            <div>
              <p className="text-xs text-[var(--text-secondary)]">WhatsApp</p>
              <p className="font-medium text-[var(--text-primary)]">{WHATSAPP_NUMBER}</p>
            </div>
            <ExternalLink className="w-3.5 h-3.5 ml-auto text-[var(--text-secondary)]" />
          </a>

          <a
            href="mailto:siscoask@gmail.com"
            className="flex items-center gap-3 p-3.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] hover:border-[#FF4F70]/40 transition-colors"
          >
            <Mail className="w-4 h-4 text-[#FF4F70] shrink-0" />
            <div>
              <p className="text-xs text-[var(--text-secondary)]">Email</p>
              <p className="font-medium text-[var(--text-primary)]">siscoask@gmail.com</p>
            </div>
            <ExternalLink className="w-3.5 h-3.5 ml-auto text-[var(--text-secondary)]" />
          </a>
        </div>

        {/* Social Links */}
        <div className="space-y-2 pt-2 border-t border-[var(--border-subtle)]">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] block">
            Follow Sisco
          </span>
          <div className="flex flex-wrap gap-2.5">
            <a
              href="https://x.com/siscoask"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)] hover:border-[#FF4F70] text-xs font-medium text-[var(--text-primary)] transition-colors"
            >
              <span>X (@siscoask)</span>
              <ExternalLink className="w-3 h-3 text-[var(--text-secondary)]" />
            </a>

            <a
              href="https://www.tiktok.com/@siscoask"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)] hover:border-[#FF4F70] text-xs font-medium text-[var(--text-primary)] transition-colors"
            >
              <span>TikTok (@siscoask)</span>
              <ExternalLink className="w-3 h-3 text-[var(--text-secondary)]" />
            </a>

            <a
              href="https://github.com/siscoask"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)] hover:border-[#FF4F70] text-xs font-medium text-[var(--text-primary)] transition-colors"
            >
              <span>GitHub (@siscoask)</span>
              <ExternalLink className="w-3 h-3 text-[var(--text-secondary)]" />
            </a>
          </div>
        </div>
      </div>

      {/* ETHICAL DISCLAIMER & SAFETY */}
      <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)]/50 space-y-2 text-xs text-[var(--text-secondary)] leading-relaxed">
        <div className="flex items-center gap-2 text-[var(--text-primary)] font-medium">
          <Shield className="w-4 h-4 text-[#FF4F70]" />
          <span>Responsible Design & Safety Note</span>
        </div>
        <p>
          HurtBreak is a self-reflection tool designed to foster emotional accountability and mental clarity. It is not a substitute for licensed psychological therapy or clinical psychiatric intervention. We do not diagnose personality disorders or label individuals. If you are experiencing acute emotional crisis, please reach out to licensed emergency mental health professionals.
        </p>
      </div>
    </div>
  );
};

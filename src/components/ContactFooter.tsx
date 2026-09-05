import React, { useState, useEffect } from 'react';
import {
  ArrowUpRight,
  Mail,
  Github,
  Globe,
  Check,
  Copy,
  FileText,
  Send,
  Clock,
  Sparkles,
  AlertCircle,
  Loader2,
  ExternalLink,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import {
  sendDirectEmail,
  TARGET_EMAIL,
  getMailtoFallbackUrl,
  getGmailWebComposeUrl,
  getGasWebhookUrl,
} from '../lib/sendContactEmail';
import GoogleScriptGuideModal from './GoogleScriptGuideModal';

interface ContactFooterProps {
  onOpenResume: () => void;
}

export default function ContactFooter({ onOpenResume }: ContactFooterProps) {
  const [copied, setCopied] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState('');
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [hasWebhook, setHasWebhook] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  useEffect(() => {
    setHasWebhook(Boolean(getGasWebhookUrl()));
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time in Indian Standard Time (IST)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setCurrentTime(now.toLocaleTimeString('en-US', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyDraft = () => {
    const draft = `From: ${contactName || 'Visitor'} <${contactEmail || 'No email'}>
Message:
${contactMessage || ''}`;
    navigator.clipboard.writeText(draft);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2500);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setErrorMessage(null);

    const payload = {
      name: contactName.trim(),
      email: contactEmail.trim(),
      message: contactMessage.trim(),
    };

    const webhookUrl = getGasWebhookUrl();

    if (!webhookUrl) {
      // If webhook isn't configured yet, launch Gmail Web directly with drafted message
      setSubmitting(false);
      window.open(getGmailWebComposeUrl(payload), '_blank', 'noopener,noreferrer');
      setFormSent(true);
      setStatusMessage('Your message draft has been opened in your email client. Please review and send.');
      return;
    }

    const result = await sendDirectEmail(payload);
    setSubmitting(false);

    if (result.success) {
      setFormSent(true);
      setStatusMessage(result.message);
      setContactName('');
      setContactEmail('');
      setContactMessage('');
    } else {
      setErrorMessage(result.message);
    }
  };

  return (
    <footer id="contact" className="relative bg-[#0b0b0b] text-white pt-24 sm:pt-32 pb-12 overflow-hidden">
      {/* Dark Architectural Grid Guides */}
      <div className="architectural-grid dark-grid">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header Meta */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-neutral-800 text-xs font-mono tracking-widest text-neutral-400 uppercase">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-600 inline-block" />
            <span>06 // TRANSMISSION & INQUIRIES</span>
            <span className="text-neutral-700">/</span>
            <span>GET IN TOUCH</span>
          </div>
          <div className="flex items-center gap-2 text-neutral-400">
            <Clock size={12} />
            <span>IST (UTC+5:30): {currentTime || 'Loading...'}</span>
          </div>
        </div>

        {/* Giant Manifesto CTA matching Brikken */}
        <div className="pt-12 sm:pt-16 pb-16 space-y-6 max-w-4xl">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight uppercase leading-[0.95] text-white">
            Have something worth shaping?
          </h2>
          <p className="text-lg sm:text-xl text-neutral-400 max-w-2xl leading-relaxed">
            Whether you are recruiting for an SDE role, building a deep learning research initiative, or looking for an engineer to architect high-stakes software—let’s talk.
          </p>
        </div>

        {/* Contact Matrix: Direct Channels & Interactive Quick Dispatch */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20 border-b border-neutral-800">
          {/* Left Column: Direct Contacts & Resume Download (6 cols) */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <div className="text-xs font-mono uppercase tracking-widest text-blue-500 font-semibold">
                DIRECT INBOX
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white hover:text-blue-400 transition-colors break-all"
                >
                  {PERSONAL_INFO.email}
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors shrink-0"
                  title="Copy email to clipboard"
                >
                  {copied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
                </button>
              </div>
              {copied && (
                <span className="text-xs font-mono text-emerald-400 animate-in fade-in block">
                  ✓ Email address copied to clipboard.
                </span>
              )}
            </div>

            {/* Quick Actions & Profiles */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                PROFILES & DOCUMENTS
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-600 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Github size={18} className="text-neutral-400 group-hover:text-white" />
                    <div>
                      <div className="text-xs font-bold text-white">GitHub</div>
                      <div className="text-[11px] text-neutral-400">@Nagpal-11</div>
                    </div>
                  </div>
                  <ArrowUpRight size={14} className="text-neutral-500 group-hover:text-white" />
                </a>

                <button
                  onClick={onOpenResume}
                  className="flex items-center justify-between p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-600 transition-colors group text-left"
                >
                  <div className="flex items-center gap-3">
                    <FileText size={18} className="text-neutral-400 group-hover:text-white" />
                    <div>
                      <div className="text-xs font-bold text-white">Curriculum Vitae</div>
                      <div className="text-[11px] text-neutral-400">Detailed SDE Resume</div>
                    </div>
                  </div>
                  <ArrowUpRight size={14} className="text-neutral-500 group-hover:text-white" />
                </button>
              </div>
            </div>

            {/* Location & Alma Mater Info */}
            <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 text-xs space-y-3 font-mono">
              <div>
                <div className="text-white font-bold text-sm font-sans">Ekjot Nagpal</div>
                <div className="text-blue-400 text-[11px]">Software Engineer &amp; AI Researcher</div>
              </div>
              <div className="space-y-1 pt-1 border-t border-neutral-800/80">
                <div className="text-neutral-400 uppercase tracking-wider text-[10px]">CURRENT BASE &amp; AFFILIATION</div>
                <div className="text-white font-bold text-sm">Department of Computer Engineering</div>
                <div className="text-neutral-400">Mizoram University (Central University, NAAC 'A' Grade)</div>
                <div className="text-neutral-500 text-[11px] pt-0.5">Permanent Residence: Shimla, Himachal Pradesh, India</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Quick Dispatch Form (6 cols) */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl bg-neutral-900/90 border border-neutral-800 p-6 sm:p-8 space-y-6">
              <div className="space-y-1.5">
                <h4 className="text-lg font-bold text-white">Send Direct Message</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Available for software engineering roles, deep learning initiatives, and technical collaborations. Send a message to connect directly.
                </p>
              </div>

              {formSent ? (
                <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-4 animate-in fade-in">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check size={24} />
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-white text-base">Message Sent Successfully</div>
                    <p className="text-xs text-neutral-300 leading-relaxed max-w-md mx-auto">
                      {statusMessage || 'Thank you for reaching out. Ekjot has received your note and typically responds within 24 hours.'}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => setFormSent(false)}
                      className="px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-200 flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2">
                        <AlertCircle size={16} className="text-rose-400 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold text-rose-300">Transmission Alert</div>
                          <div>{errorMessage}</div>
                        </div>
                      </div>
                      <a
                        href={getGmailWebComposeUrl({ name: contactName, email: contactEmail, message: contactMessage })}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-lg bg-rose-900/80 hover:bg-rose-800 text-[11px] font-bold text-white shrink-0 inline-flex items-center gap-1"
                      >
                        <span>Gmail Web</span>
                        <ExternalLink size={10} />
                      </a>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono uppercase text-neutral-400">
                      Your Name / Company
                    </label>
                    <input
                      type="text"
                      required
                      disabled={submitting}
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Alex Vance · DeepMind or Tech Corp"
                      className="w-full rounded-xl bg-neutral-950 border border-neutral-800 px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-blue-500 disabled:opacity-50"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono uppercase text-neutral-400">
                      Your Email Address
                    </label>
                    <input
                      type="email"
                      required
                      disabled={submitting}
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="w-full rounded-xl bg-neutral-950 border border-neutral-800 px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-blue-500 disabled:opacity-50"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-mono uppercase text-neutral-400">
                        Project Scope or Role Details
                      </label>
                      <button
                        type="button"
                        onClick={handleCopyDraft}
                        className="text-[10px] text-neutral-500 hover:text-neutral-300 font-mono flex items-center gap-1 transition-colors"
                      >
                        {copiedDraft ? (
                          <>
                            <Check size={10} className="text-emerald-400" />
                            <span className="text-emerald-400">Copied note</span>
                          </>
                        ) : (
                          <>
                            <Copy size={10} />
                            <span>Copy note</span>
                          </>
                        )}
                      </button>
                    </div>
                    <textarea
                      rows={3}
                      required
                      disabled={submitting}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Tell me about the engineering challenge, team, or opportunity..."
                      className="w-full rounded-xl bg-neutral-950 border border-neutral-800 px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-blue-500 resize-none disabled:opacity-50"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md active:scale-[0.99]"
                    >
                      {submitting ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          <span>Dispatching Message...</span>
                        </>
                      ) : (
                        <>
                          <span>Transmit Message</span>
                          <Send size={14} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Sub-Footer Copyright & Bottom Grid */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-neutral-500 font-mono">
          <div>
            © {new Date().getFullYear()} {PERSONAL_INFO.brandName}.
          </div>
          <div className="flex items-center gap-6">
            <a href="#about" className="hover:text-white transition-colors">TOP</a>
            <a href="#work" className="hover:text-white transition-colors">WORK</a>
            <a href="#pillars" className="hover:text-white transition-colors">PILLARS</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>
        </div>
      </div>

      {/* Google Apps Script Option 3 Setup Guide Modal */}
      <GoogleScriptGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        onSavedWebhook={() => setHasWebhook(true)}
      />
    </footer>
  );
}

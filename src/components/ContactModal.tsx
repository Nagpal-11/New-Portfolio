import React, { useState, useEffect } from 'react';
import {
  X,
  Mail,
  Github,
  Copy,
  Check,
  Send,
  Sparkles,
  MapPin,
  Loader2,
  AlertCircle,
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

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
}

export default function ContactModal({ isOpen, onClose, onOpenResume }: ContactModalProps) {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderMessage, setSenderMessage] = useState('');
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [hasWebhook, setHasWebhook] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setHasWebhook(Boolean(getGasWebhookUrl()));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setErrorMessage(null);

    const payload = {
      name: senderName.trim(),
      email: senderEmail.trim(),
      message: senderMessage.trim(),
    };

    const webhookUrl = getGasWebhookUrl();

    if (!webhookUrl) {
      setSubmitting(false);
      window.open(getGmailWebComposeUrl(payload), '_blank', 'noopener,noreferrer');
      setSubmitted(true);
      setStatusMessage('Your message draft has been opened in your email client. Please review and send.');
      return;
    }

    const result = await sendDirectEmail(payload);
    setSubmitting(false);

    if (result.success) {
      setSubmitted(true);
      setStatusMessage(result.message);
      setSenderName('');
      setSenderEmail('');
      setSenderMessage('');
    } else {
      setErrorMessage(result.message);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
      data-lenis-prevent
    >
      <div 
        className="relative w-full max-w-lg bg-[#0d0d0f] text-white rounded-3xl shadow-2xl overflow-hidden my-8 border border-neutral-800"
        data-lenis-prevent
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full" />
            <span className="text-xs font-mono tracking-wider uppercase text-neutral-400">
              Direct Inquiry Channel
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-black tracking-tight text-white">
              Get in Touch
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Available for Associate Software Engineer roles, Deep Learning initiatives, and forward-thinking engineering teams.
            </p>
          </div>

          {/* Quick Copy Email Box */}
          <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-between gap-3">
            <div className="space-y-0.5 overflow-hidden">
              <div className="text-[10px] font-mono uppercase text-neutral-400">
                Direct Email
              </div>
              <div className="text-sm font-bold text-white truncate">
                {PERSONAL_INFO.email}
              </div>
            </div>
            <button
              onClick={handleCopyEmail}
              className="px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-200 flex items-center gap-1.5 shrink-0 transition-colors"
            >
              {copied ? (
                <>
                  <Check size={13} className="text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Direct Note Form */}
          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3 animate-in fade-in">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <Check size={24} />
              </div>
              <div className="font-bold text-white text-base">Message Sent Successfully</div>
              <p className="text-xs text-neutral-300 leading-relaxed max-w-sm mx-auto">
                {statusMessage || 'Thank you for reaching out. Ekjot will review your inquiry and respond within 24 hours.'}
              </p>
              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white transition-colors"
                >
                  Write Another
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600 text-xs font-semibold text-white transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-200 flex items-start justify-between gap-2">
                  <div className="flex items-start gap-1.5">
                    <AlertCircle size={14} className="text-rose-400 shrink-0 mt-0.5" />
                    <span className="text-[11px]">{errorMessage}</span>
                  </div>
                  <a
                    href={getGmailWebComposeUrl({ name: senderName, email: senderEmail, message: senderMessage })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-0.5 rounded bg-rose-900/80 hover:bg-rose-800 text-[10px] font-bold text-white shrink-0 inline-flex items-center gap-1"
                  >
                    <span>Gmail Web</span>
                    <ExternalLink size={9} />
                  </a>
                </div>
              )}

              <div>
                <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                  Name / Organization
                </label>
                <input
                  type="text"
                  required
                  disabled={submitting}
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. Maya Lin · Hiring Manager"
                  className="w-full rounded-xl bg-neutral-950 border border-neutral-800 px-3.5 py-2.5 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-blue-500 disabled:opacity-50"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  disabled={submitting}
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full rounded-xl bg-neutral-950 border border-neutral-800 px-3.5 py-2.5 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-blue-500 disabled:opacity-50"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                  Message
                </label>
                <textarea
                  rows={3}
                  required
                  disabled={submitting}
                  value={senderMessage}
                  onChange={(e) => setSenderMessage(e.target.value)}
                  placeholder="Details regarding your role or project..."
                  className="w-full rounded-xl bg-neutral-950 border border-neutral-800 px-3.5 py-2.5 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-blue-500 resize-none disabled:opacity-50"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-[0.98] disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={13} className="animate-spin" />
                      <span>Dispatching Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send size={13} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Footer actions */}
          <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-xs">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <Github size={14} />
              <span>GitHub</span>
            </a>

            <button
              onClick={() => {
                onClose();
                onOpenResume();
              }}
              className="text-blue-400 hover:text-blue-300 font-semibold"
            >
              View Full CV →
            </button>
          </div>
        </div>
      </div>

      <GoogleScriptGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        onSavedWebhook={() => setHasWebhook(true)}
      />
    </div>
  );
}

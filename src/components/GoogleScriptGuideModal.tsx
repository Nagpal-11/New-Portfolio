import React, { useState, useEffect } from 'react';
import { X, Check, Copy, ExternalLink, Settings, ShieldCheck, Sparkles, Send, Terminal, AlertCircle } from 'lucide-react';
import {
  GOOGLE_APPS_SCRIPT_CODE,
  getGasWebhookUrl,
  setGasWebhookUrl,
  TARGET_EMAIL,
} from '../lib/sendContactEmail';

interface GoogleScriptGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSavedWebhook?: () => void;
}

export default function GoogleScriptGuideModal({
  isOpen,
  onClose,
  onSavedWebhook,
}: GoogleScriptGuideModalProps) {
  const [copiedScript, setCopiedScript] = useState(false);
  const [webhookUrlInput, setWebhookUrlInput] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [testTesting, setTestTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    if (isOpen) {
      setWebhookUrlInput(getGasWebhookUrl());
      setSavedSuccess(false);
      setTestResult(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopyScript = () => {
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_CODE);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  const handleSaveUrl = (e: React.FormEvent) => {
    e.preventDefault();
    setGasWebhookUrl(webhookUrlInput.trim());
    setSavedSuccess(true);
    if (onSavedWebhook) onSavedWebhook();
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleTestPing = async () => {
    const url = webhookUrlInput.trim();
    if (!url || !url.startsWith('https://script.google.com')) {
      setTestResult({
        success: false,
        message: 'Please paste a valid Google Apps Script Web App URL starting with https://script.google.com/macros/s/.../exec',
      });
      return;
    }

    setTestTesting(true);
    setTestResult(null);

    try {
      await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          name: 'Ekjot Portfolio Test Ping',
          email: TARGET_EMAIL,
          message: 'Verifying Google Apps Script webhook integration on ekjotnagpal.in.',
          timestamp: new Date().toISOString(),
        }),
      });

      setTestResult({
        success: true,
        message: `Test payload dispatched! Check your Gmail (${TARGET_EMAIL}) — you should receive an email within 10 seconds.`,
      });
      // Also persist url
      setGasWebhookUrl(url);
    } catch (err: any) {
      setTestResult({
        success: false,
        message: err?.message || 'Failed to dispatch test payload.',
      });
    } finally {
      setTestTesting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl bg-neutral-900 border border-neutral-800 text-neutral-100 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Google Apps Script Webhook
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-950 text-blue-400 border border-blue-800">
                  Option 3
                </span>
              </h3>
              <p className="text-xs text-neutral-400">
                Direct transmission into {TARGET_EMAIL} via your own Google Account
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-neutral-300">
          {/* Quick Explanation */}
          <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold text-xs">
              <Sparkles size={14} className="text-amber-400" />
              <span>Why Google Apps Script?</span>
            </div>
            <p className="text-neutral-400 leading-relaxed">
              Google Apps Script runs completely free on Google&apos;s infrastructure tied to your Google account. It uses native <code className="text-blue-300 font-mono">MailApp.sendEmail()</code>, meaning zero middleman, zero spam flags, and instant direct delivery.
            </p>
          </div>

          {/* Setup Steps */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-bold">
              Setup in 3 Simple Steps (Takes 60 seconds)
            </h4>

            {/* Step 1 */}
            <div className="p-4 rounded-2xl bg-[#121215] border border-neutral-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-white text-xs">
                  1. Open script.google.com &amp; Create Project
                </span>
                <a
                  href="https://script.google.com/home/start"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-[11px] font-semibold transition-colors"
                >
                  <span>Open Google Script</span>
                  <ExternalLink size={12} />
                </a>
              </div>
              <p className="text-neutral-400">
                Click <strong>&ldquo;New Project&rdquo;</strong> in Google Apps Script while logged into <strong className="text-neutral-200">{TARGET_EMAIL}</strong>.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-2xl bg-[#121215] border border-neutral-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-white text-xs">
                  2. Paste this Google Script Code
                </span>
                <button
                  type="button"
                  onClick={handleCopyScript}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-[11px] font-semibold transition-colors"
                >
                  {copiedScript ? (
                    <>
                      <Check size={12} className="text-emerald-400" />
                      <span className="text-emerald-400">Copied Script!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-neutral-400">
                Replace everything inside <code className="text-neutral-200 font-mono">Code.gs</code> with this code:
              </p>
              <div className="max-h-36 overflow-y-auto p-3 rounded-xl bg-neutral-950 font-mono text-[11px] text-neutral-400 border border-neutral-800/80 whitespace-pre">
                {GOOGLE_APPS_SCRIPT_CODE}
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-2xl bg-[#121215] border border-neutral-800/80 space-y-2">
              <span className="font-mono font-bold text-white text-xs block">
                3. Deploy as Web App
              </span>
              <ul className="list-disc list-inside space-y-1 text-neutral-400 pl-1">
                <li>Click the blue <strong>&ldquo;Deploy&rdquo;</strong> button in the top right → <strong>&ldquo;New deployment&rdquo;</strong>.</li>
                <li>Click the gear icon (Select type) → choose <strong>&ldquo;Web app&rdquo;</strong>.</li>
                <li>Set <strong>&ldquo;Execute as&rdquo;</strong>: <em>Me ({TARGET_EMAIL})</em>.</li>
                <li>Set <strong>&ldquo;Who has access&rdquo;</strong>: <em>Anyone</em>.</li>
                <li>Click <strong>Deploy</strong>, grant permission once, and copy the <strong>Web App URL</strong>.</li>
              </ul>
            </div>
          </div>

          {/* Webhook URL Input & Test */}
          <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
            <label className="font-mono font-bold text-white text-xs block">
              Paste Your Deployed Web App URL:
            </label>
            <form onSubmit={handleSaveUrl} className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="url"
                  required
                  value={webhookUrlInput}
                  onChange={(e) => setWebhookUrlInput(e.target.value)}
                  placeholder="https://script.google.com/macros/s/.../exec"
                  className="flex-1 rounded-xl bg-neutral-900 border border-neutral-700 px-3.5 py-2 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-blue-500 font-mono"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors shrink-0"
                >
                  Save URL
                </button>
              </div>
            </form>

            {savedSuccess && (
              <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                <Check size={14} />
                <span>Webhook URL saved successfully! It is active for all form submissions.</span>
              </div>
            )}

            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={handleTestPing}
                disabled={testTesting || !webhookUrlInput}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 disabled:opacity-50 text-neutral-200 text-xs font-mono font-semibold transition-colors"
              >
                <Send size={12} />
                <span>{testTesting ? 'Sending test ping...' : 'Send Test Ping to Gmail'}</span>
              </button>

              <span className="text-[11px] text-neutral-500 font-mono">
                Saves to your browser &amp; env
              </span>
            </div>

            {testResult && (
              <div
                className={`p-3 rounded-xl border text-xs ${
                  testResult.success
                    ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200'
                    : 'bg-rose-950/60 border-rose-500/40 text-rose-200'
                }`}
              >
                <div className="flex items-start gap-2">
                  {testResult.success ? (
                    <Check size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                  ) : (
                    <AlertCircle size={14} className="text-rose-400 mt-0.5 shrink-0" />
                  )}
                  <span>{testResult.message}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between">
          <span className="text-[11px] font-mono text-neutral-500">
            Target Email: {TARGET_EMAIL}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

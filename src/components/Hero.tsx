import React, { useState } from 'react';
import { ArrowUpRight, Play, Pause, Sparkles, Activity, ShieldCheck, ChevronRight, FileText } from 'lucide-react';
import ArchitecturalSculpture from './ArchitecturalSculpture';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenContact: () => void;
  onOpenResume?: () => void;
  onExploreWork?: () => void;
  onOpenProject?: (projectId: string) => void;
}

export default function Hero({ onOpenContact, onOpenResume, onExploreWork, onOpenProject }: HeroProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  const handleExploreWork = () => {
    if (onExploreWork) {
      onExploreWork();
    } else {
      const target = document.querySelector('#pillars') || document.querySelector('#work');
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(target || '#pillars', { duration: 1.2 });
      } else {
        target?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleOpenProject = (id: string) => {
    if (onOpenProject) {
      onOpenProject(id);
    } else {
      const target = document.querySelector('#work');
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(target || '#work', { duration: 1.2 });
      } else {
        target?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const heroDemos = [
    {
      id: 'clinical-ai',
      title: 'Clinical AI Platform',
      badge: 'MeitY GENESIS EiR (₹5L Grant)',
      desc: 'LLaMA2-powered conversational symptom triage engine.',
      metric: 'National Winner',
      tag: 'Healthcare LLM',
    },
    {
      id: 'sentiment-rnn',
      title: 'Deep Learning Simple RNN',
      badge: '1.31M Trainable Parameters',
      desc: 'Custom neural sentiment classifier with 94.23% accuracy.',
      metric: '94.23% Acc',
      tag: 'TensorFlow / Keras',
    },
    {
      id: 'churn-ann',
      title: 'Customer Churn Predictor',
      badge: 'Artificial Neural Network',
      desc: 'Real-time customer retention risk prediction & simulation.',
      metric: 'Real-time ANN',
      tag: 'Streamlit Deployment',
    },
  ];

  const currentDemo = heroDemos[activeMediaIndex];

  return (
    <section id="about" className="relative pt-32 pb-16 sm:pt-36 md:pt-40 md:pb-24 overflow-hidden border-b border-neutral-200/80">
      {/* Structural Architectural Grid Lines */}
      <div className="architectural-grid">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Top Mini Meta Label with signature Brikken Cobalt Blue Dot */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-neutral-200/70 text-xs font-semibold tracking-wider text-neutral-500 uppercase">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-600 inline-block" />
            <span className="text-neutral-800">PORTFOLIO &amp; LAB</span>
            <span className="text-neutral-300">/</span>
            <span>EDITION 2026–2027</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 text-[11px] font-medium border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              Open to SDE Roles
            </span>
            <span className="hidden sm:inline text-neutral-400">|</span>
            <span className="hidden sm:inline text-neutral-600">Shimla → Aizawl</span>
          </div>
        </div>

        {/* Giant Monolithic Brand Headline — Authoritative H1 with Target Name & Key Discipline */}
        <div className="pt-8 sm:pt-10 pb-8 sm:pb-10 text-center overflow-hidden">
          <h1 className="text-[clamp(1.75rem,6.5vw,4.5rem)] sm:text-[clamp(2.2rem,6vw,5.25rem)] lg:text-[clamp(2.8rem,5.2vw,5.75rem)] xl:text-[6rem] font-black tracking-[-0.03em] uppercase leading-none text-neutral-950 select-none">
            <span className="inline-block whitespace-nowrap max-w-full">Ekjot Nagpal</span>
            <span className="block text-xs sm:text-sm md:text-base lg:text-lg font-mono font-bold tracking-[0.16em] sm:tracking-[0.2em] text-blue-600 uppercase mt-2 sm:mt-3">
              Software Engineer &amp; AI Systems Specialist
            </span>
          </h1>
        </div>

        {/* Hero Main Grid: Left Manifesto & Action, Center 3D Monolith, Right Floating Media */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center pt-2">
          {/* Left Column (5 cols): Statement & Actions */}
          <div className="lg:col-span-4 space-y-6 sm:space-y-8">
            <div className="space-y-3">
              <div className="text-[10px] font-mono tracking-widest text-blue-600 uppercase font-bold">
                01 // POSITIONING
              </div>
              <p className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 leading-snug">
                Engineering intelligent systems, deep learning architectures & robust software products.
              </p>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                Computer Engineering student at Mizoram University and MeitY GENESIS EiR Grantee. Combining mathematical neural networks with rigorous data structures and production engineering.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={onOpenContact}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer"
              >
                <span>Get In Touch</span>
                <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={handleExploreWork}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full border border-neutral-300 hover:border-black bg-white/70 hover:bg-white text-neutral-900 text-xs font-bold tracking-wider uppercase transition-all cursor-pointer"
              >
                <span>Explore Work</span>
                <ChevronRight size={15} />
              </button>

              {onOpenResume && (
                <button
                  onClick={onOpenResume}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full border border-neutral-300 hover:border-blue-600 bg-white/70 hover:bg-blue-50/50 text-neutral-900 hover:text-blue-600 text-xs font-bold tracking-wider uppercase transition-all cursor-pointer"
                  title="View Verified Curriculum Vitae"
                >
                  <FileText size={14} className="text-blue-600" />
                  <span>Resume / CV</span>
                </button>
              )}
            </div>

            {/* Quick Metrics Ticker Preview */}
            <div className="pt-4 border-t border-neutral-200/80 grid grid-cols-2 gap-4">
              <div>
                <div className="text-xl sm:text-2xl font-black tracking-tight text-neutral-900">₹5,00,000</div>
                <div className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">MeitY Grant</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black tracking-tight text-neutral-900">94.23%</div>
                <div className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">RNN Accuracy</div>
              </div>
            </div>
          </div>

          {/* Center Column (4 cols): 3D Monolith Geometric Prism */}
          <div className="lg:col-span-4 flex justify-center py-4 lg:py-0">
            <ArchitecturalSculpture />
          </div>

          {/* Right Column (4 cols): Floating Dynamic Video / Interactive Media Card */}
          <div className="lg:col-span-4 space-y-4">
            <div className="card group relative rounded-2xl bg-white border border-neutral-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.06)] p-5 overflow-hidden transition-all duration-300 hover:border-neutral-400 hover:shadow-xl">
              {/* Media Card Header */}
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full animate-ping" />
                  <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
                    SHOWCASE FEED
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-neutral-100 rounded text-neutral-600 font-semibold">
                  0{activeMediaIndex + 1} / 0{heroDemos.length}
                </span>
              </div>

              {/* Dynamic Interactive Media Placeholder with Animated Simulation */}
              <div className="relative mt-4 aspect-video rounded-xl bg-neutral-900 overflow-hidden text-white flex flex-col justify-between p-4 shadow-inner">
                {/* Visual Neural Grid simulation in the background */}
                <div className="absolute inset-0 opacity-25">
                  <div className="w-full h-full bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:14px_14px]" />
                </div>

                {/* Animated Waveform bar */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-500/30">
                    {currentDemo.tag}
                  </span>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-colors"
                    title={isPlaying ? 'Pause Simulation' : 'Resume Simulation'}
                  >
                    {isPlaying ? <Pause size={12} /> : <Play size={12} className="ml-0.5" />}
                  </button>
                </div>

                {/* Simulated Real-Time Activity Visual */}
                <div className="relative z-10 py-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-300 mb-1.5">
                    <span>Inference Stream</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <Activity size={12} /> {currentDemo.metric}
                    </span>
                  </div>
                  {/* Dynamic simulated audio/neural frequency bars */}
                  <div className="flex items-end gap-1 h-8">
                    {[40, 75, 55, 90, 65, 30, 85, 45, 95, 70, 60, 80, 50, 65, 90].map((val, idx) => (
                      <div
                        key={idx}
                        className="flex-1 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t transition-all duration-300"
                        style={{
                          height: isPlaying ? `${Math.max(15, (val * ((idx % 3) + 1)) % 100)}%` : '20%',
                          opacity: isPlaying ? 0.85 : 0.4,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Media card footer details */}
                <div className="relative z-10 pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="font-semibold text-white truncate max-w-[170px]">
                    {currentDemo.title}
                  </span>
                  <span className="text-[10px] text-neutral-400 font-mono">LIVE PREVIEW</span>
                </div>
              </div>

              {/* Media Card Info */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold tracking-wider text-blue-600 uppercase">
                    {currentDemo.badge}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-neutral-900 leading-tight">
                  {currentDemo.title}
                </h4>
                <p className="text-xs text-neutral-600 line-clamp-2">
                  {currentDemo.desc}
                </p>
              </div>

              {/* Navigation between showcase cards */}
              <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
                <div className="flex gap-1.5">
                  {heroDemos.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveMediaIndex(idx)}
                      className={`h-1.5 rounded-full transition-all ${
                        activeMediaIndex === idx ? 'w-6 bg-blue-600' : 'w-2 bg-neutral-200'
                      }`}
                      aria-label={`Showcase item ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => handleOpenProject(currentDemo.id)}
                  className="text-xs font-bold text-neutral-900 hover:text-blue-600 flex items-center gap-1 transition-colors group/btn cursor-pointer"
                >
                  <span>Explore System</span>
                  <ArrowUpRight size={13} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Mini Trust Credential Badge */}
            <div className="rounded-xl border border-neutral-200/80 bg-white/60 p-3.5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <ShieldCheck size={18} />
              </div>
              <div className="text-xs">
                <div className="font-bold text-neutral-900">Govt. of India Recognized</div>
                <div className="text-neutral-500 text-[11px]">Ministry of Education & MeitY GENESIS</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

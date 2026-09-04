import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Github, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Observer } from 'gsap/Observer';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Observer);

interface FeaturedWorkProps {
  onOpenProjectModal: (project: Project) => void;
}

export default function FeaturedWork({ onOpenProjectModal }: FeaturedWorkProps) {
  // Active card index for deck indicators
  const [activeDeckIndex, setActiveDeckIndex] = useState(0);

  // Refs for GSAP Pinned Center Deck & Discrete Index Controller
  const sectionRef = useRef<HTMLElement | null>(null);
  const deckWrapperRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const currentIndexRef = useRef<number>(0);
  const isAnimatingRef = useRef<boolean>(false);
  const unlockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const transitionToCardRef = useRef<
    ((targetIndex: number, direction?: 1 | -1, syncScroll?: boolean) => void) | null
  >(null);

  // Responsive mobile sub-view tab for screens < 1024px (Overview vs Live Demo)
  const [mobileCardTab, setMobileCardTab] = useState<'overview' | 'simulator'>('overview');

  // State for interactive Sentiment RNN widget
  const [sentimentInput, setSentimentInput] = useState(
    'This neural network architecture demonstrates exceptional low-latency performance.'
  );
  const [analyzedSentiment, setAnalyzedSentiment] = useState<{
    label: string;
    score: number;
    pos: number;
    neg: number;
  }>({
    label: 'POSITIVE',
    score: 96.4,
    pos: 96.4,
    neg: 3.6,
  });

  // State for interactive Churn ANN widget
  const [tenure, setTenure] = useState(4);
  const [balance, setBalance] = useState(65000);
  const [numProducts] = useState(2);
  const [isActiveMember] = useState(true);

  // Calculate simulated churn risk based on parameters
  const calculateChurnRisk = () => {
    let base = 25;
    if (balance > 80000) base += 15;
    if (balance < 20000) base += 10;
    if (tenure < 2) base += 20;
    if (numProducts === 1) base += 18;
    if (numProducts >= 3) base += 25;
    if (!isActiveMember) base += 24;
    else base -= 15;
    return Math.min(96, Math.max(8, base));
  };
  const churnRisk = calculateChurnRisk();

  // State for Clinical AI Interactive Clinical Triage
  const [selectedSymptom, setSelectedSymptom] = useState(
    'Fever & persistent dry cough for 3 days'
  );
  const [triageResponse, setTriageResponse] = useState({
    urgency: 'MODERATE',
    color: 'text-amber-600 bg-amber-50 border-amber-200',
    advice:
      'Recommend outpatient primary care consultation within 24–48 hours. Monitor oxygen levels and maintain oral hydration.',
    confidence: '92.8% Match',
  });

  const handleSymptomSelect = (symptom: string) => {
    setSelectedSymptom(symptom);
    if (symptom.includes('Chest') || symptom.includes('Acute')) {
      setTriageResponse({
        urgency: 'HIGH / EMERGENCY',
        color: 'text-rose-600 bg-rose-50 border-rose-200',
        advice:
          'Immediate clinical evaluation advised. Direct triage to nearest urgent care facility.',
        confidence: '97.4% Match',
      });
    } else if (symptom.includes('Mild') || symptom.includes('Allergy')) {
      setTriageResponse({
        urgency: 'LOW',
        color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
        advice:
          'Self-care protocols suitable. Hydration, rest, and OTC antihistamine under pharmacist supervision.',
        confidence: '91.2% Match',
      });
    } else {
      setTriageResponse({
        urgency: 'MODERATE',
        color: 'text-amber-600 bg-amber-50 border-amber-200',
        advice:
          'Recommend outpatient primary care consultation within 24–48 hours. Monitor vitals daily.',
        confidence: '94.1% Match',
      });
    }
  };

  const handleAnalyzeSentiment = () => {
    const text = sentimentInput.toLowerCase();
    let score = 50;
    const positiveWords = [
      'exceptional',
      'great',
      'love',
      'fast',
      'high',
      'good',
      'impressive',
      'best',
      'accurate',
      'clean',
      'robust',
    ];
    const negativeWords = [
      'slow',
      'bad',
      'poor',
      'terrible',
      'worst',
      'bug',
      'error',
      'failed',
      'heavy',
      'latency',
    ];

    let posCount = 0;
    let negCount = 0;
    positiveWords.forEach((w) => {
      if (text.includes(w)) posCount++;
    });
    negativeWords.forEach((w) => {
      if (text.includes(w)) negCount++;
    });

    if (posCount > negCount) {
      score = Math.min(99, 75 + posCount * 8);
      setAnalyzedSentiment({
        label: 'POSITIVE',
        score,
        pos: score,
        neg: +(100 - score).toFixed(1),
      });
    } else if (negCount > posCount) {
      score = Math.min(98, 70 + negCount * 9);
      setAnalyzedSentiment({
        label: 'NEGATIVE',
        score,
        pos: +(100 - score).toFixed(1),
        neg: score,
      });
    } else {
      setAnalyzedSentiment({
        label: 'NEUTRAL / BALANCED',
        score: 54,
        pos: 54,
        neg: 46,
      });
    }
  };

  // Programmatic deck navigation by clicking pills or arrows
  const handleJumpToCard = (targetIndex: number) => {
    if (transitionToCardRef.current) {
      const dir = targetIndex > currentIndexRef.current ? 1 : -1;
      transitionToCardRef.current(targetIndex, dir, true);
    }
  };

  // GSAP Pinned Center Deck Setup with Discrete 1-Scroll = 1-Card Switching
  useEffect(() => {
    if (!sectionRef.current || cardsRef.current.length === 0) return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      if (cards.length < 2) return;

      const cardCount = cards.length;

      // Tween Lifecycle Cleaning: kill any active tweens on cards or window
      gsap.killTweensOf(cards);
      gsap.killTweensOf(window);

      // Initialize Card Stacking and Initial Absolute Positioning:
      // Card 0: centered, fully visible, interactive, 100% solid opaque
      // Subsequent cards: off-screen right (110%), hidden opacity to avoid layout shifts
      cards.forEach((card, idx) => {
        gsap.set(card, {
          xPercent: idx === 0 ? 0 : 110,
          yPercent: 0,
          opacity: idx === 0 ? 1 : 0,
          scale: 1,
          rotationZ: 0,
          rotationY: 0,
          zIndex: idx === 0 ? 15 : 1,
          force3D: true,
          pointerEvents: idx === 0 ? 'auto' : 'none',
          overwrite: 'auto',
        });
      });

      currentIndexRef.current = 0;
      setActiveDeckIndex(0);

      // Discrete Card Switch Function: 100% solid opacity, instantaneous clean slide
      const transitionToCard = (
        targetIndex: number,
        direction: 1 | -1 = 1,
        syncScroll: boolean = true
      ) => {
        if (targetIndex < 0 || targetIndex >= cardCount) return;
        const prevIndex = currentIndexRef.current;
        if (targetIndex === prevIndex) return;

        // Set transition lock
        isAnimatingRef.current = true;
        if (unlockTimerRef.current) clearTimeout(unlockTimerRef.current);

        currentIndexRef.current = targetIndex;
        setActiveDeckIndex(targetIndex);

        const outgoingCard = cards[prevIndex];
        const incomingCard = cards[targetIndex];

        gsap.killTweensOf(cards);

        // Pre-position any inactive cards far off-screen
        cards.forEach((card, i) => {
          if (i !== prevIndex && i !== targetIndex) {
            gsap.set(card, {
              xPercent: i < targetIndex ? -110 : 110,
              yPercent: 0,
              opacity: 1,
              scale: 1,
              zIndex: 1,
              pointerEvents: 'none',
            });
          }
        });

        const dir = direction ?? (targetIndex > prevIndex ? 1 : -1);
        const incomingStartX = dir > 0 ? 110 : -110;
        const outgoingEndX = dir > 0 ? -110 : 110;

        // Incoming card enters at zIndex 20 (on top), outgoing card at zIndex 10
        gsap.set(outgoingCard, {
          xPercent: 0,
          yPercent: 0,
          opacity: 1,
          scale: 1,
          zIndex: 10,
          pointerEvents: 'none',
        });

        gsap.set(incomingCard, {
          xPercent: incomingStartX,
          yPercent: 0,
          opacity: 1,
          scale: 1,
          zIndex: 20,
          pointerEvents: 'none',
        });

        const tl = gsap.timeline({
          defaults: {
            duration: 0.65,
            ease: 'power3.inOut',
            force3D: true,
          },
          onComplete: () => {
            // Incoming card lands at exactly 100% center alignment (xPercent: 0)
            gsap.set(incomingCard, {
              xPercent: 0,
              opacity: 1,
              pointerEvents: 'auto',
              zIndex: 15,
            });
            gsap.set(outgoingCard, {
              opacity: 0,
              pointerEvents: 'none',
              zIndex: 1,
            });
            if (unlockTimerRef.current) clearTimeout(unlockTimerRef.current);
            unlockTimerRef.current = setTimeout(() => {
              isAnimatingRef.current = false;
            }, 180);
          },
        });

        tl.to(outgoingCard, { xPercent: outgoingEndX, opacity: 0 }, 0);
        tl.to(incomingCard, { xPercent: 0, opacity: 1 }, 0);

        // Synchronize window scroll to match the discrete card step
        if (syncScroll && scrollTriggerRef.current) {
          const st = scrollTriggerRef.current;
          const targetScrollY =
            st.start + (targetIndex / (cardCount - 1)) * (st.end - st.start);
          if ((window as any).__lenis) {
            (window as any).__lenis.scrollTo(targetScrollY, { duration: 0.65 });
          } else {
            gsap.to(window, {
              duration: 0.65,
              scrollTo: { y: targetScrollY, autoKill: false },
              ease: 'power3.inOut',
              overwrite: 'auto',
            });
          }
        }
      };

      transitionToCardRef.current = transitionToCard;

      // ScrollTrigger Pin Configuration
      // Exactly (cardCount - 1) * window.innerHeight so 1 full viewport scroll corresponds to 1 card switch.
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: () => '+=' + ((cardCount - 1) * window.innerHeight),
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (!isAnimatingRef.current) {
            const p = self.progress;
            const targetIdx = Math.min(
              cardCount - 1,
              Math.max(0, Math.round(p * (cardCount - 1)))
            );
            if (targetIdx !== currentIndexRef.current) {
              const dir = targetIdx > currentIndexRef.current ? 1 : -1;
              transitionToCard(targetIdx, dir, false);
            }
          }
        },
        onEnter: () => {
          if (currentIndexRef.current !== 0 && !isAnimatingRef.current) {
            transitionToCard(0, -1, false);
          }
        },
        onEnterBack: () => {
          if (currentIndexRef.current !== cardCount - 1 && !isAnimatingRef.current) {
            transitionToCard(cardCount - 1, 1, false);
          }
        },
      });

      scrollTriggerRef.current = st;

      // Touch & Swipe Event Handling for Mobile and Tablets (Non-blocking / Passive)
      let touchStartX = 0;
      let touchStartY = 0;

      const handleTouchStart = (e: TouchEvent) => {
        if (!e.touches || e.touches.length === 0) return;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      };

      const handleTouchEnd = (e: TouchEvent) => {
        if (!e.changedTouches || e.changedTouches.length === 0) return;
        const currentST = scrollTriggerRef.current;
        if (!currentST) return;

        const scrollY = window.scrollY;
        const isInSection =
          scrollY >= currentST.start - 24 && scrollY <= currentST.end + 24;
        if (!isInSection) return;

        const diffX = touchStartX - e.changedTouches[0].clientX;
        const diffY = touchStartY - e.changedTouches[0].clientY;
        const absX = Math.abs(diffX);
        const absY = Math.abs(diffY);

        // Only detect horizontal swipe gestures on deck cards to avoid interfering with vertical scroll
        if (absX > absY && absX > 40 && !isAnimatingRef.current) {
          if (diffX > 0 && currentIndexRef.current < cardCount - 1) {
            // Swipe LEFT -> advance
            transitionToCard(currentIndexRef.current + 1, 1, true);
          } else if (diffX < 0 && currentIndexRef.current > 0) {
            // Swipe RIGHT -> previous
            transitionToCard(currentIndexRef.current - 1, -1, true);
          }
        }
      };

      window.addEventListener('touchstart', handleTouchStart, { passive: true });
      window.addEventListener('touchend', handleTouchEnd, { passive: true });

      return () => {
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchend', handleTouchEnd);
      };
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative h-screen h-[100dvh] min-h-[100dvh] max-h-[100dvh] w-full max-w-full overflow-hidden bg-[#f3f3f0] border-b border-neutral-200/80 flex flex-col justify-between select-none"
    >
      {/* Structural Architectural Grid Lines */}
      <div className="architectural-grid pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} />
        ))}
      </div>

      {/* Top Meta & Section Header (Pinned Viewport Header) */}
      <div className="relative z-20 max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12 pt-5 sm:pt-7 shrink-0">
        <div className="flex items-center justify-between gap-4 pb-2.5 border-b border-neutral-200/80 text-xs font-semibold tracking-wider text-neutral-500 uppercase">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-600 inline-block" />
            <span className="text-neutral-900 font-bold">03 // SELECTED WORK & CODE</span>
          </div>

          {/* Clean Card Index Counter */}
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span className="text-neutral-400">CARD</span>
            <span className="text-blue-600 font-bold">
              0{activeDeckIndex + 1}
            </span>
            <span className="text-neutral-300">/</span>
            <span className="text-neutral-400">0{PROJECTS.length}</span>

            {/* Subtle indicator dots */}
            <div className="flex items-center gap-1.5 ml-2">
              {PROJECTS.map((_, pIdx) => (
                <button
                  key={pIdx}
                  onClick={() => handleJumpToCard(pIdx)}
                  aria-label={`Jump to card 0${pIdx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeDeckIndex === pIdx
                      ? 'w-6 bg-blue-600'
                      : 'w-2 bg-neutral-300 hover:bg-neutral-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Compact Title Row with Headline & Arrow Controls */}
        <div className="pt-2.5 pb-2 flex items-baseline justify-between gap-4">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase text-neutral-950">
            Selected Work.
          </h2>

          {/* Arrow navigation triggers */}
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                handleJumpToCard(Math.max(0, activeDeckIndex - 1))
              }
              disabled={activeDeckIndex === 0}
              className="p-1.5 rounded-lg border border-neutral-300/80 bg-white/80 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-neutral-700 cursor-pointer shadow-xs"
              aria-label="Previous card in deck"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() =>
                handleJumpToCard(
                  Math.min(PROJECTS.length - 1, activeDeckIndex + 1)
                )
              }
              disabled={activeDeckIndex === PROJECTS.length - 1}
              className="p-1.5 rounded-lg border border-neutral-300/80 bg-white/80 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-neutral-700 cursor-pointer shadow-xs"
              aria-label="Next card in deck"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Center Absolute Stacking Card Deck Wrapper */}
      <div className="selected-work-container relative z-10 w-full flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto my-auto min-h-0 overflow-hidden pb-3 sm:pb-5">
        <div
          ref={deckWrapperRef}
          className="relative w-full max-w-6xl h-[500px] sm:h-[530px] lg:h-[570px] xl:h-[600px] max-h-[calc(100dvh-135px)] overflow-hidden"
        >
          {PROJECTS.map((project, idx) => {
            return (
              <div
                key={project.id}
                ref={(el) => (cardsRef.current[idx] = el)}
                data-cursor="project"
                className="project-deck-card card absolute inset-0 m-auto w-full h-full rounded-3xl bg-white border border-neutral-200/90 shadow-[0_16px_50px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col justify-between"
                style={{
                  backgroundColor: '#ffffff',
                  isolation: 'isolate',
                  opacity: 1,
                }}
              >
                {/* Mobile View Switcher (< 1024px) */}
                <div className="flex lg:hidden items-center justify-between px-4 py-2 border-b border-neutral-200/80 bg-neutral-50/95 shrink-0 z-20">
                  <div className="flex items-center gap-1 p-0.5 rounded-lg bg-neutral-200/70">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setMobileCardTab('overview');
                      }}
                      className={`px-3 py-1 rounded-md text-[11px] font-bold font-mono tracking-wider uppercase transition-all cursor-pointer ${
                        mobileCardTab === 'overview'
                          ? 'bg-white text-neutral-900 shadow-xs'
                          : 'text-neutral-500 hover:text-neutral-900'
                      }`}
                    >
                      Overview
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setMobileCardTab('simulator');
                      }}
                      className={`px-3 py-1 rounded-md text-[11px] font-bold font-mono tracking-wider uppercase transition-all cursor-pointer ${
                        mobileCardTab === 'simulator'
                          ? 'bg-neutral-900 text-white shadow-xs'
                          : 'text-neutral-500 hover:text-neutral-900'
                      }`}
                    >
                      Live Demo
                    </button>
                  </div>

                  <span className="font-mono text-neutral-400 font-semibold text-xs">
                    0{idx + 1} / 0{PROJECTS.length}
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 h-full overflow-hidden bg-white">
                  {/* Left Column: Project Details & Actions (6 cols) with 100% solid background */}
                  <div
                    className={`lg:col-span-6 bg-white p-4 sm:p-7 lg:p-9 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-neutral-200/70 overflow-y-auto ${
                      mobileCardTab === 'simulator' ? 'hidden lg:flex' : 'flex'
                    }`}
                  >
                    <div className="space-y-4">
                      {/* Category & Index */}
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono text-blue-600 font-bold uppercase tracking-widest text-[11px]">
                          {project.category}
                        </span>
                        <span className="font-mono text-neutral-400 font-semibold text-xs">
                          0{idx + 1} / 0{PROJECTS.length}
                        </span>
                      </div>

                      {/* Title & Subtitle */}
                      <div className="space-y-1">
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-neutral-950 leading-tight">
                          {project.title}
                        </h3>
                        <p className="text-xs sm:text-sm font-medium text-neutral-600">
                          {project.subtitle}
                        </p>
                      </div>

                      {/* Summary Narrative */}
                      <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed line-clamp-3 sm:line-clamp-none">
                        {project.summary}
                      </p>

                      {/* Key Project Metrics */}
                      <div className="grid grid-cols-3 gap-2.5 pt-1">
                        {project.metrics.map((metric, mIdx) => (
                          <div
                            key={mIdx}
                            className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200/70"
                          >
                            <div className="text-sm sm:text-base font-black tracking-tight text-neutral-950 truncate">
                              {metric.value}
                            </div>
                            <div className="text-[9px] uppercase tracking-wider text-neutral-500 font-semibold mt-0.5 truncate">
                              {metric.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] sm:text-[11px] font-medium text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded-md border border-neutral-200/60"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="pt-4 mt-4 border-t border-neutral-200/70 flex flex-wrap items-center justify-between gap-3">
                      <button
                        onClick={() => onOpenProjectModal(project)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 hover:bg-black text-white text-[11px] font-bold tracking-wider uppercase transition-all shadow-xs group/btn cursor-pointer"
                      >
                        <span>Inspect Case Study</span>
                        <ArrowUpRight
                          size={13}
                          className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
                        />
                      </button>

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-black transition-colors"
                        >
                          <Github size={14} />
                          <span>View Code</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Dynamic Media & Real-Time Interactive Simulator (6 cols) */}
                  <div
                    className={`lg:col-span-6 bg-[#0e0e11] p-4 sm:p-7 lg:p-8 flex flex-col justify-between text-white relative overflow-hidden ${
                      mobileCardTab === 'overview' ? 'hidden lg:flex' : 'flex'
                    }`}
                  >
                    {/* Architectural visual accent aura */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-3xl rounded-full pointer-events-none" />

                    {/* Dynamic Media Container Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="font-mono text-neutral-400 text-[10px] uppercase tracking-wider">
                          {project.videoPlaceholder.badgeText}
                        </span>
                      </div>
                      <span className="font-mono text-neutral-500 text-[9px]">
                        INTERACTIVE REEL
                      </span>
                    </div>

                    {/* Dynamic Interactive Reel / Simulator per project */}
                    <div className="py-4 my-auto">
                      {project.id === 'sentiment-rnn' && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
                            <span>Simple RNN Inference (1.31M params)</span>
                            <span className="text-blue-400">
                              94.23% Test Acc
                            </span>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] text-neutral-400 font-mono uppercase">
                              Test Sentence Input:
                            </label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={sentimentInput}
                                onChange={(e) =>
                                  setSentimentInput(e.target.value)
                                }
                                className="flex-1 bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500 font-sans"
                                placeholder="Enter text to analyze sentiment..."
                              />
                              <button
                                onClick={handleAnalyzeSentiment}
                                className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold font-mono transition-colors cursor-pointer"
                              >
                                Classify
                              </button>
                            </div>
                          </div>

                          {/* Classification Result Card */}
                          <div className="p-3.5 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-2.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-mono text-neutral-400">
                                Predicted Class:
                              </span>
                              <span
                                className={`text-[11px] font-bold font-mono px-2.5 py-0.5 rounded ${
                                  analyzedSentiment.label === 'POSITIVE'
                                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                    : analyzedSentiment.label === 'NEGATIVE'
                                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                }`}
                              >
                                {analyzedSentiment.label} (
                                {analyzedSentiment.score}%)
                              </span>
                            </div>

                            {/* Confidence Gauge */}
                            <div className="space-y-1">
                              <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                                <span>Positive: {analyzedSentiment.pos}%</span>
                                <span>Negative: {analyzedSentiment.neg}%</span>
                              </div>
                              <div className="w-full h-1.5 rounded-full bg-neutral-800 overflow-hidden flex">
                                <div
                                  className="h-full bg-emerald-500 transition-all duration-300"
                                  style={{
                                    width: `${analyzedSentiment.pos}%`,
                                  }}
                                />
                                <div
                                  className="h-full bg-rose-500 transition-all duration-300"
                                  style={{
                                    width: `${analyzedSentiment.neg}%`,
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {project.id === 'churn-ann' && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
                            <span>ANN Multi-Layer Perceptron</span>
                            <span className="text-emerald-400">
                              Streamlit Deploy
                            </span>
                          </div>

                          {/* Sliders for real-time scenario simulation */}
                          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                            <div className="space-y-1">
                              <div className="flex justify-between text-[10px] text-neutral-400">
                                <span>Tenure:</span>
                                <span>{tenure} yrs</span>
                              </div>
                              <input
                                type="range"
                                min="0"
                                max="10"
                                value={tenure}
                                onChange={(e) =>
                                  setTenure(Number(e.target.value))
                                }
                                className="w-full accent-blue-500 cursor-pointer"
                              />
                            </div>

                            <div className="space-y-1">
                              <div className="flex justify-between text-[10px] text-neutral-400">
                                <span>Balance:</span>
                                <span>${(balance / 1000).toFixed(0)}k</span>
                              </div>
                              <input
                                type="range"
                                min="0"
                                max="150000"
                                step="5000"
                                value={balance}
                                onChange={(e) =>
                                  setBalance(Number(e.target.value))
                                }
                                className="w-full accent-blue-500 cursor-pointer"
                              />
                            </div>
                          </div>

                          {/* Churn Risk Output */}
                          <div className="p-3.5 rounded-2xl bg-neutral-900/90 border border-neutral-800 flex items-center justify-between">
                            <div>
                              <div className="text-[9px] font-mono text-neutral-400 uppercase">
                                Churn Probability
                              </div>
                              <div className="text-xl font-black font-mono text-white mt-0.5">
                                {churnRisk}%
                              </div>
                            </div>
                            <div
                              className={`px-3 py-1 rounded-full text-[10px] font-bold font-mono ${
                                churnRisk > 50
                                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                                  : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                              }`}
                            >
                              {churnRisk > 50
                                ? 'HIGH AT-RISK'
                                : 'RETENTION HEALTHY'}
                            </div>
                          </div>
                        </div>
                      )}

                      {project.id === 'clinical-ai' && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
                            <span>Clinical LLaMA2 Conversation Engine</span>
                            <span className="text-blue-400">
                              MeitY GENESIS EiR
                            </span>
                          </div>

                          {/* Symptom Presets */}
                          <div className="space-y-1.5">
                            <span className="text-[10px] font-mono uppercase text-neutral-400">
                              Simulate Patient Symptom Report:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {[
                                'Fever & persistent dry cough for 3 days',
                                'Acute chest tightness & shortness of breath',
                                'Mild seasonal nasal allergy symptoms',
                              ].map((symptom) => (
                                <button
                                  key={symptom}
                                  onClick={() => handleSymptomSelect(symptom)}
                                  className={`text-[10px] px-2.5 py-1 rounded-lg transition-all font-sans text-left cursor-pointer ${
                                    selectedSymptom === symptom
                                      ? 'bg-blue-600 text-white font-semibold'
                                      : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                                  }`}
                                >
                                  {symptom}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Triage Output Card */}
                          <div className="p-3 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-mono text-neutral-400">
                                Triage Level:
                              </span>
                              <span
                                className={`text-[9px] font-bold font-mono px-2 py-0.5 rounded border ${triageResponse.color}`}
                              >
                                {triageResponse.urgency}
                              </span>
                            </div>
                            <p className="text-[11px] text-neutral-300 leading-relaxed">
                              {triageResponse.advice}
                            </p>
                            <div className="text-[9px] font-mono text-neutral-500 pt-1 border-t border-neutral-800 flex justify-between">
                              <span>
                                Confidence: {triageResponse.confidence}
                              </span>
                              <span>Privacy Safe: Enforced</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {project.id === 'milk-candy-growth' && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
                            <span>Quantitative Distribution Engine</span>
                            <span className="text-amber-400">
                              1st Place Champion
                            </span>
                          </div>

                          {/* Cold chain strategy graph mockup */}
                          <div className="p-3.5 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-2">
                            <div className="text-xs font-semibold text-white">
                              Supply Chain & Territory Cold-Chain Expansion
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                              <div className="p-2 bg-neutral-800 rounded-lg">
                                <div className="text-amber-400 font-bold">
                                  +42%
                                </div>
                                <div className="text-[8px] text-neutral-400">
                                  Coverage
                                </div>
                              </div>
                              <div className="p-2 bg-neutral-800 rounded-lg">
                                <div className="text-emerald-400 font-bold">
                                  -18%
                                </div>
                                <div className="text-[8px] text-neutral-400">
                                  Logistics Cost
                                </div>
                              </div>
                              <div className="p-2 bg-neutral-800 rounded-lg">
                                <div className="text-blue-400 font-bold">
                                  1st Place
                                </div>
                                <div className="text-[8px] text-neutral-400">
                                  Jury Award
                                </div>
                              </div>
                            </div>
                            <p className="text-[10px] text-neutral-400 font-sans leading-relaxed">
                              Algorithmic distribution modeling for hill
                              terrains with high ambient temperatures and transit
                              constraints.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Dynamic Media Container Footer */}
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-400">
                      <span className="text-[11px] truncate mr-2">
                        {project.videoPlaceholder.headline}
                      </span>
                      <button
                        onClick={() => onOpenProjectModal(project)}
                        className="text-blue-400 hover:text-white flex items-center gap-1 transition-colors shrink-0 cursor-pointer"
                      >
                        <span className="text-[11px]">Expand</span>
                        <ExternalLink size={11} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

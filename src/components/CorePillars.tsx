import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, CheckCircle2, ArrowRight, Cpu, Layers, Award, Terminal } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { CORE_PILLARS } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function CorePillars() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const wordsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const indicatorRef = useRef<(HTMLSpanElement | null)[]>([]);
  const progressLineRef = useRef<HTMLDivElement | null>(null);

  const [activeTabMobile, setActiveTabMobile] = useState<number>(0);
  const [activePillarState, setActivePillarState] = useState<number>(0);

  const currentIndexRef = useRef<number>(0);
  const isLockedRef = useRef<boolean>(false);
  const scrollTriggerInstanceRef = useRef<ScrollTrigger | null>(null);

  // Mobile card touch swipe tracking
  const mobileTouchStartX = useRef<number>(0);
  const mobileTouchStartY = useRef<number>(0);

  const handleMobileCardTouchStart = (e: React.TouchEvent) => {
    if (!e.touches || e.touches.length === 0) return;
    mobileTouchStartX.current = e.touches[0].clientX;
    mobileTouchStartY.current = e.touches[0].clientY;
  };

  const handleMobileCardTouchEnd = (e: React.TouchEvent) => {
    if (!e.changedTouches || e.changedTouches.length === 0) return;
    const diffX = mobileTouchStartX.current - e.changedTouches[0].clientX;
    const diffY = mobileTouchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 32) {
      if (diffX > 0) {
        // Swipe left -> advance to next pillar
        setActiveTabMobile((prev) => Math.min(2, prev + 1));
      } else {
        // Swipe right -> return to previous pillar
        setActiveTabMobile((prev) => Math.max(0, prev - 1));
      }
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
        const words = wordsRef.current.filter(Boolean) as HTMLButtonElement[];
        const indicators = indicatorRef.current.filter(Boolean) as HTMLSpanElement[];

        if (!sectionRef.current || cards.length < 3 || words.length < 3) return;

        // Initial setup for 3D cards with explicit GPU hardware acceleration
        gsap.set(cards[0], {
          yPercent: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          rotationZ: 0,
          transformPerspective: 1200,
          transformOrigin: '50% 100%',
          force3D: true,
        });

        gsap.set(cards[1], {
          yPercent: 115,
          opacity: 0,
          scale: 0.92,
          rotationX: 20,
          rotationZ: -3,
          transformPerspective: 1200,
          transformOrigin: '50% 0%',
          force3D: true,
        });

        gsap.set(cards[2], {
          yPercent: 115,
          opacity: 0,
          scale: 0.92,
          rotationX: 20,
          rotationZ: 3,
          transformPerspective: 1200,
          transformOrigin: '50% 0%',
          force3D: true,
        });

        // Initial setup for words & indicators
        gsap.set(words[0], { opacity: 1, color: '#ffffff', x: 8 });
        gsap.set(indicators[0], { opacity: 1, scale: 1 });

        gsap.set([words[1], words[2]], { opacity: 0.28, color: '#737373', x: 0 });
        gsap.set([indicators[1], indicators[2]], { opacity: 0, scale: 0.4 });

        if (progressLineRef.current) {
          progressLineRef.current.style.height = '0%';
        }

        currentIndexRef.current = 0;
        isLockedRef.current = false;

        // Core Transition Animation: plays an intentional, predefined timeline transition
        const animateToCard = (targetIndex: number) => {
          const prevIndex = currentIndexRef.current;
          if (targetIndex === prevIndex || isLockedRef.current) return;
          if (targetIndex < 0 || targetIndex > 2) return;

          // Lock inputs to prevent rapid gestures from skipping cards
          isLockedRef.current = true;
          currentIndexRef.current = targetIndex;
          setActivePillarState(targetIndex);

          const isAdvancing = targetIndex > prevIndex;
          const tl = gsap.timeline({
            defaults: {
              ease: 'power2.inOut',
              force3D: true,
            },
            onComplete: () => {
              // Timing buffer: small debounce delay so card sits comfortably before next gesture
              setTimeout(() => {
                isLockedRef.current = false;
              }, 200);
            },
          });

          // 1. Exiting Card: rotates slightly and flies out with 3D perspective
          tl.to(
            cards[prevIndex],
            {
              yPercent: isAdvancing ? -125 : 115,
              opacity: 0,
              scale: isAdvancing ? 0.88 : 0.92,
              rotationZ: isAdvancing ? -5 : 4,
              rotationX: isAdvancing ? -15 : 20,
              duration: 0.85,
              force3D: true,
            },
            0
          );

          // 2. Entering Card: simultaneously floats in with 3D tilt and settles flat (zero blank gap)
          gsap.set(cards[targetIndex], {
            yPercent: isAdvancing ? 115 : -125,
            opacity: 0,
            scale: isAdvancing ? 0.92 : 0.88,
            rotationX: isAdvancing ? 20 : -15,
            rotationZ: isAdvancing ? -3 : 5,
            force3D: true,
          });

          tl.to(
            cards[targetIndex],
            {
              yPercent: 0,
              opacity: 1,
              scale: 1,
              rotationX: 0,
              rotationZ: 0,
              duration: 0.85,
              force3D: true,
            },
            '<' // Simultaneous crossfade
          );

          // 3. Dynamic Textual Opacity & Active Markers
          for (let i = 0; i < 3; i++) {
            if (i === targetIndex) {
              tl.to(
                words[i],
                {
                  opacity: 1,
                  color: '#ffffff',
                  x: 8,
                  duration: 0.6,
                  ease: 'power2.out',
                },
                '<+=0.1'
              );
              tl.to(
                indicators[i],
                {
                  opacity: 1,
                  scale: 1,
                  duration: 0.4,
                  ease: 'back.out(2)',
                },
                '<'
              );
            } else {
              tl.to(
                words[i],
                {
                  opacity: 0.28,
                  color: '#737373',
                  x: 0,
                  duration: 0.5,
                  ease: 'power2.out',
                },
                '<'
              );
              tl.to(
                indicators[i],
                {
                  opacity: 0,
                  scale: 0.4,
                  duration: 0.3,
                },
                '<'
              );
            }
          }

          // 4. Update vertical indicator rail progress
          const progressTarget = `${(targetIndex / 2) * 100}%`;
          tl.to(
            progressLineRef.current,
            {
              height: progressTarget,
              duration: 0.85,
              ease: 'power2.inOut',
            },
            0
          );

          // 5. Keep window scroll position synchronized with pinned ScrollTrigger track
          // Using designated progress positions: Pillar 0 at 0.05, Pillar 1 at 0.40, Pillar 2 (Product) at 0.75
          // This leaves a dedicated buffer before st.end so Product never prematurely cross-triggers Selected Work
          if (scrollTriggerInstanceRef.current) {
            const st = scrollTriggerInstanceRef.current;
            const progressSteps = [0.05, 0.40, 0.75];
            const targetScroll =
              st.start + progressSteps[targetIndex] * (st.end - st.start);
            if ((window as any).__lenis) {
              (window as any).__lenis.scrollTo(targetScroll, { duration: 0.85 });
            } else {
              gsap.to(window, {
                scrollTo: targetScroll,
                duration: 0.85,
                ease: 'power2.inOut',
                autoKill: false,
              });
            }
          }
        };

        // ScrollTrigger to firmly pin the section while transitioning between the 3 states
        // Extended virtual track to 1500px with sequential isolation
        const st = ScrollTrigger.create({
          trigger: sectionRef.current,
          pin: true,
          start: 'top top',
          end: '+=1500',
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Support direct scrollbar dragging if user drags manually
            if (!isLockedRef.current) {
              const p = self.progress;
              const idx = p > 0.60 ? 2 : p > 0.22 ? 1 : 0;
              if (idx !== currentIndexRef.current) {
                animateToCard(idx);
              }
            }
          },
          onEnter: () => {
            if (currentIndexRef.current !== 0 && !isLockedRef.current) {
              animateToCard(0);
            }
          },
          onEnterBack: () => {
            if (currentIndexRef.current !== 2 && !isLockedRef.current) {
              animateToCard(2);
            }
          },
        });

        scrollTriggerInstanceRef.current = st;

        // Keyboard arrow navigation support
        const handleKeyDown = (e: KeyboardEvent) => {
          const currentST = scrollTriggerInstanceRef.current;
          if (!currentST || !currentST.isActive) return;

          if (isLockedRef.current) {
            if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp'].includes(e.key)) {
              e.preventDefault();
            }
            return;
          }

          if (e.key === 'ArrowDown' || e.key === 'PageDown') {
            if (currentIndexRef.current < 2) {
              e.preventDefault();
              animateToCard(currentIndexRef.current + 1);
            }
          } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            if (currentIndexRef.current > 0) {
              e.preventDefault();
              animateToCard(currentIndexRef.current - 1);
            }
          }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Direct click on textual words jumps immediately to that card
  const handleWordClick = (index: number) => {
    if (typeof window === 'undefined') return;

    if (window.innerWidth < 1024) {
      setActiveTabMobile(index);
      return;
    }

    if (isLockedRef.current || index === currentIndexRef.current) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    const words = wordsRef.current.filter(Boolean) as HTMLButtonElement[];
    const indicators = indicatorRef.current.filter(Boolean) as HTMLSpanElement[];

    if (cards.length < 3 || words.length < 3) return;

    const prevIndex = currentIndexRef.current;
    currentIndexRef.current = index;
    setActivePillarState(index);
    isLockedRef.current = true;

    const isAdvancing = index > prevIndex;
    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut', force3D: true },
      onComplete: () => {
        setTimeout(() => {
          isLockedRef.current = false;
        }, 200);
      },
    });

    // Exiting card
    tl.to(
      cards[prevIndex],
      {
        yPercent: isAdvancing ? -125 : 115,
        opacity: 0,
        scale: isAdvancing ? 0.88 : 0.92,
        rotationZ: isAdvancing ? -5 : 4,
        rotationX: isAdvancing ? -15 : 20,
        duration: 0.85,
      },
      0
    );

    // Entering card
    gsap.set(cards[index], {
      yPercent: isAdvancing ? 115 : -125,
      opacity: 0,
      scale: isAdvancing ? 0.92 : 0.88,
      rotationX: isAdvancing ? 20 : -15,
      rotationZ: isAdvancing ? -3 : 5,
      force3D: true,
    });

    tl.to(
      cards[index],
      {
        yPercent: 0,
        opacity: 1,
        scale: 1,
        rotationX: 0,
        rotationZ: 0,
        duration: 0.85,
      },
      '<'
    );

    // Text & Indicators
    for (let i = 0; i < 3; i++) {
      if (i === index) {
        tl.to(words[i], { opacity: 1, color: '#ffffff', x: 8, duration: 0.6 }, '<+=0.1');
        tl.to(indicators[i], { opacity: 1, scale: 1, duration: 0.4 }, '<');
      } else {
        tl.to(words[i], { opacity: 0.28, color: '#737373', x: 0, duration: 0.5 }, '<');
        tl.to(indicators[i], { opacity: 0, scale: 0.4, duration: 0.3 }, '<');
      }
    }

    // Rail progress
    tl.to(progressLineRef.current, { height: `${(index / 2) * 100}%`, duration: 0.85 }, 0);

    // Sync window scroll with isolated offsets
    if (scrollTriggerInstanceRef.current) {
      const st = scrollTriggerInstanceRef.current;
      const progressSteps = [0.05, 0.40, 0.75];
      const targetScroll = st.start + progressSteps[index] * (st.end - st.start);
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(targetScroll, { duration: 0.85 });
      } else {
        gsap.to(window, {
          scrollTo: targetScroll,
          duration: 0.85,
          ease: 'power2.inOut',
          autoKill: false,
        });
      }
    }
  };

  return (
    <section
      id="pillars"
      ref={sectionRef}
      className="relative bg-[#0b0b0b] text-white min-h-screen min-h-[100dvh] flex flex-col justify-center overflow-hidden py-16 sm:py-24 lg:py-0"
    >
      {/* Dark Architectural Grid Guides */}
      <div className="architectural-grid dark-grid opacity-30">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} />
        ))}
      </div>

      {/* Subtle Radar Background Rings & Crosshairs */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] lg:w-[760px] lg:h-[760px] rounded-full border border-neutral-700/60" />
        <div className="absolute w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] lg:w-[520px] lg:h-[520px] rounded-full border border-neutral-700/50" />
        <div className="absolute w-[100px] h-[100px] sm:w-[180px] sm:h-[180px] lg:w-[280px] lg:h-[280px] rounded-full border border-neutral-700/40" />
        <div className="absolute w-full h-[1px] bg-neutral-800/60" />
        <div className="absolute h-full w-[1px] bg-neutral-800/60" />
      </div>

      <div
        ref={containerRef}
        className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex flex-col justify-center"
      >
        {/* Section Header Meta */}
        <div className="flex items-center justify-between gap-4 text-xs font-mono tracking-widest text-neutral-400 uppercase pb-6 border-b border-neutral-800/80 mb-6 lg:mb-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-600 inline-block" />
            <span>02 // CORE DISCIPLINE MATRIX</span>
          </div>
          <div className="font-mono text-[11px] text-neutral-500">
            <span>PHASE 0{activePillarState + 1} / 03</span>
          </div>
        </div>

        {/* Main Split-Screen Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left Column: Stacked Pillar Titles (6 cols) */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-5 select-none relative">
              {/* Vertical scrub indicator rail */}
              <div className="hidden lg:block absolute -left-5 top-2 bottom-2 w-[2px] bg-neutral-800 rounded-full overflow-hidden">
                <div
                  ref={progressLineRef}
                  className="w-full bg-blue-600 transition-none h-[0%]"
                />
              </div>

              {CORE_PILLARS.map((pillar, idx) => {
                return (
                  <button
                    key={pillar.id}
                    ref={(el) => {
                      wordsRef.current[idx] = el;
                    }}
                    onClick={() => handleWordClick(idx)}
                    className="group flex items-center gap-4 text-left w-full focus:outline-none transition-all duration-200 cursor-pointer"
                  >
                    <span className="text-[9.5vw] sm:text-[7vw] lg:text-[4.5vw] font-black tracking-tight uppercase leading-none text-neutral-500 transition-colors duration-200">
                      {pillar.title}.
                    </span>
                    <span
                      ref={(el) => {
                        indicatorRef.current[idx] = el;
                      }}
                      className="w-3 h-3 bg-blue-600 rounded-none shrink-0 opacity-0"
                    />
                  </button>
                );
              })}
            </div>

            {/* Subtitle with Hand-Drawn Loop */}
            <div className="pt-2 text-neutral-400 text-base sm:text-xl lg:text-2xl font-medium tracking-tight flex flex-wrap items-center gap-2">
              <span>Each essential. Each in</span>
              <div className="relative inline-block px-3 py-1">
                <span className="text-white font-semibold">sync.</span>
                <svg
                  viewBox="0 0 120 48"
                  className="absolute inset-0 w-full h-full text-blue-500 pointer-events-none overflow-visible"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M 10 24 C 10 10, 110 8, 112 24 C 114 38, 15 42, 8 26 C 6 20, 24 12, 50 14"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-90 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Right Column: Absolute 3D Card Stack Container (6 cols) */}
          <div className="lg:col-span-6">
            {/* Desktop 3D Card Stage with fixed 1200px perspective and preserve-3d */}
            <div
              className="relative w-full h-[460px] sm:h-[490px] lg:h-[520px] hidden lg:block"
              style={{
                perspective: 1200,
                WebkitPerspective: 1200,
                perspectiveOrigin: '50% 50%',
                transformStyle: 'preserve-3d',
              }}
            >
              {CORE_PILLARS.map((pillar, idx) => {
                return (
                  <div
                    key={pillar.id}
                    ref={(el) => {
                      cardsRef.current[idx] = el;
                    }}
                    className="card bento-row absolute inset-0 w-full h-full rounded-3xl bg-neutral-900/95 border border-neutral-800 p-8 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl flex flex-col justify-between"
                    style={{
                      transformStyle: 'preserve-3d',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      willChange: 'transform, opacity',
                    }}
                  >
                    {/* Header */}
                    <div>
                      <div className="flex items-center justify-between pb-6 border-b border-neutral-800 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                          <span className="font-mono text-blue-400 tracking-wider uppercase font-semibold">
                            {pillar.cardTag}
                          </span>
                        </div>
                        <span className="font-mono px-3 py-1 bg-neutral-800/80 rounded-full border border-neutral-700/60 text-neutral-300 text-[11px]">
                          {pillar.metric}
                        </span>
                      </div>

                      {/* Headline & Body */}
                      <div className="pt-6 space-y-4">
                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
                          {pillar.headline}
                        </h3>
                        <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
                          {pillar.description}
                        </p>
                      </div>

                      {/* Key Capabilities */}
                      <div className="pt-6 space-y-3">
                        <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-500">
                          KEY CAPABILITIES
                        </div>
                        <div className="grid grid-cols-2 gap-2.5 pt-1">
                          {pillar.capabilities.map((cap, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-2.5 p-2.5 rounded-xl bg-neutral-950/60 border border-neutral-800/80 text-xs text-neutral-300 font-medium"
                            >
                              <CheckCircle2 size={15} className="text-blue-500 shrink-0" />
                              <span className="line-clamp-1">{cap}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="pt-6 border-t border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-500">
                      <div className="flex items-center gap-2">
                        <Terminal size={14} className="text-neutral-400" />
                        <span>matrix_phase: 0{idx + 1} / 03</span>
                      </div>
                      <span className="text-blue-400 font-semibold">{pillar.title}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile / Tablet Fallback Card (Clean Tabbed Switcher with Touch Swipe) */}
            <div className="block lg:hidden">
              <div
                onTouchStart={handleMobileCardTouchStart}
                onTouchEnd={handleMobileCardTouchEnd}
                className="card bento-row rounded-3xl bg-neutral-900 border border-neutral-800 p-6 sm:p-8 shadow-xl touch-pan-y"
              >
                <div className="flex items-center justify-between pb-5 border-b border-neutral-800 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    <span className="font-mono text-blue-400 font-semibold uppercase">
                      {CORE_PILLARS[activeTabMobile].cardTag}
                    </span>
                  </div>
                  <span className="font-mono px-3 py-1 bg-neutral-800 rounded-full border border-neutral-700 text-neutral-300 text-[11px]">
                    {CORE_PILLARS[activeTabMobile].metric}
                  </span>
                </div>

                <div className="pt-5 space-y-3">
                  <h3 className="text-xl font-bold text-white">
                    {CORE_PILLARS[activeTabMobile].headline}
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    {CORE_PILLARS[activeTabMobile].description}
                  </p>
                </div>

                <div className="pt-5 space-y-2">
                  <div className="text-[11px] font-mono text-neutral-500 uppercase">
                    CAPABILITIES
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {CORE_PILLARS[activeTabMobile].capabilities.map((cap, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 p-2 rounded-lg bg-neutral-950 border border-neutral-800 text-xs text-neutral-300"
                      >
                        <CheckCircle2 size={14} className="text-blue-500 shrink-0" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-neutral-800 flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-500">TAP PILLARS TO SWITCH</span>
                  <div className="flex gap-2">
                    {CORE_PILLARS.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveTabMobile(i)}
                        className={`h-2 rounded-full transition-all ${
                          activeTabMobile === i ? 'w-6 bg-blue-500' : 'w-2 bg-neutral-700'
                        }`}
                        aria-label={`Switch to pillar ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

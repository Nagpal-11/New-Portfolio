import React, { useRef, useState } from 'react';
import SkillGauges from './SkillGauges';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

function SpotlightBentoCard({
  children,
  className = '',
  spotlightColor = 'rgba(59, 130, 246, 0.06)',
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: -500, y: -500 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`bento-card group relative bg-white border border-neutral-200/90 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-neutral-300 overflow-hidden flex flex-col justify-between select-none ${className}`}
    >
      {/* Interactive Radial Cursor Spotlight Halo */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />
      <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
        {children}
      </div>
    </div>
  );
}

export default function MetricsGrid() {
  return (
    <>
      {/* 100% Unpinned Natural-Scroll Engineering Bento Grid */}
      <section
        id="metrics"
        className="relative bg-[#f3f3f0] pt-16 sm:pt-20 lg:pt-24 pb-10 sm:pb-12 h-auto"
      >
        {/* Subtle Architectural Grid Lines */}
        <div className="architectural-grid">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12">
          {/* Section Header Meta - Streamlined & Minimal */}
          <div className="flex items-center justify-between pb-5 border-b border-neutral-200/80">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-neutral-500 uppercase font-mono">
              <span className="w-2 h-2 bg-blue-600 inline-block rounded-xs" />
              <span className="text-neutral-900 font-bold">04 // VALIDATION &amp; TRACK RECORD</span>
            </div>
          </div>

          {/* Section Headline */}
          <div className="pt-6 pb-10 sm:pb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase text-neutral-950">
                Next-Gen Engineer.<br />Proven Execution.
              </h2>
            </div>
            <div className="max-w-md">
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-sans">
                Rigorous computer science foundation paired with sovereign government grant validation, national hackathon podiums, and deployed neural pipelines.
              </p>
            </div>
          </div>

          {/* Editorial Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-6xl mx-auto">
            {/* ========================================================================= */}
            {/* CARD A: Featured Hero — AI Architecture (Span 2 Columns) */}
            {/* ========================================================================= */}
            <SpotlightBentoCard
              className="lg:col-span-2 md:col-span-2 col-span-1 min-h-[280px]"
              spotlightColor="rgba(37, 99, 235, 0.08)"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200/80 text-blue-700 font-mono text-[10px] font-bold tracking-wider uppercase">
                    DEEP LEARNING // RNN
                  </span>
                  <span className="text-[11px] font-mono font-semibold text-neutral-400">
                    94.23% ACCURACY
                  </span>
                </div>

                <div>
                  <div className="text-xs font-mono font-bold tracking-wider text-neutral-400 uppercase">
                    TRAINABLE PARAMETERS
                  </div>
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-mono tracking-tight text-neutral-950 mt-1">
                    1,313,025
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm sm:text-base font-bold text-neutral-900 tracking-tight">
                    Custom Recurrent Neural Network
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    Custom-engineered Simple RNN architecture. 94.23% classification accuracy with a compact ~5.01 MB edge-optimized footprint.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                <span>TensorFlow &amp; Keras</span>
                <span className="font-semibold text-neutral-700">~5.01 MB Weight</span>
              </div>
            </SpotlightBentoCard>

            {/* ========================================================================= */}
            {/* CARD B: Featured Hero — MeitY Grant (Span 2 Columns) */}
            {/* ========================================================================= */}
            <SpotlightBentoCard
              className="lg:col-span-2 md:col-span-2 col-span-1 min-h-[280px]"
              spotlightColor="rgba(16, 185, 129, 0.08)"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200/80 text-emerald-800 font-mono text-[10px] font-bold tracking-wider uppercase">
                    RESEARCH GRANT
                  </span>
                  <span className="text-[11px] font-mono font-semibold text-emerald-700 uppercase">
                    GOVT. OF INDIA
                  </span>
                </div>

                <div>
                  <div className="text-xs font-mono font-bold tracking-wider text-neutral-400 uppercase">
                    COMPETITIVE FUNDING SECURED
                  </div>
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-mono tracking-tight text-neutral-950 mt-1">
                    ₹5,00,000
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm sm:text-base font-bold text-neutral-900 tracking-tight">
                    MeitY GENESIS Grant
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    Entrepreneur-in-Residence award recipient supporting deep-tech innovation. Selected to build and scale an accessible clinical AI healthcare platform.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                <span>Ministry of Electronics &amp; IT</span>
                <span className="font-semibold text-neutral-700">Disbursed</span>
              </div>
            </SpotlightBentoCard>

            {/* ========================================================================= */}
            {/* CARD C: Compact Tile — Hackathon */}
            {/* ========================================================================= */}
            <SpotlightBentoCard
              className="lg:col-span-1 md:col-span-1 col-span-1 min-h-[240px]"
              spotlightColor="rgba(245, 158, 11, 0.08)"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200/80 text-amber-700 font-mono text-[10px] font-bold uppercase tracking-wider">
                    ACCOLADES
                  </span>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-neutral-950">
                    1ST PLACE
                  </div>
                  <h4 className="text-xs font-bold text-neutral-900 mt-0.5 uppercase tracking-wide">
                    Hackathon Champion
                  </h4>
                </div>

                <p className="text-xs text-neutral-600 leading-relaxed">
                  Yuvamanthan Hackathon 2025 &amp; Case Study Champion recognized by Mizoram University and Ministry of Education for technical execution.
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-[10px] font-mono text-neutral-500 uppercase">
                <span>Multi-Agent AI</span>
                <span className="text-neutral-700 font-semibold">Oct 2025</span>
              </div>
            </SpotlightBentoCard>

            {/* ========================================================================= */}
            {/* CARD D: Compact Tile — Leadership */}
            {/* ========================================================================= */}
            <SpotlightBentoCard
              className="lg:col-span-1 md:col-span-1 col-span-1 min-h-[240px]"
              spotlightColor="rgba(147, 51, 234, 0.08)"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-md bg-purple-50 border border-purple-200/80 text-purple-700 font-mono text-[10px] font-bold uppercase tracking-wider">
                    LEADERSHIP
                  </span>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-neutral-950">
                    AI LEAD
                  </div>
                  <h4 className="text-xs font-bold text-neutral-900 mt-0.5 uppercase tracking-wide">
                    Mizoram Univ. Student Body
                  </h4>
                </div>

                <p className="text-xs text-neutral-600 leading-relaxed">
                  Organizing university-wide machine learning workshops, hackathons, and deep-tech initiatives for 250+ aspiring engineers.
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-[10px] font-mono text-neutral-500 uppercase">
                <span>Community</span>
                <span className="text-neutral-700 font-semibold">Executive</span>
              </div>
            </SpotlightBentoCard>

            {/* ========================================================================= */}
            {/* CARD E: Compact Tile — Olympiad */}
            {/* ========================================================================= */}
            <SpotlightBentoCard
              className="lg:col-span-1 md:col-span-1 col-span-1 min-h-[240px]"
              spotlightColor="rgba(14, 165, 233, 0.08)"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-md bg-sky-50 border border-sky-200/80 text-sky-700 font-mono text-[10px] font-bold uppercase tracking-wider">
                    ANALYTICAL
                  </span>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-neutral-950">
                    OLYMPIAD
                  </div>
                  <h4 className="text-xs font-bold text-neutral-900 mt-0.5 uppercase tracking-wide">
                    State-Level Problem Solving
                  </h4>
                </div>

                <p className="text-xs text-neutral-600 leading-relaxed">
                  State Space Olympiad Qualifier distinguished for rapid algorithmic deduction, mathematical reasoning, and structural physics problem solving.
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-[10px] font-mono text-neutral-500 uppercase">
                <span>Physics &amp; Math</span>
                <span className="text-neutral-700 font-semibold">State Rank</span>
              </div>
            </SpotlightBentoCard>

            {/* ========================================================================= */}
            {/* CARD F: Compact Tile — Systems Foundation */}
            {/* ========================================================================= */}
            <SpotlightBentoCard
              className="lg:col-span-1 md:col-span-1 col-span-1 min-h-[240px]"
              spotlightColor="rgba(75, 85, 99, 0.08)"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-md bg-neutral-100 border border-neutral-200 text-neutral-700 font-mono text-[10px] font-bold uppercase tracking-wider">
                    ENGINEERING
                  </span>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-neutral-950">
                    CORE CS
                  </div>
                  <h4 className="text-xs font-bold text-neutral-900 mt-0.5 uppercase tracking-wide">
                    Systems &amp; Low-Latency
                  </h4>
                </div>

                <p className="text-xs text-neutral-600 leading-relaxed">
                  Data Structures, Systems Programming &amp; Low-latency Engineering in C, C++, Python, SQL, OOP design patterns, and memory-conscious architectures.
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-[10px] font-mono text-neutral-500 uppercase">
                <span>C / C++ / Python / SQL</span>
                <span className="text-neutral-700 font-semibold">Deterministic</span>
              </div>
            </SpotlightBentoCard>
          </div>
        </div>
      </section>

      {/* Interactive Engineering Radar & Topology Visualizer */}
      <section className="relative pt-6 sm:pt-8 pb-16 sm:pb-24 bg-[#f3f3f0] border-b border-neutral-200/80 h-auto">
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <SkillGauges />
        </div>
      </section>
    </>
  );
}

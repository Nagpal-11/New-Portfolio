import React, { useState, useCallback, useRef, memo, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Activity,
  ArrowUpRight,
  Radio,
  Compass,
  CheckCircle2,
} from 'lucide-react';

interface TopologyNode {
  id: string;
  code: string;
  name: string;
  shortLabel: string;
  category: string;
  angleDeg: number; // Polar angle in degrees
  tier: 'CORE' | 'APPLIED' | 'PRODUCTION' | 'SPECIALIZED';
  tierRatio: number; // 0 to 1 relative to outer ring radius
  benchmark: string;
  technologies: string[];
  executionSummary: string;
  accentColor: string;
  relatedNodeIds: string[];
  caseStudyId: string;
  caseStudyLabel: string;
  metrics: { label: string; value: string }[];
}

const TOPOLOGY_NODES: TopologyNode[] = [
  {
    id: 'deep-learning',
    code: '01 // INTELLIGENCE',
    name: 'Deep Learning & Neural Architectures',
    shortLabel: 'DL / NEURAL',
    category: 'Deep Learning',
    angleDeg: -90, // 12 o'clock
    tier: 'SPECIALIZED',
    tierRatio: 0.94,
    benchmark: '~5.01 MB Edge Footprint // 94.23% Test Accuracy',
    technologies: ['PyTorch', 'TensorFlow', 'Custom RNNs', 'Gradient Optimizers', 'Scikit-Learn'],
    executionSummary:
      'Engineered recurrent sequence models and deep classification networks with hyperparameter regularization and loss surface diagnostics. Compiled lightweight edge-ready architectures achieving 94.23% validation accuracy on real-world test distributions.',
    accentColor: '#2563eb', // Blue
    relatedNodeIds: ['llm-nlp', 'systems-oop'],
    caseStudyId: 'work',
    caseStudyLabel: 'Interactive Sentiment RNN',
    metrics: [
      { label: 'Model Footprint', value: '5.01 MB' },
      { label: 'Trainable Params', value: '1.31M' },
      { label: 'Inference Latency', value: '4.12ms' },
    ],
  },
  {
    id: 'dsa',
    code: '02 // ALGORITHMIC CS',
    name: 'Data Structures & Algorithms',
    shortLabel: 'DSA / O(1)',
    category: 'Core Computer Science',
    angleDeg: -30, // 2 o'clock
    tier: 'PRODUCTION',
    tierRatio: 0.88,
    benchmark: 'O(1) Auxiliary Space // State Olympiad Qualifier',
    technologies: ['C / C++', 'Graph Theory', 'Dynamic Programming', 'Tree Balancing', 'Amortized Analysis'],
    executionSummary:
      'Formulated deterministic algorithm suites emphasizing minimal time complexity and strict cache-friendly memory access patterns. Proven record through national hackathon championships and state-level space olympiad qualification.',
    accentColor: '#0ea5e9', // Sky
    relatedNodeIds: ['systems-oop', 'relational-sql'],
    caseStudyId: 'metrics',
    caseStudyLabel: 'State Olympiad & Algorithm Suite',
    metrics: [
      { label: 'Space Optimality', value: 'O(1) Aux' },
      { label: 'Search Bounds', value: 'O(log N)' },
      { label: 'Heap Overhead', value: '0 Bytes' },
    ],
  },
  {
    id: 'systems-oop',
    code: '03 // ARCHITECTURE',
    name: 'Systems & Object-Oriented Engineering',
    shortLabel: 'SYS / OOP',
    category: 'Core Computer Science',
    angleDeg: 30, // 4 o'clock
    tier: 'PRODUCTION',
    tierRatio: 0.86,
    benchmark: 'Strict OOP Paradigms // Deterministic Memory Lifecycle',
    technologies: ['C++20', 'SOLID Principles', 'STL Allocators', 'Design Patterns', 'RAII Lifecycle'],
    executionSummary:
      'Constructed decoupled, modular system architectures enforcing robust polymorphic interfaces and clean dependency inversion. Applied strict memory lifecycle boundaries to guarantee zero memory leaks under continuous high-frequency workloads.',
    accentColor: '#6366f1', // Indigo
    relatedNodeIds: ['dsa', 'backend-apis'],
    caseStudyId: 'work',
    caseStudyLabel: 'Modular Core Systems',
    metrics: [
      { label: 'Architecture', value: 'SOLID Clean' },
      { label: 'Memory Pattern', value: 'RAII Guard' },
      { label: 'Leak Audit', value: '0 Valgrind' },
    ],
  },
  {
    id: 'llm-nlp',
    code: '04 // GENERATIVE & NLP',
    name: 'Large Language Models & NLP',
    shortLabel: 'LLM / NLP',
    category: 'Applied AI & Reasoning',
    angleDeg: 90, // 6 o'clock
    tier: 'SPECIALIZED',
    tierRatio: 0.91,
    benchmark: 'LoRA / QLoRA Fine-Tuning // Vector Retrieval',
    technologies: ['LLaMA2', 'HuggingFace', 'vLLM', 'Vector Embeddings', 'Tokenization'],
    executionSummary:
      'Specialized in parameter-efficient fine-tuning (PEFT) of open-weights foundation models and building domain-adapted clinical triage pipelines. Backed by a ₹5 Lakh MeitY GENESIS EiR grant for healthcare AI acceleration.',
    accentColor: '#8b5cf6', // Violet
    relatedNodeIds: ['deep-learning', 'backend-apis'],
    caseStudyId: 'work',
    caseStudyLabel: 'Clinical AI Platform',
    metrics: [
      { label: 'Quantization', value: '4-Bit QLoRA' },
      { label: 'Token Window', value: '4,096 CTX' },
      { label: 'Grant Endorsement', value: 'MeitY ₹5L' },
    ],
  },
  {
    id: 'backend-apis',
    code: '05 // SERVING & APIS',
    name: 'Backend Microservices & Serving',
    shortLabel: 'BACKEND / API',
    category: 'Systems & Infrastructure',
    angleDeg: 150, // 8 o'clock
    tier: 'PRODUCTION',
    tierRatio: 0.85,
    benchmark: '<12ms P99 Latency // Concurrency & REST/WSGI',
    technologies: ['FastAPI', 'Flask REST', 'WSGI / Gunicorn', 'POSIX / Linux', 'Docker'],
    executionSummary:
      'Designed asynchronous serving layers and microsecond-optimized model wrappers for low-latency production inference dispatch. Implemented deterministic telemetry instrumentation and resilient connection pooling under load.',
    accentColor: '#06b6d4', // Cyan
    relatedNodeIds: ['relational-sql', 'systems-oop'],
    caseStudyId: 'work',
    caseStudyLabel: 'Inference Microservices',
    metrics: [
      { label: 'P99 Latency', value: '<11.4ms' },
      { label: 'Protocol', value: 'HTTP/WSGI' },
      { label: 'Concurrency', value: 'Async Event' },
    ],
  },
  {
    id: 'relational-sql',
    code: '06 // DATA INFRASTRUCTURE',
    name: 'Relational & Distributed Databases',
    shortLabel: 'DB / SQL',
    category: 'Data & Infrastructure',
    angleDeg: 210, // 10 o'clock
    tier: 'APPLIED',
    tierRatio: 0.82,
    benchmark: '3NF Normalization // B-Tree Index Optimization',
    technologies: ['PostgreSQL', 'MySQL', 'Query Tuning', 'Schema Design', 'ACID Transactions'],
    executionSummary:
      'Designed normalized entity relational schemas with composite indexing strategies yielding sub-millisecond query scans on telemetry workloads. Ensured strict transactional integrity across concurrent record mutations.',
    accentColor: '#10b981', // Emerald
    relatedNodeIds: ['backend-apis', 'dsa'],
    caseStudyId: 'work',
    caseStudyLabel: 'Telemetry Analytics DB',
    metrics: [
      { label: 'Normalization', value: 'Strict 3NF' },
      { label: 'Scan Speed', value: '0.84ms Exec' },
      { label: 'Integrity', value: 'Full ACID' },
    ],
  },
];

// Concentric ring tiers
const CALIBRATION_RINGS = [
  { label: 'CORE', ratio: 0.35 },
  { label: 'APPLIED', ratio: 0.60 },
  { label: 'PRODUCTION', ratio: 0.82 },
  { label: 'SPECIALIZED', ratio: 1.00 },
];

const SIZE = 520;
const CENTER = SIZE / 2;
const MAX_RADIUS = 190;

// Precompute static topology positions once
const COMPUTED_NODE_POSITIONS = TOPOLOGY_NODES.map((node) => {
  const angleRad = (node.angleDeg * Math.PI) / 180;
  const r = MAX_RADIUS * node.tierRatio;
  const x = CENTER + r * Math.cos(angleRad);
  const y = CENTER + r * Math.sin(angleRad);

  const labelR = MAX_RADIUS + 32;
  const labelX = CENTER + labelR * Math.cos(angleRad);
  const labelY = CENTER + labelR * Math.sin(angleRad);

  return {
    ...node,
    x,
    y,
    labelX,
    labelY,
    angleRad,
  };
});

const POLYGON_POINTS = COMPUTED_NODE_POSITIONS.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');

// Precompute interconnecting links
const COMPUTED_LINKS: {
  source: typeof COMPUTED_NODE_POSITIONS[0];
  target: typeof COMPUTED_NODE_POSITIONS[0];
  id: string;
}[] = [];
const processedPairs = new Set<string>();

COMPUTED_NODE_POSITIONS.forEach((source) => {
  source.relatedNodeIds.forEach((relId) => {
    const target = COMPUTED_NODE_POSITIONS.find((n) => n.id === relId);
    if (target) {
      const pairKey = [source.id, target.id].sort().join('--');
      if (!processedPairs.has(pairKey)) {
        processedPairs.add(pairKey);
        COMPUTED_LINKS.push({ source, target, id: pairKey });
      }
    }
  });
});

// Memoized SVG Radar Component to avoid entire SVG tree re-rendering
interface RadarCanvasProps {
  activeNodeId: string;
  onSelectNode: (id: string) => void;
}

const RadarCanvas = memo(function RadarCanvas({
  activeNodeId,
  onSelectNode,
}: RadarCanvasProps) {
  const activeNode = useMemo(
    () => TOPOLOGY_NODES.find((n) => n.id === activeNodeId) || TOPOLOGY_NODES[0],
    [activeNodeId]
  );

  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[460px] aspect-square flex-shrink-0 flex items-center justify-center radar-container mx-auto">
      {/* SVG Radar Visualization */}
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="w-full h-full aspect-square overflow-visible select-none radar-svg pointer-events-none"
      >
        <defs>
          <radialGradient id="radarFillGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.20" />
            <stop offset="70%" stopColor="#3b82f6" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.02" />
          </radialGradient>
        </defs>

        {/* 1. Background Concentric Calibration Rings - Strict pointer-events: none */}
        <g className="pointer-events-none" style={{ pointerEvents: 'none' }}>
          {CALIBRATION_RINGS.map((ring, idx) => {
            const r = MAX_RADIUS * ring.ratio;
            return (
              <g key={ring.label} className="pointer-events-none">
                <circle
                  cx={CENTER}
                  cy={CENTER}
                  r={r}
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="1"
                  strokeDasharray={idx === CALIBRATION_RINGS.length - 1 ? 'none' : '3 4'}
                />
                <text
                  x={CENTER + 6}
                  y={CENTER - r + 11}
                  fill="#9ca3af"
                  fontSize="8.5"
                  fontFamily="monospace"
                  fontWeight="600"
                  letterSpacing="0.08em"
                  className="select-none pointer-events-none"
                >
                  {ring.label}
                </text>
              </g>
            );
          })}
        </g>

        {/* 2. 6 Radial Axes Lines - Strict pointer-events: none */}
        <g className="pointer-events-none" style={{ pointerEvents: 'none' }}>
          {COMPUTED_NODE_POSITIONS.map((pos) => {
            const endX = CENTER + (MAX_RADIUS + 8) * Math.cos(pos.angleRad);
            const endY = CENTER + (MAX_RADIUS + 8) * Math.sin(pos.angleRad);
            const isNodeActive = pos.id === activeNodeId;

            return (
              <line
                key={`axis-${pos.id}`}
                x1={CENTER}
                y1={CENTER}
                x2={endX}
                y2={endY}
                stroke={isNodeActive ? pos.accentColor : '#e5e7eb'}
                strokeWidth={isNodeActive ? '1.5' : '1'}
                strokeDasharray="2 3"
                className="transition-colors duration-200"
              />
            );
          })}
        </g>

        {/* 3. Interconnecting Hairline Data-Paths - Strict pointer-events: none */}
        <g className="pointer-events-none" style={{ pointerEvents: 'none' }}>
          {COMPUTED_LINKS.map((link) => {
            const isHighlighted =
              link.source.id === activeNodeId || link.target.id === activeNodeId;

            return (
              <line
                key={`link-${link.id}`}
                x1={link.source.x}
                y1={link.source.y}
                x2={link.target.x}
                y2={link.target.y}
                stroke={isHighlighted ? activeNode.accentColor : '#cbd5e1'}
                strokeWidth={isHighlighted ? '1.75' : '0.8'}
                strokeDasharray={isHighlighted ? 'none' : '3 3'}
                strokeOpacity={isHighlighted ? 0.95 : 0.35}
                className="transition-all duration-200"
              />
            );
          })}
        </g>

        {/* 4. Enclosing Topology SVG Polygon - Strict pointer-events: none */}
        <polygon
          points={POLYGON_POINTS}
          fill="url(#radarFillGradient)"
          stroke={activeNode.accentColor}
          strokeWidth="2"
          strokeLinejoin="round"
          className="pointer-events-none transition-colors duration-200"
          style={{ pointerEvents: 'none' }}
        />

        {/* Center Origin Hub - Strict pointer-events: none */}
        <circle cx={CENTER} cy={CENTER} r="4" fill="#0f172a" className="pointer-events-none" />
        <circle cx={CENTER} cy={CENTER} r="8" fill="none" stroke="#94a3b8" strokeWidth="1" className="pointer-events-none" />

        {/* 5. Nodes Interactive Touch / Click Elements - ONLY these have pointer-events: auto */}
        {COMPUTED_NODE_POSITIONS.map((pos) => {
          const isActive = pos.id === activeNodeId;

          return (
            <g
              key={`node-${pos.id}`}
              className="cursor-pointer"
              style={{ pointerEvents: 'auto' }}
              onClick={() => onSelectNode(pos.id)}
              onMouseEnter={() => onSelectNode(pos.id)}
            >
              {/* Expanded Transparent Hit Target to Prevent 1px Edge Flickering */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r="28"
                fill="transparent"
                className="cursor-pointer"
                style={{ pointerEvents: 'auto' }}
              />

              {/* Active Soft Pulse Halo (pointer-events: none to avoid event interference) */}
              {isActive && (
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="14"
                  fill={pos.accentColor}
                  fillOpacity="0.22"
                  className="pointer-events-none transition-all duration-200"
                  style={{ pointerEvents: 'none' }}
                />
              )}

              {/* Node Outer Ring */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={isActive ? '8.5' : '6.5'}
                fill="#ffffff"
                stroke={pos.accentColor}
                strokeWidth={isActive ? '2.5' : '1.75'}
                className="pointer-events-none transition-all duration-200"
                style={{ pointerEvents: 'none' }}
              />

              {/* Inner Solid Core Dot */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={isActive ? '3.5' : '2.5'}
                fill={pos.accentColor}
                className="pointer-events-none transition-all duration-200"
                style={{ pointerEvents: 'none' }}
              />

              {/* Monospace Perimeter Label Tag - Strict pointer-events: none */}
              <g
                transform={`translate(${pos.labelX}, ${pos.labelY})`}
                className="pointer-events-none select-none"
                style={{ pointerEvents: 'none' }}
              >
                <rect
                  x="-32"
                  y="-10"
                  width="64"
                  height="20"
                  rx="4"
                  fill={isActive ? '#0f172a' : '#ffffff'}
                  stroke={isActive ? pos.accentColor : '#e2e8f0'}
                  strokeWidth={isActive ? '1.5' : '1'}
                  className="transition-colors duration-200"
                />
                <text
                  x="0"
                  y="3"
                  textAnchor="middle"
                  fill={isActive ? '#ffffff' : '#475569'}
                  fontSize="8.5"
                  fontFamily="monospace"
                  fontWeight="700"
                  letterSpacing="0.05em"
                  className="transition-colors duration-200"
                >
                  {pos.shortLabel}
                </text>
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
});

export default function SkillGauges() {
  const [activeNodeId, setActiveNodeId] = useState<string>('deep-learning');
  const lastUpdateRef = useRef<number>(0);

  // Debounced/locked selection handler to eliminate rapid 60 FPS state thrashing
  const handleSelectNode = useCallback((id: string) => {
    const now = performance.now();
    // Skip if already the active node
    if (activeNodeId === id) return;
    // Debounce rapid micro-movements across boundary thresholds
    if (now - lastUpdateRef.current < 35) return;
    lastUpdateRef.current = now;
    setActiveNodeId(id);
  }, [activeNodeId]);

  const activeNode = useMemo(
    () => TOPOLOGY_NODES.find((n) => n.id === activeNodeId) || TOPOLOGY_NODES[0],
    [activeNodeId]
  );

  const handleCaseStudyClick = useCallback((targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div id="skills" className="relative space-y-8 select-text">
      {/* Visual Section Meta Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-neutral-200/90">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-blue-600 uppercase">
            <span className="w-2 h-2 bg-blue-600 inline-block" />
            <span>// ENGINEERING TOPOLOGY</span>
            <span className="text-neutral-300">/</span>
            <span className="text-neutral-500">POLAR RADAR PROJECTION</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-950">
            Empirical Proficiency Matrix.
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 font-mono">
            Interactive multi-dimensional architectural calibration across core disciplines.
          </p>
        </div>

        {/* Real-Time Telemetry Bar */}
        <div className="flex items-center gap-3 bg-white px-3.5 py-2 rounded-xl border border-neutral-200/90 shadow-xs self-start sm:self-auto text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-bold text-neutral-900">RADAR_FREQ: 60Hz</span>
          </div>
          <span className="text-neutral-200">|</span>
          <span className="text-neutral-500">SYS_MAP_V2</span>
        </div>
      </div>

      {/* Main Split Architecture Visualizer Frame */}
      <div className="max-w-6xl mx-auto rounded-3xl bg-[#fbfbfa] border border-neutral-200/90 shadow-xs overflow-hidden">
        {/* Top Minimalist HUD Bar */}
        <div className="flex flex-wrap items-center justify-between px-6 py-3 border-b border-neutral-200/80 bg-white/70 text-[11px] font-mono text-neutral-500">
          <div className="flex items-center gap-2">
            <Radio size={13} className="text-blue-600 animate-pulse" />
            <span className="font-semibold text-neutral-700">POLAR TOPOLOGY // 6 AXES</span>
            <span className="text-neutral-300">·</span>
            <span>CALIBRATION: PRODUCTION AUDITED</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-neutral-400">
            <span>PROJECTION: ORTHOGRAPHIC POLAR</span>
            <span>LATENCY: ZERO PINNING</span>
          </div>
        </div>

        {/* Visualizer Grid: Left Radar Canvas + Right Telemetry Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 min-h-[540px] sm:min-h-[580px] lg:min-h-[640px] lg:h-[650px] items-stretch">
          {/* ================= LEFT: INTERACTIVE RADAR & TOPOLOGY CANVAS ================= */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col items-center justify-between relative border-b lg:border-b-0 lg:border-r border-neutral-200/80 bg-[#f9f9f8] radar-container lg:h-full flex-shrink-0">
            {/* Subtle Coordinate Watermarks */}
            <div className="absolute top-4 left-5 text-[10px] font-mono text-neutral-400 select-none">
              + [θ: 0°..360°]
            </div>
            <div className="absolute top-4 right-5 text-[10px] font-mono text-neutral-400 select-none">
              COORD: 250,250
            </div>
            <div className="absolute bottom-4 left-5 text-[10px] font-mono text-neutral-400 select-none">
              INTERSECTS: 6-DIM
            </div>
            <div className="absolute bottom-4 right-5 text-[10px] font-mono text-neutral-400 select-none">
              RAD: 190PX
            </div>

            {/* Isolated Memoized Radar Canvas Centered Vertically */}
            <div className="flex-1 w-full flex items-center justify-center min-h-0 py-2 sm:py-4">
              <RadarCanvas
                activeNodeId={activeNodeId}
                onSelectNode={handleSelectNode}
              />
            </div>

            {/* Interactive Legend / Prompt */}
            <div className="h-6 flex items-center gap-2 text-[11px] font-mono text-neutral-500 text-center flex-shrink-0">
              <Compass size={13} className="text-blue-600 shrink-0" />
              <span>HOVER / CLICK NODES TO INSPECT PRODUCTION TELEMETRY</span>
            </div>
          </div>

          {/* ================= RIGHT: ACTIVE TELEMETRY INSPECTOR ================= */}
          <div className="lg:col-span-5 p-6 sm:p-8 bg-white flex flex-col justify-between inspector-panel min-h-[540px] sm:min-h-[580px] lg:min-h-[640px] lg:h-full relative overflow-hidden">
            <div className="relative flex-1 flex flex-col justify-between overflow-hidden min-h-[440px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeNode.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15, ease: 'linear' }}
                  className="w-full flex flex-col justify-between h-full space-y-2 min-h-[440px]"
                >
                  {/* Top Telemetry Header & Title Slot with Fixed Height */}
                  <div className="space-y-1 border-b border-neutral-100 pb-3">
                    <div className="flex items-center justify-between gap-2 h-6">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full inline-block flex-shrink-0"
                          style={{ backgroundColor: activeNode.accentColor }}
                        />
                        <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-neutral-500">
                          {activeNode.code}
                        </span>
                      </div>
                      <span
                        className="text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider"
                        style={{
                          backgroundColor: `${activeNode.accentColor}15`,
                          color: activeNode.accentColor,
                          border: `1px solid ${activeNode.accentColor}35`,
                        }}
                      >
                        {activeNode.tier} TIER
                      </span>
                    </div>

                    <div className="h-[56px] flex items-center">
                      <h4 className="text-xl sm:text-2xl font-black tracking-tight text-neutral-950 leading-snug line-clamp-2">
                        {activeNode.name}
                      </h4>
                    </div>
                  </div>

                  {/* Verified Production Benchmark Pill Slot */}
                  <div className="space-y-1">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-semibold flex items-center gap-1.5 h-4">
                      <Activity size={12} className="text-neutral-400" />
                      <span>VERIFIED PRODUCTION BENCHMARK</span>
                    </div>
                    <div
                      className="p-2.5 rounded-xl font-mono text-xs font-bold border tracking-tight h-[40px] flex items-center truncate"
                      style={{
                        backgroundColor: `${activeNode.accentColor}08`,
                        borderColor: `${activeNode.accentColor}30`,
                        color: activeNode.accentColor,
                      }}
                    >
                      {activeNode.benchmark}
                    </div>
                  </div>

                  {/* 2-Sentence Real-World Production Execution Description Slot */}
                  <div className="space-y-1">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-semibold h-4">
                      PRODUCTION EXECUTION & ARCHITECTURE
                    </div>
                    <div className="h-[62px] flex items-start overflow-hidden">
                      <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed line-clamp-3">
                        {activeNode.executionSummary}
                      </p>
                    </div>
                  </div>

                  {/* Core Technology Pills Slot */}
                  <div className="space-y-1">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-semibold h-4">
                      PRIMARY STACK & RUNTIMES
                    </div>
                    <div className="h-[52px] flex items-start overflow-hidden">
                      <div className="flex flex-wrap gap-1.5">
                        {activeNode.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-neutral-100 border border-neutral-200/80 text-neutral-800 font-medium whitespace-nowrap"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Telemetry Metrics Row Slot */}
                  <div className="grid grid-cols-3 gap-2 h-[52px]">
                    {activeNode.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="p-1.5 rounded-lg bg-neutral-50 border border-neutral-200/60 text-center flex flex-col justify-center"
                      >
                        <div className="text-[9px] font-mono uppercase tracking-wider text-neutral-400 truncate">
                          {m.label}
                        </div>
                        <div className="text-xs font-mono font-bold text-neutral-900 mt-0.5">
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Interconnecting Topology Links Slot */}
                  <div className="h-[44px]">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-semibold mb-1">
                      TOPOLOGY NETWORK CONNECTIONS:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activeNode.relatedNodeIds.map((relId) => {
                        const target = TOPOLOGY_NODES.find((n) => n.id === relId);
                        if (!target) return null;
                        return (
                          <button
                            key={relId}
                            type="button"
                            onClick={() => handleSelectNode(relId)}
                            className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-700 hover:text-neutral-950 transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <span className="text-blue-600">→</span>
                            <span>{target.shortLabel}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Direct Link Action Button */}
            <div className="pt-3 border-t border-neutral-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 h-[52px] flex-shrink-0">
              <div className="text-[11px] font-mono text-neutral-400 truncate">
                EVIDENCE: <span className="font-semibold text-neutral-700">{activeNode.caseStudyLabel}</span>
              </div>
              <button
                type="button"
                onClick={() => handleCaseStudyClick(activeNode.caseStudyId)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-neutral-950 hover:bg-blue-600 text-white text-xs font-mono font-bold tracking-tight transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md group flex-shrink-0"
              >
                <span>Inspect Case Study</span>
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Quick Axis Selector Bar for Keyboard & Touch Accessibility */}
        <div className="px-6 py-3 bg-neutral-50/80 border-t border-neutral-200/80 flex flex-wrap items-center justify-between gap-2">
          <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 hidden sm:block">
            DIRECT AXIS SELECTOR:
          </div>
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto justify-start sm:justify-end">
            {TOPOLOGY_NODES.map((node) => {
              const isCurrent = node.id === activeNode.id;
              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => handleSelectNode(node.id)}
                  className={`text-[10px] font-mono px-2.5 py-1 rounded-md transition-all cursor-pointer select-none ${
                    isCurrent
                      ? 'bg-neutral-900 text-white font-bold shadow-xs'
                      : 'bg-white hover:bg-neutral-100 text-neutral-600 border border-neutral-200/80'
                  }`}
                >
                  {node.shortLabel}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';

export default function ArchitecturalSculpture() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      setMousePos({
        x: Math.max(-1, Math.min(1, x)),
        y: Math.max(-1, Math.min(1, y)),
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const rotateX = mousePos.y * -14;
  const rotateY = mousePos.x * 18;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor="action"
      className="relative w-full max-w-[340px] sm:max-w-[420px] md:max-w-[480px] aspect-[4/5] mx-auto flex items-center justify-center select-none cursor-grab"
      style={{ perspective: 1200 }}
    >
      {/* Ambient Floor Glow matching Brikken's signature Cobalt Blue light reflection */}
      <div 
        className="absolute bottom-4 w-3/4 h-24 bg-blue-600/25 blur-3xl rounded-full pointer-events-none transition-opacity duration-700"
        style={{ opacity: isHovered ? 0.9 : 0.6 }}
      />

      {/* 3D Geometric Sculptural Hexagonal Monolith */}
      <div
        className="relative w-full h-full flex items-center justify-center transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`,
          transformStyle: 'preserve-3d',
        }}
      >
        <svg
          viewBox="0 0 400 500"
          className="w-full h-full drop-shadow-2xl overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Concrete texture gradients */}
            <linearGradient id="facet-top" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e8e8e3" />
              <stop offset="100%" stopColor="#cfcfc7" />
            </linearGradient>

            <linearGradient id="facet-left" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#dfdfd8" />
              <stop offset="100%" stopColor="#b4b4ab" />
            </linearGradient>

            <linearGradient id="facet-right" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c8c8bf" />
              <stop offset="100%" stopColor="#96968d" />
            </linearGradient>

            <linearGradient id="facet-inner-top" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6e6e66" />
              <stop offset="100%" stopColor="#9c9c93" />
            </linearGradient>

            {/* Neon Blue Bottom Illumination like in Brikken's concrete sculpture */}
            <linearGradient id="neon-blue-glow" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.95" />
              <stop offset="45%" stopColor="#3b82f6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>

            {/* Subtle concrete speckle pattern */}
            <pattern id="concrete-noise" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="3" cy="4" r="0.6" fill="#7a7a72" opacity="0.4" />
              <circle cx="14" cy="11" r="0.8" fill="#54544d" opacity="0.3" />
              <circle cx="9" cy="16" r="0.5" fill="#888880" opacity="0.3" />
            </pattern>
          </defs>

          {/* Outer Hexagonal Geometric Loop */}
          {/* Top Outer Facet */}
          <path
            d="M 200 40 L 330 115 L 330 170 L 200 95 Z"
            fill="url(#facet-top)"
            stroke="#b8b8ae"
            strokeWidth="0.8"
          />

          {/* Right Outer Facet */}
          <path
            d="M 330 115 L 330 365 L 285 390 L 285 140 Z"
            fill="url(#facet-right)"
            stroke="#88887f"
            strokeWidth="0.8"
          />

          {/* Bottom Right Outer Facet */}
          <path
            d="M 330 365 L 200 440 L 200 385 L 285 335 Z"
            fill="url(#facet-right)"
            stroke="#787870"
            strokeWidth="0.8"
          />

          {/* Bottom Left Outer Facet */}
          <path
            d="M 200 440 L 70 365 L 115 335 L 200 385 Z"
            fill="url(#facet-left)"
            stroke="#787870"
            strokeWidth="0.8"
          />

          {/* Left Outer Facet */}
          <path
            d="M 70 365 L 70 115 L 115 140 L 115 335 Z"
            fill="url(#facet-left)"
            stroke="#8f8f86"
            strokeWidth="0.8"
          />

          {/* Top Left Outer Facet */}
          <path
            d="M 70 115 L 200 40 L 200 95 L 115 140 Z"
            fill="url(#facet-top)"
            stroke="#b0b0a5"
            strokeWidth="0.8"
          />

          {/* Front Planar Frame (The primary face facing the camera) */}
          <path
            d="M 200 95 L 285 140 L 285 335 L 200 385 L 115 335 L 115 140 Z"
            fill="#dcdcd6"
            stroke="#bfbfb6"
            strokeWidth="1"
          />

          {/* Concrete Noise Overlay */}
          <path
            d="M 200 95 L 285 140 L 285 335 L 200 385 L 115 335 L 115 140 Z"
            fill="url(#concrete-noise)"
            opacity="0.8"
          />

          {/* Inner Hollow Aperture (The opening through the center) */}
          {/* Inner Top/Ceiling */}
          <path
            d="M 200 155 L 250 185 L 200 215 L 150 185 Z"
            fill="url(#facet-inner-top)"
          />

          {/* Inner Left Wall */}
          <path
            d="M 150 185 L 200 215 L 200 325 L 150 295 Z"
            fill="#808076"
            stroke="#6b6b62"
            strokeWidth="0.5"
          />

          {/* Inner Right Wall */}
          <path
            d="M 250 185 L 200 215 L 200 325 L 250 295 Z"
            fill="#66665d"
            stroke="#54544c"
            strokeWidth="0.5"
          />

          {/* Neon Blue Base Lighting Layer (Matches Brikken's glowing blue bottom) */}
          <path
            d="M 70 320 L 200 395 L 330 320 L 330 365 L 200 440 L 70 365 Z"
            fill="url(#neon-blue-glow)"
            opacity="0.85"
            style={{ mixBlendMode: 'multiply' }}
          />
          <path
            d="M 115 300 L 200 350 L 285 300 L 285 335 L 200 385 L 115 335 Z"
            fill="url(#neon-blue-glow)"
            opacity="0.9"
          />

          {/* Crisp chamfer and edge highlight lines */}
          <line x1="200" y1="40" x2="200" y2="95" stroke="#ffffff" strokeWidth="1.2" opacity="0.6" />
          <line x1="70" y1="115" x2="115" y2="140" stroke="#ffffff" strokeWidth="1" opacity="0.5" />
          <line x1="330" y1="115" x2="285" y2="140" stroke="#ffffff" strokeWidth="1" opacity="0.4" />
        </svg>

        {/* Minimal Floating Coordinate Data Pill */}
        <div className="absolute top-4 right-2 text-[9px] font-mono tracking-widest text-neutral-400 bg-white/70 backdrop-blur-sm px-2 py-0.5 rounded border border-neutral-200/80">
          Z:{(rotateY).toFixed(1)}°
        </div>
      </div>
    </div>
  );
}

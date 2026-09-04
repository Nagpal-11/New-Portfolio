import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isCoarsePointer, setIsCoarsePointer] = useState(() => {
    if (typeof window === 'undefined') return true;
    return (
      window.matchMedia('(pointer: coarse)').matches ||
      !window.matchMedia('(pointer: fine)').matches
    );
  });

  const bubbleRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const particleContainerRef = useRef<HTMLDivElement | null>(null);

  // High-frequency physics and position references
  const mousePosRef = useRef({ x: -100, y: -100 });
  const bubblePosRef = useRef({ x: -100, y: -100 });
  const lastMousePosRef = useRef({ x: -100, y: -100 });
  const lastMoveTimeRef = useRef(performance.now());
  const lastSpawnTimeRef = useRef(0);

  const angleRef = useRef(0);
  const stretchRef = useRef(0);
  const stretchVelocityRef = useRef(0);
  const hoverProgressRef = useRef(0);
  const targetHoverRef = useRef(0);
  const isClickingRef = useRef(false);
  const isVisibleRef = useRef(false);
  const isHoveredRef = useRef(false);

  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Dynamically watch for pointer: coarse media query changes
    const coarseQuery = window.matchMedia('(pointer: coarse)');
    const fineQuery = window.matchMedia('(pointer: fine)');

    const checkPointer = () => {
      const isTouch = coarseQuery.matches || !fineQuery.matches;
      setIsCoarsePointer(isTouch);
      if (isTouch) {
        document.documentElement.classList.remove('custom-cursor-active');
      }
    };

    coarseQuery.addEventListener('change', checkPointer);
    fineQuery.addEventListener('change', checkPointer);

    if (coarseQuery.matches || !fineQuery.matches) {
      document.documentElement.classList.remove('custom-cursor-active');
      return () => {
        coarseQuery.removeEventListener('change', checkPointer);
        fineQuery.removeEventListener('change', checkPointer);
      };
    }

    document.documentElement.classList.add('custom-cursor-active');

    // Auxiliary Particle (Mini Bubble) Generator
    const spawnMiniBubble = (x: number, y: number, isHoverState: boolean) => {
      if (!particleContainerRef.current) return;

      const particle = document.createElement('div');
      // Varied mini radii between 4px and 12px
      const size = Math.floor(Math.random() * 9) + 4;

      particle.className = 'fixed rounded-full pointer-events-none will-change-transform';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.transform = 'translate(-50%, -50%)';

      if (isHoverState) {
        particle.style.backgroundColor = 'rgba(255, 255, 255, 0.75)';
        particle.style.mixBlendMode = 'difference';
      } else {
        particle.style.backgroundColor = 'rgba(37, 99, 235, 0.28)';
        particle.style.border = '1px solid rgba(37, 99, 235, 0.5)';
        particle.style.backdropFilter = 'blur(1px)';
        particle.style.boxShadow = '0 0 6px rgba(37, 99, 235, 0.25)';
      }

      particleContainerRef.current.appendChild(particle);

      // Float outwards in random directions with minor scatter on x and y
      const angle = Math.random() * Math.PI * 2;
      const scatterDist = Math.random() * 26 + 10;
      const scatterX = Math.cos(angle) * scatterDist;
      const scatterY = Math.sin(angle) * scatterDist;

      gsap.to(particle, {
        x: scatterX,
        y: scatterY,
        opacity: 0,
        scale: 0,
        duration: 0.4 + Math.random() * 0.2, // 0.4s to 0.6s
        ease: 'power2.out',
        onComplete: () => {
          particle.remove();
        },
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const dt = (now - lastMoveTimeRef.current) / 1000;
      lastMoveTimeRef.current = now;

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      mousePosRef.current.x = mouseX;
      mousePosRef.current.y = mouseY;

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
        bubblePosRef.current.x = mouseX;
        bubblePosRef.current.y = mouseY;
        lastMousePosRef.current.x = mouseX;
        lastMousePosRef.current.y = mouseY;
      }

      // Calculate instantaneous pointer velocity
      const dx = mouseX - lastMousePosRef.current.x;
      const dy = mouseY - lastMousePosRef.current.y;
      const dist = Math.hypot(dx, dy);
      const velocity = dt > 0 ? dist / dt : 0;

      lastMousePosRef.current.x = mouseX;
      lastMousePosRef.current.y = mouseY;

      // Spawn mini bubbles when velocity spikes beyond threshold (e.g. > 550 px/s)
      if (velocity > 550 && now - lastSpawnTimeRef.current > 32) {
        lastSpawnTimeRef.current = now;
        spawnMiniBubble(bubblePosRef.current.x, bubblePosRef.current.y, isHoveredRef.current);
      }

      // Detect hover targets without displaying any text/labels
      const target = e.target as HTMLElement | null;
      if (!target) {
        targetHoverRef.current = 0;
        isHoveredRef.current = false;
        setIsHovered(false);
        return;
      }

      const isInteractive = Boolean(
        target.closest(
          'button, a, [role="button"], input[type="submit"], input[type="button"], select, .cursor-pointer, [tabindex="0"], [data-cursor="project"], [data-cursor="action"], .bento-row'
        )
      );

      if (isInteractive) {
        targetHoverRef.current = 1;
        isHoveredRef.current = true;
        setIsHovered(true);
      } else {
        targetHoverRef.current = 0;
        isHoveredRef.current = false;
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => {
      isClickingRef.current = true;
    };

    const handleMouseUp = () => {
      isClickingRef.current = false;
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      isVisibleRef.current = true;
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    // High-performance RAF loop for fluid lag tracking, angle calculation, and elastic squash/stretch
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      const mouseX = mousePosRef.current.x;
      const mouseY = mousePosRef.current.y;

      const dx = mouseX - bubblePosRef.current.x;
      const dy = mouseY - bubblePosRef.current.y;
      const distance = Math.hypot(dx, dy);

      // Fluid dampening lag-tracking (~0.15s duration equivalent)
      const lagFactor = 1 - Math.exp(-14 * dt);
      bubblePosRef.current.x += dx * lagFactor;
      bubblePosRef.current.y += dy * lagFactor;

      // Angular orientation along the direction of travel
      if (distance > 1.2) {
        const targetAngle = Math.atan2(dy, dx) * (180 / Math.PI);
        let diff = targetAngle - angleRef.current;
        while (diff < -180) diff += 360;
        while (diff > 180) diff -= 360;
        angleRef.current += diff * 0.22;
      }

      // Dynamic Squash & Stretch Physics:
      // Quick movements elongate along the angle of movement and compress horizontally
      const maxStretch = 0.65;
      const targetStretch = Math.min(distance / 65, maxStretch);

      // Elastic spring physics so the bubble bounces back into a perfect circle when stopping
      const springTension = 0.24;
      const springDamping = 0.74;
      stretchVelocityRef.current += (targetStretch - stretchRef.current) * springTension;
      stretchVelocityRef.current *= springDamping;
      stretchRef.current += stretchVelocityRef.current;

      const safeStretch = Math.max(-0.25, Math.min(stretchRef.current, 0.75));

      // Smooth hover scale transition
      const hoverSpeed = 1 - Math.exp(-12 * dt);
      hoverProgressRef.current += (targetHoverRef.current - hoverProgressRef.current) * hoverSpeed;

      const hoverScale = 1 + hoverProgressRef.current * 0.85; // Expands radius smoothly
      const clickScale = isClickingRef.current ? 0.88 : 1.0;

      const scaleX = hoverScale * clickScale * (1 + safeStretch);
      const scaleY = hoverScale * clickScale * (1 / (1 + safeStretch * 0.62));

      // Direct transform update on bubble container
      if (bubbleRef.current) {
        bubbleRef.current.style.transform = `translate3d(${bubblePosRef.current.x}px, ${bubblePosRef.current.y}px, 0) translate(-50%, -50%) rotate(${angleRef.current}deg) scale(${scaleX.toFixed(3)}, ${scaleY.toFixed(3)})`;
      }

      // Pinpoint precision central dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(${isClickingRef.current ? 0.75 : 1})`;
      }

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      if (particleContainerRef.current) {
        particleContainerRef.current.innerHTML = '';
      }
    };
  }, []);

  if (isCoarsePointer || !isVisible) {
    return null;
  }

  return (
    <>
      {/* Particle Container for Auxiliary Trailing Mini-Bubbles */}
      <div
        ref={particleContainerRef}
        className="custom-cursor-node fixed inset-0 pointer-events-none z-[9997] overflow-hidden"
      />

      {/* Precision Core Aiming Dot (visible when unhovered) */}
      <div
        ref={dotRef}
        className="custom-cursor-node fixed top-0 left-0 pointer-events-none z-[10000] rounded-full will-change-transform transition-opacity duration-200"
        style={{
          width: '5px',
          height: '5px',
          backgroundColor: '#2563eb',
          opacity: isHovered ? 0 : 1,
        }}
      />

      {/* Textless Fluid Elastic Bubbly Moving Cursor */}
      <div
        ref={bubbleRef}
        className={`custom-cursor-node fixed top-0 left-0 pointer-events-none rounded-full will-change-transform transition-colors duration-250 ${
          isHovered
            ? 'z-[9999] bg-white shadow-lg'
            : 'z-[9998] bg-blue-600/15 border border-blue-600/40 backdrop-blur-[2px] shadow-[0_0_12px_rgba(37,99,235,0.18)]'
        }`}
        style={{
          width: '36px',
          height: '36px',
          mixBlendMode: isHovered ? 'difference' : 'normal',
        }}
      />
    </>
  );
}

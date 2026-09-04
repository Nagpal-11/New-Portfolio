import React, { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight || 0;
      const clientHeight = document.documentElement.clientHeight || window.innerHeight || 0;
      const maxScroll = scrollHeight - clientHeight;

      if (maxScroll <= 0) {
        setScrollProgress(0);
        return;
      }

      const progress = (scrollTop / maxScroll) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', calculateProgress, { passive: true });
    window.addEventListener('resize', calculateProgress, { passive: true });
    calculateProgress();

    return () => {
      window.removeEventListener('scroll', calculateProgress);
      window.removeEventListener('resize', calculateProgress);
    };
  }, []);

  return (
    <div
      id="scroll-progress-container"
      role="progressbar"
      aria-label="Page reading progress"
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] pointer-events-none bg-neutral-200/20"
    >
      <div
        id="scroll-progress-bar"
        className="h-full bg-blue-600 transition-[width] duration-75 ease-out shadow-[0_0_8px_rgba(37,99,235,0.35)]"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}

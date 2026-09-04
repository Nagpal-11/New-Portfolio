import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import CorePillars from './components/CorePillars';
import FeaturedWork from './components/FeaturedWork';
import MetricsGrid from './components/MetricsGrid';
import GitHubActivity from './components/GitHubActivity';
import FaqSection from './components/FaqSection';
import ContactFooter from './components/ContactFooter';
import ProjectModal from './components/ProjectModal';
import ResumeModal from './components/ResumeModal';
import ContactModal from './components/ContactModal';
import { PROJECTS } from './data/portfolioData';
import { Project } from './types';

gsap.registerPlugin(ScrollTrigger);

// Global Mobile and Trackpad ScrollTrigger Render Optimization:
// Prevents Safari/Chrome address bar resizing from triggering jumpy layout recalculations
ScrollTrigger.config({
  ignoreMobileResize: true,
  autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
});

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis Smooth Scroll and Synchronize with GSAP ScrollTrigger
  useEffect(() => {
    // 1. Initialize Lenis with smooth momentum settings
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth exponential ease
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;
    (window as any).__lenis = lenis;

    // 2. Connect Lenis's scroll event directly to ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // 3. Synchronize GSAP ticker with Lenis requestAnimationFrame
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);

    // 4. Essential: prevents GSAP from jumping frames after heavy calculations
    gsap.ticker.lagSmoothing(0);

    // Dynamic Viewport Height Normalization (--vh and --dvh)
    const updateViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      document.documentElement.style.setProperty('--dvh', `${window.innerHeight}px`);
    };

    updateViewportHeight();
    window.addEventListener('resize', updateViewportHeight);
    window.addEventListener('orientationchange', updateViewportHeight);

    // 5. Fix Resize & Refresh Conflicts:
    // Call ScrollTrigger.refresh() only after all assets, fonts, and card dimensions are fully loaded
    if (document.fonts) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    const handleWindowLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('load', handleWindowLoad);

    const initialSettleTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(initialSettleTimer);
      window.removeEventListener('load', handleWindowLoad);
      window.removeEventListener('resize', updateViewportHeight);
      window.removeEventListener('orientationchange', updateViewportHeight);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
      delete (window as any).__lenis;
    };
  }, []);

  // Pause / Resume Lenis when modal overlays are open to lock backdrop scrolling safely
  useEffect(() => {
    if (selectedProject || resumeOpen || contactOpen) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, [selectedProject, resumeOpen, contactOpen]);

  const handleOpenProjectById = (projectId: string) => {
    const proj = PROJECTS.find((p) => p.id === projectId);
    if (proj) {
      setSelectedProject(proj);
    }
  };

  const handleExploreWork = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo('#work', { duration: 1.2 });
    } else {
      const workElem = document.getElementById('work');
      if (workElem) {
        workElem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen min-h-[100dvh] bg-[#f3f3f0] text-neutral-900 selection:bg-blue-600 selection:text-white relative">
      {/* Custom Stylized Magnetic Cursor */}
      <CustomCursor />

      {/* Viewport Reading Progress Bar */}
      <ScrollProgress />

      {/* Top Floating Pill Navigation */}
      <Navigation
        onOpenContact={() => setContactOpen(true)}
        onOpenResume={() => setResumeOpen(true)}
      />

      {/* Main Content Layout */}
      <main>
        {/* Hero Section */}
        <Hero
          onOpenContact={() => setContactOpen(true)}
          onExploreWork={handleExploreWork}
          onOpenProject={handleOpenProjectById}
        />

        {/* Core Pillars: INTELLIGENCE. ARCHITECTURE. PRODUCT. */}
        <CorePillars />

        {/* Selected Work Showcase */}
        <FeaturedWork onOpenProjectModal={(p) => setSelectedProject(p)} />

        {/* Validation & Metrics Grid (New studio. Not new to this.) */}
        <MetricsGrid />

        {/* GitHub Activity & Telemetry Heatmap */}
        <GitHubActivity />

        {/* FAQ Section */}
        <FaqSection />
      </main>

      {/* Contact & Footer Section */}
      <ContactFooter onOpenResume={() => setResumeOpen(true)} />

      {/* Interactive Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />

      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
        onOpenResume={() => setResumeOpen(true)}
      />
    </div>
  );
}

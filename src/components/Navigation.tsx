import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavigationProps {
  onOpenContact: () => void;
  onOpenResume: () => void;
}

export default function Navigation({ onOpenContact, onOpenResume }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'ABOUT', href: '#about' },
    { label: 'PILLARS', href: '#pillars' },
    { label: 'WORK', href: '#work' },
    { label: 'SKILLS', href: '#skills' },
    { label: 'ACTIVITY', href: '#activity' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(href, { duration: 1.2 });
      } else {
        const target = document.querySelector(href);
        target?.scrollIntoView({ behavior: 'smooth' });
      }
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-3.5 sm:pt-4 pb-2.5 sm:pb-3 pointer-events-none transition-all duration-300">
        <nav
          className={`pointer-events-auto flex items-center justify-between gap-6 sm:gap-8 px-5 sm:px-7 py-2.5 rounded-full border transition-all duration-300 ${
            isScrolled
              ? 'bg-[#ffffff]/90 backdrop-blur-md border-neutral-300/80 shadow-[0_8px_30px_rgba(0,0,0,0.06)]'
              : 'bg-[#ffffff]/80 backdrop-blur-sm border-neutral-200/90 shadow-sm'
          }`}
        >
          {/* Left Links - Desktop */}
          <div className="hidden md:flex items-center gap-6 text-[11px] font-semibold tracking-[0.16em] text-neutral-600">
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, '#about')}
              className="hover:text-black transition-colors"
            >
              ABOUT
            </a>
            <a
              href="#pillars"
              onClick={(e) => handleNavClick(e, '#pillars')}
              className="hover:text-black transition-colors"
            >
              PILLARS
            </a>
            <a
              href="#work"
              onClick={(e) => handleNavClick(e, '#work')}
              className="hover:text-black transition-colors"
            >
              WORK
            </a>
          </div>

          {/* Center Brand / Name */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if ((window as any).__lenis) {
                (window as any).__lenis.scrollTo(0, { duration: 1.2 });
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 text-xs sm:text-[13px] font-extrabold tracking-[0.18em] text-black uppercase hover:opacity-80 transition-opacity"
          >
            <span>{PERSONAL_INFO.brandName}</span>
            <span className="w-1.5 h-1.5 bg-blue-600 rounded-none inline-block"></span>
          </a>

          {/* Right Links - Desktop */}
          <div className="hidden md:flex items-center gap-6 text-[11px] font-semibold tracking-[0.16em] text-neutral-600">
            <a
              href="#skills"
              onClick={(e) => handleNavClick(e, '#skills')}
              className="hover:text-black transition-colors"
            >
              SKILLS
            </a>
            <a
              href="#activity"
              onClick={(e) => handleNavClick(e, '#activity')}
              className="hover:text-black transition-colors"
            >
              ACTIVITY
            </a>
            <button
              onClick={onOpenContact}
              className="hover:text-black transition-colors cursor-pointer"
            >
              CONTACT
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenContact}
              className="text-[10px] font-bold tracking-wider text-blue-600 border border-blue-200 bg-blue-50 px-2.5 py-1 rounded-full uppercase"
            >
              Contact
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 text-neutral-800 hover:text-black focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden flex flex-col justify-end">
          <div className="bg-[#f3f3f0] border-t border-neutral-300 rounded-t-3xl p-6 shadow-2xl space-y-5 animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <span className="text-xs font-bold tracking-widest uppercase text-neutral-500">
                Navigation
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 text-neutral-500 hover:text-black"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-lg font-bold tracking-tight text-neutral-900 hover:text-blue-600 transition-colors py-1 flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight size={16} className="text-neutral-400" />
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-neutral-200 grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-neutral-300 text-xs font-bold tracking-wider uppercase text-neutral-800 bg-white"
              >
                <FileText size={14} />
                Resume
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 text-white text-xs font-bold tracking-wider uppercase"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

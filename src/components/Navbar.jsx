import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { useCursor } from '../context/CursorContext';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const menuOverlayRef = useRef(null);
  const menuLinksRef = useRef([]);
  const { setCursor, resetCursor } = useCursor();

  const isHomeHero = location.pathname === '/' && !scrolled;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // GSAP Mobile Menu Animation
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const tl = gsap.timeline();
      tl.to(menuOverlayRef.current, {
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.4,
        ease: 'power3.out',
      }).fromTo(
        menuLinksRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out' },
        '-=0.2'
      );
    } else {
      document.body.style.overflow = '';
      if (menuOverlayRef.current) {
        gsap.to(menuOverlayRef.current, {
          opacity: 0,
          pointerEvents: 'none',
          duration: 0.3,
          ease: 'power2.in',
        });
      }
    }
  }, [mobileMenuOpen]);

  const navItems = [
    { label: 'HOME', path: '/' },
    { label: 'ABOUT', path: '/about' },
    { label: 'WORK', path: '/work' },
    { label: 'REVIEWS', path: '/reviews' },
    { label: 'CONTACT', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-4 bg-[#060606]/80 backdrop-blur-md border-b border-[#F5F4F0]/10 shadow-lg'
            : 'py-7 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* LEFT: Photographer Name / Logo */}
          <Link
            to="/"
            className="group flex flex-col"
            onMouseEnter={() => setCursor('hover')}
            onMouseLeave={resetCursor}
          >
            <span className="font-serif text-xl tracking-tight font-semibold transition-colors duration-300 text-[#FFFFFF] group-hover:opacity-75">
              PRAYAG KUMAR DAS
            </span>
            <span className="text-[10px] tracking-[0.25em] uppercase transition-colors duration-300 text-[#F5F4F0]/70">
              VIDEO EDITOR
            </span>
          </Link>

          {/* CENTER: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const textColorClass = isActive
                ? 'text-[#FFFFFF]'
                : 'text-[#F5F4F0]/70 hover:text-[#FFFFFF]';

              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onMouseEnter={() => setCursor('hover')}
                  onMouseLeave={resetCursor}
                  className={`relative text-xs tracking-[0.2em] font-medium transition-colors uppercase py-1 ${textColorClass}`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#ea580c]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT: Primary Action (Desktop) */}
          <div className="hidden md:block">
            <Link
              to="/contact"
              onMouseEnter={() => setCursor('hover')}
              onMouseLeave={resetCursor}
              className="inline-flex items-center space-x-2 text-xs tracking-[0.2em] uppercase font-semibold border px-5 py-2.5 rounded-full transition-all duration-300 group text-[#FFFFFF] border-[#F5F4F0]/30 hover:bg-[#ea580c] hover:border-[#ea580c]"
            >
              <span>LET'S TALK</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 focus:outline-hidden transition-colors text-[#FFFFFF]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Full-screen Mobile Menu Overlay */}
      <div
        ref={menuOverlayRef}
        className="fixed inset-0 bg-[#111111] text-[#F5F4F0] z-40 flex flex-col justify-between px-8 py-24 opacity-0 pointer-events-none md:hidden"
      >
        <div className="flex flex-col space-y-6">
          <span className="text-xs uppercase tracking-[0.3em] text-[#6F6F6A] mb-4">
            NAVIGATION
          </span>
          {navItems.map((item, idx) => (
            <div
              key={item.label}
              ref={(el) => (menuLinksRef.current[idx] = el)}
              className="overflow-hidden"
            >
              <Link
                to={item.path}
                className="font-serif text-3xl sm:text-4xl text-[#F5F4F0] hover:text-[#D8D7D2] transition-colors block"
              >
                {item.label}
              </Link>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-[#D8D7D2]/20 flex flex-col space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-[#6F6F6A]">
            GET IN TOUCH
          </span>
          <a
            href="mailto:prayagdas2003@gmail.com"
            className="text-sm font-sans text-[#F5F4F0] hover:underline"
          >
            prayagdas2003@gmail.com
          </a>
          <span className="text-xs text-[#6F6F6A] tracking-wider uppercase">
            CUTTACK, ODISHA, INDIA — GLOBAL COMMISSIONS
          </span>
        </div>
      </div>
    </>
  );
};

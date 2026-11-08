import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { useCursor } from '../context/CursorContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isReducedMotion } from '../utils/scrollAnimations';

gsap.registerPlugin(ScrollTrigger);

export const Footer = () => {
  const { setCursor, resetCursor } = useCursor();
  const footerRef = useRef(null);
  const gridRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Footer columns staggered entrance
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 92%',
              end: 'bottom top',
              toggleActions: 'play reverse play reverse',
              invalidateOnRefresh: true,
            },
          }
        );
      }

      // 2. Bottom copyright and back-to-top reveal
      if (bottomRef.current) {
        gsap.fromTo(
          bottomRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 90%',
              end: 'bottom top',
              toggleActions: 'play reverse play reverse',
              invalidateOnRefresh: true,
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      className="bg-[#111111] text-[#F5F4F0] border-t border-[#F5F4F0]/15 py-16 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto flex flex-col space-y-12">
        {/* Main Footer Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
        >
          {/* Left: Photographer Brand */}
          <div className="md:col-span-4 flex flex-col space-y-2 transform-gpu will-change-transform">
            <Link
              to="/"
              className="font-serif text-2xl font-normal text-[#F5F4F0] tracking-tight uppercase"
            >
              PRAYAG KUMAR DAS
            </Link>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#6F6F6A]">
              CINEMATIC VIDEO EDITOR
            </span>
          </div>

          {/* Center: Social Links */}
          <div className="md:col-span-4 flex flex-wrap gap-6 text-xs uppercase tracking-[0.2em] text-[#6F6F6A] transform-gpu will-change-transform">
            <a
              href="https://www.instagram.com/__.__.prayag.__.__?igsh=MThqd3gyenZpM244NQ=="
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setCursor('hover')}
              onMouseLeave={resetCursor}
              className="hover:text-[#F5F4F0] transition-colors"
            >
              INSTAGRAM
            </a>
            <a
              href="https://www.linkedin.com/in/prayag-kumar-das-854a5b270?utm_source=share_via&utm_content=profile&utm_medium=member_android"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setCursor('hover')}
              onMouseLeave={resetCursor}
              className="hover:text-[#F5F4F0] transition-colors"
            >
              LINKEDIN
            </a>
          </div>

          {/* Right: Quick Navigation */}
          <div className="md:col-span-4 flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-[0.2em] text-[#6F6F6A] justify-start md:justify-end transform-gpu will-change-transform">
            <Link to="/" className="hover:text-[#F5F4F0] transition-colors">HOME</Link>
            <Link to="/about" className="hover:text-[#F5F4F0] transition-colors">ABOUT</Link>
            <Link to="/work" className="hover:text-[#F5F4F0] transition-colors">WORK</Link>
            <Link to="/reviews" className="hover:text-[#F5F4F0] transition-colors">REVIEWS</Link>
            <Link to="/contact" className="hover:text-[#F5F4F0] transition-colors">CONTACT</Link>
          </div>
        </div>

        {/* Bottom copyright & Back-to-top */}
        <div
          ref={bottomRef}
          className="pt-8 border-t border-[#F5F4F0]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#6F6F6A] uppercase tracking-wider transform-gpu will-change-transform"
        >
          <div>
            © 2026 PRAYAG KUMAR DAS. ALL RIGHTS RESERVED.
          </div>

          <div>
            DESIGNED & DEVELOPED WITH INTENTION.
          </div>

          <button
            onClick={scrollToTop}
            onMouseEnter={() => setCursor('hover')}
            onMouseLeave={resetCursor}
            className="flex items-center space-x-2 text-xs text-[#F5F4F0] hover:text-[#6F6F6A] transition-colors group cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

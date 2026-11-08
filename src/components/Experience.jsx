import React, { useEffect, useRef } from 'react';
import { Briefcase, Calendar } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experienceData } from '../data/experience';
import { useCursor } from '../context/CursorContext';
import {
  isReducedMotion,
  WordReveal,
  animateWordReveal,
} from '../utils/scrollAnimations';

gsap.registerPlugin(ScrollTrigger);

export const Experience = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const titleBoxRef = useRef(null);
  const lineRef = useRef(null);
  const rowsRef = useRef([]);
  const nodesRef = useRef([]);
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Typography Reveal: Heading word-by-word
      if (titleBoxRef.current) {
        animateWordReveal(titleBoxRef.current, {
          trigger: headerRef.current,
          start: 'top 88%',
          duration: 0.85,
          stagger: 0.08,
          ease: 'power3.out',
        });
      }

      // 2. Reveal vertical timeline line progressively as user scrolls
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              end: 'bottom 75%',
              scrub: 0.6,
            },
          }
        );
      }

      // 3. Staggered Content: Sequential experience cards & glowing nodes
      rowsRef.current.forEach((row, idx) => {
        if (!row) return;
        const node = nodesRef.current[idx];
        const cards = row.querySelectorAll('.experience-card');

        const activateNode = () => {
          if (node) {
            node.classList.add(
              'bg-[#ea580c]',
              'border-[#ea580c]',
              'shadow-[0_0_20px_rgba(234,88,12,0.95)]',
              'scale-110'
            );
            node.classList.remove('bg-[#060606]', 'border-white/20');
          }
        };

        const deactivateNode = () => {
          if (node) {
            node.classList.remove(
              'bg-[#ea580c]',
              'border-[#ea580c]',
              'shadow-[0_0_20px_rgba(234,88,12,0.95)]',
              'scale-110'
            );
            node.classList.add('bg-[#060606]', 'border-white/20');
          }
        };

        gsap.fromTo(
          cards,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 85%',
              end: 'bottom top',
              toggleActions: 'play reverse play reverse',
              invalidateOnRefresh: true,
              onEnter: activateNode,
              onEnterBack: activateNode,
              onLeave: deactivateNode,
              onLeaveBack: deactivateNode,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10 relative overflow-hidden"
    >
      {/* Background ambient radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ea580c]/5 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Section Header */}
      <div
        ref={headerRef}
        className="flex flex-col space-y-3 mb-16 md:mb-24 relative z-10"
      >
        <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#A1A1AA] transform-gpu will-change-transform">
          CAREER JOURNEY
        </span>
        <div ref={titleBoxRef}>
          <WordReveal
            text="EXPERIENCE"
            as="h2"
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#F5F4F0] uppercase tracking-tight transform-gpu will-change-transform"
          />
        </div>
      </div>

      {/* Timeline Wrapper Container */}
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Background Track Line (Dull grey connector) */}
        <div className="absolute top-3 bottom-3 left-4 sm:left-6 lg:left-1/2 lg:-translate-x-1/2 w-[2px] bg-white/10 z-0" />

        {/* Animated Progress Reveal Line (Glowing Orange) */}
        <div
          ref={lineRef}
          style={{ transformOrigin: 'top center' }}
          className="absolute top-3 bottom-3 left-4 sm:left-6 lg:left-1/2 lg:-translate-x-1/2 w-[2px] bg-gradient-to-b from-[#ea580c] via-[#f97316] to-[#c2410c] z-0 shadow-[0_0_12px_rgba(234,88,12,0.6)]"
        />

        {/* Timeline Experience Items */}
        <div className="space-y-12 md:space-y-16">
          {experienceData.map((item, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={item.id}
                ref={(el) => (rowsRef.current[idx] = el)}
                className="relative flex flex-col lg:flex-row items-start lg:items-center"
              >
                {/* Glowing Timeline Node */}
                <div
                  ref={(el) => (nodesRef.current[idx] = el)}
                  className="absolute left-4 sm:left-6 lg:left-1/2 -translate-x-1/2 top-6 lg:top-1/2 lg:-translate-y-1/2 w-5 h-5 rounded-full bg-[#060606] border-2 border-white/20 transition-all duration-500 z-20 flex items-center justify-center pointer-events-none"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-white transition-transform duration-300" />
                </div>

                {/* Mobile / Tablet / Desktop Structural Grid Layout */}
                <div className="w-full pl-12 sm:pl-16 lg:pl-0 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                  {/* Left Slot (Desktop): Card if even index, empty if odd */}
                  <div
                    className={`${
                      isEven ? 'lg:block' : 'lg:hidden'
                    } order-1`}
                  >
                    <div
                      onMouseEnter={() => setCursor('hover')}
                      onMouseLeave={resetCursor}
                      className="experience-card group relative bg-[#121214]/75 backdrop-blur-md border border-white/10 p-6 sm:p-8 rounded-xs hover:border-[#ea580c]/50 hover:shadow-[0_10px_35px_rgba(234,88,12,0.12)] transition-all duration-500 ease-out hover:-translate-y-1 transform-gpu will-change-transform"
                    >
                      {/* Sub-header with Role, Company, and Duration Tag */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/10 mb-5">
                        <div className="flex flex-col space-y-1">
                          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#F5F4F0] group-hover:text-[#ea580c] transition-colors duration-300">
                            {item.role}
                          </h3>
                          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#A1A1AA]">
                            <Briefcase className="w-3.5 h-3.5 text-[#ea580c]" />
                            <span>{item.company}</span>
                          </div>
                        </div>

                        {/* Duration Pill Badge */}
                        <div className="flex items-center space-x-1.5 text-xs font-mono font-semibold tracking-wider text-[#ea580c] bg-[#ea580c]/10 px-3.5 py-1.5 rounded-full border border-[#ea580c]/30 w-fit shrink-0">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{item.period}</span>
                        </div>
                      </div>

                      {/* Bullet points list */}
                      <ul className="space-y-3">
                        {item.bullets.map((bullet, bIdx) => (
                          <li
                            key={bIdx}
                            className="flex items-start space-x-3 text-xs sm:text-sm text-[#A1A1AA] font-light leading-relaxed group-hover:text-[#F5F4F0]/90 transition-colors"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c] shrink-0 mt-2 shadow-[0_0_6px_rgba(234,88,12,0.8)]" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right Slot (Desktop): Empty if even index, Card if odd */}
                  <div
                    className={`${
                      !isEven ? 'lg:block lg:col-start-2' : 'lg:hidden'
                    } order-2`}
                  >
                    <div
                      onMouseEnter={() => setCursor('hover')}
                      onMouseLeave={resetCursor}
                      className="experience-card group relative bg-[#121214]/75 backdrop-blur-md border border-white/10 p-6 sm:p-8 rounded-xs hover:border-[#ea580c]/50 hover:shadow-[0_10px_35px_rgba(234,88,12,0.12)] transition-all duration-500 ease-out hover:-translate-y-1 transform-gpu will-change-transform"
                    >
                      {/* Sub-header with Role, Company, and Duration Tag */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/10 mb-5">
                        <div className="flex flex-col space-y-1">
                          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#F5F4F0] group-hover:text-[#ea580c] transition-colors duration-300">
                            {item.role}
                          </h3>
                          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#A1A1AA]">
                            <Briefcase className="w-3.5 h-3.5 text-[#ea580c]" />
                            <span>{item.company}</span>
                          </div>
                        </div>

                        {/* Duration Pill Badge */}
                        <div className="flex items-center space-x-1.5 text-xs font-mono font-semibold tracking-wider text-[#ea580c] bg-[#ea580c]/10 px-3.5 py-1.5 rounded-full border border-[#ea580c]/30 w-fit shrink-0">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{item.period}</span>
                        </div>
                      </div>

                      {/* Bullet points list */}
                      <ul className="space-y-3">
                        {item.bullets.map((bullet, bIdx) => (
                          <li
                            key={bIdx}
                            className="flex items-start space-x-3 text-xs sm:text-sm text-[#A1A1AA] font-light leading-relaxed group-hover:text-[#F5F4F0]/90 transition-colors"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c] shrink-0 mt-2 shadow-[0_0_6px_rgba(234,88,12,0.8)]" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

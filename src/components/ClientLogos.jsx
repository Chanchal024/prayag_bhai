import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { clientLogos } from '../data/clients';
import { isReducedMotion } from '../utils/scrollAnimations';

gsap.registerPlugin(ScrollTrigger);

// Pre-computed duplicated array for seamless infinite marquee
const marqueeItems = [...clientLogos, ...clientLogos, ...clientLogos];

export const ClientLogos = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Header label fade and slide up
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 88%',
            end: 'bottom top',
            toggleActions: 'play reverse play reverse',
            invalidateOnRefresh: true,
          },
        }
      );

      // 2. Marquee container smooth fade & scale entrance
      gsap.fromTo(
        trackRef.current,
        { opacity: 0, scale: 0.97 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            end: 'bottom top',
            toggleActions: 'play reverse play reverse',
            invalidateOnRefresh: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 border-t border-b border-white/10 bg-[#080808]/70 backdrop-blur-md overflow-hidden"
    >
      <div
        ref={titleRef}
        className="max-w-7xl mx-auto px-6 md:px-12 mb-8 text-center md:text-left transform-gpu will-change-transform"
      >
        <span className="text-[11px] uppercase tracking-[0.3em] font-semibold text-[#A1A1AA]">
          BRANDS I'VE WORKED WITH
        </span>
      </div>

      <div
        ref={trackRef}
        className="relative w-full overflow-hidden flex items-center transform-gpu will-change-transform"
      >
        {/* Gradients to fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#060606] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#060606] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex items-center space-x-16 md:space-x-24 py-2">
          {marqueeItems.map((client, idx) => (
            <div
              key={`${client.name}-${idx}`}
              className="flex flex-col items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-300 cursor-pointer select-none group"
            >
              <span className="font-serif text-2xl md:text-3xl font-semibold tracking-wider text-[#F5F4F0] uppercase group-hover:scale-105 group-hover:text-[#ea580c] transition-all">
                {client.name}
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#A1A1AA] mt-1">
                {client.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { clientLogos } from '../data/clients';
import { isReducedMotion } from '../utils/scrollAnimations';

gsap.registerPlugin(ScrollTrigger);

// 2 identical sets for a mathematically seamless -50% marquee loop
const marqueeItems = [...clientLogos, ...clientLogos];

const LogoCard = React.memo(({ client }) => {
  const [imgError, setImgError] = useState(false);

  if (imgError || !client.logo) {
    return (
      <div className="flex flex-col items-center justify-center">
        <span className="font-serif text-lg md:text-xl font-semibold tracking-wider text-[#F5F4F0] uppercase group-hover:text-[#ea580c] transition-all">
          {client.name}
        </span>
        <span className="text-[9px] uppercase tracking-[0.25em] text-[#A1A1AA] mt-0.5">
          {client.role}
        </span>
      </div>
    );
  }

  return (
    <img
      src={client.logo}
      alt={client.name}
      loading="lazy"
      onError={() => setImgError(true)}
      className="max-h-11 sm:max-h-12 md:max-h-14 lg:max-h-16 max-w-[150px] sm:max-w-[180px] md:max-w-[220px] w-auto h-auto object-contain transition-all duration-300 drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] group-hover:scale-105"
    />
  );
});

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
      className="py-16 md:py-20 border-t border-b border-white/10 bg-[#080808]/70 backdrop-blur-md overflow-hidden"
    >
      <div
        ref={titleRef}
        className="max-w-7xl mx-auto px-6 md:px-12 mb-8 md:mb-10 text-center md:text-left transform-gpu will-change-transform"
      >
        <span className="text-[11px] uppercase tracking-[0.3em] font-semibold text-[#A1A1AA]">
          BRANDS I'VE WORKED WITH
        </span>
      </div>

      <div
        ref={trackRef}
        className="relative w-full overflow-hidden flex items-center transform-gpu will-change-transform"
      >
        {/* Soft edge fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-[#060606] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-[#060606] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex items-center space-x-12 sm:space-x-16 md:space-x-20 py-4">
          {marqueeItems.map((client, idx) => (
            <div
              key={`${client.name}-${idx}`}
              className="flex items-center justify-center shrink-0 h-16 md:h-20 px-3 md:px-5 opacity-80 hover:opacity-100 transition-all duration-300 cursor-pointer select-none group"
              title={`${client.name} • ${client.role}`}
            >
              <LogoCard client={client} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

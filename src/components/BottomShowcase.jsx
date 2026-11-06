import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles } from 'lucide-react';
import { useCursor } from '../context/CursorContext';

gsap.registerPlugin(ScrollTrigger);

export const BottomShowcase = () => {
  const containerRef = useRef(null);
  const mediaRef = useRef(null);
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax scale animation on scroll
      gsap.fromTo(
        mediaRef.current,
        { scale: 1.12 },
        {
          scale: 1.0,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, containerRef);

    // Only load & play video when in viewport
    let observer;
    if (containerRef.current && mediaRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!mediaRef.current) return;
            if (entry.isIntersecting) {
              mediaRef.current.play().catch(() => {});
            } else {
              mediaRef.current.pause();
            }
          });
        },
        { threshold: 0.15, rootMargin: '100px' }
      );
      observer.observe(containerRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-16 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Main Video Showcase Container */}
      <div
        onMouseEnter={() => setCursor('view', 'VIEW')}
        onMouseLeave={resetCursor}
        className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-sm overflow-hidden bg-[#111111] shadow-2xl group cursor-pointer border border-[#D8D7D2]"
      >
        <video
          ref={mediaRef}
          muted
          loop
          playsInline
          preload="none"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out brightness-[0.95]"
        >
          <source src="/assets/v2.mp4" type="video/mp4" />
        </video>

        {/* Gradient Overlays for Depth & Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/70 via-[#111111]/20 to-transparent pointer-events-none group-hover:opacity-90 transition-opacity duration-500" />

        {/* Premium Glass Badge */}
        <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 flex items-center gap-2.5 bg-[#060606]/85 backdrop-blur-md px-5 py-3 rounded-full border border-white/20 shadow-xl text-[11px] uppercase tracking-[0.25em] font-semibold text-[#F5F4F0]">
          <Sparkles className="w-4 h-4 text-[#F5F4F0]" />
          <span>FEATURED VISUAL ARTWORK SHOWCASE</span>
        </div>
      </div>
    </section>
  );
};




import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { services } from '../data/services';
import { useCursor } from '../context/CursorContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  isReducedMotion,
  WordReveal,
  animateWordReveal,
} from '../utils/scrollAnimations';

gsap.registerPlugin(ScrollTrigger);

export const Expertise = () => {
  const [activeImage, setActiveImage] = useState(services[0].image);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const sectionRef = useRef(null);
  const stickyLeftRef = useRef(null);
  const titleBoxRef = useRef(null);
  const descRef = useRef(null);
  const previewImgRef = useRef(null);
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Typography Reveal: Heading word-by-word
      if (titleBoxRef.current) {
        animateWordReveal(titleBoxRef.current, {
          trigger: sectionRef.current,
          start: 'top 85%',
          duration: 0.85,
          stagger: 0.08,
          ease: 'power3.out',
        });
      }

      // 2. Staggered Content: Left column description & mobile preview
      if (descRef.current) {
        gsap.fromTo(
          descRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            delay: 0.15,
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
      }

      // 3. Staggered Content: Right service items sequential cascade
      gsap.fromTo(
        '.service-row',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom top',
            toggleActions: 'play reverse play reverse',
            invalidateOnRefresh: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e) => {
    if (previewImgRef.current && hoveredIdx !== null) {
      gsap.to(previewImgRef.current, {
        x: e.clientX - 140,
        y: e.clientY - 100,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Side Sticky Column (Desktop) */}
        <div className="lg:col-span-4">
          <div ref={stickyLeftRef} className="lg:sticky lg:top-36 space-y-6">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#A1A1AA] transform-gpu will-change-transform block">
              SERVICES & CAPABILITIES
            </span>
            <div ref={titleBoxRef}>
              <WordReveal
                text="MY EXPERTISE"
                as="h2"
                className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#F5F4F0] uppercase leading-tight tracking-tight transform-gpu will-change-transform"
              />
            </div>
            <p
              ref={descRef}
              className="text-sm md:text-base text-[#A1A1AA] font-light leading-relaxed max-w-xs transform-gpu will-change-transform"
            >
              Providing end-to-end creative direction, technical lighting setups, and archival fine art post-processing across eight specialized domains.
            </p>

            {/* Static image preview box on mobile/tablet */}
            <div className="lg:hidden w-full aspect-[16/9] rounded-xs overflow-hidden bg-[#141414] border border-white/10 mt-6 transform-gpu will-change-transform">
              <img
                src={activeImage}
                alt="Expertise preview"
                className="w-full h-full object-cover transition-all duration-500"
              />
            </div>
          </div>
        </div>

        {/* Right Side Vertical Editorial Services List */}
        <div className="lg:col-span-8 flex flex-col divide-y divide-white/10">
          {services.map((item, idx) => (
            <div
              key={item.num}
              onMouseEnter={() => {
                setHoveredIdx(idx);
                setActiveImage(item.image);
                setCursor('hover');
              }}
              onMouseLeave={() => {
                setHoveredIdx(null);
                resetCursor();
              }}
              className="service-row group py-8 md:py-10 flex flex-col md:flex-row md:items-center justify-between transition-colors duration-300 cursor-pointer transform-gpu will-change-transform"
            >
              <div className="flex items-start space-x-6 md:space-x-8">
                <span className="text-xs font-mono tracking-widest text-[#ea580c] pt-1 font-semibold">
                  {item.num}
                </span>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-4">
                    <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#F5F4F0] uppercase tracking-tight group-hover:translate-x-3 group-hover:text-[#ea580c] transition-all duration-300">
                      {item.title}
                    </h3>
                    <ArrowUpRight className="w-5 h-5 text-[#ea580c] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                  </div>
                  <p className="text-xs sm:text-sm text-[#A1A1AA] font-light leading-relaxed max-w-lg">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 md:mt-0 text-left md:text-right">
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#A1A1AA] px-3 py-1 rounded-full border border-white/15 group-hover:border-[#ea580c]/50 group-hover:text-[#F5F4F0] transition-colors">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Image Preview on Hover (Desktop Only) */}
      <div
        ref={previewImgRef}
        className={`fixed top-0 left-0 w-72 h-44 pointer-events-none z-30 overflow-hidden rounded-xs border border-[#D8D7D2] shadow-2xl transition-opacity duration-300 hidden lg:block ${
          hoveredIdx !== null ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <img
          src={activeImage}
          alt="Service floating preview"
          className="w-full h-full object-cover object-center"
        />
      </div>
    </section>
  );
};

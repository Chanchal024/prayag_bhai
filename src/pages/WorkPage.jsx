import React, { useState, useMemo, useEffect, useRef } from 'react';
import { projects } from '../data/projects';
import { ProjectCard } from '../components/ProjectCard';
import { ContactCTA } from '../components/ContactCTA';
import { useCursor } from '../context/CursorContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  isReducedMotion,
  WordReveal,
  animateWordReveal,
} from '../utils/scrollAnimations';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { label: 'ALL', value: 'ALL' },
  { label: '01 — DIGITAL BILLBOARD', value: 'DIGITAL BILLBOARD' },
  { label: '02 — EVENT', value: 'EVENT' },
  { label: '03 — MOTION GRAPHICS', value: 'MOTION GRAPHICS' },
  { label: '04 — REELS', value: 'REELS' }
];

export const WorkPage = () => {
  const [selectedCat, setSelectedCat] = useState('ALL');
  const { setCursor, resetCursor } = useCursor();
  const pageRef = useRef(null);
  const headerRef = useRef(null);
  const titleBoxRef = useRef(null);
  const descRef = useRef(null);
  const filterRef = useRef(null);

  const filteredProjects = useMemo(() => {
    return selectedCat === 'ALL'
      ? projects
      : projects.filter((p) => p.category?.toUpperCase() === selectedCat);
  }, [selectedCat]);

  useEffect(() => {
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Typography Reveal: Heading word-by-word
      if (titleBoxRef.current) {
        animateWordReveal(titleBoxRef.current, {
          duration: 0.9,
          stagger: 0.08,
          ease: 'power3.out',
        });
      }

      // 2. Staggered Content: Description and filter pills enter sequentially
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
          }
        );
      }

      if (filterRef.current) {
        gsap.fromTo(
          filterRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.25,
            ease: 'power3.out',
          }
        );
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // Refresh ScrollTrigger when category filter changes
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, [selectedCat]);

  return (
    <main ref={pageRef} className="pt-32 pb-20 md:pt-40">
      {/* Header section */}
      <section ref={headerRef} className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#A1A1AA] transform-gpu will-change-transform block">
          PORTFOLIO ARCHIVE
        </span>
        <div ref={titleBoxRef}>
          <WordReveal
            text="SELECTED WORK"
            as="h1"
            className="font-serif text-[clamp(3rem,8vw,7.5rem)] leading-[0.95] font-normal text-[#F5F4F0] uppercase mt-3 tracking-tight transform-gpu will-change-transform"
          />
        </div>
        <p
          ref={descRef}
          className="text-base text-[#A1A1AA] font-light max-w-xl mt-6 leading-relaxed transform-gpu will-change-transform"
        >
          An editorial collection of video editing projects and motion graphics campaigns.
        </p>
      </section>

      {/* Category Filter Tabs */}
      <section ref={filterRef} className="max-w-7xl mx-auto px-6 md:px-12 mb-16 transform-gpu will-change-transform">
        <div className="flex items-center space-x-3 overflow-x-auto no-scrollbar pb-4 border-b border-white/10">
          {categories.map((cat) => {
            const isActive = selectedCat === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setSelectedCat(cat.value)}
                onMouseEnter={() => setCursor('hover')}
                onMouseLeave={resetCursor}
                className={`text-xs uppercase tracking-[0.2em] font-semibold px-5 py-2.5 rounded-full transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#ea580c] text-white border border-[#ea580c] shadow-[0_0_15px_rgba(234,88,12,0.4)]'
                    : 'bg-transparent text-[#A1A1AA] hover:text-[#F5F4F0] border border-white/20 hover:border-[#ea580c]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Projects Asymmetric Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-28">
        <div className="grid grid-cols-12 gap-y-16 md:gap-x-12 md:gap-y-24 items-start">
          {filteredProjects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      </section>

      <ContactCTA />
    </main>
  );
};

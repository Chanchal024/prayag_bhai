import React, { useMemo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/projects';
import { ProjectCard } from './ProjectCard';
import { useCursor } from '../context/CursorContext';
import {
  isReducedMotion,
  WordReveal,
  animateWordReveal,
} from '../utils/scrollAnimations';

gsap.registerPlugin(ScrollTrigger);

export const FeaturedWork = React.memo(({ limit = 5, showHeader = true }) => {
  const displayProjects = useMemo(() => projects.slice(0, limit), [limit]);
  const { setCursor, resetCursor } = useCursor();
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const titleBoxRef = useRef(null);
  const linkBoxRef = useRef(null);

  useEffect(() => {
    if (!showHeader || isReducedMotion() || !headerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Typography Reveal: Large heading word-by-word
      if (titleBoxRef.current) {
        animateWordReveal(titleBoxRef.current, {
          trigger: headerRef.current,
          start: 'top 88%',
          duration: 0.85,
          stagger: 0.08,
          ease: 'power3.out',
        });
      }

      // 2. Staggered Content: View all link enters sequentially
      if (linkBoxRef.current) {
        gsap.fromTo(
          linkBoxRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 88%',
              end: 'bottom top',
              toggleActions: 'play reverse play reverse',
              invalidateOnRefresh: true,
            },
          }
        );
      }
    }, headerRef);

    return () => ctx.revert();
  }, [showHeader]);

  return (
    <section ref={sectionRef} className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto">
      {showHeader && (
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 space-y-6 md:space-y-0"
        >
          <div ref={titleBoxRef} className="flex flex-col space-y-3 transform-gpu will-change-transform">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#A1A1AA]">
              PORTFOLIO SHOWCASE
            </span>
            <WordReveal
              text="SELECTED WORK"
              as="h2"
              className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#F5F4F0] uppercase tracking-tight"
            />
          </div>

          <div ref={linkBoxRef} className="transform-gpu will-change-transform">
            <Link
              to="/work"
              onMouseEnter={() => setCursor('hover')}
              onMouseLeave={resetCursor}
              className="inline-flex items-center space-x-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#F5F4F0] border-b border-[#ea580c] pb-1 hover:text-[#ea580c] transition-colors"
            >
              <span>VIEW ALL ALBUMS ({projects.length})</span>
              <ArrowRight className="w-4 h-4 text-[#ea580c]" />
            </Link>
          </div>
        </div>
      )}

      {/* Asymmetric Composition Grid */}
      <div className="grid grid-cols-12 gap-y-16 md:gap-x-12 md:gap-y-24 items-start">
        {displayProjects.map((project, idx) => (
          <ProjectCard key={project.id} project={project} index={idx} />
        ))}
      </div>
    </section>
  );
});

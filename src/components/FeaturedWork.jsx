import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { projects } from '../data/projects';
import { ProjectCard } from './ProjectCard';
import { useCursor } from '../context/CursorContext';

export const FeaturedWork = ({ limit = 5, showHeader = true }) => {
  const displayProjects = projects.slice(0, limit);
  const { setCursor, resetCursor } = useCursor();

  return (
    <section className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto">
      {showHeader && (
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 space-y-6 md:space-y-0">
          <div className="flex flex-col space-y-3">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#A1A1AA]">
              PORTFOLIO SHOWCASE
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#F5F4F0] uppercase tracking-tight">
              SELECTED WORK
            </h2>
          </div>

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
      )}

      {/* Asymmetric Composition Grid */}
      <div className="grid grid-cols-12 gap-y-16 md:gap-x-12 md:gap-y-24 items-start">
        {displayProjects.map((project, idx) => (
          <ProjectCard key={project.id} project={project} index={idx} />
        ))}
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { projects } from '../data/projects';
import { ProjectCard } from '../components/ProjectCard';
import { ContactCTA } from '../components/ContactCTA';
import { useCursor } from '../context/CursorContext';

const categories = [
  { label: 'ALL', value: 'ALL' },
  { label: '01 — VIDEO EDITOR', value: 'VIDEO EDITOR' },
  { label: '02 — VIDEOGRAPHY', value: 'VIDEOGRAPHY' },
  { label: '03 — MOTION GRAPHICS', value: 'MOTION GRAPHICS' }
];

export const WorkPage = () => {
  const [selectedCat, setSelectedCat] = useState('ALL');
  const { setCursor, resetCursor } = useCursor();

  const filteredProjects = selectedCat === 'ALL'
    ? projects
    : projects.filter((p) => p.category.toUpperCase() === selectedCat);

  return (
    <main className="pt-32 pb-20 md:pt-40">
      {/* Header section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#A1A1AA]">
          PORTFOLIO ARCHIVE
        </span>
        <h1 className="font-serif text-[clamp(3rem,8vw,7.5rem)] leading-[0.95] font-normal text-[#F5F4F0] uppercase mt-3 tracking-tight">
          SELECTED WORK
        </h1>
        <p className="text-base text-[#A1A1AA] font-light max-w-xl mt-6 leading-relaxed">
          An editorial collection of video editing projects, videography documentations, and motion graphics campaigns.
        </p>
      </section>

      {/* Category Filter Tabs */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
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

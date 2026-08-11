import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCursor } from '../context/CursorContext';

gsap.registerPlugin(ScrollTrigger);

export const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
          },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group relative flex flex-col ${project.gridSpan || 'col-span-12'}`}
    >
      <Link
        to={`/work/${project.slug}`}
        onMouseEnter={() => setCursor('view', 'VIEW')}
        onMouseLeave={resetCursor}
        className="block relative w-full overflow-hidden bg-[#D8D7D2] rounded-xs cursor-pointer"
      >
        <div className={`w-full ${project.coverAspect || 'aspect-[16/10]'} overflow-hidden relative`}>
          <img
            ref={imgRef}
            src={project.heroImage}
            alt={project.title}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />

          {/* Dark subtle overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-500" />

          {/* Top right floating arrow badge */}
          <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#F5F4F0] text-[#111111] flex items-center justify-between px-3 shadow-md opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <span className="text-[10px] font-mono font-semibold">{`0${index + 1}`}</span>
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </Link>

      {/* Project Metadata - Moves slightly upward on hover */}
      <div className="pt-5 flex items-start justify-between border-b border-white/10 pb-6 transition-transform duration-300 group-hover:-translate-y-1">
        <div className="flex flex-col space-y-1">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#ea580c] font-semibold">
            {project.category}
          </span>
          <Link
            to={`/work/${project.slug}`}
            onMouseEnter={() => setCursor('hover')}
            onMouseLeave={resetCursor}
            className="font-serif text-2xl sm:text-3xl font-normal text-[#F5F4F0] group-hover:text-[#ea580c] group-hover:underline tracking-tight transition-colors"
          >
            {project.title}
          </Link>
        </div>

        <div className="text-right">
          <span className="text-xs font-mono text-[#A1A1AA] font-medium tracking-widest">
            {project.year}
          </span>
        </div>
      </div>
    </div>
  );
};

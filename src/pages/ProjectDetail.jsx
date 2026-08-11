import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { FiArrowLeft, FiPlay, FiClock, FiUser, FiLayers, FiCheckCircle } from 'react-icons/fi';
import { motionProjects } from '../data/motionProjects';
import { graphicProjects } from '../data/graphicProjects';
import { videoProjects } from '../data/videoProjects';

export default function ProjectDetail() {
  const { category, slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const allProjects = [...videoProjects, ...motionProjects, ...graphicProjects];
  const project = allProjects.find(p => p.slug === slug) || videoProjects[0];

  // Find next project in same array
  const currentIndex = allProjects.findIndex(p => p.slug === project.slug);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  return (
    <div className="min-h-screen bg-[#0B0B0B] pt-28 pb-24 text-white">
      
      {/* Back button */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8">
        <Link 
          to="/#projects"
          className="inline-flex items-center gap-2 text-sm font-semibold text-secondary-text hover:text-[#FF6A1A] transition-colors bg-[#141414] px-4 py-2 rounded-full border border-white/10"
        >
          <FiArrowLeft />
          <span>Back to All Projects</span>
        </Link>
      </div>

      {/* Hero Banner Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[32px] overflow-hidden border border-white/15 aspect-[16/9] md:aspect-[21/9] bg-[#141414] shadow-2xl flex items-center justify-center group"
        >
          <img 
            src={project.thumbnail} 
            alt={project.title}
            className="w-full h-full object-cover brightness-75 group-hover:scale-105 transition-transform duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-black/40 to-transparent" />

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-20 h-20 rounded-full bg-[#FF6A1A] flex items-center justify-center text-white text-3xl shadow-[0_0_50px_rgba(255,106,26,0.7)] cursor-pointer hover:scale-110 transition-transform">
              <FiPlay className="ml-1 text-white" />
            </div>
            <span className="mt-4 text-xs font-mono font-bold uppercase tracking-widest text-white bg-black/70 px-4 py-1.5 rounded-full border border-white/20">
              Watch Full Preview (4K)
            </span>
          </div>

          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 z-10 max-w-2xl">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF9B55] bg-[#FF6A1A]/20 px-3 py-1 rounded-full border border-[#FF6A1A]/40 mb-3 inline-block">
              {project.category}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {project.title}
            </h1>
          </div>
        </motion.div>
      </div>

      {/* Metadata & Case Study */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left Case Study Content */}
        <div className="lg:col-span-8 space-y-12">
          
          <div>
            <h2 className="text-2xl font-bold mb-4 font-heading text-white">Project Overview</h2>
            <p className="text-lg text-secondary-text font-light leading-relaxed">
              {project.shortDesc}
            </p>
          </div>

          {/* Challenge & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-[24px] bg-[#141414] border border-white/8">
              <h3 className="text-lg font-bold text-[#FF8A3D] mb-3 flex items-center gap-2">
                <FiCheckCircle className="text-[#FF6A1A]" />
                The Challenge
              </h3>
              <p className="text-sm text-secondary-text font-light leading-relaxed">
                {project.challenge || "Balancing heavy graphical elements with smooth pacing to maintain high audience retention."}
              </p>
            </div>

            <div className="p-6 rounded-[24px] bg-[#141414] border border-white/8">
              <h3 className="text-lg font-bold text-[#FF8A3D] mb-3 flex items-center gap-2">
                <FiCheckCircle className="text-[#FF6A1A]" />
                The Solution
              </h3>
              <p className="text-sm text-secondary-text font-light leading-relaxed">
                {project.solution || "Implemented multi-pass color grading and custom speed-ramp transitions in DaVinci Resolve."}
              </p>
            </div>
          </div>

          {/* Stills Gallery */}
          <div>
            <h2 className="text-2xl font-bold mb-6 font-heading text-white">Production Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {project.gallery?.map((img, idx) => (
                <div key={idx} className="rounded-[20px] overflow-hidden border border-white/10 aspect-video bg-[#141414]">
                  <img src={img} alt={`Gallery Still ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Sidebar Metadata */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-8 rounded-[28px] bg-[#141414] border border-white/10 shadow-xl space-y-6">
            
            <div className="flex items-center gap-4 border-b border-white/10 pb-4">
              <FiUser className="text-[#FF6A1A] text-xl" />
              <div>
                <div className="text-xs text-muted-text uppercase font-mono">Client</div>
                <div className="text-base font-bold text-white">{project.client}</div>
              </div>
            </div>

            <div className="flex items-center gap-4 border-b border-white/10 pb-4">
              <FiClock className="text-[#FF6A1A] text-xl" />
              <div>
                <div className="text-xs text-muted-text uppercase font-mono">Timeline</div>
                <div className="text-base font-bold text-white">{project.timeline}</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <FiLayers className="text-[#FF6A1A] text-xl" />
              <div>
                <div className="text-xs text-muted-text uppercase font-mono">Category</div>
                <div className="text-base font-bold text-white">{project.category}</div>
              </div>
            </div>

            {/* Tools list */}
            <div className="pt-4 border-t border-white/10">
              <div className="text-xs text-muted-text uppercase font-mono mb-3">Software Used</div>
              <div className="flex flex-wrap gap-2">
                {project.tools?.map((tool, idx) => (
                  <span key={idx} className="text-xs font-mono text-white bg-[#1A1A1A] px-3 py-1.5 rounded-lg border border-white/10">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Next Project CTA Card */}
          <div 
            onClick={() => navigate(`/project/${nextProject.category.toLowerCase().replace(/\s+/g, '-')}/${nextProject.slug}`)}
            className="p-8 rounded-[28px] bg-gradient-to-br from-[#1A1A1A] to-[#141414] border border-[#FF6A1A]/30 hover:border-[#FF6A1A] transition-all duration-300 cursor-pointer group shadow-2xl"
          >
            <div className="text-xs font-mono uppercase tracking-widest text-[#FF8A3D] mb-2">Next Project →</div>
            <h4 className="text-xl font-bold text-white group-hover:text-[#FF6A1A] transition-colors">{nextProject.title}</h4>
            <p className="text-xs text-muted-text font-mono mt-1">{nextProject.category}</p>
          </div>

        </div>

      </div>

    </div>
  );
}

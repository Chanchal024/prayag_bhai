import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SectionHeading from './SectionHeading';
import ProjectCard from './ProjectCard';
import { motionProjects } from '../data/motionProjects';
import { graphicProjects } from '../data/graphicProjects';
import { videoProjects } from '../data/videoProjects';

export default function FeaturedProjects() {
  const [activeTab, setActiveTab] = useState('Video Editing');

  const categories = [
    { id: 'Video Editing', label: 'Video Editing', data: videoProjects },
    { id: 'Motion Graphics', label: 'Motion Graphics', data: motionProjects },
    { id: 'Graphics', label: 'Graphics & Design', data: graphicProjects },
  ];

  const currentCategory = categories.find(c => c.id === activeTab);

  return (
    <section id="projects" className="py-24 md:py-32 relative bg-[#0B0B0B] border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <SectionHeading 
            subtitle="Portfolio Showcase" 
            title="Featured Projects" 
          />

          {/* Category Tabs */}
          <div className="flex items-center gap-2 p-1.5 rounded-full bg-[#141414] border border-white/10 w-fit self-start md:self-auto overflow-x-auto max-w-full">
            {categories.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 relative whitespace-nowrap ${
                    isActive 
                      ? 'text-white shadow-lg' 
                      : 'text-secondary-text hover:text-white hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabGlow"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF6A1A] to-[#FF8A3D]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {currentCategory?.data.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                categoryType={activeTab} 
              />
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}

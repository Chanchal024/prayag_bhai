import React from 'react';
import { motion } from 'motion/react';
import { FiDownload, FiCheckCircle } from 'react-icons/fi';
import SectionHeading from './SectionHeading';

export default function About() {
  const highlights = [
    "DaVinci Certified Colorist",
    "8+ Years Commercial Experience",
    "4K 60FPS Post-Production Suite",
    "3D Motion Graphics Specialist"
  ];

  return (
    <section id="about" className="py-24 md:py-32 relative bg-[#0B0B0B] border-b border-white/5 overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#FF6A1A]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <SectionHeading subtitle="About Me" title="Crafting Visual Narratives That Resonated Globally" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Big Statement */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6"
          >
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight mb-8 font-heading">
              Editing Stories <br />
              <span className="text-gradient-orange">That Leave</span> <br />
              An Impact.
            </h3>

            <div className="relative rounded-[24px] overflow-hidden border border-white/10 shadow-2xl group max-w-lg">
              <img 
                src="/p3.png" 
                alt="Prayag Kumar Das" 
                className="w-full h-64 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-[#FF8A3D] bg-black/70 px-3 py-1 rounded-full border border-[#FF6A1A]/30">
                  Studio Post-Suite • Los Angeles / Remote
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Bio Paragraphs & Details */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6 flex flex-col justify-between"
          >
            <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light mb-6">
              I specialize in transforming raw footage into cinematic experiences through creative editing, storytelling, motion graphics, and visual effects.
            </p>

            <p className="text-base text-secondary-text leading-relaxed font-light mb-8">
              With years of experience across commercial campaigns, social media branding, trailer teasers, and promotional content, I help directors and brands connect deeply with audiences through engaging visual rhythm.
            </p>

            {/* Feature bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-[#141414] p-3.5 rounded-xl border border-white/5">
                  <FiCheckCircle className="text-[#FF6A1A] text-lg shrink-0" />
                  <span className="text-sm font-medium text-white">{item}</span>
                </div>
              ))}
            </div>

            {/* Resume Button */}
            <div>
              <a
                href="#contact"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#1A1A1A] border border-[#FF6A1A]/50 text-white font-bold hover:bg-[#FF6A1A] hover:border-[#FF6A1A] hover:shadow-[0_0_30px_rgba(255,106,26,0.4)] transition-all duration-300 group"
              >
                <FiDownload className="text-xl text-[#FF6A1A] group-hover:text-white transition-colors" />
                <span>Download Resume (PDF)</span>
              </a>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}

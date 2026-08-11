import React from 'react';
import { motion } from 'motion/react';
import { experienceData } from '../data/experience';
import SectionHeading from './SectionHeading';
import { FiBriefcase } from 'react-icons/fi';

export default function Timeline() {
  return (
    <section id="experience" className="py-24 md:py-32 relative bg-[#0E0E0E] border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeading 
          subtitle="Career Timeline" 
          title="Experience & Impact" 
        />

        <div className="relative max-w-4xl mx-auto pl-6 sm:pl-8 md:pl-10">
          
          {/* Vertical Orange Accent Line */}
          <div className="absolute top-2 bottom-2 left-2 sm:left-3 md:left-4 w-0.5 bg-gradient-to-b from-[#FF6A1A] via-[#FF8A3D] to-[#B52818]" />

          <div className="space-y-12">
            {experienceData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative pl-8 sm:pl-10 group"
              >
                {/* Glowing Timeline Dot */}
                <div className="absolute left-[-17px] sm:left-[-21px] md:left-[#FF6A1A] top-1.5 w-6 h-6 rounded-full bg-[#0E0E0E] border-2 border-[#FF6A1A] group-hover:bg-[#FF6A1A] group-hover:scale-125 transition-all duration-300 shadow-[0_0_15px_rgba(255,106,26,0.6)] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>

                {/* Content Card */}
                <div className="p-6 sm:p-8 rounded-[24px] bg-[#141414] border border-white/8 hover:border-[#FF6A1A]/40 transition-all duration-300 shadow-xl">
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#FF8A3D] transition-colors">
                        {item.role}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-[#FF6A1A] font-semibold mt-1">
                        <FiBriefcase className="text-xs" />
                        <span>{item.company}</span>
                      </div>
                    </div>

                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-white bg-[#1A1A1A] px-3 py-1 rounded-full border border-white/10 w-fit">
                      {item.period}
                    </span>
                  </div>

                  <p className="text-secondary-text font-light text-base leading-relaxed mb-6">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {item.highlights.map((h, i) => (
                      <span key={i} className="text-xs text-muted-text bg-[#1A1A1A] px-3 py-1 rounded-lg border border-white/5 font-mono">
                        ✓ {h}
                      </span>
                    ))}
                  </div>

                </div>

              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

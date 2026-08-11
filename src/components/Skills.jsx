import React from 'react';
import { motion } from 'motion/react';
import { skillsData } from '../data/skills';
import SectionHeading from './SectionHeading';

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative bg-[#0E0E0E] border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeading 
          subtitle="Technical Mastery" 
          title="Core Capabilities & Creative Arsenal" 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="p-6 rounded-[24px] bg-[#141414] border border-white/8 hover:border-[#FF6A1A]/40 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-[#FF8A3D] transition-colors">
                    {skill.name}
                  </h3>
                  <span className="text-sm font-mono font-bold text-[#FF6A1A]">
                    {skill.level}%
                  </span>
                </div>
                <p className="text-sm text-muted-text font-light mb-6">
                  {skill.description}
                </p>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-[#1A1A1A] h-2 rounded-full overflow-hidden p-0.5 border border-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.2 + index * 0.1, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-[#FF6A1A] via-[#FF8A3D] to-[#FF9B55] shadow-[0_0_12px_rgba(255,106,26,0.6)]"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

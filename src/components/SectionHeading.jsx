import React from 'react';
import { motion } from 'motion/react';

export default function SectionHeading({ title, subtitle, centered = false }) {
  return (
    <div className={`mb-12 md:mb-16 ${centered ? 'text-center' : ''}`}>
      {subtitle && (
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1A1A] border border-white/20 text-[#F5F4F0] text-xs font-semibold uppercase tracking-widest mb-4"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#F5F4F0] animate-pulse"></span>
          {subtitle}
        </motion.div>
      )}
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl md:text-5xl font-bold tracking-tight text-white max-w-3xl leading-tight"
      >
        {title}
      </motion.h2>
      <motion.div 
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`h-1 bg-gradient-to-r from-[#FF6A1A] to-transparent rounded-full mt-4 w-24 ${centered ? 'mx-auto' : ''}`}
      />
    </div>
  );
}

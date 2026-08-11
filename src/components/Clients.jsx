import React from 'react';
import { motion } from 'motion/react';
import { clientLogos } from '../data/clients';

export default function Clients() {
  // Duplicate array for seamless infinite looping marquee
  const doubleLogos = [...clientLogos, ...clientLogos, ...clientLogos];

  return (
    <section className="py-16 bg-[#0E0E0E] border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8 text-center">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs uppercase font-mono tracking-[0.25em] text-muted-text"
        >
          Trusted by Global Studios &amp; Innovative Brands
        </motion.p>
      </div>

      <div className="relative w-full overflow-hidden flex [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="animate-marquee flex items-center gap-12 sm:gap-16 md:gap-24 py-4">
          {doubleLogos.map((client, index) => (
            <div 
              key={`${client.name}-${index}`}
              className="flex flex-col items-center justify-center min-w-[160px] opacity-60 hover:opacity-100 transition-opacity duration-300 group cursor-default select-none"
            >
              <span className="text-lg md:text-xl font-bold font-heading tracking-widest text-white group-hover:text-[#FF8A3D] transition-colors">
                {client.name}
              </span>
              <span className="text-[10px] font-mono text-muted-text uppercase tracking-widest mt-1">
                {client.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

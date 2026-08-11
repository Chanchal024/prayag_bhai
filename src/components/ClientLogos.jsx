import React from 'react';
import { clientLogos } from '../data/clients';

export const ClientLogos = () => {
  // Duplicate array for seamless infinite marquee
  const marqueeItems = [...clientLogos, ...clientLogos, ...clientLogos];

  return (
    <section className="py-16 border-t border-b border-white/10 bg-[#080808]/70 backdrop-blur-md overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8 text-center md:text-left">
        <span className="text-[11px] uppercase tracking-[0.3em] font-semibold text-[#A1A1AA]">
          BRANDS I'VE WORKED WITH
        </span>
      </div>

      <div className="relative w-full overflow-hidden flex items-center">
        {/* Gradients to fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#060606] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#060606] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex items-center space-x-16 md:space-x-24 py-2">
          {marqueeItems.map((client, idx) => (
            <div
              key={`${client.name}-${idx}`}
              className="flex flex-col items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-300 cursor-pointer select-none group"
            >
              <span className="font-serif text-2xl md:text-3xl font-semibold tracking-wider text-[#F5F4F0] uppercase group-hover:scale-105 group-hover:text-[#ea580c] transition-all">
                {client.name}
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#A1A1AA] mt-1">
                {client.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

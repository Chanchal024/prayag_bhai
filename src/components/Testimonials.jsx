import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '../data/testimonials';
import { useCursor } from '../context/CursorContext';

export const Testimonials = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const { setCursor, resetCursor } = useCursor();
  const touchStartX = useRef(0);

  const prevTestimonial = () => {
    setActiveIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setActiveIdx((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    if (touchStartX.current - touchEndX > 50) {
      nextTestimonial();
    } else if (touchEndX - touchStartX.current > 50) {
      prevTestimonial();
    }
  };

  const current = testimonials[activeIdx];

  return (
    <section className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4 md:space-y-0">
        <div className="flex flex-col space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#A1A1AA]">
            CLIENT REVIEWS & FEEDBACK
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#F5F4F0] uppercase tracking-tight">
            SMILES & STORIES FROM MY CLIENTS
          </h2>
        </div>

        {/* Carousel Slider Navigation Buttons */}
        <div className="flex items-center space-x-4">
          <button
            onClick={prevTestimonial}
            onMouseEnter={() => setCursor('hover')}
            onMouseLeave={resetCursor}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-[#F5F4F0] hover:bg-[#ea580c] hover:border-[#ea580c] hover:text-white transition-colors duration-300 cursor-pointer"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-xs font-mono text-[#A1A1AA] tracking-widest px-2">
            0{activeIdx + 1} / 0{testimonials.length}
          </span>
          <button
            onClick={nextTestimonial}
            onMouseEnter={() => setCursor('hover')}
            onMouseLeave={resetCursor}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-[#F5F4F0] hover:bg-[#ea580c] hover:border-[#ea580c] hover:text-white transition-colors duration-300 cursor-pointer"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Editorial Quote Box */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={() => setCursor('drag', 'DRAG')}
        onMouseLeave={resetCursor}
        className="relative bg-[#0c0c0e]/90 border border-white/10 text-[#F5F4F0] p-10 sm:p-16 md:p-20 rounded-xs flex flex-col justify-between min-h-[380px] shadow-2xl overflow-hidden transition-all duration-500"
      >
        <Quote className="w-12 h-12 text-[#ea580c]/30 mb-8" />

        <div className="max-w-4xl space-y-8">
          <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal leading-snug tracking-tight text-[#F5F4F0]">
            "{current.quote}"
          </blockquote>

          <div className="flex items-center space-x-6 pt-4 border-t border-white/10">
            <img
              src={current.image}
              alt={current.author}
              className="w-14 h-14 rounded-full object-cover border border-[#ea580c]/40"
            />
            <div className="flex flex-col">
              <span className="font-serif text-lg font-normal text-[#F5F4F0]">
                {current.author}
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-[#A1A1AA]">
                {current.role} — {current.company}
              </span>
            </div>
          </div>
        </div>

        {/* Floating Indicator Dots */}
        <div className="absolute bottom-8 right-8 flex space-x-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === activeIdx ? 'bg-[#F5F4F0] w-6' : 'bg-[#F5F4F0]/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

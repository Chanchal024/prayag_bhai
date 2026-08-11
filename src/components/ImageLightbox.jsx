import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCursor } from '../context/CursorContext';

export const ImageLightbox = ({ images, activeIndex, onClose, onPrev, onNext }) => {
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  if (activeIndex === null || !images[activeIndex]) return null;

  const current = images[activeIndex];

  return (
    <div className="fixed inset-0 z-[10000] bg-black/95 text-[#F5F4F0] flex flex-col items-center justify-between p-6 md:p-12 animate-fade-in backdrop-blur-xl">
      {/* Top Bar */}
      <div className="w-full flex items-center justify-between text-xs tracking-widest uppercase text-[#6F6F6A]">
        <span>
          IMAGE {activeIndex + 1} OF {images.length}
        </span>
        <button
          onClick={onClose}
          onMouseEnter={() => setCursor('hover')}
          onMouseLeave={resetCursor}
          className="p-3 text-[#F5F4F0] hover:text-[#6F6F6A] transition-colors rounded-full border border-[#F5F4F0]/20 flex items-center space-x-2"
        >
          <span className="text-[10px]">CLOSE</span>
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main Image Container */}
      <div className="relative max-w-6xl w-full h-[75vh] flex items-center justify-center">
        <img
          src={current.url}
          alt={current.caption || 'Expanded photography detail view'}
          className="max-h-full max-w-full object-contain rounded-xs shadow-2xl"
        />

        {/* Prev / Next controls */}
        {images.length > 1 && (
          <>
            <button
              onClick={onPrev}
              onMouseEnter={() => setCursor('hover')}
              onMouseLeave={resetCursor}
              className="absolute left-2 md:left-6 w-12 h-12 rounded-full bg-[#111111]/80 border border-[#F5F4F0]/20 flex items-center justify-center text-[#F5F4F0] hover:bg-[#F5F4F0] hover:text-[#111111] transition-all"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={onNext}
              onMouseEnter={() => setCursor('hover')}
              onMouseLeave={resetCursor}
              className="absolute right-2 md:right-6 w-12 h-12 rounded-full bg-[#111111]/80 border border-[#F5F4F0]/20 flex items-center justify-center text-[#F5F4F0] hover:bg-[#F5F4F0] hover:text-[#111111] transition-all"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Caption at bottom */}
      <div className="text-center max-w-xl">
        <p className="text-xs uppercase tracking-[0.2em] text-[#6F6F6A]">
          {current.caption || 'FINE ART EDITORIAL PRINT'}
        </p>
      </div>
    </div>
  );
};

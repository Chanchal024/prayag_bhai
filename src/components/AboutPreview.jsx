import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCursor } from '../context/CursorContext';

gsap.registerPlugin(ScrollTrigger);

export const AboutPreview = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current?.children || [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { scale: 1.1, opacity: 0.8 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column Text (~45%) */}
        <div ref={textRef} className="md:col-span-6 lg:col-span-5 flex flex-col space-y-8">
          <div className="flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#ea580c]" />
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#ea580c]">
              I AM...
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.2] text-[#F5F4F0]">
            A passionate video editor dedicated to capturing life's most meaningful moments.
          </h2>

          <p className="text-base md:text-lg text-[#A1A1AA] font-light leading-relaxed">
            With a sharp eye for pacing, color grading, and visual storytelling, I create films and edits that feel honest, cinematic and timeless. Based in Cuttack, Odisha, India, I work worldwide with directors, high-end brands, and agencies.
          </p>

          <div>
            <Link
              to="/about"
              onMouseEnter={() => setCursor('hover')}
              onMouseLeave={resetCursor}
              className="inline-flex items-center space-x-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#F5F4F0] group border-b border-[#ea580c] pb-2 hover:text-[#ea580c] transition-colors"
            >
              <span>MORE ABOUT ME</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform text-[#ea580c]" />
            </Link>
          </div>
        </div>

        {/* Right Column Editorial Image (~55%) - Asymmetric layout */}
        <div className="md:col-span-6 lg:col-span-7 flex justify-end">
          <div
            onMouseEnter={() => setCursor('view')}
            onMouseLeave={resetCursor}
            className="relative w-full max-w-xl aspect-[4/5] overflow-hidden rounded-xs bg-[#141414] shadow-sm border border-white/10"
          >
            <img
              ref={imageRef}
              src="/p3.png"
              alt="Prayag Kumar Das Portrait Study"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/10" />

            {/* Asymmetric floating caption */}
            <div className="absolute bottom-6 right-6 bg-[#060606]/85 backdrop-blur-md px-4 py-2 border border-white/20 text-[10px] uppercase tracking-[0.25em] text-[#F5F4F0]">
              PRAYAG KUMAR DAS / IN STUDIO 2026
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

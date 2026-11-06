import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ImageBreak = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax scale animation from 1.18 -> 1.0
      gsap.fromTo(
        imageRef.current,
        { scale: 1.18 },
        {
          scale: 1.0,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      // Text reveal timeline
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[75vh] md:h-[85vh] overflow-hidden my-16 bg-[#111111]"
    >
      <img
        ref={imageRef}
        src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2400&q=85"
        alt="Cinematic full width landscape photography"
        className="w-full h-full object-cover object-center"
        loading="lazy"
        decoding="async"
      />

      {/* Dark gradient overlay for text legibility */}
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center px-6" />

      {/* Centered Editorial Statement */}
      <div
        ref={textRef}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
      >
        <span className="text-xs uppercase tracking-[0.4em] font-semibold text-[#F5F4F0]/80 mb-4">
          EDITORIAL PHILOSOPHY
        </span>
        <h2 className="font-serif text-4xl sm:text-6xl md:text-8xl text-[#F5F4F0] uppercase tracking-tight max-w-5xl leading-none">
          EVERY FRAME TELLS A STORY.
        </h2>
      </div>
    </section>
  );
};

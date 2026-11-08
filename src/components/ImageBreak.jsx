import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  isReducedMotion,
  WordReveal,
  animateWordReveal,
} from '../utils/scrollAnimations';

gsap.registerPlugin(ScrollTrigger);

export const ImageBreak = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const titleBoxRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Parallax scrub scale animation from 1.18 -> 1.0
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

      // 2. Editorial philosophy label subtle slide up
      if (labelRef.current) {
        gsap.fromTo(
          labelRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
              end: 'bottom top',
              toggleActions: 'play reverse play reverse',
              invalidateOnRefresh: true,
            },
          }
        );
      }

      // 3. Typography Reveal: Large statement word-by-word
      if (titleBoxRef.current) {
        animateWordReveal(titleBoxRef.current, {
          trigger: containerRef.current,
          start: 'top 75%',
          duration: 0.9,
          stagger: 0.08,
          ease: 'power3.out',
        });
      }
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
        className="w-full h-full object-cover object-center transform-gpu will-change-transform"
        loading="lazy"
        decoding="async"
      />

      {/* Dark gradient overlay for text legibility */}
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center px-6" />

      {/* Centered Editorial Statement */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <span
          ref={labelRef}
          className="text-xs uppercase tracking-[0.4em] font-semibold text-[#F5F4F0]/80 mb-4 transform-gpu will-change-transform"
        >
          EDITORIAL PHILOSOPHY
        </span>
        <div ref={titleBoxRef}>
          <WordReveal
            text="EVERY FRAME TELLS A STORY."
            as="h2"
            className="font-serif text-4xl sm:text-6xl md:text-8xl text-[#F5F4F0] uppercase tracking-tight max-w-5xl leading-none transform-gpu will-change-transform"
          />
        </div>
      </div>
    </section>
  );
};

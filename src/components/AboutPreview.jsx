import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCursor } from '../context/CursorContext';
import {
  isReducedMotion,
  WordReveal,
  animateWordReveal,
  scrollClipReveal,
} from '../utils/scrollAnimations';

gsap.registerPlugin(ScrollTrigger);

export const AboutPreview = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const linkRef = useRef(null);
  const imageBoxRef = useRef(null);
  const imageRef = useRef(null);
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Typography Reveal: Large heading reveals word-by-word
      if (headingRef.current) {
        animateWordReveal(headingRef.current, {
          trigger: sectionRef.current,
          start: 'top 85%',
          duration: 0.85,
          stagger: 0.035,
          ease: 'power3.out',
        });
      }

      // 2. Staggered Content: Paragraph and CTA button enter sequentially
      const contentElements = [paragraphRef.current, linkRef.current].filter(Boolean);
      if (contentElements.length) {
        gsap.fromTo(
          contentElements,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.12,
            delay: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 82%',
              end: 'bottom top',
              toggleActions: 'play reverse play reverse',
              invalidateOnRefresh: true,
            },
          }
        );
      }

      // 3. Image Reveal: Uncovers smoothly using clipping-mask transition
      if (imageBoxRef.current) {
        scrollClipReveal(imageBoxRef.current, imageRef.current, {
          trigger: sectionRef.current,
          start: 'top 80%',
          duration: 1.15,
          ease: 'power3.out',
          scaleFrom: 1.15,
          direction: 'bottom',
        });
      }
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

          {/* 1. Typography Reveal: Large Heading Word-by-Word */}
          <div ref={headingRef}>
            <WordReveal
              text="A passionate video editor dedicated to capturing life's most meaningful moments."
              as="h2"
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.2] text-[#F5F4F0]"
            />
          </div>

          {/* 2. Staggered Content: Paragraph & CTA link */}
          <p
            ref={paragraphRef}
            className="text-base md:text-lg text-[#A1A1AA] font-light leading-relaxed transform-gpu will-change-transform"
          >
            With a sharp eye for pacing, color grading, and visual storytelling, I create films and edits that feel honest, cinematic and timeless. Based in Cuttack, Odisha, India, I work worldwide with directors, high-end brands, and agencies.
          </p>

          <div ref={linkRef} className="transform-gpu will-change-transform">
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
          {/* 3. Image Reveal: Uncovers with Clipping-Mask Transition */}
          <div
            ref={imageBoxRef}
            onMouseEnter={() => setCursor('view')}
            onMouseLeave={resetCursor}
            className="relative w-full max-w-md aspect-[4/5] overflow-hidden rounded-xs bg-[#141414] shadow-sm border border-white/10 transform-gpu will-change-transform"
            style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          >
            <picture>
              <source srcSet="/p3.webp" type="image/webp" />
              <img
                ref={imageRef}
                src="/p3.png"
                alt="Prayag Kumar Das Portrait Study"
                className="w-full h-full object-cover object-center transform-gpu will-change-transform"
                loading="lazy"
                decoding="async"
              />
            </picture>
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

import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCursor } from '../context/CursorContext';
import { HeroAtmosphere } from './HeroAtmosphere';

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const labelRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollIndRef = useRef(null);

  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // 1. Entrance timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.6,
      })
        .fromTo(
          labelRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.2'
        )
        // Mask clip reveal for headline lines
        .fromTo(
          [line1Ref.current, line2Ref.current, line3Ref.current],
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.0, stagger: 0.15, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.5'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.4'
        )
        .fromTo(
          scrollIndRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.3'
        );

      // 2. Parallax scroll effect on video & hero content
      if (!prefersReducedMotion && heroRef.current && videoRef.current) {
        gsap.to(videoRef.current, {
          scale: 1.05,
          yPercent: 6,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
          },
        });

        gsap.to(contentRef.current, {
          yPercent: -15,
          opacity: 0.4,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      }

      // Ensure video plays smoothly on mount and pauses when scrolled out of view
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    }, heroRef);

    // Pause hero background video when not in viewport to save CPU/GPU
    let observer;
    if (heroRef.current && videoRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!videoRef.current) return;
            if (entry.isIntersecting) {
              videoRef.current.play().catch(() => {});
            } else {
              videoRef.current.pause();
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(heroRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
      ctx.revert();
    };
  }, []);

  const handleScrollClick = (e) => {
    e.preventDefault();
    const target = document.getElementById('stats') || document.getElementById('selected-work');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative w-full h-[100svh] min-h-[700px] bg-[#111111] overflow-hidden flex flex-col justify-between"
    >
      {/* 1. BACKGROUND VIDEO (Layer 0 - Hardware GPU Accelerated) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none transform-gpu will-change-transform">
        {/* Video Element */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          aria-hidden="true"
          preload="auto"
          poster="/thumbnails/hero-poster.webp"
          className="w-full h-full object-cover object-center transform-gpu opacity-90"
          style={{ transform: 'translateZ(0)' }}
        >
          <source src="/assets/v1.mp4" type="video/mp4" />
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* 2. CINEMATIC DARK OVERLAY (Layer 1) */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-1 pointer-events-none bg-gradient-to-b from-[#111111]/60 via-[#111111]/35 to-[#111111]/85 transition-opacity"
      />

      {/* 3. THREE.JS FLOATING ATMOSPHERE PARTICLES (Layer 2) */}
      <HeroAtmosphere />

      {/* 4. HERO WEBSITE CONTENT (Layer 10) */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-28 md:pt-32 pb-12 flex-1 flex flex-col justify-between"
      >
        {/* Top Meta Label */}
        <div className="flex items-center justify-between border-b border-[#F5F4F0]/20 pb-4 mb-6">
          <div ref={labelRef} className="flex items-center space-x-3">
            <span className="w-2 h-2 rounded-full bg-[#F5F4F0] animate-pulse" />
            <span className="text-xs uppercase tracking-[0.3em] font-medium text-[#F5F4F0]/90">
              VISUAL STORYTELLER • VIDEO EDITOR
            </span>
          </div>
        </div>

        {/* Center Main Headline & Paragraph */}
        <div className="max-w-4xl space-y-5 md:space-y-6 mt-2 md:mt-4 mb-auto">
          {/* Mask / Clip Reveal Headline */}
          <div className="space-y-1">
            <div className="overflow-hidden">
              <h1
                ref={line1Ref}
                className="font-serif text-[clamp(3.25rem,7.5vw,7.5rem)] leading-[0.93] font-normal text-[#F5F4F0] uppercase tracking-tight"
              >
                CAPTURING
              </h1>
            </div>
            <div className="overflow-hidden">
              <h1
                ref={line2Ref}
                className="font-serif text-[clamp(3.25rem,7.5vw,7.5rem)] leading-[0.93] font-normal text-[#F5F4F0] italic uppercase tracking-tight"
              >
                MOMENTS THAT
              </h1>
            </div>
            <div className="overflow-hidden">
              <h1
                ref={line3Ref}
                className="font-serif text-[clamp(3.25rem,7.5vw,7.5rem)] leading-[0.93] font-normal text-[#F5F4F0] uppercase tracking-tight"
              >
                LAST FOREVER.
              </h1>
            </div>
          </div>

          {/* Supporting Paragraph */}
          <p
            ref={descRef}
            className="text-base sm:text-lg md:text-xl text-[#F5F4F0]/85 font-light leading-relaxed max-w-xl"
          >
            Photography that transforms real moments into timeless visual stories, combining fine art sensitivity with high-end commercial precision.
          </p>

          {/* Action CTAs */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-5 pt-4">
            <Link
              to="/work"
              onMouseEnter={() => setCursor('hover')}
              onMouseLeave={resetCursor}
              className="inline-flex items-center space-x-3 bg-[#F5F4F0] text-[#111111] px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#D8D7D2] transition-all duration-300 group shadow-xl"
            >
              <span>EXPLORE MY WORK</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>

            <Link
              to="/contact"
              onMouseEnter={() => setCursor('hover')}
              onMouseLeave={resetCursor}
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#F5F4F0] border border-[#F5F4F0]/40 px-7 py-4 rounded-full hover:bg-[#F5F4F0] hover:text-[#111111] transition-all duration-300"
            >
              <span>WORK WITH ME</span>
            </Link>
          </div>
        </div>

        {/* Bottom Scroll Indicator */}
        <div
          ref={scrollIndRef}
          className="flex items-center justify-between pt-6 border-t border-[#F5F4F0]/15"
        >
          <a
            href="#stats"
            onClick={handleScrollClick}
            onMouseEnter={() => setCursor('hover')}
            onMouseLeave={resetCursor}
            className="inline-flex items-center space-x-3 text-xs uppercase tracking-[0.25em] text-[#F5F4F0]/90 hover:text-[#F5F4F0] transition-colors group cursor-pointer"
          >
            <span>SCROLL TO EXPLORE</span>
            <div className="relative w-4 h-8 border border-[#F5F4F0]/40 rounded-full flex justify-center p-1">
              <div className="w-1 h-2 bg-[#F5F4F0] rounded-full animate-bounce" />
            </div>
          </a>

          <div className="text-[10px] uppercase tracking-[0.25em] text-[#F5F4F0]/60 hidden sm:block">
            FINE ART & EDITORIAL COMMISSIONS
          </div>
        </div>
      </div>
    </section>
  );
};

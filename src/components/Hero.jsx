import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCursor } from '../context/CursorContext';

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const heroRef = useRef(null);
  const leftColRef = useRef(null);
  const head1Ref = useRef(null);
  const head2Ref = useRef(null);
  const ctaRef = useRef(null);
  const rightColRef = useRef(null);
  const personImgRef = useRef(null);
  const haloGlowRef = useRef(null);
  const orbitRingRef = useRef(null);
  const scrollRef = useRef(null);

  const { setCursor, resetCursor } = useCursor();

  // Subtle interactive parallax for halo & orbit ring
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // Entrance animation timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        head1Ref.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.1 }
      )
        .fromTo(
          head2Ref.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.45'
        )
        .fromTo(
          ctaRef.current?.children || [],
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
          '-=0.35'
        )
        .fromTo(
          rightColRef.current,
          { opacity: 0, scale: 0.97 },
          { opacity: 1, scale: 1, duration: 1.0, ease: 'power2.out' },
          '-=0.7'
        )
        .fromTo(
          scrollRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.3'
        );

      // Parallax on scroll
      if (!prefersReducedMotion && heroRef.current) {
        gsap.to(leftColRef.current, {
          yPercent: -10,
          opacity: 0.5,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.4,
          },
        });

        gsap.to(rightColRef.current, {
          yPercent: -6,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.4,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Subtle mouse tracking for ambient depth
  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * 15;
    setMouseOffset({ x, y });
  };

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
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[100svh] bg-[#000000] text-white overflow-hidden flex flex-col justify-between pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-4"
    >
      {/* 1. BACKGROUND LAYERS & ATMOSPHERE */}
      {/* Pure black base */}
      <div className="absolute inset-0 bg-[#000000] z-0 pointer-events-none" />

      {/* Vertical divider line matching reference image */}
      <div className="absolute left-[48%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/[0.07] to-transparent pointer-events-none hidden lg:block z-1" />

      {/* 2. MAIN TWO-COLUMN CONTENT */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-6 xl:gap-10 items-center my-auto">
        
        {/* LEFT COLUMN: Typography & CTAs */}
        <div
          ref={leftColRef}
          className="lg:col-span-6 xl:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-8 lg:space-y-10 z-10 pt-2 lg:pt-0 -translate-y-4 sm:-translate-y-6 lg:-translate-y-10 xl:-translate-y-12"
        >
          {/* Heading: Built With Purpose. Driven by Vision. */}
          <div className="space-y-1 sm:space-y-2 font-sans">
            <h1
              ref={head1Ref}
              className="text-[clamp(2.75rem,6vw,6rem)] font-bold tracking-tight leading-[1.05] text-[#8e8e93]"
            >
              Built With Purpose.
            </h1>
            <h1
              ref={head2Ref}
              className="text-[clamp(2.75rem,6vw,6rem)] font-bold tracking-tight leading-[1.05] text-white"
            >
              Driven by Vision.
            </h1>
          </div>

          {/* Buttons: Explore My Work & Work With Me */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-5 sm:gap-6 pt-2">
            <Link
              to="/work"
              onMouseEnter={() => setCursor('hover')}
              onMouseLeave={resetCursor}
              className="inline-flex items-center space-x-2.5 bg-white text-black px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl text-sm sm:text-base font-semibold hover:bg-zinc-200 transition-all duration-200 group shadow-[0_0_25px_rgba(255,255,255,0.18)]"
            >
              <span>Explore My Work</span>
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

            <Link
              to="/contact"
              onMouseEnter={() => setCursor('hover')}
              onMouseLeave={resetCursor}
              className="inline-flex items-center space-x-2 text-sm sm:text-base font-medium text-zinc-400 hover:text-white transition-colors duration-200 group"
            >
              <span>Work With Me</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* RIGHT COLUMN: Exact Hero Photo with Ambient Halo Glow & Celestial Ring */}
        <div
          ref={rightColRef}
          className="lg:col-span-6 xl:col-span-5 relative w-full h-[68svh] sm:h-[76svh] md:h-[82svh] lg:h-[92svh] xl:h-[96svh] max-h-[1150px] flex items-end justify-center select-none"
        >
          {/* A. Thin Celestial Circular Ring in background behind head */}
          <div
            ref={orbitRingRef}
            className="absolute rounded-full border border-white/[0.08] pointer-events-none transition-transform duration-300 ease-out"
            style={{
              width: 'clamp(400px, 55vw, 720px)',
              height: 'clamp(400px, 55vw, 720px)',
              top: '3%',
              left: '50%',
              transform: `translate(-50%, -20%) translate3d(${mouseOffset.x * 0.4}px, ${mouseOffset.y * 0.4}px, 0)`,
            }}
          />

          {/* B. Atmospheric Halo Radial Glow behind the halo ring */}
          <div
            ref={haloGlowRef}
            className="absolute rounded-full pointer-events-none transition-transform duration-300 ease-out"
            style={{
              width: 'clamp(340px, 46vw, 580px)',
              height: 'clamp(340px, 46vw, 580px)',
              top: '5%',
              left: '50%',
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.05) 40%, rgba(0, 0, 0, 0) 75%)',
              filter: 'blur(35px)',
              transform: `translate(-50%, -20%) translate3d(${mouseOffset.x * 0.7}px, ${mouseOffset.y * 0.7}px, 0)`,
            }}
          />

          {/* C. The Exact Hero Photo */}
          <img
            ref={personImgRef}
            src="/hero-person.webp"
            alt="Hero Subject"
            loading="eager"
            fetchPriority="high"
            className="relative z-10 w-auto h-full max-h-[96svh] xl:max-h-[100svh] scale-[1.16] origin-bottom object-contain object-bottom pointer-events-auto transform-gpu will-change-transform filter drop-shadow-[0_0_50px_rgba(255,255,255,0.1)] transition-transform duration-500 hover:scale-[1.18]"
          />
        </div>
      </div>

      {/* 3. BOTTOM SCROLL INDICATOR */}
      <div
        ref={scrollRef}
        className="relative z-10 w-full flex flex-col items-center justify-center pt-2 pb-1"
      >
        <a
          href="#stats"
          onClick={handleScrollClick}
          onMouseEnter={() => setCursor('hover')}
          onMouseLeave={resetCursor}
          className="inline-flex flex-col items-center space-y-1 text-[11px] font-medium uppercase tracking-[0.25em] text-zinc-500 hover:text-white transition-colors cursor-pointer group"
        >
          <span>SCROLL TO EXPLORE</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-zinc-500 group-hover:text-white transition-colors" />
        </a>
      </div>
    </section>
  );
};

export default Hero;

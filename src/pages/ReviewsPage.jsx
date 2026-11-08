import React, { useEffect, useRef } from 'react';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '../data/testimonials';
import { ContactCTA } from '../components/ContactCTA';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  isReducedMotion,
  WordReveal,
  animateWordReveal,
} from '../utils/scrollAnimations';

gsap.registerPlugin(ScrollTrigger);

export const ReviewsPage = () => {
  const pageRef = useRef(null);
  const headerRef = useRef(null);
  const titleBoxRef = useRef(null);
  const descRef = useRef(null);
  const bannerRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Typography Reveal: Large title word-by-word
      if (titleBoxRef.current) {
        animateWordReveal(titleBoxRef.current, {
          duration: 0.95,
          stagger: 0.08,
          ease: 'power3.out',
        });
      }

      // 2. Staggered Content: Description paragraph
      if (descRef.current) {
        gsap.fromTo(
          descRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            delay: 0.15,
            ease: 'power3.out',
          }
        );
      }

      // 3. Staggered Content: Stats Summary Banner sequential entrance
      if (bannerRef.current) {
        gsap.fromTo(
          bannerRef.current.children,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.12,
            delay: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bannerRef.current,
              start: 'top 88%',
              end: 'bottom top',
              toggleActions: 'play reverse play reverse',
              invalidateOnRefresh: true,
            },
          }
        );
      }

      // 4. Staggered Content: Review cards sequential cascade
      if (gridRef.current) {
        gsap.fromTo(
          '.review-card',
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 82%',
              end: 'bottom top',
              toggleActions: 'play reverse play reverse',
              invalidateOnRefresh: true,
            },
          }
        );
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef} className="pt-32 pb-20 md:pt-40">
      {/* Header */}
      <section ref={headerRef} className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#A1A1AA] transform-gpu will-change-transform block">
          CLIENT TESTIMONIALS
        </span>
        <div ref={titleBoxRef}>
          <WordReveal
            text="SMILES & REVIEWS"
            as="h1"
            className="font-serif text-[clamp(3rem,8vw,7.5rem)] leading-[0.95] font-normal text-[#F5F4F0] uppercase mt-3 tracking-tight transform-gpu will-change-transform"
          />
        </div>
        <p
          ref={descRef}
          className="text-base text-[#A1A1AA] font-light max-w-xl mt-6 leading-relaxed transform-gpu will-change-transform"
        >
          Reflections from publication editors, principal architects, haute horlogerie brand directors, and global creative leads.
        </p>
      </section>

      {/* Stats Summary Banner */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-20">
        <div
          ref={bannerRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-t border-b border-white/10"
        >
          <div className="flex flex-col space-y-2 transform-gpu will-change-transform">
            <div className="flex items-center space-x-1 text-[#ea580c]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <span className="font-serif text-3xl font-normal text-[#F5F4F0]">5.0 RATING</span>
            <span className="text-xs uppercase tracking-[0.2em] text-[#A1A1AA]">AVERAGE CLIENT EVALUATION</span>
          </div>

          <div className="flex flex-col space-y-2 border-l md:border-l border-white/10 pl-0 md:pl-8 transform-gpu will-change-transform">
            <span className="font-serif text-3xl font-normal text-[#F5F4F0]">120+</span>
            <span className="text-xs uppercase tracking-[0.2em] text-[#A1A1AA]">DELIVERED COMMISSIONS</span>
          </div>

          <div className="flex flex-col space-y-2 border-l md:border-l border-white/10 pl-0 md:pl-8 transform-gpu will-change-transform">
            <span className="font-serif text-3xl font-normal text-[#F5F4F0]">100%</span>
            <span className="text-xs uppercase tracking-[0.2em] text-[#A1A1AA]">ON-TIME CAMPAIGN DELIVERY</span>
          </div>
        </div>
      </section>

      {/* Grid of Reviews */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-28">
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        >
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="review-card bg-[#111111] text-[#F5F4F0] p-8 sm:p-12 rounded-xs flex flex-col justify-between space-y-8 shadow-md transform-gpu will-change-transform border border-white/5 hover:border-white/20 transition-colors"
            >
              <Quote className="w-8 h-8 text-[#F5F4F0]/20" />
              <blockquote className="font-serif text-xl sm:text-2xl font-normal leading-relaxed text-[#F5F4F0]">
                "{item.quote}"
              </blockquote>

              <div className="flex items-center space-x-4 pt-6 border-t border-[#F5F4F0]/15">
                <img
                  src={item.image}
                  alt={item.author}
                  className="w-12 h-12 rounded-full object-cover border border-[#F5F4F0]/30"
                  loading="lazy"
                  decoding="async"
                />
                <div className="flex flex-col">
                  <span className="font-serif text-base font-normal text-[#F5F4F0]">
                    {item.author}
                  </span>
                  <span className="text-xs uppercase tracking-[0.2em] text-[#6F6F6A]">
                    {item.role} — {item.company}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ContactCTA />
    </main>
  );
};

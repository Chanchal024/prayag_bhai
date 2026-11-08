import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail } from 'lucide-react';
import { FaInstagram, FaLinkedin } from 'react-icons/fa6';
import { useCursor } from '../context/CursorContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isReducedMotion, WordReveal, animateWordReveal } from '../utils/scrollAnimations';

gsap.registerPlugin(ScrollTrigger);

export const ContactCTA = () => {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const leftContentRef = useRef(null);
  const rightColRef = useRef(null);
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Typography Reveal: Large headline word-by-word
      if (headlineRef.current) {
        animateWordReveal(headlineRef.current, {
          trigger: sectionRef.current,
          start: 'top 85%',
          duration: 0.85,
          stagger: 0.08,
          ease: 'power3.out',
        });
      }

      // 2. Supporting text & button reveal
      if (leftContentRef.current) {
        gsap.fromTo(
          leftContentRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.1,
            delay: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              end: 'bottom top',
              toggleActions: 'play reverse play reverse',
              invalidateOnRefresh: true,
            },
          }
        );
      }

      // 3. Right column info & social links reveal
      if (rightColRef.current) {
        gsap.fromTo(
          rightColRef.current.children,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.15,
            delay: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'bottom top',
              toggleActions: 'play reverse play reverse',
              invalidateOnRefresh: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#111111] text-[#F5F4F0] py-28 md:py-40 px-6 md:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Oversized Typography */}
        <div className="lg:col-span-8 flex flex-col space-y-8">
          <span className="text-xs uppercase tracking-[0.35em] text-[#A1A1AA] font-medium transform-gpu will-change-transform">
            WORK WITH ME
          </span>

          <div ref={headlineRef} className="space-y-1">
            <WordReveal
              text="LET'S CREATE"
              as="h2"
              className="font-serif text-[clamp(2.75rem,7.5vw,7.5rem)] leading-[0.92] uppercase font-normal text-[#F5F4F0] tracking-tight transform-gpu will-change-transform block"
            />
            <WordReveal
              text="SOMETHING"
              as="h2"
              className="font-serif text-[clamp(2.75rem,7.5vw,7.5rem)] leading-[0.92] uppercase font-normal text-[#F5F4F0] italic tracking-tight transform-gpu will-change-transform block"
            />
            <WordReveal
              text="MEMORABLE."
              as="h2"
              className="font-serif text-[clamp(2.75rem,7.5vw,7.5rem)] leading-[0.92] uppercase font-normal text-[#F5F4F0] tracking-tight transform-gpu will-change-transform block"
            />
          </div>

          <div ref={leftContentRef} className="space-y-6">
            <p className="text-base sm:text-lg text-[#D4D4D8] font-light max-w-xl leading-relaxed transform-gpu will-change-transform">
              Have a project, event or story worth capturing? Let's talk about how we can collaborate to create timeless visual assets.
            </p>

            <div className="pt-2 transform-gpu will-change-transform">
              <Link
                to="/contact"
                onMouseEnter={() => setCursor('hover')}
                onMouseLeave={resetCursor}
                className="inline-flex items-center space-x-4 bg-[#ea580c] text-white px-9 py-5 rounded-full text-xs font-semibold uppercase tracking-[0.25em] hover:bg-[#f97316] transition-colors duration-300 group shadow-lg"
              >
                <span>LET'S TALK</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Details & Social Links */}
        <div
          ref={rightColRef}
          className="lg:col-span-4 flex flex-col justify-between space-y-12 border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0 lg:pl-12"
        >
          <div className="space-y-4 transform-gpu will-change-transform">
            <span className="text-xs uppercase tracking-[0.25em] text-[#A1A1AA]">
              DIRECT INQUIRIES
            </span>
            <a
              href="mailto:prayagdas2003@gmail.com"
              onMouseEnter={() => setCursor('hover')}
              onMouseLeave={resetCursor}
              className="flex items-center space-x-3 text-lg font-serif text-[#F5F4F0] hover:text-[#ea580c] hover:underline transition-colors"
            >
              <Mail className="w-5 h-5 text-[#ea580c]" />
              <span>prayagdas2003@gmail.com</span>
            </a>
            <p className="text-xs text-[#A1A1AA] leading-relaxed">
              Studio: Cuttack, Odisha, India<br />
              Available worldwide for commissions.
            </p>
          </div>

          <div className="space-y-4 transform-gpu will-change-transform">
            <span className="text-xs uppercase tracking-[0.25em] text-[#A1A1AA]">
              CONNECT & FOLLOW
            </span>
            <div className="flex flex-col space-y-3">
              <a
                href="https://www.instagram.com/__.__.prayag.__.__?igsh=MThqd3gyenZpM244NQ=="
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => setCursor('hover')}
                onMouseLeave={resetCursor}
                className="flex items-center space-x-3 text-xs tracking-[0.2em] uppercase text-[#F5F4F0] hover:text-[#ea580c] transition-colors"
              >
                <FaInstagram className="w-4 h-4 text-[#ea580c]" />
                <span>INSTAGRAM</span>
              </a>
              <a
                href="https://www.linkedin.com/in/prayag-kumar-das-854a5b270?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => setCursor('hover')}
                onMouseLeave={resetCursor}
                className="flex items-center space-x-3 text-xs tracking-[0.2em] uppercase text-[#F5F4F0] hover:text-[#ea580c] transition-colors"
              >
                <FaLinkedin className="w-4 h-4 text-[#ea580c]" />
                <span>LINKEDIN</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

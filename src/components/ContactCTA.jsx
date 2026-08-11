import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail } from 'lucide-react';
import { FaInstagram, FaLinkedin, FaFacebook } from 'react-icons/fa6';
import { useCursor } from '../context/CursorContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ContactCTA = () => {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current?.children || [],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
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
          <span className="text-xs uppercase tracking-[0.35em] text-[#A1A1AA] font-medium">
            WORK WITH ME
          </span>

          <div ref={headlineRef} className="space-y-1">
            <h2 className="font-serif text-[clamp(2.75rem,7.5vw,7.5rem)] leading-[0.92] uppercase font-normal text-[#F5F4F0] tracking-tight">
              LET'S CREATE
            </h2>
            <h2 className="font-serif text-[clamp(2.75rem,7.5vw,7.5rem)] leading-[0.92] uppercase font-normal text-[#F5F4F0] italic tracking-tight">
              SOMETHING
            </h2>
            <h2 className="font-serif text-[clamp(2.75rem,7.5vw,7.5rem)] leading-[0.92] uppercase font-normal text-[#F5F4F0] tracking-tight">
              MEMORABLE.
            </h2>
          </div>

          <p className="text-base sm:text-lg text-[#D4D4D8] font-light max-w-xl leading-relaxed">
            Have a project, event or story worth capturing? Let's talk about how we can collaborate to create timeless visual assets.
          </p>

          <div className="pt-4">
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

        {/* Right Column: Contact Details & Social Links */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-12 border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0 lg:pl-12">
          <div className="space-y-4">
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

          <div className="space-y-4">
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

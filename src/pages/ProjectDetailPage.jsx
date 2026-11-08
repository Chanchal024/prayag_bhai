import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Camera, Calendar, MapPin, User } from 'lucide-react';
import { projects } from '../data/projects';
import { ImageLightbox } from '../components/ImageLightbox';
import { ContactCTA } from '../components/ContactCTA';
import { useCursor } from '../context/CursorContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  isReducedMotion,
  WordReveal,
  animateWordReveal,
  scrollClipReveal,
} from '../utils/scrollAnimations';

gsap.registerPlugin(ScrollTrigger);

export const ProjectDetailPage = () => {
  const { slug } = useParams();
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const { setCursor, resetCursor } = useCursor();

  const pageRef = useRef(null);
  const headerRef = useRef(null);
  const titleBoxRef = useRef(null);
  const specsRef = useRef(null);
  const heroImgBoxRef = useRef(null);
  const heroImgRef = useRef(null);
  const storyRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const project = projects[currentIndex] || projects[0];

  useEffect(() => {
    if (isReducedMotion() || !project) return;

    const ctx = gsap.context(() => {
      // 1. Typography Reveal: Large title word-by-word
      if (titleBoxRef.current) {
        animateWordReveal(titleBoxRef.current, {
          duration: 0.95,
          stagger: 0.08,
          ease: 'power3.out',
        });
      }

      // 2. Staggered Content: Metadata Specs row stagger
      if (specsRef.current) {
        gsap.fromTo(
          specsRef.current.children,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
            delay: 0.2,
            ease: 'power3.out',
          }
        );
      }

      // 3. Image Reveal: Full hero image uncovers with clipping-mask transition
      if (heroImgBoxRef.current) {
        scrollClipReveal(heroImgBoxRef.current, heroImgRef.current, {
          trigger: heroImgBoxRef.current,
          start: 'top 85%',
          duration: 1.15,
          ease: 'power3.out',
          scaleFrom: 1.12,
          direction: 'bottom',
        });
      }

      // 4. Staggered Content: Story & Description bidirectional reveal
      if (storyRef.current) {
        gsap.fromTo(
          storyRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: storyRef.current,
              start: 'top 85%',
              end: 'bottom top',
              toggleActions: 'play reverse play reverse',
              invalidateOnRefresh: true,
            },
          }
        );
      }

      // 5. Image Reveal: Gallery items each uncover with clipping-mask transition
      const galleryItems = document.querySelectorAll('.detail-gallery-item');
      galleryItems.forEach((item) => {
        const innerImg = item.querySelector('img');
        scrollClipReveal(item, innerImg, {
          trigger: item,
          start: 'top 85%',
          duration: 1.1,
          ease: 'power3.out',
          scaleFrom: 1.12,
          direction: 'bottom',
        });
      });

      // 6. Staggered Content: Next / Prev navigation reveal
      if (navRef.current) {
        gsap.fromTo(
          navRef.current.children,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: navRef.current,
              start: 'top 90%',
              end: 'bottom top',
              toggleActions: 'play reverse play reverse',
              invalidateOnRefresh: true,
            },
          }
        );
      }
    }, pageRef);

    return () => ctx.revert();
  }, [project, slug]);

  if (!project) {
    return (
      <main className="pt-32 pb-20 md:pt-40 max-w-7xl mx-auto px-6 md:px-12 text-center">
        <Link
          to="/work"
          className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#A1A1AA] hover:text-[#ea580c] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#ea580c]" />
          <span>BACK TO ALL ALBUMS</span>
        </Link>
        <p className="mt-12 text-base text-[#A1A1AA]">No project found.</p>
      </main>
    );
  }

  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <main ref={pageRef} className="pt-32 pb-20 md:pt-40">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8">
        <Link
          to="/work"
          onMouseEnter={() => setCursor('hover')}
          onMouseLeave={resetCursor}
          className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#A1A1AA] hover:text-[#ea580c] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#ea580c]" />
          <span>BACK TO ALL ALBUMS</span>
        </Link>
      </div>

      {/* Hero Header Meta */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <div ref={headerRef} className="flex flex-col space-y-4 max-w-4xl">
          <div className="flex items-center space-x-4 text-xs uppercase tracking-[0.3em] font-semibold text-[#A1A1AA] transform-gpu will-change-transform">
            <span className="text-[#ea580c]">{project.category}</span>
            <span>•</span>
            <span>{project.year}</span>
          </div>

          <div ref={titleBoxRef}>
            <WordReveal
              text={project.title}
              as="h1"
              className="font-serif text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.95] font-normal text-[#F5F4F0] uppercase tracking-tight transform-gpu will-change-transform block"
            />
          </div>

          <p className="text-lg md:text-xl text-[#A1A1AA] font-light leading-relaxed pt-2 transform-gpu will-change-transform">
            {project.subtitle}
          </p>
        </div>

        {/* Project Metadata Specs Row */}
        <div
          ref={specsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 mt-10 border-t border-white/10"
        >
          <div className="flex flex-col space-y-1 transform-gpu will-change-transform">
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#A1A1AA]">LOCATION</span>
            <span className="text-xs font-medium text-[#F5F4F0] flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-[#ea580c]" />
              <span>{project.location}</span>
            </span>
          </div>
          <div className="flex flex-col space-y-1 transform-gpu will-change-transform">
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#A1A1AA]">CLIENT</span>
            <span className="text-xs font-medium text-[#F5F4F0] flex items-center space-x-1">
              <User className="w-3.5 h-3.5 text-[#ea580c]" />
              <span>{project.client}</span>
            </span>
          </div>
          <div className="flex flex-col space-y-1 transform-gpu will-change-transform">
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#A1A1AA]">EQUIPMENT</span>
            <span className="text-xs font-medium text-[#F5F4F0] flex items-center space-x-1 truncate">
              <Camera className="w-3.5 h-3.5 shrink-0 text-[#ea580c]" />
              <span className="truncate">{project.details?.equipment}</span>
            </span>
          </div>
          <div className="flex flex-col space-y-1 transform-gpu will-change-transform">
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#A1A1AA]">YEAR</span>
            <span className="text-xs font-medium text-[#F5F4F0] flex items-center space-x-1">
              <Calendar className="w-3.5 h-3.5 text-[#ea580c]" />
              <span>{project.year}</span>
            </span>
          </div>
        </div>
      </section>

      {/* Main Full Hero Image */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-24">
        <div
          ref={heroImgBoxRef}
          onClick={() => setLightboxIndex(0)}
          onMouseEnter={() => setCursor('view', 'VIEW')}
          onMouseLeave={resetCursor}
          className="w-full aspect-[16/9] overflow-hidden rounded-xs bg-[#141414] cursor-pointer relative group border border-white/10 transform-gpu will-change-transform"
          style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        >
          <img
            ref={heroImgRef}
            src={project.heroImage}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 transform-gpu will-change-transform"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute bottom-6 right-6 bg-[#060606]/85 backdrop-blur-md px-4 py-2 border border-white/20 text-[10px] uppercase tracking-[0.2em] text-[#F5F4F0]">
            CLICK TO EXPAND
          </div>
        </div>
      </section>

      {/* Story & Description Paragraph */}
      <section ref={storyRef} className="max-w-4xl mx-auto px-6 mb-28">
        <div className="space-y-6">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#ea580c] transform-gpu will-change-transform block">
            THE CURATORIAL STORY
          </span>
          <p className="font-serif text-2xl sm:text-3xl text-[#F5F4F0] font-normal leading-relaxed transform-gpu will-change-transform">
            {project.description}
          </p>
        </div>
      </section>

      {/* Dynamic Editorial Photo Breakdown Layout */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-16 md:space-y-24 mb-32">
        {project.gallery && project.gallery.map((img, idx) => {
          const isFull = img.layout === 'full';

          return (
            <div
              key={idx}
              onClick={() => setLightboxIndex(idx)}
              onMouseEnter={() => setCursor('view', 'VIEW')}
              onMouseLeave={resetCursor}
              className={`detail-gallery-item w-full overflow-hidden rounded-xs bg-[#141414] cursor-pointer relative group border border-white/10 transform-gpu will-change-transform ${
                isFull ? 'aspect-[16/10]' : 'aspect-[4/3]'
              }`}
              style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            >
              <img
                src={img.url}
                alt={img.caption || project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

              {img.caption && (
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end text-[#F5F4F0] drop-shadow-md">
                  <span className="text-xs uppercase tracking-[0.2em] bg-[#060606]/85 backdrop-blur-md px-3 py-1.5 rounded-xs border border-white/20">
                    {img.caption}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* Next / Previous Project Footer Navigation */}
      <section ref={navRef} className="max-w-7xl mx-auto px-6 md:px-12 py-16 border-t border-b border-white/10 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link
            to={`/work/${prevProject.slug}`}
            onMouseEnter={() => setCursor('hover')}
            onMouseLeave={resetCursor}
            className="group flex flex-col space-y-2 p-6 border border-white/10 rounded-xs hover:border-[#ea580c] hover:bg-white/5 transition-colors duration-300 transform-gpu will-change-transform"
          >
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#A1A1AA] group-hover:text-[#ea580c] flex items-center space-x-2">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>PREVIOUS ALBUM</span>
            </span>
            <span className="font-serif text-2xl font-normal tracking-tight text-[#F5F4F0]">
              {prevProject.title}
            </span>
          </Link>

          <Link
            to={`/work/${nextProject.slug}`}
            onMouseEnter={() => setCursor('hover')}
            onMouseLeave={resetCursor}
            className="group flex flex-col space-y-2 p-6 border border-white/10 rounded-xs hover:border-[#ea580c] hover:bg-white/5 transition-colors duration-300 text-left md:text-right transform-gpu will-change-transform"
          >
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#A1A1AA] group-hover:text-[#ea580c] flex items-center justify-end space-x-2">
              <span>NEXT ALBUM</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
            <span className="font-serif text-2xl font-normal tracking-tight text-[#F5F4F0]">
              {nextProject.title}
            </span>
          </Link>
        </div>
      </section>

      {/* Lightbox Modal */}
      {project.gallery && (
        <ImageLightbox
          images={project.gallery}
          activeIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() =>
            setLightboxIndex((prev) =>
              prev === 0 ? project.gallery.length - 1 : prev - 1
            )
          }
          onNext={() =>
            setLightboxIndex((prev) => (prev + 1) % project.gallery.length)
          }
        />
      )}

      <ContactCTA />
    </main>
  );
};

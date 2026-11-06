import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Camera, Calendar, MapPin, User } from 'lucide-react';
import { projects } from '../data/projects';
import { ImageLightbox } from '../components/ImageLightbox';
import { ContactCTA } from '../components/ContactCTA';
import { useCursor } from '../context/CursorContext';

export const ProjectDetailPage = () => {
  const { slug } = useParams();
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const project = projects[currentIndex] || projects[0];

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
    <main className="pt-32 pb-20 md:pt-40">
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
        <div className="flex flex-col space-y-4 max-w-4xl">
          <div className="flex items-center space-x-4 text-xs uppercase tracking-[0.3em] font-semibold text-[#A1A1AA]">
            <span className="text-[#ea580c]">{project.category}</span>
            <span>•</span>
            <span>{project.year}</span>
          </div>

          <h1 className="font-serif text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.95] font-normal text-[#F5F4F0] uppercase tracking-tight">
            {project.title}
          </h1>

          <p className="text-lg md:text-xl text-[#A1A1AA] font-light leading-relaxed pt-2">
            {project.subtitle}
          </p>
        </div>

        {/* Project Metadata Specs Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 mt-10 border-t border-white/10">
          <div className="flex flex-col space-y-1">
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#A1A1AA]">LOCATION</span>
            <span className="text-xs font-medium text-[#F5F4F0] flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-[#ea580c]" />
              <span>{project.location}</span>
            </span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#A1A1AA]">CLIENT</span>
            <span className="text-xs font-medium text-[#F5F4F0] flex items-center space-x-1">
              <User className="w-3.5 h-3.5 text-[#ea580c]" />
              <span>{project.client}</span>
            </span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#A1A1AA]">EQUIPMENT</span>
            <span className="text-xs font-medium text-[#F5F4F0] flex items-center space-x-1 truncate">
              <Camera className="w-3.5 h-3.5 shrink-0 text-[#ea580c]" />
              <span className="truncate">{project.details?.equipment}</span>
            </span>
          </div>
          <div className="flex flex-col space-y-1">
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
          onClick={() => setLightboxIndex(0)}
          onMouseEnter={() => setCursor('view', 'VIEW')}
          onMouseLeave={resetCursor}
          className="w-full aspect-[16/9] overflow-hidden rounded-xs bg-[#141414] cursor-pointer relative group border border-white/10"
        >
          <img
            src={project.heroImage}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute bottom-6 right-6 bg-[#060606]/85 backdrop-blur-md px-4 py-2 border border-white/20 text-[10px] uppercase tracking-[0.2em] text-[#F5F4F0]">
            CLICK TO EXPAND
          </div>
        </div>
      </section>

      {/* Story & Description Paragraph */}
      <section className="max-w-4xl mx-auto px-6 mb-28">
        <div className="space-y-6">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#ea580c]">THE CURATORIAL STORY</span>
          <p className="font-serif text-2xl sm:text-3xl text-[#F5F4F0] font-normal leading-relaxed">
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
              className={`w-full overflow-hidden rounded-xs bg-[#141414] cursor-pointer relative group border border-white/10 ${
                isFull ? 'aspect-[16/10]' : 'aspect-[4/3]'
              }`}
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
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 border-t border-b border-white/10 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link
            to={`/work/${prevProject.slug}`}
            onMouseEnter={() => setCursor('hover')}
            onMouseLeave={resetCursor}
            className="group flex flex-col space-y-2 p-6 border border-white/10 rounded-xs hover:border-[#ea580c] hover:bg-white/5 transition-colors duration-300"
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
            className="group flex flex-col space-y-2 p-6 border border-white/10 rounded-xs hover:border-[#ea580c] hover:bg-white/5 transition-colors duration-300 text-left md:text-right"
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

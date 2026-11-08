import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Play, X, Loader2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCursor } from '../context/CursorContext';
import { OptimizedVideo } from './OptimizedVideo';
import { isReducedMotion, scrollClipReveal } from '../utils/scrollAnimations';

gsap.registerPlugin(ScrollTrigger);

/* ── Video Lightbox Modal ── */
const VideoLightbox = ({ videoSrc, posterSrc, onClose }) => {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const { setCursor, resetCursor } = useCursor();

  const handleClose = React.useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    gsap.to(contentRef.current, { scale: 0.94, opacity: 0, duration: 0.25, ease: 'power2.in' });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      delay: 0.05,
      onComplete: onClose,
    });
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // GSAP Modal Animations
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' });
    gsap.fromTo(contentRef.current, { scale: 0.94, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: 'power3.out', delay: 0.05 });

    // Attempt autoplay once mounted
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay with sound might need user interaction, fall back gracefully
      });
    }

    const handleKey = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleClose]);

  const safeSrc = encodeURI(videoSrc);

  return (
    <div
      ref={overlayRef}
      onClick={handleClose}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 md:p-8"
      style={{ opacity: 0 }}
    >
      {/* Close button */}
      <button
        onClick={(e) => { e.stopPropagation(); handleClose(); }}
        onMouseEnter={() => setCursor('hover')}
        onMouseLeave={resetCursor}
        className="absolute top-6 right-6 md:top-8 md:right-8 z-20 p-3 rounded-full border border-white/20 text-[#F5F4F0] hover:text-white hover:border-white/60 hover:bg-white/10 transition-all duration-300 flex items-center space-x-2 cursor-pointer shadow-lg"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold">CLOSE</span>
        <X className="w-4 h-4" />
      </button>

      {/* Video Box Container */}
      <div
        ref={contentRef}
        onClick={(e) => e.stopPropagation()}
        className="relative flex items-center justify-center max-w-4xl max-h-[88vh] w-auto h-auto rounded-xl overflow-hidden shadow-2xl bg-black border border-white/10"
        style={{ opacity: 0 }}
      >
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-10 space-y-3">
            <Loader2 className="w-8 h-8 text-[#ea580c] animate-spin" />
            <span className="text-xs uppercase tracking-widest text-[#A1A1AA]">Loading video...</span>
          </div>
        )}

        <video
          ref={videoRef}
          src={safeSrc}
          poster={posterSrc}
          autoPlay
          controls
          playsInline
          preload="auto"
          onCanPlay={() => setIsLoading(false)}
          onWaiting={() => setIsLoading(true)}
          onPlaying={() => setIsLoading(false)}
          className="max-w-full max-h-[85vh] object-contain rounded-xl"
        />
      </div>
    </div>
  );
};

/* ── Project Card ── */
export const ProjectCard = React.memo(({ project, index }) => {
  const cardRef = useRef(null);
  const mediaBoxRef = useRef(null);
  const imgRef = useRef(null);
  const [showVideo, setShowVideo] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { setCursor, resetCursor } = useCursor();

  const isVideo = !!project.videoSrc;
  const previewSrc = project.previewSrc || (isVideo ? `/previews/${project.id}.mp4` : null);
  const posterSrc = project.posterSrc || `/thumbnails/${project.id}.webp`;

  useEffect(() => {
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Staggered card entrance: subtle upward movement
      gsap.fromTo(
        cardRef.current,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 88%',
            end: 'bottom top',
            toggleActions: 'play reverse play reverse',
            invalidateOnRefresh: true,
          },
        }
      );

      // 2. Image / Video Reveal: Uncovers smoothly using clipping-mask transition
      if (mediaBoxRef.current) {
        scrollClipReveal(mediaBoxRef.current, imgRef.current, {
          trigger: cardRef.current,
          start: 'top 88%',
          duration: 1.1,
          ease: 'power3.out',
          scaleFrom: 1.12,
          direction: 'bottom',
        });
      }
    }, cardRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => {
    setCursor('view', '▶ PLAY');
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    resetCursor();
    setIsHovered(false);
  };

  return (
    <>
      <div
        ref={cardRef}
        className={`group relative flex flex-col transform-gpu will-change-transform ${project.gridSpan || 'col-span-12'}`}
      >
        {isVideo ? (
          /* ── Video Card: clean, responsive preview, play button overlay ── */
          <div
            onClick={() => setShowVideo(true)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="block relative w-full overflow-hidden bg-[#0c0c0c] rounded-lg cursor-pointer border border-white/5 hover:border-white/20 transition-colors duration-500 shadow-lg"
          >
            <div
              ref={isVideo ? mediaBoxRef : null}
              className={`w-full ${project.coverAspect || 'aspect-[9/16]'} overflow-hidden relative bg-[#0c0c0c] transform-gpu will-change-transform`}
              style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            >
              <OptimizedVideo
                previewSrc={previewSrc}
                posterSrc={posterSrc}
                aspectRatio={project.coverAspect || 'aspect-[9/16]'}
                isHovered={isHovered && !showVideo}
                title={project.title}
              />

              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Centered glassmorphic play button on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400 pointer-events-none">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center scale-90 group-hover:scale-100 transition-transform duration-400 shadow-xl">
                  <Play className="w-6 h-6 md:w-7 md:h-7 text-white ml-1" fill="white" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ── Image Card: original layout & detail page link ── */
          <>
            <Link
              to={`/work/${project.slug}`}
              onMouseEnter={() => setCursor('view', 'VIEW')}
              onMouseLeave={resetCursor}
              className="block relative w-full overflow-hidden bg-[#D8D7D2] rounded-xs cursor-pointer"
            >
              <div
                ref={!isVideo ? mediaBoxRef : null}
                className={`w-full ${project.coverAspect || 'aspect-[16/10]'} overflow-hidden relative transform-gpu will-change-transform`}
                style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
              >
                <img
                  ref={imgRef}
                  src={project.heroImage}
                  alt={project.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-500" />

                <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#F5F4F0] text-[#111111] flex items-center justify-between px-3 shadow-md opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <span className="text-[10px] font-mono font-semibold">{`0${index + 1}`}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </Link>

            {/* Project Metadata */}
            <div className="pt-5 flex items-start justify-between border-b border-white/10 pb-6 transition-transform duration-300 group-hover:-translate-y-1">
              <div className="flex flex-col space-y-1">
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#ea580c] font-semibold">
                  {project.category}
                </span>
                <Link
                  to={`/work/${project.slug}`}
                  onMouseEnter={() => setCursor('hover')}
                  onMouseLeave={resetCursor}
                  className="font-serif text-2xl sm:text-3xl font-normal text-[#F5F4F0] group-hover:text-[#ea580c] group-hover:underline tracking-tight transition-colors"
                >
                  {project.title}
                </Link>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono text-[#A1A1AA] font-medium tracking-widest">
                  {project.year}
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Video Lightbox Modal */}
      {showVideo && (
        <VideoLightbox
          videoSrc={project.videoSrc}
          posterSrc={posterSrc}
          onClose={() => setShowVideo(false)}
        />
      )}
    </>
  );
});

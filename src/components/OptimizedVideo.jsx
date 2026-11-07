import React, { useRef, useState, useEffect, useCallback } from 'react';

// Global coordinator ensuring only ONE video plays at any given moment
let currentActiveVideo = null;

const playExclusive = (videoEl) => {
  if (currentActiveVideo && currentActiveVideo !== videoEl) {
    try {
      currentActiveVideo.pause();
    } catch {
      // Ignore pause failures on already stopped elements
    }
  }
  currentActiveVideo = videoEl;
};

const releaseExclusive = (videoEl) => {
  if (currentActiveVideo === videoEl) {
    currentActiveVideo = null;
  }
};

/**
 * OptimizedVideo - High-performance, memory-safe, lazy-loaded video player
 * with instant WebP poster preview, single-stream coordinator, and graceful fallbacks.
 */
export const OptimizedVideo = React.memo(({
  previewSrc,
  posterSrc,
  aspectRatio = 'aspect-[9/16]',
  isHovered = false,
  title = '',
  className = '',
  rootMargin = '150px',
}) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  const [isInView, setIsInView] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  // 1. Intersection Observer: Attach video ONLY when near viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          } else {
            setIsInView(false);
            const video = videoRef.current;
            if (video) {
              video.pause();
              releaseExclusive(video);
            }
          }
        });
      },
      { threshold: 0.05, rootMargin }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin]);

  // 2. Playback controlled exclusively by hover state
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isInView) return;

    if (isHovered && !hasError) {
      playExclusive(video);
      video.play().catch(() => {
        // Autoplay policy or buffering fallback
      });
    } else {
      video.pause();
      releaseExclusive(video);
    }
  }, [isHovered, isInView, hasError]);

  // 3. Unmount cleanup: Prevent memory leaks and detached media elements
  useEffect(() => {
    return () => {
      if (currentActiveVideo) {
        try {
          currentActiveVideo.pause();
        } catch {
          // Ignore
        }
        currentActiveVideo = null;
      }
    };
  }, []);

  const handlePlaying = useCallback(() => {
    setIsVideoReady(true);
    setIsPlaying(true);
  }, []);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsPlaying(false);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${aspectRatio} overflow-hidden bg-[#0c0c0c] ${className}`}
    >
      {/* 1. Instant Lightweight WebP Poster (Zero blank screen, perfect aspect ratio) */}
      <img
        src={posterSrc}
        alt={title}
        loading="lazy"
        decoding="async"
        className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 ${
          isVideoReady && isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      />

      {/* 2. Video Preview Stream (Mounted ONLY when in view and no error) */}
      {isInView && !hasError && previewSrc && (
        <video
          ref={videoRef}
          src={previewSrc}
          poster={posterSrc}
          muted
          loop
          playsInline
          preload="none"
          onCanPlay={() => setIsVideoReady(true)}
          onPlaying={handlePlaying}
          onPause={handlePause}
          onError={handleError}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ease-out group-hover:scale-105 ${
            isVideoReady && isPlaying ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* 3. Subtle orange buffer indicator when hovered but waiting for first frame */}
      {isHovered && !isVideoReady && !hasError && (
        <div className="absolute top-3 right-3 z-10 pointer-events-none">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ea580c] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ea580c]" />
          </span>
        </div>
      )}
    </div>
  );
});

OptimizedVideo.displayName = 'OptimizedVideo';

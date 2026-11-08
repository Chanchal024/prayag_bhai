import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const isReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Standard bidirectional ScrollTrigger toggleActions:
 * - onEnter: play (animates in when scrolling DOWN into viewport)
 * - onLeave: reverse (resets when completely past top of viewport)
 * - onEnterBack: play (animates in when scrolling UP into viewport)
 * - onLeaveBack: reverse (resets when scrolled back below viewport)
 */
export const defaultToggleActions = 'play reverse play reverse';

/**
 * 1. TYPOGRAPHY REVEAL COMPONENT (Word by Word)
 * Wraps each word in an overflow-hidden mask container.
 * Words reveal sequentially with subtle upward movement.
 */
export const WordReveal = ({
  text,
  className = '',
  wordClassName = '',
  as: Component = 'span',
  ...rest
}) => {
  const words = typeof text === 'string' ? text.split(/\s+/) : [];

  return React.createElement(
    Component,
    { className, ...rest },
    words.map((word, i) =>
      React.createElement(
        'span',
        {
          key: i,
          className: 'inline-block overflow-hidden mr-[0.24em] last:mr-0 align-top',
        },
        React.createElement(
          'span',
          {
            className: `reveal-word inline-block transform-gpu will-change-transform ${wordClassName}`,
          },
          word
        )
      )
    )
  );
};

/**
 * Animate Word-by-Word Typography Reveal with ScrollTrigger
 */
export const animateWordReveal = (container, options = {}) => {
  if (!container) return null;
  const words = container.querySelectorAll('.reveal-word');
  if (!words || words.length === 0) return null;

  if (isReducedMotion()) {
    gsap.set(words, { yPercent: 0, opacity: 1 });
    return null;
  }

  const {
    trigger = container,
    start = 'top 85%',
    end = 'bottom top',
    toggleActions = defaultToggleActions,
    duration = 0.85,
    stagger = 0.05,
    yPercent = 105,
    ease = 'power3.out',
    delay = 0,
  } = options;

  return gsap.fromTo(
    words,
    { yPercent, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration,
      stagger,
      ease,
      delay,
      scrollTrigger: {
        trigger,
        start,
        end,
        toggleActions,
        invalidateOnRefresh: true,
      },
    }
  );
};

/**
 * 2. IMAGE REVEAL (Clipping-Mask Transition)
 * Smoothly uncovers the image container using a CSS clipping mask (curtain wipe),
 * paired with a subtle scale decompression on the inner media.
 */
export const scrollClipReveal = (container, innerImg, options = {}) => {
  if (!container) return null;

  if (isReducedMotion()) {
    gsap.set(container, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 });
    if (innerImg) gsap.set(innerImg, { scale: 1 });
    return null;
  }

  const {
    trigger = container,
    start = 'top 85%',
    end = 'bottom top',
    toggleActions = defaultToggleActions,
    duration = 1.1,
    ease = 'power3.out',
    scaleFrom = 1.14,
    direction = 'bottom', // 'bottom' unmasks downward, 'top' unmasks upward
  } = options;

  const initialClip =
    direction === 'bottom'
      ? 'inset(0% 0% 100% 0%)'
      : 'inset(100% 0% 0% 0%)';

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start,
      end,
      toggleActions,
      invalidateOnRefresh: true,
    },
  });

  tl.fromTo(
    container,
    { clipPath: initialClip, opacity: 0.85 },
    { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration, ease },
    0
  );

  if (innerImg) {
    tl.fromTo(
      innerImg,
      { scale: scaleFrom },
      { scale: 1, duration: duration * 1.15, ease: 'power2.out' },
      0
    );
  }

  return tl;
};

/**
 * 3. STAGGERED CONTENT (Sequential Fade & Slide Up)
 * Cards and paragraphs enter sequentially rather than appearing all at once.
 */
export const scrollFadeInUp = (targets, options = {}) => {
  if (!targets) return null;
  if (isReducedMotion()) {
    gsap.set(targets, { opacity: 1, y: 0 });
    return null;
  }

  const {
    trigger = targets,
    start = 'top 88%',
    end = 'bottom top',
    toggleActions = defaultToggleActions,
    duration = 0.9,
    y = 30,
    stagger = 0.1,
    ease = 'power3.out',
    delay = 0,
  } = options;

  return gsap.fromTo(
    targets,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease,
      delay,
      scrollTrigger: {
        trigger,
        start,
        end,
        toggleActions,
        invalidateOnRefresh: true,
      },
    }
  );
};

/**
 * Smooth Scale In with bidirectional ScrollTrigger
 */
export const scrollScaleIn = (targets, options = {}) => {
  if (!targets) return null;
  if (isReducedMotion()) {
    gsap.set(targets, { opacity: 1, scale: 1 });
    return null;
  }

  const {
    trigger = targets,
    start = 'top 88%',
    end = 'bottom top',
    toggleActions = defaultToggleActions,
    duration = 1.0,
    scale = 0.95,
    ease = 'power3.out',
    delay = 0,
  } = options;

  return gsap.fromTo(
    targets,
    { opacity: 0, scale },
    {
      opacity: 1,
      scale: 1,
      duration,
      ease,
      delay,
      scrollTrigger: {
        trigger,
        start,
        end,
        toggleActions,
        invalidateOnRefresh: true,
      },
    }
  );
};

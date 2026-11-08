import React, { useEffect, useRef } from 'react';

/**
 * HeroPortraitEffect
 * 
 * Interactive cinematic image reveal:
 * - Base state: hero1 (monochrome subject with white halo)
 * - Hover / mouse movement: organic orange smoke reveal of hero2 (golden halo & warm rim lighting)
 * - Cursor-driven dynamic smoke puffs + rising golden embers + ambient back-glow
 * - Smooth transition back to monochrome when mouse leaves
 * - Responsive, GPU-accelerated canvas with automatic viewport pause & reduced-motion check
 */

class SmokePuff {
  constructor(x, y, vx, vy, baseRadius) {
    this.x = x;
    this.y = y;
    this.vx = vx * 0.4 + (Math.random() - 0.5) * 0.4;
    this.vy = vy * 0.4 - Math.random() * 0.6 - 0.2;
    this.radius = baseRadius * (0.6 + Math.random() * 0.5);
    this.maxRadius = this.radius * (1.6 + Math.random() * 0.6);
    this.life = 1.0;
    this.decay = 0.012 + Math.random() * 0.01;
    this.growth = (this.maxRadius - this.radius) * 0.03;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.radius = Math.min(this.maxRadius, this.radius + this.growth);
    this.life -= this.decay;
    this.vx *= 0.98;
    this.vy *= 0.98;
  }
}

class Ember {
  constructor(x, y) {
    this.reset(x, y);
  }

  reset(x, y) {
    this.x = x + (Math.random() - 0.5) * 140;
    this.y = y + (Math.random() - 0.5) * 80;
    this.vx = (Math.random() - 0.5) * 0.8;
    this.vy = -(Math.random() * 1.4 + 0.6);
    this.size = Math.random() * 2.5 + 1.0;
    this.life = 1.0;
    this.decay = Math.random() * 0.015 + 0.008;
    this.wobbleSpeed = Math.random() * 0.08 + 0.04;
    this.wobbleAmp = Math.random() * 1.5 + 0.5;
    this.wobbleSeed = Math.random() * Math.PI * 2;
    this.colorType = Math.random();
  }

  update() {
    this.wobbleSeed += this.wobbleSpeed;
    this.x += this.vx + Math.sin(this.wobbleSeed) * this.wobbleAmp * 0.3;
    this.y += this.vy;
    this.life -= this.decay;
  }

  draw(ctx) {
    if (this.life <= 0) return;
    const alpha = Math.max(0, this.life);
    const r = this.size * (0.6 + this.life * 0.4);

    const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, r * 2.5);
    if (this.colorType > 0.5) {
      grad.addColorStop(0, `rgba(255, 200, 100, ${alpha * 0.95})`);
      grad.addColorStop(0.4, `rgba(234, 88, 12, ${alpha * 0.6})`);
      grad.addColorStop(1, 'rgba(234, 88, 12, 0)');
    } else {
      grad.addColorStop(0, `rgba(255, 230, 160, ${alpha})`);
      grad.addColorStop(0.4, `rgba(251, 146, 60, ${alpha * 0.7})`);
      grad.addColorStop(1, 'rgba(251, 146, 60, 0)');
    }

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(this.x, this.y, r * 2.5, 0, Math.PI * 2);
    ctx.fill();
  }
}

export const HeroPortraitEffect = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Offscreen mask canvas for destination-in compositing
    const maskCanvas = document.createElement('canvas');
    const maskCtx = maskCanvas.getContext('2d');

    // State
    const state = {
      w: 0,
      h: 0,
      dpr: 1,
      drawX: 0,
      drawY: 0,
      drawW: 0,
      drawH: 0,
      // Target mouse
      targetX: 0,
      targetY: 0,
      // Smooth mouse
      mouseX: 0,
      mouseY: 0,
      prevMouseX: 0,
      prevMouseY: 0,
      isHovered: false,
      revealAmount: 0, // 0 to 1
      haloInfluence: 0,
      // Smoke puffs & embers
      smokePuffs: [],
      embers: [],
      // Loop control
      animId: null,
      isVisible: true,
      isTabActive: !document.hidden,
      isTouch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
      pulseTime: 0,
    };

    // Load images
    const img1 = new Image();
    const img2 = new Image();
    let loadedCount = 0;

    const onImageLoaded = () => {
      loadedCount++;
      if (loadedCount === 2) {
        handleResize();
        // Initialize mouse in center
        state.targetX = state.w * 0.5;
        state.targetY = state.h * 0.5;
        state.mouseX = state.targetX;
        state.mouseY = state.targetY;
        state.prevMouseX = state.mouseX;
        state.prevMouseY = state.mouseY;
      }
    };

    img1.crossOrigin = 'anonymous';
    img2.crossOrigin = 'anonymous';

    // Prefer webp with png fallback
    img1.onerror = () => { img1.src = '/hero1.png'; };
    img2.onerror = () => { img2.src = '/hero2.png'; };

    img1.onload = onImageLoaded;
    img2.onload = onImageLoaded;

    img1.src = '/hero1.webp';
    img2.src = '/hero2.webp';

    // Resize handler
    const handleResize = () => {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      state.w = rect.width;
      state.h = rect.height;
      state.dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(state.w * state.dpr);
      canvas.height = Math.floor(state.h * state.dpr);
      canvas.style.width = `${state.w}px`;
      canvas.style.height = `${state.h}px`;

      maskCanvas.width = canvas.width;
      maskCanvas.height = canvas.height;

      // Maintain aspect ratio (1086 / 1448) with contain-fit bottom aligned
      const naturalW = img1.naturalWidth || 1086;
      const naturalH = img1.naturalHeight || 1448;
      const aspect = naturalW / naturalH;

      let drawW = state.w;
      let drawH = drawW / aspect;

      if (drawH > state.h) {
        drawH = state.h;
        drawW = drawH * aspect;
      }

      state.drawW = drawW;
      state.drawH = drawH;
      state.drawX = (state.w - drawW) / 2;
      state.drawY = state.h - drawH; // bottom align subject
    };

    window.addEventListener('resize', handleResize);

    // Mouse Tracking
    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      state.targetX = e.clientX - rect.left;
      state.targetY = e.clientY - rect.top;
      state.isHovered = true;
    };

    const onMouseEnter = (e) => {
      const rect = container.getBoundingClientRect();
      state.targetX = e.clientX - rect.left;
      state.targetY = e.clientY - rect.top;
      state.isHovered = true;
    };

    const onMouseLeave = () => {
      state.isHovered = false;
    };

    // Touch Support
    const onTouchStart = (e) => {
      if (!e.touches[0]) return;
      const rect = container.getBoundingClientRect();
      state.targetX = e.touches[0].clientX - rect.left;
      state.targetY = e.touches[0].clientY - rect.top;
      state.isHovered = true;
    };

    const onTouchMove = (e) => {
      if (!e.touches[0]) return;
      const rect = container.getBoundingClientRect();
      state.targetX = e.touches[0].clientX - rect.left;
      state.targetY = e.touches[0].clientY - rect.top;
      state.isHovered = true;
    };

    const onTouchEnd = () => {
      state.isHovered = false;
    };

    container.addEventListener('mousemove', onMouseMove, { passive: true });
    container.addEventListener('mouseenter', onMouseEnter, { passive: true });
    container.addEventListener('mouseleave', onMouseLeave, { passive: true });
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: true });
    container.addEventListener('touchend', onTouchEnd, { passive: true });

    // Viewport IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          state.isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const onVisibilityChange = () => {
      state.isTabActive = !document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    // Main Animation Loop
    const render = () => {
      state.animId = requestAnimationFrame(render);

      if (!state.isVisible || !state.isTabActive || loadedCount < 2) return;

      const { w, h, dpr, drawX, drawY, drawW, drawH } = state;
      if (w === 0 || h === 0) return;

      // Smooth mouse interpolation
      const lerp = 0.12;
      state.prevMouseX = state.mouseX;
      state.prevMouseY = state.mouseY;
      state.mouseX += (state.targetX - state.mouseX) * lerp;
      state.mouseY += (state.targetY - state.mouseY) * lerp;

      const mouseDx = state.mouseX - state.prevMouseX;
      const mouseDy = state.mouseY - state.prevMouseY;
      const mouseSpeed = Math.hypot(mouseDx, mouseDy);

      // Smooth reveal target
      let targetReveal = state.isHovered ? 1.0 : 0.0;

      // On mobile / touch, provide gentle atmospheric ambient pulse if not actively interacting
      if (state.isTouch && !state.isHovered) {
        state.pulseTime += 0.02;
        targetReveal = 0.28 + Math.sin(state.pulseTime) * 0.18;
        state.mouseX = drawX + drawW * 0.5 + Math.sin(state.pulseTime * 0.7) * drawW * 0.15;
        state.mouseY = drawY + drawH * 0.25 + Math.cos(state.pulseTime * 0.5) * drawH * 0.08;
      }

      state.revealAmount += (targetReveal - state.revealAmount) * (state.isHovered ? 0.08 : 0.04);

      // Check proximity to upper halo
      const haloCenterX = drawX + drawW * 0.55;
      const haloCenterY = drawY + drawH * 0.12;
      const distToHalo = Math.hypot(state.mouseX - haloCenterX, state.mouseY - haloCenterY);
      const targetHaloInfluence = Math.max(0, 1 - distToHalo / (drawW * 0.45));
      state.haloInfluence += (targetHaloInfluence - state.haloInfluence) * 0.1;

      // Spawn smoke puffs when hovering and moving
      if (state.isHovered && state.revealAmount > 0.08 && mouseSpeed > 1.2 && state.smokePuffs.length < 32) {
        const puffRadius = 55 + Math.min(60, mouseSpeed * 2.5);
        state.smokePuffs.push(new SmokePuff(state.mouseX, state.mouseY, mouseDx, mouseDy, puffRadius));
      }

      // Spawn embers around reveal center and halo
      if (state.revealAmount > 0.15 && state.embers.length < 28 && Math.random() < 0.35) {
        // Either near mouse or near halo
        const spawnX = Math.random() < 0.4 ? haloCenterX : state.mouseX;
        const spawnY = Math.random() < 0.4 ? haloCenterY : state.mouseY;
        state.embers.push(new Ember(spawnX, spawnY));
      }

      // Update smoke puffs
      for (let i = state.smokePuffs.length - 1; i >= 0; i--) {
        const puff = state.smokePuffs[i];
        puff.update();
        if (puff.life <= 0) {
          state.smokePuffs.splice(i, 1);
        }
      }

      // Update embers
      for (let i = state.embers.length - 1; i >= 0; i--) {
        const ember = state.embers[i];
        ember.update();
        if (ember.life <= 0) {
          state.embers.splice(i, 1);
        }
      }

      // ── RENDERING ─────────────────────────────────────────────────────────
      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // 1. Ambient Background Orange Light Bloom (Behind Subject)
      if (state.revealAmount > 0.01) {
        const bloomX = drawX + drawW * 0.55;
        const bloomY = drawY + drawH * 0.28;
        const bloomRadius = drawW * (0.55 + state.revealAmount * 0.25);
        const bloomGrad = ctx.createRadialGradient(bloomX, bloomY, 0, bloomX, bloomY, bloomRadius);
        const bloomAlpha = (0.16 * state.revealAmount + 0.12 * state.haloInfluence);
        bloomGrad.addColorStop(0, `rgba(234, 88, 12, ${bloomAlpha})`);
        bloomGrad.addColorStop(0.35, `rgba(249, 115, 22, ${bloomAlpha * 0.6})`);
        bloomGrad.addColorStop(0.7, `rgba(251, 146, 60, ${bloomAlpha * 0.2})`);
        bloomGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = bloomGrad;
        ctx.beginPath();
        ctx.arc(bloomX, bloomY, bloomRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Base Monochrome Subject (hero1)
      ctx.drawImage(img1, drawX, drawY, drawW, drawH);

      // 3. Masked Orange Subject Reveal (hero2 via offscreen mask canvas)
      if (state.revealAmount > 0.01 && !prefersReducedMotion) {
        maskCtx.save();
        maskCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
        maskCtx.clearRect(0, 0, w, h);

        // Draw hero2 fully on maskCanvas
        maskCtx.drawImage(img2, drawX, drawY, drawW, drawH);

        // Destination-in to keep only where our smoke/radial mask is drawn
        maskCtx.globalCompositeOperation = 'destination-in';

        // A. Primary Cursor Radial Reveal
        const coreRadius = (80 + state.revealAmount * 110);
        const coreGrad = maskCtx.createRadialGradient(
          state.mouseX, state.mouseY, 0,
          state.mouseX, state.mouseY, coreRadius
        );
        const coreAlpha = state.revealAmount * 0.96;
        coreGrad.addColorStop(0, `rgba(255, 255, 255, ${coreAlpha})`);
        coreGrad.addColorStop(0.4, `rgba(255, 255, 255, ${coreAlpha * 0.85})`);
        coreGrad.addColorStop(0.75, `rgba(255, 255, 255, ${coreAlpha * 0.35})`);
        coreGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        maskCtx.fillStyle = coreGrad;
        maskCtx.beginPath();
        maskCtx.arc(state.mouseX, state.mouseY, coreRadius, 0, Math.PI * 2);
        maskCtx.fill();

        // B. Halo Ambient Reveal when hovering or nearby
        if (state.haloInfluence > 0.05 || state.revealAmount > 0.2) {
          const haloStrength = Math.max(state.haloInfluence * 0.9, state.revealAmount * 0.35);
          const haloR = drawW * 0.38;
          const haloGrad = maskCtx.createRadialGradient(
            haloCenterX, haloCenterY, 0,
            haloCenterX, haloCenterY, haloR
          );
          haloGrad.addColorStop(0, `rgba(255, 255, 255, ${haloStrength * 0.85})`);
          haloGrad.addColorStop(0.5, `rgba(255, 255, 255, ${haloStrength * 0.4})`);
          haloGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

          maskCtx.fillStyle = haloGrad;
          maskCtx.beginPath();
          maskCtx.arc(haloCenterX, haloCenterY, haloR, 0, Math.PI * 2);
          maskCtx.fill();
        }

        // C. Organic Smoke Puffs (Additive reveal)
        for (let i = 0; i < state.smokePuffs.length; i++) {
          const puff = state.smokePuffs[i];
          const puffGrad = maskCtx.createRadialGradient(
            puff.x, puff.y, 0,
            puff.x, puff.y, puff.radius
          );
          const pAlpha = puff.life * 0.65 * state.revealAmount;
          puffGrad.addColorStop(0, `rgba(255, 255, 255, ${pAlpha})`);
          puffGrad.addColorStop(0.5, `rgba(255, 255, 255, ${pAlpha * 0.4})`);
          puffGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

          maskCtx.fillStyle = puffGrad;
          maskCtx.beginPath();
          maskCtx.arc(puff.x, puff.y, puff.radius, 0, Math.PI * 2);
          maskCtx.fill();
        }

        maskCtx.restore();

        // Blit the masked orange version over base image
        ctx.drawImage(maskCanvas, 0, 0, w, h);

        // 4. Atmospheric Smoke Layer & Orange Edge Haze
        ctx.save();
        ctx.globalCompositeOperation = 'screen';

        // Smoke glow over mouse
        const glowRadius = coreRadius * 1.35;
        const mouseGlow = ctx.createRadialGradient(
          state.mouseX, state.mouseY, 0,
          state.mouseX, state.mouseY, glowRadius
        );
        mouseGlow.addColorStop(0, `rgba(249, 115, 22, ${0.25 * state.revealAmount})`);
        mouseGlow.addColorStop(0.4, `rgba(234, 88, 12, ${0.12 * state.revealAmount})`);
        mouseGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = mouseGlow;
        ctx.beginPath();
        ctx.arc(state.mouseX, state.mouseY, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Subtle smoke trail puffs glow
        for (let i = 0; i < state.smokePuffs.length; i++) {
          const puff = state.smokePuffs[i];
          const pGlow = ctx.createRadialGradient(
            puff.x, puff.y, 0,
            puff.x, puff.y, puff.radius * 1.1
          );
          const pAlpha = puff.life * 0.12 * state.revealAmount;
          pGlow.addColorStop(0, `rgba(251, 146, 60, ${pAlpha})`);
          pGlow.addColorStop(0.6, `rgba(234, 88, 12, ${pAlpha * 0.4})`);
          pGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = pGlow;
          ctx.beginPath();
          ctx.arc(puff.x, puff.y, puff.radius * 1.1, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();

        // 5. Rising Golden Embers
        for (let i = 0; i < state.embers.length; i++) {
          state.embers[i].draw(ctx);
        }
      }

      ctx.restore();
    };

    render();

    return () => {
      if (state.animId) cancelAnimationFrame(state.animId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);

      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseenter', onMouseEnter);
      container.removeEventListener('mouseleave', onMouseLeave);
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-end justify-center select-none cursor-crosshair overflow-visible"
    >
      {/* Background radial atmosphere backing the subject */}
      <div
        className="absolute inset-0 pointer-events-none opacity-80 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle at 55% 45%, rgba(234, 88, 12, 0.15) 0%, rgba(249, 115, 22, 0.05) 45%, rgba(0, 0, 0, 0) 75%)',
        }}
      />

      {/* Hardware-accelerated canvas */}
      <canvas
        ref={canvasRef}
        className="relative z-10 w-full h-full object-contain pointer-events-auto transform-gpu will-change-transform"
      />

      {/* Interactive hover hint badge */}
      <div className="absolute bottom-6 right-6 z-20 hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md pointer-events-none text-[10px] uppercase tracking-[0.2em] text-[#F5F4F0]/60">
        <span className="w-1.5 h-1.5 rounded-full bg-[#ea580c] animate-ping" />
        <span>Hover for ignition</span>
      </div>
    </div>
  );
};

export default HeroPortraitEffect;

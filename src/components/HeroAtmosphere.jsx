import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const HeroAtmosphere = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particle geometry setup - 120 delicate dust / light bokeh particles
    const particleCount = 120;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      scales[i] = Math.random() * 0.04 + 0.01;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle material with soft circle texture in subtle cream / white dust
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(245, 244, 240, 0.85)');
    grad.addColorStop(0.5, 'rgba(245, 244, 240, 0.2)');
    grad.addColorStop(1, 'rgba(245, 244, 240, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);

    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 0.15,
      map: texture,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse movement tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop with Visibility and Viewport Pause
    let animationFrameId = null;
    let isVisible = true;
    let isTabVisible = !document.hidden;
    const timer = new THREE.Timer();

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible && isVisible && !animationFrameId) {
        timer.update();
        animationFrameId = requestAnimationFrame(animate);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // IntersectionObserver to pause rendering when hero is out of view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible && isTabVisible && !animationFrameId) {
            timer.update();
            animationFrameId = requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const animate = (timestamp) => {
      if (!isVisible || !isTabVisible) {
        animationFrameId = null;
        return;
      }

      animationFrameId = requestAnimationFrame(animate);
      timer.update(timestamp);
      const elapsedTime = timer.getElapsed();

      // Slow drift
      particles.rotation.y = elapsedTime * 0.02;
      particles.rotation.x = Math.sin(elapsedTime * 0.015) * 0.05;

      // Smooth mouse camera interpolation
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      camera.position.x = currentMouseX * 0.4;
      camera.position.y = -currentMouseY * 0.3;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-2 overflow-hidden"
    />
  );
};

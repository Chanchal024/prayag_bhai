import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export const Background3D = () => {
  const containerRef = useRef(null);
  const mouseLightRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const mouseLight = mouseLightRef.current;
    if (!container) return;

    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    // --- THREE.JS SCENE SETUP ---
    const scene = new THREE.Scene();
    
    // Soft dark fog to blend 3D objects into deep background space
    scene.fog = new THREE.FogExp2(0x060606, 0.03);

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 14;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // --- SCENE LIGHTING FOR GLB MODEL ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xea580c, 3.5); // Warm orange directional key light
    mainLight.position.set(10, 15, 10);
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.2); // Cool rim fill light
    fillLight.position.set(-10, -10, -5);
    scene.add(fillLight);

    const pointLight = new THREE.PointLight(0xf97316, 3.0, 30);
    pointLight.position.set(0, 0, 5);
    scene.add(pointLight);

    // --- 1. GLOWING PARTICLES ATMOSPHERE ---
    const particleCount = isMobile ? 60 : 160;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const palette = [
      new THREE.Color(0xffffff),
      new THREE.Color(0xf5f4f0),
      new THREE.Color(0xe5e5e5),
      new THREE.Color(0xd4d4d8),
      new THREE.Color(0xa1a1aa),
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 35;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 35;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 2;

      const color = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pCanvas = document.createElement('canvas');
    pCanvas.width = 64;
    pCanvas.height = 64;
    const pCtx = pCanvas.getContext('2d');
    const pGrad = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
    pGrad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
    pGrad.addColorStop(0.4, 'rgba(245, 244, 240, 0.35)');
    pGrad.addColorStop(0.8, 'rgba(212, 212, 216, 0.1)');
    pGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    pCtx.fillStyle = pGrad;
    pCtx.fillRect(0, 0, 64, 64);

    const particleTexture = new THREE.CanvasTexture(pCanvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.35,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, particleMaterial);
    scene.add(particles);

    // --- 2. LOAD 3D GLB MODEL (`3d1.glb`) ---
    let glbModel = null;
    const loader = new GLTFLoader();

    loader.load(
      '/3d1.glb',
      (gltf) => {
        const rawModel = gltf.scene;

        // Calculate true geometric bounding box center
        const box = new THREE.Box3().setFromObject(rawModel);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        // Offset inner geometry so its exact visual center is at (0,0,0) inside the wrapper
        rawModel.position.set(-center.x, -center.y, -center.z);

        const wrapper = new THREE.Group();
        wrapper.add(rawModel);

        const maxDim = Math.max(size.x, size.y, size.z);
        const targetSize = isMobile ? 8.5 : 14.5; // Slightly larger model scale
        if (maxDim > 0) {
          const scale = targetSize / maxDim;
          wrapper.scale.set(scale, scale, scale);
        }

        // Place wrapper at exact middle of background composition
        wrapper.position.set(0, 0, -4.5);

        rawModel.traverse((child) => {
          if (child.isMesh) {
            child.material.side = THREE.DoubleSide;
            if (child.material) {
              child.material.transparent = true;
              child.material.opacity = 0.92;
            }
          }
        });

        glbModel = wrapper;
        scene.add(glbModel);
      },
      undefined,
      (error) => {
        console.error('Error loading 3D GLB model:', error);
      }
    );

    // --- MOUSE TRACKING & INTERPOLATION (LERP) ---
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    let currentModelX = 0;
    let currentModelY = 0;
    let currentModelRotX = 0;
    let currentModelRotY = 0;

    let pageMouseX = window.innerWidth / 2;
    let pageMouseY = window.innerHeight / 2;
    let currentLightX = pageMouseX;
    let currentLightY = pageMouseY;

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      pageMouseX = e.clientX;
      pageMouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        targetMouseX = (e.touches[0].clientX / window.innerWidth - 0.5) * 2;
        targetMouseY = (e.touches[0].clientY / window.innerHeight - 0.5) * 2;
        pageMouseX = e.touches[0].clientX;
        pageMouseY = e.touches[0].clientY;
      }
    };
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // --- ANIMATION LOOP ---
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth slow rotation & mouse tracking on the 3D GLB model
      if (!prefersReducedMotion) {
        particles.rotation.y = elapsedTime * 0.015;
        particles.rotation.x = Math.sin(elapsedTime * 0.01) * 0.04;

        if (glbModel) {
          // Model tilts and follows mouse movement without 360-degree continuous spinning
          const targetX = targetMouseX * 0.8;
          const targetY = -targetMouseY * 0.6;
          const targetRotX = targetMouseY * 0.45 + Math.sin(elapsedTime * 0.5) * 0.03;
          const targetRotY = targetMouseX * 0.55;

          currentModelX += (targetX - currentModelX) * 0.06;
          currentModelY += (targetY - currentModelY) * 0.06;
          currentModelRotX += (targetRotX - currentModelRotX) * 0.06;
          currentModelRotY += (targetRotY - currentModelRotY) * 0.06;

          glbModel.position.x = currentModelX;
          glbModel.position.y = currentModelY;
          glbModel.position.z = -4.5;
          glbModel.rotation.x = currentModelRotX;
          glbModel.rotation.y = currentModelRotY;
        }
      }

      // Smooth lerp mouse camera parallax
      currentMouseX += (targetMouseX - currentMouseX) * 0.04;
      currentMouseY += (targetMouseY - currentMouseY) * 0.04;

      camera.position.x = currentMouseX * 1.8;
      camera.position.y = -currentMouseY * 1.4;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);

      // Smooth lerp for interactive ambient light layer
      currentLightX += (pageMouseX - currentLightX) * 0.06;
      currentLightY += (pageMouseY - currentLightY) * 0.06;

      if (mouseLight) {
        mouseLight.style.background = `radial-gradient(650px circle at ${currentLightX}px ${currentLightY}px, rgba(234, 88, 12, 0.15) 0%, rgba(194, 65, 12, 0.05) 45%, rgba(6, 6, 6, 0) 75%)`;
      }
    };

    animate();

    // --- CLEANUP ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      geometry.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#060606]">
      {/* 1. Base Black + Orange Multi-Stop Gradient Theme */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-90"
        style={{
          background: `
            radial-gradient(circle at 50% 0%, rgba(26, 15, 10, 0.8) 0%, rgba(10, 10, 10, 0.95) 50%, #050505 100%),
            radial-gradient(circle at 85% 20%, rgba(194, 65, 12, 0.09) 0%, transparent 55%),
            radial-gradient(circle at 15% 80%, rgba(154, 52, 18, 0.07) 0%, transparent 50%),
            linear-gradient(180deg, #070707 0%, #0d0a08 40%, #060606 100%)
          `
        }}
      />

      {/* 2. Interactive Lerping Orange Mouse Ambient Light Layer */}
      <div
        ref={mouseLightRef}
        className="absolute inset-0 z-1 pointer-events-none transition-opacity duration-500"
      />

      {/* 3. Three.js 3D WebGL Atmosphere Canvas Layer */}
      <div
        ref={containerRef}
        className="absolute inset-0 z-2 pointer-events-none overflow-hidden"
      />
    </div>
  );
};

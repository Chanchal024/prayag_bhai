import React, { useEffect, useRef, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { CursorProvider } from './context/CursorContext';
import { CustomCursor } from './components/CustomCursor';
import { Background3D } from './components/Background3D';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Code-split route components for fast initial load
const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const WorkPage = lazy(() => import('./pages/WorkPage').then((m) => ({ default: m.WorkPage })));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage').then((m) => ({ default: m.ProjectDetailPage })));
const ReviewsPage = lazy(() => import('./pages/ReviewsPage').then((m) => ({ default: m.ReviewsPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));

gsap.registerPlugin(ScrollTrigger);

// ScrollToTop component to reset window & Lenis scroll position on route change
function ScrollToTop({ lenisRef }) {
  const { pathname } = useLocation();
  useEffect(() => {
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
    // Refresh ScrollTrigger calculations for the newly mounted route
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, [pathname, lenisRef]);
  return null;
}

export default function App() {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  return (
    <CursorProvider>
      <div className="relative min-h-screen bg-[#060606] text-[#F5F4F0] font-sans antialiased selection:bg-[#ea580c] selection:text-white overflow-x-hidden">
        <Background3D />
        <ScrollToTop lenisRef={lenisRef} />
        <CustomCursor />
        <div className="relative z-10">
          <Navbar />
          <Suspense fallback={<div className="min-h-screen bg-[#060606]" />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/work" element={<WorkPage />} />
              <Route path="/work/:slug" element={<ProjectDetailPage />} />
              <Route path="/reviews" element={<ReviewsPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </Suspense>
          <Footer />
        </div>
      </div>
    </CursorProvider>
  );
}


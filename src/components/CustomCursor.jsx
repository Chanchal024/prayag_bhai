import React, { useEffect, useRef, useState } from 'react';
import { useCursor } from '../context/CursorContext';

export const CustomCursor = () => {
  const { cursorType, cursorText } = useCursor();
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on desktop pointer devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice || window.innerWidth < 768) return;

    document.body.classList.add('custom-cursor-active');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let animationFrameId;
    let visibleFlag = false;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visibleFlag) {
        visibleFlag = true;
        setIsVisible(true);
      }
    };

    const onMouseLeave = () => {
      visibleFlag = false;
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      visibleFlag = true;
      setIsVisible(true);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter, { passive: true });

    const render = () => {
      // Smooth lerp (linear interpolation)
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
      }
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const isView = cursorType === 'view';
  const isDrag = cursorType === 'drag';
  const isHover = cursorType === 'hover';

  let sizeClass = 'w-8 h-8 bg-transparent border border-[#F5F4F0]/35';
  if (isView) sizeClass = 'w-24 h-24 bg-[#ea580c] text-white border-none shadow-[0_0_30px_rgba(234,88,12,0.5)]';
  if (isDrag) sizeClass = 'w-24 h-24 bg-[#ea580c] text-white border-none shadow-[0_0_30px_rgba(234,88,12,0.5)]';
  if (isHover) sizeClass = 'w-14 h-14 bg-[#ea580c]/20 border border-[#ea580c]';

  return (
    <>
      {/* Small instant dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 w-2 h-2 bg-[#ea580c] rounded-full pointer-events-none z-[9999] hidden md:block transition-opacity duration-300 shadow-[0_0_10px_#ea580c] ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Trailing larger ring / badge */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9998] hidden md:flex items-center justify-center text-[11px] font-medium tracking-widest uppercase transition-all duration-300 ease-out ${sizeClass} ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {(isView || isDrag || cursorText) && (
          <span className="animate-fade-in font-sans tracking-[0.2em]">
            {cursorText || (isView ? 'VIEW' : isDrag ? 'DRAG' : '')}
          </span>
        )}
      </div>
    </>
  );
};

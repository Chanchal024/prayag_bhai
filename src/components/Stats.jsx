import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const statData = [
  { num: "01", val: 8, suffix: "K+", label: "Hours Behind the Lens" },
  { num: "02", val: 3, suffix: "+", label: "Years of Experience" },
  { num: "03", val: 5, suffix: "+", label: "Awards & Recognitions" },
  { num: "04", val: 30, suffix: "+", label: "Happy Clients" },
];

export const Stats = () => {
  const sectionRef = useRef(null);
  const countersRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      statData.forEach((stat, idx) => {
        const el = countersRef.current[idx];
        if (!el) return;

        const obj = { value: 0 };
        tl.to(
          obj,
          {
            value: stat.val,
            duration: 2.2,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = `${Math.floor(obj.value)}${stat.suffix}`;
            },
          },
          0
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto border-t border-b border-white/10"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        {statData.map((stat, idx) => (
          <div
            key={stat.num}
            className="flex flex-col space-y-4 border-l border-white/10 pl-6 lg:pl-8 py-2"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-[#ea580c] font-semibold">
              {stat.num}
            </span>
            <div className="font-serif text-5xl sm:text-6xl md:text-7xl font-normal text-[#F5F4F0] tracking-tight">
              <span ref={(el) => (countersRef.current[idx] = el)}>
                0{stat.suffix}
              </span>
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#A1A1AA] font-medium leading-relaxed">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

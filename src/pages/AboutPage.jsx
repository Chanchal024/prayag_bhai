import React from 'react';
import { Trophy } from 'lucide-react';
import { ContactCTA } from '../components/ContactCTA';
import { useCursor } from '../context/CursorContext';
import { milestonesData } from '../data/milestones';

export const AboutPage = () => {
  const { setCursor, resetCursor } = useCursor();

  return (
    <main className="pt-32 pb-20 md:pt-40">
      {/* Header section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-16 md:mb-24">
        <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#A1A1AA]">
          ABOUT THE ARTIST
        </span>
        <h1 className="font-serif text-[clamp(3rem,8vw,7.5rem)] leading-[0.95] font-normal text-[#F5F4F0] uppercase mt-3 tracking-tight">
          BEHIND THE LENS
        </h1>
      </section>

      {/* Main Editorial Story Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-28">
        <div className="lg:col-span-6 flex flex-col space-y-8">
          <p className="font-serif text-2xl sm:text-3xl text-[#F5F4F0] leading-snug font-normal">
            "I believe visual editing is not merely about stitching clips together, but capturing how the narrative rhythm feels at that exact moment in time."
          </p>

          <div className="space-y-6 text-base text-[#A1A1AA] font-light leading-relaxed">
            <p>
              Based in Cuttack, Odisha, India, Prayag Kumar Das discovered video editing while working on commercial campaigns and cinematic stories. Over the past three years, his work has evolved into a distinctive blend of visual pacing, color grading, and motion graphics.
            </p>
            <p>
              Whether editing high-energy commercial reels or sculpting subtle color tones in post-production, Prayag brings unwavering precision to composition, timing, and visual storytelling.
            </p>
          </div>

          <div className="pt-4 grid grid-cols-2 gap-6 border-t border-white/10">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#ea580c]">LOCATION</span>
              <p className="text-xs text-[#A1A1AA] mt-1 uppercase tracking-wider">CUTTACK, ODISHA, INDIA</p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#ea580c]">REPRESENTATION</span>
              <p className="text-xs text-[#A1A1AA] mt-1 uppercase tracking-wider">GLOBAL / DIRECT</p>
            </div>
          </div>
        </div>

        {/* Large Editorial Portrait */}
        <div className="lg:col-span-6">
          <div
            onMouseEnter={() => setCursor('view')}
            onMouseLeave={resetCursor}
            className="w-full max-w-md lg:ml-auto aspect-[4/5] rounded-xs overflow-hidden bg-[#141414] relative border border-white/10"
          >
            <img
              src="/p3.png"
              alt="Prayag Kumar Das"
              className="w-full h-full object-cover object-center"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute bottom-6 left-6 bg-[#060606]/85 backdrop-blur-md px-4 py-2 border border-white/20 text-[10px] uppercase tracking-[0.25em] text-[#F5F4F0]">
              PRAYAG KUMAR DAS / IN STUDIO 2026
            </div>
          </div>
        </div>
      </section>

      {/* Career Timeline Section */}
      <section className="py-24 bg-[#0a0a0c]/80 border-t border-b border-white/10 text-[#F5F4F0] px-6 md:px-12 my-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#ea580c]">
              MILESTONES & EXHIBITIONS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F5F4F0] uppercase font-normal">
              CAREER CHRONOLOGY
            </h2>
            <p className="text-xs text-[#A1A1AA] font-light leading-relaxed max-w-sm pt-2">
              Recognitions, festival awards, and honors achieved across filmmaking, photography, and creative media leadership.
            </p>
          </div>

          <div className="lg:col-span-8 divide-y divide-white/10">
            {milestonesData.map((item, idx) => (
              <div key={idx} className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-white/[0.02] px-4 rounded-xs transition-colors">
                <div className="flex items-center space-x-3 shrink-0">
                  <span className="text-xs font-mono text-[#ea580c] tracking-widest font-semibold bg-[#ea580c]/10 border border-[#ea580c]/30 px-3 py-1 rounded-full uppercase flex items-center gap-1.5">
                    <Trophy className="w-3 h-3 text-[#ea580c]" />
                    {item.badge}
                  </span>
                </div>
                <div className="flex flex-col sm:w-2/3">
                  <h3 className="font-serif text-xl font-normal text-[#F5F4F0] group-hover:text-[#ea580c] transition-colors">{item.title}</h3>
                  <p className="text-xs text-[#A1A1AA] mt-1 font-light">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <ContactCTA />
    </main>
  );
};

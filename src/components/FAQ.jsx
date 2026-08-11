import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { faqs } from '../data/faqs';
import { useCursor } from '../context/CursorContext';

export const FAQ = () => {
  const [openIdx, setOpenIdx] = useState(0);
  const { setCursor, resetCursor } = useCursor();

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-24 md:py-36 px-6 md:px-12 max-w-5xl mx-auto border-t border-white/10">
      <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
        <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#A1A1AA]">
          ALL YOUR ANSWERS HERE
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl font-normal text-[#F5F4F0] uppercase tracking-tight">
          FREQUENTLY ASKED QUESTIONS
        </h2>
      </div>

      <div className="divide-y divide-white/10">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={idx} className="py-6 sm:py-8">
              <button
                onClick={() => toggle(idx)}
                onMouseEnter={() => setCursor('hover')}
                onMouseLeave={resetCursor}
                className="w-full flex items-center justify-between text-left group focus:outline-hidden cursor-pointer"
              >
                <span className="font-serif text-xl sm:text-2xl font-normal text-[#F5F4F0] group-hover:text-[#ea580c] transition-colors pr-6">
                  {faq.question}
                </span>
                <span
                  className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isOpen ? 'rotate-45 bg-[#ea580c] text-white border-[#ea580c]' : 'rotate-0 text-[#F5F4F0] group-hover:border-[#ea580c]'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                </span>
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="text-base text-[#A1A1AA] font-light leading-relaxed max-w-3xl">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

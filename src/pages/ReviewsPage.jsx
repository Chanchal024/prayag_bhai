import React from 'react';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '../data/testimonials';
import { ContactCTA } from '../components/ContactCTA';

export const ReviewsPage = () => {
  return (
    <main className="pt-32 pb-20 md:pt-40">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#A1A1AA]">
          CLIENT TESTIMONIALS
        </span>
        <h1 className="font-serif text-[clamp(3rem,8vw,7.5rem)] leading-[0.95] font-normal text-[#F5F4F0] uppercase mt-3 tracking-tight">
          SMILES & REVIEWS
        </h1>
        <p className="text-base text-[#A1A1AA] font-light max-w-xl mt-6 leading-relaxed">
          Reflections from publication editors, principal architects, haute horlogerie brand directors, and global creative leads.
        </p>
      </section>

      {/* Stats Summary Banner */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-t border-b border-white/10">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-1 text-[#ea580c]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <span className="font-serif text-3xl font-normal text-[#F5F4F0]">5.0 RATING</span>
            <span className="text-xs uppercase tracking-[0.2em] text-[#A1A1AA]">AVERAGE CLIENT EVALUATION</span>
          </div>

          <div className="flex flex-col space-y-2 border-l md:border-l border-white/10 pl-0 md:pl-8">
            <span className="font-serif text-3xl font-normal text-[#F5F4F0]">120+</span>
            <span className="text-xs uppercase tracking-[0.2em] text-[#A1A1AA]">DELIVERED COMMISSIONS</span>
          </div>

          <div className="flex flex-col space-y-2 border-l md:border-l border-white/10 pl-0 md:pl-8">
            <span className="font-serif text-3xl font-normal text-[#F5F4F0]">100%</span>
            <span className="text-xs uppercase tracking-[0.2em] text-[#A1A1AA]">ON-TIME CAMPAIGN DELIVERY</span>
          </div>
        </div>
      </section>

      {/* Grid of Reviews */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-[#111111] text-[#F5F4F0] p-8 sm:p-12 rounded-xs flex flex-col justify-between space-y-8 shadow-md"
            >
              <Quote className="w-8 h-8 text-[#F5F4F0]/20" />
              <blockquote className="font-serif text-xl sm:text-2xl font-normal leading-relaxed text-[#F5F4F0]">
                "{item.quote}"
              </blockquote>

              <div className="flex items-center space-x-4 pt-6 border-t border-[#F5F4F0]/15">
                <img
                  src={item.image}
                  alt={item.author}
                  className="w-12 h-12 rounded-full object-cover border border-[#F5F4F0]/30"
                  loading="lazy"
                  decoding="async"
                />
                <div className="flex flex-col">
                  <span className="font-serif text-base font-normal text-[#F5F4F0]">
                    {item.author}
                  </span>
                  <span className="text-xs uppercase tracking-[0.2em] text-[#6F6F6A]">
                    {item.role} — {item.company}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ContactCTA />
    </main>
  );
};

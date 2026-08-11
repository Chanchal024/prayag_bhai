import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Search } from 'lucide-react';
import { blogArticles } from '../data/blog';
import { ContactCTA } from '../components/ContactCTA';
import { useCursor } from '../context/CursorContext';

export const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState('ALL');
  const { setCursor, resetCursor } = useCursor();

  const categories = ['ALL', 'RESOURCES', 'TIPS'];

  const filteredArticles = blogArticles.filter((art) => {
    const matchesSearch = art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCat === 'ALL' || art.category.toUpperCase() === selectedCat;
    return matchesSearch && matchesCat;
  });

  return (
    <main className="pt-32 pb-20 md:pt-40">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#A1A1AA]">
          EDITORIAL JOURNAL
        </span>
        <h1 className="font-serif text-[clamp(3rem,8vw,7.5rem)] leading-[0.95] font-normal text-[#F5F4F0] uppercase mt-3 tracking-tight">
          INSIGHTFUL ARTICLES
        </h1>
        <p className="text-base text-[#A1A1AA] font-light max-w-xl mt-6 leading-relaxed">
          Essays on photographic color grading, lighting dynamics, candid storytelling, and workflow techniques.
        </p>
      </section>

      {/* Search & Category Filter Controls */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-16 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
        <div className="flex items-center space-x-3 overflow-x-auto no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCat === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                onMouseEnter={() => setCursor('hover')}
                onMouseLeave={resetCursor}
                className={`text-xs uppercase tracking-[0.2em] font-semibold px-5 py-2.5 rounded-full transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#ea580c] text-white border border-[#ea580c] shadow-[0_0_15px_rgba(234,88,12,0.4)]'
                    : 'bg-transparent text-[#A1A1AA] hover:text-[#F5F4F0] border border-white/20 hover:border-[#ea580c]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#141414] border border-white/20 rounded-full py-2.5 pl-10 pr-4 text-xs font-sans text-[#F5F4F0] focus:outline-hidden focus:border-[#ea580c] placeholder:text-[#A1A1AA]"
          />
          <Search className="w-4 h-4 text-[#A1A1AA] absolute left-3.5 top-3" />
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          {filteredArticles.map((article) => (
            <article key={article.id} className="group flex flex-col space-y-4">
              <Link
                to={`/blog/${article.slug}`}
                onMouseEnter={() => setCursor('view', 'READ')}
                onMouseLeave={resetCursor}
                className="relative aspect-[16/10] overflow-hidden rounded-xs bg-[#141414] border border-white/10 block"
              >
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </Link>

              <div className="flex items-center space-x-3 text-[11px] uppercase tracking-[0.25em] text-[#A1A1AA]">
                <span className="font-semibold text-[#ea580c]">{article.category}</span>
                <span>•</span>
                <span>{article.date}</span>
                <span>•</span>
                <span>{article.readTime}</span>
              </div>

              <Link
                to={`/blog/${article.slug}`}
                onMouseEnter={() => setCursor('hover')}
                onMouseLeave={resetCursor}
              >
                <h2 className="font-serif text-2xl font-normal text-[#F5F4F0] group-hover:text-[#ea580c] group-hover:underline leading-snug transition-colors">
                  {article.title}
                </h2>
              </Link>

              <p className="text-xs text-[#A1A1AA] font-light leading-relaxed">
                {article.summary}
              </p>
            </article>
          ))}
        </div>
      </section>

      <ContactCTA />
    </main>
  );
};

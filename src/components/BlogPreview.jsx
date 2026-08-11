import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { blogArticles } from '../data/blog';
import { useCursor } from '../context/CursorContext';

export const BlogPreview = () => {
  const { setCursor, resetCursor } = useCursor();

  return (
    <section className="py-24 md:py-36 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#D8D7D2]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4 md:space-y-0">
        <div className="flex flex-col space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#6F6F6A]">
            EDITORIAL JOURNAL
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#111111] uppercase tracking-tight">
            INSIGHTFUL ARTICLES
          </h2>
        </div>

        <Link
          to="/blog"
          onMouseEnter={() => setCursor('hover')}
          onMouseLeave={resetCursor}
          className="inline-flex items-center space-x-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#111111] border-b border-[#111111] pb-1 hover:opacity-75 transition-opacity"
        >
          <span>ALL ARTICLES ({blogArticles.length})</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        {blogArticles.slice(0, 3).map((article) => (
          <article key={article.id} className="group flex flex-col space-y-4">
            <Link
              to={`/blog/${article.slug}`}
              onMouseEnter={() => setCursor('view', 'READ')}
              onMouseLeave={resetCursor}
              className="relative aspect-[16/10] overflow-hidden rounded-xs bg-[#D8D7D2] block"
            >
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </Link>

            <div className="flex items-center space-x-3 text-[11px] uppercase tracking-[0.25em] text-[#6F6F6A]">
              <span className="font-semibold text-[#111111]">{article.category}</span>
              <span>•</span>
              <span>{article.date}</span>
            </div>

            <Link
              to={`/blog/${article.slug}`}
              onMouseEnter={() => setCursor('hover')}
              onMouseLeave={resetCursor}
              className="group-hover:translate-x-1 transition-transform duration-300"
            >
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#111111] group-hover:underline leading-snug flex items-start justify-between">
                <span>{article.title}</span>
                <ArrowUpRight className="w-5 h-5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity ml-2" />
              </h3>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

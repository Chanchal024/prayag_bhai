import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock, User, Calendar, Share2 } from 'lucide-react';
import { blogArticles } from '../data/blog';
import { ContactCTA } from '../components/ContactCTA';
import { useCursor } from '../context/CursorContext';

export const BlogDetailPage = () => {
  const { slug } = useParams();
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const currentIndex = blogArticles.findIndex((b) => b.slug === slug);
  const article = blogArticles[currentIndex] || blogArticles[0];

  const prevArticle = blogArticles[(currentIndex - 1 + blogArticles.length) % blogArticles.length];
  const nextArticle = blogArticles[(currentIndex + 1) % blogArticles.length];

  return (
    <main className="pt-32 pb-20 md:pt-40">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-6 mb-8">
        <Link
          to="/blog"
          onMouseEnter={() => setCursor('hover')}
          onMouseLeave={resetCursor}
          className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#A1A1AA] hover:text-[#ea580c] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#ea580c]" />
          <span>BACK TO ALL ARTICLES</span>
        </Link>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-6 mb-16">
        <div className="flex items-center space-x-4 text-xs uppercase tracking-[0.3em] font-semibold text-[#A1A1AA] mb-4">
          <span className="text-[#ea580c]">{article.category}</span>
          <span>•</span>
          <span>{article.date}</span>
          <span>•</span>
          <span>{article.readTime}</span>
        </div>

        <h1 className="font-serif text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.05] font-normal text-[#F5F4F0] tracking-tight mb-8">
          {article.title}
        </h1>

        {/* Author Metadata Bar */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          <div className="flex items-center space-x-4">
            <img
              src={article.authorImage}
              alt={article.author}
              className="w-12 h-12 rounded-full object-cover border border-white/20"
            />
            <div className="flex flex-col">
              <span className="font-serif text-base font-normal text-[#F5F4F0]">
                {article.author}
              </span>
              <span className="text-xs text-[#A1A1AA] uppercase tracking-wider">
                {article.authorRole}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              navigator.clipboard?.writeText(window.location.href);
              alert("Article link copied to clipboard!");
            }}
            onMouseEnter={() => setCursor('hover')}
            onMouseLeave={resetCursor}
            className="flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-[#A1A1AA] hover:text-[#ea580c] transition-colors p-2 cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">SHARE</span>
          </button>
        </div>
      </article>

      {/* Hero Cover Image */}
      <section className="max-w-6xl mx-auto px-6 mb-20">
        <div className="w-full aspect-[16/9] overflow-hidden rounded-xs bg-[#141414] border border-white/10">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Main Body Content */}
      <section className="max-w-3xl mx-auto px-6 mb-24 space-y-10">
        {article.content && article.content.map((block, idx) => {
          if (block.type === 'paragraph') {
            return (
              <p key={idx} className="text-base sm:text-lg text-[#E5E5E5] font-light leading-relaxed">
                {block.text}
              </p>
            );
          }
          if (block.type === 'heading') {
            return (
              <h2 key={idx} className="font-serif text-2xl sm:text-3xl font-normal text-[#F5F4F0] pt-6 tracking-tight">
                {block.text}
              </h2>
            );
          }
          if (block.type === 'quote') {
            return (
              <blockquote key={idx} className="my-8 p-8 bg-[#141414] border-l-4 border-[#ea580c] text-[#F5F4F0] rounded-xs font-serif text-xl sm:text-2xl leading-snug">
                "{block.text}"
              </blockquote>
            );
          }
          if (block.type === 'image') {
            return (
              <figure key={idx} className="my-10 space-y-3">
                <div className="w-full aspect-[16/10] overflow-hidden rounded-xs bg-[#141414] border border-white/10">
                  <img src={block.url} alt={block.caption} className="w-full h-full object-cover" />
                </div>
                {block.caption && (
                  <figcaption className="text-xs uppercase tracking-[0.2em] text-[#A1A1AA] text-center">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );
          }
          return null;
        })}
      </section>

      {/* Author Bio Box */}
      <section className="max-w-3xl mx-auto px-6 py-10 border-t border-b border-white/10 mb-20 flex items-center space-x-6">
        <img
          src={article.authorImage}
          alt={article.author}
          className="w-16 h-16 rounded-full object-cover border border-white/20"
        />
        <div className="flex flex-col space-y-1">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#ea580c]">WRITTEN BY</span>
          <span className="font-serif text-xl text-[#F5F4F0] font-normal">{article.author}</span>
          <p className="text-xs text-[#A1A1AA] font-light leading-relaxed">
            Prayag is an international fine art photographer, speaker, and contributor for leading luxury publications.
          </p>
        </div>
      </section>

      {/* Prev / Next Article Navigation */}
      <section className="max-w-4xl mx-auto px-6 mb-28">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <Link
            to={`/blog/${prevArticle.slug}`}
            onMouseEnter={() => setCursor('hover')}
            onMouseLeave={resetCursor}
            className="group p-6 border border-white/10 rounded-xs flex flex-col space-y-2 hover:border-[#ea580c] hover:bg-white/5 transition-colors"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#A1A1AA] group-hover:text-[#ea580c] flex items-center space-x-2">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>PREVIOUS ARTICLE</span>
            </span>
            <span className="font-serif text-xl font-normal leading-snug text-[#F5F4F0]">{prevArticle.title}</span>
          </Link>

          <Link
            to={`/blog/${nextArticle.slug}`}
            onMouseEnter={() => setCursor('hover')}
            onMouseLeave={resetCursor}
            className="group p-6 border border-white/10 rounded-xs flex flex-col space-y-2 hover:border-[#ea580c] hover:bg-white/5 transition-colors text-left sm:text-right"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#A1A1AA] group-hover:text-[#ea580c] flex items-center justify-end space-x-2">
              <span>NEXT ARTICLE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
            <span className="font-serif text-xl font-normal leading-snug text-[#F5F4F0]">{nextArticle.title}</span>
          </Link>
        </div>
      </section>

      <ContactCTA />
    </main>
  );
};

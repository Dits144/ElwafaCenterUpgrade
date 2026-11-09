import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Calendar, User, Clock, Tag, Share2 } from 'lucide-react';

export const ArticleDetailModal: React.FC = () => {
  const { selectedArticle, setSelectedArticle, showToast } = useApp();

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedArticle(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSelectedArticle]);

  if (!selectedArticle) return null;

  const art = selectedArticle;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Tautan artikel berhasil disalin ke clipboard!', 'success');
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) setSelectedArticle(null);
      }}
    >
      <div className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-elwafa-surface-border">
        
        {/* Banner Image */}
        <div className="relative h-64 bg-elwafa-ocean overflow-hidden">
          <img
            src={art.image}
            alt={art.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/assets/background.jpeg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          <button
            onClick={() => setSelectedArticle(null)}
            aria-label="Tutup Artikel"
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full bg-elwafa-teal text-white text-xs font-bold uppercase tracking-wider">
              {art.category}
            </span>
          </div>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <h2 className="text-lg sm:text-2xl font-extrabold leading-snug">
              {art.title}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs text-white/80 mt-2">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-elwafa-gold" />
                {art.date}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-elwafa-teal-light" />
                {art.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-elwafa-gold" />
                {art.readTime}
              </span>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Summary Callout */}
          <div className="p-4 bg-elwafa-surface rounded-2xl border-l-4 border-elwafa-teal text-xs sm:text-sm text-elwafa-text-main italic font-medium leading-relaxed">
            "{art.summary}"
          </div>

          {/* Full Paragraphs */}
          <div className="text-xs sm:text-sm text-elwafa-text-muted leading-relaxed whitespace-pre-line space-y-4 font-normal">
            {art.content}
          </div>

          {/* Footer Metadata & Share */}
          <div className="pt-6 border-t border-elwafa-surface-border flex items-center justify-between flex-wrap gap-4">
            <div className="text-xs text-elwafa-text-muted">
              Ditulis oleh: <strong className="text-elwafa-ocean">{art.author}</strong> ({art.authorRole})
            </div>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-elwafa-surface hover:bg-elwafa-surface-subtle border border-elwafa-surface-border text-xs font-bold text-elwafa-ocean transition-all"
            >
              <Share2 className="w-3.5 h-3.5 text-elwafa-teal" />
              <span>Bagikan Artikel</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

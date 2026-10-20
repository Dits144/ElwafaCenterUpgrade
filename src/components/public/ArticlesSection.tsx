import React from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, User, Clock, ArrowRight, Newspaper } from 'lucide-react';

export const ArticlesSection: React.FC = () => {
  const { articles, setSelectedArticle } = useApp();

  const publishedArticles = articles.filter((a) => a.status === 'PUBLISHED');

  return (
    <section id="artikel" className="py-20 bg-elwafa-surface border-b border-elwafa-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elwafa-teal/10 text-elwafa-teal text-xs font-bold uppercase tracking-wider mb-3">
              <Newspaper className="w-3.5 h-3.5" />
              <span>Kabar &amp; Informasi Terkini</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-elwafa-ocean tracking-tight">
              Jelajahi Berita &amp; Artikel
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-elwafa-text-muted">
              Dapatkan informasi penting seputar pendaftaran Al-Azhar, kegiatan karantina santri, dan pengumuman resmi.
            </p>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {publishedArticles.map((art) => (
            <div
              key={art.id}
              className="bg-white rounded-2xl border border-elwafa-surface-border overflow-hidden shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between group cursor-pointer"
              onClick={() => setSelectedArticle(art)}
            >
              <div>
                {/* Thumbnail */}
                <div className="relative h-48 bg-elwafa-ocean overflow-hidden">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/assets/background.jpeg';
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full bg-elwafa-ocean/90 backdrop-blur-md text-[10px] font-bold text-white shadow">
                      {art.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-elwafa-text-muted mb-2.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-elwafa-teal" />
                      {art.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-elwafa-gold" />
                      {art.readTime}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-elwafa-ocean group-hover:text-elwafa-teal transition-colors leading-snug line-clamp-2">
                    {art.title}
                  </h3>

                  <p className="mt-2.5 text-xs text-elwafa-text-muted leading-relaxed line-clamp-3">
                    {art.summary}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="px-6 pb-6 pt-2 border-t border-elwafa-surface-border flex items-center justify-between text-xs font-bold text-elwafa-teal">
                <span className="group-hover:underline">Baca Selengkapnya</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

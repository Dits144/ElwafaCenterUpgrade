import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Newspaper, 
  Search, 
  Calendar, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Flame, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  GraduationCap, 
  Bookmark,
  Share2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Article } from '../../types';

export const ArticlesPage: React.FC = () => {
  const { articles, setSelectedArticle, setRole, showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [currentSlide, setCurrentSlide] = useState(0);

  const categories = [
    { id: 'ALL', label: 'Semua Berita' },
    { id: 'TERKINI', label: 'Terkini' },
    { id: 'SEPUTAR AL-AZHAR', label: 'Seputar Al-Azhar' },
    { id: 'REKOMENDASI', label: 'Rekomendasi' },
    { id: 'KEGIATAN', label: 'Kegiatan Santri' },
    { id: 'PENDIDIKAN', label: 'Pendidikan & Beasiswa' },
  ];

  const publishedArticles = articles.filter((a) => a.status === 'PUBLISHED');

  const filteredArticles = publishedArticles.filter((art) => {
    const matchesCategory = selectedCategory === 'ALL' || art.category.toUpperCase() === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Featured Slides for the big interactive carousel (top 4 articles)
  const sliderArticles = publishedArticles.slice(0, 4);

  // Auto advance slide every 6 seconds
  useEffect(() => {
    if (sliderArticles.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderArticles.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [sliderArticles.length]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderArticles.length) % sliderArticles.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderArticles.length);
  };

  const terkiniList = publishedArticles.filter((a) => a.category === 'TERKINI');
  const seputarAzharList = publishedArticles.filter((a) => a.category === 'SEPUTAR AL-AZHAR');
  const rekomendasiList = publishedArticles.filter((a) => a.category === 'REKOMENDASI');
  const kegiatanList = publishedArticles.filter((a) => a.category === 'KEGIATAN' || a.category === 'Kegiatan');
  const pendidikanList = publishedArticles.filter((a) => a.category === 'PENDIDIKAN' || a.category === 'Akademik');

  return (
    <div className="py-10 sm:py-16 bg-[#FAFCFB] min-h-screen text-[#192A3D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ============================================================== */}
        {/* 1. EDITORIAL HEADER & PORTAL BADGE                             */}
        {/* ============================================================== */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between border-b border-elwafa-surface-border pb-6 mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-elwafa-teal/10 border border-elwafa-teal/20 text-elwafa-teal text-xs font-bold uppercase tracking-wider mb-2.5">
              <Newspaper className="w-3.5 h-3.5 text-elwafa-teal" />
              <span>Warta &amp; Khazanah Ilmiah Elwafa</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-elwafa-ocean tracking-tight">
              Kabar, Edukasi &amp; Info Al-Azhar
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-elwafa-text-muted max-w-2xl leading-relaxed">
              Arsip berita resmi seputar pembinaan santri, Dauroh Ta'hiliyah, try out ujian Hadatsah Mu'adalah, pendaftaran Ma'had Bu'uts, dan dinamika studi di Kairo Mesir.
            </p>
          </div>

          <button
            onClick={() => setRole('admin')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-elwafa-ocean hover:bg-elwafa-ocean-light text-white text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-elwafa-gold" />
            <span>Kelola di Portal Admin</span>
          </button>
        </div>

        {/* ============================================================== */}
        {/* 2. SEARCH & HORIZONTAL CATEGORY PILLS BAR                     */}
        {/* ============================================================== */}
        <div className="mb-10 space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-elwafa-text-muted absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari topik berita, Dauroh, Al-Azhar, mu'adalah, atau nama tokoh..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-elwafa-surface-border rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-elwafa-teal shadow-2xs text-elwafa-ocean"
              />
            </div>

            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="px-4 py-3 bg-elwafa-surface border border-elwafa-surface-border rounded-2xl text-xs font-bold text-elwafa-ocean hover:bg-white cursor-pointer"
              >
                Hapus Pencarian
              </button>
            )}
          </div>

          {/* Horizontal Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === c.id
                    ? 'bg-elwafa-ocean text-white shadow-xs'
                    : 'bg-white text-elwafa-text-muted hover:text-elwafa-ocean border border-elwafa-surface-border hover:bg-elwafa-surface-subtle'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3. CONDITIONAL RENDER: SEARCH RESULTS VS SLIDER + MAGAZINE    */}
        {/* ============================================================== */}
        {searchQuery.trim() !== '' || selectedCategory !== 'ALL' ? (
          <div>
            <div className="mb-6 flex items-center justify-between text-xs text-elwafa-text-muted">
              <span>Menampilkan {filteredArticles.length} artikel</span>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('ALL');
                }}
                className="text-elwafa-teal font-bold hover:underline cursor-pointer"
              >
                Tampilkan Slider &amp; Majalah Lengkap
              </button>
            </div>

            {filteredArticles.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-elwafa-surface-border max-w-xl mx-auto shadow-2xs">
                <Newspaper className="w-12 h-12 text-elwafa-text-muted/40 mx-auto mb-3" />
                <p className="text-sm font-bold text-elwafa-ocean">Tidak ada artikel yang cocok</p>
                <p className="text-xs text-elwafa-text-muted mt-1">
                  Coba gunakan kata kunci lain seperti "Ciamis", "Hadatsah", "Mu'adalah", atau "Ma'had".
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((art) => (
                  <ArticleCard key={art.id} article={art} onSelect={setSelectedArticle} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-14">
            
            {/* ========================================================== */}
            {/* INTERACTIVE CAROUSEL SLIDER (SLIDE KANAN KIRI)             */}
            {/* ========================================================== */}
            {sliderArticles.length > 0 && (
              <div className="relative rounded-3xl overflow-hidden bg-elwafa-ocean border border-elwafa-surface-border shadow-elevated">
                <div className="relative h-[380px] sm:h-[460px] lg:h-[520px] w-full overflow-hidden">
                  <AnimatePresence mode="wait">
                    {sliderArticles.map((slide, idx) => {
                      if (idx !== currentSlide) return null;
                      return (
                        <motion.div
                          key={slide.id}
                          initial={{ opacity: 0, x: 60 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -60 }}
                          transition={{ duration: 0.45, ease: 'easeInOut' }}
                          className="absolute inset-0 cursor-pointer"
                          onClick={() => setSelectedArticle(slide)}
                        >
                          <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = '/assets/background.jpeg';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent hidden sm:block" />

                          {/* Slide Content */}
                          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-12 text-white max-w-4xl">
                            <div className="flex flex-wrap items-center gap-2.5 mb-3">
                              <span className="px-3.5 py-1 rounded-full text-[11px] font-extrabold bg-elwafa-gold text-elwafa-ocean uppercase tracking-wider shadow-md">
                                {slide.category}
                              </span>
                              <span className="flex items-center gap-1 text-xs text-white/80 font-medium bg-black/30 backdrop-blur-md px-3 py-1 rounded-full">
                                <Calendar className="w-3.5 h-3.5 text-elwafa-gold" />
                                {slide.date}
                              </span>
                              <span className="text-xs text-white/70 hidden sm:inline">•</span>
                              <span className="text-xs text-white/80 hidden sm:inline">{slide.author}</span>
                            </div>

                            <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold leading-tight text-white mb-3 hover:text-elwafa-gold transition-colors">
                              {slide.title}
                            </h2>

                            <p className="text-xs sm:text-sm text-white/85 line-clamp-2 max-w-2xl leading-relaxed mb-4">
                              {slide.summary}
                            </p>

                            <div className="inline-flex items-center gap-2 text-xs font-bold text-elwafa-gold bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl backdrop-blur-md transition-all">
                              <span>Baca Ulasan Lengkap</span>
                              <ArrowRight className="w-4 h-4" />
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                {/* Left & Right Slide Buttons */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevSlide();
                  }}
                  aria-label="Slide Sebelumnya"
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md flex items-center justify-center transition-all border border-white/20 z-10 cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextSlide();
                  }}
                  aria-label="Slide Berikutnya"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md flex items-center justify-center transition-all border border-white/20 z-10 cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Slide Indicators Dots */}
                <div className="absolute bottom-4 right-6 sm:bottom-6 sm:right-10 flex items-center gap-2 z-10">
                  {sliderArticles.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      aria-label={`Ke slide ${i + 1}`}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        currentSlide === i ? 'w-8 bg-elwafa-gold' : 'w-2 bg-white/50 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* ---------------------------------------------------------- */}
            {/* SECTION 1: TERKINI (Horizontal Grid 3 Kolom)               */}
            {/* ---------------------------------------------------------- */}
            {terkiniList.length > 0 && (
              <section className="space-y-4">
                <SectionHeader title="TERKINI" subtitle="Update berita terbaru dan kegiatan santri Elwafa Center" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {terkiniList.map((art) => (
                    <ArticleCard key={art.id} article={art} onSelect={setSelectedArticle} />
                  ))}
                </div>
              </section>
            )}

            {/* ---------------------------------------------------------- */}
            {/* SECTION 2: SEPUTAR AL-AZHAR                               */}
            {/* ---------------------------------------------------------- */}
            {seputarAzharList.length > 0 && (
              <section className="space-y-4">
                <SectionHeader
                  title="SEPUTAR AL-AZHAR"
                  subtitle="Informasi resmi Universitas Al-Azhar, Ma'had Bu'uts, kurikulum turats, dan ujian Tahdid Mustawa"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {seputarAzharList.map((art) => (
                    <ArticleCard key={art.id} article={art} onSelect={setSelectedArticle} />
                  ))}
                </div>
              </section>
            )}

            {/* ---------------------------------------------------------- */}
            {/* SECTION 3: REKOMENDASI & PRESTASI                         */}
            {/* ---------------------------------------------------------- */}
            {rekomendasiList.length > 0 && (
              <section className="space-y-4">
                <SectionHeader
                  title="REKOMENDASI"
                  subtitle="Inspirasi prestasi santri, biografi tokoh alumni, dan keteladanan keilmuan Azhary"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {rekomendasiList.map((art) => (
                    <ArticleHorizontalCard key={art.id} article={art} onSelect={setSelectedArticle} />
                  ))}
                </div>
              </section>
            )}

            {/* ---------------------------------------------------------- */}
            {/* SECTION 4: KEGIATAN & PENDIDIKAN (Split 2 Kolom)          */}
            {/* ---------------------------------------------------------- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <SectionHeader title="KEGIATAN" subtitle="Rihlah ilmiah, olahraga, dan daurah santri" />
                <div className="space-y-3">
                  {kegiatanList.map((art) => (
                    <ArticleMiniRow key={art.id} article={art} onSelect={setSelectedArticle} />
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <SectionHeader title="PENDIDIKAN" subtitle="Panduan studi, Diktis Kemenag, dan tips persiapan" />
                <div className="space-y-3">
                  {pendidikanList.map((art) => (
                    <ArticleMiniRow key={art.id} article={art} onSelect={setSelectedArticle} />
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

const SectionHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="border-b-2 border-elwafa-ocean/10 pb-2.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
    <div className="flex items-center gap-2">
      <div className="w-2.5 h-5 bg-elwafa-teal rounded-sm" />
      <h2 className="text-lg sm:text-xl font-extrabold text-elwafa-ocean tracking-tight uppercase">
        {title}
      </h2>
    </div>
    {subtitle && (
      <span className="text-[11px] text-elwafa-text-muted">
        {subtitle}
      </span>
    )}
  </div>
);

const ArticleCard: React.FC<{ article: Article; onSelect: (art: Article) => void }> = ({ article, onSelect }) => (
  <motion.article
    whileHover={{ y: -4, transition: { duration: 0.2 } }}
    onClick={() => onSelect(article)}
    className="bg-white rounded-3xl border border-elwafa-surface-border overflow-hidden shadow-soft hover:shadow-elevated hover:border-elwafa-teal/40 transition-all cursor-pointer group flex flex-col justify-between"
  >
    <div>
      <div className="relative h-48 w-full overflow-hidden bg-elwafa-ocean-dark">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/assets/background.jpeg';
          }}
        />
        <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-white/95 text-elwafa-ocean shadow-xs uppercase tracking-wider">
          {article.category}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2.5 text-[11px] text-elwafa-text-muted mb-2">
          <span className="flex items-center gap-1 font-medium">
            <Calendar className="w-3.5 h-3.5 text-elwafa-teal" />
            {article.date}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 font-medium">
            <Clock className="w-3.5 h-3.5 text-elwafa-gold" />
            {article.readTime}
          </span>
        </div>

        <h3 className="text-sm sm:text-base font-bold text-elwafa-ocean mb-2 line-clamp-2 leading-snug group-hover:text-elwafa-teal transition-colors">
          {article.title}
        </h3>
        <p className="text-xs text-elwafa-text-muted leading-relaxed line-clamp-3">
          {article.summary}
        </p>
      </div>
    </div>

    <div className="p-5 pt-0 border-t border-elwafa-surface-border mt-2 flex items-center justify-between text-xs font-bold text-elwafa-teal">
      <span>Baca Selengkapnya</span>
      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </div>
  </motion.article>
);

const ArticleHorizontalCard: React.FC<{ article: Article; onSelect: (art: Article) => void }> = ({ article, onSelect }) => (
  <div
    onClick={() => onSelect(article)}
    className="p-4 sm:p-5 bg-white rounded-3xl border border-elwafa-surface-border hover:border-elwafa-teal/40 hover:shadow-elevated transition-all cursor-pointer group flex flex-col sm:flex-row gap-4 items-stretch"
  >
    <div className="w-full sm:w-48 h-40 rounded-2xl overflow-hidden bg-elwafa-surface shrink-0 relative">
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = '/assets/background.jpeg';
        }}
      />
      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-elwafa-gold text-elwafa-ocean uppercase">
        {article.category}
      </span>
    </div>

    <div className="flex-1 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 text-[11px] text-elwafa-text-muted mb-1.5">
          <span>{article.date}</span>
          <span>•</span>
          <span>{article.author}</span>
        </div>
        <h3 className="text-sm sm:text-base font-extrabold text-elwafa-ocean leading-snug group-hover:text-elwafa-teal transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-xs text-elwafa-text-muted leading-relaxed line-clamp-2 mt-2">
          {article.summary}
        </p>
      </div>

      <div className="pt-3 border-t border-elwafa-surface-border mt-3 flex items-center justify-between text-xs font-bold text-elwafa-teal">
        <span>Baca Profil →</span>
        <span className="text-[10px] text-elwafa-text-muted font-normal">{article.readTime}</span>
      </div>
    </div>
  </div>
);

const ArticleMiniRow: React.FC<{ article: Article; onSelect: (art: Article) => void }> = ({ article, onSelect }) => (
  <div
    onClick={() => onSelect(article)}
    className="p-3 bg-white rounded-2xl border border-elwafa-surface-border hover:border-elwafa-teal/30 hover:shadow-2xs transition-all cursor-pointer group flex items-center gap-3"
  >
    <div className="w-20 h-16 rounded-xl overflow-hidden bg-elwafa-surface shrink-0">
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = '/assets/background.jpeg';
        }}
      />
    </div>

    <div className="min-w-0 flex-1">
      <h4 className="text-xs font-bold text-elwafa-ocean line-clamp-2 leading-snug group-hover:text-elwafa-teal transition-colors">
        {article.title}
      </h4>
      <div className="flex items-center gap-2 text-[10px] text-elwafa-text-muted mt-1">
        <span>{article.date}</span>
        <span>•</span>
        <span className="text-elwafa-teal font-semibold">{article.category}</span>
      </div>
    </div>

    <ArrowRight className="w-3.5 h-3.5 text-elwafa-text-muted group-hover:text-elwafa-teal group-hover:translate-x-0.5 transition-all shrink-0" />
  </div>
);

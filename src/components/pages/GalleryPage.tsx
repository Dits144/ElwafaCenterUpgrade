import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, ZoomIn, Calendar, MapPin, Tag } from 'lucide-react';

interface GalleryItem {
  id: number;
  image: string;
  title: string;
  category: 'Foto Bersama' | 'Ziarah Bulanan' | 'Makan Bersama' | 'Karantina Bahasa' | 'Keberangkatan';
  desc: string;
  date: string;
}

const GALLERY_DATA: GalleryItem[] = [
  { id: 1, image: '/assets/gallery/1.jpeg', title: 'Rihlah Ilmiah ke Perpustakaan Alexandria', category: 'Foto Bersama', desc: 'Sesi dokumentasi santri Elwafa Center di pelataran Bibliotheca Alexandrina di tepi Laut Mediterania.', date: 'Oktober 2025' },
  { id: 2, image: '/assets/gallery/2.jpeg', title: 'Rihlah Edukatif ke Istana Montaza Alexandria', category: 'Ziarah Bulanan', desc: 'Rihlah sejarah menelusuri arsitektur megah Istana Al-Haramlik di pesisir Alexandria Mesir.', date: 'November 2025' },
  { id: 3, image: '/assets/gallery/3.jpeg', title: 'Momen Kebersamaan Santri di Alexandria', category: 'Makan Bersama', desc: 'Menjalin ukhuwah islamiyyah dan keakraban antar santri bimbingan Elwafa di Mesir.', date: 'Desember 2025' },
  { id: 4, image: '/assets/gallery/4.jpeg', title: 'Panorama Pesisir Laut Mediterania Alexandria', category: 'Ziarah Bulanan', desc: 'Tadabbur alam santri menikmati keindahan panorama pantai dan sejarah peradaban Islam di Alexandria.', date: 'Januari 2026' },
  { id: 5, image: '/assets/gallery/5.jpeg', title: 'Ziarah Maqam Masyaikh & Ulama di Kairo', category: 'Ziarah Bulanan', desc: 'Santri berbusana muslim rapi berziarah di depan gerbang bersejarah Mamluk dan kubah auliya di Kairo.', date: 'Januari 2026' },
  { id: 6, image: '/assets/gallery/6.jpeg', title: 'Ukhuwah Santri di Kompleks Bersejarah Kairo', category: 'Foto Bersama', desc: 'Foto bersama di depan fasad megah berarsitektur Mamluk dengan ukiran muqarnas bersejarah.', date: 'Februari 2026' },
  { id: 7, image: '/assets/gallery/7.jpeg', title: 'Lawatan Ilmiah ke Perpustakaan Alexandria', category: 'Foto Bersama', desc: 'Mengenal khazanah peradaban literatur dunia dan manuskrip Islam di Bibliotheca Alexandrina.', date: 'Maret 2026' },
  { id: 8, image: '/assets/gallery/8.jpeg', title: 'Eksplorasi Sejarah Kota Alexandria', category: 'Ziarah Bulanan', desc: 'Menelusuri jejak para perawi hadits dan ulama besar yang pernah bermukim di Alexandria.', date: 'April 2026' },
  { id: 9, image: '/assets/gallery/9.jpeg', title: 'Ziarah Rombongan Santri di Kairo', category: 'Keberangkatan', desc: 'Rombongan santri baru Elwafa disambut oleh tim pendamping dan diajak orientasi situs bersejarah.', date: 'Mei 2026' },
  { id: 10, image: '/assets/gallery/10.jpeg', title: 'Doa Khidmat di Maqam Para Auliya Kairo', category: 'Ziarah Bulanan', desc: 'Suasana hening bertafakkur di makam senotaf marmer berukir kaligrafi indah berarsitektur ablaq.', date: 'Juni 2026' },
  { id: 11, image: '/assets/gallery/11.jpeg', title: 'Suasana Belajar Mandiri Masisir di Kairo', category: 'Karantina Bahasa', desc: 'Mahasiswa Indonesia di Mesir (Masisir) belajar intensif di aula atrium berhias bendera Mesir.', date: 'Juli 2026' },
  { id: 12, image: '/assets/gallery/12.jpeg', title: 'Halaqah Diskusi Ilmiah Antar Mahasiswa Kairo', category: 'Karantina Bahasa', desc: 'Diskusi kelompok mendalami muqarrar kuliah dan qawaid bahasa Arab di ruang belajar bersama.', date: 'Agustus 2026' },
  { id: 13, image: '/assets/gallery/13.jpeg', title: 'Kajian Akademik & Mudzakarah Santri Kairo', category: 'Karantina Bahasa', desc: 'Santri bimbingan Elwafa tekun mempersiapkan ujian semester dan tahdid mustawa di Kairo.', date: 'September 2026' },
  { id: 14, image: '/assets/gallery/14.jpeg', title: 'Suasana Study Hall Terpadu Masisir di Kairo', category: 'Foto Bersama', desc: 'Potret atmosfer ruang belajar modern bertingkat yang dipenuhi puluhan mahasiswa Indonesia di Mesir.', date: 'Oktober 2026' },
];

export const GalleryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxItem(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const categories = [
    { id: 'ALL', label: 'Semua Galeri' },
    { id: 'Foto Bersama', label: 'Foto Bersama' },
    { id: 'Ziarah Bulanan', label: 'Ziarah Bulanan' },
    { id: 'Makan Bersama', label: 'Makan Bersama & Asrama' },
    { id: 'Karantina Bahasa', label: 'Karantina Bahasa' },
    { id: 'Keberangkatan', label: 'Keberangkatan Kairo' },
  ];

  const filteredItems = activeCategory === 'ALL'
    ? GALLERY_DATA
    : GALLERY_DATA.filter((item) => item.category === activeCategory);

  return (
    <div className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-elwafa-teal/10 border border-elwafa-teal/20 text-elwafa-teal text-xs font-bold uppercase tracking-widest mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>Dokumentasi Kegiatan</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-elwafa-ocean tracking-tight">
            Galeri Santri Elwafa Center
          </h1>
          <div className="w-16 h-1 bg-elwafa-gold mx-auto mt-3 rounded-full" />
          <p className="mt-4 text-xs sm:text-sm text-elwafa-text-muted leading-relaxed">
            Potret nyata aktivitas santri selama masa karantina di asrama Indonesia hingga kehidupan akademik dan ziarah keilmuan di Kairo Mesir.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === c.id
                  ? 'bg-elwafa-ocean text-white shadow-sm'
                  : 'bg-elwafa-surface text-elwafa-text-muted hover:text-elwafa-ocean hover:bg-elwafa-surface-subtle border border-elwafa-surface-border'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Masonry-Style Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              onClick={() => setLightboxItem(item)}
              className="bg-white rounded-2xl border border-elwafa-surface-border overflow-hidden shadow-soft hover:shadow-elevated hover:border-elwafa-teal/50 transition-all cursor-pointer group flex flex-col"
            >
              <div className="relative aspect-4/3 w-full overflow-hidden bg-elwafa-ocean-dark">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/assets/background.jpeg';
                  }}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-2.5 rounded-full bg-white/90 text-elwafa-ocean shadow-md">
                    <ZoomIn className="w-5 h-5" />
                  </span>
                </div>
                <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-white/90 text-elwafa-ocean shadow-xs">
                  {item.category}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-elwafa-ocean line-clamp-2 group-hover:text-elwafa-teal transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-elwafa-text-muted mt-1 line-clamp-2">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-elwafa-surface-border flex items-center justify-between text-[10px] text-elwafa-text-muted">
                  <span className="flex items-center gap-1 font-medium">
                    <Calendar className="w-3 h-3 text-elwafa-teal" />
                    {item.date}
                  </span>
                  <span className="font-semibold text-elwafa-teal">Klik untuk perbesar</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxItem && (
          <div
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setLightboxItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-white/20 flex flex-col"
            >
              <div className="relative bg-black flex items-center justify-center max-h-[60vh] overflow-hidden">
                <img
                  src={lightboxItem.image}
                  alt={lightboxItem.title}
                  className="max-h-[60vh] w-auto object-contain"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/assets/background.jpeg';
                  }}
                />
                <button
                  onClick={() => setLightboxItem(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-elwafa-teal/10 text-elwafa-teal">
                    {lightboxItem.category}
                  </span>
                  <span className="text-xs text-elwafa-text-muted flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {lightboxItem.date}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-elwafa-ocean mb-1">
                  {lightboxItem.title}
                </h3>
                <p className="text-xs text-elwafa-text-muted leading-relaxed">
                  {lightboxItem.desc}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

import React from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, Image as ImageIcon } from 'lucide-react';

export const ActivitiesSection: React.FC = () => {
  const { activities } = useApp();

  // Foto dokumentasi asli dari direktori gallery
  const galleryPhotos = [
    { src: '/assets/gallery/1.jpeg', title: 'Halaqah Al-Qur\'an Bersanad' },
    { src: '/assets/gallery/2.jpeg', title: 'Pembinaan Nahwu & Sharaf' },
    { src: '/assets/gallery/3.jpeg', title: 'Simulasi Muqabalah Lisan' },
    { src: '/assets/gallery/4.jpeg', title: 'Karantina Bahasa Arab Fusha' },
    { src: '/assets/gallery/5.jpeg', title: 'Bimbingan Kitab Turats' },
    { src: '/assets/gallery/6.jpeg', title: 'Orientasi & Pelepasan Santri' },
  ];

  return (
    <section id="kegiatan" className="py-16 sm:py-20 bg-white border-b border-[#003B46]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-elwafa-gold block mb-2">
            Dokumentasi &amp; Galeri
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#003B46] tracking-tight">
            Kegiatan &amp; Pembinaan Santri
          </h2>
          <div className="w-16 h-1 bg-elwafa-gold mx-auto mt-3 rounded-full" />
          <p className="mt-3 text-xs sm:text-sm text-[#192A3D]/70">
            Potret nyata aktivitas belajar di asrama karantina, pembekalan masyaikh, dan simulasi ujian persiapan ke Mesir.
          </p>
        </div>

        {/* 3 Featured Event Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-14">
          {activities.map((act) => (
            <div
              key={act.id}
              className="bg-[#F9FBFA] rounded-2xl border border-[#DCE8E6] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="relative h-52 bg-[#003B46] overflow-hidden">
                <img
                  src={act.image}
                  alt={act.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/assets/background.jpeg';
                  }}
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-[#003B46]/90 backdrop-blur-md text-[10px] font-bold text-elwafa-gold border border-elwafa-gold/30">
                    {act.category}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mb-2">
                    <Calendar className="w-3.5 h-3.5 text-elwafa-teal" />
                    <span>{act.date}</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-extrabold text-[#003B46] mb-2 leading-snug">
                    {act.title}
                  </h3>
                  <p className="text-xs text-[#192A3D]/75 leading-relaxed">
                    {act.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Galeri Foto Dokumentasi Santri */}
        <div className="pt-6 border-t border-[#DCE8E6]">
          <div className="flex items-center gap-2 mb-6">
            <ImageIcon className="w-5 h-5 text-elwafa-teal" />
            <h3 className="text-base sm:text-lg font-extrabold text-[#003B46]">
              Galeri Foto Asrama &amp; Pembinaan
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {galleryPhotos.map((photo, pIdx) => (
              <div
                key={pIdx}
                className="group relative h-36 sm:h-44 rounded-xl overflow-hidden bg-gray-100 border border-[#DCE8E6] shadow-xs"
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/assets/background.jpeg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2.5 flex items-end">
                  <span className="text-[10px] font-semibold text-white leading-tight">
                    {photo.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { Phone, Mail, MapPin, Globe, ShieldCheck, GraduationCap } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { setCurrentPage, setRole } = useApp();

  return (
    <footer className="bg-[#00262D] text-white pt-16 pb-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/logo-elwafa-horizontal-light.png"
                alt="Elwafa Internasional Center"
                className="h-14 w-auto object-contain transition-transform hover:scale-102"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            <p className="text-xs text-white/75 leading-relaxed max-w-sm">
              Kami akan terus berupaya memperkenalkan Universitas Al-Azhar lebih luas lagi, khususnya kepada generasi muda di tanah air Indonesia tercinta.
            </p>

            <div className="pt-2 text-xs text-white/80 space-y-2.5">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-elwafa-gold shrink-0" />
                <span>+62 812-2146-3946 / (+20) 155-856-3207</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-elwafa-teal-light shrink-0" />
                <span>elwafacenter73@gmail.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-elwafa-gold shrink-0 mt-0.5" />
                <span className="text-[11px] text-white/70">
                  JL Perum Pondok Mutiara Blok D1/06 RT 003 RW 011 Sasakpanjang, Tajurhalang, Kab. Bogor, Jawa Barat
                </span>
              </div>
            </div>
          </div>

          {/* Halaman Utama */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-elwafa-gold">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <button onClick={() => setCurrentPage('beranda')} className="hover:text-white transition-colors">
                  Beranda Utama
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('program')} className="hover:text-white transition-colors">
                  Program Studi &amp; Kuota
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('tentang')} className="hover:text-white transition-colors">
                  Tentang Elwafa Center
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('kegiatan')} className="hover:text-white transition-colors">
                  Galeri &amp; Aktivitas Santri
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('artikel')} className="hover:text-white transition-colors">
                  Berita &amp; Artikel
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('kontak')} className="hover:text-white transition-colors">
                  Informasi Kontak
                </button>
              </li>
            </ul>
          </div>

          {/* Program Studi */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-elwafa-gold">
              Program Studi
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <button onClick={() => setCurrentPage('program')} className="hover:text-white transition-colors text-left">
                  S1 Universitas Al-Azhar Kairo
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('program')} className="hover:text-white transition-colors text-left">
                  Ma'had Bu'uts Al-Azhar (SMP-SMA)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('program')} className="hover:text-white transition-colors text-left">
                  Markaz Lughoh &amp; Tahfidz Mutqin
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('program')} className="hover:text-white transition-colors text-left">
                  Karantina Bahasa Arab 24 Jam
                </button>
              </li>
            </ul>
          </div>

          {/* Portal Akses */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-elwafa-gold">
              Akses Portal Demo
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <button
                  onClick={() => setRole('student')}
                  className="flex items-center gap-1.5 text-elwafa-teal-light hover:underline font-bold"
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Portal Calon Mahasiswa</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setRole('admin')}
                  className="flex items-center gap-1.5 text-elwafa-gold hover:underline font-bold"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Portal Admin Verifikator</span>
                </button>
              </li>
              <li className="pt-2 text-[11px] text-white/50">
                Cairo Office: Nasr City 10th District, Cairo, Egypt
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <p>© 2025-2026 PT Elwafa Center. All Rights Reserved.</p>
          <p className="text-[11px] text-white/40">Pusat Pembinaan &amp; Konsultan Pendidikan Studi Al-Azhar Kairo</p>
        </div>

      </div>
    </footer>
  );
};

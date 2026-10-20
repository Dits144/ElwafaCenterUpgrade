import React from 'react';
import { Phone, Mail, MapPin, Globe, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#00262D] text-white pt-16 pb-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/Logo-Website-2.1.png"
                alt="Elwafa Center"
                className="h-12 w-auto bg-white p-1 rounded-xl object-contain"
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
                <span>+62 851-8844-5164</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-elwafa-teal-light shrink-0" />
                <span>elwafacenter73@gmail.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-elwafa-gold shrink-0 mt-0.5" />
                <span className="text-[11px] text-white/70">
                  Ruko Sentra Residence 37, Tajurhalang, Kab. Bogor, Jawa Barat 16320
                </span>
              </div>
            </div>
          </div>

          {/* Program Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-elwafa-gold">
              Program Studi
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li><a href="#program" className="hover:text-white transition-colors">SMP-SMA Ma'had Al-Azhar</a></li>
              <li><a href="#program" className="hover:text-white transition-colors">Kuliah S1 Al-Azhar Kairo</a></li>
              <li><a href="#program" className="hover:text-white transition-colors">Kuliah Erciyes University Turki</a></li>
              <li><a href="#program" className="hover:text-white transition-colors">Kuliah IIUM Malaysia</a></li>
              <li><a href="#program" className="hover:text-white transition-colors">Program Bimbel &amp; Tahfidz</a></li>
            </ul>
          </div>

          {/* Layanan Pembinaan */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-elwafa-gold">
              Layanan Kami
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li>Matrikulasi Bahasa Arab Fusha</li>
              <li>Asrama Karantina Ciamis</li>
              <li>Pemberkasan Kemenag &amp; Kemlu</li>
              <li>Apostille Kemenkumham RI</li>
              <li>Penjemputan &amp; Flat Asrama Kairo</li>
            </ul>
          </div>

          {/* Legalitas & Portal */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-elwafa-gold">
              Legalitas &amp; Portal
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li className="text-[11px] text-white/60">
                PT Elwafa Internasional Center
              </li>
              <li className="text-[11px] text-white/60">
                AHU-0070290.AH.01.01.TAHUN 2025
              </li>
              <li className="pt-2">
                <a href="#beranda" className="text-elwafa-teal-light hover:underline font-bold block">
                  Portal Mahasiswa
                </a>
              </li>
              <li>
                <a href="#beranda" className="text-elwafa-gold hover:underline font-bold block">
                  Portal Verifikator Admin
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <p>© 2027-2028 PT Elwafa Internasional Center. All Rights Reserved.</p>
          <p className="text-[11px] text-white/40">Pusat Pembinaan &amp; Konsultan Pendidikan Luar Negeri</p>
        </div>

      </div>
    </footer>
  );
};

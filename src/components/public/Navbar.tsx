import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Menu, X, GraduationCap, ShieldCheck, ArrowRight, Phone, Mail } from 'lucide-react';

interface NavbarProps {
  onOpenRegisterModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRegisterModal }) => {
  const { setRole } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm transition-all border-b border-[#003B46]/10">
      {/* Top Bar Asli elwafacenter.com */}
      <div className="bg-[#003B46] text-white text-xs py-2 px-4 border-b border-[#00262D]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <a
              href="https://wa.me/6285188445164"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-white/90 hover:text-elwafa-gold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-elwafa-gold" />
              <span>+62 851-8844-5164</span>
            </a>
            <span className="text-white/30">|</span>
            <a
              href="mailto:elwafacenter73@gmail.com"
              className="flex items-center gap-1.5 text-white/90 hover:text-elwafa-gold transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-elwafa-teal-light" />
              <span>elwafacenter73@gmail.com</span>
            </a>
          </div>

          <div className="text-[11px] text-white/80 hidden md:block">
            Pusat Pembinaan & Konsultan Resmi Studi Universitas Al-Azhar Kairo Mesir
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo Asli */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img
            src="/assets/Logo-Website-2.1.png"
            alt="Elwafa Center"
            className="h-12 sm:h-14 w-auto object-contain"
          />
        </div>

        {/* Menu Items Asli elwafacenter.com */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-bold text-[#192A3D]">
          <a href="#beranda" className="hover:text-elwafa-teal transition-colors py-2 border-b-2 border-transparent hover:border-elwafa-teal">Beranda</a>
          <a href="#program" className="hover:text-elwafa-teal transition-colors py-2 border-b-2 border-transparent hover:border-elwafa-teal">Program Kami</a>
          <a href="#tentang" className="hover:text-elwafa-teal transition-colors py-2 border-b-2 border-transparent hover:border-elwafa-teal">Tentang Kami</a>
          <a href="#kegiatan" className="hover:text-elwafa-teal transition-colors py-2 border-b-2 border-transparent hover:border-elwafa-teal">Kegiatan</a>
          <a href="#testimoni" className="hover:text-elwafa-teal transition-colors py-2 border-b-2 border-transparent hover:border-elwafa-teal">Testimoni</a>
          <a href="#kontak" className="hover:text-elwafa-teal transition-colors py-2 border-b-2 border-transparent hover:border-elwafa-teal">Kontak</a>
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden lg:flex items-center gap-2.5">
          <button
            onClick={() => setRole('student')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-[#003B46] bg-[#EEF5F4] hover:bg-elwafa-teal/15 transition-all border border-[#DCE8E6]"
          >
            <GraduationCap className="w-4 h-4 text-elwafa-teal" />
            <span>Portal Mahasiswa</span>
          </button>

          <button
            onClick={() => setRole('admin')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-[#003B46] bg-[#FFF9E6] hover:bg-elwafa-gold/30 transition-all border border-elwafa-gold/40"
          >
            <ShieldCheck className="w-4 h-4 text-elwafa-ocean" />
            <span>Portal Admin</span>
          </button>

          <button
            onClick={onOpenRegisterModal}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-elwafa-teal hover:bg-elwafa-teal-dark shadow-sm hover:shadow transition-all"
          >
            <span>Daftar Sekarang</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-elwafa-text-main hover:bg-elwafa-surface-subtle rounded-xl"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-elwafa-surface-border bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-elwafa-surface-border">
            <button
              onClick={() => {
                setRole('student');
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold text-elwafa-ocean bg-elwafa-surface-subtle"
            >
              <GraduationCap className="w-4 h-4 text-elwafa-teal" />
              <span>Portal Mahasiswa</span>
            </button>

            <button
              onClick={() => {
                setRole('admin');
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold text-elwafa-ocean-dark bg-elwafa-gold/20"
            >
              <ShieldCheck className="w-4 h-4 text-elwafa-ocean" />
              <span>Portal Admin</span>
            </button>
          </div>

          <div className="flex flex-col space-y-2 text-sm font-semibold text-elwafa-text-main">
            <a href="#beranda" onClick={() => setMobileMenuOpen(false)} className="py-1.5 hover:text-elwafa-teal">Beranda</a>
            <a href="#program" onClick={() => setMobileMenuOpen(false)} className="py-1.5 hover:text-elwafa-teal">Program Kami</a>
            <a href="#tentang" onClick={() => setMobileMenuOpen(false)} className="py-1.5 hover:text-elwafa-teal">Tentang Kami</a>
            <a href="#kegiatan" onClick={() => setMobileMenuOpen(false)} className="py-1.5 hover:text-elwafa-teal">Kegiatan</a>
            <a href="#testimoni" onClick={() => setMobileMenuOpen(false)} className="py-1.5 hover:text-elwafa-teal">Testimoni</a>
            <a href="#kontak" onClick={() => setMobileMenuOpen(false)} className="py-1.5 hover:text-elwafa-teal">Kontak</a>
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenRegisterModal();
            }}
            className="w-full mt-2 py-3 rounded-xl text-center font-bold text-sm text-white bg-elwafa-teal shadow"
          >
            Daftar Seleksi Calon Mahasiswa
          </button>
        </div>
      )}
    </header>
  );
};

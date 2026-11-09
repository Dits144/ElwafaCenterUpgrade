import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { PublicPage } from '../../types';
import { Menu, X, GraduationCap, ShieldCheck, ArrowRight, Phone, Mail } from 'lucide-react';

interface NavbarProps {
  onOpenRegisterModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRegisterModal }) => {
  const { role, setRole, currentPage, setCurrentPage } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PublicPage; label: string }[] = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'program', label: 'Program Kami' },
    { id: 'tentang', label: 'Tentang Kami' },
    { id: 'kegiatan', label: 'Galeri Kegiatan' },
    { id: 'artikel', label: 'Berita & Artikel' },
    { id: 'kontak', label: 'Kontak' },
  ];

  const handleNavClick = (pageId: PublicPage) => {
    setCurrentPage(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md shadow-2xs transition-all border-b border-[#003B46]/10">
      {/* Top Bar Informasi Resmi elwafacenter.com */}
      <div className="bg-[#003B46] text-white text-xs py-2 px-4 border-b border-[#00262D]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <a
              href="https://wa.me/6281221463946"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-white/90 hover:text-elwafa-gold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-elwafa-gold" />
              <span>+62 812-2146-3946</span>
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

          <div className="text-[11px] text-white/80 hidden md:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Informasi studi dan program pembinaan Elwafa Center</span>
          </div>
        </div>
      </div>

      {/* Main Glassmorphic Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo Asli - Seamless Transparent Background */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => handleNavClick('beranda')}
        >
          <img
            src="/assets/logo-elwafa-horizontal-dark.png"
            alt="Elwafa Internasional Center"
            className="h-12 sm:h-14 w-auto object-contain transition-transform group-hover:scale-102"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/assets/logo-elwafa-vertical-transparent.png';
            }}
          />
        </div>

        {/* Desktop Menu Items with Framer Motion Active Pill (Inspired by Syahdi Cargo) */}
        <nav className="hidden lg:flex items-center gap-1 p-1.5 bg-elwafa-surface/80 border border-elwafa-surface-border rounded-2xl text-xs font-bold text-elwafa-ocean shadow-2xs">
          {navLinks.map((link) => {
            const isActive = role === 'visitor' && currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`relative px-4 py-2 rounded-xl transition-all select-none ${
                  isActive
                    ? 'text-white'
                    : 'text-elwafa-text-muted hover:text-elwafa-ocean hover:bg-white/50'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav-pill"
                    className="absolute inset-0 bg-elwafa-ocean rounded-xl shadow-xs"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={() => setCurrentPage('login')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
              currentPage === 'login'
                ? 'bg-elwafa-ocean text-white border-elwafa-ocean shadow-xs'
                : 'text-[#003B46] bg-[#EEF5F4] hover:bg-elwafa-teal/15 border-[#DCE8E6]'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-elwafa-teal" />
            <span>Portal Masuk Demo</span>
          </button>

          <button
            onClick={onOpenRegisterModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-elwafa-teal hover:bg-elwafa-teal-dark shadow-sm hover:shadow transition-all"
          >
            <span>Daftar Seleksi</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu hamburger toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-elwafa-text-main hover:bg-elwafa-surface-subtle rounded-xl"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-elwafa-surface-border bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="pb-3 border-b border-elwafa-surface-border">
            <button
              onClick={() => {
                setCurrentPage('login');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-elwafa-ocean shadow-xs"
            >
              <GraduationCap className="w-4 h-4 text-elwafa-gold" />
              <span>Masuk Portal Demo (Mahasiswa &amp; Admin)</span>
            </button>
          </div>

          <div className="flex flex-col gap-1 text-sm font-bold text-elwafa-ocean">
            {navLinks.map((link) => {
              const isActive = role === 'visitor' && currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left py-2 px-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-elwafa-ocean text-white font-extrabold'
                      : 'hover:bg-elwafa-surface text-elwafa-text-muted hover:text-elwafa-ocean'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-elwafa-surface-border">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegisterModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-elwafa-teal text-white font-bold text-xs shadow-sm"
            >
              <span>Daftar Seleksi Santri Baru</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { ArrowRight, Compass, ShieldCheck, GraduationCap, Sparkles, BookOpen, MapPin, CheckCircle2, ChevronRight, Award } from 'lucide-react';

interface HeroProps {
  onOpenRegisterModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRegisterModal }) => {
  const { setCurrentPage } = useApp();

  // State for the interactive fast-track navigator console
  const [eduOrigin, setEduOrigin] = useState<'pesantren' | 'ma_sma' | 'umum'>('pesantren');
  const [targetFaculty, setTargetFaculty] = useState<'syariah' | 'ushuluddin' | 'mahad' | 'lughah'>('syariah');

  const handleConsultTrack = () => {
    setCurrentPage('program');
  };

  return (
    <section id="beranda" className="relative overflow-hidden bg-[#F8F6F0] pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Architectural geometry rather than ambient gradient blobs. */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-12 h-96 w-96 rotate-45 border border-[#C6A76A]/25 lg:h-[520px] lg:w-[520px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-12 h-96 w-96 rotate-45 scale-75 border border-[#C6A76A]/20 lg:h-[520px] lg:w-[520px]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[#C6A76A]/30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ============================================================== */}
        {/* 1. TOP EDITORIAL STANCE & STATUS RIBBON (NON-AFWAJA)           */}
        {/* ============================================================== */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          
          {/* Status Ribbon with Animated Pulse Beacon */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 border border-elwafa-teal/25 text-elwafa-ocean text-xs font-semibold shadow-2xs backdrop-blur-xs"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="font-bold text-elwafa-teal">Indonesia → Kairo Mesir</span>
            <span className="text-elwafa-ocean/30">|</span>
            <span className="text-elwafa-text-muted">Bimbingan Studi Al-Azhar Terbimbing</span>
          </motion.div>

          {/* Master Architectural Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-[clamp(2.6rem,6vw,5.4rem)] font-semibold text-[#123C35] tracking-tight leading-[0.98]"
          >
            Wujudkan Impian Kuliah di{' '}
            <span className="block mt-1 sm:mt-2 italic text-[#1E5447]">
              Universitas Al-Azhar Kairo Mesir
            </span>
          </motion.h1>

          {/* Authentic Paragraph requested by user */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base lg:text-lg text-elwafa-text-muted leading-relaxed font-normal max-w-3xl mx-auto"
          >
            Elwafa Center mendampingi persiapan pendidikan dan pengembangan diri melalui program pembinaan yang terarah. Jelajahi program yang tersedia dan konsultasikan pilihan studi sesuai kebutuhan Anda.
          </motion.p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <button onClick={() => setCurrentPage('program')} className="group inline-flex min-h-11 items-center gap-3 rounded-full bg-[#123C35] px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123C35]">Jelajahi Program <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></button>
            <button onClick={() => setCurrentPage('tentang')} className="inline-flex min-h-11 items-center rounded-full border border-[#123C35]/30 px-6 py-3 text-sm font-semibold text-[#123C35] transition-colors hover:bg-[#123C35]/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123C35]">Tentang Elwafa</button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 2. INTERACTIVE FAST-TRACK CONSOLE (INTEGRATED ROUTE FINDER)    */}
        {/* ============================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.28 }}
          className="mt-8 max-w-4xl mx-auto"
        >
          <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-elwafa-surface-border shadow-elevated">
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
              
              {/* Origin selector */}
              <div className="md:col-span-4">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-elwafa-ocean/70 mb-1.5 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-elwafa-teal" />
                  <span>Latar Belakang Pendidikan</span>
                </label>
                <select
                  value={eduOrigin}
                  onChange={(e) => setEduOrigin(e.target.value as any)}
                  className="w-full bg-[#F4F8F7] hover:bg-[#EEF5F4] border border-elwafa-surface-border rounded-xl px-3 py-2 text-xs font-bold text-elwafa-ocean focus:outline-none focus:ring-2 focus:ring-elwafa-teal/30 transition-all cursor-pointer"
                >
                  <option value="pesantren">Pondok Pesantren (Kulliyatul Mu'allimin)</option>
                  <option value="ma_sma">Madrasah Aliyah (MA) / SMA Umum</option>
                  <option value="umum">Lulusan Paket C / Gap Year</option>
                </select>
              </div>

              {/* Target faculty */}
              <div className="md:col-span-4">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-elwafa-ocean/70 mb-1.5 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-elwafa-gold" />
                  <span>Target Studi di Mesir</span>
                </label>
                <select
                  value={targetFaculty}
                  onChange={(e) => setTargetFaculty(e.target.value as any)}
                  className="w-full bg-[#F4F8F7] hover:bg-[#EEF5F4] border border-elwafa-surface-border rounded-xl px-3 py-2 text-xs font-bold text-elwafa-ocean focus:outline-none focus:ring-2 focus:ring-elwafa-teal/30 transition-all cursor-pointer"
                >
                  <option value="syariah">S1 Syariah Islamiyyah &amp; Hukum</option>
                  <option value="ushuluddin">S1 Ushuluddin (Tafsir, Hadits, Aqidah)</option>
                  <option value="lughah">S1 Bahasa Arab &amp; Sastra</option>
                  <option value="mahad">Ma'had Bu'uts Al-Azhar (SMP-SMA)</option>
                </select>
              </div>

              {/* Action buttons */}
              <div className="md:col-span-4 flex items-center gap-2 pt-1 md:pt-5">
                <button
                  type="button"
                  onClick={handleConsultTrack}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-elwafa-ocean hover:bg-elwafa-ocean-light text-white text-xs font-bold shadow-xs transition-all"
                >
                  <span>Cek Kuota Jalur</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={onOpenRegisterModal}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-elwafa-teal hover:bg-elwafa-teal-dark text-white text-xs font-bold shadow-xs transition-all"
                >
                  <span>Daftar Seleksi</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

            {/* Quick Navigation link to Demo Login */}
            <div className="mt-3 pt-3 border-t border-elwafa-surface-border flex flex-wrap items-center justify-between text-xs text-elwafa-text-muted gap-2">
              <span className="flex items-center gap-1.5 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Pendaftaran Angkatan 2026/2027 Resmi Dibuka</span>
              </span>

              <button
                type="button"
                onClick={() => setCurrentPage('login')}
                className="text-[11px] font-bold text-elwafa-teal hover:text-elwafa-ocean flex items-center gap-1 transition-colors"
              >
                <span>Sudah mendaftar? Masuk Portal Demo Akun Santri / Admin</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* 3. MULTI-PERSPECTIVE ARCHITECTURAL BENTO SHOWCASE (NON-AFWAJA)  */}
        {/* ============================================================== */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* Bento Card 1 (Left): Karantina & Pembinaan Talaqqi Kitab */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="lg:col-span-4 bg-white rounded-3xl p-5 border border-elwafa-surface-border shadow-elevated flex flex-col justify-between group hover:shadow-xl transition-all"
          >
            <div>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] mb-4 bg-elwafa-surface">
                <img
                  src="/assets/gallery/9.jpeg"
                  alt="Daurah Talaqqi Kitab Turats Santri Elwafa Center"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/assets/gallery/14.jpeg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="px-2.5 py-1 rounded-lg bg-elwafa-teal/90 text-[10px] font-bold uppercase tracking-wider">
                    Talaqqi &amp; Biah Arabiyyah
                  </span>
                  <p className="text-xs font-bold mt-1 text-white/95">
                    Halaqah Kitab Turats Bersanad
                  </p>
                </div>
              </div>

              <h3 className="text-base font-extrabold text-elwafa-ocean">
                Daurah &amp; Pembinaan Talaqqi
              </h3>
              <p className="text-xs text-elwafa-text-muted mt-2 leading-relaxed">
                Santri dibina langsung membaca kitab turats, pendalaman qawaid nahwu-sharaf, serta tahfidz mutqin sebelum mengikuti seleksi resmi.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-elwafa-surface-border flex items-center justify-between text-xs">
              <span className="font-bold text-elwafa-ocean">Sanad Mutashil</span>
              <button
                onClick={() => setCurrentPage('program')}
                className="text-elwafa-teal hover:underline font-bold text-[11px]"
              >
                Lihat Kurikulum →
              </button>
            </div>
          </motion.div>

          {/* Bento Card 2 (Center - Featured Stage): Calon Mahasiswa & Keberangkatan Al-Azhar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-5 bg-gradient-to-b from-elwafa-ocean via-[#004A58] to-elwafa-ocean text-white rounded-3xl p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between"
          >
            {/* Ambient inner glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-elwafa-teal/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-elwafa-gold/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-elwafa-gold text-xs font-bold backdrop-blur-xs border border-white/10">
                  <Award className="w-3.5 h-3.5" />
                  <span>Studi Terbimbing Al-Azhar Kairo</span>
                </span>

                <span className="text-[11px] text-white/70">Wisma Nusantara</span>
              </div>

              {/* Santri Image Showcase with ambient frame */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-black/30 border border-white/10 my-3">
                <img
                  src="/assets/before footer.jpeg"
                  alt="Mahasiswa Al-Azhar Kairo Elwafa Center"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/assets/8.jpeg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00262D]/90 via-transparent to-transparent" />
                
                {/* Floating telemetry tag */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <div>
                    <div className="font-bold text-xs">Pelepasan &amp; Pendampingan Mesir</div>
                    <div className="text-[10px] text-white/80">Distrik 10 Nasr City, Kairo</div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/80 text-[10px] font-bold">
                    Resmi Terbimbing
                  </span>
                </div>
              </div>

              <h3 className="text-lg font-extrabold text-white mt-3">
                Dari Tanah Air Sampai Kuliah di Kairo
              </h3>
              <p className="text-xs text-white/80 mt-1 leading-relaxed">
                Pendampingan lengkap: berkas terjemah tersumpah, legalisasi Kemenag &amp; Kemenlu, visa pelajar, tiket, penjemputan bandara Kairo, hingga penempatan asrama.
              </p>
            </div>

            <div className="relative z-10 mt-5 pt-4 border-t border-white/15 flex items-center justify-between">
              <button
                type="button"
                onClick={onOpenRegisterModal}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-elwafa-gold hover:bg-amber-400 text-elwafa-ocean font-extrabold text-xs shadow-md transition-all"
              >
                <span>Daftar Seleksi Santri Baru</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setCurrentPage('tentang')}
                className="text-xs text-white/80 hover:text-white font-semibold transition-colors"
              >
                Tentang Kami →
              </button>
            </div>
          </motion.div>

          {/* Bento Card 3 (Right): Ujian Seleksi Kemenag / Pusiba & Hasil */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="lg:col-span-3 bg-white rounded-3xl p-5 border border-elwafa-surface-border shadow-elevated flex flex-col justify-between group hover:shadow-xl transition-all"
          >
            <div>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] mb-4 bg-elwafa-surface">
                <img
                  src="/assets/articles/DSC03995-scaled.jpg"
                  alt="Simulasi Ujian CBT Calon Mahasiswa Al-Azhar"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/assets/gallery/14.jpeg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="px-2.5 py-1 rounded-lg bg-elwafa-gold text-elwafa-ocean text-[10px] font-extrabold uppercase tracking-wider">
                    Simulasi CBT &amp; CAT Resmi
                  </span>
                  <p className="text-xs font-bold mt-1 text-white/95">
                    Tryout Berkala Sesuai Standar Diktis
                  </p>
                </div>
              </div>

              <h3 className="text-base font-extrabold text-elwafa-ocean">
                Kesiapan Ujian Diktis
              </h3>
              <p className="text-xs text-elwafa-text-muted mt-2 leading-relaxed">
                Latihan intensif Computer Assisted Test (CAT), pemahaman teks turats, dan wawancara bahasa Arab bersama masyaikh alumni Al-Azhar.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-elwafa-surface-border">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-bold text-elwafa-ocean">Tingkat Kelulusan</span>
                <span className="font-extrabold text-emerald-600">Teruji &amp; Terbimbing</span>
              </div>
              <div className="w-full bg-elwafa-surface rounded-full h-2 overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full w-[94%]" />
              </div>
            </div>
          </motion.div>

        </div>

        {/* ============================================================== */}
        {/* 4. BOTTOM ARCHITECTURAL TRUST PILLARS (SYAHDI CARGO INFLUENCE) */}
        {/* ============================================================== */}
        <div className="mt-10 pt-8 border-t border-elwafa-surface-border grid grid-cols-2 md:grid-cols-4 gap-4">
          
          <div className="bg-white/80 rounded-2xl p-3.5 border border-elwafa-surface-border shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-elwafa-teal/15 flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5 text-elwafa-teal" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-elwafa-ocean">500+ Calon Santri</div>
              <div className="text-[11px] text-elwafa-text-muted">Terbina &amp; Lolos Seleksi</div>
            </div>
          </div>

          <div className="bg-white/80 rounded-2xl p-3.5 border border-elwafa-surface-border shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-elwafa-gold/25 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-elwafa-ocean" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-elwafa-ocean">Masyaikh Al-Azhar</div>
              <div className="text-[11px] text-elwafa-text-muted">Talaqqi &amp; Sanad Bersambung</div>
            </div>
          </div>

          <div className="bg-white/80 rounded-2xl p-3.5 border border-elwafa-surface-border shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-elwafa-teal/15 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5 text-elwafa-teal" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-elwafa-ocean">Biah Arabiyyah</div>
              <div className="text-[11px] text-elwafa-text-muted">Karantina Bahasa 24 Jam</div>
            </div>
          </div>

          <div className="bg-white/80 rounded-2xl p-3.5 border border-elwafa-surface-border shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-elwafa-ocean/15 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-elwafa-ocean" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-elwafa-ocean">Kantor Kairo</div>
              <div className="text-[11px] text-elwafa-text-muted">Pendampingan di Mesir</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

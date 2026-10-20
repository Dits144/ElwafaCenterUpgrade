import React from 'react';
import { Home, Compass, ShieldCheck, Heart, BookOpen, Users, Award, MapPin } from 'lucide-react';

export const BoardingSystemSection: React.FC = () => {
  return (
    <section id="asrama" className="py-20 bg-elwafa-surface border-b border-elwafa-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elwafa-teal/10 text-elwafa-teal text-xs font-bold uppercase tracking-wider mb-3">
            <Home className="w-3.5 h-3.5" />
            <span>Sistem Pendidikan Berkelanjutan</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-elwafa-ocean tracking-tight">
            Sistem Asrama Terbimbing: Lebih dari Sekadar Tempat Tinggal
          </h2>
          <p className="mt-3 text-sm sm:text-base text-elwafa-text-muted">
            Membangun kedisiplinan mental dan kefasihan bahasa sejak di tanah air, serta memastikan keselamatan, kenyamanan, dan kelancaran studi sesampainya di Mesir.
          </p>
        </div>

        {/* 2 Pillars: Indonesia vs Kairo Mesir */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          
          {/* Card 1: Fondasi Kokoh di Indonesia (Wajib) */}
          <div className="bg-white rounded-3xl p-8 border border-elwafa-surface-border shadow-soft flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-elwafa-teal/5 rounded-bl-full pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-elwafa-teal/15 text-elwafa-teal flex items-center justify-center">
                  <Home className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full bg-elwafa-ocean text-white text-[11px] font-bold">
                  Fase 1: Di Indonesia (Wajib)
                </span>
              </div>

              <h3 className="text-xl font-bold text-elwafa-ocean mb-3">
                Fondasi Kokoh di Asrama Karantina
              </h3>

              <p className="text-xs sm:text-sm text-elwafa-text-muted leading-relaxed mb-6">
                Sebelum bertolak ke Mesir, seluruh santri wajib mengikuti karantina intensif di Pesantren Pembinaan Elwafa Center. Di sini kami membentuk fondasi mental, spiritual, dan bahasa fusha.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-xl bg-elwafa-surface-subtle flex items-center justify-center shrink-0 mt-0.5">
                    <Heart className="w-4 h-4 text-elwafa-teal" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-elwafa-ocean">Kesiapan Mental &amp; Kemandirian</h5>
                    <p className="text-[11px] text-elwafa-text-muted">Adaptasi kultur pesantren, adab penuntut ilmu, dan kebiasaan bangun qiyamul lail.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-xl bg-elwafa-surface-subtle flex items-center justify-center shrink-0 mt-0.5">
                    <BookOpen className="w-4 h-4 text-elwafa-teal" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-elwafa-ocean">Matrikulasi Bahasa &amp; Turats</h5>
                    <p className="text-[11px] text-elwafa-text-muted">Pematangan kaidah nahwu, sharaf, percakapan fusha, serta telaah kitab kuning standar Al-Azhar.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-xl bg-elwafa-surface-subtle flex items-center justify-center shrink-0 mt-0.5">
                    <Users className="w-4 h-4 text-elwafa-teal" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-elwafa-ocean">Pembangunan Ukhuwah Islamiyyah</h5>
                    <p className="text-[11px] text-elwafa-text-muted">Membangun ikatan persaudaraan erat antar sesama santri nusantara sebelum sama-sama merantau.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-elwafa-surface-border flex items-center gap-2 text-xs text-elwafa-text-muted">
              <MapPin className="w-4 h-4 text-elwafa-teal shrink-0" />
              <span>Lokasi: Pesantren Pembinaan Ciamis &amp; Bogor, Jawa Barat</span>
            </div>
          </div>

          {/* Card 2: Pendampingan Penuh di Mesir */}
          <div className="bg-white rounded-3xl p-8 border border-elwafa-surface-border shadow-soft flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-elwafa-gold/10 rounded-bl-full pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-elwafa-gold/20 text-elwafa-ocean flex items-center justify-center">
                  <Compass className="w-6 h-6 text-elwafa-ocean" />
                </div>
                <span className="px-3 py-1 rounded-full bg-elwafa-gold text-elwafa-ocean-dark text-[11px] font-bold">
                  Fase 2: Di Kairo Mesir
                </span>
              </div>

              <h3 className="text-xl font-bold text-elwafa-ocean mb-3">
                Pendampingan Penuh di Kairo Mesir
              </h3>

              <p className="text-xs sm:text-sm text-elwafa-text-muted leading-relaxed mb-6">
                Perjuangan santri tidak dilepas begitu saja setelah mendarat. Tim perwakilan resmi Elwafa di Kairo mendampingi tempat tinggal, akademik kampus, hingga kesehatan.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-xl bg-elwafa-surface-subtle flex items-center justify-center shrink-0 mt-0.5">
                    <Award className="w-4 h-4 text-elwafa-gold" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-elwafa-ocean">Akademik Terpantau &amp; Bimbingan Senior</h5>
                    <p className="text-[11px] text-elwafa-text-muted">Pendalaman diktat kuliah Al-Azhar bersama asatidz dan tutor berprestasi di Kairo.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-xl bg-elwafa-surface-subtle flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4 text-elwafa-gold" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-elwafa-ocean">Asrama Aman &amp; Terbimbing 24 Jam</h5>
                    <p className="text-[11px] text-elwafa-text-muted">Fasilitas flat asrama yang higienis di lokasi strategis dekat masjid dan kampus Al-Azhar.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-xl bg-elwafa-surface-subtle flex items-center justify-center shrink-0 mt-0.5">
                    <Users className="w-4 h-4 text-elwafa-gold" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-elwafa-ocean">Wali Asuh &amp; Laporan Berkala</h5>
                    <p className="text-[11px] text-elwafa-text-muted">Laporan berkala nilai ujian dan kondisi santri langsung ke grup komunikasi orang tua di tanah air.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-elwafa-surface-border flex items-center gap-2 text-xs text-elwafa-text-muted">
              <MapPin className="w-4 h-4 text-elwafa-gold shrink-0" />
              <span>Lokasi: Nasr City &amp; Darrasah, Kairo Governorate, Mesir</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

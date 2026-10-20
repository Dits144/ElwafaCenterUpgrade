import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, BookOpen, CheckCircle, Award, Sparkles, Building, Mosque, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onOpenRegisterModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRegisterModal }) => {
  const { setRole } = useApp();

  return (
    <>
      <section id="beranda" className="relative overflow-hidden bg-gradient-to-b from-elwafa-surface-subtle via-white to-elwafa-surface pt-10 pb-16 lg:pt-16 lg:pb-24">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-elwafa-teal/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full bg-elwafa-gold/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Editorial Headline & Actions */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Pill Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-elwafa-ocean/5 border border-elwafa-teal/30 text-elwafa-ocean text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-elwafa-gold" />
                <span>Pusat Pembinaan &amp; Pendamping Resmi Studi Al-Azhar Kairo Mesir</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-elwafa-ocean tracking-tight leading-[1.18]">
                Wujudkan Impian Kuliah di{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-elwafa-teal to-elwafa-ocean">
                  Universitas Al-Azhar
                </span>{' '}
                Kairo Mesir
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-elwafa-text-muted leading-relaxed font-normal max-w-2xl">
                Bimbingan terpadu matrikulasi bahasa Arab fusha, telaah kitab turats, karantina tahfidz Al-Qur'an bersanad, persiapan seleksi Diktis Kemenag &amp; Pusiba, hingga pendampingan izin tinggal dan asrama di Kairo.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={onOpenRegisterModal}
                  className="flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-elwafa-teal hover:bg-elwafa-teal-dark shadow-md hover:shadow-lg transition-all"
                >
                  <span>Daftar Seleksi Santri Baru</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#program"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-elwafa-ocean bg-white hover:bg-elwafa-surface-subtle border border-elwafa-surface-border shadow-sm transition-all"
                >
                  <BookOpen className="w-4 h-4 text-elwafa-teal" />
                  <span>Jelajahi Program Studi</span>
                </a>
              </div>

              {/* 4 Feature Badges */}
              <div className="pt-6 border-t border-elwafa-surface-border grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-elwafa-ocean">
                    <CheckCircle className="w-4 h-4 text-elwafa-teal shrink-0" />
                    <span>Mitra Al-Azhar</span>
                  </div>
                  <p className="text-[11px] text-elwafa-text-muted">Jalur resmi S1 &amp; Ma'had</p>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-elwafa-ocean">
                    <CheckCircle className="w-4 h-4 text-elwafa-teal shrink-0" />
                    <span>Dibina Masyaikh</span>
                  </div>
                  <p className="text-[11px] text-elwafa-text-muted">100% alumni Kairo</p>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-elwafa-ocean">
                    <CheckCircle className="w-4 h-4 text-elwafa-teal shrink-0" />
                    <span>Pesantren Biah</span>
                  </div>
                  <p className="text-[11px] text-elwafa-text-muted">24 jam bahasa Arab</p>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-elwafa-ocean">
                    <CheckCircle className="w-4 h-4 text-elwafa-teal shrink-0" />
                    <span>SK Kemenkumham</span>
                  </div>
                  <p className="text-[11px] text-elwafa-text-muted">Legalitas terdaftar</p>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Visual Frame */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-gradient-to-tr from-elwafa-teal/20 to-elwafa-gold/20 rounded-3xl transform rotate-2 scale-105" />
                
                <div className="relative bg-white rounded-3xl p-3 shadow-elevated border border-elwafa-surface-border overflow-hidden">
                  <img
                    src="/assets/Hero-Image-3.2-768x768.png"
                    alt="Calon Mahasiswa Elwafa Center"
                    className="w-full h-auto object-cover rounded-2xl"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/assets/Model-1.png';
                    }}
                  />

                  {/* Floating Card: Alumni & Masyaikh */}
                  <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-lg border border-elwafa-surface-border flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-elwafa-teal/15 flex items-center justify-center text-elwafa-teal">
                        <Award className="w-5 h-5 text-elwafa-teal" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-elwafa-ocean">Pusat Pembinaan Terpadu</div>
                        <div className="text-[11px] text-elwafa-text-muted">Jalur Resmi S1 &amp; Ma'had Bu'uts</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setRole('student')}
                      className="px-3 py-1.5 rounded-lg bg-elwafa-ocean text-white text-[11px] font-bold hover:bg-elwafa-ocean-light transition-colors"
                    >
                      Masuk Portal
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Modern Numbers Strip */}
      <section className="bg-elwafa-ocean-dark text-white py-8 border-y border-white/10 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-white/15">
            <div className="pt-2 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-elwafa-gold font-mono">1,000+</div>
              <div className="text-xs font-semibold text-white/80 mt-1 uppercase tracking-wider">Santri Berangkat ke Mesir</div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-elwafa-gold font-mono">100%</div>
              <div className="text-xs font-semibold text-white/80 mt-1 uppercase tracking-wider">Bimbingan Masyaikh Kairo</div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-elwafa-gold font-mono">24 Jam</div>
              <div className="text-xs font-semibold text-white/80 mt-1 uppercase tracking-wider">Biah Lughawiyyah Asrama</div>
            </div>
            <div className="pt-2 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-elwafa-gold font-mono">AHU-2025</div>
              <div className="text-xs font-semibold text-white/80 mt-1 uppercase tracking-wider">Legalitas SK Kemenkumham</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

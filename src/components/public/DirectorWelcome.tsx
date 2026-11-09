import React from 'react';
import { CheckCircle, GraduationCap } from 'lucide-react';

export const DirectorWelcome: React.FC = () => {
  return (
    <section id="tentang" className="py-20 bg-white border-b border-elwafa-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Foto Pimpinan / Pengasuh Lembaga */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-sm">
              <div className="absolute inset-0 bg-gradient-to-tr from-elwafa-teal/20 to-elwafa-gold/20 rounded-3xl" />
              
              <div className="relative bg-white rounded-3xl p-3 shadow-elevated border border-elwafa-surface-border overflow-hidden">
                <img
                  src="/assets/founder-elwafa.png"
                  alt="Ust. Ihsan Efendi Lc - Founder & Direktur Elwafa Center"
                  className="w-full h-auto object-cover rounded-2xl max-h-[400px]"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/assets/background.jpeg';
                  }}
                />
                <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-elwafa-surface-border text-center">
                  <h4 className="text-sm font-extrabold text-elwafa-ocean">Visi Pembinaan Elwafa Center</h4>
                  <p className="text-xs text-elwafa-teal font-semibold">Bimbingan Terpadu Menuju Al-Azhar Kairo</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sambutan & Visi Misi */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-elwafa-teal/10 text-elwafa-teal text-xs font-bold uppercase tracking-wider">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Sambutan Pengasuh Lembaga</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-elwafa-ocean tracking-tight leading-snug">
              Melahirkan Kader Ulama &amp; Cendekiawan Muslim Berwawasan Wasathiyyah
            </h2>

            <div className="relative pl-6 border-l-2 border-elwafa-gold text-xs sm:text-sm text-elwafa-text-main leading-relaxed italic">
              "Menuntut ilmu ke Universitas Al-Azhar Mesir bukan sekadar perjalanan akademik biasa, melainkan pengembaraan spiritual dan amanah peradaban umat Islam. Elwafa Center hadir mendampingi santri dari tanah air hingga menjejakkan kaki di serambi ilmu Kairo."
            </div> 

            <p className="text-xs sm:text-sm text-elwafa-text-muted leading-relaxed">
              Elwafa Center menerapkan sistem pembinaan terpadu di mana santri dibimbing menguasai bahasa Arab fusha (nahwu, sharaf, balaghah), memperkuat hafalan Al-Qur'an mutqin bersanad, serta menelaah kitab-kitab turats rujukan Al-Azhar. Pendampingan kami menyeluruh dari proses legalisir Kemenag/Kemlu, visa pelajar KBRI, hingga penjemputan dan asrama di Kairo.
            </p>

            {/* 3 Komitmen Utama */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-elwafa-surface rounded-xl border border-elwafa-surface-border">
                <CheckCircle className="w-4 h-4 text-elwafa-teal mb-1" />
                <h5 className="text-xs font-bold text-elwafa-ocean">Kurikulum Kairo</h5>
                <p className="text-[11px] text-elwafa-text-muted">Standar muqarrar resmi Al-Azhar</p>
              </div>

              <div className="p-3 bg-elwafa-surface rounded-xl border border-elwafa-surface-border">
                <CheckCircle className="w-4 h-4 text-elwafa-teal mb-1" />
                <h5 className="text-xs font-bold text-elwafa-ocean">Asrama Terbimbing</h5>
                <p className="text-[11px] text-elwafa-text-muted">Biah lughawiyyah 24 jam</p>
              </div>

              <div className="p-3 bg-elwafa-surface rounded-xl border border-elwafa-surface-border">
                <CheckCircle className="w-4 h-4 text-elwafa-teal mb-1" />
                <h5 className="text-xs font-bold text-elwafa-ocean">Amanah &amp; Legal</h5>
                <p className="text-[11px] text-elwafa-text-muted">Izin Kemenkumham &amp; Kemlu</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { ShieldCheck, BookOpen, Building2, HeartHandshake, Compass, Award } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: <Award className="w-6 h-6 text-elwafa-teal" />,
      title: '100% Pembimbing Alumni Al-Azhar',
      description: 'Seluruh materi keagamaan, nahwu-sharaf, dan balaghah dibimbing langsung oleh lulusan Fakultas Ushuluddin, Syariah, dan Lughoh Kairo.'
    },
    {
      icon: <Building2 className="w-6 h-6 text-elwafa-teal" />,
      title: 'Asrama Karantina Bahasa & Tahfidz',
      description: 'Lingkungan biah lughawiyyah 24 jam untuk membiasakan santri berkomunikasi dengan bahasa Arab fusha dan penguatan hafalan Al-Qur\'an.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-elwafa-teal" />,
      title: 'Pemberkasan & Legalitas Terjamin',
      description: 'Pendampingan resmi izin belajar Kemenag RI, apostille Kemenkumham, rekomendasi Kemlu, serta penerbitan visa pelajar KBRI Kairo.'
    },
    {
      icon: <Compass className="w-6 h-6 text-elwafa-teal" />,
      title: 'Pendampingan Tiba di Kairo',
      description: 'Tim perwakilan Elwafa di Kairo menjemput di Bandara Kairo, membantu penyewaan flat/asrama santri, registrasi kampus, hingga orientasi hidup di Mesir.'
    }
  ];

  return (
    <section id="tentang" className="py-20 bg-elwafa-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Text */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elwafa-ocean/5 text-elwafa-ocean text-xs font-bold uppercase tracking-wider">
              <span>Keunggulan Elwafa</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-elwafa-ocean tracking-tight leading-snug">
              Dedikasi Penuh Mengantarkan Generasi Qur'ani ke Negri Para Nabi
            </h2>

            <p className="text-sm sm:text-base text-elwafa-text-muted leading-relaxed">
              Elwafa Center hadir bukan hanya sekadar lembaga les, melainkan mitra dan keluarga yang mendampingi santri mulai dari titik nol persiapan di Indonesia hingga sukses menginjakkan kaki di pelataran Masjid Al-Azhar Kairo.
            </p>

            <div className="p-4 bg-white rounded-2xl border border-elwafa-surface-border shadow-soft flex items-center gap-4">
              <img
                src="/assets/Logo El-wafa Lingkaran.png"
                alt="Emblem Elwafa"
                className="w-14 h-14 object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
              <div>
                <h4 className="text-sm font-bold text-elwafa-ocean">Lembaga Terdaftar Resmi</h4>
                <p className="text-xs text-elwafa-text-muted">Amanah, transparan, dan terpercaya bagi ribuan wali santri nusantara.</p>
              </div>
            </div>
          </div>

          {/* Right Column Pillars Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {pillars.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-elwafa-surface-border shadow-soft hover:shadow-elevated transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-elwafa-surface-subtle flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-elwafa-ocean mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-elwafa-text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

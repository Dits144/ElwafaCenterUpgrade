import React from 'react';
import { Award, Plane, Users, Building, ShieldCheck, HeartHandshake } from 'lucide-react';

export const AchievementsSection: React.FC = () => {
  const achievements = [
    {
      icon: <Plane className="w-6 h-6 text-elwafa-teal" />,
      number: '1,000+',
      title: 'Santri Diberangkatkan ke Mesir',
      description: 'Berhasil mengantarkan santri dari berbagai daerah di Indonesia menembus seleksi Universitas & Ma\'had Al-Azhar Kairo.'
    },
    {
      icon: <Award className="w-6 h-6 text-elwafa-teal" />,
      number: '100%',
      title: 'Program Karantina Unggulan',
      description: 'Karantina intensif 3 bulan yang membentuk karakter adab, hafalan Al-Qur\'an bersanad, dan kepemimpinan santri.'
    },
    {
      icon: <Users className="w-6 h-6 text-elwafa-teal" />,
      number: '50+',
      title: 'Tim Internal Profesional',
      description: 'Mencakup divisi akademik Al-Azhar, administrasi legalisir Kemenag/Kemlu, kepengurusan flat Kairo, dan tim media.'
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-elwafa-teal" />,
      number: '30+',
      title: 'Jejaring Mitra Strategis',
      description: 'Menjalin kolaborasi aktif dengan pesantren di seluruh Indonesia serta otoritas pendidikan di Mesir, Turki, dan Malaysia.'
    }
  ];

  return (
    <section className="py-20 bg-white border-b border-elwafa-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-elwafa-gold block mb-2">
            Komitmen &amp; Dedikasi Nyata
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-elwafa-ocean tracking-tight">
            Pencapaian Elwafa Center
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-elwafa-text-muted">
            Menjadi bukti nyata kerja keras, kesungguhan pendampingan, dan doa dari ribuan santri serta wali santri nusantara.
          </p>
        </div>

        {/* 4 Grid Achievements */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-elwafa-surface border border-elwafa-surface-border hover:shadow-elevated transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white shadow-xs border border-elwafa-surface-border flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <div className="text-3xl font-extrabold text-elwafa-ocean font-mono mb-1">
                  {item.number}
                </div>
                <h4 className="text-sm font-bold text-elwafa-ocean mb-2">
                  {item.title}
                </h4>
                <p className="text-xs text-elwafa-text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

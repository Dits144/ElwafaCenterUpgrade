import React from 'react';
import { motion } from 'framer-motion';
import { Compass, FileCheck, BookOpenCheck, ShieldCheck, PlaneTakeoff, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ProcessStepsSection: React.FC = () => {
  const { setCurrentPage } = useApp();

  const steps = [
    {
      num: '01',
      title: 'Pilih Jalur & Konsultasi',
      desc: 'Tentukan jenjang yang tepat: S1 Universitas Al-Azhar, Ma\'had Bu\'uts (SMP/SMA), atau Markaz Lughoh & Tahfidz.',
      icon: <Compass className="w-5 h-5 text-elwafa-teal" />,
      detail: 'Konsultasi gratis via WhatsApp',
    },
    {
      num: '02',
      title: 'Registrasi & Verifikasi Dokumen',
      desc: 'Pengisian biodata santri, pemilihan kuota tahun ajaran, dan upload berkas ijazah serta transkrip secara terpadu.',
      icon: <FileCheck className="w-5 h-5 text-elwafa-gold" />,
      detail: 'Verifikasi tim administrasi',
    },
    {
      num: '03',
      title: 'Karantina Bahasa & Tahfidz',
      desc: 'Bimbingan intensif biah lughawiyyah 24 jam bahasa Arab fusha, hafalan Al-Qur\'an, dan telaah kurikulum muqarrar Kairo.',
      icon: <BookOpenCheck className="w-5 h-5 text-elwafa-teal" />,
      detail: 'Asrama intensif terbimbing',
    },
    {
      num: '04',
      title: 'Legalisasi & Visa Kedutaan Mesir',
      desc: 'Pengurusan berkas resmi Kemenag, Kemenlu, Kedutaan Besar Mesir di Jakarta, hingga penerbitan visa pelajar resmi.',
      icon: <ShieldCheck className="w-5 h-5 text-elwafa-gold" />,
      detail: 'Pendampingan birokrasi tuntas',
    },
    {
      num: '05',
      title: 'Keberangkatan & Asrama Kairo',
      desc: 'Santri diberangkatkan bersama pembimbing, dijemput di bandara Kairo, dan langsung menempati asrama Elwafa di Nasr City.',
      icon: <PlaneTakeoff className="w-5 h-5 text-elwafa-teal" />,
      detail: 'Pendampingan sampai Kairo',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-[#003B46]/10 relative overflow-hidden">
      {/* Decorative ambient gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-elwafa-teal/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header ala Syahdi Cargo: Section Pill + Headline + Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-elwafa-teal/10 border border-elwafa-teal/20 text-elwafa-teal text-xs font-bold uppercase tracking-widest mb-3">
            <span>Alur Perjalanan Santri</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-elwafa-ocean tracking-tight leading-tight">
            Dari Pendaftaran Sampai Tiba di Kairo
          </h2>
          <div className="w-16 h-1 bg-elwafa-gold mx-auto mt-3 rounded-full" />
          <p className="mt-4 text-xs sm:text-sm text-elwafa-text-muted leading-relaxed">
            Lima langkah terstruktur dan terukur agar persiapan studi ke Universitas Al-Azhar Mesir berjalan tenang, tertib administrasi, dan berakhlak mulia.
          </p>
        </div>

        {/* 5 Step Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="bg-white rounded-2xl p-5 border border-elwafa-surface-border shadow-soft hover:shadow-elevated hover:border-elwafa-teal/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-elwafa-surface-subtle border border-elwafa-surface-border flex items-center justify-center group-hover:scale-105 transition-transform">
                    {step.icon}
                  </div>
                  <span className="text-2xl font-black text-elwafa-ocean/20 font-mono group-hover:text-elwafa-gold transition-colors">
                    {step.num}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-elwafa-ocean mb-2 leading-snug group-hover:text-elwafa-teal transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs text-elwafa-text-muted leading-relaxed mb-4">
                  {step.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-elwafa-surface-border flex items-center justify-between text-[11px] font-semibold text-elwafa-teal">
                <span>{step.detail}</span>
                <span className="text-elwafa-ocean/30 group-hover:text-elwafa-teal transition-colors">→</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Bar */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setCurrentPage('program')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-elwafa-surface hover:bg-elwafa-surface-subtle text-elwafa-ocean border border-elwafa-surface-border text-xs sm:text-sm font-bold shadow-xs hover:border-elwafa-teal transition-all"
          >
            <span>Pelajari Kurikulum & Fasilitas Lengkap Tiap Program</span>
            <ArrowRight className="w-4 h-4 text-elwafa-teal" />
          </button>
        </div>

      </div>
    </section>
  );
};

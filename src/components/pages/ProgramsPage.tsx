import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Clock, Calendar, CheckCircle2, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Program } from '../../types';

interface ProgramsPageProps {
  onSelectProgram: (prog: Program) => void;
}

export const ProgramsPage: React.FC<ProgramsPageProps> = ({ onSelectProgram }) => {
  const { programs, setSelectedProgramForDetail } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = [
    { id: 'ALL', label: 'Semua Program' },
    { id: 'Al-Azhar Mesir', label: 'S1 Universitas Al-Azhar' },
    { id: "Ma'had Al-Azhar", label: "Ma'had Bu'uts (SMP-SMA)" },
    { id: 'Bahasa & Tahfidz', label: 'Markaz Lughoh & Tahfidz' },
  ];

  const filteredPrograms = selectedCategory === 'ALL'
    ? programs
    : programs.filter((p) => p.category.toLowerCase().includes(selectedCategory.toLowerCase()) || p.title.toLowerCase().includes(selectedCategory.toLowerCase()));

  const programFaqs = [
    {
      q: "Apakah lulusan SMA lama atau yang sedang kuliah boleh daftar Ma'had Al-Azhar?",
      a: "Boleh! Ma’had Bu'uts Al-Azhar tidak membatasi tahun kelulusan dari Indonesia, dan merupakan salah satu alternatif termudah bagi santri untuk langsung berhak kuliah di Universitas Al-Azhar tanpa tes Diktis."
    },
    {
      q: "Berapa lama proses belajar di Ma'had Bu'uts Al-Azhar?",
      a: "Rata-rata siswa Indonesia menempuh 1 hingga 3 tahun bergantung pada hasil tes penempatan (tahdid mustawa) dan semangat santri. Al-Azhar membuka kesempatan musabaqah (akselerasi lompat kelas)."
    },
    {
      q: "Apakah pendidikan di Ma'had Al-Azhar dikenakan biaya sekolah?",
      a: "Pendidikan formal di Ma'had Al-Azhar bersifat beasiswa GRATIS dari Grand Syeikh Al-Azhar sejak masuk hingga lulus. Biaya yang disiapkan santri adalah biaya persiapan, tiket, visa, serta asrama/biaya hidup."
    },
    {
      q: "Bagaimana jika santri belum lancar bahasa Arab sebelum berangkat?",
      a: "Hampir seluruh calon santri memulai dari dasar. Elwafa Center membina santri selama 1–3 bulan di asrama Indonesia terlebih dahulu untuk matrikulasi bahasa fusha, qiraah kitab, dan hafalan Al-Qur'an."
    },
    {
      q: "Berapa estimasi biaya hidup santri di Mesir per bulan?",
      a: "Biaya hidup di Kairo Mesir sangat terjangkau dibanding negara lain. Kebutuhan makan dan pribadi berkisar antara Rp 400.000 hingga Rp 1.000.000 per bulan di luar asrama."
    }
  ];

  return (
    <div className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-elwafa-teal/10 border border-elwafa-teal/20 text-elwafa-teal text-xs font-bold uppercase tracking-widest mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Pilihan Program Studi</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-elwafa-ocean tracking-tight">
            Program Pendidikan &amp; Pembinaan Elwafa
          </h1>
          <div className="w-16 h-1 bg-elwafa-gold mx-auto mt-3 rounded-full" />
          <p className="mt-4 text-xs sm:text-sm text-elwafa-text-muted leading-relaxed">
            Pusat bimbingan terpadu studi ke Universitas Al-Azhar Kairo, Ma'had Bu'uts Islamiyyah, serta karantina bahasa Arab dan tahfidz bersanad.
          </p>
        </div>

        {/* Filter Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === c.id
                  ? 'bg-elwafa-ocean text-white shadow-sm'
                  : 'bg-elwafa-surface text-elwafa-text-muted hover:text-elwafa-ocean hover:bg-elwafa-surface-subtle border border-elwafa-surface-border'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Program Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {filteredPrograms.map((prog) => {
            const pct = Math.round((prog.enrolledCount / prog.quota) * 100);
            return (
              <motion.div
                key={prog.id}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="bg-white rounded-3xl border border-elwafa-surface-border shadow-soft hover:shadow-elevated hover:border-elwafa-teal/40 overflow-hidden flex flex-col justify-between transition-all group"
              >
                <div>
                  {/* Image container */}
                  <div className="relative h-48 w-full overflow-hidden bg-elwafa-ocean-dark">
                    <img
                      src={prog.image}
                      alt={prog.title}
                      loading="eager"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/assets/8.jpeg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/95 text-elwafa-ocean shadow-xs">
                      {prog.category}
                    </span>

                    <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-elwafa-gold text-elwafa-ocean shadow-xs">
                      {prog.duration}
                    </span>
                  </div>

                  {/* Body Info */}
                  <div className="p-6">
                    <h3 className="text-base sm:text-lg font-bold text-elwafa-ocean mb-2 leading-snug group-hover:text-elwafa-teal transition-colors">
                      {prog.title}
                    </h3>
                    <p className="text-xs text-elwafa-text-muted leading-relaxed line-clamp-3 mb-4">
                      {prog.description}
                    </p>

                    {/* Meta info chips */}
                    <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-elwafa-surface border border-elwafa-surface-border text-[11px] mb-4">
                      <div className="flex items-center gap-1.5 text-elwafa-ocean font-medium">
                        <Calendar className="w-3.5 h-3.5 text-elwafa-teal shrink-0" />
                        <span className="truncate">{prog.schedule}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-elwafa-ocean font-medium">
                        <Users className="w-3.5 h-3.5 text-elwafa-gold shrink-0" />
                        <span>Kuota: {prog.enrolledCount}/{prog.quota}</span>
                      </div>
                    </div>

                    {/* Progress Bar Kuota */}
                    <div className="space-y-1 mb-4">
                      <div className="flex justify-between text-[10px] font-bold text-elwafa-text-muted">
                        <span>Keterisian Kuota</span>
                        <span>{pct}% ({prog.quota - prog.enrolledCount} kursi tersisa)</span>
                      </div>
                      <div className="h-1.5 w-full bg-elwafa-surface-border rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-elwafa-teal to-elwafa-gold rounded-full"
                          style={{ width: `${Math.min(pct, 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Highlights bullet */}
                    <div className="space-y-1.5 pt-3 border-t border-elwafa-surface-border">
                      {prog.highlights.slice(0, 3).map((hl, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-elwafa-text-main">
                          <CheckCircle2 className="w-3.5 h-3.5 text-elwafa-teal shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-6 pt-0 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedProgramForDetail(prog)}
                    className="py-2.5 px-3 rounded-xl border border-elwafa-surface-border hover:border-elwafa-teal text-elwafa-ocean hover:bg-elwafa-surface-subtle text-xs font-bold transition-all text-center"
                  >
                    Detail Lengkap
                  </button>
                  <button
                    onClick={() => onSelectProgram(prog)}
                    className="py-2.5 px-3 rounded-xl bg-elwafa-teal hover:bg-elwafa-teal-dark text-white text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-sm"
                  >
                    <span>Daftar Sekarang</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Program Comparison & Curriculum Breakdown */}
        <div className="bg-elwafa-surface rounded-3xl p-6 sm:p-10 border border-elwafa-surface-border mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-xl sm:text-3xl font-extrabold text-elwafa-ocean">
              Komparasi Fasilitas: Asrama Indonesia vs Asrama Mesir
            </h2>
            <p className="text-xs sm:text-sm text-elwafa-text-muted mt-2">
              Pendampingan menyeluruh dari masa persiapan di tanah air hingga bermukim di Kairo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-elwafa-surface-border shadow-soft">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elwafa-teal/10 text-elwafa-teal text-xs font-bold mb-4">
                <span>Fasilitas Karantina di Indonesia</span>
              </div>
              <ul className="space-y-2.5 text-xs text-elwafa-text-main">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-elwafa-teal shrink-0 mt-0.5" />
                  <span>Asrama representatif 24 jam dengan biah lughawiyyah bahasa Arab fusha.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-elwafa-teal shrink-0 mt-0.5" />
                  <span>Bimbingan intensif talaqqi Al-Qur'an dan setoran hafalan mutqin bersanad.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-elwafa-teal shrink-0 mt-0.5" />
                  <span>Pelatihan simulasi ujian muqabalah, nahwu, sharaf, dan balaghah standar Kairo.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-elwafa-teal shrink-0 mt-0.5" />
                  <span>Konsumsi harian 3 kali sehari serta bimbingan adab dan kemandirian santri.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-elwafa-surface-border shadow-soft">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elwafa-gold/20 text-elwafa-ocean text-xs font-bold mb-4">
                <span>Fasilitas & Pendampingan di Kairo Mesir</span>
              </div>
              <ul className="space-y-2.5 text-xs text-elwafa-text-main">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-elwafa-gold shrink-0 mt-0.5" />
                  <span>Penjemputan resmi rombongan di Bandara Internasional Kairo oleh pembimbing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-elwafa-gold shrink-0 mt-0.5" />
                  <span>Penempatan di Asrama Elwafa Center di Distrik 10, Nasr City Kairo yang aman & strategis.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-elwafa-gold shrink-0 mt-0.5" />
                  <span>Pengurusan izin tinggal (Iqamah), perpanjangan visa pelajar, dan registrasi kampus/Ma'had.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-elwafa-gold shrink-0 mt-0.5" />
                  <span>Bimbingan talaqqi mingguan ke masyaikh kibar Al-Azhar di Masjid Al-Azhar Kairo.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Program FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-elwafa-gold uppercase tracking-wider">Tanya Jawab</span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-elwafa-ocean mt-1">
              Pertanyaan Seputar Pendaftaran & Kuliah Mesir
            </h3>
          </div>

          <div className="space-y-3">
            {programFaqs.map((faq, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-elwafa-surface-border shadow-soft">
                <h4 className="text-xs sm:text-sm font-bold text-elwafa-ocean flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-elwafa-teal shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs text-elwafa-text-muted mt-2 pl-6 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

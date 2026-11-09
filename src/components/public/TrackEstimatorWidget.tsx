import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calculator, CheckCircle2, ArrowRight, Clock, Award, Wallet, School } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Program } from '../../types';

interface TrackEstimatorWidgetProps {
  onSelectProgram: (prog: Program) => void;
}

export const TrackEstimatorWidget: React.FC<TrackEstimatorWidgetProps> = ({ onSelectProgram }) => {
  const { programs } = useApp();

  const [educationLevel, setEducationLevel] = useState<'sma' | 'pesantren' | 'smp' | 'umum'>('sma');
  const [studyGoal, setStudyGoal] = useState<'s1' | 'mahad' | 'lughah'>('s1');

  // Logic calculation for simulation
  const getSimulationResult = () => {
    if (studyGoal === 'mahad' || educationLevel === 'smp') {
      const targetProg = programs.find((p) => p.slug.includes('mahad')) || programs[0];
      return {
        program: targetProg,
        pathName: "Jalur Ma'had Bu'uts Al-Azhar (SMP-SMA Kairo)",
        duration: '1 – 3 Tahun di Kairo (bisa akselerasi musabaqah)',
        preparation: '1 – 2 Bulan pembinaan dasar di Indonesia',
        examRequirement: 'Tanpa tes masuk ketat di Indonesia, penempatan kelas langsung di Kairo',
        tuitionFee: 'GRATIS / Bebas Biaya Pendidikan resmi dari Al-Azhar',
        livingCost: 'Rp 400.000 – Rp 900.000 / bulan di Kairo',
        keyAdvantage: 'Setelah lulus Ma\'had, otomatis berhak kuliah S1 Al-Azhar tanpa tes Diktis & tanpa دور اللغة.',
      };
    } else if (studyGoal === 'lughah') {
      const targetProg = programs.find((p) => p.slug.includes('markaz')) || programs[1] || programs[0];
      return {
        program: targetProg,
        pathName: 'Jalur Markaz Lughoh & Tahfidz Mutqin',
        duration: '3 Bulan – 6 Bulan intensif berasrama',
        preparation: 'Biah lughawiyyah 24 jam fusha & setoran juz Al-Qur\'an',
        examRequirement: 'Ujian penempatan level (Ikhbar Mustawa) Markaz Syeikh Zayed',
        tuitionFee: 'Biaya program bimbingan lokal terjangkau',
        livingCost: 'Fasilitas asrama, konsumsi, dan modul belajar include',
        keyAdvantage: 'Fokus melancarkan muhadatsah fusha dan bekal kuat sebelum masuk bangku perkuliahan.',
      };
    } else {
      // S1 Al-Azhar
      const targetProg = programs.find((p) => p.slug.includes('kuliah') || p.slug.includes('s1')) || programs[0];
      return {
        program: targetProg,
        pathName: 'Jalur Persiapan S1 Universitas Al-Azhar Kairo',
        duration: '4 Tahun masa studi S1 di Mesir',
        preparation: '2 – 4 Bulan karantina intensif di Indonesia',
        examRequirement: 'Seleksi Diktis Kemenag RI / Standarisasi Bahasa Pusiba OIAC',
        tuitionFee: 'GRATIS / Bebas Biaya Kuliah universitas Al-Azhar',
        livingCost: 'Rp 600.000 – Rp 1.200.000 / bulan (biaya flat asrama + makan)',
        keyAdvantage: 'Ijazah Lc diakui dunia internasional dan berkesempatan talaqqi sanad ke masyaikh Al-Azhar.',
      };
    }
  };

  const result = getSimulationResult();

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-elwafa-surface to-white border-b border-[#003B46]/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-elwafa-gold/15 border border-elwafa-gold/30 text-elwafa-ocean text-xs font-bold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5 text-elwafa-gold" />
            <span>Simulasi Jalur &amp; Estimasi Studi</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-elwafa-ocean tracking-tight">
            Cek Estimasi Waktu &amp; Rekomendasi Program Anda
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-elwafa-text-muted">
            Pilih latar belakang pendidikan dan cita-cita studi Anda untuk melihat jalur yang paling efektif dan hemat waktu.
          </p>
        </div>

        {/* Interactive Simulator Card Box */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-elwafa-surface-border shadow-elevated p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Input Selection Columns */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Question 1: Latar Belakang */}
              <div>
                <label className="text-xs font-bold text-elwafa-ocean uppercase tracking-wider block mb-2.5">
                  1. Latar Belakang Pendidikan Saat Ini:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { id: 'sma', label: 'SMA / MA Umum', desc: 'Lulusan baru / alumni' },
                    { id: 'pesantren', label: 'Pondok Pesantren', desc: 'KMI / Salafiyah / Mu\'adalah' },
                    { id: 'smp', label: 'SMP / MTs', desc: 'Usia 12 – 15 tahun' },
                    { id: 'umum', label: 'Mahasiswa / Umum', desc: 'Ingin bahasa Arab Kairo' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setEducationLevel(item.id as any)}
                      className={`text-left p-3 rounded-xl border text-xs transition-all ${
                        educationLevel === item.id
                          ? 'border-elwafa-teal bg-elwafa-teal/5 text-elwafa-ocean font-bold shadow-2xs'
                          : 'border-elwafa-surface-border bg-elwafa-surface text-elwafa-text-muted hover:border-elwafa-teal/40'
                      }`}
                    >
                      <div className="text-xs font-bold text-elwafa-ocean">{item.label}</div>
                      <div className="text-[10px] text-elwafa-text-muted mt-0.5">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2: Target Peminatan */}
              <div>
                <label className="text-xs font-bold text-elwafa-ocean uppercase tracking-wider block mb-2.5">
                  2. Cita-cita Studi di Mesir:
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { id: 's1', label: 'Kuliah S1 di Universitas Al-Azhar Kairo', sub: 'Fakultas Syari\'ah, Ushuluddin, Bahasa Arab, Dirasat Islamiyyah' },
                    { id: 'mahad', label: 'Masuk Ma\'had Bu\'uts Al-Azhar (SMP-SMA Mesir)', sub: 'Jalur resmi langsung lanjut S1 Al-Azhar tanpa tes Diktis' },
                    { id: 'lughah', label: 'Markaz Lughoh & Penguatan Tahfidz Al-Qur\'an', sub: 'Persiapan biah lughawiyyah 24 jam & talaqqi kitab turats' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setStudyGoal(item.id as any)}
                      className={`text-left p-3 rounded-xl border text-xs transition-all ${
                        studyGoal === item.id
                          ? 'border-elwafa-gold bg-elwafa-gold/10 text-elwafa-ocean font-bold shadow-2xs'
                          : 'border-elwafa-surface-border bg-elwafa-surface text-elwafa-text-muted hover:border-elwafa-gold/50'
                      }`}
                    >
                      <div className="text-xs font-bold text-elwafa-ocean">{item.label}</div>
                      <div className="text-[11px] text-elwafa-text-muted mt-0.5">{item.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Output Result Card (Animated) */}
            <div className="lg:col-span-6 bg-elwafa-surface rounded-2xl p-5 sm:p-6 border border-elwafa-surface-border flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-elwafa-surface-border mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-elwafa-teal">
                    Hasil Rekomendasi Simulator
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    Pilihan Tepat
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${educationLevel}-${studyGoal}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3.5 text-xs"
                  >
                    <div>
                      <h4 className="text-base font-extrabold text-elwafa-ocean leading-tight">
                        {result.pathName}
                      </h4>
                      <p className="text-[11px] text-elwafa-teal font-semibold mt-0.5">
                        {result.keyAdvantage}
                      </p>
                    </div>

                    <div className="pt-2 space-y-2 border-t border-elwafa-surface-border">
                      <div className="flex items-start gap-2">
                        <Clock className="w-3.5 h-3.5 text-elwafa-ocean/60 mt-0.5 shrink-0" />
                        <div>
                          <span className="font-bold text-elwafa-ocean">Masa Studi: </span>
                          <span className="text-elwafa-text-muted">{result.duration}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <School className="w-3.5 h-3.5 text-elwafa-ocean/60 mt-0.5 shrink-0" />
                        <div>
                          <span className="font-bold text-elwafa-ocean">Pembinaan Awal: </span>
                          <span className="text-elwafa-text-muted">{result.preparation}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <Award className="w-3.5 h-3.5 text-elwafa-gold mt-0.5 shrink-0" />
                        <div>
                          <span className="font-bold text-elwafa-ocean">Biaya Kuliah/Sekolah: </span>
                          <span className="text-emerald-700 font-semibold">{result.tuitionFee}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <Wallet className="w-3.5 h-3.5 text-elwafa-teal mt-0.5 shrink-0" />
                        <div>
                          <span className="font-bold text-elwafa-ocean">Estimasi Biaya Hidup: </span>
                          <span className="text-elwafa-text-muted">{result.livingCost}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white border border-elwafa-surface-border text-[11px] text-elwafa-text-muted leading-relaxed">
                      💡 <strong>Catatan:</strong> Tidak ada batasan tahun ijazah untuk mendaftar. Bagi yang belum lancar bahasa Arab, akan dibimbing intensif dari nol hingga siap.
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Action Button inside Simulator */}
              <div className="pt-5 mt-4 border-t border-elwafa-surface-border">
                <button
                  onClick={() => onSelectProgram(result.program)}
                  className="w-full py-3 rounded-xl bg-elwafa-teal hover:bg-elwafa-teal-dark text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <span>Daftar Simulasi Jalur Ini Sekarang</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

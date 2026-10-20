import React from 'react';
import { UserCheck, FileText, CheckCircle2, Languages, Award, Plane, MapPin } from 'lucide-react';

export const JourneyTimeline: React.FC = () => {
  const steps = [
    {
      num: '01',
      icon: <UserCheck className="w-5 h-5 text-elwafa-teal" />,
      title: 'Pendaftaran Akun',
      desc: 'Pilih jalur program peminatan (S1 Al-Azhar / Ma\'had) dan buat akun santri di portal online.'
    },
    {
      num: '02',
      icon: <FileText className="w-5 h-5 text-elwafa-teal" />,
      title: 'Lengkapi Biodata',
      desc: 'Isi formulir data pribadi santri, riwayat madrasah/pesantren, serta upload ijazah & kartu identitas.'
    },
    {
      num: '03',
      icon: <CheckCircle2 className="w-5 h-5 text-elwafa-teal" />,
      title: 'Verifikasi Berkas',
      desc: 'Tim verifikator Elwafa memeriksa kelayakan berkas (Disetujui, Perlu Revisi, atau Ditolak).'
    },
    {
      num: '04',
      icon: <Languages className="w-5 h-5 text-elwafa-teal" />,
      title: 'Karantina & Pembinaan',
      desc: 'Masuk karantina asrama bahasa Arab intensif, persiapan tes lisan (muqabalah) & tahfidz.'
    },
    {
      num: '05',
      icon: <Award className="w-5 h-5 text-elwafa-teal" />,
      title: 'Simulasi & Ujian Resmi',
      desc: 'Mengikuti seleksi nasional Diktis Kemenag / Pusiba dengan pendampingan penuh instruktur.'
    },
    {
      num: '06',
      icon: <FileText className="w-5 h-5 text-elwafa-teal" />,
      title: 'Pengurusan Visa Mesir',
      desc: 'Legalisir dokumen di Kemenkumham, Kemlu, dan penerbitan visa pelajar di Kedubes Mesir.'
    },
    {
      num: '07',
      icon: <Plane className="w-5 h-5 text-elwafa-gold" />,
      title: 'Tiba di Kairo',
      desc: 'Pemberangkatan rombongan, penjemputan di Bandara Kairo, dan penempatan asrama mahasiswa.'
    }
  ];

  return (
    <section id="tahapan" className="py-20 bg-white border-b border-elwafa-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elwafa-ocean/5 text-elwafa-ocean text-xs font-bold uppercase tracking-wider mb-3">
            <span>Alur Perjalanan Santri</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-elwafa-ocean tracking-tight">
            7 Langkah Terarah Menuju Gerbang Al-Azhar
          </h2>
          <p className="mt-3 text-sm sm:text-base text-elwafa-text-muted">
            Semua tahapan transparan dan terpantau secara real-time langsung melalui Portal Mahasiswa Elwafa Center.
          </p>
        </div>

        {/* Desktop Step Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative p-6 bg-elwafa-surface rounded-2xl border border-elwafa-surface-border flex flex-col justify-between hover:border-elwafa-teal/40 transition-all hover:shadow-soft"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-elwafa-surface-border flex items-center justify-center shadow-xs">
                    {step.icon}
                  </div>
                  <span className="text-2xl font-black text-elwafa-teal/20 font-mono">
                    {step.num}
                  </span>
                </div>

                <h3 className="text-base font-bold text-elwafa-ocean mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-elwafa-text-muted leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white border border-elwafa-surface-border text-elwafa-teal text-[10px] font-bold flex items-center justify-center shadow-xs">
                  →
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

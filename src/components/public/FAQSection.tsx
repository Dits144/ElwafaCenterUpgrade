import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Apa perbedaan jalur seleksi Kemenag (Diktis) dan Pusiba?',
      a: 'Jalur Diktis Kemenag adalah seleksi nasional tahunan Kementerian Agama untuk calon mahasiswa S1 Al-Azhar. Sedangkan Pusiba (Pusat Bahasa Al-Azhar di Indonesia) adalah cabang resmi Markaz Syeikh Zayed yang menyelenggarakan matrikulasi bahasa Arab bersertifikat resmi Al-Azhar sebelum bertolak ke Mesir. Elwafa membimbing kedua jalur tersebut secara intensif.'
    },
    {
      q: 'Kapan pendaftaran calon mahasiswa baru dibuka di Elwafa Center?',
      a: 'Pendaftaran gelombang 1 dibuka untuk tahun ajaran 2026/2027. Santri dianjurkan mendaftar lebih awal agar dapat mengikuti karantina bahasa Arab dan telaah kitab muqarrar Al-Azhar sebelum ujian resmi diselenggarakan.'
    },
    {
      q: 'Apakah santri dari SMA umum (bukan pesantren/madrasah) bisa mendaftar?',
      a: 'Bisa. Kami memiliki kurikulum matrikulasi dasar nahwu-sharaf dan tahfidz yang didesain khusus agar lulusan SMA umum mampu mengejar kompetensi bahasa dan syariah yang diujikan dalam tes masuk Al-Azhar.'
    },
    {
      q: 'Bagaimana proses pendampingan setibanya santri di Kairo Mesir?',
      a: 'Perwakilan Elwafa Center di Kairo akan menjemput langsung di Kairo International Airport, mengantarkan ke penginapan/flat asrama, membantu registrasi berkas di rektorat Al-Azhar, pembukaan rekening bank Mesir, dan orientasi lingkungan belajar di Kairo.'
    },
    {
      q: 'Bagaimana status legalitas dan izin belajar keluar negeri?',
      a: 'Elwafa Center membantu seluruh alur resmi: surat rekomendasi Kemenag, apostille dokumen di Kemenkumham, pengesahan Kementerian Luar Negeri, hingga penerbitan visa pelajar resmi dari Kedutaan Besar Republik Arab Mesir di Jakarta.'
    }
  ];

  return (
    <section id="faq" className="py-20 bg-white border-t border-elwafa-surface-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elwafa-teal/10 text-elwafa-teal text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Tanya Jawab Seputar Studi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-elwafa-ocean tracking-tight">
            Pertanyaan yang Sering Diajukan (FAQ)
          </h2>
          <p className="mt-2 text-sm text-elwafa-text-muted">
            Informasi penting bagi santri dan orang tua terkait perkuliahan di Al-Azhar Kairo.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((item, idx) => (
            <div
              key={idx}
              className="border border-elwafa-surface-border rounded-2xl overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left bg-elwafa-surface hover:bg-elwafa-surface-subtle transition-colors"
              >
                <span className="font-bold text-sm sm:text-base text-elwafa-ocean pr-4">
                  {item.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-elwafa-teal shrink-0 transition-transform duration-200 ${
                    openIdx === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openIdx === idx && (
                <div className="p-5 text-xs sm:text-sm text-elwafa-text-muted leading-relaxed bg-white border-t border-elwafa-surface-border">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

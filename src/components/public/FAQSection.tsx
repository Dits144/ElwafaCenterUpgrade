import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Sparkles, MessageCircleQuestion } from 'lucide-react';

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
    <section id="faq" className="py-20 bg-white border-t border-elwafa-surface-border overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-elwafa-teal/10 border border-elwafa-teal/20 text-elwafa-teal text-xs font-bold uppercase tracking-wider mb-3">
            <MessageCircleQuestion className="w-3.5 h-3.5" />
            <span>Tanya Jawab Seputar Studi</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-elwafa-ocean tracking-tight">
            Pertanyaan yang Sering Diajukan (FAQ)
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-elwafa-text-muted max-w-xl mx-auto">
            Informasi penting dan transparan bagi calon santri dan orang tua terkait perkuliahan di Al-Azhar Kairo.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <motion.div
                key={idx}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className={`border rounded-2xl overflow-hidden transition-colors duration-200 ${
                  isOpen 
                    ? 'border-elwafa-teal/40 bg-white shadow-soft ring-1 ring-elwafa-teal/20' 
                    : 'border-elwafa-surface-border bg-elwafa-surface/60 hover:bg-white hover:border-elwafa-teal/20'
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none cursor-pointer"
                >
                  <span className={`font-bold text-sm sm:text-base pr-4 transition-colors ${
                    isOpen ? 'text-elwafa-teal' : 'text-elwafa-ocean'
                  }`}>
                    {item.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isOpen ? 'bg-elwafa-teal text-white' : 'bg-white border border-elwafa-surface-border text-elwafa-text-muted'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: 'auto', 
                        opacity: 1,
                        transition: {
                          height: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] },
                          opacity: { duration: 0.25, delay: 0.05 }
                        }
                      }}
                      exit={{ 
                        height: 0, 
                        opacity: 0,
                        transition: {
                          height: { duration: 0.25, ease: [0.04, 0.62, 0.23, 0.98] },
                          opacity: { duration: 0.15 }
                        }
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-elwafa-text-muted leading-relaxed border-t border-elwafa-surface-border/60">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Callout Bantuan */}
        <div className="mt-10 p-6 bg-elwafa-surface rounded-3xl border border-elwafa-surface-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-elwafa-gold/20 flex items-center justify-center text-elwafa-gold shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-elwafa-ocean">Punya Pertanyaan Spesifik Lainnya?</h4>
              <p className="text-xs text-elwafa-text-muted">Konsultasikan langsung persyaratan putra-putri Anda bersama asatidz Elwafa.</p>
            </div>
          </div>
          <a
            href="https://wa.me/6281221463946?text=Halo%20Elwafa%20Center,%20saya%20ingin%20tanya%20seputar%20pendaftaran"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-elwafa-teal hover:bg-elwafa-teal-dark text-white text-xs font-bold transition-all shadow-xs shrink-0"
          >
            Hubungi Konsultan via WhatsApp →
          </a>
        </div>

      </div>
    </section>
  );
};

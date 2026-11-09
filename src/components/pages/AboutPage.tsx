import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Compass, HeartHandshake, ShieldCheck, CheckCircle2, MapPin, Building, Globe } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AboutPage: React.FC = () => {
  const { setCurrentPage } = useApp();

  const values = [
    {
      title: 'Wasathiyyah Al-Azhar',
      desc: 'Menanamkan pemahaman Islam yang moderat, toleran, dan berakar pada tradisi keilmuan ahlussunnah wal jama\'ah yang diwariskan para ulama Al-Azhar.',
      icon: <Compass className="w-5 h-5 text-elwafa-teal" />,
    },
    {
      title: 'Biah Lughawiyyah 24 Jam',
      desc: 'Membiasakan percakapan bahasa Arab fusha di lingkungan asrama agar santri percaya diri dan siap mengikuti perkuliahan berbahasa Arab di Kairo.',
      icon: <GraduationCap className="w-5 h-5 text-elwafa-gold" />,
    },
    {
      title: 'Tahfidz Mutqin Bersanad',
      desc: 'Bimbingan hafalan Al-Qur\'an intensif dengan standar tajwid makharijul huruf yang teliti dan bersanad hingga Rasulullah SAW.',
      icon: <Award className="w-5 h-5 text-elwafa-teal" />,
    },
    {
      title: 'Amanah & Pendampingan Tuntas',
      desc: 'Mendampingi santri secara utuh mulai dari pengurusan berkas, legalisir kemenag/kemlu, visa pelajar, penjemputan bandara, hingga asrama Kairo.',
      icon: <HeartHandshake className="w-5 h-5 text-elwafa-gold" />,
    },
  ];

  const missions = [
    'Melahirkan penghafal Al-Qur’an yang tidak hanya fasih dalam hafalan, tetapi juga memiliki adab, ilmu, dan kemampuan mengamalkan isi Al-Qur’an dalam kehidupan nyata.',
    'Menyediakan pembelajaran Bahasa Arab yang efektif dan aplikatif, agar santri mampu memahami dan menggunakan bahasa Arab dengan baik dalam berbagai konteks.',
    'Mendorong terbentuknya generasi muda yang tangguh, cerdas, dan memiliki semangat untuk menjadi bagian dari khairu ummah (umat terbaik).',
    'Menyinergikan antara ilmu keagamaan (turats) dan wawasan global agar santri memiliki keseimbangan spiritual dan intelektual.',
    'Memperkenalkan Universitas Al-Azhar lebih luas lagi kepada generasi muda di seluruh pelosok tanah air Indonesia tercinta.',
  ];

  return (
    <div className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-elwafa-teal/10 border border-elwafa-teal/20 text-elwafa-teal text-xs font-bold uppercase tracking-widest mb-3">
            <Globe className="w-3.5 h-3.5" />
            <span>Mengenal Lembaga Kami</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-elwafa-ocean tracking-tight">
            Tentang Elwafa Center
          </h1>
          <div className="w-16 h-1 bg-elwafa-gold mx-auto mt-3 rounded-full" />
          <p className="mt-4 text-xs sm:text-sm text-elwafa-text-muted leading-relaxed">
            Lembaga bimbingan tahfidz Al-Qur’an, pelatihan bahasa Arab fusha, dan konsultan pendidikan pendamping resmi studi ke Universitas Al-Azhar Kairo Mesir sejak 2018.
          </p>
        </div>

        {/* Section: Founder & Sambutan */}
        <div className="bg-elwafa-surface rounded-3xl p-6 sm:p-12 border border-elwafa-surface-border mb-16 shadow-soft">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Founder Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm">
                <div className="absolute inset-0 bg-gradient-to-tr from-elwafa-teal/20 to-elwafa-gold/20 rounded-3xl" />
                <div className="relative bg-white rounded-3xl p-3 border border-elwafa-surface-border shadow-elevated overflow-hidden">
                  <img
                    src="/assets/founder-elwafa.png"
                    alt="Ust. Ihsan Efendi Lc - Founder Elwafa Center"
                    className="w-full h-auto object-cover rounded-2xl max-h-[420px]"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/assets/background.jpeg';
                    }}
                  />
                  <div className="p-4 text-center">
                    <h3 className="text-base font-extrabold text-elwafa-ocean">
                      Ust. Ihsan Efendi, Lc
                    </h3>
                    <p className="text-xs text-elwafa-teal font-semibold mt-0.5">
                      Founder &amp; Pengasuh Elwafa Center
                    </p>
                    <p className="text-[11px] text-elwafa-text-muted mt-1">
                      Alumni Universitas Al-Azhar Kairo Mesir
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Narasi Resmi dari tentang.html */}
            <div className="lg:col-span-7 space-y-4 text-xs sm:text-sm text-elwafa-text-main leading-relaxed">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elwafa-gold/15 text-elwafa-ocean text-xs font-bold">
                <span>Sekilas Pendirian Lembaga</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-extrabold text-elwafa-ocean leading-snug">
                Berawal dari Mahasiswa Aktif Al-Azhar di Kairo Sejak 2018
              </h2>

              <p className="text-elwafa-text-muted">
                Lembaga Elwafa Center kami hadirkan sebagai bentuk komitmen untuk memfasilitasi para santri dan pelajar di Indonesia agar dapat melanjutkan studi ke Universitas Al-Azhar Kairo maupun ke berbagai lembaga resmi di bawah naungannya.
              </p>

              <p className="text-elwafa-text-muted">
                Didirikan pada tahun 2018 oleh mahasiswa aktif Universitas Al-Azhar Kairo, Elwafa Center kini telah mendampingi ratusan santri menembus seleksi dan bermukim di Kairo. Perjalanan ini tentu melalui berbagai proses dan ujian, namun justru proses itulah yang menjadikan Elwafa Center berdiri kokoh hingga saat ini.
              </p>

              <div className="p-4 rounded-2xl bg-white border border-elwafa-surface-border italic text-xs text-elwafa-ocean font-medium border-l-4 border-l-elwafa-gold">
                "Dengan berpegang pada prinsip dan komitmen yang kuat, kami terus berupaya memperkenalkan Universitas Al-Azhar lebih luas lagi, khususnya kepada generasi muda di seluruh tanah air Indonesia tercinta."
              </div>

              <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-elwafa-ocean">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-elwafa-teal" />
                  <span>Didirikan 2018 di Kairo</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-elwafa-teal" />
                  <span>Sistem Asrama Terpadu</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-elwafa-teal" />
                  <span>Perwakilan Resmi di Mesir</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Section: Visi & Misi */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Visi Card */}
            <div className="lg:col-span-5 bg-elwafa-ocean-dark text-white rounded-3xl p-8 shadow-elevated">
              <span className="text-xs font-bold text-elwafa-gold uppercase tracking-wider block mb-2">
                Visi Utama Lembaga
              </span>
              <h3 className="text-2xl font-extrabold tracking-tight mb-4 leading-snug">
                Pusat Pendidikan Tahfidz &amp; Bahasa Arab yang Melahirkan Pemimpin Umat
              </h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                Menjadi pusat pendidikan Tahfidz Al-Qur’an dan Bahasa Arab yang melahirkan generasi pemimpin umat berwawasan global, berkarakter islami, mandiri, serta berlandaskan nilai-nilai kepesantrenan dan manhaj wasathiyyah Al-Azhar Kairo.
              </p>
            </div>

            {/* Misi 5 Poin */}
            <div className="lg:col-span-7 space-y-3">
              <div className="mb-4">
                <span className="text-xs font-bold text-elwafa-teal uppercase tracking-wider block">
                  Misi Strategis
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-elwafa-ocean">
                  Lima Langkah Nyata Elwafa Center
                </h3>
              </div>

              {missions.map((m, idx) => (
                <div key={idx} className="bg-white p-4 rounded-2xl border border-elwafa-surface-border shadow-soft flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-elwafa-teal/10 text-elwafa-teal font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-xs text-elwafa-text-main leading-relaxed">
                    {m}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* 4 Pilar Nilai Keunggulan */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-elwafa-gold uppercase tracking-widest">Karakter Lembaga</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-elwafa-ocean mt-1">
              Empat Pilar Pendidikan Elwafa Center
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl p-6 border border-elwafa-surface-border shadow-soft hover:border-elwafa-teal/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-elwafa-surface-subtle border border-elwafa-surface-border flex items-center justify-center mb-4">
                    {v.icon}
                  </div>
                  <h4 className="text-sm font-bold text-elwafa-ocean mb-2">
                    {v.title}
                  </h4>
                  <p className="text-xs text-elwafa-text-muted leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Showcase Dokumentasi Santri di Kairo */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold text-elwafa-teal uppercase tracking-wider block mb-1">
              Dokumentasi Otentik
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-elwafa-ocean">
              Jejak Pembinaan Santri Elwafa di Kairo &amp; Alexandria
            </h3>
            <p className="text-xs text-elwafa-text-muted mt-1">
              Dari pembinaan talaqqi intensif, ujian resmi di Kairo, hingga kunjungan peradaban Islam di Mesir.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] relative group shadow-soft">
              <img src="/assets/before footer.jpeg" alt="Mahasiswa Al-Azhar di Markaz Tathwir" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3 text-white">
                <div>
                  <div className="text-[10px] font-bold text-elwafa-gold">Al-Azhar Kairo</div>
                  <div className="text-xs font-bold">Markaz Tathwir Thullab Wafidin</div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden aspect-[4/3] relative group shadow-soft">
              <img src="/assets/gallery/9.jpeg" alt="Halaqah Talaqqi Kitab Turats" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3 text-white">
                <div>
                  <div className="text-[10px] font-bold text-elwafa-gold">Talaqqi Turats</div>
                  <div className="text-xs font-bold">Kajian Kitab di Kompleks Bersejarah</div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden aspect-[4/3] relative group shadow-soft">
              <img src="/assets/background.jpeg" alt="Rihlah Bibliotheca Alexandrina" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3 text-white">
                <div>
                  <div className="text-[10px] font-bold text-elwafa-gold">Rihlah Edukatif</div>
                  <div className="text-xs font-bold">Bibliotheca Alexandrina, Alexandria</div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden aspect-[4/3] relative group shadow-soft">
              <img src="/assets/gallery/14.jpeg" alt="Study Hall Masisir Kairo" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3 text-white">
                <div>
                  <div className="text-[10px] font-bold text-elwafa-gold">Pusat Belajar</div>
                  <div className="text-xs font-bold">Grand Atrium &amp; Study Hall Masisir</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dual-Office Location Details */}
        <div className="bg-elwafa-surface rounded-3xl p-6 sm:p-10 border border-elwafa-surface-border">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-elwafa-ocean">
              Kantor Administrasi &amp; Perwakilan Luar Negeri
            </h3>
            <p className="text-xs text-elwafa-text-muted mt-1">
              Kami hadir di Indonesia dan Kairo Mesir untuk memastikan koordinasi santri berjalan tanpa hambatan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-elwafa-surface-border shadow-soft flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-elwafa-teal/10 flex items-center justify-center text-elwafa-teal shrink-0 mt-1">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-elwafa-teal block">Kantor Indonesia</span>
                <h4 className="text-sm font-bold text-elwafa-ocean mt-0.5">Kantor Pusat Operasional & Asrama</h4>
                <p className="text-xs text-elwafa-text-muted mt-2 leading-relaxed">
                  JL Perum Pondok Mutiara Blok D1/06 RT 003 RW 011 Sasakpanjang, Kec. Tajurhalang, Kab. Bogor, Jawa Barat, Indonesia
                </p>
                <div className="mt-3 text-xs font-semibold text-elwafa-ocean">
                  Telp/WA: +62 812-2146-3946 / +62 813-8852-9588
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-elwafa-surface-border shadow-soft flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-elwafa-gold/20 flex items-center justify-center text-elwafa-ocean shrink-0 mt-1">
                <MapPin className="w-5 h-5 text-elwafa-ocean" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-elwafa-gold block">Kantor Kairo Mesir</span>
                <h4 className="text-sm font-bold text-elwafa-ocean mt-0.5">Asrama &amp; Konsultan Perwakilan Mesir</h4>
                <p className="text-xs text-elwafa-text-muted mt-2 leading-relaxed">
                  Bld: 17, Flat: 05/3rd Floor, Ibrahim Nagy St. 10th District, Nasr City, Cairo, Egypt
                </p>
                <div className="mt-3 text-xs font-semibold text-elwafa-ocean">
                  Kontak Mesir: (+20) 155-856-3207
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => setCurrentPage('kontak')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-elwafa-teal hover:bg-elwafa-teal-dark text-white text-xs font-bold shadow-sm transition-all"
            >
              <span>Hubungi Kantor Kami via WhatsApp</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

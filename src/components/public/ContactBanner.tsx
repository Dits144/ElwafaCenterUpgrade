import React from 'react';
import { Phone, Mail, MapPin, MessageCircle, Clock, ShieldCheck } from 'lucide-react';

export const ContactBanner: React.FC = () => {
  return (
    <section id="kontak" className="relative overflow-hidden py-16 sm:py-20 text-white">
      {/* Background Banner Asli: before footer.jpeg */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 38, 45, 0.92), rgba(0, 59, 70, 0.92)), url('/assets/before footer.jpeg')"
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Callout Text & Direct WhatsApp */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-elwafa-gold block">
              Konsultasi &amp; Pendaftaran
            </span>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-snug">
              Ada Pertanyaan Seputar Studi di Al-Azhar Mesir?
            </h2>

            <p className="text-xs sm:text-sm text-white/85 leading-relaxed max-w-xl">
              Tim konsultan dan asatidz Elwafa Center siap memberikan konsultasi gratis mengenai tahapan seleksi, kurikulum Ma'had &amp; S1 Al-Azhar, serta pembiayaan studi.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="https://wa.me/6285188445164"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-elwafa-teal hover:bg-elwafa-teal-light text-white font-bold text-xs sm:text-sm shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4 text-elwafa-gold" />
                <span>Chat WhatsApp: +62 851-8844-5164</span>
              </a>

              <a
                href="mailto:elwafacenter73@gmail.com"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all"
              >
                <Mail className="w-4 h-4 text-elwafa-teal-light" />
                <span>Kirim Email</span>
              </a>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-white/70 pt-2">
              <ShieldCheck className="w-4 h-4 text-elwafa-gold shrink-0" />
              <span>Legalitas SK Kemenkumham RI: AHU-0070290.AH.01.01.TAHUN 2025</span>
            </div>
          </div>

          {/* Right: Dual Office Cards (Bogor Indonesia & Cairo Egypt) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Kantor Indonesia */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15">
              <div className="flex items-center gap-2.5 mb-2">
                <MapPin className="w-4 h-4 text-elwafa-gold shrink-0" />
                <h4 className="text-sm font-bold text-white">Kantor Pusat Indonesia</h4>
              </div>
              <p className="text-xs text-white/80 leading-relaxed pl-6.5">
                Ruko Sentra Residence 37, Tajurhalang, Kec. Tajur Halang, Kabupaten Bogor, Jawa Barat 16320
              </p>
              <div className="mt-2.5 pl-6.5 flex items-center gap-2 text-[11px] text-elwafa-gold">
                <Clock className="w-3.5 h-3.5" />
                <span>Senin - Sabtu: 08.00 - 17.00 WIB</span>
              </div>
            </div>

            {/* Kantor Mesir */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15">
              <div className="flex items-center gap-2.5 mb-2">
                <MapPin className="w-4 h-4 text-elwafa-teal-light shrink-0" />
                <h4 className="text-sm font-bold text-white">Kantor Perwakilan Mesir</h4>
              </div>
              <p className="text-xs text-white/80 leading-relaxed pl-6.5">
                3 Haret Al Maghrbilin, El-Gamaleya, Cairo Governorate 4331375, Mesir
              </p>
              <div className="mt-2.5 pl-6.5 flex items-center gap-2 text-[11px] text-elwafa-teal-light">
                <Clock className="w-3.5 h-3.5" />
                <span>Pelayanan Santri &amp; Asrama Kairo 24 Jam</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Building, MessageSquare, Send, Clock, CheckCircle2, ExternalLink, Navigation } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useApp();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    program: 'S1 Universitas Al-Azhar',
    message: '',
  });

  const [activeOffice, setActiveOffice] = useState<'indonesia' | 'mesir'>('indonesia');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      showToast('Mohon lengkapi nama dan nomor WhatsApp Anda.', 'warning');
      return;
    }

    const text = encodeURIComponent(
      `Assalamu'alaikum Elwafa Center,\n\nNama: ${form.name}\nNo. WA: ${form.phone}\nPeminatan Program: ${form.program}\nPertanyaan: ${form.message || 'Saya ingin informasi pendaftaran dan biaya program studi ke Kairo.'}\n\nTerima kasih.`
    );
    const waUrl = `https://wa.me/6281221463946?text=${text}`;
    window.open(waUrl, '_blank');
    showToast('Membuka WhatsApp untuk mengirim pesan...', 'success');
  };

  return (
    <div className="py-12 sm:py-16 bg-[#FAFCFB] min-h-screen text-[#192A3D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-elwafa-teal/10 border border-elwafa-teal/20 text-elwafa-teal text-xs font-bold uppercase tracking-widest mb-3">
            <Phone className="w-3.5 h-3.5" />
            <span>Pusat Komunikasi &amp; Informasi</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-elwafa-ocean tracking-tight">
            Hubungi Elwafa Center
          </h1>
          <div className="w-16 h-1 bg-elwafa-gold mx-auto mt-3 rounded-full" />
          <p className="mt-4 text-xs sm:text-sm text-elwafa-text-muted leading-relaxed">
            Tim konsultan kami siap mendampingi rencana studi putra-putri Anda menuju Universitas Al-Azhar Kairo Mesir. Silakan hubungi kami via WhatsApp atau kunjungi kantor administrasi.
          </p>
        </div>

        {/* Dual-Office & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left: Office Information Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Kantor Indonesia */}
            <div 
              onClick={() => setActiveOffice('indonesia')}
              className={`bg-white rounded-3xl p-6 border transition-all cursor-pointer ${
                activeOffice === 'indonesia'
                  ? 'border-elwafa-teal shadow-elevated ring-2 ring-elwafa-teal/20'
                  : 'border-elwafa-surface-border shadow-soft hover:border-elwafa-teal/40'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-elwafa-teal/10 text-elwafa-teal flex items-center justify-center shrink-0">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-elwafa-teal block">
                      Kantor Pusat Indonesia
                    </span>
                    <h3 className="text-sm font-bold text-elwafa-ocean">
                      Administrasi &amp; Asrama Pembinaan
                    </h3>
                  </div>
                </div>
                {activeOffice === 'indonesia' && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-elwafa-teal/15 text-elwafa-teal">Aktif di Peta</span>
                )}
              </div>

              <div className="space-y-3 text-xs text-elwafa-text-muted border-t border-elwafa-surface-border pt-4">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-elwafa-gold shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    JL Perum Pondok Mutiara Blok D1/06 RT 003 RW 011 Sasakpanjang, Kec. Tajurhalang, Kab. Bogor, Jawa Barat, Indonesia
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-elwafa-teal shrink-0" />
                  <span>+62 812-2146-3946 (Admin Indonesia)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-elwafa-text-muted shrink-0" />
                  <span>Senin - Sabtu: 08.00 - 17.00 WIB</span>
                </div>
              </div>
            </div>

            {/* Kantor Kairo Mesir */}
            <div 
              onClick={() => setActiveOffice('mesir')}
              className={`bg-white rounded-3xl p-6 border transition-all cursor-pointer ${
                activeOffice === 'mesir'
                  ? 'border-elwafa-teal shadow-elevated ring-2 ring-elwafa-teal/20'
                  : 'border-elwafa-surface-border shadow-soft hover:border-elwafa-teal/40'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-elwafa-gold/15 text-elwafa-ocean flex items-center justify-center shrink-0">
                    <Building className="w-5 h-5 text-elwafa-gold" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-elwafa-gold block">
                      Perwakilan Kairo Mesir
                    </span>
                    <h3 className="text-sm font-bold text-elwafa-ocean">
                      Asrama &amp; Konsultan Kairo
                    </h3>
                  </div>
                </div>
                {activeOffice === 'mesir' && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-elwafa-gold/20 text-elwafa-ocean">Aktif di Peta</span>
                )}
              </div>

              <div className="space-y-3 text-xs text-elwafa-text-muted border-t border-elwafa-surface-border pt-4">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-elwafa-gold shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    Hayy Ats-Tsamien (Distrik 8), Madinat Nasr, Kairo, Republik Arab Mesir
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-elwafa-teal shrink-0" />
                  <span>+20 102 751 3290 (Konsultan Kairo)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-elwafa-text-muted shrink-0" />
                  <span>Waktu Kairo (UTC+2)</span>
                </div>
              </div>
            </div>

            {/* Quick Consultation CTA */}
            <div className="p-6 bg-gradient-to-br from-elwafa-ocean to-[#00262D] rounded-3xl text-white">
              <h4 className="text-sm font-bold text-elwafa-gold mb-1">Butuh Diskusi Tatap Muka?</h4>
              <p className="text-xs text-white/80 leading-relaxed mb-4">
                Silakan jadwalkan kunjungan silaturahmi ke asrama pembinaan santri di Bogor bersama keluarga.
              </p>
              <a
                href="https://wa.me/6281221463946?text=Halo%20Elwafa%20Center,%20saya%20ingin%20jadwalkan%20kunjungan%20ke%20asrama"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-elwafa-gold text-elwafa-ocean text-xs font-bold hover:bg-white transition-all shadow-sm"
              >
                <span>Jadwalkan Kunjungan</span>
                <Navigation className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* Right: Direct Consultation Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-elwafa-surface-border shadow-soft">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-elwafa-teal mb-2">
              <MessageSquare className="w-4 h-4" />
              <span>Formulir Konsultasi Cepat</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-elwafa-ocean mb-2">
              Kirim Pesan Langsung ke Asatidz
            </h2>
            <p className="text-xs text-elwafa-text-muted mb-6">
              Isi data di bawah ini dan pesan akan langsung terhubung secara terstruktur ke WhatsApp konsultan resmi kami.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-elwafa-ocean mb-1.5">
                  Nama Lengkap Calon Santri / Orang Tua <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Muhammad Faris / H. Ridwan"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 bg-elwafa-surface border border-elwafa-surface-border rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-elwafa-teal"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-elwafa-ocean mb-1.5">
                  Nomor WhatsApp Aktif <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="Contoh: 081234567890"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-elwafa-surface border border-elwafa-surface-border rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-elwafa-teal"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-elwafa-ocean mb-1.5">
                  Peminatan Program Studi
                </label>
                <select
                  value={form.program}
                  onChange={(e) => setForm({ ...form, program: e.target.value })}
                  className="w-full px-4 py-3 bg-elwafa-surface border border-elwafa-surface-border rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-elwafa-teal"
                >
                  <option value="S1 Universitas Al-Azhar Kairo">S1 Universitas Al-Azhar Kairo (Persiapan Diktis & Pusiba)</option>
                  <option value="Persiapan Ma'had Al-Azhar (SMP/SMA)">Persiapan Ma'had Bu'uts Al-Azhar (SMP/MTs & SMA/MA)</option>
                  <option value="Karantina Bahasa Arab & Tahfidz">Karantina Bahasa Arab &amp; Tahfidz Al-Qur'an Intensif</option>
                  <option value="Konsultasi Pendampingan Dokumen & Visa">Konsultasi Pendampingan Dokumen &amp; Visa Pelajar</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-elwafa-ocean mb-1.5">
                  Catatan atau Pertanyaan Tambahan
                </label>
                <textarea
                  rows={4}
                  placeholder="Tuliskan latar belakang pendidikan santri (misal: alumni pesantren/SMA) dan target tahun keberangkatan..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 bg-elwafa-surface border border-elwafa-surface-border rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-elwafa-teal"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-elwafa-ocean hover:bg-elwafa-ocean-light text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <Send className="w-4 h-4 text-elwafa-gold" />
                <span>Kirim Konsultasi ke WhatsApp Resmi</span>
              </button>
            </form>
          </div>

        </div>

        {/* ============================================================== */}
        {/* INTERACTIVE GOOGLE MAPS EMBED SECTION                          */}
        {/* ============================================================== */}
        <div className="bg-white rounded-3xl border border-elwafa-surface-border overflow-hidden shadow-elevated">
          <div className="p-5 sm:p-6 border-b border-elwafa-surface-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-elwafa-teal mb-1">
                <MapPin className="w-4 h-4" />
                <span>Navigasi Lokasi Interaktif</span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-elwafa-ocean">
                {activeOffice === 'indonesia'
                  ? 'Peta Lokasi Kantor Pusat & Asrama Elwafa (Bogor, Jawa Barat)'
                  : 'Peta Lokasi Kantor Perwakilan & Flat Mahasiswa (Nasr City, Kairo Mesir)'}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveOffice('indonesia')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeOffice === 'indonesia'
                    ? 'bg-elwafa-ocean text-white shadow-xs'
                    : 'bg-elwafa-surface text-elwafa-text-muted hover:text-elwafa-ocean'
                }`}
              >
                Kantor Bogor
              </button>
              <button
                onClick={() => setActiveOffice('mesir')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeOffice === 'mesir'
                    ? 'bg-elwafa-ocean text-white shadow-xs'
                    : 'bg-elwafa-surface text-elwafa-text-muted hover:text-elwafa-ocean'
                }`}
              >
                Kantor Kairo
              </button>
            </div>
          </div>

          <div className="w-full h-[400px] sm:h-[480px] bg-elwafa-surface relative">
            {activeOffice === 'indonesia' ? (
              <iframe
                title="Google Maps Lokasi Elwafa Center Bogor"
                src="https://maps.google.com/maps?q=Sasakpanjang%20Tajurhalang%20Bogor%20Jawa%20Barat&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
              />
            ) : (
              <iframe
                title="Google Maps Lokasi Elwafa Center Kairo"
                src="https://maps.google.com/maps?q=Nasr%20City%20Cairo%20Egypt%20Al-Azhar&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
              />
            )}

            {/* Bottom Map Info Overlay Bar */}
            <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-elwafa-surface-border shadow-elevated max-w-md">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h5 className="text-xs font-bold text-elwafa-ocean">
                    {activeOffice === 'indonesia' ? 'Elwafa Center Indonesia' : 'Elwafa Center Cairo Branch'}
                  </h5>
                  <p className="text-[11px] text-elwafa-text-muted line-clamp-1">
                    {activeOffice === 'indonesia'
                      ? 'Perum Pondok Mutiara D1/06, Sasakpanjang, Bogor'
                      : 'Hayy Ats-Tsamien, Madinat Nasr, Cairo, Egypt'}
                  </p>
                </div>
                <a
                  href={
                    activeOffice === 'indonesia'
                      ? 'https://maps.google.com/?q=Sasakpanjang+Tajurhalang+Bogor'
                      : 'https://maps.google.com/?q=Nasr+City+Cairo+Egypt'
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-elwafa-teal text-white text-[11px] font-bold flex items-center gap-1 shrink-0 hover:bg-elwafa-teal-dark"
                >
                  <span>Buka di Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

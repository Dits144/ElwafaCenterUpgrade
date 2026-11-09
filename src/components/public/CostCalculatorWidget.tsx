import React, { useState } from 'react';
import {
  Calculator,
  Wallet,
  Plane,
  Home,
  Utensils,
  Wifi,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  MessageCircle,
  ArrowRight,
  Info,
} from 'lucide-react';
import {
  calculateStudyCost,
  formatRupiah,
  PROGRAM_COSTS,
  ACCOMMODATION_COSTS,
  LIFESTYLE_COSTS,
  type StudyCostInput,
} from '../../utils/costCalculator';

interface CostCalculatorWidgetProps {
  onRegisterClick?: (programName: string) => void;
}

export const CostCalculatorWidget: React.FC<CostCalculatorWidgetProps> = ({ onRegisterClick }) => {
  const [program, setProgram] = useState<StudyCostInput['program']>('s1-azhar');
  const [accommodation, setAccommodation] = useState<StudyCostInput['accommodation']>('asrama-elwafa');
  const [lifestyle, setLifestyle] = useState<StudyCostInput['lifestyle']>('standar');

  const result = calculateStudyCost({ program, accommodation, lifestyle });

  const handleConsultWhatsApp = () => {
    const waText = encodeURIComponent(
      `Assalamu'alaikum Admin Elwafa Center,\n\nSaya ingin konsultasi hasil kalkulasi biaya studi ke Mesir:\n- Program: ${result.programName}\n- Akomodasi di Kairo: ${ACCOMMODATION_COSTS[accommodation].name}\n- Pola Hidup: ${LIFESTYLE_COSTS[lifestyle].name}\n\n*Estimasi Hasil:*\n- Modal Awal (Tiket, Visa, Legalisir, Pembekalan): ${formatRupiah(result.initialCostIdr)}\n- Biaya Hidup Bulanan di Kairo: ${formatRupiah(result.monthlyLivingIdr)} (~${result.monthlyLivingEgp.toLocaleString('id-ID')} EGP)\n\nMohon info jadwal pendaftaran dan bimbingan terdekat. Terima kasih.`
    );
    window.open(`https://wa.me/6281234567890?text=${waText}`, '_blank');
  };

  return (
    <section id="kalkulator-biaya" className="py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-elwafa-teal/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-elwafa-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-elwafa-teal/10 text-elwafa-ocean text-xs font-semibold uppercase tracking-wider mb-4 border border-elwafa-teal/20">
            <Calculator className="w-3.5 h-3.5 text-elwafa-teal" />
            Transparansi Finansial Santri & Wali
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Kalkulator Biaya Studi & Biaya Hidup di Mesir
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-600">
            Hitung perkiraan realistis dari persiapan berkas di Indonesia hingga biaya sewa asrama dan makan bulanan di Kairo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
            {/* Step 1: Program */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3 flex items-center justify-between">
                <span>1. Pilih Jenjang / Program Tujuan</span>
                <span className="text-xs font-normal text-gray-500">Al-Azhar Kairo</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(Object.keys(PROGRAM_COSTS) as Array<keyof typeof PROGRAM_COSTS>).map((key) => {
                  const p = PROGRAM_COSTS[key];
                  const isSelected = program === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setProgram(key)}
                      className={`relative p-4 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-elwafa-teal bg-elwafa-teal/5 ring-2 ring-elwafa-teal/20 shadow-sm'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      {p.tuitionFeeIdr === 0 ? (
                        <span className="inline-block px-2 py-0.5 mb-2 text-[10px] font-bold tracking-wide rounded bg-amber-100 text-amber-800 uppercase">
                          Bebas SPP (Gratis)
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-0.5 mb-2 text-[10px] font-bold tracking-wide rounded bg-teal-100 text-teal-800 uppercase">
                          Biaya Level Resmi
                        </span>
                      )}
                      <div className="font-semibold text-xs sm:text-sm text-gray-900 leading-snug">
                        {p.name}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Accommodation */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3 flex items-center justify-between">
                <span>2. Pilihan Tempat Tinggal di Kairo</span>
                <span className="text-xs font-normal text-gray-500">Asrama vs Apartemen</span>
              </label>
              <div className="space-y-2.5">
                {(Object.keys(ACCOMMODATION_COSTS) as Array<keyof typeof ACCOMMODATION_COSTS>).map((key) => {
                  const a = ACCOMMODATION_COSTS[key];
                  const isSelected = accommodation === key;
                  return (
                    <div
                      key={key}
                      onClick={() => setAccommodation(key)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                        isSelected
                          ? 'border-elwafa-teal bg-elwafa-teal/5 ring-1 ring-elwafa-teal/30'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="accommodation"
                        checked={isSelected}
                        onChange={() => setAccommodation(key)}
                        className="mt-1 text-elwafa-teal focus:ring-elwafa-teal"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-semibold text-xs sm:text-sm text-gray-900">{a.name}</span>
                          <span className="text-xs font-bold text-elwafa-ocean shrink-0">
                            {a.monthlyIdr === 0 ? 'Gratis (Seleksi)' : `${formatRupiah(a.monthlyIdr)}/bln`}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500 mt-0.5">{a.note}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Lifestyle / Food */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3 flex items-center justify-between">
                <span>3. Pola Makan & Kebutuhan Harian</span>
                <span className="text-xs font-normal text-gray-500">Uang saku rutin</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(Object.keys(LIFESTYLE_COSTS) as Array<keyof typeof LIFESTYLE_COSTS>).map((key) => {
                  const l = LIFESTYLE_COSTS[key];
                  const isSelected = lifestyle === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setLifestyle(key)}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-elwafa-teal bg-elwafa-teal/5 ring-1 ring-elwafa-teal/30'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="text-xs font-bold text-gray-900">{l.name}</div>
                      <div className="text-xs font-extrabold text-elwafa-ocean mt-1">
                        {formatRupiah(l.monthlyIdr)}
                        <span className="text-[10px] font-normal text-gray-500">/bln</span>
                      </div>
                      <p className="text-[10px] text-gray-500 mt-1 leading-snug">
                        {l.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Currency Note */}
            <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-xl border border-amber-200/60 text-amber-800 text-xs">
              <Info className="w-4 h-4 shrink-0 text-amber-600" />
              <span>
                <strong>Catatan Kurs:</strong> Dihitung dengan kurs acuan <strong>1 EGP ≈ Rp {result.exchangeRateEgp}</strong>. Biaya kuliah S1 Al-Azhar adalah 100% waqf Grand Syeikh (tanpa SPP).
              </span>
            </div>
          </div>

          {/* Result Column (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-elwafa-ocean text-white p-6 sm:p-7 rounded-2xl shadow-xl relative overflow-hidden border border-elwafa-ocean/80">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <span className="text-xs uppercase tracking-wider font-semibold text-teal-200">
                  Ringkasan Estimasi
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-emerald-400/30">
                  Al-Azhar Friendly
                </span>
              </div>

              {/* Monthly Cost in Kairo */}
              <div className="mb-6">
                <div className="text-xs text-teal-100/90 font-medium flex items-center gap-1.5">
                  <Wallet className="w-3.5 h-3.5 text-elwafa-gold" />
                  Kebutuhan Hidup di Kairo (Bulanan)
                </div>
                <div className="mt-1.5 flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                    {formatRupiah(result.monthlyLivingIdr)}
                  </span>
                  <span className="text-xs font-semibold text-teal-200">/ bulan</span>
                </div>
                <div className="text-xs text-amber-300 font-medium mt-0.5">
                  ≈ {result.monthlyLivingEgp.toLocaleString('id-ID')} EGP (Pound Mesir) / bulan
                </div>
              </div>

              {/* Initial Prep Cost */}
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 space-y-2 mb-6">
                <div className="flex items-center justify-between text-xs font-semibold text-teal-100">
                  <span className="flex items-center gap-1.5">
                    <Plane className="w-3.5 h-3.5 text-teal-300" />
                    Modal Awal Keberangkatan:
                  </span>
                  <span className="text-sm font-bold text-white">
                    {formatRupiah(result.initialCostIdr)}
                  </span>
                </div>
                <p className="text-[11px] text-teal-100/70 leading-relaxed">
                  Mencakup tiket pesawat, visa pelajar, penerjemah tersumpah, legalisir kementerian, dan karantina intensif bahasa Arab di Indonesia.
                </p>
              </div>

              {/* Breakdown List */}
              <div className="space-y-2 pt-2 border-t border-white/10 text-xs">
                <div className="flex justify-between text-teal-100/90">
                  <span>SPP Kuliah Resmi Kampus:</span>
                  <span className="font-bold text-amber-300">
                    {result.tuitionFeeIdr === 0 ? 'GRATIS (100% BEASISWA)' : formatRupiah(result.tuitionFeeIdr)}
                  </span>
                </div>
                <div className="flex justify-between text-teal-100/90">
                  <span>Sewa Akomodasi Kairo:</span>
                  <span className="font-medium text-white">{formatRupiah(result.accommodationMonthlyIdr)}/bln</span>
                </div>
                <div className="flex justify-between text-teal-100/90">
                  <span>Konsumsi & Uang Saku:</span>
                  <span className="font-medium text-white">{formatRupiah(result.foodMonthlyIdr)}/bln</span>
                </div>
                <div className="flex justify-between text-teal-100/90">
                  <span>Paket Internet Mesir:</span>
                  <span className="font-medium text-white">{formatRupiah(result.internetMonthlyIdr)}/bln</span>
                </div>
                <div className="flex justify-between text-teal-200 font-semibold pt-2 border-t border-white/10 text-sm">
                  <span>Estimasi Total Tahun ke-1:</span>
                  <span className="text-white font-bold">{formatRupiah(result.firstYearTotalIdr)}</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-6 pt-4 border-t border-white/10 space-y-3">
                <button
                  type="button"
                  onClick={handleConsultWhatsApp}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-colors shadow-md shadow-emerald-950/20"
                >
                  <MessageCircle className="w-4 h-4" />
                  Konsultasikan Rincian via WhatsApp
                </button>

                {onRegisterClick && (
                  <button
                    type="button"
                    onClick={() => onRegisterClick(result.programName)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs transition-colors border border-white/20"
                  >
                    Daftar Program Ini Sekarang
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Trust highlights */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm text-xs text-gray-600 space-y-2.5">
              <div className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-elwafa-gold" />
                Kenapa Memilih Bimbingan Elwafa?
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Pendampingan resmi dari pembekalan bahasa di Jawa Timur hingga asrama di Kairo.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Transparan tanpa biaya tersembunyi; pembayaran bertahap sesuai progres berkas.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

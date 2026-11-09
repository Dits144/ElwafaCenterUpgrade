export interface StudyCostInput {
  program: 's1-azhar' | 'mahad-buuts' | 'markaz-lughah';
  accommodation: 'asrama-elwafa' | 'flat-mandiri' | 'asrama-buuts';
  lifestyle: 'mandiri' | 'standar' | 'lengkap';
  exchangeRateEgp?: number;
}

export interface StudyCostResult {
  programName: string;
  tuitionFeeIdr: number;
  preparationIdr: number;
  flightAndVisaIdr: number;
  legalizationIdr: number;
  initialCostIdr: number;
  accommodationMonthlyIdr: number;
  foodMonthlyIdr: number;
  internetMonthlyIdr: number;
  monthlyLivingIdr: number;
  monthlyLivingEgp: number;
  firstYearTotalIdr: number;
  exchangeRateEgp: number;
}

export const PROGRAM_COSTS = {
  's1-azhar': {
    name: 'S1 Universitas Al-Azhar Kairo',
    tuitionFeeIdr: 0,
    preparationIdr: 4500000,
    flightAndVisaIdr: 12500000,
    legalizationIdr: 2500000,
  },
  'mahad-buuts': {
    name: "Ma'had Bu'uts Al-Azhar (SMP/SMA)",
    tuitionFeeIdr: 0,
    preparationIdr: 3500000,
    flightAndVisaIdr: 12500000,
    legalizationIdr: 2200000,
  },
  'markaz-lughah': {
    name: 'Markaz Lughoh Syeikh Zayed (Dauroh Bahasa)',
    tuitionFeeIdr: 1500000,
    preparationIdr: 3000000,
    flightAndVisaIdr: 12500000,
    legalizationIdr: 2000000,
  },
};

export const ACCOMMODATION_COSTS = {
  'asrama-elwafa': {
    name: 'Asrama Binaan Elwafa di Kairo (Hay Asyir)',
    monthlyIdr: 850000,
    note: 'Fasilitas lengkap: Musyrif 24 jam, AC, Wi-Fi, kajian talaqqi masyaikh, keamanan terjamin.',
  },
  'flat-mandiri': {
    name: 'Flat Mandiri Sharing (Sewa Apartemen Kairo)',
    monthlyIdr: 500000,
    note: 'Sewa apartemen bersama 4-5 mahasiswa Indonesia di kawasan Nasr City/Darrasah.',
  },
  'asrama-buuts': {
    name: "Madinatul Bu'uts Islamiyyah (Resmi Al-Azhar)",
    monthlyIdr: 0,
    note: 'Asrama resmi Al-Azhar (bebas biaya bagi santri yang lolos seleksi beasiswa asrama).',
  },
};

export const LIFESTYLE_COSTS = {
  mandiri: {
    name: 'Hemat & Mandiri (Masak Sendiri)',
    monthlyIdr: 450000,
    description: 'Belanja bahan mentah di pasar lokal (Souq Sayeda/Hay Asyir) & masak bersama.',
  },
  standar: {
    name: 'Standar Mahasiswa (Katering / Warteg Mesir)',
    monthlyIdr: 750000,
    description: 'Kombinasi masak ringan dan makan katering santri Indonesia / makanan lokal khas Mesir.',
  },
  lengkap: {
    name: 'Nyaman & Fleksibel (Makan Luar & Metro)',
    monthlyIdr: 1100000,
    description: 'Katering penuh, jajanan, mobilitas Metro Kairo, dan suplemen.',
  },
};

export const INTERNET_MONTHLY_IDR = 90000;

export function calculateStudyCost({
  program = 's1-azhar',
  accommodation = 'asrama-elwafa',
  lifestyle = 'standar',
  exchangeRateEgp = 320,
}: StudyCostInput): StudyCostResult {
  const progData = PROGRAM_COSTS[program] || PROGRAM_COSTS['s1-azhar'];
  const accData = ACCOMMODATION_COSTS[accommodation] || ACCOMMODATION_COSTS['asrama-elwafa'];
  const lifeData = LIFESTYLE_COSTS[lifestyle] || LIFESTYLE_COSTS['standar'];

  const initialCostIdr =
    progData.tuitionFeeIdr +
    progData.preparationIdr +
    progData.flightAndVisaIdr +
    progData.legalizationIdr;

  const monthlyLivingIdr =
    accData.monthlyIdr +
    lifeData.monthlyIdr +
    INTERNET_MONTHLY_IDR;

  const monthlyLivingEgp = Math.round(monthlyLivingIdr / exchangeRateEgp);
  const firstYearTotalIdr = initialCostIdr + monthlyLivingIdr * 12;

  return {
    programName: progData.name,
    tuitionFeeIdr: progData.tuitionFeeIdr,
    preparationIdr: progData.preparationIdr,
    flightAndVisaIdr: progData.flightAndVisaIdr,
    legalizationIdr: progData.legalizationIdr,
    initialCostIdr,
    accommodationMonthlyIdr: accData.monthlyIdr,
    foodMonthlyIdr: lifeData.monthlyIdr,
    internetMonthlyIdr: INTERNET_MONTHLY_IDR,
    monthlyLivingIdr,
    monthlyLivingEgp,
    firstYearTotalIdr,
    exchangeRateEgp,
  };
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}

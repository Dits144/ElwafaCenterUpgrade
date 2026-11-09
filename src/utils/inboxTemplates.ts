export interface InboxTemplate {
  id: string;
  label: string;
  category: 'sapaan' | 'berkas' | 'biaya' | 'followup';
  text: string;
}

export const INBOX_TEMPLATES: InboxTemplate[] = [
  {
    id: 'sapaan-awal',
    label: '👋 Sapaan & Brosur',
    category: 'sapaan',
    text: `Assalamu'alaikum Wr. Wb. Kak {nama},

Terima kasih telah menghubungi Elwafa Center terkait {subjek}.

Saya {admin} dari Tim Admisi Elwafa. Kami siap mendampingi proses persiapan studi ke Universitas Al-Azhar Kairo dan Ma'had Bu'uts.

Apakah Kak {nama} sudah memiliki jadwal untuk konsultasi online atau ingin kami kirimkan brosur kurikulum & program pembinaan terlebih dahulu?

Jazakumullah khairan.
Elwafa Center — Sahabat Menuju Al-Azhar`,
  },
  {
    id: 'panduan-berkas',
    label: '📄 Panduan Berkas & Legalisir',
    category: 'berkas',
    text: `Assalamu'alaikum Wr. Wb. Kak {nama},

Berikut panduan berkas persyaratan studi ke Mesir yang perlu dipersiapkan:
1. Ijazah & Transkrip Nilai (asli + legalisir Kemenag/Dinas)
2. Akta Kelahiran & Kartu Keluarga
3. Paspor RI 48 halaman (minimal masa berlaku 2 tahun)
4. Pasfoto formal latar putih & merah
5. Surat rekomendasi pondok/sekolah

Tim Elwafa siap membantu proses penerjemahan tersumpah bahasa Arab dan legalisasi Kemenkumham, Kemenlu, serta Kedutaan Mesir.

Jika ada berkas yang ingin diperiksa terlebih dahulu, silakan kirimkan fotonya di sini ya Kak.

Salam hormat,
{admin} — Elwafa Center`,
  },
  {
    id: 'rincian-biaya',
    label: '💰 Estimasi Biaya & Living Cost',
    category: 'biaya',
    text: `Assalamu'alaikum Wr. Wb. Kak {nama},

Menindaklanjuti pertanyaan Kakak mengenai rincian biaya studi ke Al-Azhar Kairo:

1. Biaya Kuliah: GRATIS / Bebas SPP dari Al-Azhar Kairo.
2. Biaya Hidup di Mesir: Sangat terjangkau, berkisar antara Rp 400.000 – Rp 1.000.000 / bulan (makan, akomodasi, kebutuhan harian).
3. Biaya Pembinaan di Indonesia: Mencakup karantina bahasa Arab fusha, asrama, modul matrikulasi, dan bimbingan tes.

Kami menyediakan kalkulator simulasi biaya transparan di website resmi kami. Apakah Kak {nama} berkenan jika kami jadwalkan sesi zoom gratis bersama tim pembina di Kairo?

Jazakumullah khairan,
{admin} — Elwafa Center`,
  },
  {
    id: 'pengingat-batch',
    label: '⏰ Pengingat Batas Kuota Batch',
    category: 'followup',
    text: `Assalamu'alaikum Wr. Wb. Kak {nama},

Mengingatkan kembali bahwa kuota pendaftaran batch pembekalan untuk program {subjek} akan segera ditutup pada {tenggat}.

Bagi calon santri yang telah melengkapi berkas awal, tim Elwafa akan memprioritaskan penerbitan surat rekomendasi dan pendampingan tes penempatan (Tahdid Mustawa).

Apakah Kak {nama} ingin mengamankan kursi pendaftaran hari ini?

Wassalamu'alaikum Wr. Wb.
{admin} — Admisi Elwafa Center`,
  },
];

export function applyTemplate(
  templateText: string,
  inquiry: { name?: string; subject?: string; phone?: string; due?: string },
  adminName?: string
): string {
  const safeName = inquiry.name?.trim() || 'Calon Santri';
  const safeSubject = inquiry.subject?.trim() || 'Program Studi Al-Azhar';
  const safeAdmin = adminName?.trim() || 'Tim Admisi';
  const safeDue = inquiry.due?.trim() || 'waktu dekat';

  return templateText
    .replace(/{nama}/g, safeName)
    .replace(/{subjek}/g, safeSubject)
    .replace(/{admin}/g, safeAdmin)
    .replace(/{tenggat}/g, safeDue);
}

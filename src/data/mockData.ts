import { Student, Program, Activity, Announcement, Article } from '../types';

export const INITIAL_PROGRAMS: Program[] = [
  {
    id: 'prog-s1-azhar',
    slug: 's1-al-azhar-kairo',
    title: 'Bimbingan Kuliah S1 Universitas Al-Azhar Kairo',
    category: 'Perguruan Tinggi',
    description: 'Program persiapan terpadu menghadapi seleksi masuk S1 Al-Azhar (Diktis Kemenag & Pusiba), bimbingan tes tahfidz, bahasa Arab fusha, dan telaah turats.',
    highlights: [
      'Simulasi ujian Diktis & Pusiba berkala',
      'Matrikulasi bahasa Arab intensif (Niveau)',
      'Pendampingan pemberkasan Kemenag & KBRI',
      'Fasilitas asrama karantina & bimbingan alumni Al-Azhar'
    ],
    duration: '6 Bulan Intensif',
    schedule: 'Senin - Sabtu (Full Day)',
    quota: 40,
    enrolledCount: 32,
    requirements: [
      'Lulusan MA / SMA / Pondok Pesantren setara',
      'Ijazah & Transkrip Nilai (asli & terjemahan bahasa Arab)',
      'Hafalan Al-Qur\'an minimal 2 Juz (diutamakan)',
      'Paspor aktif minimal 18 bulan',
      'SKCK & Surat Keterangan Sehat dari Rumah Sakit'
    ],
    image: '/assets/Hero-Image-3.2-768x768.png',
    featured: true,
    priceNote: 'Tersedia paket karantina asrama & pendampingan flat Kairo',
    curriculum: [
      'Tahfidz Al-Qur\'an Tajwid & Bersanad (Target Mutqin)',
      'Matrikulasi Lughoh Arabiyyah (Kalam, Qira\'ah, Kitabah, Istima\')',
      'Kajian Kaidah Nahwu, Sharaf, dan Balaghah Kitab Turats',
      'Telaah Muqarrar Al-Azhar (Tauhid, Fiqh 4 Mazhab, Hadits)',
      'Simulasi CBT Nasional Kemenag & Tryout Muqabalah Lisan'
    ],
    facilitiesIndonesia: [
      'Asrama karantina representatif biah lughawiyyah 24 jam',
      'Konsumsi harian 3x menu bergizi santri',
      'Bimbingan langsung masyaikh Al-Azhar & ustadz alumni Kairo',
      'Modul pelajaran, bank soal 10 tahun terakhir, & seragam'
    ],
    facilitiesMesir: [
      'Penjemputan langsung di Cairo International Airport',
      'Penyediaan flat/asrama santri Elwafa di Nasr City/Darrasah',
      'Pendampingan izin tinggal (Iqamah), visa, & buka rekening bank',
      'Registrasi resmi di Rektorat Al-Azhar & pendampingan muadalah'
    ],
    targetDegrees: [
      'Fakultas Ushuluddin (Tafsir, Hadits, Aqidah Filsafat, Dakwah)',
      'Fakultas Syariah Wal Qanun (Hukum Islam & Perundang-undangan)',
      'Fakultas Bahasa Arab (Lughoh, Sastra, Balaghah)',
      'Fakultas Dirasat Islamiyah Wal Arabiyah'
    ]
  },
  {
    id: 'prog-mahad-azhar',
    slug: 'mahad-al-azhar-kairo',
    title: 'Persiapan Ma\'had Al-Azhar (SMP/MTs & SMA/MA)',
    category: 'Sekolah Menengah',
    description: 'Jalur pendidikan formal pra-universitas di Ma\'had Bu\'uts Al-Azhar Kairo untuk jenjang I\'dadi (MTs) dan Tsanawi (MA). Membangun pondasi bahasa Arab sejak usia dini.',
    highlights: [
      'Kurikulum standar Ma\'had Al-Azhar Mesir',
      'Fokus penguatan nahwu, sharaf, dan muthala\'ah',
      'Pendampingan wali asrama selama di Kairo',
      'Legalitas mu\'adalah ijazah resmi'
    ],
    duration: '4 - 8 Bulan',
    schedule: 'Setiap Hari Kerja',
    quota: 30,
    enrolledCount: 24,
    requirements: [
      'Lulusan SD/MI untuk jenjang I\'dadi (SMP)',
      'Lulusan SMP/MTs untuk jenjang Tsanawi (SMA)',
      'Surat persetujuan orang tua / wali bermaterai',
      'Akta Kelahiran & Kartu Keluarga dilegalisir',
      'Paspor santri aktif'
    ],
    image: '/assets/karantina_ciamis.png',
    featured: true,
    priceNote: 'Pendampingan penuh hingga tiba di asrama Kairo',
    curriculum: [
      'Dasar-dasar Bahasa Arab Komunikatif untuk Remaja',
      'Hafalan Al-Qur\'an Juz 30, 29, 28 dengan Tartil',
      'Pengantar Tajwid & Adab Penuntut Ilmu',
      'Matrikulasi Materi Pelajaran Sekolah Al-Azhar Kairo'
    ],
    facilitiesIndonesia: [
      'Asrama santri terbimbing dengan pembina 24 jam',
      'Latihan kemandirian, adab pesantren, dan bahasa Arab harian',
      'Konseling psikologis adaptasi hidup jauh dari keluarga'
    ],
    facilitiesMesir: [
      'Penjemputan bandara dan pengantaran ke Asrama Bu\'uts Al-Azhar',
      'Wali asuh perwakilan Elwafa Center di Kairo yang memantau nilai',
      'Laporan perkembangan akademik berkala kepada orang tua di Indonesia'
    ],
    targetDegrees: [
      'I\'dadi Al-Azhar (Setara SMP Islam)',
      'Tsanawi Al-Azhar (Setara SMA Islam)',
      'Jalur Prioritas Langsung Menuju S1 Universitas Al-Azhar'
    ]
  },
  {
    id: 'prog-markaz-lughoh',
    slug: 'markaz-lughoh-tahfidz',
    title: 'Karantina Bahasa Arab & Tahfidz Intensif',
    category: 'Bahasa & Al-Qur\'an',
    description: 'Program akselerasi penguasaan bahasa Arab aktif dan pasif (speaking & reading turats) serta muraja\'ah hafalan Al-Qur\'an bagi calon mahasiswa luar negeri.',
    highlights: [
      'Lingkungan 100% berbahasa Arab (Biah Lughawiyyah)',
      'Bimbingan langsung Native Speaker & Masyaikh Al-Azhar',
      'Target mutqin hafalan juz pilihan',
      'Tryout ujian lisan dan tulis standar Mesir'
    ],
    duration: '3 Bulan',
    schedule: 'Asrama Penuh (Boarding)',
    quota: 50,
    enrolledCount: 45,
    requirements: [
      'Bisa membaca Al-Qur\'an dengan tartil',
      'Komitmen mengikuti disiplin asrama 24 jam',
      'Sehat jasmani dan rohani',
      'Mengisi formulir komitmen kedisiplinan'
    ],
    image: '/assets/tryout_camaba.png',
    featured: false,
    priceNote: 'Termasuk akomodasi asrama, konsumsi, dan modul lengkap',
    curriculum: [
      'Muhadatsah Yaumiyyah (Percakapan Bahasa Arab Sehari-hari)',
      'Kajian Nahwu Sharaf Terapan & I\'rab',
      'Fashahah & Makharijul Huruf Al-Qur\'an',
      'Metode Cepat Menghafal & Muraja\'ah Mandiri'
    ],
    facilitiesIndonesia: [
      'Kamar asrama berpenyejuk udara & ranjang susun rapi',
      'Masjid/Halaqah center terintegrasi',
      'Makan 3 kali sehari dan snack sore',
      'Sertifikat resmi kelulusan karantina'
    ],
    facilitiesMesir: [
      'Konsultasi lanjutan penempatan Markaz Lughoh Syeikh Zayed di Kairo'
    ],
    targetDegrees: [
      'Sertifikasi Kelayakan Bahasa Arab Tingkat Lanjutan',
      'Syahadah Tahfidz Al-Qur\'an'
    ]
  }
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-1',
    slug: 'skema-twinning-program-kemenag-al-azhar',
    title: 'Skema Twinning Program Kemenag – Al-Azhar Mesir: Dua Tahun di Indonesia, Dua Tahun di Kairo',
    category: 'Kerjasama',
    summary: 'Kementerian Agama RI bersama Rektorat Universitas Al-Azhar memperbarui mekanisme kerjasama akademik twinning program guna mempermudah akses mahasiswa nusantara.',
    content: `Kementerian Agama Republik Indonesia bersama jajaran pimpinan Universitas Al-Azhar Kairo resmi memperkuat kerjasama strategis melalui skema Twinning Program. Dalam skema ini, mahasiswa Indonesia memiliki opsi menempuh dua tahun pertama perkuliahan matrikulasi dan dasar syariah di lembaga mitra terakreditasi di Indonesia, kemudian melanjutkan dua tahun penyelesaian sarjana langsung di kampus Al-Azhar Kairo Mesir.

Langkah ini diapresiasi oleh banyak kalangan karena meringankan adaptasi budaya dan beban awal para santri, sekaligus memastikan kompetensi bahasa Arab dan hafalan Al-Qur'an berada pada level mutqin sebelum bertolak ke Mesir.

Elwafa Center sebagai mitra pembinaan studi luar negeri terus memperbaharui kurikulum karantina agar selaras 100% dengan standar pengujian terbaru yang ditetapkan oleh Al-Azhar dan Diktis Kemenag.`,
    author: 'Tim Redaksi Elwafa',
    authorRole: 'Divisi Humas & Hubungan Luar Negeri',
    date: '20 Oktober 2026',
    image: '/assets/dauroh_success.png',
    status: 'PUBLISHED',
    readTime: '4 menit baca'
  },
  {
    id: 'art-2',
    slug: 'pelepasan-santri-karantina-ciamis-al-azhar',
    title: 'Pelepasan 85 Santri Karantina Bahasa Arab Menuju Universitas Al-Azhar Kairo',
    category: 'Kegiatan',
    summary: 'Suasana haru dan khidmat menyelimuti wisuda kelulusan program karantina 3 bulan di Ciamis menjelang keberangkatan ke Bandara Soekarno-Hatta menuju Kairo.',
    content: `Sebanyak 85 santri bimbingan Elwafa Center resmi dilepas dalam acara wisuda dan doa bersama pelepasan keberangkatan ke Mesir. Para santri telah menyelesaikan pembinaan intensif selama 3 hingga 6 bulan yang mencakup biah lughawiyyah 24 jam, penguatan hafalan Al-Qur'an bersanad, dan simulasi ujian muqabalah.

Hadir dalam acara tersebut para masyaikh alumni Al-Azhar, perwakilan pemerintah daerah, serta para orang tua dan wali santri. Direktur Elwafa Center berpesan agar para calon mahasiswa senantiasa menjaga adab, keluhuran akhlak nusantara, dan memanfaatkan kesempatan mulia belajar di kiblat keilmuan Islam tertua di dunia.`,
    author: 'Ustadz Ahmad Fauzi',
    authorRole: 'Koordinator Asrama Karantina',
    date: '16 Oktober 2026',
    image: '/assets/karantina_ciamis.png',
    status: 'PUBLISHED',
    readTime: '3 menit baca'
  },
  {
    id: 'art-3',
    slug: 'tips-lulus-ujian-muqabalah-bahasa-arab',
    title: 'Panduan Praktis Menghadapi Ujian Wawancara (Muqabalah) Calon Mahasiswa Al-Azhar',
    category: 'Akademik',
    summary: 'Ujian wawancara bahasa Arab merupakan salah satu penentu utama kelulusan. Pelajari kriteria penilaian masyaikh dan strategi menjawab dengan percaya diri.',
    content: `Banyak calon mahasiswa yang menguasai gramatika nahwu dan sharaf di atas kertas, namun gugup saat menghadapi penguji asli asal Mesir dalam sesi Muqabalah Syakhshiyyah.

Berikut adalah 4 poin krusial yang dinilai oleh tim penguji Al-Azhar:
1. Fashahah & Makharijul Huruf: Kejelasan artikulasi saat membaca ayat suci Al-Qur'an dan teks kitab turats.
2. Kefasihan Bahasa Fusha: Menggunakan bahasa Arab baku tanpa mencampur bahasa ammiyah atau dialek daerah.
3. Wawasan Keislaman Moderat (Wasathiyyah): Pemahaman nilai-nilai toleransi, moderasi beragama, dan tradisi keilmuan Ahlussunnah wal Jama'ah.
4. Adab & Ketenangan Mental: Sikap sopan, tatapan mata yang tenang, dan gestur menghormati masyaikh penguji.`,
    author: 'Syekh Mahmud Al-Azhari',
    authorRole: 'Konsultan Pembina Bahasa Arab',
    date: '12 Oktober 2026',
    image: '/assets/tryout_camaba.png',
    status: 'PUBLISHED',
    readTime: '5 menit baca'
  }
];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'EWF-2026-001',
    name: 'Faris Ramadhan',
    email: 'faris.ramadhan@gmail.com',
    whatsapp: '081289123456',
    gender: 'L',
    birthPlace: 'Cirebon',
    birthDate: '2007-04-12',
    originCity: 'Cirebon, Jawa Barat',
    address: 'Jl. Sunan Gunung Jati No. 45, Cirebon',
    schoolOrigin: 'MAS Al-Hikmah Cirebon',
    schoolType: 'MA',
    graduationYear: '2025',
    parentName: 'H. Bambang Sugiarto',
    parentPhone: '081377889900',
    parentOccupation: 'Wiraswasta',
    selectedProgramId: 'prog-s1-azhar',
    selectedProgramName: 'Bimbingan Kuliah S1 Universitas Al-Azhar Kairo',
    status: 'PENDING',
    registrationDate: '2026-10-18',
    documents: [
      { id: 'doc-1', name: 'Scan Ijazah Terlegalisir', type: 'PDF', status: 'uploaded', fileName: 'Ijazah_Faris_Ramadhan.pdf', uploadDate: '2026-10-18' },
      { id: 'doc-2', name: 'Transkrip Nilai / Rapor', type: 'PDF', status: 'uploaded', fileName: 'Transkrip_Nilai.pdf', uploadDate: '2026-10-18' },
      { id: 'doc-3', name: 'Paspor (Halaman Depan)', type: 'JPG', status: 'uploaded', fileName: 'Paspor_Faris.jpg', uploadDate: '2026-10-18' },
      { id: 'doc-4', name: 'Pas Foto 4x6 Latar Putih', type: 'PNG', status: 'uploaded', fileName: 'PasFoto_Faris.png', uploadDate: '2026-10-18' }
    ],
    biodataCompleted: true,
    avatar: '/assets/Model-1.png'
  },
  {
    id: 'EWF-2026-002',
    name: 'Ahmad Fauzi Al-Hafidz',
    email: 'ahmad.fauzi@yahoo.com',
    whatsapp: '082133445566',
    gender: 'L',
    birthPlace: 'Solo',
    birthDate: '2006-09-05',
    originCity: 'Surakarta, Jawa Tengah',
    address: 'Komplek Pesantren Ta\'mirul Islam No. 12',
    schoolOrigin: 'Pondok Modern Darussalam Gontor',
    schoolType: 'Pondok Pesantren',
    graduationYear: '2025',
    parentName: 'Ustadz Mansyur',
    parentPhone: '081299001122',
    parentOccupation: 'Guru / Tenaga Pengajar',
    selectedProgramId: 'prog-s1-azhar',
    selectedProgramName: 'Bimbingan Kuliah S1 Universitas Al-Azhar Kairo',
    status: 'APPROVED',
    registrationDate: '2026-10-14',
    reviewedAt: '2026-10-16 14:20',
    reviewedBy: 'Ustadz Ridwan (Admin Verifikator)',
    documents: [
      { id: 'doc-21', name: 'Scan Ijazah Terlegalisir', type: 'PDF', status: 'verified', fileName: 'Ijazah_AhmadFauzi.pdf', uploadDate: '2026-10-14' },
      { id: 'doc-22', name: 'Sertifikat Tahfidz 30 Juz', type: 'PDF', status: 'verified', fileName: 'Syahadah_Tahfidz.pdf', uploadDate: '2026-10-14' }
    ],
    biodataCompleted: true
  },
  {
    id: 'EWF-2026-003',
    name: 'Siti Maryam Azzahra',
    email: 'maryam.azzahra@gmail.com',
    whatsapp: '085211223344',
    gender: 'P',
    birthPlace: 'Bandung',
    birthDate: '2007-01-20',
    originCity: 'Bandung, Jawa Barat',
    address: 'Jl. Sukajadi No. 102, Bandung',
    schoolOrigin: 'SMA Darul Hikam Bandung',
    schoolType: 'SMA',
    graduationYear: '2025',
    parentName: 'Dr. H. Hendra Gunawan',
    parentPhone: '081122334455',
    parentOccupation: 'Dosen',
    selectedProgramId: 'prog-s1-azhar',
    selectedProgramName: 'Bimbingan Kuliah S1 Universitas Al-Azhar Kairo',
    status: 'REVISION_REQUIRED',
    registrationDate: '2026-10-16',
    reviewedAt: '2026-10-17 09:30',
    reviewedBy: 'Ustadz Ridwan (Admin Verifikator)',
    revisionNotes: 'Mohon upload ulang scan ijazah halaman legalisir cap basah kementerian agama yang lebih jelas dan nomor akta kelahiran yang terbaca utuh.',
    documents: [
      { id: 'doc-31', name: 'Scan Ijazah', type: 'PDF', status: 'revision', fileName: 'Ijazah_Blur.pdf', uploadDate: '2026-10-16' },
      { id: 'doc-32', name: 'Pas Foto', type: 'JPG', status: 'verified', fileName: 'Foto_Maryam.jpg', uploadDate: '2026-10-16' }
    ],
    biodataCompleted: true
  },
  {
    id: 'EWF-2026-004',
    name: 'Muhammad Ridho Pratama',
    email: 'ridho.pratama@outlook.com',
    whatsapp: '081399887766',
    gender: 'L',
    birthPlace: 'Padang',
    birthDate: '2007-11-03',
    originCity: 'Padang, Sumatera Barat',
    address: 'Jl. Khatib Sulaiman No. 8, Padang',
    schoolOrigin: 'MAN 2 Kota Padang',
    schoolType: 'MA',
    graduationYear: '2025',
    parentName: 'H. Syamsudin',
    parentPhone: '081266778899',
    parentOccupation: 'Pedagang',
    selectedProgramId: 'prog-markaz-lughoh',
    selectedProgramName: 'Karantina Bahasa Arab & Tahfidz Intensif',
    status: 'PENDING',
    registrationDate: '2026-10-19',
    documents: [
      { id: 'doc-41', name: 'Scan Rapor Semester 1-5', type: 'PDF', status: 'uploaded', fileName: 'Rapor_Ridho.pdf', uploadDate: '2026-10-19' }
    ],
    biodataCompleted: true
  },
  {
    id: 'EWF-2026-005',
    name: 'Nabila Khoirunnisa',
    email: 'nabila.khoir@gmail.com',
    whatsapp: '087811224455',
    gender: 'P',
    birthPlace: 'Yogyakarta',
    birthDate: '2008-03-15',
    originCity: 'Sleman, D.I. Yogyakarta',
    address: 'Jl. Kaliurang KM 12, Sleman',
    schoolOrigin: 'MTs Muallimat Muhammadiyah',
    schoolType: 'MA',
    graduationYear: '2026',
    parentName: 'Drs. Supriyanto',
    parentPhone: '081328901234',
    parentOccupation: 'PNS',
    selectedProgramId: 'prog-mahad-azhar',
    selectedProgramName: 'Persiapan Ma\'had Al-Azhar (SMP/MTs & SMA/MA)',
    status: 'DRAFT',
    registrationDate: '2026-10-20',
    documents: [],
    biodataCompleted: false
  }
];

export const INITIAL_ACTIVITIES: Activity[] = [
  {
    id: 'act-1',
    title: 'Karantina Intensif Bahasa Arab & Tahfidz Al-Azhar',
    date: '12 Oktober 2026',
    image: '/assets/karantina_ciamis.png',
    description: 'Pelepasan santri program pembinaan intensif 3 bulan persiapan tes seleksi masuk Universitas Al-Azhar di Ciamis.',
    category: 'Karantina'
  },
  {
    id: 'act-2',
    title: 'Dauroh Sukses Tembus Al-Azhar Kairo Bersama Alumni',
    date: '28 September 2026',
    image: '/assets/dauroh_success.png',
    description: 'Seminar motivasi & strategi menjawab soal muqabalah serta tes tulis Al-Azhar bersama Masyaikh Kairo.',
    category: 'Seminar'
  },
  {
    id: 'act-3',
    title: 'Tryout Akbar Nasional Calon Mahasiswa Baru Al-Azhar',
    date: '15 September 2026',
    image: '/assets/tryout_camaba.png',
    description: 'Simulasi ujian serentak nasional berbasis CBT menguji materi Lughoh Arabiyyah, Balaghah, dan Syariah.',
    category: 'Tryout'
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Jadwal Simulasi Tes Wawancara (Muqabalah) Gelombang 1',
    date: '20 Oktober 2026',
    category: 'Akademik',
    important: true,
    content: 'Bagi seluruh calon mahasiswa yang telah diverifikasi (status Disetujui), gladi resik muqabalah bahasa Arab akan diselenggarakan hari Sabtu, 24 Oktober 2026 pukul 08.30 WIB via Zoom Meeting.'
  },
  {
    id: 'ann-2',
    title: 'Pemberkasan Visa Pelajar Kairo Angkatan 2026/2027',
    date: '16 Oktober 2026',
    category: 'Keberangkatan',
    important: false,
    content: 'Pastikan paspor asli memiliki masa berlaku minimal 18 bulan ke depan saat proses legalisir Kemenkumham dan Kemlu RI.'
  },
  {
    id: 'ann-3',
    title: 'Karantina Bahasa Arab Intensif Gelombang November',
    date: '10 Oktober 2026',
    category: 'Administrasi',
    important: false,
    content: 'Pendaftaran asrama karantina bahasa Arab dibuka sampai kuota 40 peserta terpenuhi. Konfirmasi kedatangan melalui nomor helpdesk Elwafa.'
  }
];

import { Student, Program, Activity, Announcement, Article, CalendarEvent } from '../types';

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
    image: '/assets/8.jpeg',
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
    image: '/assets/tentang-elwafa.jpeg',
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
    image: '/assets/gallery/9.jpeg',
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
    id: "art-afwaja-1",
    slug: "try-out-ujian-hadatsah-muadalah-al-azhar",
    title: "Elwafa Center Gelar Try Out Akbar! Persiapkan Camaba Hadapi Ujian Hadatsah Mu\u2019adalah",
    category: "TERKINI",
    summary: "Ujian Hadatsah Mu\u2019adalah (penyetaraan ijazah) merupakan tahapan krusial seleksi Al-Azhar Kairo. Santri menjalani simulasi komprehensif setelah menempuh Dauroh Ta\u2019hiliyah intensif.",
    content: `Ciamis & Bogor – Ujian Hadatsah Mu’adalah, atau yang juga dikenal sebagai ujian penyetaraan ijazah, dilaksanakan secara serentak untuk menguji kesiapan santri menuju gerbang Universitas Al-Azhar, Mesir. 

Setelah menjalani Dauroh Ta’hiliyah intensif selama 40 hari, seluruh materi yang telah dipelajari dalam program tersebut diujikan dalam simulasi berstandar resmi. Mulai dari pemahaman qawaid nahwu, sharaf, muthala'ah turats, hingga hafalan Al-Qur'an dan wawancara lisan (muqabalah syakhshiyyah).

Direktur Pembinaan Elwafa Center menegaskan bahwa Try Out ini bertujuan memetakan penguasaan materi santri serta membangun ketenangan psikologis saat menghadapi masyaikh penguji nantinya.`,
    author: "Tim Akademik Elwafa",
    authorRole: "Divisi Kurikulum & Ujian",
    date: "12/08/2025",
    image: "/assets/articles/DSC03995-scaled.jpg",
    status: 'PUBLISHED',
    readTime: "4 menit baca"
  },
  {
    id: "art-afwaja-2",
    slug: "suasana-asri-karantina-calon-azhary-ciamis",
    title: "Suasana Asri Karantina Calon Azhary di Ciamis: Belajar di Tengah Alam yang Sejuk dan Damai",
    category: "TERKINI",
    summary: "Menghafal Al-Qur'an dan memperdalam bahasa Arab fusha 24 jam dengan suasana pegunungan asri, mendukung fokus dan kedisiplinan santri secara optimal.",
    content: `Kompleks asrama karantina Elwafa di Ciamis menawarkan ekosistem pembelajaran yang dirancang khusus untuk memadukan ketenangan alam dengan kedisiplinan pondok modern.

Jauh dari kebisingan kota, santri menerapkan disiplin Biah Lughawiyyah (lingkungan 100% berbahasa Arab). Setiap sudut asrama menjadi halaqah ilmu, mulai dari talaqqi subuh kitab turats, setoran hafalan Al-Qur'an bersanad, hingga muhadatsah yaumiyyah bersama para asatidz lulusan Al-Azhar Kairo.`,
    author: "Ustadz Ihsan Efendi, Lc",
    authorRole: "Pengasuh Ma'had Karantina",
    date: "08/08/2025",
    image: "/assets/gallery/9.jpeg",
    status: 'PUBLISHED',
    readTime: "3 menit baca"
  },
  {
    id: "art-afwaja-3",
    slug: "taqiyya-shafarani-prestasi-hadis-al-azhar",
    title: "Taqiyya Shafarani, Camaba Asal Jakarta dengan Segudang Prestasi Hadis, Wujudkan Mimpi ke Al-Azhar Mesir",
    category: "REKOMENDASI",
    summary: "Kisah inspiratif santriwati berprestasi tingkat nasional yang memperdalam sanad hadits dan bahasa Arab di Elwafa Center demi menggapai kursi Fakultas Ushuluddin Kairo.",
    content: `Bagi Taqiyya Shafarani, menuntut ilmu di universitas tertua di dunia, Al-Azhar Mesir, bukanlah sekadar impian, melainkan amanah peradaban. Santriwati berprestasi asal Jakarta ini telah mengoleksi berbagai penghargaan di bidang Musabaqah Hifdzil Hadits (MHH) tingkat nasional.

Bergabung bersama program bimbingan intensif Elwafa Center, Taqiyya fokus memperkuat hafalan kutubus sittah, memperdalam musthalah al-hadits, dan mengasah kefasihan fusha agar mampu bersaing di tingkat internasional di Kairo.`,
    author: "Redaksi Elwafa Media",
    authorRole: "Liputan Khusus Santri",
    date: "05/08/2025",
    image: "/assets/taqiyya_shafarani.png",
    status: 'PUBLISHED',
    readTime: "5 menit baca"
  },
  {
    id: "art-afwaja-4",
    slug: "4-fakta-menarik-tentang-al-azhar-kairo",
    title: "4 Fakta Menarik tentang Universitas Al-Azhar Mesir yang Wajib Kamu Tahu",
    category: "SEPUTAR AL-AZHAR",
    summary: "Dari tradisi talaqqi di serambi masjid ribuan tahun hingga prinsip Wasathiyyah yang diakui dunia, simak mengapa Al-Azhar menjadi magnet penuntut ilmu global.",
    content: `1. Didirikan Lebih dari 1.000 Tahun Lalu (970 Masehi): Al-Azhar adalah salah satu universitas tertua di dunia yang terus beroperasi tanpa henti mencetak ulama dan cendekiawan.
2. Tradisi Talaqqi Bersanad di Masjid Al-Azhar: Di samping kuliah formal modern di kampus Nasr City dan Darrasah, tradisi halaqah keilmuan para masyaikh sepuh tetap hidup setiap hari.
3. Benteng Moderasi Beragama (Wasathiyyah): Al-Azhar mengajarkan 4 mazhab fiqih secara adil dan toleran, mencetak lulusan yang berpandangan luas dan damai.
4. Mahasiswa Asing Terbanyak di Dunia Islam: Puluhan ribu santri mancanegara dari lebih 100 negara belajar di Ma'had Bu'uts dan fakultas-fakultas Al-Azhar.`,
    author: "Dr. Syarif Al-Azhari",
    authorRole: "Konsultan Akademik Timur Tengah",
    date: "30/06/2025",
    image: "/assets/articles/pexels-iramezatil-739231740-20682503-scaled.jpg",
    status: 'PUBLISHED',
    readTime: "4 menit baca"
  },
  {
    id: "art-afwaja-5",
    slug: "mengenal-ujian-tahdid-mustawa-gerbang-awal-al-azhar",
    title: "Mengenal Ujian Tahdid Mustawa: Gerbang Awal Menuju Al-Azhar, Digelar Tiap Semester",
    category: "SEPUTAR AL-AZHAR",
    summary: "Penjelasan menyeluruh tentang placement test (Tahdid Mustawa) Markaz Lughoh Syeikh Zayed Al-Azhar untuk menentukan level kemahiran bahasa santri baru.",
    content: `Setiap mahasiswa baru Universitas Al-Azhar yang belum memiliki sertifikat lulusan Markaz Lughoh wajib mengikuti Ujian Tahdid Mustawa. Ujian ini menguji 4 kemahiran: Fahmul Masmu' (Listening), Fahmul Maqru' (Reading), Al-Qawaid wal Mufradat (Grammar & Vocabulary), serta Al-Kitabah wal Muhadatsah (Writing & Speaking).

Hasil ujian memetakan santri ke dalam level: Mubtadi (Pemula), Mutawassith (Menengah), hingga Mutaqaddim (Mahir). Pembinaan di Elwafa Center dirancang untuk mengantarkan santri langsung mencapai level tertinggi agar dapat langsung masuk bangku kuliah sarjana tanpa masa tunggu matrikulasi yang panjang.`,
    author: "Tim Verifikator Elwafa",
    authorRole: "Pusat Bahasa Arab Terpadu",
    date: "13/06/2025",
    image: "/assets/articles/WhatsApp-Image-2025-05-03-at-22.29.32-scaled.jpeg",
    status: 'PUBLISHED',
    readTime: "4 menit baca"
  },
  {
    id: "art-afwaja-6",
    slug: "program-mahad-smp-sma-al-azhar-mesir",
    title: "Program Ma\u2019had Bu'uts (SMP/SMA) di Al-Azhar Mesir: Persiapan Sedini Mungkin",
    category: "SEPUTAR AL-AZHAR",
    summary: "Informasi lengkap pendaftaran Ma'had Bu'uts Al-Azhar jenjang I'dadi dan Tsanawi bagi lulusan SD/MI dan SMP/MTs yang ingin menimba ilmu langsung di Kairo.",
    content: `Banyak orang tua mengira belajar di Al-Azhar Mesir hanya diperuntukkan bagi jenjang sarjana (S1). Padahal Al-Azhar memiliki sistem sekolah formal berasrama legendaris: Ma'had Bu'uts Islamiyyah untuk jenjang setara SMP (I'dadi) dan SMA (Tsanawi).

Keuntungan utama jalur ini adalah penguasaan bahasa Arab fusha yang matang sejak belia, adaptasi budaya yang lebih mudah, serta jaminan kelulusan yang langsung membuka jalur kuliah S1 Al-Azhar tanpa perlu tes Diktis penyetaraan ulang.`,
    author: "Ustadz Ridwan Al-Hafidz",
    authorRole: "Koordinator Program Ma'had Bu'uts",
    date: "04/05/2025",
    image: "/assets/articles/pexels-toulouse-19801156-scaled.jpg",
    status: 'PUBLISHED',
    readTime: "4 menit baca"
  },
  {
    id: "art-afwaja-7",
    slug: "bekal-penting-kuliah-ke-mesir-bahasa-atau-hafalan",
    title: "Bekal Penting Kuliah ke Mesir: Bahasa Arab atau Hafalan Al-Qur\u2019an?",
    category: "PENDIDIKAN",
    summary: "Analisis komparatif tentang skala prioritas persiapan calon mahasiswa Al-Azhar: cara menyeimbangkan penguasaan lughoh dan mutqin hafalan ayat Al-Qur'an.",
    content: `Pertanyaan yang paling sering diajukan calon santri adalah: 'Mana yang harus saya dahulukan, menuntaskan 30 juz hafalan Al-Qur'an atau memperdalam nahwu sharaf dan percakapan bahasa Arab?'

Jawabannya adalah integrasi keduanya. Ujian Diktis Kemenag dan Muadalah Al-Azhar mensyaratkan kelayakan bacaan tartil dan hafalan minimal juz tertentu, sementara seluruh perkuliahan di Kairo menggunakan bahasa fusha tingkat tinggi. Di Elwafa Center, kurikulum karantina dirancang paralel agar santri tidak mengorbankan salah satunya.`,
    author: "Ust. Ihsan Efendi, Lc",
    authorRole: "Direktur Elwafa Center",
    date: "03/05/2025",
    image: "/assets/articles/pexels-a-darmel-8164749-scaled.jpg",
    status: 'PUBLISHED',
    readTime: "3 menit baca"
  },
  {
    id: "art-afwaja-8",
    slug: "dibuka-pendaftaran-kuliah-ke-mesir-jalur-kemenag",
    title: "Dibuka Pendaftaran Kuliah ke Mesir Jalur Diktis Kemenag RI Tahun Akademik Baru",
    category: "PENDIDIKAN",
    summary: "Panduan resmi alur seleksi Computer Assisted Test (CAT), verifikasi berkas ijazah madrasah, dan tahapan wawancara kedutaan.",
    content: `Direktorat Pendidikan Tinggi Keagamaan Islam (Diktis) Ditjen Pendis Kemenag RI resmi membuka pendaftaran uji kompetensi calon mahasiswa baru ke Universitas Al-Azhar Mesir.

Jalur ini terbuka bagi santri madrasah aliyah dan pesantren se-Indonesia. Elwafa Center memfasilitasi pendampingan pendaftaran online, pelatihan intensif bank soal CBT, terjemah tersumpah ijazah, serta pembekalan wawancara muqabalah bersama alumni terbaik Al-Azhar.`,
    author: "Humas Elwafa Center",
    authorRole: "Informasi Beasiswa & Ujian",
    date: "01/05/2025",
    image: "/assets/articles/WhatsApp-Image-2025-04-28-at-09.05.00-1-scaled.jpeg",
    status: 'PUBLISHED',
    readTime: "4 menit baca"
  },
  {
    id: "art-afwaja-9",
    slug: "biografi-prof-amany-lubis-alumni-mahad-azhar",
    title: "Sosok Prof. Amany Lubis: Alumnus Ma\u2019had Al-Azhar Mesir hingga Rektor Perempuan Pertama UIN Jakarta",
    category: "REKOMENDASI",
    summary: "Profil keteladanan tokoh ulama perempuan Indonesia yang menempuh pendidikan sejak bangku Ma'had Tsanawi Al-Azhar Kairo hingga mencapai puncak kepemimpinan akademik.",
    content: `Prof. Dr. Hj. Amany Burhanuddin Lubis, Lc., M.A. merupakan bukti nyata keunggulan lulusan Ma'had Al-Azhar Kairo. Menyelesaikan jenjang sekolah menengah di Mesir memberi pondasi bahasa Arab dan turats yang sangat kokoh sebelum menempuh jenjang sarjana dan doktoral.

Kiprah beliau di kancah nasional dan internasional membuktikan bahwa pendidikan Al-Azhar membuka peluang kiprah yang luas bagi santri putra maupun putri dalam memajukan peradaban Islam di tanah air.`,
    author: "Tim Riset Biografi Elwafa",
    authorRole: "Edukasi & Tokoh Azhary",
    date: "16/12/2024",
    image: "/assets/articles/WhatsApp-Image-2025-08-08-at-10.51.21.jpeg",
    status: 'PUBLISHED',
    readTime: "5 menit baca"
  },
  {
    id: "art-afwaja-10",
    slug: "rihlah-santri-elwafa-ke-alexandria-mesir",
    title: "Rihlah Ilmiah Santri Elwafa ke Alexandria: Mengunjungi Makam Ulama & Perpustakaan Bersejarah",
    category: "KEGIATAN",
    summary: "Dokumentasi kegiatan santri Elwafa di Kairo saat mengadakan lawatan edukasi ke kota pesisir Alexandria, mengunjungi makam Imam Al-Bushiri dan Perpustakaan Bibliotheca Alexandrina.",
    content: `Selain menuntut ilmu di bangku kuliah, santri Elwafa Center di Mesir secara rutin diajak mengikuti rihlah ilmiah ke berbagai situs bersejarah Islam.

Salah satu destinasi favorit adalah kota Alexandria di pesisir Laut Mediterania. Para santri berziarah ke makam Imam Al-Bushiri pengarang Qashidah Burdah, makam Abu Al-Abbas Al-Mursi, serta mengeksplorasi khazanah literatur di Bibliotheca Alexandrina yang megah.`,
    author: "Wali Asrama Kairo",
    authorRole: "Pendampingan Lapangan Mesir",
    date: "22/01/2024",
    image: "/assets/gallery/1.jpeg",
    status: 'PUBLISHED',
    readTime: "3 menit baca"
  },
  {
    id: "art-afwaja-11",
    slug: "turnamen-olahraga-santri-pererat-ukhuwah",
    title: "Elwafa Futsal & Sports Championship: Ajang Olahraga dan Silaturahmi Santri Calon Azhary",
    category: "KEGIATAN",
    summary: "Menjaga kebugaran jasmani di sela-sela padatnya daurah kitab dan hafalan Al-Qur'an melalui turnamen persahabatan antar asrama.",
    content: `Di dalam tubuh yang sehat terdapat jiwa yang kuat ('Al-Aqlus Salim fil Jismis Salim'). Prinsip ini dipegang teguh dalam pembinaan santri Elwafa Center. 

Di samping jadwal halaqah turats dan hafalan Qur'an, santri rutin berolahraga bersama untuk memupuk kekompakan, sportivitas, dan ukhuwah islamiyyah yang erat sebelum mereka bersama-sama mengarungi perantauan di negeri para nabi.`,
    author: "Divisi Kepemudaan Elwafa",
    authorRole: "Aktivitas & Ekstrakurikuler",
    date: "23/01/2024",
    image: "/assets/articles/WhatsApp-Image-2023-09-01-at-10.55.01-300x200.jpeg",
    status: 'PUBLISHED',
    readTime: "2 menit baca"
  },
  {
    id: "art-afwaja-12",
    slug: "biografi-grand-syeikh-al-azhar-ahmed-al-tayeb",
    title: "Calon Pelajar Al-Azhar Mesir Harus Tahu! Biografi Grand Syeikh Al-Azhar Prof. Dr. Ahmed Al-Tayeb",
    category: "SEPUTAR AL-AZHAR",
    summary: "Mengenal keteladanan, kedalaman ilmu filsafat Islam, dan diplomasi perdamaian Grand Syeikh Al-Azhar yang sangat mencintai umat Islam Indonesia.",
    content: `Prof. Dr. Ahmed Al-Tayeb adalah Grand Syeikh Al-Azhar ke-48 yang dikenal luas atas komitmennya merajut persaudaraan kemanusiaan global dan membela prinsip wasathiyyah Islam.

Beliau beberapa kali berkunjung ke Indonesia dan selalu menyampaikan kekaguman atas keharmonisan kehidupan umat beragama di nusantara. Memahami biografi dan pemikiran beliau menjadi bekal moral yang berharga bagi setiap calon mahasiswa yang hendak belajar di bawah naungan Al-Azhar.`,
    author: "Ustadz Ihsan Efendi, Lc",
    authorRole: "Pengasuh Elwafa Center",
    date: "15/07/2025",
    image: "/assets/9.jpeg",
    status: 'PUBLISHED',
    readTime: "5 menit baca"
  },
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
    avatar: '/assets/avatar-fauzan.png'
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
    title: 'Pembinaan & Pendampingan Santri di Kairo',
    date: '12 Oktober 2026',
    image: '/assets/before footer.jpeg',
    description: 'Pelepasan dan pendampingan santri bimbingan Elwafa Center di Markaz Tathwir Al-Azhar Kairo.',
    category: 'Pendampingan'
  },
  {
    id: 'act-2',
    title: 'Rihlah Edukatif & Ziarah Ilmiah Alexandria',
    date: '28 September 2026',
    image: '/assets/background.jpeg',
    description: 'Kunjungan edukatif santri bimbingan Elwafa ke Bibliotheca Alexandrina dan situs bersejarah Mesir.',
    category: 'Rihlah'
  },
  {
    id: 'act-3',
    title: 'Tryout Akbar CBT Nasional Masuk Al-Azhar',
    date: '15 September 2026',
    image: '/assets/articles/DSC03995-scaled.jpg',
    description: 'Simulasi ujian serentak berbasis komputer (CBT) menguji materi Lughoh Arabiyyah, Balaghah, dan Syariah.',
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

export const INITIAL_CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: 'cal-1',
    title: 'Seleksi Nasional Tahfidz & Bahasa Kemenag (Diktis)',
    date: '2026-10-22',
    time: '08:00 - 15:00 WIB',
    location: 'Ruang Ujian CBT Elwafa & Kampus UIN',
    category: 'SELEKSI',
    description: 'Ujian Computer-Based Test (CBT) serentak bagi calon mahasiswa S1 Al-Azhar jalur Kemenag.',
    quotaTarget: 120,
    status: 'ONGOING'
  },
  {
    id: 'cal-2',
    title: 'Try Out Akbar Hadatsah Mu\'adalah Kairo',
    date: '2026-10-25',
    time: '09:00 - 12:00 WIB',
    location: 'Aula Utama & Daring Zoom',
    category: 'TRYOUT',
    description: 'Simulasi materi qiraah, nahwu, balaghah, dan adab muqarrar Al-Azhar tingkat Tsanawi.',
    quotaTarget: 80,
    status: 'UPCOMING'
  },
  {
    id: 'cal-3',
    title: 'Penutupan Registrasi Berkas Apostille Kemenkumham',
    date: '2026-10-28',
    time: '17:00 WIB',
    location: 'Sekretariat Elwafa Bogor',
    category: 'ADMINISTRASI',
    description: 'Batas akhir penerimaan berkas ijazah, transkrip nilai, dan terjemahan resmi tersumpah.',
    quotaTarget: 40,
    status: 'UPCOMING'
  },
  {
    id: 'cal-4',
    title: 'Gladi Resik & Pembekalan Manasik Studi Kairo',
    date: '2026-11-05',
    time: '08:30 - 16:00 WIB',
    location: 'Asrama Karantina Ciamis',
    category: 'DAUROH',
    description: 'Orientasi keilmuan talaqqi, tata tertib asrama Kairo, dan adaptasi musim dingin Mesir.',
    quotaTarget: 60,
    status: 'UPCOMING'
  },
  {
    id: 'cal-5',
    title: 'Pelepasan Kloter 1 Penerbangan CGK -> CAI (Cairo)',
    date: '2026-11-15',
    time: '19:30 WIB',
    location: 'Bandara Internasional Soekarno-Hatta (T3)',
    category: 'KEBERANGKATAN',
    description: 'Keberangkatan rombongan santri bersama pendamping ustadz menuju Kairo International Airport.',
    quotaTarget: 35,
    status: 'UPCOMING'
  }
];

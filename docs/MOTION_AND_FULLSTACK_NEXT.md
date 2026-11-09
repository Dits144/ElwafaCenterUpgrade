# Motion pass & rekomendasi full-stack Elwafa

## Perubahan yang dikerjakan
- Reveal sekali saat terlihat pada section editorial beranda; form/simulator tidak ditunda animasinya.
- Kartu program masuk bertahap dengan fade/translate ringan, gambar tetap lazy loaded dan punya fallback.
- Navigasi workspace mahasiswa dan admin memakai fade/translate 240 ms, tanpa reload penuh; status aktif tetap terlihat.
- Semua animasi baru mengikuti `prefers-reduced-motion`; gerakan mengandalkan opacity dan transform, bukan perubahan layout.
- Error boundary Inbox Tim terpisah sehingga kegagalan render modul tersebut tidak langsung menjatuhkan seluruh dashboard.

## Rekomendasi berikutnya, urutan prioritas
1. **Fondasi keamanan & data.** Migrasikan login demo dan data `localStorage` ke autentikasi server, otorisasi role, database, validasi endpoint, audit trail, dan backup. Jangan memindahkan data pengguna otomatis tanpa rencana migrasi/izin. Inbox Tim sudah memiliki API sendiri, tetapi dashboard lain masih demo.
2. **Diagnostik loading.** Uji API mati/lambat/401/500 dan browser offline pada semua modul server. Tambahkan observabilitas produksi sebelum menyimpulkan penyebab pesan gagal muat secara umum.
3. **Kinerja.** Pecah bundle rute publik, mahasiswa, dan admin dengan lazy imports; ukur LCP/CLS/INP pada build produksi dan koneksi realistis. Build saat ini memberi peringatan chunk >500 kB.
4. **Kualitas konten.** Verifikasi klaim resmi, jadwal, biaya, kuota, testimoni, serta kepemilikan foto sebelum publikasi.
5. **Visual QA.** Screenshot viewport 360/390/768/1440, interaksi keyboard, reduced motion, form dan modal; jangan mengejar animasi tambahan jika memperlambat tugas utama pengguna.

## Pengujian tahap ini
- `npm.cmd run build`: sukses, masih ada peringatan ukuran chunk.
- `node qa-motion.cjs`: program reveal, navigasi mahasiswa/admin dan reduced motion pada viewport yang diuji lulus di preview produksi.
- `node qa-experience.cjs`, `node qa-pages.cjs`, `node qa-new-features.cjs`, `node qa-admin-mobile.cjs`, `node qa-flow.cjs`: lulus pada preview produksi port 5199.
- Pemeriksaan screenshot program mobile setelah intro berakhir: konten tampil tanpa clipping horizontal. Ini bukan pengukuran pixel-perfect atau Core Web Vitals.

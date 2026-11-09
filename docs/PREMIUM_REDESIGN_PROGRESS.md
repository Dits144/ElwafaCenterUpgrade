# Premium redesign — audit dan status kerja

## Audit faktual
- **OBSERVED:** Proyek Vite/React/TypeScript dengan rute hash. Build `tsc && vite build` berhasil, tetapi bundle JS sekitar 631 kB minified dan Vite memperingatkan chunk >500 kB. Target LCP/CLS/INP belum diukur.
- **OBSERVED:** Dashboard umum membaca/menulis `localStorage` sebagai **demo**, bukan data backend. Login demo menerima akses tanpa autentikasi server; jangan anggap aman untuk data riil. Inbox Tim memakai Express/SQLite tersendiri dengan sesi admin terpisah.
- **OBSERVED:** Saat API Inbox Tim tidak berjalan, proxy `/api` gagal. Sebelumnya UI menafsirkan semua kegagalan `/api/auth/me` sebagai keadaan belum login dan hanya menunjukkan form login; ini salah satu sumber tampilan gagal yang dapat direproduksi, bukan bukti penyebab seluruh laporan “Tidak dapat dimuat”.
- **NOT VERIFIED:** Tidak ada bukti deployment/log produksi, Supabase, atau pengukuran Core Web Vitals. Akses live production, error historis, dan klaim institusional perlu verifikasi pemilik.

## Perubahan pada tahap ini
- Program card dan header lebih dekat ke arah editorial emerald/ivory; gambar lama tetap digunakan, diberi lazy loading serta fallback yang tak memicu loop jika aset fallback hilang. Belum ada alat generasi gambar; belum membuat gambar AI palsu.
- Navigasi mahasiswa menggunakan definisi tab bertipe, indikator aktif yang dapat diakses, target minimal 44 px, dan sidebar disembunyikan pada layar sempit karena duplikasi menu. Nilai progress biodata dihitung dari isian, bukan `65%` hardcoded; jadwal spesifik yang belum diverifikasi diganti ajakan konfirmasi.
- Inbox Tim kini membedakan kegagalan koneksi/timeout dari 401, menawarkan tombol retry nyata, dan memberi batas 12 detik per request. Route-level React error boundary menangkap kegagalan render, tetapi **tidak** menggantikan penanganan error data/network.

## Verifikasi dijalankan
- `npm.cmd run build` — lulus dengan peringatan ukuran chunk.
- `node qa-flow.cjs` — pendaftaran, biodata, persetujuan admin, persistensi demo lulus.
- `node qa-premium.cjs` — home dan navigasi mahasiswa tanpa horizontal overflow pada 360/390/768/1440 px; API mati menampilkan error dan retry; lulus.
- `node qa-admin-mobile.cjs` — tab admin pada 360/390/768 px lulus.
- `node qa-experience.cjs`, `node qa-pages.cjs`, `node qa-new-features.cjs` — intro, halaman publik, galeri, dan tab dashboard yang dicakup lulus.
- `node qa-inbox-multiadmin.cjs` — percobaan kali ini timeout saat navigasi ke server tes; **tidak lulus/terverifikasi ulang**. Tes lama pernah lulus, tetapi itu bukan bukti terhadap perubahan ini.

## Selanjutnya
1. Isolasi dan perbaiki timeout test server API dua-admin; jalankan tes gagal-lambat memakai server mock lokal tanpa mengganti hasil API riil.
2. Pisahkan chunk rute berat jika tidak mengganggu UX; ukur LCP/CLS/INP pada build production, bukan hanya dev.
3. Audit foto sumber; aset program lama digunakan sampai ada gambar berlisensi/hasil generator resmi. Jika generator tersedia, buat WebP 16:9 dan cek anatomi/atribusi.
4. Redesign dashboard admin dan mahasiswa lebih menyeluruh tanpa memindahkan data demo ke produksi secara diam-diam.
5. Autentikasi dan data dashboard yang benar membutuhkan desain backend tersendiri sebelum klaim production-ready.

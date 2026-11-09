# Inbox admin — Node.js (prototype lokal)

Struktur: `server/index.mjs` (API Express + autentikasi), `server/db.mjs` (SQLite via sql.js), `server/create-admin.mjs` (provision akun); frontend `src/components/admin/ServerInbox.tsx`. Vite mem-proxy `/api` ke `http://127.0.0.1:5201`.

## Jalankan lokal

1. `npm install`
2. Set variabel `ELWAFA_NEW_ADMIN_PASSWORD` secara lokal (minimal 12 karakter, jangan commit/kirim ke chat), lalu `npm run admin:create -- "Admin 1"`. Ulangi untuk Admin 2 dan Admin 3 dengan sandi berbeda. Skrip menolak nama duplikat.
3. Terminal A: `npm run dev:api`; terminal B: `npm run dev` (default port 5198).
4. Buka portal admin demo, pilih **Inbox Tim & Inquiry**, login lagi dengan akun inbox server. Login dashboard demo lama **bukan** otorisasi server.

Untuk tes API: `node qa-inbox-api.cjs`; untuk alur dua admin di dua browser terisolasi: `node qa-inbox-multiadmin.cjs` (menjalankan Vite/API dan database sementara sendiri tanpa mengubah data pengguna); untuk layout mobile: `node qa-admin-mobile.cjs` (skrip ini mengharapkan Vite pada port 5199). Tes dua browser memverifikasi pembuatan inquiry, penugasan, perubahan tahap, catatan tim, sinkronisasi silang, dan reload. Batas baca API dipisah dari batas tulis agar polling 5 detik tidak terkena limit 100 request/15 menit sebelumnya. Database lokal pada `server/data/inbox.sqlite` diabaikan Git. Jika sebelumnya memakai inbox `localStorage`, datanya **tidak otomatis dimigrasi atau dihapus**; UI server tidak membaca data tersebut. Cadangkan data browser sebelum menghapusnya.

## Batasan sebelum produksi

- `sql.js` menyimpan ulang seluruh file database setiap mutasi: cocok untuk prototipe satu proses, **bukan** multi-instance atau beban tinggi. Gunakan PostgreSQL/driver SQLite dengan transaksi, migrasi, backup terenkripsi, dan concurrency control sebelum deployment.
- Aplikasi admin lain masih demo/localStorage. Akses inbox server memakai sesi cookie terpisah; perlu satukan autentikasi dan otorisasi seluruh dashboard di server.
- Sinkronisasi UI polling 5 detik, bukan real-time. Draf WhatsApp membuka `wa.me` saja; tidak ada inbound webhook, status terkirim, pengiriman otomatis, atau integrasi API resmi.
- Akses produksi memerlukan HTTPS, deployment API same-origin, `ELWAFA_APP_ORIGIN`, manajemen pengguna/role dan revokasi, audit log, kebijakan retensi data dan izin pemrosesan nomor telepon. Jangan mengekspos API mentah sebagai layanan publik tanpa hardening.

# ELWAFA CENTER — Codebase & System Audit (Phase 0)

Tanggal Audit: 27 Oktober 2026  
Status: Selesai (Phase 0 Completed)  
Repositori: `D:/Projects/ElwafaUpgrade/`  
Stack: Vite 6.0, React 18.3, TypeScript 5.7, Tailwind CSS 3.4, Framer Motion 14.5, Express 5.3, sql.js 1.15

---

## 1. Executive Summary

Elwafa Center adalah platform web pendidikan Islam terpadu yang memadukan profil institusi, katalog program studi ke Universitas Al-Azhar Kairo dan Ma'had Bu'uts, simulasi penelusuran jalur studi, portal pendaftaran santri, dashboard admin, dan modul penanganan pesan bersama (Inbox Tim).

Audit menyeluruh (Phase 0) mengungkap dua lapisan sistem yang berbeda karakter:
1. **Frontend & Portal Utama (Demo Mode / Browser Persisted):** Menggunakan React Context + `localStorage` browser. Tata letak responsif, visual editorial, dan motion sudah terimplementasi rapi, namun data santri, evaluasi pendaftaran, dan mutasi katalog belum terikat ke database server produksi.
2. **Inbox Tim (Backend Mandiri):** Menggunakan Node.js/Express 5.3 dengan database SQLite (via `sql.js`) dan autentikasi sesi admin mandiri (cookie `elwafa_admin` HttpOnly).

---

## 2. Inventarisasi Fitur: Real vs Demo

| Modul / Fitur | Status Implementasi | Penyimpanan / State | Mekanisme Keamanan |
|---|---|---|---|
| **Beranda & Publik (Home, About, Programs, Gallery, Articles, Contact)** | Berfungsi penuh | Statis + React State | Publik, read-only |
| **Intro & Motion Design** | Berfungsi penuh | `sessionStorage` (`elwafa_intro_seen_v1`) | Menghormati `prefers-reduced-motion` |
| **Simulasi Jalur Studi (Track Estimator)** | Berfungsi penuh | Aturan logika di frontend | Client-side rule engine |
| **Katalog Program & Filter Kategori** | Berfungsi penuh | `localStorage` (`elwafa_programs_demo_v4`) | Belum ada API server |
| **Katalog Artikel & Pencarian** | Berfungsi penuh | `localStorage` (`elwafa_articles_demo_v4`) | Belum ada API server |
| **Lightbox Galeri & Google Maps Embed** | Berfungsi penuh | Statis (`mockData.ts`) | Publik |
| **Formulir Kontak (wa.me)** | Berfungsi penuh | Draf URL WhatsApp | Membuka tab baru (bukan gateway API) |
| **Portal Mahasiswa (Biodata, Status Tracker, Program)** | Demo Interaktif | `localStorage` (`elwafa_students_demo_v3`) | Tanpa verifikasi password server |
| **Unggah Dokumen Santri** | Mock UI | Mock metadata di state | **Belum ada penyimpanan file riil/S3** |
| **Dashboard Admin (Verifikasi Santri, CRUD Program, CRUD Artikel)** | Demo Interaktif | `localStorage` browser | Bypassable di client |
| **Inbox Tim (Daftar Inquiry, Penugasan Agent, Catatan, Sesi)** | **Fullstack Riil** | SQLite `server/data/inbox.sqlite` via `sql.js` | Sesi SHA-256 + bcrypt password + SameSite cookie |
| **Provisioning Admin CLI** | **Tooling Riil** | Skrip `server/create-admin.mjs` | Bcrypt hashing + CLI environment |

---

## 3. Investigasi Akar Masalah Pesan "Tidak dapat dimuat"

Berdasarkan inspeksi error boundary, API client, dan konfigurasi server, pesan *"Tidak dapat dimuat"* / *"Inbox Tim belum dapat dimuat"* muncul akibat faktor-faktor berikut:

1. **Origin Mismatch pada Port Non-Standar:**
   - *Akar Masalah:* Middleware `sameOrigin` di `server/index.mjs` sebelumnya hanya mengizinkan `http://127.0.0.1:5198` dan `http://127.0.0.1:5199`. Jika pengguna membuka via `http://localhost:5198` atau port preview `4174`, browser mengirim header Origin yang berbeda sehingga server merespons `403 Origin tidak diizinkan.`.
   - *Status Perbaikan:* Diperbaiki di Phase 1 dengan memperluas allowlist default dan mendukung comma-separated `ELWAFA_APP_ORIGIN`.

2. **Ketiadaan Proxy API pada Server Preview Vite:**
   - *Akar Masalah:* `vite.config.ts` hanya mendefinisikan blok `server.proxy`, tanpa blok `preview.proxy`. Ketika aplikasi dijalankan via `npm run preview` (port 4174), fetch ke `/api/*` dilayani oleh preview server statis dan mengembalikan dokumen HTML 404. JSON parser client gagal dan memicu status error.
   - *Status Perbaikan:* Diperbaiki di Phase 1 dengan menambahkan konfigurasi `preview.proxy` di `vite.config.ts`.

3. **Backend Server Belum Dinyalakan:**
   - *Akar Masalah:* Modul Inbox Tim melakukan request ke port `5201` (`/api/inquiries`). Jika proses `node server/index.mjs` mati, fetch gagal dengan `ECONNREFUSED` setelah timeout 12 detik, memicu tampilan `Inbox Tim belum dapat dimuat`.
   - *Status:* Telah dipasangi penanganan error terisolasi (`RouteErrorBoundary`), tombol *Coba lagi*, dan panduan operasional.

---

## 4. Analisis Risiko Keamanan & Utang Teknis

### Risiko Keamanan Utama:
1. **Dual Authentication Asymmetry:** Login admin utama di `LoginPage.tsx` adalah verifikasi demo di client side tanpa token, sedangkan `ServerInbox` memerlukan cookie sesi server. Santri dan admin demo dapat mengakses portal tanpa password hash di server.
2. **sql.js Concurrency Desynchronization (SEC-01):** `sql.js` bekerja in-memory. Jika `server/create-admin.mjs` dijalankan saat server aktif, server berpotensi menimpa file disk jika tidak memeriksa `mtime`. *(Telah diselesaikan di Phase 1 dengan sync mtime otomatis)*.
3. **Dokumen Pendaftar Masih Mock:** Berkas pendaftaran belum memiliki sistem penyimpanan pribadi terenkripsi. Dokumen asli tidak boleh diunggah sebelum private bucket / storage API selesai di Phase 3.

### Utang Teknis & Performa:
1. **Ukuran Bundle JS Awal:** File bundle hasil kompilasi mencapai `631.6 kB` (167.2 kB gzip). Belum menggunakan code-splitting (`React.lazy`) untuk modul admin dan portal santri.
2. **Navigasi Berbasis Hash:** Navigasi bergantung pada event `hashchange` (`#program`, `#mahasiswa`, dll). Belum mendukung deep-linking dinamis berbasis parameter rute URL formal (seperti `/program/:slug`).
3. **Monolithic AppContext:** File `src/context/AppContext.tsx` mengelola 540+ baris state gabungan, memicu re-render luas pada perubahan kecil.

---

## 5. Rekomendasi Urutan Implementasi (Roadmap)

1. **Phase 1 (Selesai):** Stabilitas dan keamanan backend lokal (Origin, CSRF, disk sync, session pruning, preview proxy, test baseline).
2. **Phase 2:** Desain database PostgreSQL/SQLite terpadu, ORM Drizzle/Prisma, dan migrasi autentikasi terpusat (Santri & Admin).
3. **Phase 3:** Alur pendaftaran online bertahap (Smart Admission) dengan nomor registrasi unik dan status timeline.
4. **Phase 4:** Document Management System dengan private storage dan kontrol akses verifikator.
5. **Phase 5:** Peningkatan CRM Inbox Tim (Kanban stage & WhatsApp API bridge readiness).
6. **Phase 6:** Optimasi performa frontend (code splitting, image lazy-loading, Web Vitals).

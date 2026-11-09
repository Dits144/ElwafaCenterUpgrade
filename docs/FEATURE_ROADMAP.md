# ELWAFA CENTER — Feature Roadmap & Execution Plan

Status: Multi-Phase Roadmap (V2.0)  
Metodologi: Inkremental, Verifikasi Berbasis Bukti, Tanpa Downtime Data Eksisting

---

## Ringkasan Fase

```
Phase 0 [COMPLETED] ───▶ Phase 1 [COMPLETED] ───▶ Phase 2 [NEXT] ───▶ Phase 3
(Audit & Baseline)       (Stability & Security)   (Unified Backend)   (Smart Admission)
                                                                            │
Phase 7 [OPTIONAL]  ◀─── Phase 6 [PLANNED]   ◀─── Phase 5 [PLANNED]  ◀──────┘
(Finance/Boarding)       (Visual & Motion)        (CRM & Notifications)
```

---

## Rincian Per Fase

### Phase 0: Audit & Risk Assessment (SELESAI)
- [x] Audit menyeluruh arsitektur frontend (`App.tsx`, `AppContext.tsx`, `StudentDashboard.tsx`, `AdminDashboard.tsx`).
- [x] Audit modul server Inbox Tim (`server/index.mjs`, `server/db.mjs`, `server/create-admin.mjs`).
- [x] Identifikasi akar masalah tampilan *"Tidak dapat dimuat"*.
- [x] Dokumentasi status riil vs mock dan pembuatan dokumen audit `docs/ELWAFA_AUDIT.md`.

### Phase 1: Stability, Security & Test Baseline (SELESAI)
- [x] Perbaikan desinkronisasi in-memory `sql.js` terhadap penulisan CLI (`server/db.mjs`).
- [x] Penguatan validasi origin (dukungan localhost, preview port 4174, dan multi-origin comma-separated).
- [x] Perlindungan terhadap mutasi cross-site tanpa Origin header (`Sec-Fetch-Site` & `Referer` checks).
- [x] Pembersihan otomatis sesi kedaluwarsa (`pruneExpiredSessions`).
- [x] Penambahan proxy `/api` pada preview server Vite di `vite.config.ts`.
- [x] Perbaikan bug notifikasi draf WhatsApp di `ServerInbox.tsx`.
- [x] Pembuatan automated regression test suite `qa-phase1-security.cjs` (PASS).
- [x] Verifikasi regresi lengkap: alur santri, admin mobile, intro, motion, dan multi-admin browser (PASS).

### Phase 2: Unified Backend & Authentication Foundation (MENUNGGU PERSETUJUAN MIGRASI)
- [x] Draf konseptual skema database di `docs/DATABASE_DESIGN.md` — **belum final dan belum dieksekusi**.
- [ ] Cocokkan skema dan status UI saat ini dengan rancangan database; tetapkan keputusan ORM, backup, pemulihan, serta strategi cutover/rollback sebelum migrasi.
- [ ] Penggantian autentikasi demo menjadi sistem autentikasi santri dan admin terpusat.
- [ ] Penerapan session store aman (Redis atau cookie sesi terenkripsi dengan DB persistence).
- [ ] Penerapan Role-Based Access Control (RBAC) pada API layer.
- [ ] Migrasi data dari SQLite lokal tanpa kehilangan riwayat inquiry.

### Phase 3: Smart Online Admission System
- [ ] Alur pendaftaran santri 10 langkah (Akun, Verifikasi Email, Biodata, Pendidikan, Orang Tua, Program, Berkas, Review, Submit, Verifikasi).
- [ ] Penomoran unik registrasi resmi (`EWF-YYYY-XXXXX`).
- [ ] Status timeline visual: `DRAFT` ➔ `SUBMITTED` ➔ `UNDER_REVIEW` ➔ `REVISION_REQUIRED` ➔ `APPROVED` / `REJECTED`.
- [ ] Riwayat catatan verifikasi dan penugasan verifikator per pendaftar.
- [ ] Ekspor data pendaftar format Excel/CSV dengan izin otorisasi.

### Phase 4: Secure Document Management
- [ ] Konfigurasi jenis berkas wajib per program studi (Ijazah, Transkrip, Paspor, SKCK, Foto).
- [ ] Integrasi S3 / Private Object Storage dengan presigned upload/download URLs.
- [ ] Validasi tipe MIME file asli dan pembatasan ukuran berkas.
- [ ] Panel peninjauan dokumen admin dengan fitur *Approve*, *Reject*, dan *Request Revision*.

### Phase 5: CRM & Communication Center
- [ ] Tampilan Kanban Board visual untuk penanganan inquiry di Inbox Tim.
- [ ] Persiapan webhook resmi WhatsApp Business API (pembatasan draft manual tetap dipertahankan sampai kredensial tersedia).
- [ ] Pusat notifikasi terpadu (in-app notifications & email dispatch queue).
- [ ] Kalender seleksi dan kegiatan dengan dukungan sinkronisasi kalender santri.

### Phase 6: Visual & Performance Excellence
- [ ] Code-splitting rute utama (`React.lazy` untuk AdminDashboard dan StudentDashboard) untuk memangkas ukuran bundle awal <300 kB.
- [ ] Penyempurnaan motion design editorial dan kepatuhan penuh `prefers-reduced-motion`.
- [ ] Penggantian placeholder gambar program dengan visual edukasi beresolusi tinggi yang terverifikasi.
- [ ] Pengukuran metrik Core Web Vitals (LCP, CLS, INP) pada build produksi.

### Phase 7: Optional Modules (Berdasarkan Persetujuan Institusi)
- [ ] Manajemen Keuangan & Integrasi Payment Gateway (Verifikasi server-side).
- [ ] Manajemen Asrama / Boarding (Kamar, kapasitas, alokasi santri).
- [ ] Asisten AI Informasi Santri (RAG berbasis data kurikulum terverifikasi).
- [ ] Dukungan Multi-bahasa (Bahasa Indonesia, Arab RTL, Inggris).

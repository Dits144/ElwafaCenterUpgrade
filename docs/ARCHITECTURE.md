# ELWAFA CENTER — System Architecture & Target Design

Status: Architecture Blueprint (V2.0)  
Target: Production-Ready Islamic Education Platform

---

## 1. Arsitektur Saat Ini (As-Is)

```
[ Browser Client ]
  ├─ Public Landing Page & Hash Router (#beranda, #program, #kontak, ...)
  ├─ Demo State Layer (React Context + localStorage)
  │    ├─ Students (Draft, Pending, Revision, Approved, Rejected)
  │    ├─ Programs & Quotas
  │    ├─ Articles & Announcements
  │    └─ Selection Calendar
  └─ ServerInbox Component (Polling HTTP 5s)
         │
         ▼ (Vite Proxy: /api -> 127.0.0.1:5201)
[ Local Express Backend ] (server/index.mjs)
  ├─ Helmet & Rate Limiters (Read, Write, Auth)
  ├─ Origin & Referer Verifier (Same-Origin Enforcement)
  ├─ Session Manager (SHA-256 token hashing, HttpOnly Cookie)
  ├─ In-Memory sql.js Engine with Disk Sync (server/db.mjs)
  └─ Database: server/data/inbox.sqlite (Admins, Sessions, Inquiries, Entries)
```

---

## 2. Arsitektur Target Produksi (To-Be)

```
[ Browser / Mobile Client ]
  ├─ Public Website (SEO-friendly SSR or Pre-rendered SPA)
  ├─ Student Portal (Authenticated Session, Profile, Application Tracker)
  └─ Admin Control Center (Role-based Dashboard, Verification Queue, CMS)
         │
         ▼ HTTPS (CORS / Cookie SameSite=Lax/Strict)
[ Unified API Gateway / Express Backend ]
  ├─ Security Middleware (Helmet, Rate Limiter, CSRF, Audit Logger)
  ├─ Auth Service (JWT / Argon2id / Bcrypt Session Store)
  ├─ RBAC Engine (Super Admin, Admission Officer, Academic, Student)
  ├─ Admission Service (Multi-step Registration & State Machine)
  ├─ Document Service (Signed URLs, MIME Validation, ClamAV hook)
  ├─ CRM / Inbox Service (Inquiry Pipeline, WebSocket / SSE, Webhook Dispatcher)
  └─ Content Service (Programs, Articles, Events, SEO metadata)
         │
         ├─ Database: PostgreSQL (Managed Instance with RLS / Connection Pool)
         ├─ Cache & Pub/Sub: Redis (Session store, Rate limits, Socket sync)
         └─ Storage: S3-Compatible Private Bucket (Encrypted at rest)
```

---

## 3. Matriks Peran & Izin (RBAC)

Target otorisasi terpusat mencakup 7 tingkatan peran:

| Peran | Ruang Lingkup & Wewenang |
|---|---|
| `SUPER_ADMIN` | Kendali penuh sistem, manajemen akun staf, konfigurasi database, audit log master. |
| `ADMIN` | Supervisi harian, persetujuan akhir pendaftaran, alokasi penugasan staf. |
| `ADMISSION_OFFICER` | Verifikasi dokumen pendaftar, pemeriksaan biodata, permintaan revisi berkas. |
| `ACADEMIC_STAFF` | Manajemen kurikulum program, agenda kalender akademik, jadwal seleksi. |
| `CONTENT_EDITOR` | Pembuatan dan publikasi artikel, galeri foto, FAQ, dan pengumuman publik. |
| `FINANCE_STAFF` | Verifikasi invoice dan rekonsiliasi pembayaran (ketika modul keuangan aktif). |
| `STUDENT` | Hak akses terhadap data pendaftaran pribadi, unggah revisi berkas, pantau status. |

---

## 4. Alur Integrasi Dokumen & Penyimpanan Aman

1. Klien mengajukan permohonan unggah berkas (`POST /api/documents/upload-intent`) dengan menyertakan nama file, ukuran, dan tipe MIME.
2. Server memvalidasi hak akses santri, kuota file (<5 MB), dan ekstensi yang diizinkan (`pdf`, `jpg`, `png`).
3. Server menghasilkan *Signed Upload URL* dengan masa kedaluwarsa 5 menit.
4. Klien mengunggah langsung ke penyimpanan privat (S3/Cloudflare R2).
5. Klien mengonfirmasi unggahan (`POST /api/documents/confirm`). Server mencatat metadata dokumen ke database dan menandai status sebagai `PENDING_VERIFICATION`.
6. Akses dokumen oleh admin verifikator menggunakan *Signed Download URL* bertempo singkat (10 menit) yang dicatat dalam log audit.

---

## 5. Strategi Migrasi Data

- Data inquiry yang telah tersimpan di SQLite `server/data/inbox.sqlite` akan dimigrasikan menggunakan skrip migrasi bertahap (`scripts/migrate-sqlite-to-postgres.ts`).
- Skrip cadangan otomatis akan mengekspor SQLite sebelum migrasi dijalankan.
- Tidak ada data eksisting yang dihapus selama proses transisi.

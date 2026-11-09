# ELWAFA CENTER — Security & Compliance Checklist

Status: Phase 1 Hardened / Production Readiness Checklist  
Pembaruan Terakhir: 27 Oktober 2026

---

## 1. Status Keamanan Saat Ini (Audit & Patch Phase 1)

| Area Keamanan | Status | Implementasi & Kontrol |
|---|---|---|
| **SameSite Cookie Configuration** | **AMAN** | Kuki `elwafa_admin` berkonfigurasi `HttpOnly=true`, `SameSite=Strict`, `Path=/api`. |
| **Origin & Domain Allowlist** | **AMAN** | Dibatasi secara eksplisit di server Express; mendukung `127.0.0.1`, `localhost`, port preview, dan env comma-separated. |
| **Cross-Site Request Forgery (CSRF)** | **PARSIAL — belum siap produksi** | Origin asing dan `Sec-Fetch-Site: cross-site` ditolak; permintaan mutasi tanpa Origin, Referer, maupun Fetch Metadata masih diterima. Perlu token CSRF atau kebijakan header wajib yang kompatibel dengan klien resmi sebelum deploy publik. |
| **Password Hashing Staf** | **AMAN** | Bcrypt dengan salt cost standar untuk akun admin Inbox Tim. |
| **Token Session Storage** | **AMAN** | Sesi di-hash dengan SHA-256 sebelum disimpan ke SQLite; token mentah tidak disimpan dalam plaintext. |
| **Session Expiration & Pruning** | **AMAN** | Masa kedaluwarsa 8 jam, dengan pembersihan baris kadaluwarsa otomatis pada startup dan login. |
| **Disk Concurrency & Persistence** | **PARSIAL** | Reload berbasis `mtime` melewati skenario CLI yang diuji, tetapi bukan jaminan transaksi/locking multi-proses; race window dan perubahan dengan timestamp sama belum tertutup. Jangan gunakan beberapa penulis simultan di produksi. |
| **Rate Limiting API** | **AMAN** | Terbagi 3 tingkatan: auth (10 req/15m), write (240 req/15m), read (6000 req/15m). |
| **HTTP Security Headers** | **AMAN** | Modul `helmet()` aktif, menonaktifkan `X-Powered-By`. |
| **XSS Prevention** | **AMAN** | React auto-escaping pada seluruh render output komponen. |

---

## 2. Checklist Transisi ke Produksi Penuh (Phase 2 & Seterusnya)

### A. Autentikasi & Otorisasi
- [ ] Nonaktifkan bypass demo di `src/components/pages/LoginPage.tsx` saat environment `NODE_ENV === 'production'`.
- [ ] Hapus/sembunyikan widget `DemoSwitcher` pada build rilis publik.
- [ ] Terapkan autentikasi akun santri dengan verifikasi email/WhatsApp OTP.
- [ ] Enforce Role-Based Access Control (RBAC) di sisi server untuk seluruh endpoint.

### B. Perlindungan Berkas & Dokumen Santri
- [ ] Jangan pernah mengizinkan upload berkas langsung ke direktori publik `/public/uploads`.
- [ ] Gunakan private object storage (S3/R2) dengan presigned URL bertempo maksimal 10 menit.
- [ ] Validasi tipe MIME melalui inspeksi byte header file (magic bytes), bukan hanya ekstensi nama berkas.
- [ ] Batasi ukuran berkas maksimal 5 MB per dokumen.

### C. Keamanan Database & Koneksi
- [ ] Gunakan connection pooling berenkripsi SSL/TLS (`sslmode=require`) untuk database PostgreSQL produksi.
- [ ] Pisahkan kredensial database untuk migrasi (DDL) dan operasional runtime (DML).
- [ ] Aktifkan pencatatan audit log untuk setiap perubahan status pendaftaran dan persetujuan berkas.

### D. Manajemen Rahasia & Kunci Lingkungan
- [ ] Pastikan file `.env` tidak pernah ter-commit ke Git.
- [ ] Simpan token akses pihak ketiga (WhatsApp API, SMS gateway, Storage keys) di secret manager / runtime environment server.
- [ ] Rotasi kunci rahasia secara berkala.

# FEATURE MATRIX — ELWAFA CENTER DIGITAL PLATFORM

Matriks ini membedakan fitur yang berfungsi penuh di lingkungan demo saat ini versus kebutuhan integrasi backend produksi (Supabase / Database & Auth Server):

---

| Modul Fitur | Status Demo Saat Ini | Mekanisme di Demo | Kebutuhan Produksi Lanjutan |
|---|---|---|---|
| **Public Landing Page** | ✅ 100% Berfungsi | Responsive React UI, Filter Program, FAQ Accordion | Dynamic CMS via PostgreSQL / Supabase |
| **Role Switcher** | ✅ 100% Berfungsi | DemoSwitcher Bar (Pengunjung, Mahasiswa, Admin) | Auth Session Cookies / JWT / OAuth |
| **Pendaftaran Santri Baru** | ✅ 100% Berfungsi | Modal Register, generate ID unik otomatis | Email Verification Token & Captcha |
| **Formulir Biodata Multi-step** | ✅ 100% Berfungsi | 4-step wizard, validasi field, localStorage | Schema validation (Zod) + Supabase RLS |
| **Pilihan & Perubahan Program** | ✅ 100% Berfungsi | Realtime update state mahasiswa | Locking table saat pendaftaran ditutup |
| **Checklist Dokumen Berkas** | ✅ 100% Berfungsi | Visual checklist, status verifikasi per berkas | S3 / Supabase Private Storage Bucket |
| **Admin KPI & Statistik** | ✅ 100% Berfungsi | Dihitung otomatis dari list state siswa | SQL Aggregate query / materialized view |
| **Pencarian & Filter Pendaftar** | ✅ 100% Berfungsi | Instant multi-parameter filter (nama/ID/kota) | Server-side pagination & Full-text search |
| **Alur Keputusan (ACC/Revisi/Tolak)**| ✅ 100% Berfungsi | Dialog review berkas + input alasan dinamis | Audit log table & notification dispatch |
| **Sinkronisasi Mahasiswa-Admin** | ✅ 100% Berfungsi | Reaktif via AppContext & LocalStorage | Supabase Realtime / WebSocket subscriptions |
| **WhatsApp Notification** | 🟡 Mock / Preview Link | Link langsung ke nomor helpdesk resmi | WhatsApp Business API (Baileys / Fonnte / Waba) |
| **Payment Gateway** | ⚪ UI Ready (Placeholder) | Status biaya & invoice tertera di program | Integrasi Midtrans / Xendit / QRIS Statis |

# ELWAFA CENTER — Database Design Specification

Status: **DRAF KONSEPTUAL — BUKAN MIGRASI SIAP JALAN**  
Target yang diusulkan: PostgreSQL; keputusan ORM dan fallback lokal belum disetujui.  
Tidak ada migrasi yang dijalankan pada database Inbox Tim. DDL di bawah adalah bahan diskusi dan belum diverifikasi dengan PostgreSQL/ORM.

---

## 1. Relasi Antar Tabel (Entity Relationship Overview)

```
[ users ]
   │ 1
   ├───────────┐ 1
   ▼           ▼
[ staff ]  [ students ]
   │           │ 1
   │           ├─────────────────────────┐
   │           ▼ *                       ▼ *
   │       [ applications ] ────────▶ [ application_documents ]
   │           │ 1                       ▲
   │           ▼ *                       │
   │       [ application_events ]        │
   │                                     │
   │ 1                                   │
   ├───────────┐                         │
   ▼ *         ▼ *                       │
[ inquiries ] [ inquiry_entries ]        │
                                         │
[ programs ] ────────────────────────────┤
   │ 1                                   │
   ▼ *                                   │
[ program_requirements ] ────────────────┘
```

---

## 2. Skema DDL Relasional (PostgreSQL Format)

```sql
-- 1. ENUMS
CREATE TYPE user_role AS ENUM (
  'SUPER_ADMIN', 'ADMIN', 'ADMISSION_OFFICER', 
  'ACADEMIC_STAFF', 'FINANCE_STAFF', 'CONTENT_EDITOR', 'STUDENT'
);

CREATE TYPE application_status AS ENUM (
  'DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'REVISION_REQUIRED', 'APPROVED', 'REJECTED'
);

CREATE TYPE document_status AS ENUM (
  'PENDING', 'VALID', 'REVISION_REQUIRED', 'REJECTED'
);

CREATE TYPE inquiry_stage AS ENUM (
  'NEW', 'CONTACTED', 'FOLLOW_UP', 'WAITING_RESPONSE', 'RESOLVED', 'CLOSED'
);

-- 2. USERS & AUTENTIKASI
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(191) NOT NULL UNIQUE,
  phone VARCHAR(32) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role user_role NOT NULL DEFAULT 'STUDENT',
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash VARCHAR(64) NOT NULL UNIQUE,
  ip_address VARCHAR(45),
  user_agent TEXT,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_sessions_user_expires ON user_sessions(user_id, expires_at);

-- 3. PROFIL SANTRI
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  registration_no VARCHAR(32) UNIQUE,
  full_name VARCHAR(150) NOT NULL,
  gender CHAR(1) CHECK (gender IN ('L', 'P')),
  birth_place VARCHAR(100),
  birth_date DATE,
  origin_city VARCHAR(100),
  address TEXT,
  school_origin VARCHAR(150),
  school_type VARCHAR(50),
  graduation_year VARCHAR(4),
  parent_name VARCHAR(150),
  parent_phone VARCHAR(32),
  parent_occupation VARCHAR(100),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. KATALOG PROGRAM PENDIDIKAN
CREATE TABLE programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(100) NOT NULL UNIQUE,
  title VARCHAR(200) NOT NULL,
  category VARCHAR(100) NOT NULL,
  duration VARCHAR(100) NOT NULL,
  schedule VARCHAR(100) NOT NULL,
  quota INTEGER NOT NULL DEFAULT 0,
  enrolled_count INTEGER NOT NULL DEFAULT 0,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. PENDAFTARAN (ADMISSION APPLICATION)
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE RESTRICT,
  program_id UUID NOT NULL REFERENCES programs(id) ON DELETE RESTRICT,
  application_no VARCHAR(32) NOT NULL UNIQUE,
  status application_status NOT NULL DEFAULT 'DRAFT',
  reviewer_id UUID REFERENCES users(id),
  revision_notes TEXT,
  submitted_at TIMESTAMPTZ,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_program ON applications(program_id);

-- 6. DOKUMEN PERSYARATAN BERKAS
CREATE TABLE application_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  document_type VARCHAR(50) NOT NULL, -- 'IJAZAH', 'TRANSKRIP', 'PASPOR', 'SKCK', 'FOTO'
  file_name VARCHAR(255) NOT NULL,
  file_size_bytes INTEGER NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  storage_key TEXT NOT NULL, -- S3 object key (never public URL)
  status document_status NOT NULL DEFAULT 'PENDING',
  notes TEXT,
  verified_by UUID REFERENCES users(id),
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. TIMELOG AUDIT PENDAFTARAN
CREATE TABLE application_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  actor_id UUID REFERENCES users(id),
  action VARCHAR(50) NOT NULL, -- 'SUBMITTED', 'REVISION_REQUESTED', 'APPROVED', etc.
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. INBOX TIM & CRM PIPELINE (Migrasi dari SQLite eksisting)
CREATE TABLE inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(150) NOT NULL,
  phone VARCHAR(32) NOT NULL DEFAULT '',
  subject VARCHAR(200) NOT NULL,
  stage inquiry_stage NOT NULL DEFAULT 'NEW',
  assigned_to UUID REFERENCES users(id),
  due_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE inquiry_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_id UUID NOT NULL REFERENCES inquiries(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES users(id),
  kind VARCHAR(20) NOT NULL CHECK (kind IN ('internal', 'outgoing')),
  text TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_inquiry_entries_inquiry ON inquiry_entries(inquiry_id);
```

---

## 3. Ketidaksesuaian yang Wajib Diselesaikan Sebelum Implementasi

- DDL ini **tidak kompatibel langsung** dengan skema SQLite Inbox Tim saat ini (`admins`, `sessions`, `inquiries`, `entries`): status inbox saat ini `baru/ditangani/menunggu/selesai`, bukan enum `NEW/CONTACTED/...`. Identitas, waktu, dan penugasan perlu pemetaan dengan contoh baris nyata yang dianonimkan.
- `program_requirements` dan `staff` muncul pada diagram tetapi tidak didefinisikan dalam DDL; relasi diagram belum final.
- Data frontend `Student` memiliki status `PENDING`, sedangkan draft ini memakai `SUBMITTED/UNDER_REVIEW`. Kontrak UI/API dan aturan transisi harus disepakati sebelum perubahan.
- DDL belum menyediakan kebijakan RLS, tabel audit admin, constraint transisi, ataupun mekanisme idempoten import. Klaim keamanan pada bagian berikutnya masih **target**, bukan kemampuan yang sudah berjalan.
- Hindari `ON DELETE CASCADE` untuk data aplikasi/riwayat audit tanpa kebijakan retensi. Verifikasi backup dan pemulihan terlebih dahulu; migrasi nyata memerlukan persetujuan eksplisit.

## 4. Strategi Keamanan & Privasi Data Santri (Target)

1. **Enkripsi Data At-Rest:** Kolom nomor identitas dan data sensitif dienkripsi di level aplikasi sebelum masuk ke storage.
2. **Otorisasi Baris:** Santri hanya boleh mengakses aplikasi miliknya. Di Express + PostgreSQL biasa, `auth.uid()` **tidak tersedia**; identitas diverifikasi di server dan query dibatasi `student_id`, atau RLS PostgreSQL dikonfigurasi dengan konteks sesi tepercaya dan diuji terpisah.
3. **Penyimpanan Berkas Terisolasi:** Berkas dokumen disimpan dalam bucket tertutup tanpa akses publik langsung; akses hanya diberikan melalui signed URL dengan batas waktu pendek.

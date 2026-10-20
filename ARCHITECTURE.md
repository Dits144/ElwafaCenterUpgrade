# ARCHITECTURE & SYSTEM DESIGN — ELWAFA CENTER UPGRADE

## 1. Overview & Architectural Goals
Website and portal **Elwafa Center** dibangun sebagai platform digital terpadu untuk calon mahasiswa dan pengelola bimbingan studi Al-Azhar Kairo, Mesir. Arsitektur ini menggabungkan tiga pilar:
1. **Public Landing Page:** Profil lembaga, katalog program studi, kurikulum, alur tahapan santri, dokumentasi nyata, dan FAQ.
2. **Student Dashboard (Portal Mahasiswa):** Kelengkapan biodata multi-step, unggah dokumen, penentuan program, dan live application status tracker.
3. **Admin Dashboard (Portal Verifikator):** Pengawasan KPI pendaftar, pencarian & filter calon mahasiswa, inspeksi berkas, dan eksekusi keputusan resmi (ACC / Minta Revisi / Tolak).

---

## 2. Tech Stack & Engineering Decisions
- **Framework:** React 18 with TypeScript (Strict mode enabled)
- **Build Tool:** Vite 6 (Fast HMR, optimized production chunks)
- **Styling:** Tailwind CSS with custom Elwafa design tokens (Plus Jakarta Sans, Teal, Dark Ocean, Gold)
- **Icons:** Lucide React
- **Persistence Layer:** Reactive React Context with LocalStorage sync (`STORAGE_KEYS.STUDENTS`, `ROLE`, `ACTIVE_STUDENT`)
- **Compatibility:** Zero external database dependencies required for full interactive demonstration.

---

## 3. Directory Layout

```
C:\xampp\htdocs\ElwafaUpgrade\
├── index.html                      # HTML shell with Google Fonts Plus Jakarta Sans
├── package.json                    # Scripts & dependencies
├── vite.config.ts                  # Vite config (port 5198)
├── tailwind.config.js              # Elwafa color palette & typography tokens
├── tsconfig.json                   # Strict TypeScript compiler options
├── public/
│   └── assets/                     # Real Elwafa branding, banners, and logos
├── tools/                          # Reference agent skills & tools
│   ├── UI.md                       # UI design rules for coding agents
│   ├── taste-skill/                # Anti-slop & subtle gradient guidelines
│   ├── Cek-UI-web-design-guidelines/
│   ├── awesome-design-md/
│   └── firecrawl/
├── src/
│   ├── types/
│   │   └── index.ts                # Student, Program, Activity, Status types
│   ├── data/
│   │   └── mockData.ts             # Realistic seeded students, programs, activities
│   ├── context/
│   │   └── AppContext.tsx          # Centralized reactive state & LocalStorage sync
│   ├── components/
│   │   ├── common/
│   │   │   ├── DemoSwitcher.tsx    # Floating presentation role switcher
│   │   │   └── ToastContainer.tsx  # Dynamic feedback alerts
│   │   ├── public/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── ProgramsSection.tsx
│   │   │   ├── WhyChooseUs.tsx
│   │   │   ├── JourneyTimeline.tsx
│   │   │   ├── ActivitiesSection.tsx
│   │   │   ├── FAQSection.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── RegisterModal.tsx
│   │   ├── student/
│   │   │   └── StudentDashboard.tsx # Multi-step biodata, tracker, program switch
│   │   └── admin/
│   │       └── AdminDashboard.tsx   # KPI cards, student table, review drawer
│   ├── App.tsx                     # Role-based route view renderer
│   ├── main.tsx                    # React DOM root entry
│   └── index.css                   # Tailwind directives
```

---

## 4. State Flow & Synchronization

```
                     +----------------------------+
                     |   AppContext (Zustand/Ctx)  |
                     |  - students (localStorage) |
                     |  - activeStudentId         |
                     |  - role: visitor|student|adm|
                     +--------------+-------------+
                                    |
          +-------------------------+-------------------------+
          |                                                   |
          v                                                   v
+-----------------------+                           +----------------------+
|   Student Dashboard   |                           |    Admin Dashboard   |
| - Mengisi Biodata     |                           | - Review Berkas      |
| - Pilih Program       | === Update State & LS ==> | - ACC Pendaftaran    |
| - Live Status Tracker | <== Sync Real-time ====== | - Minta Revisi + Note|
+-----------------------+                           +----------------------+
```

Perubahan status yang dilakukan oleh Admin (misal: memberikan catatan revisi scan ijazah atau menyetujui pendaftaran) langsung tersinkronisasi dan tampak di Portal Mahasiswa seketika tanpa perlu restart aplikasi.

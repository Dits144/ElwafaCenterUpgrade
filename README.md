# ELWAFA CENTER — PLATFORM UPGRADE & INTERACTIVE DEMO

Proyek ini adalah implementasi modernisasi menyeluruh website **Elwafa Center** (Lembaga Konsultan & Pembinaan Pendidikan Studi Al-Azhar Kairo Mesir), dibangun menggunakan **TypeScript, React, Vite, dan Tailwind CSS**.

Platform ini mengintegrasikan **Website Publik**, **Portal Mahasiswa (Student Dashboard)**, dan **Dashboard Pengelola & Verifikator (Admin Dashboard)** dengan alur pendaftaran dan verifikasi berkas yang sepenuhnya interaktif dan sinkron secara real-time.

---

## 🚀 Cara Menjalankan Aplikasi

Aplikasi berjalan di server Vite lokal:

```bash
# Pindah ke direktori proyek
cd C:\xampp\htdocs\ElwafaUpgrade

# Menjalankan dev server (port 5198)
npm run dev

# Atau membuat production build
npm run build
```

Buka di browser:
👉 **`http://127.0.0.1:5198/`**

---

## 📁 Struktur Direktori & Tools yang Terpasang

```
C:\xampp\htdocs\ElwafaUpgrade\
├── index.html                      # HTML shell dengan font Plus Jakarta Sans
├── package.json                    # Scripts & dependencies (React, Vite, TS, Tailwind)
├── tailwind.config.js              # Token warna resmi Elwafa Center
├── tsconfig.json                   # Strict TypeScript compiler options
├── public/assets/                  # Logo resmi & dokumentasi asli santri
├── tools/                          # Reference agent skills & tools
│   ├── UI.md                       # UI Design Rules for Coding Agents (praeclarum/ui.md)
│   ├── taste-skill/                # Anti-slop, subtle gradients & typography (leonxlnx/taste-skill)
│   ├── Cek-UI-web-design-guidelines/ # Web Interface Guidelines & audit skill (vercel-labs)
│   ├── awesome-design-md/          # 80+ design systems extracted as DESIGN.md (voltagent)
│   └── firecrawl/                  # Engine & SDK untuk ekstraksi data web terstruktur (firecrawl)
├── src/
│   ├── types/                      # Type definitions (Student, Program, ApplicationStatus)
│   ├── data/                       # Seeded realistic mock data
│   ├── context/                    # AppContext & LocalStorage synchronization
│   ├── components/
│   │   ├── common/                 # DemoSwitcher pill & Toast alerts
│   │   ├── public/                 # Navbar, Hero, Programs, Timeline, FAQ, Footer
│   │   ├── student/                # Portal Mahasiswa (Biodata multi-step, Tracker)
│   │   └── admin/                  # Dashboard Verifikator (KPI, Filter, Review Drawer)
│   ├── App.tsx
│   └── main.tsx
└── README.md
```

---

## 📚 Dokumen Lengkap Proyek

- 📄 [`ARCHITECTURE.md`](./ARCHITECTURE.md) — Struktur arsitektur teknis dan sinkronisasi state.
- 🎨 [`DESIGN.md`](./DESIGN.md) — Sistem desain, token warna, tipografi, dan prinsip anti-slop.
- 🎯 [`DEMO_FLOW.md`](./DEMO_FLOW.md) — Panduan langkah demi langkah presentasi ke klien.
- 📊 [`FEATURE_MATRIX.md`](./FEATURE_MATRIX.md) — Matriks fitur demo vs kesiapan backend produksi.

---

## 🛠️ Rincian Tools & Fungsinya

### 1. `UI.md` (UI Design Rules for Coding Agents)
* **Sumber:** [`praeclarum/ui.md`](https://github.com/praeclarum/ui.md)
* **Tujuan:** Panduan mental model & interaksi untuk coding agent.
* **Inti Aturan:**
  - *Prime Directive:* UI bagus adalah UI yang berperilaku persis seperti ekspektasi pengguna.
  - Kurangi keputusan kognitif & opsi yang tidak perlu.
  - Elemen interaktif harus terlihat jelas bisa diklik (large touch targets, no fake buttons).
  - Konsistensi platform dan preferensi recognition over recall.

### 2. `taste-skill` (Gradasi Halus & No-Emoji / Anti-Slop)
* **Sumber:** [`leonxlnx/taste-skill`](https://github.com/leonxlnx/taste-skill)
* **Tujuan:** Menghilangkan "AI slop" (gradient blob murahan, icon cards generik berulang, emoji lebay, glassmorphism acak).
* **Fitur Utama:**
  - **Art Direction:** Menentukan arah visual berkarakter dari library kurasi 247 situs top dunia.
  - **Tipografi & Warna:** Palet warna bernuansa tenang/eksekutif, hirarki kontras bersih, typography matang.
  - **No-Ornaments Anti-Pattern:** Mengganti dekorasi hampa dengan substansi konten nyata dan foto autentik.

### 3. `Cek-UI-web-design-guidelines` (Cek Kepatuhan UI & Aksesibilitas)
* **Sumber:** [`vercel-labs/agent-skills`](https://github.com/vercel-labs/agent-skills) & [`vercel-labs/web-interface-guidelines`](https://github.com/vercel-labs/web-interface-guidelines)
* **Tujuan:** Checklist audit otomatis untuk frontend web modern.
* **Cakupan Pemeriksaan:**
  - Accessibility (ARIA labels, keyboard navigation, focus states, skip-links).
  - Semantic HTML (`<button>` vs `<a>`, form labels).
  - Motion & animation guidelines (respect `prefers-reduced-motion`).
  - Loading states, error boundaries, dan responsive layout.

### 4. `awesome-design-md` (Koleksi DESIGN.md Terverifikasi)
* **Sumber:** [`voltagent/awesome-design-md`](https://github.com/voltagent/awesome-design-md)
* **Tujuan:** Library token desain, warna, komponen, dan tipografi dari 80+ website kelas dunia.
* **Rekomendasi Referensi untuk Elwafa:**
  - `design-md/supabase` : Palette hijau emerald, dark mode rapi, technical feel.
  - `design-md/linear.app` : Presisi tinggi, micro-interaction halus, tipografi elegan.
  - `design-md/notion` : Layout editorial edukasi/komunitas yang hangat dan bersih.
  - `design-md/stripe` : Standar emas komponen interaktif dan trust-building UI.

### 5. `firecrawl` (Ekstraksi & Struktur Data Web)
* **Sumber:** [`firecrawl/firecrawl`](https://github.com/firecrawl/firecrawl)
* **Tujuan:** Scraping & konversi halaman web menjadi format Markdown dan JSON terstruktur yang bersih untuk LLM / Agent.
* **Kegunaan di ElwafaUpgrade:**
  - Scraping konten lama Elwafa (artikel, program, kegiatan, faq) menjadi structured data siap pakai.
  - Memudahkan migrasi konten dari HTML mentah / WordPress Elementor lama ke struktur komponen modern.

---

## 💡 Cara Penggunaan Cepat dengan AI Agent

1. **Ketika minta coding UI baru:**
   > *"Gunakan aturan di `UI.md` dan panduan anti-slop dari `taste-skill`. Buat komponen hero dan program Elwafa dengan palet Teal #009CA7 & Dark Teal #003B46 tanpa emoji berlebihan."*

2. **Ketika audit atau review kode UI:**
   > *"Cek kode HTML/React ini menggunakan checklist di `Cek-UI-web-design-guidelines/guidelines-command.md`."*

3. **Ketika butuh acuan desain:**
   > *"Ambil struktur token warna dan komponen dari `awesome-design-md/design-md/linear.app/DESIGN.md` lalu sesuaikan dengan brand Elwafa."*

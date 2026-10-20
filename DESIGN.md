# DESIGN SYSTEM & BRAND TOKENS — ELWAFA CENTER

## 1. Visual Theme & Atmosphere
**Konsep:** *Modern Islamic Education × Editorial University Portal.*
Desain dirancang untuk memancarkan wibawa akademik, keterbukaan, kepercayaan santri dan orang tua, serta keanggunan nilai-nilai Islam tanpa terjebak dalam ornamen klise atau efek "AI slop" yang berlebihan.

---

## 2. Color Palette & Roles

| Semantic Role | Hex Code | Visual Application |
|---|---|---|
| **Primary Teal** | `#009CA7` | Warna identitas utama, highlight penting, tombol aksi utama, active states |
| **Teal Light** | `#26B2BC` | Hover states, glowing accents, badge borders |
| **Teal Subtle** | `#E6F6F7` | Soft tag background, selected row tint |
| **Dark Ocean / Teal** | `#003B46` | Header navigasi, judul tebal, card kontras tinggi, background banner |
| **Deep Ocean** | `#00262D` | Footer, modal backgrounds, status bar |
| **Champagne Gold** | `#EAB700` | Lencana prestasi, bintang highlight, aksen pendaftaran, notifikasi |
| **Background Base** | `#F7F9F8` s/d `#FFFFFF` | Latar kanvas utama, clean dan terang |
| **Surface Subtle** | `#EEF5F4` | Latar card, formulir input, bordered list |
| **Text Main** | `#192A3D` | Teks utama, judul, angka |
| **Text Muted** | `#50626A` | Teks penjelasan, label bantuan, metadata |

---

## 3. Typography Rules
- **Font Family:** `Plus Jakarta Sans`, sans-serif.
- **Hierarki Tipografi:**
  - `Hero Title`: 48px – 60px (Font Weight: 800 / ExtraBold), line-height: 1.18.
  - `Section Heading`: 28px – 36px (Font Weight: 800 / ExtraBold).
  - `Card Title`: 16px – 18px (Font Weight: 700 / Bold).
  - `Body Text`: 14px – 16px (Font Weight: 400 / Normal, line-height: 1.6).
  - `Caption / Metadata`: 11px – 12px (Font Weight: 500 / Medium).

---

## 4. Anti-Slop Principles (`taste-skill` & `UI.md` Compliance)
1. **No Cheap Gradient Blobs:** Latar belakang menggunakan gradasi lembut berbasis CSS tint `#E6F6F7` dan white card surfaces, bukan neon cyberpunk atau ungu generik.
2. **Authentic Imagery:** Menggunakan aset asli dokumentasi santri Elwafa Center (`Hero-Image-3.2-768x768.png`, `karantina_ciamis.png`, `dauroh_success.png`, `tryout_camaba.png`), bukan foto stok generik.
3. **No Decorative Emoji Abuse:** Menghindari penggunaan emoji berlebih di tombol institusi resmi. Diganti dengan icon SVG presisi dari `lucide-react`.
4. **Predictable Interaction:** Setiap tombol memiliki fungsi nyata, modal konfirmasi, atau navigasi langsung (No Dead Buttons).
5. **Touch & Motor Friendly:** Ukuran tombol minimal 44px tinggi, touch targets nyaman di mobile 360px-390px.

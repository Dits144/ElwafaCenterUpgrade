# ELWAFA CENTER — Deployment & Operations Guide

Status: Operations Manual (V2.0)  
Target: Lingkungan Pengembangan Lokal, Staging, dan Produksi

---

## 1. Persyaratan Sistem

- **Runtime:** Node.js versi 20 LTS atau 22 LTS.
- **Package Manager:** npm (v10+) atau pnpm.
- **Database (Inbox Tim Eksisting):** Berkas SQLite lokal tersimpan di `server/data/inbox.sqlite`.
- **Database (Target Produksi Phase 2):** PostgreSQL 16+ dengan SSL diaktifkan.

---

## 2. Struktur Variabel Lingkungan (.env)

Berikut **nama variabel contoh**, bukan nilai produksi. Server saat ini membaca `process.env` dan **tidak otomatis memuat `.env`**. Set variabel pada environment proses, atau gunakan `node --env-file=.env server/index.mjs` pada Node yang mendukung `--env-file`. Jangan commit `.env`; gunakan secret manager untuk produksi. Proxy Vite juga harus menerima variabel saat proses Vite dimulai:

```env
# Server Runtime
NODE_ENV=development
HOST=127.0.0.1
PORT=5201

# Allowed Origins (pisahkan dengan koma untuk multi-domain)
ELWAFA_APP_ORIGIN=http://127.0.0.1:5198,http://localhost:5198,http://127.0.0.1:5199,http://localhost:5199

# Database Path
ELWAFA_DB_PATH=server/data/inbox.sqlite

# Vite Frontend Proxy Target
ELWAFA_API_TARGET=http://127.0.0.1:5201
```

---

## 3. Langkah Menjalankan Aplikasi Secara Lokal

### A. Instalasi Dependensi
```bash
npm install
```

### B. Membuat Akun Admin Inbox Tim Pertama Kali
Gunakan skrip CLI resmi. Masukkan kata sandi melalui prompt tersembunyi agar tidak tercatat sebagai argumen atau riwayat perintah:
```bash
read -r -s -p 'Kata sandi admin (minimal 12 karakter): ' ELWAFA_NEW_ADMIN_PASSWORD
printf '\n'
export ELWAFA_NEW_ADMIN_PASSWORD
node server/create-admin.mjs "Nama Admin"
unset ELWAFA_NEW_ADMIN_PASSWORD
```
Jalankan pada terminal pribadi dan jangan bagikan output atau nilai environment. Ini hanya untuk Inbox Tim, bukan login demo portal.

### C. Menjalankan Backend API Server
```bash
npm run dev:api
# Output: Elwafa inbox API listening on 5201
```

### D. Menjalankan Frontend Development Server
Di terminal terpisah:
```bash
npm run dev
# Vite dev server aktif di http://127.0.0.1:5198
```

---

## 4. Menjalankan Mode Preview Produksi Lokal

Untuk menguji build minified yang identik dengan lingkungan produksi:
```bash
# 1. Pastikan backend aktif:
npm run dev:api &

# 2. Kompilasi dan jalankan preview server:
npm run build
npm run preview
# Aplikasi dapat diakses di http://127.0.0.1:4174 dengan proxy /api otomatis ke port 5201
```

---

## 5. Prosedur Pencadangan (Backup & Disaster Recovery)

**Jangan menyalin berkas saat server atau CLI sedang menulis.** `sql.js` mengekspor seluruh DB ke berkas melalui rename; salinan dapat tidak merepresentasikan satu snapshot logis selama aktivitas berlangsung. Untuk backup yang konsisten, hentikan sementara API dan pastikan tidak ada CLI penulis aktif, kemudian:
```bash
node -e 'const fs=require("node:fs");const path=require("node:path");const p="server/data/inbox.sqlite";const dir="backups";fs.mkdirSync(dir,{recursive:true});const stamp=new Date().toISOString().replace(/[:.]/g,"-");const dest=path.join(dir,`inbox-${stamp}.sqlite`);fs.copyFileSync(p,dest,fs.constants.COPYFILE_EXCL);console.log(`Backup tersimpan: ${dest}`)'
```
Verifikasi salinan dengan membuka DB via SQLite/sql.js dan menjalankan `PRAGMA integrity_check`; simpan backup terenkripsi di luar direktori publik dan uji pemulihan pada salinan terisolasi. Jangan menghapus `server/data/`. **Belum ada perintah deploy produksi:** portal masih demo dan migrasi DB memerlukan persetujuan terpisah.

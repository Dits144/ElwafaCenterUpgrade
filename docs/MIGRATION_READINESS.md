# Kesiapan Migrasi Elwafa V2 — skema awal pada salinan lokal, tanpa cutover

Status: **backup, transfer salinan SQLite, dan skema V2 awal pada berkas salinan terisolasi disetujui serta dijalankan**. Empat tabel Inbox Tim dan database aktif tidak diubah. Tidak ada akun baru, autentikasi server baru, impor `localStorage`, cutover aplikasi, atau deployment. Portal santri/admin umum tetap demo `localStorage`; hanya Inbox Tim menggunakan server. Ini bukan skema lengkap `DATABASE_DESIGN.md` dan bukan kesiapan produksi.

## Baseline teramati

- `server/db.mjs`: `sql.js` memuat SQLite ke memori lalu mengekspor ulang berkas pada operasi tulis/startup. **Jangan** memakai modul ini dalam utilitas inspeksi/backup read-only.
- Tabel Inbox Tim: `admins`, `sessions`, `inquiries`, `entries`; `server/data/inbox.sqlite` diabaikan Git. ID admin/inquiry/entry berupa TEXT; sesi menyimpan hash token dan waktu kedaluwarsa integer.
- Stage inquiry saat ini: `baru`, `ditangani`, `menunggu`, `selesai`; jenis entry `internal` atau `outgoing`. `due` adalah TEXT (boleh kosong), `updated_at`/`at` berbentuk TEXT. Nama/nomor telepon/catatan adalah data pribadi.
- Status frontend `Student`: `DRAFT`, `PENDING`, `REVISION_REQUIRED`, `APPROVED`, `REJECTED`; perubahan di browser belum menjadi data server.
- `docs/DATABASE_DESIGN.md` masih draf dan belum kompatibel langsung: enum inbox berbeda, sebagian entitas diagram belum terdefinisi, dan tidak ada strategi pemetaan identitas/retensi final.

## Pemeriksaan aman yang sudah tersedia

`node server/migration-preflight.mjs server/data/inbox.sqlite --json` membuka **buffer salinan dalam memori** tanpa mengimpor `server/db.mjs`, menampilkan hanya jumlah baris, distribusi stage yang dikenal, **jumlah** stage tak dikenal, hasil integrity check, dan hitungan orphan. Tidak menampilkan nama, nomor telepon, isi catatan, kata sandi, atau hash. Exit nonzero bila skema tidak cocok atau anomali ditemukan. Skrip ini **bukan backup** dan bukan migrator. Tes `node qa-migration-preflight.cjs` menggunakan fixture sintetis dan menguji bahwa input tidak diubah, data pribadi tidak tercetak, serta anomali gagal.

`node qa-backup-rehearsal.cjs` melatih penyalinan, hash SHA-256, pemeriksaan integritas, dan pemulihan ke **jalur berbeda**, tetapi hanya memakai data sintetis di direktori sementara. Ia tidak membaca maupun mencadangkan `server/data/inbox.sqlite`.

`node qa-inbox-transfer-rehearsal.cjs` menguji transfer **SQLite-ke-SQLite dalam memori memakai fixture sintetis**. Fungsi di `server/inbox-transfer-rehearsal.mjs` tidak memiliki akses filesystem/CLI: ID dan nilai sumber dipertahankan, sesi dilewati, penulisan ulang identik idempoten, konflik ditolak, serta stage/relasi yatim sumber dan ketidaksamaan DDL tabel ditolak. Kegagalan penulisan yang disuntikkan setelah baris pertama berhasil ditangani `ROLLBACK`: target dalam memori kembali kosong. Ini **belum** menguji migrasi data nyata, target PostgreSQL, kegagalan saat mengekspor/menulis berkas, konkurensi penulis, ataupun rollback lintas proses. Jangan impor fungsi ini ke server berjalan atau menganggapnya migrator siap produksi.

## Hasil eksekusi pada salinan lokal (2026-10-27)

- Backup privat di luar repo: `C:/Users/dits1/AppData/Local/ElwafaCenter/private-backups/local-20261027-r0BfL5/inbox-backup.sqlite`.
- Target SQLite transisional **belum dipakai aplikasi**: `C:/Users/dits1/AppData/Local/ElwafaCenter/private-backups/local-20261027-r0BfL5/inbox-transitional.sqlite`.
- Restore rehearsal dari backup ke `restore-check.sqlite` di direktori yang sama. Source, backup, restore, dan target berukuran 45056 byte; SHA-256 keempatnya identik: `2fd5f869d986b8ea94787732817256894323a1ec5da236a775490fe6db6e702e`. `PRAGMA integrity_check=ok` pada semuanya.
- Semua tabel sumber berisi **0 baris** pada saat transfer (`admins`, `sessions`, `inquiries`, `entries`). Karena kosong, target identik secara byte; **tidak ada transformasi baris nyata yang terbukti**. Tabel target tetap sama, bukan skema V2.0 baru. Ini adalah copy + verifikasi dengan jalur transfer yang telah diuji sintetis, bukan migrasi produksi.
- API 5201 dan preview 5199 tidak merespons sebelum operasi; pemeriksaan proses Node tidak menemukan penulis DB yang dikenal. Pemeriksaan ini bukan lock lintas proses. Pemulihan operasional cukup arahkan ke source semula (yang tidak diubah); jangan mengubah `ELWAFA_DB_PATH` tanpa keputusan cutover terpisah.

## Skema V2 awal pada salinan terisolasi (2026-10-27)

Persetujuan terpisah diberikan hanya untuk skema awal pada salinan, **tanpa cutover**. Berkas baru: `C:/Users/dits1/AppData/Local/ElwafaCenter/private-backups/local-20261027-r0BfL5/inbox-v2-draft.sqlite`. Dibuat dari `inbox-transitional.sqlite` dengan `server/apply-v2-copy.mjs`; CLI menolak output yang sudah ada dan source=output. Implementasi skema ada pada `server/v2-copy-schema.mjs` dan tidak diimpor oleh server aktif.

- Skema versi `PRAGMA user_version=1`: tabel **kosong** `v2_users` (ID TEXT, email unik, role `STUDENT`/`ADMIN`, hash, waktu dibuat), `v2_applications` (ID, pemilik, status, waktu dibuat/diperbarui), `v2_application_events` (ID, aplikasi, aksi, waktu dibuat); FK serta CHECK dasar. Belum ada pendaftaran, autentikasi, dokumen, program, atau perubahan role pengguna lama.
- Source aktif, backup, dan target transisional: SHA-256 tetap `2fd5f869d986b8ea94787732817256894323a1ec5da236a775490fe6db6e702e`, masing-masing 45056 byte dan `integrity_check=ok`. Berkas V2 berukuran 81920 byte, SHA-256 `1713f3000464689f032688e5ae909d04dfee5e6766c19a2005275b632e898d20`, `integrity_check=ok`, `foreign_key_check` tanpa pelanggaran. DDL empat tabel lama identik dan semuanya tetap 0 baris.
- `qa-v2-copy-schema.cjs` menguji penambahan dan pengulangan skema, constraint role/status/FK, preservasi byte input dan DDL lama pada fixture sintetis. `qa-v2-file-migration.cjs` menguji file output baru, larangan overwrite dan jalur sama. **Tidak ada data riil yang ditransformasi** karena source lokal kosong.
- Skema ini hanyalah landasan eksperimen. `v2_users` tidak boleh diberi akun/role secara otomatis; hash lama di tabel `admins` tidak dipetakan. `PRAGMA foreign_keys=ON` harus diaktifkan pada setiap koneksi SQLite yang nantinya menggunakannya. Jangan arahkan `ELWAFA_DB_PATH` ke berkas V2 sebelum kontrak, auth, rollback, dan cutover disetujui serta diuji.

## Gate sebelum pengembangan skema lengkap/cutover berikutnya

1. Persetujuan spesifik pengguna untuk **cutover lokal** setelah kontrak target, keamanan auth, dan rollback siap; persetujuan skema pada salinan ini tidak mencakup cutover atau produksi/deployment.
2. Pilih mesin database dan ORM beserta versi; tetapkan pemilik data dan kebijakan retensi, termasuk apakah catatan inquiry boleh dihapus.
3. Sebelum cutover pada waktu berbeda, bekukan lagi semua penulis, buat backup **baru** dari source terbaru, cocokkan hash, jalankan `PRAGMA integrity_check`, dan uji pemulihan. Backup saat ini hanya menggambarkan keadaan saat operasi di atas; jangan simpan data atau backup di `public/` maupun Git.
4. Definisikan pemetaan lengkap empat tabel lama, terutama ID admin, sesi (sebaiknya tidak dipindahkan), stage, `due` kosong, timestamp, dan entri berpenulis. Pertahankan data sumber tetap utuh sampai rekonsiliasi berhasil.
5. Buat migrator **idempoten** dan tes fixture sintetis lebih dahulu; bandingkan jumlah baris, relasi, dan hash agregat tanpa mencetak PII. Uji kegagalan tengah proses dan rollback.
6. Implementasikan autentikasi server + RBAC dan tes akses lintas peran; jangan menganggap akun demo sebagai akun nyata. UI dipindahkan hanya setelah kontrak API dan strategi migrasi data browser disepakati.
7. Uji smoke pada salinan lokal; deployment produksi memerlukan persetujuan baru, backup baru, jendela pemeliharaan, dan prosedur rollback.

## Pemetaan minimal yang perlu disetujui (belum diterapkan)

| Sumber Inbox Tim | Perlakuan target yang diusulkan | Risiko/validasi |
| --- | --- | --- |
| `admins.id`, `name`, `password_hash`, `created_at` | Pertahankan ID TEXT dan hash pada tahap transisi **tanpa** menciptakan email atau peran baru; relasi ke identitas terpadu menunggu verifikasi pemilik akun. | Hash lama tidak otomatis kompatibel dengan sistem auth baru; jangan aktifkan login terpadu sebelum diuji. |
| `sessions` | Tidak diimpor sebagai sesi aktif; admin perlu login ulang setelah cutover yang disetujui. | Jangan cetak atau salin token/hash ke laporan. |
| `inquiries` | Pertahankan ID TEXT, `agent_id`, `updated_at`, dan `due` apa adanya dulu; stage `baru/ditangani/menunggu/selesai` tetap utuh. | Mengubah ke UUID/enum Inggris/DATE dapat menghilangkan relasi atau makna nilai kosong. |
| `entries` | Pertahankan ID, `inquiry_id`, `author_id`, `kind`, `text`, `at` apa adanya. | `author_id` harus merujuk admin; seluruh relasi dan hitungan harus direkonsiliasi. |
| Data browser `localStorage` | **Jangan impor otomatis**; perlu izin, pemeriksaan identitas, dan format ekspor yang disepakati. | Identitas dan status demo tidak tepercaya. |

Pemetaan di atas bukan SQL migrasi. Pada database lokal yang baru diperiksa, semua tabel sumber berjumlah nol; ini **tidak** membuktikan database lain/produksi kosong atau aman untuk migrasi. PostgreSQL pada draf `DATABASE_DESIGN.md` tidak dapat menerima ID TEXT secara langsung sebagai UUID; desain target harus diputuskan dahulu, baru migrator dan rollback dapat dibuat serta diuji.

## Keputusan terbuka

- PostgreSQL atau SQLite transisional? ORM apa? Di mana target lokal berjalan?
- Apakah data demo `localStorage` perlu diimpor? Data ini tidak dapat dipercaya sebagai identitas terverifikasi; jangan melakukan import otomatis.
- Bagaimana memverifikasi identitas admin lama dan memetakan peran tanpa menciptakan email sintetis atau hak admin baru secara diam-diam?
- Bagaimana menyelaraskan `PENDING` demo dengan `SUBMITTED`/`UNDER_REVIEW` target dan `baru`/`ditangani` Inbox Tim?
- Apakah `inquiries` harus tetap dapat dipakai selama cutover? Jika ya, strategi dual-write/reconciliation perlu dirancang dan diuji, bukan diasumsikan aman dengan `mtime`.

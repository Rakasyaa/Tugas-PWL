# Tugas 9 - Autentikasi & Otorisasi

Menambahkan fitur autentikasi (register, login dengan bcrypt & JWT) serta pembagian endpoint publik dan wajib login pada proyek ETS **Books API** (Express.js + MySQL + Prisma).

## Identitas

- Nama : Rakasya Yoga Surya Pratama
- NIM  : F1D02310022
- Kasus ETS : Books API (buku + peminjaman)

## Cara Menjalankan

1. **Pastikan MySQL aktif** (misalnya melalui XAMPP/Laragon) dan database `pwl26_buku` dari proyek ETS sudah tersedia.
2. **Pasang dependensi:**
   ```bash
   npm install
   ```
3. **Siapkan file `.env`:**
   Salin `.env.example` menjadi `.env`, lalu sesuaikan `DATABASE_URL` dengan MySQL di komputer kamu.
   ```bash
   cp .env.example .env
   ```
   Buat nilai `JWT_SECRET` acak 32 byte lewat terminal, lalu tempel ke `.env`:
   ```bash
   node -p "require('node:crypto').randomBytes(32).toString('hex')"
   ```
4. **Buat tabel `users` lewat migrasi Prisma dan generate Prisma Client:**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```
   *(Migrasi `20261124070000_tambah_user` akan menambahkan tabel `users` tanpa mengubah tabel `buku` dan `peminjaman` yang sudah ada. Jika database masih kosong, jalankan juga `npx prisma db seed` untuk mengisi data awal buku dan peminjaman.)*
5. **Jalankan server:**
   ```bash
   npm run dev
   ```
   Server berjalan di `http://localhost:3000`.
6. **Buat akun uji** dengan mengirim request `POST /auth/register` melalui `requests.http` (REST Client) atau Postman.

## Akun Uji

Akun uji dibuat lewat endpoint `POST /auth/register` (bukan seeder) menggunakan password sembarang khusus tugas:

| Email | Password |
| --- | --- |
| `rakasya.f1d02310022@unram.ac.id` | `tugas9pwl123` |

## Struktur Proyek

```text
T9-AUTENTIKASI/
├── index.js                              # [Diubah] Mendaftarkan route /auth di atas /buku dan /peminjaman
├── package.json                          # [Diubah] Menambahkan dependensi bcrypt dan jsonwebtoken
├── .env.example                          # [Diubah] Menambahkan contoh konfigurasi JWT_SECRET
├── .gitignore                            # Mengabaikan node_modules, .env, dan generated
├── prisma.config.js                      # Konfigurasi Prisma CLI dan lokasi seed
├── requests.http                         # [Diubah] Daftar pengujian REST Client (5 request wajib + endpoint lain + 2 percobaan)
├── README.md                             # [Diubah] Dokumentasi Tugas 9
├── screenshot/                           # Folder penyimpanan bukti screenshot pengujian
├── prisma/
│   ├── schema.prisma                     # [Diubah] Menambahkan model User (tabel users tanpa role)
│   ├── seed.js                           # Seeder data awal buku dan peminjaman dari ETS
│   └── migrations/
│       ├── 20261111080000_buat_tabel_buku_peminjaman/
│       │   └── migration.sql             # Migrasi awal tabel buku dan peminjaman (ETS)
│       └── 20261124070000_tambah_user/
│           └── migration.sql             # [Baru] Migrasi penambahan tabel users
└── src/
    ├── controllers/
    │   ├── auth.controller.js            # [Baru] Handler HTTP untuk register, login, dan /auth/saya
    │   ├── buku.controller.js            # [Diubah] Handler HTTP CRUD buku (PUT mengembalikan status 200)
    │   └── peminjaman.controller.js      # Handler HTTP daftar dan tambah peminjaman
    ├── data/
    │   ├── user.data.js                  # [Baru] Query Prisma tabel users (select tanpa passwordHash)
    │   ├── buku.data.js                  # Query Prisma tabel buku
    │   └── peminjaman.data.js            # Query Prisma tabel peminjaman dengan include buku
    ├── lib/
    │   └── prisma.js                     # Inisialisasi PrismaClient dengan adapter MariaDB/MySQL
    ├── middleware/
    │   ├── auth.js                       # [Baru] Middleware butuhLogin untuk verifikasi Bearer JWT
    │   ├── errorHandler.js               # Penangan error terpusat dengan format { error: { pesan, kode } }
    │   ├── logger.js                     # Mencatat method, URL, status, dan durasi request
    │   ├── notFound.js                   # Mengembalikan 404 ROUTE_NOT_FOUND untuk endpoint tak dikenal
    │   └── validasi.js                   # Middleware validasi req.body menggunakan skema Joi
    ├── routes/
    │   ├── auth.routes.js                # [Baru] Routing /auth/register, /auth/login, dan /auth/saya
    │   ├── buku.routes.js                # [Diubah] Memasang butuhLogin sebelum validasi pada POST, PUT, DELETE
    │   └── peminjaman.routes.js          # [Diubah] Memasang butuhLogin sebelum validasi pada POST /peminjaman
    ├── services/
    │   ├── auth.service.js               # [Baru] Logika register (bcrypt cost 10) dan login (compare + JWT 2h)
    │   ├── buku.service.js               # Aturan bisnis CRUD, filter, dan paginasi buku
    │   └── peminjaman.service.js         # Aturan bisnis dan transaksi peminjaman + pengurangan stok buku
    ├── utils/
    │   └── AppError.js                   # Kelas error custom (status, pesan, kode)
    └── validators/
        ├── auth.validator.js             # [Baru] Skema Joi untuk email (maks 100) dan password (8–72 karakter)
        ├── buku.validator.js             # Skema Joi untuk data buku
        └── peminjaman.validator.js       # Skema Joi untuk data peminjaman
```

## Endpoint

| Method | URL | Akses | Status |
| --- | --- | --- | --- |
| `GET` | `/` | Publik | `200` |
| `POST` | `/auth/register` | Publik | `201`, `409`, `422` |
| `POST` | `/auth/login` | Publik | `200`, `401`, `422` |
| `GET` | `/auth/saya` | Wajib login | `200`, `401` |
| `GET` | `/buku` | Publik | `200` |
| `GET` | `/buku/:id` | Publik | `200`, `400`, `404` |
| `POST` | `/buku` | Wajib login | `201`, `401`, `409`, `422` |
| `PUT` | `/buku/:id` | Wajib login | `200`, `400`, `401`, `404`, `409`, `422` |
| `DELETE` | `/buku/:id` | Wajib login | `204`, `400`, `401`, `404`, `409` |
| `GET` | `/peminjaman` | Publik | `200` |
| `POST` | `/peminjaman` | Wajib login | `201`, `401`, `404`, `409`, `422` |

**Format Error Autentikasi (`errorHandler` terpusat):**

```json
{
  "error": {
    "pesan": "Token diperlukan",
    "kode": "TOKEN_DIPERLUKAN"
  }
}
```

| Situasi | Status | Kode |
| --- | --- | --- |
| Email sudah terdaftar saat register | `409` | `EMAIL_DUPLIKAT` |
| Input register/login tidak sesuai skema Joi | `422` | `VALIDATION_ERROR` |
| Email tidak terdaftar atau password salah saat login | `401` | `LOGIN_GAGAL` |
| Header `Authorization` tidak ada atau bukan `Bearer ...` | `401` | `TOKEN_DIPERLUKAN` |
| Token rusak, signature tidak cocok, atau sudah expired | `401` | `TOKEN_TIDAK_VALID` |

## Pengujian

> **Catatan:** Simpan screenshot hasil pengujian ke folder `screenshot/` dengan nama file di bawah ini (pastikan nama/NIM terlihat pada email akun uji atau request).

1. **Tabel `users` di phpMyAdmin** — Menunjukkan kolom `passwordHash` menyimpan hash bcrypt (`$2b$10$...`), bukan password asli.
   ![Tabel users di phpMyAdmin](screenshot/01-phpmyadmin-users.png)
2. **Request 3 (Publik tanpa token) dan Request 4 (Wajib login tanpa token) berdampingan** — `GET /buku` tetap berhasil (`200`), sedangkan `POST /buku` tanpa token ditolak (`401 TOKEN_DIPERLUKAN`).
   ![Perbandingan endpoint publik dan wajib login tanpa token](screenshot/02-publik-vs-wajib-login.png)
3. **Request 5 (Wajib login dengan token valid)** — `POST /buku` dengan header `Authorization: Bearer {{token}}` berhasil menambahkan data buku (`201 Created`).
   ![POST buku dengan token valid](screenshot/03-post-buku-dengan-token.png)
4. **File `requests.http` di VS Code** — Menampilkan variabel `@token` dan urutan request pengujian di REST Client.
   ![requests.http di VS Code](screenshot/04-requests-http.png)

## Dua Percobaan

### Percobaan 1 — Token Dipalsukan

- **Langkah:** Login menggunakan akun uji untuk memperoleh token JWT valid, lalu ubah bagian payload (tengah) dengan Base64URL manual (misalnya mengubah `id` menjadi `999`) tanpa mengetahui `JWT_SECRET`, kemudian kirim ke `GET /auth/saya`.
- **Hasil:** Server menolak dengan status `401 Unauthorized` dan respons `{ "error": { "pesan": "Token tidak valid atau expired", "kode": "TOKEN_TIDAK_VALID" } }`.
- **Screenshot:**
  ![Percobaan 1 - Token dipalsukan](screenshot/05-percobaan-1-token-palsu.png)
- **Penjelasan:** Header dan payload JWT hanyalah JSON yang di-encode dengan Base64URL (bukan dienkripsi), sehingga siapa pun bisa membaca dan mengubah isinya. Namun, bagian signature dihitung menggunakan HMAC-SHA256 dari `header.payload` dan `JWT_SECRET` milik server. Saat payload diubah tanpa menandatangani ulang memakai secret asli, hasil perhitungan ulang signature di `jwt.verify()` tidak cocok sehingga token langsung ditolak.

### Percobaan 2 — Token Expired

- **Langkah:** Ubah sementara opsi `expiresIn` di `src/services/auth.service.js` dari `'2h'` menjadi `'5s'`, jalankan ulang server, lakukan `POST /auth/login`, tunggu lebih dari 6 detik, lalu kirim token tersebut ke `GET /auth/saya`. Setelah selesai, kembalikan `expiresIn` ke `'2h'`.
- **Hasil:** Server menolak dengan status `401 Unauthorized` dan respons `{ "error": { "pesan": "Token tidak valid atau expired", "kode": "TOKEN_TIDAK_VALID" } }`.
- **Screenshot:**
  ![Percobaan 2 - Token expired](screenshot/06-percobaan-2-token-expired.png)
- **Penjelasan:** Saat `jwt.sign()` membuat token dengan opsi `expiresIn`, library otomatis menyisipkan claim `iat` (waktu dibuat) dan `exp` (batas waktu berlaku dalam Unix timestamp) ke dalam payload yang ikut dilindungi oleh signature. Ketika request masuk, `jwt.verify()` cukup membandingkan nilai `exp` di dalam token dengan waktu server saat ini tanpa perlu menyimpan catatan token di database atau memori server. Jika waktu sekarang sudah melewati `exp`, `jwt.verify()` melempar `TokenExpiredError` yang ditangkap middleware `butuhLogin` menjadi `401 TOKEN_TIDAK_VALID`.

## Deklarasi Penggunaan AI

| Bagian | Alat AI | Dipakai untuk apa | Cara saya memeriksa hasilnya |
| --- | --- | --- | --- |
| Lapisan autentikasi (`auth.service.js`, `auth.controller.js`, `user.data.js`, `auth.validator.js`, `auth.routes.js`) | Antigravity (Gemini) | Membantu menyusun implementasi register, login dengan bcrypt & JWT, serta validasi Joi sesuai pola Materi 9 | Menjalankan server dan menguji register (201, 409, 422), login (200, 401), dan `/auth/saya` serta memeriksa hash di database |
| Middleware `butuhLogin` & proteksi route | Antigravity (Gemini) | Membantu menulis middleware `src/middleware/auth.js` dan memasangnya sebelum `validasi` di `buku.routes.js` serta `peminjaman.routes.js` | Menguji endpoint publik tanpa token (200), endpoint wajib login tanpa token (401), dengan token valid (201/200/204), serta dua percobaan token palsu dan expired |
| `requests.http` & `README.md` | Antigravity (Gemini) | Membantu menyusun daftar request REST Client dan kerangka dokumentasi README sesuai ketentuan Tugas 9 | Menjalankan seluruh request di REST Client dan memverifikasi setiap bagian README serta mengambil screenshot pengujian sendiri |
| Model Prisma & Migrasi tabel `users` | Antigravity (Gemini) | Membantu menambahkan model `User` tanpa role di `prisma/schema.prisma` dan membuat file migrasi `tambah_user` | Menjalankan `npx prisma migrate dev`, `npx prisma generate`, dan mengecek struktur kolom tabel `users` di phpMyAdmin |

**Contoh prompt yang digunakan:**
> "kerjain tugas ini https://pahrulirfan.github.io/pwl/tugas-09-autentikasi-otorisasi.html, di dalam folder T9-AUTENTIKASI jangan di folder lain, cari refrensi dari folder lain boleh jangan terlalu advance karena hanya tugas. untuk tugas ETS saya ada di folder pwl26-mini-project"

**Pernyataan:** Saya menggunakan AI pada bagian yang tertulis di tabel di atas. Seluruh kode, migrasi database, pengujian endpoint, dan dokumentasi saya periksa kembali dengan menjalankan aplikasinya secara langsung.

## Kesimpulan & Kendala

1. **Kenapa password di-hash, bukan dienkripsi?**
   Enkripsi bersifat dua arah sehingga jika kunci enkripsi ikut bocor, seluruh password asli pengguna dapat dibuka kembali. Password sebenarnya tidak pernah perlu dibaca ulang oleh server, cukup diverifikasi saat login; karena itu digunakan hash satu arah yang sengaja lambat seperti `bcrypt` (dengan salt acak per password) agar tidak bisa dibalik dan sangat mahal untuk diserang secara brute-force jika database bocor.
2. **Kenapa pesan login gagal dibuat sama untuk email tidak terdaftar dan password salah?**
   Jika server membedakan pesan seperti "email tidak terdaftar" dan "password salah", penyerang dapat memanfaatkannya untuk melakukan *user enumeration* (mencari tahu alamat email mana saja yang terdaftar di sistem). Dengan menyamakan respons menjadi `401 LOGIN_GAGAL` ("Email atau password salah"), penyerang tidak mendapat petunjuk apakah email tersebut ada atau tidak.
3. **Apa bedanya halaman publik dan halaman wajib login pada proyek ini, dan dari mana server tahu sebuah token sah tanpa menyimpannya?**
   Pada proyek Books API ini, halaman publik (`POST /auth/register`, `POST /auth/login`, `GET /buku`, `GET /buku/:id`, `GET /peminjaman`) tidak dipasangi middleware `butuhLogin` sehingga siapa pun bisa melihat daftar buku dan riwayat peminjaman tanpa login. Sebaliknya, halaman wajib login (`GET /auth/saya`, `POST /buku`, `PUT /buku/:id`, `DELETE /buku/:id`, `POST /peminjaman`) dipasangi `butuhLogin` sebelum middleware `validasi` agar setiap aksi perubahan data dan transaksi hanya bisa dilakukan oleh pengguna yang membawa token valid. Server mengetahui token itu sah tanpa menyimpannya di database karena `jwt.verify()` menghitung ulang HMAC-SHA256 dari `header.payload` menggunakan `JWT_SECRET` milik server lalu mencocokkannya dengan signature pada token serta memeriksa claim `exp` terhadap waktu saat ini.
4. **Kendala dan solusinya:**
   Saat menyalin proyek ETS ke folder baru `T9-AUTENTIKASI`, Prisma Client belum tersedia karena folder `generated/` dan `node_modules/` tidak ikut disalin serta perlu menambahkan `JWT_SECRET` di `.env`. Solusinya adalah menjalankan `npm install`, menambahkan `JWT_SECRET` acak 32 byte di `.env`, lalu menjalankan `npx prisma migrate dev` dan `npx prisma generate` sebelum menyalakan server.

# Tugas 4 - REST API Dasar

## Identitas
- Nama: Rakasya Yoga
- NIM: F1D02310022
- Mata kuliah: Pemrograman Web Lanjut

## Deskripsi Tugas
Proyek ini merupakan REST API sederhana menggunakan Node.js dan Express untuk menampilkan koleksi robot edukasi. Topik ini dipilih karena berkaitan dengan bidang robotika dan memiliki atribut yang mudah dipahami, yaitu nama, kategori, tingkat kesulitan, serta harga.

Data dibuat dalam bentuk array of object dan disimpan terpisah pada `src/data/robot.js`. Proyek menggunakan ES Modules (`import` dan `export`) sebagaimana materi modul dan pemrograman asinkron. Data hanya disimpan di memori, bukan database; perubahan dari endpoint DELETE akan kembali ke data awal setelah server dimulai ulang.

## Teknologi
- Node.js
- Express.js
- JavaScript ES Modules
- npm

## Struktur Proyek
```text
T4-REST-API/
├── src/
│   └── data/
│       └── robot.js
├── screenshot/
├── .gitignore
├── index.js
├── package.json
└── README.md
```

## Cara Menjalankan
Pastikan Node.js sudah terpasang. Jalankan perintah berikut dari folder proyek:

```bash
npm install
npm run dev
```

Server berjalan pada `http://localhost:3000`. Untuk memastikan server aktif, buka alamat tersebut di browser.

## Daftar Endpoint
| Method | URL | Fungsi | Status |
|---|---|---|---|
| GET | `/` | Pesan sambutan untuk memeriksa server | 200 |
| GET | `/robot` | Menampilkan semua data robot | 200 |
| GET | `/robot/:id` | Menampilkan detail robot berdasarkan ID | 200 / 400 / 404 |
| DELETE | `/robot/:id` | Menghapus robot berdasarkan ID (bonus) | 204 / 400 / 404 |

## Bentuk Data
Contoh satu objek:

```json
{
  "id": 1,
  "nama": "RACERO Maze Solving",
  "kategori": "Maze Solving",
  "tingkat": "Menengah",
  "harga": 450000
}
```

Arti setiap field:
- `id`: identitas unik untuk mencari robot melalui URL.
- `nama`: nama robot atau kit robot.
- `kategori`: jenis atau bidang robot.
- `tingkat`: tingkat kesulitan penggunaan atau pembelajaran.
- `harga`: harga contoh dalam rupiah (data ilustrasi untuk latihan).

## Pengujian
Gunakan Postman, Thunder Client, Bruno, atau REST Client. Pastikan server sedang berjalan.

1. **GET daftar:** `GET http://localhost:3000/robot` — diharapkan `200 OK`, dengan array di properti `data` dan jumlah pada `meta.total`.
2. **GET detail yang tersedia:** `GET http://localhost:3000/robot/1` — diharapkan `200 OK`, dengan objek di properti `data`.
3. **GET detail yang tidak tersedia:** `GET http://localhost:3000/robot/999` — diharapkan `404 Not Found`, dengan properti `error.pesan` dan `error.kode`.
4. **DELETE (bonus):** `DELETE http://localhost:3000/robot/1` — diharapkan `204 No Content`. Setelah itu, panggil GET daftar dan pastikan jumlah berkurang.
5. **DELETE ID yang tidak ada:** `DELETE http://localhost:3000/robot/999` — diharapkan `404 Not Found`.

Simpan screenshot hasil pengujian ke folder `screenshot/`. Screenshot perlu diambil langsung dari terminal/Postman setelah menjalankan proyek; gambar bukti tidak dibuat-buat dan belum disertakan dalam paket ini.

## Deklarasi Penggunaan AI
| Bagian | Alat AI | Dipakai untuk apa | Bagaimana saya memeriksa hasilnya |
|---|---|---|---|
| Data (`src/data/robot.js`) | ChatGPT | Membantu menyusun contoh 12 objek data robot dengan field yang sesuai topik | Saya memeriksa struktur setiap objek, keunikan ID, dan jumlah data di file |
| Route (`index.js`) | ChatGPT | Membantu menyusun route GET daftar, GET detail, format error, serta DELETE bonus | Saya menjalankan endpoint dan memeriksa status serta response di Postman atau browser |
| README | ChatGPT | Membantu menyusun dokumentasi dan langkah pengujian | Saya mencocokkan endpoint dan instruksi dengan kode yang dijalankan |

**Contoh prompt:** “Bantu buat REST API dasar dengan Express sesuai materi kuliah, menggunakan ES Modules, data array of object minimal 10 item di file terpisah, endpoint GET daftar, GET detail dengan 404, format response `{ data: ... }` dan `{ error: { pesan, kode } }`, serta DELETE opsional.”

**Pernyataan:** Saya menggunakan ChatGPT pada bagian yang tercantum di tabel. Saya akan memeriksa, menguji, dan memahami kembali kode sebelum mengumpulkan tugas.

## Kesimpulan dan Kendala
Melalui proyek ini, saya mempelajari cara memisahkan data ke dalam modul, mengekspor dan mengimpor data menggunakan ES Modules, membuat route REST API dengan Express, membaca parameter URL melalui `req.params`, mengonversi ID dari string menjadi angka, serta menggunakan status HTTP dan format response JSON yang konsisten. Salah satu hal penting yang perlu diperhatikan adalah ID dari parameter URL berbentuk string sehingga harus dikonversi sebelum dibandingkan dengan ID numerik pada array.

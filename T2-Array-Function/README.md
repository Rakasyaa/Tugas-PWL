# Tugas 2 - Array Function

## Identitas
* **Mata Kuliah:** Pemrograman Web Lanjut - Kelas B
* **Nama:** Rakasya Yoga Surya Pratama
* **NIM:** F1D02310022

Repository ini dibuat untuk memenuhi **Tugas 2 - Array Function** Matakuliah Pemrograman Web Lanjut mengenai penggunaan Fungsi-fungsi Array.

## Deskripsi Tugas
Tugas ini bertujuan untuk memahami penggunaan fungsi/metode array pada JavaScript, seperti;
1. `map()`
2. `filter()`
3. `reduce()`
4. `find()`
5. `some()`
6. `every()`

Data yang digunakan dalam tugas ini adalah kumpulan film populer dari Marvel Cinematic Universe (MCU). Setiap film memiliki informasi, Judul film, Tahun rilis, Genre dan Rating. Pada tugas ini kita akan mengambil informasi menyesuaikan dengan kebutuhan yang ingin kita cari menggunakan metode array pada javascript.

---

# Implementasi

### map()
- Tujuan : digunakan untuk mengambil judul setiap film dan menambahkan tahun rilis pada judul tersebut.
- Screenshot
* kode:
![ss](screenshot/codeMap().png)

* hasil:
![ss](screenshot/map().png)

### filter()
- Tujuan : digunakan untuk mengambil film yang memiliki rating minimal 8.0.
- Screenshot
* kode:
![ss](screenshot/codeFilter().png)

* hasil:
![ss](screenshot/filter().png)

### reduce()
- Tujuan : digunakan untuk menghitung total rating dari seluruh film MCU yang terdapat pada list.
- Screenshot
* kode:
![ss](screenshot/codeReduce().png)

* hasil:
![ss](screenshot/reduce().png)

### find()
- Tujuan : digunakan untuk mencari satu film berdasarkan judul.
Film yang dicari adalah **Avengers: Endgame**.
- Screenshot
* kode:
![ss](screenshot/codeFind().png)

* hasil:
![ss](screenshot/find().png)

### some()
- Tujuan : digunakan untuk mengecek apakah ada setidaknya satu film yang memiliki rating lebih dari 8.5.
- Screenshot
* kode:
![ss](screenshot/codeSome().png)

* hasil:
![ss](screenshot/some().png)

### every()
- Tujuan : digunakan untuk mengecek apakah seluruh film memiliki rating minimal 6.0.
- Screenshot
* kode:
![ss](screenshot/codeEvery().png)

* hasil:
![ss](screenshot/every().png)


---

# Kesimpulan
Berdasarkan implementasi yang telah dilakukan, setiap metode array memiliki fungsi yang berbeda.

`map()` digunakan untuk membuat array baru berdasarkan permintaan yang kita berikan. Pada tugas ini, `map()` digunakan untuk menggabungkan daftar judul film dan tahun rilisnya.

`filter()` digunakan untuk mengambil elemen sesuai permintaan. Pada tugas ini, `filter()` digunakan untuk mencari film dengan rating minimal 8 (>=8.0).

`reduce()` digunakan untuk menggabungkan seluruh elemen array menjadi satu nilai. Pada tugas ini, `reduce()` digunakan untuk menghitung total rating seluruh film.

`find()` digunakan untuk mencari satu elemen yang sesuai permintaan. Pada tugas ini, `find()` digunakan untuk mencari film *Avengers: Endgame*.

`some()` digunakan untuk mengecek apakah ada setidaknya satu elemen yang memenuhi kondisi. Pada tugas ini, digunakan untuk mengecek apakah ada film dengan rating di atas 8.5.

`every()` digunakan untuk mengecek apakah seluruh elemen memenuhi kondisi tertentu. Pada tugas ini, digunakan untuk mengecek apakah semua film memiliki rating minimal 6.0.

Dengan menggunakan metode ini, pengolahan data seperti film dalam JavaScript dapat dilakukan dengan lebih sederhana dan terstruktur.
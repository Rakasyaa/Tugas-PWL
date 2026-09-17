## Tugas 1 - Node.js Plugins

**Mata Kuliah:** Pemrograman Web Lanjut - Kelas B
**Nama:** Rakasya Yoga Surya Pratama
**NIM:** F1D02310022

Repository ini dibuat untuk memenuhi **Tugas 1 - Node.js Plugins** Matakuliah Pemrograman Web Lanjut mengenai penggunaan package/plugin Node.js.

## Pada tugas ini menggunakan package/plugin :

* **Chalk** - memberikan warna dan styling pada output terminal.
* **Cowsay** - membuat pesan dalam bentuk ASCII art karakter.
* **Figlet** - mengubah teks menjadi ASCII art.
* **gradient-string** - membuat warna gradient pada output terminal.
* **dayjs** - memasukan tanggal dan memodifikasi nya.

---

# Langkah Instalasi Dependensi

Pastikan **Node.js** dan **NPM** sudah terinstal di komputer.

Untuk menginstal package yang dibutuhkan, buka terminal pada folder project kemudian jalankan perintah berikut:

### Instalasi Chalk

```bash
npm install chalk
```

### Instalasi Cowsay

```bash
npm install cowsay
```

### Instalasi Figlet

```bash
npm install figlet
```

### Instalasi Gradient String

```bash
npm install gradient-string
```

### Instalasi Day.js

```bash
npm install dayjs
```

### Instalasi Semua Dependensi Sekaligus

Package juga dapat diinstal sekaligus menggunakan satu perintah:

```bash
npm install chalk cowsay figlet gradient-string dayjs
```

Setelah proses instalasi selesai, package akan otomatis ditambahkan ke bagian `dependencies` pada file `package.json`.

---
## Gunakan code berikut untuk men-import setiap plugin yang ingin digunakan ke code utama

```bash
import chalk from "chalk";
import cowsay from "cowsay";
import figlet from "figlet";
import gradient from 'gradient-string';
import dayjs from 'dayjs';
```
---

## Menjalankan Project

Jalankan file `tugas1.js` di terminal, dengan:

```bash
node tugas1.js
```

Program akan menampilkan:

1. Teks dengan warna dan styling **Chalk**, Contoh Nama dan NIM.
2. Umur dengan cara menghitung otomatis tanggal saat ini dengan **dayjs**.
3. Teks dengan warna gradient menggunakan **gradient-string**.
4. Pesan motivasi menggunakan **Cowsay**, disini character diubah menjadi **Cowth Vader** dengan menambahkan komen **vader** pada bagian **f**.
5. Nama dalam bentuk ASCII art menggunakan **Figlet**.

---

## Process Arguments

Program dapat menerima input dari terminal menggunakan `process.argv`.

Contoh:

```bash
node tugas1.js "Rakasya Yoga"
```

Input tersebut akan ditampilkan kembali pada terminal sebagai kata sambutan awal.

---

## Hasil Screenshot Output

![Output Program](screenshot/output.png)

// prisma/seed.js
// Data awal yang bisa dijalankan BERULANG: npx prisma db seed
import { prisma } from '../src/lib/prisma.js';

async function main() {
    // Kosongkan dulu (tabel anak sebelum tabel induk) supaya seed aman diulang
    await prisma.peminjaman.deleteMany();
    await prisma.buku.deleteMany();

    // id ditulis eksplisit supaya sama di semua komputer
    await prisma.buku.createMany({
        data: [
            { id: 1,  isbn: '9789793062792', judul: 'Laskar Pelangi',             penulis: 'Andrea Hirata',        harga: 89000,  stok: 10, tanggalTerbit: new Date('2005-09-01') },
            { id: 2,  isbn: '9789799731234', judul: 'Bumi Manusia',               penulis: 'Pramoedya Ananta Toer', harga: 120000, stok: 8,  tanggalTerbit: new Date('1980-08-25') },
            { id: 3,  isbn: '9789792248623', judul: 'Negeri 5 Menara',            penulis: 'A. Fuadi',             harga: 85000,  stok: 12, tanggalTerbit: new Date('2009-07-01') },
            { id: 4,  isbn: '9786024125189', judul: 'Filosofi Teras',             penulis: 'Henry Manampiring',    harga: 98000,  stok: 15, tanggalTerbit: new Date('2018-11-01') },
            { id: 5,  isbn: '9786020633176', judul: 'Atomic Habits',              penulis: 'James Clear',          harga: 108000, stok: 20, tanggalTerbit: new Date('2019-05-01') },
            // stok 1: dipakai untuk menguji "stok tidak cukup" (409)
            { id: 6,  isbn: '9780132350884', judul: 'Clean Code',                 penulis: 'Robert C. Martin',     harga: 350000, stok: 1,  tanggalTerbit: new Date('2008-08-01') },
            { id: 7,  isbn: '9780135957059', judul: 'The Pragmatic Programmer',   penulis: 'Andrew Hunt',          harga: 420000, stok: 5,  tanggalTerbit: new Date('2019-09-13') },
            { id: 8,  isbn: '9781593279509', judul: 'Eloquent JavaScript',        penulis: 'Marijn Haverbeke',     harga: 300000, stok: 6,  tanggalTerbit: new Date('2018-12-04') },
            { id: 9,  isbn: '9789791227780', judul: 'Sang Pemimpi',               penulis: 'Andrea Hirata',        harga: 80000,  stok: 9,  tanggalTerbit: new Date('2006-07-01') },
            { id: 10, isbn: '9786020322247', judul: 'Dilan 1990',                 penulis: 'Pidi Baiq',            harga: 79000,  stok: 11, tanggalTerbit: new Date('2014-04-01') },
            { id: 11, isbn: '9786020301129', judul: 'Cantik Itu Luka',            penulis: 'Eka Kurniawan',        harga: 110000, stok: 4,  tanggalTerbit: new Date('2002-01-01') },
            { id: 12, isbn: '9786232160033', judul: 'Bumi',                       penulis: 'Tere Liye',            harga: 95000,  stok: 14, tanggalTerbit: new Date('2014-01-01') },
        ],
    });

    await prisma.peminjaman.createMany({
        data: [
            { id: 1, bukuId: 1, namaPeminjam: 'Andi', jumlah: 1 },
            { id: 2, bukuId: 2, namaPeminjam: 'Budi', jumlah: 2 },
        ],
    });

    console.log('Seed selesai');
}

main()
    .catch((err) => { console.error(err); process.exitCode = 1; })
    .finally(() => prisma.$disconnect());

// src/services/peminjaman.service.js
import { prisma } from '../lib/prisma.js';
import * as data from '../data/peminjaman.data.js';
import { AppError } from '../utils/AppError.js';

export async function daftarPeminjaman() {
    return data.semua();
}

// TRANSAKSI: dua langkah harus berhasil bersama atau gagal bersama
//   1) buat baris di tabel peminjaman
//   2) kurangi stok di tabel buku
export async function buatPeminjaman({ bukuId, namaPeminjam, jumlah }) {
    return prisma.$transaction(async (tx) => {   // pakai tx, BUKAN prisma, di dalam transaksi
        const buku = await tx.buku.findUnique({ where: { id: bukuId } });
        if (!buku) {
            throw new AppError(404, 'Buku tidak ditemukan', 'BUKU_NOT_FOUND');
        }
        if (buku.stok < jumlah) {   // aturan bisnis; throw membatalkan (rollback) seluruh transaksi
            throw new AppError(409, `Stok tidak cukup (tersisa ${buku.stok})`, 'STOK_TIDAK_CUKUP');
        }

        // Langkah 1: simpan peminjaman
        const peminjaman = await tx.peminjaman.create({
            data: { bukuId, namaPeminjam, jumlah },
        });

        // Langkah 2: kurangi stok buku
        await tx.buku.update({
            where: { id: bukuId },
            data: { stok: { decrement: jumlah } },
        });

        return peminjaman;
    });
}

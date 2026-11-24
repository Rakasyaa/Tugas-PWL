// src/services/buku.service.js — lapis service: aturan bisnis (tanpa req/res)
import * as data from "../data/buku.data.js";
import { AppError } from "../utils/AppError.js";

function ambilId(id) {
  const angka = Number(id);
  if (!Number.isInteger(angka)) {
    throw new AppError(400, "id harus berupa bilangan bulat", "ID_TIDAK_VALID");
  }
  return angka;
}

// GET /buku?halaman=1&ukuran=5&cari=bumi
export async function daftarBuku(query) {
  const halaman = Math.max(Number(query.halaman) || 1, 1);
  const ukuran = Math.min(Math.max(Number(query.ukuran) || 10, 1), 100);

  // Filter: judul mengandung teks (spread bersyarat)
  const where = {
    ...(query.cari && { judul: { contains: query.cari } }),
  };

  const [hasil, total] = await Promise.all([
    data.daftar({ where, skip: (halaman - 1) * ukuran, take: ukuran }),
    data.hitung(where), // hitung dengan filter yang sama
  ]);

  return {
    data: hasil,
    meta: { halaman, ukuran, total, totalHalaman: Math.ceil(total / ukuran) },
  };
}

export async function detailBuku(id) {
  const buku = await data.cariById(ambilId(id));
  if (!buku) {
    throw new AppError(404, "Buku tidak ditemukan", "NOT_FOUND");
  }
  return buku;
}

export async function buatBuku(input) {
  if (await data.cariByIsbn(input.isbn)) {
    throw new AppError(
      409,
      `ISBN ${input.isbn} sudah terdaftar`,
      "ISBN_DUPLIKAT",
    );
  }

  try {
    return await data.simpan(input);
  } catch (err) {
    if (err.code === "P2002") {
      throw new AppError(
        409,
        `ISBN ${input.isbn} sudah terdaftar`,
        "ISBN_DUPLIKAT",
      );
    }
    throw err;
  }
}

export async function hapusBuku(id) {
  const buku = await detailBuku(id);

  try {
    await data.hapus(buku.id);
  } catch (err) {
    if (err.code === "P2003") {
      throw new AppError(
        409,
        "Buku tidak bisa dihapus karena masih punya data peminjaman",
        "BUKU_MASIH_DIPINJAM",
      );
    }
    throw err;
  }
}

export async function ubahBuku(id, input) {
  const buku = await detailBuku(id);

  const bukuIsbn = await data.cariByIsbn(input.isbn);
  if (bukuIsbn && bukuIsbn.id !== buku.id) {
    throw new AppError(409, `ISBN salah`, "ISBN_DUPLIKAT");
  }

  return data.ubah(buku.id, input);
}

import { prisma } from "../lib/prisma.js";

export function daftar({ where, skip, take }) {
  return prisma.buku.findMany({ where, skip, take, orderBy: { id: "asc" } });
}

export function hitung(where) {
  return prisma.buku.count({ where });
}

export function cariById(id) {
  return prisma.buku.findUnique({ where: { id } });
}

export function cariByIsbn(isbn) {
  return prisma.buku.findUnique({ where: { isbn } });
}

export function simpan(input) {
  return prisma.buku.create({ data: input });
}

export function hapus(id) {
  return prisma.buku.delete({ where: { id } });
}

export function ubah(id, input) {
  return prisma.buku.update({ where: { id }, data: input });
}

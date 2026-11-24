import * as service from "../services/buku.service.js";

export async function daftar(req, res) {
  res.json(await service.daftarBuku(req.query));
}

export async function detail(req, res) {
  const buku = await service.detailBuku(req.params.id);
  res.json({ data: buku });
}

export async function buat(req, res) {
  const baru = await service.buatBuku(req.body);
  res.status(201).json({ data: baru });
}

export async function hapus(req, res) {
  await service.hapusBuku(req.params.id);
  res.status(204).end();
}

export async function ubah(req, res) {
  const buku = await service.ubahBuku(req.params.id, req.body);
  res.json({ data: buku });
}

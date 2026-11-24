// src/controllers/peminjaman.controller.js
import * as service from '../services/peminjaman.service.js';

export async function daftar(req, res) {
    const hasil = await service.daftarPeminjaman();
    res.json({ data: hasil });
}

export async function buat(req, res) {
    const hasil = await service.buatPeminjaman(req.body);
    res.status(201).json({ data: hasil });
}

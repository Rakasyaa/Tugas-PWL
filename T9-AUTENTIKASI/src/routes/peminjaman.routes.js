// src/routes/peminjaman.routes.js
import express from "express";
import * as ctrl from "../controllers/peminjaman.controller.js";
import { butuhLogin } from "../middleware/auth.js";
import { validasi } from "../middleware/validasi.js";
import { skemaPeminjaman } from "../validators/peminjaman.validator.js";

const router = express.Router();

// Publik (daftar peminjaman beserta data bukunya)
router.get("/", ctrl.daftar);

// Wajib login (transaksi dua tabel: peminjaman + pengurangan stok)
router.post("/", butuhLogin, validasi(skemaPeminjaman), ctrl.buat);

export default router;

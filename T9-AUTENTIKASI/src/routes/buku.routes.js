import express from "express";
import * as ctrl from "../controllers/buku.controller.js";
import { butuhLogin } from "../middleware/auth.js";
import { validasi } from "../middleware/validasi.js";
import { skemaBuku } from "../validators/buku.validator.js";

const router = express.Router();

// Publik
router.get("/", ctrl.daftar);
router.get("/:id", ctrl.detail);

// Wajib login (butuhLogin dipasang sebelum validasi)
router.post("/", butuhLogin, validasi(skemaBuku), ctrl.buat);
router.put("/:id", butuhLogin, validasi(skemaBuku), ctrl.ubah);
router.delete("/:id", butuhLogin, ctrl.hapus);

export default router;

import Joi from "joi";

export const skemaPeminjaman = Joi.object({
  bukuId: Joi.number().integer().positive().required(),
  namaPeminjam: Joi.string().min(3).max(100).required(),
  jumlah: Joi.number().integer().min(1).default(1),
});

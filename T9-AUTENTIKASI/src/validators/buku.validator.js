import Joi from "joi";

export const skemaBuku = Joi.object({
  isbn: Joi.string().min(10).max(20).required(),
  judul: Joi.string().min(1).max(150).required(),
  penulis: Joi.string().min(1).max(100).required(),
  harga: Joi.number().integer().min(0).required(),
  stok: Joi.number().integer().min(0).default(0),
  tanggalTerbit: Joi.date().iso().required(),
});

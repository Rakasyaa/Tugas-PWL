import Joi from "joi";

export const menuSchema = Joi.object({
  nama: Joi.string().min(3).max(50).required().messages({
    "string.empty": '"nama" tidak boleh kosong',
    "string.min": '"nama" minimal 3 karakter',
    "string.max": '"nama" maksimal 50 karakter',
    "any.required": '"nama" wajib diisi',
  }),
  harga: Joi.number().integer().min(1000).max(100000).required().messages({
    "number.base": '"harga" harus berupa angka',
    "number.integer": '"harga" harus bilangan bulat',
    "number.min": '"harga" minimal 1000',
    "number.max": '"harga" maksimal 100000',
    "any.required": '"harga" wajib diisi',
  }),
  kategori: Joi.string()
    .valid("makanan", "minuman", "camilan")
    .required()
    .messages({
      "any.only": '"kategori" harus makanan, minuman, atau camilan',
      "any.required": '"kategori" wajib diisi',
    }),
  tersedia: Joi.boolean().default(true),
});

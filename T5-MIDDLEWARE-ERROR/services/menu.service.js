import { menu } from "../data/menu.js";
import { AppError } from "../utils/AppError.js";

export async function getAllMenu(kategori) {
  if (!kategori) return [...menu];
  return menu.filter(
    (item) => item.kategori.toLowerCase() === String(kategori).toLowerCase(),
  );
}

export async function getMenuById(id) {
  const item = menu.find((x) => x.id === Number(id));
  if (!item) throw new AppError(404, "Menu tidak ditemukan", "NOT_FOUND");
  return item;
}

export async function createMenu(payload) {
  const duplikat = menu.some(
    (x) => x.nama.toLowerCase() === payload.nama.toLowerCase(),
  );
  if (duplikat)
    throw new AppError(409, "Nama menu sudah terdaftar", "NAMA_DUPLIKAT");
  const item = { id: Math.max(0, ...menu.map((x) => x.id)) + 1, ...payload };
  menu.push(item);
  return item;
}

export async function updateMenu(id, payload) {
  const index = menu.findIndex((x) => x.id === Number(id));
  if (index === -1)
    throw new AppError(404, "Menu tidak ditemukan", "NOT_FOUND");
  const duplikat = menu.some(
    (x) =>
      x.id !== Number(id) &&
      x.nama.toLowerCase() === payload.nama.toLowerCase(),
  );
  if (duplikat)
    throw new AppError(409, "Nama menu sudah terdaftar", "NAMA_DUPLIKAT");
  menu[index] = { id: Number(id), ...payload };
  return menu[index];
}

export async function deleteMenu(id) {
  const index = menu.findIndex((x) => x.id === Number(id));
  if (index === -1)
    throw new AppError(404, "Menu tidak ditemukan", "NOT_FOUND");
  menu.splice(index, 1);
}

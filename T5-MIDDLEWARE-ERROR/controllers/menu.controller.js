import * as menuService from "../services/menu.service.js";

export async function getAllMenu(req, res, next) {
  try {
    const data = await menuService.getAllMenu(req.query.kategori);
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
}

export async function getMenuById(req, res, next) {
  try {
    const data = await menuService.getMenuById(req.params.id);
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
}

export async function createMenu(req, res, next) {
  try {
    const data = await menuService.createMenu(req.body);
    res.status(201).json({ pesan: "Menu berhasil ditambahkan", data });
  } catch (error) {
    next(error);
  }
}

export async function updateMenu(req, res, next) {
  try {
    const data = await menuService.updateMenu(req.params.id, req.body);
    res.status(200).json({ pesan: "Menu berhasil diperbarui", data });
  } catch (error) {
    next(error);
  }
}

export async function deleteMenu(req, res, next) {
  try {
    await menuService.deleteMenu(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

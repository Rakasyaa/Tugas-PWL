import { AppError } from "../utils/AppError.js";

export function cekApiKey(req, res, next) {
  const apiKey = req.get("x-api-key");
  const expectedKey = process.env.API_KEY || "racer-kantin-2026";
  if (!apiKey || apiKey !== expectedKey) {
    return next(
      new AppError(
        401,
        "API key tidak valid atau tidak ditemukan",
        "UNAUTHORIZED",
      ),
    );
  }
  next();
}

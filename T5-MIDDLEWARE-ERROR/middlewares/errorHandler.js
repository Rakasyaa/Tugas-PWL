export function errorHandler(err, req, res, next) {
  const status = err.status || 500;

  if (status === 500) {
    console.error(err.stack || err);
    return res.status(500).json({
      error: {
        pesan: "Terjadi kesalahan pada server",
        kode: "INTERNAL_SERVER_ERROR",
      },
    });
  }

  const error = { pesan: err.message, kode: err.code || "APP_ERROR" };
  if (err.details) error.detail = err.details;
  res.status(status).json({ error });
}

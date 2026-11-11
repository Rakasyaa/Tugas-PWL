import { AppError } from "../utils/AppError.js";

export function cekApiKey(req, res, next) {
  const apiKey = req.get("x-api-key");
  const expectedKey = process.env.API_KEY;
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

export function logger(req, res, next) {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration} ms)`,
    );
  });
  next();
}

export function notFound(req, res, next) {
  next(
    new AppError(
      404,
      `Rute ${req.method} ${req.originalUrl} tidak ditemukan`,
      "ROUTE_NOT_FOUND",
    ),
  );
}

export function validate(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      convert: true,
      stripUnknown: true,
    });

    if (error) {
      const pesan = error.details.map((detail) => detail.message);
      return next(
        new AppError(
          422,
          "Data yang dikirim tidak valid",
          "VALIDATION_ERROR",
          pesan,
        ),
      );
    }

    req.body = value;
    next();
  };
}

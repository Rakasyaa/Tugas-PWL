import { AppError } from "../utils/AppError.js";

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

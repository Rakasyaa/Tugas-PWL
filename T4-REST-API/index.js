import express from "express";
import { film } from "./src/data/film.js";

const app = express();
const PORT = process.env.PORT ?? 3000;
app.use(express.json());

const error = (res, status, kode, pesan) =>
  res.status(status).json({ error: { pesan, kode } });

app.get("/film", (req, res) => {
  res.status(200).json(film);
});

app.get("/film/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return error(
      res,
      400,
      "ID_TIDAK_VALID",
      "ID harus berupa bilangan bulat positif.",
    );
  }

  const f = film.find((x) => x.id === id);
  if (!f) {
    return error(
      res,
      404,
      "FILM_NOT_FOUND",
      `film dengan id ${id} tidak ditemukan.`,
    );
  }

  return res.status(200).json({ data: f });
});

app.delete("/film/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return error(
      res,
      400,
      "ID_TIDAK_VALID",
      "ID harus berupa bilangan bulat positif.",
    );
  }

  const f = film.find((x) => x.id === id);
  if (!f) {
    return error(
      res,
      404,
      "FILM_NOT_FOUND",
      `film dengan id ${id} tidak ditemukan.`,
    );
  }

  film.splice(f, 1);
  return res.status(204).end();
});

app.listen(PORT, (err) => {
  if (err) {
    console.error("Gagal menjalankan server:", err.message);
    process.exit(1);
  }
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

import "dotenv/config";
import express from "express";
import menuRouter from "./routes/menu.routes.js";
import { logger, notFound, errorHandler } from "./middlewares/middleware.js";

const app = express();

app.get("/", (req, res) => {
  res.send("endpoint /menu Tugas PWL Middleware Error Handling");
});

app.use(express.json());
app.use(logger);
app.use("/menu", menuRouter);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if (err) {
    console.error("Gagal menjalankan server:", err.message);
    process.exit(1);
  }
  console.log(`Server jalan di http://localhost:${PORT}`);
});

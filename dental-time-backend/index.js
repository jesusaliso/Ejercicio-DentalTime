import express from "express";
import cors from "cors";
import pacientesRouter from "./routes/pacientes.routes.js";

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ mensaje: "API Dental Time funcionando" });
});

// Rutas de pacientes
app.use("/api/pacientes", pacientesRouter);

// Arranque del servidor
app.listen(PORT, () => {
  console.log(`Servidor API Dental Time escuchando en http://localhost:${PORT}`);
});

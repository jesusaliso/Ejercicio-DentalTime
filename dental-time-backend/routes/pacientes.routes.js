import { Router } from "express";
import { pacientes } from "../data/pacientes.js";

const router = Router();

// GET /api/pacientes -> lista todos los pacientes
router.get("/", (req, res) => {
  res.json(pacientes);
});

// GET /api/pacientes/:dni -> devuelve un paciente por DNI
router.get("/:dni", (req, res) => {
  const { dni } = req.params;
  const paciente = pacientes.find((p) => p.dni === dni);

  if (!paciente) {
    return res.status(404).json({ mensaje: "Paciente no encontrado" });
  }

  res.json(paciente);
});

// POST /api/pacientes -> crear un nuevo paciente
router.post("/", (req, res) => {
  const { dni, nombre, apellidos, direccion, localidad, cp, telefono } = req.body;

  // Validar campos obligatorios
  if (!dni || !nombre || !apellidos) {
    return res
      .status(400)
      .json({ mensaje: "dni, nombre y apellidos son obligatorios" });
  }

  // Comprobar si ya existe un paciente con ese DNI
  const existe = pacientes.some((p) => p.dni === dni);
  if (existe) {
    return res.status(409).json({ mensaje: "Ya existe un paciente con ese DNI" });
  }

  const nuevoPaciente = {
    dni,
    nombre,
    apellidos,
    direccion: direccion || "",
    localidad: localidad || "",
    cp: cp || "",
    telefono: telefono || ""
  };

  pacientes.push(nuevoPaciente);

  res.status(201).json(nuevoPaciente);
});


// PUT /api/pacientes/:dni -> actualizar un paciente existente
router.put("/:dni", (req, res) => {
  const { dni } = req.params;
  const { nombre, apellidos, direccion, localidad, cp, telefono } = req.body;

  const indice = pacientes.findIndex((p) => p.dni === dni);

  if (indice === -1) {
    return res.status(404).json({ mensaje: "Paciente no encontrado" });
  }

  // Actualizamos solo los campos recibidos (si vienen definidos)
  if (nombre !== undefined) pacientes[indice].nombre = nombre;
  if (apellidos !== undefined) pacientes[indice].apellidos = apellidos;
  if (direccion !== undefined) pacientes[indice].direccion = direccion;
  if (localidad !== undefined) pacientes[indice].localidad = localidad;
  if (cp !== undefined) pacientes[indice].cp = cp;
  if (telefono !== undefined) pacientes[indice].telefono = telefono;

  res.json(pacientes[indice]);
});

// DELETE /api/pacientes/:dni -> eliminar un paciente
router.delete("/:dni", (req, res) => {
  const { dni } = req.params;

  const indice = pacientes.findIndex((p) => p.dni === dni);

  if (indice === -1) {
    return res.status(404).json({ mensaje: "Paciente no encontrado" });
  }

  const pacienteEliminado = pacientes[indice];

  pacientes.splice(indice, 1);

  res.json({ mensaje: "Paciente eliminado correctamente", paciente: pacienteEliminado });
});



export default router;
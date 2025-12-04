import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Pacientes

export const getPacientes = () => api.get('/pacientes');

export const getPacientePorDni = (dni) => api.get(`/pacientes/${dni}`);

export const crearPaciente = (datosPaciente) =>
  api.post('/pacientes', datosPaciente);

export const actualizarPaciente = (dni, datosPaciente) =>
  api.put(`/pacientes/${dni}`, datosPaciente);

export const eliminarPaciente = (dni) => api.delete(`/pacientes/${dni}`);

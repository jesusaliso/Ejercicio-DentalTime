import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PacienteForm from '../components/PacienteForm';
import { crearPaciente } from '../services/api';

function NuevoPacientePage() {
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const manejarCrearPaciente = async (datosFormulario) => {
    try {
      setCargando(true);
      setError(null);

      await crearPaciente(datosFormulario);

      navigate('/');
    } catch (err) {
      console.error('Error al crear paciente', err);

      if (err.response && err.response.status === 409) {
        setError('Ya existe un paciente con ese DNI.');
      } else if (err.response && err.response.status === 400) {
        setError('Faltan datos obligatorios en el formulario.');
      } else {
        setError('No se ha podido crear el paciente. Inténtalo de nuevo.');
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <section>
      <h2>Nuevo paciente</h2>
      <p>Rellena los datos del paciente y pulsa en “Crear paciente”.</p>

      {cargando && <p>Guardando paciente...</p>}
      {error && <p className="error-message">{error}</p>}

      <PacienteForm onSubmit={manejarCrearPaciente} modo="crear" />
    </section>
  );
}

export default NuevoPacientePage;

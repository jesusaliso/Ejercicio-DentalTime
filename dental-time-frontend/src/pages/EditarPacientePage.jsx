import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PacienteForm from "../components/PacienteForm";
import { actualizarPaciente, getPacientePorDni } from "../services/api";

function EditarPacientePage() {
  const { dni } = useParams();
  const navigate = useNavigate();

  const [paciente, setPaciente] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    const cargarPaciente = async () => {
      try {
        setCargando(true);
        setError(null);

        const respuesta = await getPacientePorDni(dni);
        setPaciente(respuesta.data);
      } catch (err) {
        console.error("Error al cargar paciente", err);
        setError("No se ha podido cargar el paciente. Verifica el DNI.");
      } finally {
        setCargando(false);
      }
    };

    cargarPaciente();
  }, [dni]);

  const manejarGuardarCambios = async (datosFormulario) => {
    try {
      setGuardando(true);
      setError(null);

      await actualizarPaciente(dni, datosFormulario);

      navigate("/");
    } catch (err) {
      console.error("Error al actualizar paciente", err);
      setError("No se han podido guardar los cambios. Inténtalo de nuevo.");
    } finally {
      setGuardando(false);
    }
  };

  if (cargando) {
    return (
      <section>
        <h2>Editar paciente</h2>
        <p>Cargando datos del paciente...</p>
      </section>
    );
  }

  if (error && !paciente) {
    return (
      <section>
        <h2>Editar paciente</h2>
        <p className="error-message">{error}</p>
      </section>
    );
  }

  return (
    <section>
      <h2>Editar paciente</h2>
      <p>Modifica los datos necesarios y guarda los cambios.</p>

      {guardando && <p>Guardando cambios...</p>}
      {error && <p className="error-message">{error}</p>}

      {paciente && (
        <PacienteForm
          initialPaciente={paciente}
          onSubmit={manejarGuardarCambios}
          modo="editar"
        />
      )}
    </section>
  );
}

export default EditarPacientePage;

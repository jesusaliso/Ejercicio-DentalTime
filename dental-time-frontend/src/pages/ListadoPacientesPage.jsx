import { useEffect, useState } from "react";
import { getPacientes, eliminarPaciente } from "../services/api";
import PacientesTable from "../components/PacientesTable";

function ListadoPacientesPage() {
  const [pacientes, setPacientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarPacientes = async () => {
      try {
        setCargando(true);
        setError(null);

        const respuesta = await getPacientes();
        setPacientes(respuesta.data);
      } catch (err) {
        console.error("Error al cargar pacientes", err);
        setError("No se han podido cargar los pacientes. Inténtalo de nuevo.");
      } finally {
        setCargando(false);
      }
    };

    cargarPacientes();
  }, []);

  const manejarEliminarPaciente = async (dni) => {
    const confirmado = window.confirm(
      `¿Seguro que quieres eliminar al paciente con DNI ${dni}?`
    );

    if (!confirmado) return;

    try {

      await eliminarPaciente(dni);

      setPacientes((prev) => prev.filter((p) => p.dni !== dni));
    } catch (err) {
      console.error("Error al eliminar paciente", err);
      alert("No se ha podido eliminar el paciente. Inténtalo de nuevo.");
    }
  };

  return (
    <section>
      <h2>Listado de pacientes</h2>

      {cargando && <p>Cargando pacientes...</p>}
      {error && <p className="error-message">{error}</p>}

      {!cargando && !error && (
        <PacientesTable
          pacientes={pacientes}
          onEliminar={manejarEliminarPaciente}
        />
      )}
    </section>
  );
}

export default ListadoPacientesPage;

import { Link } from "react-router-dom";

function PacientesTable({ pacientes, onEliminar }) {
  if (!pacientes || pacientes.length === 0) {
    return <p>No hay pacientes registrados.</p>;
  }

  return (
    <table className="pacientes-table">
      <thead>
        <tr>
          <th>DNI</th>
          <th>Nombre</th>
          <th>Apellidos</th>
          <th>Dirección</th>
          <th>Localidad</th>
          <th>C.P.</th>
          <th>Teléfono</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {pacientes.map((paciente) => (
          <tr key={paciente.dni}>
            <td>{paciente.dni}</td>
            <td>{paciente.nombre}</td>
            <td>{paciente.apellidos}</td>
            <td>{paciente.direccion}</td>
            <td>{paciente.localidad}</td>
            <td>{paciente.cp}</td>
            <td>{paciente.telefono}</td>
            <td className="acciones-cell">
              <Link className="action-link" to={`/editar/${paciente.dni}`}>
                Editar
              </Link>
              {onEliminar && (
                <button
                  type="button"
                  className="action-button action-delete"
                  onClick={() => onEliminar(paciente.dni)}
                >
                  Eliminar
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PacientesTable;


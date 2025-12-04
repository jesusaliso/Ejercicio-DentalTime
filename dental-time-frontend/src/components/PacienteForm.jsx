import { useState, useEffect } from 'react';

const camposIniciales = {
  dni: '',
  nombre: '',
  apellidos: '',
  direccion: '',
  localidad: '',
  cp: '',
  telefono: '',
};

function PacienteForm({ initialPaciente, onSubmit, modo = 'crear' }) {
  const [formValues, setFormValues] = useState(camposIniciales);

  useEffect(() => {
    if (initialPaciente) {
      setFormValues({
        dni: initialPaciente.dni || '',
        nombre: initialPaciente.nombre || '',
        apellidos: initialPaciente.apellidos || '',
        direccion: initialPaciente.direccion || '',
        localidad: initialPaciente.localidad || '',
        cp: initialPaciente.cp || '',
        telefono: initialPaciente.telefono || '',
      });
    }
  }, [initialPaciente]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formValues.dni || !formValues.nombre || !formValues.apellidos) {
      alert('DNI, nombre y apellidos son obligatorios.');
      return;
    }

    onSubmit(formValues);
  };

  const esModoEdicion = modo === 'editar';

  return (
    <form className="paciente-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="dni">DNI *</label>
        <input
          id="dni"
          name="dni"
          type="text"
          value={formValues.dni}
          onChange={handleChange}
          required
          disabled={esModoEdicion}
        />
      </div>

      <div className="form-row">
        <label htmlFor="nombre">Nombre *</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          value={formValues.nombre}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor="apellidos">Apellidos *</label>
        <input
          id="apellidos"
          name="apellidos"
          type="text"
          value={formValues.apellidos}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor="direccion">Dirección</label>
        <input
          id="direccion"
          name="direccion"
          type="text"
          value={formValues.direccion}
          onChange={handleChange}
        />
      </div>

      <div className="form-row">
        <label htmlFor="localidad">Localidad</label>
        <input
          id="localidad"
          name="localidad"
          type="text"
          value={formValues.localidad}
          onChange={handleChange}
        />
      </div>

      <div className="form-row">
        <label htmlFor="cp">Código postal</label>
        <input
          id="cp"
          name="cp"
          type="text"
          value={formValues.cp}
          onChange={handleChange}
        />
      </div>

      <div className="form-row">
        <label htmlFor="telefono">Teléfono</label>
        <input
          id="telefono"
          name="telefono"
          type="tel"
          value={formValues.telefono}
          onChange={handleChange}
        />
      </div>

      <div className="form-actions">
        <button type="submit">
          {esModoEdicion ? 'Guardar cambios' : 'Crear paciente'}
        </button>
      </div>
    </form>
  );
}

export default PacienteForm;

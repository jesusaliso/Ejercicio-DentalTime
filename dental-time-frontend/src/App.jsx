import { Link, Route, Routes } from "react-router-dom";
import ListadoPacientesPage from "./pages/ListadoPacientesPage";
import NuevoPacientePage from "./pages/NuevoPacientePage";
import EditarPacientePage from "./pages/EditarPacientePage";

function App() {
  return (
    <div className="app-container">
      <header>
        <h1>Dental Time - Gestión de Pacientes</h1>
        <p>Aplicación frontend en React conectada a la API Rest.</p>

        <nav className="main-nav">
          <Link to="/">Listado</Link>
          <Link to="/nuevo">Nuevo paciente</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<ListadoPacientesPage />} />
          <Route path="/nuevo" element={<NuevoPacientePage />} />
          <Route path="/editar/:dni" element={<EditarPacientePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

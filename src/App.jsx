import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";
import { Main } from "./components/Main";
import { Listado } from "./components/Listado";

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta para la página principal */}
        <Route path="/" element={<Main />} />

        {/* Ruta para el login */}
        <Route path="/login" element={<LoginForm />} />

        {/* Ruta para los favoritos */}
        <Route path="/register" element={<RegisterForm />} />

        <Route path="/" element={<Listado />} />
        {/* Ruta por defecto para cuando no hay coincidencia */}
        <Route path="*" element={<div>404 - Página no encontrada</div>} />
      </Routes>
    </Router>
  );
}

export default App;

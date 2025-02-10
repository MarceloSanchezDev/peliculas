import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";
import { Main } from "./components/Main";
import { Listado } from "./components/Listado";
import { useEffect, useState } from "react";

function App() {
  const [token, setToken] = useState("");
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, [token]);
  return (
    <Router>
      <Routes>
        {/* Ruta para la página principal */}
        <Route path="/" element={<Main token={token} />} />

        {/* Ruta para el login */}
        <Route path="/login" element={<LoginForm token={token} />} />

        {/* Ruta para los favoritos */}
        <Route path="/register" element={<RegisterForm token={token} />} />

        <Route path="/listado" element={<Listado token={token} />} />
        {/* Ruta por defecto para cuando no hay coincidencia */}
        <Route path="*" element={<div>404 - Página no encontrada</div>} />
      </Routes>
    </Router>
  );
}

export default App;

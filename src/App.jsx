import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";
import { Main } from "./components/Main";
import { Listado } from "./components/Listado";
import { useEffect, useState } from "react";
import { Detalle } from "./components/Detalle";

export default function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
  };
  const login = (tok) => {
    localStorage.setItem("token", tok);
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main token={token} />} />
        <Route
          path="/login"
          element={<LoginForm token={token} login={login} />}
        />
        <Route
          path="/register"
          element={<RegisterForm token={token} login={login} />}
        />
        <Route
          path="/listado"
          element={<Listado token={token} logout={logout} />}
        />
        <Route
          path="/detalle"
          element={<Detalle token={token} logout={logout} />}
        />
        <Route path="*" element={<div>404 - Página no encontrada</div>} />
      </Routes>
    </Router>
  );
}

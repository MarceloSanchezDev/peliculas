import "./App.css";
import appPeloculasDetails from "./assets/appPeliculasDetails.png";
import appPeloculasList from "./assets/appPeliculasList.png";
import appPeloculasRes from "./assets/appPeliculasRes.png";
import Nav from "./components/Nav.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginForm } from "./components/LoginForm.jsx";
import { RegisterForm } from "./components/RegisterForm.jsx";
import { Main } from "./components/Main.jsx";
import { Listado } from "./components/Listado.jsx";
import { useEffect, useState } from "react";
import Detalle from "./components/Detalle";
import Resultado from "./components/Resultado.jsx";

export default function App() {
  const [token, setToken] = useState("");
  const imgs = [appPeloculasDetails, appPeloculasList, appPeloculasRes];
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
      {token && <Nav logout={logout}></Nav>}
      <Routes>
        <Route path="/" element={<Main token={token} img={imgs} />} />
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
        <Route
          path="/resultado"
          element={<Resultado token={token} logout={logout} />}
        />
        <Route path="*" element={<div>404 - Página no encontrada</div>} />
      </Routes>
    </Router>
  );
}

import { useState, useEffect } from "react";
import Buscador from "./Buscador.jsx";
import axios from "axios";
import swal from "sweetalert2";
import { Link, useNavigate } from "react-router";

export const Listado = ({ token, logout }) => {
  const [listado, setListado] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/movies");
        setListado(res.data);
      } catch (error) {
        console.error("Error al obtener películas:", error);
        swal.fire({
          title: "Error, intenta más tarde!",
          text: "Error de conexión",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Buscador></Buscador>
      <h1>Lista de Películas</h1>
      <button onClick={logout}>Cerrar Sesion</button>
      <ul>
        {listado.map((pelicula) => (
          <li key={pelicula.id}>
            <h1>{pelicula.title}</h1>
            <img
              src={
                pelicula.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${pelicula.poster_path}`
                  : "https://via.placeholder.com/500x750?text=No+Image"
              }
              alt={pelicula.title || "Movie poster"}
            />
            <p className="card-text">
              {pelicula.overview.substring(0, 100) + "..."}
            </p>
            <Link
              to={`/detalle?movieID=${pelicula.id}`}
              className="btn btn-primary"
            >
              View Detail
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

import { useState, useEffect } from "react";
import Buscador from "./Buscador.jsx";
import axios from "axios";
import swal from "sweetalert2";
import { Link, useNavigate } from "react-router";

export const Listado = ({ token, logout }) => {
  const [listado, setListado] = useState([
    /*
    {
      id: 1234,
      title: "Pelicula de prueba",
      poster_path:
        "https://image.tmdb.org/t/p/w500//tqiHuhjw1WSj9Qr0InJ21AgMrKu.jpg",
      overview: "overview movie",
    },
    {
      id: 1234,
      title: "Pelicula de prueba",
      poster_path:
        "https://image.tmdb.org/t/p/w500//tqiHuhjw1WSj9Qr0InJ21AgMrKu.jpg",
      overview: "overview movie",
    },
    {
      id: 1234,
      title: "Pelicula de prueba",
      poster_path:
        "https://image.tmdb.org/t/p/w500//tqiHuhjw1WSj9Qr0InJ21AgMrKu.jpg",
      overview: "overview movie",
    },
    {
      id: 1234,
      title: "Pelicula de prueba",
      poster_path:
        "https://image.tmdb.org/t/p/w500//tqiHuhjw1WSj9Qr0InJ21AgMrKu.jpg",
      overview: "overview movie",
    },
    {
      id: 1234,
      title: "Pelicula de prueba",
      poster_path:
        "https://image.tmdb.org/t/p/w500//tqiHuhjw1WSj9Qr0InJ21AgMrKu.jpg",
      overview: "overview movie",
    },
    {
      id: 1234,
      title: "Pelicula de prueba",
      poster_path:
        "https://image.tmdb.org/t/p/w500//tqiHuhjw1WSj9Qr0InJ21AgMrKu.jpg",
      overview: "overview movie",
    },
    {
      id: 1234,
      title: "Pelicula de prueba",
      poster_path:
        "https://image.tmdb.org/t/p/w500//tqiHuhjw1WSj9Qr0InJ21AgMrKu.jpg",
      overview: "overview movie",
    },*/
  ]);
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
    <div className="d-flex flex-column justify-content-center align-items-center">
      <nav className="navbar navbar-expand-lg navbar-light bg-light w-100">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            App Movie
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarContent">
            <div className="d-flex flex-grow-1 justify-content-between align-items-center mt-2 mt-lg-0">
              <div className="d-flex ms-auto align-items-center gap-2">
                <Buscador />
                <button
                  className="btn btn-outline-danger text-nowrap"
                  onClick={logout}
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <h1>Lista de Películas</h1>
      <ul className="list-unstyled d-flex flex-wrap justify-content-center align-items-center gap-4 mt-4">
        {listado.map((pelicula) => (
          <li
            className="card shadow bg-dark text-white"
            style={{ width: "18rem", height: "40em" }}
            key={pelicula.id}
          >
            <img
              className="card-img-top"
              style={{ height: "30rem" }}
              src={
                pelicula.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${pelicula.poster_path}`
                  : "https://via.placeholder.com/500x750?text=No+Image"
              }
              alt={pelicula.title || "Movie poster"}
            />
            <div className="card-body">
              <h5 className="card-title">
                {pelicula.title.substring(0, 15) + "..."}
              </h5>
              <p className="card-text">
                {pelicula.overview.substring(0, 100) + "..."}
              </p>
              <Link
                to={`/detalle?movieID=${pelicula.id}`}
                className="btn btn-outline-light"
              >
                View Detail
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

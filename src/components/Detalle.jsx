import axios from "axios";
import swal from "sweetalert2";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Buscador from "./Buscador";

export default function Detalle({ token, logout }) {
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  let query = new URLSearchParams(window.location.search);

  let movieID = query.get("movieID");
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const res = await axios.get(`/api/movie?movieID=${movieID}`);
        setMovie(res.data);
      } catch (error) {
        console.error("Error al obtener los datos de la API:", error);
        swal.fire({
          title: "Error",
          text: "No se pudo cargar la película",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    };

    if (movieID) {
      fetchMovieDetail();
    }
  }, [movieID]);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <nav className="navbar navbar-expand-lg navbar-light bg-light w-100">
        <div className="container-fluid">
          <Link className="navbar-brand" href="#">
            App Movie
          </Link>
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
      <h1>Informacion de la Pelicula</h1>
      {movie ? (
        <div className="container mt-4">
          <div className="d-flex">
            <div className="me-4">
              <img
                className="shadow rounded"
                style={{ width: "24rem" }}
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                    : "https://via.placeholder.com/500x750?text=No+Image"
                }
                alt={movie.title}
              />
            </div>
            <div className="d-flex flex-column justify-content-start">
              <h2 className="display-5 fw-bold text-dark text-center">
                <em>Titulo: </em>
                {movie.title}
              </h2>
              <h3 className="h4 text-secondary">
                <em>Tag: </em>
                {movie.tagline}
              </h3>
              <p className="text-muted">
                <em>Release: </em> {movie.release_date}
              </p>
              <p className="text-success fw-bold">
                <em>Average: </em> {movie.vote_average}
              </p>
              <p className="text-dark">
                <em>overview: </em>
                {movie.overview}
              </p>
              <h4>
                <em>Generos: </em>
              </h4>
              <ul className="list-group" style={{ maxWidth: "10rem" }}>
                {movie.genres.map((g) => (
                  <li
                    key={g.id}
                    className="text-center list-group-item list-group-item-action list-group-item-primary"
                  >
                    <em>{g.name}</em>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}

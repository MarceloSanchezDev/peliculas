import axios from "axios";
import swal from "sweetalert2";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Buscador from "./Buscador";

export default function Detalle({ token }) {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
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
        console.log(res.data);
      } catch (error) {
        console.error("Error al obtener los datos de la API:", error);
        setError("Error al cargar la película");
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
  if (error) return <p>{error}</p>;
  if (!movie) return <p>Cargando...</p>;
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h1 className="pt-3">Informacion de la Pelicula</h1>
      {movie ? (
        <div className="container mt-4">
          <div className="row">
            <div className="col-12 col-md-4 mb-3">
              <img
                className="img-fluid shadow rounded w-100"
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                    : "https://via.placeholder.com/500x750?text=No+Image"
                }
                alt={movie.title}
              />
            </div>
            <div className="col-12 col-md-8">
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
              <ul className="list-group w-auto mx-auto mb-4">
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

import axios from "axios";
import swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  }, [movieID]); // ✅ Solo depende de movieID

  return (
    <div>
      <h1>Detalle</h1>
      <button onClick={logout}>Cerrar Sesión</button>
      {movie ? (
        <div>
          <h2>{movie.title}</h2>
          <h3>{movie.tagline}</h3>
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : "https://via.placeholder.com/500x750?text=No+Image"
            }
            alt={movie.title}
          />
          <p>Release: {movie.release_date}</p>
          <p>Average: {movie.vote_average}</p>
          <p>{movie.overview}</p>
          <ul>
            {movie.genres.map((g) => (
              <li key={g.id}>{g.name}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}

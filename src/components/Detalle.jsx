import axios from "axios";
import swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Detalle({ token, logout }) {
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const { movieID } = useParams(); // 🔹 Obtiene el ID desde la URL

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
      console.log(movieID);
      console.log(movie);
    }
  }, [movieID, movie]);

  return (
    <div>
      <h1>Detalle</h1>
      <button onClick={logout}>Cerrar Sesion</button>
      {movie ? (
        <div>
          <h2>{movie.title}</h2>
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : "https://via.placeholder.com/500x750?text=No+Image"
            }
            alt={movie.title}
          />
          <p>{movie.overview}</p>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}

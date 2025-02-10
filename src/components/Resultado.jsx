import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert2";

export default function Resultado({ token }) {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const query = new URLSearchParams(window.location.search);
  const keyword = query.get("keyword");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(`/api/result?keyword=${keyword}`);
        setMovies(res.data.results || []); // ✅ Si `results` no existe, usa un array vacío
      } catch (error) {
        console.error("Error al obtener los datos de la API:", error);
        swal.fire({
          title: "Error",
          text: "No se pudo cargar la búsqueda",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    };

    if (keyword) {
      fetchMovies();
    }
  }, [keyword]);

  return (
    <div>
      <h1>Resultados de búsqueda</h1>
      {movies.length === 0 ? (
        <p>No se encontraron resultados</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {movies.map((movie) => (
            <li key={movie.id} style={{ marginBottom: "20px" }}>
              <h2>{movie.title}</h2>
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                    : "https://via.placeholder.com/500x750?text=No+Image"
                }
                alt={movie.title}
                style={{ width: "200px", borderRadius: "10px" }}
              />
              <p>{movie.overview || "Sin descripción disponible."}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

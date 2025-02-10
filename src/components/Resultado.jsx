import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // 🔹 Falta importar axios
import swal from "sweetalert2"; // 🔹 Falta importar swal

export default function Resultado({ token }) {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const query = new URLSearchParams(window.location.search);
  const keyword = query.get("keyword"); // ✅ Ahora está bien declarada

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(`/api/result?keyword=${keyword}`);
        setMovies(res.data.results); // ✅ TMDb devuelve un array en `results`
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
  }, [keyword]); // ✅ Ahora depende de `keyword`

  return (
    <div>
      <h1>Resultados de búsqueda</h1>
      {movies.length === 0 ? (
        <p>No se encontraron resultados</p>
      ) : (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

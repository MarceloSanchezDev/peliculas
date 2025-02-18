import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert2";

export default function Resultado({ token }) {
  const [movies, setMovies] = useState([
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
    }, */
  ]);
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
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h1>Resultados de búsqueda</h1>

      {movies.length === 0 ? (
        <p>No se encontraron resultados</p>
      ) : (
        <ul
          className="list-unstyled d-flex flex-wrap justify-content-center align-items-center gap-4 mt-4"
          style={{ listStyle: "none", padding: 0 }}
        >
          {movies.map((pelicula) => (
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
      )}
    </div>
  );
}

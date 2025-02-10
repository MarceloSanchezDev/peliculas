import { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert2";

export const Listado = () => {
  const [listado, setListado] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/movies");
        setListado(res.data); // ✅ Actualiza el estado correctamente
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
  console.log(listado);

  return (
    <div>
      <h1>Lista de Películas</h1>
      <ul>
        {listado.map((pelicula) => (
          <li key={pelicula.id}>{pelicula.title}</li>
        ))}
      </ul>
    </div>
  );
};

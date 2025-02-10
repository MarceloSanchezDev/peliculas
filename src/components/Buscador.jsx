import { useState } from "react";
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Buscador() {
  const navigate = useNavigate();
  const [buscado, setBuscado] = useState("");

  const handlerSearch = (e) => {
    e.preventDefault();
    const keyword = buscado.trim(); // 🔹 Elimina espacios en blanco extra

    if (keyword.length < 4) {
      swal.fire({
        title: "Error!",
        text: "Debes escribir al menos 4 caracteres",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return; // 🔹 Evita que continúe la ejecución si no cumple la condición
    }

    setBuscado(""); // 🔹 Limpia el input después de enviar
    navigate(`/resultado?keyword=${keyword}`);
  };

  return (
    <form onSubmit={handlerSearch}>
      <input
        type="text"
        value={buscado} // 🔹 Controla el estado del input
        onChange={(e) => setBuscado(e.target.value)}
        placeholder="Escribe una palabra clave..."
      />
      <button type="submit">Buscar</button>
    </form>
  );
}

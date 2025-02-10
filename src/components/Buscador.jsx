import { useState } from "react";
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
export default function Buscador() {
  const navigate = useNavigate();
  const [buscado, setBuscado] = useState("");
  const handlerSearch = (e) => {
    e.preventDefault();
    console.log("buscandooo...", buscado);
    if (buscado.length < 4) {
      swal.fire({
        title: "Error!",
        text: "Debes escribir una palabra clave",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } else {
      e.currentTarget.keyword.value = "";
      navigate(`/resultados?keyword=${buscado}`);
    }
  };
  return (
    <form onSubmit={handlerSearch}>
      <input
        type="text"
        onChange={(e) => setBuscado(e.target.value)}
        placeholder="Escribe una palabra clave...."
      />
      <button type="submit">Buscar</button>
    </form>
  );
}

import { useState } from "react";
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Buscador() {
  const navigate = useNavigate();
  const [buscado, setBuscado] = useState("");

  const handlerSearch = (e) => {
    e.preventDefault();
    const keyword = buscado.trim();

    if (keyword.length < 4) {
      swal.fire({
        title: "Error!",
        text: "Debes escribir al menos 4 caracteres",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    navigate(`/resultado?keyword=${keyword}`);
    setBuscado("");
  };

  return (
    <form className="d-flex " onSubmit={handlerSearch}>
      <input
        className="form-control me-2"
        type="text"
        value={buscado}
        onChange={(e) => setBuscado(e.target.value)}
        placeholder="Buscar película..."
        aria-label="Buscar"
      />
      <button className="btn btn-outline-success" type="submit">
        Buscar
      </button>
    </form>
  );
}

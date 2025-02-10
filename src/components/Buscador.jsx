import { useState } from "react";

export default function Buscador() {
  const [buscado, setBuscado] = useState("");
  const handlerSearch = (e) => {
    e.preventDefault();
    console.log("buscandooo...", buscado);
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

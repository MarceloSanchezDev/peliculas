import { useState } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const handlerSubmit = async (e) => {
    e.preventDefault();

    console.log(email, user);

    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, user }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json(); // Convertir la respuesta a JSON
      console.log("Respuesta del servidor:", data);
    } catch (error) {
      console.error("Error en la petición:", error);
    }
  };
  return (
    <>
      <h1>Hola, Bienvenidos A Peliculas App Web!</h1>
      <form onSubmit={handlerSubmit}>
        <input type="text" onChange={(e) => setEmail(e.target.value)} />
        <input type="text" onChange={(e) => setUser(e.target.value)} />
        <input type="submit" />
      </form>
    </>
  );
}

export default App;

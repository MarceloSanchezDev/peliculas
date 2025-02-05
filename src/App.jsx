import { useState } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const handlerSubmitRegister = async (e) => {
    e.preventDefault();

    console.log("FrontEnd Register", email, user);

    try {
      const response = await fetch("/api/auth/register", {
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
      if (response.ok) {
        console.log("Respuesta del servidor:", data);
        alert(
          `nombre : ${data.email}, apellido : ${data.user} , mensaje : ${data.mensaje}`
        );
      }
    } catch (error) {
      console.error("Error en la petición:", error);
    }
  };
  const handlerSubmitLogin = async (e) => {
    e.preventDefault();

    console.log("FrontEnd Login", email, user);

    try {
      const response = await fetch("/api/auth/login", {
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
      if (response.ok) {
        console.log("Respuesta del servidor:", data);
        alert(
          `nombre : ${data.email}, apellido : ${data.user} , mensaje : ${data.mensaje}`
        );
      }
    } catch (error) {
      console.error("Error en la petición:", error);
    }
  };
  return (
    <>
      <h1>Hola, Bienvenidos A Peliculas App Web!</h1>
      <form onSubmit={handlerSubmitLogin}>
        <label htmlFor="nombreRegister">Nombre:</label>
        <input
          type="text"
          name="nombreRegister"
          id="nombreRegister"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="apellidoRegister">Apellido:</label>
        <input
          type="text"
          id="apellidoRegister"
          name="apellidoRegister"
          onChange={(e) => setUser(e.target.value)}
        />
        <input type="submit" />
      </form>
      <form onSubmit={handlerSubmitRegister}>
        <label htmlFor="nombreLogin">Nombre:</label>
        <input
          type="text"
          name="nombreLogin"
          id="nombreLogin"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="apellidoLogin">Apellido:</label>
        <input
          type="text"
          id="apellidoLogin"
          name="apellidoLogin"
          onChange={(e) => setUser(e.target.value)}
        />
        <input type="submit" />
      </form>
    </>
  );
}

export default App;

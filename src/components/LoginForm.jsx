import { useState } from "react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
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
    <form onSubmit={handlerSubmitLogin}>
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
  );
}

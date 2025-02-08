import { useState } from "react";

export function RegisterForm() {
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
  return (
    <form onSubmit={handlerSubmitRegister}>
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
  );
}

import { useState } from "react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handlerSubmitLogin = async (e) => {
    e.preventDefault();

    console.log("FrontEnd Login", email, password);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json(); // Convertir la respuesta a JSON
      if (response.ok) {
        console.log("Respuesta del servidor:", data);
        alert(
          `email : ${data.email}, password : ${data.password} , mensaje : ${data.mensaje}`
        );
      }
    } catch (error) {
      console.error("Error en la petición:", error);
    }
  };
  return (
    <form onSubmit={handlerSubmitLogin}>
      <label htmlFor="emailLogin">E-mail:</label>
      <input
        type="email"
        name="emailLogin"
        id="emailLogin"
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="passwordLogin">Password:</label>
      <input
        type="password"
        id="passwordLogin"
        name="passwordLogin"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input type="submit" />
    </form>
  );
}

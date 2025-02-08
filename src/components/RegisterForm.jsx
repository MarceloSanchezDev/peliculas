import { useState } from "react";
import swal from "sweetalert2";
export function RegisterForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handlerSubmitRegister = async (e) => {
    e.preventDefault();

    console.log("FrontEnd Register", email, username, password);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json(); // Convertir la respuesta a JSON
      if (response.ok) {
        console.log("Respuesta del servidor:", data);
        swal.fire({
          title: "Succes!",
          text: "Perfecto, estas dentro",
          icon: "success",
          confirmButtonText: "Ok",
        });
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      swal.fire({
        title: "Error al Registrarse",
        text: `${e.response.data.error}`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };
  return (
    <form onSubmit={handlerSubmitRegister}>
      <label htmlFor="emailRegister">Email : </label>
      <input
        type="email"
        name="emailRegister"
        id="emailRegister"
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="usernameRegister">Username : </label>
      <input
        type="text"
        id="usernameRegister"
        name="usernameRegister"
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="passwordRegister">Password: </label>
      <input
        type="password"
        id="passwordRegister"
        name="passwordRegister"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input type="submit" />
    </form>
  );
}

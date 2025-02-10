import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import swal from "sweetalert2";
export function RegisterForm({ token }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (token && token.trim() !== "") {
      navigate("/Listado");
    }
  }, [token, navigate]);
  console.log(import.meta.env.VITE_API_KEY);
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

      const data = await response.json();

      if (!response.ok) {
        swal.fire({
          title: "Error al Registrarse!",
          text: data.error || "Ocurrió un error inesperado.",
          icon: "error",
          confirmButtonText: "Ok",
        });
        return; // Detiene la ejecución aquí
      }
      console.log("✅ Respuesta del servidor:", data);
      swal.fire({
        title: "¡Éxito!",
        text: `Bienvenido ${data.email}!`,
        icon: "success",
        confirmButtonText: "Ok",
      });
      localStorage.setItem("token", data.token);
    } catch (error) {
      console.error("❌ Error en la solicitud:", error);
      swal.fire({
        title: "Error al Iniciar Sesión",
        text: "No se pudo conectar con el servidor. Intenta de nuevo.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };
  return (
    <>
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
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Volver
      </button>
    </>
  );
}

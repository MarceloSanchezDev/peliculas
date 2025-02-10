import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import swal from "sweetalert2";
export function LoginForm({ token, login }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (token && token.trim() !== "") {
      navigate("/Listado");
    }
  }, [token, navigate]);
  const handlerSubmitLogin = async (e) => {
    e.preventDefault();

    console.log("FrontEnd Login", email, password);

    try {
      const response = await fetch(
        "https://peliculas-murex.vercel.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json(); // Convertir la respuesta a JSON

      if (!response.ok) {
        swal.fire({
          title: "Error al Iniciar Sesión",
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

      login(data.token);
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

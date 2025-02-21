import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import swal from "sweetalert2";
export function RegisterForm({ token, login }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (token && token.trim() !== "") {
      navigate("/Listado");
    }
  }, [token, navigate]);
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
        text: `Bienvenido ${data.username}!`,
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
    <div className="text-dark vh-100 d-flex flex-column justify-content-center align-items-center ">
      <form
        className="bg-light p-4 rounded needs-validation shadow"
        onSubmit={handlerSubmitRegister}
      >
        <h2 className="mb-4 text-center">Registro 🍿🎬</h2>
        <div className="mb-3">
          <label className="form-label" htmlFor="emailRegister">
            Email :
          </label>
          <input
            className="form-control"
            type="email"
            name="emailRegister"
            id="emailRegister"
            placeholder="@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="usernameRegister">
            Username :
          </label>
          <input
            className="form-control"
            type="text"
            id="usernameRegister"
            name="usernameRegister"
            placeholder="user1234"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="passwordRegister">
            Password:{" "}
          </label>
          <input
            className="form-control"
            type="password"
            id="passwordRegister"
            name="passwordRegister"
            placeholder="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-success">
            Registrarse 🍿
          </button>
        </div>
      </form>
      <div className="mt-3 text-center">
        <button
          className="btn btn-outline-light"
          onClick={() => {
            navigate("/");
          }}
        >
          Volver🎬
        </button>
      </div>
    </div>
  );
}

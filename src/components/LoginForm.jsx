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
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        swal.fire({
          title: "Error al Iniciar Sesión",
          text: data.error || "Ocurrió un error inesperado.",
          icon: "error",
          confirmButtonText: "Ok",
        });
        return;
      }

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
    <div className="container mt-5">
      <form
        className="bg-light p-4 rounded needs-validation"
        onSubmit={handlerSubmitLogin}
        noValidate
      >
        <h2 className="mb-4 text-center">Iniciar Sesión</h2>

        <div className="mb-3">
          <label htmlFor="emailLogin" className="form-label">
            E-mail:
          </label>
          <input
            type="email"
            className="form-control"
            id="emailLogin"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="passwordLogin" className="form-label">
            Contraseña:
          </label>
          <input
            type="password"
            className="form-control"
            id="passwordLogin"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-success">
            Ingresar
          </button>
        </div>
      </form>

      <div className="mt-3 text-center">
        <button className="btn btn-outline-dark" onClick={() => navigate("/")}>
          Volver
        </button>
      </div>
    </div>
  );
}

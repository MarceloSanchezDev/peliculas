import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export function Main({ token, img }) {
  const navigate = useNavigate();
  const [imgActual, setImgActual] = useState(img[0]);
  const [aparecer, setAparecer] = useState(true);
  const change = () => {
    setAparecer(false);

    setTimeout(() => {
      setImgActual((prev) => {
        const index = img.indexOf(prev);
        const nextIndex = (index + 1) % img.length;
        return img[nextIndex];
      });

      setAparecer(true);
    }, 300);
  };
  useEffect(() => {
    if (token && token.trim() !== "") {
      navigate("/listado");
    }
  }, [token, navigate]);
  return (
    <div className="main-container vh-100 d-flex m-3">
      <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center text-center">
        <h1 className="mb-4">Hello, Welcome to App Movie 🍿🎬</h1>
        <p className="lead mb-4">
          Esta aplicación te permite buscar y guardar tus películas favoritas.
          ¡Inicia sesión o regístrate para comenzar!
        </p>
        <div>
          <button
            className="btn btn-primary m-2 shadow"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="btn btn-secondary m-2 shadow"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </div>
      <div
        id="idImagen"
        className="col-12 col-md-6 d-flex justify-content-center align-items-center"
      >
        <img
          onClick={change}
          src={imgActual}
          alt="App Movie"
          className={`imgComponent img-fluid border rounded shadow ${
            aparecer ? "aparecer" : ""
          }`}
        />
      </div>
    </div>
  );
}

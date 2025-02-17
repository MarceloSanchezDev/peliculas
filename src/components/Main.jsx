import { useEffect } from "react";
import { useNavigate } from "react-router";
export function Main({ token }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (token && token.trim() !== "") {
      navigate("/listado");
    }
  }, [token, navigate]);
  return (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center text-center ">
      <h1 className="mb-4 ">Hello, Welcome to App Movie</h1>
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
  );
}

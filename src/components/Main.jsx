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
    <>
      <h1 className="p-3 text-danger-emphasis bg-primary-subtle border border-primary-subtle rounded-3">
        Hello, Welcome to App Movie
      </h1>
      <button onClick={() => navigate("/login")}>Login</button>
      <button onClick={() => navigate("/register")}>Register</button>
    </>
  );
}

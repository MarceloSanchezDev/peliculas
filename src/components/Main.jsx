import { useNavigate } from "react-router";
export function Main() {
  const navigate = useNavigate();
  return (
    <>
      <h1>Hello, Welcome to App Movie</h1>
      <button onClick={() => navigate("/login")}>Login</button>
      <button onClick={() => navigate("/register")}>Register</button>
    </>
  );
}

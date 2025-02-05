import { useState } from "react";
import "./App.css";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";

function App() {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const handlerSubmitRegister = async (e) => {
    e.preventDefault();

    console.log("FrontEnd Register", email, user);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, user }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json(); // Convertir la respuesta a JSON
      if (response.ok) {
        console.log("Respuesta del servidor:", data);
        alert(
          `nombre : ${data.email}, apellido : ${data.user} , mensaje : ${data.mensaje}`
        );
      }
    } catch (error) {
      console.error("Error en la petición:", error);
    }
  };
  const handlerSubmitLogin = async (e) => {
    e.preventDefault();

    console.log("FrontEnd Login", email, user);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, user }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json(); // Convertir la respuesta a JSON
      if (response.ok) {
        console.log("Respuesta del servidor:", data);
        alert(
          `nombre : ${data.email}, apellido : ${data.user} , mensaje : ${data.mensaje}`
        );
      }
    } catch (error) {
      console.error("Error en la petición:", error);
    }
  };
  return (
    <>
      <h1>Hola, Bienvenidos A Peliculas App Web!</h1>
      <LoginForm
        funct={handlerSubmitLogin}
        setEmail={setEmail}
        setUser={setUser}
      />
      <RegisterForm
        funct={handlerSubmitRegister}
        setEmail={setEmail}
        setUser={setUser}
      />
    </>
  );
}

export default App;

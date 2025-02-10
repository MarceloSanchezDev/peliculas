import axios from "axios";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // ⚡ Permite solicitudes desde tu localhost
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  try {
    const apiKey = process.env.API_KEY; // 🔒 Ahora está oculta en el backend
    if (!apiKey) {
      return res.status(500).json({ error: "API_KEY no está definida" });
    }

    // Construir la URL segura
    const endPoint = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=es-ES&page=1`;
    const response = await axios.get(endPoint);

    res.status(200).json(response.data.results);
  } catch (error) {
    console.error("Error en la API:", error);
    res.status(500).json({ error: "Error al obtener películas" });
  }
}

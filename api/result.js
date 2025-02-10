import axios from "axios";

export default async function handler(req, res) {
  try {
    const apiKey = process.env.API_KEY; // 🔒 API Key segura desde variables de entorno
    const { keyword } = req.query; // 🔹 Obtiene la palabra clave desde la URL

    if (!apiKey) {
      return res.status(500).json({ error: "API_KEY no está definida" });
    }

    if (!keyword || keyword.trim().length < 4) {
      return res.status(400).json({ error: "Debes ingresar al menos 4 caracteres" });
    }

    // 🔹 Petición a TMDb
    const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=es-ES&query=${keyword}`;
    const response = await axios.get(endPoint);

    res.status(200).json(response.data.results); // 🔹 Devuelve solo los resultados de la API
  } catch (error) {
    console.error("Error en la API:", error.response?.data || error.message);
    res.status(500).json({ error: "Error al obtener películas" });
  }
}

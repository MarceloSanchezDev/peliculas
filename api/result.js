import axios from "axios";

export default async function handler(req, res) {
  try {
    const apiKey = process.env.API_KEY;
    const { keyword } = req.query;

    if (!apiKey) {
      return res.status(500).json({ error: "API_KEY no está definida en el backend" });
    }

    if (!keyword || keyword.trim().length < 4) {
      return res.status(400).json({ error: "Debes ingresar al menos 4 caracteres para buscar" });
    }

    const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=es-ES&query=${encodeURIComponent(
      keyword
    )}`;

    const response = await axios.get(endPoint);

    res.status(200).json(response.data); // ✅ Devuelve toda la respuesta de TMDb
  } catch (error) {
    console.error("Error en la API de películas:", error.response?.data || error.message);
    res.status(500).json({ error: "Error al obtener películas" });
  }
}


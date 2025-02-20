import axios from "axios";

export default async function handler(req, res) {
  try {
    const apiKey = process.env.API_KEY;
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

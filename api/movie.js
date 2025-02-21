import axios from "axios";


export default async function handler(req, res) {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "API_KEY no está definida" });
    }

    const { movieID } = req.query;
    if (!movieID) {
      return res.status(400).json({ error: "Se requiere el parámetro movieID" });
    }

    // Obtener detalles de la película
    const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}&language=es-ES`;
    const response = await axios.get(endPoint);

    // Obtener videos/trailers de la película
    const trailerUrl = `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=${apiKey}&language=es-ES`;
    const trailerResponse = await axios.get(trailerUrl);
    const videos = trailerResponse.data.results;

    // Buscar el trailer oficial
    const trailerOficial = videos.find(
      (video) => video.type === "Trailer" && video.official
    );

    // Generar el link del trailer
    const trailerLink = trailerOficial
      ? `https://www.youtube.com/watch?v=${trailerOficial.key}`
      : null;

    // Devolver los datos de la película junto con el trailer
    res.status(200).json({
      ...response.data,
      trailerLink,
    });
  } catch (error) {
    console.error("Error en la API:", error.response?.data || error.message);
    res.status(500).json({ error: "Error al obtener película" });
  }
}


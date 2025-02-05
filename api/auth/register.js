export default function handler(req, res) {
  if (req.method === "POST") {
    const { email, user } = req.body;
    console.log("Datos recibidos en el backend:", email, user);
    return res.status(200).json({ mensaje: "Register exitoso", email, user });
  } else {
    return res.status(405).json({ error: "Método no permitido" });
  }
}

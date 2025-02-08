import { UserModel } from '../models/turso/users.js';
import { validUser } from '../schema/userSchema.js';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { email, user } = req.body;
  console.log("Datos recibidos en el backend:", email, user);

  try {
    if (!SECRET_KEY) {
      throw new Error("SECRET_KEY no está definida en las variables de entorno.");
    }

    // Validar datos con el esquema
    const result = validUser(req.body);
    console.log('(Controlador) resultado :', result);

    // Autenticación en el modelo
    const userValid = await UserModel.login({ input: result.data });
    console.log('(Controlador)UserValid :', userValid);

    // Extraer datos del usuario
    const { email, id } = userValid;
    console.log('(Controlador)username:', email, 'id:', id);

    // Generar token JWT
    const token = jwt.sign({ id, email }, SECRET_KEY, {
      expiresIn: '2 days'
    });

    console.log('(Controlador)usuario:', userValid, '(Controlador)token:', token);

    // Enviar respuesta al frontend
    return res.json({ email, token, id });

  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).json({ errorServerless: `Error ${error.name}`, error : error });
  }
}


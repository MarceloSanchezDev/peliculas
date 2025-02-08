import validRegisterUser from '../schema/userSchema.js'
import UserModel from '../models/turso/users.js'
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;


export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, user } = req.body;
    console.log("Datos recibidos en el backend:", email, user);
      try {
        // envio al esquema el body de la request
        const result = validRegisterUser(req.body)
        // si sale exitosa se envia al modelo
        const userValid = await UserModel.registerUser({ input: result.data })
        // si el modelo crea con exito el usuario , extraigo el username , nombre, apellido y el id
        const { username, id } = userValid[0]
        // los imprimo en el token
        const token = jwt.sign({ id, username }, SECRET_KEY, {
          expiresIn: 60 * 60
        })
        // los envio al front
        res.send({ username, token })
      } catch (error) {
        res.send({ error })
      }
    } else {
    return res.status(405).json({ error: "Método no permitido" });
  }
}

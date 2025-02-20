import {validRegisterUser} from '../schema/userSchema.js'
import { UserModel } from '../models/turso/users.js'
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;


export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, user } = req.body;
    console.log("Datos recibidos en el backend:", email, user);
      try {
        const result = validRegisterUser(req.body)
        const userValid = await UserModel.registerUser({ input: result.data })
        const { username, id } = userValid[0]
        const token = jwt.sign({ id, username }, SECRET_KEY, {
          expiresIn: 60 * 60
        })
        res.send({ username, token })
      } catch (error) {
        res.send({ error })
      }
    } else {
    return res.status(405).json({ error: "Método no permitido" });
  }
}

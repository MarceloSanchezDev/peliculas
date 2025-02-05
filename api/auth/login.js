export default function handler(req, res) {
    if (req.method === "POST") {
      const { email, user } = req.body;
      console.log("Datos recibidos en el backend:", email, user);
      return res.status(200).json({ mensaje: "Login exitoso", email, user });
    } else {
      return res.status(405).json({ error: "Método no permitido" });
    }
  }
  
  /* 
  ('/login', async (req, res, next) =>{
    try {
      // envio al esquema el body de la request
      const result = validUser(req.body)
      info('(Controlador) resultado :', result)
      // si sale exitosa se envia al modelo
      const userValid = await UserModel.login({ input: result.data })
      info('(Controlador)UserValid :', userValid)
      // si el modelo crea con exito el usuario , extraigo el username y el id en Hexadecimal
      const { email, id } = userValid
      info('(Controlador)username:', email, 'id:', id)
      // los imprimo en el token
      const token = jwt.sign({ id, email }, SECRET_KEY, {
        expiresIn: '2 days'
      })
      info('(Controlador)usuario:', userValid, '(Controlador)token:', token)
      // los envio al front
      res.send({ email, token, id })
    } catch (error) {
      // si hay algun error los mando al middleware
      next(error)
    }
}
)
  */
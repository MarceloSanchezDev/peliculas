export default function handler(req, res) {
    if (req.method === 'POST') {
      // Procesar la solicitud POST
      const { email, password } = req.body;
      if (email === 'user@example.com' && password === 'password') {
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } else {
      // Método no permitido
      res.status(405).json({ message: 'Method not allowed' });
    }
  }
import express from 'express';
const app = express();
const port = 3000;

app.get('/api/auth/login', (req, res) => {
  res.json({ message: 'Login endpoint' });
});

app.get('/api/auth/register', (req, res) => {
  res.json({ message: 'Register endpoint' });
});

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
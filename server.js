// Servidor minimo que expone la logica real (authController.js) como API HTTP,
// para poder probarla con Postman/Newman (CP-01-01 exito, CP-01-02 error).
import express from 'express';
import { login } from './src/authController.js';

const app = express();
app.use(express.json());

app.post('/api/login', (req, res) => {
  const { status, body } = login(req.body || {});
  res.status(status).json(body);
});

const PORT = process.env.PORT || 3012;
app.listen(PORT, () => console.log(`swipre-login escuchando en http://localhost:${PORT}`));

// Servidor minimo que expone la logica real (authController.js) como API HTTP,
// para poder probarla con Postman/Newman (CP-01-01 exito, CP-01-02 error, CP-01-03 acceso por rol).
import express from 'express';
import { login } from './src/authController.js';
import { requireRole } from './src/authMiddleware.js';

const app = express();
app.use(express.json());

app.post('/api/login', (req, res) => {
  const { status, body } = login(req.body || {});
  res.status(status).json(body);
});

// CP-01-03: modulo "Gestion de Usuarios", restringido solo al rol Administrador.
// El rol se lee del header x-user-role (simula el rol resuelto desde el token de
// sesion), igual que hace backend/controllers/medicamentoController.js con remove().
const soloAdmin = requireRole(['admin']);
app.get('/api/usuarios', (req, res) => {
  const deniego = soloAdmin(req.headers['x-user-role']);
  if (deniego) return res.status(deniego.status).json(deniego.body);
  res.status(200).json({ modulo: 'Gestión de Usuarios', usuarios: [{ id: 1, username: 'admin.mopgimed', role: 'admin' }] });
});

const PORT = process.env.PORT || 3012;
app.listen(PORT, () => console.log(`swipre-login escuchando en http://localhost:${PORT}`));

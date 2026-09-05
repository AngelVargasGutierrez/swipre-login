// Version aislada del controlador real: backend/controllers/authController.js
// Misma logica, sin Express ni base de datos: recibe { username, password } y
// devuelve { status, body }, igual que el res.status(...).json(...) original.

import * as userModel from './userModel.js';

function login({ username, password }) {
  const user = userModel.findByCredentials(username, password);
  if (!user) {
    return { status: 401, body: { error: 'Credenciales incorrectas' } };
  }

  return {
    status: 200,
    body: {
      id: user.id,
      username: user.username,
      role: user.role,
      name: user.name,
      roleLabel: user.role_label,
      email: user.email,
      menu: userModel.ROLE_MENUS[user.role] || [],
    },
  };
}

export { login };

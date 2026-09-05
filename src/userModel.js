// Version aislada del modelo real: backend/models/userModel.js
// La consulta SQL original es:
//   SELECT * FROM users WHERE username = ? AND password = ? AND estado = "Activo"
// Aqui se reproduce el mismo comportamiento sobre un arreglo en memoria, para poder
// probar la logica de RF-001 sin necesitar MySQL levantado.

const USERS = [
  { id: 1, username: 'admin.mopgimed',  password: 'Admin#2026',   role: 'admin',     name: 'Ana Torres',    role_label: 'Administrador',       email: 'admin@mopgimed.com',  estado: 'Activo' },
  { id: 2, username: 'jefatura.farmacia', password: 'Jefe#2026',  role: 'jefatura',  name: 'Luis Ramos',    role_label: 'Jefatura de Farmacia', email: 'jefatura@mopgimed.com', estado: 'Activo' },
  { id: 3, username: 'caja.farmacia',    password: 'Caja#2026',   role: 'farmacia',  name: 'Rosa Diaz',     role_label: 'Caja Farmacia',        email: 'caja@mopgimed.com',   estado: 'Activo' },
  { id: 4, username: 'logistica.almacen', password: 'Logi#2026',  role: 'logistica', name: 'Marco Quispe',  role_label: 'Logistica',            email: 'logistica@mopgimed.com', estado: 'Activo' },
  { id: 5, username: 'usuario.deshabilitado', password: 'Baja#2026', role: 'farmacia', name: 'Carlos Mamani', role_label: 'Caja Farmacia',      email: 'baja@mopgimed.com',   estado: 'Inactivo' },
];

const ROLE_MENUS = {
  admin:     ['dashboard', 'medicamentos', 'inventario', 'reportes', 'analytics', 'usuarios'],
  almacen:   ['medicamentos', 'reportes'],
  farmacia:  ['medicamentos'],
  jefatura:  ['dashboard', 'medicamentos', 'inventario', 'reportes'],
  logistica: ['dashboard', 'medicamentos', 'inventario', 'reportes'],
};

// Replica exacta de la condicion SQL: username = ? AND password = ? AND estado = "Activo"
function findByCredentials(username, password) {
  return USERS.find(
    u => u.username === username && u.password === password && u.estado === 'Activo'
  ) || null;
}

export { findByCredentials, USERS, ROLE_MENUS };

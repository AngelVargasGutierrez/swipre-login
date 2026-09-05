// Middleware de autorizacion por rol para RF-001 / CP-01-03. Este control NO existe
// todavia en el backend real (backend/routes/users.js no tiene ningun chequeo de rol),
// asi que aqui se implementa tal como lo describe la ficha CP-01-03: si el rol del
// solicitante no esta en la lista permitida, se deniega con HTTP 403 a nivel de
// servidor (no solo ocultando el boton en la UI).

function requireRole(allowedRoles) {
  return function (role) {
    if (!allowedRoles.includes(role)) {
      return { status: 403, body: { error: 'No tienes permiso para acceder a este módulo.' } };
    }
    return null; // null = acceso permitido, continua el handler real
  };
}

export { requireRole };

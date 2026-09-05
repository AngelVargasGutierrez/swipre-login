import { describe, it, expect } from 'vitest';
import { login } from '../src/authController.js';
import { requireRole } from '../src/authMiddleware.js';

describe('Integración - RF-001: Login + Autorización por rol (authController + authMiddleware)', () => {
  it('el rol que devuelve el login es coherente con el filtro de autorización de CP-01-03', () => {
    const loginResult = login({ username: 'caja.farmacia', password: 'Caja#2026' });
    expect(loginResult.status).toBe(200);

    const soloAdmin = requireRole(['admin']);
    const acceso = soloAdmin(loginResult.body.role);
    expect(acceso.status).toBe(403); // Caja Farmacia no es admin: los dos modulos coinciden en el bloqueo
  });

  it('un Administrador que inicia sesión puede acceder al módulo restringido usando su propio rol', () => {
    const loginResult = login({ username: 'admin.mopgimed', password: 'Admin#2026' });
    const soloAdmin = requireRole(['admin']);
    expect(soloAdmin(loginResult.body.role)).toBeNull();
  });
});

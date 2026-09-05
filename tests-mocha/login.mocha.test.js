// Mismas pruebas de RF-001, reescritas con Mocha (test runner) + Chai (aserciones)
// como quinta herramienta de pruebas, independiente de Vitest.
import { expect } from 'chai';
import { login } from '../src/authController.js';
import { requireRole } from '../src/authMiddleware.js';

describe('CP-01-01 - Inicio de sesión exitoso por rol (Mocha + Chai)', () => {
  it('permite iniciar sesión al Administrador', () => {
    const result = login({ username: 'admin.mopgimed', password: 'Admin#2026' });
    expect(result.status).to.equal(200);
    expect(result.body.role).to.equal('admin');
  });
});

describe('CP-01-02 - Rechazo de acceso con credenciales inválidas (Mocha + Chai)', () => {
  it('rechaza el login con contraseña incorrecta', () => {
    const result = login({ username: 'admin.mopgimed', password: 'mala' });
    expect(result.status).to.equal(401);
    expect(result.body.error).to.equal('Credenciales incorrectas');
  });
});

describe('CP-01-03 - Validación de acceso controlado por rol tras autenticación (Mocha + Chai)', () => {
  const soloAdmin = requireRole(['admin']);

  it('permite el acceso con rol Administrador', () => {
    expect(soloAdmin('admin')).to.be.null;
  });

  it('deniega el acceso (HTTP 403) con rol Caja Farmacia', () => {
    const result = soloAdmin('farmacia');
    expect(result.status).to.equal(403);
  });
});

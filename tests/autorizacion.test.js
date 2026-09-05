import { describe, it, expect } from 'vitest';
import { requireRole } from '../src/authMiddleware.js';

describe('CP-01-03 - Validación de acceso controlado por rol tras autenticación (Prueba Unitaria)', () => {
  const soloAdmin = requireRole(['admin']);

  it('permite el acceso cuando el rol es Administrador', () => {
    expect(soloAdmin('admin')).toBeNull();
  });

  it('deniega el acceso con HTTP 403 cuando el rol es Caja Farmacia', () => {
    const resultado = soloAdmin('farmacia');
    expect(resultado.status).toBe(403);
    expect(resultado.body.error).toBe('No tienes permiso para acceder a este módulo.');
  });

  it('deniega el acceso con HTTP 403 cuando el rol es Jefatura', () => {
    const resultado = soloAdmin('jefatura');
    expect(resultado.status).toBe(403);
  });
});

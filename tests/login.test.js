import { describe, it, expect } from 'vitest';
import { login } from '../src/authController.js';

describe('CP-01-01 - Inicio de sesión exitoso por rol (Flujo Normal / Éxito)', () => {
  it('permite iniciar sesión al Administrador y le asigna el menú completo', () => {
    const result = login({ username: 'admin.mopgimed', password: 'Admin#2026' });
    expect(result.status).toBe(200);
    expect(result.body.role).toBe('admin');
    expect(result.body.menu).toContain('usuarios');
  });

  it('permite iniciar sesión a Jefatura de Farmacia y le asigna su menú', () => {
    const result = login({ username: 'jefatura.farmacia', password: 'Jefe#2026' });
    expect(result.status).toBe(200);
    expect(result.body.role).toBe('jefatura');
    expect(result.body.menu).toEqual(['dashboard', 'medicamentos', 'inventario', 'reportes']);
  });

  it('permite iniciar sesión a Caja Farmacia y le asigna su menú', () => {
    const result = login({ username: 'caja.farmacia', password: 'Caja#2026' });
    expect(result.status).toBe(200);
    expect(result.body.role).toBe('farmacia');
    expect(result.body.menu).toEqual(['medicamentos']);
  });

  it('permite iniciar sesión a Logística y le asigna su menú', () => {
    const result = login({ username: 'logistica.almacen', password: 'Logi#2026' });
    expect(result.status).toBe(200);
    expect(result.body.role).toBe('logistica');
    expect(result.body.menu).toContain('inventario');
  });
});

describe('CP-01-02 - Rechazo de acceso con credenciales inválidas (Flujo Normal / Error, Prueba Unitaria)', () => {
  it('rechaza el login cuando la contraseña es incorrecta', () => {
    const result = login({ username: 'admin.mopgimed', password: 'contraseña-mala' });
    expect(result.status).toBe(401);
    expect(result.body.error).toBe('Credenciales incorrectas');
  });

  it('rechaza el login cuando el usuario no existe', () => {
    const result = login({ username: 'usuario.que.no.existe', password: 'cualquiera' });
    expect(result.status).toBe(401);
    expect(result.body.error).toBe('Credenciales incorrectas');
  });

  it('rechaza el login cuando la cuenta está deshabilitada (estado Inactivo)', () => {
    const result = login({ username: 'usuario.deshabilitado', password: 'Baja#2026' });
    expect(result.status).toBe(401);
    expect(result.body.error).toBe('Credenciales incorrectas');
  });
});

describe('Hallazgo detectado al ejecutar CP-01-01 (Flujo Alterno 2: Usuario Inactivo)', () => {
  it('[HALLAZGO] la ficha espera un mensaje distinto para cuentas inactivas, pero el backend actual usa el mismo mensaje genérico que para credenciales inválidas', () => {
    const result = login({ username: 'usuario.deshabilitado', password: 'Baja#2026' });
    // Comportamiento REAL de backend/controllers/authController.js (WHERE estado="Activo"
    // en la consulta SQL hace que un usuario inactivo no "matchee" ninguna fila, y por
    // tanto cae en el mismo 401 genérico que una contraseña incorrecta).
    expect(result.body.error).toBe('Credenciales incorrectas');
    // La ficha CP-01-01 (Flujo Alterno 2) documenta como resultado esperado el mensaje:
    // "Su cuenta esta inactiva. Comuniquese con el Administrador del sistema."
    // Esa distinción NO está implementada todavía: recomendamos que userModel primero
    // busque por username, y si existe pero esta.Inactivo, retorne un error específico
    // antes de comparar la contraseña.
  });
});

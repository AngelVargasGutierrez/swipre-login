// Pruebas de API con Supertest: llama directamente al objeto Express (`app`),
// sin necesidad de levantar el servidor en un puerto real. Complementa a Postman
// (que sí prueba contra un servidor HTTP real) con una verificación rápida en el
// mismo proceso de pruebas.
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../server.js';

describe('CP-01-01 - Inicio de sesión exitoso por rol (Supertest)', () => {
  it('POST /api/login responde 200 con credenciales válidas de Administrador', async () => {
    const res = await request(app).post('/api/login').send({ username: 'admin.mopgimed', password: 'Admin#2026' });
    expect(res.status).toBe(200);
    expect(res.body.role).toBe('admin');
  });
});

describe('CP-01-02 - Rechazo de acceso con credenciales inválidas (Supertest)', () => {
  it('POST /api/login responde 401 con contraseña incorrecta', async () => {
    const res = await request(app).post('/api/login').send({ username: 'admin.mopgimed', password: 'mala' });
    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Credenciales incorrectas');
  });
});

describe('CP-01-03 - Validación de acceso controlado por rol tras autenticación (Supertest)', () => {
  it('GET /api/usuarios responde 200 con rol Administrador', async () => {
    const res = await request(app).get('/api/usuarios').set('x-user-role', 'admin');
    expect(res.status).toBe(200);
  });

  it('GET /api/usuarios responde 403 con rol Caja Farmacia (no autorizado)', async () => {
    const res = await request(app).get('/api/usuarios').set('x-user-role', 'farmacia');
    expect(res.status).toBe(403);
  });
});

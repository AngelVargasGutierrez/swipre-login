import { describe, it, expect } from 'vitest';
import { login } from '../src/authController.js';

describe('No Funcional (RNF-002 Rendimiento) - RF-001: Tiempo de respuesta del login', () => {
  it('100 intentos de login secuenciales se resuelven en menos de 3 segundos en total', () => {
    const inicio = Date.now();
    for (let i = 0; i < 100; i++) {
      login({ username: 'admin.mopgimed', password: 'Admin#2026' });
    }
    const duracionMs = Date.now() - inicio;
    expect(duracionMs).toBeLessThan(3000);
  });
});

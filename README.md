# swipre-login

Proyecto aislado para probar **RF-001 (Iniciar sesión)** del sistema MOPGIMED/SIPGIMED, sin depender de la base de datos ni del backend completo.

Reproduce la lógica real de `backend/controllers/authController.js` y `backend/models/userModel.js` del proyecto principal, sobre datos en memoria.

## Casos de prueba cubiertos

- **CP-01-01** (éxito): inicio de sesión exitoso para los 4 roles (Admin, Jefatura, Caja Farmacia, Logística).
- **CP-01-02** (error): rechazo por contraseña incorrecta, usuario inexistente y cuenta deshabilitada.
- **Hallazgo**: la ficha CP-01-01 documenta un mensaje distinto para cuentas inactivas ("Su cuenta está inactiva...") que el backend actual no implementa (retorna el mismo mensaje genérico que credenciales inválidas).

## Cómo ejecutar

```bash
npm install
npm test
```

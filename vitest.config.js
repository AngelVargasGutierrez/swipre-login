import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Excluye las pruebas de Mocha+Chai (tests-mocha/) para que Vitest no intente
    // ejecutarlas como si fueran suyas.
    exclude: ['**/node_modules/**', 'tests-mocha/**'],
  },
});

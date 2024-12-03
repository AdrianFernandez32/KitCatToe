import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",

  // Asegura que Jest use `ts-jest` para transformar archivos TypeScript
  transform: {
    "^.+\\.ts?$": "ts-jest", // Usa ts-jest para transformar archivos .ts y .tsx
  },

  // Define las extensiones de archivos que Jest deberá procesar
  moduleFileExtensions: ["ts", "js", "json", "node"],

  // Indica que el entorno de pruebas es Node.js
  testEnvironment: "node",

  // Opcional: Define los archivos que Jest debe reconocer como pruebas
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],
};

export default config;

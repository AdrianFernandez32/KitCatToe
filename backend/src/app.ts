import express, { Request, Response } from "express";

const app = express();
const port = 3000;

// Middleware para parsear solicitudes JSON
app.use(express.json());

// Ruta de ejemplo
app.get("/", (req: Request, res: Response) => {
  res.send("¡Hola Mundo desde Express con TypeScript!");
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

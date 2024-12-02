import express from "express";
import bodyParser from "body-parser";
import dotenv from "./config/dotenv";
import db from "./config/db";
import routes from "./routes";

dotenv(); // Cargar variables de entorno

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Rutas
app.use("/api", routes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
  db.connect(); // Probar conexión a la base de datos
});

export default app;

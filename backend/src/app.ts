import express from "express";
import bodyParser from "body-parser";
import dotenv from "./config/dotenv";
import db from "./config/db";
import routes from "./routes";

dotenv();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
  db.connect();
});

export default app;

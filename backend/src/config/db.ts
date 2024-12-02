import sql from "mssql";

const dbConfig: sql.config = {
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  server: process.env.DB_SERVER as string,
  database: process.env.DB_DATABASE as string,
  options: {
    encrypt: process.env.DB_ENCRYPT === "true",
    trustServerCertificate: false,
  },
};

const connect = async () => {
  try {
    const pool = await sql.connect(dbConfig);
    console.log("Conexión a la base de datos exitosa");
    return pool;
  } catch (err) {
    console.error("Error al conectar a la base de datos:", err);
    throw err;
  }
};

export default { connect };

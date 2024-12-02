"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mssql_1 = __importDefault(require("mssql"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: process.env.DB_ENCRYPT === "true", // Esto debe ser 'true' o 'false'
        trustServerCertificate: false, // Ajustar según la configuración del servidor
    },
};
const connect = async () => {
    try {
        const pool = await mssql_1.default.connect(dbConfig);
        console.log("Conexión a la base de datos exitosa");
        return pool;
    }
    catch (err) {
        console.error("Error al conectar a la base de datos:", err);
        throw err;
    }
};
exports.default = { connect };

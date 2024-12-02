"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const mssql_1 = __importDefault(require("mssql")); // Importa 'sql' de 'mssql'
const db_1 = __importDefault(require("../config/db"));
const hash_utils_1 = require("../utils/hash.utils");
const createUser = async (data) => {
    const { nickname, email, password } = data;
    const { hash, salt } = await (0, hash_utils_1.hashPassword)(password);
    const pool = await db_1.default.connect();
    const result = await pool
        .request()
        .input("nickname", mssql_1.default.NVarChar, nickname)
        .input("email", mssql_1.default.NVarChar, email)
        .input("password", mssql_1.default.NVarChar, hash)
        .input("hash", mssql_1.default.NVarChar, hash)
        .input("salt", mssql_1.default.NVarChar, salt).query(`
      INSERT INTO Usuario (nickname, email, password, hash, salt)
      VALUES (@nickname, @email, @password, @hash, @salt)
    `);
    return result.recordset;
};
exports.createUser = createUser;
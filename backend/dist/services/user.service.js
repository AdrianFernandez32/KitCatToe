"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserProfile = exports.getUserByEmail = exports.createUser = void 0;
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
const getUserByEmail = async (email) => {
    const pool = await db_1.default.connect();
    const result = await pool.request().input("email", email).query(`
      SELECT id, nickname, email, password
      FROM Usuario
      WHERE email = @email
    `);
    return result.recordset[0]; // Devuelve el primer usuario encontrado
};
exports.getUserByEmail = getUserByEmail;
const updateUserProfile = async (userId, data) => {
    const { nickname, profilePictureUrl } = data;
    const pool = await db_1.default.connect();
    const result = await pool
        .request()
        .input("user_id", userId)
        .input("nickname", nickname || null) // Si no se envía, queda nulo
        .input("profile_picture_url", profilePictureUrl || null).query(`
      UPDATE Usuario
      SET 
        nickname = COALESCE(@nickname, nickname),
        profile_picture_url = COALESCE(@profile_picture_url, profile_picture_url)
      WHERE id = @user_id
    `);
    return result.rowsAffected[0]; // Devuelve el número de filas afectadas
};
exports.updateUserProfile = updateUserProfile;

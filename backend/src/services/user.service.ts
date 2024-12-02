import sql from "mssql"; // Importa 'sql' de 'mssql'
import db from "../config/db";
import { hashPassword } from "../utils/hash.utils";
import { UserInput } from "../types/user.types";

export const createUser = async (data: UserInput) => {
  const { nickname, email, password } = data;
  const { hash, salt } = await hashPassword(password);

  const pool = await db.connect();
  const result = await pool
    .request()
    .input("nickname", sql.NVarChar, nickname)
    .input("email", sql.NVarChar, email)
    .input("password", sql.NVarChar, hash)
    .input("hash", sql.NVarChar, hash)
    .input("salt", sql.NVarChar, salt).query(`
      INSERT INTO Usuario (nickname, email, password, hash, salt)
      VALUES (@nickname, @email, @password, @hash, @salt)
    `);

  return result.recordset;
};

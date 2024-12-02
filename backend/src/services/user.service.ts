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

export const getUserByEmail = async (email: string) => {
  const pool = await db.connect();
  const result = await pool.request().input("email", email).query(`
      SELECT id, nickname, email, password
      FROM Usuario
      WHERE email = @email
    `);

  return result.recordset[0]; // Devuelve el primer usuario encontrado
};

export const updateUserProfile = async (
  userId: number,
  data: { nickname?: string; profilePictureUrl?: string }
) => {
  const { nickname, profilePictureUrl } = data;

  const pool = await db.connect();
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

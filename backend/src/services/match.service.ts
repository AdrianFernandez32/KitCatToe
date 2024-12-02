import db from "../config/db";

export const registerWin = async (userId: number, win: boolean) => {
  const pool = await db.connect();
  const result = await pool.request().input("user_id", userId).input("win", win)
    .query(`
      INSERT INTO Partida (user_id, win)
      VALUES (@user_id, @win)
    `);

  return result.rowsAffected[0]; // Devuelve el número de filas afectadas
};

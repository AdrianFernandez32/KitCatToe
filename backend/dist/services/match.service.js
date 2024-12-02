"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerWin = void 0;
const db_1 = __importDefault(require("../config/db"));
const registerWin = async (userId, win) => {
    const pool = await db_1.default.connect();
    const result = await pool.request().input("user_id", userId).input("win", win)
        .query(`
      INSERT INTO Partida (user_id, win)
      VALUES (@user_id, @win)
    `);
    return result.rowsAffected[0]; // Devuelve el número de filas afectadas
};
exports.registerWin = registerWin;

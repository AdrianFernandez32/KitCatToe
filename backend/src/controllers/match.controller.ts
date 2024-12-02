import { Request, Response } from "express";
import { registerWin } from "../services/match.service";

export const registerWinController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { user_id, win } = req.body;

  if (user_id == null || win == null) {
    res.status(400).json({ error: "user_id and win are required" });
    return;
  }

  try {
    const rowsAffected = await registerWin(user_id, win);
    if (rowsAffected > 0) {
      res.status(201).json({ message: "Win registered successfully" });
    } else {
      res.status(400).json({ error: "Failed to register win" });
    }
  } catch (error) {
    console.error("Error registering win:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

import { Request, Response } from "express";
import { createUser } from "../services/user.service";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { nickname, email, password } = req.body;

  if (!nickname || !email || !password) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  try {
    const user = await createUser({ nickname, email, password });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Error registering user" });
  }
};

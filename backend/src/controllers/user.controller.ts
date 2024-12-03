import { Request, Response } from "express";
import { createUser, getUserByEmail } from "../services/user.service";
import { updateUserProfile, getUserWins, getUserById  } from "../services/user.service";

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
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      res.status(409).json({ error: "Email already exists" });
      return;
    }

    const user = await createUser({ nickname, email, password });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { nickname, profile_picture_url } = req.body;
  const userId = parseInt(req.params.id, 10);

  if (isNaN(userId)) {
    res.status(400).json({ error: "Invalid user ID" });
    return;
  }

  if (!nickname && !profile_picture_url) {
    res.status(400).json({ error: "At least one field to update is required" });
    return;
  }

  try {
    const rowsAffected = await updateUserProfile(userId, {
      nickname,
      profilePictureUrl: profile_picture_url,
    });

    if (rowsAffected > 0) {
      res.status(200).json({ message: "Profile updated successfully" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserInfo = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;

    const user = await getUserById(userId);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const wins = await getUserWins(userId);

    res.status(200).json({ user: { ...user, wins } });
  } catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
import { Router } from "express";
import { registerUser, updateProfile, getUserInfo  } from "../controllers/user.controller";
import { verifyToken } from "../utils/auth.middleware";

const router = Router();

router.post("/register", registerUser);
router.put("/:id/profile", updateProfile);
router.get("/info", verifyToken, getUserInfo);

export default router;

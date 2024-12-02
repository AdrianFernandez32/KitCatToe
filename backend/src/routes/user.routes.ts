import { Router } from "express";
import { registerUser, updateProfile } from "../controllers/user.controller";

const router = Router();

router.post("/register", registerUser);
router.put("/:id/profile", updateProfile);

export default router;

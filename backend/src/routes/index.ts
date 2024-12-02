import { Router } from "express";
import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";
import partidaRoutes from "./match.routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/partidas", partidaRoutes);

export default router;

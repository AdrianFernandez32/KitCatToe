import { Router } from "express";
import { registerWinController } from "../controllers/match.controller";

const router = Router();

router.post("/register", registerWinController);

export default router;

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.status(401).json({ error: "No token provided" });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
        (req as any).user = decoded;
        next();
    } catch (error) {
        console.error("Invalid token:", error);
        res.status(401).json({ error: "Invalid token" });
    }
};

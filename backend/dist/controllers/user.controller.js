"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const user_service_1 = require("../services/user.service");
const registerUser = async (req, res) => {
    const { nickname, email, password } = req.body;
    if (!nickname || !email || !password) {
        res.status(400).json({ error: "All fields are required" });
        return;
    }
    try {
        const user = await (0, user_service_1.createUser)({ nickname, email, password });
        res.status(201).json({ message: "User registered successfully", user });
    }
    catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Error registering user" });
    }
};
exports.registerUser = registerUser;

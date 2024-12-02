"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.registerUser = void 0;
const user_service_1 = require("../services/user.service");
const user_service_2 = require("../services/user.service");
const registerUser = async (req, res) => {
    const { nickname, email, password } = req.body;
    if (!nickname || !email || !password) {
        res.status(400).json({ error: "All fields are required" });
        return;
    }
    try {
        const existingUser = await (0, user_service_1.getUserByEmail)(email);
        if (existingUser) {
            res.status(409).json({ error: "Email already exists" });
            return;
        }
        const user = await (0, user_service_1.createUser)({ nickname, email, password });
        res.status(201).json({ message: "User registered successfully", user });
    }
    catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.registerUser = registerUser;
const updateProfile = async (req, res) => {
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
        const rowsAffected = await (0, user_service_2.updateUserProfile)(userId, {
            nickname,
            profilePictureUrl: profile_picture_url,
        });
        if (rowsAffected > 0) {
            res.status(200).json({ message: "Profile updated successfully" });
        }
        else {
            res.status(404).json({ error: "User not found" });
        }
    }
    catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.updateProfile = updateProfile;

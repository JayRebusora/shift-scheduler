import express from "express";
import {
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    signupUser,
    loginUser
} from "../controllers/userController.js";

const userRoutes = express.Router();

// Auth routes
userRoutes.post("/signup", signupUser);
userRoutes.post("/login", loginUser);

// User CRUD routes
userRoutes.get("/", getUsers);
userRoutes.get("/:id", getUserById);
userRoutes.put("/:id", updateUser);
userRoutes.delete("/:id", deleteUser);

export default userRoutes;
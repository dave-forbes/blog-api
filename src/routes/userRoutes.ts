import express from "express";
const router = express.Router();
import UserController from "../controllers/userController";

// register new user

router.post("/register", UserController.registerUser);

// Login user

// Logout user

// Details for specific user

router.get("/:id", UserController.getUser);

export default router;

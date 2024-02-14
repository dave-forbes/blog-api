import express from "express";
const router = express.Router();
import UserController from "../controllers/userController";

// register new user

router.post("/", UserController.registerUser);

// Login user

// Logout user

// Details for specific user

router.get("/", UserController.getUser);

export default router;

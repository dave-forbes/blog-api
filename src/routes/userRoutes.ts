import express from "express";
const router = express.Router();
import UserController from "../controllers/userController";
import AuthController from "../controllers/authController";

// register new user

router.post("/", AuthController.registerUser);

// read user

router.get("/", UserController.readUser);

export default router;

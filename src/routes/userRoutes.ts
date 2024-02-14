import express from "express";
const router = express.Router();
import UserController from "../controllers/userController";

// create new user

router.post("/", UserController.createUser);

// read user

router.get("/", UserController.readUser);

export default router;

import express from "express";
import { body, validationResult } from "express-validator";

// Register a new user

const registerUser = (req: express.Request, res: express.Response) => {};

// Login user

const loginUser = (req: express.Request, res: express.Response) => {};

// Logout user

const logoutUser = (req: express.Request, res: express.Response) => {};

// Details for specific user

const getUser = () => {};

const AuthController = { registerUser, loginUser, logoutUser, getUser };

export default AuthController;

import express from "express";

// Register a new user

const registerUser = (req: express.Request, res: express.Response) => {};

// Login user

const loginUser = (req: express.Request, res: express.Response) => {};

// Logout user

const logoutUser = (req: express.Request, res: express.Response) => {};

const AuthController = { registerUser, loginUser, logoutUser };

export default AuthController;

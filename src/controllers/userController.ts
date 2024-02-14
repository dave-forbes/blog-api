import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import User from "../models/userModel";

// Register a new user

const registerUser = [
  body("username")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Username is required"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),

  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
      });

      await newUser.save();

      res
        .status(201)
        .json({ message: `New user, ${newUser.username}, created` });
    } catch (error) {
      next(error);
    }
  },
];

// Login user

const loginUser = (req: Request, res: Response) => {};

// Logout user

const logoutUser = (req: Request, res: Response) => {};

// Details for specific user

const getUser = () => {};

const UserController = { registerUser, loginUser, logoutUser, getUser };

export default UserController;

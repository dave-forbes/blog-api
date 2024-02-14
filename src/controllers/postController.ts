import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import Post from "../models/postModel";
import User from "../models/userModel";

// create post

const createPost = [
  body("title")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Title is required")
    .customSanitizer((value) => {
      return value.replace(/[^a-zA-Z0-9\s\_\-']/g, "");
    }),
  body("text")
    .trim()
    .customSanitizer((value) => {
      return value.replace(/[^a-zA-Z0-9\s\_\-']/g, "");
    })
    .isLength({ min: 1 })
    .withMessage("Text is required"),

  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);

      const user = await User.findById(req.body.user);

      const newPost = new Post({
        title: req.body.title,
        text: req.body.text,
        user: user,
      });

      if (!errors.isEmpty()) {
        return res.status(400).json({ newPost, errors: errors.array() });
      }
      await newPost.save();
      res.status(201).json({ newPost, message: "New post created" });
    } catch (error) {
      next(error);
    }
  },
];

// read post

const readPost = () => {};

// update post

const updatePost = () => {};

// delete post

const deletePost = () => {};

const PostController = { createPost, readPost, updatePost, deletePost };

export default PostController;

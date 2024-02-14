import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import Comment from "../models/commentModel";
import User from "../models/userModel";
import Post from "../models/postModel";

// create comment

const createComment = [
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

      const [user, post] = await Promise.all([
        User.findById(req.body.user),
        Post.findById(req.body.post),
      ]);

      const newComment = new Comment({
        text: req.body.text,
        user: user,
        post: post,
      });

      if (!errors.isEmpty()) {
        return res.status(400).json({ newComment, errors: errors.array() });
      }
      await newComment.save();
      res.status(201).json({ newComment, message: "New comment created" });
    } catch (error) {
      next(error);
    }
  },
];

// read comment

const readComment = () => {};

// delete comment

const deleteComment = () => {};

const CommentController = { createComment, readComment, deleteComment };

export default CommentController;

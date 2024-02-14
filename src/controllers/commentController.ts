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

const updateComment = [
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

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const updatedComment = await Comment.findByIdAndUpdate(
        req.params.id,
        {
          text: req.body.text,
        },
        { new: true }
      );
      if (!updatedComment) {
        return res.status(404).json({ message: "Could not find comment" });
      }
      res.status(201).json({ updatedComment, message: "Comment updated." });
    } catch (error) {
      next(error);
    }
  },
];

// delete comment

const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: "Cannot find comment" });
    }
    res.json({ message: "comment deleted" });
  } catch (error) {
    next(error);
  }
};

const CommentController = {
  createComment,
  updateComment,
  deleteComment,
};

export default CommentController;

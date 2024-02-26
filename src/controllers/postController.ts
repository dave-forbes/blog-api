import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import Post from "../models/postModel";
import User from "../models/userModel";
import authenticateToken from "../utils/authenticateToken";
import upload from "../utils/multerSetup";

// get all posts

const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await Post.find().populate("user");
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

// create post

const createPost = [
  authenticateToken,

  upload.single("image"),

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

      const imagePath = req.file
        ? `https://blog-api-production-7c83.up.railway.app/img/${req.file.filename}`
        : "";

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const newPost = new Post({
        title: req.body.title,
        text: req.body.text,
        user: user,
        img1: imagePath,
      });

      await newPost.save();
      res.status(201).json({ newPost, message: "New post created" });
    } catch (error) {
      next(error);
    }
  },
];

// read post

const readPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await Post.findById(req.params.id).populate("user");
    if (!post) {
      return res.status(404).json({ message: "Cannot find post" });
    }
    res.json(post);
  } catch (error) {
    next(error);
  }
};

// update post

const updatePost = [
  authenticateToken,
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

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        {
          title: req.body.title,
          text: req.body.text,
        },
        { new: true } // to return the updated document
      );
      if (!updatedPost) {
        return res.status(404).json({ message: "Cannot find post" });
      }
      res.json(updatedPost);
    } catch (error) {
      next(error);
    }
  },
];

// delete post

const deletePost = [
  authenticateToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const post = await Post.findByIdAndDelete(req.params.id);
      if (!post) {
        return res.status(404).json({ message: "Cannot find post" });
      }
      res.json({ message: "Post deleted" });
    } catch (error) {
      next(error);
    }
  },
];

const publishPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Cannot find post" });
    }
    const published = post.published;
    await Post.findByIdAndUpdate(req.params.id, {
      published: published ? false : true,
    });
    res.json({ message: "Post published status updated" });
  } catch (error) {
    next(error);
  }
};

const featurePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Cannot find post" });
    }

    // find the featured post and unfeature it
    const featuredPost = await Post.findOneAndUpdate(
      { featured: true },
      { featured: false }
    );
    if (!featuredPost) {
      return res
        .status(500)
        .json({ message: "Internal server error, please try again later" });
    }

    // make the requested post featured

    await Post.findByIdAndUpdate(req.params.id, {
      featured: true,
    });
    res.json({ message: "Post featured status updated" });
  } catch (error) {
    next(error);
  }
};

const PostController = {
  getPosts,
  createPost,
  readPost,
  updatePost,
  deletePost,
  publishPost,
  featurePost,
};

export default PostController;

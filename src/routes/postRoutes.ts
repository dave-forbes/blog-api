import express from "express";
const router = express.Router();
import PostController from "../controllers/postController";

// create post

router.post("/", PostController.createPost);

// read post

router.get("/:id", PostController.readPost);

// update post

router.put("/:id", PostController.updatePost);

// delete post

router.delete("/:id", PostController.deletePost);

export default router;

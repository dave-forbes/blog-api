import express from "express";
const router = express.Router();
import PostController from "../controllers/postController";

// create post

router.post("/create", PostController.createPost);

// read post

router.get("/read/:id", PostController.readPost);

// update post

router.put("/update/:id", PostController.updatePost);

// delete post

router.delete("/delete/:id", PostController.deletePost);

export default router;

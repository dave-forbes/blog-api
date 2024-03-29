import express from "express";
const router = express.Router();
import PostController from "../controllers/postController";

// get all posts

router.get("/", PostController.getPosts);

// create post

router.post("/create", PostController.createPost);

// read post

router.get("/read/:id", PostController.readPost);

// update post

router.put("/update/:id", PostController.updatePost);

// delete post

router.delete("/delete/:id", PostController.deletePost);

// publish post

router.put("/publish/:id", PostController.publishPost);

// feature post

router.put("/feature/:id", PostController.featurePost);

export default router;

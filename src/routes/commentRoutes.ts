import express from "express";
const router = express.Router();
import CommentController from "../controllers/commentController";

// create comment

router.post("/", CommentController.createComment);

// read comment

router.get("/:id", CommentController.readComment);

// delete comment

router.delete("/:id", CommentController.deleteComment);

export default router;

import express from "express";
const router = express.Router();
import CommentController from "../controllers/commentController";

// create comment

router.post("/create", CommentController.createComment);

// // read comment

// router.get("/read/:id", CommentController.readComment);

// update comment

router.put("/update/:id", CommentController.updateComment);

// delete comment

router.delete("/delete/:id", CommentController.deleteComment);

export default router;

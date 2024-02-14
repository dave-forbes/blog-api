import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    text: { type: String, required: true, maxlength: 250 },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: { type: String, maxlength: 100 },
    text: { type: String, required: true, maxlength: 500 },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

export default Post;

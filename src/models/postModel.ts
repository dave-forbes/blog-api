import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: { type: String, maxlength: 100, required: true },
    text: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    published: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
    img1: { type: String },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

export default Post;

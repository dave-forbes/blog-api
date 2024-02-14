import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: { type: String, required: true, maxLength: 100, unique: true },
    password: { type: String, required: true, maxLength: 100 },
    email: {
      type: String,
      required: true,
      maxLength: 100,
      unique: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;

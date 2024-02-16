import jwt from "jsonwebtoken";
import { Types } from "mongoose";

interface User {
  username: string;
  id: Types.ObjectId;
}

const generateAccessToken = (user: User): string | Error => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not found in environment variables");
  }
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "120s" });
};

export default generateAccessToken;

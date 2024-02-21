import jwt from "jsonwebtoken";
import { Types } from "mongoose";

interface TokenRecipient {
  username: string;
  id: Types.ObjectId;
  author: Boolean;
}

const generateAccessToken = (
  tokenRecipient: TokenRecipient
): string | Error => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not found in environment variables");
  }
  return jwt.sign(tokenRecipient, process.env.JWT_SECRET, { expiresIn: "1h" });
};

export default generateAccessToken;

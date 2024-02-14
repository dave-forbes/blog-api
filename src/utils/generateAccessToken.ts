import jwt from "jsonwebtoken";

const generateAccessToken = (user: any) => {
  // fix type later
  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET not found in environment variables");
    const error = new Error("JWT_SECRET not found in environment variables");
    return error;
  }
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "120s" });
};

export default generateAccessToken;

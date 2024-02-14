import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

declare module "express" {
  interface Request {
    user?: JwtPayload;
  }
}

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET not found in environment variables");
    const error = new Error("JWT_SECRET not found in environment variables");
    return next(error);
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user as JwtPayload | undefined;
    next();
  });
};

export default authenticateToken;

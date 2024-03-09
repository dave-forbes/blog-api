import express, { Request, Response, NextFunction } from "express";
import userRouter from "./routes/userRoutes";
import postRouter from "./routes/postRoutes";
import commentRouter from "./routes/commentRoutes";
import connect from "./utils/database";
import cors from "cors";
import corsOptions from "./utils/corsOptions";

const app = express();

// database connection

connect();

// middleware

app.use(express.json({ limit: "3mb" }));
app.use(express.urlencoded({ limit: "3mb", extended: true }));
app.use(cors(corsOptions));
app.use(express.static("public"));

// routes

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

// Handle preflight requests
app.options("*", cors(corsOptions));

// Error Handling Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // Handle the error case
  console.error(err.stack);
  return res.status(500).json({ message: "Internal Server Error" });
});

export default app;

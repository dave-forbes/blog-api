import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes";
import postRouter from "./routes/postRoutes";
import commentRouter from "./routes/commentRoutes";
import connect from "./utils/database";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// database connection

connect();

// middleware

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static("public"));

// routes

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

// Error Handling Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // Handle the error case
  console.error(err.stack);
  return res.status(500).json({ message: "Internal Server Error" });
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

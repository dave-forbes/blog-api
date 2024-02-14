import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes";
import postRouter from "./routes/postRoutes";
import commentRouter from "./routes/commentRoutes";
import connect from "./utils/database";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// database connection

connect();

// middleware

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

// Error Handling Middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
  }
);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

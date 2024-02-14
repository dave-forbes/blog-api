import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes";
import postRouter from "./routes/postRoutes";
import commentRouter from "./routes/commentRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

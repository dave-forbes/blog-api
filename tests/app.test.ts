import request from "supertest";
import app from "../src/app";
import Post from "../src/models/postModel";
import { disconnectDB } from "../src/utils/database";
import mongoose from "mongoose";

describe("GET /posts", () => {
  it("should return all posts with populated user field", async () => {
    await Post.create([
      {
        title: "Post 1",
        text: "Content 1",
        user: { _id: new mongoose.Types.ObjectId(), username: "user1" },
      },
      {
        title: "Post 2",
        text: "Content 2",
        user: { _id: new mongoose.Types.ObjectId(), username: "user2" },
      },
    ]);

    const response = await request(app).get("/posts");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });

  afterAll(async () => {
    disconnectDB();
  });
});

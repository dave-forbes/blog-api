import request from "supertest";
import app from "../src/app";
import Post from "../src/models/postModel";

describe("GET /posts", () => {
  it("should return all posts", async () => {
    // Retrieve existing blog posts from the database
    const existingPosts = await Post.find();

    // Make a GET request to the /posts endpoint
    const response = await request(app).get("/posts");

    // Assert the response status code
    expect(response.status).toBe(200);

    // Assert that the number of posts returned matches the number of existing posts
    expect(response.body.length).toBe(existingPosts.length);

    // Additional assertions as needed
  });
});

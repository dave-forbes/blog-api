import mongoose from "mongoose";
import dotenv from "dotenv";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer: MongoMemoryServer | null = null;

dotenv.config();

const connectDB = async (isTesting: boolean = false) => {
  try {
    if (isTesting) {
      mongoServer = new MongoMemoryServer();
      await mongoServer.start(); // Start the server before getting the URI
      const mongoUri = await mongoServer.getUri();
      await mongoose.connect(mongoUri);
      console.log("Connected to MongoDB for testing");
    } else {
      if (!process.env.MONGODB_URI) {
        console.error("MONGODB_URI not found in environment variables");
        process.exit(1);
      }
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("Connected to MongoDB");
    }
  } catch (error: any) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the process if unable to connect to the database
  }
};

const disconnectDB = async () => {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
};

export { connectDB, disconnectDB };

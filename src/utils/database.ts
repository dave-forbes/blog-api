import mongoose from "mongoose";

const connect = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.error("MONGODB_URI not found in environment variables");
      process.exit(1);
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error: any) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the process if unable to connect to the database
  }
};

export default connect;

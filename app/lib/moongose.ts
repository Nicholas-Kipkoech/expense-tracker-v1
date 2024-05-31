import mongoose from "mongoose";

const urlString: string | any = process.env.MONGO_URL;

const connectToDatabase = async () => {
  // Check if mongoose connection is already open
  if (mongoose.connection && mongoose.connection.readyState >= 1) {
    console.info("Using existing database connection");
    return;
  }

  // Set mongoose settings
  // mongoose.set("strictQuery", false);

  // Create a new connection
  try {
    await mongoose.connect(urlString);
    console.info("Connected to database");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

export default connectToDatabase;

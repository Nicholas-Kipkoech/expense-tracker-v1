import mongoose from "mongoose";

const urlString: string | any =
  "mongodb+srv://Nickey:Nickey@cluster0.i0gut.mongodb.net/expense-tracker?retryWrites=true&w=majority&appName=Cluster0";

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

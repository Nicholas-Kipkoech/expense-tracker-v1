import mongoose from "mongoose";

const urlString: string | any = process.env.MONGO_URL;

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(urlString);
    console.info("connected to database");
  } catch (error) {
    console.error(error);
  }
};

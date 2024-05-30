import mongoose from "mongoose";

const uri: string | any = process.env.MONGO_URL;
const options: any = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(uri, options);
    console.log("connected to database...");
  } catch (error) {
    console.error(error);
  }
};

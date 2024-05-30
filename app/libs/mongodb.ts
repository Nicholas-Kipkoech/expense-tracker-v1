import mongoose from "mongoose";

const uri: string | any =
  "mongodb+srv://Nickey:Nickey@cluster0.i0gut.mongodb.net/expense-tracker?retryWrites=true&w=majority&appName=Cluster0";
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

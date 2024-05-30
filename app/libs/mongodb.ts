import mongoose from "mongoose";

const uri: string | any =
  "mongodb+srv://Nickey:Nickey@cluster0.i0gut.mongodb.net/expense-tracker?retryWrites=true&w=majority&appName=Cluster0";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

if (!uri) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, options).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

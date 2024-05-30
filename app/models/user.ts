import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  createdAt: Date;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;

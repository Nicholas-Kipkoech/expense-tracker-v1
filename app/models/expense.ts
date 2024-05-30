import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  user: { type: String },
  expenseAmount: { type: Number },
  expenseTitle: { type: String },
  createdAt: { type: Date, default: Date.now() },
});

const Expense =
  mongoose.models.Expense || mongoose.model("Expense", expenseSchema);
export default Expense;

import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  user: { type: String, required: true },
  expenseTitle: { type: String, required: true },
  expenseAmount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now() },
});

const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;

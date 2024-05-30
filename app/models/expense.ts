import mongoose, { Model, Document, Schema } from "mongoose";

interface IExpense extends Document {
  user: string;
  expenseTitle: string;
  expenseAmount: string;
  createdAt: Date;
}

const expenseSchema: Schema<IExpense> = new mongoose.Schema({
  user: { type: String, required: true },
  expenseTitle: { type: String, required: true },
  expenseAmount: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
});

const Expense: Model<IExpense> =
  mongoose.models.Expense || mongoose.model("Expense", expenseSchema);
export default Expense;

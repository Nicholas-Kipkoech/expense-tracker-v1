import Expense from "@/app/models/expense";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const url = new URL(req.url);

  try {
    const { user, expenseAmount, expenseTitle } = await req.json();
    const newExpense = new Expense({
      user,
      expenseAmount,
      expenseTitle,
    });
    await newExpense.save();
    return NextResponse.json({ message: "Expense added successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error);
  }
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  try {
    const userId = url.searchParams.get("userId");
    const fetchedExpenses = await Expense.find({ user: userId });
    return NextResponse.json({ expenses: fetchedExpenses });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error);
  }
}

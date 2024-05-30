import Expense from "@/app/models/expense";

import { NextRequest, NextResponse } from "next/server";

type ExpenseInput = {
  user: string;
  expenseTitle: string;
  expenseAmount: string;
};
export async function POST(req: NextRequest) {
  try {
    const data: ExpenseInput = await req.json();
    const expense = new Expense({
      user: data.user,
      expenseTitle: data.expenseTitle,
      expenseAmount: data.expenseAmount,
    });
    await expense.save();
    return NextResponse.json({
      success: true,
      message: "Expense added success!",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error });
  }
}
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  try {
    const userId = url.searchParams.get("userId");
    const fetchedExpenses = await Expense.find({ user: userId });
    return NextResponse.json({
      success: true,
      expenses: fetchedExpenses,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error });
  }
}

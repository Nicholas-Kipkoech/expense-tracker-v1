"use client";
import React, { useContext } from "react";
import CustomButton from "../helpers/CustomButton";
import { useRouter } from "next/navigation";
import { ExpenseContext } from "../context/context";

const ExpenseProgress = ({ totalExpenseAmount, earningAmount }: any) => {
  const percentage =
    earningAmount > 0
      ? Math.floor((totalExpenseAmount / earningAmount) * 100)
      : 0;

  return (
    <div className="h-[3rem] border-2 bg-gray-400 mt-2 mx-1 rounded-full overflow-hidden">
      <div
        className={`${
          totalExpenseAmount > earningAmount ? "bg-red-700" : "bg-slate-800"
        } h-full rounded-full transition-width duration-300`}
        style={{ width: `${Math.min(percentage, 100)}%` }}
      ></div>
    </div>
  );
};

const Dashboard = () => {
  const router = useRouter();

  const { expenses, earning }: any = useContext(ExpenseContext);

  const totalExpenseAmount = expenses.reduce(
    (total: number, expense: any) => total + Number(expense.expenseAmount),
    0
  );

  return (
    <div>
      <div className="flex flex-col bg-[#01204E] shadow-2xl text-white p-1 border-1 w-full">
        <p>Principal Amount</p>

        <p
          className={`text-[2rem] ${
            totalExpenseAmount > earning.earningAmount ? "text-red-600" : ""
          } font-semibold`}
        >
          KSH {earning.earningAmount - totalExpenseAmount}
        </p>
      </div>
      <ExpenseProgress
        totalExpenseAmount={totalExpenseAmount}
        earningAmount={earning.earningAmount}
      />
      <div className="flex justify-end mr-2 mt-2">
        <CustomButton
          name={"Add Expense"}
          onClick={() => router.push("/dashboard/expense")}
          className="border bg-[#028391] text-white p-2 rounded-md"
        />
      </div>

      <div className="border max-h-[350px] h-auto overflow-y-auto mt-5 ">
        {expenses.map((expense: any, key: number) => (
          <div
            className="flex justify-between px-2 items-center border-2 h-[3rem]"
            key={key}
          >
            <p className="text-[14px]">{expense.expenseName}</p>
            <p className="text-[12px]">
              KSH {expense.expenseAmount?.toLocaleString()}
            </p>
            <p className="text-[12px]">
              {new Date(expense.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

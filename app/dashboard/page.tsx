"use client";
import React, { useContext, useState } from "react";
import CustomButton from "../helpers/CustomButton";
import { useRouter } from "next/navigation";
import { ExpenseContext } from "../context/context";
import { MdDeleteOutline } from "react-icons/md";
import { deleteExpense } from "../services/apiServices";
import { IoMdAdd } from "react-icons/io";
import { FaRegEyeSlash } from "react-icons/fa";
import { LiaEyeSolid } from "react-icons/lia";

const ExpenseProgress = ({ totalExpenseAmount, earningAmount }: any) => {
  const percentage =
    earningAmount > 0
      ? Math.floor((totalExpenseAmount / earningAmount) * 100)
      : 0;

  return (
    <div className="h-[2rem] border-2 bg-gray-400 mt-2 mx-1 rounded-full overflow-hidden">
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

  const [hidden, setHidden] = useState(false);

  const { expenses, earning, getExpenses, user }: any =
    useContext(ExpenseContext);

  const totalExpenseAmount = expenses.reduce(
    (total: number, expense: any) => total + Number(expense.expenseAmount),
    0
  );

  const handleDeleteExpense = async (expenseId: string) => {
    if (expenseId) {
      const res = await deleteExpense(expenseId);
      if (res.success) {
        await getExpenses();
      }
    }
  };

  const myBalance = earning.earningAmount - totalExpenseAmount;

  let maskedBalance = String(myBalance).replace(/./g, "*");

  return (
    <div>
      <div className="flex justify-between  bg-[#01204E] h-auto text-white items-center  fixed w-full">
        <div className="flex flex-col  text-white p-1">
          <p>My Balance</p>
          <div className="flex gap-2 items-center">
            <p
              className={`text-[1.5rem] ${
                totalExpenseAmount > earning.earningAmount ? "text-red-600" : ""
              } font-semibold`}
            >
              {hidden
                ? maskedBalance
                : `KSH ${Number(myBalance).toLocaleString()}`}
            </p>
            {hidden ? (
              <LiaEyeSolid
                size={20}
                className="cursor-pointer"
                onClick={() => setHidden(!hidden)}
              />
            ) : (
              <FaRegEyeSlash
                size={20}
                className="cursor-pointer"
                onClick={() => setHidden(!hidden)}
              />
            )}
          </div>
        </div>

        <div
          className="flex flex-col items-center px-2 cursor-pointer "
          onClick={() => router.push("/dashboard/earning")}
        >
          {earning.earningAmount > 0 ? <p>Edit amount </p> : <p>Add amount </p>}
          <IoMdAdd size={20} />
        </div>
      </div>
      <div className="pt-[4rem]">
        <p className="bg-[#01204E] text-[12px] p-2 text-white">
          Welcome back! {user.firstName} {user.lastName}
        </p>
        <ExpenseProgress
          totalExpenseAmount={totalExpenseAmount}
          earningAmount={earning.earningAmount}
        />
        <div className="flex justify-end mr-2 mt-1">
          <CustomButton
            name={"Add Expense"}
            onClick={() => router.push("/dashboard/expense")}
            className="border bg-[#028391] text-white py-2 px-2 rounded-md"
          />
        </div>

        <div className="border max-h-[280px] h-auto overflow-y-auto mt-5 ">
          {expenses.map((expense: any, key: number) => (
            <div
              className="flex justify-between px-2 items-center border-2 h-[auto]"
              key={key}
            >
              <div className="flex flex-col gap-2 my-2">
                <p className="text-[14px] font-semibold truncate">
                  {String(expense.expenseName).toUpperCase()}
                </p>
                <p className="text-[12px] text-slate-700">
                  {new Date(expense.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center  gap-4">
                <p className="text-[14px] font-bold">
                  KSH {Number(expense.expenseAmount).toLocaleString()}
                </p>
                <MdDeleteOutline
                  color="red"
                  className="cursor-pointer"
                  size={20}
                  onClick={() => handleDeleteExpense(expense._id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

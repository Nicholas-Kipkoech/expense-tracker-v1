"use client";
import React, { useContext, useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { ExpenseContext } from "../context/context";
import { LiaEyeSolid } from "react-icons/lia";
import { useRouter } from "next/navigation";
import { FaRegEyeSlash } from "react-icons/fa";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { deleteExpense } from "../services/apiServices";
import CustomButton from "../helpers/CustomButton";
import { useCustomToast } from "../config/useToast";

const Dashboard = () => {
  const { expenses, earning, getExpenses, user }: any =
    useContext(ExpenseContext);

  const router = useRouter();

  const [hidden, setHidden] = useState(false);

  const totalExpenseAmount = expenses.reduce(
    (total: number, expense: any) => total + Number(expense.expenseAmount),
    0
  );

  const myBalance = earning.earningAmount - totalExpenseAmount;

  let maskedBalance = String(myBalance).replace(/./g, "*");
  const showToast = useCustomToast();
  const handleDeleteExpense = async (expenseId: string) => {
    if (expenseId) {
      const res = await deleteExpense(expenseId);
      if (res.success) {
        showToast("Expense deleted successfully");
        await getExpenses();
      }
    }
  };
  return (
    <div className="p-2">
      <div className="flex flex-col">
        <p className="text-[1rem]">Welcome back,</p>
        <p className="text-[1.3rem] font-bold">
          {user.firstName} {user.lastName}
        </p>
      </div>

      <div className="border p-3 rounded-[30px] flex justify-between items-center text-white shadow-2xl  bg-[#42224A]">
        <div>
          <p className="text-[1.5rem]">My Balance</p>
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
        <p
          className="text-[4rem] cursor-pointer"
          onClick={() => router.push("/dashboard/earning")}
        >
          +
        </p>
      </div>

      <div className="flex justify-end mt-2">
        <CustomButton
          onClick={() => router.push("/dashboard/expense")}
          className="bg-[#42224A] h-[2rem] text-white px-2 rounded-md"
          name="+ Add expense"
        />
      </div>

      <div className="mt-3 flex flex-col gap-2">
        {expenses.map((expense: any, key: number) => (
          <div className="flex justify-between mx-2 items-center" key={key}>
            <div className="flex items-center gap-4">
              <div className="border rounded-[50px] h-[3rem] w-[3rem] flex items-center justify-center bg-[#42224A] text-white">
                <CiShoppingCart size={20} />
              </div>
              <div className="flex flex-col">
                <p className="font-bold text-[14px]">{expense.expenseName}</p>
                <p className="text-slate-500 text-[13px]">
                  {expense.expenseType}
                </p>
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <p className="font-semibold text-[12px]">
                KSH {Number(expense.expenseAmount).toLocaleString()}
              </p>
              <MdDeleteOutline
                color="red"
                className="cursor-pointer"
                size={20}
                onClick={() => handleDeleteExpense(expense._id)}
              />
              <MdEdit size={20} color="black" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

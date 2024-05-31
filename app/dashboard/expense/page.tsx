"use client";
import { ExpenseContext } from "@/app/context/context";
import CustomButton from "@/app/helpers/CustomButton";
import CustomInput from "@/app/helpers/CustomInput";
import { addExpense } from "@/app/services/apiServices";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";

const AddExpense = () => {
  const { getExpenses }: any = useContext(ExpenseContext);
  const router = useRouter();
  const [expense, setExpense] = useState({
    expenseName: "",
    expenseAmount: "",
  });

  const handleAddExpense = async () => {
    try {
      const res = await addExpense({
        expenseName: expense.expenseName,
        expenseAmount: Number(expense.expenseAmount),
      });
      if (res.success === true) {
        router.back();
        await getExpenses();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-center h-full m-2 items-center">
      <div className="flex justify-between items-center w-full">
        <IoIosArrowRoundBack size={40} onClick={() => router.back()} />
        <p className="text-[1rem] font-semibold">Add your today expense!</p>
        <p></p>
      </div>

      <div className="border shadow-2xl p-4 w-full mt-2 rounded-md">
        <CustomInput
          name="Expense Name"
          value={expense.expenseName}
          onChange={(e) =>
            setExpense({ ...expense, expenseName: e.target.value })
          }
          className="border h-[3rem] rounded-md "
        />
        <CustomInput
          name="Expense Amount"
          value={expense.expenseAmount}
          onChange={(e) =>
            setExpense({ ...expense, expenseAmount: e.target.value })
          }
          className="border h-[3rem] rounded-md "
        />
        <div className="flex justify-center mt-4">
          <CustomButton
            onClick={handleAddExpense}
            name={"Add Expense"}
            className={
              "border h-[3rem] w-full rounded-md bg-slate-800 text-white"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default AddExpense;

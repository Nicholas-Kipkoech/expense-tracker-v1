"use client";
import { useCustomToast } from "@/app/config/useToast";
import { ExpenseContext } from "@/app/context/context";
import CustomButton from "@/app/helpers/CustomButton";
import CustomInput from "@/app/helpers/CustomInput";
import CustomSelect from "@/app/helpers/CustomSelect";
import { addExpense } from "@/app/services/apiServices";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";

const AddExpense = () => {
  const { getExpenses, getEarnings }: any = useContext(ExpenseContext);
  const router = useRouter();
  const [expense, setExpense] = useState({
    expenseName: "",
    expenseAmount: "",
    expenseType: "",
  });
  const [loading, setLoading] = useState(false);
  const showToast = useCustomToast();

  const expenseTypes = [
    "Food & Drinks",
    "Shopping",
    "Family & Friends",
    "Miscellaneous",
  ];

  const expenseTypesOptions = expenseTypes.map((expense) => {
    return {
      label: expense,
      value: expense,
    };
  });

  const handleAddExpense = async () => {
    try {
      setLoading(true);
      const res = await addExpense({
        expenseName: expense.expenseName,
        expenseAmount: Number(expense.expenseAmount),
        expenseType: expense.expenseType,
      });
      if (res.success === true) {
        showToast("Expense added successfully");
        await getExpenses();
        await getEarnings();
        setLoading(false);
        router.back();
      }
    } catch (error: any) {
      setLoading(false);
      console.error(error);
      showToast(error.response.data.error, "error");
    }
  };

  return (
    <div className="flex flex-col justify-center  mt-3 items-center">
      <div className="flex justify-between items-center w-full">
        <IoIosArrowRoundBack size={40} onClick={() => router.back()} />
        <p className="text-[1rem] font-semibold">Add your today expense!</p>
        <p></p>
      </div>

      <div className="p-4 w-full mt-2 ">
        <CustomInput
          name="Expense Name"
          value={expense.expenseName}
          onChange={(e) =>
            setExpense({ ...expense, expenseName: e.target.value })
          }
          className="border h-[3rem] rounded-md "
        />

        <CustomSelect
          name="Expense Type"
          defaultValue={expenseTypesOptions[0]}
          options={expenseTypesOptions}
          className=""
          onChange={(value: any) =>
            setExpense({ ...expense, expenseType: value.value })
          }
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
            disabled={
              loading ||
              Number(expense.expenseAmount) < 1 ||
              expense.expenseName === ""
            }
            onClick={handleAddExpense}
            name={loading ? "Adding Expense..." : "Add Expense"}
            className={"border h-[3rem] w-full rounded-md color text-white"}
          />
        </div>
      </div>
    </div>
  );
};

export default AddExpense;

"use client";
import CustomButton from "@/app/helpers/CustomButton";
import CustomInput from "@/app/helpers/CustomInput";
import { useRouter } from "next/navigation";
import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";

const AddExpense = () => {
  const router = useRouter();
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
          value={""}
          className="border h-[3rem] rounded-md "
        />
        <CustomInput
          name="Expense Amount"
          value={""}
          className="border h-[3rem] rounded-md "
        />
        <div className="flex justify-center mt-4">
          <CustomButton
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

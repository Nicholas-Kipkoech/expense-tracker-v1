"use client";
import React, { useContext } from "react";
import CustomButton from "../helpers/CustomButton";
import { useRouter } from "next/navigation";
import { ExpenseContext } from "../context/context";

const Dashboard = () => {
  const router = useRouter();

  const { expenses }: any = useContext(ExpenseContext);

  return (
    <div>
      <div className="flex flex-col bg-[#01204E] shadow-2xl text-white p-1 border-1 w-full">
        <p>Principal Amount</p>
        <p className="text-[2.6rem] font-semibold">KSH {"60000"}</p>
      </div>
      <div className="flex justify-end mr-2 mt-2">
        <CustomButton
          name={"Add Expense"}
          onClick={() => router.push("/dashboard/expense")}
          className="border bg-[#028391] text-white p-2 rounded-md"
        />
      </div>

      <div className="border h-auto mt-5 ">
        <div className="flex justify-between px-2 items-center">
          <p className="text-[1.3rem] font-semibold ">Sugar</p>
          <p>KSH 200</p>
          <p>{new Date().toDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

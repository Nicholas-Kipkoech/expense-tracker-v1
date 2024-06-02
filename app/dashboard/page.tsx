"use client";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { GiThreeFriends, GiShoppingCart } from "react-icons/gi";
import { BiDrink } from "react-icons/bi";
import { IoFastFood } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { LiaEyeSolid } from "react-icons/lia";
import { ExpenseContext } from "../context/context";
import CustomButton from "../helpers/CustomButton";
import { deleteExpense } from "../services/apiServices";
import { useCustomToast } from "../config/useToast";
import { MdDeleteOutline } from "react-icons/md";

const iconsMap = [
  {
    icon: <GiThreeFriends />,
    name: "Family & Friends",
  },
  {
    icon: <GiShoppingCart />,
    name: "Shopping",
  },
  {
    icon: <BiDrink />,
    name: "Miscellaneous",
  },
  {
    icon: <IoFastFood />,
    name: "Food & Drinks",
  },
];

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
  let maskedBalance = `KSH ${String(myBalance).replace(/./g, "*")}`;

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

      <div className="border p-3 rounded-[30px] flex justify-between items-center text-white shadow-2xl color">
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
          className="color h-[2rem] text-white px-2 rounded-md"
          name="+ Add expense"
        />
      </div>

      <div className="mt-3 flex flex-col gap-2">
        {expenses.map((expense: any, key: number) => {
          const matchedIcon = iconsMap.find(
            (iconItem) => iconItem.name === expense.expenseType
          );

          return (
            <div className="flex justify-between mx-2 items-center" key={key}>
              <div className="flex items-center gap-4">
                <div className="border rounded-[50px] h-[3rem] w-[3rem] flex items-center justify-center color text-white">
                  {matchedIcon ? matchedIcon.icon : <GiShoppingCart />}
                </div>
                <div className="flex flex-col">
                  <p className="text-[14px] font-semibold truncate">
                    {expense.expenseName}
                  </p>
                  <p className="text-[12px] text-slate-700">
                    {new Date(expense.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
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
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;

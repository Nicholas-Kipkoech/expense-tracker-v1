"use client";
import { useCustomToast } from "@/app/config/useToast";
import { ExpenseContext } from "@/app/context/context";
import CustomButton from "@/app/helpers/CustomButton";
import CustomInput from "@/app/helpers/CustomInput";
import { addEarning } from "@/app/services/apiServices";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";

const AddEarningComponent = () => {
  const {
    getExpenses,
    getEarnings,
    earning: _earning,
  }: any = useContext(ExpenseContext);
  const router = useRouter();

  const [earning, setEarning] = useState({
    newAmount: 0,
    additional: 0,
  });
  useEffect(() => {
    if (_earning.earningAmount) {
      setEarning({ ...earning, newAmount: _earning.earningAmount });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_earning.earningAmount]);

  const [loading, setLoading] = useState(false);

  const showToast = useCustomToast();
  const handleAddEarning = async () => {
    try {
      setLoading(true);
      const res = await addEarning({
        additionalAmount: Number(earning.additional),
      });
      if (res.success === true) {
        showToast("Amount added successfully");
        setLoading(false);
        router.back();
        await getExpenses();
        await getEarnings();
      }
    } catch (error: any) {
      setLoading(false);
      showToast(error.response.data.error, "error");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-center h-full m-2 items-center">
      <div className="flex justify-between items-center w-full">
        <IoIosArrowRoundBack size={40} onClick={() => router.back()} />
        <p className="text-[1rem] font-semibold">
          Add or update your principal amount!
        </p>
        <p></p>
      </div>

      <div className="p-4 w-full mt-2">
        <CustomInput
          name="Current Amount e.g Salary,Savings"
          disabled
          value={earning.newAmount}
          onChange={(e) =>
            setEarning({ ...earning, newAmount: e.target.value })
          }
          className="border h-[3rem] rounded-md "
        />
        <CustomInput
          name="Additional Amount"
          placeholder={"500,600 etc"}
          value={earning.additional}
          onChange={(e) =>
            setEarning({ ...earning, additional: e.target.value })
          }
          className="border h-[3rem] rounded-md "
        />
        <div className="flex justify-center mt-4">
          <CustomButton
            disabled={loading}
            onClick={handleAddEarning}
            name={loading ? "Adding Amount..." : "Add Amount"}
            className={"border h-[3rem] w-full rounded-md color text-white"}
          />
        </div>
      </div>
    </div>
  );
};

export default AddEarningComponent;

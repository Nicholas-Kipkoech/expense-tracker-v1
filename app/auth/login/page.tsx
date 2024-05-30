import CustomButton from "@/app/helpers/CustomButton";
import CustomInput from "@/app/helpers/CustomInput";
import React from "react";

const Login = () => {
  return (
    <div className="w-full m-2">
      <p className="text-[1.8rem] font-bold justify-center flex">
        Expense Tracker
      </p>
      <p className="text-[1.3rem] font-semibold flex justify-center">
        Login to your account
      </p>
      <div className="border p-8 shadow-2xl rounded-md">
        <CustomInput
          name={"Email"}
          className={"h-[3rem] border w-full rounded-md"}
          value={""}
        />
        <CustomInput
          name={"Password"}
          className={"h-[3rem] border w-full rounded-md"}
          value={""}
        />
        <CustomButton
          name={"Login"}
          className="w-full border h-[3rem] mt-5 rounded-md bg-slate-800 text-white"
        />

        <div className="flex justify-center gap-1 mt-2 items-center">
          <p>Don&apos;t have an account?</p>
          <a href="/auth/register" className="text-blue-800">
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;

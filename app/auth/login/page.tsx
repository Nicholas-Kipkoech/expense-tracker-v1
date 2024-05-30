"use client";
import CustomButton from "@/app/helpers/CustomButton";
import CustomInput from "@/app/helpers/CustomInput";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  /**
   * This is function for triggering login. Once the login is success the user is redirected to dashboard
   */
  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/login", {
        email,
        password,
      });
      if (res.data.success === true) {
        localStorage.setItem("access_token", res.data.accessToken);
        router.push("/dashboard");
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <CustomInput
          name={"Password"}
          className={"h-[3rem] border w-full rounded-md"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <CustomButton
          name={loading ? "Loggin in.." : "Login"}
          onClick={handleLogin}
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
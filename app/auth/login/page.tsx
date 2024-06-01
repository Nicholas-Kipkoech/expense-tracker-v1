"use client";

import CustomButton from "@/app/helpers/CustomButton";
import CustomInput from "@/app/helpers/CustomInput";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { config } from "dotenv";
import { API_URL } from "@/app/config/config";
import Image from "next/image";
import Logo from "../../assets/Logo.png";

config();

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
      const res = await axios.post(`${API_URL}/api/user/login`, {
        email: email.toLowerCase(),
        password: password,
      });
      if (res.data.success === true) {
        localStorage.setItem("access_token", res.data.accessToken);
        setLoading(false);
        router.push("/dashboard");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  return (
    <div className="flex  flex-col  items-center">
      <Image alt="logo" src={Logo} height={"80"} width={"200"} />
      <p className="text-[1.8rem] font-bold justify-center flex">
        Expense Tracker
      </p>
      <p className="text-[1.3rem] font-semibold flex justify-center">
        Login to your account
      </p>
      <div className="border p-4 w-full mx-10 shadow-2xl rounded-md">
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

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
import { useCustomToast } from "@/app/config/useToast";
import { FaEye } from "react-icons/fa";

config();

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const showToast = useCustomToast();
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
        showToast("login success!");
        localStorage.setItem("access_token", res.data.accessToken);
        setLoading(false);
        router.push("/dashboard");
      }
    } catch (error: any) {
      console.error(error);
      showToast(error.response.data.error, "error");
      setLoading(false);
    }
  };
  return (
    <div className="flex  flex-col items-center  h-screen mt-[10rem]">
      <Image alt="logo" src={Logo} height={"80"} width={"100"} />
      <p className="text-[1.8rem] font-bold justify-center flex">
        Expense Tracker
      </p>
      <p className="text-[1.3rem] font-semibold flex justify-center">
        Login to your account
      </p>
      <div className="p-2 w-[90vw] px-2">
        <CustomInput
          name={"Email"}
          className={"h-[2.8rem] border w-full rounded-md"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <CustomInput
          name={"Password"}
          type={showPassword ? "text" : "password"}
          className={"h-[2.8rem] border w-full rounded-md"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="checkbox"
          className="mt-2 mx-2"
          onChange={() => setShowPassword(!showPassword)}
        />
        <label>Show password</label>

        <CustomButton
          name={loading ? "Loggin in.." : "Login"}
          onClick={handleLogin}
          className="w-full border h-[3rem] mt-5 rounded-md color text-white"
        />

        <div className="flex justify-center gap-1 mt-2 items-center">
          <p>Don&apos;t have an account?</p>
          <a
            onClick={() => router.push("/auth/register")}
            className="text-blue-800"
          >
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;

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

const Register = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const showToast = useCustomToast();

  const router = useRouter();
  /**
   * This is function for triggering login. Once the login is success the user is redirected to dashboard
   */
  const handleRegister = async () => {
    try {
      if (userDetails.password.length < 4) {
        showToast("Password must be 4 digits long", "error");
      }
      setLoading(true);
      const res = await axios.post(`${API_URL}/api/user/register`, {
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        email: userDetails.email.toLowerCase(),
        password: userDetails.password,
      });
      if (res.data.success === true) {
        showToast("Registration successfull");
        setLoading(false);
        router.push("/auth/login");
      }
    } catch (error: any) {
      console.error(error);
      showToast(error.response.data.message, "error");
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center h-screen flex-col items-center">
      <Image alt="logo" src={Logo} height={"80"} width={"100"} />
      <p className="text-[1.4rem] font-bold justify-center flex">
        Expense Tracker
      </p>
      <p className="text-[1rem] font-semibold flex justify-center">
        Create your account
      </p>
      <div className=" p-4 w-full mx-10">
        <CustomInput
          name={"First Name"}
          className={"h-[2.8rem] border w-full rounded-md"}
          value={userDetails.firstName}
          onChange={(e) =>
            setUserDetails({ ...userDetails, firstName: e.target.value })
          }
        />
        <CustomInput
          name={"Last Name"}
          className={"h-[2.8rem] border w-full rounded-md"}
          value={userDetails.lastName}
          onChange={(e) =>
            setUserDetails({ ...userDetails, lastName: e.target.value })
          }
        />
        <CustomInput
          name={"Email"}
          className={"h-[2.8rem] border w-full rounded-md"}
          value={userDetails.email}
          onChange={(e) =>
            setUserDetails({ ...userDetails, email: e.target.value })
          }
        />

        <CustomInput
          name={"Password"}
          type="password"
          className={"h-[2.8rem] border w-full rounded-md"}
          value={userDetails.password}
          onChange={(e) =>
            setUserDetails({ ...userDetails, password: e.target.value })
          }
        />
        <CustomButton
          name={loading ? "Registering..." : "Register"}
          onClick={handleRegister}
          className="w-full border h-[3rem] mt-5 rounded-md bg-slate-800 text-white"
        />

        <div className="flex justify-center gap-1 mt-1 items-center">
          <p>Already have an account?</p>
          <a
            onClick={() => router.push("/auth/login")}
            className="text-blue-800"
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;

"use client";
import React, { useContext, useEffect, useState } from "react";
import { ExpenseContext } from "../context/context";
import { IoIosLogOut } from "react-icons/io";
import { useRouter } from "next/navigation";
import Logo from "../assets/Logo.png";
import Image from "next/image";

const Navbar = () => {
  const { user: _user }: any = useContext(ExpenseContext);
  const [user, setUser] = useState<any>({});
  useEffect(() => {
    if (_user) {
      setUser(_user);
    }
  }, [_user]);

  const router = useRouter();
  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      router.push("/");
    }
  };

  return (
    <div className="sticky top-0 text-white color flex justify-between items-center z-10  h-[6rem] ">
      <div className="h-[5rem] w-[5rem] bg-slate-200 rounded-[50%] flex items-center justify-center border m-2 text-white">
        {Object.keys(user).length > 0 && (
          <p className="text-[2rem] font-bold text-black">
            {user?.firstName[0]}
            {user.lastName[0]}
          </p>
        )}
      </div>
      <Image src={Logo} alt="logo" className="h-[5rem] w-[10rem] opacity-30" />
      <div
        onClick={handleLogout}
        className="flex flex-col cursor-pointer justify-center items-center mr-2"
      >
        <IoIosLogOut size={30} />
        <p>Logout</p>
      </div>
    </div>
  );
};

export default Navbar;

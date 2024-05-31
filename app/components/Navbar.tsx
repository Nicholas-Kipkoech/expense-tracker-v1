"use client";
import React, { useContext, useEffect, useState } from "react";
import { ExpenseContext } from "../context/context";

const Navbar = () => {
  const { user: _user }: any = useContext(ExpenseContext);
  const [user, setUser] = useState<any>({});
  useEffect(() => {
    if (_user) {
      setUser(_user);
    }
  }, [_user]);

  return (
    <div className="sticky top-0 text-white bg-[#092332] flex justify-between items-center z-10  h-[6rem] ">
      <div className="h-[5rem] w-[5rem] bg-slate-200 rounded-[50%] flex items-center justify-center border m-2 text-white">
        <p className="text-[2rem] font-bold text-black">
          {user?.firstName[0]}
          {user.lastName[0]}
        </p>
      </div>
    </div>
  );
};

export default Navbar;

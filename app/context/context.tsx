"use client";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const ExpenseContext = createContext({});

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<any>({});
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    function getUser() {
      const accessToken: string | any = localStorage.getItem("access_token");
      const decodedToken: any = jwtDecode(accessToken);
      setUser(decodedToken.payload);
    }

    getUser();
  }, []);

  useEffect(() => {
    async function getExpenses() {
      if (user) {
        const res = await axios.get(`/api/expenses?userId=${user._id}`);
        setExpenses(res.data.expenses);
      }
    }
    getExpenses();
  }, [user]);

  return (
    <ExpenseContext.Provider value={{ user, expenses }}>
      {children}
    </ExpenseContext.Provider>
  );
};

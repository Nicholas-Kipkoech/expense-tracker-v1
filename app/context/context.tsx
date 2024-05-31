"use client";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { API_URL } from "../config/config";

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
      const token: any = localStorage.getItem("access_token");
      const decodedPayload: any = jwtDecode(token);
      setUser(decodedPayload.payload);
    }
    getUser();
  }, []);

  useEffect(() => {
    async function getExpenses() {
      if (user && user._id) {
        const res = await axios.get(
          `${API_URL}/api/expenses?userId=${user._id}`
        );
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

"use client";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { API_URL } from "../config/config";
import { fetchExpenses } from "../services/apiServices";

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

  async function getExpenses() {
    const res = await fetchExpenses();
    setExpenses(res.expenses);
  }
  useEffect(() => {
    getExpenses();
  }, [user]);

  return (
    <ExpenseContext.Provider value={{ user, expenses, getExpenses }}>
      {children}
    </ExpenseContext.Provider>
  );
};

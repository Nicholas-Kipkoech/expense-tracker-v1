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

  return (
    <ExpenseContext.Provider value={{ user, expenses }}>
      {children}
    </ExpenseContext.Provider>
  );
};

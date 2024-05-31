import { PrivateAxiosUtility } from "./axiosUtility";

export const addExpense = async (data: any) => {
  const res = await PrivateAxiosUtility.post(`/api/expenses/add`, data);
  return res.data;
};

export const fetchExpenses = async () => {
  const res = await PrivateAxiosUtility.get(`/api/expenses/fetch`);
  return res.data;
};

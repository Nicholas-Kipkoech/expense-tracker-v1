import { PrivateAxiosUtility } from "./axiosUtility";

export const addExpense = async (data: any) => {
  const res = await PrivateAxiosUtility.post(`/api/expenses/add`, data);
  return res.data;
};
export const addEarning = async (data: any) => {
  const res = await PrivateAxiosUtility.post(`/api/earnings/add`, data);
  return res.data;
};
export const fetchExpenses = async () => {
  const res = await PrivateAxiosUtility.get(`/api/expenses/fetch`);
  return res.data;
};
export const fetchEarning = async () => {
  const res = await PrivateAxiosUtility.get(`/api/earnings/fetch`);
  return res.data;
};

export const deleteExpense = async (expenseId: string) => {
  const res = await PrivateAxiosUtility.delete(`/api/expenses/${expenseId}`);
  return res.data;
};

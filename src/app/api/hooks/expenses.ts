import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { REACT_QUERY_TAGS } from "./constants";
import { Expense } from "../types/types";
import { ExpenseFormData } from "@/app/components/ExpenseForm";

const fetchExpenses = async (fromToday = false) => {
  const res = await fetch(`/api/expenses${fromToday ? "?fromToday=true" : ""}`);
  if (!res.ok) throw new Error("Error while fetching expenses");
  return res.json();
};

export const useExpenses = (
  params: { fromToday: boolean } = { fromToday: false }
) => {
  return useQuery<Expense[]>({
    queryKey: [REACT_QUERY_TAGS.EXPENSES],
    queryFn: () => fetchExpenses(params.fromToday),
    staleTime: 0,
    gcTime: 0,
  });
};

const postExpense = async (newExpense: ExpenseFormData) => {
  const res = await fetch("/api/expenses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newExpense),
  });
  if (!res.ok) throw new Error("Error while posting expense");
  return res.json();
};

export const useAddExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [REACT_QUERY_TAGS.EXPENSES] });
    },
  });
};

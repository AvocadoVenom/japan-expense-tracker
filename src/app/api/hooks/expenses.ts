import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { REACT_QUERY_TAGS } from "./constants";

async function fetchExpenses() {
  const res = await fetch("/api/expenses");
  if (!res.ok) throw new Error("Erreur lors du fetch des dépenses");
  return res.json();
}

export function useExpenses() {
  return useQuery({
    queryKey: [REACT_QUERY_TAGS.EXPENSES],
    queryFn: fetchExpenses,
  });
}

async function addExpense(newExpense: any) {
  const res = await fetch("/api/expenses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newExpense),
  });
  if (!res.ok) throw new Error("Erreur lors de l’ajout");
  return res.json();
}

export function useAddExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [REACT_QUERY_TAGS.EXPENSES] });
    },
  });
}

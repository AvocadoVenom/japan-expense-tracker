import { useQuery } from "@tanstack/react-query";
import { REACT_QUERY_TAGS } from "./constants";
import { ExpenseCategory } from "../types/types";

const fetchExpenseCategories = async (): Promise<ExpenseCategory[]> => {
  const res = await fetch("/api/expense-categories");
  if (!res.ok)
    throw new Error("Erreur lors du fetch des catégorie de dépenses");
  return res.json() ?? [];
};

export function useExpenseCategories() {
  return useQuery({
    queryKey: [REACT_QUERY_TAGS.EXPENSE_CATEGORIES],
    queryFn: fetchExpenseCategories,
  });
}

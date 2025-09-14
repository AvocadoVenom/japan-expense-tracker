import { useQuery } from "@tanstack/react-query";
import { REACT_QUERY_TAGS } from "./constants";
import { DailyExpenseRule } from "../types/types";

const fetchExpenseRules = async (): Promise<DailyExpenseRule[]> => {
  const res = await fetch("/api/daily-expense-rules");
  if (!res.ok) throw new Error("Error while fetching daily expense rules");
  return res.json() ?? [];
};

export function useExpenseRules() {
  return useQuery({
    queryKey: [REACT_QUERY_TAGS.EXPENSE_RULES],
    queryFn: fetchExpenseRules,
  });
}

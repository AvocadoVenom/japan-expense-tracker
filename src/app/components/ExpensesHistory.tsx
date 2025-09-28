"use client";

import { useExpenses } from "../api/hooks/expenses";
import { Expense as ExpenseModel } from "../api/types/types";
import { useExpenseRules } from "../api/hooks/expense-rules";
import { ExpensesSummary } from "./ExpensesSummary";

type GroupedExpenses = {
  date: string;
  expenses: ExpenseModel[];
};

export const ExpensesHistory = () => {
  const { data: expenses, status: loadingExpensesStatus } = useExpenses();
  const { data: rules, status: loadingRulesStatus } = useExpenseRules();

  if (loadingRulesStatus !== "success" || loadingExpensesStatus !== "success")
    return "Loading expenses & rules...";

  const groupedByDate = (expenses ?? [])
    .map<[string, ExpenseModel]>((exp) => [normalizeDate(exp.timestamp), exp])
    .reduce<GroupedExpenses[]>((groups, [date, expense]) => {
      const groupByDate = groups.find((g) => g.date === date);
      if (!groupByDate) {
        groups.push({
          date,
          expenses: [expense],
        });
      } else {
        groupByDate.expenses.push(expense);
      }
      return groups;
    }, [])
    .sort((a, b) => {
      if (new Date(a.date).getTime() > new Date(b.date).getTime()) return -1;
      if (new Date(a.date).getTime() <= new Date(b.date).getTime()) return 1;
      return 0;
    });

  return (
    <div className="flex flex-col gap-2 content-stretch w-full">
      {groupedByDate.map((group) => (
        <div key={group.date} className="flex flex-col gap-2 content-stretch">
          <label htmlFor={group.date} className="text-white">
            {group.date}
          </label>
          <div className="flex flex-col gap-2 content-stretch">
            <ExpensesSummary expenses={group.expenses} rules={rules} isPast />
          </div>
        </div>
      ))}
    </div>
  );
};

const normalizeDate = (timestamp: string | Date): string => {
  const date = typeof timestamp === "string" ? new Date(timestamp) : timestamp;
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
};

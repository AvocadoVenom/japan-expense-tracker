"use client";

import { Expense as ExpenseModel } from "@/app/api/types/types";

export const Expense = ({ expense }: { expense: ExpenseModel }) => {
  return (
    <div className="flex w-full gap-4">
      <small>{expense.expenseCategory?.name ?? "NA"}</small>
      <code>{expense.amount}</code>
    </div>
  );
};

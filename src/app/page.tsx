"use client";

import { useExpenseRules } from "./api/hooks/expense-rules";
import { useAddExpense, useExpenses } from "./api/hooks/expenses";
import { ExpenseForm, ExpenseFormData } from "./components/ExpenseForm";
import { ExpensesSummary } from "./components/ExpensesSummary";

export default function Home() {
  const { data: todayExpenses, status: expensesFetchingStatus } = useExpenses({
    fromToday: true,
  });
  const { data: rules, status: rulesFetchingStatus } = useExpenseRules();
  const { mutate: addExpense } = useAddExpense();

  if (
    expensesFetchingStatus === "success" &&
    rulesFetchingStatus === "success"
  ) {
    return (
      <main className="flex flex-col gap-[28px] items-center">
        <ExpenseForm
          onExpenseSubmitted={async (formData: ExpenseFormData) => {
            await addExpense(formData);
          }}
        />
        <ExpensesSummary expenses={todayExpenses} rules={rules} />
      </main>
    );
  }

  return "Loading expenses & rules...";
}

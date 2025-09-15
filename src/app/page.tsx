"use client";

import { useState } from "react";
import { useExpenseRules } from "./api/hooks/expense-rules";
import { useAddExpense, useExpenses } from "./api/hooks/expenses";
import { ExpenseForm, ExpenseFormData } from "./components/ExpenseForm";
import { ExpensesSummary } from "./components/ExpensesSummary";
import { Toast } from "@/app/components/atoms/Toast";

export default function Home() {
  const { data: todayExpenses, status: expensesFetchingStatus } = useExpenses({
    fromToday: true,
  });
  const { data: rules, status: rulesFetchingStatus } = useExpenseRules();
  const { mutate: addExpense } = useAddExpense();
  const [toast, setToast] = useState<string | null>(null);

  if (
    expensesFetchingStatus === "success" &&
    rulesFetchingStatus === "success"
  ) {
    return (
      <main className="flex flex-col gap-[28px] items-center">
        <ExpenseForm
          onExpenseSubmitted={async (formData: ExpenseFormData) => {
            await addExpense(formData);
            setToast("Expense saved ✅");
          }}
        />
        <ExpensesSummary expenses={todayExpenses} rules={rules} />
        {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      </main>
    );
  }

  return "Loading expenses & rules...";
}

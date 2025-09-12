"use client";

import { useEffect, useState } from "react";
import { Expense as ExpenseModel } from "../api/types/types";
import { Expense } from "./atoms/Expense";

export default function ExpenseList() {
  const [expenses, setExpenses] = useState<ExpenseModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/expenses?fromToday=true")
      .then((res) => res.json())
      .then((data) => setExpenses(data))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="flex flex-col content-stretch">
      {isLoading
        ? "Loading expenses..."
        : expenses.map((exp) => <Expense key={exp.id} expense={exp} />)}
    </div>
  );
}

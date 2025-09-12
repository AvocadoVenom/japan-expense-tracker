"use client";

import { useEffect, useState } from "react";
import { Expense as ExpenseModel } from "../api/types/types";
import { Expense } from "./atoms/Expense";

export default function ExpenseList() {
  const [expenses, setExpenses] = useState<ExpenseModel[]>([]);

  useEffect(() => {
    fetch("/api/expenses?fromToday=true")
      .then((res) => res.json())
      .then((data) => setExpenses(data));
  }, []);

  return (
    <div className="flex flex-col content-stretch">
      {expenses.map((exp) => (
        <Expense key={exp.id} expense={exp} />
      ))}
    </div>
  );
}

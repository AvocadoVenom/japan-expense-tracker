"use client";

import { useEffect, useState } from "react";
import { ExpenseCategory } from "../api/types/types";

export default function ExpenseCategoryList() {
  const [expenseCategories, setExpenseCategories] = useState<ExpenseCategory[]>(
    []
  );

  useEffect(() => {
    fetch("/api/expense-categories")
      .then((res) => res.json())
      .then((data) => setExpenseCategories(data));
  }, []);

  return (
    <ul>
      {expenseCategories.map((ec) => (
        <li key={ec.id}>{ec.name}</li>
      ))}
    </ul>
  );
}

"use client";

import { useEffect, useState } from "react";
import { DailyExpenseRule } from "../api/types/types";

export default function DailyExpenseRuleList() {
  const [expenseRules, setExpenseRules] = useState<DailyExpenseRule[]>([]);

  useEffect(() => {
    fetch("/api/daily-expense-rules")
      .then((res) => res.json())
      .then((data) => setExpenseRules(data));
  }, []);

  return (
    <ul>
      {expenseRules.map((ec) => (
        <li key={ec.id}>
          {ec.expenseCategory?.name}: ¥{ec.maxAmount}
        </li>
      ))}
    </ul>
  );
}

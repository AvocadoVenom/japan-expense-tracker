"use client";

import { useEffect, useState } from "react";
import { DailyExpenseRule } from "../api/types/types";
import { CategoryTag } from "./atoms/CategoryTag";

export default function DailyExpenseRuleList() {
  const [expenseRules, setExpenseRules] = useState<DailyExpenseRule[]>([]);

  useEffect(() => {
    fetch("/api/daily-expense-rules")
      .then((res) => res.json())
      .then((data) => setExpenseRules(data));
  }, []);

  return (
    <div className="flex flex-col gap-2 content-stretch">
      {expenseRules.map((ec) => (
        <div className="flex gap-3 items-center">
          <CategoryTag key={ec.id} category={ec.expenseCategory?.name} />
          <span>¥{ec.maxAmount}</span>
        </div>
      ))}
    </div>
  );
}

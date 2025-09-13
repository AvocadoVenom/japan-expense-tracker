"use client";

import { useEffect, useState } from "react";
import { DailyExpenseRule, Expense as ExpenseModel } from "../api/types/types";
import { ProgressBar } from "./atoms/ProgressBar";
import { Tag } from "./atoms/Tag";

type ThresholdState = DailyExpenseRule & {
  consumed: number;
  progress: number;
  color: string;
};

export default function ExpensesSummary() {
  const [expenses, setExpenses] = useState<ExpenseModel[]>([]);
  const [expensesFetched, setExpensesFetched] = useState(false);
  const [expenseRules, setExpenseRules] = useState<DailyExpenseRule[]>([]);
  const [expenseRulesFetched, setExpenseRulesFetched] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/daily-expense-rules")
        .then((res) => res.json())
        .then((data) => {
          setExpenseRules(data);
          setExpenseRulesFetched(true);
        }),
      fetch("/api/expenses?fromToday=true")
        .then((res) => res.json())
        .then((data) => {
          setExpenses(data);
          setExpensesFetched(true);
        }),
    ]);
  }, []);

  const [thresholdStates, setThresholdStates] = useState<ThresholdState[]>([]);
  useEffect(() => {
    setThresholdStates(
      expenseRules.reduce<ThresholdState[]>((states, rule) => {
        const allocatedExpenses = expenses.filter(
          (e) => e.expenseCategory?.id === rule.expenseCategory?.id
        );
        const consumed = allocatedExpenses.reduce(
          (sum, exp) => (sum += exp.amount),
          0
        );

        states.push({
          ...rule,
          consumed,
          progress: (consumed / rule.maxAmount) * 100,
          color: getColor(rule.expenseCategory?.name ?? ""),
        });

        return states;
      }, [])
    );

    setIsLoading(false);
  }, [expenseRulesFetched && expensesFetched]);

  return (
    <div className="flex flex-col content-stretch w-full">
      {isLoading ? (
        "Loading data..."
      ) : (
        <div className="flex flex-col gap-2 content-stretch">
          {thresholdStates.map((state) => {
            return (
              <div
                key={state.id}
                className="flex flex-col gap-1 content-stretch"
              >
                <div className="flex gap-4 items-center">
                  <Tag
                    text={state.expenseCategory?.name ?? "NA"}
                    color={state.color}
                  />
                  <span>¥{state.consumed}</span>
                </div>
                <ProgressBar
                  progress={state.progress}
                  color={computeColor(state.progress)}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const computeColor = (
  progress: number
): "bg-green-400" | "bg-blue-400" | "bg-red-400" | "bg-purple-400" => {
  if (progress < 50) {
    return "bg-blue-400";
  } else if (progress < 75) {
    return "bg-green-400";
  } else if (progress < 100) {
    return "bg-red-400";
  }
  return "bg-purple-400";
};

const getColor = (categoryName: string) => {
  if (categoryName === "Food") {
    return "bg-red-400";
  } else if (categoryName === "Leasure") {
    return "bg-teal-400";
  }
  return "bg-stone-400";
};

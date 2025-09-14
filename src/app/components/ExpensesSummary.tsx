"use client";

import { DailyExpenseRule, Expense as ExpenseModel } from "../api/types/types";
import { ProgressBar } from "./atoms/ProgressBar";
import { CategoryTag } from "./atoms/CategoryTag";

type Props = {
  rules: DailyExpenseRule[];
  expenses: ExpenseModel[];
  isPast?: boolean;
};

type ThresholdState = DailyExpenseRule & {
  consumed: number;
  progress: number;
};

export const ExpensesSummary = ({ rules, expenses, isPast = false }: Props) => {
  let maxAllowed = 0;
  let totalConsumed = 0;

  const thresholdStates = rules.reduce<ThresholdState[]>((states, rule) => {
    maxAllowed += rule.maxAmount;
    const allocatedExpenses = expenses.filter(
      (e) => e.expenseCategory?.id === rule.expenseCategory?.id
    );
    const consumed = allocatedExpenses.reduce(
      (sum, exp) => (sum += exp.amount),
      0
    );
    totalConsumed += consumed;

    states.push({
      ...rule,
      consumed,
      progress: (consumed / rule.maxAmount) * 100,
    });

    return states;
  }, []);

  return (
    <div
      className={`flex flex-col content-stretch w-full ${
        isPast ? "border border-stone-600 border-2 rounded-xl p-4" : ""
      }`}
    >
      <div className="flex flex-col gap-2 content-stretch">
        {!isPast ? (
          <>
            <div className="flex flex-col gap-1 content-stretch">
              <div className="flex gap-4 items-center">
                <h3>Remaining</h3>
                <span>¥{Math.max(0, maxAllowed - totalConsumed)}</span>
              </div>
              <ProgressBar
                progress={(totalConsumed / maxAllowed) * 100}
                color={computeColor(totalConsumed)}
              />
            </div>
            <hr className="my-2 border-stone-600 border" />
          </>
        ) : maxAllowed - totalConsumed > 0 ? (
          <strong className="text-green-600">
            Remained: ¥{maxAllowed - totalConsumed}
          </strong>
        ) : (
          <strong className="text-red-400">
            Exceeded: ¥{Math.abs(maxAllowed - totalConsumed)}
          </strong>
        )}
        {thresholdStates.map((state) => {
          return (
            <div key={state.id} className="flex flex-col gap-1 content-stretch">
              <div className="flex gap-4 items-center">
                <CategoryTag category={state.expenseCategory?.name} />
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
    </div>
  );
};

const computeColor = (
  progress: number
): "bg-green-400" | "bg-blue-400" | "bg-red-700" | "bg-purple-400" => {
  if (progress < 50) {
    return "bg-blue-400";
  } else if (progress < 75) {
    return "bg-green-400";
  } else if (progress < 100) {
    return "bg-red-700";
  }
  return "bg-purple-400";
};

"use client";

import { DailyExpenseRule, Expense as ExpenseModel } from "../api/types/types";
import { ProgressBar } from "./atoms/ProgressBar";
import { CategoryTag } from "./atoms/CategoryTag";
import { useState } from "react";
import { Modal } from "./atoms/Modal";
import { Expense } from "./atoms/Expense";
import { format } from "date-fns";
import { SummaryStatement } from "./atoms/SummaryStatement";

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

  const [open, setOpen] = useState(false);
  const [expenseListDetails, setExpenseListDetails] = useState<ExpenseModel[]>(
    []
  );

  return (
    <>
      <div
        className={`flex flex-col content-stretch w-full ${
          isPast ? "border border-stone-600 border-2 rounded-xl p-4" : ""
        }`}
      >
        <div className="flex flex-col gap-2 content-stretch">
          {!isPast ? (
            <>
              <div className="flex flex-col gap-1 content-stretch">
                <div
                  className="flex gap-4 items-center"
                  onClick={() => {
                    setExpenseListDetails(expenses);
                    setOpen(true);
                  }}
                >
                  <SummaryStatement
                    allowed={maxAllowed}
                    consumed={totalConsumed}
                  />
                </div>
                <ProgressBar
                  progress={(totalConsumed / maxAllowed) * 100}
                  colors={{
                    main: computeColor(totalConsumed),
                    text:
                      (totalConsumed / maxAllowed) * 100 > 85
                        ? "text-white"
                        : "text-gray-600",
                  }}
                  text={`¥${Math.max(0, maxAllowed - totalConsumed)}`}
                />
              </div>
              <hr className="my-2 border-stone-600 border" />
            </>
          ) : (
            <SummaryStatement
              allowed={maxAllowed}
              consumed={totalConsumed}
              isPast
            />
          )}
          {thresholdStates.map((state) => {
            return (
              <div key={state.id} className="flex gap-2 items-center">
                <div
                  className="flex gap-2 items-center"
                  onClick={() => {
                    setExpenseListDetails(
                      expenses.filter(
                        (exp) =>
                          exp.expenseCategory?.id === state.expenseCategory?.id
                      )
                    );
                    setOpen(true);
                  }}
                >
                  <CategoryTag category={state.expenseCategory?.name} />
                </div>
                <ProgressBar
                  className="grow"
                  progress={state.progress}
                  colors={{
                    main: computeColor(state.progress),
                    text: state.progress > 85 ? "text-white" : "text-gray-600",
                  }}
                  text={`¥${state.consumed}`}
                />
              </div>
            );
          })}
        </div>
      </div>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <h2 className="text-xl font-bold mb-2">Expense details</h2>
        <div className="flex flex-col content-stretch gap-2">
          {expenseListDetails.map((exp) => (
            <div className="flex items-center gap-2">
              <p className="text-nowrap min-w-[35%]">
                {format(exp.timestamp, "MM-dd HH:mm")}
              </p>
              <Expense expense={exp} />
            </div>
          ))}
        </div>
      </Modal>
    </>
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

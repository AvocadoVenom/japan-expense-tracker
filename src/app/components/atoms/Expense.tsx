import { Expense as ExpenseModel } from "@/app/api/types/types";
import { CategoryTag } from "./CategoryTag";

export const Expense = ({ expense }: { expense: ExpenseModel }) => {
  return (
    <div className="flex w-full gap-2">
      <CategoryTag category={expense.expenseCategory?.name} />
      <span>¥{expense.amount}</span>
    </div>
  );
};

import { CategoryTag } from "./atoms/CategoryTag";
import { useExpenseRules } from "../api/hooks/expense-rules";

export const DailyExpenseRuleList = () => {
  const { data: expenseRules, isLoading } = useExpenseRules();

  if (isLoading) {
    return <h1>Loading data...</h1>;
  }

  return (
    <div className="flex flex-col gap-2 content-stretch">
      {(expenseRules ?? []).map((rule) => (
        <div key={rule.id} className="flex gap-3 items-center">
          <CategoryTag key={rule.id} category={rule.expenseCategory?.name} />
          <span>¥{rule.maxAmount}</span>
        </div>
      ))}
    </div>
  );
};

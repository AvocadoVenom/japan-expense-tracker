import { DailyExpenseRuleList } from "../components/DailyExpenseRuleList";

export default function Settings() {
  return (
    <main className="p-4 flex flex-col gap-[32px] items-center">
      <h1 className="uppercase">Daily expense rules</h1>
      <DailyExpenseRuleList />
    </main>
  );
}

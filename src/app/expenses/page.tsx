import { ExpensesHistory } from "../components/ExpensesHistory";

export default function Expenses() {
  return (
    <main className="p-4 flex flex-col gap-[16px] items-center">
      <h1 className="uppercase">Expenses</h1>
      <ExpensesHistory />
    </main>
  );
}

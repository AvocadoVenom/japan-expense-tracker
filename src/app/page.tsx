"use client";

import { ExpenseForm } from "./components/ExpenseForm";
import ExpensesSummary from "./components/ExpensesSummary";

export default function Home() {
  return (
    <main className="flex flex-col gap-[28px] items-center">
      <ExpenseForm />
      <ExpensesSummary />
    </main>
  );
}

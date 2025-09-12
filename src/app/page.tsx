"use client";

import { ExpenseForm } from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

export default function Home() {
  return (
    <main className="flex flex-col gap-[32px] items-center">
      <ExpenseForm />
      <ExpenseList />
    </main>
  );
}

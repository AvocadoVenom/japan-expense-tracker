"use client";

import { useEffect, useState } from "react";
import { ExpenseCategory } from "../api/types/types";

export const ExpenseForm = () => {
  const [expenseCategories, setExpenseCategories] = useState<ExpenseCategory[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/expense-categories")
      .then((res) => res.json())
      .then((data) => setExpenseCategories(data))
      .finally(() => setIsLoading(false));
  }, []);

  const [formData, setFormData] = useState({
    expenseCategory: "",
    amount: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          expenseCategory: formData.expenseCategory,
          amount: Number(formData.amount),
        }),
      });

      if (!res.ok) throw new Error("Erreur API");

      console.log("Dépense enregistrée ✅");
    } catch (err) {
      console.error("Erreur submit:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full p-4 bg-stone-900 border border-stone-600 border-2 rounded-xl"
    >
      <h2 className="uppercase text-xl">Register new expense</h2>
      <div className="flex flex-col gap-2">
        <label className="font-medium">Expense Category</label>
        <div className="flex flex-col gap-1">
          {isLoading
            ? "Loading categories..."
            : expenseCategories.map((cat) => (
                <label key={cat.id} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="expenseCategory"
                    value={cat.id}
                    checked={formData.expenseCategory === cat.id}
                    onChange={handleChange}
                    className="accent-blue-600"
                    required
                  />
                  {cat.name}
                </label>
              ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="font-medium">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Entrez le montant"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white rounded-lg py-2 px-4 hover:bg-blue-700 transition"
      >
        Save
      </button>
    </form>
  );
};

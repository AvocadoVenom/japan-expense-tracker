"use client";

import { useState } from "react";
import { useExpenseCategories } from "../api/hooks/expense-categories";

export const ExpenseForm = () => {
  const { data: expenseCategories, isLoading: isFetchingExpenseCategories } =
    useExpenseCategories();

  const initialFormData = {
    expenseCategory: "",
    amount: "",
  };
  const [formData, setFormData] = useState(initialFormData);

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

      setFormData(initialFormData);
    } catch (err) {
      console.error("Erreur submit:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 w-full p-4 bg-stone-900 border border-stone-600 border-2 rounded-xl"
    >
      <h2 className="uppercase text-xl">Register new expense</h2>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          {isFetchingExpenseCategories ? (
            "Loading categories..."
          ) : (
            <div className="flex content-stretch space-between gap-3">
              {(expenseCategories ?? []).map((cat) => (
                <label key={cat.id}>
                  <input
                    type="radio"
                    name="expenseCategory"
                    value={cat.id}
                    checked={formData.expenseCategory === cat.id}
                    onChange={handleChange}
                    className="peer hidden"
                    required
                  />
                  <span
                    className="
          inline-block cursor-pointer rounded-lg border border-gray-600 
          px-4 py-2 text-sm font-medium text-gray-300
          transition peer-checked:bg-blue-600 peer-checked:text-white
        "
                  >
                    {cat.name}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Amount"
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

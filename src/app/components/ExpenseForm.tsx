"use client";

import { useEffect, useState } from "react";
import { ExpenseCategory } from "../api/types/types";

export const ExpenseForm = () => {
  const [expenseCategories, setExpenseCategories] = useState<ExpenseCategory[]>(
    []
  );

  useEffect(() => {
    fetch("/api/expense-categories")
      .then((res) => res.json())
      .then((data) => setExpenseCategories(data));
  }, []);

  const [formData, setFormData] = useState({
    expenseCategory: "",
    amount: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const payload = {
      expenseCategory: formData.expenseCategory,
      amount: Number(formData.amount),
      timestamp: new Date().getTime(),
    };

    console.log("Form submitted:", payload);
    // Ici tu peux faire un addDoc(collection(db, "expenses"), payload)
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-4 max-w-md mx-auto bg-white rounded-2xl shadow"
    >
      <div className="flex flex-col gap-2">
        <label className="font-medium">Catégorie</label>
        <div className="flex flex-col gap-1">
          {expenseCategories.map((cat) => (
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
          Montant
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
        Enregistrer
      </button>
    </form>
  );
};

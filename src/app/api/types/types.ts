export interface ExpenseCategory {
  id: string;
  name: string;
}

export interface Expense {
  id: string;
  amount: number;
  timestamp: Date;
  expenseCategory?: ExpenseCategory;
}

export interface DailyExpenseRule {
  id: string;
  maxAmount: number;
  expenseCategory?: ExpenseCategory;
}

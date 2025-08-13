import type { Doc } from "./Doc";

export interface Expense extends Doc {
  amount: number;
  expenseDate: Date;
  [ExpenseGroup.Category]: Doc;
  [ExpenseGroup.Source]: Doc;
}

export enum ExpenseGroup {
  Category = "category",
  Source = "source",
}

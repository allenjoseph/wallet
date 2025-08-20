import type { Doc } from "./Doc";

export interface Expense extends Doc {
  amount: number;
  expenseDate: Date;
  [TagGroup.Category]: Doc;
  [TagGroup.Source]: Doc;
}

export type Tag = string;

export enum TagGroup {
  Category = "category",
  Source = "source",
}

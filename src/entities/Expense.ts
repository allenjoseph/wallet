import type { Doc } from "./Doc";

export interface Expense extends Doc {
  amount: number;
  expenseDate: Date;
  [TagGroup.Category]: Doc;
  [TagGroup.Source]: Doc;
  numberOfTimes?: number;
}

export enum TagGroup {
  Category = "category",
  Source = "source",
}

export type Tag = string;

export interface Filter {
  name: TagGroup;
  id: string;
}

export interface BaseDoc {
  id?: string;
  name: string;
  description: string;
  datetime?: Date;
}

export interface Expense extends BaseDoc {
  amount: number;
  expenseDate: Date;
  category: BaseDoc;
  source: BaseDoc;
}

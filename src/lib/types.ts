export interface Route {
  title: string;
  path: string;
  Icon: any;
  routeAdd?: Route;
}

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

export enum ExpenseFilter {
  Source = "source",
  Category = "category",
}

export interface Filter {
  name: ExpenseFilter;
  id: string;
}

export interface ChartSerie {
  name: string;
  data: number[];
}

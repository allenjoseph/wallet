import type { ExpenseGroup } from "../entities";

export interface Route {
  title: string;
  path: string;
  Icon: any;
  routeAdd?: Route;
}

export interface Filter {
  name: ExpenseGroup;
  id: string;
}

export interface ChartSerie {
  name: string;
  data: number[];
}

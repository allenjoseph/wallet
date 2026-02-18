import {
  ChartNoAxesCombined,
  CreditCard,
  HandCoins,
  PiggyBank,
  ShoppingCart,
} from "lucide-svelte";
import type { Route } from "./entities";

const expenses: Route = {
  title: "Expenses",
  path: "expenses",
  Icon: PiggyBank,
  routeAdd: { title: "Expense", path: "expense", Icon: HandCoins } as Route,
  view: "Expenses",
};

const category: Route = {
  title: "Category",
  path: "category",
  Icon: ShoppingCart,
  view: "Categories",
};

const source: Route = {
  title: "Source",
  path: "source",
  Icon: CreditCard,
  view: "Sources",
};

const charts: Route = {
  title: "Charts",
  path: "charts",
  Icon: ChartNoAxesCombined,
  view: "Charts",
};

export const routes = { expenses, category, source, charts };

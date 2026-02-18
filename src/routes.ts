import {
  ChartNoAxesCombined,
  CreditCard,
  HandCoins,
  PiggyBank,
  ShoppingCart,
} from "lucide-svelte";
import type { Route } from "./entities";

const expense: Route = {
  title: "Expense",
  path: "expense",
  Icon: HandCoins,
  view: "Expense",
};

const expenses: Route = {
  title: "Expenses",
  path: "expenses",
  Icon: PiggyBank,
  routeAdd: expense,
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

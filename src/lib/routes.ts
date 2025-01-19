import { CreditCard, HandCoins, PiggyBank, ShoppingCart } from "lucide-svelte";
import type { Route } from "./types";

export const routes = {
  expenses: {
    title: "Expenses",
    path: "expenses",
    Icon: PiggyBank,
    routeAdd: { title: "Expense", path: "expense", Icon: HandCoins } as Route,
  } as Route,
  category: {
    title: "Category",
    path: "category",
    Icon: ShoppingCart,
  } as Route,
  source: { title: "Source", path: "source", Icon: CreditCard } as Route,
};

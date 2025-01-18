import type { UserInfo } from "firebase/auth";
import type { Expense } from "./lib/types";
import { CreditCard, HandCoins, PiggyBank, ShoppingCart } from "lucide-svelte";

export interface Menu {
  title: string;
  path: string;
  Icon: any;
  menuAdd?: Menu;
}

type MenuPath = "expenses" | "category" | "source";

export const routes: Record<MenuPath, Menu> = {
  expenses: {
    title: "Expenses",
    path: "expenses",
    Icon: PiggyBank,
    menuAdd: { title: "Expense", path: "expense", Icon: HandCoins },
  },
  category: { title: "Category", path: "category", Icon: ShoppingCart },
  source: { title: "Source", path: "source", Icon: CreditCard },
};

interface WalletState {
  user: UserInfo;
  selectedMenu: Menu;
  selectedExpense: Expense | null;
  isLoading: boolean;
}

export const wallet: WalletState = $state({
  user: JSON.parse(sessionStorage.getItem("wallet_user") ?? "null") as never,
  selectedMenu: routes.expenses,
  selectedExpense: null,
  isLoading: false,
});

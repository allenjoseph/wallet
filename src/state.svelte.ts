import type { UserInfo } from "firebase/auth";
import type { Expense } from "./lib/types";
import { CreditCard, HandCoins, PiggyBank, ShoppingCart } from "lucide-svelte";

export const menu: Record<string, { title: string; menu: string; Icon: any }> =
  {
    expenses: { title: "Expenses", menu: "expenses", Icon: PiggyBank },
    expense: { title: "Expense", menu: "expense", Icon: HandCoins },
    category: { title: "Category", menu: "category", Icon: ShoppingCart },
    source: { title: "Source", menu: "source", Icon: CreditCard },
  };

interface WalletState {
  user: UserInfo;
  menuSeleted: string;
  selectedExpense: Expense | null;
  loading: boolean;
}

export const wallet: WalletState = $state({
  user: JSON.parse(sessionStorage.getItem("wallet_user") ?? "null") as never,
  menuSeleted: "expenses",
  selectedExpense: null,
  loading: false,
});

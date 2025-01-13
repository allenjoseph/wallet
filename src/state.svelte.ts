import type { UserInfo } from "firebase/auth";
import type { Expense } from "./lib/types";
import { CreditCard, HandCoins, PiggyBank, ShoppingCart } from "lucide-svelte";

export const menu: { title: string; menu: string; Icon: any }[] = [
  { title: "Expenses", menu: "expenses", Icon: PiggyBank },
  { title: "Add Expense", menu: "expense", Icon: HandCoins },
  { title: "Add category", menu: "category", Icon: ShoppingCart },
  { title: "Add Source", menu: "source", Icon: CreditCard },
];

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

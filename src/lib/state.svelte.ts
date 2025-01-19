import type { UserInfo } from "firebase/auth";
import type { Expense, Route } from "./types";
import { routes } from "./routes";

interface WalletState {
  user: UserInfo;
  selectedRoute: Route;
  selectedExpense: Expense | null;
  isLoading: boolean;
}

export const wallet: WalletState = $state({
  user: JSON.parse(sessionStorage.getItem("wallet_user") ?? "null") as never,
  selectedRoute: routes.expenses,
  selectedExpense: null,
  isLoading: false,
});

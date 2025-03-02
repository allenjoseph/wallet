import type { UserInfo } from "firebase/auth";
import dayjs, { Dayjs } from "dayjs";
import type { Expense, Route } from "./types";
import { routes } from "./routes";

interface WalletState {
  user: UserInfo;
  selectedRoute: Route;
  selectedExpense: Expense | null;
  isLoading: boolean;
  monthlyPeriodDay: Dayjs;
}

export const wallet: WalletState = $state({
  user: getUser(),
  selectedRoute: routes.expenses,
  selectedExpense: null,
  isLoading: false,
  monthlyPeriodDay: getMonthlyPeriodDay(),
});

function getUser() {
  return JSON.parse(
    sessionStorage.getItem("wallet_user") ?? "null"
  ) as UserInfo;
}

function getMonthlyPeriodDay() {
  const savedDay = localStorage.getItem("monthlyPeriodDay");
  return savedDay ? dayjs(savedDay).startOf("day") : dayjs().startOf("month");
}

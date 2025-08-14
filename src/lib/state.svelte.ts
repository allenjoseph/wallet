import type { UserInfo } from "firebase/auth";
import dayjs, { Dayjs } from "dayjs";
import type { Route } from "./types";
import { routes } from "./routes";
import type { Expense } from "../entities";
import { authService } from "../services";

interface WalletState {
  user: UserInfo;
  selectedRoute: Route;
  selectedExpense: Expense | null;
  isLoading: boolean;
  monthlyPeriodDay: Dayjs;
}

export const wallet: WalletState = $state({
  user: authService.getUser(),
  selectedRoute: routes.expenses,
  selectedExpense: null,
  isLoading: false,
  monthlyPeriodDay: getMonthlyPeriodDay(),
});

function getMonthlyPeriodDay() {
  const savedDay = localStorage.getItem("monthlyPeriodDay");
  return savedDay ? dayjs(savedDay).startOf("day") : dayjs().startOf("month");
}

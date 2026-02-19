import dayjs, { type Dayjs } from "dayjs";
import type { Expense, Route, User } from "./entities";
import { routes } from "./routes";
import { authService } from "./services";

interface WalletState {
  user: User;
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

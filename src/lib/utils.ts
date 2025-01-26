import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

import { Timestamp } from "firebase/firestore";
import { wallet } from "./state.svelte";
import { FilterType, type Expense, type Filter } from "./types";

export function loaderDecorator(cb: () => Promise<any>) {
  return async () => {
    wallet.isLoading = true;
    await cb();
    wallet.isLoading = false;
  };
}

export function toTimestamp(date: Date) {
  return Timestamp.fromDate(date);
}

export function sumMonthPeriod(expenses: Expense[] = [], monthDay: Dayjs) {
  return expenses
    .filter((i) =>
      dayjs(i.expenseDate).isBetween(
        monthDay.startOf("day"),
        monthDay.add(1, "month").endOf("day")
      )
    )
    .reduce((acc, i) => acc + i.amount, 0);
}

export function filterExpenses(expenses: Expense[] = [], filter?: Filter) {
  if (!expenses.length || !filter) {
    return expenses;
  }

  return expenses.filter((o) => {
    if (filter.type === FilterType.Sources) {
      return o.source.id === filter.id;
    }
    if (filter.type === FilterType.Categories) {
      return o.category.id === filter.id;
    }
    return true;
  });
}

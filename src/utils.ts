import dayjs, { type Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

import type { Category, Expense, Filter } from "./entities";
import { wallet } from "./state.svelte";

export function loaderDecorator(cb: () => Promise<void>) {
  return async () => {
    wallet.isLoading = true;
    await cb();
    wallet.isLoading = false;
  };
}

export function sumMonthPeriod(expenses: Expense[] = [], monthDay: Dayjs) {
  return expenses
    .filter((i) =>
      dayjs(i.expenseDate).isBetween(
        monthDay.startOf("day"),
        monthDay.add(1, "month").endOf("day"),
      ),
    )
    .reduce((acc, i) => acc + i.amount, 0);
}

export function filterExpenses(expenses: Expense[] = [], filter?: Filter) {
  if (!expenses.length || !filter) {
    return expenses;
  }

  return expenses.filter((o) => {
    if (!o[filter.name]) {
      return true; // select all
    }
    return o[filter.name].id === filter.id;
  });
}

export function getTotals(expenses: Expense[], cutoff: dayjs.Dayjs) {
  const range1 = cutoff.subtract(1, "M");
  const range2 = cutoff;
  const range3 = cutoff.add(1, "M");

  const totals = [
    { date: range1.format("MMMM DD"), total: 0 },
    { date: range2.format("MMMM DD"), total: 0 },
  ];

  expenses.forEach((e) => {
    const date = dayjs(e.expenseDate);
    if (date.isBetween(range1, range2, "day", "[)")) {
      totals[0].total += Math.trunc(e.amount);
    } else if (date.isBetween(range2, range3, "day", "[)")) {
      totals[1].total += Math.trunc(e.amount);
    }
  });

  return totals;
}

export function formatCurrency(value: number, digits = 0) {
  return value.toLocaleString("es-PE", {
    style: "currency",
    currency: "PEN",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export function getTotalLimit(categories?: Category[]) {
  return categories?.reduce((acc, cat) => acc + (cat.limit ?? 0), 0) ?? 0;
}

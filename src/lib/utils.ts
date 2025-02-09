import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

import { Timestamp } from "firebase/firestore";
import { wallet } from "./state.svelte";
import {
  FilterType,
  type ChartSerie,
  type Expense,
  type Filter,
} from "./types";

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

export function getSeriesData(expenses: Expense[], cutoff: dayjs.Dayjs) {
  const range1 = cutoff.subtract(2, "M");
  const range2 = cutoff.subtract(1, "M");
  const range3 = cutoff;
  const range4 = cutoff.add(1, "M");

  const series = expenses.reduce((acc, e) => {
    const date = dayjs(e.datetime);
    if (date.isBetween(range1, range2, "day", "[)")) {
      addExpenseInSerie(acc, e, 0);
    } else if (date.isBetween(range2, range3, "day", "[)")) {
      addExpenseInSerie(acc, e, 1);
    } else if (date.isBetween(range3, range4, "day", "[)")) {
      addExpenseInSerie(acc, e, 2);
    }
    return acc;
  }, initSeries(expenses));

  return series;
}

function addExpenseInSerie(
  series: ChartSerie[],
  expense: Expense,
  month: number
) {
  const serie = series.find((s) => s.name === expense.category.name);
  if (serie) {
    serie.data[month] += Math.trunc(expense.amount);
  }
}

function initSeries(expenses: Expense[]) {
  const categories = expenses.reduce(
    (acc, e) => acc.add(e.category.name),
    new Set<string>()
  );
  return [...categories].map<ChartSerie>((name) => ({ name, data: [0, 0, 0] }));
}

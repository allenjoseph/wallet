import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

import { Timestamp } from "firebase/firestore";
import { wallet } from "./state.svelte";
import {
  ExpenseFilter,
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
    if (!o[filter.name]) {
      return true; // select all
    }
    return o[filter.name].id === filter.id;
  });
}

export function getSeriesData(
  expenses: Expense[],
  cutoff: dayjs.Dayjs,
  filterBy: ExpenseFilter
) {
  const range1 = cutoff.subtract(2, "M");
  const range2 = cutoff.subtract(1, "M");
  const range3 = cutoff;
  const range4 = cutoff.add(1, "M");

  const series = expenses.reduce((acc, e) => {
    const date = dayjs(e.expenseDate);
    if (date.isBetween(range1, range2, "day", "[)")) {
      addExpenseInSerie(acc, e, 0, filterBy);
    } else if (date.isBetween(range2, range3, "day", "[)")) {
      addExpenseInSerie(acc, e, 1, filterBy);
    } else if (date.isBetween(range3, range4, "day", "[)")) {
      addExpenseInSerie(acc, e, 2, filterBy);
    }
    return acc;
  }, initSeries(expenses, filterBy));

  return series;
}

function addExpenseInSerie(
  series: ChartSerie[],
  expense: Expense,
  rangeIndex: number,
  filterBy: ExpenseFilter
) {
  const serie = series.find((s) => s.name === expense[filterBy].name);
  if (serie) {
    serie.data[rangeIndex] += Math.trunc(expense.amount);
  }
}

function initSeries(expenses: Expense[], filterBy: ExpenseFilter) {
  const series = expenses.reduce(
    (acc, e) => acc.add(e[filterBy].name),
    new Set<string>()
  );
  return [...series].map<ChartSerie>((name) => ({ name, data: [0, 0, 0] }));
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
      totals[0].total += e.amount;
    } else if (date.isBetween(range2, range3, "day", "[)")) {
      totals[1].total += e.amount;
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

import dayjs from "dayjs";
import type { Expense, ExpenseGroup } from "../entities";

interface ChartSerie {
  name: string;
  data: number[];
}

function getSeries(
  expenses: Expense[],
  cutoff: dayjs.Dayjs,
  group: ExpenseGroup
) {
  const range1 = cutoff.subtract(2, "M");
  const range2 = cutoff.subtract(1, "M");
  const range3 = cutoff;
  const range4 = cutoff.add(1, "M");

  const series = expenses.reduce((acc, e) => {
    const date = dayjs(e.expenseDate);
    if (date.isBetween(range1, range2, "day", "[)")) {
      addExpenseInSerie(acc, e, 0, group);
    } else if (date.isBetween(range2, range3, "day", "[)")) {
      addExpenseInSerie(acc, e, 1, group);
    } else if (date.isBetween(range3, range4, "day", "[)")) {
      addExpenseInSerie(acc, e, 2, group);
    }
    return acc;
  }, initSeries(expenses, group));

  return series;
}

export const ChartService = { getSeries };

function addExpenseInSerie(
  series: ChartSerie[],
  expense: Expense,
  rangeIndex: number,
  group: ExpenseGroup
) {
  const serie = series.find((s) => s.name === expense[group].name);
  if (serie) {
    serie.data[rangeIndex] += Math.trunc(expense.amount);
  }
}

function initSeries(expenses: Expense[], group: ExpenseGroup) {
  const series = expenses.reduce(
    (acc, e) => acc.add(e[group].name),
    new Set<string>()
  );
  return [...series].map<ChartSerie>((name) => ({ name, data: [0, 0, 0] }));
}

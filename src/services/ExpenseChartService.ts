import dayjs, { Dayjs } from "dayjs";
import type { Expense, Tag, TagGroup } from "../entities";

interface Serie {
  name: string;
  data: number[];
}

export class ExpenseChartService {
  series: Serie[] = [];
  colors = [
    "#002d9c",
    "#6929c4",
    "#198038",
    "#9f1853",
    "#8a3800",
    "#012749",
    "#005d5d",
    "#570408",
  ];

  constructor(
    private readonly expenses: Expense[],
    private readonly tagGroup: TagGroup,
    private readonly cutoff: Dayjs
  ) {
    this.series = this.buildSeries();
  }

  private buildSeries() {
    const ranges = [
      new Range(this.cutoff.subtract(2, "M"), this.cutoff.subtract(1, "M")),
      new Range(this.cutoff.subtract(1, "M"), this.cutoff),
      new Range(this.cutoff, this.cutoff.add(1, "M")),
    ];

    const tags = new Set<string>();

    for (const e of this.expenses) {
      // Add expense tag to the set
      const tag = e[this.tagGroup].name;
      tags.add(tag);

      // Add expense to the appropriate range
      ranges.some((range) => range.cover(e));
    }

    return [...tags].map<Serie>((tag) => ({
      name: tag,
      data: ranges.map((range) => range.sumBy(this.tagGroup, tag)),
    }));
  }

  getBarCategories(cutoff: Dayjs) {
    return [
      `${cutoff.subtract(2, "M").format("MMM")} S/${this.series.reduce(
        (acc, s) => acc + s.data[0],
        0
      )}`,
      `${cutoff.subtract(1, "M").format("MMM")} S/${this.series.reduce(
        (acc, s) => acc + s.data[1],
        0
      )}`,
      `${cutoff.format("MMM")} S/${this.series.reduce(
        (acc, s) => acc + s.data[2],
        0
      )}`,
    ];
  }
}

class Range {
  expenses: Expense[] = [];

  constructor(private readonly start: Dayjs, private readonly end: Dayjs) {}

  cover(e: Expense) {
    const date = dayjs(e.expenseDate);
    if (date.isBetween(this.start, this.end, "day", "[)")) {
      this.expenses.push(e);
      return true;
    }
    return false;
  }

  sumBy(tagGroup: TagGroup, tag: Tag) {
    return this.expenses.reduce((sum, expense) => {
      const expenseTag = expense[tagGroup].name;
      if (expenseTag === tag) {
        return sum + Math.trunc(expense.amount);
      }
      return sum;
    }, 0);
  }
}

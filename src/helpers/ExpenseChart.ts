import { Dayjs } from "dayjs";
import type { Expense, TagGroup } from "../entities";
import { ExpenseRange } from "./ExpenseRange";

interface Serie {
  name: string;
  data: number[];
}

export class ExpenseChart {
  ranges: ExpenseRange[] = [];
  series: Serie[] = [];
  labels: string[] = [];
  categories: string[] = [];
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
    private readonly cutoff: Dayjs,
    private readonly numMonths: number
  ) {
    this.ranges = this.buildRanges();
    this.series = this.buildSeries();
    this.labels = this.series.map((s) => s.name);
    this.categories = this.buildCategories();
  }

  private buildRanges() {
    return Array.from({ length: this.numMonths }, (_, i) => {
      const fromDelta = this.numMonths - i - 1;
      const from = this.getMonthDay(fromDelta);

      const toDelta = fromDelta - 1;
      const to = this.getMonthDay(toDelta);

      return new ExpenseRange(from, to);
    });
  }

  private buildSeries() {
    const tags = new Set<string>();

    for (const e of this.expenses) {
      // Add expense tag to the set
      const tag = e[this.tagGroup].name;
      tags.add(tag);

      // Add expense to the appropriate range
      this.ranges.some((range) => range.cover(e));
    }

    return [...tags].map<Serie>((tag) => ({
      name: tag,
      data: this.ranges.map((range) => range.sumBy(this.tagGroup, tag)),
    }));
  }

  private buildCategories() {
    return Array.from({ length: this.numMonths }, (_, i) => {
      const delta = this.numMonths - i - 1;
      const monthStr = this.getMonthDay(delta).format("MMM");
      const monthTotal = this.series.reduce((acc, s) => acc + s.data[i], 0);
      return `${monthStr} S/${monthTotal}`;
    });
  }

  private getMonthDay(delta: number) {
    return delta > 0
      ? this.cutoff.subtract(delta, "M")
      : delta === 0
      ? this.cutoff
      : this.cutoff.add(Math.abs(delta), "M");
  }
}

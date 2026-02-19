import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import type { Expense, Tag, TagGroup } from "../entities";

export class ExpenseRange {
  expenses: Expense[] = [];

  constructor(
    private readonly start: Dayjs,
    private readonly end: Dayjs,
  ) {}

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

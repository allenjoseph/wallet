import type { Dayjs } from "dayjs";
import { collection, Timestamp, where } from "firebase/firestore";
import { db } from "../db";
import type { Expense } from "../entities";
import { BaseRepo } from "./BaseRepo";

class ExpenseRepo extends BaseRepo<Expense> {
  query(fromDay: Dayjs, toDay?: Dayjs) {
    const from = Timestamp.fromDate(fromDay.startOf("day").toDate());
    const to = Timestamp.fromDate(
      toDay ? toDay.startOf("day").toDate() : fromDay.add(1, "month").toDate(),
    );

    const constraints = [
      where("expenseDate", ">=", from),
      where("expenseDate", "<", to),
    ];

    return this.queryDocs(constraints, "expenseDate");
  }
}

const ref = collection(db, "expenses");
export const expenseRepo = new ExpenseRepo(ref);

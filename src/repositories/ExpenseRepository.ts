import { Dayjs } from "dayjs";
import {
  collection,
  CollectionReference,
  Timestamp,
  where,
} from "firebase/firestore";
import type { Expense } from "../entities";
import { BaseRepository } from "./BaseRepository";
import { db } from "./db";

class ExpenseRepository extends BaseRepository<Expense> {
  constructor(ref: CollectionReference) {
    super(ref);
  }

  query(fromDay: Dayjs, toDay?: Dayjs) {
    const from = Timestamp.fromDate(fromDay.startOf("day").toDate());
    const to = Timestamp.fromDate(
      toDay ? toDay.startOf("day").toDate() : fromDay.add(1, "month").toDate()
    );

    const constraints = [
      where("expenseDate", ">=", from),
      where("expenseDate", "<", to),
    ];

    return this.queryDocs(constraints, "expenseDate");
  }
}

const ref = collection(db, "expenses");
export const expenseRepository = new ExpenseRepository(ref);

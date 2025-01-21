import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

import { Timestamp } from "firebase/firestore";
import { wallet } from "./state.svelte";

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

export function dateWithinMonthRange(monthDay: Dayjs, date: Date) {
  return dayjs(date).isBetween(
    monthDay.startOf("day"),
    monthDay.add(1, "month").endOf("day")
  );
}

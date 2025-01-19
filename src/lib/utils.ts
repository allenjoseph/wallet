import dayjs from "dayjs";
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

export function today() {
  return dayjs();
}

export function dateInCurrentMonth(date: Date) {
  return dayjs(date).isBetween(
    dayjs().startOf("month"),
    dayjs().endOf("month")
  );
}

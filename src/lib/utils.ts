import { Timestamp } from "firebase/firestore";
import { wallet } from "../state.svelte";

export function loaderDecorator(cb: () => Promise<any>) {
  return async () => {
    wallet.loading = true;
    await cb();
    wallet.loading = false;
  };
}

export function toTimestamp(date: Date) {
  return Timestamp.fromDate(date);
}

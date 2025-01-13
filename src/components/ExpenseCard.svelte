<script lang="ts">
  import dayjs from "dayjs";
  import { CreditCard, Pen, ShoppingCart, Trash2 } from "lucide-svelte";
  import type { Expense } from "../lib/types";
  import BadgeDropdown from "./BadgeDropdown.svelte";

  interface Props extends Expense {
    ondelete: () => void;
    onedit: () => void;
  }

  const { ondelete, onedit, ...expense }: Props = $props();
</script>

<div class="relative border rounded-lg p-4 shadow-sm shadow-indigo-100">
  <div>
    <p class="text-xs text-gray-500">
      {dayjs(expense.expenseDate).format("ddd D MMM h:mm A")}
    </p>
  </div>
  <div class="flex justify-between items-center gap-4">
    <p>
      {expense.name}
      <Pen
        size={16}
        class="inline-flex bottom-4 right-4 text-sm text-indigo-500 bg-white"
        onclick={onedit}
      />
    </p>
    <p class="text-sm font-medium">S/ {expense.amount.toFixed(2)}</p>
  </div>
  <div class="mt-2 flex items-center gap-2 text-xs">
    <BadgeDropdown Icon={ShoppingCart} value={expense.category} small locked />
    <BadgeDropdown Icon={CreditCard} value={expense.source} small locked />
  </div>
  <Trash2
    size={16}
    class="absolute bottom-4 right-4 text-sm text-red-500 bg-white"
    onclick={ondelete}
  />
</div>

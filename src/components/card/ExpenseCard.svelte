<script lang="ts">
  import dayjs from "dayjs";
  import { CreditCard, ArrowRight, ShoppingCart, Trash2 } from "lucide-svelte";
  import type { Expense } from "../../lib/types";
  import Badge from "../badge/Badge.svelte";

  interface Props extends Expense {
    ondelete: () => void;
    onedit: () => void;
  }

  const { ondelete, onedit, ...expense }: Props = $props();
</script>

<div class="card space-y-2">
  <div class="flex justify-between items-center">
    <p class="text-xs text-gray-500">
      {dayjs(expense.expenseDate).format("ddd D MMM h:mm A")}
    </p>
    <button class="text-sm text-indigo-500" onclick={onedit}>
      <ArrowRight size={18} />
    </button>
  </div>
  <div class="flex justify-between items-center gap-4">
    <p>
      {expense.name}
    </p>
    <p class="text-sm font-medium text-nowrap">
      S/ {expense.amount.toFixed(2)}
    </p>
  </div>
  <div class="flex items-center gap-2 text-xs">
    <Badge Icon={ShoppingCart} small secondary>
      {expense.category.name}
    </Badge>
    <Badge Icon={CreditCard} small secondary>
      {expense.source.name}
    </Badge>
  </div>
  <button
    class="absolute bottom-4 right-4 text-sm text-red-500"
    onclick={ondelete}
  >
    <Trash2 size={18} />
  </button>
</div>

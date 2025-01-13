<script lang="ts">
  import dayjs from "dayjs";
  import Divider from "../components/Divider.svelte";
  import ExpenseCard from "../components/ExpenseCard.svelte";
  import View from "../components/View.svelte";
  import { deleteExpense, getExpenses, getTotal } from "../lib/backend";
  import { wallet } from "../state.svelte";
  import type { Expense } from "../lib/types";

  let expenses$ = getExpenses();
  let total$ = getTotal();

  function onEdit(expense: Expense) {
    wallet.selectedExpense = { ...expense };
    wallet.menuSeleted = "expense";
  }

  async function onDelete(id: string) {
    await deleteExpense(id);
    expenses$ = getExpenses();
    total$ = getTotal();
  }
</script>

<View>
  <Divider>{dayjs().format("MMMM YYYY")}</Divider>
  <div
    class="border rounded-lg p-4 shadow-sm shadow-indigo-500 flex flex-col gap-2"
  >
    <p class="text-sm text-gray-500">Current Expense</p>
    <p class="text-4xl font-medium">
      S/ <span>
        {#await total$}
          -.--
        {:then spent}
          {spent.toFixed(2)}
        {/await}
      </span>
    </p>
  </div>

  <Divider>Last expenses</Divider>
  {#await expenses$}
    <small class="text-gray-600">Loading...</small>
  {:then expenses}
    {#if expenses.length === 0}
      <small class="text-gray-600">No expenses found.</small>
    {/if}
    {#each expenses as expense}
      <ExpenseCard
        {...expense}
        onedit={() => onEdit(expense)}
        ondelete={() => onDelete(expense.id!)}
      />
    {/each}
  {/await}
</View>

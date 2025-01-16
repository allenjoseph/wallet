<script lang="ts">
  import dayjs from "dayjs";
  import Divider from "../components/Divider.svelte";
  import ExpenseCard from "../components/ExpenseCard.svelte";
  import View from "../components/View.svelte";
  import { deleteExpense, getExpenses, getTotal } from "../lib/backend";
  import { wallet } from "../state.svelte";
  import type { Expense } from "../lib/types";
  import ExpenseAmount from "../components/ExpenseAmount.svelte";
  import { loaderDecorator } from "../lib/utils";

  let expenses$ = $state(getExpenses());
  let total = $state<number>();

  function onEdit(expense: Expense) {
    wallet.selectedExpense = { ...expense };
    wallet.menuSeleted = "expense";
  }

  async function onDelete(id: string) {
    await deleteExpense(id);
    expenses$ = getExpenses();
    getTotal().then((value) => (total = value));
  }

  $effect(() => {
    total ?? getTotal().then((value) => (total = value));
  });
</script>

<View>
  <Divider>{dayjs().format("MMMM YYYY")}</Divider>
  <ExpenseAmount bind:amount={total} readonly />

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
        ondelete={loaderDecorator(() => onDelete(expense.id!))}
      />
    {/each}
  {/await}
</View>

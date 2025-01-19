<script lang="ts">
  import Divider from "../components/Divider.svelte";
  import ExpenseCard from "../components/card/ExpenseCard.svelte";
  import View from "../components/View.svelte";
  import { deleteExpense, getExpenses } from "../lib/backend";
  import { wallet } from "../lib/state.svelte";
  import type { BaseDoc, Expense } from "../lib/types";
  import ExpenseAmount from "../components/expense/ExpenseAmount.svelte";
  import { dateInCurrentMonth, loaderDecorator, today } from "../lib/utils";
  import ExpenseFilters from "../components/expense/ExpenseFilters.svelte";
  import MainCard from "../components/card/MainCard.svelte";
  import { routes } from "../lib/routes";

  let allExpenses = $state<Expense[]>();
  let fSourceId = $state<string>();

  getExpenses().then((data) => (allExpenses = data));

  let expenses = $derived(
    allExpenses?.filter((o) => (fSourceId ? o.source.id === fSourceId : true))
  );

  let total = $derived(
    expenses
      ?.filter((i) => dateInCurrentMonth(i.expenseDate))
      .reduce((acc, i) => acc + i.amount, 0)
  );

  function onEdit(expense: Expense) {
    wallet.selectedExpense = { ...expense };
    wallet.selectedRoute = routes.expenses.routeAdd!;
  }

  async function onDelete(id: string) {
    await deleteExpense(id);
    // expenses$ = getExpenses().then(setExpenses);
  }

  function onFilter(source: BaseDoc) {
    fSourceId = fSourceId === source.id ? undefined : source.id;
  }
</script>

<View>
  <Divider>{today().format("MMMM YYYY")}</Divider>
  <MainCard>
    <ExpenseAmount amount={total} readonly />
  </MainCard>
  <ExpenseFilters onclick={onFilter} selected={fSourceId} />

  <Divider>All expenses</Divider>
  {#if !expenses}
    <small class="text-gray-600">Loading...</small>
  {:else}
    {#if expenses.length === 0}
      <small class="text-gray-600">No expenses found.</small>
    {/if}
    {#each expenses as expense (expense.id)}
      <ExpenseCard
        {...expense}
        onedit={() => onEdit(expense)}
        ondelete={loaderDecorator(() => onDelete(expense.id!))}
      />
    {/each}
  {/if}
</View>

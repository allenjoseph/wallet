<script lang="ts">
  import Divider from "../components/Divider.svelte";
  import ExpenseCard from "../components/card/ExpenseCard.svelte";
  import View from "../components/View.svelte";
  import { deleteExpense, getExpenses } from "../lib/backend";
  import { wallet } from "../lib/state.svelte";
  import {
    FilterType,
    type BaseDoc,
    type Expense,
    type Filter,
  } from "../lib/types";
  import ExpenseAmount from "../components/expense/ExpenseAmount.svelte";
  import {
    sumMonthPeriod,
    filterExpenses,
    loaderDecorator,
  } from "../lib/utils";
  import ExpenseFilters from "../components/expense/ExpenseFilters.svelte";
  import MainCard from "../components/card/MainCard.svelte";
  import { routes } from "../lib/routes";
  import ExpenseMonthlyPeriodDay from "../components/expense/ExpenseMonthlyPeriodDay.svelte";

  let allExpenses = $state<Expense[]>();
  let fSelected = $state<Filter>();

  let expenses = $derived(filterExpenses(allExpenses, fSelected));
  let total = $derived(sumMonthPeriod(expenses, wallet.monthlyPeriodDay));

  function onEdit(expense: Expense) {
    wallet.selectedExpense = { ...expense };
    wallet.selectedRoute = routes.expenses.routeAdd!;
  }

  async function onDelete(id: string) {
    await deleteExpense(id);
    allExpenses = allExpenses?.filter((o) => o.id !== id);
  }

  function onFilter(type: FilterType, item: BaseDoc) {
    fSelected =
      !item.id || fSelected?.id === item.id ? undefined : { type, id: item.id };
  }

  $effect(() => {
    if (wallet.monthlyPeriodDay) {
      getExpenses(wallet.monthlyPeriodDay).then((data) => (allExpenses = data));
    }
  });
</script>

<View>
  <Divider>
    <ExpenseMonthlyPeriodDay bind:day={wallet.monthlyPeriodDay} />
  </Divider>
  <MainCard>
    <ExpenseAmount amount={total} readonly />
  </MainCard>
  <ExpenseFilters onclick={onFilter} selected={fSelected?.id} />

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

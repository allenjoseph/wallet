<script lang="ts">
  import Divider from "../components/Divider.svelte";
  import ExpenseCard from "../components/card/ExpenseCard.svelte";
  import View from "../components/View.svelte";
  import { wallet } from "../state.svelte";
  import ExpenseAmount from "../components/expense/ExpenseAmount.svelte";
  import { sumMonthPeriod, filterExpenses, loaderDecorator } from "../utils";
  import ExpenseFilters from "../components/expense/ExpenseFilters.svelte";
  import MainCard from "../components/card/MainCard.svelte";
  import { routes } from "../routes";
  import ExpenseMonthlyPeriodDay from "../components/expense/ExpenseMonthlyPeriodDay.svelte";
  import { expenseRepo } from "../repositories";
  import { TagGroup } from "../entities";
  import type { Doc, Expense, Filter, Category } from "../entities";

  let allExpenses = $state<Expense[]>();
  let fSelected = $state<Filter>();
  let currentLimit = $state<number>(0);

  let expenses = $derived(filterExpenses(allExpenses, fSelected));
  let total = $derived(sumMonthPeriod(expenses, wallet.monthlyPeriodDay));

  function onEdit(expense: Expense) {
    wallet.selectedExpense = { ...expense };
    wallet.selectedRoute = routes.expenses.routeAdd!;
  }

  async function onDelete(id: string) {
    await expenseRepo.delete(id);
    allExpenses = allExpenses?.filter((o) => o.id !== id);
  }

  function onFilter(name: TagGroup, item: Doc) {
    fSelected =
      !item.id || fSelected?.id === item.id ? undefined : { name, id: item.id };

    currentLimit =
      fSelected && name === TagGroup.Category
        ? ((item as Category).limit ?? 0)
        : 0;
  }

  $effect(() => {
    if (wallet.monthlyPeriodDay) {
      expenseRepo
        .query(wallet.monthlyPeriodDay)
        .then((data) => (allExpenses = data));
    }
  });
</script>

<View>
  <Divider>
    <ExpenseMonthlyPeriodDay bind:day={wallet.monthlyPeriodDay} />
  </Divider>
  <MainCard>
    <ExpenseAmount amount={total} limit={currentLimit} readonly />
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

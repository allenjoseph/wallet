<script lang="ts">
import ExpenseCard from "../components/card/ExpenseCard.svelte";
import MainCard from "../components/card/MainCard.svelte";
import Divider from "../components/Divider.svelte";
import ExpenseAmount from "../components/expense/ExpenseAmount.svelte";
import ExpenseFilters from "../components/expense/ExpenseFilters.svelte";
import ExpenseMonthlyPeriodDay from "../components/expense/ExpenseMonthlyPeriodDay.svelte";
import View from "../components/View.svelte";
import type { Category, Doc, Expense, Filter, TagGroup } from "../entities";
import { categoryRepo, expenseRepo } from "../repositories";
import { routes } from "../routes";
import { wallet } from "../state.svelte";
import {
  filterExpenses,
  getTotalLimit,
  loaderDecorator,
  sumMonthPeriod,
} from "../utils";

let allExpenses = $state<Expense[]>();
let fSelected = $state<Filter>();
let currentLimit = $state<number>(0);

let categories = $state<Category[]>();
let expenses = $derived(filterExpenses(allExpenses, fSelected));
let total = $derived(sumMonthPeriod(expenses, wallet.monthlyPeriodDay));

function onEdit(expense: Expense) {
  wallet.selectedExpense = { ...expense };
  if (routes.expenses.routeAdd) {
    wallet.selectedRoute = routes.expenses.routeAdd;
  }
}

async function onDelete(id: string) {
  await expenseRepo.delete(id);
  allExpenses = allExpenses?.filter((o) => o.id !== id);
}

function onFilter(name: TagGroup, item: Doc) {
  fSelected =
    !item.id || fSelected?.id === item.id ? undefined : { name, id: item.id };

  currentLimit = !fSelected
    ? getTotalLimit(categories)
    : ((item as Category).limit ?? 0);
}

$effect(() => {
  if (wallet.monthlyPeriodDay) {
    expenseRepo
      .query(wallet.monthlyPeriodDay)
      .then((data) => (allExpenses = data));
  }
});

$effect(() => {
  categoryRepo.getAll().then((data) => {
    categories = data;
    currentLimit = getTotalLimit(data);
  });
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
    {:else}
      <small class="text-gray-600">{expenses.length} expenses found.</small>
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

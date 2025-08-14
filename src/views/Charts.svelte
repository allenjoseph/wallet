<script lang="ts">
  import Divider from "../components/Divider.svelte";
  import View from "../components/View.svelte";
  import { wallet } from "../lib/state.svelte";
  import ExpenseMonthlyPeriodDay from "../components/expense/ExpenseMonthlyPeriodDay.svelte";
  import ChartBar from "../components/chart/ChartBar.svelte";
  import ChartDonut from "../components/chart/ChartDonut.svelte";
  import { CreditCard, ShoppingCart } from "lucide-svelte";
  import Badge from "../components/badge/Badge.svelte";
  import { formatCurrency, getTotals } from "../lib/utils";
  import { expenseRepo } from "../repositories";
  import { ExpenseGroup } from "../entities";

  let groupBy = $state<ExpenseGroup>(ExpenseGroup.Category);
  let cutoff = $state(wallet.monthlyPeriodDay.clone());

  const from = $derived(cutoff.subtract(2, "M")); // two months ago
  const to = $derived(cutoff.add(1, "M")); // one month ahead

  const expenses$ = $derived(expenseRepo.query(from, to));
</script>

<View>
  <Divider>
    <ExpenseMonthlyPeriodDay bind:day={cutoff} />
  </Divider>
  {#await expenses$ then expenses}
    <div class="whitespace-nowrap space-x-4 mx-auto">
      {#each getTotals(expenses, cutoff) as item}
        <div class="card inline-block w-36">
          <small class="text-gray-500 uppercase text-nowrap">
            {item.date}
          </small>
          <p class="text-2xl text-gray-700 font-semibold">
            {formatCurrency(item.total)}
          </p>
        </div>
      {/each}
    </div>
  {/await}
  <div class="flex items-start gap-2 flex-wrap">
    <Badge
      Icon={ShoppingCart}
      selected={groupBy === ExpenseGroup.Category}
      onclick={() => (groupBy = ExpenseGroup.Category)}
    >
      Category
    </Badge>
    <Badge
      Icon={CreditCard}
      selected={groupBy === ExpenseGroup.Source}
      onclick={() => (groupBy = ExpenseGroup.Source)}
    >
      Source
    </Badge>
  </div>
  {#await expenses$ then expensesLastThreeMonths}
    <ChartDonut expenses={expensesLastThreeMonths} {cutoff} {groupBy} />
    <ChartBar expenses={expensesLastThreeMonths} {cutoff} {groupBy} />
  {/await}
</View>

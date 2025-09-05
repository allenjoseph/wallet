<script lang="ts">
  import Divider from "../components/Divider.svelte";
  import View from "../components/View.svelte";
  import { wallet } from "../state.svelte";
  import ExpenseMonthlyPeriodDay from "../components/expense/ExpenseMonthlyPeriodDay.svelte";
  import ChartHistory from "../components/chart/ChartHistory.svelte";
  import ChartDonut from "../components/chart/ChartDonut.svelte";
  import {
    ChartColumn,
    ChartLine,
    CreditCard,
    ShoppingCart,
  } from "lucide-svelte";
  import Badge from "../components/badge/Badge.svelte";
  import { formatCurrency, getTotals } from "../utils";
  import { expenseRepo } from "../repositories";
  import { TagGroup } from "../entities";
  import { ExpenseChart } from "../helpers";

  let groupBy = $state<TagGroup>(TagGroup.Category);
  let cutoff = $state(wallet.monthlyPeriodDay.clone());
  let historyChart = $state<"line" | "bar">("line");
  let historyMonths = $state<number>(3);

  const from = $derived(cutoff.subtract(historyMonths - 1, "M")); // include current month
  const to = $derived(cutoff.add(1, "M")); // one month ahead

  const expenses$ = $derived(expenseRepo.query(from, to));
</script>

<View>
  <Divider>
    <div class="flex gap-2">
      <span>Cutoff Day:</span>
      <ExpenseMonthlyPeriodDay bind:day={cutoff} />
    </div>
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
      selected={groupBy === TagGroup.Category}
      onclick={() => (groupBy = TagGroup.Category)}
    >
      Category
    </Badge>
    <Badge
      Icon={CreditCard}
      selected={groupBy === TagGroup.Source}
      onclick={() => (groupBy = TagGroup.Source)}
    >
      Source
    </Badge>
  </div>
  {#await expenses$ then expensesLastThreeMonths}
    <Divider>Current month</Divider>
    <ChartDonut
      chart={new ExpenseChart(
        expensesLastThreeMonths,
        groupBy,
        cutoff,
        historyMonths
      )}
    />

    <Divider>History</Divider>
    <div class="flex justify-between">
      <div class="flex items-start gap-2 flex-wrap">
        <Badge
          Icon={ChartLine}
          selected={historyChart === "line"}
          onclick={() => (historyChart = "line")}
        >
          Line
        </Badge>
        <Badge
          Icon={ChartColumn}
          selected={historyChart === "bar"}
          onclick={() => (historyChart = "bar")}
        >
          Bar
        </Badge>
      </div>
      <div class="flex items-start gap-2 flex-wrap">
        <Badge
          selected={historyMonths === 3}
          onclick={() => (historyMonths = 3)}
        >
          3 months
        </Badge>
        <Badge
          selected={historyMonths === 6}
          onclick={() => (historyMonths = 6)}
        >
          6 months
        </Badge>
      </div>
    </div>
    <ChartHistory
      type={historyChart}
      data={new ExpenseChart(
        expensesLastThreeMonths,
        groupBy,
        cutoff,
        historyMonths
      )}
    />
  {/await}
</View>

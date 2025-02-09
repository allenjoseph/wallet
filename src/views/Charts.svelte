<script lang="ts">
  import Divider from "../components/Divider.svelte";
  import View from "../components/View.svelte";
  import { wallet } from "../lib/state.svelte";
  import ExpenseMonthlyPeriodDay from "../components/expense/ExpenseMonthlyPeriodDay.svelte";
  import { getExpenses } from "../lib/backend";
  import ChartBar from "../components/chart/ChartBar.svelte";
  import ChartDonut from "../components/chart/ChartDonut.svelte";
  import { CreditCard, ShoppingCart } from "lucide-svelte";
  import Badge from "../components/badge/Badge.svelte";

  let cutoff = $state(wallet.monthlyPeriodDay.clone());
</script>

<View>
  <Divider>
    <ExpenseMonthlyPeriodDay bind:day={cutoff} />
  </Divider>
  <div class="flex items-start gap-2 flex-wrap">
    <Badge Icon={ShoppingCart} selected>Category</Badge>
    <Badge Icon={CreditCard}>Source</Badge>
  </div>
  {#await getExpenses(cutoff) then expenses}
    <ChartDonut {expenses} {cutoff} />
    <ChartBar {expenses} {cutoff} />
  {/await}
</View>

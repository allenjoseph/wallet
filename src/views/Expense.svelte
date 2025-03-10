<script lang="ts">
  import dayjs from "dayjs";
  import ExpenseAmount from "../components/expense/ExpenseAmount.svelte";
  import DropdownBadge from "../components/badge/DropdownBadge.svelte";
  import { saveExpense, getCategories, getSources } from "../lib/backend";
  import Button from "../components/Button.svelte";
  import View from "../components/View.svelte";
  import Input from "../components/Input.svelte";
  import type { Expense } from "../lib/types";
  import { wallet } from "../lib/state.svelte";
  import { CreditCard, ShoppingCart } from "lucide-svelte";
  import { loaderDecorator, toTimestamp } from "../lib/utils";
  import Divider from "../components/Divider.svelte";
  import MainCard from "../components/card/MainCard.svelte";
  import { routes } from "../lib/routes";

  let expenseDate: string = $state(
    dayjs(wallet.selectedExpense?.expenseDate).format("YYYY-MM-DDTHH:mm")
  );
  const categories$ = getCategories();
  const sources$ = getSources();

  let expense = $state<Expense>(
    wallet.selectedExpense ?? {
      name: "",
      amount: 0,
      description: "",
      expenseDate: dayjs().toDate(),
      category: null as never,
      source: null as never,
    }
  );

  let isInvalid = $derived(
    !expense.category || !expense.source || !expense.name || !expense.amount
  );

  async function onSave() {
    await saveExpense({
      ...expense,
      expenseDate: toTimestamp(dayjs(expenseDate).toDate()),
    });
    wallet.selectedRoute = routes.expenses;
  }
</script>

<View>
  <Divider>Add / Edit</Divider>
  <MainCard>
    <ExpenseAmount bind:amount={expense.amount} />
    <Input name="expenseDate" bind:value={expenseDate} type="datetime-local" />
    <Input name="name" bind:value={expense.name} />
    <div class="flex items-start gap-2 flex-wrap">
      <DropdownBadge
        Icon={ShoppingCart}
        bind:value={expense.category}
        data$={categories$}
        placeholder="Category"
      />
      <DropdownBadge
        Icon={CreditCard}
        bind:value={expense.source}
        data$={sources$}
        placeholder="Source"
      />
    </div>
    <footer class="self-end">
      <Button onClick={loaderDecorator(onSave)} disabled={isInvalid}>
        Save
      </Button>
    </footer>
  </MainCard>
</View>

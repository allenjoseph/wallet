<script lang="ts">
  import dayjs from "dayjs";
  import ExpenseAmount from "../components/ExpenseAmount.svelte";
  import BadgeDropdown from "../components/BadgeDropdown.svelte";
  import { saveExpense, getCategories, getSources } from "../lib/backend";
  import Button from "../components/Button.svelte";
  import View from "../components/View.svelte";
  import Input from "../components/Input.svelte";
  import type { Expense } from "../lib/types";
  import { wallet } from "../state.svelte";
  import { CreditCard, ShoppingCart } from "lucide-svelte";
  import { loaderDecorator, toTimestamp } from "../lib/utils";
  import Divider from "../components/Divider.svelte";

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

  async function onSave() {
    await saveExpense({
      ...expense,
      expenseDate: toTimestamp(dayjs(expenseDate).toDate()),
    });
    wallet.menuSeleted = "expenses";
  }
</script>

<View>
  <Divider>Add / Edit</Divider>
  <ExpenseAmount bind:amount={expense.amount} />
  <Input name="expenseDate" bind:value={expenseDate} type="datetime-local" />
  <Input name="name" bind:value={expense.name} />
  <div class="flex items-start gap-2 flex-wrap">
    <BadgeDropdown
      Icon={ShoppingCart}
      bind:value={expense.category}
      data$={categories$}
      placeholder="Category"
    />
    <BadgeDropdown
      Icon={CreditCard}
      bind:value={expense.source}
      data$={sources$}
      placeholder="Source"
    />
  </div>
  <Button onClick={loaderDecorator(onSave)}>Save</Button>
</View>

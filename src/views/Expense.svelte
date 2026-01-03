<script lang="ts">
  import dayjs from "dayjs";
  import ExpenseAmount from "../components/expense/ExpenseAmount.svelte";
  import DropdownBadge from "../components/badge/DropdownBadge.svelte";
  import Button from "../components/Button.svelte";
  import View from "../components/View.svelte";
  import Input from "../components/Input.svelte";
  import { wallet } from "../state.svelte";
  import { CreditCard, ShoppingCart } from "lucide-svelte";
  import { loaderDecorator } from "../utils";
  import Divider from "../components/Divider.svelte";
  import MainCard from "../components/card/MainCard.svelte";
  import { routes } from "../routes";
  import { categoryRepo, expenseRepo, sourceRepo } from "../repositories";
  import type { Expense } from "../entities";
  import ExpenseRecurrent from "../components/expense/ExpenseRecurrent.svelte";

  let expenseDate: string = $state(
    dayjs(wallet.selectedExpense?.expenseDate).format("YYYY-MM-DDTHH:mm")
  );
  const categories$ = categoryRepo.getAll();
  const sources$ = sourceRepo.getAll();

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
    const times =
      Number(expense.numberOfTimes) > 1 ? Number(expense.numberOfTimes) : 1;

    for (let i = 0; i < times; i++) {
      await expenseRepo.save({
        ...expense,
        name: times > 1 ? `${expense.name} ${i + 1}/${times}` : expense.name,
        expenseDate: dayjs(expenseDate).add(i, "month").toDate(),
      });
    }
    wallet.selectedRoute = routes.expenses;
  }

  function onChangeRecurrent(numberOfTimes: number) {
    expense.numberOfTimes = numberOfTimes;
  }
</script>

<View>
  <Divider>Add / Edit</Divider>
  <MainCard>
    <div class="flex gap-4 items-stretch">
      <ExpenseAmount bind:amount={expense.amount} />
      <ExpenseRecurrent onChange={onChangeRecurrent} />
    </div>
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

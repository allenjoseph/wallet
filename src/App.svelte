<script lang="ts">
  import "./app.css";
  import SideMenu from "./components/SideMenu.svelte";
  import Expenses from "./views/Expenses.svelte";
  import AddExpense from "./views/AddExpense.svelte";
  import AddCategory from "./views/AddCategory.svelte";
  import AddSource from "./views/AddSource.svelte";
  import Login from "./views/Login.svelte";
  import { wallet } from "./state.svelte";
  import { LoaderCircle } from "lucide-svelte";
</script>

<main class="flex">
  {#if wallet.user !== null}
    <SideMenu />
    {#if wallet.menuSeleted === "expense"}
      <AddExpense />
    {:else if wallet.menuSeleted === "category"}
      <AddCategory />
    {:else if wallet.menuSeleted === "source"}
      <AddSource />
    {:else}
      <Expenses />
    {/if}
    {#if wallet.loading}
      <div
        class="fixed size-full flex justify-center items-center bg-white bg-opacity-50 z-50"
      >
        <LoaderCircle class="animate-spin text-indigo-600" size={64} />
      </div>
    {/if}
  {:else}
    <Login />
  {/if}
</main>

<style lang="postcss">
</style>

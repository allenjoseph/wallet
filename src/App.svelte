<script lang="ts">
  import "./app.css";
  import TopBar from "./components/TopBar.svelte";
  import BottomBar from "./components/BottomBar.svelte";
  import Expenses from "./views/Expenses.svelte";
  import AddExpense from "./views/AddExpense.svelte";
  import AddCategory from "./views/AddCategory.svelte";
  import AddSource from "./views/AddSource.svelte";
  import Login from "./views/Login.svelte";
  import { routes, wallet } from "./state.svelte";
  import { LoaderCircle } from "lucide-svelte";
</script>

<main class="flex">
  {#if wallet.user !== null}
    <TopBar />
    {#if wallet.selectedMenu.path === "expense"}
      <AddExpense />
    {:else if wallet.selectedMenu.path === "category"}
      <AddCategory />
    {:else if wallet.selectedMenu.path === "source"}
      <AddSource />
    {:else}
      <Expenses />
    {/if}
    <BottomBar />
  {:else}
    <Login />
  {/if}
  {#if wallet.isLoading}
    <div
      class="fixed size-full flex justify-center items-center bg-white bg-opacity-50 z-50"
    >
      <LoaderCircle class="animate-spin text-indigo-600" size={64} />
    </div>
  {/if}
</main>

<style lang="postcss">
</style>

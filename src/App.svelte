<script lang="ts">
  import { LoaderCircle } from "lucide-svelte";
  import TopBar from "./components/bars/TopBar.svelte";
  import BottomBar from "./components/bars/BottomBar.svelte";
  import Expenses from "./views/Expenses.svelte";
  import Expense from "./views/Expense.svelte";
  import Categories from "./views/Categories.svelte";
  import Sources from "./views/Sources.svelte";
  import Login from "./views/Login.svelte";
  import Charts from "./views/Charts.svelte";
  import { wallet } from "./lib/state.svelte";
</script>

<main class="flex">
  {#if wallet.user !== null}
    <TopBar />
    {#if wallet.selectedRoute.path === "expense"}
      <Expense />
    {:else if wallet.selectedRoute.path === "category"}
      <Categories />
    {:else if wallet.selectedRoute.path === "source"}
      <Sources />
    {:else if wallet.selectedRoute.path === "charts"}
      <Charts />
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

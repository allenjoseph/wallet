<script lang="ts">
  import { CornerUpLeft, Plus } from "lucide-svelte";
  import { wallet } from "../../state.svelte";
  import MenuItem from "../MenuItem.svelte";
  import type { Route } from "../../entities";
  import { routes } from "../../routes";

  function onSelectMenu(item: Route) {
    wallet.selectedExpense = null;
    wallet.selectedRoute = item;
  }

  function onSelectAdd() {
    wallet.selectedRoute = wallet.selectedRoute.routeAdd ?? routes.expenses;
  }
</script>

<div
  class="fixed bottom-0 flex justify-between w-screen z-20 px-8 pb-4 bg-linear-to-b from-white/0 to-white"
>
  <ul class="fab px-2 flex justify-between">
    {@render menuItem(
      routes.expenses,
      wallet.selectedRoute.path === routes.expenses.path,
      () => onSelectMenu(routes.expenses),
    )}
    {@render menuItem(
      routes.charts,
      wallet.selectedRoute.path === routes.charts.path,
      () => onSelectMenu(routes.charts),
    )}
  </ul>
  <button
    type="button"
    class="fab size-14 text-gray-600"
    onclick={onSelectAdd}
    aria-label={wallet.selectedRoute.routeAdd ? "Add expense" : "Go back"}
  >
    {#if wallet.selectedRoute.routeAdd}
      <Plus size={28} />
    {:else}
      <CornerUpLeft size={28} />
    {/if}
  </button>
</div>

{#snippet menuItem(item: Route, selected: boolean, onSelect: () => void)}
  <li class="w-20 flex">
    <MenuItem {...item} {selected} {onSelect} />
  </li>
{/snippet}

<style lang="postcss">
  @reference "../../app.css";
  .fab {
    @apply rounded-full flex items-center justify-center bg-gray-100/50 backdrop-blur-md inset-shadow-xs;
  }
</style>

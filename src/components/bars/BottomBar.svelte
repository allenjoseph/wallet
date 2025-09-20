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

<div class="fixed bottom-0 flex justify-between w-screen z-20 px-8 py-4">
  <ul class="fab gap-4 px-2">
    {@render menuItem(
      routes.expenses,
      wallet.selectedRoute.path === routes.expenses.path,
      () => onSelectMenu(routes.expenses)
    )}
    {@render menuItem(
      routes.charts,
      wallet.selectedRoute.path === routes.charts.path,
      () => onSelectMenu(routes.charts)
    )}
  </ul>
  <button class="fab size-10 text-indigo-600" onclick={onSelectAdd}>
    {#if wallet.selectedRoute.routeAdd}
      <Plus size={24} />
    {:else}
      <CornerUpLeft size={24} />
    {/if}
  </button>
</div>

{#snippet menuItem(item: Route, selected: boolean, onSelect: () => void)}
  <li class="size-10 flex">
    <MenuItem title={item.title} {selected} {onSelect}>
      <item.Icon size={28} />
    </MenuItem>
  </li>
{/snippet}

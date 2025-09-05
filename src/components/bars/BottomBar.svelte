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
  class="fixed bottom-0 flex justify-between w-screen border-t bg-white z-20 mb-[env(safe-area-inset-bottom)] after:inset-x-0 after:absolute after:-bottom-8 after:h-8 after:bg-white p-3"
>
  <ul class="flex-1 flex items-center">
    {#each Object.values(routes) as item}
      <li class="size-12 flex">
        <MenuItem
          title={item.title}
          selected={wallet.selectedRoute.path === item.path}
          onSelect={() => onSelectMenu(item)}
        >
          <item.Icon size={24} />
        </MenuItem>
      </li>
    {/each}
  </ul>
  <button
    class={[
      "rounded-lg p-4 flex items-center justify-center bg-indigo-50 text-indigo-600",
    ]}
    onclick={onSelectAdd}
  >
    {#if wallet.selectedRoute.routeAdd}
      <Plus size={24} />
    {:else}
      <CornerUpLeft size={24} />
    {/if}
  </button>
</div>

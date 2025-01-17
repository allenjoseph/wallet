<script lang="ts">
  import { menu, wallet } from "../state.svelte";
  import MenuItem from "./MenuItem.svelte";

  function onSelect(menu: string) {
    wallet.selectedExpense = null;
    wallet.menuSeleted = menu;
  }
</script>

<div
  class="fixed bottom-0 flex w-screen h-[calc(env(safe-area-inset-bottom)+56px)] border-t bg-white z-20"
>
  <ul class="flex-1 flex justify-center gap-1">
    {#each Object.values(menu) as item}
      <li class="p-2 size-14 flex items-center justify-center">
        <MenuItem
          title={item.title}
          selected={wallet.menuSeleted === item.menu}
          onSelect={() => onSelect(item.menu)}
        >
          <item.Icon />
        </MenuItem>
      </li>
    {/each}
  </ul>
</div>

<script lang="ts">
  import { LogOut, Power } from "lucide-svelte";
  import { logOut } from "../lib/backend";
  import { menu, wallet } from "../state.svelte";
  import MenuItem from "./MenuItem.svelte";

  let hasImage = $state(true);
  function imageFallback() {
    hasImage = false;
  }

  function signOut() {
    logOut().then(() => (wallet.user = null as never));
  }

  function onSelect(menu: string) {
    wallet.selectedExpense = null;
    wallet.menuSeleted = menu;
  }
</script>

<div class="fixed flex w-screen h-14 border-b bg-white z-20">
  <div class="p-2 size-14 border-r border-gray-100">
    {#if hasImage}
      <img
        src={wallet.user.photoURL}
        alt={wallet.user.displayName}
        onerror={imageFallback}
        class="size-10 rounded-lg"
      />
    {:else}
      <span
        class="grid size-10 place-content-center rounded-lg bg-gray-100 text-lg font-bold text-gray-600"
      >
        {wallet.user.displayName?.[0]}
      </span>
    {/if}
  </div>

  <ul class="flex-1 flex justify-center gap-1">
    {#each menu as item}
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

  <div class="sticky inset-x-0 self-end border-l border-gray-100 bg-white p-2">
    <button
      class={[
        "flex w-full justify-center items-center rounded-lg p-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700",
      ]}
      title="Log out"
      onclick={signOut}
    >
      <Power size={22} />
    </button>
  </div>
</div>

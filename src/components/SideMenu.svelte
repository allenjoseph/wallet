<script lang="ts">
  import { LogOut } from "lucide-svelte";
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

<div class="flex h-screen w-16 flex-col justify-between border-e bg-white">
  <div>
    <div class="inline-flex size-16 items-center justify-center">
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

    <div class="border-t border-gray-100">
      <div class="px-2">
        <ul class="space-y-1 border-t border-gray-100">
          {#each menu as item}
            <li class="pt-4">
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
    </div>
  </div>

  <div class="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2">
    <form action="#">
      <button
        class={[
          "flex w-full justify-center rounded-lg px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700",
        ]}
        title="Log out"
        onclick={signOut}
      >
        <LogOut />
      </button>
    </form>
  </div>
</div>

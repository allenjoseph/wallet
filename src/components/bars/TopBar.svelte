<script lang="ts">
  import { EllipsisVertical } from "lucide-svelte";
  import { wallet } from "../../state.svelte";
  import { authService } from "../../services";
  import type { Route } from "../../entities";
  import { routes } from "../../routes";

  let hasImage = $state(true);
  let isSettingsOpen = $state(false);

  function imageFallback() {
    hasImage = false;
  }

  function signOut() {
    authService.logOut().then(() => (wallet.user = null as never));
  }

  function onSelectMenuItem(item: Route) {
    wallet.selectedExpense = null;
    wallet.selectedRoute = item;
  }

  function toggleMenu(e: Event) {
    e.stopPropagation(); // avoid that the document listener close the menu
    isSettingsOpen = !isSettingsOpen;
  }

  $effect(() => {
    // Close menu when user do a click in the document
    document.addEventListener("click", () => {
      if (isSettingsOpen) {
        isSettingsOpen = false;
      }
    });
  });
</script>

<div class="fixed flex w-screen h-14 bg-white z-20 p-2">
  <div class="size-14">
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

  <div class="flex-1 flex items-center pl-2">
    <h1 class="text-2xl">{wallet.selectedRoute.title}</h1>
  </div>

  <div class="relative">
    <button
      class={[
        "flex justify-center items-center rounded-lg p-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700",
      ]}
      title="Settings"
      onclick={toggleMenu}
    >
      <EllipsisVertical size={24} />
    </button>
    {#if isSettingsOpen}
      <div
        class="absolute end-0 z-10 rounded-lg border border-gray-100 bg-white shadow-lg p-1"
        role="menu"
      >
        {@render menuItem(
          "Categories",
          onSelectMenuItem.bind(null, routes.category)
        )}
        {@render menuItem(
          "Sources",
          onSelectMenuItem.bind(null, routes.source)
        )}
        {@render menuItem("Log out", signOut)}
      </div>
    {/if}
  </div>
</div>

{#snippet menuItem(title: string, onClick: () => void)}
  <button
    class="rounded-lg px-4 py-2 text-left w-full text-nowrap hover:bg-gray-50 text-sm"
    role="menuitem"
    onclick={onClick}
  >
    {title}
  </button>
{/snippet}

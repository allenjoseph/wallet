<script lang="ts">
  import { EllipsisVertical, Power } from "lucide-svelte";
  import { logOut } from "../lib/backend";
  import { wallet } from "../state.svelte";

  let hasImage = $state(true);
  let isSettingsOpen = $state(false);

  function imageFallback() {
    hasImage = false;
  }

  function signOut() {
    logOut().then(() => (wallet.user = null as never));
  }
</script>

<div class="fixed flex w-screen h-14 bg-white z-20 p-2">
  <div class="size-14 border-r border-gray-100">
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
    <h1 class="text-2xl">{wallet.selectedMenu.title}</h1>
  </div>

  <div class="relative">
    <button
      class={[
        "flex justify-center items-center rounded-lg p-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700",
      ]}
      title="Settings"
      onclick={() => (isSettingsOpen = !isSettingsOpen)}
    >
      <EllipsisVertical size={24} />
    </button>
    {#if isSettingsOpen}
      <div
        class="absolute end-0 z-10 rounded-lg border border-gray-100 bg-white shadow-lg p-1"
        role="menu"
      >
        <button
          class="rounded-lg px-4 py-2 text-left w-full text-nowrap hover:bg-gray-50 text-sm"
          role="menuitem"
          onclick={signOut}
        >
          Log out
        </button>
      </div>
    {/if}
  </div>
</div>

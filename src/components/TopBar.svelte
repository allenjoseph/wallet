<script lang="ts">
  import { Power } from "lucide-svelte";
  import { logOut } from "../lib/backend";
  import { menu, wallet } from "../state.svelte";

  let hasImage = $state(true);
  function imageFallback() {
    hasImage = false;
  }

  function signOut() {
    logOut().then(() => (wallet.user = null as never));
  }
</script>

<div class="fixed flex w-screen h-14 bg-white z-20">
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

  <div class="flex-1 flex items-center pl-2">
    <h1 class="text-2xl">{menu[wallet.menuSeleted].title}</h1>
  </div>

  <div class="sticky inset-x-0 self-end bg-white p-2">
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

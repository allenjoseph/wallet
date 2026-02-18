<script lang="ts">
  import { LoaderCircle } from "lucide-svelte";
  import TopBar from "./components/bars/TopBar.svelte";
  import BottomBar from "./components/bars/BottomBar.svelte";
  import Login from "./views/Login.svelte";
  import { wallet } from "./state.svelte";
</script>

<main class="flex">
  {#if wallet.user !== null}
    <TopBar />
    {#await import(`./views/${wallet.selectedRoute.view}.svelte`) then { default: View }}
      <View />
    {/await}
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

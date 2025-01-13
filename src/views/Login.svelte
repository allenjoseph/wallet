<script lang="ts">
  import { PiggyBank } from "lucide-svelte";
  import { logIn } from "../lib/backend";
  import { wallet } from "../state.svelte";
  import Button from "../components/Button.svelte";

  function signIn() {
    logIn().then((user) => user && (wallet.user = user));
  }
</script>

<div class="mx-auto max-w-screen-xl py-16 px-6">
  <div class="mx-auto max-w-lg">
    <h1
      class="font-bold text-indigo-600 flex items-center justify-center gap-4"
    >
      <PiggyBank size={64} /> <span class="text-[64px]">Wallet</span>
    </h1>

    <form
      action="#"
      class="mb-0 mt-6 space-y-4 rounded-lg border shadow-lg p-6 w-[320px]"
    >
      <p class="text-center text-sm text-gray-500">
        You need a Google account.
      </p>
      <Button onClick={signIn}>Enter</Button>
    </form>
  </div>
</div>

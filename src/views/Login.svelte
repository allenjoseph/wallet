<script lang="ts">
  import { PiggyBank } from "lucide-svelte";
  import { auth, logIn, postAuth } from "../lib/backend";
  import { wallet } from "../state.svelte";
  import Button from "../components/Button.svelte";

  wallet.isLoading = true;

  auth.onAuthStateChanged(async (user) => {
    if (user) {
      await postAuth(user);
      wallet.user = user;
    }
    wallet.isLoading = false;
  });
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
      class="mb-0 mt-6 rounded-lg border shadow-lg p-6 w-[320px] flex flex-col gap-4"
    >
      <p class="text-center text-sm text-gray-500">
        You need a Google account.
      </p>
      <Button onClick={logIn}>Enter</Button>
    </form>
  </div>
</div>

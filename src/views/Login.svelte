<script lang="ts">
  import { PiggyBank } from "lucide-svelte";
  import { wallet } from "../state.svelte";
  import { authService } from "../services";
  import Button from "../components/Button.svelte";

  wallet.isLoading = true;

  authService.auth.onAuthStateChanged(async (user) => {
    if (user) {
      await authService.postAuth(user);
      wallet.user = user;
    }
    wallet.isLoading = false;
  });
</script>

<div class="mx-auto max-w-(--breakpoint-xl) py-16 px-6">
  <div class="mx-auto max-w-lg">
    <h1
      class="font-bold text-indigo-600 flex items-center justify-center gap-4"
    >
      <PiggyBank size={64} /> <span class="text-[64px]">Wallet</span>
    </h1>

    <form action="#" class="card mb-0 mt-6 p-6! w-[320px] flex flex-col gap-4">
      <p class="text-center text-sm text-gray-500">
        You need a Google account.
      </p>
      <Button onClick={authService.logIn}>Enter</Button>
    </form>
  </div>
</div>

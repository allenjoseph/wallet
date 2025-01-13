<script lang="ts">
  import { Delete } from "lucide-svelte";

  let { amount = $bindable(0) } = $props();

  let amountStr = $state(`${amount === 0 ? "" : amount}`);

  function addDigit(numStr: string) {
    if (amountStr.length > 6 || (amountStr.at(-1) === "." && numStr === "."))
      return;

    amountStr = amountStr.concat(numStr);
    if (amountStr === ".") return;

    amount = parseFloat(amountStr);
    if (amount === 0) amountStr = "";
  }

  function clear() {
    amount = 0;
    amountStr = "";
  }
</script>

<div class="mx-auto">
  <p
    class="text-5xl font-medium text-center mb-4 py-2 border-b border-gray-200"
  >
    {`${amountStr[0] === "." ? "0" : ""}${amountStr || "0"}`}
  </p>
  <div class="grid grid-flow-row grid-cols-3 gap-4">
    {#each Array.from({ length: 9 }, (_, i) => i + 1) as num}
      {@render digit(`${num}`)}
    {/each}
    <button
      class="border rounded-full p-4 shadow-sm text-red-500 shadow-indigo-100 size-20 flex items-center justify-center text-4xl hover:bg-indigo-100"
      onclick={clear}
    >
      <Delete size={32} />
    </button>
    {@render digit("0")}
    {@render digit(".")}
  </div>
</div>

{#snippet digit(numStr: string)}
  <button
    class="border rounded-full p-4 shadow-sm shadow-indigo-100 size-20 flex items-center justify-center text-3xl hover:bg-indigo-100"
    onclick={() => addDigit(numStr)}
  >
    {numStr}
  </button>
{/snippet}

<script lang="ts">
import { ChevronsDown, ChevronsUp } from "lucide-svelte";

interface Props {
  open: boolean;
  toggle: () => void;
  right?: boolean;
}

const { open, toggle, right = false }: Props = $props();
</script>

<button
  type="button"
  class={[
    "w-[30px] h-[30px] mx-auto bg-gray-100 rounded-full flex items-center justify-center text-gray-600",
    right && "absolute top-0 right-0",
  ]}
  onclick={toggle}
>
  {#if open}
    <ChevronsUp size={18} />
  {:else}
    <ChevronsDown size={18} />
  {/if}
</button>

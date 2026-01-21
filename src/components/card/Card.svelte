<script lang="ts">
  import dayjs from "dayjs";
  import { Pencil, Trash2 } from "lucide-svelte";
  import type { Doc } from "../../entities";

  interface Props extends Doc {
    limit?: number;
    onedit: () => void;
    ondelete: () => void;
  }

  const { onedit, ondelete, ...item }: Props = $props();
</script>

<div class="card">
  <p class="text-xs text-gray-500">
    {dayjs(item.datetime).format("ddd D MMM h:mm A")}
  </p>
  <p class="font-medium">
    {item.name}
  </p>
  <p class="text-sm font-light">
    {item.description}
  </p>
  {#if item.limit}
    <p class="text-sm pt-1">
      Limit: S/ {item.limit ?? "--"}
    </p>
  {/if}
  <button
    class="absolute top-4 right-4 text-indigo-500 bg-white"
    onclick={onedit}
  >
    <Pencil size={18} />
  </button>
  <button
    class="absolute bottom-4 right-4 text-sm text-red-500 bg-white"
    onclick={ondelete}
  >
    <Trash2 size={18} />
  </button>
  <div class="absolute bottom-4 right-4"></div>
</div>

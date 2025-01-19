<script lang="ts">
  import dayjs from "dayjs";
  import { Pencil, Trash2 } from "lucide-svelte";
  import type { BaseDoc } from "../../lib/types";

  interface Props extends BaseDoc {
    onedit: () => void;
    ondelete: () => void;
  }

  const { onedit, ondelete, ...item }: Props = $props();
</script>

<div class="relative border rounded-lg p-4 shadow-sm shadow-indigo-100">
  <p class="text-xs text-gray-500">
    {dayjs(item.datetime).format("ddd D MMM h:mm A")}
  </p>
  <p class="font-medium">
    {item.name}
  </p>
  <p class="text-sm">{item.description}</p>
  <button
    class="absolute top-4 right-4 text-indigo-500 bg-white"
    onclick={onedit}
  >
    <Pencil size={16} />
  </button>
  <button
    class="absolute bottom-4 right-4 text-sm text-red-500 bg-white"
    onclick={ondelete}
  >
    <Trash2 size={16} />
  </button>
  <div class="absolute bottom-4 right-4"></div>
</div>

<script lang="ts">
  import dayjs from "dayjs";
  import { Pencil, Trash2 } from "lucide-svelte";
  import type { BaseDoc } from "../lib/types";

  interface Props extends BaseDoc {
    ondelete: () => void;
    onedit: () => void;
  }

  const { ondelete, onedit, ...category }: Props = $props();
</script>

<div class="relative border rounded-lg p-4 shadow-sm shadow-indigo-100">
  <div>
    <p class="text-xs text-gray-500">
      {dayjs(category.datetime).format("ddd D MMM h:mm A")}
    </p>
    <p class="font-medium">
      {category.name}
    </p>
    <p class="text-sm">{category.description}</p>
    <Pencil
      size={16}
      class="absolute top-4 right-4 text-indigo-500 bg-white"
      onclick={onedit}
    />
    <Trash2
      size={16}
      class="absolute bottom-4 right-4 text-sm text-red-500 bg-white"
      onclick={ondelete}
    />
  </div>
  <div class="absolute bottom-4 right-4"></div>
</div>

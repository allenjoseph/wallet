<script lang="ts">
import type { Doc } from "../../entities";
import Badge from "./Badge.svelte";

interface Props {
  // biome-ignore lint/suspicious/noExplicitAny: lucide icon
  Icon: any;
  value?: Doc;
  data$: Promise<Doc[]>;
  placeholder?: string;
  small?: boolean;
}

let {
  Icon,
  value = $bindable(null as never),
  data$,
  placeholder,
  small,
}: Props = $props();

let isOpen = $state(false);
let selectedItem = $state<Doc>(value);

function onSelect(category: Doc) {
  value = category;
  selectedItem = category;
  isOpen = false;
}
</script>

<div class="relative">
  <Badge
    onclick={() => (isOpen = !isOpen)}
    {Icon}
    {small}
    outline={!selectedItem || isOpen}
  >
    {selectedItem?.name ?? placeholder}
  </Badge>

  {#if data$ && isOpen}
    <div
      class="absolute start-0 z-10 mt-2 rounded-lg border border-gray-100 bg-white shadow-lg"
      role="menu"
    >
      <div class="p-1">
        {#await data$}
          <small class="text-gray-600">Loading...</small>
        {:then items}
          {#each items as item}
            <button
              type="button"
              class="rounded-lg px-4 py-2 text-left w-full text-nowrap hover:bg-gray-50 text-sm"
              role="menuitem"
              onclick={() => onSelect(item)}
            >
              {item.name}
            </button>
          {/each}
        {/await}
      </div>
    </div>
  {/if}
</div>

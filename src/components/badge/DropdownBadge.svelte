<script lang="ts">
  import Badge from "./Badge.svelte";
  import type { BaseDoc } from "../../lib/types";

  interface Props {
    Icon: any;
    value?: BaseDoc;
    data$: Promise<BaseDoc[]>;
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
  let selectedItem = $state<BaseDoc>(value);

  function onSelect(category: BaseDoc) {
    value = category;
    selectedItem = category;
    isOpen = false;
  }
</script>

<div class="relative">
  <Badge onclick={() => (isOpen = !isOpen)} {Icon} {small}>
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

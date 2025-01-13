<script lang="ts">
  import Badge from "./Badge.svelte";
  import type { BaseDoc } from "../lib/types";

  interface Props {
    locked?: boolean;
    small?: boolean;
    data$?: Promise<BaseDoc[]>;
    value?: BaseDoc;
    placeholder?: string;
    Icon: any;
  }

  let {
    value = $bindable(null as never),
    data$,
    small,
    locked,
    placeholder,
    Icon,
  }: Props = $props();

  let editing = $state(false);
  let selectedItem = $state<BaseDoc>(value);

  function onSelect(category: BaseDoc) {
    value = category;
    selectedItem = category;
    editing = false;
  }
</script>

<div class="relative">
  <Badge click={() => (editing = !editing)} {Icon} {small}>
    {selectedItem?.name ?? placeholder}
  </Badge>

  {#if !locked && editing && data$}
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

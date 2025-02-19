<script lang="ts">
  import { ChevronsDown, ListFilter } from "lucide-svelte";
  import { getCategories, getSources } from "../../lib/backend";
  import Badge from "../badge/Badge.svelte";
  import { FilterType } from "../../lib/types";

  let { onclick, selected } = $props();

  let active = $state<FilterType>(FilterType.Sources);

  let sources$ = $state(getSources());
  let categories$ = $state(getCategories());

  function toggle() {
    active =
      active === FilterType.Sources
        ? FilterType.Categories
        : FilterType.Sources;
  }
</script>

<div class="relative w-full h-6 overflow-hidden">
  <div
    class={["filters flex gap-2", active === FilterType.Sources && "active"]}
  >
    {#await sources$}
      {@render skeletom()}
    {:then sources}
      {#each sources as item}
        <Badge
          onclick={() => onclick(FilterType.Sources, item)}
          Icon={ListFilter}
          selected={item.id === selected}
          small
        >
          {item.name}
        </Badge>
      {/each}
    {/await}
  </div>
  <div
    class={["filters flex gap-2", active === FilterType.Categories && "active"]}
  >
    {#await categories$}
      {@render skeletom()}
    {:then categories}
      {#each categories as item}
        <Badge
          onclick={() => onclick(FilterType.Categories, item)}
          Icon={ListFilter}
          selected={item.id === selected}
          small
        >
          {item.name}
        </Badge>
      {/each}
    {/await}
  </div>
  <button
    class="absolute w-6 h-6 top-0 right-0 bg-gray-100 rounded-full flex items-center justify-center text-gray-600"
    type="button"
    onclick={toggle}
  >
    <ChevronsDown size={18} />
  </button>
</div>

{#snippet skeletom(length = 3)}
  <div class="animate-pulse flex gap-2">
    {#each Array.from({ length }, (_, i) => i + 1)}
      <div class="w-16 h-6 bg-slate-200 rounded-full"></div>
    {/each}
  </div>
{/snippet}

<style lang="postcss">
  .filters {
    position: absolute;
    transform: translateY(100%);
    opacity: 0;
    transition:
      transform 0.3s,
      opacity 0.3s;
  }

  .filters.active {
    transform: translateY(0);
    opacity: 1;
  }
</style>

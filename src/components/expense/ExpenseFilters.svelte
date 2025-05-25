<script lang="ts">
  import { ListFilter } from "lucide-svelte";
  import { getCategories, getSources } from "../../lib/backend";
  import Badge from "../badge/Badge.svelte";
  import { ExpenseFilter } from "../../lib/types";
  import ChevronButton from "../chevron/ChevronButton.svelte";

  let { onclick, selected } = $props();

  let active = $state<ExpenseFilter>(ExpenseFilter.Source);

  let sources$ = $state(getSources());
  let categories$ = $state(getCategories());

  function toggle() {
    active =
      active === ExpenseFilter.Source
        ? ExpenseFilter.Category
        : ExpenseFilter.Source;
  }
</script>

<div class="relative w-full h-[30px] overflow-hidden">
  <div
    class={[
      "filters flex gap-2 pr-8 w-full overflow-x-auto",
      active === ExpenseFilter.Source && "active",
    ]}
  >
    {#await sources$}
      {@render skeleton()}
    {:then sources}
      {#each sources as item}
        <Badge
          onclick={() => onclick(ExpenseFilter.Source, item)}
          Icon={ListFilter}
          selected={item.id === selected}
        >
          {item.name}
        </Badge>
      {/each}
    {/await}
  </div>
  <div
    class={[
      "filters flex gap-2 pr-8 w-full overflow-x-auto",
      active === ExpenseFilter.Category && "active",
    ]}
  >
    {#await categories$}
      {@render skeleton()}
    {:then categories}
      {#each categories as item}
        <Badge
          onclick={() => onclick(ExpenseFilter.Category, item)}
          Icon={ListFilter}
          selected={item.id === selected}
        >
          {item.name}
        </Badge>
      {/each}
    {/await}
  </div>
  <ChevronButton open={active !== ExpenseFilter.Source} {toggle} right />
</div>

{#snippet skeleton(length = 3)}
  <div class="animate-pulse flex gap-2">
    {#each Array.from({ length }, (_, i) => i + 1)}
      <div class="w-16 h-[30px] bg-slate-200 rounded-full"></div>
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

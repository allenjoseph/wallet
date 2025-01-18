<script lang="ts">
  import { ListFilter } from "lucide-svelte";
  import { getSources } from "../lib/backend";
  import Badge from "./Badge.svelte";

  let { onclick, selected } = $props();

  let sources$ = $state(getSources());
</script>

<div class="flex gap-2">
  {#await sources$}
    {@render skeletom()}
  {:then sources}
    {#each sources as item}
      <Badge
        onclick={() => onclick(item)}
        Icon={ListFilter}
        selected={item.id === selected}
        small
      >
        {item.name}
      </Badge>
    {/each}
  {/await}
</div>

{#snippet skeletom(length = 3)}
  <div class="animate-pulse flex gap-2">
    {#each Array.from({ length }, (_, i) => i + 1)}
      <div class="w-16 h-6 bg-slate-200 rounded-full"></div>
    {/each}
  </div>
{/snippet}

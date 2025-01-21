<script lang="ts">
  import type { Dayjs } from "dayjs";
  import dayjs from "dayjs";
  import { ChevronDown } from "lucide-svelte";

  interface Props {
    day: Dayjs;
  }

  let { day = $bindable() }: Props = $props();
  let dayStr = $state(day.format("YYYY-MM-DD"));
  let dayInput$: HTMLInputElement;

  $effect(() => {
    if (dayStr !== day.format("YYYY-MM-DD")) {
      day = dayjs(dayStr).startOf("day");
    }
  });
</script>

<span class="relative">
  <button
    type="button"
    class="text-indigo-700 flex items-center gap-1"
    onclick={() => dayInput$.showPicker()}
  >
    {day.format("D MMMM YYYY")}
    <ChevronDown size={12} />
  </button>
  <input
    type="date"
    class="absolute p-0 opacity-0 w-0 h-0 overflow-hidden -bottom-4 -left-4"
    bind:value={dayStr}
    bind:this={dayInput$}
  />
</span>

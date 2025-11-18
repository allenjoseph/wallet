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
      localStorage.setItem("monthlyPeriodDay", dayStr);
    }
  });
</script>

<span class="relative block">
  <button
    type="button"
    class="text-indigo-700 flex items-center gap-1"
    onclick={() => dayInput$.showPicker()}
  >
    {day.format("D MMMM YYYY")}
    <ChevronDown size={12} />
  </button>
  <input
    id="monthly-period-day"
    type="date"
    class="absolute w-full opacity-0 top-0 p-0"
    onkeydown={(e) => e.preventDefault()}
    bind:value={dayStr}
    bind:this={dayInput$}
  />
</span>

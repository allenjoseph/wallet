<script lang="ts">
  import Input from "../Input.svelte";

  let { onChange } = $props();

  let isRecurrent = $state(false);
  let _numberOfTimes = $state(0);

  $effect(() => {
    _numberOfTimes = isRecurrent ? _numberOfTimes : 0;
    onChange?.(_numberOfTimes);
  });
</script>

<div class="flex flex-col items-end gap-2 w-32">
  <label for="recurrent" class="inline-flex items-center gap-3">
    <span class="text-sm text-gray-500"> is recurrent </span>
    <input
      type="checkbox"
      class="size-5 rounded border-gray-300 shadow-sm"
      id="recurrent"
      bind:checked={isRecurrent}
    />
  </label>
  {#if isRecurrent}
    <Input
      type="number"
      name="times"
      label="# of times"
      min={0}
      bind:value={_numberOfTimes}
    />
  {/if}
</div>

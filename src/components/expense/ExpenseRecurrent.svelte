<script lang="ts">
  import Input from "../Input.svelte";
  import Switch from "../Switch.svelte";

  let { onChange } = $props();

  let isRecurrent = $state(false);
  let _numberOfTimes = $state(0);

  $effect(() => {
    _numberOfTimes = isRecurrent ? _numberOfTimes : 0;
    onChange?.(_numberOfTimes);
  });
</script>

<div class="flex flex-col items-end gap-2 w-32">
  <Switch name="limit-amount" bind:checked={isRecurrent}>
    <p class="text-sm text-gray-500 text-nowrap">Recurrent</p>
  </Switch>
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

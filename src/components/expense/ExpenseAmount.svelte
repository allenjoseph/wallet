<script lang="ts">
  import { onMount } from "svelte";

  interface Props {
    amount?: number;
    readonly?: boolean;
    limit?: number;
  }

  let { amount = $bindable(), readonly = false, limit = 0 }: Props = $props();

  let amount$: HTMLInputElement;
  let animate = $state(!readonly);
  let textColor = $derived(
    limit && amount
      ? amount > limit * 0.8
        ? "text-red-600"
        : amount > limit * 0.5
          ? "text-amber-600"
          : null
      : null,
  );

  function onClick() {
    animate = true;
    amount$.focus();
  }

  function onBlur() {
    animate = false;
  }

  onMount(() => {
    amount$.focus();
  });
</script>

<div class="flex-1 flex flex-col gap-2">
  <div class="flex justify-between">
    <p class="text-sm text-gray-500">Amount</p>
    {#if limit}
      <p class="text-sm text-gray-500">
        limit: S/ {limit}
      </p>
    {/if}
  </div>
  <div class="flex justify-between">
    <button
      class="text-4xl font-medium self-start text-nowrap"
      onclick={onClick}
    >
      S/ <span class={[animate && "typewriter"]}>
        {readonly ? (amount?.toFixed(2) ?? "-.--") : amount}
      </span>
    </button>
    {#if limit}
      <p class={["text-4xl text-gray-500 font-light", textColor]}>
        {limit ? `${(((amount ?? 0) / limit) * 100).toFixed(0)}%` : ""}
      </p>
    {/if}
  </div>
  <input
    id="amount"
    type="number"
    inputmode="decimal"
    class="p-0 opacity-0 w-0 h-0 overflow-hidden text-transparent"
    bind:value={amount}
    bind:this={amount$}
    disabled={readonly}
    onblur={onBlur}
    autocomplete="off"
  />
</div>

<style lang="postcss">
  .typewriter {
    overflow: hidden;
    border-right: 2px solid rgb(79, 70, 229);
    white-space: nowrap;
    margin: 0 auto;
    animation:
      typing 3.5s steps(40, end),
      blink-caret 0.75s step-end infinite;
  }

  @keyframes typing {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }

  @keyframes blink-caret {
    from,
    to {
      border-color: transparent;
    }
    50% {
      border-color: rgb(79, 70, 229);
    }
  }
</style>

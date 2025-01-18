<script lang="ts">
  import { onMount } from "svelte";

  interface Props {
    amount?: number;
    readonly?: boolean;
  }

  let { amount = $bindable(), readonly = false }: Props = $props();

  let animate = $state(!readonly);
  let amount$: HTMLInputElement;

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

<div class="flex flex-col gap-2">
  <p class="text-sm text-gray-500">Amount</p>
  <button class="text-4xl font-medium self-start text-nowrap" onclick={onClick}>
    S/ <span class={[animate && "typewriter"]}>
      {readonly ? (amount?.toFixed(2) ?? "-.--") : amount}
    </span>
  </button>
  <input
    type="number"
    inputmode="decimal"
    class="p-0 opacity-0 w-0 h-0 overflow-hidden"
    bind:value={amount}
    bind:this={amount$}
    disabled={readonly}
    onblur={onBlur}
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

<script lang="ts">
  interface Props {
    name: string;
    checked?: boolean;
    children?: () => any;
  }

  let { name, checked = $bindable(), children }: Props = $props();
</script>

<div class="flex items-center gap-2">
  {@render children?.()}
  <label
    for={name}
    class="relative block h-8 w-12 [-webkit-tap-highlight-color:transparent]"
  >
    <input type="checkbox" id={name} class="peer sr-only" bind:checked />
    <span class="absolute inset-0 m-auto h-2 rounded-full bg-gray-300"></span>
    <span
      class="absolute inset-y-0 start-0 m-auto size-6 rounded-full bg-gray-500 transition-[inset-inline-start] peer-checked:start-6 peer-checked:*:scale-0"
    >
      <span
        class="absolute inset-0 m-auto size-4 rounded-full bg-gray-200 transition-transform"
      >
      </span>
    </span>
  </label>
</div>

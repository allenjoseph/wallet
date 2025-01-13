<script lang="ts">
  let { title, selected, children, onSelect } = $props();
</script>

<button
  {title}
  class={[
    "flex w-full justify-center rounded-lg px-2 py-1.5",
    selected
      ? "bg-indigo-50 text-indigo-600"
      : "text-gray-500 hover:bg-gray-50 hover:text-gray-700",
  ]}
  onclick={onSelect}
>
  {@render children()}
</button>

<script lang="ts">
  let { title, selected, children, onSelect } = $props();
</script>

<button
  {title}
  class={[
    "rounded-lg w-full flex items-center justify-center",
    selected ? "text-indigo-600" : "text-gray-600 ",
  ]}
  onclick={onSelect}
  disabled={selected}
>
  {@render children()}
</button>

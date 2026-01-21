<script lang="ts">
  let { onClick, disabled = false, children, secondary = false } = $props();
</script>

<button
  class={[
    "flex items-center justify-center rounded-full px-6 h-10 font-medium disabled:bg-gray-200 disabled:text-gray-400",
    secondary ? "bg-gray-100 text-gray-700" : "bg-indigo-600 text-white",
  ]}
  onclick={onClick}
  {disabled}
>
  {@render children?.()}
</button>

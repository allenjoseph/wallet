<script lang="ts">
  let { onClick, disabled = false, children } = $props();
</script>

<button
  class="flex items-center justify-center rounded-full bg-indigo-600 px-6 h-10 font-medium text-white disabled:bg-gray-200 disabled:text-gray-400"
  onclick={onClick}
  {disabled}
>
  {@render children?.()}
</button>

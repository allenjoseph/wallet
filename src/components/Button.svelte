<script lang="ts">
  let { onClick, children } = $props();
</script>

<button
  class="flex items-center justify-center rounded-full bg-indigo-600 px-6 h-10 font-medium text-white"
  onclick={onClick}
>
  {@render children?.()}
</button>

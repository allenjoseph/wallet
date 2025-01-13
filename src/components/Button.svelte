<script lang="ts">
  let { onClick, children } = $props();
</script>

<button
  class="block w-full rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white"
  onclick={onClick}
>
  {@render children?.()}
</button>

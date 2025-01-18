<script lang="ts">
  let { children } = $props();
</script>

<div
  class="border rounded-lg p-4 shadow-sm shadow-indigo-500 flex flex-col gap-4"
>
  {@render children?.()}
</div>

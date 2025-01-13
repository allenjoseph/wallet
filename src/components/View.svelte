<script lang="ts">
  let { children } = $props();
</script>

<div class="mx-auto flex-1 p-4 flex flex-col gap-4 max-w-2xl">
  {@render children?.()}
</div>

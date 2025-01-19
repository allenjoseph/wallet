<script lang="ts">
  let { children } = $props();
</script>

<div
  class="mx-auto flex-1 px-4 pb-4 mb-[calc(env(safe-area-inset-bottom)+5rem)] flex flex-col gap-4 max-w-2xl my-14"
>
  {@render children?.()}
</div>
